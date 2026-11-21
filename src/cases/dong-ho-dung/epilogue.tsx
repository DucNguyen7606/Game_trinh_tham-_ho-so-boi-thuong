// Illustrated epilogue shown on the ending card: one small diorama per person's
// fate, in the same block style as the rest of the chapter.
import type { Mood } from '@/art/Portrait'
import { Box, Cyl, Face, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Bed, Label, PanelR, Scooter } from '@/art/iso/props-ch9-12'
import { ClaimFile, Court, EpiPanel, MiniGround, MiniRoom, Reprimand, Transfer, useSpec } from '@/art/iso/endings-ch9-12'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const LIM = '#7a3f2a'
const BRASS = '#d9b04f'

/** The study upstairs: Châu beside her father's unfinished elevation, framed on the wall. */
function Study({ mood }: { mood: Mood }) {
  const chau = useSpec('chau', mood)
  return (
    <MiniRoom label="Phòng làm việc của ông Hiển" floor="#c9a27e" left="#ece0cc" right="#e6d8c2" edge="#a07c5a">
      {/* the framed drawing, its last pencil line running off the edge */}
      <PanelR y0={0.6} x={60} z={40} w={120} h={70} fill={LIM} />
      <PanelR y0={0.9} x={66} z={46} w={108} h={58} fill="#f6efe3" />
      <Face points={[[80, 1.2, 60], [140, 1.2, 90], [142, 1.2, 90], [82, 1.2, 60]]} fill="#6c6787" />
      <Face points={[[120, 1.2, 80], [170, 1.2, 50], [171, 1.2, 51], [121, 1.2, 81]]} fill={iso.ink} />
      {/* the drafting table, empty now, and the armchair */}
      <Box at={[40, 60, 0]} size={[4, 4, 60]} color={LIM} />
      <Box at={[110, 60, 0]} size={[4, 4, 60]} color={LIM} />
      <Face points={[[36, 56, 74], [118, 56, 74], [118, 100, 58], [36, 100, 58]]} fill="#f6efe3" />
      <Box at={[50, 120, 0]} size={[56, 50, 28]} color="#7d4a37" />
      <Box at={[50, 160, 28]} size={[56, 10, 40]} color="#7d4a37" />
      <Bed at={[0, 250, 0]} w={110} d={80} cover="#cfc4e6" frame={LIM} />
      {chau && <IsoFigure at={[170, 130, 0]} spec={chau} facing="y" />}
    </MiniRoom>
  )
}

/** The Seiko on a white cloth, its crown pushed back in, ticking again. */
function WatchBack() {
  return (
    <MiniGround label="Chiếc Seiko được trả lại" floor="#e9e2f0" sky={['#d9d2ee', '#f6dccb']} w={260} d={220}>
      <Box at={[40, 40, 0]} size={[180, 140, 30]} color={LIM} />
      <Box at={[60, 60, 30]} size={[140, 100, 1]} color="#fffaf0" />
      {/* the strap */}
      <Box at={[70, 104, 31]} size={[120, 14, 2]} color="#5a3a24" />
      <Cyl at={[130, 111, 31]} r={26} len={6} axis="z" color={BRASS} cap="#f6efe3" />
      <Box at={[156, 108, 33]} size={[6, 6, 4]} color={BRASS} />
      {/* hands at a living time, not 22:47 */}
      <Face points={[[129, 110, 37.2], [131, 110, 37.2], [131, 92, 37.2], [129, 92, 37.2]]} fill={iso.ink} />
      <Face points={[[130, 110, 37.2], [130, 112, 37.2], [144, 118, 37.2], [144, 116, 37.2]]} fill={iso.ink} />
      <Face points={[[130, 111, 37.3], [131, 111, 37.3], [116, 96, 37.3], [115, 96, 37.3]]} fill={iso.coral} />
    </MiniGround>
  )
}

