import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 9, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  wall: '#d8cbb4',
  wallDark: '#b9aa90',
  wood: '#8a5a3a',
  woodDark: '#5e3b24',
  safe: '#3c4148',
  safeDark: '#272b30',
  screen: '#7fe0c4',
  silver: '#c9ccd0',
  bed: '#e9dfcc',
  river: '#3f5f72',
  sky: '#24324a',
  city: '#33415a',
  glass: '#9fc2d0',
  carpet: '#2f6b5c',
  carpetDark: '#24564a',
  steel: '#7d868c',
  concrete: '#8f8d86',
  pipe: '#4f7a8a',
  boot: '#3a2e26',
  gold: '#d9b04f',
  leather: '#6b3a2a',
}

/** A wall safe with its keypad and display. (x, y) is the top-left of the door. */
export function Safe({ x, y, s = 1, open = true }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-20" y="-20" width="300" height="300" fill={C.safeDark} {...O} />
      {open && <rect x="0" y="0" width="260" height="260" fill="#151719" />}
      {open && (
        <g>
          <rect x="20" y="150" width="220" height="8" fill={C.steel} />
          <rect x="40" y="110" width="90" height="40" rx="6" fill={C.leather} opacity="0.4" />
        </g>
      )}
      <g transform={open ? 'translate(0 0) skewY(-8) scale(0.55 1)' : undefined}>
        <rect x="0" y="0" width="260" height="260" fill={C.safe} {...O} />
        <rect x="70" y="40" width="120" height="40" rx="4" fill="#10241f" {...O} strokeWidth={2} />
        <text x="130" y="67" textAnchor="middle" fontSize="20" fill={C.screen} fontFamily="IBM Plex Mono, monospace">
          02:19
        </text>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={80 + (i % 3) * 36} y={100 + Math.floor(i / 3) * 30} width="28" height="22" rx="4" fill={C.silver} {...O} strokeWidth={1.5} />
        ))}
        <circle cx="130" cy="236" r="10" fill={C.silver} {...O} strokeWidth={2} />
        <rect x="122" y="230" width="16" height="12" fill="#e8e8f0" opacity="0.8" />
      </g>
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Bedroom with the safe

function Bedroom() {
  return (
    <Frame label="Phòng ngủ kiêm phòng livestream, két sắt âm tủ gỗ mở hé">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="720" width="1600" height="180" fill={C.woodDark} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={i * 180} y1="720" x2={i * 180 - 80} y2="900" stroke={shade(C.woodDark, -0.25)} strokeWidth="3" />
      ))}
      <Bulb x={900} y={70} />
      <Glow x={700} y={380} r={640} o={0.25} />

      {/* Built-in wooden cabinet with the safe (hotspots ket 416,594 and man-hinh-ket 608,432) */}
      <rect x="200" y="200" width="560" height="520" fill={C.wood} {...O} />
      <rect x="220" y="220" width="250" height="230" fill={shade(C.wood, -0.15)} {...O} strokeWidth={2} />
      <Safe x={300} y={400} s={1} />

      {/* Ring light and phone stand (hotspot den-live 736,270) */}
      <g {...O}>
        <line x1="740" y1="300" x2="740" y2="720" stroke={LINE} strokeWidth="6" />
        <path d="M700,720 L740,690 L780,720" fill="none" strokeWidth="5" />
        <circle cx="740" cy="250" r="70" fill="none" stroke="#f6f2e6" strokeWidth="16" />
        <circle cx="740" cy="250" r="70" fill="none" stroke={LINE} strokeWidth="2" />
        <rect x="722" y="218" width="36" height="64" rx="6" fill={ink.night} />
      </g>
      <Glow x={740} y={250} r={160} o={0.35} color="#fff6dc" />

      {/* Bed with the empty watch box (hotspot hop-dong-ho 896,684) */}
      <g {...O}>
        <rect x="820" y="600" width="300" height="120" fill={C.bed} />
        <rect x="820" y="540" width="40" height="180" fill={C.woodDark} />
        <rect x="860" y="580" width="250" height="30" fill="#d4c6ae" />
        <rect x="860" y="640" width="150" height="50" rx="6" fill={C.leather} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={872 + i * 46} y="650" width="36" height="30" rx="4" fill="#e9dccb" strokeWidth={1.5} />
        ))}
      </g>

      {/* Vanity table with the safe's warranty booklet (hotspot so-bao-hanh 1296,486) */}
      <g {...O}>
        <rect x="1200" y="260" width="200" height="200" rx="90" fill="#cfe0e4" />
        <rect x="1170" y="460" width="260" height="24" fill={C.woodDark} />
        <rect x="1190" y="484" width="20" height="236" fill={C.woodDark} />
        <rect x="1390" y="484" width="20" height="236" fill={C.woodDark} />
        <rect x="1260" y="438" width="70" height="24" fill="#e7d2a8" transform="rotate(-6 1295 450)" />
      </g>
      <text x="1295" y="455" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily="IBM Plex Mono, monospace" transform="rotate(-6 1295 450)">
        BẢO HÀNH
      </text>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Living room and balcony over the river

