import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 7, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  shopRed: '#9e2b22',
  shopRedDark: '#6f1d17',
  gold: '#d9b04f',
  goldLight: '#f1d27a',
  brass: '#b58a3a',
  glass: '#a9c7c4',
  velvet: '#5a1f2c',
  tile: '#d8cbb2',
  tileDark: '#bfae90',
  redMud: '#9a4a2a',
  redMudDark: '#6e3119',
  wall: '#c9b99a',
  wallDark: '#9c8b6c',
  steel: '#5d6870',
  safe: '#3f4a4f',
  bikeRed: '#c2302a',
  goxe: '#3fae5a',
  raincoat: '#23262b',
  wood: '#7a4f32',
  woodDark: '#573721',
  asphalt: '#3a3c40',
  pharmacy: '#3f8a7e',
}

const display = 'Barlow Condensed, sans-serif'
const mono = 'IBM Plex Mono, monospace'

/** A plain round "nhẫn tròn trơn", seen at a slight angle. */
export function Ring({ x, y, r = 14, fake = false }: { x: number; y: number; r?: number; fake?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.62} fill="none" stroke={LINE} strokeWidth={r * 0.55 + 2} />
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.62} fill="none" stroke={fake ? '#d6b15a' : C.gold} strokeWidth={r * 0.55} />
      <path d={`M${x - r * 0.7},${y - r * 0.4} q${r * 0.4},-${r * 0.25} ${r * 0.9},-${r * 0.2}`} stroke={C.goldLight} strokeWidth={r * 0.18} fill="none" strokeLinecap="round" />
    </g>
  )
}

/** A velvet tray of rings, as laid out in a display case. */
export function Tray({ x, y, w = 160, h = 70, rings = 10, empty = false }: { x: number; y: number; w?: number; h?: number; rings?: number; empty?: boolean }) {
  const cols = Math.ceil(rings / 2)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={C.velvet} {...O} strokeWidth={2} />
      {!empty &&
        Array.from({ length: rings }, (_, i) => (
          <Ring key={i} x={x + 18 + (i % cols) * ((w - 36) / Math.max(1, cols - 1))} y={y + 22 + Math.floor(i / cols) * 28} r={9} />
        ))}
    </g>
  )
}

/** The red Exciter-style motorbike, side on. Tail light can be broken. */
export function Bike({ x, y, s = 1, broken = false }: { x: number; y: number; s?: number; broken?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-110, 110].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy="0" r="52" fill={ink.night} />
          <circle cx={wx} cy="0" r="26" fill="#8a8f94" stroke={LINE} strokeWidth="3" />
        </g>
      ))}
      <path d="M-150,-40 L-60,-90 L60,-80 L140,-60 L170,-90 L150,-40 L60,-30 L-40,-30 Z" fill={C.bikeRed} {...O} />
      <path d="M-60,-90 L-20,-110 L70,-104 L60,-80 Z" fill={ink.night} {...O} strokeWidth={2} />
      <path d="M-110,0 L-60,-60 M110,0 L80,-40" stroke={LINE} strokeWidth="8" />
      <path d="M-150,-40 L-170,-110 L-190,-112" stroke={LINE} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Tail light */}
      <path d="M150,-90 L176,-86 L170,-72 L148,-76 Z" fill={broken ? '#3a2a2a' : '#ff5a4a'} {...O} strokeWidth={2} />
      {broken && <path d="M152,-88 l8,6 l-4,6 l10,2" stroke="#ff8a7a" strokeWidth="2" fill="none" />}
      <text x="0" y="-48" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily={display}>
        EXCITER
      </text>
    </g>
  )
}

