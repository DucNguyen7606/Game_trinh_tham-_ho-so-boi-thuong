import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { ink } from '@/art/palette'
import { C } from './scenes'

// What each document in the case-file envelopes looks like, keyed by clue id.

const LINE = ink.night
const mono = 'IBM Plex Mono, monospace'

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Hợp đồng bảo hiểm tai nạn cá nhân">
    <Row k="Số hợp đồng" v="AT-TN-2025-0214" />
    <Row k="Bên mua, đóng phí" v="Trần Đình Khoa" />
    <Row k="Người được BH" v="Trần Đình Hiển, 79 tuổi" />
    <Row k="Người thụ hưởng" v="Trần Đình Khoa (cháu)" strong />
    <Row k="Số tiền BH" v="7.000.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Điều 3: chi trả khi người được bảo hiểm chết do tai nạn, gồm cả té ngã.</p>
    <p className="text-[10px]">
      Điều 7, loại trừ: tự tử; <Mark>chết do bệnh lý như nhồi máu cơ tim, đột quỵ</Mark>, kể cả khi sau đó có thương tích khác.
    </p>
    <p className="text-[10px] italic">
      Điều 9: hồ sơ có <Mark>khai báo gian dối, làm sai lệch hiện trường</Mark> thì An Tín từ chối và chuyển cơ quan chức năng.
    </p>
    <div className="flex justify-between">
      <Signature name="T. Đ. Khoa" />
      <Signature name="T. Đ. Hiển" />
    </div>
  </Sheet>
)

const P2 = () => (
  <Sheet org="Gửi Công ty Bảo hiểm An Tín" title="Đơn yêu cầu bồi thường">
    <Row k="Ngày" v="16/04/2026" />
    <Row k="Người yêu cầu" v="Trần Đình Khoa" />
    <Row k="Sự cố" v="Ông Trần Đình Hiển té cầu thang" />
    <Row k="Số tiền yêu cầu" v="7.000.000.000 đ" strong />
    <p className="pt-1 text-[10px]">
      Chú tôi trượt chân trên thảm cầu thang <Mark>khoảng 22:47, giờ trên đồng hồ của chú</Mark>. Thanh chặn thảm đã lỏng từ lâu. Lúc đó tôi đang dự tiệc cưới ở Quận 10, có nhiều người làm chứng.
    </p>
    <Signature name="T. Đ. Khoa" />
  </Sheet>
)

const P3 = () => (
  <Sheet org="Công an phường Võ Thị Sáu, Quận 3" title="Biên bản khám nghiệm hiện trường · 14/04">
    <Row k="Người phát hiện" v="Phạm Văn Tư, 06:25" />
    <Row k="Vị trí" v="Chân cầu thang, sảnh tầng trệt" strong />
    <Row k="Đồng hồ nạn nhân" v="Seiko, vỡ kính, dừng 22:47" />
    <Row k="Cầu thang" v="Thanh chặn thảm bậc 3 bung" />
    <Row k="Cửa, cổng" v="Không dấu hiệu cạy phá" />
    <p className="pt-1 text-[10px]">
      Nhận định ban đầu: <Mark>tai nạn té ngã</Mark>. Chờ kết luận giám định pháp y.
    </p>
    <Signature name="Thiếu tá N. H. Phong" />
    <Stamp text="CA P. Võ Thị Sáu" className="bottom-2 left-6" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Trung tâm Pháp y TP.HCM" title="Kết luận giám định pháp y số 1404">
    <Row k="Người chết" v="Trần Đình Hiển, 79 tuổi" />
    <Row k="Tổn thương 1" v="Nhồi máu cơ tim cấp, thành trước" strong />
    <Row k="Tổn thương 2" v="Gãy đốt sống cổ C2" strong />
    <Row k="Não" v="Không xuất huyết" />
    <p className="pt-1 text-[10px]">
      Thời điểm chết ước tính: <Mark>từ 19:00 đến 21:30 ngày 13/04</Mark>, theo nhiệt độ thi thể và mức co cứng.
    </p>
    <p className="text-[10px]">Dạ dày: cháo gạo mới tiêu một phần, phù hợp bữa ăn cách lúc chết 1 đến 3 giờ.</p>
    <p className="text-[10px] italic">Tổn thương nào gây tử vong: chờ phụ lục 02.</p>
    <Signature name="BS. L. T. Mai" />
    <Stamp text="Pháp y" className="bottom-2 left-6" />
  </Sheet>
)

