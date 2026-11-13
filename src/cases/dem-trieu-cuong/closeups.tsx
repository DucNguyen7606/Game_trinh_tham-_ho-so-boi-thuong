import { accent, ink, shade } from '@/art/palette'
import { C, Carton, LINE } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** The mud line with a folding rule held against it. */
function WaterMark() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="150" width="400" height="150" fill={C.wallWet} />
      <rect y="144" width="400" height="12" fill={C.mud} />
      <path d="M20,20 Q60,50 110,40 M20,20 Q50,70 70,110 M20,20 L120,20" stroke="#f2ead8" strokeWidth="1.5" fill="none" />
      <rect x="250" y="20" width="34" height="280" fill="#f2d66a" {...O} />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1="250" y1={30 + i * 20} x2={i % 5 === 0 ? 272 : 262} y2={30 + i * 20} stroke={ink.night} strokeWidth="1.5" />
      ))}
      <text x="292" y="136" fontSize="14" fontWeight="700" fill={accent.red} fontFamily={mono}>
        0,9 m
      </text>
      <Label x={120} y={130} t="trên vệt: khô, mạng nhện nguyên" c={ink.night} />
      <Label x={120} y={190} t="dưới vệt: thấm nước" />
    </g>
  )
}

/** Dust on a top shelf with clean rectangles where cartons were lifted off. */
function TopShelf() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <path d="M0,160 L400,140 L400,190 L0,220 Z" fill="#a8a296" {...O} />
      {Array.from({ length: 80 }, (_, i) => (
        <circle key={i} cx={(i * 53) % 400} cy={170 + ((i * 29) % 40) - (i * 53 % 400) / 20} r="1.3" fill="#7d776c" />
      ))}
      {[30, 150, 270].map((x, i) => (
        <path key={x} d={`M${x},${200 - x / 20} l90,-5 l0,-26 l-90,5 Z`} fill="#d9d3c4" stroke="none" opacity={i === 1 ? 0.9 : 1} />
      ))}
      <Label x={200} y={60} t="ô sạch bụi = thùng được nhấc đi" c={ink.night} />
      <Label x={200} y={80} t="không bùn, không vệt nước" c={ink.night} />
      <rect y="240" width="400" height="60" fill={C.wall} />
    </g>
  )
}

function BottomShelf() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wallWet} />
      <rect y="230" width="400" height="14" fill={C.steel} {...O} />
      {[20, 110, 200, 290].map((x) => (
        <Carton key={x} x={x} y={130} w={84} h={100} wet />
      ))}
      <rect y="244" width="400" height="56" fill={C.mudDark} />
      <Label x={200} y={40} t="60 thùng nhũn nước · 600 máy" />
    </g>
  )
}

function Sandbags() {
  return (
    <g>
      <rect width="400" height="300" fill="#9a968f" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="0" y1={20 + i * 30} x2="400" y2={20 + i * 30} stroke={shade('#9a968f', -0.25)} strokeWidth="3" />
      ))}
      {[0, 1, 2].map((r) =>
        Array.from({ length: 4 }, (_, i) => (
          <rect key={`${r}-${i}`} x={-20 + i * 110 + (r % 2) * 55} y={220 - r * 50} width="106" height="52" rx="20" fill="#b8a27a" {...O} />
        )),
      )}
      <Label x={200} y={40} t="không bao nào bị xê dịch" c={ink.night} />
    </g>
  )
}

/** The window bolt, drawn back cleanly. */
function Bolt() {
  return (
    <g>
      <rect width="400" height="300" fill={C.night} />
      <rect x="0" y="0" width="140" height="300" fill={C.wood} {...O} />
      <rect x="260" y="0" width="140" height="300" fill={C.wood} {...O} />
      <rect x="40" y="130" width="70" height="44" rx="6" fill="#9a968f" {...O} />
      <rect x="90" y="140" width="110" height="22" rx="6" fill="#bdb8ae" {...O} />
      <rect x="280" y="128" width="40" height="46" rx="4" fill="#9a968f" {...O} />
      <Label x={200} y={220} t="kéo ra từ phía trong" />
      <Label x={200} y={240} t="chốt · bản lề · song: nguyên" />
    </g>
  )
}

