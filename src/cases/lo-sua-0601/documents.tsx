import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import type { PortraitSpec } from '@/art/Portrait'
import { Fb, TimeStamp, makeGuest } from '@/art/iso/photo'
import type { CaseData } from '@/game/types'
import caseJson from './case.json'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm thu hồi sản phẩm">
    <Row k="Số hợp đồng" v="AT-TH-2025-0318" />
    <Row k="Người được BH" v="Cty TNHH Sữa đậu nành Mộc An" />
    <Row k="Địa chỉ" v="KCN Tân Thới Hiệp, Q.12" />
    <Row k="Hạn mức" v="5.000.000.000 đ / sự cố" strong />
    <p className="pt-1 text-[10px]">
      Điều 3: chi trả chi phí thu hồi, tiêu hủy và giá trị hàng khi sản phẩm bị <Mark>bên thứ ba cố ý làm nhiễm bẩn</Mark>, hoặc khi có <Mark>đe dọa tống tiền</Mark> nhắm vào sản phẩm.
    </p>
    <p className="text-[10px] italic">
      Điều 7, loại trừ: lỗi sản xuất, sai sót kiểm soát chất lượng; <Mark>hành vi của nhân viên người được bảo hiểm</Mark>.
    </p>
    <Signature name="Đ. T. N. Hà" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
    <div className="h-16" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="12/01/2026" />
    <Row k="Sự cố" v="Đe dọa tống tiền, chích kim vào sản phẩm" />
    <Row k="Lô thu hồi" v="0601-L2 · 0701-L1" />
    <Row k="Số lượng" v="240.000 chai" />
    <Row k="Số tiền yêu cầu" v="3.200.000.000 đ" strong />
    <p className="pt-1 text-[10px]">
      Trong đó lô 0601-L2: 1,8 tỷ; lô 0701-L1: 1,4 tỷ. Nguyên nhân: <Mark>kẻ xấu chích kim vào chai và gửi thư tống tiền</Mark>. Công ty đã trình báo công an.
    </p>
    <Signature name="Đ. T. N. Hà" />
  </Sheet>
)

/** The ransom note, printed on half a sheet. */
const P3 = () => (
  <div className="relative bg-[#f7f3ea] p-4 font-mono text-[12px] leading-relaxed text-[#1c130f] shadow-[0_6px_16px_rgb(0_0_0/0.35)]">
    <div className="absolute inset-y-0 left-1.5 w-1 bg-[#1c130f]/25" />
    <p className="uppercase">Gửi giám đốc Mộc An.</p>
    <p className="pt-2 uppercase">Tao đã chích kim vào 100 chai sữa Mộc An ở các siêu thị.</p>
    <p className="uppercase">Chuẩn bị 500 triệu. Tao sẽ liên lạc.</p>
    <p className="uppercase">Báo công an thì sẽ có người chết.</p>
    <div className="mt-3 border-t border-dashed border-black/30 pt-1 font-sans text-[10px] text-[#2d1f18]">
      Bảo vệ cổng nhận trong hộp thư lúc <Mark>08:15 ngày 11/01</Mark>. Không tem, không người gửi. Tới nay chưa có liên lạc nào.
    </div>
  </div>
)

const P4 = () => (
  <Sheet org="Công an phường Tân Thới Hiệp" title="Biên bản tiếp nhận tin báo">
    <Row k="Thời gian" v="09:30 · 11/01/2026" strong />
    <Row k="Người trình báo" v="Đoàn Thị Ngọc Hà, giám đốc" />
    <Row k="Nội dung" v="Thư đe dọa tống tiền" />
    <p className="pt-1 text-[10px]">
      Bà Hà <Mark>nộp thư gốc, đề nghị điều tra</Mark>, đồng thời thông báo đã ra lệnh thu hồi hai lô hàng trên thị trường. Bà cho biết chưa nhận được yêu cầu chuyển tiền cụ thể.
    </p>
    <Signature name="Thiếu úy N. V. Tài" />
    <Stamp text="CA P. Tân Thới Hiệp" className="bottom-2 left-4" />
    <div className="h-16" />
  </Sheet>
)

