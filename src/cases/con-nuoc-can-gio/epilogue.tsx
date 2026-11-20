// Illustrated epilogue shown on the ending card: one small diorama per person's fate.
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { EpiBoxing, EpiCourt, EpiDesk, EpiPanel as Panel, EpiRoom, EpiTransfer, Plant, useCaseSpec } from '@/art/iso/kit'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const Transfer = () => <EpiTransfer amount="5.000.000.000 đ" to="Phạm Thị Hồng" note="Chi tra HD AT-NT-0512" />
const File = ({ stamp, sub, color }: { stamp: string; sub: string; color?: string }) => <EpiDesk file="0909" stamp={stamp} sub={sub} color={color} />

/** The landing at sunrise: someone standing on the jetty, the boat tied up behind. */
function Riverbank({ who }: { who: string }) {
  const spec = useCaseSpec(who, who === 'hong' ? 'worried' : 'stern')
  return (
    <EpiRoom label="Bến ghe lúc bình minh" sky={['#f8c98a', '#f7dccb']} floor="#bdb5ab">
      <Face points={[[0, 0, 0.3], [270, 0, 0.3], [270, 90, 0.3], [0, 90, 0.3]]} fill="#8fb8c9" />
      <Cyl at={[230, -10, 40]} r={22} len={2} axis="y" color="#ffd98f" cap="#ffe7b8" />
      <Box at={[30, 20, 0]} size={[150, 50, 18]} color="#3f6b6a" top="#6f5a48" />
      <Box at={[60, 26, 18]} size={[60, 38, 26]} color="#5d8ea3" />
      {[200, 240].map((x) => (
        <Box key={x} at={[x, 70, 0]} size={[4, 4, 110]} color="#d4bf8a" />
      ))}
      <Box at={[60, 110, 0]} size={[150, 60, 14]} color="#b98f6e" />
      {spec && <IsoFigure at={[118, 128, 14]} spec={spec} facing="y" />}
      <Plant at={[30, 220]} />
    </EpiRoom>
  )
}

/** Vinh's stall at Bình Điền market. */
function Market() {
  const spec = useCaseSpec('vinh', 'neutral')
  return (
    <EpiRoom label="Vựa số 14, chợ Bình Điền" left="#c6c3d8" right="#d6d2e4" sky={['#b8c3dd', '#dcd6ee']}>
      <Face points={[[60, 0.5, 80], [230, 0.5, 80], [230, 0.5, 112], [60, 0.5, 112]]} fill={iso.blue} />
      <WallText at={[145, 0.8, 90]} plane="R" text="VỰA SỐ 14" size={24} />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[150 + i * 30, 30, 0]} size={[26, 40, 22 + i * 4]} color="#3f8a7e" />
      ))}
      <Box at={[60, 120, 0]} size={[70, 60, 10]} color={iso.metal} />
      <Box at={[66, 126, 10]} size={[56, 48, 20]} color="#3f8a7e" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[72 + i * 12, 140, 30]} size={[8, 6, 3]} color="#ff8a5c" />
      ))}
      {spec && <IsoFigure at={[150, 150, 0]} spec={spec} facing="y" />}
    </EpiRoom>
  )
}

/** Tâm's son's heart ward, the player by the bed. */
function Hospital() {
  const spec = useCaseSpec('player', 'smile')
  const boy = { skin: 3, hair: 'buzz', hairColor: 'black', build: 'thin', outfit: 'shirt', outfitColor: 'sky', age: 'young', mood: 'smile' } as const
  return (
    <EpiRoom label="Khoa tim mạch" left="#cfe0d2" right="#dfeae0" edge="#8fae9c" floor="#eef1ec">
      <Face points={[[0.5, 40, 60], [0.5, 140, 60], [0.5, 140, 110], [0.5, 40, 110]]} fill="#bfdbe6" />
      <Face points={[[60, 0.5, 92], [210, 0.5, 92], [210, 0.5, 112], [60, 0.5, 112]]} fill={iso.blue} />
      <WallText at={[135, 0.8, 97]} plane="R" text="KHOA TIM MẠCH" size={18} />
      <Box at={[120, 20, 0]} size={[90, 120, 40]} color="#d6dde6" top="#fffaf0" />
      <Box at={[124, 22, 40]} size={[82, 30, 8]} color="#fffaf0" />
      <IsoFigure at={[150, 36, 18]} spec={boy} facing="y" pose="sit" />
      <Box at={[124, 70, 40]} size={[82, 66, 6]} color="#a9c8d4" />
      <Box at={[230, 30, 0]} size={[4, 4, 100]} color={iso.metal} />
      <Box at={[224, 24, 90]} size={[16, 16, 20]} color="#cfe6f2" />
      {spec && <IsoFigure at={[80, 120, 0]} spec={spec} facing="x" />}
    </EpiRoom>
  )
}

