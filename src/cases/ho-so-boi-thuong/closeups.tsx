import { accent, ink, shade } from '@/art/palette'
import { P, Scorch } from '@/art/primitives'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.
// Keyed by hotspot id from case.json.

const wood = shade(accent.rust, -0.45)
const mono = 'IBM Plex Mono, monospace'

const Table = ({ y = 170 }: { y?: number }) => (
  <g>
    <rect width="400" height={y} fill={ink.steel} />
    <rect y={y} width="400" height={300 - y} fill={wood} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="0" y1={y + 20 + i * 30} x2="400" y2={y + 26 + i * 30} stroke={shade(wood, -0.25)} strokeWidth="2" />
    ))}
  </g>
)

function Cups() {
  return (
    <g>
      <Table />
      {/* Two glasses, one still wet */}
      {[120, 190].map((x, i) => (
        <g key={x}>
          <polygon points={P([[x - 26, 120], [x + 26, 120], [x + 20, 200], [x - 20, 200]])} fill={ink.bone} opacity="0.35" />
          <polygon points={P([[x - 26, 120], [x + 26, 120], [x + 20, 200], [x - 20, 200]])} fill="none" stroke={ink.bone} strokeWidth="2" />
          {i === 0 && <polygon points={P([[x - 21, 180], [x + 21, 180], [x + 20, 200], [x - 20, 200]])} fill={accent.amber} opacity="0.6" />}
          <ellipse cx={x} cy="206" rx="24" ry="5" fill={ink.night} opacity="0.4" />
        </g>
      ))}
      {/* Bottle with the Mỏ Cày label */}
      <g transform="translate(270 40)">
        <rect x="18" y="0" width="16" height="40" fill={shade(accent.amber, -0.35)} />
        <polygon points={P([[18, 40], [34, 40], [52, 70], [52, 166], [0, 166], [0, 70]])} fill={shade(accent.amber, -0.25)} />
        <polygon points={P([[34, 40], [52, 70], [52, 166], [36, 166]])} fill={shade(accent.amber, -0.45)} />
        <rect x="4" y="96" width="44" height="44" fill={ink.bone} />
        <text x="26" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill={accent.red} fontFamily={mono}>
          RƯỢU NẾP
        </text>
        <text x="26" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill={ink.night} fontFamily={mono}>
          MỎ CÀY
        </text>
        <rect x="3" y="120" width="12" height="44" fill={accent.amber} opacity="0.2" />
      </g>
    </g>
  )
}

function Fan() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.steel} />
      <circle cx="200" cy="140" r="100" fill="none" stroke={ink.fog} strokeWidth="5" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1="200" y1="140" x2={200 + 100 * Math.cos((a * Math.PI) / 180)} y2={140 + 100 * Math.sin((a * Math.PI) / 180)} stroke={ink.fog} strokeWidth="2" />
      ))}
      <polygon points={P([[200, 140], [270, 80], [282, 106]])} fill={ink.bone} opacity="0.75" />
      <polygon points={P([[200, 140], [150, 200], [134, 180]])} fill={ink.bone} opacity="0.75" />
      <polygon points={P([[200, 140], [214, 150], [222, 132]])} fill={ink.bone} opacity="0.4" />
      <circle cx="200" cy="140" r="16" fill={ink.dusk} />
    </g>
  )
}

function LogBook() {
  const lines = ['12/7  22h  kiểm tra cổng, cúp cầu dao', '13/7  22h  kiểm tra cổng, cúp cầu dao', '14/7  22h  kiểm tra cổng']
  return (
    <g>
      <Table y={40} />
      <g transform="rotate(-4 200 160)">
        <rect x="60" y="50" width="280" height="210" fill={ink.paper} />
        <line x1="200" y1="50" x2="200" y2="260" stroke={shade(ink.paper, -0.3)} strokeWidth="2" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="70" y1={80 + i * 20} x2="330" y2={80 + i * 20} stroke={shade(ink.paper, -0.15)} />
        ))}
        {lines.map((l, i) => (
          <text key={i} x="74" y={96 + i * 20} fontSize="10.5" fill={shade(accent.teal, -0.4)} fontFamily={mono}>
            {l}
          </text>
        ))}
      </g>
    </g>
  )
}

