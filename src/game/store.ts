import { create } from 'zustand'
import type { ActionKind, CaseData, DayLimits } from './types'
import { cases } from './caseLoader'
import { playerOf, useProfile } from '@/series/profile'

export type Screen = 'menu' | 'desk' | 'scene' | 'casefile' | 'board' | 'interrogation' | 'verdict' | 'gallery'

export interface BoardAnswer {
  optionId?: string
  clueIds: string[]
}

/** One line of an interview as it was shown: the suspect's words, narration, or the player's question. */
export interface TranscriptLine {
  text: string
  fromPlayer?: boolean
  /** Clue id of a photo the suspect showed with this line. */
  photo?: string
}

/** One interview with a suspect, kept so the player can reread it from the desk. */
export interface TranscriptSession {
  day: number
  lines: TranscriptLine[]
}

interface GameState {
  data: CaseData
  screen: Screen
  day: number
  /** What is left of today's limits: people to question and zones to search. */
  left: DayLimits
  reputation: number
  visitedZones: string[]
  inspectedHotspots: string[]
  foundClues: string[]
  readDocuments: string[]
  solvedQuestions: string[]
  answers: Record<string, BoardAnswer>
  /** Per question, the cards that were linked when the player last pressed Kiểm tra. Their strings turn green or red. */
  checkedLinks: Record<string, string[]>
  transcripts: Record<string, TranscriptSession[]>
  /** How many hints of each question the player has seen. */
  hintLevel: Record<string, number>
  /**
   * Per question, what the player had proven when they took their last hint: the cards
   * whose strings had turned green, and how many checks they had made. The next hint
   * opens only once the board moves past this (see hintGate).
   */
  hintBasis: Record<string, { matched: string[]; checks: number }>
  /** How many times the player pressed Kiểm tra on each question. */
  checkCount: Record<string, number>
  /** Where the player left each card on the board, and the board's pan and zoom, kept across tabs. */
  boardLayout: Record<string, { x: number; y: number }>
  boardViewport?: { x: number; y: number; zoom: number }
  /** Per document, what the player has marked with the highlighter: key phrases and their own marks. */
  marks: Record<string, string[]>
  /** The highlighter pen is in hand: dragging over a document's words marks them. */
  pen: boolean
  setPen: (on: boolean) => void
  solvedPuzzles: string[]
  /** Per puzzle, wrong attempts so far, and how many hints were seen and at how many attempts the last one opened. */
  puzzleAttempts: Record<string, number>
  puzzleHints: Record<string, { level: number; attempts: number }>
  activeSuspect?: string
  log: string[]

  go: (screen: Screen) => void
  /** Spends one action of a kind. Returns false (and does nothing) when today's limit for it is used up. */
  spendAction: (kind: ActionKind, what: string) => boolean
  endDay: () => void
  visitZone: (zoneId: string) => boolean
  inspectHotspot: (hotspotId: string, clueId?: string) => void
  pinClue: (clueId: string) => void
  markRead: (clueId: string) => void
  setAnswerOption: (questionId: string, optionId: string) => void
  linkClue: (questionId: string, clueId: string) => void
  unlinkClue: (questionId: string, clueId: string) => void
  checkAnswer: (questionId: string) => 'solved' | 'wrong' | 'missing-clues'
  startInterrogation: (suspectId: string) => boolean
  /** Replaces the lines of the suspect's latest interview (the one in progress). */
  saveTranscript: (suspectId: string, lines: TranscriptLine[]) => void
  /** Opens the question's next hint if hintGate allows it. Returns whether one opened. */
  showHint: (questionId: string) => boolean
  /**
   * Marks a stretch of a document and pins its card to the board. A stroke that covers most
   * of a key phrase snaps to the whole phrase. Returns the phrase it snapped to, if any.
   */
  markText: (clueId: string, text: string) => string | undefined
  /** Checks a puzzle answer (kind answer) or a click on its picture (kind spots, x/y in percent). */
  tryPuzzle: (puzzleId: string, attempt: string | { x: number; y: number }) => 'solved' | 'found' | 'wrong'
  /** Spots found so far on a spots puzzle. */
  foundSpots: Record<string, string[]>
  showPuzzleHint: (puzzleId: string) => boolean
  saveBoardLayout: (positions: Record<string, { x: number; y: number }>) => void
  saveBoardViewport: (viewport: { x: number; y: number; zoom: number }) => void
  isEnvelopeOpen: (envelopeId: string) => boolean
  /**
   * A question appears on the board only once every document it needs is reachable,
   * i.e. the envelopes holding its required clues are open. Scene clues are always reachable.
   */
  isQuestionOpen: (questionId: string) => boolean
  reset: () => void
  /** Opens a chapter's case from the start, dropping any progress in the current one. */
  startCase: (caseId: string) => void
}

