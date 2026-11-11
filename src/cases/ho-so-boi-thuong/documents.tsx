import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'

// What each document in the case-file envelopes looks like, keyed by clue id.
// Brands are generic on purpose: a ride app, a chat app, a social network.

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Phụ lục hợp đồng số 02">
    <Row k="Hợp đồng gốc" v="AT-HH-2023-0714" />
    <Row k="Bên mua" v="Hộ KD Kho vải Thịnh Phát" />
    <Row k="Đối tượng" v="Hàng hóa lưu kho" />
    <Row k="Số tiền BH cũ" v="1.500.000.000 đ" />
    <Row k="Số tiền BH mới" v="4.000.000.000 đ" strong />
    <Row k="Hiệu lực từ" v="03/06/2025" strong />
    <p className="pt-1">Lý do điều chỉnh: <Mark>"nhập thêm hàng vụ Tết"</Mark>.</p>
    <Signature name="Q. Thịnh" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Kho vải Thịnh Phát" title="Bảng kê hàng hóa tổn thất">
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 font-semibold">
      <span>Mặt hàng</span>
      <span>Cuộn</span>
      <span>Thành tiền</span>
    </div>
    {[
      ['Kate Hàn Quốc', '140', '1.260.000.000'],
      ['Lụa tơ tằm', '62', '1.116.000.000'],
      ['Thun cotton 4c', '128', '768.000.000'],
      ['Jean nhập', '82', '656.000.000'],
    ].map(([a, b, c]) => (
      <div key={a} className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span className="text-right">{b}</span>
        <span className="text-right">{c}</span>
      </div>
    ))}
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 font-bold">
      <span>Tổng</span>
      <span>412</span>
      <span>3.800.000.000</span>
    </div>
    <p className="pt-1 text-[10px] opacity-70">Người lập: Phan Quốc Bảo</p>
  </Sheet>
)

const P3 = () => (
  <Sheet org="Ngân hàng TMCP Phương Nam · CN Bình Tân" title="Thông báo kiểm kê tài sản bảo đảm">
    <p>Kính gửi: Ông Quách Thịnh</p>
    <p>
      Khoản vay số 0912/2023, dư nợ <b>2.100.000.000 đ</b>, đáo hạn 15/8/2025.
    </p>
    <p>
      Ngân hàng sẽ kiểm kê hàng tồn kho tại địa chỉ kho vào <Mark>8h00 ngày 16/07/2025</Mark>.
    </p>
    <p>
      Đề nghị gia hạn của Quý khách ngày 08/7: <b>không chấp thuận</b>.
    </p>
    <Stamp text="Phương Nam · Phòng tín dụng" className="bottom-3 right-4" />
    <div className="h-10" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Đội PCCC & CNCH khu vực" title="Biên bản sơ bộ vụ cháy">
    <Row k="Thời gian báo cháy" v="02:41 ngày 15/07" />
    <Row k="Dập tắt" v="03:55" />
    <Row k="Thiệt hại về người" v="01 ngạt khói nhẹ" />
    <p className="pt-1">
      Nhận định ban đầu: <Mark>nghi do chập điện</Mark> khu văn phòng.
    </p>
    <p className="text-[10px] italic">Chưa loại trừ nguyên nhân khác. Chờ giám định.</p>
    <Stamp text="Đội PCCC · Lưu hồ sơ" className="bottom-2 right-3" />
    <div className="h-8" />
  </Sheet>
)

const P5 = () => (
  <div className="space-y-2">
    <Sheet org="Hợp đồng thuê kho" title="Kho số 7 · KCN Đức Hòa, Long An">
      <Row k="Bên thuê" v="Phan Quốc Bảo" strong />
      <Row k="Thời hạn" v="25/06 – 25/09/2025" />
      <Row k="Giá thuê" v="18.000.000 đ/tháng" />
      <Signature name="P. Q. Bảo" />
    </Sheet>
    <div className="flex gap-2">
      {['28/06', '02/07', '05/07'].map((d) => (
        <div key={d} className="flex-1 bg-[#fbf4e4] p-2 font-mono text-[9px] text-[#2d1f18] shadow" style={{ rotate: d === '02/07' ? '2deg' : '-2deg' }}>
          <p className="font-bold">Phiếu xe tải</p>
          <p>{d} · 5 tấn</p>
          <p>Bình Tân → Đức Hòa</p>
          <p className="italic">Nhận: Bảo</p>
        </div>
      ))}
    </div>
  </div>
)

