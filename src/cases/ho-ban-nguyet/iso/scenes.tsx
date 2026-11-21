import { BackWalls, Box, Cyl, Face, IsoStage, Slab, Smudge, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Cup, Desk, Table } from '@/art/iso/props'
import { Carton, DoorL, Flat, Label, NoticeR, PanelL, PanelR, Plant, ScreenR, Sofa, WindowR } from '@/art/iso/props-ch9-12'

// Chapter 11 zones as dioramas: the balcony and living room of flat 21.05 by
// Bán Nguyệt lake, the garden and car-park ramps under tower B, and the
// Hưng Toàn office at Tân Thuận port. Objects sit under the hotspot
// percentages in case.json, which stay unchanged.

const P = { cx: 800, cy: 200, s: 1.6 }
const at = (px: number, py: number, z = 0) => floorAt(P, px, py, z)

function Stage({ label, children, sky }: { label: string; children: React.ReactNode; sky?: [string, string] }) {
  return (
    <IsoStage label={label} origin={[P.cx, P.cy]} scale={P.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

/** A folding chair, folded and leaning on the left wall. */
function FoldedChair({ y }: { y: number }) {
  return (
    <g>
      <Face points={[[2, y, 0], [2, y + 40, 0], [16, y + 40, 90], [16, y, 90]]} fill="#7e9cb5" />
      <Face points={[[4, y + 4, 10], [4, y + 36, 10], [14, y + 36, 70], [14, y + 4, 70]]} fill={tone('#7e9cb5', 0.2)} />
    </g>
  )
}

/** One slipper lying on the floor. */
export function Slipper({ at: p, flip = false }: { at: [number, number, number]; flip?: boolean }) {
  const [x, y, z] = p
  return flip ? <Box at={[x, y, z]} size={[14, 30, 4]} color="#3f6f8a" /> : <Box at={[x, y, z]} size={[30, 14, 4]} color="#3f6f8a" />
}

/** Balcony of 21.05: glass railing on the lake side, the toppled pot and its trail of soil, folded chairs, the smoker's table, two slippers. */
function Balcony() {
  const FW = 380, FD = 500
  const [cy] = wallLAt(P, 10, 62)
  const [px, py] = at(28, 74)
  const [dx, dy] = at(47, 88)
  const [tx, ty] = at(76, 66, 40)
  return (
    <Stage label="Ban công căn 21.05 nhìn xuống hồ Bán Nguyệt, nhìn như sa bàn" sky={['#c9c6ea', '#a9cfdc']}>
      <Slab w={FW} d={FD} floor="#c9a27e" side="#e9e6e2" depth={40} />
      {Array.from({ length: 11 }, (_, i) => (
        <Face key={i} points={[[0, 40 + i * 42, 0.2], [FW, 40 + i * 42, 0.2], [FW, 42 + i * 42, 0.2], [0, 42 + i * 42, 0.2]]} fill="#b48f6c" />
      ))}
      <BackWalls w={FW} d={FD} h={190} left="#e7e1ee" right="#ded6e8" edge="#a99bc0" t={9} />
      {/* the sliding glass door into the living room */}
      <PanelL x0={0.6} y={130} z={0} w={170} h={160} fill="#9fb9c8" />
      <PanelL x0={0.9} y={212} z={0} w={4} h={160} fill="#e9eef2" />
      <PanelL x0={1} y={140} z={10} w={60} h={140} fill="#c3d6e0" />
      <FoldedChair y={cy - 30} />
      <FoldedChair y={cy + 14} />
      {/* soil trail and heel scuffs from the pot towards the railing */}
      <Smudge points={[[px - 10, py - 30, 0.4], [FW - 40, py - 160, 0.4], [FW - 30, py - 130, 0.4], [px + 20, py, 0.4]]} color="#5a4030" opacity={0.45} />
      <Flat at={[px + 60, py - 70, 0.4]} w={40} d={4} fill={iso.ink} />
      <Flat at={[px + 80, py - 90, 0.4]} w={40} d={4} fill={iso.ink} />
      {/* the toppled pot */}
      <Cyl at={[px - 30, py, 16]} r={16} len={36} axis="x" color="#c98a5c" cap="#5a4030" />
      <Box at={[px + 6, py - 14, 2]} size={[34, 28, 22]} color={iso.leaf} />
      {/* the small table: ashtray, lighter, cold tea */}
      <Table at={[tx - 40, ty - 30, 0]} w={70} d={60} h={40} color="#d9d5d0" />
      <Cyl at={[tx - 16, ty - 6, 40]} r={9} len={4} axis="z" color="#9aa3b5" cap="#6c6787" />
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[tx - 22 + i * 5, ty - 8, 44]} size={[2, 7, 2]} color="#f2c46d" />
      ))}
      <Box at={[tx + 4, ty + 12, 40]} size={[10, 4, 6]} color={iso.coral} />
      <Cup at={[tx + 16, ty - 10, 40]} fill="#c9a24f" />
      {/* the slippers: one by the railing, one flung back */}
      <Slipper at={[dx - 20, dy - 10, 0]} />
      <Slipper at={[20, 240, 0]} flip />
      {/* the glass railing along the lake side */}
      <Face points={[[FW, 0, 0], [FW, FD, 0], [FW, FD, 86], [FW, 0, 86]]} fill="#bfe0ea" opacity={0.4} />
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} at={[FW - 3, i * 100, 0]} size={[4, 4, 86]} color="#9aa3b5" />
      ))}
      <Box at={[FW - 4, 0, 86]} size={[6, FD, 5]} color="#d9dde5" />
      <Label at={[FW + 0.5, FD - 40, 70]} plane="L" text="1,4 m" size={9} color={iso.coral} />
    </Stage>
  )
}

