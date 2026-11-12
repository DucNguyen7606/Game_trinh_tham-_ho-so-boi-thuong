VAR has_X1 = false
VAR has_H3 = false
VAR has_P4 = false
VAR has_P7 = false
VAR has_P9 = false
VAR has_P11 = false

Bà Kiều đặt cái laptop lên bàn, màn hình vẫn mở bản đồ định vị đội xe.
"Xe tôi mất hàng thì tôi cũng phải đền. Tôi được gì?"
-> hoi

=== hoi ===
* [Đêm 2/11 chị ở đâu?]
    "Ở nhà, Buôn Ma Thuột. Xe chạy là tôi thức canh định vị tới sáng."
    "Mười hai giờ rưỡi thấy xe 47H mất sóng, tôi chụp màn hình gửi thằng Đạt hỏi mà nó không trả lời." #photo:X5
    -> hoi
* [Chuyến này ai sắp xếp?]
    "Ông Tài gọi đặt xe. Lần này ổng đòi đích danh thằng Đạt chạy, nói tin nó."
    "Chuyến nào ổng cũng kêu tôi tự lo, tự chịu. Lần đầu tiên ổng chịu bỏ tiền mua bảo hiểm hàng."
    -> hoi
* {has_X1} [Nhà xe đang nợ ngân hàng 2,1 tỷ.]
    "Thì sao? Xe mất hàng, Đất Đỏ kiện thì tôi còn nợ thêm. Tôi điên mới đi dàn cướp xe mình."
    -> hoi
* {has_P4} [Xe mất sóng hơn một tiếng gần Phan Rí. Chị có gọi anh Đạt không?]
    "Gọi bốn cuộc, không bắt máy. Một giờ thì có sóng lại, nó nhắn 'chỗ này yếu sóng chị ơi'."
    -> hoi
* {has_H3} [Trong cabin có một máy phá sóng định vị.]
    Bà Kiều đập tay xuống bàn.
    "Xe tôi mà gắn đồ đó, tôi bị tước giấy phép là chắc. Thằng Đạt... trời ơi."
    -> hoi
* {has_P9} [Tiền cọc kho Phan Rí chuyển từ tài khoản Trần Thị Mai, kế toán nhà xe chị.]
    "Con Mai hay tạm ứng giùm bạn bè. {Xco} đi hỏi nó."
    Bà kéo laptop lại gần, gập màn hình xuống một nửa.
    -> hoi
* {has_P7} [Xe bán tải của nhà xe chị qua trạm Cà Ná lúc 23:31, quay về lúc 03:22.]
    "Tôi cho thằng Phúc mượn."
    Nhưng lúc đó Phúc đang hát karaoke ở Phan Rang, không có xe. Bà Kiều không nhìn bạn nữa.
    -> hoi
* {has_P11} [Chị chuyển 250 triệu cho vợ anh Đạt, rồi trả ngân hàng 2,1 tỷ đúng hôm sau khi bán tiêu.]
    Bà Kiều ngồi lặng, hai tay ôm cái laptop.
    "Ba mươi tháng 11 là ngân hàng tới kéo hai chiếc xe. Năm chiếc xe là cả đời tôi."
    "Hàng có bảo hiểm thì An Tín đền cho ông Tài. Cướp có công an xác nhận thì nhà xe khỏi đền. Tôi tưởng không ai mất gì hết."
    "Lỡ có lộ... thì chì của Đất Đỏ, hợp đồng lỗ của Đất Đỏ. Người ta nghi ổng trước."
    -> hoi
* [Cảm ơn chị.]
    -> END
