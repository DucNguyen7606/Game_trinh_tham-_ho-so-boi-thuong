import type { CaseData } from '@/game/types'
import caseJson from './case.json'

// One case folder, gathered for the case loader.
export const data = caseJson as CaseData
export { sceneArt } from './scenes'
export { closeups } from './closeups'
export { documents } from './documents'
export { reconstruction, theoryPanels, verdictPreview } from './reconstruction'
export { epilogue } from './epilogue'
