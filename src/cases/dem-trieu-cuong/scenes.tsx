import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 6, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  tin: '#7d7f7a',
  wall: '#b9ad97',
  wallWet: '#8d7f68',
  mud: '#5b4a35',
  mudDark: '#3e3224',
  steel: '#5d6870',
  carton: '#c49a62',
  cartonWet: '#7d5e3a',
  canal: '#3f5552',
  canalDark: '#2a3a39',
  boatBlue: '#2f6aa8',
  boatRed: '#b23a2e',
  rope: '#3f9a7a',
  raincoat: '#e2b72f',
  wood: '#7a4f32',
  woodDark: '#573721',
  night: '#1f2730',
}

/** Floor of the warehouse sits at y=820; 1 m = 260 px. Shelf tiers at 0.2 / 0.6 / 1.1 / 1.6 / 2.1 m. */
export const FLOOR = 820
export const M = 260
export const TIERS = [0.2, 0.6, 1.1, 1.6, 2.1]
export const WATER = 0.9

/** A phone carton printed with the shop's name. */
export function Carton({ x, y, w = 70, h = 54, wet = false }: { x: number; y: number; w?: number; h?: number; wet?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={wet ? C.cartonWet : C.carton} {...O} strokeWidth={2} />
      <rect x={x} y={y + h * 0.42} width={w} height={h * 0.16} fill={wet ? '#5b4a35' : '#e8d9b8'} opacity="0.9" />
      {!wet && (
        <text x={x + w / 2} y={y + h * 0.55} textAnchor="middle" fontSize={h * 0.13} fill={accent.red} fontFamily="Barlow Condensed, sans-serif" fontWeight="700">
          MỸ LỆ
        </text>
      )}
      {wet && <path d={`M${x},${y + h * 0.3} Q${x + w / 2},${y + h * 0.4} ${x + w},${y + h * 0.28}`} stroke={C.mudDark} strokeWidth="3" fill="none" />}
    </g>
  )
}

