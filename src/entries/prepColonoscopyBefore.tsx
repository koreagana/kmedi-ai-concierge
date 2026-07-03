import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PrepColonoscopyBeforePage from '../components/PrepColonoscopyBeforePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrepColonoscopyBeforePage />
  </StrictMode>,
)
