VAR has_H1 = false
VAR has_P4 = false
VAR has_P5 = false
VAR has_H2 = false
VAR has_H3 = false
VAR has_H8 = false
VAR has_H9 = false
VAR has_P7 = false
VAR has_P9 = false
VAR has_P10 = false
VAR has_X1 = false
VAR has_X2 = false
VAR has_P11 = false
VAR has_H11 = false

Khoa rót trà mời trước, tay áo sơ mi xắn gọn gàng.
"Chú tôi lớn tuổi, cầu thang thì dốc. Tôi dặn mãi mà chú không chịu dọn xuống tầng dưới. {Xchi} cần giấy tờ gì, tôi lo đủ."
-> hoi

=== hoi ===
* [Tối 13/4 anh ở đâu?]
    "Tôi ăn tối ở nhà phụ, gần chín giờ thì đi đám cưới thằng Phát ở Quận 10. Ngồi đến hơn 12 giờ mới về."
    "Ảnh đây, gần 11 giờ tôi còn đang nâng ly với cô dâu chú rể." #photo:X3
    -> hoi
* [Ai mua hợp đồng bảo hiểm này?]
    "Tôi mua, tôi đóng phí. Chú lớn tuổi, ở một mình, tôi lo xa thôi. Chú ký đồng ý đàng hoàng."
    -> hoi
* [Về nhà lúc nửa đêm, anh có lên nhà chính không?]
    "Không. Tôi say, về là lăn ra ngủ ở nhà phụ. Sáng nghe chú Tư hét lên mới chạy sang."
    -> hoi
* {has_H1} [Núm đồng hồ của ông Hiển bị kéo ra nấc chỉnh giờ.]
    "Thế à? Chắc lúc ngã nó vướng vào đâu đó. Đồ cũ mà {xchi}."
    -> hoi
* {has_P4} [Pháp y nói ông mất trong khoảng 19:00 đến 21:30, không phải 22:47.]
    Khoa đặt tách trà xuống, hơi mạnh tay.
    "Pháp y ước chừng thôi mà. Đồng hồ của chú thì ghi rõ ràng."
    -> hoi
* {has_P5} [Camera hẻm ghi anh về lúc 00:38, và đèn phòng làm việc trên gác tắt lúc 01:12.]
    "Chắc... chắc đèn hẹn giờ. Nhà cũ, điện đóm lung tung lắm."
    -> hoi
* {has_H2} [Thanh chặn thảm bậc thứ ba mất hai con ốc.]
    "Tôi báo chú cái thanh ấy lỏng từ Tết. Chú bảo để thợ của chú làm, không cho tôi động vào."
    -> hoi
* {has_H3} [Thảm hành lang trên gác có hai vệt kéo lê từ cửa phòng làm việc tới đầu cầu thang.]
    Khoa nhìn ra cửa sổ, không trả lời ngay.
    "Chú Tư lôi đồ đạc gì đó chứ gì. Tôi có biết đâu."
    -> hoi
* {has_H8} [Hai con ốc đồng nằm trong hộp đồ nghề của anh.]
    Khoa im lặng một lúc lâu.
    "Ốc thì nhà nào chẳng có. Nhà này trăm tuổi, chỗ nào cũng ốc đồng."
    -> hoi
* {has_H9} [Lịch nhà anh khoanh ngày 6/4: "Gọi An Tín, hỏi điều 7".]
    "Người mua bảo hiểm thì phải đọc điều khoản chứ {xchi}. Tôi hỏi cho biết."
    -> hoi
* {has_P7} [Pháp y bổ sung: ông mất vì nhồi máu cơ tim khi đang ngồi. Gãy cổ là sau khi đã mất.]
    Tay Khoa run lên, nước trà sóng ra khay.
    "Thế... thế là chú không đau đớn gì cả, phải không {xchi}?"
    -> hoi
* {has_P9} [Ngày 6/4 anh gọi tổng đài hỏi: chú mất vì bệnh tim thì có được chi không.]
    Khoa cười, nhưng nụ cười tắt rất nhanh.
    "Chú bị tim, tôi lo xa. Cô tổng đài bảo bệnh thì không chi, ngã thì chi. Thế thôi."
    -> hoi
