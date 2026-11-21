// Illustrated epilogue shown on the ending card and in the outro: one small
// diorama per person's fate, in the block style of the rest of Chapter 8.
import { Box, Cyl, Face, OnPlane, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Boxing, Court, Desk as FileDesk, Panel, Plot, Room, Transfer as Paid, useSpec } from '@/art/iso/epilogueKit'
import { Building, Scooter, StreetLamp } from '@/art/iso/street'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'
import { Crate } from './iso/scenes'

type Mood = 'smile' | 'neutral' | 'worried' | 'angry'
const steel = '#b9c3cc'
const soyGreen = '#5f9a5b'

/** Line 2 with its UHT tank and dial; `stopped` hangs the maintenance sign and leaves the steam valve open on the floor. */
function Factory({ who, mood, stopped = false }: { who?: string; mood?: Mood; stopped?: boolean }) {
  const spec = useSpec(who ?? 'sang', mood)
  return (
    <Room label="Xưởng line 2" walls={['#dfe6e8', '#e9eef0']} floor="#c9d4cf" edge="#8f9aa3">
      <Cyl at={[0, 10, 96]} r={5} len={270} axis="x" color={steel} />
      <Cyl at={[0, 90, 60]} r={18} len={4} axis="x" color="#7e8794" cap="#fbfaf6" />
      <OnPlane at={[4.5, 90, 60]} plane="L">
        <line x1="0" y1="0" x2="8" y2="-14" stroke={iso.ink} strokeWidth="2" />
        <line x1="0" y1="0" x2={stopped ? 8 : -14} y2={stopped ? -14 : -6} stroke="#e2463a" strokeWidth="1.6" />
      </OnPlane>
      <Face points={[[120, 0.6, 70], [250, 0.6, 70], [250, 0.6, 100], [120, 0.6, 100]]} fill={stopped ? '#f2c443' : '#3f8a7e'} />
      <WallText at={[185, 1, 79]} plane="R" text={stopped ? 'BẢO TRÌ · DỪNG LINE 2' : 'LINE 2 · ĐANG CHẠY'} size={12} color={stopped ? iso.ink : '#ffffff'} />
      <Cyl at={[70, 120, 0]} r={42} len={100} axis="z" color={steel} cap="#d9dfe4" />
      <Box at={[180, 60, 0]} size={[50, 180, 24]} color="#5d6470" />
      {Array.from({ length: 6 }, (_, i) => (
        <Cyl key={i} at={[205, 74 + i * 28, 24]} r={6} len={18} axis="z" color="#f4f1ea" cap={soyGreen} />
      ))}
      {stopped && (
        <>
          <Cyl at={[120, 200, 0]} r={12} len={16} axis="x" color="#d9dfe4" />
          <Cyl at={[150, 180, 0]} r={11} len={3} axis="z" color="#e2463a" />
        </>
      )}
      {spec && <IsoFigure at={[120, 150, 0]} spec={spec} facing="y" />}
    </Room>
  )
}

/** The factory gate with the apology notice; whoever stands by it. */
function Gate({ who, mood }: { who: string; mood?: Mood }) {
  const spec = useSpec(who, mood)
  return (
    <Plot label="Cổng nhà máy Mộc An" floor="#b4ab9c">
      <Box at={[0, 0, 0]} size={[300, 40, 120]} color="#e9e3d4" />
      <Box at={[20, 40, 96]} size={[200, 4, 20]} color={soyGreen} />
      <WallText at={[120, 44.5, 101]} plane="R" text="SỮA ĐẬU NÀNH MỘC AN" size={12} color="#ffffff" />
      <Face points={[[230, 40.5, 0], [290, 40.5, 0], [290, 40.5, 90], [230, 40.5, 90]]} fill="#7e8794" />
      <Box at={[40, 60, 0]} size={[6, 6, 70]} color={iso.woodDark} />
      <Box at={[120, 60, 0]} size={[6, 6, 70]} color={iso.woodDark} />
      <Box at={[36, 66, 40]} size={[94, 4, 46]} color="#fffaf0" />
      <WallText at={[83, 70.5, 74]} plane="R" text="XIN LỖI KHÁCH HÀNG" size={7} color={iso.ink} />
      <WallText at={[83, 70.5, 62]} plane="R" text="Lô 0601-L2 lỗi tiệt trùng" size={5.5} color={iso.ink} weight={600} />
      <WallText at={[83, 70.5, 52]} plane="R" text="Hoàn tiền tại điểm bán" size={5.5} color={iso.ink} weight={600} />
      {spec && <IsoFigure at={[170, 120, 0]} spec={spec} facing="y" />}
    </Plot>
  )
}

