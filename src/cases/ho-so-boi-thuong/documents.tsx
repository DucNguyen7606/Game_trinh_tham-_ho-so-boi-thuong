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

// ---------------------------------------------------------------------------
// Photos a suspect shows on their phone during an interview.

const LINE = ink.night
const Guest = ({ x, y, s = 1, skin = '#d9a47a', hair = '#1a1a1f', shirt, bald, hairStyle = 'short' }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; bald?: boolean; hairStyle?: 'short' | 'long' | 'gray' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    {hairStyle === 'long' && <path d="M-14,-50 Q0,-66 14,-50 L18,-14 L-18,-14 Z" fill={hair} />}
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    {!bald && <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />}
    <circle cx="-5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <circle cx="5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <path d="M-5,-22 Q0,-18 5,-22" fill="none" strokeWidth="1.4" />
  </g>
)

const PhotoMeta = ({ when, where }: { when: string; where: string }) => (
  <p className="flex justify-between text-[10px] opacity-70">
    <span>{when}</span>
    <span>📍 {where}</span>
  </p>
)

/** Thịnh's wedding photos in Vũng Tàu: the last one is taken at 01:47, while the fuse is burning in Bình Tân. */
const X3 = () => (
  <Phone header="Thư viện ảnh · Đám cưới bé Tuấn">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#8e2b25" />
        {/* Paper lanterns and string lights over the banquet */}
        <path d="M0,30 Q160,70 320,26" fill="none" stroke="#2d1f18" strokeWidth="1.5" />
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={10 + i * 25} cy={30 + Math.sin((i / 12) * Math.PI) * 18} r="3.5" fill="#ffd98f" />
        ))}
        {[110, 210, 290].map((x) => (
          <g key={x} stroke={LINE} strokeWidth="1.5">
            <ellipse cx={x} cy="66" rx="15" ry="18" fill="#e0402f" />
            <rect x={x - 6} y="44" width="12" height="5" fill={accent.gold} />
          </g>
        ))}
        {/* Window onto the night sea, with the Vũng Tàu lighthouse on the hill */}
        <g stroke={LINE} strokeWidth="1.5">
          <rect x="14" y="84" width="70" height="56" fill="#1d2b44" />
          <path d="M14,122 Q40,108 58,116 T84,112 L84,140 L14,140 Z" fill="#2f3d33" />
          <rect x="52" y="98" width="6" height="16" fill="#efe6d4" />
          <path d="M50,98 h10 l-5,-6 Z" fill="#b23a2e" />
          <path d="M14,132 h70" stroke="#6b85a8" strokeWidth="1" />
        </g>
        <path d="M58,96 L84,88 L84,104 Z" fill="#ffd98f" opacity="0.5" />
        <rect x="120" y="74" width="80" height="46" rx="5" fill="#c23a2c" stroke={accent.gold} strokeWidth="2.5" />
        <text x="160" y="92" textAnchor="middle" fontSize="13" fill={accent.gold} fontFamily="Bitter, serif">Tuấn ♥ Vy</text>
        <text x="160" y="104" textAnchor="middle" fontSize="9" fill="#ffe7b8" fontFamily="Bitter, serif">14 · 07 · 2025</text>
        <text x="160" y="113" textAnchor="middle" fontSize="6.5" fill="#ffe7b8" fontFamily="Bitter, serif">NH HẢI ÂU · VŨNG TÀU</text>
        {/* Couple in the middle, Thịnh raising a glass on the right */}
        <Guest x={132} y={176} shirt="#f6efe2" hairStyle="long" skin="#efc39b" />
        <Guest x={180} y={176} shirt="#2f4258" />
        <Guest x={250} y={180} s={1.1} shirt="#7d2f2a" hair="#9a968f" skin="#d9a47a" />
        <path d="M274,168 L282,140" stroke={LINE} strokeWidth="5" strokeLinecap="round" />
        <path d="M276,132 h14 l-3,14 h-8 Z" fill="#fff6e2" stroke={LINE} strokeWidth="1.5" />
        <path d="M278,140 h10 l-1,6 h-8 Z" fill={accent.amber} />
        {/* The gold watch he never takes off */}
        <rect x="272" y="152" width="13" height="8" rx="2" fill={accent.gold} stroke={LINE} strokeWidth="1.2" transform="rotate(-70 278 156)" />
        <circle cx="278" cy="156" r="2" fill="#fff6e2" stroke={LINE} strokeWidth="0.8" />
        <Guest x={62} y={186} s={0.95} shirt="#cf9a32" hairStyle="long" />
        {/* Banquet table */}
        <rect x="0" y="190" width="320" height="30" fill="#f3e4c4" stroke={LINE} strokeWidth="1.5" />
        {[40, 110, 200, 290].map((x) => (
          <ellipse key={x} cx={x} cy="196" rx="16" ry="4" fill="#e0d2b4" stroke={LINE} strokeWidth="1" />
        ))}
        <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
        <text x="14" y="21" fontSize="11" fill="#fff" fontFamily="IBM Plex Mono, monospace">15/07 01:47</text>
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 01:47" where="Nhà hàng Hải Âu, Vũng Tàu" />
    <div className="grid grid-cols-3 gap-1">
      {[
        ['23:52', '#c23a2c'],
        ['00:41', '#8e2b25'],
        ['01:47', '#b0583a'],
      ].map(([t, c]) => (
        <div key={t} className="relative h-10 rounded-sm" style={{ background: c }}>
          <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white/90">{t}</span>
        </div>
      ))}
    </div>
    <p className="text-[10px]">
      Ảnh cuối chụp lúc <Mark>01:47</Mark>, cách kho Bình Tân khoảng 2 giờ xe.
    </p>
  </Phone>
)

