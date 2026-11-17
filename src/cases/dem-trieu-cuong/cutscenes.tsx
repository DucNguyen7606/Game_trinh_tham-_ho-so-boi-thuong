// Chapter 6's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Built from the shared parts in components/cutsceneParts.
import { GradeFx, RainFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, Investigator, Lineup, WaterFx, lineupPins, lower, outroFrom, stampAt } from '@/components/cutsceneParts'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Pier = sceneArt['ben']
const Warehouse = sceneArt['kho']
const Window = sceneArt['cua-so']
const claimDocs = [documents['P2'], documents['P4']]

/** The opening: the flood night, the claim, the people, the job. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 6 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Bến Bình Đông · đêm 14/11',
        lines: ['Đêm 14/11, triều cường lên cùng một trận mưa lớn.', 'Nước kênh Đôi tràn qua bờ, ngập cả dãy kho ven Bến Bình Đông.'],
        camera: { from: { zoom: 1.22, x: -3, y: 2 }, to: { zoom: 1.06 } },
        Art: () => (
          <>
            <Pier />
            <GradeFx color="#0b1222" opacity={0.55} />
            <RainFx />
          </>
        ),
      },
      {
        kicker: '22:40',
        lines: ['Mười giờ bốn mươi, nước vào tới kho điện thoại của bà Trần Thị Mỹ Lệ.', 'Trong kho có năm tầng kệ, một nghìn năm trăm chiếc điện thoại.'],
        camera: { from: { zoom: 1.08, y: -1 }, to: { zoom: 1.18, y: 2 } },
        Art: () => (
          <>
            <Warehouse />
            <GradeFx color="#0b1222" opacity={0.5} />
            <WaterFx level={24} />
            <RainFx count={40} opacity={0.18} />
          </>
        ),
      },
      {
        kicker: 'Cửa sổ phía kênh',
        lines: ['Ngoài kia, mặt kênh đen kịt dưới mưa.'],
        camera: { from: { zoom: 1.16, x: 2 }, to: { zoom: 1.05, x: -2 } },
        Art: () => (
          <>
            <Window />
            <GradeFx color="#0a1020" opacity={0.55} />
            <RainFx count={70} opacity={0.3} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Sáng 15/11',
        lines: [
          'Sáng ra nước rút, để lại một lớp bùn phù sa.',
          'Quản lý kho Võ Đình Khải báo: nước phá cửa sổ phía kênh, cuốn trôi cả mấy tầng kệ trên.',
        ],
        camera: { from: { zoom: 1.04, x: -3 }, to: { zoom: 1.14, x: 3 } },
        Art: () => (
          <>
            <Warehouse />
            <GradeFx color="#3a3a2a" opacity={0.25} />
            <WaterFx level={6} rise={false} opacity={0.4} color="#6a6450" />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · ngày 16/11',
        lines: ['Bà Lệ nộp hồ sơ đòi bồi thường cho cả kho.', 'Số tiền: bốn tỷ rưỡi.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: stampAt(claimDocs.length) }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={claimDocs} amount="4.500.000.000 đ" line="HỒ SƠ SỐ 1411 · 1.500 MÁY" />,
      },
      {
        lines: ['Năm cái tên quanh một cái kho.', 'Ai cũng có điều chưa nói hết.'],
        sfx: lineupPins(data.suspects.length),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 1411 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi bao nhiêu, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => <Investigator file="1411" choices={['CHI ĐỦ', 'CHI MỘT PHẦN', 'TỪ CHỐI']} />,
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 6" title="Đêm triều cường" under="Kho Mỹ Lệ · kênh Đôi, Quận 8" stamp="SỐ 1411" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: { kicker: 'Tòa án nhân dân Quận 8 · bốn tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    le: { kicker: 'Kho Mỹ Lệ · trước Tết' },
    nhat: { kicker: 'Một buổi sáng ở kho' },
    bong: { kicker: 'Bến Bình Đông' },
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    tu: { kicker: 'Bến Bình Đông · một tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    shop: { kicker: 'Quận 10 · trước Tết' },
  },
  unjust: {
    court: { kicker: 'Tòa án nhân dân Quận 8', sfx: [{ id: 'stamp', at: 3 }] },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
    khai: { kicker: 'Một tháng sau' },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    shop: { kicker: 'Quận 10 · cùng tuần đó' },
    file: { kicker: 'Ba tháng sau', sfx: [{ id: 'stamp', at: 1.6 }] },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return outroFrom('Chương 6 · Sau phán quyết', epilogue[endingId], notes[endingId], `outro-${endingId}`)
}
