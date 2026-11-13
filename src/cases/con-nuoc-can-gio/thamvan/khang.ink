VAR has_X1 = false
VAR has_X7 = false
VAR has_H4 = false

Khang ngồi vắt chân, sợi dây chuyền vàng to bản lộ ra dưới cổ áo.
"Tui cho vay đàng hoàng, có giấy tờ. {Xco} hỏi gì?"
-> hoi

=== hoi ===
* [Đêm 9/9 anh ở đâu?]
    "Nhậu ở quán ốc đầu phà Bình Khánh tới hai giờ sáng. Cả chục đứa làm chứng."
    "Nè, hình đăng lên mạng còn đây." #photo:X3
    -> hoi
* {has_X1} [Tin nhắn "Không trả thì đừng trách" là sao?]
    "Đòi nợ thì nói vậy cho nó sợ. Nó chết rồi thì tui đòi ai?"
    "Bà Hồng hứa có tiền bảo hiểm sẽ trả tui trước. Tui mong nó sống còn hơn {xco}."
    -> hoi
* {has_X7} [Trong biên bản hòa giải, anh ghi tay "Quá hạn tôi tự xử".]
    "Tự xử là tui tự đi siết ghe, siết vựa. Có giấy hòa giải đàng hoàng, tui siết đúng luật."
    "Ghe chìm rồi, vựa thành đống nợ. Tui xử ai bây giờ?"
    -> hoi
* [Anh có nghe anh Lực tính chuyện gì không?]
    "Tuần trước nó nói ráng chờ tới tháng Chạp, nó trả đủ cả vốn lẫn lời. Tháng Chạp! Tui tưởng nó hứa lèo."
    -> hoi
* {has_H4} [Anh Lực vừa mua 30 lượng vàng. Anh có biết không?]
    Khang bật cười, rồi tắt ngay.
    "Ba mươi lượng? Vậy mà nó nói với tui là nhà hết sạch tiền."
    -> hoi
* [Cảm ơn anh.]
    -> END
