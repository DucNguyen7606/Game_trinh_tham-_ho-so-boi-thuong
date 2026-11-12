import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 12, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  wall: '#e3d3b0',
  wallDark: '#c7b48c',
  lim: '#7a3f2a', // gỗ lim of the staircase
  limDark: '#542a1b',
  runner: '#7d2f2a',
  runnerDark: '#5b211d',
  brass: '#d9b04f',
  tileA: '#d8c9a8',
  tileB: '#3f8a7e',
  tileC: '#b0583a',
  chalk: '#f4f1e8',
  paper: '#f6efe2',
  green: '#4f7a4a',
  greenDark: '#35573a',
  laterite: '#b5734a',
  iron: '#2b2f33',
  sky: '#2a3550',
  steel: '#8a8f94',
  tin: '#9aa3a8',
  plastic: '#e9e4d6',
  pill: '#f2f2ee',
  watch: '#c9ccd0',
  dial: '#f4efe0',
  shutter: '#3f8a7e',
}

/** A men's automatic watch, face on. (x, y) is the centre; the crown can be pulled out. */
export function Watch({ x, y, r = 60, h = 10, m = 47, crownOut = true, cracked = true }: { x: number; y: number; r?: number; h?: number; m?: number; crownOut?: boolean; cracked?: boolean }) {
  const ha = ((h % 12) + m / 60) * 30 - 90
  const ma = m * 6 - 90
  const hand = (a: number, len: number) => [x + Math.cos((a * Math.PI) / 180) * len, y + Math.sin((a * Math.PI) / 180) * len]
  const [hx, hy] = hand(ha, r * 0.5)
  const [mx, my] = hand(ma, r * 0.78)
  return (
    <g {...O}>
      <rect x={x - r * 0.45} y={y - r * 1.9} width={r * 0.9} height={r * 3.8} rx={r * 0.2} fill="#5a3a26" />
      <circle cx={x} cy={y} r={r * 1.12} fill={C.watch} />
      <rect x={x + r * 1.08} y={y - r * 0.14} width={crownOut ? r * 0.42 : r * 0.2} height={r * 0.28} rx="3" fill={C.watch} />
      {crownOut && <rect x={x + r * 1.1} y={y - r * 0.05} width={r * 0.2} height={r * 0.1} fill={accent.amber} stroke="none" />}
      <circle cx={x} cy={y} r={r} fill={C.dial} />
      {Array.from({ length: 12 }, (_, i) => {
        const [ax, ay] = hand(i * 30 - 90, r * 0.86)
        const [bx, by] = hand(i * 30 - 90, r * 0.96)
        return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} strokeWidth={i % 3 ? 2 : 4} />
      })}
      <rect x={x + r * 0.5} y={y - r * 0.1} width={r * 0.26} height={r * 0.2} fill="#fff" strokeWidth={1.5} />
      <line x1={x} y1={y} x2={hx} y2={hy} strokeWidth={r * 0.08} />
      <line x1={x} y1={y} x2={mx} y2={my} strokeWidth={r * 0.05} />
      <line x1={x} y1={y + r * 0.15} x2={x} y2={y - r * 0.85} stroke={accent.red} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r * 0.06} fill={LINE} />
      {cracked && (
        <g stroke="#ffffff" strokeWidth={1.5} opacity="0.85" fill="none">
          <path d={`M${x - r * 0.3},${y - r * 0.2} l${-r * 0.5},${-r * 0.35} M${x - r * 0.3},${y - r * 0.2} l${r * 0.2},${-r * 0.6} M${x - r * 0.3},${y - r * 0.2} l${-r * 0.4},${r * 0.5} M${x - r * 0.3},${y - r * 0.2} l${r * 0.9},${r * 0.2}`} />
        </g>
      )}
    </g>
  )
}

