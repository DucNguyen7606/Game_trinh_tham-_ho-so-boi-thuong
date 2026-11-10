import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useGame } from '@/game/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import { CharacterProfile } from '@/components/CharacterProfile'

export default function DeskScreen() {
  const { data, startInterrogation, endDay, left, day, log } = useGame()
  const [profileId, setProfileId] = useState<string | null>(null)
  const profile = data.suspects.find((s) => s.id === profileId)

  return (
    <div className="grid h-full grid-cols-[2fr_1fr] gap-4 overflow-auto p-6">
      <section className="flex flex-col gap-4">
        <Card className="flex items-center gap-4 p-4">
          {data.player.portrait && <PortraitFrame spec={data.player.portrait} size={104} />}
          <div className="min-w-0">
            <CardTitle className="title text-2xl text-amber">{data.title}</CardTitle>
            <CardDescription className="mt-1">
              {data.player.name} · {data.player.role}
            </CardDescription>
            <p className="mt-3">{data.intro}</p>
          </div>
        </Card>

        <h2 className="display text-muted-foreground">Những người liên quan</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.suspects.map((s) => (
            <Card
              key={s.id}
              className="group flex items-center gap-4 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-amber/60 hover:shadow-[0_0_0_1px_rgb(242_169_59/0.45),0_10px_28px_-8px_rgb(242_169_59/0.35)] hover:brightness-110"
            >
              <button className="shrink-0" onClick={() => setProfileId(s.id)} aria-label={`Xem hồ sơ ${s.name}`}>
                {s.portrait && <PortraitFrame spec={s.portrait} size={92} />}
              </button>
              <div className="min-w-0 flex-1">
                <CardTitle className="title">
                  <button className="text-left transition group-hover:text-amber" onClick={() => setProfileId(s.id)}>
                    {s.name}, {s.age}
                  </button>
                </CardTitle>
                {s.profile && <p className="mt-1 text-xs text-amber/80">{s.profile.traits.join(' · ')}</p>}
                <CardDescription className="mt-1">{s.role}</CardDescription>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setProfileId(s.id)}>
                    Xem hồ sơ
                  </Button>
                  {s.interrogation ? (
                    <Button size="sm" variant="outline" disabled={left.talk <= 0} onClick={() => startInterrogation(s.id)}>
                      <MessageSquare /> Hỏi chuyện
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Chưa hỏi được ở bản khung này</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Ngày {day}/{data.days}
            </CardTitle>
            <CardDescription>
              Hôm nay còn hỏi được {left.talk} người và khám được {left.explore} khu. Hết lượt thì kết thúc ngày để làm tiếp hôm sau.
            </CardDescription>
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

/** A small framed photo: rounded, inset from the card edge, figure drawn a little smaller. */
function PortraitFrame({ spec, size }: { spec: PortraitSpec; size: number }) {
  return (
    <div className="rounded-md bg-[#f3e4c4]/90 p-1 shadow-[0_4px_10px_rgb(0_0_0/0.4)] transition duration-200 group-hover:rotate-[-1.5deg] group-hover:shadow-[0_6px_16px_rgb(242_169_59/0.35)]">
      <Portrait spec={spec} size={size} zoom={0.84} className="block rounded-[4px]" />
    </div>
  )
}
