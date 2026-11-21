import { BackWalls, Box, Cyl, Face, IsoStage, Slab, Smudge, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Cup, Desk, Table } from '@/art/iso/props'
import {
  Bed, Boots, CameraR, Carton, DoorL, DoorR, Flat, Label, Ladder, LiftL, LiftR, Lockers, NoticeL, NoticeR, PanelL, PanelR, Plant, RingLight,
  SafeX, ScreenR, Sofa, Wardrobe, WindowR,
} from '@/art/iso/props-ch9-12'

// Chapter 9 zones as dioramas: the flat 27.08 at Riverlight (bedroom, living
// room), the 27th-floor corridor and the technical room in basement B2.
// Objects sit under the hotspot percentages in case.json, which stay unchanged.

type Proj = { cx: number; cy: number; s: number }
const P: Proj = { cx: 800, cy: 200, s: 1.6 }
const at = (px: number, py: number, z = 0, p: Proj = P) => floorAt(p, px, py, z)

function Stage({ label, children, sky, p = P }: { label: string; children: React.ReactNode; sky?: [string, string]; p?: Proj }) {
  return (
    <IsoStage label={label} origin={[p.cx, p.cy]} scale={p.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

const WOOD_FLOOR = '#d9bfa3'

function planks(w: number, d: number, color: string) {
  return Array.from({ length: Math.floor(d / 40) }, (_, i) => (
    <Face key={i} points={[[0, 40 + i * 40, 0.2], [w, 40 + i * 40, 0.2], [w, 41.5 + i * 40, 0.2], [0, 41.5 + i * 40, 0.2]]} fill={color} />
  ))
}

/** Bedroom and live-stream corner: the safe in the wooden cupboard, ring light, bed with the empty watch box, dressing table. */
function Bedroom() {
  const FW = 440, FD = 500
  const [my] = wallLAt(P, 25, 51, 170)
  const [bx, by] = at(56, 76, 42)
  const [vx, vy] = at(81, 54, 62)
  return (
    <Stage label="Phòng ngủ căn 27.08 và két sắt, nhìn như sa bàn" sky={['#cdc4ea', '#f6d9c8']}>
      <Slab w={FW} d={FD} floor={WOOD_FLOOR} />
      {planks(FW, FD, '#cdb194')}
      <BackWalls w={FW} d={FD} h={200} left="#e6d8e6" right="#efe2ea" edge="#a99bc0" t={9} />
      {/* window onto the river, curtain to one side */}
      <WindowR x={150} z={70} w={150} h={110} view="river" />
      <PanelR y0={1} x={300} z={60} w={26} h={130} fill="#c9b6dd" />
      {/* ring light aimed at the dressing table, the live schedule on the cupboard's side */}
      <RingLight at={[120, 170, 0]} h={75} />
      {/* the wooden cupboard with the safe set in its lower half; keypad screen above */}
      <Wardrobe at={[110, 330, 0]} w={60} d={170} h={200} color="#c9a27e" />
      <SafeX x0={170} y={my - 46} z={22} w={78} h={70} screen="02:19 ✓" />
      <Face points={[[170.6, my - 46, 128], [170.6, my - 10, 128], [170.6, my - 10, 168], [170.6, my - 46, 168]]} fill="#fffaf0" />
      <Label at={[170.9, my - 12, 160]} plane="L" text="22/12 LIVE" size={6.5} color={iso.coral} />
      <Label at={[170.9, my - 12, 150]} plane="L" text="xả kho -40%" size={5.5} weight={500} />
      {/* bed with the open, empty watch box */}
      <Bed at={[bx - 130, by - 80, 0]} w={210} d={150} cover="#c9b6dd" />
      <Box at={[bx - 22, by - 16, 42]} size={[46, 32, 8]} color="#6b3e2e" />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[bx - 18 + i * 14, by - 12, 50]} size={[11, 24, 0.6]} color="#f0e3c8" />
      ))}
      <Box at={[bx - 22, by - 18, 50]} size={[46, 3, 22]} color="#7d4a37" />
      {/* dressing table with the warranty booklet, mirror on the wall */}
      <Box at={[vx - 60, 6, 0]} size={[110, 52, 60]} color="#e7d3c0" />
      <PanelR y0={0.8} x={vx - 50} z={80} w={90} h={90} fill="#dfe9ee" />
      <PanelR y0={1} x={vx - 30} z={110} w={8} h={50} fill="#ffffff" />
      <Box at={[vx - 12, vy - 10, 62]} size={[24, 18, 3]} color="#9a3a3a" />
      <Box at={[vx - 46, 16, 62]} size={[10, 10, 18]} color={iso.gold} />
      <Box at={[vx + 22, 14, 62]} size={[8, 8, 12]} color="#f2a39a" />
      {/* rug and a plant */}
      <Flat at={[200, 330, 0.3]} w={140} d={120} fill="#cbb6c9" />
      <Plant at={[400, 470, 0]} h={50} />
    </Stage>
  )
}

