// Illustrated epilogue shown on the ending card: one picture per person's fate.
import { Portrait, type Mood, type PortraitSpec } from '@/art/Portrait'
import { accent, ink } from '@/art/palette'
import { useGame } from '@/game/store'

export interface EpiloguePanel {
  id: string
  caption: string
  Art: () => JSX.Element
}

const LINE = ink.night

/** A scene drawn in SVG with people standing in it, cut off at the bottom like a photo. */
function Panel({ children, people = [] }: { children: React.ReactNode; people?: { id: string; x: number; mood?: Mood; size?: number }[] }) {
  const data = useGame((s) => s.data)
  const specOf = (id: string): PortraitSpec | undefined =>
    id === 'player' ? data.player.portrait : data.suspects.find((s) => s.id === id)?.portrait
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-[#2d1f18]">
      <svg viewBox="0 0 360 240" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        {children}
      </svg>
      {people.map((p) => {
        const spec = specOf(p.id)
        if (!spec) return null
        const w = p.size ?? 38
        return (
          <div key={p.id} className="absolute bottom-0" style={{ left: `${p.x}%`, width: `${w}%`, transform: 'translateX(-50%) translateY(18%)' }}>
            <Portrait spec={{ ...spec, mood: p.mood ?? spec.mood }} size={240} bare className="h-auto w-full" />
          </div>
        )
      })}
    </div>
  )
}

/** Foreground layer drawn over the people (a rail, a table edge). */
function Front({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 360 240" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  )
}

// --- Scenes ---------------------------------------------------------------

const Courtroom = () => (
  <>
    <rect width="360" height="240" fill="#5a3a26" />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={i * 36} y="0" width="34" height="240" fill="#61402a" />
    ))}
    {/* Red backdrop behind the bench, a plain gold seal and the court's name */}
    <rect x="100" y="14" width="160" height="96" fill="#9e2b22" stroke={LINE} strokeWidth="2" />
    <text x="180" y="31" textAnchor="middle" fontSize="11" fill="#ffe7b8" fontFamily="Bitter, serif" letterSpacing="1.5">TÒA ÁN NHÂN DÂN</text>
    <circle cx="180" cy="62" r="20" fill={accent.gold} stroke={LINE} strokeWidth="2" />
    <path d="M180,47 l4.2,9.5 10.3,0.9 -7.8,6.6 2.4,10.2 -9.1,-5.6 -9.1,5.6 2.4,-10.2 -7.8,-6.6 10.3,-0.9 Z" fill="#9e2b22" />
    {/* Judges' bench */}
    <rect x="40" y="110" width="280" height="40" fill="#7b5233" stroke={LINE} strokeWidth="2" />
    {[110, 180, 250].map((x) => (
      <g key={x}>
        <circle cx={x} cy="100" r="9" fill="#d9a47a" stroke={LINE} strokeWidth="1.5" />
        <path d={`M${x - 14},112 Q${x},96 ${x + 14},112 Z`} fill="#20242c" stroke={LINE} strokeWidth="1.5" />
      </g>
    ))}

  </>
)

const DockRail = () => (
  <Front>
    <rect x="96" y="196" width="168" height="10" fill="#8a5c38" stroke={LINE} strokeWidth="2" />
    {[110, 140, 170, 200, 230, 250].map((x) => (
      <rect key={x} x={x} y="206" width="6" height="34" fill="#7b5233" stroke={LINE} strokeWidth="1.2" />
    ))}
    {/* Two officers at the sides of the dock */}
    {[50, 310].map((x) => (
      <g key={x} stroke={LINE} strokeWidth="2">
        <path d={`M${x - 30},240 Q${x - 28},178 ${x},172 Q${x + 28},178 ${x + 30},240 Z`} fill="#4f5e3a" />
        <circle cx={x} cy="152" r="17" fill="#c98f63" />
        <path d={`M${x - 20},146 Q${x},126 ${x + 20},146 L${x + 22},150 L${x - 22},150 Z`} fill="#4f5e3a" />
        <rect x={x - 5} y="134" width="10" height="7" fill={accent.red} strokeWidth="1" />
      </g>
    ))}
  </Front>
)