function LivingRoom() {
  return (
    <Frame label="Phòng khách nhìn ra sông Sài Gòn, cửa chính khóa điện tử">
      <rect width="1600" height="900" fill={C.wall} />
      <rect y="720" width="1600" height="180" fill="#b8a688" />
      {/* Front door with the smart lock (hotspot khoa-cua 192,450) */}
      <g {...O}>
        <rect x="90" y="180" width="230" height="540" fill={C.woodDark} />
        <rect x="170" y="380" width="50" height="140" rx="10" fill="#1f2328" />
        <rect x="180" y="396" width="30" height="40" rx="4" fill="#33393f" strokeWidth={1.5} />
        <circle cx="195" cy="470" r="10" fill={C.screen} opacity="0.7" strokeWidth={1.5} />
        <rect x="140" y="540" width="110" height="24" fill="#f3e4c4" strokeWidth={1.5} />
      </g>
      <text x="195" y="557" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
        BẢO TRÌ 06/12
      </text>

      {/* Shelf with the face-down frame (hotspot khung-anh 544,360) */}
      <g {...O}>
        <rect x="420" y="380" width="260" height="16" fill={C.wood} />
        <rect x="500" y="368" width="90" height="12" fill={C.woodDark} />
        <rect x="610" y="320" width="40" height="60" fill="#3f8a7e" />
      </g>

      {/* Glass wall over the river and the balcony door (hotspot ban-cong 1280,432) */}
      <g>
        <rect x="760" y="140" width="800" height="580" fill={C.sky} {...O} />
        <rect x="760" y="520" width="800" height="200" fill={C.river} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={770 + i * 66} y={380 + (i % 4) * 28} width="56" height={140 - (i % 4) * 28} fill={C.city} />
        ))}
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} x={784 + (i * 53) % 780} y={400 + ((i * 37) % 100)} width="6" height="8" fill={accent.amber} opacity="0.7" />
        ))}
        <path d="M760,560 Q1160,500 1560,560" stroke="#e8e0c8" strokeWidth="6" fill="none" opacity="0.6" />
        {[1040, 1300].map((x) => (
          <rect key={x} x={x} y="140" width="10" height="580" fill={LINE} />
        ))}
        <rect x="1130" y="430" width="60" height="18" rx="4" fill={C.silver} {...O} strokeWidth={2} />
        {/* Balcony rail with its film of dust */}
        <rect x="760" y="600" width="800" height="12" fill={C.silver} {...O} strokeWidth={2} />
        <rect x="760" y="596" width="800" height="5" fill="#e6e1d6" opacity="0.7" />
      </g>
      <Glow x={700} y={300} r={520} o={0.2} />

      {/* Sofa and coffee table (hotspot ban-tra 800,684) */}
      <g {...O}>
        <rect x="380" y="560" width="380" height="140" rx="30" fill="#6f8f9a" />
        <rect x="620" y="660" width="360" height="40" fill={C.woodDark} />
        <rect x="660" y="620" width="90" height="40" fill="#c49a62" strokeWidth={2} />
        <rect x="770" y="640" width="80" height="20" fill="#fbf4e4" strokeWidth={1.5} transform="rotate(5 810 650)" />
        <rect x="870" y="636" width="70" height="24" fill="#2f4258" strokeWidth={1.5} />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. Corridor on floor 27

