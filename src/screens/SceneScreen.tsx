import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function SceneScreen() {
  const { data, visitedZones, visitZone, inspectHotspot, inspectedHotspots, actionsLeft } = useGame()
  const [zoneId, setZoneId] = useState(data.zones[0].id)
  const [selected, setSelected] = useState<string | null>(null)

  const zone = data.zones.find((z) => z.id === zoneId)!
  const visited = visitedZones.includes(zone.id)
  const hotspot = zone.hotspots.find((h) => h.id === selected)

  return (
    <div className="grid h-full grid-cols-[1fr_320px]">
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

        {/* Placeholder for the zone artwork; hotspots are positioned in percent so art can be dropped in later. */}
        <div className="relative m-4 flex-1 overflow-hidden rounded-lg border border-border bg-gradient-to-b from-stone-800 to-stone-950">
          <p className="absolute left-4 top-4 max-w-md text-sm text-muted-foreground">{zone.description}</p>
          {!visited ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button disabled={actionsLeft <= 0} onClick={() => visitZone(zone.id)}>
                Khám khu này (1 lượt)
              </Button>
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
                  'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs transition',
                  inspectedHotspots.includes(h.id)
                    ? 'border-border bg-stone-900/80 text-muted-foreground'
                    : 'border-primary/60 bg-stone-900/80 text-primary hover:bg-primary/20',
                )}
              >
                {h.label}
              </button>
            ))
          )}
        </div>
      </section>

      <aside className="border-l border-border p-4">
        {hotspot ? (
          <div className="space-y-3">
            <h3 className="font-semibold">{hotspot.label}</h3>
            <p className="text-sm">{hotspot.note}</p>
            {hotspot.clueId && (
              <Badge>
                <Camera className="mr-1 size-3" /> Đã chụp ảnh, thêm thẻ {hotspot.clueId} lên bàn suy luận
              </Badge>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Bấm vào một vật để xem kỹ. Không phải vật nào cũng có ý nghĩa.</p>
        )}
      </aside>
    </div>
  )
}
