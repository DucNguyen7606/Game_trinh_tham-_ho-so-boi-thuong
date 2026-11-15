/**
 * Original music in a minimal film-score style. Rules every theme follows:
 * two or three instruments at most, dark and soft tone (no bright highs),
 * and only one melody at a time over a simple, slow accompaniment.
 *
 * Everything is in or around D minor so themes crossfade smoothly, and the
 * series motif (D – A – F, E – D – C, Bb – A) recurs across themes.
 */
import type { Out, Rnd } from './core'
import { danBau } from './instruments'
import { bowedLine, line, piano, stringChord, strings } from './orchestral'

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

interface Chord {
  root: number // bass note
  tones: number[] // mid-register voicing
}

// The series motif, a four-bar phrase of [midi, beats], in a low, warm register.
const MOTIF: [number, number][][] = [
  [[62, 2], [57, 1], [65, 1]],
  [[64, 2], [62, 1], [60, 1]],
  [[58, 3], [57, 1]],
  [[57, 4]],
]
const shift = (m: [number, number][], by: number) => m.map(([n, b]) => [n + by, b] as [number, number])

/** Plays [midi, beats] pairs on the piano, one note at a time. */
function pianoMelody(o: Out, t: number, beat: number, notes: [number, number][], gain = 0.22) {
  let pos = 0
  for (const [m, b] of notes) {
    piano(o, t + pos * beat, m, b * beat, gain)
    pos += b
  }
}

/** Soft, dark string bed holding the chord for the whole bar. */
const bed = (o: Out, t: number, c: Chord, dur: number, gain = 0.022) =>
  stringChord(o, t, c.tones, dur, { gain, attack: 1.4, release: 1.6, bright: 0.1, pan: 0 })

const Dm: Chord = { root: 38, tones: [50, 57, 62, 65] }
const DmC: Chord = { root: 36, tones: [48, 57, 62, 65] }
const Bb: Chord = { root: 34, tones: [46, 58, 62, 65] }
const Gm: Chord = { root: 43, tones: [43, 58, 62, 67] }
const A: Chord = { root: 33, tones: [45, 57, 61, 64] }
const F: Chord = { root: 41, tones: [41, 57, 60, 65] }
const C: Chord = { root: 36, tones: [48, 55, 60, 64] }

// ---------------------------------------------------------------- 1. Màn hình chính: piano, dàn dây, cello

const menu: Theme = {
  id: 'menu',
  title: 'Màn hình chính (piano, dàn dây, cello)',
  bpm: 60,
  beats: 4,
  level: 1,
  bar(o, t, bar) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = [Dm, DmC, Bb, A][bar % 4]
    const motif = MOTIF[bar % 4]
    piano(o, t, c.root + 12, beat * 4, 0.16)
    if (phase >= 2) bed(o, t, c, beat * 4)
    // The piano states the motif, then hands it to the cello an octave down.
    if (phase < 8) pianoMelody(o, t, beat, motif)
    else if (phase % 4 === 0) bowedLine(o, t, line(beat, shift(MOTIF.flat(), -12)), 'cello', 0.08, 0)
  },
}

// ---------------------------------------------------------------- 2. Bàn làm việc: piano, dàn dây

const desk: Theme = {
  id: 'desk',
  title: 'Bàn làm việc (piano, dàn dây)',
  bpm: 66,
  beats: 4,
  level: 1.6,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const c = [Dm, Dm, Bb, Bb, Gm, Gm, A, A][bar % 8]
    bed(o, t, c, beat * 4, 0.02)
    piano(o, t, c.root + 12, beat * 4, 0.14)
    // A quiet two-note figure, like a thought turning over...
    if (bar % 8 < 6) {
      const hi = c.tones[2]
      const lo = c.tones[1]
      piano(o, t + beat, hi, beat * 2, 0.15)
      piano(o, t + beat * 3, r() < 0.5 ? lo : c.tones[3], beat, 0.13)
    } else if (bar % 8 === 6) {
      // ...and at the end of each round, the series motif's opening.
      pianoMelody(o, t, beat, [[62, 1], [57, 1], [65, 2]], 0.17)
    }
  },
}

