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
"{Xchi} cần giấy tờ gì em đưa ngay ạ."
-> hoi

=== hoi ===
* [Đêm 14/7 em ở đâu?]
    "Em hát karaoke với bạn từ 1 giờ đến sáng. {Xchi} hỏi bọn nó là biết."
    "Đây, ảnh em gửi trong nhóm đêm đấy này {xchi}." #photo:X4
    -> hoi
* [Em nghĩ ai làm?]
    "Em không dám nói bừa... Nhưng chị Ngân từng dọa trên mạng. Với lại dạo này chú Thịnh kẹt tiền lắm {xchi} ạ."
    Bảo trả lời trước khi bạn hỏi xong, như đã chuẩn bị sẵn.
    -> hoi
* {has_H8} [Ở cửa hông có cái bật lửa "Ngân Store".]
    "Đấy, em nói rồi mà {xchi}. Chị Ngân thuộc đường trong kho lắm."
    + + {has_X1 || has_X5} [Ngân livestream liên tục từ 00:58 đến 03:05, hai trăm người xem.]
        Bảo đẩy gọng kính.
        "Thì... chắc chị ấy nhờ ai làm. Em có nói chắc đâu."
        Anh rút lại nhanh, nhưng vẫn chưa chịu nói thêm gì về mình.
        -> hoi
    + + [Ừ, để tôi hỏi Ngân.]
        "Vâng, {xchi} hỏi kỹ hộ em."
        -> hoi
* {has_X10} [Ngân tố em ghi khống sáu công nhân để ăn lương.]
    "Chị ấy bị đuổi nên thù em. Đơn bị trả về rồi mà {xchi}, vì chẳng có gì cả."
    -> hoi
* {has_P7} [Grab đón em lúc 01:34 ở đầu hẻm kho. Em làm gì ở đó?]
    Bảo cười, hơi lâu.
    "Em qua lấy cái sạc để quên ở kho. Vào ra năm phút rồi đi hát luôn."
    -> doi_sac
* {has_P12} [Sáng 15 em chuyển cho chú Rô 5 triệu.]
    "Chú Tư bị ngạt khói, em gửi chú tiền thuốc. Thế mà cũng nghi em à {xchi}?"
    -> doi_tien
* {has_P8} [Công ty Hưng Long là của ai?]
    "Nhà cung cấp quen thôi {xchi}. Em không rõ giấy tờ bên đó."
    -> doi_hl
* {vo_gio && (vo_tien || vo_hl)} [Em ở kho từ 01:02, em ngồi với chú Rô, và em có lý do sợ kiểm kê. Nói thật đi.]
    Bảo tháo kính, gập lại, đặt lên tập hóa đơn. Tay anh run.
    "Chú Thịnh hủy rồi. Nhưng ngày 16 ngân hàng kiểm kê, người ta sẽ soát sổ, soát đến Hưng Long. Sáu trăm hai mươi triệu {xchi} ạ."
    "Em chuốc chú Tư say. Một giờ em vào văn phòng tháo ổ cứng, đặt khoanh hương muỗi lên giẻ. Em tính chỉ cháy văn phòng thôi, ai ngờ nó lan ra hết."
    "Em chỉ muốn cái sổ sách đó biến mất."
    -> hoi
* [Thế được rồi.]
    -> END

=== doi_sac ===
Bảo chờ bạn nói tiếp, ngón tay miết mép tập giấy.
+ {has_X4} [Phiếu phòng trong ảnh ghi giờ vào 02:05. Sao em nói hát từ 1 giờ?]
    "Thì em qua kho lấy sạc trước, rồi mới đến. Em nói nhầm giờ thôi {xchi}, em có chối đâu."
    Anh sửa giờ rất nhanh. Câu chuyện năm phút vẫn đứng vững.
    -> hoi
+ {has_P6 && has_P11} [Camera cửa hàng anh Huy: chiếc Wave em mua của Ngân vào hẻm 01:02, ra 01:21. Không phải năm phút.]
    Bảo đẩy gọng kính, không cười nữa.
    "Xe đó... em cho bạn mượn mấy hôm nay."
    Bạn mượn xe của anh, vào đúng con hẻm đó, đúng giờ ngòi hương được châm. Rồi mười ba phút sau Grab đón chính anh ở đầu hẻm.
    ~ vo_gio = true
    -> hoi
+ {has_P6 && not has_P11} [Camera cửa hàng anh Huy thấy một chiếc Wave che biển số vào hẻm lúc 01:02.]
    "Wave thì Sài Gòn có mấy triệu chiếc {xchi}. Ai biết xe của ai."
    Không biết chiếc xe đó của ai thì Bảo vẫn còn đường lùi.
    -> hoi
+ [Không ai đi lấy cái sạc lúc 1 giờ sáng.]
    "Em đi đấy. Điện thoại hết pin thì sao gọi Grab được {xchi}?"
    -> hoi

=== doi_tien ===
+ {has_H6} [Tiền thuốc mà ghi "chú Tư uống cà phê"? Đêm đó trong chòi có hai cái chén và chai rượu Mỏ Cày.]
    Bảo cúi xuống tập hóa đơn.
    "Em có qua uống với chú Tư một tí... lúc chín giờ. Rồi em về. Em sợ {xchi} nghi nên không nói."
    Anh vừa thừa nhận có mặt ở kho đêm đó, điều anh giấu từ đầu.
    ~ vo_tien = true
    -> hoi
+ [5 triệu là tiền bịt miệng.]
    "Bịt miệng chuyện gì {xchi}? Chú Tư là người quen nhà em mà."
    -> hoi

=== doi_hl ===
+ {has_H6} [Người đứng tên Hưng Long quê Mỏ Cày, cùng họ Phan với em. Chai rượu trong chòi cũng là rượu Mỏ Cày.]
    Bảo cởi kính ra lau, lau rất lâu.
    "Mẹ em."
    "Mẹ em chỉ đứng tên hộ thôi. Hàng có giao thật mà {xchi}... một phần."
    ~ vo_hl = true
    -> hoi
+ [Hưng Long là công ty ma.]
    "Có mã số thuế đàng hoàng, {xchi} tra rồi còn gì."
    -> hoi
