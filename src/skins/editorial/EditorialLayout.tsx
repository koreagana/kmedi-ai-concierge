import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { langPath } from '../../skin'
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

/** 이 폭 이상이면 사이드바가 본문 옆에 붙는다(Editorial 원본의 xlarge 구간과 같은 1281px). */
const DOCK_QUERY = '(min-width: 1281px)'
const MENU_KEY = 'ed-menu-open'
/** 진료 분야 메뉴에서 빼서 外籍患者引进机构资质 묶음으로 보내는 카테고리 */
const AGENCY_CATEGORY_IDS: string[] = ['medical-tourism', 'custom-plan']
const readMenuPref = () => { try { return sessionStorage.getItem(MENU_KEY) === '1' } catch { return false } }
const writeMenuPref = (open: boolean) => { try { sessionStorage.setItem(MENU_KEY, open ? '1' : '0') } catch { /* 사생활 모드 등 — 기억만 못 할 뿐 */ } }

/** kmedispring.com 전용 프레임 — 옛 사이트(HTML5 UP Editorial 커스텀)의 상단 파란 토글 바,
    헤더(로고 + 위챗/WhatsApp/메일), 왼쪽 오프캔버스 사이드바를 그대로 옮긴 것.
    옛 사이트의 jQuery main.js가 하던 일(body.is-menu-visible 토글, 바깥 클릭·ESC로 닫기)은
    여기서 React state로 대신한다. 클래스는 body 대신 .ed-skin 루트에 붙는다. */
