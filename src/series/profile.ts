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

export const LOOKS: Record<Gender, PortraitSpec[]> = {
  nu: [
    { skin: 0, hair: 'bun', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'navy', age: 'young', backdrop: 'teal' },
    { skin: 1, hair: 'long', hairColor: 'brown', build: 'thin', outfit: 'blouse', outfitColor: 'maroon', age: 'young', backdrop: 'amber', accessory: ['earrings'] },
    { skin: 2, hair: 'short', hairColor: 'black', build: 'normal', outfit: 'polo', outfitColor: 'olive', age: 'mid', backdrop: 'rust', accessory: ['glasses'] },
  ],
  nam: [
    { skin: 1, hair: 'side-part', hairColor: 'black', build: 'normal', outfit: 'shirt', outfitColor: 'white', age: 'young', backdrop: 'teal' },
    { skin: 2, hair: 'short', hairColor: 'black', build: 'thin', outfit: 'polo', outfitColor: 'charcoal', age: 'young', backdrop: 'amber', accessory: ['glasses'] },
    { skin: 1, hair: 'buzz', hairColor: 'gray', build: 'heavy', outfit: 'shirt', outfitColor: 'khaki', age: 'mid', backdrop: 'rust' },
  ],
}

export const DEFAULT_NAMES: Record<Gender, string> = { nu: 'Lê Thu Hạnh', nam: 'Lê Quang Huy' }

export interface Profile {
  name: string
  gender: Gender
  roleId: string
  look: number
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
      look: 0,
      created: false,
      save: (p) => set({ ...p, created: true }),
    }),
    { name: 'hssg-profile', partialize: ({ name, gender, roleId, look, created }) => ({ name, gender, roleId, look, created }) },
  ),
)

/** The case's `player` block for this profile. */
export function playerOf(p: Profile) {
  const role = ROLES.find((r) => r.id === p.roleId) ?? ROLES[0]
  const looks = LOOKS[p.gender]
  return { name: p.name.trim() || DEFAULT_NAMES[p.gender], role: role.line, portrait: looks[p.look % looks.length] }
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
