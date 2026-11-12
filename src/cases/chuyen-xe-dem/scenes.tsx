import { useId } from 'react'
import { accent, ink, shade } from '@/art/palette'
import { rng } from '@/art/primitives'
import { Frame, Glow } from '@/art/soft'
import { Paper } from '@/art/noiseProps'

// Backdrops for the four zones of Chapter 4, in the soft flat style of the
// earlier chapters. Objects sit near their hotspot positions in case.json
// (percent of 1600 x 900).

export const LINE = ink.night
export const O = { stroke: LINE, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export const C = {
  skyTop: '#22304a',
  skyMid: '#5a5a74',
  skyLow: '#e0a070',
  nightTop: '#141a2c',
  nightLow: '#34405a',
  dirt: '#a5512f',
  dirtDark: '#7a3a22',
  dirtLit: '#c46a40',
  sand: '#ece4cf',
  sandDark: '#cfc3a4',
  asphalt: '#3b3d42',
  asphaltLit: '#56585e',
  grass: '#5d6b3a',
  grassDark: '#414c28',
  cab: '#2f6f8f',
  cabDark: '#22516a',
  box: '#b5452f',
  boxDark: '#8a3220',
  boxLit: '#cf6a48',
  tyre: '#24221f',
  metal: '#7a7f83',
  metalDark: '#4b5054',
  cactus: '#5f8a3e',
  cactusDark: '#40652a',
  fruit: '#d6336c',
  sack: '#cdb487',
  sackDark: '#a68d60',
  pepper: '#2a2018',
  tin: '#8d9396',
  tinDark: '#686e72',
  wood: '#7a4f32',
  woodDark: '#573721',
  woodLit: '#9a6a44',
}

function Sky({ horizon, top = C.skyTop, mid = C.skyMid, low = C.skyLow }: { horizon: number; top?: string; mid?: string; low?: string }) {
  const id = useId()
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="0.6" stopColor={mid} />
          <stop offset="1" stopColor={low} />
        </linearGradient>
      </defs>
      <rect width="1600" height={horizon} fill={`url(#${id})`} />
    </g>
  )
}

/** A dragon-fruit plant on its concrete post: a mop of hanging stems with a few pink fruits. */
export function DragonFruit({ x, y, s = 1, seed = 1 }: { x: number; y: number; s?: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-8" y="-150" width="16" height="150" fill="#9a9488" stroke={LINE} strokeWidth="2.5" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = -1.2 + (i / 8) * 2.4
        const ex = Math.sin(a) * 70, ey = -100 + Math.cos(a) * 30
        return <path key={i} d={`M0,-160 Q${ex * 0.6},-200 ${ex},${ey}`} fill="none" stroke={i % 2 ? C.cactus : C.cactusDark} strokeWidth="14" strokeLinecap="round" />
      })}
      {Array.from({ length: 3 }, (_, i) => (
        <ellipse key={i} cx={(r() - 0.5) * 100} cy={-110 - r() * 40} rx="11" ry="14" fill={C.fruit} stroke={LINE} strokeWidth="2" />
      ))}
    </g>
  )
}

/** A wheel with hub, seen from the side. */
export function Wheel({ x, y, r = 54 }: { x: number; y: number; r?: number }) {
  return (
    <g {...O}>
      <circle cx={x} cy={y} r={r} fill={C.tyre} />
      <circle cx={x} cy={y} r={r * 0.5} fill={C.metal} />
      <circle cx={x} cy={y} r={r * 0.16} fill={C.metalDark} />
    </g>
  )
}

/** Stack of jute pepper sacks, `rows` high, starting at (x, y) bottom-left. */
export function Sacks({ x, y, cols, rows, label }: { x: number; y: number; cols: number; rows: number; label?: string }) {
  return (
    <g {...O} strokeWidth={2.5}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols - (r % 2 ? 1 : 0) }, (_, c) => {
          const sx = x + c * 110 + (r % 2 ? 55 : 0), sy = y - (r + 1) * 56
          return (
            <g key={`${r}-${c}`}>
              <rect x={sx} y={sy} width="106" height="54" rx="18" fill={(r + c) % 2 ? C.sack : shade(C.sack, -0.06)} />
              <path d={`M${sx + 14},${sy + 14} q40,-8 78,0`} fill="none" stroke={C.sackDark} strokeWidth="2" />
              {label && r === 0 && (
                <text x={sx + 53} y={sy + 38} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7d2f2a" stroke="none" fontFamily="Barlow Condensed, sans-serif">
                  {label}
                </text>
              )}
            </g>
          )
        }),
      )}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Where the empty truck was left: a red dirt road among dragon-fruit fields

