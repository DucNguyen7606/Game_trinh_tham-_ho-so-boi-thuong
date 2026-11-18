VAR has_P3 = false
VAR has_H1 = false
VAR has_H4 = false
VAR has_P5 = false
VAR has_P7 = false
VAR has_P8 = false
VAR has_P9 = false
VAR has_X2 = false
VAR has_H10 = false
VAR has_P12 = false

Tùng kéo khóa áo phao lên tận cổ, cười xởi lởi.
"Phòng lạnh của em chưa bao giờ lệch một độ. {Xchi} xem cảm biến tường thì biết."
-> hoi

=== hoi ===
* [Đêm 15/11 anh làm gì?]
    "Em trực một mình, ngồi phòng nghỉ xem bóng đá. Cứ hai, ba tiếng em vào phòng lạnh đi một vòng. Đêm đó yên ắng lắm."
    -> hoi
* [Anh có động vào pallet của Minh Tâm không?]
    "Dạ không. Hàng dược đóng thùng niêm phong, bọn em chỉ xếp lên kệ, không ai mở."
    -> hoi
* {has_H1} [Thùng trên cùng bị dán lại bằng băng dính của kho.]
    "Chắc bên hải quan rạch ra kiểm tra. Kho nào chẳng có cuộn băng dính ấy."
    -> hoi
* {has_P3} [TL-A nóng lên 33 độ từ 23:56 tới 02:44, trong khi phòng lạnh không lên quá 6 độ.]
    "Chắc nhiệt kế hỏng. Đồ điện tử mà {xchi}."
    -> hoi
* {has_P5} [Thẻ của anh mở phòng lạnh 3 lúc 23:52 và 02:41, mỗi lần sáu phút.]
    "Thì em đi kiểm tra. Ca đêm vào phòng lạnh là chuyện bình thường."
    "Mỗi lần vào, anh có mở thùng nào không?" Tùng nhìn xuống sàn, không trả lời.
    -> hoi
* {has_H4} [Trong túi áo phao của anh có mẩu băng dính Đức PHARMA-LOGISTIK.]
    Tùng đưa tay lên ngực áo theo phản xạ, rồi bỏ xuống.
    "Băng dính dính lung tung trong kho suốt, {xchi}."
    -> hoi
* {has_P7} [Anh lập biên bản đề xuất giao lô thuốc cho Hưng Thịnh, và giục Minh Tâm ký gấp.]
    "Hưng Thịnh là đơn vị quen của kho. Hàng hỏng để lâu tốn tiền lưu kho của khách, em giục là giúp họ."
    -> hoi
* {has_P8} [Hưng Thịnh thuê xe tải lạnh từ ngày 14/11, trước khi lô thuốc hạ cánh.]
    "Anh ấy xem danh sách hàng sắp về của kho qua em. Thấy lô Herzena là anh ấy hỏi ngay."
    -> hoi
* {has_P12} [Máy nén số 2 của phòng lạnh 3 hỏng từ 13/11.]
    "Đấy, em báo kỹ thuật từ hôm 13 rồi. Một máy nén mà gánh cả phòng, nóng lên một chút là chuyện thường."
    "Phiếu đó em ký mà, {xchi} xem đi."
    -> hoi
* {has_H10} [Chị Linh nhờ anh để riêng thùng số 1 ra mép kệ.]
    "Dạ, sáng 16 chị dán giấy dặn em. Em để ra cho chị, chỉ thế thôi. Chị dược sĩ muốn đọc nhiệt kế sớm thì em chiều."
    -> hoi
* {has_P9} [Ngày 16/11 anh nộp 100 triệu tiền mặt ở Bình Chánh, rồi trả nợ 85 triệu.]
    Tùng cười, kéo khóa áo phao xuống một chút.
    "Em trúng độ {xchi}. Trận Chủ nhật em ăn đậm, sáng ra trả nợ luôn cho nhẹ người. Cá độ thì {xchi} báo công an, chứ có liên quan gì đến cái pallet."
    -> tung_tien
* [Cảm ơn anh.]
    -> END

// Tùng nhận tội nhỏ (cá độ) để che tội lớn. Phải nối khoản tiền với người trả tiền, rồi chỉ ra cái nhiệt kế đã nằm ở đâu.
=== tung_tien ===
+ {has_P12} [Đêm đó phòng lạnh chạy có một máy nén.]
    "Thì đấy, em nói mãi. Máy móc thì {xchi} hỏi kỹ thuật, tiền của em thì em trúng độ."
    Tùng kéo khóa áo lên tận cổ. Chuyện máy nén không dính gì đến số tiền. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_X2} [Trưa 15/11 pallet đã nằm ngoài nắng 34 độ.]
    "Đấy là lỗi ông Lộc ngoài sân đỗ, có phải em đâu."
    Tùng kéo khóa áo lên tận cổ. Chuyện cái nắng trưa không dính gì đến số tiền. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_P8} [Hưng Thịnh thuê sẵn xe lạnh từ 14/11 để chở đúng 40 thùng này. Trúng độ hay ai trả tiền cho anh?]
    Nụ cười của Tùng tắt.
    "Anh ấy làm ăn của anh ấy, em biết đâu. Mà em có động gì đến thuốc đâu, cảm biến tường vẫn còn đấy, phòng lạnh chưa lúc nào quá 6 độ."
    -> tung_tien_2
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== tung_tien_2 ===
+ {has_H10} [Chị Linh là người đầu tiên động vào thùng số 1.]
    "Đấy, chị dược sĩ chứ có phải em đâu."
    Tùng ngả người ra ghế. Giấy nhớ của Linh đề ngày 16/11, lúc TL-A đã báo đỏ từ đêm trước, nên nó chẳng chứng minh được gì. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_P3 and has_H4} [Đúng, phòng lạnh không nóng. Cái nóng 33 độ trong bóng tối gần ba tiếng là hơi người. Mẩu băng dính Đức nằm trong túi áo trong của anh.]
    -> tung_khai
+ {has_P5 and has_P7} [Thẻ anh mở phòng lạnh đúng hai lần TL-A nóng lên rồi nguội xuống. Rồi chính anh lập biên bản giao lô thuốc cho Hưng Thịnh.]
    -> tung_khai
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== tung_khai ===
Tùng ngồi phịch xuống ghế, kéo khóa áo xuống.
"Em thua độ bóng đá, nợ bọn nó 85 triệu, bọn nó đến tận nhà."
"Anh Hưng bảo chỉ cần cái nhiệt kế báo đỏ. Em lấy nó ra, bỏ túi áo trong ngồi xem hết hai trận, rồi bỏ lại vào thùng."
"Anh ấy bảo thuốc ấy đằng nào cũng có người mua. Tin nhắn em vẫn giữ, {xchi} xem đi." #photo:X4
-> hoi
