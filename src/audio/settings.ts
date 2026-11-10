import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { gameAudio, type AudioSettings } from './engine'

interface AudioSettingsState extends AudioSettings {
  set: (patch: Partial<AudioSettings>) => void
}

/** Volume and mute, remembered between sessions. */
export const useAudioSettings = create<AudioSettingsState>()(
  persist(
    (set) => ({
      music: 0.6,
      sfx: 0.8,
      muted: false,
      set: (patch) => set(patch),
    }),
    { name: 'hsbt-audio', partialize: ({ music, sfx, muted }) => ({ music, sfx, muted }) },
  ),
)

const push = ({ music, sfx, muted }: AudioSettings) => gameAudio.setSettings({ music, sfx, muted })
push(useAudioSettings.getState())
useAudioSettings.subscribe(push)
