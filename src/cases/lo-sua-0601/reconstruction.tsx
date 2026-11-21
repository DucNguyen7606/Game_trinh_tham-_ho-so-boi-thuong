import type { PortraitSpec } from '@/art/Portrait'
import { IsoFigure } from '@/art/iso/figure'
import { Box, Cyl, iso, type V3 } from '@/art/iso/iso'
import caseData from './case.json'
import { at, isoSceneArt as sceneArt } from './iso/scenes'
import { documents } from './documents'
import type { ReconstructionPanel } from '@/game/types'

// "Dựng lại vụ án": the true sequence of events, shown after the player signs.

const spec = (id: string) => caseData.suspects.find((x) => x.id === id)!.portrait as PortraitSpec
const stranger: PortraitSpec = { skin: 2, hair: 'cap', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'charcoal', age: 'mid', mood: 'stern' }

/** Someone as a block figure at a world point; `raincoat` puts them in the grey raincoat and cap from the store camera, `phone` puts a phone in their hand. */
function Fig({ who, p, facing = 'y', raincoat, phone, mood }: { who?: string; p: V3; facing?: 'x' | 'y' | '-x' | '-y'; raincoat?: boolean; phone?: boolean; mood?: PortraitSpec['mood'] }) {
  const base = who ? spec(who) : stranger
  const sp = { ...base, mood: mood ?? base.mood, ...(raincoat ? { hair: 'cap' as const } : {}) }
  const [x, y, z] = p
  return (
    <g>
      <IsoFigure at={[x - 13, y - 9, z]} spec={sp} facing={facing} size={1.15} cloth={raincoat ? '#9a9da3' : undefined} />
      {phone && <Box at={[x + 10, y + 16, z + 60]} size={[4, 10, 16]} color={iso.ink} />}
    </g>
  )
}

