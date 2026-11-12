import { useId } from 'react'
import { accent, ink, shade } from '@/art/palette'
import { rng } from '@/art/primitives'
import { Bottle, Paper, Smear } from '@/art/noiseProps'

// Backdrops for the four zones of Chapter 2, in the same soft flat style as
// Chapter 1: rounded shapes, a thin ink outline, one shadow tone, pools of light.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const LINE = ink.night
export const O = { stroke: LINE, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export const C = {
  skyTop: '#1f2a3a',
  skyMid: '#4a4558',
  skyLow: '#c98a5a',
  river: '#3e5a5e',
  riverLit: '#7f8f7c',
  mudGray: '#6b6660',
  mudGrayDark: '#4d4945',
  mudRed: '#8a4a30',
  mudRedDark: '#5e2f1e',
  wood: '#7a4f32',
  woodDark: '#573721',
  woodLit: '#9a6a44',
  hull: '#3f6b6a',
  hullDark: '#2c4b4a',
  hullRed: '#a8432c',
  leaf: '#3f5e3a',
  leafDark: '#2b4229',
  leafLit: '#5f7f4a',
  wallYellow: '#c99a4a',
  wallYellowDark: '#9c7434',
  metal: '#6f7477',
  metalDark: '#4b5054',
}

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

function Beam({ x, y, w, h, o = 0.28 }: { x: number; y: number; w: number; h: number; o?: number }) {
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

function Bulb({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x},${y - 120} V${y - 14}`} stroke={LINE} strokeWidth="3" />
      <path d={`M${x - 28},${y} Q${x},${y - 30} ${x + 28},${y} Z`} fill={ink.night} {...O} />
      <circle cx={x} cy={y + 6} r="9" fill="#fff1c9" />
    </g>
  )
}

/** Dawn sky: deep blue at the top, warm at the horizon. */
export function DawnSky({ horizon = 420 }: { horizon?: number }) {
  const id = useId()
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.skyTop} />
          <stop offset="0.6" stopColor={C.skyMid} />
          <stop offset="1" stopColor={C.skyLow} />
        </linearGradient>
      </defs>
      <rect width="1600" height={horizon} fill={`url(#${id})`} />
    </g>
  )
}

/** A low line of mangrove canopy along the far bank. */
export function FarMangroves({ y, seed = 3, color = C.leafDark }: { y: number; seed?: number; color?: string }) {
  const r = rng(seed)
  let d = `M0,${y + 30} L0,${y}`
  for (let x = 0; x <= 1600; x += 40) d += ` Q${x + 20},${y - 20 - r() * 40} ${x + 40},${y - r() * 10}`
  d += ` L1600,${y + 30} Z`
  return <path d={d} fill={color} />
}

/** Arched stilt roots of a mangrove tree, rising from the mud at (x, y). */
export function Roots({ x, y, w = 220, h = 120, color = C.woodDark }: { x: number; y: number; w?: number; h?: number; color?: string }) {
  const arcs = [-0.5, -0.28, -0.08, 0.12, 0.32, 0.5]
  return (
    <g fill="none" stroke={color} strokeWidth="12" strokeLinecap="round">
      {arcs.map((a, i) => (
        <path key={i} d={`M${x},${y - h} Q${x + a * w * 0.6},${y - h * 0.9} ${x + a * w},${y}`} />
      ))}
      <path d={`M${x},${y - h} V${y - h - 160}`} strokeWidth="26" />
    </g>
  )
}

/** A leafy mangrove crown. */
export function Crown({ x, y, r = 140, seed = 1 }: { x: number; y: number; r?: number; seed?: number }) {
  const g = rng(seed)
  return (
    <g {...O} strokeWidth={2.5}>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2
        return <circle key={i} cx={x + Math.cos(a) * r * 0.55} cy={y + Math.sin(a) * r * 0.35} r={r * (0.45 + g() * 0.15)} fill={i % 2 ? C.leaf : C.leafDark} />
      })}
      <circle cx={x} cy={y - r * 0.1} r={r * 0.55} fill={C.leafLit} />
    </g>
  )
}

export function Mist({ y, o = 0.25 }: { y: number; o?: number }) {
  return (
    <g fill="#e8e0d0" opacity={o}>
      <ellipse cx="300" cy={y} rx="420" ry="26" />
      <ellipse cx="900" cy={y + 16} rx="520" ry="22" />
      <ellipse cx="1400" cy={y - 6} rx="360" ry="24" />
    </g>
  )
}

