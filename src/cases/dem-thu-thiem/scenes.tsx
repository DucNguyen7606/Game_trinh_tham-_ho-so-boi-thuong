import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 5, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  sky: '#1f2a3d',
  skyLow: '#33405a',
  grass: '#3d5236',
  grassDark: '#2c3d28',
  mud: '#5b4532',
  mudDark: '#46341f',
  water: '#2d4a52',
  asphalt: '#3a3a3e',
  asphaltLit: '#4e4c4f',
  car: '#17181c',
  carHi: '#3a3d45',
  glass: '#5d7686',
  chrome: '#c9cdd2',
  wave: '#c8352b',
  coolant: '#e07aa4',
  concrete: '#8d8a84',
  concreteDark: '#6f6c66',
  wall: '#d9cfbb',
  wood: '#7a4f32',
  woodDark: '#573721',
  leaf: '#4f6b3a',
  paper: '#f3ead6',
}

/**
 * The black Mercedes GLC seen side-on, nose to the right. `hit` adds the round
 * dent with red paint on the front right corner and the broken fog light;
 * `tree` adds the crumpled nose from the tree.
 */
export function Suv({ x = 0, y = 0, s = 1, rot = 0, hit = false, tree = false, lights = false }: { x?: number; y?: number; s?: number; rot?: number; hit?: boolean; tree?: boolean; lights?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx="0" cy="96" rx="250" ry="16" fill={ink.night} opacity="0.4" />
      {/* Body */}
      <path d="M-230,70 L-232,10 Q-226,-12 -200,-16 L-150,-22 L-96,-84 Q-84,-96 -60,-96 L90,-96 Q112,-96 128,-80 L178,-28 L226,-14 Q244,-8 244,14 L246,70 Z" fill={C.car} {...O} />
      {tree ? (
        <path d="M244,14 L226,-14 L206,-6 L218,20 L210,50 L246,70 Z" fill={shade(C.car, 0.15)} {...O} />
      ) : null}
      {/* Windows */}
      <path d="M-140,-26 L-92,-80 Q-84,-86 -70,-86 L-6,-86 L-6,-26 Z" fill={C.glass} {...O} strokeWidth={2} />
      <path d="M8,-86 L86,-86 Q100,-86 112,-74 L158,-26 L8,-26 Z" fill={C.glass} {...O} strokeWidth={2} />
      <path d="M-120,-40 L-90,-74" stroke="#9fb4c8" strokeWidth="4" opacity="0.5" />
      {/* Character line and door seams */}
      <path d="M-226,16 L240,8" stroke={C.carHi} strokeWidth="3" />
      <path d="M-6,-26 V60 M150,-26 L156,60" stroke={C.carHi} strokeWidth="2" />
      {/* Lights */}
      <path d="M220,-12 L242,-6 L242,8 L218,6 Z" fill={lights ? '#fff5d6' : '#cfd6da'} {...O} strokeWidth={2} />
      <rect x="-232" y="0" width="16" height="18" fill="#a3302a" {...O} strokeWidth={2} />
      {/* Fog light, front right corner */}
      {hit ? (
        <g>
          <circle cx="226" cy="44" r="10" fill={ink.night} {...O} strokeWidth={2} />
          <path d="M196,24 Q214,10 236,26 Q240,44 226,58 Q206,58 198,44 Z" fill={shade(C.car, 0.12)} stroke={LINE} strokeWidth="2" />
          <path d="M202,30 l18,4 M204,42 l22,-4 M210,50 l12,2" stroke={C.wave} strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : (
        <circle cx="226" cy="44" r="10" fill={lights ? '#fff5d6' : '#e8ecee'} {...O} strokeWidth={2} />
      )}
      {/* Wheels */}
      {[-150, 150].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy="70" r="40" fill="#0d0d10" {...O} />
          <circle cx={wx} cy="70" r="20" fill={C.chrome} {...O} strokeWidth={2} />
          <circle cx={wx} cy="70" r="5" fill={C.carHi} />
        </g>
      ))}
      {/* Three-pointed star badge */}
      <circle cx="238" cy="-2" r="5" fill={C.chrome} stroke={LINE} strokeWidth="1.5" />
    </g>
  )
}

