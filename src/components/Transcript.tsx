import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useGame } from '@/game/store'
import type { Suspect } from '@/game/types'
import { PhotoLightbox, ShownPhoto } from '@/components/SuspectPhoto'

/** The written record of every interview with one suspect, reread from the desk without spending a turn. */
export function Transcript({ suspect, onClose }: { suspect: Suspect; onClose: () => void }) {
  const sessions = useGame((s) => s.transcripts[suspect.id] ?? [])
  const player = useGame((s) => s.data.player.name)
  const [zoomed, setZoomed] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !zoomed && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, zoomed])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/65 p-6 backdrop-blur-[2px]" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Biên bản lời khai ${suspect.name}`}>
      <div
        className="document relative max-h-[88vh] w-[min(760px,92vw)] overflow-auto px-10 py-8 shadow-[0_20px_50px_rgb(0_0_0/0.6)] [animation:fadeIn_.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-3 top-3 rounded-full p-1.5 opacity-60 hover:opacity-100" onClick={onClose} aria-label="Đóng">
          <X className="size-5" />
        </button>
        <p className="text-center text-[10px] uppercase tracking-[0.25em] opacity-60">Bảo hiểm An Tín · Phòng giám định</p>
        <h2 className="title mt-1 text-center text-2xl">Biên bản lời khai</h2>
        <p className="mt-1 text-center text-sm opacity-75">
          Người khai: <b>{suspect.name}</b>, {suspect.age} tuổi · {suspect.role}
        </p>
        <p className="text-center text-xs opacity-60">Người ghi: {player}</p>

        {sessions.map((sess, si) => (
          <section key={si} className="mt-6">
            <h3 className="mb-2 border-b border-current/20 pb-1 font-mono text-xs uppercase tracking-widest opacity-70">
              Lần {si + 1} · Ngày {sess.day}
            </h3>
            {sess.lines.length === 0 && <p className="text-sm italic opacity-60">Chưa ghi được gì.</p>}
            <div className="space-y-2 text-sm leading-relaxed">
              {sess.lines.map((l, i) =>
                l.fromPlayer ? (
                  <p key={i} className="font-semibold">
                    <span className="mr-2 font-mono text-[11px] opacity-60">HỎI</span>
                    {l.text}
                  </p>
                ) : /^["“]/.test(l.text) ? (
                  <div key={i}>
                    <p>
                      <span className="mr-2 font-mono text-[11px] opacity-60">ĐÁP</span>
                      {l.text}
                    </p>
                    {l.photo && <ShownPhoto clueId={l.photo} scale={0.6} onOpen={() => setZoomed(l.photo!)} />}
                  </div>
                ) : (
                  <div key={i}>
                    <p className="italic opacity-70">({l.text})</p>
                    {l.photo && <ShownPhoto clueId={l.photo} scale={0.6} onOpen={() => setZoomed(l.photo!)} />}
                  </div>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
      {zoomed && (
        <div onClick={(e) => e.stopPropagation()}>
          <PhotoLightbox clueId={zoomed} shownBy={suspect.name} onClose={() => setZoomed(null)} />
        </div>
      )}
    </div>
  )
}