/** Faceless figure in a black rain poncho and full-face helmet. (x, y) = feet. */
export function Poncho({ x, y, h = 260, flip = false, bag = false, logo = true }: { x: number; y: number; h?: number; flip?: boolean; bag?: boolean; logo?: boolean }) {
  const s = h / 260
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="50" ry="10" fill={ink.night} opacity="0.45" />
      <path d="M-14,-60 L-16,0 L-4,0 L0,-40 L4,0 L16,0 L14,-60 Z" fill="#2b2b30" />
      <path d="M-50,-60 Q-46,-200 0,-206 Q46,-200 50,-60 Z" fill={C.raincoat} {...O} />
      {logo && <circle cx="-14" cy="-130" r="12" fill={C.goxe} opacity="0.55" />}
      <circle cx="0" cy="-232" r="32" fill="#3a3f46" {...O} />
      <path d="M-26,-240 Q0,-252 28,-238 L26,-222 Q0,-230 -26,-224 Z" fill="#14181c" />
      {bag && <path d="M40,-150 L96,-140 L104,-70 L44,-76 Z" fill="#6b6a35" {...O} />}
    </g>
  )
}

/** The shop front seen from across the street: sign, half-closed shutter, the alley beside it. */
export function ShopFront({ shutter = 0.5, night = false }: { shutter?: number; night?: boolean }) {
  const top = 300
  const bottom = 640
  const shutterY = top + (bottom - top) * shutter
  return (
    <g>
      {/* Neighbouring houses */}
      <rect x="560" y="140" width="220" height="500" fill="#b9815a" {...O} />
      <rect x="1260" y="160" width="300" height="480" fill="#8fa7a0" {...O} />
      {/* The gold shop */}
      <rect x="780" y="120" width="480" height="520" fill="#e9dcc0" {...O} />
      <rect x="800" y="180" width="440" height="90" fill={C.shopRed} {...O} />
      <text x="1020" y="246" textAnchor="middle" fontSize="62" fontWeight="700" fill={C.goldLight} fontFamily={display} letterSpacing="4">
        KIM THÀNH
      </text>
      <text x="1020" y="170" textAnchor="middle" fontSize="18" fill={C.shopRed} fontFamily={display} fontWeight="700">
        TIỆM VÀNG · MUA BÁN TRAO ĐỔI
      </text>
      <rect x="820" y={top} width="400" height={bottom - top} fill={night ? '#f4d27a' : '#5a3a26'} />
      {night && <Glow x={1020} y={600} r={260} o={0.5} />}
      <rect x="820" y={top} width="400" height={shutterY - top} fill="#9a968f" {...O} strokeWidth={2} />
      {Array.from({ length: Math.floor((shutterY - top) / 22) }, (_, i) => (
        <line key={i} x1="820" y1={top + 12 + i * 22} x2="1220" y2={top + 12 + i * 22} stroke={shade('#9a968f', -0.25)} strokeWidth="3" />
      ))}
      {/* Alley 514 between the shop and the next house */}
      <path d="M1236,640 L1236,300 L1262,300 L1262,640 Z" fill={ink.night} />
      <rect x="1196" y="300" width="60" height="30" fill="#2f4258" {...O} strokeWidth={2} />
      <text x="1226" y="321" textAnchor="middle" fontSize="15" fill="#fff" fontFamily={mono}>
        514
      </text>
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Inside the gold shop

/** Wet red-mud sandal prints. dir is the walking direction in degrees. */
function Prints({ pts }: { pts: [number, number, number][] }) {
  return (
    <g>
      {pts.map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
          <ellipse cx="0" cy={i % 2 ? 8 : -8} rx="16" ry="7" fill={C.redMud} opacity="0.85" />
          <ellipse cx="14" cy={i % 2 ? 8 : -8} rx="5" ry="5" fill={C.redMud} opacity="0.85" />
        </g>
      ))}
    </g>
  )
}

/** The trail from the back door to the middle case and out to the front shutter. */
export const TRAIL: [number, number, number][] = [
  [1360, 720, 180], [1300, 736, 180], [1240, 730, 175], [1180, 744, 170], [1120, 738, 168], [1060, 750, 165],
  [1010, 770, 120], [980, 800, 110], [960, 836, 100], [944, 872, 95],
]

