import type { PortraitSpec } from '@/art/Portrait'
import { FrontBust } from './figure'
import { iso, tone } from './iso'

// Pieces for evidence photos drawn in the diorama style seen straight on
// (phone photos, camera stills): blocks with a sliver of top and right side,
// and block people from the same FrontBust as the portrait cards. Same look as
// the helpers in Chapter 1's documents.tsx, shared by Chapters 5–8.

const DX = 0.32, DY = 0.24

/** A block seen straight on: front face (x, y = its top-left corner), with a sliver of top and right side `d` deep. */
export const Fb = ({ x, y, w, h, d = 10, c, top, side, opacity }: { x: number; y: number; w: number; h: number; d?: number; c: string; top?: string; side?: string; opacity?: number }) => {
  const ox = d * DX, oy = d * DY
  return (
    <g opacity={opacity}>
      <polygon points={`${x + w},${y} ${x + w + ox},${y - oy} ${x + w + ox},${y + h - oy} ${x + w},${y + h}`} fill={side ?? tone(c, -0.28)} />
      <polygon points={`${x},${y} ${x + w},${y} ${x + w + ox},${y - oy} ${x + ox},${y - oy}`} fill={top ?? tone(c, 0.14)} />
      <rect x={x} y={y} width={w} height={h} fill={c} />
    </g>
  )
}

/** A wheel seen side-on: tyre and hub. */
export const Wheel = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={iso.ink} />
    <circle cx={cx} cy={cy} r={r * 0.45} fill={iso.metal} />
  </g>
)

const extra: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'young', mood: 'smile' }

export interface GuestProps {
  x: number
  y: number
  s?: number
  /** A suspect's id: takes their own look. */
  who?: string
  look?: Partial<PortraitSpec>
  skin?: string
  hair?: string
  shirt?: string
  /** A hood pulled up over the head, in the shirt colour. */
  hood?: boolean
}

/**
 * Makes the person-in-a-photo helper for one case: (x, y) is the middle of the
 * chest, s the size. `who` takes a suspect's own look; otherwise `look` and raw
 * colours describe an extra.
 */
export function makeGuest(cast: Record<string, PortraitSpec | undefined>) {
  return function Guest({ x, y, s = 1, who, look, skin, hair, shirt, hood }: GuestProps) {
    const spec = { ...((who && cast[who]) || extra), ...look }
    const k = 1.25 * s
    const fx = x, fy = y - 30 * s
    const cloth = shirt ?? undefined
    return (
      <g>
        <FrontBust spec={spec} k={k} at={[fx, fy]} colors={{ skin, hair, cloth }} />
        {hood && (
          <g>
            {/* hood: a frame round the face, open at the front */}
            <rect x={fx - 15.5 * k} y={fy - 19 * k} width={31 * k} height={5 * k} fill={shirt ?? '#ece2cf'} />
            <rect x={fx - 15.5 * k} y={fy - 15 * k} width={4 * k} height={20 * k} fill={shirt ?? '#ece2cf'} />
            <rect x={fx + 11.5 * k} y={fy - 15 * k} width={4 * k} height={20 * k} fill={tone(shirt ?? '#ece2cf', -0.08)} />
          </g>
        )}
      </g>
    )
  }
}

/** Date-time stamp in the corner of a phone photo. */
export const TimeStamp = ({ t, x = 8, y = 8 }: { t: string; x?: number; y?: number }) => (
  <g>
    <rect x={x} y={y} width="104" height="18" rx="6" fill={iso.ink} opacity="0.55" />
    <text x={x + 6} y={y + 13} fontSize="11" fill="#fff" fontFamily="IBM Plex Mono, monospace">
      {t}
    </text>
  </g>
)
