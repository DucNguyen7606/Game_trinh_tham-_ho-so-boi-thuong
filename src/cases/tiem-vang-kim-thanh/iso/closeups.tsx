import { IsoCrop } from '@/art/iso/iso'
import caseData from '../case.json'
import { isoSceneArt } from './scenes'

// Close-up photos in the diorama style: the zone's own diorama, zoomed in on
// the hotspot (a 4:3 crop around its position). What the photo shows in detail
// is written in the hotspot's note.


/** Close-ups whose photo must show a reading: a small card laid over the corner, like a label in the evidence photo. */
const readings: Record<string, string[]> = {
  'nhan-roi': ['Cân tiểu ly: 2.10 g', 'Bảng dán quầy: 1 lượng = 10 chỉ = 37,5 g'],
}

const W = 420
const H = 315

export const isoCloseups: Record<string, () => JSX.Element> = Object.fromEntries(
  caseData.zones.flatMap((zone) =>
    zone.hotspots.map((h) => {
      const Art = isoSceneArt[zone.id]
      const cx = (h.x / 100) * 1600
      const cy = (h.y / 100) * 900
      const crop: [number, number, number, number] = [cx - W / 2, cy - H / 2 - 20, W, H]
      const lines = readings[h.id]
      const Closeup = () => (
        <>
          <IsoCrop.Provider value={crop}>
            <Art />
          </IsoCrop.Provider>
          {lines && (
            <div className="absolute bottom-[6%] left-[5%] rounded-xl bg-white/95 px-3 py-1.5 font-mono text-[clamp(10px,1.6vw,15px)] font-semibold leading-snug text-[#2e2a4a] shadow-md">
              {lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          )}
        </>
      )
      return [h.id, Closeup]
    }),
  ),
)
