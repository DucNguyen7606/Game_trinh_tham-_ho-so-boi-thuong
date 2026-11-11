import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { LotusPainting, sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, hold, scarf }: { x: number; y: number; h?: number; color: string; flip?: boolean; hold?: 'bag' | 'pry' | 'brush'; scarf?: boolean }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#d9a47a'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
      <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={color} />
      <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={color} />
      <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
      <rect x="-8" y="-218" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
      <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
      {scarf && (
        <>
          <path d="M-20,-206 Q0,-190 20,-206 L16,-186 Q0,-180 -16,-186 Z" fill="#efe6d4" />
          <path d="M-16,-186 Q0,-180 16,-186" stroke={accent.red} strokeWidth="4" fill="none" />
          <path d="M10,-188 l8,50" stroke="#efe6d4" strokeWidth="10" strokeLinecap="round" />
        </>
      )}
      {hold === 'bag' && <rect x="40" y="-190" width="100" height="130" rx="6" fill="#2a2522" stroke={ink.night} strokeWidth="3" />}
      {hold === 'pry' && <line x1="44" y1="-140" x2="90" y2="-200" stroke="#9a968f" strokeWidth="9" strokeLinecap="round" />}
      {hold === 'brush' && <line x1="44" y1="-140" x2="80" y2="-120" stroke="#c9a274" strokeWidth="6" strokeLinecap="round" />}
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
const DIEP = clothColors.maroon
const QUAN = clothColors.charcoal

/** Two paintings side by side: the real one and the copy. */
function TwoPaintings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-10 bg-[radial-gradient(circle_at_40%_30%,#5a3a24,#1c130f_75%)] p-6">
      {[false, true].map((fake) => (
        <figure key={String(fake)} className="w-[340px] bg-[#5a2f22] p-3 shadow-xl" style={{ rotate: fake ? '2deg' : '-2deg' }}>
          <svg viewBox="0 0 300 240" className="block w-full">
            <LotusPainting fake={fake} />
          </svg>
          <figcaption className="pt-2 text-center font-mono text-xs text-[#f3e4c4]">{fake ? 'Bản chép của Quân · MDF' : 'Bản gốc · vóc gỗ mít'}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '3/2025',
      title: 'Tám tỷ trên giấy',
      text: 'Ông Phong thẩm định bức "Thiếu nữ bên sen" là tranh gốc: vóc gỗ mít, chuồn chuồn đỏ son, chữ ký "Khuê 62", vết rạn ở góc. Bà Diệp mua bảo hiểm 8 tỷ. Lúc đó bức tranh vẫn là thật.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P2', 'P1']} />,
    },
    {
      time: '2/6 đến 28/6',
      title: 'Bốn tuần ở xưởng',
      text: 'Bức tranh tới xưởng Quân để xử lý vết rạn. Quân can lại từng nét tỉ lệ 1:1 rồi chép một bản trên ván MDF bằng sơn acrylic. Ngày 28/6 anh giao bản chép về phòng tranh, kèm lời dặn "màu tươi hơn".',
      questionId: 'q4',
      Art: () => (
        <Staged zone="xuong">
          <Person x={760} y={700} h={330} color={QUAN} hold="brush" />
          <Marker x={512} y={440} n="1" />
          <Marker x={992} y={240} n="2" />
        </Staged>
      ),
    },
    {
      time: '3/7',
      title: 'Tranh thật đổi chủ',
      text: 'Nhà sưu tầm Hứa Vĩnh Thành chuyển cho Quân 2,5 tỷ. Bức thật về treo phòng khách ở Phú Mỹ Hưng, còn nguyên chuồn chuồn đỏ và vết rạn mà Quân "cố ý để lại".',
      questionId: 'q3',
      Art: () => <OnDesk ids={['P10', 'P11']} />,
    },
    {
      time: '5/7',
      title: 'Không ai nhận ra',
      text: 'Bản chép treo lại giữa phòng tranh trong buổi khai mạc. Chuồn chuồn giờ màu vàng, chữ ký thành "Khuê 1962", vết rạn biến mất. Người ta khen thợ phục chế khéo tay.',
      questionId: 'q3',
      Art: () => <TwoPaintings />,
    },
    {
      time: '14/10 và 28/10',
      title: 'Bà Diệp biết',
      text: 'Bà Diệp tự gửi mẫu sơn đi xét nghiệm: nhựa acrylic, không thể là năm 1962. Hai tuần sau nhà đấu giá báo sẽ lấy mẫu sơn ngày 21/11. Bà không báo ai. Tờ kết quả bị cho vào máy hủy.',
      questionId: 'q5',
      Art: () => <OnDesk ids={['P9', 'P8']} />,
    },
    {
      time: '20/11, 01:36 đến 01:59',
      title: 'Chủ nhà làm kẻ trộm',
      text: 'Bà Diệp chạy Vespa xanh ngọc từ Thảo Điền tới, quấn chiếc khăn kem viền đỏ. Bà tắt báo động bằng mã của mình, tắt camera trên máy tính phòng làm việc, gỡ bản chép khỏi khung rồi nạy cửa sau từ bên trong cho giống trộm phá cửa.',
      questionId: 'q6',
      Art: () => (
        <Staged zone="cua-sau">
          <Night />
          <Person x={700} y={720} h={330} color={DIEP} hold="pry" scarf flip />
          <Marker x={672} y={400} n="3" />
          <Marker x={960} y={700} n="4" />
        </Staged>
      ),
    },
    {
      time: '01:59',
      title: 'Một chiếc túi dẹt',
      text: 'Camera Đồng Khởi thấy chiếc Vespa ra khỏi hẻm, chở một túi dẹt cỡ một mét. Chú Bảy Lộc bán hủ tiếu thấy người phụ nữ quấn khăn quay lại "làm gì đó ở cửa". Ngọc lúc đó ở Bùi Viện, Quân đang livestream, ông Phong ở Đà Lạt.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P7', 'X3']} />,
    },
    {
      time: '20/11, 07:51',
      title: 'Hồ sơ 8 tỷ',
      text: 'Bà Diệp có mặt 11 phút sau khi Ngọc báo tin, bình tĩnh lạ thường, rồi nộp hồ sơ đòi 8 tỷ cho một bức tranh mà bà biết là không đáng một đồng.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="trung-bay">
          <Person x={980} y={760} h={340} color={DIEP} scarf />
          <Marker x={800} y={396} n="5" />
        </Staged>
      ),
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

