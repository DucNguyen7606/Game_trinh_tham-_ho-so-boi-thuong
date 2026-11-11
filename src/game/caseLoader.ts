import type { CaseData, ReconstructionPanel } from './types'
import type { EpiloguePanel } from '@/cases/ho-so-boi-thuong/epilogue'
import * as ch1 from '@/cases/ho-so-boi-thuong'
import * as ch2 from '@/cases/con-nuoc-can-gio'
import * as ch3 from '@/cases/buc-son-mai'
import * as ch4 from '@/cases/chuyen-xe-dem'
import * as ch5 from '@/cases/dem-thu-thiem'
import * as ch6 from '@/cases/dem-trieu-cuong'
import * as ch8 from '@/cases/lo-sua-0601'
import * as ch9 from '@/cases/can-ho-tang-27'

/** Everything one case folder provides. Each case's index.ts re-exports its modules in this shape. */
interface CaseModule {
  data: CaseData
  sceneArt: Record<string, () => JSX.Element>
  closeups: Record<string, () => JSX.Element>
  documents: Record<string, () => JSX.Element>
  reconstruction: ReconstructionPanel[]
  theoryPanels: (picks: Record<string, string>) => ReconstructionPanel[]
  verdictPreview: (slotId: string, optionId: string) => { Art: () => JSX.Element; note: string } | undefined
  epilogue: Record<string, EpiloguePanel[]>
}

const modules: CaseModule[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch8, ch9]
const byId = Object.fromEntries(modules.map((m) => [m.data.id, m])) as Record<string, CaseModule | undefined>

// Interrogation scripts are plain .ink text, compiled at runtime by inkjs.
const inkFiles = import.meta.glob('/src/cases/*/thamvan/*.ink', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const cases: CaseData[] = modules.map((m) => m.data)

// Scene backdrops are drawn in code (see src/art), one module per case.
export function getSceneArt(caseId: string, zoneId: string) {
  return byId[caseId]?.sceneArt[zoneId]
}

// Close-up photos shown when the player inspects a hotspot.
export function getCloseup(caseId: string, hotspotId: string) {
  return byId[caseId]?.closeups[hotspotId]
}

// What each case-file document looks like, keyed by clue id.
export function getDocumentArt(caseId: string, clueId: string) {
  return byId[caseId]?.documents[clueId]
}

/** The player's verdict as a story, the evidence against wrong picks, then the truth. */
export function getReconstruction(caseId: string, picks: Record<string, string> = {}) {
  const m = byId[caseId]
  return m ? [...m.theoryPanels(picks), ...m.reconstruction] : []
}

export function getInkSource(caseId: string, key: string): string | undefined {
  return inkFiles[`/src/cases/${caseId}/thamvan/${key}.ink`]
}

export function clueById(data: CaseData, id: string) {
  return data.clues.find((c) => c.id === id)
}

/** Picture and note shown on a verdict card once the player picks an option. */
export function getVerdictPreview(caseId: string, slotId: string, optionId?: string) {
  return optionId ? byId[caseId]?.verdictPreview(slotId, optionId) : undefined
}

/** Pictures of what became of everyone, shown with an ending. */
export function getEpilogue(caseId: string, endingId: string) {
  return byId[caseId]?.epilogue[endingId] ?? []
}
