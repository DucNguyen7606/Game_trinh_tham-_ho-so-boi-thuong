import { useState } from 'react'
import { CheckCircle2, KeyRound, Lightbulb } from 'lucide-react'
import { getDocumentArt } from '@/game/caseLoader'
import { puzzleHintGate, useGame } from '@/game/store'
import type { Puzzle } from '@/game/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * A decoding puzzle on the reading desk. The locked document shows its raw codes; the
 * player types what they mean (kind answer) or clicks every spot on the picture (kind spots).
 * Solving it unlocks the clue as proof on the board.
 */
export function PuzzlePanel({ puzzle }: { puzzle: Puzzle }) {
  const data = useGame((s) => s.data)
  const solved = useGame((s) => s.solvedPuzzles.includes(puzzle.id))
  const found = useGame((s) => s.foundSpots[puzzle.id])
  const level = useGame((s) => s.puzzleHints[puzzle.id]?.level ?? 0)
  const gate = useGame((s) => puzzleHintGate(s, puzzle.id))
  const tryPuzzle = useGame((s) => s.tryPuzzle)
  const showPuzzleHint = useGame((s) => s.showPuzzleHint)
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const Art = puzzle.kind === 'spots' ? getDocumentArt(data.id, puzzle.clueId) : undefined
  const hints = (puzzle.hints ?? []).slice(0, level)

  const submit = () => {
    if (!value.trim()) return
    const r = tryPuzzle(puzzle.id, value)
    setFeedback(r === 'wrong' ? 'Chưa khớp. Đối chiếu lại các con số trên giấy tờ.' : null)
  }

  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - box.left) / box.width) * 100
    const y = ((e.clientY - box.top) / box.height) * 100
    const r = tryPuzzle(puzzle.id, { x, y })
    setFeedback(r === 'wrong' ? 'Chỗ đó không có gì khác thường.' : null)
  }

  return (
    <div className={cn('mt-3 rounded-md border-2 p-3', solved ? 'border-teal/60' : 'border-dashed border-string/60')}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest">
        {solved ? <CheckCircle2 className="size-4 text-teal" /> : <KeyRound className="size-4 text-string" />}
        {solved ? 'Đã giải mã' : 'Cần giải mã'} · {puzzle.title}
      </p>
      {solved ? (
        <p className="mt-2 text-sm">{puzzle.solvedText}</p>
      ) : (
        <>
          <p className="mt-2 text-sm">{puzzle.prompt}</p>
          {puzzle.kind === 'answer' ? (
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={puzzle.placeholder ?? 'Đáp án'}
                className="min-w-0 flex-1 rounded border border-paper-ink/40 bg-white/60 px-2 py-1 font-mono text-sm"
              />
              <Button size="sm" type="submit">
                Thử
              </Button>
            </form>
          ) : (
            <>
              <p className="mt-1 text-xs opacity-70">
                Đã tìm {found?.length ?? 0}/{puzzle.spots?.length ?? 0} điểm. Bấm vào chỗ bất thường trên giấy tờ.
              </p>
              {Art && (
                <div className="relative mt-2 cursor-crosshair" onClick={click}>
                  <div className="pointer-events-none">
                    <Art />
                  </div>
                  {(puzzle.spots ?? [])
                    .filter((sp) => found?.includes(sp.label))
                    .map((sp) => (
                      <span
                        key={sp.label}
                        title={sp.label}
                        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-string"
                        style={{ left: `${sp.x}%`, top: `${sp.y}%`, width: `${(sp.r ?? 6) * 2}%`, aspectRatio: '1' }}
                      />
                    ))}
                </div>
              )}
            </>
          )}
          {feedback && <p className="mt-2 text-xs text-string">{feedback}</p>}
          {hints.map((h, i) => (
            <p key={i} className="mt-2 flex gap-1 text-xs">
              <Lightbulb className="size-3.5 shrink-0 opacity-70" /> {h}
            </p>
          ))}
          {gate !== 'none-left' && (
            <button
              className="mt-2 text-xs underline opacity-70 hover:opacity-100 disabled:no-underline disabled:opacity-40"
              disabled={gate === 'locked'}
              onClick={() => showPuzzleHint(puzzle.id)}
              title={gate === 'locked' ? 'Thử thêm một đáp án mới để mở gợi ý tiếp theo.' : undefined}
            >
              {level === 0 ? 'Xem gợi ý' : gate === 'locked' ? 'Gợi ý tiếp theo mở sau một lần thử mới' : 'Xem gợi ý tiếp theo'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