const theftTheory: Record<string, string> = {
  diep: 'Theo bạn, chính bà Diệp vào phòng tranh lúc 01:38, gỡ bức tranh rồi dựng vết cạy để đòi tiền bảo hiểm.',
  ngoc: 'Theo bạn, Ngọc dùng mã của chủ để vào phòng tranh, lấy bức tranh bán đi trả nợ thẻ.',
  quan: 'Theo bạn, Quân quay lại lấy bức tranh để xóa dấu vết bản chép.',
  phong: 'Theo bạn, ông Phong lấy bức tranh để không ai phát hiện ông thẩm định sai.',
}

const swapTheory: Record<string, { text: string; docs: string[] }> = {
  quan: { text: 'Theo bạn, Quân chép bức tranh trong đợt phục chế tháng 6, giao bản chép về và bán bản thật.', docs: ['P6', 'P5'] },
  diep: { text: 'Theo bạn, bà Diệp tự tráo tranh từ lâu và bán bản thật.', docs: ['P9'] },
  phong: { text: 'Theo bạn, ông Phong thẩm định một bức giả từ đầu để ăn chia.', docs: ['P2', 'X2'] },
  ngoc: { text: 'Theo bạn, Ngọc lén tráo tranh khi nhận tranh về từ xưởng.', docs: ['P6'] },
  none: { text: 'Theo bạn, bức bị lấy đêm 19/11 là tranh thật. Không có ai tráo tranh.', docs: ['P2'] },
}

const theftRefute: Record<string, { text: string; docs: string[] }> = {
  ngoc: { text: 'Lúc 01:35 Ngọc ở Bùi Viện với ba người bạn. Người vào hẻm đi Vespa xanh ngọc, còn Ngọc chạy Vision trắng. Câu hỏi về tiền bảo hiểm là bà Diệp sai cô hỏi.', docs: ['X4', 'P7'] },
  quan: { text: 'Từ 01:00 đến 02:20 Quân livestream ở xưởng Bình Thạnh, học trò ngồi cạnh. Anh đã có tranh thật, không cần lấy bản chép.', docs: ['X5'] },
  phong: { text: 'Ông Phong ở Đà Lạt dự hội thảo, chụp hồ Xuân Hương lúc 01:20. Ông không có mã báo động.', docs: ['X6'] },
}

