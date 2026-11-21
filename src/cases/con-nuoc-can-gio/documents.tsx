import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import type { PortraitSpec } from '@/art/Portrait'
import type { CaseData } from '@/game/types'
import { iso } from '@/art/iso/iso'
import { FONT, Fb, MONO, PhotoPerson, PhotoStamp } from '@/art/iso/kit'
import caseJson from './case.json'

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
  <Sheet org="Hiệu vàng Kim Hưng · Bình Khánh" title="Hóa đơn bán lẻ">
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
  <div className="rounded-xl bg-[#2e2a4a] p-2 shadow-[0_6px_16px_rgb(46_42_74/0.35)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#5f6a86" />
      <rect y="110" width="320" height="70" fill="#7a809a" />
      <rect y="108" width="320" height="3" fill="#f2c46d" />
      {/* the ferry ramp barrier, and a man on a motorbike with a styrofoam box, seen from the front */}
      <Fb x={20} y={70} w={70} h={40} d={10} c="#9aa3b5" />
      <Fb x={250} y={60} w={60} h={50} d={10} c="#9aa3b5" />
      <g>
        <Fb x={168} y={70} w={36} h={30} d={20} c="#f6efe3" />
        <PhotoPerson x={135} y={86} s={0.75} spec={cast.tam} />
        <Fb x={110} y={104} w={50} h={8} d={10} c="#4b4760" />
        <Fb x={118} y={110} w={34} h={30} d={14} c="#8f7aa3" />
        <Fb x={127} y={116} w={16} h={9} d={4} c="#fff6d6" />
        <Fb x={129} y={140} w={12} h={30} d={8} c="#2e2a3a" />
      </g>
      <rect width="320" height="180" fill="#2e2a4a" opacity="0.18" />
      <text x="8" y="14" fontSize="9" fill="#f6efe3" fontFamily={MONO}>PHÀ BÌNH KHÁNH · CAM 3 · CHIỀU ĐI TP</text>
      <text x="312" y="172" fontSize="9" fill="#f6efe3" textAnchor="end" fontFamily={MONO}>10/09/2025 02:16:38</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#d6cfee]">Xe Dream 54-H1 ••• (chủ xe: Nguyễn Văn Tâm). Chiều về: 04:41:09.</p>
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
      <Mark>Đừng cho bà ấy biết gì cả. Bà ấy không biết thì khóc mới thật</Mark>, bảo hiểm mới tin. Sáng ra mày báo ghe úp.
    </Bubble>
    <Bubble time="21:45">Còn tám tháng lương của tôi?</Bubble>
    <Bubble me time="21:46">Bà ấy nhận tiền rồi tao gửi mày. Vàng tao giữ.</Bubble>
    <p className="text-right text-[8px] opacity-50">Tin đã bị xóa ngày 09/09 · bà Hồng giao nộp máy 17/09 · khôi phục 18/09</p>
  </Phone>
)

