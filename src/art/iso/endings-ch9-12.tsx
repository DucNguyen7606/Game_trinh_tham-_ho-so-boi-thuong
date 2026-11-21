// Shared epilogue dioramas for Chapters 9 to 12: the court, the claim file
// with its stamp, the payout on a phone, the investigator taken off the case,
// a confession in the interview room, and a plain room to build other scenes in.
// They follow Chapter 1's epilogue.tsx.
import type { ReactNode } from 'react'
import type { Mood, PortraitSpec } from '@/art/Portrait'
import { useGame } from '@/game/store'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, WallText, iso, tone } from './iso'
import { IsoFigure } from './figure'
import { Cup } from './props'
import { InterviewRoom } from './rooms'

const FONT = "'Be Vietnam Pro', sans-serif"
const MONO = 'IBM Plex Mono, monospace'
export const cardboard = '#d9a86a'

/** A cast member's look (or the player's, with id 'player'), with a mood. */
export function useSpec(id: string, mood?: Mood): PortraitSpec | undefined {
  const data = useGame((s) => s.data)
  const spec = id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return spec && { ...spec, mood: mood ?? spec.mood }
}

/** The frame: a 3:2 card with the diorama filling it. */
export function EpiPanel({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[3/2] overflow-hidden rounded-xl">{children}</div>
}

/** A small room: slab, two back walls, and whatever goes in it. 270 x 250 floor, walls 125 high. */
export function MiniRoom({ label, children, floor = '#e2d3c6', left = '#cbbfe0', right = '#ddd0e6', edge = '#9a8fb0', sky = ['#cfc8ea', '#f6dccb'], w = 270, d = 250, h = 125, overlay }: { label: string; children: ReactNode; floor?: string; left?: string; right?: string; edge?: string; sky?: [string, string]; w?: number; d?: number; h?: number; overlay?: ReactNode }) {
  return (
    <IsoStage label={label} origin={[780, 250]} scale={2.15} sky={sky} overlay={overlay}>
      <Slab w={w} d={d} floor={floor} depth={22} />
      <BackWalls w={w} d={d} h={h} left={left} right={right} edge={edge} t={7} />
      {children}
    </IsoStage>
  )
}

/** An outdoor patch of ground (no walls). */
export function MiniGround({ label, children, floor = '#d8c2ad', sky = ['#f8c98a', '#f7dccb'], w = 300, d = 260, overlay }: { label: string; children: ReactNode; floor?: string; sky?: [string, string]; w?: number; d?: number; overlay?: ReactNode }) {
  return (
    <IsoStage label={label} origin={[760, 230]} scale={2.0} sky={sky} overlay={overlay}>
      <Slab w={w} d={d} floor={floor} depth={22} />
      {children}
    </IsoStage>
  )
}

const judge = (hair: PortraitSpec['hair'], hairColor: PortraitSpec['hairColor'], skin: PortraitSpec['skin']): PortraitSpec => ({
  skin, hair, hairColor, build: 'normal', outfit: 'suit', outfitColor: 'charcoal', age: 'mid', mood: 'stern',
})
export const officer: PortraitSpec = { skin: 2, hair: 'cap', hairColor: 'black', build: 'normal', outfit: 'uniform', outfitColor: 'olive', age: 'young', mood: 'stern' }

/**
 * Courtroom: three judges at the bench under the emblem. With `dock`, the
 * person stands in the dock between two officers; without it, they stand at
 * the lectern as the one bringing the case.
 */
export function Court({ who, mood, dock = true, also }: { who: string; mood: Mood; dock?: boolean; also?: { who: string; mood: Mood } }) {
  const spec = useSpec(who, mood)
  const second = useSpec(also?.who ?? '', also?.mood)
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
      <Face points={[[70, 0.5, 40], [200, 0.5, 40], [200, 0.5, 132], [70, 0.5, 132]]} fill="#cf4d3d" />
      <Cyl at={[135, 0, 98]} r={20} len={2} axis="y" color={iso.gold} cap={iso.gold} />
      <Face points={star(135, 98, 14)} fill="#cf4d3d" />
      <IsoFigure at={[78, 26, 0]} spec={judge('bun', 'black', 0)} facing="y" pose="sit" />
      <IsoFigure at={[122, 26, 0]} spec={judge('side-part', 'gray', 1)} facing="y" pose="sit" />
      <IsoFigure at={[166, 26, 0]} spec={judge('short', 'black', 2)} facing="y" pose="sit" />
      <Box at={[60, 58, 0]} size={[150, 22, 56]} color="#a3714b" />
      <Box at={[60, 58, 56]} size={[150, 24, 4]} color="#b9875d" />
      {[90, 135, 180].map((x) => (
        <Box key={x} at={[x - 6, 62, 60]} size={[12, 8, 3]} color={iso.cream} />
      ))}
      <WallText at={[135, 80.6, 24]} plane="R" text="TÒA ÁN NHÂN DÂN" size={26} color="#ffe7b8" />
      {dock ? (
        <>
          <IsoFigure at={[40, 160, 0]} spec={officer} facing="y" />
          <Box at={[104, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
          {spec && <IsoFigure at={[second ? 104 : 122, second ? 156 : 165, 0]} spec={spec} facing="y" />}
          {second && <IsoFigure at={[142, 172, 0]} spec={second} facing="y" />}
          <Box at={[166, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
          <Box at={[104, 196, 0]} size={[67, 6, 46]} color="#8a5c38" />
          <Box at={[102, 195, 46]} size={[71, 8, 4]} color="#a3714b" />
          <IsoFigure at={[206, 150, 0]} spec={officer} facing="y" />
        </>
      ) : (
        <>
          {spec && <IsoFigure at={[118, 150, 0]} spec={spec} facing="y" talking />}
          <Box at={[110, 186, 0]} size={[40, 26, 52]} color="#8a5c38" />
          <Box at={[108, 184, 52]} size={[44, 30, 4]} color="#a3714b" />
          <Box at={[118, 190, 56]} size={[24, 16, 2]} color={iso.cream} />
          <Box at={[200, 160, 0]} size={[50, 40, 46]} color="#8a5c38" />
          <Box at={[206, 168, 46]} size={[20, 14, 2]} color={iso.cream} />
        </>
      )}
    </IsoStage>
  )
}

/** Someone signs a statement in the interview room, the player opposite. */
export function Confession({ who, mood = 'worried', extra }: { who: string; mood?: Mood; extra?: ReactNode }) {
  const spec = useSpec(who, mood)
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
          {extra}
        </g>
      }
    />
  )
}

/** The claim folder on the investigator's desk with the final stamp on it. */
export function ClaimFile({ no, stamp, sub, color = '#d6453a' }: { no: string; stamp: string; sub: string; color?: string }) {
  return (
    <IsoStage label={`Hồ sơ bồi thường ${no}`} origin={[700, 150]} scale={2.6} sky={['#d6cfee', '#f7dccb']}>
      <Box at={[0, 0, 0]} size={[300, 220, 20]} color="#b8927a" />
      <Box at={[40, 34, 20]} size={[180, 140, 3]} color="#e8cf98" />
      <Box at={[48, 40, 23]} size={[166, 128, 1]} color="#fffaf0" />
      <OnPlane at={[56, 48, 24.2]} plane="top">
        <rect x="0" y="0" width="150" height="16" fill="#e8cf98" />
        <text x="6" y="11.5" fontSize="9.5" fontWeight="800" fill={iso.ink} fontFamily={FONT}>HỒ SƠ BỒI THƯỜNG SỐ {no}</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="6" y={24 + i * 9} width={i % 2 ? 100 : 130} height="2.4" fill="#cdbb9c" />
        ))}
        <g transform="rotate(-8 75 86)">
          <rect x="8" y="66" width="134" height="40" rx="4" fill="none" stroke={color} strokeWidth="3" />
          <text x="75" y="86" textAnchor="middle" fontSize={stamp.length > 20 ? 10 : 12} fontWeight="800" fill={color} fontFamily={FONT}>{stamp}</text>
          <text x="75" y="99" textAnchor="middle" fontSize="6.5" fill={color} fontFamily={MONO}>{sub}</text>
        </g>
      </OnPlane>
      <Box at={[238, 120, 20]} size={[40, 30, 5]} color={color} />
      <Box at={[244, 60, 20]} size={[22, 22, 8]} color={tone(color, -0.2)} />
      <Box at={[251, 67, 28]} size={[8, 8, 18]} color={iso.woodDark} />
      <Cyl at={[255, 71, 46]} r={8} len={8} axis="z" color={iso.woodDark} cap={iso.wood} />
      <Cup at={[258, 186, 20]} fill="#7b5236" />
      <Box at={[60, 186, 20]} size={[40, 6, 3]} color={iso.ink} />
    </IsoStage>
  )
}

