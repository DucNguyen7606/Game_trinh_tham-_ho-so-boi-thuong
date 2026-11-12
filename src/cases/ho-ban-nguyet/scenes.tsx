import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 11, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  sky: '#1d2740',
  skyLow: '#2c3a58',
  tower: '#2f3c58',
  towerDark: '#222c44',
  lake: '#2f5468',
  lakeLight: '#5e8aa0',
  deck: '#7a5236',
  deckDark: '#55381f',
  glass: '#9fc2d0',
  steel: '#c9ccd0',
  wall: '#d8cbb4',
  wallDark: '#b3a389',
  leaf: '#4f7d4a',
  leafDark: '#355a33',
  pot: '#b0623a',
  soil: '#4a3426',
  sofa: '#6b3a2a',
  wood: '#8a5a3a',
  woodDark: '#5e3b24',
  screen: '#7fe0c4',
  grass: '#4c6e3e',
  grassDark: '#3a5730',
  concrete: '#8f8d86',
  container1: '#b23a2e',
  container2: '#3f6aa8',
  container3: '#cf9a32',
  navy: '#2f4258',
  bike: '#c0392b',
  paint: '#f2f2ee',
}

/** Distant Phú Mỹ Hưng towers with lit windows, across the lake. */
export function Skyline({ y = 420, w = 1600, seed = 3 }: { y?: number; w?: number; seed?: number }) {
  const n = Math.round(w / 90)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const h = 120 + ((i * 53 + seed * 17) % 160)
        const x = i * 90 + ((i * 29) % 30)
        return (
          <g key={i}>
            <rect x={x} y={y - h} width="70" height={h} fill={i % 2 ? C.tower : C.towerDark} />
            {Array.from({ length: Math.floor(h / 30) }, (_, r) =>
              [0, 1, 2].map((c) =>
                (r * 3 + c + i + seed) % 4 === 0 ? null : (
                  <rect key={`${r}-${c}`} x={x + 10 + c * 20} y={y - h + 12 + r * 30} width="8" height="10" fill={accent.amber} opacity={(r + c + i) % 3 === 0 ? 0.85 : 0.35} />
                ),
              ),
            )}
          </g>
        )
      })}
    </g>
  )
}

/** The lake with the arched footbridge and light reflections. */
export function Lake({ y = 420, h = 160, w = 1600 }: { y?: number; h?: number; w?: number }) {
  return (
    <g>
      <rect x="0" y={y} width={w} height={h} fill={C.lake} />
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={(i * 71) % w} y={y + 10 + ((i * 23) % (h - 20))} width={30 + (i % 4) * 12} height="3" fill={C.lakeLight} opacity="0.5" />
      ))}
      <path d={`M${w * 0.35},${y + 40} Q${w * 0.5},${y - 30} ${w * 0.65},${y + 40}`} stroke="#e8e0c8" strokeWidth="6" fill="none" opacity="0.7" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={w * 0.37 + i * w * 0.0325} cy={y + 40 - Math.sin((i / 8) * Math.PI) * 52} r="4" fill="#ffe7b8" />
      ))}
    </g>
  )
}

