/**
 * Connects the audio system to the game without touching the screens:
 * music follows the current screen and sound effects follow state changes
 * in the game store, plus a few DOM gestures (buttons, drags, red string).
 */
import { useGame, type Screen } from '@/game/store'
import { gameAudio } from './engine'
import './settings'
import type { ThemeId } from './themes'

const THEME_FOR: Record<Screen, ThemeId> = {
  menu: 'menu',
  desk: 'desk',
  casefile: 'desk',
  board: 'desk',
  scene: 'scene',
  interrogation: 'interrogation',
  verdict: 'verdict',
  gallery: 'desk',
}

const grew = (a: unknown[], b: unknown[]) => a.length > b.length
const linkCount = (answers: Record<string, { clueIds: string[] }>) =>
  Object.values(answers).reduce((n, a) => n + a.clueIds.length, 0)

let bound = false

export function bindGameAudio() {
  if (bound) return
  bound = true

  gameAudio.playTheme(THEME_FOR[useGame.getState().screen])

  useGame.subscribe((s, p) => {
    if (s.screen !== p.screen) gameAudio.playTheme(THEME_FOR[s.screen])

    if (grew(s.foundClues, p.foundClues)) {
      // Photographing at the scene, pinning in the case file, noting in an interview.
      if (s.screen === 'scene') gameAudio.sfx('shutter')
      else if (s.screen === 'interrogation') gameAudio.sfx('pen')
      else gameAudio.sfx('pin')
    }
    if (grew(s.readDocuments, p.readDocuments)) gameAudio.sfx('pageTurn')
    if (grew(s.visitedZones, p.visitedZones)) gameAudio.sfx('footsteps')
    if (s.day > p.day) gameAudio.sfx('stamp')

    const links = linkCount(s.answers)
    const before = linkCount(p.answers)
    if (links > before) gameAudio.sfx('stringConnect')
    else if (links < before) gameAudio.sfx('stringCut')

    if (grew(s.solvedQuestions, p.solvedQuestions)) {
      const fresh = s.solvedQuestions.filter((q) => !p.solvedQuestions.includes(q))
      if (s.data.envelopes.some((e) => e.unlockedBy && fresh.includes(e.unlockedBy))) gameAudio.sfx('envelopeOpen', 1.1)
    }
  })

  // checkAnswer's verdict isn't kept in state, so listen at the action itself.
  const checkAnswer = useGame.getState().checkAnswer
  useGame.setState({
    checkAnswer: (id) => {
      const result = checkAnswer(id)
      gameAudio.sfx(result === 'solved' ? 'correct' : result === 'wrong' ? 'wrong' : 'missing')
      return result
    },
  })

  let dragging = false
  window.addEventListener(
    'pointerdown',
    (e) => {
      gameAudio.unlock()
      const el = e.target as HTMLElement | null
      if (!el?.closest) return
      if (el.closest('.react-flow__handle')) gameAudio.sfx('stringPull')
      else if (el.closest('[aria-roledescription="draggable"], .react-flow__node')) {
        dragging = true
        gameAudio.sfx('paperPick')
      } else if (el.closest('button:not(:disabled)')) {
        // Interview answers sound like typing; everything else is a soft tap.
        gameAudio.sfx(useGame.getState().screen === 'interrogation' ? 'typewriter' : 'click')
      }
    },
    true,
  )
  window.addEventListener(
    'pointerup',
    () => {
      if (dragging) gameAudio.sfx('paperDrop')
      dragging = false
    },
    true,
  )
  window.addEventListener('keydown', () => gameAudio.unlock(), true)
}
