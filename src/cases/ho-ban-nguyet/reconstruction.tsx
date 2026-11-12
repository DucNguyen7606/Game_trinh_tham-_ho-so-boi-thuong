import { accent, clothColors, ink, shade } from '@/art/palette'
import { P } from '@/art/primitives'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import caseData from './case.json'
import { sceneArt } from './scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

/** Flat, faceless figure in the scene's 1600x900 space. (x, y) is where the feet touch the ground. */
function Person({ x, y, h = 260, color, flip = false, helmet, hold, bald }: { x: number; y: number; h?: number; color: string; flip?: boolean; helmet?: boolean; hold?: 'glass' | 'phone'; bald?: boolean }) {
  const s = h / 260
  const dark = shade(color, -0.35)
  const skin = '#b9815a'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="10" fill={ink.night} opacity="0.45" />
      <polygon points={P([[-22, -120], [-14, 0], [-2, 0], [0, -96], [2, 0], [14, 0], [22, -120]])} fill={dark} />
      <polygon points={P([[-34, -200], [34, -200], [26, -116], [-26, -116]])} fill={color} />
      <polygon points={P([[34, -196], [48, -130], [38, -128], [24, -180]])} fill={color} />
      <polygon points={P([[-34, -196], [-48, -130], [-38, -128], [-24, -180]])} fill={dark} />
      <rect x="-8" y="-218" width="16" height="20" fill={skin} />
      <polygon points={P([[-20, -262], [20, -262], [22, -226], [0, -212], [-22, -226]])} fill={skin} />
      {helmet ? (
        <path d="M-28,-236 Q-30,-286 0,-286 Q30,-286 28,-236 Z" fill="#f2f2ee" stroke={ink.night} strokeWidth="3" />
      ) : bald ? null : (
        <polygon points={P([[-22, -264], [22, -264], [20, -246], [-22, -244]])} fill={ink.night} />
      )}
      {hold === 'glass' && <path d="M44,-150 L40,-182 L62,-182 L58,-150 Z" fill="#f2f2ee" stroke={ink.night} strokeWidth="3" opacity="0.9" />}
      {hold === 'phone' && <rect x="40" y="-170" width="18" height="30" rx="3" fill={ink.night} />}
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
const TOAN = clothColors.navy
const HUNG = clothColors.white

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '12/03',
      title: '7,1 tỷ không có chuyến hàng nào',
      text: 'Chị Quyên gửi ông Hưng email: 14 phiếu chi cho Thành Đạt, công ty do vợ Toàn làm giám đốc, tổng 7,1 tỷ. Ông Hưng hẹn kiểm toán sáng chủ nhật 15/3, và tối thứ bảy sẽ nói chuyện riêng với em trai trước. Toàn là người thụ hưởng hợp đồng 6 tỷ mà chính anh lo giấy tờ.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['P6', 'P1']} />,
    },
    {
      time: '14/03, 22:49 đến 22:52',
      title: 'Mượn chiếc Wave đỏ',
      text: 'Ô tô của Toàn nằm yên trong cảng, sổ cổng chính sẽ chứng cho anh. Anh nhắn mượn xe của Phúc "đi mua đồ ăn khuya", đội mũ bảo hiểm trắng, mặc áo khoác đồng phục navy, ra cổng phụ không ghi sổ lúc 22:52.',
      questionId: 'q5',
      Art: () => (
        <Staged zone="van-phong-cang">
          <Night />
          <Person x={1000} y={760} h={300} color={TOAN} helmet hold="phone" />
          <Marker x={1370} y={560} n="1" />
        </Staged>
      ),
    },
    {
      time: '23:07 đến 23:10',
      title: 'Ông Hưng tự mở thang cho em',
      text: 'Xe xuống hầm B2 của Sen Hồng lúc 23:07. Toàn gọi lên căn hộ từ màn hình hầm, ông Hưng bấm mở thang. Hai anh em rót hai ly whisky.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="phong-khach">
          <Night />
          <Person x={520} y={760} h={320} color={TOAN} hold="glass" />
          <Person x={900} y={760} h={330} color={HUNG} hold="glass" flip />
          <Marker x={144} y={330} n="2" />
        </Staged>
      ),
    },
    {
      time: '23:41',
      title: 'Bên lan can 1,4 m',
      text: 'Ông Hưng nói sáng mai sẽ đưa hết cho kiểm toán và công an, rồi quay ra ban công gọi điện. Toàn nắm chặt cổ tay trái anh mình. Chậu cây đổ, gót giày lết trên sàn gỗ. Móng tay ông Hưng cào rách cổ tay áo khoác navy. Một người đứng hút thuốc không thể trượt qua lan can cao tới vai.',
      questionId: 'q3',
      Art: () => (
        <Staged zone="ban-cong">
          <Night />
          <Person x={760} y={720} h={330} color={TOAN} />
          <Person x={900} y={700} h={330} color={HUNG} flip />
          <Marker x={448} y={600} n="3" />
          <Marker x={960} y={330} n="4" />
        </Staged>
      ),
    },
    {
      time: '23:41 đến 23:49',
      title: 'Lau một ly, xuống hầm',
      text: 'Ông Lộc nghe tiếng rơi lúc 23:41. Toàn lau sạch ly của mình, úp lên khay, nhưng quên đáy ly còn rượu. 23:47 thang xuống B2, 23:49 chiếc Wave ra khỏi hầm.',
      questionId: 'q1',
      Art: () => <OnDesk ids={['P5', 'P3']} />,
    },
    {
      time: '15/03, 00:09 đến 01:15',
      title: 'Ngoại phạm bằng chiếc ô tô',
      text: 'Chiếc Wave về cổng phụ lúc 00:09. Toàn giặt áo khoác trong nhà vệ sinh kho, treo sau cửa văn phòng. Khi công an gọi, anh lái ô tô ra cổng chính lúc 01:15, rồi đưa sổ cổng cho công an như bằng chứng mình chưa rời cảng.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P8', 'X6']} />,
    },
    {
      time: '18/03',
      title: 'Một đơn đòi tiền "trượt chân"',
      text: 'Công an nghiêng về tự tử, điều sẽ khiến hợp đồng chỉ hoàn phí. Toàn nộp đơn khẳng định anh trai trượt chân. Nhưng ông Hưng đã mua vé đi Đà Nẵng mừng sinh nhật con gái, và người thụ hưởng cố ý gây ra cái chết thì không được nhận đồng nào. Tiền thuộc về người thừa kế duy nhất: Vy.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['P2', 'P9']} />,
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

const causeTheory: Record<string, { title: string; text: string; docs: string[] }> = {
  pushed: { title: 'Ông Hưng bị đẩy qua lan can', text: 'Theo bạn, có người trên ban công cùng ông Hưng lúc 23:41 và đã đẩy ông qua lan can.', docs: ['P4'] },
  suicide: { title: 'Ông Hưng tự tử', text: 'Theo bạn, ông Hưng không chịu nổi món nợ 9 tỷ và tự gieo mình từ tầng 21.', docs: ['X1', 'P3'] },
  slip: { title: 'Ông Hưng trượt chân', text: 'Theo bạn, ông Hưng uống rượu, ra ban công hút thuốc rồi mất thăng bằng.', docs: ['P2'] },
}

const killerTheory: Record<string, string> = {
  toan: 'Theo bạn, Toàn mượn xe của Phúc chạy từ cảng qua Sen Hồng, được anh trai mở thang cho lên, rồi đẩy ông qua lan can để chặn buổi kiểm toán sáng hôm sau.',
  phuc: 'Theo bạn, Phúc chạy chiếc Wave của mình tới Sen Hồng đêm đó và gây ra cái chết của ông Hưng.',
  kha: 'Theo bạn, ông Khả đòi nợ không được, cãi nhau rồi đẩy ông Hưng qua lan can.',
  truc: 'Theo bạn, bà Trúc tới căn hộ sau cuộc cãi nhau qua điện thoại vì chuyện nuôi Vy.',
  quyen: 'Theo bạn, chị Quyên sợ bị lộ trong vụ 7,1 tỷ nên ra tay trước buổi đối chiếu.',
}

const causeRefute: Record<string, { text: string; docs: string[] }> = {
  suicide: { text: 'Ông Hưng hẹn kiểm toán 9 giờ sáng hôm sau, nhắn "xong vụ này tôi đưa Vy đi Đà Nẵng" lúc 23:02, và đã mua vé cho hai cha con. Pháp y còn thấy cổ tay ông bị nắm chặt trước khi rơi.', docs: ['X4', 'P4'] },
  slip: { text: 'Lan can cao 1,4 m, tới ngang vai, không ghế kê. Nồng độ cồn thấp. Dưới móng tay ông có sợi vải navy của người khác.', docs: ['P4', 'P2'] },
}

const killerRefute: Record<string, { text: string; docs: string[] }> = {
  phuc: { text: 'Đêm đó Phúc mặc đồng phục kho olive và làm trong kho tới sáng. Người lái chiếc Wave mặc áo khoác navy của khối văn phòng, và Toàn đã nhắn mượn xe lúc 22:49.', docs: ['P8', 'X6'] },
  kha: { text: 'Ông Khả rời sảnh lúc 22:16. Lúc 23:40 ông đang hát karaoke ở Quận 4, cách đó vài cây số.', docs: ['P5', 'X5'] },
  truc: { text: 'Lượt khách duy nhất sau 22:00 đi xe máy 59P2-418.36 từ hầm B2, mặc áo khoác đồng phục navy của Hưng Toàn Logistics. Bà Trúc ở nhà với Vy ở Thảo Điền.', docs: ['P5', 'P7'] },
  quyen: { text: 'Chính chị Quyên phát hiện 7,1 tỷ và chuẩn bị chứng từ cho ông Hưng. Các phiếu chi do Toàn duyệt, tiền chảy về công ty của vợ Toàn.', docs: ['P6', 'X4'] },
}

function KillerArt({ who }: { who: string }) {
  return (
    <>
      <Staged zone="ban-cong">
        <rect width="1600" height="900" fill="#3b4a66" opacity="0.35" style={{ mixBlendMode: 'color' }} />
        <Person x={760} y={720} h={330} color={colorOf(who)} bald={who === 'kha'} />
        <text x="1100" y="420" textAnchor="middle" fontSize="120" fontWeight="700" fill="#9fb4c8" opacity="0.5" fontFamily="Bitter, serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function CauseArt({ id }: { id: string }) {
  return (
    <>
      <OnDesk ids={causeTheory[id].docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  heir: { title: 'Chi 6 tỷ cho cháu Vy', note: 'Bạn cho rằng người thụ hưởng đã cố ý gây ra cái chết, nên không trả cho anh ta. 6 tỷ được chi cho người thừa kế duy nhất của ông Hưng, hồ sơ chuyển công an.', stamp: 'Chi cho người thừa kế', color: '#3f8a7e', docs: ['P1', 'P9'] },
  pay: { title: 'Chi 6 tỷ cho Toàn', note: 'Bạn cho rằng ông Hưng trượt chân, người thụ hưởng Đặng Quốc Toàn được nhận đủ 6 tỷ.', stamp: 'Chi trả', color: '#cf9a32', docs: ['P2', 'P1'] },
  refund: { title: 'Chỉ hoàn phí', note: 'Bạn cho rằng ông Hưng tự tử trong 24 tháng đầu, An Tín chỉ hoàn lại phí đã đóng.', stamp: 'Hoàn phí', color: '#b23a2e', docs: ['P3', 'X1'] },
  deny: { title: 'Từ chối toàn bộ', note: 'Bạn cho rằng người thụ hưởng gây ra cái chết, nên An Tín không trả cho bất kỳ ai.', stamp: 'Từ chối', color: '#b23a2e', docs: ['P1', 'P4'] },
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
  if (slotId === 'cause' && causeTheory[optionId]) return { Art: () => <CauseArt id={optionId} />, note: causeTheory[optionId].text }
  if (slotId === 'killer' && killerTheory[optionId]) return { Art: () => <KillerArt who={optionId} />, note: killerTheory[optionId] }
  if (slotId === 'decision' && decisionText[optionId]) return { Art: () => <DecisionArt id={optionId} />, note: decisionText[optionId].note }
  return undefined
}

const refutePanel = (title: string, r: { text: string; docs: string[] }, who?: string): ReconstructionPanel => ({
  kind: 'refute',
  time: 'Lật lại',
  title,
  text: r.text,
  Art: () => (
    <>
      {who ? <Pinned who={who} ids={r.docs} /> : <OnDesk ids={r.docs} />}
      <PanelStamp text="Không khớp" color="#b23a2e" />
    </>
  ),
})

export function theoryPanels(picks: Picks): ReconstructionPanel[] {
  const panels: ReconstructionPanel[] = []
  const c = causeTheory[picks.cause]
  if (c) panels.push({ kind: 'theory', time: 'Giả thuyết của bạn', title: c.title, text: c.text, Art: () => <CauseArt id={picks.cause} /> })
  if (killerTheory[picks.killer])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: `Trên ban công: ${suspect(picks.killer).name}`,
      text: killerTheory[picks.killer],
      Art: () => <KillerArt who={picks.killer} />,
    })
  const d = decisionText[picks.decision]
  if (d) panels.push({ kind: 'theory', time: 'Đề xuất của bạn', title: d.title, text: d.note, Art: () => <DecisionArt id={picks.decision} /> })

  const wrong: ReconstructionPanel[] = []
  const cr = causeRefute[picks.cause]
  if (cr) wrong.push(refutePanel(picks.cause === 'suicide' ? 'Ông Hưng không tự tử' : 'Ông Hưng không trượt chân', cr))
  const kr = killerRefute[picks.killer]
  if (kr) wrong.push(refutePanel(`${suspect(picks.killer).name} không có mặt trên ban công`, kr, picks.killer))
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('Người thụ hưởng không được nhận', {
        text: 'Điều 11: người thụ hưởng cố ý gây ra cái chết của người được bảo hiểm thì An Tín không trả cho người đó. Chiếc Wave, áo khoác navy và sợi vải dưới móng tay đều dẫn về Toàn.',
        docs: ['P1', 'P8'],
      }),
    )
  if (picks.decision === 'refund')
    wrong.push(
      refutePanel('Đây không phải tự tử', {
        text: 'Điều 8 chỉ áp dụng khi người được bảo hiểm tự tử. Ông Hưng bị nắm cổ tay và đẩy qua lan can, nên hợp đồng vẫn phải chi đủ 6 tỷ.',
        docs: ['P4', 'P1'],
      }),
    )
  if (picks.decision === 'deny')
    wrong.push(
      refutePanel('Hợp đồng vẫn phải chi trả', {
        text: 'Điều 11 không xóa nghĩa vụ của An Tín. Nó chỉ chuyển quyền nhận tiền từ người thụ hưởng sang người thừa kế hợp pháp, ở đây là cháu Vy.',
        docs: ['P1', 'P9'],
      }),
    )
  return [...panels, ...wrong]
}
