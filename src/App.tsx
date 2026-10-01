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
import { CATEGORY_SUBMENUS } from './data/categorySubmenus'
import { seoMeta, surgeryMeta } from './data/seoMeta'
import { updatePageSeo, updateBreadcrumbLd } from './seo'
import { lazy, Suspense, useEffect } from 'react'
import { SKIN, siteText } from './skin'

// kmedispring.com(editorial 스킨) 전용 — SKIN이 빌드 타임 상수라 default 빌드에선 이 청크와 CSS가 아예 빠진다.
const EditorialPages = SKIN === 'editorial' ? lazy(() => import('./skins/editorial/EditorialPages')) : null

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

/** 고유 URL이 없는 페이지(package)용 — canonical은 언어 루트를 가리키고,
    title은 브랜드 접미사를 붙이고 description은 aboutDesc를 150자로 잘라 씀. */
/** 페이지 제목 뒤에 붙는 브랜드 꼬리. kmedispring.com은 손님이 실제로 검색하는 말(韩国医疗旅游)을 넣는다.
    ai-kmedi.com은 기존 그대로. */
function brandSuffix(lang: LangCode) {
  if (SKIN === 'editorial') return lang === 'zh' ? '韩国医疗旅游咨询 | 汉江春天' : 'Korea Medical Travel | K-MediSpring'
  return `${translations[lang].brandName} · AI Medical Concierge`
}

/** 경로 구조화 데이터의 첫 칸(홈) */
const home = (lang: LangCode) => ({ name: lang === 'zh' ? '首页' : 'Home', path: `/${lang}` })

function updateMetaGeneric(title: string, lang: LangCode) {
  const brand = brandSuffix(lang)
  const description = siteText(translations[lang].aboutDesc).replace(/\n/g, ' ').slice(0, 150)
  updateMeta({ lang, zhPath: '/zh', enPath: '/en', title: `${title} · ${brand}`, description })
}

function PageRouter() {
  const { page, lang, categoryId, topicId } = useApp()

  // 페이지/카테고리/언어 변경 시 title·description meta 업데이트
  useEffect(() => {
    if (page === 'partners' && SKIN === 'editorial') {
      const brand = brandSuffix(lang)
      updateBreadcrumbLd([home(lang), { name: lang === 'zh' ? '全程服务 · 合作医疗机构' : 'Our Services & Partners', path: `/${lang}/partners` }])
      updateMeta({
        lang, zhPath: '/zh/partners', enPath: '/en/partners',
        title: `${lang === 'zh' ? '全程陪伴您的韩国诊疗 · 合作医疗机构' : 'Full-Journey Care & Partner Hospitals'} · ${brand}`,
        description: lang === 'zh'
          ? '我们不只是介绍医院。从预约前到诊疗后，为您衔接每一个必要环节，并介绍汉江春天的韩国合作医疗机构。'
          : 'We do more than introduce hospitals — from booking to aftercare we connect every step, alongside our partner hospitals in Korea.',
      })
      return
    }
    if (page === 'home' || page === 'partners') {
      updateBreadcrumbLd([])
      updateMeta({ lang, zhPath: '/zh', enPath: '/en', title: seoMeta[lang].title, description: seoMeta[lang].description })
      return
    }
    if (page === 'surgery') {
      updateBreadcrumbLd([home(lang), { name: translations[lang].surgeryBtnTitle, path: `/${lang}/surgery-price` }])
      updateMeta({
        lang, zhPath: '/zh/surgery-price', enPath: '/en/surgery-price',
        title: surgeryMeta[lang].title, description: surgeryMeta[lang].description,
      })
      return
    }
    if (page === 'package') {
      updateBreadcrumbLd([])
      updateMetaGeneric(PACKAGE_TITLE[lang] ?? PACKAGE_TITLE['zh'], lang)
      return
    }
    if (page === 'quote') {
      const brand = brandSuffix(lang)
      const description = siteText(translations[lang].aboutDesc).replace(/\n/g, ' ').slice(0, 150)
      updateBreadcrumbLd([home(lang), { name: QUOTE_TITLE[lang] ?? QUOTE_TITLE['zh'], path: `/${lang}/quote` }])
      updateMeta({
        lang,
        zhPath: '/zh/quote',
        enPath: '/en/quote',
        title: `${QUOTE_TITLE[lang] ?? QUOTE_TITLE['zh']} · ${brand}`,
        description,
      })
      return
    }
    if (page === 'category' && categoryId) {
      const cat = categories.find((c) => c.id === categoryId)
      if (cat) {
        const catRecord = cat as unknown as Record<string, string>
        const name = catRecord[lang] ?? cat.zh
        const summary = (lang === 'en' ? cat.scriptSummaryEn : cat.scriptSummaryZh).replace(/\n/g, ' ').slice(0, 150)
        const brand = brandSuffix(lang)
        // 세부 항목 페이지(/zh/skin-beauty/skin-lifting) — 항목 이름·설명과 자기 경로를 canonical로
        const topic = topicId ? CATEGORY_SUBMENUS[cat.id]?.find((t) => t.id === topicId) : undefined
        if (topic) {
          updateBreadcrumbLd([home(lang), { name, path: `/${lang}/${cat.id}` }, { name: topic.title[lang], path: `/${lang}/${cat.id}/${topic.id}` }])
          updateMeta({
            lang,
            zhPath: `/zh/${cat.id}/${topic.id}`,
            enPath: `/en/${cat.id}/${topic.id}`,
            title: `${topic.title[lang]} · ${name} · ${brand}`,
            description: (topic.description?.[lang] ?? summary).replace(/\s+/g, ' ').slice(0, 150),
          })
          return
        }
        updateBreadcrumbLd([home(lang), { name, path: `/${lang}/${cat.id}` }])
        updateMeta({
          lang,
          zhPath: `/zh/${cat.id}`,
          enPath: `/en/${cat.id}`,
          title: `${name} · ${brand}`,
          description: summary,
        })
      }
    }
  }, [page, lang, categoryId, topicId])

  if (EditorialPages) {
    return (
      <Suspense fallback={null}>
        <EditorialPages />
      </Suspense>
    )
  }

  return (
    <div className="page-container" dir="ltr">
      <NavBar />
      <AnimatePresence mode="wait">
        {/* 'partners'는 kmedispring.com 전용 페이지 — ai-kmedi.com에선 홈을 보여준다 */}
        {page === 'home' || page === 'partners' ? (
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