/** A potted areca palm; `fallen` tips it over with soil spilled. */
export function PottedPalm({ x, y, s = 1, fallen = false }: { x: number; y: number; s?: number; fallen?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${fallen ? 72 : 0})`}>
      <g {...O}>
        <path d="M-40,0 L40,0 L30,-80 L-30,-80 Z" fill={C.pot} transform="rotate(180 0 -40)" />
        {[-50, -20, 10, 40].map((a, i) => (
          <path key={i} d={`M0,-80 Q${a},-170 ${a * 2.2},-${200 + (i % 2) * 30}`} stroke={C.leafDark} strokeWidth="5" fill="none" />
        ))}
        {[-60, -25, 15, 50].map((a, i) => (
          <ellipse key={i} cx={a * 1.6} cy={-180 - (i % 2) * 20} rx="40" ry="14" fill={C.leaf} transform={`rotate(${a} ${a * 1.6} ${-180 - (i % 2) * 20})`} />
        ))}
      </g>
    </g>
  )
}

/** A navy staff jacket on a hanger. (x, y) is the hook. */
export function Jacket({ x, y, s = 1, torn = true }: { x: number; y: number; s?: number; torn?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <path d="M0,0 l0,16 M-40,30 L0,16 L40,30" fill="none" strokeWidth={3} />
      <path d="M-46,30 L46,30 L58,200 L30,200 L28,90 L22,240 L-22,240 L-28,90 L-30,200 L-58,200 Z" fill={C.navy} />
      <path d="M0,34 L0,240" stroke={shade(C.navy, -0.4)} strokeWidth="3" />
      <rect x="-20" y="60" width="16" height="10" fill="#e8e0c8" strokeWidth={1.5} />
      {torn && <path d="M32,186 l8,8 -6,4 10,6" stroke="#9fb4c8" strokeWidth="2.5" fill="none" />}
      {/* drips: still damp */}
      {[-10, 10, 30].map((dx, i) => (
        <ellipse key={i} cx={dx} cy={252 + i * 6} rx="3" ry="5" fill="#9fc2d0" strokeWidth={1} />
      ))}
    </g>
  )
}

/** A red step-through motorbike, side view. (x, y) is the ground under the rear wheel. */
export function Bike({ x, y, s = 1, plate = true }: { x: number; y: number; s?: number; plate?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <circle cx="0" cy="-34" r="34" fill="#222" />
      <circle cx="0" cy="-34" r="14" fill={C.steel} />
      <circle cx="170" cy="-34" r="34" fill="#222" />
      <circle cx="170" cy="-34" r="14" fill={C.steel} />
      <path d="M-10,-70 L60,-70 L90,-40 L130,-40 L150,-110 L170,-34" fill="none" strokeWidth="6" stroke={LINE} />
      <path d="M-30,-60 Q-10,-110 60,-104 L70,-74 L-20,-60 Z" fill={C.bike} />
      <path d="M130,-60 L156,-130 L180,-126 L168,-56 Z" fill={C.bike} />
      <rect x="-10" y="-118" width="80" height="16" rx="8" fill="#1a1a1f" />
      <path d="M150,-140 l40,-6" strokeWidth="6" />
      {plate && <rect x="-46" y="-78" width="30" height="20" fill="#f2f2ee" strokeWidth={1.5} />}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Balcony of 21.05 over the lake

function Balcony() {
  return (
    <Frame label="Ban công tầng 21 nhìn xuống hồ Bán Nguyệt, lan can kính">
      <rect width="1600" height="900" fill={C.sky} />
      <rect y="250" width="1600" height="200" fill={C.skyLow} opacity="0.6" />
      <Skyline y={440} />
      <Lake y={440} h={180} />
      <Glow x={900} y={380} r={700} o={0.12} color="#9fb4c8" />

      {/* Deck floor */}
      <path d="M0,640 L1600,640 L1600,900 L0,900 Z" fill={C.deck} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="0" y1={660 + i * 28} x2="1600" y2={660 + i * 28} stroke={C.deckDark} strokeWidth="3" />
      ))}
      {/* Scuff marks dragged toward the rail */}
      <path d="M520,770 Q640,720 820,660" stroke="#111" strokeWidth="6" fill="none" opacity="0.7" />
      <path d="M560,800 Q680,740 860,670" stroke="#111" strokeWidth="5" fill="none" opacity="0.6" />

      {/* Wall and sliding door on the left */}
      <rect x="0" y="0" width="300" height="640" fill={C.wall} {...O} />
      <rect x="20" y="80" width="220" height="560" fill={C.glass} opacity="0.4" {...O} />
      <Glow x={130} y={400} r={260} o={0.35} />
      {/* Folded chairs against the wall (hotspot ghe 160,558) */}
      <g {...O}>
        {[120, 170].map((x) => (
          <g key={x}>
            <rect x={x} y="440" width="14" height="200" fill={C.steel} />
            <rect x={x - 10} y="470" width="34" height="140" rx="4" fill={C.woodDark} />
          </g>
        ))}
      </g>

      {/* Glass rail (hotspot lan-can 928,522) */}
      <rect x="300" y="390" width="1300" height="250" fill={C.glass} opacity="0.22" />
      <rect x="300" y="384" width="1300" height="14" rx="6" fill={C.steel} {...O} />
      {[300, 620, 940, 1260, 1580].map((x) => (
        <rect key={x} x={x - 6} y="384" width="12" height="256" fill={C.steel} {...O} strokeWidth={2} />
      ))}
      <text x="980" y="420" fontSize="16" fontWeight="700" fill="#f3e4c4" opacity="0.8" fontFamily="IBM Plex Mono, monospace">1,4 m</text>
      <path d="M960,398 L960,636" stroke="#f3e4c4" strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />

      {/* Fallen palm (hotspot chau-cay 448,666) */}
      <PottedPalm x={420} y={700} s={0.9} fallen />
      <path d="M420,700 Q520,700 640,690" stroke={C.soil} strokeWidth="18" fill="none" strokeLinecap="round" />

      {/* Small table with ashtray (hotspot gat-tan 1216,594) */}
      <g {...O}>
        <ellipse cx="1220" cy="560" rx="90" ry="22" fill={C.steel} />
        <rect x="1214" y="560" width="12" height="100" fill={C.steel} />
        <ellipse cx="1190" cy="550" rx="24" ry="8" fill="#555" />
        <rect x="1240" y="526" width="26" height="30" rx="3" fill="#e9dccb" />
      </g>

      {/* Slippers (hotspot dep 752,792) */}
      <g {...O} strokeWidth={2}>
        <ellipse cx="760" cy="790" rx="40" ry="16" fill="#3a5a8a" transform="rotate(-20 760 790)" />
        <ellipse cx="250" cy="820" rx="40" ry="16" fill="#3a5a8a" transform="rotate(160 250 820)" />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Living room

function LivingRoom() {
  return (
    <Frame label="Phòng khách căn 21.05: sofa da, bàn làm việc bên cửa sổ, hai ly rượu">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="730" width="1600" height="170" fill="#b8a688" />
      <Bulb x={760} y={70} />
      <Glow x={760} y={380} r={620} o={0.25} />

      {/* Front door with intercom (hotspot man-hinh-cua 144,414) */}
      <g {...O}>
        <rect x="40" y="180" width="200" height="550" fill={C.woodDark} />
        <rect x="110" y="360" width="70" height="110" rx="8" fill="#1f2328" />
        <rect x="120" y="372" width="50" height="40" rx="3" fill="#10241f" strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={128 + i * 17} cy="440" r="6" fill="#8a96a0" strokeWidth={1} />
        ))}
      </g>
      <text x="145" y="398" textAnchor="middle" fontSize="11" fill={C.screen} fontFamily="IBM Plex Mono, monospace">B2</text>

      {/* Shelf with photos (hotspot ke-anh 480,306) */}
      <g {...O}>
        <rect x="360" y="330" width="260" height="16" fill={C.wood} />
        <rect x="390" y="250" width="90" height="80" fill="#f3e4c4" />
        <rect x="400" y="260" width="70" height="60" fill="#7a9fb0" strokeWidth={1.5} />
        <rect x="510" y="268" width="60" height="62" fill="#f3e4c4" />
        <rect x="518" y="276" width="44" height="46" fill="#ece2cf" strokeWidth={1.5} />
      </g>

      {/* Sofa and coffee table with two glasses (hotspot ly-ruou 720,648) */}
      <g {...O}>
        <rect x="320" y="520" width="380" height="170" rx="30" fill={C.sofa} />
        <rect x="560" y="660" width="340" height="30" fill={C.woodDark} />
        <rect x="580" y="690" width="16" height="40" fill={C.woodDark} />
        <rect x="864" y="690" width="16" height="40" fill={C.woodDark} />
        <path d="M640,660 L630,560 L660,560 L650,660 Z" fill="#c49a62" opacity="0.85" />
        <rect x="630" y="540" width="30" height="24" fill="#2a2f35" />
        <path d="M690,660 L684,620 L712,620 L706,660 Z" fill="#f2f2ee" opacity="0.7" />
        <rect x="686" y="640" width="24" height="14" fill="#c4802a" opacity="0.8" strokeWidth={0} />
        <rect x="740" y="644" width="80" height="16" rx="3" fill={C.steel} />
        <path d="M760,644 L756,610 L784,610 L780,644 Z" fill="#f2f2ee" opacity="0.9" />
      </g>

      {/* Window and desk (hotspot ban-lam-viec 1184,522) */}
      <g>
        <clipPath id="hbn-window">
          <rect x="960" y="140" width="460" height="320" />
        </clipPath>
        <rect x="960" y="140" width="460" height="320" fill={C.sky} {...O} />
        <g clipPath="url(#hbn-window)">
          <g transform="translate(960 0)">
            <Skyline y={470} w={460} seed={5} />
          </g>
        </g>
        <rect x="1188" y="140" width="8" height="320" fill={LINE} />
      </g>
      <g {...O}>
        <rect x="980" y="520" width="420" height="22" fill={C.woodDark} />
        <rect x="1000" y="542" width="18" height="190" fill={C.woodDark} />
        <rect x="1362" y="542" width="18" height="190" fill={C.woodDark} />
        <rect x="1060" y="490" width="120" height="30" fill={accent.amber} opacity="0.8" />
        <rect x="1200" y="494" width="110" height="26" fill="#fbf4e4" transform="rotate(-4 1255 507)" />
      </g>

      {/* Packed suitcase (hotspot vali 1440,702) */}
      <g {...O}>
        <rect x="1400" y="580" width="140" height="160" rx="12" fill="#3f8a7e" />
        <path d="M1440,580 L1440,550 L1500,550 L1500,580" fill="none" strokeWidth="5" />
        <rect x="1470" y="600" width="44" height="22" fill="#f3e4c4" strokeWidth={1.5} transform="rotate(8 1492 611)" />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Garden under the tower and the parking ramps

function Garden() {
  return (
    <Frame label="Thảm cỏ dưới chân tòa B, chòi bảo vệ và lối xuống hầm xe">
      <rect width="1600" height="900" fill={C.sky} />
      <Skyline y={360} seed={7} />
      <Lake y={360} h={110} />
      {/* Tower wall on the right edge rising up */}
      <rect x="1460" y="0" width="140" height="640" fill={C.wallDark} {...O} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="1480" y={20 + i * 76} width="100" height="40" fill={i === 2 ? accent.amber : C.towerDark} opacity="0.8" />
      ))}
      {/* Grass and path */}
      <rect y="470" width="1600" height="430" fill={C.grass} />
      <path d="M0,620 L1600,560 L1600,640 L0,720 Z" fill={C.concrete} opacity="0.8" />
      <Glow x={700} y={600} r={560} o={0.18} />

      {/* Guard booth (hotspot choi-bao-ve 224,504) */}
      <g {...O}>
        <rect x="100" y="380" width="250" height="260" fill="#e6dcc8" />
        <rect x="90" y="360" width="270" height="30" fill={C.woodDark} />
        <rect x="130" y="420" width="190" height="100" fill={accent.amber} opacity="0.6" />
        <rect x="200" y="540" width="80" height="50" fill="#e7d2a8" strokeWidth={2} />
      </g>
      <text x="225" y="410" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">BẢO VỆ</text>

      {/* Police paint ring on the grass (hotspot diem-roi 736,702) */}
      <ellipse cx="740" cy="720" rx="150" ry="44" fill="none" stroke={C.paint} strokeWidth="6" strokeDasharray="20 10" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${640 + i * 22},${700 + (i % 3) * 14} l6,-12 6,12`} stroke={C.grassDark} strokeWidth="3" fill="none" />
      ))}

      {/* Car ramp camera (hotspot cong-ham-oto 992,450) */}
      <g {...O}>
        <rect x="900" y="470" width="200" height="90" fill="#3a3a3a" />
        <rect x="960" y="420" width="60" height="26" rx="6" fill="#f2f2ee" />
        <circle cx="1022" cy="433" r="7" fill={ink.night} />
      </g>
      <text x="1000" y="530" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f3e4c4" fontFamily="Barlow Condensed, sans-serif">HẦM Ô TÔ B1</text>

      {/* Motorbike ramp B2 with ticket machine (hotspot ve-xe 1280,504) */}
      <g {...O}>
        <rect x="1180" y="480" width="260" height="110" fill="#2a2a2a" />
        <rect x="1240" y="420" width="50" height="130" fill="#d9b04f" />
        <rect x="1250" y="436" width="30" height="24" fill="#10241f" strokeWidth={1.5} />
        <rect x="1290" y="470" width="150" height="10" fill={accent.red} />
      </g>
      <text x="1360" y="560" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f3e4c4" fontFamily="Barlow Condensed, sans-serif">XE MÁY B2</text>

      {/* Flower bed (hotspot bon-hoa 448,774) */}
      <g {...O}>
        <rect x="300" y="760" width="320" height="60" rx="10" fill={C.wallDark} />
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={320 + i * 36} cy="756" r="14" fill={i % 2 ? '#d85a8a' : '#f0e0ea'} strokeWidth={1.5} />
        ))}
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Mezzanine office in Tân Thuận port

