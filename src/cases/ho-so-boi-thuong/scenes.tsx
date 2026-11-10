import { accent, ink, shade } from '@/art/palette'
import { Corrugated, Lamp, LightCone, P, Puddle, Rain, SceneFrame, Scorch } from '@/art/primitives'

// Backdrops for the four zones. Objects are drawn near their hotspot positions
// in case.json (percent of 1600 x 900).

function Gate() {
  return (
    <SceneFrame label="Cổng kho và chòi bảo vệ trong đêm mưa">
      <rect width="1600" height="900" fill={ink.night} />
      {/* Alley walls and far neon */}
      <polygon points={P([[0, 0], [380, 120], [380, 640], [0, 900]])} fill={ink.slate} />
      <polygon points={P([[1600, 0], [1260, 140], [1260, 640], [1600, 900]])} fill={shade(ink.slate, -0.2)} />
      <rect x="1290" y="210" width="150" height="46" fill="none" stroke={accent.teal} strokeWidth="5" opacity="0.8" />
      <rect x="1290" y="210" width="150" height="46" fill={accent.teal} opacity="0.12" />
      {/* Brick courses on the alley walls */}
      {Array.from({ length: 14 }, (_, i) => (
        <line key={`bl${i}`} x1="0" y1={150 + i * 40} x2="380" y2={230 + i * 30} stroke={ink.night} strokeWidth="2" opacity="0.35" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={`br${i}`} x1="1260" y1={200 + i * 36} x2="1600" y2={140 + i * 50} stroke={ink.night} strokeWidth="2" opacity="0.35" />
      ))}
      {/* Electric meters and tangled wires */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={1290 + i * 50} y="330" width="40" height="54" fill={ink.dusk} stroke={ink.night} strokeWidth="3" />
      ))}
      <path d="M1290 330 C 1200 200, 1000 260, 900 180 S 600 120, 380 160" fill="none" stroke={ink.night} strokeWidth="4" />
      <path d="M1340 330 C 1260 240, 1100 300, 980 220" fill="none" stroke={ink.night} strokeWidth="3" />
      {/* Laundry on a line across the alley */}
      <line x1="380" y1="130" x2="1260" y2="150" stroke={ink.night} strokeWidth="2" />
      <polygon points={P([[1100, 146], [1160, 147], [1156, 210], [1104, 208]])} fill={accent.teal} opacity="0.75" />
      <polygon points={P([[1180, 148], [1220, 149], [1224, 196], [1178, 196]])} fill={accent.rust} opacity="0.75" />
      {/* Ground */}
      <polygon points={P([[0, 900], [380, 640], [1260, 640], [1600, 900]])} fill={shade(ink.steel, -0.35)} />
      <Puddle x={700} y={800} w={420} color={accent.amber} />
      <Puddle x={1150} y={760} w={260} color={accent.teal} />
      {/* Parked motorbike in the rain */}
      <g transform="translate(1110 560)">
        <circle cx="0" cy="70" r="34" fill={ink.night} />
        <circle cx="170" cy="70" r="34" fill={ink.night} />
        <circle cx="0" cy="70" r="12" fill={ink.dusk} />
        <circle cx="170" cy="70" r="12" fill={ink.dusk} />
        <polygon points={P([[-10, 40], [60, 10], [150, 14], [190, 50], [160, 70], [20, 70]])} fill={accent.red} />
        <polygon points={P([[60, 10], [150, 14], [140, 0], [70, -4]])} fill={ink.night} />
        <line x1="180" y1="44" x2="200" y2="-20" stroke={ink.dusk} strokeWidth="8" />
        <circle cx="205" cy="-22" r="10" fill={accent.amber} opacity="0.7" />
      </g>
      {/* Red plastic stools by the booth */}
      {[[1020, 640], [1068, 652]].map(([x, y], i) => (
        <g key={i}>
          <polygon points={P([[x - 26, y - 50], [x + 26, y - 50], [x + 20, y], [x - 20, y]])} fill={accent.red} />
          <rect x={x - 28} y={y - 56} width="56" height="8" fill={shade(accent.red, 0.15)} />
        </g>
      ))}
      {/* Guard booth */}
      <Corrugated x={300} y={210} w={700} h={40} fill={ink.dusk} rib={shade(ink.dusk, -0.3)} />
      <rect x="320" y="250" width="660" height="430" fill={ink.steel} />
      <rect x="360" y="290" width="580" height="260" fill={shade(accent.amber, -0.7)} />
      <LightCone x={650} y={290} w={620} h={330} color={accent.amber} strength={0.45} />
      <circle cx="650" cy="296" r="10" fill={accent.amber} />
      {/* Table, cups and bottle */}
      <rect x="360" y="560" width="580" height="24" fill={shade(ink.dusk, -0.2)} />
      <polygon points={P([[490, 530], [512, 530], [508, 560], [494, 560]])} fill={ink.bone} opacity="0.85" />
      <polygon points={P([[524, 532], [546, 532], [542, 560], [528, 560]])} fill={ink.bone} opacity="0.85" />
      <polygon points={P([[578, 470], [592, 470], [592, 500], [604, 516], [604, 560], [566, 560], [566, 516], [578, 500]])} fill={shade(accent.amber, -0.3)} />
      {/* Log book */}
      <polygon points={P([[780, 620], [890, 612], [900, 668], [790, 676]])} fill={ink.paper} />
      <line x1="835" y1="616" x2="845" y2="672" stroke={shade(ink.paper, -0.4)} strokeWidth="2" />
      {/* Fan on a shelf */}
      <rect x="1040" y="400" width="160" height="12" fill={ink.dusk} />
      <circle cx="1120" cy="350" r="44" fill="none" stroke={ink.fog} strokeWidth="4" />
      <polygon points={P([[1120, 350], [1150, 320], [1156, 334]])} fill={ink.fog} />
      <polygon points={P([[1120, 350], [1092, 372], [1086, 358]])} fill={ink.fog} />
      <rect x="1114" y="394" width="12" height="8" fill={ink.fog} />
      {/* Gate bars */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={1010 + i * 26} y="250" width="6" height="430" fill={ink.night} opacity="0.7" />
      ))}
      <Rain seed={11} />
    </SceneFrame>
  )
}

