import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ArApp from './ArApp'

const isArPage = window.location.pathname.startsWith('/ar')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isArPage ? <ArApp /> : <App />}
  </StrictMode>,
)
