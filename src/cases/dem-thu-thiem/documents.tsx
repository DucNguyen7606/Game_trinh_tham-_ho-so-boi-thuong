import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { clueLocked, useGame } from '@/game/store'
import type { PortraitSpec } from '@/art/Portrait'
import { iso } from '@/art/iso/iso'
import { Fb, TimeStamp, Wheel, makeGuest } from '@/art/iso/photo'
import type { CaseData } from '@/game/types'
import caseJson from './case.json'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm vật chất xe ô tô">
    <Row k="Số hợp đồng" v="AT-XCG-2025-0301" />
    <Row k="Chủ xe" v="Trần Quang Khải" />
    <Row k="Xe" v="Mercedes-Benz GLC 300, màu đen" />
    <Row k="Biển số" v="51K-686.68" strong />
    <Row k="Giá trị BH" v="2.100.000.000 đ" strong />
    <Row k="Hiệu lực" v="01/03/2025 – 28/02/2026" />
    <p className="pt-1 text-[10px] italic">
      Điều 9: Không bồi thường thiệt hại do <Mark>hành động cố ý</Mark> của chủ xe hoặc người lái, thiệt hại xảy ra khi người lái <Mark>không có giấy phép lái xe hợp lệ</Mark>, hoặc thiệt hại không do sự cố được khai báo gây ra.
    </p>
    <Signature name="T. Q. Khải" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Bảo hiểm An Tín · Hồ sơ 0712" title="Bản tường trình của chủ xe">
    <p>Tôi là Trần Quang Khải, chủ xe 51K-686.68.</p>
    <p>
      Tối 6/12 tôi dự tiệc với bạn làm ăn ở <Mark>Vũng Tàu</Mark>. Khoảng <Mark>0 giờ 30</Mark> tôi lái xe về <Mark>một mình</Mark>, theo cao tốc Long Thành.
    </p>
    <p>
      Khoảng 2 giờ 30 tới đường mới ở Thủ Thiêm, <Mark>trời mưa to</Mark>, một <Mark>con bò</Mark> băng ngang. Tôi đánh lái tránh, xe trượt xuống bờ kênh, đâm vào gốc cây.
    </p>
    <p>Tôi mở cửa bò ra, leo lên đường và gọi 113.</p>
    <Signature name="T. Q. Khải" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công an phường An Khánh · Đội CSGT" title="Biên bản khám nghiệm hiện trường">
    <Row k="Tiếp nhận tin báo" v="02:52 ngày 07/12" strong />
    <Row k="Có mặt" v="03:10" />
    <Row k="Vị trí" v="Đường số 9, khu Thủ Thiêm" />
    <p>Xe 51K-686.68 nằm dưới bờ kênh, cách mép đường 9 m, đầu xe đâm gốc cây dầu.</p>
    <p>
      Người lái Trần Quang Khải đứng trên đường, <Mark>trầy xước hai lòng bàn tay</Mark>, không thương tích khác.
    </p>
    <Row k="Nồng độ cồn" v="0 mg/l khí thở" />
    <Stamp text="CA P. An Khánh" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

