import { Mark, Phone, PlayerSignature, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import type { PortraitSpec } from '@/art/Portrait'
import { iso } from '@/art/iso/iso'
import { Fb, TimeStamp, makeGuest } from '@/art/iso/photo'
import type { CaseData } from '@/game/types'
import caseJson from './case.json'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'


/** Tư's cargo boat seen side-on in blocks, bow to the right: blue hull, red rail, a cabin at the stern. (x, y) is the waterline at the stern; s scales it. */
const BoatFb = ({ x, y, s = 1, cargo = 'none', light = false, dim = false }: { x: number; y: number; s?: number; cargo?: 'rice' | 'tarp' | 'none'; light?: boolean; dim?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={dim ? 0.85 : 1}>
    <polygon points="0,-30 200,-30 240,-40 210,4 10,4" fill="#3f78b0" />
    <rect x="0" y="-36" width="232" height="7" fill={iso.coral} />
    <Fb x={14} y={-80} w={60} h={44} d={20} c="#e9e1cf" />
    <Fb x={8} y={-88} w={74} h={8} d={22} c={iso.blue} />
    <rect x="44" y="-72" width="22" height="16" fill="#3d3446" />
    {light && <Fb x={30} y={-98} w={8} h={8} d={6} c="#7fe0c0" />}
    {cargo === 'rice' && [90, 124, 158, 107, 141].map((bx, i) => <Fb key={i} x={bx} y={i > 2 ? -74 : -56} w={32} h={20} d={16} c="#efe6d4" />)}
    {cargo === 'tarp' && <Fb x={88} y={-70} w={110} h={34} d={20} c="#3c7a8f" />}
  </g>
)

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm hàng hóa trong kho">
    <Row k="Số hợp đồng" v="AT-HH-2024-1102" />
    <Row k="Người được BH" v="Trần Thị Mỹ Lệ" />
    <Row k="Địa điểm" v="Kho số 7, bờ kênh Đôi, P.5, Q.8" />
    <Row k="Hàng hóa" v="Điện thoại di động nguyên hộp" />
    <Row k="Giá trị BH" v="4.500.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Phạm vi: mọi rủi ro, gồm ngập nước do mưa, triều cường.</p>
    <p className="text-[10px] italic">
      Điều 9, loại trừ: <Mark>hàng bị lấy đi mà không có dấu hiệu đột nhập</Mark>, hoặc do nhân viên của người được bảo hiểm chiếm đoạt.
    </p>
    <Signature name="T. T. M. Lệ" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="15/11/2025" />
    <Row k="Sự cố" v="Ngập kho do triều cường đêm 14/11" />
    <Row k="Thiệt hại" v="150 thùng · 1.500 máy" strong />
    <Row k="Số tiền yêu cầu" v="4.500.000.000 đ" strong />
    <p className="pt-1 text-[10px]">
      Số liệu <Mark>theo báo cáo của quản lý kho Võ Đình Khải</Mark>. Tôi không xuống được kho trong đêm vì đường ngập.
    </p>
    <Signature name="T. T. M. Lệ" />
  </Sheet>
)

const P3 = () => {
  const rows = [
    ['22:40', '0,0', 'Nước bắt đầu vào kho'],
    ['00:00', '0,4', ''],
    ['01:30', '0,8', ''],
    ['02:30', '0,9', 'Đỉnh triều'],
    ['04:30', '0,6', ''],
    ['07:30', '0,0', 'Rút hết'],
  ]
  return (
    <Sheet org="UBND Phường 5, Quận 8 · Tổ ứng phó triều cường" title="Mực nước trong kho số 7, đêm 14–15/11">
      <p className="text-[10px]">Đo bằng thước cắm tại cửa cuốn, tính từ mặt sàn kho (m).</p>
      {rows.map(([t, m, n]) => (
        <div key={t} className="grid grid-cols-[3rem_2.5rem_1fr] gap-x-2 border-b border-dotted border-black/20">
          <span>{t}</span>
          <span>{m === '0,9' ? <Mark>{m}</Mark> : m}</span>
          <span className="text-[10px]">{n}</span>
        </div>
      ))}
      <Stamp text="UBND P.5" className="bottom-2 right-3" />
      <div className="h-6" />
    </Sheet>
  )
}

const P4 = () => (
  <Sheet org="Kho Mỹ Lệ" title="Báo cáo sự cố · 15/11 · Võ Đình Khải">
    <p>
      Chiều 14/11 em kê toàn bộ hàng lên các tầng kệ, chất bao cát chặn cửa cuốn. <Mark>Khoảng 22 giờ em về</Mark> vì đường Bình Đông bắt đầu ngập.
    </p>
    <p>
      Sáng 15/11 quay lại thì tầng 1–2 ngập bùn. <Mark>Nước phá cửa sổ phía kênh, cuốn trôi 90 thùng</Mark> ở tầng 3–5 ra kênh.
    </p>
    <p>Tổng thiệt hại: 150 thùng (1.500 máy).</p>
    <Signature name="V. Đ. Khải" />
  </Sheet>
)

/** Shelf diagram with heights. */
const P5 = () => (
  <Sheet org="Kho Mỹ Lệ" title="Sơ đồ kệ kho số 7">
    <svg viewBox="0 0 300 190" className="block w-full">
      <rect width="300" height="190" fill="#f6efe2" />
      <line x1="40" y1="170" x2="280" y2="170" stroke={LINE} strokeWidth="2" />
      <line x1="70" y1="170" x2="70" y2="20" stroke={LINE} strokeWidth="2" />
      <line x1="240" y1="170" x2="240" y2="20" stroke={LINE} strokeWidth="2" />
      {[0.2, 0.6, 1.1, 1.6, 2.1].map((h, i) => {
        const y = 170 - h * 68
        return (
          <g key={h}>
            <line x1="70" y1={y} x2="240" y2={y} stroke={LINE} strokeWidth="3" />
            <text x="62" y={y + 4} textAnchor="end" fontSize="9" fill={LINE} fontFamily={mono}>
              {h.toString().replace('.', ',')} m
            </text>
            <text x="248" y={y + 4} fontSize="9" fill={LINE} fontFamily={mono}>
              T{i + 1}
            </text>
          </g>
        )
      })}
    </svg>
    <p className="text-[10px]">Mỗi tầng 30 thùng × 10 máy = 300 máy. Giá trung bình 3 triệu/máy.</p>
  </Sheet>
)

const P6 = () => (
  <Sheet org="Bảo hiểm An Tín · Giám định hiện trường" title="Biên bản kiểm đếm · 16/11">
    <Row k="Tầng 1–2" v="60 thùng, ngập bùn, hư toàn bộ" strong />
    <Row k="Tầng 3–5" v="Trống, khô, không vết bùn" strong />
    <Row k="Giá trị hàng ngập" v="600 máy · 1.800.000.000 đ" />
    <p className="pt-1 text-[10px]">
      Tổ vớt rác phường 5 xác nhận: hai ngày vớt rác dọc kênh Đôi, <Mark>không thấy thùng điện thoại nào</Mark>, dù thùng bọc nilon nổi trên mặt nước.
    </p>
    <PlayerSignature />
  </Sheet>
)

const P7 = () => (
  <div className="rounded-xl bg-[#2e2a4a] p-2 shadow-[0_6px_16px_rgb(46_42_74/0.35)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#1d2428" />
      <rect y="110" width="320" height="70" fill="#26393a" />
      {/* The warehouse wall across the canal, with the window */}
      <Fb x={40} y={40} w={240} h={80} d={16} c="#4a4740" />
      <rect x="150" y="62" width="40" height="34" fill="#141a20" />
      <BoatFb x={120} y={128} s={0.42} light cargo="tarp" dim />
      <rect width="320" height="180" fill="#9ad0c0" opacity="0.05" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>CAM QUÁN NHẬU BA KHÍA · HƯỚNG KÊNH</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>15/11/2025 02:41:07</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">
      01:52 một ghe máy đèn xanh cập cửa sổ kho số 7. 02:41 rời đi, khoang chất đầy hàng phủ bạt, chạy về hướng kênh Tẻ.
    </p>
  </div>
)

const P8 = () => (
  <Sheet org="Sở Giao thông vận tải · Đăng ký phương tiện thủy" title="Giấy chứng nhận đăng ký SG-4417">
    <Row k="Chủ phương tiện" v="Lê Văn Tư" strong />
    <Row k="Loại" v="Ghe máy chở hàng, 18 tấn" />
    <Row k="Màu sơn" v="Thân xanh dương, viền mạn đỏ" strong />
    <Row k="Bến đăng ký" v="Bến Bình Đông, Q.8" />
    <svg viewBox="0 0 300 90" className="mt-1 block w-full">
      <rect width="300" height="90" fill="#cfd3e6" />
      <rect y="62" width="300" height="28" fill="#86a4b2" />
      <BoatFb x={84} y={66} s={0.55} />
    </svg>
    <Stamp text="Đã đăng ký" className="bottom-2 right-3" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Công ty Phân phối Di động Phương Nam" title="Hóa đơn bán hàng · 12/09/2025">
    <Row k="Khách hàng" v="Trần Thị Mỹ Lệ" />
    <Row k="Hàng" v="500 máy, các dòng phổ thông" />
    <Row k="Thành tiền" v="1.500.000.000 đ" strong />
    <Row k="Giao tới" v="Kho số 7, kênh Đôi, Q.8" />
    <p className="pt-1 text-[10px]">
      Ghi chú: hàng chuẩn bị mùa Tết. Cùng ngày, bà Lệ ký <Mark>phụ lục nâng giá trị bảo hiểm</Mark> cho đúng tổng hàng trong kho.
    </p>
    <Stamp text="Đã thanh toán" className="bottom-2 right-3" />
    <div className="h-12" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Ngân hàng · Trích sao kê theo yêu cầu cơ quan điều tra" title="Tài khoản Võ Đình Khải">
    {[
      ['05/11', 'KHO MY LE · luong T10', '+ 7.000.000'],
      ['17/11', 'PHUNG GIA HUNG · hang', '+ 1.100.000.000'],
      ['18/11', 'LE VAN TU · cong ghe', '− 60.000.000'],
    ].map(([d, n, v]) => (
      <div key={d} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{n.startsWith('KHO') ? n : <Mark>{n}</Mark>}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Phùng Gia Hưng: chủ tiệm Gia Hưng Mobile, đường Nguyễn Kim, Quận 10.</p>
  </Sheet>
)

const P11 = () => (
  <Sheet org="Nhà mạng · Phản hồi yêu cầu của An Tín" title="Tra cứu IMEI lô hàng kho số 7">
    <p className="text-[10px]">Danh sách IMEI 900 máy tầng 3–5, theo phiếu nhập kho.</p>
    <Row k="Đã gắn sim" v="214 máy" strong />
    <Row k="Lần đầu" v="17/11/2025, 09:12" />
    <Row k="Nơi bán ra" v="Gia Hưng Mobile, Q.10" strong />
    <div className="mt-1 grid grid-cols-2 gap-x-2 font-mono text-[9px]">
      {['35884210••• 17/11', '35884210••• 17/11', '35884211••• 18/11', '35884212••• 18/11', '35884215••• 19/11', '…'].map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
    <p className="pt-1 text-[10px]">
      Máy ngập nước ở tầng 1–2: <Mark>chưa máy nào gắn sim</Mark>.
    </p>
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X1 = () => (
  <Phone header="Nhật 🐯">
    <p className="text-center text-[9px] opacity-50">02/11/2025</p>
    <Bubble time="23:41">Má bán cái kho đi, con kẹt 400 triệu rồi</Bubble>
    <Bubble time="23:42">Tụi nó tới nhà là má biết</Bubble>
    <Bubble me time="06:15">Mày cá độ nữa thì đừng về</Bubble>
  </Phone>
)

const X2 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Phụ lục số 01 · HĐ AT-HH-2024-1102">
    <Row k="Ngày ký" v="12/09/2025" strong />
    <Row k="Giá trị BH cũ" v="3.000.000.000 đ" />
    <Row k="Giá trị BH mới" v="4.500.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Lý do: "bổ sung hàng hóa". Phí tăng thêm 9,6 triệu đồng.</p>
    <p className="text-[10px] italic">Hai tháng trước đêm ngập.</p>
    <Signature name="T. T. M. Lệ" />
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

const TimeTag = TimeStamp
const cast = Object.fromEntries((caseJson as CaseData).suspects.map((x) => [x.id, x.portrait])) as Record<string, PortraitSpec>
const Guest = makeGuest(cast)

/** Khải's photo at 23:58: water at the shins, the top three tiers still full. */
const X3 = () => (
  <Phone header="Zalo · Khải kho">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e3cfae" />
        {[26, 286].map((x) => (
          <Fb key={x} x={x} y={10} w={8} h={200} d={10} c={iso.metal} />
        ))}
        {[196, 158, 110, 62, 14].map((y, i) => (
          <g key={y}>
            <Fb x={26} y={y + 14} w={268} h={5} d={14} c="#b0b8c6" />
            {Array.from({ length: 6 }, (_, c) => (
              <Fb key={c} x={34 + c * 43} y={y - 6} w={36} h={20} d={12} c={i < 1 ? '#9c7d5c' : '#d9a86a'} />
            ))}
          </g>
        ))}
        <rect y="186" width="320" height="34" fill="#8c8a6a" opacity="0.85" />
        <rect y="186" width="320" height="3" fill="#cfd3c0" />
        <TimeTag t="14/11 23:58" />
      </svg>
    </div>
    <Bubble time="23:58">Con kê xong rồi cô. Nước mới tới ống quyển, cô yên tâm ngủ đi</Bubble>
    <PhotoMeta when="14/11/2025 · 23:58" where="Kho số 7, Q.8" />
  </Phone>
)

const X4 = () => (
  <Phone header="Story · nhat.tran.93">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#4a4870" />
        {/* the big screen with the match */}
        <Fb x={70} y={20} w={180} h={80} d={12} c="#2e2a4a" />
        <rect x="76" y="26" width="168" height="68" fill="#4f9a6b" />
        <rect x="159" y="26" width="2" height="68" fill="#e8e8e8" />
        <rect x="150" y="52" width="20" height="16" fill="none" stroke="#e8e8e8" strokeWidth="1.5" />
        <rect x="190" y="28" width="52" height="14" rx="3" fill={iso.ink} opacity="0.7" />
        <text x="216" y="38.5" textAnchor="middle" fontSize="9" fill="#fff" fontFamily={mono}>H2 71'</text>
        <Guest x={80} y={170} look={{ hair: 'short', mood: 'smile' }} shirt="#e2a63b" />
        <Guest x={160} y={164} s={1.25} who="nhat" look={{ mood: 'smile' }} />
        <Guest x={240} y={170} look={{ hair: 'buzz', mood: 'smile', skin: 2 }} shirt="#ece2cf" />
        <Fb x={-4} y={196} w={330} h={26} d={22} c="#b9875d" />
        {[40, 120, 210, 280].map((x) => (
          <Fb key={x} x={x} y={180} w={10} h={18} d={6} c="#d9a441" />
        ))}
        <TimeTag t="15/11 01:45" />
      </svg>
    </div>
    <PhotoMeta when="15/11/2025 · 01:45" where="Phú Mỹ Hưng, Q.7" />
    <p className="text-[10px]">"Ngập thì ngập, bóng vẫn phải coi ⚽" · được 4 người gắn thẻ</p>
  </Phone>
)

/** Tư's photo of the boat at the pier, taken early in the evening. */
const X5 = () => (
  <Phone header="Thư viện ảnh · con gái ông Tư">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5b6a9a" />
        <Fb x={0} y={86} w={90} h={44} d={10} c="#7d86ad" />
        <Fb x={100} y={70} w={70} h={60} d={10} c="#6d779f" />
        <Fb x={230} y={80} w={90} h={50} d={10} c="#7d86ad" />
        <rect x="16" y="96" width="10" height="10" fill="#ffe1a0" />
        <rect x="250" y="92" width="10" height="10" fill="#ffe1a0" />
        <rect y="130" width="320" height="90" fill="#6f8fa3" />
        <BoatFb x={44} y={170} s={0.95} cargo="rice" />
        <Fb x={262} y={30} w={18} h={18} d={8} c="#fbf0c8" />
        <TimeTag t="14/11 21:05" />
      </svg>
    </div>
    <PhotoMeta when="14/11/2025 · 21:05" where="Bến Bình Đông, Q.8" />
    <p className="text-[10px]">"Ba ngủ ghe nha, nước lớn đừng chạy."</p>
  </Phone>
)

const X6 = () => (
  <Sheet org="UBND phường 4 · Tổ cứu hộ" title="Nhật ký ghe cứu hộ đêm 14/11">
    <Row k="Phương tiện" v="Ghe composite, sơn cam, đèn xanh nháy" />
    {[
      ['23:10', 'Đưa 2 hộ dân hẻm 62 lên điểm cao'],
      ['01:30', 'Bắt đầu tuần tra kênh Đôi'],
      ['02:15', 'Hỗ trợ kéo xuồng chìm gần cầu Nhị Thiên Đường'],
      ['03:00', 'Về trạm'],
    ].map(([t, v]) => (
      <div key={t} className="flex gap-3 border-b border-dotted border-black/20">
        <span className="font-bold">{t}</span>
        <span>{v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Không ghi nhận việc cập kho hay chở hàng cho tư nhân.</p>
    <Signature name="Tổ trưởng N. V. Bé" />
  </Sheet>
)

const X7 = () => (
  <Phone header="Nhóm Chợ Điện Thoại Sài Gòn">
    <p className="text-center text-[9px] opacity-50">20/11/2025 · 14:02</p>
    <div className="rounded bg-white p-2">
      <p className="font-semibold">Trần Minh Nhật</p>
      <p>Thanh lý 30 máy iPhone mới nguyên seal, rẻ hơn tiệm 15%. Lấy số lượng có giá tốt, inbox.</p>
      <p className="text-[10px] opacity-60">12 bình luận · "Hàng gì mà rẻ vậy bạn?"</p>
    </div>
    <p className="text-[10px] opacity-60">Khu vực: Quận 7 · Giao tận nơi</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7 }