function FabricRoll() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.night} />
      {/* Cross-section: a thin charred skin of real fabric, then scraps, then a paper core */}
      <circle cx="200" cy="145" r="118" fill={ink.night} stroke={shade(ink.steel, -0.2)} strokeWidth="6" />
      <circle cx="200" cy="145" r="106" fill={shade(accent.rust, -0.55)} />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={200 + (i % 3) - 1} cy={145 + (i % 2)} r={96 - i * 7} fill="none" stroke={[ink.fog, accent.teal, accent.amber, ink.bone][i % 4]} strokeWidth="5" opacity="0.55" strokeDasharray={`${20 + i * 3} ${8 + i}`} />
      ))}
      <circle cx="200" cy="145" r="30" fill={ink.paper} />
      <circle cx="200" cy="145" r="16" fill={ink.night} />
      <text x="200" y="149" textAnchor="middle" fontSize="7" fill={ink.bone} fontFamily={mono}>
        lõi giấy
      </text>
    </g>
  )
}

function Pallet() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.night} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="20" y={40 + i * 46} width="360" height="32" fill={shade(accent.rust, -0.5 - (i % 2) * 0.1)} />
          <rect x="20" y={40 + i * 46} width="360" height="32" fill={ink.night} opacity={0.2 + (i % 3) * 0.15} />
        </g>
      ))}
    </g>
  )
}

function Truck() {
  return (
    <g>
      <rect width="400" height="300" fill={shade(ink.steel, -0.4)} />
      <rect x="40" y="90" width="320" height="40" fill={ink.dusk} />
      <circle cx="120" cy="170" r="44" fill={ink.night} />
      <circle cx="120" cy="170" r="16" fill={ink.fog} />
      {/* Melted rubber dripping */}
      <polygon points={P([[90, 205], [150, 205], [140, 240], [128, 226], [118, 252], [104, 228], [96, 238]])} fill={ink.night} />
    </g>
  )
}

function BurnV() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.dusk} />
      <rect y="250" width="400" height="50" fill={shade(ink.steel, -0.4)} />
      <Scorch x={200} y={252} w={360} h={260} seed={4} />
      <polygon points={P([[160, 252], [240, 252], [220, 190], [180, 190]])} fill={accent.rust} opacity="0.4" />
      <line x1="200" y1="40" x2="200" y2="240" stroke={accent.amber} strokeDasharray="6 6" strokeWidth="1.5" opacity="0.8" />
      <text x="208" y="236" fontSize="10" fill={accent.amber} fontFamily={mono}>
        điểm thấp nhất
      </text>
    </g>
  )
}

function CoilStand() {
  return (
    <g>
      <rect width="400" height="300" fill={shade(ink.steel, -0.5)} />
      <polygon points={P([[0, 0], [400, 0], [400, 70], [0, 110]])} fill={ink.night} />
      {/* Charred rag with a petrol sheen */}
      <polygon points={P([[60, 170], [170, 150], [210, 200], [120, 230], [50, 210]])} fill={ink.night} />
      <ellipse cx="130" cy="195" rx="70" ry="18" fill={accent.teal} opacity="0.25" />
      <ellipse cx="120" cy="190" rx="40" ry="10" fill={accent.amber} opacity="0.2" />
      {/* Metal coil stand: a flat plate with a slotted pin */}
      <g transform="translate(250 170)">
        <polygon points={P([[-40, 10], [40, 10], [48, 24], [-48, 24]])} fill={ink.fog} />
        <rect x="-3" y="-40" width="6" height="52" fill={ink.fog} />
        <polygon points={P([[-12, -40], [12, -40], [3, -30], [-3, -30]])} fill={ink.bone} />
      </g>
      <path d="M210 196 q20 -8 30 -2" fill="none" stroke={ink.fog} strokeWidth="2" opacity="0.6" />
    </g>
  )
}

