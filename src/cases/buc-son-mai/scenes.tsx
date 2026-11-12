import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'
import { CigPack, Glasses, Loupe } from '@/art/noiseProps'

// Backdrops for the four zones of Chapter 3, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  wall: '#e9dfcc',
  wallShade: '#cdbfa6',
  floor: '#6b4c36',
  floorLit: '#8a6448',
  lacquer: '#1d1513',
  lacquerRed: '#7a1f19',
  gold: '#d9b04f',
  egg: '#f3ead6',
  alley: '#2d2a2e',
  alleyWall: '#4a4246',
  wood: '#7a4f32',
  woodDark: '#573721',
  lim: '#5a2f22',
  dust: '#b9b1a3',
  board: '#8a7a62',
}

/**
 * The painting "Thiếu nữ bên sen": a girl in a white áo dài among gold lotuses
 * on black lacquer. The real one has a vermilion dragonfly, the signature
 * "Khuê 62" and a crackle in the lower left; the copy has a yellow dragonfly,
 * "Khuê 1962" and no crackle.
 */
export function LotusPainting({ fake = false, x = 0, y = 0, w = 300 }: { fake?: boolean; x?: number; y?: number; w?: number }) {
  const s = w / 300
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width="300" height="240" fill={C.lacquer} />
      <rect width="300" height="240" fill={C.lacquerRed} opacity="0.25" />
      {/* Water and lotus leaves */}
      <path d="M0,180 Q150,160 300,186 L300,240 L0,240 Z" fill="#2b2420" />
      {[[50, 196, 40], [240, 200, 46], [140, 214, 30]].map(([cx, cy, r]) => (
        <ellipse key={cx} cx={cx} cy={cy} rx={r} ry={r * 0.32} fill="#3f5e3a" stroke={C.gold} strokeWidth="1.5" />
      ))}
      {/* Lotus flowers in gold and eggshell */}
      {[[70, 150], [230, 140], [190, 178]].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <line x1="0" y1="10" x2={i === 1 ? 6 : -4} y2="44" stroke="#3f5e3a" strokeWidth="3" />
          <path d="M0,10 C-18,0 -16,-20 0,-26 C16,-20 18,0 0,10 Z" fill={C.egg} stroke={C.gold} strokeWidth="1.5" />
          <path d="M0,10 C-26,6 -28,-10 -16,-16 M0,10 C26,6 28,-10 16,-16" fill="none" stroke={C.gold} strokeWidth="2" />
          <path d="M-6,-6 l2,4 M4,-10 l-2,4 M2,0 l3,3" stroke="#d8cdb6" strokeWidth="1" />
        </g>
      ))}
      {/* The girl in a white áo dài, side-on */}
      <g transform="translate(140 60)">
        <path d="M-12,30 Q-22,80 -30,150 L28,150 Q18,80 12,30 Z" fill={C.egg} stroke={C.gold} strokeWidth="1.5" />
        <path d="M-10,34 Q-30,70 -14,92" stroke={C.egg} strokeWidth="9" fill="none" strokeLinecap="round" />
        <ellipse cx="0" cy="12" rx="12" ry="15" fill="#e0b48a" />
        <path d="M-12,8 Q-10,-8 4,-6 Q16,-4 14,10 Q22,40 10,60 Q6,30 8,12 Z" fill="#0c0a09" />
        <path d="M-6,22 Q-2,24 2,22" stroke={accent.red} strokeWidth="1.5" fill="none" />
      </g>
      {/* Dragonfly, top right */}
      <g transform="translate(250 46)">
        <line x1="-14" y1="0" x2="14" y2="0" stroke={fake ? '#e8c440' : '#c23a2c'} strokeWidth="3" strokeLinecap="round" />
        {[-1, 1].map((d) => (
          <g key={d}>
            <ellipse cx="-4" cy={d * 7} rx="8" ry="3" fill={fake ? '#f2d66a' : '#e0503a'} opacity="0.85" />
            <ellipse cx="5" cy={d * 7} rx="7" ry="2.6" fill={fake ? '#f2d66a' : '#e0503a'} opacity="0.85" />
          </g>
        ))}
      </g>
      {/* Crackle, lower left, on the real one only */}
      {!fake && (
        <path d="M6,206 l14,-6 l6,10 l12,-4 M14,222 l10,-8 l12,4 M26,200 l4,14" stroke="#8a7a62" strokeWidth="1" fill="none" />
      )}
      <text x="286" y="232" textAnchor="end" fontSize="11" fill={C.gold} fontFamily="Bitter, serif" fontStyle="italic">
        {fake ? 'Khuê 1962' : 'Khuê 62'}
      </text>
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. The gallery hall with the empty frame

