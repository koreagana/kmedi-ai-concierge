import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PrepImagingBeforePage from '../components/PrepImagingBeforePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrepImagingBeforePage />
  </StrictMode>,
)
