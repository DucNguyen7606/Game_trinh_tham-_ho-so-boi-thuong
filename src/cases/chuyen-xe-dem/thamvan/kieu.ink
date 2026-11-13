VAR has_X1 = false
VAR has_X4 = false
VAR has_X5 = false
VAR has_X7 = false
VAR has_X10 = false
VAR has_H3 = false
VAR has_H10 = false
VAR has_P3 = false
VAR has_P4 = false
VAR has_P7 = false
VAR has_P9 = false
VAR has_P10 = false
VAR has_P11 = false
VAR vo_dem = false
VAR vo_tieu = false

Bà Kiều đặt cái laptop lên bàn, màn hình vẫn mở bản đồ định vị đội xe.
"Xe tôi mất hàng thì tôi cũng phải đền. Tôi được gì?"
-> hoi

=== hoi ===
* [Đêm 2/11 chị ở đâu?]
    "Ở nhà, Buôn Ma Thuột. Xe chạy là tôi thức canh định vị tới sáng."
    "Mười hai giờ rưỡi thấy xe 47H mất sóng, tôi chụp màn hình gửi thằng Đạt hỏi mà nó không trả lời." #photo:X5
    -> doi_dem
* [Chuyến này ai sắp xếp?]
    "Ông Tài gọi đặt xe. Lần này ổng đòi đích danh thằng Đạt chạy, nói tin nó."
    "Chuyến nào ổng cũng kêu tôi tự lo, tự chịu. Lần đầu tiên ổng chịu bỏ tiền mua bảo hiểm hàng."
    -> hoi
* {has_X1} [Nhà xe đang nợ ngân hàng 2,1 tỷ.]
    "Thì sao? Xe mất hàng, Đất Đỏ kiện thì tôi còn nợ thêm. Tôi điên mới đi dàn cướp xe mình."
    -> hoi
* {has_X10} [Chị chuyển cho Phúc 5 triệu ngày 1/11.]
    "Tạm ứng lương. Con Mai ghi sổ đàng hoàng, {xco} coi."
    -> hoi
* {has_H3} [Trong cabin có một máy phá sóng định vị.]
    Bà Kiều đập tay xuống bàn.
    "Xe tôi mà gắn đồ đó, tôi bị tước giấy phép là chắc. Thằng Đạt... trời ơi."
    -> hoi
* {has_P9} [Tiền cọc kho Phan Rí chuyển từ tài khoản Trần Thị Mai, kế toán nhà xe chị.]
    "Con Mai hay tạm ứng giùm bạn bè. {Xco} đi hỏi nó."
    Bà kéo laptop lại gần, gập màn hình xuống một nửa.
    -> hoi
* {has_P7} [Xe bán tải của nhà xe chị qua trạm Cà Ná lúc 23:31, quay về lúc 03:22.]
    "Tôi cho thằng Phúc mượn đi Phan Rang."
    -> doi_bantai
* {has_P10} [400 bao tiêu bán ở Long Khánh ngày 6/11, tiền vào tài khoản chị.]
    "Tôi mua đi bán lại tiêu cả chục năm nay. Mua của mối, bán cho mối. {Xco} muốn coi hóa đơn thì tôi đưa."
    -> doi_tieu
* {has_P11} [Chị chuyển 250 triệu cho vợ anh Đạt.]
    "Tiền hụi. Con Liên chơi hụi với tôi mấy năm nay."
    -> hoi
* {vo_dem && vo_tieu} [Chị có mặt ở Phan Rí đêm đó, và tiêu chị bán là tiêu trên xe 47H.]
    Bà Kiều ngồi lặng, hai tay ôm cái laptop.
    "Ba mươi tháng 11 là ngân hàng tới kéo hai chiếc xe. Năm chiếc xe là cả đời tôi."
    "Hàng có bảo hiểm thì An Tín đền cho ông Tài. Cướp có công an xác nhận thì nhà xe khỏi đền. Tôi tưởng không ai mất gì hết."
    "Lỡ có lộ... thì chì của Đất Đỏ, hợp đồng lỗ của Đất Đỏ. Người ta nghi ổng trước."
    -> hoi
* [Cảm ơn chị.]
    -> END

=== doi_dem ===
Bà Kiều xoay laptop về phía mình.
+ {has_X5} [Trong ảnh chị chụp, chấm xanh "Vị trí của bạn" nằm sát xe 47H ở Phan Rí. Chị không ở Buôn Ma Thuột.]
    Bà Kiều nhìn tấm ảnh, rồi nhìn bạn. Lần đầu tiên bà không trả lời ngay.
    "...Điện thoại tôi định vị sai hoài."
    Định vị sai đúng tới mấy trăm mét cạnh chiếc xe mất sóng.
    ~ vo_dem = true
    -> hoi
+ {has_P4} [Xe mất sóng 23:52, chị nói 00:30 mới thấy. Chị canh định vị mà để hơn nửa tiếng?]
    "Tôi ngủ gật. Năm chiếc xe, tôi đâu có ngồi nhìn một chiếc."
    -> hoi
+ [Được, tôi ghi lại.]
    -> hoi

=== doi_bantai ===
+ {has_X4} [Lúc 00:40 Phúc đang hát karaoke ở Phan Rang, đi xe ôm tới. Chiếc bán tải thì đang ở Phan Rí.]
    Bà Kiều không nhìn bạn nữa.
    "Chắc nó cho đứa khác mượn lại."
    ~ vo_dem = true
    -> hoi
+ {has_X7} [Camera cổng kho Phan Rí chụp một bán tải trắng có logo Kiều Phát vào kho lúc 00:12.]
    "Bán tải trắng thì cả tỉnh có cả trăm chiếc. Logo dán thì ai dán chả được."
    Ảnh camera mờ. Bà có cớ để cãi.
    -> hoi
+ [Chị cho mượn mà không biết người ta đi đâu?]
    "Tôi đâu phải mẹ nó."
    -> hoi

=== doi_tieu ===
+ {has_P3 || has_H10} [Bao tiêu chị bán mang mã lô DD-1102. Đất Đỏ in mã riêng từng chuyến, DD-1102 là đúng lô đóng lên xe 47H.]
    Bà Kiều gập hẳn màn hình laptop xuống.
    "Mối bán cho tôi... tôi đâu có coi mã lô."
    Bán bốn trăm bao, đúng số bao trên xe, mà không coi mã lô.
    ~ vo_tieu = true
    -> hoi
+ [Bốn trăm bao cùng lúc, ngay sau vụ cướp, lại rẻ hơn giá chợ.]
    "Giá đó là giá sỉ. Mua nhiều thì rẻ. {Xco} đi Long Khánh hỏi coi."
    -> hoi
