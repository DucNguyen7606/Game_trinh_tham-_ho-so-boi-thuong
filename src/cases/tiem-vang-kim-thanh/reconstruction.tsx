import { Portrait, type PortraitSpec } from '@/art/Portrait'
import { IsoFigure } from '@/art/iso/figure'
import { Box, iso, type V3 } from '@/art/iso/iso'
import { Scooter } from '@/art/iso/street'
import caseData from './case.json'
import { at, isoSceneArt as sceneArt, scr } from './iso/scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

const spec = (id: string) => caseData.suspects.find((x) => x.id === id)!.portrait as PortraitSpec
const friend: PortraitSpec = { skin: 2, hair: 'short', hairColor: 'black', build: 'thin', outfit: 'shirt', outfitColor: 'charcoal', age: 'young', mood: 'stern' }

/** Someone as a block figure at a world point; `poncho` puts them in a black GoXe raincoat with the hood up, `bag` gives them the bag of loot. */
function Fig({ who, p, facing = 'y', poncho, bag, mood }: { who?: string; p: V3; facing?: 'x' | 'y' | '-x' | '-y'; poncho?: boolean; bag?: boolean; mood?: PortraitSpec['mood'] }) {
  const base = who ? spec(who) : friend
  const sp = { ...base, mood: mood ?? base.mood, ...(poncho ? { hair: 'cap' as const, hairColor: 'black' as const } : {}) }
  const [x, y, z] = p
  return (
    <g>
      <IsoFigure at={[x - 13, y - 9, z]} spec={sp} facing={facing} size={1.15} cloth={poncho ? '#2f3138' : undefined} />
      {bag && <Box at={[x + 10, y + 16, z + 20]} size={[18, 10, 26]} color="#6b6a35" />}
    </g>
  )
}

