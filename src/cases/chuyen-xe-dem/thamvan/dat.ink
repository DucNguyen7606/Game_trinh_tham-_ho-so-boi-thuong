VAR has_H3 = false
VAR has_H4 = false
VAR has_H5 = false
VAR has_H6 = false
VAR has_H7 = false
VAR has_H11 = false
VAR has_P4 = false
VAR has_P5 = false
VAR has_P7 = false
VAR has_P8 = false
VAR has_P11 = false
VAR has_X9 = false
VAR has_X10 = false
VAR vo_cuop = false
VAR vo_song = false

Anh Đạt ngồi ở mép ghế, hai tay xoa xoa cổ tay dù trên da không có vết gì.
"Dao kề cổ, tui còn sống là may rồi {xco} ơi."
-> hoi

=== hoi ===
* [Kể lại đêm 2/11 cho tôi nghe.]
    "Đóng hàng xong ba rưỡi chiều thì chạy. Mười giờ rưỡi ghé quán cơm ở Cà Ná, tui còn chụp hình với xe nè." #photo:X3
    "Hai giờ bốn mươi, qua khỏi Phan Thiết, một chiếc bảy chỗ tạt đầu. Ba thằng bịt mặt, cầm dao. Tụi nó trói tui quăng xuống lề rồi lái xe đi."
    "Tháng trước khúc đó bị cướp mấy vụ rồi, ai chạy đêm cũng biết."
    -> doi_cuop
* [Phụ xe Phúc đâu? Sao anh chạy một mình?]
    "Thằng nhỏ xin xuống Phan Rang thăm bồ. Tui thương nó nên cho xuống."
    -> hoi
* {has_X10} [Bà Kiều chuyển cho Phúc 5 triệu ngày 1/11. Phúc có dính vô không?]
    "Thằng đó ứng lương hoài. Nó mà dính thì đâu có xuống xe."
    Anh trả lời nhanh, không đẩy tội sang Phúc dù có cơ hội.
    -> hoi
* {has_H7} [Sợi chì dự phòng 55190 Đất Đỏ giao anh giữ. Nó nằm trên cửa container bị cắt ở Hàm Tân.]
    "Tui... làm rớt đâu mất rồi. Chì thì ai lượm chả được."
    Anh Đạt nói mà không nhìn lên.
    -> hoi
* {has_H3} [Trong cabin có máy phá sóng định vị cắm ở ổ tẩu.]
    "Cái gì? Tui không biết. Chắc tụi cướp gắn vô."
    -> doi_song
* {has_P11} [Ngày 4/11 bà Kiều chuyển 250 triệu cho vợ anh.]
    "Tiền hụi. Vợ tui chơi hụi với bả mấy năm nay."
    Nội dung chuyển khoản đúng là "tra tien hui". Một câu trả lời có giấy tờ đỡ lưng.
    -> hoi
* {vo_cuop && vo_song} [Không có vụ cướp nào. Hàng rời xe ở Phan Rí khi máy phá sóng đang chạy. Ai bày anh?]
    Anh Đạt gục đầu. Hai bàn tay thôi xoa cổ tay.
    "Tui nợ cá độ hơn hai trăm triệu, tụi nó tới tận nhà. Người ta nói chỉ cần chạy vô kho Phan Rí, ngồi yên một tiếng, rồi tới Hàm Thuận Nam để người ta trói."
    "Hàng có bảo hiểm thì An Tín đền cho ông Tài. Không ai mất gì hết."
    {has_P11 || has_P7: "Bà Kiều. Bả biểu tui giữ lại sợi chì dự phòng. Hai trăm rưỡi đó là tiền công, đâu phải tiền hụi." | "Người đó tui không dám nói tên. Nói ra nhà tui không yên."}
    -> hoi
* [Vậy được rồi.]
    -> END

=== doi_cuop ===
Anh Đạt nhìn bạn, chờ xem bạn có tin không.
+ {has_H4 && has_P8} [Băng keo quấn lỏng ba vòng ngoài tay áo khoác, cổ tay anh không hằn một vết. Người bị trói thật không như vậy.]
    Anh Đạt rụt tay vào túi áo.
    "Tui... tui đâu có giãy. Dao kề cổ ai mà dám giãy."
    Không giãy thì băng keo vẫn phải quấn vào da, không phải ngoài tay áo.
    ~ vo_cuop = true
    -> hoi
+ {has_H5 && has_X9} [Ba vụ cướp tháng 10 trên khúc đó, tài xế nào cũng bị lấy điện thoại và tiền. Bọn cướp của anh để lại 4,2 triệu.]
    Anh Đạt sờ túi áo khoác như để chắc là ví vẫn còn.
    "Tụi nó... chắc tụi nó chỉ cần hàng."
    Đúng nhóm đó thì chưa bao giờ lấy hàng. Còn nhóm của anh thì không lấy gì khác.
    ~ vo_cuop = true
    -> hoi
+ {has_H6} [Container phanh gấp phải để lại vệt lốp dài cả chục mét. Mặt đường không có vệt nào.]
    "Thì... tui thấy xa xa nên rà rà lại. Tối quá nhớ gì đâu."
    Một vệt phanh thiếu thì giải thích được. Cần thêm chỗ hở khác.
    -> hoi
+ {has_H5 && not has_X9} [Cướp xe mà để lại cho anh điện thoại với hơn bốn triệu?]
    "Tụi nó chỉ cần hàng. Chắc tụi nó thương tui."
    -> hoi
+ {has_H11} [Quanh container có dấu giày của nhiều người.]
    "Đó, tụi cướp chứ ai. Ba thằng lận mà."
    Anh Đạt hăng lên hẳn. Bạn vừa đưa cho anh một chỗ dựa.
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_song ===
+ {has_P4} [Máy phá sóng chạy từ 23:52, gần ba tiếng trước khi "bọn cướp" xuất hiện lúc 02:40. Lúc đó anh đang lái.]
    Anh Đạt im lặng rất lâu.
    "Tui... tui không để ý định vị."
    Xe mất sóng hơn một tiếng ở Phan Rí, rồi có sóng lại đúng chỗ cũ. Người lái không thể không biết mình dừng ở đâu.
    ~ vo_song = true
    -> hoi
+ {has_P5} [Qua trạm Sông Lũy lúc 01:58, xe anh chỉ còn nặng 14,5 tấn.]
    "{Xco} hỏi ông Tài đi. Tui chỉ là thằng lái xe. Hàng ổng chất bao nhiêu tui đâu có cân."
    Phiếu cân cho biết hàng mất lúc nào, nhưng chưa trói được anh vào cái máy phá sóng.
    -> hoi
+ [Máy giấu dưới ghế phụ. Chỉ người ngồi trong cabin mới cắm được.]
    "Thằng Phúc ngồi ghế phụ đó {xco}. Đâu phải tui."
    -> hoi
