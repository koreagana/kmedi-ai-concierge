import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PrepBloodTestBeforePage from '../components/PrepBloodTestBeforePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrepBloodTestBeforePage />
  </StrictMode>,
)
