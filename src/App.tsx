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
import { seoMeta } from './data/seoMeta'
import { updateCanonical } from './seo'
import { useEffect } from 'react'

const PACKAGE_TITLE: Record<LangCode, string> = {
  zh: '汉江春天 医疗旅游精品',
  en: 'Premium Medical Tourism',
}

const QUOTE_TITLE: Record<LangCode, string> = {
  zh: '热门轻医美项目费用预估',
  en: 'Popular Treatment Price Estimate',
}

const SURGERY_TITLE: Record<LangCode, string> = {
  zh: '韩国整形手术价格',
  en: 'Surgery Price List',
}

/** document.title / og:title / twitter:title / (og·twitter·기본) description meta를
    현재 언어(lang)에 맞게 동적으로 업데이트. title이 없으면(홈) SEO 전용 문구(seoMeta)를 그대로 씀.
    그 외 페이지는 브랜드 접미사를 붙이고, description은 translations의 aboutDesc를 150자로 잘라서 씀. */
function updateMeta(title: string | null, lang: LangCode) {
  updateCanonical(lang)

  const isHome = title === null
  const brand = `${translations[lang].brandName} · AI Medical Concierge`
  const fullTitle = isHome ? seoMeta[lang].title : `${title} · ${brand}`
  document.title = fullTitle

  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = fullTitle
  const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
  if (twTitle) twTitle.content = fullTitle

  const desc = isHome
    ? seoMeta[lang].description
    : translations[lang].aboutDesc.replace(/\n/g, ' ').slice(0, 150)
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (metaDesc) metaDesc.content = desc
  const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (ogDesc) ogDesc.content = desc
  const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
  if (twDesc) twDesc.content = desc
}

function PageRouter() {
  const { page, lang, categoryId } = useApp()

  // 페이지/카테고리/언어 변경 시 title·description meta 업데이트
  useEffect(() => {
    if (page === 'home') {
      updateMeta(null, lang)
      return
    }
    if (page === 'package') {
      updateMeta(PACKAGE_TITLE[lang] ?? PACKAGE_TITLE['zh'], lang)
      return
    }
    if (page === 'quote') {
      updateMeta(QUOTE_TITLE[lang] ?? QUOTE_TITLE['zh'], lang)
      return
    }
    if (page === 'surgery') {
      updateMeta(SURGERY_TITLE[lang] ?? SURGERY_TITLE['zh'], lang)
      return
    }
    if (page === 'category' && categoryId) {
      const cat = categories.find((c) => c.id === categoryId)
      if (cat) {
        const name = (cat as unknown as Record<string, string>)[lang] ?? cat.zh
        updateMeta(name, lang)
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
