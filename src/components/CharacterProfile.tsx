import { X } from 'lucide-react'
import type { Suspect } from '@/game/types'
import { Portrait } from '@/art/Portrait'
import { Button } from '@/components/ui/button'
import { addressPlayer } from '@/series/profile'

// A personnel file that opens when the player clicks a character.
export function CharacterProfile({ suspect, onClose }: { suspect: Suspect; onClose: () => void }) {
  const p = suspect.profile
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`Hồ sơ ${suspect.name}`}
        className="document relative grid max-h-full w-full max-w-3xl grid-cols-[260px_1fr] gap-6 overflow-auto p-6 !rotate-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Button size="icon" variant="ghost" className="absolute right-3 top-3 text-paper-ink hover:bg-black/10" onClick={onClose} aria-label="Đóng">
          <X />
        </Button>
        <div>
          {suspect.portrait && (
            <div className="bg-[#f4ecdc] p-2 shadow-[0_8px_18px_rgb(0_0_0/0.35)]" style={{ rotate: '-1.5deg' }}>
              <Portrait spec={suspect.portrait} size={244} />
            </div>
          )}
          <p className="mt-4 text-xs uppercase tracking-widest opacity-60">Quan hệ với vụ việc</p>
          <p className="text-sm">{suspect.role}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-60">Hồ sơ nhân sự</p>
            <h2 className="title text-3xl text-paper-ink">{suspect.name}</h2>
            <p className="text-sm opacity-70">{suspect.age} tuổi</p>
          </div>
          {p ? (
            <>
              <div className="flex flex-wrap gap-2">
                {p.traits.map((t, i) => (
                  <span
                    key={t}
                    className="display border-2 border-string px-2 py-0.5 text-sm text-string"
                    style={{ rotate: `${i % 2 ? 1.5 : -2}deg` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Field label="Thói quen" text={p.habit} />
              <Field label="Quan hệ" text={p.relation} />
              <blockquote className="border-l-4 border-string/60 pl-3 italic">{addressPlayer(p.quote)}</blockquote>
              <div className="bg-amber/25 p-3">
                <p className="text-xs uppercase tracking-widest opacity-60">Ghi chú điều tra</p>
                <p className="text-sm">{p.note}</p>
              </div>
            </>
          ) : (
            <p className="text-sm opacity-70">Chưa có hồ sơ chi tiết.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest opacity-60">{label}</p>
      <p className="text-sm">{text}</p>
    </div>
  )
}
