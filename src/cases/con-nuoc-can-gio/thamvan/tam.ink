VAR has_X4 = false
VAR has_H8 = false
VAR has_H9 = false
VAR has_H10 = false
VAR has_P5 = false
VAR has_P8 = false
VAR has_P9 = false
VAR has_P10 = false
VAR has_P11 = false
VAR has_H11 = false
VAR vo_dem = false
VAR vo_sau = false

Ông Sáu Tâm ngồi xổm ở mép cầu tàu, cuốn điếu thuốc rê bằng giấy quyến.
"Tôi theo anh Lực mười hai năm. Tôi còn đau hơn ai hết."
-> hoi

=== hoi ===
* [Đêm 9/9 anh ở đâu?]
    "Ngủ ở chòi ngoài bến từ chín giờ. Năm giờ sáng thấy ghe chưa về, tôi chèo xuồng đi tìm."
    "Đến Vàm Sát thì thấy ghe úp. Tôi chụp ảnh gửi chị Hồng ngay, đây này." #photo:X4
    -> doi_dem
* [Anh Lực có hay mặc áo phao không?]
    "Anh ấy ghét cái áo ấy lắm, bảo mặc vào nóng. Mười hai năm tôi chưa thấy anh ấy mặc lần nào."
    -> hoi
* [Theo anh, sao ghe lại úp?]
    "Ghe cũ, lỗ thoát nước hay lỏng. Đêm tối lỡ giẫm phải cái nút là nước vào ngay."
    "Hoặc có ai phá. Thằng Khang dọa anh ấy ghê lắm, {xco} đi mà hỏi nó."
    -> hoi
* {has_H11} [Mạn ghe có vết sơn xanh, như bị ghe khác cặp sát.]
    "Ghe thằng Vinh đấy. Tháng 7 nó cặp mạn chuyển tôm, cọ xước một đường. Anh Lực còn chửi nó."
    "Vết cũ rồi, hà bám đầy kia kìa."
    -> hoi
* {has_P9} [Camera phà Bình Khánh thấy anh qua phà lúc 02:16, chở một thùng xốp.]
    Ông Tâm dụi điếu thuốc đang hút dở.
    "Thằng con tôi nằm viện trên thành phố. Tôi mang đồ ăn lên cho nó."
    Hai giờ sáng, mang đồ ăn bằng thùng xốp, rồi bốn giờ bốn mốt đã quay về. Ông không nói gì thêm.
    -> hoi
* {vo_dem} [Anh chờ ở Rạch Đước, anh Lực đến. Rồi sao?]
    "Anh ấy đến, lấy ba lô, lên xe tôi chở ra đường lớn. Rồi anh ấy đi Châu Đốc. Tôi về."
    "Anh ấy chết đuối ở đâu tôi làm sao biết. Chắc anh ấy quay lại lấy gì đó."
    -> doi_sau
* {vo_dem && vo_sau} [Anh Lực chết ở Rạch Đước, trước khi xuống nước. Chỉ có anh ở đó.]
    Bàn tay ông Tâm run lên. Điếu thuốc rơi xuống ván cầu tàu.
    "Anh ấy nợ tôi tám tháng lương. Thằng con cần mổ tim. Anh ấy ôm hết vàng đi, bỏ bọn tôi lại cho chủ nợ."
    "Tôi chỉ định lấy phần của tôi. Anh ấy giằng lại cái ba lô. Cây sào nó gãy..."
    "Tôi kéo anh ấy xuống nước, để con nước ròng đưa ra biển. Tôi tưởng ai cũng sẽ nghĩ anh ấy chết đuối."
    -> hoi
* [Thế được rồi.]
    -> END

=== doi_dem ===
Ông Tâm nhìn bạn, chờ.
+ {has_P8} [Số máy lạ gọi anh lúc 23:47 và 00:21, máy anh bắt trạm Rạch Đước. Anh không ngủ ở chòi.]
    Ông Tâm rít một hơi dài.
    "...Ừ. Anh Lực bảo tôi ra Rạch Đước chờ. Tôi không muốn nói vì sợ chị Hai buồn."
    ~ vo_dem = true
    -> hoi
+ {has_P10} [Anh Lực nhắn anh "Mày chờ ở Rạch Đước". Anh không ngủ ở chòi.]
    Ông Tâm im một lúc lâu, rồi gật đầu.
    "Chị Hai không biết gì cả. Anh ấy dặn kỹ lắm, bảo bà ấy mà biết là bà ấy không chịu."
    "Tôi ra Rạch Đước chờ anh ấy thật."
    ~ vo_dem = true
    -> hoi
+ {has_X4 && has_H9} [Ủng anh trong ảnh dính bùn đỏ. Bùn đỏ chỉ có ở Rạch Đước, từ bến lên Vàm Sát toàn bùn xám.]
    Ông Tâm nhìn xuống chân, rồi nhìn ra sông.
    "...Tôi có qua Rạch Đước. Anh Lực hẹn."
    ~ vo_dem = true
    -> hoi
+ {has_X4 && not has_H9} [Ủng anh trong ảnh dính bùn đỏ.]
    "Bùn nào chẳng là bùn. Tôi lội khắp nơi, {xco} biết thế nào được."
    Phải biết bùn đỏ ấy từ đâu ra thì mới bắt bẻ được.
    -> hoi
+ {has_H8} [Ở Rạch Đước có năm mẩu thuốc rê cuốn giấy quyến. Anh cũng hút thuốc rê.]
    "Dân ở đây ai chẳng hút thuốc rê. {Xco} đi hỏi mà xem."
    Ông rít một hơi dài, khói bay về phía bạn. Một thói quen chung cả xóm không buộc được ai.
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_sau ===
+ {has_P11} [Ba lượng vàng anh bán ở Quận 8 mang số sê-ri của hiệu vàng Kim Hưng, trong lô anh Lực mua ngày 8/9.]
    Ông Tâm cúi gằm.
    "Anh ấy... anh ấy cho tôi. Tiền công."
    Cho vàng rồi bỏ đi Châu Đốc, mà vé xe vẫn bỏ trống ghế A7.
    ~ vo_sau = true
    -> hoi
+ {has_P5 && has_H10} [Anh Lực không chết đuối. Sau gáy có vết nứt do vật tày dạng thanh tròn, và ở Rạch Đước có nửa cây sào mới gãy.]
    Ông Tâm nhìn chằm chằm mặt nước.
    "Sào tôi gãy lúc chống xuồng. Chuyện thường."
    Nhưng ông không còn nói anh Lực "lên xe ra đường lớn" nữa.
    ~ vo_sau = true
    -> hoi
+ {has_P5 && not has_H10} [Anh Lực chết trước khi xuống nước.]
    "Thế thì ai đánh anh ấy, chứ có phải tôi đâu. Tôi về rồi."
    Không có vật gây ra vết thương thì chưa ép được ông.
    -> hoi
+ [Anh nói dối. Anh Lực không lên xe anh.]
    "{Xco} có thấy đâu mà nói."
    -> hoi
