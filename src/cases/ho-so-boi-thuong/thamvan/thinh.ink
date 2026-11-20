VAR has_H4 = false
VAR has_P1 = false
VAR has_P2 = false
VAR has_P3 = false
VAR has_P5 = false
VAR has_P9 = false
VAR has_P13 = false
VAR has_X9 = false
VAR vo_hang = false
VAR vo_vu20 = false

Ông Thịnh gõ ngón tay lên bàn, đồng hồ vàng lấp lánh.
"Hợp đồng ghi rõ ràng. Bao giờ công ty trả tiền?"
-> hoi

=== hoi ===
* [Đêm cháy anh ở đâu?]
    "Vũng Tàu, đám cưới thằng cháu. Hình chụp đầy đó."
    Ông Thịnh mở điện thoại, lướt cho bạn xem từng tấm. #photo:X3
    -> hoi
* [Theo anh, ai muốn kho cháy?]
    "Con Ngân chứ ai. Bị đuổi việc, lên mạng chửi kho tôi cháy cho rồi. Còn thằng Huy kế bên thèm miếng đất của tôi mấy năm nay."
    "{Xco} đi hỏi tụi nó, đừng ngồi đây hỏi tôi."
    -> hoi
* {has_H4} [Sao trong kho toàn cuộn lõi giấy?]
    "Hàng mẫu! Hàng mẫu để khách coi thôi. Hàng thật nằm ở dãy trong, cháy rụi hết rồi."
    -> doi_hang
* {has_X9} [Ngày 11/7 anh cầm sổ đỏ vay 300 triệu.]
    "Trả lương công nhân, trả tiền hàng. Làm ăn ai không có lúc kẹt."
    "Kẹt tiền mà đi đốt kho thì Sài Gòn này cháy hết rồi {xco}."
    -> hoi
* {has_P9} [Tin nhắn "Hủy vụ 20" nghĩa là gì?]
    "Vụ 20 là lô hàng hẹn giao ngày 20. Khách hủy, tôi báo thằng Bảo vậy thôi."
    -> doi_vu20
* {vo_hang && vo_vu20} [Kho gần như trống, ngân hàng không dời ngày kiểm kê. "Vụ 20" là vụ gì?]
    Ông Thịnh tháo đồng hồ đặt xuống bàn. Lần đầu tiên ông không gõ tay nữa.
    "Ừ. Tôi nâng bảo hiểm, kêu thằng Bảo chở hàng thật đi Long An. Ngày 20 cho nó cháy. Nợ ngân hàng hai tỷ mốt, tôi hết đường."
    "Rồi ngân hàng không cho dời kiểm kê. Cháy trước ngày 16 thì ai cũng thấy. Tối 13 tôi nhắn nó hủy, kêu chở hàng về."
    "Tôi khai khống, tôi chịu. Nhưng tôi ở Vũng Tàu cả đêm. Tôi không đốt."
    {has_P13: "Hai giờ năm mốt tôi gọi nó báo cháy. Nó bắt máy liền, giọng tỉnh như sáo, như đang ngồi chờ điện thoại. Ba giờ sáng đó {xco}."}
    -> hoi
* [Tôi sẽ liên lạc lại.]
    -> END

=== doi_hang ===
Ông Thịnh khoanh tay, chờ xem bạn có gì trong tay.
+ {has_P2} [Bảng kê ghi đủ 412 cuộn vải thật, không có dòng nào là hàng mẫu.]
    "Bảng kê thằng Bảo lập. Nó ghi sao tôi ký vậy. {Xco} đi hỏi nó."
    Ông đẩy trách nhiệm đi rất nhanh. Nhưng chưa có gì cho thấy hàng thật đã rời khỏi kho.
    -> hoi
+ {has_P5} [Ba chuyến xe tải chở vải đi kho Long An từ 28/6. Hàng thật đâu có cháy.]
    Ông Thịnh nhìn tờ biên nhận, rồi nhìn bạn.
    "Kho Bình Tân dột, mùa mưa tôi chở bớt đi cho khỏi ẩm. Vậy cũng là gian lận hả?"
    -> doi_hang_2
+ [Anh dựng hàng mẫu để khai khống, đúng không?]
    "Bằng chứng đâu? Không có thì đừng nói bậy."
    Ông Thịnh quay mặt đi. Lời buộc tội không có giấy tờ đi kèm chỉ làm ông cứng hơn.
    -> hoi

=== doi_hang_2 ===
+ {has_P1} [Chở hàng đi cho khỏi ẩm, nhưng đúng tháng trước anh nâng bảo hiểm từ 1,5 tỷ lên 4 tỷ?]
    Ông Thịnh mở miệng rồi lại thôi. Ngón tay ông gõ xuống bàn một cái, rồi dừng hẳn.
    "Ừ thì... hàng không có ở đây. Tôi khai cho đủ số."
    ~ vo_hang = true
    -> hoi
+ [Chở đi rồi sao không khai lại số hàng còn trong kho?]
    "Quên. Giấy tờ là việc của thằng Bảo."
    Ông có lối thoát. Phải tìm thứ gì cho thấy ông chuẩn bị trước.
    -> hoi

=== doi_vu20 ===
Ông Thịnh nói trơn tru, như đã tập trước.
+ {has_P3} [Khách hủy hàng thì sao lại "ngân hàng không dời"? Ngân hàng kiểm kê kho ngày 16 và không cho gia hạn.]
    Ông Thịnh nuốt khan.
    "Thì... tôi xin dời kiểm kê để chờ hàng về. Không được."
    "Vụ 20 với ngân hàng là hai chuyện khác nhau."
    Nhưng tin nhắn ghi hai chuyện đó trong cùng một câu.
    ~ vo_vu20 = true
    -> hoi
+ [Lịch văn phòng cũng khoanh đỏ ngày 20.]
    "Thì ngày giao hàng, tôi khoanh lại cho nhớ. {Xco} khoanh lịch bao giờ chưa?"
    Một vòng bút đỏ không chứng minh được gì.
    -> hoi
+ {has_X9} [Anh vừa cầm sổ đỏ. Lô hàng bị hủy thì anh lấy gì trả nợ?]
    "Chuyện của tôi. Mất một lô hàng đâu có chết ai."
    Câu hỏi về tiền chỉ khiến ông bực, không khiến ông khai.
    -> hoi
