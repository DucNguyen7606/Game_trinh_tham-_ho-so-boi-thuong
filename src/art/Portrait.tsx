import { useId } from 'react'
import { accent, clothColors, hairColors, ink, shade, skinTones } from './palette'

// Character portraits in a soft, flat editorial style: smooth curved shapes with
// a thin ink outline, one shadow tone, and simple expressive faces (brows, eyes,
// mouth) so each person's mood reads at a glance.

export type HairStyle = 'short' | 'side-part' | 'long' | 'bun' | 'bald' | 'cap' | 'buzz'
export type Outfit = 'shirt' | 'polo' | 'tank' | 'uniform' | 'blouse'
export type Accessory = 'none' | 'glasses' | 'bandage' | 'gold-chain' | 'earrings' | 'pen'
export type Mood = 'neutral' | 'smile' | 'stern' | 'worried' | 'angry'

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
  /** Facial expression: brows and mouth. */
  mood?: Mood
}

const backdrops = {
  night: '#3d4a52',
  amber: '#c98a3c',
  teal: '#3f7f74',
  rust: '#b0583a',
}

const LINE = ink.night
const CX = 120
const faceHalf = { thin: 37, normal: 41, heavy: 46 }
const shoulderHalf = { thin: 80, normal: 94, heavy: 108 }

/**
 * `zoom` below 1 draws the figure smaller inside the same backdrop, anchored at
 * the bottom centre, which leaves headroom in small thumbnails.
 */
