import { useId } from 'react'
import { accent, ink, shade } from '@/art/palette'
import { AREAS, OFF_MAP, QL1A, RIVER, areaLabel, roughOutline, type Area } from './areas'
import { SERIES, type Chapter } from './series'

// The case map: a paper map of Saigon pinned to the desk. Areas with a case get
// a red pin, and a red string runs from pin to pin in chapter order.

const LAND = '#ecd8ae'
const LAND_OUT = '#d7bf90'
const WATER = '#8fa79a'
const INK = ink.slate

const outline = (a: Area) => roughOutline(a.shape).map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')

/** Smooth path through points (midpoint quadratic curves). */
function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i]
    const [nx, ny] = pts[i + 1]
    d += ` Q${x},${y} ${(x + nx) / 2},${(y + ny) / 2}`
  }
  const last = pts[pts.length - 1]
  return d + ` L${last[0]},${last[1]}`
}

/** Where a chapter's pin goes: its own `spot`, or just above its area's name. */
export function spotOf(c: Chapter): [number, number] | undefined {
  if (c.spot) return c.spot
  const a = AREAS.find((x) => x.id === c.area)
  if (a) {
    const [x, y] = areaLabel(a)
    return [x, y - 26]
  }
  const o = OFF_MAP.find((x) => x.id === c.area)
  return o && [o.at[0] - 52, o.at[1] - 8]
}

/** Box around an area (or a road sign) to zoom to. */
function boundsOf(areaId: string): [number, number, number, number] | undefined {
  const a = AREAS.find((x) => x.id === areaId)
  if (a) {
    const xs = a.shape.map((p) => p[0])
    const ys = a.shape.map((p) => p[1])
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  }
  const o = OFF_MAP.find((x) => x.id === areaId)
  return o && [o.at[0] - 110, o.at[1] - 60, o.at[0] + 100, o.at[1] + 80]
}

/** Scale and offset that fit an area in the middle of the map. */
function zoomTo(areaId?: string) {
  const b = areaId ? boundsOf(areaId) : undefined
  if (!b) return { s: 1, tx: 0, ty: 0 }
  const pad = 70
  const s = Math.min(3.4, 1000 / (b[2] - b[0] + pad * 2), 900 / (b[3] - b[1] + pad * 2))
  // Leave room at the bottom for the case tags under the pins.
  // Keep the paper filling the frame: never pan past the map's own edges.
  const clamp = (v: number, size: number) => Math.min(0, Math.max(size - size * s, v))
  return { s, tx: clamp(500 - ((b[0] + b[2]) / 2) * s, 1000), ty: clamp(430 - ((b[1] + b[3]) / 2) * s, 900) }
}

/** Number of playable cases in each area. */
export function caseCounts() {
  const counts: Record<string, number> = {}
  for (const c of SERIES.chapters) if (c.area && c.caseId) counts[c.area] = (counts[c.area] ?? 0) + 1
  return counts
}

const CSS = `
.sm-area { cursor: pointer; transition: fill 160ms; }
.sm-area:hover { fill: #f6d08a; }
.sm-area.has:hover { fill: #f7c070; }
.sm-sign { cursor: pointer; }
.sm-sign:hover .sm-board { fill: #3f9a8c; }
.sm-pin { transform-box: fill-box; transform-origin: 50% 100%; animation: sm-drop 0.5s cubic-bezier(0.3, 1.4, 0.5, 1) both; }
@keyframes sm-drop { from { transform: translateY(-30px) scale(1.2); opacity: 0; } to { transform: none; opacity: 1; } }
.sm-zoom { transition: transform 750ms cubic-bezier(0.4, 0, 0.2, 1); }
.sm-fade { transition: opacity 400ms; }
.sm-case { cursor: pointer; animation: sm-pop 0.4s 0.6s cubic-bezier(0.3, 1.4, 0.5, 1) both; }
.sm-case:hover .sm-tag { fill: #fff4dc; }
@keyframes sm-pop { from { transform: translateY(-20px); opacity: 0; } to { transform: none; opacity: 1; } }
.sm-string { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: sm-draw 1.6s 0.5s ease-out forwards; }
@keyframes sm-draw { to { stroke-dashoffset: 0; } }
`

