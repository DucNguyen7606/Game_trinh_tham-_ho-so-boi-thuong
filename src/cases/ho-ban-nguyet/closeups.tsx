import { accent, ink } from '@/art/palette'
import { Bike, C, Jacket, LINE, Lake, PottedPalm, Skyline } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** A small printed slip or screen with lines of mono text. */
function Slip({ x, y, w, lines, bg = '#f6efe2', fg = '#1d3a6a', hi = -1 }: { x: number; y: number; w: number; lines: string[]; bg?: string; fg?: string; hi?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={30 + lines.length * 24} fill={bg} {...O} />
      {lines.map((t, i) => (
        <g key={i}>
          {i === hi && <rect x={x + 8} y={y + 12 + i * 24} width={w - 16} height="22" fill={accent.amber} opacity="0.3" />}
          <text x={x + 14} y={y + 28 + i * 24} fontSize="12" fill={fg} fontWeight={i === 0 ? 700 : 400} fontFamily={mono}>
            {t}
          </text>
        </g>
      ))}
    </g>
  )
}

function Rail() {
  return (
    <g>
      <rect width="400" height="300" fill={C.sky} />
      <Skyline y={150} w={400} />
      <Lake y={150} h={60} w={400} />
      <rect y="210" width="400" height="90" fill={C.deck} />
      <rect x="0" y="60" width="400" height="150" fill={C.glass} opacity="0.25" />
      <rect x="0" y="54" width="400" height="12" fill={C.steel} {...O} />
      <path d="M300,66 L300,210" stroke={accent.amber} strokeWidth="3" />
      <path d="M290,66 L310,66 M290,210 L310,210" stroke={accent.amber} strokeWidth="3" />
      <text x="316" y="146" fontSize="20" fontWeight="700" fill={accent.amber} fontFamily={mono}>1,4 m</text>
      <Label x={130} y={250} t="tay vịn khô · không ghế kê" />
    </g>
  )
}

function FallenPlant() {
  return (
    <g>
      <rect width="400" height="300" fill={C.deck} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="0" y1={30 + i * 50} x2="400" y2={30 + i * 50} stroke={C.deckDark} strokeWidth="3" />
      ))}
      <PottedPalm x={110} y={170} s={0.6} fallen />
      <path d="M110,175 Q210,180 330,160" stroke={C.soil} strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M150,250 Q240,220 380,200" stroke="#111" strokeWidth="5" fill="none" />
      <path d="M170,270 Q260,240 390,222" stroke="#111" strokeWidth="4" fill="none" />
      <Label x={250} y={290} t="vệt gót giày lết về phía lan can →" />
    </g>
  )
}

function Ashtray() {
  return (
    <g>
      <rect width="400" height="300" fill={C.steel} />
      <ellipse cx="170" cy="160" rx="110" ry="50" fill="#555" {...O} />
      <ellipse cx="170" cy="150" rx="86" ry="34" fill="#333" />
      {[[130, 146], [170, 156], [205, 140]].map(([x, y], i) => (
        <g key={i} transform={`rotate(${i * 30 - 20} ${x} ${y})`}>
          <rect x={x - 22} y={y - 5} width="34" height="10" fill="#f2f2ee" />
          <rect x={x + 12} y={y - 5} width="12" height="10" fill="#d9a05a" />
        </g>
      ))}
      <rect x="300" y="110" width="50" height="70" rx="6" fill="#e9dccb" {...O} />
      <Label x={200} y={260} t="3 đầu lọc, cùng hiệu ông Hưng hút" c={ink.night} />
    </g>
  )
}

function Chairs() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="240" width="400" height="60" fill={C.deck} />
      {[90, 160].map((x) => (
        <g key={x} {...O}>
          <rect x={x} y="40" width="18" height="200" fill={C.steel} />
          <rect x={x - 14} y="70" width="46" height="140" rx="4" fill={C.woodDark} />
        </g>
      ))}
      <path d="M220,250 L380,250" stroke={accent.amber} strokeWidth="3" strokeDasharray="8 6" />
      <Label x={300} y={236} t="lan can cách 3 m" c={ink.night} />
    </g>
  )
}