function Warehouse() {
  return (
    <SceneFrame label="Khu hàng cháy đen trong kho">
      <rect width="1600" height="900" fill={shade(ink.night, -0.2)} />
      {/* Back wall and burnt roof hole */}
      <rect x="0" y="0" width="1600" height="560" fill={ink.slate} />
      <polygon points={P([[620, 0], [980, 0], [940, 40], [660, 40]])} fill={ink.fog} opacity="0.5" />
      <LightCone x={800} y={20} w={760} h={720} color={ink.fog} strength={0.28} />
      <Scorch x={300} y={560} w={600} h={520} seed={5} />
      <Scorch x={1300} y={560} w={520} h={460} seed={9} />
      {/* Burnt roof beams sagging */}
      <polygon points={P([[0, 60], [1600, 30], [1600, 54], [0, 86]])} fill={ink.night} />
      <polygon points={P([[300, 0], [340, 0], [520, 250], [490, 262]])} fill={ink.night} />
      {[260, 700, 1180].map((x) => (
        <line key={x} x1={x} y1="70" x2={x + 8} y2="220" stroke={ink.night} strokeWidth="3" strokeDasharray="8 4" />
      ))}
      {/* Floor */}
      <polygon points={P([[0, 560], [1600, 560], [1600, 900], [0, 900]])} fill={shade(ink.steel, -0.45)} />
      {/* Racks */}
      {[140, 520, 980, 1360].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="180" width="10" height="400" fill={ink.night} />
          <rect x={x + 186} y="180" width="10" height="400" fill={ink.night} />
          {[260, 380, 500].map((y) => (
            <polygon key={y} points={P([[x - 10, y], [x + 200, y + (i % 2 ? 8 : -6)], [x + 200, y + 10], [x - 10, y + 12]])} fill={shade(ink.night, 0.1)} />
          ))}
        </g>
      ))}
      {/* Charred rolls: three on the floor near the hotspot, one split open */}
      {[[620, 470], [700, 490], [780, 462]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 30} y={y - 70} width="60" height="130" fill={ink.night} />
          <ellipse cx={x} cy={y - 70} rx="30" ry="10" fill={shade(ink.steel, -0.2)} />
          <ellipse cx={x} cy={y - 70} rx="9" ry="3" fill={ink.paper} opacity="0.7" />
        </g>
      ))}
      <polygon points={P([[700, 520], [760, 530], [800, 580], [690, 570]])} fill={ink.paper} opacity="0.55" />
      <circle cx="745" cy="560" r="3" fill={accent.ember} />
      <Lamp x={1180} y={140} reach={460} spread={480} />
      {/* Water left by the fire hoses, reflecting the light */}
      <ellipse cx="900" cy="760" rx="380" ry="40" fill={ink.fog} opacity="0.12" />
      <ellipse cx="1000" cy="770" rx="160" ry="14" fill={accent.amber} opacity="0.18" />
      {/* Fallen rolls spilling into the aisle */}
      {[[420, 700, -20], [520, 730, 10], [860, 690, 70]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 70} y={y - 24} width="140" height="48" fill={ink.night} />
          <ellipse cx={x + 70} cy={y} rx="10" ry="24" fill={shade(accent.rust, -0.5)} />
          <ellipse cx={x + 70} cy={y} rx="4" ry="9" fill={ink.paper} opacity="0.6" />
        </g>
      ))}
      {/* Fire extinguisher left on the floor */}
      <g transform="translate(1460 600)">
        <rect x="0" y="0" width="34" height="90" rx="10" fill={accent.red} />
        <rect x="8" y="-14" width="18" height="16" fill={ink.night} />
        <path d="M26 -8 q30 0 30 40" fill="none" stroke={ink.night} strokeWidth="5" />
      </g>
      {/* Pallets */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={220} y={590 + i * 22} width="210" height="14" fill={shade(accent.rust, -0.55)} />
      ))}
      {/* Hand pallet truck */}
      <polygon points={P([[1160, 600], [1340, 600], [1340, 616], [1160, 616]])} fill={ink.dusk} />
      <line x1="1170" y1="600" x2="1140" y2="470" stroke={ink.dusk} strokeWidth="10" />
      <circle cx="1180" cy="626" r="12" fill={ink.night} />
      <circle cx="1320" cy="626" r="12" fill={ink.night} />
    </SceneFrame>
  )
}

