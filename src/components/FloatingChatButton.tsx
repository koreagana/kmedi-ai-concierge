import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import { WECHAT_BIZ_URL } from '../data/contacts'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'

/* ─── constants ─────────────────────────────────────────────────────── */
const BTN = 56           // button diameter px
const MARGIN = 20        // edge gap px
const NAV_H = 80         // top area (nav bar) to avoid
const DRAG_THRESHOLD = 5 // px — movement below this = click, not drag
const SCROLL_TRIGGERS = [0.25, 0.55, 0.85]
const POS_KEY = 'fcb_pos_v2'

/* ─── pulse CSS injected once into <head> ────────────────────────────── */
const PULSE_CSS = `
@keyframes fcbPulse {
  0%   { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 0   rgba(255,140,66,0.65), 0 0 0 0   rgba(255,107,53,0.4); }
  60%  { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 20px rgba(255,140,66,0.0), 0 0 0 32px rgba(255,107,53,0.0); }
  100% { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 0   rgba(255,140,66,0.0), 0 0 0 0   rgba(255,107,53,0.0); }
}
.fcb-btn { animation: fcbPulse 2.5s ease-out infinite; }
`

/* ─── position persistence ───────────────────────────────────────────── */
interface StoredPos { side: 'left' | 'right'; yFromBottom: number }

function loadPos(): StoredPos | null {
  try { return JSON.parse(localStorage.getItem(POS_KEY) ?? 'null') } catch { return null }
}
function savePos(p: StoredPos) {
  try { localStorage.setItem(POS_KEY, JSON.stringify(p)) } catch {}
}

function resolveInitialPos(isRTL: boolean): { x: number; y: number; side: 'left' | 'right' } {
  const stored = loadPos()
  if (stored) {
    const x = stored.side === 'left' ? MARGIN : window.innerWidth - BTN - MARGIN
    const y = Math.max(NAV_H, Math.min(
      window.innerHeight - BTN - MARGIN,
      window.innerHeight - stored.yFromBottom - BTN,
    ))
    return { x, y, side: stored.side }
  }
  const side = isRTL ? 'left' : 'right'
  const x = isRTL ? MARGIN : window.innerWidth - BTN - MARGIN
  return { x, y: window.innerHeight - BTN - 24, side }
}