/** Steel shelving with five tiers. The top three are empty with clean rectangles in the dust. */
export function Shelves({ x, w, full = false }: { x: number; w: number; full?: boolean }) {
  const cols = Math.floor(w / 84)
  return (
    <g>
      {[x, x + w].map((px) => (
        <rect key={px} x={px - 8} y={FLOOR - 2.3 * M} width="16" height={2.3 * M} fill={C.steel} {...O} strokeWidth={2} />
      ))}
      {TIERS.map((t, i) => {
        const y = FLOOR - t * M
        const below = t < WATER
        return (
          <g key={t}>
            <rect x={x} y={y} width={w} height="12" fill={shade(C.steel, 0.1)} {...O} strokeWidth={2} />
            {Array.from({ length: cols }, (_, c) => {
              const cx = x + 10 + c * 84
              if (below || full) return <Carton key={c} x={cx} y={y - 56} wet={below} />
              return (
                <g key={c}>
                  <rect x={cx} y={y - 3} width="70" height="4" fill="#d9cfbb" opacity="0.8" />
                </g>
              )
            })}
            {!below && !full && <rect x={x} y={y - 3} width={w} height="3" fill="#8d8a80" opacity="0.6" />}
            <text x={x - 20} y={y + 10} textAnchor="end" fontSize="16" fill="#e8dcc4" fontFamily="IBM Plex Mono, monospace">
              {i + 1}
            </text>
          </g>
        )
      })}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Inside the warehouse

function Warehouse() {
  const waterY = FLOOR - WATER * M
  return (
    <Frame label="Trong kho, năm tầng kệ sắt, vệt nước ngang tường">
      <rect width="1600" height="900" fill={C.wall} />
      {/* Corrugated tin roof */}
      <path d="M0,0 H1600 V90 H0 Z" fill={C.tin} />
      {Array.from({ length: 32 }, (_, i) => (
        <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="90" stroke={shade(C.tin, -0.25)} strokeWidth="6" />
      ))}
      <rect y="90" width="1600" height="14" fill={ink.night} opacity="0.5" />
      {/* Wet band below the mark and the mud line itself */}
      <rect y={waterY} width="1600" height={FLOOR - waterY} fill={C.wallWet} />
      <rect y={waterY - 6} width="1600" height="10" fill={C.mud} />
      {/* Cobweb above the line, still intact */}
      <path d="M1500,104 L1600,104 M1500,104 Q1550,140 1600,200 M1540,104 Q1560,130 1600,150" stroke="#f2ead8" strokeWidth="2" fill="none" opacity="0.7" />
      <Bulb x={800} y={200} />
      <Glow x={800} y={360} r={620} o={0.28} />
      <Beam x={800} y={210} w={1000} h={620} o={0.18} />

      {/* Shelving (hotspots ke-tren 544,396 and ke-duoi 544,720) */}
      <Shelves x={250} w={590} />

      {/* Height marks the surveyor taped on the wall (hotspot vet-nuoc 1248,576) */}
      <g>
        <rect x="1236" y={FLOOR - 2.2 * M} width="24" height={2.2 * M} fill="#f2ead8" {...O} strokeWidth={2} />
        {[0.5, 1, 1.5, 2].map((m) => (
          <g key={m}>
            <line x1="1236" y1={FLOOR - m * M} x2="1272" y2={FLOOR - m * M} stroke={ink.night} strokeWidth="3" />
            <text x="1280" y={FLOOR - m * M + 6} fontSize="18" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
              {m.toString().replace('.', ',')} m
            </text>
          </g>
        ))}
        <path d={`M1200,${waterY} l-24,-12 v24 Z`} fill={accent.red} />
      </g>

      {/* Roller door with sandbags (hotspot bao-cat 1376,756) */}
      <g {...O}>
        <rect x="1340" y="300" width="230" height={FLOOR - 300} fill="#9a968f" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1="1340" y1={320 + i * 32} x2="1570" y2={320 + i * 32} stroke={shade('#9a968f', -0.25)} strokeWidth="3" />
        ))}
        {[0, 1, 2].map((r) =>
          Array.from({ length: 4 - (r % 2) }, (_, i) => (
            <rect key={`${r}-${i}`} x={1320 + i * 66 + (r % 2) * 33} y={FLOOR - 40 - r * 34} width="64" height="36" rx="14" fill="#b8a27a" strokeWidth={2} />
          )),
        )}
      </g>

      {/* Mud floor */}
      <rect y={FLOOR} width="1600" height={900 - FLOOR} fill={C.mudDark} />
      <ellipse cx="700" cy="860" rx="500" ry="22" fill="#6b5a44" opacity="0.6" />
      <ellipse cx="1100" cy="850" rx="120" ry="10" fill="#8aa0a0" opacity="0.4" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. The canal-side window, seen from the water

function CanalWindow() {
  const sill = 520
  return (
    <Frame label="Bức tường sau của kho nhìn ra kênh Đôi, cửa sổ song sắt mở toang">
      <rect width="1600" height="900" fill="#55646b" />
      <rect width="1600" height="200" fill="#6f7f86" />
      {/* Wall of the warehouse */}
      <rect x="160" y="90" width="1280" height="640" fill={C.wall} {...O} />
      <rect x="160" y="90" width="1280" height="40" fill={C.tin} />
      {/* Old tide stains on the outer wall */}
      <rect x="160" y="600" width="1280" height="130" fill={C.wallWet} />
      <rect x="160" y="596" width="1280" height="8" fill={C.mud} />
      <Glow x={800} y={380} r={420} o={0.22} />

      {/* Window, both leaves open (hotspot chot 800,342) */}
      <g {...O}>
        <rect x="620" y="250" width="360" height={sill - 250} fill={C.night} />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={640 + i * 50} y="250" width="10" height={sill - 250} fill={C.steel} strokeWidth={1.5} />
        ))}
        <path d="M620,250 L520,270 L520,500 L620,520 Z" fill={shade(C.wood, -0.1)} />
        <path d="M980,250 L1080,270 L1080,500 L980,520 Z" fill={shade(C.wood, -0.1)} />
        {/* Bolt drawn back from the inside */}
        <rect x="770" y="330" width="60" height="14" rx="4" fill="#9a968f" strokeWidth={2} />
        <rect x="740" y="326" width="24" height="22" rx="3" fill="#9a968f" strokeWidth={2} />
      </g>
      {/* Sill with the scrape of blue and red paint (hotspot vet-son 800,522) */}
      <rect x="600" y={sill} width="400" height="22" fill="#cfc6b2" {...O} />
      <path d={`M660,${sill + 18} q60,-6 140,-2 t160,2`} stroke={C.boatBlue} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={`M690,${sill + 12} q60,-4 120,0`} stroke={C.boatRed} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* A cut loop of green rope on the bars (hotspot day-buoc 1056,414) */}
      <g>
        <ellipse cx="1050" cy="420" rx="22" ry="12" fill="none" stroke={C.rope} strokeWidth="6" />
        <path d="M1060,430 l18,40 M1040,432 l-6,30" stroke={C.rope} strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Canal, down to its usual level (hotspot kenh 352,738) */}
      <rect y="730" width="1600" height="170" fill={C.canal} />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${i * 220 - 40},${770 + (i % 3) * 30} q50,-10 100,0`} stroke="#6e8a86" strokeWidth="4" fill="none" />
      ))}
      {[[200, 760], [320, 800], [470, 780], [1240, 790]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={30 + i * 6} height="10" rx="3" fill={['#c9b27a', '#7a9fb0', '#d8cdb6', '#8a6448'][i]} transform={`rotate(${i * 12 - 10} ${x} ${y})`} />
      ))}
      {/* A tape measure from the floor inside to the sill */}
      <text x="1010" y={sill + 14} fontSize="16" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
        1,0 m
      </text>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Bến Bình Đông

/** A canal cargo boat: blue hull with a red rail, a small cabin at the stern. */
export function Boat({ x, y, s = 1, light = false, cargo = 'rice' }: { x: number; y: number; s?: number; light?: boolean; cargo?: 'rice' | 'tarp' | 'none' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {light && <Glow x={250} y={-120} r={160} o={0.6} color="#7fe0c4" />}
      <path d="M-300,0 L300,0 L250,90 L-260,90 Z" fill={C.boatBlue} {...O} />
      <path d="M-300,0 L300,0 L294,16 L-294,16 Z" fill={C.boatRed} {...O} strokeWidth={2} />
      {/* Eye on the bow */}
      <ellipse cx="-230" cy="46" rx="22" ry="14" fill="#f2ead8" {...O} strokeWidth={2} />
      <circle cx="-226" cy="46" r="7" fill={ink.night} />
      {/* Cabin */}
      <rect x="150" y="-110" width="130" height="110" fill={C.wood} {...O} />
      <path d="M140,-110 L290,-110 L280,-134 L150,-134 Z" fill={C.tin} {...O} strokeWidth={2} />
      <rect x="176" y="-86" width="40" height="34" fill={C.night} strokeWidth={2} />
      {light && <circle cx="250" cy="-120" r="10" fill="#7fe0c4" />}
      {cargo === 'rice' &&
        [[-220, -40], [-150, -40], [-80, -40], [-185, -76], [-115, -76]].map(([bx, by], i) => (
          <rect key={i} x={bx} y={by} width="66" height="40" rx="12" fill="#e8dcc4" {...O} strokeWidth={2} />
        ))}
      {cargo === 'tarp' && <path d="M-240,0 Q-200,-110 -40,-100 Q100,-110 130,0 Z" fill="#3f7aa0" {...O} />}
    </g>
  )
}

function Pier() {
  return (
    <Frame label="Bến Bình Đông, ghe chở hàng neo dọc kênh">
      <rect width="1600" height="900" fill="#c9b58e" />
      <rect width="1600" height="420" fill="#9fb0b0" />
      {/* Far bank: rows of houses and the coffee stall (hotspot quan-bong 1376,270) */}
      <path d="M0,300 L1600,300 L1600,420 L0,420 Z" fill="#6b5a44" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={i * 140} y={180 + (i % 3) * 30} width="128" height={240 - (i % 3) * 30} fill={['#c98a5a', '#d9c49a', '#8fa7a0', '#b9815a'][i % 4]} {...O} strokeWidth={2} />
      ))}
      <g {...O}>
        <rect x="1300" y="220" width="170" height="110" fill={C.woodDark} />
        <path d="M1280,220 L1490,220 L1470,190 L1300,190 Z" fill={accent.red} />
        <rect x="1330" y="270" width="40" height="40" fill="#e8dcc4" />
        <rect x="1400" y="270" width="40" height="40" fill="#e8dcc4" />
      </g>
      <text x="1385" y="212" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">CÀ PHÊ BÔNG</text>
      {/* Canal */}
      <rect y="420" width="1600" height="300" fill={C.canal} />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${i * 170},${460 + (i % 4) * 50} q40,-8 80,0`} stroke="#6e8a86" strokeWidth="4" fill="none" />
      ))}
      <Glow x={700} y={500} r={600} o={0.2} />
      {/* Tư's boat (hotspot ghe-tu 736,540, bao-gao 384,486) */}
      <Boat x={640} y={520} />
      {/* Scrape on the port side */}
      <path d="M560,560 q80,-6 160,2" stroke="#9a968f" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M570,566 q60,-4 120,0" stroke="#d8cdb6" strokeWidth="4" fill="none" />
      {/* Near bank: the pier posts */}
      <path d="M0,720 L1600,720 L1600,900 L0,900 Z" fill="#8a7458" />
      {[120, 420, 980, 1500].map((x) => (
        <rect key={x} x={x} y="660" width="24" height="140" fill={C.woodDark} {...O} strokeWidth={2} />
      ))}

      <path d="M0,720 L1600,720" stroke={ink.night} strokeWidth="4" />
      {/* Fuel cans and the receipt on the bank (hotspot can-dau 1184,792) */}
      <g {...O}>
        <rect x="1130" y="740" width="70" height="90" rx="8" fill="#c23a2c" />
        <rect x="1150" y="726" width="30" height="16" fill={ink.night} />
        <rect x="1210" y="760" width="60" height="70" rx="8" fill="#3f6b3a" />
        <rect x="1290" y="790" width="70" height="40" fill="#fbf4e4" transform="rotate(-6 1325 810)" />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Khải's office on the mezzanine