/** A red Honda Wave, side-on, nose to the left. */
export function Wave({ x = 0, y = 0, s = 1, rot = 0, broken = false }: { x?: number; y?: number; s?: number; rot?: number; broken?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[-60, 60].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy="30" r="26" fill="#0d0d10" {...O} />
          <circle cx={wx} cy="30" r="9" fill={C.chrome} />
        </g>
      ))}
      <path d="M-70,6 Q-74,-34 -46,-40 L-30,-40 L-10,0 L40,0 Q50,-26 80,-24 L90,0 L60,10 L-40,14 Z" fill={C.wave} {...O} />
      {broken && <path d="M-66,-30 l-14,10 l10,6 Z M-56,-12 l-10,14" fill="#f0e6d8" stroke={LINE} strokeWidth="2" />}
      <path d="M20,-6 L80,-10 L84,-2 L20,2 Z" fill={ink.night} />
      <path d="M-48,-40 L-56,-60 M-62,-62 h20" stroke={LINE} strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. The canal bank in Thủ Thiêm, before dawn

function CanalBank() {
  return (
    <Frame label="Con đường vắng ở Thủ Thiêm, chiếc Mercedes đen nằm dưới bờ kênh, đầu ghì vào gốc cây dầu">
      <rect width="1600" height="900" fill={C.sky} />
      <rect y="220" width="1600" height="120" fill={C.skyLow} />
      {/* Skyline of District 1 across the river */}
      <g fill="#141b28">
        <rect x="80" y="150" width="60" height="140" />
        <rect x="150" y="190" width="40" height="100" />
        <path d="M230,290 L230,80 L250,60 L270,80 L270,290 Z" />
        <rect x="300" y="170" width="70" height="120" />
        <rect x="380" y="210" width="50" height="80" />
        <rect x="1140" y="200" width="60" height="90" />
        <rect x="1220" y="160" width="40" height="130" />
      </g>
      {[[240, 110], [254, 140], [320, 200], [1236, 190]].map(([x, y]) => (
        <rect key={x + y} x={x} y={y} width="6" height="8" fill={accent.amber} opacity="0.7" />
      ))}
      {/* Empty fields with grass */}
      <path d="M0,290 L1600,290 L1600,900 L0,900 Z" fill={C.grass} />
      {/* The new road, running across */}
      <path d="M0,360 L1600,330 L1600,470 L0,520 Z" fill={C.asphalt} />
      <path d="M0,440 L1600,400" stroke="#d9d2c0" strokeWidth="4" strokeDasharray="40 36" />
      <path d="M0,520 L1600,470" stroke={shade(C.asphalt, -0.3)} strokeWidth="6" />
      {/* Bank sloping down to the canal */}
      <path d="M0,520 L1600,470 L1600,640 Q900,700 0,700 Z" fill={C.mud} />
      <path d="M0,700 Q900,700 1600,640 L1600,900 L0,900 Z" fill={C.water} />
      {/* Two tyre tracks leaving the road edge straight down the bank (hotspot mep-duong 544,468) */}
      <path d="M480,500 L560,640 M600,492 L690,632" stroke={C.mudDark} strokeWidth="20" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${80 + i * 200},${770 + (i % 3) * 30} q30,-8 60,0`} stroke="#4d6f78" strokeWidth="3" fill="none" />
      ))}
      {/* Shoe prints on the bank (hotspot dau-giay 352,684) */}
      {[[330, 660], [380, 676]].map(([x, y]) => (
        <g key={x} transform={`rotate(-24 ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="10" ry="20" fill={C.mudDark} />
          <ellipse cx={x} cy={y + 24} rx="7" ry="6" fill={C.mudDark} opacity="0.5" />
        </g>
      ))}

      {/* The dầu tree the car ran into */}
      <g {...O}>
        <path d="M1250,700 L1266,240 L1300,240 L1310,700 Z" fill="#5a4636" />
        <circle cx="1180" cy="190" r="100" fill={C.leaf} />
        <circle cx="1270" cy="140" r="110" fill={shade(C.leaf, -0.15)} />
        <circle cx="1310" cy="220" r="50" fill={C.leaf} />
      </g>
      {/* The car nose-down on the bank (hotspots dau-xe 1056,594 and khoang-lai 1184,414) */}
      <Suv x={1040} y={520} s={1.05} rot={14} hit tree />

      {/* Police tape and a cone */}
      <path d="M660,486 L780,478" stroke="#e8c440" strokeWidth="6" />
      <path d="M760,520 l18,-60 l18,60 Z" fill={accent.rust} {...O} />

      {/* Grazing field with the locked pen (hotspot bai-co 1408,270) */}
      <g {...O}>
        <rect x="1360" y="220" width="200" height="90" fill={C.woodDark} />
        <path d="M1360,220 L1460,170 L1560,220 Z" fill={shade(C.woodDark, -0.2)} />
        <rect x="1430" y="240" width="60" height="70" fill="#2a2018" />
        <path d="M1440,270 h40" stroke="#9a968f" strokeWidth="5" />
        <rect x="1452" y="262" width="16" height="18" rx="3" fill="#c9b27a" strokeWidth={2} />
      </g>
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={1180 + i * 34} y1="270" x2={1180 + i * 34} y2="320" stroke={LINE} strokeWidth="4" />
      ))}
      <path d="M1180,284 H1360 M1180,304 H1360" stroke={LINE} strokeWidth="3" />
      <Glow x={1110} y={500} r={260} o={0.18} color="#9fb4c8" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. The corner of Nguyễn Văn Hưởng, Thảo Điền