function Hall() {
  return (
    <Frame label="Phòng trưng bày tường trắng, khung tranh trống giữa tường">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="0" width="1600" height="70" fill={C.wallShade} />
      <path d="M0,700 L1600,700 L1600,900 L0,900 Z" fill={C.floor} />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={i * 110} y1="700" x2={i * 110 - 80} y2="900" stroke={shade(C.floor, -0.25)} strokeWidth="3" />
      ))}
      <path d="M0,700 L1600,700 L1600,712 L0,712 Z" fill={shade(C.floor, -0.35)} />

      {/* Track lights and their pools */}
      <rect x="120" y="70" width="1360" height="12" fill={ink.night} />
      {[290, 800, 1180].map((x) => (
        <g key={x}>
          <rect x={x - 14} y="80" width="28" height="36" rx="6" fill={ink.night} />
          <Beam x={x} y={116} w={420} h={520} o={0.3} />
        </g>
      ))}
      <Glow x={800} y={400} r={360} o={0.35} />

      {/* Other works on the left (hotspot tranh-khac at 288,378) */}
      <g {...O}>
        <rect x="160" y="250" width="130" height="170" fill={C.gold} />
        <rect x="172" y="262" width="106" height="146" fill="#7a9fb0" />
        <circle cx="225" cy="320" r="26" fill="#f2c46b" />
        <rect x="320" y="290" width="120" height="150" fill={C.woodDark} />
        <rect x="330" y="300" width="100" height="130" fill={C.lacquer} />
        <path d="M340,400 Q380,340 420,390" stroke={C.gold} strokeWidth="4" fill="none" />
      </g>

      {/* The empty carved frame (hotspot khung-trong at 800,396) */}
      <g {...O}>
        <rect x="610" y="230" width="380" height="320" fill={C.lim} />
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={630 + i * 38} cy="244" r="7" fill={C.gold} strokeWidth={1.5} />
        ))}
        <rect x="640" y="262" width="320" height="260" fill={C.wallShade} />
        <rect x="640" y="262" width="320" height="260" fill={ink.night} opacity="0.12" />
        {/* MDF chip caught in the corner */}
        <path d="M940,500 l18,-4 l2,20 l-16,2 Z" fill="#c9a274" strokeWidth={2} />
        <path d="M942,502 l14,-3" stroke={ink.night} strokeWidth="5" />
      </g>
      <rect x="760" y="570" width="80" height="22" rx="3" fill={C.egg} {...O} strokeWidth={2} />

      {/* Ceiling camera (hotspot camera at 1344,144) */}
      <g {...O}>
        <rect x="1330" y="82" width="14" height="40" fill={ink.night} />
        <rect x="1300" y="118" width="90" height="40" rx="10" fill="#e8e2d4" />
        <circle cx="1310" cy="138" r="12" fill={ink.night} />
        <circle cx="1376" cy="128" r="5" fill="#6b6660" strokeWidth={1.5} />
      </g>

      {/* Auction poster on an easel (hotspot ap-phich at 1184,630) */}
      <g {...O}>
        <path d="M1120,800 L1180,460 L1240,800 M1180,460 V800" fill="none" stroke={C.woodDark} strokeWidth="8" />
        <rect x="1080" y="480" width="200" height="260" fill="#f6efe2" />
        <rect x="1080" y="480" width="200" height="50" fill={accent.red} />
        <rect x="1110" y="550" width="140" height="110" fill={C.lacquer} />
      </g>
      <text x="1180" y="512" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">ĐẤU GIÁ 22/11</text>
      <text x="1180" y="700" textAnchor="middle" fontSize="16" fill={ink.night} fontFamily="Bitter, serif">Thiếu nữ bên sen</text>
      <LotusPainting x={1112} y={552} w={136} />

      {/* Bench */}
      <rect x="540" y="740" width="520" height="40" rx="8" fill={C.wood} {...O} />
      <Glasses x={512} y={640} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. The back door and the alley

