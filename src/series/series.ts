// Series-level settings shared by every chapter. To rename the series, change
// `name` here; nothing else in the code spells it out.

export interface Chapter {
  number: number
  /** Case id from src/cases/<id>/case.json; absent while the chapter isn't made yet. */
  caseId?: string
  title: string
  /** One line shown on the chapter's folder in the chapter select. */
  blurb: string
  place: string
  /** Where the case sits on the Saigon map: an id from src/series/areas.ts. */
  area?: string
  /** Exact spot of the case on the map (1000 x 900 map units); defaults to the area's middle. */
  spot?: [number, number]
  /** Shown on the map tag and the case folder. */
  difficulty?: 'Dễ' | 'Vừa' | 'Khó' | 'Rất khó'
  /** Rough play time, like "60–75 phút". */
  playTime?: string
}

export const SERIES = {
  name: 'Hồ Sơ Sài Gòn',
  tagline: 'Mỗi hồ sơ là một lời nói dối chờ được bóc tách.',
  chapters: [
    {
      number: 1,
      difficulty: 'Dễ',
      playTime: '60–75 phút',
      caseId: 'ho-so-boi-thuong',
      area: 'binh-tan',
      spot: [335, 575],
      title: 'Hồ sơ bồi thường',
      blurb: 'Kho vải cháy rụi giữa đêm. Chủ kho đòi bồi thường 4 tỷ đồng. Bạn có 10 ngày để đề xuất chi trả hay từ chối.',
      place: 'Bình Tân · tháng 7',
    },
    {
      number: 2,
      difficulty: 'Vừa',
      playTime: '75–90 phút',
      caseId: 'con-nuoc-can-gio',
      area: 'can-gio',
      spot: [740, 805],
      title: 'Con nước Cần Giờ',
      blurb: 'Chủ vựa hải sản chết đuối sau đêm ghe chìm. Vợ ông đòi 5 tỷ bảo hiểm nhân thọ. Con nước đêm đó sẽ cho bạn biết ai nói dối.',
      place: 'Cần Giờ · tháng 9',
    },
    {
      number: 3,
      difficulty: 'Vừa',
      playTime: '75–90 phút',
      caseId: 'buc-son-mai',
      area: 'trung-tam',
      spot: [560, 545],
      title: 'Bức sơn mài biến mất',
      blurb: 'Bức sơn mài 8 tỷ biến mất khỏi phòng tranh Đồng Khởi ba ngày trước phiên đấu giá. Nhưng thứ bị lấy đi có thật là tranh thật?',
      place: 'Quận 1 · tháng 11',
    },
    {
      number: 4,
      difficulty: 'Vừa',
      playTime: '90 phút',
      caseId: 'chuyen-xe-dem',
      area: 'binh-thuan',
      spot: [815, 300],
      title: 'Chuyến xe đêm Quốc lộ 1A',
      blurb: 'Xe container chở 20 tấn hồ tiêu bị cướp giữa đêm. Chủ hàng đòi 3 tỷ bảo hiểm. Cái cân ở trạm thu phí biết nhiều hơn tài xế kể.',
      place: 'Bình Thuận · tháng 11',
    },
    {
      number: 5,
      difficulty: 'Khó',
      playTime: '90–105 phút',
      caseId: 'dem-thu-thiem',
      area: 'thu-duc',
      title: 'Đêm Thủ Thiêm',
      blurb: 'Chiếc Mercedes lao xuống bờ kênh Thủ Thiêm lúc 2 giờ sáng, chủ xe đòi 2,1 tỷ. Cùng đêm đó, cách 4 km, một chiếc xe đen tông người rồi bỏ chạy.',
      place: 'Thủ Đức · tháng 12',
    },
    {
      number: 6,
      difficulty: 'Vừa',
      playTime: '75–90 phút',
      caseId: 'dem-trieu-cuong',
      area: 'cho-lon',
      title: 'Đêm triều cường',
      blurb: 'Triều cường tràn vào kho điện thoại bên kênh Đôi. Bà chủ đòi 4,5 tỷ cho 1.500 máy. Nhưng nước chỉ dâng 0,9 m, còn ba tầng kệ trên thì trống trơn.',
      place: 'Quận 8 · tháng 11',
    },
    {
      number: 7,
      difficulty: 'Vừa',
      playTime: '75–90 phút',
      caseId: 'tiem-vang-kim-thanh',
      area: 'go-vap',
      spot: [570, 468],
      title: 'Tiệm vàng Kim Thành',
      blurb: 'Hai tên cầm dao ập vào tiệm vàng Gò Vấp lúc đóng cửa, bà chủ khai mất 45 lượng, đòi 6,3 tỷ. Nhưng chiếc nhẫn rơi lại dưới gầm tủ nhẹ hơn vàng thật gần một nửa.',
      place: 'Gò Vấp · tháng 12',
    },
    {
      number: 8,
      difficulty: 'Khó',
      playTime: '90–105 phút',
      caseId: 'lo-sua-0601',
      area: 'quan-12',
      title: 'Lô sữa 0601',
      blurb: 'Có kẻ chích kim vào sữa đậu nành rồi gửi thư đòi 500 triệu. Nhà máy thu hồi hai lô, đòi 3,2 tỷ bảo hiểm. Nhưng sữa đã chua từ trước khi có lá thư.',
      place: 'Quận 12 · tháng 1',
    },
    {
      number: 9,
      difficulty: 'Vừa',
      playTime: '90 phút',
      caseId: 'can-ho-tang-27',
      area: 'binh-thanh',
      title: 'Căn hộ tầng 27',
      blurb: 'Két sắt ở tầng 27 mở toang trong đêm chủ nhà bay ra Hà Nội. Cửa không bị phá, két không bị cạy, và chị đang nợ ngân hàng. Mọi thứ đều giống gian lận.',
      place: 'Bình Thạnh · tháng 12',
    },
    {
      number: 10,
      difficulty: 'Khó',
      playTime: '90–105 phút',
      caseId: 'ba-muoi-ba-do',
      area: 'tan-binh',
      spot: [445, 455],
      title: 'Ba mươi ba độ',
      blurb: 'Lô thuốc ung thư 4,6 tỷ nằm trong kho lạnh sân bay Tân Sơn Nhất, vậy mà nhiệt kế báo 33 độ suốt ba tiếng. Lò đốt đã hẹn ngày nhận hàng.',
      place: 'Tân Bình · tháng 11',
    },
    {
      number: 11,
      difficulty: 'Khó',
      playTime: '105 phút',
      caseId: 'ho-ban-nguyet',
      area: 'quan-7',
      title: 'Đêm bên hồ Bán Nguyệt',
      blurb: 'Giám đốc công ty vận tải rơi từ tầng 21 xuống bờ hồ Bán Nguyệt. Công an nói tự tử, em trai ông nói trượt chân và đòi 6 tỷ. Câu hỏi khó nhất là tiền phải trả cho ai.',
      place: 'Quận 7 · tháng 3',
    },
    {
      number: 12,
      difficulty: 'Rất khó',
      playTime: '105–120 phút',
      caseId: 'dong-ho-dung',
      area: 'quan-3',
      spot: [518, 540],
      title: 'Đồng hồ dừng lúc 22:47',
      blurb: 'Ông kiến trúc sư già nằm dưới chân cầu thang gỗ trong biệt thự Pháp. Đồng hồ trên tay ông dừng lúc 22:47, đúng lúc người cháu đòi 7 tỷ đang ở tiệc cưới. Nhưng cái núm vặn đang ở sai nấc.',
      place: 'Quận 3 · tháng 4',
    },
  ] satisfies Chapter[],
}

