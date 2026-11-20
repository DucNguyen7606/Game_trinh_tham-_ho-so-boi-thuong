// Illustrated epilogue shown on the ending card and in the outro: one small
// diorama per person's fate, in the block style of the rest of Chapter 7.
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Boxing, Court, Desk as FileDesk, Panel, Plot, Room, Transfer as Paid, useSpec } from '@/art/iso/epilogueKit'
import { Building, Scooter, StreetLamp } from '@/art/iso/street'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const gold = '#f2c46d'
const shopRed = '#c94a3a'

/** Tiệm Kim Thành from the street: red sign, the shutter down with a notice taped on it, or open with full gold displays. */
function GoldShop({ open = false, notice, who, mood }: { open?: boolean; notice?: string; who?: string; mood?: 'smile' | 'neutral' | 'worried' }) {
  const spec = useSpec(who ?? 'loan', mood)
  return (
    <Plot label="Tiệm vàng Kim Thành" floor="#9a9aa6" sky={open ? ['#f3c9b8', '#f9e6d2'] : ['#c4c6dc', '#ead8d0']}>
      <Building at={[0, 0, 0]} size={[60, 40, 160]} color="#e2a37a" seed={2} lit={0.4} />
      <Box at={[64, 0, 0]} size={[172, 40, 150]} color="#e9dcc6" />
      <Building at={[240, 0, 0]} size={[60, 40, 130]} color="#a9c0b6" seed={4} lit={0.4} />
      <Box at={[74, 40, 104]} size={[152, 4, 32]} color={shopRed} />
      <WallText at={[150, 44.5, 112]} plane="R" text="KIM THÀNH" size={20} color={gold} />
      {open ? (
        <>
          <Face points={[[84, 40.5, 0], [216, 40.5, 0], [216, 40.5, 96], [84, 40.5, 96]]} fill="#ffe7a8" />
          <Box at={[90, 50, 0]} size={[120, 30, 40]} color="#8a5c38" />
          {Array.from({ length: 8 }, (_, i) => (
            <Cyl key={i} at={[98 + i * 14, 64, 40]} r={4} len={2} axis="z" color={gold} cap="#ffe1a0" />
          ))}
          <Box at={[60, 60, 0]} size={[6, 6, 70]} color={iso.metal} />
          <Box at={[50, 58, 70]} size={[26, 10, 26]} color={iso.coral} />
          <Box at={[234, 60, 0]} size={[6, 6, 70]} color={iso.metal} />
          <Box at={[226, 58, 70]} size={[26, 10, 26]} color={iso.coral} />
        </>
      ) : (
        <>
          <Face points={[[84, 40.5, 0], [216, 40.5, 0], [216, 40.5, 96], [84, 40.5, 96]]} fill="#9a9792" />
          {Array.from({ length: 12 }, (_, i) => (
            <Face key={i} points={[[84, 40.8, 6 + i * 8], [216, 40.8, 6 + i * 8], [216, 40.8, 8 + i * 8], [84, 40.8, 8 + i * 8]]} fill="#7f7c77" />
          ))}
        </>
      )}
      {notice && (
        <>
          <Face points={[[126, 41.2, 40], [174, 41.2, 40], [174, 41.2, 72], [126, 41.2, 72]]} fill="#fffaf0" />
          <WallText at={[150, 41.5, 52]} plane="R" text={notice} size={8} color="#d6453a" weight={800} />
        </>
      )}
      {who && spec && <IsoFigure at={[160, 120, 0]} spec={spec} facing="y" />}
      <StreetLamp at={[30, 200, 0]} />
    </Plot>
  )
}

/** The bag of "stolen gold" spilled out on an evidence table: brass rings and three real taels. */
function EvidenceBag() {
  return (
    <Room label="Vật chứng: túi vàng cướp" walls={['#c9c6d6', '#d8d3e0']} floor="#d6cfd2">
      <Face points={[[90, 0.5, 60], [220, 0.5, 60], [220, 0.5, 100], [90, 0.5, 100]]} fill="#fffaf0" />
      <WallText at={[155, 0.8, 84]} plane="R" text="VẬT CHỨNG · HS 0212" size={12} color={iso.ink} />
      <WallText at={[155, 0.8, 68]} plane="R" text="286 nhẫn mạ · 3 lượng thật" size={10} color="#d6453a" weight={700} />
      <Box at={[40, 70, 0]} size={[200, 120, 50]} color="#a99a8c" />
      <Box at={[60, 90, 50]} size={[50, 40, 34]} color="#6b6a35" />
      {Array.from({ length: 24 }, (_, i) => (
        <Cyl key={i} at={[128 + (i % 6) * 16, 86 + Math.floor(i / 6) * 22, 50]} r={5} len={2} axis="z" color={i < 3 ? '#ffd23a' : '#d9b34f'} cap={i < 3 ? '#fff0a0' : '#e6c46a'} />
      ))}
      <Box at={[124, 168, 50]} size={[40, 14, 1]} color="#ffd23a" />
    </Room>
  )
}

