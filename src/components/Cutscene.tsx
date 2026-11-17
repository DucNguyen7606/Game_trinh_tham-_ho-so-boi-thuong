import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsRight } from 'lucide-react'
import { gameAudio } from '@/audio/engine'
import type { SfxId } from '@/audio/sfx'
import { rng } from '@/art/primitives'
import { cn } from '@/lib/utils'

// A cutscene is a short animated film built from drawn shots: each shot is a picture that the
// camera slowly moves over, with narration typed out under it and sound effects on cue.
// Any chapter can describe one as data (see src/cases/<case>/cutscenes.tsx) and get the same
// player: letterbox, cross-fades, click to go on, and a button to skip it all.

/** Where the camera looks: zoom (1 = whole picture) and an offset in percent of the frame. */
export interface Cam {
  zoom?: number
  x?: number
  y?: number
  rotate?: number
}

export interface Shot {
  /** The picture, drawn to fill a 16:9 frame (scene backdrops in 1600x900 fit as they are). */
  Art: () => JSX.Element
  /** Seconds on screen at least. The shot stays longer while its narration is still being typed. */
  duration?: number
  /** Small tag over the picture: a place, a time. */
  kicker?: string
  /** Narration, typed out one line after another. */
  lines?: string[]
  /** The camera moves from one framing to the other over the shot. */
  camera?: { from?: Cam; to?: Cam }
  /** Sound effects, each at a time in seconds after the shot starts. */
  sfx?: { id: SfxId; at?: number; gain?: number }[]
  /** How the shot comes in: a cross-fade (default), a cut to black first, or a white flash. */
  enter?: 'fade' | 'black' | 'flash'
  /** Lay the narration in the middle of the frame instead of at the bottom (title cards). */
  center?: boolean
}

export interface Cutscene {
  id: string
  /** Shown in the corner the whole time, e.g. "Chương 1 · Mở đầu". */
  label?: string
  shots: Shot[]
}

const TYPE_SPEED = 42 // characters per second
const LINE_GAP = 0.45 // seconds between narration lines
const HOLD = 2.2 // seconds a shot rests after its narration is done

const textTime = (lines: string[] = []) => lines.reduce((t, l) => t + l.length / TYPE_SPEED + LINE_GAP, 0)
const shotLength = (s: Shot) => Math.max(s.duration ?? 5, textTime(s.lines) + HOLD)

/**
 * Plays a cutscene full screen. Click, Space or → goes on (finishing the typing first),
 * Esc or the button skips to the end.
 */
export function CutscenePlayer({ scene, onDone }: { scene: Cutscene; onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(0) // seconds of typing shown in the current shot
  const shot = scene.shots[index]
  const length = shotLength(shot)
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDone()
  }, [onDone])

  const next = useCallback(() => {
    if (index >= scene.shots.length - 1) finish()
    else setIndex((i) => i + 1)
  }, [index, scene.shots.length, finish])

  // The clock: types the narration and moves on when the shot has had its time.
  // startRef is when the shot began; moving it back jumps the typing ahead.
  const startRef = useRef(0)
  useEffect(() => {
    startRef.current = performance.now()
    setTyped(0)
    let raf = 0
    const tick = (now: number) => {
      const t = (now - startRef.current) / 1000
      setTyped(t)
      if (t >= length) next()
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [index, length, next])

  // Sound cues of the shot.
  useEffect(() => {
    const timers = (shot.sfx ?? []).map((s) => window.setTimeout(() => gameAudio.sfx(s.id), (s.at ?? 0) * 1000))
    return () => timers.forEach(clearTimeout)
  }, [shot])

  const textDone = typed >= textTime(shot.lines)
  const advance = useCallback(() => {
    if (!textDone) startRef.current = performance.now() - (textTime(shot.lines) + 0.01) * 1000
    else next()
  }, [textDone, shot.lines, next])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
      else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, finish])

  const from = { zoom: 1.04, x: 0, y: 0, rotate: 0, ...shot.camera?.from }
  const to = { zoom: 1.12, x: 0, y: 0, rotate: 0, ...shot.camera?.to }

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black" onClick={advance}>
      <div className="relative aspect-video w-[min(100vw,177.78vh)] overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: shot.enter === 'black' ? 1.2 : 0.9, delay: shot.enter === 'black' ? 0.5 : 0 } }}
            exit={{ opacity: 0, transition: { duration: shot.enter === 'black' ? 0.5 : 0.9 } }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: from.zoom, x: `${from.x}%`, y: `${from.y}%`, rotate: from.rotate }}
              animate={{ scale: to.zoom, x: `${to.x}%`, y: `${to.y}%`, rotate: to.rotate }}
              transition={{ duration: length + 1, ease: [0.4, 0, 0.6, 1] }}
            >
              <shot.Art />
            </motion.div>
            {shot.enter === 'flash' && <div className="cs-flash pointer-events-none absolute inset-0 bg-[#fff6e0]" />}
          </motion.div>
        </AnimatePresence>

        {/* Film look over every shot: grain, a soft vignette and letterbox bars. */}
        <div className="cs-grain pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.55))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-black" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-black" />

        {shot.kicker && (
          <motion.span
            key={`k${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.5 } }}
            className="display absolute left-[4%] top-[9%] bg-amber px-3 py-1 text-[clamp(14px,1.6vw,22px)] text-[#1c130f] shadow-lg"
          >
            {shot.kicker}
          </motion.span>
        )}

        {shot.lines && (
          <div
            className={cn(
              'pointer-events-none absolute inset-x-[8%] text-center',
              shot.center ? 'top-1/2 -translate-y-1/2' : 'bottom-[9%]',
            )}
          >
            <Narration key={index} lines={shot.lines} typed={typed} center={shot.center} />
          </div>
        )}

        {scene.label && (
          <span className="display pointer-events-none absolute right-[4%] top-[9%] text-[clamp(11px,1.1vw,15px)] uppercase tracking-[0.3em] text-white/50">
            {scene.label}
          </span>
        )}

        {/* Progress: one bar per shot. */}
        <div className="absolute inset-x-[4%] bottom-[2%] flex gap-1">
          {scene.shots.map((s, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded bg-white/15">
              <div
                className="h-full bg-amber/80"
                style={{ width: i < index ? '100%' : i > index ? '0%' : `${Math.min(100, (typed / shotLength(s)) * 100)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          finish()
        }}
        className="display absolute right-5 top-5 flex items-center gap-1.5 rounded border border-white/25 bg-black/50 px-3 py-1.5 text-sm text-white/80 backdrop-blur transition hover:border-amber hover:text-amber"
        title="Bỏ qua (Esc)"
      >
        Bỏ qua <ChevronsRight className="size-4" />
      </button>
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-white/35">
        Bấm chuột hoặc phím cách để tiếp · Esc để bỏ qua
      </span>
    </div>
  )
}

