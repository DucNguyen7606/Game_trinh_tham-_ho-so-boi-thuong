VAR has_H6 = false
VAR has_H9 = false
VAR has_P12 = false
VAR has_X6 = false
VAR vo_khach = false
VAR vo_ngu = false

Ông Rô ngồi trên ghế nhựa, tay còn quấn băng.
"{Xco} hỏi gì thì hỏi nhanh lên, tôi còn phải đi tái khám."
-> hoi

=== hoi ===
* [Đêm đó chú trực thế nào?]
    "Tôi trực tỉnh táo. Mười giờ ngắt cầu dao, đi một vòng, rồi ngồi trong chòi đến sáng. Không ai vào cả."
    -> hoi
* {has_H9} [Ổ cắm trong chòi cháy sém. Có phải chập điện từ đó không?]
    "Cái quạt cũ ấy chập suốt, tôi rút ra từ chập tối rồi."
    "Chòi tôi dùng bình ắc-quy riêng, làm gì có dây nào chạy sang bên kho. Lửa ở bên văn phòng, cách những mấy chục mét."
    -> hoi
* {has_H6} [Hai cái chén trong chòi là sao, chú?]
    "Thằng cháu dưới Bến Tre lên chơi, mang chai rượu quê. Uống tí, chín giờ nó về."
    -> doi_ly
* {has_X6} [Ảnh anh Huy chụp lúc 02:40, đèn chòi sáng mà chú gục trên bàn.]
    "Tôi... tôi có nhấp tí rượu. Rồi thiếp đi lúc nào không biết."
    "Đừng nói với ông Thịnh nhé {xco}. Tôi sáu mươi ba tuổi rồi, mất việc này là hết."
    ~ vo_ngu = true
    -> hoi
* {vo_khach && vo_ngu} [Chú say, Bảo ở lại chòi. Đêm đó chú còn thấy gì?]
    Ông Rô xoa xoa cổ tay quấn băng.
    "Khoảng một giờ tôi dậy đi tiểu, thấy ánh đèn pin trong văn phòng. Tôi tưởng thằng Bảo quên đồ nên ngủ tiếp."
    "Sáng ra nó chuyển tiền, dặn đừng nói, không thì cả hai cùng mất việc."
    -> hoi
* [Cảm ơn chú.]
    -> END

=== doi_ly ===
Ông Rô nói xong thì nhìn xuống đất.
+ {has_P12} [Cháu chú, hay là Bảo? Sáng 15 Bảo chuyển cho chú 5 triệu, ghi "chú Tư uống cà phê".]
    Ông Rô im lặng một lúc lâu.
    "Thì... thằng Bảo. Nó qua chơi, mang chai rượu quê nó. Nó dặn tôi đừng nói."
    ~ vo_khach = true
    -> hoi
+ [Rượu Mỏ Cày là rượu Bến Tre. Cháu chú ở Bến Tre, thế là khớp.]
    "Đấy, {xco} thấy chưa. Tôi có nói điêu đâu."
    Ông Rô thở ra nhẹ nhõm. Bạn vừa tự lấp chỗ hở trong lời ông.
    -> hoi
+ [Chú đang giấu ai đó.]
    "Giấu gì mà giấu. Tôi nói rồi, thằng cháu."
    -> hoi
