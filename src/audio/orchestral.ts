/**
 * Cinematic instruments: acoustic piano, string section, solo cello/violin
 * lines, pizzicato and timpani. All synthesised; nothing is sampled.
 *
 * The piano is rendered note by note into buffers with additive synthesis
 * (slightly stretched partials, two detuned strings, a hammer knock) and
 * cached, so playing it later costs no more than a sample player.
 */
import { env, filter, midiToFreq, noise, toOut, type Out } from './core'
import { pluck } from './instruments'

// ---------------------------------------------------------------- piano

const pianoCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>()

function pianoBuffer(ctx: BaseAudioContext, midi: number, hard: boolean) {
  let cache = pianoCache.get(ctx)
  if (!cache) pianoCache.set(ctx, (cache = new Map()))
  const key = `${midi}|${hard}`
  const hit = cache.get(key)
  if (hit) return hit

  const sr = ctx.sampleRate
  const f0 = midiToFreq(midi)
  // Low notes ring longer, high notes die quickly, as on a real piano.
  const seconds = Math.max(1.6, Math.min(6.5, 7 - (midi - 36) * 0.09))
  const n = Math.floor(sr * seconds)
  const buf = ctx.createBuffer(2, n, sr)
  const L = buf.getChannelData(0)
  const R = buf.getChannelData(1)
  const B = 0.00012 * Math.pow(2, (midi - 60) / 18) // inharmonicity
  const bright = hard ? 0.22 : 0.42 // higher = darker
  const baseTau = seconds * 0.3

  for (let k = 1; k <= 14; k++) {
    const fk = k * f0 * Math.sqrt(1 + B * k * k)
    if (fk > 9000) break
    const amp = Math.exp(-bright * (k - 1)) / Math.pow(k, 0.6)
    const tau = baseTau / (1 + 0.35 * (k - 1))
    // Two strings per note, a few tenths of a cent apart, for the shimmer.
    for (const [det, pan] of [
      [1, -0.3],
      [1.00045, 0.3],
    ] as const) {
      const w = (2 * Math.PI * fk * det) / sr
      // Rotating phasor: far cheaper than calling Math.sin per sample.
      const c = Math.cos(w)
      const s = Math.sin(w)
      const phase = Math.random() * 2 * Math.PI
      let x = Math.cos(phase),
        y = Math.sin(phase)
      const fast = Math.exp(-1 / (sr * tau * 0.18))
      const slow = Math.exp(-1 / (sr * tau))
      let a1 = amp * 0.6,
        a2 = amp * 0.4
      const gl = 0.5 - pan * 0.5,
        gr = 0.5 + pan * 0.5
      for (let i = 0; i < n; i++) {
        const nx = x * c - y * s
        y = x * s + y * c
        x = nx
        const v = y * (a1 + a2)
        L[i] += v * gl
        R[i] += v * gr
        a1 *= fast
        a2 *= slow
        // Stop once this partial is inaudible; saves most of the work.
        if ((i & 1023) === 0 && a1 + a2 < 2e-5) break
      }
    }
  }
  // Hammer knock: a short filtered thump at the attack.
  const knock = Math.floor(sr * 0.012)
  let lp = 0
  for (let i = 0; i < knock; i++) {
    lp += 0.25 * (Math.random() * 2 - 1 - lp)
    const e = (1 - i / knock) ** 3 * (hard ? 0.35 : 0.2)
    L[i] += lp * e
    R[i] += lp * e
  }
  // Soft attack ramp, normalise, and fade the tail.
  let peak = 0
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]))
  const fade = Math.floor(sr * 0.08)
  const att = Math.floor(sr * 0.002)
  for (let i = 0; i < n; i++) {
    let g = 0.9 / peak
    if (i < att) g *= i / att
    if (i > n - fade) g *= (n - i) / fade
    L[i] *= g
    R[i] *= g
  }
  cache.set(key, buf)
  return buf
}

/** Piano note. `dur` is when the key is released (the damper falls). */
export function piano(o: Out, t: number, midi: number, dur?: number, gain = 0.25, hard = false) {
  const { ctx } = o
  const src = ctx.createBufferSource()
  src.buffer = pianoBuffer(ctx, midi, hard)
  const g = ctx.createGain()
  g.gain.value = gain
  src.start(t)
  if (dur !== undefined) {
    const off = t + dur
    g.gain.setValueAtTime(gain, off)
    g.gain.exponentialRampToValueAtTime(0.0001, off + 0.35)
    src.stop(off + 0.4)
  }
  src.connect(g)
  // Spread across the stereo field like a piano heard from the bench.
  toOut(g, o, (midi - 60) / 60)
}

