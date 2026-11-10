/**
 * Original, generative music themes. Each theme schedules one bar at a time
 * from a seeded random source, so it never loops audibly yet stays in style.
 *
 * Everything sits around D minor / F major so themes crossfade smoothly, and
 * the Vietnamese colour comes from the pentatonic modes (điệu Bắc: D F G A C,
 * điệu Nam/oán-flavoured bends) played on synthesised đàn tranh and đàn bầu.
 */
import { filter, noise, pick, rng, type Out, type Rnd } from './core'
import {
  bass,
  bell,
  brush,
  danBau,
  danTranh,
  epiano,
  kick,
  pad,
  pulseSynth,
  ride,
  riser,
  rumble,
  sax,
  tick,
} from './instruments'

export type ThemeId = 'noir' | 'rain' | 'interrogation' | 'verdict'

export interface Theme {
  id: ThemeId
  title: string
  bpm: number
  beats: number
  /** Loudness trim so themes match when crossfading. */
  level?: number
  /** Schedule bar number `bar` starting at time `t`. */
  bar(o: Out, t: number, bar: number, r: Rnd): void
  /** Optional continuous bed (rain, traffic). Returns a stop function. */
  ambience?(o: Out, t: number): (at: number) => void
}

// D minor pentatonic (điệu Bắc on D): D F G A C
const PENTA = [62, 65, 67, 69, 72, 74, 77, 79, 81, 84]

// ---------------------------------------------------------------- ambience beds

const rainCache = new WeakMap<BaseAudioContext, AudioBuffer>()
/** Six seconds of rain: soft pink-ish hiss plus scattered droplets. */
function rainBuffer(ctx: BaseAudioContext) {
  let b = rainCache.get(ctx)
  if (b) return b
  const sr = ctx.sampleRate
  const n = sr * 6
  b = ctx.createBuffer(2, n, sr)
  const r = rng(3)
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch)
    let b0 = 0,
      b1 = 0,
      b2 = 0
    for (let i = 0; i < n; i++) {
      const w = r() * 2 - 1
      b0 = 0.99765 * b0 + w * 0.099
      b1 = 0.963 * b1 + w * 0.2965
      b2 = 0.57 * b2 + w * 1.0527
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.12
    }
    // Droplets on tin roofs and puddles: tiny decaying sine pings.
    for (let k = 0; k < 900; k++) {
      const start = Math.floor(r() * (n - sr * 0.05))
      const f = 1800 + r() * 5000
      const amp = 0.02 + r() * r() * 0.12
      const len = Math.floor(sr * (0.004 + r() * 0.02))
      for (let j = 0; j < len; j++) d[start + j] += amp * Math.sin((2 * Math.PI * f * j) / sr) * (1 - j / len) ** 2
    }
    // Crossfade the ends so the loop is seamless.
    const fade = sr / 2
    for (let i = 0; i < fade; i++) {
      const a = i / fade
      d[i] = d[i] * a + d[n - fade + i] * (1 - a)
    }
  }
  rainCache.set(ctx, b)
  return b
}

/** Rain + distant Saigon traffic hum. `level` scales the whole bed. */
function cityRain(o: Out, t: number, level: number, traffic: boolean) {
  const { ctx } = o
  const bed = ctx.createGain()
  bed.gain.setValueAtTime(0.0001, t)
  bed.gain.linearRampToValueAtTime(level, t + 3)
  bed.connect(o.dry)

  const rain = ctx.createBufferSource()
  rain.buffer = rainBuffer(ctx)
  rain.loop = true
  rain.loopStart = 0.5
  rain.loopEnd = 6
  const hp = filter(ctx, 'highpass', 350)
  const lp = filter(ctx, 'lowpass', 5000)
  rain.connect(hp).connect(lp).connect(bed)
  rain.start(t)
  const sources: AudioScheduledSourceNode[] = [rain]

  if (traffic) {
    // Low rolling hum of motorbikes several streets away, slowly breathing.
    const hum = noise(ctx, t, 0, true)
    const hlp = filter(ctx, 'lowpass', 180, 0.9)
    const hg = ctx.createGain()
    hg.gain.value = 0.5
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const ld = ctx.createGain()
    ld.gain.value = 0.25
    lfo.connect(ld).connect(hg.gain)
    hum.connect(hlp).connect(hg).connect(bed)
    lfo.start(t)
    sources.push(hum, lfo)
  }
  return (at: number) => {
    bed.gain.cancelScheduledValues(at)
    bed.gain.setValueAtTime(bed.gain.value, at)
    bed.gain.linearRampToValueAtTime(0.0001, at + 2)
    sources.forEach((s) => s.stop(at + 2.1))
  }
}

// ---------------------------------------------------------------- 1. Jazz noir (reading files, deducing)

// Eight-bar progression in D minor: i9 – i9 – iv9 – iv9 – VImaj7 – V7b9 – i9 – V7alt
const NOIR_CHORDS = [
  { root: 38, voicing: [53, 57, 60, 64], tones: [38, 41, 45, 48] }, // Dm9
  { root: 38, voicing: [53, 57, 60, 64], tones: [38, 41, 45, 48] },
  { root: 43, voicing: [53, 58, 62, 65], tones: [43, 46, 50, 53] }, // Gm9
  { root: 43, voicing: [53, 58, 62, 65], tones: [43, 46, 50, 53] },
  { root: 46, voicing: [53, 57, 62, 65], tones: [46, 50, 53, 57] }, // Bbmaj7
  { root: 45, voicing: [55, 58, 61, 65], tones: [45, 49, 52, 55] }, // A7b9
  { root: 38, voicing: [53, 57, 60, 64], tones: [38, 41, 45, 48] }, // Dm9
  { root: 45, voicing: [55, 58, 61, 65], tones: [45, 49, 52, 46] }, // A7alt
]
// D minor blues for the sax: D F G Ab A C D
const BLUES = [62, 65, 67, 68, 69, 72, 74, 77]

