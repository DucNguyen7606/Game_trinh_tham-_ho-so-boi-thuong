import { useEffect, useMemo, useState } from 'react'
import { Compiler, Story } from 'inkjs/full'
import { useGame } from '@/game/store'
import { getInkSource } from '@/game/caseLoader'
import { Button } from '@/components/ui/button'

interface Line {
  text: string
  fromPlayer?: boolean
}

export default function InterrogationScreen() {
  const { data, activeSuspect, foundClues, go } = useGame()
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
  const [choices, setChoices] = useState<{ index: number; text: string }[]>([])

  const advance = (s: Story, prefix: Line[] = []) => {
    const out = [...prefix]
    while (s.canContinue) {
      const t = s.Continue()?.trim()
      if (t) out.push({ text: t })
    }
    setLines((prev) => [...prev, ...out])
    setChoices(s.currentChoices.map((c) => ({ index: c.index, text: c.text })))
  }

  useEffect(() => {
    setLines([])
    if (story) advance(story)
  }, [story])

  if (!suspect || !story) {
    return <p className="p-6 text-muted-foreground">Không có kịch bản thẩm vấn cho người này.</p>
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col p-6">
      <h2 className="text-xl font-semibold">{suspect.name}</h2>
      <p className="text-sm text-muted-foreground">{suspect.role}</p>
      <div className="mt-4 flex-1 space-y-3 overflow-auto">
        {lines.map((l, i) => (
          <p key={i} className={l.fromPlayer ? 'text-right text-primary' : ''}>
            {l.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {choices.map((c) => (
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
        {choices.length === 0 && <Button onClick={() => go('desk')}>Về bàn làm việc</Button>}
      </div>
    </div>
  )
}
