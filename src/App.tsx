import { AppProvider, useApp } from './contexts/AppContext'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import { AnimatePresence, motion } from 'framer-motion'

function PageRouter() {
  const { page } = useApp()
  return (
    <div className="page-container">
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

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <PageRouter />
      </div>
    </AppProvider>
  )
}
