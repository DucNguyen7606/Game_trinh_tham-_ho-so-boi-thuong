// Chapter 10's two short films: the opening before the desk, and the film after the verdict.
import { GradeFx, SmokeFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, DENY, Investigator, Lineup, PAY, verdictFilm } from '@/components/CutsceneKit'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const ColdRoom = sceneArt['phong-lanh']
const Apron = sceneArt['san-do']
const Yard = sceneArt['hung-thinh']

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/** The opening: the flight lands, the cold room, the red logger, the claim. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 10 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Tân Sơn Nhất · trưa 15/11',
        lines: ['Chuyến hàng từ Frankfurt hạ cánh giữa trưa nắng.', 'Trên một pallet: 1.200 lọ thuốc ung thư Herzena, phải giữ từ 2 đến 8 độ.'],
        sfx: [{ id: 'footsteps', at: 2.2 }],
        camera: { from: { zoom: 1.2, x: -3, y: 1 }, to: { zoom: 1.04, x: 2 } },
        Art: () => (
          <>
            <Apron />
            <GradeFx color="#ffd38a" opacity={0.12} blend="screen" />
          </>
        ),
      },
      {
        kicker: 'Kho lạnh Tân Sơn Cargo',
        lines: ['Pallet được đưa vào phòng lạnh số 3.', 'Hai đêm trôi qua, không ai báo điều gì.'],
        camera: { from: { zoom: 1.05, x: 2 }, to: { zoom: 1.18, x: -2 } },
        Art: () => (
          <>
            <ColdRoom />
            <GradeFx color="#0d1c2e" opacity={0.4} />
            <SmokeFx opacity={0.25} tint="#cfe3f2" />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Sáng 17/11 · 09:03',
        lines: ['Dược sĩ của Minh Tâm tới nhận hàng.', 'Chiếc nhiệt kế trên nắp thùng báo đỏ: 33 độ, gần ba tiếng.'],
        sfx: [{ id: 'shutter', at: 1.6 }],
        camera: { from: { zoom: 1.08 }, to: { zoom: 1.26, y: 2 } },
        Art: () => (
          <>
            <ColdRoom />
            <GradeFx color="#3a0b0b" opacity={0.18} blend="screen" />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín',
        lines: ['Minh Tâm đòi bồi thường bốn tỷ sáu.', 'Cả lô bị niêm phong, chờ đem đi đốt ngày 28/11.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={[documents['P2'], documents['P4']]} amount="4.600.000.000 đ" footer="HỒ SƠ SỐ 1511 · LÔ HERZENA HZ-2509" />,
      },
      {
        kicker: 'Bình Chánh',
        lines: ['Ở ngoại thành, một lò đốt rác y tế đã nhận lời tiêu hủy.'],
        camera: { from: { zoom: 1.04, x: -2 }, to: { zoom: 1.14, x: 2 } },
        Art: () => (
          <>
            <Yard />
            <GradeFx color="#1a1410" opacity={0.25} />
          </>
        ),
      },
      {
        lines: ['Năm cái tên quanh một pallet thuốc.', 'Ai cũng có lý do để nó hỏng, hoặc để nó không hỏng.'],
        sfx: [0, 1, 2, 3, 4].map((i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: () => <Lineup />,
      },
      {
        lines: [
          `Hồ sơ số 1511 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để đề xuất, trước khi lò đốt nhận hàng.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => (
          <Investigator
            file="HỒ SƠ BỒI THƯỜNG SỐ 1511"
            choices={[
              { text: 'CHI TRẢ', color: PAY },
              { text: 'TỪ CHỐI', color: DENY },
            ]}
          />
        ),
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 10" title="Ba mươi ba độ" under="Kho lạnh Tân Sơn Cargo · Tân Bình" stamp="SỐ 1511" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    hospital: {
      kicker: 'Bệnh viện Ung bướu · 26/11',
      lines: ['Ngày 26/11, 1.200 lọ Herzena về tới khoa Dược.', '64 bệnh nhân bắt đầu đợt điều trị tháng 12 đúng hẹn.'],
    },
    court: { kicker: 'Tòa án nhân dân TP.HCM', sfx: [{ id: 'stamp', at: 3.6 }] },
    linh: { kicker: 'Minh Tâm · phòng đảm bảo chất lượng', sfx: [{ id: 'pen', at: 1.2 }] },
    loc: { kicker: 'Sân đỗ Tân Sơn Nhất' },
    file: {
      kicker: 'Bảo hiểm An Tín',
      lines: ['Hồ sơ 1511 đóng lại.', 'An Tín chỉ trả 38 triệu phí kiểm nghiệm, và không lọ thuốc nào bị đốt.'],
      sfx: [{ id: 'stamp', at: 1 }],
    },
  },
  half: {
    hospital: { kicker: 'Bệnh viện Ung bướu' },
    hung: { kicker: 'Ba tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    tung: { kicker: 'Phòng lạnh số 3 · ca đêm', fx: <GradeFx color="#0d1c2e" opacity={0.35} /> },
  },
  burned: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    truck: { kicker: 'Ngày 28/11', fx: <SmokeFx opacity={0.3} /> },
    market: { kicker: 'Một tháng sau' },
  },
  split: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    thu: { kicker: 'Minh Tâm' },
    truck: { kicker: 'Ngày 28/11', fx: <SmokeFx opacity={0.3} /> },
  },
  unjust: {
    court: { kicker: 'Tòa án nhân dân TP.HCM', sfx: [{ id: 'stamp', at: 3 }] },
    player: { kicker: 'Phòng giám định' },
    market: { kicker: 'Vài tuần sau' },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return verdictFilm('Chương 10 · Sau phán quyết', endingId, epilogue[endingId], notes[endingId])
}
