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
"Tui theo anh Lực mười hai năm. Tui còn đau hơn ai hết."
-> hoi

=== hoi ===
* [Đêm 9/9 anh ở đâu?]
    "Ngủ ở chòi ngoài bến từ chín giờ. Năm giờ sáng thấy ghe chưa về, tui chạy xuồng đi kiếm."
    "Tới Vàm Sát thì thấy ghe úp. Tui chụp hình gửi chị Hồng liền nè." #photo:X4
    -> doi_dem
* [Anh Lực có hay mặc áo phao không?]
    "Ảnh ghét cái áo đó lắm, nói mặc vô nóng. Mười hai năm tui chưa thấy ảnh mặc lần nào."
    -> hoi
* [Theo anh, ghe sao mà úp?]
    "Ghe cũ, lù hay lỏng. Đêm tối lỡ đạp trúng cái nút là nước vô liền."
    "Hay ai đó phá. Thằng Khang hăm ảnh dữ lắm, {xco} đi hỏi nó."
    -> hoi
* {has_H11} [Mạn ghe có vết sơn xanh, như bị ghe khác cặp sát.]
    "Ghe thằng Vinh đó. Tháng 7 nó cặp mạn chuyển tôm, cọ trầy một đường. Anh Lực còn chửi nó."
    "Vết cũ rồi, hà bám đầy kìa."
    -> hoi
* {has_P9} [Camera phà Bình Khánh thấy anh qua phà lúc 02:16, chở một thùng xốp.]
    Ông Tâm dụi điếu thuốc đang hút dở.
    "Thằng nhỏ nhà tui nằm viện trên thành phố. Tui đem đồ ăn lên cho nó."
    Hai giờ sáng, đem đồ ăn bằng thùng xốp, rồi bốn giờ bốn mốt đã quay về. Ông không nói gì thêm.
    -> hoi
* {vo_dem} [Anh chờ ở Rạch Đước, anh Lực tới. Rồi sao?]
    "Ảnh tới, lấy ba lô, lên xe tui chở ra lộ. Rồi ảnh đi Châu Đốc. Tui về."
    "Ảnh chết đuối ở đâu tui đâu biết. Chắc ảnh quay lại lấy gì đó."
    -> doi_sau
* {vo_dem && vo_sau} [Anh Lực chết ở Rạch Đước, trước khi xuống nước. Chỉ có anh ở đó.]
    Bàn tay ông Tâm run lên. Điếu thuốc rơi xuống ván cầu tàu.
    "Ảnh nợ tui tám tháng lương. Thằng nhỏ cần mổ tim. Ảnh ôm hết vàng đi, bỏ tụi tui lại cho chủ nợ."
    "Tui chỉ tính lấy phần của tui. Ảnh giằng lại cái ba lô. Cây sào nó gãy..."
    "Tui kéo ảnh xuống nước, để con nước ròng đưa ảnh ra biển. Tui tưởng ai cũng sẽ nghĩ ảnh chết đuối."
    -> hoi
* [Vậy được rồi.]
    -> END

=== doi_dem ===
Ông Tâm nhìn bạn, chờ.
+ {has_P8} [Số máy lạ gọi anh lúc 23:47 và 00:21, máy anh bắt trạm Rạch Đước. Anh không ngủ ở chòi.]
    Ông Tâm rít một hơi dài.
    "...Ừ. Anh Lực kêu tui ra Rạch Đước chờ. Tui không muốn nói vì sợ chị Hai buồn."
    ~ vo_dem = true
    -> hoi
+ {has_P10} [Anh Lực nhắn anh "Mày chờ ở Rạch Đước". Anh không ngủ ở chòi.]
    Ông Tâm im một lúc lâu, rồi gật đầu.
    "Chị Hai không biết gì hết. Ảnh dặn kỹ lắm, nói bả mà biết là bả không chịu."
    "Tui ra Rạch Đước chờ ảnh thiệt."
    ~ vo_dem = true
    -> hoi
+ {has_X4 && has_H9} [Ủng anh trong ảnh dính bùn đỏ. Bùn đỏ chỉ có ở Rạch Đước, từ bến lên Vàm Sát toàn bùn xám.]
    Ông Tâm nhìn xuống chân, rồi nhìn ra sông.
    "...Tui có ghé Rạch Đước. Anh Lực hẹn."
    ~ vo_dem = true
    -> hoi
+ {has_X4 && not has_H9} [Ủng anh trong ảnh dính bùn đỏ.]
    "Bùn nào chả là bùn. Tui lội khắp nơi, {xco} biết sao được."
    Phải biết bùn đỏ ấy từ đâu ra thì mới bắt bẻ được.
    -> hoi
+ {has_H8} [Ở Rạch Đước có năm mẩu thuốc rê cuốn giấy quyến. Anh cũng hút thuốc rê.]
    "Dân ở đây ai không hút thuốc rê. {Xco} đi hỏi coi."
    Ông rít một hơi dài, khói bay về phía bạn. Một thói quen chung cả xóm không buộc được ai.
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_sau ===
+ {has_P11} [Ba lượng vàng anh bán ở Quận 8 mang số sê-ri của tiệm Kim Hưng, trong lô anh Lực mua ngày 8/9.]
    Ông Tâm cúi gằm.
    "Ảnh... ảnh cho tui. Tiền công."
    Cho vàng rồi bỏ đi Châu Đốc, mà vé xe vẫn bỏ trống ghế A7.
    ~ vo_sau = true
    -> hoi
+ {has_P5 && has_H10} [Anh Lực không chết đuối. Sau gáy có vết nứt do vật tày dạng thanh tròn, và ở Rạch Đước có nửa cây sào mới gãy.]
    Ông Tâm nhìn chằm chằm mặt nước.
    "Sào tui gãy hồi chống xuồng. Chuyện thường."
    Nhưng ông không còn nói anh Lực "lên xe ra lộ" nữa.
    ~ vo_sau = true
    -> hoi
+ {has_P5 && not has_H10} [Anh Lực chết trước khi xuống nước.]
    "Vậy thì ai đánh ảnh đó, đâu phải tui. Tui về rồi."
    Không có vật gây ra vết thương thì chưa ép được ông.
    -> hoi
+ [Anh nói dối. Anh Lực không lên xe anh.]
    "{Xco} có thấy đâu mà nói."
    -> hoi
