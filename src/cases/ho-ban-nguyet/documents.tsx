import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { iso } from '@/art/iso/iso'
import { Fb, Person, TimeTag } from '@/art/iso/props-ch9-12'
import type { PortraitSpec } from '@/art/Portrait'
import type { CaseData } from '@/game/types'
import caseJson from './case.json'

const cast = Object.fromEntries((caseJson as CaseData).suspects.map((s) => [s.id, s.portrait])) as Record<string, PortraitSpec>

// What each document in the case-file envelopes looks like, keyed by clue id.

const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm nhân thọ An Tín Trọn Đời">
    <Row k="Số hợp đồng" v="AT-NT-2025-0110" />
    <Row k="Người được BH" v="Đặng Quốc Hưng, 51 tuổi" />
    <Row k="Số tiền BH" v="6.000.000.000 đ" strong />
    <Row k="Hiệu lực" v="10/01/2025" strong />
    <Row k="Người thụ hưởng" v="Đặng Quốc Toàn (em ruột)" strong />
    <p className="pt-1 text-[10px] italic">
      Điều 8, loại trừ: người được bảo hiểm <Mark>tự tử trong 24 tháng</Mark> kể từ ngày hiệu lực. Khi đó An Tín chỉ hoàn lại phí đã đóng.
    </p>
    <p className="text-[10px]">
      Điều 11: nếu người thụ hưởng cố ý gây ra cái chết của người được bảo hiểm, <Mark>An Tín không trả cho người đó</Mark>. Số tiền bảo hiểm được trả cho <Mark>người thừa kế hợp pháp</Mark> của người được bảo hiểm.
    </p>
    <Signature name="Đ. Q. Hưng" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu giải quyết quyền lợi bảo hiểm">
    <Row k="Ngày" v="18/03/2026" />
    <Row k="Người yêu cầu" v="Đặng Quốc Toàn" />
    <Row k="Quan hệ" v="Em ruột, người thụ hưởng" />
    <Row k="Sự kiện" v="Tử vong do rơi từ ban công, 14/3" />
    <Row k="Số tiền yêu cầu" v="6.000.000.000 đ" strong />
    <p className="pt-1 text-[10px]">
      "Anh tôi có thói quen ra ban công hút thuốc mỗi tối. Tôi tin anh tôi <Mark>trượt chân</Mark> do uống rượu, không có chuyện tự tử."
    </p>
    <Signature name="Đ. Q. Toàn" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công an phường Tân Phong, Quận 7" title="Biên bản khám nghiệm hiện trường · 15/3">
    <Row k="Nạn nhân" v="Đặng Quốc Hưng, 52 tuổi" />
    <Row k="Nơi rơi" v="Ban công căn 21.05, tòa B, CC Sen Hồng" />
    <Row k="Vị trí thi thể" v="Vườn phía Đông, cách tường 1,8 m" />
    <Row k="Thời điểm" v="23:41, theo bảo vệ Lương Văn Lộc" strong />
    <p className="pt-1 text-[10px]">
      Cửa căn hộ khóa trong. Nạn nhân đang nợ nần. Nhận định ban đầu: <Mark>nghiêng về tự tử do áp lực nợ</Mark>, chờ kết luận pháp y.
    </p>
    <Signature name="Thiếu tá N. V. Phong" />
    <Stamp text="CA P. Tân Phong" className="bottom-2 left-6" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Trung tâm Pháp y TP.HCM" title="Kết luận giám định pháp y tử thi">
    <Row k="Nguyên nhân chết" v="Đa chấn thương do rơi từ trên cao" />
    <Row k="Nồng độ cồn" v="0,21 mg/l khí thở · mức thấp" />
    <p className="pt-1 text-[10px]">
      Cổ tay trái: <Mark>vết bầm hình bốn ngón tay</Mark>, có trước lúc rơi, như bị nắm chặt.
    </p>
    <p className="text-[10px]">
      Kẽ móng tay phải: <Mark>sợi polyester màu xanh navy</Mark>. Nạn nhân mặc áo thun cotton trắng, quần short xám. Sợi vải không thuộc quần áo nạn nhân.
    </p>
    <div className="h-10" />
    <Stamp text="Pháp y TP.HCM" className="bottom-2 right-3" />
  </Sheet>
)

