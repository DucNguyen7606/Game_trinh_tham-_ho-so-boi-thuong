/**
 * Dev-only audio lab (open /audio-lab.html in `npm run dev`): audition every
 * theme and effect, and export them as WAV files.
 */
import ReactDOM from 'react-dom/client'
import '../index.css'
import { encodeWav } from './core'
import { gameAudio } from './engine'
import { renderSfx, renderTheme } from './render'
import { SFX_LIST, type SfxId } from './sfx'
import { THEMES, type ThemeId } from './themes'

async function download(name: string, buf: Promise<AudioBuffer>) {
  const url = URL.createObjectURL(encodeWav(await buf))
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  URL.revokeObjectURL(url)
}

const btn = 'rounded border border-border px-3 py-1 hover:bg-accent'

function Lab() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-xl font-semibold text-primary">Phòng thu: nhạc và hiệu ứng</h1>
      <section className="space-y-2">
        <h2 className="font-medium">Nhạc nền</h2>
        {(Object.keys(THEMES) as ThemeId[]).map((id) => (
          <div key={id} className="flex items-center gap-2">
            <span className="w-64">{THEMES[id].title}</span>
            <button className={btn} onClick={() => (gameAudio.unlock(), gameAudio.playTheme(id))}>
              Phát
            </button>
            <button className={btn} onClick={() => download(`nhac-${id}.wav`, renderTheme(id, 60))}>
              Tải WAV 60s
            </button>
          </div>
        ))}
        <button className={btn} onClick={() => gameAudio.stopMusic()}>
          Dừng nhạc
        </button>
      </section>
      <section className="space-y-2">
        <h2 className="font-medium">Hiệu ứng</h2>
        <div className="grid grid-cols-2 gap-2">
          {SFX_LIST.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <button className={btn} onClick={() => (gameAudio.unlock(), gameAudio.sfx(id as SfxId))}>
                {label}
              </button>
              <button className="text-xs underline" onClick={() => download(`sfx-${id}.wav`, renderSfx(id))}>
                wav
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Lab />)
