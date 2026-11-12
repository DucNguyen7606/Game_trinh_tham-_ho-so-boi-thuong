import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 10, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  frost: '#c9dbe0',
  frostDark: '#9fb8c0',
  coldFloor: '#7f9aa3',
  carton: '#c9a274',
  cartonDark: '#a8844f',
  wrap: '#e8f1f3',
  tapeDE: '#3d6fb0',
  tapeVN: '#4f9a4a',
  quarantine: '#e6c23a',
  logger: '#2a2f35',
  loggerScreen: '#7fe0c4',
  alarm: '#e0453a',
  wall: '#d8cbb4',
  wallDark: '#b9aa90',
  locker: '#5f7d86',
  jacket: '#2f4a5f',
  tarmac: '#5d5f63',
  tarmacLight: '#77797c',
  sky: '#f2d9a6',
  tractor: '#e0b030',
  shelter: '#3f8a7e',
  steel: '#7d868c',
  silver: '#c9ccd0',
  dirt: '#8a7458',
  tin: '#9aa3a8',
  truck: '#ece2cf',
  rust: '#8a4a2a',
}

const mono = 'IBM Plex Mono, monospace'
const cond = 'Barlow Condensed, sans-serif'

/** One carton of the pallet, front face only. Tape colour tells who sealed it last. */
export function Carton({ x, y, w = 110, h = 70, tape = C.tapeDE, n }: { x: number; y: number; w?: number; h?: number; tape?: string; n?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.carton} {...O} strokeWidth={2.5} />
      <rect x={x + w / 2 - 9} y={y} width="18" height={h} fill={tape} opacity="0.9" />
      <path d={`M${x + 10},${y + 14} h28`} stroke={shade(C.carton, -0.3)} strokeWidth="3" />
      {n && (
        <text x={x + 24} y={y + h - 12} textAnchor="middle" fontSize="16" fontWeight="700" fill={ink.night} fontFamily={cond}>
          {n}
        </text>
      )}
    </g>
  )
}

/** A USB temperature logger with its little screen; `alarm` shows a red cross, else a green tick. */
export function Logger({ x, y, s = 1, alarm = false, label }: { x: number; y: number; s?: number; alarm?: boolean; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-40" y="-22" width="80" height="44" rx="10" fill={C.logger} {...O} strokeWidth={2} />
      <rect x="-28" y="-13" width="38" height="26" rx="3" fill="#10241f" />
      {alarm ? (
        <path d="M-17,-6 l16,12 M-1,-6 l-16,12" stroke={C.alarm} strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M-19,0 l6,6 l12,-11" stroke={C.loggerScreen} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
      <circle cx="24" cy="0" r="6" fill={alarm ? C.alarm : C.loggerScreen} />
      {label && (
        <text x="0" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink.night} fontFamily={mono}>
          {label}
        </text>
      )}
    </g>
  )
}

/** The shrink-wrapped pallet of 40 cartons, front view. (x, y) is the top-left of the stack. */
export function Pallet({ x, y, s = 1, quarantine = true }: { x: number; y: number; s?: number; quarantine?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* wooden pallet base */}
      <rect x="-10" y="400" width="480" height="30" fill="#8a5a3a" {...O} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={20 + i * 190} y="430" width="40" height="24" fill="#5e3b24" {...O} strokeWidth={2} />
      ))}
      {/* four rows of four cartons */}
      {Array.from({ length: 16 }, (_, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        // Carton 17 sits in the middle layer, right side: the one hiding logger TL-B.
        return <Carton key={i} x={col * 115} y={80 + row * 80} w={110} h={76} n={row === 2 && col === 3 ? '17' : undefined} />
      })}
      {/* top carton, opened and re-taped in the terminal's green */}
      <Carton x={115} y={0} w={180} h={78} tape={C.tapeVN} n="1" />
      <Logger x={205} y={-14} s={0.9} alarm />
      {/* shrink wrap sheen */}
      <path d="M-6,74 L466,74 L466,404 L-6,404 Z" fill={C.wrap} opacity="0.22" />
      {[40, 160, 300, 420].map((xx) => (
        <path key={xx} d={`M${xx},80 q14,160 -6,320`} stroke="#fff" strokeWidth="5" opacity="0.35" fill="none" />
      ))}
      {quarantine && (
        <g transform="rotate(-6 80 290)">
          <rect x="30" y="250" width="110" height="74" fill={C.quarantine} {...O} strokeWidth={2} />
          <text x="85" y="280" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent.red} fontFamily={cond}>CÁCH LY</text>
          <text x="85" y="302" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>CHỜ TIÊU HỦY</text>
          <text x="85" y="316" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>28/11</text>
        </g>
      )}
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Cold room no. 3

