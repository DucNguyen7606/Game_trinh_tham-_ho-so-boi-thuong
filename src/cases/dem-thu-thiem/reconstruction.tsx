import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { Suv, Wave, sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, push, hood }: { x: number; y: number; h?: number; color: string; flip?: boolean; push?: boolean; hood?: boolean }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#d9a47a'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})${push ? ' rotate(18)' : ''}`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
      <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={color} />
      {push ? (
        <>
          <polygon points={P([[30, -196], [96, -170], [92, -158], [24, -178]])} fill={color} />
          <polygon points={P([[-30, -190], [90, -150], [86, -138], [-24, -170]])} fill={dark} />
        </>
      ) : (
        <>
          <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={color} />
          <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
        </>
      )}
      <rect x="-8" y="-218" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
      <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
      {hood && <path d="M-28,-210 Q-30,-272 0,-276 Q30,-272 28,-210 L20,-212 Q22,-262 0,-264 Q-22,-262 -20,-212 Z" fill={color} />}
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

const Night = () => <rect width="1600" height="900" fill="#141a2a" opacity="0.45" />
const KHAI = clothColors.khaki
const KHOA = clothColors.white

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '6/12, 22:20',
      title: 'Ba chai bia và một chiếc chìa khóa',
      text: 'Khoa ngồi quán Bến Gỗ với Hân, mặc áo hoodie trắng. Chìa khóa chiếc Mercedes của cha nằm trên bàn. Cậu đang bị tước bằng lái vì lái xe sau khi uống rượu. Hân đòi lái giùm, Khoa không chịu.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['X4', 'P9']} />,
    },
    {
      time: '22:47',
      title: 'Góc đường Nguyễn Văn Hưởng',
      text: 'Chị Hoa chạy chiếc Wave đỏ về nhà sau ca bánh mì. Góc phải đầu chiếc Mercedes tông vào đuôi xe chị. Kính đèn sương mù phải vỡ, két nước nứt. Khoa mở cửa nhìn chị nằm trên đường, rồi đóng cửa chạy.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="nguyen-van-huong">
          <Night />
          <Suv x={980} y={600} s={0.9} hit lights />
          <Wave x={560} y={660} s={1.1} rot={-78} broken />
          <Person x={1120} y={700} h={300} color={KHOA} hood />
          <Marker x={288} y={700} n="1" />
          <Marker x={1240} y={540} n="2" />
        </Staged>
      ),
    },
    {
      time: '22:58',
      title: 'Về gara nhà',
      text: 'Chiếc xe nhỏ nước làm mát màu hồng suốt đường về khách sạn Sông Xanh. Chú Sơn ghi sổ: "cậu Khoa lái, đầu xe bể". Lúc đó ông Khải còn đang ở cổng tiếp đoàn khách Hà Nội.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="gara">
          <Suv x={720} y={600} s={0.95} hit />
          <Person x={1000} y={740} h={320} color={KHOA} hood />
          <Marker x={672} y={700} n="3" />
          <Marker x={1290} y={690} n="4" />
        </Staged>
      ),
    },
    {
      time: '23:15',
      title: 'Ông Khải biết',
      text: 'Ông Khải xuống gara, thấy cái đầu xe và mảnh nhựa đỏ. Ông nhắn Toàn sửa kín trong đêm, "giá nào cũng được". Toàn không trả lời. Ông bảo Khoa đặt xe cho Hân về và im lặng.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['X6', 'P5']} />,
    },
    {
      time: '7/12, 02:15',
      title: 'Châm nước, ra cổng',
      text: 'Ông châm nửa can nước làm mát cho xe đủ chạy thêm vài cây số, quét mảnh nhựa vào góc, rồi tự lái chiếc Mercedes ra khỏi khách sạn, một mình. Chú Sơn ghi sổ.',
      questionId: 'q4',
      Art: () => <OnDesk ids={['P8', 'P2']} />,
    },
    {
      time: '02:34',
      title: 'Bảy cây số một giờ',
      text: 'Trên con đường vắng ở Thủ Thiêm, ông Khải về số N, mở cửa lái, xuống xe và đẩy. Chiếc Mercedes lăn thẳng xuống bờ kênh, đâm gốc cây dầu. Cú đâm cây đè lên vết tông người. Đôi giày tây cỡ 40 hằn lại trên bờ đất.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="bo-kenh">
          <Night />
          <Person x={520} y={560} h={300} color={KHAI} push />
          <Marker x={544} y={420} n="5" />
          <Marker x={352} y={640} n="6" />
          <Marker x={1250} y={560} n="7" />
        </Staged>
      ),
    },
    {
      time: '02:52',
      title: 'Không mưa, không bò',
      text: 'Ông Khải gọi 113, kể chuyện chuyến về từ Vũng Tàu, cơn mưa và con bò. Nhưng chuyến Vũng Tàu là tối hôm trước, trời đã tạnh từ 9 giờ, và đàn bò nằm trong chuồng khóa xích. Hai lòng bàn tay ông trầy vì đẩy xe.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P4', 'X3']} />,
    },
    {
      time: '8/12',
      title: 'Hồ sơ 2,1 tỷ',
      text: 'Ông Khải nộp hồ sơ đòi 2,1 tỷ cho chiếc xe ông tự đẩy xuống kênh, và xin kéo xe về gara quen. Sáng hôm đó, chú Sơn được lệnh xé trang sổ trực. Ở Chợ Rẫy, chị Hoa vẫn hôn mê.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P10', 'X8']} />,
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

