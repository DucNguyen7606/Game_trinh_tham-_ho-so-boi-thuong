import { Mark, Phone, Row, Sheet, Signature, Stamp } from '@/art/docParts'
import { accent, ink } from '@/art/palette'
import type { PortraitSpec } from '@/art/Portrait'
import { FrontBust } from '@/art/iso/figure'
import { iso, tone } from '@/art/iso/iso'
import type { CaseData } from '@/game/types'
import caseJson from './case.json'
import { useGame } from '@/game/store'

// What each document in the case-file envelopes looks like, keyed by clue id.
// Brands are generic on purpose: a ride app, a chat app, a social network.

const P1 = () => (
  <Sheet org="Công ty Bảo hiểm An Tín" title="Phụ lục hợp đồng số 02">
    <Row k="Hợp đồng gốc" v="AT-HH-2023-0714" />
    <Row k="Bên mua" v="Hộ KD Kho vải Thịnh Phát" />
    <Row k="Đối tượng" v="Hàng hóa lưu kho" />
    <Row k="Số tiền BH cũ" v="1.500.000.000 đ" />
    <Row k="Số tiền BH mới" v="4.000.000.000 đ" strong />
    <Row k="Hiệu lực từ" v="03/06/2025" strong />
    <p className="pt-1">Lý do điều chỉnh: <Mark>"nhập thêm hàng vụ Tết"</Mark>.</p>
    <Signature name="Q. Thịnh" />
    <Stamp text="An Tín · Đã duyệt" className="bottom-2 right-24" />
  </Sheet>
)

const P2 = () => (
  <Sheet org="Kho vải Thịnh Phát" title="Bảng kê hàng hóa tổn thất">
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 font-semibold">
      <span>Mặt hàng</span>
      <span>Cuộn</span>
      <span>Thành tiền</span>
    </div>
    {[
      ['Kate Hàn Quốc', '140', '1.260.000.000'],
      ['Lụa tơ tằm', '62', '1.116.000.000'],
      ['Thun cotton 4c', '128', '768.000.000'],
      ['Jean nhập', '82', '656.000.000'],
    ].map(([a, b, c]) => (
      <div key={a} className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span className="text-right">{b}</span>
        <span className="text-right">{c}</span>
      </div>
    ))}
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 font-bold">
      <span>Tổng</span>
      <span>412</span>
      <span>3.800.000.000</span>
    </div>
    <p className="pt-1 text-[10px] opacity-70">Người lập: Phan Quốc Bảo</p>
  </Sheet>
)

const P3 = () => (
  <Sheet org="Ngân hàng TMCP Phương Nam · CN Bình Tân" title="Thông báo kiểm kê tài sản bảo đảm">
    <p>Kính gửi: Ông Quách Thịnh</p>
    <p>
      Khoản vay số 0912/2023, dư nợ <b>2.100.000.000 đ</b>, đáo hạn 15/8/2025.
    </p>
    <p>
      Ngân hàng sẽ kiểm kê hàng tồn kho tại địa chỉ kho vào <Mark>8h00 ngày 16/07/2025</Mark>.
    </p>
    <p>
      Đề nghị gia hạn của Quý khách ngày 08/7: <b>không chấp thuận</b>.
    </p>
    <Stamp text="Phương Nam · Phòng tín dụng" className="bottom-3 right-4" />
    <div className="h-10" />
  </Sheet>
)

const P4 = () => (
  <Sheet org="Đội PCCC & CNCH khu vực" title="Biên bản sơ bộ vụ cháy">
    <Row k="Thời gian báo cháy" v="02:41 ngày 15/07" />
    <Row k="Dập tắt" v="03:55" />
    <Row k="Thiệt hại về người" v="01 ngạt khói nhẹ" />
    <p className="pt-1">
      Nhận định ban đầu: <Mark>nghi do chập điện</Mark> khu văn phòng.
    </p>
    <p className="text-[10px] italic">Chưa loại trừ nguyên nhân khác. Chờ giám định.</p>
    <Stamp text="Đội PCCC · Lưu hồ sơ" className="bottom-2 right-3" />
    <div className="h-8" />
  </Sheet>
)