/** A zone diorama with people and the motorbike added in, and markers drawn over it. */
function Staged({ zone, extra, night, children }: { zone: string; extra?: React.ReactNode; night?: boolean; children?: React.ReactNode }) {
  const Art = sceneArt[zone]
  return (
    <div className="absolute inset-0">
      <Art extra={extra} night={night} />
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

const Marker = ({ p: [x, y], n }: { p: [number, number]; n: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="26" fill={iso.coral} stroke="#ffffff" strokeWidth="5" />
    <text y="10" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff" fontFamily="'Be Vietnam Pro', sans-serif">
      {n}
    </text>
  </g>
)

/** Night: a soft violet wash over the diorama. */
const Night = () => <rect width="1600" height="900" fill="#3b3a6a" opacity="0.22" />
const Rain = () => (
  <g>
    {Array.from({ length: 90 }, (_, i) => (
      <line key={i} x1={(i * 97) % 1600} y1={(i * 61) % 860} x2={((i * 97) % 1600) - 10} y2={((i * 61) % 860) + 36} stroke="#cfe0e8" strokeWidth="2" opacity="0.35" />
    ))}
  </g>
)
const ring = at('tiem', 36, 88)
const door = at('hem', 6, 50)
const shop = 'tiem'

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '15/10 đến 28/11',
      title: 'Hụi bể, vàng ra đi',
      text: 'Hai dây hụi bà Loan làm đầu thảo bể giữa tháng 10. Để giữ tiếng cho tiệm, bà lặng lẽ mang 42 lượng vàng nhẫn sang Phú Nhuận bán lấy 5,8 tỷ tiền mặt, trả đủ từng người. Ngoài tiệm, ai hỏi bà cũng nói hụi đang chờ gom.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P9', 'X1']} />,
    },
    {
      time: '12/11',
      title: 'Tủ kính sáng choang',
      text: 'Tủ kính mà trống thì cả khu biết tiệm Kim Thành hết vàng. Bà đặt xưởng mạ ở Quận 5 làm 300 nhẫn đồng mạ vàng, khắc đúng chữ "KT 9999 · 1 chỉ" của tiệm, bày kín các khay. Nhìn qua kính, không ai phân biệt được.',
      questionId: 'q3',
      Art: () => <OnDesk ids={['P10', 'P8']} />,
    },
    {
      time: '2/12, 20:41',
      title: 'Két mở sẵn',
      text: 'Hai mươi phút trước giờ hẹn, bà Loan bấm mã chủ mở két và để nguyên cửa két hé. Bộ nhớ két ghi lại lần mở đó, và không có lần nào khác cho tới khi công an tới.',
      questionId: 'q2',
      Art: () => (
        <Staged zone={shop} night extra={<Fig who="loan" p={[100, 420, 0]} facing="-x" />}>
          <Night />
          <Marker p={scr(shop, 30, 425, 130)} n="1" />
        </Staged>
      ),
    },
    {
      time: '20:55 đến 21:00',
      title: 'Chốt cửa sau',
      text: 'Tài và một người bạn chạy chiếc Exciter đỏ vào hẻm 514, nơi chiếc camera đã chết từ tháng 6. Bà Loan kéo cửa cuốn xuống một nửa rồi ra sau, kéo chốt cửa sau cho hai người vào. Dép họ mang theo bùn đỏ của con hẻm đang đào cống.',
      questionId: 'q4',
      Art: () => (
        <Staged
          zone="hem"
          night
          extra={
            <>
              <Fig who="tai" p={[60, door[1] + 70, 0]} facing="-x" poncho />
              <Fig p={[150, door[1] + 10, 0]} facing="-x" poncho />
              <Scooter at={[...at('hem', 50, 78), 0] as V3} color="#d6453a" />
            </>
          }
        >
          <Night />
          <Rain />
          <Marker p={scr('hem', 0, door[1], 190)} n="2" />
        </Staged>
      ),
    },
    {
      time: '21:00 đến 21:05',
      title: 'Một vụ cướp cho camera xem',
      text: 'Trong tiệm, Tài đập vỡ tủ kính, vơ cả khay nhẫn mạ và túi đồ trong két. Một chiếc nhẫn lăn vào gầm tủ. Rồi hai người chui ra cửa cuốn phía trước, chạy dưới mưa cho camera bên kia đường thấy, và vòng vào hẻm lấy xe. Lúc lùi xe, đuôi xe quẹt cột điện, vỡ đèn hậu.',
      questionId: 'q1',
      Art: () => (
        <Staged
          zone={shop}
          night
          extra={
            <>
              <Fig who="tai" p={[280, 320, 0]} facing="x" poncho bag />
              <Fig p={[ring[0] + 60, ring[1] - 110, 0]} facing="y" poncho />
            </>
          }
        >
          <Night />
          <Marker p={scr(shop, 270, 250, 110)} n="3" />
          <Marker p={scr(shop, ring[0] + 6, ring[1] + 4, 30)} n="4" />
        </Staged>
      ),
    },
    {
      time: '21:05 đến 21:48',
      title: 'Mười ba phút im lặng',
      text: 'Bà Loan đợi tới 21:18 mới bước ra cửa, hỏi chị Thảo camera có quay được gì không, rồi gọi công an lúc 21:19. Tài nhét áo mưa GoXe vào thùng rác trong hẻm và 21:48 bật app nhận chuyến kế tiếp như chưa có gì. Hùng đang ở bệnh viện phụ sản, bà Ba Lành ở đám giỗ dưới Hóc Môn.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P6', 'X5']} />,
    },
    {
      time: '3/12 đến 5/12',
      title: '45 lượng trên giấy',
      text: 'Bà Loan nộp đơn đòi 6,3 tỷ cho 45 lượng, đủ bù số vàng đã bán trả hụi. Ngày 5/12, ô lịch có chữ "T.", bà chuyển cho Tài 150 triệu. Cùng ngày Tài trả sạch ba app cho vay. Túi "vàng cướp" nằm dưới gầm giường phòng trọ của anh.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['P2', 'P11']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!

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

const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 border-4 px-4 py-1 text-3xl opacity-85"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const planTheory: Record<string, { text: string; docs: string[] }> = {
  loan: { text: 'Theo bạn, chính bà Loan dựng lên vụ cướp: mở két sẵn, mở chốt cửa sau cho người vào, rồi khai mất 45 lượng để bảo hiểm đền.', docs: ['P4', 'P7'] },
  hung: { text: 'Theo bạn, thợ Hùng bị đuổi việc nên ôm hận, dẫn người vào cướp tiệm vì biết chỗ đặt két và giờ đóng cửa.', docs: ['X2'] },
  lanh: { text: 'Theo bạn, bà Ba Lành đòi hụi không được nên thuê người tới tiệm lấy vàng, đúng như tin nhắn đe dọa.', docs: ['X1'] },
  tai: { text: 'Theo bạn, Tài tự mình bày ra vụ cướp để có tiền trả nợ app, bà Loan không hề hay biết.', docs: ['P11'] },
  none: { text: 'Theo bạn, đây là một vụ cướp thật: hai kẻ lạ mặt chui vào cửa cuốn đúng lúc bà Loan đóng tiệm.', docs: ['P3', 'P2'] },
}

