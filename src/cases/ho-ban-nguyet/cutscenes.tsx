// Chapter 11's two short films: the opening before the desk, and the film after the verdict.
import { GradeFx, SirenFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, DENY, Investigator, Lineup, OTHER, PAY, verdictFilm } from '@/components/CutsceneKit'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Balcony = sceneArt['ban-cong']
const Living = sceneArt['phong-khach']
const Garden = sceneArt['san-duoi']

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/** The opening: the lake at night, the fall, the claim and the question of who is paid. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 11 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Phú Mỹ Hưng · đêm 14/3',
        lines: ['Hồ Bán Nguyệt về đêm. Gió nhẹ, trời không mưa.', 'Trên tầng 21 tòa B chung cư Sen Hồng, đèn căn 21.05 còn sáng.'],
        camera: { from: { zoom: 1.2, y: 2 }, to: { zoom: 1.04, y: -1 } },
        Art: () => (
          <>
            <Garden />
            <GradeFx color="#0b1222" opacity={0.55} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: '23:41',
        lines: ['Mười một giờ bốn mươi mốt phút.', 'Một tiếng rơi nặng vang lên dưới vườn phía Đông.'],
        camera: { from: { zoom: 1.04 }, to: { zoom: 1.2, y: 3 } },
        Art: () => (
          <>
            <Balcony />
            <GradeFx color="#0a0f1e" opacity={0.6} />
          </>
        ),
      },
      {
        kicker: '23:43',
        lines: ['Bảo vệ gọi 115.', 'Ông Đặng Quốc Hưng, giám đốc Hưng Toàn Logistics, đã không còn thở.'],
        sfx: [{ id: 'footsteps', at: 0.8 }],
        camera: { from: { zoom: 1.12, x: 3 }, to: { zoom: 1.03, x: -2 } },
        Art: () => (
          <>
            <Garden />
            <GradeFx color="#0b1222" opacity={0.45} />
            <SirenFx opacity={0.5} />
          </>
        ),
      },
      {
        kicker: 'Sáng 15/3',
        lines: ['Công an phường nghiêng về tự tử.', 'Công ty của ông đang nợ ngân hàng chín tỷ.'],
        sfx: [{ id: 'shutter', at: 1.2 }, { id: 'shutter', at: 2.4 }],
        camera: { from: { zoom: 1.04, x: -3 }, to: { zoom: 1.14, x: 3 } },
        Art: Living,
      },
      {
        kicker: 'Bảo hiểm An Tín',
        lines: ['Em trai ông, người thụ hưởng, đòi sáu tỷ: "Anh tôi trượt chân."', 'Hợp đồng mới mười bốn tháng. Nếu là tự tử, An Tín chỉ hoàn phí.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={[documents['P1'], documents['P2']]} amount="6.000.000.000 đ" footer="HỒ SƠ SỐ 1403 · NHÂN THỌ ĐẶNG QUỐC HƯNG" />,
      },
      {
        lines: ['Năm người quanh ông Hưng đêm đó.', 'Có người nợ ông, có người ông nợ.'],
        sfx: [0, 1, 2, 3, 4].map((i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: () => <Lineup />,
      },
      {
        lines: [
          `Hồ sơ số 1403 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, cho ai, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => (
          <Investigator
            file="HỒ SƠ BỒI THƯỜNG SỐ 1403"
            choices={[
              { text: 'CHI TRẢ', color: PAY },
              { text: 'HOÀN PHÍ', color: OTHER },
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
        Art: () => <TitleCard over="Chương 11" title="Đêm bên hồ Bán Nguyệt" under="Chung cư Sen Hồng · Quận 7" stamp="SỐ 1403" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: {
      kicker: 'Tòa án nhân dân TP.HCM · năm tháng sau',
      lines: ['Đặng Quốc Toàn ra tòa về tội giết người.', 'Vợ anh bị điều tra trong vụ rút 7,1 tỷ qua công ty Thành Đạt.'],
      sfx: [{ id: 'stamp', at: 3.4 }],
    },
    transfer: {
      kicker: 'Bảo hiểm An Tín',
      lines: ['Sáu tỷ được chuyển vào tài khoản đứng tên Đặng Bảo Vy.', 'Mẹ cháu giữ hộ tới năm cháu mười tám tuổi.'],
      sfx: [{ id: 'click', at: 1.2 }],
    },
    truc: { kicker: 'Đà Nẵng · 20/3' },
    quyen: { kicker: 'Hưng Toàn Logistics', sfx: [{ id: 'pageTurn', at: 1 }] },
    phuc: { kicker: 'Cảng Tân Thuận' },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    toan: { kicker: 'Tòa án nhân dân TP.HCM', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    toan: { kicker: 'Tang lễ ông Hưng' },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    toan: { kicker: 'Một tuần sau' },
    truc: { kicker: 'Quận 7', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  refunded: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
    truc: { kicker: 'Nhiều năm sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
    toan: { kicker: 'Cảng Tân Thuận · tối thứ bảy' },
  },
  denied: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
    truc: { kicker: 'Tòa án nhân dân TP.HCM', sfx: [{ id: 'stamp', at: 3 }] },
    player: { kicker: 'Phòng giám định' },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return verdictFilm('Chương 11 · Sau phán quyết', endingId, epilogue[endingId], notes[endingId])
}
