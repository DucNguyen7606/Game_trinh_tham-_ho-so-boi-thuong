import { useEffect, useMemo, useRef, useState } from 'react'
import { Compiler, Story } from 'inkjs/full'
import { useGame } from '@/game/store'
import { clueById, getDocumentArt, getInkSource } from '@/game/caseLoader'
import { Lightbox } from '@/components/Lightbox'
import { Camera, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Portrait } from '@/art/Portrait'

interface Line {
  text: string
  fromPlayer?: boolean
  /** Clue id of a photo or paper the suspect shows with this line (ink tag `#photo:X3`). */
  photo?: string
}

export default function InterrogationScreen() {
  const { data, activeSuspect, foundClues, go, pinClue } = useGame()
  const [zoomed, setZoomed] = useState<string | null>(null)
  const suspect = data.suspects.find((s) => s.id === activeSuspect)

  const story = useMemo(() => {
    if (!suspect?.interrogation) return null
    const source = getInkSource(data.id, suspect.interrogation)
    if (!source) return null
    const s = new Compiler(source).Compile() as Story
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

  if (!suspect || !story) {
    return <p className="p-6 text-muted-foreground">Không có kịch bản thẩm vấn cho người này.</p>
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
      <div className="mt-4 flex flex-col gap-2">
        {!typing && choices.map((c) => (
          <Button
            key={c.index}
            variant="outline"
            className="h-auto justify-start whitespace-normal py-2 text-left"
            onClick={() => {
              story.ChooseChoiceIndex(c.index)
              advance(story, [{ text: c.text, fromPlayer: true }])
            }}
          >
            {c.text}
          </Button>
        ))}
        {!typing && choices.length === 0 && <Button onClick={() => go('desk')}>Về bàn làm việc</Button>}
      </div>
      </div>
      {zoomed && (() => {
        const Doc = getDocumentArt(data.id, zoomed)
        const clue = clueById(data, zoomed)
        return Doc !== undefined && clue ? (
          <Lightbox
            label={clue.title}
            onClose={() => setZoomed(null)}
            note={
              <>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Ảnh {suspect.name} cho xem · {clue.id}</p>
                <h3 className="title text-xl">{clue.title}</h3>
                <p className="text-sm">{clue.description}</p>
                <p className="text-xs opacity-70">Đã thêm thẻ {clue.id} lên bàn suy luận.</p>
              </>
            }
          >
            <div className="w-[260px] py-4" style={{ zoom: 1.9 }}>
              <Doc />
            </div>
          </Lightbox>
        ) : null
      })()}
    </div>
  )
}

/** A photo the suspect hands over, shown under their line; click to enlarge. */
function ShownPhoto({ clueId, onOpen }: { clueId: string; onOpen: () => void }) {
  const { data } = useGame()
  const Doc = getDocumentArt(data.id, clueId)
  const clue = clueById(data, clueId)
  if (!Doc || !clue) return null
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      className="group mt-3 flex items-end gap-3 text-left [animation:fadeIn_.4s_ease]"
      aria-label={`Xem ${clue.title}`}
    >
      <div className="w-[260px] origin-bottom-left transition group-hover:-translate-y-1 group-hover:rotate-[-1deg]" style={{ zoom: 0.72 }}>
        <Doc />
      </div>
      <span className="space-y-1 pb-2 text-xs not-italic">
        <span className="flex items-center gap-1 text-amber">
          <Camera className="size-3.5" /> Thẻ {clue.id} đã lên bàn suy luận
        </span>
        <span className="flex items-center gap-1 text-muted-foreground group-hover:text-amber">
          <Maximize2 className="size-3.5" /> Bấm để xem lớn
        </span>
      </span>
    </button>
  )
}
