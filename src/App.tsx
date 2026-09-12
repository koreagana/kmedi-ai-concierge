import { AppProvider, useApp } from './contexts/AppContext'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import PackagePage from './components/PackagePage'
import QuotePage from './components/QuotePage'
import SurgeryPricePage from './components/SurgeryPricePage'
import FloatingChatButton from './components/FloatingChatButton'
import { AnimatePresence, motion } from 'framer-motion'
import { translations, type LangCode } from './data/translations'
import { categories } from './data/categories'
import { seoMeta, surgeryMeta } from './data/seoMeta'
import { updatePageSeo } from './seo'
import { useEffect } from 'react'

const PACKAGE_TITLE: Record<LangCode, string> = {
  zh: '汉江春天 医疗旅游精品',
  en: 'Premium Medical Tourism',
}

const QUOTE_TITLE: Record<LangCode, string> = {
  zh: '热门轻医美项目费用预估',
  en: 'Popular Treatment Price Estimate',
}

/** document.title / og:title / twitter:title / description meta 및 canonical·hreflang을
    한 번에 갱신. zhPath/enPath는 이 페이지의 언어별 실제 경로 — 페이지마다 canonical이
    달라지므로(홈은 /zh·/en, 성형수가표는 /zh/surgery-price·/en/surgery-price) 호출부에서 넘긴다. */
function updateMeta({
  lang, zhPath, enPath, title, description,
}: { lang: LangCode; zhPath: string; enPath: string; title: string; description: string }) {
  updatePageSeo({ lang, zhPath, enPath })

  document.title = title
  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = title
  const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
  if (twTitle) twTitle.content = title

  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (metaDesc) metaDesc.content = description
  const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (ogDesc) ogDesc.content = description
  const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
  if (twDesc) twDesc.content = description
}

/** 고유 URL이 없는 페이지(package/quote/category)용 — canonical은 언어 루트를 가리키고,
    title은 브랜드 접미사를 붙이고 description은 aboutDesc를 150자로 잘라 씀. */
function updateMetaGeneric(title: string, lang: LangCode) {
  const brand = `${translations[lang].brandName} · AI Medical Concierge`
  const description = translations[lang].aboutDesc.replace(/\n/g, ' ').slice(0, 150)
  updateMeta({ lang, zhPath: '/zh', enPath: '/en', title: `${title} · ${brand}`, description })
}

function PageRouter() {
  const { page, lang, categoryId } = useApp()

  // 페이지/카테고리/언어 변경 시 title·description meta 업데이트
  useEffect(() => {
    if (page === 'home') {
      updateMeta({ lang, zhPath: '/zh', enPath: '/en', title: seoMeta[lang].title, description: seoMeta[lang].description })
      return
    }
    if (page === 'surgery') {
      updateMeta({
        lang, zhPath: '/zh/surgery-price', enPath: '/en/surgery-price',
        title: surgeryMeta[lang].title, description: surgeryMeta[lang].description,
      })
      return
    }
    if (page === 'package') {
      updateMetaGeneric(PACKAGE_TITLE[lang] ?? PACKAGE_TITLE['zh'], lang)
      return
    }
    if (page === 'quote') {
      updateMetaGeneric(QUOTE_TITLE[lang] ?? QUOTE_TITLE['zh'], lang)
      return
    }
    if (page === 'category' && categoryId) {
      const cat = categories.find((c) => c.id === categoryId)
      if (cat) {
        const name = (cat as unknown as Record<string, string>)[lang] ?? cat.zh
        updateMetaGeneric(name, lang)
      }
    }
  }, [page, lang, categoryId])

  return (
    <div className="page-container" dir="ltr">
      <NavBar />
      <AnimatePresence mode="wait">
        {page === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage />
          </motion.div>
        ) : page === 'package' ? (
          <motion.div
            key="package"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <PackagePage />
          </motion.div>
        ) : page === 'surgery' ? (
          <motion.div
            key="surgery"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <SurgeryPricePage />
          </motion.div>
        ) : page === 'quote' ? (
          <motion.div
            key="quote"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <QuotePage />
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <CategoryPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App({ initialLang = 'zh' }: { initialLang?: LangCode }) {
  return (
    <AppProvider initialLang={initialLang}>
      <div className="app-shell">
        <PageRouter />
        <FloatingChatButton />
      </div>
    </AppProvider>
  )
}