const P6 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#2a2522" />
      <polygon points="0,180 120,70 200,70 320,180" fill="#3a332e" />
      <rect x="0" y="0" width="120" height="120" fill="#24201d" />
      <rect x="200" y="20" width="120" height="110" fill="#24201d" />
      {/* The motorbike entering the alley */}
      <g transform="translate(140 104)">
        <circle cx="0" cy="22" r="10" fill="#111" />
        <circle cx="46" cy="22" r="10" fill="#111" />
        <polygon points="-4,14 18,0 40,2 52,14 44,22 4,22" fill="#5a5552" />
        <rect x="16" y="-26" width="16" height="26" fill="#4a4542" />
        <circle cx="24" cy="-32" r="7" fill="#4a4542" />
      </g>
      <rect width="320" height="180" fill={ink.fog} opacity="0.08" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily="IBM Plex Mono, monospace">CAM 02 · HẺM</text>
      <text x="312" y="14" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily="IBM Plex Mono, monospace">15/07/2025 01:02:47</text>
      <circle cx="10" cy="170" r="3" fill={accent.red} />
      <text x="18" y="173" fontSize="8" fill="#e8e8e8" fontFamily="IBM Plex Mono, monospace">REC</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">Ra khỏi hẻm: 01:21:13 · biển số bị che</p>
  </div>
)

const P7 = () => (
  <Phone header="Chi tiết chuyến đi">
    <p className="text-[10px] opacity-60">Xe máy · 15/07/2025</p>
    <div className="space-y-1 border-l-2 border-[#3f8a7e] pl-2">
      <p>
        <b>01:34</b> Đón: <Mark>Đầu hẻm 46, đường Tân Kỳ Tân Quý</Mark>
      </p>
      <p>
        <b>01:51</b> Trả: Karaoke Hoàng Gia, Q.6
      </p>
    </div>
    <Row k="Khách" v="Bảo P." />
    <Row k="Cước" v="38.000 đ" strong />
  </Phone>
)

