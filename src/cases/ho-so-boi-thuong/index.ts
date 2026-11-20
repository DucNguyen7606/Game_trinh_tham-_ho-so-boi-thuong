import type { CaseData } from '@/game/types'
import caseJson from './case.json'

// One case folder, gathered for the case loader.
export const data = caseJson as CaseData
// Chapter 1 is drawn in the diorama style (src/art/iso). The earlier flat scenes and close-ups stay in ./scenes and ./closeups for comparison.
export { isoSceneArt as sceneArt } from './iso/scenes'
export { isoCloseups as closeups } from './iso/closeups'
export { documents } from './documents'
export { reconstruction, theoryPanels, verdictPreview } from './reconstruction'
export { epilogue } from './epilogue'
export { intro, outro } from './cutscenes'
