import type { ReactNode } from 'react'
import { BackWalls, Box, Cyl, Face, IsoStage, Slab, Smudge, WallText, floorAt, iso, project, wallLAt, wallRAt } from '@/art/iso/iso'
import { Book, Table } from '@/art/iso/props'
import { Camera, Patch, Water } from '@/art/iso/street'

// Chapter 7 zones as dioramas. Each zone sets its own projection (where the
// floor's back corner sits on screen) so walls and floor fall under the
// hotspot percentages in case.json, which stay unchanged.

type Proj = { cx: number; cy: number; s: number }
const PROJ: Record<string, Proj> = {
  tiem: { cx: 800, cy: 200, s: 1.6 },
  hem: { cx: 800, cy: 320, s: 1.6 },
  lau: { cx: 800, cy: 360, s: 1.6 },
  thuoc: { cx: 800, cy: 200, s: 1.6 },
}

/** World point on the floor (height z) under a screen point in percent, for one zone. */
export const at = (zone: string, px: number, py: number, z = 0) => floorAt(PROJ[zone], px, py, z)

/** Screen point (in the 1600 x 900 scene) of a world point in one zone, for markers drawn over it. */
export const scr = (zone: string, x: number, y: number, z = 0) => project(PROJ[zone], x, y, z)

/** Extra pieces a reconstruction panel adds to a zone (people, the motorbike that night). */
export interface SceneProps {
  extra?: ReactNode
  /** The night of the robbery: rain, lights off. */
  night?: boolean
}

const redMud = '#b5523a'
const gold = '#f2c46d'
const shopRed = '#c94a3a'

function Stage({ zone, label, children, sky = ['#c9c3e6', '#f3d8c8'], overlay }: { zone: string; label: string; children: ReactNode; sky?: [string, string]; overlay?: ReactNode }) {
  const p = PROJ[zone]
  return (
    <IsoStage label={label} origin={[p.cx, p.cy]} scale={p.s} sky={sky} overlay={overlay}>
      {children}
    </IsoStage>
  )
}

/** A glass display counter along x with gold on velvet trays; `smashed` leaves the glass broken and the tray gone. */
function Counter({ at: [x, y, z], len = 100, smashed = false }: { at: [number, number, number]; len?: number; smashed?: boolean }) {
  return (
    <g>
      <Box at={[x, y, z]} size={[len, 40, 50]} color="#8a5c38" />
      <Box at={[x + 4, y + 4, z + 50]} size={[len - 8, 32, 4]} color="#7a2f35" />
      {!smashed &&
        Array.from({ length: Math.floor((len - 16) / 14) }, (_, i) => (
          <g key={i}>
            <Cyl at={[x + 12 + i * 14, y + 14, z + 54]} r={4} len={2} axis="z" color={gold} cap="#ffe1a0" />
            <Cyl at={[x + 12 + i * 14, y + 26, z + 54]} r={4} len={2} axis="z" color={gold} cap="#ffe1a0" />
          </g>
        ))}
      {smashed ? (
        <g>
          {/* only shards left on the frame */}
          <Face points={[[x, y, z + 54], [x + 14, y, z + 54], [x, y, z + 76]]} fill="#dfeef4" opacity={0.8} />
          <Face points={[[x + len, y + 40, z + 54], [x + len - 18, y + 40, z + 54], [x + len, y + 40, z + 72]]} fill="#dfeef4" opacity={0.8} />
          <Box at={[x, y, z + 54]} size={[len, 2, 24]} color="#dfeef4" opacity={0.25} />
          {[[0.2, 0.3], [0.5, 0.6], [0.7, 0.2], [0.35, 0.8]].map(([u, v], i) => (
            <Face key={i} points={[[x + len * u, y + 40 * v, z + 54.6], [x + len * u + 8, y + 40 * v + 2, z + 54.6], [x + len * u + 3, y + 40 * v + 7, z + 54.6]]} fill="#ffffff" />
          ))}
        </g>
      ) : (
        <Box at={[x, y, z + 54]} size={[len, 40, 22]} color="#dfeef4" opacity={0.35} />
      )}
    </g>
  )
}

/** A trail of slipper prints in red mud between two floor points. */
function Prints({ from, to, n = 7 }: { from: [number, number]; to: [number, number]; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1)
        const x = from[0] + (to[0] - from[0]) * t + (i % 2 ? 6 : -6)
        const y = from[1] + (to[1] - from[1]) * t + (i % 2 ? -6 : 6)
        return <Patch key={i} at={[x, y]} w={16} d={8} color={redMud} z={0.5} opacity={0.85} />
      })}
    </g>
  )
}

