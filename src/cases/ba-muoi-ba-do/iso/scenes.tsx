import { BackWalls, Box, Cyl, Face, IsoStage, Slab, Smudge, floorAt, iso, tone, wallLAt, wallRAt, type V3 } from '@/art/iso/iso'
import { Cup, Table } from '@/art/iso/props'
import { Carton, Label, Lockers, NoticeR, PanelL, PanelR, ScreenR } from '@/art/iso/props-ch9-12'

// Chapter 10 zones as dioramas: cold room 3 and the night-shift rest room at
// Tân Sơn Cargo, the apron, and the Hưng Thịnh waste yard in Bình Chánh.
// Objects sit under the hotspot percentages in case.json, which stay unchanged.

const P = { cx: 800, cy: 200, s: 1.6 }
const at = (px: number, py: number, z = 0) => floorAt(P, px, py, z)

function Stage({ label, children, sky, overlay }: { label: string; children: React.ReactNode; sky?: [string, string]; overlay?: React.ReactNode }) {
  return (
    <IsoStage label={label} origin={[P.cx, P.cy]} scale={P.s} sky={sky} overlay={overlay}>
      {children}
    </IsoStage>
  )
}

export const tapeDE = '#3f6aa8'
export const tapeVN = '#4f9e5c'
const carton = '#e6d3b3'

/** A medicine carton with blue German tape round it; `vn` = cut and resealed with green local tape. */
export function DrugCarton({ at: p, size = [40, 40, 30], vn = false, n }: { at: V3; size?: V3; vn?: boolean; n?: string }) {
  const [x, y, z] = p
  const [w, d, h] = size
  const tape = vn ? tapeVN : tapeDE
  return (
    <g>
      <Box at={p} size={size} color={carton} />
      <Face points={[[x, y + d / 2 - 3, z + h + 0.2], [x + w, y + d / 2 - 3, z + h + 0.2], [x + w, y + d / 2 + 3, z + h + 0.2], [x, y + d / 2 + 3, z + h + 0.2]]} fill={tape} />
      <Face points={[[x + w + 0.2, y + d / 2 - 3, z], [x + w + 0.2, y + d / 2 + 3, z], [x + w + 0.2, y + d / 2 + 3, z + h], [x + w + 0.2, y + d / 2 - 3, z + h]]} fill={tone(tape, -0.2)} />
      {n && <Label at={[x + 4, y + d + 0.3, z + h - 8]} plane="R" text={n} size={6} />}
    </g>
  )
}

/** A data logger lying on top of a carton, its little screen showing a red alarm or a green tick. */
export function LoggerTop({ at: p, alarm = false }: { at: V3; alarm?: boolean }) {
  const [x, y, z] = p
  return (
    <g>
      <Box at={p} size={[14, 22, 4]} color={iso.ink} />
      <Face points={[[x + 3, y + 4, z + 4.2], [x + 11, y + 4, z + 4.2], [x + 11, y + 14, z + 4.2], [x + 3, y + 14, z + 4.2]]} fill={alarm ? '#ff5b4a' : '#7fe0c6'} />
    </g>
  )
}

