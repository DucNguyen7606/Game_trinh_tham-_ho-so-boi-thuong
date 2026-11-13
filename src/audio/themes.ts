/**
 * Original, generative music in a cinematic piano-and-strings style.
 * Each theme schedules one bar at a time from a seeded random source, so
 * it follows a composed form yet never repeats note for note.
 *
 * Everything is in or around D minor so themes crossfade smoothly. The
 * series motif (D – A – F – E | D – C – Bb – A) recurs in several themes,
 * and đàn tranh / đàn bầu add a Vietnamese accent at phrase ends.
 */
import { pick, type Out, type Rnd } from './core'
import { danBau, danTranh, bell, riser, tick } from './instruments'
import {
  bowedLine,
  line,
  piano,
  pianoChord,
  pizz,
  spiccato,
  stringChord,
  strings,
  timpani,
  timpaniRoll,
} from './orchestral'

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

// The series motif, two bars of [midi, beats].
const MOTIF_A: [number, number][] = [
  [74, 1],
  [69, 1],
  [77, 1.5],
  [76, 0.5],
]
const MOTIF_B: [number, number][] = [
  [74, 1],
  [72, 1],
  [70, 1],
  [69, 1],
]
const shift = (m: [number, number][], by: number) => m.map(([n, b]) => [n + by, b] as [number, number])

/** Plays [midi, beats] pairs on the piano, right hand. */
function pianoMelody(o: Out, t: number, beat: number, notes: [number, number][], gain = 0.26) {
  let pos = 0
  for (const [m, b] of notes) {
    piano(o, t + pos * beat, m, b * beat * 0.95, gain)
    pos += b
  }
}

/** Left-hand broken chord in eighths: root, fifth, tenth, fifth... */
function brokenChord(o: Out, t: number, beat: number, c: Chord, gain = 0.14, eighths = 8) {
  const pattern = [c.root, c.root + 7, c.tones[1] ?? c.root + 15, c.root + 7 + 12, c.tones[2] ?? c.root + 19, c.root + 7 + 12, c.tones[1] ?? c.root + 15, c.root + 7]
  for (let i = 0; i < eighths; i++) piano(o, t + i * beat * 0.5, pattern[i % 8], undefined, gain * (i % 4 === 0 ? 1.15 : 0.85))
}

// ---------------------------------------------------------------- 1. Màn hình chính (series title)

const MENU_CHORDS: Chord[] = [
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 36, tones: [57, 60, 65] }, // Dm/C
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 33, tones: [57, 61, 64] }, // A
]

const menu: Theme = {
  id: 'menu',
  title: 'Màn hình chính (chủ đề series)',
  bpm: 66,
  beats: 4,
  level: 0.6,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = MENU_CHORDS[bar % 4]
    const motif = bar % 2 === 0 ? MOTIF_A : MOTIF_B

    // Low piano octave pedal on every bar.
    piano(o, t, c.root, beat * 4, 0.2)
    piano(o, t, c.root + 12, beat * 4, 0.14)

    if (phase < 4) {
      // Intro: the motif alone on piano.
      pianoMelody(o, t, beat, motif, 0.28)
    } else if (phase < 8) {
      stringChord(o, t, c.tones, beat * 4, { gain: 0.03, attack: 1.2 })
      pianoMelody(o, t, beat, motif, 0.26)
      brokenChord(o, t, beat, c, 0.08)
    } else if (phase < 12) {
      // The cello takes the tune; piano accompanies.
      stringChord(o, t, c.tones, beat * 4, { gain: 0.03, attack: 0.8 })
      bowedLine(o, t, line(beat, shift(motif, -24)), 'cello', 0.1, -0.2)
      brokenChord(o, t, beat, c, 0.1)
    } else {
      // Full: violins sing the motif up high over timpani.
      stringChord(o, t, [...c.tones, c.root + 12], beat * 4, { gain: 0.035, attack: 0.5, bright: 0.7 })
      bowedLine(o, t, line(beat, motif), 'violin', 0.08, 0.2)
      brokenChord(o, t, beat, c, 0.1)
      timpani(o, t, c.root + 12, 0.25)
      if (phase === 15) {
        timpaniRoll(o, t + beat * 2, 38, beat * 2, 0.18)
        // Đàn tranh glissando down into the return of the theme.
        for (let i = 0; i < 6; i++) danTranh(o, t + beat * 3 + i * 0.07, [86, 84, 81, 79, 77, 74][i], { gain: 0.12, pan: 0.4 })
      }
    }
    if (phase === 7 && r() < 0.8) danBau(o, t + beat * 2, { midi: 69, dur: beat * 2, from: -2, vibrato: 0.4, gain: 0.12 }, 0.3)
  },
}

// ---------------------------------------------------------------- 2. Bàn làm việc (reading files, deducing)

// Light-footed and curious, like a mind ticking over: pizzicato, piano, strings.
const DESK_CHORDS: Chord[] = [
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 43, tones: [58, 62, 67] }, // Gm
  { root: 45, tones: [57, 61, 64] }, // A
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 45, tones: [55, 61, 64] }, // A7
]
// D harmonic minor for the piano's thoughts.
const D_HARM = [62, 64, 65, 67, 69, 70, 73, 74, 76, 77, 79, 81]

