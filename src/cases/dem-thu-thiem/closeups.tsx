import { accent, ink, shade } from '@/art/palette'
import { C, LINE } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** Road edge: clean asphalt, two tracks leaving it straight and sinking evenly. */
function RoadEdge() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mud} />
      <path d="M0,0 H400 V110 Q200,124 0,110 Z" fill={C.asphalt} />
      <path d="M0,110 Q200,124 400,110" stroke={shade(C.asphalt, -0.3)} strokeWidth="5" fill="none" />
      {[110, 260].map((x) => (
        <g key={x}>
          <path d={`M${x},116 L${x + 10},300`} stroke={C.mudDark} strokeWidth="38" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={x - 14} y1={130 + i * 22} x2={x + 16} y2={134 + i * 22} stroke={shade(C.mudDark, -0.3)} strokeWidth="3" />
          ))}
        </g>
      ))}
      <Label x={200} y={50} t="mặt nhựa: không vết phanh" />
      <Label x={200} y={66} t="không vết lết" />
      <Label x={330} y={240} t="lún đều, thẳng" />
    </g>
  )
}

/** One pair of dress-shoe prints, toes dug in, heels barely touching. */
function PushPrints() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mud} />
      {[[150, 170, -8], [250, 160, 6]].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x} ${y})`}>
          <path d={`M${x - 18},${y - 60} Q${x},${y - 84} ${x + 18},${y - 60} L${x + 16},${y} Q${x},${y + 8} ${x - 16},${y} Z`} fill={C.mudDark} {...O} strokeWidth={1.5} />
          <ellipse cx={x} cy={y - 58} rx="14" ry="12" fill={shade(C.mudDark, -0.4)} />
          <rect x={x - 12} y={y + 22} width="24" height="20" rx="4" fill={C.mudDark} opacity="0.35" />
        </g>
      ))}
      <path d="M200,40 V10 M190,22 l10,-12 l10,12" stroke="#f3e4c4" strokeWidth="2.5" fill="none" />
      <Label x={200} y={58} t="hướng về phía xe" />
      <Label x={90} y={270} t="giày tây · cỡ 40" />
      <Label x={310} y={270} t="mũi lún sâu, gót nhẹ" />
    </g>
  )
}

/** Front of the car: tree crush in the middle, a different round dent with red paint on the right. */
function CarFront() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grassDark} />
      <rect x="40" y="0" width="70" height="300" fill="#5a4636" {...O} />
      <g {...O}>
        <path d="M60,90 L360,80 Q384,82 384,110 L380,230 L60,236 Z" fill={C.car} />
        <path d="M60,100 Q120,140 110,230" fill={shade(C.car, 0.18)} />
        <rect x="160" y="110" width="120" height="44" rx="10" fill="#0d0d10" />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1={170 + i * 24} y1="118" x2={170 + i * 24} y2="148" stroke={C.chrome} strokeWidth="2" />
        ))}
        <circle cx="220" cy="132" r="9" fill={C.chrome} />
        {/* Round dent with red paint, right corner */}
        <path d="M290,170 Q330,150 366,176 Q372,210 340,224 Q300,226 290,200 Z" fill={shade(C.car, 0.12)} />
        <circle cx="348" cy="196" r="14" fill={ink.night} />
      </g>
      <path d="M298,178 l26,6 M300,196 l30,-6 M308,212 l20,2" stroke={C.wave} strokeWidth="5" strokeLinecap="round" />
      <path d="M76,120 l10,6 M80,160 l14,-4 M70,200 l12,4" stroke="#c9a274" strokeWidth="4" />
      <Label x={110} y={270} t="giữa/trái: nhựa cây, vỏ dầu" />
      <Label x={300} y={270} t="phải: sơn đỏ" />
      <Label x={300} y={60} t="đèn sương mù: mất kính" />
    </g>
  )
}

/** Driver's seat: belt rolled neatly, gear lever in N, key on the passenger seat. */
function Cockpit() {
  return (
    <g>
      <rect width="400" height="300" fill="#202227" />
      <g {...O}>
        <path d="M30,300 L50,90 Q60,60 110,60 L150,60 Q180,60 180,100 L180,300 Z" fill="#3a332f" />
        <rect x="160" y="60" width="18" height="200" fill="#2a2522" />
        <path d="M170,70 L170,250" stroke="#55555b" strokeWidth="10" />
        <rect x="210" y="180" width="70" height="90" rx="10" fill="#2a2522" />
        <rect x="232" y="196" width="26" height="40" rx="8" fill={C.chrome} />
        <path d="M300,300 L310,140 Q314,110 350,110 L400,110 V300 Z" fill="#3a332f" />
        <rect x="330" y="200" width="44" height="26" rx="8" fill={C.car} />
      </g>
      <text x="245" y="258" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent.amber} fontFamily={mono}>N</text>
      <circle cx="352" cy="213" r="5" fill={C.chrome} />
      <Label x={100} y={40} t="dây an toàn: cuộn gọn" />
      <Label x={245} y={290} t="cần số" />
      <Label x={352} y={190} t="chìa khóa" />
      <Label x={310} y={40} t="túi khí: không bung" />
    </g>
  )
}

function CowPen() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grass} />
      <rect x="0" y="0" width="400" height="90" fill={C.sky} />
      <g {...O}>
        <rect x="80" y="90" width="240" height="150" fill={C.woodDark} />
        <rect x="160" y="130" width="80" height="110" fill="#2a2018" />
        <path d="M150,180 H250" stroke="#9a968f" strokeWidth="7" />
        <rect x="186" y="168" width="28" height="30" rx="5" fill="#c9b27a" />
      </g>
      <Label x={200} y={268} t="khóa xích · hàng rào nguyên" c="#f3e4c4" />
      <Label x={200} y={286} t="đất khô" c="#f3e4c4" />
    </g>
  )
}

function PaintOutline() {
  return (
    <g>
      <rect width="400" height="300" fill={C.asphalt} />
      <g fill="none" stroke="#f2efe6" strokeWidth="4" strokeDasharray="12 7">
        <path d="M40,90 L280,80 L300,170 L60,180 Z" />
        <path d="M290,210 q30,-30 70,-20 q30,14 20,50 q-40,24 -80,6 Z" />
      </g>
      <Label x={170} y={130} t="xe Wave" />
      <Label x={335} y={230} t="nạn nhân" />
      <Label x={200} y={280} t="CA phường Thảo Điền · 22:47" />
    </g>
  )
}

function DrainGlass() {
  return (
    <g>
      <rect width="400" height="300" fill="#2a2a2e" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={30 + i * 46} y="0" width="16" height="300" fill="#55555b" />
      ))}
      {[[90, 140, 20], [190, 110, -10], [260, 170, 30], [140, 210, 0]].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x} ${y})`}>
          <path d={`M${x - 22},${y - 14} L${x + 24},${y - 18} L${x + 16},${y + 16} L${x - 18},${y + 12} Z`} fill="#dfe9ec" opacity="0.9" stroke={LINE} strokeWidth="1.5" />
          {[-8, 0, 8].map((d) => (
            <line key={d} x1={x - 18} y1={y + d} x2={x + 18} y2={y + d - 2} stroke="#9fb4c8" strokeWidth="1.5" />
          ))}
        </g>
      ))}
      <Label x={300} y={270} t="kính vân sọc ngang" />
    </g>
  )
}

