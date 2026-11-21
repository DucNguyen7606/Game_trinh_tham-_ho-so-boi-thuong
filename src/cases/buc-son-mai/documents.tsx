import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { LotusPainting } from './scenes'
import type { PortraitSpec } from '@/art/Portrait'
import type { CaseData } from '@/game/types'
import { iso } from '@/art/iso/iso'
import { FONT, Fb, MONO, PhotoPerson, PhotoStamp } from '@/art/iso/kit'
import caseJson from './case.json'

// What each document in the case-file envelopes looks like, keyed by clue id.


/** A photo of the painting with numbered call-outs. */
function PaintingPhoto({ fake, caption, notes }: { fake?: boolean; caption: string; notes: string[] }) {
  return (
    <div className="bg-[#f4ecdc] p-1.5 shadow">
      <svg viewBox="0 0 300 240" className="block w-full">
        <LotusPainting fake={fake} />
        <g fill="none" stroke="#f2a93b" strokeWidth="2">
          <circle cx="250" cy="46" r="22" />
          <circle cx="262" cy="228" r="26" />
          {!fake && <circle cx="22" cy="212" r="22" />}
        </g>
      </svg>
      <p className="pt-1 font-mono text-[9px] text-[#3a2a20]">{caption}</p>
      <ul className="font-mono text-[9px] text-[#3a2a20]">
        {notes.map((n) => (
          <li key={n}>• {n}</li>
        ))}
      </ul>
    </div>
  )
}

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm tác phẩm nghệ thuật">
    <Row k="Số hợp đồng" v="AT-MT-2025-0310" />
    <Row k="Người được BH" v="Đoàn Ngọc Diệp · Diệp Gallery" />
    <Row k="Tác phẩm" v="Thiếu nữ bên sen (1962)" />
    <Row k="Tác giả" v="Nguyễn Văn Khuê" />
    <Row k="Giá trị BH" v="8.000.000.000 đ" strong />
    <Row k="Hiệu lực" v="10/03/2025" strong />
    <p className="pt-1 text-[10px]">Căn cứ: biên bản thẩm định của ông Lâm Hữu Phong ngày 07/03/2025.</p>
    <p className="text-[10px]">Phạm vi: <Mark>mọi rủi ro mất mát, kể cả khi tác phẩm rời phòng tranh để vận chuyển hoặc phục chế</Mark>.</p>
    <p className="text-[10px] italic">Điều 11: Chỉ bồi thường cho tác phẩm gốc đã được thẩm định. Không bồi thường nếu người được bảo hiểm gian lận.</p>
    <Signature name="Đ. N. Diệp" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Lâm Hữu Phong · Giám định mỹ thuật" title="Biên bản thẩm định 07/03/2025">
    <p>
      Chất liệu: <Mark>vóc gỗ mít, 7 lớp sơn ta</Mark>, son Hà Bắc, vàng quỳ, vỏ trứng.
    </p>
    <PaintingPhoto
      caption="Ảnh chụp khi thẩm định, 07/03"
      notes={['Chuồn chuồn đỏ son, góc trên phải', 'Chữ ký "Khuê 62"', 'Vết rạn chân chim góc dưới trái']}
    />
    <p>
      Kết luận: <b>tác phẩm gốc</b>, định giá 8 tỷ đồng.
    </p>
    <Signature name="L. H. Phong" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công ty An ninh Kiên Bảo" title="Nhật ký hệ thống báo động">
    <p className="text-[10px]">Diệp Gallery · 14 Đồng Khởi. Mã: #01 Đoàn Ngọc Diệp · #02 Trịnh Bảo Ngọc · #03 Tạp vụ</p>
    {[
      ['19/11 21:12', 'BẬT', '#02'],
      ['20/11 01:38', 'TẮT', '#01'],
      ['20/11 01:57', 'BẬT', '#01'],
      ['20/11 07:40', 'TẮT', '#02'],
    ].map(([t, a, c]) => (
      <div key={t} className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
        <span>{t}</span>
        <span>{a}</span>
        <span>{c === '#01' ? <Mark>{c}</Mark> : c}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Không ghi nhận cảnh báo đột nhập nào trong đêm.</p>
  </Sheet>
)

const P4 = () => (
  <Sheet org="Công an phường Bến Nghé" title="Biên bản sự việc">
    <Row k="Phát hiện" v="07:40 ngày 20/11" />
    <Row k="Người báo" v="Trịnh Bảo Ngọc (quản lý)" />
    <p>Cửa sau phòng tranh có dấu cạy ở chốt. Bức sơn mài "Thiếu nữ bên sen" mất khỏi khung. Các tác phẩm khác nguyên vẹn.</p>
    <p>
      Bà Đoàn Ngọc Diệp có mặt lúc <Mark>07:51</Mark>.
    </p>
    <Stamp text="CA P. Bến Nghé" className="bottom-2 right-3" />
    <div className="h-8" />
  </Sheet>
)

const P5 = () => (
  <div className="space-y-1">
    <PaintingPhoto
      fake
      caption="Ảnh khai mạc triển lãm Sen Việt, Diệp Gallery, 05/07/2025"
      notes={['Chuồn chuồn màu vàng', 'Chữ ký "Khuê 1962"', 'Góc dưới trái: không còn vết rạn']}
    />
    <p className="bg-[#f6efe2] p-1 font-mono text-[9px] text-[#3a2a20]">Nguồn: trang báo Mỹ Thuật Online. Tranh vừa phục chế xong.</p>
  </div>
)

const P6 = () => (
  <Sheet org="Diệp Gallery" title="Phiếu giao nhận tác phẩm">
    <Row k="Tác phẩm" v="Thiếu nữ bên sen" />
    <Row k="Việc" v="Phục chế vết rạn góc dưới trái" />
    <Row k="Ngày giao đi" v="02/06/2025" strong />
    <Row k="Ngày nhận về" v="28/06/2025" strong />
    <Row k="Người nhận/giao" v="Tô Minh Quân" strong />
    <p className="pt-1 text-[10px]">Ghi chú khi nhận về: "Đã xử lý rạn, đánh bóng lại toàn bộ. Màu tươi hơn."</p>
    <div className="flex justify-between">
      <Signature name="T. M. Quân" />
      <Signature name="T. B. Ngọc" />
    </div>
  </Sheet>
)

const P7 = () => (
  <div className="rounded-xl bg-[#2e2a4a] p-2 shadow-[0_6px_16px_rgb(46_42_74/0.35)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#5f6a86" />
      <rect y="110" width="320" height="70" fill="#7a809a" />
      <Fb x={230} y={20} w={60} h={90} d={14} c="#4b4760" />
      <text x="260" y="40" textAnchor="middle" fontSize="7" fill="#f6efe3" fontFamily={MONO}>HẺM 14</text>
      {/* A small woman on a turquoise Vespa turning into the alley, a light scarf with a dark edge over her head */}
      <g>
        <PhotoPerson x={150} y={96} s={0.7} look={{ hair: 'long', build: 'thin', mood: 'neutral' }} shirt="#3a3538" skin="#e0b48a" hair="#2e2a3a" />
        <Fb x={136} y={60} w={30} h={12} d={14} c="#f6efe3" />
        <rect x="136" y="70" width="32" height="2" fill="#9a3a2e" />
        <Fb x={124} y={104} w={52} h={8} d={10} c="#4b4760" />
        <Fb x={130} y={110} w={40} h={34} d={16} c="#4fa8a0" />
        <Fb x={142} y={116} w={16} h={9} d={4} c="#fff6d6" />
        <Fb x={144} y={144} w={12} h={26} d={8} c="#2e2a3a" />
      </g>
      <rect width="320" height="180" fill="#2e2a4a" opacity="0.15" />
      <text x="8" y="14" fontSize="9" fill="#f6efe3" fontFamily={MONO}>CAM ĐỒNG KHỞI 03 · NGÃ RẼ HẺM 14</text>
      <text x="312" y="172" fontSize="9" fill="#f6efe3" textAnchor="end" fontFamily={MONO}>20/11/2025 01:36:12</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#d6cfee]">
      Xe Vespa xanh ngọc, người lái quấn khăn sáng màu viền sẫm, dáng nhỏ. 01:59:40 ra, chở một túi dẹt cỡ 1 m.
    </p>
  </div>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P8 = () => (
  <Sheet org="Nhà đấu giá Hải Đăng" title="Email gửi bà Đoàn Ngọc Diệp · 28/10">
    <p>Kính gửi bà Diệp,</p>
    <p>
      Theo quy trình mới, mọi tác phẩm trên 5 tỷ đều được <Mark>kiểm định kỹ thuật ngày 21/11</Mark> tại phòng tranh của bà, gồm chụp hồng ngoại và <Mark>lấy mẫu sơn</Mark>.
    </p>
    <p>Kết quả sẽ được công bố kèm catalogue phiên 22/11.</p>
    <p className="text-[10px] italic">Bà Diệp đã trả lời: "Tôi đồng ý."</p>
  </Sheet>
)

const P9 = () => (
  <Sheet org="Phòng thí nghiệm Vật liệu Mỹ thuật" title="Phiếu kết quả phân tích">
    <Row k="Khách hàng" v="Diệp Gallery" />
    <Row k="Người đặt, nhận kết quả" v="Trịnh Bảo Ngọc · ngoc@diepgallery" strong />
    <Row k="Ngày nhận mẫu" v="06/10/2025" />
    <Row k="Ngày trả kết quả" v="14/10/2025" strong />
    <Row k="Mẫu" v="Vụn sơn, mép dưới tranh" />
    <p className="pt-1">
      Chất kết dính: <Mark>nhựa acrylic</Mark>, không phát hiện sơn ta (nhựa cây sơn).
    </p>
    <p>
      Kết luận: <Mark>không phù hợp niên đại 1962</Mark>.
    </p>
    <p className="text-[10px] italic">Kết quả chỉ gửi qua email người đặt. Bản lưu do cơ quan điều tra yêu cầu.</p>
    <Stamp text="PTN · Bản lưu" className="bottom-2 right-3" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Ngân hàng · Trích sao kê theo yêu cầu cơ quan điều tra" title="Tài khoản Tô Minh Quân">
    {[
      ['28/06', 'Diệp Gallery · phi phuc che', '+ 45.000.000'],
      ['03/07', 'HUA VINH THANH · thanh toan tac pham', '+ 2.500.000.000'],
      ['10/07', 'Mua xe Ford Ranger', '− 980.000.000'],
      ['16/10', 'TRINH BAO NGOC · gui em', '− 100.000.000'],
      ['20/11', 'TRINH BAO NGOC · phan con lai', '− 200.000.000'],
    ].map(([d, n, v]) => (
      <div key={d} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{n.startsWith('HUA') || n.startsWith('TRINH') ? <Mark>{n}</Mark> : n}</span>
        <span className="text-right">{v}</span>
      </div>
    ))}
  </Sheet>
)

const P11 = () => (
  <div className="space-y-1 bg-[#f6efe2] p-2 shadow">
    <p className="title text-sm text-[#2d1f18]">Nhà Đẹp · số tháng 9/2025</p>
    <p className="font-sans text-[10px] text-[#2d1f18]">"Căn biệt thự Phú Mỹ Hưng của nhà sưu tầm Hứa Vĩnh Thành: phòng khách được 'giữ hồn' bằng một bức sơn mài sen cổ."</p>
    <svg viewBox="0 0 300 200" className="block w-full">
      <rect width="300" height="200" fill="#efe4d4" />
      <rect y="150" width="300" height="50" fill="#c9a98a" />
      <Fb x={20} y={112} w={140} h={44} d={22} c="#c9a274" />
      <Fb x={28} y={98} w={30} h={20} d={10} c="#f6efe3" />
      <Fb x={124} y={98} w={30} h={20} d={10} c="#e46b4f" />
      <Fb x={134} y={14} w={142} h={116} d={8} c="#5a2f22" />
      <g transform="translate(140 20)">
        <LotusPainting w={130} />
      </g>
      <Fb x={190} y={160} w={70} h={16} d={20} c="#a07c5a" />
      <Fb x={250} y={130} w={10} h={30} d={10} c="#7fae8a" />
      <circle cx="248" cy="40" r="10" fill="none" stroke="#f2a93b" strokeWidth="2" />
      <circle cx="150" cy="114" r="10" fill="none" stroke="#f2a93b" strokeWidth="2" />
    </svg>
    <p className="font-mono text-[9px] text-[#3a2a20]">Chuồn chuồn đỏ son, vết rạn góc dưới trái, chữ ký "Khuê 62".</p>
  </div>
)

const X1 = () => (
  <div className="space-y-2">
    <Phone header="Chị Thảo · An Tín">
      <p className="text-center text-[9px] opacity-50">12/11/2025</p>
      <Bubble time="16:02">Chị ơi tranh mà bị mất thì bảo hiểm trả bao nhiêu vậy chị?</Bubble>
      <Bubble me time="16:20">Theo giá trị trên hợp đồng em, nhưng phải giám định đã.</Bubble>
    </Phone>
    <div className="bg-[#f6efe2] p-2 font-sans text-[10px] text-[#2d1f18] shadow">
      <p className="font-semibold">Thông báo nhắc nợ thẻ tín dụng</p>
      <p>Chủ thẻ: TRINH BAO NGOC · Dư nợ quá hạn: 180.000.000 đ</p>
    </div>
  </div>
)

const X2 = () => (
  <Sheet org="Lâm Hữu Phong · Giám định mỹ thuật" title="Hóa đơn phí thẩm định">
    <Row k="Khách hàng" v="Diệp Gallery" />
    <Row k="Dịch vụ" v="Thẩm định gấp 3 ngày" />
    <Row k="Phí" v="120.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Mức phí thường: 40.000.000 đ.</p>
    <p className="text-[10px] italic">Lần thẩm định trước (2019): 4 tỷ đồng.</p>
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

/** Diệp's "can't sleep" post at 01:44: pyjamas, bare neck, the clock behind her. She is home while the gallery is entered. */
const X3 = () => (
  <Phone header="Trang cá nhân · Ngọc Diệp Gallery">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#ece0cf" />
        {/* Night window */}
        <Fb x={200} y={20} w={100} h={120} d={10} c="#f6efe3" />
        <rect x="206" y="26" width="88" height="108" fill="#4b4f7a" />
        <rect x="248" y="26" width="4" height="108" fill="#f6efe3" />
        <rect x="206" y="78" width="88" height="4" fill="#f6efe3" />
        {/* Wall clock at a quarter to two */}
        <Fb x={40} y={30} w={40} h={40} d={6} c="#fffaf0" />
        <rect x="59" y="38" width="2" height="12" fill={iso.ink} transform="rotate(45 60 50)" />
        <rect x="48" y="49" width="12" height="2" fill={iso.ink} />
        {/* Diệp with the dog, in striped pyjamas, nothing round her neck */}
        <PhotoPerson x={124} y={150} s={1.45} spec={cast.diep} look={{ mood: 'neutral', accessory: ['glasses'] }} shirt="#9fb4c8" />
        {[104, 116, 128, 140].map((x) => (
          <rect key={x} x={x} y="146" width="3" height="40" fill="#f6efe3" opacity="0.8" />
        ))}
        <Fb x={52} y={156} w={46} h={26} d={16} c="#fffaf0" />
        <Fb x={44} y={140} w={22} h={20} d={12} c="#fffaf0" />
        <rect x="49" y="147" width="3" height="3" fill={iso.ink} />
        <rect x="58" y="147" width="3" height="3" fill={iso.ink} />
        <rect x="40" y="141" width="5" height="12" fill="#e9dccb" />
        {/* Bedside table: a cup of tea and a strip of sleeping pills */}
        <Fb x={-4} y={186} w={330} h={34} d={24} c="#a07c5a" />
        <Fb x={232} y={164} w={22} h={22} d={14} c="#f6efe3" />
        <Fb x={268} y={180} w={36} h={6} d={14} c="#d8dde2" />
        {[274, 282, 290, 298].map((x) => (
          <rect key={x} x={x} y="181.5" width="3.5" height="3" fill="#fff" />
        ))}
        <TimeTag t="20/11 01:44" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 01:44" where="Thảo Điền, TP Thủ Đức" />
    <p className="text-[10px]">"Mất ngủ, có bé Mochi canh 🐶" · 41 lượt thích</p>
  </Phone>
)

const X4 = () => (
  <Phone header="Story · ngoc.baotrinh">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5b4a7c" />
        <circle cx="60" cy="40" r="60" fill="#e46b9a" opacity="0.35" />
        <circle cx="280" cy="50" r="70" fill="#5fb3a3" opacity="0.35" />
        <Fb x={90} y={22} w={140} h={30} d={10} c={iso.ink} />
        <text x="160" y="42" textAnchor="middle" fontSize="12" fontWeight="800" fill={iso.gold} fontFamily={FONT}>BÙI VIỆN · ĐÊM THỨ TƯ</text>
        <PhotoPerson x={80} y={170} look={{ hair: 'long', build: 'thin', skin: 0 }} shirt="#e2a63b" />
        <PhotoPerson x={160} y={162} s={1.25} spec={cast.ngoc} look={{ mood: 'smile' }} />
        <PhotoPerson x={240} y={170} look={{ hair: 'short' }} shirt="#2f4258" />
        {/* LED clock above the bar: the photo was taken long before it was posted */}
        <Fb x={250} y={70} w={56} h={22} d={8} c="#211a33" />
        <text x="278" y="86" textAnchor="middle" fontSize="13" fill="#ff8a5c" fontFamily={MONO}>00:14</text>
        <Fb x={-4} y={196} w={330} h={24} d={20} c="#3d2f5a" />
        <TimeTag t="Đăng 01:35" />
      </svg>
    </div>
    <PhotoMeta when="Đăng lúc 01:35 · 20/11/2025" where="Phố đi bộ Bùi Viện, Q.1" />
    <p className="text-[10px]">"Thứ tư mà như thứ bảy 🍹" · được 3 người bạn gắn thẻ</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Live · Xưởng Sơn Quân" dark>
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e3d6c2" />
        <Fb x={20} y={30} w={90} h={60} d={8} c="#c9a274" />
        <rect x="26" y="36" width="78" height="48" fill="#fffaf0" opacity="0.85" />
        <PhotoPerson x={120} y={160} s={1.2} spec={cast.quan} look={{ mood: 'neutral' }} />
        <PhotoPerson x={234} y={168} s={0.95} look={{ hair: 'short', skin: 1 }} shirt="#7a9fb0" />
        {/* the work table and the lacquer panel he is sanding */}
        <Fb x={-4} y={184} w={330} h={36} d={30} c="#a07c5a" />
        <Fb x={86} y={174} w={140} h={10} d={24} c="#1d1513" />
        <rect x="104" y="176" width="40" height="3" fill={iso.gold} />
        <rect x="8" y="8" width="58" height="16" rx="6" fill="#d6453a" />
        <text x="37" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={MONO}>● LIVE</text>
        <rect x="200" y="8" width="112" height="16" rx="6" fill={iso.ink} opacity="0.55" />
        <text x="256" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={MONO}>01:00 → 02:20</text>
      </svg>
    </div>
    <div className="space-y-0.5 rounded bg-white/10 p-1.5 text-[10px]">
      <p><b>hoc_son_mai</b>: thầy mài nhẹ tay vậy hả thầy</p>
      <p><b>Tí (học trò)</b>: 1g45 rồi mà thầy chưa cho em về 😭</p>
    </div>
    <PhotoMeta when="20/11/2025 · 01:00–02:20" where="Xưởng Bình Thạnh" />
  </Phone>
)

const X6 = () => (
  <Phone header="Thư viện ảnh · Hữu Phong">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#4b4f7a" />
        {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
          <Fb key={x} x={x} y={92 - (i % 3) * 10} w={40} h={38 + (i % 3) * 10} d={8} c="#3f6b5a" />
        ))}
        <rect y="128" width="320" height="92" fill="#5d7f9a" />
        <rect x="40" y="140" width="240" height="3" fill="#ffe1a0" opacity="0.5" />
        <rect x="80" y="160" width="160" height="3" fill="#ffe1a0" opacity="0.35" />
        {[40, 100, 260].map((x) => (
          <g key={x}>
            <Fb x={x - 2} y={70} w={4} h={56} d={4} c="#9aa3b5" />
            <Fb x={x - 6} y={62} w={12} h={8} d={8} c="#ffe1a0" />
          </g>
        ))}
        <text x="160" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill="#f6efe3" fontFamily={FONT}>Hồ Xuân Hương</text>
        <TimeTag t="20/11 01:20" />
      </svg>
    </div>
    <PhotoMeta when="20/11/2025 · 01:20" where="Hồ Xuân Hương, Đà Lạt" />
    <p className="text-[10px]">Kèm vé tham dự "Hội thảo Bảo tồn mỹ thuật" 19–21/11, khách sạn Đà Lạt.</p>
  </Phone>
)

/** Diệp asked to delay the inspection. Looks like she knew; she wanted to be there for it. */
const X7 = () => (
  <Phone header="Email · Diệp Gallery → Hải Đăng">
    <p className="font-semibold">Về buổi kiểm định ngày 21/11</p>
    <p className="rounded-md bg-white/70 p-2">
      "Chào anh Vĩnh, chị xin dời buổi kiểm định ngày 21/11 sang đầu tháng 12 được không? Chị muốn có mặt khi các anh lấy mẫu." · 15/11 08:12
    </p>
    <p className="rounded-md bg-[#d7ecd9] p-2 text-right">"Dạ không dời được chị, lịch chuyên gia đã chốt. Bên em vẫn lấy mẫu ngày 21 ạ." · 15/11 10:40</p>
    <p className="rounded-md bg-white/70 p-2">"Ok em, cứ làm theo lịch." · 15/11 10:52</p>
  </Phone>
)

/** The reason for X7: her daughter's wedding abroad on the same day. */
const X8 = () => (
  <Phone header="Thư viện ảnh · Ngọc Diệp">
    <div className="rounded-md bg-[#f3e4d4] p-3 text-center text-[#5a2a2a]">
      <p className="text-[9px] uppercase tracking-widest opacity-70">Trân trọng kính mời</p>
      <p className="title text-base">Lễ thành hôn</p>
      <p className="text-[11px]">Đoàn Ngọc Mai & Lim Wei Jie</p>
      <p className="mt-1 text-[10px]">
        <Mark>11 giờ, thứ Sáu 21/11/2025</Mark>
      </p>
      <p className="text-[10px]">Khách sạn Fullerton, Singapore</p>
    </div>
    <p className="text-[10px]">Lời nhắn của Mai: "Mẹ bay sáng 21 nha, con đặt vé rồi đó." · 02/11</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8 }
