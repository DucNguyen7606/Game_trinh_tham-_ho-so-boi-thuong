import type { ReactNode } from 'react'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, WallText, floorAt, iso, project, wallLAt, wallRAt, type V3 } from '@/art/iso/iso'
import { Book, HandTruck, Table } from '@/art/iso/props'
import { Camera, Patch } from '@/art/iso/street'

// Chapter 8 zones as dioramas. Each zone sets its own projection (where the
// floor's back corner sits on screen) so walls and floor fall under the
// hotspot percentages in case.json, which stay unchanged.

type Proj = { cx: number; cy: number; s: number }
const PROJ: Record<string, Proj> = {
  xuong: { cx: 800, cy: 300, s: 1.6 },
  kho: { cx: 800, cy: 200, s: 1.6 },
  'phong-qc': { cx: 800, cy: 330, s: 1.6 },
  'sieu-thi': { cx: 800, cy: 200, s: 1.6 },
}

/** World point on the floor (height z) under a screen point in percent, for one zone. */
export const at = (zone: string, px: number, py: number, z = 0) => floorAt(PROJ[zone], px, py, z)

/** Screen point (in the 1600 x 900 scene) of a world point in one zone, for markers drawn over it. */
export const scr = (zone: string, x: number, y: number, z = 0) => project(PROJ[zone], x, y, z)

/** Extra pieces a reconstruction panel adds to a zone (people, a crate in someone's hands). */
export interface SceneProps {
  extra?: ReactNode
}


const MONO = 'IBM Plex Mono, monospace'
const steel = '#b9c3cc'
const crateBlue = '#3f78b0'
const soyGreen = '#5f9a5b'