const P5 = () => (
  <div className="space-y-2">
    <Sheet org="Hợp đồng thuê kho" title="Kho số 7 · KCN Đức Hòa, Long An">
      <Row k="Bên thuê" v="Phan Quốc Bảo" strong />
      <Row k="Thời hạn" v="25/06 – 25/09/2025" />
      <Row k="Giá thuê" v="18.000.000 đ/tháng" />
      <Signature name="P. Q. Bảo" />
    </Sheet>
    <div className="flex gap-2">
      {['28/06', '02/07', '05/07'].map((d) => (
        <div key={d} className="flex-1 bg-[#fbf4e4] p-2 font-mono text-[9px] text-[#2d1f18] shadow" style={{ rotate: d === '02/07' ? '2deg' : '-2deg' }}>
          <p className="font-bold">Phiếu xe tải</p>
          <p>{d} · 5 tấn</p>
          <p>Bình Tân → Đức Hòa</p>
          <p className="italic">Nhận: Bảo</p>
        </div>
      ))}
    </div>
  </div>
)

const P6 = () => (
  <div className="bg-[#1c130f] p-2 shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <svg viewBox="0 0 320 180" className="block w-full">
      <rect width="320" height="180" fill="#2a2522" />
      <polygon points="0,180 120,70 200,70 320,180" fill="#3a332e" />
      <rect x="0" y="0" width="120" height="120" fill="#24201d" />
      <rect x="200" y="20" width="120" height="110" fill="#24201d" />
      {/* The motorbike entering the alley: a rider in blocks, grey in the night camera */}
      <circle cx="140" cy="126" r="10" fill="#111" />
      <circle cx="186" cy="126" r="10" fill="#111" />
      <Fb x={136} y={110} w={54} h={12} d={10} c="#5a5552" />
      <Fb x={154} y={78} w={18} h={32} d={12} c="#4a4542" />
      <Fb x={155} y={62} w={16} h={16} d={14} c="#5e5955" />
      <Fb x={170} y={86} w={18} h={6} d={8} c="#4a4542" />
      <rect width="320" height="180" fill={ink.fog} opacity="0.08" />
      <text x="8" y="14" fontSize="9" fill="#e8e8e8" fontFamily="IBM Plex Mono, monospace">CAM 02 · HẺM</text>
      <text x="312" y="14" fontSize="9" fill="#e8e8e8" textAnchor="end" fontFamily="IBM Plex Mono, monospace">15/07/2025 01:02:47</text>
      <circle cx="10" cy="170" r="3" fill={accent.red} />
      <text x="18" y="173" fontSize="8" fill="#e8e8e8" fontFamily="IBM Plex Mono, monospace">REC</text>
    </svg>
    <p className="px-1 pt-1 font-mono text-[10px] text-[#c4a27a]">Ra khỏi hẻm: 01:21:13 · biển số bị che</p>
  </div>
)

const P7 = () => (
  <Phone header="Chi tiết chuyến đi">
    <p className="text-[10px] opacity-60">Xe máy · 15/07/2025</p>
    <div className="space-y-1 border-l-2 border-[#3f8a7e] pl-2">
      <p>
        <b>01:34</b> Đón: <Mark>Đầu hẻm 46, đường Tân Kỳ Tân Quý</Mark>
      </p>
      <p>
        <b>01:51</b> Trả: Karaoke Hoàng Gia, Q.6
      </p>
    </div>
    <Row k="Khách" v="Bảo P." />
    <Row k="Cước" v="38.000 đ" strong />
  </Phone>
)

// The lookup result only shows once the tax-code puzzle is solved; before that the invoice
// carries the bare code, so the picture doesn't give the answer away.
const P8 = () => {
  const solved = useGame((s) => s.solvedPuzzles.includes('z1'))
  return (
    <div className="space-y-2">
      <Sheet org="Hóa đơn giá trị gia tăng" title="Công ty TNHH Vải Sợi Hưng Long">
        <Row k="MST bên bán" v="0318 427 627" strong />
        <Row k="Ký hiệu / Số" v="HL/24E · 0000137" />
        <Row k="Hàng hóa" v="Vải kate 1.240 m" />
        <Row k="Tổng thanh toán" v="98.500.000 đ" strong />
        <p className="text-[10px] opacity-70">Một trong 7 hóa đơn, tổng cộng 620.000.000 đ</p>
      </Sheet>
      {solved && (
        <div className="bg-[#f6efe2] p-2 font-sans text-[10px] text-[#2d1f18] shadow">
          <p className="font-semibold">Tra cứu mã số thuế 0318 427 627</p>
          <p>Người đại diện: <Mark>Phan Thị Lựu</Mark></p>
          <p>Địa chỉ: Ấp 3, xã Phước Mỹ Trung, huyện <Mark>Mỏ Cày Bắc</Mark>, Bến Tre</p>
          <p>Trạng thái: đang hoạt động · 0 lao động</p>
        </div>
      )}
    </div>
  )
}

