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

const shoulders = {
  thin: [[52, 240], [60, 180], [86, 162], [114, 162], [140, 180], [148, 240]],
  normal: [[38, 240], [46, 178], [84, 160], [116, 160], [154, 178], [162, 240]],
  heavy: [[22, 240], [32, 174], [80, 157], [120, 157], [168, 174], [178, 240]],
}

const backdrops = {
  night: ink.slate,
  amber: shade(accent.amber, -0.55),
  teal: shade(accent.teal, -0.45),
  rust: shade(accent.rust, -0.5),
}

export function Portrait({ spec, size = 200, className }: { spec: PortraitSpec; size?: number; className?: string }) {
  const clip = useId()
  const skin = skinTones[spec.skin]
  const skinShadow = shade(skin, -0.22)
  const hair = hairColors[spec.hairColor]
  const cloth = clothColors[spec.outfitColor]
  const clothShadow = shade(cloth, -0.25)
  const acc = new Set(spec.accessory ?? [])
  const bg = backdrops[spec.backdrop ?? 'night']
  const sh = shoulders[spec.build]

  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img">
      <defs>
        <clipPath id={clip}>
          <rect width="200" height="240" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {/* Backdrop with one diagonal light band */}
        <rect width="200" height="240" fill={bg} />
        <polygon points={P([[120, 0], [200, 0], [200, 90], [60, 240], [0, 240], [0, 200]])} fill={shade(bg, 0.06)} />

        {/* Long hair sits behind the head */}
        {spec.hair === 'long' && <polygon points={P([[62, 70], [100, 32], [138, 70], [146, 176], [54, 176]])} fill={hair} />}

        {/* Body */}
        <polygon points={P(sh)} fill={cloth} />
        <polygon points={P([[100, 160], ...sh.slice(3)])} fill={clothShadow} />
        <Outfit spec={spec} cloth={cloth} skin={skin} skinShadow={skinShadow} />

        {/* Neck */}
        <polygon points={P([[88, 132], [112, 132], [114, 164], [86, 164]])} fill={skinShadow} />

        {/* Head: lit left plane, shadowed right plane */}
        <polygon points={P([[70, 60], [100, 40], [130, 60], [134, 104], [118, 134], [100, 142], [82, 134], [66, 104]])} fill={skin} />
        <polygon points={P([[100, 40], [130, 60], [134, 104], [118, 134], [100, 142], [104, 96]])} fill={skinShadow} />
        {/* Brow shadow, nose plane, mouth */}
        <polygon points={P([[73, 84], [127, 84], [125, 95], [75, 95]])} fill={ink.night} opacity="0.35" />
        <polygon points={P([[100, 95], [108, 116], [99, 118]])} fill={shade(skin, -0.35)} />
        <line x1="92" y1="126" x2="108" y2="126" stroke={shade(skin, -0.5)} strokeWidth="2" />
        {spec.age === 'old' && (
          <g stroke={shade(skin, -0.3)} strokeWidth="1.5">
            <line x1="80" y1="74" x2="96" y2="72" />
            <line x1="104" y1="72" x2="120" y2="74" />
            <line x1="84" y1="118" x2="88" y2="128" />
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
            <circle cx="66" cy="110" r="3" />
            <circle cx="134" cy="110" r="3" />
          </g>
        )}
        {acc.has('gold-chain') && (
          <polyline points={P([[84, 162], [92, 176], [100, 180], [108, 176], [116, 162]])} fill="none" stroke={accent.gold} strokeWidth="3" />
        )}
        {acc.has('pen') && <rect x="122" y="190" width="4" height="18" fill={accent.red} />}
      </g>
    </svg>
  )
}

function Outfit({ spec, cloth, skin, skinShadow }: { spec: PortraitSpec; cloth: string; skin: string; skinShadow: string }) {
  const light = shade(cloth, 0.25)
  switch (spec.outfit) {
    case 'shirt':
      return (
        <g>
          <polygon points={P([[86, 160], [100, 182], [76, 174]])} fill={light} />
          <polygon points={P([[114, 160], [100, 182], [124, 174]])} fill={light} />
          <line x1="100" y1="182" x2="100" y2="240" stroke={shade(cloth, -0.4)} strokeWidth="1.5" />
        </g>
      )
    case 'polo':
      return (
        <g>
          <polygon points={P([[88, 160], [100, 172], [82, 170]])} fill={light} />
          <polygon points={P([[112, 160], [100, 172], [118, 170]])} fill={light} />
          <rect x="97" y="172" width="6" height="22" fill={shade(cloth, -0.3)} />
        </g>
      )
    case 'tank':
      return (
        <g>
          <polygon points={P([[78, 160], [122, 160], [114, 200], [100, 206], [86, 200]])} fill={skin} />
          <polygon points={P([[100, 160], [122, 160], [114, 200], [100, 206]])} fill={skinShadow} />
        </g>
      )
    case 'uniform':
      return (
        <g>
          <polygon points={P([[86, 160], [100, 182], [76, 174]])} fill={light} />
          <polygon points={P([[114, 160], [100, 182], [124, 174]])} fill={light} />
          <rect x="44" y="178" width="30" height="7" fill={shade(cloth, -0.4)} />
          <rect x="126" y="178" width="30" height="7" fill={shade(cloth, -0.4)} />
          <rect x="112" y="196" width="22" height="18" fill="none" stroke={shade(cloth, -0.4)} strokeWidth="2" />
        </g>
      )
    case 'blouse':
      return <polygon points={P([[84, 160], [116, 160], [108, 180], [100, 184], [92, 180]])} fill={skin} />
  }
}

function Hair({ style, color }: { style: HairStyle; color: string }) {
  const hi = shade(color, 0.15)
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
      return <polygon points={P([[64, 92], [68, 54], [100, 34], [132, 54], [136, 92], [124, 62], [100, 54], [76, 62]])} fill={color} />
    case 'bun':
      return (
        <g>
          <polygon points={P([[88, 34], [100, 18], [112, 34], [106, 42], [94, 42]])} fill={color} />
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
