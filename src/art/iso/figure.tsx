import { useId } from 'react'
import type { PortraitSpec } from '@/art/Portrait'
import { clothColors, hairColors, skinTones } from '@/art/palette'
import { Box, Face, iso, tone, type V3 } from './iso'

// People in the diorama style: small block figures built from a PortraitSpec,
// so every suspect keeps their colours, hair and accessories from the old portraits.

/** Which world axis the face points along. '-x' and '-y' turn the figure's back to the camera. */
type Facing = 'x' | 'y' | '-x' | '-y'

const widthOf = { thin: 22, normal: 26, heavy: 32 }

/**
 * Builds a figure in local units: a runs across the shoulders, b front to back
 * (the face is at the largest b), z up. `facing` turns local units into world axes.
 */
function useLocal(at: V3, facing: Facing, k: number) {
  // A point in local units.
  const W = (a: number, b: number, z: number): V3 => {
    const zz = at[2] + z * k
    if (facing === 'y') return [at[0] + a * k, at[1] + b * k, zz]
    if (facing === 'x') return [at[0] + b * k, at[1] + a * k, zz]
    if (facing === '-x') return [at[0] - b * k, at[1] + a * k, zz]
    return [at[0] + a * k, at[1] - b * k, zz]
  }
  // A box: its min corner and its size, since a mirrored axis flips which corner is smallest.
  const Bx = (a: number, b: number, z: number, wa: number, wb: number, h: number): [V3, V3] => {
    const zz = at[2] + z * k
    if (facing === 'y') return [[at[0] + a * k, at[1] + b * k, zz], [wa * k, wb * k, h * k]]
    if (facing === 'x') return [[at[0] + b * k, at[1] + a * k, zz], [wb * k, wa * k, h * k]]
    if (facing === '-x') return [[at[0] - (b + wb) * k, at[1] + a * k, zz], [wb * k, wa * k, h * k]]
    return [[at[0] + a * k, at[1] - (b + wb) * k, zz], [wa * k, wb * k, h * k]]
  }
  const S = (wa: number, wb: number, h: number): V3 => (facing === 'y' || facing === '-y' ? [wa * k, wb * k, h * k] : [wb * k, wa * k, h * k])
  return { W, S, Bx }
}