const P8 = () => (
  <div className="space-y-2">
    <Sheet org="Hóa đơn giá trị gia tăng" title="Công ty TNHH Vải Sợi Hưng Long">
      <Row k="Ký hiệu / Số" v="HL/24E · 0000137" />
      <Row k="Hàng hóa" v="Vải kate 1.240 m" />
      <Row k="Tổng thanh toán" v="98.500.000 đ" strong />
      <p className="text-[10px] opacity-70">Một trong 7 hóa đơn, tổng cộng 620.000.000 đ</p>
    </Sheet>
    <div className="bg-[#f6efe2] p-2 font-sans text-[10px] text-[#2d1f18] shadow">
      <p className="font-semibold">Tra cứu mã số thuế 0318xxxx27</p>
      <p>Người đại diện: <Mark>Phan Thị Lựu</Mark></p>
      <p>Địa chỉ: Ấp 3, xã Phước Mỹ Trung, huyện <Mark>Mỏ Cày Bắc</Mark>, Bến Tre</p>
      <p>Trạng thái: đang hoạt động · 0 lao động</p>
    </div>
  </div>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P9 = () => (
  <Phone header="Bảo (cháu)">
    <p className="text-center text-[9px] opacity-50">13/07/2025</p>
    <Bubble me time="22:14">
      Hủy vụ 20. Ngân hàng không dời. Mai 15 kêu xe chở hàng về, kiểm kê cho đàng hoàng.
    </Bubble>
    <Bubble time="22:15">Dạ chú.</Bubble>
    <p className="text-right text-[8px] opacity-50">Đã xem</p>
  </Phone>
)

const P10 = () => (
  <div className="bg-[#1c130f] p-3 font-mono text-[10px] text-[#c4e0c0] shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <p className="text-[#f2a93b]">Ổ cứng WD 1TB · nhận ẩn danh 16/07</p>
    <p className="opacity-70">Thư mục gốc:</p>
    <p>📁 Kho_LongAn/ (12 tệp)</p>
    <p>📁 HopDong_BaoHiem/ (4 tệp)</p>
    <p className="pt-1 opacity-70">Nhật ký hệ thống:</p>
    <p>
      15/07/2025 <span className="bg-[#f2a93b] px-0.5 text-[#1c130f]">03:10:22</span> DELETE /Hung_Long/ (31 tệp)
    </p>
    <p>15/07/2025 03:11:05 EJECT</p>
  </div>
)

const P11 = () => (
  <div className="space-y-2">
    <div className="mx-auto w-64 rounded-md bg-[#d9e4d6] p-3 font-sans text-[10px] text-[#2d1f18] shadow">
      <p className="text-center font-semibold uppercase">Giấy chứng nhận đăng ký xe</p>
      <Row k="Chủ xe" v="Võ Thị Kim Ngân" strong />
      <Row k="Nhãn hiệu" v="Wave Alpha, đỏ" />
      <Row k="Biển số" v="59-X3 418.27" />
    </div>
    <Phone header="Nhóm Mua bán xe cũ Bình Tân">
      <p>
        <b>Kim Ngân</b> · 12/06
      </p>
      <p>Pass Wave đỏ, máy êm, 9tr, ai cần ib.</p>
      <div className="rounded bg-black/5 p-1.5 text-[10px]">
        <p className="opacity-60">Tin nhắn riêng</p>
        <p>
          <Mark>Anh Bảo</Mark>: Mai anh qua lấy, trả tiền mặt nha em. Giấy tờ để từ từ sang tên.
        </p>
      </div>
    </Phone>
  </div>
)

const P12 = () => (
  <Sheet org="Sao kê tài khoản · Nguyễn Văn Rô" title="Từ 10/07 đến 16/07/2025">
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 font-semibold">
      <span>Ngày</span>
      <span>Nội dung</span>
      <span>Số tiền</span>
    </div>
    {[
      ['10/07', 'Lương tháng 6', '+6.500.000'],
      ['12/07', 'Rút ATM', '−2.000.000'],
      ['15/07 09:20', 'PHAN QUOC BAO chu Tu uong ca phe', '+5.000.000'],
    ].map(([a, b, c], i) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{i === 2 ? <Mark>{b}</Mark> : b}</span>
        <span>{c}</span>
      </div>
    ))}
  </Sheet>
)

const P13 = () => (
  <Sheet org="Nhà mạng · trích xuất theo yêu cầu" title="Nhật ký cuộc gọi đêm 14–15/07">
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2 font-semibold">
      <span>Giờ</span>
      <span>Gọi → Nhận</span>
      <span>Dài</span>
      <span>Trạm</span>
    </div>
    {[
      ['02:45', 'Huy → Thịnh', '1:52', 'BTN-04'],
      ['02:51', 'Thịnh → Bảo', '4:07', 'Q06-11'],
    ].map(([a, b, c, d], i) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{b}</span>
        <span>{c}</span>
        <span>{i === 1 ? <Mark>{d}</Mark> : d}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Trạm Q06-11: phường 13, Quận 6 (gần nhà Bảo). Quán karaoke thuộc trạm Q06-03.</p>
  </Sheet>
)

const X1 = () => (
  <Phone header="Trang cá nhân · Kim Ngân">
    <p>
      <b>Kim Ngân</b> · 28/05
    </p>
    <p>Làm 3 năm bị đuổi như đuổi chó vì nói thật. Cái kho đó cháy cho rồi 😤</p>
    <p className="text-[10px] opacity-60">👍 41 · 💬 17</p>
    <div className="rounded bg-[#b23a2e]/15 p-1.5 text-[10px]">
      <p className="font-semibold">🔴 Đang phát trực tiếp</p>
      <p>15/07 · 00:58 → 03:05 · 214 người xem</p>
    </div>
  </Phone>
)

const X2 = () => (
  <Sheet org="Tiệm vật tư Gia Huy" title="Thư đề nghị chuyển nhượng">
    <p>Gửi anh Thịnh,</p>
    <p>
      Tôi xin đề nghị mua lại mảnh đất kho với giá <b>9 tỷ đồng</b>, thanh toán một lần.
    </p>
    <p>Mong anh cân nhắc.</p>
    <Signature name="Gia Huy" />
    <p className="absolute bottom-10 left-5 rotate-[-8deg] text-base font-bold text-[#b23a2e]" style={{ fontFamily: 'Bitter, serif' }}>
      KHÔNG BÁN!
    </p>
  </Sheet>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, X1, X2 }
