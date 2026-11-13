import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

type Pose = 'stand' | 'crouch'

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, pose = 'stand', flip = false, hold }: { x: number; y: number; h?: number; color: string; pose?: Pose; flip?: boolean; hold?: 'sack' | 'tape' }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#b98a68'
  const tf = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`
  return (
    <g transform={tf}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      {pose === 'crouch' ? (
        <>
          <polygon points={P([[-30, -70], [30, -70], [44, -30], [40, 0], [26, 0], [24, -26], [-10, -36], [-20, 0], [-34, 0]])} fill={dark} />
          <polygon points={P([[-36, -150], [26, -136], [34, -70], [-30, -66]])} fill={color} />
          <polygon points={P([[24, -132], [70, -86], [62, -78], [18, -110]])} fill={color} />
          <polygon points={P([[-12, -186], [26, -176], [24, -142], [0, -132], [-18, -146]])} fill={skin} />
          <polygon points={P([[-14, -188], [28, -178], [24, -164], [-16, -170]])} fill={ink.night} />
        </>
      ) : (
        <>
          <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
          <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={color} />
          <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={color} />
          <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
          <rect x="-8" y="-218" width="16" height="20" fill={skin} />
          <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
          <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
        </>
      )}
      {hold === 'sack' && <rect x="-40" y="-246" width="80" height="44" rx="14" fill="#cdb487" stroke={ink.night} strokeWidth="3" />}
      {hold === 'tape' && <circle cx="52" cy="-128" r="14" fill="#a9a9a2" stroke={ink.night} strokeWidth="3" />}
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

/** Night grade over a daylit scene. */
const Night = () => <rect width="1600" height="900" fill="#141a2a" opacity="0.55" />

const KIEU = clothColors.maroon
const DAT = clothColors.khaki
const CREW = clothColors.charcoal

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: 'Tháng 10/2025',
      title: 'Hai chiếc xe sắp bị kéo',
      text: 'Nhà xe Kiều Phát nợ ngân hàng 2,1 tỷ, hạn chót 30/11. Bà Kiều biết hàng của Đất Đỏ giờ đáng giá 152.000đ/kg, và biết ông Tài đang kẹt một hợp đồng xuất giá thấp. Bà đòi ông mua bảo hiểm cho chuyến hàng, còn giới thiệu đại lý. Ngày 28/10 ông ký.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['X1', 'P1']} />,
    },
    {
      time: '2/11, 15:20',
      title: 'Chì số 55120',
      text: 'Tại kho Đất Đỏ, 400 bao tiêu lô DD-1102 được chất lên xe 47H và kẹp chì AT-55120. Như mọi chuyến, anh Đạt ký nhận thêm một sợi chì dự phòng, AT-55190. Bà Kiều đã dặn anh giữ nó lại.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="kho-dd">
          <Person x={700} y={760} h={280} color={clothColors.navy} />
          <Person x={1000} y={760} h={270} color={DAT} flip />
          <Marker x={832} y={480} n="1" />
        </Staged>
      ),
    },
    {
      time: '2/11, 21:00 đến 22:30',
      title: 'Một mình trong cabin',
      text: 'Tới Phan Rang, anh Đạt tự cho phụ xe Phúc xuống chơi, còn dúi cho cậu 500 nghìn. 22:30 anh ghé quán cơm Cà Ná, chụp ảnh với xe như mọi chuyến. Chì 55120 vẫn nằm trên cửa container.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['X4', 'X3']} />,
    },
    {
      time: '23:52 đến 01:04',
      title: 'Một tiếng không có sóng',
      text: 'Gần Phan Rí, anh Đạt cắm máy phá sóng vào ổ tẩu dưới ghế phụ rồi rẽ vào kho cũ của ông Hiếu. Bà Kiều đã chờ sẵn với chiếc bán tải của nhà xe. Sáu người cùng một chiếc xe nâng dỡ 400 bao tiêu trong vòng một tiếng. Anh Đạt kẹp sợi chì dự phòng 55190 vào cửa container trống.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="kho-pr">
          <Night />
          <Person x={420} y={820} h={290} color={KIEU} />
          <Person x={980} y={800} h={280} color={CREW} hold="sack" flip />
          <Person x={1240} y={810} h={280} color={CREW} hold="sack" />
          <Marker x={704} y={720} n="2" />
          <Marker x={1120} y={600} n="3" />
        </Staged>
      ),
    },
    {
      time: '01:58',
      title: 'Cái cân không nói dối',
      text: 'Chiếc xe quay lại quốc lộ đúng chỗ đã mất sóng. Qua trạm Sông Lũy, cân tự động ghi 14,5 tấn, đúng trọng lượng một chiếc xe rỗng. Hàng đã rời xe gần một tiếng trước khi "bọn cướp" xuất hiện.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P5', 'P4']} />,
    },
    {
      time: '02:40',
      title: 'Vụ cướp ba vòng băng keo',
      text: 'Ở Hàm Thuận Nam, anh Đạt dừng xe từ từ, không có vệt phanh nào. Người của bà Kiều quấn ba vòng băng keo ra ngoài tay áo khoác của anh, cắt bằng kéo, rồi lái chiếc xe đi. Ví tiền và điện thoại vẫn nằm yên trong túi áo.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="le-duong">
          <Night />
          <Person x={720} y={760} h={240} color={DAT} pose="crouch" />
          <Person x={900} y={780} h={290} color={CREW} hold="tape" flip />
          <Marker x={704} y={640} n="4" />
          <Marker x={1056} y={480} n="5" />
          <Marker x={448} y={520} n="6" />
        </Staged>
      ),
    },
    {
      time: '03:00 đến 06:30',
      title: 'Cắt chì ở Hàm Tân',
      text: 'Chiếc container trống được bỏ lại trên một con đường đất đỏ ở Hàm Tân. Người lái cắt sợi chì 55190 cho giống bị phá cửa. Trong kẽ sàn vẫn còn vài hạt tiêu lẫn cát trắng Phan Rí. 03:22, xe bán tải của Kiều Phát qua trạm Cà Ná, chạy ngược về Buôn Ma Thuột.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="bo-xe">
          <Night />
          <Marker x={1196} y={420} n="7" />
          <Marker x={1376} y={560} n="8" />
          <Marker x={288} y={360} n="9" />
        </Staged>
      ),
    },
    {
      time: '3/11, 00:31',
      title: 'Canh xe "ở nhà"',
      text: 'Bà Kiều chụp màn hình định vị gửi anh Đạt, hỏi vì sao xe mất sóng, như thể bà đang ngồi ở Buôn Ma Thuột. Nhưng chấm xanh "vị trí của bạn" nằm sát xe 47H ở Phan Rí. Cùng lúc đó, ông Tài vẫn đang tiếp khách ở Buôn Ma Thuột.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['X5', 'X6']} />,
    },
    {
      time: '4/11 đến 6/11',
      title: 'Tiền về',
      text: 'Bà Kiều chuyển 250 triệu cho vợ anh Đạt, ghi là "trả tiền hụi". Hai ngày sau, 400 bao tiêu còn nguyên mã lô DD-1102 được bán cho một đại lý ở Long Khánh với giá 2,82 tỷ, tiền vào tài khoản của bà. Hôm sau bà trả sạch 2,1 tỷ nợ ngân hàng. Còn ông Tài chỉ có hợp đồng xuất khẩu và một kho trống.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P11', 'P10']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!

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
  tai: { text: 'Theo bạn, chính chủ hàng Nguyễn Hữu Tài dựng vụ cướp: mua bảo hiểm, dỡ hàng giữa đường, giả cướp để vừa né hợp đồng lỗ vừa lấy tiền bảo hiểm.', docs: ['P6', 'P1'] },
  kieu: { text: 'Theo bạn, bà Kiều dựng vụ cướp để có tiền trả nợ ngân hàng: đòi ông Tài mua bảo hiểm, cho tài xế giữ chì dự phòng, rồi tự lái bán tải tới Phan Rí nhận hàng.', docs: ['X1', 'P7'] },
  hieu: { text: 'Theo bạn, ông Hiếu dựng vụ cướp. Kho của ông nằm đúng chỗ xe mất sóng, và ông từng bị phạt vì chứa hàng không rõ nguồn gốc.', docs: ['X2', 'P9'] },
  dat: { text: 'Theo bạn, anh Đạt tự dựng vụ cướp một mình để bán 20 tấn tiêu trả nợ.', docs: ['P2'] },
}

const insideTheory: Record<string, string> = {
  dat: 'Theo bạn, tài xế Hồ Văn Đạt tiếp tay: anh cho phụ xe xuống, cắm máy phá sóng, chạy vào kho Phan Rí rồi giả bị trói.',
  phuc: 'Theo bạn, phụ xe Trần Minh Phúc tiếp tay: cậu biết lộ trình và xuống xe đúng đêm hàng biến mất.',
  none: 'Theo bạn, không ai trên xe tiếp tay. Anh Đạt bị cướp thật.',
}

const planRefute: Record<string, { text: string; docs: string[] }> = {
  tai: { text: 'Ông Tài có động cơ trên giấy, nhưng lúc 23:40 ông đang tiếp khách ở Buôn Ma Thuột, trời tối, đồng hồ chỉ gần 12 giờ. Chiếc bán tải tới Phan Rí là của Kiều Phát, và tiền bán tiêu vào tài khoản bà Kiều.', docs: ['X6', 'P10'] },
  hieu: { text: 'Ông Hiếu chỉ cho thuê kho. Tiền cọc chuyển từ kế toán của Kiều Phát, chiếc bán tải vào kho mang logo Kiều Phát, và tiền bán tiêu chảy về tài khoản bà Kiều.', docs: ['P9', 'X7'] },
  dat: { text: 'Anh Đạt chỉ lái xe và giả bị trói. Xe bán tải của nhà xe có mặt ở Phan Rí, bà Kiều chuyển tiền cho vợ anh, và tiền bán tiêu vào tài khoản bà.', docs: ['P7', 'P11'] },
}

const insideRefute: Record<string, { text: string; docs: string[] }> = {
  phuc: { text: 'Lúc 00:40 Phúc đang hát karaoke ở Phan Rang, cách Phan Rí 60 km. Chính anh Đạt tự cho cậu xuống xe, lần đầu tiên trong một năm.', docs: ['X4', 'P4'] },
  none: { text: 'Lúc 01:58 xe chỉ còn nặng 14,5 tấn, gần một tiếng trước giờ "bị cướp". Cổ tay tài xế không hằn một vết, băng keo quấn ngoài áo khoác.', docs: ['P5', 'P8'] },
}

function PlanArt({ who }: { who: string }) {
  return (
    <>
      <Pinned who={who} ids={planTheory[who].docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function InsideArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="le-duong">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        {who === 'none' ? (
          <>
            <Person x={720} y={760} h={240} color={DAT} pose="crouch" />
            {[860, 960, 1060].map((x) => (
              <Person key={x} x={x} y={780} h={290} color={CREW} flip />
            ))}
          </>
        ) : (
          <>
            <Person x={760} y={780} h={320} color={who === 'dat' ? DAT : clothColors.sky} />
            <text x="980" y="420" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
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
      <OnDesk ids={pay ? ['P1', 'P2'] : ['P5', 'P10']} />
      <PanelStamp text={pay ? 'Chi trả' : 'Từ chối'} color={pay ? '#3f8a7e' : '#b23a2e'} />
    </>
  )
}

export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'plan' && planTheory[optionId]) return { Art: () => <PlanArt who={optionId} />, note: planTheory[optionId].text }
  if (slotId === 'inside' && insideTheory[optionId]) return { Art: () => <InsideArt who={optionId} />, note: insideTheory[optionId] }
  if (slotId === 'decision')
    return {
      Art: () => <DecisionArt pay={optionId === 'pay'} />,
      note:
        optionId === 'pay'
          ? 'Bạn cho rằng chủ hàng là người bị hại: chi 3,04 tỷ cho Tiêu Đất Đỏ, rồi An Tín đòi lại từ nhà xe Kiều Phát.'
          : 'Bạn cho rằng chủ hàng dựng vụ cướp: từ chối chi trả và chuyển toàn bộ cho công an.',
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
      title: `Người dựng vụ cướp: ${suspect(picks.plan).name}`,
      text: planTheory[picks.plan].text,
      Art: () => <PlanArt who={picks.plan} />,
    })
  if (insideTheory[picks.inside])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.inside === 'none' ? 'Tài xế bị cướp thật' : `Người tiếp tay trên xe: ${suspect(picks.inside).name}`,
      text: insideTheory[picks.inside],
      Art: () => <InsideArt who={picks.inside} />,
    })
  panels.push({
    kind: 'theory',
    time: 'Đề xuất của bạn',
    title: pay ? 'Chi trả 3,04 tỷ cho Tiêu Đất Đỏ' : 'Từ chối và chuyển hồ sơ cho công an',
    text: pay ? 'Bạn đề xuất công ty chi trả 3,04 tỷ cho Tiêu Đất Đỏ, rồi đòi lại từ nhà xe Kiều Phát.' : 'Bạn từ chối chi trả vì cho rằng ông Tài dàn dựng, và chuyển toàn bộ hồ sơ cho công an điều tra.',
    Art: () => <DecisionArt pay={pay} />,
  })

  const wrong: ReconstructionPanel[] = []
  const pr = planRefute[picks.plan]
  if (pr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: `${suspect(picks.plan).name} không phải người dựng vụ cướp`,
      text: pr.text,
      Art: () => (
        <>
          <OnDesk ids={pr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  const ir = insideRefute[picks.inside]
  if (ir)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: picks.inside === 'none' ? 'Không có vụ cướp nào' : `${suspect(picks.inside).name} không tiếp tay`,
      text: ir.text,
      Art: () => (
        <>
          <OnDesk ids={ir.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  if (!pay)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: 'Người được bảo hiểm không gian lận',
      text: 'Vụ cướp là giả, nhưng người dựng nó là nhà xe, không phải chủ hàng. Ông Tài mất trắng 20 tấn tiêu. Điều 11 chỉ loại trừ gian lận của người được bảo hiểm. An Tín phải chi cho Đất Đỏ, rồi đứng ra đòi lại từ Kiều Phát.',
      Art: () => (
        <>
          <OnDesk ids={['P1', 'P10']} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  return [...panels, ...wrong]
}