/** Mr Tư in the hall winding the grandfather clock, the staircase behind him. */
function Hall() {
  const tu = useSpec('tu', 'neutral')
  return (
    <MiniRoom label="Sảnh biệt thự, chú Tư lên dây đồng hồ" floor="#e8d6c0" left="#efe2cc" right="#e8d8c0" edge="#a07c5a">
      {Array.from({ length: 6 }, (_, i) =>
        Array.from({ length: 6 }, (_, j) => ((i + j) % 2 ? null : <Box key={`${i}${j}`} at={[i * 45 + 8, j * 42 + 8, 0]} size={[26, 26, 0.3]} color={(i + j) % 4 ? '#c98a6c' : '#7fae8a'} />)),
      )}
      {/* the grandfather clock */}
      <Box at={[0, 60, 0]} size={[22, 34, 120]} color={LIM} />
      <Cyl at={[22, 77, 92]} r={11} len={1} axis="x" color="#f6efe3" cap="#fffaf0" />
      <Cyl at={[22.5, 77, 40]} r={6} len={1} axis="x" color={BRASS} cap={BRASS} />
      {/* the lim stairs rising along the right wall */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} at={[170, 20 + i * 24, 0]} size={[70, 24, 90 - i * 15]} color={LIM} top="#a8333a" />
      ))}
      {tu && <IsoFigure at={[50, 110, 0]} spec={tu} facing="-x" />}
    </MiniRoom>
  )
}

