import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import { WECHAT_BIZ_URL, WHATSAPP_URL } from '../data/contacts'
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
@keyframes fcbGoldPulse {
  0%   { transform: scale(1);   opacity: 0.7; }
  70%  { transform: scale(2.1); opacity: 0; }
  100% { transform: scale(2.1); opacity: 0; }
}
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
  const { lang, page, categoryId } = useApp()
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

  /* recent pointer samples (last ~100ms), used to estimate release velocity for the glide */
  const moveSamples = useRef<{ x: number; y: number; t: number }[]>([])
  const glideFrame = useRef<number | null>(null)

  const cancelGlide = () => {
    if (glideFrame.current !== null) {
      cancelAnimationFrame(glideFrame.current)
      glideFrame.current = null
    }
  }

  /* Inertia glide: decays the release velocity to zero (no spring, no overshoot) —
     it slides, decelerates, and settles in place rather than bouncing at the edges. */
  const startGlide = (x0: number, y0: number, vx0: number, vy0: number) => {
    cancelGlide()
    let x = x0, y = y0, vx = vx0, vy = vy0
    let lastT = performance.now()

    const step = (now: number) => {
      const dt = Math.min(now - lastT, 48) // clamp in case of a dropped/slow frame
      lastT = now

      const decay = Math.pow(0.994, dt)
      vx *= decay
      vy *= decay
      x += vx * dt
      y += vy * dt

      const minX = 0, maxX = window.innerWidth - BTN
      const minY = NAV_H, maxY = window.innerHeight - BTN - MARGIN
      if (x < minX) { x = minX; vx = 0 }
      if (x > maxX) { x = maxX; vx = 0 }
      if (y < minY) { y = minY; vy = 0 }
      if (y > maxY) { y = maxY; vy = 0 }

      setPos({ x, y })

      if (Math.hypot(vx, vy) > 0.02) {
        glideFrame.current = requestAnimationFrame(step)
      } else {
        glideFrame.current = null
        savePos(x, y)
      }
    }
    glideFrame.current = requestAnimationFrame(step)
  }

  useEffect(() => () => cancelGlide(), [])

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

  /* visibility — hidden while the page's hero section is on screen, revealed once
     scrolled past it. Covers home (#hero), category pages (.cat-hero) and the
     package page (.pkg-hero) with one rule so the button never sits over hero
     video/image content. */
  useEffect(() => {
    setShown(false)

    // Pick the selector for *this* page's hero specifically — with AnimatePresence's
    // exit-then-enter transition, the previous page's hero element can still be sitting
    // in the DOM for a moment after `page` has already updated, so a generic selector
    // risks grabbing that stale node instead of waiting for the real one.
    const selector = page === 'home' ? '#hero' : page === 'package' ? '.pkg-hero' : '.cat-hero'

    // Category hero images use aspect-ratio:16/9, so their rendered height scales with
    // viewport *width* — on a wide/desktop window the hero can run to 600px+ tall, which
    // would hide the consult button for a long scroll. Cap how long we wait regardless of
    // how tall the hero renders, so the button always reappears within one screenful.
    // Home's hero is intentionally exempt — its extra height/content is expected.
    const REVEAL_CAP = page === 'home' ? Infinity : 640

    let io: IntersectionObserver | null = null
    let mo: MutationObserver | null = null

    const attach = (heroEl: Element) => {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setShown(false)
        } else if (entry.boundingClientRect.top < 0) {
          setShown(true)
        }
      }, { threshold: 0 })
      io.observe(heroEl)
    }

    const existing = document.querySelector(selector)
    if (existing) {
      attach(existing)
    } else {
      // Hero not mounted yet (mid page-transition) — watch the DOM until it appears.
      mo = new MutationObserver(() => {
        const el = document.querySelector(selector)
        if (el) {
          mo?.disconnect()
          mo = null
          attach(el)
        }
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    const onScroll = () => {
      if (window.scrollY > REVEAL_CAP) setShown(true)
    }
    if (Number.isFinite(REVEAL_CAP)) {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      io?.disconnect()
      mo?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [page, categoryId])

  /* ── drag handlers ─────────────────────────────────────────────────── */
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    cancelGlide()
    e.currentTarget.setPointerCapture(e.pointerId)
    wasLastActionDrag.current = false
    drag.current = {
      startX: e.clientX, startY: e.clientY,
      btnX: pos?.x ?? 0, btnY: pos?.y ?? 0,
      hasMoved: false,
    }
    moveSamples.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }]
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

    const now = performance.now()
    moveSamples.current.push({ x: e.clientX, y: e.clientY, t: now })
    // keep only the last ~100ms of samples — recent enough to reflect the release flick
    while (moveSamples.current.length > 2 && now - moveSamples.current[0].t > 100) {
      moveSamples.current.shift()
    }

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

    // Release velocity (px/ms) from the recent pointer samples — a slow, deliberate
    // release yields ~0 velocity and just stays put; a flick carries through into a glide.
    const samples = moveSamples.current
    let vx = 0, vy = 0
    if (samples.length >= 2) {
      const first = samples[0]
      const last = samples[samples.length - 1]
      const dt = last.t - first.t
      if (dt > 0) {
        vx = (last.x - first.x) / dt
        vy = (last.y - first.y) / dt
      }
    }
    moveSamples.current = []

    const MAX_V = 3 // px/ms safety cap
    vx = Math.max(-MAX_V, Math.min(MAX_V, vx))
    vy = Math.max(-MAX_V, Math.min(MAX_V, vy))

    setPos({ x: finalX, y: finalY })

    if (Math.hypot(vx, vy) > 0.05) {
      startGlide(finalX, finalY, vx, vy)
    } else {
      savePos(finalX, finalY)
    }
  }

  const handleClick = () => {
    if (wasLastActionDrag.current) { wasLastActionDrag.current = false; return }
    const url = isRTL ? WHATSAPP_URL : WECHAT_BIZ_URL
    window.open(url, '_blank', 'noopener,noreferrer')
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

      {/* main button — Arabic: gold WhatsApp, others: orange WeChat */}
      {isRTL ? (
        <>
          {/* gold pulse rings */}
          {([0, 1.1] as const).map((delay, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: -4, left: -4,
              width: 64, height: 64,
              borderRadius: '50%',
              border: '2px solid #e8b530',
              animation: 'fcbGoldPulse 2.2s ease-out infinite',
              animationDelay: `${delay}s`,
              animationFillMode: 'both',
              animationPlayState: shown ? 'running' : 'paused',
              pointerEvents: 'none',
            }} />
          ))}

          {/* gold WhatsApp button */}
          <button
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={handleClick}
            aria-label={t.floatingChatTooltip}
            style={{
              position: 'absolute',
              top: -4, left: -4,
              width: 64, height: 64,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 26%, #fffbe8 0%, #f9e08a 22%, #e8b530 50%, #c68a1a 74%, #8a5a0d 100%)',
              border: '2px solid #b8841c',
              boxShadow: 'inset 1px 2px 5px rgba(255,255,255,0.5), inset -2px -3px 7px rgba(80,48,4,0.6), 0 6px 16px rgba(0,0,0,0.5)',
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
            {/* WhatsApp icon (inline SVG — react-icons not installed) */}
            <svg viewBox="0 0 24 24" width={28} height={28} fill="#3a2600" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>
        </>
      ) : (
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
      )}
    </div>
  )

  return createPortal(content, document.body)
}