function deskPhrase(r: Rnd, start: number): [number, number][] {
  const out: [number, number][] = []
  let idx = start
  let beats = 0
  while (beats < 4) {
    const b = pick(r, [0.5, 0.5, 1, 1, 1.5]) as number
    const len = Math.min(b, 4 - beats)
    out.push([D_HARM[idx], len])
    beats += len
    idx = Math.max(0, Math.min(D_HARM.length - 1, idx + pick(r, [-2, -1, -1, 1, 1, 2])))
  }
  return out
}

const desk: Theme = {
  id: 'desk',
  title: 'Bàn làm việc (piano, pizzicato)',
  bpm: 92,
  beats: 4,
  level: 1.5,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const section = Math.floor(bar / 8) % 4
    const c = DESK_CHORDS[bar % 8]

    // Pizzicato ostinato: root, fifth, octave, fifth in eighths.
    const pat = [c.root + 12, c.root + 19, c.root + 24, c.root + 19]
    for (let i = 0; i < 8; i++) pizz(o, t + i * beat * 0.5, pat[i % 4], i % 2 ? 0.16 : 0.22, -0.3)
    pizz(o, t, c.root, 0.3, 0)

    // Soft string bed, and offbeat staccato chords in later sections.
    stringChord(o, t, c.tones, beat * 4, { gain: 0.018, attack: 0.6 })
    if (section >= 2) for (const off of [1.5, 3.5]) c.tones.forEach((m) => spiccato(o, t + off * beat, m + 12, 0.03))

    // Piano thinks aloud in sections 1 and 3, in two-bar phrases.
    if ((section === 1 || section === 3) && bar % 2 === 0) pianoMelody(o, t, beat, deskPhrase(r, 4 + Math.floor(r() * 4)), 0.22)
    if ((section === 1 || section === 3) && bar % 2 === 1 && r() < 0.6) pianoMelody(o, t, beat, [[c.tones[2] + 12, 2], [c.tones[1] + 12, 2]], 0.16)

    // Violin countermelody in section 2: long notes over the bustle.
    if (section === 2 && bar % 2 === 0) {
      const top = c.tones[2] + 12
      bowedLine(o, t, line(beat, [[top, 3], [top - pick(r, [1, 2]), 1], [top - 3, 4]]), 'violin', 0.06, 0.25)
    }
    // A glint of celesta, and a đàn tranh answer at the end of each 8 bars.
    if (r() < 0.25) bell(o, t + beat * pick(r, [1.5, 2.5, 3.5]), pick(r, [81, 86, 89]), 0.025, 1.5, 0.4)
    if (bar % 8 === 7 && r() < 0.7) [74, 72, 69].forEach((m, i) => danTranh(o, t + (2 + i * 0.5) * beat, m, { gain: 0.12, pan: 0.35 }))
  },
}

// ---------------------------------------------------------------- 3. Hiện trường (crime scene)

// Melancholic solo piano with strings, in the spirit of a sad film score.
const SCENE_CHORDS: Chord[] = [
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 41, tones: [57, 60, 65] }, // F
  { root: 36, tones: [55, 60, 64] }, // C
  { root: 43, tones: [58, 62, 67] }, // Gm
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 33, tones: [57, 61, 64] }, // A
]
const SCENE_MELODY: [number, number][][] = [
  [[77, 3], [76, 1]],
  [[74, 2], [72, 1], [74, 1]],
  [[72, 3], [69, 1]],
  [[67, 4]],
  [[70, 2], [69, 1], [67, 1]],
  [[65, 2], [69, 2]],
  [[74, 3], [72, 1]],
  [[73, 4]],
]

const scene: Theme = {
  id: 'scene',
  title: 'Hiện trường (piano buồn, dàn dây)',
  bpm: 60,
  beats: 4,
  level: 1,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = SCENE_CHORDS[bar % 8]

    brokenChord(o, t, beat, c, 0.12)
    if (phase >= 4) stringChord(o, t, c.tones, beat * 4, { gain: 0.022, attack: 1.5, release: 1.5 })
    // Piano melody in the first half, the cello answers in the second.
    if (phase >= 4 && phase < 12) pianoMelody(o, t, beat, SCENE_MELODY[bar % 8], 0.24)
    if (phase >= 12 && bar % 2 === 0) {
      const a = SCENE_MELODY[bar % 8]
      const b = SCENE_MELODY[(bar + 1) % 8]
      bowedLine(o, t, line(beat, shift([...a, ...b], -12)), 'cello', 0.085, -0.2)
    }
    // A single đàn tranh note with a sliding bend at some phrase ends.
    if ((phase === 3 || phase === 11) && r() < 0.8)
      danTranh(o, t + beat * 2.5, pick(r, [67, 72]), { gain: 0.14, bend: 2, bendAt: 0.35, bendTime: 0.25, pan: 0.35 })
  },
}

