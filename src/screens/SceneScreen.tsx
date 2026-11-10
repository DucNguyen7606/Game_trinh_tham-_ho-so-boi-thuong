import { useEffect, useState } from 'react'
import { Camera, Maximize2, X } from 'lucide-react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getCloseup, getSceneArt } from '@/game/caseLoader'
import { EvidencePhoto } from '@/art/EvidencePhoto'

export default function SceneScreen() {
  const { data, visitedZones, visitZone, inspectHotspot, inspectedHotspots, left } = useGame()
  const [zoneId, setZoneId] = useState(data.zones[0].id)
  const [selected, setSelected] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)

  // Esc closes the enlarged photo.
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  const zone = data.zones.find((z) => z.id === zoneId)!
  const visited = visitedZones.includes(zone.id)
  const hotspot = zone.hotspots.find((h) => h.id === selected)
  const Art = getSceneArt(data.id, zone.id)
  const Closeup = hotspot ? getCloseup(data.id, hotspot.id) : undefined
  // Photo number = order of the hotspot within the zone; evidence gets a numbered tent.
  const photoNo = hotspot ? zone.hotspots.indexOf(hotspot) + 1 : 0
  const zoneNo = data.zones.indexOf(zone) + 1

  const photoProps = hotspot ? {
    marker: hotspot.clueId ? String(photoNo) : undefined,
    showRuler: Boolean(hotspot.clueId),
    stamp: `15 07 '25  09:${String(10 + zoneNo * 7 + photoNo).padStart(2, '0')}`,
    caption: `Ảnh ${zoneNo}.${photoNo} · ${hotspot.label}${hotspot.clueId ? ` · ${hotspot.clueId}` : ''}`,
    tilt: photoNo % 2 ? -1.5 : 1.2,
  } : undefined

  return (
    <div className="grid h-full grid-cols-[1fr_360px]">
      <section className="flex min-h-0 flex-col">
        <div className="flex gap-1 border-b border-border p-2">
          {data.zones.map((z) => (
            <Button
              key={z.id}
              size="sm"
              variant={z.id === zoneId ? 'secondary' : 'ghost'}
              onClick={() => {
                setZoneId(z.id)
                setSelected(null)
              }}
            >
              {z.name}
              {visitedZones.includes(z.id) && <Badge variant="outline">đã khám</Badge>}
            </Button>
          ))}
        </div>

        {/* Zone backdrop drawn in code (src/cases/<case>/scenes.tsx); hotspots are positioned in percent on top. */}
        <div className="relative m-4 flex-1 overflow-hidden border border-border bg-background">
          {Art && <Art />}
          {!visited && <div className="absolute inset-0 bg-background/70" />}
          <p className="absolute left-4 top-4 max-w-md bg-background/80 px-2 py-1 text-sm text-muted-foreground">{zone.description}</p>
          {!visited ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Button disabled={left.explore <= 0} onClick={() => visitZone(zone.id)}>
                  Khám khu này (1 lượt khám)
                </Button>
                {left.explore <= 0 && (
                  <p className="bg-background/80 px-2 py-1 text-sm text-muted-foreground">Hôm nay đã khám đủ. Kết thúc ngày ở Bàn làm việc để khám tiếp.</p>
                )}
              </div>
            </div>
          ) : (
            zone.hotspots.map((h) => (
              <button
                key={h.id}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                onClick={() => {
                  setSelected(h.id)
                  inspectHotspot(h.id, h.clueId)
                }}
                className={cn(
                  'display absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-1 text-xs transition',
                  inspectedHotspots.includes(h.id)
                    ? 'border-border bg-background/80 text-muted-foreground'
                    : 'border-amber bg-background/80 text-amber hover:bg-amber/20',
                )}
              >
                {h.label}
              </button>
            ))
          )}
        </div>
      </section>

      <aside className="overflow-auto border-l border-border p-4">
        {hotspot ? (
          <div className="space-y-3">
            <h3 className="font-semibold">{hotspot.label}</h3>
            <p className="text-sm">{hotspot.note}</p>
            {hotspot.clueId && (
              <Badge>
                <Camera className="mr-1 size-3" /> Đã chụp ảnh, thêm thẻ {hotspot.clueId} lên bàn suy luận
              </Badge>
            )}
            {Closeup && photoProps && (
              <button
                className="group relative block w-full pt-2 text-left"
                onClick={() => setZoomed(true)}
                aria-label={`Phóng to ảnh ${hotspot.label}`}
              >
                <div className="transition duration-200 group-hover:-translate-y-1 group-hover:brightness-110">
                  <EvidencePhoto key={hotspot.id} {...photoProps}>
                    <Closeup />
                  </EvidencePhoto>
                </div>
                <span className="display absolute right-3 top-5 flex items-center gap-1 rounded bg-background/80 px-2 py-0.5 text-xs text-amber opacity-0 transition group-hover:opacity-100">
                  <Maximize2 className="size-3" /> Phóng to
                </span>
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Bấm vào một vật để xem kỹ. Không phải vật nào cũng có ý nghĩa.</p>
        )}
      </aside>

      {zoomed && hotspot && Closeup && photoProps && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-8 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={photoProps.caption}
        >
          <div className="relative flex max-h-full w-[min(1100px,92vw)] items-center gap-8" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 flex-[3]">
              <EvidencePhoto {...photoProps} tilt={-0.6}>
                <Closeup />
              </EvidencePhoto>
            </div>
            <div className="document flex-[1.2] space-y-2 p-5">
              <p className="text-[10px] uppercase tracking-widest opacity-60">Ghi chú ảnh {photoProps.caption.split(' · ')[0].replace('Ảnh ', '')}</p>
              <h3 className="title text-xl">{hotspot.label}</h3>
              <p className="text-sm">{hotspot.note}</p>
              <p className="text-xs opacity-70">Khu: {zone.name}</p>
              {hotspot.clueId && (
                <p className="text-xs font-semibold text-[#b23a2e]">Tang vật số {photoProps.marker} · thẻ {hotspot.clueId} đã lên bàn suy luận</p>
              )}
            </div>
            <button
              className="absolute -right-3 -top-10 rounded-full bg-background/90 p-1.5 text-foreground hover:text-amber"
              onClick={() => setZoomed(false)}
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
