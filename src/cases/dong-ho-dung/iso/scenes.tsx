import { BackWalls, Box, Cyl, Face, IsoStage, Slab, Smudge, floorAt, iso, project, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Cup, Table } from '@/art/iso/props'
import { Bed, DoorR, Flat, Label, NoticeR, PanelL, PanelR } from '@/art/iso/props-ch9-12'

// Chapter 12 zones as dioramas: the hall and lim-wood staircase of Mr Hiển's
// old villa in Quận 3, his study upstairs, the front yard and gate on the
// alley, and Khoa's annex at the back. Objects sit under the hotspot
// percentages in case.json, which stay unchanged.

const P = { cx: 800, cy: 200, s: 1.6 }
const at = (px: number, py: number, z = 0) => floorAt(P, px, py, z)

function Stage({ label, children, sky, p = P }: { label: string; children: React.ReactNode; sky?: [string, string]; p?: typeof P }) {
  return (
    <IsoStage label={label} origin={[p.cx, p.cy]} scale={p.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

const LIM = '#7a3f2a'
const BRASS = '#d9b04f'

// The staircase: twelve steps running towards +y from the landing along the
// right wall (x 250..330), each 35 deep and 14 high.
const ST = { x0: 250, x1: 330, y0: 60, run: 35, rise: 14, n: 12 }
const TOP = ST.rise * ST.n

/** Screen point (1600 x 900) of the middle of step i's tread, counted from the top (0 = the landing edge). */
export const stepAt = (i: number) => {
  const [x, y] = project(P, (ST.x0 + ST.x1) / 2, ST.y0 + ST.run * (i + 0.5), TOP - ST.rise * (i + 1))
  return { x, y }
}

/** Hall: patterned tiles, the grandfather clock, the lim staircase with the loose brass stair rod on step 3, the chalk outline at its foot, the watch in its evidence bag. */
function Hall() {
  const FW = 480, FD = 520
  const [cy, cz] = wallLAt(P, 12, 38)
  const [ox, oy] = at(32, 80)
  return (
    <Stage label="Sảnh và cầu thang gỗ lim, nhìn như sa bàn" sky={['#d6c8e6', '#f6dcc8']}>
      <Slab w={FW} d={FD} floor="#e8d6c0" />
      {/* gạch bông: a coloured tile every other square */}
      {Array.from({ length: 12 }, (_, i) =>
        Array.from({ length: 13 }, (_, j) =>
          (i + j) % 2 ? null : <Flat key={`${i}-${j}`} at={[i * 40 + 6, j * 40 + 6, 0.3]} w={28} d={28} fill={(i + j) % 4 ? '#c98a6c' : '#7fae8a'} opacity={0.6} />,
        ),
      )}
      <BackWalls w={FW} d={FD} h={260} left="#efe2cc" right="#e8d8c0" edge="#a07c5a" t={9} />
      {/* wainscot */}
      <PanelL x0={0.6} y={0} z={0} w={FD} h={50} fill="#c9a27e" />
      <PanelR y0={0.6} x={0} z={0} w={FW} h={50} fill="#c9a27e" />
      {/* the grandfather clock */}
      <Box at={[0, cy - 22, 0]} size={[30, 44, 190]} color={LIM} />
      <Cyl at={[30, cy, cz]} r={15} len={1} axis="x" color="#f6efe3" cap="#fffaf0" />
      <Face points={[[31.5, cy - 1, cz], [31.5, cy + 1, cz], [31.5, cy + 1, cz + 11], [31.5, cy - 1, cz + 11]]} fill={iso.ink} />
      <Face points={[[31.5, cy, cz - 1], [31.5, cy - 8, cz - 1], [31.5, cy - 8, cz + 1], [31.5, cy, cz + 1]]} fill={iso.ink} />
      <Face points={[[30.4, cy - 10, 40], [30.4, cy + 10, 40], [30.4, cy + 10, 110], [30.4, cy - 10, 110]]} fill="#3d2a20" />
      <Cyl at={[30.6, cy, 56]} r={8} len={1} axis="x" color={BRASS} cap={BRASS} />
      {/* the landing along the right wall, with the slippers set neatly by the study door and two scuff lines */}
      <Box at={[150, 0, 0]} size={[FW - 150, ST.y0, TOP]} color="#d9c4a8" top="#b9875d" />
      <DoorR x={210} w={70} h={150} color={LIM} />
      <Box at={[218, 0, TOP]} size={[0, 0, 0]} color={LIM} />
      {[0, 1].map((i) => (
        <Flat key={i} at={[300 + i * 10, 10, TOP + 0.4]} w={3} d={48} fill="#5a4030" />
      ))}
      <Box at={[218, 12, TOP]} size={[12, 22, 3]} color="#3f6f8a" />
      <Box at={[234, 12, TOP]} size={[12, 22, 3]} color="#3f6f8a" />
      {/* banister along the landing */}
      <Box at={[150, ST.y0 - 4, TOP]} size={[ST.x0 - 150, 4, 50]} color={LIM} />
      <Box at={[ST.x1, ST.y0 - 4, TOP]} size={[FW - ST.x1, 4, 50]} color={LIM} />
      {/* the steps, carpeted in red, brass rods; step 3's rod hangs loose and the carpet slides */}
      {Array.from({ length: ST.n }, (_, i) => {
        const y = ST.y0 + ST.run * i
        const z = TOP - ST.rise * (i + 1)
        const loose = i === 2
        return (
          <g key={i}>
            <Box at={[ST.x0, y, 0]} size={[ST.x1 - ST.x0, ST.run, z]} color={LIM} />
            <Flat at={[ST.x0 + 14 + (loose ? 6 : 0), y + (loose ? 8 : 0), z + 0.4]} w={ST.x1 - ST.x0 - 28} d={ST.run} fill="#a8333a" />
            {loose ? (
              <Box at={[ST.x0 + 6, y + 22, z]} size={[ST.x1 - ST.x0 - 10, 3, 3]} color={BRASS} />
            ) : (
              <Box at={[ST.x0 + 12, y + 1, z]} size={[ST.x1 - ST.x0 - 24, 3, 3]} color={BRASS} />
            )}
          </g>
        )
      })}
      {/* banister down the open side */}
      {Array.from({ length: 7 }, (_, k) => {
        const i = k * 2
        const y = ST.y0 + ST.run * i
        const z = TOP - ST.rise * (i + 1)
        return <Box key={k} at={[ST.x0 - 6, y + 10, z]} size={[4, 4, 50]} color={tone(LIM, 0.1)} />
      })}
      <Face points={[[ST.x0 - 6, ST.y0, TOP + 50], [ST.x0 - 6, ST.y0 + ST.run * ST.n, 50], [ST.x0 - 6, ST.y0 + ST.run * ST.n, 56], [ST.x0 - 6, ST.y0, TOP + 56]]} fill={tone(LIM, -0.1)} />
      {/* chalk outline at the foot, the tiles wiped clean */}
      <Smudge points={[[ox - 60, oy - 50, 0.4], [ox + 40, oy - 50, 0.4], [ox + 40, oy + 50, 0.4], [ox - 60, oy + 50, 0.4]]} color="#ffffff" opacity={0.35} />
      {[
        [[ox - 50, oy - 6], [ox + 20, oy - 10]],
        [[ox + 20, oy - 10], [ox + 30, oy + 10]],
        [[ox + 30, oy + 10], [ox - 40, oy + 18]],
        [[ox - 40, oy + 18], [ox - 50, oy - 6]],
        [[ox - 50, oy - 6], [ox - 64, oy - 20]],
        [[ox + 30, oy + 10], [ox + 44, oy + 30]],
      ].map(([a, b], i) => (
        <Face key={i} points={[[a[0], a[1], 0.5], [b[0], b[1], 0.5], [b[0] + 2, b[1] + 2, 0.5], [a[0] + 2, a[1] + 2, 0.5]]} fill="#ffffff" />
      ))}
      {/* the watch in its evidence bag on a small stand by the stairs */}
      <Box at={[352, 344, 0]} size={[44, 44, 30]} color="#b9a48c" />
      <Box at={[356, 350, 30]} size={[36, 30, 1.5]} color="#e9eef2" />
      <Cyl at={[374, 364, 31.5]} r={9} len={2.5} axis="z" color={BRASS} cap="#f6efe3" />
      <Face points={[[372, 363, 34.2], [380, 360, 34.2], [380, 361, 34.2], [372, 364, 34.2]]} fill={iso.ink} />
    </Stage>
  )
}

/** Study upstairs: the window over the gate, the drafting table and armchair, the bed and pill box, the old desk phone, the porridge tray by the door. */
function Study() {
  const FW = 560, FD = 500
  const [wy, wz] = wallLAt(P, 16, 30)
  const [dx, dy] = at(47, 36, 70)
  const [hx, hy] = at(30, 62, 60)
  const [px, py] = at(64, 56, 60)
  const [kx, ky] = at(84, 74, 50)
  return (
    <Stage label="Phòng làm việc trên lầu của ông Hiển, nhìn như sa bàn" sky={['#cfc4e6', '#f6dcc8']}>
      <Slab w={FW} d={FD} floor="#c9a27e" />
      {Array.from({ length: 12 }, (_, i) => (
        <Face key={i} points={[[0, 40 + i * 40, 0.2], [FW, 40 + i * 40, 0.2], [FW, 41.5 + i * 40, 0.2], [0, 41.5 + i * 40, 0.2]]} fill="#b48f6c" />
      ))}
      <BackWalls w={FW} d={FD} h={220} left="#ece0cc" right="#e6d8c2" edge="#a07c5a" t={9} />
      {/* the window over the alley */}
      <PanelL x0={0.6} y={wy - 50} z={wz - 50} w={100} h={100} fill="#fffaf0" />
      <PanelL x0={0.8} y={wy - 44} z={wz - 44} w={88} h={88} fill="#bcd6e2" />
      <PanelL x0={1} y={wy - 2} z={wz - 44} w={4} h={88} fill="#fffaf0" />
      <PanelL x0={1} y={wy - 44} z={wz - 30} w={30} h={6} fill="#6c6787" />
      {/* bookshelf with model houses */}
      <Box at={[60, 0, 0]} size={[150, 40, 190]} color={LIM} />
      {[50, 100, 150].map((z) => (
        <g key={z}>
          <Box at={[64, 4, z]} size={[142, 36, 3]} color="#9a5a3a" />
          {[0, 1, 2, 3].map((i) => (
            <Box key={i} at={[70 + i * 34, 10, z + 3]} size={[22, 20, 18 + ((i + z) % 3) * 6]} color={['#f6efe3', '#e8cf98', '#cfe2ea', '#f2c46d'][i]} />
          ))}
        </g>
      ))}
      {/* the drafting table, tilted, the slipped pencil line; the armchair */}
      <Box at={[dx - 50, dy - 50, 0]} size={[6, 6, 70]} color={LIM} />
      <Box at={[dx + 40, dy - 50, 0]} size={[6, 6, 70]} color={LIM} />
      <Face points={[[dx - 56, dy - 50, 90], [dx + 50, dy - 50, 90], [dx + 50, dy + 10, 66], [dx - 56, dy + 10, 66]]} fill="#f6efe3" />
      <Face points={[[dx - 40, dy - 40, 86.5], [dx + 30, dy - 40, 86.5], [dx + 30, dy - 10, 74.5], [dx - 40, dy - 10, 74.5]]} fill="#d9dde5" />
      <Face points={[[dx + 10, dy - 44, 88.2], [dx + 12, dy - 44, 88.2], [dx - 20, dy + 8, 67.4], [dx - 22, dy + 8, 67.4]]} fill={iso.ink} />
      <Box at={[dx - 40, dy + 30, 0]} size={[70, 60, 34]} color="#7d4a37" />
      <Box at={[dx - 40, dy + 80, 34]} size={[70, 12, 50]} color="#7d4a37" />
      <Box at={[dx - 46, dy + 30, 0]} size={[8, 62, 56]} color="#6b3e2e" />
      <Box at={[dx + 30, dy + 30, 0]} size={[8, 62, 56]} color="#6b3e2e" />
      <Box at={[dx + 10, dy + 18, 0.3]} size={[22, 2, 2]} color={iso.gold} />
      {/* bed against the left wall, the nightstand with the pill box */}
      <Bed at={[0, hy + 40, 0]} w={180} d={130} cover="#cfc4e6" frame={LIM} />
      <Box at={[hx - 30, hy - 30, 0]} size={[60, 50, 56]} color={LIM} />
      <Box at={[hx - 24, hy - 20, 56]} size={[48, 22, 6]} color="#e9eef2" />
      {Array.from({ length: 7 }, (_, d) => (
        <Box key={d} at={[hx - 22 + d * 6.6, hy - 18, 62]} size={[5, 18, 1]} color={['#f2d9a0', '#bfdcd4', '#c9c0e0'][d % 3]} />
      ))}
      {/* side table with the old desk phone */}
      <Table at={[px - 40, py - 30, 0]} w={80} d={60} h={60} color={LIM} />
      <Box at={[px - 16, py - 12, 60]} size={[30, 24, 10]} color="#f6efe3" />
      <Box at={[px - 14, py - 10, 70]} size={[26, 6, 5]} color={iso.ink} />
      <Box at={[px + 2, py + 6, 70.2]} size={[8, 5, 0.6]} color="#ff5b4a" />
      {/* the door and the porridge tray on a little table beside it */}
      <DoorR x={460} w={70} h={160} color={LIM} />
      <Table at={[kx - 30, ky - 30, 0]} w={60} d={60} h={50} color="#a07c5a" />
      <Box at={[kx - 22, ky - 22, 50]} size={[44, 34, 2]} color="#e9eef2" />
      <Cyl at={[kx - 6, ky - 6, 52]} r={9} len={7} axis="z" color="#f6efe3" cap="#efe0c8" />
      <Box at={[kx - 18, ky + 6, 59]} size={[30, 3, 2]} color="#9aa3b5" />
    </Stage>
  )
}

/** Front yard: the iron gate in the high wall onto the alley, the camera on the pole opposite, the business card in the gate, the old plumeria with prints in its fallen flowers, the café's board. */
const PY = { cx: 800, cy: 420, s: 1.4 }
function Yard() {
  const FW = 480, FD = 420
  return (
    <Stage label="Sân trước và cổng hẻm, nhìn như sa bàn" sky={['#cdc4e6', '#f6dcc8']} p={PY}>
      <Slab w={FW} d={FD} floor="#c98a5c" side="#a9734f" />
      {Array.from({ length: 10 }, (_, i) => (
        <Face key={i} points={[[0, 40 + i * 40, 0.2], [FW, 40 + i * 40, 0.2], [FW, 42 + i * 40, 0.2], [0, 42 + i * 40, 0.2]]} fill="#b8794e" />
      ))}
      {/* the alley pole with the neighbourhood camera, seen over the wall */}
      <Box at={[60, -60, 0]} size={[10, 10, 300]} color="#9aa3b5" />
      <Box at={[52, -50, 260]} size={[18, 30, 14]} color="#e9eef2" />
      <Box at={[58, -20, 262]} size={[8, 3, 8]} color={iso.ink} />
      <BackWalls w={FW} d={FD} h={190} left="#e2d4bc" right="#e8dac4" edge="#9a8a78" t={10} />
      {/* broken glass on the wall top */}
      {Array.from({ length: 24 }, (_, i) => (
        <Box key={i} at={[i * 20, -6, 190]} size={[4, 2, 6 + (i % 3) * 3]} color="#9fd3a6" />
      ))}
      {/* the iron gate, a card in its slit */}
      <PanelR y0={0.5} x={20} z={0} w={140} h={170} fill="#3d3446" />
      {Array.from({ length: 13 }, (_, i) => (
        <PanelR key={i} y0={0.8} x={26 + i * 10.5} z={6} w={4} h={158} fill="#6c6787" />
      ))}
      <PanelR y0={1} x={20} z={84} w={140} h={4} fill="#6c6787" />
      <PanelR y0={1.2} x={142} z={56} w={16} h={10} fill="#fffaf0" />
      {/* the old plumeria tree, fallen flowers and shoe prints along the left wall */}
      <Cyl at={[50, 330, 0]} r={14} len={180} axis="z" color="#8a7466" />
      <Box at={[56, 316, 120]} size={[60, 10, 10]} color="#8a7466" />
      <Box at={[10, 270, 180]} size={[120, 130, 50]} color={iso.leaf} />
      <Box at={[30, 290, 230]} size={[80, 90, 30]} color={tone(iso.leaf, 0.12)} />
      {Array.from({ length: 22 }, (_, i) => (
        <Flat key={i} at={[10 + ((i * 37) % 140), 220 + ((i * 53) % 190), 0.4]} w={6} d={6} fill="#ffffff" />
      ))}
      {[0, 1, 2].map((i) => (
        <Flat key={i} at={[8, 260 + i * 34, 0.5]} w={10} d={20} fill="#5a4030" opacity={0.7} />
      ))}
      {/* the café's stacked tables and chairs, its board in the corner */}
      {[0, 1, 2].map((i) => (
        <Box key={i} at={[230, 30, i * 24]} size={[60, 60, 6]} color="#9a6b4a" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[300, 30 + i * 4, i * 18]} size={[34, 34, 4]} color={iso.coral} />
      ))}
      <Face points={[[420, 8, 0], [470, 8, 0], [466, 2, 150], [424, 2, 150]]} fill="#a07c5a" />
      <Face points={[[426, 8.6, 70], [464, 8.6, 70], [462, 6, 130], [428, 6, 130]]} fill="#fffaf0" />
      <Label at={[430, 8.8, 110]} plane="R" text="MÁI NGÓI" size={7} />
      <Label at={[430, 8.8, 98]} plane="R" text="tạm đóng cửa" size={5} weight={500} color={iso.coral} />
    </Stage>
  )
}

/** Khoa's annex: the table with the letters and the toolbox underneath, the calendar, the suit on the back of the door. */
function Annex() {
  const FW = 480, FD = 500
  const [cx, cz] = wallRAt(P, 64, 30)
  const [vx] = wallRAt(P, 86, 46)
  return (
    <Stage label="Nhà phụ của Khoa, nhìn như sa bàn" sky={['#cdc4e6', '#f2d8c8']}>
      <Slab w={FW} d={FD} floor="#d8c8b2" />
      {Array.from({ length: 6 }, (_, i) => (
        <Face key={i} points={[[i * 80, 0, 0.2], [i * 80 + 1.5, 0, 0.2], [i * 80 + 1.5, FD, 0.2], [i * 80, FD, 0.2]]} fill="#c9b8a2" />
      ))}
      <BackWalls w={FW} d={FD} h={200} left="#e2d8c8" right="#ebe1d2" edge="#9a8a78" t={9} />
      {/* the shut-down coffee machine and boxes along the left wall */}
      <Box at={[10, 60, 0]} size={[60, 90, 80]} color="#9aa3b5" />
      <Box at={[20, 70, 80]} size={[40, 50, 40]} color="#55506b" />
      <Box at={[10, 170, 0]} size={[50, 60, 40]} color="#d9a86a" />
      <Box at={[14, 176, 40]} size={[40, 50, 30]} color="#e3b77c" />
      {/* the calendar */}
      <PanelR y0={0.6} x={cx - 26} z={cz + 10} w={52} h={60} fill="#fffaf0" />
      <PanelR y0={0.8} x={cx - 26} z={cz + 58} w={52} h={12} fill={iso.coral} />
      <Label at={[cx - 22, 1, cz + 61]} plane="R" text="THÁNG 4" size={6} color="#ffffff" />
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => <PanelR key={`${r}${c}`} y0={0.9} x={cx - 24 + c * 7} z={cz + 46 - r * 9} w={5} h={6} fill={(r === 0 && c === 5) || (r === 1 && c === 5) ? '#f2a39a' : '#ece4d6'} />),
      )}
      {/* the door with the suit and its wedding card */}
      <DoorR x={vx - 30} w={70} h={160} color="#8a6a52" />
      <Box at={[vx - 26, 0, 60]} size={[50, 12, 86]} color="#2f2a2a" />
      <Box at={[vx - 4, 12, 132]} size={[6, 1, 12]} color="#fffaf0" />
      <Box at={[vx + 10, 12.2, 100]} size={[12, 1, 16]} color="#f2a39a" />
      {/* the table with the stack of overdue letters, the tin toolbox under it */}
      <Table at={[150, 300, 0]} w={190} d={90} h={74} color="#a07c5a" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[284 + i * 2, 316 + i * 3, 74 + i * 1.5]} size={[34, 24, 1.5]} color={i === 3 ? '#fffaf0' : '#f6efe3'} />
      ))}
      <Box at={[300, 326, 80.2]} size={[16, 6, 0.3]} color={iso.coral} />
      <Book at={[180, 320, 74]} color="#3f6f8a" />
      <Cup at={[240, 360, 74]} fill="#7b5236" />
      <Box at={[170, 340, 0]} size={[50, 30, 26]} color="#9aa3b5" />
      <Box at={[168, 338, 26]} size={[54, 34, 4]} color="#7f889a" />
      <Box at={[190, 350, 30]} size={[10, 12, 3]} color={BRASS} />
      <NoticeR x={60} z={90} w={40} h={50} title="QUÁ HẠN" ink={iso.coral} />
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'cau-thang': Hall,
  'phong-lam-viec': Study,
  'san-cong': Yard,
  'nha-phu': Annex,
}
