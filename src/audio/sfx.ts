/**
 * Sound effects for the investigator's desk. Each is built from noise,
 * filters and plucked strings so every hit sounds slightly different.
 */
import { env, filter, noise, toOut, type Out } from './core'
import { bell, danTranh, kick, pluck } from './instruments'

export type SfxId =
  | 'click'
  | 'shutter'
  | 'paperPick'
  | 'paperDrop'
  | 'pageTurn'
  | 'pin'
  | 'stringPull'
  | 'stringConnect'
  | 'stringCut'
  | 'envelopeOpen'
  | 'correct'
  | 'wrong'
  | 'missing'
  | 'footsteps'
  | 'stamp'
  | 'pen'
  | 'typewriter'

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Short band-passed noise burst: the building block of paper and clicks. */
function burst(o: Out, t: number, freq: number, q: number, gain: number, attack: number, decay: number, pan = 0) {
  const src = noise(o.ctx, t, attack + decay)
  const g = env(o.ctx, t, gain, attack, decay)
  src.connect(filter(o.ctx, 'bandpass', freq, q)).connect(g)
  toOut(g, o, pan)
}

/** Rustle: a cluster of tiny crackles under a filtered sweep. */
function rustle(o: Out, t: number, dur: number, gain: number, from = 1500, to = 4000) {
  const { ctx } = o
  const src = noise(ctx, t, dur)
  const bp = filter(ctx, 'bandpass', from, 1.2)
  bp.frequency.setValueAtTime(from, t)
  bp.frequency.exponentialRampToValueAtTime(to, t + dur)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  // Uneven amplitude makes it read as paper fibres, not hiss.
  const steps = Math.ceil(dur / 0.018)
  for (let i = 0; i < steps; i++) g.gain.setValueAtTime(gain * (0.25 + Math.random() * 0.75), t + i * 0.018)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(bp).connect(g)
  toOut(g, o, rand(-0.2, 0.2))
}

const effects: Record<SfxId, (o: Out, t: number) => void> = {
  // Soft tap of a fingertip on a cardboard folder.
  click: (o, t) => {
    burst(o, t, rand(1800, 2400), 2.5, 0.08, 0.001, 0.035)
    burst(o, t, 300, 1, 0.05, 0.001, 0.04)
  },

  // Film camera: mirror slap, shutter, then the winding lever.
  shutter: (o, t) => {
    burst(o, t, 3500, 1.5, 0.35, 0.001, 0.03)
    burst(o, t + 0.045, 2200, 2, 0.4, 0.001, 0.05)
    kick(o, t + 0.045, 0.12, 80)
    const { ctx } = o
    const wind = noise(ctx, t + 0.18, 0.22)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t + 0.18)
    for (let i = 0; i < 10; i++) g.gain.setValueAtTime(i % 2 ? 0.02 : 0.09, t + 0.18 + i * 0.022)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
    wind.connect(filter(ctx, 'bandpass', 4200, 4)).connect(g)
    toOut(g, o, 0.2)
  },

  paperPick: (o, t) => rustle(o, t, rand(0.18, 0.26), 0.12, 1200, 3800),
  paperDrop: (o, t) => {
    rustle(o, t, 0.12, 0.08, 3000, 1500)
    burst(o, t + 0.06, 220, 1, 0.12, 0.002, 0.08)
  },
  pageTurn: (o, t) => {
    rustle(o, t, 0.35, 0.1, 900, 5000)
    burst(o, t + 0.3, 1500, 1, 0.06, 0.002, 0.06)
  },

  // Push pin into cork board.
  pin: (o, t) => {
    burst(o, t, 5000, 3, 0.15, 0.001, 0.02)
    burst(o, t + 0.015, 400, 1.5, 0.15, 0.002, 0.07)
  },

  // Tension as the string is pulled taut.
  stringPull: (o, t) => {
    const { ctx } = o
    const src = noise(ctx, t, 0.3)
    const bp = filter(ctx, 'bandpass', 600, 8)
    bp.frequency.setValueAtTime(500, t)
    bp.frequency.exponentialRampToValueAtTime(1400, t + 0.3)
    const g = env(ctx, t, 0.07, 0.08, 0.22)
    src.connect(bp).connect(g)
    toOut(g, o, 0)
  },

  // Red string snaps tight between two pins: twang plus pin.
  stringConnect: (o, t) => {
    pluck(o, t, 52 + Math.floor(rand(0, 3)), { bright: 0.6, sustain: 0.99, seconds: 0.8, tone: 2500, gain: 0.35, bend: 3, bendAt: 0.005, bendTime: 0.06 })
    effects.pin(o, t + 0.02)
  },

  // Scissors snip.
  stringCut: (o, t) => {
    burst(o, t, 6000, 4, 0.2, 0.001, 0.04)
    burst(o, t + 0.07, 4500, 4, 0.18, 0.001, 0.05)
  },

  // Tearing open a sealed kraft envelope, then sliding the papers out.
  envelopeOpen: (o, t) => {
    const { ctx } = o
    const tear = noise(ctx, t, 0.7)
    const bp = filter(ctx, 'bandpass', 2600, 0.9)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    for (let i = 0; i < 40; i++) g.gain.setValueAtTime(Math.random() < 0.6 ? rand(0.08, 0.25) : 0.01, t + i * 0.016)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)
    tear.connect(bp).connect(g)
    toOut(g, o, -0.1)
    rustle(o, t + 0.75, 0.5, 0.09, 700, 2500)
    burst(o, t + 1.2, 250, 1, 0.12, 0.003, 0.1)
  },

  // Correct deduction: rising đàn tranh fifth and a warm bell.
  correct: (o, t) => {
    danTranh(o, t, 69, { gain: 0.25 })
    danTranh(o, t + 0.12, 74, { gain: 0.25 })
    danTranh(o, t + 0.24, 81, { gain: 0.2, vibrato: 0.3 })
    bell(o, t + 0.24, 86, 0.05, 2.5)
  },

  // Wrong deduction: dull thud and a sour minor second in the bass.
  wrong: (o, t) => {
    kick(o, t, 0.3, 50)
    pluck(o, t, 40, { bright: 0.3, gain: 0.35, seconds: 1.2, tone: 800 })
    pluck(o, t + 0.02, 41, { bright: 0.3, gain: 0.3, seconds: 1.2, tone: 800, bend: -1, bendAt: 0.2, bendTime: 0.5 })
  },

  // Right idea, missing proof: an unresolved, questioning pair.
  missing: (o, t) => {
    danTranh(o, t, 67, { gain: 0.2 })
    danTranh(o, t + 0.18, 69, { gain: 0.18, bend: 1, bendAt: 0.25, bendTime: 0.25 })
  },

  // Shoes on a wet concrete floor.
  footsteps: (o, t) => {
    for (let i = 0; i < 4; i++) {
      const at = t + i * rand(0.42, 0.5)
      const pan = i % 2 ? 0.25 : -0.25
      burst(o, at, 180, 1, 0.25, 0.004, 0.08, pan)
      burst(o, at + 0.01, rand(2500, 3500), 1.5, 0.06, 0.002, 0.08, pan)
    }
  },

  // Rubber stamp on the report.
  stamp: (o, t) => {
    burst(o, t, 900, 0.8, 0.2, 0.002, 0.03)
    kick(o, t + 0.01, 0.4, 55)
    burst(o, t + 0.01, 150, 1, 0.3, 0.002, 0.12)
  },

  // Pen scribbling a note.
  pen: (o, t) => {
    const n = 5 + Math.floor(rand(0, 4))
    for (let i = 0; i < n; i++) burst(o, t + i * rand(0.06, 0.1), rand(3500, 5500), 3, 0.05, 0.01, 0.06)
  },

  typewriter: (o, t) => {
    burst(o, t, rand(2500, 3200), 3, 0.18, 0.001, 0.02)
    burst(o, t + 0.008, 500, 2, 0.1, 0.001, 0.04)
  },
}

