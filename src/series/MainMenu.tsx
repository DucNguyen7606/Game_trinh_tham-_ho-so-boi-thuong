import { useState } from 'react'
import { ArrowLeft, FolderOpen, Lock, Play, Power, Settings } from 'lucide-react'
import { useGame } from '@/game/store'
import { cn } from '@/lib/utils'
import AudioControls from '@/audio/AudioControls'
import MenuBackdrop from './MenuBackdrop'
import { SERIES, type Chapter } from './series'

type View = 'home' | 'chapters'

/** Has the player done anything in the current case yet? */
function useStarted() {
  return useGame((s) => s.day > 1 || s.log.length > 0 || s.foundClues.length > 0 || s.readDocuments.length > 0)
}

/** The series' main menu: shown on launch, outside every chapter. */
export default function MainMenu() {
  const [view, setView] = useState<View>('home')
  const started = useStarted()
  const go = useGame((s) => s.go)

  return (
    <div className="relative h-full overflow-hidden">
      <MenuBackdrop />
      {/* Darken the left side so the title and menu read over the city */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

      <div className="relative flex h-full flex-col justify-center gap-10 px-[8vw]" style={{ animation: 'fadeIn 900ms ease-out' }}>
        <header className="space-y-3">
          <p className="display text-sm tracking-[0.35em] text-brass">Một series trinh thám suy luận</p>
          <h1 className="title text-6xl leading-none text-foreground drop-shadow-[0_4px_18px_rgb(0_0_0/0.6)] xl:text-7xl">
            {SERIES.name}
          </h1>
          <div className="h-0.5 w-40 bg-string" />
          <p className="max-w-md text-muted-foreground italic">{SERIES.tagline}</p>
        </header>

        {view === 'home' ? (
          <nav className="flex w-72 flex-col gap-1.5">
            {started && <MenuItem icon={Play} label="Tiếp tục điều tra" onClick={() => go('desk')} primary />}
            <MenuItem icon={FolderOpen} label="Chọn chương" onClick={() => setView('chapters')} primary={!started} />
            <SettingsItem />
            <MenuItem icon={Power} label="Thoát" onClick={() => window.close()} />
          </nav>
        ) : (
          <ChapterSelect onBack={() => setView('home')} />
        )}
      </div>

      <p className="display absolute bottom-4 left-[8vw] text-xs text-muted-foreground/70">Bản thử nghiệm · Chương 1–3</p>
    </div>
  )
}

function MenuItem({ icon: Icon, label, onClick, primary }: { icon: typeof Play; label: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'display group flex items-center gap-3 border-l-2 border-transparent px-4 py-2 text-left text-2xl text-foreground/80 transition-all',
        'hover:border-string hover:bg-gradient-to-r hover:from-string/25 hover:to-transparent hover:pl-6 hover:text-foreground focus-visible:outline-none focus-visible:border-amber',
        primary && 'text-amber',
      )}
    >
      <Icon className="size-5 opacity-60 group-hover:opacity-100" />
      {label}
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

function ChapterSelect({ onBack }: { onBack: () => void }) {
  const started = useStarted()
  const { go, startCase } = useGame()
  const currentId = useGame((s) => s.data.id)
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
  const current = SERIES.chapters.find((c) => c.caseId === currentId)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-5">
        {SERIES.chapters.map((c) => (
          <ChapterFolder key={c.number} chapter={c} onOpen={c.caseId ? () => begin(c.caseId!) : undefined} />
        ))}
      </div>

      {confirming && (
        <div className="panel flex max-w-xl items-center gap-3 rounded-md p-3 text-sm">
          <span>
            {confirming === currentId
              ? 'Bạn đang điều tra dở chương này. Bắt đầu lại sẽ xóa toàn bộ tiến độ.'
              : `Bạn đang điều tra dở Chương ${current?.number ?? ''}. Mở chương khác sẽ xóa tiến độ chương đó.`}
          </span>
          <button className="display shrink-0 text-amber hover:underline" onClick={() => go('desk')}>
            Tiếp tục chương đang dở
          </button>
          <button className="display shrink-0 text-string hover:underline" onClick={() => begin(confirming)}>
            {confirming === currentId ? 'Bắt đầu lại' : 'Mở chương mới'}
          </button>
        </div>
      )}

      <button onClick={onBack} className="display flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Quay lại
      </button>
    </div>
  )
}

/** A chapter drawn as a manila case folder; locked ones are sealed with tape. */
function ChapterFolder({ chapter: c, onOpen }: { chapter: Chapter; onOpen?: () => void }) {
  const locked = !onOpen
  return (
    <button
      onClick={onOpen}
      disabled={locked}
      className={cn(
        'group relative w-60 text-left transition-transform',
        locked ? 'cursor-not-allowed opacity-60 grayscale-[0.6]' : 'hover:-translate-y-1.5 hover:rotate-[-0.6deg]',
      )}
    >
      {/* Folder tab */}
      <div className="ml-3 h-5 w-24 rounded-t-md bg-paper" />
      <div className="document relative flex h-64 flex-col p-4" style={{ rotate: '0deg' }}>
        <span className="display text-xs tracking-widest text-paper-ink/60">Chương {c.number}</span>
        <h2 className="title mt-1 text-2xl leading-tight">{c.title}</h2>
        <span className="mt-1 text-xs text-paper-ink/60">{c.place}</span>
        <p className="mt-3 font-sans text-sm leading-snug text-paper-ink/85">{c.blurb}</p>

        {locked ? (
          <>
            <div className="absolute inset-x-[-8px] top-1/2 flex h-8 -rotate-6 items-center justify-center bg-string/85 text-white">
              <Lock className="mr-2 size-4" />
              <span className="display text-sm tracking-widest">Niêm phong</span>
            </div>
          </>
        ) : (
          <span className="display mt-auto self-end rounded-sm border-2 border-string px-2 text-sm text-string transition-transform group-hover:-rotate-6">
            Mở hồ sơ
          </span>
        )}
      </div>
    </button>
  )
}
