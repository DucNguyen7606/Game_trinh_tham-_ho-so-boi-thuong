VAR has_X1 = false
VAR has_X4 = false
VAR has_P1 = false
VAR has_P3 = false
VAR has_P7 = false
VAR has_P8 = false
VAR has_P9 = false
VAR has_H3 = false
VAR has_H4 = false
VAR has_H8 = false
VAR has_P10 = false
VAR vo_alibi = false
VAR vo_ketqua = false
VAR vo_tien = false

Ngọc ôm chặt túi xách, mắt còn thâm vì thiếu ngủ.
"Em mà biết vụ này thì em đâu đi chơi tới sáng."
-> hoi

=== hoi ===
* [Đêm 19/11 em ở đâu?]
    "Bùi Viện với tụi bạn, tới gần 3 giờ. Hình nè {xchi}." #photo:X4
    -> doi_alibi
* [Sáng 20 em phát hiện thế nào?]
    "7 giờ 40 em mở cửa trước, thấy khung trống. Em chạy ra sau thì cửa bị cạy. Em gọi chị Diệp trước rồi mới gọi công an."
    "Chị Diệp tới nhanh lắm, mười phút là tới. Mặt chị bình tĩnh lạ."
    -> hoi
* {has_X1} [Em hỏi bảo hiểm "tranh mất thì được trả bao nhiêu". Sao vậy?]
    Ngọc đỏ mặt.
    "Chị Diệp sai em hỏi. Chị nói để chuẩn bị giấy tờ cho phiên đấu giá."
    + + {has_P1} [Hợp đồng nằm trong tủ bà Diệp, ghi rõ 8 tỷ. Bà cần gì phải nhờ em hỏi?]
        Ngọc cắn môi.
        "Thì... em hỏi cho chắc. Em đâu biết chị có hợp đồng."
        Quản lý phòng tranh ba năm mà không biết hợp đồng bảo hiểm nằm đâu.
        -> hoi
    + + [Được.]
        -> hoi
* {has_P3 || has_H3} [Em có biết mã báo động và mật khẩu máy tính của bà Diệp không?]
    "Biết. Nhưng em có mã riêng mà, em xài mã của chị làm gì cho bị nghi?"
    -> hoi
* {has_H8} [Dấu giày trong hẻm là giày bệt cỡ 36.]
    Ngọc rụt chân vào gầm ghế. Đôi giày bệt màu đen của cô còn dính vệt bùn khô ở mũi.
    "Con gái Sài Gòn nửa thành phố đi cỡ 36 đó {xchi}."
    -> hoi
* {has_P9} [Kết quả xét nghiệm mẫu sơn gửi về hộp thư của em ngày 14/10.]
    Ngọc nuốt khan.
    "Em... em tưởng phòng thí nghiệm làm sai. Em tính hỏi lại rồi mới báo chị Diệp. Rồi em quên."
    -> doi_ketqua
* {has_P10} [Ngày 16/10 và 20/11, anh Quân chuyển cho em tổng cộng 300 triệu.]
    "Anh Quân cho em mượn trả nợ thẻ. Ảnh tốt với em lắm."
    -> doi_tien
* {vo_alibi && vo_tien} [Em không ở Bùi Viện lúc 01:38, và tiền của Quân không phải tiền cho mượn. Kể lại đi.]
    Ngọc ngồi im rất lâu, rồi bật khóc.
    "Em gọi anh Quân hỏi vì sao sơn là acrylic. Ảnh nói nếu chuyện lộ ra thì ảnh tù, còn em mất việc vì giữ kết quả không báo."
    "Ảnh nói chỉ cần bức đó biến mất trước ngày 21. Chị Diệp có bảo hiểm, chị không mất gì hết."
    "Em quấn khăn của chị, lấy xe của chị, bấm mã của chị... để camera có thấy thì cũng tưởng là chị. Em xin lỗi."
    -> hoi
* [Cảm ơn em.]
    -> END

=== doi_alibi ===
Ngọc chìa điện thoại ra, chờ bạn gật đầu.
+ {has_X4} [Story đăng lúc 01:35, nhưng đồng hồ LED trên quầy bar trong ảnh chỉ 00:14.]
    Ngọc kéo điện thoại về.
    "Em chụp trước, lúc sau mới đăng. Mạng ở đó chập chờn. Em vẫn ở đó tới 3 giờ mà."
    Không còn tấm ảnh nào cho thấy cô ở Bùi Viện sau 00:14.
    ~ vo_alibi = true
    -> hoi
+ {has_P7} [Camera Đồng Khởi thấy chiếc Vespa xanh ngọc của phòng tranh vào hẻm lúc 01:36.]
    "Xe chị Diệp mà {xchi}. Chị gửi ở phòng tranh, chìa trong hộc bàn. Ai cũng lấy được."
    Câu đó đúng. Chiếc xe không nói được ai cầm lái.
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_ketqua ===
+ {has_P8} [Hải Đăng hẹn lấy mẫu sơn ngày 21/11. Em giữ kết quả thì ngày 21 mọi chuyện cũng lộ. Em không quên.]
    Ngọc bóp chặt quai túi.
    "Em sợ. Em giữ nó một tháng không báo, chị Diệp biết là đuổi em liền."
    ~ vo_ketqua = true
    -> hoi
+ {has_H4} [Bản in kết quả nằm trong máy hủy giấy, kèm dải email "gửi Bảo Ngọc". Người quên thì không đem đi hủy.]
    Ngọc nhìn mấy dải giấy, không nói được gì một lúc.
    "Em... em hủy bản in. Em sợ chị thấy."
    ~ vo_ketqua = true
    -> hoi
+ [Em cố tình giấu bà Diệp.]
    "Em giấu để làm gì {xchi}? Em đâu được lợi gì."
    -> hoi

=== doi_tien ===
+ {has_P9} [Lần thứ nhất là 16/10, hai ngày sau khi kết quả về hộp thư em. Lần thứ hai là sáng 20/11, sau khi bức tranh biến mất.]
    Ngọc nhìn xuống, ngón tay vặn vẹo quai túi.
    "Trùng ngày thôi {xchi}..."
    Hai lần "trùng ngày", và cả hai lần đều là lúc bức tranh có chuyện.
    ~ vo_tien = true
    -> hoi
+ {has_X1} [Em đang nợ thẻ 180 triệu. Anh Quân cho mượn 300 triệu, dư ra làm gì?]
    "Thì em trả lãi, còn lại em để dành. Có gì sai đâu {xchi}?"
    -> hoi
+ [Cho mượn mà không có giấy nợ?]
    "Người quen mà {xchi}, giấy tờ chi."
    -> hoi
