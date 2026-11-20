import { createContext, useContext, useId, type ReactNode } from 'react'

// "Sa bàn" (diorama) style: every scene is a small cut-away model seen from above
// at an isometric angle. Shapes are soft blocks with three flat tones (top, left,
// right) and no outlines, lit by a pastel dusk sky.
//
// World axes: x runs to the lower right, y to the lower left, z up. A scene sets
// the screen point of the world origin and a scale; every piece below projects
// through that context, so pieces are placed in world units, not pixels.

export const iso = {
  ink: '#2e2a4a',
  inkSoft: '#6c6787',
  lavender: '#c9c3e6',
  lilac: '#b9a3c4',
  plum: '#8f7aa3',
  peach: '#f7d9c4',
  cream: '#f6efe3',
  coral: '#e46b4f',
  blue: '#5d8ea3',
  sky: '#8fb8c9',
  gold: '#f2c46d',
  mustard: '#d9a441',
  sand: '#d8c2ad',
  slab: '#e9d6c4',
  wood: '#a07c5a',
  woodDark: '#7d5c41',
  metal: '#9aa3b5',
  soot: '#3d3446',
  sootDeep: '#2a2433',
  ember: '#ff8a5c',
  leaf: '#7fae8a',
}

/** Darken (a < 0) or lighten (a > 0) a hex colour. */
export function tone(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a)))
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export type V3 = [number, number, number]
type P2 = [number, number]

interface Proj {
  cx: number
  cy: number
  s: number
}

const ProjCtx = createContext<Proj>({ cx: 800, cy: 200, s: 1 })

/**
 * Set by a close-up: the part of the 1600 x 900 scene to show, as a viewBox
 * [x, y, w, h]. Lets a scene be reused as a zoomed photo of one spot.
 */
export const IsoCrop = createContext<[number, number, number, number] | null>(null)
const COS = 0.866
const SIN = 0.5

export function project(p: Proj, x: number, y: number, z: number): P2 {
  return [p.cx + (x - y) * COS * p.s, p.cy + (x + y) * SIN * p.s - z * p.s]
}

/** Lets a custom <svg> (portraits, inserts) place iso pieces with its own origin and scale. */
export function IsoGroup({ origin, scale = 1, children }: { origin: [number, number]; scale?: number; children: ReactNode }) {
  return <ProjCtx.Provider value={{ cx: origin[0], cy: origin[1], s: scale }}>{children}</ProjCtx.Provider>
}

export function useProj() {
  const p = useContext(ProjCtx)
  return (x: number, y: number, z = 0) => project(p, x, y, z)
}

/** World point on the floor (height z) under a screen point given in percent of 1600 x 900. */
export function floorAt(p: Proj, px: number, py: number, z = 0): [number, number] {
  const X = (px / 100) * 1600, Y = (py / 100) * 900
  const d = (X - p.cx) / (COS * p.s)
  const s = (Y - p.cy + z * p.s) / (SIN * p.s)
  return [(s + d) / 2, (s - d) / 2]
}

/** On the back-left wall (plane x = x0): returns [y, z] under a screen point in percent. */
export function wallLAt(p: Proj, px: number, py: number, x0 = 0): [number, number] {
  const X = (px / 100) * 1600, Y = (py / 100) * 900
  const y = x0 - (X - p.cx) / (COS * p.s)
  const z = (p.cy + (x0 + y) * SIN * p.s - Y) / p.s
  return [y, z]
}

/** On the back-right wall (plane y = y0): returns [x, z] under a screen point in percent. */
export function wallRAt(p: Proj, px: number, py: number, y0 = 0): [number, number] {
  const X = (px / 100) * 1600, Y = (py / 100) * 900
  const x = y0 + (X - p.cx) / (COS * p.s)
  const z = (p.cy + (x + y0) * SIN * p.s - Y) / p.s
  return [x, z]
}

