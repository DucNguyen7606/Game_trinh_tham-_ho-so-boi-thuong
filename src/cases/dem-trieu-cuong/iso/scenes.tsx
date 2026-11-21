import type { ReactNode } from 'react'
import { BackWalls, Box, Face, IsoStage, Slab, Smudge, WallText, floorAt, iso, tone, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Cup, Table } from '@/art/iso/props'
import { Boat, Building, Water } from '@/art/iso/street'

// Chapter 6 zones as dioramas. Each zone sets its own projection (where the
// floor's back corner sits on screen) so the walls and floor fall under the
// hotspot percentages in case.json, which stay unchanged.

type Proj = { cx: number; cy: number; s: number }
const PROJ: Record<string, Proj> = {
  kho: { cx: 800, cy: 200, s: 1.6 },
  'cua-so': { cx: 800, cy: 200, s: 1.6 },
  ben: { cx: 800, cy: 200, s: 1.6 },
  'van-phong': { cx: 800, cy: 400, s: 1.6 },
}

/** World point on the floor (height z) under a screen point in percent, for one zone. */
export const at = (zone: string, px: number, py: number, z = 0) => floorAt(PROJ[zone], px, py, z)

/** Extra pieces a reconstruction panel adds to a zone (people, a boat that night). */
export interface SceneProps {
  extra?: ReactNode
  /** Draw the zone as it was on the night, before the water went down. */
  flooded?: boolean
}

const mud = '#9a7a55'
const brick = '#d7c3a8'
/** 1 m in world units: a block person (about 1.65 m) is 105 units tall. */
const M = 64
const WATER = 0.9 * M

function Stage({ zone, label, children, sky = ['#c4c2e2', '#efd6c6'] }: { zone: string; label: string; children: ReactNode; sky?: [string, string] }) {
  const p = PROJ[zone]
  return (
    <IsoStage label={label} origin={[p.cx, p.cy]} scale={p.s} sky={sky}>
      {children}
    </IsoStage>
  )
}

/** A carton of phones. Soaked ones sag and darken. */
function Carton({ at: [x, y, z], wet = false }: { at: [number, number, number]; wet?: boolean }) {
  const c = wet ? '#9c7d5c' : '#d9a86a'
  return (
    <g>
      <Box at={[x, y, z]} size={[36, 30, wet ? 22 : 26]} color={c} />
      <Box at={[x + 2, y + 13, z + (wet ? 22 : 26)]} size={[32, 4, 0.6]} color={wet ? '#7a6248' : '#c98f52'} />
      {wet && <Face points={[[x, y + 30.4, z], [x + 36, y + 30.4, z], [x + 36, y + 30.4, z + 14], [x, y + 30.4, z + 14]]} fill={mud} opacity={0.6} />}
    </g>
  )
}

/** Five-tier steel rack along x, facing +y. The bottom two tiers hold soaked cartons, the top three are empty but for dust. */
function Rack5({ at: [x, y, z], len = 220 }: { at: [number, number, number]; len?: number }) {
  const step = 44
  const post = tone(iso.metal, -0.1)
  const out: JSX.Element[] = []
  out.push(<Box key="p1" at={[x, y, z]} size={[6, 6, step * 5 + 10]} color={post} />)
  out.push(<Box key="p2" at={[x + len - 6, y, z]} size={[6, 6, step * 5 + 10]} color={post} />)
  for (let l = 0; l < 5; l++) {
    const zz = z + 6 + l * step
    out.push(<Box key={`s${l}`} at={[x, y, zz]} size={[len, 40, 4]} color={iso.metal} top={l >= 2 ? '#c7c2b8' : undefined} />)
    const slots = Math.floor((len - 12) / 42)
    for (let i = 0; i < slots; i++) {
      if (l < 2) out.push(<Carton key={`c${l}${i}`} at={[x + 8 + i * 42, y + 6, zz + 4]} wet />)
      // dust-free rectangles where cartons were lifted off
      else out.push(<Face key={`d${l}${i}`} points={[[x + 8 + i * 42, y + 6, zz + 4.4], [x + 44 + i * 42, y + 6, zz + 4.4], [x + 44 + i * 42, y + 36, zz + 4.4], [x + 8 + i * 42, y + 36, zz + 4.4]]} fill={iso.metal} />)
    }
  }
  out.push(<Box key="p3" at={[x, y + 34, z]} size={[6, 6, step * 5 + 10]} color={post} />)
  out.push(<Box key="p4" at={[x + len - 6, y + 34, z]} size={[6, 6, step * 5 + 10]} color={post} />)
  return <g>{out}</g>
}