function Slippers() {
  return (
    <g>
      <rect width="400" height="300" fill={C.deck} />
      <rect x="0" y="0" width="120" height="300" fill={C.glass} opacity="0.4" {...O} />
      <ellipse cx="70" cy="200" rx="46" ry="18" fill="#3a5a8a" {...O} transform="rotate(160 70 200)" />
      <ellipse cx="310" cy="120" rx="46" ry="18" fill="#3a5a8a" {...O} transform="rotate(-20 310 120)" />
      <rect x="360" y="0" width="40" height="300" fill={C.glass} opacity="0.25" />
      <Label x={70} y={250} t="văng vào cửa kính" />
      <Label x={300} y={170} t="sát chân lan can" />
    </g>
  )
}

function Glasses() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <g {...O}>
        <path d="M60,240 L46,60 L104,60 L90,240 Z" fill="#c49a62" opacity="0.85" />
        <rect x="46" y="30" width="58" height="34" fill="#2a2f35" />
        <path d="M150,240 L140,160 L200,160 L190,240 Z" fill="#f2f2ee" opacity="0.65" />
        <rect x="146" y="200" width="48" height="30" fill="#c4802a" opacity="0.7" strokeWidth={0} />
        <path d="M160,190 q8,-6 16,0" stroke="#d98a8a" strokeWidth="3" fill="none" />
        <rect x="240" y="226" width="130" height="18" rx="4" fill={C.steel} />
        <path d="M262,226 L256,160 L332,160 L326,226 Z" fill="#f8fbfb" opacity="0.95" />
        <rect x="262" y="216" width="64" height="8" fill="#c4802a" opacity="0.9" strokeWidth={0} />
      </g>
      <Label x={170} y={272} t="ly ông Hưng · dấu môi" />
      <Label x={312} y={140} t="lau sạch, úp" />
      <Label x={312} y={156} t="đáy còn rượu" />
    </g>
  )
}

function Intercom() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="70" y="30" width="260" height="240" rx="14" fill="#1f2328" {...O} />
      <Slip
        x={90}
        y={50}
        w={220}
        bg="#10241f"
        fg={C.screen}
        hi={2}
        lines={['LỊCH SỬ 14/03', '21:28 SẢNH A · MỞ', '23:08 HẦM B2 · MỞ', '—']}
      />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={150 + i * 50} cy="230" r="14" fill="#8a96a0" {...O} strokeWidth={1.5} />
      ))}
    </g>
  )
}

function Desk() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <rect x="20" y="40" width="160" height="210" fill={accent.amber} opacity="0.85" {...O} />
      <text x="100" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>ĐỐI CHIẾU</text>
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>SỔ SÁCH</text>
      <text x="100" y="130" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>9:00 · 15/3</text>
      <rect x="200" y="30" width="180" height="240" fill="#fbf4e4" {...O} transform="rotate(4 290 150)" />
      <g transform="rotate(4 290 150)">
        <text x="216" y="110" fontSize="14" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Nói chuyện với</text>
        <text x="216" y="134" fontSize="14" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Toàn tối nay.</text>
        <text x="216" y="170" fontSize="20" fontWeight="700" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">7 tỷ.</text>
        <path d="M214,178 L274,178 M214,184 L274,184" stroke="#1d3a6a" strokeWidth="2" />
      </g>
    </g>
  )
}

function Suitcase() {
  return (
    <g>
      <rect width="400" height="300" fill="#b8a688" />
      <rect x="40" y="70" width="180" height="210" rx="16" fill="#3f8a7e" {...O} />
      <path d="M90,70 L90,36 L170,36 L170,70" fill="none" {...O} strokeWidth={6} />
      {[0, 1].map((i) => (
        <g key={i} transform={`rotate(${i ? 6 : -4} 300 ${110 + i * 90})`}>
          <rect x="220" y={70 + i * 90} width="160" height="76" fill="#f3e4c4" {...O} strokeWidth={1.5} />
          <text x="232" y={92 + i * 90} fontSize="11" fontWeight="700" fill={ink.night} fontFamily={mono}>SGN → DAD · 20/03</text>
          <text x="232" y={116 + i * 90} fontSize="11" fill={ink.night} fontFamily={mono}>{i ? 'DANG BAO VY' : 'DANG QUOC HUNG'}</text>
        </g>
      ))}
      <Label x={130} y={170} t="đã xếp đồ" />
    </g>
  )
}

