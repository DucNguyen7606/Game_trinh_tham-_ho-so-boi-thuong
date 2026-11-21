import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import type { PortraitSpec } from '@/art/Portrait'
import type { CaseData } from '@/game/types'
import { iso } from '@/art/iso/iso'
import { FONT, Fb, MONO, PhotoPerson, PhotoStamp } from '@/art/iso/kit'
import caseJson from './case.json'

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
      04:10, anh xe ôm Lê Văn Tỷ phát hiện <Mark>Hồ Văn Đạt</Mark> bị trói bằng băng dính bên lề QL1A, cách Phan Thiết 18 km.
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
      Cổ tay hai bên: <Mark>không hằn, không trầy xước</Mark>. Băng dính được gỡ khi đến, theo lời kể <Mark>quấn bên ngoài tay áo khoác</Mark>.
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

const cast = Object.fromEntries((caseJson as CaseData).suspects.map((s) => [s.id, s.portrait])) as Record<string, PortraitSpec>

const TimeTag = ({ t }: { t: string }) => <PhotoStamp t={t} />

/** Đạt at the rice shop in Cà Ná: the original seal 55120 is still on the doors at 22:30. */
const X3 = () => (
  <Phone header="Trang cá nhân · Đạt Container">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5b5a86" />
        <rect y="170" width="320" height="50" fill="#8c8a99" />
        {/* The rear of the container under the shop's light */}
        <Fb x={150} y={40} w={170} h={134} d={20} c="#d0644a" />
        <rect x="233" y="40" width="3" height="134" fill="#a84e38" />
        {[196, 274].map((x) => (
          <rect key={x} x={x} y="44" width="6" height="126" fill="#9aa3b5" />
        ))}
        <Fb x={238} y={104} w={30} h={12} d={4} c={iso.gold} />
        <text x="253" y="113" textAnchor="middle" fontSize="6.5" fontWeight="800" fill={iso.ink} fontFamily={MONO}>55120</text>
        {/* Shop sign and light */}
        <Fb x={10} y={30} w={120} h={22} d={8} c={iso.blue} />
        <text x="70" y="45" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily={FONT}>CƠM TẤM CÀ NÁ</text>
        <Fb x={64} y={60} w={12} h={8} d={6} c="#ffe1a0" />
        <PhotoPerson x={80} y={170} s={1.3} spec={cast.dat} look={{ mood: 'smile' }} />
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
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5b4a7c" />
        {Array.from({ length: 8 }, (_, i) => (
          <Fb key={i} x={16 + i * 40} y={16 + (i % 2) * 10} w={8} h={8} d={6} c={['#ff8ac8', '#8adfff', '#ffe18a'][i % 3]} />
        ))}
        {/* Karaoke screen with the time in the corner */}
        <Fb x={120} y={36} w={180} h={96} d={12} c={iso.ink} />
        <rect x="126" y="42" width="168" height="84" fill="#5d8ea3" />
        <text x="210" y="96" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily={FONT}>♪ Mưa trên phố Huế ♪</text>
        <text x="288" y="54" textAnchor="end" fontSize="8" fill="#fff" fontFamily={MONO}>00:40 · P.07</text>
        <text x="210" y="118" textAnchor="middle" fontSize="7" fill="#ffe1a0" fontFamily={MONO}>KARAOKE HOA BIỂN · PHAN RANG</text>
        <PhotoPerson x={60} y={176} s={1.2} spec={cast.phuc} look={{ mood: 'smile' }} />
        <PhotoPerson x={140} y={184} s={1.05} look={{ hair: 'long', build: 'thin', skin: 0 }} shirt="#e2a63b" />
        <PhotoPerson x={250} y={186} look={{ hair: 'short', skin: 1 }} shirt="#b8452f" />
        <Fb x={-4} y={196} w={330} h={24} d={20} c="#3d2f5a" />
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
    <p className="ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white">Sao xe mất sóng thế Đạt? Gọi không bắt máy. <span className="text-[8px] opacity-70">00:31</span></p>
    <p className="mr-6 rounded-lg rounded-tl-none bg-white p-2">Chỗ này yếu sóng chị ơi <span className="text-[8px] opacity-60">01:06</span></p>
    <PhotoMeta when="03/11/2025 · 00:31" where="Nhà riêng, Buôn Ma Thuột" />
  </Phone>
)

/** Tài's post at 23:40: dark window and the clock at twenty to twelve. His alibi holds. */
const X6 = () => (
  <Phone header="Trang cá nhân · Tài Tiêu Đất Đỏ">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e6d6c4" />
        {/* Window onto the night, street lights below */}
        <Fb x={20} y={20} w={110} h={90} d={10} c="#f6efe3" />
        <rect x="26" y="26" width="98" height="78" fill="#3d3f6a" />
        <Fb x={98} y={34} w={10} h={10} d={4} c="#f6efe3" />
        {[34, 58, 92, 116].map((x) => (
          <rect key={x} x={x - 2} y="94" width="4" height="4" fill="#ffe1a0" />
        ))}
        <rect x="74" y="26" width="3" height="78" fill="#f6efe3" />
        {/* Wall clock at twenty to twelve */}
        <Fb x={232} y={26} w={36} h={36} d={6} c="#fffaf0" />
        <rect x="249" y="31" width="2" height="13" fill={iso.ink} />
        <rect x="238" y="44" width="12" height="2" fill={iso.ink} transform="rotate(-30 250 45)" />
        <PhotoPerson x={90} y={156} s={1.1} spec={cast.tai} look={{ mood: 'smile' }} />
        <PhotoPerson x={180} y={158} s={1.05} look={{ hair: 'side-part', skin: 0 }} shirt="#ece2cf" />
        <PhotoPerson x={265} y={158} s={1.05} look={{ hair: 'short', skin: 2 }} shirt="#6b6a35" />
        <Fb x={-4} y={166} w={330} h={54} d={26} c="#a07c5a" />
        {[60, 140, 220].map((x) => (
          <Fb key={x} x={x - 18} y={164} w={36} h={4} d={14} c="#f6efe3" />
        ))}
        <TimeTag t="Đăng 23:40" />
      </svg>
    </div>
    <PhotoMeta when="Đăng lúc 23:40 · 02/11/2025" where="Buôn Ma Thuột" />
    <p className="text-[10px]">"Tiếp anh em đối tác đến khuya 🍷 Làm ăn là phải thế" · 58 lượt thích</p>
  </Phone>
)

