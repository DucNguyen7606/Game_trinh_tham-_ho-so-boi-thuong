import { Briefcase, FolderOpen, Network, Search, Gavel, Palette } from 'lucide-react'
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

const nav: { screen: Screen; label: string; icon: typeof Briefcase }[] = [
  { screen: 'desk', label: 'Bàn làm việc', icon: Briefcase },
  { screen: 'scene', label: 'Hiện trường', icon: Search },
  { screen: 'casefile', label: 'Hồ sơ', icon: FolderOpen },
  { screen: 'board', label: 'Bàn suy luận', icon: Network },
  { screen: 'verdict', label: 'Kết luận', icon: Gavel },
  { screen: 'gallery', label: 'Thư viện hình', icon: Palette },
]

export default function App() {
  const { screen, go, day, actionsLeft, reputation, data, solvedQuestions } = useGame()

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4 border-b-2 border-brass/50 bg-background/80 px-4 py-2 shadow-lg">
        <span className="title text-lg text-amber">{data.title}</span>
        <nav className="flex gap-1">
          {nav.map(({ screen: s, label, icon: Icon }) => (
            <Button
              key={s}
              size="sm"
              variant={screen === s ? 'secondary' : 'ghost'}
              onClick={() => go(s)}
              className={cn('display text-sm', screen === s && 'text-amber')}
            >
              <Icon /> {label}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <Badge variant="outline">Ngày {day}/{data.days}</Badge>
          <Badge variant="outline">Lượt còn lại: {actionsLeft}</Badge>
          <Badge variant="outline">Uy tín: {reputation}</Badge>
          <Badge variant="outline">
            Câu đã giải: {solvedQuestions.length}/{data.questions.length}
          </Badge>
        </div>
      </header>
      <main className="min-h-0 flex-1">
        {screen === 'desk' && <DeskScreen />}
        {screen === 'scene' && <SceneScreen />}
        {screen === 'casefile' && <CaseFileScreen />}
        {screen === 'board' && <BoardScreen />}
        {screen === 'interrogation' && <InterrogationScreen />}
        {screen === 'verdict' && <VerdictScreen />}
        {screen === 'gallery' && <GalleryScreen />}
      </main>
    </div>
  )
}