function Stage({ zone, label, children, sky = ['#c9c3e6', '#f3d8c8'] }: { zone: string; label: string; children: ReactNode; sky?: [string, string] }) {
  const p = PROJ[zone]
  return (
    <IsoStage label={label} origin={[p.cx, p.cy]} scale={p.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

/** A plastic crate of soy-milk bottles; `sour` gives the caps the bulge of a spoiled lot. */
export function Crate({ at: [x, y, z], sour = false }: { at: V3; sour?: boolean }) {
  return (
    <g>
      <Box at={[x, y, z]} size={[40, 40, 22]} color={crateBlue} />
      {[0, 1, 2].flatMap((i) =>
        [0, 1, 2].map((j) => (
          <Cyl key={`${i}${j}`} at={[x + 8 + i * 12, y + 8 + j * 12, z + 22]} r={4} len={sour ? 5 : 2} axis="z" color={sour ? '#e9d36a' : '#f4f1ea'} cap={sour ? '#f3e08a' : soyGreen} />
        )),
      )}
    </g>
  )
}

/** A wooden pallet with crates stacked 2 x 2 x 3, its lot card on the front; `sealed` wraps red-and-white tape round it. */
export function PalletStack({ at: [x, y, z], lot, sour = false, sealed = false }: { at: V3; lot: string; sour?: boolean; sealed?: boolean }) {
  return (
    <g>
      <Box at={[x, y, z]} size={[84, 84, 10]} color={iso.wood} />
      {[0, 1, 2].map((l) => [0, 1].flatMap((i) => [0, 1].map((j) => <Crate key={`${l}${i}${j}`} at={[x + 2 + i * 40, y + 2 + j * 40, z + 10 + l * 22]} sour={sour && l === 2} />)))}
      {sealed &&
        [30, 56].map((h) => (
          <g key={h}>
            <Face points={[[x - 1, y + 84.6, z + h], [x + 85, y + 84.6, z + h], [x + 85, y + 84.6, z + h + 5], [x - 1, y + 84.6, z + h + 5]]} fill="#e2463a" />
            <Face points={[[x + 84.6, y - 1, z + h], [x + 84.6, y + 85, z + h], [x + 84.6, y + 85, z + h + 5], [x + 84.6, y - 1, z + h + 5]]} fill="#e2463a" />
          </g>
        ))}
      <Face points={[[x + 18, y + 85, z + 14], [x + 66, y + 85, z + 14], [x + 66, y + 85, z + 30], [x + 18, y + 85, z + 30]]} fill="#fffaf0" />
      <WallText at={[x + 42, y + 85.4, z + 19]} plane="R" text={lot} size={8} color={iso.ink} />
    </g>
  )
}

/** Xưởng tiệt trùng line 2: the holding-tube thermometer on the left wall, the new steam valve in the corner, the UHT tank, the operator desk with the night log, the bottle conveyor. */
function Xuong({ extra }: SceneProps = {}) {
  const z = 'xuong'
  const p = PROJ[z]
  const [ny, nz] = wallLAt(p, 28, 40)
  const [vx, vz] = wallRAt(p, 52, 24)
  const [sx, sy] = at(z, 74, 62, 40)
  const [bx, by] = at(z, 88, 80, 30)
  return (
    <Stage zone={z} label="Xưởng tiệt trùng line 2, nhìn như sa bàn">
      <Slab w={600} d={480} floor="#c9d4cf" side="#b9c4bf" />
      {Array.from({ length: 8 }, (_, i) => (
        <Patch key={i} at={[i * 70, 0]} w={1.5} d={480} color="#b8c4bf" z={0.3} />
      ))}
      <BackWalls w={600} d={480} h={240} left="#dfe6e8" right="#e9eef0" edge="#8f9aa3" t={9} />
      <Patch at={[0, 440]} w={600} d={14} color="#f2c443" z={0.4} />
      {/* steam pipe along the right wall, the new valve near the corner */}
      <Cyl at={[0, 10, vz]} r={7} len={600} axis="x" color={steel} />
      <Cyl at={[vx - 9, 10, vz - 10]} r={11} len={20} axis="x" color="#d9dfe4" />
      <Cyl at={[vx, 10, vz + 10]} r={3} len={18} axis="z" color={iso.metal} />
      <Cyl at={[vx, 10, vz + 28]} r={14} len={3} axis="z" color="#e2463a" />
      <Face points={[[vx + 14, 1, vz - 26], [vx + 50, 1, vz - 26], [vx + 50, 1, vz - 8], [vx + 14, 1, vz - 8]]} fill="#fffaf0" />
      <WallText at={[vx + 32, 1.4, vz - 20]} plane="R" text="BẢO TRÌ 8/1" size={6} color={iso.ink} />
      {/* the holding tube along the left wall, its dial thermometer */}
      <Cyl at={[10, 0, nz - 44]} r={9} len={480} axis="y" color={steel} />
      <Cyl at={[0, ny, nz]} r={28} len={6} axis="x" color="#7e8794" cap="#fbfaf6" />
      <OnPlane at={[6.5, ny, nz]} plane="L">
        <circle r="24" fill="none" stroke="#7e8794" strokeWidth="1.2" />
        <line x1="0" y1="0" x2="12" y2="-20" stroke={iso.ink} strokeWidth="2.4" />
        <line x1="0" y1="0" x2="-20" y2="-10" stroke="#e2463a" strokeWidth="2.4" />
        <circle r="3" fill={iso.ink} />
        <text y="15" textAnchor="middle" fontSize="6" fontWeight="700" fill={iso.ink} fontFamily={MONO}>°C</text>
      </OnPlane>
      <Face points={[[0.6, ny - 40, nz + 6], [0.6, ny - 70, nz + 6], [0.6, ny - 70, nz - 14], [0.6, ny - 40, nz - 14]]} fill="#fffaf0" />
      <WallText at={[1, ny - 55, nz - 6]} plane="L" text="22:00 · 6/1" size={5.5} color={iso.ink} />
      {/* the UHT tank and its control box */}
      <Cyl at={[130, 330, 0]} r={60} len={130} axis="z" color={steel} cap="#d9dfe4" />
      <Box at={[200, 300, 0]} size={[30, 70, 80]} color="#7e8794" />
      <Face points={[[230.5, 340, 40], [230.5, 310, 40], [230.5, 310, 70], [230.5, 340, 70]]} fill="#2e2a4a" />
      <WallText at={[230.8, 325, 50]} plane="L" text="121°C" size={10} color="#7fe0c4" />
      <WallText at={[300, 0.8, 150]} plane="R" text="TIỆT TRÙNG UHT · L2" size={14} color={iso.ink} />
      {/* the operator desk, the night log open on it */}
      <Table at={[sx - 50, sy - 34, 0]} w={100} d={64} h={40} color={iso.woodDark} />
      <Book at={[sx - 12, sy - 12, 40]} color="#2f6aa8" />
      <Box at={[sx + 20, sy - 26, 40]} size={[20, 14, 14]} color="#3d3446" />
      {/* the bottle conveyor coming forward */}
      <Box at={[bx - 30, by - 40, 0]} size={[60, 300, 30]} color="#5d6470" />
      <Box at={[bx - 26, by - 36, 30]} size={[52, 292, 1]} color="#3d3446" />
      {Array.from({ length: 10 }, (_, i) => (
        <Cyl key={i} at={[bx, by - 24 + i * 28, 31]} r={7} len={22} axis="z" color="#f4f1ea" cap={soyGreen} />
      ))}
      {extra}
    </Stage>
  )
}

/** Kho thành phẩm: the sealed pallet of lot 0601-L2, the fine pallet of 0701-L1, the delivery board, the pallet truck. */
function Kho({ extra }: SceneProps = {}) {
  const z = 'kho'
  const p = PROJ[z]
  const [ax, ay] = at(z, 30, 58)
  const [bx, by] = at(z, 66, 58)
  const [gx, gz] = wallRAt(p, 85, 26)
  const [tx, ty] = at(z, 12, 82)
  return (
    <Stage zone={z} label="Kho thành phẩm, nhìn như sa bàn" sky={['#c3cbe6', '#e9d9d2']}>
      <Slab w={520} d={600} floor="#d3d9dd" side="#c1c8cc" />
      <BackWalls w={520} d={600} h={240} left="#cfe0ea" right="#dce8ef" edge="#8aa0b0" t={9} />
      {/* strip-curtain door on the left wall */}
      {Array.from({ length: 8 }, (_, i) => (
        <Face key={i} points={[[0.6, 120 + i * 14, 0], [0.6, 132 + i * 14, 0], [0.6, 132 + i * 14, 160], [0.6, 120 + i * 14, 160]]} fill={i % 2 ? '#e6f2f6' : '#cfe4ec'} />
      ))}
      <WallText at={[1, 176, 176]} plane="L" text="KHO MÁT 4°C" size={12} color="#2f6aa8" />
      {/* the delivery board on the right wall */}
      <Face points={[[gx - 76, 0.6, gz - 46], [gx + 76, 0.6, gz - 46], [gx + 76, 0.6, gz + 40], [gx - 76, 0.6, gz + 40]]} fill="#fbfaf6" />
      <WallText at={[gx, 1, gz + 26]} plane="R" text="LỊCH GIAO HÀNG" size={11} color="#2f4258" />
      <WallText at={[gx, 1, gz + 10]} plane="R" text="8/1 · 0601-L2 · 14 điểm" size={8} color="#2f4258" weight={600} />
      <WallText at={[gx, 1, gz - 2]} plane="R" text="9/1 · 0701-L1 · 12 điểm" size={8} color="#2f4258" weight={600} />
      <WallText at={[gx, 1, gz - 30]} plane="R" text="THU HỒI 11/1" size={14} color="#e2463a" />
      {/* the fine lot, then the sealed one */}
      <PalletStack at={[bx - 42, by - 42, 0]} lot="0701-L1" />
      <PalletStack at={[ax - 42, ay - 42, 0]} lot="0601-L2" sour sealed />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Box key={i} at={[ax - 60 + i * 24, ay + 62, 0]} size={[12, 4, 3]} color={i % 2 ? '#ffffff' : '#e2463a'} />
      ))}
      <HandTruck at={[tx - 20, ty - 70, 0]} />
      {extra}
    </Stage>
  )
}