const noir: Theme = {
  id: 'noir',
  title: 'Hồ sơ trong đêm (jazz noir)',
  bpm: 66,
  beats: 4,
  ambience: (o, t) => cityRain(o, t, 0.1, false),
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const swing = beat * 0.66
    const ch = NOIR_CHORDS[bar % 8]
    const next = NOIR_CHORDS[(bar + 1) % 8]

    // Walking bass: root, two chord tones, chromatic approach to the next root.
    const line = [ch.root, pick(r, ch.tones.slice(1)), pick(r, ch.tones), next.root + (r() < 0.5 ? 1 : -1)]
    line.forEach((m, i) => bass(o, t + i * beat, m, i === 0 ? 0.55 : 0.45))

    // Brushes and a lazy ride: "spang-a-lang" with a swung skip note.
    for (let i = 0; i < 4; i++) {
      brush(o, t + i * beat, i % 2 ? 0.05 : 0.03, 0.22)
      ride(o, t + i * beat, i % 2 ? 0.03 : 0.022)
      if (i % 2 === 1 && r() < 0.8) ride(o, t + i * beat + swing, 0.018)
    }

    // Rhodes comping: sparse, behind the beat.
    const comps = pick(r, [[0], [0, 2 + 0.66], [1.66], [0.66, 2.66], [0, 3]] as number[][])
    for (const c of comps) ch.voicing.forEach((m, i) => epiano(o, t + c * beat + i * 0.012, m, beat * 1.3, 0.05, -0.25))

    // The sax speaks in two-bar phrases every four bars, and rests otherwise.
    if (bar % 4 === 1 || (bar % 4 === 2 && r() < 0.3)) {
      let idx = Math.floor(r() * 4) + 2
      let pos = r() < 0.5 ? 0 : 0.66
      while (pos < 3.5) {
        const long = r() < 0.25
        const len = long ? 1.5 : pick(r, [0.66, 0.34, 1])
        sax(o, t + pos * beat, BLUES[idx], len * beat * 0.95, 0.06)
        idx = Math.max(0, Math.min(BLUES.length - 1, idx + pick(r, [-2, -1, -1, 1, 1, 2])))
        pos += len
        if (r() < 0.2) pos += 0.66 // breathe
      }
    }
    // Occasional đàn tranh answer gives the noir a Saigon accent.
    if (bar % 8 === 6 && r() < 0.6) {
      const start = 2 + Math.floor(r() * 3)
      for (let i = 0; i < 3; i++) danTranh(o, t + (2 + i * 0.5) * beat, PENTA[start - i], { gain: 0.12, pan: 0.4 })
    }
  },
}

// ---------------------------------------------------------------- 2. Mưa đêm Sài Gòn (crime scene, the city)

const RAIN_PADS = [
  [50, 57, 62, 64, 65], // Dm(add9)
  [46, 53, 57, 62], // Bbmaj7
  [43, 50, 53, 58, 62], // Gm9
  [45, 52, 55, 62], // Asus4 -> A
]

const rain: Theme = {
  id: 'rain',
  title: 'Mưa đêm Sài Gòn (hiện trường)',
  bpm: 60,
  beats: 4,
  ambience: (o, t) => cityRain(o, t, 0.2, true),
  bar(o, t, bar, r) {
    const beat = 60 / this.bpm
    const barLen = beat * 4
    if (bar % 2 === 0) {
      const chord = RAIN_PADS[(bar / 2) % 4]
      pad(o, t, chord, barLen * 2, 0.035, 700)
      bass(o, t, chord[0] - 12, 0.25)
    }
    // Đàn tranh: a falling "rải" cascade or a few pensive notes with nhấn bends.
    if (r() < 0.7) {
      const cascade = r() < 0.4
      let idx = 4 + Math.floor(r() * 5)
      let pos = Math.floor(r() * 2)
      const notes = cascade ? 5 : 2 + Math.floor(r() * 3)
      for (let i = 0; i < notes && pos < 4; i++) {
        const m = PENTA[Math.max(0, Math.min(PENTA.length - 1, idx))]
        // Bend G up toward A or C up toward D: the sliding inflection of điệu Nam.
        const bend = !cascade && (m % 12 === 7 || m % 12 === 0) && r() < 0.5 ? 2 : 0
        danTranh(o, t + pos * beat, m, { bend, bendAt: 0.3, vibrato: bend ? 0 : r() < 0.4 ? 0.25 : 0, pan: -0.3 + r() * 0.6 })
        idx += cascade ? -1 : pick(r, [-2, -1, 1])
        pos += cascade ? 0.25 : pick(r, [1, 1.5, 0.5])
      }
    }
    // Đàn bầu enters every fourth bar with one long, sliding phrase.
    if (bar % 4 === 3) {
      const a = pick(r, [69, 67, 72])
      danBau(o, t, { midi: a, dur: beat * 2.5, from: -2, vibrato: 0.4, gain: 0.16 }, 0.2)
      danBau(o, t + beat * 2.5, { midi: pick(r, [65, 62]), dur: beat * 1.5, to: r() < 0.5 ? -1 : 0, gain: 0.13 }, 0.2)
    }
    // Distant thunder now and then.
    if (r() < 0.08) rumble(o, t + r() * barLen, 5, 0.2)
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
  ambience: (o, t) => cityRain(o, t, 0.07, false),
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

export const THEMES: Record<ThemeId, Theme> = { noir, rain, interrogation, verdict }

