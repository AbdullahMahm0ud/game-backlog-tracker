import './index.css'
import App from './App.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GamesProvider } from './context/GamesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GamesProvider>
      <App />
    </GamesProvider>
  </StrictMode>,
)
