import { Home, Briefcase, FolderOpen, Network, Search, Gavel, Palette } from 'lucide-react'
import { useGame, type Screen } from '@/game/store'
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
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const nav: { screen: Screen; label: string; icon: typeof Briefcase }[] = [
  { screen: 'desk', label: 'Bàn làm việc', icon: Briefcase },
  { screen: 'scene', label: 'Hiện trường', icon: Search },
  { screen: 'casefile', label: 'Hồ sơ', icon: FolderOpen },
  { screen: 'board', label: 'Bàn suy luận', icon: Network },
  { screen: 'verdict', label: 'Kết luận', icon: Gavel },
  { screen: 'gallery', label: 'Thư viện hình', icon: Palette },
]

export default function App() {
  const { screen, go, day, left, reputation, data, solvedQuestions } = useGame()

  if (screen === 'menu') return <MainMenu />

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
              className={cn('display px-2.5 text-sm', screen === s && 'text-amber')}
            >
              <Icon /> {label}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <AudioControls />
          <Badge variant="outline">Ngày {day}/{data.days}</Badge>
          <Badge variant="outline">Hỏi: {left.talk}/{data.limitsPerDay.talk}</Badge>
          <Badge variant="outline">Khám: {left.explore}/{data.limitsPerDay.explore}</Badge>
          <Badge variant="outline">Uy tín: {reputation}</Badge>
          <Badge variant="outline">
            Câu đã giải: {solvedQuestions.length}/{data.questions.length}
          </Badge>
        </div>
      </header>
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
            {screen === 'gallery' && <GalleryScreen />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
    </MotionConfig>
  )
}
