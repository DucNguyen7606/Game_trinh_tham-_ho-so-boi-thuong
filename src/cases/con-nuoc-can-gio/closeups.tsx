import { accent, ink, shade } from '@/art/palette'
import { C, LINE } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.
// Keyed by hotspot id from case.json.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

const Planks = ({ color = C.wood }: { color?: string }) => (
  <g>
    <rect width="400" height="300" fill={color} />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40 + 4} stroke={shade(color, -0.3)} strokeWidth="2" />
    ))}
  </g>
)

/** The drain hole: clean threads, no crack, plug gone. */
function DrainHole() {
  return (
    <g>
      <rect width="400" height="300" fill={C.hull} />
      <path d="M0,200 Q200,180 400,210 L400,300 L0,300 Z" fill={C.hullDark} />
      <circle cx="200" cy="140" r="56" fill={C.woodLit} {...O} />
      <circle cx="200" cy="140" r="34" fill={LINE} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2
        return <line key={i} x1={200 + Math.cos(a) * 36} y1={140 + Math.sin(a) * 36} x2={200 + Math.cos(a) * 46} y2={140 + Math.sin(a) * 46} stroke={shade(C.woodLit, -0.4)} strokeWidth="3" />
      })}
      <text x="200" y="232" textAnchor="middle" fontSize="12" fill="#e8e0d0" fontFamily={mono}>ren còn nguyên · không nứt</text>
    </g>
  )
}

/** Engine switched off, key slot empty. */
function Engine() {
  return (
    <g>
      <rect width="400" height="300" fill={C.metalDark} />
      <rect x="60" y="50" width="280" height="190" rx="14" fill={C.metal} {...O} />
      <rect x="90" y="80" width="120" height="70" rx="6" fill="#2a2522" {...O} />
      <text x="110" y="108" fontSize="12" fill="#e8e0d0" fontFamily={mono}>TẮT · MỞ</text>
      <path d="M126,130 L118,116" stroke={accent.red} strokeWidth="5" strokeLinecap="round" />
      <circle cx="270" cy="110" r="26" fill="#2a2522" {...O} />
      <rect x="264" y="98" width="12" height="24" rx="2" fill={LINE} />
      <text x="270" y="158" textAnchor="middle" fontSize="11" fill="#e8e0d0" fontFamily={mono}>ổ chìa trống</text>
      <rect x="100" y="180" width="200" height="16" rx="6" fill={C.metalDark} />
      <text x="200" y="222" textAnchor="middle" fontSize="11" fill="#e8e0d0" fontFamily={mono}>ga: số 0</text>
    </g>
  )
}

/** Two hooks under the cabin roof: one jacket, one empty. */
function Hooks() {
  return (
    <g>
      <Planks color={C.woodDark} />
      {[130, 270].map((x) => (
        <path key={x} d={`M${x},30 v50 q0,24 -24,24`} fill="none" stroke={C.metal} strokeWidth="9" strokeLinecap="round" />
      ))}
      <path d="M100,96 h60 l14,150 h-88 Z" fill="#2f6a8a" {...O} />
      <path d="M118,110 h24 v60 h-24 Z" fill="#244e66" />
      <text x="130" y="230" textAnchor="middle" fontSize="11" fill="#e8e0d0" fontFamily={mono}>TÂM</text>
      <text x="270" y="170" textAnchor="middle" fontSize="13" fill="#f3e4c4" fontFamily={mono}>(trống)</text>
    </g>
  )
}

