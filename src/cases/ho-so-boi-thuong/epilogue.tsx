// Illustrated epilogue shown on the ending card and in the outro: one small
// diorama per person's fate, in the same block style as the rest of chapter 1.
import type { ReactNode } from 'react'
import type { Mood, PortraitSpec } from '@/art/Portrait'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, WallText, iso, tone } from '@/art/iso/iso'
import { IsoFigure } from '@/art/iso/figure'
import { Cup, Rack, Stool, Table } from '@/art/iso/props'
import { InterviewRoom } from '@/art/iso/rooms'
import { useGame } from '@/game/store'

export interface EpiloguePanel {
  id: string
  caption: string
  Art: () => JSX.Element
}

const FONT = "'Be Vietnam Pro', sans-serif"
const MONO = 'IBM Plex Mono, monospace'

function useSpec(id: string, mood?: Mood): PortraitSpec | undefined {
  const data = useGame((s) => s.data)
  const spec = id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return spec && { ...spec, mood: mood ?? spec.mood }
}

/** The frame: a 3:2 card with the diorama filling it. */
function Panel({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[3/2] overflow-hidden rounded-xl">{children}</div>
}

const judge = (hair: PortraitSpec['hair'], hairColor: PortraitSpec['hairColor'], skin: PortraitSpec['skin']): PortraitSpec => ({
  skin, hair, hairColor, build: 'normal', outfit: 'suit', outfitColor: 'charcoal', age: 'mid', mood: 'stern',
})
const officer: PortraitSpec = { skin: 2, hair: 'cap', hairColor: 'black', build: 'normal', outfit: 'uniform', outfitColor: 'olive', age: 'young', mood: 'stern' }
const cardboard = '#d9a86a'

// --- Scenes ---------------------------------------------------------------

/** Courtroom: three judges at the bench under the emblem, the accused in the dock between two officers. */
function Court({ accused, mood }: { accused: string; mood: Mood }) {
  const spec = useSpec(accused, mood)
  // A five-pointed star on the wall plane y = 1.5, centred at (x, z).
  const star = (x: number, z: number, r: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5
      const rr = i % 2 ? r * 0.42 : r
      return [x + Math.cos(a) * rr, 1.6, z - Math.sin(a) * rr] as [number, number, number]
    })
  return (
    <IsoStage label="Phiên tòa" origin={[780, 250]} scale={2.15} sky={['#d9cbe8', '#f6dccb']}>
      <Slab w={270} d={250} floor="#d8c2ad" depth={22} />
      <Face points={[[60, 120, 0.3], [230, 120, 0.3], [230, 240, 0.3], [60, 240, 0.3]]} fill="#c9a99a" />
      <BackWalls w={270} d={250} h={135} left="#d6b897" right="#e2c6a6" edge="#a07c5a" t={7} />
      {[30, 70, 110, 150, 190, 230].map((y) => (
        <Face key={y} points={[[0.5, y, 0], [0.5, y + 3, 0], [0.5, y + 3, 135], [0.5, y, 135]]} fill="#c8a582" />
      ))}
      {/* red backdrop, the gold emblem and the court's name */}
      <Face points={[[70, 0.5, 40], [200, 0.5, 40], [200, 0.5, 132], [70, 0.5, 132]]} fill="#cf4d3d" />
      <Cyl at={[135, 0, 98]} r={20} len={2} axis="y" color={iso.gold} cap={iso.gold} />
      <Face points={star(135, 98, 14)} fill="#cf4d3d" />
      {/* the judges, then the bench in front of them */}
      <IsoFigure at={[78, 26, 0]} spec={judge('bun', 'black', 0)} facing="y" pose="sit" />
      <IsoFigure at={[122, 26, 0]} spec={judge('side-part', 'gray', 1)} facing="y" pose="sit" />
      <IsoFigure at={[166, 26, 0]} spec={judge('short', 'black', 2)} facing="y" pose="sit" />
      <Box at={[60, 58, 0]} size={[150, 22, 56]} color="#a3714b" />
      <Box at={[60, 58, 56]} size={[150, 24, 4]} color="#b9875d" />
      {[90, 135, 180].map((x) => (
        <Box key={x} at={[x - 6, 62, 60]} size={[12, 8, 3]} color={iso.cream} />
      ))}
      <WallText at={[135, 80.6, 24]} plane="R" text="TÒA ÁN NHÂN DÂN" size={26} color="#ffe7b8" />
      {/* officer on the left, the dock, officer on the right */}
      <IsoFigure at={[40, 160, 0]} spec={officer} facing="y" />
      <Box at={[104, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      {spec && <IsoFigure at={[122, 165, 0]} spec={spec} facing="y" talking={false} />}
      <Box at={[166, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      <Box at={[104, 196, 0]} size={[67, 6, 46]} color="#8a5c38" />
      <Box at={[102, 195, 46]} size={[71, 8, 4]} color="#a3714b" />
      <IsoFigure at={[206, 150, 0]} spec={officer} facing="y" />
    </IsoStage>
  )
}

/** Thịnh signs his confession in the interview room, his gold watch taken off beside the paper. */
function Confession() {
  const spec = useSpec('thinh', 'worried')
  const player = useSpec('player')
  if (!spec) return <></>
  return (
    <InterviewRoom
      spec={spec}
      talking={false}
      interviewer={player}
      label="Phòng làm việc của công an"
      extra={
        <g>
          <Box at={[122, 104, 56]} size={[30, 38, 1]} color={iso.cream} />
          <OnPlane at={[126, 108, 57.1]} plane="top">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={0} y={i * 5} width={i === 4 ? 12 : 22} height={1.4} fill="#b8a98f" />
            ))}
            <path d="M8,29 q4,-4 8,0 t8,0" fill="none" stroke="#2a3a7a" strokeWidth="1.2" />
          </OnPlane>
          <Box at={[134, 150, 56]} size={[22, 4, 1.5]} color={iso.gold} />
          <Cyl at={[145, 152, 56]} r={6} len={3} axis="z" color={iso.gold} cap="#fff6e2" />
        </g>
      }
    />
  )
}

/** Dawn at the warehouse under repair; Tư Rô on duty by the hut with tea and the shift log. */
function Dawn() {
  const spec = useSpec('ro', 'smile')
  return (
    <IsoStage label="Kho Thịnh Phát lúc bình minh" origin={[760, 230]} scale={2.0} sky={['#f8c98a', '#f7dccb']}>
      <Slab w={300} d={260} floor="#d8c2ad" depth={22} />
      {/* the rebuilt warehouse, scaffolding still up */}
      <Box at={[10, 10, 0]} size={[190, 70, 110]} color="#c7ab92" />
      <Face points={[[10, 10, 110], [200, 10, 110], [200, 45, 140], [10, 45, 140]]} fill="#a98f7a" />
      <Face points={[[10, 45, 140], [200, 45, 140], [200, 80, 110], [10, 80, 110]]} fill="#bfa58d" />
      <Face points={[[200, 10, 110], [200, 45, 140], [200, 80, 110]]} fill="#9d826c" />
      <Box at={[60, 80, 0]} size={[80, 1, 72]} color="#9aa3b5" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Face key={i} points={[[62, 81.2, 6 + i * 8.6], [138, 81.2, 6 + i * 8.6], [138, 81.2, 7.4 + i * 8.6], [62, 81.2, 7.4 + i * 8.6]]} fill="#7f889a" />
      ))}
      <Box at={[40, 80, 82]} size={[120, 2, 18]} color={iso.cream} />
      <WallText at={[100, 82.2, 95]} plane="R" text="KHO THỊNH PHÁT" size={30} color={iso.ink} />
      <Box at={[150, 80, 40]} size={[44, 2, 12]} color={iso.coral} />
      <WallText at={[172, 82.2, 43.5]} plane="R" text="ĐANG SỬA CHỮA" size={14} color="#fff" />
      {[16, 196].map((x) => (
        <Box key={x} at={[x, 84, 0]} size={[3, 3, 118]} color={iso.gold} />
      ))}
      <Box at={[16, 84, 62]} size={[183, 3, 3]} color={iso.gold} />
      <Box at={[16, 84, 108]} size={[183, 3, 3]} color={iso.gold} />
      {/* guard hut */}
      <Box at={[225, 40, 0]} size={[60, 55, 72]} color="#f2c46d" />
      <Box at={[219, 34, 72]} size={[72, 67, 8]} color="#9a6b4a" />
      <Face points={[[240, 95.5, 30], [275, 95.5, 30], [275, 95.5, 58], [240, 95.5, 58]]} fill="#fbe3a6" />
      {/* Tư Rô on a stool, tea and the new log on a small table */}
      <Stool at={[205, 150, 0]} h={26} color={iso.blue} />
      {spec && <IsoFigure at={[192, 138, 0]} spec={spec} facing="y" pose="sit" />}
      <Table at={[236, 130, 0]} w={44} d={40} h={44} color={iso.wood} />
      <Cyl at={[250, 142, 44]} r={7} len={12} axis="z" color={iso.blue} cap="#a9c8d4" />
      <Box at={[262, 150, 44]} size={[14, 18, 2]} color={iso.cream} />
      <Cup at={[244, 162, 44]} fill="#c99a52" />
      <Cyl at={[40, 220, 0]} r={14} len={18} axis="z" color="#c98a5c" />
      <Box at={[31, 211, 18]} size={[18, 18, 26]} color={iso.leaf} />
    </IsoStage>
  )
}

