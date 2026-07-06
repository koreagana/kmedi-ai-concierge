import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import ArApp from './ArApp'
import ShopMainPage from './components/ShopMainPage'
import ShopDetailPage from './components/ShopDetailPage'
import ShopOrderPage from './components/ShopOrderPage'
import PharmicellCreamPage from './components/PharmicellCreamPage'
import TermsPage from './components/TermsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/shop" element={<ShopMainPage />} />
        <Route path="/shop/order" element={<ShopOrderPage />} />
        <Route path="/shop/pharmicell-panthenol-cream" element={<PharmicellCreamPage />} />
        <Route path="/shop/:productId" element={<ShopDetailPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/zh/*" element={<App key="zh" initialLang="zh" />} />
        <Route path="/en/*" element={<App key="en" initialLang="en" />} />
        <Route path="/ko/*" element={<App key="ko" initialLang="ko" />} />
        <Route path="/ar/*" element={<ArApp key="ar" />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
