/**
 * Original, generative music themes. Each theme schedules one bar at a time
 * from a seeded random source, so it never loops audibly yet stays in style.
 *
 * Everything sits around D minor / F major so themes crossfade smoothly, and
 * the Vietnamese colour comes from the pentatonic modes (điệu Bắc: D F G A C,
 * điệu Nam/oán-flavoured bends) played on synthesised đàn tranh and đàn bầu.
 */
import { pick, type Out, type Rnd } from './core'
import { bass, bell, danBau, danTranh, epiano, hat, kick, pad, pulseSynth, rim, riser, snare, subBass, tick } from './instruments'

export type ThemeId = 'menu' | 'desk' | 'scene' | 'interrogation' | 'verdict'

export interface Theme {
  id: ThemeId
  title: string
  bpm: number
  beats: number
  /** Loudness trim so themes match when crossfading. */
  level?: number
  /** Schedule bar number `bar` starting at time `t`. */
  bar(o: Out, t: number, bar: number, r: Rnd): void
}

// D minor pentatonic (điệu Bắc on D): D F G A C
const PENTA = [62, 65, 67, 69, 72, 74, 77, 79, 81, 84]

// ---------------------------------------------------------------- 1. Lo-fi bàn làm việc (desk, case file, board)

// ii – V – I – vi in F, all extended chords: Gm9 – C13 – Fmaj9 – Dm9
const DESK_CHORDS = [
  { root: 43, voicing: [53, 57, 58, 62, 65] },
  { root: 36, voicing: [52, 57, 58, 62] },
  { root: 41, voicing: [52, 55, 57, 60, 64] },
  { root: 38, voicing: [53, 57, 60, 64] },
]

/** Laid-back hip-hop kit: kick, snare a hair late, swung hats. */
function lofiDrums(o: Out, t: number, beat: number, r: Rnd, light: boolean) {
  const swing = beat * 0.5 + beat * 0.08
  kick(o, t, light ? 0.3 : 0.42, 45)
  if (r() < 0.6) kick(o, t + beat * 1.5 + beat * 0.08, light ? 0.18 : 0.26, 45)
  else kick(o, t + beat * 2.5 + beat * 0.08, light ? 0.18 : 0.26, 45)
  if (!light) {
    snare(o, t + beat + 0.02, 0.16)
    snare(o, t + beat * 3 + 0.02, 0.16)
  } else {
    rim(o, t + beat * 3 + 0.02, 0.06)
  }
  for (let i = 0; i < 4; i++) {
    hat(o, t + i * beat, light ? 0.018 : 0.03)
    if (r() < 0.85) hat(o, t + i * beat + swing, light ? 0.012 : 0.02)
  }
}

const desk: Theme = {
  id: 'desk',
  title: 'Bàn làm việc (lo-fi)',
  bpm: 76,
  beats: 4,
  level: 0.8,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const ch = DESK_CHORDS[bar % 4]
    // Keys: a lazy roll into each chord, sometimes a pickup stab.
    ch.voicing.forEach((m, i) => epiano(o, t + i * 0.018, m, beat * 3.4, 0.045, -0.2))
    if (r() < 0.4) ch.voicing.slice(1).forEach((m, i) => epiano(o, t + beat * 3.5 + i * 0.015, m, beat * 0.4, 0.03, -0.2))
    // Round sub bass.
    subBass(o, t, ch.root, beat * 1.4, 0.22)
    subBass(o, t + beat * 2.5, ch.root + (r() < 0.5 ? 7 : 12), beat * 1.2, 0.16)
    if (bar >= 2) lofiDrums(o, t, beat, r, false)
    // A small đàn tranh hook every other bar keeps the Vietnamese colour.
    if (bar % 2 === 1 && r() < 0.75) {
      let idx = 3 + Math.floor(r() * 4)
      let pos = 0.5 + Math.floor(r() * 2) * 0.5
      for (let i = 0; i < 3 + Math.floor(r() * 2) && pos < 4; i++) {
        const m = PENTA[Math.max(0, Math.min(PENTA.length - 1, idx))]
        danTranh(o, t + pos * beat, m, { gain: 0.13, pan: 0.35, bend: i === 0 && r() < 0.3 ? 2 : 0, bendAt: 0.25 })
        idx += pick(r, [-1, -1, 1, -2])
        pos += pick(r, [0.5, 0.5, 1, 0.75])
      }
    }
  },
}

// ---------------------------------------------------------------- 2. Lo-fi hiện trường (crime scene)

