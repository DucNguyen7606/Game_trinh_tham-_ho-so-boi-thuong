import { BackWalls, Box, Cyl, Face, IsoStage, LightShaft, Slab, Smudge, WallText, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Cup, Table } from '@/art/iso/props'
import { Camera, Car, Patch, Scooter, StreetLamp, Tree, Water } from '@/art/iso/street'

// Chapter 5 zones as dioramas, on the same projection as Chapter 1: the floor's
// back corner at screen (800, 200), scale 1.6. Objects are placed with
// floorAt/wallLAt/wallRAt so they land under the hotspot percentages in case.json.

const P = { cx: 800, cy: 200, s: 1.6 }
/** World point on the floor (height z) under a screen point in percent; exported so reconstruction panels can stage people in these dioramas. */
export const at = (px: number, py: number, z = 0) => floorAt(P, px, py, z)

/** Extra pieces a reconstruction panel adds to a zone (people, the car that night). */
export interface SceneProps {
  extra?: React.ReactNode
  /** Leave out the Mercedes (it is somewhere else at that moment). */
  noCar?: boolean
}
const NIGHT: [string, string] = ['#a9aed6', '#e3c9d3']

export const mercedes = '#2f2c40'
const coolant = '#ef8fb5'

function Stage({ label, children, overlay, sky = NIGHT }: { label: string; children: React.ReactNode; overlay?: React.ReactNode; sky?: [string, string] }) {
  return (
    <IsoStage label={label} origin={[P.cx, P.cy]} scale={P.s} overlay={overlay} sky={sky}>
      {children}
    </IsoStage>
  )
}

/** Two parallel tyre ruts pressed into soft ground from (x0, y0) to (x1, y1). */
function Ruts({ from, to, gap = 56 }: { from: [number, number]; to: [number, number]; gap?: number }) {
  const [x0, y0] = from
  const [x1, y1] = to
  const len = Math.hypot(x1 - x0, y1 - y0)
  const nx = (-(y1 - y0) / len) * (gap / 2), ny = ((x1 - x0) / len) * (gap / 2)
  const rut = (s: number) => {
    const ox = nx * s, oy = ny * s
    const wx = (nx / (gap / 2)) * 6, wy = (ny / (gap / 2)) * 6
    return (
      <Face
        key={s}
        points={[[x0 + ox - wx, y0 + oy - wy, 0.4], [x1 + ox - wx, y1 + oy - wy, 0.4], [x1 + ox + wx, y1 + oy + wy, 0.4], [x0 + ox + wx, y0 + oy + wy, 0.4]]}
        fill="#7b6048"
      />
    )
  }
  return <g>{[-1, 1].map(rut)}</g>
}

/** A pair of hard-soled shoe prints, toes dug in. */
function ShoePrints({ x, y }: { x: number; y: number }) {
  const print = (dx: number, dy: number) => (
    <g key={`${dx}${dy}`}>
      <Face points={[[x + dx, y + dy, 0.5], [x + dx + 34, y + dy, 0.5], [x + dx + 34, y + dy + 13, 0.5], [x + dx, y + dy + 13, 0.5]]} fill="#6a503b" />
      <Face points={[[x + dx + 22, y + dy, 0.6], [x + dx + 34, y + dy, 0.6], [x + dx + 34, y + dy + 13, 0.6], [x + dx + 22, y + dy + 13, 0.6]]} fill="#3f2e20" />
    </g>
  )
  return <g>{print(0, 0)}{print(14, 18)}</g>
}