function Shelf() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="20" y="230" width="360" height="16" fill={C.wood} {...O} />
      <rect x="40" y="70" width="190" height="160" fill="#f3e4c4" {...O} />
      <rect x="54" y="84" width="162" height="132" fill="#7a9fb0" />
      <rect x="60" y="150" width="150" height="10" fill={accent.red} />
      {[100, 170].map((x) => (
        <g key={x}>
          <circle cx={x} cy="128" r="16" fill="#d9a47a" />
          <rect x={x - 22} y="146" width="44" height="60" fill={C.navy} />
        </g>
      ))}
      <rect x="260" y="100" width="100" height="130" fill="#f3e4c4" {...O} />
      <rect x="272" y="112" width="76" height="106" fill="#ece2cf" />
      <circle cx="310" cy="146" r="14" fill="#efc39b" />
      <path d="M290,218 L296,164 L324,164 L330,218 Z" fill="#f6f6f2" stroke={LINE} strokeWidth="1.5" />
      <Label x={135} y={270} t="khánh thành kho Tân Thuận · 2016" c={ink.night} />
    </g>
  )
}

function PaintRing() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grass} />
      <rect x="340" y="0" width="60" height="300" fill={C.wallDark} {...O} />
      <ellipse cx="180" cy="160" rx="140" ry="70" fill="none" stroke={C.paint} strokeWidth="6" strokeDasharray="18 10" />
      <path d="M330,250 L330,280 M200,280 L330,280" stroke={accent.amber} strokeWidth="3" />
      <Label x={265} y={270} t="1,8 m tới chân tường" />
    </g>
  )
}

function GuardLog() {
  return (
    <g>
      <rect width="400" height="300" fill="#e6dcc8" />
      <Slip x={30} y={30} w={250} hi={1} lines={['SỔ TRỰC · CA ĐÊM 14/3', '23:41 nghe tiếng rơi mạnh', '     vườn phía Đông tòa B', '23:43 gọi cấp cứu 115', '23:58 báo CA phường']} />
      <circle cx="340" cy="90" r="40" fill="#f6f4ee" {...O} />
      <path d="M340,90 L340,60 M340,90 L362,98" stroke={ink.night} strokeWidth="3" />
      <Label x={340} y={160} t="đồng hồ chòi" c={ink.night} />
    </g>
  )
}

function Ticket() {
  return (
    <g>
      <rect width="400" height="300" fill="#2a2a2a" />
      <Slip x={60} y={40} w={280} hi={1} lines={['XE MÁY KHÁCH · B2 · 14/3', 'VÀO 23:07  59P2-418.36', 'RA  23:49  59P2-418.36', '(lượt duy nhất sau 22:00)']} />
    </g>
  )
}

function CarCam() {
  return (
    <g>
      <rect width="400" height="300" fill="#1f2328" />
      <Slip x={40} y={40} w={320} bg="#10241f" fg={C.screen} lines={['CAMERA HẦM B1 · BIỂN SỐ', '22:00 – 06:00', 'Chỉ xe cư dân ra vào', 'Xe khách: 0']} />
    </g>
  )
}

function FlowerBed() {
  return (
    <g>
      <rect width="400" height="300" fill={C.grass} />
      <rect x="20" y="150" width="360" height="100" rx="12" fill={C.wallDark} {...O} />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={40 + i * 36} cy="146" r="16" fill={i % 2 ? '#d85a8a' : '#f0e0ea'} {...O} strokeWidth={1.5} />
      ))}
      <rect x="120" y="190" width="40" height="30" fill="#f2f2ee" {...O} strokeWidth={1.5} />
      {[220, 260].map((x) => (
        <rect key={x} x={x} y="200" width="26" height="8" fill="#f2f2ee" transform={`rotate(20 ${x} 204)`} />
      ))}
      {/* Four fresh Jet butts: the noise card H12. */}
      {[[290, 228, -15], [312, 236, 30], [330, 224, 5], [300, 244, 60]].map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 12} y={y - 3} width="18" height="6" fill="#f2f2ee" stroke={LINE} strokeWidth="1" />
          <rect x={x + 6} y={y - 3} width="7" height="6" fill="#d9a24a" stroke={LINE} strokeWidth="1" />
        </g>
      ))}
      <rect x="276" y="252" width="70" height="14" fill="#1b1b1f" opacity="0.6" />
      <text x="311" y="263" textAnchor="middle" fontSize="10" fill="#f3e4c4" fontFamily={mono}>JET × 4</text>
      <Label x={200} y={284} t="đầu lọc Jet còn mới · tài xế hay đứng đây" />
    </g>
  )
}

