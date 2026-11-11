import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { C } from './scenes'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm nhà tư nhân và tài sản giá trị cao">
    <Row k="Số hợp đồng" v="AT-NTN-2025-2708" />
    <Row k="Người được BH" v="Lâm Bảo Ngọc" />
    <Row k="Địa điểm" v="Căn 27.08, CC Riverlight, Bình Thạnh" />
    <p className="pt-1 text-[10px]">
      Điều 4: bảo hiểm mất trộm <Mark>có dấu hiệu đột nhập, hoặc kẻ trộm dùng chìa, thẻ, mã có được trái phép</Mark>.
    </p>
    <p className="text-[10px] italic">
      Điều 9, loại trừ: tài sản bị người nhà, người giúp việc của người được bảo hiểm lấy; tài sản do người được bảo hiểm tự ý giao cho người khác.
    </p>
    <p className="text-[10px]">Hợp đồng không có điều khoản giảm trừ vì để lộ mã.</p>
    <Signature name="L. B. Ngọc" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="21/12/2025" />
    <Row k="Sự cố" v="Mất trộm két sắt, căn 27.08" />
    <Row k="Rolex Daytona" v="1.100.000.000 đ" />
    <Row k="Patek Philippe Aquanaut" v="1.400.000.000 đ" />
    <Row k="Bộ trang sức kim cương" v="700.000.000 đ" />
    <Row k="Tổng yêu cầu" v="3.200.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Tôi đi Hà Nội từ chiều 20/12, sáng 21/12 về tới nhà thì phát hiện két mở.</p>
    <Signature name="L. B. Ngọc" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Hồ sơ đi lại do người yêu cầu bồi thường nộp" title="Vé máy bay và xác nhận khách sạn">
    <div className="grid grid-cols-2 gap-2 text-[10px]">
      <div className="border border-dashed border-black/30 p-1">
        <p className="font-bold">SGN → HAN</p>
        <p>20/12 · 16:40</p>
        <p>LAM BAO NGOC · 14C</p>
      </div>
      <div className="border border-dashed border-black/30 p-1">
        <p className="font-bold">HAN → SGN</p>
        <p>21/12 · 06:05</p>
        <p>Hạ cánh <Mark>08:15</Mark></p>
      </div>
    </div>
    <Row k="Khách sạn" v="Hồ Gươm, Hoàn Kiếm, Hà Nội" />
    <Row k="Nhận phòng" v="20/12 · 19:20" strong />
    <Row k="Trả phòng" v="21/12 · 05:10" strong />
    <div className="h-12" />
    <Stamp text="Đã xác minh" className="bottom-2 right-3" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Công an phường 22, quận Bình Thạnh" title="Biên bản khám nghiệm hiện trường · 21/12">
    <Row k="Cửa chính" v="Không dấu hiệu cạy phá" />
    <Row k="Ban công" v="Chốt trong, không dấu vết" />
    <Row k="Két sắt" v="Không bị cạy, không bị khoan" strong />
    <p className="pt-1 text-[10px]">
      Nhận định ban đầu: <Mark>người lấy có mã hoặc có chìa</Mark>. Đề nghị xác minh những người ra vào căn hộ.
    </p>
    <Signature name="Đại úy T. V. Minh" />
    <Stamp text="CA P.22" className="bottom-2 left-6" />
  </Sheet>
)