const P4Decoded = () => (
  <Sheet org="Đại lý Mercedes-Benz · Trích xuất cho An Tín" title="Hộp ghi sự kiện túi khí (EDR)">
    <p className="text-[10px]">Xe 51K-686.68 · Sự kiện va chạm duy nhất được ghi nhận:</p>
    <Row k="Thời điểm" v="07/12/2025 02:34:11" strong />
    {[
      ['Tốc độ lúc va chạm', '7 km/h'],
      ['Vị trí cần số', 'N'],
      ['Bàn đạp phanh', 'KHÔNG'],
      ['Bàn đạp ga', '0 %'],
      ['Dây an toàn ghế lái', 'CHƯA CÀI'],
      ['Cửa ghế lái', 'MỞ'],
      ['Túi khí', 'Không kích hoạt'],
    ].map(([k, v]) => (
      <div key={k} className="flex justify-between gap-3 border-b border-dotted border-black/20">
        <span className="opacity-70">{k}</span>
        <span className="font-bold">{['N', 'MỞ', 'CHƯA CÀI', '7 km/h'].includes(v) ? <Mark>{v}</Mark> : v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Không có sự kiện va chạm nào khác trong bộ nhớ (bộ nhớ chỉ ghi khi va chạm đủ mạnh hoặc khi khởi động lại hệ thống).</p>
  </Sheet>
)

/** The raw printout the recorder gives before it is decoded with the maker's code table (puzzle z1). */
const P4Raw = () => (
  <Sheet org="Đại lý Mercedes-Benz · Trích xuất cho An Tín" title="Hộp ghi sự kiện túi khí (EDR) · bản in máy">
    <pre className="whitespace-pre rounded bg-[#eef0ea] p-2 font-mono text-[10px] leading-snug">
      {['EDR DUMP · 51K-686.68 · EVT 01', '2025-12-07 02:34:11', '', 'SPD     0x070', 'GEAR    2', 'BRK     0', 'THR     000', 'BELT_D  0', 'DOOR_D  1', 'AB_DEP  0'].join('\n')}
    </pre>
    <div className="mt-1 border-t border-dashed border-black/30 pt-1 text-[9px] leading-snug">
      <p className="font-semibold">Bảng mã của hãng</p>
      <p>SPD: số hệ mười sáu (0x…), chia 16 ra km/h</p>
      <p>GEAR: 0 P · 1 R · 2 N · 3 D</p>
      <p>BRK 1 = có đạp phanh · THR = % bàn đạp ga</p>
      <p>BELT_D 1 = dây ghế lái đã cài · DOOR_D 1 = cửa ghế lái mở</p>
      <p>AB_DEP 1 = túi khí bung</p>
    </div>
  </Sheet>
)

/** Shows the raw printout until the player decodes it, then the dealer's plain reading. */
const P4 = () => {
  const locked = useGame((s) => clueLocked(s, 'P4'))
  return locked ? <P4Raw /> : <P4Decoded />
}

const P5 = () => (
  <Sheet org="Công an phường Thảo Điền" title="Biên bản vụ tai nạn, xe gây tai nạn bỏ chạy">
    <Row k="Thời điểm" v="22:47 ngày 06/12" strong />
    <Row k="Địa điểm" v="Đường Nguyễn Văn Hưởng" />
    <Row k="Nạn nhân" v="Đinh Thị Hoa, 36 tuổi" />
    <p>
      Xe máy Honda Wave <Mark>màu đỏ</Mark> bị một ô tô SUV <Mark>màu đen</Mark> tông từ phía sau bên trái. Ô tô dừng vài giây rồi chạy về phía đường Thảo Điền.
    </p>
    <p>
      Thu tại hiện trường: <Mark>mảnh kính đèn sương mù ô tô</Mark>, vụn sơn đen, vệt nước làm mát màu hồng.
    </p>
    <p className="text-[10px] italic">Nạn nhân đưa đi cấp cứu bệnh viện Chợ Rẫy, hôn mê.</p>
    <Stamp text="CA P. Thảo Điền" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

/** Pharmacy camera still: the black Mercedes stopped after the hit, the driver in a white hoodie at the open door, the Wave on the ground. Drawn in blocks, grey in the night camera. */
const P6 = () => (
  <div className="rounded-xl bg-[#2e2a4a] p-2 shadow-[0_6px_16px_rgb(46_42_74/0.35)]">
    <svg viewBox="0 0 320 180" className="block w-full rounded-lg">
      <rect width="320" height="180" fill="#3b3f52" />
      <rect y="112" width="320" height="68" fill="#4f5366" />
      <rect y="112" width="320" height="3" fill="#6a6e80" />
      {/* the shop fronts across the road */}
      <Fb x={0} y={40} w={90} h={72} d={12} c="#55596c" />
      <Fb x={210} y={30} w={110} h={82} d={12} c="#4b4f62" />
      <rect x="14" y="56" width="22" height="18" fill="#c9b98a" opacity="0.6" />
      <rect x="230" y="50" width="24" height="18" fill="#c9b98a" opacity="0.5" />
      {/* the Mercedes, side-on, nose to the right: headlight on, right fog light dark */}
      <Fb x={76} y={104} w={150} h={30} d={22} c="#26242f" />
      <Fb x={108} y={80} w={84} h={24} d={20} c="#26242f" />
      <rect x="114" y="84" width="34" height="16" fill="#6f7d8c" />
      <rect x="154" y="84" width="32" height="16" fill="#6f7d8c" />
      <rect x="218" y="108" width="8" height="7" fill="#fff6d6" />
      <rect x="218" y="122" width="7" height="5" fill="#15141b" />
      <polygon points="226,104 320,90 320,140 226,118" fill="#fff6d6" opacity="0.18" />
      <Wheel cx={104} cy={136} r={11} />
      <Wheel cx={198} cy={136} r={11} />
      {/* the door open, the driver in a white hoodie looking back */}
      <Fb x={112} y={84} w={6} h={40} d={14} c="#33313d" />
      <Guest x={126} y={110} s={0.75} who="khoa" shirt="#e8e2d6" hood />
      {/* the red Wave on its side on the road */}
      <Fb x={244} y={140} w={50} h={10} d={16} c="#a4544c" />
      <Wheel cx={248} cy={152} r={7} />
      <Wheel cx={292} cy={152} r={7} />
      <rect width="320" height="180" fill="#c4a27a" opacity="0.06" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>NHÀ THUỐC AN PHÚC · CAM 2</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>06/12/2025 22:47:21</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#e9d9c4]">
      SUV đen, logo ngôi sao ba cánh. Đèn sương mù phải tắt ngay sau va chạm. Người lái mở cửa nhìn ra: áo hoodie trắng trùm mũ. Biển số không đọc được vì chói đèn.
    </p>
  </div>
)

const P7 = () => (
  <Sheet org="Phòng phụ tùng chính hãng · Phản hồi cơ quan điều tra" title="Phiếu tra mã phụ tùng">
    <Row k="Mã in trên mảnh kính" v="A253 906 ••" />
    <Row k="Phụ tùng" v="Kính đèn sương mù, bên PHẢI" strong />
    <Row k="Dòng xe" v="Mercedes-Benz GLC (X253), 2020–2023" strong />
    <svg viewBox="0 0 200 70" className="mx-auto my-1 block w-40">
      <circle cx="40" cy="35" r="26" fill="#dfe9ec" stroke={LINE} strokeWidth="2" />
      {[-12, -4, 4, 12].map((d) => (
        <line key={d} x1="18" y1={35 + d} x2="62" y2={35 + d} stroke="#9fb4c8" strokeWidth="1.5" />
      ))}
      <path d="M50,20 L66,30 L56,50 Z" fill="#252a2e" />
      <text x="120" y="40" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>vân sọc ngang</text>
    </svg>
    <p className="text-[10px] italic">Tại TP.HCM có 214 xe GLC màu đen cùng đời. Cơ quan điều tra đang rà soát.</p>
  </Sheet>
)

const P8 = () => (
  <Sheet org="Bảo hiểm An Tín · Tra soát" title="Hành trình và thời tiết đêm 6–7/12">
    <p className="text-[10px] font-semibold">Thu phí tự động (ETC), xe 51K-686.68:</p>
    {[
      ['05/12 18:02', 'Trạm Long Phước · đi Vũng Tàu'],
      ['05/12 23:40', 'Trạm Long Phước · về TP.HCM'],
    ].map(([t, n]) => (
      <div key={t} className="grid grid-cols-[auto_1fr] gap-x-3 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>{n}</span>
      </div>
    ))}
    <p>
      <Mark>06/12 và 07/12: không có giao dịch nào.</Mark>
    </p>
    <p className="pt-1 text-[10px] font-semibold">Trạm đo mưa Thủ Thiêm:</p>
    <p>
      Mưa 20:05–21:10 ngày 6/12. <Mark>Không mưa từ 21:10</Mark> đến sáng 7/12.
    </p>
    <Stamp text="An Tín · Giám định" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Phòng CSGT Công an TP.HCM" title="Quyết định xử phạt vi phạm hành chính">
    <Row k="Ngày" v="14/09/2025" />
    <Row k="Người vi phạm" v="Trần Minh Khoa, 24 tuổi" strong />
    <Row k="Phương tiện" v="Ô tô 51K-686.68" />
    <p>
      Hành vi: điều khiển ô tô <Mark>trong cơ thể có nồng độ cồn</Mark> vượt mức.
    </p>
    <p>
      Hình thức bổ sung: <Mark>tước giấy phép lái xe 22 tháng</Mark>, đến 14/07/2027.
    </p>
    <Stamp text="Phòng CSGT" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Bệnh viện Chợ Rẫy · Khoa Hồi sức" title="Biên bản ghi lời khai">
    <Row k="Người khai" v="Đinh Thị Hoa" />
    <Row k="Ngày" v="11/12/2025, sau khi tỉnh" />
    <p>
      "Tôi chạy xe về, nghe tiếng máy rú phía sau. Hai cái đèn rất sáng. Tôi ngã xuống đường. Chiếc xe màu đen dừng lại, <Mark>người lái là thanh niên</Mark>, mặc <Mark>áo trắng có mũ</Mark>, mở cửa nhìn tôi."
    </p>
    <p>"Rồi cậu ấy đóng cửa, chạy mất. Tôi không nhớ gì nữa."</p>
    <Signature name="Đ. T. Hoa" />
  </Sheet>
)

const X1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Công văn nhắc nhở gara liên kết">
    <Row k="Gửi" v="Gara Toàn Phát · Lưu Đức Toàn" />
    <Row k="Ngày" v="12/04/2023" />
    <p>
      Qua hậu kiểm, hai hồ sơ sửa chữa của gara có báo giá <Mark>cao hơn thực tế khoảng 30%</Mark>. Đề nghị gara chấn chỉnh. Tái phạm sẽ chấm dứt liên kết.
    </p>
    <Signature name="P. G. Đ. bồi thường" />
  </Sheet>
)

const X2 = () => (
  <Sheet org="Ngân hàng · Trích hồ sơ tín dụng" title="Khách hàng: Trần Quang Khải">
    <Row k="Khoản vay" v="5.000.000.000 đ" strong />
    <Row k="Mục đích" v="Cải tạo khách sạn Sông Xanh" />
    <Row k="Tình trạng" v="Chậm trả kỳ 10 và kỳ 11" />
    <p className="pt-1 text-[10px] italic">Tài sản bảo đảm: quyền sử dụng đất khách sạn. Xe 51K-686.68 không thuộc tài sản bảo đảm.</p>
  </Sheet>
)

// ---------------------------------------------------------------------------
// Photos and screens a suspect shows on their phone during an interview.

const PhotoMeta = ({ when, where }: { when: string; where: string }) => (
  <p className="flex justify-between text-[10px] opacity-70">
    <span>{when}</span>
    <span>📍 {where}</span>
  </p>
)

// Photos a suspect shows on their phone, drawn in the diorama style seen straight on.
const cast = Object.fromEntries((caseJson as CaseData).suspects.map((x) => [x.id, x.portrait])) as Record<string, PortraitSpec>
const Guest = makeGuest(cast)
const TimeTag = TimeStamp

/** String lights along the top of a photo, as small glowing blocks. */
const Lights = () => (
  <g>
    <path d="M0,24 Q160,44 320,24" stroke={iso.ink} strokeWidth="1" fill="none" opacity="0.5" />
    {Array.from({ length: 11 }, (_, i) => (
      <Fb key={i} x={8 + i * 30} y={24 + Math.sin((i / 10) * Math.PI) * 14} w={5} h={5} d={6} c="#ffe1a0" />
    ))}
  </g>
)

/** Khải's "Vũng Tàu dinner": real, but taken the night before. */
const X3 = () => (
  <Phone header="Thư viện ảnh · Quang Khải">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5b6a9a" />
        <rect y="70" width="320" height="40" fill="#6f93a6" />
        <rect y="104" width="320" height="6" fill="#9fc2d6" />
        <Fb x={258} y={30} w={20} h={20} d={8} c="#fbf0c8" />
        {/* seafood restaurant awning posts */}
        <Fb x={10} y={40} w={8} h={140} d={8} c="#b9875d" />
        <Fb x={300} y={40} w={8} h={140} d={8} c="#b9875d" />
        <Guest x={96} y={150} s={1.3} who="khai" look={{ mood: 'smile' }} />
        <Guest x={220} y={150} s={1.2} look={{ hair: 'side-part', hairColor: 'black', age: 'mid', build: 'heavy' }} shirt="#2f4258" />
        {/* table with a plate of crab */}
        <Fb x={-4} y={178} w={330} h={44} d={26} c="#b9875d" />
        <Fb x={110} y={174} w={100} h={6} d={20} c="#fbf4e8" />
        {[124, 146, 168, 190].map((x) => (
          <Fb key={x} x={x} y={166} w={14} h={8} d={10} c={iso.coral} />
        ))}
        <Fb x={60} y={160} w={10} h={18} d={6} c="#e8c25a" />
        <TimeTag t="05/12 20:14" />
      </svg>
    </div>
    <PhotoMeta when="05/12/2025 · 20:14" where="Bãi Sau, Vũng Tàu" />
    <p className="text-[10px]">Ông Khải: "Tiệc ở Vũng Tàu đó cô, có cả ông Lâm bên du lịch."</p>
  </Phone>
)

const X4 = () => (
  <Phone header="Story · han.vongoc">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#4a4870" />
        <Lights />
        <rect y="80" width="320" height="40" fill="#3c4f78" opacity="0.8" />
        {/* Khoa in his white hoodie, beer bottles in front of him */}
        <Guest x={150} y={160} s={1.4} who="khoa" look={{ mood: 'smile' }} shirt="#f2ede4" hood />
        <Fb x={-4} y={180} w={330} h={44} d={26} c="#b9875d" />
        {[58, 82, 106].map((x) => (
          <Fb key={x} x={x} y={150} w={14} h={32} d={8} c="#d9a441" />
        ))}
        {/* the Mercedes smart key on the table */}
        <Fb x={200} y={184} w={34} h={14} d={14} c="#26242f" />
        <rect x="211" y="188" width="12" height="6" fill={iso.metal} />
        <TimeTag t="06/12 22:20" />
      </svg>
    </div>
    <PhotoMeta when="06/12/2025 · 22:20" where="Quán Bến Gỗ, Thảo Điền" />
    <p className="text-[10px]">"Ông này bao nhiêu chai rồi mà còn đòi lái 🙄" · @minhkhoa.tran</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Story · han.vongoc">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#4a4870" />
        <Lights />
        <Guest x={70} y={168} look={{ hair: 'long', hairColor: 'brown', build: 'thin', skin: 0 }} shirt="#7a9fb0" />
        <Guest x={160} y={160} s={1.25} who="han" look={{ mood: 'smile' }} />
        <Guest x={240} y={168} look={{ hair: 'short', build: 'normal' }} shirt="#6b6a35" />
        {/* Khoa's empty chair */}
        <Fb x={282} y={138} w={30} h={48} d={14} c="#7d5c41" />
        <Fb x={-4} y={190} w={330} h={34} d={26} c="#b9875d" />
        <TimeTag t="06/12 22:52" />
      </svg>
    </div>
    <PhotoMeta when="06/12/2025 · 22:52" where="Quán Bến Gỗ, Thảo Điền" />
    <p className="text-[10px]">"Có người bỏ về sớm, bọn mình quẩy tiếp 💃" · gắn thẻ 2 người bạn</p>
  </Phone>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X6 = () => (
  <Phone header="Zalo · Anh Khải KS Sông Xanh">
    <p className="text-center text-[9px] opacity-50">06/12/2025</p>
    <p className="text-center text-[9px] opacity-60">📞 Cuộc gọi nhỡ · 23:12</p>
    <Bubble time="23:15">Toàn, xe anh vỡ đầu bên phải, sửa kín giúp anh trong đêm nay, giá nào cũng được. Đừng hỏi gì cả.</Bubble>
    <Bubble me time="07:02">Anh ơi em mới dậy. Vỡ kiểu gì anh? Đâm vào người thì em không dám đâu.</Bubble>
    <Bubble time="07:30">Thôi khỏi. Xe anh bị tai nạn ở Thủ Thiêm rồi. Em kéo xe về gara em giám định hộ anh.</Bubble>
  </Phone>
)

const X7 = () => (
  <Sheet org="Khách sạn Sông Xanh" title="Sổ nhận phòng · 06–07/12">
    {[
      ['06/12 22:45', 'Đoàn Hà Nội (6 khách)', 'Sơn · ông Khải đón'],
      ['06/12 22:55', '…nhận xong phòng 301–303', 'Sơn'],
      ['07/12 02:40', 'Khách lẻ, phòng 205', 'Sơn'],
    ].map(([t, n, s]) => (
      <div key={t} className="grid grid-cols-[auto_1fr] gap-x-2 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>
          {n} <span className="opacity-60">· {s}</span>
        </span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Trưởng đoàn ký xác nhận: "Ông chủ ra tận cổng đón, nói chuyện tới gần 11 giờ."</p>
    <div className="flex justify-between">
      <Signature name="L. V. Sơn" />
      <Signature name="T. Q. Khải" />
    </div>
  </Sheet>
)

const X8 = () => (
  <Phone header="Ứng dụng đặt xe · Lịch sử">
    <p className="text-[9px] opacity-60">Tài khoản: Trần Minh Khoa</p>
    <div className="rounded bg-white p-2">
      <p className="font-semibold">06/12 · 23:41</p>
      <p>Đón: Quán Bến Gỗ, Thảo Điền</p>
      <p>Đến: Hẻm 12 Lương Định Của</p>
      <p>
        Người đi: <b>Võ Ngọc Hân</b> (đặt hộ)
      </p>
      <p className="text-right text-[10px] opacity-60">68.000 đ · Hoàn thành</p>
    </div>
    <p className="text-center text-[10px] opacity-60">Không có chuyến nào khác trong ngày 06/12.</p>
  </Phone>
)

const X9 = () => (
  <Phone header="Chợ Xe Sài Gòn · Tin đăng">
    <div className="rounded bg-white p-2">
      <p className="font-semibold">Mercedes GLC 300 · 2021 · đen</p>
      <p>Biển 51K-686.68, chính chủ, 38.000 km.</p>
      <p className="text-base font-bold text-[#b23a2e]">1,75 tỷ</p>
      <p className="text-[10px] opacity-70">Người đăng: Quang Khải · Thảo Điền</p>
    </div>
    <p className="text-[10px] opacity-60">Đăng 15/11 · Đẩy tin 3 lần · 0 lượt hỏi mua</p>
    <p className="text-[10px] italic">Giá trị xe trên hợp đồng bảo hiểm: 2,1 tỷ.</p>
  </Phone>
)

const X10 = () => (
  <Sheet org="Phòng CSGT · Công an TP.HCM" title="Quyết định xử phạt vi phạm hành chính">
    <Row k="Ngày" v="18/04/2022" />
    <Row k="Đơn vị bị phạt" v="Gara Toàn Phát · Lưu Đức Toàn" />
    <p>
      Nhận sửa chữa xe ô tô <Mark>liên quan vụ tai nạn giao thông</Mark> mà không thông báo cho cơ quan công an theo quy định.
    </p>
    <Row k="Mức phạt" v="15.000.000 đ" strong />
    <p className="text-[10px] italic">Ghi chú của An Tín: gara vẫn trong danh sách liên kết, theo dõi thêm.</p>
    <Stamp text="Phòng CSGT" className="bottom-2 right-3" />
    <div className="h-12" />
  </Sheet>
)

const X11 = () => (
  <Phone header="Facebook · Võ Ngọc Hân">
    <p>"Tài xế riêng của ai kia 🙄"</p>
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#3a3850" />
        {/* windscreen onto the night street */}
        <polygon points="20,20 300,20 280,110 40,110" fill="#5b6a9a" />
        <Fb x={80} y={62} w={10} h={10} d={6} c="#ffe1a0" />
        <Fb x={226} y={54} w={8} h={8} d={6} c="#ffe1a0" />
        {/* rear-view mirror with the plate reflected */}
        <Fb x={132} y={26} w={56} h={20} d={8} c="#dfe5ea" />
        <text x="160" y="40" textAnchor="middle" fontSize="8" fill={iso.ink} fontFamily={mono}>51K-686.68</text>
        {/* Hân driving (left seat), Khoa beside her in his hoodie */}
        <Guest x={95} y={168} s={1.25} who="han" />
        <Guest x={225} y={168} s={1.2} who="khoa" shirt="#f2ede4" hood />
        {/* steering wheel with the star badge */}
        <circle cx="95" cy="190" r="34" fill="none" stroke={iso.ink} strokeWidth="8" />
        <Fb x={88} y={184} w={14} h={12} d={6} c={iso.metal} />
        <rect x="0" y="204" width="320" height="16" fill="#26242f" />
        <TimeTag t="20/11 21:30" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 21:30" where="Thảo Điền" />
    <div className="rounded bg-white p-1.5 text-[10px]">
      <p className="font-semibold">Ảnh kèm: Giấy phép lái xe</p>
      <p>Võ Ngọc Hân · Hạng <b>B2</b> · cấp 03/2024</p>
    </div>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10, X11 }