/** Hùng's small workbench at home, a tray of his own rings. */
function Workbench() {
  const spec = useSpec('hung', 'smile')
  return (
    <Room label="Bàn chế tác của Hùng" walls={['#e6cfa8', '#efdcbc']} floor="#d9c3a6" edge="#a9865c">
      <Face points={[[60, 0.5, 80], [230, 0.5, 80], [230, 0.5, 106], [60, 0.5, 106]]} fill={shopRed} />
      <WallText at={[145, 0.8, 88]} plane="R" text="NHẬN CHẾ TÁC" size={14} color={gold} />
      <Box at={[60, 20, 0]} size={[170, 50, 54]} color={iso.woodDark} />
      <Box at={[80, 30, 54]} size={[60, 30, 4]} color="#7a2f35" />
      {Array.from({ length: 6 }, (_, i) => (
        <Cyl key={i} at={[88 + i * 9, 44, 58]} r={3} len={2} axis="z" color={gold} cap="#ffe1a0" />
      ))}
      <Box at={[170, 34, 54]} size={[14, 14, 20]} color={iso.metal} />
      <Box at={[164, 30, 74]} size={[26, 8, 4]} color="#3d3446" />
      {spec && <IsoFigure at={[110, 100, 0]} spec={spec} facing="-y" />}
    </Room>
  )
}

/** Bà Ba Lành's grocery stall at the mouth of alley 514. */
function Stall() {
  const spec = useSpec('lanh', 'neutral')
  return (
    <Plot label="Tạp hóa Ba Lành, đầu hẻm 514" floor="#c47a5a">
      <Box at={[0, 0, 0]} size={[200, 50, 130]} color="#e6d3b4" />
      <Box at={[10, 50, 86]} size={[180, 30, 6]} color="#3f8a5b" />
      <WallText at={[100, 50.5, 104]} plane="R" text="TẠP HÓA BA LÀNH" size={13} color={shopRed} />
      {[0, 1, 2].map((l) => (
        <Box key={l} at={[20, 52, 10 + l * 24]} size={[100, 26, 3]} color="#b9875d" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} at={[24 + (i % 3) * 32, 56, 13 + Math.floor(i / 3) * 24]} size={[24, 18, 16]} color={['#e2a63b', '#7fae8a', '#d6453a'][i % 3]} />
      ))}
      <Cyl at={[160, 120, 0]} r={10} len={20} axis="z" color="#3f78b0" />
      {spec && <IsoFigure at={[150, 108, 20]} spec={spec} facing="y" pose="sit" />}
      <Box at={[220, 0, 0]} size={[80, 50, 110]} color="#e9dcc6" />
      <Box at={[206, 0, 0]} size={[14, 260, 0.4]} color="#9a5a40" />
    </Plot>
  )
}

/** Quang Trung at night: Tài on the red Exciter, new tail-light. */
function Road() {
  const spec = useSpec('tai', 'neutral')
  return (
    <Plot label="Đường Quang Trung, 23:00" floor="#5d5f72" sky={['#8f8fbf', '#d9b8c4']}>
      <Building at={[0, 0, 0]} size={[90, 40, 170]} color="#c9a274" seed={1} lit={0.7} />
      <Building at={[96, 0, 0]} size={[80, 40, 130]} color="#a7b7c9" seed={3} lit={0.7} />
      <Building at={[182, 0, 0]} size={[110, 40, 150]} color="#e2a37a" seed={6} lit={0.7} />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[20 + i * 74, 150, 0]} size={[40, 6, 0.6]} color="#e8dcc4" />
      ))}
      <Scooter at={[130, 170, 0]} color="#d6453a" />
      {spec && <IsoFigure at={[110, 196, 0]} spec={spec} facing="y" />}
      <StreetLamp at={[40, 60, 0]} />
    </Plot>
  )
}

