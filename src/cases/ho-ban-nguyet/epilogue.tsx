// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { Bike, C, Lake, Skyline } from './scenes'
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

/** An airport window with a plane taking off: Vy's trip to Đà Nẵng. */
const Airport = () => (
  <>
    <rect width="360" height="240" fill="#9fc2d0" />
    <rect y="170" width="360" height="70" fill="#8f8d86" />
    <path d="M60,150 L250,90 L270,96 L230,120 L300,118 L310,126 L220,140 L120,160 Z" fill="#f2f2ee" stroke={LINE} strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={i * 90} y="0" width="8" height="240" fill={LINE} />
    ))}
    <rect x="20" y="20" width="120" height="30" fill="#1c130f" />
    <text x="80" y="40" textAnchor="middle" fontSize="11" fill="#ffd166" fontFamily={mono}>SGN → DAD 20/03</text>
  </>
)

const LakeNight = () => (
  <>
    <rect width="360" height="240" fill={C.sky} />
    <g transform="scale(0.225)">
      <Skyline y={600} />
    </g>
    <Lake y={135} h={105} w={360} />
  </>
)

const Port = () => (
  <>
    <rect width="360" height="240" fill="#2c3a58" />
    {[C.container1, C.container2, C.container3, C.container2, C.container1].map((c, i) => (
      <rect key={i} x={10 + i * 70} y={60 + (i % 2) * 30} width="64" height="60" fill={c} stroke={LINE} strokeWidth="2" />
    ))}
    <rect y="170" width="360" height="70" fill="#555" />
    <g transform="translate(220 230) scale(0.45)">
      <Bike x={0} y={0} />
    </g>
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

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1403</text>
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

const Transfer = ({ amount, to }: { amount: string; to: string }) => (
  <>
    <rect width="360" height="240" fill="#5a3a24" />
    <rect x="110" y="20" width="140" height="200" rx="16" fill="#1c130f" />
    <rect x="120" y="36" width="120" height="170" rx="6" fill="#f6efe2" />
    <text x="180" y="70" textAnchor="middle" fontSize="8.5" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="9" fill={LINE} fontFamily={mono}>→ {to}</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Đặng Quốc Toàn bị xét xử về tội giết người. Vợ anh bị điều tra trong vụ rút 7,1 tỷ qua công ty Thành Đạt.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'toan', x: 50, mood: 'worried', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'transfer',
      caption: 'An Tín chuyển 6 tỷ vào tài khoản đứng tên Đặng Bảo Vy. Mẹ cháu giữ hộ tới năm cháu 18 tuổi.',
      Art: () => (
        <Panel>
          <Transfer amount="6.000.000.000đ" to="DANG BAO VY" />
        </Panel>
      ),
    },
    {
      id: 'truc',
      caption: 'Ngày 20/3, Vy vẫn bay ra Đà Nẵng mừng sinh nhật 17 tuổi, lần này với mẹ.',
      Art: () => (
        <Panel people={[{ id: 'truc', x: 70, mood: 'smile', size: 44 }]}>
          <Airport />
        </Panel>
      ),
    },
    {
      id: 'quyen',
      caption: 'Chị Quyên giữ lại công ty cho tới khi ngân hàng xong việc. Buổi đối chiếu sổ sách cuối cùng cũng diễn ra.',
      Art: () => (
        <Panel people={[{ id: 'quyen', x: 34, mood: 'neutral', size: 44 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'phuc',
      caption: 'Phúc làm chứng ở tòa. Từ đó chìa chiếc Wave đỏ luôn nằm trong túi áo cậu.',
      Art: () => (
        <Panel people={[{ id: 'phuc', x: 32, mood: 'worried', size: 44 }]}>
          <Port />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Tiền về đúng tay Vy, Toàn bị khởi tố.',
      Art: () => (
        <Panel>
          <Desk stamp="CHI 6 TỶ CHO NGƯỜI THỪA KẾ" sub="KHỞI TỐ: ĐẶNG QUỐC TOÀN" />
        </Panel>
      ),
    },
    {
      id: 'toan',
      caption: 'Hồ sơ của bạn ghi sai cách ông Hưng chết. Luật sư của Toàn bám vào đó suốt phiên tòa, bản án nhẹ hơn nhiều điều anh đã làm.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'toan', x: 50, mood: 'neutral', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
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
      id: 'toan',
      caption: 'Toàn đứng ra lo tang lễ cho anh trai, rồi xin làm người giám hộ số tiền của cháu.',
      Art: () => (
        <Panel people={[{ id: 'toan', x: 34, mood: 'smile', size: 44 }]}>
          <LakeNight />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 6 tỷ cho người thụ hưởng Đặng Quốc Toàn.',
      Art: () => (
        <Panel>
          <Transfer amount="6.000.000.000đ" to="DANG QUOC TOAN" />
        </Panel>
      ),
    },
    {
      id: 'toan',
      caption: 'Tuần sau, 7,1 tỷ lặng lẽ quay về sổ sách công ty. Buổi kiểm toán không còn gì để tìm.',
      Art: () => (
        <Panel people={[{ id: 'toan', x: 66, mood: 'smile', size: 44 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'truc',
      caption: 'Vy mất cha, mất luôn số tiền cha để lại cho mình.',
      Art: () => (
        <Panel people={[{ id: 'truc', x: 50, mood: 'worried', size: 44 }]}>
          <LakeNight />
        </Panel>
      ),
    },
  ],
  refunded: [
    {
      id: 'file',
      caption: 'Bạn kết luận tự tử. An Tín chỉ hoàn 180 triệu tiền phí, công an đóng hồ sơ theo.',
      Art: () => (
        <Panel>
          <Desk stamp="TỰ TỬ · HOÀN PHÍ" sub="ĐIỀU 8 · 24 THÁNG ĐẦU" />
        </Panel>
      ),
    },
    {
      id: 'truc',
      caption: 'Vy lớn lên tin rằng cha mình đã bỏ đi một tuần trước sinh nhật của cô.',
      Art: () => (
        <Panel people={[{ id: 'truc', x: 50, mood: 'worried', size: 44 }]}>
          <LakeNight />
        </Panel>
      ),
    },
    {
      id: 'toan',
      caption: 'Dưới cảng Tân Thuận, Toàn vẫn chốt hàng mỗi tối thứ bảy.',
      Art: () => (
        <Panel people={[{ id: 'toan', x: 34, mood: 'neutral', size: 44 }]}>
          <Port />
        </Panel>
      ),
    },
  ],
  denied: [
    {
      id: 'file',
      caption: 'Bạn đúng khi không trả cho Toàn, nhưng sai khi không trả cho ai.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI TOÀN BỘ" sub="NGƯỜI THỤ HƯỞNG GÂY RA CÁI CHẾT" />
        </Panel>
      ),
    },
    {
      id: 'truc',
      caption: 'Mẹ của Vy kiện thay con, chỉ cần chỉ ra Điều 11 của hợp đồng. An Tín thua, chi đủ 6 tỷ kèm lãi chậm trả và án phí.',
      Art: () => (
        <Panel people={[{ id: 'truc', x: 50, mood: 'angry', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì đọc hợp đồng thiếu một nửa.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
  ],
}