/** Bảo's karaoke selfie: he really is there from 02:10, but only after the fuse was set. */
const X4 = () => (
  <Phone header="Ảnh Bảo gửi trong nhóm chat" dark>
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2a1d3a" />
        <circle cx="70" cy="40" r="60" fill="#b04fa0" opacity="0.35" />
        <circle cx="270" cy="60" r="70" fill="#3f8a7e" opacity="0.35" />
        {/* Lyrics screen */}
        <rect x="170" y="30" width="130" height="80" rx="6" fill="#141020" stroke={LINE} strokeWidth="2" />
        <rect x="182" y="70" width="104" height="8" rx="3" fill="#f2a93b" />
        <rect x="190" y="84" width="88" height="6" rx="3" fill="#e8dcc4" opacity="0.7" />
        <Guest x={70} y={180} s={1.05} shirt="#3a332f" />
        <Guest x={250} y={186} s={0.95} shirt="#7a9fb0" hairStyle="long" />
        {/* Bảo in his white shirt and glasses, with a microphone */}
        <Guest x={160} y={176} s={1.25} shirt="#ece2cf" />
        <g fill="none" stroke={LINE} strokeWidth="1.6">
          <rect x="146" y="134" width="12" height="9" rx="2" />
          <rect x="162" y="134" width="12" height="9" rx="2" />
        </g>
        <path d="M184,170 L196,146" stroke={LINE} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="198" cy="142" rx="6" ry="8" fill="#2b2b2b" stroke={LINE} strokeWidth="1.5" />
        {/* Shirt cuff with a black smudge, like soot */}
        <rect x="178" y="164" width="12" height="9" rx="2" fill="#ece2cf" stroke={LINE} strokeWidth="1.4" transform="rotate(-62 184 168)" />
        <ellipse cx="185" cy="168" rx="4" ry="2.6" fill="#2a2420" opacity="0.8" />
        <rect x="0" y="196" width="320" height="24" fill="#3a2a4a" />
        {/* Table: room slip, a key ring tagged KHO, a coil box poking out of his bag */}
        <g stroke={LINE} strokeWidth="1.2">
          <rect x="22" y="199" width="54" height="18" fill="#f6efe2" transform="rotate(-4 49 208)" />
          <circle cx="132" cy="208" r="5" fill="none" stroke="#c9b27a" strokeWidth="1.6" />
          <path d="M136,206 l12,-4 l1,3 l-3,1 l1,2 l-2,1 l-1,-2 l-7,2 Z" fill="#c9b27a" />
          <rect x="112" y="204" width="20" height="12" rx="1.5" fill="#d8573f" />
          <path d="M236,220 L240,196 Q262,190 290,198 L292,220 Z" fill="#46403a" />
          <rect x="252" y="190" width="26" height="14" fill="#2f7a4f" transform="rotate(-8 265 197)" />
        </g>
        <text x="49" y="207" textAnchor="middle" fontSize="6" fill="#2d1f18" fontFamily="IBM Plex Mono, monospace" transform="rotate(-4 49 208)">PHÒNG 07</text>
        <text x="49" y="214" textAnchor="middle" fontSize="6" fill="#2d1f18" fontFamily="IBM Plex Mono, monospace" transform="rotate(-4 49 208)">VÀO 02:05</text>
        <text x="122" y="213" textAnchor="middle" fontSize="7.5" fill="#fff" fontFamily="IBM Plex Mono, monospace">KHO</text>
        <g transform="rotate(-8 265 197)">
          <circle cx="259" cy="197" r="4" fill="none" stroke="#f2e6b8" strokeWidth="1" />
          <circle cx="259" cy="197" r="2" fill="none" stroke="#f2e6b8" strokeWidth="0.8" />
          <text x="270" y="199" fontSize="5" fill="#f2e6b8" fontFamily="IBM Plex Mono, monospace">NHANG</text>
        </g>
        <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
        <text x="14" y="21" fontSize="11" fill="#fff" fontFamily="IBM Plex Mono, monospace">15/07 02:10</text>
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 02:10" where="Karaoke Hoàng Gia, Q.6" />
    <p className="text-[10px]">
      "Quẩy tới sáng nha mấy ông 🎤" · gửi lúc <Mark><span className="text-[#1c130f]">02:11</span></Mark>
    </p>
  </Phone>
)