/** River surface with soft ripples. */
export function River({ y, h, seed = 5 }: { y: number; h: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g>
      <rect y={y} width="1600" height={h} fill={C.river} />
      <rect y={y} width="1600" height={h * 0.25} fill={C.riverLit} opacity="0.35" />
      {Array.from({ length: 26 }, (_, i) => {
        const x = r() * 1600, yy = y + 12 + r() * (h - 24), w = 30 + r() * 90
        return <path key={i} d={`M${x},${yy} q${w / 2},-6 ${w},0`} stroke="#c9d3c6" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />
      })}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. The landing, with the salvaged boat lying on the mud

function Landing() {
  return (
    <Frame label="Bến ghe vựa Lực Phát lúc rạng sáng, chiếc ghe nằm nghiêng trên bùn">
      <DawnSky horizon={380} />
      <Glow x={1180} y={370} r={360} o={0.4} color="#ffcf8a" />
      <FarMangroves y={360} />
      <River y={380} h={200} />
      <Mist y={420} />

      {/* Wooden jetty on stilts, right side */}
      <g {...O}>
        {[1160, 1260, 1360, 1460, 1560].map((x) => (
          <rect key={x} x={x} y="420" width="18" height="300" fill={C.woodDark} />
        ))}
        <path d="M1120,410 L1600,404 L1600,440 L1120,446 Z" fill={C.wood} />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={1140 + i * 40} y1={408} x2={1140 + i * 40} y2={444} stroke={C.woodDark} strokeWidth="2" />
        ))}
      </g>
      {/* The vựa's shed on the jetty */}
      <g {...O}>
        <rect x="1300" y="220" width="300" height="190" fill={C.woodLit} />
        <path d="M1280,226 L1450,150 L1620,226 Z" fill={C.metal} />
        <rect x="1360" y="270" width="80" height="60" fill="#f2c46b" />
        <rect x="1380" y="168" width="160" height="34" rx="5" fill={accent.teal} />
      </g>
      <text x="1460" y="192" textAnchor="middle" fontSize="20" fontWeight="700" fill="#e9f1ec" fontFamily="Barlow Condensed, sans-serif">
        VỰA LỰC PHÁT
      </text>

      {/* Grey mud flat in the foreground */}
      <path d="M0,560 Q400,540 800,566 T1600,560 L1600,900 L0,900 Z" fill={C.mudGray} />
      <path d="M0,640 Q500,620 900,650 T1600,640 L1600,900 L0,900 Z" fill={C.mudGrayDark} opacity="0.5" />
      {/* Puddle and footprints in the grey mud (hotspot ghe-bun at 224,774) */}
      <ellipse cx="230" cy="790" rx="130" ry="18" fill={C.river} opacity="0.6" />
      {[[150, 730], [200, 760], [260, 740], [320, 770]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="12" ry="22" fill={C.mudGrayDark} transform={`rotate(-20 ${x} ${y})`} />
      ))}

      {/* The boat, lying on its side with its hull toward us */}
      <g transform="rotate(-6 800 600)">
        <path d="M330,470 Q340,640 520,700 L1060,700 Q1180,660 1210,470 Z" fill={C.hull} {...O} />
        <path d="M360,560 Q400,670 540,700 L1040,700 Q1150,670 1190,560 Z" fill={C.hullDark} />
        <path d="M330,470 L1210,470 L1210,496 L330,496 Z" fill={C.hullRed} {...O} />
        {/* The painted eyes at the bow */}
        <g transform="translate(400 520)">
          <ellipse rx="30" ry="18" fill="#f3e4c4" {...O} />
          <circle r="10" fill={LINE} />
        </g>
        {/* Cabin roof (mui) with two life-jacket hooks (hotspot ghe-moc at 480,414) */}
        <path d="M420,470 L440,380 L720,380 L740,470 Z" fill={C.wood} {...O} />
        <path d="M430,380 Q580,350 730,380 Z" fill={C.woodDark} {...O} />
        <path d="M466,392 v20 q0,10 -10,10" fill="none" stroke={C.metal} strokeWidth="5" strokeLinecap="round" />
        <path d="M506,392 v20 q0,10 -10,10" fill="none" stroke={C.metal} strokeWidth="5" strokeLinecap="round" />
        <path d="M454,422 h24 l4,46 h-32 Z" fill="#2f6a8a" {...O} strokeWidth={2.5} />
        {/* Engine at the stern (hotspot ghe-may at 1056,468) */}
        <rect x="1000" y="410" width="120" height="70" rx="10" fill={C.metal} {...O} />
        <rect x="1016" y="424" width="44" height="30" rx="4" fill={C.metalDark} />
        <circle cx="1090" cy="440" r="14" fill={accent.rust} {...O} strokeWidth={2} />
        <path d="M1120,450 L1200,520" stroke={C.metalDark} strokeWidth="12" strokeLinecap="round" />
        {/* The drain hole near the keel (hotspot ghe-lu at 736,666) */}
        <circle cx="740" cy="660" r="14" fill={LINE} />
        <circle cx="740" cy="660" r="20" fill="none" stroke={C.woodLit} strokeWidth="4" />
      </g>
      <Glow x={740} y={660} r={60} o={0.25} color="#fff1c9" />

      {/* Coiled dry net (hotspot ghe-luoi at 1312,684) */}
      <g {...O} strokeWidth={2.5}>
        <ellipse cx="1312" cy="700" rx="110" ry="40" fill="#8b8a5a" />
        <ellipse cx="1312" cy="684" rx="80" ry="26" fill="#a6a46c" />
        <path d="M1240,690 q72,-30 144,0 M1260,700 q52,-20 104,0" fill="none" stroke={shade('#8b8a5a', -0.4)} />
      </g>
      {/* Bamboo poles stuck in the mud */}
      {[120, 150, 1520].map((x) => (
        <line key={x} x1={x} y1="560" x2={x + 10} y2="360" stroke={C.woodLit} strokeWidth="9" strokeLinecap="round" />
      ))}
      <Smear x={960} y={550} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. The vựa's office