/** Phòng QC: the release form pinned on the cork board, Thuận's desk with the sharps box, the printer and its tray of reused paper, the retained-sample fridge. */
function PhongQc({ extra }: SceneProps = {}) {
  const z = 'phong-qc'
  const p = PROJ[z]
  const [fy, fz] = wallLAt(p, 46, 30)
  const [hx, hy] = at(z, 20, 66, 20)
  const [kx, ky] = at(z, 70, 54, 50)
  const [mx] = wallRAt(p, 88, 50)
  return (
    <Stage zone={z} label="Phòng QC, nhìn như sa bàn">
      <Slab w={520} d={480} floor="#e6e2da" side="#d6d0c6" />
      <BackWalls w={520} d={480} h={220} left="#e7e2ee" right="#cfe0e6" edge="#9a8fb0" t={9} />
      {/* glass onto the factory floor on the right wall */}
      <Face points={[[20, 0.5, 90], [300, 0.5, 90], [300, 0.5, 200], [20, 0.5, 200]]} fill="#bcd6e0" />
      <Face points={[[158, 0.8, 90], [162, 0.8, 90], [162, 0.8, 200], [158, 0.8, 200]]} fill="#9fb8c4" />
      {/* the cork board with the release form */}
      <Face points={[[0.5, fy + 50, fz - 34], [0.5, fy - 50, fz - 34], [0.5, fy - 50, fz + 34], [0.5, fy + 50, fz + 34]]} fill="#c99a63" />
      <Face points={[[0.8, fy + 22, fz - 26], [0.8, fy - 22, fz - 26], [0.8, fy - 22, fz + 28], [0.8, fy + 22, fz + 28]]} fill="#fffaf0" />
      <WallText at={[1, fy, fz + 16]} plane="L" text="PHIẾU XUẤT" size={5.5} color={iso.ink} />
      <WallText at={[1, fy, fz - 6]} plane="L" text="ĐẠT" size={13} color="#3f8a7e" />
      <Cyl at={[0.8, fy, fz + 26]} r={2.5} len={2} axis="x" color="#e2463a" />
      {/* Thuận's desk against the left wall, the sharps box beside it */}
      <Table at={[0, hy - 150, 0]} w={80} d={130} h={60} color={iso.wood} />
      <Box at={[20, hy - 120, 60]} size={[30, 40, 26]} color="#3d3446" />
      <Box at={[hx - 12, hy - 12, 0]} size={[24, 24, 20]} color="#f2c443" />
      <Box at={[hx - 12, hy - 12, 20]} size={[24, 24, 4]} color="#e2463a" />
      {/* the printer table and the tray of reused paper */}
      <Table at={[kx - 50, ky - 30, 0]} w={100} d={60} h={50} color={iso.woodDark} />
      <Box at={[kx - 40, ky - 24, 50]} size={[46, 40, 22]} color="#e8e4dc" />
      <Box at={[kx + 12, ky - 16, 50]} size={[30, 24, 6]} color="#fffaf0" />
      <Box at={[kx + 14, ky - 14, 56]} size={[26, 20, 0.6]} color="#dbe6f0" />
      {/* the retained-sample fridge on the right wall */}
      <Box at={[mx - 40, 4, 0]} size={[80, 54, 200]} color="#eceee8" />
      <Face points={[[mx - 34, 58.5, 80], [mx + 34, 58.5, 80], [mx + 34, 58.5, 190], [mx - 34, 58.5, 190]]} fill="#bcd6d6" />
      {[100, 130, 160].flatMap((zz) =>
        [-20, 0, 20].map((o) => <Cyl key={`${zz}${o}`} at={[mx + o, 50, zz]} r={5} len={20} axis="z" color="#f4f1ea" cap={soyGreen} />),
      )}
      <Face points={[[mx - 4, 59, 120], [mx + 30, 59, 120], [mx + 30, 59, 132], [mx - 4, 59, 132]]} fill="#fffaf0" />
      {extra}
    </Stage>
  )
}

