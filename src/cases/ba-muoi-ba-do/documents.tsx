import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import { C, Carton, Logger } from './scenes'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

/** Temperature curve: hours after 12:00 on 15/11 → x, degrees → y, in a 300 x 150 chart. */
const tx = (h: number) => 30 + h * 14.5
const ty = (t: number) => 128 - t * 3.3
type Pt = [number, number]
const pts = (list: Pt[]) => list.map(([h, t]) => `${tx(h).toFixed(1)},${ty(t).toFixed(1)}`).join(' ')

/** Logger TL-A: the apron bump at noon, then the impossible night spike. */
export const TLA_CURVE: Pt[] = [
  [0, 4.4], [1.1, 4.6], [1.5, 7.8], [2.1, 6.2], [3, 4.8], [6, 4.5], [11.9, 4.6],
  [11.93, 5.0], [12.07, 32.1], [13, 32.8], [14, 33.1], [14.7, 32.6], [14.73, 30], [14.9, 6.0], [15.2, 4.8], [18, 4.6],
]
/** Logger TL-B in carton 17: barely moves. */
export const TLB_CURVE: Pt[] = [
  [0, 4.2], [1.5, 6.4], [2.6, 5.1], [4, 4.4], [12, 4.3], [15, 4.4], [18, 4.3],
]

export function TempChart({ curve, title, lights = false }: { curve: Pt[]; title: string; lights?: boolean }) {
  const hours = [0, 3, 6, 9, 12, 15, 18]
  const labels = ['12h', '15h', '18h', '21h', '0h', '3h', '6h']
  return (
    <svg viewBox="0 0 300 172" className="block w-full">
      <rect width="300" height="172" fill="#fff" />
      <text x="150" y="12" textAnchor="middle" fontSize="9" fontWeight="700" fill={LINE} fontFamily={mono}>{title}</text>
      <rect x={tx(0)} y={ty(8)} width={tx(18) - tx(0)} height={ty(2) - ty(8)} fill={accent.teal} opacity="0.15" />
      {[0, 8, 16, 24, 32].map((t) => (
        <g key={t}>
          <line x1={tx(0)} y1={ty(t)} x2={tx(18)} y2={ty(t)} stroke="#000" strokeOpacity="0.1" />
          <text x="24" y={ty(t) + 3} textAnchor="end" fontSize="7" fill={LINE} fontFamily={mono}>{t}°</text>
        </g>
      ))}
      <line x1={tx(0)} y1={ty(8)} x2={tx(18)} y2={ty(8)} stroke={accent.red} strokeDasharray="3 2" />
      {hours.map((h, i) => (
        <text key={h} x={tx(h)} y="140" textAnchor="middle" fontSize="7" fill={LINE} fontFamily={mono}>{labels[i]}</text>
      ))}
      <text x={tx(12)} y="149" textAnchor="middle" fontSize="6" fill={LINE} opacity="0.6" fontFamily={mono}>16/11</text>
      <polyline points={pts(curve)} fill="none" stroke={accent.red} strokeWidth="2" strokeLinejoin="round" />
      {lights && (
        <g fontFamily={mono} fontSize="6.5" fill={LINE}>
          <text x="30" y="164">ÁNH SÁNG</text>
          {[
            [11.92, '☀ 23:55'],
            [14.72, '☀ 02:43'],
          ].map(([h, t]) => (
            <g key={t as string}>
              <line x1={tx(h as number)} y1="152" x2={tx(h as number)} y2="168" stroke={accent.amber} strokeWidth="2" />
              <text x={tx(h as number) + ((h as number) < 13 ? -3 : 3)} y="164" textAnchor={(h as number) < 13 ? 'end' : 'start'}>
                {t}
              </text>
            </g>
          ))}
          <rect x={tx(11.95)} y="158" width={tx(14.7) - tx(11.95)} height="8" fill={LINE} opacity="0.75" />
          <text x={(tx(11.95) + tx(14.7)) / 2} y="164.5" textAnchor="middle" fill="#fff" fontSize="6">tối</text>
        </g>
      )}
    </svg>
  )
}

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm hàng hóa vận chuyển (mọi rủi ro)">
    <Row k="Số hợp đồng" v="AT-HH-2025-1511" />
    <Row k="Người được BH" v="Công ty Dược phẩm Minh Tâm" />
    <Row k="Hàng hóa" v="Thuốc bảo quản lạnh 2–8°C" />
    <p className="pt-1 text-[10px]">
      Điều 3: bảo hiểm hư hỏng do sai lệch nhiệt độ trong vận chuyển và lưu kho, <Mark>khi hàng không còn đạt chất lượng</Mark>.
    </p>
    <p className="text-[10px]">
      Điều 7: hàng nghi hư hỏng <Mark>chỉ được tiêu hủy sau khi giám định viên An Tín xác nhận</Mark>.
    </p>
    <p className="text-[10px] italic">Điều 8: nếu hàng vẫn đạt chất lượng, An Tín chỉ chi trả phí kiểm nghiệm lại và lưu kho phát sinh.</p>
    <Signature name="T. N. M. Thư" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="17/11/2025" />
    <Row k="Lô hàng" v="Herzena 150 mg, lô HZ-2509" />
    <Row k="Số lượng" v="1.200 lọ · 40 thùng · 1 pallet" />
    <Row k="Đơn giá" v="3.850.000 đ/lọ" />
    <Row k="Tổng yêu cầu" v="4.620.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Nhiệt kế tự ghi báo vượt ngưỡng 2–8°C gần 3 giờ trong thời gian lưu kho Tân Sơn Cargo. Cả lô không đạt.</p>
    <Signature name="T. N. M. Thư" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Phần mềm đọc nhiệt kế · Bản in của Minh Tâm" title="Báo cáo nhiệt kế TL-A · nắp thùng 1">
    <TempChart curve={TLA_CURVE} title="15/11 12:00 → 16/11 06:00" lights />
    <div className="grid grid-cols-[5rem_1fr] gap-x-2 font-mono text-[9.5px]">
      <span>13:30</span>
      <span>cao nhất 7,8° (trong ngưỡng)</span>
      <span>23:56–00:04</span>
      <span>
        <Mark>5,0° → 32,1° trong 8 phút</Mark>
      </span>
      <span>00:04–02:43</span>
      <span>giữ đều 32–33°</span>
      <span>02:44–02:54</span>
      <span>
        <Mark>30° → 6,0° trong 10 phút</Mark>
      </span>
    </div>
    <p className="text-[10px] font-bold text-[#b23a2e]">BÁO ĐỘNG: vượt 8°C liên tục 2 giờ 48 phút.</p>
  </Sheet>
)