/** Ngân's room, live again, five times the usual viewers. */
function LiveRoom() {
  const spec = useSpec('ngan', 'smile')
  return (
    <IsoStage
      label="Phòng livestream của Ngân"
      origin={[780, 250]}
      scale={2.15}
      sky={['#f3c9c0', '#f7e3d6']}
      overlay={
        <g fontFamily={MONO}>
          <rect x="190" y="70" width="330" height="96" rx="22" fill={iso.ink} opacity="0.82" />
          <circle cx="226" cy="104" r="9" fill="#ff5b4a" />
          <text x="246" y="113" fontSize="26" fill="#fff">LIVE · 1.208 xem</text>
          <text x="214" y="148" fontSize="22" fill="#ffd2c8" fontFamily={FONT}>❤ chị Ngân bị oan rồi!</text>
        </g>
      }
    >
      <Slab w={270} d={240} floor="#e9d3be" depth={22} />
      <BackWalls w={270} d={240} h={125} left="#f0d2c4" right="#f7e0d2" edge="#d39c8c" t={7} />
      {/* clothes rack against the right wall */}
      <Box at={[24, 10, 0]} size={[4, 4, 92]} color={iso.inkSoft} />
      <Box at={[146, 10, 0]} size={[4, 4, 92]} color={iso.inkSoft} />
      <Box at={[24, 10, 92]} size={[126, 4, 4]} color={iso.inkSoft} />
      {['#e2a63b', '#7a9fb0', iso.coral, '#fbf4e8', '#f4aaa3'].map((c, i) => (
        <Box key={i} at={[32 + i * 23, 6, 40]} size={[18, 12, 50]} color={c} />
      ))}
      {/* ring light on a stand */}
      <Box at={[218, 60, 0]} size={[4, 4, 80]} color={iso.inkSoft} />
      <Cyl at={[220, 60, 104]} r={24} len={3} axis="y" color="#fffaf0" cap="#fffaf0" />
      <Cyl at={[220, 63.2, 104]} r={17} len={0.5} axis="y" color="#f7e0d2" cap="#f7e0d2" />
      {/* Ngân holding up a blouse, the phone on its tripod in front of her */}
      {spec && <IsoFigure at={[110, 100, 0]} spec={spec} facing="y" talking />}
      <Box at={[140, 132, 36]} size={[26, 4, 32]} color="#f4aaa3" />
      <Box at={[60, 150, 0]} size={[70, 44, 40]} color="#b98f6e" />
      <Box at={[66, 156, 40]} size={[24, 18, 10]} color="#fbf4e8" />
      <Box at={[96, 158, 40]} size={[24, 16, 6]} color="#7a9fb0" />
      <Box at={[160, 205, 0]} size={[3, 3, 70]} color={iso.ink} />
      <Box at={[152, 200, 70]} size={[18, 3, 30]} color={iso.ink} />
    </IsoStage>
  )
}