const Bubble = ({ me, children, time }: { me?: boolean; children: React.ReactNode; time: string }) => (
  <div className={me ? 'ml-6 rounded-lg rounded-tr-none bg-[#3f8a7e] p-2 text-white' : 'mr-6 rounded-lg rounded-tl-none bg-white p-2'}>
    <p>{children}</p>
    <p className="text-right text-[8px] opacity-60">{time}</p>
  </div>
)

const P9 = () => (
  <Phone header="Bảo (cháu)">
    <p className="text-center text-[9px] opacity-50">13/07/2025</p>
    <Bubble me time="22:14">
      Hủy vụ 20. Ngân hàng không dời. Mai 15 kêu xe chở hàng về, kiểm kê cho đàng hoàng.
    </Bubble>
    <Bubble time="22:15">Dạ chú.</Bubble>
    <p className="text-right text-[8px] opacity-50">Đã xem</p>
  </Phone>
)

const P10 = () => (
  <div className="bg-[#1c130f] p-3 font-mono text-[10px] text-[#c4e0c0] shadow-[0_6px_16px_rgb(0_0_0/0.45)]">
    <p className="text-[#f2a93b]">Ổ cứng WD 1TB · nhận ẩn danh 16/07</p>
    <p className="opacity-70">Thư mục gốc:</p>
    <p>📁 Kho_LongAn/ (12 tệp)</p>
    <p>📁 HopDong_BaoHiem/ (4 tệp)</p>
    <p className="pt-1 opacity-70">Nhật ký hệ thống:</p>
    <p>
      15/07/2025 <span className="bg-[#f2a93b] px-0.5 text-[#1c130f]">03:10:22</span> DELETE /Hung_Long/ (31 tệp)
    </p>
    <p>15/07/2025 03:11:05 EJECT</p>
  </div>
)

const P11 = () => (
  <div className="space-y-2">
    <div className="mx-auto w-64 rounded-md bg-[#d9e4d6] p-3 font-sans text-[10px] text-[#2d1f18] shadow">
      <p className="text-center font-semibold uppercase">Giấy chứng nhận đăng ký xe</p>
      <Row k="Chủ xe" v="Võ Thị Kim Ngân" strong />
      <Row k="Nhãn hiệu" v="Wave Alpha, đỏ" />
      <Row k="Biển số" v="59-X3 418.27" />
    </div>
    <Phone header="Nhóm Mua bán xe cũ Bình Tân">
      <p>
        <b>Kim Ngân</b> · 12/06
      </p>
      <p>Pass Wave đỏ, máy êm, 9tr, ai cần ib.</p>
      <div className="rounded bg-black/5 p-1.5 text-[10px]">
        <p className="opacity-60">Tin nhắn riêng</p>
        <p>
          <Mark>Anh Bảo</Mark>: Mai anh qua lấy, trả tiền mặt nha em. Giấy tờ để từ từ sang tên.
        </p>
      </div>
    </Phone>
  </div>
)

const P12 = () => (
  <Sheet org="Sao kê tài khoản · Nguyễn Văn Rô" title="Từ 10/07 đến 16/07/2025">
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 font-semibold">
      <span>Ngày</span>
      <span>Nội dung</span>
      <span>Số tiền</span>
    </div>
    {[
      ['10/07', 'Lương tháng 6', '+6.500.000'],
      ['12/07', 'Rút ATM', '−2.000.000'],
      ['15/07 09:20', 'PHAN QUOC BAO chu Tu uong ca phe', '+5.000.000'],
    ].map(([a, b, c], i) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{i === 2 ? <Mark>{b}</Mark> : b}</span>
        <span>{c}</span>
      </div>
    ))}
  </Sheet>
)

const P13 = () => (
  <Sheet org="Nhà mạng · trích xuất theo yêu cầu" title="Nhật ký cuộc gọi đêm 14–15/07">
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2 font-semibold">
      <span>Giờ</span>
      <span>Gọi → Nhận</span>
      <span>Dài</span>
      <span>Trạm</span>
    </div>
    {[
      ['02:45', 'Huy → Thịnh', '1:52', 'BTN-04'],
      ['02:51', 'Thịnh → Bảo', '4:07', 'Q06-11'],
    ].map(([a, b, c, d], i) => (
      <div key={a} className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2 border-b border-dotted border-black/20">
        <span>{a}</span>
        <span>{b}</span>
        <span>{c}</span>
        <span>{i === 1 ? <Mark>{d}</Mark> : d}</span>
      </div>
    ))}
    <p className="pt-1 text-[10px]">Trạm Q06-11: phường 13, Quận 6 (gần nhà Bảo). Quán karaoke thuộc trạm Q06-03.</p>
  </Sheet>
)

