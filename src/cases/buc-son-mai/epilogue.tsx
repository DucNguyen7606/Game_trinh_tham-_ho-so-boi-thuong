// Illustrated epilogue shown on the ending card: one small diorama per person's fate.
import { Box, Face, OnPlane, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { EpiBoxing, EpiCourt, EpiDesk, EpiPanel as Panel, EpiRoom, EpiTransfer, FONT, Plant, useCaseSpec } from '@/art/iso/kit'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'
import { LotusPainting } from './scenes'

const Transfer = () => <EpiTransfer amount="8.000.000.000 đ" to="Đoàn Ngọc Diệp" note="Chi tra HD AT-MT-0310" />
const File = ({ stamp, sub, color }: { stamp: string; sub: string; color?: string }) => <EpiDesk file="1120" stamp={stamp} sub={sub} color={color} />

/** The painting hung on the right wall (plane y = 0) of a small room, centred on x. */
function HungPainting({ x, z, w = 90 }: { x: number; z: number; w?: number }) {
  const h = w * 0.8
  return (
    <g>
      <Box at={[x - w / 2 - 5, 0, z - 5]} size={[w + 10, 4, h + 10]} color="#5a2f22" />
      <OnPlane at={[x - w / 2, 4.2, z + h]} plane="R">
        <LotusPainting w={w} />
      </OnPlane>
    </g>
  )
}

/** The gallery with the real painting back in its place, someone standing beside it. */
function Gallery({ who, mood }: { who: string; mood: 'smile' | 'neutral' | 'stern' }) {
  const spec = useCaseSpec(who, mood)
  return (
    <EpiRoom label="Diệp Gallery" left="#f3eee6" right="#f8f3eb" edge="#c8bcd8" floor="#d9c3a8">
      <HungPainting x={150} z={28} w={116} />
      <Box at={[100, 4, 20]} size={[100, 3, 2]} color={iso.ink} />
      <Face points={[[0.5, 60, 50], [0.5, 120, 50], [0.5, 120, 100], [0.5, 60, 100]]} fill="#7fae8a" />
      <Box at={[110, 60, 0]} size={[90, 30, 22]} color="#a3714b" />
      {spec && <IsoFigure at={[60, 120, 0]} spec={spec} facing="y" />}
      <Plant at={[230, 200]} />
    </EpiRoom>
  )
}

/** The gallery shut, a notice on the shutter. */
function Closed() {
  return (
    <EpiRoom label="Diệp Gallery tạm đóng cửa" right="#cfc5dc" edge="#8f7aa3" floor="#bdb5c8" sky={['#b8b4dc', '#eec6bf']} h={140}>
      <Face points={[[30, 0.5, 0], [240, 0.5, 0], [240, 0.5, 110], [30, 0.5, 110]]} fill="#9aa4b4" />
      {Array.from({ length: 8 }, (_, i) => (
        <Face key={i} points={[[30, 0.8, 8 + i * 13], [240, 0.8, 8 + i * 13], [240, 0.8, 10 + i * 13], [30, 0.8, 10 + i * 13]]} fill="#7f889a" />
      ))}
      <Box at={[60, 0, 112]} size={[150, 6, 24]} color="#f6efe3" />
      <WallText at={[135, 6.6, 118]} plane="R" text="DIỆP GALLERY" size={20} color={iso.ink} />
      <Face points={[[100, 1, 40], [170, 1, 40], [170, 1, 72], [100, 1, 72]]} fill="#fffaf0" />
      <WallText at={[135, 1.2, 52]} plane="R" text="TẠM NGỪNG" size={16} color="#d6453a" />
      <Plant at={[240, 60]} />
    </EpiRoom>
  )
}

/** Quân back at work in his workshop, a new MDF board ready. */
function Workshop() {
  const spec = useCaseSpec('quan', 'neutral')
  return (
    <EpiRoom label="Xưởng sơn mài ở Bình Thạnh" left="#d7c9b4" right="#e3d6c2" edge="#8a6c58" floor="#bfa58a">
      <Face points={[[6, 60, 0], [6, 140, 0], [26, 140, 110], [26, 60, 110]]} fill="#c9a274" />
      <Box at={[90, 20, 0]} size={[140, 60, 60]} color="#8a6c58" />
      <Box at={[110, 30, 60]} size={[70, 40, 3]} color="#1d1513" />
      {spec && <IsoFigure at={[130, 110, 0]} spec={spec} facing="y" />}
      <Box at={[180, 180, 0]} size={[50, 30, 30]} color="#d9a86a" />
    </EpiRoom>
  )
}

/** A Hong Kong auction: the real painting on the stand, lot 27. */
function Auction() {
  return (
    <EpiRoom label="Phiên đấu giá Hồng Kông" left="#6c6787" right="#7d78a0" edge="#4b4760" floor="#c9a99a" sky={['#b8b4dc', '#eec6bf']}>
      <Box at={[60, 0, 104]} size={[150, 4, 20]} color="#b8372c" />
      <WallText at={[135, 4.4, 109]} plane="R" text="HONG KONG · LOT 27" size={14} color="#ffe7b8" />
      <HungPainting x={135} z={20} w={80} />
      <Box at={[70, 120, 0]} size={[34, 26, 50]} color="#a3714b" />
      {[0, 1, 2].map((r) => (
        <Box key={r} at={[150 + r * 30, 150, 0]} size={[22, 22, 24]} color="#d6453a" />
      ))}
      <OnPlane at={[60, 230, 2]} plane="top">
        <text x="0" y="0" fontSize="14" fontWeight="800" fill={iso.ink} fontFamily={FONT}>HK$ 3.400.000</text>
      </OnPlane>
    </EpiRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 8 tỷ đồng cho bà Diệp. Bức tranh gốc bà mua bảo hiểm đã bị trộm thật, trong đợt phục chế tháng 6.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Tô Minh Quân bị xét xử về tội lừa đảo chiếm đoạt tài sản. Trịnh Bảo Ngọc bị xử cùng vụ vì nhận 300 triệu để phi tang bản chép.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['quan', 'ngoc']} mood="worried" />
        </Panel>
      ),
    },
    {
      id: 'painting',
      caption: 'Bức "Thiếu nữ bên sen" thật được thu hồi từ nhà ông Hứa Vĩnh Thành. Bà Diệp hoàn lại 8 tỷ để chuộc nó về, treo đúng chỗ cũ.',
      Art: () => (
        <Panel>
          <Gallery who="diep" mood="smile" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1120 đóng lại. Tiền về đúng người bị mất tranh, còn hai người dựng chuyện phải ra tòa.',
      Art: () => (
        <Panel>
          <File stamp="CHI TRẢ BỒI THƯỜNG" sub="AN TÍN THẾ QUYỀN ĐÒI LẠI TRANH" color="#3f8a7e" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'transfer',
      caption: 'Bà Diệp được chi trả đúng, tranh thật được thu hồi, Quân bị khởi tố.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'ngoc',
      caption: 'Nhưng hồ sơ ghi sai người lẻn vào phòng tranh đêm 19/11. Ngọc vẫn ngồi bàn tiếp khách ở Diệp Gallery.',
      Art: () => (
        <Panel>
          <Gallery who="ngoc" mood="smile" />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'transfer',
      caption: 'Bà Diệp được chi trả đúng.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'quan',
      caption: 'Nhưng hồ sơ không chỉ ra ai đã tráo tranh. An Tín không đòi được bức thật. Ở Bình Thạnh, Quân nhận thêm một đơn "phục chế" tranh cổ, và mua sẵn một tấm MDF mới.',
      Art: () => (
        <Panel>
          <Workshop />
        </Panel>
      ),
    },
  ],
  fakeonly: [
    {
      id: 'file',
      caption: 'Bạn từ chối vì thứ bị lấy đêm 19/11 chỉ là bản chép.',
      Art: () => (
        <Panel>
          <File stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: TÀI SẢN BỊ MẤT LÀ TRANH GIẢ" />
        </Panel>
      ),
    },
    {
      id: 'court',
      caption: 'Luật sư của bà Diệp chỉ ra bức gốc đã bị tráo tháng 6, giữa thời hạn bảo hiểm, và hợp đồng bảo hiểm cả lúc tranh đi phục chế. An Tín thua, chi đủ 8 tỷ kèm án phí.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['diep']} mood="stern" dock={false} />
        </Panel>
      ),
    },
    {
      id: 'auction',
      caption: 'Không ai đứng ra đòi bức thật. Một năm sau, nó xuất hiện ở phiên đấu giá Hồng Kông.',
      Art: () => (
        <Panel>
          <Auction />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'diep',
      caption: 'Bạn tố bà Diệp tự dựng vụ trộm. Bà mang email đồng ý lấy mẫu sơn, tấm ảnh lúc 01:44 ở Thảo Điền và đôi giày cỡ 38 của mình ra tòa.',
      Art: () => (
        <Panel>
          <EpiCourt accused={['diep']} mood="stern" dock={false} />
        </Panel>
      ),
    },
    {
      id: 'closed',
      caption: 'An Tín thua kiện, chi đủ 8 tỷ kèm án phí. Tin đồn "bà chủ trộm tranh của mình" khiến Diệp Gallery phải tạm đóng cửa.',
      Art: () => (
        <Panel>
          <Closed />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Ngọc xin nghỉ việc êm thấm.',
      Art: () => (
        <Panel>
          <EpiBoxing />
        </Panel>
      ),
    },
  ],
}
