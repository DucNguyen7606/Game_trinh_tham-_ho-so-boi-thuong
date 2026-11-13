import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { C, Logger, sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, hold }: { x: number; y: number; h?: number; color: string; flip?: boolean; hold?: 'logger' | 'phone' | 'box' }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#b9815a'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
      <polygon points={P([[-38, -204], [38, -204], [30, -112], [-30, -112]])} fill={color} />
      <polygon points={P([[38, -200], [52, -130], [40, -128], [26, -180]])} fill={color} />
      <polygon points={P([[-38, -200], [-52, -130], [-40, -128], [-26, -180]])} fill={dark} />
      <rect x="-8" y="-222" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -266], [20, -266], [22, -230], [0, -216], [-22, -230]])} fill={skin} />
      <polygon points={P([[-22, -268], [22, -268], [20, -250], [-22, -248]])} fill={ink.night} />
      {hold === 'logger' && (
        <g transform="translate(66 -150) scale(0.5)">
          <Logger x={0} y={0} alarm />
        </g>
      )}
      {hold === 'phone' && <rect x="40" y="-170" width="20" height="34" rx="4" fill={ink.night} />}
      {hold === 'box' && <rect x="36" y="-176" width="80" height="52" fill={C.carton} stroke={ink.night} strokeWidth="3" />}
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