const X1 = () => (
  <Phone header="Trang cá nhân · Kim Ngân">
    <p>
      <b>Kim Ngân</b> · 28/05
    </p>
    <p>Làm 3 năm bị đuổi như đuổi chó vì nói thật. Cái kho đó cháy cho rồi 😤</p>
    <p className="text-[10px] opacity-60">👍 41 · 💬 17</p>
    <div className="rounded bg-[#b23a2e]/15 p-1.5 text-[10px]">
      <p className="font-semibold">🔴 Đang phát trực tiếp</p>
      <p>15/07 · 00:58 → 03:05 · 214 người xem</p>
    </div>
  </Phone>
)

const X2 = () => (
  <Sheet org="Tiệm vật tư Gia Huy" title="Thư đề nghị chuyển nhượng">
    <p>Gửi anh Thịnh,</p>
    <p>
      Tôi xin đề nghị mua lại mảnh đất kho với giá <b>9 tỷ đồng</b>, thanh toán một lần.
    </p>
    <p>Mong anh cân nhắc.</p>
    <Signature name="Gia Huy" />
    <p className="absolute bottom-10 left-5 rotate-[-8deg] text-base font-bold text-[#b23a2e]" style={{ fontFamily: 'Bitter, serif' }}>
      KHÔNG BÁN!
    </p>
  </Sheet>
)

// ---------------------------------------------------------------------------
// Photos a suspect shows on their phone during an interview. They are drawn in
// the diorama style seen straight on: block people (the same FrontBust as the
// portrait cards) and block furniture with a sliver of top and right side.

const DX = 0.32, DY = 0.24

/** A block seen straight on: front face (x, y = its top-left corner), with a sliver of top and right side `d` deep. */
const Fb = ({ x, y, w, h, d = 10, c, top, side }: { x: number; y: number; w: number; h: number; d?: number; c: string; top?: string; side?: string }) => {
  const ox = d * DX, oy = d * DY
  return (
    <g>
      <polygon points={`${x + w},${y} ${x + w + ox},${y - oy} ${x + w + ox},${y + h - oy} ${x + w},${y + h}`} fill={side ?? tone(c, -0.28)} />
      <polygon points={`${x},${y} ${x + w},${y} ${x + w + ox},${y - oy} ${x + ox},${y - oy}`} fill={top ?? tone(c, 0.14)} />
      <rect x={x} y={y} width={w} height={h} fill={c} />
    </g>
  )
}

const cast = Object.fromEntries((caseJson as CaseData).suspects.map((s) => [s.id, s.portrait])) as Record<string, PortraitSpec>
const extra: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'young', mood: 'smile' }

/**
 * A person in a photo: (x, y) is the middle of the chest, s the size. `who` takes
 * a suspect's own look; otherwise `look` and raw colours describe an extra.
 */
const Guest = ({ x, y, s = 1, who, look, skin, hair, shirt }: { x: number; y: number; s?: number; who?: string; look?: Partial<PortraitSpec>; skin?: string; hair?: string; shirt?: string }) => (
  <FrontBust spec={{ ...(who ? cast[who] : extra), ...look }} k={1.25 * s} at={[x, y - 30 * s]} colors={{ skin, hair, cloth: shirt }} />
)

const Stamp24 = ({ t }: { t: string }) => (
  <g>
    <rect x="8" y="8" width="104" height="18" rx="6" fill={iso.ink} opacity="0.55" />
    <text x="14" y="21" fontSize="11" fill="#fff" fontFamily="IBM Plex Mono, monospace">{t}</text>
  </g>
)

const PhotoMeta = ({ when, where }: { when: string; where: string }) => (
  <p className="flex justify-between text-[10px] opacity-70">
    <span>{when}</span>
    <span>📍 {where}</span>
  </p>
)

