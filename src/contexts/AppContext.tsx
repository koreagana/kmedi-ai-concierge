import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { LangCode } from '../data/translations'
import type { CategoryId } from '../data/categories'

export type PageView = 'home' | 'category'

export interface ConsultCard {
  interests: string[]
  timing: string
  duration: string
  worries: string[]
  contactMethod: string
}

interface AppState {
  lang: LangCode
  setLang: (l: LangCode) => void
  page: PageView
  setPage: (p: PageView) => void
  categoryId: CategoryId | null
  setCategoryId: (id: CategoryId | null) => void
  consultCard: ConsultCard | null
  setConsultCard: (c: ConsultCard | null) => void
  // helpers
  goToCategory: (id: CategoryId) => void
  goHome: () => void
}

const AppContext = createContext<AppState>({} as AppState)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>('zh')
  const [page, setPage] = useState<PageView>('home')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [consultCard, setConsultCard] = useState<ConsultCard | null>(null)

  const goToCategory = (id: CategoryId) => {
    setCategoryId(id)
    setPage('category')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setPage('home')
    setCategoryId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AppContext.Provider value={{
      lang, setLang,
      page, setPage,
      categoryId, setCategoryId,
      consultCard, setConsultCard,
      goToCategory, goHome,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