/** Bờ kênh Thủ Thiêm: the road along the back left, the Mercedes nose-first into a tree on the canal bank, a cow field beyond. */
function BoKenh({ extra, noCar }: SceneProps = {}) {
  const [nx, ny] = at(78, 68, 34)
  const [, cy] = at(64, 52, 64)
  const [rx] = at(34, 52)
  const [gx, gy] = at(22, 76)
  const [bx, by] = at(88, 30, 70)
  const len = 200
  const carX = nx - len
  const carY = Math.min(ny - 40, cy - 40)
  return (
    <Stage label="Bờ kênh Thủ Thiêm lúc rạng sáng, nhìn như sa bàn">
      {/* dirt bank */}
      <Slab w={520} d={520} floor="#c9ad8f" side="#d9c2a6" />
      {/* the road along the back-left edge, its edge line at the hotspot */}
      <Patch at={[0, 0]} w={rx + 4} d={520} color="#8d8aa0" />
      <Patch at={[rx - 2, 0]} w={6} d={520} color="#efe7d6" z={0.5} />
      {[30, 130, 230, 330, 430].map((y) => (
        <Patch key={y} at={[rx / 2 - 3, y]} w={6} d={50} color="#efe7d6" z={0.5} />
      ))}
      {/* grass verge on the bank */}
      <Patch at={[rx + 4, 0]} w={520 - rx - 4} d={60} color="#9cbf8f" />
      {/* the canal along the right edge */}
      <Water at={[470, 0]} w={50} d={520} color="#7fa2b8" z={0.4} />
      <Patch at={[0, 470]} w={470} d={50} color="#7fa2b8" z={0.4} />
      {/* ruts running straight off the road edge to the car, and the shoe prints beside them */}
      <Ruts from={[rx + 4, carY + 40]} to={[carX + 20, carY + 40]} />
      <ShoePrints x={gx - 20} y={gy - 16} />
      {[[300, 300], [380, 420], [200, 400], [420, 200], [120, 330]].map(([x, y], i) => (
        <Box key={`t${i}`} at={[x, y, 0]} size={[14, 10, 10 + (i % 3) * 5]} color="#8fb37f" />
      ))}
      {/* traffic cone left by the police */}
      <Box at={[rx + 30, carY + 100, 0]} size={[20, 20, 4]} color={iso.coral} />
      <Cyl at={[rx + 40, carY + 110, 4]} r={7} len={22} axis="z" color={iso.coral} cap="#fff" />
      {/* cow field and the locked pen in the back right */}
      <Box at={[bx - 70, by - 40, 0]} size={[120, 90, 70]} color="#b98a63" top="#9a6b4a" />
      <Face points={[[bx - 70 + 120.5, by - 20, 0], [bx - 70 + 120.5, by + 20, 0], [bx - 70 + 120.5, by + 20, 50], [bx - 70 + 120.5, by - 20, 50]]} fill="#5b4632" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[bx - 120 + i * 6, by + 60 + i * 40, 0]} size={[6, 6, 36]} color={iso.wood} />
      ))}
      <Box at={[bx - 120, by + 60, 28]} size={[24, 128, 4]} color={iso.wood} />
      {/* the tree the car went into, on the very edge of the bank */}
      <Tree at={[nx + 30, ny, 0]} h={190} r={56} color="#6f9f7c" />
      {/* the Mercedes, nose crumpled against the trunk, round dent on the front right corner */}
      {!noCar && <Car at={[carX, carY, 0]} color={mercedes} len={len} w={84} tall dent={['mid', 'right']} />}
      {extra}
    </Stage>
  )
}

