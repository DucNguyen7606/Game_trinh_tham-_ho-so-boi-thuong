import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, CircleHelp, RotateCcw } from 'lucide-react'
import { questionOrder, useGame } from '@/game/store'
import { getEpilogue, getReconstruction, getVerdictPreview } from '@/game/caseLoader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { CaseData, ReconstructionPanel } from '@/game/types'

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
      <div className="mx-auto h-full max-w-5xl overflow-auto p-10">
        <p className="text-sm text-muted-foreground">Kết thúc</p>
        <h2 className="title text-3xl text-amber">{ending.title}</h2>
        <p className="mt-4 max-w-2xl">{ending.text}</p>
        {/* What became of everyone, one picture each. */}
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {getEpilogue(data.id, ending.id).map((p, i) => (
            <figure
              key={p.id}
              className="document p-2 pb-3 shadow-[0_10px_24px_rgb(0_0_0/0.45)] [animation:fadeIn_.6s_ease_both]"
              style={{ animationDelay: `${0.15 + i * 0.25}s`, rotate: `${[-1.2, 0.8, -0.6, 1.1, -0.9][i % 5]}deg` }}
            >
              <p.Art />
              <figcaption className="mt-2 px-1 text-xs leading-snug">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Bạn đã giải {solvedQuestions.length}/{data.questions.length} câu trên bàn suy luận.
        </p>
        <div className="mt-8 flex gap-3">
          {panels.length > 0 && (
            <Button variant="outline" onClick={() => setStep(0)}>
              Xem lại vụ án
            </Button>
          )}
          <Button onClick={reset}>{ending.id === 'full' ? 'Chơi lại' : 'Điều tra lại từ đầu'}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto h-full max-w-5xl space-y-4 overflow-auto p-6">
      {!allSolved && (
        <p className="text-sm text-muted-foreground">
          Bạn mới giải {solvedQuestions.length}/{data.questions.length} câu trên bàn suy luận. Vẫn có thể nộp, nhưng sẽ là
          đoán.
        </p>
      )}
      {data.verdict.map((slot) => {
        const preview = getVerdictPreview(data.id, slot.id, picks[slot.id])
        return (
          <Card key={slot.id} className={cn('relative overflow-hidden transition-[min-height] duration-300', preview && 'min-h-[270px]')}>
            {preview && (
              <>
                {/* The picked option drawn as a scene behind the card, face visible on the right. */}
                <div key={picks[slot.id]} className="absolute inset-y-0 right-0 aspect-video [animation:fadeIn_.35s_ease]">
                  <div className="h-[540px] w-[960px]" style={{ zoom: 0.5 }}>
                    <div className="relative h-full w-full" style={{ filter: 'sepia(0.2)' }}>
                      <preview.Art />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_38%,color-mix(in_srgb,var(--background)_55%,transparent)_62%,transparent_85%)]" />
              </>
            )}
            <div className="relative">
              <CardHeader>
                <CardTitle>{slot.prompt}</CardTitle>
              </CardHeader>
              <CardContent className="flex max-w-[62%] flex-wrap gap-2">
                {slot.options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setPicks((p) => ({ ...p, [slot.id]: o.id }))}
                    className={cn(
                      'rounded-md border px-3 py-1.5 text-sm backdrop-blur-sm',
                      picks[slot.id] === o.id ? 'border-primary bg-primary/25' : 'border-border bg-background/40 hover:bg-accent',
                    )}
                  >
                    {o.text}
                  </button>
                ))}
              </CardContent>
              {preview && (
                <p className="mx-4 mb-4 max-w-[56%] border-l-2 border-amber pl-3 text-sm italic text-amber/90">
                  Ghi chú: {preview.note}
                </p>
              )}
            </div>
          </Card>
        )
      })}
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
  const { data, solvedQuestions, reset } = useGame()
  const panels = getReconstruction(data.id, picks)
  // After the evidence against a wrong verdict, the player may go back and investigate
  // again instead of having the truth spoiled.
  const atCrossroads = isLastRefute(panels, step)
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

        <div className="space-y-4">
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
        {atCrossroads && (
          <div className="panel rounded-md p-4 text-sm">
            <p className="font-semibold text-amber">Lập luận của bạn chưa đứng vững.</p>
            <p className="mt-1 text-muted-foreground">
              Bạn có thể điều tra lại vụ án từ đầu mà không xem lời giải, hoặc xem sự thật ngay bây giờ.
            </p>
          </div>
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
        {atCrossroads ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset}>
              <RotateCcw /> Điều tra lại từ đầu
            </Button>
            <Button onClick={next}>
              Xem sự thật <ChevronRight />
            </Button>
          </div>
        ) : (
          <Button onClick={next}>
            {last ? 'Xem kết cục' : 'Tiếp'} <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  )
}

/** True on the last "lật lại" panel, right before the truth begins. */
function isLastRefute(panels: ReconstructionPanel[], step: number) {
  return panels[step]?.kind === 'refute' && panels[step + 1]?.kind !== 'refute'
}
