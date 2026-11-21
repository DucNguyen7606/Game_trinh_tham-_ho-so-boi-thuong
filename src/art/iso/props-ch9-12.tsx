import type { ReactNode } from 'react'
import type { PortraitSpec } from '@/art/Portrait'
import { Box, Cyl, Face, OnPlane, iso, tone, type V3 } from './iso'
import { FrontBust, IsoFigure } from './figure'
import { IsoGroup } from './iso'

// More furniture for the diorama scenes, added with Chapters 9 to 12 (flats,
// a cold store, a port office, an old villa). Same rules as props.tsx: `at` is
// the back-left-bottom corner in world units unless noted.

const FONT = "'Be Vietnam Pro', sans-serif"
const MONO = 'IBM Plex Mono, monospace'

/** Text on a plane, in world units (see OnPlane). Anchored at its left baseline unless `anchor` says otherwise. */
export function Label({ at, plane, text, size = 10, color = iso.ink, weight = 800, mono = false, anchor = 'start' }: { at: V3; plane: 'top' | 'R' | 'L'; text: string; size?: number; color?: string; weight?: number; mono?: boolean; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <OnPlane at={at} plane={plane}>
      <text x={0} y={0} fontSize={size} fill={color} fontWeight={weight} textAnchor={anchor} fontFamily={mono ? MONO : FONT}>
        {text}
      </text>
    </OnPlane>
  )
}

/** A flat rectangle on the left wall (plane x = x0), from (y, z) spanning w along y and h up. */
export function PanelL({ x0 = 0.5, y, z, w, h, fill }: { x0?: number; y: number; z: number; w: number; h: number; fill: string }) {
  return <Face points={[[x0, y, z], [x0, y + w, z], [x0, y + w, z + h], [x0, y, z + h]]} fill={fill} />
}

/** A flat rectangle on the right wall (plane y = y0), from (x, z) spanning w along x and h up. */
export function PanelR({ y0 = 0.5, x, z, w, h, fill }: { y0?: number; x: number; z: number; w: number; h: number; fill: string }) {
  return <Face points={[[x, y0, z], [x + w, y0, z], [x + w, y0, z + h], [x, y0, z + h]]} fill={fill} />
}

/** A flat rectangle lying on a horizontal surface. */
export function Flat({ at, w, d, fill, opacity }: { at: V3; w: number; d: number; fill: string; opacity?: number }) {
  const [x, y, z] = at
  return <Face points={[[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]]} fill={fill} opacity={opacity} />
}

/** A door in the left wall (plane x = 0), with a handle or a smart lock. */
export function DoorL({ y, w = 70, h = 150, color = '#8a6a52', lock = false, open = false }: { y: number; w?: number; h?: number; color?: string; lock?: boolean; open?: boolean }) {
  return (
    <g>
      <PanelL x0={0.4} y={y - 5} z={0} w={w + 10} h={h + 6} fill={tone(color, 0.35)} />
      <PanelL x0={0.8} y={y} z={0} w={w} h={h} fill={open ? '#2f2a3f' : color} />
      {!open && <PanelL x0={1} y={y + 8} z={h * 0.55} w={w - 16} h={2} fill={tone(color, -0.15)} />}
      {lock ? (
        <g>
          <PanelL x0={1.2} y={y + w - 18} z={h * 0.42} w={12} h={26} fill={iso.ink} />
          <PanelL x0={1.4} y={y + w - 16} z={h * 0.42 + 14} w={8} h={8} fill="#9fd3e6" />
        </g>
      ) : (
        <PanelL x0={1.2} y={y + w - 14} z={h * 0.48} w={8} h={3} fill={iso.metal} />
      )}
    </g>
  )
}