/** Per-effect trims so quiet textures and big stingers sit at similar loudness. */
const TRIM: Partial<Record<SfxId, number>> = {
  click: 12,
  typewriter: 4.5,
  pen: 4,
  pin: 6,
  stringPull: 10,
  paperDrop: 4,
  paperPick: 2,
  pageTurn: 2.2,
  stringCut: 3.5,
  footsteps: 4.5,
  shutter: 1.8,
  stringConnect: 2,
  envelopeOpen: 1.4,
  correct: 1.2,
  wrong: 1.4,
  missing: 1.4,
  stamp: 1.6,
}

export function playSfx(o: Out, id: SfxId, t = o.ctx.currentTime) {
  const k = TRIM[id] ?? 1
  const dry = o.ctx.createGain()
  dry.gain.value = k
  dry.connect(o.dry)
  const wet = o.ctx.createGain()
  wet.gain.value = k
  wet.connect(o.wet)
  effects[id]({ ctx: o.ctx, dry, wet }, t)
}

export const SFX_LIST: { id: SfxId; label: string }[] = [
  { id: 'click', label: 'Bấm nút' },
  { id: 'shutter', label: 'Chụp ảnh hiện trường' },
  { id: 'paperPick', label: 'Nhặt tờ giấy' },
  { id: 'paperDrop', label: 'Đặt giấy xuống' },
  { id: 'pageTurn', label: 'Lật trang hồ sơ' },
  { id: 'pin', label: 'Ghim lên bảng' },
  { id: 'stringPull', label: 'Kéo dây đỏ' },
  { id: 'stringConnect', label: 'Nối dây đỏ' },
  { id: 'stringCut', label: 'Cắt dây đỏ' },
  { id: 'envelopeOpen', label: 'Mở phong bì' },
  { id: 'correct', label: 'Suy luận đúng' },
  { id: 'wrong', label: 'Suy luận sai' },
  { id: 'missing', label: 'Đúng hướng, thiếu chứng cứ' },
  { id: 'footsteps', label: 'Bước chân vào khu vực' },
  { id: 'stamp', label: 'Đóng dấu / qua ngày' },
  { id: 'pen', label: 'Ghi chép' },
  { id: 'typewriter', label: 'Gõ phím (lời thoại)' },
]
