import { accent, ink, shade } from '@/art/palette'
import { Beam, Bulb, Frame, Glow, LINE, O } from '@/art/soft'

// Backdrops for the four zones of Chapter 8, in the soft flat style.
// Objects sit near their hotspot positions in case.json (percent of 1600 x 900).

export const C = {
  steel: '#9aa3a6',
  steelDark: '#6b7579',
  steelLight: '#c9d0d0',
  tile: '#d9d4c4',
  tileDark: '#b8b2a0',
  floor: '#7d8a84',
  milk: '#f4ecd6',
  milkSour: '#d9cfa8',
  glass: '#dfe9e4',
  cap: '#3f8a6a',
  capDark: '#2c654c',
  crate: '#2f6aa8',
  crateDark: '#234f7e',
  pallet: '#a8804f',
  sharps: '#e2b72f',
  raincoat: '#8d9294',
  wood: '#7a4f32',
  woodDark: '#573721',
  shelf: '#e9e3d4',
  mart: '#c4552d',
  night: '#1f2730',
}

/** A glass soy milk bottle with a green cap. (x, y) is the base centre; `sour` swells the cap and splits the milk. */
export function Bottle({ x, y, s = 1, sour = false, hole = false }: { x: number; y: number; s?: number; sour?: boolean; hole?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16,0 L-16,-56 Q-16,-70 -8,-76 L-8,-88 L8,-88 L8,-76 Q16,-70 16,-56 L16,0 Z" fill={C.glass} {...O} strokeWidth={2} />
      <path d="M-14,-2 L-14,-54 Q-14,-66 -6,-72 L6,-72 Q14,-66 14,-54 L14,-2 Z" fill={sour ? C.milkSour : C.milk} />
      {sour && <rect x="-14" y="-30" width="28" height="28" fill="#c9bd8e" />}
      <rect x="-14" y="-46" width="28" height="18" fill={C.cap} opacity="0.85" />
      <text y="-34" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">
        MỘC AN
      </text>
      {sour ? (
        <path d="M-11,-88 Q0,-104 11,-88 L11,-84 L-11,-84 Z" fill={C.cap} {...O} strokeWidth={2} />
      ) : (
        <rect x="-11" y="-96" width="22" height="10" rx="2" fill={C.cap} {...O} strokeWidth={2} />
      )}
      {hole && <circle cx="0" cy={sour ? -94 : -92} r="1.6" fill={ink.night} />}
    </g>
  )
}

/** A blue plastic crate of 12 bottles, seen from the front. */
export function Crate({ x, y, sour = false, w = 150 }: { x: number; y: number; sour?: boolean; w?: number }) {
  const h = w * 0.42
  return (
    <g>
      {Array.from({ length: 4 }, (_, i) => (
        <Bottle key={i} x={x + w * (0.16 + i * 0.23)} y={y + h * 0.5} s={w / 260} sour={sour} />
      ))}
      <rect x={x} y={y} width={w} height={h} fill={C.crate} {...O} strokeWidth={2} />
      {[0.25, 0.5, 0.75].map((t) => (
        <rect key={t} x={x + w * t - 8} y={y + h * 0.3} width="16" height={h * 0.4} rx="4" fill={C.crateDark} />
      ))}
    </g>
  )
}

/** A wooden pallet stacked with crates, with a lot tag. */
export function Pallet({ x, y, lot, sour = false }: { x: number; y: number; lot: string; sour?: boolean }) {
  return (
    <g>
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => <Crate key={`${r}-${c}`} x={x + 10 + c * 160} y={y - 70 - r * 66} sour={sour && r === 2} />),
      )}
      <rect x={x} y={y - 10} width="340" height="22" fill={C.pallet} {...O} strokeWidth={2} />
      {[0, 150, 300].map((dx) => (
        <rect key={dx} x={x + dx} y={y + 12} width="40" height="16" fill={shade(C.pallet, -0.2)} {...O} strokeWidth={2} />
      ))}
      <rect x={x + 110} y={y - 160} width="120" height="60" fill="#fbf4e4" {...O} strokeWidth={2} />
      <text x={x + 170} y={y - 136} textAnchor="middle" fontSize="18" fontWeight="700" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
        {lot}
      </text>
      {sour && (
        <text x={x + 170} y={y - 112} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily="IBM Plex Mono, monospace">
          NIÊM PHONG
        </text>
      )}
    </g>
  )
}