const P5 = () => (
  <Sheet org="Trung tâm Kiểm nghiệm Thực phẩm TP.HCM" title="Phiếu kết quả kiểm nghiệm · 12/01">
    <Row k="Mẫu chua từ điểm bán" v="40 chai · 14 điểm" />
    <Row k="Thuộc lô 0601-L2" v="40 / 40" strong />
    <Row k="Có lỗ trên nắp" v="0 / 40" strong />
    <Row k="Vi sinh" v="Bacillus sinh bào tử chịu nhiệt" />
    <p className="pt-1 text-[10px]">
      Kết luận: hư hỏng <Mark>phù hợp với tiệt trùng không đủ nhiệt độ</Mark>. Bào tử sống sót, phát triển sau 2–3 ngày, sinh khí làm phồng nắp.
    </p>
    <p className="text-[10px]">Mẫu bổ sung (Hiệp Thành Mart, 6 chai có lỗ kim): 4 chai lô 0701-L1 đạt; 2 chai lô 0601-L2 hư như trên.</p>
    <Stamp text="Đã kiểm nghiệm" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

/** Temperature log of line 2 printed from the controller. */
const P6 = () => {
  const pts: [number, number][] = [
    [0, 121], [30, 121], [64, 121], [68, 99], [78, 97], [92, 101], [106, 98], [124, 100], [140, 121], [160, 121], [180, 121],
  ]
  const X = (m: number) => 30 + m * 1.45
  const Y = (t: number) => 140 - (t - 90) * 3.6
  return (
    <Sheet org="Bộ điều khiển line 2 · xuất dữ liệu" title="Nhiệt độ tiệt trùng · đêm 6–7/1">
      <svg viewBox="0 0 300 160" className="block w-full">
        <rect width="300" height="160" fill="#f6efe2" />
        <line x1="30" y1={Y(121)} x2="292" y2={Y(121)} stroke={accent.teal} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="292" y={Y(121) - 4} textAnchor="end" fontSize="8" fill={accent.teal} fontFamily={mono}>121°C chuẩn</text>
        <polyline points={pts.map(([m, t]) => `${X(m)},${Y(t)}`).join(' ')} fill="none" stroke={LINE} strokeWidth="2" />
        <rect x={X(65)} y="10" width={X(140) - X(65)} height="135" fill={accent.red} opacity="0.12" />
        {['01:00', '02:00', '03:00'].map((t, i) => (
          <text key={t} x={X(i * 60)} y="155" textAnchor="middle" fontSize="8" fill={LINE} fontFamily={mono}>
            {t}
          </text>
        ))}
        <text x={X(78)} y={Y(97) + 12} fontSize="8" fill={accent.red} fontFamily={mono}>97°C</text>
      </svg>
      <p className="text-[10px]">02:05–03:20: nhiệt độ 97–101°C. 02:10: báo động nhiệt.</p>
      <p className="text-[10px]">
        02:31: báo động được tắt từ xa, tài khoản <Mark>QC-THUAN</Mark>. Máy không dừng.
      </p>
    </Sheet>
  )
}

const P7 = () => (
  <Sheet org="Mộc An · Bộ phận chăm sóc khách hàng" title="Danh sách khiếu nại sữa chua">
    {[
      ['09/01 08:40', 'Tạ Văn Mạnh · Hiệp Thành Mart', true],
      ['09/01 11:02', 'Cửa hàng Ngọc Lan · Gò Vấp', false],
      ['09/01 15:30', 'Siêu thị An Phú Đông · Q.12', false],
      ['10/01', '19 khiếu nại khác · 8 điểm bán', false],
    ].map(([d, n, m]) => (
      <div key={String(d)} className="grid grid-cols-[5.5rem_1fr] gap-x-2 border-b border-dotted border-black/20">
        <span>{d}</span>
        <span>{m ? <Mark>{n}</Mark> : n}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">
      Tổng tới 22:00 ngày 10/1: <Mark>22 khiếu nại, 11 điểm bán</Mark>. Chưa ai nhắc tới lỗ kim.
    </p>
  </Sheet>
)

const P8 = () => (
  <Sheet org="Công an TP.HCM · Phòng CSGT" title="Giấy đăng ký xe mô tô">
    <Row k="Biển số" v="59-V1 268.41" strong />
    <Row k="Nhãn hiệu" v="Xe tay ga, màu bạc" />
    <Row k="Chủ xe" v="Lương Văn Thuận" strong />
    <Row k="Địa chỉ" v="P. Thạnh Lộc, Q.12" />
    <p className="pt-1 text-[10px] italic">Nhà chủ xe cách Hiệp Thành Mart khoảng 3 km.</p>
    <Stamp text="Đã đăng ký" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Cty TNHH Sữa đậu nành Mộc An" title="Quyết định chấm dứt hợp đồng lao động">
    <Row k="Người lao động" v="Lý Văn Sang" />
    <Row k="Vị trí" v="Vận hành tiệt trùng L2, ca đêm" />
    <Row k="Ngày quyết định" v="17:00 · 07/01/2026" strong />
    <p className="pt-1 text-[10px]">
      Lý do: <Mark>ngủ gật trong ca đêm 6/1</Mark>, vi phạm nội quy vận hành.
    </p>
    <p className="text-[10px]">Người đề xuất: Lương Văn Thuận, trưởng phòng QC.</p>
    <Signature name="Đ. T. N. Hà" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Phòng Kỹ thuật hình sự · Công an Q.12" title="Kết luận giám định tài liệu">
    <Row k="Mẫu cần giám định" v="Thư đe dọa gửi Mộc An" />
    <Row k="Mẫu so sánh" v="Bản in từ 4 máy in của Mộc An" />
    <p className="pt-1 text-[10px]">
      1. Thư in bằng máy in laser, có <Mark>vệt lỗi trống mực chạy dọc lề trái</Mark>, trùng khớp với máy in đặt tại <Mark>phòng QC</Mark>.
    </p>
    <p className="text-[10px]">2. Mặt sau tờ thư có dòng kẻ in mờ của mẫu "phiếu kiểm nghiệm lô", bị cắt đôi.</p>
    <p className="text-[10px]">3. Lỗ trên nắp 6 chai: đường kính 0,25 mm, tương ứng kim bút tiêm insulin 31G.</p>
    <Stamp text="Kỹ thuật hình sự" className="bottom-2 right-3" />
    <div className="h-16" />
  </Sheet>
)

const P11 = () => (
  <Sheet org="Cty TNHH Sữa đậu nành Mộc An" title="Quy chế thưởng phạt phòng QC · 2025">
    <Row k="Năm không lọt lô lỗi" v="Thưởng 120.000.000 đ" strong />
    <Row k="Đã đạt liên tiếp" v="9 năm" />
    <p className="pt-1 text-[10px]">
      Điều 5: lô lỗi ra thị trường do sai sót QC, <Mark>trưởng phòng QC bị cách chức</Mark> và <Mark>bồi hoàn 10% thiệt hại</Mark>.
    </p>
    <p className="text-[10px] italic">Ký nhận: Lương Văn Thuận.</p>
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X1 = () => (
  <Phone header="Facebook · Sang Lý">
    <p className="text-center text-[9px] opacity-50">07/01/2026 · 21:40</p>
    <div className="rounded-md bg-white p-2">
      <p>Làm ba năm, đuổi cái rụp. Đuổi tao à? Rồi tụi bây sẽ biết.</p>
      <p className="pt-1 text-[9px] opacity-60">😡 14 · 6 bình luận</p>
    </div>
  </Phone>
)

const X2 = () => (
  <Phone header="Messenger · Sữa đậu nành Mộc An">
    <p className="text-center text-[9px] opacity-50">09/01/2026</p>
    <Bubble time="10:15">Tôi uống sữa của mấy người đau bụng 2 ngày. 50 triệu, không thì tôi đưa clip lên báo.</Bubble>
    <Bubble me time="10:40">Dạ Mộc An xin lỗi chú, bên con xin số điện thoại để liên hệ ạ.</Bubble>
  </Phone>
)

const X3 = () => (
  <Sheet org="Hợp đồng cung ứng · Chuỗi siêu thị Phương Đông" title="Phụ lục hàng Tết Bính Ngọ">
    <Row k="Bên bán" v="Mộc An" />
    <Row k="Số lượng" v="600.000 chai" />
    <Row k="Hạn giao" v="trước 05/02/2026" />
    <Row k="Phạt thiếu hàng" v="2.000.000.000 đ" strong />
    <p className="pt-1 text-[10px] italic">Ký ngày 20/12/2025.</p>
    <Signature name="Đ. T. N. Hà" />
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

const TimeTag = TimeStamp
const cast = Object.fromEntries((caseJson as CaseData).suspects.map((x) => [x.id, x.portrait])) as Record<string, PortraitSpec>
const Guest = makeGuest(cast)

/** A soy-milk bottle seen straight on: white body, green cap; `sour` swells the cap. (x, y) is the bottom middle. */
const BottleFb = ({ x, y, s = 1, sour = false }: { x: number; y: number; s?: number; sour?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Fb x={-10} y={-44} w={20} h={44} d={8} c="#f4f1ea" />
    <rect x="-10" y="-30" width="20" height="14" fill="#5f9a5b" />
    <Fb x={-6} y={-52} w={12} h={8} d={6} c="#e6e2d8" />
    <Fb x={sour ? -8 : -7} y={sour ? -62 : -58} w={sour ? 16 : 14} h={sour ? 10 : 6} d={6} c={sour ? '#e9d36a' : '#5f9a5b'} />
  </g>
)

/** Sang's photo of the line 2 screen at 02:14, and Thuận's reply. */
const X4 = () => (
  <Phone header="Zalo · Anh Thuận QC">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 200" className="block w-full">
        <rect width="320" height="200" fill="#9aa4ae" />
        <Fb x={20} y={24} w={190} h={130} d={14} c="#7e8794" />
        <rect x="32" y="36" width="166" height="106" rx="6" fill="#2e2a4a" />
        <text x="115" y="94" textAnchor="middle" fontSize="34" fontWeight="700" fill="#ff6b5a" fontFamily={mono}>98°C</text>
        <text x="115" y="122" textAnchor="middle" fontSize="12" fill="#ff6b5a" fontFamily={mono}>L2 · ALARM TEMP LOW</text>
        <Fb x={232} y={40} w={34} h={24} d={10} c="#e2463a" />
        <Fb x={226} y={110} w={70} h={70} d={10} c="#7e8794" />
        <circle cx="261" cy="145" r="28" fill="#fbfaf6" />
        <line x1="261" y1="145" x2="236" y2="152" stroke={LINE} strokeWidth="3" />
        <line x1="261" y1="145" x2="238" y2="156" stroke="#e2463a" strokeWidth="2.4" />
        <TimeTag t="07/1 02:14" />
      </svg>
    </div>
    <Bubble me time="02:16">Anh ơi L2 tụt còn 98 độ, báo động đỏ. Em dừng máy nha?</Bubble>
    <Bubble time="02:20">Cứ chạy tiếp, đừng ghi sổ. Sáng anh xử.</Bubble>
    <PhotoMeta when="07/01/2026 · 02:14" where="Mộc An, Q.12" />
  </Phone>
)

const X5 = () => (
  <Phone header="Thư viện ảnh · Sang">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#c49a74" />
        <Fb x={100} y={20} w={120} h={70} d={12} c="#b8443a" />
        <Fb x={146} y={38} w={28} h={34} d={6} c="#f2c46d" />
        <Guest x={70} y={160} look={{ hair: 'short', hairColor: 'gray', age: 'old', skin: 2 }} shirt="#ece2cf" />
        <Guest x={160} y={156} s={1.15} who="sang" look={{ mood: 'smile' }} shirt="#2f4258" />
        <Guest x={250} y={160} look={{ hair: 'long', hairColor: 'black', skin: 1 }} shirt="#cf9a32" />
        <Fb x={10} y={180} w={300} h={40} d={24} c="#f6efe2" />
        <TimeTag t="10/1 19:10" />
      </svg>
    </div>
    <PhotoMeta when="10/01/2026 · 19:10" where="Trảng Bàng, Tây Ninh" />
    <p className="text-[10px]">"Giỗ ông nội. Cả họ về đông đủ."</p>
  </Phone>
)

const X6 = () => (
  <Phone header="Thư viện ảnh · Thuận">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e9d6b4" />
        <Fb x={40} y={20} w={90} h={60} d={10} c="#2e2a4a" />
        <Guest x={90} y={156} who="thuan" look={{ mood: 'smile' }} />
        <Guest x={170} y={158} look={{ hair: 'long', hairColor: 'brown', skin: 1 }} shirt="#b23a2e" />
        <Guest x={244} y={170} s={0.8} look={{ hair: 'short', age: 'young', skin: 1 }} shirt="#7a9fb0" />
        <Fb x={10} y={180} w={300} h={40} d={24} c="#b98a63" />
        <Fb x={140} y={176} w={60} h={6} d={14} c="#ffffff" />
        <TimeTag t="10/1 20:05" />
      </svg>
    </div>
    <PhotoMeta when="10/01/2026 · 20:05" where="Thạnh Lộc, Q.12" />
    <p className="text-[10px]">"Cơm tối với vợ con."</p>
  </Phone>
)

/** Mr Mạnh's video: the bulging bottle and a whole, unpierced cap. */
const X7 = () => (
  <Phone header="Facebook · Video của Mạnh Tạ">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#e9d6b4" />
        <Fb x={0} y={190} w={320} h={30} d={20} c="#b98a63" />
        <BottleFb x={110} y={196} s={2.4} sour />
        <circle cx="230" cy="90" r="48" fill="#fbf4e4" />
        <Fb x={204} y={78} w={52} h={22} d={14} c="#e9d36a" />
        <text x="230" y="154" textAnchor="middle" fontSize="11" fill={LINE} fontFamily={mono}>nắp nguyên</text>
        <polygon points="150,100 170,110 150,120" fill="#fff" opacity="0.8" />
        <TimeTag t="09/1 08:30" />
      </svg>
    </div>
    <PhotoMeta when="09/01/2026 · 08:30" where="Hiệp Thành, Q.12" />
    <p className="text-[10px]">"Sữa Mộc An mua tối qua, sáng ra phồng như vầy. Xì một cái, chua lè 🤢" · 2,1 nghìn lượt chia sẻ</p>
  </Phone>
)

/** Store camera: someone in a grey raincoat at the milk shelf. */
const X8 = () => (
  <div className="rounded-xl bg-[#2e2a4a] p-2 shadow-[0_6px_16px_rgb(46_42_74/0.35)]">
    <svg viewBox="0 0 320 200" className="block w-full rounded-lg">
      <rect width="320" height="200" fill="#f1e6d2" />
      {/* the soy-milk shelf */}
      <Fb x={10} y={40} w={200} h={150} d={14} c="#d8d0c0" />
      {[0, 1, 2].map((l) => (
        <g key={l}>
          <rect x="10" y={84 + l * 46} width="200" height="5" fill="#b9b4a8" />
          {Array.from({ length: 8 }, (_, i) => (
            <BottleFb key={i} x={24 + i * 24} y={84 + l * 46} s={0.7} />
          ))}
        </g>
      ))}
      <Fb x={10} y={30} w={200} h={10} d={14} c="#5f9a5b" />
      {/* the person in the grey raincoat, cap and glasses, hand up at eye level */}
      <Guest x={240} y={120} s={1.3} look={{ hair: 'cap', hairColor: 'gray', accessory: ['glasses'], skin: 2, mood: 'neutral' }} shirt="#9a9da3" />
      <Fb x={196} y={84} w={20} h={12} d={6} c="#9a9da3" />
      <Fb x={206} y={160} w={70} h={40} d={10} c="#9a9da3" />
      <text x="8" y="14" fontSize="9" fill="#2e2a4a" fontFamily={mono}>CAM 02 · KỆ SỮA</text>
      <text x="312" y="192" fontSize="9" fill="#2e2a4a" textAnchor="end" fontFamily={mono}>10/01/2026 19:08:41</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#e9d9c4]">
      19:05 tới 19:14: người áo mưa xám, nón lưỡi trai, đeo kính đứng trước kệ sữa, tay đưa lên hàng ngang tầm mắt. Không mua gì.
    </p>
  </div>
)

const X9 = () => (
  <Sheet org="Công ty Sữa Đậu Việt · Phòng kinh doanh" title="Thư chào hàng">
    <Row k="Gửi" v="Hiệp Thành Mart · chị Nguyễn Thị Thu Trang" />
    <Row k="Ngày" v="12/01/2026" strong />
    <p>
      Nhận được tin <Mark>Mộc An thu hồi hai lô hàng</Mark>, Đậu Việt sẵn sàng thay thế toàn bộ kệ sữa đậu nành trong 48 giờ, chiết khấu 20% cho đơn đầu tiên.
    </p>
    <p className="text-[10px] italic">"Khách hàng của chị xứng đáng với sản phẩm an toàn."</p>
    <Signature name="Trưởng phòng KD" />
  </Sheet>
)

const X10 = () => (
  <Sheet org="Mộc An · Tổ bảo vệ" title="Sổ trực cổng chính · 11/01">
    {[
      ['06:00', 'Mở hộp thư cổng: trống'],
      ['07:10', 'Anh Sang (đã nghỉ việc) đứng gần hộp thư khoảng 10 phút rồi đi'],
      ['07:30', 'Phòng nhân sự mở cửa'],
      ['08:15', 'Mở hộp thư: 01 phong bì không tên, chuyển lên giám đốc'],
    ].map(([t, v]) => (
      <div key={t} className="flex gap-3 border-b border-dotted border-black/20">
        <span className="font-bold">{t}</span>
        <span>{v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Ghi chú: thẻ ra vào của Sang đã khóa từ 17:00 ngày 7/1.</p>
    <Signature name="Bảo vệ ca sáng" />
  </Sheet>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 }