/** Cold room 3: the quarantined Minh Tâm pallet in the middle, the wall sensor, the shelf of other firms' goods. */
function ColdRoom() {
  const FW = 440, FD = 500
  const [sy, sz] = wallLAt(P, 16, 30)
  const [kx, kz] = wallRAt(P, 84, 50)
  const px = 170, py = 170
  return (
    <Stage label="Phòng lạnh số 3, nhìn như sa bàn" sky={['#c4d3ea', '#e6eef6']}>
      <Slab w={FW} d={FD} floor="#cfdbe4" side="#b9c8d4" />
      {[110, 220, 330].map((v) => (
        <Face key={v} points={[[0, v, 0.2], [FW, v, 0.2], [FW, v + 2, 0.2], [0, v + 2, 0.2]]} fill="#bccbd6" />
      ))}
      <BackWalls w={FW} d={FD} h={200} left="#dfe8f0" right="#e8eff5" edge="#8fa6bb" t={9} />
      {/* insulated panel seams */}
      {[80, 160, 240, 320, 400].map((y) => (
        <PanelL key={y} x0={0.6} y={y} z={0} w={2} h={200} fill="#c9d6e2" />
      ))}
      {/* evaporator unit blowing cold air */}
      <Box at={[120, 0, 160]} size={[140, 34, 30]} color="#cfd8e2" />
      {[0, 1, 2, 3].map((i) => (
        <Cyl key={i} at={[140 + i * 32, 34, 175]} r={10} len={1} axis="y" color="#9aa3b5" cap="#7f889a" />
      ))}
      {/* the wall sensor */}
      <PanelL x0={0.8} y={sy - 40} z={sz - 22} w={70} h={44} fill={iso.ink} />
      <PanelL x0={1} y={sy - 36} z={sz - 18} w={62} h={36} fill="#1f2a3a" />
      <Label at={[1.2, sy + 26, sz + 8]} plane="L" text="PHÒNG 3 · 72h" size={6} color="#7fe0c6" mono />
      <Label at={[1.2, sy + 26, sz - 4]} plane="L" text="3,9° – 5,6°" size={9} color="#7fe0c6" mono />
      {/* the shelf of other companies' goods, a sticky note on its edge */}
      <Box at={[kx - 70, 4, 0]} size={[140, 60, 6]} color="#9aa3b5" />
      {[0, 55, 110].map((z) => (
        <g key={z}>
          <Box at={[kx - 70, 4, z + 6]} size={[140, 60, 4]} color="#b9c2d0" />
          {[0, 1, 2].map((i) => (
            <Box key={i} at={[kx - 64 + i * 46, 10, z + 10]} size={[36, 44, 30]} color={['#ffffff', '#cfe6f2', '#f6e3c6'][(i + z / 55) % 3]} />
          ))}
        </g>
      ))}
      {[kx - 70, kx + 66].map((x) => (
        <Box key={x} at={[x, 60, 0]} size={[4, 4, 170]} color="#7f889a" />
      ))}
      <Box at={[kx - 10, 64.2, kz]} size={[16, 0.6, 16]} color="#ffe27a" />
      {/* the Minh Tâm pallet: three layers of cartons in shrink wrap, the opened top carton with TL-A */}
      <Box at={[px, py, 0]} size={[130, 130, 12]} color={iso.wood} />
      {[0, 1, 2].map((l) =>
        [0, 1, 2].flatMap((i) =>
          [0, 1, 2].map((j) => <DrugCarton key={`${l}${i}${j}`} at={[px + 4 + i * 41, py + 4 + j * 41, 12 + l * 40]} size={[40, 40, 40]} n={l === 1 && i === 2 && j === 0 ? '17' : undefined} />),
        ),
      )}
      <DrugCarton at={[px + 44, py + 44, 132]} size={[40, 40, 26]} vn />
      <LoggerTop at={[px + 56, py + 52, 158]} alarm />
      {/* shrink wrap shine */}
      <Face points={[[px + 2, py + 134, 14], [px + 134, py + 134, 14], [px + 134, py + 134, 130], [px + 2, py + 134, 130]]} fill="#ffffff" opacity={0.18} />
      {/* yellow quarantine tag */}
      <Face points={[[px + 10, py + 134.5, 50], [px + 52, py + 134.5, 50], [px + 52, py + 134.5, 90], [px + 10, py + 134.5, 90]]} fill="#f2c94c" />
      <Label at={[px + 14, py + 134.8, 80]} plane="R" text="CÁCH LY" size={7} />
      <Label at={[px + 14, py + 134.8, 70]} plane="R" text="chờ hủy 28/11" size={5} weight={500} />
      {/* cold mist on the floor */}
      <Smudge points={[[40, 340, 1], [400, 340, 1], [420, 480, 1], [30, 490, 1]]} color="#ffffff" opacity={0.5} />
    </Stage>
  )
}

