// Chapter 2's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Same player and helpers as Chapter 1 (src/components/Cutscene).
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import { GradeFx, RainFx, SirenFx, SmokeFx, TitleCard, epilogueShots, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { useGame } from '@/game/store'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Landing = sceneArt['ben-ghe']
const House = sceneArt['nha']

/** The river at night: dark water, a far bank of mangroves, a lamp on a fishing boat. */
function NightRiver({ moving }: { moving?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(#070d18,#0f1c2b_55%,#0a141f)]">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {/* Stars and a low moon */}
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={(i * 397) % 1600} cy={(i * 131) % 330} r={i % 5 === 0 ? 2 : 1.2} fill="#cfd8e6" opacity={0.25 + (i % 4) * 0.12} />
        ))}
        <circle cx="1240" cy="170" r="46" fill="#e8e1c8" opacity="0.85" />
        {/* Mangrove bank */}
        <path d="M0,470 Q120,420 240,450 T480,440 T760,455 T1040,430 T1320,450 T1600,440 L1600,520 L0,520 Z" fill="#050a0f" />
        {/* Water */}
        <rect y="515" width="1600" height="385" fill="#0b1824" />
        {Array.from({ length: 14 }, (_, i) => (
          <motion.rect
            key={i}
            x={(i * 233) % 1500}
            y={560 + (i % 7) * 46}
            width={90 + (i % 3) * 40}
            height="2"
            fill="#c9d4e0"
            opacity={0.18}
            animate={{ x: [(i * 233) % 1500, ((i * 233) % 1500) + (moving ? -120 : 30)] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        ))}
        {/* Moon on the water */}
        <rect x="1210" y="560" width="60" height="3" fill="#e8e1c8" opacity="0.4" />
        <rect x="1225" y="590" width="34" height="2" fill="#e8e1c8" opacity="0.3" />
        {/* A small wooden boat with a lamp */}
        <motion.g animate={{ x: moving ? [0, 160] : [0, 0], y: [0, 4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M520,640 L800,640 L760,690 L560,690 Z" fill="#2a1c14" stroke="#0a0806" strokeWidth="3" />
          <rect x="610" y="600" width="90" height="40" fill="#3b2a1e" stroke="#0a0806" strokeWidth="3" />
          <circle cx="720" cy="596" r="7" fill="#ffd27a" />
          <circle cx="720" cy="596" r="40" fill="#ffd27a" opacity="0.12" />
        </motion.g>
      </svg>
    </div>
  )
}

/** Morning on the mud flats at Cần Thạnh: grey sea, a stretcher of police tape, no body shown. */
function MudFlat() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(#9aa4a8,#c9c3b3_55%,#8a7d68)]">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <rect y="380" width="1600" height="120" fill="#6f7f86" />
        <path d="M0,500 Q400,470 800,500 T1600,490 L1600,900 L0,900 Z" fill="#7a6a54" />
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} cx={120 + i * 170} cy={600 + (i % 3) * 70} rx={60 + (i % 4) * 20} ry={8} fill="#5d5040" opacity="0.6" />
        ))}
        {/* Police tape between two stakes */}
        <rect x="560" y="560" width="8" height="120" fill="#3b2f25" />
        <rect x="1040" y="580" width="8" height="110" fill="#3b2f25" />
        <path d="M564,580 Q800,610 1044,598" stroke="#e6c229" strokeWidth="10" fill="none" />
        <path d="M564,580 Q800,610 1044,598" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeDasharray="18 22" />
        {/* A pair of rubber boots and a tarp, at a distance */}
        <rect x="760" y="640" width="120" height="26" rx="6" fill="#4a5a52" />
      </svg>
    </div>
  )
}