/** Trong tiệm vàng: the safe behind the counter, the smashed middle display, the red-mud prints from the back door, the ring under the front cabinet, the Thần Tài altar. */
function Tiem({ extra, night }: SceneProps = {}) {
  const z = 'tiem'
  const p = PROJ[z]
  const [ty, tz] = wallLAt(p, 30, 26)
  const [rx, ry] = at(z, 36, 88)
  const [sx, sy] = at(z, 72, 84)
  return (
    <Stage zone={z} label="Trong tiệm vàng Kim Thành, nhìn như sa bàn" sky={night ? ['#a9aed6', '#d9c6d8'] : ['#d6c3e2', '#f6d8c4']}>
      <Slab w={520} d={480} floor="#efe6d8" side="#e2d2c2" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <Patch at={[i * 60, 0]} w={1.5} d={480} color="#ddd2c2" z={0.3} />
          <Patch at={[0, i * 60]} w={520} d={1.5} color="#ddd2c2" z={0.3} />
        </g>
      ))}
      <BackWalls w={520} d={480} h={240} left="#d65a48" right="#e06a55" edge="#9a3a2e" t={9} />
      <Face points={[[0.5, 0, 150], [0.5, 480, 150], [0.5, 480, 156], [0.5, 0, 156]]} fill={gold} />
      <Face points={[[0, 0.5, 150], [520, 0.5, 150], [520, 0.5, 156], [0, 0.5, 156]]} fill={gold} />
      {/* Thần Tài altar shelf on the left wall */}
      <Box at={[0, ty - 40, tz - 14]} size={[34, 80, 6]} color={iso.woodDark} />
      <Box at={[4, ty - 30, tz - 8]} size={[22, 24, 26]} color={gold} />
      <Box at={[4, ty + 4, tz - 8]} size={[22, 24, 22]} color={gold} />
      <Box at={[14, ty - 4, tz - 8]} size={[4, 4, 30]} color={shopRed} />
      {/* the back door to the alley on the right wall */}
      <Face points={[[380, 0.5, 0], [470, 0.5, 0], [470, 0.5, 170], [380, 0.5, 170]]} fill="#8d94a3" />
      <Face points={[[386, 0.8, 6], [464, 0.8, 6], [464, 0.8, 164], [386, 0.8, 164]]} fill="#a9b0bd" />
      <Box at={[400, 0, 84]} size={[30, 4, 5]} color={iso.metal} />
      <WallText at={[425, 1, 180]} plane="R" text="CỬA SAU · HẺM 514" size={11} color={gold} />
      {/* the safe behind the counter, door ajar */}
      <Box at={[0, 390, 0]} size={[62, 70, 110]} color="#7e8794" />
      <Face points={[[62.5, 400, 60], [62.5, 430, 60], [62.5, 430, 96], [62.5, 400, 96]]} fill="#2e2a4a" />
      <Face points={[[62.8, 404, 84], [62.8, 426, 84], [62.8, 426, 92], [62.8, 404, 92]]} fill="#7fe0a8" />
      <Box at={[62, 456, 0]} size={[34, 4, 110]} color="#6c7480" />
      {/* the main counter: three displays, the middle one smashed */}
      <Counter at={[120, 230, 0]} len={100} />
      <Counter at={[220, 230, 0]} len={110} smashed />
      <Counter at={[330, 230, 0]} len={100} />
      <Smudge points={[[230, 270, 0.3], [330, 270, 0.3], [330, 300, 0.3], [230, 300, 0.3]]} color="#ffffff" opacity={0.6} />
      {/* red-mud slipper prints: in from the back door, to the middle display, out to the front shutter */}
      {!night && (
        <>
          <Prints from={[420, 20]} to={[300, 200]} />
          <Prints from={[320, 290]} to={[sx + 20, sy + 40]} n={6} />
        </>
      )}
      {/* the low front cabinet and the dropped ring at its foot */}
      <Box at={[rx - 70, ry - 70, 0]} size={[150, 50, 40]} color="#8a5c38" />
      <Box at={[rx - 66, ry - 66, 40]} size={[142, 42, 18]} color="#dfeef4" opacity={0.4} />
      {!night && <Cyl at={[rx + 6, ry + 4, 0]} r={5} len={2} axis="z" color={gold} cap="#ffe1a0" core="#efe6d8" />}
      {/* the pocket scale on the counter */}
      <Box at={[140, 236, 54]} size={[18, 18, 6]} color="#3d3446" />
      <Box at={[142, 238, 60]} size={[14, 14, 0.6]} color="#c9d6de" />
      {extra}
    </Stage>
  )
}