/** Night-shift rest room: shift board, thermometer, TV with the football fixtures, the plastic table, the staff lockers. */
function RestRoom() {
  const FW = 440, FD = 500
  const [by, bz] = wallLAt(P, 18, 40)
  const [lx] = wallRAt(P, 82, 42)
  const [tx, ty] = at(40, 74, 60)
  return (
    <Stage label="Phòng nghỉ ca đêm, nhìn như sa bàn" sky={['#cdc4ea', '#f6d9c8']}>
      <Slab w={FW} d={FD} floor="#d6cfc4" />
      {[100, 200, 300, 400].map((v) => (
        <Face key={v} points={[[v, 0, 0.2], [v + 1.5, 0, 0.2], [v + 1.5, FD, 0.2], [v, FD, 0.2]]} fill="#c9c1b5" />
      ))}
      <BackWalls w={FW} d={FD} h={200} left="#e4dccf" right="#ece4d8" edge="#a99bc0" t={9} />
      {/* thermometer near the corner, the air conditioner above */}
      <PanelL x0={0.8} y={40} z={50} w={34} h={44} fill="#fffaf0" />
      <Label at={[1.1, 72, 74]} plane="L" text="MAX 24,5°" size={5.5} color={iso.coral} mono />
      <Label at={[1.1, 72, 62]} plane="L" text="MIN 22,0°" size={5.5} color={iso.blue} mono />
      <Box at={[0, 100, 150]} size={[24, 110, 34]} color="#f6f1ea" />
      <PanelL x0={24.4} y={110} z={152} w={90} h={4} fill="#cfd8e2" />
      {/* shift board */}
      <PanelL x0={0.6} y={by - 50} z={bz - 40} w={100} h={80} fill="#ffffff" />
      <Label at={[0.9, by + 46, bz + 28]} plane="L" text="CA 10–16/11" size={7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <PanelL key={i} x0={0.8} y={by - 44} z={bz + 10 - i * 11} w={88} h={1.4} fill="#cdbb9c" />
      ))}
      <PanelL x0={0.9} y={by - 6} z={bz - 30} w={46} h={9} fill="#ffe27a" />
      <Label at={[1.1, by + 38, bz - 27]} plane="L" text="15/11 đêm: TÙNG" size={5} />
      {/* TV on a low cabinet, the fixtures sheet beside it */}
      <Box at={[40, 8, 0]} size={[90, 40, 40]} color="#a07c5a" />
      <ScreenR at={[48, 22, 40]} w={74} h={46} bg="#2f4a6a" lines={['⚽ 2 - 1']} size={8} fg="#ffffff" />
      <NoticeR x={140} z={60} w={36} h={50} title="NGOẠI HẠNG" />
      <PanelR y0={1} x={146} z={80} w={8} h={4} fill={iso.coral} />
      {/* staff lockers; Tùng's stands open with the cold-room jacket */}
      <Lockers at={[lx - 100, 0, 0]} n={4} w={44} h={160} names={['LỘC', 'LINH', 'TÙNG', 'AN']} />
      <Face points={[[lx - 12 + 0.4, 44.4, 6], [lx + 30, 44.4, 6], [lx + 30, 44.4, 154], [lx - 12 + 0.4, 44.4, 154]]} fill="#2f2a3f" />
      <Face points={[[lx - 12, 44.4, 6], [lx - 30, 80, 6], [lx - 30, 80, 154], [lx - 12, 44.4, 154]]} fill="#8fa4b8" />
      <Box at={[lx - 8, 26, 50]} size={[36, 18, 80]} color="#2e5f8a" />
      <Box at={[lx + 6, 43, 60]} size={[8, 2, 60]} color="#9aa3b5" />
      {/* the plastic table: coffee, rice box, a roll of green tape */}
      <Table at={[tx - 55, ty - 45, 0]} w={110} d={90} h={60} color="#7e9cb5" />
      <Cup at={[tx - 30, ty - 20, 60]} fill="#7b5236" />
      <Box at={[tx - 10, ty - 30, 60]} size={[30, 22, 10]} color="#fffaf0" />
      <Cyl at={[tx + 22, ty + 10, 60]} r={10} len={8} axis="z" color={tapeVN} cap="#9fd3a6" core="#e6d3b3" />
      {[0, 1].map((i) => (
        <Cyl key={i} at={[tx - 70 + i * 140, ty + 60, 0]} r={16} len={40} axis="z" color={iso.coral} />
      ))}
    </Stage>
  )
}