/** Dial thermometer with a black needle and a red low-water needle. */
export function Dial({ x, y, r = 70, now = 121, low = 97 }: { x: number; y: number; r?: number; now?: number; low?: number }) {
  // 60°C at -220°, 140°C at 40°.
  const ang = (t: number) => ((-220 + ((t - 60) / 80) * 260) * Math.PI) / 180
  const tip = (t: number, k: number) => [x + Math.cos(ang(t)) * r * k, y + Math.sin(ang(t)) * r * k]
  const [nx, ny] = tip(now, 0.8)
  const [lx, ly] = tip(low, 0.86)
  const [sx, sy] = tip(121, 0.98)
  const [sx2, sy2] = tip(121, 0.78)
  return (
    <g>
      <circle cx={x} cy={y} r={r + 10} fill={C.steelDark} {...O} />
      <circle cx={x} cy={y} r={r} fill="#fbf4e4" {...O} strokeWidth={2} />
      {[60, 80, 100, 120, 140].map((t) => {
        const [a, b] = tip(t, 0.92)
        const [c, d] = tip(t, 0.72)
        return (
          <g key={t}>
            <line x1={a} y1={b} x2={tip(t, 0.82)[0]} y2={tip(t, 0.82)[1]} stroke={ink.night} strokeWidth="2" />
            <text x={c} y={d + 4} textAnchor="middle" fontSize={r * 0.16} fill={ink.night} fontFamily="IBM Plex Mono, monospace">
              {t}
            </text>
          </g>
        )
      })}
      <line x1={sx} y1={sy} x2={sx2} y2={sy2} stroke={accent.teal} strokeWidth="5" />
      <line x1={x} y1={y} x2={lx} y2={ly} stroke={accent.red} strokeWidth="3" />
      <line x1={x} y1={y} x2={nx} y2={ny} stroke={ink.night} strokeWidth="4" />
      <circle cx={x} cy={y} r="6" fill={ink.night} />
      <text x={x} y={y + r * 0.5} textAnchor="middle" fontSize={r * 0.15} fill={ink.night} fontFamily="IBM Plex Mono, monospace">
        °C
      </text>
    </g>
  )
}

// --------------------------------------------------------------------------
// 1. Sterilising line 2

