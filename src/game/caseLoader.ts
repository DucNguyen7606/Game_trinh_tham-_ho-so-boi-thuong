import type { CaseData } from './types'
import hoSoBoiThuong from '@/cases/ho-so-boi-thuong/case.json'
import { sceneArt as hoSoBoiThuongScenes } from '@/cases/ho-so-boi-thuong/scenes'
import { closeups as hoSoBoiThuongCloseups } from '@/cases/ho-so-boi-thuong/closeups'
import { documents as hoSoBoiThuongDocuments } from '@/cases/ho-so-boi-thuong/documents'
import { reconstruction as hoSoBoiThuongReconstruction, theoryPanels as hoSoBoiThuongTheory, verdictPreview as hoSoBoiThuongPreview } from '@/cases/ho-so-boi-thuong/reconstruction'
import type { ReconstructionPanel } from './types'

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

// Close-up photos shown when the player inspects a hotspot.
const closeupArt: Record<string, Record<string, () => JSX.Element>> = {
  'ho-so-boi-thuong': hoSoBoiThuongCloseups,
}

export function getCloseup(caseId: string, hotspotId: string) {
  return closeupArt[caseId]?.[hotspotId]
}

// What each case-file document looks like, keyed by clue id.
const documentArt: Record<string, Record<string, () => JSX.Element>> = {
  'ho-so-boi-thuong': hoSoBoiThuongDocuments,
}

export function getDocumentArt(caseId: string, clueId: string) {
  return documentArt[caseId]?.[clueId]
}

// The true sequence of events, shown after the verdict.
const reconstructions: Record<string, ReconstructionPanel[]> = {
  'ho-so-boi-thuong': hoSoBoiThuongReconstruction,
}

const theories: Record<string, (picks: Record<string, string>) => ReconstructionPanel[]> = {
  'ho-so-boi-thuong': hoSoBoiThuongTheory,
}

/** The player's verdict as a story, the evidence against wrong picks, then the truth. */
export function getReconstruction(caseId: string, picks: Record<string, string> = {}) {
  return [...(theories[caseId]?.(picks) ?? []), ...(reconstructions[caseId] ?? [])]
}

export function getInkSource(caseId: string, key: string): string | undefined {
  return inkFiles[`/src/cases/${caseId}/thamvan/${key}.ink`]
}

export function clueById(data: CaseData, id: string) {
  return data.clues.find((c) => c.id === id)
}

const previews: Record<string, (slotId: string, optionId: string) => { Art: () => JSX.Element; note: string } | undefined> = {
  'ho-so-boi-thuong': hoSoBoiThuongPreview,
}

/** Picture and note shown on a verdict card once the player picks an option. */
export function getVerdictPreview(caseId: string, slotId: string, optionId?: string) {
  return optionId ? previews[caseId]?.(slotId, optionId) : undefined
}