/** Papers dropped on the desk one after another, with the claim amount stamped on top. */
function ClaimDesk() {
  const A = documents['P1']
  const B = documents['P3']
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_42%_30%,#5a4636,#15100d_75%)]">
      <div className="absolute left-[6%] top-[-30%] size-[70%] rounded-full bg-amber/15 blur-3xl" />
      <motion.div
        className="absolute left-[12%] top-[10%] w-[28%]"
        initial={{ opacity: 0, y: -120, rotate: -14 }}
        animate={{ opacity: 1, y: 0, rotate: -4, transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        <A />
      </motion.div>
      <motion.div
        className="absolute left-[40%] top-[12%] w-[26%]"
        initial={{ opacity: 0, y: -140, rotate: 12 }}
        animate={{ opacity: 1, y: 0, rotate: 3, transition: { delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        <B />
      </motion.div>
      <motion.div
        className="title absolute right-[8%] top-[28%] rounded border-4 border-[#c4452d] bg-[#f6ead2]/90 px-6 py-3 text-center text-[#b23a2e] shadow-2xl"
        initial={{ opacity: 0, scale: 2.4, rotate: -16 }}
        animate={{ opacity: 1, scale: 1, rotate: -7, transition: { delay: 2.9, duration: 0.22, ease: [0.5, 0, 1, 1] } }}
      >
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">BẢO HIỂM NHÂN THỌ</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">5.000.000.000 đ</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">HỒ SƠ SỐ 0909 · VỰA LỰC PHÁT</p>
      </motion.div>
    </div>
  )
}

/** The names in the file, laid down one by one like photos pinned to a board. */
function Lineup() {
  const suspects = useGame((s) => s.data.suspects)
  const tilt = [-2.5, 1.5, -1, 2, -1.5, 1]
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2%] bg-[radial-gradient(circle_at_50%_40%,#33404a,#0c1014_75%)] px-[5%]">
      {suspects.map((s, i) => (
        <motion.figure
          key={s.id}
          className="document w-[17%] shrink-0 p-[0.6%] pb-[1%]"
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: tilt[i % tilt.length], transition: { delay: 0.4 + i * 0.9, duration: 0.5 } }}
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
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_30%_25%,#6a5038,#15100d_70%)]">
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
        <p className="title text-[clamp(14px,1.8vw,28px)]">HỒ SƠ BỒI THƯỜNG SỐ 0909</p>
        <p className="mt-2 text-[clamp(9px,1vw,14px)]">Người phụ trách: {player.name}</p>
        <div className="mt-3 space-y-2">
          {[86, 64, 90, 58].map((w, i) => (
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

/** The opening: the night on the river, the boat, the body, the claim. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 2 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Cần Giờ · đêm 9/9',
        lines: ['Đêm 9/9, trời lặng, gió nhẹ trên con sông chảy ra biển Cần Giờ.', 'Ông Trương Văn Lực, chủ vựa hải sản Lực Phát, ra thăm đáy như mọi đêm.'],
        camera: { from: { zoom: 1.2, x: -3 }, to: { zoom: 1.04, x: 2 } },
        Art: () => <NightRiver moving />,
      },
      {
        kicker: 'Nhà ông Lực',
        lines: ['Ở nhà, vợ ông chờ tới khuya.', 'Ông không về.'],
        sfx: [{ id: 'click', at: 2.2, gain: 0.5 }],
        camera: { from: { zoom: 1.1, x: 2 }, to: { zoom: 1.18, x: -1, y: 1 } },
        Art: () => (
          <>
            <House />
            <GradeFx color="#0b1222" opacity={0.6} />
          </>
        ),
      },
      {
        enter: 'black',
        kicker: 'Sáng 10/9 · Vàm Sát',
        lines: ['Sáng ra, người ta thấy chiếc ghe của ông úp giữa dòng ở Vàm Sát.', 'Không ai thấy ông Lực đâu.'],
        sfx: [{ id: 'footsteps', at: 1.4 }],
        camera: { from: { zoom: 1.04, x: -3 }, to: { zoom: 1.14, x: 3 } },
        Art: () => (
          <>
            <Landing />
            <SmokeFx opacity={0.4} tint="#c8ccd0" />
          </>
        ),
      },
      {
        kicker: '13/9 · Cần Thạnh',
        lines: ['Ba ngày sau, một thi thể dạt vào bãi bồi Cần Thạnh.', 'Bộ bà ba đen. Chiếc nhẫn cưới.'],
        sfx: [{ id: 'shutter', at: 1.6 }, { id: 'shutter', at: 2.8 }],
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.12, y: 2 } },
        Art: () => (
          <>
            <MudFlat />
            <SirenFx opacity={0.3} />
            <RainFx count={30} opacity={0.15} />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · một tuần sau',
        lines: ['Bà Phạm Thị Hồng, vợ ông, nộp hồ sơ đòi bảo hiểm nhân thọ.', 'Năm tỷ đồng. Hợp đồng mới ký được bốn tháng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: ClaimDesk,
      },
      {
        lines: ['Năm cái tên trong hồ sơ. Một người đã chết.', 'Người còn sống, ai cũng có điều chưa nói hết.'],
        sfx: data.suspects.map((_, i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 0909 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
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
        Art: () => <TitleCard over="Chương 2" title="Con nước Cần Giờ" under="Vựa hải sản Lực Phát · Cần Giờ" stamp="SỐ 0909" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân TP.HCM · năm tháng sau', sfx: [{ id: 'stamp', at: 3.2 }] },
    gold: { kicker: 'Long Hòa, Cần Giờ' },
    vinh: { kicker: 'Chợ đầu mối Bình Điền' },
    hong: { kicker: 'Bến ghe · một buổi sáng', fx: <SmokeFx opacity={0.25} tint="#d8d4c8" /> },
    son: { kicker: 'Bệnh viện Tim · ba tháng sau' },
    file: { kicker: 'Phòng giám định', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    tam: { kicker: 'Tòa án nhân dân TP.HCM', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    tam: { kicker: 'Phà Bình Khánh · mỗi tháng một lần', fx: <GradeFx color="#1b2230" opacity={0.35} /> },
  },
  unjust: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân TP.HCM · sáu tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  const panels = epilogue[endingId]
  if (!panels) return undefined
  return {
    id: `outro-${endingId}`,
    label: 'Chương 2 · Sau phán quyết',
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#24303a,#080b0e_70%)]" />,
      },
      ...epilogueShots(panels, notes[endingId]),
    ],
  }
}