/** The maternity ward corridor: Hùng called away again, people whispering. */
function Ward() {
  const spec = useSpec('hung', 'angry')
  return (
    <Room label="Hành lang khoa sản" sky={['#c8e0e0', '#f1e6dc']} walls={['#d6e4e2', '#e4eeec']} edge="#9fb8b6" floor="#e6e2da">
      <Face points={[[120, 0.5, 70], [230, 0.5, 70], [230, 0.5, 104], [120, 0.5, 104]]} fill="#fffaf0" />
      <WallText at={[175, 0.8, 88]} plane="R" text="KHOA SẢN" size={14} color="#2f6aa8" />
      <WallText at={[175, 0.8, 74]} plane="R" text="PHÒNG 412" size={11} color="#2f6aa8" />
      <Face points={[[0.5, 60, 0], [0.5, 120, 0], [0.5, 120, 100], [0.5, 60, 100]]} fill="#bcd4d8" />
      <Box at={[40, 150, 0]} size={[30, 90, 24]} color="#7a9fb0" />
      {spec && <IsoFigure at={[130, 120, 0]} spec={spec} facing="y" />}
      <Box at={[200, 60, 0]} size={[40, 30, 70]} color="#e8f2f4" />
    </Room>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Huỳnh Thị Kim Loan và Lâm Văn Tài bị đưa ra xét xử về tội lừa đảo chiếm đoạt tài sản. Bà Loan nhận hết phần chủ mưu.',
      Art: () => (
        <div className="relative">
          <Panel>
            <Court accused="loan" mood="worried" also="tai" alsoMood="worried" />
          </Panel>
        </div>
      ),
    },
    {
      id: 'bag',
      caption: 'Túi "vàng cướp" dưới gầm giường phòng trọ của Tài: 286 chiếc nhẫn đồng mạ và đúng 3 lượng vàng thật.',
      Art: () => (
        <Panel>
          <EvidenceBag />
        </Panel>
      ),
    },
    {
      id: 'hung',
      caption: 'Hùng được trả lại tên. Ông mở một bàn chế tác nhỏ ở nhà, vài khách quen của tiệm Kim Thành tìm tới.',
      Art: () => (
        <Panel>
          <Workbench />
        </Panel>
      ),
    },
    {
      id: 'lanh',
      caption: 'Bà Ba Lành vẫn ngồi sạp đầu hẻm 514. Khu Quang Trung không ai chơi hụi nữa.',
      Art: () => (
        <Panel>
          <Stall />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0212 đóng lại. An Tín không chi đồng nào, hồ sơ chuyển cơ quan điều tra.',
      Art: () => (
        <Panel>
          <FileDesk file="0212" stamp="TỪ CHỐI BỒI THƯỜNG" sub="CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'An Tín từ chối bồi thường. Bà Loan bị khởi tố, nhưng một mực không khai ai đã vào tiệm tối đó.',
      Art: () => (
        <Panel>
          <FileDesk file="0212" stamp="TỪ CHỐI BỒI THƯỜNG" sub="KHỞI TỐ: HUỲNH THỊ KIM LOAN" />
        </Panel>
      ),
    },
    {
      id: 'tai',
      caption: 'Trên đường Quang Trung, Tài vẫn chạy chiếc Exciter đỏ, áo mưa mới, đèn hậu mới.',
      Art: () => (
        <Panel>
          <Road />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Người bạn chỉ ra có ngoại phạm vững. Luật sư của bà Loan kiện An Tín đòi đủ 6,3 tỷ.',
      Art: () => (
        <Panel>
          <FileDesk file="0212" stamp="KHIẾU NẠI" sub="YÊU CẦU GIÁM ĐỊNH LẠI" color="#cf9a32" />
        </Panel>
      ),
    },
    {
      id: 'hung',
      caption: 'Hùng bị gọi lên phường ba lần. Tin đồn "thợ cũ cướp tiệm" theo ông tới tận bệnh viện, nơi con gái ông vừa chào đời.',
      Art: () => (
        <Panel>
          <Ward />
        </Panel>
      ),
    },
  ],
  partpaid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 2,1 tỷ đồng cho bà Huỳnh Thị Kim Loan.',
      Art: () => (
        <Panel>
          <Paid amount="2.100.000.000đ" to="HUỲNH THỊ KIM LOAN" note="BT HS 0212" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Một tháng sau, tiệm Kim Thành dán giấy sang nhượng. Bà Loan chuyển đi, không để lại địa chỉ.',
      Art: () => (
        <Panel>
          <GoldShop notice="SANG NHƯỢNG" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị kỷ luật vì duyệt chi cho một chiếc két mà chính chủ đã mở sẵn.',
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
      caption: 'Bảo hiểm An Tín chuyển 6,3 tỷ đồng cho bà Huỳnh Thị Kim Loan.',
      Art: () => (
        <Panel>
          <Paid amount="6.300.000.000đ" to="HUỲNH THỊ KIM LOAN" note="BT HS 0212" />
        </Panel>
      ),
    },
    {
      id: 'shop',
      caption: 'Tiệm Kim Thành khai trương lại trước Tết, tủ kính đầy vàng thật. Hụi viên cũ còn khen bà Loan giữ chữ tín.',
      Art: () => (
        <Panel>
          <GoldShop open who="loan" mood="smile" />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi cho 45 lượng vàng chưa từng nằm trong tủ.',
      Art: () => (
        <Panel>
          <FileDesk file="0212" stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0212" />
        </Panel>
      ),
    },
  ],
}
