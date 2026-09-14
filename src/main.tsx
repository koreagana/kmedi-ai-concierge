import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import TermsPage from './components/TermsPage'
import PrivacyPage from './components/PrivacyPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/zh/privacy" element={<PrivacyPage lang="zh" />} />
        <Route path="/en/privacy" element={<PrivacyPage lang="en" />} />
        <Route path="/zh/surgery-price" element={<App key="zh-surgery" initialLang="zh" />} />
        <Route path="/en/surgery-price" element={<App key="en-surgery" initialLang="en" />} />
        <Route path="/zh/*" element={<App key="zh" initialLang="zh" />} />
        <Route path="/en/*" element={<App key="en" initialLang="en" />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
