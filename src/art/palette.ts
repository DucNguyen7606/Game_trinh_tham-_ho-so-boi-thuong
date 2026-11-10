// One palette for every drawing in the game: Saigon at night, after the rain.
// Muted blues and greys, with warm accents reserved for light, fire and evidence.
export const ink = {
  night: '#1c130f', // deepest shadow: dark walnut
  slate: '#2d1f18', // walls in shadow
  steel: '#4a3326', // mid-tone surfaces
  dusk: '#6e4c34', // lamp-lit surfaces
  fog: '#c4a27a', // warm haze, rain under street lamps
  bone: '#f3e4c4', // paper highlight
  paper: '#e7d2a8', // aged documents, manila
}

export const accent = {
  amber: '#f2a93b', // lamps, bulbs: the light that makes scenes warm
  rust: '#c4552d', // fire damage, the game's main accent
  ember: '#ff8a3d', // glowing embers
  teal: '#3f8a7e', // jade green: Saigon shutters and neon, the one cool note
  red: '#b23a2e', // the red string, stamps
  gold: '#d9b04f', // jewellery
}

export const skinTones = ['#efc39b', '#d9a47a', '#b9815a', '#8f5f3d'] as const

export const hairColors = {
  black: '#1a1a1f',
  brown: '#4a3426',
  gray: '#7d7a76',
  white: '#cfccc6',
} as const

export const clothColors = {
  white: '#ece2cf',
  navy: '#2f4258',
  olive: '#6b6a35',
  maroon: '#7d2f2a',
  khaki: '#b0925c',
  charcoal: '#3a332f',
  sky: '#7a9fb0',
  mustard: '#cf9a32',
} as const

/** Darken (amount < 0) or lighten (amount > 0) a hex colour. Used for flat shadow planes. */
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount)))
  const r = ch(n >> 16), g = ch((n >> 8) & 0xff), b = ch(n & 0xff)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
