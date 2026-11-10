import { useId } from 'react'
import { accent, clothColors, hairColors, ink, shade, skinTones } from './palette'

// Flat, angular portraits built from a handful of polygons. Faces stay simple
// (a brow shadow, a nose plane, a mouth line) so every character reads by
// silhouette, hair, clothes and one prop.

export type HairStyle = 'short' | 'side-part' | 'long' | 'bun' | 'bald' | 'cap' | 'buzz'
export type Outfit = 'shirt' | 'polo' | 'tank' | 'uniform' | 'blouse'
export type Accessory = 'none' | 'glasses' | 'bandage' | 'gold-chain' | 'earrings' | 'pen'

export interface PortraitSpec {
  skin: 0 | 1 | 2 | 3
  hair: HairStyle
  hairColor: keyof typeof hairColors
  build: 'thin' | 'normal' | 'heavy'
  outfit: Outfit
  outfitColor: keyof typeof clothColors
  accessory?: Accessory[]
  age?: 'young' | 'mid' | 'old'
  /** Background tint behind the bust. */
  backdrop?: 'night' | 'amber' | 'teal' | 'rust'
}

const P = (pts: number[][]) => pts.map((p) => p.join(',')).join(' ')

const backdrops = {
  night: ink.steel,
  amber: shade(accent.amber, -0.45),
  teal: shade(accent.teal, -0.4),
  rust: shade(accent.rust, -0.4),
}

// Half-body portraits on a 240 x 320 canvas: the head is drawn in its own
// 200 x 240 space and placed with HEAD, the body is drawn around x = 120.
const HEAD = 'translate(28 14) scale(0.92)'
const CX = 120
const halfWidth = { thin: 72, normal: 88, heavy: 102 }

/**
 * `zoom` below 1 draws the figure smaller inside the same backdrop, anchored at
 * the bottom centre, which leaves headroom in small thumbnails.
 */
