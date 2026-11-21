import { useGame } from '@/game/store'
import type { CaseData } from '@/game/types'

// Which art style a case is drawn in, from the `artStyle` field of its case.json.
// Cases without it keep the original "desk under a lamp" look. 'sa-ban' is the
// isometric diorama style (src/art/iso).
export type ArtStyle = NonNullable<CaseData['artStyle']>

export function artStyleOf(data: CaseData): ArtStyle {
  return data.artStyle ?? 'classic'
}

/** The style of the case being played; the main menu always uses the classic look. */
export function useArtStyle(): ArtStyle {
  return useGame((s) => (s.screen === 'menu' ? 'classic' : artStyleOf(s.data)))
}