function Street() {
  return (
    <Frame label="Đường Nguyễn Văn Hưởng về đêm, vạch sơn công an trên mặt đường, xe bánh mì bên hiên">
      <rect width="1600" height="900" fill="#26222a" />
      {/* Villas and trees */}
      <g {...O}>
        <rect x="0" y="120" width="420" height="420" fill="#cbbf9f" />
        <rect x="40" y="180" width="120" height="140" fill="#2f4258" />
        <rect x="240" y="180" width="120" height="140" fill={accent.amber} opacity="0.75" />
        <rect x="1180" y="160" width="420" height="380" fill="#b9ad8e" />
        <rect x="1240" y="220" width="110" height="130" fill="#2f4258" />
        <rect x="1420" y="220" width="110" height="130" fill="#2f4258" />
      </g>
      {[[520, 140], [700, 110], [960, 130], [1100, 150]].map(([x, y], i) => (
        <g key={x} {...O}>
          <rect x={x - 10} y={y + 60} width="20" height="340" fill="#4a3a2e" />
          <circle cx={x} cy={y} r={90 + (i % 2) * 20} fill={i % 2 ? C.leaf : shade(C.leaf, -0.2)} />
        </g>
      ))}
      {/* Pharmacy with its green cross and camera (hotspot none, see P6) */}
      <g {...O}>
        <rect x="1180" y="400" width="420" height="140" fill="#e8e2d4" />
        <rect x="1200" y="420" width="200" height="40" fill={accent.teal} />
        <path d="M1480,420 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 v-20 h20 Z" fill="#3fbf6f" />
      </g>
      <text x="1300" y="447" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">NHÀ THUỐC</text>
      {/* Street lamp */}
      <path d="M640,560 V200 Q640,170 690,170" stroke={LINE} strokeWidth="8" fill="none" />
      <Beam x={700} y={180} w={700} h={520} o={0.25} />
      <Glow x={700} y={190} r={80} o={0.8} color="#ffe2a8" />
      {/* Road */}
      <path d="M0,540 L1600,540 L1600,900 L0,900 Z" fill={C.asphalt} />
      <path d="M0,540 L1600,540 L1600,560 L0,560 Z" fill={C.concreteDark} />
      <ellipse cx="760" cy="720" rx="480" ry="110" fill={C.asphaltLit} opacity="0.6" />
      {/* Police paint outlines (hotspot vach-son 736,630) */}
      <g fill="none" stroke="#f2efe6" strokeWidth="4" strokeDasharray="14 8">
        <path d="M620,600 L860,590 L880,660 L640,676 Z" />
        <path d="M900,700 q30,-30 80,-20 q40,10 30,50 q-40,30 -90,10 Z" />
      </g>
      {/* Pink coolant drops heading off to the right (hotspot vet-nuoc 1216,558) */}
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse key={i} cx={900 + i * 44} cy={620 - i * 4 + (i % 2) * 6} rx={9 - i * 0.4} ry={4} fill={C.coolant} opacity={0.85 - i * 0.04} />
      ))}
      {/* Drain grate with glass bits (hotspot ranh-nuoc 288,738) */}
      <g {...O}>
        <rect x="200" y="710" width="200" height="56" fill="#2a2a2e" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={216 + i * 21} y1="714" x2={216 + i * 21} y2="762" stroke="#55555b" strokeWidth="5" />
        ))}
      </g>
      {[[240, 730], [300, 740], [350, 726]].map(([x, y]) => (
        <path key={x} d={`M${x},${y} l10,-4 l4,8 Z`} fill="#e8f0f2" stroke={LINE} strokeWidth="1" />
      ))}
      {/* Hoa's bread cart under a porch (hotspot xe-banh-mi 192,414) */}
      <g {...O}>
        <rect x="110" y="360" width="180" height="140" fill="#f6efe2" />
        <rect x="110" y="340" width="180" height="26" fill={accent.red} />
        <rect x="126" y="384" width="148" height="70" fill="#e7d2a8" />
        <circle cx="140" cy="520" r="20" fill="#0d0d10" />
        <circle cx="260" cy="520" r="20" fill="#0d0d10" />
      </g>
      <text x="200" y="360" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">BÁNH MÌ CHỊ HOA</text>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. The hotel garage