// ---------------------------------------------------------------- 3. Hiện trường: piano, cello

const scene: Theme = {
  id: 'scene',
  title: 'Hiện trường (piano, cello)',
  bpm: 56,
  beats: 4,
  level: 1.25,
  bar(o, t, bar) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = [Dm, Bb, F, C, Gm, Dm, Bb, A][bar % 8]
    // Slow piano arpeggio in quarter notes: root, fifth, third, fifth.
    const arp = [c.root + 12, c.root + 19, c.tones[2], c.root + 19]
    arp.forEach((m, i) => piano(o, t + i * beat, m, undefined, i === 0 ? 0.17 : 0.12))
    // The cello sings a long, slow line through the second half.
    if (phase === 8)
      bowedLine(o, t, line(beat, [[57, 4], [58, 3], [57, 1], [53, 4], [55, 4], [53, 3], [50, 1], [55, 4], [57, 4]]), 'cello', 0.08, 0)
  },
}

// ---------------------------------------------------------------- 4. Thẩm vấn: dàn dây trầm, piano

const interrogation: Theme = {
  id: 'interrogation',
  title: 'Phòng thẩm vấn (dàn dây trầm, piano)',
  bpm: 84,
  beats: 4,
  level: 1.45,
  bar(o, t, bar) {
    const beat = 60 / this.bpm
    const phase = bar % 8
    const root = [38, 38, 39, 38, 38, 36, 39, 39][phase]
    // Low strings pulse in quarter notes, dark and steady like a held breath.
    for (let i = 0; i < 4; i++) strings(o, t + i * beat, root + 12, beat * 0.6, { gain: i === 0 ? 0.05 : 0.035, attack: 0.03, release: 0.25, bright: 0.05 })
    // One high, quiet held note in the second half: the question hanging.
    if (phase === 4) strings(o, t, 69, beat * 16, { gain: 0.015, attack: 3, release: 2, bright: 0.1 })
    // Piano: single low notes, a minor second apart, every other bar.
    if (phase % 2 === 0) piano(o, t, root, beat * 3, 0.2)
    if (phase === 3 || phase === 7) piano(o, t + beat * 2, root + 13, beat * 2, 0.12)
  },
}

// ---------------------------------------------------------------- 5. Kết luận: piano, dàn dây, đàn bầu

// F major pentatonic tune, first on piano, then sung by đàn bầu.
const VERDICT_MELODY: [number, number][][] = [
  [[69, 2], [67, 1], [65, 1]],
  [[67, 4]],
  [[69, 2], [72, 1], [69, 1]],
  [[67, 4]],
  [[65, 2], [67, 1], [69, 1]],
  [[72, 2], [69, 2]],
  [[67, 2], [65, 1], [62, 1]],
  [[65, 4]],
]

const verdict: Theme = {
  id: 'verdict',
  title: 'Kết luận hồ sơ (piano, dàn dây, đàn bầu)',
  bpm: 58,
  beats: 4,
  level: 1.3,
  bar(o, t, bar) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = [F, C, Dm, Bb, F, Gm, C, F][bar % 8]
    const mel = VERDICT_MELODY[bar % 8]
    bed(o, t, c, beat * 4, 0.022)
    piano(o, t, c.root + 12, beat * 4, 0.15)
    if (phase < 8) pianoMelody(o, t, beat, mel, 0.2)
    else {
      let pos = 0
      for (const [m, b] of mel) {
        danBau(o, t + pos * beat, { midi: m, dur: b * beat, vibrato: 0.35, gain: 0.12, from: b >= 2 && pos === 0 ? -2 : undefined }, 0)
        pos += b
      }
    }
  },
}

export const THEMES: Record<ThemeId, Theme> = { menu, desk, scene, interrogation, verdict }
