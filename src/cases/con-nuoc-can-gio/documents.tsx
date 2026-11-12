import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'

// What each document in the case-file envelopes looks like, keyed by clue id.
// Brands are generic on purpose: a bus line, a chat app, a social network.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm nhân thọ">
    <Row k="Số hợp đồng" v="AT-NT-2025-0512" />
    <Row k="Người được BH" v="Trương Văn Lực, 49 tuổi" />
    <Row k="Nghề nghiệp" v="Chủ vựa hải sản" />
    <Row k="Số tiền BH" v="5.000.000.000 đ" strong />
    <Row k="Quyền lợi" v="Tử vong: 100% số tiền BH" />
    <Row k="Ngày hiệu lực" v="12/05/2025" strong />
    <Row k="Người thụ hưởng" v="Phạm Thị Hồng (vợ)" strong />
    <p className="pt-1 text-[10px] italic">Điều 9: Chỉ từ chối khi tự tử trong 2 năm đầu, hoặc người thụ hưởng cố ý gây ra cái chết.</p>
    <Signature name="T. V. Lực" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

/** The police report with a sketch map: boat upstream, body downstream. */
const P2 = () => (
  <Sheet org="Công an xã Long Hòa, huyện Cần Giờ" title="Biên bản sự việc">
    <Row k="Báo tin" v="05:30 10/9 · Nguyễn Văn Tâm" />
    <p>
      Ghe của ông Trương Văn Lực được tìm thấy úp, mắc vào cọc đáy ở <Mark>Vàm Sát, cách bến 3 km về phía thượng nguồn</Mark>.
    </p>
    <p>
      13/9: thi thể dạt vào bãi bồi <Mark>Cần Thạnh, cách bến 9 km về phía cửa biển</Mark>.
    </p>
    <p>Thời tiết đêm 9/9: trời lặng, gió cấp 2, không mưa.</p>
    <svg viewBox="0 0 260 120" className="mt-1 block w-full">
      <rect width="260" height="120" fill="#efe6cf" />
      <path d="M130,0 Q110,30 130,60 Q150,90 130,120" stroke="#6b85a8" strokeWidth="18" fill="none" />
      <path d="M140,72 Q180,74 200,90" stroke="#6b85a8" strokeWidth="6" fill="none" />
      <text x="136" y="10" fontSize="8" fill={LINE} fontFamily={mono}>↑ Bình Khánh (thượng nguồn)</text>
      <circle cx="122" cy="22" r="4" fill={accent.red} />
      <text x="20" y="25" fontSize="8" fill={LINE} fontFamily={mono}>Vàm Sát: ghe úp</text>
      <rect x="140" y="44" width="10" height="8" fill={LINE} />
      <text x="156" y="52" fontSize="8" fill={LINE} fontFamily={mono}>bến vựa</text>
      <text x="196" y="86" fontSize="7" fill={LINE} fontFamily={mono}>R.Đước</text>
      <circle cx="132" cy="112" r="4" fill={accent.red} />
      <text x="20" y="114" fontSize="8" fill={LINE} fontFamily={mono}>Cần Thạnh: thi thể</text>
      <text x="150" y="116" fontSize="8" fill={LINE} fontFamily={mono}>↓ biển</text>
    </svg>
    <Stamp text="CA xã Long Hòa" className="bottom-2 right-3" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công an xã Cần Thạnh" title="Biên bản nhận dạng tử thi">
    <Row k="Ngày" v="13/09/2025, 14:20" />
    <Row k="Người nhận dạng" v="Phạm Thị Hồng (vợ)" />
    <p>Căn cứ nhận dạng: <Mark>bộ bà ba đen, nhẫn cưới</Mark> khắc chữ "Hồng". Gương mặt đã biến dạng do ngâm nước.</p>
    <p>
      Ý kiến gia đình: <Mark>không đồng ý khám nghiệm tử thi</Mark>, xin nhận về an táng trong ngày.
    </p>
    <Signature name="P. T. Hồng" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Đài Khí tượng Thủy văn Nam Bộ" title="Bảng thủy triều trạm Cần Giờ">
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 font-semibold">
      <span>Giờ</span>
      <span>Con nước</span>
      <span>Mực nước</span>
    </div>
    {[
      ['9/9 17:30', 'nước lên', '1,2 m'],
      ['9/9 23:40', 'đỉnh triều, nước đứng', '3,6 m'],
      ['10/9 06:10', 'chân triều', '0,4 m'],
    ].map(([a, b, c]) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto] gap-x-3 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{b}</span>
        <span className="text-right">{c}</span>
      </div>
    ))}
    <p className="pt-1">
      Từ 17:30 tới <Mark>23:40</Mark>: nước lên, dòng chảy <b>vào sông</b> về phía Bình Khánh.
    </p>
    <p>
      Từ 23:40 tới 06:10: nước ròng, dòng chảy <b>ra biển</b> về phía Cần Thạnh.
    </p>
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P5 = () => (
  <Sheet org="Trung tâm Pháp y TP.HCM" title="Kết luận giám định">
    <p className="text-[10px] italic">Theo đề nghị của Bảo hiểm An Tín và Công an huyện Cần Giờ, khai quật ngày 15/9.</p>
    <p className="font-semibold">1. ADN</p>
    <p>
      Mẫu tử thi so với mẫu của Trương Ngọc Như (con gái ông Lực): <Mark>quan hệ cha con, 99,99%</Mark>.
    </p>
    <p className="font-semibold">2. Nguyên nhân chết</p>
    <p>
      Phổi và dạ dày <Mark>gần như không có nước</Mark>, không có dấu hiệu ngạt nước.
    </p>
    <p>
      Vùng chẩm có vết nứt xương do <Mark>vật tày dạng thanh tròn</Mark>, đường kính khoảng 4 cm.
    </p>
    <p className="font-semibold">Kết luận: nạn nhân chết trước khi xuống nước.</p>
    <Stamp text="Pháp y · TP.HCM" className="bottom-2 right-3" />
  </Sheet>
)

