import { accent, ink, shade } from '@/art/palette'
import { rng } from '@/art/primitives'

import { C, LINE } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.
// Keyed by hotspot id from case.json.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x = 200, y, children, fill = '#e8e0d0' }: { x?: number; y: number; children: React.ReactNode; fill?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="12" fill={fill} fontFamily={mono}>
    {children}
  </text>
)

const Pepper = ({ n, seed, x = 0, y = 0, w = 400, h = 300 }: { n: number; seed: number; x?: number; y?: number; w?: number; h?: number }) => {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + r() * w} cy={y + r() * h} r={3 + r() * 2.5} fill={C.pepper} />
      ))}
    </g>
  )
}

/** The cut seal: wrong number. */
function Seal() {
  return (
    <g>
      <rect width="400" height="300" fill={C.boxDark} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={30 + i * 70} y1="0" x2={30 + i * 70} y2="300" stroke={shade(C.boxDark, -0.3)} strokeWidth="6" />
      ))}
      <rect x="80" y="0" width="22" height="300" fill={C.metal} {...O} />
      <path d="M102,120 Q170,110 190,150" fill="none" stroke="#e8e0d0" strokeWidth="5" />
      <path d="M200,170 Q214,200 206,236" fill="none" stroke="#e8e0d0" strokeWidth="5" />
      <rect x="160" y="140" width="130" height="56" rx="8" fill={accent.gold} {...O} />
      <text x="225" y="176" textAnchor="middle" fontSize="20" fontWeight="700" fill={LINE} fontFamily={mono}>AT-55190</text>
      <path d="M190,150 l10,10 M196,148 l10,10" stroke={accent.red} strokeWidth="3" />
      <Label y={262}>biên bản đóng hàng: AT-55120</Label>
    </g>
  )
}

/** Pepper and fine white sand in the floor seams. */
function Floor() {
  return (
    <g>
      <rect width="400" height="300" fill="#8a6a46" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <line x1="0" y1={30 + i * 50} x2="400" y2={36 + i * 50} stroke={shade('#8a6a46', -0.45)} strokeWidth="6" />
          <path d={`M0,${33 + i * 50} Q200,${28 + i * 50} 400,${39 + i * 50}`} stroke={C.sand} strokeWidth="3" fill="none" opacity="0.9" />
        </g>
      ))}
      <Pepper n={26} seed={4} y={20} h={240} />
      <Label y={290} fill="#f3e4c4">cát trắng · hạt tiêu</Label>
    </g>
  )
}

/** The GPS jammer in the cigarette socket. */
function Jammer() {
  return (
    <g>
      <rect width="400" height="300" fill="#2a2522" />
      <rect x="0" y="200" width="400" height="100" fill="#3a332f" />
      <circle cx="120" cy="170" r="30" fill="#141010" {...O} />
      <rect x="140" y="140" width="150" height="60" rx="8" fill="#1c1c1c" {...O} />
      {[170, 210, 250, 280].map((x, i) => (
        <line key={x} x1={x} y1="140" x2={x + (i - 1.5) * 10} y2={60 + (i % 2) * 20} stroke="#1c1c1c" strokeWidth="7" strokeLinecap="round" />
      ))}
      <circle cx="270" cy="170" r="6" fill="#7fe08a" />
      <text x="214" y="176" textAnchor="middle" fontSize="11" fill="#9a9a9a" fontFamily={mono}>GPS·4G</text>
      <Label y={250}>cắm ở ổ tẩu, dưới ghế phụ</Label>
    </g>
  )
}

function GpsBox() {
  return (
    <g>
      <rect width="400" height="300" fill={C.cab} />
      <rect x="90" y="100" width="220" height="90" rx="12" fill={C.metalDark} {...O} />
      <circle cx="280" cy="145" r="10" fill="#7fe08a" />
      <text x="170" y="152" textAnchor="middle" fontSize="13" fill="#e8e0d0" fontFamily={mono}>GSHT · QC31</text>
    </g>
  )
}

function Tyre() {
  return (
    <g>
      <rect width="400" height="300" fill={C.dirt} />
      <circle cx="200" cy="140" r="120" fill={C.tyre} {...O} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        return <rect key={i} x={200 + Math.cos(a) * 108 - 6} y={140 + Math.sin(a) * 108 - 6} width="12" height="12" fill={C.dirtLit} opacity="0.7" />
      })}
      <circle cx="200" cy="140" r="56" fill={C.metal} {...O} />
    </g>
  )
}