/** Weekly pill organiser: 7 days x 3 slots. `empty` lists slots already taken, as [day, slot]. */
export function PillBox({ x, y, s = 1, empty = [] }: { x: number; y: number; s?: number; empty?: [number, number][] }) {
  const isEmpty = (d: number, k: number) => empty.some(([a, b]) => a === d && b === k)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O} strokeWidth={2}>
      <rect x="0" y="0" width="280" height="130" rx="8" fill={C.plastic} />
      {Array.from({ length: 7 }, (_, d) =>
        [0, 1, 2].map((k) => (
          <g key={`${d}-${k}`}>
            <rect x={8 + d * 38} y={10 + k * 38} width="34" height="34" rx="4" fill={['#f2d9a0', '#bfdcd4', '#c9c0e0'][k]} />
            {!isEmpty(d, k) &&
              [0, 1, 2].map((p) => <circle key={p} cx={16 + d * 38 + p * 9} cy={27 + k * 38} r="4" fill={C.pill} strokeWidth={1} />)}
          </g>
        )),
      )}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Hall and the wooden staircase

/** Step i counted from the top: where its tread starts. */
export const stepAt = (i: number) => ({ x: 1100 - i * 70, y: 200 + i * 80 })

function Hall() {
  return (
    <Frame label="Sảnh lát gạch bông và cầu thang gỗ lim lên lầu">
      <rect width="1600" height="900" fill={C.wall} />
      {/* Wainscot */}
      <rect y="560" width="1600" height="200" fill={C.wallDark} />
      <line x1="0" y1="560" x2="1600" y2="560" stroke={LINE} strokeWidth="3" />
      {/* Encaustic floor tiles */}
      <rect y="760" width="1600" height="140" fill={C.tileA} />
      {Array.from({ length: 22 }, (_, i) =>
        [0, 1].map((r) => (
          <g key={`${i}-${r}`} transform={`translate(${i * 76 - (r * 38)} ${780 + r * 60})`}>
            <path d="M38,0 L58,20 L38,40 L18,20 Z" fill={r ? C.tileC : C.tileB} opacity="0.8" />
            <circle cx="38" cy="20" r="5" fill={C.tileA} />
          </g>
        )),
      )}
      <Bulb x={760} y={120} />
      <Glow x={760} y={380} r={620} o={0.28} />

      {/* Top landing with the newel post (hotspot dau-cau-thang 1216,153) */}
      <g {...O}>
        <rect x="1040" y="190" width="560" height="26" fill={C.lim} />
        <rect x="1040" y="216" width="560" height="40" fill={C.limDark} />
        <rect x="1196" y="70" width="34" height="122" fill={C.lim} />
        <rect x="1188" y="58" width="50" height="18" rx="4" fill={C.lim} />
        {[1290, 1360, 1430, 1500, 1570].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="190" strokeWidth="6" stroke={C.limDark} />
        ))}
        <rect x="1196" y="92" width="404" height="12" fill={C.lim} />
      </g>
      <rect x="1205" y="120" width="12" height="9" fill="#e7c48a" />
      {/* Two drag marks along the landing carpet towards the top step */}
      {[0, 1].map((k) => (
        <path key={k} d={`M${1560 - k * 10},${200 + k * 8} L${1150},${200 + k * 8}`} stroke="#e8c9a8" strokeWidth="3" strokeDasharray="14 6" opacity="0.8" />
      ))}

      {/* The staircase, eight steps from the landing down to the hall */}
      {Array.from({ length: 8 }, (_, i) => {
        const { x, y } = stepAt(i)
        return (
          <g key={i} {...O}>
            <rect x={x - 70} y={y} width="210" height="16" fill={C.lim} />
            <rect x={x - 70} y={y + 16} width="210" height="64" fill={C.limDark} />
            {/* Runner over the tread and riser; on step 3 it has slid sideways */}
            <rect x={x - 10 + (i === 2 ? 26 : 0)} y={y} width="96" height="80" fill={i === 2 ? C.runnerDark : C.runner} strokeWidth={2} transform={i === 2 ? `rotate(4 ${x + 38} ${y + 40})` : undefined} />
            {i === 2 ? (
              <line x1={x - 30} y1={y + 6} x2={x + 90} y2={y - 6} stroke={C.brass} strokeWidth="6" />
            ) : (
              <line x1={x - 16} y1={y + 6} x2={x + 92} y2={y + 6} stroke={C.brass} strokeWidth="5" />
            )}
          </g>
        )
      })}
      {/* Banister rail and spindles */}
      <g {...O}>
        <path d="M1196,96 L520,700" strokeWidth="14" stroke={C.limDark} />
        {Array.from({ length: 8 }, (_, i) => {
          const { x, y } = stepAt(i)
          return <line key={i} x1={x - 50} y1={y} x2={x - 50} y2={96 + (1196 - (x - 50)) * 0.893} strokeWidth="5" stroke={C.limDark} />
        })}
        <rect x="500" y="690" width="40" height="70" fill={C.lim} />
      </g>

      {/* Chalk outline at the foot of the stairs (hotspot phan 512,720) */}
      <g stroke={C.chalk} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M300,850 q-10,-30 30,-40 l120,-6 q40,-20 70,0 l90,10 q20,10 0,24 l-80,4 l-40,30 l-100,4 q-50,-4 -90,-26 Z" />
        <circle cx="560" cy="826" r="24" />
      </g>

      {/* Evidence bag with the watch on the bottom step (hotspot dong-ho 736,738) */}
      <g transform="rotate(-6 740 740)">
        <rect x="680" y="706" width="120" height="80" rx="4" fill="#e9f0f2" opacity="0.85" {...O} strokeWidth={2} />
        <rect x="680" y="706" width="120" height="14" fill={accent.red} opacity="0.8" />
        <Watch x={740} y={752} r={20} />
      </g>

      {/* Grandfather clock still running (hotspot dong-ho-qua-lac 192,342) */}
      <g {...O}>
        <rect x="130" y="150" width="124" height="610" fill={C.limDark} />
        <rect x="120" y="140" width="144" height="30" fill={C.lim} />
        <circle cx="192" cy="250" r="48" fill={C.dial} />
        <line x1="192" y1="250" x2="192" y2="212" strokeWidth="4" />
        <line x1="192" y1="250" x2="220" y2="262" strokeWidth="5" />
        <rect x="160" y="330" width="64" height="300" fill="#2d1f18" />
        <line x1="192" y1="340" x2="206" y2="560" stroke={C.brass} strokeWidth="4" />
        <circle cx="206" cy="572" r="18" fill={C.brass} />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Study upstairs

