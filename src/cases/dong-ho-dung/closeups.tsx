import { accent, ink } from '@/art/palette'
import { C, LINE, PillBox, Toolbox, Watch } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** The watch in its evidence bag, crown pulled out to the time-setting position. */
function WatchBag() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tileA} />
      <rect x="50" y="30" width="300" height="230" rx="6" fill="#e9f0f2" opacity="0.9" {...O} />
      <rect x="50" y="30" width="300" height="24" fill={accent.red} opacity="0.85" />
      <text x="200" y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={mono}>VẬT CHỨNG · CA P. VÕ THỊ SÁU</text>
      <Watch x={190} y={155} r={62} />
      <path d="M290,150 L330,120" stroke={accent.amber} strokeWidth="2" strokeDasharray="5 4" />
      <Label x={335} y={112} t="núm: nấc 2" c={ink.night} />
      <Label x={300} y={236} t="kim giây đứng ở số 12" c={ink.night} />
    </g>
  )
}

/** The brass stair rod lifted off step three, screw holes clean. */
function StairRod() {
  return (
    <g>
      <rect width="400" height="300" fill={C.limDark} />
      <rect x="0" y="80" width="400" height="60" fill={C.lim} {...O} />
      <rect x="120" y="96" width="200" height="204" fill={C.runner} {...O} transform="rotate(5 220 200)" />
      <line x1="60" y1="150" x2="350" y2="110" stroke={C.brass} strokeWidth="9" strokeLinecap="round" />
      {[80, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy="110" r="9" fill="#2d1810" {...O} strokeWidth={1.5} />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M${x - 6},${106 + k * 3} l12,-2`} stroke="#9a5a3a" strokeWidth="1" />
          ))}
        </g>
      ))}
      <Label x={80} y={66} t="lỗ ốc trống" />
      <Label x={330} y={66} t="ren gỗ nguyên" />
      <Label x={200} y={30} t="không con ốc nào rơi lại" />
    </g>
  )
}

/** Top of the stairs: one slipper and the chipped newel post. */
function Landing() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="200" width="400" height="100" fill={C.lim} {...O} />
      <rect x="40" y="20" width="70" height="190" fill={C.lim} {...O} />
      <rect x="30" y="10" width="90" height="22" rx="4" fill={C.lim} {...O} />
      <rect x="92" y="100" width="18" height="14" fill="#e7c48a" />
      <path d="M200,212 q40,-24 96,-8 q14,12 -10,20 l-78,0 q-14,-4 -8,-12 Z" fill={C.green} {...O} />
      <line x1="0" y1="232" x2="400" y2="232" stroke={LINE} strokeWidth="3" />
      <Label x={190} y={110} t="← véc ni tróc" c={ink.night} />
      <Label x={250} y={270} t="dép ở mép bậc trên cùng" />
    </g>
  )
}

function Chalk() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tileA} />
      {Array.from({ length: 6 }, (_, i) =>
        [0, 1, 2].map((r) => (
          <path key={`${i}-${r}`} d={`M${i * 80 + 40},${r * 100 + 10} l30,30 l-30,30 l-30,-30 Z`} fill={r % 2 ? C.tileC : C.tileB} opacity="0.7" />
        )),
      )}
      <g stroke={C.chalk} strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M40,220 q-6,-30 30,-40 l120,-8 q40,-20 70,0 l80,10 q20,10 0,24 l-80,4 l-40,30 l-100,4 q-50,-4 -80,-24 Z" />
        <circle cx="330" cy="190" r="26" />
      </g>
      <Label x={200} y={40} t="đầu hướng vào chân tường" c={ink.night} />
    </g>
  )
}

function Grandfather() {
  return (
    <g>
      <rect width="400" height="300" fill={C.limDark} />
      <circle cx="200" cy="120" r="90" fill={C.dial} {...O} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <line key={i} x1={200 + Math.sin(a) * 74} y1={120 - Math.cos(a) * 74} x2={200 + Math.sin(a) * 84} y2={120 - Math.cos(a) * 84} stroke={LINE} strokeWidth="3" />
      })}
      <line x1="200" y1="120" x2="240" y2="140" stroke={LINE} strokeWidth="6" />
      <line x1="200" y1="120" x2="200" y2="52" stroke={LINE} strokeWidth="4" />
      <line x1="200" y1="220" x2="230" y2="290" stroke={C.brass} strokeWidth="5" />
      <Label x={300} y={250} t="vẫn chạy đúng giờ" />
    </g>
  )
}

function Pills() {
  return (
    <g>
      <rect width="400" height="300" fill={C.lim} />
      <PillBox x={20} y={70} s={1.3} empty={[[0, 0], [0, 1]]} />
      {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
        <text key={d} x={52 + i * 49} y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f3e4c4" fontFamily={mono}>
          {d}
        </text>
      ))}
      <rect x="28" y="179" width="48" height="48" fill="none" stroke={accent.amber} strokeWidth="4" />
      <Label x={282} y={262} t="T2 · Tối 21:00: còn 3 viên" />
    </g>
  )
}

function Landline() {
  return (
    <g>
      <rect width="400" height="300" fill={C.limDark} />
      <rect x="60" y="70" width="280" height="170" rx="20" fill="#2a2f35" {...O} />
      <path d="M66,90 q134,-90 268,0 l0,20 l-268,0 Z" fill="#3a4148" {...O} />
      <rect x="100" y="130" width="200" height="74" rx="4" fill="#9fd0a8" {...O} strokeWidth={1.5} />
      <text x="112" y="150" fontSize="11" fill={ink.night} fontFamily={mono}>CUỘC GỌI NHỠ (2)</text>
      <text x="112" y="172" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>CHÂU  09/03 20:00</text>
      <text x="112" y="194" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>CHÂU  09/03 20:14</text>
      <circle cx="320" cy="222" r="9" fill={accent.red} />
    </g>
  )
}

function Drawing() {
  return (
    <g>
      <rect width="400" height="300" fill="#efe6cf" />
      <rect x="30" y="20" width="340" height="260" fill={C.paper} {...O} strokeWidth={1.5} />
      <path d="M80,240 L80,140 L200,80 L320,140 L320,240 Z" fill="none" stroke="#2f4258" strokeWidth="2" />
      {[100, 170, 240].map((x) => (
        <rect key={x} x={x} y="160" width="44" height="60" fill="none" stroke="#2f4258" strokeWidth="1.5" />
      ))}
      <text x="250" y="60" fontSize="15" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Giữ nguyên.</text>
      <text x="250" y="80" fontSize="15" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Không bán.</text>
    </g>
  )
}

function Tray() {
  return (
    <g>
      <rect width="400" height="300" fill={C.lim} />
      <rect x="50" y="90" width="300" height="140" rx="10" fill="#b0925c" {...O} />
      <ellipse cx="170" cy="160" rx="70" ry="40" fill="#f4efe0" {...O} />
      <ellipse cx="170" cy="160" rx="50" ry="26" fill="#ece2cf" />
      <line x1="230" y1="150" x2="320" y2="130" stroke="#c9ccd0" strokeWidth="8" strokeLinecap="round" />
      <Label x={280} y={262} t="chén cháo ăn hết" />
    </g>
  )
}

function Window() {
  return (
    <g>
      <rect width="400" height="300" fill={C.sky} />
      <rect x="0" y="160" width="400" height="140" fill="#3b4255" />
      <rect x="250" y="20" width="14" height="280" fill="#6f6d67" {...O} />
      <rect x="216" y="70" width="44" height="22" rx="5" fill="#f2f2ee" {...O} strokeWidth={1.5} />
      <circle cx="218" cy="81" r="5" fill={LINE} />
      <rect x="0" y="0" width="40" height="300" fill={C.shutter} {...O} />
      <rect x="360" y="0" width="40" height="300" fill={C.shutter} {...O} />
      <Label x={200} y={250} t="camera tổ dân phố, ngay trên cổng" />
    </g>
  )
}

function Gate() {
  return (
    <g>
      <rect width="400" height="300" fill="#3b4255" />
      <rect x="290" y="0" width="14" height="300" fill="#6f6d67" {...O} />
      <rect x="250" y="40" width="50" height="24" rx="5" fill="#f2f2ee" {...O} strokeWidth={1.5} />
      <circle cx="252" cy="52" r="5" fill={LINE} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={20 + i * 38} y1="80" x2={20 + i * 38} y2="300" stroke={C.iron} strokeWidth="8" />
      ))}
      <rect x="0" y="80" width="400" height="12" fill={C.iron} />
      {Array.from({ length: 12 }, (_, i) => (
        <polygon key={i} points={`${i * 34},80 ${i * 34 + 10},${60 - (i % 3) * 6} ${i * 34 + 22},80`} fill="#9fd0c4" {...O} strokeWidth={1} />
      ))}
      <Label x={200} y={140} t="tường 3 m · mảnh chai" />
      <Label x={200} y={160} t="cổng là lối duy nhất" />
    </g>
  )
}

function Card() {
  return (
    <g>
      <rect width="400" height="300" fill={C.iron} />
      <rect x="60" y="60" width="280" height="160" fill="#fbf4e4" {...O} transform="rotate(-6 200 140)" />
      <g transform="rotate(-6 200 140)">
        <text x="200" y="100" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>(mặt sau)</text>
        <text x="90" y="140" fontSize="18" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">21:35. Bấm chuông</text>
        <text x="90" y="166" fontSize="18" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">không ai mở.</text>
        <text x="90" y="192" fontSize="18" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Mai tôi quay lại. H.</text>
      </g>
    </g>
  )
}

function Frangipani() {
  return (
    <g>
      <rect width="400" height="300" fill={C.laterite} />
      {Array.from({ length: 22 }, (_, i) => (
        <g key={i} transform={`translate(${(i * 71) % 380 + 10} ${(i * 43) % 260 + 20})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-8" rx="5" ry="9" fill="#fff6dc" transform={`rotate(${a})`} stroke={LINE} strokeWidth="0.8" />
          ))}
          <circle r="3" fill={accent.gold} />
        </g>
      ))}
    </g>
  )
}

