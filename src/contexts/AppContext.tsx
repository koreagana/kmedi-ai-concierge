import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import type { LangCode } from '../data/translations'
import type { CategoryId } from '../data/categories'

export type PageView = 'home' | 'category' | 'package' | 'quote' | 'surgery'

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
  /** goToQuote()로 전달된 카테고리/시술 힌트 — QuotePage가 초기 활성 탭·스크롤 대상으로 사용 */
  quoteCategoryHint: string | null
  quoteProcedureHint: string | null
  // helpers
  goToCategory: (id: CategoryId, concernId?: string | null) => void
  goToPackage: () => void
  goToQuote: (categoryId?: string, procedureId?: string) => void
  goToSurgery: () => void
  goHome: () => void
}

const AppContext = createContext<AppState>({} as AppState)

export function AppProvider({ children, initialLang = 'zh' }: { children: ReactNode; initialLang?: LangCode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [lang, setLang] = useState<LangCode>(initialLang)
  const [page, setPage] = useState<PageView>('home')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [concernId, setConcernId] = useState<string | null>(null)
  const [consultCard, setConsultCard] = useState<ConsultCard | null>(null)
  const [quoteCategoryHint, setQuoteCategoryHint] = useState<string | null>(null)
  const [quoteProcedureHint, setQuoteProcedureHint] = useState<string | null>(null)

  // URL 파라미터로 초기 상태 복원 (링크 공유, 뒤로가기 지원)
  useEffect(() => {
    const cat = searchParams.get('cat') as CategoryId | null
    const concern = searchParams.get('concern')
    const pageParam = searchParams.get('page')

    // /zh/surgery-price, /en/surgery-price — 고유 경로로 직접 진입한 경우
    if (location.pathname.endsWith('/surgery-price')) {
      setPage('surgery')
    } else if (cat) {
      setCategoryId(cat)
      setConcernId(concern)
      setPage('category')
    } else if (pageParam === 'package') {
      setPage('package')
    } else if (pageParam === 'surgery') {
      // 구 방식(?page=surgery) 공유 링크 하위호환
      setPage('surgery')
    } else if (pageParam === 'quote') {
      setPage('quote')
      setQuoteCategoryHint(searchParams.get('qcat'))
      setQuoteProcedureHint(searchParams.get('qproc'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // surgery-price는 고유 경로를 쓰므로, 거기서 다른 페이지로 옮길 때 경로도
  // 항상 /zh 또는 /en으로 되돌려야 URL과 실제 내용이 어긋나지 않는다.
  const goToCategory = (id: CategoryId, cId?: string | null) => {
    setCategoryId(id)
    setConcernId(cId ?? null)
    setPage('category')
    const params = new URLSearchParams({ cat: id })
    if (cId) params.set('concern', cId)
    navigate(`/${lang}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPackage = () => {
    setPage('package')
    navigate(`/${lang}?page=package`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToQuote = (categoryId?: string, procedureId?: string) => {
    setPage('quote')
    setQuoteCategoryHint(categoryId ?? null)
    setQuoteProcedureHint(procedureId ?? null)
    const params = new URLSearchParams({ page: 'quote' })
    if (categoryId) params.set('qcat', categoryId)
    if (procedureId) params.set('qproc', procedureId)
    navigate(`/${lang}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToSurgery = () => {
    setPage('surgery')
    navigate(`/${lang}/surgery-price`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setPage('home')
    setCategoryId(null)
    setConcernId(null)
    navigate(`/${lang}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AppContext.Provider value={{
      lang, setLang,
      page, setPage,
      categoryId, setCategoryId,
      concernId, setConcernId,
      consultCard, setConsultCard,
      quoteCategoryHint, quoteProcedureHint,
      goToCategory, goToPackage, goToQuote, goToSurgery, goHome,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
