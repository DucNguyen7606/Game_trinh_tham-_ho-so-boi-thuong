import type { CaseData } from './types'
import hoSoBoiThuong from '@/cases/ho-so-boi-thuong/case.json'
import { sceneArt as hoSoBoiThuongScenes } from '@/cases/ho-so-boi-thuong/scenes'

// Interrogation scripts are plain .ink text, compiled at runtime by inkjs.
const inkFiles = import.meta.glob('/src/cases/*/thamvan/*.ink', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const cases: CaseData[] = [hoSoBoiThuong as CaseData]

// Scene backdrops are drawn in code (see src/art), one module per case.
const sceneArt: Record<string, Record<string, () => JSX.Element>> = {
  'ho-so-boi-thuong': hoSoBoiThuongScenes,
}

export function getSceneArt(caseId: string, zoneId: string) {
  return sceneArt[caseId]?.[zoneId]
}

export function getInkSource(caseId: string, key: string): string | undefined {
  return inkFiles[`/src/cases/${caseId}/thamvan/${key}.ink`]
}

export function clueById(data: CaseData, id: string) {
  return data.clues.find((c) => c.id === id)
}