function CafeSign() {
  return (
    <g>
      <rect width="400" height="300" fill={C.laterite} />
      <rect x="80" y="20" width="240" height="260" fill={C.lim} {...O} />
      <text x="200" y="74" textAnchor="middle" fontSize="28" fontWeight="700" fill="#f3e4c4" fontFamily="Bitter, serif">MÁI NGÓI</text>
      <rect x="110" y="110" width="180" height="110" fill="#fbf4e4" {...O} strokeWidth={1.5} />
      <text x="200" y="150" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>Tạm đóng cửa</text>
      <text x="200" y="172" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>từ 15/2</text>
      <text x="200" y="198" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>Xin lỗi quý khách</text>
    </g>
  )
}

function Tools() {
  return (
    <g>
      <rect width="400" height="300" fill="#6e4c34" />
      <Toolbox x={10} y={130} s={0.9} />
      {[260, 320].map((x) => (
        <g key={x} transform={`translate(${x} 90)`} {...O} strokeWidth={1.5}>
          <circle cx="0" cy="0" r="14" fill={C.brass} />
          <line x1="-8" y1="0" x2="8" y2="0" />
          <rect x="-4" y="12" width="8" height="54" fill={C.brass} />
          {[20, 30, 40, 50, 60].map((y) => (
            <line key={y} x1="-6" y1={y} x2="6" y2={y + 4} stroke="#8a5a3a" />
          ))}
          <circle cx="2" cy="40" r="2" fill={C.lim} stroke="none" />
          <circle cx="-2" cy="54" r="2" fill={C.lim} stroke="none" />
        </g>
      ))}
      <path d="M40,110 L200,90" stroke={accent.amber} strokeWidth="10" strokeLinecap="round" />
      <path d="M200,90 L232,86" stroke={C.steel} strokeWidth="5" />
      <Label x={290} y={196} t="vụn gỗ nâu đỏ trong ren" />
    </g>
  )
}