const P4 = () => (
  <Sheet org="Công ty Dược phẩm Minh Tâm · Phòng đảm bảo chất lượng" title="Biên bản cách ly lô HZ-2509">
    <Row k="Thời gian" v="17/11/2025 · 09:05" />
    <Row k="Địa điểm" v="Phòng lạnh 3, Tân Sơn Cargo" />
    <Row k="Nhiệt kế đã đọc" v="TL-A (nắp thùng 1)" strong />
    <p className="pt-1 text-[10px]">Kết luận: vượt ngưỡng 2 giờ 48 phút. Niêm phong toàn bộ 40 thùng, không phân phối.</p>
    <p className="text-[10px]">
      Đề nghị: <Mark>báo ngay An Tín cử giám định viên trước khi tiêu hủy</Mark>. Đã gửi email lúc 10:12.
    </p>
    <Signature name="P. T. Linh" />
  </Sheet>
)

const P5 = () => (
  <Sheet org="Tân Sơn Cargo · Hệ thống kiểm soát ra vào" title="Nhật ký cửa phòng lạnh 3 · đêm 15–16/11">
    {[
      ['22:04', 'TSC-0417 · Đỗ Thanh Tùng', 'vào'],
      ['22:09', 'TSC-0417 · Đỗ Thanh Tùng', 'ra'],
      ['23:52', 'TSC-0417 · Đỗ Thanh Tùng', 'vào'],
      ['23:58', 'TSC-0417 · Đỗ Thanh Tùng', 'ra'],
      ['02:41', 'TSC-0417 · Đỗ Thanh Tùng', 'vào'],
      ['02:47', 'TSC-0417 · Đỗ Thanh Tùng', 'ra'],
      ['05:30', 'TSC-0417 · Đỗ Thanh Tùng', 'vào'],
      ['05:34', 'TSC-0417 · Đỗ Thanh Tùng', 'ra'],
    ].map(([t, w, e]) => {
      const hot = t === '23:52' || t === '23:58' || t === '02:41' || t === '02:47'
      return (
        <div key={t} className="grid grid-cols-[3rem_1fr_2rem] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
          <span>{hot ? <Mark>{t}</Mark> : t}</span>
          <span>{w}</span>
          <span>{e}</span>
        </div>
      )
    })}
    <p className="pt-1 text-[10px]">Không thẻ nào khác ra vào phòng lạnh 3 từ 18:00 ngày 15/11 tới 06:00 ngày 16/11.</p>
  </Sheet>
)