function ShopInside() {
  return (
    <Frame label="Trong tiệm vàng Kim Thành, tủ kính giữa bị đập vỡ">
      <rect width="1600" height="900" fill={C.shopRed} />
      <rect width="1600" height="60" fill={C.shopRedDark} />
      {/* Gold trim and mirror panels along the back wall */}
      <rect y="380" width="1600" height="10" fill={C.gold} />
      {[620, 820, 1020].map((x) => (
        <rect key={x} x={x} y="110" width="170" height="250" fill="#c9d6d4" opacity="0.5" {...O} strokeWidth={2} />
      ))}
      <Bulb x={560} y={180} />
      <Bulb x={1060} y={180} />
      <Glow x={820} y={420} r={640} o={0.32} />
      <Beam x={820} y={190} w={900} h={560} o={0.16} />

      {/* Altar of the God of Wealth (hotspot ban-tho 480,234) */}
      <g {...O}>
        <rect x="380" y="200" width="200" height="110" fill={C.wood} />
        <rect x="370" y="300" width="220" height="16" fill={C.woodDark} />
        <rect x="410" y="226" width="56" height="70" rx="8" fill={C.gold} strokeWidth={2} />
        <rect x="494" y="226" width="56" height="70" rx="8" fill={C.gold} strokeWidth={2} />
        <rect x="470" y="250" width="20" height="44" fill="#d8cdb6" strokeWidth={2} />
      </g>
      <path d="M476,250 q-6,-24 4,-40" stroke="#e8e0c8" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Back door, right side, bolt drawn back */}
      <g {...O}>
        <rect x="1300" y="250" width="200" height="450" fill="#7d7f7a" />
        <rect x="1316" y="270" width="168" height="410" fill={shade('#7d7f7a', -0.15)} strokeWidth={2} />
        <rect x="1330" y="460" width="70" height="16" rx="4" fill="#bdb8ae" strokeWidth={2} />
      </g>
      <text x="1400" y="240" textAnchor="middle" fontSize="16" fill={C.goldLight} fontFamily={mono}>
        CỬA SAU · HẺM 514
      </text>

      {/* Safe behind the counter (hotspot ket 224,558) */}
      <g {...O}>
        <rect x="120" y="420" width="210" height="280" rx="8" fill={C.safe} />
        <rect x="136" y="436" width="178" height="248" rx="4" fill={shade(C.safe, 0.12)} strokeWidth={2} />
        <path d="M314,436 L360,450 L360,672 L314,684 Z" fill={shade(C.safe, -0.3)} />
        <rect x="190" y="500" width="70" height="90" rx="4" fill="#1d2428" strokeWidth={2} />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={198 + (i % 3) * 20} y={530 + Math.floor(i / 3) * 18} width="14" height="12" fill="#8aa0a0" strokeWidth={1} />
        ))}
        <rect x="196" y="508" width="58" height="14" fill="#7fe0c4" opacity="0.6" strokeWidth={1} />
      </g>

      {/* U-shaped display counters (hotspot tu-kinh 832,522) */}
      {[
        [364, 520, false],
        [600, 500, true],
        [1104, 396, false],
      ].map(([x, w, broken]) => (
        <g key={String(x)}>
          <rect x={x as number} y="460" width={(w as number) / (broken ? 1 : 2.2)} height="240" fill={C.woodDark} {...O} />
          <rect x={(x as number) + 10} y="470" width={(w as number) / (broken ? 1 : 2.2) - 20} height="90" fill={C.glass} opacity="0.55" {...O} strokeWidth={2} />
          {!broken && <Tray x={(x as number) + 20} y={482} w={(w as number) / 2.2 - 40} h={64} rings={8} />}
        </g>
      ))}
      {/* The smashed middle case: empty velvet, glass shards */}
      <rect x="620" y="490" width="460" height="56" fill={C.velvet} opacity="0.9" />
      {[[640, 480, 40], [700, 470, -20], [800, 486, 60], [930, 474, -40], [1020, 488, 20], [740, 720, 30], [880, 730, -60], [1000, 712, 10]].map(([x, y, a], i) => (
        <path key={i} d="M0,0 L26,-6 L14,18 Z" transform={`translate(${x} ${y}) rotate(${a})`} fill="#d9eeee" stroke={LINE} strokeWidth="1.5" opacity="0.9" />
      ))}

      {/* Tiled floor */}
      <rect y="700" width="1600" height="200" fill={C.tile} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 150 - 100} y1="700" x2={i * 170 - 260} y2="900" stroke={C.tileDark} strokeWidth="3" />
      ))}
      {[750, 810, 870].map((y) => (
        <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke={C.tileDark} strokeWidth="3" />
      ))}
      <rect y="700" width="1600" height="10" fill={ink.night} opacity="0.4" />
      {/* Red mud prints from the back door (hotspot san 1152,756) */}
      <Prints pts={TRAIL} />
      {/* The dropped ring under the counter edge (hotspot nhan-roi 576,792) */}
      <rect x="400" y="700" width="1180" height="22" fill={ink.night} opacity="0.35" />
      <Ring x={576} y={790} r={12} fake />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Alley 514 behind the shop