/** Hiếu's gate camera: the container, then a white pickup with the Kiều Phát sticker on the door. */
const X7 = () => (
  <Phone header="Camera cổng kho PR · Cảnh báo chuyển động" dark>
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 200" className="block w-full">
        <rect width="320" height="200" fill="#6f7a86" />
        <rect y="120" width="320" height="80" fill="#9a9a90" />
        {/* Container tail disappearing into the yard */}
        <Fb x={204} y={50} w={120} h={80} d={14} c="#8a5a4a" />
        {/* White pickup seen from the side, its door sticker */}
        <Fb x={40} y={118} w={150} h={30} d={20} c="#e9e6dc" />
        <Fb x={80} y={96} w={70} h={24} d={20} c="#e9e6dc" />
        <rect x="86" y="100" width="58" height="14" fill="#5b6a7a" />
        <Fb x={94} y={122} w={40} h={20} d={2} c="#2f4258" />
        <text x="114" y="135" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#f6efe3" fontFamily={MONO}>KIỀU PHÁT</text>
        <Fb x={56} y={144} w={28} h={18} d={10} c={iso.ink} />
        <Fb x={150} y={144} w={28} h={18} d={10} c={iso.ink} />
        <Fb x={186} y={132} w={22} h={10} d={4} c="#f6efe3" />
        <text x="197" y="139.5" textAnchor="middle" fontSize="5" fill={iso.ink} fontFamily={MONO}>47C-2••</text>
        <rect width="320" height="200" fill="#9fbf9a" opacity="0.15" />
        <text x="8" y="14" fontSize="9" fill="#f6efe3" fontFamily={MONO}>CAM CỔNG · HỒNG NGOẠI</text>
        <text x="312" y="192" textAnchor="end" fontSize="9" fill="#f6efe3" fontFamily={MONO}>03/11/2025 00:12:07</text>
      </svg>
    </div>
    <p className="text-[10px] opacity-80">Lần báo trước: 23:58:40 (xe container vào cổng).</p>
  </Phone>
)

/** A police warning about real truck robberies: same road, same story. But real victims lost their phones and wallets. */
const X9 = () => (
  <Sheet org="Công an tỉnh Bình Thuận · Phòng CSHS" title="Thông báo cảnh giác">
    <p>Từ 05/10 đến 24/10/2025, trên QL1A đoạn qua huyện Hàm Thuận Nam xảy ra <b>3 vụ cướp tài sản</b> của tài xế xe tải.</p>
    <p>Thủ đoạn: nhóm 3 người bịt mặt đi xe 7 chỗ tạt đầu, dùng dao khống chế, <Mark>trói chặt tay chân bằng dây rút</Mark>.</p>
    <p>Tài sản bị cướp: <Mark>điện thoại, tiền mặt, ví giấy tờ</Mark> của tài xế. Chưa vụ nào bị lấy hàng hóa.</p>
    <p className="pt-1 text-[10px] opacity-70">Đề nghị các doanh nghiệp vận tải nhắc tài xế không dừng xe dọc đường vào ban đêm.</p>
    <Stamp text="CA tỉnh Bình Thuận" className="bottom-3 right-6" />
  </Sheet>
)

/** Phúc got 5 million from Kiều the day before the trip. An advance on wages, as the payroll shows. */
const X10 = () => (
  <Sheet org="Ngân hàng Nông nghiệp · Sao kê tài khoản" title="Trần Minh Phúc">
    {[
      ['25/10', '+ 7.500.000', 'KIEU PHAT LUONG T10'],
      ['28/10', '- 1.200.000', 'chuyen cho Ngoc Anh'],
      ['01/11', '+ 5.000.000', 'DOAN THI KIEU tam ung', true],
      ['02/11', '- 500.000', 'rut tien mat Phan Rang'],
    ].map(([a, b, c, m]) => (
      <div key={String(a) + b} className="grid grid-cols-[40px_80px_1fr] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span className="text-right">{b}</span>
        <span>{m ? <Mark>{c}</Mark> : c}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] opacity-70">Ghi chú kế toán Kiều Phát: "Phúc ứng 5tr lương T11, trừ vào 25/11".</p>
  </Sheet>
)

/** Tài had already asked the buyer for a better price, and got part of it. The loss was smaller than his note says. */
const X8 = () => (
  <Phone header="Email · Tài Đất Đỏ ↔ Hamburg">
    <p className="rounded-md bg-white/70 p-2">"Giá tiêu lên 152, giao đúng 98 thì tôi lỗ nặng. Xin anh chia lại phần chênh." · 15/10/2025</p>
    <p className="rounded-md bg-[#d7ecd9] p-2 text-right">"OK, we accept 125.000 VND/kg for this lot. Please ship before 15/11." · 21/10/2025</p>
    <p className="text-[10px] opacity-70">Phụ lục giá mới ký 22/10, sáu ngày trước khi mua bảo hiểm.</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 }
