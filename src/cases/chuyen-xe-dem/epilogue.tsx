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

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 0311</text>
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

/** Morning coffee stall with the pepper price on a phone-sized board. */
const Cafe = () => (
  <>
    <rect width="360" height="240" fill="#c99a4a" />
    <rect width="360" height="70" fill="#3f8a7e" />
    <rect x="230" y="90" width="110" height="70" fill="#2c3b33" stroke={LINE} strokeWidth="2" />
    <text x="285" y="115" textAnchor="middle" fontSize="10" fill="#f3efe4" fontFamily="Bitter, serif">TIÊU HÔM NAY</text>
    <text x="285" y="142" textAnchor="middle" fontSize="20" fontWeight="700" fill="#f3efe4" fontFamily="Bitter, serif">155.000</text>
    <rect x="20" y="180" width="120" height="14" fill="#7a4f32" stroke={LINE} strokeWidth="2" />
  </>
)

/** The haulage yard: Kiều's red containers. */
const Yard = () => (
  <>
    <rect width="360" height="240" fill="#8fa3b8" />
    <rect y="150" width="360" height="90" fill="#7a7266" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={20 + i * 115} y={70 + (i % 2) * 10} width="105" height="80" fill="#b5452f" stroke={LINE} strokeWidth="2" />
        {Array.from({ length: 6 }, (_, j) => (
          <line key={j} x1={30 + i * 115 + j * 16} y1={74 + (i % 2) * 10} x2={30 + i * 115 + j * 16} y2={146 + (i % 2) * 10} stroke="#8a3220" strokeWidth="2" />
        ))}
      </g>
    ))}
    <text x="180" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2f4258" fontFamily="Barlow Condensed, sans-serif">KIỀU PHÁT LOGISTICS</text>
  </>
)

const Transfer = () => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>3.040.000.000đ</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ CTY TIEU DAT DO</text>
  </>
)

/** 400 sacks stacked in a trader's yard in Long Khánh. */
const Sacks = () => (
  <>
    <rect width="360" height="240" fill="#6e5a44" />
    {Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 6 }, (_, c) => (
        <rect key={`${r}${c}`} x={10 + c * 58 + (r % 2) * 20} y={190 - r * 40} width="54" height="36" rx="12" fill="#cdb487" stroke={LINE} strokeWidth="1.5" />
      )),
    )}
    <text x="180" y="30" textAnchor="middle" fontSize="12" fill="#f3e4c4" fontFamily={mono}>LÔ DD-1102 · LONG KHÁNH</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Ông Nguyễn Hữu Tài bị xét xử về tội lừa đảo chiếm đoạt tài sản. Ông vẫn nói mình chỉ bán hàng của mình.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'tai', x: 50, mood: 'stern', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'dat',
      caption: 'Anh Đạt khai hết ngay từ đầu và được giảm án. Vợ anh trả lại 250 triệu.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'dat', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'sacks',
      caption: '400 bao tiêu lô DD-1102 được tìm thấy ở Long Khánh. Tiền bán tiêu bị phong tỏa.',
      Art: () => (
        <Panel>
          <Sacks />
        </Panel>
      ),
    },
    {
      id: 'kieu',
      caption: 'Nhà xe Kiều Phát không phải đền hàng. Bà Kiều giữ được hai chiếc container và tháo hết ổ tẩu trong cabin.',
      Art: () => (
        <Panel people={[{ id: 'kieu', x: 35, mood: 'smile', size: 48 }]}>
          <Yard />
        </Panel>
      ),
    },
    {
      id: 'phuc',
      caption: 'Phúc được lên làm tài xế phụ. Giờ cậu không dám xin xuống xe giữa đường nữa.',
      Art: () => (
        <Panel people={[{ id: 'phuc', x: 60, mood: 'smile', size: 46 }]}>
          <Yard />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0311 đóng lại. Công ty không chi 3,04 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
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
      caption: 'Công ty từ chối chi trả vì vụ cướp được dàn dựng. Sếp hài lòng với kết quả.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: DÀN DỰNG VỤ CƯỚP" />
        </Panel>
      ),
    },
    {
      id: 'dat',
      caption: 'Anh Đạt nhận hết tội về mình. Vợ anh vẫn giữ 250 triệu "tiền hụi".',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'dat', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'tai',
      caption: 'Ông Tài vẫn ngồi cà phê đầu hẻm mỗi sáng, xem giá tiêu lên từng ngày.',
      Art: () => (
        <Panel people={[{ id: 'tai', x: 36, mood: 'smile', size: 50 }]}>
          <Cafe />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của Đất Đỏ chỉ ra lập luận không có căn cứ. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <Desk stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Sếp giao hồ sơ 0311 cho người khác.',
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
      caption: 'Bảo hiểm An Tín chuyển 3,04 tỷ đồng cho công ty Tiêu Đất Đỏ.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'sacks',
      caption: 'Ba tháng sau, công an lần ra 400 bao tiêu lô DD-1102 ở một đại lý tại Long Khánh.',
      Art: () => (
        <Panel>
          <Sacks />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0311" />
        </Panel>
      ),
    },
  ],
}
