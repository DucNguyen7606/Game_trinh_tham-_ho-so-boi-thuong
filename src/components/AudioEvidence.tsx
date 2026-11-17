import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import type { AudioEvidence as AudioData } from '@/game/types'

// Recordings live next to each case: src/cases/<case>/am-thanh/<file>.
const files = import.meta.glob('/src/cases/*/am-thanh/*.{mp3,ogg,wav,m4a}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function audioUrl(caseId: string, src?: string) {
  return src ? files[`/src/cases/${caseId}/am-thanh/${src}`] : undefined
}

/**
 * A recording on the reading desk: a play button and the transcript under it. Without a
 * recorded file the system's Vietnamese voice reads the transcript, so the clue still plays.
 */
export function AudioEvidence({ caseId, audio }: { caseId: string; audio: AudioData }) {
  const url = audioUrl(caseId, audio.src)
  const el = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [line, setLine] = useState<number | null>(null)

  useEffect(
    () => () => {
      el.current?.pause()
      if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
    },
    [],
  )

  const stop = () => {
    el.current?.pause()
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
    setPlaying(false)
    setLine(null)
  }

  const play = () => {
    if (playing) return stop()
    if (url) {
      el.current ??= new Audio(url)
      el.current.onended = () => setPlaying(false)
      el.current.currentTime = 0
      void el.current.play()
      setPlaying(true)
      return
    }
    if (typeof speechSynthesis === 'undefined') return
    // No recording yet: read the transcript aloud, one turn at a time.
    speechSynthesis.cancel()
    audio.lines.forEach((l, i) => {
      const u = new SpeechSynthesisUtterance(l.text)
      u.lang = 'vi-VN'
      u.onstart = () => setLine(i)
      if (i === audio.lines.length - 1) u.onend = () => stop()
      speechSynthesis.speak(u)
    })
    setPlaying(true)
  }

  return (
    <div className="mt-3 rounded-md border border-paper-ink/25 bg-paper-ink/5 p-2">
      <div className="flex items-center gap-2">
        <button
          onClick={play}
          className="flex size-8 items-center justify-center rounded-full bg-string text-white hover:brightness-110"
          aria-label={playing ? 'Dừng' : 'Nghe đoạn ghi âm'}
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <Volume2 className="size-4 opacity-60" />
        <span className="text-xs font-semibold uppercase tracking-widest opacity-70">Ghi âm</span>
        {audio.length && <span className="ml-auto font-mono text-xs opacity-60">{audio.length}</span>}
      </div>
      <div className="mt-2 space-y-1 text-sm">
        {audio.lines.map((l, i) => (
          <p key={i} className={line === i ? 'rounded-sm bg-amber/25' : undefined}>
            {l.who && <span className="font-semibold">{l.who}: </span>}
            {l.text}
          </p>
        ))}
      </div>
    </div>
  )
}
