/** Offline rendering, for the audio lab and for exporting previews as WAV. */
import { Mixer, rng } from './core'
import { playSfx, type SfxId } from './sfx'
import { THEMES, type ThemeId } from './themes'

export async function renderTheme(id: ThemeId, seconds: number, seed = 1) {
  const ctx = new OfflineAudioContext(2, Math.ceil(44100 * (seconds + 3)), 44100)
  const mixer = new Mixer(ctx)
  mixer.music.gain.value = 0.8
  const out = mixer.out(mixer.music, id === 'interrogation' ? 0.18 : 0.32)
  const theme = THEMES[id]
  const r = rng(seed)
  const stop = theme.ambience?.(out, 0)
  const barLen = (60 / theme.bpm) * theme.beats
  for (let bar = 0, t = 0.05; t < seconds; bar++, t += barLen) theme.bar(out, t, bar, r)
  stop?.(seconds - 0.5)
  // Fade the end of the preview.
  for (const f of out.faders) {
    f.gain.setValueAtTime(theme.level ?? 1, 0)
    f.gain.setValueAtTime(theme.level ?? 1, seconds - 2)
    f.gain.linearRampToValueAtTime(0.0001, seconds + 1)
  }
  return ctx.startRendering()
}

export async function renderSfx(id: SfxId) {
  const ctx = new OfflineAudioContext(2, 44100 * 3, 44100)
  const mixer = new Mixer(ctx)
  playSfx(mixer.out(mixer.sfx, 0.15), id, 0.02)
  return ctx.startRendering()
}