/** Hẻm 514: the shop's back door, the dead camera on its pole, the shared bin with the raincoat, the broken red tail-light by a fresh rut, a pothole full of water. */
function Hem({ extra, night }: SceneProps = {}) {
  const z = 'hem'
  const p = PROJ[z]
  const [dy] = wallLAt(p, 30, 50)
  const [hx, hy] = at(z, 56, 86)
  const [bx] = wallRAt(p, 80, 62)
  const [cx, cz] = wallRAt(p, 62, 18)
  const [px, py] = at(z, 16, 84)
  return (
    <Stage zone={z} label="Hẻm 514 sau tiệm vàng, nhìn như sa bàn" sky={night ? ['#a9aed6', '#d9c6d8'] : ['#c9c3e6', '#efd6c6']}>
      <Slab w={460} d={520} floor="#c47a5a" side="#d8b49c" />
      {/* the trench being dug for the new drain */}
      <Patch at={[180, 0]} w={34} d={520} color="#9a5a40" z={0.3} />
      <BackWalls w={460} d={520} h={230} left="#e6d3b4" right="#e9dcc6" edge="#a99078" t={9} />
      {/* the shop's back door: steel, no lock or handle outside */}
      <Face points={[[0.5, dy - 46, 0], [0.5, dy + 46, 0], [0.5, dy + 46, 150], [0.5, dy - 46, 150]]} fill="#8d94a3" />
      {Array.from({ length: 9 }, (_, i) => (
        <Face key={i} points={[[0.8, dy - 40, 10 + i * 15], [0.8, dy + 40, 10 + i * 15], [0.8, dy + 40, 13 + i * 15], [0.8, dy - 40, 13 + i * 15]]} fill="#a9b0bd" />
      ))}
      <WallText at={[1, dy, 162]} plane="L" text="KIM THÀNH · CỬA SAU" size={12} color={iso.ink} />
      {/* windows of the houses across */}
      {[60, 200, 330].map((x) => (
        <Face key={x} points={[[x, 0.5, 120], [x + 60, 0.5, 120], [x + 60, 0.5, 170], [x, 0.5, 170]]} fill="#7d93b0" />
      ))}
      {/* the pole with the dead camera, its cable hanging */}
      <Box at={[cx - 4, 6, 0]} size={[10, 10, cz + 40]} color="#b9b4a8" />
      <Camera at={[cx + 6, 6, cz]} wall="R" broken />
      {/* power lines */}
      <Face points={[[0, 1, 200], [460, 1, 186], [460, 1, 188], [0, 1, 202]]} fill={iso.ink} />
      {/* the shared bin against the right wall, a black raincoat stuffed under the bags */}
      <Box at={[bx - 34, 6, 0]} size={[70, 50, 66]} color="#3f8a5b" />
      <Box at={[bx - 34, 6, 66]} size={[70, 50, 4]} color="#2f6a45" />
      <Box at={[bx - 24, 14, 70]} size={[30, 26, 16]} color="#2e2a3a" />
      <Box at={[bx + 8, 20, 70]} size={[22, 20, 12]} color="#3d3446" />
      <Box at={[bx - 4, 40, 70]} size={[12, 8, 4]} color="#7fae8a" />
      {/* the broken red tail-light, a fresh deep rut, the scraped electricity pole */}
      <Patch at={[hx - 120, hy - 10]} w={180} d={10} color="#8a4a32" z={0.4} />
      {[[0, 0], [12, 8], [-10, 10], [6, -8], [-4, 2]].map(([ox, oy], i) => (
        <Box key={i} at={[hx + ox, hy + oy, 0]} size={[8, 6, 2]} color="#e2463a" />
      ))}
      <Box at={[hx + 40, hy - 50, 0]} size={[14, 14, 200]} color="#b9b4a8" />
      <Face points={[[hx + 40, hy - 35.6, 30], [hx + 54, hy - 35.6, 30], [hx + 54, hy - 35.6, 46], [hx + 40, hy - 35.6, 46]]} fill="#e2463a" opacity={0.7} />
      {/* the pothole */}
      <Water at={[px - 40, py - 26]} w={80} d={52} color="#a7a07e" z={0.5} />
      {night && <Patch at={[0, 0]} w={460} d={520} color="#7fa2b8" z={0.6} opacity={0.3} />}
      {extra}
    </Stage>
  )
}