const P6 = () => (
  <Sheet org="Pharma-Logistik GmbH · Frankfurt" title="Phiếu đóng gói · Packing list">
    <Row k="Lô" v="HZ-2509 · 40 thùng × 30 lọ" />
    <Row k="Đóng gói" v="14/11/2025, túi lạnh 4 lớp" />
    <Row k="Băng keo niêm" v="Xanh dương, in PHARMA-LOGISTIK" />
    <p className="pt-1 text-[10px] font-bold">Nhiệt kế tự ghi (2 cái)</p>
    <Row k="TL-A" v="gắn ngoài, nắp thùng 1" />
    <div className="flex justify-between gap-3 border-b border-dotted border-black/20">
      <span className="opacity-70">TL-B</span>
      <span className="text-right font-bold">
        <Mark>giấu dưới lớp túi lạnh, thùng 17</Mark>
      </span>
    </div>
    <p className="text-[10px] italic">TL-B là nhiệt kế dự phòng. Đọc cả hai trước khi kết luận hàng không đạt.</p>
    <div className="h-14" />
    <Stamp text="Pharma Logistik" className="bottom-2 right-3" />
  </Sheet>
)

const P7 = () => (
  <Sheet org="Tân Sơn Cargo · Kho lạnh" title="Biên bản đề xuất tiêu hủy hàng không đạt">
    <Row k="Ngày lập" v="17/11/2025 · 11:30" />
    <Row k="Lô hàng" v="HZ-2509, Minh Tâm, 40 thùng" />
    <Row k="Đơn vị tiêu hủy" v="Công ty Môi trường Hưng Thịnh" strong />
    <Row k="Ngày tiêu hủy" v="28/11/2025" strong />
    <p className="pt-1 text-[10px]">Hưng Thịnh nhận hàng tại kho bằng xe chuyên dụng, cấp biên bản tiêu hủy trong ngày.</p>
    <p className="text-[10px] italic">Chủ hàng ghi: "Chờ bảo hiểm giám định."</p>
    <Signature name="Đ. T. Tùng" />
  </Sheet>
)

