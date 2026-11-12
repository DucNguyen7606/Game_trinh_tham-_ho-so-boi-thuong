import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

type Pose = 'stand' | 'crouch' | 'swing'

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, pose = 'stand', flip = false, hold, jacket }: { x: number; y: number; h?: number; color: string; pose?: Pose; flip?: boolean; hold?: 'bag' | 'pole'; jacket?: boolean }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#b98a68'
  const tf = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`
  const torso = jacket ? accent.ember : color
  return (
    <g transform={tf}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      {pose === 'crouch' ? (
        <>
          <polygon points={P([[-30, -70], [30, -70], [44, -30], [40, 0], [26, 0], [24, -26], [-10, -36], [-20, 0], [-34, 0]])} fill={dark} />
          <polygon points={P([[-36, -150], [26, -136], [34, -70], [-30, -66]])} fill={torso} />
          <polygon points={P([[24, -132], [70, -86], [62, -78], [18, -110]])} fill={torso} />
          <polygon points={P([[-12, -186], [26, -176], [24, -142], [0, -132], [-18, -146]])} fill={skin} />
          <polygon points={P([[-14, -188], [28, -178], [24, -164], [-16, -170]])} fill={ink.night} />
        </>
      ) : (
        <>
          <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
          <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={torso} />
          {pose === 'swing' ? (
            <polygon points={P([[30, -196], [70, -250], [62, -258], [20, -210]])} fill={color} />
          ) : (
            <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={torso} />
          )}
          <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
          <rect x="-8" y="-218" width="16" height="20" fill={skin} />
          <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
          <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
        </>
      )}
      {hold === 'bag' && <rect x="36" y="-150" width="40" height="52" rx="8" fill="#2f4258" stroke={ink.night} strokeWidth="3" />}
      {hold === 'pole' && pose === 'swing' && <line x1="66" y1="-254" x2="10" y2="-420" stroke="#c9b27a" strokeWidth="12" strokeLinecap="round" />}
      {hold === 'pole' && pose !== 'swing' && <line x1="44" y1="-140" x2="60" y2="0" stroke="#c9b27a" strokeWidth="12" strokeLinecap="round" />}
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

/** Night grade over a dawn scene. */
const Night = () => <rect width="1600" height="900" fill="#141a2a" opacity="0.55" />

const LUC = '#2a2622' // the black bà ba
const TAM = clothColors.khaki

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '12/5 đến 8/9/2025',
      title: 'Một kế hoạch biến mất',
      text: 'Nợ khoảng 3 tỷ, ông Lực mua bảo hiểm nhân thọ 5 tỷ cho vợ đứng tên thụ hưởng, nhưng không nói với bà về kế hoạch. Ngày 8/9 ông rút hết tiền hàng của vựa, kể cả 600 triệu Vinh đặt cọc, mua 30 lượng vàng, rồi đặt vé xe đi Châu Đốc dưới tên giả bằng một sim không chính chủ.',
      questionId: 'q3',
      Art: () => <OnDesk ids={['P6', 'P7']} />,
    },
    {
      time: '9/9, 22:30',
      title: 'Ba lô giao cho người tin nhất',
      text: 'Ông Lực mặc bộ bà ba đen như mọi đêm, nhưng lấy theo áo phao và thuốc huyết áp cho cả tháng. Ba lô đựng vàng, ông giao cho Sáu Tâm mang trước bằng xuồng tới Rạch Đước. Điện thoại chính để ở nhà.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="ben-ghe">
          <Night />
          <Person x={1240} y={470} h={260} color={LUC} jacket />
          <Person x={1380} y={470} h={250} color={TAM} hold="bag" flip />
        </Staged>
      ),
    },
    {
      time: '22:58 đến 23:00',
      title: 'Tự tay đánh chìm ghe',
      text: 'Ra giữa sông, ông gọi cho vợ bằng sim mới. Bà alo mấy lần, ông không nói gì, 12 giây thì cúp. Rồi ông tắt máy, rút chìa và rút nút lù dưới đáy. Ghe ngập dần. Trời lặng, gió nhẹ, không có sóng nào đánh úp chiếc ghe cả.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="ben-ghe">
          <Marker x={740} y={600} n="1" />
          <Marker x={1060} y={380} n="2" />
        </Staged>
      ),
    },
    {
      time: '23:00 đến 23:40',
      title: 'Chờ nước đổi chiều',
      text: 'Nước đang lên, chiếc ghe ngập trôi ngược vào sông rồi mắc cọc đáy ở Vàm Sát. Ông Lực mặc áo phao, bám cọc chờ. 23:40 nước đứng rồi ròng, ông gọi Tâm lúc 23:47 rồi thả trôi xuôi về phía biển.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P4', 'P2']} />,
    },
    {
      time: '10/9, 00:21',
      title: 'Rạch Đước',
      text: 'Ông Tâm đã ngồi chờ từ gần 11 giờ, hút hết năm điếu thuốc rê. 00:21 ông Lực gọi: tới rồi. Tâm chống xuồng ra đón, kéo ông lên bờ bùn đỏ.',
      questionId: 'q5',
      Art: () => (
        <Staged zone="rach">
          <Night />
          <Person x={560} y={720} h={300} color={LUC} jacket />
          <Person x={980} y={700} h={300} color={TAM} hold="pole" flip />
          <Marker x={992} y={560} n="3" />
        </Staged>
      ),
    },
    {
      time: '00:25 đến 00:34',
      title: 'Cây sào gãy',
      text: 'Ông Lực đòi lại ba lô. Tâm, người bị nợ tám tháng lương và có con chờ mổ tim, vung cây sào tre. Sào gãy làm đôi. Tâm giật áo phao khỏi người ông, kéo ông xuống nước lúc nước ròng mạnh nhất, rồi tắt chiếc sim. Ông Lực chết trước khi chạm nước.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="rach">
          <Night />
          <Person x={760} y={740} h={320} color={TAM} pose="swing" hold="pole" />
          <Marker x={448} y={420} n="4" />
          <Marker x={1280} y={460} n="5" />
          <Marker x={736} y={800} n="6" />
        </Staged>
      ),
    },
    {
      time: '02:16 đến 05:42',
      title: 'Thùng xốp qua phà',
      text: 'Tâm về bến, chở thùng xốp đựng vàng qua phà Bình Khánh lên thành phố gửi giấu, 04:41 quay về. 05:30 ông chạy xuồng "đi kiếm", chụp ảnh chiếc ghe úp gửi bà Hồng. Ủng còn dính bùn đỏ của Rạch Đước.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P9', 'X4']} />,
    },
    {
      time: '13/9',
      title: 'Người không được biết',
      text: 'Thi thể dạt vào Cần Thạnh. Bà Hồng nhận ra bộ bà ba bà may và chiếc nhẫn cưới, xin an táng sớm theo lệ ở đây. Bà không biết chồng định trốn đi. Ông đã dặn Tâm giấu bà, để bà khóc như thật, và bà khóc thật.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P10', 'P3']} />,
    },
    {
      time: '15/9',
      title: 'Ba lượng vàng',
      text: 'Sáu Tâm bán ba lượng vàng ở Quận 8 để lo viện phí cho con. Số sê-ri nằm trong lô 30 lượng ông Lực mua ở Kim Hưng ngày 8/9.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['P11', 'P6']} />,
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

const planTheory: Record<string, { text: string; docs: string[] }> = {
  luc: { text: 'Theo bạn, chính ông Lực dựng vụ chìm ghe: mua bảo hiểm, gom vàng, đặt vé tên giả rồi tự đánh chìm ghe để biến mất.', docs: ['P6', 'P7'] },
  hong: { text: 'Theo bạn, bà Hồng là người dựng chuyện. Bà đứng tên thụ hưởng 5 tỷ, nhận dạng vội và không cho khám nghiệm.', docs: ['P1', 'P3'] },
  tam: { text: 'Theo bạn, Sáu Tâm bày ra vụ chìm ghe. Ông là người duy nhất thạo sông nước và là người báo tin.', docs: ['P2'] },
  khang: { text: 'Theo bạn, Khang dựng vụ chìm ghe để ép nhà ông Lực lấy tiền bảo hiểm trả nợ.', docs: ['X1'] },
}

const killerTheory: Record<string, string> = {
  tam: 'Theo bạn, Sáu Tâm chờ ở Rạch Đước, đánh chết ông Lực bằng cây sào rồi lấy số vàng.',
  khang: 'Theo bạn, Khang bắt được ông Lực đang trốn nợ và ra tay ở Rạch Đước.',
  vinh: 'Theo bạn, Vinh giết ông Lực vì 600 triệu tiền cọc bị ông ôm đi.',
  hong: 'Theo bạn, bà Hồng giết chồng để chắc chắn nhận 5 tỷ.',
  none: 'Theo bạn, ông Lực chết đuối thật. Không ai giết ông.',
}

const planRefute: Record<string, { text: string; docs: string[] }> = {
  hong: { text: 'Bà Hồng không biết gì. Người mua vàng, đặt vé tên giả và tự rút nút lù là ông Lực, và ông dặn Tâm phải giấu bà. Đêm đó bà còn nhắn em gái rằng sáng mai chồng sẽ chở con đi khám.', docs: ['P10', 'X5'] },
  tam: { text: 'Tâm chỉ được giao việc chờ ở Rạch Đước. Vàng, vé xe, sim mới đều do ông Lực tự lo, và tin nhắn của ông nói rõ kế hoạch.', docs: ['P10', 'P7'] },
  khang: { text: 'Khang không dính gì tới vé xe, sim mới hay số vàng. Ông Lực trốn chính là để khỏi trả nợ Khang.', docs: ['P7', 'X1'] },
}

const killerRefute: Record<string, { text: string; docs: string[] }> = {
  khang: { text: 'Lúc 00:15 Khang đang nhậu ở quán ốc đầu phà Bình Khánh, cách Rạch Đước hàng chục cây số, tivi chiếu phút 90+2. Khang cũng mong ông Lực sống để đòi nợ.', docs: ['X3', 'X1'] },
  vinh: { text: 'Vinh ở chợ Bình Điền suốt đêm, ảnh lúc 01:30 cách Cần Giờ hơn 50 km. Ông Lực chết thì Vinh mất luôn 600 triệu.', docs: ['X6', 'X2'] },
  hong: { text: 'Lúc 00:28 bà Hồng ở nhà xem phim với con. Rạch Đước chỉ tới được bằng xuồng, và người ông Lực gọi lúc 00:21 là Tâm.', docs: ['X5', 'P8'] },
  none: { text: 'Phổi gần như không có nước, sau gáy có vết nứt do vật tày dạng thanh tròn. Ông Lực chết trước khi xuống nước.', docs: ['P5'] },
}

function PlanArt({ who }: { who: string }) {
  return (
    <>
      <Pinned who={who} ids={planTheory[who].docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function KillerArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="rach">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        {who === 'none' ? (
          <text x="800" y="500" textAnchor="middle" fontSize="140" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">~ ~ ~</text>
        ) : (
          <>
            <Person x={760} y={740} h={340} color={colorOf(who)} pose="swing" hold="pole" />
            <text x="980" y="380" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
          </>
        )}
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function DecisionArt({ pay }: { pay: boolean }) {
  return (
    <>
      <OnDesk ids={pay ? ['P1', 'P3'] : ['P5', 'P10']} />
      <PanelStamp text={pay ? 'Chi trả' : 'Từ chối'} color={pay ? '#3f8a7e' : '#b23a2e'} />
    </>
  )
}

export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'plan' && planTheory[optionId]) return { Art: () => <PlanArt who={optionId} />, note: planTheory[optionId].text }
  if (slotId === 'killer' && killerTheory[optionId]) return { Art: () => <KillerArt who={optionId} />, note: killerTheory[optionId] }
  if (slotId === 'decision')
    return {
      Art: () => <DecisionArt pay={optionId === 'pay'} />,
      note:
        optionId === 'pay'
          ? 'Bạn cho rằng ông Lực đã chết thật và bà Hồng là người thụ hưởng ngay tình: chi 5 tỷ cho bà, chuyển hồ sơ án mạng cho công an.'
          : 'Bạn cho rằng ông Lực dựng chuyện giả chết nên hợp đồng không phải trả: từ chối và chuyển hồ sơ cho công an.',
    }
  return undefined
}

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  const pay = picks.decision === 'pay'
  if (planTheory[picks.plan])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: `Người dựng vụ chìm ghe: ${suspect(picks.plan).name}`,
      text: planTheory[picks.plan].text,
      Art: () => <PlanArt who={picks.plan} />,
    })
  if (killerTheory[picks.killer])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.killer === 'none' ? 'Ông Lực chết đuối' : `Kẻ giết ông Lực: ${suspect(picks.killer).name}`,
      text: killerTheory[picks.killer],
      Art: () => <KillerArt who={picks.killer} />,
    })
  panels.push({
    kind: 'theory',
    time: 'Đề xuất của bạn',
    title: pay ? 'Chi trả 5 tỷ cho bà Hồng' : 'Từ chối và chuyển hồ sơ cho công an',
    text: pay ? 'Bạn đề xuất công ty chi trả 5 tỷ cho bà Hồng và chuyển hồ sơ án mạng cho công an.' : 'Bạn từ chối chi trả vì ông Lực định giả chết, và chuyển toàn bộ hồ sơ cho công an điều tra.',
    Art: () => <DecisionArt pay={pay} />,
  })

  const wrong: ReconstructionPanel[] = []
  const pr = planRefute[picks.plan]
  if (pr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: `${suspect(picks.plan).name} không phải người dựng vụ chìm ghe`,
      text: pr.text,
      Art: () => (
        <>
          <OnDesk ids={pr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  const kr = killerRefute[picks.killer]
  if (kr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: picks.killer === 'none' ? 'Ông Lực không chết đuối' : `${suspect(picks.killer).name} không giết ông Lực`,
      text: kr.text,
      Art: () => (
        <>
          <OnDesk ids={kr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  if (!pay)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: 'Kế hoạch giả chết không xóa được cái chết thật',
      text: 'Ông Lực định giả chết, nhưng ông chết thật, do Tâm đánh bằng cây sào. Bà Hồng không biết kế hoạch, ông dặn Tâm giấu bà. Điều 9 chỉ cho từ chối khi tự tử trong 2 năm đầu hoặc người thụ hưởng cố ý gây ra cái chết. Không điều nào đúng ở đây.',
      Art: () => (
        <>
          <OnDesk ids={['P1', 'P10']} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  return [...panels, ...wrong]
}
