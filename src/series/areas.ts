// Areas of Saigon on the case map. Each chapter in series.ts names its `area`;
// the map lights up every area that has a case. To place a new chapter, add
// `area: '<id>'` to it in series.ts (add an area here only for a new place).
//
// Shapes are a hand-drawn simplification of the city (north up), in a
// 1000 x 900 drawing. Neighbouring areas share vertices so borders line up.

export interface Area {
  id: string
  name: string
  /** One line of local colour shown when the area is opened. */
  note: string
  /** Outline in map units. */
  shape: [number, number][]
  /** Where the name sits, if not the shape's average point. */
  label?: [number, number]
  /** Shorter name for the map when the area is too narrow for the full one. */
  short?: string
}

/** A place outside the city, reached by a road leaving the map edge. Drawn as a road sign. */
export interface OffMapArea {
  id: string
  name: string
  note: string
  /** Text on the sign under the name, e.g. the distance. */
  sign: string
  /** Where the sign stands on the map. */
  at: [number, number]
}

export const AREAS: Area[] = [
  {
    id: 'cu-chi',
    name: 'Củ Chi',
    note: 'Ruộng, vườn cao su và những con đường đất đỏ ở cửa ngõ tây bắc.',
    shape: [[80, 120], [250, 40], [430, 60], [470, 180], [430, 300], [330, 340], [200, 330], [110, 260]],
    label: [280, 190],
  },
  {
    id: 'hoc-mon',
    name: 'Hóc Môn',
    note: 'Chợ đầu mối, xưởng nhỏ, nhà trọ công nhân san sát.',
    shape: [[200, 330], [330, 340], [430, 300], [450, 430], [380, 440], [270, 450], [210, 400]],
  },
  {
    id: 'quan-12',
    name: 'Quận 12',
    note: 'Khu công nghiệp và Quốc lộ 1A ầm ầm xe tải cả đêm.',
    shape: [[430, 300], [530, 290], [620, 330], [620, 410], [560, 440], [500, 435], [450, 430]],
    label: [530, 335],
  },
  {
    id: 'go-vap',
    name: 'Gò Vấp',
    note: 'Hẻm sâu như mê cung, quán nhậu sáng đèn tới khuya.',
    shape: [[500, 435], [560, 440], [620, 410], [630, 470], [560, 500], [540, 497], [500, 490]],
  },
  {
    id: 'binh-thanh',
    name: 'Bình Thạnh',
    note: 'Kênh Nhiêu Lộc, chung cư cũ và cao ốc mới ven sông.',
    shape: [[620, 410], [645, 425], [652, 500], [628, 558], [585, 548], [560, 500], [630, 470]],
    label: [612, 515],
    short: 'B.Thạnh',
  },
  {
    id: 'tan-binh',
    name: 'Tân Bình',
    note: 'Sân bay Tân Sơn Nhất, chợ vải và những dãy kho hàng.',
    shape: [[380, 440], [450, 430], [500, 435], [500, 490], [510, 540], [440, 560], [390, 530]],
  },
  {
    id: 'quan-3',
    name: 'Quận 3',
    note: 'Biệt thự Pháp cũ, hẻm cà phê và hàng me già trên đường Tú Xương.',
    shape: [[500, 490], [540, 497], [550, 548], [510, 540]],
    label: [536, 502],
    short: 'Q.3',
  },
  {
    id: 'trung-tam',
    name: 'Quận 1',
    note: 'Đồng Khởi, phòng tranh, khách sạn và những người không muốn bị nhìn thấy.',
    shape: [[540, 497], [560, 500], [585, 548], [600, 600], [560, 610], [510, 590], [510, 540], [550, 548]],
    label: [552, 568],
  },
  {
    id: 'binh-tan',
    name: 'Bình Tân',
    note: 'Kho xưởng, khu công nghiệp Tân Tạo, đường Kinh Dương Vương.',
    shape: [[270, 450], [380, 440], [390, 530], [440, 560], [420, 620], [330, 630], [280, 560]],
  },
  {
    id: 'cho-lon',
    name: 'Chợ Lớn',
    note: 'Quận 5, 6, 8: hội quán, chợ sỉ và những tiệm vàng ba đời.',
    shape: [[440, 560], [510, 540], [510, 590], [560, 610], [570, 660], [470, 680], [420, 620]],
  },
  {
    id: 'quan-7',
    name: 'Quận 7',
    note: 'Phú Mỹ Hưng sạch sẽ, cảng Tân Thuận bên kia đường.',
    shape: [[560, 610], [600, 600], [640, 640], [650, 700], [570, 700], [570, 660]],
  },
  {
    id: 'thu-duc',
    name: 'Thủ Đức',
    note: 'Thủ Thiêm, làng đại học và dự án đang xây dở bên kia sông.',
    shape: [[640, 300], [800, 280], [920, 360], [900, 520], [780, 600], [650, 580], [652, 500], [645, 425], [620, 330]],
    label: [770, 440],
  },
  {
    id: 'binh-chanh',
    name: 'Bình Chánh',
    note: 'Kênh rạch, vựa rau và đường về miền Tây.',
    shape: [[130, 350], [200, 330], [210, 400], [270, 450], [280, 560], [330, 630], [420, 620], [470, 680], [440, 760], [300, 800], [160, 700], [100, 540]],
    label: [230, 610],
  },
  {
    id: 'nha-be',
    name: 'Nhà Bè',
    note: 'Nơi sông Nhà Bè và sông Sài Gòn gặp nhau, kho xăng dầu ven bờ.',
    shape: [[470, 680], [570, 660], [570, 700], [650, 700], [680, 760], [600, 800], [500, 790], [440, 760]],
  },
  {
    id: 'can-gio',
    name: 'Cần Giờ',
    note: 'Rừng đước, vựa hải sản, con nước lên xuống mỗi ngày hai lần.',
    shape: [[650, 700], [720, 690], [820, 710], [880, 770], [870, 860], [700, 890], [620, 860], [600, 800], [680, 760]],
    label: [775, 795],
  },
]