// Same style, darker and sparser: Dm9 – Bbmaj7 – Gm9 – A7sus
const SCENE_CHORDS = [
  { root: 38, voicing: [53, 57, 60, 64] },
  { root: 46, voicing: [53, 57, 62, 65] },
  { root: 43, voicing: [53, 57, 58, 62] },
  { root: 45, voicing: [55, 57, 62, 64] },
]

const scene: Theme = {
  id: 'scene',
  title: 'Hiện trường (lo-fi trầm)',
  bpm: 70,
  beats: 4,
  level: 0.8,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const ch = SCENE_CHORDS[bar % 4]
    ch.voicing.forEach((m, i) => epiano(o, t + i * 0.025, m, beat * 3.8, 0.04, 0.2))
    if (bar % 4 === 0) pad(o, t, [50, 57, 62], beat * 16, 0.02, 650)
    subBass(o, t, ch.root, beat * 2.5, 0.22)
    if (bar >= 1) lofiDrums(o, t, beat, r, true)
    // Đàn bầu answers with one sliding phrase every fourth bar.
    if (bar % 4 === 3) {
      danBau(o, t + beat, { midi: pick(r, [69, 72, 67]), dur: beat * 2, from: -2, vibrato: 0.4, gain: 0.14 }, -0.2)
      danBau(o, t + beat * 3, { midi: pick(r, [65, 62]), dur: beat, to: -1, gain: 0.11 }, -0.2)
    } else if (r() < 0.5) {
      // Sparse đàn tranh notes, like someone thinking aloud.
      const n = 1 + Math.floor(r() * 2)
      for (let i = 0; i < n; i++)
        danTranh(o, t + (1 + i * 1.5 + r() * 0.5) * beat, pick(r, PENTA.slice(3, 8)), { gain: 0.12, vibrato: r() < 0.5 ? 0.25 : 0, pan: 0.3 })
    }
  },
}

// ---------------------------------------------------------------- 3. Thẩm vấn (interrogation)

const interrogation: Theme = {
  id: 'interrogation',
  title: 'Phòng thẩm vấn (căng thẳng)',
  level: 2,
  bpm: 92,
  beats: 4,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const phase = bar % 8
    // Ostinato roots: D – D – Eb – D | D – C – Eb – (Eb, rising)
    const root = [38, 38, 39, 38, 38, 36, 39, 39][phase]

    // Sixteenth pulse with accents; filter opens through the phrase.
    for (let i = 0; i < 16; i++) {
      const acc = i % 4 === 0 ? 1 : i % 4 === 3 ? 0.6 : 0.3
      const open = 0.25 + 0.6 * (phase / 7) * acc
      const m = i === 14 && r() < 0.5 ? root + 12 : root
      pulseSynth(o, t + i * beat * 0.25, m, beat * 0.22, 0.05 + 0.04 * acc, open)
    }
    // Heartbeat on beat 1 (lub-dub), and on 3 in the second half.
    kick(o, t, 0.35)
    kick(o, t + beat * 0.28, 0.22)
    if (phase >= 4) {
      kick(o, t + beat * 2, 0.3)
      kick(o, t + beat * 2.28, 0.18)
    }
    // Clock on the wall.
    for (let i = 0; i < 4; i++) tick(o, t + i * beat, i % 2 === 1, 0.04)

    // Dark cluster drone with a minor second rubbing at the top.
    if (phase % 4 === 0) pad(o, t, [50, 57, 63], beat * 16, 0.03, 1200)
    // A đàn bầu glides down like a doubt creeping in.
    if (phase === 3 || (phase === 7 && r() < 0.5))
      danBau(o, t + beat * 2, { midi: pick(r, [75, 74, 72]), dur: beat * 2, to: -3, vibrato: 0.25, gain: 0.1 }, -0.3)
    // Stinger bell and a riser into the top of the phrase.
    if (phase === 6) riser(o, t + beat * 0.5, beat * 7.5, 0.04)
    if (phase === 0 && bar > 0) bell(o, t, 87, 0.035, 3, 0.4)
  },
}

// ---------------------------------------------------------------- 4. Kết luận (verdict, Vietnamese colour)