* {has_P11} [Ông Hiển dặn để lại cho chú Tư phòng sau bếp và 500 triệu.]
    Khoa nhướng mày.
    "Tôi không biết chuyện ấy. Mà chú Tư giữ chìa cổng với cửa sảnh, ra vào lúc nào chẳng được. {Xchi} hỏi chú Tư thử xem."
    -> hoi
* {has_P10} [Giám định nói hai con ốc của anh dính vụn gỗ lim của cầu thang, khớp từng đường ren.]
    Khoa gật đầu, như đã chờ câu này.
    "Thì đúng là ốc của thanh ấy. Tết tôi tháo ra định thay thanh mới, chú không cho, tôi cất vào hộp. Thanh ấy lỏng từ hồi đó, chú già rồi mà cứ đi cầu thang ban đêm."
    -> khoa_oc
* [Cảm ơn anh.]
    -> END

// Khoa nhận cái nhỏ (tháo ốc từ Tết) để giữ cái lớn (chú ngã thật). Phải chỉ ra ông Hiển không hề đi xuống cầu thang, rồi chỉ ra chỉ Khoa có mặt.
=== khoa_oc ===
+ {has_X1} [Ông Hiển suy tim, bác sĩ dặn đề phòng ngã khi lên xuống cầu thang.]
    "Đấy, {xchi} thấy chưa. Chú yếu tim, chóng mặt, thanh chặn lỏng. Ngã là chuyện sớm muộn."
    Khoa rót thêm trà, tay đã hết run. Bệnh án chỉ làm câu chuyện "ngã cầu thang" của anh thêm chắc. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_X2} [Thắng từng nhắn: "Ông đừng để tới lúc hối hận."]
    "Ông môi giới ấy dai như đỉa. {Xchi} đi mà hỏi ông ta."
    Khoa rót thêm trà, tay đã hết run. Tin nhắn của Thắng không nói gì về thanh chặn thảm. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_P7} [Ông Hiển không đi xuống cầu thang nào hết. Ông mất khi đang ngồi, gãy cổ sau khi chết, dưới hai nách có vết hằn ngón tay. Có người đã khiêng ông ra đó.]
    Khoa đặt tách trà xuống.
    "Ai khiêng thì tôi làm sao biết. Chú Tư có chìa cửa sảnh, chú ra vào cả ngày."
    -> khoa_khieng
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== khoa_khieng ===
+ {has_P11} [Chú Tư được ông dặn để lại phòng sau bếp và 500 triệu.]
    "Đấy. Người có lợi là chú Tư chứ có phải tôi đâu."
    Khoa ngả người ra ghế. Có lợi chưa chắc đã có mặt: phải xem đêm đó ai ở trong nhà. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_H11} [Dưới gốc hoa sứ có dấu giày tây sát tường rào.]
    "Thì có người trèo tường vào. Ông Thắng đi giày tây đấy {xchi}."
    Khoa ngả người ra ghế. Dấu giày in lên trên lớp hoa rụng từ hôm có chuyện, và tường thì cao ba mét cắm mảnh chai. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_P5 and has_H1} [Chú Tư về 19:30, tới 06:25 mới mở cổng. Sau nửa đêm chỉ có anh trong nhà, đèn phòng làm việc tắt 01:12. Núm đồng hồ bị kéo ra, chỉnh về 22:47, đúng lúc anh đang nâng ly ở tiệc.]
    -> khoa_khai
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== khoa_khai ===
Khoa ngồi yên rất lâu, hai tay đan chặt.
"Tôi về thấy đèn phòng chú còn sáng. Lên đến nơi thì chú ngồi gục trên bàn vẽ, tay còn cầm bút chì, người lạnh ngắt rồi."
"Tôi đứng đấy nghĩ đến chủ nợ, nghĩ đến cô tổng đài bảo bệnh thì không chi."
"Tôi không làm gì chú cả {xchi}. Tôi chỉ kéo chú ra cầu thang, tháo hai con ốc, chỉnh cái đồng hồ về lúc tôi đang ở tiệc. Rồi tôi tắt đèn."
"Chuyện tháo ốc từ Tết là tôi bịa. Chủ nhật trước chú Tư còn lau thanh ấy."
-> hoi
