import { Camera, Maximize2 } from 'lucide-react'
import { useGame } from '@/game/store'
import { clueById, getDocumentArt } from '@/game/caseLoader'
import { Lightbox } from '@/components/Lightbox'

/** A photo the suspect hands over, shown under their line; click to enlarge. */
export function ShownPhoto({ clueId, onOpen, scale = 0.72 }: { clueId: string; onOpen: () => void; scale?: number }) {
  const { data } = useGame()
  const Doc = getDocumentArt(data.id, clueId)
  const clue = clueById(data, clueId)
  if (!Doc || !clue) return null
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      className="group mt-3 flex items-end gap-3 text-left [animation:fadeIn_.4s_ease]"
      aria-label={`Xem ${clue.title}`}
    >
      <div className="w-[260px] origin-bottom-left transition group-hover:-translate-y-1 group-hover:rotate-[-1deg]" style={{ zoom: scale }}>
        <Doc />
      </div>
      <span className="space-y-1 pb-2 text-xs not-italic">
        <span className="flex items-center gap-1 text-amber">
          <Camera className="size-3.5" /> Thẻ {clue.id} đã lên bàn suy luận
        </span>
        <span className="flex items-center gap-1 text-muted-foreground group-hover:text-amber">
          <Maximize2 className="size-3.5" /> Bấm để xem lớn
        </span>
      </span>
    </button>
  )
}

/** The enlarged photo with its clue note. */
export function PhotoLightbox({ clueId, shownBy, onClose }: { clueId: string; shownBy: string; onClose: () => void }) {
  const { data } = useGame()
  const Doc = getDocumentArt(data.id, clueId)
  const clue = clueById(data, clueId)
  if (Doc === undefined || !clue) return null
  return (
    <Lightbox
      label={clue.title}
      onClose={onClose}
      note={
        <>
          <p className="text-[10px] uppercase tracking-widest opacity-60">
            Ảnh {shownBy} cho xem · {clue.id}
          </p>
          <h3 className="title text-xl">{clue.title}</h3>
          <p className="text-sm">{clue.description}</p>
          <p className="text-xs opacity-70">Đã thêm thẻ {clue.id} lên bàn suy luận.</p>
        </>
      }
    >
      <div className="w-[260px] py-4" style={{ zoom: 1.9 }}>
        <Doc />
      </div>
    </Lightbox>
  )
}