/** Living room of 21.05: intercom by the front door, photo shelf, whisky and two glasses, desk by the window, the packed suitcase. */
function LivingRoom() {
  const FW = 560, FD = 500
  const [iy, iz] = wallLAt(P, 9, 46)
  const [sy, sz] = wallLAt(P, 30, 34)
  const [gx, gy] = at(45, 72, 40)
  const [wx, wy] = at(74, 58, 74)
  return (
    <Stage label="Phòng khách căn 21.05, nhìn như sa bàn" sky={['#c9c4ea', '#f6d6c4']}>
      <Slab w={FW} d={FD} floor="#d9c3a8" />
      {Array.from({ length: 12 }, (_, i) => (
        <Face key={i} points={[[40 + i * 44, 0, 0.2], [41.5 + i * 44, 0, 0.2], [41.5 + i * 44, FD, 0.2], [40 + i * 44, FD, 0.2]]} fill="#cdb497" />
      ))}
      <BackWalls w={FW} d={FD} h={200} left="#eae0d6" right="#e6dde8" edge="#a99bc0" t={9} />
      {/* window over the lake, desk under it */}
      <WindowR x={300} z={70} w={200} h={110} view="river" />
      {/* front door and the intercom */}
      <DoorL y={iy - 110} w={80} h={160} color="#5b4a3f" />
      <PanelL x0={0.8} y={iy - 18} z={iz - 18} w={36} h={36} fill={iso.ink} />
      <PanelL x0={1} y={iy - 14} z={iz - 10} w={28} h={24} fill="#7fe0c6" />
      <Label at={[1.2, iy + 12, iz]} plane="L" text="23:08 B2" size={5} mono />
      {/* photo shelf on the left wall */}
      <Box at={[0, sy - 70, sz - 4]} size={[30, 140, 5]} color="#a07c5a" />
      <Box at={[0, sy - 60, sz + 1]} size={[8, 46, 34]} color="#f2c46d" />
      <PanelL x0={8.4} y={sy - 56} z={sz + 5} w={38} h={26} fill="#9fc2d6" />
      <Box at={[0, sy + 10, sz + 1]} size={[8, 30, 40]} color="#ffffff" />
      <PanelL x0={8.4} y={sy + 14} z={sz + 5} w={22} h={32} fill="#f6efe3" />
      {/* leather sofa and the glass coffee table with the whisky and two glasses on a tray */}
      <Sofa at={[gx - 160, gy - 90, 0]} len={180} color="#7d4a37" />
      <Table at={[gx - 50, gy - 45, 0]} w={100} d={90} h={40} color="#d9dde5" />
      <Box at={[gx - 10, gy - 30, 40]} size={[44, 34, 2]} color="#a07c5a" />
      <Cyl at={[gx - 30, gy + 10, 40]} r={7} len={26} axis="z" color="#c9883a" />
      <Cyl at={[gx - 30, gy + 10, 66]} r={3} len={8} axis="z" color={iso.ink} />
      <Cup at={[gx - 2, gy - 20, 42]} fill="#e2a95a" />
      <Cup at={[gx + 22, gy - 14, 42]} fill="#eef4fa" />
      {/* the desk: folder and the open notebook */}
      <Desk at={[wx - 80, wy - 40, 0]} w={160} d={80} />
      <Box at={[wx - 60, wy - 26, 74]} size={[40, 30, 4]} color="#e8cf98" />
      <Book at={[wx - 6, wy - 10, 74]} color="#3f6f8a" />
      {/* the packed suitcase in the corner */}
      <Box at={[490, 60, 0]} size={[40, 60, 70]} color={iso.coral} />
      <Box at={[505, 80, 70]} size={[10, 20, 14]} color={iso.ink} />
      <Box at={[492, 120.2, 30]} size={[24, 1, 12]} color="#fffaf0" />
      <Plant at={[40, 470, 0]} h={60} />
    </Stage>
  )
}

