import { Box, Cyl, Face, iso, tone, type V3 } from './iso'

// Outdoor pieces for the diorama scenes (cars, motorbikes, trees, boats,
// shopfronts). Added for Chapters 5–8; each takes the world point of its
// back-left-bottom corner (`at`) unless noted.

/** A car lying along x (nose towards +x). `dent` puts a crumpled patch on the nose. */
export function Car({
  at,
  color = '#3b3650',
  len = 190,
  w = 80,
  tall = false,
  dent,
  lights = false,
}: {
  at: V3
  color?: string
  len?: number
  w?: number
  /** A people carrier / SUV: taller cabin. */
  tall?: boolean
  /** Where the nose is crumpled: 'mid' (a tree) or 'right' (a round dent). */
  dent?: ('mid' | 'right')[]
  lights?: boolean
}) {
  const [x, y, z] = at
  const glass = '#9fc2d6'
  const dark = tone(color, -0.45)
  const ch = tall ? 46 : 36
  return (
    <g>
      {/* far wheels peek out under the body */}
      <Cyl at={[x + 34, y + 2, z + 18]} r={18} len={6} axis="y" color={iso.ink} />
      <Cyl at={[x + len - 40, y + 2, z + 18]} r={18} len={6} axis="y" color={iso.ink} />
      <Box at={[x, y, z + 14]} size={[len, w, 34]} color={color} />
      <Box at={[x + 44, y + 6, z + 48]} size={[len - 96, w - 12, ch]} color={color} top={tone(color, 0.1)} />
      {/* side windows on the +y face, windscreen on the +x face */}
      <Face points={[[x + 50, y + w - 5.6, z + 52], [x + len - 58, y + w - 5.6, z + 52], [x + len - 58, y + w - 5.6, z + 44 + ch], [x + 50, y + w - 5.6, z + 44 + ch]]} fill={glass} />
      <Face points={[[x + len / 2 - 4, y + w - 5.4, z + 52], [x + len / 2, y + w - 5.4, z + 52], [x + len / 2, y + w - 5.4, z + 44 + ch], [x + len / 2 - 4, y + w - 5.4, z + 44 + ch]]} fill={color} />
      <Face points={[[x + len - 51.4, y + 10, z + 52], [x + len - 51.4, y + w - 10, z + 52], [x + len - 51.4, y + w - 10, z + 44 + ch], [x + len - 51.4, y + 10, z + 44 + ch]]} fill={tone(glass, -0.1)} />
      {/* headlights and grille on the nose */}
      <Face points={[[x + len + 0.5, y + 8, z + 34], [x + len + 0.5, y + 20, z + 34], [x + len + 0.5, y + 20, z + 42], [x + len + 0.5, y + 8, z + 42]]} fill={lights ? '#fff1c2' : '#e9eef2'} />
      <Face points={[[x + len + 0.5, y + w - 20, z + 34], [x + len + 0.5, y + w - 8, z + 34], [x + len + 0.5, y + w - 8, z + 42], [x + len + 0.5, y + w - 20, z + 42]]} fill={lights ? '#fff1c2' : '#e9eef2'} />
      <Face points={[[x + len + 0.5, y + 26, z + 22], [x + len + 0.5, y + w - 26, z + 22], [x + len + 0.5, y + w - 26, z + 36], [x + len + 0.5, y + 26, z + 36]]} fill={dark} />
      {dent?.includes('mid') && (
        <Face points={[[x + len + 0.8, y + 18, z + 16], [x + len + 0.8, y + 50, z + 18], [x + len + 0.8, y + 46, z + 46], [x + len + 0.8, y + 22, z + 44]]} fill={tone(color, -0.6)} />
      )}
      {dent?.includes('right') && <Cyl at={[x + len + 0.6, y + w - 14, z + 26]} r={8} len={0.6} axis="x" color={dark} cap="#c4452d" />}
      {/* near wheels */}
      <Cyl at={[x + 34, y + w - 4, z + 18]} r={18} len={6} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Cyl at={[x + len - 40, y + w - 4, z + 18]} r={18} len={6} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
    </g>
  )
}

