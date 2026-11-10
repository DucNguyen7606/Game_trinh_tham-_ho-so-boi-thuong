/**
 * The game's audio system: one AudioContext, a music player that crossfades
 * between generative themes, and fire-and-forget sound effects.
 */
import { Mixer, rng, type Out } from './core'
import { playSfx, type SfxId } from './sfx'
import { THEMES, type ThemeId } from './themes'

const LOOKAHEAD = 0.8 // seconds of music scheduled ahead of the clock
const FADE = 2.5 // crossfade length in seconds

interface Running {
  id: ThemeId
  out: Out & { faders: GainNode[] }
  nextBar: number
  bar: number
  rnd: () => number
}

export interface AudioSettings {
  music: number // 0..1
  sfx: number // 0..1
  muted: boolean
}

class GameAudio {
  private ctx?: AudioContext
  private mixer?: Mixer
  private current?: Running
  private wanted?: ThemeId
  private settings: AudioSettings = { music: 0.6, sfx: 0.8, muted: false }

  /** Creates the context lazily; browsers only allow it after a gesture. */
  private ensure() {
    if (!this.ctx) {
      this.ctx = new AudioContext({ latencyHint: 'interactive' })
      this.mixer = new Mixer(this.ctx)
      this.applySettings()
      window.setInterval(() => this.pump(), 200)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.mixer!
  }

  /** Call from any user gesture; starts the requested theme if waiting. */
  unlock() {
    this.ensure()
    if (this.ctx?.state === 'running' && this.wanted && this.current?.id !== this.wanted) this.playTheme(this.wanted)
  }

  get started() {
    return !!this.ctx && this.ctx.state === 'running'
  }

  setSettings(s: AudioSettings) {
    this.settings = s
    this.applySettings()
  }

  private applySettings() {
    if (!this.mixer || !this.ctx) return
    const t = this.ctx.currentTime
    const { music, sfx, muted } = this.settings
    // Squared curve feels more even to the ear than a linear slider.
    this.mixer.master.gain.setTargetAtTime(muted ? 0 : 1, t, 0.05)
    this.mixer.music.gain.setTargetAtTime(music * music * 0.9, t, 0.05)
    this.mixer.sfx.gain.setTargetAtTime(sfx * sfx, t, 0.05)
  }

  playTheme(id: ThemeId) {
    this.wanted = id
    // Electron lets audio start right away; a browser waits for the first gesture.
    this.ensure()
    if (this.ctx!.state !== 'running') {
      void this.ctx!.resume().then(() => this.unlock())
      return
    }
    if (this.current?.id === id) return
    const mixer = this.mixer!
    const t = this.ctx!.currentTime + 0.05
    this.fadeOut(t)

    const out = mixer.out(mixer.music, id === 'interrogation' ? 0.18 : 0.32)
    const theme = THEMES[id]
    for (const f of out.faders) {
      f.gain.setValueAtTime(0.0001, t)
      f.gain.linearRampToValueAtTime(theme.level ?? 1, t + FADE)
    }
    this.current = {
      id,
      out,
      nextBar: t + 0.1,
      bar: 0,
      rnd: rng(Date.now() & 0xffff),
    }
    this.pump()
  }

  stopMusic() {
    this.wanted = undefined
    if (this.ctx) this.fadeOut(this.ctx.currentTime)
  }

  private fadeOut(t: number) {
    const old = this.current
    if (!old) return
    this.current = undefined
    for (const f of old.out.faders) {
      f.gain.cancelScheduledValues(t)
      f.gain.setValueAtTime(f.gain.value, t)
      f.gain.linearRampToValueAtTime(0.0001, t + FADE)
    }
    // Notes already scheduled keep playing into silent nodes; drop them later.
    window.setTimeout(() => old.out.faders.forEach((f) => f.disconnect()), (FADE + 6) * 1000)
  }

  /** Scheduler tick: keeps whole bars queued slightly ahead of the clock. */
  private pump() {
    const cur = this.current
    if (!cur || !this.ctx || !this.mixer) return
    const theme = THEMES[cur.id]
    const barLen = (60 / theme.bpm) * theme.beats
    // If the window was hidden long enough to fall behind, skip ahead.
    if (cur.nextBar < this.ctx.currentTime) cur.nextBar = this.ctx.currentTime + 0.05
    while (cur.nextBar < this.ctx.currentTime + LOOKAHEAD) {
      theme.bar(cur.out, cur.nextBar, cur.bar, cur.rnd)
      cur.bar++
      cur.nextBar += barLen
    }
  }

  sfx(id: SfxId, delay = 0) {
    if (this.settings.muted || this.settings.sfx === 0) return
    const mixer = this.ensure()
    if (this.ctx!.state !== 'running') return
    const out = mixer.out(mixer.sfx, 0.15)
    playSfx(out, id, this.ctx!.currentTime + delay)
    window.setTimeout(() => out.faders.forEach((f) => f.disconnect()), (delay + 4) * 1000)
  }
}

export const gameAudio = new GameAudio()