export default function SaigonMap({
  selected,
  onSelect,
  chosen,
  onChoose,
  interactive = true,
}: {
  /** Area to zoom into. */
  selected?: string
  onSelect?: (areaId: string) => void
  /** Chapter number picked inside the zoomed area. */
  chosen?: number
  onChoose?: (chapter: number) => void
  interactive?: boolean
}) {
  const id = useId().replace(/:/g, '')
  const counts = caseCounts()
  const pick = interactive ? onSelect : undefined

  // Pins in chapter order, for the red string.
  const pins = SERIES.chapters
    .filter((c) => c.area && c.caseId)
    .map((c) => ({ chapter: c.number, at: spotOf(c)! }))
    .filter((p) => p.at)

  const zoomed = interactive && !!selected && !!boundsOf(selected)
  const z = zoomTo(zoomed ? selected : undefined)
  const selArea = zoomed ? AREAS.find((a) => a.id === selected) : undefined
  // Cases in the zoomed area, as tags drawn at screen scale over the zoomed map.
  const here = zoomed ? SERIES.chapters.filter((c) => c.area === selected) : []
  const fadeOut = { opacity: zoomed ? 0 : 1 }

  return (
    <svg viewBox="0 0 1000 900" className="h-full w-full" role={interactive ? 'group' : 'img'} aria-label="Bản đồ Sài Gòn">
      <style>{CSS}</style>
      <defs>
        <pattern id={`${id}-hatch`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={shade(LAND_OUT, -0.12)} strokeWidth="1.2" />
        </pattern>
        <pattern id={`${id}-wave`} width="40" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 q10 -6 20 0 t20 0" fill="none" stroke={shade(WATER, 0.25)} strokeWidth="1.3" />
        </pattern>
        <pattern id={`${id}-streets`} width="46" height="38" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path d="M0 0 H46 M0 19 H46 M0 0 V38 M23 0 V19 M12 19 V38 M34 19 V38" fill="none" stroke={shade(LAND, -0.13)} strokeWidth="0.8" />
        </pattern>
        {selArea && (
          <clipPath id={`${id}-sel`}>
            <polygon points={outline(selArea)} />
          </clipPath>
        )}
        <pattern id={`${id}-mangrove`} width="22" height="18" patternUnits="userSpaceOnUse">
          <path d="M5 13 l3 -6 l3 6 M14 6 l2 -4 l2 4" fill="none" stroke={shade(accent.teal, -0.1)} strokeWidth="1.2" opacity="0.55" />
        </pattern>
        <filter id={`${id}-paper`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0 0.12  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <radialGradient id={`${id}-age`} cx="50%" cy="45%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#5a3a1c" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <g className="sm-zoom" style={{ transform: `translate(${z.tx}px, ${z.ty}px) scale(${z.s})` }}>
      {/* Neighbouring provinces, hatched; clicking them while zoomed goes back to the whole city */}
      <rect width="1000" height="900" fill={LAND_OUT} onClick={zoomed && pick ? () => pick('') : undefined} />
      <rect width="1000" height="900" fill={`url(#${id}-hatch)`} pointerEvents="none" />
      <g className="display" fill={shade(INK, 0.3)} fontSize="22" letterSpacing="6" opacity="0.6">
        <text x="70" y="420" transform="rotate(-70 70 420)">LONG AN</text>
        <text x="600" y="120">BÌNH DƯƠNG</text>
        <text x="830" y="650">ĐỒNG NAI</text>
      </g>

      {/* The sea */}
      <path d="M560,900 L620,860 L700,890 L870,860 L880,770 L1000,690 L1000,900 Z" fill={WATER} />
      <path d="M560,900 L620,860 L700,890 L870,860 L880,770 L1000,690 L1000,900 Z" fill={`url(#${id}-wave)`} />
      <text x="985" y="880" textAnchor="end" className="display" fontSize="18" fill={shade(WATER, -0.45)} letterSpacing="5">BIỂN ĐÔNG</text>

      {/* Districts */}
      <g stroke={shade(INK, 0.15)} strokeWidth="1.6" strokeLinejoin="round">
        {AREAS.map((a) => {
          const has = (counts[a.id] ?? 0) > 0
          const fill = a.id === selected ? '#f2b65a' : has ? '#f1d59a' : LAND
          return (
            <polygon
              key={a.id}
              points={outline(a)}
              fill={fill}
              opacity={zoomed && a.id !== selected ? 0.55 : 1}
              vectorEffect="non-scaling-stroke"
              className={pick ? `sm-area${has ? ' has' : ''}` : undefined}
              onClick={pick && (() => pick(a.id))}
            >
              <title>{a.name}</title>
            </polygon>
          )
        })}
      </g>
      {/* Mangrove marks over Cần Giờ */}
      <polygon
        points={outline(AREAS.find((a) => a.id === 'can-gio')!)}
        fill={`url(#${id}-mangrove)`}
        pointerEvents="none"
      />
      {/* Close up, the chosen area shows its streets */}
      {selArea && (
        <rect width="1000" height="900" fill={`url(#${id}-streets)`} clipPath={`url(#${id}-sel)`} pointerEvents="none" />
      )}
      {/* Selected outline on top of the neighbours' borders */}
      {selected && AREAS.some((a) => a.id === selected) && (
        <polygon
          points={outline(AREAS.find((a) => a.id === selected)!)}
          fill="none"
          stroke={accent.red}
          strokeWidth={zoomed ? 4 / z.s : 4}
          strokeDasharray={zoomed ? `${10 / z.s} ${6 / z.s}` : '10 6'}
          strokeLinejoin="round"
          pointerEvents="none"
        />
      )}

      {/* Sông Sài Gòn */}
      <g pointerEvents="none" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={smooth(RIVER)} stroke={shade(WATER, -0.25)} strokeWidth="20" />
        <path d={smooth(RIVER)} stroke={WATER} strokeWidth="15" />
        <path d={smooth(RIVER)} stroke={shade(WATER, 0.25)} strokeWidth="2" strokeDasharray="14 18" />
        {/* Kênh Tàu Hủ – Bến Nghé, Chợ Lớn to the river */}
        <path d="M420,640 Q480,610 540,605 T600,600" stroke={WATER} strokeWidth="6" />
        {/* Sông Nhà Bè / Soài Rạp spreading to the sea */}
        <path d="M665,700 Q620,760 600,830 T560,900" stroke={WATER} strokeWidth="11" />
      </g>
      <text x="0" y="0" className="display" fontSize="15" fill={shade(WATER, -0.5)} letterSpacing="4" pointerEvents="none" transform="translate(500 230) rotate(52)">
        SÔNG SÀI GÒN
      </text>

      {/* Quốc lộ 1A */}
      <g pointerEvents="none" fill="none" strokeLinecap="round">
        <path d={smooth(QL1A)} stroke={shade(accent.rust, -0.25)} strokeWidth="7" />
        <path d={smooth(QL1A)} stroke="#f0c36a" strokeWidth="3" strokeDasharray="12 9" />
      </g>
      <g transform="translate(335 470)" pointerEvents="none">
        <rect x="-26" y="-13" width="52" height="24" rx="4" fill={shade(accent.rust, -0.2)} stroke={ink.bone} strokeWidth="1.5" />
        <text y="5" textAnchor="middle" className="display" fontSize="15" fill={ink.bone}>QL1A</text>
      </g>

      {/* Names */}
      <g className="display sm-fade" textAnchor="middle" pointerEvents="none" style={{ opacity: zoomed ? 0.45 : 1 }}>
        {AREAS.filter((a) => !zoomed || a.id !== selected).map((a) => {
          const [x, y] = areaLabel(a)
          const has = (counts[a.id] ?? 0) > 0
          return (
            <text
              key={a.id}
              x={x}
              y={y + 6}
              fontSize={has ? 19 : 15}
              fill={has ? INK : shade(INK, 0.35)}
              fontWeight={has ? 700 : 400}
              letterSpacing="1.5"
              paintOrder="stroke"
              stroke={has ? '#f6e3b8' : 'none'}
              strokeWidth="3"
            >
              {(a.short ?? a.name).toUpperCase()}
            </text>
          )
        })}
      </g>

      {/* Signs for cases out of town */}
      {OFF_MAP.map((o) => {
        const has = (counts[o.id] ?? 0) > 0
        const on = o.id === selected
        return (
          <g
            key={o.id}
            transform={`translate(${o.at[0]} ${o.at[1]})`}
            className={pick ? 'sm-sign' : undefined}
            onClick={pick && (() => pick(o.id))}
            opacity={has ? 1 : 0.6}
          >
            <title>{o.name}</title>
            <rect x="-3" y="10" width="6" height="58" fill={ink.steel} />
            <path
              className="sm-board"
              d="M-80,-24 H66 L86,0 L66,24 H-80 Z"
              fill={accent.teal}
              stroke={on ? accent.red : ink.bone}
              strokeWidth={on ? 4 : 2}
            />
            <text x="-6" y="-2" textAnchor="middle" className="display" fontSize="19" fill={ink.bone} fontWeight="700">
              {o.name.toUpperCase()}
            </text>
            <text x="-6" y="17" textAnchor="middle" className="display" fontSize="12" fill={ink.bone} opacity="0.85">
              {o.sign}
            </text>
          </g>
        )
      })}

      {/* Red string between the pins, in chapter order; hidden close up, where the case tags take over */}
      <g className="sm-fade" style={fadeOut}>
      {pins.length > 1 && (
        <polyline
          className={interactive ? 'sm-string' : undefined}
          points={pins.map((p) => `${p.at[0]},${p.at[1] - 14}`).join(' ')}
          fill="none"
          stroke={accent.red}
          strokeWidth="2.5"
          opacity="0.85"
          pointerEvents="none"
        />
      )}
      {pins.map((p, i) => (
        <g key={p.chapter} pointerEvents="none">
          <g className={interactive ? 'sm-pin' : undefined} style={{ animationDelay: `${i * 120}ms` }}>
            <ellipse cx={p.at[0] + 3} cy={p.at[1] + 2} rx="7" ry="3" fill="#000" opacity="0.25" />
            <line x1={p.at[0]} y1={p.at[1]} x2={p.at[0]} y2={p.at[1] - 14} stroke={ink.steel} strokeWidth="2" />
            <circle cx={p.at[0]} cy={p.at[1] - 18} r="10" fill={accent.red} stroke={shade(accent.red, -0.4)} strokeWidth="1.5" />
            <circle cx={p.at[0] - 3} cy={p.at[1] - 21} r="3" fill="#fff" opacity="0.5" />
            <text x={p.at[0] + 14} y={p.at[1] - 26} className="display" fontSize="14" fill={accent.red} fontWeight="700">
              {p.chapter}
            </text>
          </g>
        </g>
      ))}
      </g>
      </g>

      {/* Close up: the area's name and its cases, at screen scale */}
      {selArea && (
        <text x="500" y="70" textAnchor="middle" className="title" fontSize="44" fill={INK} paintOrder="stroke" stroke="#f6e3b8" strokeWidth="6" pointerEvents="none">
          {selArea.name}
        </text>
      )}
      {here.map((c, i) => {
        const at = spotOf(c)
        if (!at) return null
        const x = at[0] * z.s + z.tx
        const y = at[1] * z.s + z.ty
        const on = c.number === chosen
        const open = !!c.caseId
        return (
          <g
            key={c.number}
            className="sm-case"
            style={{ animationDelay: `${600 + i * 120}ms` }}
            onClick={onChoose && (() => onChoose(c.number))}
            opacity={open ? 1 : 0.7}
          >
            <title>{c.title}</title>
            <ellipse cx={x + 5} cy={y + 3} rx="12" ry="5" fill="#000" opacity="0.3" />
            <line x1={x} y1={y} x2={x} y2={y - 26} stroke={ink.steel} strokeWidth="3" />
            <circle cx={x} cy={y - 34} r="16" fill={open ? accent.red : ink.steel} stroke={on ? ink.bone : shade(accent.red, -0.4)} strokeWidth={on ? 4 : 2} />
            <text x={x} y={y - 28} textAnchor="middle" className="display" fontSize="18" fill={ink.bone} fontWeight="700">
              {c.number}
            </text>
            <g transform={`translate(${x} ${y + 14}) rotate(${i % 2 ? 1.5 : -1.5})`}>
              <rect className="sm-tag" x="-120" y="0" width="240" height="56" fill="#f3e4c4" stroke={on ? accent.red : INK} strokeWidth={on ? 3 : 1.2} />
              <text y="21" textAnchor="middle" className="display" fontSize="13" fill={shade(INK, 0.3)} letterSpacing="2">
                {open ? `CHƯƠNG ${c.number}` : `CHƯƠNG ${c.number} · NIÊM PHONG`}
              </text>
              <text y="44" textAnchor="middle" className="title" fontSize="19" fill={INK}>
                {c.title}
              </text>
            </g>
          </g>
        )
      })}
      {zoomed && here.length === 0 && (
        <text x="500" y="840" textAnchor="middle" className="display" fontSize="20" fill={shade(INK, 0.2)} paintOrder="stroke" stroke="#f6e3b8" strokeWidth="5" pointerEvents="none">
          CHƯA CÓ HỒ SƠ NÀO Ở ĐÂY
        </text>
      )}

      {/* Compass and cartouche */}
      <g transform="translate(75 75)" pointerEvents="none" fill={INK} className="sm-fade" style={fadeOut}>
        <circle r="34" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.6" />
        <path d="M0,-44 L9,0 L0,8 L-9,0 Z" />
        <path d="M0,44 L9,0 L0,-8 L-9,0 Z" opacity="0.4" />
        <text y="-50" textAnchor="middle" className="display" fontSize="16" fontWeight="700">B</text>
      </g>
      <g transform="translate(40 820)" pointerEvents="none" className="sm-fade" style={fadeOut}>
        <rect width="250" height="56" fill="#f3e4c4" stroke={INK} strokeWidth="1.5" />
        <rect x="5" y="5" width="240" height="46" fill="none" stroke={INK} strokeWidth="0.8" />
        <text x="125" y="26" textAnchor="middle" className="title" fontSize="17" fill={INK}>Bản đồ hồ sơ</text>
        <text x="125" y="43" textAnchor="middle" className="display" fontSize="12" fill={shade(INK, 0.3)} letterSpacing="3">TP. HỒ CHÍ MINH · 2025</text>
      </g>

      {/* Age: grain and darkened edges */}
      <rect width="1000" height="900" fill="#fff" filter={`url(#${id}-paper)`} pointerEvents="none" opacity="0.9" />
      <rect width="1000" height="900" fill={`url(#${id}-age)`} pointerEvents="none" />
    </svg>
  )
}
