import { useEffect, useState } from 'react'
import { useArtStyle } from '@/art/iso/style'
import '@/art/iso/sa-ban.css'
import { Home, Briefcase, FolderOpen, Network, Search, Gavel, Palette, CircleHelp, Lightbulb } from 'lucide-react'
import { Guide, guideSeen } from '@/components/Guide'
import { PenButton, usePenCursor } from '@/components/Highlighter'
import { hintSummary, useGame, type Screen } from '@/game/store'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import DeskScreen from '@/screens/DeskScreen'
import SceneScreen from '@/screens/SceneScreen'
import CaseFileScreen from '@/screens/CaseFileScreen'
import BoardScreen from '@/screens/BoardScreen'
import InterrogationScreen from '@/screens/InterrogationScreen'
import VerdictScreen from '@/screens/VerdictScreen'
import GalleryScreen from '@/screens/GalleryScreen'
import AudioControls from '@/audio/AudioControls'
import MainMenu from '@/series/MainMenu'
import { CutscenePlayer } from '@/components/Cutscene'
import { getIntro } from '@/game/caseLoader'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const nav: { screen: Screen; label: string; icon: typeof Briefcase }[] = [
  { screen: 'desk', label: 'Bàn làm việc', icon: Briefcase },
  { screen: 'scene', label: 'Hiện trường', icon: Search },
  { screen: 'casefile', label: 'Hồ sơ', icon: FolderOpen },
  { screen: 'board', label: 'Bàn suy luận', icon: Network },
  { screen: 'verdict', label: 'Kết luận', icon: Gavel },
  // The art gallery is a design tool, not part of the game: it shows only while developing.
  ...(import.meta.env.DEV ? [{ screen: 'gallery' as Screen, label: 'Thư viện hình', icon: Palette }] : []),
]

export default function App() {
  const { screen, go, day, left, reputation, data, solvedQuestions } = useGame()
  // The guide opens by itself the first time a case is opened on this computer.
  const [guide, setGuide] = useState(() => !guideSeen())
  usePenCursor()
  // A case drawn in another art style re-themes the whole interface (see src/art/iso/sa-ban.css).
  const art = useArtStyle()
  useEffect(() => {
    document.documentElement.dataset.art = art
  }, [art])
  const hints = useGame(useShallow(hintSummary))

  if (screen === 'menu') return <MainMenu />
  if (screen === 'intro') return <CaseIntro />

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b-2 border-brass/50 bg-background/80 px-4 py-2 shadow-lg">
        <Button size="sm" variant="ghost" title="Về màn hình chính" onClick={() => go('menu')}>
          <Home />
        </Button>
        <span className="title shrink-0 whitespace-nowrap text-lg text-amber">{data.title}</span>
        <nav className="flex gap-0.5">
          {nav.map(({ screen: s, label, icon: Icon }) => (
            <Button
              key={s}
              size="sm"
              variant={screen === s ? 'secondary' : 'ghost'}
              onClick={() => go(s)}
              title={label}
              className={cn('display px-2.5 text-sm', screen === s && 'text-amber')}
            >
              <Icon /> <span className="max-[1540px]:sr-only">{label}</span>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm">
          <PenButton label={false} />
          <Button size="sm" variant="ghost" title="Hướng dẫn" onClick={() => setGuide(true)}>
            <CircleHelp />
          </Button>
          <AudioControls />
          <Badge variant="outline">Ngày {day}/{data.days}</Badge>
          <Badge variant="outline">Khám {left.explore}/{data.limitsPerDay.explore}</Badge>
          <Badge variant="outline">Uy tín {reputation}</Badge>
          <Badge
            variant="outline"
            className={cn('gap-1', hints.now > 0 && 'border-amber/70 text-amber')}
            title={`Bạn mở được ${hints.now} gợi ý ngay lúc này (mỗi câu hỏi hoặc câu đố đang mở được một gợi ý khi đủ điều kiện). Các câu đang mở còn ${hints.left} gợi ý chưa xem. Gợi ý không giới hạn: cứ nối được dây xanh mới là mở thêm.`}
          >
            <Lightbulb className="size-3.5" /> Gợi ý {hints.now} · còn {hints.left}
          </Badge>
          <Badge variant="outline">
            Đã giải {solvedQuestions.length}/{data.questions.length}
          </Badge>
        </div>
      </header>
      {guide && <Guide onClose={() => setGuide(false)} />}
      <main className="relative min-h-0 flex-1 overflow-hidden">
        {/* Screen change: the old desk is swept off toward the top-right corner, the new one slides in. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            className="h-full"
            initial={{ opacity: 0, x: -60, y: 30, rotate: -1.2, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, x: 220, y: -120, rotate: 3, scale: 0.82, transition: { duration: 0.24, ease: [0.55, 0, 1, 0.45] } }}
            style={{ transformOrigin: '90% 10%' }}
          >
            {screen === 'desk' && <DeskScreen />}
            {screen === 'scene' && <SceneScreen />}
            {screen === 'casefile' && <CaseFileScreen />}
            {screen === 'board' && <BoardScreen />}
            {screen === 'interrogation' && <InterrogationScreen />}
            {screen === 'verdict' && <VerdictScreen />}
            {import.meta.env.DEV && screen === 'gallery' && <GalleryScreen />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
    </MotionConfig>
  )
}

/** The chapter's opening film, then its desk. */
function CaseIntro() {
  const { data, go } = useGame()
  const [scene] = useState(() => getIntro(data))
  if (!scene) {
    queueMicrotask(() => go('desk'))
    return null
  }
  return <CutscenePlayer scene={scene} onDone={() => go('desk')} />
}