const P6 = () => (
  <Sheet org="Tiệm vàng Kim Hưng · Bình Khánh" title="Hóa đơn bán lẻ">
    <Row k="Ngày" v="08/09/2025, 15:42" />
    <Row k="Khách hàng" v="Trương Văn Lực" strong />
    <Row k="Hàng" v="Vàng miếng 1 lượng × 30" />
    <Row k="Số sê-ri" v="KH-091201 → KH-091230" strong />
    <Row k="Thành tiền" v="2.460.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Thanh toán: tiền mặt. Khách yêu cầu túi chống nước.</p>
    <Stamp text="Kim Hưng · Đã thu" className="bottom-2 right-3" />
  </Sheet>
)

const P7 = () => (
  <Phone header="Tin nhắn · NhaXe HoaThuan">
    <p className="text-center text-[9px] opacity-50">08/09/2025 21:03</p>
    <Bubble time="21:03">
      Quý khách <Mark>TRAN VAN LAM</Mark> đã đặt vé: Bến xe Miền Tây → Châu Đốc, <b>06:00 ngày 10/09</b>, ghế A7. Vui lòng có mặt trước 30 phút.
    </Bubble>
    <Bubble time="06:31 · 10/09">Chuyến 06:00 đã khởi hành. Ghế A7: khách không lên xe.</Bubble>
    <p className="text-[10px] opacity-70">Số đặt vé: 0939 ••• 471</p>
  </Phone>
)

