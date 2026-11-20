// Illustrated epilogue shown on the ending card: one small diorama per person's
// fate, in the same block style as the rest of the chapter.
import type { Mood, PortraitSpec } from '@/art/Portrait'
import { Box, Cyl, Face, WallText, iso } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Book, Cup, Desk } from '@/art/iso/props'
import { Carton, Label, Scooter, WindowR } from '@/art/iso/props-ch9-12'
import { ClaimFile, Court, EpiPanel, MiniGround, MiniRoom, Reprimand, Transfer, cardboard, useSpec } from '@/art/iso/endings-ch9-12'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'

const vy: PortraitSpec = { skin: 0, hair: 'long', hairColor: 'black', build: 'thin', outfit: 'shirt', outfitColor: 'white', age: 'young', mood: 'smile' }

/** Check-in at Tân Sơn Nhất: mother and daughter with a suitcase, the Đà Nẵng board above. */
function Airport({ who, mood }: { who: string; mood: Mood }) {
  const spec = useSpec(who, mood)
  return (
    <MiniRoom label="Sân bay Tân Sơn Nhất" floor="#e9e6e2" left="#d9e6ea" right="#eef4f6" edge="#5d8ea3" sky={['#cfe2ea', '#f6e3d6']}>
      <Face points={[[40, 0.5, 80], [230, 0.5, 80], [230, 0.5, 115], [40, 0.5, 115]]} fill={iso.ink} />
      <WallText at={[135, 1, 100]} plane="R" text="ĐÀ NẴNG · 20/03 · ĐÚNG GIỜ" size={12} color="#ffd166" />
      <WallText at={[135, 1, 86]} plane="R" text="QUẦY 12" size={10} color="#ffffff" weight={500} />
      <Box at={[60, 30, 0]} size={[150, 40, 46]} color="#9aa3b5" />
      <Box at={[60, 30, 46]} size={[150, 40, 3]} color="#cfd8e2" />
      {spec && <IsoFigure at={[90, 130, 0]} spec={spec} facing="-y" />}
      <IsoFigure at={[136, 136, 0]} spec={vy} facing="-y" size={0.88} />
      <Box at={[170, 150, 0]} size={[24, 34, 44]} color={iso.coral} />
      <Box at={[178, 160, 44]} size={[8, 14, 12]} color={iso.ink} />
    </MiniRoom>
  )
}

/** The balcony of 21.05 at night, the lake below; someone standing at the railing. */
function LakeNight({ who, mood }: { who: string; mood: Mood }) {
  const spec = useSpec(who, mood)
  return (
    <MiniRoom label="Ban công nhìn xuống hồ Bán Nguyệt" floor="#c9a27e" left="#c9c6e0" right="#bdb8d6" edge="#6c6787" sky={['#3d4a74', '#8a7aa8']}>
      <WindowR x={20} z={20} w={230} h={90} view="night" frame="#d9dde5" />
      <Face points={[[270, 0, 0], [270, 250, 0], [270, 250, 60], [270, 0, 60]]} fill="#bfe0ea" opacity={0.35} />
      <Box at={[266, 0, 60]} size={[6, 250, 4]} color="#d9dde5" />
      {spec && <IsoFigure at={[200, 120, 0]} spec={spec} facing="y" />}
      <Box at={[60, 160, 0]} size={[50, 40, 40]} color="#d9d5d0" />
      <Cup at={[80, 176, 40]} fill="#c9a24f" />
      <Cyl at={[40, 60, 0]} r={14} len={24} axis="z" color="#c98a5c" />
      <Box at={[30, 50, 24]} size={[20, 20, 30]} color={iso.leaf} />
    </MiniRoom>
  )
}

