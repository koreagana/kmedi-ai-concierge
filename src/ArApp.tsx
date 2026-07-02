import { AppProvider, useApp } from './contexts/AppContext'
import NavBar from './components/NavBar'
import ArHomePage from './components/ArHomePage'
import CategoryPage from './components/CategoryPage'
import PackagePage from './components/PackagePage'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { categories } from './data/categories'

const BRAND = '汉江春天 · AI Medical Concierge'

const PACKAGE_TITLE_AR = 'السياحة الطبية المميزة'

function updateMeta(title: string) {
  document.title = `${title} · ${BRAND}`
  const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (og) og.content = `${title} · ${BRAND}`
}

function ArPageRouter() {
  const { page, categoryId } = useApp()

  useEffect(() => {
    if (page === 'home') {
      document.title = BRAND
      const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
      if (og) og.content = BRAND
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
      </div>
    </AppProvider>
  )
}
