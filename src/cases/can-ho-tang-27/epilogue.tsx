// Illustrated epilogue shown on the ending card: one small diorama per person's
// fate, in the same block style as the rest of the chapter.
import type { Mood } from '@/art/Portrait'
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Book, Cup, Desk } from '@/art/iso/props'
import { Label, Lockers, Plant, RingLight, SafeX, Sofa, Wardrobe, WindowR } from '@/art/iso/props-ch9-12'
import { ClaimFile, Court, EpiPanel, MiniRoom, Reprimand, ScreenCard, Transfer, useSpec } from '@/art/iso/endings-ch9-12'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

/** Ngọc live again in her bedroom. `turned`: the safe now faces away from the camera; `open`: she opens it on air again; `viral`: her "insurer won't pay" clip. */
function LiveRoom({ mood, open = false, turned = false, viral = false }: { mood: Mood; open?: boolean; turned?: boolean; viral?: boolean }) {
  const spec = useSpec('ngoc', mood)
  return (
    <MiniRoom
      label="Phòng livestream của chị Ngọc"
      floor="#d9bfa3"
      left="#e6d8e6"
      right="#efe2ea"
      overlay={
        viral ? (
          <ScreenCard lines={[{ text: 'LIVE · 2.000.000 xem' }, { text: '"Bảo hiểm quỵt tiền!"', color: '#ffd2c8' }]} />
        ) : (
          <ScreenCard lines={[{ text: open ? 'LIVE · 3.400 xem' : 'LIVE · 1.900 xem' }, { text: open ? 'mở két cho cả nhà xem nè' : 'két quay vô tường rồi nha', color: '#ffd2c8' }]} />
        )
      }
    >
      <WindowR x={150} z={45} w={100} h={60} view="river" />
      {/* the cupboard with the safe: its door towards the camera, or turned to the wall */}
      <Wardrobe at={[10, 60, 0]} w={44} d={110} h={115} color="#c9a27e" />
      {!turned && <SafeX x0={54} y={88} z={14} w={50} h={44} screen={open ? '' : undefined} />}
      {turned && <Box at={[54, 92, 0]} size={[6, 50, 50]} color="#55506b" />}
      {/* Ngọc showing a watch to the phone on the ring light */}
      {spec && <IsoFigure at={[110, 140, 0]} spec={spec} facing="y" talking />}
      <Cyl at={[146, 160, 52]} r={6} len={3} axis="y" color={iso.gold} cap="#fff6e2" />
      <RingLight at={[150, 225, 0]} h={50} />
      <Plant at={[240, 220, 0]} h={30} />
    </MiniRoom>
  )
}

/** Chị Hai tidying the living room in the morning, the river behind the glass. */
function Cleaning() {
  const hai = useSpec('hai', 'smile')
  return (
    <MiniRoom label="Chị Hai dọn nhà buổi sáng" floor="#e4d2bf" left="#eae0d6" right="#cfe0ea" sky={['#f8d4a8', '#f7e3d6']}>
      <WindowR x={20} z={0} w={240} h={120} view="river" frame="#e9eef2" />
      <Sofa at={[20, 120, 0]} len={110} color="#7e9cb5" />
      <Box at={[110, 150, 0]} size={[60, 50, 26]} color="#a07c5a" />
      <Cup at={[130, 170, 26]} fill="#c99a52" />
      {hai && <IsoFigure at={[190, 120, 0]} spec={hai} facing="y" />}
      {/* a mop leaning against her, a bucket at her feet */}
      <Box at={[222, 140, 0]} size={[3, 3, 90]} color={iso.wood} />
      <Box at={[214, 132, 0]} size={[20, 20, 4]} color={iso.sky} />
      <Cyl at={[230, 180, 0]} r={12} len={18} axis="z" color={iso.blue} cap="#9fc2d6" />
    </MiniRoom>
  )
}