/** The iron gate on the alley: Khoa walking out with his tin toolbox, or riding off. */
function Gate({ leaving = 'walk' }: { leaving?: 'walk' | 'ride' }) {
  const khoa = useSpec('khoa', 'smile')
  return (
    <MiniRoom label="Cổng sắt biệt thự nhìn ra hẻm" floor="#c98a5c" left="#e2d4bc" right="#e8dac4" edge="#9a8a78">
      <PanelR y0={0.5} x={70} z={0} w={110} h={110} fill="#3d3446" />
      {Array.from({ length: 10 }, (_, i) => (
        <PanelR key={i} y0={0.8} x={74 + i * 10.5} z={4} w={4} h={102} fill="#6c6787" />
      ))}
      <Cyl at={[30, 200, 0]} r={10} len={110} axis="z" color="#8a7466" />
      <Box at={[0, 160, 110]} size={[70, 80, 34]} color={iso.leaf} />
      {leaving === 'ride' ? (
        <>
          <Scooter at={[120, 120, 0]} color="#3f6f8a" plate="59-X1" />
          {khoa && <IsoFigure at={[130, 130, 0]} spec={khoa} facing="y" />}
        </>
      ) : (
        <>
          {khoa && <IsoFigure at={[130, 120, 0]} spec={khoa} facing="y" />}
          <Box at={[160, 150, 20]} size={[30, 18, 16]} color="#9aa3b5" />
          <Box at={[170, 156, 36]} size={[10, 6, 3]} color={BRASS} />
        </>
      )}
      <Label at={[200, 1, 90]} plane="R" text="NHÀ PHỤ: TRẢ PHÒNG" size={5} color={iso.coral} />
    </MiniRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'file',
      caption: 'Hồ sơ 1304 đóng lại. An Tín từ chối theo Điều 7: ông Hiển mất vì bệnh tim, không phải tai nạn. Hồ sơ dựng hiện trường được chuyển cho công an.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1304" stamp="TỪ CHỐI · ĐIỀU 7, ĐIỀU 9" sub="CHUYỂN CA Q.3: TRẦN ĐÌNH KHOA" color="#3f8a7e" />
        </EpiPanel>
      ),
    },
    {
      id: 'court',
      caption: 'Trần Đình Khoa bị xét xử về tội gian lận bảo hiểm, không phải tội giết người. Hai con ốc đồng và chiếc đồng hồ bị kéo núm nằm trên bàn vật chứng.',
      Art: () => (
        <EpiPanel>
          <Court who="khoa" mood="worried" />
        </EpiPanel>
      ),
    },
    {
      id: 'chau',
      caption: 'Chị Châu không bán căn biệt thự. Bản vẽ dang dở của ba được đóng khung, giữ nguyên nét chì cuối cùng.',
      Art: () => (
        <EpiPanel>
          <Study mood="neutral" />
        </EpiPanel>
      ),
    },
    {
      id: 'watch',
      caption: 'Chiếc Seiko được trả lại cho chị Châu. Núm đã đẩy vào, kim lại chạy như ba mươi năm trước.',
      Art: () => (
        <EpiPanel>
          <WatchBack />
        </EpiPanel>
      ),
    },
    {
      id: 'tu',
      caption: 'Chú Tư vẫn tới mỗi sáng lúc 06:30 để mở cổng và lên dây đồng hồ quả lắc ngày Chủ nhật, như ông Hiển vẫn làm.',
      Art: () => (
        <EpiPanel>
          <Hall />
        </EpiPanel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối đúng: ông Hiển mất vì bệnh tim.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1304" stamp="TỪ CHỐI · ĐIỀU 7" sub="NGƯỜI DỰNG CẢNH: CHƯA RÕ" color="#cf9a32" />
        </EpiPanel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Nhưng hồ sơ chỉ sai người dựng cảnh. Khoa chỉ bị phạt hành chính, dọn khỏi nhà phụ, mang theo hộp đồ nghề.',
      Art: () => (
        <EpiPanel>
          <Gate />
        </EpiPanel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Bạn không chi đồng nào, nhưng hồ sơ kể một cái chết khác với kết luận pháp y.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1304" stamp="TỪ CHỐI" sub="LÝ DO: CHƯA KHỚP PHÁP Y" />
        </EpiPanel>
      ),
    },
    {
      id: 'player',
      caption: 'Luật sư của Khoa bám vào chỗ lệch đó. Bạn mất nửa năm ra tòa giải trình mới giữ được quyết định.',
      Art: () => (
        <EpiPanel>
          <Court who="player" mood="worried" dock={false} />
        </EpiPanel>
      ),
    },
  ],
  framed: [
    {
      id: 'transfer',
      caption: 'Bạn chi 7 tỷ cho chị Châu và kết luận Khoa giết chú.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="7.000.000.000 đ" to="Trần Minh Châu" note="ND: Boi thuong HS 1304" />
        </EpiPanel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Ba tháng sau, phụ lục pháp y được đọc kỹ: ông Hiển mất vì bệnh tim, gãy cổ sau khi đã mất. Khoa được thả về tội giết người.',
      Art: () => (
        <EpiPanel>
          <Court who="khoa" mood="smile" />
        </EpiPanel>
      ),
    },
    {
      id: 'player',
      caption: 'An Tín đã chi 7 tỷ cho một hợp đồng không phải trả. Bạn bị đình chỉ công việc.',
      Art: () => (
        <EpiPanel>
          <Reprimand title="QUYẾT ĐỊNH" line="ĐÌNH CHỈ CÔNG TÁC" />
        </EpiPanel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 7 tỷ cho Khoa, đúng như đơn yêu cầu.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="7.000.000.000 đ" to="Trần Đình Khoa" note="ND: Boi thuong HS 1304" />
        </EpiPanel>
      ),
    },
    {
      id: 'khoa',
      caption: 'Một tuần sau, Khoa trả sạch nợ rồi đóng cửa nhà phụ đi Đà Nẵng.',
      Art: () => (
        <EpiPanel>
          <Gate leaving="ride" />
        </EpiPanel>
      ),
    },
    {
      id: 'chau',
      caption: 'Chị Châu không bao giờ biết ba mình ra đi bên bàn vẽ, chứ không phải dưới chân cầu thang.',
      Art: () => (
        <EpiPanel>
          <Study mood="worried" />
        </EpiPanel>
      ),
    },
  ],
}