/** A row of sandbags along x. */
function Sandbags({ at: [x, y, z], n, layers = 3 }: { at: [number, number, number]; n: number; layers?: number }) {
  const out: JSX.Element[] = []
  for (let l = 0; l < layers; l++)
    for (let i = 0; i < n - l; i++)
      out.push(<Box key={`${l}-${i}`} at={[x + i * 30 + l * 15, y + (l % 2) * 4, z + l * 14]} size={[28, 22, 14]} color={l % 2 ? '#c9b48f' : '#bfa97f'} />)
  return <g>{out}</g>
}

/** Mud tide line along both back walls at the height the water reached. */
function TideLine({ w, d, h = WATER }: { w: number; d: number; h?: number }) {
  return (
    <g>
      <Face points={[[0.5, 0, 0], [0.5, d, 0], [0.5, d, h], [0.5, 0, h]]} fill={mud} opacity={0.4} />
      <Face points={[[0, 0.5, 0], [w, 0.5, 0], [w, 0.5, h], [0, 0.5, h]]} fill={mud} opacity={0.4} />
      <Face points={[[0.8, 0, h - 3], [0.8, d, h - 3], [0.8, d, h], [0.8, 0, h]]} fill="#7a5a3a" />
      <Face points={[[0, 0.8, h - 3], [w, 0.8, h - 3], [w, 0.8, h], [0, 0.8, h]]} fill="#7a5a3a" />
    </g>
  )
}