function Alley() {
  return (
    <Frame label="Hẻm 514 sau tiệm vàng, đất đỏ lầy lội">
      <rect width="1600" height="900" fill="#8aa0a8" />
      {/* Back walls of the Quang Trung row */}
      <rect x="0" y="80" width="760" height="580" fill={C.wall} {...O} />
      <rect x="0" y="80" width="760" height="40" fill={C.wallDark} />
      <rect x="760" y="140" width="840" height="520" fill="#b9a98a" {...O} />
      {[[860, 240], [1080, 240], [1380, 260]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="120" height="100" fill="#2f4258" {...O} strokeWidth={2} />
      ))}
      {/* Pipes and wires */}
      <path d="M0,150 Q400,190 760,160 T1600,190" stroke={ink.night} strokeWidth="3" fill="none" />
      <path d="M0,170 Q500,220 1000,180 T1600,220" stroke={ink.night} strokeWidth="2" fill="none" />
      <Glow x={700} y={400} r={600} o={0.18} />

      {/* Back door of the shop (hotspot cua-sau 480,450): no handle outside */}
      <g {...O}>
        <rect x="390" y="250" width="180" height="410" fill="#7d7f7a" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="390" y1={290 + i * 46} x2="570" y2={290 + i * 46} stroke={shade('#7d7f7a', -0.2)} strokeWidth="3" />
        ))}
        <rect x="380" y="240" width="200" height="14" fill={C.steel} />
      </g>
      <text x="480" y="232" textAnchor="middle" fontSize="16" fill={ink.night} fontFamily={mono}>
        KIM THÀNH · CỬA SAU
      </text>

      {/* Power pole with a fresh scrape, dead camera on top (camera-hem 992,162) */}
      <g {...O}>
        <rect x="944" y="80" width="34" height="680" fill="#9a968f" />
        <rect x="970" y="146" width="60" height="30" rx="6" fill="#d8d4cc" strokeWidth={2} />
        <path d="M1030,176 q20,30 4,70" stroke={ink.night} strokeWidth="2" fill="none" />
      </g>
      <path d="M944,690 l34,-6" stroke="#e8e0c8" strokeWidth="6" strokeLinecap="round" />

      {/* Shared bin with the poncho stuffed under rubbish (hotspot thung-rac 1280,558) */}
      <g {...O}>
        <rect x="1190" y="500" width="190" height="200" rx="10" fill="#3f6b3a" />
        <rect x="1180" y="488" width="210" height="24" rx="6" fill={shade('#3f6b3a', -0.3)} />
        <path d="M1210,500 Q1240,440 1300,470 Q1340,430 1370,496 Z" fill={C.raincoat} />
        <circle cx="1290" cy="474" r="10" fill={C.goxe} opacity="0.7" strokeWidth={1.5} />
        <path d="M1220,488 q20,-20 40,-4" fill="#e8dcc4" strokeWidth={2} />
      </g>

      {/* Red mud ground, half dug up for the drain */}
      <path d="M0,660 L1600,660 L1600,900 L0,900 Z" fill={C.redMud} />
      <path d="M0,700 Q400,690 800,720 T1600,700" stroke={C.redMudDark} strokeWidth="8" fill="none" />
      <path d="M1440,660 L1600,660 L1600,900 L1380,900 Z" fill={C.redMudDark} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={1460 + (i % 2) * 40} y={680 + i * 34} width="90" height="10" fill="#f2c230" transform={`rotate(-20 ${1500} ${700 + i * 34})`} />
      ))}
      {/* Pothole (vung-nuoc 256,756) */}
      <ellipse cx="256" cy="770" rx="120" ry="30" fill="#5f7676" {...O} strokeWidth={2} />
      {/* Tyre rut and the broken tail-light pieces (den-hau 896,774) */}
      <path d="M700,820 Q860,770 960,700" stroke={C.redMudDark} strokeWidth="18" fill="none" strokeLinecap="round" />
      {[[870, 780, 20], [900, 768, -30], [924, 790, 60], [884, 800, -10]].map(([x, y, a], i) => (
        <path key={i} d="M0,0 L18,-4 L10,12 Z" transform={`translate(${x} ${y}) rotate(${a})`} fill="#ff5a4a" stroke={LINE} strokeWidth="1.5" />
      ))}
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Bà Loan's room upstairs

