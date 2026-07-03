import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPrepPage from '../components/AdminPrepPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminPrepPage />
  </StrictMode>,
)
