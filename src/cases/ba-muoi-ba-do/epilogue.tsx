// Illustrated epilogue shown on the ending card: one small diorama per person's
// fate, in the same block style as the rest of the chapter.
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Cup, Table } from '@/art/iso/props'
import { Carton, Label, Lockers, ScreenR } from '@/art/iso/props-ch9-12'
import { ClaimFile, Court, EpiPanel, MiniGround, MiniRoom, Reprimand, ScreenCard, Transfer, cardboard, useSpec } from '@/art/iso/endings-ch9-12'
import { DrugCarton, LoggerTop } from './iso/scenes'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

/** A vial of Herzena: white, with a blue cap. */
function Vial({ at }: { at: [number, number, number] }) {
  return (
    <g>
      <Cyl at={at} r={3.2} len={10} axis="z" color="#ffffff" />
      <Cyl at={[at[0], at[1], at[2] + 10]} r={3.2} len={3} axis="z" color="#3f6aa8" />
    </g>
  )
}

/** The hospital pharmacy: Thư hands the vials over at the shelf. */
function Hospital() {
  const thu = useSpec('thu', 'smile')
  const nurse = { skin: 1, hair: 'bun', hairColor: 'black', build: 'thin', outfit: 'uniform', outfitColor: 'white', age: 'young', mood: 'smile' } as const
  return (
    <MiniRoom label="Khoa Dược Bệnh viện Ung bướu" floor="#e6eef0" left="#d9e6ea" right="#eef4f6" edge="#3f8a7e">
      <Face points={[[40, 0.5, 96], [240, 0.5, 96], [240, 0.5, 118], [40, 0.5, 118]]} fill="#3f8a7e" />
      <WallText at={[140, 1, 103]} plane="R" text="BỆNH VIỆN UNG BƯỚU · KHOA DƯỢC" size={11} />
      {/* shelves of vials along the right wall */}
      {[10, 40, 70].map((z) => (
        <g key={z}>
          <Box at={[30, 4, z]} size={[190, 30, 3]} color="#c9d6de" />
          {Array.from({ length: 12 }, (_, i) => (
            <Vial key={i} at={[40 + i * 15, 18, z + 3]} />
          ))}
        </g>
      ))}
      {/* the open carton on a trolley, Thư and the nurse */}
      <Box at={[100, 110, 0]} size={[70, 50, 34]} color="#9aa3b5" />
      <DrugCarton at={[110, 116, 34]} size={[46, 38, 26]} />
      {thu && <IsoFigure at={[70, 170, 0]} spec={thu} facing="y" talking />}
      <IsoFigure at={[190, 120, 0]} spec={nurse} facing="y" />
    </MiniRoom>
  )
}

/** Linh in the cold room, reading every logger on a pallet before she seals it. */
function ColdCheck() {
  const linh = useSpec('linh', 'neutral')
  return (
    <MiniRoom label="Linh kiểm nhiệt kế trong phòng lạnh" floor="#cfdbe4" left="#dfe8f0" right="#e8eff5" edge="#8fa6bb" sky={['#c4d3ea', '#e6eef6']}>
      <Box at={[90, 0, 90]} size={[110, 24, 22]} color="#cfd8e2" />
      <Box at={[80, 60, 0]} size={[100, 100, 8]} color={iso.wood} />
      {[0, 1].map((i) => [0, 1].map((j) => <DrugCarton key={`${i}${j}`} at={[82 + i * 49, 62 + j * 49, 8]} size={[48, 48, 36]} />))}
      <DrugCarton at={[106, 86, 44]} size={[48, 48, 30]} />
      <LoggerTop at={[120, 98, 74]} />
      <LoggerTop at={[150, 112, 44]} />
      {linh && <IsoFigure at={[200, 120, 0]} spec={linh} facing="-x" />}
      <Box at={[196, 110, 52]} size={[3, 12, 16]} color={iso.ink} />
      <Face points={[[20, 180, 0.4], [250, 180, 0.4], [250, 245, 0.4], [20, 245, 0.4]]} fill="#ffffff" opacity={0.35} />
    </MiniRoom>
  )
}

