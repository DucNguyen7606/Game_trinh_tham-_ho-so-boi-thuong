import { useId } from 'react'
import { accent, ink } from './palette'

// Building blocks for scene backdrops. Every scene uses a 1600 x 900 canvas,
// so hotspot positions in the case JSON (percent) map to x * 16, y * 9.

export const P = (pts: number[][]) => pts.map((p) => p.join(',')).join(' ')

/** Deterministic pseudo-random numbers, so a scene draws the same every time. */
export function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function SceneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor={ink.night} stopOpacity="0" />
          <stop offset="1" stopColor={ink.night} stopOpacity="0.75" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0.35 0" />
        </filter>
      </defs>
      {children}
      {/* Warm grade, film grain and vignette shared by every scene */}
      <rect width="1600" height="900" fill={accent.amber} opacity="0.08" style={{ mixBlendMode: 'overlay' }} />
      <rect width="1600" height="900" filter={`url(#${id}-grain)`} opacity="0.5" />
      <rect width="1600" height="900" fill={`url(#${id}-vig)`} />
    </svg>
  )
}

/** A hanging or wall lamp: bulb, shade and its glow. */
export function Lamp({ x, y, reach = 420, spread = 520 }: { x: number; y: number; reach?: number; spread?: number }) {
  const id = useId()
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={accent.amber} stopOpacity="0.55" />
          <stop offset="1" stopColor={accent.amber} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={spread * 0.45} fill={`url(#${id})`} />
      <LightCone x={x} y={y} w={spread} h={reach} color={accent.amber} strength={0.4} />
      <polygon points={P([[x - 26, y], [x + 26, y], [x + 12, y - 22], [x - 12, y - 22]])} fill={ink.night} />
      <circle cx={x} cy={y + 4} r="8" fill={ink.bone} />
    </g>
  )
}

export function Rain({ count = 140, seed = 7, opacity = 0.35 }: { count?: number; seed?: number; opacity?: number }) {
  const r = rng(seed)
  const drops = Array.from({ length: count }, () => ({ x: r() * 1700 - 50, y: r() * 900, l: 20 + r() * 40 }))
  return (
    <g stroke={ink.fog} strokeWidth="1.5" opacity={opacity}>
      {drops.map((d, i) => (
        <line key={i} x1={d.x} y1={d.y} x2={d.x - d.l * 0.25} y2={d.y + d.l} />
      ))}
    </g>
  )
}

/** A cone of light from (x, y) spreading down to width w at depth h. */
export function LightCone({ x, y, w, h, color, strength = 0.35 }: { x: number; y: number; w: number; h: number; color: string; strength?: number }) {
  const id = useId()
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={strength} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={P([[x - 8, y], [x + 8, y], [x + w / 2, y + h], [x - w / 2, y + h]])} fill={`url(#${id})`} />
    </g>
  )
}

/** Corrugated metal sheet (tôn): a filled rectangle with vertical ribs. */
export function Corrugated({ x, y, w, h, fill, rib }: { x: number; y: number; w: number; h: number; fill: string; rib: string }) {
  const ribs = Math.floor(w / 18)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      {Array.from({ length: ribs }, (_, i) => (
        <line key={i} x1={x + 9 + i * 18} y1={y} x2={x + 9 + i * 18} y2={y + h} stroke={rib} strokeWidth="3" />
      ))}
    </g>
  )
}

/** Soot or scorch: overlapping dark polygons rising from a base point. */
export function Scorch({ x, y, w, h, seed = 3 }: { x: number; y: number; w: number; h: number; seed?: number }) {
  const r = rng(seed)
  const layers = [0.85, 0.6, 0.35]
  return (
    <g>
      {layers.map((o, i) => {
        const s = 1 - i * 0.22
        const jitter = () => (r() - 0.5) * w * 0.12
        return (
          <polygon
            key={i}
            points={P([
              [x - (w / 2) * s * 0.25, y],
              [x + (w / 2) * s * 0.25, y],
              [x + (w / 2) * s + jitter(), y - h * s],
              [x + jitter(), y - h * s * 0.85],
              [x - (w / 2) * s + jitter(), y - h * s],
            ])}
            fill={ink.night}
            opacity={o}
          />
        )
      })}
    </g>
  )
}

export function Puddle({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  return <ellipse cx={x} cy={y} rx={w / 2} ry={w / 14} fill={color} opacity="0.35" />
}
