import type { ReactNode } from 'react'
import type { Mood, PortraitSpec } from '@/art/Portrait'
import { useGame } from '@/game/store'
import { BackWalls, Box, Cyl, Face, IsoGroup, IsoStage, OnPlane, Slab, WallText, iso, tone } from './iso'
import { FrontBust, IsoFigure } from './figure'
import { Cup } from './props'

// Pieces every chapter needs once it is drawn in the diorama style: people in
// phone photos, stand-ins for the reconstruction, and the common epilogue
// dioramas (court, the stamped file, the payout, being taken off the case).
// Chapter 1 has its own copies; chapters converted later import these.

export const FONT = "'Be Vietnam Pro', sans-serif"
export const MONO = 'IBM Plex Mono, monospace'

// --- Photos seen straight on ------------------------------------------------

const DX = 0.32, DY = 0.24

/** A block seen straight on: front face (x, y = its top-left corner), with a sliver of top and right side `d` deep. */
export const Fb = ({ x, y, w, h, d = 10, c, top, side }: { x: number; y: number; w: number; h: number; d?: number; c: string; top?: string; side?: string }) => {
  const ox = d * DX, oy = d * DY
  return (
    <g>
      <polygon points={`${x + w},${y} ${x + w + ox},${y - oy} ${x + w + ox},${y + h - oy} ${x + w},${y + h}`} fill={side ?? tone(c, -0.28)} />
      <polygon points={`${x},${y} ${x + w},${y} ${x + w + ox},${y - oy} ${x + ox},${y - oy}`} fill={top ?? tone(c, 0.14)} />
      <rect x={x} y={y} width={w} height={h} fill={c} />
    </g>
  )
}

const extra: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'young', mood: 'smile' }

/**
 * A block person in a photo: (x, y) is the middle of the chest, s the size.
 * `spec` is a suspect's own look (from case.json); without it `look` and raw
 * colours describe an extra.
 */
export const PhotoPerson = ({ x, y, s = 1, spec, look, skin, hair, shirt }: { x: number; y: number; s?: number; spec?: PortraitSpec; look?: Partial<PortraitSpec>; skin?: string; hair?: string; shirt?: string }) => (
  <FrontBust spec={{ ...(spec ?? extra), ...look }} k={1.25 * s} at={[x, y - 30 * s]} colors={{ skin, hair, cloth: shirt }} />
)

/** Date stamp in the corner of a phone photo. */
export const PhotoStamp = ({ t, x = 8, y = 8 }: { t: string; x?: number; y?: number }) => (
  <g>
    <rect x={x} y={y} width={t.length * 6.6 + 12} height="18" rx="6" fill={iso.ink} opacity="0.55" />
    <text x={x + 6} y={y + 13} fontSize="11" fill="#fff" fontFamily={MONO}>{t}</text>
  </g>
)

// --- Reconstruction stand-ins ----------------------------------------------

export type StandPose = 'stand' | 'crouch' | 'sit' | 'swing'

/**
 * A faceless-looking block figure drawn over a 1600 x 900 diorama: (x, y) is
 * where the feet touch the ground, h the height in pixels, `color` the shirt of
 * whoever it stands for. `flip` turns it to face the lower right.
 */
export function StandIn({ x, y, h = 260, color, pose = 'stand', flip = false, spec: own, children }: { x: number; y: number; h?: number; color: string; pose?: StandPose; flip?: boolean; spec?: Partial<PortraitSpec>; children?: ReactNode }) {
  const spec: PortraitSpec = { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'charcoal', mood: 'neutral', ...own }
  const k = h / 105
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={h * 0.22} ry={h * 0.07} fill={iso.ink} opacity="0.25" />
      <IsoGroup origin={[x, y]} scale={k}>
        <g className={pose === 'swing' ? 'iso-talking' : undefined}>
          <IsoFigure at={[-13, -9, pose === 'crouch' ? -12 : 0]} spec={spec} cloth={color} facing={flip ? 'x' : 'y'} pose={pose === 'stand' || pose === 'swing' ? 'stand' : 'sit'} talking={pose === 'swing'} />
        </g>
        {children}
      </IsoGroup>
    </g>
  )
}