function Line2() {
  return (
    <Frame label="Xưởng tiệt trùng line 2: bồn inox, ống hơi, băng chuyền chai">
      <rect width="1600" height="900" fill={C.tile} />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={i * 120} y1="0" x2={i * 120} y2="700" stroke={C.tileDark} strokeWidth="3" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1="0" y1={i * 100} x2="1600" y2={i * 100} stroke={C.tileDark} strokeWidth="3" />
      ))}
      <rect y="700" width="1600" height="200" fill={C.floor} />
      <path d="M0,700 H1600" stroke={ink.night} strokeWidth="4" />
      <Bulb x={420} y={150} />
      <Bulb x={1180} y={150} />
      <Glow x={800} y={420} r={720} o={0.24} />
      <Beam x={420} y={160} w={600} h={540} o={0.15} />

      {/* Steam pipe across the top with the new valve (hotspot van-hoi 832,216) */}
      <rect x="0" y="200" width="1600" height="34" fill={C.steel} {...O} />
      <g {...O}>
        <rect x="800" y="186" width="64" height="62" rx="8" fill={C.steelLight} />
        <rect x="826" y="150" width="12" height="40" fill={C.steelDark} />
        <ellipse cx="832" cy="146" rx="44" ry="10" fill={accent.red} />
      </g>
      <rect x="850" y="236" width="60" height="28" fill="#fbf4e4" {...O} strokeWidth={2} transform="rotate(8 880 250)" />

      {/* Holding tube and the dial (hotspot nhiet-ke 448,360) */}
      <rect x="140" y="320" width="560" height="80" rx="40" fill={C.steel} {...O} />
      {[220, 340, 580].map((x) => (
        <rect key={x} x={x} y="314" width="16" height="92" fill={C.steelDark} />
      ))}
      <rect x="180" y="400" width="30" height="300" fill={C.steelDark} {...O} />
      <rect x="630" y="400" width="30" height="300" fill={C.steelDark} {...O} />
      <Dial x={448} y={290} r={64} now={121} low={97} />

      {/* Sterilising tank */}
      <g {...O}>
        <rect x="700" y="290" width="300" height="380" rx="40" fill={C.steelLight} />
        <ellipse cx="850" cy="290" rx="150" ry="30" fill={C.steel} />
        <rect x="760" y="400" width="180" height="120" rx="10" fill={C.night} />
      </g>
      <text x="850" y="450" textAnchor="middle" fontSize="38" fontWeight="700" fill="#7fe0c4" fontFamily="IBM Plex Mono, monospace">
        121°C
      </text>
      <text x="850" y="490" textAnchor="middle" fontSize="18" fill="#7fe0c4" fontFamily="IBM Plex Mono, monospace">
        LINE 2 · OK
      </text>
      <text x="850" y="610" textAnchor="middle" fontSize="26" fontWeight="700" fill={C.steelDark} fontFamily="Barlow Condensed, sans-serif">
        TIỆT TRÙNG UHT · L2
      </text>

      {/* Operator desk with the log book (hotspot so-van-hanh 1184,558) */}
      <g {...O}>
        <rect x="1060" y="560" width="300" height="24" fill={C.woodDark} />
        <rect x="1080" y="584" width="20" height="116" fill={shade(C.woodDark, -0.2)} />
        <rect x="1320" y="584" width="20" height="116" fill={shade(C.woodDark, -0.2)} />
        <path d="M1110,560 L1126,524 L1260,524 L1276,560 Z" fill="#f6efe2" />
        <line x1="1193" y1="524" x2="1193" y2="560" stroke={LINE} strokeWidth="2" />
      </g>
      <rect x="1220" y="538" width="30" height="8" fill="#fff" opacity="0.9" />
      <rect x="1060" y="380" width="200" height="140" fill="#fbf4e4" {...O} strokeWidth={2} />
      <text x="1160" y="412" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif">
        NỘI QUY CA ĐÊM
      </text>
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x="1080" y={430 + i * 20} width={150 - (i % 2) * 40} height="6" fill="#2f4258" opacity="0.5" />
      ))}

      {/* Conveyor of bottles (hotspot bang-chuyen 1408,720) */}
      <rect x="1180" y="680" width="420" height="30" fill={C.steelDark} {...O} />
      {Array.from({ length: 7 }, (_, i) => (
        <Bottle key={i} x={1220 + i * 58} y={680} s={0.7} />
      ))}
      <rect x="1180" y="710" width="420" height="16" fill={ink.night} opacity="0.4" />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 2. Finished goods store

