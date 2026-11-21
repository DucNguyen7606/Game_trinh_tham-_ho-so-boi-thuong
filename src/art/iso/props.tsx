import { Box, Cyl, Face, Smudge, iso, tone, type V3 } from './iso'

// Small furniture and objects for the diorama scenes. Each takes the world
// point of its back-left-bottom corner (`at`) unless noted.

export function Table({ at, w = 120, d = 70, h = 70, color = iso.wood }: { at: V3; w?: number; d?: number; h?: number; color?: string }) {
  const [x, y, z] = at
  const leg = tone(color, -0.2)
  return (
    <g>
      <Box at={[x + 4, y + 4, z]} size={[8, 8, h - 8]} color={leg} />
      <Box at={[x + w - 12, y + 4, z]} size={[8, 8, h - 8]} color={leg} />
      <Box at={[x + 4, y + d - 12, z]} size={[8, 8, h - 8]} color={leg} />
      <Box at={[x + w - 12, y + d - 12, z]} size={[8, 8, h - 8]} color={leg} />
      <Box at={[x, y, z + h - 8]} size={[w, d, 8]} color={color} />
    </g>
  )
}

export function Stool({ at, h = 40, color = iso.coral }: { at: V3; h?: number; color?: string }) {
  return <Cyl at={at} r={18} len={h} axis="z" color={color} />
}

export function Cup({ at, fill }: { at: V3; fill?: string }) {
  return (
    <g>
      <Cyl at={at} r={6} len={14} axis="z" color="#d9e4ef" cap={fill ?? '#eef4fa'} />
    </g>
  )
}

export function Bottle({ at, color = '#e8c25a' }: { at: V3; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Cyl at={[x, y, z]} r={8} len={26} axis="z" color={color} />
      <Cyl at={[x, y, z + 26]} r={3.5} len={12} axis="z" color={tone(color, -0.1)} />
      <Box at={[x - 8.5, y + 2, z + 6]} size={[1, 6, 12]} color={iso.cream} />
    </g>
  )
}

/** An open logbook lying flat. */
export function Book({ at, color = iso.blue }: { at: V3; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[44, 30, 3]} color={color} />
      <Box at={[x + 2, y + 2, z + 3]} size={[19, 26, 2]} color={iso.cream} />
      <Box at={[x + 23, y + 2, z + 3]} size={[19, 26, 2]} color="#fffaf0" />
      <Face points={[[x + 26, y + 8, z + 5.2], [x + 38, y + 8, z + 5.2], [x + 38, y + 10, z + 5.2], [x + 26, y + 10, z + 5.2]]} fill={iso.inkSoft} />
    </g>
  )
}

/** Standing fan, facing +y. */
export function Fan({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x - 14, y - 14, z]} size={[28, 28, 5]} color={iso.metal} />
      <Box at={[x - 2, y - 2, z + 5]} size={[4, 4, 46]} color={tone(iso.metal, -0.1)} />
      <Box at={[x - 8, y - 6, z + 50]} size={[16, 12, 12]} color={iso.metal} />
      <Cyl at={[x, y + 6, z + 56]} r={22} len={4} axis="y" color={iso.sky} cap="#cfe2ea" core={iso.metal} />
      {/* one broken blade: a darker wedge */}
      <Face points={[[x, y + 10.2, z + 56], [x + 18, y + 10.2, z + 62], [x + 16, y + 10.2, z + 68]]} fill={tone(iso.sky, -0.35)} />
    </g>
  )
}

/** A wall socket on the left wall (plane x = 0), scorched. */
export function SocketL({ y, z, scorched = true }: { y: number; z: number; scorched?: boolean }) {
  return (
    <g>
      {scorched && <Smudge points={[[1, y - 30, z - 10], [1, y + 50, z - 10], [1, y + 60, z + 70], [1, y - 40, z + 80]]} opacity={0.5} />}
      <Face points={[[1, y, z], [1, y + 34, z], [1, y + 34, z + 40], [1, y, z + 40]]} fill="#f3eee6" />
      <Face points={[[1.5, y + 8, z + 14], [1.5, y + 13, z + 14], [1.5, y + 13, z + 26], [1.5, y + 8, z + 26]]} fill={iso.ink} />
      <Face points={[[1.5, y + 20, z + 14], [1.5, y + 25, z + 14], [1.5, y + 25, z + 26], [1.5, y + 20, z + 26]]} fill={iso.ink} />
      {/* melted cable running down to the battery */}
      <Face points={[[1.5, y + 15, z - 90], [1.5, y + 19, z - 90], [1.5, y + 19, z], [1.5, y + 15, z]]} fill={iso.sootDeep} />
    </g>
  )
}