function PortOffice() {
  return (
    <Frame label="Văn phòng kho ở cảng Tân Thuận, nhìn ra dãy container và bãi xe máy">
      <rect width="1600" height="900" fill="#c9c2b2" />
      <rect y="740" width="1600" height="160" fill="#6f6d67" />
      <Bulb x={760} y={90} />
      <Glow x={760} y={380} r={560} o={0.3} />
      <Beam x={760} y={100} w={700} h={640} o={0.12} />

      {/* Door with the damp jacket (hotspot ao-khoac 256,414) */}
      <rect x="140" y="160" width="240" height="580" fill={C.woodDark} {...O} />
      <circle cx="350" cy="460" r="10" fill={C.steel} {...O} />
      <Jacket x={256} y={230} s={1} />

      {/* Filing cabinet (hotspot tu-chung-tu 608,522) */}
      <g {...O}>
        <rect x="520" y="360" width="180" height="380" fill="#7d868c" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="540" y={380 + i * 120} width="140" height="100" fill="#8f979c" strokeWidth={2} />
            <rect x="590" y={420 + i * 120} width="40" height="10" fill={C.steel} strokeWidth={1.5} />
          </g>
        ))}
        <path d="M622,424 l10,-8" stroke={accent.red} strokeWidth="2" />
      </g>

      {/* Desk with gate log (hotspot so-cong 864,558) */}
      <g {...O}>
        <rect x="740" y="560" width="300" height="22" fill={C.wood} />
        <rect x="760" y="582" width="18" height="158" fill={C.woodDark} />
        <rect x="1000" y="582" width="18" height="158" fill={C.woodDark} />
        <rect x="800" y="524" width="120" height="36" fill="#e7d2a8" transform="rotate(-3 860 542)" />
      </g>
      <text x="860" y="547" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily="IBM Plex Mono, monospace" transform="rotate(-3 860 542)">SỔ CỔNG</text>

      {/* Shift whiteboard (hotspot bang-ca 1120,252) */}
      <g {...O}>
        <rect x="1000" y="150" width="250" height="160" fill="#f6f4ee" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="1020" y={178 + i * 30} width={200 - (i % 2) * 50} height="6" fill={i === 3 ? accent.red : '#3f6aa8'} opacity="0.7" strokeWidth={0} />
        ))}
      </g>

      {/* Window over the container yard and bike lot (hotspot xe-may 1376,594) */}
      <g>
        <rect x="1100" y="380" width="460" height="340" fill={C.sky} {...O} />
        {[C.container1, C.container2, C.container3, C.container2].map((c, i) => (
          <rect key={i} x={1110 + i * 110} y={420 + (i % 2) * 40} width="100" height="90" fill={c} stroke={LINE} strokeWidth="2" />
        ))}
        <rect x="1100" y="600" width="460" height="120" fill="#555" />
        <Bike x={1300} y={700} s={0.55} />
        <Bike x={1440} y={700} s={0.5} plate={false} />
        <rect x="1326" y="380" width="8" height="340" fill={LINE} />
      </g>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'ban-cong': Balcony,
  'phong-khach': LivingRoom,
  'san-duoi': Garden,
  'van-phong-cang': PortOffice,
}

export { LINE }
