import { useId } from 'react'
import { accent, ink, shade } from '@/art/palette'
import { rng } from '@/art/primitives'
import { BurntSocket, Jerrycan, Lighter, Paper } from '@/art/noiseProps'

// Backdrops for the four zones, in the soft flat style of the portraits:
// rounded shapes, a thin ink outline, one shadow tone and pools of lamp light.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

const LINE = ink.night
const O = { stroke: LINE, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

const C = {
  sky: '#26232b',
  skyLow: '#3a2f33',
  wall: '#5a4134',
  wallDark: '#3e2c24',
  wallLit: '#8a6448',
  floor: '#3a2b23',
  floorLit: '#6b4c36',
  metal: '#6f7477',
  metalDark: '#4b5054',
  wood: '#7a4f32',
  woodDark: '#573721',
  soot: '#1f1714',
  plastic: '#c4452d',
  water: '#4f6f72',
  leaf: '#4f7a4a',
}

/** Shared frame: soft colour grade and vignette, lighter than the old grainy look. */
function SoftFrame({ children, label }: { children: React.ReactNode; label: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.48" r="0.78">
          <stop offset="0.6" stopColor={ink.night} stopOpacity="0" />
          <stop offset="1" stopColor={ink.night} stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {children}
      <rect width="1600" height="900" fill={accent.amber} opacity="0.06" style={{ mixBlendMode: 'overlay' }} />
      <rect width="1600" height="900" fill={`url(#${id}-vig)`} />
    </svg>
  )
}

/** Warm pool of light under a lamp. */
function Glow({ x, y, r, o = 0.5, color = accent.amber }: { x: number; y: number; r: number; o?: number; color?: string }) {
  const id = useId()
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={color} stopOpacity={o} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  )
}

function Beam({ x, y, w, h, o = 0.28 }: { x: number; y: number; w: number; h: number; o?: number }) {
  const id = useId()
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd98f" stopOpacity={o} />
          <stop offset="1" stopColor="#ffd98f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${x - 10},${y} L${x + 10},${y} L${x + w / 2},${y + h} Q${x},${y + h + 20} ${x - w / 2},${y + h} Z`} fill={`url(#${id})`} />
    </g>
  )
}

