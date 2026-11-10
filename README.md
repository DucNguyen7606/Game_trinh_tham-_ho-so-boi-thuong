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
  components/ui/     Button, Card, Badge theo kiểu shadcn/ui
  cases/
    ho-so-boi-thuong/
      case.json      Toàn bộ nội dung vụ án
      thamvan/*.ink  Kịch bản hỏi chuyện từng người
```

## Thêm hoặc sửa vụ án

Mọi nội dung nằm trong `src/cases/<tên-vụ>/case.json`: khu hiện trường và các điểm bấm, manh mối, phong bì, câu hỏi trên bàn suy luận, ô kết luận và các kết thúc. Sửa JSON là đủ, không cần đụng code.

Kịch bản hỏi chuyện là file `.ink`. Muốn một câu hỏi chỉ hiện khi người chơi đã có manh mối nào đó, khai báo biến `has_<mã manh mối>` ở đầu file, ví dụ `VAR has_H6 = false`, rồi dùng `* {has_H6} [Câu hỏi]`. Game tự gán biến này theo manh mối người chơi đã tìm được.

Thêm component shadcn/ui khác: `npx shadcn@latest add <tên>` (cấu hình nằm ở `components.json`).

## Còn thiếu ở bản khung

- Ảnh hiện trường và chân dung nhân vật (đang là nền màu, điểm bấm đặt theo phần trăm để thay ảnh vào sau).
- Lưu và tải game.
- Hỏi chuyện Ngân và Huy, cảnh ép Huy đưa camera.
- Âm thanh, menu chính, Steam.
