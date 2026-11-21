// Chapter 3's two short films: the opening before the desk, and what happens after the
// verdict, one film per ending. Same player and helpers as Chapter 1 (src/components/Cutscene).
import { motion } from 'framer-motion'
import { Portrait } from '@/art/Portrait'
import { GradeFx, SirenFx, SmokeFx, TitleCard, epilogueShots, type Cutscene, type EpilogueNote } from '@/components/Cutscene'
import { useGame } from '@/game/store'
import type { CaseData } from '@/game/types'
import { sceneArt } from './scenes'
import { documents } from './documents'
import { epilogue } from './epilogue'

const Hall = sceneArt['trung-bay']
const Alley = sceneArt['cua-sau']

/** Đồng Khởi after midnight: shuttered shopfronts, one street lamp, a lit gallery sign. */
function NightStreet() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(#05070d,#121722_60%,#1b1f26)]">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {/* Buildings */}
        {[0, 260, 520, 860, 1140, 1380].map((x, i) => (
          <g key={x}>
            <rect x={x} y={140 + (i % 3) * 50} width={i === 3 ? 280 : 240} height={760} fill={i === 3 ? '#1d1a1c' : '#14161c'} stroke="#05060a" strokeWidth="4" />
            {Array.from({ length: 4 }, (_, r) =>
              Array.from({ length: 3 }, (_, c) => (
                <rect
                  key={`${r}${c}`}
                  x={x + 30 + c * 70}
                  y={190 + (i % 3) * 50 + r * 90}
                  width="40"
                  height="54"
                  fill={(r + c + i) % 7 === 0 ? '#e8b866' : '#0b0d12'}
                  opacity={(r + c + i) % 7 === 0 ? 0.55 : 1}
                />
              )),
            )}
          </g>
        ))}
        {/* Gallery front with its sign */}
        <rect x="880" y="560" width="240" height="220" fill="#0e0d10" stroke="#05060a" strokeWidth="4" />
        <rect x="900" y="590" width="200" height="170" fill="#16131a" />
        <text x="1000" y="545" textAnchor="middle" fontSize="34" fill="#f2d9a6" fontFamily="Bitter, serif" fontStyle="italic">Diệp Gallery</text>
        {/* Sidewalk and a street lamp */}
        <rect y="780" width="1600" height="120" fill="#22252b" />
        <rect x="560" y="360" width="10" height="420" fill="#0a0b0e" />
        <path d="M565,360 Q600,330 650,345" stroke="#0a0b0e" strokeWidth="8" fill="none" />
        <circle cx="650" cy="352" r="10" fill="#ffd894" />
      </svg>
      <motion.div
        className="absolute left-[30%] top-[25%] size-[30%] rounded-full bg-[#ffd894]/15 blur-3xl"
        animate={{ opacity: [0.7, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  )
}

/** Papers dropped on the desk one after another, with the claim amount stamped on top. */
function ClaimDesk() {
  const A = documents['P1']
  const B = documents['P4']
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_42%_30%,#5a3c3a,#140e0e_75%)]">
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
        <p className="text-[clamp(10px,1vw,15px)] tracking-[0.3em]">BẢO HIỂM TÁC PHẨM</p>
        <p className="text-[clamp(26px,3.6vw,56px)] leading-tight">8.000.000.000 đ</p>
        <p className="font-mono text-[clamp(9px,0.9vw,13px)]">HỒ SƠ SỐ 1120 · DIỆP GALLERY</p>
      </motion.div>
    </div>
  )
}

/** The names in the file, laid down one by one like photos pinned to a board. */
function Lineup() {
  const suspects = useGame((s) => s.data.suspects)
  const tilt = [-2.5, 1.5, -1, 2, -1.5, 1]
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2%] bg-[radial-gradient(circle_at_50%_40%,#40303a,#100c0f_75%)] px-[5%]">
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
        <p className="title text-[clamp(14px,1.8vw,28px)]">HỒ SƠ BỒI THƯỜNG SỐ 1120</p>
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

/** The opening: the quiet street, the empty frame, the claim. Nothing that gives the answer away. */
export function intro(data: CaseData): Cutscene {
  return {
    id: 'intro',
    label: 'Chương 3 · Mở đầu',
    shots: [
      {
        enter: 'black',
        kicker: 'Đồng Khởi · đêm 19/11',
        lines: ['Phố Đồng Khởi đã tắt đèn. Diệp Gallery đóng cửa từ chín giờ tối.', 'Ba ngày nữa, bức tranh quý nhất phòng tranh sẽ lên sàn đấu giá.'],
        camera: { from: { zoom: 1.18, x: -3 }, to: { zoom: 1.04, x: 2 } },
        Art: NightStreet,
      },
      {
        enter: 'black',
        kicker: 'Sáng 20/11 · 07:40',
        lines: ['Bảy giờ bốn mươi sáng, quản lý phòng tranh mở cửa.', 'Giữa phòng trưng bày, cái khung trống trơn.'],
        sfx: [{ id: 'footsteps', at: 0.6 }],
        camera: { from: { zoom: 1.04, x: 3 }, to: { zoom: 1.2, y: -2 } },
        Art: () => (
          <>
            <Hall />
            <GradeFx color="#1a1420" opacity={0.25} />
          </>
        ),
      },
      {
        kicker: 'Hẻm sau phòng tranh',
        lines: ['Cửa sau bị cạy. Bức sơn mài "Thiếu nữ bên sen" của danh họa Nguyễn Văn Khuê đã biến mất.'],
        sfx: [{ id: 'shutter', at: 1.4 }, { id: 'shutter', at: 2.4 }],
        camera: { from: { zoom: 1.12, x: -2 }, to: { zoom: 1.04, x: 2 } },
        Art: () => (
          <>
            <Alley />
            <SirenFx opacity={0.4} />
          </>
        ),
      },
      {
        kicker: 'Bảo hiểm An Tín · cùng ngày',
        lines: ['Chủ phòng tranh Đoàn Ngọc Diệp nộp hồ sơ ngay trong ngày.', 'Số tiền: tám tỷ đồng.'],
        sfx: [{ id: 'paperDrop', at: 0.7 }, { id: 'paperDrop', at: 1.3 }, { id: 'stamp', at: 3 }],
        duration: 6,
        camera: { from: { zoom: 1.02 }, to: { zoom: 1.08, y: 1 } },
        Art: ClaimDesk,
      },
      {
        lines: ['Năm cái tên trong hồ sơ.', 'Người trong nghề tranh, ai cũng biết giữ kín chuyện của mình.'],
        sfx: data.suspects.map((_, i) => ({ id: 'pin' as const, at: 0.5 + i * 0.9 })),
        duration: 7,
        camera: { from: { zoom: 1 }, to: { zoom: 1.06 } },
        Art: Lineup,
      },
      {
        lines: [
          `Hồ sơ số 1120 được giao cho ${data.player.name}, ${lower(data.player.role)}.`,
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
        Art: () => <TitleCard over="Chương 3" title="Bức sơn mài biến mất" under="Diệp Gallery · Quận 1" stamp="SỐ 1120" />,
      },
    ],
  }
}

// --- After the verdict ----------------------------------------------------

const notes: Record<string, Record<string, EpilogueNote>> = {
  full: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân TP.HCM · bốn tháng sau', sfx: [{ id: 'stamp', at: 3.4 }] },
    painting: { kicker: 'Diệp Gallery · Đồng Khởi' },
    file: { kicker: 'Phòng giám định', sfx: [{ id: 'stamp', at: 1 }] },
  },
  half: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    ngoc: { kicker: 'Diệp Gallery · một tuần sau', fx: <GradeFx color="#1b2230" opacity={0.3} /> },
  },
  wrong: {
    transfer: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'click', at: 1 }] },
    quan: { kicker: 'Xưởng sơn mài · Bình Thạnh', fx: <SmokeFx opacity={0.25} tint="#3a3330" /> },
  },
  fakeonly: {
    file: { kicker: 'Bảo hiểm An Tín', sfx: [{ id: 'stamp', at: 1.2 }] },
    court: { kicker: 'Tòa án nhân dân TP.HCM · sáu tháng sau', sfx: [{ id: 'stamp', at: 3.6 }] },
    auction: { kicker: 'Hồng Kông · một năm sau' },
  },
  unjust: {
    diep: { kicker: 'Tòa án nhân dân TP.HCM' },
    closed: { kicker: 'Đồng Khởi · ba tháng sau', sfx: [{ id: 'stamp', at: 2.2 }] },
    player: { kicker: 'Phòng giám định', sfx: [{ id: 'paperPick', at: 1 }, { id: 'paperDrop', at: 2 }] },
  },
}

/** The film after the verdict for one ending; the ending card follows it. */
export function outro(endingId: string): Cutscene | undefined {
  const panels = epilogue[endingId]
  if (!panels) return undefined
  return {
    id: `outro-${endingId}`,
    label: 'Chương 3 · Sau phán quyết',
    shots: [
      {
        enter: 'black',
        duration: 4,
        center: true,
        lines: ['Đề xuất của bạn đã được ký.', 'Và rồi...'],
        sfx: [{ id: 'stamp', at: 0.3 }],
        camera: { from: { zoom: 1 }, to: { zoom: 1.05 } },
        Art: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#33242a,#0c0809_70%)]" />,
      },
      ...epilogueShots(panels, notes[endingId]),
    ],
  }
}
