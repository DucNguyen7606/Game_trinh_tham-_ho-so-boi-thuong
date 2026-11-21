// Ready-made shots and effects for chapter films, so a chapter's cutscenes.tsx only has to
// say what happens. Used by Chapters 5–8; the player itself lives in Cutscene.tsx.
// Chapters 5–8 are drawn in the diorama style, so the backdrops here are its pastel dusk sky.
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import { rng } from '@/art/primitives'
import { useGame } from '@/game/store'
import { epilogueShots, type Cutscene, type EpilogueLike, type EpilogueNote } from '@/components/Cutscene'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Papers dropped on the desk one after another, then the claim amount stamped over them.
 * `docs` are the chapter's document drawings (two or three read best).
 */
export function ClaimDesk({ docs, amount, line, title = 'YÊU CẦU BỒI THƯỜNG' }: { docs: (() => JSX.Element)[]; amount: string; line: string; title?: string }) {
  const spots = [
    { left: '10%', top: '12%', rot: -4, from: -14 },
    { left: '36%', top: '7%', rot: 3, from: 12 },
    { left: '22%', top: '30%', rot: -1, from: -8 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]">
      <div className="absolute left-[6%] top-[-30%] size-[70%] rounded-full bg-amber/15 blur-3xl" />
      {docs.slice(0, 3).map((Doc, i) => (
        <motion.div
          key={i}
          className="absolute w-[27%]"
          style={{ left: spots[i].left, top: spots[i].top }}
          initial={{ opacity: 0, y: -130, rotate: spots[i].from }}
          animate={{ opacity: 1, y: 0, rotate: spots[i].rot, transition: { delay: 0.5 + i * 0.6, duration: 0.6, ease } }}
        >
          <Doc />
        </motion.div>
      ))}
      <motion.div
        className="title absolute right-[8%] top-[26%] rounded border-4 border-[#c4452d] bg-[#f6ead2]/90 px-6 py-3 text-center text-[#b23a2e] shadow-2xl"
        initial={{ opacity: 0, scale: 2.4, rotate: -16 }}
        animate={{ opacity: 1, scale: 1, rotate: -7, transition: { delay: 0.6 + docs.length * 0.6 + 0.6, duration: 0.22, ease: [0.5, 0, 1, 1] } }}
      >
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">{title}</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">{amount}</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">{line}</p>
      </motion.div>
    </div>
  )
}

/** Delay in seconds at which ClaimDesk stamps the amount, to cue the stamp sound. */
export const stampAt = (docs: number) => 0.6 + docs * 0.6 + 0.7

