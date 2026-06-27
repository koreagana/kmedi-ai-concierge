import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import ArApp from './ArApp'
import FunctionalIntakePage from './components/FunctionalIntakePage'
import AdminPrepPage from './components/AdminPrepPage'
import PrepHealthCheckupBeforePage from './components/PrepHealthCheckupBeforePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/intake/functional" element={<FunctionalIntakePage />} />
        <Route path="/admin/prep" element={<AdminPrepPage />} />
        <Route path="/prep/health-checkup-before" element={<PrepHealthCheckupBeforePage />} />
        <Route path="/zh/*" element={<App key="zh" initialLang="zh" />} />
        <Route path="/en/*" element={<App key="en" initialLang="en" />} />
        <Route path="/ko/*" element={<App key="ko" initialLang="ko" />} />
        <Route path="/ar/*" element={<ArApp key="ar" />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
