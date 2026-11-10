import { useState } from 'react'
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core'
import { Lock, Mail, MailOpen, Pin } from 'lucide-react'
import { useGame } from '@/game/store'
import { clueById } from '@/game/caseLoader'
import type { Clue } from '@/game/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function DocumentCard({ clue, pinned, dragging }: { clue: Clue; pinned: boolean; dragging?: boolean }) {
  return (
    <div
      className={cn(
        'w-48 rounded-sm bg-paper p-3 text-paper-ink shadow-md',
        dragging && 'rotate-2 shadow-xl',
      )}
    >
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase opacity-60">
        <span>{clue.id}</span>
        {pinned && <Pin className="size-3" />}
      </div>
      <p className="mt-1 text-sm font-semibold leading-tight">{clue.title}</p>
    </div>
  )
}

function DraggableDocument({ clue, pinned }: { clue: Clue; pinned: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: clue.id })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={cn('cursor-grab', isDragging && 'opacity-30')}>
      <DocumentCard clue={clue} pinned={pinned} />
    </div>
  )
}

function DropZone({ id, title, hint, children }: { id: string; title: string; hint: string; children?: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-lg border-2 border-dashed border-border p-4 transition',
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
  const { data, isEnvelopeOpen, foundClues, pinClue, markRead, solvedQuestions } = useGame()
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
                      <Lock className="mr-1 size-3" /> Mở khi giải được câu {unlockQ?.number}
                    </Badge>
                  )}
                </div>
                {open && (
                  <div className="flex flex-wrap gap-3">
                    {env.documents.map((id) => {
                      const clue = clueById(data, id)
                      return clue ? <DraggableDocument key={id} clue={clue} pinned={foundClues.includes(id)} /> : null
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>

        <aside className="grid grid-rows-[2fr_1fr] gap-4">
          <DropZone id="reading-desk" title="Bàn đọc" hint="Kéo giấy tờ vào đây để đọc kỹ.">
            {reading ? (
              <div className="rounded-sm bg-paper p-4 text-paper-ink">
                <p className="text-xs font-semibold opacity-60">{reading.id}</p>
                <h3 className="text-lg font-semibold">{reading.title}</h3>
                <p className="mt-2 text-sm">{reading.description}</p>
              </div>
            ) : null}
          </DropZone>
          <DropZone id="pin-board" title="Ghim lên bàn suy luận" hint="Kéo giấy tờ vào đây để thêm thành thẻ manh mối." />
        </aside>
      </div>
      <DragOverlay>{dragged ? <DocumentCard clue={dragged} pinned={false} dragging /> : null}</DragOverlay>
    </DndContext>
  )
}