function Corridor() {
  return (
    <Frame label="Hành lang tầng 27 trải thảm xanh, cuối hành lang là thang máy">
      <rect width="1600" height="900" fill={C.wallDark} />
      {/* Perspective corridor */}
      <path d="M0,0 L1600,0 L1080,320 L520,320 Z" fill="#e6dcc8" />
      <path d="M0,0 L520,320 L520,600 L0,900 Z" fill={C.wall} />
      <path d="M1600,0 L1080,320 L1080,600 L1600,900 Z" fill={C.wall} />
      <path d="M0,900 L520,600 L1080,600 L1600,900 Z" fill={C.carpet} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${200 + i * 40},${900 - i * 50} L${1400 - i * 40},${900 - i * 50}`} stroke={C.carpetDark} strokeWidth="3" opacity="0.6" />
      ))}
      <rect x="520" y="320" width="560" height="280" fill="#d4c6ae" {...O} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={800} cy={60 + i * 100} r={14 - i * 3} fill="#fff6dc" />
      ))}
      <Glow x={800} y={300} r={560} o={0.3} />

      {/* Doors along the walls */}
      {[[60, 260, 140], [300, 360, 80]].map(([x, y, w], i) => (
        <g key={i} {...O}>
          <path d={`M${x},${y} L${x + w},${y + w * 0.6} L${x + w},${y + w * 3.1} L${x},${y + w * 3.6} Z`} fill={C.woodDark} />
        </g>
      ))}
      <text x="250" y="380" textAnchor="middle" fontSize="20" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">27.08</text>

      {/* Far wall: service lift (hotspot thang-hang 640,486) and guest lift (hotspot thang-khach 960,486) */}
      <g {...O}>
        <rect x="560" y="380" width="160" height="220" fill={C.steel} />
        <line x1="640" y1="380" x2="640" y2="600" />
        <rect x="880" y="380" width="160" height="220" fill={C.silver} />
        <line x1="960" y1="380" x2="960" y2="600" />
        <path d="M520,600 L540,420 L556,600" fill={C.silver} strokeWidth={2} />
      </g>
      <text x="640" y="370" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">THANG HÀNG · NHÂN VIÊN</text>
      <text x="960" y="370" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">THANG KHÁCH</text>

      {/* Camera tilted up at the ceiling (hotspot camera 1120,126) */}
      <g {...O} transform="rotate(-38 1120 120)">
        <rect x="1100" y="100" width="20" height="30" fill={C.silver} />
        <rect x="1110" y="104" width="70" height="30" rx="8" fill="#f2f2ee" />
        <circle cx="1182" cy="119" r="8" fill={ink.night} />
      </g>

      {/* Shoe prints on the carpet (hotspot tham 800,756) */}
      {Array.from({ length: 8 }, (_, i) => {
        const t = i / 7
        const x = 640 + t * 120 - (i % 2) * 24
        const y = 620 + t * 200
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${-20 + t * 30}) scale(${0.6 + t * 0.6})`}>
            <rect x="-10" y="-22" width="20" height="44" rx="9" fill={C.carpetDark} />
            {[-14, -6, 2, 10].map((yy) => (
              <path key={yy} d={`M-8,${yy} l4,4 4,-4 4,4 4,-4`} stroke="#1a3a32" strokeWidth="2" fill="none" />
            ))}
          </g>
        )
      })}
      {/* Cleaning schedule sign */}
      <rect x="1150" y="420" width="110" height="64" fill="#f6f4ee" {...O} strokeWidth={2} />
      <text x="1205" y="446" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily="IBM Plex Mono, monospace">HÚT BỤI</text>
      <text x="1205" y="472" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent.red} fontFamily="IBM Plex Mono, monospace">22:00</text>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Technical room on basement B2