/** Ngân's livestream screenshot: the wall clock and the comments pin her at home, and mention the red Wave sold to Bảo. */
const X5 = () => (
  <Phone header="Ảnh chụp màn hình · Live Kim Ngân" dark>
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e7d2bf" />
        <rect x="0" y="150" width="320" height="70" fill="#c9ab8e" />
        {/* Clothes rack, ring light and the wall clock behind her */}
        <path d="M20,40 H120" stroke={LINE} strokeWidth="3" />
        {[30, 52, 74, 96].map((x, i) => (
          <path key={x} d={`M${x},40 l-9,14 v40 h18 v-40 Z`} fill={['#cf9a32', '#7a9fb0', '#b23a2e', '#f6efe2'][i]} stroke={LINE} strokeWidth="1.4" />
        ))}
        <circle cx="270" cy="70" r="32" fill="none" stroke="#fff8e8" strokeWidth="8" />
        <g stroke={LINE} strokeWidth="1.6">
          <circle cx="200" cy="40" r="18" fill="#fff8e8" />
          <path d="M200,40 L200,28 M200,40 L206,38" strokeLinecap="round" />
        </g>
        <text x="200" y="68" textAnchor="middle" fontSize="7" fill="#2d1f18" fontFamily="IBM Plex Mono, monospace">01:10</text>
        <Guest x={160} y={168} s={1.3} shirt="#cf9a32" hairStyle="long" />
        {/* Holding up a blouse to the camera */}
        <path d="M120,150 l-14,22 v30 h40 v-30 l-10,-22 Z" fill="#f2a7a0" stroke={LINE} strokeWidth="1.4" />
        <rect x="8" y="8" width="58" height="16" rx="3" fill="#d23a2e" />
        <text x="37" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="IBM Plex Mono, monospace">● LIVE</text>
        <rect x="72" y="8" width="66" height="16" rx="3" fill="#000" opacity="0.45" />
        <text x="105" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="IBM Plex Mono, monospace">👁 214</text>
      </svg>
    </div>
    <div className="space-y-0.5 rounded bg-white/10 p-1.5 text-[10px]">
      <p><b>thuha.98</b>: chị ơi cái áo hồng còn size M hông</p>
      <p><b>minhkhoa</b>: chiếc Wave đỏ chị pass hồi tháng 6 còn hông 😆</p>
      <p><b>Kim Ngân</b>: bán cho anh Bảo ở kho cũ rồi nha, giấy tờ chưa sang tên nè</p>
    </div>
    <PhotoMeta when="15/07/2025 · 01:10" where="Phòng trọ, Bình Tân" />
  </Phone>
)