function Office() {
  return (
    <Frame label="Văn phòng vựa hải sản, vách gỗ, két sắt và lịch con nước">
      {/* Plank walls */}
      <rect width="1600" height="900" fill={C.woodDark} />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={i * 80} y="0" width="76" height="640" fill={i % 2 ? C.wood : shade(C.wood, -0.08)} />
      ))}
      <Glow x={760} y={300} r={560} o={0.35} />
      {/* Window to the river, right */}
      <g {...O}>
        <rect x="1100" y="140" width="320" height="220" fill="#7f8f9c" />
        <rect x="1100" y="270" width="320" height="90" fill={C.river} />
        <path d="M1260,140 V360 M1100,250 H1420" stroke={C.woodDark} strokeWidth="10" />
      </g>
      {/* Floor */}
      <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill={shade(C.wood, -0.25)} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="0" y1={660 + i * 40} x2="1600" y2={660 + i * 40} stroke={C.woodDark} strokeWidth="3" />
      ))}
      <Bulb x={760} y={140} />
      <Beam x={760} y={150} w={900} h={600} o={0.22} />

      {/* Tide calendar pinned to the wall (hotspot vp-lich at 896,270) */}
      <g {...O} strokeWidth={2.5}>
        <rect x="820" y="170" width="160" height="200" fill="#f3e4c4" />
        <rect x="820" y="170" width="160" height="40" fill={accent.red} />
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => <rect key={`${r}${c}`} x={832 + c * 24} y={222 + r * 28} width="18" height="20" fill="none" stroke={shade(ink.paper, -0.3)} strokeWidth="1" />),
        )}
        <circle cx="889" cy="260" r="16" fill="none" stroke="#2f4258" strokeWidth="3" />
      </g>
      <text x="900" y="198" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">CON NƯỚC · 9</text>

      {/* Desk with the ledger (hotspot vp-so at 672,594) */}
      <g {...O}>
        <rect x="500" y="540" width="460" height="30" fill={C.woodLit} />
        <rect x="520" y="570" width="24" height="200" fill={C.woodDark} />
        <rect x="916" y="570" width="24" height="200" fill={C.woodDark} />
        <path d="M600,540 L640,510 L760,510 L740,540 Z" fill="#e7d2a8" />
        <path d="M670,510 L690,540" stroke={shade(ink.paper, -0.3)} strokeWidth="2" />
        <rect x="800" y="500" width="60" height="40" rx="4" fill="#3a332f" />
      </g>

      {/* Open safe (hotspot vp-ket at 384,558) */}
      <g {...O}>
        <rect x="270" y="440" width="220" height="250" rx="10" fill={C.metalDark} />
        <rect x="290" y="460" width="180" height="210" rx="6" fill="#2a2522" />
        <path d="M270,450 L170,420 L170,690 L270,690 Z" fill={C.metal} />
        <circle cx="210" cy="550" r="22" fill={C.metalDark} />
        <rect x="320" y="560" width="120" height="40" rx="4" fill="#9e2b22" />
        <rect x="310" y="620" width="70" height="30" fill="#e7d2a8" />
      </g>

      {/* Scale on the right (hotspot vp-can at 1280,594) */}
      <g {...O}>
        <rect x="1180" y="620" width="200" height="140" rx="8" fill={C.metal} />
        <rect x="1160" y="590" width="240" height="30" rx="6" fill={C.metalDark} />
        <circle cx="1280" cy="680" r="44" fill="#f3e4c4" />
        <path d="M1280,680 L1280,644" stroke={accent.red} strokeWidth="4" />
      </g>
      {/* Styrofoam boxes stacked by the door */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="20" y={560 + i * 70} width="130" height="66" rx="4" fill="#ece6da" {...O} />
      ))}
      <Paper x={1408} y={260} color="#e8c84a" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Lực's house

