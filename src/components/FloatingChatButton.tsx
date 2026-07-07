import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import { WECHAT_BIZ_URL } from '../data/contacts'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'

/* ─── constants ─────────────────────────────────────────────────────── */
const BTN = 56
const MARGIN = 20
const NAV_H = 80
const DRAG_THRESHOLD = 5
const POS_KEY = 'fcb_pos_v3'  // v3: stores xRatio/yRatio instead of side/yFromBottom

/* ─── CSS injected once into <head> ──────────────────────────────────── */
const STYLES = `
@keyframes fcbPulse {
  0%   { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 0   rgba(255,140,66,0.65), 0 0 0 0   rgba(255,107,53,0.4); }
  60%  { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 20px rgba(255,140,66,0.0), 0 0 0 32px rgba(255,107,53,0.0); }
  100% { box-shadow: 0 0 0 2.5px white, 0 4px 16px rgba(255,107,53,0.45),
                     0 0 0 0   rgba(255,140,66,0.0), 0 0 0 0   rgba(255,107,53,0.0); }
}
.fcb-btn { animation: fcbPulse 2.5s ease-out infinite; }

/*
 * Antenna labels alternate every 2.5s: left first, then right.
 * Each label has a 5s period:  appear 0–50% of cycle, hidden 50–100%.
 * Right label uses animation-delay: 2.5s so it starts when left hides.
 *
 * Transform-origin of left label  = bottom-right (nearest point to button).
 * Transform-origin of right label = bottom-left  (nearest point to button).
 * Rotation is fixed at ±28°; scale animates to produce the spring-pop.
 */
@keyframes fcbAntennaL {
  0%   { opacity: 0; transform: rotate(-28deg) scale(0.15); }
  8%   { opacity: 1; transform: rotate(-28deg) scale(1.14); }
  14%  { transform: rotate(-28deg) scale(0.94); }
  19%  { transform: rotate(-28deg) scale(1.03); }
  25%  { transform: rotate(-28deg) scale(1);    opacity: 1; }
  42%  { transform: rotate(-28deg) scale(1);    opacity: 1; }
  50%  { transform: rotate(-28deg) scale(0.85); opacity: 0; }
  100% { transform: rotate(-28deg) scale(0.15); opacity: 0; }
}
@keyframes fcbAntennaR {
  0%   { opacity: 0; transform: rotate(28deg) scale(0.15); }
  8%   { opacity: 1; transform: rotate(28deg) scale(1.14); }
  14%  { transform: rotate(28deg) scale(0.94); }
  19%  { transform: rotate(28deg) scale(1.03); }
  25%  { transform: rotate(28deg) scale(1);    opacity: 1; }
  42%  { transform: rotate(28deg) scale(1);    opacity: 1; }
  50%  { transform: rotate(28deg) scale(0.85); opacity: 0; }
  100% { transform: rotate(28deg) scale(0.15); opacity: 0; }
}
`

/* ─── position persistence (v3: viewport-ratio based) ────────────────── */
interface StoredPos { xRatio: number; yRatio: number }

function loadPos(): StoredPos | null {
  try { return JSON.parse(localStorage.getItem(POS_KEY) ?? 'null') } catch { return null }
}
function savePos(x: number, y: number) {
  try {
    const p: StoredPos = {
      xRatio: x / window.innerWidth,
      yRatio: y / window.innerHeight,
    }
    localStorage.setItem(POS_KEY, JSON.stringify(p))
  } catch {}
}

function resolveInitialPos(isRTL: boolean): { x: number; y: number } {
  const stored = loadPos()
  if (stored) {
    const x = Math.max(0, Math.min(window.innerWidth - BTN, stored.xRatio * window.innerWidth))
    const y = Math.max(NAV_H, Math.min(window.innerHeight - BTN - MARGIN, stored.yRatio * window.innerHeight))
    return { x, y }
  }
  const x = isRTL ? MARGIN : window.innerWidth - BTN - MARGIN
  return { x, y: window.innerHeight - BTN - 24 }
}

