/**
 * Synthesised instruments. Plucked strings (đàn tranh, upright bass) use
 * Karplus-Strong; đàn bầu is a near-pure harmonic tone shaped by the rod's
 * pitch bends and wide vibrato; the rest are small subtractive / FM patches.
 */
import { env, filter, midiToFreq, noise, toOut, type Out } from './core'

// ---------------------------------------------------------------- plucked strings

const ksCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>()

/**
 * Karplus-Strong string rendered into a buffer (cached per pitch).
 * `bright` 0..1 shapes the pluck; `sustain` near 1 rings longer.
 */
function ksBuffer(ctx: BaseAudioContext, freq: number, seconds: number, bright: number, sustain: number) {
  let cache = ksCache.get(ctx)
  if (!cache) ksCache.set(ctx, (cache = new Map()))
  const key = `${freq.toFixed(2)}|${seconds}|${bright}|${sustain}`
  const hit = cache.get(key)
  if (hit) return hit

  const sr = ctx.sampleRate
  const n = Math.floor(sr * seconds)
  const buf = ctx.createBuffer(1, n, sr)
  const d = buf.getChannelData(0)
  const period = sr / freq
  const N = Math.max(2, Math.floor(period))
  const frac = period - N
  // Excitation: low-passed noise burst, one period long.
  let lp = 0
  const k = 0.15 + 0.85 * bright
  for (let i = 0; i < N && i < n; i++) {
    lp += k * (Math.random() * 2 - 1 - lp)
    d[i] = lp
  }
  for (let i = N; i < n; i++) {
    // Averaging filter with fractional delay keeps the tuning accurate.
    const a = d[i - N]
    const b = d[i - N - 1] ?? 0
    const c = i - N - 2 >= 0 ? d[i - N - 2] : 0
    d[i] = sustain * ((1 - frac) * 0.5 * (a + b) + frac * 0.5 * (b + c))
  }
  // Remove DC and fade the tail so it never clicks.
  let mean = 0
  for (let i = 0; i < n; i++) mean += d[i]
  mean /= n
  const fade = Math.floor(sr * 0.05)
  for (let i = 0; i < n; i++) {
    d[i] -= mean
    if (i > n - fade) d[i] *= (n - i) / fade
  }
  cache.set(key, buf)
  return buf
}

export interface PluckOpts {
  gain?: number
  pan?: number
  bright?: number
  sustain?: number
  seconds?: number
  tone?: number // low-pass cutoff in Hz
  /** Bend after the pluck, in semitones (đàn tranh "nhấn"). */
  bend?: number
  bendAt?: number
  bendTime?: number
  /** Rung vibrato on the left-hand side of the bridge. */
  vibrato?: number
}

export function pluck(o: Out, t: number, midi: number, opts: PluckOpts = {}) {
  const { ctx } = o
  const seconds = opts.seconds ?? 2.5
  const src = ctx.createBufferSource()
  src.buffer = ksBuffer(ctx, midiToFreq(midi), seconds, opts.bright ?? 0.7, opts.sustain ?? 0.996)
  if (opts.bend) {
    const at = t + (opts.bendAt ?? 0.15)
    src.playbackRate.setValueAtTime(1, at)
    src.playbackRate.linearRampToValueAtTime(Math.pow(2, opts.bend / 12), at + (opts.bendTime ?? 0.18))
  }
  if (opts.vibrato) {
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 5.5
    const depth = ctx.createGain()
    depth.gain.setValueAtTime(0, t)
    depth.gain.linearRampToValueAtTime(opts.vibrato * 100, t + 0.5)
    lfo.connect(depth).connect(src.detune)
    lfo.start(t)
    lfo.stop(t + seconds)
  }
  const g = ctx.createGain()
  g.gain.value = opts.gain ?? 0.3
  const lp = filter(ctx, 'lowpass', opts.tone ?? 6000)
  src.connect(lp).connect(g)
  toOut(g, o, opts.pan ?? 0)
  src.start(t)
  src.stop(t + seconds)
}

/** Đàn tranh: bright, metallic 16-string zither pluck. */
export function danTranh(o: Out, t: number, midi: number, opts: PluckOpts = {}) {
  pluck(o, t, midi, { bright: 0.95, sustain: 0.9975, seconds: 3, tone: 7000, gain: 0.22, ...opts })
}

/** Upright bass: dark, round pluck. */
export function bass(o: Out, t: number, midi: number, gain = 0.5) {
  pluck(o, t, midi, { bright: 0.25, sustain: 0.994, seconds: 1.6, tone: 900, gain })
}

// ---------------------------------------------------------------- đàn bầu

export interface DanBauNote {
  midi: number
  dur: number
  /** Glide in from this many semitones away (the rod bends the string). */
  from?: number
  /** Glide away at the end by this many semitones. */
  to?: number
  vibrato?: number // semitones of depth
  gain?: number
}

