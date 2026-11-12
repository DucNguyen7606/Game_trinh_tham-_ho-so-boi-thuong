import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PortraitSpec } from '@/art/Portrait'

// The investigator the player plays across every chapter: name, gender, job and
// look, chosen on the main menu and remembered between sessions. Cases keep
// their own `player` block as the default; this replaces it when a case opens.

export type Gender = 'nu' | 'nam'

export interface Role {
  id: string
  title: string
  /** How the desk names the job, ending with who they work for. */
  line: string
  blurb: string
}

// Every case is an insurance claim, so each job works for, or with, An Tín.
export const ROLES: Role[] = [
  {
    id: 'giam-dinh',
    title: 'Chuyên viên giám định bồi thường',
    line: 'Chuyên viên giám định bồi thường, Bảo hiểm An Tín',
    blurb: 'Người của hãng bảo hiểm. Đọc hợp đồng, soi chứng từ, rồi đề xuất chi hay không chi.',
  },
  {
    id: 'tham-tu',
    title: 'Thám tử tư',
    line: 'Thám tử tư, nhận ủy thác của Bảo hiểm An Tín',
    blurb: 'Làm riêng, ăn tiền theo từng vụ. Quen đường phố hơn quen giấy tờ.',
  },
  {
    id: 'cuu-dieu-tra',
    title: 'Cựu điều tra viên hình sự',
    line: 'Cựu điều tra viên hình sự, cố vấn cho Bảo hiểm An Tín',
    blurb: 'Hai mươi năm ở đội hình sự, giờ về hưu sớm. Nhìn hiện trường là biết ai nói dối.',
  },
  {
    id: 'luat-su',
    title: 'Luật sư',
    line: 'Luật sư, tư vấn pháp lý cho Bảo hiểm An Tín',
    blurb: 'Biết từng điều khoản loại trừ. Câu hỏi nào cũng có thể thành lời khai trước tòa.',
  },
]

/** The investigator's portrait: the job decides the clothes, the gender the hair and cut. */
export const LOOKS: Record<string, Record<Gender, PortraitSpec>> = {
  // Office wear of the insurer: light shirt, staff ID on a lanyard.
  'giam-dinh': {
    nu: { skin: 0, hair: 'bun', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'sky', age: 'young', backdrop: 'teal', mood: 'smile', accessory: ['lanyard'] },
    nam: { skin: 1, hair: 'side-part', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'sky', age: 'young', backdrop: 'teal', mood: 'smile', accessory: ['lanyard'] },
  },
  // Trench coat and fedora.
  'tham-tu': {
    nu: { skin: 0, hair: 'long', hairColor: 'black', build: 'thin', outfit: 'trench', outfitColor: 'khaki', age: 'young', backdrop: 'night', accessory: ['fedora'] },
    nam: { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'trench', outfitColor: 'khaki', age: 'young', backdrop: 'night', accessory: ['fedora'] },
  },
  // Worn leather field jacket, older and sterner.
  'cuu-dieu-tra': {
    nu: { skin: 1, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'jacket', outfitColor: 'leather', age: 'mid', backdrop: 'rust', mood: 'stern', accessory: ['earrings'] },
    nam: { skin: 2, hair: 'buzz', hairColor: 'gray', build: 'heavy', outfit: 'jacket', outfitColor: 'leather', age: 'mid', backdrop: 'rust', mood: 'stern', accessory: ['earrings'] },
  },
  // Dark suit; a tie for men, earrings for women; reading glasses.
  'luat-su': {
    nu: { skin: 0, hair: 'bun', hairColor: 'brown', build: 'thin', outfit: 'suit', outfitColor: 'charcoal', age: 'young', backdrop: 'amber', accessory: ['earrings', 'glasses'] },
    nam: { skin: 1, hair: 'side-part', hairColor: 'black', build: 'normal', outfit: 'suit', outfitColor: 'navy', age: 'mid', backdrop: 'amber', accessory: ['tie', 'glasses'] },
  },
}

export function lookOf(roleId: string, g: Gender) {
  return (LOOKS[roleId] ?? LOOKS['giam-dinh'])[g]
}

export const DEFAULT_NAMES: Record<Gender, string> = { nu: 'Lê Thu Hạnh', nam: 'Lê Quang Huy' }

export interface Profile {
  name: string
  gender: Gender
  roleId: string
}

interface ProfileState extends Profile {
  /** False until the player has confirmed a character once. */
  created: boolean
  save: (p: Profile) => void
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: DEFAULT_NAMES.nu,
      gender: 'nu',
      roleId: 'giam-dinh',
      created: false,
      save: (p) => set({ ...p, created: true }),
    }),
    { name: 'hssg-profile', partialize: ({ name, gender, roleId, created }) => ({ name, gender, roleId, created }) },
  ),
)

/** The case's `player` block for this profile. */
export function playerOf(p: Profile) {
  const role = ROLES.find((r) => r.id === p.roleId) ?? ROLES[0]
  return { name: p.name.trim() || DEFAULT_NAMES[p.gender], role: role.line, portrait: lookOf(role.id, p.gender) }
}

/**
 * How people address the investigator. Scripts and quotes write {xco}/{Xco} where a
 * woman would be called "cô" and {xchi}/{Xchi} for "chị"; a man is "anh" for both.
 */
export function addressWords(g: Gender) {
  return g === 'nam' ? { xco: 'anh', Xco: 'Anh', xchi: 'anh', Xchi: 'Anh' } : { xco: 'cô', Xco: 'Cô', xchi: 'chị', Xchi: 'Chị' }
}

/** Fills the address placeholders in a line of text. */
export function addressPlayer(text: string, g: Gender = useProfile.getState().gender) {
  const w = addressWords(g)
  return text.replace(/\{(xco|Xco|xchi|Xchi)\}/g, (_, k: keyof typeof w) => w[k])
}

/** Ink declarations for the same words, put in front of every interview script. */
export function addressInk(g: Gender) {
  return Object.entries(addressWords(g))
    .map(([k, v]) => `VAR ${k} = "${v}"`)
    .join('\n')
}

/** "Lê Thu Hạnh" → "L. T. Hạnh", for signatures on documents. */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return name
  return [...parts.slice(0, -1).map((p) => `${p[0]}.`), parts[parts.length - 1]].join(' ')
}
