// Illustrated epilogue shown on the ending card: one small diorama per person's fate.
import { Box, Cyl, Face, OnPlane, WallText, iso, tone } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Cup, Table } from '@/art/iso/props'
import { InterviewRoom } from '@/art/iso/rooms'
import { EpiCourt, EpiDesk, EpiPanel as Panel, EpiRoom, EpiTransfer, FONT, Plant, useCaseSpec } from '@/art/iso/kit'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const Transfer = () => <EpiTransfer amount="3.040.000.000 đ" to="Cty Tiêu Đất Đỏ" note="Boi thuong HS 0311" />
const File = ({ stamp, sub, color }: { stamp: string; sub: string; color?: string }) => <EpiDesk file="0311" stamp={stamp} sub={sub} color={color} />

const sack = '#d9c29a'

/** Đạt tells everything in the interview room. */
function Confession() {
  const spec = useCaseSpec('dat', 'worried')
  const player = useCaseSpec('player')
  if (!spec) return <></>
  return <InterviewRoom spec={spec} talking={false} interviewer={player} label="Phòng làm việc của công an" />
}

/** Kiều Phát's yard: red containers, Kiều standing by the office. */
function Yard({ who, count = 5 }: { who?: string; count?: number }) {
  const spec = useCaseSpec(who ?? 'kieu', 'smile')
  return (
    <EpiRoom label="Bãi xe Kiều Phát" floor="#c9bfb3" right="#d8cbbf" edge="#a99a8c" h={110} sky={['#c3c9e6', '#f4d6c6']}>
      <Box at={[20, 0, 80]} size={[200, 4, 26]} color="#2f4258" />
      <WallText at={[120, 4.4, 86]} plane="R" text="KIỀU PHÁT LOGISTICS" size={16} />
      {Array.from({ length: count }, (_, i) => (
        <Box key={i} at={[20 + (i % 3) * 78, 20 + Math.floor(i / 3) * 60, 0]} size={[70, 44, 50]} color="#d0644a" />
      ))}
      {who && spec && <IsoFigure at={[140, 170, 0]} spec={spec} facing="y" />}
      <Plant at={[240, 220]} />
    </EpiRoom>
  )
}

/** 400 sacks of lot DD-1102 in a trader's yard in Long Khánh. */
function Sacks() {
  const out: JSX.Element[] = []
  for (let l = 0; l < 3; l++)
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 5; c++)
        out.push(<Box key={`${l}${r}${c}`} at={[50 + c * 34, 50 + r * 50, l * 22]} size={[32, 48, 21]} color={(l + r + c) % 2 ? sack : tone(sack, -0.06)} />)
  return (
    <EpiRoom label="Lô tiêu ở Long Khánh" floor="#d4c6b6" left="#d9c7b7" right="#e6d6c4" edge="#a07c5a" h={110}>
      <WallText at={[150, 1, 88]} plane="R" text="ĐẠI LÝ · LONG KHÁNH" size={16} color="#7a4f32" />
      {out}
      <OnPlane at={[56, 200.4, 60]} plane="R">
        <text x="0" y="6" fontSize="8" fontWeight="800" fill="#7a4f32" fontFamily={FONT}>LÔ DD-1102</text>
      </OnPlane>
    </EpiRoom>
  )
}

