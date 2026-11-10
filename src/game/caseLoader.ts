import type { CaseData } from './types'
import hoSoBoiThuong from '@/cases/ho-so-boi-thuong/case.json'

// Interrogation scripts are plain .ink text, compiled at runtime by inkjs.
const inkFiles = import.meta.glob('/src/cases/*/thamvan/*.ink', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const cases: CaseData[] = [hoSoBoiThuong as CaseData]

export function getInkSource(caseId: string, key: string): string | undefined {
  return inkFiles[`/src/cases/${caseId}/thamvan/${key}.ink`]
}

export function clueById(data: CaseData, id: string) {
  return data.clues.find((c) => c.id === id)
}
