VAR has_P6 = false
VAR has_P7 = false
VAR has_P8 = false
VAR has_P11 = false
VAR has_P12 = false
VAR has_H6 = false
VAR has_H8 = false
VAR has_X1 = false
VAR has_X4 = false
VAR has_X5 = false
VAR has_X10 = false
VAR vo_gio = false
VAR vo_tien = false
VAR vo_hl = false

Bảo mặc sơ mi trắng, tay cầm sẵn tập hóa đơn photo.
"{Xchi} cần giấy tờ gì em đưa liền."
-> hoi

=== hoi ===
* [Đêm 14/7 em ở đâu?]
    "Em hát karaoke với bạn từ 1 giờ tới sáng. {Xchi} hỏi tụi nó là biết."
    "Nè, hình em gửi trong nhóm đêm đó nè {xchi}." #photo:X4
    -> hoi
* [Em nghĩ ai làm?]
    "Em không dám nói bậy... Mà chị Ngân từng hăm trên mạng. Với lại dạo này chú Thịnh kẹt tiền dữ lắm {xchi}."
    Bảo trả lời trước khi bạn hỏi xong, như đã chuẩn bị sẵn.
    -> hoi
* {has_H8} [Ở cửa hông có cái bật lửa "Ngân Store".]
    "Đó, em nói rồi mà {xchi}. Chị Ngân biết đường trong kho rành lắm."
    + + {has_X1 || has_X5} [Ngân livestream liên tục từ 00:58 tới 03:05, hai trăm người coi.]
        Bảo đẩy gọng kính.
        "Thì... chắc chỉ nhờ ai làm. Em đâu nói chắc."
        Anh rút lại nhanh, nhưng vẫn chưa chịu nói thêm gì về mình.
        -> hoi
    + + [Ừ, để tôi hỏi Ngân.]
        "Dạ, {xchi} hỏi kỹ giùm em."
        -> hoi
* {has_X10} [Ngân tố em ghi khống sáu công nhân để ăn lương.]
    "Chị đó bị đuổi nên thù em. Đơn bị trả về rồi mà {xchi}, vì không có gì hết."
    -> hoi
* {has_P7} [Grab đón em lúc 01:34 ở đầu hẻm kho. Em làm gì ở đó?]
    Bảo cười, hơi lâu.
    "Em ghé lấy cái sạc quên ở kho. Vô ra năm phút rồi đi hát liền."
    -> doi_sac
* {has_P12} [Sáng 15 em chuyển cho chú Rô 5 triệu.]
    "Chú Tư bị ngạt khói, em gửi chú tiền thuốc. Vậy cũng nghi em sao {xchi}?"
    -> doi_tien
* {has_P8} [Công ty Hưng Long là của ai?]
    "Nhà cung cấp quen thôi {xchi}. Em không rành giấy tờ bên đó."
    -> doi_hl
* {vo_gio && (vo_tien || vo_hl)} [Em ở kho từ 01:02, em ngồi với chú Rô, và em có lý do sợ kiểm kê. Nói thật đi.]
    Bảo tháo kính, gập lại, đặt lên tập hóa đơn. Tay anh run.
    "Chú Thịnh hủy rồi. Nhưng ngày 16 ngân hàng kiểm kê, người ta sẽ dò sổ, dò tới Hưng Long. Sáu trăm hai chục triệu {xchi}."
    "Em chuốc chú Tư say. Một giờ em vô văn phòng tháo ổ cứng, đặt khoanh nhang lên giẻ. Em tính lửa cháy văn phòng thôi, ai ngờ nó lan ra hết."
    "Em chỉ muốn cái sổ sách đó biến mất."
    -> hoi
* [Vậy được rồi.]
    -> END

=== doi_sac ===
Bảo chờ bạn nói tiếp, ngón tay miết mép tập giấy.
+ {has_X4} [Phiếu phòng trong ảnh ghi giờ vào 02:05. Sao em nói hát từ 1 giờ?]
    "Thì em ghé kho lấy sạc trước, rồi mới tới. Em nói lộn giờ thôi {xchi}, em có chối đâu."
    Anh sửa giờ rất nhanh. Câu chuyện năm phút vẫn đứng.
    -> hoi
+ {has_P6 && has_P11} [Camera tiệm Huy: chiếc Wave em mua của Ngân vào hẻm 01:02, ra 01:21. Không phải năm phút.]
    Bảo đẩy gọng kính, không cười nữa.
    "Xe đó... em cho bạn mượn mấy bữa nay."
    Bạn mượn xe của anh, vào đúng con hẻm đó, đúng giờ ngòi nhang được châm. Rồi mười ba phút sau Grab đón chính anh ở đầu hẻm.
    ~ vo_gio = true
    -> hoi
+ {has_P6 && not has_P11} [Camera tiệm Huy thấy một chiếc Wave che biển số vào hẻm lúc 01:02.]
    "Wave thì Sài Gòn mấy triệu chiếc {xchi}. Xe ai đâu có biết."
    Không biết chiếc xe đó của ai thì Bảo còn đường lùi.
    -> hoi
+ [Không ai đi lấy cái sạc lúc 1 giờ sáng.]
    "Em đi đó. Điện thoại hết pin thì sao gọi Grab {xchi}?"
    -> hoi

=== doi_tien ===
+ {has_H6} [Tiền thuốc mà ghi "chú Tư uống cà phê"? Đêm đó trong chòi có hai cái ly và chai rượu Mỏ Cày.]
    Bảo cúi xuống tập hóa đơn.
    "Em có ghé chú Tư uống chút... hồi chín giờ. Rồi em về. Em sợ {xchi} nghi nên không nói."
    Anh vừa thừa nhận có mặt ở kho đêm đó, điều anh giấu từ đầu.
    ~ vo_tien = true
    -> hoi
+ [5 triệu là tiền bịt miệng.]
    "Bịt miệng chuyện gì {xchi}? Chú Tư là người quen nhà em mà."
    -> hoi

=== doi_hl ===
+ {has_H6} [Đại diện Hưng Long là bà Phan Thị Lựu, quê Mỏ Cày. Chai rượu trong chòi cũng rượu Mỏ Cày. Em cũng họ Phan.]
    Bảo cởi kính ra lau, lau rất lâu.
    "Mẹ em."
    "Mẹ em đứng tên giùm thôi. Hàng có giao thiệt mà {xchi}... có một phần."
    ~ vo_hl = true
    -> hoi
+ [Hưng Long là công ty ma.]
    "Có mã số thuế đàng hoàng, {xchi} tra rồi mà."
    -> hoi
