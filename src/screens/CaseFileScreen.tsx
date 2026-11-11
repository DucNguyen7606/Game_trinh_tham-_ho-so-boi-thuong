import { useState } from 'react'
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core'
import { Lock, Mail, MailOpen, Maximize2 } from 'lucide-react'
import { Lightbox } from '@/components/Lightbox'
import { questionOrder, useGame } from '@/game/store'
import { clueById, getDocumentArt } from '@/game/caseLoader'
import type { Clue } from '@/game/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/** Red push pin stuck into the top of a card once it is pinned to the board. */
function PushPin() {
  return (
    <svg viewBox="0 0 32 40" className="absolute -top-4 right-3 z-10 h-9 w-7 drop-shadow-[1px_3px_2px_rgb(0_0_0/0.5)]" aria-label="Đã ghim">
      <path d="M16 22 L16 38" stroke="#5b5f63" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="16" cy="22" rx="11" ry="4" fill="#8e1f17" />
      <path d="M9 21 Q8 12 11 8 L21 8 Q24 12 23 21 Z" fill="#c62f22" />
      <circle cx="16" cy="7" r="9" fill="#e0402f" stroke="#8e1f17" strokeWidth="1.5" />
      <ellipse cx="12.5" cy="4.5" rx="3" ry="2" fill="#fff" opacity="0.55" />
    </svg>
  )
}

function DocumentCard({ clue, pinned, read, dragging }: { clue: Clue; pinned: boolean; read?: boolean; dragging?: boolean }) {
  return (
    <div className="relative">
      {pinned && <PushPin />}
      <div
        className={cn(
          'document w-48 p-3 shadow-md transition duration-300',
          dragging && 'rotate-2 shadow-xl',
          // Already read on the desk: the copy left in the envelope fades out.
          read && !dragging && 'opacity-45 grayscale-[0.85] saturate-50',
        )}
      >
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase opacity-60">
          <span>{clue.id}</span>
          {read && !dragging && <span className="normal-case">đã đọc</span>}
        </div>
        <p className="mt-1 text-sm font-semibold leading-tight">{clue.title}</p>
      </div>
    </div>
  )
}

function DraggableDocument({ clue, pinned, read }: { clue: Clue; pinned: boolean; read: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: clue.id })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={cn('cursor-grab', isDragging && 'opacity-30')}>
      <DocumentCard clue={clue} pinned={pinned} read={read} />
    </div>
  )
}

function DropZone({ id, title, hint, children }: { id: string; title: string; hint: string; children?: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-h-0 flex-col overflow-auto rounded-lg border-2 border-dashed border-border p-4 transition',
        isOver && 'border-primary bg-primary/10',
      )}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{hint}</p>
      <div className="mt-3 flex-1">{children}</div>
    </div>
  )
}

export default function CaseFileScreen() {
  const { data, isEnvelopeOpen, foundClues, pinClue, markRead, solvedQuestions, readDocuments } = useGame()
  const order = questionOrder(data, solvedQuestions)
  const [reading, setReading] = useState<Clue | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  // Subscribe to solvedQuestions so envelopes re-render when one unlocks.
  void solvedQuestions

  const onDragEnd = (e: DragEndEvent) => {
    setDragId(null)
    const clue = clueById(data, String(e.active.id))
    if (!clue || !e.over) return
    if (e.over.id === 'reading-desk') {
      setReading(clue)
      markRead(clue.id)
    }
    if (e.over.id === 'pin-board') pinClue(clue.id)
  }

  const dragged = dragId ? clueById(data, dragId) : undefined
  const ReadingArt = reading ? getDocumentArt(data.id, reading.id) : undefined
  const [zoomed, setZoomed] = useState(false)

  return (
    <DndContext onDragStart={(e) => setDragId(String(e.active.id))} onDragEnd={onDragEnd} onDragCancel={() => setDragId(null)}>
      <div className="grid h-full grid-cols-[1fr_420px] gap-4 overflow-auto p-6">
        <section className="space-y-6">
          {data.envelopes.map((env) => {
            const open = isEnvelopeOpen(env.id)
            const unlockQ = data.questions.find((q) => q.id === env.unlockedBy)
            return (
              <div key={env.id}>
                <div className="mb-2 flex items-center gap-2">
                  {open ? <MailOpen className="size-4 text-primary" /> : <Mail className="size-4 text-muted-foreground" />}
                  <h2 className="font-semibold">
                    Phong bì {env.number}: {env.title}
                  </h2>
                  {!open && (
                    <Badge variant="outline">
                      <Lock className="mr-1 size-3" />{' '}
                      {unlockQ && order.includes(unlockQ.id) ? `Mở khi giải được câu ${order.indexOf(unlockQ.id) + 1}` : 'Mở khi giải thêm câu hỏi'}
                    </Badge>
                  )}
                </div>
                {open && (
                  <div className="flex flex-wrap gap-x-3 gap-y-5 pt-3">
                    {env.documents.map((id, i) => {
                      const clue = clueById(data, id)
                      return clue ? (
                        <div key={id} className="deal" style={{ '--i': i } as React.CSSProperties}>
                          <DraggableDocument clue={clue} pinned={foundClues.includes(id)} read={readDocuments.includes(id)} />
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>

        <aside className="grid min-h-0 grid-rows-[minmax(0,3fr)_minmax(140px,1fr)] gap-4">
          <DropZone id="reading-desk" title="Bàn đọc" hint="Kéo giấy tờ vào đây để đọc kỹ.">
            {reading ? (
              <div className="document p-4">
                <p className="text-xs font-semibold opacity-60">{reading.id}</p>
                <h3 className="text-lg font-semibold">{reading.title}</h3>
                <div className="my-2 h-px bg-paper-ink/30" />
                <p className="mt-2 text-sm">{reading.description}</p>
              </div>
            ) : null}
            {reading && ReadingArt ? (
              <button
                className="group relative mt-4 block w-full px-2 pb-2 text-left"
                onClick={() => setZoomed(true)}
                aria-label={`Phóng to ${reading.title}`}
              >
                <div className="transition duration-200 group-hover:-translate-y-1 group-hover:brightness-110">
                  <ReadingArt />
                </div>
                <span className="display absolute right-3 top-1 flex items-center gap-1 rounded bg-background/80 px-2 py-0.5 text-xs text-amber opacity-0 transition group-hover:opacity-100">
                  <Maximize2 className="size-3" /> Phóng to
                </span>
              </button>
            ) : null}
          </DropZone>
          <DropZone id="pin-board" title="Ghim lên bàn suy luận" hint="Kéo giấy tờ vào đây để thêm thành thẻ manh mối." />
        </aside>
      </div>
      {zoomed && reading && ReadingArt && (
        <Lightbox
          label={reading.title}
          onClose={() => setZoomed(false)}
          note={
            <>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Giấy tờ {reading.id}</p>
              <h3 className="title text-xl">{reading.title}</h3>
              <p className="text-sm">{reading.description}</p>
              <p className="text-xs opacity-70">
                {data.envelopes.find((e) => e.documents.includes(reading.id))?.title ?? ''}
              </p>
              <p className="text-xs opacity-70">Chỗ tô vàng là chi tiết giám định viên đánh dấu.</p>
            </>
          }
        >
          {/* Documents are drawn in HTML at card size, so zoom scales text and layout together. */}
          <div className="w-[360px] py-4" style={{ zoom: 1.7 }}>
            <ReadingArt />
          </div>
        </Lightbox>
      )}
      <DragOverlay>{dragged ? <DocumentCard clue={dragged} pinned={false} dragging /> : null}</DragOverlay>
    </DndContext>
  )
}
