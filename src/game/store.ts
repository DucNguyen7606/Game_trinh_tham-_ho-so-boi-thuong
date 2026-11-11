import { create } from 'zustand'
import type { ActionKind, CaseData, DayLimits } from './types'
import { cases } from './caseLoader'

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
  /** Where the player left each card on the board, and the board's pan and zoom, kept across tabs. */
  boardLayout: Record<string, { x: number; y: number }>
  boardViewport?: { x: number; y: number; zoom: number }
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
  showHint: (questionId: string) => void
  saveBoardLayout: (positions: Record<string, { x: number; y: number }>) => void
  saveBoardViewport: (viewport: { x: number; y: number; zoom: number }) => void
  isEnvelopeOpen: (envelopeId: string) => boolean
  /**
   * A question appears on the board only once every document it needs is reachable,
   * i.e. the envelopes holding its required clues are open. Scene clues are always reachable.
   */
  isQuestionOpen: (questionId: string) => boolean
  reset: () => void
}

const initial = (data: CaseData) => ({
  data,
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
  boardLayout: {} as Record<string, { x: number; y: number }>,
  boardViewport: undefined as { x: number; y: number; zoom: number } | undefined,
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
    set((s) => ({ checkedLinks: { ...s.checkedLinks, [questionId]: [...a.clueIds] } }))
    const hasAllClues = q.requiredClues.every((c) => a.clueIds.includes(c))
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

  saveBoardLayout: (positions) => set((st) => ({ boardLayout: { ...st.boardLayout, ...positions } })),
  saveBoardViewport: (viewport) => set({ boardViewport: viewport }),

  showHint: (questionId) =>
    set((st) => {
      const q = st.data.questions.find((x) => x.id === questionId)
      const max = q?.hints?.length ?? 0
      return { hintLevel: { ...st.hintLevel, [questionId]: Math.min(max, (st.hintLevel[questionId] ?? 0) + 1) } }
    }),

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
}))