/** Thịnh's wedding photos in Vũng Tàu: the last one is taken at 01:47, while the fuse is burning in Bình Tân. */
const X3 = () => (
  <Phone header="Thư viện ảnh · Đám cưới bé Tuấn">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#d8695c" />
        <rect y="150" width="320" height="70" fill="#c25549" />
        {/* String lights and block lanterns over the banquet */}
        <path d="M0,30 Q160,70 320,26" fill="none" stroke={iso.ink} strokeWidth="1.2" opacity="0.6" />
        {Array.from({ length: 13 }, (_, i) => (
          <Fb key={i} x={8 + i * 25} y={27 + Math.sin((i / 12) * Math.PI) * 18} w={5} h={5} d={6} c="#ffe1a0" />
        ))}
        {[104, 204, 284].map((x) => (
          <g key={x}>
            <Fb x={x - 4} y={42} w={8} h={5} d={8} c={iso.gold} />
            <Fb x={x - 12} y={47} w={24} h={30} d={18} c={iso.coral} />
            <rect x={x - 12} y={57} width="24" height="2" fill={iso.gold} />
            <rect x={x - 12} y={67} width="24" height="2" fill={iso.gold} />
          </g>
        ))}
        {/* Window onto the night sea, with the Vũng Tàu lighthouse on the hill */}
        <Fb x={12} y={84} w={74} h={58} d={10} c="#f3e4cf" />
        <rect x="17" y="89" width="64" height="48" fill="#3c4f78" />
        <polygon points="17,125 40,112 60,118 81,114 81,137 17,137" fill="#58776a" />
        <rect x="17" y="131" width="64" height="6" fill="#5f8fb4" />
        <Fb x={51} y={100} w={7} h={16} d={6} c={iso.cream} />
        <Fb x={50} y={95} w={9} h={5} d={6} c={iso.coral} />
        <polygon points="58,97 81,90 81,104" fill="#ffe1a0" opacity="0.55" />
        {/* The wedding banner */}
        <Fb x={118} y={74} w={84} h={46} d={8} c="#b8372c" />
        <rect x="122" y="78" width="76" height="38" fill="none" stroke={iso.gold} strokeWidth="2" />
        <text x="160" y="93" textAnchor="middle" fontSize="13" fill={iso.gold} fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="800">Tuấn ♥ Vy</text>
        <text x="160" y="104" textAnchor="middle" fontSize="8.5" fill="#ffe7b8" fontFamily="'Be Vietnam Pro', sans-serif">14 · 07 · 2025</text>
        <text x="160" y="113" textAnchor="middle" fontSize="6" fill="#ffe7b8" fontFamily="'Be Vietnam Pro', sans-serif">NH HẢI ÂU · VŨNG TÀU</text>
        {/* A guest on the left, the couple in the middle, Thịnh raising a glass on the right */}
        <Guest x={62} y={186} s={0.95} look={{ hair: 'long', build: 'thin', outfitColor: 'mustard' }} shirt="#e2a63b" />
        <Guest x={132} y={176} look={{ hair: 'bun', build: 'thin', skin: 0, accessory: ['earrings'] }} shirt="#fbf4e8" />
        <Guest x={180} y={176} look={{ hair: 'side-part', accessory: ['tie'] }} shirt="#2f4258" />
        <Guest x={250} y={180} s={1.1} who="thinh" look={{ mood: 'smile' }} />
        {/* His raised forearm, the gold watch he never takes off, and the beer */}
        <Fb x={272} y={134} w={9} h={36} d={8} c="#d9a47a" />
        <Fb x={271} y={150} w={11} h={6} d={8} c={iso.gold} />
        <rect x="274" y="151.5" width="4" height="3" fill="#fff6e2" />
        <Fb x={273} y={112} w={10} h={20} d={8} c="#fff6e2" />
        <rect x="274" y="119" width="8" height="12" fill="#f1b34a" />
        <Fb x={270} y={128} w={14} h={9} d={8} c="#d9a47a" />
        {/* Banquet table in front */}
        <Fb x={-4} y={192} w={330} h={30} d={30} c="#f6ead2" />
        {[24, 96, 186, 270].map((x) => (
          <Fb key={x} x={x} y={190} w={30} h={3} d={14} c="#ffffff" />
        ))}
        <Fb x={140} y={178} w={8} h={14} d={6} c="#7fae8a" />
        <Stamp24 t="15/07 01:47" />
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 01:47" where="Nhà hàng Hải Âu, Vũng Tàu" />
    <div className="grid grid-cols-3 gap-1">
      {[
        ['23:52', '#d8695c'],
        ['00:41', '#c25549'],
        ['01:47', '#e4846a'],
      ].map(([t, c]) => (
        <div key={t} className="relative h-10 rounded-lg" style={{ background: c }}>
          <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white/90">{t}</span>
        </div>
      ))}
    </div>
    <p className="text-[10px]">
      Ảnh cuối chụp lúc <Mark>01:47</Mark>, cách kho Bình Tân khoảng 2 giờ xe.
    </p>
  </Phone>
)