function Alley() {
  return (
    <Frame label="Hẻm tối sau phòng tranh, cửa gỗ có vết cạy">
      <rect width="1600" height="900" fill={C.alley} />
      {/* Walls of the alley in perspective */}
      <path d="M0,0 L560,140 L560,700 L0,900 Z" fill={C.alleyWall} />
      <path d="M1600,0 L1040,140 L1040,700 L1600,900 Z" fill={shade(C.alleyWall, -0.2)} />
      <path d="M560,140 L1040,140 L1040,700 L560,700 Z" fill="#1d1a1e" />
      <path d="M0,900 L560,700 L1040,700 L1600,900 Z" fill="#3a3538" />
      {/* Tangle of wires overhead */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M0,${60 + i * 26} Q800,${180 + i * 30} 1600,${50 + i * 24}`} stroke={ink.night} strokeWidth="3" fill="none" />
      ))}
      <Bulb x={800} y={250} />
      <Glow x={800} y={300} r={340} o={0.3} />

      {/* The back door on the left wall (hotspot vet-cay at 672,450) */}
      <g {...O}>
        <path d="M560,300 L760,330 L760,690 L560,700 Z" fill={C.wood} />
        <path d="M580,330 L740,352 L740,672 L580,680 Z" fill={C.woodDark} opacity="0.4" />
        <rect x="660" y="440" width="26" height="40" fill="#9a968f" />
        {/* Splinters falling outward into the alley */}
        <path d="M688,452 l22,-6 M690,466 l26,4 M688,476 l18,12" stroke="#c9a274" strokeWidth="4" />
      </g>
      {[[730, 700], [760, 712], [744, 724]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="10" height="4" fill="#c9a274" />
      ))}

      {/* Alarm keypad (hotspot ban-phim at 352,396) */}
      <g {...O}>
        <rect x="310" y="350" width="90" height="110" rx="8" fill="#e8e2d4" />
        <rect x="324" y="364" width="62" height="20" fill="#2f7a4f" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={326 + (i % 3) * 20} y={394 + Math.floor(i / 3) * 18} width="14" height="12" rx="2" fill="#cfc6b2" strokeWidth={1.5} />
        ))}
      </g>

      {/* Puddle with a shoe print (hotspot dau-giay at 960,756) */}
      <ellipse cx="940" cy="770" rx="170" ry="34" fill="#4f6f72" opacity="0.6" />
      {[[900, 760], [960, 780], [1010, 752]].map(([x, y], i) => (
        <g key={x} transform={`rotate(${i % 2 ? 12 : -12} ${x} ${y})`}>
          <ellipse cx={x} cy={y - 8} rx="10" ry="16" fill="#26232b" />
          <ellipse cx={x} cy={y + 14} rx="8" ry="8" fill="#26232b" />
        </g>
      ))}

      {/* Bins (hotspot thung-rac at 1344,594) */}
      <g {...O}>
        <rect x="1260" y="540" width="170" height="200" rx="10" fill="#3f6b3a" />
        <rect x="1250" y="520" width="190" height="30" rx="8" fill="#2f5230" />
        <rect x="1440" y="600" width="120" height="160" rx="8" fill="#5a5552" />
      </g>
      {/* The noodle cart's lamp at the end of the alley */}
      <Glow x={800} y={620} r={110} o={0.6} color="#ffcf8a" />
      <rect x="760" y="590" width="80" height="60" rx="6" fill={C.wood} {...O} />
      <CigPack x={480} y={690} color="#e8dcc4" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Diệp's office on the mezzanine

function Office() {
  return (
    <Frame label="Phòng làm việc của bà Diệp, bàn gỗ, máy hủy giấy và chiếc khăn trên ghế">
      <rect width="1600" height="900" fill="#5a4134" />
      {/* Bookshelves */}
      <g {...O}>
        <rect x="40" y="80" width="420" height="520" fill={C.woodDark} />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="40" y={200 + r * 120} width="420" height="14" fill={C.wood} />
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={56 + i * 33} y={110 + r * 120} width="26" height="90" fill={['#7d2f2a', '#2f4258', '#b0925c', '#3f8a7e'][(i + r) % 4]} strokeWidth={1.5} />
            ))}
          </g>
        ))}
      </g>
      <Glow x={900} y={320} r={520} o={0.35} />
      <path d="M0,690 L1600,690 L1600,900 L0,900 Z" fill={C.floor} />
      <Bulb x={900} y={120} />
      <Beam x={900} y={130} w={900} h={600} o={0.2} />

      {/* Desk with the computer (hotspot may-tinh at 736,450) */}
      <g {...O}>
        <rect x="560" y="520" width="560" height="34" fill={C.lim} />
        <rect x="580" y="554" width="30" height="190" fill={shade(C.lim, -0.2)} />
        <rect x="1070" y="554" width="30" height="190" fill={shade(C.lim, -0.2)} />
        <rect x="650" y="380" width="180" height="120" rx="6" fill="#2a2522" />
        <rect x="662" y="392" width="156" height="96" fill="#2f4258" />
        <rect x="720" y="500" width="40" height="22" fill="#2a2522" />
      </g>
      <text x="740" y="446" textAnchor="middle" fontSize="18" fill="#fff" fontFamily="IBM Plex Mono, monospace">🔒</text>

      {/* Desk calendar (hotspot lich-ban at 1312,270) */}
      <g {...O}>
        <rect x="1240" y="210" width="150" height="130" fill="#f6efe2" />
        <rect x="1240" y="210" width="150" height="30" fill={accent.red} />
        <circle cx="1330" cy="292" r="18" fill="none" stroke={accent.red} strokeWidth="3" />
      </g>
      <text x="1315" y="232" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">THÁNG 11</text>

      {/* Chair with the silk scarf (hotspot khan at 1056,432) */}
      <g {...O}>
        <rect x="960" y="360" width="190" height="200" rx="16" fill="#7d2f2a" />
        <rect x="980" y="560" width="150" height="30" rx="6" fill="#5a2320" />
        <path d="M980,380 Q1060,420 1140,380 L1130,470 Q1100,520 1090,560 L1070,560 Q1080,500 1060,440 Q1020,430 990,470 Z" fill={C.egg} />
        <path d="M1090,560 L1070,560 M990,470 L980,380" stroke={accent.red} strokeWidth="5" />
      </g>

      {/* Shredder (hotspot may-huy at 448,648) */}
      <g {...O}>
        <rect x="370" y="600" width="160" height="150" rx="8" fill="#3a332f" />
        <rect x="360" y="580" width="180" height="30" rx="6" fill="#2a2522" />
        <rect x="384" y="620" width="132" height="110" fill="#f6efe2" opacity="0.9" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={390 + i * 11} y1="622" x2={392 + i * 11} y2="726" stroke="#c4b494" strokeWidth="2" />
        ))}
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Quân's restoration workshop

function Workshop() {
  return (
    <Frame label="Xưởng sơn mài của Quân, tấm ván dựng tường và giấy can trên bảng">
      <rect width="1600" height="900" fill="#4a3a2e" />
      <rect y="0" width="1600" height="900" fill={C.dust} opacity="0.12" />
      <path d="M0,660 L1600,660 L1600,900 L0,900 Z" fill="#3a2b23" />
      <ellipse cx="800" cy="760" rx="700" ry="60" fill={C.dust} opacity="0.15" />
      <Bulb x={760} y={110} />
      <Glow x={760} y={300} r={560} o={0.3} />
      {/* Window with Bình Thạnh rooftops */}
      <g {...O}>
        <rect x="1180" y="100" width="300" height="220" fill="#3d4a52" />
        <path d="M1180,260 L1240,220 L1300,250 L1360,200 L1420,240 L1480,210 L1480,320 L1180,320 Z" fill="#26232b" />
        <path d="M1330,100 V320 M1180,210 H1480" stroke={C.woodDark} strokeWidth="10" />
      </g>

      {/* Tracing paper pinned to the board (hotspot giay-can at 992,306) */}
      <g {...O}>
        <rect x="820" y="160" width="340" height="280" fill={C.board} />
        <rect x="850" y="186" width="280" height="226" fill="#f6efe2" opacity="0.8" />
        <path d="M940,400 Q920,300 960,240 Q990,230 1000,260 Q1010,320 1020,400 Z" fill="none" stroke="#2f4258" strokeWidth="2" />
        <path d="M880,360 C866,350 868,330 880,326 C892,330 894,350 880,360 Z M1080,350 C1066,340 1068,320 1080,316 C1092,320 1094,340 1080,350 Z" fill="none" stroke="#2f4258" strokeWidth="2" />
        <text x="1100" y="402" fontSize="14" fill="#2f4258" fontFamily="Bitter, serif" fontStyle="italic" stroke="none">Khuê</text>
        {[[850, 186], [1130, 186], [850, 412], [1130, 412]].map(([x, y]) => (
          <circle key={x + y} cx={x} cy={y} r="6" fill={accent.red} strokeWidth={1.5} />
        ))}
      </g>

      {/* MDF board leaning on the wall (hotspot van-mdf at 512,504) */}
      <g {...O}>
        <path d="M360,300 L660,290 L690,660 L340,670 Z" fill="#1d1513" />
        <path d="M660,290 L676,292 L706,660 L690,660 Z" fill="#c9a274" />
        <path d="M380,620 L660,612" stroke="#c9a274" strokeWidth="6" opacity="0.6" />
      </g>

      {/* Long workbench */}
      <g {...O}>
        <rect x="760" y="560" width="760" height="30" fill={C.wood} />
        <rect x="780" y="590" width="26" height="150" fill={C.woodDark} />
        <rect x="1480" y="590" width="26" height="150" fill={C.woodDark} />
        <rect x="860" y="520" width="140" height="40" rx="4" fill="#9a968f" />
        <rect x="1040" y="510" width="80" height="50" rx="6" fill={accent.red} />
      </g>
      {/* Jar of crushed eggshell (hotspot hu-vo-trung at 1312,630) */}
      <g {...O}>
        <path d="M1260,520 h100 l10,40 h-120 Z" fill="#cfc6b2" />
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={1270 + i * 12} cy={540 + (i % 2) * 8} r="4" fill={C.egg} strokeWidth={1} />
        ))}
      </g>

      {/* Client book on a stool (hotspot so-khach at 224,594) */}
      <g {...O}>
        <rect x="150" y="600" width="150" height="20" fill={C.wood} />
        <rect x="166" y="620" width="16" height="120" fill={C.woodDark} />
        <rect x="268" y="620" width="16" height="120" fill={C.woodDark} />
        <path d="M160,600 L180,560 L290,560 L280,600 Z" fill="#e7d2a8" />
      </g>
      <Loupe x={768} y={690} />
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'trung-bay': Hall,
  'cua-sau': Alley,
  'van-phong': Office,
  xuong: Workshop,
}

export { LINE }
