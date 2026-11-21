// Chapter 5's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Built from the shared parts in components/cutsceneParts.
import { GradeFx, SirenFx, SmokeFx, TitleCard, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { ClaimDesk, HeadlightsFx, Investigator, Lineup, lineupPins, lower, outroFrom, stampAt } from '@/components/cutsceneParts'
import type { CaseData } from '@/game/types'
import { isoSceneArt as sceneArt } from './iso/scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Street = sceneArt['nguyen-van-huong']
const Canal = sceneArt['bo-kenh']
const claimDocs = [documents['P2'], documents['P3']]

/** The opening: two things that happened the same night, the claim, the people, the job. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 5 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Thảo Điền · 22:47 đêm 6/12',
        lines: ['Đường Nguyễn Văn Hưởng, gần mười một giờ đêm.', 'Một chiếc ô tô màu đen tông xe bánh mì của chị Đinh Thị Hoa, rồi bỏ chạy.'],
        camera: { from: { zoom: 1.22, x: -3 }, to: { zoom: 1.06, x: 2 } },
        Art: () => (
          <>
            <Street />
            <GradeFx color="#0b1222" opacity={0.55} />
            <HeadlightsFx delay={1.4} duration={1.6} />
          </>
        ),
      },
      {
        kicker: '22:55',
        lines: ['Chị Hoa được đưa vào bệnh viện Chợ Rẫy.', 'Dưới rãnh nước chỉ còn lại vụn kính vỡ.'],
        sfx: [{ id: 'footsteps', at: 1 }],
        camera: { from: { zoom: 1.1, x: 3 }, to: { zoom: 1.18, x: -2, y: 1 } },
        Art: () => (
          <>
            <Street />
            <GradeFx color="#0b1222" opacity={0.5} />
            <SirenFx opacity={0.5} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Thủ Thiêm · 02:52 sáng 7/12',
        lines: ['Bốn tiếng sau, cách đó bốn cây số, ông Trần Quang Khải gọi 113.', 'Chiếc Mercedes GLC của ông nằm dưới bờ kênh, đầu xe đâm vào gốc cây.'],
        camera: { from: { zoom: 1.25, x: 2, y: 2 }, to: { zoom: 1.08 } },
        Art: () => (
          <>
            <Canal />
            <GradeFx color="#0a1020" opacity={0.55} />
            <SmokeFx opacity={0.25} tint="#4a4f58" />
          </>
        ),
      },
      {
        kicker: 'Lời khai của chủ xe',
        lines: ['Ông khai đang từ Vũng Tàu về thì trời mưa to.', 'Một con bò băng ngang, ông đánh lái và mất lái. Ông chỉ trầy hai bàn tay.'],
        camera: { from: { zoom: 1.08, x: -2 }, to: { zoom: 1.16, x: 3 } },
        Art: () => (
          <>
            <Canal />
            <GradeFx color="#0a1020" opacity={0.48} />
            <SirenFx opacity={0.4} />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · ngày 8/12',
        lines: ['Ông Khải nộp hồ sơ đòi bồi thường toàn bộ chiếc xe.', 'Số tiền: hai tỷ một trăm triệu đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: stampAt(claimDocs.length) }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: () => <ClaimDesk docs={claimDocs} amount="2.100.000.000 đ" line="HỒ SƠ SỐ 0712 · XE 51K-686.68" />,
      },
      {
        kicker: 'Khách sạn Sông Xanh, Thảo Điền',
        lines: ['Một chủ khách sạn, con trai ông, bạn gái cậu, ông bảo vệ, chủ gara, và người phụ nữ nằm viện.', 'Ai cũng có điều chưa nói hết.'],
        sfx: lineupPins(data.suspects.length),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 0712 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: () => <Investigator file="0712" />,
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 5" title="Đêm Thủ Thiêm" under="Bờ kênh Thủ Thiêm · Thủ Đức" stamp="SỐ 0712" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    khoa: { kicker: 'Tòa án nhân dân TP.HCM · ba tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    khai: { kicker: 'Công an TP. Thủ Đức', sfx: [{ id: 'pen', at: 1.4 }] },
    hoa: { kicker: 'Góc Nguyễn Văn Hưởng · mùa Tết' },
    son: { kicker: 'Chốt bảo vệ khách sạn Sông Xanh' },
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    cold: { kicker: 'Đường Nguyễn Văn Hưởng · một tháng sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    car: { kicker: 'Thảo Điền · hai tuần sau' },
    cold: { kicker: 'Sáu tháng sau', sfx: [{ id: 'stamp', at: 2 }], fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  return outroFrom('Chương 5 · Sau phán quyết', epilogue[endingId], notes[endingId], `outro-${endingId}`)
}