/** The workers' bike park at Tân Thuận, containers behind. */
function Port({ who, mood }: { who: string; mood: Mood }) {
  const spec = useSpec(who, mood)
  return (
    <MiniGround label="Bãi xe máy công nhân ở cảng Tân Thuận" floor="#b9b3ad" sky={['#c9c1d6', '#f3d8c6']}>
      <Box at={[0, 0, 0]} size={[130, 50, 60]} color="#e46b4f" />
      <Box at={[140, 0, 0]} size={[130, 50, 60]} color="#5d8ea3" />
      <Box at={[0, 0, 60]} size={[130, 50, 60]} color="#f2c46d" />
      <Scooter at={[30, 100, 0]} color="#c0392b" plate="59P2-418.36" />
      <Scooter at={[30, 150, 0]} color="#3f6aa8" />
      {spec && <IsoFigure at={[190, 150, 0]} spec={spec} facing="y" />}
    </MiniGround>
  )
}

/** The Hưng Toàn office: the ledgers open on the desk. */
function Office({ who, mood }: { who: string; mood: Mood }) {
  const spec = useSpec(who, mood)
  return (
    <MiniRoom label="Văn phòng Hưng Toàn Logistics" floor="#cfc6bf" left="#d9d6e6" right="#e2dfea" edge="#8d8fa8">
      <Face points={[[60, 0.5, 80], [220, 0.5, 80], [220, 0.5, 108], [60, 0.5, 108]]} fill={iso.blue} />
      <WallText at={[140, 1, 88]} plane="R" text="HƯNG TOÀN LOGISTICS" size={13} />
      {spec && <IsoFigure at={[96, 70, 0]} spec={spec} facing="y" pose="sit" />}
      <Desk at={[60, 110, 0]} w={140} d={70} />
      <Book at={[80, 130, 74]} color="#e8cf98" />
      <Book at={[130, 126, 74]} color="#3f6f8a" />
      <Cup at={[180, 160, 74]} fill="#7b5236" />
      <Carton at={[200, 200, 0]} size={[44, 36, 32]} color={cardboard} text="2025" />
      <Box at={[10, 160, 0]} size={[40, 70, 110]} color="#9aa3b5" />
      <Label at={[50.5, 220, 90]} plane="L" text="CHỨNG TỪ" size={6} />
    </MiniRoom>
  )
}

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Đặng Quốc Toàn bị xét xử về tội giết người. Vợ anh bị điều tra trong vụ rút 7,1 tỷ qua công ty Thành Đạt.',
      Art: () => (
        <EpiPanel>
          <Court who="toan" mood="worried" />
        </EpiPanel>
      ),
    },
    {
      id: 'transfer',
      caption: 'An Tín chuyển 6 tỷ vào tài khoản đứng tên Đặng Bảo Vy. Mẹ cháu giữ hộ tới năm cháu 18 tuổi.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="6.000.000.000 đ" to="Đặng Bảo Vy" note="ND: Chi tra HS 1403" />
        </EpiPanel>
      ),
    },
    {
      id: 'truc',
      caption: 'Ngày 20/3, Vy vẫn bay ra Đà Nẵng mừng sinh nhật 17 tuổi, lần này với mẹ.',
      Art: () => (
        <EpiPanel>
          <Airport who="truc" mood="smile" />
        </EpiPanel>
      ),
    },
    {
      id: 'quyen',
      caption: 'Chị Quyên giữ lại công ty cho tới khi ngân hàng xong việc. Buổi đối chiếu sổ sách cuối cùng cũng diễn ra.',
      Art: () => (
        <EpiPanel>
          <Office who="quyen" mood="neutral" />
        </EpiPanel>
      ),
    },
    {
      id: 'phuc',
      caption: 'Phúc làm chứng ở tòa. Từ đó chìa chiếc Wave đỏ luôn nằm trong túi áo cậu.',
      Art: () => (
        <EpiPanel>
          <Port who="phuc" mood="worried" />
        </EpiPanel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Tiền về đúng tay Vy, Toàn bị khởi tố.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1403" stamp="CHI 6 TỶ CHO NGƯỜI THỪA KẾ" sub="KHỞI TỐ: ĐẶNG QUỐC TOÀN" color="#3f8a7e" />
        </EpiPanel>
      ),
    },
    {
      id: 'toan',
      caption: 'Hồ sơ của bạn ghi sai cách ông Hưng chết. Luật sư của Toàn bám vào đó suốt phiên tòa, bản án nhẹ hơn nhiều điều anh đã làm.',
      Art: () => (
        <EpiPanel>
          <Court who="toan" mood="neutral" />
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
          <ClaimFile no="1403" stamp="TRẢ HỒ SƠ" sub="KHÔNG ĐỦ CĂN CỨ" />
        </EpiPanel>
      ),
    },
    {
      id: 'toan',
      caption: 'Toàn đứng ra lo tang lễ cho anh trai, rồi xin làm người giám hộ số tiền của cháu.',
      Art: () => (
        <EpiPanel>
          <LakeNight who="toan" mood="smile" />
        </EpiPanel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bạn duyệt chi 6 tỷ cho người thụ hưởng Đặng Quốc Toàn.',
      Art: () => (
        <EpiPanel>
          <Transfer amount="6.000.000.000 đ" to="Đặng Quốc Toàn" note="ND: Chi tra HS 1403" />
        </EpiPanel>
      ),
    },
    {
      id: 'toan',
      caption: 'Tuần sau, 7,1 tỷ lặng lẽ quay về sổ sách công ty. Buổi kiểm toán không còn gì để tìm.',
      Art: () => (
        <EpiPanel>
          <Office who="toan" mood="smile" />
        </EpiPanel>
      ),
    },
    {
      id: 'truc',
      caption: 'Vy mất cha, mất luôn số tiền cha để lại cho mình.',
      Art: () => (
        <EpiPanel>
          <LakeNight who="truc" mood="worried" />
        </EpiPanel>
      ),
    },
  ],
  refunded: [
    {
      id: 'file',
      caption: 'Bạn kết luận tự tử. An Tín chỉ hoàn 180 triệu tiền phí, công an đóng hồ sơ theo.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1403" stamp="TỰ TỬ · HOÀN PHÍ" sub="ĐIỀU 8 · 24 THÁNG ĐẦU" />
        </EpiPanel>
      ),
    },
    {
      id: 'truc',
      caption: 'Vy lớn lên tin rằng cha mình đã bỏ đi một tuần trước sinh nhật của cô.',
      Art: () => (
        <EpiPanel>
          <LakeNight who="truc" mood="worried" />
        </EpiPanel>
      ),
    },
    {
      id: 'toan',
      caption: 'Dưới cảng Tân Thuận, Toàn vẫn chốt hàng mỗi tối thứ bảy.',
      Art: () => (
        <EpiPanel>
          <Port who="toan" mood="neutral" />
        </EpiPanel>
      ),
    },
  ],
  denied: [
    {
      id: 'file',
      caption: 'Bạn đúng khi không trả cho Toàn, nhưng sai khi không trả cho ai.',
      Art: () => (
        <EpiPanel>
          <ClaimFile no="1403" stamp="TỪ CHỐI TOÀN BỘ" sub="NGƯỜI THỤ HƯỞNG GÂY RA CÁI CHẾT" />
        </EpiPanel>
      ),
    },
    {
      id: 'truc',
      caption: 'Mẹ của Vy kiện thay con, chỉ cần chỉ ra Điều 11 của hợp đồng. An Tín thua, chi đủ 6 tỷ kèm lãi chậm trả và án phí.',
      Art: () => (
        <EpiPanel>
          <Court who="truc" mood="angry" dock={false} />
        </EpiPanel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị phê bình vì đọc hợp đồng thiếu một nửa.',
      Art: () => (
        <EpiPanel>
          <Reprimand title="BIÊN BẢN" line="PHÊ BÌNH" boxed={false} />
        </EpiPanel>
      ),
    },
  ],
}