/** Everyone in the file, laid down one by one like photos pinned to a board. */
export function Lineup() {
  const suspects = useGame((s) => s.data.suspects)
  const w = suspects.length > 5 ? 14.5 : 17
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[1.6%] bg-[linear-gradient(180deg,#d6cfee,#f7dccb)] px-[4%]">
      {suspects.map((s, i) => (
        <motion.figure
          key={s.id}
          className="document shrink-0 p-[0.6%] pb-[1%]"
          style={{ width: `${w}%` }}
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: [-2.5, 1.5, -1, 2, -1.5, 1][i % 6], transition: { delay: 0.4 + i * 0.8, duration: 0.5 } }}
        >
          {s.portrait && <Portrait spec={s.portrait} size={240} live className="h-auto w-full" />}
          <figcaption className="mt-1.5 px-1 leading-tight">
            <span className="title block text-[clamp(10px,1.1vw,16px)]">{s.name}</span>
            <span className="block text-[clamp(8px,0.8vw,12px)] opacity-70">{s.role}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

/** Pin sounds for the Lineup, one per person in the file. */
export const lineupPins = (count: number) => Array.from({ length: count }, (_, i) => ({ id: 'pin' as const, at: 0.5 + i * 0.8 }))

/** The investigator under the desk lamp, the file in front of them, and the choice to make. */
export function Investigator({ file, choices = ['CHI TRẢ', 'TỪ CHỐI'] }: { file: string; choices?: string[] }) {
  const player = useGame((s) => s.data.player)
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]">
      <div className="absolute left-[18%] top-[-20%] size-[60%] rounded-full bg-amber/20 blur-3xl" />
      {player.portrait && (
        <div className="absolute bottom-[-6%] left-[12%] w-[34%]">
          <Portrait spec={player.portrait} size={400} live bare className="h-auto w-full" />
        </div>
      )}
      <motion.div
        className="document absolute right-[12%] top-[20%] w-[34%] p-[2%]"
        initial={{ opacity: 0, x: 80, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 2, transition: { delay: 0.6, duration: 0.7 } }}
      >
        <p className="title text-[clamp(14px,1.8vw,28px)]">HỒ SƠ BỒI THƯỜNG SỐ {file}</p>
        <p className="mt-2 text-[clamp(9px,1vw,14px)]">Người phụ trách: {player.name}</p>
        <div className="mt-3 space-y-2">
          {[90, 70, 84, 60].map((w, i) => (
            <div key={i} className="h-[3px] bg-[#b89b6c]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[clamp(9px,1vw,14px)]">
          {choices.map((c, i) => (
            <span key={c} className="contents">
              {i > 0 && <span className="opacity-60">hay</span>}
              <span className={`rounded border-2 px-2 ${i === 0 ? 'border-[#3f6f4f] text-[#3f6f4f]' : i === choices.length - 1 ? 'border-[#b23a2e] text-[#b23a2e]' : 'border-[#9a6a1c] text-[#9a6a1c]'}`}>{c}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/** A drawing that is not 16:9 (a document, an evidence photo), centred on a dark desk. */
export function OnDesk({ Art, width = 46 }: { Art: () => JSX.Element; width?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]">
      <motion.div style={{ width: `${width}%` }} initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -1.5, transition: { delay: 0.3, duration: 0.7, ease } }}>
        <Art />
      </motion.div>
    </div>
  )
}

/** Muddy flood water standing over the lower part of the frame, lapping gently. */
export function WaterFx({ level = 38, color = '#4d5a4a', opacity = 0.62, rise = true }: { level?: number; color?: string; opacity?: number; rise?: boolean }) {
  const r = rng(23)
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      initial={{ height: rise ? `${level * 0.35}%` : `${level}%` }}
      animate={{ height: `${level}%`, transition: { duration: 5, ease: 'easeOut' } }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${color}, #1d231d)`, opacity }} />
      <svg viewBox="0 0 1600 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[14px] w-full">
        <path d="M0,20 Q100,6 200,20 T400,20 T600,20 T800,20 T1000,20 T1200,20 T1400,20 T1600,20" fill="none" stroke="#c9d2c0" strokeWidth="3" opacity="0.5" />
      </svg>
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="cs-flicker absolute block h-[2px] rounded-full bg-[#e6eadc]"
          style={{ left: `${r() * 95}%`, top: `${10 + r() * 70}%`, width: `${2 + r() * 5}%`, animationDelay: `${-r() * 3}s` }}
        />
      ))}
    </motion.div>
  )
}

/** Headlight glare sweeping across the frame: a car going by in the dark. */
export function HeadlightsFx({ delay = 0.6, duration = 2.4 }: { delay?: number; duration?: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 w-[45%] mix-blend-screen"
      style={{ background: 'radial-gradient(ellipse at center, rgba(255,240,200,0.75), rgba(255,230,170,0.18) 45%, transparent 70%)' }}
      initial={{ left: '-50%' }}
      animate={{ left: '110%', transition: { delay, duration, ease: 'easeIn' } }}
    />
  )
}

/**
 * The film after the verdict, built from the chapter's epilogue pictures: one line that the
 * proposal is signed, then each picture with its caption as narration (or the note's lines).
 */
export function outroFrom(label: string, panels: EpilogueLike[] | undefined, notes: Record<string, EpilogueNote> = {}, id = 'outro'): Cutscene | undefined {
  if (!panels?.length) return undefined
  return {
    id,
    label,
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => <div className="absolute inset-0 bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]" />,
      },
      ...epilogueShots(panels, notes),
    ],
  }
}

/** "Chuyên viên giám định" → "chuyên viên giám định", for the middle of a sentence. */
export const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
