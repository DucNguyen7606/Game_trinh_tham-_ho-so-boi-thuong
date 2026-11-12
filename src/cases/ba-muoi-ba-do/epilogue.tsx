// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { C, ColdTruck, Logger, Pallet } from './scenes'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

function Panel({ children, people = [] }: { children: React.ReactNode; people?: { id: string; x: number; mood?: Mood; size?: number }[] }) {
  const data = useGame((s) => s.data)
  const specOf = (id: string): PortraitSpec | undefined =>
    id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-[#2d1f18]">
      <svg viewBox="0 0 360 240" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        {children}
      </svg>
      {people.map((p) => {
        const spec = specOf(p.id)
        if (!spec) return null
        const w = p.size ?? 38
        return (
          <div key={p.id} className="absolute bottom-0" style={{ left: `${p.x}%`, width: `${w}%`, transform: 'translateX(-50%) translateY(18%)' }}>
            <Portrait spec={{ ...spec, mood: p.mood ?? spec.mood }} size={240} bare className="h-auto w-full" />
          </div>
        )
      })}
    </div>
  )
}

const Courtroom = () => (
  <>
    <rect width="360" height="240" fill="#5a3a26" />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={i * 36} y="0" width="34" height="240" fill="#61402a" />
    ))}
    <rect x="100" y="14" width="160" height="96" fill="#9e2b22" stroke={LINE} strokeWidth="2" />
    <text x="180" y="31" textAnchor="middle" fontSize="11" fill="#ffe7b8" fontFamily="Bitter, serif" letterSpacing="1.5">TÒA ÁN NHÂN DÂN</text>
    <circle cx="180" cy="62" r="20" fill={accent.gold} stroke={LINE} strokeWidth="2" />
    <path d="M180,47 l4.2,9.5 10.3,0.9 -7.8,6.6 2.4,10.2 -9.1,-5.6 -9.1,5.6 2.4,-10.2 -7.8,-6.6 10.3,-0.9 Z" fill="#9e2b22" />
    <rect x="40" y="110" width="280" height="34" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
  </>
)

const DockRail = () => (
  <svg viewBox="0 0 360 240" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
    <rect x="50" y="190" width="260" height="12" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
    {[60, 110, 160, 210, 260, 300].map((x) => (
      <rect key={x} x={x - 4} y="200" width="8" height="40" fill="#573721" stroke={LINE} strokeWidth="1.5" />
    ))}
  </svg>
)

/** A hospital pharmacy shelf receiving the vials. */
const Hospital = () => (
  <>
    <rect width="360" height="240" fill="#e6eef0" />
    <rect x="0" y="0" width="360" height="40" fill="#3f8a7e" />
    <text x="180" y="27" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">BỆNH VIỆN UNG BƯỚU · KHOA DƯỢC</text>
    <rect x="200" y="60" width="140" height="160" fill="#f6f9fb" stroke={LINE} strokeWidth="2" />
    {[90, 140, 190].map((y) => (
      <rect key={y} x="200" y={y} width="140" height="5" fill={C.steel} />
    ))}
    {Array.from({ length: 15 }, (_, i) => (
      <g key={i}>
        <rect x={208 + (i % 5) * 26} y={68 + Math.floor(i / 5) * 50} width="16" height="22" rx="3" fill="#fff" stroke={LINE} strokeWidth="1.2" />
        <rect x={208 + (i % 5) * 26} y={68 + Math.floor(i / 5) * 50} width="16" height="6" fill="#3f6aa8" />
      </g>
    ))}
  </>
)

const Cold = () => (
  <>
    <rect width="360" height="240" fill={C.frost} />
    <g transform="translate(170 50) scale(0.36)">
      <Pallet x={0} y={0} quarantine={false} />
    </g>
  </>
)

const BreakRoom = () => (
  <>
    <rect width="360" height="240" fill={C.wall} />
    <rect x="30" y="40" width="130" height="86" rx="4" fill="#1f2328" stroke={LINE} strokeWidth="2" />
    <rect x="38" y="48" width="114" height="70" fill="#3f8a4a" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={230 + i * 42} y="30" width="40" height="210" fill={C.locker} stroke={LINE} strokeWidth="2" />
    ))}
  </>
)