export const OFF_MAP: OffMapArea[] = [
  {
    id: 'binh-thuan',
    name: 'Bình Thuận',
    note: 'Theo Quốc lộ 1A ra khỏi thành phố: đèo, trạm cân và những chuyến xe đêm.',
    sign: 'QL1A · 180 km',
    at: [895, 222],
  },
]

/** The road out of town towards the off-map signs: Quốc lộ 1A, west to east. */
export const QL1A: [number, number][] = [
  [90, 640], [200, 590], [300, 520], [390, 440], [470, 395], [560, 380], [660, 360], [780, 320], [880, 270], [1000, 230], [1260, 150],
]

/** Sông Sài Gòn from the north edge down to the sea. */
export const RIVER: [number, number][] = [
  [455, 0], [470, 120], [520, 200], [580, 270], [632, 340], [648, 430], [655, 505], [630, 570], [602, 602], [640, 640], [665, 700], [700, 760], [740, 830], [790, 900],
]

export function areaName(id?: string) {
  return [...AREAS, ...OFF_MAP].find((a) => a.id === id)?.name
}

export function areaLabel(a: Area): [number, number] {
  if (a.label) return a.label
  const n = a.shape.length
  return [a.shape.reduce((s, p) => s + p[0], 0) / n, a.shape.reduce((s, p) => s + p[1], 0) / n]
}

/**
 * A hand-drawn border: each straight edge gets a few small wobbles. The wobble
 * depends only on the edge's two ends, so neighbours that share an edge get
 * the same line and the borders still meet.
 */
export function roughOutline(shape: [number, number][]): [number, number][] {
  const out: [number, number][] = []
  for (let i = 0; i < shape.length; i++) {
    const a = shape[i]
    const b = shape[(i + 1) % shape.length]
    out.push(a)
    const flip = a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])
    const [p, q] = flip ? [b, a] : [a, b]
    let seed = (p[0] * 73856093) ^ (p[1] * 19349663) ^ (q[0] * 83492791) ^ (q[1] * 2654435761)
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    const len = Math.hypot(q[0] - p[0], q[1] - p[1])
    const steps = Math.max(2, Math.round(len / 28))
    const nx = -(q[1] - p[1]) / len
    const ny = (q[0] - p[0]) / len
    const mids: [number, number][] = []
    for (let k = 1; k < steps; k++) {
      const t = k / steps
      const off = (rand() - 0.5) * Math.min(14, len * 0.12)
      mids.push([p[0] + (q[0] - p[0]) * t + nx * off, p[1] + (q[1] - p[1]) * t + ny * off])
    }
    out.push(...(flip ? mids.reverse() : mids))
  }
  return out
}