const crashTheory: Record<string, string> = {
  khai: 'Theo bạn, chính ông Khải lái chiếc xe đã bể đầu lên Thủ Thiêm, về số N rồi đẩy nó xuống kênh để che vết tông người và đòi tiền bảo hiểm.',
  khoa: 'Theo bạn, Khoa tự đưa xe lên Thủ Thiêm đẩy xuống kênh để xóa dấu vết.',
  toan: 'Theo bạn, Toàn bày cho ông Khải dựng tai nạn và tự tay đẩy xe để ăn tiền sửa.',
  son: 'Theo bạn, chú Sơn được ông chủ sai đưa xe đi phi tang.',
  none: 'Theo bạn, ông Khải gặp tai nạn thật: trời mưa, con bò băng ra, xe mất lái.',
}

const driverTheory: Record<string, { text: string; docs: string[] }> = {
  khoa: { text: 'Theo bạn, Khoa say rượu lái xe của cha, tông chị Hoa lúc 22:47 rồi bỏ chạy về khách sạn.', docs: ['X4', 'P6'] },
  khai: { text: 'Theo bạn, ông Khải tự lái xe tông chị Hoa rồi bỏ chạy.', docs: ['P5'] },
  han: { text: 'Theo bạn, Hân lái xe giùm Khoa và tông chị Hoa.', docs: ['X4'] },
  son: { text: 'Theo bạn, chú Sơn lấy xe ông chủ đi và tông chị Hoa.', docs: ['P5'] },
  none: { text: 'Theo bạn, chiếc xe tông chị Hoa là một chiếc khác, không phải xe ông Khải.', docs: ['P7'] },
}

const crashRefute: Record<string, { text: string; docs: string[] }> = {
  khoa: { text: 'Sổ trực ghi 02:15 ông Khải lái chiếc Mercedes ra, một mình. Khoa ở lại khách sạn. Dấu giày đẩy xe là giày tây cỡ 40 của ông Khải, và chính ông gọi 113 lúc 02:52.', docs: ['P3', 'X7'] },
  toan: { text: 'Toàn ngủ ở nhà, không trả lời tin nhắn tới 7 giờ sáng, và còn từ chối thẳng: "đụng người thì em không dám". Người có mặt ở Thủ Thiêm lúc 02:34 là ông Khải.', docs: ['X6', 'P3'] },
  son: { text: 'Lúc 02:40 chú Sơn đang ký nhận phòng cho một khách lẻ ở khách sạn, cách Thủ Thiêm gần 5 km.', docs: ['X7', 'P3'] },
  none: { text: 'Hộp túi khí ghi xe lăn 7 km/h, số N, cửa lái mở, dây an toàn chưa cài. Xe không qua trạm thu phí nào, trời không mưa, bò nằm trong chuồng. Không có tai nạn nào cả.', docs: ['P4', 'P8'] },
}