const P5 = () => (
  <Sheet org="Ban quản lý chung cư Sen Hồng · Tòa B" title="Sổ khách và camera thang máy · 14/3">
    {[
      ['21:28', 'Sảnh A · khách Lâm Khả, CCCD đăng ký', ''],
      ['22:16', 'Sảnh A · Lâm Khả ra về (camera sảnh)', ''],
      ['23:10', 'Thang 3 · B2 → tầng 21', 'mũ bảo hiểm trắng, áo khoác navy'],
      ['23:47', 'Thang 3 · tầng 21 → B2', 'cùng người, cúi mặt'],
    ].map(([t, e, n]) => (
      <div key={t} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-dotted border-black/20 text-[10px]">
        <span className="font-mono">{t}</span>
        <span>
          {n ? <Mark>{e}</Mark> : e}
          {n && <span className="block italic opacity-80">{n}</span>}
        </span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Khách từ hầm B2 không qua quầy, không đăng ký tên. Căn hộ bấm mở thang từ màn hình nội bộ.</p>
    <Stamp text="BQL Sen Hồng" className="bottom-2 right-3" />
    <div className="h-6" />
  </Sheet>
)

const P6 = () => (
  <Phone header="Email · quyen.pt@hungtoan.vn">
    <p className="text-[10px] font-semibold">Gửi: anh Hưng · 12/03/2026 18:20</p>
    <p className="text-[10px] font-semibold">V/v: Chi phí Thành Đạt, chuẩn bị đối chiếu 15/3</p>
    <div className="rounded bg-white p-2 text-[10px] leading-snug">
      <p>Anh Hưng,</p>
      <p>
        Em rà lại năm 2025: <Mark>14 phiếu chi cho Công ty Vận tải Thành Đạt, tổng 7,1 tỷ</Mark>. Không có hợp đồng, không có biên bản giao hàng, không chuyến nào khớp lịch tàu.
      </p>
      <p>
        Cả 14 phiếu do <Mark>anh Toàn duyệt</Mark>. Theo đăng ký kinh doanh, giám đốc Thành Đạt là bà <Mark>Ngô Thị Thắm, vợ anh Toàn</Mark>.
      </p>
      <p>Em chuẩn bị đủ chứng từ cho buổi đối chiếu 9:00 sáng chủ nhật 15/3.</p>
    </div>
  </Phone>
)

const P7 = () => (
  <Sheet org="Phòng CSGT Công an TP.HCM · Trích xuất" title="Tra cứu đăng ký xe">
    <Row k="Biển số" v="59P2-418.36" strong />
    <Row k="Loại xe" v="Honda Wave, màu đỏ" />
    <Row k="Chủ xe" v="Hồ Văn Phúc" strong />
    <Row k="Năm sinh" v="2002" />
    <Row k="Nơi làm việc" v="Hưng Toàn Logistics, cảng Tân Thuận" />
    <div className="mt-1 flex justify-center">
      <svg viewBox="0 0 260 110" className="w-52">
        <rect width="260" height="110" rx="8" fill="#e6dfee" />
        <rect y="88" width="260" height="22" fill="#cfc6bf" />
        <WaveBike x={60} y={96} />
      </svg>
    </div>
    <Stamp text="Đã trích xuất" className="bottom-2 right-3" />
  </Sheet>
)

const CamFrame = ({ t, gate }: { t: string; gate: string }) => (
  <div className="overflow-hidden rounded-lg">
    <svg viewBox="0 0 220 130" className="block w-full">
      <rect width="220" height="130" fill="#4b4760" />
      <rect y="96" width="220" height="34" fill="#6c6787" />
      {/* the barrier post and its raised arm */}
      <Fb x={150} y={20} w={12} h={80} d={8} c="#f2c46d" />
      <rect x="40" y="64" width="110" height="6" fill={iso.coral} transform="rotate(-30 40 67)" />
      <g transform="translate(14 22) scale(0.8)">
        <WaveBike x={60} y={118} />
      </g>
      {/* rider: white helmet, navy office jacket */}
      <Fb x={86} y={52} w={24} h={30} d={10} c="#2f4258" />
      <Fb x={89} y={30} w={20} h={20} d={12} c="#f2f2ee" />
      <rect x="92" y="40" width="14" height="6" fill="#3d3446" />
      <rect x="0" y="0" width="220" height="16" fill={iso.ink} opacity="0.6" />
      <text x="6" y="12" fontSize="9" fill="#fff" fontFamily={mono}>{gate}</text>
      <text x="214" y="12" textAnchor="end" fontSize="9" fill="#ffd166" fontFamily={mono}>{t}</text>
    </svg>
  </div>
)

/** Phúc's red Wave, side on, as front-on blocks. (x, y) = rear wheel bottom. */
const WaveBike = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y - 14} r="14" fill={iso.ink} />
    <circle cx={x} cy={y - 14} r="5" fill="#9aa3b5" />
    <circle cx={x + 92} cy={y - 14} r="14" fill={iso.ink} />
    <circle cx={x + 92} cy={y - 14} r="5" fill="#9aa3b5" />
    <Fb x={x - 6} y={y - 40} w={64} h={20} d={10} c="#c0392b" />
    <Fb x={x + 2} y={y - 50} w={42} h={10} d={10} c={iso.ink} />
    <Fb x={x + 58} y={y - 46} w={22} h={14} d={8} c="#c0392b" />
    <Fb x={x + 78} y={y - 70} w={8} h={48} d={6} c="#9aa3b5" />
    <Fb x={x + 70} y={y - 76} w={24} h={6} d={6} c={iso.ink} />
    <Fb x={x - 18} y={y - 36} w={12} h={8} d={4} c="#f6efe3" />
  </g>
)

const P8 = () => (
  <Sheet org="Cảng Tân Thuận · Phòng an ninh" title="Camera cổng phụ xe máy · đêm 14–15/3">
    <div className="grid grid-cols-2 gap-2">
      <CamFrame t="14/03 22:52" gate="CỔNG PHỤ · RA" />
      <CamFrame t="15/03 00:09" gate="CỔNG PHỤ · VÀO" />
    </div>
    <Row k="Xe" v="59P2-418.36 · Wave đỏ" strong />
    <p className="pt-1 text-[10px]">
      Người lái đội mũ bảo hiểm trắng, mặc <Mark>áo khoác đồng phục xanh navy</Mark> của khối văn phòng. Công nhân kho ca đêm mặc đồng phục màu olive.
    </p>
    <p className="text-[10px] italic">Cổng phụ không ghi sổ, chỉ có camera.</p>
  </Sheet>
)

const P9 = () => (
  <Sheet org="UBND phường Tân Phong · Trích lục hộ tịch" title="Xác nhận quan hệ nhân thân và thừa kế">
    <Row k="Người chết" v="Đặng Quốc Hưng" />
    <Row k="Hôn nhân" v="Ly hôn bà Lý Thanh Trúc, 2024" />
    <Row k="Cha, mẹ" v="Đều đã mất" />
    <Row k="Con" v="Đặng Bảo Vy, sinh 20/3/2009" strong />
    <p className="pt-1 text-[10px]">
      Người thừa kế theo pháp luật, hàng thứ nhất: <Mark>Đặng Bảo Vy</Mark> (duy nhất). Anh, chị, em ruột thuộc hàng thứ hai.
    </p>
    <p className="text-[10px] italic">Vy chưa đủ 18 tuổi. Tài sản do mẹ ruột quản lý thay tới khi đủ tuổi.</p>
    <Signature name="Cán bộ tư pháp" />
    <Stamp text="UBND P. Tân Phong" className="bottom-2 left-6" />
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X1 = () => (
  <Sheet org="Ngân hàng TMCP Đông Nam" title="Thông báo thu hồi nợ trước hạn">
    <Row k="Khách hàng" v="Cty TNHH Hưng Toàn Logistics" />
    <Row k="Dư nợ" v="9.000.000.000 đ" strong />
    <Row k="Người bảo lãnh" v="Đặng Quốc Hưng" />
    <p className="pt-1 text-[10px]">
      Do báo cáo tài chính quý IV có dấu hiệu bất thường, ngân hàng đề nghị <Mark>trả toàn bộ dư nợ trong 30 ngày</Mark>, hoặc cung cấp báo cáo đã kiểm toán.
    </p>
    <div className="h-10" />
    <Stamp text="Thu hồi nợ" className="bottom-2 right-3" />
  </Sheet>
)

const X2 = () => (
  <Sheet org="Tòa án nhân dân Quận 7" title="Đơn yêu cầu thay đổi người trực tiếp nuôi con">
    <Row k="Người yêu cầu" v="Lý Thanh Trúc" />
    <Row k="Ngày nộp" v="12/02/2026" />
    <Row k="Con chung" v="Đặng Bảo Vy, 16 tuổi" />
    <p className="pt-1 text-[10px]">
      Lý do: ông Hưng <Mark>"thường xuyên say xỉn, nợ nần, đi sớm về khuya"</Mark>, không bảo đảm việc học của con.
    </p>
    <Signature name="L. T. Trúc" />
  </Sheet>
)

const X3 = () => (
  <Sheet org="Giấy viết tay" title="Giấy vay tiền">
    <p className="text-[11px] italic" style={{ fontFamily: 'Bitter, serif' }}>
      Tôi tên Đặng Quốc Hưng có vay của ông Lâm Khả số tiền <Mark>2.000.000.000 đ</Mark> (hai tỷ đồng), lãi 5%/tháng, hẹn trả đủ <Mark>ngày 10/3/2026</Mark>. Nếu trễ hạn, tôi chịu mọi trách nhiệm.
    </p>
    <Row k="Ngày viết" v="10/12/2025" />
    <div className="flex justify-between">
      <Signature name="Lâm Khả" />
      <Signature name="Đ. Q. Hưng" />
    </div>
  </Sheet>
)

const X4 = () => (
  <Phone header="Anh Hưng (GĐ)">
    <p className="text-center text-[9px] opacity-50">Thứ bảy, 14/03/2026</p>
    <Bubble me time="21:05">Anh ơi em gửi lại file Thành Đạt rồi nha</Bubble>
    <Bubble time="23:02">Mai 9h chị mang đủ chứng từ. Tối nay tôi nói chuyện với Toàn.</Bubble>
    <Bubble time="23:02">Xong vụ này tôi đưa Vy đi Đà Nẵng 😊</Bubble>
    <Bubble me time="23:15">Dạ anh. Anh nói chuyện cẩn thận</Bubble>
    <p className="text-center text-[9px] opacity-50">Tin cuối chưa được đọc</p>
  </Phone>
)


const P10 = () => (
  <Phone header="Điện thoại ông Hưng · công an trích xuất">
    <p className="text-center text-[9px] opacity-50">Lâm Khả · 14/3/2026</p>
    <Bubble time="22:31">Ông hứa cuối tháng thì cuối tháng. Tôi không chờ thêm ngày nào</Bubble>
    <Bubble time="23:15">Mai không có tiền thì đừng trách tôi. Nhà ông tôi biết rồi</Bubble>
    <p className="text-center text-[9px] opacity-50">Đã xem 23:16</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Ảnh · Lâm Khả">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#3b3156" />
        {/* the karaoke screen and two disco lights */}
        <Fb x={90} y={20} w={140} h={80} d={10} c="#3f6aa8" />
        <text x="160" y="66" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="'Be Vietnam Pro', sans-serif">♪ Duyên phận ♪</text>
        {[30, 290].map((x) => (
          <Fb key={x} x={x - 10} y={20} w={20} h={16} d={8} c="#e0245e" />
        ))}
        <Person x={80} y={176} look={{ hair: 'short' }} shirt="#ece2cf" />
        <Person x={160} y={170} s={1.25} spec={cast['kha']} look={{ mood: 'smile' }} />
        <Person x={240} y={176} look={{ hair: 'side-part' }} shirt="#7d2f2a" />
        {/* the microphone in Khả's hand */}
        <Fb x={186} y={124} w={6} h={26} d={4} c="#333344" />
        <Fb x={184} y={116} w={10} h={10} d={6} c="#9aa3b5" />
        <Fb x={-4} y={200} w={330} h={22} d={14} c="#5b4a7c" />
        <TimeTag t="14/03 23:40" />
      </svg>
    </div>
    <p className="flex justify-between text-[10px] opacity-70">
      <span>14/03/2026 · 23:40</span>
      <span>📍 Karaoke Hoàng Gia, Q.4</span>
    </p>
  </Phone>
)

const X6 = () => (
  <Phone header="Anh Toàn">
    <p className="text-center text-[9px] opacity-50">14/03/2026</p>
    <Bubble time="22:49">Phúc, anh mượn xe đi mua đồ ăn khuya. Chìa móc ở bảng hả?</Bubble>
    <Bubble me time="22:50">Dạ chìa trên bảng đó anh, xe đầu dãy</Bubble>
    <Bubble me time="22:51">Anh mua giùm em ổ bánh mì nha 😁</Bubble>
    <p className="text-center text-[9px] opacity-50">Đã xem 22:51</p>
  </Phone>
)

/** The torn navy jacket, drawn as a photo pinned in the file (used by the reconstruction). */
export const JacketPhoto = () => (
  <div className="rounded-2xl bg-white p-2 shadow-lg">
    <svg viewBox="0 0 200 220" className="block w-full rounded-xl">
      <rect width="200" height="220" fill="#d9d6e6" />
      {/* the navy jacket on its hanger, right cuff torn */}
      <rect x="98" y="10" width="4" height="20" fill="#9aa3b5" />
      <polygon points="60,40 100,28 140,40" fill="none" stroke="#9aa3b5" strokeWidth="4" />
      <Fb x={64} y={40} w={72} h={120} d={14} c="#2f4258" />
      <Fb x={34} y={44} w={30} h={110} d={10} c="#2a3b50" />
      <Fb x={136} y={44} w={30} h={110} d={10} c="#2a3b50" />
      <polygon points="136,148 166,148 160,160 150,154 144,162" fill="#d9d6e6" />
      {[150, 156, 162].map((x) => (
        <rect key={x} x={x} y="150" width="1.5" height="12" fill="#e9eef2" />
      ))}
      <rect x="96" y="44" width="8" height="110" fill="#22324a" />
      <rect x="72" y="60" width="18" height="8" fill="#f2f2ee" />
      <circle cx="154" cy="152" r="22" fill="none" stroke={iso.coral} strokeWidth="3" />
    </svg>
  </div>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, X1, X2, X3, X4, X5, X6, P10 }
