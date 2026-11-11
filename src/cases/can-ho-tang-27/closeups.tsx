import { accent, ink } from '@/art/palette'
import { Boot, C, LINE } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** The safe door: no scratches, the emergency key lock still sealed. */
function SafeDoor() {
  return (
    <g>
      <rect width="400" height="300" fill={C.safeDark} />
      <rect x="40" y="20" width="320" height="260" fill={C.safe} {...O} />
      <rect x="44" y="24" width="312" height="6" fill="#5a6068" />
      <circle cx="200" cy="200" r="26" fill={C.silver} {...O} />
      <rect x="186" y="186" width="28" height="28" rx="3" fill="#e8e8f0" stroke="#9aa0a8" strokeWidth="1.5" />
      <path d="M190,192 l20,16 M210,192 l-20,16" stroke="#b9bec6" strokeWidth="1" />
      <Label x={200} y={250} t="tem niêm ổ chìa cơ: nguyên" />
      <Label x={200} y={70} t="mép sơn: không trầy, không khoan" />
    </g>
  )
}

function SafeScreen() {
  return (
    <g>
      <rect width="400" height="300" fill={C.safe} />
      <rect x="40" y="40" width="320" height="130" rx="8" fill="#10241f" {...O} />
      <text x="60" y="76" fontSize="13" fill={C.screen} fontFamily={mono}>LỊCH SỬ MỞ KÉT</text>
      <text x="60" y="104" fontSize="14" fontWeight="700" fill={C.screen} fontFamily={mono}>21/12 02:19  MÃ ĐÚNG ×1</text>
      <text x="60" y="128" fontSize="13" fill={C.screen} opacity="0.7" fontFamily={mono}>20/12 11:07  MÃ ĐÚNG ×1</text>
      <text x="60" y="150" fontSize="13" fill={C.screen} opacity="0.5" fontFamily={mono}>18/12 21:40  MÃ ĐÚNG ×1</text>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={110 + (i % 3) * 64} y={190 + Math.floor(i / 3) * 44} width="52" height="34" rx="5" fill={C.silver} {...O} strokeWidth={1.5} />
      ))}
    </g>
  )
}

function Booklet() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="60" y="30" width="280" height="240" fill="#f6efe2" {...O} />
      <text x="200" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>SỔ BẢO HÀNH KÉT</text>
      {['Lắp đặt: 03/2023', 'Mã khởi tạo: 03/2023'].map((t, i) => (
        <text key={t} x="80" y={96 + i * 24} fontSize="11" fill="#2f4258" fontFamily={mono}>
          {t}
        </text>
      ))}
      <text x="80" y="164" fontSize="14" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">Đổi mã 10/12,</text>
      <text x="80" y="190" fontSize="14" fill="#1d3a6a" fontFamily="Bitter, serif" fontStyle="italic">sau tin nhắn của B.</text>
      <rect x="76" y="148" width="250" height="50" fill={accent.amber} opacity="0.2" />
    </g>
  )
}

function WatchBox() {
  return (
    <g>
      <rect width="400" height="300" fill={C.bed} />
      <rect x="50" y="80" width="300" height="140" rx="14" fill={C.leather} {...O} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={70 + i * 94} y="100" width="78" height="100" rx="8" fill="#e9dccb" {...O} strokeWidth={1.5} />
          <ellipse cx={109 + i * 94} cy="150" rx="22" ry="30" fill="#d9cbb6" />
        </g>
      ))}
      <Label x={200} y={260} t="ba ngăn trống · tủ, ngăn kéo gọn" c={ink.night} />
    </g>
  )
}

function RingLight() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="0" y="120" width="170" height="180" fill={C.wood} {...O} />
      <rect x="40" y="170" width="100" height="100" fill={C.safe} {...O} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={60 + (i % 3) * 22} y={200 + Math.floor(i / 3) * 20} width="16" height="14" rx="2" fill={C.silver} />
      ))}
      <circle cx="290" cy="120" r="80" fill="none" stroke="#f6f2e6" strokeWidth="18" />
      <rect x="270" y="80" width="40" height="76" rx="6" fill={ink.night} {...O} />
      <path d="M270,118 L140,210" stroke={accent.amber} strokeWidth="2" strokeDasharray="6 6" />
      <Label x={290} y={250} t="ống kính chĩa vào bàn phím két" c={ink.night} />
    </g>
  )
}

