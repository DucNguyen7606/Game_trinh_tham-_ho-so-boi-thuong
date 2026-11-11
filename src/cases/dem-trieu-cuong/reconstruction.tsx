import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { Boat, C, sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, hold, raincoat }: { x: number; y: number; h?: number; color: string; flip?: boolean; hold?: 'box' | 'can'; raincoat?: boolean }) {
  const s = h / 260
  const body = raincoat ? C.raincoat : color
  const dark = shade(body, -0.35)
  const skin = '#c58f63'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={raincoat ? body : dark} />
      {raincoat && <polygon points={P([[-21, -50], [-14, 0], [14, 0], [21, -50]])} fill={C.mud} />}
      <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={body} />
      <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={body} />
      <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
      <rect x="-8" y="-218" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
      {raincoat ? (
        <path d="M-28,-226 Q-30,-276 0,-278 Q30,-276 28,-226 L22,-240 Q0,-266 -22,-240 Z" fill={body} />
      ) : (
        <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
      )}
      {hold === 'box' && (
        <g>
          <rect x="30" y="-200" width="90" height="70" fill={C.carton} stroke={ink.night} strokeWidth="3" />
          <text x="75" y="-158" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">MỸ LỆ</text>
        </g>
      )}
      {hold === 'can' && <rect x="40" y="-150" width="50" height="70" rx="8" fill="#c23a2c" stroke={ink.night} strokeWidth="3" />}
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

const Night = () => <rect width="1600" height="900" fill="#141a2a" opacity="0.55" />
const TU = clothColors.charcoal

/** Flood water standing at the window: the boat rides high enough to touch the sill. */
function HighWater() {
  return (
    <>
      <Night />
      <rect y="560" width="1600" height="340" fill={C.canal} opacity="0.92" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${i * 220 - 40},${600 + (i % 3) * 40} q50,-10 100,0`} stroke="#6e8a86" strokeWidth="4" fill="none" />
      ))}
      <g transform="translate(900 540) scale(0.9)">
        <Boat x={0} y={0} light cargo="none" />
        {[-220, -150, -80, -185, -115].map((bx, i) => (
          <rect key={i} x={bx} y={i < 3 ? -46 : -92} width="66" height="46" fill={C.carton} stroke={ink.night} strokeWidth="3" />
        ))}
      </g>
    </>
  )
}

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '12/9',
      title: 'Hàng Tết vào kho',
      text: 'Bà Lệ nhập thêm 500 máy cho mùa Tết và nâng giá trị bảo hiểm lên 4,5 tỷ cho khớp tổng hàng. Kho số 7 có đủ 150 thùng, 1.500 máy, chia đều năm tầng kệ.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P9', 'X2']} />,
    },
    {
      time: '14/11, 18:10',
      title: 'Một bình dầu đầy',
      text: 'Tư ghe đổ đầy 60 lít dầu ở cây dầu ven bến. Khải đã hẹn ông: đêm nay nước lớn, ghe sẽ nổi ngang cửa sổ kho.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="ben">
          <Person x={1020} y={830} h={300} color={TU} hold="can" flip />
          <Marker x={1184} y={690} n="1" />
        </Staged>
      ),
    },
    {
      time: '22:40 đến 23:58',
      title: '"Con kê xong rồi cô"',
      text: 'Nước bắt đầu vào kho lúc 22:40. Khải vẫn ở trong kho, chụp ảnh gửi bà Lệ lúc 23:58: nước mới tới ống quyển, ba tầng trên còn đầy thùng. Bà Lệ yên tâm đi ngủ.',
      questionId: 'q3',
      Art: () => <OnDesk ids={['X3', 'P3']} />,
    },
    {
      time: '15/11, 01:52 đến 02:41',
      title: 'Ghe ngang cửa sổ',
      text: 'Nước đã lên gần 0,8 m. Khải mặc áo mưa vàng, lội trong kho, kéo chốt cửa sổ từ bên trong. Ghe của Tư cập vào, mạn ghe cạ sơn xanh đỏ lên bậu cửa. Gần một tiếng, 90 thùng ở ba tầng trên chuyền qua song sắt xuống khoang ghe.',
      questionId: 'q5',
      Art: () => (
        <Staged zone="cua-so">
          <Person x={760} y={520} h={220} color={C.raincoat} raincoat hold="box" />
          <HighWater />
          <Marker x={800} y={300} n="2" />
          <Marker x={1056} y={380} n="3" />
        </Staged>
      ),
    },
    {
      time: '02:30',
      title: 'Đỉnh triều 0,9 m',
      text: 'Nước trong kho đạt đỉnh 0,9 m rồi rút dần. Hai tầng dưới ngập bùn, 600 máy hư thật. Ba tầng trên, từ 1,1 m trở lên, không bao giờ chạm nước: thứ duy nhất còn lại trên đó là những ô sạch bụi.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="kho">
          <Marker x={1248} y={540} n="4" />
          <Marker x={544} y={330} n="5" />
        </Staged>
      ),
    },
    {
      time: '15/11, sáng',
      title: 'Báo cáo 150 thùng',
      text: 'Khải viết báo cáo: về từ 22 giờ, nước phá cửa sổ cuốn trôi 90 thùng. Bà Lệ tin, chép nguyên số liệu vào đơn đòi 4,5 tỷ, kèm luôn tấm ảnh 23:58 mà không để ý nó nói ngược với báo cáo. Đêm đó Nhật ở quán nhậu Phú Mỹ Hưng, còn tấm ảnh "ghe neo ở bến" của Tư chụp lúc 21:05.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P4', 'X5']} />,
    },
    {
      time: '17/11',
      title: 'Máy lên kệ Quận 10',
      text: 'Chủ tiệm Gia Hưng Mobile chuyển cho Khải 1,1 tỷ. Hôm sau Khải trả Tư 60 triệu tiền ghe. Cùng tuần, 214 máy trong lô "bị nước cuốn" được gắn sim, cách tiệm của bà Lệ hai dãy phố.',
      questionId: 'q6',
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

const takerTheory: Record<string, string> = {
  khai: 'Theo bạn, Khải ở lại kho tới khuya, mở cửa sổ phía kênh cho ghe cập vào và chuyển 90 thùng ở ba tầng trên đi bán.',
  le: 'Theo bạn, bà Lệ tự cho người lấy hàng tầng trên rồi khai là nước cuốn trôi để lấy tiền bảo hiểm hai lần.',
  nhat: 'Theo bạn, Nhật lẻn xuống kho trong đêm ngập, lấy hàng tầng trên bán trả nợ cá độ.',
  tu: 'Theo bạn, Tư ghe tự mình cạy cửa sổ kho, lấy hàng chở đi lúc nước lớn.',
  none: 'Theo bạn, không có ai lấy hàng: nước triều đã cuốn 90 thùng ở ba tầng trên ra kênh.',
}

const helperTheory: Record<string, { text: string; docs: string[] }> = {
  tu: { text: 'Theo bạn, chiếc ghe cập cửa sổ kho là ghe của Tư.', docs: ['P8', 'P7'] },
  nhat: { text: 'Theo bạn, Nhật thuê ghe chở hàng đi trong đêm.', docs: ['X1'] },
  bong: { text: 'Theo bạn, chị Bông dùng ghe của người quen chở hàng đi.', docs: ['P7'] },
  none: { text: 'Theo bạn, đêm đó không có chiếc ghe nào cập kho.', docs: ['P4'] },
}

const takerRefute: Record<string, { text: string; docs: string[] }> = {
  le: { text: 'Bà Lệ ở Quận 10 cả đêm và tự đưa ra tấm ảnh 23:58, thứ phá vỡ chính báo cáo bà nộp. Tiền bán hàng chảy vào tài khoản Khải chứ không phải của bà. Bà nâng giá trị bảo hiểm vì nhập thêm hàng thật.', docs: ['P10', 'P9'] },
  nhat: { text: 'Lúc 01:45 Nhật ngồi xem bóng đá ở Phú Mỹ Hưng với bốn người bạn. Anh không có chìa kho, và người đưa thùng qua cửa sổ mặc áo mưa vàng của Khải.', docs: ['X4', 'P10'] },
  tu: { text: 'Chốt cửa sổ được kéo ra từ phía trong, không bị cạy. Tư chỉ là người chạy ghe. Người mở cửa phải ở trong kho, và người đó có chìa.', docs: ['P10', 'P7'] },
  none: { text: 'Nước chỉ lên 0,9 m, còn tầng thấp nhất trong ba tầng trên cao 1,1 m. Thùng bọc nilon nổi trên mặt nước, vậy mà phường vớt rác hai ngày không thấy thùng nào. 214 máy trong lô đó đã gắn sim ở Quận 10.', docs: ['P6', 'P11'] },
}

const helperRefute: Record<string, { text: string; docs: string[] }> = {
  nhat: { text: 'Nhật ở quán nhậu Phú Mỹ Hưng từ khuya tới hơn 3 giờ. Vệt sơn trên bậu cửa sổ đúng màu chiếc ghe đăng ký tên Lê Văn Tư.', docs: ['X4', 'P8'] },
  bong: { text: 'Chị Bông ngồi trong quán suốt đêm và là người kể lại chuyện chiếc ghe. Sơn xanh dương viền đỏ và mẩu băng keo "MỸ LỆ" đều dẫn tới ghe của Tư.', docs: ['P8', 'P7'] },
  none: { text: 'Camera bên kia kênh thấy ghe đèn xanh cập cửa sổ kho lúc 01:52 và rời đi lúc 02:41, khoang chất đầy hàng phủ bạt.', docs: ['P7', 'P8'] },
}

function TakerArt({ who }: { who: string }) {
  if (who === 'none')
    return (
      <>
        <OnDesk ids={['P4']} />
        <PanelStamp text="Giả thuyết" color="#9fb4c8" />
      </>
    )
  return (
    <>
      <Staged zone="cua-so">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        <Person x={800} y={520} h={240} color={colorOf(who)} hold="box" />
        <text x="1100" y="380" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function HelperArt({ who }: { who: string }) {
  return (
    <>
      {who === 'none' ? <OnDesk ids={helperTheory.none.docs} /> : <Pinned who={who} ids={helperTheory[who].docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  pay: { title: 'Chi trả đủ 4,5 tỷ', note: 'Bạn cho rằng toàn bộ 1.500 máy đã hư do triều cường, và công ty nên chi trả đủ 4,5 tỷ.', stamp: 'Chi trả', color: '#3f8a7e', docs: ['P2', 'P4'] },
  partial: { title: 'Chi 1,8 tỷ, phần bị lấy chuyển công an', note: 'Bạn cho rằng chỉ 600 máy ở hai tầng dưới hư do nước. Phần còn lại bị người lấy đi, không thuộc phạm vi bảo hiểm, cần chuyển công an.', stamp: 'Chi một phần', color: '#cf9a32', docs: ['P6', 'P1'] },
  deny: { title: 'Từ chối toàn bộ', note: 'Bạn cho rằng bà Lệ gian lận cả hồ sơ, và công ty không chi đồng nào.', stamp: 'Từ chối', color: '#b23a2e', docs: ['X2', 'P2'] },
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
  if (slotId === 'taker' && takerTheory[optionId]) return { Art: () => <TakerArt who={optionId} />, note: takerTheory[optionId] }
  if (slotId === 'helper' && helperTheory[optionId]) return { Art: () => <HelperArt who={optionId} />, note: helperTheory[optionId].text }
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
  if (takerTheory[picks.taker])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.taker === 'none' ? 'Nước cuốn trôi hàng' : `Người lấy hàng: ${suspect(picks.taker).name}`,
      text: takerTheory[picks.taker],
      Art: () => <TakerArt who={picks.taker} />,
    })
  if (helperTheory[picks.helper])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.helper === 'none' ? 'Không có ghe nào' : `Người chở ghe: ${suspect(picks.helper).name}`,
      text: helperTheory[picks.helper].text,
      Art: () => <HelperArt who={picks.helper} />,
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
  const tr = takerRefute[picks.taker]
  if (tr) wrong.push(refutePanel(picks.taker === 'none' ? 'Nước không cuốn được hàng tầng trên' : `${suspect(picks.taker).name} không lấy hàng`, tr))
  const hr = helperRefute[picks.helper]
  if (hr) wrong.push(refutePanel(picks.helper === 'none' ? 'Đêm đó có một chiếc ghe' : `${suspect(picks.helper).name} không chở ghe`, hr))
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('900 máy chưa từng chạm nước', {
        text: 'Chỉ 600 máy ở hai tầng dưới hư do ngập. 900 máy còn lại bị người lấy đi qua cửa sổ, không có dấu hiệu đột nhập. Theo Điều 9, phần đó không thuộc phạm vi bảo hiểm.',
        docs: ['P6', 'P1'],
      }),
    )
  if (picks.decision === 'deny')
    wrong.push(
      refutePanel('Bà Lệ không gian lận', {
        text: 'Ngập nước là có thật và nằm trong phạm vi bảo hiểm: 600 máy ở tầng 1–2 hư toàn bộ. Bà Lệ nâng giá trị bảo hiểm vì nhập thêm hàng thật, và tiền bán hàng bị lấy chảy vào túi Khải.',
        docs: ['P9', 'P10'],
      }),
    )
  return [...panels, ...wrong]
}
