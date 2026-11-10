import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Portrait } from '@/art/Portrait'
import { CharacterProfile } from '@/components/CharacterProfile'

export default function DeskScreen() {
  const { data, startInterrogation, endDay, actionsLeft, day, log } = useGame()
  const [profileId, setProfileId] = useState<string | null>(null)
  const profile = data.suspects.find((s) => s.id === profileId)

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
              <button className="shrink-0 transition hover:brightness-110" onClick={() => setProfileId(s.id)} aria-label={`Xem hồ sơ ${s.name}`}>
                {s.portrait && <Portrait spec={s.portrait} size={120} />}
              </button>
              <div className="min-w-0">
              <CardHeader>
                <CardTitle className="title">
                  <button className="text-left hover:text-amber" onClick={() => setProfileId(s.id)}>
                    {s.name}, {s.age}
                  </button>
                </CardTitle>
                {s.profile && <p className="text-xs text-amber/80">{s.profile.traits.join(' · ')}</p>}
                <CardDescription>{s.role}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button size="sm" variant="ghost" onClick={() => setProfileId(s.id)}>
                  Xem hồ sơ
                </Button>
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
      {profile && <CharacterProfile suspect={profile} onClose={() => setProfileId(null)} />}
    </div>
  )
}