function Office() {
  return (
    <SceneFrame label="Văn phòng nơi đám cháy bắt đầu">
      <rect width="1600" height="900" fill={ink.night} />
      {/* Walls: left wall carries the V-shaped burn */}
      <polygon points={P([[0, 0], [640, 0], [640, 620], [0, 820]])} fill={ink.steel} />
      <polygon points={P([[640, 0], [1600, 0], [1600, 820], [640, 620]])} fill={ink.slate} />
      <polygon points={P([[0, 820], [640, 620], [1600, 820], [1600, 900], [0, 900]])} fill={shade(ink.steel, -0.5)} />
      <Scorch x={360} y={720} w={460} h={640} seed={2} />
      <polygon points={P([[300, 720], [420, 720], [380, 600], [340, 600]])} fill={accent.rust} opacity="0.35" />
      {/* Burnt filing cabinet and the coil stand under it */}
      <rect x="290" y="520" width="190" height="180" fill={ink.night} />
      <line x1="290" y1="580" x2="480" y2="580" stroke={ink.steel} strokeWidth="3" />
      <line x1="290" y1="640" x2="480" y2="640" stroke={ink.steel} strokeWidth="3" />
      <g fill="none" stroke={ink.fog} strokeWidth="3">
        <path d="M432 690 l30 0 m-15 -10 l0 20" />
      </g>
      <ellipse cx="447" cy="692" rx="30" ry="6" fill={accent.rust} opacity="0.45" />
      {/* Shelf of binders on the right wall */}
      <rect x="1360" y="360" width="200" height="12" fill={ink.night} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={1366 + i * 24} y={276 - (i % 3) * 6} width="20" height={84 + (i % 3) * 6} fill={[accent.teal, accent.rust, ink.dusk, accent.amber][i % 4]} opacity="0.75" />
      ))}
      {/* Wall clock, stopped */}
      <circle cx="560" cy="140" r="44" fill={ink.bone} stroke={ink.night} strokeWidth="6" />
      <line x1="560" y1="140" x2="560" y2="110" stroke={ink.night} strokeWidth="4" />
      <line x1="560" y1="140" x2="584" y2="148" stroke={ink.night} strokeWidth="3" />
      <Scorch x={560} y={190} w={140} h={90} seed={8} />
      {/* Window with rain */}
      <rect x="760" y="140" width="320" height="230" fill={shade(accent.teal, -0.65)} />
      <rect x="760" y="140" width="320" height="230" fill="none" stroke={ink.night} strokeWidth="10" />
      <line x1="920" y1="140" x2="920" y2="370" stroke={ink.night} strokeWidth="8" />
      {/* Desk and computer tower */}
      <polygon points={P([[780, 520], [1260, 520], [1300, 560], [740, 560]])} fill={shade(accent.rust, -0.6)} />
      <rect x="760" y="560" width="20" height="160" fill={ink.night} />
      <rect x="1260" y="560" width="20" height="160" fill={ink.night} />
      <rect x="940" y="400" width="110" height="120" fill={ink.dusk} />
      <rect x="958" y="430" width="74" height="22" fill={ink.night} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={1090 + i * 14} cy="512" r="4" fill={ink.fog} />
      ))}
      {/* Desk lamp, knocked over but still lit from the street outside */}
      <Lamp x={1180} y={470} reach={60} spread={360} />
      <line x1="1180" y1="452" x2="1210" y2="520" stroke={ink.night} strokeWidth="6" />
      {/* Toppled office chair */}
      <g transform="rotate(-70 1340 760)">
        <rect x="1300" y="680" width="90" height="20" fill={ink.night} />
        <rect x="1300" y="610" width="16" height="80" fill={ink.night} />
        <line x1="1345" y1="700" x2="1345" y2="760" stroke={ink.night} strokeWidth="8" />
      </g>
      {/* Charred paper drifting over the floor */}
      {[[560, 800, 10], [640, 830, -20], [880, 790, 35], [1010, 846, -8], [700, 760, 60]].map(([x, y, r], i) => (
        <polygon key={i} transform={`rotate(${r} ${x} ${y})`} points={P([[x - 26, y - 16], [x + 28, y - 14], [x + 22, y + 18], [x - 30, y + 14]])} fill={i % 2 ? ink.paper : ink.night} opacity={i % 2 ? 0.55 : 0.85} />
      ))}
      {/* Calendar */}
      <rect x="1220" y="150" width="120" height="150" fill={ink.paper} />
      <rect x="1220" y="150" width="120" height="30" fill={accent.red} />
      <polygon points={P([[1300, 300], [1340, 260], [1340, 300]])} fill={ink.night} opacity="0.8" />
      <circle cx="1268" cy="240" r="13" fill="none" stroke={accent.red} strokeWidth="3" />
    </SceneFrame>
  )
}