function ColdRoom() {
  return (
    <Frame label="Phòng lạnh số 3, pallet thuốc quấn màng co dán thẻ cách ly">
      <rect width="1600" height="900" fill={C.frost} />
      <rect y="740" width="1600" height="160" fill={C.coldFloor} />
      {/* insulated wall panels */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 200} y1="0" x2={i * 200} y2="740" stroke={C.frostDark} strokeWidth="4" />
      ))}
      <Glow x={800} y={160} r={700} o={0.18} color="#e8f6ff" />
      {[500, 1100].map((x) => (
        <rect key={x} x={x - 90} y="30" width="180" height="18" rx="6" fill="#f4fbff" {...O} strokeWidth={2} />
      ))}

      {/* wall temperature sensor (hotspot cam-bien 256,270) */}
      <g {...O}>
        <rect x="190" y="210" width="140" height="110" rx="10" fill="#e9eef0" />
        <rect x="206" y="226" width="108" height="50" rx="4" fill="#10241f" strokeWidth={2} />
      </g>
      <text x="260" y="262" textAnchor="middle" fontSize="26" fontWeight="700" fill={C.loggerScreen} fontFamily={mono}>4,6°</text>
      <text x="260" y="302" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily={mono}>MIN 3,9 · MAX 5,6</text>

      {/* the pallet (hotspots thung-tren 704,324 · the-cach-ly 544,522 · thung-17 928,576) */}
      <Pallet x={560} y={300} s={1} />

      {/* neighbouring shelves of other cold goods (hotspot ke-hang 1344,450) */}
      <g {...O}>
        <rect x="1200" y="200" width="300" height="540" fill="none" />
        {[300, 440, 580].map((y) => (
          <rect key={y} x="1200" y={y} width="300" height="12" fill={C.steel} strokeWidth={2} />
        ))}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={1215 + c * 95} y={240 + r * 140} width="80" height="60" fill={['#ece2cf', '#7a9fb0', '#cfe0e4'][(r + c) % 3]} strokeWidth={2} />
          )),
        )}
        <line x1="1200" y1="200" x2="1200" y2="740" strokeWidth={5} />
        <line x1="1500" y1="200" x2="1500" y2="740" strokeWidth={5} />
      </g>

      {/* breath-like mist */}
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx={200 + i * 260} cy={760} rx="180" ry="26" fill="#f4fbff" opacity="0.35" />
      ))}
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Night-shift break room

/** A padded cold-store jacket hanging on a hook, with the inner chest pocket showing. */
export function Jacket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <path d="M-70,0 Q0,-26 70,0 L96,170 L60,176 L56,240 L-56,240 L-60,176 L-96,170 Z" fill={C.jacket} />
      {[40, 90, 140, 190].map((yy) => (
        <path key={yy} d={`M-56,${yy} Q0,${yy + 10} 56,${yy}`} fill="none" stroke={shade(C.jacket, -0.35)} strokeWidth={2.5} />
      ))}
      <path d="M0,-12 L0,240" strokeWidth={2} />
      <path d="M2,40 L40,40 L40,96 L2,96" fill={shade(C.jacket, 0.2)} strokeWidth={2} />
      <rect x="14" y="56" width="16" height="12" rx="4" fill={C.tapeDE} strokeWidth={1.5} />
    </g>
  )
}