/** Car battery and a small inverter, the hut's own power. */
export function Battery({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[34, 22, 24]} color="#3b3650" />
      <Box at={[x + 4, y + 4, z + 24]} size={[5, 5, 4]} color={iso.coral} />
      <Box at={[x + 24, y + 4, z + 24]} size={[5, 5, 4]} color={iso.ink} />
      <Box at={[x + 40, y + 2, z]} size={[24, 18, 14]} color={iso.metal} />
      <Box at={[x + 44, y + 19.5, z + 5]} size={[6, 1, 4]} color={iso.leaf} />
    </g>
  )
}

/** Steel rack with fabric rolls lying along x. `rolls` per shelf; null = empty slot, 'burnt' = charred. */
export function Rack({ at, levels = 3, slots = 4, rolls, len = 110 }: { at: V3; levels?: number; slots?: number; rolls: (string | null)[][]; len?: number }) {
  const [x, y, z] = at
  const d = slots * 30 + 10
  const step = 62
  const post = tone(iso.metal, -0.1)
  const out = []
  out.push(<Box key="p1" at={[x, y, z]} size={[6, 6, levels * step + 10]} color={post} />)
  out.push(<Box key="p2" at={[x, y + d - 6, z]} size={[6, 6, levels * step + 10]} color={post} />)
  for (let l = 0; l < levels; l++) {
    const zz = z + l * step + 8
    out.push(<Box key={`s${l}`} at={[x, y, zz - 4]} size={[len, d, 4]} color={iso.metal} />)
    rolls[l]?.forEach((c, i) => {
      if (!c) return
      const burnt = c === 'burnt'
      out.push(
        <Cyl
          key={`r${l}-${i}`}
          at={[x + 4, y + 20 + i * 30, zz + 13]}
          r={13}
          len={len - 10}
          axis="x"
          color={burnt ? iso.soot : c}
          cap={burnt ? iso.sootDeep : tone(c, 0.18)}
          core={burnt ? '#5a4d63' : tone(c, -0.35)}
        />,
      )
    })
  }
  out.push(<Box key="p3" at={[x + len - 6, y, z]} size={[6, 6, levels * step + 10]} color={post} />)
  out.push(<Box key="p4" at={[x + len - 6, y + d - 6, z]} size={[6, 6, levels * step + 10]} color={post} />)
  return <g>{out}</g>
}

export function Pallet({ at, burnt = false }: { at: V3; burnt?: boolean }) {
  const [x, y, z] = at
  const c = burnt ? '#6d5a52' : iso.wood
  return (
    <g>
      <Box at={[x, y, z]} size={[90, 12, 10]} color={tone(c, -0.15)} />
      <Box at={[x, y + 39, z]} size={[90, 12, 10]} color={tone(c, -0.15)} />
      <Box at={[x, y + 78, z]} size={[90, 12, 10]} color={tone(c, -0.15)} />
      {[0, 22, 44, 66].map((o) => (
        <Box key={o} at={[x + o, y, z + 10]} size={[18, 90, 4]} color={c} />
      ))}
    </g>
  )
}

/** Hand pallet truck standing upright in a corner. */
export function HandTruck({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[16, 60, 8]} color={iso.coral} />
      <Box at={[x + 24, y, z]} size={[16, 60, 8]} color={iso.coral} />
      <Box at={[x - 2, y + 54, z]} size={[44, 16, 30]} color={tone(iso.coral, -0.1)} />
      <Box at={[x + 17, y + 60, z + 30]} size={[6, 6, 70]} color={iso.ink} />
      <Box at={[x + 6, y + 60, z + 96]} size={[28, 6, 6]} color={iso.ink} />
      <Smudge points={[[x, y + 50, z], [x + 44, y + 50, z], [x + 44, y + 80, z], [x, y + 80, z]]} opacity={0.35} />
    </g>
  )
}

/** 5-litre jerrycan lying on its side, cap open. */
export function Jerrycan({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[38, 20, 30]} color="#e9e1cf" />
      <Box at={[x + 26, y + 6, z + 30]} size={[8, 8, 6]} color={iso.coral} />
      <Box at={[x + 4, y + 20.4, z + 8]} size={[14, 1, 10]} color={iso.blue} />
      <Smudge points={[[x + 30, y + 10, z], [x + 70, y + 20, z], [x + 60, y + 50, z], [x + 30, y + 30, z]]} color="#8c7a6a" opacity={0.3} />
    </g>
  )
}

