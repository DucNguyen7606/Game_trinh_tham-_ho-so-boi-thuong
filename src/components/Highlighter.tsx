import { useEffect, useId, useRef, useState } from 'react'
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

/** Takes the selection the player just dragged with the pen and marks it on the document. */
function useStroke(clueId: string, onMarked?: () => void) {
  const pen = useGame((s) => s.pen)
  const markText = useGame((s) => s.markText)
  return () => {
    if (!pen) return
    const sel = window.getSelection()
    const picked = sel?.toString() ?? ''
    if (!picked.trim()) return
    markText(clueId, picked)
    sel?.removeAllRanges()
    onMarked?.()
  }
}

/**
 * The highlighter pen. Click it to take the pen in hand: the cursor turns into a pen and
 * dragging over a document's words marks them yellow. Click again to put it down.
 */
export function PenButton({ className, label = true }: { className?: string; label?: boolean }) {
  const pen = useGame((s) => s.pen)
  const setPen = useGame((s) => s.setPen)
  return (
    <button
      onClick={() => setPen(!pen)}
      aria-pressed={pen}
      title={pen ? 'Cất bút lông' : 'Cầm bút lông: kéo chuột qua chữ trên giấy tờ để bôi vàng'}
      className={cn(
        'display inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-sm transition',
        pen ? 'border-[#e6c229] bg-[#f5d94a] text-[#2b1d10] shadow-[0_0_14px_rgb(245_217_74/0.6)]' : 'border-border text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      <PenIcon className={cn('size-4', pen && '-rotate-12')} />
      {label && (pen ? 'Đang cầm bút' : 'Bút lông')}
    </button>
  )
}

/** Keeps the page's pen state on <body>, where the pen cursor and selectable text are switched on. */
export function usePenCursor() {
  const pen = useGame((s) => s.pen)
  useEffect(() => {
    document.body.classList.toggle('pen-on', pen)
    return () => document.body.classList.remove('pen-on')
  }, [pen])
}

// Marks on drawn documents are painted with the CSS Custom Highlight API, so the
// drawings' own markup is never touched. Each area registers its ranges here.
const areaRanges = new Map<string, Range[]>()
function repaint() {
  const reg = (globalThis as { CSS?: { highlights?: Map<string, unknown> } }).CSS?.highlights
  const H = (globalThis as { Highlight?: new (...r: Range[]) => unknown }).Highlight
  if (!reg || !H) return
  reg.set('pen-mark', new H(...[...areaRanges.values()].flat()))
}

/**
 * Ranges in `root` covering each mark. Whitespace is ignored when matching, because a
 * stroke across lines of a drawn document reads back with line breaks the text nodes don't have.
 */
function rangesFor(root: HTMLElement, marks: string[]) {
  // Every non-space character of the area, with the text node and offset it came from.
  const chars: string[] = []
  const at: { node: Text; offset: number }[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    for (let i = 0; i < node.data.length; i++) {
      if (/\s/.test(node.data[i])) continue
      chars.push(node.data[i])
      at.push({ node, offset: i })
    }
  }
  const full = chars.join('')
  const out: Range[] = []
  for (const m of marks) {
    const key = m.replace(/\s+/g, '')
    const from = key ? full.indexOf(key) : -1
    if (from < 0) continue
    const first = at[from]
    const last = at[from + key.length - 1]
    const r = document.createRange()
    r.setStart(first.node, first.offset)
    r.setEnd(last.node, last.offset + 1)
    out.push(r)
  }
  return out
}

/**
 * A drawn document the pen can mark. With the pen in hand, drag over its words: they are
 * painted yellow, the card goes to the board and the words are quoted on it.
 */
export function MarkableArea({ clueId, children, className, style }: { clueId: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const marks = useGame((s) => s.marks[clueId])
  const stroke = useStroke(clueId)

  useEffect(() => {
    if (!ref.current) return
    areaRanges.set(id, rangesFor(ref.current, marks ?? []))
    repaint()
  })
  useEffect(
    () => () => {
      areaRanges.delete(id)
      repaint()
    },
    [id],
  )

  return (
    <div ref={ref} className={cn('pen-area', className)} style={style} onMouseUp={stroke}>
      {children}
    </div>
  )
}

/**
 * A document's text that the player can mark with the pen: take the pen, drag over words and
 * they turn yellow, the card goes to the board and the marked words are quoted on it.
 */
export function HighlightText({ clueId, text, className }: { clueId: string; text: string; className?: string }) {
  const marks = useGame((s) => s.marks[clueId])
  const pen = useGame((s) => s.pen)
  const [marked, setMarked] = useState(false)
  const stroke = useStroke(clueId, () => setMarked(true))

  return (
    <div>
      <p className={cn('pen-area', className)} onMouseUp={stroke}>
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
        <PenIcon className="size-3" />
        {marked
          ? 'Đã bôi và ghim thẻ này lên bàn suy luận.'
          : pen
            ? 'Kéo chuột qua chữ ở đây hoặc trên ảnh giấy tờ để bôi vàng.'
            : 'Bấm nút Bút lông để bôi lên giấy tờ.'}
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
