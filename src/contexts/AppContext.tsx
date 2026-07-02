import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { LangCode } from '../data/translations'
import type { CategoryId } from '../data/categories'

export type PageView = 'home' | 'category' | 'package'

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
  concernId: string | null
  setConcernId: (id: string | null) => void
  consultCard: ConsultCard | null
  setConsultCard: (c: ConsultCard | null) => void
  // helpers
  goToCategory: (id: CategoryId, concernId?: string | null) => void
  goToPackage: () => void
  goHome: () => void
}

const AppContext = createContext<AppState>({} as AppState)

export function AppProvider({ children, initialLang = 'zh' }: { children: ReactNode; initialLang?: LangCode }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [lang, setLang] = useState<LangCode>(initialLang)
  const [page, setPage] = useState<PageView>('home')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [concernId, setConcernId] = useState<string | null>(null)
  const [consultCard, setConsultCard] = useState<ConsultCard | null>(null)

  // URL 파라미터로 초기 상태 복원 (링크 공유, 뒤로가기 지원)
  useEffect(() => {
    const cat = searchParams.get('cat') as CategoryId | null
    const concern = searchParams.get('concern')
    const pageParam = searchParams.get('page')

    if (cat) {
      setCategoryId(cat)
      setConcernId(concern)
      setPage('category')
    } else if (pageParam === 'package') {
      setPage('package')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToCategory = (id: CategoryId, cId?: string | null) => {
    setCategoryId(id)
    setConcernId(cId ?? null)
    setPage('category')
    const params = new URLSearchParams({ cat: id })
    if (cId) params.set('concern', cId)
    navigate({ search: '?' + params.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPackage = () => {
    setPage('package')
    navigate({ search: '?page=package' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setPage('home')
    setCategoryId(null)
    setConcernId(null)
    navigate({ search: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AppContext.Provider value={{
      lang, setLang,
      page, setPage,
      categoryId, setCategoryId,
      concernId, setConcernId,
      consultCard, setConsultCard,
      goToCategory, goToPackage, goHome,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