function Study() {
  return (
    <Frame label="Phòng làm việc của ông Hiển, bàn vẽ kê sát cửa sổ nhìn xuống hẻm">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="740" width="1600" height="160" fill={C.limDark} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 200} y1="740" x2={i * 200 - 60} y2="900" stroke={shade(C.limDark, -0.25)} strokeWidth="3" />
      ))}
      {/* Window with green shutters over the alley (hotspot cua-so 256,270) */}
      <g {...O}>
        <rect x="140" y="100" width="240" height="360" fill={C.sky} />
        <rect x="150" y="300" width="20" height="160" fill="#4a3326" />
        <circle cx="160" cy="300" r="16" fill="#3a332f" />
        <rect x="178" y="292" width="26" height="14" rx="3" fill="#f2f2ee" strokeWidth={1.5} />
        <line x1="260" y1="100" x2="260" y2="460" />
        <line x1="140" y1="280" x2="380" y2="280" />
        <rect x="70" y="90" width="70" height="380" fill={C.shutter} />
        <rect x="380" y="90" width="70" height="380" fill={C.shutter} />
        {Array.from({ length: 14 }, (_, i) => (
          <g key={i}>
            <line x1="76" y1={110 + i * 25} x2="134" y2={110 + i * 25} strokeWidth={2} />
            <line x1="386" y1={110 + i * 25} x2="444" y2={110 + i * 25} strokeWidth={2} />
          </g>
        ))}
      </g>
      <Glow x={700} y={200} r={300} o={0.3} />
      <Bulb x={760} y={110} />
      <Beam x={760} y={120} w={700} h={560} o={0.18} />

      {/* Drafting table with the drawing of the villa (hotspot ban-ve 752,324) */}
      <g {...O}>
        <polygon points="560,440 960,440 920,220 600,220" fill="#efe6cf" />
        <rect x="620" y="250" width="270" height="160" fill={C.paper} strokeWidth={1.5} />
        <path d="M660,400 L660,320 L755,270 L850,320 L850,400 Z" fill="none" strokeWidth={2} stroke="#2f4258" />
        {[680, 730, 790].map((x) => (
          <rect key={x} x={x} y="340" width="30" height="44" fill="none" strokeWidth={1.5} stroke="#2f4258" />
        ))}
        <line x1="600" y1="440" x2="560" y2="740" strokeWidth="8" />
        <line x1="920" y1="440" x2="960" y2="740" strokeWidth="8" />
        <rect x="600" y="430" width="340" height="14" fill={C.lim} />
      </g>

      {/* Armchair pulled up to the drafting table, cushion still sunk */}
      <g {...O}>
        <rect x="660" y="520" width="200" height="40" rx="10" fill="#6b3a2a" />
        <rect x="670" y="440" width="180" height="90" rx="20" fill="#7d4a34" />
        <rect x="650" y="500" width="30" height="80" rx="8" fill="#6b3a2a" />
        <rect x="840" y="500" width="30" height="80" rx="8" fill="#6b3a2a" />
        <line x1="670" y1="580" x2="660" y2="660" strokeWidth="6" />
        <line x1="850" y1="580" x2="860" y2="660" strokeWidth="6" />
        <path d="M760,664 l36,-6" stroke={accent.amber} strokeWidth="6" />
      </g>
      <path d="M755,270 C760,320 768,370 790,410" fill="none" stroke="#3a3a3a" strokeWidth="2.5" />
      {/* Side table with the weekly pill box (hotspot hop-thuoc 480,558) */}
      <g {...O}>
        <rect x="340" y="600" width="300" height="20" fill={C.lim} />
        <rect x="360" y="620" width="16" height="120" fill={C.limDark} />
        <rect x="604" y="620" width="16" height="120" fill={C.limDark} />
      </g>
      <PillBox x={360} y={530} s={0.92} empty={[[0, 0], [0, 1]]} />

      {/* Desk with the old landline phone (hotspot dien-thoai 1024,504) */}
      <g {...O}>
        <rect x="900" y="540" width="320" height="20" fill={C.lim} />
        <rect x="920" y="560" width="280" height="180" fill={C.limDark} />
        <rect x="960" y="480" width="130" height="62" rx="12" fill="#2a2f35" />
        <path d="M962,486 q65,-40 126,0 l0,14 l-126,0 Z" fill="#3a4148" />
        <rect x="990" y="512" width="56" height="20" fill="#9fd0a8" strokeWidth={1.5} />
        <circle cx="1068" cy="522" r="7" fill={accent.red} />
      </g>
      <Glow x={1068} y={522} r={30} o={0.7} color={accent.red} />

      {/* Bookshelf with models */}
      <g {...O}>
        <rect x="1240" y="140" width="300" height="440" fill={C.limDark} />
        {[220, 330, 440].map((y) => (
          <rect key={y} x="1240" y={y} width="300" height="12" fill={C.lim} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={1252 + (i % 6) * 46} y={i < 6 ? 160 : 270} width="34" height="60" fill={['#7d2f2a', '#2f4258', '#6b6a35', '#b0925c'][i % 4]} strokeWidth={1.5} />
        ))}
        <path d="M1280,440 L1280,400 L1330,370 L1380,400 L1380,440 Z" fill={C.paper} strokeWidth={2} />
      </g>

      {/* Small table by the door with the empty porridge tray (hotspot khay-chao 1344,666) */}
      <g {...O}>
        <rect x="1250" y="690" width="200" height="16" fill={C.lim} />
        <rect x="1270" y="660" width="160" height="30" rx="4" fill="#b0925c" />
        <ellipse cx="1320" cy="660" rx="40" ry="12" fill="#f4efe0" />
        <line x1="1360" y1="660" x2="1410" y2="650" strokeWidth={4} />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Front yard and the gate to the alley

