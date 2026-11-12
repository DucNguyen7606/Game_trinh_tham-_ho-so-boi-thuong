import { accent, ink } from '@/art/palette'
import { C, ColdTruck, Jacket, LINE, Logger } from './scenes'

// Close-up photos for each hotspot, 400 x 300, framed by EvidencePhoto.

const mono = 'IBM Plex Mono, monospace'
const cond = 'Barlow Condensed, sans-serif'
const O = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const Label = ({ x, y, t, c = '#f3e4c4' }: { x: number; y: number; t: string; c?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="11" fill={c} fontFamily={mono}>
    {t}
  </text>
)

/** The top carton: the German blue tape cut, the terminal's green tape over it. */
function TopCarton() {
  return (
    <g>
      <rect width="400" height="300" fill={C.frost} />
      <rect x="40" y="60" width="320" height="200" fill={C.carton} {...O} />
      <rect x="40" y="60" width="320" height="40" fill={C.cartonDark} {...O} />
      <rect x="185" y="60" width="30" height="200" fill={C.tapeDE} opacity="0.9" />
      <path d="M182,150 l36,-8" stroke={LINE} strokeWidth="2" />
      <rect x="40" y="132" width="320" height="30" fill={C.tapeVN} opacity="0.95" {...O} strokeWidth={1.5} />
      <text x="200" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily={cond}>TÂN SƠN CARGO · TÂN SƠN CARGO</text>
      <text x="200" y="210" textAnchor="middle" fontSize="11" fill="#fff" fontFamily={mono} transform="rotate(90 200 210)">PHARMA-LOGISTIK</text>
      <Logger x={300} y={90} s={0.8} alarm />
      <Label x={160} y={40} t="băng Đức bị rạch · dán lại băng kho" c={ink.night} />
    </g>
  )
}

/** Carton 17 opened: the hidden logger TL-B under the cold packs, showing a green tick. */
function Carton17() {
  return (
    <g>
      <rect width="400" height="300" fill={C.cartonDark} />
      <rect x="30" y="30" width="340" height="240" fill="#e9e3d2" {...O} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={50 + i * 104} y="50" width="92" height="56" rx="10" fill="#cfe0f0" {...O} strokeWidth={2} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect x={60 + (i % 5) * 58} y={130 + Math.floor(i / 5) * 60} width="30" height="48" rx="4" fill="#f6f9fb" {...O} strokeWidth={1.5} />
          <rect x={60 + (i % 5) * 58} y={130 + Math.floor(i / 5) * 60} width="30" height="12" fill="#3f6aa8" />
        </g>
      ))}
      <Logger x={200} y={118} s={1.1} label="TL-B" />
      <Label x={200} y={236} t="min 2,1° · max 6,4° · không cảnh báo" c={ink.night} />
    </g>
  )
}

function WallSensor() {
  return (
    <g>
      <rect width="400" height="300" fill={C.frost} />
      <rect x="60" y="40" width="280" height="200" rx="16" fill="#e9eef0" {...O} />
      <rect x="84" y="62" width="232" height="100" rx="6" fill="#10241f" {...O} strokeWidth={2} />
      <text x="200" y="118" textAnchor="middle" fontSize="40" fontWeight="700" fill={C.loggerScreen} fontFamily={mono}>4,6°C</text>
      <text x="200" y="148" textAnchor="middle" fontSize="12" fill={C.loggerScreen} opacity="0.8" fontFamily={mono}>PHÒNG LẠNH 3</text>
      <text x="200" y="192" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>72 GIỜ · MIN 3,9 · MAX 5,6</text>
      <polyline points="90,222 130,220 170,221 200,216 230,221 270,220 310,221" fill="none" stroke={accent.teal} strokeWidth="3" />
      <Label x={200} y={236} t="đêm 15/11: không lúc nào quá 6°" c={ink.night} />
    </g>
  )
}

function QuarantineTag() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wrap} />
      <rect x="80" y="40" width="240" height="220" fill={C.quarantine} {...O} transform="rotate(-4 200 150)" />
      <g transform="rotate(-4 200 150)">
        <text x="200" y="86" textAnchor="middle" fontSize="28" fontWeight="700" fill={accent.red} fontFamily={cond}>HÀNG KHÔNG ĐẠT</text>
        <text x="200" y="120" textAnchor="middle" fontSize="16" fill={ink.night} fontFamily={mono}>CHỜ TIÊU HỦY 28/11</text>
        <text x="130" y="200" textAnchor="middle" fontSize="16" fontStyle="italic" fill="#1d3a6a" fontFamily="Bitter, serif">P. T. Linh</text>
        <text x="270" y="200" textAnchor="middle" fontSize="16" fontStyle="italic" fill="#1d3a6a" fontFamily="Bitter, serif">Đ. T. Tùng</text>
        <text x="130" y="226" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>dược sĩ QA</text>
        <text x="270" y="226" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>thủ kho</text>
      </g>
    </g>
  )
}