/** Filing cabinet. */
export function Cabinet({ at, w = 70, d = 50, h = 150, burnt = true }: { at: V3; w?: number; d?: number; h?: number; burnt?: boolean }) {
  const [x, y, z] = at
  const c = burnt ? '#7e6a62' : iso.metal
  return (
    <g>
      <Box at={[x, y, z + 6]} size={[w, d, h]} color={c} />
      {[0.25, 0.55, 0.85].map((f) => (
        <Face key={f} points={[[x + 12, y + d + 0.4, z + h * f], [x + w - 12, y + d + 0.4, z + h * f], [x + w - 12, y + d + 0.4, z + h * f + 4], [x + 12, y + d + 0.4, z + h * f + 4]]} fill={tone(c, -0.35)} />
      ))}
      {burnt && <Smudge points={[[x, y + d + 0.5, z + 10], [x + w, y + d + 0.5, z + 10], [x + w, y + d + 0.5, z + h], [x, y + d + 0.5, z + h * 0.6]]} opacity={0.45} />}
    </g>
  )
}

/** Mosquito-coil iron stand and a rag. */
export function CoilStand({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Smudge points={[[x - 30, y - 10, z], [x + 40, y - 10, z], [x + 50, y + 30, z], [x - 20, y + 34, z]]} color="#6b5a4a" opacity={0.35} />
      <Box at={[x, y, z]} size={[18, 18, 2]} color="#4a4a58" />
      <Box at={[x + 8, y + 8, z + 2]} size={[2, 2, 9]} color="#4a4a58" />
      <Box at={[x + 24, y + 2, z]} size={[26, 16, 3]} color="#b9a07f" />
    </g>
  )
}

export function Desk({ at, w = 150, d = 80 }: { at: V3; w?: number; d?: number }) {
  return <Table at={at} w={w} d={d} h={74} color="#9b7d6a" />
}

/** PC tower with its side panel off: the drive bay is empty. */
export function PcTower({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[22, 46, 48]} color="#4b4760" />
      <Face points={[[x + 22.4, y + 6, z + 30], [x + 22.4, y + 40, z + 30], [x + 22.4, y + 40, z + 40], [x + 22.4, y + 6, z + 40]]} fill={iso.sootDeep} />
      {[0, 6, 12, 18].map((o) => (
        <Box key={o} at={[x + 30 + o, y + 30, z]} size={[3, 3, 2]} color={iso.metal} />
      ))}
    </g>
  )
}

/** A wall calendar on the right wall (plane y = 0). */
export function CalendarR({ x, z }: { x: number; z: number }) {
  return (
    <g>
      <Face points={[[x, 1, z], [x + 40, 1, z], [x + 40, 1, z + 52], [x, 1, z + 52]]} fill="#fffaf0" />
      <Face points={[[x, 1.3, z + 40], [x + 40, 1.3, z + 40], [x + 40, 1.3, z + 52], [x, 1.3, z + 52]]} fill={iso.coral} />
      <Face points={[[x + 22, 1.5, z + 14], [x + 32, 1.5, z + 14], [x + 32, 1.5, z + 24], [x + 22, 1.5, z + 24]]} fill="none" />
      <Smudge points={[[x - 6, 1.6, z - 4], [x + 18, 1.6, z - 2], [x + 10, 1.6, z + 30]]} opacity={0.4} />
      {/* day 20 circled in red */}
      <Face points={[[x + 24, 1.6, z + 16], [x + 31, 1.6, z + 16], [x + 31, 1.6, z + 23], [x + 24, 1.6, z + 23]]} fill={iso.coral} opacity={0.75} />
    </g>
  )
}

/** V-shaped burn mark rising from a point on the left wall. */
export function VBurnL({ y, z = 0, h = 200 }: { y: number; z?: number; h?: number }) {
  return (
    <g>
      <Smudge points={[[1, y - 20, z], [1, y + 20, z], [1, y + 110, z + h], [1, y - 110, z + h]]} color={iso.sootDeep} opacity={0.5} />
      <Smudge points={[[1, y - 8, z], [1, y + 8, z], [1, y + 60, z + h * 0.7], [1, y - 60, z + h * 0.7]]} color="#1c1822" opacity={0.45} />
    </g>
  )
}

export function Bin({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Cyl at={[x, y, z]} r={16} len={26} axis="z" color="#7e9cb5" cap="#3d3446" />
      <Box at={[x - 4, y - 4, z + 26]} size={[10, 8, 1]} color="#f3eee6" />
    </g>
  )
}