// ---------------------------------------------------------------- 4. Thẩm vấn (interrogation)

const interrogation: Theme = {
  id: 'interrogation',
  title: 'Phòng thẩm vấn (dàn dây căng)',
  bpm: 100,
  beats: 4,
  level: 0.8,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const phase = bar % 8
    // Ostinato roots: D – D – Eb – D | D – C – Eb – Eb
    const root = [38, 38, 39, 38, 38, 36, 39, 39][phase]

    // Low strings spiccato in driving eighths, with an accent pattern 3+3+2.
    for (let i = 0; i < 8; i++) {
      const acc = i === 0 || i === 3 || i === 6
      spiccato(o, t + i * beat * 0.5, root + 12, acc ? 0.09 : 0.05)
      if (acc) spiccato(o, t + i * beat * 0.5, root, 0.07)
    }
    timpani(o, t, root, 0.32)
    if (phase >= 4) timpani(o, t + beat * 1.5, root, 0.2)

    // High violins: a sustained, uneasy minor second, trembling.
    if (phase === 4) {
      strings(o, t, 81, beat * 16, { gain: 0.022, attack: 2, tremolo: 11, bright: 0.8, pan: 0.3 })
      strings(o, t, 82, beat * 16, { gain: 0.018, attack: 3, tremolo: 11, bright: 0.8, pan: 0.4 })
    }
    // Piano: a dark low cluster that lands like a question.
    if (phase === 0 || phase === 6) pianoChord(o, t, [26, 38, 39, 45], beat * 2, 0.2, 0.004)
    // A cello line creeping upward in the second half.
    if (phase === 4) bowedLine(o, t, line(beat, [[50, 2], [51, 2], [53, 4], [54, 4], [55, 4]]), 'cello', 0.07, -0.25)

    // Clock on the wall, quietly.
    for (let i = 0; i < 4; i++) tick(o, t + i * beat, i % 2 === 1, 0.025)
    if (phase === 7) riser(o, t + beat, beat * 3, 0.03)
    if (phase === 3 && r() < 0.6) danBau(o, t + beat * 2, { midi: pick(r, [75, 74]), dur: beat * 2, to: -3, vibrato: 0.25, gain: 0.08 }, -0.3)
  },
}

// ---------------------------------------------------------------- 5. Kết luận (verdict)

const VERDICT_CHORDS: Chord[] = [
  { root: 41, tones: [57, 60, 65] }, // F
  { root: 40, tones: [55, 60, 64] }, // C/E
  { root: 38, tones: [57, 62, 65] }, // Dm
  { root: 34, tones: [58, 62, 65] }, // Bb
  { root: 45, tones: [57, 60, 65] }, // F/A
  { root: 43, tones: [58, 62, 67] }, // Gm
  { root: 36, tones: [55, 60, 64] }, // C
  { root: 36, tones: [58, 60, 64] }, // C7
]
// F major pentatonic tune; ends of phrases slide like đàn bầu.
const VERDICT_MELODY: [number, number][][] = [
  [[72, 2], [69, 1], [67, 1]],
  [[69, 3], [72, 1]],
  [[74, 2], [72, 1], [69, 1]],
  [[67, 4]],
  [[69, 2], [72, 1], [74, 1]],
  [[77, 2], [74, 2]],
  [[72, 2], [70, 1], [69, 1]],
  [[67, 4]],
]

const verdict: Theme = {
  id: 'verdict',
  title: 'Kết luận hồ sơ (piano, dàn dây, đàn bầu)',
  bpm: 58,
  beats: 4,
  level: 1.1,
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const phase = bar % 16
    const c = VERDICT_CHORDS[bar % 8]
    const mel = VERDICT_MELODY[bar % 8]

    brokenChord(o, t, beat, c, 0.11)
    stringChord(o, t, c.tones, beat * 4, { gain: phase < 8 ? 0.02 : 0.032, attack: 1.2, release: 1.4 })
    if (phase >= 8) strings(o, t, c.root, beat * 4, { gain: 0.03, attack: 0.8 })

    if (phase < 8) pianoMelody(o, t, beat, mel, 0.24)
    else if (bar % 2 === 0) {
      // Violins take the tune, doubled now and then by đàn bầu.
      const two = [...mel, ...VERDICT_MELODY[(bar + 1) % 8]]
      bowedLine(o, t, line(beat, two), 'violin', 0.07, 0.2)
      if (phase >= 12) {
        let pos = 0
        for (const [m, b] of two) {
          danBau(o, t + pos * beat, { midi: m, dur: b * beat, vibrato: 0.4, gain: 0.08, from: b >= 3 ? -2 : undefined }, -0.25)
          pos += b
        }
      }
    }
    if (phase === 15) timpaniRoll(o, t + beat * 2, 41, beat * 2, 0.12)
    if (phase === 7 && r() < 0.7) bell(o, t + beat * 3, 84, 0.03, 3, 0.3)
  },
}

export const THEMES: Record<ThemeId, Theme> = { menu, desk, scene, interrogation, verdict }