const P11 = () => (
  <Sheet org="Hiệu vàng Ngọc Thẩm · Quận 8" title="Biên nhận mua vàng của khách">
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
      <Bubble me time="23:30">Cố chờ đến tháng Chạp anh trả đủ.</Bubble>
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

const cast = Object.fromEntries((caseJson as CaseData).suspects.map((s) => [s.id, s.portrait])) as Record<string, PortraitSpec>

const TimeTag = ({ t }: { t: string }) => <PhotoStamp t={t} />

/** Khang at the snail shop by the ferry: the TV and the wall clock pin him there after midnight. */
const X3 = () => (
  <Phone header="Trang cá nhân · Khang Bình Khánh">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#6a5a8a" />
        <rect y="150" width="320" height="70" fill="#5a4b78" />
        {/* String lights and the shop sign */}
        <path d="M0,24 Q160,50 320,20" fill="none" stroke={iso.ink} strokeWidth="1.2" opacity="0.6" />
        {Array.from({ length: 13 }, (_, i) => (
          <Fb key={i} x={8 + i * 25} y={22 + Math.sin((i / 12) * Math.PI) * 14} w={5} h={5} d={6} c="#ffe1a0" />
        ))}
        <Fb x={16} y={40} w={120} h={24} d={10} c={iso.blue} />
        <text x="76" y="56" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fff" fontFamily={FONT}>ỐC ĐẦU PHÀ BÌNH KHÁNH</text>
        {/* TV showing a late match, minute 90+2 */}
        <Fb x={200} y={40} w={96} h={58} d={12} c={iso.ink} />
        <rect x="206" y="46" width="84" height="46" fill="#3f9e63" />
        <rect x="210" y="50" width="52" height="11" rx="2" fill="#000" opacity="0.6" />
        <text x="236" y="58" textAnchor="middle" fontSize="7" fill="#fff" fontFamily={MONO}>1-1  90+2'</text>
        {/* Wall clock at a quarter past twelve */}
        <Fb x={146} y={66} w={28} h={28} d={6} c="#fffaf0" />
        <rect x="159" y="70" width="2" height="11" fill={iso.ink} />
        <rect x="159" y="79" width="8" height="2" fill={iso.ink} />
        <text x="160" y="106" textAnchor="middle" fontSize="7" fill="#f6efe3" fontFamily={MONO}>00:15</text>
        <PhotoPerson x={62} y={174} look={{ hair: 'short' }} shirt="#7a9fb0" />
        <PhotoPerson x={160} y={168} s={1.2} spec={cast.khang} look={{ mood: 'smile' }} />
        <PhotoPerson x={252} y={174} look={{ hair: 'buzz', skin: 2 }} shirt="#d9a441" />
        {/* Table with plates of snails */}
        <Fb x={-4} y={190} w={330} h={30} d={26} c="#d88a5c" />
        {[40, 112, 196, 266].map((x) => (
          <Fb key={x} x={x} y={188} w={28} h={4} d={14} c="#f6efe3" />
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
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#d6cfee" />
        <rect y="40" width="320" height="40" fill="#f6d2bd" />
        {/* far mangrove line */}
        {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
          <Fb key={x} x={x} y={58 - (i % 3) * 6} w={40} h={22 + (i % 3) * 6} d={8} c="#6f9e78" />
        ))}
        <rect y="80" width="320" height="88" fill="#8fb8c9" />
        <rect x="20" y="100" width="90" height="2" fill="#b9d6e2" />
        <rect x="200" y="140" width="80" height="2" fill="#b9d6e2" />
        {/* fishing stakes and the upturned hull caught on them */}
        {[60, 90, 230, 260].map((x) => (
          <Fb key={x} x={x} y={62} w={4} h={92} d={4} c="#b98f6e" />
        ))}
        <Fb x={74} y={110} w={172} h={16} d={16} c="#3f6b6a" />
        <rect x="74" y="122" width="172" height="4" fill="#c4523c" />
        {/* grey bank in front, his canoe, and his boots caked in red mud */}
        <rect y="168" width="320" height="52" fill="#bdb5ab" />
        <Fb x={180} y={178} w={140} h={18} d={16} c="#8a6c58" />
        {[40, 86].map((x) => (
          <g key={x}>
            <Fb x={x} y={146} w={24} h={44} d={12} c="#2e2a3a" />
            <Fb x={x} y={186} w={36} h={14} d={14} c="#2e2a3a" />
            <rect x={x} y="172" width="24" height="18" fill="#c4643f" />
            <rect x={x} y="190" width="36" height="10" fill="#c4643f" />
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
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#cfe0d2" />
        <rect y="160" width="320" height="60" fill="#e6d6c6" />
        {/* Shelf behind them: the TV, and Lực's own phone charging, left at home */}
        <Fb x={20} y={70} w={280} h={10} d={18} c="#a07c5a" />
        <Fb x={196} y={18} w={96} h={52} d={12} c={iso.ink} />
        <rect x="202" y="24" width="84" height="40" fill="#8f7aa3" />
        <Fb x={44} y={36} w={20} h={34} d={4} c="#1d1d22" />
        <rect x="47" y="40" width="14" height="24" fill="#5d8ea3" />
        <path d="M54,70 q0,10 -14,10" stroke="#fffaf0" strokeWidth="1.5" fill="none" />
        <text x="54" y="30" textAnchor="middle" fontSize="5.5" fill={iso.ink} fontFamily={MONO}>⚡ 100%</text>
        <Fb x={100} y={50} w={20} h={20} d={10} c="#7fae8a" />
        {/* Mother and daughter on the sofa */}
        <Fb x={36} y={120} w={248} h={28} d={20} c="#c4523c" />
        <PhotoPerson x={120} y={156} s={1.2} spec={cast.hong} look={{ mood: 'neutral' }} />
        <PhotoPerson x={204} y={160} s={1.05} look={{ hair: 'long', build: 'thin', skin: 0, mood: 'smile' }} shirt="#7a9fb0" />
        <Fb x={20} y={180} w={280} h={40} d={20} c="#b8452f" />
        <TimeTag t="10/09 00:28" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 00:28" where="Nhà riêng, Long Hòa" />
    <p className="text-[10px]">"Hai mẹ con xem hết tập 40 rồi đây Út ơi" · gửi lúc 00:29</p>
    <p className="text-[10px]">"Anh ấy đi đáy chưa về, quên cả điện thoại. Sáng mai anh ấy chở con Như lên Chợ Rẫy tái khám" · 00:31</p>
  </Phone>
)

/** Vinh at the wholesale market, 50 km away. */
const X6 = () => (
  <Phone header="Zalo · Nhóm khách sỉ tôm Vinh">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#6c6787" />
        {Array.from({ length: 5 }, (_, i) => (
          <Fb key={i} x={20 + i * 62} y={18} w={40} h={14} d={8} c="#ffe1a0" />
        ))}
        <Fb x={0} y={60} w={330} h={36} d={10} c={iso.blue} />
        <text x="160" y="82" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily={FONT}>CHỢ ĐẦU MỐI BÌNH ĐIỀN · VỰA SỐ 14</text>
        {/* Big platform scale with a crate of shrimp */}
        <Fb x={170} y={150} w={120} h={16} d={20} c={iso.metal} />
        <Fb x={186} y={110} w={88} h={40} d={20} c="#3f8a7e" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={194 + i * 13} y="116" width="8" height="5" rx="2" fill="#ff8a5c" />
        ))}
        <Fb x={272} y={100} w={40} h={26} d={8} c={iso.ink} />
        <text x="292" y="117" textAnchor="middle" fontSize="9" fill="#ff8a5c" fontFamily={MONO}>42.6</text>
        <PhotoPerson x={110} y={172} s={1.2} spec={cast.vinh} look={{ mood: 'smile' }} />
        <rect x="0" y="190" width="320" height="30" fill="#4b4760" />
        <TimeTag t="10/09 01:30" />
      </svg>
    </div>
    <PhotoMeta when="10/09/2025 · 01:30" where="Chợ Bình Điền, Quận 8" />
    <p className="text-[10px]">"Tôm sú loại 1 về rồi nhé, ai lấy báo em" · gửi lúc 01:31</p>
  </Phone>
)

/** Mediation record: Khang's threat in his own hand. Loud, but he was at the ferry all night. */
const X7 = () => (
  <Sheet org="UBND xã Long Hòa · Tổ hòa giải" title="Biên bản hòa giải">
    <Row k="Ngày" v="08/08/2025" />
    <Row k="Bên cho vay" v="Lý Minh Khang" />
    <Row k="Bên vay" v="Trương Văn Lực" />
    <Row k="Số nợ" v="1.800.000.000 đ" strong />
    <p>Ông Lực xin khất tới <b>10/09/2025</b>, ông Khang đồng ý.</p>
    <p>
      Ghi thêm tay bên lề: <Mark>"Quá hạn tôi tự xử. — Khang"</Mark>
    </p>
    <Signature name="M. Khang" />
  </Sheet>
)

/** Hồng's rotating-savings book: explains both her savings account and her "tomorrow it's all over" text. */
const X8 = () => (
  <Phone header="Thư viện ảnh · Hồng">
    <div className="rounded-md bg-[#efe3c8] p-2 font-mono text-[10px] text-[#2d1f18]">
      <p className="mb-1 text-center font-semibold">SỔ HỤI CHỊ TƯ BẾN ĐÒ · DÂY 10 TRIỆU</p>
      {[
        ['10/01', 'Kỳ 1', 'đóng'],
        ['18/05', 'Kỳ 5', 'HỐT 200tr'],
        ['10/08', 'Kỳ 8', 'đóng'],
        ['10/09', 'Kỳ cuối', 'đóng xong'],
      ].map(([a, b, c]) => (
        <div key={a} className="grid grid-cols-[40px_1fr_auto] gap-1 border-b border-dotted border-black/25">
          <span>{a}</span>
          <span>{b}</span>
          <span>{c}</span>
        </div>
      ))}
      <p className="pt-1 text-[9px] opacity-70">Ghi tay: "hốt xong gửi ngân hàng, để dành cho con Như mổ mắt".</p>
    </div>
    <PhotoMeta when="13/09/2025 · 09:20" where="Nhà riêng, Long Hòa" />
  </Phone>
)

/** Hồng's text to her sister at 21:15. Sounds like she knew. She meant the last savings-circle payment. */
const X9 = () => (
  <Phone header="Tin nhắn · Út Lan (Bình Dương)">
    <p className="rounded-md bg-white/70 p-2">"Anh ấy đi rồi. Mai là xong hết rồi, em đừng lo cho chị nữa." · 21:15</p>
    <p className="rounded-md bg-[#d7ecd9] p-2 text-right">"Vâng, xong rồi chị ngủ cho ngon nhé. Lo mãi bạc tóc." · 21:17</p>
    <p className="text-[10px] opacity-70">Trích từ điện thoại bà Hồng, đêm 9/9/2025.</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8, X9 }