/** Living room: smart-lock front door, the glass wall to the balcony, coffee table, the photo frame face down on the low shelf. */
function LivingRoom() {
  const FW = 440, FD = 500
  const [dy] = wallLAt(P, 12, 50)
  const [tx, ty] = at(50, 76, 30)
  return (
    <Stage label="Phòng khách căn 27.08 nhìn ra sông, nhìn như sa bàn" sky={['#c9c6ea', '#f7d6c4']}>
      <Slab w={FW} d={FD} floor="#e4d2bf" />
      {planks(FW, FD, '#d6c2ad')}
      <BackWalls w={FW} d={FD} h={200} left="#eae0d6" right="#cfe0ea" edge="#a99bc0" t={9} />
      {/* the glass wall and sliding door onto the balcony, the river beyond */}
      <WindowR x={170} z={0} w={260} h={185} view="river" frame="#e9eef2" />
      <PanelR y0={1.1} x={300} z={0} w={4} h={185} fill="#9aa3b5" />
      <Box at={[312, 1, 70]} size={[4, 4, 24]} color={iso.ink} />
      {/* front door with the fingerprint lock */}
      <DoorL y={dy - 40} w={80} h={160} color="#7d5c41" lock />
      <PanelL x0={1} y={dy - 30} z={128} w={30} h={14} fill="#fffaf0" />
      {/* low shelf with the photo frame lying face down */}
      <Box at={[10, 200, 0]} size={[60, 100, 50]} color="#b98f6e" />
      <Box at={[34, 228, 50]} size={[30, 26, 3]} color="#5b4a3f" />
      <Box at={[18, 270, 50]} size={[12, 12, 22]} color={iso.leaf} />
      {/* sofa, rug and the coffee table with parcels, an order book and an opened bank envelope */}
      <Flat at={[190, 250, 0.3]} w={200} d={170} fill="#d7b9b0" />
      <Sofa at={[190, tx - 90 + 20, 0]} len={170} color="#7e9cb5" />
      <Table at={[tx - 45, ty - 40, 0]} w={90} d={80} h={30} color="#a07c5a" />
      <Carton at={[tx - 38, ty - 32, 30]} size={[30, 24, 18]} text="SHOP" />
      <Carton at={[tx - 4, ty - 34, 30]} size={[22, 18, 12]} color="#e8cf98" />
      <Book at={[tx - 18, ty + 4, 30]} color={iso.coral} />
      <Box at={[tx + 18, ty - 8, 30]} size={[22, 14, 1]} color="#fffaf0" />
      <Cup at={[tx + 30, ty + 26, 30]} fill="#cfe6f2" />
      <Plant at={[400, 440, 0]} h={60} />
    </Stage>
  )
}

/** The 27th-floor corridor: green carpet with boot prints, the service lift and its ladder, the guest lift, the camera turned to the ceiling. */
const PC: Proj = { cx: 800, cy: 450, s: 1.5 }
function Corridor() {
  const FW = 420, FD = 420
  const [ly] = wallLAt(PC, 40, 54)
  const [gx] = wallRAt(PC, 60, 54)
  const [cx, cz] = wallRAt(PC, 70, 14)
  // boot prints from the service lift to the door of 27.08 and back
  const prints: [number, number][] = []
  for (let i = 0; i < 9; i++) {
    const t = i / 8
    prints.push([30 + t * 280, ly + 50 + Math.sin(t * Math.PI) * 140 - t * ly])
  }
  return (
    <Stage label="Hành lang tầng 27, nhìn như sa bàn" sky={['#c4c9e6', '#f2d8c8']} p={PC}>
      <Slab w={FW} d={FD} floor="#5f9a83" />
      <Face points={[[0, 0, 0.2], [FW, 0, 0.2], [FW, 18, 0.2], [0, 18, 0.2]]} fill="#d8cbbf" />
      <Face points={[[0, 0, 0.2], [18, 0, 0.2], [18, FD, 0.2], [0, FD, 0.2]]} fill="#d8cbbf" />
      <BackWalls w={FW} d={FD} h={380} left="#e6dccf" right="#ede3d6" edge="#a99bc0" t={9} />
      {/* wall lights */}
      {[60, 220, 360].map((y) => (
        <Box key={y} at={[0, y, 230]} size={[6, 20, 10]} color="#fff1c2" />
      ))}
      <LiftL y={ly - 40} sign="THANG HÀNG" color="#9aa3b5" />
      <NoticeL y={ly + 60} z={70} w={40} h={50} title="Quẹt thẻ" />
      <LiftR x={gx - 40} sign="THANG KHÁCH" color="#d8c7a6" />
      <DoorR x={250} w={70} h={150} color="#7d5c41" />
      <Label at={[285, 1.2, 168]} plane="R" text="27.08" size={13} anchor="middle" />
      <DoorL y={290} w={70} h={150} color="#7d5c41" />
      <Label at={[1.2, 325, 168]} plane="L" text="27.07" size={13} anchor="middle" />
      <NoticeR x={150} z={90} w={50} h={56} title="Hút bụi 22:00" />
      <CameraR x={cx - 8} z={cz} up />
      <Smudge points={[[cx - 4, 1, cz + 8], [cx + 20, 1, cz + 8], [cx + 20, 1, cz + 40], [cx - 4, 1, cz + 40]]} color="#ffffff" opacity={0.4} />
      {/* the technicians' folding ladder by the service lift */}
      <Ladder at={[40, ly + 70, 0]} h={120} />
      {prints.map(([x, y], i) => (
        <g key={i}>
          <Flat at={[x, y, 0.4]} w={14} d={7} fill={tone('#5f9a83', -0.35)} />
          <Flat at={[x + 2, y + 10, 0.4]} w={14} d={7} fill={tone('#5f9a83', -0.35)} />
        </g>
      ))}
      <Plant at={[380, 380, 0]} h={60} />
    </Stage>
  )
}