/** Noon on the apron: Lộc pushes the cold pallet under the shelter first. */
function Shelter() {
  const loc = useSpec('loc', 'smile')
  return (
    <MiniGround label="Ông Lộc đẩy hàng lạnh vào mái che" floor="#b9b3ad" sky={['#f6c08f', '#fbe3c8']}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Face key={i} points={[[60 + i * 30, 40, 0.3], [72 + i * 30, 40, 0.3], [72 + i * 30, 180, 0.3], [60 + i * 30, 180, 0.3]]} fill={iso.leaf} />
      ))}
      {[[50, 30], [200, 30], [50, 180], [200, 180]].map(([x, y]) => (
        <Box key={`${x}${y}`} at={[x, y, 0]} size={[5, 5, 90]} color="#9aa3b5" />
      ))}
      <Box at={[110, 70, 0]} size={[70, 70, 8]} color={iso.wood} />
      <DrugCarton at={[112, 72, 8]} size={[66, 66, 40]} />
      <Box at={[44, 24, 90]} size={[166, 166, 6]} color="#e9eef2" />
      {loc && <IsoFigure at={[190, 210, 0]} spec={loc} facing="-y" />}
      <Box at={[240, 220, 0]} size={[40, 30, 4]} color="#fffaf0" />
      <Box at={[248, 226, 4]} size={[24, 18, 8]} color="#f2c46d" />
    </MiniGround>
  )
}

/** The Hưng Thịnh yard: Hưng by the rented cold truck. `loading`: the 40 cartons going in. */
function Yard({ loading = false }: { loading?: boolean }) {
  const hung = useSpec('hung', 'smile')
  return (
    <MiniGround label="Bãi xe Hưng Thịnh" floor="#c7b8a3" sky={['#c9c1d6', '#ecd8c8']}>
      <Box at={[0, 0, 0]} size={[300, 30, 120]} color="#b8bccb" />
      <Box at={[200, 30, 0]} size={[80, 50, 90]} color="#6c6787" />
      <Face points={[[210, 80.4, 76], [270, 80.4, 76], [270, 80.4, 88], [210, 80.4, 88]]} fill="#f2c94c" />
      <Box at={[30, 70, 10]} size={[130, 60, 70]} color="#f3f1ee" />
      <Box at={[160, 74, 10]} size={[40, 52, 50]} color={iso.blue} />
      <Face points={[[36, 130.4, 50], [150, 130.4, 50], [150, 130.4, 70], [36, 130.4, 70]]} fill={iso.blue} />
      <Label at={[40, 130.7, 56]} plane="R" text="LẠNH VIỆT" size={10} color="#ffffff" />
      {[50, 120, 180].map((x) => (
        <Cyl key={x} at={[x, 126, 10]} r={10} len={6} axis="y" color={iso.ink} cap="#4b4760" />
      ))}
      {loading && [0, 1, 2].map((i) => <DrugCarton key={i} at={[40 + i * 30, 150, 0]} size={[28, 28, 24]} />)}
      {loading && <DrugCarton at={[55, 152, 24]} size={[28, 28, 24]} />}
      {hung && <IsoFigure at={[180, 170, 0]} spec={hung} facing="y" talking />}
      <Box at={[204, 178, 40]} size={[3, 7, 13]} color={iso.ink} />
    </MiniGround>
  )
}

/** The rest room at night: Tùng still on the cold-room shift, jacket zipped to the chin. */
function BreakRoom() {
  const tung = useSpec('tung', 'smile')
  return (
    <MiniRoom label="Phòng nghỉ ca đêm" floor="#d6cfc4" left="#e4dccf" right="#ece4d8" sky={['#b9bfd6', '#e6dbe6']}>
      <Lockers at={[140, 4, 0]} n={3} w={36} h={100} names={['LINH', 'TÙNG', 'AN']} />
      <Box at={[30, 8, 0]} size={[70, 30, 30]} color="#a07c5a" />
      <ScreenR at={[36, 18, 30]} w={58} h={36} bg="#2f4a6a" lines={['⚽']} fg="#ffffff" />
      <Table at={[60, 120, 0]} w={80} d={70} h={50} color="#7e9cb5" />
      <Cup at={[90, 150, 50]} fill="#7b5236" />
      {tung && <IsoFigure at={[170, 140, 0]} spec={tung} facing="y" cloth="#2e5f8a" />}
    </MiniRoom>
  )
}