const InterviewRoom = () => (
  <>
    <rect width="360" height="240" fill="#59606a" />
    <rect x="0" y="0" width="360" height="22" fill="#4a5058" />
    <rect x="236" y="34" width="90" height="56" fill="#2a2f36" stroke={LINE} strokeWidth="2" />
    <text x="281" y="68" textAnchor="middle" fontSize="9" fill="#9aa4ae" fontFamily="IBM Plex Mono, monospace">CÔNG AN Q.BÌNH TÂN</text>
    <circle cx="60" cy="50" r="16" fill="#e8e2d4" stroke={LINE} strokeWidth="2" />
    <path d="M60,50 V40 M60,50 L67,53" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
  </>
)

const InterviewTable = () => (
  <Front>
    <rect x="0" y="198" width="360" height="42" fill="#8a7a66" stroke={LINE} strokeWidth="2" />
    {/* The signed confession, and the gold watch he has taken off */}
    <rect x="40" y="204" width="70" height="30" fill={ink.bone} stroke={LINE} strokeWidth="1.5" transform="rotate(-5 75 219)" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x="48" y={210 + i * 6} width="50" height="2" fill="#9a8a72" transform="rotate(-5 75 219)" />
    ))}
    <path d="M86,228 q8,-6 16,0" fill="none" stroke="#2a3a7a" strokeWidth="1.5" />
    <g transform="translate(270 216)" stroke={LINE} strokeWidth="1.5">
      <rect x="-26" y="-4" width="52" height="8" rx="3" fill={accent.gold} />
      <circle r="11" fill={accent.gold} />
      <circle r="8" fill="#fff6e2" />
      <path d="M0,0 V-5 M0,0 L4,2" strokeWidth="1.2" />
    </g>
  </Front>
)

const Dawn = () => (
  <>
    <defs>
      <linearGradient id="ep-dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f6c27a" />
        <stop offset="0.6" stopColor="#f2a96b" />
        <stop offset="1" stopColor="#d98a5a" />
      </linearGradient>
    </defs>
    <rect width="360" height="240" fill="url(#ep-dawn)" />
    <circle cx="300" cy="96" r="30" fill="#fff1c8" opacity="0.9" />
    {/* The rebuilt warehouse and its gate */}
    <path d="M0,150 L120,112 L240,150 Z" fill="#8a6a54" stroke={LINE} strokeWidth="2" />
    <rect x="10" y="150" width="220" height="90" fill="#a07e62" stroke={LINE} strokeWidth="2" />
    <rect x="40" y="166" width="70" height="74" fill="#7a5a44" stroke={LINE} strokeWidth="1.5" />
    <text x="160" y="176" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily="Bitter, serif">KHO THỊNH PHÁT</text>
    <rect x="128" y="182" width="64" height="10" fill={ink.bone} stroke={LINE} strokeWidth="1" />
    <text x="160" y="190" textAnchor="middle" fontSize="6.5" fill={accent.red} fontFamily="IBM Plex Mono, monospace">ĐANG SỬA CHỮA</text>
    {/* Guard hut with a new logbook */}
    <rect x="252" y="150" width="96" height="90" fill="#d7b07a" stroke={LINE} strokeWidth="2" />
    <path d="M246,150 h108 l-10,-14 h-88 Z" fill="#6b4a36" stroke={LINE} strokeWidth="2" />
  </>
)

const HutTable = () => (
  <Front>
    <rect x="230" y="214" width="130" height="26" fill="#8a6a44" stroke={LINE} strokeWidth="2" />
    <rect x="320" y="186" width="14" height="30" rx="4" fill={accent.teal} stroke={LINE} strokeWidth="1.5" />
    <rect x="248" y="206" width="44" height="12" fill={ink.bone} stroke={LINE} strokeWidth="1.2" />
    <text x="270" y="215" textAnchor="middle" fontSize="6" fill={ink.night} fontFamily="IBM Plex Mono, monospace">SỔ TRỰC CA</text>
  </Front>
)