function House() {
  return (
    <Frame label="Nhà ông Lực, bàn thờ có di ảnh, tủ quần áo và giường">
      <rect width="1600" height="900" fill={C.wallYellow} />
      <rect y="0" width="1600" height="60" fill={C.wallYellowDark} />
      <Glow x={800} y={240} r={520} o={0.35} />
      {/* Tiled floor */}
      <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#a8604a" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 200} y1="640" x2={i * 200 - 100} y2="900" stroke="#8a4a38" strokeWidth="3" />
      ))}
      <line x1="0" y1="740" x2="1600" y2="740" stroke="#8a4a38" strokeWidth="3" />

      {/* Altar on a high shelf with the portrait (hotspot nha-tho at 800,234) */}
      <g {...O}>
        <rect x="600" y="300" width="400" height="30" fill={C.woodDark} />
        <rect x="620" y="100" width="360" height="200" fill="#9e2b22" />
        <rect x="740" y="130" width="120" height="150" fill={accent.gold} />
        <rect x="752" y="142" width="96" height="126" fill="#d8cdb6" />
        <circle cx="800" cy="192" r="28" fill="#b9815a" />
        <path d="M760,268 Q800,220 840,268 Z" fill="#6b6a35" />
        <rect x="640" y="250" width="40" height="50" rx="4" fill={accent.gold} />
        <ellipse cx="930" cy="296" rx="44" ry="8" fill="#f3e4c4" />
        <circle cx="914" cy="282" r="14" fill={accent.amber} />
        <circle cx="942" cy="280" r="14" fill="#9fbf5a" />
        {[650, 660, 670].map((x) => (
          <line key={x} x1={x} y1="250" x2={x + 2} y2="200" stroke="#e8dcc4" strokeWidth="2" />
        ))}
      </g>
      <Glow x={660} y={210} r={60} o={0.5} color={accent.ember} />

      {/* Wardrobe (hotspot nha-tu at 256,414) */}
      <g {...O}>
        <rect x="120" y="180" width="280" height="470" rx="6" fill={C.wood} />
        <path d="M260,190 V640" stroke={C.woodDark} strokeWidth="4" />
        <circle cx="244" cy="420" r="7" fill={accent.gold} />
        <circle cx="276" cy="420" r="7" fill={accent.gold} />
        <rect x="140" y="200" width="100" height="160" rx="4" fill="#c9b27a" opacity="0.5" />
      </g>

      {/* Bed with the charging phone (hotspot nha-dt at 576,576) */}
      <g {...O}>
        <rect x="420" y="560" width="520" height="100" rx="8" fill="#e7d2a8" />
        <rect x="420" y="640" width="520" height="40" fill={C.woodDark} />
        <rect x="440" y="540" width="140" height="40" rx="14" fill="#f3e4c4" />
        <rect x="560" y="556" width="34" height="56" rx="6" fill="#1c130f" />
        <rect x="565" y="562" width="24" height="40" rx="3" fill="#3f8a7e" />
        <path d="M577,612 Q580,650 640,660" fill="none" stroke="#f3e4c4" strokeWidth="3" />
      </g>

      {/* Cabinet with the medicine box (hotspot nha-thuoc at 1120,468) */}
      <g {...O}>
        <rect x="1000" y="500" width="300" height="160" rx="6" fill={C.wood} />
        <path d="M1150,510 V650" stroke={C.woodDark} strokeWidth="4" />
        <rect x="1080" y="430" width="90" height="70" rx="4" fill="#f6efe2" />
        <rect x="1080" y="430" width="90" height="20" fill="#3f8a7e" />
        <rect x="1200" y="420" width="40" height="80" rx="6" fill="#cfc6b2" />
        <rect x="1250" y="460" width="30" height="40" rx="4" fill={accent.rust} />
      </g>
      {/* Wall clock and calendar */}
      <g {...O}>
        <circle cx="1400" cy="220" r="60" fill="#f6efe2" />
        <path d="M1400,220 V180 M1400,220 L1428,232" strokeWidth="5" />
      </g>
      <Paper x={1344} y={660} color="#d9c7e0" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Rạch Đước, the mangrove creek