/** Trong kho: the rack with the empty upper tiers, the tide line, the sandbags against the shutter. */
function Kho({ extra, flooded }: SceneProps = {}) {
  const z = 'kho'
  const [rx, ry] = at(z, 34, 80, 30)
  const [px, py] = at(z, 78, 64, WATER)
  const [bx, by] = at(z, 86, 84, 20)
  const W = 620, D = 480
  return (
    <Stage zone={z} label="Trong kho điện thoại sau triều cường, nhìn như sa bàn">
      <Slab w={W} d={D} floor="#bfb2a2" side="#d8cbbb" />
      <Smudge points={[[40, 60, 0.3], [W - 40, 60, 0.3], [W - 60, D - 40, 0.3], [60, D - 30, 0.3]]} color={mud} opacity={0.3} />
      <BackWalls w={W} d={D} h={230} left={brick} right="#e2d0b8" edge="#a99078" t={9} />
      <TideLine w={W} d={D} />
      {/* cobweb high in the corner, untouched */}
      <Face points={[[1, 2, 200], [1, 40, 226], [1, 2, 226]]} fill="#ffffff" opacity={0.6} />
      {/* the loading bay: a partition with the roller shutter, sandbags in front */}
      <Box at={[bx - 120, by - 70, 0]} size={[200, 12, 200]} color="#d8c5ab" />
      {Array.from({ length: 11 }, (_, i) => (
        <Face key={i} points={[[bx - 100, by - 57.4, 14 + i * 14], [bx + 60, by - 57.4, 14 + i * 14], [bx + 60, by - 57.4, 17 + i * 14], [bx - 100, by - 57.4, 17 + i * 14]]} fill="#9aa4b4" />
      ))}
      <Face points={[[bx - 100, by - 57.6, 0], [bx + 60, by - 57.6, 0], [bx + 60, by - 57.6, 170], [bx - 100, by - 57.6, 170]]} fill="#c3cad5" opacity={0.6} />
      <Sandbags at={[bx - 104, by - 52, 0]} n={6} />
      <Sandbags at={[bx - 104, by - 28, 0]} n={6} layers={2} />
      {/* concrete column with the measuring tape and the tide mark */}
      <Box at={[px - 20, py - 30, 0]} size={[30, 30, 230]} color="#d6cbbd" />
      <Face points={[[px - 20, py + 0.5, 0], [px + 10, py + 0.5, 0], [px + 10, py + 0.5, WATER], [px - 20, py + 0.5, WATER]]} fill={mud} opacity={0.4} />
      <Face points={[[px - 10, py + 0.7, 0], [px - 4, py + 0.7, 0], [px - 4, py + 0.7, 2 * M], [px - 10, py + 0.7, 2 * M]]} fill="#fffaf0" />
      {[0.5, 1, 1.5, 2].map((m) => (
        <Face key={m} points={[[px - 12, py + 0.9, m * M - 1], [px - 2, py + 0.9, m * M - 1], [px - 2, py + 0.9, m * M + 1], [px - 12, py + 0.9, m * M + 1]]} fill={iso.ink} />
      ))}
      <Face points={[[px - 20, py + 1, WATER - 2], [px + 10, py + 1, WATER - 2], [px + 10, py + 1, WATER + 1], [px - 20, py + 1, WATER + 1]]} fill="#7a5a3a" />
      {/* a few soaked cartons on the floor */}
      <Carton at={[120, 120, 0]} wet />
      <Carton at={[150, 160, 0]} wet />
      <Carton at={[330, 260, 0]} wet />
      {/* the rack, facing the camera */}
      <Rack5 at={[rx - 120, ry - 50, 0]} len={240} />
      {flooded && <Water at={[0, 0]} w={W} d={D} z={WATER} color="#8c8a6a" />}
      {extra}
    </Stage>
  )
}