/** The apron: tug 12 with its tablet, the empty cold-chain shelter, the weather board, a trailer of dry pallets in the sun. */
function Apron() {
  const FW = 470, FD = 500
  const [mx, my] = at(70, 62.8, 0)
  const [rx, ry] = at(52, 70, 0)
  return (
    <Stage label="Sân đỗ và khu chờ hàng lạnh, nhìn như sa bàn" sky={['#f6c08f', '#fbe3c8']}>
      <Slab w={FW} d={FD} floor="#b9b3ad" side="#9a948e" />
      {/* taxi lines and the yellow stand marks */}
      <Face points={[[0, 200, 0.2], [FW, 200, 0.2], [FW, 206, 0.2], [0, 206, 0.2]]} fill="#f2c94c" />
      <Face points={[[180, 0, 0.2], [186, 0, 0.2], [186, FD, 0.2], [180, FD, 0.2]]} fill="#f2c94c" />
      {/* a freighter's wing and engine reaching in from the back */}
      <Face points={[[0, 40, 90], [150, 0, 90], [190, 0, 90], [40, 90, 90]]} fill="#e9e6e2" />
      <Cyl at={[40, 50, 70]} r={20} len={60} axis="x" color="#d9d5d0" cap="#4b4760" />
      {/* the shelter for cold goods: green-striped floor, a roof on four posts, empty */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Face key={i} points={[[mx - 60 + i * 24, my - 80, 0.3], [mx - 50 + i * 24, my - 80, 0.3], [mx - 50 + i * 24, my + 50, 0.3], [mx - 60 + i * 24, my + 50, 0.3]]} fill={iso.leaf} />
      ))}
      {[[-70, -90], [80, -90], [-70, 60], [80, 60]].map(([dx, dy]) => (
        <Box key={`${dx}${dy}`} at={[mx + dx, my + dy, 0]} size={[6, 6, 100]} color="#9aa3b5" />
      ))}
      <Box at={[mx - 76, my - 96, 100]} size={[164, 164, 8]} color="#e9eef2" />
      <Label at={[mx - 70, my + 68.4, 104]} plane="R" text="HÀNG LẠNH · TỐI ĐA 30 PHÚT" size={7} />
      {/* weather board on a pole in the far right corner */}
      <Box at={[FW - 12, 6, 0]} size={[6, 6, 190]} color="#7f889a" />
      <Box at={[FW - 60, 0, 170]} size={[60, 6, 50]} color={iso.ink} />
      <Label at={[FW - 56, 6.3, 210]} plane="R" text="15/11" size={6} color="#ffffff" mono />
      <Label at={[FW - 56, 6.3, 199]} plane="R" text="13:00 34°" size={6} color="#ffb48a" mono />
      <Label at={[FW - 56, 6.3, 188]} plane="R" text="23:00 26°" size={6} color="#ffffff" mono />
      <Label at={[FW - 56, 6.3, 177]} plane="R" text="02:00 25°" size={6} color="#ffffff" mono />
      {/* the tug with its tablet */}
      <Box at={[40, 280, 0]} size={[90, 60, 40]} color="#f2c94c" />
      <Box at={[90, 280, 40]} size={[40, 60, 40]} color="#e0b23a" />
      <Box at={[60, 288, 40]} size={[24, 40, 16]} color={iso.ink} />
      <Box at={[80, 300, 56]} size={[4, 20, 14]} color={iso.ink} />
      <Face points={[[84.3, 302, 58], [84.3, 318, 58], [84.3, 318, 68], [84.3, 302, 68]]} fill="#7fe0c6" />
      {[[48, 336], [112, 336]].map(([x, y]) => (
        <Cyl key={x} at={[x, y, 12]} r={12} len={6} axis="y" color={iso.ink} cap="#4b4760" />
      ))}
      <Label at={[44, 340.4, 26]} plane="R" text="XE KÉO 12" size={7} />
      {/* the trailer with dry pallets, hot under the sun */}
      <Box at={[rx - 90, ry - 50, 0]} size={[190, 110, 24]} color="#9aa3b5" />
      <Face points={[[rx - 90, ry - 50, 24.2], [rx + 100, ry - 50, 24.2], [rx + 100, ry + 60, 24.2], [rx - 90, ry + 60, 24.2]]} fill="#d9a07a" opacity={0.5} />
      <Carton at={[rx - 80, ry - 40, 24]} size={[70, 80, 46]} color="#c9b08c" />
      <Carton at={[rx + 10, ry - 40, 24]} size={[70, 80, 36]} color="#d9a86a" />
      {/* traffic cones */}
      {[[300, 440], [380, 460]].map(([x, y]) => (
        <g key={x}>
          <Box at={[x - 8, y - 8, 0]} size={[16, 16, 3]} color={iso.coral} />
          <Box at={[x - 4, y - 4, 3]} size={[8, 8, 20]} color={iso.coral} />
          <Box at={[x - 4.4, y - 4.4, 10]} size={[8.8, 8.8, 4]} color="#ffffff" />
        </g>
      ))}
    </Stage>
  )
}