function Dumped() {
  return (
    <Frame label="Chiếc container trống nằm trên đường đất đỏ giữa rẫy thanh long lúc sáng sớm">
      <Sky horizon={420} />
      <Glow x={1200} y={400} r={380} o={0.4} color="#ffcf8a" />
      {/* Far hills and fields */}
      <path d="M0,400 Q300,340 600,380 T1200,370 T1600,380 L1600,440 L0,440 Z" fill="#5a5f4a" />
      <rect y="420" width="1600" height="120" fill={C.grassDark} />
      {Array.from({ length: 14 }, (_, i) => (
        <DragonFruit key={i} x={60 + i * 120} y={470} s={0.45} seed={i + 3} />
      ))}
      {/* Red dirt road */}
      <path d="M0,520 L1600,500 L1600,900 L0,900 Z" fill={C.dirt} />
      <path d="M0,700 Q600,680 1600,720 L1600,900 L0,900 Z" fill={C.dirtDark} opacity="0.5" />
      {[[200, 800], [520, 760], [980, 820], [1300, 780]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="60" ry="10" fill={C.dirtDark} opacity="0.6" />
      ))}
      {/* Near dragon-fruit plants framing the shot */}
      <DragonFruit x={1540} y={640} s={1.1} seed={9} />

      {/* Container trailer side, facing left */}
      <g {...O}>
        <rect x="470" y="250" width="700" height="410" fill={C.box} />
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={490 + i * 40} y1="262" x2={490 + i * 40} y2="648" stroke={C.boxDark} strokeWidth="4" />
        ))}
        <rect x="470" y="250" width="700" height="18" fill={C.boxLit} />
        <rect x="460" y="660" width="740" height="26" fill={C.metalDark} />
      </g>
      <text x="820" y="320" textAnchor="middle" fontSize="40" fontWeight="700" fill="#f3e4c4" opacity="0.85" fontFamily="Barlow Condensed, sans-serif">
        KIỀU PHÁT LOGISTICS
      </text>
      {/* Rear end in perspective, doors swung open */}
      <g {...O}>
        <path d="M1170,250 L1300,280 L1300,640 L1170,660 Z" fill="#1e1612" />
        {/* Floor planks inside (hotspot bx-san at 1376,594) */}
        <path d="M1170,660 L1300,640 L1440,610 L1310,640 Z" fill="#8a6a46" />
        <path d="M1180,656 L1420,612 M1200,652 L1430,616" stroke={shade('#8a6a46', -0.3)} strokeWidth="2" />
        {/* Left door swung out toward us */}
        <path d="M1170,250 L1290,190 L1290,700 L1170,660 Z" fill={C.boxDark} />
        <path d="M1200,240 V670 M1250,215 V690" stroke={shade(C.boxDark, -0.3)} strokeWidth="5" />
        {/* Right door folded back */}
        <path d="M1300,280 L1420,250 L1420,600 L1300,640 Z" fill={C.box} />
      </g>
      {/* Cut seal hanging from the lock rod (hotspot bx-chi at 1184,450) */}
      <g>
        <rect x="1176" y="380" width="10" height="150" fill={C.metal} stroke={LINE} strokeWidth="2" />
        <path d="M1186,446 q16,6 10,28" fill="none" stroke="#e8e0d0" strokeWidth="3" />
        <rect x="1188" y="468" width="20" height="14" rx="3" fill={accent.gold} stroke={LINE} strokeWidth="2" />
      </g>
      <Glow x={1196} y={470} r={50} o={0.3} color="#fff1c9" />
      {/* Trailer wheels (hotspot bx-banh at 672,702) */}
      <Wheel x={640} y={700} />
      <Wheel x={760} y={700} />
      <Wheel x={1060} y={700} />

      {/* Cab */}
      <g {...O}>
        <path d="M120,700 L120,330 Q120,250 200,240 L440,236 L460,700 Z" fill={C.cab} />
        <path d="M120,560 L460,560 L460,700 L120,700 Z" fill={C.cabDark} />
        <path d="M150,280 L300,270 L300,420 L150,430 Z" fill="#9fc0d0" />
        <path d="M320,268 L430,262 L436,420 L320,420 Z" fill="#9fc0d0" />
        <rect x="100" y="600" width="60" height="70" rx="6" fill={C.metal} />
        <rect x="110" y="480" width="34" height="22" rx="4" fill="#fff1c9" />
        {/* GPS box on the roof (hotspot bx-gps at 416,252) */}
        <rect x="380" y="214" width="70" height="24" rx="5" fill={C.metalDark} />
        <circle cx="440" cy="226" r="5" fill="#7fe08a" stroke="none" />
      </g>
      {/* Dark lump under the passenger seat, seen through the window (hotspot bx-cabin at 288,414) */}
      <rect x="250" y="390" width="40" height="26" rx="4" fill="#1c130f" />
      {[256, 268, 280].map((x) => (
        <line key={x} x1={x} y1="390" x2={x - 4} y2="370" stroke="#1c130f" strokeWidth="3" />
      ))}
      <Wheel x={240} y={700} />
      <Wheel x={400} y={700} />
      <text x="290" y="640" textAnchor="middle" fontSize="22" fontWeight="700" fill="#f3e4c4" fontFamily="IBM Plex Mono, monospace">
        47H-•••
      </text>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. The roadside on Highway 1A where the driver was found tied up