export const pianoChord = (o: Out, t: number, midis: number[], dur?: number, gain = 0.16, roll = 0.012) =>
  midis.forEach((m, i) => piano(o, t + i * roll, m, dur, gain))

// ---------------------------------------------------------------- string section

export interface StringOpts {
  gain?: number
  attack?: number
  release?: number
  /** Bowed tremolo speed in Hz (0 = none). */
  tremolo?: number
  /** 0..1, how open the tone is. */
  bright?: number
  pan?: number
}

/** One note of a string section: three detuned players with their own vibrato. */
export function strings(o: Out, t: number, midi: number, dur: number, opts: StringOpts = {}) {
  const { ctx } = o
  const gain = opts.gain ?? 0.05
  const attack = opts.attack ?? 0.5
  const release = opts.release ?? 0.9
  const f = midiToFreq(midi)
  const end = t + dur

  const lp = filter(ctx, 'lowpass', Math.min(7000, 1200 + 2600 * (opts.bright ?? 0.5) + f * 1.5), 0.5)
  const body = filter(ctx, 'peaking', 420, 1)
  body.gain.value = 4
  const air = filter(ctx, 'highshelf', 3500)
  air.gain.value = -8
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + attack)
  g.gain.setValueAtTime(gain, Math.max(t + attack, end))
  g.gain.linearRampToValueAtTime(0.0001, end + release)
  lp.connect(body).connect(air).connect(g)

  if (opts.tremolo) {
    const trem = ctx.createOscillator()
    trem.frequency.value = opts.tremolo
    const depth = ctx.createGain()
    depth.gain.value = gain * 0.7
    trem.connect(depth).connect(g.gain)
    trem.start(t)
    trem.stop(end + release)
  }

  for (const det of [-9, 1, 8]) {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = f
    osc.detune.value = det
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 4.8 + Math.random() * 1.2
    const vd = ctx.createGain()
    vd.gain.setValueAtTime(0, t)
    vd.gain.linearRampToValueAtTime(9, t + Math.min(0.8, dur))
    lfo.connect(vd).connect(osc.detune)
    const og = ctx.createGain()
    og.gain.value = 0.33
    osc.connect(og).connect(lp)
    for (const s of [osc, lfo]) {
      s.start(t)
      s.stop(end + release + 0.05)
    }
  }
  toOut(g, o, opts.pan ?? 0)
}

export const stringChord = (o: Out, t: number, midis: number[], dur: number, opts: StringOpts = {}) =>
  midis.forEach((m) => strings(o, t, m, dur, { ...opts, pan: opts.pan ?? (m - 60) / 40 }))

/** Short, bouncing spiccato stroke. */
export const spiccato = (o: Out, t: number, midi: number, gain = 0.06) =>
  strings(o, t, midi, 0.07, { gain, attack: 0.012, release: 0.12, bright: 0.7 })

/** Pizzicato: a plucked violin or cello string. */
export const pizz = (o: Out, t: number, midi: number, gain = 0.25, pan = 0) =>
  pluck(o, t, midi, { bright: 0.55, sustain: midi < 48 ? 0.992 : 0.985, seconds: 0.9, tone: 2600, gain, pan })

// ---------------------------------------------------------------- solo bowed line

export interface LineNote {
  midi: number
  dur: number // seconds
}

/**
 * A legato solo line on one bow: cello or violin. Notes glide into each
 * other, each bow change has a small swell, and vibrato blooms on long notes.
 */