/** Bảo's karaoke selfie: he really is there from 02:10, but only after the fuse was set. */
const X4 = () => (
  <Phone header="Ảnh Bảo gửi trong nhóm chat" dark>
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#43335e" />
        <circle cx="70" cy="40" r="60" fill="#c66fb4" opacity="0.35" />
        <circle cx="270" cy="60" r="70" fill="#5fb3a3" opacity="0.35" />
        {/* Sofa back and the lyrics screen */}
        <Fb x={-4} y={150} w={330} h={50} d={16} c="#5b4a7c" />
        <Fb x={170} y={30} w={128} h={80} d={12} c="#211a33" />
        <rect x="182" y="70" width="104" height="8" rx="2" fill={iso.gold} />
        <rect x="190" y="84" width="88" height="6" rx="2" fill={iso.cream} opacity="0.7" />
        <Guest x={70} y={180} s={1.05} look={{ hair: 'short', mood: 'smile' }} shirt="#3a332f" skin="#b9815a" />
        <Guest x={250} y={186} s={0.95} look={{ hair: 'long', build: 'thin', skin: 0 }} shirt="#7a9fb0" />
        {/* Bảo in his white shirt and glasses, singing */}
        <Guest x={160} y={176} s={1.25} who="bao" look={{ mood: 'smile' }} />
        {/* Raised arm with the mic: the shirt cuff has a black smudge, like soot */}
        <Fb x={178} y={138} w={10} h={30} d={8} c="#ece2cf" />
        <rect x="178" y="141" width="10" height="7" fill={iso.sootDeep} opacity="0.75" />
        <Fb x={177} y={127} w={12} h={11} d={8} c="#efc39b" />
        <Fb x={179} y={104} w={8} h={24} d={6} c="#2b2b33" />
        <Fb x={176} y={96} w={14} h={10} d={10} c="#55556a" />
        {/* Table: room slip, a key ring tagged KHO, a coil box poking out of his bag */}
        <Fb x={-4} y={198} w={330} h={24} d={24} c="#2f2545" />
        <Fb x={18} y={200} w={62} h={17} d={4} c="#f6efe2" />
        <text x="49" y="207" textAnchor="middle" fontSize="6" fill="#2d1f18" fontFamily="IBM Plex Mono, monospace">PHÒNG 07</text>
        <text x="49" y="214" textAnchor="middle" fontSize="6" fill="#2d1f18" fontFamily="IBM Plex Mono, monospace">VÀO 02:05</text>
        <circle cx="140" cy="200" r="5" fill="none" stroke="#e2c98a" strokeWidth="1.8" />
        <Fb x={144} y={197} w={12} h={4} d={4} c="#e2c98a" />
        <Fb x={110} y={190} w={22} h={12} d={6} c={iso.coral} />
        <text x="121" y="199" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="IBM Plex Mono, monospace">KHO</text>
        <Fb x={236} y={196} w={58} h={26} d={16} c="#5b5048" />
        <Fb x={252} y={184} w={28} h={13} d={12} c="#3d8a5a" />
        <text x="266" y="193" textAnchor="middle" fontSize="5.5" fill="#f2e6b8" fontFamily="IBM Plex Mono, monospace">◎ NHANG</text>
        <Stamp24 t="15/07 02:10" />
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 02:10" where="Karaoke Hoàng Gia, Q.6" />
    <p className="text-[10px]">
      "Quẩy tới sáng nha mấy ông 🎤" · gửi lúc <Mark><span className="text-[#1c130f]">02:11</span></Mark>
    </p>
  </Phone>
)