/** The case as the chosen investigator plays it: their name, job and portrait in place of the case's default. */
const withPlayer = (data: CaseData): CaseData => ({ ...data, player: playerOf(useProfile.getState()) })

const initial = (data: CaseData) => ({
  data: withPlayer(data),
  screen: 'desk' as Screen,
  day: 1,
  left: { ...data.limitsPerDay },
  reputation: 3,
  visitedZones: [] as string[],
  inspectedHotspots: [] as string[],
  foundClues: [] as string[],
  readDocuments: [] as string[],
  solvedQuestions: [] as string[],
  answers: {} as Record<string, BoardAnswer>,
  checkedLinks: {} as Record<string, string[]>,
  transcripts: {} as Record<string, TranscriptSession[]>,
  hintLevel: {} as Record<string, number>,
  hintBasis: {} as Record<string, { matched: string[]; checks: number }>,
  checkCount: {} as Record<string, number>,
  boardLayout: {} as Record<string, { x: number; y: number }>,
  boardViewport: undefined as { x: number; y: number; zoom: number } | undefined,
  marks: {} as Record<string, string[]>,
  pen: false,
  solvedPuzzles: [] as string[],
  puzzleAttempts: {} as Record<string, number>,
  puzzleHints: {} as Record<string, { level: number; attempts: number }>,
  foundSpots: {} as Record<string, string[]>,
  activeSuspect: undefined as string | undefined,
  log: [] as string[],
})

/** Pure version of the envelope/question gates, for a given set of solved questions. */
function envelopeOpen(data: CaseData, envelopeId: string, solved: string[]) {
  const env = data.envelopes.find((e) => e.id === envelopeId)
  return Boolean(env && (env.unlockedBy === null || solved.includes(env.unlockedBy)))
}

function questionOpen(data: CaseData, questionId: string, solved: string[]) {
  const q = data.questions.find((x) => x.id === questionId)
  if (!q) return false
  return q.requiredClues.every((c) => {
    const env = data.envelopes.find((e) => e.documents.includes(c))
    return !env || envelopeOpen(data, env.id, solved)
  })
}

/**
 * Question ids in the order the player sees them appear on the board. The displayed
 * question number is the position in this list, so numbers always run 1, 2, 3…
 * whichever envelope the player opens first.
 */
export function questionOrder(data: CaseData, solvedInOrder: string[]) {
  const order = data.questions.filter((q) => questionOpen(data, q.id, [])).map((q) => q.id)
  solvedInOrder.forEach((_, i) => {
    const solved = solvedInOrder.slice(0, i + 1)
    for (const q of data.questions) if (!order.includes(q.id) && questionOpen(data, q.id, solved)) order.push(q.id)
  })
  return order
}

export type HintGate = 'available' | 'locked' | 'none-left'

/** Cards on a question whose string turned green at the last check: required or supporting clues. */
export function matchedClues(data: CaseData, checkedLinks: Record<string, string[]>, questionId: string) {
  const q = data.questions.find((x) => x.id === questionId)
  if (!q) return []
  const relevant = [...q.requiredClues, ...(q.supportingClues ?? [])]
  return (checkedLinks[questionId] ?? []).filter((c) => relevant.includes(c))
}