const P5 = () => (
  <Sheet org="Tổ dân phố 7 · Camera đầu hẻm Tú Xương" title="Trích xuất camera đêm 13–14/04">
    {[
      ['18:05', 'Đào Thị Liên ra cổng, đi bộ'],
      ['18:20', 'Trần Đình Khoa về, dắt xe vào sân'],
      ['19:30', 'Phạm Văn Tư ra cổng, khóa cổng'],
      ['19:31', 'Ông Hiển ở cửa sổ lầu, đèn sáng'],
      ['20:42', 'Khoa dắt xe ra, mặc vest'],
      ['21:35', 'Lâm Quốc Thắng bấm chuông. Đèn lầu sáng'],
      ['21:41', 'Thắng rời đi, không vào'],
      ['00:38', 'Khoa về'],
      ['01:12', 'Đèn phòng làm việc trên lầu tắt'],
      ['06:25', 'Phạm Văn Tư mở cổng'],
    ].map(([t, e]) => (
      <div key={t} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
        <span>{t}</span>
        <span>{t === '00:38' || t === '01:12' ? <Mark>{e}</Mark> : e}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px] italic">Không ai khác ra vào cổng số 27 trong đêm.</p>
    <div className="h-14" />
    <Stamp text="Tổ DP 7" className="bottom-2 right-3" />
  </Sheet>
)

const P6 = () => (
  <Sheet org="Sổ chăm sóc tại nhà · Đào Thị Liên" title="Bác Trần Đình Hiển · tháng 4">
    <Row k="Thuốc sáng, trưa" v="Điều dưỡng đưa tận tay" />
    <Row k="Thuốc tối 21:00" v="Bác tự uống" strong />
    <p className="pt-1 text-[10px]">
      Ghi chú chung: <Mark>hai năm chưa bỏ cữ 21:00 lần nào</Mark>, sáng nào cũng kiểm hộp thuốc.
    </p>
    <p className="text-[10px] italic">18/03: tức ngực khi ngồi vẽ, rơi bút, tự hết sau 10 phút. Đã báo bác sĩ.</p>
    <p className="pt-1 text-[10px] font-bold">Thứ Hai 13/04</p>
    {[
      ['07:00', 'Huyết áp 130/80, tỉnh táo'],
      ['12:00', 'Ăn cơm, uống thuốc trưa'],
      ['17:30', 'Bưng cháo lên phòng'],
      ['17:45', 'Ăn hết cháo. Hơi mệt'],
      ['18:05', 'Ra về'],
    ].map(([t, e]) => (
      <div key={t} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-dotted border-black/20 font-mono text-[10px]">
        <span>{t}</span>
        <span>{e}</span>
      </div>
    ))}
    <Signature name="Đ. T. Liên" />
  </Sheet>
)

/** Body outline seen from the front, with the two bruises on the upper arms. */
const P7 = () => (
  <Sheet org="Trung tâm Pháp y TP.HCM" title="Phụ lục 02 · Thương tích và hoen tử thi">
    <div className="flex gap-3">
      <svg viewBox="0 0 120 170" className="w-24 shrink-0">
        <g fill="#f4efe0" stroke={LINE} strokeWidth="1.5">
          <circle cx="60" cy="20" r="14" />
          <path d="M40,40 L80,40 L86,110 L34,110 Z" />
          <path d="M40,42 L22,100 L30,102 L44,60 Z" />
          <path d="M80,42 L98,100 L90,102 L76,60 Z" />
          <path d="M40,110 L44,166 L56,166 L58,112 Z" />
          <path d="M80,110 L76,166 L64,166 L62,112 Z" />
        </g>
        <path d="M36,96 L84,96 L86,112 L80,140 L40,140 L34,112 Z" fill="#7a5aa8" opacity="0.55" />
        <path d="M44,156 L56,156 L56,166 L44,166 Z M64,156 L76,156 L76,166 L64,166 Z" fill="#7a5aa8" opacity="0.55" />
        {[[42, 48], [78, 48]].map(([x, y]) => (
          <g key={x}>
            {[0, 1, 2].map((k) => (
              <ellipse key={k} cx={x} cy={y + k * 5} rx="3" ry="2" fill="#5b4a8a" opacity="0.8" />
            ))}
          </g>
        ))}
        <text x="60" y="8" textAnchor="middle" fontSize="7" fill={LINE} fontFamily={mono}>MẶT SAU</text>
      </svg>
      <div className="space-y-1 text-[10px]">
        <p>
          Gãy C2, trầy ở trán và vai: <Mark>không có phản ứng sống</Mark>, xảy ra sau khi chết.
        </p>
        <p>
          Hoen tử thi cố định ở <Mark>mông, mặt sau đùi, gót chân</Mark>: sau khi chết, thi thể ở tư thế ngồi nhiều giờ rồi mới bị chuyển sang nằm.
        </p>
        <p>Dưới hai nách: vết hằn ngón tay, không phản ứng sống.</p>
        <p className="font-bold">Kết luận: chết do nhồi máu cơ tim cấp.</p>
      </div>
    </div>
    <Signature name="BS. L. T. Mai" />
  </Sheet>
)

const P8 = () => (
  <Sheet org="Tổng hợp của chuyên viên giám định An Tín" title="Các khoản nợ của Trần Đình Khoa">
    <Row k="Ngân hàng Phương Đông" v="1.100.000.000 đ" />
    <Row k="Ngân hàng Bến Thành" v="600.000.000 đ" />
    <Row k="Vay tay, giấy viết tay" v="600.000.000 đ" />
    <Row k="Tổng" v="2.300.000.000 đ" strong />
    <p className="pt-1 text-[10px]">Quán cà phê Mái Ngói đóng cửa 15/3, thiết bị bị thanh lý.</p>
    <p className="text-[10px]">
      Chủ khoản vay tay nhắn: <Mark>"Hạn chót 30/4. Không có tiền thì tôi tới nhà nói chuyện với ông chú của cậu."</Mark>
    </p>
    <div className="h-16" />
    <Stamp text="Quá hạn" className="bottom-2 right-3" />
  </Sheet>
)

const P9 = () => (
  <Sheet org="An Tín · Tổng đài chăm sóc khách hàng" title="Bản ghi cuộc gọi 06/04/2026 · 10:14">
    <p className="text-[10px] opacity-70">Người gọi xưng tên Trần Đình Khoa, hợp đồng AT-TN-2025-0214.</p>
    <div className="space-y-1 pt-1 text-[10px]">
      <p>
        <b>KH:</b> Cho tôi hỏi, chú tôi bị tim. <Mark>Nếu chú mất vì bệnh tim</Mark> thì có được chi không em?
      </p>
      <p>
        <b>TĐV:</b> Dạ không ạ. <Mark>Bệnh lý bị loại trừ theo Điều 7</Mark>. Hợp đồng chỉ chi khi tai nạn, như té ngã chẳng hạn.
      </p>
      <p>
        <b>KH:</b> Té ngã trong nhà cũng được hả? Cầu thang chẳng hạn?
      </p>
      <p>
        <b>TĐV:</b> Dạ được ạ, nếu giám định xác nhận là tai nạn.
      </p>
      <p>
        <b>KH:</b> Ừ, vậy được rồi.
      </p>
    </div>
    <div className="h-16" />
    <Stamp text="Lưu trữ" className="bottom-2 right-3" />
  </Sheet>
)

const P10 = () => (
  <Sheet org="Phòng Kỹ thuật hình sự, Công an TP.HCM" title="Kết luận giám định vật chứng số 0907">
    <Row k="Mẫu 1" v="2 ốc đồng, hộp đồ nghề nhà phụ" />
    <Row k="Mẫu 2" v="2 lỗ ốc, thanh chặn thảm bậc 3" />
    <div className="mt-1 flex gap-2">
      <svg viewBox="0 0 120 70" className="w-24 shrink-0">
        <rect width="120" height="70" fill="#f6efe2" stroke={LINE} strokeWidth="1" />
        {[30, 80].map((x) => (
          <g key={x}>
            <circle cx={x} cy="16" r="9" fill={C.brass} stroke={LINE} strokeWidth="1" />
            <rect x={x - 3} y="24" width="6" height="36" fill={C.brass} stroke={LINE} strokeWidth="1" />
            {[30, 38, 46, 54].map((y) => (
              <line key={y} x1={x - 4} y1={y} x2={x + 4} y2={y + 3} stroke={C.lim} strokeWidth="1" />
            ))}
          </g>
        ))}
      </svg>
      <p className="text-[10px]">
        Bước ren, đường kính, chiều dài <Mark>khớp hoàn toàn</Mark> với lỗ ốc. Vụn gỗ trong ren là <Mark>gỗ lim</Mark>, cùng loại gỗ cầu thang. Ren gỗ không hư: ốc được vặn ra bằng tua vít, không bị bật ra.
      </p>
    </div>
    <Signature name="Trung tá Đ. V. Sơn" />
  </Sheet>
)

const X1 = () => (
  <Sheet org="Bệnh viện Tim Tâm Đức · Phòng khám" title="Tóm tắt bệnh án">
    <Row k="Bệnh nhân" v="Trần Đình Hiển, 79 tuổi" />
    <Row k="Chẩn đoán" v="Suy tim độ II (NYHA)" strong />
    <Row k="Thuốc" v="3 cữ/ngày, cữ tối 21:00" />
    <p className="pt-1 text-[10px]">Lời dặn: đề phòng chóng mặt, té ngã. Nên dọn xuống sống ở tầng trệt, hạn chế đi cầu thang.</p>
    <p className="text-[10px] italic">18/03: cơn đau thắt ngực. Tái khám: 14/04/2026, 08:00.</p>
    <Signature name="BS. P. Q. Bình" />
  </Sheet>
)

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const X2 = () => (
  <Phone header="Thắng môi giới">
    <p className="text-center text-[9px] opacity-50">Tin nhắn gửi ông Hiển</p>
    <Bubble time="12/02">Chủ đầu tư trả 80 tỷ, giữ nguyên mặt tiền Pháp. Ông cân nhắc giúp tôi.</Bubble>
    <Bubble time="14/03">85 tỷ. Giá này cả Quận 3 không ai trả.</Bubble>
    <Bubble time="08/04">92 tỷ, lần chót. Ông đừng để tới lúc hối hận.</Bubble>
  </Phone>
)

const X4 = () => (
  <Sheet org="Thư tay" title="Gửi Châu">
    <div className="space-y-1.5 text-[12px] italic leading-snug text-[#1d3a6a]" style={{ fontFamily: 'Bitter, serif' }}>
      <p>Châu,</p>
      <p>Con nhắc chuyện bán nhà lần thứ tư rồi. Nhà này ông nội con xây năm 1930, ba lớn lên trong đó, mẹ con mất trong đó.</p>
      <p>
        Ba không bán. <Mark>Con muốn nhà thì đợi ba chết.</Mark>
      </p>
      <p className="text-right">Ba, tháng 3.2026</p>
    </div>
  </Sheet>
)

const P11 = () => (
  <Sheet org="Giấy viết tay · chú Tư nộp bản sao" title="Dặn lại">
    <div className="space-y-1.5 text-[12px] italic leading-snug text-[#1d3a6a]" style={{ fontFamily: 'Bitter, serif' }}>
      <p>Tôi, Trần Đình Hiển, dặn lại các con cháu:</p>
      <p>
        Nếu tôi mất, <Mark>chú Phạm Văn Tư được ở căn phòng sau bếp trọn đời</Mark> và nhận 500 triệu đồng, coi như trả ơn ba mươi năm chú lo cho nhà này.
      </p>
      <p className="text-right">Hiển, 02.2024</p>
    </div>
    <Row k="Chìa cổng, cửa sảnh" v="ông Hiển, chú Tư" />
  </Sheet>
)

// ---------------------------------------------------------------------------
// Photos and screens a suspect shows during an interview.

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

const Guest = ({ x, y, s = 1, skin = '#d9a47a', hair = '#1a1a1f', shirt, veil }: { x: number; y: number; s?: number; skin?: string; hair?: string; shirt: string; veil?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M-26,40 Q-24,0 -8,-6 L8,-6 Q24,0 26,40 Z" fill={shirt} />
    <rect x="-4" y="-14" width="8" height="10" fill={skin} />
    <ellipse cx="0" cy="-30" rx="13" ry="16" fill={skin} />
    <path d="M-14,-32 Q-14,-50 0,-48 Q14,-50 14,-32 Q8,-40 0,-40 Q-8,-40 -14,-32 Z" fill={hair} />
    {veil && <path d="M-16,-40 Q-30,0 -30,30 L-20,30 Q-18,-10 -10,-40 Z" fill="#fff" opacity="0.8" />}
    <circle cx="-5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <circle cx="5" cy="-30" r="1.6" fill={LINE} stroke="none" />
    <path d="M-5,-22 Q0,-18 5,-22" fill="none" strokeWidth="1.4" />
  </g>
)

const X3 = () => (
  <Phone header="Ảnh · Khoa">
    <div className="overflow-hidden rounded-md">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#5a2a2a" />
        <rect x="60" y="20" width="200" height="60" fill="#d9b04f" opacity="0.6" />
        <text x="160" y="58" textAnchor="middle" fontSize="20" fill="#7d2f2a" fontFamily="Bitter, serif">Phát ♥ Uyên</text>
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={20 + i * 32} cy="100" r="5" fill="#ffd98f" opacity="0.8" />
        ))}
        <Guest x={90} y={170} shirt="#2f2a2a" />
        <Guest x={160} y={168} shirt="#fff" veil skin="#efc39b" />
        <Guest x={230} y={164} s={1.2} shirt="#2f2a2a" skin="#d9a47a" />
        <rect x="244" y="120" width="8" height="26" fill="#f2a93b" opacity="0.8" stroke={LINE} strokeWidth="1" />
        <rect y="196" width="320" height="24" fill="#3a2a22" />
        <TimeTag t="13/04 22:46" />
      </svg>
    </div>
    <PhotoMeta when="13/04/2026 · 22:46" where="NH Hoa Viên, Q.10" />
    <p className="text-[10px]">"Gần 11 giờ tôi còn ở đây, cả trăm người thấy."</p>
  </Phone>
)