/** Góc đường Nguyễn Văn Hưởng: the bánh mì cart under a shop awning, the police paint marks, the pink coolant drip trail. */
function NguyenVanHuong({ extra }: SceneProps = {}) {
  const [vx, vy] = at(46, 70)
  const [gy] = wallLAt(P, 12, 46)
  const [dx, dy] = at(18, 82)
  const [wx, wy] = at(76, 62)
  return (
    <Stage label="Góc đường Nguyễn Văn Hưởng, nhìn như sa bàn">
      <Slab w={480} d={520} floor="#9d99ae" side="#cdc6d6" />
      {/* pavement along the shop fronts */}
      <Patch at={[0, 0]} w={70} d={520} color="#d6cbbd" z={0.3} />
      <Patch at={[70, 0]} w={410} d={60} color="#d6cbbd" z={0.3} />
      <Box at={[66, 60, 0]} size={[4, 460, 6]} color="#c2b6a8" />
      {/* shop houses: the bánh mì shop on the left wall, the pharmacy on the right */}
      <BackWalls w={480} d={520} h={200} left="#e8d9c0" right="#e4d6c9" edge="#a99a8c" t={10} />
      <Face points={[[0.5, gy - 70, 0], [0.5, gy + 90, 0], [0.5, gy + 90, 110], [0.5, gy - 70, 110]]} fill="#d6b88f" />
      <Face points={[[0.5, gy - 60, 130], [0.5, gy + 80, 130], [0.5, gy + 80, 186], [0.5, gy - 60, 186]]} fill="#f2c46d" />
      <Face points={[[0.5, 40, 120], [0.5, 120, 120], [0.5, 120, 180], [0.5, 40, 180]]} fill="#7d93b0" />
      <Face points={[[200, 0.5, 30], [440, 0.5, 30], [440, 0.5, 100], [200, 0.5, 100]]} fill="#f6f2ea" />
      <Box at={[210, 0, 104]} size={[150, 6, 26]} color="#4f9a86" />
      <WallText at={[285, 7, 112]} plane="R" text="NHÀ THUỐC" size={20} />
      <Box at={[380, 0, 104]} size={[30, 6, 30]} color="#57b46b" />
      <Face points={[[80, 0.5, 130], [170, 0.5, 130], [170, 0.5, 186], [80, 0.5, 186]]} fill="#7d93b0" />
      {/* the bánh mì cart pushed under the awning */}
      <Box at={[6, gy - 46, 0]} size={[56, 96, 18]} color={iso.ink} />
      <Box at={[6, gy - 50, 18]} size={[56, 104, 60]} color="#fbf4e6" />
      <Box at={[4, gy - 54, 78]} size={[60, 112, 18]} color="#c94a3a" />
      <WallText at={[64.5, gy + 2, 82]} plane="L" text="BÁNH MÌ CHỊ HOA" size={11} />
      <Face points={[[62.5, gy - 30, 30], [62.5, gy + 36, 30], [62.5, gy + 36, 68], [62.5, gy - 30, 68]]} fill="#f2d9a8" />
      {/* street lamp and trees along the pavement */}
      <StreetLamp at={[40, 250, 0]} h={200} />
      <Tree at={[110, 30, 0]} h={180} r={44} />
      {/* the police paint marks: where the Wave fell and where chị Hoa lay */}
      {[[vx - 70, vy - 40, 140, 4], [vx - 70, vy + 36, 140, 4], [vx - 70, vy - 40, 4, 80], [vx + 66, vy - 40, 4, 80]].map(([x, y, w, d], i) => (
        <Patch key={i} at={[x, y]} w={w} d={d} color="#ffffff" z={0.5} />
      ))}
      <Scooter at={[vx - 54, vy - 20, 0]} color="#d24b3c" fallen />
      {[[vx + 100, vy + 20, 50, 4], [vx + 100, vy + 66, 50, 4], [vx + 100, vy + 20, 4, 50], [vx + 146, vy + 20, 4, 50]].map(([x, y, w, d], i) => (
        <Patch key={`b${i}`} at={[x, y]} w={w} d={d} color="#ffffff" z={0.5} />
      ))}
      {/* pink drops from the impact towards Thảo Điền road, getting smaller */}
      {Array.from({ length: 12 }, (_, i) => {
        const t = i / 11
        const x = vx + 70 + (wx - vx - 70) * t
        const y = vy - 20 + (wy - vy + 20) * t
        const r = 7 - i * 0.4
        return <Patch key={`d${i}`} at={[x, y]} w={r * 1.6} d={r} color={coolant} z={0.6} />
      })}
      {/* storm drain grille in the gutter */}
      <Box at={[dx - 40, dy - 16, -2]} size={[80, 32, 2.5]} color="#4b4760" />
      {Array.from({ length: 7 }, (_, i) => (
        <Patch key={`g${i}`} at={[dx - 36 + i * 11, dy - 14]} w={4} d={28} color="#2a2433" z={0.7} />
      ))}
      <Patch at={[dx - 8, dy - 4]} w={6} d={4} color="#e9f1f6" z={0.9} />
      {extra}
    </Stage>
  )
}