/** Ngân's livestream screenshot: the wall clock and the comments pin her at home, and mention the red Wave sold to Bảo. */
const X5 = () => (
  <Phone header="Ảnh chụp màn hình · Live Kim Ngân" dark>
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#f0dccb" />
        <Fb x={-4} y={156} w={330} h={70} d={20} c="#d8b89c" />
        {/* Clothes rack, ring light and the wall clock behind her */}
        <Fb x={18} y={38} w={104} h={4} d={8} c={iso.inkSoft} />
        {[30, 52, 74, 96].map((x, i) => (
          <Fb key={x} x={x - 9} y={44} w={18} h={48} d={8} c={['#e2a63b', '#7a9fb0', iso.coral, '#fbf4e8'][i]} />
        ))}
        <circle cx="270" cy="70" r="32" fill="none" stroke="#fffaf0" strokeWidth="9" />
        <circle cx="270" cy="70" r="32" fill="none" stroke={iso.gold} strokeWidth="1" opacity="0.5" />
        <Fb x={180} y={20} w={40} h={40} d={8} c={iso.cream} />
        <circle cx="200" cy="40" r="15" fill="#fffaf0" stroke={iso.ink} strokeWidth="1.5" />
        <path d="M200,40 L200,28 M200,40 L206,38" stroke={iso.ink} strokeWidth="2" strokeLinecap="round" />
        <text x="200" y="70" textAnchor="middle" fontSize="7" fill={iso.ink} fontFamily="IBM Plex Mono, monospace">01:10</text>
        <Guest x={160} y={168} s={1.3} who="ngan" look={{ mood: 'smile' }} />
        {/* Holding up a pink blouse to the camera */}
        <path d="M128,140 v-6 a4,4 0 1 1 4,-4" fill="none" stroke={iso.ink} strokeWidth="1.5" />
        <Fb x={112} y={142} w={40} h={50} d={8} c="#f4aaa3" />
        <rect x="112" y="142" width="12" height="14" fill="#e6918a" />
        <rect x="140" y="142" width="12" height="14" fill="#e6918a" />
        {/* her selling table in front of the phone */}
        <Fb x={40} y={194} w={240} h={30} d={24} c="#b98f6e" />
        <Fb x={190} y={184} w={30} h={10} d={14} c={iso.cream} />
        <rect x="8" y="8" width="58" height="16" rx="6" fill="#e0453a" />
        <text x="37" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="IBM Plex Mono, monospace">● LIVE</text>
        <rect x="72" y="8" width="66" height="16" rx="6" fill={iso.ink} opacity="0.55" />
        <text x="105" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="IBM Plex Mono, monospace">👁 214</text>
      </svg>
    </div>
    <div className="space-y-0.5 rounded bg-white/10 p-1.5 text-[10px]">
      <p><b>thuha.98</b>: chị ơi cái áo hồng còn size M hông</p>
      <p><b>minhkhoa</b>: chiếc Wave đỏ chị pass hồi tháng 6 còn hông 😆</p>
      <p><b>Kim Ngân</b>: bán cho anh Bảo ở kho cũ rồi nha, giấy tờ chưa sang tên nè</p>
    </div>
    <PhotoMeta when="15/07/2025 · 01:10" where="Phòng trọ, Bình Tân" />
  </Phone>
)

/** Huy's photo of the fire from his upstairs window at 02:40. */
const X6 = () => (
  <Phone header="Thư viện ảnh · Gia Huy">
    <div className="overflow-hidden rounded-xl">
      <svg viewBox="0 0 320 220" className="block w-full">
        <rect width="320" height="220" fill="#27304a" />
        <circle cx="280" cy="30" r="10" fill="#f6efe3" opacity="0.8" />
        {/* Smoke column rising from the office corner on the left */}
        <path d="M70,110 Q40,60 80,30 Q110,0 90,-10 L150,-10 Q130,30 120,60 Q110,90 110,110 Z" fill="#6c6787" opacity="0.7" />
        {/* Warehouse: every window dark, the fire only at the office corner */}
        <Fb x={40} y={98} w={220} h={88} d={40} c="#454c66" />
        <polygon points="36,98 150,66 264,98" fill="#5a6280" />
        <polygon points="150,66 162.8,56.4 276.8,88.4 264,98" fill="#3a405a" />
        {[120, 160, 200, 240].map((x) => (
          <rect key={x} x={x - 10} y="112" width="20" height="16" fill="#1c2236" />
        ))}
        <rect x="56" y="110" width="34" height="26" fill={iso.ember} />
        <path d="M58,136 Q66,112 74,124 Q80,106 88,136 Z" fill="#ffd26a" />
        <text x="73" y="148" textAnchor="middle" fontSize="7" fill={iso.cream} fontFamily="IBM Plex Mono, monospace">VĂN PHÒNG</text>
        {/* Front gate, padlock still hanging closed */}
        <Fb x={132} y={146} w={60} h={40} d={6} c="#5a6280" />
        <rect x="161" y="146" width="2" height="40" fill="#3a405a" />
        <path d="M158,160 a4,4 0 0 1 8,0" fill="none" stroke={iso.gold} strokeWidth="1.8" />
        <Fb x={156} y={160} w={12} h={9} d={6} c={iso.gold} />
        {/* Guard hut: light on, the guard slumped over the table, a bottle beside him */}
        <Fb x={216} y={150} w={50} h={36} d={20} c="#f2c46d" />
        <Fb x={212} y={140} w={58} h={8} d={22} c="#7d5c41" />
        <rect x="220" y="156" width="42" height="24" fill="#fbe3a6" />
        <Fb x={222} y={172} w={36} h={4} d={8} c={iso.wood} />
        <Fb x={226} y={164} w={22} h={9} d={10} c="#6b6a35" />
        <Fb x={226} y={159} w={11} h={10} d={10} c="#8f5f3d" />
        <Fb x={250} y={160} w={5} h={13} d={5} c="#3f8a5a" />
        <Fb x={-4} y={186} w={330} h={40} d={20} c="#363d56" />
        <Stamp24 t="15/07 02:40" />
      </svg>
    </div>
    <PhotoMeta when="15/07/2025 · 02:40" where="Gác tiệm Gia Huy" />
    <p className="text-[10px]">Chụp từ cửa sổ lầu, 5 phút trước khi gọi ông Thịnh.</p>
  </Phone>
)