// F major pentatonic over a slow, bittersweet progression.
const VERDICT_CHORDS = [
  [41, 53, 57, 60, 64], // Fmaj7
  [40, 52, 55, 60, 62], // C/E
  [38, 50, 57, 60, 65], // Dm7
  [46, 53, 58, 62, 65], // Bb(add9)
]
const VERDICT_MELODY: { m: number; d: number; from?: number; to?: number }[][] = [
  [{ m: 72, d: 2, from: -2 }, { m: 69, d: 1 }, { m: 67, d: 1 }],
  [{ m: 69, d: 3, from: -2 }, { m: 72, d: 1 }],
  [{ m: 74, d: 2 }, { m: 72, d: 1 }, { m: 69, d: 1, to: -2 }],
  [{ m: 67, d: 4, from: 2 }],
]

const verdict: Theme = {
  id: 'verdict',
  title: 'Kết luận hồ sơ (màu Việt)',
  level: 1.4,
  bpm: 63,
  beats: 4,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const chord = VERDICT_CHORDS[bar % 4]
    pad(o, t, chord.slice(1), beat * 4, 0.03, 1100)
    bass(o, t, chord[0], 0.3)
    // Đàn tranh "rải" arpeggio, the accompaniment.
    const arp = [chord[1] + 12, chord[2] + 12, chord[3] + 12, chord[4] + 12]
    for (let i = 0; i < 8; i++) {
      if (i > 0 && r() < 0.2) continue
      danTranh(o, t + i * beat * 0.5, arp[i % 4], { gain: 0.09, pan: -0.35 })
    }
    // Đàn bầu sings the melody in the second half of every 8 bars.
    if (bar % 8 >= 4) {
      let pos = 0
      for (const n of VERDICT_MELODY[bar % 4]) {
        danBau(o, t + pos * beat, { midi: n.m, dur: n.d * beat, from: n.from, to: n.to, vibrato: 0.4, gain: 0.17 }, 0.15)
        pos += n.d
      }
    } else if (bar % 2 === 1) {
      bell(o, t + beat * 3, pick(r, [77, 79, 81]), 0.03, 3, 0.3)
    }
  },
}

// ---------------------------------------------------------------- 5. Màn hình chính (series title)

// Slow and cinematic: Dm – Bb – Gm – A, with the series motif on đàn bầu.
const MENU_CHORDS = [
  { root: 38, voicing: [50, 57, 62, 65] },
  { root: 34, voicing: [50, 53, 58, 62] },
  { root: 43, voicing: [50, 55, 58, 62] },
  { root: 33, voicing: [49, 52, 57, 61] },
]
// The motif: D – F – G – A(slide) ... C – A, answered a step lower.
const MENU_MOTIF: { m: number; d: number; from?: number; to?: number }[][] = [
  [{ m: 62, d: 1 }, { m: 65, d: 1 }, { m: 67, d: 2, from: -2 }],
  [{ m: 69, d: 3, from: -2 }, { m: 72, d: 1 }],
  [{ m: 69, d: 2 }, { m: 67, d: 1 }, { m: 65, d: 1 }],
  [{ m: 64, d: 4, from: 1, to: 0 }],
]

const menu: Theme = {
  id: 'menu',
  title: 'Màn hình chính (chủ đề series)',
  bpm: 62,
  beats: 4,
  level: 0.7,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const ch = MENU_CHORDS[bar % 4]
    pad(o, t, ch.voicing, beat * 4, 0.028, 800)
    subBass(o, t, ch.root, beat * 3.5, 0.2)
    // Low piano-like tolls on the downbeat.
    epiano(o, t, ch.root + 12, beat * 3, 0.05, 0)
    // Heartbeat pulse once the intro has settled.
    if (bar >= 4) {
      kick(o, t, 0.22, 42)
      kick(o, t + beat * 0.3, 0.14, 42)
    }
    // Motif on đàn bầu in bars 4–7 of every 8, đàn tranh ripples otherwise.
    if (bar % 8 >= 4) {
      let pos = 0
      for (const n of MENU_MOTIF[bar % 4]) {
        danBau(o, t + pos * beat, { midi: n.m + 12, dur: n.d * beat, from: n.from, to: n.to, vibrato: 0.4, gain: 0.16 }, 0.1)
        pos += n.d
      }
    } else {
      const notes = ch.voicing.map((m) => m + 12)
      for (let i = 0; i < 4; i++) if (r() < 0.75) danTranh(o, t + (1 + i * 0.5) * beat, notes[i], { gain: 0.08, pan: -0.3 })
    }
    if (bar % 8 === 7) riser(o, t + beat * 2, beat * 2, 0.025)
  },
}

export const THEMES: Record<ThemeId, Theme> = { menu, desk, scene, interrogation, verdict }

