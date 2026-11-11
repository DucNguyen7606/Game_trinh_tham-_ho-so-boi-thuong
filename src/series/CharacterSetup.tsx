import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Portrait } from '@/art/Portrait'
import { cn } from '@/lib/utils'
import { DEFAULT_NAMES, LOOKS, ROLES, useProfile, type Gender, type Profile } from './profile'

/**
 * The investigator's file: name, gender, job and look. Shown from the main menu,
 * and before the first case if the player has not made a character yet.
 */
export default function CharacterSetup({ onClose, onDone }: { onClose: () => void; onDone?: () => void }) {
  const saved = useProfile()
  const [p, setP] = useState<Profile>({ name: saved.name, gender: saved.gender, roleId: saved.roleId, look: saved.look })
  const looks = LOOKS[p.gender]
  const role = ROLES.find((r) => r.id === p.roleId) ?? ROLES[0]

  const setGender = (g: Gender) => {
    if (g === p.gender) return
    // Swap the default name too, unless the player typed their own.
    const name = !p.name.trim() || p.name === DEFAULT_NAMES[p.gender] ? DEFAULT_NAMES[g] : p.name
    setP({ ...p, gender: g, name, look: 0 })
  }
  const turn = (d: number) => setP({ ...p, look: (p.look + d + looks.length) % looks.length })
  const save = () => {
    saved.save({ ...p, name: p.name.trim() || DEFAULT_NAMES[p.gender] })
    onDone ? onDone() : onClose()
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-6" style={{ animation: 'fadeIn 300ms ease-out' }}>
      <div className="panel relative flex max-h-full w-full max-w-4xl gap-8 overflow-y-auto rounded-md p-7">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" aria-label="Đóng">
          <X className="size-5" />
        </button>

        {/* The ID card: portrait you can flip through, with the name and job under it */}
        <div className="flex w-64 shrink-0 flex-col items-center gap-3">
          <p className="display self-start text-xs tracking-[0.3em] text-brass">Hồ sơ điều tra viên</p>
          <div className="document flex w-full flex-col items-center gap-2 p-4" style={{ rotate: '-1deg' }}>
            <Portrait spec={looks[p.look % looks.length]} size={200} />
            <p className="title text-center text-xl leading-tight">{p.name.trim() || DEFAULT_NAMES[p.gender]}</p>
            <p className="text-center font-sans text-xs text-paper-ink/70">{role.line}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => turn(-1)} className="rounded-full p-1.5 hover:bg-string/25" aria-label="Diện mạo trước">
              <ChevronLeft className="size-5" />
            </button>
            <span className="display text-sm text-muted-foreground">
              Diện mạo {(p.look % looks.length) + 1}/{looks.length}
            </span>
            <button onClick={() => turn(1)} className="rounded-full p-1.5 hover:bg-string/25" aria-label="Diện mạo sau">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <h2 className="title text-3xl">Nhân vật điều tra</h2>

          <label className="flex flex-col gap-1.5">
            <span className="display text-sm text-brass">Họ tên</span>
            <input
              value={p.name}
              maxLength={28}
              onChange={(e) => setP({ ...p, name: e.target.value })}
              className="rounded-sm border border-border bg-background/60 px-3 py-2 text-lg outline-none select-text focus:border-amber"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="display text-sm text-brass">Giới tính</span>
            <div className="flex gap-2">
              {(['nu', 'nam'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={cn(
                    'display rounded-sm border-2 px-5 py-1.5 text-lg',
                    p.gender === g ? 'border-amber bg-amber/15 text-amber' : 'border-border text-foreground/70 hover:border-brass',
                  )}
                >
                  {g === 'nu' ? 'Nữ' : 'Nam'}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Người khác sẽ gọi bạn là {p.gender === 'nu' ? '"cô", "chị"' : '"anh"'} khi hỏi chuyện.</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="display text-sm text-brass">Nghề nghiệp</span>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setP({ ...p, roleId: r.id })}
                  className={cn(
                    'rounded-sm border-2 p-3 text-left transition-colors',
                    p.roleId === r.id ? 'border-amber bg-amber/10' : 'border-border hover:border-brass',
                  )}
                >
                  <p className={cn('title text-base leading-tight', p.roleId === r.id && 'text-amber')}>{r.title}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{r.blurb}</p>
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Vụ án nào cũng là hồ sơ bảo hiểm, nên nghề nào cũng làm việc cùng Bảo hiểm An Tín.</span>
          </div>

          <div className="mt-auto flex justify-end gap-4">
            <button onClick={onClose} className="display text-lg text-muted-foreground hover:text-foreground">
              Hủy
            </button>
            <button onClick={save} className="display rounded-sm border-2 border-string bg-string/80 px-5 py-1.5 text-lg text-white hover:bg-string">
              {onDone ? 'Lưu và mở bản đồ' : 'Lưu nhân vật'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
