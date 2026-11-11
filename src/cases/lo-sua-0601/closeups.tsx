import { accent, ink } from '@/art/palette'
import { Bottle, C, Crate, Dial, LINE, Printer, SharpsBox } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

function Thermometer() {
  return (
    <g>
      <rect width="400" height="300" fill={C.steel} />
      <rect y="200" width="400" height="60" rx="30" fill={C.steelLight} {...O} />
      <Dial x={140} y={140} r={100} now={121} low={97} />
      <g transform="rotate(6 330 70)">
        <rect x="290" y="40" width="96" height="56" fill="#fbf4e4" {...O} strokeWidth={1.5} />
        <text x="338" y="60" textAnchor="middle" fontSize="9" fill={ink.night} fontFamily={mono}>CHỈNH KIM</text>
        <text x="338" y="78" textAnchor="middle" fontSize="10" fontWeight="700" fill={ink.night} fontFamily={mono}>22:00 · 6/1</text>
      </g>
      <Label x={330} y={150} t="kim đỏ: 97°C" c={accent.red} />
      <Label x={330} y={168} t="chuẩn: 121°C" c={ink.night} />
    </g>
  )
}

function LogBook() {
  const rows = ['00:30  121°C  bình thường', '01:00  121°C  bình thường', '01:30  121°C  bình thường', '02:10', '02:30  121°C  bình thường', '03:00  121°C  bình thường']
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="30" y="20" width="340" height="260" fill="#f6efe2" {...O} />
      <text x="200" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink.night} fontFamily={mono}>SỔ VẬN HÀNH L2 · CA ĐÊM 6/1</text>
      {rows.map((t, i) => (
        <text key={i} x="50" y={74 + i * 30} fontSize="12" fill="#1d3a6a" fontFamily={mono}>
          {t}
        </text>
      ))}
      <rect x="96" y={74 + 3 * 30 - 13} width="250" height="18" fill="#ffffff" />
      <text x="104" y={74 + 3 * 30 + 2} fontSize="12" fill="#1d3a6a" opacity="0.22" fontFamily={mono} fontStyle="italic">98°C · báo động nhiệt</text>
      <text x="100" y={74 + 3 * 30 - 2} fontSize="12" fill="#1d3a6a" fontFamily={mono}>121°C  bình thường</text>
      <Label x={200} y={272} t="vết tẩy · nét cũ còn hằn" c={accent.red} />
    </g>
  )
}

function Valve() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tile} />
      <rect y="110" width="400" height="70" fill={C.steel} {...O} />
      <rect x="150" y="90" width="100" height="110" rx="12" fill={C.steelLight} {...O} />
      <rect x="192" y="30" width="16" height="64" fill={C.steelDark} {...O} />
      <ellipse cx="200" cy="30" rx="70" ry="14" fill={accent.red} {...O} />
      <g transform="rotate(5 300 240)">
        <rect x="240" y="210" width="130" height="60" fill="#fbf4e4" {...O} strokeWidth={1.5} />
        <text x="305" y="232" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>BẢO TRÌ · 8/1</text>
        <text x="305" y="252" textAnchor="middle" fontSize="10" fontWeight="700" fill={ink.night} fontFamily={mono}>Thay van kẹt</text>
      </g>
    </g>
  )
}

function Conveyor() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tile} />
      <rect y="210" width="400" height="30" fill={C.steelDark} {...O} />
      {[50, 130, 210, 290, 370].map((x) => (
        <Bottle key={x} x={x} y={210} s={1.6} />
      ))}
      <Label x={200} y={272} t="mã lô + giờ chiết in trên nắp" c={ink.night} />
    </g>
  )
}

/** A sealed crate from lot 0601-L2: every cap domed, every seal whole. */
function SourPallet() {
  return (
    <g>
      <rect width="400" height="300" fill="#c9cfc8" />
      {[60, 150, 240, 330].map((x) => (
        <Bottle key={x} x={x} y={210} s={1.65} sour />
      ))}
      <rect x="10" y="200" width="380" height="60" fill={C.crate} {...O} />
      <Label x={200} y={30} t="nắp phồng · màng seal nguyên · không lỗ kim" c={ink.night} />
      <rect x="130" y="266" width="140" height="24" fill="#fbf4e4" {...O} strokeWidth={1.5} />
      <text x="200" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent.red} fontFamily={mono}>NIÊM PHONG 7/1</text>
    </g>
  )
}

