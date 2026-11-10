import { useState } from 'react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { CaseData } from '@/game/types'

// Ending rules for this case. When there are more cases, move this into the case JSON.
function pickEnding(data: CaseData, picks: Record<string, string>) {
  const ok = (slot: string) => data.verdict.find((v) => v.id === slot)?.correctOptionId === picks[slot]
  if (picks.decision === 'pay') return 'paid'
  if (ok('fraud') && ok('arson')) return 'full'
  if (ok('fraud') && picks.arson === 'thinh') return 'half'
  return 'wrong'
}

export default function VerdictScreen() {
  const { data, solvedQuestions, reset } = useGame()
  const [picks, setPicks] = useState<Record<string, string>>({})
  const [endingId, setEndingId] = useState<string | null>(null)

  const allSolved = solvedQuestions.length === data.questions.length
  const complete = data.verdict.every((v) => picks[v.id])
  const ending = data.endings.find((e) => e.id === endingId)

  if (ending) {
    return (
      <div className="mx-auto max-w-2xl p-10">
        <p className="text-sm text-muted-foreground">Kết thúc</p>
        <h2 className="text-3xl font-semibold text-primary">{ending.title}</h2>
        <p className="mt-4">{ending.text}</p>
        <Button className="mt-8" onClick={reset}>
          Chơi lại
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 overflow-auto p-6">
      {!allSolved && (
        <p className="text-sm text-muted-foreground">
          Bạn mới giải {solvedQuestions.length}/{data.questions.length} câu trên bàn suy luận. Vẫn có thể nộp, nhưng sẽ là
          đoán.
        </p>
      )}
      {data.verdict.map((slot) => (
        <Card key={slot.id}>
          <CardHeader>
            <CardTitle>{slot.prompt}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {slot.options.map((o) => (
              <button
                key={o.id}
                onClick={() => setPicks((p) => ({ ...p, [slot.id]: o.id }))}
                className={cn(
                  'rounded-md border px-3 py-1.5 text-sm',
                  picks[slot.id] === o.id ? 'border-primary bg-primary/15' : 'border-border hover:bg-accent',
                )}
              >
                {o.text}
              </button>
            ))}
          </CardContent>
        </Card>
      ))}
      <Button disabled={!complete} onClick={() => setEndingId(pickEnding(data, picks))}>
        Ký đề xuất
      </Button>
    </div>
  )
}