/** A door in the right wall (plane y = 0). */
export function DoorR({ x, w = 70, h = 150, color = '#8a6a52', open = false }: { x: number; w?: number; h?: number; color?: string; open?: boolean }) {
  return (
    <g>
      <PanelR y0={0.4} x={x - 5} z={0} w={w + 10} h={h + 6} fill={tone(color, 0.35)} />
      <PanelR y0={0.8} x={x} z={0} w={w} h={h} fill={open ? '#2f2a3f' : color} />
      {!open && <PanelR y0={1.2} x={x + 6} z={h * 0.48} w={8} h={3} fill={iso.metal} />}
    </g>
  )
}

/** Sliding metal lift doors on the left wall, with a call panel. */
export function LiftL({ y, w = 80, h = 140, color = '#b9bfcc', sign }: { y: number; w?: number; h?: number; color?: string; sign?: string }) {
  return (
    <g>
      <PanelL x0={0.4} y={y - 10} z={0} w={w + 20} h={h + 12} fill={tone(color, -0.25)} />
      <PanelL x0={0.8} y={y} z={0} w={w / 2 - 1} h={h} fill={color} />
      <PanelL x0={0.8} y={y + w / 2 + 1} z={0} w={w / 2 - 1} h={h} fill={tone(color, -0.06)} />
      <PanelL x0={1} y={y + w + 16} z={60} w={10} h={22} fill={iso.ink} />
      <PanelL x0={1.2} y={y + w + 18} z={70} w={6} h={6} fill={iso.gold} />
      {sign && <Label at={[1.2, y + w, h + 26]} plane="L" text={sign} size={12} color={iso.ink} />}
    </g>
  )
}

/** Sliding metal lift doors on the right wall. */
export function LiftR({ x, w = 80, h = 140, color = '#b9bfcc', sign }: { x: number; w?: number; h?: number; color?: string; sign?: string }) {
  return (
    <g>
      <PanelR y0={0.4} x={x - 10} z={0} w={w + 20} h={h + 12} fill={tone(color, -0.25)} />
      <PanelR y0={0.8} x={x} z={0} w={w / 2 - 1} h={h} fill={color} />
      <PanelR y0={0.8} x={x + w / 2 + 1} z={0} w={w / 2 - 1} h={h} fill={tone(color, -0.06)} />
      <PanelR y0={1} x={x - 26} z={60} w={10} h={22} fill={iso.ink} />
      <PanelR y0={1.2} x={x - 24} z={70} w={6} h={6} fill={iso.gold} />
      {sign && <Label at={[x, 1.2, h + 26]} plane="R" text={sign} size={12} color={iso.ink} />}
    </g>
  )
}

/** Double bed, headboard against the left wall (x = x0 side), running along +x. */
export function Bed({ at, w = 170, d = 130, sheet = '#f6efe3', cover = '#c9b6dd', frame = '#a07c5a' }: { at: V3; w?: number; d?: number; sheet?: string; cover?: string; frame?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[12, d, 70]} color={frame} />
      <Box at={[x + 12, y, z]} size={[w - 12, d, 26]} color={frame} />
      <Box at={[x + 12, y + 2, z + 26]} size={[w - 14, d - 4, 14]} color={sheet} />
      <Box at={[x + 18, y + 10, z + 40]} size={[30, 48, 9]} color="#ffffff" />
      <Box at={[x + 18, y + d - 58, z + 40]} size={[30, 48, 9]} color="#ffffff" />
      <Box at={[x + 70, y, z + 26]} size={[w - 70, d, 16]} color={cover} />
    </g>
  )
}

/** Sofa facing +x, back along the left side. */
export function Sofa({ at, len = 160, color = '#7e9cb5' }: { at: V3; len?: number; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[22, len, 60]} color={color} />
      <Box at={[x + 22, y, z]} size={[50, 18, 44]} color={color} />
      <Box at={[x + 22, y + 18, z]} size={[50, len - 36, 30]} color={tone(color, 0.06)} />
      <Box at={[x + 22, y + len - 18, z]} size={[50, 18, 44]} color={color} />
    </g>
  )
}