/**
 * Đàn bầu: monochord played on harmonics. Pure, voice-like tone whose
 * soul is in the bends and the wide, slow vibrato.
 */
export function danBau(o: Out, t: number, n: DanBauNote, pan = 0) {
  const { ctx } = o
  const f = midiToFreq(n.midi)
  const end = t + n.dur
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  const osc2 = ctx.createOscillator()
  osc2.type = 'triangle'
  const freqs = [osc.frequency, osc2.frequency]
  freqs.forEach((p, i) => {
    const mult = i === 0 ? 1 : 2
    const start = n.from ? f * Math.pow(2, n.from / 12) : f
    p.setValueAtTime(start * mult, t)
    if (n.from) p.exponentialRampToValueAtTime(f * mult, t + 0.22)
    if (n.to) {
      p.setValueAtTime(f * mult, end - 0.35)
      p.exponentialRampToValueAtTime(f * mult * Math.pow(2, n.to / 12), end - 0.05)
    }
  })
  // Delayed, widening vibrato from the rod.
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 4.6
  const depth = ctx.createGain()
  const vib = (n.vibrato ?? 0.35) * 100
  depth.gain.setValueAtTime(0, t)
  depth.gain.setValueAtTime(0, t + Math.min(0.3, n.dur * 0.3))
  depth.gain.linearRampToValueAtTime(vib, t + Math.min(1.2, n.dur * 0.8))
  lfo.connect(depth)
  depth.connect(osc.detune)
  depth.connect(osc2.detune)

  const g = ctx.createGain()
  const peak = n.gain ?? 0.22
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + 0.012)
  g.gain.exponentialRampToValueAtTime(peak * 0.55, t + 0.25)
  g.gain.exponentialRampToValueAtTime(peak * 0.3, Math.max(t + 0.3, end - 0.1))
  g.gain.exponentialRampToValueAtTime(0.0001, end + 0.4)
  const h2 = ctx.createGain()
  h2.gain.value = 0.12
  osc.connect(g)
  osc2.connect(h2).connect(g)
  // A soft pluck transient (the player's fingertip on the string).
  const click = noise(ctx, t, 0.03)
  const ce = env(ctx, t, 0.05, 0.002, 0.03)
  click.connect(filter(ctx, 'bandpass', f * 4, 2)).connect(ce).connect(g)
  toOut(g, o, pan)
  for (const s of [osc, osc2, lfo]) {
    s.start(t)
    s.stop(end + 0.5)
  }
}

// ---------------------------------------------------------------- keys / pads / leads

/** Electric piano (Rhodes-like) from two-operator FM. */
export function epiano(o: Out, t: number, midi: number, dur: number, gain = 0.09, pan = 0) {
  const { ctx } = o
  const f = midiToFreq(midi)
  const car = ctx.createOscillator()
  car.frequency.value = f
  const mod = ctx.createOscillator()
  mod.frequency.value = f
  const idx = ctx.createGain()
  idx.gain.setValueAtTime(f * 1.6, t)
  idx.gain.exponentialRampToValueAtTime(f * 0.15, t + 0.6)
  mod.connect(idx).connect(car.frequency)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.006)
  g.gain.exponentialRampToValueAtTime(gain * 0.4, t + 0.5)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.6)
  // Tremolo, the classic suitcase-amp wobble.
  const trem = ctx.createOscillator()
  trem.frequency.value = 4.2
  const td = ctx.createGain()
  td.gain.value = gain * 0.25
  trem.connect(td).connect(g.gain)
  car.connect(g)
  toOut(g, o, pan)
  for (const s of [car, mod, trem]) {
    s.start(t)
    s.stop(t + dur + 0.7)
  }
}

/** Slow, dark string/synth pad of detuned saws. */
export function pad(o: Out, t: number, midis: number[], dur: number, gain = 0.05, cutoff = 900) {
  const { ctx } = o
  const g = ctx.createGain()
  const attack = Math.min(2, dur * 0.4)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + attack)
  g.gain.setValueAtTime(gain, t + dur - 0.2)
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 2)
  const lp = filter(ctx, 'lowpass', cutoff, 0.5)
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.12
  const ld = ctx.createGain()
  ld.gain.value = cutoff * 0.35
  lfo.connect(ld).connect(lp.frequency)
  lfo.start(t)
  lfo.stop(t + dur + 2.1)
  lp.connect(g)
  midis.forEach((m, i) => {
    for (const det of [-7, 6]) {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = midiToFreq(m)
      osc.detune.value = det + i
      const og = ctx.createGain()
      og.gain.value = 1 / midis.length
      osc.connect(og).connect(lp)
      osc.start(t)
      osc.stop(t + dur + 2.1)
    }
  })
  toOut(g, o, 0)
}