const P8 = () => (
  <Sheet org="Nhà mạng · Trích xuất theo yêu cầu cơ quan điều tra" title="Nhật ký cuộc gọi 0939 ••• 471">
    <p className="text-[10px]">Chủ thuê bao đăng ký: Lê Văn Tư (CCCD đã báo mất). Kích hoạt 03/09.</p>
    {[
      ['9/9 22:58', 'gọi P. T. Hồng', '12 giây', 'Long Hòa'],
      ['9/9 23:47', 'gọi N. V. Tâm', '40 giây', 'Long Hòa'],
      ['10/9 00:21', 'gọi N. V. Tâm', '8 giây', 'Rạch Đước'],
      ['10/9 00:34', 'tắt máy', '', 'Rạch Đước'],
    ].map(([a, b, c, d]) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{b === 'gọi N. V. Tâm' ? <Mark>{b}</Mark> : b}</span>
        <span className="text-right">
          {c} {d && `· ${d}`}
        </span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Sau 00:34 không còn tín hiệu.</p>
  </Sheet>
)

const P9 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#252a2e" />
      <rect y="110" width="320" height="70" fill="#3a3f44" />
      <path d="M0,110 L320,110" stroke="#f2c230" strokeWidth="3" strokeDasharray="12 8" />
      {/* The ferry ramp and a man on a motorbike with a styrofoam box */}
      <g transform="translate(150 120)">
        <circle cx="-30" cy="30" r="12" fill="#111" />
        <circle cx="34" cy="30" r="12" fill="#111" />
        <path d="M-40,22 L-10,4 L30,6 L46,22 Z" fill="#6b6a65" />
        <rect x="-14" y="-28" width="18" height="30" fill="#b0925c" />
        <circle cx="-5" cy="-36" r="8" fill="#4a4542" />
        <rect x="-46" y="-12" width="34" height="26" fill="#ece6da" stroke="#111" strokeWidth="1" />
      </g>
      <rect width="320" height="180" fill="#c4a27a" opacity="0.06" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily={mono}>PHÀ BÌNH KHÁNH · CAM 3 · CHIỀU ĐI TP</text>
      <text x="312" y="172" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily={mono}>10/09/2025 02:16:38</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">Xe Dream 54-H1 ••• (chủ xe: Nguyễn Văn Tâm). Chiều về: 04:41:09.</p>
  </div>
)

const P10 = () => (
  <Phone header="Sáu Tâm (khôi phục từ máy ông Lực)">
    <p className="text-center text-[9px] opacity-50">07/09/2025</p>
    <Bubble me time="21:40">
      Đêm 9 nước đứng 11g40, ròng thì tao thả trôi xuống. <Mark>Mày chờ ở Rạch Đước</Mark>, giữ ba lô cho tao.
    </Bubble>
    <Bubble time="21:42">Còn chị Hai sao anh?</Bubble>
    <Bubble me time="21:44">
      <Mark>Đừng cho bả biết gì hết. Bả không biết thì khóc mới thiệt</Mark>, bảo hiểm mới tin. Sáng ra mày báo ghe úp.
    </Bubble>
    <Bubble time="21:45">Còn tám tháng lương của tui?</Bubble>
    <Bubble me time="21:46">Bả nhận tiền rồi tao gửi mày. Vàng tao giữ.</Bubble>
    <p className="text-right text-[8px] opacity-50">Tin đã bị xóa ngày 09/09 · bà Hồng giao nộp máy 17/09 · khôi phục 18/09</p>
  </Phone>
)

const P11 = () => (
  <Sheet org="Tiệm vàng Ngọc Thẩm · Quận 8" title="Biên nhận mua vàng của khách">
    <Row k="Ngày" v="15/09/2025, 08:15" />
    <Row k="Người bán" v="Nguyễn Văn Tâm" strong />
    <Row k="CCCD" v="079 ••• 3318" />
    <Row k="Hàng" v="Vàng miếng 1 lượng × 3" />
    <Row k="Số sê-ri" v="KH-091207, KH-091208, KH-091209" strong />
    <Row k="Thành tiền" v="243.000.000 đ" />
    <p className="pt-1 text-[10px]">Ghi chú khách: "bán lo viện phí cho con".</p>
    <Signature name="N. V. Tâm" />
  </Sheet>
)

const X1 = () => (
  <div className="space-y-2">
    <Sheet title="Giấy vay tiền">
      <p>Tôi là Trương Văn Lực, có vay của anh Lý Minh Khang số tiền:</p>
      <p className="text-center text-sm font-bold">1.800.000.000 đ</p>
      <p>Lãi 3%/tháng. Hạn trả: <Mark>10/09/2025</Mark>.</p>
      <Signature name="T. V. Lực" />
    </Sheet>
    <Phone header="Khang Bình Khánh">
      <p className="text-center text-[9px] opacity-50">06/09/2025</p>
      <Bubble time="23:12">Còn 4 ngày. Không trả thì đừng trách.</Bubble>
      <Bubble me time="23:30">Ráng chờ tới tháng Chạp anh trả đủ.</Bubble>
    </Phone>
  </div>
)

const X2 = () => (
  <Sheet title="Thư đề nghị mua lại vựa">
    <p>Kính gửi anh Trương Văn Lực,</p>
    <p>
      Tôi đề nghị mua lại toàn bộ vựa hải sản Lực Phát gồm cầu tàu, kho lạnh và 2 ghe, giá <b>3.200.000.000 đ</b>. Nếu anh đồng ý, tôi trừ luôn 600 triệu tiền cọc tôm.
    </p>
    <p className="text-[10px] italic">Anh chưa trả lời.</p>
    <Signature name="Võ Thanh Vinh" />
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

const Guest = ({ x, y, s = 1, skin = '#d9a47a', hair = '#1a1a1f', shirt, hairStyle = 'short' }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; hairStyle?: 'short' | 'long' | 'bun' }) => (
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

/** Khang at the snail shop by the ferry: the TV and the wall clock pin him there after midnight. */
const X3 = () => (
  <Phone header="Trang cá nhân · Khang Bình Khánh">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#3a2f2a" />
        {/* String lights and the shop sign */}
        <path d="M0,24 Q160,50 320,20" fill="none" stroke="#2d1f18" strokeWidth="1.5" />
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={10 + i * 25} cy={24 + Math.sin((i / 12) * Math.PI) * 14} r="3" fill="#ffd98f" />
        ))}
        <rect x="16" y="40" width="120" height="24" rx="3" fill={accent.teal} stroke={LINE} strokeWidth="1.5" />
        <text x="76" y="56" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Barlow Condensed, sans-serif">ỐC ĐẦU PHÀ BÌNH KHÁNH</text>
        {/* TV showing a late match, minute 90+2 */}
        <rect x="200" y="40" width="96" height="58" rx="3" fill="#141020" stroke={LINE} strokeWidth="2" />
        <rect x="206" y="46" width="84" height="46" fill="#2f7a4f" />
        <rect x="210" y="50" width="52" height="11" fill="#000" opacity="0.6" />
        <text x="236" y="58" textAnchor="middle" fontSize="7" fill="#fff" fontFamily={mono}>1-1  90+2'</text>
        {/* Wall clock */}
        <g stroke={LINE} strokeWidth="1.5">
          <circle cx="160" cy="80" r="16" fill="#fff8e8" />
          <path d="M160,80 L160,68 M160,80 L163,80" strokeLinecap="round" />
        </g>
        <text x="160" y="106" textAnchor="middle" fontSize="7" fill="#e8dcc4" fontFamily={mono}>00:15</text>
        <Guest x={60} y={176} shirt="#7a9fb0" />
        <Guest x={160} y={170} s={1.2} shirt="#3a332f" skin="#efc39b" />
        <path d="M150,146 Q160,152 170,146" stroke={accent.gold} strokeWidth="2.5" fill="none" />
        <Guest x={250} y={176} shirt="#cf9a32" />
        <rect x="0" y="190" width="320" height="30" fill="#b0583a" stroke={LINE} strokeWidth="1.5" />
        {[50, 120, 200, 270].map((x) => (
          <ellipse key={x} cx={x} cy="198" rx="14" ry="4" fill="#efe6d4" stroke={LINE} strokeWidth="1" />
        ))}
        <TimeTag t="10/09 00:15" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 00:15" where="Ốc đầu phà, Bình Khánh" />
    <p className="text-[10px]">"Đêm nay không say không về 🍻" · 34 lượt thích</p>
  </Phone>
)