/** Hiệp Thành Mart at night, Mr Mạnh waiting on his motorbike out front. */
function MartNight() {
  const spec = useSpec('manh', 'smile')
  return (
    <Plot label="Trước Hiệp Thành Mart" floor="#5d5f72" sky={['#8f8fbf', '#d9b8c4']}>
      <Box at={[0, 0, 0]} size={[220, 50, 130]} color="#f1e6d2" />
      <Box at={[10, 50, 96]} size={[200, 4, 26]} color="#d6453a" />
      <WallText at={[110, 54.5, 102]} plane="R" text="HIỆP THÀNH MART" size={14} color="#ffffff" />
      <Face points={[[30, 50.5, 0], [190, 50.5, 0], [190, 50.5, 86], [30, 50.5, 86]]} fill="#ffe7a8" />
      <Building at={[226, 0, 0]} size={[74, 50, 150]} color="#a7b7c9" seed={3} lit={0.7} />
      <Scooter at={[120, 140, 0]} color="#3f5a78" />
      {spec && <IsoFigure at={[96, 160, 0]} spec={spec} facing="y" />}
      <StreetLamp at={[250, 100, 0]} />
    </Plot>
  )
}

/** Thuận with his year-end award by a shelf of soy milk. */
function Award() {
  const spec = useSpec('thuan', 'smile')
  return (
    <Room label="Lễ tổng kết cuối năm" walls={['#e7e2ee', '#f1e6d2']}>
      <Face points={[[60, 0.6, 50], [220, 0.6, 50], [220, 0.6, 110], [60, 0.6, 110]]} fill="#d6453a" />
      <WallText at={[140, 1, 90]} plane="R" text="TỔNG KẾT NĂM 2025" size={14} color="#f2c46d" />
      <Box at={[0, 40, 0]} size={[50, 180, 6]} color="#d8d0c0" />
      {[0, 1, 2].map((l) => (
        <g key={l}>
          <Box at={[0, 40, 6 + l * 32]} size={[50, 180, 3]} color="#b9b4a8" />
          {Array.from({ length: 7 }, (_, i) => (
            <Cyl key={i} at={[34, 54 + i * 24, 9 + l * 32]} r={6} len={20} axis="z" color="#f4f1ea" cap={soyGreen} />
          ))}
        </g>
      ))}
      {spec && <IsoFigure at={[130, 130, 0]} spec={spec} facing="y" />}
      <Box at={[148, 156, 46]} size={[22, 3, 28]} color="#fffaf0" />
      <Box at={[151, 159.5, 50]} size={[16, 0.5, 20]} color="#f2c46d" />
    </Room>
  )
}

