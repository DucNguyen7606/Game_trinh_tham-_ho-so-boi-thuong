import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { C, sceneArt, stepAt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, hair = ink.night, hold, arms }: { x: number; y: number; h?: number; color: string; flip?: boolean; hair?: string; hold?: 'screwdriver' | 'watch'; arms?: 'push' | 'up' }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#d9a47a'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
      <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={color} />
      {arms === 'push' ? (
        <>
          <polygon points={P([[30, -196], [96, -176], [94, -162], [24, -176]])} fill={color} />
          <polygon points={P([[30, -150], [96, -168], [98, -154], [26, -134]])} fill={dark} />
        </>
      ) : arms === 'up' ? (
        <>
          <polygon points={P([[34, -196], [70, -250], [60, -256], [24, -200]])} fill={color} />
          <polygon points={P([[-34, -196], [-70, -250], [-60, -256], [-24, -200]])} fill={dark} />
        </>
      ) : (
        <>
          <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={color} />
          <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
        </>
      )}
      <rect x="-8" y="-218" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
      <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={hair} />
      {hold === 'screwdriver' && <path d="M44,-140 l40,-40" stroke={accent.amber} strokeWidth="8" strokeLinecap="round" />}
      {hold === 'watch' && <circle cx="56" cy="-134" r="12" fill={C.watch} stroke={ink.night} strokeWidth="3" />}
    </g>
  )
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
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[radial-gradient(circle_at_40%_30%,#5a3a24,#1c130f_75%)] p-6">
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
    <circle r="26" fill={accent.amber} stroke={ink.night} strokeWidth="4" />
    <text y="10" textAnchor="middle" fontSize="30" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">
      {n}
    </text>
  </g>
)

const Dusk = () => <rect width="1600" height="900" fill="#1e2440" opacity="0.4" />
const KHOA = clothColors.white
const HIEN = clothColors.khaki
const top = stepAt(0)
const third = stepAt(2)

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '02/03',
      title: 'Một cuộc gọi hỏi điều khoản',
      text: 'Nợ 2,3 tỷ, chủ nợ hẹn tới cuối tháng 3, còn ông chú thì không chịu bán nhà. Khoa gọi lên tổng đài An Tín hỏi: người được bảo hiểm té cầu thang trong nhà thì có được chi đủ không, có cần giám định giờ chết không. Rồi anh ta ghi lên lịch: "Cưới Tùng. Đi trễ."',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P9', 'P8']} />,
    },
    {
      time: '09/03, 19:30',
      title: 'Người cuối cùng thấy ông còn sống',
      text: 'Chị Liên về lúc 18:05. Chú Tư khóa cổng ra về lúc 19:30, ngoái lên thấy ông Hiển đứng ở cửa sổ lầu, đèn sáng. Camera hẻm ghi lại cảnh đó. Trong biệt thự giờ chỉ còn ông Hiển và Khoa, người đã về nhà từ 18:20.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="san-cong">
          <Dusk />
          <Person x={800} y={720} h={280} color={clothColors.olive} hair="#7d7a76" />
          <Marker x={1002} y={110} n="1" />
        </Staged>
      ),
    },
    {
      time: 'Khoảng 19:40',
      title: 'Hai con ốc đồng',
      text: 'Khoa lên cầu thang, dùng tua vít vặn hai con ốc của thanh chặn thảm ở bậc thứ ba rồi đút vào túi. Ren gỗ không sứt chút nào. Anh ta kéo tấm thảm lệch đi cho giống người trượt chân.',
      questionId: 'q5',
      Art: () => (
        <Staged zone="cau-thang">
          <Dusk />
          <Person x={third.x + 60} y={third.y + 80} h={250} color={KHOA} hold="screwdriver" flip />
          <Marker x={third.x + 40} y={third.y - 40} n="2" />
        </Staged>
      ),
    },
    {
      time: 'Khoảng 19:45',
      title: 'Ở đầu cầu thang',
      text: 'Khoa gọi ông Hiển ra đầu cầu thang. Ông bám trụ tay vịn, rơi một chiếc dép ở mép bậc trên cùng. Khoa nắm chặt hai bắp tay ông, giật ông khỏi trụ tay vịn rồi đẩy xuống. Ông lăn qua tám bậc gỗ lim, gãy cổ dưới chân cầu thang.',
      questionId: 'q6',
      Art: () => (
        <Staged zone="cau-thang">
          <Dusk />
          <Person x={top.x + 165} y={top.y - 4} h={180} color={KHOA} arms="push" flip />
          <Person x={top.x + 90} y={top.y - 4} h={168} color={HIEN} hair="#cfccc6" arms="up" />
          <Marker x={1460} y={70} n="3" />
        </Staged>
      ),
    },
    {
      time: '20:00 và 20:14',
      title: 'Chuông điện thoại không ai nghe',
      text: 'Như mọi tối, chị Châu gọi máy bàn của ba lúc 8 giờ. Rồi 8 giờ 14. Không ai nhấc máy. Trên lầu, ô thuốc 21:00 của ngày thứ Hai mãi mãi còn nguyên ba viên.',
      questionId: 'q3',
      Art: () => <OnDesk ids={['X5', 'P6']} />,
    },
    {
      time: 'Khoảng 20:30',
      title: 'Kim đồng hồ dừng lúc 22:47',
      text: 'Khoa chỉnh chiếc Seiko trên tay ông chú sang 22:47, đập mặt kính vào cạnh bậc thang. Đồng hồ tự động thì va đập không làm nó dừng, nên anh ta để núm ở nấc chỉnh giờ cho kim đứng yên. Rồi anh ta tắt đèn cầu thang.',
      questionId: 'q2',
      Art: () => (
        <Staged zone="cau-thang">
          <Rect />
          <Person x={640} y={850} h={230} color={KHOA} hold="watch" />
          <Marker x={740} y={660} n="4" />
        </Staged>
      ),
    },
    {
      time: '20:42 đến 00:38',
      title: 'Ngoại phạm tới trễ',
      text: 'Tiệc cưới khai lúc 19:00, nhưng 20:42 Khoa mới mặc vest dắt xe ra cổng. Lúc 22:46 anh ta nâng ly với cô dâu chú rể, để trăm người làm chứng cho giờ ghi trên đồng hồ. Còn Hưng tới cổng lúc 21:35, bấm chuông mà không ai mở.',
      questionId: 'q4',
      Art: () => <OnDesk ids={['X3', 'P5']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

function Rect() {
  return <rect width="1600" height="900" fill="#141a2a" opacity="0.55" />
}

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!
const colorOf = (id: string) => clothColors[suspect(id).portrait.outfitColor as keyof typeof clothColors]

function Pinned({ who, ids }: { who: string; ids: string[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[radial-gradient(circle_at_40%_30%,#3b4250,#15161b_75%)] p-6">
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

const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 border-4 px-4 py-1 text-3xl opacity-85"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const killerTheory: Record<string, string> = {
  khoa: 'Theo bạn, Khoa tháo ốc thanh chặn thảm, đẩy ông chú từ đầu cầu thang xuống, rồi chỉnh đồng hồ để có ngoại phạm ở tiệc cưới.',
  chau: 'Theo bạn, chị Châu muốn bán căn biệt thự nên đã ra tay với ba mình.',
  tu: 'Theo bạn, chú Tư ra tay trước khi khóa cổng ra về, rồi sáng hôm sau làm như mới phát hiện.',
  hung: 'Theo bạn, Hưng bị từ chối bán nhà lần thứ ba nên đã vào biệt thự tối 9/3 và đẩy ông Hiển.',
  none: 'Theo bạn, không ai gây ra chuyện này. Ông Hiển tự trượt chân trên tấm thảm lỏng.',
}

const clockTheory: Record<string, { text: string; docs: string[] }> = {
  alibi: { text: 'Theo bạn, đồng hồ bị chỉnh sang 22:47 để giờ chết rơi đúng lúc Khoa đang ở tiệc cưới.', docs: ['X3', 'P4'] },
  real: { text: 'Theo bạn, 22:47 là giờ ông Hiển ngã thật. Kính vỡ làm đồng hồ dừng.', docs: ['P3', 'P2'] },
  hung: { text: 'Theo bạn, ai đó dừng đồng hồ ở 22:47 để đổ tội cho Hưng, người tới cổng tối hôm đó.', docs: ['X2', 'P5'] },
}

const killerRefute: Record<string, { text: string; docs: string[] }> = {
  chau: { text: 'Lúc 20:00 và 20:14 chị Châu đang gọi cho ba từ nhà ở Quận 7. Camera hẻm không ghi chị tới biệt thự lần nào trong đêm.', docs: ['X5', 'P5'] },
  tu: { text: 'Chú Tư ra cổng lúc 19:30, một phút sau ông Hiển còn đứng ở cửa sổ lầu. Chú không quay lại cho tới 06:25 sáng.', docs: ['P5', 'P6'] },
  hung: { text: 'Hưng tới lúc 21:35, khi ông Hiển đã chết gần hai tiếng. Anh bấm chuông sáu phút rồi đi, không bước qua cổng.', docs: ['P5', 'X6'] },
  none: { text: 'Ốc thanh chặn thảm được vặn ra bằng tua vít và nằm trong hộp đồ nghề của Khoa. Hai bắp tay ông Hiển có dấu ngón tay từ trước lúc chết.', docs: ['P10', 'P7'] },
}

const clockRefute: Record<string, { text: string; docs: string[] }> = {
  real: { text: 'Pháp y nói ông chết trước 21:30, cháo trong dạ dày mới tiêu một phần. Cữ thuốc 21:00 ông chưa bao giờ bỏ thì vẫn còn nguyên. Ông đã chết từ trước 22:47 rất lâu.', docs: ['P4', 'P6'] },
  hung: { text: 'Lúc 22:47 Hưng đã rời hẻm hơn một tiếng. Người được lợi từ giờ 22:47 là người đang đứng giữa tiệc cưới đúng phút đó.', docs: ['P5', 'X3'] },
}

function KillerArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="cau-thang">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        {who !== 'none' && <Person x={top.x + 165} y={top.y - 4} h={180} color={colorOf(who)} arms="push" flip />}
        <Person x={top.x + 90} y={top.y - 4} h={168} color={HIEN} hair="#cfccc6" arms="up" />
        <text x="600" y="460" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function ClockArt({ id }: { id: string }) {
  const t = clockTheory[id]
  return (
    <>
      {id === 'hung' ? <Pinned who="hung" ids={t.docs} /> : <OnDesk ids={t.docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  heir: { title: 'Chi 6 tỷ cho người thừa kế', note: 'Bạn cho rằng ông Hiển chết do bị đẩy ngã, vẫn là tai nạn theo Điều 3. Khoa cố ý gây ra cái chết nên mất quyền nhận theo Điều 8, tiền chi cho chị Châu.', stamp: 'Chi cho chị Châu', color: '#3f8a7e', docs: ['P1', 'P7'] },
  pay: { title: 'Chi 6 tỷ cho Khoa', note: 'Bạn chi đủ 6 tỷ cho Khoa, người thụ hưởng có tên trên hợp đồng.', stamp: 'Chi cho Khoa', color: '#cf9a32', docs: ['P1', 'P2'] },
  deny: { title: 'Từ chối vì là án mạng', note: 'Bạn cho rằng ông Hiển bị giết chứ không phải gặp tai nạn, nên hợp đồng tai nạn không phải chi.', stamp: 'Từ chối', color: '#b23a2e', docs: ['P3', 'P7'] },
  ill: { title: 'Từ chối vì bệnh tim', note: 'Bạn cho rằng ông Hiển chết vì bệnh tim, thuộc điều khoản loại trừ, công ty không chi đồng nào.', stamp: 'Từ chối', color: '#b23a2e', docs: ['X1', 'P1'] },
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
  if (slotId === 'killer' && killerTheory[optionId]) return { Art: () => <KillerArt who={optionId} />, note: killerTheory[optionId] }
  if (slotId === 'clock' && clockTheory[optionId]) return { Art: () => <ClockArt id={optionId} />, note: clockTheory[optionId].text }
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
  if (killerTheory[picks.killer])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.killer === 'none' ? 'Một tai nạn trong nhà' : `Hung thủ: ${suspect(picks.killer).name}`,
      text: killerTheory[picks.killer],
      Art: () => <KillerArt who={picks.killer} />,
    })
  if (clockTheory[picks.clock])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.clock === 'alibi' ? 'Giờ giả cho một ngoại phạm' : picks.clock === 'real' ? '22:47 là giờ thật' : 'Giờ giả để đổ tội cho Hưng',
      text: clockTheory[picks.clock].text,
      Art: () => <ClockArt id={picks.clock} />,
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
  const kr = killerRefute[picks.killer]
  if (kr) wrong.push(refutePanel(picks.killer === 'none' ? 'Ông Hiển không tự ngã' : `${suspect(picks.killer).name} không gây ra cái chết`, kr))
  const cr = clockRefute[picks.clock]
  if (cr) wrong.push(refutePanel('Chiếc đồng hồ không nói như vậy', cr))
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('Người thụ hưởng mất quyền nhận', {
        text: 'Điều 8: người thụ hưởng cố ý gây ra cái chết của người được bảo hiểm thì mất quyền nhận. Tiền phải chi cho người thừa kế theo pháp luật, là chị Châu.',
        docs: ['P1', 'P10'],
      }),
    )
  if (picks.decision === 'deny')
    wrong.push(
      refutePanel('Bị đẩy ngã vẫn là tai nạn', {
        text: 'Điều 3 chi trả cả khi người được bảo hiểm chết do hành vi cố ý của người khác. Án mạng không làm mất hợp đồng, chỉ làm hung thủ mất quyền nhận.',
        docs: ['P1', 'P7'],
      }),
    )
  if (picks.decision === 'ill')
    wrong.push(
      refutePanel('Ông Hiển không chết vì bệnh tim', {
        text: 'Pháp y kết luận tim không nhồi máu, não không xuất huyết. Ông chết vì gãy cổ khi ngã, và hai bắp tay có dấu ngón tay.',
        docs: ['P4', 'P7'],
      }),
    )
  return [...panels, ...wrong]
}
