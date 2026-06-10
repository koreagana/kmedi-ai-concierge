import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import ArApp from './ArApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/zh/*" element={<App initialLang="zh" />} />
        <Route path="/en/*" element={<App initialLang="en" />} />
        <Route path="/ko/*" element={<App initialLang="ko" />} />
        <Route path="/ar/*" element={<ArApp />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
