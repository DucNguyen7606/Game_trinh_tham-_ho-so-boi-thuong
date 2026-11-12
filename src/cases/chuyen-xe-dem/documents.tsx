import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'

// What each document in the case-file envelopes looks like, keyed by clue id.
// Brands are generic on purpose: a toll operator, a bank, a chat app.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm hàng hóa vận chuyển">
    <Row k="Số hợp đồng" v="AT-HH-2025-1028" />
    <Row k="Người được BH" v="Cty TNHH Tiêu Đất Đỏ" />
    <Row k="Hàng hóa" v="Tiêu đen, 20 tấn (400 bao)" />
    <Row k="Hành trình" v="Buôn Ma Thuột → cảng Cát Lái" />
    <Row k="Số tiền BH" v="3.040.000.000 đ" strong />
    <Row k="Đơn giá khai báo" v="152.000 đ/kg" />
    <Row k="Ngày ký" v="28/10/2025" strong />
    <Row k="Kênh khai thác" v="Đại lý, do nhà xe Kiều Phát giới thiệu" />
    <p className="pt-1 text-[10px] italic">
      Ghi chú của phòng khai thác: <Mark>khách hàng lần đầu mua bảo hiểm cho chuyến nội địa</Mark>, các chuyến trước đều tự chịu rủi ro.
    </p>
    <p className="text-[10px] italic">Điều 11: Không bồi thường nếu tổn thất do hành vi cố ý hoặc gian lận của người được bảo hiểm.</p>
    <Signature name="N. H. Tài" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Công an huyện Hàm Thuận Nam" title="Biên bản tiếp nhận tin báo">
    <Row k="Tiếp nhận" v="04:25 · 03/11/2025" />
    <p>
      04:10, anh xe ôm Lê Văn Tỷ phát hiện <Mark>Hồ Văn Đạt</Mark> bị trói bằng băng keo bên lề QL1A, cách Phan Thiết 18 km.
    </p>
    <p>
      Lời khai: <Mark>02:40</Mark> một xe 7 chỗ không biển số tạt đầu, anh phanh gấp. Ba người bịt mặt cầm dao trói anh, lái container đi về hướng Nam.
    </p>
    <p>
      06:30: xe 47H-••• được tìm thấy trên đường đất xã Tân Thắng, Hàm Tân, <Mark>container trống, chì bị cắt</Mark>.
    </p>
    <Stamp text="CA huyện H.T.Nam" className="bottom-2 right-3" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Cty TNHH Tiêu Đất Đỏ" title="Biên bản đóng hàng và niêm phong">
    <Row k="Thời gian" v="02/11/2025 · 15:20" />
    <Row k="Xe" v="47H-••• (nhà xe Kiều Phát)" />
    <Row k="Hàng" v="400 bao × 50 kg = 20.000 kg" strong />
    <Row k="Mã lô in trên bao" v="DD-1102" strong />
    <Row k="Số chì niêm phong" v="AT-55120" strong />
    <Row k="Cân xuất kho" v="34,5 tấn" />
    <div className="flex justify-between gap-4">
      <Signature name="Thủ kho" />
      <Signature name="H. V. Đạt" />
    </div>
  </Sheet>
)

