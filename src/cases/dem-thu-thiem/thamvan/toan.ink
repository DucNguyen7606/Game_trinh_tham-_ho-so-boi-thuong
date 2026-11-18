VAR has_X10 = false
VAR has_X1 = false
VAR has_H3 = false

Chú Toàn chùi tay vào giẻ, sợi dây chuyền vàng lủng lẳng trước ngực áo ba lỗ.
"Xe đâm kiểu gì, nhìn cái đầu xe là tôi biết. {Xco} hỏi gì cứ hỏi."
-> hoi

=== hoi ===
* [Ông Khải muốn kéo xe về gara chú. Chú biết gì về vụ này?]
    "Ông ấy gọi tôi sáng 7/12, bảo xe lao xuống kênh. Tôi bảo xe ấy hỏng nặng, kéo về hãng cho chắc, ông ấy không chịu."
    -> hoi
* [Tối 6/12 ông Khải có liên lạc với chú không?]
    "Có. Gần mười một giờ rưỡi ông ấy gọi, tôi đang ngủ không nghe. Rồi ông ấy nhắn Zalo."
    "Tôi không muốn dính, nhưng {xco} hỏi thì tôi đưa xem." #photo:X6
    -> hoi
* {has_X1} [Gara chú từng bị An Tín nhắc nhở vì báo giá đội lên.]
    "Chuyện đó tôi nhận. Tôi nâng giá, tôi sai. Nhưng xe tông người thì tôi không động vào, {xco} xem tin nhắn đi."
    -> hoi
* {has_H3} [Góc phải đầu xe có vết lõm tròn dính sơn đỏ, khác hẳn vết đâm cây.]
    "Vết ấy là vết đâm người hay xe máy, cao cỡ ngang đùi. Gốc cây thì ăn vào giữa, lõm sâu, dính nhựa. Hai cú khác nhau, khác giờ."
    -> hoi
* [Đêm 6/12 sau 2 giờ sáng chú ở đâu?]
    "Ở nhà ở Bình Thạnh ngủ với vợ con. Cổng nhà tôi có camera, {xco} cứ lấy."
    -> hoi
* {has_X10} [Năm 2022 gara chú bị phạt vì sửa xe gây tai nạn mà không báo công an.]
    "Dính một lần, mất cả năm làm ăn. Nên đêm đó ông ấy nhắn, tôi mới không trả lời."
    "Xe ấy chưa hề vào gara tôi. Sáng 7/12 nó vẫn nằm dưới kênh mà {xco}."
    -> hoi
* [Cảm ơn chú.]
    -> END
