VAR has_H4 = false
VAR has_X1 = false
VAR has_P7 = false
VAR has_P4 = false
VAR has_H10 = false

Chị Liên mở cuốn sổ chăm sóc trên đùi, lật tới trang có dán băng keo đánh dấu.
"Bác Hiển uống thuốc còn đúng giờ hơn đồng hồ. {Xchi} cần ngày nào tôi đọc ngày đó."
-> hoi

=== hoi ===
* [Chiều 13/4 ông Hiển ra sao?]
    "Tỉnh táo, nhưng hơi mệt. Bác ngồi bàn vẽ cả chiều. 17 giờ 30 tôi bưng cháo lên, 17 giờ 45 bác ăn hết. 18 giờ 05 tôi về."
    -> hoi
* [Ai chia thuốc cho ông?]
    "Tôi chia vào hộp bảy ngày mỗi tối Chủ nhật. Sáng với trưa tôi đưa tận tay. Cữ 21 giờ bác tự uống, chưa bao giờ quên, hai năm tôi ghi sổ đủ."
    -> hoi
* {has_H4} [Ô thuốc "T2 · Tối 21:00" vẫn còn nguyên.]
    Chị Liên đặt cuốn sổ xuống.
    "Vậy là bác không còn tới 9 giờ. Bác mà còn thở thì đã uống rồi."
    -> hoi
* {has_X1} [Bệnh án ghi ông suy tim, hẹn tái khám sáng 14/4.]
    "Tháng trước bác bị một cơn tức ngực ngay lúc ngồi vẽ, mặt tái mét. Tôi dặn bác thấy mệt là bấm chuông gọi cậu Khoa, rồi xin bác sĩ hẹn khám sớm."
    -> hoi
* {has_H10} [Trên bàn vẽ có nét chì kéo xệch, bút gãy rơi dưới ghế.]
    "Lần tức ngực tháng trước cũng vậy, bác làm rơi cây bút, tay ôm ngực. Lần đó bác qua được."
    -> hoi
* {has_P4} [Pháp y nói cháo trong dạ dày ông mới tiêu một phần.]
    "Bác ăn xong lúc 17 giờ 45. Vậy chắc bác mất chừng một, hai tiếng sau đó, chứ đâu tới gần nửa đêm."
    -> hoi
* {has_P7} [Pháp y nói ông mất khi đang ngồi, có vết hằn ngón tay dưới hai nách.]
    "Người ta muốn khiêng một người đã mất thì phải xốc dưới nách. Tôi làm nghề, tôi biết. Nhưng tối đó tôi về từ sáu giờ rồi {xchi}."
    -> hoi
* [Cảm ơn chị.]
    -> END
