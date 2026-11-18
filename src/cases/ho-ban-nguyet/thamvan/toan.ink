VAR has_P1 = false
VAR has_P3 = false
VAR has_H1 = false
VAR has_H3 = false
VAR has_H5 = false
VAR has_H9 = false
VAR has_H10 = false
VAR has_P6 = false
VAR has_P8 = false
VAR has_P4 = false
VAR has_P5 = false
VAR has_H7 = false
VAR has_H8 = false
VAR has_X3 = false
VAR has_P10 = false
VAR has_H12 = false

Anh Toàn đứng dậy bắt tay, mắt thâm quầng sau kính, áo polo đồng phục công ty.
"Cảm ơn {xchi} đã đến. Tang lễ xong tôi mới có đầu óc mà làm giấy tờ. Anh tôi trượt chân, tôi chỉ mong bên {xchi} giải quyết cho nhanh."
-> hoi

=== hoi ===
* [Đêm 14/3 anh ở đâu?]
    "Ở văn phòng kho trong cảng Tân Thuận, chốt hàng cho tàu sáng chủ nhật. Tôi vào cổng lúc 19:40, gần 1 giờ sáng công an gọi tôi mới chạy sang Sen Hồng."
    -> hoi
* [Vì sao anh chắc anh Hưng trượt chân?]
    "Tối nào anh tôi cũng ra ban công hút thuốc, có khi còn ngồi lên mép bàn sát lan can. Tôi dặn mãi mà anh ấy có nghe đâu."
    -> hoi
* {has_P3} [Công an nghiêng về tự tử vì công ty đang nợ ngân hàng 9 tỷ.]
    Anh Toàn lắc đầu rất nhanh.
    "Không đời nào. Anh tôi lì lắm, nợ bao nhiêu cũng tính được. Anh ấy không bỏ con Vy lại đâu."
    -> hoi
* {has_P1} [Anh là người thụ hưởng duy nhất của hợp đồng 6 tỷ.]
    "Anh tôi ly hôn rồi, Vy còn nhỏ. Anh ấy nhờ tôi đứng tên để lo cho cháu với giữ công ty. Tiền đó tôi giữ cho Vy chứ có phải cho tôi đâu."
    -> hoi
* {has_H1} [Lan can cao 1,4 m. Đứng hút thuốc thì không lọt qua được.]
    "Thì... có thể anh ấy say, ngồi lên lan can rồi mất thăng bằng. Tối đó anh ấy uống rượu mà."
    -> hoi
* {has_H3} [Trên bàn có hai ly rượu. Một ly bị lau sạch.]
    "Chắc của ông Khả. Ông ấy đến đòi nợ tối đó, cả tòa nhà nghe tiếng cãi."
    -> hoi
* {has_H5} [Sổ tay anh Hưng ghi: "Nói chuyện với Toàn tối nay. 7 tỷ."]
    Anh Toàn tháo kính ra lau.
    "Chuyện công ty thôi. Anh tôi định gọi điện bàn với tôi về khoản nợ ngân hàng. Tối đó anh ấy không gọi."
    -> hoi
* {has_P6} [Chị Quyên tìm ra 14 phiếu chi 7,1 tỷ cho Thành Đạt. Giám đốc Thành Đạt là vợ anh.]
    "Thành Đạt chạy hàng thật cho tôi, giấy tờ chưa kịp bổ sung thôi. Chị Quyên làm kế toán chứ làm sao biết hết chuyện vận chuyển."
    -> hoi
* {has_H10} [Sổ cổng ghi ô tô của anh vào cảng 19:40, ra 01:15.]
    "Đấy, {xchi} thấy chưa. Xe tôi nằm trong cảng suốt. Tôi đưa công an tờ đó ngay từ đầu."
    -> hoi
* {has_H9} [Áo khoác đồng phục của anh rách cổ tay, giặt ngay trong đêm.]
    "Khiêng thùng hàng bị móc đinh rách. Dính dầu máy nên tôi giặt luôn trong nhà vệ sinh, có gì đâu."
    -> hoi
* {has_P10} [Ông Khả nhắn cho anh Hưng lúc 23:15: "Mai không có tiền thì đừng trách tôi."]
    "Đấy. Tôi nói rồi mà, ông ấy dọa anh tôi suốt. {Xchi} đi mà hỏi ông Khả."
    -> hoi
* {has_P8} [Chiếc Wave của Phúc ra cổng phụ lúc 22:52, về lại 00:09. Người lái mặc áo khoác navy, không phải đồng phục kho.]
    Anh Toàn đẩy gọng kính, im một lúc.
    "Ừ, tôi mượn xe Phúc. Chạy sang Quận 4 ăn ốc, ngồi đến hơn 12 giờ. Tôi giấu vì biết kiểu gì người ta cũng nghĩ linh tinh."
    -> toan_xe
* [Cảm ơn anh.]
    -> END

// Toàn lùi từng bước: nhận mượn xe, rồi nhận có qua, chỉ chịu khai khi bị đặt đúng vào ban công lúc 23:41.
=== toan_xe ===
+ {has_X3} [Anh Hưng còn nợ ông Khả 2 tỷ đã quá hạn.]
    "Thì đấy. Người cần tìm là ông Khả, chứ có phải tôi đi ăn ốc đâu."
    Anh Toàn lấy lại giọng đều đều. Món nợ của ông Khả không trả lời được chiếc xe đã đi đâu. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_H8} [Xe 59P2-418.36 vào hầm B2 chung cư Sen Hồng lúc 23:07, ra 23:49. Quán ốc nào nằm dưới hầm chung cư?]
    Anh Toàn tháo kính, xoa sống mũi.
    "Thôi được. Tôi có qua chỗ anh tôi, nói chuyện công ty chừng nửa tiếng. Lúc tôi về anh ấy còn đứng ngoài ban công hút thuốc, khỏe mạnh bình thường."
    -> toan_ghe
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== toan_ghe ===
+ {has_H12} [Dưới bồn hoa có đầu lọc Jet, loại ông Khả hút.]
    "Đấy! Ông Khả còn lởn vởn dưới đó. Tôi về rồi thì ai lên, {xchi} phải hỏi ông ta."
    Anh Toàn đeo kính lại. Đầu lọc dưới bồn hoa không nói ai đứng trên ban công. Lần sau phải hỏi cho trúng.
    -> hoi
+ {has_H7 and has_P5} [Bảo vệ nghe tiếng rơi lúc 23:41. Người mặc áo navy đi thang xuống hầm lúc 23:47. Lúc anh Hưng rơi, anh vẫn còn trên tầng.]
    -> toan_khai
+ {has_P4 and has_H9} [Kẽ móng tay anh Hưng có sợi polyester xanh navy, cổ tay bầm bốn ngón. Áo khoác navy của anh rách cổ tay, giặt ngay trong đêm.]
    -> toan_khai
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== toan_khai ===
Anh Toàn im rất lâu. Rồi anh đặt cặp kính xuống bàn.
"Tôi chỉ qua để xin anh ấy thêm một tháng. Một tháng thôi, tôi xoay đủ trả lại. Anh ấy bảo sáng mai anh ấy đưa hết cho kiểm toán, cho công an."
"Anh ấy quay lưng ra ban công gọi điện. Tôi nắm tay anh ấy lại... Tôi không nhớ mình đã nghĩ gì nữa."
"Tôi lau cái ly, đi thang xuống hầm. Cả đường về cảng tôi chỉ nghe tiếng ông bảo vệ hét."
-> hoi
