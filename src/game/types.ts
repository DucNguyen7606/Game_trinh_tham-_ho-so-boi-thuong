import type { PortraitSpec } from '@/art/Portrait'

// Data shapes for a case. A new case is a new folder of JSON + .ink files;
// nothing in the engine should need to change.

/** testimony = something a suspect shows during an interview, like photos on their phone. */
export type ClueSource = 'scene' | 'file' | 'decoy' | 'testimony'

export interface Clue {
  id: string // the code used everywhere: H1, P7, X2...
  title: string
  description: string
  source: ClueSource
}

export interface Hotspot {
  id: string
  label: string
  /** Position on the zone image, in percent of width/height. */
  x: number
  y: number
  /** Text shown when the player inspects it. */
  note: string
  /** If set, inspecting adds this clue to the board. Empty hotspots are deliberate noise. */
  clueId?: string
}

export interface Zone {
  id: string
  name: string
  description: string
  hotspots: Hotspot[]
}

export interface Envelope {
  id: string
  number: number
  title: string
  /** Question that must be solved to open it; null = open from the start. */
  unlockedBy: string | null
  documents: string[] // clue ids
}

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  /** Author's order in the case file. The board shows numbers in the order questions appear (see questionOrder). */
  number: number
  prompt: string
  options: QuestionOption[]
  correctOptionId: string
  /** Clues that must be pinned to this question for the answer to be accepted. */
  requiredClues: string[]
  /** Cards that also back the answer: their strings turn green, but they are not needed to solve it. */
  supportingClues?: string[]
}

export interface Suspect {
  id: string
  name: string
  age: number
  role: string
  /** Key of the ink script in the case's thamvan folder, if the player can question them. */
  interrogation?: string
  portrait?: PortraitSpec
  profile?: SuspectProfile
}

export interface SuspectProfile {
  traits: string[]
  habit: string
  relation: string
  quote: string
  /** The investigator's own note: why this person matters to the case. */
  note: string
}

export interface VerdictSlot {
  id: string
  prompt: string
  options: QuestionOption[]
  correctOptionId: string
}

export interface Ending {
  id: string
  title: string
  text: string
}

export interface CaseData {
  id: string
  title: string
  intro: string
  player: { name: string; role: string; portrait?: PortraitSpec }
  days: number
  /** How many people you can question and how many zones you can search each day. */
  limitsPerDay: DayLimits
  suspects: Suspect[]
  zones: Zone[]
  clues: Clue[]
  envelopes: Envelope[]
  questions: Question[]
  verdict: VerdictSlot[]
  endings: Ending[]
}

export type ActionKind = 'talk' | 'explore'
export type DayLimits = Record<ActionKind, number>

/** One step of the reconstruction shown after the verdict. */
export interface ReconstructionPanel {
  /** theory = the player's own verdict told as a story; refute = evidence against a wrong pick; truth = what happened. */
  kind?: 'theory' | 'refute' | 'truth'
  time: string
  title: string
  text: string
  /** The board question that proves this step; used to show whether the player worked it out. */
  questionId?: string
  Art: () => JSX.Element
}
