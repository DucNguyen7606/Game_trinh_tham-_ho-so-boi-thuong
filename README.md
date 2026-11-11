# Hồ sơ bồi thường

Game trinh thám suy luận cho PC. Người chơi là chuyên viên giám định bảo hiểm ở Sài Gòn, có 3 ngày để quyết định chi trả hay từ chối một hồ sơ bồi thường vụ cháy kho.

## Chạy thử

```bash
npm install
npm run dev        # mở cửa sổ Electron, tự nạp lại khi sửa code
npm run build      # kiểm tra kiểu + đóng gói giao diện và Electron
npm run dist       # tạo bộ cài Windows trong thư mục release/
```

Cần Node.js 20 trở lên.

## Công nghệ

| Phần | Thư viện |
| --- | --- |
| Ứng dụng PC | Electron + Vite |
| Giao diện | React 18 + TypeScript, Tailwind CSS 4, component kiểu shadcn/ui |
| Bàn suy luận | React Flow (`@xyflow/react`) |
| Kéo thả hồ sơ | dnd-kit |
| Trạng thái điều tra | Zustand |
| Thẩm vấn | inkjs (kịch bản `.ink`, biên dịch lúc chạy) |
| Steam | steamworks.js (chưa gắn) |

## Cấu trúc

```
electron/            Tiến trình chính của Electron và preload
src/
  App.tsx            Thanh trên cùng và chuyển màn hình
  game/
    types.ts         Định dạng dữ liệu một vụ án
    store.ts         Trạng thái điều tra (ngày, lượt, manh mối, câu đã giải)
    caseLoader.ts    Nạp vụ án JSON và kịch bản .ink
  screens/
    DeskScreen       Bàn làm việc: giới thiệu, người liên quan, kết thúc ngày
    SceneScreen      Hiện trường: 4 khu, bấm vật để chụp ảnh thành thẻ manh mối
    CaseFileScreen   Hồ sơ vật lý: 3 phong bì, kéo giấy tờ lên bàn đọc hoặc ghim lên bảng
    BoardScreen      Bàn suy luận: nối thẻ manh mối vào 7 câu hỏi bằng dây đỏ
    InterrogationScreen  Hỏi chuyện theo kịch bản ink
    VerdictScreen    Ký đề xuất và xem kết thúc
  audio/             Nhạc và hiệu ứng tự tổng hợp (xem mục Âm thanh)
  components/ui/     Button, Card, Badge theo kiểu shadcn/ui
  cases/
    ho-so-boi-thuong/
      case.json      Toàn bộ nội dung vụ án
      thamvan/*.ink  Kịch bản hỏi chuyện từng người
```

## Hình ảnh

Toàn bộ hình được vẽ bằng code (SVG), theo một phong cách chung: hình khối phẳng góc cạnh nhưng có ánh đèn vàng, ánh viền, vân giấy và chấm in; tông ấm như một bàn làm việc gỗ dưới đèn bàn, xanh ngọc là nốt lạnh duy nhất.

- `src/art/palette.ts`: bảng màu dùng chung (giữ khớp với biến màu trong `src/index.css`).
- `src/art/Portrait.tsx`: chân dung nhân vật theo tham số (màu da, kiểu tóc, dáng người, trang phục, phụ kiện, tuổi, nền).
- `src/art/primitives.tsx`: khối dựng cảnh (mưa, quầng đèn, mái tôn, vết cháy, vũng nước).
- `src/cases/<vụ>/scenes.tsx`: hình nền từng khu hiện trường, khung 1600 x 900; điểm bấm trong `case.json` tính theo phần trăm của khung này.
- Màn hình **Thư viện hình** trong game: xem mọi nhân vật, hiện trường, giấy tờ, bảng màu; có bộ tạo nhân vật, chọn xong bấm "Chép JSON" rồi dán vào trường `portrait` của nhân vật trong `case.json`.

Font đi kèm game (không cần mạng): Bitter cho tên và tiêu đề, Barlow Condensed cho nhãn và nút, Be Vietnam Pro cho nội dung, IBM Plex Mono cho giấy tờ.

## Thêm hoặc sửa vụ án

Mọi nội dung nằm trong `src/cases/<tên-vụ>/case.json`: khu hiện trường và các điểm bấm, manh mối, phong bì, câu hỏi trên bàn suy luận, ô kết luận và các kết thúc. Sửa JSON là đủ, không cần đụng code.

Kịch bản hỏi chuyện là file `.ink`. Muốn một câu hỏi chỉ hiện khi người chơi đã có manh mối nào đó, khai báo biến `has_<mã manh mối>` ở đầu file, ví dụ `VAR has_H6 = false`, rồi dùng `* {has_H6} [Câu hỏi]`. Game tự gán biến này theo manh mối người chơi đã tìm được.

Thêm component shadcn/ui khác: `npx shadcn@latest add <tên>` (cấu hình nằm ở `components.json`).

## Âm thanh

Toàn bộ nhạc và hiệu ứng được tổng hợp bằng Web Audio API ngay lúc chạy (`src/audio/`), không dùng file thu âm nào nên không vướng bản quyền. Nhạc là dạng sinh tự động: mỗi ô nhịp được soạn lại từ một bộ quy tắc nên không bao giờ lặp y hệt.

| Màn hình | Chủ đề nhạc |
| --- | --- |
| Bàn làm việc, Hồ sơ, Bàn suy luận | Lo-fi hip-hop: Rhodes, sub bass, trống nhẹ, đàn tranh điểm xuyết |
| Hiện trường | Lo-fi trầm hơn, thưa hơn: Rhodes, pad tối, trống nhẹ, đàn tranh và đàn bầu luyến |
| Thẩm vấn | Căng thẳng hiện đại: ostinato synth, nhịp tim, đồng hồ tích tắc, đàn bầu trượt xuống |
| Màn hình chính | Chủ đề series: pad chậm, nhịp tim, đàn bầu hát motif D–F–G–A |
| Kết luận | Màu Việt: đàn bầu hát giai điệu ngũ cung, đàn tranh rải, pad ấm |

Hiệu ứng gắn tự động theo trạng thái game (không phải sửa từng màn hình): chụp ảnh khi tìm manh mối ở hiện trường, nhặt và thả giấy khi kéo hồ sơ, ghim, lật trang, kéo và nối dây đỏ, cắt dây, xé phong bì khi mở khoá, suy luận đúng / sai / thiếu chứng cứ, bước chân khi vào khu, đóng dấu khi qua ngày, gõ phím khi chọn lời thoại.

- `themes.ts`: 4 chủ đề nhạc. `instruments.ts`: đàn tranh, đàn bầu, bass, Rhodes, pad, trống. `sfx.ts`: hiệu ứng.
- `bindings.ts`: nối âm thanh với store của game. `AudioControls.tsx`: nút loa trên thanh trên cùng (âm lượng nhạc, hiệu ứng, tắt tiếng; tự nhớ giữa các lần chơi).
- Phòng thu: khi `npm run dev` đang chạy, mở `http://localhost:5173/audio-lab.html` trong trình duyệt để nghe thử từng bản nhạc, từng hiệu ứng và tải về dạng WAV.

## Còn thiếu ở bản khung

- Lưu và tải game.
- Hỏi chuyện Ngân và Huy, cảnh ép Huy đưa camera.
- Menu chính, Steam.
