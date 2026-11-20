// Illustrated epilogue shown on the ending card and in the outro: one small
// diorama per person's fate, in the block style of the rest of Chapter 5.
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Boxing, ColdFile as Cold, Court, Desk as FileDesk, Panel, Plot, Room, Transfer as Paid, useSpec } from '@/art/iso/epilogueKit'
import { Car, Tree } from '@/art/iso/street'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

/** Khải in front of his hotel, a "for sale" banner across the front. */
function HotelForSale() {
  const spec = useSpec('khai', 'worried')
  return (
    <Plot label="Khách sạn Sông Xanh được rao bán" sky={['#c9c3e6', '#f1d8c8']}>
      <Box at={[10, 10, 0]} size={[200, 90, 150]} color="#e6d9c2" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <Face key={`${r}${c}`} points={[[20 + c * 38, 100.5, 30 + r * 40], [44 + c * 38, 100.5, 30 + r * 40], [44 + c * 38, 100.5, 56 + r * 40], [20 + c * 38, 100.5, 56 + r * 40]]} fill={(r + c) % 4 ? '#7d93b0' : '#ffe1a0'} />
        )),
      )}
      <Box at={[60, 100, 132]} size={[110, 3, 16]} color="#3f5a78" />
      <WallText at={[115, 103.4, 136]} plane="R" text="KHÁCH SẠN SÔNG XANH" size={11} color={iso.gold} />
      {/* the banner */}
      <Box at={[30, 101, 4]} size={[160, 2, 22]} color="#d6453a" />
      <WallText at={[110, 103.4, 9]} plane="R" text="CẦN BÁN GẤP" size={18} color="#fff" />
      <Box at={[210, 40, 0]} size={[8, 8, 70]} color={iso.ink} />
      <Box at={[218, 40, 0]} size={[60, 8, 50]} color="#9aa3b5" />
      <Tree at={[250, 60, 0]} h={120} r={30} />
      {spec && <IsoFigure at={[200, 170, 0]} spec={spec} facing="y" />}
    </Plot>
  )
}

/** Chị Hoa's bánh mì cart back on its corner at Tết, peach blossom beside it. */
function CartAgain() {
  const spec = useSpec('hoa', 'smile')
  return (
    <Plot label="Xe bánh mì chị Hoa mở lại" sky={['#f7c9a4', '#f7e3d6']} floor="#d6cbbd">
      <Box at={[0, 0, 0]} size={[300, 60, 120]} color="#e8d9c0" />
      <Face points={[[60, 60.5, 0], [140, 60.5, 0], [140, 60.5, 90], [60, 60.5, 90]]} fill="#d6b88f" />
      <Face points={[[180, 60.5, 40], [260, 60.5, 40], [260, 60.5, 100], [180, 60.5, 100]]} fill="#7d93b0" />
      {/* the cart */}
      <Box at={[60, 110, 0]} size={[110, 60, 18]} color={iso.ink} />
      <Box at={[60, 110, 18]} size={[110, 60, 56]} color="#fbf4e6" />
      <Face points={[[70, 170.5, 30], [160, 170.5, 30], [160, 170.5, 66], [70, 170.5, 66]]} fill="#f2d9a8" />
      <Box at={[56, 106, 74]} size={[118, 68, 16]} color="#c94a3a" />
      <WallText at={[115, 174.5, 78]} plane="R" text="BÁNH MÌ CHỊ HOA" size={11} />
      {[78, 104, 130].map((x) => (
        <Box key={x} at={[x, 130, 74]} size={[18, 8, 6]} color="#e9b46b" />
      ))}
      {spec && <IsoFigure at={[190, 130, 0]} spec={spec} facing="y" />}
      {/* peach blossom pot and red envelopes */}
      <Cyl at={[30, 210, 0]} r={16} len={24} axis="z" color="#c98a5c" />
      <Box at={[27, 207, 24]} size={[6, 6, 50]} color={iso.woodDark} />
      <Box at={[6, 186, 60]} size={[50, 50, 30]} color="#f4aaa3" />
      <Box at={[16, 196, 88]} size={[30, 30, 16]} color="#f7c3be" />
      <Box at={[42, 190, 70]} size={[6, 2, 10]} color="#d6453a" />
      <Box at={[10, 236.5, 66]} size={[6, 2, 10]} color="#d6453a" />
    </Plot>
  )
}

