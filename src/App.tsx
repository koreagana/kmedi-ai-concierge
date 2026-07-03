import { AppProvider, useApp } from './contexts/AppContext'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import PackagePage from './components/PackagePage'
import { AnimatePresence, motion } from 'framer-motion'
import type { LangCode } from './data/translations'
import { categories } from './data/categories'
import { useEffect } from 'react'

const BRAND = '汉江春天 · AI Medical Concierge'

const PACKAGE_TITLE: Record<LangCode, string> = {
  zh: '汉江春天 医疗旅游精品',
  ko: '한강애봄 의료관광 프리미엄',
  en: 'Premium Medical Tourism',
  ar: 'السياحة الطبية المميزة',
}

/** document.title 과 og:title meta를 동적으로 업데이트 */
function updateMeta(title: string) {
  document.title = `${title} · ${BRAND}`
  const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (og) og.content = `${title} · ${BRAND}`
}

function PageRouter() {
  const { page, lang, categoryId } = useApp()

  // 페이지/카테고리/언어 변경 시 title·og:title 업데이트
  useEffect(() => {
    if (page === 'home') {
      document.title = BRAND
      const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
      if (og) og.content = BRAND
      return
    }
    if (page === 'package') {
      updateMeta(PACKAGE_TITLE[lang] ?? PACKAGE_TITLE['zh'])
      return
    }
    if (page === 'category' && categoryId) {
      const cat = categories.find((c) => c.id === categoryId)
      if (cat) {
        const name = (cat as unknown as Record<string, string>)[lang] ?? cat.zh
        updateMeta(name)
      }
    }
  }, [page, lang, categoryId])

  return (
    <div className="page-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
      </div>
    </AppProvider>
  )
}
