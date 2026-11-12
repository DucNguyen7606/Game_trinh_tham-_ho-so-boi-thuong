import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { Poncho, Ring, ShopFront } from './scenes'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm tài sản tiệm vàng">
    <Row k="Số hợp đồng" v="AT-TS-2025-0417" />
    <Row k="Người được BH" v="Huỳnh Thị Kim Loan" />
    <Row k="Địa điểm" v="Tiệm vàng Kim Thành, Quang Trung, P.10, Gò Vấp" />
    <Row k="Tài sản" v="Vàng, trang sức trong tủ kính và két sắt" />
    <Row k="Giá trị BH" v="7.000.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Phạm vi: cướp, trộm có dấu hiệu đột nhập.</p>
    <p className="text-[10px] italic">
      Điều 8, loại trừ: tổn thất do <Mark>hành vi cố ý của người được bảo hiểm hoặc người thân</Mark>; tài sản không có thật tại thời điểm tổn thất.
    </p>
    <Signature name="H. T. K. Loan" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="03/12/2025" />
    <Row k="Sự cố" v="Cướp tài sản lúc 21:02 ngày 2/12" />
    <Row k="Trong tủ kính" v="30 lượng nhẫn tròn trơn 9999" />
    <Row k="Trong két" v="15 lượng" />
    <Row k="Đơn giá" v="140.000.000 đ/lượng" />
    <Row k="Số tiền yêu cầu" v="6.300.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Kèm biên bản của công an phường 10.</p>
    <Signature name="H. T. K. Loan" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công an Phường 10, Quận Gò Vấp" title="Biên bản khám nghiệm hiện trường">
    <Row k="Nhận tin báo" v="21:19 ngày 02/12/2025" strong />
    <Row k="Có mặt" v="21:31" />
    <p className="pt-1 text-[10px]">Tủ kính giữa bị đập vỡ, khay trưng bày bị lấy đi. Két sắt mở, <Mark>không có dấu vết cạy phá</Mark>.</p>
    <p className="text-[10px]">Cửa sau thông ra hẻm 514: chốt trong đã kéo ra, <Mark>cửa không bị phá</Mark>.</p>
    <p className="text-[10px]">Người báo tin: bà Huỳnh Thị Kim Loan, chủ tiệm. Cổ tay trái trầy nhẹ.</p>
    <Stamp text="CA P.10 Gò Vấp" className="bottom-2 right-3" />
    <div className="h-6" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Công an Phường 10 · Biên bản ghi lời khai" title="Huỳnh Thị Kim Loan · 02/12, 22:10">
    <p>
      Khoảng 21 giờ tôi kéo cửa cuốn. Mới xuống được một nửa thì <Mark>21:02 hai thanh niên chui vào cửa cuốn phía trước</Mark>, đội nón bảo hiểm trùm kín, mặc áo mưa đen.
    </p>
    <p>
      <Mark>Trong tiệm chỉ có mình tôi.</Mark> Cửa sau tôi chốt từ chiều. Một tên kề dao vào cổ, <Mark>bắt tôi mở két</Mark>. Tên kia đập tủ kính lấy khay vàng.
    </p>
    <p>Chúng chạy ra cửa trước. Tôi hoảng quá, ngồi một hồi mới gọi được công an.</p>
    <Signature name="H. T. K. Loan" />
  </Sheet>
)

const P5 = () => {
  const rows = [
    ['19:00', '0', ''],
    ['19:30', '18', 'Bắt đầu mưa to'],
    ['20:30', '24', ''],
    ['21:00', '27', ''],
    ['22:00', '15', ''],
    ['22:40', '2', 'Ngớt mưa'],
  ]
  return (
    <Sheet org="Đài Khí tượng Nam Bộ · Trạm đo mưa Gò Vấp" title="Lượng mưa từng giờ, tối 02/12/2025">
      <p className="text-[10px]">Đơn vị: mm/giờ.</p>
      {rows.map(([t, m, n]) => (
        <div key={t} className="grid grid-cols-[3rem_2.5rem_1fr] gap-x-2 border-b border-dotted border-black/20">
          <span>{t}</span>
          <span>{t === '21:00' ? <Mark>{m}</Mark> : m}</span>
          <span className="text-[10px]">{n}</span>
        </div>
      ))}
      <p className="pt-1 text-[10px]">Mưa to liên tục, đường Quang Trung ngập nhẹ ở lề.</p>
    </Sheet>
  )
}