/** A step-through motorbike lying along x, nose to +x. */
export function Scooter({ at, color = iso.coral, fallen = false }: { at: V3; color?: string; fallen?: boolean }) {
  const [x, y, z] = at
  if (fallen) {
    return (
      <g>
        <Box at={[x, y, z]} size={[96, 26, 14]} color={color} />
        <Cyl at={[x + 8, y + 26, z + 4]} r={16} len={4} axis="z" color={iso.ink} cap="#4b4760" core={iso.metal} />
        <Cyl at={[x + 88, y + 26, z + 4]} r={16} len={4} axis="z" color={iso.ink} cap="#4b4760" core={iso.metal} />
        <Box at={[x + 60, y + 30, z]} size={[10, 30, 6]} color={iso.ink} />
      </g>
    )
  }
  return (
    <g>
      <Cyl at={[x + 10, y + 8, z + 16]} r={16} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Cyl at={[x + 84, y + 8, z + 16]} r={16} len={8} axis="y" color={iso.ink} cap="#4b4760" core={iso.metal} />
      <Box at={[x, y + 4, z + 18]} size={[66, 16, 18]} color={color} />
      <Box at={[x + 4, y + 2, z + 36]} size={[42, 20, 8]} color={iso.ink} />
      <Box at={[x + 70, y + 6, z + 18]} size={[14, 12, 40]} color={color} />
      <Box at={[x + 76, y - 4, z + 56]} size={[6, 32, 5]} color={iso.ink} />
    </g>
  )
}

/** A street tree: a trunk and a soft block canopy. */
export function Tree({ at, h = 150, r = 50, color = iso.leaf }: { at: V3; h?: number; r?: number; color?: string }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x - 7, y - 7, z]} size={[14, 14, h - r]} color={iso.wood} />
      <Box at={[x - r, y - r, z + h - r - 10]} size={[r * 2, r * 2, r * 1.2]} color={color} />
      <Box at={[x - r * 0.6, y - r * 0.6, z + h + r * 0.2 - 10]} size={[r * 1.2, r * 1.2, r * 0.6]} color={tone(color, 0.08)} />
    </g>
  )
}

/** A street lamp on a pole, its head reaching towards +y. */
export function StreetLamp({ at, h = 210 }: { at: V3; h?: number }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x - 4, y - 4, z]} size={[8, 8, h]} color={iso.ink} />
      <Box at={[x - 3, y - 4, z + h - 6]} size={[6, 40, 6]} color={iso.ink} />
      <Box at={[x - 9, y + 28, z + h - 16]} size={[18, 18, 10]} color={iso.gold} top="#fff1c2" />
    </g>
  )
}

/** A low building block with a lit or dark window grid on its +y and +x faces. */
export function Building({ at, size, color, lit = 0.3, seed = 1 }: { at: V3; size: V3; color: string; lit?: number; seed?: number }) {
  const [x, y, z] = at
  const [w, d, h] = size
  const wins = []
  let s = seed
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  for (let zz = 20; zz < h - 24; zz += 34) {
    for (let xx = 14; xx < w - 20; xx += 30) {
      const on = rnd() < lit
      wins.push(<Face key={`y${zz}-${xx}`} points={[[x + xx, y + d + 0.5, z + zz], [x + xx + 14, y + d + 0.5, z + zz], [x + xx + 14, y + d + 0.5, z + zz + 18], [x + xx, y + d + 0.5, z + zz + 18]]} fill={on ? '#ffe1a0' : tone(color, -0.35)} />)
    }
    for (let yy = 14; yy < d - 20; yy += 30) {
      const on = rnd() < lit
      wins.push(<Face key={`x${zz}-${yy}`} points={[[x + w + 0.5, y + yy, z + zz], [x + w + 0.5, y + yy + 14, z + zz], [x + w + 0.5, y + yy + 14, z + zz + 18], [x + w + 0.5, y + yy, z + zz + 18]]} fill={on ? '#ffe1a0' : tone(color, -0.45)} />)
    }
  }
  return (
    <g>
      <Box at={at} size={size} color={color} />
      {wins}
    </g>
  )
}

