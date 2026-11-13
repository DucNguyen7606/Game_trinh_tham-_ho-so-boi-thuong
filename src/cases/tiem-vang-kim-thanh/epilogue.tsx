// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { Bike, C, Ring, ShopFront, Tray } from './scenes'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'
const display = 'Barlow Condensed, sans-serif'

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

/** The bag of "stolen gold" spilled out on an evidence table. */
const EvidenceBag = () => (
  <>
    <rect width="360" height="240" fill="#3d4a52" />
    <rect x="20" y="120" width="320" height="120" fill="#c9b99a" stroke={LINE} strokeWidth="2" />
    <path d="M40,130 L120,120 L140,200 L50,210 Z" fill="#6b6a35" stroke={LINE} strokeWidth="2" />
    {Array.from({ length: 24 }, (_, i) => (
      <Ring key={i} x={150 + (i % 8) * 22} y={150 + Math.floor(i / 8) * 22} r={8} fake />
    ))}
    <rect x="70" y="40" width="220" height="44" fill="#fbf4e4" stroke={LINE} strokeWidth="2" />
    <text x="180" y="60" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>VẬT CHỨNG · HS 0212</text>
    <text x="180" y="76" textAnchor="middle" fontSize="10" fill={accent.red} fontFamily={mono}>286 nhẫn mạ · 3 lượng thật</text>
  </>
)

/** The shop with the shutter down and a notice taped on it. */
const ShopClosed = ({ notice }: { notice: string }) => (
  <>
    <rect width="360" height="240" fill="#6f7f86" />
    <g transform="translate(-180 -30) scale(0.34)">
      <ShopFront shutter={1} />
    </g>
    <rect y="210" width="360" height="30" fill={C.asphalt} />
    <rect x="150" y="150" width="60" height="40" fill="#fbf4e4" stroke={LINE} strokeWidth="1.5" transform="rotate(-4 180 170)" />
    <text x="180" y="174" textAnchor="middle" fontSize="8" fontWeight="700" fill={accent.red} fontFamily={mono} transform="rotate(-4 180 170)">{notice}</text>
  </>
)

/** The shop reopened, bright and full. */
const ShopOpen = () => (
  <>
    <rect width="360" height="240" fill="#6f7f86" />
    <g transform="translate(-180 -30) scale(0.34)">
      <ShopFront shutter={0} night />
    </g>
    <rect y="210" width="360" height="30" fill={C.asphalt} />
    <text x="70" y="232" textAnchor="middle" fontSize="14" fontWeight="700" fill={accent.gold} fontFamily={display}>KHAI TRƯƠNG LẠI</text>
  </>
)

const Hospital = () => (
  <>
    <rect width="360" height="240" fill="#dfe8e6" />
    <rect x="230" y="30" width="100" height="70" fill="#f6f4ee" stroke={LINE} strokeWidth="2" />
    <text x="280" y="70" textAnchor="middle" fontSize="10" fill="#2f6aa8" fontFamily={mono}>KHOA SẢN</text>
    <rect y="180" width="360" height="60" fill="#c9d6d4" />
  </>
)

const Workbench = () => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="0" y="150" width="360" height="90" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
    <Tray x={220} y={160} w={120} h={50} rings={6} />
    <text x="180" y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill={accent.gold} fontFamily={display}>TIỆM VÀNG HÙNG · NHẬN CHẾ TÁC</text>
  </>
)

const Alley = () => (
  <>
    <rect width="360" height="240" fill="#8aa0a8" />
    <rect x="0" y="30" width="360" height="130" fill={C.wall} stroke={LINE} strokeWidth="2" />
    <rect y="160" width="360" height="80" fill={C.redMud} />
    <rect x="20" y="70" width="110" height="90" fill="#d9c49a" stroke={LINE} strokeWidth="2" />
    <text x="75" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent.red} fontFamily={display}>TẠP HÓA BA LÀNH</text>
  </>
)