const Night = () => <rect width="1600" height="900" fill="#141a2a" opacity="0.5" />
const TUNG = clothColors.olive
const HUNG = clothColors.charcoal

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '12/11 đến 14/11',
      title: 'Danh sách hàng sắp về',
      text: 'Tùng nợ độ bóng đá 85 triệu. Anh cho Hưng xem danh sách hàng sắp về của kho: một pallet thuốc ung thư Herzena, 40 thùng, trưa 15/11. Hưng chỉ cần nhiệt kế báo đỏ. Ngày 14/11, khi lô thuốc còn ở Frankfurt, Hưng đã ký thuê xe tải lạnh để nhận "40 thùng hàng lạnh từ Tân Sơn Nhất" vào ngày 28/11.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['X4', 'P8']} />,
    },
    {
      time: '15/11, 13:10 đến 13:55',
      title: 'Bốn mươi lăm phút ngoài nắng',
      text: 'Ông Lộc đậu pallet giữa sân đỗ để ăn trưa thay vì đưa vào khu có mái che. Nắng 34 độ, nhưng túi giữ lạnh làm tốt việc của nó: TL-A chỉ lên 7,8 độ. Lỗi này có thật, nhưng không làm hỏng lọ thuốc nào.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="san-do">
          <Marker x={480} y={300} n="1" />
        </Staged>
      ),
    },
    {
      time: '15/11, 23:52 đến 23:58',
      title: 'Rạch một thùng, lấy một cái nhiệt kế',
      text: 'Một mình trực ca đêm, Tùng quẹt thẻ vào phòng lạnh 3. Anh rạch băng keo Đức trên thùng 1, lấy nhiệt kế TL-A ra, vo mẩu băng keo nhét túi, dán lại thùng bằng băng keo xanh lá của kho. Cảm biến ánh sáng của TL-A ghi lại khoảnh khắc nắp thùng mở lúc 23:55.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="phong-lanh">
          <Night />
          <Person x={480} y={780} h={330} color={TUNG} hold="logger" />
          <Marker x={765} y={290} n="2" />
        </Staged>
      ),
    },
    {
      time: '16/11, 00:00 đến 02:43',
      title: 'Ba mươi ba độ',
      text: 'Tùng về phòng nghỉ coi hai trận bóng, TL-A nằm trong túi trong áo phao, sát ngực. Trong túi tối om, và nhiệt kế đo đúng hơi ấm của người: 32 đến 33 độ, đều đặn gần ba tiếng. Phòng nghỉ máy lạnh 24 độ, ngoài trời 26 độ, không nơi nào khác ấm đúng như vậy.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="phong-nghi">
          <Night />
          <Person x={880} y={760} h={320} color={TUNG} />
          <Marker x={1308} y={330} n="3" />
        </Staged>
      ),
    },
    {
      time: '16/11, 02:41 đến 02:47',
      title: 'Trả nhiệt kế về chỗ cũ',
      text: 'Tùng quay lại phòng lạnh, đặt TL-A về nắp thùng 1. Nhiệt kế nguội từ 30 xuống 6 độ chỉ trong 10 phút, nhanh hơn nhiều so với một pallet thuốc thật sự bị nóng. Suốt đêm, cảm biến tường không lên quá 5,6 độ. 03:02, Tùng nhắn: "Xong rồi anh. Đỏ rồi."',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P3', 'P5']} />,
    },
    {
      time: '17/11, sáng',
      title: 'Nhiệt kế báo đỏ',
      text: 'Dược sĩ Linh tới nhận hàng, thấy TL-A báo đỏ thì làm đúng quy trình: niêm phong cả lô và xin An Tín giám định. Chị chỉ đọc cái nhiệt kế gắn ngoài. Hai tiếng sau, Tùng lập biên bản đề xuất giao lô thuốc cho Hưng Thịnh đem đốt ngày 28/11, đúng lúc lò của Hưng Thịnh đang nghỉ bảo trì.',
      questionId: 'q6',
      Art: () => (
        <Staged zone="hung-thinh">
          <Person x={760} y={760} h={320} color={HUNG} hold="phone" />
          <Marker x={1120} y={300} n="4" />
          <Marker x={440} y={400} n="5" />
        </Staged>
      ),
    },
    {
      time: '20/11',
      title: 'Cái nhiệt kế không ai nhớ tới',
      text: 'Bên gửi hàng ở Đức luôn giấu thêm một nhiệt kế dự phòng. TL-B nằm dưới lớp túi lạnh của thùng 17, băng keo còn nguyên: 2,1 đến 6,4 độ suốt chuyến hàng. Viện Kiểm nghiệm lấy mẫu thùng 1 và thùng 17, kết luận đạt toàn bộ. Không lọ nào hỏng, và Minh Tâm cũng là người bị lừa.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['P6', 'P10']} />,
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

const tamperTheory: Record<string, string> = {
  tung: 'Theo bạn, Tùng lấy nhiệt kế TL-A ra khỏi thùng lúc gần nửa đêm, ủ trong túi áo gần ba tiếng rồi đặt lại, để nó báo đỏ.',
  loc: 'Theo bạn, ông Lộc làm nóng nhiệt kế hoặc làm hỏng lô thuốc, rồi để lại dấu vết cho giống sự cố trong kho.',
  linh: 'Theo bạn, dược sĩ Linh làm giả kết quả nhiệt kế để cả lô bị niêm phong.',
  hung: 'Theo bạn, chính Hưng lẻn vào phòng lạnh 3 lấy nhiệt kế ra.',
  none: 'Theo bạn, không ai đụng vào nhiệt kế: lô thuốc thật sự bị nóng tới 33 độ.',
}

const planTheory: Record<string, { text: string; docs: string[] }> = {
  hung: { text: 'Theo bạn, Hưng đứng sau: anh chờ nhận 40 thùng thuốc "đem đốt" bằng xe tải lạnh, rồi bán ra ngoài.', docs: ['P8', 'P7'] },
  thu: { text: 'Theo bạn, bà Thư đứng sau, dựng sự cố để lấy 4,6 tỷ tiền bảo hiểm trả nợ.', docs: ['X1', 'P2'] },
  linh: { text: 'Theo bạn, dược sĩ Linh đứng sau vụ này.', docs: ['P4'] },
  alone: { text: 'Theo bạn, Tùng làm một mình, không ai đứng sau.', docs: ['P5'] },
}

const tamperRefute: Record<string, { text: string; docs: string[] }> = {
  loc: { text: 'Ông Lộc giao pallet vào kho lạnh lúc 13:55, và lúc nằm ngoài nắng TL-A chỉ lên 7,8 độ. Đêm đó chỉ thẻ của Tùng mở phòng lạnh 3.', docs: ['X2', 'P5'] },
  linh: { text: 'Linh chỉ tới kho sáng 17/11. Nhiệt kế bị lấy ra lúc 23:55 ngày 15/11, khi phòng lạnh 3 chỉ có thẻ của Tùng ra vào. Chính Linh xin giám định trước khi tiêu hủy.', docs: ['P5', 'P4'] },
  hung: { text: 'Hưng không có thẻ vào phòng lạnh 3. Người mở cửa lúc 23:52 và 02:41 là Tùng, và mẩu băng keo Đức nằm trong túi áo phao của Tùng.', docs: ['P5', 'X4'] },
  none: { text: 'Phòng lạnh không lên quá 5,6 độ. TL-A nóng lên 27 độ trong 8 phút và nguội lại trong 10 phút, còn TL-B nằm cùng pallet chưa bao giờ quá 6,4 độ.', docs: ['P3', 'P6'] },
}

const planRefute: Record<string, { text: string; docs: string[] }> = {
  thu: { text: 'Lô thuốc đã bán cho bệnh viện 5,2 tỷ, hơn cả tiền bảo hiểm, và chậm giao thì Minh Tâm bị phạt. Người được lợi là kẻ nhận hàng đem đi "đốt".', docs: ['P11', 'P8'] },
  linh: { text: 'Linh niêm phong đúng quy trình và xin An Tín giám định trước khi tiêu hủy. Người được lợi là kẻ thuê xe lạnh từ trước khi lô thuốc hạ cánh.', docs: ['P4', 'P8'] },
  alone: { text: 'Tùng không có cách nào bán thuốc. Hưng thuê xe lạnh từ 14/11, chuyển tiền cho Tùng sáng 16/11, và lò của Hưng nghỉ bảo trì đúng ngày "tiêu hủy".', docs: ['P8', 'P9'] },
}

function TamperArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="phong-lanh">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        {who === 'none' ? (
          <Marker x={765} y={290} n="?" />
        ) : (
          <Person x={480} y={780} h={330} color={colorOf(who)} hold="logger" />
        )}
        <text x="1000" y="240" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function PlanArt({ id }: { id: string }) {
  const t = planTheory[id]
  const who = id === 'alone' ? 'tung' : id
  return (
    <>
      <Pinned who={who} ids={t.docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  release: { title: 'Dừng tiêu hủy, trả thuốc', note: 'Bạn cho rằng lô thuốc không hỏng. An Tín không bồi thường hư hỏng, chỉ trả phí kiểm nghiệm lại, và 1.200 lọ được trả về cho Minh Tâm giao bệnh viện.', stamp: 'Giải phóng', color: '#3f8a7e', docs: ['P1', 'P10'] },
  pay: { title: 'Chi đủ 4,6 tỷ', note: 'Bạn cho rằng lô thuốc đã hỏng. An Tín chi đủ 4,6 tỷ và cho phép tiêu hủy 40 thùng.', stamp: 'Chi trả', color: '#cf9a32', docs: ['P2', 'P3'] },
  split: { title: 'Chi 2,3 tỷ', note: 'Bạn chưa chắc nguyên nhân vượt nhiệt nên đề xuất chi một nửa, lô thuốc vẫn đem đi tiêu hủy.', stamp: 'Chi một nửa', color: '#cf9a32', docs: ['P2', 'X2'] },
  deny: { title: 'Từ chối toàn bộ', note: 'Bạn cho rằng Minh Tâm dàn dựng sự cố để lấy tiền trả nợ, công ty không chi đồng nào.', stamp: 'Từ chối', color: '#b23a2e', docs: ['X1', 'P2'] },
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
  if (slotId === 'tamper' && tamperTheory[optionId]) return { Art: () => <TamperArt who={optionId} />, note: tamperTheory[optionId] }
  if (slotId === 'plan' && planTheory[optionId]) return { Art: () => <PlanArt id={optionId} />, note: planTheory[optionId].text }
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
  if (tamperTheory[picks.tamper])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.tamper === 'none' ? 'Thuốc nóng thật' : `Người cầm nhiệt kế: ${suspect(picks.tamper).name}`,
      text: tamperTheory[picks.tamper],
      Art: () => <TamperArt who={picks.tamper} />,
    })
  if (planTheory[picks.plan])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.plan === 'alone' ? 'Tùng làm một mình' : `Người đứng sau: ${suspect(picks.plan).name}`,
      text: planTheory[picks.plan].text,
      Art: () => <PlanArt id={picks.plan} />,
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
  const tr = tamperRefute[picks.tamper]
  if (tr) wrong.push(refutePanel(picks.tamper === 'none' ? 'Lô thuốc không hề nóng' : `${suspect(picks.tamper).name} không đụng vào nhiệt kế`, tr))
  const pr = planRefute[picks.plan]
  if (pr) wrong.push(refutePanel(picks.plan === 'alone' ? 'Tùng không làm một mình' : `${suspect(picks.plan).name} không đứng sau`, pr))
  if (picks.decision === 'pay' || picks.decision === 'split')
    wrong.push(
      refutePanel('Không có lọ thuốc nào hỏng', {
        text: 'Điều 3 chỉ bồi thường khi hàng không còn đạt chất lượng. TL-B và phiếu kiểm nghiệm cho thấy cả lô vẫn đạt. Chi tiền rồi cho đốt là đưa 1.200 lọ thuốc thật lên xe của Hưng.',
        docs: ['P1', 'P10'],
      }),
    )
  if (picks.decision === 'deny')
    wrong.push(
      refutePanel('Minh Tâm không gian lận', {
        text: 'Lô thuốc đã có bệnh viện mua 5,2 tỷ. Dược sĩ của Minh Tâm tự xin giám định trước khi tiêu hủy. Từ chối mà không dừng lệnh tiêu hủy thì thuốc vẫn rơi vào tay Hưng.',
        docs: ['P11', 'P4'],
      }),
    )
  return [...panels, ...wrong]
}