function Shelves() {
  return (
    <g>
      <rect width="400" height="300" fill={C.frost} />
      {[90, 190].map((y) => (
        <rect key={y} x="20" y={y} width="360" height="10" fill={C.steel} {...O} strokeWidth={2} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={30 + i * 88} y="30" width="76" height="60" fill={['#ece2cf', '#7a9fb0', '#cfe0e4', '#ece2cf'][i]} {...O} strokeWidth={2} />
          <rect x={30 + i * 88} y="130" width="76" height="60" fill={['#cfe0e4', '#ece2cf', '#7a9fb0', '#cfe0e4'][i]} {...O} strokeWidth={2} />
          <circle cx={92 + i * 88} cy="44" r="6" fill={C.loggerScreen} />
        </g>
      ))}
      <Label x={200} y={222} t="vắc xin · insulin · mẫu xét nghiệm" c={ink.night} />
      <Label x={200} y={236} t="không lô nào báo vượt nhiệt" c={ink.night} />
      {/* Linh's sticky note on the shelf edge: the noise card H10. */}
      <g transform="translate(-10 8) rotate(2 300 262)">
        <rect x="236" y="240" width="150" height="54" fill="#f6e27a" stroke={LINE} strokeWidth="1.5" />
        <text x="244" y="256" fontSize="9" fill={ink.night} fontFamily={mono}>16/11 · Anh Tùng để riêng</text>
        <text x="244" y="268" fontSize="9" fill={ink.night} fontFamily={mono}>thùng 1 ra mép kệ giùm em.</text>
        <text x="244" y="280" fontSize="9" fill="#b23a2e" fontFamily={mono}>Đừng báo chị Thư!</text>
        <text x="350" y="290" fontSize="10" fill={ink.night} fontFamily={mono} fontStyle="italic">Linh</text>
      </g>
    </g>
  )
}

/** Tùng's jacket, the inner chest pocket turned out with the scrap of German tape. */
function JacketPocket() {
  return (
    <g>
      <rect width="400" height="300" fill={C.locker} />
      <Jacket x={130} y={40} s={0.95} />
      <rect x="230" y="90" width="150" height="110" rx="8" fill="#f6f4ee" {...O} />
      <path d="M260,140 q20,-22 46,-6 q24,14 44,-4 q-4,30 -40,30 q-34,0 -50,-20 Z" fill={C.tapeDE} {...O} strokeWidth={1.5} />
      <text x="305" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={mono}>PHARMA-LOG</text>
      <path d="M150,80 L230,110" stroke={accent.amber} strokeWidth="2" strokeDasharray="6 6" />
      <Label x={305} y={226} t="túi trong, sát ngực" />
      <text x="130" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f3e4c4" fontFamily={cond}>TÙNG</text>
    </g>
  )
}

function RoomThermo() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="80" y="40" width="240" height="180" rx="14" fill="#e9eef0" {...O} />
      <rect x="100" y="60" width="200" height="80" rx="6" fill="#10241f" {...O} strokeWidth={2} />
      <text x="200" y="114" textAnchor="middle" fontSize="38" fontWeight="700" fill={C.loggerScreen} fontFamily={mono}>24,0°</text>
      <text x="200" y="170" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>ĐÊM 15/11</text>
      <text x="200" y="196" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink.night} fontFamily={mono}>MAX 24,5 · MIN 23,6</text>
      <Label x={200} y={236} t="máy lạnh chạy suốt đêm · ngoài trời 26°" c={ink.night} />
    </g>
  )
}

function ShiftBoard() {
  const rows = [
    ['Ngày 15/11', 'Kho lạnh'],
    ['Ca ngày', 'Ngân, Phát'],
    ['Ca đêm', 'Đỗ Thanh Tùng'],
  ]
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="40" y="30" width="320" height="230" fill="#f6f4ee" {...O} />
      <text x="200" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink.night} fontFamily={cond}>BẢNG CA KHO LẠNH 10–16/11</text>
      {rows.map(([a, b], i) => (
        <g key={a}>
          <line x1="40" y1={80 + i * 44} x2="360" y2={80 + i * 44} stroke={LINE} strokeWidth="1.5" />
          <text x="60" y={108 + i * 44} fontSize="13" fill={ink.night} fontFamily={mono}>{a}</text>
          <text x="190" y={108 + i * 44} fontSize="13" fontWeight={i === 2 ? 700 : 400} fill="#1d3a6a" fontFamily={mono}>{b}</text>
        </g>
      ))}
      <rect x="182" y="168" width="170" height="30" fill={accent.amber} opacity="0.3" />
      <text x="200" y="236" textAnchor="middle" fontSize="12" fill={accent.red} fontFamily={mono}>Ca đêm giữ thẻ phòng lạnh 1–4</text>
    </g>
  )
}