function Upstairs() {
  return (
    <Frame label="Phòng trên lầu của bà Loan, bàn thờ chồng và bàn sổ sách">
      <rect width="1600" height="900" fill="#b49470" />
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.wood} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 140} y1="700" x2={i * 140 - 60} y2="900" stroke={shade(C.wood, -0.25)} strokeWidth="3" />
      ))}
      <Bulb x={800} y={150} />
      <Glow x={800} y={340} r={600} o={0.3} />

      {/* Husband's altar (hotspot ban-tho-chong 736,270) */}
      <g {...O}>
        <rect x="600" y="300" width="280" height="40" fill={C.woodDark} />
        <rect x="680" y="180" width="110" height="120" fill="#e8dcc4" />
        <rect x="694" y="194" width="82" height="92" fill="#6b6a64" strokeWidth={2} />
        <ellipse cx="735" cy="226" rx="18" ry="22" fill="#c9a274" strokeWidth={2} />
        <path d="M708,286 Q735,250 762,286 Z" fill="#2f4258" strokeWidth={2} />
        <rect x="620" y="270" width="30" height="30" fill={C.gold} strokeWidth={2} />
        <rect x="830" y="270" width="30" height="30" fill={C.gold} strokeWidth={2} />
      </g>

      {/* Calendar (hotspot lich 1344,288) */}
      <g {...O}>
        <rect x="1250" y="170" width="190" height="230" fill="#fbf4e4" />
        <rect x="1250" y="170" width="190" height="50" fill={accent.red} />
      </g>
      <text x="1345" y="205" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff" fontFamily={display}>
        THÁNG 12
      </text>
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={1262 + (i % 5) * 35} y={232 + Math.floor(i / 5) * 38} width="30" height="32" fill="none" stroke={ink.night} strokeWidth="1" opacity="0.4" />
      ))}
      <text x="1407" y="256" textAnchor="middle" fontSize="12" fill="#1d3a6a" fontFamily={mono}>T.</text>

      {/* Desk with the drawer open, blue hụi book (hotspot so-hui 1056,576) */}
      <g {...O}>
        <rect x="880" y="520" width="380" height="30" fill={C.woodDark} />
        <rect x="900" y="550" width="26" height="160" fill={shade(C.woodDark, -0.2)} />
        <rect x="1214" y="550" width="26" height="160" fill={shade(C.woodDark, -0.2)} />
        <rect x="960" y="550" width="200" height="60" fill={C.wood} />
        <rect x="980" y="560" width="150" height="40" fill="#2f6aa8" strokeWidth={2} />
        <path d="M940,520 L960,492 L1080,492 L1100,520 Z" fill="#e7d2a8" />
      </g>

      {/* Taped carton in the corner (hotspot hop-ma 288,648) */}
      <g {...O}>
        <path d="M180,580 L380,580 L400,720 L160,720 Z" fill="#c49a62" />
        <path d="M180,580 L220,540 L420,540 L380,580 Z" fill="#d8b47e" />
        <path d="M380,580 L420,540 L430,680 L400,720 Z" fill="#a8824f" />
        <rect x="270" y="540" width="24" height="40" fill="#e8dcc4" opacity="0.8" strokeWidth={1.5} />
      </g>
      <text x="280" y="660" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink.night} fontFamily={mono}>
        XƯỞNG MẠ THÀNH CÔNG
      </text>
      {/* Wardrobe */}
      <rect x="20" y="160" width="140" height="540" fill={C.woodDark} {...O} />
      <rect x="1460" y="420" width="140" height="280" fill={C.woodDark} {...O} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. The pharmacy across the street

