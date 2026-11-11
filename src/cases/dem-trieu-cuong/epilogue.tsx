// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { Boat, C, Carton } from './scenes'
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

/** Bà Lệ's shop on Nguyễn Kim, shelves full again. */
const Shop = () => (
  <>
    <rect width="360" height="240" fill="#e9dfcc" />
    <rect width="360" height="40" fill={accent.red} />
    <text x="180" y="27" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">ĐIỆN THOẠI MỸ LỆ</text>
    {[60, 110, 160].map((y) => (
      <g key={y}>
        <rect x="20" y={y + 26} width="320" height="5" fill={C.steel} />
        {Array.from({ length: 8 }, (_, i) => (
          <Carton key={i} x={26 + i * 39} y={y} w={34} h={26} />
        ))}
      </g>
    ))}
  </>
)

const Pier = () => (
  <>
    <rect width="360" height="240" fill="#2a3448" />
    <rect y="140" width="360" height="100" fill={C.canalDark} />
    <circle cx="300" cy="44" r="18" fill="#e8e0c8" opacity="0.8" />
    <g transform="translate(170 150) scale(0.42)">
      <Boat x={0} y={0} light cargo="none" />
    </g>
  </>
)

const ShopQ10 = () => (
  <>
    <rect width="360" height="240" fill="#1c1a24" />
    <rect x="30" y="20" width="300" height="40" fill="#2f6aa8" stroke={LINE} strokeWidth="2" />
    <text x="180" y="47" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">GIA HƯNG MOBILE · XẢ KHO</text>
    {[90, 140].map((y) => (
      <g key={y}>
        <rect x="30" y={y + 26} width="300" height="5" fill={C.steel} />
        {Array.from({ length: 7 }, (_, i) => (
          <Carton key={i} x={38 + i * 41} y={y} w={36} h={26} />
        ))}
      </g>
    ))}
    <text x="180" y="215" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.gold} fontFamily={mono}>GIÁ SỐC · CÒN NGUYÊN HỘP</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1411</text>
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

const Transfer = ({ amount }: { amount: string }) => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ TRAN THI MY LE</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Võ Đình Khải và Lê Văn Tư bị đưa ra xét xử về tội trộm cắp tài sản. Chiếc ghe SG-4417 bị tạm giữ.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'khai', x: 36, mood: 'worried', size: 40 }, { id: 'tu', x: 66, mood: 'stern', size: 40 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'le',
      caption: 'Bà Lệ nhận 1,8 tỷ cho phần hàng ngập và lấy lại hơn 600 máy từ tiệm Gia Hưng. Đơn Tết vẫn giao kịp.',
      Art: () => (
        <Panel people={[{ id: 'le', x: 50, mood: 'smile', size: 46 }]}>
          <Shop />
        </Panel>
      ),
    },
    {
      id: 'nhat',
      caption: 'Nhật xuống kho phụ mẹ kiểm hàng. Bà Lệ giao cho anh giữ bộ chìa thứ hai, kèm điều kiện bỏ cá độ.',
      Art: () => (
        <Panel people={[{ id: 'nhat', x: 40, mood: 'neutral', size: 46 }]}>
          <Shop />
        </Panel>
      ),
    },
    {
      id: 'bong',
      caption: 'Chị Bông vẫn bán cà phê đầu bến. Đêm triều cường nào chị cũng thức, và giờ cả bến biết chị nhớ tiếng máy từng chiếc ghe.',
      Art: () => (
        <Panel people={[{ id: 'bong', x: 32, mood: 'smile', size: 44 }]}>
          <Pier />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1411 đóng lại. An Tín chi đúng phần thiệt hại do nước, phần còn lại chuyển cơ quan điều tra.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ 1,8 TỶ" sub="PHẦN CÒN LẠI: CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Bà Lệ nhận đúng 1,8 tỷ cho phần hàng ngập. Khải bị khởi tố.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ 1,8 TỶ" sub="KHỞI TỐ: VÕ ĐÌNH KHẢI" />
        </Panel>
      ),
    },
    {
      id: 'tu',
      caption: 'Ở Bến Bình Đông, Tư ghe vẫn neo chỗ cũ, bình dầu lúc nào cũng đầy, chờ đêm nước lớn kế tiếp.',
      Art: () => (
        <Panel people={[{ id: 'tu', x: 70, mood: 'neutral', size: 44 }]}>
          <Pier />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Người bạn chỉ ra có ngoại phạm vững. Hồ sơ hình sự bị trả về.',
      Art: () => (
        <Panel>
          <Desk stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Máy tem MỸ LỆ được bán hết ở Quận 10 trước Tết. Không ai tìm lại được.',
      Art: () => (
        <Panel>
          <ShopQ10 />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Bà Lệ kiện An Tín ra tòa, mang theo tấm ảnh 23:58 và hóa đơn nhập hàng tháng 9. Công ty thua kiện.',
      Art: () => (
        <Panel people={[{ id: 'le', x: 50, mood: 'angry', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ. Hồ sơ 1411 được giao cho người khác.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'khai',
      caption: 'Khải xin nghỉ việc êm thấm, nói muốn về quê mở tiệm điện thoại.',
      Art: () => (
        <Panel people={[{ id: 'khai', x: 60, mood: 'smile', size: 44 }]}>
          <Pier />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 4,5 tỷ đồng cho bà Trần Thị Mỹ Lệ.',
      Art: () => (
        <Panel>
          <Transfer amount="4.500.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Cùng lúc đó, 900 máy "bị nước cuốn" được bán xả kho ở Quận 10, cách tiệm bà Lệ hai dãy phố.',
      Art: () => (
        <Panel>
          <ShopQ10 />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi 2,7 tỷ cho hàng chưa từng chạm nước.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 1411" />
        </Panel>
      ),
    },
  ],
}