/** Chú Sơn leaves the guard post: the log book closed on the desk, his cap on top. */
function GuardLeaves() {
  const spec = useSpec('son', 'neutral')
  return (
    <Room label="Chú Sơn xin nghỉ việc" walls={['#e7dccb', '#ece0cf']} edge="#a99a8c" floor="#d6c6b6" sky={['#cfc3e0', '#f6d8c4']}>
      <Face points={[[40, 0.5, 40], [160, 0.5, 40], [160, 0.5, 100], [40, 0.5, 100]]} fill="#3c4a6a" />
      <WallText at={[100, 1, 106]} plane="R" text="KHÁCH SẠN SÔNG XANH" size={13} color={iso.mustard} />
      {/* desk with the closed log book and the cap */}
      <Box at={[120, 70, 0]} size={[110, 60, 50]} color="#9b7d6a" />
      <Box at={[140, 80, 50]} size={[40, 30, 6]} color="#c9b07a" />
      <Box at={[190, 86, 50]} size={[22, 22, 8]} color="#3f5a78" />
      <Box at={[186, 84, 50]} size={[30, 8, 2]} color="#2e4058" />
      {/* the resignation letter */}
      <Box at={[150, 116, 50]} size={[30, 22, 1]} color="#fffaf0" />
      {spec && <IsoFigure at={[70, 170, 0]} spec={{ ...spec, hair: 'short' }} facing="y" />}
      <Box at={[100, 196, 20]} size={[30, 14, 30]} color="#7d5c41" />
      <Cyl at={[30, 228, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[22, 220, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </Room>
  )
}

/** A new black SUV with a red bow, Khoa beside it. */
function NewCar() {
  const spec = useSpec('khoa', 'smile')
  return (
    <Plot label="Chiếc SUV mới thắt nơ đỏ" sky={['#c9c3e6', '#f6dccb']} floor="#c9c4cf">
      <Box at={[0, 0, 0]} size={[300, 40, 110]} color="#e4dbe8" />
      <Face points={[[30, 40.5, 20], [270, 40.5, 20], [270, 40.5, 100], [30, 40.5, 100]]} fill="#bcd4e0" />
      <Car at={[40, 90, 0]} color="#2f2c40" len={200} w={84} tall />
      <Box at={[120, 86, 84]} size={[40, 92, 6]} color="#d6453a" />
      <Box at={[128, 120, 90]} size={[24, 24, 14]} color="#e8574a" />
      {spec && <IsoFigure at={[220, 210, 0]} spec={spec} facing="y" />}
    </Plot>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'khoa',
      caption: 'Trần Minh Khoa bị đưa ra xét xử vì gây tai nạn rồi bỏ chạy, khi đang bị tước bằng lái. Cậu xin gặp chị Hoa để nói lời xin lỗi.',
      Art: () => (
        <Panel>
          <Court accused="khoa" />
        </Panel>
      ),
    },
    {
      id: 'khai',
      caption: 'Ông Khải bị khởi tố vì che giấu tội phạm và gian lận bảo hiểm. Khách sạn Sông Xanh được rao bán để lo viện phí và bồi thường cho chị Hoa.',
      Art: () => (
        <Panel>
          <HotelForSale />
        </Panel>
      ),
    },
    {
      id: 'hoa',
      caption: 'Chị Hoa ra viện sau năm tuần. Xe bánh mì ở góc Nguyễn Văn Hưởng mở lại vào mùa Tết.',
      Art: () => (
        <Panel>
          <CartAgain />
        </Panel>
      ),
    },
    {
      id: 'son',
      caption: 'Chú Sơn ký vào lời khai của mình và xin nghỉ việc. Chú nói không muốn xé thêm trang sổ nào nữa.',
      Art: () => (
        <Panel>
          <GuardLeaves />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0712 đóng lại. Công ty không chi 2,1 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
      Art: () => (
        <Panel>
          <FileDesk file="0712" stamp="TỪ CHỐI BỒI THƯỜNG" sub="CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Công ty từ chối chi trả vì xe bị cố ý đẩy xuống kênh. Ông Khải bị phạt vì gian lận bảo hiểm.',
      Art: () => (
        <Panel>
          <FileDesk file="0712" stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: CỐ Ý GÂY THIỆT HẠI" />
        </Panel>
      ),
    },
    {
      id: 'cold',
      caption: 'Vụ tông xe ở Nguyễn Văn Hưởng vẫn chưa ai bị gọi tên. Chị Hoa vay tiền lo viện phí.',
      Art: () => (
        <Panel>
          <Cold lines={['VỤ TÔNG XE BỎ CHẠY', 'NGUYỄN VĂN HƯỞNG · 06/12']} />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của ông Khải chỉ ra lập luận không có căn cứ. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <FileDesk file="0712" stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Sếp giao hồ sơ 0712 cho người khác.',
      Art: () => (
        <Panel>
          <Boxing />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 2,1 tỷ đồng cho ông Trần Quang Khải.',
      Art: () => (
        <Panel>
          <Paid amount="2.100.000.000 đ" to="Trần Quang Khải" note="Boi thuong HS 0712" />
        </Panel>
      ),
    },
    {
      id: 'car',
      caption: 'Ông mua cho con trai một chiếc SUV đen mới, thắt nơ đỏ. Khoa vẫn chưa có bằng lái.',
      Art: () => (
        <Panel>
          <NewCar />
        </Panel>
      ),
    },
    {
      id: 'cold',
      caption: 'Vụ tông xe bỏ chạy bị xếp vào hồ sơ tồn đọng. Khi sự thật lộ ra, bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <Cold lines={['VỤ TÔNG XE BỎ CHẠY', 'NGUYỄN VĂN HƯỞNG · 06/12']} />
        </Panel>
      ),
    },
  ],
}
