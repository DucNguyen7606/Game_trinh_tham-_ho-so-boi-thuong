import { MessageSquare } from 'lucide-react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Portrait } from '@/art/Portrait'

export default function DeskScreen() {
  const { data, startInterrogation, endDay, actionsLeft, day, log } = useGame()

  return (
    <div className="grid h-full grid-cols-[2fr_1fr] gap-4 overflow-auto p-6">
      <section className="flex flex-col gap-4">
        <Card className="flex items-center gap-2 overflow-hidden">
          {data.player.portrait && <Portrait spec={data.player.portrait} size={120} className="shrink-0" />}
          <div>
          <CardHeader>
            <CardTitle className="title text-2xl text-amber">{data.title}</CardTitle>
            <CardDescription>
              {data.player.name} · {data.player.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.intro}</p>
          </CardContent>
          </div>
        </Card>

        <h2 className="display text-muted-foreground">Những người liên quan</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.suspects.map((s) => (
            <Card key={s.id} className="flex overflow-hidden">
              {s.portrait && <Portrait spec={s.portrait} size={110} className="shrink-0" />}
              <div className="min-w-0">
              <CardHeader>
                <CardTitle className="title">
                  {s.name}, {s.age}
                </CardTitle>
                <CardDescription>{s.role}</CardDescription>
              </CardHeader>
              <CardContent>
                {s.interrogation ? (
                  <Button size="sm" variant="outline" disabled={actionsLeft <= 0} onClick={() => startInterrogation(s.id)}>
                    <MessageSquare /> Hỏi chuyện (1 lượt)
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">Chưa hỏi được ở bản khung này</span>
                )}
              </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Ngày {day}</CardTitle>
            <CardDescription>Còn {actionsLeft} lượt. Khám một khu hoặc hỏi một người tốn 1 lượt.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={endDay}>{day >= data.days ? 'Hết hạn, nộp đề xuất' : 'Kết thúc ngày'}</Button>
          </CardContent>
        </Card>
        <Card className="min-h-0 flex-1">
          <CardHeader>
            <CardTitle>Nhật ký</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {log.length === 0 && <p>Chưa làm gì.</p>}
            {log.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