/** Phòng trên lầu: the husband's altar, the drawer with the hụi book, the carton of rings in the corner, December's calendar. */
function Lau({ extra }: SceneProps = {}) {
  const z = 'lau'
  const p = PROJ[z]
  const [ay, az] = wallLAt(p, 46, 30)
  const [dx, dy] = at(z, 66, 64, 40)
  const [bx, by] = at(z, 18, 72, 30)
  const [lx, lz] = wallRAt(p, 84, 32)
  return (
    <Stage zone={z} label="Phòng trên lầu nhà bà Loan, nhìn như sa bàn" sky={['#cdc6e6', '#f3dccb']}>
      <Slab w={440} d={360} floor="#c79a72" side="#dcbfa2" />
      {Array.from({ length: 8 }, (_, i) => (
        <Patch key={i} at={[i * 55, 0]} w={1.5} d={360} color="#b58a63" z={0.3} />
      ))}
      <BackWalls w={440} d={360} h={300} left="#e9d3b2" right="#f0dfc4" edge="#a99078" t={9} />
      {/* the altar shelf with Ông Thành's photo */}
      <Box at={[0, ay - 60, az - 20]} size={[40, 120, 8]} color={iso.woodDark} />
      <Face points={[[0.6, ay - 22, az - 12], [0.6, ay + 22, az - 12], [0.6, ay + 22, az + 44], [0.6, ay - 22, az + 44]]} fill="#e9e1cf" />
      <Face points={[[0.9, ay - 16, az - 6], [0.9, ay + 16, az - 6], [0.9, ay + 16, az + 38], [0.9, ay - 16, az + 38]]} fill="#6c6787" />
      <Box at={[6, ay - 50, az - 12]} size={[14, 14, 14]} color={gold} />
      <Box at={[6, ay + 36, az - 12]} size={[14, 14, 18]} color="#7fae8a" />
      {/* the calendar */}
      <Face points={[[lx - 40, 0.6, lz - 50], [lx + 40, 0.6, lz - 50], [lx + 40, 0.6, lz + 40], [lx - 40, 0.6, lz + 40]]} fill="#fffaf0" />
      <Face points={[[lx - 40, 0.8, lz + 22], [lx + 40, 0.8, lz + 22], [lx + 40, 0.8, lz + 40], [lx - 40, 0.8, lz + 40]]} fill={shopRed} />
      <WallText at={[lx, 1, lz + 26]} plane="R" text="THÁNG 12" size={11} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => (
          <Face key={`${r}${c}`} points={[[lx - 34 + c * 12, 1, lz + 10 - r * 14], [lx - 25 + c * 12, 1, lz + 10 - r * 14], [lx - 25 + c * 12, 1, lz + 2 - r * 14], [lx - 34 + c * 12, 1, lz + 2 - r * 14]]} fill={c === 4 && r === 0 ? '#ffe1a0' : '#ede4d4'} />
        )),
      )}
      {/* the desk with its drawer half open and the blue hụi book inside */}
      <Box at={[dx - 90, dy - 70, 0]} size={[170, 70, 70]} color="#9b7d6a" />
      <Box at={[dx - 40, dy - 4, 34]} size={[70, 34, 22]} color="#8a6c58" />
      <Box at={[dx - 30, dy + 2, 52]} size={[42, 26, 4]} color={iso.blue} />
      <Box at={[dx + 30, dy - 50, 70]} size={[26, 20, 30]} color={gold} />
      {/* the carton of rings in the corner */}
      <Box at={[bx - 30, by - 40, 0]} size={[60, 70, 54]} color="#d9a86a" />
      <Box at={[bx - 30, by - 8, 54]} size={[60, 6, 0.6]} color="#c98f52" />
      <WallText at={[bx, by + 30.4, 20]} plane="R" text="XƯỞNG MÃ" size={10} color={iso.ink} />
      {/* a bed against the left wall */}
      <Box at={[20, 200, 0]} size={[140, 140, 30]} color="#cdbfe0" />
      <Box at={[20, 200, 30]} size={[40, 140, 10]} color="#fffaf0" />
      {extra}
    </Stage>
  )
}