/** A safety boot with a saw-tooth sole, side view. */
export function Boot({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} {...O}>
      <path d="M0,0 L0,-90 L50,-90 L56,-36 L120,-24 Q140,-16 136,0 Z" fill={C.boot} />
      <path d="M0,0 L136,0 L136,12 L0,12 Z" fill="#1c1612" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${i * 15},12 l7,8 l8,-8`} fill="#1c1612" strokeWidth={1.5} />
      ))}
      <path d="M10,-60 L44,-60 M10,-44 L48,-44" stroke="#c4a27a" strokeWidth="3" />
    </g>
  )
}

function TechRoom() {
  return (
    <Frame label="Phòng kỹ thuật hầm B2, ống nước và tủ điều khiển bơm">
      <rect width="1600" height="900" fill={C.concrete} />
      <rect y="740" width="1600" height="160" fill="#6f6d67" />
      {/* Pipes along the ceiling */}
      {[60, 110].map((y, i) => (
        <rect key={y} x="0" y={y} width="1600" height={30 - i * 8} fill={C.pipe} {...O} strokeWidth={2} />
      ))}
      <Bulb x={700} y={150} />
      <Glow x={700} y={340} r={560} o={0.3} />
      <Beam x={700} y={160} w={800} h={600} o={0.15} />

      {/* Desk with the card writer and box of blank cards (hotspot may-ghi-the 480,504) */}
      <g {...O}>
        <rect x="260" y="540" width="520" height="26" fill={C.woodDark} />
        <rect x="280" y="566" width="22" height="174" fill={shade(C.woodDark, -0.2)} />
        <rect x="740" y="566" width="22" height="174" fill={shade(C.woodDark, -0.2)} />
        <rect x="400" y="480" width="150" height="60" rx="8" fill="#2a2f35" />
        <rect x="420" y="470" width="80" height="14" fill="#f2f2ee" strokeWidth={1.5} />
        <rect x="580" y="490" width="100" height="50" fill="#f2f2ee" />
        <rect x="300" y="500" width="70" height="40" fill={C.screen} opacity="0.4" />
      </g>
      <text x="630" y="520" textAnchor="middle" fontSize="12" fill={ink.night} fontFamily="IBM Plex Mono, monospace">20 THẺ</text>

      {/* Shift log on the pump control cabinet (hotspot so-ca 800,324) */}
      <g {...O}>
        <rect x="700" y="200" width="220" height="300" fill="#c9ccd0" />
        <rect x="730" y="230" width="100" height="50" fill="#10241f" strokeWidth={2} />
        <circle cx="880" cy="260" r="16" fill="#e8e8e8" strokeWidth={2} />
        <path d="M880,260 L890,250" stroke={accent.red} strokeWidth="3" />
        <rect x="740" y="340" width="140" height="100" fill="#e7d2a8" strokeWidth={2} />
      </g>
      <text x="780" y="262" textAnchor="middle" fontSize="13" fill={C.screen} fontFamily="IBM Plex Mono, monospace">17:05</text>
      <text x="810" y="380" textAnchor="middle" fontSize="11" fill={ink.night} fontFamily="IBM Plex Mono, monospace">SỔ CA ĐÊM</text>

      {/* Lockers with the boots below (hotspot giay 1152,738) */}
      <g {...O}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={1020 + i * 120} y="280" width="116" height="440" fill="#5f7d86" />
            <rect x={1040 + i * 120} y="320" width="70" height="10" fill={shade('#5f7d86', -0.3)} />
          </g>
        ))}
      </g>
      <text x="1198" y="270" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">VŨ</text>
      <Boot x={1080} y={790} s={0.9} />
      <Boot x={1200} y={796} s={0.9} />

      {/* Key-card hooks (hotspot bang-the 1376,270) */}
      <g {...O}>
        <rect x="1380" y="200" width="180" height="140" fill={C.woodDark} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={1415 + i * 55} cy="250" r="5" fill={C.gold} strokeWidth={1.5} />
            {i < 2 && <rect x={1400 + i * 55} y="262" width="30" height="44" rx="4" fill="#f2f2ee" strokeWidth={1.5} />}
          </g>
        ))}
      </g>
      <text x="1470" y="230" textAnchor="middle" fontSize="12" fill="#f3e4c4" fontFamily="IBM Plex Mono, monospace">KT-01 · 02 · 03</text>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  'phong-ngu': Bedroom,
  'phong-khach': LivingRoom,
  'hanh-lang': Corridor,
  'phong-ky-thuat': TechRoom,
}

export { LINE }