/** The gold found in a styrofoam box in Quận 8. */
function Gold() {
  return (
    <EpiRoom label="Thùng xốp đựng vàng" left="#c9c3d9" right="#d9d3e6" sky={['#cfc8ea', '#f6dccb']}>
      <WallText at={[135, 0.8, 90]} plane="R" text="QUẬN 8" size={22} color={iso.ink} />
      <Box at={[70, 70, 0]} size={[120, 90, 50]} color="#f6efe3" />
      <Box at={[78, 78, 50]} size={[104, 74, 1]} color="#e9e1d4" />
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} at={[86 + (i % 3) * 32, 84 + Math.floor(i / 3) * 22, 51]} size={[26, 16, 5]} color={iso.gold} />
      ))}
      <Box at={[200, 150, 0]} size={[50, 30, 6]} color="#f6efe3" />
    </EpiRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 5 tỷ đồng cho bà Phạm Thị Hồng. Ông Lực đã chết thật, và người thụ hưởng không biết gì về kế hoạch của chồng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Nguyễn Văn Tâm bị đưa ra xét xử về tội giết người và cướp tài sản. Ông nhận tội ngay phiên đầu.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['tam']} mood="worried" />
        </Panel>
      ),
    },
    {
      id: 'gold',
      caption: '27 lượng vàng được tìm thấy trong thùng xốp ở nhà em gái ông Tâm. Tiền được chia trả cho Khang và Vinh.',
      Art: () => (
        <Panel>
          <Gold />
        </Panel>
      ),
    },
    {
      id: 'vinh',
      caption: 'Vinh lấy lại được phần lớn tiền cọc. Anh không còn nhắc chuyện mua vựa.',
      Art: () => (
        <Panel>
          <Market />
        </Panel>
      ),
    },
    {
      id: 'hong',
      caption: 'Bà Hồng trả hết nợ cho vựa, giữ lại chiếc ghe. Sáng nào bà cũng ra bến, nơi chồng bà xuống ghe lần cuối.',
      Art: () => (
        <Panel>
          <Riverbank who="hong" />
        </Panel>
      ),
    },
    {
      id: 'son',
      caption: 'Con trai ông Tâm vẫn được mổ tim nhờ một quỹ từ thiện. Bạn là người gửi hồ sơ cho quỹ.',
      Art: () => (
        <Panel>
          <Hospital />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0909 đóng lại. Kế hoạch giả chết là của ông Lực, cái chết là thật, và tiền về đúng người thụ hưởng ngay tình.',
      Art: () => (
        <Panel>
          <File stamp="CHI TRẢ BỒI THƯỜNG" sub="CHUYỂN HỒ SƠ ÁN MẠNG CHO CÔNG AN" color="#3f8a7e" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'transfer',
      caption: 'Bà Hồng nhận đủ 5 tỷ, Tâm bị bắt.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'tam',
      caption: 'Nhưng hồ sơ ghi sai người bày vụ chìm ghe. Luật sư của Tâm nói thân chủ chỉ là người làm thuê bị ép, và bản án nhẹ đi nhiều.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['tam']} mood="stern" />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'transfer',
      caption: 'Bà Hồng được chi trả đúng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'tam',
      caption: 'Nhưng người bạn chỉ ra là kẻ giết ông Lực có ngoại phạm vững, hồ sơ hình sự bị trả về. Sáu Tâm vẫn lái ghe ở Long Hòa. Mỗi tháng ông lên thành phố một lần, mang theo một thùng xốp.',
      Art: () => (
        <Panel>
          <Riverbank who="tam" />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'file',
      caption: 'Bạn từ chối hồ sơ vì ông Lực định giả chết để trục lợi.',
      Art: () => (
        <Panel>
          <File stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: GIẢ CHẾT TRỤC LỢI" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Bà Hồng kiện An Tín. Luật sư của bà chỉ đọc Điều 9: ông Lực không tự tử, và người thụ hưởng không gây ra cái chết. An Tín thua, chi đủ 5 tỷ kèm lãi chậm trả và án phí.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['hong']} mood="worried" dock={false} />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Sếp giao hồ sơ 0909 cho người khác.',
      Art: () => (
        <Panel>
          <EpiBoxing />
        </Panel>
      ),
    },
  ],
}