/** A still from the pharmacy camera at 21:05. */
const P6 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#2a3036" />
      <g transform="translate(-158 -26) scale(0.3)">
        <ShopFront shutter={0.5} night />
      </g>
      <rect y="152" width="320" height="28" fill="#202326" />
      <Poncho x={250} y={168} h={70} bag />
      <Poncho x={276} y={170} h={66} />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={(i * 37) % 320} y1={(i * 23) % 160} x2={(i * 37) % 320 - 3} y2={((i * 23) % 160) + 10} stroke="#cfe0e8" strokeWidth="1" opacity="0.4" />
      ))}
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>CAM NHÀ THUỐC NGỌC THẢO · CH1</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>02/12/2025 21:05:12</text>
    </svg>
    <div className="space-y-0.5 px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">
      <p>20:55 một xe máy hai người, đèn hậu đỏ, chạy vào hẻm 514.</p>
      <p>20:58 cửa cuốn tiệm Kim Thành kéo xuống còn một nửa.</p>
      <p>
        <Mark>20:58 → 21:05 không ai vào cửa trước.</Mark>
      </p>
      <p>21:05 hai người áo mưa đen chui ra dưới cửa cuốn, rẽ vào hẻm 514.</p>
      <p>21:07 xe máy chạy ra khỏi hẻm, đèn hậu tắt. 21:18 bà Loan bước ra cửa.</p>
    </div>
  </div>
)