const robberTheory: Record<string, { text: string; docs: string[] }> = {
  tai: { text: 'Theo bạn, người cầm dao vào tiệm là Tài, cháu bà Loan.', docs: ['X5'] },
  hung: { text: 'Theo bạn, người cầm dao vào tiệm là thợ Hùng.', docs: ['X2'] },
  stranger: { text: 'Theo bạn, hai kẻ cầm dao là người lạ, không ai trong hồ sơ.', docs: ['P6'] },
}

const planRefute: Record<string, { text: string; docs: string[] }> = {
  hung: { text: 'Lúc 21:03 Hùng đang bế con gái mới sinh ở bệnh viện phụ sản Quận 1. Hùng không biết mã két, mà két lại được mở bằng mã chủ từ 20:41.', docs: ['X3', 'P7'] },
  lanh: { text: 'Bà Ba Lành ngồi mâm giỗ ở Hóc Môn lúc 21:00. Mười ngày trước vụ cướp bà đã được trả đủ 300 triệu, không còn gì để đòi.', docs: ['X4', 'X1'] },
  tai: { text: 'Tài không thể mở két hay kéo chốt cửa sau từ bên ngoài. Két mở bằng mã chủ lúc 20:41, cửa sau chỉ mở từ trong, và trong tiệm chỉ có bà Loan. Tiền công 150 triệu đến từ tài khoản của bà.', docs: ['P7', 'P11'] },
  none: { text: 'Camera nhà thuốc không thấy ai vào cửa trước. Két mở trước khi có người vào, cửa sau mở từ bên trong, và vàng trong tủ là đồng mạ. Không kẻ cướp lạ nào làm được như vậy.', docs: ['P6', 'P8'] },
}

const robberRefute: Record<string, { text: string; docs: string[] }> = {
  hung: { text: 'Lúc 21:03 Hùng chụp ảnh với con gái mới sinh ở bệnh viện phụ sản, cách Gò Vấp cả chục cây số.', docs: ['X3', 'P6'] },
  stranger: { text: 'Mảnh đèn hậu Exciter đỏ còn mới trong hẻm, áo mưa GoXe trong thùng rác, và app của Tài tắt đúng từ 20:31 tới 21:48. Hai ngày sau anh nhận 150 triệu từ dì.', docs: ['X5', 'P11'] },
}

