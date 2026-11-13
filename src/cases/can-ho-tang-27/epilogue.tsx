// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { C, Safe } from './scenes'
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

/** The bedroom set: ring light by the safe, now with the safe closed. */
const LiveRoom = ({ open = false }: { open?: boolean }) => (
  <>
    <rect width="360" height="240" fill={C.wall} />
    <rect x="20" y="40" width="150" height="200" fill={C.wood} stroke={LINE} strokeWidth="2" />
    <g transform="translate(0 0)">
      <Safe x={50} y={110} s={0.32} open={open} />
    </g>
    <circle cx="250" cy="70" r="40" fill="none" stroke="#f6f2e6" strokeWidth="9" />
    <rect x="240" y="50" width="20" height="38" rx="3" fill={LINE} />
    <rect x="268" y="18" width="30" height="13" rx="3" fill="#e0245e" />
    <text x="283" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily={mono}>LIVE</text>
  </>
)

const River = () => (
  <>
    <rect width="360" height="240" fill={C.sky} />
    <rect y="150" width="360" height="90" fill={C.river} />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={i * 46} y={90 + (i % 3) * 16} width="40" height={60 - (i % 3) * 16} fill={C.city} />
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={i} x={8 + (i * 23) % 340} y={100 + (i * 7) % 40} width="4" height="5" fill={accent.amber} opacity="0.8" />
    ))}
  </>
)

const Basement = () => (
  <>
    <rect width="360" height="240" fill={C.concrete} />
    <rect y="30" width="360" height="14" fill={C.pipe} stroke={LINE} strokeWidth="1.5" />
    <rect x="230" y="70" width="100" height="140" fill="#c9ccd0" stroke={LINE} strokeWidth="2" />
    <rect x="245" y="86" width="50" height="26" fill="#10241f" />
  </>
)

const WatchShop = () => (
  <>
    <rect width="360" height="240" fill="#1c1a24" />
    <rect x="30" y="20" width="300" height="40" fill="#2f4258" stroke={LINE} strokeWidth="2" />
    <text x="180" y="47" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">ĐỒNG HỒ CŨ · THU MUA GIÁ CAO</text>
    <rect x="40" y="110" width="280" height="70" fill="#2a2f35" stroke={LINE} strokeWidth="2" />
    {[80, 140, 200, 260].map((x) => (
      <g key={x}>
        <circle cx={x} cy="140" r="16" fill={accent.gold} stroke={LINE} strokeWidth="2" />
        <circle cx={x} cy="140" r="10" fill="#f2f2ee" />
      </g>
    ))}
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 2112</text>
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
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ LAM BAO NGOC</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Trịnh Hoàng Vũ bị đưa ra xét xử về tội trộm cắp tài sản. Chiếc Patek và bộ kim cương được tìm thấy trong tủ đồ ở phòng trọ của anh.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'vu', x: 50, mood: 'worried', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Chị Ngọc nhận đủ 3,2 tỷ, trả xong nợ ngân hàng. Giờ chị livestream với két quay lưng về phía ống kính.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 72, mood: 'smile', size: 44 }]}>
          <LiveRoom />
        </Panel>
      ),
    },
    {
      id: 'hai',
      caption: 'Chị Hai vẫn lên dọn mỗi sáng. Lần nào có thợ tới sửa đồ, chị đứng ngay cạnh tới khi xong.',
      Art: () => (
        <Panel people={[{ id: 'hai', x: 40, mood: 'smile', size: 44 }]}>
          <River />
        </Panel>
      ),
    },
    {
      id: 'sang',
      caption: 'Riverlight thu hồi toàn bộ thẻ kỹ thuật, rà lại khóa của từng căn hộ. Ông Sang được giao giữ sổ phát thẻ ca đêm.',
      Art: () => (
        <Panel people={[{ id: 'sang', x: 34, mood: 'neutral', size: 44 }]}>
          <Basement />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 2112 đóng lại. An Tín chi trả đủ, rồi thay chị Ngọc đòi lại tiền từ kẻ trộm.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ 3,2 TỶ" sub="THẾ QUYỀN: TRỊNH HOÀNG VŨ" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Chị Ngọc được chi trả, Vũ bị khởi tố.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI TRẢ 3,2 TỶ" sub="KHỞI TỐ: TRỊNH HOÀNG VŨ" />
        </Panel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Không ai nói cho chị Ngọc biết mã két đã lọt ra từ đâu. Tối hôm sau, chị lại mở két ngay trước ống kính.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 72, mood: 'smile', size: 44 }]}>
          <LiveRoom open />
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
      id: 'vu',
      caption: 'Dưới hầm B2, Vũ vẫn trực ca đêm, điện thoại mở livestream. Đến Tết, chiếc Patek được rao bán trong một nhóm đồng hồ cũ.',
      Art: () => (
        <Panel people={[{ id: 'vu', x: 34, mood: 'smile', size: 44 }]}>
          <Basement />
        </Panel>
      ),
    },
  ],
  cut: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 1,6 tỷ, trừ một nửa vì chị Ngọc để lộ mã két.',
      Art: () => (
        <Panel>
          <Transfer amount="1.600.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Chị Ngọc khiếu nại lên Cục Quản lý bảo hiểm. Hợp đồng không có điều khoản nào như vậy, An Tín phải chi đủ kèm lãi chậm trả.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 50, mood: 'angry', size: 44 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì tự đặt ra một điều khoản không có trong hợp đồng.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Chị Ngọc kiện An Tín ra tòa, mang theo vé máy bay, nhật ký khóa cửa và hóa đơn đồng hồ. Công ty thua kiện.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 50, mood: 'angry', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'live',
      caption: 'Clip "bảo hiểm quỵt tiền" của chị đạt hai triệu lượt xem.',
      Art: () => (
        <Panel people={[{ id: 'ngoc', x: 72, mood: 'stern', size: 44 }]}>
          <LiveRoom />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Ở Lê Văn Sỹ, chiếc Rolex số máy 7Y3K2109 được bán lại cho một khách lạ. Kẻ trộm thật chưa bao giờ bị hỏi tới.',
      Art: () => (
        <Panel>
          <WatchShop />
        </Panel>
      ),
    },
  ],
}