function Calendar() {
  return (
    <g>
      <rect width="400" height="300" fill="#cdbf9e" />
      <rect x="30" y="20" width="340" height="270" fill="#fbf4e4" {...O} />
      <rect x="30" y="20" width="340" height="40" fill={accent.red} />
      <text x="200" y="47" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">THÁNG 3 · 2026</text>
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <rect x={40 + (i % 7) * 46} y={70 + Math.floor(i / 7) * 100} width="42" height="94" fill="none" stroke={LINE} strokeWidth="1" />
          <text x={44 + (i % 7) * 46} y={84 + Math.floor(i / 7) * 100} fontSize="10" fill={LINE} fontFamily={mono}>
            {i + 1}
          </text>
        </g>
      ))}
      <circle cx="93" cy="80" r="9" fill="none" stroke={accent.red} strokeWidth="2.5" />
      <text x="89" y="112" fontSize="9" fill={accent.red} fontFamily="Bitter, serif">Gọi</text>
      <text x="89" y="126" fontSize="9" fill={accent.red} fontFamily="Bitter, serif">An Tín</text>
      <rect x="88" y="174" width="42" height="90" fill={accent.amber} opacity="0.3" />
      <text x="90" y="200" fontSize="9" fill="#1d3a6a" fontFamily="Bitter, serif">Cưới Tùng.</text>
      <text x="90" y="216" fontSize="9" fill="#1d3a6a" fontFamily="Bitter, serif">Đi trễ.</text>
      <path d="M90,220 h30 M90,224 h30" stroke="#1d3a6a" strokeWidth="1.2" />
    </g>
  )
}