function Pharmacy() {
  return (
    <Frame label="Nhìn từ nhà thuốc sang tiệm vàng Kim Thành bên kia đường">
      <rect width="1600" height="900" fill="#6f7f86" />
      {/* Across the street */}
      <ShopFront shutter={0.5} />
      <rect y="640" width="1600" height="80" fill={C.asphalt} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 220} y="676" width="110" height="8" fill="#e8dcc4" opacity="0.6" />
      ))}
      {/* The pharmacy's own opening: awning, shelves on both sides */}
      <rect width="1600" height="70" fill={C.pharmacy} {...O} />
      <path d="M0,70 L1600,70 L1600,100 L0,100 Z" fill={shade(C.pharmacy, -0.3)} />
      {/* Gutter (mai-hien 800,90) */}
      <rect x="0" y="96" width="1600" height="16" fill="#9a968f" {...O} strokeWidth={2} />
      {[300, 800, 1300].map((x) => (
        <path key={x} d={`M${x},112 v40`} stroke="#9fc6d6" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      ))}
      <text x="800" y="48" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff" fontFamily={display} letterSpacing="3">
        NHÀ THUỐC NGỌC THẢO
      </text>
      {/* Camera under the awning (goc-camera 224,144) */}
      <g {...O}>
        <rect x="190" y="112" width="12" height="30" fill="#d8d4cc" strokeWidth={2} />
        <path d="M170,140 L260,136 L264,168 L176,172 Z" fill="#e8e4dc" />
        <circle cx="258" cy="154" r="10" fill={ink.night} />
        <circle cx="270" cy="150" r="4" fill="#ff5a4a" stroke="none" />
      </g>
      {/* Shelves of medicine at both sides */}
      {[0, 1400].map((x) => (
        <g key={x}>
          <rect x={x} y="112" width="200" height="788" fill="#e8e4dc" {...O} />
          {[220, 360, 500].map((y) => (
            <g key={y}>
              <rect x={x} y={y} width="200" height="10" fill="#9a968f" />
              {Array.from({ length: 5 }, (_, i) => (
                <rect key={i} x={x + 12 + i * 36} y={y - 50} width="28" height="50" fill={['#3f8a7e', '#c4552d', '#2f6aa8', '#d9b04f', '#ece2cf'][(i + y / 20) % 5]} stroke={LINE} strokeWidth="1.5" />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* Counter with the sales book (so-ban 1280,720) */}
      <g {...O}>
        <rect x="900" y="740" width="700" height="160" fill="#e8e4dc" />
        <rect x="900" y="730" width="700" height="20" fill={C.pharmacy} />
        <path d="M1180,730 L1196,700 L1360,700 L1376,730 Z" fill="#fbf4e4" strokeWidth={2} />
        <line x1="1278" y1="700" x2="1278" y2="730" stroke={LINE} strokeWidth="2" />
      </g>
      {/* Rain */}
      {Array.from({ length: 70 }, (_, i) => (
        <line key={i} x1={(i * 97) % 1600} y1={120 + ((i * 53) % 520)} x2={(i * 97) % 1600 - 8} y2={150 + ((i * 53) % 520)} stroke="#cfe0e8" strokeWidth="2" opacity="0.35" />
      ))}
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  tiem: ShopInside,
  hem: Alley,
  lau: Upstairs,
  thuoc: Pharmacy,
}

export { LINE }
