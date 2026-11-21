import { BackWalls, Box, Cyl, Face, IsoStage, LightShaft, Slab, Smudge, WallText, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import {
  Battery, Bin, Book, Bottle, Cabinet, CalendarR, CoilStand, Cup, Desk, Fan, FuseBoxR, HandTruck, Jerrycan, Lighter, Padlock,
  Pallet, PcTower, Rack, Rubble, Sandals, ShutterR, SideDoorX, SocketL, Stool, Table, VBurnL,
} from '@/art/iso/props'

// Chapter 1 zones as dioramas. One projection for all four: the floor is
// 440 (x) by 500 (y) world units at scale 1.6, its back corner at screen (800, 200).
// Objects are placed with floorAt/wallLAt so they land under the hotspot
// percentages in case.json, which stay unchanged.

const P = { cx: 800, cy: 200, s: 1.6 }
const FW = 440
const FD = 500
const at = (px: number, py: number, z = 0) => floorAt(P, px, py, z)

function Stage({ label, children, overlay, sky }: { label: string; children: React.ReactNode; overlay?: React.ReactNode; sky?: [string, string] }) {
  return (
    <IsoStage label={label} origin={[P.cx, P.cy]} scale={P.s} overlay={overlay} sky={sky}>
      {children}
    </IsoStage>
  )
}

/** Cổng và chòi bảo vệ: the guard hut (left wall, tin), the warehouse front with its shutter (right wall). */
function Cong() {
  const [lx, ly] = at(32, 58, 74)
  const [sx, sy] = at(52, 72, 40)
  const [fx, fy] = at(70, 40, 0)
  const [oy, oz] = wallLAt(P, 14, 34)
  return (
    <Stage label="Cổng kho và chòi bảo vệ, nhìn như sa bàn">
      <Slab w={FW} d={FD} floor="#d9cfc4" />
      {/* yard paving */}
      {[100, 200, 300, 400].map((y) => (
        <Face key={y} points={[[0, y, 0.2], [FW, y, 0.2], [FW, y + 3, 0.2], [0, y + 3, 0.2]]} fill="#cbbfb3" />
      ))}
      <BackWalls w={FW} d={FD} h={170} left="#c7c9d6" right="#d9c7b7" edge="#9a8fb0" t={9} />
      {/* corrugated tin of the hut */}
      {Array.from({ length: 26 }, (_, i) => (
        <Face key={i} points={[[0.4, 12 + i * 19, 0], [0.4, 20 + i * 19, 0], [0.4, 20 + i * 19, 170], [0.4, 12 + i * 19, 170]]} fill="#b8bccb" />
      ))}
      <SocketL y={oy - 17} z={oz - 20} />
      <ShutterR x={90} w={170} h={125} />
      <Box at={[100, 0, 132]} size={[150, 6, 26]} color={iso.blue} />
      <WallText at={[176, 7, 140]} plane="R" text="KHO VẢI THỊNH PHÁT" size={22} />
      <Smudge points={[[90, 1, 95], [260, 1, 95], [280, 1, 170], [70, 1, 170]]} opacity={0.4} />
      {/* fan by the wall */}
      <Fan at={[fx, fy + 30, 0]} />
      {/* guard table with the bottle and two glasses; battery under it */}
      <Table at={[lx - 70, ly - 50, 0]} w={150} d={90} h={74} />
      <Battery at={[lx - 50, ly - 30, 0]} />
      <Bottle at={[lx - 30, ly + 4, 74]} />
      <Cup at={[lx + 2, ly - 6, 74]} fill="#f2c46d" />
      <Cup at={[lx + 22, ly + 10, 74]} fill="#f2c46d" />
      {/* plastic stool with the duty log */}
      <Stool at={[sx, sy, 0]} h={40} />
      <Book at={[sx - 22, sy - 15, 40]} />
      {/* a parked scooter by the wall */}
      <Box at={[300, 40, 22]} size={[110, 34, 26]} color={iso.coral} />
      <Box at={[340, 44, 48]} size={[50, 26, 10]} color={iso.ink} />
      <Cyl at={[315, 38, 22]} r={20} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Cyl at={[395, 38, 22]} r={20} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Box at={[400, 48, 48]} size={[8, 8, 50]} color={iso.ink} />
    </Stage>
  )
}

/** Khu hàng: steel racks, burnt rolls, a hole in the roof letting in daylight. */
function KhuHang() {
  const [rx, ry] = at(45, 50, 0)
  const [px, py] = at(20, 68, 0)
  const [hx, hy] = at(78, 62, 0)
  const [cx, cy] = at(62, 82, 0)
  return (
    <Stage
      label="Khu hàng cháy, nhìn như sa bàn"
      sky={['#c4bfe0', '#efd2c4']}
      overlay={<LightShaft from={[rx - 30, ry - 40, 260]} to={[rx, ry, 0]} w={60} />}
    >
      <Slab w={FW} d={FD} floor="#c9b9ab" />
      <Smudge points={[[40, 80, 0.3], [350, 90, 0.3], [380, 380, 0.3], [50, 400, 0.3]]} opacity={0.35} />
      <BackWalls w={FW} d={FD} h={215} left="#b6aac7" right="#c9bbd5" t={9} />
      <Smudge points={[[1, 120, 30], [1, 380, 30], [1, 400, 215], [1, 100, 215]]} opacity={0.45} />
      <Smudge points={[[130, 1, 40], [330, 1, 40], [350, 1, 215], [100, 1, 215]]} opacity={0.4} />
      {/* racks along the back walls: the far ones still hold rolls, the near ones are burnt or empty */}
      <Rack at={[150, 8, 0]} slots={2} len={230} rolls={[['burnt', 'burnt'], ['burnt', null], [null, null]]} />
      <Rack at={[8, 12, 0]} slots={4} rolls={[[iso.coral, iso.gold, iso.blue, 'burnt'], [iso.sky, 'burnt', null, iso.coral], [null, null, iso.gold, null]]} />
      <Rack at={[8, 190, 0]} slots={5} rolls={[['burnt', null, null, 'burnt', null], [null, null, 'burnt', null, null], [null, null, null, null, null]]} />
      {/* the half-burnt roll on the floor, opened: paper core showing */}
      <Rubble at={[rx - 90, ry - 60, 0]} w={90} d={70} />
      <Cyl at={[rx - 50, ry - 6, 14]} r={14} len={80} axis="x" color={iso.soot} cap="#efe4cf" core="#c9b79a" />
      {/* pallets */}
      <Pallet at={[px - 45, py - 45, 0]} burnt />
      <Pallet at={[px - 40, py - 40, 14]} burnt />
      {/* hand truck in the corner */}
      <HandTruck at={[hx - 20, hy - 60, 0]} />
      {/* the jerrycan */}
      <Jerrycan at={[cx - 19, cy - 10, 0]} />
    </Stage>
  )
}

/** Văn phòng: the small office where the fire started. */
function VanPhong() {
  const [vy] = wallLAt(P, 22, 30)
  const [dx, dy] = at(28, 76, 0)
  const [mx, my] = at(62, 55, 74)
  const [bx, by] = at(44, 82, 0)
  return (
    <Stage label="Văn phòng kho, nơi cháy nặng nhất, nhìn như sa bàn" sky={['#bdb5dc', '#f0cfc0']}>
      <Slab w={FW} d={FD} floor="#cdbcb0" />
      {/* tiled floor */}
      {[62, 124, 186, 248, 310, 372].map((v) => (
        <g key={v}>
          <Face points={[[v, 0, 0.2], [v + 1.5, 0, 0.2], [v + 1.5, FD, 0.2], [v, FD, 0.2]]} fill="#c0ada0" />
          <Face points={[[0, v + 62, 0.2], [FW, v + 62, 0.2], [FW, v + 63.5, 0.2], [0, v + 63.5, 0.2]]} fill="#c0ada0" />
        </g>
      ))}
      <Smudge points={[[40, 300, 0.3], [260, 320, 0.3], [260, 490, 0.3], [40, 495, 0.3]]} opacity={0.5} />
      <BackWalls w={FW} d={FD} h={190} left="#c4b3cf" right="#d6c4da" t={9} />
      <VBurnL y={vy} z={10} h={150} />
      {/* window on the right wall */}
      <Face points={[[60, 0.5, 80], [200, 0.5, 80], [200, 0.5, 160], [60, 0.5, 160]]} fill="#e7f0f5" />
      <Face points={[[128, 0.8, 80], [132, 0.8, 80], [132, 0.8, 160], [128, 0.8, 160]]} fill="#b3a5c4" />
      <CalendarR x={wallRAt(P, 80, 25)[0] - 20} z={wallRAt(P, 80, 25)[1] - 26} />
      {/* desk with the PC tower and loose screws */}
      <Desk at={[mx - 70, my - 50, 0]} w={170} d={90} />
      <PcTower at={[mx - 40, my - 34, 74]} />
      <Box at={[mx + 20, my - 10, 74]} size={[50, 34, 3]} color="#fffaf0" />
      {/* office chair */}
      <Box at={[mx - 30, my + 60, 0]} size={[8, 8, 40]} color={iso.ink} />
      <Box at={[mx - 52, my + 40, 40]} size={[52, 50, 10]} color={iso.blue} />
      <Box at={[mx - 52, my + 86, 50]} size={[52, 8, 50]} color={iso.blue} />
      {/* burnt cabinet with the coil stand and rag at its foot */}
      <Cabinet at={[dx - 60, dy - 120, 0]} w={110} d={60} h={160} />
      <CoilStand at={[dx - 10, dy - 6, 0]} />
      {/* bin */}
      <Bin at={[bx, by, 0]} />
    </Stage>
  )
}

/** Sân sau: the alley behind the warehouse, side door and fuse box. */
function SanSau() {
  const ky = 250
  const [sx, sy] = at(50, 80, 0)
  const [lx, ly] = at(20, 78, 0)
  return (
    <Stage label="Sân sau và cửa hông của kho, nhìn như sa bàn" sky={['#c3c9e6', '#f4d6c6']}>
      <Slab w={FW} d={FD} floor="#cfc3b6" />
      {/* the warehouse's back wall as a block on the left, with the side door in its face */}
      <Box at={[0, 0, 0]} size={[75, FD, 175]} color="#b3a6c6" top="#9a8fb0" />
      <SideDoorX x0={75} y={ky - 40} w={80} h={125} />
      <Padlock at={[76, ky - 6, 34]} />
      {/* a step in front of the door */}
      <Box at={[75, ky - 48, 0]} size={[30, 96, 8]} color="#bdb1a5" />
      {/* the neighbour's fence on the right */}
      <BackWalls w={FW} d={FD} h={140} right="#d8cbbf" edge="#a99a8c" t={9} />
      {Array.from({ length: 12 }, (_, i) => (
        <Face key={i} points={[[90 + i * 30, 0.6, 0], [92 + i * 30, 0.6, 0], [92 + i * 30, 0.6, 140], [90 + i * 30, 0.6, 140]]} fill="#c6b8ab" />
      ))}
      <FuseBoxR x={205} z={36} />
      {/* cables from the fuse box into the warehouse */}
      <Face points={[[75, 0.8, 150], [235, 0.8, 116], [235, 0.8, 119], [75, 0.8, 153]]} fill={iso.ink} />
      {/* potted plant and water jar */}
      <Cyl at={[400, 40, 0]} r={26} len={40} axis="z" color="#c98a5c" />
      <Box at={[384, 24, 40]} size={[32, 32, 40]} color={iso.leaf} />
      <Cyl at={[340, 110, 0]} r={30} len={56} axis="z" color={tone(iso.blue, -0.1)} cap="#9fc2d6" />
      <Sandals at={[sx - 16, sy - 14, 0]} />
      <Lighter at={[lx - 10, ly - 4, 0]} />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  cong: Cong,
  'khu-hang': KhuHang,
  'van-phong': VanPhong,
  'san-sau': SanSau,
}
