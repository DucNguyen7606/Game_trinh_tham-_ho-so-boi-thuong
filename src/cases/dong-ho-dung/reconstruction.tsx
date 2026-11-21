import { clothColors } from '@/art/palette'
import caseData from './case.json'
import { isoSceneArt as sceneArt, stepAt } from './iso/scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'
import { Marker, Night, StandIn } from '@/art/iso/props-ch9-12'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** A block stand-in in the scene's 1600x900 space, coloured by who it stands for. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, hair, hold, arms, sit }: { x: number; y: number; h?: number; color: string; flip?: boolean; hair?: string; hold?: 'screwdriver' | 'watch'; arms?: 'push' | 'up' | 'carry'; sit?: boolean }) {
  return <StandIn x={x} y={y} h={h} color={color} flip={flip} hairColor={hair ? 'gray' : 'black'} hair={hair ? 'bald' : 'short'} pose={sit ? 'sit' : 'stand'} hold={arms === 'carry' ? 'carry' : hold === 'screwdriver' ? 'tool' : hold} />
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


const Dusk = () => <Night opacity={0.25} />
const KHOA = clothColors.white
const HIEN = clothColors.khaki
const third = stepAt(2)

/** Ông Hiển slumped in the armchair at the drafting table. */
const Slumped = () => <Person x={650} y={470} h={230} color={HIEN} hair="gray" sit flip />

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '06/04',
      title: '"Bệnh thì không chi"',
      text: 'Nợ 2,3 tỷ, chủ nợ hẹn tới cuối tháng 4, còn ông chú bị tim thì không chịu bán nhà. Khoa gọi tổng đài An Tín hỏi: chú mất vì bệnh tim thì có được chi không. Tổng đài trả lời: không, bệnh lý bị loại trừ, chỉ chi khi tai nạn, như ngã.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P9', 'P1']} />,
    },
    {
      time: '13/04, 19:30',
      title: 'Lần cuối ông đứng bên cửa sổ',
      text: 'Chị Liên về lúc 18:05, ông Hiển hơi mệt. Chú Tư khóa cổng ra về lúc 19:30, ngoái lên thấy ông đứng ở cửa sổ phòng làm việc, đèn sáng. Camera hẻm ghi lại cảnh đó.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="san-cong">
          <Dusk />
          <Person x={900} y={600} h={240} color={clothColors.olive} hair="gray" />
          <Marker x={915} y={40} n="1" />
        </Staged>
      ),
    },
    {
      time: 'Khoảng 19:45',
      title: 'Nét chì cuối cùng',
      text: 'Ông Hiển ngồi vẽ tiếp mặt đứng căn biệt thự. Cơn nhồi máu cơ tim tới giống hệt lần tháng 3, nhưng lần này ông không qua được. Nét chì trượt dài xuống mép giấy, cây bút rơi gãy dưới ghế. Ông gục trên bàn vẽ, không ai hay.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="phong-lam-viec">
          <Slumped />
          <Marker x={800} y={250} n="2" />
        </Staged>
      ),
    },
    {
      time: '20:00 đến 21:41',
      title: 'Chuông reo, đèn vẫn sáng',
      text: 'Chị Châu gọi máy bàn lúc 20:00 và 20:14, máy để ngay cạnh tay ông. Cữ thuốc 21:00 còn nguyên. 20:42 Khoa đi đám cưới, không lên chào chú. 21:35 Thắng bấm chuông, thấy đèn phòng còn sáng và bóng ông gục bên cửa sổ, tưởng ông ngủ gật.',
      questionId: 'q1',
      Art: () => <OnDesk ids={['X5', 'X6']} />,
    },
    {
      time: '00:38 đến 01:12',
      title: 'Kéo ra cầu thang',
      text: 'Khoa về thấy đèn phòng chú còn sáng, lên gác thì ông đã lạnh. Nhớ câu "bệnh thì không chi", anh ta xốc nách kéo ông qua hành lang, hai gót chân để lại vệt trên thảm, rồi thả ông xuống cầu thang. Ông đã ngồi như thế năm tiếng, hoen tử thi đã in ở mông và đùi.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="cau-thang">
          <Night />
          <Person x={1060} y={210} h={190} color={KHOA} arms="carry" flip />
          <Marker x={1150} y={90} n="3" />
        </Staged>
      ),
    },
    {
      time: 'Khoảng 01:00',
      title: 'Hai con ốc và một giờ giả',
      text: 'Khoa tháo hai con ốc thanh chặn thảm ở bậc thứ ba cho giống người trượt chân. Rồi anh ta chỉnh chiếc Seiko sang 22:47, lúc mình đang nâng ly ở tiệc cưới, đập kính vào cạnh bậc và để núm ở nấc chỉnh giờ cho kim đứng yên. 01:12, đèn phòng làm việc tắt.',
      questionId: 'q6',
      Art: () => (
        <Staged zone="cau-thang">
          <Night />
          <Person x={third.x + 70} y={third.y + 30} h={220} color={KHOA} hold="screwdriver" flip />
          <Marker x={third.x - 70} y={third.y - 10} n="4" />
          <Marker x={810} y={690} n="5" />
        </Staged>
      ),
    },
    {
      time: '14/04 đến 16/04',
      title: 'Một hồ sơ tai nạn',
      text: 'Sáng 14/4 chú Tư phát hiện ông dưới chân cầu thang. Công an ghi nhận ngã. Hai ngày sau Khoa nộp đơn đòi 7 tỷ, kèm tấm ảnh tiệc cưới lúc 22:46. Không có án mạng nào, chỉ có một cái chết vì bệnh bị dựng thành tai nạn.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P2', 'P7']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!