/** Hưng Thịnh waste yard: the shed wall with the price board, the rented cold truck, the cold incinerator under maintenance, oil drums. */
function WasteYard() {
  const FW = 480, FD = 500
  const [gy, gz] = wallLAt(P, 12, 30)
  const [tx, ty] = at(30, 58, 0)
  const [fx] = wallRAt(P, 70, 43)
  return (
    <Stage label="Bãi xe Hưng Thịnh ở Bình Chánh, nhìn như sa bàn" sky={['#c9c1d6', '#ecd8c8']}>
      <Slab w={FW} d={FD} floor="#c7b8a3" side="#a9997f" />
      <Smudge points={[[150, 180, 0.3], [380, 200, 0.3], [360, 380, 0.3], [140, 360, 0.3]]} color="#6b5d4c" opacity={0.25} />
      <BackWalls w={FW} d={FD} h={210} left="#b8bccb" right="#c6c2b8" edge="#8d8fa8" t={9} />
      {Array.from({ length: 24 }, (_, i) => (
        <PanelL key={i} x0={0.5} y={12 + i * 20} z={0} w={8} h={210} fill="#a9aec0" />
      ))}
      {/* the price board, a stack of blank certificates below */}
      <PanelL x0={0.8} y={gy - 60} z={gz - 30} w={110} h={56} fill="#ffffff" />
      <Label at={[1.1, gy + 46, gz + 14]} plane="L" text="BẢNG GIÁ DỊCH VỤ" size={7} />
      <Label at={[1.1, gy + 46, gz + 2]} plane="L" text="Hủy dược phẩm 18.000đ/kg" size={5.5} weight={500} />
      <Label at={[1.1, gy + 46, gz - 10]} plane="L" text="Cấp biên bản trong ngày" size={5.5} weight={500} color={iso.coral} />
      <Box at={[2, gy - 40, 0]} size={[40, 70, 60]} color="#a07c5a" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[8, gy - 30 + i * 2, 60 + i * 2]} size={[28, 44, 2]} color="#fffaf0" />
      ))}
      {/* the incinerator against the right wall, cold, with its maintenance sign; chimney through the roof */}
      <Box at={[fx - 70, 0, 0]} size={[130, 90, 140]} color="#6c6787" />
      <Box at={[fx - 30, 0, 140]} size={[30, 30, 70]} color="#55506b" />
      <Face points={[[fx - 40, 90.4, 20], [fx + 20, 90.4, 20], [fx + 20, 90.4, 90], [fx - 40, 90.4, 90]]} fill="#3d3446" />
      <Face points={[[fx - 50, 90.8, 94], [fx + 34, 90.8, 94], [fx + 34, 90.8, 124], [fx - 50, 90.8, 124]]} fill="#f2c94c" />
      <Label at={[fx - 46, 91.1, 114]} plane="R" text="LÒ SỐ 1 · BẢO TRÌ" size={6.5} />
      <Label at={[fx - 46, 91.1, 102]} plane="R" text="10/11 – 10/12" size={6} weight={500} />
      {/* oil drums */}
      {[[420, 30], [452, 50], [420, 74], [452, 96]].map(([x, y], i) => (
        <Cyl key={i} at={[x, y, 0]} r={16} len={44} axis="z" color={i % 2 ? '#3f6aa8' : '#2f4a6a'} cap="#7f889a" />
      ))}
      {/* the rented cold truck: cab and refrigerated box, its unit set to 4 degrees */}
      <Box at={[tx - 70, ty - 40, 14]} size={[170, 80, 100]} color="#f3f1ee" />
      <Box at={[tx + 100, ty - 36, 14]} size={[56, 72, 70]} color={iso.blue} />
      <Box at={[tx + 140, ty - 30, 60]} size={[16, 60, 22]} color="#cfe6f2" />
      <Box at={[tx - 70, ty - 30, 114]} size={[40, 60, 18]} color="#cfd8e2" />
      <Face points={[[tx - 60, ty + 40.4, 70], [tx + 60, ty + 40.4, 70], [tx + 60, ty + 40.4, 100], [tx - 60, ty + 40.4, 100]]} fill={iso.blue} />
      <Label at={[tx - 54, ty + 40.7, 80]} plane="R" text="LẠNH VIỆT · CHO THUÊ" size={9} color="#ffffff" />
      <Box at={[tx - 50, ty + 40, 30]} size={[30, 3, 18]} color={iso.ink} />
      <Label at={[tx - 46, ty + 43.2, 36]} plane="R" text="+4°C" size={8} color="#7fe0c6" mono />
      {[tx - 50, tx + 40, tx + 120].map((x) => (
        <Cyl key={x} at={[x, ty + 34, 14]} r={14} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      ))}
    </Stage>
  )
}

export const isoSceneArt: Record<string, () => JSX.Element> = {
  'phong-lanh': ColdRoom,
  'phong-nghi': RestRoom,
  'san-do': Apron,
  'hung-thinh': WasteYard,
}
