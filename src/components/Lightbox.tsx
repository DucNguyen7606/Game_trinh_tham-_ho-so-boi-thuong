import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Full-screen viewer for an enlarged photo or document, with a paper note beside it.
 * Closes on backdrop click, the X button or Esc.
 */
export function Lightbox({ label, onClose, children, note }: { label: string; onClose: () => void; children: React.ReactNode; note: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="relative flex max-h-full w-[min(1100px,92vw)] items-center gap-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex max-h-[86vh] min-w-0 flex-[3] justify-center overflow-auto">{children}</div>
        <div className="document flex-[1.2] space-y-2 p-5">{note}</div>
        <button
          className="absolute -right-3 -top-10 rounded-full bg-background/90 p-1.5 text-foreground hover:text-amber"
          onClick={onClose}
          aria-label="Đóng"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  )
}