export function IsoFigure({
  at,
  spec,
  facing = 'y',
  size = 1,
  pose = 'stand',
  talking = false,
  cloth: clothOverride,
}: {
  at: V3
  spec: PortraitSpec
  /** Shirt colour, when it should not come from the spec's outfitColor. */
  cloth?: string
  facing?: Facing
  /** 1 = about 105 world units tall. */
  size?: number
  pose?: 'stand' | 'sit'
  talking?: boolean
}) {
  const { W, Bx } = useLocal(at, facing, size)
  // Seen from behind: no face, and the back of the hair is drawn last.
  const away = facing === '-x' || facing === '-y'
  const skin = skinTones[spec.skin]
  const hair = hairColors[spec.hairColor]
  const cloth = clothOverride ?? clothColors[spec.outfitColor]
  const acc = new Set(spec.accessory ?? [])
  const mood = spec.mood ?? 'neutral'
  const w = widthOf[spec.build]
  const leg = '#3b3650'
  const B = (a: number, b: number, z: number, wa: number, wb: number, h: number, color: string, top?: string) => {
    const [p, sz] = Bx(a, b, z, wa, wb, h)
    return <Box at={p} size={sz} color={color} top={top} />
  }
  // A quad on the face plane (b = front of the head): u across, v up.
  const head = { a: (w - 24) / 2, b: -2, z: 72, s: 24 }
  const fb = head.b + head.s + 0.4
  const F = (u0: number, u1: number, v0: number, v1: number, color: string, key?: string) => (
    <Face key={key} points={[W(head.a + u0, fb, head.z + v0), W(head.a + u1, fb, head.z + v0), W(head.a + u1, fb, head.z + v1), W(head.a + u0, fb, head.z + v1)]} fill={color} />
  )
  const browTilt = { neutral: 0, smile: -0.6, stern: 1.6, worried: -2, angry: 2.4 }[mood]
  const brow = (u: number, inner: number) => (
    <Face
      points={[W(head.a + u, fb, head.z + 15.5), W(head.a + inner, fb, head.z + 15.5 - browTilt), W(head.a + inner, fb, head.z + 17 - browTilt), W(head.a + u, fb, head.z + 17)]}
      fill={tone(hair, -0.3)}
    />
  )
  const dark = iso.ink
  const mouthShut = {
    neutral: F(9, 15, 6, 7.2, dark),
    smile: <g>{F(8, 16, 6, 7.2, dark)}{F(7, 8.4, 7, 8.6, dark)}{F(15.6, 17, 7, 8.6, dark)}</g>,
    stern: F(9, 15, 6.4, 7.4, dark),
    worried: <g>{F(9, 12, 6.6, 7.6, dark)}{F(12, 15, 6, 7, dark)}</g>,
    angry: <g>{F(8.6, 15.4, 6.8, 8, dark)}{F(7.6, 9, 5.6, 7, dark)}{F(15, 16.4, 5.6, 7, dark)}</g>,
  }[mood]

  return (
    <g className={talking ? 'iso-talking' : undefined}>
      {/* left arm, behind the body */}
      {B(-7, 3, pose === 'sit' ? 38 : 40, 7, 11, 28, tone(cloth, -0.05))}
      {pose === 'stand' ? (
        <>
          {B(2, 3, 0, 10, 12, 34, leg)}
          {B(w - 12, 3, 0, 10, 12, 34, leg)}
        </>
      ) : (
        <>
          {B(2, 3, 24, 10, 26, 10, leg)}
          {B(w - 12, 3, 24, 10, 26, 10, leg)}
          {B(2, 22, 0, 10, 8, 26, leg)}
          {B(w - 12, 22, 0, 10, 8, 26, leg)}
        </>
      )}
      {B(0, 0, 34, w, 18, 36, cloth)}
      {acc.has('tie') && <Face points={[W(w / 2 - 2, 18.4, 44), W(w / 2 + 2, 18.4, 44), W(w / 2 + 2, 18.4, 68), W(w / 2 - 2, 18.4, 68)]} fill={iso.coral} />}
      {acc.has('gold-chain') && <Face points={[W(w / 2 - 7, 18.4, 62), W(w / 2 + 7, 18.4, 62), W(w / 2 + 7, 18.4, 64), W(w / 2 - 7, 18.4, 64)]} fill={iso.gold} />}
      {acc.has('lanyard') && (
        <>
          <Face points={[W(w / 2 - 6, 18.4, 68), W(w / 2 - 4, 18.4, 68), W(w / 2 - 1, 18.4, 50), W(w / 2 - 3, 18.4, 50)]} fill={iso.blue} />
          <Face points={[W(w / 2 - 6, 18.4, 42), W(w / 2 + 2, 18.4, 42), W(w / 2 + 2, 18.4, 51), W(w / 2 - 6, 18.4, 51)]} fill={iso.cream} />
        </>
      )}
      {acc.has('pen') && <Face points={[W(w - 7, 18.4, 56), W(w - 5.5, 18.4, 56), W(w - 5.5, 18.4, 65), W(w - 7, 18.4, 65)]} fill={iso.coral} />}
      {spec.outfit === 'uniform' && <Face points={[W(3, 18.4, 56), W(9, 18.4, 56), W(9, 18.4, 61), W(3, 18.4, 61)]} fill={tone(cloth, -0.25)} />}
      {/* right arm: resting, or raised in a gesture while talking (the two swap via CSS) */}
      <g className="iso-arm-down">
        {B(w, 3, pose === 'sit' ? 38 : 40, 7, 11, 28, tone(cloth, -0.05))}
        {B(w, 3, pose === 'sit' ? 32 : 34, 7, 11, 6, skin)}
      </g>
      <g className="iso-arm-up">
        {B(w, 3, 52, 7, 11, 18, tone(cloth, -0.05))}
        {B(w, 10, 56, 7, 16, 9, tone(cloth, -0.05))}
        {B(w - 0.5, 24, 58, 8, 6, 14, skin)}
      </g>
      {/* neck + head */}
      {B(w / 2 - 5, 5, 70, 10, 10, 4, tone(skin, -0.1))}
      {spec.hair === 'long' && B(head.a - 1.5, head.b - 1.5, head.z - 14, head.s + 3, 9, head.s + 16, hair)}
      {B(head.a, head.b, head.z, head.s, head.s, head.s, skin)}
      {spec.hair !== 'bald' && (
        <>
          {/* back and top of the hair */}
          {B(head.a - 1, head.b - 1, head.z + (spec.hair === 'buzz' ? 18 : 12), head.s + 2, 10, spec.hair === 'buzz' ? 8 : 14, hair)}
          {B(head.a - 1, head.b - 1, head.z + head.s - (spec.hair === 'buzz' ? 2 : 3), head.s + 2, head.s + 2, spec.hair === 'buzz' ? 3 : 6, hair, tone(hair, 0.12))}
          {spec.hair === 'side-part' && B(head.a - 1, head.b + head.s - 6, head.z + 18, 12, 7, 6, hair, tone(hair, 0.12))}
          {spec.hair === 'short' && B(head.a + 4, head.b + head.s - 5, head.z + 19, head.s - 6, 6, 5, hair, tone(hair, 0.12))}
          {spec.hair === 'long' && B(head.a - 1, head.b + head.s - 6, head.z + 16, head.s + 2, 7, 8, hair, tone(hair, 0.12))}
          {spec.hair === 'bun' && B(head.a + 7, head.b + 4, head.z + head.s + 3, 10, 10, 9, hair, tone(hair, 0.12))}
          {spec.hair === 'cap' && (
            <>
              {B(head.a - 1.5, head.b - 1.5, head.z + head.s - 4, head.s + 3, head.s + 3, 8, iso.blue)}
              {B(head.a, head.b + head.s, head.z + head.s - 4, head.s, 9, 2.5, tone(iso.blue, -0.1))}
            </>
          )}
        </>
      )}
      {acc.has('fedora') && (
        <>
          {B(head.a - 6, head.b - 6, head.z + head.s, head.s + 12, head.s + 12, 2.5, '#5b4a3f')}
          {B(head.a + 1, head.b + 1, head.z + head.s + 2.5, head.s - 2, head.s - 2, 9, '#5b4a3f')}
        </>
      )}
      {away && spec.hair !== 'bald' && B(head.a - 1, head.b - 1, head.z + 4, head.s + 2, 8, head.s, hair)}
      {!away && (
        <>
      <g className="iso-brows">
        {brow(4, 10)}
        {brow(20, 14)}
      </g>
      {F(6, 9, 10, 13.4, dark)}
      {F(15, 18, 10, 13.4, dark)}
      {F(11.2, 12.8, 7.8, 11, tone(skin, -0.18))}
      <g className="iso-mouth-shut">{mouthShut}</g>
      <g className="iso-mouth-open">{F(9.5, 14.5, 4.6, 8, '#7a2f35')}</g>
      {spec.age === 'old' && (
        <>
          {F(4, 8, 8.4, 9, tone(skin, -0.22))}
          {F(16, 20, 8.4, 9, tone(skin, -0.22))}
        </>
      )}
      {acc.has('glasses') && (
        <>
          {F(4.6, 10.4, 9, 9.8, dark)}
          {F(13.6, 19.4, 9, 9.8, dark)}
          {F(4.6, 10.4, 14, 14.8, dark)}
          {F(13.6, 19.4, 14, 14.8, dark)}
          {F(10.4, 13.6, 13, 13.8, dark)}
        </>
      )}
      {acc.has('bandage') && F(15, 22, 17, 21, iso.cream)}
        </>
      )}
      {acc.has('earrings') && B(head.a - 1.6, head.b + 12, head.z + 4, 1.6, 2, 2.4, iso.gold)}
    </g>
  )
}

