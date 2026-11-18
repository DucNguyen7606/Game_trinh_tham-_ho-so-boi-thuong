VAR has_X5 = false
VAR has_X6 = false
VAR has_X8 = false
VAR has_H6 = false
VAR has_H7 = false
VAR has_P7 = false
VAR has_P10 = false

Tư ghe ngồi xổm trên mũi ghe, rít điếu thuốc, chẳng buồn đứng dậy.
"Đêm nước lớn ai dại mà chạy ghe."
-> hoi

=== hoi ===
* [Đêm 14/11 ông ở đâu?]
    "Trên ghe, neo ở bến. Con gái tôi chụp ảnh đây, ghe nằm ngay đấy." #photo:X5
    -> hoi
* [Ông có hay chở hàng cho kho Mỹ Lệ không?]
    "Dăm ba hôm một lần, chở xuống Cần Đước, Gò Công. Anh Khải gọi thì tôi chạy."
    -> hoi
* {has_H6} [Mạn ghe ông bị xước, dính vữa xám và một mẩu băng dính "MỸ LỆ".]
    "Ghe chạy kênh thì xước là chuyện thường. Băng dính thì tôi chở hàng cho bà ấy suốt, dính là phải."
    -> hoi
* {has_H7} [Ông đổ đầy 60 lít dầu lúc 18:10. Sáng ra bình còn một phần ba.]
    Tư dụi điếu thuốc.
    "Tôi... chạy ra kênh Tẻ xem nước một chút."
    -> hoi
* {has_P7} [Camera thấy một ghe đèn xanh cập cửa sổ kho lúc 01:52, rời đi lúc 02:41.]
    "Ghe đèn xanh ở bến này đâu phải mỗi mình tôi." Ông quay mặt ra kênh.
    -> hoi
* {has_P10} [Ngày 18/11 Khải chuyển cho ông 60 triệu.]
    "Anh ấy nợ cước tôi ba tháng, giờ mới trả. {Xco} xem sổ cước của tôi đi."
    -> hoi
* {has_P10 && has_H7} [Ông nói cả đêm không nổ máy, mà bình dầu vơi 40 lít. Ba ngày sau Khải chuyển cho ông đúng 60 triệu.]
    Tư im một lúc rồi nhổ nước bọt xuống kênh.
    "Anh ấy bảo chở hàng đi cứu cho khỏi ngập, trả tôi sáu chục triệu. Chở xong anh ấy bảo tôi im."
    "Tôi chở hàng ba chục năm, chuyến nào bốc hàng lúc 2 giờ sáng qua cửa sổ thì tôi hiểu chứ. Tôi tham."
    -> hoi
* {has_X5 && has_P7} [Ảnh con gái ông chụp lúc 21:05. Chiếc ghe cập cửa sổ kho lúc 01:52.]
    "Thì 9 giờ ghe tôi nằm đấy. Ảnh có giờ hẳn hoi."
    "Còn 2 giờ sáng?" Tư rít một hơi thuốc dài, không đáp.
    -> hoi
* {has_X6} [Đêm đó ghe cứu hộ của phường cũng chạy trên kênh Đôi.]
    "Đấy! Ghe phường chạy cả đêm, đèn xanh nháy. Sao {xco} không hỏi ghe phường?"
    -> hoi
* {has_X8} [Dây neo trên song sắt cửa sổ kho là dây nilon xanh, buộc kiểu dân ghe.]
    "Dây nilon xanh thì ghe nào ở bến này chẳng dùng. Tôi buộc nút ấy, ông Sáu bên kia cũng buộc nút ấy."
    -> hoi
* [Cảm ơn ông.]
    -> END
