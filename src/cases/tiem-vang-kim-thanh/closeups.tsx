import { accent, ink, shade } from '@/art/palette'
import { C, LINE, Ring, ShopFront } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const display = 'Barlow Condensed, sans-serif'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4', size = 11 }: { x: number; y: number; t: string; c?: string; size?: number }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** The dropped ring on a pocket scale reading 2,1 g. */
function DroppedRing() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tile} />
      <rect x="70" y="90" width="260" height="170" rx="14" fill="#2b2f33" {...O} />
      <rect x="100" y="110" width="200" height="90" rx="6" fill="#c9cfd2" {...O} />
      <rect x="120" y="214" width="160" height="34" rx="4" fill="#1d2428" {...O} />
      <text x="270" y="240" textAnchor="end" fontSize="24" fontWeight="700" fill="#7fe0c4" fontFamily={mono}>
        2.10 g
      </text>
      <Ring x={200} y={152} r={34} fake />
      <Label x={200} y={40} t={'khắc trong: "KT 9999 · 1 chỉ"'} c={ink.night} size={13} />
      <Label x={200} y={62} t="1 chỉ vàng 9999 = 3,75 g" c={accent.red} size={13} />
    </g>
  )
}

/** Red mud prints starting at the back door threshold. */
function FloorPrints() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tile} />
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1="0" x2={x - 20} y2="300" stroke={C.tileDark} strokeWidth="2" />
      ))}
      <rect x="300" y="0" width="100" height="300" fill="#7d7f7a" {...O} />
      <rect x="296" y="0" width="12" height="300" fill={C.steel} />
      {[[270, 80], [230, 110], [190, 90], [150, 130], [110, 120], [70, 160], [40, 150]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(180)`}>
          <ellipse cx="0" cy={i % 2 ? 12 : -12} rx="22" ry="10" fill={C.redMud} opacity="0.9" />
          <ellipse cx="20" cy={i % 2 ? 12 : -12} rx="7" ry="7" fill={C.redMud} opacity="0.9" />
        </g>
      ))}
      <path d="M240,220 L120,220" stroke={accent.amber} strokeWidth="4" />
      <path d="M120,220 l14,-8 v16 Z" fill={accent.amber} />
      <Label x={180} y={250} t="mũi dép hướng vào trong" c={ink.night} />
      <Label x={180} y={270} t="bùn đỏ hẻm 514" c={ink.night} />
      <Label x={350} y={40} t="ngưỡng" />
      <Label x={350} y={56} t="cửa sau" />
    </g>
  )
}

function Safe() {
  return (
    <g>
      <rect width="400" height="300" fill={C.shopRedDark} />
      <rect x="60" y="30" width="230" height="250" rx="8" fill={C.safe} {...O} />
      <path d="M290,40 L370,70 L370,250 L290,270 Z" fill={shade(C.safe, 0.15)} {...O} />
      <rect x="120" y="70" width="110" height="140" rx="4" fill="#1d2428" {...O} />
      <rect x="130" y="80" width="90" height="22" fill="#7fe0c4" opacity="0.7" />
      <text x="175" y="96" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>MEM 500</text>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={132 + (i % 3) * 30} y={112 + Math.floor(i / 3) * 24} width="24" height="18" fill="#8aa0a0" {...O} strokeWidth={1} />
      ))}
      <Label x={200} y={292} t="không vết cạy · phím nguyên" />
    </g>
  )
}

function SmashedCase() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="20" y="60" width="360" height="160" fill={C.velvet} {...O} />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d="M0,0 L30,-8 L16,22 Z" transform={`translate(${30 + ((i * 67) % 340)} ${70 + ((i * 41) % 140)}) rotate(${i * 37})`} fill="#d9eeee" stroke={LINE} strokeWidth="1.5" opacity="0.9" />
      ))}
      <Label x={200} y={260} t="cả khay nhung bị lấy đi" />
    </g>
  )
}

function Altar() {
  return (
    <g>
      <rect width="400" height="300" fill={C.shopRed} />
      <rect x="60" y="60" width="280" height="170" fill={C.wood} {...O} />
      <rect x="90" y="100" width="90" height="110" rx="12" fill={C.gold} {...O} />
      <rect x="220" y="100" width="90" height="110" rx="12" fill={C.gold} {...O} />
      <rect x="186" y="150" width="28" height="60" fill="#d8cdb6" {...O} strokeWidth={1.5} />
      <path d="M200,150 q-8,-40 6,-70" stroke="#e8e0c8" strokeWidth="2" fill="none" />
      <Label x={200} y={270} t="nhang thắp sáng nay" />
    </g>
  )
}

/** Outside face of the back door: no handle, no keyhole. */
function BackDoor() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="90" y="10" width="220" height="290" fill="#7d7f7a" {...O} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="90" y1={40 + i * 46} x2="310" y2={40 + i * 46} stroke={shade('#7d7f7a', -0.2)} strokeWidth="3" />
      ))}
      <circle cx="280" cy="150" r="22" fill="none" stroke={accent.amber} strokeWidth="4" strokeDasharray="6 6" />
      <Label x={200} y={200} t="mặt ngoài: không ổ khóa, không tay nắm" />
      <Label x={200} y={220} t="chỉ mở bằng chốt bên trong" />
      <Label x={200} y={240} t="khung, bản lề nguyên" />
    </g>
  )
}

function TailLight() {
  return (
    <g>
      <rect width="400" height="300" fill={C.redMud} />
      <path d="M0,220 Q200,170 400,120" stroke={C.redMudDark} strokeWidth="30" fill="none" />
      {[[120, 120, 10], [190, 150, -30], [250, 110, 50], [160, 200, 80]].map(([x, y, a], i) => (
        <path key={i} d="M0,0 L60,-12 L34,40 Z" transform={`translate(${x} ${y}) rotate(${a})`} fill="#ff5a4a" opacity="0.9" {...O} strokeWidth={2} />
      ))}
      <text x="214" y="132" fontSize="13" fontWeight="700" fill="#fff" fontFamily={display} transform="rotate(-8 214 132)">EXCITER</text>
      <rect x="330" y="0" width="50" height="300" fill="#9a968f" {...O} />
      <path d="M330,180 l50,-8" stroke="#e8e0c8" strokeWidth="8" strokeLinecap="round" />
      <Label x={180} y={270} t="vỡ còn sắc cạnh · cột trầy mới" />
    </g>
  )
}

function Poncho() {
  return (
    <g>
      <rect width="400" height="300" fill="#3f6b3a" />
      <path d="M40,40 Q200,10 360,50 L380,280 L20,280 Z" fill={C.raincoat} {...O} />
      <circle cx="200" cy="140" r="40" fill={C.goxe} opacity="0.55" />
      <text x="200" y="150" textAnchor="middle" fontSize="28" fontWeight="700" fill="#e8f5e8" opacity="0.6" fontFamily={display}>GoXe</text>
      {[[80, 230], [130, 250], [300, 240], [320, 200]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="30" ry="12" fill={C.redMud} opacity="0.9" />
      ))}
      <Label x={200} y={40} t="áo mưa hãng phát cho tài xế" c="#e8dcc4" />
    </g>
  )
}

function DeadCamera() {
  return (
    <g>
      <rect width="400" height="300" fill="#8aa0a8" />
      <rect x="180" y="0" width="50" height="300" fill="#9a968f" {...O} />
      <path d="M140,110 L300,100 L306,160 L146,170 Z" fill="#d8d4cc" {...O} />
      <circle cx="292" cy="132" r="18" fill={ink.night} />
      <path d="M300,160 q30,60 0,130" stroke={ink.night} strokeWidth="3" fill="none" />
      <path d="M296,290 l10,-4 m-6,8 l12,0" stroke={accent.ember} strokeWidth="2" />
      <Label x={200} y={60} t="dây đứt · hư từ tháng 6" c={ink.night} />
    </g>
  )
}

function Pothole() {
  return (
    <g>
      <rect width="400" height="300" fill={C.redMud} />
      <ellipse cx="200" cy="160" rx="170" ry="80" fill="#5f7676" {...O} />
      <ellipse cx="160" cy="140" rx="60" ry="14" fill="#8aa0a0" opacity="0.5" />
      <Label x={200} y={280} t="nước đục · hẻm đào cống" />
    </g>
  )
}

/** The blue hụi book, open at the November page. */
function HuiBook() {
  const rows = ['10/11 Cô Sáu ....... đã trả đủ', '12/11 Chú Bảy ...... đã trả đủ', '18/11 Anh Vũ ....... đã trả đủ', '25/11 Bà Ba Lành .. đã trả đủ', '28/11 Cộng: 5,52 tỷ']
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="20" y="20" width="360" height="260" fill="#f6efe2" {...O} />
      <line x1="200" y1="20" x2="200" y2="280" stroke={LINE} strokeWidth="2" />
      <text x="40" y="60" fontSize="12" fill="#2f4258" fontFamily={mono}>DÂY 1 + DÂY 2</text>
      <text x="40" y="84" fontSize="12" fill="#2f4258" fontFamily={mono}>36 người</text>
      <text x="40" y="130" fontSize="26" fontWeight="700" fill={accent.red} fontFamily={display} transform="rotate(-10 90 130)">15/10 BỂ</text>
      {rows.map((t, i) => (
        <g key={i}>
          <text x="210" y={60 + i * 34} fontSize="9" fill="#1d3a6a" fontFamily={mono} fontWeight={i === 4 ? 700 : 400}>
            {t}
          </text>
          {i < 4 && <line x1="208" y1={57 + i * 34} x2="300" y2={57 + i * 34} stroke={accent.red} strokeWidth="1.5" />}
        </g>
      ))}
    </g>
  )
}

function PlatedBox() {
  return (
    <g>
      <rect width="400" height="300" fill="#b49470" />
      <path d="M40,60 L360,60 L380,280 L20,280 Z" fill="#c49a62" {...O} />
      <text x="200" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>XƯỞNG MẠ THÀNH CÔNG · Q.5</text>
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <rect x={60 + (i % 7) * 42} y={120 + Math.floor(i / 7) * 60} width="36" height="40" rx="4" fill="#e8f0f0" opacity="0.6" {...O} strokeWidth={1} />
          <Ring x={78 + (i % 7) * 42} y={140 + Math.floor(i / 7) * 60} r={10} fake />
        </g>
      ))}
      <Label x={200} y={262} t={'14 chiếc · khắc "KT 9999"'} c={ink.night} />
    </g>
  )
}

function HusbandAltar() {
  return (
    <g>
      <rect width="400" height="300" fill="#b49470" />
      <rect x="120" y="30" width="160" height="200" fill="#e8dcc4" {...O} />
      <rect x="140" y="50" width="120" height="160" fill="#6b6a64" {...O} />
      <ellipse cx="200" cy="110" rx="34" ry="42" fill="#c9a274" {...O} />
      <path d="M150,210 Q200,150 250,210 Z" fill="#2f4258" {...O} />
      <Label x={200} y={262} t="Lâm Kim Thành · 1958–2019" c={ink.night} />
    </g>
  )
}

function Calendar() {
  return (
    <g>
      <rect width="400" height="300" fill="#fbf4e4" />
      <rect width="400" height="50" fill={accent.red} />
      <text x="200" y="36" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily={display}>THÁNG 12 · 2025</text>
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <rect x={20 + (i % 7) * 52} y={70 + Math.floor(i / 7) * 100} width="48" height="90" fill="none" stroke={ink.night} strokeWidth="1" opacity="0.4" />
          <text x={26 + (i % 7) * 52} y={88 + Math.floor(i / 7) * 100} fontSize="12" fill={ink.night} fontFamily={mono}>
            {i + 1}
          </text>
        </g>
      ))}
      <text x="250" y="130" fontSize="20" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">T.</text>
      <circle cx="254" cy="122" r="22" fill="none" stroke={accent.amber} strokeWidth="3" />
    </g>
  )
}

/** The pharmacy camera's view: the shop front and the mouth of alley 514. */
function CameraView() {
  return (
    <g>
      <rect width="400" height="300" fill="#6f7f86" />
      <g transform="translate(-224 -30) scale(0.4)">
        <ShopFront shutter={0.5} />
      </g>
      <rect y="280" width="400" height="20" fill={C.asphalt} />
      <rect x="10" y="10" width="380" height="270" fill="none" stroke="#e8e8e8" strokeWidth="2" strokeDasharray="10 8" />
      <Label x={290} y={30} t="cửa cuốn + đầu hẻm 514" c="#fff" />
      <circle cx="16" cy="18" r="5" fill="#ff5a4a" />
    </g>
  )
}

function SalesBook() {
  return (
    <g>
      <rect width="400" height="300" fill="#e8e4dc" />
      <rect x="30" y="30" width="340" height="240" fill="#fbf4e4" {...O} />
      {['02/12  19:05  Panadol ...... 35k', '02/12  19:52  Oresol ....... 20k', '02/12  20:40  Băng keo ..... 15k', '— hết —'].map((t, i) => (
        <text key={i} x="50" y={80 + i * 34} fontSize="12" fill="#2f4258" fontFamily={mono}>
          {t}
        </text>
      ))}
      <Label x={200} y={250} t="tối mưa, vắng khách" c={ink.night} />
    </g>
  )
}

function Gutter() {
  return (
    <g>
      <rect width="400" height="300" fill="#6f7f86" />
      <rect x="0" y="80" width="400" height="40" fill="#9a968f" {...O} />
      {[60, 160, 260, 340].map((x) => (
        <path key={x} d={`M${x},120 v160`} stroke="#9fc6d6" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
      ))}
      <Label x={200} y={50} t="mưa từ 19:30 tới gần 23:00" />
    </g>
  )
}

function ShopAcross() {
  return (
    <g>
      <rect width="400" height="300" fill="#6f7f86" />
      <g transform="translate(-224 -30) scale(0.4)">
        <ShopFront shutter={0.5} />
      </g>
      <rect y="270" width="400" height="30" fill={C.asphalt} />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'nhan-roi': DroppedRing,
  san: FloorPrints,
  ket: Safe,
  'tu-kinh': SmashedCase,
  'ban-tho': Altar,
  'cua-sau': BackDoor,
  'den-hau': TailLight,
  'thung-rac': Poncho,
  'camera-hem': DeadCamera,
  'vung-nuoc': Pothole,
  'so-hui': HuiBook,
  'hop-ma': PlatedBox,
  'ban-tho-chong': HusbandAltar,
  lich: Calendar,
  'goc-camera': CameraView,
  'so-ban': SalesBook,
  'mai-hien': Gutter,
  'tiem-vang': ShopAcross,
}