function CoolantTrail() {
  return (
    <g>
      <rect width="400" height="300" fill={C.asphalt} />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx={30 + i * 32} cy={200 - i * 10} rx={14 - i * 0.7} ry={6} fill={C.coolant} opacity={0.9 - i * 0.05} />
      ))}
      <path d="M300,60 h60 M346,46 l14,14 l-14,14" stroke="#f3e4c4" strokeWidth="3" fill="none" />
      <Label x={330} y={100} t="về đường Thảo Điền" />
      <Label x={110} y={270} t="nước làm mát màu hồng" />
    </g>
  )
}

function BreadCart() {
  return (
    <g>
      <rect width="400" height="300" fill="#3a3538" />
      <g {...O}>
        <rect x="90" y="70" width="220" height="170" fill="#f6efe2" />
        <rect x="90" y="46" width="220" height="30" fill={accent.red} />
        <rect x="110" y="100" width="180" height="90" fill="#e7d2a8" />
        {[130, 170, 210, 250].map((x) => (
          <ellipse key={x} cx={x} cy="150" rx="18" ry="9" fill="#d9a35a" />
        ))}
      </g>
      <text x="200" y="68" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">BÁNH MÌ CHỊ HOA</text>
      <Label x={200} y={222} t="ĐT đặt bánh: 0908 •••" c={ink.night} />
    </g>
  )
}