function Store() {
  return (
    <Frame label="Kho thành phẩm: pallet két sữa xếp chồng, bảng giao hàng">
      <rect width="1600" height="900" fill="#c9cfc8" />
      <rect width="1600" height="110" fill={C.steelDark} />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={i * 110} y1="0" x2={i * 110} y2="110" stroke={shade(C.steelDark, -0.25)} strokeWidth="5" />
      ))}
      <rect y="740" width="1600" height="160" fill={C.floor} />
      <path d="M0,740 H1600" stroke={ink.night} strokeWidth="4" />
      <path d="M0,800 H1600" stroke={accent.amber} strokeWidth="10" strokeDasharray="60 40" opacity="0.7" />
      <Glow x={700} y={400} r={700} o={0.22} color="#cfe7ff" />
      <Bulb x={480} y={220} />
      <Bulb x={1060} y={220} />

      {/* Sealed lot 0601-L2 (hotspot pallet-0601 480,522) */}
      <Pallet x={310} y={730} lot="0601-L2" sour />
      <path d="M300,520 L660,520" stroke={accent.red} strokeWidth="6" strokeDasharray="20 14" />

      {/* Lot 0701-L1, fine (hotspot pallet-0701 1056,522) */}
      <Pallet x={890} y={730} lot="0701-L1" />

      {/* Delivery board (hotspot bang-giao 1360,234) */}
      <g {...O}>
        <rect x="1250" y="150" width="300" height="190" fill="#f6f4ee" />
      </g>
      <text x="1400" y="184" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2f4258" fontFamily="Barlow Condensed, sans-serif">
        LỊCH GIAO HÀNG
      </text>
      <text x="1270" y="220" fontSize="14" fill="#2f4258" fontFamily="IBM Plex Mono, monospace">8/1 · 0601-L2 · 14 điểm</text>
      <text x="1270" y="246" fontSize="14" fill="#2f4258" fontFamily="IBM Plex Mono, monospace">9/1 · 0701-L1 · 12 điểm</text>
      <text x="1400" y="304" textAnchor="middle" fontSize="28" fontWeight="700" fill={accent.red} fontFamily="Barlow Condensed, sans-serif" transform="rotate(-6 1400 300)">
        THU HỒI 11/1
      </text>

      {/* Hand pallet truck (hotspot xe-nang 192,738) */}
      <g {...O}>
        <rect x="90" y="760" width="220" height="20" fill={accent.red} />
        <path d="M110,760 L130,640 L150,640 L130,760 Z" fill={accent.red} />
        <circle cx="120" cy="794" r="14" fill={ink.night} />
        <circle cx="290" cy="794" r="14" fill={ink.night} />
      </g>
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 3. QC room

/** The yellow sharps box under Thuận's desk. */
export function SharpsBox({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-50" y="-90" width="100" height="90" rx="6" fill={C.sharps} {...O} />
      <rect x="-50" y="-100" width="100" height="18" rx="4" fill={accent.red} {...O} strokeWidth={2} />
      <rect x="-14" y="-98" width="28" height="8" fill={ink.night} />
      <path d="M-20,-50 l12,-20 l12,20 Z" fill="none" stroke={ink.night} strokeWidth="3" />
      <text y="-20" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink.night} fontFamily="Barlow Condensed, sans-serif">
        KIM Y TẾ
      </text>
    </g>
  )
}

/** A small office laser printer with a tray of half sheets. */
export function Printer({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="220" height="110" rx="10" fill="#e8e6e0" {...O} />
      <rect x={x + 20} y={y + 20} width="180" height="14" fill={ink.night} />
      <rect x={x + 160} y={y + 60} width="30" height="10" fill="#7fe0c4" />
      <path d={`M${x + 30},${y + 110} L${x + 20},${y + 150} L${x + 200},${y + 150} L${x + 190},${y + 110} Z`} fill="#fbf4e4" {...O} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={x + 34} y1={y + 122 + i * 8} x2={x + 186} y2={y + 122 + i * 8} stroke="#8fa7c0" strokeWidth="1.5" />
      ))}
    </g>
  )
}