function Bulb({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 28},${y} Q${x},${y - 30} ${x + 28},${y} Z`} fill={ink.night} {...O} />
      <circle cx={x} cy={y + 6} r="9" fill="#fff1c9" />
    </g>
  )
}

function Rain({ seed = 7, count = 110 }: { seed?: number; count?: number }) {
  const r = rng(seed)
  return (
    <g stroke="#cdbfa8" strokeWidth="2" strokeLinecap="round" opacity="0.28">
      {Array.from({ length: count }, (_, i) => {
        const x = r() * 1700 - 50, y = r() * 900, l = 18 + r() * 26
        return <line key={i} x1={x} y1={y} x2={x - l * 0.2} y2={y + l} />
      })}
    </g>
  )
}

function Puddle({ x, y, w, o = 0.5 }: { x: number; y: number; w: number; o?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={w / 12} fill={C.water} opacity={o} />
      <path d={`M${x - w / 4},${y - 2} Q${x},${y - 6} ${x + w / 5},${y - 2}`} stroke="#d9e3dd" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
    </g>
  )
}

function Stool({ x, y, c = C.plastic }: { x: number; y: number; c?: string }) {
  return (
    <g {...O}>
      <path d={`M${x - 34},${y - 60} L${x + 34},${y - 60} L${x + 28},${y} L${x - 28},${y} Z`} fill={shade(c, -0.15)} />
      <rect x={x - 40} y={y - 72} width="80" height="16" rx="6" fill={c} />
      <path d={`M${x - 14},${y - 40} h28`} stroke={shade(c, -0.35)} />
    </g>
  )
}

/** Soft soot stain rising from a base point. */
function Soot({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g fill={C.soot}>
      <path d={`M${x - w * 0.18},${y} C${x - w * 0.5},${y - h * 0.4} ${x - w * 0.55},${y - h * 0.8} ${x - w * 0.38},${y - h} C${x - w * 0.2},${y - h * 0.82} ${x - w * 0.05},${y - h * 0.95} ${x},${y - h * 0.82} C${x + w * 0.08},${y - h * 0.98} ${x + w * 0.3},${y - h * 0.86} ${x + w * 0.42},${y - h} C${x + w * 0.56},${y - h * 0.75} ${x + w * 0.45},${y - h * 0.4} ${x + w * 0.18},${y} Z`} opacity="0.8" />
      <path d={`M${x - w * 0.1},${y} C${x - w * 0.3},${y - h * 0.4} ${x - w * 0.3},${y - h * 0.6} ${x},${y - h * 0.68} C${x + w * 0.3},${y - h * 0.6} ${x + w * 0.3},${y - h * 0.4} ${x + w * 0.1},${y} Z`} fill="#0e0a08" opacity="0.7" />
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Gate and the guard hut

function Gate() {
  return (
    <SoftFrame label="Cổng kho và chòi bảo vệ trong đêm mưa">
      <rect width="1600" height="900" fill={C.sky} />
      {/* Far rooftops with a few lit windows */}
      <path d="M0,200 L0,120 L120,120 L120,80 L260,80 L260,140 L420,140 L420,60 L560,60 L560,150 L760,150 L760,100 L900,100 L900,160 L1100,160 L1100,70 L1260,70 L1260,130 L1420,130 L1420,90 L1600,90 L1600,200 Z" fill={C.skyLow} />
      {[[170, 100], [460, 90], [500, 90], [1150, 100], [1200, 100], [1480, 110]].map(([x, y]) => (
        <rect key={`${x}`} x={x} y={y} width="22" height="16" rx="3" fill={accent.amber} opacity="0.55" />
      ))}
      {/* Ground */}
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.floor} />
      <path d="M0,700 L1600,700 L1600,712 L0,712 Z" fill={shade(C.floor, -0.25)} />

      {/* Warehouse front with its rolling shutter */}
      <rect x="740" y="190" width="620" height="512" fill={C.wall} {...O} />
      <rect x="780" y="250" width="300" height="452" rx="4" fill={C.metal} {...O} />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1="784" x2="1076" y1={272 + i * 24} y2={272 + i * 24} stroke={C.metalDark} strokeWidth="4" />
      ))}
      <path d="M780,250 h300 v34 h-300 Z" fill={C.metalDark} {...O} />
      <rect x="840" y="208" width="190" height="34" rx="6" fill={accent.teal} {...O} />
      <text x="935" y="232" textAnchor="middle" fontSize="20" fontWeight="700" fill="#e9f1ec" fontFamily="Barlow Condensed, sans-serif">
        KHO VẢI THỊNH PHÁT
      </text>
      {/* Laundry line and the wall fan (hotspot cong-quat at 1120,360) */}
      <path d="M1090,230 Q1220,260 1350,226" fill="none" stroke={LINE} strokeWidth="2" />
      <rect x="1140" y="236" width="44" height="50" rx="4" fill={accent.teal} {...O} />
      <rect x="1220" y="244" width="40" height="44" rx="4" fill={accent.rust} {...O} />
      <rect x="1104" y="404" width="34" height="12" rx="3" fill={C.woodDark} {...O} />
      <circle cx="1120" cy="360" r="44" fill="#d8cdb6" {...O} />
      <circle cx="1120" cy="360" r="34" fill="none" stroke={LINE} strokeWidth="2" opacity="0.6" />
      <path d="M1120,360 L1150,340 L1144,330 Z M1120,360 L1094,384 L1104,392 Z" fill={C.metalDark} stroke={LINE} strokeWidth="2" />
      <circle cx="1120" cy="360" r="7" fill={LINE} />
      {/* Electric meters and wires */}
      {[1200, 1260].map((x) => (
        <g key={x}>
          <rect x={x} y="440" width="46" height="62" rx="6" fill="#cfc6b2" {...O} />
          <rect x={x + 8} y="452" width="30" height="16" rx="2" fill={accent.teal} opacity="0.7" />
        </g>
      ))}
      <path d="M1220,440 C1220,380 1300,360 1360,330 M1282,440 C1290,400 1340,380 1360,360" fill="none" stroke={LINE} strokeWidth="3" />

      {/* Street lamp light over the gate */}
      <Beam x={1000} y={160} w={560} h={560} o={0.18} />

      {/* Guard hut */}
      <Glow x={470} y={410} r={300} o={0.45} />
      <rect x="220" y="250" width="480" height="452" rx="10" fill={C.wallDark} {...O} />
      <path d="M196,250 Q460,196 724,250 L724,272 L196,272 Z" fill={C.metal} {...O} />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={214 + i * 36} x2={214 + i * 36} y1="230" y2="270" stroke={C.metalDark} strokeWidth="3" opacity="0.8" />
      ))}
      {/* Lit window with its counter */}
      <rect x="252" y="300" width="416" height="236" rx="8" fill="#e9b766" {...O} />
      <rect x="252" y="300" width="416" height="236" rx="8" fill="#f6d79a" opacity="0.4" />
      <path d="M252,300 L360,300 L300,536 L252,536 Z" fill="#fff0c9" opacity="0.25" />
      <Bulb x={460} y={318} />
      <Beam x={460} y={326} w={360} h={210} o={0.35} />
      {/* Calendar and a small radio inside the hut */}
      <rect x="590" y="332" width="54" height="66" rx="3" fill="#f3e4c4" {...O} />
      <rect x="590" y="332" width="54" height="16" rx="3" fill={accent.red} />
      <rect x="290" y="472" width="70" height="40" rx="8" fill={C.metalDark} {...O} />
      <circle cx="342" cy="492" r="10" fill={C.metal} stroke={LINE} strokeWidth="2" />
      <rect x="236" y="528" width="448" height="24" rx="6" fill={C.wood} {...O} />
      {/* Two glasses and the rice wine (hotspot cong-ly at 512,522) */}
      {[488, 528].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 14},${494} L${x + 14},${494} L${x + 11},${528} L${x - 11},${528} Z`} fill="#fff6e2" opacity="0.75" {...O} strokeWidth={2.5} />
          {i === 0 && <path d={`M${x - 12},${514} L${x + 12},${514} L${x + 11},${527} L${x - 11},${527} Z`} fill={accent.amber} />}
        </g>
      ))}
      <path d="M576,528 L576,486 Q576,474 586,470 L586,448 L598,448 L598,470 Q608,474 608,486 L608,528 Z" fill={accent.gold} {...O} strokeWidth={2.5} />
      <rect x="578" y="492" width="28" height="18" rx="2" fill="#f3e4c4" />
      <rect x="236" y="552" width="448" height="150" fill={C.wallDark} {...O} />
      <rect x="270" y="580" width="140" height="90" rx="6" fill="none" stroke={shade(C.wallDark, -0.3)} strokeWidth="4" />
      <rect x="510" y="580" width="140" height="90" rx="6" fill="none" stroke={shade(C.wallDark, -0.3)} strokeWidth="4" />

      {/* Stools and the night log (hotspot cong-so at 832,648) */}
      <Stool x={760} y={760} />
      <rect x="770" y="650" width="150" height="16" rx="5" fill={C.wood} {...O} />
      <path d="M786,666 L780,760 M904,666 L910,760" stroke={LINE} strokeWidth="6" strokeLinecap="round" />
      <path d="M790,648 L832,638 L874,648 L874,620 L832,612 L790,620 Z" fill="#f3e4c4" {...O} strokeWidth={2.5} />
      <path d="M832,612 L832,638" stroke={LINE} strokeWidth="2" />
      {/* Parked scooter */}
      <g {...O}>
        <circle cx="1100" cy="740" r="34" fill="#221a16" />
        <circle cx="1270" cy="740" r="34" fill="#221a16" />
        <circle cx="1100" cy="740" r="12" fill={C.metal} />
        <circle cx="1270" cy="740" r="12" fill={C.metal} />
        <path d="M1066,720 Q1080,660 1160,664 L1230,664 Q1290,664 1304,716 L1250,720 L1120,722 Z" fill={accent.rust} />
        <rect x="1150" y="644" width="96" height="22" rx="10" fill="#2b2220" />
        <path d="M1280,700 L1300,600 L1326,596" fill="none" strokeWidth="6" />
      </g>
      <Puddle x={470} y={790} w={320} />
      <Puddle x={1180} y={830} w={260} o={0.4} />
      <Rain seed={7} />
      <BurntSocket x={224} y={222} />
    </SoftFrame>
  )
}

