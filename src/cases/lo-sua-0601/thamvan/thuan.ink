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
    "Ở nhà ăn cơm với vợ con. Hình đây, cô coi." #photo:X6
    -> hoi
* [Vì sao Sang bị cho nghỉ?]
    "Ngủ gật trong ca, ngay cạnh máy tiệt trùng. Nó còn lên mạng hăm dọa công ty. Cô nên hỏi nó tối 10/1 ở đâu."
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
    Thuận im rất lâu. Cây bút tiêm lăn khỏi mép bàn, anh không nhặt.
    "Mười năm không lọt một lô. Lô đó mà là lỗi nhà máy thì tôi mất hết, còn phải bồi hoàn."
    "Tôi chỉ chích sáu chai. Sáu chai thôi. Còn lại là cái van hơi."
    -> hoi
* [Cảm ơn anh.]
    -> END
