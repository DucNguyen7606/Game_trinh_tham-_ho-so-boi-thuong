VAR has_P5 = false
VAR has_X2 = false
VAR has_X3 = false
VAR has_X9 = false
VAR has_P4 = false
VAR has_P8 = false
VAR has_H3 = false
VAR has_H5 = false
VAR has_X6 = false
VAR has_H9 = false

Ông Khải ngồi trong sảnh khách sạn, hai lòng bàn tay còn dán băng. Ông rót trà cho bạn trước.
"Tôi lái xe ba mươi năm, chưa từng gây chuyện với ai. Lần này là trời hại tôi."
-> hoi

=== hoi ===
* [Ông kể lại đêm 6/12 giúp tôi.]
    "Tôi ăn tiệc với bạn làm ăn ở Vũng Tàu. Nửa đêm lái về, một mình. Hai giờ rưỡi tới Thủ Thiêm thì mưa như trút, con bò ở đâu băng ra, tôi đánh lái, xe trượt xuống kênh."
    "Tiệc đây, {xco} coi." #photo:X3
    -> hoi
* [Xe lao xuống mà ông chỉ trầy tay?]
    "Tôi cài dây an toàn đàng hoàng. Xe lăn xuống, tôi mở cửa bò ra, tay chống xuống đất đá nên trầy."
    -> hoi
* {has_P4} [Hộp túi khí ghi xe chạy 7 km/h, số N, cửa lái đang mở, dây an toàn chưa cài.]
    Ông Khải đặt tách trà xuống.
    "Máy móc thì cũng có lúc sai. Tôi ở trong xe, tôi biết."
    -> hoi
* {has_P8} [Xe ông không qua trạm thu phí nào đêm đó. Và trời không mưa sau 9 giờ tối.]
    "Chắc tôi đi đường khác. Đêm hôm, mệt, tôi nhớ lộn."
    "Còn mưa thì... sương, hay mưa nhỏ, ai mà để ý."
    -> hoi
* {has_H3} [Góc phải đầu xe dính sơn đỏ, đèn sương mù mất kính. Gốc cây dầu không có sơn đỏ.]
    "Xe tôi hồi trước có quẹt một lần. Tôi chưa kịp sửa."
    -> hoi
* {has_H5} [Trong gara khách sạn có vũng nước làm mát đúng chỗ đầu xe ông.]
    Ông nhìn ra cửa sổ.
    "Xe đậu trong gara nhà tôi thì có nước nhỏ xuống là chuyện thường."
    -> hoi
* {has_X6} [23:15 ông nhắn anh Toàn: "Xe anh bể đầu bên phải, sửa kín giúp anh trong đêm nay".]
    Ông Khải gỡ kính ra, lau.
    "Chiều đó tôi lùi xe quẹt cột cổng. Khách Hà Nội sắp tới, tôi muốn sửa cho kín, đỡ mất mặt."
    "Quẹt cột cổng mà sửa trong đêm, giá nào cũng được?" Ông không trả lời.
    -> hoi
* {has_X6 && has_P5} [Tin nhắn 23:15 gửi đi 28 phút sau vụ tông xe trên Nguyễn Văn Hưởng. Vụ đó vỡ đúng đèn sương mù phải.]
    Ông Khải gỡ kính ra, lau rất lâu.
    "Nó là con tôi. Mẹ nó mất rồi. Nó mà đi tù thì đời nó hết."
    "Tôi tưởng người ta chỉ té xe."
    -> hoi
* {has_X9} [Tháng 11 ông rao bán chiếc xe 1,75 tỷ mà không ai mua. Bảo hiểm thì đền 2,1 tỷ.]
    Ông Khải cười nhạt.
    "{Xco} nghĩ tôi lao xe xuống kênh để lấy chênh lệch ba trăm triệu? Tôi cần tiền thì tôi bán khách sạn, chứ không đi tù vì một chiếc xe."
    -> hoi
* {has_X2} [Ông đang nợ ngân hàng 5 tỷ, chậm trả hai kỳ.]
    "Khách sạn nào ở Thảo Điền mà không vay. Mùa khách Tết tới là tôi trả."
    -> hoi
* {has_X3} [Ảnh tiệc của ông chụp lúc 20:14 ngày 5/12, không phải 6/12.]
    "Tiệc hai bữa liền. Bữa đầu tôi chụp, bữa sau mải nói chuyện nên quên."
    -> hoi
* {has_X3 && has_P8} [Thu phí ghi xe ông qua cao tốc lần cuối lúc 23:40 ngày 5/12. Tức là ông về từ Vũng Tàu tối hôm trước.]
    Ông Khải im một lúc.
    "Thôi được. Tối 6/12 tôi ở nhà đón đoàn khách Hà Nội. Tôi nói Vũng Tàu cho đỡ rắc rối."
    "Nhưng xe xuống kênh là thật. Tôi lái nó ra Thủ Thiêm lúc khuya, vậy thôi."
    -> hoi
* {has_H9} [Sổ trực ghi 02:15 ông lái chiếc Mercedes ra khỏi khách sạn, một mình.]
    "Sổ đó xé rồi mà." Ông khựng lại, biết mình lỡ lời.
    -> hoi
* [Cảm ơn ông.]
    -> END