function JacketPhoto() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <g transform="translate(-60 -40)">
        <Jacket x={200} y={60} s={1.1} />
      </g>
      <circle cx="298" cy="180" r="44" fill="none" stroke={accent.amber} strokeWidth="3" />
      <Label x={310} y={250} t="cổ tay phải rách · còn ẩm" />
    </g>
  )
}

function GateLog() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wood} />
      <Slip x={40} y={40} w={320} hi={1} lines={['CẢNG TÂN THUẬN · CỔNG CHÍNH', '51K-226.81 VÀO 19:40 14/3', '51K-226.81 RA  01:15 15/3', '(sổ cổng chính · chỉ ô tô)']} />
    </g>
  )
}

function BikeLot() {
  return (
    <g>
      <rect width="400" height="300" fill="#555" />
      <Bike x={70} y={240} s={1.1} />
      <rect x="19" y="154" width="34" height="22" fill="#f2f2ee" {...O} strokeWidth={1.5} />
      <text x="36" y="169" textAnchor="middle" fontSize="7" fill={ink.night} fontFamily={mono}>418.36</text>
      <rect x="300" y="40" width="80" height="60" fill={C.woodDark} {...O} />
      <circle cx="340" cy="60" r="5" fill={accent.gold} />
      <text x="340" y="88" textAnchor="middle" fontSize="12" fill="#f3e4c4" fontFamily={mono}>Phúc</text>
      <Label x={250} y={285} t="59P2-418.36 · bãi xe công nhân" />
    </g>
  )
}

function Cabinet() {
  return (
    <g>
      <rect width="400" height="300" fill="#7d868c" />
      <rect x="60" y="40" width="280" height="220" fill="#8f979c" {...O} />
      <rect x="80" y="60" width="240" height="40" fill="#f3e4c4" {...O} strokeWidth={1.5} />
      <text x="200" y="85" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>CHI PHÍ VẬN CHUYỂN THUÊ NGOÀI</text>
      <rect x="180" y="130" width="40" height="14" fill={C.steel} {...O} strokeWidth={1.5} />
      <path d="M214,128 l12,-10 M218,140 l14,-4" stroke={accent.red} strokeWidth="2.5" />
      <Label x={200} y={200} t="vết cạy cũ · trống một nửa" c={ink.night} />
    </g>
  )
}

function ShiftBoard() {
  return (
    <g>
      <rect width="400" height="300" fill="#c9c2b2" />
      <rect x="30" y="30" width="340" height="240" fill="#f6f4ee" {...O} />
      {['CA ĐÊM 14/3', 'Chốt hàng tàu 6h: a. Toàn', 'Kho: Phúc, Sơn', 'Cổng phụ xe máy: mở suốt đêm'].map((t, i) => (
        <text key={i} x="50" y={70 + i * 46} fontSize={i ? 15 : 17} fontWeight={i ? 400 : 700} fill={i === 3 ? accent.red : '#1d3a6a'} fontFamily="Bitter, serif">
          {t}
        </text>
      ))}
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'lan-can': Rail,
  'chau-cay': FallenPlant,
  'gat-tan': Ashtray,
  ghe: Chairs,
  dep: Slippers,
  'ly-ruou': Glasses,
  'man-hinh-cua': Intercom,
  'ban-lam-viec': Desk,
  vali: Suitcase,
  'ke-anh': Shelf,
  'diem-roi': PaintRing,
  'choi-bao-ve': GuardLog,
  've-xe': Ticket,
  'cong-ham-oto': CarCam,
  'bon-hoa': FlowerBed,
  'ao-khoac': JacketPhoto,
  'so-cong': GateLog,
  'xe-may': BikeLot,
  'tu-chung-tu': Cabinet,
  'bang-ca': ShiftBoard,
}