/** Three months on: a new crate of line 2 bottles, caps swollen again. */
function SourAgain() {
  return (
    <Room label="Một lô khác lại phồng nắp" walls={['#dfe6e8', '#e9eef0']} floor="#c9d4cf" edge="#8f9aa3">
      <Box at={[60, 60, 0]} size={[160, 120, 50]} color="#a99a8c" />
      <Crate at={[80, 80, 50]} sour />
      <Crate at={[120, 80, 50]} sour />
      <Crate at={[80, 120, 50]} sour />
      <Crate at={[160, 120, 50]} sour />
      <Box at={[120, 130, 50]} size={[30, 20, 2]} color="#fffaf0" />
      <Face points={[[90, 0.6, 70], [200, 0.6, 70], [200, 0.6, 96], [90, 0.6, 96]]} fill="#fffaf0" />
      <WallText at={[145, 1, 78]} plane="R" text="LÔ 0404-L2 · TẠM GIỮ" size={11} color="#e2463a" />
    </Room>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Lương Văn Thuận bị khởi tố về hành vi gây rối và lừa đảo chiếm đoạt tài sản. Hộp kim insulin và tờ phiếu kiểm nghiệm cắt đôi nằm trong hồ sơ vụ án.',
      Art: () => (
        <div className="relative">
          <Panel>
            <Court accused="thuan" mood="worried" />
          </Panel>
        </div>
      ),
    },
    {
      id: 'ha',
      caption: 'Bà Hà dán thông báo xin lỗi ở cổng nhà máy, hoàn tiền cho từng khách mua phải sữa chua. Line 2 dừng ba tuần để thay toàn bộ van hơi.',
      Art: () => (
        <Panel>
          <Gate who="ha" mood="neutral" />
        </Panel>
      ),
    },
    {
      id: 'sang',
      caption: 'Sang được nhận lại, kèm một quyết định khen thưởng. Giờ báo động nào trên line 2 cũng tự gửi thẳng tới điện thoại giám đốc.',
      Art: () => (
        <Panel>
          <Factory who="sang" mood="smile" stopped />
        </Panel>
      ),
    },
    {
      id: 'manh',
      caption: 'Ông Mạnh nhận lời xin lỗi và tiền thuốc. Tối nào ông vẫn đỗ xe trước Hiệp Thành Mart, và giờ ông để ý cả người mặc áo mưa trong đêm khô.',
      Art: () => (
        <Panel>
          <MartNight />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1201 đóng lại. An Tín từ chối chi trả: thu hồi do lỗi sản xuất, lời đe dọa do nhân viên của chính người được bảo hiểm dựng lên.',
      Art: () => (
        <Panel>
          <FileDesk file="1201" stamp="TỪ CHỐI" sub="LOẠI TRỪ ĐIỀU 7 · CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối đúng: sữa chua vì lỗi tiệt trùng. Nhưng người bị bạn chỉ ra có ngoại phạm vững.',
      Art: () => (
        <Panel>
          <FileDesk file="1201" stamp="TỪ CHỐI" sub="NGƯỜI CHÍCH KIM: CHƯA XÁC ĐỊNH" />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận vẫn ký phiếu xuất xưởng mỗi sáng. Cây bút tiêm insulin vẫn nằm trong túi áo.',
      Art: () => (
        <Panel>
          <Factory who="thuan" mood="neutral" />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Bạn từ chối, nhưng ghi sai nguyên nhân. Mộc An kiện An Tín ra tòa.',
      Art: () => (
        <Panel>
          <FileDesk file="1201" stamp="TỪ CHỐI" sub="BỊ KHỞI KIỆN" />
        </Panel>
      ),
    },
    {
      id: 'shelf',
      caption: 'Nửa năm sau, An Tín mới chứng minh được điều bạn bỏ sót. Line 2 vẫn chạy với chiếc van cũ suốt thời gian đó.',
      Art: () => (
        <Panel>
          <Factory />
        </Panel>
      ),
    },
  ],
  unjust: [
    {
      id: 'ha',
      caption: 'Bà Hà mang biên bản báo công an và phiếu xuất xưởng ký tên Thuận ra trình. Hồ sơ của bạn bị trả về.',
      Art: () => (
        <Panel>
          <FileDesk file="1201" stamp="TRẢ HỒ SƠ" sub="MỘC AN TRÌNH BIÊN BẢN CÔNG AN" color="#cf9a32" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ. Hồ sơ 1201 được giao cho người khác.',
      Art: () => (
        <Panel>
          <Boxing />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận được giao lập báo cáo nội bộ về sự cố. Báo cáo kết luận: lỗi nằm ngoài cổng nhà máy.',
      Art: () => (
        <Panel>
          <Factory who="thuan" mood="smile" />
        </Panel>
      ),
    },
  ],
  split: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 1,4 tỷ đồng cho Mộc An để bù lô 0701-L1.',
      Art: () => (
        <Panel>
          <Paid amount="1.400.000.000đ" to="MỘC AN" note="BT HS 1201" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Lời đe dọa khiến lô đó bị thu hồi lại do chính trưởng QC của Mộc An viết. Bạn bị kỷ luật vì chi sai điều khoản.',
      Art: () => (
        <Panel>
          <FileDesk file="1201" stamp="KỶ LUẬT" sub="CHI SAI ĐIỀU 7 · HS 1201" />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 3,2 tỷ đồng cho Công ty Sữa đậu nành Mộc An.',
      Art: () => (
        <Panel>
          <Paid amount="3.200.000.000đ" to="MỘC AN" note="BT HS 1201" />
        </Panel>
      ),
    },
    {
      id: 'thuan',
      caption: 'Thuận nhận thưởng cuối năm "mười năm không lọt lô lỗi".',
      Art: () => (
        <Panel>
          <Award />
        </Panel>
      ),
    },
    {
      id: 'again',
      caption: 'Ba tháng sau, một lô khác của line 2 lại phồng nắp.',
      Art: () => (
        <Panel>
          <SourAgain />
        </Panel>
      ),
    },
  ],
}