export function Portrait({ spec, size = 200, zoom = 1, className }: { spec: PortraitSpec; size?: number; zoom?: number; className?: string }) {
  const uid = useId()
  const clip = `${uid}-clip`, glow = `${uid}-glow`, dots = `${uid}-dots`, fade = `${uid}-fade`
  const skin = skinTones[spec.skin]
  const skinShadow = shade(skin, -0.22)
  const hair = hairColors[spec.hairColor]
  const cloth = clothColors[spec.outfitColor]
  const clothShadow = shade(cloth, -0.28)
  const acc = new Set(spec.accessory ?? [])
  const bg = backdrops[spec.backdrop ?? 'night']
  const W = halfWidth[spec.build]
  const bare = spec.outfit === 'tank'
  const sleeve = bare ? skin : cloth
  const sleeveShadow = bare ? skinShadow : clothShadow

  // Torso and arms, lit from the upper left.
  const torso = [[CX - 15, 152], [CX + 15, 152], [CX + W - 14, 176], [CX + W - 22, 320], [CX - W + 22, 320], [CX - W + 14, 176]]
  const armL = [[CX - W + 14, 176], [CX - W - 4, 192], [CX - W - 10, 320], [CX - W + 24, 320], [CX - W + 22, 214]]
  const armR = [[CX + W - 14, 176], [CX + W + 4, 192], [CX + W + 10, 320], [CX + W - 24, 320], [CX + W - 22, 214]]

  return (
    <svg viewBox="0 0 240 320" width={size} height={(size * 320) / 240} className={className} role="img">
      <defs>
        <clipPath id={clip}>
          <rect width="240" height="320" />
        </clipPath>
        <radialGradient id={glow} cx="0.3" cy="0.22" r="0.8">
          <stop offset="0" stopColor={accent.amber} stopOpacity="0.45" />
          <stop offset="1" stopColor={accent.amber} stopOpacity="0" />
        </radialGradient>
        <pattern id={dots} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill={ink.night} opacity="0.25" />
        </pattern>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.62" stopColor={ink.night} stopOpacity="0" />
          <stop offset="1" stopColor={ink.night} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="240" height="320" fill={bg} />
        <rect width="240" height="320" fill={`url(#${glow})`} />
        <rect width="240" height="320" fill={`url(#${dots})`} />
        <g transform={zoom === 1 ? undefined : `translate(${120 * (1 - zoom)} ${320 * (1 - zoom)}) scale(${zoom})`}>
        {/* Cast shadow on the wall behind */}
        <polygon points={P(torso.map(([x, y]) => [x + 16, y + 6]))} fill={ink.night} opacity="0.25" />

        {/* Long hair falls behind the shoulders */}
        {spec.hair === 'long' && (
          <g transform={HEAD}>
            <polygon points={P([[62, 70], [100, 32], [138, 70], [150, 200], [50, 200]])} fill={hair} />
          </g>
        )}
        <g transform={HEAD}>
          <polygon points={P([[88, 128], [112, 128], [115, 158], [85, 158]])} fill={skinShadow} />
          <polygon points={P([[100, 140], [112, 128], [115, 158], [100, 158]])} fill={shade(skin, -0.35)} />
        </g>

        {/* Body: lit and shadow planes, arms with a crease against the torso */}
        <polygon points={P(torso)} fill={cloth} />
        <polygon points={P([[CX + 2, 168], [CX + 15, 152], [CX + W - 14, 176], [CX + W - 22, 320], [CX + 6, 320]])} fill={clothShadow} />
        {spec.build === 'heavy' && <polygon points={P([[CX - 40, 250], [CX + 44, 250], [CX + 56, 300], [CX - 52, 300]])} fill={shade(cloth, -0.06)} opacity="0.7" />}
        <Outfit spec={spec} cloth={cloth} skin={skin} skinShadow={skinShadow} />
        <polygon points={P(armL)} fill={sleeve} />
        <polygon points={P(armR)} fill={sleeveShadow} />
        <line x1={CX - W + 22} y1="214" x2={CX - W + 24} y2="320" stroke={shade(sleeve, -0.4)} strokeWidth="2" />
        <line x1={CX + W - 22} y1="214" x2={CX + W - 24} y2="320" stroke={shade(sleeve, -0.5)} strokeWidth="2" />
        {!bare && spec.outfit !== 'blouse' && (
          <>
            <polygon points={P([[CX - W - 8, 262], [CX - W + 23, 262], [CX - W + 23, 270], [CX - W - 8, 270]])} fill={shade(cloth, -0.18)} />
            <polygon points={P([[CX + W + 8, 262], [CX + W - 23, 262], [CX + W - 23, 270], [CX + W + 8, 270]])} fill={shade(cloth, -0.42)} />
          </>
        )}
        {/* Rim light along the lit shoulder and arm */}
        <polygon points={P([[CX - 15, 152], [CX - W + 14, 176], [CX - W - 4, 192], [CX - W - 10, 320], [CX - W - 5, 320], [CX - W + 1, 194], [CX - W + 17, 180]])} fill={accent.amber} opacity="0.4" />

        <g transform={HEAD}>
          {/* Ears */}
          <polygon points={P([[66, 90], [59, 95], [61, 113], [68, 114]])} fill={skin} />
          <polygon points={P([[134, 90], [141, 95], [139, 113], [132, 114]])} fill={skinShadow} />
          {/* Head: lit left plane, shadowed right plane, angular jaw */}
          <polygon points={P([[70, 60], [100, 40], [130, 60], [134, 104], [122, 130], [100, 142], [78, 130], [66, 104]])} fill={skin} />
          <polygon points={P([[100, 40], [130, 60], [134, 104], [122, 130], [100, 142], [104, 96]])} fill={skinShadow} />
          <polygon points={P([[78, 130], [100, 142], [100, 136], [84, 126]])} fill={shade(skin, -0.12)} />
          <polygon points={P([[70, 60], [66, 104], [70, 106], [74, 63]])} fill={accent.amber} opacity="0.55" />
          <polygon points={P([[74, 104], [90, 108], [82, 120]])} fill={accent.rust} opacity="0.12" />
          <polygon points={P([[73, 82], [127, 82], [125, 97], [75, 97]])} fill={ink.night} opacity="0.12" />
          <polygon points={P([[78, 84], [94, 81], [95, 85], [79, 88]])} fill={shade(hair, -0.1)} />
          <polygon points={P([[106, 81], [122, 84], [121, 88], [105, 85]])} fill={shade(hair, -0.1)} />
          <polygon points={P([[80, 92], [88, 89], [95, 92], [88, 95]])} fill={ink.night} />
          <polygon points={P([[105, 92], [112, 89], [120, 92], [112, 95]])} fill={ink.night} />
          <circle cx="89.5" cy="91" r="1.2" fill={ink.bone} />
          <circle cx="113.5" cy="91" r="1.2" fill={ink.bone} />
          <polygon points={P([[100, 95], [108, 116], [99, 118]])} fill={shade(skin, -0.35)} />
          <polygon points={P([[91, 125], [100, 122], [109, 125], [100, 129]])} fill={shade(accent.rust, -0.15)} opacity="0.75" />
          {spec.age === 'old' && (
            <g stroke={shade(skin, -0.3)} strokeWidth="1.5">
              <line x1="80" y1="74" x2="96" y2="72" />
              <line x1="104" y1="72" x2="120" y2="74" />
              <line x1="84" y1="118" x2="88" y2="128" />
              <line x1="116" y1="118" x2="112" y2="128" />
            </g>
          )}

          <Hair style={spec.hair} color={hair} />

          {acc.has('glasses') && (
            <g fill="none" stroke={ink.night} strokeWidth="2.5">
              <rect x="74" y="86" width="22" height="12" />
              <rect x="104" y="86" width="22" height="12" />
              <line x1="96" y1="91" x2="104" y2="91" />
            </g>
          )}
          {acc.has('bandage') && <polygon points={P([[106, 62], [128, 70], [126, 79], [104, 71]])} fill={ink.bone} />}
          {acc.has('earrings') && (
            <g fill={accent.gold}>
              <circle cx="61" cy="116" r="3" />
              <circle cx="139" cy="116" r="3" />
            </g>
          )}
        </g>
        {acc.has('gold-chain') && (
          <polyline points={P([[CX - 15, 154], [CX - 7, 172], [CX, 176], [CX + 7, 172], [CX + 15, 154]])} fill="none" stroke={accent.gold} strokeWidth="3" />
        )}
        {acc.has('pen') && <rect x={CX + 26} y="206" width="4" height="20" fill={accent.red} />}
        </g>
        <rect width="240" height="320" fill={`url(#${fade})`} />
      </g>
    </svg>
  )
}

