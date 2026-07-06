import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { translations, type LangCode } from '../data/translations'

const langPaths: Record<LangCode, string> = {
  zh: '/zh',
  en: '/en',
  ar: '/ar',
  ko: '/ko',
}

export default function NavBar() {
  const { lang, page, goHome } = useApp()
  const t = translations[lang]
  const navigate = useNavigate()
  const location = useLocation()
  const isArPage = location.pathname.startsWith('/ar')
  // /shop, /shop/order, /terms etc. are standalone routes outside the /zh|ko|en|ar
  // nested router, so the usual goHome() (which just clears the search
  // params on the current route) can't get back to the real homepage here.
  const isShopPage = location.pathname.startsWith('/shop')
  const isTermsPage = location.pathname.startsWith('/terms')
  const isStandalonePage = isShopPage || isTermsPage
  const handleBrandClick = () => {
    if (isStandalonePage) navigate(langPaths[lang])
    else goHome()
  }

  const [showLang, setShowLang] = useState(false)
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left?: number; right?: number }>({ top: 0, right: 0 })
  const langRef = useRef<HTMLDivElement>(null)
  const langBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!showLang) return
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLang(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showLang])

  const toggleLang = () => {
    if (!showLang && langBtnRef.current) {
      const rect = langBtnRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      if (buttonCenterX < window.innerWidth / 2) {
        setDropdownPos({ top: rect.bottom + 8, left: rect.left })
      } else {
        setDropdownPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
      }
    }
    setShowLang(s => !s)
  }

  const langs: { code: LangCode; label: string }[] = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'ko', label: '한국어' },
  ]

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      {/* Brand */}
      <button
        onClick={handleBrandClick}
        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div className="navbar-brand">{t.brandName}</div>
        <div className="navbar-sub">{t.brandSub}</div>
      </button>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* /ar 페이지, /shop, /terms 페이지: 없음 / 그 외: 상담 버튼 */}
        {page === 'home' && !isArPage && !isStandalonePage && (
          <button
            onClick={scrollToContact}
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 10,
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 600,
              padding: '5px 12px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {t.navConsult}
          </button>
        )}

        {/* /ar 페이지 로고 이미지 */}
        {isArPage && (
          <button
            onClick={handleBrandClick}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          >
            <img
              src="/kmedi_logo.png"
              alt="K-Medi"
              style={{ height: 28, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </button>
        )}

        {/* Language picker */}
        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            ref={langBtnRef}
            onClick={toggleLang}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 10,
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 600,
              padding: '5px 10px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'inherit',
            }}
          >
            <span>🌐</span>
            <span>{lang.toUpperCase()}</span>
          </button>

          <AnimatePresence>
            {showLang && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: dropdownPos.top,
                  ...(dropdownPos.left !== undefined
                    ? { left: dropdownPos.left }
                    : { right: dropdownPos.right }),
                  background: '#1f4e79',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 14,
                  padding: '8px',
                  minWidth: 128,
                  zIndex: 999,
                  boxShadow: '0 12px 40px rgba(0,60,120,0.4)',
                }}
              >
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setShowLang(false)
                      navigate(langPaths[l.code])
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: lang === l.code ? 'rgba(255,255,255,0.18)' : 'none',
                      border: 'none',
                      borderRadius: 10,
                      color: lang === l.code ? '#ffffff' : 'rgba(255,255,255,0.75)',
                      fontSize: 13,
                      padding: '9px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: lang === l.code ? 700 : 400,
                      letterSpacing: '0.02em',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