/** Tape cut clean with scissors, only three turns. */
function Tape() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grass} />
      {[[60, 80, -6], [90, 150, 4], [70, 220, -2]].map(([x, y, rot], i) => (
        <g key={i} transform={`rotate(${rot} 200 ${y})`}>
          <rect x={x} y={y - 16} width="260" height="32" fill="#a9a9a2" {...O} />
          <line x1={x} y1={y - 16} x2={x} y2={y + 16} stroke={accent.red} strokeWidth="4" />
          <line x1={x + 260} y1={y - 16} x2={x + 260} y2={y + 16} stroke={accent.red} strokeWidth="4" />
        </g>
      ))}
      <Label y={280} fill="#f3e4c4">đầu cắt phẳng · 3 vòng</Label>
    </g>
  )
}

function Wallet() {
  return (
    <g>
      <rect width="400" height="300" fill="#3a332f" />
      <rect x="60" y="80" width="160" height="110" rx="10" fill="#5a3a24" {...O} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={78 + i * 8} y={60 - i * 4} width="120" height="40" fill="#5fa07a" {...O} strokeWidth={1.5} />
      ))}
      <text x="140" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f3e4c4" fontFamily={mono}>4.200.000đ</text>
      <rect x="250" y="70" width="80" height="150" rx="12" fill="#1c130f" {...O} />
      <rect x="258" y="82" width="64" height="120" rx="4" fill="#3f8a7e" />
      <Label y={262}>còn nguyên trong túi áo</Label>
    </g>
  )
}

function NoSkid() {
  const rDots = rng(3)
  return (
    <g>
      <rect width="400" height="300" fill={C.asphalt} />
      <path d="M0,150 L400,130" stroke="#f3e4c4" strokeWidth="8" strokeDasharray="50 40" />
      {Array.from({ length: 50 }, (_, i) => {
        const r = rDots
        return <circle key={i} cx={r() * 400} cy={r() * 300} r="1.5" fill={C.asphaltLit} />
      })}
      <Label y={240}>không có vệt phanh</Label>
    </g>
  )
}

function KmPost() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grassDark} />
      <path d="M130,290 L130,110 Q200,50 270,110 L270,290 Z" fill="#f3e4c4" {...O} />
      <path d="M130,110 Q200,50 270,110 L270,140 L130,140 Z" fill={accent.red} {...O} />
      <text x="200" y="190" textAnchor="middle" fontSize="22" fontWeight="700" fill={LINE} fontFamily="Barlow Condensed, sans-serif">PHAN THIẾT 18</text>
      <text x="200" y="230" textAnchor="middle" fontSize="22" fontWeight="700" fill={LINE} fontFamily="Barlow Condensed, sans-serif">TP.HCM 182</text>
    </g>
  )
}

function Stall() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tinDark} />
      {Array.from({ length: 20 }, (_, i) => (
        <line key={i} x1={i * 20 + 10} y1="0" x2={i * 20 + 10} y2="300" stroke={shade(C.tinDark, -0.3)} strokeWidth="4" />
      ))}
      <rect x="120" y="120" width="160" height="60" fill="#cfa45a" {...O} />
      <text x="200" y="158" textAnchor="middle" fontSize="16" fill={LINE} fontFamily="Barlow Condensed, sans-serif">NƯỚC MÍA · 10K</text>
    </g>
  )
}

/** The seal ledger: 55120 issued to the truck, 55190 handed to the driver as a spare and never returned. */
function SealLedger() {
  const rows: [string, string, boolean?][] = [
    ['AT-55118', '30/10 · xe 51C', false],
    ['AT-55119', '31/10 · xe 47H', false],
    ['AT-55120', '02/11 · xe 47H · Đạt', false],
    ['AT-55190', 'dự phòng · tài xế 47H · Đạt', true],
  ]
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="40" y="24" width="320" height="252" fill="#f3e4c4" {...O} />
      <text x="200" y="52" textAnchor="middle" fontSize="14" fontWeight="700" fill={LINE} fontFamily={mono}>SỔ CẤP CHÌ · LÔ 55101–55200</text>
      {rows.map(([n, note, struck], i) => (
        <g key={n}>
          <text x="58" y={96 + i * 40} fontSize="13" fill={LINE} fontFamily={mono}>{n}</text>
          <text x="160" y={96 + i * 40} fontSize="12" fill={struck ? accent.red : '#2f4258'} fontFamily="Bitter, serif" fontStyle="italic">{note}</text>
          {struck && <text x="160" y={119 + i * 40} fontSize="10" fill={accent.red} fontFamily={mono}>trả lại: ___</text>}
          <line x1="50" y1={104 + i * 40} x2="350" y2={104 + i * 40} stroke={shade(ink.paper, -0.25)} strokeWidth="1" />
        </g>
      ))}
    </g>
  )
}