function SmartLock() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="150" y="30" width="100" height="220" rx="16" fill="#1f2328" {...O} />
      <rect x="168" y="54" width="64" height="70" rx="6" fill="#33393f" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={180 + (i % 3) * 20} cy={70 + Math.floor(i / 3) * 20} r="5" fill="#8a96a0" />
      ))}
      <circle cx="200" cy="160" r="18" fill={C.screen} opacity="0.6" {...O} strokeWidth={1.5} />
      <rect x="260" y="200" width="120" height="44" fill="#f3e4c4" {...O} strokeWidth={1.5} />
      <text x="320" y="218" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>BQL RIVERLIGHT</text>
      <text x="320" y="234" textAnchor="middle" fontSize="10" fontWeight="700" fill={accent.red} fontFamily={mono}>BẢO TRÌ 06/12</text>
      <Label x={72} y={150} t="không vết nạy" />
      <Label x={72} y={170} t="vân tay · mã · thẻ" />
    </g>
  )
}

function Balcony() {
  return (
    <g>
      <rect width="400" height="300" fill={C.sky} />
      <rect y="200" width="400" height="100" fill={C.river} />
      <rect x="0" y="150" width="400" height="16" fill={C.silver} {...O} />
      {Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={(i * 37) % 400} cy={152 + (i % 3)} r="1.4" fill="#e6e1d6" />
      ))}
      <rect x="290" y="20" width="60" height="22" rx="4" fill={C.silver} {...O} />
      <Label x={320} y={60} t="chốt trong" />
      <Label x={180} y={190} t="bụi lan can nguyên · tầng 27" />
    </g>
  )
}

function CoffeeTable() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="40" y="60" width="130" height="90" fill="#c49a62" {...O} />
      <rect x="200" y="70" width="150" height="100" fill="#fbf4e4" {...O} transform="rotate(5 275 120)" />
      <text x="275" y="110" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono} transform="rotate(5 275 120)">NGÂN HÀNG</text>
      <rect x="80" y="180" width="200" height="80" fill="#2f4258" {...O} />
      <Label x={180} y={224} t="sổ đơn livestream" />
    </g>
  )
}

function Frame() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="200" width="400" height="20" fill={C.wood} {...O} />
      <rect x="120" y="176" width="160" height="24" fill={C.woodDark} {...O} />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={126 + (i * 13) % 150} cy={180 + (i % 3) * 3} r="1.2" fill="#d9d3c4" />
      ))}
      <Label x={200} y={120} t="khung ảnh úp · bụi phủ đã lâu" c={ink.night} />
    </g>
  )
}

function ShoePrints() {
  return (
    <g>
      <rect width="400" height="300" fill={C.carpet} />
      {[[120, 90, -10], [240, 200, 10]].map(([x, y, r]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-28" y="-62" width="56" height="124" rx="26" fill={C.carpetDark} />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M-22,${-50 + i * 16} l8,8 8,-8 8,8 8,-8 8,8`} stroke="#163029" strokeWidth="3" fill="none" />
          ))}
        </g>
      ))}
      <rect x="280" y="20" width="110" height="60" fill="#f6f4ee" {...O} strokeWidth={1.5} />
      <text x="335" y="44" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>HÚT BỤI</text>
      <text x="335" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent.red} fontFamily={mono}>22:00</text>
      <Label x={110} y={280} t="đế răng cưa · in sau 22:00" />
    </g>
  )
}

function Camera() {
  return (
    <g>
      <rect width="400" height="300" fill="#e6dcc8" />
      <rect x="170" y="0" width="60" height="40" fill={C.silver} {...O} />
      <g transform="rotate(-40 200 60)">
        <rect x="190" y="40" width="30" height="40" fill={C.silver} {...O} />
        <rect x="200" y="50" width="140" height="56" rx="14" fill="#f2f2ee" {...O} />
        <circle cx="342" cy="78" r="16" fill={ink.night} />
      </g>
      <circle cx="205" cy="20" r="7" fill="#e8e8e8" {...O} strokeWidth={1.5} />
      <path d="M199,20 h12" stroke={LINE} strokeWidth="2" />
      <path d="M196,12 l18,16" stroke="#fff" strokeWidth="2" />
      <Label x={200} y={250} t="ốc giá đỡ: vết tua vít mới" c={ink.night} />
      <Label x={200} y={270} t="ống kính ngước lên trần" c={ink.night} />
    </g>
  )
}

function ServiceLift() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wallDark} />
      <rect x="60" y="40" width="200" height="260" fill={C.steel} {...O} />
      <line x1="160" y1="40" x2="160" y2="300" stroke={LINE} strokeWidth="2.5" />
      <rect x="280" y="120" width="40" height="50" rx="4" fill="#2a2f35" {...O} />
      <path d="M340,60 L370,300 M380,60 L350,300 M343,120 h30 M347,180 h28 M351,240 h26" stroke="#b8bcc0" strokeWidth="6" />
      <text x="160" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent.red} fontFamily={mono}>CHỈ NHÂN VIÊN · QUẸT THẺ</text>
    </g>
  )
}

