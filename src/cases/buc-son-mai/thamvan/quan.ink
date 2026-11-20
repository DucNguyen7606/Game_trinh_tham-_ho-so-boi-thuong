VAR has_P2 = false
VAR has_P5 = false
VAR has_H2 = false
VAR has_H6 = false
VAR has_H7 = false
VAR has_H9 = false
VAR has_P10 = false
VAR has_P11 = false
VAR vo_mau = false
VAR vo_mdf = false
VAR vo_thanh = false

Quân lau tay vào chiếc tạp dề đầy vệt sơn, ngồi xuống ghế đẩu.
"Sơn mài là nghề của sự kiên nhẫn. {Xchi} hỏi gì cứ hỏi."
-> hoi

=== hoi ===
* [Đêm 19/11 anh ở đâu?]
    "Ở xưởng, livestream dạy mài sơn tới hơn 2 giờ. Thằng Tí học trò ngồi kế bên."
    "Video còn đây, {xchi} coi." #photo:X5
    -> hoi
* [Hồi tháng 6 anh phục chế bức tranh thế nào?]
    "Xử lý vết rạn chân chim ở góc dưới trái. Mài, trám, phủ lại. Mất gần bốn tuần."
    -> hoi
* {has_H9} [Kính lúp của ông Phong nằm dưới gầm bàn mài của anh.]
    "Ông Phong ghé hồi đầu tháng 6, bà Diệp nhờ ổng coi vết rạn trước khi tôi làm. Ổng để quên, tôi cất đó chờ ổng lấy."
    "Ổng soi có mười phút rồi đi. Ổng đâu có rảnh ngồi với thợ."
    -> hoi
* {has_H7} [Giấy can nét bức "Thiếu nữ bên sen", tỉ lệ 1:1.]
    Quân không nhìn cuộn giấy.
    "Thợ phục chế phải can lại để giữ nét. Nghề nó vậy."
    -> hoi
* {has_P5} [Sau khi anh trả tranh, con chuồn chuồn đổi từ đỏ sang vàng, chữ ký thành "Khuê 1962".]
    "Lớp sơn son bị xỉn, tôi đánh lại thì nó lên màu khác. Còn chữ ký... chắc ảnh chụp không rõ."
    -> doi_mau
* {has_H6} [Tấm MDF 90 × 120 trong xưởng anh để làm gì?]
    "Khách đặt tranh trang trí. MDF rẻ, khách thích."
    "Khách nào?" Anh nhún vai.
    -> doi_mdf
* {has_P10} [Ngày 3/7 ông Hứa Vĩnh Thành chuyển cho anh 2,5 tỷ, ghi "thanh toán tác phẩm".]
    "Tôi bán tranh của tôi. Ông Thành mê sơn mài, mua của tôi cả chục bức."
    -> doi_thanh
* {has_P10} [Ngày 16/10 và 20/11 anh chuyển cho Ngọc 300 triệu.]
    Quân cúi xuống nhìn hai bàn tay.
    "Con nhỏ nợ thẻ. Tôi cho mượn."
    -> hoi
* {(vo_mau || vo_mdf) && vo_thanh} [Bức anh trả về tháng 6 là bức anh làm. Bức thật đang treo nhà ông Thành.]
    Quân đặt hai bàn tay lên đùi, các ngón tay đen bóng sơn.
    "Tôi làm cho người ta mười lăm năm, mỗi bức được vài triệu. Họ bán một bức được mấy tỷ."
    "Bà Diệp treo nó mười sáu năm mà không nhận ra. Vậy thì nó có khác gì đâu."
    "Tới khi con Ngọc gọi hỏi vì sao sơn là acrylic, tôi biết ngày 21 là hết. Tôi chỉ nói với nó một câu: bức đó mà biến mất thì không ai thiệt."
    -> hoi
* [Cảm ơn anh.]
    -> END

=== doi_mau ===
+ {has_P2} [Biên bản tháng 3 ghi chữ ký "Khuê 62" và vết rạn góc dưới. Đánh bóng không làm chữ ký tự viết thêm hai số, cũng không làm son đỏ thành vàng.]
    Quân cầm miếng giẻ lên, lau một vệt sơn không có trên tay.
    "...Tôi sửa chữ ký cho đẹp. Khách thích."
    Thợ phục chế không bao giờ sửa chữ ký của tác giả. Anh biết điều đó.
    ~ vo_mau = true
    -> hoi
+ [Sơn son không bao giờ ngả vàng.]
    "{Xchi} làm sơn mài được mấy năm? Son ta pha nhựa thông, đánh mạnh tay là ngả màu."
    Không có biên bản gốc trong tay, bạn khó cãi lại một người làm nghề mười lăm năm.
    -> hoi

=== doi_mdf ===
+ {has_H2} [Trong khung tranh ở phòng tranh còn kẹt một mảnh MDF dính sơn đen, đúng loại ván này.]
    Quân liếc tấm ván dựng tường, rồi nhìn đi chỗ khác.
    "MDF thì chỗ nào bán chả có."
    Nhưng mảnh ván trong khung và tấm ván trong xưởng anh cùng loại, cùng lớp sơn đen phủ dở.
    ~ vo_mdf = true
    -> hoi
+ [Khách đặt tranh MDF mà sao đúng cỡ 90 × 120 của bức sen?]
    "Cỡ đó là cỡ phổ biến, {xchi} ra Bình Thạnh hỏi xưởng nào cũng có."
    -> hoi

=== doi_thanh ===
+ {has_P11} [Ảnh phòng khách nhà ông Thành: bức sen có chuồn chuồn đỏ son và vết rạn góc dưới trái.]
    Quân nhìn tấm ảnh rất lâu.
    "Vết rạn đó tôi cố ý để lại. Tranh của ông Khuê thì phải có vết thời gian."
    ~ vo_thanh = true
    -> hoi
+ {has_H9} [Ông Phong ghé xưởng anh tháng 6. Ông ấy với anh làm chung?]
    Quân bật cười.
    "Ông Phong mà làm chung với tôi thì tháng 7 đâu có chê bức tôi trả là không phải bức ổng thẩm định. {Xchi} hỏi ổng coi."
    -> hoi
+ [Hai tỷ rưỡi cho một bức tranh của thợ?]
    "Tranh tôi có giá. {Xchi} không biết thôi."
    -> hoi