/** Technical room in basement B2: the card writer and its box of blank cards, the shift log by the pump cabinet, staff lockers with Vũ's boots, the lift-card hooks. */
function TechRoom() {
  const FW = 480, FD = 500
  const [mx, my] = at(30, 56, 74)
  const [gx, gy] = at(72, 82, 0)
  const [hx, hz] = wallRAt(P, 92, 30)
  return (
    <Stage label="Phòng kỹ thuật hầm B2, nhìn như sa bàn" sky={['#bfc6dc', '#e9d6cc']}>
      <Slab w={FW} d={FD} floor="#bfc0c6" />
      <Smudge points={[[60, 160, 0.3], [300, 170, 0.3], [320, 360, 0.3], [70, 380, 0.3]]} color="#8d8fa8" opacity={0.25} />
      <BackWalls w={FW} d={FD} h={230} left="#c7cbd6" right="#d3d6de" edge="#8d8fa8" t={9} />
      {/* pipes along the left wall, the pumps in the back corner */}
      <Cyl at={[6, 0, 190]} r={8} len={FD} axis="y" color="#7e9cb5" />
      <Cyl at={[6, 0, 160]} r={6} len={FD} axis="y" color={iso.coral} />
      <Cyl at={[60, 120, 0]} r={26} len={50} axis="z" color="#5d8ea3" />
      <Cyl at={[60, 190, 0]} r={26} len={50} axis="z" color="#5d8ea3" />
      {/* pump control cabinet with its screen; the shift log on a stool in front */}
      <Box at={[60, 0, 0]} size={[90, 40, 150]} color="#a9b2c0" />
      <ScreenR at={[78, 40, 40]} w={54} h={34} lines={['TỦ BƠM B2', 'Mở: 20/12 17:05']} size={5.5} />
      <Cyl at={[150, 90, 0]} r={16} len={40} axis="z" color={iso.coral} />
      <Book at={[128, 78, 40]} color="#3f6f8a" />
      {/* the hooks for the lift cards: KT-03 empty */}
      <PanelR y0={0.8} x={hx - 60} z={hz - 30} w={80} h={50} fill="#fffaf0" />
      {['KT-01', 'KT-02', 'KT-03'].map((t, i) => (
        <g key={t}>
          <Box at={[hx - 52 + i * 26, 0, hz]} size={[3, 6, 3]} color={iso.ink} />
          {i < 2 && <Box at={[hx - 56 + i * 26, 6, hz - 20]} size={[12, 1, 16]} color={iso.blue} />}
          <Label at={[hx - 56 + i * 26, 1, hz - 24]} plane="R" text={t} size={5} mono />
        </g>
      ))}
      {/* desk with the card writer and the box of blank cards */}
      <Desk at={[mx - 50, my - 60, 0]} w={100} d={130} />
      <Box at={[mx - 34, my - 46, 74]} size={[34, 40, 14]} color="#4b4760" />
      <Box at={[mx - 30, my - 30, 88]} size={[18, 4, 2]} color="#7fe0c6" />
      <Box at={[mx + 10, my + 6, 74]} size={[24, 34, 16]} color="#ffffff" />
      <Label at={[mx + 22, my + 40.4, 84]} plane="R" text="20 THẺ" size={5} anchor="middle" />
      {/* staff lockers, Vũ's boots on the floor in front */}
      <Lockers at={[gx - 140, gy - 110, 0]} n={3} names={['SANG', 'VŨ', 'TÂM']} />
      <Boots at={[gx - 60, gy - 50, 0]} />
      <Label at={[gx - 58, gy - 9.5, 14]} plane="R" text="VŨ" size={6} color="#fffaf0" />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'phong-ngu': Bedroom,
  'phong-khach': LivingRoom,
  'hanh-lang': Corridor,
  'phong-ky-thuat': TechRoom,
}
