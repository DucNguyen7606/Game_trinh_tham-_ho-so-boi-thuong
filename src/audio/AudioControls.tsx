import { useEffect, useRef, useState } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAudioSettings } from './settings'

/** Header widget: one speaker button; opens a small panel with mute and volumes. */
export default function AudioControls() {
  const { music, sfx, muted, set } = useAudioSettings()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [open])

  const slider = (label: string, value: number, key: 'music' | 'sfx', icon: React.ReactNode) => (
    <label className="flex items-center gap-2" title={label}>
      {icon}
      <span className="w-20 text-xs">{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        disabled={muted}
        onChange={(e) => set({ [key]: Number(e.target.value) })}
        className="w-28 accent-[var(--primary)]"
      />
    </label>
  )

  return (
    <div ref={ref} className="relative">
      <Button size="sm" variant="ghost" title="Âm thanh" onClick={() => setOpen(!open)}>
        {muted ? <VolumeX /> : <Volume2 />}
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 space-y-2 rounded-md border border-border bg-card p-3 shadow-lg">
          {slider('Nhạc nền', music, 'music', <Music className="size-4" />)}
          {slider('Hiệu ứng', sfx, 'sfx', <Volume2 className="size-4" />)}
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={muted} onChange={(e) => set({ muted: e.target.checked })} />
            Tắt toàn bộ âm thanh
          </label>
        </div>
      )}
    </div>
  )
}