/** Nhà thuốc đối diện: inside the pharmacy, its open front onto the street and the gold shop across; the camera under the eaves, the sales book on the counter, the overflowing gutter. */
function Thuoc({ extra, night }: SceneProps = {}) {
  const z = 'thuoc'
  const p = PROJ[z]
  const [gy, gz] = wallLAt(p, 14, 16)
  const [kx, ky] = at(z, 80, 80, 60)
  const [gx] = wallRAt(p, 64, 48)
  const shop = 140
  return (
    <Stage zone={z} label="Nhà thuốc đối diện tiệm vàng, nhìn như sa bàn" sky={night ? ['#a9aed6', '#d9c6d8'] : ['#c4c6e6', '#e8d6d6']}>
      <Slab w={560} d={500} floor="#e6e2da" side="#d6cfc6" />
      {/* the street strip just outside the open front */}
      <Patch at={[0, 0]} w={560} d={70} color="#8d8aa0" z={0.3} />
      {Array.from({ length: 6 }, (_, i) => (
        <Patch key={i} at={[20 + i * 90, 33]} w={50} d={4} color="#efe7d6" z={0.5} />
      ))}
      {/* the left wall: pharmacy shelves */}
      <BackWalls w={560} d={500} h={280} left="#e8f0ee" edge="#9fb8b6" t={9} />
      {[60, 110, 160].map((zz) => (
        <g key={zz}>
          <Box at={[0, 140, zz]} size={[30, 220, 4]} color="#ffffff" />
          {Array.from({ length: 9 }, (_, i) => (
            <Box key={i} at={[4, 146 + i * 24, zz + 4]} size={[18, 18, 26]} color={['#e2a63b', '#4f9a86', '#d6453a', '#7a9fb0', '#fbf4e8'][(i + zz) % 5]} />
          ))}
        </g>
      ))}
      <WallText at={[1, 250, 220]} plane="L" text="NHÀ THUỐC NGỌC THẢO" size={16} color="#3f8a7e" />
      {/* the camera under the eaves at the front, looking out at the street */}
      <Camera at={[0, gy, gz]} wall="L" />
      {/* across the street: the gold shop, its shutter half down, and the mouth of alley 514 beside it */}
      <Box at={[shop - 10, -40, 0]} size={[200, 40, 260]} color="#efe1c4" />
      <Box at={[shop, -4, 180]} size={[180, 6, 44]} color={shopRed} />
      <WallText at={[shop + 90, 3, 190]} plane="R" text="KIM THÀNH" size={30} color={gold} />
      <WallText at={[shop + 90, 3, 214]} plane="R" text="TIỆM VÀNG · MUA BÁN TRAO ĐỔI" size={9} color="#ffe7b8" />
      <Face points={[[shop + 10, 0.5, 0], [shop + 170, 0.5, 0], [shop + 170, 0.5, 170], [shop + 10, 0.5, 170]]} fill="#6c5a4a" />
      {Array.from({ length: 7 }, (_, i) => (
        <Face key={i} points={[[shop + 10, 0.8, 90 + i * 11], [shop + 170, 0.8, 90 + i * 11], [shop + 170, 0.8, 97 + i * 11], [shop + 10, 0.8, 97 + i * 11]]} fill="#b9bcc6" />
      ))}
      <Face points={[[shop + 190, 0.5, 0], [shop + 240, 0.5, 0], [shop + 240, 0.5, 200], [shop + 190, 0.5, 200]]} fill="#3d3446" />
      <Box at={[shop + 200, -2, 200]} size={[30, 4, 14]} color="#3f5a78" />
      <WallText at={[shop + 215, 2.5, 203]} plane="R" text="514" size={9} />
      <Box at={[gx + 200, -40, 0]} size={[160, 40, 220]} color="#b9c9b0" />
      {/* the overflowing gutter in the corner of the eaves */}
      <Box at={[0, 0, 240]} size={[12, 500, 8]} color="#9aa3b5" />
      <Box at={[2, 2, 60]} size={[8, 8, 180]} color="#9aa3b5" />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} at={[8 + i * 4, 6 + i * 3, 60 - i * 14]} size={[3, 3, 10]} color="#9fc2d6" />
      ))}
      {/* the counter with the hand-written sales book */}
      <Box at={[kx - 40, ky - 90, 0]} size={[90, 200, 60]} color="#ffffff" top="#e9f2f1" />
      <Book at={[kx - 22, ky - 15, 60]} color="#c9b07a" />
      <Box at={[kx - 30, ky + 40, 60]} size={[30, 30, 24]} color="#3f8a7e" />
      {/* a chair for customers */}
      <Table at={[230, 300, 0]} w={60} d={60} h={44} color="#c9b7a3" />
      {night &&
        Array.from({ length: 30 }, (_, i) => (
          <Box key={`r${i}`} at={[((i * 97) % 520) + 10, ((i * 53) % 60) + 4, ((i * 131) % 200) + 20]} size={[1.2, 1.2, 14]} color="#cfe2ea" opacity={0.7} />
        ))}
      {extra}
    </Stage>
  )
}

export const isoSceneArt: Record<string, (props?: SceneProps) => JSX.Element> = {
  tiem: Tiem,
  hem: Hem,
  lau: Lau,
  thuoc: Thuoc,
}

