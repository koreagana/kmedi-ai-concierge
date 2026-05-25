import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import FUIMenu from './FUIMenu'
import ThreeEffects from './ThreeEffects'

/* seconds after first tap before menu appears (matches end of dialogue) */
const MENU_APPEAR_AT = 18

export default function StudioScene() {
  const { stage, setStage } = useApp()
  const videoRef  = useRef<HTMLVideoElement>(null)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuShown = useRef(false)

  const [videoReady, setVideoReady] = useState(false)
  const [showMenu,   setShowMenu]   = useState(false)
  const [tapped,     setTapped]     = useState(false)

  /* ── Ensure silent autoplay starts (belt-and-suspenders with muted JSX prop) ── */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.play().catch(() => {})
  }, [])

  /* ── First tap: unmute, restart from top, play with audio ── */
  const handleFirstTap = () => {
    const vid = videoRef.current
    if (!vid || tapped) return
    setTapped(true)
    vid.muted = false
    vid.currentTime = 0
    vid.play().catch(() => {})
  }

  /* ── Start countdown to menu after tap ── */
  useEffect(() => {
    if (!tapped || menuShown.current) return
    timerRef.current = setTimeout(() => {
      menuShown.current = true
      setShowMenu(true)
      setStage('menu')
    }, MENU_APPEAR_AT * 1000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [tapped, setStage])

  /* ── Restore menu if already in a menu stage (page refresh etc.) ── */
  useEffect(() => {
    if (['menu','service','hospital','pricing','contact'].includes(stage)) {
      setShowMenu(true)
      menuShown.current = true
    }
  }, [stage])

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-white"
      onClick={handleFirstTap}
    >
      {/* ── Full-screen video background ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
        src="/studio.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
        onCanPlay={() => setVideoReady(true)}
        onEnded={() => {
          if (!menuShown.current) {
            menuShown.current = true
            setShowMenu(true)
            setStage('menu')
          }
        }}
      />

      {/* ── Loading state while video buffers ── */}
      {!videoReady && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mono text-[11px] tracking-[0.25em] text-sky"
          >
            LOADING...
          </motion.div>
        </div>
      )}

      {/* ── Subtle gradient veil for panel readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)' }}
      />

      {/* ── Three.js sparkle layer ── */}
      <ThreeEffects stage={stage} />

      {/* ── Scanline ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line" />
      </div>

      {/* ── Tap-to-unmute hint: glass-panel icon, right side of screen ── */}
      <AnimatePresence>
        {!tapped && videoReady && (
          <motion.div
            className="absolute z-40 pointer-events-none"
            style={{ right: 20, top: '42%', transform: 'translateY(-50%)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.4 } }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="glass-panel rounded-2xl px-5 py-4 text-center" style={{ minWidth: 90 }}>
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2"
              >
                <svg className="mx-auto" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0077ee" strokeWidth="1.8" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                </svg>
              </motion.div>
              <p className="text-medical-blue font-semibold text-[13px] leading-tight">点击开启</p>
              <p className="text-medical-blue font-semibold text-[13px] leading-tight">声音</p>
              <p className="text-muted text-[10px] mt-1">Tap for audio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 px-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <div className="flex items-center justify-between pt-5 pb-3">
          {/* Brand — SVG mark + text, no image file */}
          <div className="glass-panel rounded-xl px-3 py-2 flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C8 3 4 6.5 4 11c0 2.8 1.4 5.3 3.5 6.8L12 21l4.5-3.2C18.6 16.3 20 13.8 20 11c0-4.5-4-8-8-8z" stroke="#0077ee" strokeWidth="1.5" fill="rgba(0,119,238,0.08)"/>
              <path d="M12 8v6M9 11h6" stroke="#0077ee" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-medical-blue text-[13px] font-bold leading-tight tracking-wide">汉江春天</p>
              <p className="text-muted text-[9px] tracking-widest mono uppercase">AI Medical Concierge</p>
            </div>
          </div>

          {/* Online badge */}
          <div className="glass-panel rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <div className="status-dot" />
            <span className="mono text-[9px] text-sky tracking-widest">ONLINE · 24H</span>
          </div>
        </div>
        <div className="accent-line opacity-40 mx-2" />
      </motion.div>

      {/* ── FUI hologram menu ── */}
      <AnimatePresence>
        {showMenu && <FUIMenu key="fui" />}
      </AnimatePresence>
    </div>
  )
}