const LiveRoom = () => (
  <>
    <rect width="360" height="240" fill="#e7d2bf" />
    <rect y="170" width="360" height="70" fill="#c9ab8e" />
    <path d="M20,40 H130" stroke={LINE} strokeWidth="3" />
    {['#cf9a32', '#7a9fb0', '#b23a2e', '#f6efe2', '#f2a7a0'].map((c, i) => (
      <path key={i} d={`M${32 + i * 22},40 l-9,14 v44 h18 v-44 Z`} fill={c} stroke={LINE} strokeWidth="1.4" />
    ))}
    <circle cx="300" cy="80" r="40" fill="none" stroke="#fff8e8" strokeWidth="10" />
    <rect x="12" y="132" width="132" height="44" rx="6" fill="#1c130f" opacity="0.85" />
    <text x="20" y="150" fontSize="8" fill="#fff" fontFamily="IBM Plex Mono, monospace">● LIVE · 1.208 người xem</text>
    <text x="20" y="166" fontSize="8" fill="#ffd2c8" fontFamily="Be Vietnam Pro, sans-serif">❤ chị Ngân bị oan rồi!</text>
  </>
)

const Desk = ({ stamp, sub, color = accent.red }: { stamp: string; sub: string; color?: string }) => (
  <>
    <rect width="360" height="240" fill="#4a3326" />
    {Array.from({ length: 8 }, (_, i) => (
      <path key={i} d={`M0,${20 + i * 30} Q180,${10 + i * 30} 360,${24 + i * 30}`} stroke="#3e2a1f" strokeWidth="3" fill="none" />
    ))}
    <ellipse cx="300" cy="40" rx="120" ry="80" fill={accent.amber} opacity="0.18" />
    <g transform="rotate(-4 180 120)">
      <rect x="70" y="34" width="220" height="170" fill={ink.paper} stroke={LINE} strokeWidth="2" />
      <rect x="70" y="34" width="220" height="24" fill="#d8bf8e" stroke={LINE} strokeWidth="2" />
      <text x="82" y="51" fontSize="11" fill={ink.night} fontFamily="Bitter, serif">HỒ SƠ BỒI THƯỜNG SỐ 0714</text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="86" y={74 + i * 14} width={i % 2 ? 150 : 180} height="3" fill="#b89b6c" />
      ))}
      <g transform="rotate(-10 180 160)">
        <rect x="96" y="132" width="168" height="48" rx="4" fill="none" stroke={color} strokeWidth="3.5" />
        <text x="180" y="156" textAnchor="middle" fontSize="15" fontWeight="700" fill={color} fontFamily="Bitter, serif">{stamp}</text>
        <text x="180" y="172" textAnchor="middle" fontSize="7.5" fill={color} fontFamily="IBM Plex Mono, monospace">{sub}</text>
      </g>
    </g>
    <rect x="300" y="170" width="30" height="50" rx="4" fill="#5b3a2a" stroke={LINE} strokeWidth="2" />
    <rect x="296" y="214" width="38" height="10" rx="2" fill={color} stroke={LINE} strokeWidth="1.5" />
  </>
)

const EmptyFlat = () => (
  <>
    <rect width="360" height="240" fill="#b8a48a" />
    <rect x="130" y="40" width="100" height="200" fill="#6e4c34" stroke={LINE} strokeWidth="2" />
    <rect x="138" y="48" width="84" height="192" fill="#2d1f18" />
    <rect x="236" y="60" width="72" height="42" fill="#fff6e2" stroke={LINE} strokeWidth="1.5" transform="rotate(4 272 81)" />
    <text x="272" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent.red} fontFamily="Bitter, serif" transform="rotate(4 272 81)">CHO THUÊ</text>
    <text x="272" y="94" textAnchor="middle" fontSize="6.5" fill={ink.night} fontFamily="IBM Plex Mono, monospace" transform="rotate(4 272 81)">P.304 · trống</text>
    {[
      [30, 176, 70, 64],
      [60, 140, 56, 40],
      [262, 186, 78, 54],
    ].map(([x, y, w, h], i) => (
      <g key={i} stroke={LINE} strokeWidth="1.8">
        <rect x={x} y={y} width={w} height={h} fill="#c9a26a" />
        <path d={`M${x},${y + 10} H${x + w}`} />
      </g>
    ))}
    <text x="58" y="210" fontSize="7" fill={ink.night} fontFamily="IBM Plex Mono, monospace">ĐỒ BẢO</text>
    <rect x="0" y="232" width="360" height="8" fill="#8a7458" />
  </>
)

