VAR has_P11 = false
VAR has_X6 = false
VAR has_X7 = false
VAR has_X3 = false
VAR has_H2 = false
VAR has_H3 = false
VAR has_H5 = false
VAR has_P7 = false
VAR has_P10 = false

Khải đứng dậy chào, hai tay để trước bụng, nói chậm rãi.
"Em kê hàng tới tối mịt, nước lên nhanh quá chị ơi."
-> hoi

=== hoi ===
* [Đêm 14/11 anh ở kho tới mấy giờ?]
    "Tới khoảng 10 giờ. Em kê hàng lên ba tầng trên, chất bao cát chặn cửa cuốn rồi chạy về, sợ đường ngập không về được."
    -> hoi
* [Nhà anh ở đâu?]
    "Phòng trọ trong hẻm Bình Đông, cách kho chừng một cây số."
    -> hoi
* {has_X3} [Anh gửi ảnh cho bà Lệ lúc 23:58. Lúc đó anh vẫn trong kho.]
    Khải gãi đầu.
    "Dạ... chắc em nhớ lộn giờ. Em về khoảng 12 giờ. Lúc đó hàng tầng trên vẫn còn đủ, {xchi} thấy đó."
    -> hoi
* {has_H2} [Ba tầng kệ trên khô ráo, chỉ có những ô sạch bụi. Nước không tới đó.]
    "Thì... chắc sóng ghe chạy ngoài kênh đánh vô, nước tạt lên cao."
    -> hoi
* {has_H3} [Chốt cửa sổ được kéo ra từ phía trong, không hư gì hết.]
    "Em đâu biết. Lúc em về cửa sổ còn đóng."
    -> hoi
* {has_H5} [Áo mưa của anh dính bùn tới ngang đùi. Lúc 10 giờ nước còn chưa vào kho.]
    Khải nhìn xuống đôi dép.
    "Em... lội về. Ngoài đường ngập."
    "Lúc 10 giờ đường Bình Đông chưa ngập tới đùi đâu anh." Khải không nói gì nữa.
    -> hoi
* {has_P7} [Camera bên kia kênh thấy một chiếc ghe cập cửa sổ kho lúc 01:52.]
    "Chắc ghe ai đó tránh nước, cột tạm vô song sắt."
    -> hoi
* {has_P10} [17/11 anh nhận 1,1 tỷ từ ông Phùng Gia Hưng, rồi chuyển 60 triệu cho Tư ghe.]
    Khải nuốt nước bọt.
    "Em bán miếng đất ở quê cho ảnh. Anh Hưng mua đất làm nhà vườn. Còn sáu chục triệu là em trả nợ cước chở hàng cho ông Tư."
    "Giấy tờ đất đâu anh?" Khải nói để ở dưới quê.
    -> hoi
* {has_P10 && has_P11} [214 máy "bị nước cuốn" đã gắn sim từ 17/11, máy đầu tiên bán ra ở tiệm Gia Hưng. Cùng ngày anh nhận 1,1 tỷ của chủ tiệm đó.]
    Khải ngồi xuống, hai tay ôm đầu.
    "Sáu năm em làm cho cô, lương bảy triệu. Năm nào nước lên cũng trôi hàng, cũng có bảo hiểm đền."
    "Em nghĩ thêm một ít thì cô cũng được đền, đâu ai thiệt."
    -> hoi
* {has_X6} [Phường có ghe cứu hộ tuần tra kênh Đôi đêm đó.]
    "Đó, chắc ghe phường ghé coi rồi kéo cửa sổ ra. Ghe cứu hộ thì có đèn xanh mà."
    -> hoi
* {has_X7} [Cậu Nhật đang rao bán 30 máy điện thoại giá rẻ.]
    Khải gật đầu liền.
    "Em không dám nói, mà cậu Nhật nợ nần dữ lắm. Tháng trước cậu còn hỏi em hàng trong kho bán sỉ được bao nhiêu."
    -> hoi
* [Cảm ơn anh.]
    -> END