function CoolantRing() {
  return (
    <g>
      <rect width="400" height="300" fill="#7a7771" />
      <ellipse cx="170" cy="200" rx="150" ry="50" fill={C.coolant} opacity="0.15" />
      <ellipse cx="170" cy="200" rx="150" ry="50" fill="none" stroke={C.coolant} strokeWidth="8" />
      <g {...O}>
        <rect x="270" y="80" width="120" height="12" fill={C.woodDark} />
        <rect x="300" y="20" width="56" height="60" rx="6" fill={C.coolant} />
      </g>
      <rect x="300" y="20" width="56" height="30" fill="#fff" opacity="0.35" />
      <Label x={300} y={112} t="can mới mở · vơi nửa" c={ink.night} />
      <Label x={170} y={280} t="đúng chỗ đầu xe" c={ink.night} />
    </g>
  )
}

function RedShards() {
  return (
    <g>
      <rect width="400" height="300" fill="#7a7771" />
      <line x1="360" y1="0" x2="330" y2="300" stroke={C.wood} strokeWidth="16" />
      {[[90, 170, 0], [160, 200, 30], [220, 150, -20], [130, 240, 60]].map(([x, y, r], i) => (
        <path key={i} transform={`rotate(${r} ${x} ${y})`} d={`M${x - 40},${y - 20} L${x + 36},${y - 26} L${x + 44},${y + 18} L${x - 30},${y + 24} Z`} fill={C.wave} {...O} />
      ))}
      <g transform="translate(250 230) rotate(-6)">
        <path d="M-60,-24 L60,-28 L66,22 L-56,26 Z" fill={shade(C.wave, -0.35)} {...O} />
        <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill={shade(C.wave, 0.35)} fontFamily="Barlow Condensed, sans-serif">HONDA</text>
      </g>
      <Label x={110} y={60} t="ốp đầu xe Wave" c={ink.night} />
    </g>
  )
}

function Bucket() {
  return (
    <g>
      <rect width="400" height="300" fill="#7a7771" />
      <g {...O}>
        <path d="M120,80 h160 l-20,180 h-120 Z" fill="#3f8a7e" />
        <ellipse cx="200" cy="80" rx="80" ry="18" fill="#5b8fa0" />
        <path d="M290,240 q40,-30 90,0 q-20,30 -90,0 Z" fill="#e8e2d4" />
      </g>
      <Label x={200} y={290} t="nước xà phòng" c={ink.night} />
    </g>
  )
}

function Innova() {
  return (
    <g>
      <rect width="400" height="300" fill={C.concreteDark} />
      <g transform="translate(200 170) scale(0.7)">
        <path d="M-230,70 L-230,0 Q-226,-20 -200,-24 L-140,-30 L-110,-90 L130,-90 Q150,-90 160,-70 L190,-20 L226,-10 Q240,-4 240,20 L240,70 Z" fill="#d4d0c6" {...O} />
        <path d="M-120,-36 L-96,-80 L110,-80 L140,-36 Z" fill={C.glass} {...O} />
        {[-140, 150].map((wx) => (
          <circle key={wx} cx={wx} cy="70" r="38" fill="#0d0d10" {...O} />
        ))}
      </g>
      <Label x={200} y={280} t="không trầy · capô nguội" c="#f3e4c4" />
    </g>
  )
}