/** Huy's photo of the fire from his upstairs window at 02:40. */
const X6 = () => (
  <Phone header="Thư viện ảnh · Gia Huy">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#141a2a" />
        {/* Smoke column rising from the office corner on the left */}
        <path d="M70,110 Q40,60 80,30 Q110,0 90,-10 L150,-10 Q130,30 120,60 Q110,90 110,110 Z" fill="#4a4648" opacity="0.8" />
        {/* Warehouse: every window dark, the fire only at the office corner */}
        <rect x="40" y="96" width="220" height="90" fill="#2a2f3a" stroke={LINE} strokeWidth="2" />
        <path d="M30,98 L150,64 L270,98 Z" fill="#363c48" stroke={LINE} strokeWidth="2" />
        {[120, 160, 200, 240].map((x) => (
          <rect key={x} x={x - 10} y="112" width="20" height="16" fill="#0d111b" stroke={LINE} strokeWidth="1.2" />
        ))}
        <rect x="56" y="110" width="34" height="26" fill="#ff8a3a" stroke={LINE} strokeWidth="1.2" />
        <path d="M58,136 Q66,112 74,124 Q80,106 88,136 Z" fill="#ffd26a" />
        <text x="73" y="148" textAnchor="middle" fontSize="7" fill="#e8dcc4" fontFamily="IBM Plex Mono, monospace">VĂN PHÒNG</text>
        {/* Front gate, padlock still hanging closed */}
        <rect x="132" y="146" width="60" height="40" fill="#3a404c" stroke={LINE} strokeWidth="1.6" />
        <path d="M162,146 V186" stroke={LINE} strokeWidth="1.4" />
        <path d="M158,160 a4,4 0 0 1 8,0" fill="none" stroke="#c9b27a" strokeWidth="1.6" />
        <rect x="156" y="160" width="12" height="9" rx="1.5" fill="#c9b27a" stroke={LINE} strokeWidth="1" />
        {/* Guard hut: light on, the guard slumped over the table, a bottle beside him */}
        <rect x="216" y="150" width="50" height="36" fill="#f2c46b" stroke={LINE} strokeWidth="1.6" />
        <path d="M212,150 h58 l-6,-10 h-46 Z" fill="#5b3f2e" stroke={LINE} strokeWidth="1.4" />
        <ellipse cx="236" cy="172" rx="10" ry="6" fill="#6b5a4a" />
        <circle cx="228" cy="168" r="5" fill="#9a968f" />
        <rect x="252" y="160" width="5" height="14" rx="1" fill="#3f6b3a" stroke={LINE} strokeWidth="0.8" />
        <rect x="0" y="186" width="320" height="34" fill="#232838" />
        <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
        <text x="14" y="21" fontSize="11" fill="#fff" fontFamily="IBM Plex Mono, monospace">15/07 02:40</text>
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 02:40" where="Gác tiệm Gia Huy" />
    <p className="text-[10px]">Chụp từ cửa sổ lầu, 5 phút trước khi gọi ông Thịnh.</p>
  </Phone>
)

