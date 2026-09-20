import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { SocialProvider } from './context/SocialContext'
import { PlayerProvider } from './context/PlayerContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SocialProvider>
        <PlayerProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </PlayerProvider>
      </SocialProvider>
    </ThemeProvider>
  </StrictMode>,
)