function GuestLift() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wallDark} />
      <rect x="100" y="40" width="200" height="260" fill={C.silver} {...O} />
      <line x1="200" y1="40" x2="200" y2="300" stroke={LINE} strokeWidth="2.5" />
      <rect x="320" y="130" width="30" height="40" rx="4" fill="#2a2f35" {...O} />
      <circle cx="200" cy="24" r="8" fill={ink.night} />
      <Label x={200} y={150} t="camera trong buồng thang" c={ink.night} />
    </g>
  )
}

function CardWriter() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="30" y="110" width="170" height="80" rx="10" fill="#2a2f35" {...O} />
      <rect x="60" y="94" width="100" height="22" fill="#f2f2ee" {...O} strokeWidth={1.5} />
      <rect x="230" y="70" width="140" height="150" fill="#f2f2ee" {...O} />
      <text x="300" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>20 THẺ</text>
      {Array.from({ length: 19 }, (_, i) => (
        <rect key={i} x="244" y={110 + i * 5} width="112" height="3" fill="#cfd3d8" />
      ))}
      <text x="300" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill={accent.red} fontFamily={mono}>còn 19</text>
      <Label x={115} y={220} t="máy ghi thẻ khóa căn hộ" />
    </g>
  )
}

function Boots() {
  return (
    <g>
      <rect width="400" height="300" fill="#6f6d67" />
      <Boot x={60} y={200} s={1.6} />
      <text x="300" y="80" textAnchor="middle" fontSize="18" fontWeight="700" fill="#f3e4c4" fontFamily="Barlow Condensed, sans-serif">VŨ</text>
      {[90, 140, 190, 240].map((x, i) => (
        <path key={x} d={`M${x},222 q6,${10 + i * 2} 14,4`} stroke={C.carpet} strokeWidth="3" fill="none" />
      ))}
      <Label x={300} y={260} t="sợi thảm xanh trong kẽ đế" />
    </g>
  )
}

function ShiftLog() {
  return (
    <g>
      <rect width="400" height="300" fill="#c9ccd0" />
      <rect x="20" y="30" width="200" height="240" fill="#f6efe2" {...O} />
      <text x="120" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink.night} fontFamily={mono}>SỔ CA ĐÊM 20/12</text>
      {['22:00 Nhận ca · Vũ', '23:30 Kiểm tra máy phát', '02:00–02:40', 'Kiểm tra bơm nước B2', '05:30 Ghi số điện'].map((t, i) => (
        <text key={i} x="34" y={90 + i * 26} fontSize="11" fill="#1d3a6a" fontFamily={mono}>
          {t}
        </text>
      ))}
      <rect x="30" y="122" width="180" height="34" fill={accent.amber} opacity="0.25" />
      <rect x="240" y="60" width="140" height="80" rx="6" fill="#10241f" {...O} />
      <text x="310" y="88" textAnchor="middle" fontSize="10" fill={C.screen} fontFamily={mono}>TỦ BƠM · MỞ CỬA</text>
      <text x="310" y="118" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.screen} fontFamily={mono}>20/12 17:05</text>
      <Label x={310} y={170} t="cả đêm: không ai mở" c={ink.night} />
    </g>
  )
}

function CardHooks() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      {['KT-01', 'KT-02', 'KT-03'].map((t, i) => (
        <g key={t}>
          <circle cx={90 + i * 110} cy="90" r="8" fill={C.gold} {...O} strokeWidth={1.5} />
          {i < 2 && <rect x={66 + i * 110} y="104" width="48" height="70" rx="6" fill="#f2f2ee" {...O} strokeWidth={1.5} />}
          <text x={90 + i * 110} y="200" textAnchor="middle" fontSize="13" fill="#f3e4c4" fontFamily={mono}>
            {t}
          </text>
        </g>
      ))}
      <Label x={200} y={250} t="KT-03: thẻ ca đêm, người trực giữ" />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  ket: SafeDoor,
  'man-hinh-ket': SafeScreen,
  'so-bao-hanh': Booklet,
  'hop-dong-ho': WatchBox,
  'den-live': RingLight,
  'khoa-cua': SmartLock,
  'ban-cong': Balcony,
  'ban-tra': CoffeeTable,
  'khung-anh': Frame,
  tham: ShoePrints,
  camera: Camera,
  'thang-hang': ServiceLift,
  'thang-khach': GuestLift,
  'may-ghi-the': CardWriter,
  giay: Boots,
  'so-ca': ShiftLog,
  'bang-the': CardHooks,
}