/** Cửa sổ phía kênh: the warehouse's canal wall, the window flung open, the paint scrape on the sill, the cut rope, the canal. */
function CuaSo({ extra, flooded }: SceneProps = {}) {
  const z = 'cua-so'
  const Y0 = 240
  const sill = 40
  const top = 190
  const wx0 = 170, wx1 = 310
  return (
    <Stage zone={z} label="Cửa sổ phía kênh của kho, nhìn như sa bàn" sky={['#bfc6e0', '#ecd5c8']}>
      {/* the canal in front of the wall */}
      <Slab w={540} d={520} floor="#8fa9b4" side="#b8c3cc" />
      <Water at={[0, Y0]} w={540} d={280} color={flooded ? '#8c8a6a' : '#86a4b2'} z={flooded ? 60 : 0.3} />
      {/* flotsam left by the tide */}
      {[[120, 380, '#e9e1cf'], [260, 440, '#c98a5c'], [360, 330, iso.blue], [60, 470, '#e2a63b']].map(([x, y, c], i) => (
        <Box key={i} at={[x as number, y as number, 0.4]} size={[22, 8, 3]} color={c as string} />
      ))}
      {/* the warehouse as a block, its canal wall facing the camera */}
      <Box at={[0, 0, 0]} size={[540, Y0, 260]} color={brick} top="#b9a68c" />
      <Face points={[[0, Y0 + 0.4, 0], [540, Y0 + 0.4, 0], [540, Y0 + 0.4, WATER + 10], [0, Y0 + 0.4, WATER + 10]]} fill={mud} opacity={0.35} />
      {/* the window: bars, the two sashes swung open, the sill */}
      <Face points={[[wx0, Y0 + 0.5, sill], [wx1, Y0 + 0.5, sill], [wx1, Y0 + 0.5, top], [wx0, Y0 + 0.5, top]]} fill="#3d3446" />
      {Array.from({ length: 7 }, (_, i) => (
        <Face key={i} points={[[wx0 + 12 + i * 19, Y0 + 1, sill], [wx0 + 16 + i * 19, Y0 + 1, sill], [wx0 + 16 + i * 19, Y0 + 1, top], [wx0 + 12 + i * 19, Y0 + 1, top]]} fill={iso.metal} />
      ))}
      <Box at={[wx0 - 6, Y0, sill - 8]} size={[wx1 - wx0 + 12, 14, 8]} color="#e9e1cf" />
      {/* blue and red paint scraped onto the sill's outer edge */}
      <Face points={[[wx0 + 20, Y0 + 14.4, sill - 6], [wx1 - 30, Y0 + 14.4, sill - 5], [wx1 - 30, Y0 + 14.4, sill - 3], [wx0 + 20, Y0 + 14.4, sill - 4]]} fill="#3f78b0" />
      <Face points={[[wx0 + 40, Y0 + 14.5, sill - 3], [wx1 - 50, Y0 + 14.5, sill - 2], [wx1 - 50, Y0 + 14.5, sill - 1], [wx0 + 40, Y0 + 14.5, sill - 2]]} fill={iso.coral} />
      {/* the latch, pulled back from inside */}
      <Box at={[(wx0 + wx1) / 2 - 10, Y0 + 1, top - 40]} size={[20, 3, 6]} color={iso.gold} />
      {/* sashes swung out */}
      <Box at={[wx0 - 6, Y0, sill]} size={[6, 70, top - sill]} color={iso.wood} />
      <Box at={[wx1, Y0, sill]} size={[6, 70, top - sill]} color={iso.wood} />
      {/* the small vent grille to the right, with the cut blue rope */}
      <Face points={[[390, Y0 + 0.5, 170], [470, Y0 + 0.5, 170], [470, Y0 + 0.5, 230], [390, Y0 + 0.5, 230]]} fill="#3d3446" />
      {Array.from({ length: 5 }, (_, i) => (
        <Face key={i} points={[[396 + i * 16, Y0 + 1, 170], [400 + i * 16, Y0 + 1, 170], [400 + i * 16, Y0 + 1, 230], [396 + i * 16, Y0 + 1, 230]]} fill={iso.metal} />
      ))}
      <Box at={[418, Y0 + 1, 186]} size={[10, 6, 20]} color="#3c8fd0" />
      <Box at={[424, Y0 + 4, 166]} size={[3, 3, 22]} color="#3c8fd0" />
      {/* a measuring note: 1,0 m from the floor inside */}
      <Face points={[[wx1 + 20, Y0 + 0.6, sill - 4], [wx1 + 60, Y0 + 0.6, sill - 4], [wx1 + 60, Y0 + 0.6, sill + 8], [wx1 + 20, Y0 + 0.6, sill + 8]]} fill="#fffaf0" />
      <WallText at={[wx1 + 40, Y0 + 0.8, sill - 1]} plane="R" text="1,0 m" size={10} color={iso.ink} />
      {/* drain pipe */}
      <Box at={[100, Y0, 0]} size={[10, 10, 260]} color="#b9b4a8" />
      {extra}
    </Stage>
  )
}

