import { SERIES } from './series'

/**
 * Chapters open one after another: the first playable chapter is always open, and each
 * next one opens once the one before it has been closed (Đóng hồ sơ on its ending card).
 */
export function unlockedCases(closed: string[]): Set<string> {
  const open = new Set<string>()
  let prevClosed = true
  for (const c of SERIES.chapters) {
    if (!c.caseId) continue
    if (prevClosed || closed.includes(c.caseId)) open.add(c.caseId)
    prevClosed = closed.includes(c.caseId)
  }
  return open
}

/** The chapter that has to be closed before this one opens. */
export function chapterBefore(caseId: string) {
  const playable = SERIES.chapters.filter((c) => c.caseId)
  const at = playable.findIndex((c) => c.caseId === caseId)
  return at > 0 ? playable[at - 1] : undefined
}