/** Old electrical inspection: makes a short circuit sound likely, until you see the main breaker was off. */
const X7 = () => (
  <Sheet org="Đội PCCC quận Bình Tân" title="Biên bản kiểm tra an toàn PCCC">
    <Row k="Cơ sở" v="Kho vải Thịnh Phát" />
    <Row k="Ngày kiểm tra" v="18/09/2024" />
    <p>1. Bình chữa cháy: đủ, còn hạn.</p>
    <p>
      2. Hệ thống điện: <Mark>dây dẫn khu văn phòng xuống cấp</Mark>, vỏ bọc nứt. Đề nghị thay trước 31/12/2024.
    </p>
    <p>3. Lối thoát hiểm: thông thoáng.</p>
    <p className="pt-1 text-[10px] opacity-70">Hồ sơ không kèm biên bản khắc phục mục 2.</p>
    <Signature name="Đ. Văn Khoa" />
  </Sheet>
)

/** Huy's credit book: the warehouse buys petrol from him for its generator. */
const X8 = () => (
  <Phone header="Thư viện ảnh · Gia Huy">
    <div className="rounded-md bg-[#efe3c8] p-2 font-mono text-[10px] text-[#2d1f18]">
      <p className="mb-1 text-center font-semibold">SỔ BÁN CHỊU · THÁNG 7</p>
      {[
        ['02/7', 'Xi măng 2 bao', 'Út Mập'],
        ['05/7', 'Xăng 5L + can', 'Kho T.Phát (chú Tư)'],
        ['09/7', 'Ốc vít, keo', 'Chị Bảy'],
        ['12/7', 'Xăng 5L + can', 'Kho T.Phát (Bảo)'],
        ['13/7', 'Bóng đèn 40W', 'Kho T.Phát (chú Tư)'],
      ].map(([a, b, c]) => (
        <div key={a + b} className="grid grid-cols-[34px_1fr_auto] gap-1 border-b border-dotted border-black/25">
          <span>{a}</span>
          <span>{b}</span>
          <span>{c}</span>
        </div>
      ))}
      <p className="pt-1 text-[9px] opacity-70">Kho xài máy phát lúc cúp điện, tháng nào cũng mua.</p>
    </div>
    <PhotoMeta when="16/07/2025 · 10:05" where="Tiệm vật tư Gia Huy" />
  </Phone>
)

/** Thịnh pawned his house papers three days before the fire: a motive, not proof. */
const X9 = () => (
  <Sheet org="Hiệu cầm đồ Phát Đạt · Quận 6" title="Biên nhận cầm đồ">
    <Row k="Người cầm" v="Quách Thịnh" />
    <Row k="Tài sản" v="Sổ đỏ nhà số 41 đường Bình Phú" />
    <Row k="Số tiền" v="300.000.000 đ" strong />
    <Row k="Ngày cầm" v="11/07/2025" />
    <Row k="Lãi" v="3.000 đ / 1 triệu / ngày" />
    <p className="pt-1">Ghi chú: <Mark>"trả lương công nhân + tiền hàng"</Mark>.</p>
    <Signature name="Q. Thịnh" />
  </Sheet>
)

/** Ngân's complaint about fake workers on the payroll. It was returned for lack of proof. */
const X10 = () => (
  <Sheet org="Phòng Lao động · Thương binh và Xã hội quận Bình Tân" title="Đơn khiếu nại">
    <p>Người làm đơn: Võ Thị Kim Ngân, công nhân Kho vải Thịnh Phát.</p>
    <p>
      Nội dung: kế toán Phan Quốc Bảo <Mark>ghi thêm 6 người không có thật</Mark> vào bảng chấm công từ tháng 1, lĩnh lương thay. Tôi phản ánh với chủ kho thì bị cho nghỉ việc ngày 20/5.
    </p>
    <p className="pt-1 text-[10px] opacity-70">Bút phê: "Trả đơn. Người khiếu nại chưa cung cấp được bảng lương gốc."</p>
    <Stamp text="Đã trả đơn · 06/2025" className="bottom-3 right-6" />
  </Sheet>
)

export const documents: Record<string, () => JSX.Element> = { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 }
