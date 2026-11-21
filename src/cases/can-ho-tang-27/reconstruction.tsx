import { clothColors } from '@/art/palette'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { isoSceneArt as sceneArt } from './iso/scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'
import { Marker, Night, StandIn } from '@/art/iso/props-ch9-12'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** A block stand-in in the scene's 1600x900 space, coloured by who it stands for. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, cap, hold }: { x: number; y: number; h?: number; color: string; flip?: boolean; cap?: boolean; hold?: 'box' | 'card' | 'screwdriver' }) {
  return <StandIn x={x} y={y} h={h} color={color} flip={flip} hair={cap ? 'cap' : 'short'} hold={hold === 'screwdriver' ? 'tool' : hold} />
}

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


const VU = clothColors.navy

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '06/12, 15:30',
      title: 'Thay pin, cài thêm một thẻ',
      text: 'Vũ lên căn 27.08 thay pin khóa, bảo chị Hai ra ban công đứng chờ. Trong bốn mươi phút đó, anh ghi một thẻ trắng từ phòng kỹ thuật vào khóa thành người dùng #09. Chị Ngọc không dùng thẻ nên không bao giờ thấy nó trong app.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="phong-khach">
          <Person x={330} y={720} h={300} color={VU} cap hold="card" />
          <Marker x={192} y={380} n="1" />
        </Staged>
      ),
    },
    {
      time: '10/12 đến 12/12',
      title: 'Mã mới lên sóng',
      text: 'Sợ tin nhắn say của Bảo, chị Ngọc đổi mã két ngày 10/12. Hai hôm sau, trong buổi livestream 2.800 người xem, chị mở két khoe chiếc Patek ngay trước ống kính. Vũ ngồi dưới hầm B2 xem, còn bình luận "mở chậm thôi chị".',
      questionId: 'q5',
      Art: () => <OnDesk ids={['X4', 'X6']} />,
    },
    {
      time: '20/12, 11:05 đến 16:40',
      title: '"Cất hết vô két rồi nha"',
      text: 'Chị Ngọc cất ba món vào két trên sóng livestream, khóa cửa lúc 13:02 rồi ra Tân Sơn Nhất bay đi Hà Nội. Tối đó Vũ nhận thẻ thang hàng KT-03 lúc 21:55.',
      questionId: 'q1',
      Art: () => <OnDesk ids={['X3', 'P3']} />,
    },
    {
      time: '21/12, 02:09 đến 02:14',
      title: 'Thang hàng lên tầng 27',
      text: 'Vũ ghi vào sổ ca là đi kiểm tra bơm, rồi quẹt KT-03 đi thang hàng lên tầng 27. Anh dựng thang nhôm, dùng tua vít xoay camera hành lang lên trần, rồi đi trên tấm thảm vừa hút bụi lúc 22 giờ tới cửa 27.08 và mở cửa bằng thẻ #09.',
      questionId: 'q6',
      Art: () => (
        <Staged zone="hanh-lang">
          <Night />
          <Person x={1060} y={640} h={240} color={VU} cap hold="screwdriver" />
          <Marker x={1160} y={80} n="2" />
          <Marker x={760} y={740} n="3" />
        </Staged>
      ),
    },
    {
      time: '02:19',
      title: 'Đúng mã ngay lần đầu',
      text: 'Két không bị cạy, ổ chìa cơ còn tem niêm. Vũ bấm đúng mã ngay lần đầu, lấy hai chiếc đồng hồ và bộ kim cương. 02:28 cửa khóa lại, 02:31 thang hàng về B2.',
      questionId: 'q2',
      Art: () => (
        <Staged zone="phong-ngu">
          <Night />
          <Person x={640} y={760} h={300} color={VU} cap hold="box" flip />
          <Marker x={400} y={460} n="4" />
        </Staged>
      ),
    },
    {
      time: '21/12, sáng',
      title: 'Một hồ sơ trông như gian lận',
      text: 'Chị Ngọc về tới nhà lúc 09:05. Cửa không bị phá, két không bị cạy, chị đang nợ ngân hàng và mới mua thêm bảo hiểm. Nhưng phụ lục bảo hiểm có đi kèm hóa đơn và giám định thật, và lúc két mở chị đang ngủ ở Hà Nội. Bảo thì ngồi bar Quận 1.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P8', 'X5']} />,
    },
    {
      time: '23/12 đến 24/12',
      title: 'Chiếc Rolex ở Lê Văn Sỹ',
      text: 'Vũ mang chiếc Rolex số máy 7Y3K2109 tới tiệm đồng hồ cũ ở Tân Bình, bán 650 triệu và đưa luôn CCCD. Hôm sau khoản nợ app vay 310 triệu của anh được tất toán.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P10', 'P11']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!