function Roadside() {
  const rStars = rng(40), rGrass = rng(7)
  return (
    <Frame label="Lề Quốc lộ 1A ở Hàm Thuận Nam trước rạng sáng, cột cây số và quán nước đóng cửa">
      <Sky horizon={460} top={C.nightTop} mid={C.nightLow} low="#a8786a" />
      {Array.from({ length: 30 }, (_, i) => {
        const r = rStars
        return <circle key={i} cx={r() * 1600} cy={r() * 260} r={1.5 + r() * 1.5} fill="#f3e4c4" opacity="0.6" />
      })}
      <path d="M0,440 Q400,400 800,430 T1600,420 L1600,470 L0,470 Z" fill="#2a3326" />
      {/* Power poles along the road */}
      {[260, 640, 1020, 1400].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={470} x2={x} y2={170 + i * 10} stroke="#2a2522" strokeWidth="10" />
          <line x1={x - 40} y1={190 + i * 10} x2={x + 40} y2={190 + i * 10} stroke="#2a2522" strokeWidth="6" />
        </g>
      ))}
      <path d="M0,200 Q450,240 640,210 T1400,226 L1600,214" fill="none" stroke="#2a2522" strokeWidth="2" />
      {/* Grass verges */}
      <rect y="460" width="1600" height="440" fill={C.grassDark} />
      {/* The road, running from the left foreground into the distance */}
      <path d="M0,520 L1600,470 L1600,610 L0,760 Z" fill={C.asphalt} {...O} />
      <path d="M0,640 L1600,540" stroke="#f3e4c4" strokeWidth="6" strokeDasharray="60 50" />
      <path d="M0,530 L1600,476" stroke="#f3e4c4" strokeWidth="4" opacity="0.6" />
      {/* Clean road surface where a skid would be (hotspot ld-phanh at 448,558) */}
      <path d="M300,600 L700,560" stroke={C.asphaltLit} strokeWidth="30" opacity="0.4" strokeLinecap="round" />
      {/* Grass foreground */}
      <path d="M0,760 L1600,610 L1600,900 L0,900 Z" fill={C.grass} />
      {Array.from({ length: 60 }, (_, i) => {
        const r = rGrass
        const x = r() * 1600, y = 700 + r() * 200
        return <path key={i} d={`M${x},${y} l-6,-22 M${x},${y} l4,-26 M${x},${y} l12,-18`} stroke={C.grassDark} strokeWidth="3" fill="none" />
      })}
      {/* Strips of grey tape in the grass (hotspot ld-bang at 704,684) */}
      <g {...O} strokeWidth={2}>
        <path d="M640,690 l60,-12 l4,12 l-60,12 Z" fill="#a9a9a2" />
        <path d="M700,700 q30,10 60,-6 l4,10 q-30,16 -64,6 Z" fill="#9a9a92" />
        <path d="M660,720 l50,4 l-2,12 l-50,-4 Z" fill="#b3b3ab" />
      </g>
      <Glow x={700} y={700} r={90} o={0.25} color="#fff1c9" />
      {/* Guard post with the driver's jacket, wallet and phone (hotspot ld-vi at 1056,540) */}
      <g {...O}>
        <rect x="1040" y="500" width="26" height="160" fill="#f3e4c4" />
        <rect x="1040" y="620" width="26" height="20" fill={accent.red} />
        {/* Jacket hung over the post: shoulders, body, two sleeves */}
        <path d="M1008,530 Q1053,490 1098,530 L1094,600 L1012,600 Z" fill="#3a332f" />
        <path d="M1008,530 L992,610 L1010,612 L1020,560 Z M1098,530 L1114,610 L1096,612 L1086,560 Z" fill={shade('#3a332f', -0.2)} />
        <path d="M1053,506 L1053,600" stroke={shade('#3a332f', 0.25)} strokeWidth="2" />
        {/* Wallet and phone set down on the verge */}
        <rect x="1000" y="664" width="44" height="28" rx="4" fill="#5a3a24" />
        <rect x="1070" y="660" width="22" height="38" rx="4" fill="#1c130f" transform="rotate(12 1081 679)" />
      </g>
      {/* Kilometre post (hotspot ld-cot at 1344,504) */}
      <g {...O}>
        <path d="M1310,560 L1310,470 Q1344,440 1378,470 L1378,560 Z" fill="#f3e4c4" />
        <path d="M1310,470 Q1344,440 1378,470 L1378,490 L1310,490 Z" fill={accent.red} />
      </g>
      <text x="1344" y="520" textAnchor="middle" fontSize="16" fontWeight="700" fill={LINE} fontFamily="Barlow Condensed, sans-serif">P.THIẾT</text>
      <text x="1344" y="544" textAnchor="middle" fontSize="20" fontWeight="700" fill={LINE} fontFamily="Barlow Condensed, sans-serif">18</text>
      {/* Shuttered drinks stall (hotspot ld-quan at 192,414) */}
      <g {...O}>
        <rect x="80" y="340" width="240" height="150" fill={C.tinDark} />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={88 + i * 20} y1="350" x2={88 + i * 20} y2="486" stroke={shade(C.tinDark, -0.3)} strokeWidth="3" />
        ))}
        <path d="M60,346 L200,290 L340,346 Z" fill={accent.teal} />
        <rect x="120" y="430" width="70" height="40" fill="#cfa45a" />
      </g>
      <text x="200" y="330" textAnchor="middle" fontSize="18" fontWeight="700" fill="#f3e4c4" fontFamily="Barlow Condensed, sans-serif">NƯỚC MÍA</text>
      <Paper x={224} y={700} color="#d9d2c2" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. The Đất Đỏ pepper warehouse in Buôn Ma Thuột