/** Bến Bình Đông: Tư's boat at the pier, its scraped side, the fuel cans and receipt on the jetty, chị Bông's café across the canal. */
function Ben({ extra }: SceneProps = {}) {
  const z = 'ben'
  const [gx] = at(z, 46, 60, 20)
  const [cx, cy] = at(z, 74, 88)
  const boatX = gx - 150
  return (
    <Stage zone={z} label="Bến Bình Đông, nhìn như sa bàn" sky={['#c9c3e6', '#f3d4c0']}>
      <Slab w={580} d={520} floor="#86a4b2" side="#b8c3cc" />
      {/* the far bank behind the water: low houses and chị Bông's café */}
      <Box at={[0, 0, 0]} size={[580, 40, 16]} color="#c9b8a0" />
      <Building at={[0, 0, 16]} size={[110, 36, 120]} color="#e2a37a" seed={3} />
      <Building at={[120, 0, 16]} size={[90, 36, 90]} color="#e9d6b4" seed={5} />
      <Building at={[220, 0, 16]} size={[90, 36, 140]} color="#b9c9b0" seed={7} />
      <Building at={[320, 0, 16]} size={[80, 36, 100]} color="#e2c19a" seed={2} />
      {/* the café: a tin-roofed hut on stilts, sign facing the canal */}
      <Box at={[440, 4, 16]} size={[110, 34, 6]} color="#7d5c41" />
      {[444, 540].map((x) => (
        <Box key={x} at={[x, 30, 0]} size={[6, 6, 22]} color="#7d5c41" />
      ))}
      <Box at={[450, 4, 22]} size={[90, 30, 140]} color="#b98a63" />
      <Box at={[444, 0, 162]} size={[102, 40, 10]} color="#c94a3a" />
      <WallText at={[495, 41, 140]} plane="R" text="CÀ PHÊ BÔNG" size={13} />
      <Face points={[[464, 34.5, 70], [500, 34.5, 70], [500, 34.5, 110], [464, 34.5, 110]]} fill="#ffe1a0" />
      <Face points={[[506, 34.5, 70], [530, 34.5, 70], [530, 34.5, 110], [506, 34.5, 110]]} fill="#ffe1a0" />
      {/* the near jetty along the front right */}
      <Box at={[330, 120, 0]} size={[250, 400, 18]} color="#b9875d" />
      {Array.from({ length: 9 }, (_, i) => (
        <Face key={i} points={[[330 + i * 28, 120, 18.3], [331.5 + i * 28, 120, 18.3], [331.5 + i * 28, 520, 18.3], [330 + i * 28, 520, 18.3]]} fill="#9e7350" />
      ))}
      {[150, 260, 370, 480].map((y) => (
        <Box key={y} at={[334, y, 18]} size={[10, 10, 40]} color="#7d5c41" />
      ))}
      {/* fuel cans and the receipt */}
      <Box at={[cx - 40, cy - 30, 18]} size={[26, 20, 40]} color="#d6453a" />
      <Box at={[cx - 34, cy - 26, 58]} size={[8, 8, 6]} color={iso.ink} />
      <Box at={[cx - 8, cy - 26, 18]} size={[22, 18, 30]} color="#4f8a5b" />
      <Box at={[cx + 20, cy - 10, 18]} size={[26, 18, 1]} color="#fffaf0" />
      {/* Tư's boat, bow towards the camera, its right side scraped */}
      <Boat at={[boatX, 100, 0]} len={360} w={150} scraped />
      {/* rice bags under a tarp at the bow */}
      {[[0, 0], [36, 0], [72, 0], [18, 34], [54, 34]].map(([ox, oy], i) => (
        <Box key={i} at={[boatX + 24 + ox, 300 + oy, 40 + (i > 2 ? 22 : 0)]} size={[34, 30, 22]} color="#efe6d4" />
      ))}
      {extra}
    </Stage>
  )
}