/** Tâm's photo of the upturned boat: his boots carry the red mud of Rạch Đước. */
const X4 = () => (
  <Phone header="Tin nhắn · Chị Hồng">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#8a7f86" />
        <rect y="0" width="320" height="70" fill="#c98a5a" opacity="0.6" />
        <path d="M0,70 Q80,50 160,64 T320,60 L320,80 L0,80 Z" fill="#2b4229" />
        <rect y="78" width="320" height="90" fill="#3e5a5e" />
        {/* Upturned hull caught on the fishing stakes */}
        {[60, 90, 230, 260].map((x) => (
          <line key={x} x1={x} y1="60" x2={x + 4} y2="150" stroke="#9a6a44" strokeWidth="5" />
        ))}
        <path d="M70,120 Q160,86 250,120 Q160,134 70,120 Z" fill="#3f6b6a" stroke={LINE} strokeWidth="2" />
        <path d="M70,120 Q160,128 250,120" stroke="#a8432c" strokeWidth="4" fill="none" />
        {/* His canoe in the foreground, and his boots on the grey bank */}
        <path d="M0,168 L320,168 L320,220 L0,220 Z" fill="#6b6660" />
        <path d="M180,176 Q250,166 320,176 L320,196 Q250,200 180,190 Z" fill="#5a4a3a" stroke={LINE} strokeWidth="1.5" />
        <path d="M220,180 Q250,176 300,180" stroke="#8a4a30" strokeWidth="3" fill="none" />
        {[40, 86].map((x) => (
          <g key={x} stroke={LINE} strokeWidth="1.5">
            <path d={`M${x},150 h24 v50 h12 v14 h-36 Z`} fill="#2a2a2a" />
            <path d={`M${x},186 h24 v14 h12 v14 h-36 Z`} fill="#8a4a30" />
          </g>
        ))}
        <TimeTag t="10/09 05:42" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 05:42" where="Vàm Sát, Cần Giờ" />
    <p className="text-[10px]">"Chị Hồng ơi ghe anh Lực úp ở Vàm Sát rồi" · gửi lúc 05:43</p>
  </Phone>
)