function GoodPallet() {
  return (
    <g>
      <rect width="400" height="300" fill="#c9cfc8" />
      {[60, 150, 240, 330].map((x) => (
        <Bottle key={x} x={x} y={210} s={1.65} />
      ))}
      <rect x="10" y="200" width="380" height="60" fill={C.crate} {...O} />
      <Label x={200} y={30} t="lô 0701-L1 · line 1 · nắp phẳng" c={ink.night} />
    </g>
  )
}

function DeliveryBoard() {
  return (
    <g>
      <rect width="400" height="300" fill="#f6f4ee" />
      <text x="200" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2f4258" fontFamily="Barlow Condensed, sans-serif">LỊCH GIAO HÀNG</text>
      {['8/1 · 0601-L2 · 14 điểm bán', '   Q.12 · Gò Vấp · Hóc Môn', '9/1 · 0701-L1 · 12 điểm bán'].map((t, i) => (
        <text key={i} x="30" y={86 + i * 30} fontSize="14" fill="#2f4258" fontFamily={mono}>
          {t}
        </text>
      ))}
      <text x="200" y="240" textAnchor="middle" fontSize="34" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif" transform="rotate(-6 200 230)">
        THU HỒI 11/1
      </text>
    </g>
  )
}

function PalletTruck() {
  return (
    <g>
      <rect width="400" height="300" fill={C.floor} />
      <rect x="40" y="190" width="320" height="26" fill={accent.red} {...O} />
      <path d="M70,190 L110,40 L140,40 L104,190 Z" fill={accent.red} {...O} />
      <circle cx="70" cy="236" r="20" fill={ink.night} />
      <circle cx="330" cy="236" r="20" fill={ink.night} />
    </g>
  )
}