/** Phòng quản lý kho: Khải's yellow raincoat on its hook, the key board, the stock book on the desk, the Tết orders whiteboard. */
function VanPhong({ extra }: SceneProps = {}) {
  const z = 'van-phong'
  const p = PROJ[z]
  const [ay, az] = wallLAt(p, 20, 46)
  const [ky, kz] = wallLAt(p, 48, 34)
  const [dx, dy] = at(z, 70, 62, 74)
  const [lx, lz] = wallRAt(p, 86, 30)
  return (
    <Stage zone={z} label="Phòng quản lý kho, nhìn như sa bàn" sky={['#cdc6e6', '#f3dccb']}>
      <Slab w={440} d={360} floor="#c79a72" side="#dcbfa2" />
      {Array.from({ length: 8 }, (_, i) => (
        <Face key={i} points={[[i * 55, 0, 0.3], [i * 55 + 1.5, 0, 0.3], [i * 55 + 1.5, 360, 0.3], [i * 55, 360, 0.3]]} fill="#b58a63" />
      ))}
      <BackWalls w={440} d={360} h={320} left="#e3cfae" right="#ead9bc" edge="#a99078" t={9} />
      <TideLine w={440} d={360} h={0.3 * M} />
      {/* the yellow raincoat on its hook: jacket, and the trousers with mud up to the thigh */}
      <Box at={[0, ay - 4, az + 120]} size={[10, 8, 6]} color={iso.metal} />
      <Box at={[2, ay - 30, az + 30]} size={[12, 60, 90]} color="#f2c443" />
      <WallText at={[14.5, ay, az + 90]} plane="L" text="MỸ LỆ" size={12} color="#c94a3a" />
      <Box at={[2, ay - 20, az - 70]} size={[10, 18, 100]} color="#f2c443" />
      <Box at={[2, ay + 2, az - 70]} size={[10, 18, 100]} color="#f2c443" />
      <Face points={[[12.5, ay - 20, az - 70], [12.5, ay + 20, az - 70], [12.5, ay + 20, az - 20], [12.5, ay - 20, az - 20]]} fill={mud} opacity={0.85} />
      {/* the key board: hook 2 empty */}
      <Face points={[[0.5, ky - 40, kz - 40], [0.5, ky + 40, kz - 40], [0.5, ky + 40, kz + 40], [0.5, ky - 40, kz + 40]]} fill={iso.woodDark} />
      <Face points={[[1, ky - 34, kz + 18], [1, ky + 34, kz + 18], [1, ky + 34, kz + 32], [1, ky - 34, kz + 32]]} fill="#fffaf0" />
      <Face points={[[1.2, ky - 20, kz - 10], [1.2, ky - 14, kz - 10], [1.2, ky - 14, kz + 10], [1.2, ky - 20, kz + 10]]} fill={iso.gold} />
      <Face points={[[1.2, ky + 14, kz + 6], [1.2, ky + 20, kz + 6], [1.2, ky + 20, kz + 10], [1.2, ky + 14, kz + 10]]} fill={iso.metal} />
      {/* the Tết orders whiteboard on the right wall */}
      <Face points={[[lx - 70, 0.5, lz - 50], [lx + 70, 0.5, lz - 50], [lx + 70, 0.5, lz + 40], [lx - 70, 0.5, lz + 40]]} fill="#fbfbf8" />
      <WallText at={[lx, 0.8, lz + 22]} plane="R" text="ĐƠN TẾT · TỪ 1/12" size={12} color="#c94a3a" />
      {[0, 1, 2, 3].map((i) => (
        <Face key={i} points={[[lx - 56, 0.8, lz + 6 - i * 13], [lx + 40 - (i % 2) * 30, 0.8, lz + 6 - i * 13], [lx + 40 - (i % 2) * 30, 0.8, lz + 9 - i * 13], [lx - 56, 0.8, lz + 9 - i * 13]]} fill={iso.inkSoft} />
      ))}
      {/* the desk against the right wall with the stock book */}
      <Table at={[dx - 80, dy - 50, 0]} w={180} d={86} h={74} color="#9b7d6a" />
      <Book at={[dx - 22, dy - 15, 74]} color="#c9b07a" />
      <Box at={[dx + 40, dy - 20, 74]} size={[22, 22, 30]} color="#d9a86a" />
      <Cup at={[dx - 50, dy + 10, 74]} fill="#7b5236" />
      {/* the hanging lamp and a chair */}
      <Box at={[dx - 40, dy + 60, 0]} size={[44, 44, 40]} color={iso.blue} />
      <Box at={[dx - 40, dy + 100, 40]} size={[44, 6, 44]} color={iso.blue} />
      {extra}
    </Stage>
  )
}

export const isoSceneArt: Record<string, (props?: SceneProps) => JSX.Element> = {
  kho: Kho,
  'cua-so': CuaSo,
  ben: Ben,
  'van-phong': VanPhong,
}