function Net() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudGray} />
      <ellipse cx="200" cy="170" rx="160" ry="80" fill="#a6a46c" {...O} />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${60 + i * 24},110 q12,60 0,120`} stroke={shade('#a6a46c', -0.4)} strokeWidth="1.5" fill="none" />
      ))}
    </g>
  )
}

function GreyMud() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudGray} />
      <path d="M0,180 Q200,160 400,190 L400,300 L0,300 Z" fill={C.mudGrayDark} />
      {[[120, 120], [200, 170], [280, 130]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="18" ry="34" fill={C.mudGrayDark} transform={`rotate(-15 ${x} ${y})`} />
      ))}
      <ellipse cx="300" cy="240" rx="70" ry="14" fill={C.river} opacity="0.6" />
    </g>
  )
}

/** Open safe with the empty Kim Hưng box: 30 slots. */
function Safe() {
  return (
    <g>
      <rect width="400" height="300" fill="#2a2522" />
      <rect x="60" y="60" width="280" height="170" rx="8" fill="#9e2b22" {...O} />
      <rect x="76" y="76" width="248" height="138" rx="4" fill="#7a1f19" />
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => <rect key={`${r}-${c}`} x={86 + c * 23.5} y={86 + r * 42} width="18" height="34" rx="2" fill="#5a1611" />),
      )}
      <text x="200" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.gold} fontFamily={mono}>TIỆM VÀNG KIM HƯNG</text>
      <rect x="40" y="240" width="140" height="44" fill="#e7d2a8" {...O} />
      <text x="110" y="266" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>giấy nợ...</text>
    </g>
  )
}

/** Tide calendar with the 9th circled and the note. */
function TideCalendar() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1)
  return (
    <g>
      <Planks />
      <rect x="40" y="20" width="320" height="260" fill="#f3e4c4" {...O} />
      <rect x="40" y="20" width="320" height="36" fill={accent.red} />
      <text x="200" y="45" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily={mono}>LỊCH CON NƯỚC · THÁNG 9</text>
      {days.map((d, i) => (
        <text key={d} x={62 + (i % 7) * 44} y={86 + Math.floor(i / 7) * 34} fontSize="15" fill={ink.night} fontFamily={mono}>
          {d}
        </text>
      ))}
      <circle cx={62 + 1 * 44 + 6} cy={86 + 34 - 5} r="16" fill="none" stroke="#2f4258" strokeWidth="3" />
      <text x="70" y="186" fontSize="14" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic" transform="rotate(-3 200 186)">
        23g40 đứng · ròng → R.Đước
      </text>
      <text x="62" y="240" fontSize="10" fill={ink.night} opacity="0.6" fontFamily={mono}>con nước rong · 9/9 âm 18/7</text>
    </g>
  )
}

function Ledger() {
  const rows = ['12/8  xuất 400kg tôm', '20/8  xuất 260kg', '28/8  xuất 310kg', '02/9  Vinh cọc 600tr, giao 15/9']
  return (
    <g>
      <Planks color={C.woodLit} />
      <rect x="40" y="30" width="320" height="240" fill={ink.paper} {...O} />
      {rows.map((r, i) => (
        <text key={i} x="56" y={70 + i * 34} fontSize="13" fill={shade(accent.teal, -0.4)} fontFamily={mono}>
          {r}
        </text>
      ))}
      <rect x="52" y="168" width="296" height="22" fill={accent.amber} opacity="0.35" />
    </g>
  )
}

function Scale() {
  return (
    <g>
      <rect width="400" height="300" fill={C.metalDark} />
      <circle cx="200" cy="150" r="110" fill="#f3e4c4" {...O} />
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2 - Math.PI / 2
        return <line key={i} x1={200 + Math.cos(a) * 90} y1={150 + Math.sin(a) * 90} x2={200 + Math.cos(a) * 104} y2={150 + Math.sin(a) * 104} stroke={LINE} strokeWidth="2" />
      })}
      <path d="M200,150 V60" stroke={accent.red} strokeWidth="5" />
      <text x="200" y="200" textAnchor="middle" fontSize="16" fill={LINE} fontFamily={mono}>100 kg</text>
    </g>
  )
}

/** Blood-pressure box: a 30-day prescription, no blister packs left. */
function Medicine() {
  return (
    <g>
      <Planks color={C.woodLit} />
      <path d="M70,90 L250,90 L250,240 L70,240 Z" fill="#f6efe2" {...O} />
      <path d="M70,90 L110,60 L290,60 L250,90 Z" fill="#e7dfcf" {...O} />
      <path d="M250,90 L290,60 L290,210 L250,240 Z" fill="#cfc6b2" {...O} />
      <rect x="70" y="100" width="180" height="26" fill="#3f8a7e" />
      <text x="160" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily={mono}>AMLODIPIN 5mg</text>
      <text x="160" y="150" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>Hộp 3 vỉ × 10 viên</text>
      <rect x="250" y="200" width="120" height="70" fill="#fbf4e4" transform="rotate(8 310 235)" {...O} />
      <text x="310" y="232" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono} transform="rotate(8 310 235)">Lĩnh 05/09</text>
      <text x="310" y="248" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono} transform="rotate(8 310 235)">30 ngày</text>
      <text x="160" y="200" textAnchor="middle" fontSize="13" fill={accent.red} fontFamily={mono}>(trống)</text>
    </g>
  )
}

function PhoneOnBed() {
  return (
    <g>
      <rect width="400" height="300" fill="#e7d2a8" />
      <rect x="150" y="50" width="100" height="190" rx="14" fill="#1c130f" {...O} />
      <rect x="160" y="66" width="80" height="150" rx="6" fill="#2f4258" />
      <text x="200" y="120" textAnchor="middle" fontSize="22" fill="#fff" fontFamily={mono}>06:12</text>
      <text x="200" y="150" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={mono}>🔒 Nhập mật khẩu</text>
      <text x="200" y="200" textAnchor="middle" fontSize="10" fill="#c4e0c0" fontFamily={mono}>⚡ 100%</text>
      <path d="M200,240 Q210,280 330,290" fill="none" stroke="#f6efe2" strokeWidth="5" />
    </g>
  )
}

function Altar() {
  return (
    <g>
      <rect width="400" height="300" fill="#9e2b22" />
      <rect x="140" y="30" width="120" height="160" fill={accent.gold} {...O} />
      <rect x="152" y="42" width="96" height="136" fill="#d8cdb6" />
      <circle cx="200" cy="96" r="30" fill="#b9815a" />
      <path d="M180,90 q6,-4 10,0 M210,90 q6,-4 10,0 M186,110 q14,10 28,0" stroke={LINE} strokeWidth="2.5" fill="none" />
      <path d="M156,178 Q200,130 244,178 Z" fill="#6b6a35" />
      <rect x="60" y="200" width="280" height="100" fill={C.woodDark} />
      <rect x="80" y="160" width="40" height="50" rx="4" fill={accent.gold} />
      {[92, 100, 108].map((x) => (
        <line key={x} x1={x} y1="160" x2={x + 3} y2="100" stroke="#e8dcc4" strokeWidth="2" />
      ))}
      <ellipse cx="310" cy="200" rx="40" ry="12" fill="#f3e4c4" />
      <circle cx="296" cy="188" r="12" fill={accent.amber} />
      <circle cx="320" cy="186" r="12" fill="#9fbf5a" />
    </g>
  )
}

function Wardrobe() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <path d="M20,40 H380" stroke={C.metal} strokeWidth="6" />
      {[50, 100, 150, 250, 300, 350].map((x, i) => (
        <path key={x} d={`M${x},40 l-20,24 v150 h40 v-150 Z`} fill={['#f6efe2', '#7a9fb0', '#b0925c', '#cf9a32', '#6b6a35', '#ece2cf'][i]} {...O} />
      ))}
      <path d="M200,40 l-4,12" stroke={C.metal} strokeWidth="4" />
      <text x="200" y="140" textAnchor="middle" fontSize="12" fill="#f3e4c4" fontFamily={mono}>móc trống</text>
    </g>
  )
}

/** The torn orange strip with the painted name. */
function JacketStrip() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudRed} />
      <path d="M0,60 Q200,40 400,80" stroke={C.woodDark} strokeWidth="30" fill="none" strokeLinecap="round" />
      <path d="M40,300 Q120,160 200,70" stroke={C.woodDark} strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M120,110 L300,96 L310,170 L260,160 L270,200 L230,180 L200,210 L180,170 L130,190 Z" fill={accent.ember} {...O} />
      <text x="200" y="140" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1c130f" fontFamily="Barlow Condensed, sans-serif" transform="rotate(-4 200 140)">
        LỰC PH
      </text>
      <path d="M260,160 l8,10 M230,180 l4,12 M180,170 l-6,12" stroke="#f3e4c4" strokeWidth="2" />
    </g>
  )
}

/** Five hand-rolled cigarette ends lined up on a stump. */
function Butts() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudRed} />
      <ellipse cx="200" cy="150" rx="170" ry="100" fill="#c9a274" {...O} />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="200" cy="150" rx={150 - i * 24} ry={86 - i * 14} fill="none" stroke={shade('#c9a274', -0.25)} strokeWidth="2" />
      ))}
      {[110, 150, 190, 230, 270].map((x, i) => (
        <g key={x} transform={`rotate(${-10 + i * 5} ${x} 150)`}>
          <rect x={x - 18} y="142" width="36" height="14" rx="4" fill="#f3e4c4" {...O} strokeWidth={1.5} />
          <rect x={x + 10} y="142" width="8" height="14" fill="#5a4a3a" />
        </g>
      ))}
      <text x="200" y="230" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>giấy quyến · thuốc rê</text>
    </g>
  )
}

/** Red mud: the boat's nose dent and the long drag mark. */
function DragMark() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudRed} />
      <rect y="0" width="400" height="70" fill={C.river} />
      <path d="M200,300 Q190,180 170,70" stroke={C.mudRedDark} strokeWidth="60" fill="none" strokeLinecap="round" />
      <path d="M60,150 Q110,110 170,130 Q120,90 70,100 Z" fill={C.mudRedDark} {...O} />
      <text x="320" y="200" textAnchor="middle" fontSize="11" fill="#f3e4c4" fontFamily={mono}>bùn đỏ</text>
      <text x="110" y="180" textAnchor="middle" fontSize="11" fill="#f3e4c4" fontFamily={mono}>mũi xuồng</text>
    </g>
  )
}

function BrokenPole() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudRed} />
      <path d="M0,40 Q200,80 400,30" stroke={C.woodDark} strokeWidth="34" fill="none" />
      <line x1="40" y1="250" x2="300" y2="110" stroke="#c9b27a" strokeWidth="30" strokeLinecap="round" />
      {[110, 180, 250].map((x, i) => (
        <line key={x} x1={x} y1={214 - i * 38} x2={x + 10} y2={230 - i * 38} stroke={LINE} strokeWidth="4" />
      ))}
      <path d="M296,96 l26,-18 l-6,22 l20,2 l-22,14 l10,10 l-26,-4 Z" fill="#f6efe2" {...O} />
      <text x="320" y="160" textAnchor="middle" fontSize="11" fill="#f3e4c4" fontFamily={mono}>gãy mới</text>
    </g>
  )
}

function CrabHoles() {
  return (
    <g>
      <rect width="400" height="300" fill={C.mudRed} />
      {[[80, 100], [200, 160], [300, 90], [140, 230], [320, 220]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="26" ry="14" fill={C.mudRedDark} {...O} />
      ))}
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

/** Blue paint on the hull, faded, with barnacles grown over its edge: an old scrape. */
function NPaint() {
  return (
    <g>
      <rect width="400" height="300" fill="#7a4f32" />
      {[40, 100, 160, 220, 280].map((y) => <path key={y} d={`M0,${y} h400`} stroke="#573721" strokeWidth="3" />)}
      <path d="M30,130 q90,-24 180,-8 q90,14 170,-6 l-6,40 q-90,16 -170,6 q-90,-10 -170,10 Z" fill="#3f78b0" opacity="0.6" />
      {Array.from({ length: 14 }, (_, k) => (
        <g key={k}>
          <circle cx={40 + k * 25} cy={k % 2 ? 128 : 172} r="7" fill="#d8d2c2" {...NO} strokeWidth={1.5} />
          <circle cx={40 + k * 25} cy={k % 2 ? 128 : 172} r="2.5" fill="#6b6458" />
        </g>
      ))}
      <rect x="110" y="232" width="180" height="26" rx="4" fill="#000" opacity="0.5" />
      <NText x={200} y={250} t="sơn bạc · hà bám lên mép" fill="#e8dcc4" size={11} weight={400} />
    </g>
  )
}

/** The office raincoat: dry and dusty. */
function NRaincoat() {
  return (
    <g>
      <NBg top="#6b5a44" floor="#4a3a2c" y={250} />
      <circle cx="200" cy="40" r="7" fill="#2a2a2a" />
      <path d="M200,40 l-60,40 v170 h120 v-170 Z" fill="#e8c84a" {...NO} />
      <path d="M140,80 l-40,90 l26,8 l20,-60 M260,80 l40,90 l-26,8 l-20,-60" fill="#d8b83a" {...NO} />
      {Array.from({ length: 22 }, (_, k) => (
        <circle key={k} cx={150 + (k * 37) % 100} cy={84 + (k * 23) % 50} r="2" fill="#8a7a5a" opacity="0.6" />
      ))}
    </g>
  )
}

/** Hồng's savings book, opened on 20/5. */
function NSavings() {
  return (
    <g>
      <NBg top="#5a4134" floor="#7a4f32" y={60} />
      <rect x="60" y="70" width="280" height="190" rx="6" fill="#c8546a" {...NO} />
      <rect x="74" y="82" width="252" height="166" rx="3" fill="#f6efe2" {...NO} strokeWidth={1.5} />
      <NText x={200} y={106} t="SỔ TIẾT KIỆM" size={13} />
      <NText x={92} y={136} t="Chủ sổ: PHẠM THỊ HỒNG" size={10} anchor="start" weight={400} />
      <NText x={92} y={160} t="Ngày mở: 20/05/2025" size={10} anchor="start" weight={400} />
      <NText x={92} y={190} t="Số tiền: 200.000.000 đ" size={12} anchor="start" />
      <NText x={92} y={216} t="Kỳ hạn: 6 tháng" size={10} anchor="start" weight={400} />
    </g>
  )
}

/** Two old beer cans, half sunk in mud. */
function NCans() {
  return (
    <g>
      <rect width="400" height="300" fill="#8a3a2a" />
      {[120, 250].map((x, i) => (
        <g key={x} transform={`rotate(${i ? 70 : -20} ${x} 170)`}>
          <rect x={x - 30} y="110" width="60" height="110" rx="8" fill="#a9aeb2" {...NO} />
          <rect x={x - 30} y="140" width="60" height="40" fill="#c9b27a" opacity="0.5" />
          <rect x={x - 30} y="190" width="60" height="30" fill="#7a3a22" opacity="0.8" />
        </g>
      ))}
      <path d="M0,220 q100,-20 200,0 t200,0 v80 h-400 Z" fill="#7a2f22" />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'ghe-lu': DrainHole,
  'ghe-may': Engine,
  'ghe-moc': Hooks,
  'ghe-luoi': Net,
  'ghe-bun': GreyMud,
  'vp-ket': Safe,
  'vp-lich': TideCalendar,
  'vp-so': Ledger,
  'vp-can': Scale,
  'nha-thuoc': Medicine,
  'nha-dt': PhoneOnBed,
  'nha-tho': Altar,
  'nha-tu': Wardrobe,
  'rach-phao': JacketStrip,
  'rach-thuoc': Butts,
  'rach-bun': DragMark,
  'rach-sao': BrokenPole,
  'rach-cua': CrabHoles,
  'ghe-son': NPaint,
  'vp-ao': NRaincoat,
  'nha-so': NSavings,
  'rach-lon': NCans,
}