const P5 = () => (
  <Sheet org="Hãng khóa SmartHome · Trích xuất theo yêu cầu" title="Nhật ký khóa cửa căn 27.08">
    <p className="text-[10px] font-bold">Người dùng trên khóa</p>
    {[
      ['#01', 'Vân tay · Ngọc', '03/2023'],
      ['#02', 'Vân tay · chị Hai', '01/2024'],
      ['#03', 'Vân tay · Bảo', 'đã xóa 15/10'],
      ['#09', 'Thẻ từ · không tên', '06/12 15:42'],
    ].map(([n, k, v]) => (
      <div key={n} className="grid grid-cols-[2rem_1fr_auto] gap-x-2 border-b border-dotted border-black/20 text-[10px]">
        <span>{n}</span>
        <span>{n === '#09' ? <Mark>{k}</Mark> : k}</span>
        <span>{n === '#09' ? <Mark>{v}</Mark> : v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] font-bold">Sự kiện 20–21/12</p>
    {[
      ['20/12 13:02', 'Khóa từ ngoài (#01)'],
      ['21/12 02:14', 'Mở bằng thẻ #09'],
      ['21/12 02:28', 'Khóa lại'],
      ['21/12 09:05', 'Mở bằng vân tay #01'],
    ].map(([t, e]) => (
      <div key={t} className="grid grid-cols-[5.5rem_1fr] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
        <span>{t}</span>
        <span>{e.includes('#09') ? <Mark>{e}</Mark> : e}</span>
      </div>
    ))}
  </Sheet>
)

const P6 = () => (
  <Sheet org="Ban quản lý chung cư Riverlight" title="Phiếu bảo trì số 1206-27">
    <Row k="Ngày" v="06/12/2025" />
    <Row k="Căn hộ" v="27.08" />
    <Row k="Nội dung" v="Thay pin khóa điện tử" />
    <Row k="Kỹ thuật viên" v="Trịnh Hoàng Vũ" strong />
    <Row k="Thời gian" v="15:30 – 16:10" strong />
    <p className="pt-1 text-[10px] italic">Chủ nhà vắng. Người ký nhận: Nguyễn Thị Hai (giúp việc).</p>
    <Signature name="N. T. Hai" />
  </Sheet>
)

const P7 = () => (
  <Sheet org="Ban quản lý chung cư Riverlight · Hệ thống thẻ thang máy" title="Nhật ký đêm 20–21/12, tầng 27">
    <p className="text-[10px] font-bold">Thang khách 1–4</p>
    <p className="text-[10px]">23:00 – 09:00: không lượt nào dừng tầng 27, trừ 09:02 thẻ cư dân 27.08.</p>
    <p className="pt-1 text-[10px] font-bold">Thang hàng</p>
    {[
      ['02:09', 'KT-03', 'B2 → 27'],
      ['02:31', 'KT-03', '27 → B2'],
      ['05:40', 'VS-02', 'B2 → 1'],
    ].map(([t, c, r]) => (
      <div key={t} className="grid grid-cols-[3rem_3rem_1fr] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
        <span>{t}</span>
        <span>{c === 'KT-03' ? <Mark>{c}</Mark> : c}</span>
        <span>{r}</span>
      </div>
    ))}
    <Stamp text="BQL Riverlight" className="bottom-2 right-3" />
    <div className="h-6" />
  </Sheet>
)

const P8 = () => (
  <Sheet org="Trung tâm Giám định Đồng hồ và Trang sức Sài Gòn" title="Hóa đơn và giấy giám định">
    <Row k="Patek Philippe Aquanaut" v="mua 15/11/2025" />
    <Row k="Nơi bán" v="Đại lý chính hãng, Q.1" />
    <Row k="Rolex Daytona thép" v="mua 08/2024" />
    <Row k="Số máy Rolex" v="7Y3K2109" strong />
    <Row k="Bộ kim cương" v="GIA, 2,1 carat tổng" />
    <p className="pt-1 text-[10px]">
      Giám định ngày 17/11 <Mark>theo yêu cầu của An Tín</Mark> trước khi cấp phụ lục tài sản giá trị cao. Kết luận: hàng thật, giá trị 3,2 tỷ.
    </p>
    <div className="h-12" />
    <Stamp text="Hàng thật" className="bottom-2 right-3" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Ban quản lý Riverlight · Phòng kỹ thuật" title="Sổ giao nhận thẻ kỹ thuật">
    {[
      ['KT-01', 'Trưởng kỹ thuật', 'nghỉ phép 18–24/12'],
      ['KT-02', 'Ca ngày', 'trả 18:00'],
      ['KT-03', 'Ca đêm 20/12', 'Trịnh Hoàng Vũ · nhận 21:55'],
    ].map(([c, k, v]) => (
      <div key={c} className="grid grid-cols-[3rem_5.5rem_1fr] gap-x-2 border-b border-dotted border-black/20 text-[10px]">
        <span className="font-mono">{c}</span>
        <span>{k}</span>
        <span>{c === 'KT-03' ? <Mark>{v}</Mark> : v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">KT-03 trả lại lúc 06:02 ngày 21/12.</p>
    <Signature name="T. H. Vũ" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Đồng hồ cũ Minh Quang · 214 Lê Văn Sỹ, Tân Bình" title="Biên bản mua lại đồng hồ · 23/12/2025">
    <Row k="Món hàng" v="Rolex Daytona thép, không hộp" />
    <Row k="Số máy" v="7Y3K2109" strong />
    <Row k="Giá mua" v="650.000.000 đ" />
    <Row k="Người bán" v="Trịnh Hoàng Vũ" strong />
    <div className="mt-1 flex gap-2">
      <svg viewBox="0 0 120 76" className="w-28 shrink-0">
        <rect width="120" height="76" rx="6" fill="#d9e6ec" stroke={LINE} strokeWidth="1.5" />
        <rect x="8" y="14" width="34" height="44" fill="#b9815a" stroke={LINE} strokeWidth="1" />
        <path d="M10,22 Q25,8 40,22 L40,26 L10,26 Z" fill="#1a1a1f" />
        {[18, 30, 42, 54].map((y) => (
          <rect key={y} x="50" y={y} width={60 - (y % 3) * 6} height="4" fill="#7a8a94" />
        ))}
        <text x="60" y="10" fontSize="7" fill={LINE} fontFamily={mono}>CĂN CƯỚC</text>
      </svg>
      <p className="text-[10px]">Bản sao CCCD người bán đính kèm. Nhân viên tiệm báo công an sau khi An Tín phát thông báo số máy.</p>
    </div>
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P11 = () => (
  <Phone header="Tin nhắn · Vũ (trích xuất)">
    <p className="text-center text-[9px] opacity-50">App vay TienNhanh</p>
    <Bubble time="28/11">Khoản vay 310.000.000đ của quý khách đã quá hạn. Chúng tôi sẽ liên hệ người thân.</Bubble>
    <Bubble time="15/12">Đã gửi thông báo tới nơi làm việc của quý khách.</Bubble>
    <Bubble time="24/12">Quý khách đã tất toán toàn bộ khoản vay. Cảm ơn quý khách.</Bubble>
  </Phone>
)

const X1 = () => (
  <Sheet org="Ngân hàng TMCP Phương Đông" title="Thông báo nhắc nợ quá hạn">
    <Row k="Khách hàng" v="Lâm Bảo Ngọc" />
    <Row k="Khoản vay" v="Vay kinh doanh 1.200.000.000 đ" />
    <Row k="Quá hạn" v="45 ngày" strong />
    <p className="pt-1 text-[10px]">Đề nghị quý khách thanh toán trước ngày 31/12/2025 để tránh chuyển nợ xấu.</p>
    <div className="h-12" />
    <Stamp text="Nhắc nợ" className="bottom-2 right-3" />
  </Sheet>
)

const X2 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Phụ lục 01 · Tài sản giá trị cao">
    <Row k="Ngày ký" v="18/11/2025" strong />
    <Row k="Tài sản" v="2 đồng hồ, 1 bộ trang sức" />
    <Row k="Số tiền BH" v="3.200.000.000 đ" strong />
    <p className="pt-1 text-[10px] italic">Một tháng trước đêm mất trộm.</p>
    <Signature name="L. B. Ngọc" />
  </Sheet>
)

const X4 = () => (
  <Phone header="Bảo">
    <p className="text-center text-[9px] opacity-50">09/12/2025</p>
    <Bubble time="01:12">Em tưởng chặn anh là xong hả</Bubble>
    <Bubble time="01:13">Anh vẫn nhớ mã két của em đó</Bubble>
    <Bubble me time="07:40">Anh say thì đi ngủ đi</Bubble>
  </Phone>
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

const LiveBadge = ({ viewers }: { viewers: string }) => (
  <>
    <rect x="232" y="8" width="38" height="16" rx="3" fill="#e0245e" />
    <text x="251" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily={mono}>LIVE</text>
    <text x="276" y="20" fontSize="10" fill="#fff" fontFamily={mono}>{viewers}</text>
  </>
)

/** The safe and keypad as seen by the livestream camera. */
const SafeOnCam = ({ hand }: { hand?: boolean }) => (
  <g>
    <rect width="320" height="220" fill={C.wood} />
    <rect x="70" y="40" width="180" height="170" fill={C.safe} stroke={LINE} strokeWidth="2" />
    {Array.from({ length: 12 }, (_, i) => (
      <g key={i}>
        <rect x={110 + (i % 3) * 36} y={80 + Math.floor(i / 3) * 28} width="28" height="22" rx="3" fill={C.silver} stroke={LINE} strokeWidth="1" />
        <text x={124 + (i % 3) * 36} y={96 + Math.floor(i / 3) * 28} textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'][i]}
        </text>
      </g>
    ))}
    {hand && <path d="M200,200 Q180,150 196,120 L204,112 Q212,108 214,118 L212,140 Q240,150 250,200 Z" fill="#efc39b" stroke={LINE} strokeWidth="1.5" />}
  </g>
)

const X3 = () => (
  <Phone header="Video đã lưu · ngoc.watch.live">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <SafeOnCam />
        <rect x="70" y="40" width="180" height="170" fill="#151719" opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={110 + i * 50} cy="150" r="16" fill={i === 1 ? '#3f6aa8' : '#d9d9d9'} stroke={LINE} strokeWidth="2" />
        ))}
        <TimeTag t="20/12 11:05" />
        <LiveBadge viewers="1,2k" />
      </svg>
    </div>
    <p className="text-[10px]">"Cất hết vô két rồi nha cả nhà, chiều Ngọc bay ra Hà Nội, mai live tiếp."</p>
    <PhotoMeta when="20/12/2025 · 11:05" where="Riverlight, Bình Thạnh" />
  </Phone>
)

const Guest = ({ x, y, s = 1, skin = '#d9a47a', hair = '#1a1a1f', shirt }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string }) => (
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

const X5 = () => (
  <Phone header="Ảnh · Bảo">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#1c1a2a" />
        {[40, 120, 200, 280].map((x, i) => (
          <circle key={x} cx={x} cy="30" r="10" fill={['#e0245e', '#3f8a7e', '#d9b04f', '#7a9fb0'][i]} opacity="0.8" />
        ))}
        <rect x="20" y="60" width="280" height="30" fill="#3a2a22" />
        {[60, 100, 140].map((x) => (
          <rect key={x} x={x} y="40" width="12" height="20" fill="#9fc2d0" opacity="0.7" />
        ))}
        <Guest x={90} y={170} shirt="#ece2cf" />
        <Guest x={160} y={164} s={1.25} shirt="#3a332f" skin="#d9a47a" />
        <Guest x={230} y={170} shirt="#7d2f2a" hair="#4a3426" />
        <rect y="196" width="320" height="24" fill="#3a2a22" />
        <TimeTag t="21/12 02:10" />
      </svg>
    </div>
    <PhotoMeta when="21/12/2025 · 02:10" where="Bar Mây, Q.1" />
    <p className="text-[10px]">Được 3 người gắn thẻ · Bar cách Riverlight 6 km</p>
  </Phone>
)

const X6 = () => (
  <Phone header="Ảnh chụp màn hình · chị Hai">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <SafeOnCam hand />
        <TimeTag t="12/12 21:34" />
        <LiveBadge viewers="2,8k" />
        <rect x="0" y="150" width="106" height="70" fill="#000" opacity="0.45" />
        <text x="6" y="168" fontSize="9" fill="#fff" fontFamily={mono}>linh.89: đẹp quá</text>
        <text x="6" y="184" fontSize="9" fill="#ffd166" fontFamily={mono}>Vũ KT Riverlight:</text>
        <text x="6" y="196" fontSize="9" fill="#ffd166" fontFamily={mono}>  mở chậm thôi chị 😄</text>
        <text x="6" y="212" fontSize="9" fill="#fff" fontFamily={mono}>tram.nguyen: chốt!</text>
      </svg>
    </div>
    <p className="text-[10px]">"Cô Ngọc mở két khoe chiếc đồng hồ mới nè con." Bàn tay, bàn phím két rõ từng nút.</p>
    <PhotoMeta when="12/12/2025 · 21:34" where="Live · ngoc.watch.live" />
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6 }