/** The truck's GPS log: a silent hour near Phan Rí, starting and ending at the same spot. */
const P4 = () => (
  <Sheet org="Hệ thống giám sát hành trình · Kiều Phát" title="Dữ liệu hành trình xe 47H-•••">
    {[
      ['21:40', 'Phan Rang', '54 km/h'],
      ['22:28', 'Cà Ná, dừng 25 phút', '0'],
      ['23:05', 'Trạm thu phí Cà Ná', '38 km/h'],
      ['23:52', 'QL1A gần Phan Rí · MẤT TÍN HIỆU', ''],
      ['01:04', 'Có tín hiệu lại, cùng vị trí', '0'],
      ['01:58', 'Trạm thu phí Sông Lũy', '42 km/h'],
      ['02:38', 'Hàm Thuận Nam, dừng', '0'],
      ['02:51', 'Mất tín hiệu', ''],
    ].map(([t, where, v]) => (
      <div key={t} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>{where.includes('Phan Rí') || where.includes('cùng vị trí') ? <Mark>{where}</Mark> : where}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
    <svg viewBox="0 0 260 70" className="mt-1 block w-full">
      <rect width="260" height="70" fill="#efe6cf" />
      <path d="M10,10 Q80,20 130,30 T250,60" stroke="#6b85a8" strokeWidth="4" fill="none" />
      <text x="8" y="22" fontSize="7" fill={LINE} fontFamily={mono}>Cà Ná</text>
      <circle cx="105" cy="26" r="4" fill={accent.red} />
      <text x="88" y="44" fontSize="7" fill={LINE} fontFamily={mono}>Phan Rí</text>
      <text x="150" y="30" fontSize="7" fill={LINE} fontFamily={mono}>Sông Lũy</text>
      <text x="206" y="66" fontSize="7" fill={LINE} fontFamily={mono}>H.T.Nam</text>
    </svg>
  </Sheet>
)

/** Axle-weight records at two toll stations: 20 tonnes gone in between. */
const P5 = () => (
  <Sheet org="Hệ thống kiểm tra tải trọng xe · QL1A" title="Phiếu cân tự động">
    <Row k="Biển số" v="47H-••• (đầu kéo + rơ moóc)" />
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 pt-1 font-semibold">
      <span>Trạm</span>
      <span>Giờ</span>
      <span>Tổng tải</span>
    </div>
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
      <span>Cà Ná</span>
      <span>23:05</span>
      <span className="text-right font-bold">34,6 tấn</span>
    </div>
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
      <span>Sông Lũy</span>
      <span>01:58</span>
      <span className="text-right font-bold">
        <Mark>14,5 tấn</Mark>
      </span>
    </div>
    <p className="pt-1 text-[10px]">Tự trọng xe đầu kéo + rơ moóc + vỏ container 40 feet (đăng kiểm): 14,4 tấn.</p>
  </Sheet>
)

const P6 = () => (
  <Sheet org="Sales contract · Hợp đồng mua bán" title="Hợp đồng xuất khẩu số DD-EX-0215">
    <Row k="Bên bán" v="Cty TNHH Tiêu Đất Đỏ" />
    <Row k="Bên mua" v="Nhà nhập khẩu gia vị (Đức)" />
    <Row k="Ngày ký" v="15/02/2025" />
    <Row k="Hàng" v="20 tấn tiêu đen 500g/l" />
    <Row k="Giá quy đổi" v="98.000 đ/kg" strong />
    <Row k="Hạn giao" v="Trước 15/11/2025" strong />
    <p className="pt-1">Giao trễ: phạt 2% giá trị hợp đồng mỗi ngày.</p>
    <p>
      Điều 9: Bên bán được miễn trách nếu <Mark>hàng bị mất trong vận chuyển có xác nhận của cơ quan công an</Mark>.
    </p>
    <p className="pt-1 text-right text-[12px] italic text-[#9e2b22]" style={{ fontFamily: 'Bitter, serif', rotate: '-3deg' }}>
      152 − 98 = 54k × 20t = lỗ 1,08 tỷ!!
    </p>
  </Sheet>
)

const P7 = () => (
  <Sheet org="Đơn vị thu phí không dừng · Trích xuất theo yêu cầu" title="Lịch sử qua trạm xe 47C-218.••">
    <p className="text-[10px]">Chủ phương tiện: <Mark>Hộ kinh doanh vận tải Kiều Phát (Đoàn Thị Kiều)</Mark>. Loại xe: bán tải, màu trắng.</p>
    {[
      ['02/11 18:21', 'QL26 · Km 45', 'hướng Ninh Hòa'],
      ['02/11 23:31', 'Trạm Cà Ná', 'hướng Nam'],
      ['03/11 03:22', 'Trạm Cà Ná', 'hướng Bắc'],
      ['03/11 07:48', 'QL26 · Km 45', 'hướng BMT'],
    ].map(([t, st, dir]) => (
      <div key={t} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>{st.includes('Cà Ná') ? <Mark>{st}</Mark> : st}</span>
        <span className="text-right">{dir}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Tài khoản thu phí trừ tiền tự động, không ghi nhận người lái.</p>
  </Sheet>
)

const P8 = () => (
  <Sheet org="Trung tâm Y tế huyện Hàm Thuận Nam" title="Phiếu khám thương tích">
    <Row k="Người khám" v="Hồ Văn Đạt, 41 tuổi" />
    <Row k="Thời gian" v="05:15 · 03/11/2025" />
    <p>
      Cổ tay hai bên: <Mark>không hằn, không trầy xước</Mark>. Băng keo được gỡ khi đến, theo lời kể <Mark>quấn bên ngoài tay áo khoác</Mark>.
    </p>
    <p>Vùng cổ: không vết cắt, không vết đè. Không thương tích khác.</p>
    <p>Nồng độ cồn: 0. Tỉnh táo, mạch 76 lần/phút.</p>
    <Stamp text="TTYT · H.T.Nam" className="bottom-2 right-3" />
  </Sheet>
)

const P9 = () => (
  <div className="space-y-2">
    <Sheet title="Giấy cho thuê kho">
      <Row k="Bên cho thuê" v="Mạc Văn Hiếu" />
      <Row k="Bên thuê" v="Lê Văn Hùng · 0905 ••• 662" />
      <Row k="Kho" v="Kho cũ thôn Bình Thạnh, Phan Rí" />
      <Row k="Thời hạn" v="02/11 → 05/11/2025" strong />
      <p className="text-[10px] italic">CCCD photo mờ, không đọc được số.</p>
    </Sheet>
    <Phone header="Ngân hàng · Biến động số dư">
      <p className="rounded bg-white p-2">
        +15.000.000đ từ <Mark>TRAN THI MAI</Mark>
        <br />
        ND: coc kho PR
        <br />
        <span className="text-[9px] opacity-60">31/10/2025 16:02</span>
      </p>
      <p className="text-[10px] opacity-70">Trần Thị Mai: kế toán nhà xe Kiều Phát (theo hồ sơ BHXH).</p>
    </Phone>
  </div>
)

const P10 = () => (
  <Sheet org="Đại lý thu mua nông sản Phước Thịnh · Long Khánh" title="Phiếu nhập hàng">
    <Row k="Ngày" v="06/11/2025" />
    <Row k="Người bán" v="Hùng · 0905 ••• 662" strong />
    <Row k="Hàng" v="Tiêu đen, 400 bao × 50 kg" />
    <Row k="Ghi trên bao" v="ĐẤT ĐỎ · DD-1102" strong />
    <Row k="Đơn giá" v="141.000 đ/kg" />
    <Row k="Thành tiền" v="2.820.000.000 đ" strong />
    <p className="pt-1">
      Chuyển khoản theo yêu cầu người bán, tài khoản <Mark>DOAN THI KIEU</Mark>.
    </p>
    <p className="text-[10px] italic">Người bán nói bao cũ xin lại của chỗ quen, chưa kịp thay.</p>
  </Sheet>
)

const P11 = () => (
  <Sheet org="Ngân hàng · Sao kê theo yêu cầu cơ quan điều tra" title="Giao dịch tài khoản Đoàn Thị Kiều">
    {[
      ['31/10', '−15.000.000', 'TRAN THI MAI', 'hoan ung'],
      ['04/11', '−250.000.000', 'HO THI LIEN', 'tra tien hui'],
      ['06/11', '+2.820.000.000', 'DL PHUOC THINH', 'tien hang'],
      ['07/11', '−2.100.000.000', 'NGAN HANG DL', 'tat toan no qua han'],
    ].map(([d, amt, who, nd]) => (
      <div key={d} className="grid grid-cols-[auto_auto_1fr] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span className="font-bold">{amt}</span>
        <span className="text-right">{who === 'HO THI LIEN' ? <Mark>{`${who} · ${nd}`}</Mark> : `${who} · ${nd}`}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Hồ Thị Liên: vợ anh Hồ Văn Đạt, chủ tạp hóa ở phường Tân Lợi.</p>
    <p className="text-[10px] italic">Đã đối chiếu: không có giao dịch nào với tài khoản Nguyễn Hữu Tài trong tháng 10 và 11.</p>
  </Sheet>
)

const X1 = () => (
  <Sheet org="Ngân hàng thương mại · Chi nhánh Đắk Lắk" title="Thông báo nợ quá hạn">
    <p>Kính gửi: Hộ kinh doanh vận tải Kiều Phát (bà Đoàn Thị Kiều).</p>
    <Row k="Dư nợ quá hạn" v="2.100.000.000 đ" strong />
    <Row k="Tài sản bảo đảm" v="2 xe container 47H" />
    <p>
      Sau ngày <Mark>30/11/2025</Mark>, ngân hàng sẽ tiến hành thu giữ tài sản bảo đảm để xử lý nợ.
    </p>
    <Stamp text="Ngân hàng · ĐL" className="bottom-2 right-3" />
  </Sheet>
)

const X2 = () => (
  <Sheet org="Đội quản lý thị trường số 5" title="Quyết định xử phạt vi phạm hành chính">
    <Row k="Ngày" v="14/06/2023" />
    <Row k="Người vi phạm" v="Mạc Văn Hiếu" />
    <p>
      Hành vi: chứa trong kho tại Phan Rí <Mark>6 tấn cà phê nhân không có hóa đơn, chứng từ</Mark>.
    </p>
    <Row k="Mức phạt" v="25.000.000 đ, tịch thu hàng" />
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

const Guest = ({ x, y, s = 1, skin = '#d9a47a', hair = '#1a1a1f', shirt, hairStyle = 'short' }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; hairStyle?: 'short' | 'long' | 'bun' | 'cap' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    {hairStyle === 'long' && <path d="M-14,-50 Q0,-66 14,-50 L18,-14 L-18,-14 Z" fill={hair} />}
    {hairStyle === 'bun' && <circle cx="0" cy="-50" r="8" fill={hair} />}
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />
    {hairStyle === 'cap' && <path d="M-15,-38 Q0,-56 15,-38 Z M-15,-38 h-12 v4 h12 Z" fill="#1a1a1f" />}
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

/** Đạt at the rice shop in Cà Ná: the original seal 55120 is still on the doors at 22:30. */
const X3 = () => (
  <Phone header="Trang cá nhân · Đạt Container">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#1f2638" />
        <rect y="170" width="320" height="50" fill="#3b3d42" />
        {/* The rear of the container under the shop's light */}
        <rect x="150" y="40" width="160" height="134" fill="#b5452f" stroke={LINE} strokeWidth="2" />
        <line x1="230" y1="40" x2="230" y2="174" stroke={LINE} strokeWidth="2" />
        {[190, 270].map((x) => (
          <rect key={x} x={x} y="44" width="6" height="126" fill="#7a7f83" stroke={LINE} strokeWidth="1" />
        ))}
        <rect x="236" y="104" width="30" height="12" rx="2" fill={accent.gold} stroke={LINE} strokeWidth="1" />
        <text x="251" y="113" textAnchor="middle" fontSize="6" fill={LINE} fontFamily={mono}>55120</text>
        {/* Shop sign and light */}
        <rect x="10" y="30" width="120" height="22" rx="3" fill={accent.teal} stroke={LINE} strokeWidth="1.5" />
        <text x="70" y="45" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Barlow Condensed, sans-serif">CƠM TẤM CÀ NÁ</text>
        <circle cx="70" cy="66" r="6" fill="#ffd98f" />
        <Guest x={80} y={176} s={1.3} shirt="#b0925c" skin="#b9815a" />
        <TimeTag t="02/11 22:30" />
      </svg>
    </div>
    <PhotoMeta when="02/11/2025 · 22:30" where="Cà Ná, Ninh Thuận" />
    <p className="text-[10px]">"Chuyến cuối tuần, cơm tấm Cà Ná vẫn ngon nhất 🚛" · 12 lượt thích</p>
  </Phone>
)

/** Phúc at a karaoke bar in Phan Rang, far from the truck. */
const X4 = () => (
  <Phone header="Story · phuc.phuxe">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2b1838" />
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={20 + i * 40} cy={20 + (i % 2) * 10} r="5" fill={['#ff5ac8', '#5ad8ff', '#ffd95a'][i % 3]} opacity="0.8" />
        ))}
        {/* Karaoke screen with the time in the corner */}
        <rect x="120" y="36" width="180" height="96" rx="4" fill="#141020" stroke={LINE} strokeWidth="2" />
        <rect x="126" y="42" width="168" height="84" fill="#3a4f8a" />
        <text x="210" y="96" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Bitter, serif">♪ Mưa trên phố Huế ♪</text>
        <text x="288" y="54" textAnchor="end" fontSize="8" fill="#fff" fontFamily={mono}>00:40 · P.07</text>
        <text x="210" y="118" textAnchor="middle" fontSize="7" fill="#ffd95a" fontFamily={mono}>KARAOKE HOA BIỂN · PHAN RANG</text>
        <rect x="0" y="176" width="320" height="44" fill="#4a2a4a" />
        <Guest x={60} y={180} s={1.2} shirt="#7a9fb0" skin="#b9815a" hairStyle="cap" />
        <Guest x={130} y={186} s={1.05} shirt="#cf9a32" skin="#efc39b" hairStyle="long" />
        <Guest x={250} y={188} s={1} shirt="#7d2f2a" skin="#d9a47a" />
        <TimeTag t="03/11 00:40" />
      </svg>
    </div>
    <PhotoMeta when="03/11/2025 · 00:40" where="Phan Rang, Ninh Thuận" />
    <p className="text-[10px]">"Được anh Đạt thả cho một đêm 🎤🎤" · 41 lượt xem</p>
  </Phone>
)

/** Kiều's screenshot of the fleet map, sent "from home": the blue you-are-here dot sits right beside 47H at Phan Rí. */
const X5 = () => (
  <Phone header="Zalo · Đạt 47H">
    <div className="overflow-hidden rounded-md border border-black/10">
      <svg viewBox="0 0 320 200" className="block w-full">
        <rect width="320" height="200" fill="#e8ecef" />
        <path d="M40,0 Q110,60 150,100 T300,200" stroke="#f2c230" strokeWidth="10" fill="none" />
        <path d="M0,150 Q60,140 110,170" stroke="#9fb4c8" strokeWidth="18" fill="none" />
        <circle cx="140" cy="92" r="9" fill="#9a9a9a" stroke={LINE} strokeWidth="1.5" />
        {/* The phone's own location, a few hundred metres from the truck */}
        <circle cx="126" cy="104" r="11" fill="#2f7fe0" opacity="0.25" />
        <circle cx="126" cy="104" r="5" fill="#2f7fe0" stroke="#fff" strokeWidth="1.5" />
        <text x="126" y="126" textAnchor="middle" fontSize="7" fill="#2f7fe0" fontFamily={mono}>Vị trí của bạn</text>
        <rect x="156" y="70" width="150" height="40" rx="4" fill="#fff" stroke={LINE} strokeWidth="1" />
        <text x="164" y="86" fontSize="9" fontWeight="700" fill={LINE} fontFamily={mono}>47H-••• · MẤT TÍN HIỆU</text>
        <text x="164" y="100" fontSize="8" fill={accent.red} fontFamily={mono}>từ 23:52 · gần Phan Rí</text>
        <rect x="0" y="0" width="320" height="22" fill="#2f4258" />
        <text x="8" y="15" fontSize="9" fill="#fff" fontFamily={mono}>GIÁM SÁT ĐỘI XE · KIỀU PHÁT</text>
        <text x="312" y="15" textAnchor="end" fontSize="9" fill="#fff" fontFamily={mono}>00:31</text>
      </svg>
    </div>
    <p className="ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white">Sao xe mất sóng vậy Đạt? Gọi không bắt máy. <span className="text-[8px] opacity-70">00:31</span></p>
    <p className="mr-6 rounded-lg rounded-tl-none bg-white p-2">Chỗ này yếu sóng chị ơi <span className="text-[8px] opacity-60">01:06</span></p>
    <PhotoMeta when="03/11/2025 · 00:31" where="Nhà riêng, Buôn Ma Thuột" />
  </Phone>
)

/** Tài's post at 23:40: dark window and the clock at twenty to twelve. His alibi holds. */
const X6 = () => (
  <Phone header="Trang cá nhân · Tài Tiêu Đất Đỏ">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#6e4c34" />
        {/* Window onto the night, street lights below */}
        <rect x="20" y="20" width="110" height="90" fill="#1b2236" stroke={LINE} strokeWidth="2" />
        <circle cx="104" cy="40" r="8" fill="#f3e4c4" />
        {[34, 58, 92, 116].map((x) => (
          <circle key={x} cx={x} cy="98" r="2.5" fill="#ffd98f" />
        ))}
        <line x1="75" y1="20" x2="75" y2="110" stroke={LINE} strokeWidth="2" />
        {/* Wall clock at twenty to twelve */}
        <g stroke={LINE} strokeWidth="1.5">
          <circle cx="250" cy="44" r="18" fill="#fff8e8" />
          <path d="M250,44 L248.3,34.2 M250,44 L237.9,51" strokeLinecap="round" strokeWidth="2" />
        </g>
        <rect x="0" y="160" width="320" height="60" fill="#7a4f32" />
        {[60, 140, 220].map((x) => (
          <ellipse key={x} cx={x} cy="168" rx="20" ry="6" fill="#f3e4c4" stroke={LINE} strokeWidth="1" />
        ))}
        <Guest x={90} y={160} s={1.1} shirt="#2f4258" skin="#d9a47a" hair="#7d7a76" />
        <Guest x={180} y={162} s={1.05} shirt="#ece2cf" skin="#efc39b" />
        <Guest x={265} y={162} s={1.05} shirt="#6b6a35" skin="#b9815a" />
        <TimeTag t="Đăng 23:40" />
      </svg>
    </div>
    <PhotoMeta when="Đăng lúc 23:40 · 02/11/2025" where="Buôn Ma Thuột" />
    <p className="text-[10px]">"Tiếp anh em đối tác tới khuya 🍷 Làm ăn là phải vậy" · 58 lượt thích</p>
  </Phone>
)

/** Hiếu's gate camera: the container, then a white pickup with the Kiều Phát sticker on the door. */
const X7 = () => (
  <Phone header="Camera cổng kho PR · Cảnh báo chuyển động" dark>
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 200" className="block w-full">
        <rect width="320" height="200" fill="#2b302b" />
        <rect y="120" width="320" height="80" fill="#5a5a50" />
        {/* Container tail disappearing into the yard */}
        <rect x="200" y="50" width="120" height="80" fill="#5a3a30" />
        {/* White pickup, its door sticker */}
        <g stroke="#111" strokeWidth="1.5">
          <path d="M40,150 L40,120 L80,98 L150,98 L160,120 L190,122 L190,150 Z" fill="#d8d8d0" />
          <circle cx="70" cy="152" r="14" fill="#111" />
          <circle cx="165" cy="152" r="14" fill="#111" />
          <rect x="94" y="112" width="40" height="20" fill="#2f4258" />
        </g>
        <text x="114" y="125" textAnchor="middle" fontSize="5.5" fill="#f3e4c4" fontFamily={mono}>KIỀU PHÁT</text>
        <rect x="100" y="140" width="40" height="10" fill="#f3e4c4" stroke="#111" strokeWidth="1" />
        <text x="120" y="148" textAnchor="middle" fontSize="6" fill="#111" fontFamily={mono}>47C-2••</text>
        <rect width="320" height="200" fill="#9fbf9a" opacity="0.12" />
        <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>CAM CỔNG · HỒNG NGOẠI</text>
        <text x="312" y="192" textAnchor="end" fontSize="9" fill="#e8e8e8" fontFamily={mono}>03/11/2025 00:12:07</text>
      </svg>
    </div>
    <p className="text-[10px] opacity-80">Lần báo trước: 23:58:40 (xe container vào cổng).</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7 }
