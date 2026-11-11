import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
  Handle,
  Position,
  useNodesState,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { CheckCircle2, Lightbulb, X } from 'lucide-react'
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
  const { data: caseData, answers, solvedQuestions, setAnswerOption, checkAnswer, hintLevel, showHint } = useGame()
  const [feedback, setFeedback] = useState<string | null>(null)
  const q = caseData.questions.find((x) => x.id === data.questionId)!
  const answer = answers[q.id]
  const solved = solvedQuestions.includes(q.id)

  const hints = q.hints ?? []
  const shownHints = hints.slice(0, hintLevel[q.id] ?? 0)
  const moreHints = shownHints.length < hints.length

  const onCheck = () => {
    const result = checkAnswer(q.id)
    // A miss opens the next hint, so the player always has somewhere to look.
    if (result !== 'solved') showHint(q.id)
    setFeedback(
      result === 'solved'
        ? null
        : result === 'missing-clues'
          ? 'Hướng đúng, nhưng chưa đủ bằng chứng.'
          : 'Trưởng phòng không tin lập luận này. Uy tín giảm.',
    )
  }

  return (
    <div className="w-72">
      {!solved && shownHints.length > 0 && (
        <div className="document relative z-10 mx-2 -mb-1 rotate-[-1deg] space-y-1 p-2.5 text-xs shadow-lg [animation:fadeIn_.3s_ease]">
          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest opacity-70">
            <Lightbulb className="size-3.5" /> Gợi ý {shownHints.length}/{hints.length}
          </p>
          <p>{shownHints[shownHints.length - 1]}</p>
        </div>
      )}
    <div className={cn('w-72 rounded-lg border bg-card p-3 shadow-lg transition-opacity', solved ? 'border-primary/50 opacity-45 saturate-50 hover:opacity-80' : 'border-border')}>
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
        <span className="flex items-center gap-1.5" title={`Câu này cần ít nhất ${q.requiredClues.length} thẻ manh mối`}>
          <span className="flex gap-0.5">
            {q.requiredClues.map((_, i) => (
              <span
                key={i}
                className={cn('size-2.5 rounded-sm border border-string', i < Math.min(answer?.clueIds.length ?? 0, q.requiredClues.length) ? 'bg-string' : 'bg-transparent')}
              />
            ))}
          </span>
          Nối {answer?.clueIds.length ?? 0} thẻ · cần {q.requiredClues.length}
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
      {!solved && moreHints && (
        <button className="nodrag mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-amber" onClick={() => showHint(q.id)}>
          <Lightbulb className="size-3.5" /> {shownHints.length === 0 ? 'Xem gợi ý' : 'Gợi ý tiếp'}
        </button>
      )}
    </div>
    </div>
  )
}

const nodeTypes = { clue: ClueNode, question: QuestionNode }

type StringEdgeData = { clueId: string; questionId: string; status?: 'match' | 'mismatch'; locked?: boolean }

/** A string between a card and a question, with its check result and a button to take it off. */
function StringEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style }: EdgeProps<Edge<StringEdgeData>>) {
  const unlinkClue = useGame((s) => s.unlinkClue)
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })
  if (!data) return null
  const { status, locked } = data
  return (
    <>
      <BaseEdge id={id} path={path} style={style} interactionWidth={18} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute flex items-center gap-1"
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
        >
          {status && (
            <span
              className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-[#fff8e8]"
              style={{ background: status === 'match' ? 'var(--match)' : 'var(--mismatch)' }}
            >
              {status === 'match' ? '✓ Khớp' : '✕ Chưa khớp'}
            </span>
          )}
          {!locked && (
            <button
              onClick={() => unlinkClue(data.questionId, data.clueId)}
              className="flex size-5 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow transition hover:scale-110 hover:border-[var(--mismatch)] hover:text-[var(--mismatch)]"
              title="Gỡ dây nối này"
              aria-label={`Gỡ dây nối ${data.clueId}`}
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

const edgeTypes = { string: StringEdge }

// Cards go back where the player left them; new ones get a grid slot.
const saved = (id: string) => useGame.getState().boardLayout[id]

const clueNode = (clueId: string, index: number): Node => ({
  id: `clue-${clueId}`,
  type: 'clue',
  position: saved(`clue-${clueId}`) ?? { x: (index % 3) * 240, y: Math.floor(index / 3) * 140 },
  data: { clueId },
})

const questionNode = (q: { id: string }, index: number): Node => ({
  id: `q-${q.id}`,
  type: 'question',
  position: saved(`q-${q.id}`) ?? { x: 860, y: index * 380 },
  data: { questionId: q.id },
})

export default function BoardScreen() {
  const { data, foundClues, answers, checkedLinks, linkClue, unlinkClue, solvedQuestions, isQuestionOpen, saveBoardLayout, saveBoardViewport } = useGame()
  // Read once: the board opens at the pan and zoom the player left it.
  const [boardViewport] = useState(() => useGame.getState().boardViewport)
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
  // After Kiểm tra, each string that was checked turns green if the card belongs to the proof, red if not.
  const edges = useMemo<Edge[]>(
    () =>
      Object.entries(answers).flatMap(([qId, a]) => {
        const q = data.questions.find((x) => x.id === qId)
        const checked = checkedLinks[qId] ?? []
        const locked = solvedQuestions.includes(qId)
        return a.clueIds.map((c): Edge<StringEdgeData> => {
          const base = { id: `${c}->${qId}`, source: `clue-${c}`, target: `q-${qId}`, type: 'string' }
          const data: StringEdgeData = { clueId: c, questionId: qId, locked }
          if (!q || !checked.includes(c)) return { ...base, data, style: { stroke: 'var(--string)', strokeWidth: 2.5 } }
          const ok = q.requiredClues.includes(c) || (q.supportingClues ?? []).includes(c)
          const color = ok ? 'var(--match)' : 'var(--mismatch)'
          return {
            ...base,
            animated: !ok,
            data: { ...data, status: ok ? 'match' : 'mismatch' },
            style: { stroke: color, strokeWidth: 3.5, filter: `drop-shadow(0 0 4px ${color})` },
          }
        })
      }),
    [answers, checkedLinks, data, solvedQuestions],
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
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={(_, __, dragged) => saveBoardLayout(Object.fromEntries(dragged.map((n) => [n.id, n.position])))}
        onMoveEnd={(_, vp) => saveBoardViewport(vp)}
        defaultViewport={boardViewport}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="dark"
        fitView={!boardViewport}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