/**
 * One hint per step of progress. The first hint of a question is free; each further one opens
 * only after a check shows a new green string (a card that matches or relates to the question)
 * since the last hint. If every such card was already proven when the hint was taken, there is
 * nothing left to find, so one more check (a new attempt at the answer) opens the next hint.
 */
export function hintGate(
  st: Pick<GameState, 'data' | 'hintLevel' | 'hintBasis' | 'checkedLinks' | 'checkCount'>,
  questionId: string,
): HintGate {
  const q = st.data.questions.find((x) => x.id === questionId)
  const level = st.hintLevel[questionId] ?? 0
  if (!q || level >= (q.hints?.length ?? 0)) return 'none-left'
  const basis = st.hintBasis[questionId]
  if (level === 0 || !basis) return 'available'
  const matched = matchedClues(st.data, st.checkedLinks, questionId)
  if (matched.some((c) => !basis.matched.includes(c))) return 'available'
  const relevant = [...q.requiredClues, ...(q.supportingClues ?? [])]
  const nothingLeft = relevant.every((c) => basis.matched.includes(c))
  if (nothingLeft && (st.checkCount[questionId] ?? 0) > basis.checks) return 'available'
  return 'locked'
}

/** Lower case, no accents or spaces, "," read as ".": how puzzle answers and highlights are compared. */
export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/[\s"“”'‘’«»()]/g, '')
    .replace(/[.]+$/, '')
}

/** The puzzle that locks a clue, if any. */
export function puzzleFor(data: CaseData, clueId: string) {
  return data.puzzles?.find((p) => p.clueId === clueId)
}

/** A clue is locked while its puzzle is unsolved: its card is on the board but proves nothing. */
export function clueLocked(st: Pick<GameState, 'data' | 'solvedPuzzles'>, clueId: string) {
  const p = puzzleFor(st.data, clueId)
  return !!p && !st.solvedPuzzles.includes(p.id)
}

/**
 * Which key phrase a highlighter stroke hits: the stroke must cover the phrase, or most of it,
 * without running far past it (marking a whole page doesn't count).
 */
export function phraseHit(phrases: string[], text: string) {
  const t = normalize(text)
  if (!t) return undefined
  return phrases.find((p) => {
    const k = normalize(p)
    return (t.includes(k) && t.length <= k.length * 1.6 + 8) || (k.includes(t) && t.length >= k.length * 0.6)
  })
}

/** Puzzle hints: the first is free, each further one needs a new wrong attempt since the last. */
export function puzzleHintGate(st: Pick<GameState, 'data' | 'puzzleHints' | 'puzzleAttempts'>, puzzleId: string): HintGate {
  const p = st.data.puzzles?.find((x) => x.id === puzzleId)
  const seen = st.puzzleHints[puzzleId]
  const level = seen?.level ?? 0
  if (!p || level >= (p.hints?.length ?? 0)) return 'none-left'
  if (!seen || level === 0) return 'available'
  return (st.puzzleAttempts[puzzleId] ?? 0) > seen.attempts ? 'available' : 'locked'
}

/**
 * The hint count on the top bar: how many hints the player can open right now (one per
 * open question or puzzle whose gate allows it) and how many are left in the case in all.
 * Solved questions and puzzles, and questions not on the board yet, don't count.
 */
export function hintSummary(
  st: Pick<GameState, 'data' | 'solvedQuestions' | 'hintLevel' | 'hintBasis' | 'checkedLinks' | 'checkCount' | 'solvedPuzzles' | 'puzzleHints' | 'puzzleAttempts'>,
) {
  let now = 0
  let left = 0
  for (const q of st.data.questions) {
    if (st.solvedQuestions.includes(q.id) || !questionOpen(st.data, q.id, st.solvedQuestions)) continue
    left += Math.max(0, (q.hints?.length ?? 0) - (st.hintLevel[q.id] ?? 0))
    if (hintGate(st, q.id) === 'available') now++
  }
  for (const p of st.data.puzzles ?? []) {
    if (st.solvedPuzzles.includes(p.id)) continue
    left += Math.max(0, (p.hints?.length ?? 0) - (st.puzzleHints[p.id]?.level ?? 0))
    if (puzzleHintGate(st, p.id) === 'available') now++
  }
  return { now, left }
}

