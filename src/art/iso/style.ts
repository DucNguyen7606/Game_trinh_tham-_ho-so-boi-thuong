import { useGame } from '@/game/store'

// Which art style each case is drawn in. Cases not listed keep the original
// "desk under a lamp" look. 'sa-ban' is the isometric diorama style (src/art/iso).
export type ArtStyle = 'classic' | 'sa-ban'

const byCase: Record<string, ArtStyle> = {
  'ho-so-boi-thuong': 'sa-ban',
}

export function artStyleOf(caseId: string): ArtStyle {
  return byCase[caseId] ?? 'classic'
}

/** The style of the case being played; the main menu always uses the classic look. */
export function useArtStyle(): ArtStyle {
  return useGame((s) => (s.screen === 'menu' ? 'classic' : artStyleOf(s.data.id)))
}