const Boxing = () => (
  <>
    <rect width="360" height="240" fill="#3a2a22" />
    <rect x="20" y="20" width="120" height="80" fill="#2d1f18" stroke={LINE} strokeWidth="2" />
    <text x="80" y="64" textAnchor="middle" fontSize="9" fill={ink.fog} fontFamily="IBM Plex Mono, monospace">PHÒNG GIÁM ĐỊNH</text>
    <rect x="236" y="30" width="96" height="56" fill={ink.bone} stroke={LINE} strokeWidth="1.5" transform="rotate(5 284 58)" />
    <text x="284" y="52" textAnchor="middle" fontSize="8" fill={ink.night} fontFamily="Bitter, serif" transform="rotate(5 284 58)">QUYẾT ĐỊNH</text>
    <text x="284" y="66" textAnchor="middle" fontSize="8" fontWeight="700" fill={accent.red} fontFamily="Bitter, serif" transform="rotate(5 284 58)">RÚT KHỎI VỤ VIỆC</text>
  </>
)

const Box = () => (
  <Front>
    <g stroke={LINE} strokeWidth="2">
      <rect x="220" y="176" width="120" height="64" fill="#c9a26a" />
      <path d="M220,176 l-12,-16 h120 l12,16" fill="#b08a54" />
      <rect x="236" y="150" width="40" height="30" fill={ink.paper} transform="rotate(-8 256 165)" />
      <circle cx="306" cy="162" r="12" fill={accent.teal} />
    </g>
  </Front>
)

const Transfer = () => (
  <>
    <rect width="360" height="240" fill="#2d3a44" />
    <rect x="110" y="16" width="140" height="210" rx="16" fill="#1c130f" stroke={LINE} strokeWidth="2" />
    <rect x="118" y="30" width="124" height="184" rx="6" fill="#f3efe6" />
    <circle cx="180" cy="70" r="18" fill="#3f8a7e" />
    <path d="M171,70 l6,6 12,-13" stroke="#fff" strokeWidth="3" fill="none" />
    <text x="180" y="104" textAnchor="middle" fontSize="9" fill={ink.night} fontFamily="Be Vietnam Pro, sans-serif">Chuyển tiền thành công</text>
    <text x="180" y="124" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink.night} fontFamily="IBM Plex Mono, monospace">4.000.000.000 đ</text>
    <text x="180" y="144" textAnchor="middle" fontSize="7" fill="#6b6b6b" fontFamily="IBM Plex Mono, monospace">Bảo hiểm An Tín → Quách Thịnh</text>
    <text x="180" y="158" textAnchor="middle" fontSize="7" fill="#6b6b6b" fontFamily="IBM Plex Mono, monospace">ND: Boi thuong HS 0714</text>
  </>
)

const LongAn = () => (
  <>
    <rect width="360" height="240" fill="#151820" />
    <path d="M60,0 L20,240 H340 L300,0 Z" fill="#f2e2b0" opacity="0.12" />
    {Array.from({ length: 4 }, (_, row) =>
      Array.from({ length: 9 }, (_, i) => (
        <g key={`${row}-${i}`} stroke={LINE} strokeWidth="1.5">
          <rect x={14 + i * 38} y={64 + row * 40} width="34" height="36" rx="4" fill={['#b23a2e', '#3f6b8a', '#cf9a32', '#6a4a7a'][(i + row) % 4]} />
          <circle cx={31 + i * 38} cy={82 + row * 40} r="6" fill="#e7d2a8" />
        </g>
      )),
    )}
    <rect x="96" y="16" width="168" height="26" fill="#f6efe2" stroke={LINE} strokeWidth="1.5" />
    <text x="180" y="33" textAnchor="middle" fontSize="10" fill={ink.night} fontFamily="Bitter, serif">KHO THUÊ · ĐỨC HÒA, LONG AN</text>
  </>
)

// --- Endings ---------------------------------------------------------------

