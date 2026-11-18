VAR has_X2 = false
VAR has_P6 = false
VAR has_H10 = false
VAR has_P13 = false

Anh Huy lau tay vào khăn, mắt cứ liếc ra hẻm.
"Tôi ngủ trên gác, ngửi thấy mùi khét mới dậy."
-> hoi

=== hoi ===
* [Anh phát hiện cháy lúc nào?]
    "Khoảng hai giờ bốn mươi. Tôi chụp mấy tấm rồi gọi ông Thịnh ngay."
    Anh Huy chìa điện thoại ra. #photo:X6
    -> hoi
* [Cửa hàng anh có camera không?]
    "Có, nhưng hỏng mấy hôm nay rồi."
    Anh nói mà không nhìn lên cái camera đang nháy đèn đỏ trên mái hiên.
    -> hoi
* {has_X2} [Anh từng muốn mua đất kho.]
    "Muốn thì muốn. Có phải muốn là đốt đâu. Tôi làm gì có chìa mà vào."
    "Kho cháy rồi thì ông Thịnh càng không bán, ông ấy còn kiện tôi tội vu cho ông ấy. Tôi được gì?"
    -> hoi
* {has_H10} [Trong kho có can xăng dán tem cửa hàng anh.]
    "Kho đó mua xăng chỗ tôi suốt, chạy máy phát mỗi lần mất điện. Tôi ghi sổ nợ hết, xem đi."
    Anh Huy chụp trang sổ gửi cho bạn. #photo:X8
    -> hoi
* {has_P6} [Camera cửa hàng anh quay được chiếc Wave che biển số. Sao anh nói camera hỏng?]
    Anh Huy gãi đầu.
    "Tôi sợ dính vào. Đưa ra là công an gọi lên gọi xuống, ai trông hàng."
    "Người đi xe mặc áo sáng màu, dáng gầy. Mũ bảo hiểm kín mít, tôi không thấy mặt."
    -> hoi
* {has_P13} [Anh gọi ông Thịnh lúc 02:45. Sao không gọi cứu hỏa trước?]
    "Gọi 114 trước chứ. Máy tôi hai sim, {xco} xem sim kia."
    "Rồi tôi gọi ông Thịnh. Ông ấy kêu ông ấy ở Vũng Tàu, ông ấy gọi thằng Bảo."
    -> hoi
* [Cảm ơn anh.]
    -> END
