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
"Dao kề cổ, tôi còn sống là may rồi {xco} ơi."
-> hoi

=== hoi ===
* [Kể lại đêm 2/11 cho tôi nghe.]
    "Đóng hàng xong ba rưỡi chiều thì chạy. Mười giờ rưỡi dừng ở quán cơm Cà Ná, tôi còn chụp ảnh với xe đây này." #photo:X3
    "Hai giờ bốn mươi, qua khỏi Phan Thiết, một chiếc bảy chỗ tạt đầu. Ba thằng bịt mặt, cầm dao. Bọn nó trói tôi quăng xuống lề rồi lái xe đi."
    "Tháng trước đoạn ấy bị cướp mấy vụ rồi, ai chạy đêm cũng biết."
    -> doi_cuop
* [Phụ xe Phúc đâu? Sao anh chạy một mình?]
    "Thằng bé xin xuống Phan Rang thăm người yêu. Tôi thương nó nên cho xuống."
    -> hoi
* {has_X10} [Bà Kiều chuyển cho Phúc 5 triệu ngày 1/11. Phúc có dính vào không?]
    "Thằng ấy ứng lương suốt. Nó mà dính thì đã chẳng xuống xe."
    Anh trả lời nhanh, không đẩy tội sang Phúc dù có cơ hội.
    -> hoi
* {has_H7} [Sợi chì dự phòng 55190 Đất Đỏ giao anh giữ. Nó nằm trên cửa container bị cắt ở Hàm Tân.]
    "Tôi... đánh rơi đâu mất rồi. Chì thì ai nhặt chẳng được."
    Anh Đạt nói mà không nhìn lên.
    -> hoi
* {has_H3} [Trong cabin có máy phá sóng định vị cắm ở ổ tẩu.]
    "Cái gì? Tôi không biết. Chắc bọn cướp gắn vào."
    -> doi_song
* {has_P11} [Ngày 4/11 bà Kiều chuyển 250 triệu cho vợ anh.]
    "Tiền hụi. Vợ tôi chơi hụi với bà ấy mấy năm nay."
    Nội dung chuyển khoản đúng là "tra tien hui". Một câu trả lời có giấy tờ đỡ lưng.
    -> hoi
* {vo_cuop && vo_song} [Không có vụ cướp nào. Hàng rời xe ở Phan Rí khi máy phá sóng đang chạy. Ai bày anh?]
    Anh Đạt gục đầu. Hai bàn tay thôi xoa cổ tay.
    "Tôi nợ cá độ hơn hai trăm triệu, bọn nó đến tận nhà. Người ta bảo chỉ cần chạy vào kho Phan Rí, ngồi yên một tiếng, rồi đến Hàm Thuận Nam để người ta trói."
    "Hàng có bảo hiểm thì An Tín đền cho ông Tài. Chẳng ai mất gì cả."
    {has_P11 || has_P7: "Bà Kiều. Bà ấy bảo tôi giữ lại sợi chì dự phòng. Hai trăm rưỡi ấy là tiền công, chứ có phải tiền hụi đâu." | "Người đó tôi không dám nói tên. Nói ra nhà tôi không yên."}
    -> hoi
* [Thế được rồi.]
    -> END

=== doi_cuop ===
Anh Đạt nhìn bạn, chờ xem bạn có tin không.
+ {has_H4 && has_P8} [Băng dính quấn lỏng ba vòng ngoài tay áo khoác, cổ tay anh không hằn một vết. Người bị trói thật không như thế.]
    Anh Đạt rụt tay vào túi áo.
    "Tôi... tôi có giãy đâu. Dao kề cổ ai mà dám giãy."
    Không giãy thì băng dính vẫn phải quấn vào da, không phải ngoài tay áo.
    ~ vo_cuop = true
    -> hoi
+ {has_H5 && has_X9} [Ba vụ cướp tháng 10 trên đoạn đó, tài xế nào cũng bị lấy điện thoại và tiền. Bọn cướp của anh để lại 4,2 triệu.]
    Anh Đạt sờ túi áo khoác như để chắc là ví vẫn còn.
    "Bọn nó... chắc bọn nó chỉ cần hàng."
    Đúng nhóm đó thì chưa bao giờ lấy hàng. Còn nhóm của anh thì không lấy gì khác.
    ~ vo_cuop = true
    -> hoi
+ {has_H6} [Container phanh gấp phải để lại vệt lốp dài cả chục mét. Mặt đường không có vệt nào.]
    "Thì... tôi thấy xa xa nên giảm dần. Tối quá nhớ gì đâu."
    Một vệt phanh thiếu thì giải thích được. Cần thêm chỗ hở khác.
    -> hoi
+ {has_H5 && not has_X9} [Cướp xe mà để lại cho anh điện thoại với hơn bốn triệu?]
    "Bọn nó chỉ cần hàng. Chắc bọn nó thương tôi."
    -> hoi
+ {has_H11} [Quanh container có dấu giày của nhiều người.]
    "Đấy, bọn cướp chứ ai. Những ba thằng cơ mà."
    Anh Đạt hăng hẳn lên. Bạn vừa đưa cho anh một chỗ dựa.
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_song ===
+ {has_P4} [Máy phá sóng chạy từ 23:52, gần ba tiếng trước khi "bọn cướp" xuất hiện lúc 02:40. Lúc đó anh đang lái.]
    Anh Đạt im lặng rất lâu.
    "Tôi... tôi không để ý định vị."
    Xe mất sóng hơn một tiếng ở Phan Rí, rồi có sóng lại đúng chỗ cũ. Người lái không thể không biết mình dừng ở đâu.
    ~ vo_song = true
    -> hoi
+ {has_P5} [Qua trạm Sông Lũy lúc 01:58, xe anh chỉ còn nặng 14,5 tấn.]
    "{Xco} hỏi ông Tài đi. Tôi chỉ là thằng lái xe. Hàng ông ấy chất bao nhiêu tôi có cân đâu."
    Phiếu cân cho biết hàng mất lúc nào, nhưng chưa trói được anh vào cái máy phá sóng.
    -> hoi
+ [Máy giấu dưới ghế phụ. Chỉ người ngồi trong cabin mới cắm được.]
    "Thằng Phúc ngồi ghế phụ đấy {xco}. Có phải tôi đâu."
    -> hoi
