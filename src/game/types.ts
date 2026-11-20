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
  /**
   * Key phrases of this document. Each must be copied exactly from `description`. Any
   * highlighter mark pins the card to the board and is quoted on it; a stroke that covers
   * most of a key phrase snaps to the whole phrase, so the quote reads cleanly.
   */
  highlights?: string[]
  /** A recording that goes with this document: played on the reading desk, with its transcript. */
  audio?: AudioEvidence
}

export interface AudioEvidence {
  /** File name in src/cases/<case>/am-thanh/. Absent until recorded: the transcript is read aloud by the system voice. */
  src?: string
  /** Length shown on the player, like "0:24". */
  length?: string
  /** The transcript, one line per speaker turn. Always given, so the case plays without sound. */
  lines: { who?: string; text: string }[]
}

/**
 * A decoding puzzle that locks one clue. Until it is solved, the clue's document shows
 * `lockedText` in place of its description, and its card does not count as proof on the board.
 */
export interface Puzzle {
  id: string
  /** The clue this puzzle unlocks. */
  clueId: string
  title: string
  /** What the player is asked to work out, shown above the answer box or picture. */
  prompt: string
  /** What the locked document shows instead of its description: the raw codes or numbers. */
  lockedText: string
  /**
   * answer = type a value (a code, a sum, a time, a name); spots = click every listed spot
   * on the clue's document picture.
   */
  kind: 'answer' | 'spots'
  /** kind answer: accepted answers. Case, accents, spaces and "," vs "." are ignored when comparing. */
  answers?: string[]
  /** kind answer: a unit or hint shown in the box, like "tấn" or "hh:mm". */
  placeholder?: string
  /** kind spots: where to click on the document picture, in percent of its width/height; r is the radius in percent of width. */
  spots?: { x: number; y: number; r?: number; label: string }[]
  /** Shown once solved: what the player has worked out. */
  solvedText: string
  /** First hint is free; each further one opens after a new wrong attempt since the last hint. */
  hints?: string[]
}

/** One line of the case's true timeline, shown with the ending. */
export interface TimelineEntry {
  /** Date and/or time as written in the case, like "14/7 01:02". */
  time: string
  text: string
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
  /**
   * How many of the supporting cards ("Liên quan") must also be linked for the answer to be
   * accepted. Defaults to 1 when the question has supporting cards, 0 when it has none.
   */
  supportingNeeded?: number
  /** Nudges shown one at a time above the question: after a failed check, or when the player asks. */
  hints?: string[]
}

export interface Suspect {
  id: string
  name: string
  age: number
  role: string
  /** Key of the ink script in the case's thamvan folder, if the player can question them. */
  interrogation?: string
  portrait?: PortraitSpec
  /** Shown instead of the interview button for someone who can't be questioned. */
  unavailable?: string
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

/**
 * How the verdict picks map to an ending. Rules are tried in order and the first
 * that matches wins: every slot in `picks` must have that option, and every slot
 * in `correct` must hold its correct option. A rule with neither always matches.
 */
export interface EndingRule {
  ending: string
  picks?: Record<string, string>
  correct?: string[]
}

export interface CaseData {
  id: string
  /** How the case is drawn: 'sa-ban' is the isometric diorama style (src/art/iso). Default 'classic'. */
  artStyle?: 'classic' | 'sa-ban'
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
  endingRules: EndingRule[]
  /** Decoding puzzles, each locking one clue (see Puzzle). */
  puzzles?: Puzzle[]
  /** The true events in order, shown after the verdict as "Tóm tắt dòng thời gian". */
  timeline?: TimelineEntry[]
  /** Date printed on scene photos, like "15 07 '25". */
  photoDate?: string
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