/** A payout notification on a phone lying on the desk. */
export function Transfer({ amount, to, note }: { amount: string; to: string; note: string }) {
  return (
    <IsoStage label="Chuyển tiền bồi thường" origin={[700, 150]} scale={2.6} sky={['#c8d3e6', '#f1e1d2']}>
      <Box at={[0, 0, 0]} size={[300, 220, 20]} color="#b8927a" />
      <Box at={[90, 30, 20]} size={[100, 170, 6]} color={iso.ink} />
      <Box at={[95, 36, 26]} size={[90, 158, 0.6]} color="#fffaf0" />
      <OnPlane at={[95, 36, 26.8]} plane="top">
        <circle cx="45" cy="34" r="13" fill="#3f8a7e" />
        <path d="M38,34 l5,5 9,-10" stroke="#fff" strokeWidth="2.6" fill="none" />
        <text x="45" y="66" textAnchor="middle" fontSize="7.5" fill={iso.ink} fontFamily={FONT}>Chuyển tiền thành công</text>
        <text x="45" y="84" textAnchor="middle" fontSize="8.4" fontWeight="800" fill={iso.ink} fontFamily={MONO}>{amount}</text>
        <text x="45" y="100" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>An Tín → {to}</text>
        <text x="45" y="110" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>{note}</text>
      </OnPlane>
      <Cup at={[240, 60, 20]} fill="#7b5236" />
      <Box at={[220, 120, 20]} size={[50, 70, 3]} color="#e8cf98" />
    </IsoStage>
  )
}