function Garage() {
  return (
    <Frame label="Gara khách sạn Sông Xanh, chỗ đỗ đầu tiên trống, vệt nước hồng khô trên sàn">
      <rect width="1600" height="900" fill={C.concreteDark} />
      <rect width="1600" height="120" fill="#4f4c48" />
      {/* Concrete pillars and painted bays */}
      {[260, 800, 1340].map((x) => (
        <rect key={x} x={x - 30} y="120" width="60" height="520" fill={C.concrete} {...O} />
      ))}
      <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill="#7a7771" />
      {[100, 560, 1060, 1520].map((x) => (
        <path key={x} d={`M${x},640 L${x - 60},900`} stroke="#e8c440" strokeWidth="8" />
      ))}
      <Bulb x={800} y={160} />
      <Beam x={800} y={170} w={1100} h={640} o={0.22} />
      <Glow x={800} y={420} r={600} o={0.22} />
      {/* Sign on the wall */}
      <rect x="560" y="200" width="200" height="60" fill="#2f4258" {...O} />
      <text x="660" y="240" textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">CHỖ 01 · CHỦ</text>

      {/* Hotel Innova in the first bay (hotspot xe-innova 288,468) */}
      <g transform="translate(300 560) scale(0.8)">
        <path d="M-230,70 L-230,0 Q-226,-20 -200,-24 L-140,-30 L-110,-90 L130,-90 Q150,-90 160,-70 L190,-20 L226,-10 Q240,-4 240,20 L240,70 Z" fill="#d4d0c6" {...O} />
        <path d="M-120,-36 L-96,-80 L110,-80 L140,-36 Z" fill={C.glass} {...O} strokeWidth={2} />
        {[-140, 150].map((wx) => (
          <circle key={wx} cx={wx} cy="70" r="38" fill="#0d0d10" {...O} />
        ))}
      </g>

      {/* Empty bay: dried pink ring of coolant (hotspot vung-nuoc 672,648) */}
      <ellipse cx="680" cy="690" rx="120" ry="28" fill="none" stroke={C.coolant} strokeWidth="6" opacity="0.8" />
      <ellipse cx="680" cy="690" rx="100" ry="20" fill={C.coolant} opacity="0.18" />
      {/* Shelf with an opened coolant jug */}
      <g {...O}>
        <rect x="520" y="430" width="240" height="14" fill={C.woodDark} />
        <rect x="540" y="370" width="50" height="60" rx="6" fill={C.coolant} />
        <rect x="552" y="356" width="24" height="16" fill="#2a2522" />
        <rect x="610" y="390" width="40" height="40" fill="#cfc6b2" />
      </g>
      {/* Bucket and rags (hotspot xo-nuoc 992,630) */}
      <g {...O}>
        <path d="M950,560 h90 l-10,96 h-70 Z" fill="#3f8a7e" />
        <ellipse cx="995" cy="560" rx="45" ry="10" fill="#5b8fa0" />
        <path d="M1050,640 q30,-20 60,0 q-10,20 -60,0 Z" fill="#e8e2d4" />
      </g>
      {/* Broom and swept red shards in the corner (hotspot goc-gara 1312,684) */}
      <g {...O}>
        <line x1="1420" y1="360" x2="1380" y2="660" stroke={C.wood} strokeWidth="10" />
        <path d="M1350,650 L1410,650 L1430,720 L1330,720 Z" fill="#c9a274" />
      </g>
      {[[1260, 700], [1290, 712], [1310, 694], [1240, 716], [1280, 724]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y} l18,-6 l6,12 l-16,6 Z`} fill={C.wave} stroke={LINE} strokeWidth="2" />
      ))}
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. The guard booth at the hotel gate

function GuardBooth() {
  return (
    <Frame label="Chòi bảo vệ khách sạn Sông Xanh, cuốn sổ trực trên bàn, bảng móc chìa khóa">
      <rect width="1600" height="900" fill="#3a3a44" />
      {/* Booth walls */}
      <rect x="0" y="0" width="1600" height="640" fill={C.wall} />
      <rect x="0" y="0" width="1600" height="60" fill={shade(C.wall, -0.2)} />
      {/* Window to the gate at night */}
      <g {...O}>
        <rect x="560" y="120" width="560" height="300" fill="#1f2a3d" />
        <path d="M600,420 V200 M680,420 V200 M760,420 V200 M840,420 V200 M920,420 V200 M1000,420 V200 M1080,420 V200" stroke="#6f6c66" strokeWidth="8" />
        <path d="M560,200 H1120" stroke="#6f6c66" strokeWidth="8" />
        <path d="M840,120 V420" stroke={C.woodDark} strokeWidth="12" />
      </g>
      <Glow x={840} y={240} r={200} o={0.2} color="#9fb4c8" />
      {/* Hotel sign outside */}
      <text x="840" y="170" textAnchor="middle" fontSize="28" fontWeight="700" fill={accent.amber} fontFamily="Bitter, serif">KHÁCH SẠN SÔNG XANH</text>
      {/* Camera with a note (hotspot camera-cong 1344,162) */}
      <g {...O}>
        <rect x="1300" y="110" width="110" height="46" rx="10" fill="#e8e2d4" />
        <circle cx="1314" cy="133" r="13" fill={ink.night} />
        <rect x="1300" y="170" width="100" height="50" fill="#fff8c4" strokeWidth={2} />
      </g>
      <Bulb x={300} y={140} />
      <Glow x={300} y={220} r={460} o={0.3} />
      {/* Key board (hotspot moc-chia-khoa 352,360) */}
      <g {...O}>
        <rect x="260" y="270" width="200" height="170" fill={C.woodDark} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={290 + i * 46} cy="310" r="5" fill={C.chrome} strokeWidth={1.5} />
            {i !== 0 && <rect x={284 + i * 46} y="320" width="12" height="30" fill="#c9b27a" strokeWidth={1.5} />}
            <rect x={276 + i * 46} y="370" width="30" height="16" fill={C.paper} strokeWidth={1.5} />
          </g>
        ))}
      </g>
      {/* Desk */}
      <g {...O}>
        <rect x="160" y="560" width="1300" height="40" fill={C.wood} />
        <rect x="200" y="600" width="30" height="300" fill={C.woodDark} />
        <rect x="1390" y="600" width="30" height="300" fill={C.woodDark} />
      </g>
      {/* The logbook with a torn page (hotspot so-truc 832,576) */}
      <g {...O}>
        <path d="M680,560 L840,530 L1000,560 L980,600 L700,600 Z" fill={C.paper} />
        <path d="M840,530 V590" stroke={LINE} strokeWidth="2" />
        <path d="M842,532 l6,10 l-4,8 l6,10 l-4,10 l6,10" stroke={LINE} strokeWidth="2" fill="none" />
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1={720} y1={562 + i * 8} x2={820} y2={556 + i * 8} stroke="#c4b494" strokeWidth="2" />
        ))}
        <line x1="900" y1="560" x2="980" y2="568" stroke="#6b6660" strokeWidth="5" />
      </g>
      {/* Teapot and two cups (hotspot am-tra 1120,522) */}
      <g {...O}>
        <ellipse cx="1120" cy="530" rx="50" ry="38" fill="#c9a274" />
        <path d="M1166,520 q30,-10 30,-30" stroke={LINE} strokeWidth="6" fill="none" />
        <rect x="1196" y="530" width="30" height="28" rx="4" fill="#f6efe2" />
        <rect x="1240" y="534" width="30" height="24" rx="4" fill="#f6efe2" />
      </g>
      {/* Old fan */}
      <g {...O}>
        <circle cx="1480" cy="460" r="60" fill="#3f8a7e" />
        <circle cx="1480" cy="460" r="14" fill={ink.night} />
        <rect x="1470" y="520" width="20" height="40" fill={ink.night} />
      </g>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'bo-kenh': CanalBank,
  'nguyen-van-huong': Street,
  gara: Garage,
  cong: GuardBooth,
}

export { LINE }
