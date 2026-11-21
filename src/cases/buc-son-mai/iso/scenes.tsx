import type { ReactNode } from 'react'
import { BackWalls, Box, Cyl, Face, IsoStage, OnPlane, Slab, Smudge, WallText, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Cup } from '@/art/iso/props'
import { LotusPainting } from '../scenes'

// Chapter 3 zones as dioramas: the gallery hall with the empty frame, the alley
// behind it, Diệp's office and Quân's lacquer workshop. Each zone has its own
// camera so the pieces land under the hotspot percentages in case.json.

type Cam = { cx: number; cy: number; s: number }

function Stage({ cam, label, sky, children }: { cam: Cam; label: string; sky?: [string, string]; children: ReactNode }) {
  return (
    <IsoStage label={label} origin={[cam.cx, cam.cy]} scale={cam.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

const FONT = "'Be Vietnam Pro', sans-serif"

/** A framed picture hanging on the left wall (plane x = 0): y is its left edge seen from the room, z its bottom. */
function PictureL({ y, z, w, h, frame, children }: { y: number; z: number; w: number; h: number; frame: string; children?: ReactNode }) {
  return (
    <g>
      <Box at={[0, y - w, z]} size={[3, w, h]} color={frame} />
      <Face points={[[3.4, y - w + 4, z + 4], [3.4, y - 4, z + 4], [3.4, y - 4, z + h - 4], [3.4, y - w + 4, z + h - 4]]} fill="#f6efe3" />
      {children}
    </g>
  )
}

// --- Phòng trưng bày ---------------------------------------------------------

const HALL: Cam = { cx: 1000, cy: 200, s: 1.6 }

/** The gallery: white walls, the partition with the empty carved frame, the auction poster, two wine glasses. */
function TrungBay() {
  const FW = 440, FD = 600
  const [kx, kz] = wallRAt(HALL, 50, 44, 276)
  const [cx, cz] = wallRAt(HALL, 84, 16)
  const [ty, tz] = wallLAt(HALL, 18, 42)
  const [ex, ey] = floorAt(HALL, 74, 70, 60)
  const [gx, gy] = floorAt(HALL, 32, 76, 50)
  return (
    <Stage cam={HALL} label="Phòng trưng bày Diệp Gallery, nhìn như sa bàn" sky={['#d2cbec', '#f7dccb']}>
      <Slab w={FW} d={FD} floor="#d9c3a8" />
      {[60, 120, 180, 240, 300, 360].map((x) => (
        <Face key={x} points={[[x, 0, 0.2], [x + 1.5, 0, 0.2], [x + 1.5, FD, 0.2], [x, FD, 0.2]]} fill="#ccb497" />
      ))}
      <BackWalls w={FW} d={FD} h={190} left="#f3eee6" right="#f8f3eb" edge="#c8bcd8" t={8} />
      {/* track lights along the top of both walls */}
      <Box at={[4, 40, 176]} size={[4, 520, 4]} color={iso.ink} />
      {[110, 250, 400, 530].map((y) => (
        <Box key={y} at={[6, y, 164]} size={[10, 10, 12]} color={iso.ink} />
      ))}
      <Box at={[30, 4, 176]} size={[400, 4, 4]} color={iso.ink} />
      {/* other works on the left wall, all still there */}
      <PictureL y={ty + 70} z={tz - 40} w={70} h={56} frame="#a3714b">
        <Face points={[[3.6, ty + 4, tz - 32], [3.6, ty + 62, tz - 32], [3.6, ty + 62, tz + 8], [3.6, ty + 4, tz + 8]]} fill="#7fae8a" />
      </PictureL>
      <PictureL y={ty - 20} z={tz - 30} w={60} h={70} frame={iso.gold}>
        <Face points={[[3.6, ty - 76, tz - 22], [3.6, ty - 24, tz - 22], [3.6, ty - 24, tz + 32], [3.6, ty - 76, tz + 32]]} fill="#d6453a" opacity={0.8} />
      </PictureL>
      <PictureL y={ty - 110} z={tz - 46} w={90} h={60} frame="#2e2a4a">
        <Face points={[[3.6, ty - 196, tz - 38], [3.6, ty - 124, tz - 38], [3.6, ty - 124, tz + 6], [3.6, ty - 196, tz + 6]]} fill="#8fb8c9" />
      </PictureL>
      <PictureL y={ty + 190} z={tz - 36} w={70} h={64} frame="#a3714b">
        <Face points={[[3.6, ty + 124, tz - 28], [3.6, ty + 186, tz - 28], [3.6, ty + 186, tz + 20], [3.6, ty + 124, tz + 20]]} fill="#f2c46d" />
      </PictureL>
      {/* ceiling camera on a bracket high on the back wall */}
      <Box at={[cx - 4, 0, cz + 6]} size={[8, 14, 4]} color={iso.ink} />
      <Box at={[cx - 12, 8, cz - 6]} size={[24, 16, 12]} color="#e9e1d4" />
      <Cyl at={[cx, 24, cz]} r={4} len={2} axis="y" color={iso.ink} cap="#3d3446" />
      {/* a sign on the back wall */}
      <WallText at={[120, 1, 132]} plane="R" text="DIỆP GALLERY" size={26} color={iso.ink} />
      {/* the partition with the empty carved frame: a chip of black MDF caught in its corner */}
      <Box at={[kx - 110, 260, 0]} size={[220, 16, 170]} color="#f6efe3" />
      <Box at={[kx - 60, 276, kz - 44]} size={[120, 4, 8]} color="#a3714b" />
      <Box at={[kx - 60, 276, kz + 44]} size={[120, 4, 8]} color="#a3714b" />
      <Box at={[kx - 60, 276, kz - 44]} size={[8, 4, 96]} color="#a3714b" />
      <Box at={[kx + 52, 276, kz - 44]} size={[8, 4, 96]} color="#a3714b" />
      <Face points={[[kx - 52, 276.3, kz - 36], [kx + 52, 276.3, kz - 36], [kx + 52, 276.3, kz + 44], [kx - 52, 276.3, kz + 44]]} fill="#e9e1d4" />
      <Box at={[kx + 44, 278, kz - 36]} size={[6, 3, 5]} color="#1d1513" />
      {/* the spotlight still points at nothing */}
      <Smudge points={[[kx - 50, 276.4, kz - 30], [kx + 50, 276.4, kz - 30], [kx + 40, 276.4, kz + 40], [kx - 40, 276.4, kz + 40]]} color="#fff6d6" opacity={0.6} />
      {/* bench */}
      <Box at={[60, 340, 0]} size={[150, 44, 30]} color="#a3714b" />
      {/* the auction poster on an easel */}
      <Box at={[ex - 20, ey - 6, 0]} size={[4, 4, 100]} color={iso.woodDark} />
      <Box at={[ex + 20, ey - 6, 0]} size={[4, 4, 100]} color={iso.woodDark} />
      <Box at={[ex - 30, ey, 20]} size={[64, 4, 84]} color="#2e2a4a" />
      <OnPlane at={[ex - 26, ey + 4.2, 100]} plane="R">
        <rect x="0" y="0" width="56" height="76" fill="#1d1513" />
        <g transform="translate(6 10)">
          <LotusPainting w={44} />
        </g>
        <text x="28" y="56" textAnchor="middle" fontSize="5.4" fontWeight="800" fill={iso.gold} fontFamily={FONT}>HẢI ĐĂNG · 22/11</text>
        <text x="28" y="66" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fffaf0" fontFamily={FONT}>9 TỶ ĐỒNG</text>
      </OnPlane>
      {/* reception table with two wine glasses, one with lipstick */}
      <Cyl at={[gx, gy, 0]} r={6} len={46} axis="z" color={iso.woodDark} />
      <Cyl at={[gx, gy, 46]} r={34} len={4} axis="z" color="#fffaf0" />
      <Cyl at={[gx - 10, gy - 4, 50]} r={4} len={14} axis="z" color="#e9e1e9" cap="#7a1f2a" />
      <Cyl at={[gx + 10, gy + 6, 50]} r={4} len={14} axis="z" color="#e9e1e9" cap="#7a1f2a" />
      <Box at={[gx + 12, gy + 10, 60]} size={[2, 0.5, 3]} color="#d6453a" />
      <Box at={[300, 470, 0]} size={[50, 50, 6]} color="#c9a274" />
      <Cyl at={[325, 495, 6]} r={14} len={20} axis="z" color="#c98a5c" />
      <Box at={[316, 486, 26]} size={[18, 18, 26]} color={iso.leaf} />
    </Stage>
  )
}

// --- Cửa sau và hẻm -------------------------------------------------------------

const HEM: Cam = { cx: 800, cy: 282, s: 1.6 }

/** The alley behind the gallery at night: the forced back door, the keypad, the shoe print, the bins. */
function CuaSau() {
  const FW = 480, FD = 480
  const dx0 = 111
  const [dy, dz] = wallLAt(HEM, 42, 50, dx0)
  const [ky, kz] = wallLAt(HEM, 22, 44)
  const [px, py] = floorAt(HEM, 60, 84)
  const [bx, by] = floorAt(HEM, 84, 66, 40)
  const [lx, ly] = floorAt(HEM, 30, 80)
  return (
    <Stage cam={HEM} label="Cửa sau phòng tranh và con hẻm, nhìn như sa bàn" sky={['#aeb0d8', '#eec6bf']}>
      <Slab w={FW} d={FD} floor="#a9a3b4" side="#c2bccb" />
      <Face points={[[140, 0, 0.2], [180, 0, 0.2], [180, FD, 0.2], [140, FD, 0.2]]} fill="#9b95a8" />
      <BackWalls w={FW} d={FD} h={210} left="#c9b9a6" right="#b9b0c9" edge="#8f7aa3" t={8} />
      {/* the neighbour's wall: a lamp and a tangle of wires */}
      <Box at={[300, 0, 150]} size={[6, 20, 4]} color={iso.ink} />
      <Box at={[296, 16, 140]} size={[14, 10, 10]} color="#ffe1a0" />
      {[0, 1, 2].map((i) => (
        <Face key={i} points={[[0, 40 + i * 30, 196 - i * 6], [FW, 10 + i * 4, 186 - i * 8], [FW, 10 + i * 4, 188 - i * 8], [0, 40 + i * 30, 198 - i * 6]]} fill={iso.ink} />
      ))}
      {/* the alarm keypad by the wall */}
      <Box at={[0, ky - 14, kz - 12]} size={[5, 28, 24]} color="#e9e1d4" />
      <Face points={[[5.4, ky - 10, kz - 6], [5.4, ky + 10, kz - 6], [5.4, ky + 10, kz + 6], [5.4, ky - 10, kz + 6]]} fill="#3f8a7e" />
      {/* the back entrance juts out from the wall; its wooden door, forced at the latch */}
      <Box at={[0, dy - 60, 0]} size={[dx0, 120, 150]} color="#d6c4ae" />
      <Face points={[[dx0 + 0.4, dy - 36, 0], [dx0 + 0.4, dy + 36, 0], [dx0 + 0.4, dy + 36, 120], [dx0 + 0.4, dy - 36, 120]]} fill="#8a5c38" />
      <Face points={[[dx0 + 0.8, dy - 30, 6], [dx0 + 0.8, dy + 30, 6], [dx0 + 0.8, dy + 30, 114], [dx0 + 0.8, dy - 30, 114]]} fill="#9b6b44" />
      <Face points={[[dx0 + 1, dy - 34, dz - 8], [dx0 + 1, dy - 22, dz - 6], [dx0 + 1, dy - 24, dz + 10], [dx0 + 1, dy - 34, dz + 8]]} fill="#e8cf98" />
      <Box at={[dx0, dy - 30, dz - 2]} size={[3, 6, 6]} color={iso.metal} />
      {/* splinters and paint flakes fell outside, into the alley */}
      {[[10, -10], [18, 4], [26, -4], [14, 14]].map(([a, b], i) => (
        <Box key={i} at={[dx0 + a, dy - 30 + b, 0]} size={[6, 2, 1.5]} color="#e8cf98" />
      ))}
      <Box at={[dx0, dy - 72, 150]} size={[30, 144, 6]} color="#8f7aa3" />
      {/* the puddle with a single line of small flat shoe prints */}
      <Face points={[[px - 60, py - 30, 0.4], [px + 50, py - 40, 0.4], [px + 70, py + 30, 0.4], [px - 40, py + 40, 0.4]]} fill="#8fb8c9" />
      {[[-30, -10], [0, 4], [30, -6]].map(([a, b], i) => (
        <Face key={i} points={[[px + a, py + b, 0.6], [px + a + 14, py + b, 0.6], [px + a + 14, py + b + 6, 0.6], [px + a, py + b + 6, 0.6]]} fill="#6f6a7e" />
      ))}
      {/* the bins */}
      <Box at={[bx - 40, by - 30, 0]} size={[40, 40, 52]} color="#3f8a7e" />
      <Box at={[bx + 4, by - 30, 0]} size={[40, 40, 52]} color="#5d8ea3" />
      <Box at={[bx - 42, by - 32, 52]} size={[44, 44, 4]} color={tone('#3f8a7e', -0.1)} />
      {/* cigarette ends where the noodle cart parks */}
      {[[0, 0], [10, 6], [-8, 12], [16, -6], [4, 16]].map(([a, b], i) => (
        <Box key={i} at={[lx + a, ly + b, 0]} size={[5, 2, 2]} color="#f6efe3" />
      ))}
      <Box at={[lx + 50, ly - 20, 0]} size={[60, 34, 46]} color="#e46b4f" />
      <Box at={[lx + 50, ly - 20, 46]} size={[60, 34, 30]} color="#fffaf0" opacity={0.85} />
      <Cyl at={[lx + 60, ly + 14, 8]} r={8} len={3} axis="y" color={iso.ink} />
      <Cyl at={[lx + 100, ly + 14, 8]} r={8} len={3} axis="y" color={iso.ink} />
    </Stage>
  )
}

// --- Phòng làm việc bà Diệp ---------------------------------------------------------

const VP: Cam = { cx: 800, cy: 200, s: 1.6 }

/** Diệp's office: bookshelves, the desk and computer, the scarf on the chair, the shredder, the desk calendar. */
function VanPhong() {
  const FW = 440, FD = 520
  const [mx, my] = floorAt(VP, 46, 50, 80)
  const [sx, sy] = floorAt(VP, 66, 48, 82)
  const [hx, hy] = floorAt(VP, 28, 72, 40)
  const [cx, cz] = wallRAt(VP, 82, 30)
  return (
    <Stage cam={VP} label="Phòng làm việc của bà Diệp, nhìn như sa bàn" sky={['#cfc8ea', '#f6dccb']}>
      <Slab w={FW} d={FD} floor="#c9a98a" />
      <Face points={[[90, 150, 0.3], [380, 150, 0.3], [380, 420, 0.3], [90, 420, 0.3]]} fill="#b86a5a" />
      <Face points={[[100, 160, 0.4], [370, 160, 0.4], [370, 410, 0.4], [100, 410, 0.4]]} fill="#c9806e" />
      <BackWalls w={FW} d={FD} h={190} left="#e2d3c0" right="#ece0cf" edge="#a07c5a" t={8} />
      {/* window on the back wall */}
      <Face points={[[60, 0.5, 80], [180, 0.5, 80], [180, 0.5, 160], [60, 0.5, 160]]} fill="#e7f0f5" />
      <Face points={[[118, 0.8, 80], [122, 0.8, 80], [122, 0.8, 160], [118, 0.8, 160]]} fill="#b3a5c4" />
      {/* bookshelves along the left wall */}
      {[40, 160].map((y0) => (
        <g key={y0}>
          <Box at={[0, y0, 0]} size={[40, 110, 170]} color="#7a4f32" />
          {[30, 70, 110, 150].map((z) => (
            <g key={z}>
              {Array.from({ length: 7 }, (_, i) => (
                <Box key={i} at={[30, y0 + 6 + i * 14, z - 26]} size={[10, 11, 24 - (i % 3) * 3]} color={['#d6453a', '#5d8ea3', '#f2c46d', '#7fae8a', '#8f7aa3', '#fffaf0', '#c98a5c'][(i + z) % 7]} />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* tall cabinet on the back wall with the desk calendar standing on top */}
      <Box at={[cx - 40, 0, 0]} size={[80, 46, cz - 10]} color="#a07c5a" />
      <Face points={[[cx - 34, 46.4, 10], [cx + 34, 46.4, 10], [cx + 34, 46.4, cz - 20], [cx - 34, 46.4, cz - 20]]} fill="#b48d6a" />
      <Face points={[[cx - 14, 14, cz - 10], [cx + 14, 14, cz - 10], [cx + 14, 22, cz + 14], [cx - 14, 22, cz + 14]]} fill="#fffaf0" />
      <Face points={[[cx - 14, 30, cz - 10], [cx + 14, 30, cz - 10], [cx + 14, 22, cz + 14], [cx - 14, 22, cz + 14]]} fill="#f6efe3" />
      <Face points={[[cx - 2, 26, cz - 2], [cx + 8, 26, cz - 2], [cx + 8, 24, cz + 4], [cx - 2, 24, cz + 4]]} fill="#d6453a" />
      {/* desk with the locked computer */}
      <Box at={[mx - 90, my - 50, 0]} size={[160, 90, 72]} color="#7a4f32" />
      <Box at={[mx - 40, my - 34, 72]} size={[60, 8, 40]} color={iso.ink} />
      <Face points={[[mx - 36, my - 25.6, 76], [mx + 16, my - 25.6, 76], [mx + 16, my - 25.6, 108], [mx - 36, my - 25.6, 108]]} fill="#8fb8c9" />
      <Box at={[mx - 14, my - 26, 72]} size={[8, 8, 4]} color={iso.ink} />
      <Box at={[mx - 34, my, 72]} size={[44, 14, 2]} color="#e9e1d4" />
      <Cup at={[mx + 40, my + 10, 72]} fill="#7b5236" />
      {/* the chair with Diệp's cream silk scarf, red edge, over its back */}
      <Box at={[sx - 30, sy - 4, 40]} size={[48, 50, 8]} color="#5d4a7a" />
      <Box at={[sx - 30, sy - 12, 40]} size={[48, 8, 46]} color="#5d4a7a" />
      <Box at={[sx - 8, sy + 16, 0]} size={[6, 6, 40]} color={iso.ink} />
      <Box at={[sx - 20, sy - 14, 80]} size={[30, 12, 4]} color="#f6efe3" />
      <Box at={[sx - 20, sy - 2, 56]} size={[30, 2, 26]} color="#f6efe3" />
      <Box at={[sx - 20, sy - 1.6, 56]} size={[30, 1, 3]} color="#c4342a" />
      {/* the shredder, its bin full of strips */}
      <Box at={[hx - 22, hy - 18, 0]} size={[44, 36, 40]} color="#4b4760" />
      <Box at={[hx - 20, hy - 16, 40]} size={[40, 32, 4]} color="#e9e1d4" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} at={[hx - 16 + i * 7, hy - 10 + (i % 2) * 6, 44]} size={[3, 14, 3]} color="#fffaf0" />
      ))}
      <Box at={[60, 450, 0]} size={[40, 40, 6]} color="#c9a274" />
      <Cyl at={[80, 470, 6]} r={14} len={20} axis="z" color="#c98a5c" />
      <Box at={[71, 461, 26]} size={[18, 18, 26]} color={iso.leaf} />
    </Stage>
  )
}

// --- Xưởng phục chế -----------------------------------------------------------------

const XU: Cam = { cx: 800, cy: 340, s: 1.6 }

/** Quân's lacquer workshop: the black MDF board, the tracing paper pinned up, eggshell jar, client book, a dropped loupe. */
function Xuong() {
  const FW = 500, FD = 480
  const bx0 = 40
  const [my, mz] = wallLAt(XU, 32, 56, bx0)
  const [gx, gz] = wallRAt(XU, 62, 34)
  const [jx, jy] = floorAt(XU, 82, 70, 60)
  const [sy, sz] = wallLAt(XU, 14, 66, 20)
  const [lx, ly] = floorAt(XU, 48, 80)
  return (
    <Stage cam={XU} label="Xưởng sơn mài của Quân ở Bình Thạnh, nhìn như sa bàn" sky={['#cdc6e8', '#f6d3c0']}>
      <Slab w={FW} d={FD} floor="#bfa58a" />
      <Smudge points={[[200, 260, 0.3], [400, 250, 0.3], [420, 400, 0.3], [180, 420, 0.3]]} color="#6b5a4a" opacity={0.25} />
      <BackWalls w={FW} d={FD} h={180} left="#d7c9b4" right="#e3d6c2" edge="#8a6c58" t={8} />
      {/* window with Bình Thạnh rooftops on the left wall */}
      <Face points={[[0.5, 60, 80], [0.5, 170, 80], [0.5, 170, 150], [0.5, 60, 150]]} fill="#f3d9c6" />
      {[[70, 30], [100, 46], [130, 24], [150, 40]].map(([y, h], i) => (
        <Face key={i} points={[[0.7, y, 80], [0.7, y + 26, 80], [0.7, y + 26, 80 + h], [0.7, y, 80 + h]]} fill={['#c98a6c', '#b9a3c4', '#d8a27a', '#a893b8'][i]} />
      ))}
      {/* pigment shelf on the left wall */}
      <Box at={[0, 200, 100]} size={[30, 120, 5]} color="#7a4f32" />
      {['#c4342a', iso.gold, '#2e2a3a', '#f6efe3', '#7a4f32'].map((c, i) => (
        <Cyl key={i} at={[16, 210 + i * 22, 105]} r={7} len={14} axis="z" color={c} />
      ))}
      {/* corkboard with the 1:1 tracing paper of the painting */}
      <Face points={[[gx - 60, 0.5, gz - 50], [gx + 60, 0.5, gz - 50], [gx + 60, 0.5, gz + 46], [gx - 60, 0.5, gz + 46]]} fill="#c9a274" />
      <Face points={[[gx - 52, 0.8, gz - 42], [gx + 52, 0.8, gz - 42], [gx + 52, 0.8, gz + 38], [gx - 52, 0.8, gz + 38]]} fill="#fffaf0" opacity={0.85} />
      <OnPlane at={[gx - 52, 1, gz + 38]} plane="R">
        <g fill="none" stroke="#6c6787" strokeWidth="0.9">
          <path d="M52,14 q-6,18 -10,56 M52,14 q6,18 10,56" />
          <circle cx="52" cy="12" r="5" />
          <path d="M20,60 c-8,-6 -6,-14 0,-16 c6,2 8,10 0,16 z M80,56 c-8,-6 -6,-14 0,-16 c6,2 8,10 0,16 z" />
          <path d="M86,14 h10 M88,10 l6,8 M88,18 l6,-8" />
        </g>
        <text x="96" y="76" textAnchor="end" fontSize="6" fill="#6c6787" fontFamily="Bitter, serif" fontStyle="italic">Khuê</text>
      </OnPlane>
      {[[-48, 36], [48, 36]].map(([a, b], i) => (
        <Box key={i} at={[gx + a, 0.6, gz + b]} size={[3, 2, 3]} color={iso.coral} />
      ))}
      {/* the MDF board, three coats of black, leaning against the left wall */}
      <Face points={[[6, my - 60, 0], [6, my + 50, 0], [bx0 + 12, my + 50, 2 * mz + 10], [bx0 + 12, my - 60, 2 * mz + 10]]} fill="#1d1513" />
      <Face points={[[6, my + 50, 0], [10, my + 50, 0], [bx0 + 16, my + 50, 2 * mz + 10], [bx0 + 12, my + 50, 2 * mz + 10]]} fill="#c9a274" />
      {/* stool against the wall with the client book */}
      <Cyl at={[sz > 0 ? 34 : 30, sy, 0]} r={16} len={40} axis="z" color={iso.coral} />
      <Box at={[20, sy - 14, 40]} size={[30, 26, 4]} color="#5d4a3e" />
      <Box at={[22, sy - 12, 44]} size={[26, 22, 1]} color={iso.cream} />
      {/* bench along the back wall: brushes, a tray, the jar of crushed eggshell */}
      <Box at={[300, 10, 0]} size={[180, 80, 60]} color="#8a6c58" />
      <Box at={[310, 20, 60]} size={[60, 40, 3]} color="#2e2a3a" />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[384 + i * 6, 24, 60]} size={[3, 26, 3]} color="#d4bf8a" />
      ))}
      <Cyl at={[jx, jy, 60]} r={11} len={22} axis="z" color="#e9eef2" cap="#f6efe3" />
      {/* the long work table, a lacquer panel on it; the loupe fell under it */}
      <Box at={[lx - 110, ly - 90, 0]} size={[8, 8, 66]} color="#6b5040" />
      <Box at={[lx + 80, ly - 90, 0]} size={[8, 8, 66]} color="#6b5040" />
      <Cyl at={[lx, ly, 0]} r={7} len={2} axis="z" color="#a3714b" cap="#cfe6f2" />
      <Box at={[lx + 6, ly - 2, 0]} size={[14, 4, 2]} color="#a3714b" />
      <Box at={[lx - 110, ly - 40, 0]} size={[8, 8, 66]} color="#6b5040" />
      <Box at={[lx + 80, ly - 40, 0]} size={[8, 8, 66]} color="#6b5040" />
      <Box at={[lx - 120, ly - 100, 66]} size={[218, 76, 6]} color="#a07c5a" />
      <Box at={[lx - 80, ly - 90, 72]} size={[90, 56, 4]} color="#1d1513" />
      <Box at={[lx - 74, ly - 84, 76]} size={[30, 16, 0.5]} color={iso.gold} />
      <WallText at={[400, 1, 120]} plane="R" text="XƯỞNG SƠN QUÂN" size={18} color={iso.ink} />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'trung-bay': TrungBay,
  'cua-sau': CuaSau,
  'van-phong': VanPhong,
  xuong: Xuong,
}