/** A door in a block's +x face (plane x = x0), with a padlock. */
export function SideDoorX({ x0, y, w = 70, h = 160, open = true }: { x0: number; y: number; w?: number; h?: number; open?: boolean }) {
  return (
    <g>
      <Face points={[[x0 + 0.5, y, 0], [x0 + 0.5, y + w, 0], [x0 + 0.5, y + w, h], [x0 + 0.5, y, h]]} fill="#5d7f93" />
      <Face points={[[x0 + 0.8, y + 6, 6], [x0 + 0.8, y + w - 6, 6], [x0 + 0.8, y + w - 6, h - 6], [x0 + 0.8, y + 6, h - 6]]} fill={open ? '#2f2a3f' : '#6f93a6'} />
    </g>
  )
}

export function Padlock({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[6, 14, 16]} color={iso.gold} />
      <Box at={[x + 1, y + 3, z + 16]} size={[3, 2, 8]} color={iso.metal} />
      <Box at={[x + 1, y + 11, z + 16]} size={[3, 2, 4]} color={iso.metal} />
    </g>
  )
}

/** Fuse box on the right wall (plane y = 0), main switch down. */
export function FuseBoxR({ x, z }: { x: number; z: number }) {
  return (
    <g>
      <Box at={[x, 0, z]} size={[60, 22, 80]} color="#9fb3c0" />
      <Face points={[[x + 8, 22.4, z + 10], [x + 52, 22.4, z + 10], [x + 52, 22.4, z + 70], [x + 8, 22.4, z + 70]]} fill="#e9eef2" />
      <Face points={[[x + 26, 22.6, z + 22], [x + 34, 22.6, z + 22], [x + 34, 22.6, z + 40], [x + 26, 22.6, z + 40]]} fill={iso.coral} />
      <Face points={[[x + 14, 22.6, z + 54], [x + 46, 22.6, z + 54], [x + 46, 22.6, z + 60], [x + 14, 22.6, z + 60]]} fill={iso.ink} />
    </g>
  )
}

export function Sandals({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[44, 17, 5]} color="#3f6f8a" />
      <Box at={[x + 6, y + 23, z]} size={[44, 17, 5]} color="#3f6f8a" />
      <Box at={[x + 26, y + 4, z + 5]} size={[6, 9, 4]} color={iso.cream} />
      <Box at={[x + 32, y + 27, z + 5]} size={[6, 9, 4]} color={iso.cream} />
    </g>
  )
}

export function Lighter({ at }: { at: V3 }) {
  const [x, y, z] = at
  return (
    <g>
      <Smudge points={[[x - 20, y - 14, z], [x + 30, y - 14, z], [x + 30, y + 22, z], [x - 20, y + 22, z]]} color="#9a8f86" opacity={0.3} />
      <Box at={[x, y, z]} size={[28, 11, 6]} color="#e0453a" />
      <Box at={[x + 28, y + 1.5, z]} size={[6, 8, 6]} color={iso.metal} />
    </g>
  )
}

/** Corrugated roll-up shutter on the right wall (plane y = 0). */
export function ShutterR({ x, w = 220, h = 190 }: { x: number; w?: number; h?: number }) {
  const lines = []
  for (let zz = 12; zz < h; zz += 14) {
    lines.push(<Face key={zz} points={[[x, 0.8, zz], [x + w, 0.8, zz], [x + w, 0.8, zz + 3], [x, 0.8, zz + 3]]} fill="#9aa4b4" />)
  }
  return (
    <g>
      <Face points={[[x, 0.5, 0], [x + w, 0.5, 0], [x + w, 0.5, h], [x, 0.5, h]]} fill="#c3cad5" />
      {lines}
      <Box at={[x - 10, 0, h]} size={[w + 20, 20, 24]} color="#a9b2c0" />
    </g>
  )
}

/** Charred rubble heap on the floor. */
export function Rubble({ at, w = 120, d = 100 }: { at: V3; w?: number; d?: number }) {
  const [x, y, z] = at
  return (
    <g>
      <Smudge points={[[x - 30, y - 20, z], [x + w + 30, y - 10, z], [x + w + 20, y + d + 30, z], [x - 20, y + d + 20, z]]} opacity={0.45} />
      <Box at={[x + w * 0.4, y, z]} size={[w * 0.45, d * 0.4, 12]} color="#5a4d63" />
      <Box at={[x, y + d * 0.2, z]} size={[w * 0.55, d * 0.5, 20]} color={iso.soot} />
      <Box at={[x + w * 0.3, y + d * 0.45, z]} size={[w * 0.5, d * 0.55, 30]} color="#4a3f55" />
      <Box at={[x + w * 0.1, y + d * 0.7, z]} size={[w * 0.35, d * 0.3, 10]} color={iso.sootDeep} />
      <Box at={[x + w * 0.55, y + d * 0.6, z + 30]} size={[6, 6, 3]} color={iso.ember} />
    </g>
  )
}
