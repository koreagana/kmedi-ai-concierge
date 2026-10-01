import { useApp } from '../../contexts/AppContext'
import { translations } from '../../data/translations'
import QuotePage from '../../components/QuotePage'
import SurgeryPricePage from '../../components/SurgeryPricePage'
import EditorialLayout from './EditorialLayout'
import EditorialHome from './EditorialHome'
import EditorialCategory from './EditorialCategory'
import EditorialTopic from './EditorialTopic'
import EditorialPackage from './EditorialPackage'
import EditorialPartners from './EditorialPartners'
import { edLink } from './edLink'
import './editorial-island.css'

/** kmedispring.com의 모든 페이지 — 어떤 페이지로 가도 Editorial 틀(파란 바·헤더·사이드바) 안에 머문다.
    견적·성형 수가표는 계산·선택 기능이 복잡해 기존 컴포넌트를 .ed-island 안에 그대로 넣고
    (Editorial 원본 CSS는 island 안에 적용되지 않음) editorial-island.css로 톤만 맞춘다. */
export default function EditorialPages() {
  const { page, topicId, lang, goHome } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'

  const island = (title: string, content: JSX.Element, kind: string) => (
    <>
      <p className="ed-island-crumb">
        <a {...edLink(`/${lang}`, goHome)}>{isZh ? '首页' : 'Home'}</a>
        <span aria-hidden="true"> / </span>
        <span>{title}</span>
      </p>
      <div className={`ed-island ed-island--${kind}`}>{content}</div>
    </>
  )

  return (
    <EditorialLayout>
      {page === 'home' && <EditorialHome />}
      {page === 'category' && (topicId ? <EditorialTopic /> : <EditorialCategory />)}
      {page === 'package' && <EditorialPackage />}
      {page === 'quote' && island(t.quoteBtnTitle, <QuotePage />, 'quote')}
      {page === 'surgery' && island(t.surgeryBtnTitle, <SurgeryPricePage />, 'surgery')}
      {page === 'partners' && <EditorialPartners />}
    </EditorialLayout>
  )
}