const addUnique = (list: string[], id: string) => (list.includes(id) ? list : [...list, id])

export const useGame = create<GameState>((set, get) => ({
  ...initial(cases[0]),
  // The game opens on the series' main menu; reset() later starts at the desk.
  screen: 'menu',

  go: (screen) => set({ screen }),

  spendAction: (kind, what) => {
    const { left, log, day } = get()
    if (left[kind] <= 0) return false
    set({ left: { ...left, [kind]: left[kind] - 1 }, log: [...log, `Ngày ${day}: ${what}`] })
    return true
  },

  endDay: () => {
    const { day, data } = get()
    if (day >= data.days) {
      set({ screen: 'verdict' })
      return
    }
    set({ day: day + 1, left: { ...data.limitsPerDay } })
  },

  visitZone: (zoneId) => {
    const { visitedZones, data } = get()
    if (visitedZones.includes(zoneId)) return true
    const zone = data.zones.find((z) => z.id === zoneId)
    if (!get().spendAction('explore', `Khám ${zone?.name ?? zoneId}`)) return false
    set({ visitedZones: [...get().visitedZones, zoneId] })
    return true
  },

  inspectHotspot: (hotspotId, clueId) =>
    set((s) => ({
      inspectedHotspots: addUnique(s.inspectedHotspots, hotspotId),
      foundClues: clueId ? addUnique(s.foundClues, clueId) : s.foundClues,
    })),

  pinClue: (clueId) => set((s) => ({ foundClues: addUnique(s.foundClues, clueId) })),

  markRead: (clueId) => set((s) => ({ readDocuments: addUnique(s.readDocuments, clueId) })),

  setAnswerOption: (questionId, optionId) =>
    set((s) => ({
      answers: { ...s.answers, [questionId]: { clueIds: s.answers[questionId]?.clueIds ?? [], optionId } },
    })),

  linkClue: (questionId, clueId) =>
    set((s) => {
      const current = s.answers[questionId] ?? { clueIds: [] }
      return { answers: { ...s.answers, [questionId]: { ...current, clueIds: addUnique(current.clueIds, clueId) } } }
    }),

  unlinkClue: (questionId, clueId) =>
    set((s) => {
      const current = s.answers[questionId] ?? { clueIds: [] }
      return {
        answers: { ...s.answers, [questionId]: { ...current, clueIds: current.clueIds.filter((c) => c !== clueId) } },
      }
    }),

  checkAnswer: (questionId) => {
    const { data, answers, solvedQuestions, reputation } = get()
    const q = data.questions.find((x) => x.id === questionId)
    const a = answers[questionId]
    if (!q || !a) return 'wrong'
    set((s) => ({
      checkedLinks: { ...s.checkedLinks, [questionId]: [...a.clueIds] },
      checkCount: { ...s.checkCount, [questionId]: (s.checkCount[questionId] ?? 0) + 1 },
    }))
    // A card whose puzzle is unsolved is on the board but proves nothing yet.
    const hasAllClues = q.requiredClues.every((c) => a.clueIds.includes(c) && !clueLocked(get(), c))
    if (a.optionId === q.correctOptionId && hasAllClues) {
      set({ solvedQuestions: addUnique(solvedQuestions, questionId) })
      return 'solved'
    }
    // Right answer without proof isn't penalised: the player is told evidence is missing.
    if (a.optionId === q.correctOptionId) return 'missing-clues'
    set({ reputation: Math.max(0, reputation - 1) })
    return 'wrong'
  },

  startInterrogation: (suspectId) => {
    const s = get().data.suspects.find((x) => x.id === suspectId)
    // Interviews are not rationed: the desk hides a suspect once they have nothing new to say.
    set((st) => ({ log: [...st.log, `Ngày ${st.day}: Hỏi ${s?.name ?? suspectId}`] }))
    set((st) => ({
      activeSuspect: suspectId,
      screen: 'interrogation',
      transcripts: { ...st.transcripts, [suspectId]: [...(st.transcripts[suspectId] ?? []), { day: st.day, lines: [] }] },
    }))
    return true
  },

  setPen: (on) => set({ pen: on }),

  markText: (clueId, text) => {
    const clue = get().data.clues.find((c) => c.id === clueId)
    const stroke = text.replace(/\s+/g, ' ').trim()
    if (!clue || !stroke) return undefined
    const hit = phraseHit(clue.highlights ?? [], stroke)
    set((s) => ({
      marks: { ...s.marks, [clueId]: addUnique(s.marks[clueId] ?? [], hit ?? stroke) },
      // Any mark pins the card, so marking never tells the player which words matter.
      foundClues: addUnique(s.foundClues, clueId),
    }))
    return hit
  },

  tryPuzzle: (puzzleId, attempt) => {
    const st = get()
    const p = st.data.puzzles?.find((x) => x.id === puzzleId)
    if (!p || st.solvedPuzzles.includes(p.id)) return 'solved'
    const miss = () => {
      set((s) => ({ puzzleAttempts: { ...s.puzzleAttempts, [p.id]: (s.puzzleAttempts[p.id] ?? 0) + 1 } }))
      return 'wrong' as const
    }
    const solve = () => {
      set((s) => ({ solvedPuzzles: addUnique(s.solvedPuzzles, p.id) }))
      return 'solved' as const
    }
    if (p.kind === 'answer') {
      if (typeof attempt !== 'string') return 'wrong'
      return (p.answers ?? []).some((a) => normalize(a) === normalize(attempt)) ? solve() : miss()
    }
    if (typeof attempt === 'string') return 'wrong'
    const spot = (p.spots ?? []).find((sp) => Math.hypot(sp.x - attempt.x, sp.y - attempt.y) <= (sp.r ?? 6))
    if (!spot) return miss()
    const found = addUnique(st.foundSpots[p.id] ?? [], spot.label)
    set((s) => ({ foundSpots: { ...s.foundSpots, [p.id]: found } }))
    return found.length >= (p.spots ?? []).length ? solve() : 'found'
  },

  showPuzzleHint: (puzzleId) => {
    const st = get()
    if (puzzleHintGate(st, puzzleId) !== 'available') return false
    set((s) => ({
      puzzleHints: {
        ...s.puzzleHints,
        [puzzleId]: { level: (s.puzzleHints[puzzleId]?.level ?? 0) + 1, attempts: s.puzzleAttempts[puzzleId] ?? 0 },
      },
    }))
    return true
  },

  saveBoardLayout: (positions) => set((st) => ({ boardLayout: { ...st.boardLayout, ...positions } })),
  saveBoardViewport: (viewport) => set({ boardViewport: viewport }),

  showHint: (questionId) => {
    const st = get()
    if (hintGate(st, questionId) !== 'available') return false
    set({
      hintLevel: { ...st.hintLevel, [questionId]: (st.hintLevel[questionId] ?? 0) + 1 },
      hintBasis: {
        ...st.hintBasis,
        [questionId]: { matched: matchedClues(st.data, st.checkedLinks, questionId), checks: st.checkCount[questionId] ?? 0 },
      },
    })
    return true
  },

  saveTranscript: (suspectId, lines) =>
    set((st) => {
      const sessions = st.transcripts[suspectId] ?? []
      if (sessions.length === 0) return {}
      const last = { ...sessions[sessions.length - 1], lines }
      return { transcripts: { ...st.transcripts, [suspectId]: [...sessions.slice(0, -1), last] } }
    }),

  isEnvelopeOpen: (envelopeId) => envelopeOpen(get().data, envelopeId, get().solvedQuestions),

  isQuestionOpen: (questionId) => questionOpen(get().data, questionId, get().solvedQuestions),

  reset: () => set(initial(get().data)),

  startCase: (caseId) => set(initial(cases.find((c) => c.id === caseId) ?? get().data)),
}))

// A new or edited character takes over the case in progress too.
useProfile.subscribe(() => useGame.setState((s) => ({ data: withPlayer(s.data) })))