/* ─── component ─────────────────────────────────────────────────────── */
export default function FloatingChatButton() {
  const { lang, page } = useApp()
  const t = translations[lang]
  const isRTL = lang === 'ar'

  const [shown, setShown] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const wasLastActionDrag = useRef(false)
  const drag = useRef<{
    startX: number; startY: number
    btnX: number;  btnY: number
    hasMoved: boolean
  } | null>(null)

  /* inject CSS once */
  useEffect(() => {
    if (!document.getElementById('fcb-style')) {
      const el = document.createElement('style')
      el.id = 'fcb-style'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  /* init position */
  useEffect(() => {
    const { x, y } = resolveInitialPos(isRTL)
    setPos({ x, y })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* visibility — home: wait for #categories; other pages: immediate */
  useEffect(() => {
    if (page !== 'home') { setShown(true); return }
    setShown(false)
    const el = document.getElementById('categories')
    if (!el) { setShown(true); return }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true)
      } else if (entry.boundingClientRect.top > 0) {
        setShown(false)
      }
    }, { threshold: 0 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [page])

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

    // Compute final position directly from event to avoid stale closure
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    const finalX = Math.max(0, Math.min(window.innerWidth - BTN, btnX + dx))
    const finalY = Math.max(NAV_H, Math.min(window.innerHeight - BTN - MARGIN, btnY + dy))

    setPos({ x: finalX, y: finalY })
    savePos(finalX, finalY)
  }

  const handleClick = () => {
    if (wasLastActionDrag.current) { wasLastActionDrag.current = false; return }
    window.open(WECHAT_BIZ_URL, '_blank', 'noopener,noreferrer')
  }

  if (!pos) return null

  /*
   * Antenna label geometry (wrapper = 56×56, button center = (28,28)):
   *
   * Target: label center ~60px from button center at ±28° from vertical.
   * C_final = (28 ∓ sin28°·60, 28 − cos28°·60) ≈ (0, −25) and (56, −25)
   *
   * rotate(±28°) shifts the center by (∓25.94, +0.19) from pivot.
   * Solving for pivot: O = C_final − shift
   *   Left  pivot (bottom-right) = (26, −25) → top=−49, left=−20
   *   Right pivot (bottom-left)  = (30, −25) → top=−49, left=+30
   *
   * Even at scale(0.15) the label collapses to its pivot, which is ~53px
   * from the button center — well outside the 28px radius circle.
   */
  const antennaStyle = (side: 'left' | 'right') => ({
    position: 'absolute' as const,
    top: -49,
    ...(side === 'left' ? { left: -20 } : { left: 30 }),
    transformOrigin: side === 'left' ? '100% 100%' : '0% 100%',
    animation: `${side === 'left' ? 'fcbAntennaL' : 'fcbAntennaR'} 5s ease-in-out infinite`,
    animationDelay: side === 'right' ? '2.5s' : '0s',
    animationFillMode: 'both' as const,
    animationPlayState: shown ? 'running' : 'paused',
    background: '#ffffff',
    color: '#FF6B35',
    border: '1.5px solid #FF6B35',
    boxShadow: '0 2px 8px rgba(255,107,53,0.18)',
    fontSize: 12,
    fontWeight: 700,
    padding: '5px 11px',
    borderRadius: 20,
    whiteSpace: 'nowrap' as const,
    pointerEvents: 'none' as const,
    lineHeight: 1.2,
    userSelect: 'none' as const,
  })

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
        transition: 'opacity 0.3s ease',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* antenna labels — absolutely positioned, never affect button layout */}
      <div style={antennaStyle('left')}>{t.antennaLeft}</div>
      <div style={antennaStyle('right')}>{t.antennaRight}</div>

      {/* main button */}
      <button
        className="fcb-btn"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        aria-label={t.floatingChatTooltip}
        style={{
          position: 'absolute',
          inset: 0,
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
