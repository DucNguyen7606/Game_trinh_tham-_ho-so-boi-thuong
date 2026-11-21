import { P } from '@/art/primitives'
import { accent, clothColors, ink } from '@/art/palette'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { isoSceneArt as sceneArt } from './iso/scenes'
import { Box, Cyl, IsoGroup, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.
// Each panel is a scene from the case redrawn with figures, or a key document.

type Pose = 'stand' | 'crouch' | 'sit' | 'ride'

/** A block figure (diorama style) in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, pose = 'stand', flip = false, hold }: { x: number; y: number; h?: number; color: string; pose?: Pose; flip?: boolean; hold?: 'bottle' | 'drive' | 'can' }) {
  // Faceless stand-ins: one generic build, coloured by the shirt of whoever they stand for.
  const spec: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'charcoal', mood: 'neutral' }
  const k = h / 105
  const facing = flip ? 'x' : 'y'
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={pose === 'ride' ? h * 0.5 : h * 0.22} ry={h * 0.07} fill={iso.ink} opacity="0.25" />
      <IsoGroup origin={[x, y]} scale={k}>
        {pose === 'ride' && (
          <>
            <Box at={[-40, -6, 10]} size={[90, 26, 22]} color={iso.coral} />
            <Cyl at={[-30, -8, 12]} r={14} len={6} axis="y" color={iso.ink} />
            <Cyl at={[40, -8, 12]} r={14} len={6} axis="y" color={iso.ink} />
          </>
        )}
        <IsoFigure at={[-13, -9, pose === 'ride' ? 18 : 0]} spec={spec} cloth={color} facing={facing} pose={pose === 'stand' ? 'stand' : 'sit'} />
        {hold === 'bottle' && <Cyl at={[22, 4, 40]} r={4} len={16} axis="z" color={iso.gold} />}
        {hold === 'drive' && <Box at={[18, 6, 36]} size={[14, 4, 10]} color={iso.metal} />}
        {hold === 'can' && <Box at={[18, 4, 22]} size={[14, 10, 18]} color={iso.coral} />}
      </IsoGroup>
    </g>
  )
}

/** Scene art with figures and marks drawn on top in the same coordinates. */
function Staged({ zone, children }: { zone: string; children: React.ReactNode }) {
  const Art = sceneArt[zone]
  return (
    <div className="absolute inset-0">
      <Art />
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {children}
      </svg>
    </div>
  )
}

/** A key document laid on the desk, for panels that are about paperwork. */
function OnDesk({ ids }: { ids: string[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[linear-gradient(180deg,#d9d2ee,#f6dccb)] p-6">
      {ids.map((id, i) => {
        const Doc = documents[id]
        return (
          <div key={id} className="w-[300px] shrink-0" style={{ rotate: `${i % 2 ? 2 : -2}deg` }}>
            <Doc />
          </div>
        )
      })}
    </div>
  )
}

const Marker = ({ x, y, n }: { x: number; y: number; n: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="26" fill={iso.coral} stroke="#ffffff" strokeWidth="5" />
    <text y="10" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff" fontFamily="'Be Vietnam Pro', sans-serif">
      {n}
    </text>
  </g>
)

function Fire() {
  return (
    <g>
      <rect width="1600" height="900" fill={accent.ember} opacity="0.22" style={{ mixBlendMode: 'screen' }} />
      {[260, 420, 600, 820, 1040, 1260].map((x, i) => (
        <g key={x} transform={`translate(${x} ${560 - (i % 3) * 30})`}>
          <polygon points={P([[-90, 120], [-60, -40], [-20, 20], [0, -160], [30, 10], [60, -70], [90, 120]])} fill={accent.ember} opacity="0.85" />
          <polygon points={P([[-50, 120], [-24, 10], [0, -70], [24, 20], [50, 120]])} fill={accent.amber} />
          <polygon points={P([[-20, 120], [0, 40], [20, 120]])} fill="#fff1c9" />
        </g>
      ))}
      <rect width="1600" height="260" fill={ink.night} opacity="0.55" />
    </g>
  )
}

const THINH = '#8a2f2a'
const BAO = '#e8e2d4'
const RO = '#5d6b3a'

export const reconstruction: ReconstructionPanel[] = (
  [
  {
    time: 'Tháng 6/2025',
    title: 'Kho đầy vải giả',
    text: 'Ông Thịnh nâng mức bảo hiểm hàng hóa từ 1,5 lên 4 tỷ. Bảo đứng tên thuê kho ở Long An, ba chuyến xe tải chở vải thật đi trong đêm. Ở Bình Tân chỉ còn những cuộn lõi giấy bọc một lớp vải. Kế hoạch là đốt kho đêm 20/7.',
    questionId: 'q2',
    Art: () => (
      <Staged zone="cong">
        <g transform="translate(1000 760)">
          <ellipse cx="120" cy="6" rx="300" ry="18" fill={ink.night} opacity="0.5" />
          <rect x="-140" y="-300" width="340" height="250" fill="#6e7378" />
          <rect x="-140" y="-300" width="340" height="18" fill="#8d9296" />
          <polygon points={P([[200, -220], [300, -220], [360, -140], [360, -50], [200, -50]])} fill={accent.teal} />
          <polygon points={P([[220, -205], [292, -205], [338, -144], [220, -144]])} fill={ink.night} opacity="0.7" />
          <circle cx="-60" cy="-40" r="40" fill="#151010" />
          <circle cx="280" cy="-40" r="40" fill="#151010" />
          <text x="30" y="-170" textAnchor="middle" fontSize="40" fontWeight="700" fill={ink.night} opacity="0.6" fontFamily="Barlow Condensed, sans-serif">
            → ĐỨC HÒA
          </text>
        </g>
        <Person x={760} y={780} h={310} color={THINH} />
        <Person x={880} y={790} h={300} color={BAO} flip />
      </Staged>
    ),
  },
  {
    time: '13/7, 22:14',
    title: 'Hủy vụ 20',
    text: 'Ngân hàng không cho gia hạn và sẽ kiểm kê kho sáng 16/7. Ông Thịnh nhắn Bảo hủy kế hoạch, chở hàng thật về để kiểm kê cho êm. Nhưng kiểm kê cũng sẽ mở sổ sách, và sổ sách sẽ lộ 620 triệu Bảo rút ra qua công ty ma Hưng Long.',
    questionId: 'q6',
    Art: () => <OnDesk ids={['P9', 'P3']} />,
  },
  {
    time: '14/7, 22:00',
    title: 'Cúp điện như mọi đêm',
    text: 'Ông Rô tắt cầu dao tổng cho đỡ tiền điện rồi ghi vào sổ trực, như suốt 9 năm nay. Từ lúc này cả kho không có điện. Đám cháy sau đó không thể là chập điện.',
    questionId: 'q1',
    Art: () => (
      <Staged zone="san-sau">
        <Person x={1040} y={780} h={330} color={RO} flip />
        <Marker x={1120} y={330} n="1" />
      </Staged>
    ),
  },
  {
    time: '15/7, 01:02',
    title: 'Khách quen của ông Rô',
    text: 'Bảo chạy chiếc Wave mua lại của Ngân, giấy tờ vẫn đứng tên cô, biển số che bằng giẻ. Anh ghé chòi bảo vệ, mang theo chai rượu nếp Mỏ Cày quê nhà. Ông Rô uống rồi ngủ. Bảo có chìa nên mở cửa kho mà không phải phá khóa.',
    questionId: 'q4',
    Art: () => (
      <Staged zone="cong">
        <Person x={430} y={700} h={300} color={RO} pose="sit" />
        <Person x={620} y={730} h={320} color={BAO} hold="bottle" flip />
        <Person x={1180} y={830} h={300} color="#3a3f48" pose="ride" flip />
        <Marker x={512} y={470} n="2" />
      </Staged>
    ),
  },
  {
    time: '01:05 – 01:20',
    title: 'Ngòi hẹn giờ dưới tủ sổ sách',
    text: 'Trong văn phòng, Bảo tháo ổ cứng máy kế toán rồi đặt một khoanh nhang muỗi cạnh giẻ tẩm xăng ngay dưới tủ sổ sách. Nhang cháy khoảng một tiếng rưỡi mới chạm tới xăng, đủ để anh đi thật xa.',
    questionId: 'q5',
    Art: () => (
      <Staged zone="van-phong">
        <Person x={600} y={790} h={360} color={BAO} pose="crouch" hold="drive" />
        <Marker x={448} y={640} n="3" />
        <Marker x={992} y={440} n="4" />
      </Staged>
    ),
  },
  {
    time: '01:34',
    title: 'Dựng chứng cứ ngoại phạm',
    text: 'Camera tiệm anh Huy thấy chiếc Wave ra khỏi hẻm lúc 01:21. Mười ba phút sau Bảo gọi xe ôm công nghệ ở đầu hẻm, đi tới quán karaoke ở Quận 6 cho nhiều người thấy mặt.',
    questionId: 'q7',
    Art: () => <OnDesk ids={['P6', 'P7']} />,
  },
  {
    time: '02:38',
    title: 'Lửa bén',
    text: 'Nhang cháy tới giẻ xăng. Lửa bắt từ góc văn phòng, chạy theo tủ sổ sách rồi lan sang khu hàng. 02:41 có người báo cháy. Các cuộn lõi giấy cháy rất nhanh.',
    questionId: 'q3',
    Art: () => (
      <Staged zone="khu-hang">
        <Fire />
      </Staged>
    ),
  },
  {
    time: '02:51',
    title: 'Cuộc gọi làm lộ chỗ đứng',
    text: 'Anh Huy gọi báo ông Thịnh. Sáu phút sau ông Thịnh gọi Bảo, nói chuyện bốn phút. Trạm phát sóng bắt được máy của Bảo ở gần nhà anh, không phải quán karaoke như anh khai.',
    questionId: 'q7',
    Art: () => <OnDesk ids={['P13']} />,
  },
  {
    time: '03:10 và 09:20',
    title: 'Dọn dấu vết',
    text: 'Bảo xóa thư mục Hưng Long trên ổ cứng lấy từ văn phòng. Sáng hôm sau anh chuyển cho ông Rô 5 triệu "uống cà phê". Ổ cứng sau đó được ai đó gửi nặc danh cho bạn, chỉ còn thư mục kho Long An, như muốn đẩy hết tội sang ông Thịnh.',
    questionId: 'q5',
    Art: () => <OnDesk ids={['P10', 'P12']} />,
  },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart
// with the documents that disprove it. Truth panels follow.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!
const colorOf = (id: string) => clothColors[suspect(id).portrait.outfitColor as keyof typeof clothColors]

/** A suspect's portrait pinned beside the documents the theory leans on. */
function Pinned({ who, ids }: { who: string; ids: string[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[linear-gradient(180deg,#d9d2ee,#f6dccb)] p-6">
      <div className="shrink-0 bg-[#f3e4c4] p-1.5 shadow-lg" style={{ rotate: '-3deg' }}>
        <Portrait spec={suspect(who).portrait as PortraitSpec} size={190} />
        <p className="pt-1 text-center font-mono text-xs text-[#2d1f18]">{suspect(who).name}</p>
      </div>
      {ids.map((id, i) => {
        const Doc = documents[id]
        return (
          <div key={id} className="w-[290px] shrink-0" style={{ rotate: `${i % 2 ? -2 : 2}deg` }}>
            <Doc />
          </div>
        )
      })}
    </div>
  )
}

/** Big stamp across a panel. */
const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 border-4 px-4 py-1 text-3xl opacity-85"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const arsonTheory: Record<string, { text: string; place: string; x: number; y: number }> = {
  thinh: {
    text: 'Theo bạn, chính ông Thịnh đốt kho. Kho đã mua bảo hiểm 4 tỷ, ngân hàng đòi kiểm kê, nên ông lẻn vào lúc nửa đêm và châm lửa ở văn phòng để lấy tiền bồi thường.',
    place: 'van-phong', x: 600, y: 790,
  },
  bao: {
    text: 'Theo bạn, Bảo là người châm lửa. Anh có chìa, quen ông Rô, và có lý do để sổ sách biến mất trước buổi kiểm kê.',
    place: 'van-phong', x: 600, y: 790,
  },
  ngan: {
    text: 'Theo bạn, Ngân đốt kho để trả thù vì bị đuổi việc. Cô từng viết "cái kho đó cháy cho rồi", và chiếc Wave đứng tên cô xuất hiện trong hẻm đêm đó.',
    place: 'san-sau', x: 620, y: 760,
  },
  huy: {
    text: 'Theo bạn, anh Huy đốt kho để ép ông Thịnh bán đất. Anh muốn mua mảnh đất 9 tỷ và bị từ chối, tiệm của anh lại sát vách.',
    place: 'san-sau', x: 620, y: 760,
  },
}

const fraudTheory: Record<string, { text: string; docs: string[] }> = {
  thinh: { text: 'Theo bạn, ông Thịnh là người khai khống: nâng mức bảo hiểm lên 4 tỷ rồi kê 412 cuộn vải không có thật.', docs: ['P1', 'P2'] },
  bao: { text: 'Theo bạn, Bảo tự mình khai khống. Anh lập bảng kê hàng hóa và giữ toàn bộ sổ sách.', docs: ['P2'] },
  ngan: { text: 'Theo bạn, Ngân dựng hồ sơ khống trước khi nghỉ việc để hại ông chủ cũ.', docs: ['X1'] },
  huy: { text: 'Theo bạn, anh Huy đứng sau hồ sơ khống để làm kho mất giá rồi mua lại đất.', docs: ['X2'] },
}

const arsonRefute: Record<string, { text: string; docs: string[] }> = {
  thinh: { text: 'Ông Thịnh đã nhắn hủy "vụ 20" từ tối 13/7 và muốn chở hàng thật về cho ngân hàng kiểm kê. Đêm cháy ông ở tiệc cưới tại Vũng Tàu, ảnh cuối chụp lúc 01:47, và chính anh Huy gọi báo ông mới biết, lúc 02:45.', docs: ['P9', 'X3'] },
  ngan: { text: 'Từ 00:58 đến 03:05 Ngân đang phát trực tiếp với hơn 200 người xem. Chiếc Wave đứng tên cô đã bán cho "anh Bảo" từ tháng 6, chưa sang tên.', docs: ['X5', 'P11'] },
  huy: { text: 'Anh Huy không có chìa, mà ổ khóa không bị phá. Camera của chính tiệm anh ghi lại chiếc Wave che biển số, và anh là người gọi báo ông Thịnh.', docs: ['P6', 'P13'] },
}

const fraudRefute: Record<string, { text: string; docs: string[] }> = {
  bao: { text: 'Người ký phụ lục nâng mức bảo hiểm là ông Thịnh, và tin nhắn "vụ 20" cho thấy ông chỉ đạo. Bảo làm theo, nhưng phần anh giấu là 620 triệu rút qua Hưng Long.', docs: ['P1', 'P9'] },
  ngan: { text: 'Ngân nghỉ việc từ cuối tháng 5. Phụ lục bảo hiểm ký ngày 03/6 do ông Thịnh đứng tên, cô không chạm được vào giấy tờ nào.', docs: ['P1'] },
  huy: { text: 'Anh Huy không dính gì tới hợp đồng bảo hiểm. Thư hỏi mua đất của anh đến trước vụ cháy và bị từ chối thẳng.', docs: ['P1', 'X2'] },
}

function FraudArt({ who }: { who: string }) {
  return (
    <>
      <Pinned who={who} ids={fraudTheory[who].docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function ArsonArt({ who }: { who: string }) {
  const a = arsonTheory[who]
  return (
    <>
      <Staged zone={a.place}>
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        <Person x={a.x} y={a.y} h={360} color={colorOf(who)} pose="crouch" hold="can" />
        <text x={a.x + 200} y={a.y - 360} textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function DecisionArt({ pay }: { pay: boolean }) {
  return (
    <>
      <OnDesk ids={pay ? ['P2', 'P4'] : ['P1', 'P3']} />
      <PanelStamp text={pay ? 'Chi trả' : 'Từ chối'} color={pay ? '#3f8a7e' : '#b23a2e'} />
    </>
  )
}

/**
 * Picture and one-line note shown behind a verdict choice while the player is deciding,
 * so each pick reads as a small scene of what they are claiming.
 */
export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'fraud' && fraudTheory[optionId])
    return { Art: () => <FraudArt who={optionId} />, note: fraudTheory[optionId].text }
  if (slotId === 'arson' && arsonTheory[optionId])
    return { Art: () => <ArsonArt who={optionId} />, note: arsonTheory[optionId].text }
  if (slotId === 'decision')
    return {
      Art: () => <DecisionArt pay={optionId === 'pay'} />,
      note:
        optionId === 'pay'
          ? 'Bạn cho rằng kho cháy thật, hàng mất thật, và công ty nên chi trả 4 tỷ cho ông Thịnh.'
          : 'Bạn cho rằng đây là vụ gian lận có chủ đích: từ chối chi trả và chuyển hồ sơ cho công an.',
    }
  return undefined
}

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  const fraud = fraudTheory[picks.fraud]
  const pay = picks.decision === 'pay'

  if (fraud)
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: `Kẻ khai khống: ${suspect(picks.fraud).name}`,
      text: fraud.text,
      Art: () => <FraudArt who={picks.fraud} />,
    })
  if (arsonTheory[picks.arson])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: `Người châm lửa: ${suspect(picks.arson).name}`,
      text: arsonTheory[picks.arson].text,
      Art: () => <ArsonArt who={picks.arson} />,
    })
  panels.push({
    kind: 'theory',
    time: 'Đề xuất của bạn',
    title: pay ? 'Chi trả 4 tỷ' : 'Từ chối và chuyển hồ sơ cho công an',
    text: pay
      ? 'Bạn đề xuất công ty chi trả. Theo bạn, kho cháy thật, hàng mất thật, và người chủ xứng đáng được bồi thường.'
      : 'Bạn từ chối chi trả và chuyển toàn bộ hồ sơ cho công an điều tra.',
    Art: () => <DecisionArt pay={pay} />,
  })

  // Take apart each wrong pick with the evidence that disproves it.
  const wrong: ReconstructionPanel[] = []
  const fr = fraudRefute[picks.fraud]
  if (fr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: `${suspect(picks.fraud).name} không phải kẻ khai khống`,
      text: fr.text,
      Art: () => (
        <>
          <OnDesk ids={fr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  const ar = arsonRefute[picks.arson]
  if (ar)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: `${suspect(picks.arson).name} không châm lửa`,
      text: ar.text,
      Art: () => (
        <>
          <OnDesk ids={ar.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  if (pay)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: 'Hàng hóa không hề mất',
      text: 'Vải thật đã được chở sang kho Long An từ cuối tháng 6. Thứ cháy ở Bình Tân phần lớn là lõi giấy bọc vải. Chi 4 tỷ là trả tiền cho một vụ gian lận.',
      Art: () => (
        <>
          <OnDesk ids={['P5', 'P2']} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  return [...panels, ...wrong]
}
