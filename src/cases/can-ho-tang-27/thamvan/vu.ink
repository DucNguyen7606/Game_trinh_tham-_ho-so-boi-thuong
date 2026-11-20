VAR has_P6 = false
VAR has_H9 = false
VAR has_H10 = false
VAR has_P7 = false
VAR has_X6 = false
VAR has_P10 = false
VAR has_P5 = false
VAR has_X1 = false
VAR has_X2 = false
VAR has_X4 = false
VAR has_H3 = false

Vũ đứng ở cửa phòng kỹ thuật, tay còn cầm cây tua vít, cười gượng.
"Có việc thì em lên, không có thì em ngồi dưới hầm. {Xchi} hỏi gì em trả lời nấy."
-> hoi

=== hoi ===
* [Đêm 20/12 anh trực ca nào?]
    "Ca đêm, 22 giờ tới 6 giờ sáng. Em ngồi dưới B2 suốt, chỉ đi kiểm tra bơm một lần."
    -> hoi
* [Anh có hay lên căn 27.08 không?]
    "Đầu tháng có lên một lần, chị Ngọc báo khóa kêu pin yếu. Em thay pin xong là xuống."
    -> hoi
* {has_P6} [Ngày 6/12 anh ở với cái khóa 40 phút. Thay pin đâu cần lâu vậy.]
    "Thay pin thì phải tháo nắp, cài lại giờ, thử vân tay. Có chị giúp việc ở đó mà, {xchi} hỏi chị Hai đi."
    -> hoi
* {has_H10} [Sổ ca ghi anh kiểm tra bơm 02:00 đến 02:40, mà tủ bơm không ai mở từ 17:05.]
    "Em... nhìn đồng hồ áp suất bên ngoài thôi, đâu cần mở tủ."
    -> hoi
* {has_H9} [Giày bảo hộ của anh kẹt sợi thảm xanh. Thảm đó chỉ trải ở hành lang các tầng căn hộ.]
    "Em đi sửa tầng nào chẳng dính thảm, {xchi}."
    -> hoi
* {has_X6} [Anh có xem chị Ngọc livestream không?]
    Vũ khựng lại một giây.
    "Cả tòa ai chẳng coi. Chị Ngọc nổi tiếng mà."
    -> hoi
* {has_P7} [Thẻ KT-03 của anh đi thang hàng lên tầng 27 lúc 02:09, xuống lúc 02:31.]
    "Em nghe báo rò nước nên lên coi thử."
    "Rò ở căn nào?" Vũ không trả lời, mắt nhìn xuống đôi giày.
    -> hoi
* {has_P10} [Ngày 23/12 anh bán chiếc Rolex số máy 7Y3K2109 ở tiệm Minh Quang, Lê Văn Sỹ.]
    Vũ siết cây tua vít trong tay một lúc, rồi cười.
    "Chị Ngọc nhờ em bán giùm đó {xchi}. Chị nợ ngân hàng, cần tiền gấp mà không muốn ai biết. Chị nói bán xong chị báo mất, bảo hiểm đền, hai bên cùng có lợi."
    "Em chỉ chạy việc thôi. {Xchi} đi mà hỏi chị."
    -> vu_rolex
* [Cảm ơn anh.]
    -> END

// Vũ đổ cho chị Ngọc. Muốn bẻ câu chuyện này phải chỉ ra chỗ nó không khớp, chứ nhắc lại cái nợ của chị thì chỉ giúp Vũ.
=== vu_rolex ===
+ {has_X1} [Đúng là chị Ngọc đang nợ ngân hàng 1,2 tỷ quá hạn.]
    "Đó, {xchi} thấy chưa. Chị kẹt thì chị nghĩ cách, em chỉ là người chạy việc."
    Vũ đã lấy lại bình tĩnh. Câu chuyện của cậu vẫn đứng vững: nhắc lại chuyện của chị Ngọc chỉ giúp cậu đổ thêm cho chị. Lần sau phải chỉ ra chỗ nó không khớp.
    -> hoi
+ {has_X2} [Chị Ngọc mua thêm bảo hiểm 3,2 tỷ đúng một tháng trước đó.]
    "Đó, mua bảo hiểm trước rồi mới mất. Em nói rồi mà, chị tính hết rồi."
    Vũ đã lấy lại bình tĩnh. Câu chuyện của cậu vẫn đứng vững: nhắc lại chuyện của chị Ngọc chỉ giúp cậu đổ thêm cho chị. Lần sau phải chỉ ra chỗ nó không khớp.
    -> hoi
+ {has_P7} [Nếu chị nhờ anh bán, sao thẻ KT-03 của anh lại đi thang hàng lên tầng 27 lúc 02:09, lúc chị đang ở Hà Nội?]
    Vũ ngập ngừng.
    "Thì... chị dặn em lên lấy đồ lúc chị đi vắng. Có người lấy lúc chị không có nhà thì mới ra vụ trộm chứ."
    -> vu_rolex_2
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== vu_rolex_2 ===
+ {has_X4} [Anh Bảo cũng từng nhắn là nhớ mã két.]
    "Thì {xchi} đi hỏi anh Bảo. Em nói rồi, chị Ngọc nhờ em."
    Vũ khoanh tay, nhìn đồng hồ. Chuyện anh Bảo không liên quan gì tới câu "chị Ngọc nhờ em". Lần sau phải chỉ ra chỗ nó không khớp.
    -> hoi
+ {has_P5 and has_P6} [Người được chủ nhà nhờ thì cần gì lén cài thẻ #09 vào khóa lúc 15:42 ngày 06/12, đúng lúc anh thay pin mà chị đi vắng?]
    -> vu_khai
+ {has_H3 and has_X6} [Chị Ngọc mới đổi mã két ngày 10/12. Người được chị nhờ thì chị đưa mã, đâu cần ngồi soi live 12/12 đếm từng ngón tay chị bấm.]
    -> vu_khai
+ [Để tôi xem lại hồ sơ.]
    -> hoi

=== vu_khai ===
Vũ ngồi phịch xuống ghế, buông cây tua vít.
"App vay nhắn tới công ty, nhắn cho mẹ em dưới quê. Em hết đường rồi {xchi}."
"Hôm thay pin em cài thêm một thẻ, tính để lần sau sửa cho tiện. Rồi bữa 12/12 coi live, thấy chị Ngọc bấm mã ngay trước máy..."
"Chị Ngọc không biết gì hết. Em nói vậy cho {xchi} nghi chị thôi."
"Chiếc Patek với bộ kim cương em còn giữ trong tủ đồ ở phòng trọ. Em chưa dám bán."
-> hoi
