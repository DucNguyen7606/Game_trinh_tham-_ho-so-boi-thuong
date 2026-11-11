// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { Suv } from './scenes'
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
    <rect x="90" y="190" width="180" height="12" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
    {[100, 140, 180, 220, 260].map((x) => (
      <rect key={x} x={x - 4} y="200" width="8" height="40" fill="#573721" stroke={LINE} strokeWidth="1.5" />
    ))}
  </svg>
)

const Hospital = () => (
  <>
    <rect width="360" height="240" fill="#cfd8d6" />
    <rect x="220" y="30" width="110" height="80" fill="#9fb4c8" stroke={LINE} strokeWidth="2" />
    <path d="M275,30 V110 M220,70 H330" stroke="#e8eef0" strokeWidth="4" />
    <rect x="20" y="150" width="240" height="40" rx="6" fill="#f6f6f2" stroke={LINE} strokeWidth="2" />
    <rect x="30" y="140" width="60" height="20" rx="6" fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
    <line x1="300" y1="120" x2="300" y2="230" stroke={LINE} strokeWidth="3" />
    <rect x="288" y="120" width="24" height="34" rx="4" fill="#e8f0f2" stroke={LINE} strokeWidth="1.5" />
    <rect x="130" y="110" width="80" height="34" fill="#f6efe2" stroke={LINE} strokeWidth="1.5" />
    <text x="170" y="131" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>VIỆN PHÍ: ĐÃ TT</text>
  </>
)

const Hotel = () => (
  <>
    <rect width="360" height="240" fill="#1f2a3d" />
    <rect x="60" y="40" width="240" height="200" fill="#d9cfbb" stroke={LINE} strokeWidth="2" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={80 + (i % 3) * 74} y={70 + Math.floor(i / 3) * 60} width="50" height="36" fill={i === 4 ? accent.amber : '#2f4258'} stroke={LINE} strokeWidth="1.5" />
    ))}
    <text x="180" y="62" textAnchor="middle" fontSize="12" fill={accent.amber} fontFamily="Bitter, serif">KHÁCH SẠN SÔNG XANH</text>
  </>
)

const NewCar = () => (
  <>
    <rect width="360" height="240" fill="#2a2a2e" />
    <rect y="170" width="360" height="70" fill="#4e4c4f" />
    <g transform="translate(180 150) scale(0.6)">
      <Suv lights />
    </g>
    <path d="M150,60 q30,-30 60,0 q-30,20 -60,0 Z" fill={accent.red} stroke={LINE} strokeWidth="2" />
    <rect x="170" y="70" width="20" height="40" fill={accent.red} stroke={LINE} strokeWidth="1.5" />
  </>
)

const ColdFile = () => (
  <>
    <rect width="360" height="240" fill="#4a3a2e" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={60 + i * 10} y={50 + i * 12} width="220" height="150" fill="#e7d2a8" stroke={LINE} strokeWidth="2" />
    ))}
    <text x="190" y="120" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>VỤ TÔNG XE BỎ CHẠY</text>
    <text x="190" y="138" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>NGUYỄN VĂN HƯỞNG 06/12</text>
    <rect x="130" y="156" width="120" height="26" fill="none" stroke={accent.red} strokeWidth="3" transform="rotate(-6 190 169)" />
    <text x="190" y="174" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif" transform="rotate(-6 190 169)">TỒN ĐỌNG</text>
  </>
)

const Office = () => (
  <>
    <rect width="360" height="240" fill="#3d4a52" />
    <rect x="20" y="20" width="120" height="90" fill="#7f8f9c" stroke={LINE} strokeWidth="2" />
    <rect x="190" y="150" width="150" height="70" fill="#c9a274" stroke={LINE} strokeWidth="2" />
    <path d="M200,150 L215,128 L325,128 L340,150 Z" fill="#a8844f" stroke={LINE} strokeWidth="2" />
  </>
)

const Transfer = () => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>2.100.000.000đ</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ TRAN QUANG KHAI</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 0712</text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="96" y={76 + i * 14} width={150 - (i % 2) * 30} height="5" fill="#c4b494" />
      ))}
      <g transform="rotate(-12 180 160)">
        <rect x="80" y="140" width="200" height="44" fill="none" stroke={accent.red} strokeWidth="4" />
        <text x="180" y="162" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">{stamp}</text>
        <text x="180" y="177" textAnchor="middle" fontSize="8" fill={accent.red} fontFamily={mono}>{sub}</text>
      </g>
    </>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'khoa',
      caption: 'Trần Minh Khoa bị đưa ra xét xử vì gây tai nạn rồi bỏ chạy, khi đang bị tước bằng lái. Cậu xin gặp chị Hoa để nói lời xin lỗi.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'khoa', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'khai',
      caption: 'Ông Khải bị khởi tố vì che giấu tội phạm và gian lận bảo hiểm. Khách sạn Sông Xanh được rao bán để lo viện phí và bồi thường cho chị Hoa.',
      Art: () => (
        <Panel people={[{ id: 'khai', x: 70, mood: 'worried', size: 44 }]}>
          <Hotel />
        </Panel>
      ),
    },
    {
      id: 'hoa',
      caption: 'Chị Hoa ra viện sau năm tuần. Xe bánh mì ở góc Nguyễn Văn Hưởng mở lại vào mùa Tết.',
      Art: () => (
        <Panel people={[{ id: 'hoa', x: 40, mood: 'smile', size: 46 }]}>
          <Hospital />
        </Panel>
      ),
    },
    {
      id: 'son',
      caption: 'Chú Sơn ký vào lời khai của mình và xin nghỉ việc. Chú nói không muốn xé thêm trang sổ nào nữa.',
      Art: () => (
        <Panel people={[{ id: 'son', x: 50, mood: 'neutral', size: 44 }]}>
          <Hotel />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0712 đóng lại. Công ty không chi 2,1 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
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
      caption: 'Công ty từ chối chi trả vì xe bị cố ý đẩy xuống kênh. Ông Khải bị phạt vì gian lận bảo hiểm.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: CỐ Ý GÂY THIỆT HẠI" />
        </Panel>
      ),
    },
    {
      id: 'cold',
      caption: 'Vụ tông xe ở Nguyễn Văn Hưởng vẫn chưa ai bị gọi tên. Chị Hoa vay tiền lo viện phí.',
      Art: () => (
        <Panel>
          <ColdFile />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của ông Khải chỉ ra lập luận không có căn cứ. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <Desk stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Sếp giao hồ sơ 0712 cho người khác.',
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
      caption: 'Bảo hiểm An Tín chuyển 2,1 tỷ đồng cho ông Trần Quang Khải.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'car',
      caption: 'Ông mua cho con trai một chiếc SUV đen mới, thắt nơ đỏ. Khoa vẫn chưa có bằng lái.',
      Art: () => (
        <Panel>
          <NewCar />
        </Panel>
      ),
    },
    {
      id: 'cold',
      caption: 'Vụ tông xe bỏ chạy bị xếp vào hồ sơ tồn đọng. Khi sự thật lộ ra, bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <ColdFile />
        </Panel>
      ),
    },
  ],
}
