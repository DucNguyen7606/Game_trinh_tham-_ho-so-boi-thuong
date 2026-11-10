import { accent, ink, shade } from '@/art/palette'
import { Corrugated, LightCone, P, Puddle, Rain, SceneFrame, Scorch } from '@/art/primitives'

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
      {/* Ground */}
      <polygon points={P([[0, 900], [380, 640], [1260, 640], [1600, 900]])} fill={shade(ink.steel, -0.35)} />
      <Puddle x={700} y={800} w={420} color={accent.amber} />
      <Puddle x={1150} y={760} w={260} color={accent.teal} />
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
