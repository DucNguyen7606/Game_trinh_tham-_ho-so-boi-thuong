// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
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

/** Rail of the dock drawn over the defendant. */
const DockRail = () => (
  <svg viewBox="0 0 360 240" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
    <rect x="90" y="190" width="180" height="12" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
    {[100, 140, 180, 220, 260].map((x) => (
      <rect key={x} x={x - 4} y="200" width="8" height="40" fill="#573721" stroke={LINE} strokeWidth="1.5" />
    ))}
  </svg>
)

const Riverbank = () => (
  <>
    <rect width="360" height="240" fill="#c98a5a" />
    <rect width="360" height="100" fill="#4a4558" />
    <path d="M0,110 Q90,90 180,104 T360,100 L360,130 L0,130 Z" fill="#2b4229" />
    <rect y="128" width="360" height="112" fill="#3e5a5e" />
    <circle cx="280" cy="112" r="20" fill="#ffd98f" opacity="0.8" />
    {[30, 60, 320].map((x) => (
      <line key={x} x1={x} y1="130" x2={x + 3} y2="60" stroke="#9a6a44" strokeWidth="4" />
    ))}
  </>
)

const Market = () => (
  <>
    <rect width="360" height="240" fill="#2f3a3e" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={14 + i * 58} y="20" width="40" height="28" fill="#f2c46b" opacity="0.7" />
    ))}
    <rect y="150" width="360" height="90" fill="#3a3f44" />
    <rect x="230" y="120" width="100" height="40" fill="#3f8a7e" stroke={LINE} strokeWidth="1.5" />
    <text x="280" y="145" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Barlow Condensed, sans-serif">VỰA SỐ 14</text>
  </>
)

const Hospital = () => (
  <>
    <rect width="360" height="240" fill="#d9e4d6" />
    <rect x="20" y="20" width="110" height="80" fill="#9fbfd0" stroke={LINE} strokeWidth="2" />
    <rect x="160" y="140" width="190" height="50" rx="6" fill="#f6efe2" stroke={LINE} strokeWidth="2" />
    <rect x="300" y="40" width="10" height="100" fill="#6f7477" />
    <rect x="290" y="40" width="30" height="40" rx="6" fill="#cfe0ef" stroke={LINE} strokeWidth="1.5" />
    <text x="75" y="130" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>KHOA TIM MẠCH</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 0909</text>
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
    <text x="180" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>5.000.000.000đ</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ PHAM THI HONG</text>
  </>
)

const Gold = () => (
  <>
    <rect width="360" height="240" fill="#2a2522" />
    <rect x="60" y="80" width="240" height="120" fill="#ece6da" stroke={LINE} strokeWidth="2" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={80 + (i % 3) * 70} y={96 + Math.floor(i / 3) * 32} width="56" height="24" rx="2" fill={accent.gold} stroke={LINE} strokeWidth="1.5" />
    ))}
    <text x="180" y="50" textAnchor="middle" fontSize="12" fill="#f3e4c4" fontFamily={mono}>THÙNG XỐP · QUẬN 8</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Nguyễn Văn Tâm bị đưa ra xét xử về tội giết người và cướp tài sản. Ông nhận tội ngay phiên đầu.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'tam', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'hong',
      caption: 'Bà Hồng bị xử tội gian lận bảo hiểm, án treo. Sáng nào bà cũng ra bến, nơi chồng bà xuống ghe lần cuối.',
      Art: () => (
        <Panel people={[{ id: 'hong', x: 40, mood: 'worried', size: 50 }]}>
          <Riverbank />
        </Panel>
      ),
    },
    {
      id: 'gold',
      caption: '27 lượng vàng được tìm thấy trong thùng xốp ở nhà em gái ông Tâm. Tiền được chia trả cho Khang và Vinh.',
      Art: () => (
        <Panel>
          <Gold />
        </Panel>
      ),
    },
    {
      id: 'vinh',
      caption: 'Vinh lấy lại được phần lớn tiền cọc. Anh không còn nhắc chuyện mua vựa.',
      Art: () => (
        <Panel people={[{ id: 'vinh', x: 40, mood: 'neutral', size: 48 }]}>
          <Market />
        </Panel>
      ),
    },
    {
      id: 'son',
      caption: 'Con trai ông Tâm vẫn được mổ tim nhờ một quỹ từ thiện. Bạn là người gửi hồ sơ cho quỹ.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 30, mood: 'smile', size: 44 }]}>
          <Hospital />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0909 đóng lại. Công ty không chi 5 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
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
      caption: 'Công ty từ chối chi trả vì hồ sơ gian lận. Sếp hài lòng với kết quả.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: GIẢ CHẾT TRỤC LỢI" />
        </Panel>
      ),
    },
    {
      id: 'tam',
      caption: 'Sáu Tâm vẫn lái ghe ở Long Hòa. Mỗi tháng ông lên thành phố một lần, mang theo một thùng xốp.',
      Art: () => (
        <Panel people={[{ id: 'tam', x: 55, mood: 'stern', size: 46 }]}>
          <Riverbank />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của bà Hồng chỉ ra lập luận không có căn cứ. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <Desk stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Sếp giao hồ sơ 0909 cho người khác.',
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
      caption: 'Bảo hiểm An Tín chuyển 5 tỷ đồng cho bà Phạm Thị Hồng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'gold',
      caption: 'Nửa năm sau, công an lần theo số sê-ri vàng Kim Hưng tới một thùng xốp ở Quận 8.',
      Art: () => (
        <Panel>
          <Gold />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0909" />
        </Panel>
      ),
    },
  ],
}