/** Hiệp Thành Mart: the corner camera, the soy-milk shelf by the door, the crates customers brought back, the guard's parking book by the glass door. */
function SieuThi({ extra }: SceneProps = {}) {
  const z = 'sieu-thi'
  const p = PROJ[z]
  const [ky] = at(z, 40, 46)
  const [cy, cz] = wallLAt(p, 14, 16)
  const [gx, gy] = at(z, 84, 70, 50)
  const [rx, ry] = at(z, 62, 82)
  return (
    <Stage zone={z} label="Siêu thị Hiệp Thành Mart, nhìn như sa bàn">
      <Slab w={560} d={480} floor="#f1ede4" side="#ddd6c8" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <Patch at={[i * 70, 0]} w={1.5} d={480} color="#e2dccf" z={0.3} />
          <Patch at={[0, i * 60]} w={560} d={1.5} color="#e2dccf" z={0.3} />
        </g>
      ))}
      <BackWalls w={560} d={480} h={270} left="#e9dcc6" right="#f1e6d2" edge="#a99078" t={9} />
      <Box at={[60, 0, 214]} size={[260, 4, 40]} color="#d6453a" />
      <WallText at={[190, 4.5, 224]} plane="R" text="HIỆP THÀNH MART" size={20} color="#ffffff" />
      {/* the glass door onto the parking, scooters outside */}
      <Face points={[[360, 0.5, 0], [540, 0.5, 0], [540, 0.5, 190], [360, 0.5, 190]]} fill="#9fbccb" />
      <Face points={[[448, 0.8, 0], [452, 0.8, 0], [452, 0.8, 190], [448, 0.8, 190]]} fill="#7e8794" />
      {[[380, '#cfd4d6'], [420, '#d6453a'], [480, '#2f4258']].map(([x, c]) => (
        <Face key={x as number} points={[[x as number, 0.9, 10], [(x as number) + 34, 0.9, 10], [(x as number) + 30, 0.9, 40], [(x as number) + 4, 0.9, 40]]} fill={c as string} />
      ))}
      {/* the camera in the corner of the ceiling */}
      <Camera at={[0, cy, cz]} wall="L" />
      {/* the soy-milk shelf along the left wall, a few gaps where bottles were taken */}
      <Box at={[0, ky - 90, 0]} size={[80, 200, 8]} color="#d8d0c0" />
      {[0, 1, 2].map((l) => (
        <g key={l}>
          <Box at={[0, ky - 90, 8 + l * 40]} size={[80, 200, 4]} color="#b9b4a8" />
          {Array.from({ length: 9 }, (_, i) =>
            [1, 4, 6].includes(i) && l === 1 ? null : <Cyl key={i} at={[60, ky - 78 + i * 22, 12 + l * 40]} r={7} len={24} axis="z" color="#f4f1ea" cap={soyGreen} />,
          )}
        </g>
      ))}
      <Box at={[0, ky - 90, 128]} size={[80, 200, 6]} color={soyGreen} />
      {/* the checkout counter */}
      <Box at={[220, 200, 0]} size={[120, 50, 60]} color="#b98a63" />
      <Box at={[240, 210, 60]} size={[30, 26, 16]} color="#3d3446" />
      {/* the guard's table by the door, the parking book on it */}
      <Table at={[gx - 40, gy - 30, 0]} w={80} d={60} h={50} color={iso.woodDark} />
      <Book at={[gx - 12, gy - 10, 50]} color="#2f6aa8" />
      {/* crates customers brought back */}
      <Crate at={[rx - 40, ry - 20, 0]} sour />
      <Crate at={[rx, ry - 20, 0]} sour />
      <Crate at={[rx - 20, ry - 20, 22]} sour />
      <Face points={[[rx - 34, ry + 20.5, 4], [rx + 30, ry + 20.5, 4], [rx + 30, ry + 20.5, 18], [rx - 34, ry + 20.5, 18]]} fill="#fffaf0" />
      <WallText at={[rx - 2, ry + 21, 7]} plane="R" text="KHÁCH TRẢ" size={8} color="#e2463a" />
      {extra}
    </Stage>
  )
}

export const isoSceneArt: Record<string, (props?: SceneProps) => JSX.Element> = {
  xuong: Xuong,
  kho: Kho,
  'phong-qc': PhongQc,
  'sieu-thi': SieuThi,
}


