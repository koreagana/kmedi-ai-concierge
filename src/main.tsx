import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import './index.css'
import App from './App'
import TermsPage from './components/TermsPage'
import PrivacyPage from './components/PrivacyPage'
import { categories } from './data/categories'
import { SKIN } from './skin'

// kmedispring.com(editorial 스킨)은 개인정보처리방침·이용약관도 Editorial 틀로 — default 빌드에선 번들에서 빠진다.
const EditorialPrivacy = SKIN === 'editorial'
  ? lazy(() => import('./skins/editorial/EditorialLegal').then((m) => ({ default: m.EditorialPrivacy })))
  : null
const EditorialTerms = SKIN === 'editorial'
  ? lazy(() => import('./skins/editorial/EditorialLegal').then((m) => ({ default: m.EditorialTerms })))
  : null

const privacyElement = (lang: 'zh' | 'en') =>
  EditorialPrivacy ? <Suspense fallback={null}><EditorialPrivacy lang={lang} /></Suspense> : <PrivacyPage lang={lang} />
const termsElement = EditorialTerms ? <Suspense fallback={null}><EditorialTerms /></Suspense> : <TermsPage />

// medical-tourism은 CategoryPage가 없고 항상 패키지 페이지로 리다이렉트되는 항목이라
// 고유 경로를 만들지 않는다(AppContext의 medical-tourism 처리와 일관).
const categoryRoutes = categories.filter((c) => c.id !== 'medical-tourism')

/** 세부 항목 고유 경로(/zh/skin-beauty/skin-lifting) — 항목마다 App을 새로 마운트해서
    AppContext가 경로를 처음부터 다시 읽게 한다(카테고리 경로와 같은 방식). */
function TopicRoute({ lang, categoryId }: { lang: 'zh' | 'en'; categoryId: string }) {
  const { topic } = useParams()
  return <App key={`${lang}-${categoryId}-${topic}`} initialLang={lang} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/zh" replace />} />
        <Route path="/terms" element={termsElement} />
        <Route path="/zh/privacy" element={privacyElement('zh')} />
        <Route path="/en/privacy" element={privacyElement('en')} />
        <Route path="/zh/surgery-price" element={<App key="zh-surgery" initialLang="zh" />} />
        <Route path="/en/surgery-price" element={<App key="en-surgery" initialLang="en" />} />
        <Route path="/zh/quote" element={<App key="zh-quote" initialLang="zh" />} />
        <Route path="/en/quote" element={<App key="en-quote" initialLang="en" />} />
        {categoryRoutes.map((c) => (
          <Route key={`zh-${c.id}-topic`} path={`/zh/${c.id}/:topic`} element={<TopicRoute lang="zh" categoryId={c.id} />} />
        ))}
        {categoryRoutes.map((c) => (
          <Route key={`en-${c.id}-topic`} path={`/en/${c.id}/:topic`} element={<TopicRoute lang="en" categoryId={c.id} />} />
        ))}
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