function FootballSheet() {
  return (
    <g>
      <rect width="400" height="300" fill={C.wall} />
      <rect x="70" y="20" width="260" height="260" fill="#f6f4ee" {...O} />
      <text x="200" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink.night} fontFamily={cond}>LỊCH NGOẠI HẠNG ANH · THÁNG 11</text>
      {['MUN – TOT', 'ARS – CHE', 'LIV – MCI', 'NEW – AVL', 'BRE – WHU', 'EVE – FUL'].map((t, i) => (
        <g key={t}>
          <text x="100" y={84 + i * 30} fontSize="12" fill={ink.night} fontFamily={mono}>{t}</text>
          {i % 2 === 0 && <ellipse cx="140" cy={80 + i * 30} rx="52" ry="13" fill="none" stroke={accent.red} strokeWidth="2" />}
          {i % 2 === 0 && (
            <text x="270" y={84 + i * 30} fontSize="13" fontWeight="700" fill={accent.red} fontFamily={mono}>
              {['-85', '-40', '-25'][i / 2]}
            </text>
          )}
        </g>
      ))}
    </g>
  )
}

function Table() {
  return (
    <g>
      <rect width="400" height="300" fill="#e9e3d2" />
      <rect x="40" y="70" width="80" height="90" rx="10" fill="#7d2f2a" {...O} />
      <rect x="150" y="80" width="120" height="70" fill="#e7d2a8" {...O} />
      <circle cx="320" cy="200" r="54" fill={C.tapeVN} {...O} />
      <circle cx="320" cy="200" r="22" fill="#e9e3d2" {...O} strokeWidth={2} />
      <text x="320" y="164" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily={mono}>TÂN SƠN</text>
      <Label x={150} y={222} t="băng keo xanh lá của kho" c={ink.night} />
      <Label x={150} y={236} t="phòng nào cũng có" c={ink.night} />
    </g>
  )
}

function Tablet() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tractor} />
      <rect x="50" y="30" width="300" height="230" rx="14" fill="#1f2328" {...O} />
      <rect x="66" y="46" width="268" height="198" rx="4" fill="#f6efe2" />
      <text x="200" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>XE KÉO 12 · CHÂU VĂN LỘC</text>
      {[
        ['13:10', 'Nhận PMC-4471', 'bụng máy bay'],
        ['13:55', 'Giao PMC-4471', 'cửa kho lạnh'],
        ['14:08', 'Nhận AKE-2210', 'hàng khô'],
      ].map(([t, a, b], i) => (
        <g key={t}>
          <text x="80" y={108 + i * 40} fontSize="13" fontWeight="700" fill={i < 2 ? accent.red : ink.night} fontFamily={mono}>{t}</text>
          <text x="140" y={108 + i * 40} fontSize="12" fill={ink.night} fontFamily={mono}>{a}</text>
          <text x="140" y={124 + i * 40} fontSize="10" fill={ink.night} opacity="0.7" fontFamily={mono}>{b}</text>
        </g>
      ))}
      <rect x="74" y="88" width="252" height="76" fill={accent.amber} opacity="0.2" />
    </g>
  )
}

function Shelter() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tarmac} />
      <path d="M20,40 L380,40 L390,80 L10,80 Z" fill={C.shelter} {...O} />
      <rect x="20" y="80" width="360" height="170" fill="#1c130f" opacity="0.25" />
      <rect x="40" y="230" width="320" height="16" fill="none" stroke="#7fd0a0" strokeWidth="4" strokeDasharray="18 10" />
      <text x="200" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f3e4c4" fontFamily={cond}>HÀNG LẠNH CHỜ NHẬP KHO · TỐI ĐA 30 PHÚT</text>
      <Label x={200} y={160} t="trưa 15/11: khu này còn trống" />
    </g>
  )
}

function Weather() {
  const rows = [
    ['13:00', '34°'],
    ['17:00', '31°'],
    ['23:00', '26°'],
    ['02:00', '25°'],
  ]
  return (
    <g>
      <rect width="400" height="300" fill="#1f2328" />
      <text x="200" y="44" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f3e4c4" fontFamily={cond}>NHIỆT ĐỘ SÂN ĐỖ · 15/11</text>
      {rows.map(([t, v], i) => (
        <g key={t}>
          <text x="120" y={92 + i * 48} fontSize="20" fill="#f3e4c4" fontFamily={mono}>{t}</text>
          <text x="280" y={92 + i * 48} fontSize="26" fontWeight="700" fill={i === 0 ? accent.amber : C.loggerScreen} fontFamily={mono}>{v}</text>
        </g>
      ))}
    </g>
  )
}