/** The player at their desk under a notice pinned to the wall (taken off the case, reprimanded). */
export function Reprimand({ title, line, boxed = true }: { title: string; line: string; boxed?: boolean }) {
  const spec = useSpec('player', 'worried')
  return (
    <MiniRoom label={title}>
      <Face points={[[0.5, 50, 84], [0.5, 160, 84], [0.5, 160, 108], [0.5, 50, 108]]} fill={iso.blue} />
      <WallText at={[1, 105, 92]} plane="L" text="PHÒNG GIÁM ĐỊNH" size={20} />
      <Face points={[[150, 0.6, 50], [230, 0.6, 50], [230, 0.6, 106], [150, 0.6, 106]]} fill="#fffaf0" />
      <WallText at={[190, 0.8, 92]} plane="R" text={title} size={18} color={iso.ink} />
      <WallText at={[190, 0.8, 74]} plane="R" text={line} size={line.length > 16 ? 13 : 18} color="#d6453a" />
      <Box at={[150, 40, 0]} size={[100, 60, 50]} color="#b8927a" />
      <Box at={[160, 50, 50]} size={[30, 22, 26]} color={iso.ink} />
      {spec && <IsoFigure at={[96, 140, 0]} spec={spec} facing="y" />}
      {boxed && (
        <>
          <Box at={[94, 168, 30]} size={[32, 28, 26]} color={cardboard} />
          <Box at={[100, 172, 56]} size={[12, 16, 8]} color={iso.cream} />
          <Cyl at={[120, 182, 56]} r={6} len={10} axis="z" color={iso.leaf} />
        </>
      )}
      <Cyl at={[30, 228, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[22, 220, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </MiniRoom>
  )
}

/** A floating phone screen over a diorama: a viral clip, a livestream counter, a news headline. */
export function ScreenCard({ x = 190, y = 70, w = 360, lines, accent = '#ff5b4a' }: { x?: number; y?: number; w?: number; lines: { text: string; size?: number; color?: string }[]; accent?: string }) {
  const h = 30 + lines.length * 34
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="22" fill={iso.ink} opacity="0.84" />
      <circle cx={x + 32} cy={y + 34} r="9" fill={accent} />
      {lines.map((l, i) => (
        <text key={i} x={x + (i === 0 ? 52 : 24)} y={y + 43 + i * 34} fontSize={l.size ?? 24} fill={l.color ?? '#ffffff'} fontFamily={i === 0 ? MONO : FONT}>
          {l.text}
        </text>
      ))}
    </g>
  )
}