/** The sharps box opened: a heap of insulin pen needles. */
function Sharps() {
  return (
    <g>
      <rect width="400" height="300" fill="#9aa39c" />
      <SharpsBox x={110} y={270} s={1.9} />
      <g>
        {Array.from({ length: 22 }, (_, i) => {
          const x = 230 + (i % 6) * 26
          const y = 90 + Math.floor(i / 6) * 40
          return (
            <g key={i} transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`}>
              <rect x={x - 6} y={y - 8} width="12" height="16" rx="3" fill="#e8e6e0" stroke={LINE} strokeWidth="1.2" />
              <line x1={x} y1={y - 8} x2={x} y2={y - 22} stroke="#5d6870" strokeWidth="1.4" />
            </g>
          )
        })}
      </g>
      <Label x={300} y={52} t="kim insulin 31G · 0,25 mm" c={ink.night} />
      <Label x={300} y={276} t="thay hộp 5/1 · >30 kim" c={ink.night} />
    </g>
  )
}

function PaperTray() {
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <g transform="translate(-20 -90) scale(1.3)">
        <Printer x={60} y={80} />
      </g>
      <g transform="rotate(-4 260 220)">
        <rect x="130" y="170" width="250" height="110" fill="#fbf4e4" {...O} strokeWidth={1.5} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="140" y1={200 + i * 18} x2="370" y2={200 + i * 18} stroke="#8fa7c0" strokeWidth="1.2" />
        ))}
        <text x="146" y="188" fontSize="10" fill="#8fa7c0" fontFamily={mono}>…KIỂM NGHIỆM LÔ ______</text>
      </g>
    </g>
  )
}

function ReleaseForm() {
  return (
    <g>
      <rect width="400" height="300" fill="#b98a5a" />
      <rect x="60" y="20" width="280" height="260" fill="#fbf4e4" {...O} />
      <circle cx="200" cy="30" r="8" fill={accent.red} />
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily={mono}>PHIẾU XUẤT XƯỞNG</text>
      <text x="80" y="96" fontSize="11" fill={ink.night} fontFamily={mono}>Lô: 0601-L2</text>
      <text x="80" y="118" fontSize="11" fill={ink.night} fontFamily={mono}>Kết quả: </text>
      <text x="160" y="120" fontSize="20" fontWeight="700" fill={accent.teal} fontFamily="Barlow Condensed, sans-serif">ĐẠT</text>
      <text x="80" y="142" fontSize="11" fill={ink.night} fontFamily={mono}>Cho phép giao hàng.</text>
      <text x="80" y="200" fontSize="11" fill={ink.night} fontFamily={mono}>08:00 · 07/01/2026</text>
      <text x="320" y="240" textAnchor="end" fontSize="20" fontStyle="italic" fill="#2f4258" fontFamily="Bitter, serif" transform="rotate(-4 260 240)">L. V. Thuận</text>
    </g>
  )
}

function SampleFridge() {
  return (
    <g>
      <rect width="400" height="300" fill="#bcd6d6" />
      {[90, 190].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={LINE} strokeWidth="3" />
      ))}
      {[60, 110, 160].map((x) => (
        <Bottle key={x} x={x} y={88} s={0.85} />
      ))}
      <rect x="200" y="140" width="170" height="36" fill="#fbf4e4" {...O} strokeWidth={1.5} />
      <text x="285" y="156" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>0601-L2 · đã gửi</text>
      <text x="285" y="170" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>kiểm nghiệm 11/1</text>
    </g>
  )
}

/** Front row of the shelf: tiny holes through the caps. */
function ShelfHoles() {
  return (
    <g>
      <rect width="400" height="300" fill={C.shelf} />
      {[50, 130, 210, 290, 370].map((x, i) => (
        <Bottle key={x} x={x} y={250} s={1.8} hole={i !== 2} sour={i === 3} />
      ))}
      <rect y="250" width="400" height="50" fill={C.steelDark} {...O} />
      <circle cx="50" cy="84" r="16" fill="none" stroke={accent.red} strokeWidth="3" />
      <Label x={200} y={28} t="4 chai 0701-L1: có lỗ, vẫn ngon · 2 chai 0601-L2: chua" c={ink.night} />
    </g>
  )
}

function ParkingBook() {
  const rows = [
    ['59-T2 114.07', '18:40', '19:55', ''],
    ['59-V1 268.41', '19:02', '19:20', 'áo mưa xám'],
    ['59-H1 903.22', '19:10', '20:30', ''],
  ]
  return (
    <g>
      <rect width="400" height="300" fill={C.woodDark} />
      <rect x="20" y="20" width="360" height="260" fill="#f6efe2" {...O} />
      <text x="200" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>SỔ GIỮ XE · 10/01</text>
      {rows.map((r, i) => (
        <g key={i}>
          {i === 1 && <rect x="30" y={70 + i * 40} width="340" height="26" fill={accent.amber} opacity="0.35" />}
          <text x="36" y={88 + i * 40} fontSize="12" fill="#1d3a6a" fontFamily={mono}>{r[0]}</text>
          <text x="180" y={88 + i * 40} fontSize="12" fill="#1d3a6a" fontFamily={mono}>{r[1]}</text>
          <text x="236" y={88 + i * 40} fontSize="12" fill="#1d3a6a" fontFamily={mono}>{r[2]}</text>
          <text x="290" y={88 + i * 40} fontSize="10" fill={accent.red} fontFamily={mono}>{r[3]}</text>
        </g>
      ))}
    </g>
  )
}

function Camera() {
  return (
    <g>
      <rect width="400" height="300" fill="#efe7d6" />
      <rect x="180" y="0" width="30" height="90" fill={C.steelDark} {...O} />
      <rect x="110" y="80" width="200" height="90" rx="14" fill="#e8e6e0" {...O} transform="rotate(14 210 125)" />
      <circle cx="290" cy="156" r="22" fill={ink.night} />
      <circle cx="290" cy="156" r="6" fill={accent.red} />
      <Label x={200} y={260} t="ghi hình lưu ở máy của chị Trang" c={ink.night} />
    </g>
  )
}

function Returns() {
  return (
    <g>
      <rect width="400" height="300" fill="#c9bfa8" />
      <Crate x={20} y={170} sour w={360} />
      <Label x={200} y={40} t="khách trả từ 9/1 · nắp phồng · không lỗ" c={ink.night} />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'nhiet-ke': Thermometer,
  'so-van-hanh': LogBook,
  'van-hoi': Valve,
  'bang-chuyen': Conveyor,
  'pallet-0601': SourPallet,
  'pallet-0701': GoodPallet,
  'bang-giao': DeliveryBoard,
  'xe-nang': PalletTruck,
  'hop-kim': Sharps,
  'khay-giay': PaperTray,
  'phieu-xuat': ReleaseForm,
  'tu-mau': SampleFridge,
  'ke-sua': ShelfHoles,
  'so-giu-xe': ParkingBook,
  camera: Camera,
  'thung-tra': Returns,
}