const swapRefute: Record<string, { text: string; docs: string[] }> = {
  diep: { text: 'Bà Diệp chỉ biết tranh là giả từ tháng 10. Bức tranh rời phòng tranh duy nhất một lần, tới xưởng Quân, và tiền bán tranh thật vào tài khoản Quân.', docs: ['P6', 'P10'] },
  phong: { text: 'Bức ông Phong thẩm định tháng 3 có chuồn chuồn đỏ, chữ ký "Khuê 62" và vết rạn, đúng như bức đang treo nhà ông Thành. Ông chính là người nhận ra ảnh tháng 7 là đồ chép.', docs: ['P2', 'P11'] },
  ngoc: { text: 'Ngọc chỉ ký nhận tranh về. Giấy can và ván MDF đúng cỡ nằm ở xưởng Quân, tiền bán tranh vào tài khoản Quân.', docs: ['P6', 'P10'] },
  none: { text: 'Mảnh vụn trong khung là MDF, tranh của Khuê vẽ trên vóc gỗ mít. Mẫu sơn là acrylic. Bức bị lấy đi đêm đó là đồ chép.', docs: ['P9', 'P5'] },
}

function TheftArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="cua-sau">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        <Person x={700} y={720} h={340} color={colorOf(who)} hold="bag" flip />
        <text x="1000" y="380" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function SwapArt({ who }: { who: string }) {
  return (
    <>
      {who === 'none' ? <OnDesk ids={swapTheory.none.docs} /> : <Pinned who={who} ids={swapTheory[who].docs} />}
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function DecisionArt({ pay }: { pay: boolean }) {
  return (
    <>
      <OnDesk ids={pay ? ['P1', 'P4'] : ['P9', 'P3']} />
      <PanelStamp text={pay ? 'Chi trả' : 'Từ chối'} color={pay ? '#3f8a7e' : '#b23a2e'} />
    </>
  )
}

export function verdictPreview(slotId: string, optionId: string): { Art: () => JSX.Element; note: string } | undefined {
  if (slotId === 'theft' && theftTheory[optionId]) return { Art: () => <TheftArt who={optionId} />, note: theftTheory[optionId] }
  if (slotId === 'swap' && swapTheory[optionId]) return { Art: () => <SwapArt who={optionId} />, note: swapTheory[optionId].text }
  if (slotId === 'decision')
    return {
      Art: () => <DecisionArt pay={optionId === 'pay'} />,
      note:
        optionId === 'pay'
          ? 'Bạn cho rằng bức tranh gốc bị trộm thật, và công ty nên chi trả 8 tỷ cho bà Diệp.'
          : 'Bạn cho rằng hồ sơ có gian lận: từ chối chi trả và chuyển toàn bộ cho công an.',
    }
  return undefined
}

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  const pay = picks.decision === 'pay'
  if (theftTheory[picks.theft])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: `Người lấy bức tranh: ${suspect(picks.theft).name}`,
      text: theftTheory[picks.theft],
      Art: () => <TheftArt who={picks.theft} />,
    })
  if (swapTheory[picks.swap])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.swap === 'none' ? 'Không có ai tráo tranh' : `Người tráo tranh: ${suspect(picks.swap).name}`,
      text: swapTheory[picks.swap].text,
      Art: () => <SwapArt who={picks.swap} />,
    })
  panels.push({
    kind: 'theory',
    time: 'Đề xuất của bạn',
    title: pay ? 'Chi trả 8 tỷ' : 'Từ chối và chuyển hồ sơ cho công an',
    text: pay ? 'Bạn đề xuất công ty chi trả 8 tỷ cho bà Diệp.' : 'Bạn từ chối chi trả và chuyển toàn bộ hồ sơ cho công an điều tra.',
    Art: () => <DecisionArt pay={pay} />,
  })

  const wrong: ReconstructionPanel[] = []
  const tr = theftRefute[picks.theft]
  if (tr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: `${suspect(picks.theft).name} không lấy bức tranh`,
      text: tr.text,
      Art: () => (
        <>
          <OnDesk ids={tr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  const sr = swapRefute[picks.swap]
  if (sr)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: picks.swap === 'none' ? 'Bức bị lấy đi là đồ chép' : `${suspect(picks.swap).name} không tráo tranh`,
      text: sr.text,
      Art: () => (
        <>
          <OnDesk ids={sr.docs} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  if (pay)
    wrong.push({
      kind: 'refute',
      time: 'Lật lại',
      title: 'Không có tranh gốc nào bị trộm',
      text: 'Thứ biến mất đêm 19/11 là bản chép trên MDF. Bà Diệp biết từ tháng 10 và tự tay gỡ nó xuống. Theo Điều 11, công ty chỉ bồi thường cho tác phẩm gốc và không bồi thường khi người được bảo hiểm gian lận.',
      Art: () => (
        <>
          <OnDesk ids={['P9', 'P1']} />
          <PanelStamp text="Không khớp" color="#b23a2e" />
        </>
      ),
    })
  return [...panels, ...wrong]
}