const colorOf = (id: string) => clothColors[suspect(id).portrait.outfitColor as keyof typeof clothColors]

const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 border-4 px-4 py-1 text-3xl opacity-85"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const causeTheory: Record<string, string> = {
  heart: 'Theo bạn, ông Hiển mất vì cơn nhồi máu cơ tim khi đang ngồi bên bàn vẽ. Cú ngã cầu thang xảy ra sau khi ông đã mất.',
  pushed: 'Theo bạn, có người nắm lấy ông Hiển ở đầu cầu thang rồi đẩy ông xuống.',
  slip: 'Theo bạn, ông Hiển tự trượt chân trên tấm thảm lỏng và ngã gãy cổ.',
}

const stagerTheory: Record<string, string> = {
  khoa: 'Theo bạn, Khoa kéo thi thể ra cầu thang, tháo ốc thanh chặn thảm và chỉnh đồng hồ về lúc mình đang ở tiệc cưới.',
  chau: 'Theo bạn, chị Châu đã dựng cảnh ngã cầu thang.',
  tu: 'Theo bạn, chú Tư dựng cảnh ngã cầu thang trước khi khóa cổng ra về, hoặc sáng hôm sau.',
  thang: 'Theo bạn, Thắng đã vào biệt thự và dựng cảnh ngã cầu thang.',
  none: 'Theo bạn, không ai dựng gì cả. Những gì ở chân cầu thang là thật.',
}

const causeRefute: Record<string, { text: string; docs: string[] }> = {
  pushed: { text: 'Gãy cổ không có phản ứng sống: ông đã mất trước khi chạm bậc thang. Hoen tử thi cho thấy ông ngồi nguyên nhiều giờ sau khi mất. Không ai đẩy một người đã chết.', docs: ['P7', 'P4'] },
  slip: { text: 'Người trượt chân thì còn sống lúc ngã. Vết gãy của ông không có phản ứng sống, và đôi dép của ông còn xếp ngay ngắn trước cửa phòng làm việc.', docs: ['P7', 'P6'] },
}

const stagerRefute: Record<string, { text: string; docs: string[] }> = {
  chau: { text: 'Đêm đó chị Châu ở nhà Quận 7, gọi cho bố lúc 20:00 và 20:14. Camera hẻm không ghi chị tới biệt thự.', docs: ['X5', 'P5'] },
  tu: { text: 'Lúc chú Tư ra cổng 19:30, ông Hiển còn sống bên cửa sổ. Sáng 06:25 chú tới thì đèn phòng làm việc đã tắt từ 01:12, khi chú không có trong nhà.', docs: ['P5', 'P6'] },
  thang: { text: 'Thắng đứng ngoài cổng sáu phút rồi đi, không bước vào. Tường cao 3 m cắm mảnh chai.', docs: ['P5', 'X6'] },
  none: { text: 'Ốc thanh chặn thảm được vặn ra bằng tua vít và nằm trong hộp đồ nghề của Khoa. Đồng hồ bị kéo núm, thi thể bị dời khỏi ghế.', docs: ['P10', 'P7'] },
}