/** A zone diorama with people added in, and markers drawn over it. */
function Staged({ zone, extra, children }: { zone: string; extra?: React.ReactNode; children?: React.ReactNode }) {
  const Art = sceneArt[zone]
  return (
    <div className="absolute inset-0">
      <Art extra={extra} />
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

/** A numbered marker over a hotspot, placed by its screen percentages. */
const Marker = ({ px, py, n }: { px: number; py: number; n: string }) => (
  <g transform={`translate(${px * 16} ${py * 9})`}>
    <circle r="26" fill={iso.coral} stroke="#ffffff" strokeWidth="5" />
    <text y="10" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff" fontFamily="'Be Vietnam Pro', sans-serif">
      {n}
    </text>
  </g>
)

/** Night: a soft violet wash over the diorama. */
const Night = () => <rect width="1600" height="900" fill="#3b3a6a" opacity="0.22" />

const desk = at('xuong', 74, 62)
const shelf = at('sieu-thi', 40, 46)
/** The alarm beacon lit red on the UHT control box. */
const Alarm = () => <Cyl at={[215, 335, 80]} r={9} len={12} axis="z" color="#ff3b2e" cap="#ff8a7a" />
/** Whoever stands at the soy-milk shelf in the grey raincoat. */
const AtShelf = ({ who }: { who?: string }) => <Fig who={who} p={[shelf[0] + 50, shelf[1] + 10, 0]} facing="-x" raincoat />

export const reconstruction: ReconstructionPanel[] = (
  [
    {
      time: '6/1, 22:00',
      title: 'Ca đêm line 2',
      text: 'Sang chỉnh kim nhiệt kế về mức chuẩn và bắt đầu ca đêm. Lô 0601-L2 chạy qua máy tiệt trùng ở 121°C như mọi đêm.',
      questionId: 'q1',
      Art: () => (
        <Staged zone="xuong" extra={<Fig who="sang" p={[desk[0] - 10, desk[1] + 70, 0]} />}>
          <Marker px={28} py={40} n="1" />
        </Staged>
      ),
    },
    {
      time: '7/1, 02:05 đến 03:20',
      title: 'Van hơi kẹt',
      text: 'Van cấp hơi kẹt, nhiệt độ tụt xuống 97–101°C suốt một tiếng mười lăm phút. Lúc 02:14 Sang chụp màn hình báo động gửi Thuận. Thuận trả lời: "Cứ chạy tiếp, đừng ghi sổ", rồi tắt báo động từ xa. Sữa chạy qua máy lúc đó không được tiệt trùng đủ.',
      questionId: 'q3',
      Art: () => (
        <Staged
          zone="xuong"
          extra={
            <>
              <Alarm />
              <Fig who="sang" p={[desk[0] - 10, desk[1] + 70, 0]} phone mood="worried" />
            </>
          }
        >
          <Night />
          <Marker px={28} py={40} n="2" />
          <Marker px={74} py={62} n="3" />
        </Staged>
      ),
    },
    {
      time: '7/1, sáng',
      title: 'Một dòng bị tẩy',
      text: 'Thuận tẩy dòng "báo động nhiệt" trong sổ vận hành, ghi đè "bình thường", rồi ký phiếu xuất xưởng lô 0601-L2: ĐẠT. Chiều hôm đó anh đề xuất cho Sang nghỉ việc vì "ngủ gật". Bà Hà ký theo, không biết gì về đêm đó.',
      questionId: 'q6',
      Art: () => <OnDesk ids={['P9', 'P6']} />,
    },
    {
      time: '9/1, 08:30',
      title: 'Chai sữa của ông Mạnh',
      text: 'Bào tử sống sót sau tiệt trùng thiếu nhiệt, sinh khí làm phồng nắp. Ông Mạnh mở chai, quay clip: nắp nguyên, không lỗ. Tới tối 10/1 đã có 22 khiếu nại ở 11 điểm bán, tất cả cùng lô 0601-L2.',
      questionId: 'q2',
      Art: () => <OnDesk ids={['X7', 'P7']} />,
    },
    {
      time: '10/1, 19:02 đến 19:20',
      title: 'Áo mưa trong đêm khô',
      text: 'Lô lỗi lọt ra thị trường thì Thuận mất chức và phải bồi hoàn. Anh mặc áo mưa xám, đội mũ lưỡi trai, tới Hiệp Thành Mart, dùng kim bút tiêm insulin chích sáu chai ở hàng ngoài cùng. Bốn chai trong đó thuộc lô 0701-L1 còn tốt.',
      questionId: 'q4',
      Art: () => (
        <Staged zone="sieu-thi" extra={<AtShelf who="thuan" />}>
          <Night />
          <Marker px={40} py={38} n="4" />
          <Marker px={84} py={62} n="5" />
        </Staged>
      ),
    },
    {
      time: '11/1, 08:15',
      title: 'Lá thư trong hộp thư',
      text: 'Thuận in lá thư tống tiền bằng máy in phòng QC, trên mặt sau một tờ phiếu kiểm nghiệm cũ, rồi bỏ vào hộp thư cổng. Lá thư đòi 500 triệu mà không bao giờ liên lạc lại: nó không cần tiền, nó chỉ cần biến lỗi nhà máy thành "kẻ xấu chích kim".',
      questionId: 'q5',
      Art: () => <OnDesk ids={['P3', 'P10']} />,
    },
    {
      time: '11/1 đến 12/1',
      title: 'Hồ sơ 3,2 tỷ',
      text: 'Bà Hà báo công an ngay, thu hồi cả hai lô và nộp hồ sơ cho An Tín, tin rằng Mộc An là nạn nhân. Đêm 10/1 Sang ở đám giỗ Tây Ninh. Còn tấm ảnh bữa cơm của Thuận chụp lúc 20:05, sau khi xe anh đã rời bãi siêu thị.',
      questionId: 'q7',
      Art: () => <OnDesk ids={['X5', 'X6']} />,
    },
  ] as ReconstructionPanel[]
).map((p) => ({ ...p, kind: 'truth' as const }))

// ---------------------------------------------------------------------------
// The player's verdict told as a story first, then each wrong pick taken apart.

type Picks = Record<string, string>
const suspect = (id: string) => caseData.suspects.find((s) => s.id === id)!

const PanelStamp = ({ text, color }: { text: string; color: string }) => (
  <div
    className="display pointer-events-none absolute right-6 top-6 border-4 px-4 py-1 text-3xl opacity-85"
    style={{ color, borderColor: color, rotate: '-8deg' }}
  >
    {text}
  </div>
)

const causeTheory: Record<string, { title: string; text: string; docs: string[] }> = {
  defect: { title: 'Lỗi trong nhà máy', text: 'Theo bạn, sữa chua vì máy tiệt trùng line 2 tụt nhiệt đêm 6/1, và có người trong nhà máy che giấu chuyện đó.', docs: ['P6', 'P5'] },
  tamper: { title: 'Kẻ tống tiền chích kim', text: 'Theo bạn, một kẻ tống tiền đã chích kim vào sữa ngoài siêu thị, làm sữa hỏng.', docs: ['P3', 'P2'] },
  store: { title: 'Điểm bán bảo quản sai', text: 'Theo bạn, các điểm bán để sữa sai cách nên sữa chua.', docs: ['P7'] },
}

const writerTheory: Record<string, string> = {
  thuan: 'Theo bạn, Thuận chích kim sáu chai ở Hiệp Thành Mart và viết thư tống tiền để che lô lỗi anh đã ký cho xuất xưởng.',
  sang: 'Theo bạn, Sang bị đuổi việc nên trả thù: chích kim vào sữa và viết thư tống tiền.',
  manh: 'Theo bạn, ông Mạnh đòi tiền không được nên dựng chuyện chích kim và gửi thư tống tiền.',
  ha: 'Theo bạn, bà Hà tự dựng chuyện tống tiền để An Tín trả tiền cho đợt thu hồi.',
  outsider: 'Theo bạn, một kẻ tống tiền lạ mặt đã chích kim vào sữa và gửi thư cho Mộc An.',
}

const causeRefute: Record<string, { text: string; docs: string[] }> = {
  tamper: { text: '40 chai chua từ 14 điểm bán không chai nào có lỗ kim. Pallet lô 0601-L2 chưa từng rời nhà máy cũng phồng nắp. Sáu chai có lỗ chỉ xuất hiện ở một kệ, hai ngày sau clip của ông Mạnh.', docs: ['P5', 'X7'] },
  store: { text: 'Sữa chua ở 14 điểm bán khác nhau nhưng chỉ cùng một lô, cùng một line, cùng một ca. Cả pallet nằm trong kho mát của nhà máy cũng hỏng. Kim nhiệt kế dừng ở 97°C.', docs: ['P5', 'P6'] },
}

const writerRefute: Record<string, { text: string; docs: string[] }> = {
  sang: { text: 'Tối 10/1 Sang ở đám giỗ Tây Ninh. Chính anh là người chụp màn hình báo động và xin dừng máy. Lá thư in trên máy in phòng QC, nơi anh không còn vào được từ 7/1.', docs: ['X5', 'X4'] },
  manh: { text: 'Chai của ông Mạnh có nắp nguyên, và ông là người đầu tiên khiếu nại. Lá thư in trên máy in phòng QC của Mộc An. Người áo mưa ở kệ sữa đi chiếc tay ga bạc của Thuận.', docs: ['X7', 'P10'] },
  ha: { text: 'Bà Hà mời công an vào ngay khi nhận thư và tự thu hồi hai lô, chịu thêm án phạt hàng Tết. Phiếu xuất xưởng bà nhìn thấy ghi ĐẠT, chữ ký Thuận. Báo động đêm 6/1 bị tắt bằng tài khoản của Thuận.', docs: ['P4', 'P6'] },
  outsider: { text: 'Kẻ tống tiền thật sẽ liên lạc để lấy tiền. Lá thư này không bao giờ có cuộc gọi nào. Nó in trên máy in phòng QC, trên mặt sau phiếu kiểm nghiệm của chính Mộc An.', docs: ['P10', 'P3'] },
}

function CauseArt({ id }: { id: string }) {
  return (
    <>
      <OnDesk ids={causeTheory[id].docs} />
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

function WriterArt({ who }: { who: string }) {
  if (who === 'outsider')
    return (
      <>
        <Staged zone="sieu-thi" extra={<AtShelf />}>
          <rect width="1600" height="900" fill="#3b3a6a" opacity="0.25" />
          <text x="1000" y="400" textAnchor="middle" fontSize="140" fontWeight="700" fill="#ffffff" opacity="0.8" fontFamily="'Be Vietnam Pro', sans-serif">?</text>
        </Staged>
        <PanelStamp text="Giả thuyết" color="#9fb4c8" />
      </>
    )
  return (
    <>
      <Staged zone="sieu-thi" extra={<AtShelf who={who} />}>
        <rect width="1600" height="900" fill="#3b3a6a" opacity="0.25" />
        <text x="1000" y="400" textAnchor="middle" fontSize="140" fontWeight="700" fill="#ffffff" opacity="0.8" fontFamily="'Be Vietnam Pro', sans-serif">?</text>
      </Staged>
      <PanelStamp text="Giả thuyết" color="#9fb4c8" />
    </>
  )
}

const decisionText: Record<string, { title: string; note: string; stamp: string; color: string; docs: string[] }> = {
  pay: { title: 'Chi trả đủ 3,2 tỷ', note: 'Bạn cho rằng Mộc An bị kẻ xấu chích kim và tống tiền thật, và công ty nên chi trả đủ 3,2 tỷ cho cả hai lô.', stamp: 'Chi trả', color: '#3f8a7e', docs: ['P2', 'P3'] },
  part: { title: 'Chi 1,4 tỷ cho lô 0701-L1', note: 'Bạn cho rằng lô 0601-L2 hỏng vì lỗi nhà máy, nhưng lô 0701-L1 bị thu hồi vì lời đe dọa nên vẫn được chi trả.', stamp: 'Chi một phần', color: '#cf9a32', docs: ['P2', 'P1'] },
  deny: { title: 'Từ chối, chuyển công an', note: 'Bạn cho rằng đợt thu hồi bắt nguồn từ lỗi sản xuất và một lời đe dọa do người trong công ty dựng lên. Cả hai đều bị loại trừ.', stamp: 'Từ chối', color: '#b23a2e', docs: ['P1', 'P10'] },
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
  if (slotId === 'writer' && writerTheory[optionId]) return { Art: () => <WriterArt who={optionId} />, note: writerTheory[optionId] }
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
  const c = causeTheory[picks.cause]
  if (c) panels.push({ kind: 'theory', time: 'Giả thuyết của bạn', title: c.title, text: c.text, Art: () => <CauseArt id={picks.cause} /> })
  if (writerTheory[picks.writer])
    panels.push({
      kind: 'theory',
      time: 'Giả thuyết của bạn',
      title: picks.writer === 'outsider' ? 'Kẻ tống tiền lạ mặt' : `Người dựng chuyện: ${suspect(picks.writer).name}`,
      text: writerTheory[picks.writer],
      Art: () => <WriterArt who={picks.writer} />,
    })
  const d = decisionText[picks.decision]
  if (d) panels.push({ kind: 'theory', time: 'Đề xuất của bạn', title: d.title, text: d.note, Art: () => <DecisionArt id={picks.decision} /> })

  const wrong: ReconstructionPanel[] = []
  const cr = causeRefute[picks.cause]
  if (cr) wrong.push(refutePanel('Sữa hỏng từ trong nhà máy', cr))
  const wr = writerRefute[picks.writer]
  if (wr) wrong.push(refutePanel(picks.writer === 'outsider' ? 'Không có kẻ tống tiền nào bên ngoài' : `${suspect(picks.writer).name} không viết lá thư`, wr))
  if (picks.decision === 'pay')
    wrong.push(
      refutePanel('Hợp đồng không chi cho lỗi sản xuất', {
        text: 'Lô 0601-L2 hỏng vì tiệt trùng thiếu nhiệt, thuộc Điều 7: lỗi sản xuất và sai sót kiểm soát chất lượng. Lời đe dọa khiến lô 0701-L1 bị thu hồi do chính trưởng QC của Mộc An dựng lên.',
        docs: ['P1', 'P6'],
      }),
    )
  if (picks.decision === 'part')
    wrong.push(
      refutePanel('Lời đe dọa đến từ bên trong', {
        text: 'Lô 0701-L1 bị thu hồi vì lá thư tống tiền. Nhưng lá thư do Thuận, trưởng phòng QC của Mộc An, viết. Điều 7 loại trừ hành vi của nhân viên người được bảo hiểm.',
        docs: ['P1', 'P10'],
      }),
    )
  return [...panels, ...wrong]
}
