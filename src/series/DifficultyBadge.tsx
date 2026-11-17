import { DIFFICULTY, limitsLabel, type Chapter } from './series'
import { cn } from '@/lib/utils'

/**
 * A coloured pill for a chapter's difficulty: colour and pips (1–4) show the level at a glance.
 * With `limits`, a second line gives the difficulty's days and hint pool.
 */
export function DifficultyBadge({ difficulty, playTime, limits, className }: { difficulty: NonNullable<Chapter['difficulty']>; playTime?: string; limits?: boolean; className?: string }) {
  const d = DIFFICULTY[difficulty]
  const badge = (
    <span className={cn('display inline-flex items-center gap-2 text-xs tracking-widest', !limits && className)}>
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
  if (!limits) return badge
  return (
    <span className={cn('flex flex-col items-start gap-1', className)}>
      {badge}
      <span className="display text-[11px] tracking-widest text-paper-ink/60">{limitsLabel(difficulty)}</span>
    </span>
  )
}
