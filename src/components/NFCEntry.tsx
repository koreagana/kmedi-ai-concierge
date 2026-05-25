import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'

export default function NFCEntry() {
  const { setStage } = useApp()

  useEffect(() => {
    const t = setTimeout(() => setStage('entering'), 3200)
    return () => clearTimeout(t)
  }, [setStage])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Deep space background */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, #020e2a 0%, #000 70%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 fui-grid opacity-40" />

      {/* Concentric pulse rings */}
      {[0, 0.5, 1].map(delay => (
        <motion.div
          key={delay}
          className="absolute rounded-full border border-cyan-400/40"
          style={{ width: 180, height: 180 }}
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 2.4, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* NFC icon */}
      <motion.div
        className="relative z-10 mb-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-28 h-28 rounded-full border-2 border-cyan-400/60 flex items-center justify-center"
          animate={{ boxShadow: ['0 0 16px rgba(0,200,255,0.3)', '0 0 40px rgba(0,200,255,0.7)', '0 0 16px rgba(0,200,255,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border border-cyan-300/40 flex items-center justify-center"
          >
            {/* NFC symbol */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20 Q8 8 20 8 Q32 8 32 20 Q32 32 20 32" stroke="rgba(0,220,255,0.8)" strokeWidth="2" fill="none" />
              <path d="M13 20 Q13 13 20 13 Q27 13 27 20 Q27 27 20 27" stroke="rgba(0,220,255,0.6)" strokeWidth="1.5" fill="none" />
              <circle cx="20" cy="20" r="3" fill="rgba(0,220,255,0.9)" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Logo text */}
      <motion.div
        className="z-10 text-center mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <img src="/concierge/logo.png" alt="logo"
          className="w-16 h-16 mx-auto mb-3 opacity-80"
          style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)' }}
        />
        <h1 className="text-white text-xl font-bold tracking-widest glow-blue mb-1">汉江春天</h1>
        <p className="text-cyan-400/70 text-[11px] tracking-[0.3em] uppercase">AI Medical Concierge Studio</p>
      </motion.div>

      {/* Status line */}
      <motion.div
        className="z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="mono text-cyan-400/80 text-[11px] tracking-widest">NFC CONNECTED</span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        <p className="text-white/40 text-[10px] tracking-wider mono">正在进入汉江春天 AI 스튜디오...</p>
      </motion.div>

      {/* Tap to skip */}
      <motion.button
        className="absolute bottom-12 z-10 text-white/20 text-[11px] tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setStage('entering')}
      >
        tap to enter
      </motion.button>
    </div>
  )
}
