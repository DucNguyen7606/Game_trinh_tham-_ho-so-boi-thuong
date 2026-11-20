import { IsoCrop } from '@/art/iso/iso'
import caseData from '../case.json'
import { isoSceneArt } from './scenes'

// Close-up photos in the diorama style: the zone's own diorama, zoomed in on
// the hotspot (a 4:3 crop around its position). What the photo shows in detail
// is written in the hotspot's note.

const W = 420
const H = 315

export const isoCloseups: Record<string, () => JSX.Element> = Object.fromEntries(
  caseData.zones.flatMap((zone) =>
    zone.hotspots.map((h) => {
      const Art = isoSceneArt[zone.id]
      const cx = (h.x / 100) * 1600
      const cy = (h.y / 100) * 900
      const crop: [number, number, number, number] = [cx - W / 2, cy - H / 2 - 20, W, H]
      const Closeup = () => (
        <IsoCrop.Provider value={crop}>
          <Art />
        </IsoCrop.Provider>
      )
      return [h.id, Closeup]
    }),
  ),
)