const P7 = () => (
  <Sheet org="Hãng két Hòa Bình · Trích xuất bộ nhớ theo yêu cầu" title="Két điện tử HB-80 · Tiệm Kim Thành">
    {[
      ['02/12 08:02', 'MỞ', 'Mã chủ (1)'],
      ['02/12 08:05', 'ĐÓNG', ''],
      ['02/12 20:41', 'MỞ', 'Mã chủ (1)'],
      ['02/12 21:31', '—', 'Két đang mở'],
    ].map(([t, a, n]) => (
      <div key={t} className="grid grid-cols-[6.5rem_3rem_1fr] gap-x-2 border-b border-dotted border-black/20">
        <span>{t === '02/12 20:41' ? <Mark>{t}</Mark> : t}</span>
        <span className="font-bold">{a}</span>
        <span className="text-[10px]">{n}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">
      Từ 20:41 tới khi công an kiểm tra lúc 21:31: <Mark>không có lần đóng hay mở nào khác</Mark>. Mã chủ (1) do chủ tiệm cài đặt.
    </p>
    <Stamp text="Hòa Bình · Bản sao" className="bottom-2 right-3" />
    <div className="h-6" />
  </Sheet>
)

const P8 = () => (
  <Sheet org="Trung tâm Kiểm định Vàng bạc Đá quý" title="Phiếu kết quả giám định · 04/12">
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 80 60" className="w-20 shrink-0">
        <rect width="80" height="60" fill="#f6efe2" />
        <Ring x={40} y={30} r={18} fake />
      </svg>
      <div className="flex-1">
        <Row k="Mẫu" v="Nhẫn tròn trơn, khắc KT 9999" />
        <Row k="Khối lượng" v="2,10 g" />
      </div>
    </div>
    <Row k="Lõi" v="Đồng thau (Cu-Zn)" strong />
    <Row k="Lớp phủ" v="Vàng 24K, dày ~2 µm" />
    <Row k="Hàm lượng Au" v="< 1%" strong />
    <p className="pt-1 text-[10px]">
      Kết luận: <Mark>hàng mạ vàng, không phải vàng 9999</Mark>. Nhẫn vàng 9999 cùng kích thước nặng khoảng 3,75 g.
    </p>
    <Stamp text="Đã kiểm định" className="bottom-2 right-3" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Tiệm vàng Ngọc Phát · Phú Nhuận" title="Phiếu mua lại vàng của khách">
    <Row k="Khách bán" v="Huỳnh Thị Kim Loan" strong />
    <Row k="CCCD" v="079 1710 •••• 52" />
    {[
      ['08/11', '14 lượng nhẫn 9999', '1.932.000.000'],
      ['15/11', '15 lượng nhẫn 9999', '2.085.000.000'],
      ['22/11', '13 lượng nhẫn 9999', '1.794.000.000'],
    ].map(([d, h, v]) => (
      <div key={d} className="grid grid-cols-[3rem_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{h}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
    <Row k="Tổng" v="42 lượng · 5.811.000.000 đ" strong />
    <p className="pt-1 text-[10px] italic">Khách yêu cầu trả tiền mặt, không xuất hóa đơn.</p>
    <Signature name="H. T. K. Loan" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Xưởng mạ Thành Công · Quận 5" title="Phiếu đặt hàng · 12/11/2025">
    <Row k="Khách" v="Tiệm Kim Thành (chị Loan)" />
    <Row k="Hàng" v="Nhẫn tròn trơn 1 chỉ, mạ vàng 24K" />
    <Row k="Số lượng" v="300 chiếc" strong />
    <Row k="Khắc" v='"KT 9999 · 1 chỉ"' strong />
    <Row k="Kèm" v="40 dây chuyền mạ" />
    <Row k="Thành tiền" v="27.500.000 đ" />
    <p className="pt-1 text-[10px]">
      Ghi chú của xưởng: <Mark>khách dặn khắc y chữ tiệm, giao trong tuần</Mark>.
    </p>
    <Stamp text="Đã giao 18/11" className="bottom-2 right-3" />
    <div className="h-6" />
  </Sheet>
)

const P11 = () => (
  <Sheet org="Ngân hàng · Trích sao kê theo yêu cầu cơ quan điều tra" title="Tài khoản Lâm Văn Tài">
    {[
      ['01/12', 'GOXE · thu nhap tuan', '+ 3.400.000'],
      ['05/12', 'HUYNH THI KIM LOAN · cho chau', '+ 150.000.000'],
      ['05/12', 'VAYNHANH · tat toan', '− 52.000.000'],
      ['05/12', 'TIENOI · tat toan', '− 38.000.000'],
      ['05/12', 'CASHGO · tat toan', '− 30.000.000'],
    ].map(([d, n, v], i) => (
      <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{n.startsWith('HUYNH') ? <Mark>{n}</Mark> : n}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Ba ứng dụng cho vay đều ghi "tất toán" trong cùng ngày 5/12.</p>
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X1 = () => (
  <Phone header="Ba Lành tạp hóa">
    <p className="text-center text-[9px] opacity-50">16/11/2025</p>
    <Bubble time="19:20">Bà Loan, hụi bể cả tháng rồi mà bà cứ khất hoài</Bubble>
    <Bubble time="19:21">Không trả hụi thì đừng trách tui cho người tới tiệm</Bubble>
    <Bubble me time="21:02">Chị bình tĩnh, em lo được, chờ em ít bữa</Bubble>
  </Phone>
)

const X2 = () => (
  <Sheet org="Tiệm vàng Kim Thành" title="Quyết định cho thôi việc">
    <Row k="Ngày" v="10/10/2025" strong />
    <Row k="Người lao động" v="Trịnh Quốc Hùng · thợ kim hoàn" />
    <p className="pt-1 text-[10px]">Lý do: làm hao hụt vàng trong quá trình chế tác, gây thiệt hại cho tiệm.</p>
    <p className="text-[10px]">Ông Hùng biết vị trí két và giờ đóng cửa của tiệm.</p>
    <p className="text-[10px] italic">Ô "người lao động ký nhận" bỏ trống.</p>
    <Signature name="H. T. K. Loan" />
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

const TimeTag = ({ t }: { t: string }) => (
  <>
    <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
    <text x="14" y="21" fontSize="11" fill="#fff" fontFamily={mono}>
      {t}
    </text>
  </>
)

const Guest = ({ x, y, s = 1, skin = '#efc39b', hair = '#1a1a1f', shirt }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />
    <circle cx="-5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <circle cx="5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <path d="M-5,-22 Q0,-18 5,-22" fill="none" strokeWidth="1.4" />
  </g>
)

/** Hùng holding his newborn in the maternity ward. */
const X3 = () => (
  <Phone header="Thư viện ảnh · Hùng">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#dfe8e6" />
        <rect x="200" y="30" width="100" height="70" fill="#f6f4ee" stroke={LINE} strokeWidth="2" />
        <text x="250" y="60" textAnchor="middle" fontSize="9" fill="#2f6aa8" fontFamily={mono}>KHOA SẢN</text>
        <text x="250" y="76" textAnchor="middle" fontSize="9" fill="#2f6aa8" fontFamily={mono}>PHÒNG 412</text>
        <rect x="20" y="150" width="200" height="70" fill="#f6f4ee" stroke={LINE} strokeWidth="2" />
        <Guest x={130} y={150} s={1.5} skin="#b9815a" shirt="#b0925c" />
        <ellipse cx="140" cy="182" rx="26" ry="14" fill="#f2c9d0" stroke={LINE} strokeWidth="2" />
        <circle cx="122" cy="178" r="9" fill="#efc39b" stroke={LINE} strokeWidth="1.5" />
        <TimeTag t="02/12 21:03" />
      </svg>
    </div>
    <PhotoMeta when="02/12/2025 · 21:03" where="BV Phụ sản, Q.1" />
    <p className="text-[10px]">"Chào con gái, 3,1 kg 🎉" · 12 bình luận</p>
  </Phone>
)

/** Bà Ba Lành at a death-anniversary meal in Hóc Môn. */
const X4 = () => (
  <Phone header="Zalo · Nhóm gia đình">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#7a4f32" />
        <rect x="110" y="20" width="100" height="70" fill="#5a3a26" stroke={LINE} strokeWidth="2" />
        <rect x="130" y="30" width="60" height="50" fill="#6b6a64" stroke={LINE} strokeWidth="1.5" />
        <Guest x={70} y={160} shirt="#7a9fb0" hair="#7d7a76" skin="#d9a47a" />
        <Guest x={160} y={160} shirt="#ece2cf" />
        <Guest x={250} y={160} shirt="#cf9a32" hair="#4a3426" />
        <rect x="20" y="180" width="280" height="40" fill="#e8dcc4" stroke={LINE} strokeWidth="2" />
        {[60, 120, 180, 240].map((x) => (
          <ellipse key={x} cx={x} cy="194" rx="20" ry="8" fill="#f6efe2" stroke={LINE} strokeWidth="1.5" />
        ))}
        <TimeTag t="02/12 21:00" />
      </svg>
    </div>
    <PhotoMeta when="02/12/2025 · 21:00" where="Xuân Thới Sơn, Hóc Môn" />
    <p className="text-[10px]">"Giỗ ba năm nay đông đủ" · Út Hạnh</p>
  </Phone>
)

/** Tài's GoXe trip history for the evening of 2/12. */
const X5 = () => (
  <Phone header="GoXe Tài xế · Lịch sử chuyến">
    <p className="text-center text-[9px] opacity-50">Thứ Ba, 02/12/2025</p>
    {[
      ['19:12', '19:40', 'Phú Nhuận → Phú Nhuận', '38.000đ'],
      ['19:58', '20:31', 'Phú Nhuận → Gò Vấp', '46.000đ'],
      ['21:48', '22:20', 'Gò Vấp → Tân Bình', '41.000đ'],
    ].map(([a, b, r, v], i) => (
      <div key={a} className={i === 2 ? 'mt-2 rounded border border-black/10 bg-white p-1.5' : 'rounded border border-black/10 bg-white p-1.5'}>
        <p className="flex justify-between font-semibold">
          <span>
            {a} → {i === 1 ? <Mark>{b}</Mark> : b}
          </span>
          <span>{v}</span>
        </p>
        <p className="text-[10px] opacity-70">{r}</p>
        {i === 2 && <p className="text-[10px] opacity-70">Nhận chuyến lúc <Mark>21:48</Mark></p>}
      </div>
    ))}
    <p className="text-center text-[9px] opacity-60">Trạng thái 20:31 → 21:48: tắt nhận chuyến</p>
  </Phone>
)

const X6 = () => (
  <Sheet org="Két sắt điện tử Hòa Phát · Đại lý Gò Vấp" title="Phiếu bảo trì tại nhà khách">
    <Row k="Ngày" v="25/11/2025 · 15:20" strong />
    <Row k="Khách hàng" v="Tiệm vàng Kim Thành" />
    <Row k="Kỹ thuật viên" v="Đinh Văn Phú" />
    <p>Thay pin bàn phím. Khôi phục cài đặt gốc, <Mark>khách hàng tự nhập mã chủ mới</Mark>. KTV quay lưng khi khách nhập mã.</p>
    <p className="text-[10px] italic">Bộ nhớ đóng mở giữ nguyên sau bảo trì.</p>
    <div className="flex justify-between">
      <Signature name="Đ. V. Phú" />
      <Signature name="H. T. K. Loan" />
    </div>
  </Sheet>
)

const X7 = () => (
  <Sheet org="Tiệm vàng Bảo Ngọc · Gò Vấp" title="Hóa đơn bán lẻ">
    <Row k="Ngày" v="04/12/2025 · 10:05" strong />
    <Row k="Khách" v="Trịnh Quốc Hùng" />
    <Row k="Hàng" v="Nhẫn tròn trơn 9999 · 2 lượng" />
    <Row k="Thành tiền" v="280.000.000 đ" strong />
    <Row k="Thanh toán" v="Tiền mặt" />
    <Stamp text="Bảo Ngọc · Đã thu" className="bottom-2 left-3" />
    <div className="h-12" />
  </Sheet>
)

const X8 = () => (
  <Phone header="Ngân hàng số · Sổ tiết kiệm">
    <p className="text-[9px] opacity-60">Chủ sổ: Trịnh Quốc Hùng</p>
    <div className="rounded bg-white p-2">
      <p className="font-semibold">Sổ 12 tháng · mở 15/11/2016</p>
      <p>Gửi góp hằng tháng, 9 năm.</p>
      <p>
        Tất toán: <Mark>01/12/2025</Mark> · 285.400.000 đ
      </p>
    </div>
    <p className="text-[10px]">Hùng: "Tiền để dành chín năm. Mua vàng để dành cho con, đầy tháng con bé."</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8 }

