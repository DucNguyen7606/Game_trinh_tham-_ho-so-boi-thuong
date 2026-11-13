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
      id: 'transfer',
      caption: 'An Tín chuyển 3,04 tỷ đồng cho Tiêu Đất Đỏ. Chủ hàng không gian lận, ông chỉ là người bị mất 20 tấn tiêu.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Bà Đoàn Thị Kiều bị xét xử về tội lừa đảo chiếm đoạt tài sản. An Tín đứng ra đòi lại 3,04 tỷ từ nhà xe.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'kieu', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'dat',
      caption: 'Anh Đạt khai hết và được giảm án. Vợ anh trả lại 250 triệu.',
      Art: () => (
        <Panel people={[{ id: 'dat', x: 50, mood: 'worried', size: 44 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'sacks',
      caption: '400 bao tiêu lô DD-1102 được tìm thấy ở một đại lý tại Long Khánh. Tiền bán tiêu trong tài khoản bà Kiều bị phong tỏa.',
      Art: () => (
        <Panel>
          <Sacks />
        </Panel>
      ),
    },
    {
      id: 'yard',
      caption: 'Hai chiếc container thế chấp vẫn bị ngân hàng kéo đi. Bãi xe Kiều Phát chỉ còn ba chiếc.',
      Art: () => (
        <Panel>
          <Yard />
        </Panel>
      ),
    },
    {
      id: 'tai',
      caption: 'Ông Tài giao trễ hợp đồng xuất, chịu phạt, nhưng giữ được uy tín. Sáng nào ông vẫn ngồi cà phê đầu hẻm xem giá tiêu.',
      Art: () => (
        <Panel people={[{ id: 'tai', x: 36, mood: 'smile', size: 50 }]}>
          <Cafe />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0311 đóng lại. Tiền về đúng chủ hàng, còn người dựng vụ cướp phải trả lại từng đồng.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ BỒI THƯỜNG" sub="ĐÒI LẠI TỪ NHÀ XE KIỀU PHÁT" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'transfer',
      caption: 'Tiêu Đất Đỏ được chi trả đúng, anh Đạt bị khởi tố.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'kieu',
      caption: 'Nhưng hồ sơ không gọi đúng tên người đứng sau. Anh Đạt nhận hết tội, An Tín không có căn cứ đòi tiền nhà xe. Bà Kiều trả xong nợ ngân hàng, giữ trọn năm chiếc container.',
      Art: () => (
        <Panel people={[{ id: 'kieu', x: 35, mood: 'smile', size: 48 }]}>
          <Yard />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'transfer',
      caption: 'Tiêu Đất Đỏ được chi trả đúng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Nhưng người tiếp tay bạn chỉ ra có ngoại phạm vững. Hồ sơ hình sự bị trả về, An Tín không đòi lại được đồng nào.',
      Art: () => (
        <Panel>
          <Desk stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'file',
      caption: 'Bạn từ chối hồ sơ vì cho rằng ông Tài dựng vụ cướp để né hợp đồng lỗ.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: CHỦ HÀNG DÀN DỰNG" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Ông Tài kiện An Tín, mang theo sổ cấp chì, ảnh đêm 2/11 và sao kê tài khoản của mình. An Tín thua, chi đủ 3,04 tỷ kèm án phí.',
      Art: () => (
        <Panel people={[{ id: 'tai', x: 50, mood: 'stern', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'kieu',
      caption: 'Còn bà Kiều đã trả xong nợ ngân hàng, giữ trọn năm chiếc container. Bạn bị rút khỏi vụ.',
      Art: () => (
        <Panel people={[{ id: 'kieu', x: 35, mood: 'smile', size: 48 }]}>
          <Yard />
        </Panel>
      ),
    },
  ],
}
