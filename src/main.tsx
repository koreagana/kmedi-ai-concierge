import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import TermsPage from './components/TermsPage'
import PrivacyPage from './components/PrivacyPage'
import { categories } from './data/categories'

// medical-tourism은 CategoryPage가 없고 항상 패키지 페이지로 리다이렉트되는 항목이라
// 고유 경로를 만들지 않는다(AppContext의 medical-tourism 처리와 일관).
const categoryRoutes = categories.filter((c) => c.id !== 'medical-tourism')

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
        {categoryRoutes.map((c) => (
          <Route key={`zh-${c.id}`} path={`/zh/${c.id}`} element={<App key={`zh-${c.id}`} initialLang="zh" />} />
        ))}
        {categoryRoutes.map((c) => (
          <Route key={`en-${c.id}`} path={`/en/${c.id}`} element={<App key={`en-${c.id}`} initialLang="en" />} />
        ))}
        <Route path="/zh/*" element={<App key="zh" initialLang="zh" />} />
        <Route path="/en/*" element={<App key="en" initialLang="en" />} />
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