/** Gara khách sạn Sông Xanh: the owner's bay with its dried pink ring, the bucket and rags, the hotel Innova, the swept-up red plastic. */
function Gara({ extra }: SceneProps = {}) {
  const [vx, vy] = at(42, 72)
  const [bx, by] = at(62, 70)
  const [ix, iy] = at(18, 52, 60)
  const [gx, gy] = at(82, 76)
  return (
    <Stage
      label="Gara khách sạn Sông Xanh, nhìn như sa bàn"
      sky={['#b9b4d8', '#ead2cf']}
      overlay={<LightShaft from={[vx - 10, vy - 40, 200]} to={[vx, vy, 0]} w={40} />}
    >
      <Slab w={540} d={520} floor="#bdb8c4" side="#d8d0dc" />
      <BackWalls w={540} d={520} h={210} left="#cfc8d8" right="#d9d1df" edge="#9a8fb0" t={9} />
      {/* yellow bay lines */}
      {[130, 300, 470].map((y) => (
        <Patch key={y} at={[60, y]} w={300} d={6} color={iso.gold} z={0.4} />
      ))}
      {/* concrete columns */}
      {[[20, 330], [260, 20]].map(([x, y], i) => (
        <Box key={i} at={[x, y, 0]} size={[26, 26, 210]} color="#c7c0cf" />
      ))}
      {/* bay sign on the right wall */}
      <Box at={[90, 0, 140]} size={[110, 4, 30]} color="#3f5a78" />
      <WallText at={[145, 5, 150]} plane="R" text="CHỖ 01 · CHỦ" size={16} />
      {/* shelf with the pink coolant can on the right wall */}
      <Box at={[240, 0, 100]} size={[110, 24, 5]} color={iso.wood} />
      <Box at={[262, 4, 105]} size={[22, 16, 30]} color={coolant} />
      <Box at={[270, 8, 135]} size={[6, 6, 5]} color={iso.ink} />
      <Box at={[300, 4, 105]} size={[20, 14, 16]} color={iso.cream} />
      {/* the empty owner's bay: the dried pink ring where the Mercedes' nose stood */}
      <Smudge points={[[vx - 50, vy - 34, 0.4], [vx + 50, vy - 34, 0.4], [vx + 50, vy + 34, 0.4], [vx - 50, vy + 34, 0.4]]} color="#d980a6" opacity={0.35} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2, b = ((i + 1) / 8) * Math.PI * 2
        return (
          <Face
            key={i}
            points={[[vx + Math.cos(a) * 48, vy + Math.sin(a) * 30, 0.6], [vx + Math.cos(b) * 48, vy + Math.sin(b) * 30, 0.6], [vx + Math.cos(b) * 42, vy + Math.sin(b) * 25, 0.6], [vx + Math.cos(a) * 42, vy + Math.sin(a) * 25, 0.6]]}
            fill={coolant}
          />
        )
      })}
      {/* the hotel Innova, parked along the left wall */}
      <Car at={[ix - 100, iy - 40, 0]} color="#ece6dc" len={200} w={84} tall />
      {/* bucket and rags */}
      <Cyl at={[bx, by, 0]} r={18} len={34} axis="z" color="#4f9a86" cap="#a9d3df" />
      <Box at={[bx + 20, by + 14, 0]} size={[30, 18, 3]} color={iso.cream} />
      <Box at={[bx - 34, by + 22, 0]} size={[24, 16, 3]} color="#e9e1cf" />
      {/* broom in the corner and the swept-up red plastic behind it */}
      {[[-14, -6], [-4, 8], [8, -10], [14, 6], [-10, 14]].map(([ox, oy], i) => (
        <Box key={i} at={[gx + ox, gy + oy, 0]} size={[10, 6, 2]} color="#d24b3c" />
      ))}
      <Box at={[gx + 6, gy - 30, 0]} size={[34, 14, 14]} color="#d9a86a" />
      <Box at={[gx + 20, gy - 26, 14]} size={[5, 5, 120]} color={iso.wood} />
      {extra}
    </Stage>
  )
}

