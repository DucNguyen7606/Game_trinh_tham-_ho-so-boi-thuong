VAR has_X8 = false
VAR khoa_nhan = false
VAR has_X4 = false
VAR has_H9 = false
VAR has_P6 = false
VAR has_P9 = false
VAR has_P10 = false

Khoa đứng ở quầy lễ tân, hai tay đút túi áo hoodie trắng, mắt cứ liếc về phía văn phòng của bố.
"{Xchi} hỏi nhanh hộ em, bố em sắp xuống."
-> hoi

=== hoi ===
* [Tối 6/12 em ở đâu?]
    "Em ngồi Bến Gỗ với Hân. Mười giờ rưỡi em mệt nên về trước, đi taxi. Về đến nơi là em ngủ luôn."
    "Đặt xe trên app đây {xchi}." #photo:X8
    -> hoi
* [Em có hay lái chiếc Mercedes của bố không?]
    "Trước thì có. Giờ bố không cho nữa."
    -> hoi
* {has_X4} [Story của Hân lúc 22:20: chìa khóa Mercedes nằm ngay trước mặt em.]
    "Chìa khóa thì em cầm hộ bố, chứ em có lái đâu. Em... em về taxi mà."
    -> hoi
* {has_P9} [Em đang bị tước bằng lái vì lái xe sau khi uống rượu.]
    Khoa cúi mặt.
    "Thì thế nên em mới không dám lái."
    -> hoi
* {has_P6} [Camera nhà thuốc thấy người lái chiếc SUV đen mặc hoodie trắng.]
    "Sài Gòn thiếu gì người mặc áo trắng {xchi}."
    Giọng cậu run lên.
    -> hoi
* {has_H9} [22:58 chú Sơn ghi: "Mercedes vào, cậu Khoa lái, đầu xe vỡ".]
    "Chú Sơn già rồi, đêm tối nhìn ai cũng ra em. Em nói rồi, em về taxi."
    -> hoi
* {has_H9 && has_X8} [Chuyến xe duy nhất trong app của em là 23:41, đặt hộ Hân. Vậy 22:30 em về bằng gì, mà 22:58 chú Sơn thấy em lái?]
    ~ khoa_nhan = true
    Khoa ngồi phịch xuống ghế sofa sảnh.
    "Chị ấy tự nhiên rẽ ra. Em đạp phanh không kịp. Em có dừng, em có mở cửa ra nhìn."
    "Rồi em sợ. Em chạy về gọi bố."
    -> hoi
* {has_P10} [Chị Hoa tỉnh rồi. Chị nhớ người lái mở cửa nhìn chị rồi chạy.]
    {khoa_nhan:
        Khoa ôm mặt.
        "Chị ấy còn sống ạ {xchi}? Em tưởng... Bố bảo để bố lo hết, em cứ im."
    - else:
        Khoa nuốt khan.
        "Thanh niên áo trắng thì đầy đường. Chị ấy bị tông tối om, sao nhớ được mặt ai."
    }
    -> hoi
* [Cảm ơn em.]
    -> END
