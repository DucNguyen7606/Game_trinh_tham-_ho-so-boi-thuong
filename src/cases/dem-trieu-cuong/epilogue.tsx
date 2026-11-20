// Illustrated epilogue shown on the ending card and in the outro: one small
// diorama per person's fate, in the block style of the rest of Chapter 6.
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Boxing, Court, Desk as FileDesk, Panel, Plot, Transfer as Paid, cardboard, useSpec } from '@/art/iso/epilogueKit'
import { Boat, Building, Water } from '@/art/iso/street'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

/** A phone shop front: sign, glass counter, cartons. `sale` turns it into the clearance shop in Quận 10. */
function PhoneShop({ who, mood, also, sale = false }: { who?: string; mood?: 'smile' | 'neutral' | 'worried'; also?: string; sale?: boolean }) {
  const spec = useSpec(who ?? 'le', mood)
  const spec2 = useSpec(also ?? 'le', 'smile')
  return (
    <Plot label={sale ? 'Tiệm xả kho ở Quận 10' : 'Tiệm điện thoại Mỹ Lệ'} floor="#d6cbbd" sky={sale ? ['#f3c9c0', '#f7e3d6'] : ['#c9c3e6', '#f6dccb']}>
      <Box at={[0, 0, 0]} size={[300, 50, 140]} color={sale ? '#e9d6b4' : '#e6dbe8'} />
      <Box at={[20, 50, 100]} size={[240, 4, 30]} color={sale ? '#d6453a' : '#3f5a78'} />
      <WallText at={[140, 54.5, 108]} plane="R" text={sale ? 'XẢ KHO · GIẢM 15%' : 'ĐIỆN THOẠI MỸ LỆ'} size={17} color={sale ? '#fff' : iso.gold} />
      <Face points={[[30, 50.5, 0], [250, 50.5, 0], [250, 50.5, 90], [30, 50.5, 90]]} fill="#bcd4e0" />
      {/* glass counter with phones */}
      <Box at={[40, 80, 0]} size={[150, 40, 50]} color="#dfe8ee" top="#eef5f8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} at={[50 + i * 28, 88, 50]} size={[12, 20, 2]} color={iso.ink} />
      ))}
      {/* stacked cartons */}
      {[[210, 70], [242, 70], [210, 102], [226, 86]].map(([x, y], i) => (
        <Box key={i} at={[x, y, i === 3 ? 44 : 0]} size={[30, 30, 22 + (i === 3 ? 0 : 22)]} color={cardboard} />
      ))}
      {sale && (
        <>
          {[0, 1, 2].map((i) => (
            <Box key={i} at={[60 + i * 50, 150, 0]} size={[40, 30, 24 + i * 10]} color={cardboard} />
          ))}
          <Box at={[60, 150, 54]} size={[30, 2, 16]} color="#fffaf0" />
          <WallText at={[75, 152.5, 58]} plane="R" text="MỸ LỆ" size={8} color="#d6453a" />
        </>
      )}
      {who && spec && <IsoFigure at={[120, 160, 0]} spec={spec} facing="y" />}
      {also && spec2 && <IsoFigure at={[170, 150, 0]} spec={spec2} facing="y" />}
      {also && <Box at={[150, 180, 50]} size={[10, 4, 6]} color={iso.gold} />}
    </Plot>
  )
}

