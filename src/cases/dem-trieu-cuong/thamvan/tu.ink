VAR has_X5 = false
VAR has_X6 = false
VAR has_X8 = false
VAR has_H6 = false
VAR has_H7 = false
VAR has_P7 = false
VAR has_P10 = false

Tư ghe ngồi xổm trên mũi ghe, rít điếu thuốc, không buồn đứng dậy.
"Đêm nước lớn ai dại mà chạy ghe."
-> hoi

=== hoi ===
* [Đêm 14/11 ông ở đâu?]
    "Trên ghe, neo ở bến. Con gái tui chụp hình nè, ghe nằm ngay đó." #photo:X5
    -> hoi
* [Ông có hay chở hàng cho kho Mỹ Lệ không?]
    "Năm ba bữa một lần, chở xuống Cần Đước, Gò Công. Anh Khải gọi thì tui chạy."
    -> hoi
* {has_H6} [Mạn ghe ông bị trầy, dính vữa xám và một mẩu băng keo "MỸ LỆ".]
    "Ghe chạy kênh thì trầy là chuyện thường. Băng keo thì tui chở hàng cho bả hoài, dính là phải."
    -> hoi
* {has_H7} [Ông đổ đầy 60 lít dầu lúc 18:10. Sáng ra bình còn một phần ba.]
    Tư dụi điếu thuốc.
    "Tui... chạy ra kênh Tẻ coi nước một chút."
    -> hoi
* {has_P7} [Camera thấy một ghe đèn xanh cập cửa sổ kho lúc 01:52, rời đi lúc 02:41.]
    "Ghe đèn xanh ở bến này đâu phải mình tui." Ông quay mặt ra kênh.
    -> hoi
* {has_P10} [Ngày 18/11 Khải chuyển cho ông 60 triệu.]
    "Ảnh nợ cước tui ba tháng, giờ mới trả. {Xco} coi sổ cước của tui đi."
    -> hoi
* {has_P10 && has_H7} [Ông nói cả đêm không nổ máy, mà bình dầu vơi 40 lít. Ba ngày sau Khải chuyển cho ông đúng 60 triệu.]
    Tư im một lúc rồi phun nước bọt xuống kênh.
    "Ảnh nói chở hàng đi cứu cho khỏi ngập, trả tui sáu chục triệu. Chở xong ảnh kêu tui im."
    "Tui chở hàng ba chục năm, chuyến nào bốc hàng lúc 2 giờ sáng qua cửa sổ thì tui hiểu chứ. Tui tham."
    -> hoi
* {has_X5 && has_P7} [Ảnh con gái ông chụp lúc 21:05. Chiếc ghe cập cửa sổ kho lúc 01:52.]
    "Thì 9 giờ ghe tui nằm đó. Ảnh có giờ hẳn hoi."
    "Còn 2 giờ sáng?" Tư rít một hơi thuốc dài, không đáp.
    -> hoi
* {has_X6} [Đêm đó ghe cứu hộ của phường cũng chạy trên kênh Đôi.]
    "Đó! Ghe phường chạy cả đêm, đèn xanh nháy. Sao {xco} không hỏi ghe phường?"
    -> hoi
* {has_X8} [Dây neo trên song sắt cửa sổ kho là dây nilon xanh, buộc kiểu dân ghe.]
    "Dây nilon xanh thì ghe nào ở bến này chẳng xài. Tui buộc nút đó, ông Sáu bên kia cũng buộc nút đó."
    -> hoi
* [Cảm ơn ông.]
    -> END