const X5 = () => (
  <Phone header="Nhật ký cuộc gọi · Châu">
    {[
      ['Ba (máy bàn)', '13/04 20:14', 'Không trả lời'],
      ['Ba (máy bàn)', '13/04 20:00', 'Không trả lời'],
      ['Ba (máy bàn)', '12/04 20:00', '6 phút 12 giây'],
      ['Ba (máy bàn)', '11/04 20:01', '4 phút 40 giây'],
    ].map(([who, t, r], i) => (
      <div key={t} className="flex items-center justify-between border-b border-black/10 py-1">
        <div>
          <p className={i < 2 ? 'font-semibold text-[#b23a2e]' : 'font-semibold'}>{who}</p>
          <p className="text-[9px] opacity-60">{t}</p>
        </div>
        <p className="text-[9px] opacity-70">{r}</p>
      </div>
    ))}
    <PhotoMeta when="Gọi từ nhà" where="Phú Mỹ Hưng, Q.7" />
  </Phone>
)

const X6 = () => (
  <Phone header="Zalo · Ông Hiển">
    <p className="text-center text-[9px] opacity-50">13/04/2026</p>
    <Bubble me time="21:37">Tôi đang đứng ở cổng, ông mở cửa giùm. Tôi mang bản hợp đồng mới.</Bubble>
    <Bubble me time="21:40">Đèn phòng ông còn sáng mà. Thôi mai tôi quay lại.</Bubble>
    <p className="text-right text-[9px] opacity-60">Đã gửi · chưa xem</p>
  </Phone>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, X1, X2, X3, X4, X5, X6, P11 }
