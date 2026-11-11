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
}

export const SERIES = {
  name: 'Hồ Sơ Sài Gòn',
  tagline: 'Mỗi hồ sơ là một lời nói dối chờ được bóc tách.',
  chapters: [
    {
      number: 1,
      caseId: 'ho-so-boi-thuong',
      area: 'binh-tan',
      title: 'Hồ sơ bồi thường',
      blurb: 'Kho vải cháy rụi giữa đêm. Chủ kho đòi bồi thường 4 tỷ đồng. Bạn có 10 ngày để đề xuất chi trả hay từ chối.',
      place: 'Bình Tân · tháng 7',
    },
    {
      number: 2,
      caseId: 'con-nuoc-can-gio',
      area: 'can-gio',
      title: 'Con nước Cần Giờ',
      blurb: 'Chủ vựa hải sản chết đuối sau đêm ghe chìm. Vợ ông đòi 5 tỷ bảo hiểm nhân thọ. Con nước đêm đó sẽ cho bạn biết ai nói dối.',
      place: 'Cần Giờ · tháng 9',
    },
    {
      number: 3,
      caseId: 'buc-son-mai',
      area: 'trung-tam',
      title: 'Bức sơn mài biến mất',
      blurb: 'Bức sơn mài 8 tỷ biến mất khỏi phòng tranh Đồng Khởi ba ngày trước phiên đấu giá. Nhưng thứ bị lấy đi có thật là tranh thật?',
      place: 'Quận 1 · tháng 11',
    },
    {
      number: 4,
      caseId: 'chuyen-xe-dem',
      area: 'binh-thuan',
      title: 'Chuyến xe đêm Quốc lộ 1A',
      blurb: 'Xe container chở 20 tấn hồ tiêu bị cướp giữa đêm. Chủ hàng đòi 3 tỷ bảo hiểm. Cái cân ở trạm thu phí biết nhiều hơn tài xế kể.',
      place: 'Bình Thuận · tháng 11',
    },
    {
      number: 6,
      caseId: 'dem-trieu-cuong',
      area: 'cho-lon',
      title: 'Đêm triều cường',
      blurb: 'Triều cường tràn vào kho điện thoại bên kênh Đôi. Bà chủ đòi 4,5 tỷ cho 1.500 máy. Nhưng nước chỉ dâng 0,9 m, còn ba tầng kệ trên thì trống trơn.',
      place: 'Quận 8 · tháng 11',
    },
  ] satisfies Chapter[],
}