/** Bến Bình Đông at night: the café hut, the moored boat, someone on the pier. */
function Pier({ who, mood, place = 'cafe' }: { who: string; mood?: 'smile' | 'neutral' | 'stern'; place?: 'cafe' | 'boat' | 'leave' }) {
  const spec = useSpec(who, mood)
  return (
    <Plot label="Bến Bình Đông" floor="#86a4b2" sky={['#b8b6dc', '#ead0cc']}>
      <Water at={[0, 0]} w={300} d={260} color="#86a4b2" z={0.3} />
      <Building at={[0, 0, 0]} size={[90, 30, 110]} color="#e2a37a" seed={3} lit={0.6} />
      <Building at={[96, 0, 0]} size={[70, 30, 80]} color="#e9d6b4" seed={5} lit={0.6} />
      {/* the jetty */}
      <Box at={[180, 40, 0]} size={[120, 220, 14]} color="#b9875d" />
      {/* the café hut */}
      <Box at={[200, 50, 14]} size={[80, 60, 80]} color="#b98a63" />
      <Box at={[194, 44, 94]} size={[92, 72, 8]} color="#c94a3a" />
      <Face points={[[210, 110.5, 30], [270, 110.5, 30], [270, 110.5, 70], [210, 110.5, 70]]} fill="#ffe1a0" />
      <WallText at={[240, 110.8, 78]} plane="R" text="CÀ PHÊ BÔNG" size={9} />
      {/* plastic stools and a low table */}
      <Box at={[210, 150, 14]} size={[30, 30, 20]} color="#7a9fb0" />
      <Cyl at={[256, 140, 14]} r={9} len={16} axis="z" color={iso.coral} />
      <Cyl at={[256, 196, 14]} r={9} len={16} axis="z" color={iso.coral} />
      <Box at={[218, 158, 34]} size={[8, 8, 6]} color="#7b5236" />
      {/* Tư's boat at its usual mooring, fuel cans full */}
      <Boat at={[40, 60, 0]} len={190} w={80} />
      {place === 'boat' && (
        <>
          <Box at={[100, 160, 40]} size={[14, 12, 22]} color="#d6453a" />
          <Box at={[100, 176, 40]} size={[14, 12, 22]} color="#d6453a" />
        </>
      )}
      {spec && place === 'cafe' && <IsoFigure at={[230, 170, 14]} spec={spec} facing="y" />}
      {spec && place === 'boat' && <IsoFigure at={[60, 150, 40]} spec={spec} facing="y" pose="sit" />}
      {spec && place === 'leave' && (
        <>
          <IsoFigure at={[220, 200, 14]} spec={spec} facing="y" />
          <Box at={[214, 196, 50]} size={[10, 24, 30]} color={iso.blue} />
        </>
      )}
    </Plot>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Võ Đình Khải và Lê Văn Tư bị đưa ra xét xử về tội trộm cắp tài sản. Chiếc ghe SG-4417 bị tạm giữ.',
      Art: () => (
        <Panel>
          <Court accused="khai" also="tu" />
        </Panel>
      ),
    },
    {
      id: 'le',
      caption: 'Bà Lệ nhận 1,8 tỷ cho phần hàng ngập và lấy lại hơn 600 máy từ tiệm Gia Hưng. Đơn Tết vẫn giao kịp.',
      Art: () => (
        <Panel>
          <PhoneShop who="le" mood="smile" />
        </Panel>
      ),
    },
    {
      id: 'nhat',
      caption: 'Nhật xuống kho phụ mẹ kiểm hàng. Bà Lệ giao cho anh giữ bộ chìa thứ hai, kèm điều kiện bỏ cá độ.',
      Art: () => (
        <Panel>
          <PhoneShop who="nhat" mood="neutral" also="le" />
        </Panel>
      ),
    },
    {
      id: 'bong',
      caption: 'Chị Bông vẫn bán cà phê đầu bến. Đêm triều cường nào chị cũng thức, và giờ cả bến biết chị nhớ tiếng máy từng chiếc ghe.',
      Art: () => (
        <Panel>
          <Pier who="bong" mood="smile" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1411 đóng lại. An Tín chi đúng phần thiệt hại do nước, phần còn lại chuyển cơ quan điều tra.',
      Art: () => (
        <Panel>
          <FileDesk file="1411" stamp="CHI TRẢ 1,8 TỶ" sub="PHẦN CÒN LẠI: CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Bà Lệ nhận đúng 1,8 tỷ cho phần hàng ngập. Khải bị khởi tố.',
      Art: () => (
        <Panel>
          <FileDesk file="1411" stamp="CHI TRẢ 1,8 TỶ" sub="KHỞI TỐ: VÕ ĐÌNH KHẢI" />
        </Panel>
      ),
    },
    {
      id: 'tu',
      caption: 'Ở Bến Bình Đông, Tư ghe vẫn neo chỗ cũ, bình dầu lúc nào cũng đầy, chờ đêm nước lớn kế tiếp.',
      Art: () => (
        <Panel>
          <Pier who="tu" mood="neutral" place="boat" />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Người bạn chỉ ra có ngoại phạm vững. Hồ sơ hình sự bị trả về.',
      Art: () => (
        <Panel>
          <FileDesk file="1411" stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Máy tem MỸ LỆ được bán hết ở Quận 10 trước Tết. Không ai tìm lại được.',
      Art: () => (
        <Panel>
          <PhoneShop sale />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Bà Lệ kiện An Tín ra tòa, mang theo tấm ảnh 23:58 và hóa đơn nhập hàng tháng 9. Công ty thua kiện.',
      Art: () => (
        <Panel>
          <Court accused="le" mood="angry" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ. Hồ sơ 1411 được giao cho người khác.',
      Art: () => (
        <Panel>
          <Boxing />
        </Panel>
      ),
    },
    {
      id: 'khai',
      caption: 'Khải xin nghỉ việc êm thấm, nói muốn về quê mở tiệm điện thoại.',
      Art: () => (
        <Panel>
          <Pier who="khai" mood="smile" place="leave" />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 4,5 tỷ đồng cho bà Trần Thị Mỹ Lệ.',
      Art: () => (
        <Panel>
          <Paid amount="4.500.000.000 đ" to="Trần Thị Mỹ Lệ" note="Boi thuong HS 1411" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Cùng lúc đó, 900 máy "bị nước cuốn" được bán xả kho ở Quận 10, cách tiệm bà Lệ hai dãy phố.',
      Art: () => (
        <Panel>
          <PhoneShop sale />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi 2,7 tỷ cho hàng chưa từng chạm nước.',
      Art: () => (
        <Panel>
          <FileDesk file="1411" stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 1411" />
        </Panel>
      ),
    },
  ],
}
