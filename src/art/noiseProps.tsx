import { ink } from '@/art/palette'

// Small props drawn into a scene for the extra hotspots that lead nowhere or
// mislead. Each one is centred on (x, y) in the 1600 x 900 scene frame, so it
// sits under the hotspot placed at the same spot in case.json (percent).

const O = { stroke: ink.night, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

type P = { x: number; y: number; color?: string }

/** A cheap plastic lighter lying on its side. */
export function Lighter({ x, y, color = '#d8473a' }: P) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-18)`}>
      <ellipse cx="0" cy="22" rx="40" ry="8" fill="#000" opacity="0.25" />
      <rect x="-30" y="-10" width="52" height="24" rx="6" fill={color} {...O} />
      <rect x="22" y="-8" width="16" height="20" rx="3" fill="#b9b4aa" {...O} />
      <rect x="-22" y="-4" width="34" height="10" rx="2" fill="#f3e4c4" opacity="0.8" />
    </g>
  )
}

/** A wall socket blackened by a short, with a melted plug cord. */
export function BurntSocket({ x, y }: P) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="70" ry="54" fill="#140f0d" opacity="0.55" />
      <rect x="-30" y="-24" width="60" height="48" rx="6" fill="#d9d0bf" {...O} />
      <path d="M-30,-24 h60 v20 q-30,14 -60,0 Z" fill="#2a1d18" opacity="0.8" />
      <circle cx="-10" cy="4" r="4" fill={ink.night} />
      <circle cx="10" cy="4" r="4" fill={ink.night} />
      <path d="M10,24 q10,40 -20,60 q-24,16 -10,46" fill="none" stroke="#2a1d18" strokeWidth="7" strokeLinecap="round" />
    </g>
  )
}

/** A 5-litre plastic jerrycan with a shop sticker. */
export function Jerrycan({ x, y, color = '#c9452d' }: P) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="54" rx="60" ry="10" fill="#000" opacity="0.3" />
      <path d="M-44,-40 h70 l18,18 v72 h-88 Z" fill={color} {...O} />
      <rect x="18" y="-58" width="20" height="18" rx="3" fill="#2a2a2a" {...O} />
      <path d="M-34,-40 v-12 h34 v12" fill="none" {...O} />
      <rect x="-32" y="0" width="52" height="30" rx="3" fill="#f3e4c4" {...O} strokeWidth={2} />
      <path d="M-24,10 h36 M-24,20 h24" stroke={ink.night} strokeWidth="3" />
    </g>
  )
}

/** A folded paper or receipt, tucked or dropped. */
export function Paper({ x, y, color = '#f1e6cf' }: P) {
  return (
    <g transform={`translate(${x} ${y}) rotate(8)`}>
      <ellipse cx="4" cy="30" rx="50" ry="8" fill="#000" opacity="0.2" />
      <path d="M-40,-28 h70 l10,10 v46 h-80 Z" fill={color} {...O} />
      <path d="M-30,-14 h50 M-30,-2 h56 M-30,10 h40" stroke="#7a6a58" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

/** A crumpled cigarette pack. */
export function CigPack({ x, y, color = '#c9a44a' }: P) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-12)`}>
      <ellipse cx="0" cy="24" rx="34" ry="7" fill="#000" opacity="0.25" />
      <path d="M-22,-26 h44 l-3,46 h-38 Z" fill={color} {...O} />
      <path d="M-22,-12 h44" stroke={ink.night} strokeWidth="2.5" />
      <rect x="-10" y="-4" width="20" height="12" rx="2" fill="#f3e4c4" opacity="0.85" />
    </g>
  )
}

/** A small cardboard box with tape. */
export function Box({ x, y, color = '#a8794a' }: P) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="44" rx="74" ry="10" fill="#000" opacity="0.28" />
      <rect x="-60" y="-30" width="120" height="72" rx="3" fill={color} {...O} />
      <path d="M-60,-30 l20,-18 h120 l-20,18" fill={color} {...O} opacity="0.9" />
      <rect x="-8" y="-30" width="16" height="72" fill="#d8c89a" opacity="0.8" />
    </g>
  )
}

/** A bottle standing up. */
export function Bottle({ x, y, color = '#3f6b3a' }: P) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="44" rx="26" ry="6" fill="#000" opacity="0.25" />
      <path d="M-14,-10 q0,-14 8,-20 v-18 h12 v18 q8,6 8,20 v52 h-28 Z" fill={color} {...O} />
      <rect x="-12" y="8" width="24" height="18" fill="#f3e4c4" opacity="0.8" />
    </g>
  )
}

/** A dropped phone or card, face down. */
export function Card({ x, y, color = '#3c6d8a' }: P) {
  return (
    <g transform={`translate(${x} ${y}) rotate(14)`}>
      <ellipse cx="0" cy="18" rx="40" ry="6" fill="#000" opacity="0.2" />
      <rect x="-32" y="-18" width="64" height="38" rx="5" fill={color} {...O} />
      <rect x="-24" y="-10" width="18" height="12" rx="2" fill="#d9b44a" />
    </g>
  )
}
