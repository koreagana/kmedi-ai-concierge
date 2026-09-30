import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppProvider, useApp } from '../../contexts/AppContext'
import type { LangCode } from '../../data/translations'
import { PRIVACY_CONTENT } from '../../components/PrivacyPage'
import { TERMS_TEXT, VALID_LANGS } from '../../components/TermsPage'
import EditorialLayout from './EditorialLayout'
import { edLink } from './edLink'

/** 개인정보처리방침 · 이용약관 — ai-kmedi.com과 같은 문구(PRIVACY_CONTENT / TERMS_TEXT)를
    Editorial Generic 페이지로. 이 두 페이지는 /zh|en 앱 라우트 밖의 독립 경로라 AppProvider를 직접 씌운다. */

function Crumb({ title }: { title: string }) {
  const { lang, goHome } = useApp()
  return (
    <p className="ed-crumb">
      <a {...edLink(`/${lang}`, goHome)}>{lang === 'zh' ? '首页' : 'Home'}</a>
      <span aria-hidden="true"> / </span>
      <span>{title}</span>
    </p>
  )
}

function PrivacyBody({ lang }: { lang: LangCode }) {
  const c = PRIVACY_CONTENT[lang]
  useEffect(() => { document.title = c.pageTitle }, [c.pageTitle])
  return (
    <section className="ed-page ed-legal">
      <Crumb title={c.title} />
      <header className="main">
        <h1>{c.title}</h1>
        <p className="ed-page-tag">{c.effectiveDate}</p>
      </header>
      <div className="ed-prose">{c.intro.map((p, i) => <p key={i}>{p}</p>)}</div>

      {c.sections.map((s) => (
        <div key={s.heading}>
          <hr className="major" />
          <h2>{s.heading}</h2>
          <div className="ed-prose">{s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          {s.transferItems && (
            <div className="table-wrapper">
              <table className="alt ed-table">
                <tbody>
                  {s.transferItems.map((item) => (
                    <tr key={item.title}>
                      <td className="ed-table-name">{item.title}</td>
                      <td>{item.lines.map((l, i) => <span key={i} className="ed-block">{l}</span>)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.closingParagraphs && <div className="ed-prose">{s.closingParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>}
          {s.contactList && (
            <ul className="ed-list">
              {s.contactList.map((item) => <li key={item.label}><strong>{item.label}：</strong>{item.value}</li>)}
            </ul>
          )}
        </div>
      ))}
      <p className="ed-small" style={{ marginTop: '2.4em' }}>{c.lastUpdated}</p>
    </section>
  )
}

export function EditorialPrivacy({ lang }: { lang: LangCode }) {
  return (
    <AppProvider initialLang={lang}>
      <EditorialLayout><PrivacyBody lang={lang} /></EditorialLayout>
    </AppProvider>
  )
}

function TermsBody({ lang }: { lang: LangCode }) {
  const t = TERMS_TEXT[lang]
  useEffect(() => { document.title = t.title }, [t.title])
  return (
    <section className="ed-page ed-legal">
      <Crumb title={t.title} />
      <header className="main"><h1>{t.title}</h1></header>
      <blockquote><p>{t.disclaimer}</p></blockquote>
    </section>
  )
}

export function EditorialTerms() {
  const [searchParams] = useSearchParams()
  const p = searchParams.get('lang') as LangCode | null
  const lang: LangCode = p && VALID_LANGS.includes(p) ? p : 'zh'
  return (
    <AppProvider initialLang={lang}>
      <EditorialLayout><TermsBody lang={lang} /></EditorialLayout>
    </AppProvider>
  )
}