export function Portrait({
  spec,
  size = 200,
  zoom = 1,
  className,
  live = false,
  talking = false,
}: {
  spec: PortraitSpec
  size?: number
  zoom?: number
  className?: string
  /** Breathe and blink (interrogation). */
  live?: boolean
  /** Move the mouth, raise the brows and gesture with a hand while a line is being spoken. */
  talking?: boolean
}) {
  const uid = useId()
  const faceClip = `${uid}-face`, glow = `${uid}-glow`, frame = `${uid}-frame`, body = `${uid}-body`
  const skin = skinTones[spec.skin]
  const skinShadow = shade(skin, -0.2)
  const hair = hairColors[spec.hairColor]
  const hairHi = shade(hair, 0.25)
  const cloth = clothColors[spec.outfitColor]
  const clothShadow = shade(cloth, -0.25)
  const bg = backdrops[spec.backdrop ?? 'night']
  const acc = new Set(spec.accessory ?? [])
  const mood = spec.mood ?? 'neutral'
  const age = spec.age ?? 'mid'

  const fw = faceHalf[spec.build]
  const L = CX - fw
  const R = CX + fw
  const jaw = spec.build === 'heavy' ? 0.72 : 0.58
  const W = shoulderHalf[spec.build]

  const face = `M${CX},70 C${CX + fw * 0.95},70 ${R},98 ${R},128 C${R},160 ${CX + fw * jaw},188 ${CX},191 C${CX - fw * jaw},188 ${L},160 ${L},128 C${L},98 ${CX - fw * 0.95},70 ${CX},70 Z`
  const torso = `M${CX - 20},204 C${CX - 44},210 ${CX - W + 12},214 ${CX - W},244 L${CX - W - 8},320 L${CX + W + 8},320 L${CX + W},244 C${CX + W - 12},214 ${CX + 44},210 ${CX + 20},204 Z`

  // Brows: inner ends move with the mood.
  const browInner = { neutral: 0, smile: -1, stern: 4, worried: -5, angry: 6 }[mood]
  const brow = (side: -1 | 1) => {
    const ex = CX + side * 16
    const inner = ex - side * 9
    const outer = ex + side * 9
    return `M${outer},121 Q${ex},${115 + browInner * 0.3} ${inner},${121 + browInner}`
  }
  const mouth = {
    neutral: `M${CX - 9},169 Q${CX},171 ${CX + 9},169`,
    smile: `M${CX - 11},166 Q${CX},178 ${CX + 11},166`,
    stern: `M${CX - 9},171 Q${CX},167 ${CX + 9},171`,
    worried: `M${CX - 9},171 Q${CX - 3},166 ${CX + 2},169 T${CX + 10},168`,
    angry: `M${CX - 10},172 Q${CX},165 ${CX + 10},172`,
  }[mood]

  const hairPaths: Partial<Record<PortraitSpec['hair'], string>> = {
    short: `M${L - 3},124 C${L - 6},82 ${CX - 22},60 ${CX + 2},62 C${CX + 32},60 ${R + 6},84 ${R + 3},122 C${R - 4},104 ${R - 16},96 ${CX + 14},96 C${CX},100 ${CX - 22},92 ${L + 10},104 C${L + 4},110 ${L},116 ${L - 3},124 Z`,
    'side-part': `M${L - 3},126 C${L - 6},80 ${CX - 20},60 ${CX + 4},62 C${CX + 34},62 ${R + 6},84 ${R + 3},120 C${R - 2},104 ${R - 12},96 ${R - 22},94 C${CX + 6},92 ${CX - 12},98 ${CX - 18},90 C${CX - 22},100 ${L + 6},106 ${L - 3},126 Z`,
    long: `M${L - 4},128 C${L - 8},80 ${CX - 20},60 ${CX},61 C${CX + 20},60 ${R + 8},80 ${R + 4},128 C${R - 6},104 ${CX + 18},88 ${CX + 2},84 C${CX - 16},88 ${L + 6},104 ${L - 4},128 Z`,
    bun: `M${L - 2},118 C${L - 4},80 ${CX - 20},66 ${CX},66 C${CX + 20},66 ${R + 4},80 ${R + 2},118 C${R - 6},100 ${CX + 16},90 ${CX},90 C${CX - 16},90 ${L + 6},100 ${L - 2},118 Z`,
    buzz: `M${L},116 C${L - 1},82 ${CX - 20},68 ${CX},68 C${CX + 20},68 ${R + 1},82 ${R},116 C${R - 6},100 ${CX + 16},92 ${CX},92 C${CX - 16},92 ${L + 6},100 ${L},116 Z`,
  }

  return (
    <svg viewBox="0 0 240 320" width={size} height={(size * 320) / 240} className={[className, live && 'pt-anim'].filter(Boolean).join(' ')} role="img">
      <defs>
        <radialGradient id={glow} cx="0.42" cy="0.36" r="0.7">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
        </radialGradient>
        <clipPath id={faceClip}>
          <path d={face} />
        </clipPath>
        <clipPath id={body}>
          <path d={torso} />
        </clipPath>
        <clipPath id={frame}>
          <rect width="240" height="320" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${frame})`}>
        <rect width="240" height="320" fill={bg} />
        <rect width="240" height="320" fill={`url(#${glow})`} />
        {/* Soft geometric shapes in the backdrop */}
        <circle cx="196" cy="70" r="70" fill={shade(bg, 0.12)} opacity="0.6" />
        <circle cx="30" cy="290" r="90" fill={shade(bg, -0.15)} opacity="0.6" />

        <g transform={zoom === 1 ? undefined : `translate(${120 * (1 - zoom)} ${320 * (1 - zoom)}) scale(${zoom})`}>
        <g className={live ? 'pt-breathe' : undefined}>
          {/* Long hair falls behind the shoulders */}
          {spec.hair === 'long' && (
            <path
              d={`M${L - 10},112 C${L - 14},70 ${CX - 18},56 ${CX},57 C${CX + 18},56 ${R + 14},70 ${R + 10},112 L${R + 18},250 C${CX + 30},262 ${CX - 30},262 ${L - 18},250 Z`}
              fill={hair}
              stroke={LINE}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          )}
          {spec.hair === 'bun' && <circle cx={CX + 4} cy="60" r="17" fill={hair} stroke={LINE} strokeWidth="2" />}

          {/* Body and clothes */}
          <path d={torso} fill={spec.outfit === 'tank' ? skin : cloth} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
          <g clipPath={`url(#${body})`}>
            {spec.outfit === 'tank' && (
              <path d={`M${CX - 46},212 L${CX - 34},212 C${CX - 26},246 ${CX + 26},246 ${CX + 34},212 L${CX + 46},212 L${CX + W},330 L${CX - W},330 Z`} fill={cloth} stroke={LINE} strokeWidth="2" />
            )}
            {/* Shadow side of the body */}
            <path d={`M${CX + 18},200 C${CX + 50},230 ${CX + 60},280 ${CX + 50},330 L${CX + W + 20},330 L${CX + W + 20},200 Z`} fill={spec.outfit === 'tank' ? skinShadow : clothShadow} opacity="0.55" />
            {spec.outfit === 'blouse' && <path d={`M${CX - 24},200 Q${CX},244 ${CX + 24},200 Z`} fill={skin} stroke={LINE} strokeWidth="2" />}
            {(spec.outfit === 'shirt' || spec.outfit === 'uniform' || spec.outfit === 'polo') && (
              <>
                <line x1={CX} y1="226" x2={CX} y2="330" stroke={clothShadow} strokeWidth="2" />
                {(spec.outfit === 'polo' ? [244, 262] : [244, 270, 296]).map((y) => (
                  <circle key={y} cx={CX + 4} cy={y} r="2.4" fill={shade(cloth, -0.4)} />
                ))}
              </>
            )}
            {spec.outfit === 'uniform' && (
              <>
                <rect x={CX - 52} y="250" width="30" height="26" rx="3" fill={clothShadow} stroke={LINE} strokeWidth="1.5" />
                <rect x={CX + 22} y="250" width="30" height="26" rx="3" fill={clothShadow} stroke={LINE} strokeWidth="1.5" />
                <rect x={CX - W + 4} y="222" width="38" height="9" rx="3" transform={`rotate(14 ${CX - W + 23} 226)`} fill={shade(cloth, -0.35)} />
                <rect x={CX + W - 42} y="222" width="38" height="9" rx="3" transform={`rotate(-14 ${CX + W - 23} 226)`} fill={shade(cloth, -0.35)} />
              </>
            )}
            {spec.outfit === 'shirt' && <rect x={CX - 52} y="252" width="26" height="24" rx="2" fill="none" stroke={clothShadow} strokeWidth="2" />}
          </g>
          {/* Collars */}
          {(spec.outfit === 'shirt' || spec.outfit === 'uniform') && (
            <g fill={shade(cloth, 0.08)} stroke={LINE} strokeWidth="2" strokeLinejoin="round">
              <path d={`M${CX - 20},202 L${CX},228 L${CX - 10},240 L${CX - 30},212 Z`} />
              <path d={`M${CX + 20},202 L${CX},228 L${CX + 10},240 L${CX + 30},212 Z`} />
            </g>
          )}
          {spec.outfit === 'polo' && (
            <g fill={shade(cloth, 0.1)} stroke={LINE} strokeWidth="2" strokeLinejoin="round">
              <path d={`M${CX - 20},202 Q${CX - 8},222 ${CX},224 L${CX - 6},232 Q${CX - 22},224 ${CX - 30},210 Z`} />
              <path d={`M${CX + 20},202 Q${CX + 8},222 ${CX},224 L${CX + 6},232 Q${CX + 22},224 ${CX + 30},210 Z`} />
            </g>
          )}
          {acc.has('gold-chain') && <path d={`M${CX - 20},210 Q${CX},240 ${CX + 20},210`} fill="none" stroke={accent.gold} strokeWidth="3" strokeLinecap="round" />}
          {acc.has('pen') && (
            <g>
              <rect x={CX + 28} y="248" width="5" height="22" rx="1.5" fill={accent.red} stroke={LINE} strokeWidth="1" />
              <rect x={CX + 22} y="258" width="26" height="22" rx="2" fill="none" stroke={clothShadow} strokeWidth="2" />
            </g>
          )}

          {/* Neck with a soft shadow under the chin */}
          <path d={`M${CX - 14},170 L${CX - 15},208 Q${CX},216 ${CX + 15},208 L${CX + 14},170 Z`} fill={skin} stroke={LINE} strokeWidth="2" />
          <path d={`M${CX - 14},178 Q${CX},200 ${CX + 14},178 L${CX + 14},170 L${CX - 14},170 Z`} fill={skinShadow} />

          <g className={live ? 'pt-head' : undefined}>
          {/* Ears */}
          {[-1, 1].map((sd) => (
            <g key={sd}>
              <ellipse cx={CX + sd * (fw + 1)} cy="136" rx="7" ry="11" fill={sd > 0 ? skinShadow : skin} stroke={LINE} strokeWidth="2" />
              {acc.has('earrings') && <circle cx={CX + sd * (fw + 1)} cy="150" r="3.5" fill={accent.gold} stroke={LINE} strokeWidth="1" />}
            </g>
          ))}

          {/* Face, with the shadow side and cheek colour clipped inside it */}
          <path d={face} fill={skin} />
          <g clipPath={`url(#${faceClip})`}>
            <ellipse cx={R + 8} cy="140" rx={fw * 0.62} ry="76" fill={skinShadow} opacity="0.5" />
            {[-1, 1].map((sd) => (
              <ellipse key={sd} cx={CX + sd * 21} cy="157" rx="8" ry="4.5" fill={accent.rust} opacity="0.2" />
            ))}
            {age !== 'young' && <path d={`M${CX - 14},98 Q${CX},94 ${CX + 14},98`} fill="none" stroke={skinShadow} strokeWidth="1.8" opacity={age === 'old' ? 1 : 0.6} />}
            {age === 'old' && (
              <>
                <path d={`M${CX - 12},104 Q${CX},100 ${CX + 12},104`} fill="none" stroke={skinShadow} strokeWidth="1.6" />
                <path d={`M${CX - 13},153 Q${CX - 17},162 ${CX - 14},170`} fill="none" stroke={skinShadow} strokeWidth="1.8" />
                <path d={`M${CX + 13},153 Q${CX + 17},162 ${CX + 14},170`} fill="none" stroke={skinShadow} strokeWidth="1.8" />
                <path d={`M${CX - 26},140 l-5,3 M${CX + 26},140 l5,3`} stroke={skinShadow} strokeWidth="1.5" />
              </>
            )}
          </g>
          <path d={face} fill="none" stroke={LINE} strokeWidth="2.2" />

          {/* Eyes, brows, nose, mouth */}
          {[-1, 1].map((sd) => {
            const ex = CX + sd * 16
            return (
              <g key={sd} className={live ? 'pt-blink' : undefined}>
                <ellipse cx={ex} cy="134" rx="4.2" ry={mood === 'angry' ? 3.6 : 5} fill="#2a1d17" />
                <circle cx={ex + 1.4} cy="132" r="1.3" fill="#fff" />
                {age === 'old' && <path d={`M${ex - 6},141 Q${ex},144 ${ex + 6},141`} fill="none" stroke={skinShadow} strokeWidth="1.5" />}
              </g>
            )
          })}
          <g className={talking ? 'pt-brow' : undefined} fill="none" stroke={shade(hair, spec.hairColor === 'white' || spec.hairColor === 'gray' ? -0.3 : 0)} strokeWidth="3.6" strokeLinecap="round">
            <path d={brow(-1)} />
            <path d={brow(1)} />
          </g>
          <path d={`M${CX + 1},138 Q${CX - 5},152 ${CX + 2},155`} fill="none" stroke={shade(skin, -0.32)} strokeWidth="2.2" strokeLinecap="round" />
          {talking ? (
            <g className="pt-mouth">
              <ellipse cx={CX} cy="169" rx="9" ry="6" fill="#5a2620" stroke="#7a3b2e" strokeWidth="2" />
              <ellipse cx={CX} cy="172" rx="5" ry="2.4" fill="#c86a5a" />
            </g>
          ) : (
            <path d={mouth} fill="none" stroke="#7a3b2e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* Hair on top of the head */}
          {hairPaths[spec.hair] && (
            <path d={hairPaths[spec.hair]} fill={hair} opacity={spec.hair === 'buzz' ? 0.88 : 1} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
          )}
          {spec.hair !== 'bald' && spec.hair !== 'cap' && hairPaths[spec.hair] && (
            <path d={`M${CX - 20},74 Q${CX - 4},68 ${CX + 10},72`} fill="none" stroke={hairHi} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          )}
          {spec.hair === 'bald' && (
            <>
              <path d={`M${L - 2},128 C${L - 4},112 ${L + 2},104 ${L + 8},100 L${L + 6},124 Z`} fill={hair} stroke={LINE} strokeWidth="1.8" />
              <path d={`M${R + 2},128 C${R + 4},112 ${R - 2},104 ${R - 8},100 L${R - 6},124 Z`} fill={hair} stroke={LINE} strokeWidth="1.8" />
              <ellipse cx={CX - 12} cy="84" rx="12" ry="5" fill="#fff" opacity="0.25" />
            </>
          )}
          {spec.hair === 'cap' && (
            <g stroke={LINE} strokeWidth="2" strokeLinejoin="round">
              <path d={`M${L - 4},112 C${L - 4},70 ${R + 4},62 ${R + 4},112 Z`} fill={clothColors.navy} />
              <path d={`M${L - 8},112 L${R + 26},106 Q${R + 30},116 ${R + 8},120 L${L - 6},120 Z`} fill={shade(clothColors.navy, -0.2)} />
            </g>
          )}

          {acc.has('glasses') && (
            <g fill="#fff" fillOpacity="0.12" stroke={LINE} strokeWidth="2.6">
              <rect x={CX - 29} y="125" width="24" height="18" rx="5" />
              <rect x={CX + 5} y="125" width="24" height="18" rx="5" />
              <path d={`M${CX - 5},132 Q${CX},129 ${CX + 5},132`} fill="none" />
            </g>
          )}
          {acc.has('bandage') && (
            <g transform={`rotate(-16 ${CX + 18} 100)`}>
              <rect x={CX + 4} y="94" width="30" height="12" rx="3" fill="#f2ead8" stroke={LINE} strokeWidth="1.6" />
              <path d={`M${CX + 14},94 v12 M${CX + 24},94 v12`} stroke="#c8bba0" strokeWidth="1.2" />
            </g>
          )}
          </g>
          {/* A hand comes up to gesture while talking */}
          {talking && (
            <g className="pt-gesture">
              <path d={`M${CX + 40},330 L${CX + 50},262 Q${CX + 52},252 ${CX + 64},254 L${CX + 76},258 Q${CX + 84},262 ${CX + 82},272 L${CX + 76},330 Z`} fill={spec.outfit === 'tank' ? skin : cloth} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
              <path d={`M${CX + 50},262 C${CX + 44},236 ${CX + 50},214 ${CX + 58},212 C${CX + 62},200 ${CX + 72},200 ${CX + 74},210 C${CX + 80},204 ${CX + 90},208 ${CX + 88},220 C${CX + 94},220 ${CX + 96},232 ${CX + 90},240 C${CX + 88},252 ${CX + 82},260 ${CX + 76},262 Z`} fill={skin} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
              <path d={`M${CX + 62},214 L${CX + 64},232 M${CX + 75},212 L${CX + 75},232`} stroke={skinShadow} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </g>
        </g>
      </g>
    </svg>
  )
}