/** Narration typed out letter by letter, one line after another. */
function Narration({ lines, typed, center }: { lines: string[]; typed: number; center?: boolean }) {
  let t = typed
  return (
    <div className={cn('mx-auto max-w-[62ch] space-y-1', center && 'max-w-[52ch]')}>
      {lines.map((line, i) => {
        const shown = Math.max(0, Math.min(line.length, Math.floor(t * TYPE_SPEED)))
        t -= line.length / TYPE_SPEED + LINE_GAP
        if (shown === 0) return null
        return (
          <p
            key={i}
            className={cn(
              'title leading-snug text-[#f6ead2] [text-shadow:0_2px_6px_rgb(0_0_0/0.9),0_0_24px_rgb(0_0_0/0.7)]',
              center ? 'text-[clamp(20px,2.6vw,40px)]' : 'text-[clamp(15px,1.75vw,26px)]',
            )}
          >
            {line.slice(0, shown)}
            <span className="invisible">{line.slice(shown)}</span>
          </p>
        )
      })}
    </div>
  )
}

// --------------------------------------------------------------------------
// Effects laid over a shot's picture. Each fills the frame; use any number in one shot.

/** Rain streaks falling at a slant. */
export function RainFx({ count = 90, opacity = 0.35 }: { count?: number; opacity?: number }) {
  const r = rng(11)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity }}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="cs-rain absolute block w-px bg-gradient-to-b from-transparent to-[#e6dccb]"
          style={{
            left: `${r() * 110 - 5}%`,
            height: `${6 + r() * 8}%`,
            animationDuration: `${0.45 + r() * 0.35}s`,
            animationDelay: `${-r() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

/** Flames licking up from the bottom of the frame, flickering. */
export function FlamesFx({ base = 78, height = 1, count = 9 }: { base?: number; height?: number; count?: number }) {
  const r = rng(5)
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 size-full">
      <rect width="1600" height="900" fill="#ff8a3d" opacity="0.2" className="cs-flicker" style={{ mixBlendMode: 'screen' }} />
      {Array.from({ length: count }, (_, i) => {
        const x = 80 + (i * 1440) / (count - 1) + (r() - 0.5) * 80
        const s = (0.7 + r() * 0.6) * height
        const y = (base / 100) * 900 + r() * 60
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <g className="cs-flame" style={{ animationDuration: `${0.5 + r() * 0.5}s`, animationDelay: `${-r()}s` }}>
              <path d="M-110,140 C-120,40 -60,10 -50,-80 C-20,-20 0,-40 -10,-200 C40,-120 80,-80 60,-10 C90,-40 100,-70 110,-110 C140,-20 130,80 110,140 Z" fill="#ff8a3d" opacity="0.9" />
              <path d="M-60,140 C-70,70 -30,40 -20,-30 C0,10 20,0 20,-100 C50,-40 70,20 60,140 Z" fill="#f2a93b" />
              <path d="M-24,140 C-30,100 -10,80 0,30 C14,70 26,100 22,140 Z" fill="#fff1c9" />
            </g>
          </g>
        )
      })}
    </svg>
  )
}

/** Sparks drifting upward. */
export function EmbersFx({ count = 40 }: { count?: number }) {
  const r = rng(23)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const size = 3 + r() * 5
        return (
          <span
            key={i}
            className="cs-ember absolute block rounded-full bg-[#ffcf7a] shadow-[0_0_8px_#ff8a3d]"
            style={{
              left: `${r() * 100}%`,
              bottom: `${-5 + r() * 20}%`,
              width: size,
              height: size,
              animationDuration: `${3 + r() * 4}s`,
              animationDelay: `${-r() * 6}s`,
              ['--drift' as string]: `${(r() - 0.5) * 160}px`,
            }}
          />
        )
      })}
    </div>
  )
}

/** Slow grey smoke rising and spreading. */
export function SmokeFx({ opacity = 0.55, tint = '#3a3330' }: { opacity?: number; tint?: string }) {
  const r = rng(31)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity }}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="cs-smoke absolute block rounded-full blur-2xl"
          style={{
            left: `${r() * 90}%`,
            bottom: `${r() * 30}%`,
            width: `${20 + r() * 25}%`,
            aspectRatio: '1.4',
            background: tint,
            animationDuration: `${9 + r() * 6}s`,
            animationDelay: `${-r() * 12}s`,
          }}
        />
      ))}
    </div>
  )
}

/** Red and blue lights of an emergency vehicle sweeping over the scene. */
export function SirenFx({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ opacity }}>
      <div className="cs-siren-a absolute inset-0 bg-[radial-gradient(ellipse_at_15%_60%,#ff3b2e,transparent_55%)]" />
      <div className="cs-siren-b absolute inset-0 bg-[radial-gradient(ellipse_at_85%_60%,#3b6bff,transparent_55%)]" />
    </div>
  )
}

/** Darken or tint the picture: night over a day scene, dawn, a memory. */
export function GradeFx({ color = '#0b1020', opacity = 0.45, blend = 'multiply' }: { color?: string; opacity?: number; blend?: React.CSSProperties['mixBlendMode'] }) {
  return <div className="pointer-events-none absolute inset-0" style={{ background: color, opacity, mixBlendMode: blend }} />
}

/** A plain title card: chapter, title, a line under it, a stamp. */
export function TitleCard({ over, title, under, stamp }: { over?: string; title: string; under?: string; stamp?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#4a3020,#140d0a_70%)] text-center">
      {over && (
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em', transition: { duration: 2.4, delay: 0.3 } }}
          className="display text-[clamp(12px,1.4vw,20px)] uppercase text-amber/80"
        >
          {over}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.8 } }}
        className="title mt-4 text-[clamp(34px,6vw,96px)] leading-none text-[#f6ead2]"
      >
        {title}
      </motion.h1>
      {under && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 1.6 } }}
          className="mt-5 text-[clamp(13px,1.4vw,20px)] text-[#d8c7a8]"
        >
          {under}
        </motion.p>
      )}
      {stamp && (
        <motion.span
          initial={{ opacity: 0, scale: 2.2, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -8, transition: { delay: 2.3, duration: 0.25, ease: [0.5, 0, 1, 1] } }}
          className="title mt-8 rounded border-[3px] border-[#c4452d] px-5 py-1.5 text-[clamp(16px,2vw,30px)] text-[#d4553b]"
        >
          {stamp}
        </motion.span>
      )}
    </div>
  )
}

// --------------------------------------------------------------------------
// Building an after-the-verdict film from a chapter's epilogue pictures, so every chapter
// that already has epilogue panels can get one by adding only the narration.

/** One epilogue picture: an id, a caption and its drawing (3:2, drawn by the chapter). */
export interface EpilogueLike {
  id: string
  caption: string
  Art: () => JSX.Element
}

export interface EpilogueNote {
  kicker?: string
  /** Narration; the caption split into sentences when left out. */
  lines?: string[]
  sfx?: Shot['sfx']
  /** Effects drawn over the picture (RainFx, SmokeFx, ...). */
  fx?: React.ReactNode
  camera?: Shot['camera']
}

const sentences = (text: string) => text.match(/[^.!?]+[.!?]+["”]?/g)?.map((s) => s.trim()) ?? [text]

/** Shots from epilogue pictures, in their order, with the camera drifting a different way each time. */
export function epilogueShots(panels: EpilogueLike[], notes: Record<string, EpilogueNote> = {}): Shot[] {
  const drifts: Shot['camera'][] = [
    { from: { zoom: 1.02, x: -2 }, to: { zoom: 1.12, x: 2 } },
    { from: { zoom: 1.16, y: 2 }, to: { zoom: 1.04, y: -1 } },
    { from: { zoom: 1.05, x: 2 }, to: { zoom: 1.14, x: -2, y: 1 } },
    { from: { zoom: 1.14, x: -1, y: -2 }, to: { zoom: 1.05, x: 1 } },
  ]
  return panels.map((p, i) => {
    const n = notes[p.id] ?? {}
    return {
      kicker: n.kicker,
      lines: n.lines ?? sentences(p.caption),
      sfx: n.sfx,
      camera: n.camera ?? drifts[i % drifts.length],
      Art: () => (
        <div className="absolute inset-0 flex items-center bg-[#140d0a]">
          <div className="relative w-full">
            <p.Art />
          </div>
          {n.fx}
          {/* Darker bottom so the narration reads over any picture. */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
        </div>
      ),
    }
  })
}