function Outfit({ spec, cloth, skin, skinShadow }: { spec: PortraitSpec; cloth: string; skin: string; skinShadow: string }) {
  const light = shade(cloth, 0.25)
  const seam = shade(cloth, -0.45)
  const collar = (
    <g>
      <polygon points={P([[CX - 15, 152], [CX, 178], [CX - 26, 172]])} fill={light} />
      <polygon points={P([[CX + 15, 152], [CX, 178], [CX + 26, 172]])} fill={shade(light, -0.15)} />
    </g>
  )
  switch (spec.outfit) {
    case 'shirt':
      return (
        <g>
          {collar}
          <line x1={CX} y1="178" x2={CX} y2="320" stroke={seam} strokeWidth="1.5" />
          {[200, 236, 272, 308].map((y) => (
            <circle key={y} cx={CX + 4} cy={y} r="2" fill={seam} />
          ))}
          <rect x={CX - 44} y="200" width="22" height="20" fill="none" stroke={seam} strokeWidth="1.5" />
        </g>
      )
    case 'polo':
      return (
        <g>
          <polygon points={P([[CX - 14, 152], [CX, 166], [CX - 22, 166]])} fill={light} />
          <polygon points={P([[CX + 14, 152], [CX, 166], [CX + 22, 166]])} fill={shade(light, -0.15)} />
          <rect x={CX - 3} y="166" width="7" height="30" fill={seam} />
          <circle cx={CX + 0.5} cy="176" r="2" fill={light} />
          <circle cx={CX + 0.5} cy="188" r="2" fill={light} />
        </g>
      )
    case 'tank':
      return (
        <g>
          <polygon points={P([[CX - 30, 156], [CX + 30, 156], [CX + 22, 206], [CX, 214], [CX - 22, 206]])} fill={skin} />
          <polygon points={P([[CX, 160], [CX + 30, 156], [CX + 22, 206], [CX, 214]])} fill={skinShadow} />
          <line x1={CX - 20} y1="190" x2={CX - 6} y2="196" stroke={skinShadow} strokeWidth="2" />
        </g>
      )
    case 'uniform':
      return (
        <g>
          {collar}
          <line x1={CX} y1="178" x2={CX} y2="320" stroke={seam} strokeWidth="1.5" />
          <rect x={CX - 70} y="170" width="34" height="8" fill={seam} />
          <rect x={CX + 36} y="170" width="34" height="8" fill={seam} />
          <rect x={CX + 18} y="204" width="28" height="24" fill="none" stroke={seam} strokeWidth="2" />
          <rect x={CX - 46} y="204" width="28" height="24" fill="none" stroke={seam} strokeWidth="2" />
          <rect x={CX - 44} y="196" width="24" height="6" fill={accent.gold} opacity="0.8" />
        </g>
      )
    case 'blouse':
      return (
        <g>
          <polygon points={P([[CX - 18, 152], [CX + 18, 152], [CX + 12, 174], [CX, 180], [CX - 12, 174]])} fill={skin} />
          <polyline points={P([[CX - 30, 166], [CX - 14, 184], [CX, 188], [CX + 14, 184], [CX + 30, 166]])} fill="none" stroke={light} strokeWidth="4" />
        </g>
      )
  }
}

