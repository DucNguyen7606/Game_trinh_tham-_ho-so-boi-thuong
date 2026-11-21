// Ready-made pictures for a chapter's opening film, so every chapter can tell "the claim
// lands on the desk, these are the people, this file is yours" the same way.
// Chapter 1 drew its own versions of these in src/cases/ho-so-boi-thuong/cutscenes.tsx.
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import { epilogueShots, type Cutscene, type EpilogueLike, type EpilogueNote } from '@/components/Cutscene'
import { useGame } from '@/game/store'

const drop = (delay: number, rotate: number, y = -120) => ({
  initial: { opacity: 0, y, rotate: rotate * 3 },
  animate: { opacity: 1, y: 0, rotate, transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
})

/** Two papers dropped on the desk one after another, then the claim stamped across them. */
export function ClaimDesk({
  docs,
  heading = 'YÊU CẦU BỒI THƯỜNG',
  amount,
  footer,
}: {
  docs: (() => JSX.Element)[]
  heading?: string
  amount: string
  footer: string
}) {
  const [A, B] = docs
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_42%_30%,#6a4630,#1c130f_75%)]">
      <div className="absolute left-[6%] top-[-30%] size-[70%] rounded-full bg-amber/15 blur-3xl" />
      {A && (
        <motion.div className="absolute left-[12%] top-[12%] w-[26%]" {...drop(0.5, -4)}>
          <A />
        </motion.div>
      )}
      {B && (
        <motion.div className="absolute left-[39%] top-[8%] w-[27%]" {...drop(1.1, 3, -140)}>
          <B />
        </motion.div>
      )}
      <motion.div
        className="title absolute right-[7%] top-[26%] rounded border-4 border-[#c4452d] bg-[#f6ead2]/90 px-6 py-3 text-center text-[#b23a2e] shadow-2xl"
        initial={{ opacity: 0, scale: 2.4, rotate: -16 }}
        animate={{ opacity: 1, scale: 1, rotate: -7, transition: { delay: 2.9, duration: 0.22, ease: [0.5, 0, 1, 1] } }}
      >
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">{heading}</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">{amount}</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">{footer}</p>
      </motion.div>
    </div>
  )
}

/** The people in the file, laid down one by one like photos pinned to a board. */
export function Lineup({ only }: { only?: string[] }) {
  const all = useGame((s) => s.data.suspects)
  const suspects = only ? all.filter((s) => only.includes(s.id)) : all
  const tilt = [-2.5, 1.5, -1, 2, -1.5, 1]
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2%] bg-[radial-gradient(circle_at_50%_40%,#4a3326,#140d0a_75%)] px-[5%]">
      {suspects.map((s, i) => (
        <motion.figure
          key={s.id}
          className="document w-[16%] shrink-0 p-[0.6%] pb-[1%]"
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: tilt[i % tilt.length], transition: { delay: 0.4 + i * 0.9, duration: 0.5 } }}
        >
          {s.portrait && <Portrait spec={s.portrait} size={240} live className="h-auto w-full" />}
          <figcaption className="mt-1.5 px-1 leading-tight">
            <span className="title block text-[clamp(10px,1.15vw,17px)]">{s.name}</span>
            <span className="block text-[clamp(8px,0.85vw,12px)] opacity-70">{s.role}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

/** The investigator under the desk lamp, the file in front of them and the choices it asks for. */
export function Investigator({ file, choices }: { file: string; choices: { text: string; color: string }[] }) {
  const player = useGame((s) => s.data.player)
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_30%_25%,#7a5236,#1c130f_70%)]">
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
        <p className="title text-[clamp(14px,1.8vw,28px)]">{file}</p>
        <p className="mt-2 text-[clamp(9px,1vw,14px)]">Người phụ trách: {player.name}</p>
        <div className="mt-3 space-y-2">
          {[90, 70, 84, 60].map((w, i) => (
            <div key={i} className="h-[3px] bg-[#b89b6c]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[clamp(9px,1vw,14px)]">
          {choices.map((c, i) => (
            <span key={c.text} className="contents">
              {i > 0 && <span className="opacity-60">hay</span>}
              <span className="rounded border-2 px-2" style={{ borderColor: c.color, color: c.color }}>
                {c.text}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/** One drawing laid over a dark ground and slowly lit, for documents and close-ups in a film. */
export function OnDesk({ children, width = 40 }: { children: React.ReactNode; width?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#5a3c28,#140d0a_72%)]">
      <motion.div
        style={{ width: `${width}%` }}
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -1, transition: { delay: 0.3, duration: 0.8 } }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Muted greens and reds for the choices on the file. */
export const PAY = '#3f6f4f'
export const DENY = '#b23a2e'
export const OTHER = '#8a5a1c'

/**
 * The film after the verdict: a signed-proposal card, then the ending's epilogue pictures
 * with the chapter's narration notes (captions are used where a picture has no note).
 */
export function verdictFilm(
  label: string,
  endingId: string,
  panels: EpilogueLike[] | undefined,
  notes: Record<string, EpilogueNote> = {},
): Cutscene | undefined {
  if (!panels) return undefined
  return {
    id: `outro-${endingId}`,
    label,
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#3a281c,#0d0907_70%)]" />,
      },
      ...epilogueShots(panels, notes),
    ],
  }
}