function QcRoom() {
  return (
    <Frame label="Phòng QC: bàn làm việc, máy in, bảng ghim phiếu, tủ mẫu lưu">
      <rect width="1600" height="900" fill="#d6d9cf" />
      <rect y="720" width="1600" height="180" fill="#9aa39c" />
      <path d="M0,720 H1600" stroke={ink.night} strokeWidth="4" />
      {/* Glass wall onto the factory floor */}
      <rect x="40" y="60" width="520" height="300" fill="#a9c2c4" {...O} />
      <line x1="300" y1="60" x2="300" y2="360" stroke={LINE} strokeWidth="3" />
      <rect x="80" y="200" width="160" height="160" rx="20" fill={C.steel} opacity="0.6" />
      <Bulb x={800} y={130} />
      <Glow x={800} y={360} r={620} o={0.3} />

      {/* Cork board with the release form (hotspot phieu-xuat 736,270) */}
      <g {...O}>
        <rect x="610" y="140" width="300" height="230" fill="#b98a5a" />
        <rect x="640" y="170" width="140" height="180" fill="#fbf4e4" strokeWidth={2} transform="rotate(-3 710 260)" />
        <rect x="800" y="180" width="90" height="110" fill="#f2e3a0" strokeWidth={2} transform="rotate(4 845 235)" />
      </g>
      <text x="710" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.night} fontFamily="IBM Plex Mono, monospace" transform="rotate(-3 710 260)">
        XUẤT XƯỞNG
      </text>
      <text x="710" y="250" textAnchor="middle" fontSize="22" fontWeight="700" fill={accent.teal} fontFamily="Barlow Condensed, sans-serif" transform="rotate(-3 710 260)">
        ĐẠT
      </text>
      <circle cx="710" cy="168" r="7" fill={accent.red} />

      {/* Thuận's desk with the sharps box under it (hotspot hop-kim 320,594) */}
      <g {...O}>
        <rect x="140" y="560" width="460" height="26" fill={C.woodDark} />
        <rect x="160" y="586" width="22" height="134" fill={shade(C.woodDark, -0.2)} />
        <rect x="560" y="586" width="22" height="134" fill={shade(C.woodDark, -0.2)} />
        <rect x="380" y="460" width="150" height="100" rx="6" fill={ink.night} />
        <rect x="392" y="472" width="126" height="76" fill="#3f6f86" />
      </g>
      <rect x="220" y="540" width="40" height="8" rx="4" fill="#3f7aa0" {...O} strokeWidth={2} />
      <SharpsBox x={320} y={712} s={0.9} />

      {/* Printer and paper tray (hotspot khay-giay 1120,486) */}
      <rect x="980" y="560" width="300" height="24" fill={C.woodDark} {...O} />
      <rect x="1000" y="584" width="20" height="136" fill={shade(C.woodDark, -0.2)} {...O} />
      <rect x="1240" y="584" width="20" height="136" fill={shade(C.woodDark, -0.2)} {...O} />
      <Printer x={1010} y={410} />
      <text x="1120" y="400" textAnchor="middle" fontSize="13" fill={ink.night} fontFamily="IBM Plex Mono, monospace">
        GIẤY TÁI SỬ DỤNG
      </text>

      {/* Retained sample fridge (hotspot tu-mau 1408,450) */}
      <g {...O}>
        <rect x="1330" y="220" width="200" height="500" rx="10" fill="#eceee8" />
        <rect x="1346" y="240" width="168" height="300" fill="#bcd6d6" />
        {[300, 380, 460].map((yy) => (
          <line key={yy} x1="1346" y1={yy} x2="1514" y2={yy} stroke={LINE} strokeWidth="2" />
        ))}
        <rect x="1500" y="560" width="10" height="80" rx="4" fill={C.steelDark} />
      </g>
      {[1370, 1410, 1450].map((bx) => (
        <Bottle key={bx} x={bx} y={378} s={0.6} />
      ))}
      <rect x="1360" y="446" width="90" height="24" fill="#fbf4e4" {...O} strokeWidth={1.5} />
    </Frame>
  )
}

// --------------------------------------------------------------------------
// 4. Hiệp Thành Mart