const pts = (a: P2[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')

/** The frame every diorama sits in: a dusk gradient and a soft shadow under the model. */
export function IsoStage({
  children,
  label,
  origin = [800, 200],
  scale = 1,
  sky = [iso.lavender, iso.peach],
  overlay,
}: {
  children: ReactNode
  label: string
  origin?: [number, number]
  scale?: number
  sky?: [string, string]
  /** Drawn above the model without its drop shadow (light beams, markers). */
  overlay?: ReactNode
}) {
  const id = useId()
  const crop = useContext(IsoCrop)
  return (
    <svg viewBox={crop ? crop.join(' ') : '0 0 1600 900'} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <filter id={`${id}-sh`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor={iso.ink} floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      <ProjCtx.Provider value={{ cx: origin[0], cy: origin[1], s: scale }}>
        <g filter={`url(#${id}-sh)`}>{children}</g>
        {overlay}
      </ProjCtx.Provider>
    </svg>
  )
}

/** Any flat polygon given in world points. */
export function Face({ points, fill, opacity }: { points: V3[]; fill: string; opacity?: number }) {
  const P = useProj()
  return (
    <polygon
      points={pts(points.map((q) => P(...q)))}
      fill={fill}
      stroke={fill.startsWith('url') ? 'none' : fill}
      strokeWidth={0.8}
      strokeLinejoin="round"
      opacity={opacity}
    />
  )
}

/**
 * A block. Only the three faces the camera sees are drawn: top, the +y face
 * (lower left, mid tone) and the +x face (lower right, darkest).
 */
export function Box({ at, size, color, top, opacity }: { at: V3; size: V3; color: string; top?: string; opacity?: number }) {
  const [x, y, z] = at
  const [w, d, h] = size
  return (
    <g opacity={opacity}>
      <Face points={[[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]} fill={tone(color, -0.14)} />
      <Face points={[[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]} fill={tone(color, -0.3)} />
      <Face points={[[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]} fill={top ?? tone(color, 0.08)} />
    </g>
  )
}

/** The model's base: a thick slab with the floor on top. */
export function Slab({ w, d, floor, side = iso.slab, depth = 36 }: { w: number; d: number; floor: string; side?: string; depth?: number }) {
  return (
    <g>
      <Box at={[0, 0, -depth]} size={[w, d, depth]} color={side} top={floor} />
    </g>
  )
}

/** Cut-away back walls along x = 0 (left) and y = 0 (right), with a thick top edge. */
export function BackWalls({ w, d, h, left, right, edge = iso.plum, t = 14 }: { w: number; d: number; h: number; left?: string; right?: string; edge?: string; t?: number }) {
  return (
    <g>
      {left && (
        <>
          <Face points={[[0, 0, 0], [0, d, 0], [0, d, h], [0, 0, h]]} fill={left} />
          <Face points={[[-t, 0, h], [0, 0, h], [0, d, h], [-t, d, h]]} fill={edge} />
          <Face points={[[-t, d, 0], [0, d, 0], [0, d, h], [-t, d, h]]} fill={tone(edge, -0.12)} />
        </>
      )}
      {right && (
        <>
          <Face points={[[0, 0, 0], [w, 0, 0], [w, 0, h], [0, 0, h]]} fill={right} />
          <Face points={[[0, -t, h], [w, -t, h], [w, 0, h], [0, 0, h]]} fill={edge} />
          <Face points={[[w, -t, 0], [w, 0, 0], [w, 0, h], [w, -t, h]]} fill={tone(edge, -0.25)} />
        </>
      )}
      {left && right && <Face points={[[-t, -t, h], [0, -t, h], [0, 0, h], [-t, 0, h]]} fill={edge} />}
    </g>
  )
}

/** A disc approximated as a polygon. axis: which world axis it faces. */
function discPoints(c: V3, r: number, axis: 'x' | 'y' | 'z', n = 18): V3[] {
  const out: V3[] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const u = Math.cos(a) * r, v = Math.sin(a) * r
    out.push(axis === 'x' ? [c[0], c[1] + u, c[2] + v] : axis === 'y' ? [c[0] + u, c[1], c[2] + v] : [c[0] + u, c[1] + v, c[2]])
  }
  return out
}

function hull(points: P2[]): P2[] {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lower: P2[] = []
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop()
    lower.push(q)
  }
  const upper: P2[] = []
  for (const q of [...p].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop()
    upper.push(q)
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)]
}

/**
 * A cylinder (fabric roll, can, pot). `at` is the centre of the end nearest the
 * origin; it runs `len` along `axis`. The far (visible) end gets a lighter cap
 * and an optional core.
 */
export function Cyl({ at, r, len, axis, color, cap, core }: { at: V3; r: number; len: number; axis: 'x' | 'y' | 'z'; color: string; cap?: string; core?: string }) {
  const P = useProj()
  const end: V3 = axis === 'x' ? [at[0] + len, at[1], at[2]] : axis === 'y' ? [at[0], at[1] + len, at[2]] : [at[0], at[1], at[2] + len]
  const a = discPoints(at, r, axis).map((q) => P(...q))
  const b = discPoints(end, r, axis).map((q) => P(...q))
  const capPts = b
  const corePts = core ? discPoints(end, r * 0.28, axis).map((q) => P(...q)) : []
  return (
    <g>
      <polygon points={pts(hull([...a, ...b]))} fill={tone(color, axis === 'z' ? -0.14 : -0.2)} />
      <polygon points={pts(capPts)} fill={cap ?? tone(color, 0.12)} />
      {core && <polygon points={pts(corePts)} fill={core} />}
    </g>
  )
}

/** A flat label or sign drawn on a wall plane. */
export function WallText({ at, plane, text, size = 22, color = iso.cream, weight = 800 }: { at: V3; plane: 'L' | 'R'; text: string; size?: number; color?: string; weight?: number }) {
  const P = useProj()
  const [X, Y] = P(...at)
  // Skew text to lie on the wall: the left wall rises to the upper left, the right wall to the upper right.
  const m = plane === 'R' ? `matrix(0.866,0.5,0,1,${X},${Y})` : `matrix(0.866,-0.5,0,1,${X},${Y})`
  return (
    <text transform={m} fontFamily="'Be Vietnam Pro', sans-serif" fontWeight={weight} fontSize={size} fill={color} textAnchor="middle">
      {text}
    </text>
  )
}

/** Shaft of light from a hole in the roof down to the floor. */
export function LightShaft({ from, to, w = 60 }: { from: V3; to: V3; w?: number }) {
  const P = useProj()
  const id = useId()
  const a = P(from[0] - w / 2, from[1], from[2]), b = P(from[0] + w / 2, from[1], from[2])
  const c = P(to[0] + w, to[1] + w / 2, to[2]), d = P(to[0] - w, to[1] - w / 2, to[2])
  return (
    <g style={{ mixBlendMode: 'screen' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d6" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fff6d6" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <polygon points={pts([a, b, c, d])} fill={`url(#${id})`} />
    </g>
  )
}

/** Soft dark smudge on the floor or a wall (soot, a shadow, a stain). */
export function Smudge({ points, color = iso.soot, opacity = 0.5 }: { points: V3[]; color?: string; opacity?: number }) {
  const P = useProj()
  const id = useId()
  return (
    <g>
      <defs>
        <filter id={id}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <polygon points={pts(points.map((q) => P(...q)))} fill={color} opacity={opacity} filter={`url(#${id})`} />
    </g>
  )
}