/** Ring light on a tripod with a phone in its middle, facing +x. */
export function RingLight({ at, h = 110 }: { at: V3; h?: number }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x - 14, y - 2, z]} size={[28, 4, 3]} color={iso.ink} />
      <Box at={[x - 2, y - 14, z]} size={[4, 28, 3]} color={iso.ink} />
      <Box at={[x - 2, y - 2, z]} size={[4, 4, h]} color={iso.ink} />
      <Cyl at={[x, y, z + h + 26]} r={26} len={3} axis="x" color="#f6f1ff" cap="#ffffff" />
      <Cyl at={[x + 3.2, y, z + h + 26]} r={18} len={0.5} axis="x" color="#d9d2ee" cap="#e7e1f3" />
      <Box at={[x + 3, y - 5, z + h + 18]} size={[2, 10, 16]} color={iso.ink} />
    </g>
  )
}

/** Tall cupboard against the left wall; its doors face +x. */
export function Wardrobe({ at, w = 60, d = 140, h = 190, color = '#c9a27e' }: { at: V3; w?: number; d?: number; h?: number; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[w, d, h]} color={color} />
      <Face points={[[x + w + 0.4, y + d / 2, z + 6], [x + w + 0.4, y + d / 2 + 1.5, z + 6], [x + w + 0.4, y + d / 2 + 1.5, z + h - 6], [x + w + 0.4, y + d / 2, z + h - 6]]} fill={tone(color, -0.45)} />
    </g>
  )
}

/** A wall-safe door set in a +x face (plane x = x0), standing open a crack, with its keypad screen. */
export function SafeX({ x0, y, z, w = 70, h = 80, screen }: { x0: number; y: number; z: number; w?: number; h?: number; screen?: string }) {
  return (
    <g>
      <Face points={[[x0 + 0.3, y, z], [x0 + 0.3, y + w, z], [x0 + 0.3, y + w, z + h], [x0 + 0.3, y, z + h]]} fill="#2f2a3f" />
      {/* the door swung a little towards the camera */}
      <Face points={[[x0 + 0.3, y + w, z], [x0 + 22, y + w + 8, z], [x0 + 22, y + w + 8, z + h], [x0 + 0.3, y + w, z + h]]} fill="#5c6478" />
      <Face points={[[x0 + 0.6, y + 4, z + 4], [x0 + 0.6, y + w - 4, z + 4], [x0 + 0.6, y + w - 4, z + h - 4], [x0 + 0.6, y + 4, z + h - 4]]} fill="#3d3a52" />
      {screen !== undefined && (
        <g>
          <Face points={[[x0 + 0.8, y + 12, z + h + 8], [x0 + 0.8, y + w - 12, z + h + 8], [x0 + 0.8, y + w - 12, z + h + 34], [x0 + 0.8, y + 12, z + h + 34]]} fill={iso.ink} />
          <Face points={[[x0 + 1, y + 15, z + h + 11], [x0 + 1, y + w - 15, z + h + 11], [x0 + 1, y + w - 15, z + h + 31], [x0 + 1, y + 15, z + h + 31]]} fill="#7fe0c6" />
          <Label at={[x0 + 1.2, y + w - 18, z + h + 18]} plane="L" text={screen} size={8.5} color={iso.ink} mono />
        </g>
      )}
    </g>
  )
}

/** Wall-mounted dome camera on the right wall, turned upward. */
export function CameraR({ x, z, up = false }: { x: number; z: number; up?: boolean }) {
  return (
    <g>
      <Box at={[x, 0, z]} size={[16, 14, 5]} color={iso.metal} />
      <Box at={[x + 4, 4, z - 12]} size={[8, 6, 12]} color={iso.metal} />
      {up ? <Box at={[x - 2, 6, z - 2]} size={[20, 26, 12]} color="#e9eef2" /> : <Box at={[x - 2, 6, z - 22]} size={[20, 26, 12]} color="#e9eef2" />}
      {up ? <Box at={[x + 4, 30, z + 4]} size={[8, 3, 8]} color={iso.ink} /> : <Box at={[x + 4, 30, z - 18]} size={[8, 3, 8]} color={iso.ink} />}
    </g>
  )
}