function PaintScrape() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="120" width="400" height="60" fill="#cfc6b2" {...O} />
      <path d="M30,166 q120,-10 220,-2 t130,4" stroke={C.boatBlue} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M70,154 q80,-6 160,0" stroke={C.boatRed} strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect y="180" width="400" height="120" fill={C.wallWet} />
      <Label x={200} y={60} t="sơn xanh dương + đỏ" c={ink.night} />
      <Label x={200} y={80} t="bậu cửa: 1,0 m trên sàn kho" c={ink.night} />
    </g>
  )
}

function RopeLoop() {
  return (
    <g>
      <rect width="400" height="300" fill={C.night} />
      {[80, 200, 320].map((x) => (
        <rect key={x} x={x - 10} y="0" width="20" height="300" fill={C.steel} {...O} />
      ))}
      <ellipse cx="200" cy="130" rx="40" ry="20" fill="none" stroke={C.rope} strokeWidth="10" />
      <path d="M220,146 l26,70 M182,148 l-12,50" stroke={C.rope} strokeWidth="10" strokeLinecap="round" />
      <Label x={200} y={260} t="đầu dây bị cắt ngọt" />
    </g>
  )
}

function Canal() {
  return (
    <g>
      <rect width="400" height="300" fill={C.canal} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${i * 70},${60 + (i % 3) * 70} q30,-8 60,0`} stroke="#6e8a86" strokeWidth="4" fill="none" />
      ))}
      {[[60, 120, '#c9b27a'], [180, 200, '#7a9fb0'], [290, 90, '#d8cdb6']].map(([x, y, c]) => (
        <rect key={String(x)} x={x as number} y={y as number} width="50" height="14" rx="4" fill={c as string} {...O} strokeWidth={1.5} />
      ))}
      <Label x={200} y={36} t="rác lũ · không có thùng điện thoại" />
    </g>
  )
}

/** Port side of Tư's boat: scrape with grey render and a scrap of tape. */
function Hull() {
  return (
    <g>
      <rect width="400" height="300" fill={C.boatBlue} />
      <rect width="400" height="50" fill={C.boatRed} {...O} />
      <path d="M20,140 q160,-20 360,0" stroke="#9a968f" strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M40,138 q120,-10 300,0" stroke="#d8cdb6" strokeWidth="8" fill="none" />
      <circle cx="300" cy="210" r="8" fill="#6b6660" {...O} />
      <g transform="rotate(-8 300 222)">
        <rect x="290" y="210" width="80" height="26" fill="#e8d9b8" {...O} strokeWidth={1.5} />
        <text x="330" y="228" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">MỸ LỆ</text>
      </g>
      <Label x={120} y={250} t="vụn vữa xám trong vết trầy" />
    </g>
  )
}

function FuelReceipt() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="40" y="60" width="90" height="140" rx="10" fill="#c23a2c" {...O} />
      <rect x="40" y="140" width="90" height="60" fill={shade('#c23a2c', -0.3)} opacity="0.7" />
      <Label x={85} y={230} t="còn ~1/3" />
      <g transform="rotate(3 270 150)">
        <rect x="180" y="40" width="180" height="210" fill="#fbf4e4" {...O} />
        <text x="270" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>CÂY DẦU BẾN BÌNH ĐÔNG</text>
        <text x="196" y="110" fontSize="12" fill={ink.night} fontFamily={mono}>14/11/2025 18:10</text>
        <text x="196" y="136" fontSize="12" fill={ink.night} fontFamily={mono}>Dầu DO · 60 lít</text>
        <text x="196" y="162" fontSize="12" fill={ink.night} fontFamily={mono}>Ghe SG-4417</text>
        <rect x="190" y="96" width="160" height="20" fill={accent.amber} opacity="0.3" />
      </g>
    </g>
  )
}

function RiceSacks() {
  return (
    <g>
      <rect width="400" height="300" fill={C.boatBlue} />
      {[[30, 120], [150, 120], [270, 120], [90, 50], [210, 50]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="110" height="70" rx="20" fill="#e8dcc4" {...O} />
      ))}
      <Label x={200} y={250} t="gạo đi Cần Đước" />
    </g>
  )
}

function CoffeeStall() {
  return (
    <g>
      <rect width="400" height="300" fill="#9fb0b0" />
      <rect x="40" y="80" width="320" height="180" fill={C.woodDark} {...O} />
      <path d="M20,80 L380,80 L350,40 L50,40 Z" fill={accent.red} {...O} />
      <text x="200" y="68" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">CÀ PHÊ BÔNG</text>
      {[90, 200, 300].map((x) => (
        <rect key={x} x={x - 20} y="200" width="40" height="40" fill="#3f8a7e" {...O} strokeWidth={2} />
      ))}
      <Label x={200} y={150} t="nhìn thẳng sang cửa sổ kho" />
    </g>
  )
}

function Raincoat() {
  return (
    <g>
      <rect width="400" height="300" fill="#8f826b" />
      <path d="M100,0 L300,0 L300,300 L216,300 L200,120 L184,300 L100,300 Z" fill={C.raincoat} {...O} />
      <path d="M102,150 L100,300 L184,300 L192,150 Z M208,150 L216,300 L300,300 L298,150 Z" fill={C.mud} opacity="0.9" />
      <line x1="330" y1="150" x2="330" y2="300" stroke="#f3e4c4" strokeWidth="2" />
      <Label x={360} y={226} t="~0,8 m" />
      <Label x={200} y={60} t="bùn phù sa khô cứng" c={ink.night} />
    </g>
  )
}

function KeyBoard() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="40" y="30" width="320" height="70" fill="#f2ead8" {...O} />
      <text x="200" y="58" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>Chìa cửa sổ kênh + cửa cuốn: 2 bộ</text>
      <text x="200" y="80" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>Bộ 1: chị Lệ · Bộ 2: anh Khải</text>
      <circle cx="130" cy="150" r="9" fill="#d9b04f" {...O} strokeWidth={1.5} />
      <path d="M130,159 v40" stroke="#d9b04f" strokeWidth="4" />
      <circle cx="130" cy="214" r="16" fill="none" stroke="#d9b04f" strokeWidth="6" />
      <circle cx="270" cy="150" r="9" fill="#d9b04f" {...O} strokeWidth={1.5} />
      <Label x={130} y={262} t="dự phòng" />
      <Label x={270} y={262} t="bộ 2: trống" />
    </g>
  )
}

function StockBook() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="30" y="30" width="340" height="240" fill="#f6efe2" {...O} />
      <line x1="200" y1="30" x2="200" y2="270" stroke={LINE} strokeWidth="2" />
      {['12/9  Nhập 500 máy (Tết)', '3/11  Xuất 20 thùng Q10', '10/11 Tồn: 150 thùng'].map((t, i) => (
        <text key={i} x="44" y={70 + i * 28} fontSize="10" fill="#2f4258" fontFamily={mono}>
          {t}
        </text>
      ))}
      <text x="212" y="70" fontSize="10" fill="#1d3a6a" fontFamily={mono}>15/11 Thiệt hại</text>
      <text x="212" y="92" fontSize="10" fill="#1d3a6a" fontFamily={mono}>do triều cường:</text>
      <text x="212" y="114" fontSize="10" fontWeight="700" fill="#1d3a6a" fontFamily={mono}>toàn bộ 150 thùng</text>
      <Label x={290} y={250} t="mực còn mới" c={ink.night} />
    </g>
  )
}

function OrderBoard() {
  return (
    <g>
      <rect width="400" height="300" fill="#f6f4ee" />
      <text x="200" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">ĐƠN TẾT · TỪ 1/12</text>
      {['Tiệm Nguyễn Kim 1: 40 thùng', 'Tiệm Nguyễn Kim 2: 30 thùng', 'Cần Thơ: 50 thùng', 'Long An: 30 thùng'].map((t, i) => (
        <text key={i} x="40" y={90 + i * 40} fontSize="15" fill="#2f4258" fontFamily={mono}>
          {t}
        </text>
      ))}
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'vet-nuoc': WaterMark,
  'ke-tren': TopShelf,
  'ke-duoi': BottomShelf,
  'bao-cat': Sandbags,
  chot: Bolt,
  'vet-son': PaintScrape,
  'day-buoc': RopeLoop,
  kenh: Canal,
  'ghe-tu': Hull,
  'can-dau': FuelReceipt,
  'bao-gao': RiceSacks,
  'quan-bong': CoffeeStall,
  'ao-mua': Raincoat,
  'moc-chia': KeyBoard,
  'so-kho': StockBook,
  lich: OrderBoard,
}
