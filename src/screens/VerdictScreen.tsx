import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, CircleHelp } from 'lucide-react'
import { questionOrder, useGame } from '@/game/store'
import { getReconstruction } from '@/game/caseLoader'
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
  const panels = getReconstruction(data.id, picks)
  // After signing, the case is replayed panel by panel; null = show the ending card.
  const [step, setStep] = useState<number | null>(null)

  if (ending && step !== null && panels[step]) {
    return <Reconstruction step={step} setStep={setStep} picks={picks} />
  }

  if (ending) {
    return (
      <div className="mx-auto max-w-2xl p-10">
        <p className="text-sm text-muted-foreground">Kết thúc</p>
        <h2 className="title text-3xl text-amber">{ending.title}</h2>
        <p className="mt-4">{ending.text}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Bạn đã giải {solvedQuestions.length}/{data.questions.length} câu trên bàn suy luận.
        </p>
        <div className="mt-8 flex gap-3">
          {panels.length > 0 && (
            <Button variant="outline" onClick={() => setStep(0)}>
              Xem lại vụ án
            </Button>
          )}
          <Button onClick={reset}>Chơi lại</Button>
        </div>
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
      <Button
        disabled={!complete}
        onClick={() => {
          setEndingId(pickEnding(data, picks))
          if (panels.length) setStep(0)
        }}
      >
        Ký đề xuất
      </Button>
    </div>
  )
}

/** "Dựng lại vụ án": the true events, one illustrated panel at a time, like a case being read back. */
function Reconstruction({ step, setStep, picks }: { step: number; setStep: (n: number | null) => void; picks: Record<string, string> }) {
  const { data, solvedQuestions } = useGame()
  const panels = getReconstruction(data.id, picks)
  const panel = panels[step]
  const last = step === panels.length - 1
  const next = () => setStep(last ? null : step + 1)
  const prev = () => setStep(Math.max(0, step - 1))
  const order = questionOrder(data, solvedQuestions)
  const truthNo = panels.slice(0, step + 1).filter((p) => p.kind === 'truth').length
  const kindLabel = panel.kind === 'theory' ? 'Giả thuyết của bạn' : panel.kind === 'refute' ? 'Lật lại hồ sơ' : `Sự thật · diễn biến ${truthNo}`
  const solved = panel.questionId ? solvedQuestions.includes(panel.questionId) : undefined
  const qNo = panel.questionId ? order.indexOf(panel.questionId) + 1 : 0

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center gap-5 overflow-auto p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="title text-2xl text-amber">Dựng lại vụ án</h2>
        <span className="display text-sm text-muted-foreground">
          {step + 1} / {panels.length}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,2.7fr)_minmax(280px,1fr)] items-start gap-6">
        <figure
          key={step}
          className={cn(
            'relative aspect-video overflow-hidden border-[6px] shadow-[0_14px_40px_rgb(0_0_0/0.55)] [animation:fadeIn_.4s_ease]',
            panel.kind === 'theory' ? 'border-dashed border-[#9fb4c8]' : panel.kind === 'refute' ? 'border-[#b23a2e]' : 'border-[#f3e4c4]',
          )}
        >
          <div className="absolute inset-0" style={{ filter: 'sepia(0.25) contrast(1.05)' }}>
            <panel.Art />
          </div>
          <span className="display absolute left-0 top-0 bg-amber px-3 py-1 text-lg text-[#1c130f]">{panel.time}</span>
        </figure>

        <div className="document space-y-3 p-5">
          <p className="text-[10px] uppercase tracking-widest opacity-60">{kindLabel}</p>
          <h3 className="title text-2xl">{panel.title}</h3>
          <p className="text-sm leading-relaxed">{panel.text}</p>
          {solved !== undefined && (
            <p className={cn('flex items-center gap-1.5 text-xs font-semibold', solved ? 'text-[#3f6f4f]' : 'text-[#b23a2e]')}>
              {solved ? <CheckCircle2 className="size-4" /> : <CircleHelp className="size-4" />}
              {solved ? `Bạn đã suy ra điều này ở câu ${qNo}.` : 'Bạn chưa suy ra được điều này.'}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={step === 0} onClick={prev}>
          <ChevronLeft /> Trước
        </Button>
        <div className="flex gap-1.5">
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Diễn biến ${i + 1}`}
              className={cn('h-2 rounded-full transition-all', i === step ? 'w-8 bg-amber' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground')}
            />
          ))}
        </div>
        <Button onClick={next}>
          {last ? 'Xem kết cục' : 'Tiếp'} <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
