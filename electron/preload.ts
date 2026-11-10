import { contextBridge } from 'electron'

// The bridge between the game (renderer) and the PC. Save files and Steam
// (steamworks.js) will be exposed here later; keep the renderer free of Node APIs.
contextBridge.exposeInMainWorld('platform', {
  name: 'electron',
  versions: { electron: process.versions.electron, chrome: process.versions.chrome },
})
