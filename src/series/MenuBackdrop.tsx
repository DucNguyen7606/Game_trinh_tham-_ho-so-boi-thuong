import { useId } from 'react'
import { accent, ink, shade } from '@/art/palette'
import { Lamp, P, Rain, SceneFrame, rng } from '@/art/primitives'

/**
 * Main menu backdrop: Saigon at night seen past the edge of an investigator's
 * desk. Tube houses and a far tower on the skyline, tangled power lines,
 * rain, and a lamp-lit stack of case folders in the foreground.
 */
export default function MenuBackdrop() {
  const id = useId()
  const r = rng(41)

  // Far skyline: blocks of varying height, a few lit windows.
  const far: { x: number; w: number; h: number }[] = []
  for (let x = -20; x < 1640; ) {
    const w = 50 + r() * 90
    far.push({ x, w, h: 120 + r() * 200 })
    x += w + r() * 8
  }
  // Near row: narrow tube houses (nhà ống) with balconies.
  const near: { x: number; w: number; h: number; lit: number[] }[] = []
  for (let x = -10; x < 1640; ) {
    const w = 70 + r() * 50
    const floors = 3 + Math.floor(r() * 4)
    near.push({ x, w, h: floors * 62, lit: Array.from({ length: floors }, () => r()) })
    x += w + 2
  }

  return (
    <SceneFrame label="Sài Gòn về đêm, sau mép bàn làm việc của chuyên viên giám định">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#140d0b" />
          <stop offset="0.65" stopColor={ink.slate} />
          <stop offset="1" stopColor={shade(accent.rust, -0.55)} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="1" r="0.6">
          <stop offset="0" stopColor={accent.ember} stopOpacity="0.5" />
          <stop offset="1" stopColor={accent.ember} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill={ink.night} />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      {/* City glow on the low clouds, the colour of a far-off fire */}
      <rect y="250" width="1600" height="450" fill={`url(#${id}-glow)`} />

      {/* Far tower with a lit crown, the one landmark on the skyline */}
      <g fill={shade(ink.slate, -0.2)}>
        <polygon points={P([[1180, 470], [1212, 120], [1232, 120], [1262, 470]])} />
        <rect x="1214" y="80" width="16" height="44" />
      </g>
      <rect x="1216" y="132" width="12" height="4" fill={accent.amber} opacity="0.8" />

      {far.map((b, i) => (
        <rect key={i} x={b.x} y={560 - b.h} width={b.w} height={b.h + 40} fill={shade(ink.slate, -0.15)} />
      ))}
      {far.map((b, i) =>
        i % 3 === 0 ? <rect key={`w${i}`} x={b.x + b.w * 0.4} y={560 - b.h * 0.6} width="6" height="9" fill={accent.amber} opacity="0.5" /> : null,
      )}

      {/* Tube houses */}
      {near.map((h, i) => {
        const top = 690 - h.h
        const wall = i % 2 ? ink.steel : shade(ink.steel, -0.18)
        return (
          <g key={i}>
            <rect x={h.x} y={top} width={h.w} height={h.h + 20} fill={shade(wall, -0.35)} />
            {h.lit.map((v, f) => {
              const y = top + 14 + f * 62
              const on = v > 0.55
              return (
                <g key={f}>
                  <rect x={h.x + 12} y={y} width={h.w - 24} height="30" fill={on ? accent.amber : ink.night} opacity={on ? 0.75 : 0.8} />
                  {/* Balcony rail */}
                  <rect x={h.x + 6} y={y + 34} width={h.w - 12} height="4" fill={ink.night} />
                  {on && v > 0.85 && <rect x={h.x + 12} y={y} width={(h.w - 24) / 2} height="30" fill={accent.teal} opacity="0.55" />}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* Power lines sagging between poles */}
      <g stroke={ink.night} strokeWidth="2.5" fill="none" opacity="0.9">
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M -20 ${330 + k * 14} Q 420 ${400 + k * 18} 820 ${350 + k * 10} T 1640 ${380 + k * 16}`} />
        ))}
      </g>
      <rect x="806" y="300" width="12" height="420" fill={ink.night} />

      <Rain count={170} seed={11} opacity={0.3} />

      {/* Window frame of the office, blinds pulled halfway */}
      <g fill={ink.night}>
        <rect width="1600" height="40" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} y={40 + i * 26} width="1600" height="14" opacity="0.92" />
        ))}
        <rect y="40" width="70" height="900" />
        <rect x="1530" y="40" width="70" height="900" />
      </g>

      {/* Desk edge */}
      <polygon points={P([[0, 720], [1600, 700], [1600, 900], [0, 900]])} fill={shade(ink.dusk, -0.35)} />
      <polygon points={P([[0, 720], [1600, 700], [1600, 712], [0, 732]])} fill={ink.dusk} />

      {/* Lamp light pooled on the desk */}
      <line x1="1300" y1="40" x2="1300" y2="420" stroke={ink.night} strokeWidth="3" />
      <Lamp x={1300} y={440} reach={460} spread={720} />

      {/* Stack of case folders */}
      {[0, 1, 2].map((k) => {
        const y = 760 - k * 16
        const tone = [ink.paper, shade(ink.paper, -0.12), accent.gold][k]
        return (
          <g key={k} transform={`rotate(${[-3, 2, -1][k]} 1240 ${y})`}>
            <rect x="1060" y={y} width="360" height="20" fill={shade(tone, -0.3)} />
            <rect x="1060" y={y - 6} width="360" height="14" fill={tone} />
            <rect x="1090" y={y - 14} width="80" height="10" fill={tone} />
          </g>
        )
      })}
      {/* Red string trailing off the top folder */}
      <path d="M 1150 712 C 1080 760 980 740 900 800 S 760 870 700 900" stroke={accent.red} strokeWidth="3" fill="none" />
      {/* Coffee cup */}
      <ellipse cx="300" cy="800" rx="58" ry="14" fill={ink.night} opacity="0.5" />
      <path d="M 252 720 L 348 720 L 338 800 L 262 800 Z" fill={ink.bone} />
      <ellipse cx="300" cy="720" rx="48" ry="10" fill={shade(accent.rust, -0.5)} />
      <path d="M 346 735 q 34 4 22 32 q -8 14 -26 12" stroke={ink.bone} strokeWidth="9" fill="none" />

      {/* Halftone in the corners, like an old print */}
      <rect width="1600" height="900" fill={`url(#${id}-dots)`} opacity="0.18" />
    </SceneFrame>
  )
}