/** Filtered saw pulse for tense ostinatos. */
export function pulseSynth(o: Out, t: number, midi: number, dur: number, gain = 0.1, open = 1) {
  const { ctx } = o
  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.value = midiToFreq(midi)
  const sub = ctx.createOscillator()
  sub.type = 'square'
  sub.frequency.value = midiToFreq(midi - 12)
  const sg = ctx.createGain()
  sg.gain.value = 0.35
  const lp = filter(ctx, 'lowpass', 300, 6)
  lp.frequency.setValueAtTime(300 + 1500 * open, t)
  lp.frequency.exponentialRampToValueAtTime(220, t + dur)
  const g = env(ctx, t, gain, 0.004, dur)
  osc.connect(lp)
  sub.connect(sg).connect(lp)
  lp.connect(g)
  toOut(g, o, 0)
  for (const s of [osc, sub]) {
    s.start(t)
    s.stop(t + dur + 0.05)
  }
}

/** Glassy sine bell used in stingers. */
export function bell(o: Out, t: number, midi: number, gain = 0.08, decay = 2.5, pan = 0) {
  const { ctx } = o
  const f = midiToFreq(midi)
  const g = ctx.createGain()
  ;[1, 2.76, 5.4].forEach((ratio, i) => {
    const osc = ctx.createOscillator()
    osc.frequency.value = f * ratio
    const e = env(ctx, t, gain / (i * 2 + 1), 0.003, decay / (i + 1))
    osc.connect(e).connect(g)
    osc.start(t)
    osc.stop(t + decay + 0.1)
  })
  toOut(g, o, pan)
}

// ---------------------------------------------------------------- percussion

/** Round sine sub bass with a soft attack. */
export function subBass(o: Out, t: number, midi: number, dur: number, gain = 0.2) {
  const { ctx } = o
  const osc = ctx.createOscillator()
  osc.frequency.value = midiToFreq(midi)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.02)
  g.gain.setValueAtTime(gain, t + dur * 0.7)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(g)
  toOut(g, o, 0)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

/** Dusty, soft snare: noise body plus a short tone. */
export function snare(o: Out, t: number, gain = 0.15) {
  const { ctx } = o
  const src = noise(ctx, t, 0.25)
  const g = env(ctx, t, gain, 0.002, 0.18)
  src.connect(filter(ctx, 'bandpass', 1800, 0.7)).connect(filter(ctx, 'lowpass', 5000)).connect(g)
  toOut(g, o, 0.05)
  const osc = ctx.createOscillator()
  osc.frequency.setValueAtTime(220, t)
  osc.frequency.exponentialRampToValueAtTime(160, t + 0.08)
  const og = env(ctx, t, gain * 0.6, 0.002, 0.09)
  osc.connect(og)
  toOut(og, o, 0)
  osc.start(t)
  osc.stop(t + 0.15)
}

/** Side-stick click. */
export function rim(o: Out, t: number, gain = 0.06) {
  const { ctx } = o
  const src = noise(ctx, t, 0.05)
  const g = env(ctx, t, gain, 0.001, 0.04)
  src.connect(filter(ctx, 'bandpass', 2400, 5)).connect(g)
  toOut(g, o, 0.1)
}

/** Closed hi-hat, kept dark so it sits back in the mix. */
export function hat(o: Out, t: number, gain = 0.03) {
  const { ctx } = o
  const src = noise(ctx, t, 0.08)
  const g = env(ctx, t, gain, 0.001, 0.05)
  src.connect(filter(ctx, 'highpass', 6000)).connect(filter(ctx, 'lowpass', 9000)).connect(g)
  toOut(g, o, 0.25)
}


export function kick(o: Out, t: number, gain = 0.4, low = 42) {
  const { ctx } = o
  const osc = ctx.createOscillator()
  osc.frequency.setValueAtTime(110, t)
  osc.frequency.exponentialRampToValueAtTime(low, t + 0.12)
  const g = env(ctx, t, gain, 0.003, 0.35)
  osc.connect(g)
  toOut(g, o, 0)
  osc.start(t)
  osc.stop(t + 0.4)
}

/** Clock tick: alternate `tock` for the second of each pair. */
export function tick(o: Out, t: number, tock = false, gain = 0.05) {
  const { ctx } = o
  const src = noise(ctx, t, 0.03)
  const bp = filter(ctx, 'bandpass', tock ? 2200 : 3200, 8)
  const g = env(ctx, t, gain, 0.001, 0.025)
  src.connect(bp).connect(g)
  toOut(g, o, tock ? -0.3 : 0.3)
}

/** Rising noise swell, for tension before a phrase turns. */
export function riser(o: Out, t: number, dur = 2, gain = 0.05) {
  const { ctx } = o
  const src = noise(ctx, t, dur)
  const bp = filter(ctx, 'bandpass', 400, 2)
  bp.frequency.setValueAtTime(300, t)
  bp.frequency.exponentialRampToValueAtTime(5000, t + dur)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.95)
  g.gain.linearRampToValueAtTime(0.0001, t + dur)
  src.connect(bp).connect(g)
  toOut(g, o, 0)
}