function PriceBoard() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="30" y="30" width="340" height="240" fill="#2c3b33" {...O} />
      <g fill="#f3efe4" fontFamily="Bitter, serif" textAnchor="middle">
        <text x="200" y="80" fontSize="20">GIÁ TIÊU HÔM NAY</text>
        <text x="200" y="150" fontSize="54" fontWeight="700">152.000</text>
        <text x="200" y="190" fontSize="16">đ/kg · tiêu đen 500g/l</text>
        <text x="280" y="240" fontSize="18" opacity="0.75">đầu năm 98</text>
      </g>
    </g>
  )
}

function SackStack() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tinDark} />
      {[0, 1].map((r) =>
        [0, 1, 2].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={20 + c * 124} y={60 + r * 110} width="118" height="100" rx="26" fill={C.sack} {...O} />
            <text x={79 + c * 124} y={118 + r * 110} textAnchor="middle" fontSize="13" fontWeight="700" fill="#7d2f2a" fontFamily="Barlow Condensed, sans-serif">ĐẤT ĐỎ</text>
            <text x={79 + c * 124} y={136 + r * 110} textAnchor="middle" fontSize="11" fill="#7d2f2a" fontFamily={mono}>LÔ DD-1103</text>
          </g>
        )),
      )}
    </g>
  )
}

function Camera() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tinDark} />
      <rect x="180" y="0" width="40" height="90" fill={C.metal} {...O} />
      <path d="M110,90 L290,90 L274,190 L126,190 Z" fill="#e8e4dc" {...O} />
      <circle cx="200" cy="190" r="26" fill="#1c130f" {...O} />
      <path d="M150,60 L250,240" stroke={accent.red} strokeWidth="3" opacity="0.6" />
      <Label y={262}>dây nguồn bị rút</Label>
    </g>
  )
}

function DeskTop() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="40" y="60" width="140" height="180" fill="#f3e4c4" {...O} transform="rotate(-6 110 150)" />
      <text x="110" y="100" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono} transform="rotate(-6 110 150)">HÓA ĐƠN ĐIỆN</text>
      <rect x="230" y="80" width="110" height="150" rx="8" fill="#3a332f" {...O} />
      <ellipse cx="300" cy="260" rx="40" ry="16" fill="#9fbf9a" {...O} />
    </g>
  )
}

/** White sand floor, spilled pepper and fresh forklift tracks. */
function SandFloor() {
  return (
    <g>
      <rect width="400" height="300" fill={C.sand} />
      <path d="M0,90 L400,110 M0,190 L400,210" stroke="#a69c86" strokeWidth="36" opacity="0.5" />
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x={i * 20} y="96" width="8" height="18" fill="#8a826f" opacity="0.5" />
      ))}
      <Pepper n={60} seed={12} />
      <Label y={290} fill={LINE}>vệt xe nâng · hạt tiêu · cát trắng</Label>
    </g>
  )
}

function SackScrap() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="180" y="0" width="40" height="300" fill={C.woodDark} />
      <circle cx="200" cy="70" r="8" fill={C.metal} {...O} />
      <path d="M150,70 L300,90 L280,230 L220,200 L170,250 L130,150 Z" fill={C.sack} {...O} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={140 + i * 18} y1="80" x2={150 + i * 16} y2="230" stroke={C.sackDark} strokeWidth="1.5" />
      ))}
      <text x="214" y="140" textAnchor="middle" fontSize="22" fontWeight="700" fill="#7d2f2a" fontFamily="Barlow Condensed, sans-serif" transform="rotate(6 214 140)">ĐẤT ĐỎ</text>
      <text x="214" y="168" textAnchor="middle" fontSize="15" fill="#7d2f2a" fontFamily={mono} transform="rotate(6 214 168)">LÔ DD-11 02</text>
    </g>
  )
}

function Gate() {
  return (
    <g>
      <rect width="400" height="300" fill="#88a6c0" />
      <path d="M0,200 Q200,150 400,190 L400,300 L0,300 Z" fill={C.sand} />
      <rect x="40" y="40" width="60" height="260" fill="#d8d0c0" {...O} />
      <path d="M100,120 H400 M100,200 H400" stroke={C.metalDark} strokeWidth="10" />
      <rect x="120" y="140" width="40" height="40" rx="4" fill={accent.gold} {...O} />
      <rect x="44" y="14" width="64" height="34" rx="6" fill="#e8e4dc" {...O} />
      <circle cx="76" cy="48" r="9" fill="#1c130f" />
      <Label x={250} y={260} fill={LINE}>ổ khóa mới · camera cổng</Label>
    </g>
  )
}

function Leftovers() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={30 + (i % 3) * 110} y={120 + Math.floor(i / 3) * 70} width="96" height="56" rx="6" fill="#f6efe2" {...O} />
      ))}
      {[40, 90, 140, 260, 320].map((x) => (
        <rect key={x} x={x} y={40} width="26" height="70" rx="8" fill="#cfe6f0" {...O} strokeWidth={1.5} />
      ))}
      <Label y={290} fill="#f3e4c4">6 hộp cơm</Label>
    </g>
  )
}