const backdrops = {
  night: ['#b8c3dd', '#dcd6ee'],
  amber: ['#f3c99a', '#fae3cf'],
  teal: ['#9fcfc6', '#d8eee9'],
  rust: ['#efb3a0', '#fadcd1'],
} as const

/**
 * The same block figure seen straight on, for portrait cards: front faces drawn
 * flat, with a sliver of top and right side so it still reads as blocks.
 * Local units as in IsoFigure (x across, y depth going back, z up).
 */
export function FrontBust({
  spec,
  talking = false,
  k = 4.1,
  at,
  colors,
}: {
  spec: PortraitSpec
  talking?: boolean
  /** Pixels per local unit. */
  k?: number
  /** Screen point of the centre of the face; defaults to the portrait card layout. */
  at?: [number, number]
  /** Raw colours, for people who are not in the case's cast (guests in a photo). */
  colors?: { skin?: string; hair?: string; cloth?: string }
}) {
  const w = widthOf[spec.build]
  const DX = 0.32, DY = 0.24
  const cx = (at ? at[0] : 120) - (w / 2) * k
  const cy = at ? at[1] + 84 * k : 40 + 104 * k
  const S = (x: number, y: number, z: number) => `${(cx + x * k + y * k * DX).toFixed(1)},${(cy - z * k - y * k * DY).toFixed(1)}`
  const box = (x: number, y: number, z: number, bw: number, d: number, h: number, color: string, top?: string, key?: string) => (
    <g key={key}>
      <polygon points={[S(x + bw, y, z), S(x + bw, y + d, z), S(x + bw, y + d, z + h), S(x + bw, y, z + h)].join(' ')} fill={tone(color, -0.28)} />
      <polygon points={[S(x, y, z + h), S(x + bw, y, z + h), S(x + bw, y + d, z + h), S(x, y + d, z + h)].join(' ')} fill={top ?? tone(color, 0.14)} />
      <polygon points={[S(x, y, z), S(x + bw, y, z), S(x + bw, y, z + h), S(x, y, z + h)].join(' ')} fill={color} />
    </g>
  )
  const skin = colors?.skin ?? skinTones[spec.skin]
  const hair = colors?.hair ?? hairColors[spec.hairColor]
  const cloth = colors?.cloth ?? clothColors[spec.outfitColor]
  const acc = new Set(spec.accessory ?? [])
  const mood = spec.mood ?? 'neutral'
  const dark = iso.ink
  const hd = { a: (w - 24) / 2, y: -1, z: 72, s: 24 }
  // A rectangle on the front of the head: u across from its left edge, v up from its bottom.
  const F = (u0: number, u1: number, v0: number, v1: number, color: string, key?: string) => (
    <polygon key={key} points={[S(hd.a + u0, hd.y, hd.z + v0), S(hd.a + u1, hd.y, hd.z + v0), S(hd.a + u1, hd.y, hd.z + v1), S(hd.a + u0, hd.y, hd.z + v1)].join(' ')} fill={color} />
  )
  const tilt = { neutral: 0, smile: -0.6, stern: 1.4, worried: -1.8, angry: 2.2 }[mood]
  const brow = (outer: number, inner: number) => (
    <polygon points={[S(hd.a + outer, hd.y, hd.z + 15.6), S(hd.a + inner, hd.y, hd.z + 15.6 - tilt), S(hd.a + inner, hd.y, hd.z + 17.2 - tilt), S(hd.a + outer, hd.y, hd.z + 17.2)].join(' ')} fill={tone(hair, -0.3)} />
  )
  const mouth = {
    neutral: F(9, 15, 6, 7.2, dark),
    smile: <g>{F(8.5, 15.5, 6, 7.2, dark)}{F(7.4, 8.6, 7, 8.4, dark)}{F(15.4, 16.6, 7, 8.4, dark)}</g>,
    stern: F(9, 15, 6.4, 7.4, dark),
    worried: <g>{F(9, 12, 6.6, 7.6, dark)}{F(12, 15, 6, 7, dark)}</g>,
    angry: <g>{F(8.6, 15.4, 6.6, 7.8, dark)}{F(7.6, 9, 5.6, 6.8, dark)}{F(15, 16.4, 5.6, 6.8, dark)}</g>,
  }[mood]
  const fringe: Partial<Record<PortraitSpec['hair'], JSX.Element>> = {
    short: <g>{F(-1, 25, 19, 24, hair)}{F(-1, 3, 13, 19, hair)}{F(21, 25, 13, 19, hair)}</g>,
    'side-part': <g>{F(-1, 25, 20, 24, hair)}{F(-1, 9, 17, 20, hair)}{F(-1, 3, 12, 17, hair)}{F(21, 25, 13, 20, hair)}</g>,
    long: <g>{F(-1, 25, 19, 24, hair)}{F(-1, 4, 0, 19, hair)}{F(20, 25, 0, 19, hair)}</g>,
    bun: <g>{F(-1, 25, 20, 24, hair)}{F(-1, 3, 14, 20, hair)}{F(21, 25, 14, 20, hair)}</g>,
    buzz: F(0, 24, 21, 24, hair),
  }
  return (
    <g>
      {spec.hair === 'long' && box(hd.a - 2, hd.y + 6, hd.z - 16, hd.s + 4, 14, hd.s + 16, tone(hair, -0.1))}
      {box(-7, 4, 40, 7, 11, 30, tone(cloth, -0.08))}
      {box(0, 2, 34, w, 18, 38, cloth)}
      {box(w, 4, 40, 7, 11, 30, tone(cloth, -0.08))}
      {/* collar */}
      <polygon points={[S(w / 2 - 6, 2, 72), S(w / 2, 2, 66), S(w / 2 + 6, 2, 72)].join(' ')} fill={spec.outfit === 'tank' ? skin : iso.cream} />
      {acc.has('tie') && <polygon points={[S(w / 2 - 1.6, 2, 66), S(w / 2 + 1.6, 2, 66), S(w / 2 + 2.2, 2, 46), S(w / 2, 2, 43), S(w / 2 - 2.2, 2, 46)].join(' ')} fill={iso.coral} />}
      {acc.has('gold-chain') && <polygon points={[S(w / 2 - 7, 2, 70), S(w / 2, 2, 63), S(w / 2 + 7, 2, 70), S(w / 2 + 7, 2, 68.6), S(w / 2, 2, 61.6), S(w / 2 - 7, 2, 68.6)].join(' ')} fill={iso.gold} />}
      {acc.has('lanyard') && <g><polygon points={[S(w / 2 - 6, 2, 71), S(w / 2 - 4.6, 2, 71), S(w / 2 - 1, 2, 54), S(w / 2 - 2.4, 2, 54)].join(' ')} fill={iso.blue} />{box(w / 2 - 6, 1.6, 45, 8, 0.4, 9, iso.cream)}</g>}
      {acc.has('pen') && box(w - 6, 1.6, 56, 1.6, 0.4, 9, iso.coral)}
      {spec.outfit === 'uniform' && box(3, 1.6, 56, 6, 0.4, 5, tone(cloth, -0.25))}
      {(spec.outfit === 'suit' || spec.outfit === 'trench' || spec.outfit === 'jacket') && (
        <g>
          <polygon points={[S(0, 2, 72), S(w / 2 - 6, 2, 72), S(w / 2 - 2, 2, 50), S(0, 2, 50)].join(' ')} fill={tone(cloth, -0.12)} />
          <polygon points={[S(w, 2, 72), S(w / 2 + 6, 2, 72), S(w / 2 + 2, 2, 50), S(w, 2, 50)].join(' ')} fill={tone(cloth, -0.12)} />
        </g>
      )}
      {box(w / 2 - 5, 6, 70, 10, 10, 3, tone(skin, -0.12))}
      {spec.hair !== 'bald' && box(hd.a - 1, hd.y + 4, hd.z + 8, hd.s + 2, 20, hd.s - 6, hair)}
      {box(hd.a, hd.y, hd.z, hd.s, 22, hd.s, skin)}
      {spec.hair !== 'bald' && box(hd.a - 1, hd.y - 0.5, hd.z + hd.s - (spec.hair === 'buzz' ? 2 : 4), hd.s + 2, 23, spec.hair === 'buzz' ? 3 : 6, hair)}
      {spec.hair === 'bun' && box(hd.a + 7, hd.y + 6, hd.z + hd.s + 2, 10, 10, 8, hair)}
      {spec.hair === 'cap' && (
        <g>
          {box(hd.a - 1.5, hd.y - 0.5, hd.z + hd.s - 5, hd.s + 3, 23, 8, iso.blue)}
          {box(hd.a - 1, hd.y - 6, hd.z + hd.s - 5, hd.s + 2, 6, 2.4, tone(iso.blue, -0.12))}
        </g>
      )}
      {acc.has('fedora') && (
        <g>
          {box(hd.a + 1, hd.y + 1, hd.z + hd.s + 1, hd.s - 2, 20, 9, '#5b4a3f')}
          {box(hd.a - 6, hd.y - 4, hd.z + hd.s, hd.s + 12, 28, 2.4, tone('#5b4a3f', -0.1))}
        </g>
      )}
      {fringe[spec.hair]}
      {/* ears */}
      {box(hd.a - 2, hd.y + 8, hd.z + 9, 2, 5, 6, tone(skin, -0.08))}
      {acc.has('earrings') && box(hd.a - 2, hd.y + 9, hd.z + 6.6, 2, 2, 2.4, iso.gold)}
      {brow(4.5, 10.5)}
      {brow(19.5, 13.5)}
      <g className="iso-blink">
        {F(6.4, 9.4, 10, 13.4, dark)}
        {F(14.6, 17.6, 10, 13.4, dark)}
        {F(7.6, 8.6, 12.2, 13.2, '#ffffff')}
        {F(15.8, 16.8, 12.2, 13.2, '#ffffff')}
      </g>
      {F(11, 13, 8, 10.6, tone(skin, -0.16))}
      {F(3.4, 6.4, 7.6, 9.4, '#f2a39a', 'cheekL')}
      {F(17.6, 20.6, 7.6, 9.4, '#f2a39a', 'cheekR')}
      <g className={talking ? 'iso-talking' : undefined}>
        <g className="iso-mouth-shut">{mouth}</g>
        <g className="iso-mouth-open">{F(9.6, 14.4, 4.4, 8, '#7a2f35')}</g>
      </g>
      {spec.age === 'old' && (
        <g>
          {F(5, 9, 8.6, 9.2, tone(skin, -0.22))}
          {F(15, 19, 8.6, 9.2, tone(skin, -0.22))}
          {F(8, 16, 19, 19.6, tone(skin, -0.16))}
        </g>
      )}
      {acc.has('glasses') && (
        <g fill="none">
          {F(4.8, 10.8, 9, 9.8, dark)}
          {F(13.2, 19.2, 9, 9.8, dark)}
          {F(4.8, 10.8, 14, 14.8, dark)}
          {F(13.2, 19.2, 14, 14.8, dark)}
          {F(4.8, 5.6, 9, 14.8, dark)}
          {F(10, 10.8, 9, 14.8, dark)}
          {F(13.2, 14, 9, 14.8, dark)}
          {F(18.4, 19.2, 9, 14.8, dark)}
          {F(10.8, 13.2, 13, 13.8, dark)}
        </g>
      )}
      {acc.has('bandage') && <g>{F(15, 22, 17, 21, iso.cream)}{F(18, 19, 17, 21, '#e3d7c4')}</g>}
    </g>
  )
}