function CauseArt({ id }: { id: string }) {
  return (
    <>
      {id === 'heart' ? (
        <Staged zone="phong-lam-viec">
          <Night opacity={0.25} />
          <Slumped />
        </Staged>
      ) : (
        <Staged zone="cau-thang">
          <Night opacity={0.25} />
          {id === 'pushed' && <Person x={1130} y={200} h={190} color="#55606a" arms="push" flip />}
          <Person x={1060} y={230} h={180} color={HIEN} hair="gray" arms="up" />
          <text x="600" y="460" textAnchor="middle" fontSize="120" fontWeight="700" fill="#ffffff" opacity="0.7" fontFamily="Bitter, serif">?</text>
        </Staged>
      )}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function StagerArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="cau-thang">
        <Night opacity={0.25} />
        {who !== 'none' && <Person x={third.x + 70} y={third.y + 30} h={220} color={colorOf(who)} hold="screwdriver" flip />}
        <text x="1300" y="560" textAnchor="middle" fontSize="120" fontWeight="700" fill="#ffffff" opacity="0.7" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  deny: { title: 'Từ chối, chuyển hồ sơ gian dối', note: 'Bạn cho rằng ông Hiển mất vì bệnh tim, thuộc Điều 7. Cảnh ngã cầu thang là dựng lên, nên theo Điều 9 hồ sơ bị từ chối và chuyển công an.', stamp: 'Từ chối', color: '#3f8a7e', docs: ['P1', 'P7'] },
  heir: { title: 'Chi 7 tỷ cho chị Châu', note: 'Bạn cho rằng Khoa giết chú để lấy tiền nên mất quyền nhận, tiền chi cho người thừa kế là chị Châu.', stamp: 'Chi cho chị Châu', color: '#cf9a32', docs: ['P1', 'X4'] },
  pay: { title: 'Chi 7 tỷ cho Khoa', note: 'Bạn chi đủ 7 tỷ cho Khoa, người thụ hưởng có tên trên hợp đồng.', stamp: 'Chi cho Khoa', color: '#b23a2e', docs: ['P2', 'P3'] },
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
  if (slotId === 'cause' && causeTheory[optionId]) return { Art: () => <CauseArt id={optionId} />, note: causeTheory[optionId] }
  if (slotId === 'stager' && stagerTheory[optionId]) return { Art: () => <StagerArt who={optionId} />, note: stagerTheory[optionId] }
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
  if (causeTheory[picks.cause])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.cause === 'heart' ? 'Mất vì bệnh tim bên bàn vẽ' : picks.cause === 'pushed' ? 'Bị đẩy xuống cầu thang' : 'Trượt chân trên thảm',
      text: causeTheory[picks.cause],
      Art: () => <CauseArt id={picks.cause} />,
    })
  if (stagerTheory[picks.stager])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.stager === 'none' ? 'Không ai dựng cảnh' : `Người dựng cảnh: ${suspect(picks.stager).name}`,
      text: stagerTheory[picks.stager],
      Art: () => <StagerArt who={picks.stager} />,
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
  const cr = causeRefute[picks.cause]
  if (cr) wrong.push(refutePanel('Ông Hiển không chết vì cú ngã', cr))
  const sr = stagerRefute[picks.stager]
  if (sr) wrong.push(refutePanel(picks.stager === 'none' ? 'Hiện trường đã bị dựng' : `${suspect(picks.stager).name} không dựng cảnh`, sr))
  if (picks.decision === 'heir')
    wrong.push(
      refutePanel('Không có án mạng để mất quyền nhận', {
        text: 'Ông Hiển mất vì bệnh tim trước khi bị đưa ra cầu thang. Không ai gây ra cái chết, nên không có chuyện chuyển tiền sang người thừa kế. Chết vì bệnh thì hợp đồng tai nạn không chi cho ai cả.',
        docs: ['P7', 'P1'],
      }),
    )
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('Cái chết không phải tai nạn', {
        text: 'Điều 7 loại trừ chết vì bệnh lý, kể cả khi sau đó có thương tích khác. Điều 9: hồ sơ có làm sai lệch hiện trường thì từ chối và chuyển cơ quan chức năng.',
        docs: ['P1', 'P10'],
      }),
    )
  return [...panels, ...wrong]
}