function PlanArt({ who }: { who: string }) {
  const t = planTheory[who]
  return (
    <>
      {who === 'none' ? <OnDesk ids={t.docs} /> : <Pinned who={who} ids={t.docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function RobberArt({ who }: { who: string }) {
  if (who === 'stranger')
    return (
      <>
        <Staged zone={shop} extra={<Fig p={[280, 320, 0]} facing="x" poncho bag />}>
          <rect width="1600" height="900" fill="#3b3a6a" opacity="0.25" />
          <text x="1100" y="420" textAnchor="middle" fontSize="120" fontWeight="700" fill="#ffffff" opacity="0.8" fontFamily="'Be Vietnam Pro', sans-serif">?</text>
        </Staged>
        <PanelStamp text="Giả thuyết" color="#9fb4c8" />
      </>
    )
  return (
    <>
      <Staged zone={shop} extra={<Fig who={who} p={[280, 320, 0]} facing="x" bag />}>
        <rect width="1600" height="900" fill="#3b3a6a" opacity="0.25" />
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  pay: { title: 'Chi trả đủ 6,3 tỷ', note: 'Bạn cho rằng 45 lượng vàng đã bị cướp thật, và công ty nên chi trả đủ 6,3 tỷ.', stamp: 'Chi trả', color: '#3f8a7e', docs: ['P2', 'P3'] },
  partial: { title: 'Chi 2,1 tỷ cho vàng trong két', note: 'Bạn nghi ngờ số vàng trong tủ kính, nhưng tin 15 lượng trong két là thật và bị cướp lấy.', stamp: 'Chi một phần', color: '#cf9a32', docs: ['P2', 'P7'] },
  deny: { title: 'Từ chối, chuyển công an', note: 'Bạn cho rằng vụ cướp được dàn dựng từ bên trong, và hồ sơ cần chuyển cho cơ quan điều tra.', stamp: 'Từ chối', color: '#b23a2e', docs: ['P1', 'P8'] },
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
  if (slotId === 'plan' && planTheory[optionId]) return { Art: () => <PlanArt who={optionId} />, note: planTheory[optionId].text }
  if (slotId === 'robber' && robberTheory[optionId]) return { Art: () => <RobberArt who={optionId} />, note: robberTheory[optionId].text }
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
  if (planTheory[picks.plan])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.plan === 'none' ? 'Một vụ cướp thật' : `Người dựng chuyện: ${suspect(picks.plan).name}`,
      text: planTheory[picks.plan].text,
      Art: () => <PlanArt who={picks.plan} />,
    })
  if (robberTheory[picks.robber])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.robber === 'stranger' ? 'Hai kẻ lạ mặt' : `Người cầm dao: ${suspect(picks.robber).name}`,
      text: robberTheory[picks.robber].text,
      Art: () => <RobberArt who={picks.robber} />,
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
  const pr = planRefute[picks.plan]
  if (pr) wrong.push(refutePanel(picks.plan === 'none' ? 'Không có kẻ cướp lạ nào' : `${suspect(picks.plan).name} không dựng vụ này`, pr))
  const rr = robberRefute[picks.robber]
  if (rr) wrong.push(refutePanel(picks.robber === 'stranger' ? 'Người cầm dao không phải người lạ' : `${suspect(picks.robber).name} không ở tiệm tối đó`, rr))
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('45 lượng không có thật', {
        text: 'Trong tháng 11 bà Loan đã bán 42 lượng ở Phú Nhuận. Thứ nằm trong tủ kính là nhẫn đồng mạ vàng đặt ở Quận 5. Theo Điều 8, tài sản không có thật và hành vi cố ý của chủ tiệm đều bị loại trừ.',
        docs: ['P9', 'P1'],
      }),
    )
  if (picks.decision === 'partial')
    wrong.push(
      refutePanel('Két không bị ép mở', {
        text: 'Bộ nhớ két ghi bà Loan mở bằng mã chủ lúc 20:41, hai mươi phút trước khi có người vào. Không có kẻ cướp nào kề dao bắt mở két. Cả vụ là dàn dựng, không phần nào được bồi thường.',
        docs: ['P7', 'P1'],
      }),
    )
  return [...panels, ...wrong]
}

