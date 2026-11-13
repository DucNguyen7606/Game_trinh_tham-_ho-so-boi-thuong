// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { LotusPainting } from './scenes'
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

const Gallery = () => (
  <>
    <rect width="360" height="240" fill="#e9dfcc" />
    <rect y="190" width="360" height="50" fill="#6b4c36" />
    <rect x="110" y="40" width="140" height="116" fill="#5a2f22" stroke={LINE} strokeWidth="2" />
    <g transform="translate(118 48)">
      <LotusPainting w={124} />
    </g>
    <rect x="150" y="164" width="60" height="12" fill="#f3ead6" stroke={LINE} strokeWidth="1" />
  </>
)

const Closed = () => (
  <>
    <rect width="360" height="240" fill="#2d2a2e" />
    <rect x="40" y="40" width="280" height="200" fill="#4a4246" stroke={LINE} strokeWidth="2" />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1="44" y1={50 + i * 16} x2="316" y2={50 + i * 16} stroke="#3a3538" strokeWidth="3" />
    ))}
    <rect x="110" y="20" width="140" height="30" fill="#e9dfcc" stroke={LINE} strokeWidth="2" />
    <text x="180" y="40" textAnchor="middle" fontSize="13" fill={LINE} fontFamily="Bitter, serif">DIỆP GALLERY</text>
    <rect x="130" y="110" width="100" height="40" fill="#f6efe2" stroke={LINE} strokeWidth="1.5" transform="rotate(-4 180 130)" />
    <text x="180" y="135" textAnchor="middle" fontSize="11" fill={accent.red} fontFamily={mono} transform="rotate(-4 180 130)">TẠM NGỪNG</text>
  </>
)

const Workshop = () => (
  <>
    <rect width="360" height="240" fill="#4a3a2e" />
    <rect y="170" width="360" height="70" fill="#7a4f32" />
    <rect x="220" y="40" width="110" height="130" fill="#1d1513" stroke={LINE} strokeWidth="2" />
    <path d="M240,140 q20,-20 40,0" stroke="#d9b04f" strokeWidth="3" fill="none" />
  </>
)

const Auction = () => (
  <>
    <rect width="360" height="240" fill="#1c1a24" />
    <rect x="40" y="20" width="280" height="40" fill="#9e2b22" stroke={LINE} strokeWidth="2" />
    <text x="180" y="46" textAnchor="middle" fontSize="13" fill="#ffe7b8" fontFamily="Bitter, serif">HONG KONG AUCTION · LOT 27</text>
    <rect x="120" y="76" width="120" height="100" fill="#5a2f22" stroke={LINE} strokeWidth="2" />
    <g transform="translate(126 82)">
      <LotusPainting w={108} />
    </g>
    <text x="180" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent.gold} fontFamily={mono}>HK$ 3.400.000</text>
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1120</text>
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
    <text x="180" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>8.000.000.000đ</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ DOAN NGOC DIEP</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 8 tỷ đồng cho bà Diệp. Bức tranh gốc bà mua bảo hiểm đã bị trộm thật, trong đợt phục chế tháng 6.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Tô Minh Quân bị xét xử về tội lừa đảo chiếm đoạt tài sản. Trịnh Bảo Ngọc bị xử cùng vụ vì nhận 300 triệu để phi tang bản chép.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'quan', x: 34, mood: 'worried', size: 40 }, { id: 'ngoc', x: 68, mood: 'worried', size: 40 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'painting',
      caption: 'Bức "Thiếu nữ bên sen" thật được thu hồi từ nhà ông Hứa Vĩnh Thành. Bà Diệp hoàn lại 8 tỷ để chuộc nó về, treo đúng chỗ cũ.',
      Art: () => (
        <Panel people={[{ id: 'diep', x: 22, mood: 'smile', size: 40 }]}>
          <Gallery />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1120 đóng lại. Tiền về đúng người bị mất tranh, còn hai người dựng chuyện phải ra tòa.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ BỒI THƯỜNG" sub="AN TÍN THẾ QUYỀN ĐÒI LẠI TRANH" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'transfer',
      caption: 'Bà Diệp được chi trả đúng, tranh thật được thu hồi, Quân bị khởi tố.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Nhưng hồ sơ ghi sai người lẻn vào phòng tranh đêm 19/11. Ngọc vẫn ngồi bàn tiếp khách ở Diệp Gallery.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 40, mood: 'smile', size: 48 }]}>
          <Gallery />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'transfer',
      caption: 'Bà Diệp được chi trả đúng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'quan',
      caption: 'Nhưng hồ sơ không chỉ ra ai đã tráo tranh. An Tín không đòi được bức thật. Ở Bình Thạnh, Quân nhận thêm một đơn "phục chế" tranh cổ, và mua sẵn một tấm MDF mới.',
      Art: () => (
        <Panel people={[{ id: 'quan', x: 35, mood: 'neutral', size: 46 }]}>
          <Workshop />
        </Panel>
      ),
    },
  ],
  fakeonly: [
    {
      id: 'file',
      caption: 'Bạn từ chối vì thứ bị lấy đêm 19/11 chỉ là bản chép.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: TÀI SẢN BỊ MẤT LÀ TRANH GIẢ" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Luật sư của bà Diệp chỉ ra bức gốc đã bị tráo tháng 6, giữa thời hạn bảo hiểm, và hợp đồng bảo hiểm cả lúc tranh đi phục chế. An Tín thua, chi đủ 8 tỷ kèm án phí.',
      Art: () => (
        <Panel people={[{ id: 'diep', x: 50, mood: 'stern', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'auction',
      caption: 'Không ai đứng ra đòi bức thật. Một năm sau, nó xuất hiện ở phiên đấu giá Hồng Kông.',
      Art: () => (
        <Panel>
          <Auction />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'diep',
      caption: 'Bạn tố bà Diệp tự dựng vụ trộm. Bà mang email đồng ý lấy mẫu sơn, tấm ảnh lúc 01:44 ở Thảo Điền và đôi giày cỡ 38 của mình ra tòa.',
      Art: () => (
        <Panel people={[{ id: 'diep', x: 50, mood: 'stern', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'closed',
      caption: 'An Tín thua kiện, chi đủ 8 tỷ kèm án phí. Tin đồn "bà chủ trộm tranh của mình" khiến Diệp Gallery phải tạm đóng cửa.',
      Art: () => (
        <Panel>
          <Closed />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Ngọc xin nghỉ việc êm thấm.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
  ],
}