export const epilogue: Record<string, EpiloguePanel[]> = {
  full: [
    {
      id: 'court',
      caption: 'Tòa án nhân dân TP.HCM đưa Phan Quốc Bảo ra xét xử về tội hủy hoại tài sản và tham ô 620 triệu qua Công ty Hưng Long.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'bao', x: 50, mood: 'worried', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'thinh',
      caption: 'Ông Thịnh ký biên bản nhận tội gian lận bảo hiểm. Lần đầu tiên người ta thấy ông tháo chiếc đồng hồ vàng.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'thinh', x: 52, mood: 'worried', size: 52 }]}>
            <InterviewRoom />
          </Panel>
          <InterviewTable />
        </div>
      ),
    },
    {
      id: 'ro',
      caption: 'Ông Tư Rô được giữ lại làm bảo vệ nhờ bạn nói giùm. Bình trà thay cho chai rượu, sổ trực ca ghi đủ từng giờ.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'ro', x: 60, mood: 'smile', size: 48 }]}>
            <Dawn />
          </Panel>
          <HutTable />
        </div>
      ),
    },
    {
      id: 'ngan',
      caption: 'Ngân được minh oan. Buổi livestream tối đó đông gấp năm lần thường lệ.',
      Art: () => (
        <Panel people={[{ id: 'ngan', x: 60, mood: 'smile', size: 54 }]}>
          <LiveRoom />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Hồ sơ 0714 đóng lại. Công ty không phải chi 4 tỷ đồng, và hồ sơ được chuyển sang cơ quan điều tra.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="CHUYỂN CƠ QUAN ĐIỀU TRA" />
        </Panel>
      ),
    },
  ],
  half: [
    {
      id: 'file',
      caption: 'Công ty từ chối chi trả. Sếp hài lòng với kết quả.',
      Art: () => (
        <Panel>
          <Desk stamp="TỪ CHỐI BỒI THƯỜNG" sub="LÝ DO: KHAI KHỐNG HÀNG HÓA" />
        </Panel>
      ),
    },
    {
      id: 'thinh',
      caption: 'Ông Thịnh bị khởi tố cả tội đốt kho. Ông vẫn thề rằng mình đã hủy "vụ 20".',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'thinh', x: 50, mood: 'angry', size: 44 }]}>
            <Courtroom />
          </Panel>
          <DockRail />
        </div>
      ),
    },
    {
      id: 'bao',
      caption: 'Một tuần sau, phòng trọ của Bảo đã trống. Không ai biết anh đi đâu.',
      Art: () => (
        <Panel>
          <EmptyFlat />
        </Panel>
      ),
    },
  ],
  wrong: [
    {
      id: 'file',
      caption: 'Luật sư của ông Thịnh chỉ ra lập luận không có bằng chứng. Hồ sơ bị bác.',
      Art: () => (
        <Panel>
          <Desk stamp="BÁC KẾT LUẬN" sub="KHÔNG ĐỦ CĂN CỨ" />
        </Panel>
      ),
    },
    {
      id: 'player',
      caption: 'Bạn bị rút khỏi vụ việc. Thùng giấy trên bàn đựng hết đồ của bạn.',
      Art: () => (
        <div className="relative">
          <Panel people={[{ id: 'player', x: 36, mood: 'worried', size: 52 }]}>
            <Boxing />
          </Panel>
          <Box />
        </div>
      ),
    },
  ],
  paid: [
    {
      id: 'transfer',
      caption: 'Bảo hiểm An Tín chuyển 4 tỷ đồng cho ông Thịnh.',
      Art: () => (
        <Panel>
          <Transfer />
        </Panel>
      ),
    },
    {
      id: 'longan',
      caption: 'Ba tháng sau, kiểm toán mở cửa kho thuê ở Long An: 412 cuộn vải nằm nguyên, chưa từng cháy.',
      Art: () => (
        <Panel>
          <LongAn />
        </Panel>
      ),
    },
    {
      id: 'file',
      caption: 'Bạn bị kỷ luật vì duyệt chi sai.',
      Art: () => (
        <Panel>
          <Desk stamp="KỶ LUẬT" sub="DUYỆT CHI SAI · HS 0714" />
        </Panel>
      ),
    },
  ],
}