const P8 = () => (
  <Sheet org="Công ty Vận tải Lạnh Việt" title="Hợp đồng thuê xe tải thùng lạnh">
    <Row k="Ngày ký" v="14/11/2025 · 10:20" strong />
    <Row k="Bên thuê" v="Công ty Môi trường Hưng Thịnh" />
    <Row k="Người ký" v="Mai Quốc Hưng" />
    <Row k="Ngày dùng xe" v="27/11 – 29/11/2025" />
    <Row k="Nhiệt độ thùng" v="2–8°C" strong />
    <p className="pt-1 text-[10px]">
      Hàng chở: <Mark>40 thùng hàng lạnh, nhận tại Tân Sơn Nhất</Mark>.
    </p>
    <p className="text-[10px] italic">Lô thuốc Minh Tâm hạ cánh 13:10 ngày 15/11, một ngày sau khi hợp đồng này được ký.</p>
    <Signature name="M. Q. Hưng" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="Ngân hàng TMCP Sài Gòn Mới · Sao kê" title="Tài khoản Đỗ Thanh Tùng · 11/2025">
    {[
      ['10/11', 'Lương tháng 10', '+9.400.000'],
      ['16/11', 'Nộp tiền mặt · CN Bình Chánh', '+100.000.000'],
      ['16/11', 'Chuyển khoản · "tra no anh Tu"', '-85.000.000'],
      ['18/11', 'Rút ATM', '-5.000.000'],
    ].map(([d, k, v]) => (
      <div key={k} className="grid grid-cols-[2.5rem_1fr_auto] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
        <span>{d}</span>
        <span>{d === '16/11' ? <Mark>{k}</Mark> : k}</span>
        <span>{v}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Chi nhánh Bình Chánh cách bãi Hưng Thịnh 2 km.</p>
  </Sheet>
)

const P10 = () => (
  <Sheet org="Viện Kiểm nghiệm thuốc TP.HCM" title="Phiếu kiểm nghiệm số 2511-0877">
    <Row k="Mẫu" v="Herzena 150 mg, lô HZ-2509" />
    <Row k="Lấy mẫu" v="Thùng 1 và thùng 17, ngày 20/11" />
    <Row k="Hàm lượng" v="99,2% · đạt" />
    <Row k="Tạp chất, kết tụ" v="trong giới hạn · đạt" />
    <Row k="Vô khuẩn" v="đạt" />
    <p className="pt-1 text-[10px] font-bold">
      Kết luận: <Mark>mẫu đạt toàn bộ chỉ tiêu chất lượng</Mark>.
    </p>
    <p className="text-[10px] italic">Theo đề nghị của giám định viên An Tín.</p>
    <div className="h-4" />
    <Signature name="TS. Kiểm nghiệm viên" />
    <Stamp text="Viện KN · Đạt" className="bottom-2 left-6" />
  </Sheet>
)

const P11 = () => (
  <Sheet org="Bệnh viện Ung bướu · Khoa Dược" title="Hợp đồng cung ứng thuốc số 77/HĐ-UB">
    <Row k="Nhà cung cấp" v="Công ty Dược phẩm Minh Tâm" />
    <Row k="Thuốc" v="Herzena 150 mg · 1.200 lọ" />
    <Row k="Giá trị" v="5.220.000.000 đ" strong />
    <Row k="Hạn giao" v="trước 30/11/2025" />
    <p className="pt-1 text-[10px]">
      Chậm giao: <Mark>phạt 8% giá trị mỗi tuần</Mark>. Danh sách 64 bệnh nhân đang chờ đợt điều trị tháng 12.
    </p>
    <Signature name="DS. Trưởng khoa" />
  </Sheet>
)

const X1 = () => (
  <Sheet org="Rhein Pharma AG · Accounts" title="Thư nhắc nợ quá hạn">
    <Row k="Khách hàng" v="Minh Tam Pharma Co." />
    <Row k="Số nợ" v="2.100.000.000 đ (quy đổi)" strong />
    <Row k="Quá hạn" v="60 ngày" />
    <p className="pt-1 text-[10px]">Nếu chưa thanh toán trước 15/12, chúng tôi tạm dừng giao lô hàng tiếp theo.</p>
    <div className="h-20" />
    <Stamp text="Reminder" className="bottom-2 right-3" />
  </Sheet>
)

const X2 = () => (
  <Sheet org="Tân Sơn Cargo · Bộ phận sân đỗ" title="Biên bản sự cố khai thác">
    <Row k="Ngày" v="15/11/2025" />
    <Row k="Pallet" v="PMC-4471 (thuốc lạnh, Minh Tâm)" />
    <Row k="Sự cố" v="Để ngoài nắng, không vào khu có mái che" strong />
    <Row k="Nhiệt độ sân đỗ" v="34°C" />
    <p className="pt-1 text-[10px]">Thời gian chờ vượt mức tối đa 30 phút. Trừ lương tài xế một ngày.</p>
    <Signature name="C. V. Lộc" />
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const PhotoMeta = ({ when, where }: { when: string; where: string }) => (
  <p className="flex justify-between text-[10px] opacity-70">
    <span>{when}</span>
    <span>📍 {where}</span>
  </p>
)

const X3 = () => (
  <Phone header="Ảnh · Phan Thùy Linh">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill={C.frost} />
        <Carton x={40} y={70} w={240} h={140} tape={C.tapeDE} />
        <rect x="40" y="120" width="240" height="22" fill={C.tapeVN} stroke={LINE} strokeWidth="1.5" />
        <Logger x={200} y={60} s={1.2} alarm />
        <circle cx="96" cy="131" r="28" fill="none" stroke={accent.amber} strokeWidth="3" />
        <rect x="8" y="8" width="104" height="18" rx="4" fill="#000" opacity="0.45" />
        <text x="14" y="21" fontSize="11" fill="#fff" fontFamily={mono}>17/11 09:03</text>
      </svg>
    </div>
    <p className="text-[10px]">"TL-A báo đỏ. Thùng 1 có đoạn băng keo xanh lá, Tùng nói hải quan mở kiểm tra."</p>
    <PhotoMeta when="17/11/2025 · 09:03" where="Tân Sơn Cargo, Tân Bình" />
  </Phone>
)

const X4 = () => (
  <Phone header="anh Hưng HT">
    <p className="text-center text-[9px] opacity-50">Tin nhắn trên máy của Tùng</p>
    <Bubble time="12/11 21:40">Lô Herzena của Minh Tâm về thứ bảy hả em. Một pallet?</Bubble>
    <Bubble me time="12/11 21:42">Dạ 40 thùng, chuyến Frankfurt trưa 15</Bubble>
    <Bubble time="12/11 21:45">Chỉ cần cái nhiệt kế báo đỏ. Thuốc em đừng đụng, giữ lạnh cho anh.</Bubble>
    <Bubble me time="16/11 03:02">Xong rồi anh. Đỏ rồi</Bubble>
    <Bubble time="16/11 07:15">Sáng nay anh gửi trước 100. Nhớ đề xuất bên anh đốt nha.</Bubble>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, X1, X2, X3, X4 }