/** The claim folder on the investigator's desk with the final stamp on it. */
function Desk({ stamp, sub, color = '#d6453a' }: { stamp: string; sub: string; color?: string }) {
  return (
    <IsoStage label="Hồ sơ bồi thường 0714" origin={[700, 150]} scale={2.6} sky={['#d6cfee', '#f7dccb']}>
      <Box at={[0, 0, 0]} size={[300, 220, 20]} color="#b8927a" />
      <Box at={[40, 34, 20]} size={[180, 140, 3]} color="#e8cf98" />
      <Box at={[48, 40, 23]} size={[166, 128, 1]} color="#fffaf0" />
      <OnPlane at={[56, 48, 24.2]} plane="top">
        <rect x="0" y="0" width="150" height="16" fill="#e8cf98" />
        <text x="6" y="11.5" fontSize="9.5" fontWeight="800" fill={iso.ink} fontFamily={FONT}>HỒ SƠ BỒI THƯỜNG SỐ 0714</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="6" y={24 + i * 9} width={i % 2 ? 100 : 130} height="2.4" fill="#cdbb9c" />
        ))}
        <g transform="rotate(-8 75 86)">
          <rect x="8" y="66" width="134" height="40" rx="4" fill="none" stroke={color} strokeWidth="3" />
          <text x="75" y="86" textAnchor="middle" fontSize="12" fontWeight="800" fill={color} fontFamily={FONT}>{stamp}</text>
          <text x="75" y="99" textAnchor="middle" fontSize="6.5" fill={color} fontFamily={MONO}>{sub}</text>
        </g>
      </OnPlane>
      {/* rubber stamp and ink pad, coffee */}
      <Box at={[238, 120, 20]} size={[40, 30, 5]} color={color} />
      <Box at={[244, 60, 20]} size={[22, 22, 8]} color={tone(color, -0.2)} />
      <Box at={[251, 67, 28]} size={[8, 8, 18]} color={iso.woodDark} />
      <Cyl at={[255, 71, 46]} r={8} len={8} axis="z" color={iso.woodDark} cap={iso.wood} />
      <Cup at={[258, 186, 20]} fill="#7b5236" />
      <Box at={[60, 186, 20]} size={[40, 6, 3]} color={iso.ink} />
    </IsoStage>
  )
}