function BackYard() {
  return (
    <SceneFrame label="Sân sau, cửa hông và tủ điện">
      <rect width="1600" height="900" fill={ink.night} />
      <rect x="0" y="0" width="1600" height="640" fill={ink.slate} />
      <Corrugated x={0} y={60} w={1600} h={70} fill={ink.steel} rib={shade(ink.steel, -0.3)} />
      {/* Overhead wires */}
      <path d="M0 40 Q 500 140 1000 60 T 1600 90" fill="none" stroke={ink.night} strokeWidth="4" />
      <path d="M0 20 Q 700 120 1600 50" fill="none" stroke={ink.night} strokeWidth="3" />
      {/* Side door with the lock */}
      <rect x="440" y="220" width="220" height="420" fill={ink.steel} />
      <rect x="440" y="220" width="220" height="420" fill="none" stroke={ink.night} strokeWidth="8" />
      <rect x="540" y="430" width="40" height="44" fill={accent.gold} opacity="0.75" />
      <path d="M548 430 v-18 a12 12 0 0 1 24 0 v6" fill="none" stroke={accent.gold} strokeWidth="5" />
      {/* Electrical box */}
      <rect x="1040" y="300" width="170" height="220" fill={ink.dusk} />
      <rect x="1060" y="330" width="130" height="90" fill={ink.night} />
      <rect x="1100" y="350" width="22" height="50" fill={accent.amber} />
      <line x1="1125" y1="300" x2="1125" y2="120" stroke={ink.night} strokeWidth="6" />
      {/* Ground, puddles, sandals by the step */}
      <polygon points={P([[0, 640], [1600, 640], [1600, 900], [0, 900]])} fill={shade(ink.steel, -0.4)} />
      <rect x="420" y="640" width="260" height="22" fill={ink.dusk} />
      <Puddle x={980} y={780} w={360} color={accent.teal} />
      <polygon points={P([[760, 712], [800, 708], [802, 728], [762, 732]])} fill={accent.teal} />
      <polygon points={P([[810, 716], [850, 712], [852, 732], [812, 736]])} fill={accent.teal} />
      {/* Wet tire tracks leading to the side door */}
      <path d="M1600 860 C 1200 820, 900 760, 600 680" fill="none" stroke={ink.night} strokeWidth="14" opacity="0.4" strokeDasharray="22 10" />
      <path d="M1600 890 C 1220 850, 920 790, 620 700" fill="none" stroke={ink.night} strokeWidth="14" opacity="0.4" strokeDasharray="22 10" />
      {/* Blue water drum and potted plants */}
      <g transform="translate(200 470)">
        <rect x="0" y="0" width="120" height="170" rx="10" fill={shade(accent.teal, -0.2)} />
        <rect x="0" y="40" width="120" height="8" fill={shade(accent.teal, -0.45)} />
        <rect x="0" y="120" width="120" height="8" fill={shade(accent.teal, -0.45)} />
        <rect x="10" y="0" width="22" height="170" fill={ink.bone} opacity="0.15" />
      </g>
      {[[90, 590], [1290, 600]].map(([x, y], i) => (
        <g key={i}>
          <polygon points={P([[x - 40, y], [x + 40, y], [x + 30, y + 50], [x - 30, y + 50]])} fill={accent.rust} />
          <polygon points={P([[x, y], [x - 50, y - 90], [x - 10, y - 20]])} fill={shade(accent.teal, -0.3)} />
          <polygon points={P([[x, y], [x + 40, y - 110], [x + 10, y - 10]])} fill={shade(accent.teal, -0.15)} />
          <polygon points={P([[x, y], [x - 6, y - 120], [x + 6, y - 20]])} fill={shade(accent.teal, -0.4)} />
        </g>
      ))}
      {/* Trash bags and a cat watching from the wall */}
      <polygon points={P([[700, 640], [720, 560], [780, 540], [820, 600], [810, 640]])} fill={ink.night} />
      <polygon points={P([[650, 640], [660, 590], [700, 580], [720, 640]])} fill={shade(ink.night, 0.15)} />
      <g transform="translate(860 210)">
        <polygon points={P([[0, 30], [10, 0], [18, 14], [30, 14], [38, 0], [46, 30], [40, 60], [6, 60]])} fill={ink.night} />
        <circle cx="16" cy="28" r="3" fill={accent.amber} />
        <circle cx="32" cy="28" r="3" fill={accent.amber} />
        <path d="M40 58 q30 10 20 40" fill="none" stroke={ink.night} strokeWidth="6" />
      </g>
      <rect x="1400" y="80" width="10" height="560" fill={ink.night} />
      <Lamp x={1380} y={110} reach={530} spread={560} />
      <Rain seed={23} opacity={0.3} />
    </SceneFrame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  cong: Gate,
  'khu-hang': Warehouse,
  'van-phong': Office,
  'san-sau': BackYard,
}