const Road = () => (
  <>
    <rect width="360" height="240" fill="#2a3448" />
    <rect y="170" width="360" height="70" fill={C.asphalt} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 100} y="200" width="50" height="5" fill="#e8dcc4" opacity="0.6" />
    ))}
    <g transform="translate(250 190) scale(0.45)">
      <Bike x={0} y={0} />
    </g>
    <text x="100" y="60" textAnchor="middle" fontSize="12" fill="#cfe0e8" fontFamily={mono}>Quang Trung, 23:00</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 0212</text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="96" y={76 + i * 14} width={150 - (i % 2) * 30} height="5" fill="#c4b494" />
      ))}
      <g transform="rotate(-12 180 160)">
        <rect x="70" y="140" width="220" height="44" fill="none" stroke={accent.red} strokeWidth="4" />
        <text x="180" y="162" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent.red} fontFamily={display}>{stamp}</text>
        <text x="180" y="177" textAnchor="middle" fontSize="8" fill={accent.red} fontFamily={mono}>{sub}</text>
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
    <text x="180" y="70" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ HUYNH THI KIM LOAN</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Huỳnh Thị Kim Loan và Lâm Văn Tài bị đưa ra xét xử về tội lừa đảo chiếm đoạt tài sản. Bà Loan nhận hết phần chủ mưu.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'loan', x: 36, mood: 'worried', size: 40 }, { id: 'tai', x: 66, mood: 'worried', size: 40 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'bag',
      caption: 'Túi "vàng cướp" dưới gầm giường phòng trọ của Tài: 286 chiếc nhẫn đồng mạ và đúng 3 lượng vàng thật.',
      Art: () => (
        <Panel>
          <EvidenceBag />
        </Panel>
      ),
    },
    {
      id: 'hung',
      caption: 'Hùng được trả lại tên. Ông mở một bàn chế tác nhỏ ở nhà, vài khách quen của tiệm Kim Thành tìm tới.',
      Art: () => (
        <Panel people={[{ id: 'hung', x: 40, mood: 'smile', size: 46 }]}>
          <Workbench />
        </Panel>
      ),
    },
    {
      id: 'lanh',
      caption: 'Bà Ba Lành vẫn ngồi sạp đầu hẻm 514. Khu Quang Trung không ai chơi hụi nữa.',
      Art: () => (
        <Panel people={[{ id: 'lanh', x: 66, mood: 'neutral', size: 44 }]}>
          <Alley />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0212 đóng lại. An Tín không chi đồng nào, hồ sơ chuyển cơ quan điều tra.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối bồi thường. Bà Loan bị khởi tố, nhưng một mực không khai ai đã vào tiệm tối đó.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="KHỞI TỐ: HUỲNH THỊ KIM LOAN" />
        </Panel>
      ),
    },
    {
      id: 'tai',
      caption: 'Trên đường Quang Trung, Tài vẫn chạy chiếc Exciter đỏ, áo mưa mới, đèn hậu mới.',
      Art: () => (
        <Panel people={[{ id: 'tai', x: 30, mood: 'neutral', size: 42 }]}>
          <Road />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Người bạn chỉ ra có ngoại phạm vững. Luật sư của bà Loan kiện An Tín đòi đủ 6,3 tỷ.',
      Art: () => (
        <Panel>
          <Desk stamp="KHIẾU NẠI" sub="YÊU CẦU GIÁM ĐỊNH LẠI" />
        </Panel>
      ),
    },
    {
      id: 'hung',
      caption: 'Hùng bị gọi lên phường ba lần. Tin đồn "thợ cũ cướp tiệm" theo ông tới tận bệnh viện, nơi con gái ông vừa chào đời.',
      Art: () => (
        <Panel people={[{ id: 'hung', x: 50, mood: 'angry', size: 44 }]}>
          <Hospital />
        </Panel>
      ),
    },
  ],
  partpaid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 2,1 tỷ đồng cho bà Huỳnh Thị Kim Loan.',
      Art: () => (
        <Panel>
          <Transfer amount="2.100.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Một tháng sau, tiệm Kim Thành dán giấy sang nhượng. Bà Loan chuyển đi, không để lại địa chỉ.',
      Art: () => (
        <Panel>
          <ShopClosed notice="SANG NHƯỢNG" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị kỷ luật vì duyệt chi cho một chiếc két mà chính chủ đã mở sẵn.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 6,3 tỷ đồng cho bà Huỳnh Thị Kim Loan.',
      Art: () => (
        <Panel>
          <Transfer amount="6.300.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Tiệm Kim Thành khai trương lại trước Tết, tủ kính đầy vàng thật. Hụi viên cũ còn khen bà Loan giữ chữ tín.',
      Art: () => (
        <Panel people={[{ id: 'loan', x: 70, mood: 'smile', size: 42 }]}>
          <ShopOpen />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi cho 45 lượng vàng chưa từng nằm trong tủ.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0212" />
        </Panel>
      ),
    },
  ],
}
