import { useState } from 'react'
import { ArrowLeft, Lock, MapPin, Map as MapIcon, Play, Power, Settings } from 'lucide-react'
import { useGame } from '@/game/store'
import { cn } from '@/lib/utils'
import AudioControls from '@/audio/AudioControls'
import SaigonMap from './SaigonMap'
import { AREAS, OFF_MAP, areaName } from './areas'
import { SERIES, type Chapter } from './series'

type View = 'home' | 'map'

/** Has the player done anything in the current case yet? */
function useStarted() {
  return useGame((s) => s.day > 1 || s.log.length > 0 || s.foundClues.length > 0 || s.readDocuments.length > 0)
}

/** Lamp glow on the dark walnut desk, behind both menu views. */
function Desk() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 70% at 62% 40%, rgb(242 169 59 / 0.22), transparent 70%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgb(0 0 0 / 0.6))',
      }}
    />
  )
}

/** The series' main menu: shown on launch, outside every chapter. */
export default function MainMenu() {
  const [view, setView] = useState<View>('home')
  return view === 'home' ? <Home onMap={() => setView('map')} /> : <CaseMap onBack={() => setView('home')} />
}

function Home({ onMap }: { onMap: () => void }) {
  const started = useStarted()
  const go = useGame((s) => s.go)
  const current = useGame((s) => SERIES.chapters.find((c) => c.caseId === s.data.id))
  const playable = SERIES.chapters.filter((c) => c.caseId).length

  return (
    <div className="relative h-full overflow-hidden">
      <Desk />
      {/* The case map lies on the desk, a little askew; open it to pick a case */}
      <button
        onClick={onMap}
        aria-label="Mở bản đồ vụ án"
        className="group absolute top-1/2 right-[-4vw] aspect-[10/9] h-[112vh] -translate-y-1/2 rotate-[4deg] shadow-[0_30px_60px_rgb(0_0_0/0.6)] transition-transform duration-500 hover:rotate-[2.5deg]"
        style={{ animation: 'fadeIn 1100ms ease-out' }}
      >
        <SaigonMap interactive={false} />
        <span className="absolute inset-0 bg-background/25 transition-colors group-hover:bg-transparent" />
      </button>
      {/* Darken the left side so the title and menu read over the map */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" style={{ width: '62%' }} />

      <div className="relative flex h-full w-fit flex-col justify-center gap-10 px-[8vw]" style={{ animation: 'fadeIn 900ms ease-out' }}>
        <header className="space-y-3">
          <p className="display text-sm tracking-[0.35em] text-brass">Một series trinh thám suy luận</p>
          <h1 className="title text-6xl leading-none text-foreground drop-shadow-[0_4px_18px_rgb(0_0_0/0.6)] xl:text-7xl">
            {SERIES.name}
          </h1>
          <div className="h-0.5 w-40 bg-string" />
          <p className="max-w-md text-muted-foreground italic">{SERIES.tagline}</p>
        </header>

        <nav className="flex w-80 flex-col gap-1.5">
          {started && (
            <MenuItem
              icon={Play}
              label="Tiếp tục điều tra"
              sub={current && `Chương ${current.number} · ${current.title}`}
              onClick={() => go('desk')}
              primary
            />
          )}
          <MenuItem icon={MapIcon} label="Bản đồ vụ án" sub={`${playable} hồ sơ đang chờ`} onClick={onMap} primary={!started} />
          <SettingsItem />
          <MenuItem icon={Power} label="Thoát" onClick={() => window.close()} />
        </nav>
      </div>

      <p className="display absolute bottom-4 left-[8vw] text-xs text-muted-foreground/70">
        Bản thử nghiệm · {playable} chương
      </p>
    </div>
  )
}

function MenuItem({ icon: Icon, label, sub, onClick, primary }: { icon: typeof Play; label: string; sub?: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'display group flex items-center gap-3 border-l-2 border-transparent px-4 py-2 text-left text-2xl text-foreground/80 transition-all',
        'hover:border-string hover:bg-gradient-to-r hover:from-string/25 hover:to-transparent hover:pl-6 hover:text-foreground focus-visible:outline-none focus-visible:border-amber',
        primary && 'text-amber',
      )}
    >
      <Icon className="size-5 shrink-0 opacity-60 group-hover:opacity-100" />
      <span className="flex flex-col">
        {label}
        {sub && <span className="font-sans text-xs tracking-normal normal-case text-muted-foreground">{sub}</span>}
      </span>
    </button>
  )
}

