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
}

export const SERIES = {
  name: 'Hồ Sơ Sài Gòn',
  tagline: 'Mỗi hồ sơ là một lời nói dối chờ được bóc tách.',
  chapters: [
    {
      number: 1,
      caseId: 'ho-so-boi-thuong',
      area: 'binh-tan',
      spot: [335, 575],
      title: 'Hồ sơ bồi thường',
      blurb: 'Kho vải cháy rụi giữa đêm. Chủ kho đòi bồi thường 4 tỷ đồng. Bạn có 10 ngày để đề xuất chi trả hay từ chối.',
      place: 'Bình Tân · tháng 7',
    },
    {
      number: 2,
      caseId: 'con-nuoc-can-gio',
      area: 'can-gio',
      spot: [740, 805],
      title: 'Con nước Cần Giờ',
      blurb: 'Chủ vựa hải sản chết đuối sau đêm ghe chìm. Vợ ông đòi 5 tỷ bảo hiểm nhân thọ. Con nước đêm đó sẽ cho bạn biết ai nói dối.',
      place: 'Cần Giờ · tháng 9',
    },
    {
      number: 3,
      caseId: 'buc-son-mai',
      area: 'trung-tam',
      spot: [560, 545],
      title: 'Bức sơn mài biến mất',
      blurb: 'Bức sơn mài 8 tỷ biến mất khỏi phòng tranh Đồng Khởi ba ngày trước phiên đấu giá. Nhưng thứ bị lấy đi có thật là tranh thật?',
      place: 'Quận 1 · tháng 11',
    },
    {
      number: 4,
      caseId: 'chuyen-xe-dem',
      area: 'binh-thuan',
      spot: [815, 300],
      title: 'Chuyến xe đêm Quốc lộ 1A',
      blurb: 'Xe container chở 20 tấn hồ tiêu bị cướp giữa đêm. Chủ hàng đòi 3 tỷ bảo hiểm. Cái cân ở trạm thu phí biết nhiều hơn tài xế kể.',
      place: 'Bình Thuận · tháng 11',
    },
    {
      number: 5,
      caseId: 'dem-thu-thiem',
      area: 'thu-duc',
      title: 'Đêm Thủ Thiêm',
      blurb: 'Chiếc Mercedes lao xuống bờ kênh Thủ Thiêm lúc 2 giờ sáng, chủ xe đòi 2,1 tỷ. Cùng đêm đó, cách 4 km, một chiếc xe đen tông người rồi bỏ chạy.',
      place: 'Thủ Đức · tháng 12',
    },
    {
      number: 6,
      caseId: 'dem-trieu-cuong',
      area: 'cho-lon',
      title: 'Đêm triều cường',
      blurb: 'Triều cường tràn vào kho điện thoại bên kênh Đôi. Bà chủ đòi 4,5 tỷ cho 1.500 máy. Nhưng nước chỉ dâng 0,9 m, còn ba tầng kệ trên thì trống trơn.',
      place: 'Quận 8 · tháng 11',
    },
    {
      number: 7,
      caseId: 'tiem-vang-kim-thanh',
      area: 'go-vap',
      spot: [570, 468],
      title: 'Tiệm vàng Kim Thành',
      blurb: 'Hai tên cầm dao ập vào tiệm vàng Gò Vấp lúc đóng cửa, bà chủ khai mất 45 lượng, đòi 6,3 tỷ. Nhưng chiếc nhẫn rơi lại dưới gầm tủ nhẹ hơn vàng thật gần một nửa.',
      place: 'Gò Vấp · tháng 12',
    },
    {
      number: 8,
      caseId: 'lo-sua-0601',
      area: 'quan-12',
      title: 'Lô sữa 0601',
      blurb: 'Có kẻ chích kim vào sữa đậu nành rồi gửi thư đòi 500 triệu. Nhà máy thu hồi hai lô, đòi 3,2 tỷ bảo hiểm. Nhưng sữa đã chua từ trước khi có lá thư.',
      place: 'Quận 12 · tháng 1',
    },
    {
      number: 9,
      caseId: 'can-ho-tang-27',
      area: 'binh-thanh',
      title: 'Căn hộ tầng 27',
      blurb: 'Két sắt ở tầng 27 mở toang trong đêm chủ nhà bay ra Hà Nội. Cửa không bị phá, két không bị cạy, và chị đang nợ ngân hàng. Mọi thứ đều giống gian lận.',
      place: 'Bình Thạnh · tháng 12',
    },
    {
      number: 10,
      caseId: 'ba-muoi-ba-do',
      area: 'tan-binh',
      spot: [445, 455],
      title: 'Ba mươi ba độ',
      blurb: 'Lô thuốc ung thư 4,6 tỷ nằm trong kho lạnh sân bay Tân Sơn Nhất, vậy mà nhiệt kế báo 33 độ suốt ba tiếng. Lò đốt đã hẹn ngày nhận hàng.',
      place: 'Tân Bình · tháng 11',
    },
    {
      number: 11,
      caseId: 'ho-ban-nguyet',
      area: 'quan-7',
      title: 'Đêm bên hồ Bán Nguyệt',
      blurb: 'Giám đốc công ty vận tải rơi từ tầng 21 xuống bờ hồ Bán Nguyệt. Công an nói tự tử, em trai ông nói trượt chân và đòi 6 tỷ. Câu hỏi khó nhất là tiền phải trả cho ai.',
      place: 'Quận 7 · tháng 3',
    },
    {
      number: 12,
      caseId: 'dong-ho-dung',
      area: 'quan-3',
      spot: [518, 540],
      title: 'Đồng hồ dừng lúc 22:47',
      blurb: 'Ông kiến trúc sư già nằm dưới chân cầu thang gỗ trong biệt thự Pháp. Đồng hồ trên tay ông dừng lúc 22:47, đúng lúc người cháu đòi 6 tỷ đang ở tiệc cưới. Nhưng cái núm vặn đang ở sai nấc.',
      place: 'Quận 3 · tháng 3',
    },
  ] satisfies Chapter[],
}
