VAR has_P7 = false
VAR has_P8 = false
VAR has_X4 = false

Bảo mặc sơ mi trắng, tay cầm sẵn tập hóa đơn photo.
"{Xchi} cần giấy tờ gì em đưa liền."
-> hoi

=== hoi ===
* [Đêm 14/7 em ở đâu?]
    "Em hát karaoke với bạn từ 1 giờ tới sáng. {Xchi} hỏi tụi nó là biết."
    "Nè, hình em gửi trong nhóm đêm đó nè {xchi}." #photo:X4
    ~ has_X4 = true
    -> hoi
* {has_P7} [Grab đón em lúc 01:34 ở đầu hẻm kho. Em làm gì ở đó?]
    Bảo cười, hơi lâu.
    "Em... ghé lấy cái sạc quên ở kho. Rồi đi liền."
    -> hoi
* {has_X4} [Phiếu phòng trong ảnh ghi giờ vào 02:05. Sao em nói hát từ 1 giờ?]
    Bảo đẩy gọng kính.
    "Thì em tới trễ chút... kẹt xe. Mà em ở đó tới sáng thiệt mà {xchi}."
    -> hoi
* {has_P8} [Công ty Hưng Long là của ai?]
    "Nhà cung cấp quen thôi {xchi}. Em không rành giấy tờ bên đó."
    -> hoi
* [Vậy được rồi.]
    -> END