/** Garden under tower B: the guard hut, the white paint ring on the grass, the flower bed, the car ramp and the bike-park ticket machine. */
function Garden() {
  const FW = 440, FD = 500
  const [hx, hy] = at(14, 56)
  const [rx, ry] = at(46, 78)
  const [, by] = at(28, 86)
  const [tx] = wallRAt(P, 80, 56)
  return (
    <Stage label="Sân vườn dưới tòa B và lối xuống hầm xe, nhìn như sa bàn" sky={['#c9c6ea', '#f3d8c6']}>
      <Slab w={FW} d={FD} floor="#8fbf8a" side="#c7b8a3" />
      <BackWalls w={FW} d={FD} h={210} left="#ddd6e8" right="#e6dfee" edge="#a99bc0" t={9} />
      {/* tower B: balconies up the wall; 21.05 is somewhere far above */}
      {[60, 120, 180].map((z) => (
        <Box key={z} at={[0, 200, z]} size={[30, 160, 4]} color="#d9dde5" />
      ))}
      {/* the car ramp in the right wall, the camera screen beside it */}
      <PanelR y0={0.6} x={140} z={0} w={130} h={100} fill="#3d3446" />
      <Face points={[[140, 0.8, 0], [270, 0.8, 0], [270, 40, 0.3], [140, 40, 0.3]]} fill="#9aa3b5" />
      <Label at={[205, 1, 112]} plane="R" text="HẦM Ô TÔ B1" size={12} anchor="middle" />
      <ScreenR at={[100, 2, 50]} w={30} h={24} lines={['B1']} size={6} />
      {/* bike-park entrance and ticket machine */}
      <PanelR y0={0.6} x={tx - 10} z={0} w={70} h={90} fill="#3d3446" />
      <Label at={[tx + 25, 1, 102]} plane="R" text="XE MÁY B2" size={11} anchor="middle" />
      <Box at={[tx - 40, 14, 0]} size={[22, 22, 56]} color={iso.gold} />
      <Box at={[tx - 36, 36, 34]} size={[14, 0.6, 12]} color={iso.ink} />
      <Box at={[tx - 10, 30, 30]} size={[90, 4, 4]} color={iso.coral} />
      {/* path */}
      <Face points={[[300, 0, 0.3], [380, 0, 0.3], [380, FD, 0.3], [300, FD, 0.3]]} fill="#d8cfc4" />
      {/* the guard hut */}
      <Box at={[hx, hy - 60, 0]} size={[80, 100, 110]} color="#f2c46d" />
      <Box at={[hx - 6, hy - 66, 110]} size={[92, 112, 8]} color="#9a6b4a" />
      <Face points={[[hx + 80.4, hy - 40, 50], [hx + 80.4, hy + 20, 50], [hx + 80.4, hy + 20, 90], [hx + 80.4, hy - 40, 90]]} fill="#fbe3a6" />
      <Box at={[hx + 80, hy - 30, 46]} size={[14, 40, 4]} color="#a07c5a" />
      <Book at={[hx + 76, hy - 26, 50]} color="#3f6f8a" />
      {/* the painted ring on the trampled grass */}
      <Smudge points={[[rx - 50, ry - 50, 0.3], [rx + 50, ry - 50, 0.3], [rx + 50, ry + 50, 0.3], [rx - 50, ry + 50, 0.3]]} color="#5f8a5a" opacity={0.5} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const b = ((i + 0.6) / 16) * Math.PI * 2
        return <Face key={i} points={[[rx + Math.cos(a) * 34, ry + Math.sin(a) * 34, 0.5], [rx + Math.cos(b) * 34, ry + Math.sin(b) * 34, 0.5], [rx + Math.cos(b) * 30, ry + Math.sin(b) * 30, 0.5], [rx + Math.cos(a) * 30, ry + Math.sin(a) * 30, 0.5]]} fill="#ffffff" />
      })}
      {/* flower bed with periwinkles, a milk carton and four Jet stubs */}
      <Box at={[60, by - 30, 0]} size={[240, 30, 14]} color="#b9a48c" />
      {Array.from({ length: 10 }, (_, i) => (
        <Box key={i} at={[68 + i * 23, by - 26, 14]} size={[14, 22, 8]} color={i % 2 ? '#e88bb0' : iso.leaf} />
      ))}
      <Box at={[150, by - 22, 22]} size={[8, 8, 12]} color="#ffffff" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[166 + i * 5, by - 14, 22]} size={[2, 6, 2]} color="#f2c46d" />
      ))}
    </Stage>
  )
}

