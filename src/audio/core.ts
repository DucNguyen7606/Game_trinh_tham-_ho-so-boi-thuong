/**
 * Low-level audio plumbing shared by music and sound effects.
 *
 * Everything is synthesised with the Web Audio API at runtime: there are no
 * audio files and no third-party recordings, so the game ships without any
 * licensing concerns. All functions take a BaseAudioContext so the same code
 * can render live (AudioContext) or to a file (OfflineAudioContext).
 */

/** Where a voice sends its sound: a dry bus and a reverb send. */
export interface Out {
  ctx: BaseAudioContext
  dry: AudioNode
  wet: AudioNode
}

export const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

/** Small seeded PRNG so a theme can vary bar to bar yet be reproducible. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export type Rnd = () => number
export const pick = <T>(r: Rnd, list: readonly T[]): T => list[Math.floor(r() * list.length)]

/** Mixer: music + sfx buses, a shared reverb, a gentle limiter. */
export class Mixer {
  readonly master: GainNode
  readonly music: GainNode
  readonly sfx: GainNode
  readonly reverb: AudioNode

  constructor(readonly ctx: BaseAudioContext) {
    const limiter = ctx.createDynamicsCompressor()
    limiter.threshold.value = -10
    limiter.knee.value = 6
    limiter.ratio.value = 8
    limiter.attack.value = 0.005
    limiter.release.value = 0.2
    limiter.connect(ctx.destination)

    this.master = ctx.createGain()
    this.master.connect(limiter)
    this.music = ctx.createGain()
    this.music.connect(this.master)
    this.sfx = ctx.createGain()
    this.sfx.connect(this.master)

    const conv = ctx.createConvolver()
    conv.buffer = makeImpulse(ctx, 3.2, 2.6)
    const ret = ctx.createGain()
    ret.gain.value = 0.55
    conv.connect(ret).connect(this.master)
    this.reverb = conv
  }

  /**
   * An Out that feeds the given bus. `faders` are the gains to ramp when the
   * whole group (dry and reverb) should fade together, as in a crossfade.
   */
  out(bus: AudioNode, wetLevel = 0.3): Out & { faders: GainNode[] } {
    const dry = this.ctx.createGain()
    dry.connect(bus)
    const wet = this.ctx.createGain()
    wet.gain.value = wetLevel
    const wetFader = this.ctx.createGain()
    wet.connect(wetFader).connect(this.reverb)
    return { ctx: this.ctx, dry, wet, faders: [dry, wetFader] }
  }
}

/** Dark, smooth hall reverb made from decaying filtered noise. */
function makeImpulse(ctx: BaseAudioContext, seconds: number, decay: number) {
  const sr = ctx.sampleRate
  const n = Math.floor(sr * seconds)
  const buf = ctx.createBuffer(2, n, sr)
  const r = rng(7)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    let lp = 0
    for (let i = 0; i < n; i++) {
      const t = i / n
      // Low-pass grows stronger over time so the tail darkens like a real room.
      const k = 0.6 - 0.45 * t
      lp += k * (r() * 2 - 1 - lp)
      d[i] = lp * Math.pow(1 - t, decay) * (i < sr * 0.012 ? i / (sr * 0.012) : 1)
    }
  }
  return buf
}

const noiseCache = new WeakMap<BaseAudioContext, AudioBuffer>()
/** Two seconds of white noise, shared by every noise-based voice. */
export function noiseBuffer(ctx: BaseAudioContext) {
  let b = noiseCache.get(ctx)
  if (!b) {
    const n = ctx.sampleRate * 2
    b = ctx.createBuffer(1, n, ctx.sampleRate)
    const d = b.getChannelData(0)
    const r = rng(99)
    for (let i = 0; i < n; i++) d[i] = r() * 2 - 1
    noiseCache.set(ctx, b)
  }
  return b
}

/** Starts a noise source at a random offset; caller connects and stops it. */
export function noise(ctx: BaseAudioContext, t: number, dur: number, loop = false) {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(ctx)
  src.loop = loop
  src.start(t, Math.random() * 1.5)
  if (!loop) src.stop(t + dur + 0.05)
  return src
}

/** Attack / exponential decay envelope on a fresh gain node. */
export function env(ctx: BaseAudioContext, t: number, peak: number, attack: number, decay: number) {
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay)
  return g
}

export function filter(ctx: BaseAudioContext, type: BiquadFilterType, freq: number, q = 0.7) {
  const f = ctx.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  f.Q.value = q
  return f
}

export function panner(ctx: BaseAudioContext, pan: number) {
  const p = ctx.createStereoPanner()
  p.pan.value = Math.max(-1, Math.min(1, pan))
  return p
}

/** Connects a node to an Out's dry bus and, scaled, to its reverb send. */
export function toOut(node: AudioNode, o: Out, pan = 0) {
  const p = panner(o.ctx, pan)
  node.connect(p)
  p.connect(o.dry)
  p.connect(o.wet)
}

/** Encodes an AudioBuffer as a 16-bit PCM WAV file. */
export function encodeWav(buf: AudioBuffer): Blob {
  const ch = buf.numberOfChannels
  const len = buf.length * ch * 2
  const view = new DataView(new ArrayBuffer(44 + len))
  const str = (o: number, s: string) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)))
  str(0, 'RIFF')
  view.setUint32(4, 36 + len, true)
  str(8, 'WAVE')
  str(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, ch, true)
  view.setUint32(24, buf.sampleRate, true)
  view.setUint32(28, buf.sampleRate * ch * 2, true)
  view.setUint16(32, ch * 2, true)
  view.setUint16(34, 16, true)
  str(36, 'data')
  view.setUint32(40, len, true)
  const chans = Array.from({ length: ch }, (_, i) => buf.getChannelData(i))
  let o = 44
  for (let i = 0; i < buf.length; i++)
    for (let c = 0; c < ch; c++) {
      const s = Math.max(-1, Math.min(1, chans[c][i]))
      view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true)
      o += 2
    }
  return new Blob([view], { type: 'audio/wav' })
}