const driverRefute: Record<string, { text: string; docs: string[] }> = {
  khai: { text: 'Lúc 22:45 đến 22:55 ông Khải đứng ở cổng khách sạn đón đoàn khách Hà Nội, trưởng đoàn ký xác nhận. Ông chỉ biết chuyện khi chiếc xe về tới.', docs: ['X7', 'P6'] },
  han: { text: 'Lúc 22:52 Hân vẫn ngồi ở Bến Gỗ với hai người bạn, ghế của Khoa trống. Chị Hoa nhớ người lái là một thanh niên mặc áo trắng có mũ.', docs: ['X5', 'P10'] },
  son: { text: 'Chú Sơn nhận đoàn khách lúc 22:45 ở cổng khách sạn, và chính chú ghi sổ "cậu Khoa lái" lúc 22:58.', docs: ['X7', 'P6'] },
  none: { text: 'Mảnh kính ở Nguyễn Văn Hưởng là kính đèn sương mù phải của GLC, đúng chiếc đèn mất kính trên xe ông Khải. Góc phải đầu xe dính sơn đỏ, mảnh ốp Wave đỏ nằm trong gara khách sạn.', docs: ['P7', 'P5'] },
}

function CrashArt({ who }: { who: string }) {
  if (who === 'none')
    return (
      <>
        <OnDesk ids={['P2', 'P3']} />
        <PanelStamp text="Giả thuyết" color="#9fb4c8" />
      </>
    )
  return (
    <>
      <Staged zone="bo-kenh">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        <Person x={520} y={560} h={300} color={colorOf(who)} push />
        <text x="760" y="380" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function DriverArt({ who }: { who: string }) {
  return (
    <>
      {who === 'none' ? <OnDesk ids={driverTheory.none.docs} /> : <Pinned who={who} ids={driverTheory[who].docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function DecisionArt({ pay }: { pay: boolean }) {
  return (
    <>
      <OnDesk ids={pay ? ['P1', 'P3'] : ['P4', 'P5']} />
      <PanelStamp text={pay ? 'Chi trả' : 'Từ chối'} color={pay ? '#3f8a7e' : '#b23a2e'} />
    </>
  )
}

export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'crash' && crashTheory[optionId]) return { Art: () => <CrashArt who={optionId} />, note: crashTheory[optionId] }
  if (slotId === 'driver' && driverTheory[optionId]) return { Art: () => <DriverArt who={optionId} />, note: driverTheory[optionId].text }
  if (slotId === 'decision')
    return {
      Art: () => <DecisionArt pay={optionId === 'pay'} />,
      note:
        optionId === 'pay'
          ? 'Bạn cho rằng ông Khải gặp tai nạn thật, và công ty nên chi trả 2,1 tỷ.'
          : 'Bạn cho rằng hồ sơ có gian lận: từ chối chi trả và chuyển toàn bộ cho công an.',
    }
  return undefined
}

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  const pay = picks.decision === 'pay'
  if (crashTheory[picks.crash])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.crash === 'none' ? 'Một tai nạn thật' : `Người đẩy xe xuống kênh: ${suspect(picks.crash).name}`,
      text: crashTheory[picks.crash],
      Art: () => <CrashArt who={picks.crash} />,
    })
  if (driverTheory[picks.driver])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.driver === 'none' ? 'Không phải xe ông Khải' : `Người tông chị Hoa: ${suspect(picks.driver).name}`,
      text: driverTheory[picks.driver].text,
      Art: () => <DriverArt who={picks.driver} />,
    })
  panels.push({
    kind: 'theory',
    time: 'Đề xuất của bạn',
    title: pay ? 'Chi trả 2,1 tỷ' : 'Từ chối và chuyển hồ sơ cho công an',
    text: pay ? 'Bạn đề xuất công ty chi trả 2,1 tỷ cho ông Khải.' : 'Bạn từ chối chi trả và chuyển toàn bộ hồ sơ cho công an điều tra.',
    Art: () => <DecisionArt pay={pay} />,
  })

  const wrong: ReconstructionPanel[] = []
  const cr = crashRefute[picks.crash]
  if (cr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: picks.crash === 'none' ? 'Không có tai nạn nào' : `${suspect(picks.crash).name} không đẩy chiếc xe`,
      text: cr.text,
      Art: () => (
        <>
          <OnDesk ids={cr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  const dr = driverRefute[picks.driver]
  if (dr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: picks.driver === 'none' ? 'Đúng là xe ông Khải' : `${suspect(picks.driver).name} không cầm lái`,
      text: dr.text,
      Art: () => (
        <>
          <OnDesk ids={dr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  if (pay)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: 'Chiếc xe bị đẩy xuống kênh',
      text: 'Chiếc Mercedes lăn xuống với tốc độ 7 km/h, số N, cửa lái mở. Theo Điều 9, công ty không bồi thường thiệt hại do hành động cố ý, cũng không bồi thường khi người lái không có giấy phép hợp lệ.',
      Art: () => (
        <>
          <OnDesk ids={['P4', 'P1']} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  return [...panels, ...wrong]
}