function BreakRoom() {
  return (
    <Frame label="Phòng nghỉ ca đêm cạnh kho lạnh, tivi và dãy tủ đồ">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="720" width="1600" height="180" fill="#8f8d86" />
      <Bulb x={700} y={120} />
      <Glow x={700} y={360} r={600} o={0.28} />
      <Beam x={700} y={130} w={760} h={600} o={0.14} />

      {/* air conditioner */}
      <rect x="420" y="70" width="240" height="70" rx="12" fill="#f2f2ee" {...O} />
      <path d="M440,124 h200" stroke={LINE} strokeWidth="2" />

      {/* shift board (hotspot bang-ca 288,360) */}
      <g {...O}>
        <rect x="160" y="250" width="260" height="220" fill="#f6f4ee" />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1="160" y1={290 + i * 36} x2="420" y2={290 + i * 36} strokeWidth={1.5} />
        ))}
        <line x1="250" y1="250" x2="250" y2="470" strokeWidth={1.5} />
        <rect x="252" y="400" width="166" height="34" fill={accent.amber} opacity="0.35" stroke="none" />
      </g>
      <text x="290" y="276" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink.night} fontFamily={cond}>BẢNG CA 10–16/11</text>
      <text x="334" y="424" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily={mono}>15/11 · TÙNG</text>

      {/* thermometer (hotspot nhiet-ke 704,216) */}
      <g {...O}>
        <rect x="650" y="180" width="110" height="80" rx="8" fill="#e9eef0" />
        <rect x="662" y="192" width="86" height="36" rx="3" fill="#10241f" strokeWidth={2} />
      </g>
      <text x="705" y="219" textAnchor="middle" fontSize="20" fontWeight="700" fill={C.loggerScreen} fontFamily={mono}>24°</text>
      <text x="705" y="249" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>MAX 24,5</text>

      {/* TV with the football calendar (hotspot tivi 896,270) */}
      <g {...O}>
        <rect x="800" y="190" width="220" height="140" rx="6" fill="#1f2328" />
        <rect x="814" y="204" width="192" height="112" fill="#3f8a4a" />
        <line x1="910" y1="204" x2="910" y2="316" stroke="#e8f1e8" strokeWidth={2} />
        <circle cx="910" cy="260" r="20" fill="none" stroke="#e8f1e8" strokeWidth={2} />
        <rect x="1036" y="200" width="70" height="96" fill="#f6f4ee" strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={1056 + (i % 2) * 28} cy={222 + Math.floor(i / 2) * 36} r="9" fill="none" stroke={accent.red} strokeWidth={2} />
        ))}
      </g>

      {/* plastic table (hotspot ban 640,666) */}
      <g {...O}>
        <ellipse cx="640" cy="640" rx="200" ry="40" fill="#e9e3d2" />
        <path d="M620,676 L600,780 M660,676 L680,780" strokeWidth={8} />
        <rect x="560" y="606" width="40" height="40" rx="6" fill="#7d2f2a" />
        <rect x="620" y="604" width="70" height="30" fill="#e7d2a8" />
        <circle cx="730" cy="622" r="20" fill={C.tapeVN} />
        <circle cx="730" cy="622" r="8" fill="#e9e3d2" />
      </g>

      {/* lockers (hotspot ao-khoac 1280,414) */}
      <g {...O}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={1100 + i * 140} y="200" width="136" height="520" fill={C.locker} />
            <rect x={1120 + i * 140} y="240" width="80" height="10" fill={shade(C.locker, -0.3)} />
          </g>
        ))}
        <rect x="1240" y="200" width="136" height="520" fill={shade(C.locker, -0.45)} />
      </g>
      <text x="1308" y="190" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink.night} fontFamily={cond}>TÙNG</text>
      <Jacket x={1308} y={290} s={0.62} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Apron and the cold-goods waiting area

