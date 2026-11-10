import { useId } from 'react'
import { accent, ink } from './palette'

// A forensic photo print: the close-up is lit by a camera flash (bright centre,
// dark falloff), with an evidence tent, a scale ruler and the camera's orange
// date stamp. The close-up itself is a 400 x 300 drawing passed as children.

export function EvidencePhoto({
  children,
  marker,
  stamp,
  caption,
  showRuler = true,
  tilt = -1.5,
}: {
  children: React.ReactNode
  /** Number on the yellow evidence tent; omit for photos of things that aren't evidence. */
  marker?: string
  /** Camera date stamp, e.g. "15 07 '25  09:14". */
  stamp: string
  caption: string
  showRuler?: boolean
  tilt?: number
}) {
  const id = useId()
  return (
    <figure className="w-full" style={{ rotate: `${tilt}deg` }}>
      <div className="bg-[#f4ecdc] p-2 pb-1 shadow-[0_10px_24px_rgb(0_0_0/0.5)]">
        <svg viewBox="0 0 400 300" className="block w-full" role="img" aria-label={caption}>
          <defs>
            <radialGradient id={`${id}-flash`} cx="0.48" cy="0.45" r="0.7">
              <stop offset="0" stopColor="#fff6e0" stopOpacity="0.28" />
              <stop offset="0.45" stopColor="#fff6e0" stopOpacity="0" />
              <stop offset="1" stopColor={ink.night} stopOpacity="0.8" />
            </radialGradient>
            <filter id={`${id}-grain`}>
              <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0.4 0" />
            </filter>
            <clipPath id={`${id}-clip`}>
              <rect width="400" height="300" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-clip)`}>
            {children}
            {showRuler && (
              <g transform="translate(18 262)">
                <rect width="150" height="16" fill="#efe6c8" />
                {Array.from({ length: 16 }, (_, i) => (
                  <line key={i} x1={5 + i * 9} y1="0" x2={5 + i * 9} y2={i % 5 === 0 ? 9 : 5} stroke={ink.night} strokeWidth="1" />
                ))}
                <text x="146" y="13" textAnchor="end" fontSize="6" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
                  cm
                </text>
              </g>
            )}
            {marker && (
              <g transform="translate(330 214)">
                <polygon points="0,40 14,0 40,0 54,40" fill="#f2c230" />
                <polygon points="40,0 54,40 60,34 46,0" fill="#b88d16" />
                <text x="27" y="31" textAnchor="middle" fontSize="22" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">
                  {marker}
                </text>
              </g>
            )}
            <rect width="400" height="300" fill={`url(#${id}-flash)`} />
            <rect width="400" height="300" filter={`url(#${id}-grain)`} opacity="0.45" />
            <text x="388" y="290" textAnchor="end" fontSize="13" fill={accent.ember} fontFamily="IBM Plex Mono, monospace" opacity="0.9">
              {stamp}
            </text>
          </g>
        </svg>
        <figcaption className="px-1 pt-1 font-mono text-xs text-[#3a2a20]">{caption}</figcaption>
      </div>
    </figure>
  )
}