/* ─── component ─────────────────────────────────────────────────────── */
export default function FloatingChatButton() {
  const { lang, page } = useApp()
  const t = translations[lang]
  const isRTL = lang === 'ar'

  const [shown, setShown] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [side, setSide] = useState<'left' | 'right'>('right')
  const [isDragging, setIsDragging] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const tooltipTriggered = useRef<Set<number>>(new Set())
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wasLastActionDrag = useRef(false)
  const drag = useRef<{
    startX: number; startY: number
    btnX: number; btnY: number
    hasMoved: boolean
  } | null>(null)

  /* inject pulse CSS once */
  useEffect(() => {
    if (!document.getElementById('fcb-style')) {
      const el = document.createElement('style')
      el.id = 'fcb-style'
      el.textContent = PULSE_CSS
      document.head.appendChild(el)
    }
  }, [])

  /* init position */
  useEffect(() => {
    const { x, y, side: s } = resolveInitialPos(isRTL)
    setPos({ x, y })
    setSide(s)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* visibility — home: wait for #categories; other pages: immediate */
  useEffect(() => {
    if (page !== 'home') {
      setShown(true)
      return
    }
    setShown(false)
    const el = document.getElementById('categories')
    if (!el) { setShown(true); return }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true)
      } else if (entry.boundingClientRect.top > 0) {
        // section still below viewport → user scrolled back to hero
        setShown(false)
      }
      // section above viewport (user scrolled past) → stay visible
    }, { threshold: 0 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [page])

  /* scroll-triggered tooltip */
  useEffect(() => {
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const prog = window.scrollY / max
      for (const trig of SCROLL_TRIGGERS) {
        if (!tooltipTriggered.current.has(trig) && prog >= trig) {
          tooltipTriggered.current.add(trig)
          setTooltipVisible(true)
          if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
          tooltipTimer.current = setTimeout(() => setTooltipVisible(false), 2500)
          break
        }
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => {
      window.removeEventListener('scroll', handle)
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
    }
  }, [])

  /* ── drag handlers ─────────────────────────────────────────────────── */
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    wasLastActionDrag.current = false
    drag.current = {
      startX: e.clientX, startY: e.clientY,
      btnX: pos?.x ?? 0, btnY: pos?.y ?? 0,
      hasMoved: false,
    }
    setIsDragging(true)
    setIsSnapping(false)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      drag.current.hasMoved = true
    }
    if (!drag.current.hasMoved) return
    const newX = Math.max(0, Math.min(window.innerWidth - BTN, drag.current.btnX + dx))
    const newY = Math.max(NAV_H, Math.min(window.innerHeight - BTN - MARGIN, drag.current.btnY + dy))
    setPos({ x: newX, y: newY })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return
    const { hasMoved, startX, startY, btnX, btnY } = drag.current
    drag.current = null
    setIsDragging(false)

    if (!hasMoved) return

    wasLastActionDrag.current = true

    // Compute final position from event directly — avoids stale `pos` closure
    // (React may not have committed the last setPos from handlePointerMove yet)
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    const finalX = Math.max(0, Math.min(window.innerWidth - BTN, btnX + dx))
    const finalY = Math.max(NAV_H, Math.min(window.innerHeight - BTN - MARGIN, btnY + dy))

    // snap to nearest horizontal edge
    const centerX = finalX + BTN / 2
    const newSide = centerX < window.innerWidth / 2 ? 'left' : 'right'
    const snappedX = newSide === 'left' ? MARGIN : window.innerWidth - BTN - MARGIN
    const snappedY = finalY

    setSide(newSide)
    // set snapping flag first so transition is in the DOM before position changes
    setIsSnapping(true)
    requestAnimationFrame(() => {
      setPos({ x: snappedX, y: snappedY })
      savePos({ side: newSide, yFromBottom: window.innerHeight - snappedY - BTN })
      setTimeout(() => setIsSnapping(false), 450)
    })
  }

  const handleClick = () => {
    // suppress click that follows a drag
    if (wasLastActionDrag.current) {
      wasLastActionDrag.current = false
      return
    }
    window.open(WECHAT_BIZ_URL, '_blank', 'noopener,noreferrer')
  }

  if (!pos) return null

  const content = (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: BTN,
        height: BTN,
        zIndex: 2147483647,
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? 'auto' : 'none',
        transition: isSnapping
          ? 'left 0.38s cubic-bezier(0.34,1.56,0.64,1), top 0.38s ease, opacity 0.3s ease'
          : 'opacity 0.3s ease',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* tooltip — absolutely positioned so it never shifts the button */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          // open to the right when button is on left edge, open left when on right edge
          ...(side === 'left'
            ? { left: BTN + 10 }
            : { right: BTN + 10 }),
          transform: `translateY(-50%) scale(${tooltipVisible ? 1 : 0.9})`,
          opacity: tooltipVisible ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          background: '#ffffff',
          color: '#FF6B35',
          fontSize: 13,
          fontWeight: 700,
          padding: '9px 15px',
          borderRadius: 22,
          boxShadow: '0 3px 14px rgba(255,107,53,0.2)',
          border: '1.5px solid #FFD4C2',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {t.floatingChatTooltip}
      </div>

      {/* main button — fills the wrapper exactly */}
      <button
        className="fcb-btn"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        aria-label={t.floatingChatTooltip}
        style={{
          width: BTN,
          height: BTN,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)',
          border: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          transform: isDragging ? 'scale(1.1)' : 'scale(1)',
          transition: isDragging ? 'transform 0.1s ease' : 'transform 0.2s ease',
        }}
      >
        <MessageCircle color="white" size={24} strokeWidth={2} />
      </button>
    </div>
  )

  return createPortal(content, document.body)
}