/** Old electrical inspection: makes a short circuit sound likely, until you see the main breaker was off. */
const X7 = () => (
  <Sheet org="Đội PCCC quận Bình Tân" title="Biên bản kiểm tra an toàn PCCC">
    <Row k="Cơ sở" v="Kho vải Thịnh Phát" />
    <Row k="Ngày kiểm tra" v="18/09/2024" />
    <p>1. Bình chữa cháy: đủ, còn hạn.</p>
    <p>
      2. Hệ thống điện: <Mark>dây dẫn khu văn phòng xuống cấp</Mark>, vỏ bọc nứt. Đề nghị thay trước 31/12/2024.
    </p>
    <p>3. Lối thoát hiểm: thông thoáng.</p>
    <p className="pt-1 text-[10px] opacity-70">Hồ sơ không kèm biên bản khắc phục mục 2.</p>
    <Signature name="Đ. Văn Khoa" />
  </Sheet>
)

/** Huy's credit book: the warehouse buys petrol from him for its generator. */
const X8 = () => (
  <Phone header="Thư viện ảnh · Gia Huy">
    <div className="rounded-md bg-[#efe3c8] p-2 font-mono text-[10px] text-[#2d1f18]">
      <p className="mb-1 text-center font-semibold">SỔ BÁN CHỊU · THÁNG 7</p>
      {[
        ['02/7', 'Xi măng 2 bao', 'Út Mập'],
        ['05/7', 'Xăng 5L + can', 'Kho T.Phát (chú Tư)'],
        ['09/7', 'Ốc vít, keo', 'Chị Bảy'],
        ['12/7', 'Xăng 5L + can', 'Kho T.Phát (Bảo)'],
        ['13/7', 'Bóng đèn 40W', 'Kho T.Phát (chú Tư)'],
      ].map(([a, b, c]) => (
        <div key={a + b} className="grid grid-cols-[34px_1fr_auto] gap-1 border-b border-dotted border-black/25">
          <span>{a}</span>
          <span>{b}</span>
          <span>{c}</span>
        </div>
      ))}
      <p className="pt-1 text-[9px] opacity-70">Kho xài máy phát lúc cúp điện, tháng nào cũng mua.</p>
    </div>
    <PhotoMeta when="16/07/2025 · 10:05" where="Tiệm vật tư Gia Huy" />
  </Phone>
)

/** Thịnh pawned his house papers three days before the fire: a motive, not proof. */
const X9 = () => (
  <Sheet org="Hiệu cầm đồ Phát Đạt · Quận 6" title="Biên nhận cầm đồ">
    <Row k="Người cầm" v="Quách Thịnh" />
    <Row k="Tài sản" v="Sổ đỏ nhà số 41 đường Bình Phú" />
    <Row k="Số tiền" v="300.000.000 đ" strong />
    <Row k="Ngày cầm" v="11/07/2025" />
    <Row k="Lãi" v="3.000 đ / 1 triệu / ngày" />
    <p className="pt-1">Ghi chú: <Mark>"trả lương công nhân + tiền hàng"</Mark>.</p>
    <Signature name="Q. Thịnh" />
  </Sheet>
)

/** Ngân's complaint about fake workers on the payroll. It was returned for lack of proof. */
const X10 = () => (
  <Sheet org="Phòng Lao động · Thương binh và Xã hội quận Bình Tân" title="Đơn khiếu nại">
    <p>Người làm đơn: Võ Thị Kim Ngân, công nhân Kho vải Thịnh Phát.</p>
    <p>
      Nội dung: kế toán Phan Quốc Bảo <Mark>ghi thêm 6 người không có thật</Mark> vào bảng chấm công từ tháng 1, lĩnh lương thay. Tôi phản ánh với chủ kho thì bị cho nghỉ việc ngày 20/5.
    </p>
    <p className="pt-1 text-[10px] opacity-70">Bút phê: "Trả đơn. Người khiếu nại chưa cung cấp được bảng lương gốc."</p>
    <Stamp text="Đã trả đơn · 06/2025" className="bottom-3 right-6" />
  </Sheet>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 }