/** Bảo's rented room a week later: empty, his things boxed up, a "for rent" note on the wall. */
function EmptyFlat() {
  return (
    <IsoStage label="Phòng trọ trống" origin={[780, 250]} scale={2.15} sky={['#cfd3e6', '#f1e1d2']}>
      <Slab w={270} d={250} floor="#ddcbb6" depth={22} />
      <BackWalls w={270} d={250} h={125} left="#d9cbb8" right="#e6d9c7" edge="#a8957e" t={7} />
      {/* open door onto the dark corridor */}
      <Face points={[[90, 0.5, 0], [150, 0.5, 0], [150, 0.5, 110], [90, 0.5, 110]]} fill="#3d3446" />
      <Face points={[[150, 0.5, 0], [150, 40, 0], [150, 40, 110], [150, 0.5, 110]]} fill="#a07c5a" />
      {/* the note */}
      <Face points={[[172, 0.6, 66], [244, 0.6, 66], [244, 0.6, 104], [172, 0.6, 104]]} fill="#fffaf0" />
      <WallText at={[208, 0.8, 84]} plane="R" text="CHO THUÊ" size={26} color="#d6453a" />
      <WallText at={[208, 0.8, 74]} plane="R" text="P.304 · trống" size={14} color={iso.ink} weight={500} />
      <Face points={[[0.5, 60, 50], [0.5, 140, 50], [0.5, 140, 100], [0.5, 60, 100]]} fill="#c5b59f" />
      {/* boxes */}
      <Box at={[24, 120, 0]} size={[64, 54, 44]} color={cardboard} />
      <Box at={[32, 128, 44]} size={[44, 36, 32]} color={tone(cardboard, 0.08)} />
      <WallText at={[56, 174.5, 18]} plane="R" text="ĐỒ BẢO" size={18} color={iso.ink} />
      <Box at={[180, 168, 0]} size={[58, 52, 38]} color={cardboard} />
      <Box at={[186, 172, 38]} size={[30, 24, 3]} color={iso.cream} />
      <Box at={[100, 40, 0]} size={[40, 70, 10]} color="#c5b59f" />
    </IsoStage>
  )
}

