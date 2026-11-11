import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import { Bottle, C, Dial, MilkShelf } from './scenes'

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

const TimeTag = ({ t }: { t: string }) => (
  <>
    <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
    <text x="14" y="21" fontSize="11" fill="#fff" fontFamily={mono}>
      {t}
    </text>
  </>
)

const Guest = ({ x, y, s = 1, skin = '#efc39b', hair = '#1a1a1f', shirt, glasses }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; glasses?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />
    <circle cx="-5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <circle cx="5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    {glasses && (
      <g fill="none" strokeWidth="1.2">
        <circle cx="-5" cy="-30" r="4" />
        <circle cx="5" cy="-30" r="4" />
      </g>
    )}
    <path d="M-5,-22 Q0,-18 5,-22" fill="none" strokeWidth="1.4" />
  </g>
)

/** Sang's photo of the line 2 screen at 02:14, and Thuận's reply. */
const X4 = () => (
  <Phone header="Zalo · Anh Thuận QC">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 200" className="block w-full">
        <rect width="320" height="200" fill={C.steelDark} />
        <rect x="30" y="30" width="170" height="110" rx="8" fill={C.night} stroke={LINE} strokeWidth="3" />
        <text x="115" y="88" textAnchor="middle" fontSize="34" fontWeight="700" fill="#ff6b5a" fontFamily={mono}>98°C</text>
        <text x="115" y="118" textAnchor="middle" fontSize="12" fill="#ff6b5a" fontFamily={mono}>L2 · ALARM TEMP LOW</text>
        <circle cx="240" cy="60" r="16" fill="#ff3b2e" stroke={LINE} strokeWidth="3" />
        <Dial x={262} y={140} r={36} now={98} low={97} />
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
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#3a2b22" />
        <rect x="100" y="20" width="120" height="70" fill="#9e2b22" stroke={LINE} strokeWidth="2" />
        <circle cx="160" cy="55" r="16" fill="#d9b04f" />
        <rect x="0" y="150" width="320" height="70" fill="#7a4f32" />
        <Guest x={70} y={170} shirt="#ece2cf" hair="#7d7a76" />
        <Guest x={160} y={164} s={1.2} shirt="#2f4258" skin="#b9815a" />
        <Guest x={250} y={170} shirt="#cf9a32" />
        <TimeTag t="10/1 19:10" />
      </svg>
    </div>
    <PhotoMeta when="10/01/2026 · 19:10" where="Trảng Bàng, Tây Ninh" />
    <p className="text-[10px]">"Giỗ ông nội. Cả họ về đông đủ."</p>
  </Phone>
)

const X6 = () => (
  <Phone header="Thư viện ảnh · Thuận">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#d9c49a" />
        <rect x="40" y="20" width="90" height="60" fill="#1f2730" stroke={LINE} strokeWidth="2" />
        <rect x="0" y="150" width="320" height="70" fill="#7a4f32" />
        <Guest x={90} y={166} shirt="#ece2cf" glasses />
        <Guest x={170} y={168} shirt="#b23a2e" hair="#4a3426" />
        <Guest x={240} y={178} s={0.8} shirt="#7a9fb0" />
        <ellipse cx="170" cy="200" rx="40" ry="8" fill="#ece2cf" stroke={LINE} strokeWidth="1.5" />
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
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#c9b58e" />
        <g transform="translate(110 200) scale(2)">
          <Bottle x={0} y={0} sour />
        </g>
        <circle cx="230" cy="90" r="48" fill="#fbf4e4" stroke={LINE} strokeWidth="3" />
        <ellipse cx="230" cy="90" rx="30" ry="14" fill={C.cap} stroke={LINE} strokeWidth="2" />
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
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 200" className="block w-full">
      <rect width="320" height="200" fill="#d9d4c4" />
      <g transform="translate(20 70) scale(0.3)">
        <MilkShelf x={0} y={0} w={540} />
      </g>
      <g transform="translate(200 196)" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
        <path d="M-30,0 L-24,-90 Q0,-104 24,-90 L30,0 Z" fill={C.raincoat} />
        <path d="M-24,-90 L-44,-50 L-34,-46 L-18,-74 Z" fill={C.raincoat} />
        <ellipse cx="0" cy="-108" rx="14" ry="16" fill="#d9a47a" />
        <path d="M-16,-114 Q0,-130 16,-114 L28,-112 L16,-108 L-16,-110 Z" fill="#3a332f" />
        <circle cx="-5" cy="-106" r="4" fill="none" strokeWidth="1.2" />
        <circle cx="5" cy="-106" r="4" fill="none" strokeWidth="1.2" />
      </g>
      <rect width="320" height="200" fill="#9ad0c0" opacity="0.08" />
      <text x="8" y="14" fontSize="9" fill="#1c130f" fontFamily={mono}>CAM 02 · KỆ SỮA</text>
      <text x="312" y="192" fontSize="9" fill="#1c130f" textAnchor="end" fontFamily={mono}>10/01/2026 19:08:41</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">
      19:05 tới 19:14: người áo mưa xám, nón lưỡi trai, đeo kính đứng trước kệ sữa, tay đưa lên hàng ngang tầm mắt. Không mua gì.
    </p>
  </div>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4, X5, X6, X7, X8 }
