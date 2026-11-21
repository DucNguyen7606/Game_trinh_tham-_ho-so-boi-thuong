import type { ReactNode } from 'react'
import { BackWalls, Box, Cyl, Face, IsoStage, Slab, WallText, floorAt, iso, tone, wallLAt, wallRAt, type V3 } from '@/art/iso/iso'
import { Cup } from '@/art/iso/props'

// Chapter 2 zones as dioramas: the vựa's landing at dawn, its plank office,
// Lực's house in Long Hòa and the creek in the mangroves. Each zone has its own
// camera so the pieces land under the hotspot percentages in case.json.

type Cam = { cx: number; cy: number; s: number }

function Stage({ cam, label, sky, children }: { cam: Cam; label: string; sky?: [string, string]; children: ReactNode }) {
  return (
    <IsoStage label={label} origin={[cam.cx, cam.cy]} scale={cam.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

const mud = '#bdb5ab'
const redMud = '#c98a6c'
const water = '#8fb8c9'
const plank = '#b98f6e'

/** A mangrove: a short trunk on arched stilt roots and a blocky crown. (x, y) is the foot of the trunk. */
function Mangrove({ x, y, h = 120, crown = 60 }: { x: number; y: number; h?: number; crown?: number }) {
  const root = '#7d6250'
  const arch = (dx: number, dy: number) => (
    <Face
      key={`${dx}${dy}`}
      points={[[x + 4, y + 4, 34], [x + 4 + dx * 0.5, y + 4 + dy * 0.5, 26], [x + 4 + dx, y + 4 + dy, 0], [x + 7 + dx, y + 4 + dy, 0], [x + 7 + dx * 0.5, y + 4 + dy * 0.5, 22], [x + 7, y + 4, 30]]}
      fill={root}
    />
  )
  return (
    <g>
      {arch(-26, -10)}
      {arch(-12, -24)}
      <Box at={[x, y, 20]} size={[10, 10, h - 20]} color="#8a6c58" />
      {arch(24, 8)}
      {arch(4, 26)}
      {arch(26, 22)}
      <Box at={[x - crown / 2, y - crown / 2, h - 10]} size={[crown, crown, crown * 0.55]} color="#6f9e78" />
      <Box at={[x - crown / 3, y - crown / 3, h - 10 + crown * 0.55]} size={[crown * 0.7, crown * 0.7, crown * 0.3]} color="#86b48b" />
    </g>
  )
}

/** A bamboo pole stuck in the mud. */
const Pole = ({ x, y, h = 150 }: { x: number; y: number; h?: number }) => <Box at={[x, y, 0]} size={[4, 4, h]} color="#d4bf8a" />

// --- Bến ghe ----------------------------------------------------------------

const BEN: Cam = { cx: 800, cy: 200, s: 1.6 }

/** The vựa's landing at dawn: the boat dragged up on the grey mud, the jetty and shed behind. */
function BenGhe() {
  const FW = 560, FD = 620
  const [nx, ny] = floorAt(BEN, 82, 76)
  const [mx, my] = floorAt(BEN, 14, 86)
  // hull: x 120..300, y 100..440, bottom at 0, gunwale at 40; its +x side faces the camera
  const hx = 300
  const [ly, lz] = wallLAt(BEN, 46, 74, hx)
  const [py, pz] = wallLAt(BEN, 60, 64, hx)
  const hull = '#3f6b6a'
  return (
    <Stage cam={BEN} label="Bến ghe của vựa lúc rạng sáng, nhìn như sa bàn" sky={['#c9c3e6', '#f9cfb3']}>
      <Slab w={FW} d={FD} floor={mud} side="#cbbfb3" />
      {/* the river along the back, and a strip of far bank */}
      <Face points={[[0, 0, 0.2], [FW, 0, 0.2], [FW, 80, 0.2], [0, 80, 0.2]]} fill={water} />
      {[20, 46, 64].map((y) => (
        <Face key={y} points={[[60 + y, y, 0.4], [180 + y, y, 0.4], [180 + y, y + 2, 0.4], [60 + y, y + 2, 0.4]]} fill="#b9d6e2" />
      ))}
      <Box at={[0, -40, 0]} size={[FW, 40, 10]} color="#6f9e78" />
      {/* jetty on stilts along the left, the shed at its far end */}
      {[40, 120, 200, 280].map((y) => (
        <Box key={y} at={[54, y, 0]} size={[5, 5, 30]} color="#7d6250" />
      ))}
      <Box at={[0, 0, 30]} size={[70, 330, 6]} color={plank} />
      <Box at={[0, 10, 36]} size={[70, 120, 90]} color="#c7b39b" />
      <Face points={[[-4, 6, 126], [74, 6, 126], [74, 70, 146], [-4, 70, 146]]} fill="#8f7aa3" />
      <Face points={[[-4, 70, 146], [74, 70, 146], [74, 134, 126], [-4, 134, 126]]} fill="#a893b8" />
      <Face points={[[70.5, 50, 36], [70.5, 90, 36], [70.5, 90, 100], [70.5, 50, 100]]} fill="#5d4a3e" />
      <WallText at={[71, 100, 108]} plane="L" text="VỰA LỰC" size={18} color={iso.cream} />
      {/* bamboo poles stuck in the mud by the water */}
      <Pole x={330} y={70} h={170} />
      <Pole x={360} y={74} h={150} />
      <Pole x={520} y={66} h={160} />
      {/* the coil of dry net */}
      <Cyl at={[nx, ny, 0]} r={34} len={16} axis="z" color="#9aa08a" cap="#b6bba4" />
      <Cyl at={[nx - 2, ny - 2, 16]} r={24} len={10} axis="z" color="#9aa08a" cap="#c3c8b0" core="#7e846f" />
      {/* the boat: hull, deck, engine at the stern, canopy near the bow */}
      <Box at={[120, 100, 0]} size={[180, 340, 40]} color={hull} top="#6f5a48" />
      <Box at={[130, 110, 36]} size={[160, 320, 4]} color="#8a6c58" />
      {/* bow: a wedge closing to a point */}
      <Face points={[[120, 440, 0], [210, 510, 0], [210, 510, 46], [120, 440, 40]]} fill={tone(hull, -0.14)} />
      <Face points={[[300, 440, 0], [210, 510, 0], [210, 510, 46], [300, 440, 40]]} fill={tone(hull, -0.3)} />
      <Face points={[[120, 440, 40], [300, 440, 40], [210, 510, 46]]} fill="#6f5a48" />
      {/* red stripe along the gunwale */}
      <Face points={[[hx + 0.4, 100, 32], [hx + 0.4, 440, 32], [hx + 0.4, 440, 37], [hx + 0.4, 100, 37]]} fill="#c4523c" />
      {/* the scraped blue paint, low on the side */}
      <Face points={[[hx + 0.5, py - 50, pz - 3], [hx + 0.5, py + 50, pz], [hx + 0.5, py + 46, pz + 9], [hx + 0.5, py - 44, pz + 6]]} fill="#4f7fbf" opacity={0.8} />
      {/* the open plug hole, and the wooden plug lying in the mud */}
      <Cyl at={[hx, ly, lz]} r={6} len={1} axis="x" color="#1f2a2a" cap="#1f2a2a" />
      <Cyl at={[hx + 24, ly + 20, 0]} r={5} len={10} axis="x" color="#c9a77a" cap="#e0c49a" />
      {/* the engine at the stern */}
      <Box at={[240, 104, 40]} size={[50, 36, 30]} color="#4b4760" />
      <Box at={[250, 112, 70]} size={[20, 14, 8]} color={iso.metal} />
      <Box at={[288, 120, 54]} size={[24, 4, 4]} color={iso.coral} />
      {/* canopy near the bow: four posts and a roof, two hooks under its front edge */}
      {[[126, 306], [286, 306], [126, 396], [286, 396]].map(([x, y]) => (
        <Box key={`${x}${y}`} at={[x, y, 40]} size={[5, 5, 66]} color="#7d6250" />
      ))}
      <Box at={[116, 300, 106]} size={[190, 104, 8]} color="#5d8ea3" />
      <Box at={[160, 403, 98]} size={[3, 3, 8]} color={iso.metal} />
      <Box at={[185, 403, 98]} size={[3, 3, 8]} color={iso.metal} />
      {/* Tâm's life jacket still on the right hook; the left one is empty */}
      <Box at={[178, 402, 62]} size={[18, 8, 36]} color="#2f8a8a" />
      <Box at={[183, 410.2, 70]} size={[8, 0.5, 20]} color="#f2c46d" />
      {/* the grey mud with a puddle and footprints */}
      <Face points={[[mx - 50, my - 40, 0.3], [mx + 40, my - 46, 0.3], [mx + 60, my + 30, 0.3], [mx - 30, my + 40, 0.3]]} fill="#a9c3cc" />
      {[[-60, 20], [-40, 50], [-10, 70], [70, 10], [90, -20]].map(([dx, dy], i) => (
        <Face key={i} points={[[mx + dx, my + dy, 0.4], [mx + dx + 14, my + dy, 0.4], [mx + dx + 14, my + dy + 7, 0.4], [mx + dx, my + dy + 7, 0.4]]} fill="#9a9288" />
      ))}
    </Stage>
  )
}

// --- Văn phòng vựa -----------------------------------------------------------

const VP: Cam = { cx: 1100, cy: 330, s: 1.6 }

/** The vựa's plank office: tide calendar, the open safe, the ledger on the desk, the scale. */
function VanPhong() {
  const FW = 330, FD = 620
  const [cy, cz] = wallLAt(VP, 56, 30)
  const [ky, kz] = wallLAt(VP, 24, 62)
  const [sx, sy] = floorAt(VP, 42, 66, 74)
  const [gx, gy] = floorAt(VP, 80, 66, 30)
  const [ax, az] = wallRAt(VP, 88, 34)
  const wall = '#d9c2a4'
  return (
    <Stage cam={VP} label="Văn phòng vựa hải sản, nhìn như sa bàn" sky={['#cdc6e8', '#f7d6c2']}>
      <Slab w={FW} d={FD} floor="#cdb59a" />
      {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((y) => (
        <Face key={y} points={[[0, y, 0.2], [FW, y, 0.2], [FW, y + 2, 0.2], [0, y + 2, 0.2]]} fill="#bfa58a" />
      ))}
      <BackWalls w={FW} d={FD} h={190} left={wall} right="#e4cfb3" edge="#a07c5a" t={8} />
      {Array.from({ length: 14 }, (_, i) => (
        <Face key={i} points={[[0.4, 20 + i * 44, 0], [0.4, 22 + i * 44, 0], [0.4, 22 + i * 44, 190], [0.4, 20 + i * 44, 190]]} fill="#c7ad8e" />
      ))}
      {/* window to the river on the left wall */}
      <Face points={[[0.6, 250, 90], [0.6, 370, 90], [0.6, 370, 160], [0.6, 250, 160]]} fill="#bfdbe6" />
      <Face points={[[0.8, 308, 90], [0.8, 312, 90], [0.8, 312, 160], [0.8, 308, 160]]} fill="#a07c5a" />
      {/* the tide calendar, day 9 circled */}
      <Face points={[[0.6, cy - 26, cz - 34], [0.6, cy + 26, cz - 34], [0.6, cy + 26, cz + 30], [0.6, cy - 26, cz + 30]]} fill="#fffaf0" />
      <Face points={[[0.8, cy - 26, cz + 18], [0.8, cy + 26, cz + 18], [0.8, cy + 26, cz + 30], [0.8, cy - 26, cz + 30]]} fill={iso.blue} />
      {[0, 1, 2, 3].map((r) => (
        <Face key={r} points={[[0.8, cy - 20, cz + 8 - r * 10], [0.8, cy + 20, cz + 8 - r * 10], [0.8, cy + 20, cz + 10 - r * 10], [0.8, cy - 20, cz + 10 - r * 10]]} fill="#cdbb9c" />
      ))}
      <Cyl at={[1, cy - 6, cz + 2]} r={5} len={0.5} axis="x" color={iso.coral} cap="#fffaf0" />
      {/* the raincoat on a peg on the back wall */}
      <Box at={[ax - 2, 0, az + 14]} size={[4, 6, 4]} color={iso.woodDark} />
      <Face points={[[ax - 12, 1, az + 14], [ax + 12, 1, az + 14], [ax + 18, 1, az - 40], [ax - 18, 1, az - 40]]} fill="#f2c94c" />
      <Face points={[[ax - 18, 1.2, az - 40], [ax - 10, 1.2, az - 40], [ax - 12, 1.2, az + 4], [ax - 16, 1.2, az + 4]]} fill="#e2b33b" />
      {/* styrofoam boxes stacked against the back wall */}
      <Box at={[30, 10, 0]} size={[60, 44, 36]} color="#f3eee6" />
      <Box at={[34, 12, 36]} size={[56, 40, 34]} color="#f7f3ec" />
      <Box at={[100, 10, 0]} size={[56, 44, 36]} color="#f3eee6" />
      {/* the scale */}
      <Box at={[gx - 34, gy - 30, 0]} size={[68, 60, 10]} color="#7e9cb5" />
      <Box at={[gx - 30, gy - 34, 10]} size={[8, 8, 70]} color={iso.metal} />
      <Cyl at={[gx - 26, gy - 26, 84]} r={16} len={4} axis="y" color="#e9eef2" cap="#fffaf0" core={iso.coral} />
      {/* the desk with the open ledger */}
      <Box at={[20, sy - 60, 0]} size={[120, 110, 70]} color={iso.wood} />
      <Box at={[sx - 24, sy - 18, 70]} size={[48, 34, 3]} color="#6b5040" />
      <Box at={[sx - 22, sy - 16, 73]} size={[21, 30, 2]} color={iso.cream} />
      <Box at={[sx + 1, sy - 16, 73]} size={[21, 30, 2]} color="#fffaf0" />
      {[0, 1, 2, 3].map((r) => (
        <Face key={r} points={[[sx + 4, sy - 12 + r * 6, 75.2], [sx + 18, sy - 12 + r * 6, 75.2], [sx + 18, sy - 11 + r * 6, 75.2], [sx + 4, sy - 11 + r * 6, 75.2]]} fill={iso.inkSoft} />
      ))}
      <Cup at={[sx + 50, sy + 10, 70]} fill="#7b5236" />
      {/* the open safe against the wall, its door swung out, the empty gold box inside */}
      <Box at={[0, ky - 40, 0]} size={[70, 80, kz - 6]} color="#5f6878" />
      <Face points={[[70.4, ky - 30, 12], [70.4, ky + 30, 12], [70.4, ky + 30, kz - 18], [70.4, ky - 30, kz - 18]]} fill="#2f2a3f" />
      <Box at={[40, ky - 22, 14]} size={[30, 44, 12]} color="#b8372c" />
      <Box at={[70, ky + 40, 0]} size={[54, 6, kz - 6]} color="#6f7889" />
      <Cyl at={[100, ky + 46, 50]} r={7} len={2} axis="y" color={iso.metal} cap="#c9d0dc" />
    </Stage>
  )
}

// --- Nhà ông Lực ---------------------------------------------------------------

const NHA: Cam = { cx: 800, cy: 340, s: 1.6 }

/** Lực's house: the altar with his portrait, the wardrobe, the bed with his phone, medicine, the savings book. */
function Nha() {
  const FW = 620, FD = 560
  const [ty, tz] = wallLAt(NHA, 16, 46)
  const [px, py] = floorAt(NHA, 36, 64, 40)
  const [mx, my] = floorAt(NHA, 70, 52, 62)
  const [bx, by] = floorAt(NHA, 84, 76, 70)
  return (
    <Stage cam={NHA} label="Nhà ông Lực ở Long Hòa, nhìn như sa bàn" sky={['#cbc5e8', '#f6d7c6']}>
      <Slab w={FW} d={FD} floor="#e6d6c6" />
      {[80, 160, 240, 320, 400, 480, 560].map((v) => (
        <g key={v}>
          <Face points={[[v, 0, 0.2], [v + 1.5, 0, 0.2], [v + 1.5, FD, 0.2], [v, FD, 0.2]]} fill="#d6c3b2" />
          <Face points={[[0, v, 0.2], [FW, v, 0.2], [FW, v + 1.5, 0.2], [0, v + 1.5, 0.2]]} fill="#d6c3b2" />
        </g>
      ))}
      <BackWalls w={FW} d={FD} h={190} left="#bcd3c4" right="#cfe0d2" edge="#8fae9c" t={8} />
      {/* the altar on a high shelf in the corner: portrait, incense, fruit */}
      <Box at={[0, 0, 56]} size={[96, 40, 8]} color="#a3432f" />
      <Box at={[0, 0, 0]} size={[96, 40, 56]} color="#8a3a2a" />
      <Box at={[20, 4, 64]} size={[30, 4, 38]} color={iso.gold} />
      <Box at={[23, 8.2, 67]} size={[24, 0.4, 32]} color="#e9dccb" />
      <Cyl at={[66, 20, 64]} r={6} len={8} axis="z" color={iso.gold} />
      {[62, 66, 70].map((x) => (
        <Box key={x} at={[x, 20, 72]} size={[1, 1, 20]} color="#b8372c" />
      ))}
      <Cyl at={[84, 24, 64]} r={9} len={3} axis="z" color="#f6efe3" />
      <Box at={[78, 20, 67]} size={[8, 8, 7]} color="#f2c46d" />
      <Box at={[86, 26, 67]} size={[7, 7, 6]} color="#e46b4f" />
      {/* wall clock and calendar on the back wall */}
      <Cyl at={[180, 0, 140]} r={14} len={2} axis="y" color="#e9e1d4" cap="#fffaf0" />
      <Face points={[[240, 1, 90], [290, 1, 90], [290, 1, 150], [240, 1, 150]]} fill="#fffaf0" />
      <Face points={[[240, 1.3, 136], [290, 1.3, 136], [290, 1.3, 150], [240, 1.3, 150]]} fill={iso.coral} />
      {/* cabinet with the medicine box against the back wall */}
      <Box at={[mx - 50, 0, 0]} size={[100, 46, 60]} color="#c9a274" />
      <Face points={[[mx - 44, 46.4, 10], [mx + 44, 46.4, 10], [mx + 44, 46.4, 50], [mx - 44, 46.4, 50]]} fill="#b48d63" />
      <Box at={[mx - 12, my - 9, 60]} size={[24, 16, 12]} color="#fffaf0" />
      <Face points={[[mx - 12, my + 7.2, 64], [mx + 12, my + 7.2, 64], [mx + 12, my + 7.2, 68], [mx - 12, my + 7.2, 68]]} fill={iso.blue} />
      {/* the wardrobe against the left wall */}
      <Box at={[0, ty - 70, 0]} size={[64, 140, tz + 10]} color="#a07c5a" />
      <Face points={[[64.4, ty - 64, 10], [64.4, ty - 2, 10], [64.4, ty - 2, tz], [64.4, ty - 64, tz]]} fill="#b48d6a" />
      <Face points={[[64.4, ty + 2, 10], [64.4, ty + 64, 10], [64.4, ty + 64, tz], [64.4, ty + 2, tz]]} fill="#b48d6a" />
      {/* the bed with a mosquito net folded up, the phone charging on the headboard side */}
      <Box at={[px - 70, py - 110, 0]} size={[170, 200, 34]} color="#8f7aa3" top="#f1e7f4" />
      <Box at={[px - 66, py - 104, 34]} size={[50, 70, 10]} color="#fffaf0" />
      <Box at={[px - 60, py + 10, 34]} size={[150, 76, 6]} color="#d4c2e2" />
      <Box at={[px - 4, py - 8, 40]} size={[10, 18, 2]} color={iso.ink} />
      <Face points={[[px + 1, py - 8, 42.2], [px + 1, py - 30, 42.2], [px + 1.5, py - 30, 42.2], [px + 1.5, py - 8, 42.2]]} fill="#fffaf0" />
      {/* dresser with the drawer half open and the savings book on top */}
      <Box at={[bx - 46, by - 40, 0]} size={[92, 64, 70]} color="#c9a274" />
      <Box at={[bx - 40, by + 24, 36]} size={[80, 20, 14]} color="#b48d63" />
      <Box at={[bx - 14, by - 10, 70]} size={[28, 20, 3]} color="#7a2f35" />
      <Box at={[bx - 40, by - 40, 70]} size={[70, 4, 56]} color="#b48d63" />
      <Face points={[[bx - 34, by - 35.6, 76], [bx + 24, by - 35.6, 76], [bx + 24, by - 35.6, 120], [bx - 34, by - 35.6, 120]]} fill="#dfeef3" />
    </Stage>
  )
}

// --- Rạch Đước -------------------------------------------------------------------

const RACH: Cam = { cx: 800, cy: 200, s: 1.6 }

/** The creek in the mangroves: red mud, the orange strip on a root, the stump, the drag mark, the broken pole. */
function Rach() {
  const FW = 620, FD = 580
  const [ox, oy] = floorAt(RACH, 28, 52, 30)
  const [tx, ty] = floorAt(RACH, 62, 70, 24)
  const [dx, dy] = floorAt(RACH, 46, 82)
  const [sx, sy] = floorAt(RACH, 80, 58, 8)
  const [cx, cy] = floorAt(RACH, 12, 76)
  const [lx, ly] = floorAt(RACH, 90, 84)
  // the creek runs along y ≈ 400..470 into the front-right corner
  const creek: V3[] = [[120, 410, 0.3], [300, 400, 0.3], [460, 420, 0.3], [FW, 400, 0.3], [FW, 480, 0.3], [460, 500, 0.3], [300, 480, 0.3], [120, 500, 0.3], [0, 520, 0.3], [0, 440, 0.3]]
  return (
    <Stage cam={RACH} label="Rạch Đước giữa rừng đước, nhìn như sa bàn" sky={['#bfc8e2', '#f4d2bd']}>
      <Slab w={FW} d={FD} floor={redMud} side="#d8b9a6" />
      <Face points={creek} fill="#7fa9b6" />
      <Face points={[[140, 418, 0.4], [300, 410, 0.4], [300, 414, 0.4], [140, 422, 0.4]]} fill="#a9cdd8" />
      {/* the far trees */}
      <Mangrove x={60} y={60} h={140} crown={80} />
      <Mangrove x={200} y={30} h={160} crown={90} />
      <Mangrove x={330} y={70} h={130} crown={70} />
      {/* the tree with the broken pole in its roots */}
      <Mangrove x={sx + 30} y={sy - 30} h={150} crown={80} />
      <Box at={[sx - 50, sy - 3, 6]} size={[110, 5, 5]} color="#d4bf8a" />
      <Box at={[sx + 60, sy - 3, 6]} size={[4, 5, 5]} color="#fffaf0" />
      {/* the tree by the left edge with the orange strip snagged on a root */}
      <Mangrove x={ox - 26} y={oy - 30} h={130} crown={70} />
      <Face points={[[ox - 6, oy, 26], [ox + 10, oy + 2, 30], [ox + 12, oy + 2, 18], [ox - 2, oy, 12]]} fill="#f08a3c" />
      {/* the stump with five cigarette ends in a row */}
      <Cyl at={[tx, ty, 0]} r={20} len={24} axis="z" color="#8a6c58" cap="#c9a77a" />
      {[-10, -5, 0, 5, 10].map((o) => (
        <Box key={o} at={[tx + o - 1, ty - 6, 24]} size={[2.4, 7, 2.4]} color="#f6efe3" />
      ))}
      {/* the boat-nose dent and the drag mark down into the water */}
      <Face points={[[dx - 30, dy - 70, 0.4], [dx + 20, dy - 66, 0.4], [dx, dy - 40, 0.4]]} fill="#a86b52" />
      <Face points={[[dx - 6, dy - 40, 0.4], [dx + 12, dy - 40, 0.4], [dx + 18, dy + 30, 0.4], [dx - 2, dy + 30, 0.4]]} fill="#a86b52" />
      {/* crab holes */}
      {[[0, 0], [24, 10], [10, 30], [-20, 20]].map(([a, b], i) => (
        <Cyl key={i} at={[cx + a, cy + b, 0]} r={4} len={0.6} axis="z" color="#5a3a2e" cap="#5a3a2e" />
      ))}
      {/* two old beer cans half in the mud */}
      <Cyl at={[lx - 12, ly, 4]} r={4} len={14} axis="x" color="#b6a77e" cap="#9a8e6f" />
      <Cyl at={[lx + 6, ly + 14, 4]} r={4} len={14} axis="y" color="#9fb0a0" cap="#8a9a8a" />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'ben-ghe': BenGhe,
  'van-phong': VanPhong,
  nha: Nha,
  rach: Rach,
}

