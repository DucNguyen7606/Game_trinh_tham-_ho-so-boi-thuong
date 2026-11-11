import { accent, ink, shade } from '@/art/palette'
import { C, LINE, LotusPainting } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** Corner of the empty frame with an MDF chip: pressed fibre core, black paint on top. */
function FrameCorner() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wallShade} />
      <path d="M0,0 H120 V300 H0 Z M0,200 H400 V300 H0 Z" fill={C.lim} />
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i} cx="60" cy={20 + i * 30} r="8" fill={C.gold} {...O} strokeWidth={1.5} />
      ))}
      <g transform="rotate(-8 200 170)">
        <rect x="150" y="150" width="110" height="44" fill="#c9a274" {...O} />
        <rect x="150" y="150" width="110" height="12" fill={ink.night} />
        {Array.from({ length: 30 }, (_, i) => (
          <circle key={i} cx={156 + (i * 37) % 100} cy={168 + (i * 13) % 22} r="1.4" fill="#8a6a44" />
        ))}
      </g>
      <Label x={290} y={120} t="lõi ván ép MDF" c={ink.night} />
      <Label x={290} y={136} t="không phải gỗ mít" c={ink.night} />
    </g>
  )
}

function Camera() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="190" y="0" width="20" height="80" fill={ink.night} />
      <rect x="100" y="80" width="220" height="100" rx="24" fill="#e8e2d4" {...O} />
      <circle cx="140" cy="130" r="34" fill={ink.night} />
      <circle cx="140" cy="130" r="14" fill="#2f4258" />
      <circle cx="290" cy="110" r="8" fill="#6b6660" {...O} strokeWidth={1.5} />
      <Label x={290} y={220} t="đèn REC: tắt" c={ink.night} />
      <Label x={290} y={236} t="dây nguyên vẹn" c={ink.night} />
    </g>
  )
}

function OtherWorks() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="30" y="40" width="150" height="200" fill={C.gold} {...O} />
      <rect x="44" y="54" width="122" height="172" fill="#7a9fb0" />
      <circle cx="105" cy="120" r="30" fill="#f2c46b" />
      <rect x="220" y="60" width="150" height="180" fill={C.woodDark} {...O} />
      <rect x="232" y="72" width="126" height="156" fill={C.lacquer} />
      <path d="M244,200 Q290,120 346,190" stroke={C.gold} strokeWidth="5" fill="none" />
      <Label x={200} y={280} t="còn nguyên" c={ink.night} />
    </g>
  )
}

function Poster() {
  return (
    <g>
      <rect width="400" height="300" fill="#f6efe2" />
      <rect width="400" height="60" fill={accent.red} />
      <text x="200" y="40" textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">NHÀ ĐẤU GIÁ HẢI ĐĂNG · 22/11</text>
      <LotusPainting x={40} y={80} w={180} />
      <text x="240" y="120" fontSize="16" fill={ink.night} fontFamily="Bitter, serif">Thiếu nữ bên sen</text>
      <text x="240" y="142" fontSize="12" fill={ink.night} fontFamily={mono}>Nguyễn Văn Khuê, 1962</text>
      <text x="240" y="180" fontSize="12" fill={ink.night} fontFamily={mono}>Khởi điểm:</text>
      <text x="240" y="204" fontSize="20" fontWeight="700" fill={accent.red} fontFamily={mono}>9 tỷ đồng</text>
    </g>
  )
}

/** Pry marks: splinters burst toward the alley side. */
function PryMarks() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="200" y="0" width="200" height="300" fill="#3a3538" />
      <rect x="150" y="110" width="40" height="70" fill="#9a968f" {...O} />
      <path d="M190,120 l50,-20 M192,140 l60,6 M190,160 l46,26 M192,176 l30,40" stroke="#c9a274" strokeWidth="7" strokeLinecap="round" />
      <Label x={300} y={60} t="phía hẻm →" />
      <Label x={90} y={60} t="← phía trong" />
      <Label x={300} y={260} t="mạt gỗ rơi ra ngoài" />
    </g>
  )
}

