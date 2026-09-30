import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { translations } from '../../data/translations'
import { categories, type CategoryId } from '../../data/categories'
import { WECHAT_BIZ_URL, getWhatsappUrl, EMAIL_GENERAL } from '../../data/contacts'
import { CATEGORY_SUBMENUS, type SubmenuItem } from '../../data/categorySubmenus'
import { searchSite, type SearchTarget } from '../../data/siteSearch'
import './editorial.scoped.css'
import './editorial-shell.css'
import './editorial-pages.css'

/** kmedispring.com 전용 프레임 — 옛 사이트(HTML5 UP Editorial 커스텀)의 상단 파란 토글 바,
    헤더(로고 + 위챗/WhatsApp/메일), 왼쪽 오프캔버스 사이드바를 그대로 옮긴 것.
    옛 사이트의 jQuery main.js가 하던 일(body.is-menu-visible 토글, 바깥 클릭·ESC로 닫기)은
    여기서 React state로 대신한다. 클래스는 body 대신 .ed-skin 루트에 붙는다. */
export default function EditorialLayout({ children }: { children: ReactNode }) {
  const { lang, page, categoryId, topicId, goHome, goToCategory, goToTopic, goToPackage, goToQuote, goToSurgery } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchSite(query, lang), [query, lang])

  // 고정 파란 바의 삼선·언어 버튼을 본문(헤더) 좌우 선에 맞추기 위해 헤더 위치를 CSS 변수로 넘긴다.
  // 옛 CSS는 화면 폭마다 본문 폭이 1000/1008/1152px로 제각각이라 calc보다 실측이 정확하다.
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    const header = root?.querySelector<HTMLElement>('#header')
    if (!root || !header) return
    const update = () => {
      const r = header.getBoundingClientRect()
      root.style.setProperty('--ed-col-left', `${Math.round(r.left)}px`)
      root.style.setProperty('--ed-col-right', `${Math.round(document.documentElement.clientWidth - r.right)}px`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(header)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  // 펼쳐진 서브메뉴(Editorial 원본 템플릿의 accordion "opener") — 지금 보고 있는 카테고리는 처음부터 펼쳐 둔다.
  const [expanded, setExpanded] = useState<string | null>(page === 'category' ? categoryId : null)
  useEffect(() => { if (page === 'category' && categoryId) setExpanded(categoryId) }, [page, categoryId])

  // 옛 CSS의 body.is-menu-visible{overflow:hidden}은 이제 .ed-skin에 붙어서 페이지 스크롤을
  // 못 막는다 — 메뉴가 열려 있는 동안만 body 스크롤을 직접 잠근다.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  /** 사이드바 링크: 새 탭 열기·링크 복사가 되도록 진짜 href를 달고, 일반 클릭만 SPA 이동. */
  const nav = (go: () => void) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setMenuOpen(false)
    go()
  }

  /** 검색 결과 → 실제 이동. 견적은 goToQuote로 가야 같은 페이지 안에서도 시술 하이라이트가 갱신된다. */
  const targetHref = (t: SearchTarget) => {
    switch (t.type) {
      case 'category': return `/${lang}/${t.id}${t.kw ? `/${t.kw}` : ''}`
      case 'package': return `/${lang}?page=package`
      case 'quote': {
        const p = new URLSearchParams()
        if (t.cat) p.set('qcat', t.cat)
        if (t.proc) p.set('qproc', t.proc)
        const qs = p.toString()
        return `/${lang}/quote${qs ? `?${qs}` : ''}`
      }
      case 'surgery': return `/${lang}/surgery-price`
    }
  }
  const goTarget = (t: SearchTarget) => () => {
    setQuery('')
    switch (t.type) {
      case 'category': return t.kw ? goToTopic(t.id, t.kw) : goToCategory(t.id)
      case 'package': return goToPackage()
      case 'quote': return goToQuote(t.cat, t.proc)
      case 'surgery': return goToSurgery()
    }
  }

  const menuItems: { key: string; label: string; href: string; go: () => void; current: boolean; sub?: SubmenuItem[] }[] = [
    ...categories.map((c) => {
      const isPackage = c.id === 'medical-tourism'
      return {
        key: c.id,
        label: isZh ? c.zh : c.en,
        href: isPackage ? `/${lang}?page=package` : `/${lang}/${c.id}`,
        go: isPackage ? goToPackage : () => goToCategory(c.id as CategoryId),
        current: isPackage ? page === 'package' : page === 'category' && categoryId === c.id,
        sub: CATEGORY_SUBMENUS[c.id],
      }
    }),
    { key: 'quote', label: t.quoteBtnTitle, href: `/${lang}/quote`, go: () => goToQuote(), current: page === 'quote' },
    { key: 'surgery', label: t.surgeryBtnTitle, href: `/${lang}/surgery-price`, go: goToSurgery, current: page === 'surgery' },
  ]

  return (
    <div ref={rootRef} className={`ed-skin${menuOpen ? ' is-menu-visible' : ''}`}>
      <a
        href="#sidebar"
        className="toggle"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={(e) => { e.preventDefault(); setMenuOpen((v) => !v) }}
      >
        Menu
      </a>
      <button
        type="button"
        className="ed-lang-toggle"
        onClick={() => navigate(isZh ? '/en' : '/zh')}
        aria-label={isZh ? 'Switch to English' : '切换到中文'}
      >
        {isZh ? 'EN' : '中文'}
      </button>

      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <header id="header">
              <a href={`/${lang}`} className="logo" onClick={nav(goHome)}>
                <img src="/editorial/logo_ch.png" alt={t.brandName} className="logo-img" />
              </a>
              <ul className="icons">
                <li>
                  <a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="icon brands fa-weixin" title="WeChat">
                    <span className="label">WeChat</span>
                  </a>
                </li>
                <li>
                  <a href={getWhatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="icon brands fa-whatsapp" title="WhatsApp">
                    <span className="label">WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL_GENERAL}`} className="icon solid fa-envelope" title={EMAIL_GENERAL}>
                    <span className="label">{EMAIL_GENERAL}</span>
                  </a>
                </li>
              </ul>
            </header>

            {children}

            <footer className="ed-main-footer">
              <p>
                <a href={isZh ? '/zh/privacy' : '/en/privacy'}>{t.footerPrivacyLink}</a>
              </p>
              <p>
                © 2026 {isZh ? '汉江春天' : 'K-MediSpring'}. All rights reserved.<br />
                상호: 한강애봄 | 대표: 이가나 | 사업자등록번호: 829-21-01856<br />
                주소: 서울특별시 성북구 삼양로 29, 3층 11호
              </p>
              <p className="ed-credit">Design: <span>HTML5 UP</span></p>
              <p><a href="/admin/prep" className="ed-admin-link">관리자페이지</a></p>
            </footer>
          </div>
        </div>

        {menuOpen && <div className="ed-menu-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

        <div id="sidebar">
          <div className="inner">
            {/* 검색 — HTML5 UP Editorial 원본 #search 그대로 (돋보기는 옛 CSS의 form::before) */}
            <section id="search" className="alt">
              <form onSubmit={(e) => { e.preventDefault(); if (results[0]) goTarget(results[0].target)(); setMenuOpen(false) }}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isZh ? '搜索项目，如：热玛吉、双眼皮' : 'Search treatments, e.g. Thermage'}
                  aria-label={isZh ? '搜索' : 'Search'}
                  autoComplete="off"
                />
              </form>
              {query.trim() && (
                <div className="ed-search-results" role="listbox">
                  {results.length > 0 ? (
                    <ul>
                      {results.map((r) => (
                        <li key={r.key}>
                          <a href={targetHref(r.target)} onClick={nav(goTarget(r.target))}>
                            <span className="ed-sr-title">{r.title}</span>
                            <span className="ed-sr-context">{r.context}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="ed-search-empty">
                      <p>{isZh ? '没有找到相关内容。' : 'No matching results.'}</p>
                      <a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary small">
                        {isZh ? '没找到？直接微信咨询' : 'Ask us on WeChat'}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </section>

            <nav id="menu">
              <ul>
                <li className={page === 'home' ? 'active' : undefined}>
                  <a href={`/${lang}`} className="menu-home" onClick={nav(goHome)}>
                    {isZh ? '首页' : 'Home'}
                  </a>
                </li>
                {menuItems.map((m) => {
                  if (!m.sub?.length) {
                    return (
                      <li key={m.key}>
                        <a href={m.href} onClick={nav(m.go)} aria-current={m.current ? 'page' : undefined}>
                          {m.label}
                        </a>
                      </li>
                    )
                  }
                  const open = expanded === m.key
                  return (
                    <li key={m.key} className="ed-has-sub">
                      <div className="ed-sub-row">
                        <a href={m.href} onClick={nav(m.go)} aria-current={m.current ? 'page' : undefined}>
                          {m.label}
                        </a>
                        <button
                          type="button"
                          className={`opener${open ? ' active' : ''}`}
                          aria-expanded={open}
                          aria-label={open ? (isZh ? '收起' : 'Collapse') : (isZh ? '展开' : 'Expand')}
                          onClick={() => setExpanded(open ? null : m.key)}
                        />
                      </div>
                      {open && (
                        <ul className="ed-submenu">
                          {m.sub.map((s) => (
                            <li key={s.id}>
                              <a
                                href={`${m.href}/${s.id}`}
                                onClick={nav(() => goToTopic(m.key as CategoryId, s.id))}
                                aria-current={m.current && topicId === s.id ? 'page' : undefined}
                              >
                                {s.title[lang]}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <section className="menu-extra">
              <div className="section-spacer" />
              <header className="major">
                <h3 className="about-title">{isZh ? '关于我们' : 'About Us'}</h3>
              </header>
              <p>
                {isZh
                  ? '我们相信，美丽与健康，源于真诚的交流。如果你对韩国医疗、健康管理或合作有兴趣，欢迎通过微信或邮件与我们联系。'
                  : 'We believe beauty and health begin with sincere communication. If you are interested in Korean medical care, health management or partnership, feel free to reach us by WeChat or email.'}
              </p>
            </section>

            <section>
              <header className="major">
                <h3>{isZh ? '联系方式' : 'Contact'}</h3>
              </header>
              <ul className="contact">
                <li className="icon solid fa-envelope">
                  <a href={`mailto:${EMAIL_GENERAL}`}>{isZh ? '邮箱：' : 'Email: '}{EMAIL_GENERAL}</a>
                </li>
                <li className="icon solid fa-phone">+82-10-4903-3123</li>
                <li className="icon solid fa-phone">+82-070-8880-3123</li>
                <li className="icon solid fa-home">
                  {isZh
                    ? '韩国 首尔特别市 城北区 三阳路29号 3层11号 (邮编：02832)'
                    : '3F #11, 29 Samyang-ro, Seongbuk-gu, Seoul, Korea (02832)'}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