// --------------------------------------------------------------------------
// 2. Inside the burnt warehouse

function Warehouse() {
  const racks = [160, 560, 960, 1360]
  return (
    <SoftFrame label="Khu chứa hàng sau vụ cháy">
      <rect width="1600" height="900" fill="#2e2622" />
      {/* Roof trusses with a hole letting in the grey morning */}
      <path d="M0,0 L1600,0 L1600,180 L0,180 Z" fill="#241d1a" />
      <path d="M560,0 L860,0 L820,120 L600,120 Z" fill="#8c8b88" opacity="0.5" />
      <Beam x={710} y={60} w={520} h={720} o={0.22} />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${i * 200 - 40},180 L${i * 200 + 60},40 L${i * 200 + 160},180`} fill="none" stroke="#1a1411" strokeWidth="10" strokeLinejoin="round" />
      ))}
      <path d="M0,180 L1600,180" stroke="#1a1411" strokeWidth="14" />
      {/* Back wall, sooty */}
      <rect x="0" y="180" width="1600" height="420" fill={C.wallDark} />
      <g opacity="0.55">
        <Soot x={300} y={600} w={500} h={420} />
        <Soot x={1200} y={600} w={420} h={360} />
      </g>
      {/* Floor with water */}
      <path d="M0,600 L1600,600 L1600,900 L0,900 Z" fill={C.floor} />
      <Puddle x={760} y={760} w={620} o={0.55} />
      <Puddle x={1260} y={840} w={300} o={0.45} />

      {/* Shelving racks with burnt rolls */}
      {racks.map((x, k) => (
        <g key={x}>
          <rect x={x - 130} y="260" width="18" height="360" fill={C.metalDark} {...O} />
          <rect x={x + 112} y="260" width="18" height="360" fill={C.metalDark} {...O} />
          {[330, 470].map((y) => (
            <g key={y}>
              <rect x={x - 136} y={y} width="272" height="14" rx="3" fill={C.metal} {...O} />
              {[-90, -30, 30, 90].map((dx, j) => {
                const burnt = (k + j + y) % 3 !== 0
                return (
                  <g key={dx}>
                    <rect x={x + dx - 26} y={y - 70} width="52" height="70" rx="12" fill={burnt ? '#2a201b' : ['#7a9fb0', '#cf9a32', '#b0583a', '#ece2cf'][j]} {...O} />
                    <ellipse cx={x + dx} cy={y - 70} rx="26" ry="9" fill={burnt ? '#3a2c24' : '#e8dcc4'} stroke={LINE} strokeWidth="2" />
                    {burnt && <circle cx={x + dx} cy={y - 70} r="5" fill="#c9b48a" />}
                  </g>
                )
              })}
            </g>
          ))}
        </g>
      ))}
      {/* The half-burnt roll pulled out (hotspot hang-cuon at 720,450) */}
      <g transform="rotate(-8 720 450)">
        <rect x="640" y="420" width="170" height="60" rx="26" fill="#cf9a32" {...O} />
        <rect x="640" y="420" width="90" height="60" rx="26" fill="#2a201b" {...O} />
        <ellipse cx="810" cy="450" rx="16" ry="30" fill="#e8dcc4" {...O} />
        <ellipse cx="810" cy="450" rx="8" ry="15" fill="#c9b48a" stroke={LINE} strokeWidth="2" />
      </g>
      {/* Fallen rolls on the floor */}
      {[[460, 700, 12], [900, 690, -6], [1080, 720, 18]].map(([x, y, r]) => (
        <g key={x} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 80} y={y - 24} width="160" height="48" rx="22" fill="#2a201b" {...O} />
          <ellipse cx={x + 80} cy={y} rx="12" ry="24" fill="#c9b48a" {...O} />
        </g>
      ))}
      {/* Pallet pile (hotspot hang-pallet at 320,612) */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={220} y={640 - i * 34} width="210" height="16" rx="3" fill={C.wood} {...O} />
          {[232, 310, 398].map((x) => (
            <rect key={x} x={x} y={656 - i * 34} width="22" height="18" fill={C.woodDark} {...O} strokeWidth={2} />
          ))}
        </g>
      ))}
      {/* Hand pallet jack (hotspot hang-xe at 1248,558) */}
      <g {...O}>
        <path d="M1150,640 L1340,640 L1340,620 L1170,620 Z" fill={accent.rust} />
        <rect x="1300" y="560" width="40" height="64" rx="8" fill={shade(accent.rust, -0.2)} />
        <path d="M1320,560 L1240,470" fill="none" strokeWidth="10" />
        <path d="M1226,456 Q1240,440 1258,456" fill="none" strokeWidth="8" />
        <circle cx="1180" cy="648" r="14" fill="#221a16" />
        <circle cx="1320" cy="648" r="16" fill="#221a16" />
      </g>
      {/* Fire extinguisher and a work lamp */}
      <rect x="1460" y="560" width="42" height="96" rx="16" fill={accent.red} {...O} />
      <path d="M1470,560 L1470,540 L1500,536" fill="none" {...O} />
      <Glow x={1420} y={420} r={220} o={0.35} />
      <path d="M1400,700 L1420,440 M1440,700 L1420,440 M1380,700 L1420,440" stroke={LINE} strokeWidth="5" />
      <path d="M1390,440 L1450,440 L1438,400 L1402,400 Z" fill={accent.amber} {...O} />
      <Jerrycan x={992} y={650} />
    </SoftFrame>
  )
}

// --------------------------------------------------------------------------
// 3. The office, where the fire started

function Office() {
  return (
    <SoftFrame label="Văn phòng kho, nơi lửa bắt đầu">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="0" width="1600" height="60" fill={C.wallDark} />
      {/* Floor */}
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.floor} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={i * 220 - 60} y1="700" x2={i * 260 - 300} y2="900" stroke={shade(C.floor, -0.2)} strokeWidth="3" />
      ))}
      {/* V-shaped burn on the wall above the cabinet (hotspot vp-tuong at 352,270) */}
      <Soot x={355} y={430} w={520} h={420} />
      {/* Wall clock, stopped */}
      <circle cx="640" cy="170" r="48" fill="#efe3c8" {...O} />
      <path d="M640,170 L640,138 M640,170 L662,182" stroke={LINE} strokeWidth="4" strokeLinecap="round" />
      {/* Window at night */}
      <rect x="780" y="140" width="300" height="200" rx="8" fill="#2c4a4a" {...O} />
      <path d="M930,140 V340 M780,240 H1080" stroke={LINE} strokeWidth="5" />
      <path d="M800,160 L860,160 L800,230 Z" fill="#fff" opacity="0.12" />
      {/* Calendar with the 20th circled (hotspot vp-lich at 1280,225) */}
      <rect x="1230" y="150" width="104" height="134" rx="4" fill="#f3e4c4" {...O} />
      <rect x="1230" y="150" width="104" height="30" rx="4" fill={accent.red} {...O} />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={1242 + (i % 5) * 18} y={192 + Math.floor(i / 5) * 20} width="10" height="8" fill={LINE} opacity="0.35" />
      ))}
      <circle cx="1304" cy="236" r="12" fill="none" stroke={accent.red} strokeWidth="3" />
      {/* Shelf of binders */}
      <rect x="1360" y="330" width="200" height="12" fill={C.woodDark} {...O} />
      {['#7a9fb0', '#cf9a32', '#4f7a4a', '#b0583a', '#ece2cf', '#7a9fb0', '#cf9a32'].map((c, i) => (
        <rect key={i} x={1368 + i * 27} y="250" width="22" height="80" rx="3" fill={c} {...O} strokeWidth={2} />
      ))}

      {/* Burnt ledger cabinet; the metal coil holder lies under it (hotspot vp-de at 448,684) */}
      <rect x="250" y="390" width="230" height="290" rx="6" fill="#3a2a22" {...O} />
      <rect x="270" y="410" width="190" height="120" rx="4" fill="#2a1f1a" {...O} />
      <rect x="270" y="546" width="190" height="120" rx="4" fill="#2a1f1a" {...O} />
      {[290, 330, 370, 410].map((x) => (
        <rect key={x} x={x} y="430" width="28" height="90" rx="3" fill="#1f1714" stroke={LINE} strokeWidth="2" />
      ))}
      <rect x="262" y="680" width="18" height="24" fill={C.metalDark} {...O} />
      <rect x="450" y="680" width="18" height="24" fill={C.metalDark} {...O} />
      <circle cx="420" cy="694" r="16" fill="none" stroke="#9aa0a3" strokeWidth="4" />
      <path d="M410,694 h20 M420,684 v20" stroke="#9aa0a3" strokeWidth="3" />
      <path d="M460,700 Q500,690 540,704" fill="none" stroke="#1a1411" strokeWidth="10" opacity="0.6" />

      {/* Desk with lamp, burnt papers, and the opened computer (hotspot vp-may at 992,495) */}
      <Glow x={1180} y={420} r={260} o={0.4} />
      <rect x="760" y="480" width="560" height="26" rx="6" fill={C.wood} {...O} />
      <rect x="780" y="506" width="20" height="194" fill={C.woodDark} {...O} />
      <rect x="1280" y="506" width="20" height="194" fill={C.woodDark} {...O} />
      <rect x="940" y="378" width="104" height="102" rx="6" fill="#8d9296" {...O} />
      <rect x="954" y="392" width="76" height="74" rx="4" fill="#2a2f33" {...O} strokeWidth={2} />
      <rect x="966" y="430" width="52" height="22" rx="2" fill="none" stroke={accent.amber} strokeWidth="3" strokeDasharray="6 5" />
      {[[970, 400], [1010, 400]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="#c9cdd0" />
      ))}
      <path d="M1180,480 L1200,420 L1170,384" fill="none" {...O} strokeWidth={5} />
      <path d="M1146,388 L1196,370 L1206,394 L1156,412 Z" fill={accent.amber} {...O} />
      <path d="M840,476 L900,470 L896,480 Z M1080,478 L1130,468 L1126,480 Z" fill="#f3e4c4" {...O} strokeWidth={2} />
      {/* Toppled chair and scattered papers */}
      <g transform="rotate(-70 1180 690)" {...O}>
        <rect x="1130" y="600" width="100" height="18" rx="6" fill={C.metalDark} />
        <rect x="1130" y="520" width="18" height="90" rx="6" fill={C.metalDark} />
        <path d="M1180,618 L1180,690" strokeWidth="6" />
      </g>
      {[[620, 780, 12], [880, 820, -18], [1020, 760, 30], [560, 840, -8]].map(([x, y, r]) => (
        <rect key={x} x={x} y={y} width="54" height="38" rx="2" transform={`rotate(${r} ${x} ${y})`} fill="#e7d2a8" {...O} strokeWidth={2} />
      ))}
      <rect x="0" y="0" width="1600" height="900" fill="#1a1411" opacity="0.18" />
      <Paper x={704} y={670} color="#6b5a4a" />
    </SoftFrame>
  )
}

// --------------------------------------------------------------------------
// 4. The back alley

function BackYard() {
  return (
    <SoftFrame label="Lối hẻm phía sau kho">
      <rect width="1600" height="900" fill={C.sky} />
      {/* Overhead wires and the back wall */}
      <rect x="0" y="120" width="1600" height="600" fill={C.wallDark} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" x2="1600" y1={150 + i * 48} y2={150 + i * 48} stroke={shade(C.wallDark, -0.2)} strokeWidth="3" />
      ))}
      <path d="M0,170 Q400,230 800,180 T1600,190 M0,200 Q500,260 1000,210 T1600,230" fill="none" stroke={LINE} strokeWidth="3" />
      <rect x="0" y="100" width="1600" height="40" fill={C.metalDark} {...O} />
      {/* Ground with tyre tracks */}
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.floor} />
      <path d="M380,900 Q640,760 1100,740 M460,900 Q700,780 1160,760" fill="none" stroke="#2a1f1a" strokeWidth="14" strokeDasharray="18 12" opacity="0.7" />

      {/* Side door with the padlock (hotspot sau-khoa at 560,450) */}
      <rect x="450" y="270" width="220" height="430" rx="6" fill={C.wood} {...O} />
      <rect x="474" y="300" width="172" height="170" rx="4" fill="none" stroke={C.woodDark} strokeWidth="5" />
      <rect x="474" y="500" width="172" height="170" rx="4" fill="none" stroke={C.woodDark} strokeWidth="5" />
      <rect x="430" y="700" width="260" height="18" rx="4" fill={C.woodDark} {...O} />
      <path d="M548,430 Q560,402 572,430" fill="none" stroke="#c9cdd0" strokeWidth="6" />
      <rect x="540" y="428" width="40" height="40" rx="8" fill={accent.gold} {...O} />
      <circle cx="560" cy="446" r="5" fill={LINE} />

      {/* Breaker box, switch down (hotspot sau-cau-dao at 1120,405) */}
      <Beam x={1300} y={240} w={520} h={520} o={0.3} />
      <path d="M1120,120 L1120,330" stroke={LINE} strokeWidth="4" />
      <rect x="1050" y="330" width="140" height="160" rx="8" fill="#9a8a72" {...O} />
      <rect x="1070" y="350" width="100" height="70" rx="4" fill="#2a2420" {...O} strokeWidth={2} />
      <rect x="1108" y="384" width="24" height="30" rx="4" fill={accent.amber} {...O} strokeWidth={2} />
      <text x="1120" y="462" textAnchor="middle" fontSize="18" fontWeight="700" fill={LINE} fontFamily="Barlow Condensed, sans-serif">
        ⚡ CẦU DAO
      </text>
      {/* Street lamp */}
      <path d="M1320,700 L1320,250 Q1320,220 1290,220 L1270,220" fill="none" {...O} strokeWidth={8} />
      <Bulb x={1270} y={232} />

      {/* Water drum, potted plants, rubbish, a cat on the wall */}
      <rect x="150" y="520" width="130" height="180" rx="20" fill={accent.teal} {...O} />
      <path d="M150,570 h130 M150,650 h130" stroke={shade(accent.teal, -0.3)} strokeWidth="6" />
      {[[870, 700], [1480, 700]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x - 36},${y - 70} L${x + 36},${y - 70} L${x + 28},${y} L${x - 28},${y} Z`} fill={accent.rust} {...O} />
          <path d={`M${x},${y - 70} C${x - 20},${y - 140} ${x - 50},${y - 160} ${x - 60},${y - 170} M${x},${y - 70} C${x + 10},${y - 150} ${x + 30},${y - 170} ${x + 50},${y - 180} M${x},${y - 70} C${x},${y - 130} ${x},${y - 170} ${x + 4},${y - 200}`} fill="none" stroke={C.leaf} strokeWidth="9" strokeLinecap="round" />
        </g>
      ))}
      <path d="M700,700 Q690,640 740,630 Q790,620 800,660 Q820,700 790,700 Z" fill="#26201d" {...O} />
      <g transform="translate(900 120)">
        <path d="M0,0 Q4,-30 20,-34 L24,-48 L32,-36 L44,-48 L46,-30 Q60,-10 50,0 Z" fill="#1d1715" {...O} strokeWidth={2.5} />
        <circle cx="26" cy="-24" r="3" fill={accent.amber} />
        <circle cx="38" cy="-24" r="3" fill={accent.amber} />
        <path d="M50,0 Q80,10 70,40" fill="none" stroke="#1d1715" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* A pair of sandals (hotspot sau-dep at 800,720) */}
      {[0, 1].map((i) => (
        <g key={i} transform={`rotate(${i ? 14 : -6} ${770 + i * 60} 724)`}>
          <ellipse cx={770 + i * 60} cy="724" rx="24" ry="44" fill="#3c6d8a" {...O} />
          <path d={`M${756 + i * 60},708 Q${770 + i * 60},690 ${784 + i * 60},708`} fill="none" stroke="#e8dcc4" strokeWidth="6" strokeLinecap="round" />
        </g>
      ))}
      <Puddle x={980} y={800} w={360} />
      <Rain seed={11} count={90} />
      <Lighter x={320} y={630} />
    </SoftFrame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  cong: Gate,
  'khu-hang': Warehouse,
  'van-phong': Office,
  'san-sau': BackYard,
}