export function bowedLine(o: Out, t: number, notes: LineNote[], voice: 'cello' | 'violin', gain = 0.09, pan = 0) {
  if (!notes.length) return
  const { ctx } = o
  const total = notes.reduce((s, n) => s + n.dur, 0)
  const end = t + total

  const oscs = [ctx.createOscillator(), ctx.createOscillator()]
  oscs[1].detune.value = 5
  let at = t
  for (const [i, n] of notes.entries()) {
    const f = midiToFreq(n.midi)
    for (const osc of oscs) {
      osc.type = 'sawtooth'
      if (i === 0) osc.frequency.setValueAtTime(f, at)
      else {
        osc.frequency.setValueAtTime(midiToFreq(notes[i - 1].midi), at)
        osc.frequency.exponentialRampToValueAtTime(f, at + 0.07)
      }
    }
    at += n.dur
  }

  const lfo = ctx.createOscillator()
  lfo.frequency.value = voice === 'cello' ? 5.2 : 5.8
  const vd = ctx.createGain()
  vd.gain.value = 0
  at = t
  for (const n of notes) {
    vd.gain.setValueAtTime(0, at)
    vd.gain.linearRampToValueAtTime(n.dur > 0.5 ? 16 : 5, at + Math.min(0.6, n.dur))
    at += n.dur
  }
  lfo.connect(vd)
  oscs.forEach((osc) => vd.connect(osc.detune))

  // Body resonances shape the saw into a string instrument.
  const formants =
    voice === 'cello'
      ? [
          [230, 6],
          [650, 4],
          [1900, 2],
        ]
      : [
          [480, 4],
          [1100, 2],
          [2900, 5],
        ]
  let chain: AudioNode = filter(ctx, 'lowpass', voice === 'cello' ? 3200 : 6500, 0.6)
  const head = chain
  for (const [fq, gdb] of formants) {
    const pk = filter(ctx, 'peaking', fq, 1.2)
    pk.gain.value = gdb
    chain.connect(pk)
    chain = pk
  }
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  at = t
  for (const n of notes) {
    // Bow change: dip, then swell into the note, easing off at its end.
    g.gain.linearRampToValueAtTime(gain * 0.55, at + 0.02)
    g.gain.linearRampToValueAtTime(gain, at + Math.min(0.25, n.dur * 0.4))
    g.gain.linearRampToValueAtTime(gain * 0.75, at + n.dur - 0.02)
    at += n.dur
  }
  g.gain.linearRampToValueAtTime(0.0001, end + 0.25)
  oscs.forEach((osc) => {
    const og = ctx.createGain()
    og.gain.value = 0.5
    osc.connect(og).connect(head)
  })
  chain.connect(g)
  // Rosin: a little bow noise riding on the tone.
  const bow = noise(ctx, t, total + 0.3)
  const bg = ctx.createGain()
  bg.gain.value = 0.05
  bow.connect(filter(ctx, 'bandpass', voice === 'cello' ? 1500 : 3500, 1)).connect(bg).connect(g)
  toOut(g, o, pan)
  for (const s of [...oscs, lfo]) {
    s.start(t)
    s.stop(end + 0.3)
  }
}

/** Builds a line from beat lengths: [[midi, beats], ...]. */
export const line = (beat: number, spec: [number, number][]): LineNote[] => spec.map(([midi, b]) => ({ midi, dur: b * beat }))

// ---------------------------------------------------------------- percussion

/** Timpani hit, tuned. */
export function timpani(o: Out, t: number, midi: number, gain = 0.3) {
  const { ctx } = o
  const f = midiToFreq(midi)
  const g = ctx.createGain()
  ;[1, 1.5, 1.98].forEach((r, i) => {
    const osc = ctx.createOscillator()
    osc.frequency.setValueAtTime(f * r * 1.02, t)
    osc.frequency.exponentialRampToValueAtTime(f * r, t + 0.08)
    const e = env(ctx, t, gain / (i + 1), 0.004, 1.6 / (i + 1))
    osc.connect(e).connect(g)
    osc.start(t)
    osc.stop(t + 1.8)
  })
  const skin = noise(ctx, t, 0.15)
  const se = env(ctx, t, gain * 0.5, 0.002, 0.08)
  skin.connect(filter(ctx, 'lowpass', 900)).connect(se).connect(g)
  toOut(g, o, -0.15)
}

/** Timpani roll swelling over `dur` seconds. */
export function timpaniRoll(o: Out, t: number, midi: number, dur: number, peak = 0.2) {
  const hits = Math.floor(dur / 0.07)
  for (let i = 0; i < hits; i++) timpani(o, t + i * 0.07 + Math.random() * 0.01, midi, peak * (0.15 + 0.85 * (i / hits) ** 2))
}
