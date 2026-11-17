// Chapter 4's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Same player and helpers as Chapter 1 (src/components/Cutscene).
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import { GradeFx, SirenFx, SmokeFx, TitleCard, epilogueShots, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { useGame } from '@/game/store'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Roadside = sceneArt['le-duong']
const Dumped = sceneArt['bo-xe']

/** Highway 1A at night: a container truck's lights running south past dark hills. */
function NightHighway() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(#04060b,#0c1220_55%,#141414)]">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {Array.from({ length: 50 }, (_, i) => (
          <circle key={i} cx={(i * 331) % 1600} cy={(i * 97) % 380} r={i % 6 === 0 ? 1.8 : 1} fill="#cfd8e6" opacity={0.2 + (i % 4) * 0.12} />
        ))}
        <path d="M0,500 Q260,380 520,470 T1040,430 T1600,470 L1600,560 L0,560 Z" fill="#070a0d" />
        {/* Road */}
        <path d="M0,600 L1600,560 L1600,900 L0,900 Z" fill="#1a1b1e" />
        {Array.from({ length: 10 }, (_, i) => (
          <motion.rect
            key={i}
            y={730 - i * 3}
            width="90"
            height="6"
            fill="#d8d0a8"
            opacity="0.5"
            animate={{ x: [1700 - i * 180, -200 - i * 180] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: -i * 0.22 }}
          />
        ))}
        {/* The truck, still in the frame while the road runs under it */}
        <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
          <rect x="520" y="560" width="520" height="150" fill="#5a6a72" stroke="#0a0b0e" strokeWidth="4" />
          <text x="780" y="645" textAnchor="middle" fontSize="30" fill="#e6e0d0" fontFamily="Barlow Condensed, sans-serif" opacity="0.7">CONTAINER 40&apos;</text>
          <rect x="1040" y="600" width="130" height="110" rx="10" fill="#8a2e22" stroke="#0a0b0e" strokeWidth="4" />
          <rect x="1080" y="612" width="70" height="40" fill="#24323c" />
          {[580, 680, 960, 1080, 1140].map((x) => (
            <circle key={x} cx={x} cy={720} r={26} fill="#0d0d0f" />
          ))}
          <circle cx="1172" cy="680" r="9" fill="#fff2c4" />
        </motion.g>
        <path d="M1180,680 L1600,620 L1600,760 Z" fill="#fff2c4" opacity="0.12" />
      </svg>
    </div>
  )
}

/** Papers dropped on the desk one after another, with the claim amount stamped on top. */
function ClaimDesk() {
  const A = documents['P1']
  const B = documents['P2']
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_42%_30%,#5e4430,#16100b_75%)]">
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
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">BẢO HIỂM HÀNG HÓA</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">3.040.000.000 đ</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">HỒ SƠ SỐ 0311 · TIÊU ĐẤT ĐỎ</p>
      </motion.div>
    </div>
  )
}

/** The names in the file, laid down one by one like photos pinned to a board. */
function Lineup() {
  const suspects = useGame((s) => s.data.suspects)
  const tilt = [-2.5, 1.5, -1, 2, -1.5, 1]
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2%] bg-[radial-gradient(circle_at_50%_40%,#4a3a2a,#110d09_75%)] px-[5%]">
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
        <p className="title text-[clamp(14px,1.8vw,28px)]">HỒ SƠ BỒI THƯỜNG SỐ 0311</p>
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

/** The opening: the night run, the driver by the road, the empty container, the claim. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 4 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Quốc lộ 1A · đêm 2/11',
        lines: ['Đêm 2/11, một chiếc container chở 20 tấn hồ tiêu rời Buôn Ma Thuột.', 'Điểm đến: cảng Cát Lái, trước khi trời sáng.'],
        camera: { from: { zoom: 1.12, x: -2 }, to: { zoom: 1.02, x: 2 } },
        Art: NightHighway,
      },
      {
        enter: 'black',
        kicker: '04:10 · Hàm Thuận Nam',
        lines: ['Bốn giờ sáng, người ta thấy tài xế bị trói bên lề quốc lộ.', 'Anh khai bị ba người bịt mặt chặn xe cướp hàng.'],
        sfx: [{ id: 'footsteps', at: 1 }],
        camera: { from: { zoom: 1.04, x: 3 }, to: { zoom: 1.16, x: -2 } },
        Art: () => (
          <>
            <Roadside />
            <GradeFx color="#0b1222" opacity={0.5} />
            <SirenFx opacity={0.5} />
          </>
        ),
      },
      {
        kicker: 'Sáng 3/11 · Hàm Tân',
        lines: ['Sáng ra, chiếc xe được tìm thấy trên một con đường đất đỏ.', 'Thùng container trống trơn.'],
        sfx: [{ id: 'shutter', at: 1.4 }, { id: 'shutter', at: 2.5 }],
        camera: { from: { zoom: 1.14, y: 2 }, to: { zoom: 1.04 } },
        Art: () => (
          <>
            <Dumped />
            <SmokeFx opacity={0.25} tint="#c9a07a" />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · năm ngày sau khi ký',
        lines: ['Chủ hàng, công ty Tiêu Đất Đỏ, đòi bồi thường theo hợp đồng mới ký năm ngày trước.', 'Số tiền: ba tỷ không trăm bốn mươi triệu đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: ClaimDesk,
      },
      {
        lines: ['Năm cái tên trong hồ sơ.', 'Trên đoạn đường năm trăm cây số, ai cũng có lúc không ai nhìn thấy.'],
        sfx: data.suspects.map((_, i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 0311 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
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
        Art: () => <TitleCard over="Chương 4" title="Chuyến xe đêm Quốc lộ 1A" under="Tiêu Đất Đỏ · Bình Thuận" stamp="SỐ 0311" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân tỉnh Bình Thuận · năm tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    dat: { kicker: 'Trại tạm giam' },
    sacks: { kicker: 'Long Khánh, Đồng Nai' },
    yard: { kicker: 'Bãi xe Kiều Phát · Buôn Ma Thuột', fx: <SmokeFx opacity={0.2} tint="#c9a07a" /> },
    tai: { kicker: 'Buôn Ma Thuột · một buổi sáng' },
    file: { kicker: 'Phòng giám định', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    kieu: { kicker: 'Bãi xe Kiều Phát', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    file: { kicker: 'Hai tháng sau', sfx: [{ id: 'stamp', at: 1.4 }] },
  },
  unjust: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân TP.HCM · sáu tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    kieu: { kicker: 'Bãi xe Kiều Phát', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  const panels = epilogue[endingId]
  if (!panels) return undefined
  return {
    id: `outro-${endingId}`,
    label: 'Chương 4 · Sau phán quyết',
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#3a2a1c,#0d0907_70%)]" />,
      },
      ...epilogueShots(panels, notes[endingId]),
    ],
  }
}
