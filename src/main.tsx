import React from 'react'
import ReactDOM from 'react-dom/client'
import '@xyflow/react/dist/style.css'
import '@fontsource/barlow-condensed/vietnamese-600.css'
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-600.css'
import '@fontsource/be-vietnam-pro/latin-600.css'
import '@fontsource/ibm-plex-mono/vietnamese-400.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/bitter/vietnamese-700.css'
import '@fontsource/bitter/latin-700.css'
import './index.css'
import App from './App'
import { bindGameAudio } from './audio/bindings'

bindGameAudio()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
