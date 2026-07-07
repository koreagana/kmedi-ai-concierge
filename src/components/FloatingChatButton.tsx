import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { WECHAT_BIZ_URL } from '../data/contacts'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'

const SCROLL_TRIGGERS = [0.25, 0.55, 0.85]

const PULSE_CSS = `
@keyframes floatingBtnPulse {
  0%   { box-shadow: 0 0 0 0 rgba(0,168,204,0.55), 0 0 0 0 rgba(0,119,182,0.35); }
  60%  { box-shadow: 0 0 0 14px rgba(0,168,204,0.0), 0 0 0 22px rgba(0,119,182,0.0); }
  100% { box-shadow: 0 0 0 0 rgba(0,168,204,0.0), 0 0 0 0 rgba(0,119,182,0.0); }
}
.floating-chat-btn {
  animation: floatingBtnPulse 2.5s ease-out infinite;
}
.floating-chat-btn:hover {
  transform: scale(1.08);
  transition: transform 0.18s ease;
}
`

export default function FloatingChatButton() {
  const { lang } = useApp()
  const t = translations[lang]
  const isRTL = lang === 'ar'
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const triggeredRef = useRef<Set<number>>(new Set())
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // inject pulse keyframe CSS once
  useEffect(() => {
    const styleId = 'floating-chat-btn-style'
    if (!document.getElementById(styleId)) {
      const el = document.createElement('style')
      el.id = styleId
      el.textContent = PULSE_CSS
      document.head.appendChild(el)
    }
    return () => {
      // leave style in DOM — removing on unmount would break if component remounts quickly
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const progress = window.scrollY / maxScroll

      for (const trigger of SCROLL_TRIGGERS) {
        if (!triggeredRef.current.has(trigger) && progress >= trigger) {
          triggeredRef.current.add(trigger)
          setTooltipVisible(true)
          if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
          tooltipTimerRef.current = setTimeout(() => setTooltipVisible(false), 2500)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        ...(isRTL ? { left: 20 } : { right: 20 }),
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexDirection: isRTL ? 'row' : 'row-reverse',
      }}
    >
      {/* Tooltip speech bubble */}
      <div
        style={{
          opacity: tooltipVisible ? 1 : 0,
          transform: tooltipVisible
            ? 'translateX(0) scale(1)'
            : isRTL
            ? 'translateX(10px) scale(0.95)'
            : 'translateX(-10px) scale(0.95)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          background: '#ffffff',
          color: '#0077b6',
          fontSize: 13,
          fontWeight: 700,
          padding: '9px 15px',
          borderRadius: 22,
          boxShadow: '0 3px 14px rgba(0,119,182,0.18)',
          border: '1.5px solid #c8e8f5',
          whiteSpace: 'nowrap',
          pointerEvents: tooltipVisible ? 'auto' : 'none',
          userSelect: 'none',
        }}
      >
        {t.floatingChatTooltip}
      </div>

      {/* Floating button */}
      <button
        className="floating-chat-btn"
        onClick={() => window.open(WECHAT_BIZ_URL, '_blank', 'noopener,noreferrer')}
        aria-label={t.floatingChatTooltip}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0077b6 0%, #00a8cc 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <MessageCircle color="white" size={24} strokeWidth={2} />
      </button>
    </div>
  )
}