function Creek() {
  return (
    <Frame label="Rạch Đước giữa rừng đước lúc sáng sớm, bùn đỏ và rễ cây">
      <DawnSky horizon={420} />
      <Glow x={820} y={380} r={420} o={0.35} color="#ffcf8a" />
      <FarMangroves y={360} seed={11} />
      <FarMangroves y={400} seed={5} color={C.leaf} />
      {/* Narrow creek winding into the forest */}
      <path d="M560,420 Q800,410 1040,420 L1240,620 Q800,660 340,620 Z" fill={C.river} />
      <path d="M620,430 Q800,424 980,430" stroke="#c9d3c6" strokeWidth="3" fill="none" opacity="0.4" />
      <Mist y={440} o={0.3} />

      {/* Red mud banks */}
      <path d="M0,420 L560,420 L340,620 Q200,700 0,700 Z" fill={C.mudRed} />
      <path d="M1600,420 L1040,420 L1240,620 Q1400,680 1600,680 Z" fill={C.mudRed} />
      <path d="M0,620 Q400,640 800,660 Q1200,640 1600,620 L1600,900 L0,900 Z" fill={C.mudRed} />
      <path d="M0,760 Q500,740 900,780 T1600,760 L1600,900 L0,900 Z" fill={C.mudRedDark} opacity="0.6" />

      {/* Mangrove trees with stilt roots */}
      <Crown x={200} y={120} r={200} seed={2} />
      <Roots x={230} y={600} w={360} h={170} />
      <Crown x={1380} y={110} r={210} seed={4} />
      <Roots x={1360} y={580} w={360} h={160} />
      <Crown x={760} y={230} r={110} seed={6} />
      <Roots x={760} y={440} w={160} h={70} />

      {/* Orange strip snagged on a root (hotspot rach-phao at 448,468) */}
      <path d="M430,452 l40,8 l-6,18 l-26,4 l6,-12 Z" fill={accent.ember} {...O} strokeWidth={2} />

      {/* Stump with cigarette ends (hotspot rach-thuoc at 992,630) */}
      <g {...O}>
        <path d="M930,660 L940,600 L1050,600 L1060,660 Z" fill={C.woodLit} />
        <ellipse cx="995" cy="600" rx="56" ry="14" fill="#c9a274" />
        {[960, 980, 1000, 1020, 1036].map((x) => (
          <rect key={x} x={x} y="592" width="12" height="5" rx="2" fill="#f3e4c4" strokeWidth={1.2} />
        ))}
      </g>

      {/* Boat-nose dent and a drag mark into the water (hotspot rach-bun at 736,738) */}
      <path d="M640,780 Q700,740 760,760 Q720,720 680,720 Z" fill={C.mudRedDark} />
      <path d="M760,800 Q740,720 700,640" stroke={C.mudRedDark} strokeWidth="34" fill="none" strokeLinecap="round" opacity="0.8" />

      {/* Broken bamboo pole wedged in the roots (hotspot rach-sao at 1280,522) */}
      <g>
        <line x1="1180" y1="600" x2="1330" y2="470" stroke="#c9b27a" strokeWidth="14" strokeLinecap="round" />
        <path d="M1326,466 l14,-10 l-4,14 l10,0 l-16,10 Z" fill="#f3e4c4" stroke={LINE} strokeWidth="2" />
        {[1210, 1250, 1290].map((x, i) => (
          <line key={x} x1={x} y1={574 - i * 35} x2={x + 6} y2={584 - i * 35} stroke={LINE} strokeWidth="3" />
        ))}
      </g>

      {/* Crab holes (hotspot rach-cua at 192,684) */}
      {[[160, 690], [200, 670], [230, 700], [130, 720]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="12" ry="6" fill={C.mudRedDark} stroke={LINE} strokeWidth="2" />
      ))}
      <Bottle x={1440} y={720} color="#9aa3a8" />
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'ben-ghe': Landing,
  'van-phong': Office,
  nha: House,
  rach: Creek,
}
