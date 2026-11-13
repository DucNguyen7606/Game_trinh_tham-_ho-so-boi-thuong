// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'
import { Bottle, C, Dial } from './scenes'
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

/** The factory floor with line 2 stopped for repair. */
const Factory = ({ stopped = true }: { stopped?: boolean }) => (
  <>
    <rect width="360" height="240" fill={C.tile} />
    <rect y="170" width="360" height="70" fill={C.floor} />
    <rect x="200" y="40" width="120" height="140" rx="16" fill={C.steelLight} stroke={LINE} strokeWidth="2" />
    <rect x="0" y="50" width="360" height="12" fill={C.steel} stroke={LINE} strokeWidth="1.5" />
    <g transform="translate(110 90)">
      <Dial x={0} y={0} r={34} now={121} low={stopped ? 121 : 97} />
    </g>
    {stopped && (
      <g transform="rotate(-6 260 120)">
        <rect x="200" y="100" width="120" height="34" fill="#fbf4e4" stroke={accent.red} strokeWidth="3" />
        <text x="260" y="123" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">DỪNG MÁY · SỬA VAN</text>
      </g>
    )}
  </>
)

/** Hiệp Thành Mart's shelf, restocked. */
const Shelf = () => (
  <>
    <rect width="360" height="240" fill="#efe7d6" />
    <rect width="360" height="34" fill={C.mart} />
    <text x="180" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">HIỆP THÀNH MART</text>
    {[110, 190].map((y) => (
      <g key={y}>
        {Array.from({ length: 9 }, (_, i) => (
          <Bottle key={i} x={30 + i * 38} y={y} s={0.7} />
        ))}
        <rect x="0" y={y} width="360" height="8" fill={C.steelDark} />
      </g>
    ))}
  </>
)

/** A factory gate with a sign apologising to customers. */
const Gate = () => (
  <>
    <rect width="360" height="240" fill="#9fb0b0" />
    <rect y="170" width="360" height="70" fill="#8a8476" />
    <rect x="16" y="40" width="210" height="130" fill="#e9e3d4" stroke={LINE} strokeWidth="2" />
    <rect x="16" y="40" width="210" height="28" fill={C.cap} />
    <text x="121" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">SỮA ĐẬU NÀNH MỘC AN</text>
    <text x="121" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill={LINE} fontFamily={mono}>XIN LỖI KHÁCH HÀNG</text>
    <text x="121" y="116" textAnchor="middle" fontSize="8" fill={LINE} fontFamily={mono}>Lô 0601-L2 lỗi tiệt trùng.</text>
    <text x="121" y="134" textAnchor="middle" fontSize="8" fill={LINE} fontFamily={mono}>Hoàn tiền tại điểm bán.</text>
  </>
)

const XeOm = () => (
  <>
    <rect width="360" height="240" fill="#2a3448" />
    <rect y="170" width="360" height="70" fill="#3d4448" />
    <rect x="40" y="40" width="280" height="90" fill={C.mart} stroke={LINE} strokeWidth="2" />
    <text x="180" y="96" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">HIỆP THÀNH MART</text>
    <circle cx="80" cy="30" r="14" fill="#e8e0c8" opacity="0.7" />
  </>
)