// Close-ups for the noise hotspots added in the tightening pass.
const NO = { stroke: '#1d1512', strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const NBg = ({ top = '#3a2f2a', floor = '#5a4232', y = 170 }: { top?: string; floor?: string; y?: number }) => (
  <g>
    <rect width="400" height="300" fill={top} />
    <rect y={y} width="400" height={300 - y} fill={floor} />
  </g>
)
const NText = ({ x, y, t, size = 11, fill = '#2d1f18', anchor = 'middle', weight = 700 }: { x: number; y: number; t: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="IBM Plex Mono, monospace">{t}</text>
)

/** Boot prints round the container. One sits on top of the police patrol car's tyre track. */
function NPrints() {
  return (
    <g>
      <rect width="400" height="300" fill="#9a4a2a" />
      {/* Patrol car tyre track, laid down at 06:30 */}
      <path d="M0,150 h400 M0,196 h400" stroke="#6a2f18" strokeWidth="30" opacity="0.6" />
      {Array.from({ length: 20 }, (_, k) => <path key={k} d={`M${k * 20},140 v20 M${k * 20 + 6},186 v20`} stroke="#5a2410" strokeWidth="4" />)}
      {[[90, 90, -10], [160, 250, 20], [300, 80, 5]].map(([x, y, r], k) => (
        <ellipse key={k} cx={x} cy={y} rx="20" ry="40" fill="#5a2410" opacity="0.7" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {/* This one presses into the tyre track: made after the patrol car arrived */}
      <g transform="rotate(8 240 172)">
        <ellipse cx="240" cy="172" rx="22" ry="44" fill="#4a1a08" />
        {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M224,${146 + k * 10} h32`} stroke="#9a4a2a" strokeWidth="3" />)}
      </g>
      <rect x="110" y="262" width="180" height="26" rx="4" fill="#000" opacity="0.5" />
      <NText x={200} y={280} t="dấu ủng in đè vệt xe tuần tra" fill="#e8dcc4" size={10} weight={400} />
    </g>
  )
}

/** Paper cups and melon-seed shells from the roadside stall. */
function NSeeds() {
  return (
    <g>
      <NBg top="#2a2f3a" floor="#6a5a3a" y={90} />
      {Array.from({ length: 34 }, (_, k) => (
        <ellipse key={k} cx={40 + (k * 61) % 330} cy={130 + (k * 41) % 150} rx="7" ry="4" fill="#1a1a1a" transform={`rotate(${k * 37} ${40 + (k * 61) % 330} ${130 + (k * 41) % 150})`} />
      ))}
      {[[120, 170], [270, 220]].map(([x, y], k) => (
        <path key={k} d={`M${x - 26},${y - 40} h52 l-8,70 h-36 Z`} fill="#f3e4c4" fillOpacity="0.7" {...NO} />
      ))}
    </g>
  )
}

/** Tài's scrap of arithmetic under the desk glass. */
function NScrap() {
  return (
    <g>
      <rect width="400" height="300" fill="#6b4c36" />
      <rect x="20" y="20" width="360" height="260" fill="#c9e1e6" opacity="0.12" />
      <g transform="rotate(-3 200 150)">
        <rect x="60" y="56" width="280" height="190" fill="#f6efe2" {...NO} />
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M74,${92 + i * 26} h252`} stroke="#9fb4c8" strokeWidth="1" />)}
        <text x="80" y="88" fontSize="15" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic">20 tấn × 152 = 3,04 tỷ</text>
        <text x="80" y="128" fontSize="15" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic">HĐ Tây 98 → lỗ 1,08 tỷ</text>
        <text x="80" y="170" fontSize="14" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic">Mất hàng có CA xác nhận</text>
        <text x="80" y="194" fontSize="14" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic">= miễn phạt ??</text>
        <path d="M76,206 q60,8 120,-2" stroke="#b23a2e" strokeWidth="2" fill="none" />
      </g>
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'bx-chi': Seal,
  'bx-san': Floor,
  'bx-cabin': Jammer,
  'bx-gps': GpsBox,
  'bx-banh': Tyre,
  'ld-bang': Tape,
  'ld-vi': Wallet,
  'ld-phanh': NoSkid,
  'ld-cot': KmPost,
  'ld-quan': Stall,
  'kd-so': SealLedger,
  'kd-bang': PriceBoard,
  'kd-bao': SackStack,
  'kd-cam': Camera,
  'kd-ban': DeskTop,
  'pr-hat': SandFloor,
  'pr-the': SackScrap,
  'pr-cong': Gate,
  'pr-chai': Leftovers,
  'bx-dau-giay': NPrints,
  'ld-hat-dua': NSeeds,
  'kd-nhap': NScrap,
}