/** Supermarket shelf of soy milk, `cols` bottles across each of three tiers. */
export function MilkShelf({ x, y, w, holes = [] }: { x: number; y: number; w: number; holes?: number[] }) {
  const cols = Math.floor(w / 42)
  return (
    <g>
      <rect x={x} y={y} width={w} height="400" fill={C.shelf} {...O} />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {Array.from({ length: cols }, (_, c) => (
            <Bottle key={c} x={x + 24 + c * 42} y={y + 120 + r * 130} s={0.95} hole={r === 1 && holes.includes(c)} />
          ))}
          <rect x={x} y={y + 120 + r * 130} width={w} height="14" fill={C.steelDark} {...O} strokeWidth={2} />
        </g>
      ))}
      <rect x={x} y={y - 50} width={w} height="50" fill={C.cap} {...O} />
      <text x={x + w / 2} y={y - 16} textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">
        SỮA ĐẬU NÀNH
      </text>
    </g>
  )
}

function Mart() {
  return (
    <Frame label="Hiệp Thành Mart: kệ sữa ở lối vào, bãi xe máy trước cửa">
      <rect width="1600" height="900" fill="#efe7d6" />
      <rect width="1600" height="90" fill={C.mart} />
      <text x="560" y="62" textAnchor="middle" fontSize="44" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">
        HIỆP THÀNH MART
      </text>
      <rect y="760" width="1600" height="140" fill="#c9bfa8" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={i * 140} y1="760" x2={i * 140 - 40} y2="900" stroke="#b3a88e" strokeWidth="3" />
      ))}
      <Glow x={640} y={360} r={620} o={0.25} />

      {/* Ceiling camera (hotspot camera 224,144) */}
      <g {...O}>
        <rect x="216" y="90" width="16" height="40" fill={C.steelDark} />
        <rect x="190" y="126" width="80" height="40" rx="8" fill="#e8e6e0" transform="rotate(18 230 146)" />
        <circle cx="258" cy="160" r="9" fill={ink.night} />
      </g>

      {/* Milk shelf (hotspot ke-sua 640,414) */}
      <MilkShelf x={380} y={260} w={540} holes={[1, 4, 6, 9]} />

      {/* Returned crates (hotspot thung-tra 992,738) */}
      <Crate x={940} y={700} sour w={170} />
      <rect x="950" y="680" width="150" height="26" fill="#fbf4e4" {...O} strokeWidth={2} />
      <text x="1025" y="699" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent.red} fontFamily="IBM Plex Mono, monospace">
        KHÁCH TRẢ
      </text>

      {/* Glass door onto the parking, with the guard's book (hotspot so-giu-xe 1344,630) */}
      <rect x="1160" y="140" width="420" height="620" fill="#6f8c96" {...O} />
      <line x1="1370" y1="140" x2="1370" y2="760" stroke={LINE} strokeWidth="3" />
      <rect x="1160" y="560" width="420" height="200" fill="#4f5b5e" opacity="0.6" />
      {[1220, 1320, 1460].map((mx, i) => (
        <g key={mx}>
          <ellipse cx={mx} cy="700" rx="40" ry="10" fill={ink.night} opacity="0.4" />
          <path d={`M${mx - 40},690 q40,-50 80,0`} fill={['#cfd4d6', '#b23a2e', '#2f4258'][i]} {...O} strokeWidth={2} />
        </g>
      ))}
      <g {...O}>
        <rect x="1240" y="600" width="200" height="20" fill={C.woodDark} />
        <rect x="1260" y="620" width="16" height="140" fill={shade(C.woodDark, -0.2)} />
        <rect x="1404" y="620" width="16" height="140" fill={shade(C.woodDark, -0.2)} />
        <path d="M1270,600 L1284,572 L1400,572 L1414,600 Z" fill="#f6efe2" />
      </g>
      <text x="1340" y="550" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Barlow Condensed, sans-serif">
        GIỮ XE · 3.000Đ
      </text>
    </Frame>
  )
}

export const sceneArt: Record<string, () => JSX.Element> = {
  xuong: Line2,
  kho: Store,
  'phong-qc': QcRoom,
  'sieu-thi': Mart,
}

export { LINE }
