// Chapter 1's two short films: the opening that sets up the case before the desk,
// and what happens after the verdict, one film per ending.
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import {
  EmbersFx,
  FlamesFx,
  GradeFx,
  RainFx,
  SirenFx,
  SmokeFx,
  TitleCard,
  epilogueShots,
  type Cutscene,
  type EpilogueNote,
} from '@/components/Cutscene'
import { useGame } from '@/game/store'
import type { CaseData } from '@/game/types'
import { isoSceneArt as sceneArt } from './iso/scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Gate = sceneArt['cong']
const Hall = sceneArt['khu-hang']

/** Papers dropped on the desk one after another, with a claim slip on top. */
function ClaimDesk() {
  const P2 = documents['P2']
  const P4 = documents['P4']
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]">
      <div className="absolute left-[6%] top-[-30%] size-[70%] rounded-full bg-amber/15 blur-3xl" />
      <motion.div
        className="absolute left-[14%] top-[12%] w-[26%]"
        initial={{ opacity: 0, y: -120, rotate: -14 }}
        animate={{ opacity: 1, y: 0, rotate: -4, transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        <P4 />
      </motion.div>
      <motion.div
        className="absolute left-[40%] top-[8%] w-[27%]"
        initial={{ opacity: 0, y: -140, rotate: 12 }}
        animate={{ opacity: 1, y: 0, rotate: 3, transition: { delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        <P2 />
      </motion.div>
      {/* The claim amount, stamped across the papers. */}
      <motion.div
        className="title absolute right-[9%] top-[26%] rounded border-4 border-[#c4452d] bg-[#f6ead2]/90 px-6 py-3 text-center text-[#b23a2e] shadow-2xl"
        initial={{ opacity: 0, scale: 2.4, rotate: -16 }}
        animate={{ opacity: 1, scale: 1, rotate: -7, transition: { delay: 2.9, duration: 0.22, ease: [0.5, 0, 1, 1] } }}
      >
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">YÊU CẦU BỒI THƯỜNG</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">4.000.000.000 đ</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">HỒ SƠ SỐ 0714 · KHO THỊNH PHÁT</p>
      </motion.div>
    </div>
  )
}

/** The five names in the file, laid down one by one like photos pinned to a board. */
function Lineup() {
  const suspects = useGame((s) => s.data.suspects)
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2%] bg-[linear-gradient(180deg,#d6cfee,#f7dccb)] px-[5%]">
      {suspects.map((s, i) => (
        <motion.figure
          key={s.id}
          className="document w-[17%] shrink-0 p-[0.6%] pb-[1%]"
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: [-2.5, 1.5, -1, 2, -1.5][i], transition: { delay: 0.4 + i * 0.9, duration: 0.5 } }}
        >
          {s.portrait && <Portrait spec={s.portrait} size={240} live className="h-auto w-full" />}
          <figcaption className="mt-1.5 px-1 leading-tight">
            <span className="title block text-[clamp(10px,1.15vw,17px)]">{s.name}</span>
            <span className="block text-[clamp(8px,0.85vw,12px)] opacity-70">{s.role}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

/** The investigator under the desk lamp, the file in front of them. */
function Investigator() {
  const player = useGame((s) => s.data.player)
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]">
      <div className="absolute left-[18%] top-[-20%] size-[60%] rounded-full bg-amber/20 blur-3xl" />
      {player.portrait && (
        <div className="absolute bottom-[-6%] left-[12%] w-[34%]">
          <Portrait spec={player.portrait} size={400} live bare className="h-auto w-full" />
        </div>
      )}
      <motion.div
        className="document absolute right-[12%] top-[20%] w-[34%] p-[2%]"
        initial={{ opacity: 0, x: 80, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 2, transition: { delay: 0.6, duration: 0.7 } }}
      >
        <p className="title text-[clamp(14px,1.8vw,28px)]">HỒ SƠ BỒI THƯỜNG SỐ 0714</p>
        <p className="mt-2 text-[clamp(9px,1vw,14px)]">Người phụ trách: {player.name}</p>
        <div className="mt-3 space-y-2">
          {[90, 70, 84, 60].map((w, i) => (
            <div key={i} className="h-[3px] bg-[#b89b6c]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex gap-3 text-[clamp(9px,1vw,14px)]">
          <span className="rounded border-2 border-[#3f6f4f] px-2 text-[#3f6f4f]">CHI TRẢ</span>
          <span className="opacity-60">hay</span>
          <span className="rounded border-2 border-[#b23a2e] px-2 text-[#b23a2e]">TỪ CHỐI</span>
        </div>
      </motion.div>
    </div>
  )
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/** The opening: the night of the fire, the claim, the people, the job. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 1 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Bình Tân · đêm 14/7',
        lines: ['Mưa dầm từ chập tối trên dãy kho xưởng ven quận Bình Tân.', 'Kho vải Thịnh Phát đóng cửa từ mười giờ. Chỉ còn ông bảo vệ trong chòi.'],
        camera: { from: { zoom: 1.25, x: -4, y: 2 }, to: { zoom: 1.06 } },
        Art: () => (
          <>
            <Gate />
            <GradeFx color="#0b1222" opacity={0.5} />
            <RainFx />
          </>
        ),
      },
      {
        enter: 'flash',
        kicker: '02:38',
        lines: ['Hai giờ ba mươi tám phút sáng, lửa bùng lên bên trong kho.', 'Vải cháy rất nhanh. Chỉ vài phút, mái tôn đã đỏ rực.'],
        camera: { from: { zoom: 1.08, y: -1 }, to: { zoom: 1.2, y: 2 } },
        Art: () => (
          <>
            <Hall />
            <GradeFx color="#1a0a06" opacity={0.55} />
            <FlamesFx base={70} height={1.3} />
            <SmokeFx opacity={0.6} tint="#2a1e1a" />
            <EmbersFx count={55} />
          </>
        ),
      },
      {
        kicker: '02:41',
        lines: ['Hàng xóm gọi 114.', 'Khi xe chữa cháy len được vào hẻm, nửa khu hàng đã thành than.'],
        sfx: [{ id: 'footsteps', at: 1.2 }],
        camera: { from: { zoom: 1.12, x: 3 }, to: { zoom: 1.04, x: -2 } },
        Art: () => (
          <>
            <Gate />
            <GradeFx color="#0b1222" opacity={0.45} />
            <SirenFx opacity={0.55} />
            <SmokeFx opacity={0.45} />
            <RainFx count={60} opacity={0.25} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Sáng 15/7',
        lines: ['Trời sáng. Lính cứu hỏa lập biên bản sơ bộ: nguyên nhân chưa rõ.'],
        sfx: [{ id: 'shutter', at: 1.4 }, { id: 'shutter', at: 2.6 }],
        camera: { from: { zoom: 1.04, x: -3 }, to: { zoom: 1.14, x: 3 } },
        Art: () => (
          <>
            <Hall />
            <SmokeFx opacity={0.35} tint="#6a625c" />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · ba ngày sau',
        lines: ['Ba ngày sau, chủ kho Quách Thịnh nộp hồ sơ đòi bồi thường.', 'Số tiền: bốn tỷ đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: ClaimDesk,
      },
      {
        lines: ['Năm cái tên trong hồ sơ.', 'Ai cũng có điều chưa nói hết.'],
        sfx: [0, 1, 2, 3, 4].map((i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 0714 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
          `${data.days} ngày để quyết định: chi trả, hay từ chối.`,
        ],
        sfx: [{ id: 'pageTurn', at: 0.6 }],
        camera: { from: { zoom: 1.08, x: 2 }, to: { zoom: 1.02 } },
        Art: Investigator,
      },
      {
        enter: 'black',
        duration: 6,
        sfx: [{ id: 'stamp', at: 2.4 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.04 } },
        Art: () => <TitleCard over="Chương 1" title="Hồ sơ bồi thường" under="Kho vải Thịnh Phát · Bình Tân" stamp="SỐ 0714" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    court: {
      kicker: 'Tòa án nhân dân TP.HCM · bốn tháng sau',
      lines: [
        'Bốn tháng sau, Phan Quốc Bảo đứng trước vành móng ngựa.',
        'Tội hủy hoại tài sản, và tham ô 620 triệu qua Công ty Hưng Long.',
      ],
      sfx: [{ id: 'stamp', at: 3.6 }],
    },
    thinh: {
      kicker: 'Công an quận Bình Tân',
      lines: ['Ông Thịnh ký biên bản nhận tội gian lận bảo hiểm.', 'Lần đầu tiên, người ta thấy ông tháo chiếc đồng hồ vàng.'],
      sfx: [{ id: 'pen', at: 1.2 }],
    },
    ro: {
      kicker: 'Kho Thịnh Phát · một buổi sáng',
      lines: ['Ông Tư Rô được giữ lại làm bảo vệ, nhờ bạn nói đỡ một tiếng.', 'Bình trà thay cho chai rượu. Sổ trực ca ghi đủ từng giờ.'],
    },
    ngan: {
      kicker: 'Tối hôm đó',
      lines: ['Ngân được minh oan.', 'Buổi livestream tối đó đông gấp năm lần thường lệ.'],
    },
    file: {
      kicker: 'Bảo hiểm An Tín',
      lines: ['Hồ sơ 0714 đóng lại. Công ty không phải chi bốn tỷ đồng.', 'Toàn bộ hồ sơ được chuyển sang cơ quan điều tra.'],
      sfx: [{ id: 'stamp', at: 1 }],
    },
  },
  half: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 0.8 }] },
    thinh: {
      kicker: 'Tòa án nhân dân TP.HCM',
      lines: ['Ông Thịnh bị khởi tố cả tội đốt kho.', 'Đến phút cuối ông vẫn thề rằng mình đã hủy "vụ 20".'],
    },
    bao: {
      kicker: 'Một tuần sau',
      lines: ['Một tuần sau, phòng trọ của Bảo đã trống trơn.', 'Không ai biết anh đi đâu.'],
      fx: <GradeFx color="#1b2230" opacity={0.3} />,
    },
  },
  wrong: {
    file: { kicker: 'Hai tuần sau', sfx: [{ id: 'stamp', at: 1.4 }] },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
  },
  paid: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    longan: {
      kicker: 'Đức Hòa, Long An · ba tháng sau',
      lines: ['Ba tháng sau, kiểm toán mở cửa một kho thuê ở Long An.', '412 cuộn vải nằm nguyên. Chưa từng cháy.'],
    },
    file: { kicker: 'Phòng giám định', sfx: [{ id: 'stamp', at: 1 }] },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  const panels = epilogue[endingId]
  if (!panels) return undefined
  return {
    id: `outro-${endingId}`,
    label: 'Chương 1 · Sau phán quyết',
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#d6cfee,#f7dccb)]" />
        ),
      },
      ...epilogueShots(panels, notes[endingId]),
    ],
  }
}
