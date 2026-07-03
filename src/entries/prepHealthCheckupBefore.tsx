import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PrepHealthCheckupBeforePage from '../components/PrepHealthCheckupBeforePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrepHealthCheckupBeforePage />
  </StrictMode>,
)