/** Folding aluminium step ladder, standing, open along y. */
export function Ladder({ at, h = 120 }: { at: V3; h?: number }) {
  const [x, y, z] = at
  const c = '#c9ced8'
  return (
    <g>
      <Face points={[[x, y, z], [x + 30, y, z], [x + 30, y + 18, z + h], [x, y + 18, z + h]]} fill={tone(c, -0.15)} />
      <Face points={[[x, y + 40, z], [x + 30, y + 40, z], [x + 30, y + 22, z + h], [x, y + 22, z + h]]} fill={c} />
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <Box key={t} at={[x, y + 40 - 18 * t - 2, z + h * t]} size={[30, 4, 2]} color={tone(c, -0.3)} />
      ))}
      <Box at={[x, y + 16, z + h]} size={[30, 8, 4]} color={iso.coral} />
    </g>
  )
}

/** Row of staff lockers against the right wall, doors facing +y. */
export function Lockers({ at, n = 3, w = 40, h = 150, color = '#8fa4b8', names = [] }: { at: V3; n?: number; w?: number; h?: number; color?: string; names?: string[] }) {
  const [x, y, z] = at
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <Box at={[x + i * w, y, z]} size={[w - 1, 44, h]} color={i % 2 ? tone(color, -0.04) : color} />
          {[0, 1, 2].map((k) => (
            <Face key={k} points={[[x + i * w + 8, y + 44.3, z + h - 18 - k * 5], [x + i * w + w - 9, y + 44.3, z + h - 18 - k * 5], [x + i * w + w - 9, y + 44.3, z + h - 16 - k * 5], [x + i * w + 8, y + 44.3, z + h - 16 - k * 5]]} fill={tone(color, -0.3)} />
          ))}
          {names[i] && <Label at={[x + i * w + w / 2, y + 44.5, z + h - 40]} plane="R" text={names[i]} size={9} anchor="middle" />}
        </g>
      ))}
    </g>
  )
}

/** A pair of safety boots, toes towards +y. */
export function Boots({ at, color = '#5b4a3f' }: { at: V3; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      {[0, 22].map((o) => (
        <g key={o}>
          <Box at={[x + o, y, z]} size={[17, 40, 6]} color="#2a2433" />
          <Box at={[x + o + 1, y, z + 6]} size={[15, 18, 26]} color={color} />
          <Box at={[x + o + 1, y + 18, z + 6]} size={[15, 21, 12]} color={color} />
          <Box at={[x + o + 3, y + 30, z + 18]} size={[11, 8, 1]} color={iso.gold} />
        </g>
      ))}
    </g>
  )
}

/** A screen (monitor, panel, tablet) standing on its edge, facing +y, with up to three lines. */
export function ScreenR({ at, w = 60, h = 40, lines = [], bg = '#1f2a3a', fg = '#7fe0c6', size = 7 }: { at: V3; w?: number; h?: number; lines?: string[]; bg?: string; fg?: string; size?: number }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[w, 5, h]} color={iso.ink} />
      <Face points={[[x + 3, y + 5.3, z + 3], [x + w - 3, y + 5.3, z + 3], [x + w - 3, y + 5.3, z + h - 3], [x + 3, y + 5.3, z + h - 3]]} fill={bg} />
      <OnPlane at={[x + 6, y + 5.5, z + h - 6]} plane="R">
        {lines.map((t, i) => (
          <text key={i} x={0} y={size + i * (size + 3)} fontSize={size} fill={fg} fontFamily={MONO}>
            {t}
          </text>
        ))}
      </OnPlane>
    </g>
  )
}

/** A sheet of paper pinned on the right wall with a title and a few ruled lines. */
export function NoticeR({ x, z, w = 50, h = 60, title, color = '#fffaf0', ink = iso.ink }: { x: number; z: number; w?: number; h?: number; title?: string; color?: string; ink?: string }) {
  return (
    <g>
      <PanelR y0={0.6} x={x} z={z} w={w} h={h} fill={color} />
      {title && <Label at={[x + 4, 0.9, z + h - 10]} plane="R" text={title} size={7} color={ink} />}
      {[0, 1, 2, 3].map((i) => (
        <PanelR key={i} y0={0.8} x={x + 4} z={z + h - 22 - i * 9} w={i % 2 ? w - 16 : w - 8} h={2} fill="#cdbb9c" />
      ))}
    </g>
  )
}