/** Hưng Toàn office at Tân Thuận port: jacket on the hook behind the door, the document cabinet, the gate log on the desk, the shift whiteboard, the workers' bike park through the glass. */
function PortOffice() {
  const FW = 520, FD = 500
  const [jy, jz] = wallLAt(P, 16, 46)
  const [cx, cy] = at(38, 58, 60)
  const [dx, dy] = at(54, 62, 74)
  const [bx, bz] = wallRAt(P, 70, 28)
  return (
    <Stage label="Văn phòng Hưng Toàn Logistics ở cảng Tân Thuận, nhìn như sa bàn" sky={['#c4c9e6', '#f2d8c8']}>
      <Slab w={FW} d={FD} floor="#cfc6bf" />
      <BackWalls w={FW} d={FD} h={200} left="#d9d6e6" right="#e2dfea" edge="#8d8fa8" t={9} />
      {/* the window onto the yard: containers and the workers' bikes */}
      <PanelR y0={0.5} x={300} z={0} w={210} h={150} fill="#cfe2ea" />
      {[[310, 60, '#e46b4f'], [370, 60, '#5d8ea3'], [430, 60, '#f2c46d'], [330, 100, '#7fae8a'], [400, 100, '#e46b4f']].map(([x, z, c], i) => (
        <PanelR key={i} y0={0.7} x={x as number} z={z as number} w={56} h={38} fill={c as string} />
      ))}
      <PanelR y0={0.8} x={300} z={0} w={210} h={30} fill="#b9b3ad" />
      <PanelR y0={0.9} x={460} z={4} w={40} h={20} fill="#c0392b" />
      <PanelR y0={1} x={462} z={2} w={8} h={8} fill={iso.ink} />
      <PanelR y0={1} x={490} z={2} w={8} h={8} fill={iso.ink} />
      <PanelR y0={1.1} x={403} z={0} w={4} h={150} fill="#9aa3b5" />
      {/* the door and the navy jacket on its hook */}
      <DoorL y={jy - 70} w={80} h={160} color="#7d8a9a" />
      <Box at={[2, jy - 40, jz + 20]} size={[14, 50, 70]} color="#2f4258" />
      <Box at={[2, jy - 48, jz + 50]} size={[12, 10, 30]} color="#2f4258" />
      <Box at={[14, jy - 50, jz + 32]} size={[3, 12, 3]} color="#f2f2ee" />
      {/* shift whiteboard */}
      <PanelR y0={0.6} x={bx - 70} z={bz - 30} w={130} h={66} fill="#ffffff" />
      <Label at={[bx - 64, 0.9, bz + 24]} plane="R" text="CA ĐÊM 14/3" size={7} />
      <Label at={[bx - 64, 0.9, bz + 12]} plane="R" text="Chốt hàng: a. Toàn" size={6} weight={500} color={iso.blue} />
      <Label at={[bx - 64, 0.9, bz + 1]} plane="R" text="Kho: Phúc, Sơn" size={6} weight={500} color={iso.blue} />
      <Label at={[bx - 64, 0.9, bz - 10]} plane="R" text="Cổng phụ mở suốt đêm" size={6} weight={500} color={iso.coral} />
      {/* document cabinet with the pried lock */}
      <Box at={[cx - 30, cy - 40, 0]} size={[50, 80, 120]} color="#9aa3b5" />
      {[30, 70, 100].map((z) => (
        <Face key={z} points={[[cx + 20.4, cy - 30, z], [cx + 20.4, cy + 30, z], [cx + 20.4, cy + 30, z + 2], [cx + 20.4, cy - 30, z + 2]]} fill="#7f889a" />
      ))}
      <Face points={[[cx + 20.6, cy - 4, 104], [cx + 20.6, cy + 4, 104], [cx + 20.6, cy + 4, 112], [cx + 20.6, cy - 4, 112]]} fill={iso.coral} />
      {/* the desk with the gate log copy */}
      <Desk at={[dx - 70, dy - 40, 0]} w={140} d={80} />
      <Book at={[dx - 20, dy - 14, 74]} color="#e8cf98" />
      <Cup at={[dx + 40, dy + 10, 74]} fill="#7b5236" />
      <Carton at={[dx - 60, dy - 30, 74]} size={[30, 24, 20]} color="#d9a86a" />
      <NoticeR x={60} z={70} w={50} h={60} title="NỘI QUY" />
      <Plant at={[480, 460, 0]} h={50} />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'ban-cong': Balcony,
  'phong-khach': LivingRoom,
  'san-duoi': Garden,
  'van-phong-cang': PortOffice,
}