/** A baggage tractor with a tablet on its dash. */
export function Tractor({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <rect x="0" y="-120" width="260" height="90" rx="10" fill={C.tractor} />
      <rect x="40" y="-210" width="120" height="96" fill="none" strokeWidth={5} />
      <rect x="40" y="-216" width="140" height="14" fill={shade(C.tractor, -0.2)} />
      <rect x="150" y="-160" width="56" height="40" rx="4" fill="#1f2328" />
      <rect x="156" y="-154" width="44" height="28" fill={C.loggerScreen} opacity="0.6" />
      <circle cx="56" cy="-24" r="34" fill="#1f2328" />
      <circle cx="56" cy="-24" r="12" fill={C.silver} />
      <circle cx="210" cy="-24" r="34" fill="#1f2328" />
      <circle cx="210" cy="-24" r="12" fill={C.silver} />
      <text x="90" y="-66" fontSize="26" fontWeight="700" fill={ink.night} fontFamily={cond} stroke="none">12</text>
    </g>
  )
}

function Apron() {
  return (
    <Frame label="Sân đỗ máy bay giữa trưa, xe kéo hàng và khu chờ có mái che">
      <rect width="1600" height="900" fill={C.sky} />
      <Glow x={1200} y={60} r={500} o={0.5} color="#fff2c4" />
      {/* distant terminal and a parked aircraft */}
      <rect y="300" width="1600" height="60" fill="#a8a294" />
      <g {...O}>
        <path d="M200,300 Q240,250 520,250 L700,250 Q740,250 740,280 L740,300 Z" fill="#f2f2ee" />
        <path d="M420,260 L360,180 L400,180 L500,256 Z" fill={C.silver} />
        <path d="M640,252 L700,196 L720,196 L690,252 Z" fill="#2f4258" />
      </g>
      <rect y="360" width="1600" height="540" fill={C.tarmac} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 220} y="600" width="120" height="10" fill="#e6c23a" opacity="0.8" />
      ))}
      {/* heat shimmer */}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${i * 340},380 q40,-10 80,0 t80,0`} stroke="#fff" strokeWidth="3" opacity="0.25" fill="none" />
      ))}

      {/* weather board (hotspot bang-thoi-tiet 1408,198) */}
      <g {...O}>
        <rect x="1330" y="130" width="160" height="130" fill="#1f2328" />
        <line x1="1410" y1="260" x2="1410" y2="360" strokeWidth={6} />
      </g>
      <text x="1410" y="170" textAnchor="middle" fontSize="13" fill="#f3e4c4" fontFamily={mono}>15/11 13:00</text>
      <text x="1410" y="220" textAnchor="middle" fontSize="40" fontWeight="700" fill={accent.amber} fontFamily={mono}>34°</text>

      {/* covered cold waiting area (hotspot mai-che 1120,360) */}
      <g {...O}>
        <path d="M940,300 L1300,300 L1320,340 L920,340 Z" fill={C.shelter} />
        {[950, 1290].map((x) => (
          <line key={x} x1={x} y1="340" x2={x} y2="560" strokeWidth={6} />
        ))}
        <rect x="940" y="540" width="360" height="20" fill="none" stroke="#7fd0a0" strokeWidth={4} strokeDasharray="20 12" />
      </g>
      <rect x="940" y="340" width="360" height="200" fill="#1c130f" opacity="0.2" />
      <text x="1120" y="326" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f3e4c4" fontFamily={cond}>HÀNG LẠNH CHỜ NHẬP KHO · TỐI ĐA 30 PHÚT</text>

      {/* tractor (hotspot may-tinh-bang 480,414) and dolly (hotspot ro-mooc 832,630) */}
      <Tractor x={300} y={560} s={1.1} />
      <g {...O}>
        <rect x="640" y="600" width="360" height="40" fill={C.steel} />
        {[680, 960].map((x) => (
          <circle key={x} cx={x} cy="660" r="22" fill="#1f2328" />
        ))}
        <line x1="600" y1="620" x2="640" y2="620" strokeWidth={6} />
        {[0, 1].map((i) => (
          <rect key={i} x={660 + i * 170} y="510" width="150" height="90" fill="#b0925c" />
        ))}
      </g>
      <ellipse cx="800" cy="700" rx="420" ry="24" fill="#1c130f" opacity="0.25" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Hưng Thịnh's yard in Bình Chánh

/** A rented refrigerated truck, side view, cooling unit on the front of the box. */
export function ColdTruck({ x, y, s = 1, door = false }: { x: number; y: number; s?: number; door?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <rect x="0" y="-260" width="400" height="200" fill={C.truck} />
      <rect x="-30" y="-250" width="34" height="70" fill="#4a5258" />
      <path d="M400,-180 L470,-180 L510,-120 L510,-60 L400,-60 Z" fill="#2f4258" />
      <path d="M418,-170 L466,-170 L494,-126 L418,-126 Z" fill="#9fc2d0" />
      <rect x="20" y="-230" width="160" height="40" fill="#3f6aa8" strokeWidth={2} />
      {door && <rect x="380" y="-250" width="16" height="180" fill="#151719" />}
      {[70, 330, 450].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="-50" r="36" fill="#1f2328" />
          <circle cx={cx} cy="-50" r="13" fill={C.silver} />
        </g>
      ))}
      <text x="100" y="-203" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" stroke="none" fontFamily={cond}>LẠNH VIỆT</text>
      <text x="-13" y="-196" textAnchor="middle" fontSize="12" fill={C.loggerScreen} stroke="none" fontFamily={mono}>4°</text>
    </g>
  )
}

function Yard() {
  return (
    <Frame label="Bãi xe Công ty Môi trường Hưng Thịnh, lò đốt và xe tải thùng lạnh">
      <rect width="1600" height="900" fill="#b9b2a2" />
      <rect y="620" width="1600" height="280" fill={C.dirt} />
      {/* tin-roofed shed */}
      <g {...O}>
        <path d="M0,140 L760,140 L800,200 L0,200 Z" fill={C.tin} />
        <rect x="0" y="200" width="780" height="420" fill="#a39a88" />
      </g>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 66} y1="140" x2={i * 66 + 20} y2="200" stroke={shade(C.tin, -0.3)} strokeWidth="3" />
      ))}
      {/* price board (hotspot bang-gia 192,270) */}
      <g {...O}>
        <rect x="80" y="220" width="230" height="130" fill="#f6f4ee" />
      </g>
      <text x="195" y="252" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink.night} fontFamily={cond}>BẢNG GIÁ TIÊU HỦY</text>
      {['Dược phẩm 18.000đ/kg', 'Cấp biên bản trong ngày'].map((t, i) => (
        <text key={t} x="195" y={286 + i * 26} textAnchor="middle" fontSize="12" fill={ink.night} fontFamily={mono}>
          {t}
        </text>
      ))}

      {/* incinerator, cold and tagged for maintenance (hotspot lo-dot 1120,360) */}
      <g {...O}>
        <rect x="1060" y="40" width="70" height="200" fill={C.rust} />
        <rect x="960" y="240" width="320" height="300" fill="#6f6d67" />
        <rect x="1040" y="320" width="160" height="140" rx="70" fill="#3a332f" />
        <rect x="1060" y="380" width="120" height="58" fill={C.quarantine} strokeWidth={2} />
      </g>
      <text x="1120" y="404" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily={cond}>BẢO TRÌ</text>
      <text x="1120" y="426" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily={mono}>10/11–10/12</text>
      <text x="1120" y="226" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f3e4c4" fontFamily={cond}>LÒ SỐ 1</text>

      {/* the rented refrigerated truck (hotspot xe-lanh 512,486) */}
      <ColdTruck x={240} y={700} s={1} />

      {/* drums (hotspot thung-phuy 1408,630) */}
      <g {...O}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={1310 + (i % 2) * 100} y={i < 2 ? 580 : 470} width="86" height="110" rx="8" fill={['#2f4258', '#7d2f2a', '#6b6a35', '#2f4258'][i]} />
            <line x1={1310 + (i % 2) * 100} y1={i < 2 ? 616 : 506} x2={1396 + (i % 2) * 100} y2={i < 2 ? 616 : 506} strokeWidth={2} />
          </g>
        ))}
      </g>
      <Glow x={800} y={200} r={700} o={0.15} />
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'phong-lanh': ColdRoom,
  'phong-nghi': BreakRoom,
  'san-do': Apron,
  'hung-thinh': Yard,
}

export { LINE }