/**
 * One colour, level and rule set per difficulty. Harder cases give fewer days, less
 * reputation and say less about what is missing. Hints have no cap at any level, and only the
 * key ("Khớp") cards are ever required on the board; supporting cards are optional.
 * - days: investigation days (every case has 4 scene zones and 1 visit a day, so 7 is enough).
 * - reputation: reputation at the start; a wrong answer costs 1.
 * - exactMissing: a right answer with too few cards says how many of each kind are missing.
 * - showNeeded: question boxes show how many cards are needed, not only how many are proven.
 */
export const DIFFICULTY: Record<
  NonNullable<Chapter['difficulty']>,
  { level: number; bg: string; fg: string; days: number; reputation: number; exactMissing: boolean; showNeeded: boolean }
> = {
  'Dễ': { level: 1, bg: '#3f8a4f', fg: '#f4fbe9', days: 10, reputation: 4, exactMissing: true, showNeeded: true },
  'Vừa': { level: 2, bg: '#d9a21b', fg: '#2b1d10', days: 9, reputation: 3, exactMissing: true, showNeeded: true },
  'Khó': { level: 3, bg: '#d0612a', fg: '#fff4e6', days: 8, reputation: 3, exactMissing: false, showNeeded: true },
  'Rất khó': { level: 4, bg: '#9b1d2a', fg: '#ffe9e6', days: 7, reputation: 2, exactMissing: false, showNeeded: false },
}

export type Rules = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]

/** The rules a case is played under, from its chapter's difficulty (a case with none plays as Vừa). */
export function rulesFor(caseId: string): Rules & { difficulty: NonNullable<Chapter['difficulty']> } {
  const difficulty = SERIES.chapters.find((c) => c.caseId === caseId)?.difficulty ?? 'Vừa'
  return { ...DIFFICULTY[difficulty], difficulty }
}

/** The next chapter after a case that is already made, if any. */
export function nextChapter(caseId: string) {
  const at = SERIES.chapters.findIndex((c) => c.caseId === caseId)
  return at < 0 ? undefined : SERIES.chapters.slice(at + 1).find((c) => c.caseId)
}

/** "8 ngày · uy tín 3": the limits of a difficulty, for badges. */
export function limitsLabel(difficulty: NonNullable<Chapter['difficulty']>) {
  const r = DIFFICULTY[difficulty]
  return `${r.days} ngày · uy tín ${r.reputation}`
}
