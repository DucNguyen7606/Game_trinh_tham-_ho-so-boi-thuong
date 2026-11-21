import type { ReactNode } from 'react'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, Smudge, WallText, floorAt, iso, tone, wallLAt, wallRAt, type V3 } from '@/art/iso/iso'
import { Table } from '@/art/iso/props'

// Chapter 4 zones as dioramas: the abandoned truck on the red dirt road among
// dragon-fruit fields, the roadside of Highway 1A, the Đất Đỏ pepper store and
// the old sand-blown store at Phan Rí. Each zone has its own camera so the
// pieces land under the hotspot percentages in case.json.

type Cam = { cx: number; cy: number; s: number }

function Stage({ cam, label, sky, children }: { cam: Cam; label: string; sky?: [string, string]; children: ReactNode }) {
  return (
    <IsoStage label={label} origin={[cam.cx, cam.cy]} scale={cam.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

const FONT = "'Be Vietnam Pro', sans-serif"
const redDirt = '#c98a6c'
const cabBlue = '#4f8ea5'
const boxRed = '#d0644a'
const sackC = '#d9c29a'

/**
 * A frame turned about the vertical axis: local u runs along `ang` (degrees,
 * measured from world x towards world y), v across it, z up; (x0, y0) is the local origin.
 */
function turned(x0: number, y0: number, ang: number) {
  const a = (ang * Math.PI) / 180
  const ca = Math.cos(a), sa = Math.sin(a)
  return (u: number, v: number, z: number): V3 => [x0 + u * ca - v * sa, y0 + u * sa + v * ca, z]
}

/**
 * A block in a turned frame: [u, v, z] corner, [l, w, h] size. Draws the faces that
 * face the camera (their normal points towards +x+y) and the top, shaded like Box.
 */
function RBox({ W, at, size, color, top }: { W: (u: number, v: number, z: number) => V3; at: V3; size: V3; color: string; top?: string }) {
  const [u, v, z] = at
  const [l, w, h] = size
  const p0 = W(u, v, 0), pu = W(u + 1, v, 0), pv = W(u, v + 1, 0)
  const nu: [number, number] = [pu[0] - p0[0], pu[1] - p0[1]] // +u direction
  const nv: [number, number] = [pv[0] - p0[0], pv[1] - p0[1]] // +v direction
  const faces: JSX.Element[] = []
  // shade a side by how far it faces the darker +x side
  const shade = (n: [number, number]) => tone(color, -0.14 - 0.16 * Math.max(0, (n[0] - n[1]) / 1.42))
  const side = (key: string, n: [number, number], pts: V3[]) => {
    if (n[0] + n[1] > 0.02) faces.push(<Face key={key} points={pts} fill={shade(n)} />)
  }
  const c = (uu: number, vv: number, zz: number) => W(uu, vv, zz)
  side('-u', [-nu[0], -nu[1]], [c(u, v, z), c(u, v + w, z), c(u, v + w, z + h), c(u, v, z + h)])
  side('-v', [-nv[0], -nv[1]], [c(u, v, z), c(u + l, v, z), c(u + l, v, z + h), c(u, v, z + h)])
  side('+u', nu, [c(u + l, v, z), c(u + l, v + w, z), c(u + l, v + w, z + h), c(u + l, v, z + h)])
  side('+v', nv, [c(u, v + w, z), c(u + l, v + w, z), c(u + l, v + w, z + h), c(u, v + w, z + h)])
  return (
    <g>
      {faces}
      <Face points={[c(u, v, z + h), c(u + l, v, z + h), c(u + l, v + w, z + h), c(u, v + w, z + h)]} fill={top ?? tone(color, 0.08)} />
    </g>
  )
}

/** A dragon-fruit plant on its concrete post. */
function DragonFruit({ x, y, h = 70 }: { x: number; y: number; h?: number }) {
  return (
    <g>
      <Box at={[x - 4, y - 4, 0]} size={[8, 8, h]} color="#cfc8c0" />
      <Box at={[x - 22, y - 22, h - 8]} size={[44, 44, 22]} color="#6f9e66" />
      <Box at={[x - 16, y - 16, h + 14]} size={[32, 32, 10]} color="#86b47a" />
      <Box at={[x + 14, y + 4, h - 14]} size={[8, 8, 8]} color="#e0457a" />
      <Box at={[x - 8, y + 16, h - 10]} size={[8, 8, 8]} color="#e0457a" />
    </g>
  )
}

/** A stack of jute pepper sacks. */
function Sacks({ x, y, cols = 3, rows = 2, layers = 3, lot }: { x: number; y: number; cols?: number; rows?: number; layers?: number; lot?: string }) {
  const out: JSX.Element[] = []
  for (let l = 0; l < layers; l++)
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        out.push(<Box key={`${l}${r}${c}`} at={[x + c * 34, y + r * 50, l * 22]} size={[32, 48, 21]} color={(l + r + c) % 2 ? sackC : tone(sackC, -0.06)} />)
  return (
    <g>
      {out}
      {lot && (
        <OnPlane at={[x + 4, y + rows * 50 + 0.3, layers * 22 - 4]} plane="R">
          <text x="0" y="6" fontSize="6" fontWeight="800" fill="#7a4f32" fontFamily={FONT}>{lot}</text>
        </OnPlane>
      )}
    </g>
  )
}

// --- Chỗ bỏ xe ------------------------------------------------------------------

const BX: Cam = { cx: 760, cy: 271, s: 2.38 }

/** The truck left on a red dirt track between dragon-fruit fields, container doors open. */
function BoXe() {
  const FW = 360, FD = 380
  const W = turned(-13, 198, -27)
  const L = 383, Wd = 88
  const [fx, fy] = floorAt(BX, 58, 86)
  const wheel = (u: number) => (
    <g key={u}>
      <RBox W={W} at={[u - 15, Wd - 6, 0]} size={[30, 12, 30]} color="#2e2a3a" />
      <RBox W={W} at={[u - 6, Wd + 5.5, 10]} size={[12, 1, 10]} color={iso.metal} />
    </g>
  )
  // the near door, swung open flat against the container side
  const door: V3[] = [W(L - 44, Wd + 2, 34), W(L, Wd + 2, 34), W(L, Wd + 2, 176), W(L - 44, Wd + 2, 176)]
  return (
    <Stage cam={BX} label="Chiếc container bị bỏ lại trên đường đất đỏ, nhìn như sa bàn" sky={['#c9c3e6', '#f9cfb3']}>
      <Slab w={FW} d={FD} floor="#cdb08a" side="#d8c2ad" depth={20} />
      {/* the red dirt track under the truck */}
      <Face points={[W(-60, -30, 0.3), W(480, -30, 0.3), W(480, 130, 0.3), W(-60, 130, 0.3)]} fill={redDirt} />
      {/* dragon-fruit rows behind */}
      {[20, 100, 180, 260, 340].map((x) => (
        <DragonFruit key={x} x={x} y={20} h={60} />
      ))}
      {[30, 120].map((y) => (
        <DragonFruit key={y} x={16} y={y + 60} h={60} />
      ))}
      {/* tyre tracks of the police pickup and the boot prints around the doors */}
      <Face points={[[fx - 80, fy - 60, 0.5], [fx + 60, fy - 80, 0.5], [fx + 64, fy - 72, 0.5], [fx - 76, fy - 52, 0.5]]} fill="#a86b52" />
      {[[-30, -20], [-10, -4], [12, -18], [26, 2], [-18, 12]].map(([a, b], i) => (
        <Face key={i} points={[[fx + a, fy + b, 0.6], [fx + a + 10, fy + b, 0.6], [fx + a + 10, fy + b + 5, 0.6], [fx + a, fy + b + 5, 0.6]]} fill="#8a4a30" />
      ))}
      {/* chassis and wheels on the far side */}
      <RBox W={W} at={[10, 6, 20]} size={[L - 10, Wd - 12, 14]} color="#4b4760" />
      {/* the container: open at the back, the far door swung behind */}
      <RBox W={W} at={[100, 0, 34]} size={[L - 100, Wd, 142]} color={boxRed} />
      {/* ribs on the near side */}
      {Array.from({ length: 12 }, (_, i) => (
        <Face key={i} points={[W(110 + i * 22, Wd + 0.4, 38), W(113 + i * 22, Wd + 0.4, 38), W(113 + i * 22, Wd + 0.4, 172), W(110 + i * 22, Wd + 0.4, 172)]} fill={tone(boxRed, -0.24)} />
      ))}
      {/* the open back: a dark inside with the swept wooden floor */}
      <Face points={[W(L + 0.4, 6, 40), W(L + 0.4, Wd - 6, 40), W(L + 0.4, Wd - 6, 170), W(L + 0.4, 6, 170)]} fill="#2e2a3a" />
      <Face points={[W(L - 60, 6, 36), W(L + 0.4, 6, 36), W(L + 0.4, Wd - 6, 36), W(L - 60, Wd - 6, 36)]} fill="#a07c5a" />
      <Face points={[W(L + 0.6, 6, 34), W(L + 0.6, Wd - 6, 34), W(L + 0.6, Wd - 6, 40), W(L + 0.6, 6, 40)]} fill="#b98f6e" />
      {/* the near door, the lock rods and the cut seal hanging from the handle */}
      <Face points={door} fill={tone(boxRed, -0.08)} />
      <Face points={[W(L - 30, Wd + 2.5, 40), W(L - 27, Wd + 2.5, 40), W(L - 27, Wd + 2.5, 172), W(L - 30, Wd + 2.5, 172)]} fill={iso.metal} />
      <RBox W={W} at={[L - 40, Wd + 2.6, 136]} size={[14, 2, 4]} color={iso.metal} />
      <RBox W={W} at={[L - 34, Wd + 3, 122]} size={[3, 1, 14]} color={iso.gold} />
      <RBox W={W} at={[L - 35, Wd + 3, 118]} size={[5, 1, 5]} color={iso.gold} />
      {[160, 200, 300, 340].map(wheel)}
      {/* the cab, the GPS box on its roof, the window down on the passenger side */}
      <RBox W={W} at={[0, 0, 22]} size={[90, Wd, 114]} color={cabBlue} />
      <Face points={[W(14, Wd + 0.4, 74), W(70, Wd + 0.4, 74), W(70, Wd + 0.4, 116), W(14, Wd + 0.4, 116)]} fill="#2e2a3a" />
      <Face points={[W(20, Wd + 0.6, 80), W(30, Wd + 0.6, 80), W(30, Wd + 0.6, 88), W(20, Wd + 0.6, 88)]} fill={iso.ink} />
      <RBox W={W} at={[20, Wd + 0.6, 84]} size={[4, 1, 3]} color="#7fae8a" />
      <Face points={[W(0, Wd + 0.4, 36), W(90, Wd + 0.4, 36), W(90, Wd + 0.4, 42), W(0, Wd + 0.4, 42)]} fill={tone(cabBlue, -0.3)} />
      <RBox W={W} at={[35, Wd / 2 - 10, 136]} size={[24, 20, 10]} color="#e9e1d4" />
      <RBox W={W} at={[50, Wd / 2 - 2, 146]} size={[3, 3, 10]} color={iso.ink} />
      <RBox W={W} at={[40, Wd / 2 - 4, 146]} size={[4, 2, 1]} color="#7fae8a" />
      {wheel(50)}
      {/* near-side dragon-fruit plants framing the shot */}
      <DragonFruit x={330} y={340} h={56} />
      <DragonFruit x={40} y={350} h={56} />
    </Stage>
  )
}

// --- Lề Quốc lộ 1A -----------------------------------------------------------------

const LD: Cam = { cx: 800, cy: 200, s: 1.6 }

/** The roadside where Đạt was found: clean asphalt, grey tape in the grass, the guard post, a km post, a shuttered stall. */
function LeDuong() {
  const FW = 520, FD = 600
  const [bx, by] = floorAt(LD, 44, 76)
  const [vx, vy] = floorAt(LD, 66, 60, 40)
  const [kx, ky] = floorAt(LD, 84, 56, 40)
  const [qy, qz] = wallLAt(LD, 12, 46, 20)
  const [hx, hy] = floorAt(LD, 14, 80)
  const [rx] = floorAt(LD, 28, 62)
  return (
    <Stage cam={LD} label="Lề Quốc lộ 1A đoạn Hàm Thuận Nam, nhìn như sa bàn" sky={['#c3c9e6', '#f4d2bd']}>
      <Slab w={FW} d={FD} floor="#9fbf86" side="#d8c9b0" />
      {/* the highway running away from the camera, with its centre line */}
      <Face points={[[rx - 60, 0, 0.3], [rx + 70, 0, 0.3], [rx + 70, FD, 0.3], [rx - 60, FD, 0.3]]} fill="#8c8a99" />
      {Array.from({ length: 8 }, (_, i) => (
        <Face key={i} points={[[rx + 4, 20 + i * 75, 0.5], [rx + 8, 20 + i * 75, 0.5], [rx + 8, 60 + i * 75, 0.5], [rx + 4, 60 + i * 75, 0.5]]} fill="#fffaf0" />
      ))}
      <Face points={[[rx - 60, 0, 0.5], [rx - 56, 0, 0.5], [rx - 56, FD, 0.5], [rx - 60, FD, 0.5]]} fill="#fffaf0" />
      <Face points={[[rx + 66, 0, 0.5], [rx + 70, 0, 0.5], [rx + 70, FD, 0.5], [rx + 66, FD, 0.5]]} fill="#fffaf0" />
      {/* power poles along the far edge */}
      {[260, 380, 500].map((x) => (
        <g key={x}>
          <Box at={[x, 16, 0]} size={[6, 6, 190]} color="#cfc8c0" />
          <Box at={[x - 20, 16, 176]} size={[46, 6, 5]} color="#cfc8c0" />
        </g>
      ))}
      {/* the shuttered drinks stall on the left, roof of corrugated tin */}
      <Box at={[0, qy - 70, 0]} size={[20, 140, 96]} color="#d9c7b7" />
      <Face points={[[20.4, qy - 60, 4], [20.4, qy + 60, 4], [20.4, qy + 60, 86], [20.4, qy - 60, 86]]} fill="#9aa4b4" />
      {[14, 28, 42, 56, 70].map((z) => (
        <Face key={z} points={[[20.7, qy - 60, z], [20.7, qy + 60, z], [20.7, qy + 60, z + 2], [20.7, qy - 60, z + 2]]} fill="#7f889a" />
      ))}
      <Box at={[0, qy - 80, qz + 4]} size={[60, 160, 6]} color="#b8bccb" />
      <Box at={[24, qy + 70, 0]} size={[30, 30, 26]} color="#e46b4f" />
      <Box at={[30, qy - 90, 0]} size={[24, 24, 24]} color="#5d8ea3" />
      {/* seed shells and plastic cups by the stall */}
      {[[0, 0], [8, 10], [-10, 6], [14, -4], [4, 18], [-6, -8]].map(([a, b], i) => (
        <Box key={i} at={[hx + a, hy + b, 0]} size={[3, 2, 1]} color="#2e2a3a" />
      ))}
      <Cyl at={[hx + 22, hy - 10, 0]} r={4} len={10} axis="z" color="#fffaf0" cap="#e9e1d4" />
      <Cyl at={[hx - 20, hy + 20, 2]} r={4} len={10} axis="x" color="#fffaf0" cap="#e9e1d4" />
      {/* strips of grey tape in the grass, cut clean */}
      {[[0, 0, 20], [16, 10, 14], [-10, 18, 18]].map(([a, b, l], i) => (
        <Box key={i} at={[bx + a, by + b, 0]} size={[l, 4, 1]} color="#9aa3b5" />
      ))}
      {/* the guard post with Đạt's jacket over it, wallet and phone in the pocket */}
      <Box at={[vx - 10, vy - 10, 0]} size={[12, 12, 46]} color="#fffaf0" />
      <Box at={[vx - 10, vy - 10, 30]} size={[12, 12.6, 8]} color="#d6453a" />
      <Box at={[vx - 18, vy - 12, 34]} size={[28, 16, 14]} color="#7d6a4a" />
      <Box at={[vx - 6, vy + 4, 30]} size={[8, 1, 12]} color={iso.ink} />
      {/* the km post */}
      <Box at={[kx - 8, ky - 8, 0]} size={[16, 16, 54]} color="#fffaf0" />
      <Box at={[kx - 8, ky - 8, 40]} size={[16, 16.4, 14]} color="#d6453a" />
      <OnPlane at={[kx - 6, ky + 8.4, 36]} plane="R">
        <text x="6" y="4" textAnchor="middle" fontSize="4.5" fontWeight="800" fill={iso.ink} fontFamily={FONT}>P.THIẾT</text>
        <text x="6" y="11" textAnchor="middle" fontSize="6" fontWeight="800" fill={iso.ink} fontFamily={FONT}>18</text>
      </OnPlane>
      <Box at={[440, 520, 0]} size={[40, 40, 14]} color="#86b47a" />
    </Stage>
  )
}

// --- Kho Tiêu Đất Đỏ --------------------------------------------------------------

const KD: Cam = { cx: 800, cy: 200, s: 1.6 }

/** The Đất Đỏ pepper store in Buôn Ma Thuột: price board, broken camera, sacks of lot DD-1103, two desks. */
function KhoDatDo() {
  const FW = 470, FD = 480
  const [gy, gz] = wallLAt(KD, 22, 30)
  const [cx, cz] = wallRAt(KD, 86, 22)
  const [sx, sy] = floorAt(KD, 52, 62, 74)
  const [dx, dy] = floorAt(KD, 36, 66, 74)
  const [nx, ny] = floorAt(KD, 60, 38, 74)
  const [kx, ky] = floorAt(KD, 76, 66, 50)
  return (
    <Stage cam={KD} label="Kho tiêu Đất Đỏ ở Buôn Ma Thuột, nhìn như sa bàn" sky={['#cdc6e8', '#f6d3c0']}>
      <Slab w={FW} d={FD} floor="#d4c6b6" />
      <BackWalls w={FW} d={FD} h={230} left="#d9c7b7" right="#e6d6c4" edge="#a07c5a" t={8} />
      {/* roof truss along the top */}
      <Box at={[0, 0, 214]} size={[FW, 8, 8]} color={iso.woodDark} />
      <Box at={[0, 0, 214]} size={[8, FD, 8]} color={iso.woodDark} />
      <WallText at={[200, 1, 150]} plane="R" text="TIÊU ĐẤT ĐỎ" size={26} color="#b8452f" />
      {/* the chalk price board */}
      <Face points={[[0.5, gy - 70, gz - 50], [0.5, gy + 70, gz - 50], [0.5, gy + 70, gz + 40], [0.5, gy - 70, gz + 40]]} fill="#3f5e4a" />
      <OnPlane at={[1, gy + 64, gz + 34]} plane="L">
        <text x="6" y="12" fontSize="9" fontWeight="800" fill="#fffaf0" fontFamily={FONT}>TIÊU ĐEN 500g/l</text>
        <text x="6" y="30" fontSize="14" fontWeight="800" fill="#ffe1a0" fontFamily={FONT}>152.000đ/kg</text>
        <text x="6" y="46" fontSize="7" fill="#fffaf0" fontFamily={FONT}>đầu năm 98</text>
      </OnPlane>
      {/* the camera high on the back wall, a cable hanging loose */}
      <Box at={[cx - 4, 0, cz + 6]} size={[8, 14, 4]} color={iso.ink} />
      <Box at={[cx - 12, 8, cz - 6]} size={[24, 16, 12]} color="#e9e1d4" />
      <Face points={[[cx + 4, 12, cz - 6], [cx + 6, 12, cz - 6], [cx + 10, 12, cz - 40], [cx + 8, 12, cz - 40]]} fill={iso.ink} />
      {/* Tài's desk at the back, the scrap of paper under its glass top */}
      <Table at={[nx - 60, ny - 30, 0]} w={110} d={60} h={74} color="#8a6c58" />
      <Box at={[nx - 58, ny - 28, 74]} size={[106, 56, 1]} color="#cfe6f2" opacity={0.6} />
      <Box at={[nx - 10, ny - 10, 75]} size={[24, 18, 0.5]} color="#fffaf0" />
      {/* sacks of lot DD-1103 waiting to go */}
      <Sacks x={kx - 50} y={ky - 70} cols={3} rows={2} layers={3} lot="ĐẤT ĐỎ · LÔ DD-1103" />
      <Box at={[kx - 60, ky + 40, 0]} size={[90, 90, 10]} color={iso.wood} />
      {/* the store-keeper's desk: calculator, teapot, the seal ledger with a coil of seals */}
      <Box at={[Math.min(dx, sx) - 40, Math.min(dy, sy) - 40, 0]} size={[Math.abs(sx - dx) + 90, Math.abs(sy - dy) + 70, 74]} color="#a07c5a" />
      <Box at={[dx - 20, dy - 20, 74]} size={[16, 22, 3]} color={iso.ink} />
      <Cyl at={[dx + 10, dy - 30, 74]} r={9} len={12} axis="z" color="#5d8ea3" cap="#7fa9b6" />
      <Box at={[sx - 22, sy - 16, 74]} size={[44, 30, 3]} color="#5d4a3e" />
      <Box at={[sx - 20, sy - 14, 77]} size={[19, 26, 1.5]} color={iso.cream} />
      <Box at={[sx + 1, sy - 14, 77]} size={[19, 26, 1.5]} color="#fffaf0" />
      <Cyl at={[sx + 34, sy - 4, 74]} r={9} len={3} axis="z" color={iso.gold} cap="#ffe1a0" core="#a07c5a" />
      <Box at={[dx - 60, dy + 50, 0]} size={[36, 36, 40]} color={iso.coral} />
    </Stage>
  )
}

// --- Kho cũ ở Phan Rí ------------------------------------------------------------------

const PR: Cam = { cx: 800, cy: 200, s: 1.6 }

/** The old store at Phan Rí: white sand blown over the floor, pepper grains, a torn sack on a nail, food boxes. */
function KhoPhanRi() {
  const FW = 480, FD = 480
  const [gy, gz] = wallLAt(PR, 14, 42)
  const [hx, hy] = floorAt(PR, 44, 80)
  const [tx, ty] = floorAt(PR, 70, 62, 80)
  const [bx, by] = floorAt(PR, 86, 56, 40)
  return (
    <Stage cam={PR} label="Kho cũ ở Phan Rí, cát trắng phủ nền, nhìn như sa bàn" sky={['#c9cbe8', '#f7d6bf']}>
      <Slab w={FW} d={FD} floor="#efe6d4" side="#e2d3bf" />
      <Smudge points={[[60, 80, 0.3], [400, 60, 0.3], [440, 420, 0.3], [40, 440, 0.3]]} color="#d9cdb5" opacity={0.6} />
      <BackWalls w={FW} d={FD} h={190} left="#d6d0c8" right="#e2dcd2" edge="#9a9a9a" t={8} />
      {/* the wide doorway in the left wall onto the dunes, a camera on the gate post */}
      <Face points={[[0.4, gy - 90, 0], [0.4, gy + 50, 0], [0.4, gy + 50, gz + 40], [0.4, gy - 90, gz + 40]]} fill="#f6e2c4" />
      <Face points={[[0.6, gy - 90, 0], [0.6, gy + 50, 0], [0.6, gy + 50, 40], [0.6, gy - 30, 70], [0.6, gy - 90, 30]]} fill="#efd9b0" />
      <Box at={[0, gy + 50, 0]} size={[16, 14, gz + 50]} color="#b8bccb" />
      <Box at={[0, gy + 44, gz + 14]} size={[22, 12, 10]} color="#e9e1d4" />
      <Cyl at={[22, gy + 50, gz + 19]} r={3} len={2} axis="x" color={iso.ink} cap="#3d3446" />
      {/* the roof post with a torn sack on a nail */}
      <Box at={[tx - 6, ty - 26, 0]} size={[12, 12, 190]} color={iso.wood} />
      <Face points={[[tx - 4, ty - 13.6, 66], [tx + 14, ty - 13.6, 70], [tx + 12, ty - 13.6, 90], [tx - 2, ty - 13.6, 92]]} fill={sackC} />
      <OnPlane at={[tx - 2, ty - 13.4, 86]} plane="R">
        <text x="0" y="4" fontSize="3.4" fontWeight="800" fill="#7a4f32" fontFamily={FONT}>DD-11 02</text>
      </OnPlane>
      {/* pepper spilled on the sand and fresh forklift tracks */}
      {Array.from({ length: 18 }, (_, i) => (
        <Box key={i} at={[hx - 40 + ((i * 37) % 90), hy - 30 + ((i * 53) % 70), 0]} size={[3, 3, 2]} color="#2e2a3a" />
      ))}
      <Face points={[[hx - 120, hy - 6, 0.5], [hx + 80, hy - 6, 0.5], [hx + 80, hy + 4, 0.5], [hx - 120, hy + 4, 0.5]]} fill="#d9cdb5" />
      <Face points={[[hx - 120, hy + 24, 0.5], [hx + 80, hy + 24, 0.5], [hx + 80, hy + 34, 0.5], [hx - 120, hy + 34, 0.5]]} fill="#d9cdb5" />
      {/* the old forklift at the back */}
      <Box at={[150, 30, 0]} size={[70, 50, 50]} color="#f2c46d" />
      <Box at={[160, 34, 50]} size={[40, 42, 40]} color="#e2b33b" />
      <Box at={[220, 40, 0]} size={[6, 30, 110]} color={iso.ink} />
      <Box at={[226, 44, 0]} size={[40, 6, 4]} color={iso.ink} />
      <Box at={[226, 64, 0]} size={[40, 6, 4]} color={iso.ink} />
      {/* food boxes and bottles on an upturned crate */}
      <Box at={[bx - 30, by - 30, 0]} size={[60, 50, 40]} color="#a07c5a" />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[bx - 26 + i * 18, by - 24, 40 + (i === 1 ? 8 : 0)]} size={[16, 12, 8]} color="#fffaf0" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Cyl key={i} at={[bx - 22 + i * 12, by + 6, 40]} r={3.5} len={18} axis="z" color="#a9cdd8" cap="#3f8ab0" />
      ))}
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'bo-xe': BoXe,
  'le-duong': LeDuong,
  'kho-dd': KhoDatDo,
  'kho-pr': KhoPhanRi,
}