function ShoePrints() {
  return (
    <g>
      <rect width="400" height="300" fill="#3a3538" />
      <ellipse cx="200" cy="160" rx="190" ry="110" fill="#4f6f72" opacity="0.5" />
      {[[140, 120, -10], [250, 180, 170]].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y - 20} rx="22" ry="36" fill="#26232b" />
          <ellipse cx={x} cy={y + 32} rx="18" ry="18" fill="#26232b" />
        </g>
      ))}
      <Label x={330} y={60} t="đế bằng · ~36" />
      <Label x={110} y={270} t="vào" />
      <Label x={290} y={270} t="ra" />
    </g>
  )
}

function Keypad() {
  return (
    <g>
      <rect width="400" height="300" fill={C.alleyWall} />
      <rect x="120" y="40" width="160" height="220" rx="14" fill="#e8e2d4" {...O} />
      <rect x="140" y="60" width="120" height="40" fill="#2f7a4f" />
      <text x="200" y="86" textAnchor="middle" fontSize="13" fill="#c4e0c0" fontFamily={mono}>ARMED</text>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={146 + (i % 3) * 38} y={114 + Math.floor(i / 3) * 34} width="30" height="26" rx="4" fill="#cfc6b2" {...O} strokeWidth={1.5} />
      ))}
    </g>
  )
}

function Bins() {
  return (
    <g>
      <rect width="400" height="300" fill="#3a3538" />
      <rect x="60" y="70" width="180" height="210" rx="10" fill="#3f6b3a" {...O} />
      <rect x="50" y="50" width="200" height="30" rx="8" fill="#2f5230" {...O} />
      <rect x="270" y="120" width="100" height="160" rx="8" fill="#5a5552" {...O} />
    </g>
  )
}

/** Shredder bin with a few strips laid out and read. */
function Shreds() {
  const strips = ['...chất kết dính: nhựa ACRYLIC...', '...không phù hợp niên đại 1962...', 'PTN Vật liệu Mỹ thuật · 14/10']
  return (
    <g>
      <rect width="400" height="300" fill="#3a332f" />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={10 + i * 19} y={200 + (i % 3) * 10} width="12" height="90" fill="#f6efe2" transform={`rotate(${(i % 5) - 2} ${16 + i * 19} 240)`} />
      ))}
      {strips.map((t, i) => (
        <g key={i} transform={`rotate(${i - 1} 200 ${60 + i * 44})`}>
          <rect x="30" y={44 + i * 44} width="340" height="28" fill="#f6efe2" {...O} strokeWidth={1.5} />
          <text x="200" y={63 + i * 44} textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>
            {t}
          </text>
        </g>
      ))}
    </g>
  )
}

function Scarf() {
  return (
    <g>
      <rect width="400" height="300" fill="#7d2f2a" />
      <path d="M40,40 Q200,100 360,40 L340,180 Q260,260 240,300 L180,300 Q200,220 160,150 Q90,140 50,200 Z" fill={C.egg} {...O} />
      <path d="M240,300 L180,300 M50,200 L40,40" stroke={accent.red} strokeWidth="8" />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={210 + (i * 23) % 70} cy={230 + (i * 17) % 50} r="2.2" fill={ink.night} opacity="0.7" />
      ))}
      <Label x={110} y={270} t="bụi đen mịn" />
    </g>
  )
}

function Computer() {
  return (
    <g>
      <rect width="400" height="300" fill={C.lim} />
      <rect x="60" y="30" width="280" height="200" rx="10" fill="#2a2522" {...O} />
      <rect x="76" y="46" width="248" height="168" fill="#2f4258" />
      <text x="200" y="120" textAnchor="middle" fontSize="16" fill="#fff" fontFamily={mono}>Đoàn Ngọc Diệp</text>
      <rect x="120" y="140" width="160" height="26" rx="4" fill="#f6efe2" />
      <text x="200" y="158" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>••••••••</text>
      <text x="200" y="196" textAnchor="middle" fontSize="10" fill="#c4e0c0" fontFamily={mono}>CamGuard Pro · đăng nhập 01:39</text>
    </g>
  )
}

function DeskCalendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <g>
      <rect width="400" height="300" fill={C.lim} />
      <rect x="40" y="20" width="320" height="260" fill="#f6efe2" {...O} />
      <rect x="40" y="20" width="320" height="40" fill={accent.red} />
      <text x="200" y="47" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily={mono}>THÁNG 11 · 2025</text>
      {days.map((d, i) => (
        <text key={d} x={64 + (i % 7) * 44} y={90 + Math.floor(i / 7) * 34} fontSize="14" fill={ink.night} fontFamily={mono}>
          {d}
        </text>
      ))}
      <circle cx={64 + 6 * 44 + 8} cy={90 + 2 * 34 - 5} r="16" fill="none" stroke={accent.red} strokeWidth="3" />
      <text x="200" y="268" textAnchor="middle" fontSize="13" fill={accent.red} fontFamily="Bitter, serif" fontStyle="italic">21: Hải Đăng kiểm định</text>
    </g>
  )
}

function MdfBoard() {
  return (
    <g>
      <rect width="400" height="300" fill="#4a3a2e" />
      <path d="M40,40 L340,30 L360,280 L30,290 Z" fill="#1d1513" {...O} />
      <path d="M340,30 L370,34 L390,280 L360,280 Z" fill="#c9a274" {...O} />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={350 + (i * 7) % 30} cy={50 + (i * 31) % 220} r="1.6" fill="#8a6a44" />
      ))}
      <Label x={190} y={160} t="MDF · 90 × 120 cm" />
      <Label x={190} y={178} t="3 lớp sơn đen" />
    </g>
  )
}

function Tracing() {
  return (
    <g>
      <rect width="400" height="300" fill={C.board} />
      <rect x="30" y="20" width="340" height="260" fill="#f6efe2" opacity="0.92" {...O} />
      <g opacity="0.9" stroke="#2f4258" strokeWidth="1.6" fill="none">
        <path d="M170,250 Q150,140 190,80 Q220,70 230,100 Q240,170 250,250 Z" />
        <ellipse cx="205" cy="82" rx="14" ry="18" />
        <path d="M80,220 C60,206 64,180 80,174 C96,180 100,206 80,220 Z" />
        <path d="M320,210 C300,196 304,170 320,164 C336,170 340,196 320,210 Z" />
        <path d="M290,60 h40 M300,52 a8,4 0 1,0 0,1 M318,52 a8,4 0 1,0 0,1" />
      </g>
      <text x="350" y="266" textAnchor="end" fontSize="16" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic">Khuê</text>
      <Label x={110} y={50} t="tỉ lệ 1:1" c="#2f4258" />
    </g>
  )
}

function Eggshell() {
  return (
    <g>
      <rect width="400" height="300" fill="#4a3a2e" />
      <path d="M100,80 h200 l20,180 h-240 Z" fill="#cfc6b2" {...O} />
      {Array.from({ length: 40 }, (_, i) => (
        <path key={i} d={`M${120 + (i * 37) % 160},${100 + (i * 23) % 140} l8,-4 l4,8 Z`} fill={C.egg} stroke={LINE} strokeWidth="0.8" />
      ))}
    </g>
  )
}

function ClientBook() {
  const rows = ['04/5  Nhà hàng Sen Vàng · bình phong', '02/6  Diệp Gallery · Thiếu nữ bên sen', '        xử lý rạn góc dưới trái · giao 28/6', '15/8  Khách lẻ · tranh trang trí']
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="30" y="30" width="340" height="240" fill="#e7d2a8" {...O} />
      {rows.map((r, i) => (
        <text key={i} x="44" y={80 + i * 40} fontSize="12" fill={shade(accent.teal, -0.4)} fontFamily={mono}>
          {r}
        </text>
      ))}
      <rect x="40" y="104" width="320" height="50" fill={accent.amber} opacity="0.3" />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'khung-trong': FrameCorner,
  camera: Camera,
  'tranh-khac': OtherWorks,
  'ap-phich': Poster,
  'vet-cay': PryMarks,
  'dau-giay': ShoePrints,
  'ban-phim': Keypad,
  'thung-rac': Bins,
  'may-huy': Shreds,
  khan: Scarf,
  'may-tinh': Computer,
  'lich-ban': DeskCalendar,
  'van-mdf': MdfBoard,
  'giay-can': Tracing,
  'hu-vo-trung': Eggshell,
  'so-khach': ClientBook,
}
