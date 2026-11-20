VAR has_X1 = false
VAR has_P3 = false
VAR has_P7 = false
VAR has_P10 = false
VAR has_H2 = false
VAR has_P12 = false

Bà Thư ngồi thẳng lưng trong phòng khách của kho, điện thoại rung liên tục trên bàn.
"Bệnh nhân không chờ được tới lô sau đâu. {Xchi} làm lẹ giùm tôi."
-> hoi

=== hoi ===
* [Lô thuốc này dùng để làm gì?]
    "Herzena, thuốc tiêm cho bệnh nhân ung thư vú. Bệnh viện Ung bướu đặt đủ 1.200 lọ, hẹn giao trước 30/11. Lô mới từ Đức phải hai tháng nữa mới về."
    -> hoi
* [Ai chọn nơi tiêu hủy lô thuốc?]
    "Không phải tôi. Hàng hỏng nằm trong kho sân bay thì kho chỉ định đơn vị đốt, bên tôi chỉ ký. Mà tôi đâu muốn đốt, đốt rồi tôi lấy gì giao bệnh viện?"
    -> hoi
* {has_X1} [Minh Tâm đang nợ nhà cung cấp Đức 2,1 tỷ.]
    Bà Thư tháo kính ra lau.
    "Nợ thật. Nhưng lô này giao xong bệnh viện trả 5,2 tỷ, tôi trả nợ dư sức. Bảo hiểm trả 4,6 tỷ thì tôi còn lỗ, chưa kể tiền phạt chậm giao."
    -> hoi
* {has_P3} [Nhiệt kế TL-A ghi 33 độ từ gần nửa đêm tới 02:44.]
    "Nửa đêm? Lúc đó hàng nằm trong phòng lạnh của sân bay rồi mà. Tôi cứ tưởng là tại vụ để ngoài nắng buổi trưa."
    -> hoi
* {has_P7} [Biên bản đề xuất tiêu hủy là do thủ kho Tùng lập.]
    "Cậu đó gọi cho tôi ngay sáng 17, giục ký cho lẹ, nói để lâu tốn tiền lưu kho. Tôi bảo chờ bảo hiểm xuống coi đã."
    -> hoi
* {has_H2} [Trong thùng 17 còn một nhiệt kế thứ hai. Nó chưa bao giờ báo vượt 6,4 độ.]
    Bà Thư nhìn bạn rất lâu.
    "Bên Đức lúc nào cũng giấu một cái dự phòng, tôi quên mất. Vậy là thuốc còn tốt?"
    -> hoi
* {has_P10} [Viện Kiểm nghiệm báo thuốc đạt toàn bộ chỉ tiêu.]
    "Trời đất..." Bà cầm điện thoại lên. "Tôi gọi bệnh viện liền. Mấy chị bệnh nhân hỏi tôi cả tuần nay."
    -> hoi
* {has_P12} [Máy nén phòng lạnh 3 hư từ 13/11.]
    Bà Thư đập tay xuống bàn.
    "Đó! Kho hư máy mà không báo khách. Lỗi của Tân Sơn Cargo rành rành, bảo hiểm đền rồi đi đòi kho."
    -> hoi
* [Cảm ơn bà.]
    -> END
