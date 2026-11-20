VAR has_X10 = false
VAR has_X1 = false
VAR has_H3 = false

Chú Toàn chùi tay vào giẻ, sợi dây chuyền vàng lủng lẳng trước ngực áo ba lỗ.
"Xe đụng kiểu gì, nhìn cái đầu xe là tui biết. {Xco} hỏi gì cứ hỏi."
-> hoi

=== hoi ===
* [Ông Khải muốn kéo xe về gara chú. Chú biết gì về vụ này?]
    "Ổng gọi tui sáng 7/12, nói xe lao xuống kênh. Tui nói xe đó lỗ nặng, kéo về hãng cho chắc, ổng không chịu."
    -> hoi
* [Tối 6/12 ông Khải có liên lạc với chú không?]
    "Có. Gần mười một giờ rưỡi ổng gọi, tui đang ngủ không nghe. Rồi ổng nhắn Zalo."
    "Tui không muốn dính, mà {xco} hỏi thì tui đưa coi." #photo:X6
    -> hoi
* {has_X1} [Gara chú từng bị An Tín nhắc nhở vì báo giá đội lên.]
    "Chuyện đó tui nhận. Tui nâng giá, tui sai. Nhưng xe tông người thì tui không đụng vô, {xco} coi tin nhắn đi."
    -> hoi
* {has_H3} [Góc phải đầu xe có vết lõm tròn dính sơn đỏ, khác hẳn vết đâm cây.]
    "Vết đó là vết đụng người hay xe máy, cao cỡ ngang đùi. Gốc cây thì ăn vô giữa, lõm sâu, dính nhựa. Hai cú khác nhau, khác giờ."
    -> hoi
* [Đêm 6/12 sau 2 giờ sáng chú ở đâu?]
    "Ở nhà ở Bình Thạnh ngủ với vợ con. Cổng nhà tui có camera, {xco} cứ lấy."
    -> hoi
* {has_X10} [Năm 2022 gara chú bị phạt vì sửa xe gây tai nạn mà không báo công an.]
    "Dính một lần, mất cả năm làm ăn. Nên đêm đó ổng nhắn, tui mới không trả lời."
    "Xe đó chưa hề vô gara tui. Sáng 7/12 nó còn nằm dưới kênh mà {xco}."
    -> hoi
* [Cảm ơn chú.]
    -> END