/**
 * Bust portrait card in the diorama style: the block figure seen straight on,
 * in front of a pastel backdrop. Same box as the old
 * Portrait (240 x 320) so it drops into every layout.
 */
export function IsoPortrait({
  spec,
  size = 200,
  className,
  live = false,
  talking = false,
  bare = false,
}: {
  spec: PortraitSpec
  size?: number
  className?: string
  live?: boolean
  talking?: boolean
  bare?: boolean
}) {
  const id = useId()
  const [c0, c1] = backdrops[spec.backdrop ?? 'night']
  return (
    <svg
      viewBox="0 0 240 320"
      width={size}
      height={(size * 320) / 240}
      className={[className, live && 'iso-breathe'].filter(Boolean).join(' ')}
      role="img"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c0} />
          <stop offset="1" stopColor={c1} />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor={iso.ink} floodOpacity="0.25" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <rect width="240" height="320" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {!bare && (
          <>
            <rect width="240" height="320" fill={`url(#${id}-bg)`} />
            <circle cx="190" cy="70" r="70" fill="#ffffff" opacity="0.25" />
            <ellipse cx="120" cy="318" rx="130" ry="40" fill="#ffffff" opacity="0.35" />
          </>
        )}
        <g filter={`url(#${id}-sh)`}>
          <FrontBust spec={spec} talking={talking} />
        </g>
      </g>
    </svg>
  )
}
