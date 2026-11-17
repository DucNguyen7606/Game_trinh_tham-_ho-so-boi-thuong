// Chapter 9's two short films: the opening before the desk, and the film after the verdict.
import { GradeFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, DENY, Investigator, Lineup, PAY, verdictFilm } from '@/components/CutsceneKit'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Bedroom = sceneArt['phong-ngu']
const Living = sceneArt['phong-khach']
const Corridor = sceneArt['hanh-lang']

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/** The opening: the empty flat at night, the open safe, the claim, the people. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 9 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Bình Thạnh · đêm 20/12',
        lines: ['Chung cư Riverlight, tầng 27. Hành lang vắng, đèn cảm ứng tắt dần.', 'Chủ căn 27.08 đã bay ra Hà Nội từ chiều.'],
        camera: { from: { zoom: 1.22, x: -3 }, to: { zoom: 1.05, x: 2 } },
        Art: () => (
          <>
            <Corridor />
            <GradeFx color="#0b1222" opacity={0.55} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Đêm 20 rạng sáng 21/12',
        lines: ['Trong căn hộ không một bóng người.', 'Đến sáng, cánh cửa két sắt trong phòng ngủ đã mở toang.'],
        camera: { from: { zoom: 1.06, y: 1 }, to: { zoom: 1.22, x: 3, y: -1 } },
        Art: () => (
          <>
            <Bedroom />
            <GradeFx color="#0a0f1e" opacity={0.6} />
          </>
        ),
      },
      {
        kicker: 'Sáng 21/12',
        lines: ['Chị Lâm Bảo Ngọc về tới nhà lúc gần chín giờ.', 'Hai chiếc đồng hồ và một bộ kim cương đã biến mất.'],
        sfx: [{ id: 'footsteps', at: 0.6 }],
        camera: { from: { zoom: 1.12, x: 3 }, to: { zoom: 1.03, x: -2 } },
        Art: Living,
      },
      {
        kicker: 'Công an phường',
        lines: ['Cửa không bị phá. Két không bị cạy. Ban công chốt trong.', 'Biên bản ghi một dòng: người lấy có mã, hoặc có chìa.'],
        sfx: [{ id: 'shutter', at: 1.2 }, { id: 'shutter', at: 2.4 }],
        camera: { from: { zoom: 1.04, x: -3 }, to: { zoom: 1.16, x: 2 } },
        Art: Bedroom,
      },
      {
        kicker: 'Bảo hiểm An Tín',
        lines: ['Chiều hôm đó, chị Ngọc nộp hồ sơ đòi ba tỷ hai.', 'Chị đang nợ ngân hàng. Món bảo hiểm này mới mua một tháng trước.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={[documents['P1'], documents['P2']]} amount="3.200.000.000 đ" footer="HỒ SƠ SỐ 2112 · CĂN 27.08 RIVERLIGHT" />,
      },
      {
        lines: ['Năm cái tên quanh căn hộ 27.08.', 'Người thì có lối vào, người thì có lý do.'],
        sfx: [0, 1, 2, 3, 4].map((i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: () => <Lineup />,
      },
      {
        lines: [
          `Hồ sơ số 2112 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `Mọi thứ đều giống gian lận. ${data.days} ngày để biết có đúng vậy không.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => (
          <Investigator
            file="HỒ SƠ BỒI THƯỜNG SỐ 2112"
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
        Art: () => <TitleCard over="Chương 9" title="Căn hộ tầng 27" under="Chung cư Riverlight · Bình Thạnh" stamp="SỐ 2112" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: {
      kicker: 'Tòa án nhân dân TP.HCM · ba tháng sau',
      lines: ['Trịnh Hoàng Vũ ra tòa về tội trộm cắp tài sản.', 'Chiếc Patek và bộ kim cương nằm trong tủ đồ ở phòng trọ của anh.'],
      sfx: [{ id: 'stamp', at: 3.4 }],
    },
    ngoc: {
      kicker: 'Một buổi live tối thứ bảy',
      lines: ['Chị Ngọc nhận đủ ba tỷ hai, trả xong nợ ngân hàng.', 'Giờ chiếc két quay lưng về phía ống kính.'],
    },
    hai: { kicker: 'Căn 27.08 · buổi sáng' },
    sang: { kicker: 'Ban quản lý Riverlight', sfx: [{ id: 'pen', at: 1.4 }] },
    file: {
      kicker: 'Bảo hiểm An Tín',
      lines: ['Hồ sơ 2112 đóng lại. An Tín chi trả đủ.', 'Rồi thay chị Ngọc đòi lại tiền từ kẻ trộm.'],
      sfx: [{ id: 'stamp', at: 1 }],
    },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    ngoc: { kicker: 'Tối hôm sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    vu: { kicker: 'Hầm B2 · ca đêm', fx: <GradeFx color="#0b1222" opacity={0.35} /> },
  },
  cut: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    ngoc: { kicker: 'Cục Quản lý bảo hiểm · một tháng sau', sfx: [{ id: 'paperDrop', at: 1 }] },
    player: { kicker: 'Phòng giám định' },
  },
  unjust: {
    court: { kicker: 'Tòa án nhân dân TP.HCM', sfx: [{ id: 'stamp', at: 3 }] },
    live: { kicker: 'Mạng xã hội' },
    shop: { kicker: 'Lê Văn Sỹ, Tân Bình', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return verdictFilm('Chương 9 · Sau phán quyết', endingId, epilogue[endingId], notes[endingId])
}