/** Volume controls reuse the in-game widget, labelled for the menu. */
function SettingsItem() {
  return (
    <div className="display flex items-center gap-3 px-4 py-2 text-2xl text-foreground/80">
      <Settings className="size-5 opacity-60" />
      Âm thanh
      <AudioControls />
    </div>
  )
}

/** Full-screen Saigon map: pick an area, then a case in it. */
function CaseMap({ onBack }: { onBack: () => void }) {
  const started = useStarted()
  const { go, startCase } = useGame()
  const currentId = useGame((s) => s.data.id)
  const [area, setArea] = useState<string | undefined>()
  // Case picked on the zoomed-in area.
  const [chosen, setChosen] = useState<number | undefined>()
  // Chapter waiting for the player to confirm that starting it drops their progress.
  const [confirming, setConfirming] = useState<string | null>(null)

  const begin = (caseId: string) => {
    if (started && confirming !== caseId) {
      setConfirming(caseId)
      return
    }
    startCase(caseId)
    go('desk')
  }
  const select = (id: string) => {
    setArea(id || undefined)
    setConfirming(null)
    setChosen(undefined)
  }
  const choose = (n: number) => {
    setChosen(n)
    setConfirming(null)
  }
  const current = SERIES.chapters.find((c) => c.caseId === currentId)
  const info = [...AREAS, ...OFF_MAP].find((a) => a.id === area)
  const here = SERIES.chapters.filter((c) => c.area && c.area === area)
  const picked = here.find((c) => c.number === chosen)

  return (
    <div className="relative flex h-full gap-6 overflow-hidden p-6" style={{ animation: 'fadeIn 500ms ease-out' }}>
      <Desk />
      <div className="relative flex min-w-0 flex-1 items-center justify-center">
        <div className="aspect-[10/9] max-h-full w-full max-w-[calc((100vh-3rem)*10/9)] rotate-[-0.6deg] shadow-[0_24px_50px_rgb(0_0_0/0.55)]">
          <SaigonMap selected={area} onSelect={select} chosen={chosen} onChoose={choose} />
        </div>
      </div>

      <aside className="panel relative flex w-[380px] shrink-0 flex-col gap-4 overflow-y-auto rounded-md p-5">
        <button onClick={onBack} className="display flex items-center gap-2 self-start text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Màn hình chính
        </button>

        {!info ? (
          <>
            <div>
              <p className="display text-xs tracking-[0.3em] text-brass">Bản đồ vụ án</p>
              <h2 className="title mt-1 text-3xl">Chọn một khu vực</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mỗi đinh ghim đỏ là một hồ sơ đang chờ bạn. Bấm vào một quận để phóng to, rồi chọn vụ án trong quận đó. Hoặc chọn nhanh ở dưới.
              </p>
            </div>
            <ul className="space-y-1.5">
              {SERIES.chapters.map((c) => (
                <li key={c.number}>
                  <button
                    disabled={!c.area}
                    onClick={() => {
                      if (!c.area) return
                      select(c.area)
                      choose(c.number)
                    }}
                    className="flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-left hover:bg-string/20 disabled:opacity-50"
                  >
                    <MapPin className="size-4 shrink-0 text-string" />
                    <span className="flex-1">
                      <span className="display mr-2 text-xs text-brass">Chương {c.number}</span>
                      {c.title}
                    </span>
                    <span className="display text-xs text-muted-foreground">{areaName(c.area) ?? '?'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div>
              <p className="display text-xs tracking-[0.3em] text-brass">{OFF_MAP.some((o) => o.id === info.id) ? 'Ngoài thành phố' : 'Khu vực'}</p>
              <h2 className="title mt-1 text-3xl">{info.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground italic">{info.note}</p>
            </div>

            {here.length === 0 ? (
              <div className="rounded-sm border border-dashed border-border p-4 text-sm text-muted-foreground">
                Chưa có hồ sơ nào ở khu vực này. Những vụ án sắp tới sẽ được ghim lên đây.
              </div>
            ) : picked ? (
              <CaseCard
                key={picked.number}
                chapter={picked}
                current={picked.caseId === currentId && started}
                onOpen={picked.caseId ? () => begin(picked.caseId!) : undefined}
              />
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Có {here.length} hồ sơ ở khu vực này. Bấm vào một đinh ghim trên bản đồ để xem.
                </p>
                {here.map((c) => (
                  <button key={c.number} onClick={() => choose(c.number)} className="flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-left hover:bg-string/20">
                    <MapPin className="size-4 shrink-0 text-string" />
                    <span className="display mr-1 text-xs text-brass">Chương {c.number}</span>
                    {c.title}
                  </button>
                ))}
              </div>
            )}

            {confirming && (
              <div className="rounded-sm bg-string/15 p-3 text-sm">
                <p>
                  {confirming === currentId
                    ? 'Bạn đang điều tra dở chương này. Bắt đầu lại sẽ xóa toàn bộ tiến độ.'
                    : `Bạn đang điều tra dở Chương ${current?.number ?? ''}. Mở chương khác sẽ xóa tiến độ chương đó.`}
                </p>
                <div className="mt-2 flex gap-4">
                  <button className="display text-amber hover:underline" onClick={() => go('desk')}>
                    Tiếp tục chương đang dở
                  </button>
                  <button className="display text-string hover:underline" onClick={() => begin(confirming)}>
                    {confirming === currentId ? 'Bắt đầu lại' : 'Mở chương mới'}
                  </button>
                </div>
              </div>
            )}

            <button onClick={() => select('')} className="display flex items-center gap-2 self-start text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Thu nhỏ, xem cả thành phố
            </button>
          </>
        )}
      </aside>
    </div>
  )
}

/** A case in the area panel, drawn as a manila file; unfinished ones are sealed with tape. */
function CaseCard({ chapter: c, onOpen, current }: { chapter: Chapter; onOpen?: () => void; current?: boolean }) {
  const locked = !onOpen
  return (
    <button
      onClick={onOpen}
      disabled={locked}
      className={cn('group relative text-left transition-transform', locked ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-1 hover:rotate-[-0.5deg]')}
    >
      <div className="ml-3 h-4 w-20 rounded-t-md bg-paper" />
      <div className="document relative flex flex-col p-4">
        <span className="display text-xs tracking-widest text-paper-ink/60">
          Chương {c.number} · {c.place}
        </span>
        <h3 className="title mt-1 text-xl leading-tight">{c.title}</h3>
        <p className="mt-2 font-sans text-sm leading-snug text-paper-ink/85">{c.blurb}</p>
        {locked ? (
          <div className="absolute inset-x-[-8px] top-1/2 flex h-8 -rotate-3 items-center justify-center bg-string/85 text-white">
            <Lock className="mr-2 size-4" />
            <span className="display text-sm tracking-widest">Niêm phong</span>
          </div>
        ) : (
          <span className="display mt-3 self-end rounded-sm border-2 border-string px-2 text-sm text-string transition-transform group-hover:-rotate-6">
            {current ? 'Đang điều tra' : 'Mở hồ sơ'}
          </span>
        )}
      </div>
    </button>
  )
}
