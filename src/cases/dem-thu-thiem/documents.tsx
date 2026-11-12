import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { Suv, Wave } from './scenes'

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

const P4 = () => (
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

const P6 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#252a2e" />
      <rect y="110" width="320" height="70" fill="#3a3f44" />
      <g transform="translate(110 112) scale(0.42)">
        <Suv lights hit />
      </g>
      {/* Driver leaning out of the open door: white hoodie */}
      <g transform="translate(118 72)">
        <path d="M-14,30 Q-16,4 0,0 Q16,4 14,30 Z" fill="#ece2cf" stroke="#111" strokeWidth="1.5" />
        <path d="M-10,4 Q0,-20 10,4" fill="#ece2cf" stroke="#111" strokeWidth="1.5" />
        <circle cx="0" cy="-2" r="6" fill="#d9a47a" />
      </g>
      <g transform="translate(250 136)">
        <Wave s={0.36} rot={-70} broken />
      </g>
      <rect width="320" height="180" fill="#c4a27a" opacity="0.05" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>NHÀ THUỐC AN PHÚC · CAM 2</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>06/12/2025 22:47:21</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">
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

const Guest = ({ x, y, s = 1, skin = '#efc39b', hair = '#1a1a1f', shirt, hairStyle = 'short', hood = false }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; hairStyle?: 'short' | 'long'; hood?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    {hairStyle === 'long' && <path d="M-14,-50 Q0,-66 14,-50 L18,-14 L-18,-14 Z" fill={hair} />}
    {hood && <path d="M-22,-4 Q-24,-18 -16,-22 L16,-22 Q24,-18 22,-4 Z" fill={shirt} />}
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

/** Khải's "Vũng Tàu dinner": real, but taken the night before. */
const X3 = () => (
  <Phone header="Thư viện ảnh · Quang Khải">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#1d2b44" />
        <rect y="70" width="320" height="40" fill="#2f4a5a" />
        <circle cx="270" cy="40" r="16" fill="#f3e4c4" opacity="0.8" />
        <Guest x={90} y={150} s={1.3} shirt="#b0925c" hair="#7d7a76" />
        <Guest x={220} y={150} s={1.2} shirt="#2f4258" />
        <rect x="0" y="176" width="320" height="44" fill="#7a4f32" stroke={LINE} strokeWidth="1.5" />
        <ellipse cx="160" cy="186" rx="60" ry="10" fill="#f6efe2" stroke={LINE} strokeWidth="1.5" />
        <path d="M130,184 q10,-12 20,0 q10,-12 20,0 q10,-12 20,0" fill="#e0503a" stroke={LINE} strokeWidth="1" />
        <TimeTag t="05/12 20:14" />
      </svg>
    </div>
    <PhotoMeta when="05/12/2025 · 20:14" where="Bãi Sau, Vũng Tàu" />
    <p className="text-[10px]">Ông Khải: "Tiệc ở Vũng Tàu đó cô, có cả ông Lâm bên du lịch."</p>
  </Phone>
)

const X4 = () => (
  <Phone header="Story · han.vongoc">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2a2a3a" />
        {[40, 120, 200, 280].map((x) => (
          <circle key={x} cx={x} cy="24" r="6" fill="#ffd98f" />
        ))}
        <path d="M0,24 Q160,40 320,24" stroke="#6f6c66" strokeWidth="1.5" fill="none" />
        <rect y="80" width="320" height="40" fill="#1d2b44" opacity="0.7" />
        <Guest x={150} y={160} s={1.4} shirt={'#ece2cf'} hood />
        <rect x="0" y="180" width="320" height="40" fill="#7a4f32" stroke={LINE} strokeWidth="1.5" />
        {[60, 90, 120].map((x) => (
          <rect key={x} x={x} y="150" width="16" height="34" rx="3" fill="#cf9a32" stroke={LINE} strokeWidth="1.2" opacity="0.9" />
        ))}
        {/* Mercedes smart key on the table */}
        <rect x="200" y="186" width="34" height="18" rx="7" fill="#17181c" stroke={LINE} strokeWidth="1.5" />
        <circle cx="217" cy="195" r="5" fill="#c9cdd2" />
        <path d="M217,191 v4 l-3,2 M217,195 l3,2" stroke="#17181c" strokeWidth="1" />
        <TimeTag t="06/12 22:20" />
      </svg>
    </div>
    <PhotoMeta when="06/12/2025 · 22:20" where="Quán Bến Gỗ, Thảo Điền" />
    <p className="text-[10px]">"Ông này bao nhiêu chai rồi mà còn đòi lái 🙄" · @minhkhoa.tran</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Story · han.vongoc">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2a2a3a" />
        {[40, 120, 200, 280].map((x) => (
          <circle key={x} cx={x} cy="24" r="6" fill="#ffd98f" />
        ))}
        <Guest x={70} y={168} shirt="#7a9fb0" hairStyle="long" hair="#4a3426" />
        <Guest x={160} y={160} s={1.25} shirt="#cf9a32" hairStyle="long" hair="#4a3426" />
        <Guest x={250} y={168} shirt="#6b6a35" />
        {/* Khoa's empty chair */}
        <rect x="282" y="140" width="34" height="44" fill="#573721" stroke={LINE} strokeWidth="1.5" />
        <rect x="0" y="190" width="320" height="30" fill="#7a4f32" />
        <TimeTag t="06/12 22:52" />
      </svg>
    </div>
    <PhotoMeta when="06/12/2025 · 22:52" where="Quán Bến Gỗ, Thảo Điền" />
    <p className="text-[10px]">"Có người bỏ về sớm, tụi mình quẩy tiếp 💃" · gắn thẻ 2 người bạn</p>
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
    <Bubble time="23:15">Toàn, xe anh bể đầu bên phải, sửa kín giúp anh trong đêm nay, giá nào cũng được. Đừng hỏi gì hết.</Bubble>
    <Bubble me time="07:02">Anh ơi em mới dậy. Bể kiểu gì anh? Đụng người thì em không dám đâu.</Bubble>
    <Bubble time="07:30">Thôi khỏi. Xe anh bị tai nạn ở Thủ Thiêm rồi. Em kéo xe về gara em giám định giùm anh.</Bubble>
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
    <p className="text-[10px] opacity-60">20/11/2025 · 21:30</p>
    <p>"Tài xế riêng của ai kia 🙄"</p>
    <div className="rounded bg-white p-2 text-[10px]">
      <p>[Ảnh] Hân cầm vô lăng Mercedes, Khoa ngồi ghế phụ cười.</p>
      <p className="opacity-70">Biển số trong gương: 51K-686.68</p>
    </div>
    <p className="text-[10px]">Kèm ảnh bằng lái hạng B2, cấp 03/2024.</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10, X11 }