/** The same on the left wall. */
export function NoticeL({ y, z, w = 50, h = 60, title, color = '#fffaf0', ink = iso.ink }: { y: number; z: number; w?: number; h?: number; title?: string; color?: string; ink?: string }) {
  return (
    <g>
      <PanelL x0={0.6} y={y} z={z} w={w} h={h} fill={color} />
      {title && <Label at={[0.9, y + w - 4, z + h - 10]} plane="L" text={title} size={7} color={ink} />}
      {[0, 1, 2, 3].map((i) => (
        <PanelL key={i} x0={0.8} y={y + (i % 2 ? 12 : 4)} z={z + h - 22 - i * 9} w={i % 2 ? w - 16 : w - 8} h={2} fill="#cdbb9c" />
      ))}
    </g>
  )
}

/** A potted plant. */
export function Plant({ at, h = 40, pot = '#c98a5c' }: { at: V3; h?: number; pot?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Cyl at={[x, y, z]} r={14} len={22} axis="z" color={pot} />
      <Box at={[x - 12, y - 12, z + 22]} size={[24, 24, h * 0.6]} color={iso.leaf} />
      <Box at={[x - 7, y - 7, z + 22 + h * 0.6]} size={[14, 14, h * 0.4]} color={tone(iso.leaf, 0.12)} />
    </g>
  )
}

/** A closed cardboard box, optionally labelled on its +y face. */
export function Carton({ at, size = [40, 30, 28], color = '#d9a86a', text }: { at: V3; size?: V3; color?: string; text?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={at} size={size} color={color} />
      <Face points={[[x + size[0] / 2 - 3, y, z + size[2] + 0.2], [x + size[0] / 2 + 3, y, z + size[2] + 0.2], [x + size[0] / 2 + 3, y + size[1], z + size[2] + 0.2], [x + size[0] / 2 - 3, y + size[1], z + size[2] + 0.2]]} fill={tone(color, 0.25)} />
      {text && <Label at={[x + size[0] / 2, y + size[1] + 0.3, z + size[2] * 0.6]} plane="R" text={text} size={Math.min(9, size[0] / 5)} anchor="middle" />}
    </g>
  )
}

/** A motorbike (scooter) seen side on, running along x. */
export function Scooter({ at, color = iso.coral, plate }: { at: V3; color?: string; plate?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Cyl at={[x + 14, y + 6, z + 14]} r={14} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Cyl at={[x + 86, y + 6, z + 14]} r={14} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Box at={[x + 10, y, z + 18]} size={[86, 20, 18]} color={color} />
      <Box at={[x + 30, y + 2, z + 36]} size={[40, 16, 8]} color={iso.ink} />
      <Box at={[x + 88, y + 4, z + 36]} size={[8, 12, 34]} color={color} />
      <Box at={[x + 84, y - 4, z + 68]} size={[6, 28, 4]} color={iso.ink} />
      {plate && (
        <g>
          <Box at={[x - 2, y + 2, z + 20]} size={[3, 16, 10]} color="#f6efe3" />
          <Label at={[x - 1.6, y + 17, z + 27]} plane="L" text={plate} size={3.4} mono />
        </g>
      )}
    </g>
  )
}