const Yard = () => (
  <>
    <rect width="360" height="240" fill="#b9b2a2" />
    <rect y="170" width="360" height="70" fill={C.dirt} />
    <g transform="translate(20 0)">
      <ColdTruck x={10} y={230} s={0.5} door />
    </g>
  </>
)

const Market = () => (
  <>
    <rect width="360" height="240" fill="#2b1e17" />
    <rect x="30" y="20" width="300" height="200" rx="14" fill="#f6efe2" stroke={LINE} strokeWidth="2" />
    <text x="180" y="50" textAnchor="middle" fontSize="13" fontWeight="700" fill={LINE} fontFamily={mono}>Thuốc xách tay chính hãng</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={50 + i * 92} y="70" width="76" height="80" fill="#e6eef0" stroke={LINE} strokeWidth="1.5" />
        <rect x={76 + i * 92} y="86" width="24" height="44" rx="4" fill="#fff" stroke={LINE} strokeWidth="1.2" />
        <rect x={76 + i * 92} y="86" width="24" height="10" fill="#3f6aa8" />
        <text x={88 + i * 92} y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill={accent.red} fontFamily={mono}>1,9tr</text>
      </g>
    ))}
    <text x="180" y="204" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Herzena 150mg · inbox giá sỉ</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1511</text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="96" y={76 + i * 14} width={150 - (i % 2) * 30} height="5" fill="#c4b494" />
      ))}
      <g transform="rotate(-12 180 160)">
        <rect x="70" y="140" width="220" height="44" fill="none" stroke={accent.red} strokeWidth="4" />
        <text x="180" y="162" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">{stamp}</text>
        <text x="180" y="177" textAnchor="middle" fontSize="8" fill={accent.red} fontFamily={mono}>{sub}</text>
      </g>
      <g transform="translate(300 40) scale(0.5)">
        <Logger x={0} y={0} />
      </g>
    </>
  )
}

const Office = () => (
  <>
    <rect width="360" height="240" fill="#3d4a52" />
    <rect x="20" y="20" width="120" height="90" fill="#7f8f9c" stroke={LINE} strokeWidth="2" />
    <rect x="190" y="150" width="150" height="70" fill="#c9a274" stroke={LINE} strokeWidth="2" />
    <path d="M200,150 L215,128 L325,128 L340,150 Z" fill="#a8844f" stroke={LINE} strokeWidth="2" />
  </>
)

