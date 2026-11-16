import { useState } from 'react'
import { Highlighter as PenIcon } from 'lucide-react'
import { useGame } from '@/game/store'
import { cn } from '@/lib/utils'

/** Splits text into plain runs and marked runs, marking the first occurrence of each mark. */
function splitMarks(text: string, marks: string[]) {
  const ranges: [number, number][] = []
  for (const m of marks) {
    const at = text.indexOf(m)
    if (at >= 0) ranges.push([at, at + m.length])
  }
  ranges.sort((a, b) => a[0] - b[0])
  const parts: { text: string; marked: boolean }[] = []
  let pos = 0
  for (const [from, to] of ranges) {
    if (to <= pos) continue
    const start = Math.max(from, pos)
    if (start > pos) parts.push({ text: text.slice(pos, start), marked: false })
    parts.push({ text: text.slice(start, to), marked: true })
    pos = to
  }
  if (pos < text.length) parts.push({ text: text.slice(pos), marked: false })
  return parts
}

/**
 * A document's text that the player can mark with a highlighter: select words with the
 * mouse and they turn yellow, the card goes to the board and the marked words are quoted on it.
 */
export function HighlightText({ clueId, text, className }: { clueId: string; text: string; className?: string }) {
  const marks = useGame((s) => s.marks[clueId])
  const markText = useGame((s) => s.markText)
  const [note, setNote] = useState<string | null>(null)

  const onMouseUp = () => {
    const sel = window.getSelection()
    const picked = sel?.toString() ?? ''
    if (!picked.trim()) return
    markText(clueId, picked)
    sel?.removeAllRanges()
    setNote('Đã đánh dấu và ghim thẻ này lên bàn suy luận.')
  }

  return (
    <div>
      <p className={cn('cursor-text select-text', className)} onMouseUp={onMouseUp}>
        {splitMarks(text, marks ?? []).map((p, i) =>
          p.marked ? (
            <mark key={i} className="rounded-sm bg-[#f5d94a]/70 px-0.5 text-inherit">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[11px] opacity-60">
        <PenIcon className="size-3" /> {note ?? 'Bôi chuột lên chữ để đánh dấu bằng bút dạ.'}
      </p>
    </div>
  )
}

/** What the player has marked on a document, quoted on its board card (the last three marks). */
export function MarkedQuotes({ clueId }: { clueId: string }) {
  const marks = useGame((s) => s.marks[clueId])
  const quoted = (marks ?? []).slice(-3)
  if (!quoted.length) return null
  return (
    <div className="mt-1 space-y-0.5">
      {quoted.map((q) => (
        <p key={q} className="rounded-sm bg-[#f5d94a]/60 px-1 text-[11px] leading-snug">
          “{q}”
        </p>
      ))}
    </div>
  )
}
