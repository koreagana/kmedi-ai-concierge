import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { translations, type LangCode } from '../data/translations'
import { WECHAT_BIZ_URL, WHATSAPP_URL_OWNER } from '../data/contacts'

const langPaths: Record<LangCode, string> = {
  zh: '/zh',
  en: '/en',
}

export default function NavBar() {
  const { lang, goHome } = useApp()
  const t = translations[lang]
  const navigate = useNavigate()
  const location = useLocation()
  // /terms 등은 /zh|en 중첩 라우터 밖의 독립 라우트라, 평소의
  // goHome()(현재 라우트의 검색 파라미터만 지우는 방식)으론 홈으로 못 돌아감.
  const isTermsPage = location.pathname.startsWith('/terms')
  const isStandalonePage = isTermsPage
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
  ]

  /* 상담 버튼은 예전엔 홈의 #contact 섹션으로 스크롤했지만, 현재 홈 구성에는
     해당 섹션이 없어 클릭해도 아무 일이 일어나지 않았음. 언어별로 실제 고객이
     쓰는 채널로 바로 연결한다 — 중문은 기업위챗, 영문은 왓츠앱(대표 번호). */
  const openConsult = () => {
    window.open(lang === 'zh' ? WECHAT_BIZ_URL : WHATSAPP_URL_OWNER, '_blank')
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
        {/* 상담 버튼은 모든 페이지에 노출한다 — 카테고리·패키지·견적 등
            홈이 아닌 페이지에서 상담으로 넘어가려는 고객이 더 많기 때문. */}
        <button
          onClick={openConsult}
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
