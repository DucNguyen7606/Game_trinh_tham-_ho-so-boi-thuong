VAR has_X10 = false
VAR has_X11 = false
VAR has_H2 = false
VAR has_X4 = false
VAR has_H4 = false
VAR has_P8 = false
VAR has_P6 = false
VAR has_P10 = false

Thuận đẩy gọng kính, đặt cây bút tiêm insulin lên bàn cho ngay ngắn.
"Quy trình QC của Mộc An đạt chuẩn. Lỗi không nằm trong nhà máy."
-> hoi

=== hoi ===
* [Lô 0601-L2 có vấn đề gì không?]
    "Không. Mẫu đầu ca đạt hết, tôi ký xuất xưởng đàng hoàng. Có kẻ phá hàng ngoài thị trường, thư nó ghi rõ vậy."
    -> hoi
* [Tối 10/1 anh ở đâu?]
    "Ở nhà ăn cơm với vợ con. Hình đây, {xco} coi." #photo:X6
    -> hoi
* [Vì sao Sang bị cho nghỉ?]
    "Ngủ gật trong ca, ngay cạnh máy tiệt trùng. Nó còn lên mạng hăm dọa công ty. {Xco} nên hỏi nó tối 10/1 ở đâu."
    -> hoi
* {has_H2} [Dòng 02:10 trong sổ vận hành ca đêm 6/1 bị tẩy.]
    "Công nhân ghi sai thì tẩy. Chuyện thường."
    -> hoi
* {has_P6} [Bộ ghi nhiệt cho thấy báo động 02:10 được tắt bằng tài khoản của anh.]
    "Cảm biến line 2 hay báo sai. Tôi tắt từ điện thoại cho máy khỏi dừng giữa ca."
    -> hoi
* {has_X4} [Lúc 02:20 anh nhắn Sang "Cứ chạy tiếp, đừng ghi sổ".]
    Thuận tháo kính lau, lâu hơn cần thiết.
    "Tôi tưởng cảm biến báo sai. Sáng ra tôi kiểm mẫu, mẫu đạt."
    -> hoi
* {has_H4} [Hộp kim của anh có hơn 30 cây kim, chỉ trong một tuần.]
    "Tôi bị tiểu đường. Cô định đếm kim của người bệnh à?"
    -> hoi
* {has_P8} [Xe 59-V1 268.41 của anh vào bãi Hiệp Thành Mart lúc 19:02 tối 10/1.]
    "Ghé mua đồ thôi. Siêu thị đó gần nhà tôi."
    "...Mua gì thì tôi không nhớ."
    -> hoi
* {has_P10} [Thư tống tiền in bằng máy in phòng QC, trên mặt sau phiếu kiểm nghiệm.]
    "Máy in đó cả phòng QC xài chung, công nhân ca đêm cũng vô in phiếu. Sang ra vào phòng tôi suốt ba năm."
    -> hoi
* {has_P10 && has_P8} [Sang bị khóa thẻ từ chiều 7/1. Thư in bằng máy in phòng anh, và tối 10/1 xe anh vào bãi Hiệp Thành Mart đúng lúc có người đứng chín phút trước kệ sữa.]
    Thuận im rất lâu. Cây bút tiêm lăn khỏi mép bàn, anh không nhặt.
    "Mười năm không lọt một lô. Lô đó mà là lỗi nhà máy thì tôi mất hết, còn phải bồi hoàn."
    "Tôi chỉ chích sáu chai. Sáu chai thôi. Còn lại là cái van hơi."
    -> hoi
* {has_X4 && has_P6} [Anh nói cảm biến báo sai. Nhưng bộ ghi nhiệt riêng của line 2 ghi 97 tới 101°C suốt 75 phút, khớp với ảnh Sang chụp.]
    Thuận đặt cây bút tiêm xuống.
    "Đêm đó đang chạy đơn hàng Tết. Dừng máy là trễ cả tuần."
    "Tôi tính sáng ra kiểm mẫu, mẫu nào hỏng thì chặn. Mẫu đầu ca đạt, tôi ký."
    -> hoi
* {has_X10} [Sáng 11/1 bảo vệ thấy Sang đứng gần hộp thư cổng.]
    "Đó, {xco} thấy chưa. Bị đuổi rồi còn lảng vảng ở cổng làm gì?"
    -> hoi
* {has_X11} [Van hơi line 2 được thay ngày 8/1 theo yêu cầu của phòng QC.]
    "Bảo trì định kỳ. Van nào cũng có tuổi thọ."
    -> hoi
* [Cảm ơn anh.]
    -> END
