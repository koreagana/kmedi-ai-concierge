import { AppProvider, useApp } from './contexts/AppContext'
import NavBar from './components/NavBar'
import ArHomePage from './components/ArHomePage'
import CategoryPage from './components/CategoryPage'
import PackagePage from './components/PackagePage'
import FloatingChatButton from './components/FloatingChatButton'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { categories } from './data/categories'
import { translations } from './data/translations'
import { updateCanonical } from './seo'

const PACKAGE_TITLE_AR = 'السياحة الطبية المميزة'

function updateMeta(title: string | null) {
  updateCanonical('ar')

  const brand = `${translations.ar.brandName} · AI Medical Concierge`
  const fullTitle = title ? `${title} · ${brand}` : brand
  document.title = fullTitle

  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = fullTitle
  const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
  if (twTitle) twTitle.content = fullTitle

  const desc = translations.ar.aboutDesc.replace(/\n/g, ' ').slice(0, 150)
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (metaDesc) metaDesc.content = desc
  const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (ogDesc) ogDesc.content = desc
  const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
  if (twDesc) twDesc.content = desc
}

function ArPageRouter() {
  const { page, categoryId } = useApp()

  useEffect(() => {
    if (page === 'home') {
      updateMeta(null)
      return
    }
    if (page === 'package') {
      updateMeta(PACKAGE_TITLE_AR)
      return
    }
    if (page === 'category' && categoryId) {
      const cat = categories.find((c) => c.id === categoryId)
      if (cat) updateMeta(cat.ar ?? cat.zh)
    }
  }, [page, categoryId])

  return (
    <div className="page-container" dir="rtl">
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
            <ArHomePage />
          </motion.div>
        ) : page === 'package' ? (
          <motion.div
            key="package"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <PackagePage />
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <CategoryPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ArApp() {
  return (
    <AppProvider initialLang="ar">
      <div className="app-shell">
        <ArPageRouter />
        <FloatingChatButton />
      </div>
    </AppProvider>
  )
}
