import { useId } from 'react'
import type { PortraitSpec } from '@/art/Portrait'
import { clothColors, hairColors, skinTones } from '@/art/palette'
import { Box, Face, IsoGroup, iso, tone, type V3 } from './iso'

// People in the diorama style: small block figures built from a PortraitSpec,
// so every suspect keeps their colours, hair and accessories from the old portraits.

type Facing = 'x' | 'y'

const widthOf = { thin: 22, normal: 26, heavy: 32 }

/**
 * Builds a figure in local units: a runs across the shoulders, b front to back
 * (the face is at the largest b), z up. `facing` turns local units into world axes.
 */
function useLocal(at: V3, facing: Facing, k: number) {
  const W = (a: number, b: number, z: number): V3 =>
    facing === 'y' ? [at[0] + a * k, at[1] + b * k, at[2] + z * k] : [at[0] + b * k, at[1] + a * k, at[2] + z * k]
  const S = (wa: number, wb: number, h: number): V3 => (facing === 'y' ? [wa * k, wb * k, h * k] : [wb * k, wa * k, h * k])
  return { W, S }
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
  const { W, S } = useLocal(at, facing, size)
  const skin = skinTones[spec.skin]
  const hair = hairColors[spec.hairColor]
  const cloth = clothOverride ?? clothColors[spec.outfitColor]
  const acc = new Set(spec.accessory ?? [])
  const mood = spec.mood ?? 'neutral'
  const w = widthOf[spec.build]
  const leg = '#3b3650'
  const B = (a: number, b: number, z: number, wa: number, wb: number, h: number, color: string, top?: string) => (
    <Box at={W(a, b, z)} size={S(wa, wb, h)} color={color} top={top} />
  )
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
      {/* right arm, in front */}
      {B(w, 3, pose === 'sit' ? 38 : 40, 7, 11, 28, tone(cloth, -0.05))}
      {B(w, 3, pose === 'sit' ? 32 : 34, 7, 11, 6, skin)}
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
      {/* face */}
      {brow(4, 10)}
      {brow(20, 14)}
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
      {acc.has('earrings') && <Box at={W(head.a - 1.6, head.b + 12, head.z + 4)} size={S(1.6, 2, 2.4)} color={iso.gold} />}
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
 * Bust portrait card in the diorama style: the block figure close up, standing
 * on a little round plinth in front of a pastel backdrop. Same box as the old
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
          {/* Head and body down to the knees: the figure is about 105 units tall. */}
          <IsoGroup origin={[124, 376]} scale={3.2}>
            <IsoFigure at={[-14, -9, 0]} spec={spec} talking={talking} />
          </IsoGroup>
        </g>
      </g>
    </svg>
  )
}
