// Chapter 12's two short films: the opening before the desk, and the film after the verdict.
import { GradeFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, DENY, Investigator, Lineup, OnDesk, PAY, verdictFilm } from '@/components/CutsceneKit'
import type { CaseData } from '@/game/types'
import { Watch, sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Hall = sceneArt['cau-thang']
const Study = sceneArt['phong-lam-viec']
const Yard = sceneArt['san-cong']

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/** The opening: the old villa, the lit study, the body at the stairs, the stopped watch. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 12 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Quận 3 · tối 13/4',
        lines: ['Hẻm Tú Xương, một căn biệt thự Pháp cũ.', 'Ông Trần Đình Hiển, 79 tuổi, kiến trúc sư về hưu, sống ở đây với những bản vẽ của mình.'],
        camera: { from: { zoom: 1.2, x: -3 }, to: { zoom: 1.04, x: 2 } },
        Art: () => (
          <>
            <Yard />
            <GradeFx color="#1a1230" opacity={0.45} />
          </>
        ),
      },
      {
        kicker: 'Đêm 13/4',
        lines: ['Trên gác, đèn phòng làm việc sáng tới khuya.'],
        camera: { from: { zoom: 1.05 }, to: { zoom: 1.18, x: -2, y: 1 } },
        Art: () => (
          <>
            <Study />
            <GradeFx color="#0b1222" opacity={0.4} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Sáng 14/4 · 06:25',
        lines: ['Sáng hôm sau, chú Tư mở cửa như mọi ngày.', 'Ông Hiển nằm dưới chân cầu thang gỗ.'],
        sfx: [{ id: 'footsteps', at: 0.4 }],
        camera: { from: { zoom: 1.04, y: -2 }, to: { zoom: 1.2, y: 3 } },
        Art: Hall,
      },
      {
        kicker: '22:47',
        lines: ['Chiếc Seiko trên tay ông vỡ kính, kim dừng lúc 22:47.', 'Công an ghi nhận ban đầu: ngã.'],
        sfx: [{ id: 'shutter', at: 1.4 }, { id: 'shutter', at: 2.6 }],
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.12, y: -2 } },
        Art: () => (
          <OnDesk width={46}>
            <svg viewBox="0 0 400 300" className="block w-full">
              <rect width="400" height="300" rx="6" fill="#e9dcc0" />
              <Watch x={200} y={140} r={95} />
            </svg>
          </OnDesk>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín',
        lines: ['Cháu trai ông, Trần Đình Khoa, đòi bảy tỷ tiền bảo hiểm tai nạn.', 'Lúc 22:47, anh đang nâng ly ở một tiệc cưới bên Quận 10.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={[documents['P1'], documents['P2']]} amount="7.000.000.000 đ" footer="HỒ SƠ SỐ 1304 · TAI NẠN TRẦN ĐÌNH HIỂN" />,
      },
      {
        lines: ['Năm người quanh căn biệt thự.', 'Và một chiếc đồng hồ đã thôi chạy.'],
        sfx: [0, 1, 2, 3, 4].map((i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: () => <Lineup only={['khoa', 'chau', 'tu', 'lien', 'thang']} />,
      },
      {
        lines: [
          `Hồ sơ số 1304 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => (
          <Investigator
            file="HỒ SƠ BỒI THƯỜNG SỐ 1304"
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
        Art: () => <TitleCard over="Chương 12" title="Đồng hồ dừng lúc 22:47" under="Biệt thự hẻm Tú Xương · Quận 3" stamp="SỐ 1304" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    file: {
      kicker: 'Bảo hiểm An Tín',
      lines: ['Hồ sơ 1304 đóng lại. Ông Hiển mất vì bệnh tim, không phải tai nạn.', 'Hồ sơ dựng hiện trường được chuyển cho công an.'],
      sfx: [{ id: 'stamp', at: 1 }],
    },
    court: {
      kicker: 'Tòa án nhân dân TP.HCM · bốn tháng sau',
      lines: ['Trần Đình Khoa ra tòa về tội gian lận bảo hiểm, không phải tội giết người.', 'Hai con ốc đồng và chiếc đồng hồ bị kéo núm nằm trên bàn vật chứng.'],
      sfx: [{ id: 'stamp', at: 4 }],
    },
    chau: { kicker: 'Biệt thự hẻm Tú Xương' },
    watch: { kicker: 'Một tuần sau', sfx: [{ id: 'click', at: 2 }] },
    tu: { kicker: 'Sáng Chủ nhật · 06:30' },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    khoa: { kicker: 'Một tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1.2 }] },
    player: { kicker: 'Nửa năm sau' },
  },
  framed: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    khoa: { kicker: 'Ba tháng sau' },
    player: { kicker: 'Phòng giám định' },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    khoa: { kicker: 'Một tuần sau' },
    chau: { kicker: 'Biệt thự hẻm Tú Xương', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return verdictFilm('Chương 12 · Sau phán quyết', endingId, epilogue[endingId], notes[endingId])
}
