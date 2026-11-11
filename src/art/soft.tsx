import { useId } from 'react'
import { accent, ink } from './palette'

// Shared pieces for scene backdrops in the soft flat style: a frame with a warm
// grade and vignette, pools of lamp light, beams and hanging bulbs.

export const LINE = ink.night
export const O = { stroke: LINE, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

/** Shared frame: soft colour grade and vignette. */
export function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.48" r="0.78">
          <stop offset="0.6" stopColor={ink.night} stopOpacity="0" />
          <stop offset="1" stopColor={ink.night} stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {children}
      <rect width="1600" height="900" fill={accent.amber} opacity="0.06" style={{ mixBlendMode: 'overlay' }} />
      <rect width="1600" height="900" fill={`url(#${id}-vig)`} />
    </svg>
  )
}

export function Glow({ x, y, r, o = 0.5, color = accent.amber }: { x: number; y: number; r: number; o?: number; color?: string }) {
  const id = useId()
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={color} stopOpacity={o} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  )
}

export function Beam({ x, y, w, h, o = 0.28 }: { x: number; y: number; w: number; h: number; o?: number }) {
  const id = useId()
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd98f" stopOpacity={o} />
          <stop offset="1" stopColor="#ffd98f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${x - 10},${y} L${x + 10},${y} L${x + w / 2},${y + h} Q${x},${y + h + 20} ${x - w / 2},${y + h} Z`} fill={`url(#${id})`} />
    </g>
  )
}

export function Bulb({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x},${y - 120} V${y - 14}`} stroke={LINE} strokeWidth="3" />
      <path d={`M${x - 28},${y} Q${x},${y - 30} ${x + 28},${y} Z`} fill={ink.night} {...O} />
      <circle cx={x} cy={y + 6} r="9" fill="#fff1c9" />
    </g>
  )
}