/** Tài at the morning coffee stall, the pepper price on a board. */
function Cafe() {
  const spec = useCaseSpec('tai', 'smile')
  return (
    <EpiRoom label="Quán cà phê đầu hẻm" floor="#e2d3c6" left="#bcd3c4" right="#cfe0d2" edge="#8fae9c" sky={['#f8c98a', '#f7dccb']}>
      <Face points={[[120, 0.5, 40], [230, 0.5, 40], [230, 0.5, 104], [120, 0.5, 104]]} fill="#3f5e4a" />
      <WallText at={[175, 0.8, 88]} plane="R" text="TIÊU HÔM NAY" size={13} color="#fffaf0" />
      <WallText at={[175, 0.8, 58]} plane="R" text="155.000" size={24} color="#ffe1a0" />
      <Table at={[90, 120, 0]} w={60} d={50} h={40} color={iso.wood} />
      <Cup at={[110, 140, 40]} fill="#7b5236" />
      <Box at={[80, 180, 0]} size={[30, 30, 24]} color={iso.coral} />
      {spec && <IsoFigure at={[82, 180, 0]} spec={spec} facing="x" pose="sit" />}
      <Cyl at={[200, 180, 0]} r={16} len={24} axis="z" color={iso.blue} />
    </EpiRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 3,04 tỷ đồng cho Tiêu Đất Đỏ. Chủ hàng không gian lận, ông chỉ là người bị mất 20 tấn tiêu.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Bà Đoàn Thị Kiều bị xét xử về tội lừa đảo chiếm đoạt tài sản. An Tín đứng ra đòi lại 3,04 tỷ từ nhà xe.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['kieu']} mood="worried" />
        </Panel>
      ),
    },
    {
      id: 'dat',
      caption: 'Anh Đạt khai hết và được giảm án. Vợ anh trả lại 250 triệu.',
      Art: () => (
        <Panel>
          <Confession />
        </Panel>
      ),
    },
    {
      id: 'sacks',
      caption: '400 bao tiêu lô DD-1102 được tìm thấy ở một đại lý tại Long Khánh. Tiền bán tiêu trong tài khoản bà Kiều bị phong tỏa.',
      Art: () => (
        <Panel>
          <Sacks />
        </Panel>
      ),
    },
    {
      id: 'yard',
      caption: 'Hai chiếc container thế chấp vẫn bị ngân hàng kéo đi. Bãi xe Kiều Phát chỉ còn ba chiếc.',
      Art: () => (
        <Panel>
          <Yard count={3} />
        </Panel>
      ),
    },
    {
      id: 'tai',
      caption: 'Ông Tài giao trễ hợp đồng xuất, chịu phạt, nhưng giữ được uy tín. Sáng nào ông vẫn ngồi cà phê đầu hẻm xem giá tiêu.',
      Art: () => (
        <Panel>
          <Cafe />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0311 đóng lại. Tiền về đúng chủ hàng, còn người dựng vụ cướp phải trả lại từng đồng.',
      Art: () => (
        <Panel>
          <File stamp="CHI TRẢ BỒI THƯỜNG" sub="ĐÒI LẠI TỪ NHÀ XE KIỀU PHÁT" color="#3f8a7e" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'transfer',
      caption: 'Tiêu Đất Đỏ được chi trả đúng, anh Đạt bị khởi tố.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'kieu',
      caption: 'Nhưng hồ sơ không gọi đúng tên người đứng sau. Anh Đạt nhận hết tội, An Tín không có căn cứ đòi tiền nhà xe. Bà Kiều trả xong nợ ngân hàng, giữ trọn năm chiếc container.',
      Art: () => (
        <Panel>
          <Yard who="kieu" />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'transfer',
      caption: 'Tiêu Đất Đỏ được chi trả đúng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Nhưng người tiếp tay bạn chỉ ra có ngoại phạm vững. Hồ sơ hình sự bị trả về, An Tín không đòi lại được đồng nào.',
      Art: () => (
        <Panel>
          <File stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" color="#8f7aa3" />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'file',
      caption: 'Bạn từ chối hồ sơ vì cho rằng ông Tài dựng vụ cướp để né hợp đồng lỗ.',
      Art: () => (
        <Panel>
          <File stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: CHỦ HÀNG DÀN DỰNG" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Ông Tài kiện An Tín, mang theo sổ cấp chì, ảnh đêm 2/11 và sao kê tài khoản của mình. An Tín thua, chi đủ 3,04 tỷ kèm án phí.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['tai']} mood="stern" dock={false} />
        </Panel>
      ),
    },
    {
      id: 'kieu',
      caption: 'Còn bà Kiều đã trả xong nợ ngân hàng, giữ trọn năm chiếc container. Bạn bị rút khỏi vụ.',
      Art: () => (
        <Panel>
          <Yard who="kieu" />
        </Panel>
      ),
    },
  ],
}