/** Something a stand-in carries, in the stand-in's own units (about 105 tall). */
export const Held = {
  Bag: ({ color = '#2f4258' }: { color?: string }) => <Box at={[16, 4, 34]} size={[16, 12, 22]} color={color} />,
  Pole: () => <Box at={[20, 14, 0]} size={[3, 3, 130]} color="#d8c48f" />,
  Can: () => <Box at={[18, 4, 22]} size={[14, 10, 18]} color={iso.coral} />,
  Box: ({ color = '#d9a86a' }: { color?: string }) => <Box at={[-4, 18, 40]} size={[34, 22, 24]} color={color} />,
  Phone: () => <Box at={[18, 10, 58]} size={[5, 2, 9]} color={iso.ink} />,
}

/** A numbered marker over a diorama. */
export const Marker = ({ x, y, n }: { x: number; y: number; n: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="26" fill={iso.coral} stroke="#ffffff" strokeWidth="5" />
    <text y="10" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff" fontFamily={FONT}>
      {n}
    </text>
  </g>
)

/** Evening wash over a dusk diorama, for night panels. */
export const Night = ({ o = 0.38 }: { o?: number }) => <rect width="1600" height="900" fill="#2e2a5a" opacity={o} style={{ mixBlendMode: 'multiply' }} />

// --- Epilogue dioramas ------------------------------------------------------

export function useCaseSpec(id: string, mood?: Mood): PortraitSpec | undefined {
  const data = useGame((s) => s.data)
  const spec = id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return spec && { ...spec, mood: mood ?? spec.mood }
}

/** The 3:2 card an epilogue picture sits in. */
export function EpiPanel({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[3/2] overflow-hidden rounded-xl">{children}</div>
}

/** A small room or yard: slab, optional back walls, everything else as children. 270 x 250 world units. */
export function EpiRoom({
  label,
  children,
  sky = ['#cfc8ea', '#f6dccb'],
  floor = '#e2d3c6',
  left,
  right,
  edge = '#9a8fb0',
  h = 125,
  overlay,
}: {
  label: string
  children?: ReactNode
  sky?: [string, string]
  floor?: string
  left?: string
  right?: string
  edge?: string
  h?: number
  overlay?: ReactNode
}) {
  return (
    <IsoStage label={label} origin={[780, 250]} scale={2.15} sky={sky} overlay={overlay}>
      <Slab w={270} d={250} floor={floor} depth={22} />
      {(left || right) && <BackWalls w={270} d={250} h={h} left={left} right={right} edge={edge} t={7} />}
      {children}
    </IsoStage>
  )
}

const judge = (hair: PortraitSpec['hair'], hairColor: PortraitSpec['hairColor'], skin: PortraitSpec['skin']): PortraitSpec => ({
  skin, hair, hairColor, build: 'normal', outfit: 'suit', outfitColor: 'charcoal', age: 'mid', mood: 'stern',
})
const officer: PortraitSpec = { skin: 2, hair: 'cap', hairColor: 'black', build: 'normal', outfit: 'uniform', outfitColor: 'olive', age: 'young', mood: 'stern' }

/** Courtroom: three judges at the bench, one or two people in the dock between two officers. Without `accused`, the dock is a claimant's seat. */
export function EpiCourt({ accused, mood = 'worried', dock = true }: { accused: string[]; mood?: Mood; dock?: boolean }) {
  const data = useGame((s) => s.data)
  const specs = accused.map((id) => {
    const sp = id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
    return sp && { ...sp, mood }
  })
  const star = (x: number, z: number, r: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5
      const rr = i % 2 ? r * 0.42 : r
      return [x + Math.cos(a) * rr, 1.6, z - Math.sin(a) * rr] as [number, number, number]
    })
  const two = specs.length > 1
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
      {dock && <IsoFigure at={[30, 160, 0]} spec={officer} facing="y" />}
      <Box at={[two ? 74 : 104, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      {specs.map((sp, i) => sp && <IsoFigure key={i} at={[(two ? 92 : 122) + i * 48, 165, 0]} spec={sp} facing="y" />)}
      <Box at={[two ? 196 : 166, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      <Box at={[two ? 74 : 104, 196, 0]} size={[two ? 127 : 67, 6, 46]} color="#8a5c38" />
      <Box at={[two ? 72 : 102, 195, 46]} size={[two ? 131 : 71, 8, 4]} color="#a3714b" />
      {dock && <IsoFigure at={[220, 150, 0]} spec={officer} facing="y" />}
    </IsoStage>
  )
}

/** The claim folder on the investigator's desk with the final stamp on it. */
export function EpiDesk({ file, stamp, sub, color = '#d6453a' }: { file: string; stamp: string; sub: string; color?: string }) {
  return (
    <IsoStage label={`Hồ sơ bồi thường ${file}`} origin={[700, 150]} scale={2.6} sky={['#d6cfee', '#f7dccb']}>
      <Box at={[0, 0, 0]} size={[300, 220, 20]} color="#b8927a" />
      <Box at={[40, 34, 20]} size={[180, 140, 3]} color="#e8cf98" />
      <Box at={[48, 40, 23]} size={[166, 128, 1]} color="#fffaf0" />
      <OnPlane at={[56, 48, 24.2]} plane="top">
        <rect x="0" y="0" width="150" height="16" fill="#e8cf98" />
        <text x="6" y="11.5" fontSize="9.5" fontWeight="800" fill={iso.ink} fontFamily={FONT}>HỒ SƠ BỒI THƯỜNG SỐ {file}</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="6" y={24 + i * 9} width={i % 2 ? 100 : 130} height="2.4" fill="#cdbb9c" />
        ))}
        <g transform="rotate(-8 75 86)">
          <rect x="4" y="66" width="142" height="40" rx="4" fill="none" stroke={color} strokeWidth="3" />
          <text x="75" y="86" textAnchor="middle" fontSize={stamp.length > 20 ? 10 : 12} fontWeight="800" fill={color} fontFamily={FONT}>{stamp}</text>
          <text x="75" y="99" textAnchor="middle" fontSize={sub.length > 34 ? 5.2 : 6.5} fill={color} fontFamily={MONO}>{sub}</text>
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

/** The payout notification on a phone lying on the desk. */
export function EpiTransfer({ amount, to, note }: { amount: string; to: string; note: string }) {
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
        <text x="45" y="110" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>ND: {note}</text>
      </OnPlane>
      <Cup at={[240, 60, 20]} fill="#7b5236" />
      <Box at={[220, 120, 20]} size={[50, 70, 3]} color="#e8cf98" />
    </IsoStage>
  )
}

const cardboard = '#d9a86a'

/** The player taken off the case, carrying their things out in a box. */
export function EpiBoxing() {
  const spec = useCaseSpec('player', 'worried')
  return (
    <EpiRoom label="Bị rút khỏi vụ việc" left="#cbbfe0" right="#ddd0e6">
      <Face points={[[0.5, 50, 84], [0.5, 160, 84], [0.5, 160, 108], [0.5, 50, 108]]} fill={iso.blue} />
      <WallText at={[1, 105, 92]} plane="L" text="PHÒNG GIÁM ĐỊNH" size={20} />
      <Face points={[[150, 0.6, 50], [230, 0.6, 50], [230, 0.6, 106], [150, 0.6, 106]]} fill="#fffaf0" />
      <WallText at={[190, 0.8, 92]} plane="R" text="QUYẾT ĐỊNH" size={20} color={iso.ink} />
      <WallText at={[190, 0.8, 74]} plane="R" text="RÚT KHỎI VỤ VIỆC" size={19} color="#d6453a" />
      <Box at={[150, 40, 0]} size={[100, 60, 50]} color="#b8927a" />
      <Box at={[160, 50, 50]} size={[30, 22, 26]} color={iso.ink} />
      {spec && <IsoFigure at={[96, 140, 0]} spec={spec} facing="y" />}
      <Box at={[94, 168, 30]} size={[32, 28, 26]} color={cardboard} />
      <Box at={[100, 172, 56]} size={[12, 16, 8]} color={iso.cream} />
      <Cyl at={[120, 182, 56]} r={6} len={10} axis="z" color={iso.leaf} />
      <Cyl at={[30, 228, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[22, 220, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </EpiRoom>
  )
}

/** A potted plant, for corners. */
export const Plant = ({ at }: { at: [number, number] }) => (
  <g>
    <Cyl at={[at[0], at[1], 0]} r={12} len={20} axis="z" color="#c98a5c" />
    <Box at={[at[0] - 8, at[1] - 8, 20]} size={[16, 16, 22]} color={iso.leaf} />
  </g>
)