function Office() {
  return (
    <Frame label="Phòng quản lý trên gác lửng, áo mưa vàng treo trên móc">
      <rect width="1600" height="900" fill="#8f826b" />
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.wood} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 140} y1="700" x2={i * 140 - 60} y2="900" stroke={shade(C.wood, -0.25)} strokeWidth="3" />
      ))}
      <Bulb x={820} y={140} />
      <Glow x={820} y={320} r={560} o={0.3} />

      {/* Yellow raincoat on a hook, mud to the thigh (hotspot ao-mua 320,414) */}
      <g {...O}>
        <circle cx="320" cy="150" r="10" fill={C.steel} />
        <path d="M260,170 Q320,150 380,170 L410,330 L370,330 L366,250 L274,250 L270,330 L230,330 Z" fill={C.raincoat} />
        <path d="M274,330 L270,640 L314,640 L320,360 L326,640 L370,640 L366,330 Z" fill={C.raincoat} />
        <path d="M272,480 L270,640 L314,640 L318,480 Z M322,480 L326,640 L370,640 L368,480 Z" fill={C.mud} opacity="0.85" />
      </g>
      <text x="320" y="230" textAnchor="middle" fontSize="20" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">MỸ LỆ</text>

      {/* Key board (hotspot moc-chia 768,306) */}
      <g {...O}>
        <rect x="660" y="200" width="220" height="200" fill={C.woodDark} />
        <rect x="676" y="216" width="188" height="44" fill="#f2ead8" strokeWidth={1.5} />
        {[0, 1].map((i) => (
          <g key={i}>
            <circle cx={720 + i * 100} cy="300" r="6" fill="#d9b04f" />
            {i === 0 && (
              <g>
                <path d="M720,306 v30" stroke="#d9b04f" strokeWidth="3" />
                <circle cx="720" cy="346" r="10" fill="none" stroke="#d9b04f" strokeWidth="4" />
              </g>
            )}
          </g>
        ))}
      </g>
      <text x="770" y="244" textAnchor="middle" fontSize="14" fill={ink.night} fontFamily="IBM Plex Mono, monospace">1: chị Lệ · 2: Khải</text>

      {/* Desk with the stock book (hotspot so-kho 1120,558) */}
      <g {...O}>
        <rect x="900" y="560" width="440" height="30" fill={C.woodDark} />
        <rect x="920" y="590" width="26" height="150" fill={shade(C.woodDark, -0.2)} />
        <rect x="1300" y="590" width="26" height="150" fill={shade(C.woodDark, -0.2)} />
        <path d="M1020,560 L1040,520 L1200,520 L1220,560 Z" fill="#e7d2a8" />
        <line x1="1120" y1="520" x2="1120" y2="560" stroke={LINE} strokeWidth="2" />
        <rect x="1250" y="500" width="60" height="60" fill={C.carton} />
      </g>

      {/* Whiteboard of Tết orders (hotspot lich 1376,270) */}
      <g {...O}>
        <rect x="1250" y="150" width="260" height="200" fill="#f6f4ee" />
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x="1270" y={180 + i * 30} width={180 - (i % 2) * 50} height="8" fill="#2f4258" opacity="0.6" stroke="none" />
        ))}
      </g>
      <text x="1380" y="172" textAnchor="middle" fontSize="16" fill={accent.red} fontFamily="Barlow Condensed, sans-serif" fontWeight="700">ĐƠN TẾT · TỪ 1/12</text>
      {/* Railing of the mezzanine */}
      <rect x="0" y="680" width="1600" height="20" fill={C.steel} />
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  kho: Warehouse,
  'cua-so': CanalWindow,
  ben: Pier,
  'van-phong': Office,
}

export { LINE }
