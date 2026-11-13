VAR has_X2 = false
VAR has_P6 = false
VAR has_H10 = false
VAR has_P13 = false

Anh Huy lau tay vào khăn, mắt cứ liếc ra hẻm.
"Tui ngủ trên lầu, nghe mùi khét mới dậy."
-> hoi

=== hoi ===
* [Anh phát hiện cháy lúc nào?]
    "Khoảng hai giờ bốn mươi. Tui chụp mấy tấm rồi gọi ông Thịnh liền."
    Anh Huy chìa điện thoại ra. #photo:X6
    -> hoi
* [Tiệm anh có camera không?]
    "Có, mà hư mấy bữa nay rồi."
    Anh nói mà không nhìn lên cái camera đang nháy đèn đỏ trên mái hiên.
    -> hoi
* {has_X2} [Anh từng muốn mua đất kho.]
    "Muốn thì muốn. Đâu phải muốn là đốt. Tui đâu có chìa mà vô."
    "Kho cháy rồi thì ông Thịnh càng không bán, ổng còn kiện tui tội nghi cho ổng. Tui được gì?"
    -> hoi
* {has_H10} [Trong kho có can xăng dán tem tiệm anh.]
    "Kho đó mua xăng tiệm tui hoài, chạy máy phát mỗi lần cúp điện. Tui ghi sổ chịu hết, coi đi."
    Anh Huy chụp trang sổ gửi cho bạn. #photo:X8
    -> hoi
* {has_P6} [Camera tiệm anh quay được chiếc Wave che biển số. Sao anh nói camera hư?]
    Anh Huy gãi đầu.
    "Tui sợ dính vô. Đưa ra là công an kêu lên kêu xuống, tiệm ai coi."
    "Người chạy xe mặc áo sáng màu, dáng ốm. Mũ bảo hiểm kín mít, tui không thấy mặt."
    -> hoi
* {has_P13} [Anh gọi ông Thịnh lúc 02:45. Sao không gọi cứu hỏa trước?]
    "Gọi 114 trước chứ. Máy tui hai sim, {xco} coi sim kia."
    "Rồi tui gọi ông Thịnh. Ổng la ổng ở Vũng Tàu, ổng gọi thằng Bảo."
    -> hoi
* [Cảm ơn anh.]
    -> END