const Transfer = ({ amount }: { amount: string }) => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>Đã chuyển khoản</text>
    <text x="180" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="8" fill={LINE} fontFamily={mono}>→ DP MINH TÂM</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'hospital',
      caption: 'Ngày 26/11, 1.200 lọ Herzena về tới khoa Dược Bệnh viện Ung bướu. 64 bệnh nhân bắt đầu đợt điều trị tháng 12 đúng hẹn.',
      Art: () => (
        <Panel people={[{ id: 'thu', x: 30, mood: 'smile', size: 44 }]}>
          <Hospital />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Mai Quốc Hưng và Đỗ Thanh Tùng bị đưa ra xét xử về tội lừa đảo chiếm đoạt tài sản. Hợp đồng xe lạnh ký ngày 14/11 là chứng cứ đầu tiên được đọc trước tòa.',
      Art: () => (
        <div className="relative">
          <Panel
            people={[
              { id: 'hung', x: 34, mood: 'stern', size: 38 },
              { id: 'tung', x: 66, mood: 'worried', size: 38 },
            ]}
          >
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'linh',
      caption: 'Linh viết lại quy trình nhận hàng lạnh của Minh Tâm: không niêm phong lô nào khi chưa đọc đủ mọi nhiệt kế trong phiếu đóng gói.',
      Art: () => (
        <Panel people={[{ id: 'linh', x: 26, mood: 'neutral', size: 44 }]}>
          <Cold />
        </Panel>
      ),
    },
    {
      id: 'loc',
      caption: 'Ông Lộc vẫn bị trừ một ngày lương vì để pallet ngoài nắng. Giờ trưa nào ông cũng đẩy hàng lạnh vào mái che trước rồi mới mở hộp cơm.',
      Art: () => (
        <Panel people={[{ id: 'loc', x: 50, mood: 'smile', size: 44 }]}>
          <rect width="360" height="240" fill={C.tarmac} />
          <path d="M40,40 L320,40 L330,70 L30,70 Z" fill={C.shelter} stroke={LINE} strokeWidth="2" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1511 đóng lại. An Tín chỉ trả 38 triệu phí kiểm nghiệm, và không lọ thuốc nào bị đốt.',
      Art: () => (
        <Panel>
          <Desk stamp="KHÔNG CÓ TỔN THẤT" sub="GIẢI PHÓNG LÔ HZ-2509" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'hospital',
      caption: 'Thuốc được giữ lại và về tới bệnh viện đúng hẹn.',
      Art: () => (
        <Panel people={[{ id: 'thu', x: 30, mood: 'smile', size: 44 }]}>
          <Hospital />
        </Panel>
      ),
    },
    {
      id: 'hung',
      caption: 'Tùng bị khởi tố, nhưng hồ sơ không gọi tên người thuê xe lạnh. Ba tháng sau, Hưng Thịnh ký hợp đồng tiêu hủy với một kho lạnh khác.',
      Art: () => (
        <Panel people={[{ id: 'hung', x: 72, mood: 'smile', size: 44 }]}>
          <Yard />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Thuốc được giữ lại, nhưng người bạn chỉ ra không phải người cầm nhiệt kế. Hồ sơ hình sự bị trả về.',
      Art: () => (
        <Panel>
          <Desk stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'tung',
      caption: 'Tùng vẫn trực ca đêm phòng lạnh số 3, áo phao kéo khóa tận cổ.',
      Art: () => (
        <Panel people={[{ id: 'tung', x: 40, mood: 'smile', size: 44 }]}>
          <BreakRoom />
        </Panel>
      ),
    },
  ],
  burned: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 4,6 tỷ cho Minh Tâm và ký cho phép tiêu hủy.',
      Art: () => (
        <Panel>
          <Transfer amount="4.620.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'truck',
      caption: 'Ngày 28/11, xe tải lạnh của Hưng Thịnh nhận 40 thùng thuốc. Biên bản tiêu hủy được gửi về ngay chiều đó, trong khi lò đốt vẫn treo biển bảo trì.',
      Art: () => (
        <Panel people={[{ id: 'hung', x: 78, mood: 'smile', size: 40 }]}>
          <Yard />
        </Panel>
      ),
    },
    {
      id: 'market',
      caption: 'Tháng sau, Herzena "xách tay" được rao bán trên mạng với giá một nửa. Bệnh nhân của Bệnh viện Ung bướu chờ lô mới thêm hai tháng.',
      Art: () => (
        <Panel>
          <Market />
        </Panel>
      ),
    },
  ],
  split: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 2,3 tỷ cho một lô thuốc chẳng hỏng lọ nào.',
      Art: () => (
        <Panel>
          <Transfer amount="2.310.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'thu',
      caption: 'Minh Tâm không đủ tiền nhập lô mới, bị bệnh viện phạt chậm giao. Bà Thư phải bán bớt kho hàng ở Tân Bình.',
      Art: () => (
        <Panel people={[{ id: 'thu', x: 50, mood: 'worried', size: 44 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'truck',
      caption: 'Còn 40 thùng thuốc thật vẫn lên xe tải lạnh của Hưng Thịnh.',
      Art: () => (
        <Panel people={[{ id: 'hung', x: 78, mood: 'smile', size: 40 }]}>
          <Yard />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Minh Tâm kiện An Tín, mang theo hợp đồng bệnh viện và biên bản cách ly của dược sĩ Linh. An Tín thua, phải chi đủ kèm án phí.',
      Art: () => (
        <Panel people={[{ id: 'thu', x: 50, mood: 'angry', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì buộc tội người ngay mà không dừng lệnh tiêu hủy.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'market',
      caption: 'Lô thuốc vẫn được chở đi "tiêu hủy". Vài tuần sau, nó xuất hiện trên mạng với giá một nửa.',
      Art: () => (
        <Panel>
          <Market />
        </Panel>
      ),
    },
  ],
}
