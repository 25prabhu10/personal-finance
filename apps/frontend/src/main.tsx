import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './app.tsx'

const container = document.getElementById('root')

if (container !== null) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