/** The player taken off the case, carrying their things out in a box. */
function Boxing() {
  const spec = useSpec('player', 'worried')
  return (
    <IsoStage label="Bị rút khỏi vụ việc" origin={[780, 250]} scale={2.15} sky={['#cfc8ea', '#f6dccb']}>
      <Slab w={270} d={250} floor="#e2d3c6" depth={22} />
      <BackWalls w={270} d={250} h={125} left="#cbbfe0" right="#ddd0e6" edge="#9a8fb0" t={7} />
      <Face points={[[0.5, 50, 84], [0.5, 160, 84], [0.5, 160, 108], [0.5, 50, 108]]} fill={iso.blue} />
      <WallText at={[1, 105, 92]} plane="L" text="PHÒNG GIÁM ĐỊNH" size={20} />
      {/* the decision pinned to the wall */}
      <Face points={[[150, 0.6, 50], [230, 0.6, 50], [230, 0.6, 106], [150, 0.6, 106]]} fill="#fffaf0" />
      <WallText at={[190, 0.8, 92]} plane="R" text="QUYẾT ĐỊNH" size={20} color={iso.ink} />
      <WallText at={[190, 0.8, 74]} plane="R" text="RÚT KHỎI VỤ VIỆC" size={19} color="#d6453a" />
      {/* the emptied desk */}
      <Box at={[150, 40, 0]} size={[100, 60, 50]} color="#b8927a" />
      <Box at={[160, 50, 50]} size={[30, 22, 26]} color={iso.ink} />
      {spec && <IsoFigure at={[96, 140, 0]} spec={spec} facing="y" />}
      <Box at={[94, 168, 30]} size={[32, 28, 26]} color={cardboard} />
      <Box at={[100, 172, 56]} size={[12, 16, 8]} color={iso.cream} />
      <Cyl at={[120, 182, 56]} r={6} len={10} axis="z" color={iso.leaf} />
      <Cyl at={[30, 228, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[22, 220, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </IsoStage>
  )
}

/** The payout notification on a phone lying on the desk. */
function Transfer() {
  return (
    <IsoStage label="Chuyển tiền bồi thường" origin={[700, 150]} scale={2.6} sky={['#c8d3e6', '#f1e1d2']}>
      <Box at={[0, 0, 0]} size={[300, 220, 20]} color="#b8927a" />
      <Box at={[90, 30, 20]} size={[100, 170, 6]} color={iso.ink} />
      <Box at={[95, 36, 26]} size={[90, 158, 0.6]} color="#fffaf0" />
      <OnPlane at={[95, 36, 26.8]} plane="top">
        <circle cx="45" cy="34" r="13" fill="#3f8a7e" />
        <path d="M38,34 l5,5 9,-10" stroke="#fff" strokeWidth="2.6" fill="none" />
        <text x="45" y="66" textAnchor="middle" fontSize="7.5" fill={iso.ink} fontFamily={FONT}>Chuyển tiền thành công</text>
        <text x="45" y="84" textAnchor="middle" fontSize="8.4" fontWeight="800" fill={iso.ink} fontFamily={MONO}>4.000.000.000 đ</text>
        <text x="45" y="100" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>An Tín → Quách Thịnh</text>
        <text x="45" y="110" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>ND: Boi thuong HS 0714</text>
      </OnPlane>
      <Cup at={[240, 60, 20]} fill="#7b5236" />
      <Box at={[220, 120, 20]} size={[50, 70, 3]} color="#e8cf98" />
    </IsoStage>
  )
}

/** The rented warehouse in Long An: 412 rolls of fabric, never burnt. */
function LongAn() {
  const player = useSpec('player')
  const rows = (k: number) => Array.from({ length: 3 }, (_, l) => Array.from({ length: 4 }, (_, i) => ['#e46b4f', '#5d8ea3', '#f2c46d', '#8f7aa3'][(i + l + k) % 4]))
  return (
    <IsoStage label="Kho thuê ở Long An" origin={[790, 300]} scale={1.5} sky={['#b9bfd6', '#e6dbe6']}>
      <Slab w={320} d={280} floor="#cfc6bf" depth={22} />
      <BackWalls w={320} d={280} h={210} left="#b7b9cf" right="#c7c8db" edge="#8d8fa8" t={8} />
      <Face points={[[60, 0.5, 168], [270, 0.5, 168], [270, 0.5, 198], [60, 0.5, 198]]} fill="#fffaf0" />
      <WallText at={[165, 0.8, 177]} plane="R" text="KHO THUÊ · ĐỨC HÒA, LONG AN" size={20} color={iso.ink} />
      <Rack at={[30, 20, 0]} rolls={rows(0)} len={120} />
      <Rack at={[170, 20, 0]} rolls={rows(1)} len={120} />
      <Rack at={[30, 160, 0]} rolls={rows(2)} len={120} />
      <Face points={[[180, 170, 0.4], [320, 150, 0.4], [320, 280, 0.4], [180, 280, 0.4]]} fill="#fff4c8" opacity={0.55} />
      {player && <IsoFigure at={[230, 210, 0]} spec={player} facing="-x" />}
      <Box at={[250, 240, 0]} size={[30, 24, 30]} color={cardboard} />
    </IsoStage>
  )
}

// --- Endings ---------------------------------------------------------------

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Tòa án nhân dân TP.HCM đưa Phan Quốc Bảo ra xét xử về tội hủy hoại tài sản và tham ô 620 triệu qua Công ty Hưng Long.',
      Art: () => (
        <Panel>
          <Court accused="bao" mood="worried" />
        </Panel>
      ),
    },
    {
      id: 'thinh',
      caption: 'Ông Thịnh ký biên bản nhận tội gian lận bảo hiểm. Lần đầu tiên người ta thấy ông tháo chiếc đồng hồ vàng.',
      Art: () => (
        <Panel>
          <Confession />
        </Panel>
      ),
    },
    {
      id: 'ro',
      caption: 'Ông Tư Rô được giữ lại làm bảo vệ nhờ bạn nói giùm. Bình trà thay cho chai rượu, sổ trực ca ghi đủ từng giờ.',
      Art: () => (
        <Panel>
          <Dawn />
        </Panel>
      ),
    },
    {
      id: 'ngan',
      caption: 'Ngân được minh oan. Buổi livestream tối đó đông gấp năm lần thường lệ.',
      Art: () => (
        <Panel>
          <LiveRoom />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0714 đóng lại. Công ty không phải chi 4 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Công ty từ chối chi trả. Sếp hài lòng với kết quả.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: KHAI KHỐNG HÀNG HÓA" />
        </Panel>
      ),
    },
    {
      id: 'thinh',
      caption: 'Ông Thịnh bị khởi tố cả tội đốt kho. Ông vẫn thề rằng mình đã hủy "vụ 20".',
      Art: () => (
        <Panel>
          <Court accused="thinh" mood="angry" />
        </Panel>
      ),
    },
    {
      id: 'bao',
      caption: 'Một tuần sau, phòng trọ của Bảo đã trống. Không ai biết anh đi đâu.',
      Art: () => (
        <Panel>
          <EmptyFlat />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của ông Thịnh chỉ ra lập luận không có bằng chứng. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <Desk stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Thùng giấy trên bàn đựng hết đồ của bạn.',
      Art: () => (
        <Panel>
          <Boxing />
        </Panel>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 4 tỷ đồng cho ông Thịnh.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'longan',
      caption: 'Ba tháng sau, kiểm toán mở cửa kho thuê ở Long An: 412 cuộn vải nằm nguyên, chưa từng cháy.',
      Art: () => (
        <Panel>
          <LongAn />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0714" />
        </Panel>
      ),
    },
  ],
}