const colorOf = (id: string) => clothColors[suspect(id).portrait.outfitColor as keyof typeof clothColors]

function Pinned({ who, ids }: { who: string; ids: string[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[linear-gradient(180deg,#d9d2ee,#f6dccb)] p-6">
      <div className="shrink-0 rounded-2xl bg-white p-2 shadow-lg" style={{ rotate: '-3deg' }}>
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

const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 rounded-xl border-4 bg-white/70 px-4 py-1 text-3xl opacity-90"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const thiefTheory: Record<string, string> = {
  vu: 'Theo bạn, Vũ cài thẻ lạ vào khóa hôm thay pin, đêm 21/12 đi thang hàng lên tầng 27, mở cửa và mở két rồi mang đồ đi bán.',
  ngoc: 'Theo bạn, chị Ngọc tự giấu đồng hồ và trang sức, dựng chuyện mất trộm trong lúc mình đi vắng để lấy tiền bảo hiểm trả nợ.',
  bao: 'Theo bạn, Bảo nhớ mã két từ hồi ở chung, lẻn vào căn hộ trong đêm chị Ngọc đi Hà Nội.',
  hai: 'Theo bạn, chị Hai dùng vân tay của mình mở cửa, lén lấy đồ trong két.',
  sang: 'Theo bạn, ông Sang lợi dụng ca trực đêm để lên tầng 27 lấy đồ.',
}

const codeTheory: Record<string, { text: string; docs: string[] }> = {
  live: { text: 'Theo bạn, mã két lọt ra ngoài qua buổi livestream 12/12, khi chị Ngọc mở két ngay trước ống kính.', docs: ['X6'] },
  bao: { text: 'Theo bạn, Bảo vẫn nhớ mã két từ hồi còn ở chung.', docs: ['X4'] },
  hai: { text: 'Theo bạn, chị Hai lén nhìn chị Ngọc bấm mã.', docs: ['P6'] },
  ngoc: { text: 'Theo bạn, mã két không lọt đi đâu cả: chính chị Ngọc mở két.', docs: ['X1'] },
}

const thiefRefute: Record<string, { text: string; docs: string[] }> = {
  ngoc: { text: 'Lúc két mở, 02:19, chị Ngọc đang ở khách sạn Hà Nội. Đồ chị bảo hiểm là hàng thật đã giám định, và chiếc Rolex được người khác mang đi bán ở Tân Bình.', docs: ['P3', 'P10'] },
  bao: { text: 'Lúc 02:10 Bảo đang ở bar Quận 1, cách đó 6 km. Vân tay của anh bị xóa từ 15/10, và mã két đã đổi sau khi anh dọn đi.', docs: ['X5', 'P5'] },
  hai: { text: 'Đêm đó vân tay #02 của chị Hai không mở cửa lần nào. Cửa được mở bằng thẻ #09, thứ chị không có.', docs: ['P5', 'P6'] },
  sang: { text: 'Ông Sang ngồi sảnh, không có thẻ thang hàng. Thẻ KT-03 đi lên tầng 27 lúc 02:09 nằm trong tay Vũ.', docs: ['P7', 'P9'] },
}

const codeRefute: Record<string, { text: string; docs: string[] }> = {
  bao: { text: 'Chị Ngọc đổi mã ngày 10/12, sau tin nhắn của Bảo. Mã Bảo nhớ là mã cũ, không mở được két nữa.', docs: ['X4', 'X6'] },
  hai: { text: 'Chị Ngọc không bao giờ mở két khi có chị Hai. Nhưng ngày 12/12, chị mở két trên sóng cho hàng nghìn người xem.', docs: ['X6', 'P6'] },
  ngoc: { text: 'Két mở lúc 02:19 khi chị Ngọc đang ở Hà Nội. Người mở biết mã mới, mã từng lộ trên livestream 12/12.', docs: ['P3', 'X6'] },
}

function ThiefArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="phong-ngu">
        <Night opacity={0.25} />
        <Person x={640} y={760} h={300} color={colorOf(who)} hold="box" flip />
        <text x="1000" y="420" textAnchor="middle" fontSize="120" fontWeight="700" fill="#ffffff" opacity="0.7" fontFamily="'Be Vietnam Pro', sans-serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function CodeArt({ id }: { id: string }) {
  const t = codeTheory[id]
  return (
    <>
      {id === 'bao' || id === 'hai' || id === 'ngoc' ? <Pinned who={id} ids={t.docs} /> : <OnDesk ids={t.docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  pay: { title: 'Chi trả đủ 3,2 tỷ', note: 'Bạn cho rằng chị Ngọc mất trộm thật, kẻ trộm dùng thẻ và mã có được trái phép. Công ty chi đủ 3,2 tỷ rồi chuyển hồ sơ kẻ trộm cho công an.', stamp: 'Chi trả', color: '#3f8a7e', docs: ['P1', 'P8'] },
  cut: { title: 'Chi 1,6 tỷ', note: 'Bạn cho rằng chị Ngọc có lỗi vì tự để lộ mã két trên livestream, nên chỉ được chi một nửa.', stamp: 'Chi một nửa', color: '#cf9a32', docs: ['X6', 'P1'] },
  deny: { title: 'Từ chối toàn bộ', note: 'Bạn cho rằng chị Ngọc dàn dựng vụ trộm để trả nợ, công ty không chi đồng nào.', stamp: 'Từ chối', color: '#b23a2e', docs: ['X1', 'X2'] },
}

function DecisionArt({ id }: { id: string }) {
  const d = decisionText[id]
  return (
    <>
      <OnDesk ids={d.docs} />
      <PanelStamp text={d.stamp} color={d.color} />
    </>
  )
}

export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'thief' && thiefTheory[optionId]) return { Art: () => <ThiefArt who={optionId} />, note: thiefTheory[optionId] }
  if (slotId === 'code' && codeTheory[optionId]) return { Art: () => <CodeArt id={optionId} />, note: codeTheory[optionId].text }
  if (slotId === 'decision' && decisionText[optionId]) return { Art: () => <DecisionArt id={optionId} />, note: decisionText[optionId].note }
  return undefined
}

const refutePanel = (title: string, r: { text: string; docs: string[] }): ReconstructionPanel => ({
  kind: 'refute',
  time: 'Lật lại',
  title,
  text: r.text,
  Art: () => (
    <>
      <OnDesk ids={r.docs} />
      <PanelStamp text="Không khớp" color="#b23a2e" />
    </>
  ),
})

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  if (thiefTheory[picks.thief])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.thief === 'ngoc' ? 'Chị Ngọc tự dàn dựng' : `Kẻ trộm: ${suspect(picks.thief).name}`,
      text: thiefTheory[picks.thief],
      Art: () => <ThiefArt who={picks.thief} />,
    })
  if (codeTheory[picks.code])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.code === 'live' ? 'Mã lộ trên livestream' : picks.code === 'ngoc' ? 'Không ai biết mã ngoài chị Ngọc' : `Mã lọt qua ${suspect(picks.code).name}`,
      text: codeTheory[picks.code].text,
      Art: () => <CodeArt id={picks.code} />,
    })
  const d = decisionText[picks.decision]
  if (d)
    panels.push({
      kind: 'theory',
      time: 'Đề xuất của bạn',
      title: d.title,
      text: d.note,
      Art: () => <DecisionArt id={picks.decision} />,
    })

  const wrong: ReconstructionPanel[] = []
  const tr = thiefRefute[picks.thief]
  if (tr) wrong.push(refutePanel(picks.thief === 'ngoc' ? 'Chị Ngọc không dàn dựng' : `${suspect(picks.thief).name} không lấy đồ`, tr))
  const cr = codeRefute[picks.code]
  if (cr) wrong.push(refutePanel('Mã két không lọt ra theo đường đó', cr))
  if (picks.decision === 'cut')
    wrong.push(
      refutePanel('Hợp đồng không trừ tiền vì để lộ mã', {
        text: 'Điều 4 bảo hiểm cả trường hợp kẻ trộm dùng thẻ, mã có được trái phép. Hợp đồng không có điều khoản nào giảm trừ vì người được bảo hiểm để lộ mã.',
        docs: ['P1', 'P5'],
      }),
    )
  if (picks.decision === 'deny')
    wrong.push(
      refutePanel('Hồ sơ không gian lận', {
        text: 'Đồ là hàng thật, đã giám định trước khi bán bảo hiểm. Lúc két mở chị Ngọc ở Hà Nội, và chiếc Rolex được Vũ mang đi bán ở Tân Bình.',
        docs: ['P8', 'P10'],
      }),
    )
  return [...panels, ...wrong]
}