function Yard() {
  return (
    <Frame label="Sân trước biệt thự lát đá ong, cổng sắt mở ra hẻm">
      <rect width="1600" height="900" fill={C.sky} />
      {/* Alley beyond the gate: house fronts and the power pole with the camera */}
      <rect y="200" width="1600" height="300" fill="#3b4255" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 210} y={230 + (i % 3) * 20} width="180" height="270" fill={shade('#4a5368', (i % 2) * 0.08)} />
      ))}
      <g {...O}>
        <rect x="1040" y="60" width="18" height="460" fill="#6f6d67" />
        <path d="M980,120 L1120,120" strokeWidth="4" />
        <rect x="1000" y="150" width="56" height="26" rx="6" fill="#f2f2ee" />
        <circle cx="1002" cy="163" r="7" fill={LINE} />
      </g>
      <Glow x={1000} y={163} r={40} o={0.4} color={accent.red} />
      {/* Yard floor of laterite */}
      <rect y="620" width="1600" height="280" fill={C.laterite} />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={(i * 113) % 1600} cy={650 + ((i * 47) % 230)} r={4 + (i % 3) * 2} fill={shade(C.laterite, -0.2)} />
      ))}
      {/* High walls with broken glass on top */}
      <g {...O}>
        <rect x="0" y="240" width="580" height="400" fill={C.wallDark} />
        <rect x="1020" y="240" width="580" height="400" fill={C.wallDark} />
        {Array.from({ length: 40 }, (_, i) => {
          const x0 = i < 20 ? i * 29 : 1020 + (i - 20) * 29
          return <polygon key={i} points={`${x0},240 ${x0 + 9},${214 - (i % 3) * 6} ${x0 + 20},240`} fill="#9fd0c4" strokeWidth={1.5} />
        })}
      </g>
      {/* Iron gate (hotspot cong 800,432) */}
      <g {...O}>
        <rect x="580" y="200" width="30" height="460" fill={C.iron} />
        <rect x="990" y="200" width="30" height="460" fill={C.iron} />
        <rect x="610" y="240" width="380" height="16" fill={C.iron} />
        <rect x="610" y="600" width="380" height="16" fill={C.iron} />
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1={630 + i * 28} y1="240" x2={630 + i * 28} y2="616" strokeWidth="6" stroke={C.iron} />
        ))}
        <path d="M640,240 q160,-90 320,0" fill="none" strokeWidth="8" stroke={C.iron} />
        <rect x="788" y="400" width="24" height="60" fill={C.brass} />
      </g>
      {/* Business card in the gate slot (hotspot danh-thiep 992,522) */}
      <rect x="966" y="510" width="40" height="24" fill="#fbf4e4" {...O} strokeWidth={1.5} transform="rotate(-10 986 522)" />

      {/* Frangipani tree (hotspot hoa-su 320,324) */}
      <g {...O}>
        <path d="M300,720 C290,560 330,460 260,360 M300,560 C360,480 420,430 420,360 M290,470 C230,440 180,400 170,330" fill="none" strokeWidth="26" stroke="#8a7a66" />
        {[[260, 330], [420, 330], [170, 300], [340, 260], [220, 250]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="90" ry="54" fill={i % 2 ? C.green : C.greenDark} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={160 + (i * 41) % 300} cy={240 + (i * 23) % 120} r="9" fill="#fff6dc" strokeWidth={1.5} />
        ))}
      </g>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={220 + (i * 57) % 300} cy={720 + (i * 19) % 80} r="8" fill="#fff6dc" {...O} strokeWidth={1} />
      ))}

      {/* Café sign leaning in the corner (hotspot bang-quan 1344,558) */}
      <g {...O}>
        <rect x="1250" y="440" width="190" height="240" fill={C.lim} transform="rotate(4 1345 560)" />
        <rect x="1280" y="520" width="130" height="70" fill="#fbf4e4" strokeWidth={1.5} transform="rotate(4 1345 560)" />
      </g>
      <text x="1345" y="490" textAnchor="middle" fontSize="22" fontWeight="700" fill="#f3e4c4" fontFamily="Bitter, serif" transform="rotate(4 1345 560)">MÁI NGÓI</text>
      <text x="1345" y="560" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily="IBM Plex Mono, monospace" transform="rotate(4 1345 560)">TẠM ĐÓNG CỬA</text>
      {/* Stacked café chairs */}
      <g {...O} strokeWidth={2}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${1460 + i * 8},${700 - i * 14} l60,0 l0,-70 m-60,70 l0,60 m60,-60 l0,60`} fill="none" stroke="#3a332f" strokeWidth="5" />
        ))}
      </g>
      <Glow x={800} y={420} r={500} o={0.18} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Khoa's annex behind the villa

/** A tin toolbox with its tray open. */
export function Toolbox({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <rect x="0" y="40" width="220" height="100" fill={C.tin} />
      <rect x="0" y="40" width="220" height="16" fill={shade(C.tin, -0.2)} />
      <polygon points="0,40 220,40 240,10 20,10" fill={shade(C.tin, 0.15)} />
      <rect x="30" y="20" width="110" height="10" fill={accent.amber} strokeWidth={1.5} />
      <circle cx="160" cy="26" r="6" fill={C.brass} strokeWidth={1.5} />
      <circle cx="182" cy="26" r="6" fill={C.brass} strokeWidth={1.5} />
    </g>
  )
}

function Annex() {
  return (
    <Frame label="Nhà phụ của Khoa phía sau biệt thự">
      <rect width="1600" height="900" fill="#cdbf9e" />
      <rect y="720" width="1600" height="180" fill="#8f8d86" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 140} y1="720" x2={i * 140} y2="900" stroke="#77756f" strokeWidth="3" />
      ))}
      <Bulb x={700} y={130} />
      <Glow x={700} y={380} r={600} o={0.3} />

      {/* Desk with letters (hotspot xap-thu 768,594) and the toolbox below (hotspot hop-do-nghe 448,630) */}
      <g {...O}>
        <rect x="260" y="560" width="700" height="24" fill="#6e4c34" />
        <rect x="280" y="584" width="22" height="136" fill="#4a3326" />
        <rect x="920" y="584" width="22" height="136" fill="#4a3326" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={700 + i * 10} y={530 - i * 6} width="140" height="34" fill="#fbf4e4" strokeWidth={1.5} transform={`rotate(${i * 3 - 4} 770 545)`} />
        ))}
        <rect x="380" y="500" width="160" height="60" rx="6" fill="#2a2f35" />
        <rect x="396" y="510" width="128" height="40" fill="#5c7480" />
      </g>
      <rect x="740" y="520" width="100" height="10" fill={accent.red} opacity="0.7" transform="rotate(-1 770 545)" />
      <Toolbox x={350} y={590} s={0.9} />

      {/* Wall calendar (hotspot lich 1024,270) */}
      <g {...O}>
        <rect x="920" y="140" width="210" height="260" fill="#fbf4e4" />
        <rect x="920" y="140" width="210" height="50" fill={accent.red} />
        {Array.from({ length: 28 }, (_, i) => (
          <rect key={i} x={932 + (i % 7) * 28} y={204 + Math.floor(i / 7) * 46} width="22" height="38" fill="none" strokeWidth={1} />
        ))}
        <circle cx="1083" cy="223" r="16" fill="none" stroke={accent.red} strokeWidth="3" />
        <rect x="1072" y="250" width="22" height="38" fill={accent.amber} opacity="0.5" strokeWidth={1} />
      </g>
      <text x="1025" y="174" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">THÁNG 4 · 2026</text>

      {/* Door with the suit hanging behind it (hotspot ao-vest 1376,414) */}
      <g {...O}>
        <rect x="1240" y="120" width="290" height="600" fill={C.limDark} />
        <circle cx="1270" cy="430" r="10" fill={C.brass} />
        <path d="M1376,210 l0,-20" strokeWidth="4" />
        <path d="M1376,210 L1300,250 L1300,560 L1452,560 L1452,250 Z" fill="#2f2a2a" />
        <path d="M1376,214 L1344,300 L1376,420 L1408,300 Z" fill="#ece2cf" />
        <path d="M1376,240 L1366,260 L1376,360 L1386,260 Z" fill={accent.red} />
        <rect x="1404" y="300" width="40" height="54" fill="#fbf4e4" strokeWidth={1.5} transform="rotate(8 1424 327)" />
      </g>
      {/* Window on the back wall */}
      <g {...O}>
        <rect x="80" y="160" width="220" height="240" fill={C.sky} />
        <line x1="190" y1="160" x2="190" y2="400" />
      </g>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'cau-thang': Hall,
  'phong-lam-viec': Study,
  'san-cong': Yard,
  'nha-phu': Annex,
}

export { LINE }
