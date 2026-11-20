import { IsoCrop } from '@/art/iso/iso'
import caseData from '../case.json'
import { isoSceneArt } from './scenes'

// Close-up photos in the diorama style: the zone's own diorama, zoomed in on
// the hotspot (a 4:3 crop around its position). What the photo shows in detail
// is written in the hotspot's note.


/** Close-ups whose photo must show a reading: a small card laid over the corner, like a label in the evidence photo. */
const readings: Record<string, string[]> = {
  'nhiet-ke': ['Kim đỏ (thấp nhất): 97°C · chuẩn 121°C', 'Thẻ: chỉnh kim 22:00 · 6/1'],
  'so-van-hanh': ['Ca đêm 6/1 · 02:10: "121°C bình thường"', 'Vết tẩy, nét cũ còn hằn: "98°C · báo động nhiệt"'],
  'van-hoi': ['Thẻ: bảo trì 8/1 · thay van kẹt'],
  'bang-chuyen': ['Mã lô + giờ chiết in trên nắp'],
  'pallet-0601': ['0601-L2 · Đ255 · niêm phong 7/1', 'Nắp phồng · màng seal nguyên · không lỗ kim'],
  'pallet-0701': ['Lô 0701-L1 · line 1 · nắp phẳng'],
  'bang-giao': ['8/1 · 0601-L2 · 14 điểm bán (Q.12, Gò Vấp, Hóc Môn)', '9/1 · 0701-L1 · 12 điểm bán · THU HỒI 11/1'],
  'hop-kim': ['Kim insulin 31G · 0,25 mm', 'Thay hộp 5/1 · hơn 30 kim'],
  'khay-giay': ['Mặt sau tờ giấy: "…KIỂM NGHIỆM LÔ ______"'],
  'phieu-xuat': ['Phiếu xuất xưởng · lô 0601-L2 · ĐẠT', '08:00 · 07/01/2026 · L. V. Thuận'],
  'tu-mau': ['Mẫu lưu: 0601-L2 · đã gửi kiểm nghiệm 11/1'],
  'ke-sua': ['4 chai 0701-L1: có lỗ, vẫn ngon', '2 chai 0601-L2: chua'],
  'so-giu-xe': ['Sổ giữ xe 10/01', '59-V1 268.41 · 19:02 → 19:20 · áo mưa xám'],
  camera: ['Ghi hình lưu ở máy của chị Trang'],
  'thung-tra': ['Khách trả từ 9/1 · nắp phồng · không lỗ'],
}

const W = 420
const H = 315

export const isoCloseups: Record<string, () => JSX.Element> = Object.fromEntries(
  caseData.zones.flatMap((zone) =>
    zone.hotspots.map((h) => {
      const Art = isoSceneArt[zone.id]
      const cx = (h.x / 100) * 1600
      const cy = (h.y / 100) * 900
      const crop: [number, number, number, number] = [cx - W / 2, cy - H / 2 - 20, W, H]
      const lines = readings[h.id]
      const Closeup = () => (
        <>
          <IsoCrop.Provider value={crop}>
            <Art />
          </IsoCrop.Provider>
          {lines && (
            <div className="absolute bottom-[6%] left-[5%] rounded-xl bg-white/95 px-3 py-1.5 font-mono text-[clamp(10px,1.6vw,15px)] font-semibold leading-snug text-[#2e2a4a] shadow-md">
              {lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          )}
        </>
      )
      return [h.id, Closeup]
    }),
  ),
)