/** The logbook: the torn stub, and pencil rubbing that brings out the pressed words. */
function Logbook() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="30" y="20" width="340" height="260" fill="#efe6d4" {...O} />
      <path d="M30,20 L44,20 L38,40 L46,60 L38,80 L46,100 L38,120 L46,140 L38,160 L46,180 L38,200 L46,220 L38,240 L46,260 L40,280 L30,280 Z" fill="#e2d6bd" stroke={LINE} strokeWidth="1.5" />
      <rect x="70" y="70" width="290" height="150" fill="#6b6660" opacity="0.4" />
      <g fill="#f6efe2" fontFamily={mono} fontSize="12">
        <text x="80" y="100">22:58 Mercedes 51K vào</text>
        <text x="80" y="120">  cậu Khoa lái, đầu xe bể</text>
        <text x="80" y="170">02:15 ông Khải lái</text>
        <text x="80" y="190">  Mercedes ra, một mình</text>
      </g>
      <line x1="300" y1="250" x2="360" y2="236" stroke="#6b6660" strokeWidth="8" strokeLinecap="round" />
      <Label x={200} y={52} t="trang 6/12 đã bị xé · tô chì trang sau" c={ink.night} />
    </g>
  )
}

function GateCamera() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="110" y="40" width="200" height="90" rx="20" fill="#e8e2d4" {...O} />
      <circle cx="150" cy="85" r="28" fill={ink.night} />
      <rect x="120" y="160" width="180" height="90" fill="#fff8c4" {...O} strokeWidth={1.5} />
      <text x="210" y="196" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>hư từ 20/11</text>
      <text x="210" y="216" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>đã báo ông chủ</text>
    </g>
  )
}

function KeyBoard() {
  const labels = ['MERCEDES', 'INNOVA', 'KHO', 'SÂN THƯỢNG']
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="20" y="40" width="360" height="220" fill={C.woodDark} {...O} />
      {labels.map((l, i) => (
        <g key={l}>
          <circle cx={65 + i * 90} cy="90" r="7" fill={C.chrome} {...O} strokeWidth={1.5} />
          {i !== 0 && <rect x={55 + i * 90} y="104" width="20" height="56" rx="4" fill="#c9b27a" {...O} strokeWidth={1.5} />}
          <rect x={30 + i * 90} y="190" width="70" height="26" fill="#f3ead6" {...O} strokeWidth={1.5} />
          <text x={65 + i * 90} y="208" textAnchor="middle" fontSize="9" fill={ink.night} fontFamily={mono}>{l}</text>
        </g>
      ))}
      <Label x={65} y={140} t="trống" />
    </g>
  )
}

function Teapot() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <g {...O}>
        <ellipse cx="160" cy="170" rx="90" ry="70" fill="#c9a274" />
        <path d="M244,150 q60,-20 60,-70" stroke={LINE} strokeWidth="10" fill="none" />
        <rect x="140" y="88" width="40" height="20" rx="6" fill="#a8844f" />
        <rect x="270" y="190" width="50" height="46" rx="6" fill="#f6efe2" />
        <rect x="330" y="196" width="50" height="40" rx="6" fill="#f6efe2" />
      </g>
      <Label x={320} y={270} t="hai tách" />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'mep-duong': RoadEdge,
  'dau-giay': PushPrints,
  'dau-xe': CarFront,
  'khoang-lai': Cockpit,
  'bai-co': CowPen,
  'vach-son': PaintOutline,
  'ranh-nuoc': DrainGlass,
  'vet-nuoc': CoolantTrail,
  'xe-banh-mi': BreadCart,
  'vung-nuoc': CoolantRing,
  'goc-gara': RedShards,
  'xo-nuoc': Bucket,
  'xe-innova': Innova,
  'so-truc': Logbook,
  'camera-cong': GateCamera,
  'moc-chia-khoa': KeyBoard,
  'am-tra': Teapot,
}