function Hair({ style, color }: { style: HairStyle; color: string }) {
  const hi = shade(color, 0.22)
  switch (style) {
    case 'short':
      return (
        <g>
          <polygon points={P([[66, 82], [68, 54], [100, 34], [132, 54], [134, 82], [126, 64], [100, 52], [74, 64]])} fill={color} />
          <polygon points={P([[68, 54], [100, 34], [92, 50], [74, 62]])} fill={hi} />
        </g>
      )
    case 'side-part':
      return (
        <g>
          <polygon points={P([[66, 84], [66, 54], [96, 32], [134, 48], [136, 80], [128, 60], [84, 58], [74, 70]])} fill={color} />
          <polygon points={P([[66, 54], [96, 32], [86, 46]])} fill={hi} />
        </g>
      )
    case 'long':
      return (
        <g>
          <polygon points={P([[64, 92], [68, 54], [100, 34], [132, 54], [136, 92], [124, 62], [100, 54], [76, 62]])} fill={color} />
          <polygon points={P([[68, 54], [100, 34], [90, 50], [72, 64]])} fill={hi} />
        </g>
      )
    case 'bun':
      return (
        <g>
          <polygon points={P([[88, 34], [100, 18], [112, 34], [106, 42], [94, 42]])} fill={color} />
          <polygon points={P([[88, 34], [100, 18], [98, 32]])} fill={hi} />
          <polygon points={P([[66, 80], [70, 54], [100, 38], [130, 54], [134, 80], [124, 62], [100, 52], [76, 62]])} fill={color} />
        </g>
      )
    case 'bald':
      return (
        <g fill={color}>
          <polygon points={P([[66, 104], [68, 80], [74, 82], [72, 100]])} />
          <polygon points={P([[134, 104], [132, 80], [126, 82], [128, 100]])} />
        </g>
      )
    case 'buzz':
      return <polygon points={P([[68, 74], [72, 54], [100, 40], [128, 54], [132, 74], [124, 60], [100, 48], [76, 60]])} fill={color} opacity="0.85" />
    case 'cap':
      return (
        <g>
          <polygon points={P([[64, 68], [70, 42], [100, 30], [130, 42], [136, 68]])} fill={clothColors.navy} />
          <polygon points={P([[60, 66], [150, 66], [146, 75], [64, 75]])} fill={shade(clothColors.navy, -0.35)} />
        </g>
      )
  }
}
