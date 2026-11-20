import type { ReactNode } from 'react'
import type { PortraitSpec } from '@/art/Portrait'
import { useGame } from '@/game/store'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, WallText, iso, tone } from './iso'
import { IsoFigure } from './figure'
import { Cup } from './props'

// Epilogue scenes that come back in many chapters, in the diorama style of
// Chapter 1's epilogue: the court, the stamped file, the payout on a phone, the
// investigator taken off the case, a cold file, a hospital room. Chapters 5–8
// use these and add their own one-off dioramas.

export const FONT = "'Be Vietnam Pro', sans-serif"
export const MONO = 'IBM Plex Mono, monospace'
export const cardboard = '#d9a86a'

/** A suspect's (or the player's, id 'player') portrait spec, with an optional mood. */
export function useSpec(id: string, mood?: PortraitSpec['mood']): PortraitSpec | undefined {
  const data = useGame((s) => s.data)
  const spec = id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return spec && { ...spec, mood: mood ?? spec.mood }
}

/** The 3:2 frame every epilogue diorama sits in. */
export function Panel({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[3/2] overflow-hidden rounded-xl">{children}</div>
}

/** A small room: slab, two back walls, the usual epilogue camera. */
export function Room({ label, sky = ['#cfc8ea', '#f6dccb'], floor = '#e2d3c6', walls = ['#cbbfe0', '#ddd0e6'], edge = '#9a8fb0', overlay, children }: { label: string; sky?: [string, string]; floor?: string; walls?: [string, string]; edge?: string; overlay?: ReactNode; children: ReactNode }) {
  return (
    <IsoStage label={label} origin={[780, 250]} scale={2.15} sky={sky} overlay={overlay}>
      <Slab w={270} d={250} floor={floor} depth={22} />
      <BackWalls w={270} d={250} h={125} left={walls[0]} right={walls[1]} edge={edge} t={7} />
      {children}
    </IsoStage>
  )
}

/** An outdoor plot: slab only, no walls. */
export function Plot({ label, sky = ['#cfc8ea', '#f6dccb'], floor = '#d8c2ad', overlay, children }: { label: string; sky?: [string, string]; floor?: string; overlay?: ReactNode; children: ReactNode }) {
  return (
    <IsoStage label={label} origin={[760, 230]} scale={2.0} sky={sky} overlay={overlay}>
      <Slab w={300} d={260} floor={floor} depth={22} />
      {children}
    </IsoStage>
  )
}

const judge = (hair: PortraitSpec['hair'], hairColor: PortraitSpec['hairColor'], skin: PortraitSpec['skin']): PortraitSpec => ({
  skin, hair, hairColor, build: 'normal', outfit: 'suit', outfitColor: 'charcoal', age: 'mid', mood: 'stern',
})
export const officer: PortraitSpec = { skin: 2, hair: 'cap', hairColor: 'black', build: 'normal', outfit: 'uniform', outfitColor: 'olive', age: 'young', mood: 'stern' }

/** Courtroom: three judges at the bench under the emblem, the accused in the dock between two officers. */
export function Court({ accused, mood = 'worried', also, alsoMood = 'stern' }: { accused: string; mood?: PortraitSpec['mood']; also?: string; alsoMood?: PortraitSpec['mood'] }) {
  const spec = useSpec(accused, mood)
  const spec2 = useSpec(also ?? accused, alsoMood)
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
      <IsoFigure at={[40, 160, 0]} spec={officer} facing="y" />
      <Box at={[104, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      {spec && <IsoFigure at={[also ? 108 : 122, 165, 0]} spec={spec} facing="y" />}
      {also && spec2 && <IsoFigure at={[138, 168, 0]} spec={spec2} facing="y" />}
      <Box at={[166, 150, 0]} size={[5, 50, 46]} color="#8a5c38" />
      <Box at={[104, 196, 0]} size={[67, 6, 46]} color="#8a5c38" />
      <Box at={[102, 195, 46]} size={[71, 8, 4]} color="#a3714b" />
      <IsoFigure at={[206, 150, 0]} spec={officer} facing="y" />
    </IsoStage>
  )
}

/** The claim folder on the investigator's desk with the final stamp on it. */
export function Desk({ file, stamp, sub, color = '#d6453a' }: { file: string; stamp: string; sub: string; color?: string }) {
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

/** The payout notification on a phone lying on the desk. */
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
        <text x="45" y="110" textAnchor="middle" fontSize="5.6" fill={iso.inkSoft} fontFamily={MONO}>ND: {note}</text>
      </OnPlane>
      <Cup at={[240, 60, 20]} fill="#7b5236" />
      <Box at={[220, 120, 20]} size={[50, 70, 3]} color="#e8cf98" />
    </IsoStage>
  )
}

/** The player taken off the case, carrying their things out in a box. */
export function Boxing() {
  const spec = useSpec('player', 'worried')
  return (
    <Room label="Bị rút khỏi vụ việc">
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
    </Room>
  )
}

/** A folder at the bottom of a pile in a police archive, stamped "tồn đọng". */
export function ColdFile({ lines, stamp = 'TỒN ĐỌNG' }: { lines: [string, string]; stamp?: string }) {
  return (
    <Room label="Hồ sơ tồn đọng" sky={['#c4c6dc', '#e8dcd8']} walls={['#c9c6d6', '#d8d3e0']} floor="#d6cfd2">
      {/* archive shelves along the right wall */}
      {[0, 1].map((k) => (
        <g key={k}>
          <Box at={[30 + k * 110, 10, 0]} size={[100, 40, 6]} color="#8f8aa3" />
          {[0, 1, 2].map((l) => (
            <g key={l}>
              <Box at={[30 + k * 110, 10, 6 + l * 34]} size={[100, 40, 3]} color="#9a96ad" />
              {[0, 1, 2, 3, 4].map((i) => (
                <Box key={i} at={[34 + k * 110 + i * 19, 14, 9 + l * 34]} size={[15, 32, 24]} color={['#e8cf98', '#d9b98a', '#efdcae'][(i + l + k) % 3]} />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* the table with the file on top of a pile */}
      <Box at={[70, 110, 0]} size={[140, 100, 54]} color="#a99a8c" />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[86 + i * 3, 124 - i * 2, 54 + i * 5]} size={[96, 70, 5]} color={['#d9b98a', '#efdcae', '#e8cf98'][i]} />
      ))}
      <OnPlane at={[94, 124, 69.4]} plane="top">
        <text x="6" y="16" fontSize="8" fontWeight="800" fill={iso.ink} fontFamily={FONT}>{lines[0]}</text>
        <text x="6" y="28" fontSize="7" fill={iso.ink} fontFamily={MONO}>{lines[1]}</text>
        <g transform="rotate(-8 45 48)">
          <rect x="12" y="38" width="66" height="20" rx="3" fill="none" stroke="#d6453a" strokeWidth="2.4" />
          <text x="45" y="52" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d6453a" fontFamily={FONT}>{stamp}</text>
        </g>
      </OnPlane>
      <Box at={[20, 200, 0]} size={[40, 40, 30]} color={cardboard} />
    </Room>
  )
}

/** A hospital room: the bed by the window, someone sitting up in it. */
export function Hospital({ who, mood = 'smile', note }: { who: string; mood?: PortraitSpec['mood']; note?: string }) {
  const spec = useSpec(who, mood)
  return (
    <Room label="Phòng bệnh" sky={['#c8e0e0', '#f1e6dc']} walls={['#d6e4e2', '#e4eeec']} edge="#9fb8b6" floor="#e6e2da">
      {/* window and the IV stand */}
      <Face points={[[100, 0.5, 50], [210, 0.5, 50], [210, 0.5, 112], [100, 0.5, 112]]} fill="#bfe0ea" />
      <Face points={[[154, 0.8, 50], [157, 0.8, 50], [157, 0.8, 112], [154, 0.8, 112]]} fill="#e4eeec" />
      <Box at={[60, 40, 0]} size={[4, 4, 110]} color={iso.metal} />
      <Box at={[54, 36, 100]} size={[16, 6, 22]} color="#e8f2f4" />
      {/* the bed */}
      <Box at={[40, 60, 0]} size={[150, 80, 40]} color="#dfe6ea" />
      <Box at={[40, 60, 40]} size={[150, 80, 10]} color="#fbfbf8" />
      <Box at={[40, 60, 50]} size={[40, 80, 10]} color="#ffffff" />
      {spec && <IsoFigure at={[70, 84, 18]} spec={spec} facing="x" pose="sit" />}
      <Box at={[110, 64, 50]} size={[80, 72, 8]} color="#9fc2d6" />
      {/* bedside table, flowers */}
      <Box at={[200, 150, 0]} size={[40, 40, 50]} color="#c9b7a3" />
      <Cyl at={[218, 168, 50]} r={6} len={18} axis="z" color="#cfe6f2" />
      <Box at={[210, 160, 68]} size={[16, 16, 10]} color={iso.coral} />
      {note && (
        <>
          <Box at={[120, 150, 0]} size={[60, 4, 40]} color="#fffaf0" />
          <WallText at={[150, 154.5, 16]} plane="R" text={note} size={11} color={iso.ink} weight={700} />
        </>
      )}
    </Room>
  )
}
