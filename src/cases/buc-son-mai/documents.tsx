import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { LotusPainting } from './scenes'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

/** A photo of the painting with numbered call-outs. */
function PaintingPhoto({ fake, caption, notes }: { fake?: boolean; caption: string; notes: string[] }) {
  return (
    <div className="bg-[#f4ecdc] p-1.5 shadow">
      <svg viewBox="0 0 300 240" className="block w-full">
        <LotusPainting fake={fake} />
        <g fill="none" stroke="#f2a93b" strokeWidth="2">
          <circle cx="250" cy="46" r="22" />
          <circle cx="262" cy="228" r="26" />
          {!fake && <circle cx="22" cy="212" r="22" />}
        </g>
      </svg>
      <p className="pt-1 font-mono text-[9px] text-[#3a2a20]">{caption}</p>
      <ul className="font-mono text-[9px] text-[#3a2a20]">
        {notes.map((n) => (
          <li key={n}>• {n}</li>
        ))}
      </ul>
    </div>
  )
}

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm tác phẩm nghệ thuật">
    <Row k="Số hợp đồng" v="AT-MT-2025-0310" />
    <Row k="Người được BH" v="Đoàn Ngọc Diệp · Diệp Gallery" />
    <Row k="Tác phẩm" v="Thiếu nữ bên sen (1962)" />
    <Row k="Tác giả" v="Nguyễn Văn Khuê" />
    <Row k="Giá trị BH" v="8.000.000.000 đ" strong />
    <Row k="Hiệu lực" v="10/03/2025" strong />
    <p className="pt-1 text-[10px]">Căn cứ: biên bản thẩm định của ông Lâm Hữu Phong ngày 07/03/2025.</p>
    <p className="text-[10px] italic">Điều 11: Chỉ bồi thường cho tác phẩm gốc đã được thẩm định. Không bồi thường nếu người được bảo hiểm gian lận.</p>
    <Signature name="Đ. N. Diệp" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Lâm Hữu Phong · Giám định mỹ thuật" title="Biên bản thẩm định 07/03/2025">
    <p>
      Chất liệu: <Mark>vóc gỗ mít, 7 lớp sơn ta</Mark>, son Hà Bắc, vàng quỳ, vỏ trứng.
    </p>
    <PaintingPhoto
      caption="Ảnh chụp khi thẩm định, 07/03"
      notes={['Chuồn chuồn đỏ son, góc trên phải', 'Chữ ký "Khuê 62"', 'Vết rạn chân chim góc dưới trái']}
    />
    <p>
      Kết luận: <b>tác phẩm gốc</b>, định giá 8 tỷ đồng.
    </p>
    <Signature name="L. H. Phong" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công ty An ninh Kiên Bảo" title="Nhật ký hệ thống báo động">
    <p className="text-[10px]">Diệp Gallery · 14 Đồng Khởi. Mã: #01 Đoàn Ngọc Diệp · #02 Trịnh Bảo Ngọc · #03 Tạp vụ</p>
    {[
      ['19/11 21:12', 'BẬT', '#02'],
      ['20/11 01:38', 'TẮT', '#01'],
      ['20/11 01:57', 'BẬT', '#01'],
      ['20/11 07:40', 'TẮT', '#02'],
    ].map(([t, a, c]) => (
      <div key={t} className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>{a}</span>
        <span>{c === '#01' ? <Mark>{c}</Mark> : c}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Không ghi nhận cảnh báo đột nhập nào trong đêm.</p>
  </Sheet>
)

const P4 = () => (
  <Sheet org="Công an phường Bến Nghé" title="Biên bản sự việc">
    <Row k="Phát hiện" v="07:40 ngày 20/11" />
    <Row k="Người báo" v="Trịnh Bảo Ngọc (quản lý)" />
    <p>Cửa sau phòng tranh có dấu cạy ở chốt. Bức sơn mài "Thiếu nữ bên sen" mất khỏi khung. Các tác phẩm khác nguyên vẹn.</p>
    <p>
      Bà Đoàn Ngọc Diệp có mặt lúc <Mark>07:51</Mark>.
    </p>
    <Stamp text="CA P. Bến Nghé" className="bottom-2 right-3" />
    <div className="h-8" />
  </Sheet>
)

const P5 = () => (
  <div className="space-y-1">
    <PaintingPhoto
      fake
      caption="Ảnh khai mạc triển lãm Sen Việt, Diệp Gallery, 05/07/2025"
      notes={['Chuồn chuồn màu vàng', 'Chữ ký "Khuê 1962"', 'Góc dưới trái: không còn vết rạn']}
    />
    <p className="bg-[#f6efe2] p-1 font-mono text-[9px] text-[#3a2a20]">Nguồn: trang báo Mỹ Thuật Online. Tranh vừa phục chế xong.</p>
  </div>
)

const P6 = () => (
  <Sheet org="Diệp Gallery" title="Phiếu giao nhận tác phẩm">
    <Row k="Tác phẩm" v="Thiếu nữ bên sen" />
    <Row k="Việc" v="Phục chế vết rạn góc dưới trái" />
    <Row k="Ngày giao đi" v="02/06/2025" strong />
    <Row k="Ngày nhận về" v="28/06/2025" strong />
    <Row k="Người nhận/giao" v="Tô Minh Quân" strong />
    <p className="pt-1 text-[10px]">Ghi chú khi nhận về: "Đã xử lý rạn, đánh bóng lại toàn bộ. Màu tươi hơn."</p>
    <div className="flex justify-between">
      <Signature name="T. M. Quân" />
      <Signature name="T. B. Ngọc" />
    </div>
  </Sheet>
)

const P7 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#252a2e" />
      <rect y="110" width="320" height="70" fill="#3a3f44" />
      <rect x="230" y="20" width="60" height="140" fill="#1a1c20" />
      <text x="260" y="40" textAnchor="middle" fontSize="7" fill="#c4c4c4" fontFamily={mono}>HẺM 14</text>
      {/* A woman on a turquoise Vespa turning into the alley */}
      <g transform="translate(160 120)">
        <circle cx="-26" cy="26" r="11" fill="#111" />
        <circle cx="30" cy="26" r="11" fill="#111" />
        <path d="M-36,20 Q-30,-4 -6,-2 L24,-2 Q44,4 42,22 Z" fill="#4fa8a0" />
        <rect x="-10" y="-34" width="18" height="34" fill="#3a3538" />
        <circle cx="-1" cy="-42" r="9" fill="#e8e2d4" />
        <path d="M-10,-32 Q0,-26 10,-32 L8,-22 Q0,-18 -8,-22 Z" fill="#efe6d4" />
        <path d="M-8,-22 Q0,-18 8,-22" stroke="#9a3a2e" strokeWidth="1.5" fill="none" />
      </g>
      <rect width="320" height="180" fill="#c4a27a" opacity="0.05" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>CAM ĐỒNG KHỞI 03 · NGÃ RẼ HẺM 14</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>20/11/2025 01:36:12</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">
      Xe Vespa xanh ngọc, người lái quấn khăn sáng màu viền sẫm. 01:59:40 ra, chở một túi dẹt cỡ 1 m.
    </p>
  </div>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P8 = () => (
  <Sheet org="Nhà đấu giá Hải Đăng" title="Email gửi bà Đoàn Ngọc Diệp · 28/10">
    <p>Kính gửi bà Diệp,</p>
    <p>
      Theo quy trình mới, mọi tác phẩm trên 5 tỷ đều được <Mark>kiểm định kỹ thuật ngày 21/11</Mark> tại phòng tranh của bà, gồm chụp hồng ngoại và <Mark>lấy mẫu sơn</Mark>.
    </p>
    <p>Kết quả sẽ được công bố kèm catalogue phiên 22/11.</p>
    <p className="text-[10px] italic">Bà Diệp đã trả lời: "Tôi đồng ý."</p>
  </Sheet>
)

const P9 = () => (
  <Sheet org="Phòng thí nghiệm Vật liệu Mỹ thuật" title="Phiếu kết quả phân tích">
    <Row k="Khách hàng" v="Đoàn Ngọc Diệp" strong />
    <Row k="Ngày nhận mẫu" v="06/10/2025" />
    <Row k="Ngày trả kết quả" v="14/10/2025" strong />
    <Row k="Mẫu" v="Vụn sơn, mép dưới tranh" />
    <p className="pt-1">
      Chất kết dính: <Mark>nhựa acrylic</Mark>, không phát hiện sơn ta (nhựa cây sơn).
    </p>
    <p>
      Kết luận: <Mark>không phù hợp niên đại 1962</Mark>.
    </p>
    <p className="text-[10px] italic">Bản gốc gửi khách hàng. Bản lưu do cơ quan điều tra yêu cầu.</p>
    <Stamp text="PTN · Bản lưu" className="bottom-2 right-3" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Ngân hàng · Trích sao kê theo yêu cầu cơ quan điều tra" title="Tài khoản Tô Minh Quân">
    {[
      ['28/06', 'Diệp Gallery · phi phuc che', '+ 45.000.000'],
      ['03/07', 'HUA VINH THANH · thanh toan tac pham', '+ 2.500.000.000'],
      ['10/07', 'Mua xe Ford Ranger', '− 980.000.000'],
    ].map(([d, n, v]) => (
      <div key={d} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{n.startsWith('HUA') ? <Mark>{n}</Mark> : n}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
  </Sheet>
)

const P11 = () => (
  <div className="space-y-1 bg-[#f6efe2] p-2 shadow">
    <p className="title text-sm text-[#2d1f18]">Nhà Đẹp · số tháng 9/2025</p>
    <p className="font-sans text-[10px] text-[#2d1f18]">"Căn biệt thự Phú Mỹ Hưng của nhà sưu tầm Hứa Vĩnh Thành: phòng khách được 'giữ hồn' bằng một bức sơn mài sen cổ."</p>
    <svg viewBox="0 0 300 200" className="block w-full">
      <rect width="300" height="200" fill="#e9dfcc" />
      <rect y="150" width="300" height="50" fill="#8a6448" />
      <rect x="20" y="120" width="140" height="40" rx="10" fill="#c9a274" stroke={LINE} strokeWidth="1.5" />
      <g transform="translate(140 20)">
        <rect x="-6" y="-6" width="142" height="116" fill="#5a2f22" />
        <LotusPainting w={130} />
      </g>
      <circle cx="248" cy="40" r="10" fill="none" stroke="#f2a93b" strokeWidth="2" />
      <circle cx="150" cy="114" r="10" fill="none" stroke="#f2a93b" strokeWidth="2" />
    </svg>
    <p className="font-mono text-[9px] text-[#3a2a20]">Chuồn chuồn đỏ son, vết rạn góc dưới trái, chữ ký "Khuê 62".</p>
  </div>
)

const X1 = () => (
  <div className="space-y-2">
    <Phone header="Chị Thảo · An Tín">
      <p className="text-center text-[9px] opacity-50">12/11/2025</p>
      <Bubble time="16:02">Chị ơi tranh mà bị mất thì bảo hiểm trả bao nhiêu vậy chị?</Bubble>
      <Bubble me time="16:20">Theo giá trị trên hợp đồng em, nhưng phải giám định đã.</Bubble>
    </Phone>
    <div className="bg-[#f6efe2] p-2 font-sans text-[10px] text-[#2d1f18] shadow">
      <p className="font-semibold">Thông báo nhắc nợ thẻ tín dụng</p>
      <p>Chủ thẻ: TRINH BAO NGOC · Dư nợ quá hạn: 180.000.000 đ</p>
    </div>
  </div>
)

const X2 = () => (
  <Sheet org="Lâm Hữu Phong · Giám định mỹ thuật" title="Hóa đơn phí thẩm định">
    <Row k="Khách hàng" v="Diệp Gallery" />
    <Row k="Dịch vụ" v="Thẩm định gấp 3 ngày" />
    <Row k="Phí" v="120.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Mức phí thường: 40.000.000 đ.</p>
    <p className="text-[10px] italic">Lần thẩm định trước (2019): 4 tỷ đồng.</p>
  </Sheet>
)

// ---------------------------------------------------------------------------
// Photos a suspect shows on their phone during an interview.

const PhotoMeta = ({ when, where }: { when: string; where: string }) => (
  <p className="flex justify-between text-[10px] opacity-70">
    <span>{when}</span>
    <span>📍 {where}</span>
  </p>
)

const Guest = ({ x, y, s = 1, skin = '#efc39b', hair = '#1a1a1f', shirt, hairStyle = 'short' }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; hairStyle?: 'short' | 'long' | 'bun' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    {hairStyle === 'long' && <path d="M-14,-50 Q0,-66 14,-50 L18,-14 L-18,-14 Z" fill={hair} />}
    {hairStyle === 'bun' && <circle cx="0" cy="-50" r="8" fill={hair} />}
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />
    <circle cx="-5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <circle cx="5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <path d="M-5,-22 Q0,-18 5,-22" fill="none" strokeWidth="1.4" />
  </g>
)

const TimeTag = ({ t }: { t: string }) => (
  <>
    <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
    <text x="14" y="21" fontSize="11" fill="#fff" fontFamily={mono}>
      {t}
    </text>
  </>
)

/** Diệp's "can't sleep" post: she is dressed to go out, scarf on, helmet and Vespa key on the table. */
const X3 = () => (
  <Phone header="Trang cá nhân · Ngọc Diệp Gallery">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#d8cdb6" />
        <rect x="200" y="20" width="100" height="120" fill="#2a3448" stroke={LINE} strokeWidth="2" />
        <path d="M250,20 V140 M200,80 H300" stroke="#e9dfcc" strokeWidth="4" />
        {/* Diệp with the dog, scarf around her neck */}
        <Guest x={120} y={150} s={1.5} shirt="#7d2f2a" hair="#7d7a76" hairStyle="bun" />
        <path d="M100,116 Q120,130 140,116 L136,134 Q120,140 104,134 Z" fill="#efe6d4" stroke={LINE} strokeWidth="1.4" />
        <path d="M104,134 Q120,140 136,134" stroke="#b23a2e" strokeWidth="2.5" fill="none" />
        <path d="M128,134 l6,34" stroke="#efe6d4" strokeWidth="7" strokeLinecap="round" />
        <g stroke={LINE} strokeWidth="1.4">
          <ellipse cx="80" cy="170" rx="26" ry="18" fill="#f6efe2" />
          <circle cx="62" cy="156" r="12" fill="#f6efe2" />
          <circle cx="58" cy="154" r="1.6" fill={LINE} />
        </g>
        {/* Table: helmet and a key with a turquoise fob */}
        <rect x="0" y="186" width="320" height="34" fill="#7a4f32" stroke={LINE} strokeWidth="1.5" />
        <path d="M218,186 Q218,150 250,150 Q282,150 282,186 Z" fill="#4fa8a0" stroke={LINE} strokeWidth="1.5" />
        <rect x="232" y="164" width="36" height="10" rx="3" fill="#2a3448" />
        <circle cx="180" cy="196" r="5" fill="none" stroke="#c9b27a" strokeWidth="1.6" />
        <rect x="184" y="192" width="18" height="8" rx="2" fill="#4fa8a0" stroke={LINE} strokeWidth="1" />
        <text x="193" y="199" textAnchor="middle" fontSize="5" fill="#fff" fontFamily={mono}>VESPA</text>
        <TimeTag t="20/11 00:50" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 00:50" where="Thảo Điền, TP Thủ Đức" />
    <p className="text-[10px]">"Mất ngủ, có bé Mochi canh 🐶" · 41 lượt thích</p>
  </Phone>
)

const X4 = () => (
  <Phone header="Story · ngoc.baotrinh">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2a1d3a" />
        <circle cx="60" cy="40" r="60" fill="#b04fa0" opacity="0.35" />
        <circle cx="280" cy="50" r="70" fill="#3f8a7e" opacity="0.35" />
        <rect x="90" y="24" width="140" height="30" rx="4" fill="#141020" stroke="#f2a93b" strokeWidth="2" />
        <text x="160" y="44" textAnchor="middle" fontSize="13" fill="#f2a93b" fontFamily="Barlow Condensed, sans-serif">BÙI VIỆN · ĐÊM THỨ TƯ</text>
        <Guest x={80} y={170} shirt="#cf9a32" hairStyle="long" />
        <Guest x={160} y={164} s={1.25} shirt="#ece2cf" hair="#4a3426" hairStyle="long" />
        <Guest x={240} y={170} shirt="#2f4258" />
        <rect x="0" y="196" width="320" height="24" fill="#3a2a4a" />
        <TimeTag t="20/11 01:35" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 01:35" where="Phố đi bộ Bùi Viện, Q.1" />
    <p className="text-[10px]">"Thứ tư mà như thứ bảy 🍹" · được 3 người bạn gắn thẻ</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Live · Xưởng Sơn Quân" dark>
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#4a3a2e" />
        <rect x="0" y="150" width="320" height="70" fill="#7a4f32" />
        <rect x="90" y="120" width="140" height="40" fill="#1d1513" stroke={LINE} strokeWidth="1.5" />
        <path d="M110,140 q20,-10 40,0" stroke="#d9b04f" strokeWidth="2" fill="none" />
        <Guest x={120} y={170} s={1.2} shirt="#3a332f" skin="#b9815a" hairStyle="long" />
        <Guest x={230} y={176} s={0.95} shirt="#7a9fb0" />
        <rect x="8" y="8" width="58" height="16" rx="3" fill="#d23a2e" />
        <text x="37" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={mono}>● LIVE</text>
        <rect x="200" y="8" width="112" height="16" rx="3" fill="#000" opacity="0.45" />
        <text x="256" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={mono}>01:00 → 02:20</text>
      </svg>
    </div>
    <div className="space-y-0.5 rounded bg-white/10 p-1.5 text-[10px]">
      <p><b>hoc_son_mai</b>: thầy mài nhẹ tay vậy hả thầy</p>
      <p><b>Tí (học trò)</b>: 1g45 rồi mà thầy chưa cho em về 😭</p>
    </div>
    <PhotoMeta when="20/11/2025 · 01:00–02:20" where="Xưởng Bình Thạnh" />
  </Phone>
)

const X6 = () => (
  <Phone header="Thư viện ảnh · Hữu Phong">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#1d2b44" />
        <path d="M0,110 Q80,90 160,104 T320,96 L320,130 L0,130 Z" fill="#2b4229" />
        <rect y="128" width="320" height="92" fill="#2f4a5a" />
        <ellipse cx="160" cy="132" rx="200" ry="14" fill="#e8e0d0" opacity="0.4" />
        {[40, 100, 260].map((x) => (
          <g key={x}>
            <line x1={x} y1="100" x2={x} y2="60" stroke="#6f7477" strokeWidth="3" />
            <circle cx={x} cy="58" r="6" fill="#ffd98f" />
          </g>
        ))}
        <text x="160" y="80" textAnchor="middle" fontSize="10" fill="#e8e0d0" fontFamily={mono}>Hồ Xuân Hương</text>
        <TimeTag t="20/11 01:20" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 01:20" where="Hồ Xuân Hương, Đà Lạt" />
    <p className="text-[10px]">Kèm vé tham dự "Hội thảo Bảo tồn mỹ thuật" 19–21/11, khách sạn Đà Lạt.</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6 }