function Desk({ stamp, sub }: { stamp: string; sub: string }) {
  return (
    <>
      <rect width="360" height="240" fill="#5a3a24" />
      <rect x="70" y="30" width="220" height="180" fill="#fbf4e4" stroke={LINE} strokeWidth="2" transform="rotate(-3 180 120)" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill={LINE} fontFamily={mono}>HỒ SƠ BỒI THƯỜNG 1201</text>
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
    <text x="180" y="70" textAnchor="middle" fontSize="8" fill={LINE} fontFamily={mono}>Chuyển khoản thành công</text>
    <text x="180" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3f8a7e" fontFamily={mono}>{amount}</text>
    <text x="180" y="140" textAnchor="middle" fontSize="7" fill={LINE} fontFamily={mono}>→ CTY MOC AN</text>
  </>
)

/** Another batch of domed caps, months later. */
const SourAgain = () => (
  <>
    <rect width="360" height="240" fill="#c9cfc8" />
    {Array.from({ length: 6 }, (_, i) => (
      <Bottle key={i} x={45 + i * 54} y={200} s={1.3} sour />
    ))}
    <rect x="0" y="200" width="360" height="40" fill={C.crate} />
    <rect x="120" y="20" width="120" height="30" fill="#fbf4e4" stroke={LINE} strokeWidth="2" />
    <text x="180" y="41" textAnchor="middle" fontSize="13" fontWeight="700" fill={LINE} fontFamily={mono}>LÔ 0404-L2</text>
  </>
)

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Lương Văn Thuận bị khởi tố về hành vi gây rối và lừa đảo chiếm đoạt tài sản. Hộp kim insulin và tờ phiếu kiểm nghiệm cắt đôi nằm trong hồ sơ vụ án.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'thuan', x: 50, mood: 'worried', size: 42 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'ha',
      caption: 'Bà Hà dán thông báo xin lỗi ở cổng nhà máy, hoàn tiền cho từng khách mua phải sữa chua. Line 2 dừng ba tuần để thay toàn bộ van hơi.',
      Art: () => (
        <Panel people={[{ id: 'ha', x: 80, mood: 'neutral', size: 40 }]}>
          <Gate />
        </Panel>
      ),
    },
    {
      id: 'sang',
      caption: 'Sang được nhận lại, kèm một quyết định khen thưởng. Giờ báo động nào trên line 2 cũng tự gửi thẳng tới điện thoại giám đốc.',
      Art: () => (
        <Panel people={[{ id: 'sang', x: 30, mood: 'smile', size: 44 }]}>
          <Factory />
        </Panel>
      ),
    },
    {
      id: 'manh',
      caption: 'Ông Mạnh nhận lời xin lỗi và tiền thuốc. Tối nào ông vẫn đậu xe trước Hiệp Thành Mart, và giờ ông để ý cả người mặc áo mưa trong đêm khô.',
      Art: () => (
        <Panel people={[{ id: 'manh', x: 70, mood: 'smile', size: 42 }]}>
          <XeOm />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1201 đóng lại. An Tín từ chối chi trả: thu hồi do lỗi sản xuất, lời đe dọa do nhân viên của chính người được bảo hiểm dựng lên.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI" sub="LOẠI TRỪ ĐIỀU 7 · CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối đúng: sữa chua vì lỗi tiệt trùng. Nhưng người bị bạn chỉ ra có ngoại phạm vững.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI" sub="NGƯỜI CHÍCH KIM: CHƯA XÁC ĐỊNH" />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận vẫn ký phiếu xuất xưởng mỗi sáng. Cây bút tiêm insulin vẫn nằm trong túi áo.',
      Art: () => (
        <Panel people={[{ id: 'thuan', x: 66, mood: 'neutral', size: 42 }]}>
          <Factory stopped={false} />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Bạn từ chối, nhưng ghi sai nguyên nhân. Mộc An kiện An Tín ra tòa.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI" sub="BỊ KHỞI KIỆN" />
        </Panel>
      ),
    },
    {
      id: 'shelf',
      caption: 'Nửa năm sau, An Tín mới chứng minh được điều bạn bỏ sót. Line 2 vẫn chạy với chiếc van cũ suốt thời gian đó.',
      Art: () => (
        <Panel>
          <Factory stopped={false} />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'ha',
      caption: 'Bà Hà mang biên bản báo công an và phiếu xuất xưởng ký tên Thuận ra trình. Hồ sơ của bạn bị trả về.',
      Art: () => (
        <Panel people={[{ id: 'ha', x: 50, mood: 'angry', size: 44 }]}>
          <Courtroom />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ. Hồ sơ 1201 được giao cho người khác.',
      Art: () => (
        <Panel people={[{ id: 'player', x: 40, mood: 'worried', size: 52 }]}>
          <Office />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận được giao lập báo cáo nội bộ về sự cố. Báo cáo kết luận: lỗi nằm ngoài cổng nhà máy.',
      Art: () => (
        <Panel people={[{ id: 'thuan', x: 60, mood: 'smile', size: 42 }]}>
          <Factory stopped={false} />
        </Panel>
      ),
    },
  ],
  split: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 1,4 tỷ đồng cho Mộc An để bù lô 0701-L1.',
      Art: () => (
        <Panel>
          <Transfer amount="1.400.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Lời đe dọa khiến lô đó bị thu hồi lại do chính trưởng QC của Mộc An viết. Bạn bị kỷ luật vì chi sai điều khoản.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="CHI SAI ĐIỀU 7 · HS 1201" />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 3,2 tỷ đồng cho Công ty Sữa đậu nành Mộc An.',
      Art: () => (
        <Panel>
          <Transfer amount="3.200.000.000đ" />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận nhận thưởng cuối năm "mười năm không lọt lô lỗi".',
      Art: () => (
        <Panel people={[{ id: 'thuan', x: 50, mood: 'smile', size: 44 }]}>
          <Shelf />
        </Panel>
      ),
    },
    {
      id: 'again',
      caption: 'Ba tháng sau, một lô khác của line 2 lại phồng nắp.',
      Art: () => (
        <Panel>
          <SourAgain />
        </Panel>
      ),
    },
  ],
}