/** "Hand-carried" Herzena for sale online, on a phone over a seller's table. */
function Market() {
  return (
    <MiniRoom
      label="Thuốc rao bán trên mạng"
      floor="#e2d3c6"
      left="#e6d8cf"
      right="#efe4da"
      overlay={<ScreenCard x={160} y={60} w={470} lines={[{ text: 'Herzena xách tay 1,9tr' }, { text: 'inbox giá sỉ, còn 40 thùng', color: '#ffd2c8' }]} />}
    >
      <Table at={[60, 90, 0]} w={150} d={90} h={50} color="#b8927a" />
      {Array.from({ length: 10 }, (_, i) => (
        <Vial key={i} at={[80 + (i % 5) * 22, 110 + Math.floor(i / 5) * 22, 50]} />
      ))}
      <DrugCarton at={[170, 110, 50]} size={[30, 30, 22]} vn />
      <Carton at={[30, 200, 0]} size={[50, 40, 36]} color={cardboard} />
      <Carton at={[90, 206, 0]} size={[40, 34, 28]} color={cardboard} />
    </MiniRoom>
  )
}

/** Thư selling off part of the Tân Bình warehouse. */
function Selling() {
  const thu = useSpec('thu', 'worried')
  return (
    <MiniRoom label="Kho Minh Tâm ở Tân Bình" floor="#d8cfc4" left="#cfd3e6" right="#e2e2ea">
      <Face points={[[60, 0.5, 70], [200, 0.5, 70], [200, 0.5, 110], [60, 0.5, 110]]} fill="#fffaf0" />
      <WallText at={[130, 1, 94]} plane="R" text="CẦN SANG LẠI KHO" size={15} color="#d6453a" />
      <WallText at={[130, 1, 78]} plane="R" text="DP Minh Tâm · Tân Bình" size={10} color={iso.ink} weight={500} />
      {[0, 1, 2].map((i) => (
        <Carton key={i} at={[20, 40 + i * 50, 0]} size={[50, 44, 40 + (i % 2) * 20]} color={cardboard} />
      ))}
      <Box at={[20, 40, 60]} size={[50, 44, 30]} color={cardboard} />
      {thu && <IsoFigure at={[150, 130, 0]} spec={thu} facing="y" />}
    </MiniRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'hospital',
      caption: 'Ngày 26/11, 1.200 lọ Herzena về tới khoa Dược Bệnh viện Ung bướu. 64 bệnh nhân bắt đầu đợt điều trị tháng 12 đúng hẹn.',
      Art: () => (
        <EpiPanel>
          <Hospital />
        </EpiPanel>
      ),
    },
    {
      id: 'court',
      caption: 'Mai Quốc Hưng và Đỗ Thanh Tùng bị đưa ra xét xử về tội lừa đảo chiếm đoạt tài sản. Hợp đồng xe lạnh ký ngày 14/11 là chứng cứ đầu tiên được đọc trước tòa.',
      Art: () => (
        <EpiPanel>
          <Court who="hung" mood="stern" also={{ who: 'tung', mood: 'worried' }} />
        </EpiPanel>
      ),
    },
    {
      id: 'linh',
      caption: 'Linh viết lại quy trình nhận hàng lạnh của Minh Tâm: không niêm phong lô nào khi chưa đọc đủ mọi nhiệt kế trong phiếu đóng gói.',
      Art: () => (
        <EpiPanel>
          <ColdCheck />
        </EpiPanel>
      ),
    },
    {
      id: 'loc',
      caption: 'Ông Lộc vẫn bị trừ một ngày lương vì để pallet ngoài nắng. Giờ trưa nào ông cũng đẩy hàng lạnh vào mái che trước rồi mới mở hộp cơm.',
      Art: () => (
        <EpiPanel>
          <Shelter />
        </EpiPanel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 1511 đóng lại. An Tín chỉ trả 38 triệu phí kiểm nghiệm, và không lọ thuốc nào bị đốt.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1511" stamp="KHÔNG CÓ TỔN THẤT" sub="GIẢI PHÓNG LÔ HZ-2509" color="#3f8a7e" />
        </EpiPanel>
      ),
    },
  ],
  half: [
    {
      id: 'hospital',
      caption: 'Thuốc được giữ lại và về tới bệnh viện đúng hẹn.',
      Art: () => (
        <EpiPanel>
          <Hospital />
        </EpiPanel>
      ),
    },
    {
      id: 'hung',
      caption: 'Tùng bị khởi tố, nhưng hồ sơ không gọi tên người thuê xe lạnh. Ba tháng sau, Hưng Thịnh ký hợp đồng tiêu hủy với một kho lạnh khác.',
      Art: () => (
        <EpiPanel>
          <Yard />
        </EpiPanel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Thuốc được giữ lại, nhưng người bạn chỉ ra không phải người cầm nhiệt kế. Hồ sơ hình sự bị trả về.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1511" stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </EpiPanel>
      ),
    },
    {
      id: 'tung',
      caption: 'Tùng vẫn trực ca đêm phòng lạnh số 3, áo phao kéo khóa tận cổ.',
      Art: () => (
        <EpiPanel>
          <BreakRoom />
        </EpiPanel>
      ),
    },
  ],
  burned: [
    {
      id: 'transfer',
      caption: 'An Tín chuyển 4,6 tỷ cho Minh Tâm và ký cho phép tiêu hủy.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="4.620.000.000 đ" to="DP Minh Tâm" note="ND: Boi thuong HS 1511" />
        </EpiPanel>
      ),
    },
    {
      id: 'truck',
      caption: 'Ngày 28/11, xe tải lạnh của Hưng Thịnh nhận 40 thùng thuốc. Biên bản tiêu hủy được gửi về ngay chiều đó, trong khi lò đốt vẫn treo biển bảo trì.',
      Art: () => (
        <EpiPanel>
          <Yard loading />
        </EpiPanel>
      ),
    },
    {
      id: 'market',
      caption: 'Tháng sau, Herzena "xách tay" được rao bán trên mạng với giá một nửa. Bệnh nhân của Bệnh viện Ung bướu chờ lô mới thêm hai tháng.',
      Art: () => (
        <EpiPanel>
          <Market />
        </EpiPanel>
      ),
    },
  ],
  split: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 2,3 tỷ cho một lô thuốc chẳng hỏng lọ nào.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="2.310.000.000 đ" to="DP Minh Tâm" note="ND: Boi thuong HS 1511 (50%)" />
        </EpiPanel>
      ),
    },
    {
      id: 'thu',
      caption: 'Minh Tâm không đủ tiền nhập lô mới, bị bệnh viện phạt chậm giao. Bà Thư phải bán bớt kho hàng ở Tân Bình.',
      Art: () => (
        <EpiPanel>
          <Selling />
        </EpiPanel>
      ),
    },
    {
      id: 'truck',
      caption: 'Còn 40 thùng thuốc thật vẫn lên xe tải lạnh của Hưng Thịnh.',
      Art: () => (
        <EpiPanel>
          <Yard loading />
        </EpiPanel>
      ),
    },
  ],
  unjust: [
    {
      id: 'court',
      caption: 'Minh Tâm kiện An Tín, mang theo hợp đồng bệnh viện và biên bản cách ly của dược sĩ Linh. An Tín thua, phải chi đủ kèm án phí.',
      Art: () => (
        <EpiPanel>
          <Court who="thu" mood="angry" dock={false} />
        </EpiPanel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì buộc tội người ngay mà không dừng lệnh tiêu hủy.',
      Art: () => (
        <EpiPanel>
          <Reprimand title="BIÊN BẢN" line="PHÊ BÌNH" boxed={false} />
        </EpiPanel>
      ),
    },
    {
      id: 'market',
      caption: 'Lô thuốc vẫn được chở đi "tiêu hủy". Vài tuần sau, nó xuất hiện trên mạng với giá một nửa.',
      Art: () => (
        <EpiPanel>
          <Market />
        </EpiPanel>
      ),
    },
  ],
}
