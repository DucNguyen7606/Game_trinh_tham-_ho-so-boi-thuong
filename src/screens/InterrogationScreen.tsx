import { useEffect, useMemo, useRef, useState } from 'react'
import { Compiler, Story } from 'inkjs/full'
import { useGame, type TranscriptLine } from '@/game/store'
import { getInkSource } from '@/game/caseLoader'
import { PhotoLightbox, ShownPhoto } from '@/components/SuspectPhoto'
import { Button } from '@/components/ui/button'
import { Portrait } from '@/art/Portrait'
import { addressInk, useProfile } from '@/series/profile'
import { useArtStyle } from '@/art/iso/style'
import { InterviewRoom } from '@/art/iso/rooms'
import { cn } from '@/lib/utils'

// A line can carry a photo the suspect shows (ink tag `#photo:X3`).
type Line = TranscriptLine

export default function InterrogationScreen() {
  const { data, activeSuspect, foundClues, go, pinClue, saveTranscript } = useGame()
  // Questions asked in earlier interviews, marked so the player can skip them.
  const [askedBefore] = useState(() => {
    const sessions = useGame.getState().transcripts[activeSuspect ?? ''] ?? []
    return new Set(sessions.slice(0, -1).flatMap((x) => x.lines.filter((l) => l.fromPlayer).map((l) => l.text.trim())))
  })
  const [zoomed, setZoomed] = useState<string | null>(null)
  const style = useArtStyle()
  const suspect = data.suspects.find((s) => s.id === activeSuspect)

  const story = useMemo(() => {
    if (!suspect?.interrogation) return null
    const source = getInkSource(data.id, suspect.interrogation)
    if (!source) return null
    // How people address the investigator ({xco}, {xchi}…) depends on the chosen character.
    const s = new Compiler(`${addressInk(useProfile.getState().gender)}\n${source}`).Compile() as Story
    // Scripts declare `VAR has_<clue> = false` for each clue that opens a new line of questioning.
    for (const clue of data.clues) {
      const name = `has_${clue.id}`
      if (s.variablesState.GlobalVariableExistsWithName(name)) {
        s.variablesState.$(name, foundClues.includes(clue.id))
      }
    }
    return s
    // Only rebuild when a different person is questioned.
  }, [suspect?.id])

  const [lines, setLines] = useState<Line[]>([])
  // Lines are revealed one at a time; `shown` lines are complete, the next one is being typed.
  const [shown, setShown] = useState(0)
  const [chars, setChars] = useState(0)
  const current = lines[shown]
  const typing = Boolean(current)
  // Quoted lines are speech; the rest is narration, during which the suspect stays quiet.
  const isSpeech = (l: Line) => !l.fromPlayer && /^["“]/.test(l.text)
  const talking = typing && isSpeech(current)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!current) return
    if (current.fromPlayer || chars >= current.text.length) {
      // Short pause between lines, a little longer after the suspect speaks.
      const t = setTimeout(() => {
        setShown((n) => n + 1)
        setChars(0)
      }, current.fromPlayer ? 250 : 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setChars((c) => c + 2), 28)
    return () => clearTimeout(t)
  }, [current, chars])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [shown, chars])

  /** Click anywhere in the dialogue to finish the line being typed. */
  const skip = () => {
    if (current && !current.fromPlayer) setChars(current.text.length)
  }
  const [choices, setChoices] = useState<{ index: number; text: string }[]>([])

  const advance = (s: Story, prefix: Line[] = []) => {
    const out = [...prefix]
    while (s.canContinue) {
      const t = s.Continue()?.trim()
      const photo = s.currentTags
        ?.map((tag) => tag.trim())
        .find((tag) => tag.startsWith('photo:'))
        ?.slice('photo:'.length)
        .trim()
      if (t) out.push({ text: t, photo })
      // Whatever a suspect shows you becomes a card on the board.
      if (photo) pinClue(photo)
    }
    setLines((prev) => [...prev, ...out])
    setChoices(s.currentChoices.map((c) => ({ index: c.index, text: c.text })))
  }

  useEffect(() => {
    setLines([])
    setShown(0)
    setChars(0)
    if (story) advance(story)
  }, [story])

  // Keep the interview on record so it can be reread from the desk.
  useEffect(() => {
    if (suspect && lines.length) saveTranscript(suspect.id, lines)
  }, [lines])

  if (!suspect || !story) {
    return <p className="p-6 text-muted-foreground">Không có kịch bản thẩm vấn cho người này.</p>
  }

  const choiceButtons = !typing && (
    <>
      {choices.map((c) => (
        <Button
          key={c.index}
          variant="outline"
          className={cn('h-auto justify-start whitespace-normal py-2 text-left', style === 'sa-ban' && 'bg-white px-5 shadow-sm hover:bg-[#fbe7dc]')}
          onClick={() => {
            story.ChooseChoiceIndex(c.index)
            advance(story, [{ text: c.text, fromPlayer: true }])
          }}
        >
          <span className={askedBefore.has(c.text.trim()) ? 'opacity-55' : ''}>{c.text}</span>
          {askedBefore.has(c.text.trim()) && <span className="ml-auto pl-2 text-[11px] text-muted-foreground">đã hỏi</span>}
        </Button>
      ))}
      {choices.length === 0 && <Button onClick={() => go('desk')}>Về bàn làm việc</Button>}
    </>
  )

  if (style === 'sa-ban') {
    // Diorama style: the interview room fills the left, the conversation runs as chat bubbles on the right.
    return (
      <div className="grid h-full grid-cols-[1fr_min(560px,40%)] gap-4 p-4">
        <div className="relative min-h-0 overflow-hidden rounded-[28px] shadow-[0_14px_40px_rgb(46_42_74/0.18)]">
          {suspect.portrait && <InterviewRoom spec={suspect.portrait} talking={talking} label={`Phòng hỏi chuyện với ${suspect.name}`} />}
          <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full bg-white/90 py-1.5 pl-1.5 pr-5 shadow-md">
            <div className="size-12 overflow-hidden rounded-full">
              {suspect.portrait && <Portrait spec={suspect.portrait} size={48} />}
            </div>
            <div>
              <p className="title text-lg leading-tight">{suspect.name}</p>
              <p className="text-xs text-muted-foreground">{suspect.role}</p>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-col">
          <div ref={scrollRef} className="flex flex-1 cursor-default flex-col gap-2.5 overflow-auto pr-1 pt-1" onClick={skip}>
            {lines.slice(0, shown + 1).map((l, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[88%] text-[15px] leading-relaxed',
                  l.fromPlayer
                    ? 'self-end rounded-[20px] rounded-br-md bg-primary px-4 py-2 text-primary-foreground shadow-sm'
                    : isSpeech(l)
                      ? 'self-start rounded-[20px] rounded-bl-md bg-white px-4 py-2 shadow-[0_4px_14px_rgb(46_42_74/0.1)]'
                      : 'self-center px-2 text-center text-sm italic text-muted-foreground',
                )}
              >
                {i === shown ? l.text.slice(0, l.fromPlayer ? undefined : chars) : l.text}
                {i === shown && !l.fromPlayer && <span className="ml-0.5 inline-block w-2 animate-pulse text-primary">▍</span>}
                {l.photo && i < shown && <ShownPhoto clueId={l.photo} onOpen={() => setZoomed(l.photo!)} />}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2">{choiceButtons}</div>
        </div>
        {zoomed && <PhotoLightbox clueId={zoomed} shownBy={suspect.name} onClose={() => setZoomed(null)} />}
      </div>
    )
  }

  return (
    <div className="mx-auto grid h-full max-w-5xl grid-cols-[280px_1fr] gap-8 p-6">
      <div>
        {suspect.portrait && <Portrait spec={suspect.portrait} size={280} live talking={talking} className="rounded-md shadow-[0_10px_30px_rgb(0_0_0/0.5)]" />}
        <h2 className="title mt-3 text-2xl text-amber">{suspect.name}</h2>
        <p className="text-sm text-muted-foreground">{suspect.role}</p>
      </div>
      <div className="flex min-h-0 flex-col">
      <div ref={scrollRef} className="mt-4 flex-1 cursor-default space-y-3 overflow-auto" onClick={skip}>
        {lines.slice(0, shown + 1).map((l, i) => (
          <p key={i} className={l.fromPlayer ? 'text-right text-primary' : isSpeech(l) ? '' : 'italic text-muted-foreground'}>
            {i === shown ? l.text.slice(0, l.fromPlayer ? undefined : chars) : l.text}
            {i === shown && !l.fromPlayer && <span className="ml-0.5 inline-block w-2 animate-pulse text-amber">▍</span>}
            {l.photo && i < shown && <ShownPhoto clueId={l.photo} onOpen={() => setZoomed(l.photo!)} />}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">{choiceButtons}</div>
      </div>
      {zoomed && <PhotoLightbox clueId={zoomed} shownBy={suspect.name} onClose={() => setZoomed(null)} />}
    </div>
  )
}