function Letters() {
  return (
    <g>
      <rect width="400" height="300" fill="#6e4c34" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${i * 5 - 8} 200 150)`}>
          <rect x={70 + i * 14} y={50 + i * 10} width="240" height="160" fill="#fbf4e4" {...O} strokeWidth={1.5} />
          <text x={90 + i * 14} y={86 + i * 10} fontSize="12" fontWeight="700" fill={accent.red} fontFamily={mono}>QUÁ HẠN</text>
        </g>
      ))}
    </g>
  )
}

function Suit() {
  return (
    <g>
      <rect width="400" height="300" fill={C.limDark} />
      <path d="M150,20 L60,70 L60,300 L240,300 L240,70 Z" fill="#2f2a2a" {...O} />
      <path d="M150,26 L118,110 L150,240 L182,110 Z" fill="#ece2cf" {...O} strokeWidth={1.5} />
      <rect x="200" y="90" width="170" height="120" fill="#fbf4e4" {...O} transform="rotate(6 285 150)" />
      <g transform="rotate(6 285 150)">
        <text x="285" y="118" textAnchor="middle" fontSize="14" fill={accent.red} fontFamily="Bitter, serif">Tùng & Vy</text>
        <text x="285" y="142" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>NH Hoa Viên · Q.10</text>
        <text x="285" y="166" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>Đón khách 18:30</text>
        <text x="285" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink.night} fontFamily={mono}>Khai tiệc 19:00</text>
      </g>
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'dong-ho': WatchBag,
  'thanh-chan': StairRod,
  'dau-cau-thang': Landing,
  phan: Chalk,
  'dong-ho-qua-lac': Grandfather,
  'hop-thuoc': Pills,
  'dien-thoai': Landline,
  'ban-ve': Drawing,
  'khay-chao': Tray,
  'cua-so': Window,
  cong: Gate,
  'danh-thiep': Card,
  'hoa-su': Frangipani,
  'bang-quan': CafeSign,
  'hop-do-nghe': Tools,
  lich: Calendar,
  'xap-thu': Letters,
  'ao-vest': Suit,
}