/** Basement B2: the night desk. Sang keeping the new card log, or Vũ on shift with a livestream on his phone. */
function Basement({ who }: { who: 'sang' | 'vu' }) {
  const spec = useSpec(who, who === 'vu' ? 'smile' : 'neutral')
  return (
    <MiniRoom label="Phòng kỹ thuật hầm B2" floor="#bfc0c6" left="#c7cbd6" right="#d3d6de" edge="#8d8fa8" sky={['#bfc6dc', '#e9d6cc']}>
      <Cyl at={[4, 0, 100]} r={6} len={250} axis="y" color="#7e9cb5" />
      <Cyl at={[4, 0, 84]} r={5} len={250} axis="y" color={iso.coral} />
      <Lockers at={[150, 4, 0]} n={3} w={34} h={100} names={['SANG', 'VŨ', 'TÂM']} />
      {spec && <IsoFigure at={[66, 52, 0]} spec={spec} facing="y" pose="sit" />}
      <Desk at={[40, 90, 0]} w={90} d={70} />
      {who === 'sang' ? (
        <>
          <Book at={[56, 110, 74]} color="#3f6f8a" />
          <Box at={[100, 100, 74]} size={[22, 26, 12]} color="#ffffff" />
          <Label at={[111, 126.4, 80]} plane="R" text="SỔ THẺ" size={4.5} anchor="middle" />
        </>
      ) : (
        <>
          <Box at={[70, 120, 74]} size={[3, 10, 16]} color={iso.ink} />
          <Box at={[70.5, 121, 76]} size={[3, 8, 12]} color="#e0245e" />
        </>
      )}
    </MiniRoom>
  )
}

/** The second-hand watch shop on Lê Văn Sỹ: the Rolex in the window, sold to a stranger. */
function WatchShop() {
  const buyer = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'sky', age: 'mid', mood: 'smile' } as const
  return (
    <MiniRoom label="Tiệm đồng hồ cũ trên đường Lê Văn Sỹ" floor="#d8c2ad" left="#2f4258" right="#e2d6c6" edge="#1f2c3a" sky={['#c8bfe0', '#f2d6c6']}>
      <Face points={[[0.5, 40, 90], [0.5, 210, 90], [0.5, 210, 115], [0.5, 40, 115]]} fill="#f2c46d" />
      <WallText at={[1, 125, 98]} plane="L" text="ĐỒNG HỒ CŨ · THU MUA" size={15} color={iso.ink} />
      {/* glass counter with watches */}
      <Box at={[60, 80, 0]} size={[150, 50, 46]} color="#b8927a" />
      <Box at={[60, 80, 46]} size={[150, 50, 2]} color="#dfe9ee" />
      {[80, 110, 140, 170].map((x, i) => (
        <Cyl key={x} at={[x, 104, 48]} r={7} len={2} axis="z" color={i === 2 ? iso.gold : '#c9ced8'} cap="#fffaf0" />
      ))}
      {/* the buyer hands over cash for the Rolex */}
      <IsoFigure at={[120, 160, 0]} spec={buyer} facing="-y" />
      <Box at={[140, 140, 48]} size={[16, 8, 3]} color="#7fae8a" />
    </MiniRoom>
  )
}

