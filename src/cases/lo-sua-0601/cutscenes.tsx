// Chapter 8's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Built from the shared parts in components/cutsceneParts.
import { GradeFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, Investigator, Lineup, OnDesk, lineupPins, lower, outroFrom, stampAt } from '@/components/cutsceneParts'
import type { CaseData } from '@/game/types'
import { isoSceneArt as sceneArt } from './iso/scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Line = sceneArt['xuong']
const Store = sceneArt['kho']
const Mart = sceneArt['sieu-thi']
const claimDocs = [documents['P2'], documents['P4']]

/** The opening: the factory, the letter, the recall, the claim, the people, the job. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 8 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Khu công nghiệp Tân Thới Hiệp · Quận 12',
        lines: ['Nhà máy sữa đậu nành Mộc An chạy ba ca, ngày cũng như đêm.', 'Mỗi chai ra khỏi dây chuyền đều mang một mã lô in trên nắp.'],
        camera: { from: { zoom: 1.2, x: -3 }, to: { zoom: 1.05, x: 2 } },
        Art: () => (
          <>
            <Line />
            <GradeFx color="#0b1222" opacity={0.35} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Cổng nhà máy · 08:15 ngày 11/1',
        lines: ['Sáng 11/1, bảo vệ nhận một lá thư bỏ trong hộp thư ở cổng.', '"Tao đã chích kim vào 100 chai Mộc An. Chuẩn bị 500 triệu."'],
        sfx: [{ id: 'paperPick', at: 0.6 }, { id: 'paperDrop', at: 4.5 }],
        duration: 6,
        camera: { from: { zoom: 1.04 }, to: { zoom: 1.14, y: 1 } },
        Art: () => <OnDesk Art={documents['P3']} width={44} />,
      },
      {
        kicker: 'Hiệp Thành Mart',
        lines: ['Giám đốc Đoàn Thị Ngọc Hà báo công an ngay buổi sáng.', 'Ngoài siêu thị, nhân viên gỡ từng chai Mộc An khỏi kệ.'],
        sfx: [{ id: 'footsteps', at: 1.4 }],
        camera: { from: { zoom: 1.14, x: 2 }, to: { zoom: 1.04, x: -2 } },
        Art: () => <Mart />,
      },
      {
        kicker: 'Kho thành phẩm',
        lines: ['Hai lô 0601-L2 và 0701-L1 bị thu hồi.', 'Hai trăm bốn mươi nghìn chai chất đầy kho, chờ tiêu hủy.'],
        camera: { from: { zoom: 1.06, x: -2 }, to: { zoom: 1.16, x: 2 } },
        Art: () => (
          <>
            <Store />
            <GradeFx color="#1b2230" opacity={0.2} />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · ngày 13/1',
        lines: ['Mộc An đòi bồi thường theo hợp đồng bảo hiểm thu hồi sản phẩm.', 'Số tiền: ba tỷ hai trăm triệu đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: stampAt(claimDocs.length) }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={claimDocs} amount="3.200.000.000 đ" line="HỒ SƠ SỐ 1201 · THU HỒI 240.000 CHAI" />,
      },
      {
        lines: ['Năm cái tên quanh một lô sữa.', 'Ai cũng có điều chưa nói hết.'],
        sfx: lineupPins(data.suspects.length),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 1201 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => <Investigator file="1201" />,
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 8" title="Lô sữa 0601" under="Sữa đậu nành Mộc An · Quận 12" stamp="SỐ 1201" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: { kicker: 'Tòa án nhân dân Quận 12 · bốn tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    ha: { kicker: 'Cổng nhà máy Mộc An' },
    sang: { kicker: 'Line 2 · ca đêm' },
    manh: { kicker: 'Trước Hiệp Thành Mart' },
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    thuan: { kicker: 'Phòng QC · mỗi sáng', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    shelf: { kicker: 'Nửa năm sau' },
  },
  unjust: {
    ha: { kicker: 'Bảo hiểm An Tín · phòng họp' },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
    thuan: { kicker: 'Một tháng sau' },
  },
  split: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    file: { kicker: 'Ba tháng sau', sfx: [{ id: 'stamp', at: 1.6 }] },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    thuan: { kicker: 'Tiệc cuối năm Mộc An' },
    again: { kicker: 'Ba tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return outroFrom('Chương 8 · Sau phán quyết', epilogue[endingId], notes[endingId], `outro-${endingId}`)
}
