import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations, type LangCode } from '../data/translations'

export default function NavBar() {
  const { lang, setLang, page, goHome } = useApp()
  const t = translations[lang]
  const [showLang, setShowLang] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

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

  const langs: { code: LangCode; label: string }[] = [
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
  ]

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="navbar">
        {/* Brand */}
        <button
          onClick={goHome}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <div className="navbar-brand">{t.brandName}</div>
          <div className="navbar-sub">{t.brandSub}</div>
        </button>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Consult button (hidden on category page to save space) */}
          {page === 'home' && (
            <button
              onClick={scrollToContact}
              style={{
                background: 'rgba(196,154,60,0.15)',
                border: '1px solid rgba(196,154,60,0.4)',
                borderRadius: 10,
                color: '#e8c76a',
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

          {/* Language picker */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLang(s => !s)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 10,
                color: 'rgba(255,255,255,0.75)',
                fontSize: 11,
                fontWeight: 600,
                padding: '5px 10px',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
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
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: 'rgba(10,22,40,0.97)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '8px',
                    minWidth: 120,
                    zIndex: 999,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {langs.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLang(false) }}
                      style={{
                        display: 'block',
                        width: '100%',
                        background: lang === l.code ? 'rgba(196,154,60,0.15)' : 'none',
                        border: 'none',
                        borderRadius: 10,
                        color: lang === l.code ? '#e8c76a' : 'rgba(255,255,255,0.75)',
                        fontSize: 13,
                        padding: '9px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: lang === l.code ? 700 : 400,
                        letterSpacing: '0.02em',
                        transition: 'all 0.15s',
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

    </>
  )
}