/** A wall clock on the left wall. */
export function ClockL({ y, z, r = 13, hh = 0, mm = 0 }: { y: number; z: number; r?: number; hh?: number; mm?: number }) {
  const a = (mm / 60) * Math.PI * 2
  const b = ((hh % 12) / 12 + mm / 720) * Math.PI * 2
  return (
    <g>
      <Cyl at={[0, y, z]} r={r} len={2.5} axis="x" color="#e9e1d4" cap="#fffaf0" />
      <Face points={[[2.8, y - 0.8, z], [2.8, y + 0.8, z], [2.8, y + 0.8 - Math.sin(a) * r * 0.85, z + Math.cos(a) * r * 0.85], [2.8, y - 0.8 - Math.sin(a) * r * 0.85, z + Math.cos(a) * r * 0.85]]} fill={iso.ink} />
      <Face points={[[2.9, y - 1.2, z], [2.9, y + 1.2, z], [2.9, y + 1.2 - Math.sin(b) * r * 0.55, z + Math.cos(b) * r * 0.55], [2.9, y - 1.2 - Math.sin(b) * r * 0.55, z + Math.cos(b) * r * 0.55]]} fill={iso.ink} />
    </g>
  )
}

/** A wall window on the right wall showing a dusk city or river beyond. */
export function WindowR({ x, z, w, h, view = 'city', frame = '#fffaf0' }: { x: number; z: number; w: number; h: number; view?: 'city' | 'river' | 'night' | 'garden'; frame?: string }) {
  const sky = view === 'night' ? '#3d4a74' : view === 'garden' ? '#cfe6d6' : '#f3c9b1'
  return (
    <g>
      <PanelR y0={0.4} x={x - 4} z={z - 4} w={w + 8} h={h + 8} fill={frame} />
      <PanelR y0={0.6} x={x} z={z} w={w} h={h} fill={sky} />
      {view === 'river' && <PanelR y0={0.7} x={x} z={z} w={w} h={h * 0.3} fill="#8fb8c9" />}
      {(view === 'city' || view === 'river' || view === 'night') &&
        [0.1, 0.24, 0.4, 0.55, 0.7, 0.84].map((t, i) => (
          <PanelR key={t} y0={0.8} x={x + w * t} z={z + h * (view === 'river' ? 0.3 : 0)} w={w * 0.1} h={h * (0.25 + ((i * 37) % 30) / 100)} fill={view === 'night' ? '#2a3150' : '#c9a7b8'} />
        ))}
      {view === 'garden' && <PanelR y0={0.7} x={x} z={z} w={w} h={h * 0.45} fill={iso.leaf} />}
      <PanelR y0={0.9} x={x + w / 2 - 1.5} z={z} w={3} h={h} fill={frame} />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Phone photos and evidence pictures, drawn straight on (as Chapter 1's documents.tsx).

const DX = 0.32, DY = 0.24

/** A block seen straight on: front face (x, y = its top-left corner) with a sliver of top and right side `d` deep. */
export function Fb({ x, y, w, h, d = 10, c, top, side }: { x: number; y: number; w: number; h: number; d?: number; c: string; top?: string; side?: string }) {
  const ox = d * DX, oy = d * DY
  return (
    <g>
      <polygon points={`${x + w},${y} ${x + w + ox},${y - oy} ${x + w + ox},${y + h - oy} ${x + w},${y + h}`} fill={side ?? tone(c, -0.28)} />
      <polygon points={`${x},${y} ${x + w},${y} ${x + w + ox},${y - oy} ${x + ox},${y - oy}`} fill={top ?? tone(c, 0.14)} />
      <rect x={x} y={y} width={w} height={h} fill={c} />
    </g>
  )
}

const extra: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'young', mood: 'smile' }

/** A person in a photo: (x, y) is the middle of the chest, s the size. `spec` is a cast member's look; `look` and raw colours tweak it or describe an extra. */
export function Person({ x, y, s = 1, spec, look, skin, hair, shirt }: { x: number; y: number; s?: number; spec?: PortraitSpec; look?: Partial<PortraitSpec>; skin?: string; hair?: string; shirt?: string }) {
  return <FrontBust spec={{ ...(spec ?? extra), ...look }} k={1.25 * s} at={[x, y - 30 * s]} colors={{ skin, hair, cloth: shirt }} />
}

/** Date-time stamp in the corner of a phone photo. */
export function TimeTag({ t, x = 8, y = 8 }: { t: string; x?: number; y?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="104" height="18" rx="6" fill={iso.ink} opacity="0.55" />
      <text x={x + 6} y={y + 13} fontSize="11" fill="#fff" fontFamily={MONO}>{t}</text>
    </g>
  )
}

/** What a stand-in figure holds in the reconstruction panels. */
export type Held = 'box' | 'card' | 'tool' | 'phone' | 'glass' | 'logger' | 'watch' | 'carry'

/**
 * A faceless-colour stand-in for the reconstruction panels, in the scene's
 * 1600 x 900 space: (x, y) is where the feet touch the ground. It is a block
 * figure whose shirt is the colour of the person it stands for.
 */
export function StandIn({ x, y, h = 260, color, flip = false, hair = 'short', hairColor = 'black', pose = 'stand', hold }: { x: number; y: number; h?: number; color: string; flip?: boolean; hair?: PortraitSpec['hair']; hairColor?: PortraitSpec['hairColor']; pose?: 'stand' | 'sit'; hold?: Held }) {
  const spec: PortraitSpec = { skin: 1, hair, hairColor, build: 'normal', outfit: 'shirt', outfitColor: 'charcoal', mood: 'neutral' }
  const k = h / 105
  // Facing +y shows the face to the lower left; flip turns the figure to face the lower right.
  const facing = flip ? 'x' : 'y'
  const hand: V3 = flip ? [18, -12, 36] : [12, 20, 36]
  const item: Partial<Record<Held, JSX.Element>> = {
    box: <Box at={[hand[0] - 6, hand[1] - 4, hand[2] - 4]} size={[22, 16, 14]} color="#6b3e2e" />,
    card: <Box at={[hand[0], hand[1], hand[2] + 4]} size={[2, 12, 8]} color="#f2f2ee" />,
    tool: <Box at={[hand[0], hand[1], hand[2] + 2]} size={[3, 3, 20]} color={iso.mustard} />,
    phone: <Box at={[hand[0], hand[1], hand[2] + 4]} size={[3, 7, 13]} color={iso.ink} />,
    glass: <Cyl at={[hand[0] + 2, hand[1] + 2, hand[2] + 2]} r={3.5} len={10} axis="z" color="#e9eef2" />,
    logger: <Box at={[hand[0], hand[1], hand[2] + 2]} size={[6, 10, 14]} color={iso.blue} />,
    watch: <Cyl at={[hand[0] + 2, hand[1] + 2, hand[2] + 4]} r={5} len={2} axis="z" color={iso.gold} cap="#fff6e2" />,
    carry: <Box at={[hand[0] - 14, hand[1] - 8, hand[2] + 6]} size={[30, 20, 10]} color="#cdbb9c" />,
  }
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={h * 0.22} ry={h * 0.07} fill={iso.ink} opacity="0.25" />
      <IsoGroup origin={[x, y]} scale={k}>
        <IsoFigure at={[-13, -9, 0]} spec={spec} cloth={color} facing={facing} pose={pose} />
        {hold && item[hold]}
      </IsoGroup>
    </g>
  )
}

/** Numbered marker for the reconstruction panels. */
export function Marker({ x, y, n }: { x: number; y: number; n: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="26" fill={iso.coral} stroke="#ffffff" strokeWidth="5" />
      <text y="10" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff" fontFamily={FONT}>
        {n}
      </text>
    </g>
  )
}

/** Dims a diorama for a night-time panel, keeping the pastel look. */
export function Night({ opacity = 0.4 }: { opacity?: number }) {
  return <rect width="1600" height="900" fill="#2e2a5a" opacity={opacity} style={{ mixBlendMode: 'multiply' }} />
}

/** Background for panels that lay documents out on a desk. */
export const deskBg = 'bg-[linear-gradient(180deg,#d9d2ee,#f6dccb)]'

/** Generic group helper so callers can pass children through a mapped list. */
export function G({ children }: { children: ReactNode }) {
  return <g>{children}</g>
}