/** Ngọc at the complaints desk of the insurance regulator, papers in hand. */
function Complaint() {
  const ngoc = useSpec('ngoc', 'angry')
  const clerk = { skin: 0, hair: 'bun', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'mid', mood: 'neutral' } as const
  return (
    <MiniRoom label="Quầy tiếp nhận khiếu nại" floor="#e2d3c6" left="#cfd8e6" right="#e2e6ee">
      <Face points={[[60, 0.5, 86], [230, 0.5, 86], [230, 0.5, 112], [60, 0.5, 112]]} fill={iso.blue} />
      <WallText at={[145, 1, 94]} plane="R" text="TIẾP NHẬN KHIẾU NẠI BẢO HIỂM" size={12} />
      <IsoFigure at={[130, 30, 0]} spec={clerk} facing="y" pose="sit" />
      <Box at={[80, 66, 0]} size={[140, 34, 50]} color="#b8927a" />
      <Box at={[110, 72, 50]} size={[26, 20, 2]} color={iso.cream} />
      <Box at={[150, 70, 50]} size={[30, 22, 18]} color={iso.ink} />
      {ngoc && <IsoFigure at={[120, 140, 0]} spec={ngoc} facing="-y" talking />}
    </MiniRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Trịnh Hoàng Vũ bị đưa ra xét xử về tội trộm cắp tài sản. Chiếc Patek và bộ kim cương được tìm thấy trong tủ đồ ở phòng trọ của anh.',
      Art: () => (
        <EpiPanel>
          <Court who="vu" mood="worried" />
        </EpiPanel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Chị Ngọc nhận đủ 3,2 tỷ, trả xong nợ ngân hàng. Giờ chị livestream với két quay lưng về phía ống kính.',
      Art: () => (
        <EpiPanel>
          <LiveRoom mood="smile" turned />
        </EpiPanel>
      ),
    },
    {
      id: 'hai',
      caption: 'Chị Hai vẫn lên dọn mỗi sáng. Lần nào có thợ tới sửa đồ, chị đứng ngay cạnh tới khi xong.',
      Art: () => (
        <EpiPanel>
          <Cleaning />
        </EpiPanel>
      ),
    },
    {
      id: 'sang',
      caption: 'Riverlight thu hồi toàn bộ thẻ kỹ thuật, rà lại khóa của từng căn hộ. Ông Sang được giao giữ sổ phát thẻ ca đêm.',
      Art: () => (
        <EpiPanel>
          <Basement who="sang" />
        </EpiPanel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 2112 đóng lại. An Tín chi trả đủ, rồi thay chị Ngọc đòi lại tiền từ kẻ trộm.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="2112" stamp="CHI TRẢ 3,2 TỶ" sub="THẾ QUYỀN: TRỊNH HOÀNG VŨ" color="#3f8a7e" />
        </EpiPanel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Chị Ngọc được chi trả, Vũ bị khởi tố.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="2112" stamp="CHI TRẢ 3,2 TỶ" sub="KHỞI TỐ: TRỊNH HOÀNG VŨ" color="#3f8a7e" />
        </EpiPanel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Không ai nói cho chị Ngọc biết mã két đã lọt ra từ đâu. Tối hôm sau, chị lại mở két ngay trước ống kính.',
      Art: () => (
        <EpiPanel>
          <LiveRoom mood="smile" open />
        </EpiPanel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Người bạn chỉ ra có ngoại phạm vững. Hồ sơ hình sự bị trả về.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="2112" stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </EpiPanel>
      ),
    },
    {
      id: 'vu',
      caption: 'Dưới hầm B2, Vũ vẫn trực ca đêm, điện thoại mở livestream. Đến Tết, chiếc Patek được rao bán trong một nhóm đồng hồ cũ.',
      Art: () => (
        <EpiPanel>
          <Basement who="vu" />
        </EpiPanel>
      ),
    },
  ],
  cut: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 1,6 tỷ, trừ một nửa vì chị Ngọc để lộ mã két.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="1.600.000.000 đ" to="Lâm Bảo Ngọc" note="ND: Boi thuong HS 2112 (50%)" />
        </EpiPanel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Chị Ngọc khiếu nại lên Cục Quản lý bảo hiểm. Hợp đồng không có điều khoản nào như vậy, An Tín phải chi đủ kèm lãi chậm trả.',
      Art: () => (
        <EpiPanel>
          <Complaint />
        </EpiPanel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì tự đặt ra một điều khoản không có trong hợp đồng.',
      Art: () => (
        <EpiPanel>
          <Reprimand title="BIÊN BẢN" line="PHÊ BÌNH" boxed={false} />
        </EpiPanel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Chị Ngọc kiện An Tín ra tòa, mang theo vé máy bay, nhật ký khóa cửa và hóa đơn đồng hồ. Công ty thua kiện.',
      Art: () => (
        <EpiPanel>
          <Court who="ngoc" mood="angry" dock={false} />
        </EpiPanel>
      ),
    },
    {
      id: 'live',
      caption: 'Clip "bảo hiểm quỵt tiền" của chị đạt hai triệu lượt xem.',
      Art: () => (
        <EpiPanel>
          <LiveRoom mood="stern" viral />
        </EpiPanel>
      ),
    },
    {
      id: 'shop',
      caption: 'Ở Lê Văn Sỹ, chiếc Rolex số máy 7Y3K2109 được bán lại cho một khách lạ. Kẻ trộm thật chưa bao giờ bị hỏi tới.',
      Art: () => (
        <EpiPanel>
          <WatchShop />
        </EpiPanel>
      ),
    },
  ],
}
