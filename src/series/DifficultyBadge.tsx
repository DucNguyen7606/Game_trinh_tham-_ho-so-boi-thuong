import { DIFFICULTY, type Chapter } from './series'
import { cn } from '@/lib/utils'

/** A coloured pill for a chapter's difficulty: colour and pips (1–4) show the level at a glance. */
export function DifficultyBadge({ difficulty, playTime, className }: { difficulty: NonNullable<Chapter['difficulty']>; playTime?: string; className?: string }) {
  const d = DIFFICULTY[difficulty]
  return (
    <span className={cn('display inline-flex items-center gap-2 text-xs tracking-widest', className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold uppercase shadow-sm" style={{ background: d.bg, color: d.fg }}>
        <span className="inline-flex gap-0.5" aria-hidden>
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="size-1.5 rounded-full" style={{ background: d.fg, opacity: i <= d.level ? 1 : 0.3 }} />
          ))}
        </span>
        {difficulty}
      </span>
      {playTime && <span className="text-paper-ink/60">{playTime}</span>}
    </span>
  )
}