function PepperStore() {
  return (
    <Frame label="Kho tiêu Đất Đỏ ở Buôn Ma Thuột, bảng giá phấn, bàn làm việc và chồng bao tiêu">
      <rect width="1600" height="900" fill={C.tinDark} />
      {Array.from({ length: 50 }, (_, i) => (
        <line key={i} x1={i * 32 + 8} y1="0" x2={i * 32 + 8} y2="640" stroke={shade(C.tinDark, -0.25)} strokeWidth="4" />
      ))}
      {/* Roof truss */}
      <path d="M0,140 L800,40 L1600,140" fill="none" stroke={C.woodDark} strokeWidth="16" />
      {[200, 500, 800, 1100, 1400].map((x) => (
        <line key={x} x1={x} y1={x < 800 ? 140 - (x / 800) * 100 : 40 + ((x - 800) / 800) * 100} x2={x} y2="150" stroke={C.woodDark} strokeWidth="8" />
      ))}
      <Glow x={760} y={320} r={600} o={0.38} />
      {/* Concrete floor */}
      <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#8f877a" />
      <path d="M0,760 L1600,760" stroke="#7a7266" strokeWidth="3" />
      {/* Chalk price board (hotspot kd-bang at 352,270) */}
      <g {...O}>
        <rect x="200" y="160" width="300" height="220" fill="#2c3b33" />
        <rect x="200" y="160" width="300" height="220" fill="none" stroke={C.wood} strokeWidth="12" />
      </g>
      <g fill="#f3efe4" fontFamily="Bitter, serif">
        <text x="350" y="210" textAnchor="middle" fontSize="22">GIÁ TIÊU HÔM NAY</text>
        <text x="350" y="270" textAnchor="middle" fontSize="44" fontWeight="700">152.000</text>
        <text x="350" y="304" textAnchor="middle" fontSize="18">đ/kg · tiêu đen 500g/l</text>
        <text x="420" y="350" textAnchor="middle" fontSize="15" opacity="0.7">(đầu năm 98)</text>
      </g>
      {/* Ceiling camera (hotspot kd-cam at 1376,198) */}
      <g {...O} strokeWidth={2.5}>
        <rect x="1360" y="150" width="14" height="30" fill={C.metal} />
        <path d="M1340,180 L1410,180 L1404,214 L1346,214 Z" fill="#e8e4dc" />
        <circle cx="1376" cy="214" r="9" fill="#1c130f" />
      </g>
      <text x="1376" y="250" textAnchor="middle" fontSize="13" fill="#f3e4c4" opacity="0.6" fontFamily="IBM Plex Mono, monospace">hỏng</text>
      {/* Pepper sack stack (hotspot kd-bao at 1216,594) */}
      <Sacks x={1000} y={720} cols={5} rows={4} label="ĐẤT ĐỎ · DD-1103" />
      {/* Desk with calculator and teapot (hotspot kd-ban at 576,594), seal ledger (kd-so at 832,558) */}
      <g {...O}>
        <rect x="460" y="560" width="480" height="30" fill={C.wood} />
        <rect x="480" y="590" width="24" height="170" fill={C.woodDark} />
        <rect x="896" y="590" width="24" height="170" fill={C.woodDark} />
        <rect x="540" y="528" width="70" height="34" rx="4" fill="#3a332f" />
        <ellipse cx="660" cy="546" rx="34" ry="18" fill="#9fbf9a" />
        <path d="M770,560 L800,524 L900,524 L880,560 Z" fill="#e7d2a8" />
        <path d="M835,524 L840,560" stroke={shade(ink.paper, -0.3)} strokeWidth="2" />
      </g>
      {/* A coil of seals on the ledger */}
      <g stroke={LINE} strokeWidth="2">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={866 + i * 12} y={512 - i * 4} width="12" height="10" rx="2" fill={accent.gold} />
        ))}
      </g>
      <Glow x={830} y={540} r={80} o={0.25} color="#fff1c9" />
      {/* Pallets */}
      <g {...O} strokeWidth={2.5}>
        {[0, 1].map((i) => (
          <rect key={i} x={100} y={760 - i * 22} width="260" height="20" fill={C.woodLit} />
        ))}
      </g>
      <Paper x={960} y={322} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. The rented warehouse near Phan Rí, among white sand dunes