/** Chốt bảo vệ: the guard's desk with the log book and the tea, the key board, the dead gate camera. */
function Cong({ extra }: SceneProps = {}) {
  const [sx, sy] = at(52, 64, 74)
  const [tx, ty] = at(70, 58, 74)
  const [ky, kz] = wallLAt(P, 22, 40)
  const [cx, cz] = wallRAt(P, 84, 18)
  return (
    <Stage label="Chốt bảo vệ khách sạn Sông Xanh, nhìn như sa bàn" sky={['#b3b4da', '#efd3c9']}>
      <Slab w={440} d={500} floor="#d6c6b6" side="#e2d2c2" />
      <BackWalls w={440} d={500} h={250} left="#e7dccb" right="#ece0cf" edge="#a99a8c" t={9} />
      {/* the window onto the hotel yard, the hotel name above */}
      <Face points={[[60, 0.5, 60], [260, 0.5, 60], [260, 0.5, 150], [60, 0.5, 150]]} fill="#3c4a6a" />
      {[90, 120, 150, 180, 210, 240].map((x) => (
        <Face key={x} points={[[x, 0.8, 60], [x + 3, 0.8, 60], [x + 3, 0.8, 150], [x, 0.8, 150]]} fill="#8b93a8" />
      ))}
      <Face points={[[160, 0.8, 60], [164, 0.8, 60], [164, 0.8, 150], [160, 0.8, 150]]} fill={iso.wood} />
      <WallText at={[160, 1, 160]} plane="R" text="KHÁCH SẠN SÔNG XANH" size={18} color={iso.mustard} />
      {/* the key board on the left wall: three keys, the MERCEDES hook empty */}
      <Face points={[[0.5, ky - 50, kz - 40], [0.5, ky + 60, kz - 40], [0.5, ky + 60, kz + 50], [0.5, ky - 50, kz + 50]]} fill={iso.woodDark} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Face points={[[1, ky - 40 + i * 26, kz + 30], [1, ky - 34 + i * 26, kz + 30], [1, ky - 34 + i * 26, kz + 36], [1, ky - 40 + i * 26, kz + 36]]} fill={iso.metal} />
          {i < 3 && <Face points={[[1.2, ky - 39 + i * 26, kz + 6], [1.2, ky - 35 + i * 26, kz + 6], [1.2, ky - 35 + i * 26, kz + 30], [1.2, ky - 39 + i * 26, kz + 30]]} fill={iso.gold} />}
          <Face points={[[1.2, ky - 44 + i * 26, kz - 26], [1.2, ky - 30 + i * 26, kz - 26], [1.2, ky - 30 + i * 26, kz - 16], [1.2, ky - 44 + i * 26, kz - 16]]} fill={i === 3 ? '#ffffff' : iso.cream} />
        </g>
      ))}
      {/* the dead gate camera with the note under it */}
      <Camera at={[cx, 0, cz + 6]} wall="R" />
      <Face points={[[cx - 26, 0.6, cz - 50], [cx + 26, 0.6, cz - 50], [cx + 26, 0.6, cz - 20], [cx - 26, 0.6, cz - 20]]} fill="#fbf0b8" />
      {/* the guard's long desk */}
      <Table at={[sx - 150, sy - 50, 0]} w={330} d={100} h={74} color="#9b7d6a" />
      {/* the log book, a torn stub at the spine */}
      <Book at={[sx - 22, sy - 15, 74]} color="#c9b07a" />
      <Box at={[sx, sy - 12, 79]} size={[2, 24, 3]} color="#fffaf0" />
      <Box at={[sx + 30, sy + 6, 74]} size={[18, 2.5, 2.5]} color="#6c6787" />
      {/* teapot and two cups */}
      <Cyl at={[tx, ty, 74]} r={14} len={18} axis="z" color="#c9a27a" cap="#d9b48c" />
      <Box at={[tx - 2, ty + 12, 84]} size={[4, 14, 3]} color="#c9a27a" />
      <Cup at={[tx + 30, ty + 6, 74]} fill="#c69a4c" />
      <Cup at={[tx + 48, ty + 22, 74]} fill="#c69a4c" />
      {/* standing fan and a plastic stool */}
      <Box at={[400, 40, 0]} size={[24, 24, 4]} color={iso.metal} />
      <Box at={[410, 50, 4]} size={[4, 4, 90]} color={iso.metal} />
      <Cyl at={[412, 56, 104]} r={26} len={4} axis="y" color="#4f9a86" cap="#7fc0b0" core={iso.ink} />
      <Cyl at={[sx - 40, sy + 120, 0]} r={18} len={40} axis="z" color={iso.coral} />
      <Smudge points={[[60, 380, 0.3], [300, 380, 0.3], [300, 480, 0.3], [60, 480, 0.3]]} color={tone('#d6c6b6', -0.3)} opacity={0.15} />
      {extra}
    </Stage>
  )
}

export const isoSceneArt: Record<string, (props?: SceneProps) => JSX.Element> = {
  'bo-kenh': BoKenh,
  'nguyen-van-huong': NguyenVanHuong,
  gara: Gara,
  cong: Cong,
}

