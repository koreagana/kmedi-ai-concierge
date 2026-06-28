import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import ArApp from './ArApp'
import ShopPage from './components/ShopPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/zh/*" element={<App key="zh" initialLang="zh" />} />
        <Route path="/en/*" element={<App key="en" initialLang="en" />} />
        <Route path="/ko/*" element={<App key="ko" initialLang="ko" />} />
        <Route path="/ar/*" element={<ArApp key="ar" />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