function SandStore() {
  const rPepper = rng(90)
  return (
    <Frame label="Nhà kho mái tôn giữa đồi cát trắng gần Phan Rí, nền cát vương hạt tiêu">
      <rect width="1600" height="900" fill={C.tinDark} />
      {Array.from({ length: 50 }, (_, i) => (
        <line key={i} x1={i * 32 + 8} y1="0" x2={i * 32 + 8} y2="660" stroke={shade(C.tinDark, -0.3)} strokeWidth="4" />
      ))}
      {/* Wide open doorway onto the dunes and the gate */}
      <g>
        <rect x="40" y="160" width="520" height="500" fill={C.skyLow} />
        <rect x="40" y="160" width="520" height="260" fill="#88a6c0" />
        <path d="M40,420 Q200,330 360,380 T560,360 L560,660 L40,660 Z" fill={C.sand} />
        <path d="M40,500 Q260,450 560,500 L560,660 L40,660 Z" fill={C.sandDark} />
        <rect x="40" y="160" width="520" height="500" fill="none" stroke={LINE} strokeWidth="6" />
      </g>
      {/* Gate posts with a small camera (hotspot pr-cong at 224,378) */}
      <g {...O}>
        <rect x="150" y="330" width="26" height="250" fill="#d8d0c0" />
        <rect x="290" y="330" width="26" height="250" fill="#d8d0c0" />
        <path d="M176,380 H290 M176,440 H290 M176,500 H290 M176,560 H290" stroke={C.metalDark} strokeWidth="6" />
        {[200, 230, 260].map((x) => (
          <line key={x} x1={x} y1="380" x2={x} y2="560" stroke={C.metalDark} strokeWidth="4" />
        ))}
        <rect x="150" y="300" width="40" height="22" rx="4" fill="#e8e4dc" />
        <circle cx="170" cy="322" r="6" fill="#1c130f" />
      </g>
      <Glow x={300} y={420} r={360} o={0.35} color="#fff1c9" />
      {/* Roof beam */}
      <rect x="0" y="120" width="1600" height="30" fill={C.woodDark} />
      {/* Post with a torn sack on a nail (hotspot pr-the at 1120,558) */}
      <g {...O}>
        <rect x="1080" y="140" width="40" height="560" fill={C.wood} />
        <path d="M1096,500 L1180,512 L1170,600 L1124,580 L1100,610 Z" fill={C.sack} />
        <text x="1138" y="556" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7d2f2a" stroke="none" fontFamily="Barlow Condensed, sans-serif" transform="rotate(6 1138 556)">
          ĐẤT ĐỎ
        </text>
      </g>
      {/* Sandy concrete floor with spilled pepper and forklift tracks (hotspot pr-hat at 704,720) */}
      <path d="M0,660 L1600,660 L1600,900 L0,900 Z" fill="#b9b1a0" />
      <path d="M0,660 Q300,700 600,680 T1200,700 T1600,690 L1600,900 L0,900 Z" fill={C.sand} opacity="0.75" />
      {[[500, 700], [560, 760], [420, 820]].map(([x, y]) => (
        <path key={x} d={`M${x},${y} L${x + 460},${y + 20}`} stroke="#8a826f" strokeWidth="18" opacity="0.5" />
      ))}
      {Array.from({ length: 140 }, (_, i) => {
        const r = rPepper
        return <circle key={i} cx={300 + r() * 900} cy={680 + r() * 200} r={2 + r() * 2.5} fill={C.pepper} />
      })}
      <Glow x={700} y={740} r={140} o={0.2} color="#fff1c9" />
      {/* Old forklift parked at the back */}
      <g {...O}>
        <rect x="700" y="420" width="180" height="150" rx="10" fill={accent.gold} />
        <rect x="730" y="350" width="10" height="80" fill={C.metalDark} />
        <rect x="840" y="350" width="10" height="80" fill={C.metalDark} />
        <rect x="730" y="346" width="120" height="10" fill={C.metalDark} />
        <rect x="640" y="380" width="14" height="220" fill={C.metalDark} />
        <rect x="600" y="580" width="90" height="12" fill={C.metalDark} />
        <circle cx="740" cy="590" r="30" fill={C.tyre} />
        <circle cx="860" cy="590" r="30" fill={C.tyre} />
      </g>
      {/* Food boxes and bottles on an upturned crate (hotspot pr-chai at 1376,504) */}
      <g {...O} strokeWidth={2.5}>
        <rect x="1280" y="520" width="200" height="120" fill={C.woodDark} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={1290 + i * 62} y={486 - (i % 2) * 14} width="56" height="34" rx="4" fill="#f6efe2" />
        ))}
        {[1300, 1340, 1380, 1420, 1450].map((x) => (
          <rect key={x} x={x} y={440} width="18" height="46" rx="5" fill="#cfe6f0" opacity="0.9" />
        ))}
      </g>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'bo-xe': Dumped,
  'le-duong': Roadside,
  'kho-dd': PepperStore,
  'kho-pr': SandStore,
}
