// Chapter 7's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Built from the shared parts in components/cutsceneParts.
import { GradeFx, RainFx, SirenFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, Investigator, Lineup, lineupPins, lower, outroFrom, stampAt } from '@/components/cutsceneParts'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Street = sceneArt['thuoc']
const Shop = sceneArt['tiem']
const claimDocs = [documents['P2'], documents['P4']]

/** The opening: the rainy evening, the robbery as the owner tells it, the claim, the people, the job. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 7 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Gò Vấp · tối 2/12',
        lines: ['Mưa to từ bảy rưỡi tối trên đường Quang Trung, Gò Vấp.', 'Gần chín giờ, tiệm vàng Kim Thành chuẩn bị kéo cửa cuốn.'],
        camera: { from: { zoom: 1.22, x: -3, y: 2 }, to: { zoom: 1.06 } },
        Art: () => (
          <>
            <Street />
            <GradeFx color="#0b1222" opacity={0.5} />
            <RainFx />
          </>
        ),
      },
      {
        kicker: '21:02 · theo lời bà chủ',
        lines: ['Bà chủ khai: hai tên đội mũ bảo hiểm, cầm dao, chui vào dưới cửa cuốn.', 'Chúng đập tủ kính, kề dao bắt bà mở két.'],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.2, x: -2, y: 1 } },
        Art: () => (
          <>
            <Shop />
            <GradeFx color="#1a0e0a" opacity={0.5} />
          </>
        ),
      },
      {
        kicker: '21:19',
        lines: ['Bà Huỳnh Thị Kim Loan gọi công an.', 'Khi xe tuần tra tới, tủ kính đã vỡ, két sắt mở toang.'],
        sfx: [{ id: 'footsteps', at: 1.2 }],
        camera: { from: { zoom: 1.14, x: -2 }, to: { zoom: 1.04, x: 2 } },
        Art: () => (
          <>
            <Shop />
            <GradeFx color="#0b1222" opacity={0.4} />
            <SirenFx opacity={0.55} />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · ngày 3/12',
        lines: ['Bà Loan kê bốn mươi lăm lượng vàng trong tủ và trong két.', 'Số tiền: sáu tỷ ba trăm triệu đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: stampAt(claimDocs.length) }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={claimDocs} amount="6.300.000.000 đ" line="HỒ SƠ SỐ 0212 · 45 LƯỢNG VÀNG" />,
      },
      {
        lines: ['Năm cái tên quanh một tiệm vàng.', 'Ai cũng có điều chưa nói hết.'],
        sfx: lineupPins(data.suspects.length),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 0212 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => <Investigator file="0212" />,
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 7" title="Tiệm vàng Kim Thành" under="Đường Quang Trung · Gò Vấp" stamp="SỐ 0212" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: { kicker: 'Tòa án nhân dân TP.HCM · năm tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    bag: { kicker: 'Phòng trọ của Tài · ngày khám xét' },
    hung: { kicker: 'Nhà ông Hùng · ba tháng sau' },
    lanh: { kicker: 'Đầu hẻm 514' },
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    tai: { kicker: 'Đường Quang Trung · một tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    hung: { kicker: 'Công an phường 10' },
  },
  partpaid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    shop: { kicker: 'Đường Quang Trung · một tháng sau' },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    shop: { kicker: 'Tiệm Kim Thành · trước Tết' },
    file: { kicker: 'Nửa năm sau', sfx: [{ id: 'stamp', at: 1.6 }] },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return outroFrom('Chương 7 · Sau phán quyết', epilogue[endingId], notes[endingId], `outro-${endingId}`)
}
