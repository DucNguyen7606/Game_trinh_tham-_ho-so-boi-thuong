import { getInkSource } from './caseLoader'
import type { TranscriptSession } from './store'

/** One question the player can put to a suspect, read from the ink script. */
interface Topic {
  text: string
  /** Clue ids the question needs (`{has_P7}`), all of which must be found. */
  needs: string[]
  /** `{has_X1 || has_X5}`: any one of `needs` is enough. */
  any?: boolean
}

const cache = new Map<string, Topic[]>()

/**
 * Lists a script's questions, skipping the goodbye choice (the one that goes to END).
 * Scripts write questions as `* {has_X} [text]` followed by the reply and a divert.
 */
function topics(caseId: string, script: string): Topic[] {
  const key = `${caseId}/${script}`
  const hit = cache.get(key)
  if (hit) return hit
  const src = getInkSource(caseId, script) ?? ''
  const lines = src.split('\n')
  const out: Topic[] = []
  lines.forEach((line, i) => {
    const m = line.match(/^\s*\*\s*(?:\{([^}]*)\})?\s*\[([^\]]*)\]/)
    if (!m) return
    // The body runs until the next choice; a goodbye choice ends the story.
    let j = i + 1
    while (j < lines.length && !/^\s*\*/.test(lines[j]) && !/^\s*===/.test(lines[j])) j++
    if (lines.slice(i + 1, j).some((l) => /->\s*END/.test(l))) return
    const cond = m[1] ?? ''
    // A question gated on something said earlier in the same interview (`{vo_gio && vo_tien}`)
    // only appears mid-conversation, so it is not counted as waiting to be asked.
    if (/\b(?!has_)[a-z]\w*\b/i.test(cond.replace(/\b(not|and|or)\b/g, ''))) return
    const needs = [...cond.matchAll(/has_(\w+)/g)].map((x) => x[1])
    out.push({ text: m[2].trim(), needs, any: cond.includes('||') })
  })
  cache.set(key, out)
  return out
}

/** How many questions are open to ask right now and have not been asked in any earlier interview. */
export function unaskedCount(caseId: string, script: string, foundClues: string[], sessions: TranscriptSession[] = []) {
  const asked = new Set(sessions.flatMap((s) => s.lines.filter((l) => l.fromPlayer).map((l) => l.text.trim())))
  return topics(caseId, script).filter((t) => (t.any ? t.needs.some((c) => foundClues.includes(c)) : t.needs.every((c) => foundClues.includes(c))) && !asked.has(t.text)).length
}
