VAR has_H7 = false
VAR has_P7 = false
VAR has_H6 = false
VAR has_P12 = false

Ông Sang ngồi thẳng lưng sau bàn sảnh, dãy màn hình camera nhấp nháy trước mặt.
"Qua sảnh này thì không ai lọt khỏi mắt tôi."
-> hoi

=== hoi ===
* [Đêm 20/12 có ai lạ vào tòa nhà không?]
    "Không ai hết. Sau 23 giờ chỉ có mấy cư dân về trễ, toàn người quen. Thang khách không ai lên tầng 27."
    -> hoi
* [Ngoài sảnh, còn đường nào lên các tầng?]
    "Thang hàng dưới hầm, quẹt thẻ nhân viên mới chạy. Bên kỹ thuật với vệ sinh mới có thẻ."
    -> hoi
* [Đêm đó ai trực kỹ thuật?]
    "Thằng Vũ. Khoảng 2 giờ nó gọi bộ đàm nói đi kiểm tra bơm. Nửa tiếng sau mới thấy nó về phòng."
    -> hoi
* {has_H7} [Camera hành lang tầng 27 bị xoay lên trần.]
    "Màn hình tầng 27 tối thui từ 2 giờ mấy. Tôi tưởng hư nên sáng mới báo kỹ thuật. Mà kỹ thuật ca đó cũng là thằng Vũ."
    -> hoi
* {has_H6} [Hành lang tầng 27 có dấu giày bảo hộ đế răng cưa.]
    "Giày đó là giày công ty phát cho bên kỹ thuật. Bảo vệ tụi tôi mang giày da."
    -> hoi
* {has_P7} [Thẻ KT-03 đi thang hàng lên tầng 27 lúc 02:09.]
    "KT-03 là thẻ ca đêm. Thằng Vũ ký nhận lúc gần 10 giờ tối, sáng mới trả."
    -> hoi
* {has_P12} [Tối 18/12 anh Bảo có tới tòa nhà?]
    Ông Sang lật cuốn sổ giao nhận dưới quầy.
    "Có. Nó gửi một thùng giấy cho cô Ngọc, tôi ký nhận lúc 19 giờ 50. Nó đứng ở quầy hút hết điếu thuốc rồi về."
    "Khách không có thẻ thì thang khách cũng không chạy. Nó không lên lầu được."
    -> hoi
* [Cảm ơn ông.]
    -> END
