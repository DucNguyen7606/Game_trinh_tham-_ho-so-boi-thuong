VAR has_H4 = false
VAR has_X1 = false
VAR has_P7 = false
VAR has_P4 = false

Chị Liên mở cuốn sổ chăm sóc trên đùi, lật tới trang có dán băng keo đánh dấu.
"Bác Hiển uống thuốc còn đúng giờ hơn đồng hồ. {Xchi} cần ngày nào tôi đọc ngày đó."
-> hoi

=== hoi ===
* [Chiều 9/3 ông Hiển ra sao?]
    "Khỏe, tỉnh táo. Bác ngồi bàn vẽ cả chiều. 17 giờ 30 tôi bưng cháo lên, 17 giờ 45 bác ăn hết. 18 giờ 05 tôi về."
    -> hoi
* [Ai chia thuốc cho ông?]
    "Tôi chia vào hộp bảy ngày mỗi tối Chủ nhật. Sáng với trưa tôi đưa tận tay. Cữ 21 giờ bác tự uống, chưa bao giờ quên, hai năm tôi ghi sổ đủ."
    -> hoi
* {has_H4} [Ô thuốc "T2 · Tối 21:00" vẫn còn nguyên.]
    Chị Liên đặt cuốn sổ xuống.
    "Vậy là bác không còn tới 9 giờ. Bác mà còn thở thì đã uống rồi."
    -> hoi
* {has_X1} [Bệnh án ghi ông suy tim, dễ chóng mặt té ngã.]
    "Suy tim độ II thôi, thuốc đều thì ổn. Bác đi cầu thang chậm, tay luôn vịn. Hai năm tôi chưa thấy bác chóng mặt lần nào."
    -> hoi
* {has_P7} [Hai bắp tay ông có vết bầm hình ngón tay.]
    "Không phải tôi. Tôi dìu bác thì đỡ dưới nách, không bao giờ nắm bắp tay. Chiều đó tay bác còn sạch, tôi đo huyết áp ở tay trái mà."
    -> hoi
* {has_P4} [Pháp y nói cháo trong dạ dày ông mới tiêu một phần.]
    "Bác ăn xong lúc 17 giờ 45. Vậy chắc bác mất chừng một, hai tiếng sau đó, chứ đâu tới gần nửa đêm."
    -> hoi
* [Cảm ơn chị.]
    -> END