function OpenTower() {
  return (
    <g>
      <Table y={190} />
      <rect x="70" y="20" width="200" height="230" fill={ink.dusk} />
      <rect x="84" y="34" width="172" height="202" fill={ink.night} />
      {/* Empty drive bay */}
      <rect x="110" y="140" width="120" height="44" fill="none" stroke={ink.fog} strokeWidth="3" strokeDasharray="8 5" />
      <text x="170" y="167" textAnchor="middle" fontSize="11" fill={ink.fog} fontFamily={mono}>
        trống
      </text>
      <rect x="110" y="60" width="120" height="50" fill={shade(accent.teal, -0.3)} />
      {/* Four screws lined up neatly */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${300 + i * 20} 240)`}>
          <circle r="7" fill={ink.fog} />
          <line x1="-4" y1="0" x2="4" y2="0" stroke={ink.night} strokeWidth="2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke={ink.night} strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

function Calendar() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.dusk} />
      <rect x="80" y="20" width="240" height="260" fill={ink.paper} />
      <rect x="80" y="20" width="240" height="44" fill={accent.red} />
      <text x="200" y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill={ink.bone} fontFamily="Bitter, serif">
        THÁNG 7
      </text>
      {Array.from({ length: 31 }, (_, i) => (
        <text key={i} x={100 + (i % 7) * 32} y={92 + Math.floor(i / 7) * 34} fontSize="13" fill={ink.night} fontFamily={mono}>
          {i + 1}
        </text>
      ))}
      <circle cx={100 + (19 % 7) * 32 + 8} cy={92 + Math.floor(19 / 7) * 34 - 5} r="15" fill="none" stroke={accent.red} strokeWidth="3" />
      <polygon points={P([[260, 280], [320, 220], [320, 280]])} fill={ink.night} opacity="0.85" />
    </g>
  )
}

function Padlock() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.steel} />
      <rect x="40" y="0" width="30" height="300" fill={ink.dusk} />
      <rect x="40" y="120" width="140" height="22" fill={ink.fog} />
      {/* Shackle swung open: unlocked with a key, no pry marks */}
      <path d="M200 150 v-50 a40 40 0 0 1 80 0 v10" fill="none" stroke={ink.fog} strokeWidth="12" />
      <rect x="180" y="150" width="120" height="100" rx="6" fill={accent.gold} />
      <rect x="180" y="150" width="40" height="100" fill={shade(accent.gold, 0.2)} opacity="0.5" />
      <circle cx="240" cy="200" r="9" fill={ink.night} />
      <rect x="237" y="200" width="6" height="22" fill={ink.night} />
    </g>
  )
}

function Breaker() {
  return (
    <g>
      <rect width="400" height="300" fill={ink.dusk} />
      <rect x="60" y="30" width="280" height="240" fill={ink.night} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={90 + i * 60} y="120" width="36" height="80" fill={ink.bone} />
          <rect x={98 + i * 60} y={i === 0 ? 168 : 130} width="20" height="24" fill={ink.night} />
        </g>
      ))}
      <rect x="86" y="208" width="44" height="18" fill={accent.red} />
      <text x="108" y="221" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink.bone} fontFamily={mono}>
        TỔNG
      </text>
      <text x="108" y="110" textAnchor="middle" fontSize="11" fill={ink.bone} fontFamily={mono}>
        TẮT
      </text>
    </g>
  )
}

function Sandals() {
  return (
    <g>
      <rect width="400" height="300" fill={shade(ink.steel, -0.3)} />
      <rect y="0" width="400" height="90" fill={ink.dusk} />
      {[130, 250].map((x, i) => (
        <g key={x} transform={`rotate(${i ? 8 : -6} ${x} 180)`}>
          <ellipse cx={x} cy="180" rx="42" ry="92" fill={accent.teal} />
          {Array.from({ length: 12 }, (_, k) => (
            <circle key={k} cx={x - 18 + (k % 3) * 18} cy={120 + Math.floor(k / 3) * 36} r="6" fill={shade(accent.teal, -0.4)} />
          ))}
        </g>
      ))}
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'cong-ly': Cups,
  'cong-quat': Fan,
  'cong-so': LogBook,
  'hang-cuon': FabricRoll,
  'hang-pallet': Pallet,
  'hang-xe': Truck,
  'vp-tuong': BurnV,
  'vp-de': CoilStand,
  'vp-may': OpenTower,
  'vp-lich': Calendar,
  'sau-khoa': Padlock,
  'sau-cau-dao': Breaker,
  'sau-dep': Sandals,
}
