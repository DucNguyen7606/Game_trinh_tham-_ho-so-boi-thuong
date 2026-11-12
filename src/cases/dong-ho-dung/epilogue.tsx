// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { C, Watch } from './scenes'
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

/** The study upstairs with the drafting table by the window. */
const Study = () => (
  <>
    <rect width="360" height="240" fill={C.wall} />
    <rect x="20" y="30" width="90" height="130" fill={C.sky} stroke={LINE} strokeWidth="2" />
    <rect x="4" y="26" width="18" height="138" fill={C.shutter} stroke={LINE} strokeWidth="1.5" />
    <rect x="108" y="26" width="18" height="138" fill={C.shutter} stroke={LINE} strokeWidth="1.5" />
    <polygon points="150,140 300,140 286,60 164,60" fill="#efe6cf" stroke={LINE} strokeWidth="2" />
    <path d="M180,130 L180,96 L225,74 L270,96 L270,130 Z" fill="none" stroke="#2f4258" strokeWidth="1.5" />
    <rect y="200" width="360" height="40" fill={C.limDark} />
  </>
)

/** The hall at the foot of the stairs, morning light. */
const Stairs = () => (
  <>
    <rect width="360" height="240" fill={C.wall} />
    <rect y="200" width="360" height="40" fill={C.tileA} />
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <rect x={200 + i * 26} y={180 - i * 30} width="160" height="8" fill={C.lim} stroke={LINE} strokeWidth="1.5" />
        <rect x={200 + i * 26} y={188 - i * 30} width="160" height="22" fill={C.limDark} />
        <rect x={236 + i * 26} y={180 - i * 30} width="44" height="30" fill={C.runner} />
        <line x1={232 + i * 26} y1={183 - i * 30} x2={284 + i * 26} y2={183 - i * 30} stroke={C.brass} strokeWidth="3" />
      </g>
    ))}
  </>
)

const Gate = () => (
  <>
    <rect width="360" height="240" fill="#3b4255" />
    <rect y="170" width="360" height="70" fill={C.laterite} />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1={20 + i * 30} y1="40" x2={20 + i * 30} y2="200" stroke={C.iron} strokeWidth="6" />
    ))}
    <rect y="40" width="360" height="8" fill={C.iron} />
    <rect x="160" y="60" width="90" height="70" fill={accent.gold} opacity="0.9" stroke={LINE} strokeWidth="2" />
    <text x="205" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7d2f2a" fontFamily={mono}>NIÊM PHONG</text>
    <text x="205" y="110" textAnchor="middle" fontSize="8" fill="#7d2f2a" fontFamily={mono}>NHÀ PHỤ · CA Q.3</text>
  </>
)

const WatchClose = () => (
  <>
    <rect width="360" height="240" fill={C.limDark} />
    <rect x="40" y="170" width="280" height="12" fill={C.lim} />
    <Watch x={180} y={110} r={50} h={8} m={10} crownOut={false} cracked={false} />
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1304</text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="96" y={76 + i * 14} width={150 - (i % 2) * 30} height="5" fill="#c4b494" />
      ))}
      <g transform="rotate(-12 180 160)">
        <rect x="70" y="140" width="220" height="44" fill="none" stroke={accent.red} strokeWidth="4" />
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

const Transfer = ({ amount, to }: { amount: string; to: string }) => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ {to}</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'file',
      caption: 'Hồ sơ 1304 đóng lại. An Tín từ chối theo Điều 7: ông Hiển mất vì bệnh tim, không phải tai nạn. Hồ sơ dựng hiện trường được chuyển cho công an.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI · ĐIỀU 7, ĐIỀU 9" sub="CHUYỂN CA Q.3: TRẦN ĐÌNH KHOA" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Trần Đình Khoa bị xét xử về tội gian lận bảo hiểm, không phải tội giết người. Hai con ốc đồng và chiếc đồng hồ bị kéo núm nằm trên bàn vật chứng.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'khoa', x: 50, mood: 'worried', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'chau',
      caption: 'Chị Châu không bán căn biệt thự. Bản vẽ dang dở của ba được đóng khung, giữ nguyên nét chì cuối cùng.',
      Art: () => (
        <Panel people={[{ id: 'chau', x: 70, mood: 'neutral', size: 44 }]}>
          <Study />
        </Panel>
      ),
    },
    {
      id: 'watch',
      caption: 'Chiếc Seiko được trả lại cho chị Châu. Núm đã đẩy vào, kim lại chạy như ba mươi năm trước.',
      Art: () => (
        <Panel>
          <WatchClose />
        </Panel>
      ),
    },
    {
      id: 'tu',
      caption: 'Chú Tư vẫn tới mỗi sáng lúc 06:30 để mở cổng và lên dây đồng hồ quả lắc ngày Chủ nhật, như ông Hiển vẫn làm.',
      Art: () => (
        <Panel people={[{ id: 'tu', x: 32, mood: 'neutral', size: 44 }]}>
          <Stairs />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối đúng: ông Hiển mất vì bệnh tim.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI · ĐIỀU 7" sub="NGƯỜI DỰNG CẢNH: CHƯA RÕ" />
        </Panel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Nhưng hồ sơ chỉ sai người dựng cảnh. Khoa chỉ bị phạt hành chính, dọn khỏi nhà phụ, mang theo hộp đồ nghề.',
      Art: () => (
        <Panel people={[{ id: 'khoa', x: 34, mood: 'smile', size: 44 }]}>
          <Gate />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Bạn không chi đồng nào, nhưng hồ sơ kể một cái chết khác với kết luận pháp y.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI" sub="LÝ DO: CHƯA KHỚP PHÁP Y" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Luật sư của Khoa bám vào chỗ lệch đó. Bạn mất nửa năm ra tòa giải trình mới giữ được quyết định.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
  ],
  framed: [
    {
      id: 'transfer',
      caption: 'Bạn chi 7 tỷ cho chị Châu và kết luận Khoa giết chú.',
      Art: () => (
        <Panel>
          <Transfer amount="7.000.000.000đ" to="TRAN MINH CHAU" />
        </Panel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Ba tháng sau, phụ lục pháp y được đọc kỹ: ông Hiển mất vì bệnh tim, gãy cổ sau khi đã mất. Khoa được thả về tội giết người.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'khoa', x: 50, mood: 'smile', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'player',
      caption: 'An Tín đã chi 7 tỷ cho một hợp đồng không phải trả. Bạn bị đình chỉ công việc.',
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
      caption: 'Bạn duyệt chi 7 tỷ cho Khoa, đúng như đơn yêu cầu.',
      Art: () => (
        <Panel>
          <Transfer amount="7.000.000.000đ" to="TRAN DINH KHOA" />
        </Panel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Một tuần sau, Khoa trả sạch nợ rồi đóng cửa nhà phụ đi Đà Nẵng.',
      Art: () => (
        <Panel people={[{ id: 'khoa', x: 34, mood: 'smile', size: 44 }]}>
          <Gate />
        </Panel>
      ),
    },
    {
      id: 'chau',
      caption: 'Chị Châu không bao giờ biết ba mình ra đi bên bàn vẽ, chứ không phải dưới chân cầu thang.',
      Art: () => (
        <Panel people={[{ id: 'chau', x: 70, mood: 'worried', size: 44 }]}>
          <Study />
        </Panel>
      ),
    },
  ],
}