/** Hồng and her daughter at home: her husband's phone is charging on the shelf, and she still expects him back. */
const X5 = () => (
  <Phone header="Tin nhắn · Út Lan (Bình Dương)">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#c99a4a" />
        <rect y="160" width="320" height="60" fill="#a8604a" />
        {/* Shelf behind them: the TV, and Lực's own phone charging, left at home */}
        <rect x="20" y="70" width="280" height="10" fill="#573721" stroke={LINE} strokeWidth="1.5" />
        <rect x="196" y="20" width="96" height="50" rx="3" fill="#141020" stroke={LINE} strokeWidth="2" />
        <rect x="202" y="26" width="84" height="38" fill="#7a5f8a" />
        <g stroke={LINE} strokeWidth="1.2">
          <rect x="44" y="36" width="20" height="34" rx="3" fill="#1d1d22" />
          <rect x="47" y="40" width="14" height="24" fill="#3a6a8a" />
        </g>
        <path d="M54,70 q0,10 -14,10" stroke="#f2f2f2" strokeWidth="1.5" fill="none" />
        <text x="54" y="30" textAnchor="middle" fontSize="5.5" fill="#2d1f18" fontFamily={mono}>⚡ 100%</text>
        <rect x="100" y="50" width="20" height="20" rx="2" fill="#3f8a7e" stroke={LINE} strokeWidth="1" />
        {/* Mother and daughter on the sofa */}
        <rect x="40" y="130" width="240" height="50" rx="12" fill="#7d2f2a" stroke={LINE} strokeWidth="1.5" />
        <Guest x={120} y={152} s={1.2} shirt="#ece2cf" skin="#d9a47a" hairStyle="bun" />
        <Guest x={200} y={156} s={1.05} shirt="#7a9fb0" skin="#efc39b" hairStyle="long" />
        <TimeTag t="10/09 00:28" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 00:28" where="Nhà riêng, Long Hòa" />
    <p className="text-[10px]">"Hai mẹ con coi hết tập 40 rồi nè Út" · gửi lúc 00:29</p>
    <p className="text-[10px]">"Ảnh đi đáy chưa về, quên cả điện thoại. Sáng mai ảnh chở con Như lên Chợ Rẫy tái khám" · 00:31</p>
  </Phone>
)

/** Vinh at the wholesale market, 50 km away. */
const X6 = () => (
  <Phone header="Zalo · Nhóm khách sỉ tôm Vinh">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#2f3a3e" />
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={20 + i * 62} y="20" width="40" height="30" fill="#f2c46b" opacity="0.7" />
        ))}
        <rect x="0" y="60" width="320" height="10" fill="#4b5054" />
        <text x="160" y="90" textAnchor="middle" fontSize="12" fill="#e8dcc4" fontFamily="Barlow Condensed, sans-serif">CHỢ ĐẦU MỐI BÌNH ĐIỀN · VỰA SỐ 14</text>
        {/* Big platform scale with a crate of shrimp */}
        <rect x="170" y="150" width="120" height="16" fill="#6f7477" stroke={LINE} strokeWidth="1.5" />
        <rect x="186" y="110" width="88" height="40" fill="#3f8a7e" stroke={LINE} strokeWidth="1.5" />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${196 + i * 13},${124} q6,-8 10,0`} stroke="#ff8a3d" strokeWidth="3" fill="none" />
        ))}
        <rect x="270" y="100" width="40" height="26" fill="#141414" stroke={LINE} strokeWidth="1.2" />
        <text x="290" y="117" textAnchor="middle" fontSize="9" fill="#ff5a3a" fontFamily={mono}>42.6</text>
        <Guest x={110} y={176} s={1.2} shirt="#7a9fb0" skin="#efc39b" />
        <rect x="0" y="190" width="320" height="30" fill="#3a3f44" />
        <TimeTag t="10/09 01:30" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 01:30" where="Chợ Bình Điền, Quận 8" />
    <p className="text-[10px]">"Tôm sú loại 1 về rồi nha, ai lấy báo em" · gửi lúc 01:31</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6 }