function Dolly() {
  return (
    <g>
      <rect width="400" height="300" fill={C.tarmac} />
      <rect x="30" y="170" width="340" height="30" fill={C.steel} {...O} />
      {[80, 320].map((x) => (
        <circle key={x} cx={x} cy="220" r="26" fill="#1f2328" {...O} />
      ))}
      {[0, 1].map((i) => (
        <rect key={i} x={50 + i * 160} y="70" width="140" height="100" fill="#b0925c" {...O} />
      ))}
      <Label x={200} y={236} t="pallet hàng khô · không liên quan" />
    </g>
  )
}

function Truck() {
  return (
    <g>
      <rect width="400" height="300" fill="#b9b2a2" />
      <rect y="250" width="400" height="50" fill={C.dirt} />
      <g transform="translate(30 0)">
        <ColdTruck x={30} y={300} s={0.62} />
      </g>
      <rect x="250" y="40" width="130" height="80" rx="8" fill="#1f2328" {...O} />
      <text x="315" y="74" textAnchor="middle" fontSize="11" fill="#f3e4c4" fontFamily={mono}>MÁY LẠNH</text>
      <text x="315" y="106" textAnchor="middle" fontSize="26" fontWeight="700" fill={C.loggerScreen} fontFamily={mono}>4°C</text>
      <Label x={120} y={40} t="tem thuê xe: Lạnh Việt" c={ink.night} />
    </g>
  )
}

function Incinerator() {
  return (
    <g>
      <rect width="400" height="300" fill="#6f6d67" />
      <rect x="90" y="40" width="220" height="200" rx="100" fill="#3a332f" {...O} />
      <path d="M110,140 L290,140" stroke={LINE} strokeWidth="3" />
      <rect x="100" y="110" width="200" height="90" fill={C.quarantine} {...O} transform="rotate(-3 200 155)" />
      <g transform="rotate(-3 200 155)">
        <text x="200" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill={accent.red} fontFamily={cond}>LÒ SỐ 1 · BẢO TRÌ</text>
        <text x="200" y="164" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>10/11 – 10/12</text>
        <text x="200" y="186" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>KHÔNG VẬN HÀNH</text>
      </g>
      <Label x={200} y={236} t="lò nguội · Hưng Thịnh chỉ có một lò" />
    </g>
  )
}

function PriceBoard() {
  return (
    <g>
      <rect width="400" height="300" fill="#a39a88" />
      <rect x="40" y="30" width="200" height="140" fill="#f6f4ee" {...O} />
      <text x="140" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink.night} fontFamily={cond}>BẢNG GIÁ TIÊU HỦY</text>
      <text x="140" y="96" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>Dược phẩm 18.000đ/kg</text>
      <text x="140" y="124" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>Cấp biên bản trong ngày</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={250 + i * 4} y={190 - i * 6} width="120" height="80" fill="#fbf4e4" {...O} strokeWidth={1.5} />
      ))}
      <text x="322" y="200" textAnchor="middle" fontSize="9" fontWeight="700" fill={ink.night} fontFamily={mono}>BIÊN BẢN TIÊU HỦY</text>
      <text x="322" y="222" textAnchor="middle" fontSize="9" fill={ink.night} fontFamily={mono}>Lô: ............</text>
      <Label x={130} y={240} t="in sẵn, chỉ chờ điền tên lô" c={ink.night} />
    </g>
  )
}

function Drums() {
  return (
    <g>
      <rect width="400" height="300" fill={C.dirt} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={50 + i * 110} y="80" width="90" height="150" rx="10" fill={['#2f4258', '#7d2f2a', '#6b6a35'][i]} {...O} />
      ))}
      <Label x={200} y={236} t="dầu thải, bao bì nhựa · không có thùng thuốc" />
    </g>
  )
}

export const closeups: Record<string, () => JSX.Element> = {
  'thung-tren': TopCarton,
  'thung-17': Carton17,
  'cam-bien': WallSensor,
  'the-cach-ly': QuarantineTag,
  'ke-hang': Shelves,
  'ao-khoac': JacketPocket,
  'nhiet-ke': RoomThermo,
  'bang-ca': ShiftBoard,
  tivi: FootballSheet,
  ban: Table,
  'may-tinh-bang': Tablet,
  'mai-che': Shelter,
  'bang-thoi-tiet': Weather,
  'ro-mooc': Dolly,
  'xe-lanh': Truck,
  'lo-dot': Incinerator,
  'bang-gia': PriceBoard,
  'thung-phuy': Drums,
}
