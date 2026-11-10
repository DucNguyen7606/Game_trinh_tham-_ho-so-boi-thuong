import { create } from 'zustand'
import type { ActionKind, CaseData, DayLimits } from './types'
import { cases } from './caseLoader'

export type Screen = 'desk' | 'scene' | 'casefile' | 'board' | 'interrogation' | 'verdict' | 'gallery'

export interface BoardAnswer {
  optionId?: string
  clueIds: string[]
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
  isEnvelopeOpen: (envelopeId: string) => boolean
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
  activeSuspect: undefined as string | undefined,
  log: [] as string[],
})

const addUnique = (list: string[], id: string) => (list.includes(id) ? list : [...list, id])

export const useGame = create<GameState>((set, get) => ({
  ...initial(cases[0]),

  go: (screen) => set({ screen }),

  spendAction: (kind, what) => {
    const { left, log, day } = get()
    if (left[kind] <= 0) return false
    set({ left: { ...left, [kind]: left[kind] - 1 }, log: [...log, `Ngày ${day}: ${what}`] })
    return true
  },

  endDay: () => {
    const { day, data, reputation } = get()
    if (day >= data.days) {
      set({ screen: 'verdict' })
      return
    }
    // Low reputation with the boss costs one interview the next day.
    const penalty = reputation <= 1 ? 1 : 0
    const limits = data.limitsPerDay
    set({ day: day + 1, left: { ...limits, talk: Math.max(0, limits.talk - penalty) } })
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
    if (!get().spendAction('talk', `Hỏi ${s?.name ?? suspectId}`)) return false
    set({ activeSuspect: suspectId, screen: 'interrogation' })
    return true
  },

  isEnvelopeOpen: (envelopeId) => {
    const env = get().data.envelopes.find((e) => e.id === envelopeId)
    if (!env) return false
    return env.unlockedBy === null || get().solvedQuestions.includes(env.unlockedBy)
  },

  reset: () => set(initial(get().data)),
}))