/** A wooden cargo boat lying along y, bow towards +y: blue hull with a red rail. */
export function Boat({ at, len = 300, w = 90, scraped = false }: { at: V3; len?: number; w?: number; scraped?: boolean }) {
  const [x, y, z] = at
  const hull = '#3f78b0'
  return (
    <g>
      <Face points={[[x, y, z], [x + w, y, z], [x + w, y + len - 40, z], [x + w / 2, y + len, z + 10], [x, y + len - 40, z]]} fill={tone(hull, -0.3)} />
      {/* hull sides */}
      <Face points={[[x + w, y, z], [x + w, y + len - 40, z], [x + w, y + len - 40, z + 40], [x + w, y, z + 40]]} fill={tone(hull, -0.28)} />
      <Face points={[[x + w, y + len - 40, z], [x + w / 2, y + len, z + 10], [x + w / 2, y + len, z + 50], [x + w, y + len - 40, z + 40]]} fill={tone(hull, -0.12)} />
      <Face points={[[x, y + len - 40, z], [x + w / 2, y + len, z + 10], [x + w / 2, y + len, z + 50], [x, y + len - 40, z + 40]]} fill={tone(hull, -0.05)} />
      {/* deck */}
      <Face points={[[x, y, z + 40], [x + w, y, z + 40], [x + w, y + len - 40, z + 40], [x + w / 2, y + len, z + 50], [x, y + len - 40, z + 40]]} fill="#b9875d" />
      {/* red rail along the visible side */}
      <Face points={[[x + w + 0.4, y, z + 32], [x + w + 0.4, y + len - 40, z + 32], [x + w + 0.4, y + len - 40, z + 40], [x + w + 0.4, y, z + 40]]} fill={iso.coral} />
      {scraped && (
        <Face points={[[x + w + 0.8, y + 90, z + 14], [x + w + 0.8, y + 200, z + 18], [x + w + 0.8, y + 200, z + 30], [x + w + 0.8, y + 90, z + 26]]} fill="#c9c3b8" />
      )}
      {/* cabin at the stern */}
      <Box at={[x + 10, y + 6, z + 40]} size={[w - 20, 70, 46]} color="#e9e1cf" />
      <Box at={[x + 4, y, z + 86]} size={[w - 8, 82, 6]} color={iso.blue} />
      <Face points={[[x + w - 9.6, y + 20, z + 58], [x + w - 9.6, y + 56, z + 58], [x + w - 9.6, y + 56, z + 78], [x + w - 9.6, y + 20, z + 78]]} fill="#3d3446" />
    </g>
  )
}

/** Still water filling a rectangle on the floor, with a few ripples. */
export function Water({ at, w, d, color = '#7fa7b8', z = 0 }: { at: [number, number]; w: number; d: number; color?: string; z?: number }) {
  const [x, y] = at
  return (
    <g>
      <Face points={[[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]]} fill={color} />
      {[0.2, 0.45, 0.7].map((f, i) => (
        <Face key={i} points={[[x + w * (0.15 + i * 0.25), y + d * f, z + 0.3], [x + w * (0.3 + i * 0.25), y + d * f, z + 0.3], [x + w * (0.3 + i * 0.25), y + d * f + 2, z + 0.3], [x + w * (0.15 + i * 0.25), y + d * f + 2, z + 0.3]]} fill={tone(color, 0.3)} />
      ))}
    </g>
  )
}

/** A plain rectangle lying on the ground (road paint, a mat, a stain). */
export function Patch({ at, w, d, color, z = 0.3, opacity }: { at: [number, number]; w: number; d: number; color: string; z?: number; opacity?: number }) {
  const [x, y] = at
  return <Face points={[[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]]} fill={color} opacity={opacity} />
}

/** A small CCTV camera on a bracket, sticking out of a wall along +y (left wall) or +x (right wall). */
export function Camera({ at, wall, broken = false }: { at: V3; wall: 'L' | 'R'; broken?: boolean }) {
  const [x, y, z] = at
  return wall === 'L' ? (
    <g>
      <Box at={[x, y - 4, z]} size={[14, 8, 6]} color={iso.metal} />
      <Box at={[x + 8, y - 8, z - 10]} size={[30, 16, 14]} color="#eef1f4" />
      <Box at={[x + 37, y - 5, z - 7]} size={[2, 10, 8]} color={iso.ink} />
      {broken && <Box at={[x + 4, y - 1, z - 50]} size={[2, 2, 50]} color={iso.ink} />}
    </g>
  ) : (
    <g>
      <Box at={[x - 4, y, z]} size={[8, 14, 6]} color={iso.metal} />
      <Box at={[x - 8, y + 8, z - 10]} size={[16, 30, 14]} color="#eef1f4" />
      <Box at={[x - 5, y + 37, z - 7]} size={[10, 2, 8]} color={iso.ink} />
      {broken && <Box at={[x - 1, y + 4, z - 50]} size={[2, 2, 50]} color={iso.ink} />}
    </g>
  )
}
