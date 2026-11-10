// One palette for every drawing in the game: Saigon at night, after the rain.
// Muted blues and greys, with warm accents reserved for light, fire and evidence.
export const ink = {
  night: '#12151c', // deepest shadow, outlines
  slate: '#222836', // walls in shadow
  steel: '#363e50', // mid-tone surfaces
  dusk: '#4f5a70', // lit surfaces
  fog: '#8a93a6', // distant light, rain
  bone: '#e6dcc6', // paper, light skin highlights
  paper: '#d9cdb2', // aged documents
}

export const accent = {
  amber: '#d9a03f', // street lamps, bulbs
  rust: '#b4552e', // fire damage, rust, the game's main accent
  ember: '#e07a3c', // glowing embers
  teal: '#3e7e84', // neon signs, rain sheen
  red: '#a3302a', // the red string, stamps
  gold: '#c8a24a', // jewellery
}

export const skinTones = ['#e0b896', '#c99a77', '#a87a58', '#87603f'] as const

export const hairColors = {
  black: '#1a1a1f',
  brown: '#4a3426',
  gray: '#7d7a76',
  white: '#cfccc6',
} as const

export const clothColors = {
  white: '#d8d4ca',
  navy: '#2e3a56',
  olive: '#5b5f3a',
  maroon: '#6b2f2f',
  khaki: '#a08a5c',
  charcoal: '#33363d',
  sky: '#6f8fae',
  mustard: '#b98f35',
} as const

/** Darken (amount < 0) or lighten (amount > 0) a hex colour. Used for flat shadow planes. */
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount)))
  const r = ch(n >> 16), g = ch((n >> 8) & 0xff), b = ch(n & 0xff)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
