import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { CheckCircle2 } from 'lucide-react'
import { questionOrder, useGame } from '@/game/store'
import { clueById } from '@/game/caseLoader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ClueNodeData = { clueId: string }
type QuestionNodeData = { questionId: string }

function ClueNode({ data }: NodeProps<Node<ClueNodeData>>) {
  const caseData = useGame((s) => s.data)
  const clue = clueById(caseData, data.clueId)
  if (!clue) return null
  return (
    <div className="document w-52 p-2 shadow-md">
      <p className="text-[10px] font-semibold uppercase opacity-60">{clue.id}</p>
      <p className="text-sm font-semibold leading-tight">{clue.title}</p>
      <p className="mt-1 text-xs opacity-80">{clue.description}</p>
      <Handle type="source" position={Position.Right} className="!size-3 !bg-string" />
    </div>
  )
}

function QuestionNode({ data }: NodeProps<Node<QuestionNodeData>>) {
  const { data: caseData, answers, solvedQuestions, setAnswerOption, checkAnswer } = useGame()
  const [feedback, setFeedback] = useState<string | null>(null)
  const q = caseData.questions.find((x) => x.id === data.questionId)!
  const answer = answers[q.id]
  const solved = solvedQuestions.includes(q.id)

  const onCheck = () => {
    const result = checkAnswer(q.id)
    setFeedback(
      result === 'solved'
        ? null
        : result === 'missing-clues'
          ? 'Hướng đúng, nhưng chưa đủ bằng chứng.'
          : 'Trưởng phòng không tin lập luận này. Uy tín giảm.',
    )
  }

  return (
    <div className={cn('w-72 rounded-lg border bg-card p-3 shadow-lg', solved ? 'border-primary' : 'border-border')}>
      <Handle type="target" position={Position.Left} className="!size-3 !bg-string" />
      <p className="text-xs text-muted-foreground">Câu {questionOrder(caseData, solvedQuestions).indexOf(q.id) + 1}</p>
      <p className="display text-lg leading-tight">{q.prompt}</p>
      <div className="nodrag mt-2 flex flex-col gap-1">
        {q.options.map((o) => (
          <button
            key={o.id}
            disabled={solved}
            onClick={() => setAnswerOption(q.id, o.id)}
            className={cn(
              'rounded-md border px-2 py-1 text-left text-sm',
              answer?.optionId === o.id ? 'border-primary bg-primary/15' : 'border-border hover:bg-accent',
            )}
          >
            {o.text}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        {/* How many cards the proof needs, so the player can rule cards out. */}
        <span className="flex items-center gap-1.5" title={`Câu này cần ${q.requiredClues.length} thẻ manh mối`}>
          <span className="flex gap-0.5">
            {q.requiredClues.map((_, i) => (
              <span
                key={i}
                className={cn('size-2.5 rounded-sm border border-string', i < (answer?.clueIds.length ?? 0) ? 'bg-string' : 'bg-transparent')}
              />
            ))}
          </span>
          Nối {answer?.clueIds.length ?? 0}/{q.requiredClues.length} thẻ
        </span>
        {solved ? (
          <span className="flex items-center gap-1 text-primary">
            <CheckCircle2 className="size-4" /> Đã giải
          </span>
        ) : (
          <Button size="sm" className="nodrag" disabled={!answer?.optionId} onClick={onCheck}>
            Kiểm tra
          </Button>
        )}
      </div>
      {feedback && <p className="mt-2 text-xs text-destructive">{feedback}</p>}
    </div>
  )
}

const nodeTypes = { clue: ClueNode, question: QuestionNode }

const clueNode = (clueId: string, index: number): Node => ({
  id: `clue-${clueId}`,
  type: 'clue',
  position: { x: (index % 3) * 240, y: Math.floor(index / 3) * 140 },
  data: { clueId },
})

const questionNode = (q: { id: string }, index: number): Node => ({
  id: `q-${q.id}`,
  type: 'question',
  position: { x: 860, y: index * 230 },
  data: { questionId: q.id },
})

export default function BoardScreen() {
  const { data, foundClues, answers, linkClue, unlinkClue, solvedQuestions, isQuestionOpen } = useGame()
  // Recomputed when a question is solved, since that can open an envelope.
  const openQuestions = useMemo(
    () => questionOrder(data, solvedQuestions).map((id) => data.questions.find((q) => q.id === id)!).filter((q) => isQuestionOpen(q.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, solvedQuestions],
  )
  const lockedCount = data.questions.length - openQuestions.length

  const initialNodes = useMemo<Node[]>(
    () => [...foundClues.map(clueNode), ...openQuestions.map(questionNode)],
    // Positions are only laid out once; the player moves cards freely after that.
    [],
  )
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  // Clues found elsewhere (scene, case file) appear as new cards.
  useEffect(() => {
    setNodes((current) => {
      const have = new Set(current.map((n) => n.id))
      const missing = foundClues.filter((c) => !have.has(`clue-${c}`))
      const clueCount = current.filter((n) => n.type === 'clue').length
      return [...current, ...missing.map((c, i) => clueNode(c, clueCount + i))]
    })
  }, [foundClues, setNodes])

  // Questions join the board when a new envelope makes them answerable.
  useEffect(() => {
    setNodes((current) => {
      const have = new Set(current.map((n) => n.id))
      const missing = openQuestions.filter((q) => !have.has(`q-${q.id}`))
      const qCount = current.filter((n) => n.type === 'question').length
      return [...current, ...missing.map((q, i) => questionNode(q, qCount + i))]
    })
  }, [openQuestions, setNodes])

  // The red strings are derived from the store, so they survive leaving the screen.
  const edges = useMemo<Edge[]>(
    () =>
      Object.entries(answers).flatMap(([qId, a]) =>
        a.clueIds.map((c) => ({
          id: `${c}->${qId}`,
          source: `clue-${c}`,
          target: `q-${qId}`,
          style: { stroke: 'var(--string)', strokeWidth: 2.5 },
        })),
      ),
    [answers],
  )

  const onConnect = useCallback(
    (c: Connection) => {
      if (!c.source.startsWith('clue-') || !c.target.startsWith('q-')) return
      linkClue(c.target.slice(2), c.source.slice(5))
    },
    [linkClue],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      for (const ch of changes) {
        if (ch.type !== 'remove') continue
        const [clueId, qId] = ch.id.split('->')
        unlinkClue(qId, clueId)
      }
    },
    [unlinkClue],
  )

  return (
    <div className="relative h-full">
      {foundClues.length === 0 && (
        <p className="absolute left-4 top-4 z-10 text-sm text-muted-foreground">
          Chưa có thẻ manh mối. Khám hiện trường hoặc ghim giấy tờ từ hồ sơ.
        </p>
      )}
      {lockedCount > 0 && (
        <p className="display absolute right-4 top-4 z-10 rounded bg-background/85 px-3 py-1.5 text-sm text-muted-foreground">
          Còn {lockedCount} câu hỏi sẽ hiện khi mở được phong bì tiếp theo
        </p>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="dark"
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