export default function EditorialLayout({ children }: { children: ReactNode }) {
  const { lang, page, categoryId, topicId, goHome, goToCategory, goToTopic, goToPackage, goToQuote, goToSurgery, goToPartners, goToServices } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'
  const navigate = useNavigate()
  // 넓은 화면(PC)에선 Editorial 원본처럼 회색 사이드바가 왼쪽에 "붙어서"(docked) 본문을 옆으로 밀고,
  // 메뉴 링크를 눌러도 닫히지 않는다. 페이지가 바뀌면 App이 새로 마운트되므로 열림 상태는
  // sessionStorage에 기억해 둔다. 폰·태블릿은 기존처럼 본문을 덮는 오프캔버스 + 링크 누르면 닫힘.
  const [isWide, setIsWide] = useState(() => window.matchMedia(DOCK_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(DOCK_QUERY)
    const onChange = () => setIsWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const [menuOpen, setMenuOpenState] = useState(() => window.matchMedia(DOCK_QUERY).matches && readMenuPref())
  const setMenuOpen = (v: boolean | ((prev: boolean) => boolean)) =>
    setMenuOpenState((prev) => {
      const next = typeof v === 'function' ? v(prev) : v
      writeMenuPref(next)
      return next
    })
  const docked = menuOpen && isWide

  // PC에서 붙어 있는 사이드바엔 자체 스크롤바를 두지 않는다(Editorial 원본처럼). 대신 페이지 스크롤을 따라
  // 위아래로 움직인다: 아래로 내리면 사이드바도 같이 올라가 연락처까지 보이고 바닥에 닿으면 멈춤,
  // 위로 올리면 바로 같이 내려와 검색·메뉴가 다시 보임(원본보다 한 단계 친절한 양방향 방식).
  // 사이드바가 화면보다 짧으면 그냥 고정. 본문이 사이드바보다 짧은 페이지는 --ed-sb-h로 본문 최소 높이를 맞춘다.
  const sidebarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const sb = sidebarRef.current
    const root = rootRef.current
    if (!sb || !root) return
    if (!docked) {
      sb.style.removeProperty('top')
      root.style.removeProperty('--ed-sb-h')
      return
    }
    const BAR = 46 // 고정 파란 바 높이
    let offset = 0
    let lastY = window.scrollY
    const clampAndApply = () => {
      const minOffset = Math.min(0, window.innerHeight - BAR - sb.offsetHeight)
      offset = Math.max(minOffset, Math.min(0, offset))
      sb.style.setProperty('top', `${BAR + offset}px`, 'important') // 옛 CSS가 top을 !important로 고정해서
    }
    const onScroll = () => {
      const y = window.scrollY
      offset -= y - lastY
      lastY = y
      clampAndApply()
    }
    const onResize = () => {
      root.style.setProperty('--ed-sb-h', `${sb.offsetHeight}px`)
      clampAndApply()
    }
    onResize()
    const ro = new ResizeObserver(onResize) // 서브메뉴를 펼치고 접으면 사이드바 길이가 바뀐다
    ro.observe(sb)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [docked])
  const [query, setQuery] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_GENERAL)
    } catch {
      // 오래된 브라우저·위챗 일부 버전: clipboard API가 막혀 있으면 임시 입력칸으로 복사
      const ta = document.createElement('textarea')
      ta.value = EMAIL_GENERAL
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* 복사 실패해도 주소는 화면에 보인다 */ }
      ta.remove()
    }
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 1600)
  }
  const results = useMemo(() => searchSite(query, lang), [query, lang])

  // 고정 파란 바의 삼선·언어 버튼을 본문(헤더) 좌우 선에 맞추기 위해 헤더 위치를 CSS 변수로 넘긴다.
  // 옛 CSS는 화면 폭마다 본문 폭이 1000/1008/1152px로 제각각이라 calc보다 실측이 정확하다.
  const rootRef = useRef<HTMLDivElement>(null)
  const alignRef = useRef<() => void>(() => {})
  useEffect(() => {
    const root = rootRef.current
    const header = root?.querySelector<HTMLElement>('#header')
    if (!root || !header) return
    const update = () => {
      const r = header.getBoundingClientRect()
      root.style.setProperty('--ed-col-left', `${Math.round(r.left)}px`)
      root.style.setProperty('--ed-col-right', `${Math.round(document.documentElement.clientWidth - r.right)}px`)
    }
    alignRef.current = update
    update()
    const ro = new ResizeObserver(update)
    ro.observe(header)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  // 사이드바가 붙었다/떨어지면 본문이 옆으로 미끄러진다(폭은 그대로라 ResizeObserver가 못 잡음) —
  // 이동 애니메이션(.28s) 동안 삼선·EN 버튼 위치를 따라 맞춘다.
  useEffect(() => {
    let raf = 0
    const until = performance.now() + 350
    const tick = () => { alignRef.current(); if (performance.now() < until) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [docked])
  // 펼쳐진 서브메뉴(Editorial 원본 템플릿의 accordion "opener") — 지금 보고 있는 카테고리는 처음부터 펼쳐 둔다.
  const [expanded, setExpanded] = useState<string | null>(page === 'category' ? categoryId : null)
  useEffect(() => { if (page === 'category' && categoryId) setExpanded(categoryId) }, [page, categoryId])

  // 옛 CSS의 body.is-menu-visible{overflow:hidden}은 이제 .ed-skin에 붙어서 페이지 스크롤을
  // 못 막는다 — 메뉴가 열려 있는 동안만 body 스크롤을 직접 잠근다.
  // (PC에서 붙어 있는 사이드바는 본문과 나란히 있으므로 잠그지 않는다)
  useEffect(() => {
    if (!menuOpen || docked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen, docked])

  /** 사이드바 링크: 새 탭 열기·링크 복사가 되도록 진짜 href를 달고, 일반 클릭만 SPA 이동.
      PC(붙어 있는 사이드바)에선 열어둔 채로, 폰에선 본문을 가리므로 닫고 이동. */
  const nav = (go: () => void) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (!isWide) setMenuOpen(false)
    go()
  }

  /** 검색 결과 → 실제 이동. 견적은 goToQuote로 가야 같은 페이지 안에서도 시술 하이라이트가 갱신된다. */
  const targetHref = (t: SearchTarget) => {
    switch (t.type) {
      case 'category': return langPath(lang, `/${t.id}${t.kw ? `/${t.kw}` : ''}`)
      case 'package': return langPath(lang, '?page=package')
      case 'quote': {
        const p = new URLSearchParams()
        if (t.cat) p.set('qcat', t.cat)
        if (t.proc) p.set('qproc', t.proc)
        const qs = p.toString()
        return langPath(lang, `/quote${qs ? `?${qs}` : ''}`)
      }
      case 'surgery': return langPath(lang, `/surgery-price`)
      case 'partners': return langPath(lang, `/partners`)
      case 'services': return langPath(lang, `/services`)
    }
  }
  const goTarget = (t: SearchTarget) => () => {
    setQuery('')
    switch (t.type) {
      case 'category': return t.kw ? goToTopic(t.id, t.kw) : goToCategory(t.id)
      case 'package': return goToPackage()
      case 'quote': return goToQuote(t.cat, t.proc)
      case 'surgery': return goToSurgery()
      case 'partners': return goToPartners()
      case 'services': return goToServices()
    }
  }

  // 위쪽 메뉴는 진료 분야(皮肤~男性健康)만. 여행 방안·서비스·가격 페이지는 关于我们 아래
  // 外籍患者引进机构资质 묶음으로 내린다(사용자 결정 2026-10-02).
  const menuItems: { key: string; label: string; href: string; go: () => void; current: boolean; sub?: SubmenuItem[] }[] =
    categories.filter((c) => !AGENCY_CATEGORY_IDS.includes(c.id)).map((c) => ({
      key: c.id,
      label: isZh ? c.zh : c.en,
      href: langPath(lang, `/${c.id}`),
      go: () => goToCategory(c.id as CategoryId),
      current: page === 'category' && categoryId === c.id,
      sub: CATEGORY_SUBMENUS[c.id],
    }))

  const pkg = categories.find((c) => c.id === 'medical-tourism')!
  const custom = categories.find((c) => c.id === 'custom-plan')!
  // 순서: 기관이 하는 일(全程服务)이 먼저 와야 外籍患者引进机构资质 제목과 이어진다(사용자 결정 2026-10-02)
  const agencyItems: { key: string; label: string; href: string; go: () => void; current: boolean }[] = [
    // 협력기관 목록(/partners)은 메뉴에 넣지 않는다 — 了解全程服务 버튼·직접 링크로만
    { key: 'services', label: isZh ? '全程服务' : 'Our Full Service', href: langPath(lang, '/services'), go: goToServices, current: page === 'services' },
    { key: 'custom-plan', label: isZh ? custom.zh : custom.en, href: langPath(lang, '/custom-plan'), go: () => goToCategory('custom-plan'), current: page === 'category' && categoryId === 'custom-plan' },
    { key: 'package', label: isZh ? pkg.zh : pkg.en, href: langPath(lang, '?page=package'), go: goToPackage, current: page === 'package' },
    { key: 'quote', label: t.quoteBtnTitle, href: langPath(lang, `/quote`), go: () => goToQuote(), current: page === 'quote' },
    { key: 'surgery', label: t.surgeryBtnTitle, href: langPath(lang, `/surgery-price`), go: goToSurgery, current: page === 'surgery' },
  ]
  const agencyCurrent = agencyItems.some((a) => a.current) || page === 'partners'
  const [agencyOpen, setAgencyOpen] = useState(agencyCurrent)
  useEffect(() => { if (agencyCurrent) setAgencyOpen(true) }, [agencyCurrent])

  return (
    <div ref={rootRef} className={`ed-skin${menuOpen ? ' is-menu-visible' : ''}${docked ? ' ed-docked' : ''}`}>
      <a
        href="#sidebar"
        className="toggle"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={(e) => { e.preventDefault(); setMenuOpen((v) => !v) }}
      >
        Menu
      </a>
      {/* 汉江春天 흰색 로고 — 파란 바 안, 삼선 바로 옆 (누르면 첫 화면) */}
      <a href={langPath(lang)} className="ed-bar-logo" onClick={nav(goHome)} aria-label={t.brandName}>
        <img src="/editorial/logo_ch_white.png" alt={t.brandName} width={81} height={24} />
      </a>
      <button
        type="button"
        className="ed-lang-toggle"
        onClick={() => navigate(langPath(isZh ? 'en' : 'zh'))}
        aria-label={isZh ? 'Switch to English' : '切换到中文'}
      >
        {isZh ? 'EN' : '中文'}
      </button>

      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <header id="header">
              {/* 로고는 파란 바(삼선 옆)로 옮김 — 헤더엔 연락 아이콘만 */}
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

            {/* 회사 정보·개인정보처리방침 링크는 옛 사이트처럼 회색 사이드바로 옮김(사용자 결정 2026-10-01) —
                처리방침은 모든 페이지의 사이드바 关于我们 아래에서 항상 열 수 있다. */}
            <div className="ed-main-end" aria-hidden="true" />
          </div>
        </div>

        {menuOpen && !docked && <div className="ed-menu-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

        <div id="sidebar" ref={sidebarRef}>
          <div className="inner">
            {/* 검색 — HTML5 UP Editorial 원본 #search 그대로 (돋보기는 옛 CSS의 form::before) */}
            <section id="search" className="alt">
              <form onSubmit={(e) => { e.preventDefault(); if (results[0]) goTarget(results[0].target)(); if (!isWide) setMenuOpen(false) }}>
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
              {!query.trim() && (
                <p className="ed-search-hint">
                  {isZh ? '搜索不到的项目，建议点击咨询按钮直接咨询。' : "Can't find it? Tap the consultation button to ask us."}
                </p>
              )}
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
                  <a href={langPath(lang)} className="menu-home" onClick={nav(goHome)}>
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

              {/* 关于我们 — 철학 글 아래에 外籍患者引进机构资质 묶음(여행 방안·全程服务·가격 페이지).
                  메뉴 CSS가 전부 nav#menu 기준이라 같은 nav 안에 두어 카테고리와 똑같이 펼쳐지게 한다. */}
              <div className="ed-menu-about">
                <div className="section-spacer" />
                <header className="major">
                  <h3 className="about-title">{isZh ? '关于我们' : 'About Us'}</h3>
                </header>
                <p>
                  {isZh
                    ? '我们相信，美丽与健康，源于真诚的交流。如果你对韩国医疗、健康管理或合作有兴趣，欢迎通过微信或邮件与我们联系。'
                    : 'We believe beauty and health begin with sincere communication. If you are interested in Korean medical care, health management or partnership, feel free to reach us by WeChat or email.'}
                </p>
              </div>
              <ul>
                <li className="ed-has-sub">
                  <div className="ed-sub-row">
                    <a
                      href={langPath(lang, '/services')}
                      onClick={(e) => { e.preventDefault(); setAgencyOpen((v) => !v) }}
                      aria-expanded={agencyOpen}
                    >
                      {isZh ? '外籍患者引进机构资质' : 'Licensed Foreign Patient Agency'}
                    </a>
                    <button
                      type="button"
                      className={`opener${agencyOpen ? ' active' : ''}`}
                      aria-expanded={agencyOpen}
                      aria-label={agencyOpen ? (isZh ? '收起' : 'Collapse') : (isZh ? '展开' : 'Expand')}
                      onClick={() => setAgencyOpen((v) => !v)}
                    />
                  </div>
                  {agencyOpen && (
                    <ul className="ed-submenu">
                      {agencyItems.map((a) => (
                        <li key={a.key}>
                          <a href={a.href} onClick={nav(a.go)} aria-current={a.current ? 'page' : undefined}>{a.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            <section>
              <header className="major">
                <h3>{isZh ? '联系方式' : 'Contact'}</h3>
              </header>
              <ul className="contact">
                <li className="icon solid fa-envelope">
                  {/* 누르면 메일 앱 대신 주소 복사 — 위챗 안 브라우저에선 mailto가 잘 안 열려서(사용자 요청) */}
                  <a
                    href={`mailto:${EMAIL_GENERAL}`}
                    onClick={(e) => { e.preventDefault(); copyEmail() }}
                    title={isZh ? '点击复制' : 'Click to copy'}
                  >
                    {emailCopied ? (isZh ? '已复制 ✓' : 'Copied ✓') : EMAIL_GENERAL}
                  </a>
                </li>
                <li className="icon solid fa-phone"><a href="tel:+821049033123">+82-10-4903-3123</a></li>
                <li className="icon solid fa-phone"><a href="tel:+827088803123">+82-070-8880-3123</a></li>
                <li className="icon solid fa-home">
                  {isZh
                    ? '韩国 首尔特别市 城北区 三阳路29号 3层11号 (邮编：02832)'
                    : '3F #11, 29 Samyang-ro, Seongbuk-gu, Seoul, Korea (02832)'}
                </li>
              </ul>
            </section>

            {/* 회사 정보 (옛 kmedispring.com처럼 사이드바 맨 아래) */}
            <footer className="ed-sb-footer">
              {/* 한국 법인명 로고(한강愛봄) — 메일 서명 등에서도 같은 주소(/images/logo_k.png)를 쓴다 */}
              <img src="/images/logo_k.png" alt="한강애봄" className="ed-sb-logo-k" width={90} height={32} loading="lazy" />
              <p>
                © 2026 汉江春天 · 한강애봄 · K-MediSpring (kmedispring.com). All rights reserved.<br />
                상호: 한강애봄 | 대표: 이가나<br />
                사업자등록번호: 829-21-01856<br />
                주소: 서울특별시 성북구 삼양로 29, 3층 11호
              </p>
              {/* 개인정보 한 줄 + 처리방침 링크 — 메뉴 끝에 매달려 보여서 회사 정보 아래로 옮김(사용자 결정 2026-10-02).
                  모든 페이지 사이드바에 있으므로 "언제든 쉽게 확인" 요건은 그대로 */}
              <p className="ed-privacy-note">
                {isZh ? '汉江春天重视您的个人信息。' : 'K-MediSpring values your privacy.'}
                <br />
                <a href={langPath(lang, '/privacy')}>{t.footerPrivacyLink} ›</a>
              </p>
              {/* HTML5 UP Editorial 템플릿(CC BY 3.0) 출처 표기 — 라이선스 조건이라 지우면 안 됨 */}
              <p className="ed-credit">Design: HTML5 UP</p>
              <p><a href="/admin/prep" className="ed-admin-link">관리자페이지</a></p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
