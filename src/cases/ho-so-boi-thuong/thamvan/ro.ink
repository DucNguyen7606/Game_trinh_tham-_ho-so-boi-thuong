VAR has_H6 = false
VAR has_H9 = false
VAR has_P12 = false
VAR has_X6 = false
VAR vo_khach = false
VAR vo_ngu = false

Ông Rô ngồi trên ghế nhựa, tay còn quấn băng.
"{Xco} hỏi gì thì hỏi lẹ, tui còn phải đi tái khám."
-> hoi

=== hoi ===
* [Đêm đó chú trực thế nào?]
    "Tui trực tỉnh táo. Mười giờ cúp cầu dao, đi một vòng, rồi ngồi chòi tới sáng. Không ai vô hết."
    -> hoi
* {has_H9} [Ổ cắm trong chòi cháy sém. Có phải chập điện từ đó không?]
    "Cái quạt cũ đó chập hoài, tui rút ra từ chập tối rồi."
    "Chòi tui xài bình ắc-quy riêng, đâu có dây nào chạy qua bên kho. Lửa bên văn phòng, cách cả chục thước."
    -> hoi
* {has_H6} [Hai cái ly trong chòi là sao, chú?]
    "Thằng cháu dưới Bến Tre lên chơi, đem chai rượu quê. Uống chút, chín giờ nó về."
    -> doi_ly
* {has_X6} [Ảnh anh Huy chụp lúc 02:40, đèn chòi sáng mà chú gục trên bàn.]
    "Tui... tui có nhấp chút rượu. Rồi thiếp đi lúc nào không hay."
    "Đừng nói với ông Thịnh nghen {xco}. Tui sáu mươi ba rồi, mất việc này là hết."
    ~ vo_ngu = true
    -> hoi
* {vo_khach && vo_ngu} [Chú say, Bảo ở lại chòi. Đêm đó chú còn thấy gì?]
    Ông Rô xoa xoa cổ tay băng.
    "Khoảng một giờ tui dậy đi tiểu, thấy ánh đèn pin trong văn phòng. Tui tưởng thằng Bảo quên đồ nên ngủ tiếp."
    "Sáng ra nó chuyển tiền, dặn đừng nói, không là mất việc cả hai."
    -> hoi
* [Cảm ơn chú.]
    -> END

=== doi_ly ===
Ông Rô nói xong thì nhìn xuống đất.
+ {has_P12} [Cháu chú, hay là Bảo? Sáng 15 Bảo chuyển cho chú 5 triệu, ghi "chú Tư uống cà phê".]
    Ông Rô im một lúc lâu.
    "Thì... thằng Bảo. Nó ghé, đem chai rượu quê nó. Nó dặn tui đừng nói."
    ~ vo_khach = true
    -> hoi
+ [Rượu Mỏ Cày là rượu Bến Tre. Cháu chú ở Bến Tre, vậy là khớp.]
    "Đó, {xco} thấy chưa. Tui đâu có nói xạo."
    Ông Rô thở ra nhẹ nhõm. Bạn vừa tự lấp chỗ hở trong lời ông.
    -> hoi
+ [Chú đang giấu ai đó.]
    "Giấu gì mà giấu. Tui nói rồi, thằng cháu."
    -> hoi
