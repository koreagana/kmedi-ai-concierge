import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { services, hospitals, type Service } from '../data/services'

/* ── Minimal SVG medical icons ── */
const MedIcon = ({ id }: { id: string }) => {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#0077ee', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'anti-aging': return (
      <svg {...props}><path d="M12 3C7 3 3 7.03 3 12s4 9 9 9 9-4.03 9-9"/><path d="M16 3.5c1 2 1.5 4 .5 6.5-1 2.5-3.5 4-5 4s-3-1-3-3 1.5-3 3-3 2.5 1 2.5 2.5"/><circle cx="19" cy="5" r="1.5" fill="#0077ee" stroke="none"/></svg>
    )
    case 'beauty': return (
      <svg {...props}><path d="M12 2C9 2 7 4 7 7c0 2.5 1.5 4.5 3.5 5.5"/><path d="M12 2c3 0 5 2 5 5 0 2.5-1.5 4.5-3.5 5.5"/><path d="M8.5 12.5C7 14 6 16 6 18c0 2.2 2.7 4 6 4s6-1.8 6-4c0-2-1-4-2.5-5.5"/><path d="M10 17h4"/></svg>
    )
    case 'plastic': return (
      <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
    )
    case 'checkup': return (
      <svg {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    )
    case 'orthopedic': return (
      <svg {...props}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
    )
    case 'women': return (
      <svg {...props}><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>
    )
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>
  }
}

/* ── Service grid ── */
function ServiceGrid() {
  const { setStage, setSelectedService } = useApp()
  const [active, setActive] = useState<string | null>(null)

  const pick = (s: Service) => {
    setActive(s.id)
    setTimeout(() => { setSelectedService(s.id); setStage('service') }, 180)
  }

  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
    >
      {/* Panel header */}
      <div className="text-center mb-4">
        <p className="text-dark font-semibold text-[17px] tracking-wide">请选择医疗项目</p>
        <p className="text-muted text-[11px] mt-0.5">Select a medical service</p>
      </div>
      <div className="accent-line mb-4 opacity-70" />

      {/* 2 × 3 grid */}
      <div className="grid grid-cols-2 gap-3">
        {services.map((s, i) => (
          <motion.button
            key={s.id}
            className={`service-btn rounded-2xl p-4 text-left ${active === s.id ? 'active' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 28 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => pick(s)}
          >
            <div className="mb-2.5"><MedIcon id={s.id} /></div>
            <p className="text-dark font-semibold text-[15px] leading-tight">{s.zh}</p>
            <p className="text-sky text-[10px] mt-0.5 tracking-wide">{s.en}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Service detail ── */
function ServiceDetail() {
  const { selectedService, setStage, setSelectedHospital } = useApp()
  const svc = services.find(s => s.id === selectedService)
  if (!svc) return null
  const related = hospitals.filter(h => h.specialty.includes(svc.id))

  return (
    <motion.div key="detail"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>

      <button className="flex items-center gap-1 text-sky text-[12px] mb-4 font-medium" onClick={() => setStage('menu')}>
        ← 返回菜单
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
          <MedIcon id={svc.id} />
        </div>
        <div>
          <h2 className="text-dark font-bold text-[18px] leading-tight">{svc.zh}</h2>
          <p className="text-sky text-[11px] tracking-wide">{svc.en}</p>
        </div>
      </div>
      <div className="accent-line mb-3 opacity-60" />
      <p className="text-dark text-[13px] leading-relaxed mb-4 opacity-80">{svc.descZh}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {svc.items.map(item => <span key={item} className="service-chip">{item}</span>)}
      </div>

      {related.length > 0 && (
        <div className="mb-4">
          <p className="text-muted text-[10px] mono tracking-widest mb-2.5 uppercase">推荐合作医院</p>
          <div className="space-y-2">
            {related.map(h => (
              <button key={h.id} className="service-btn w-full rounded-xl p-3 text-left"
                onClick={() => { setSelectedHospital(h.id); setStage('pricing') }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-dark font-medium text-[13px]">{h.name}</p>
                    <p className="text-muted text-[10px] mt-0.5">{h.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 text-[11px] font-medium">★ {h.rating}</p>
                    <p className="text-sky text-[10px] mt-0.5">{h.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="cta-btn w-full py-3.5 rounded-2xl font-bold text-[14px] tracking-widest" onClick={() => setStage('contact')}>
        立即免费咨询
      </button>
    </motion.div>
  )
}

/* ── Pricing ── */
function PricingPanel() {
  const { selectedService, selectedHospital, setStage } = useApp()
  const svc  = services.find(s => s.id === selectedService)
  const hosp = hospitals.find(h => h.id === selectedHospital)
  return (
    <motion.div key="pricing"
      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}>
      <button className="flex items-center gap-1 text-sky text-[12px] mb-4 font-medium" onClick={() => setStage('service')}>← 返回</button>
      <div className="accent-line mb-4 opacity-60" />
      <p className="text-muted text-[10px] mono tracking-widest mb-1 uppercase">医院信息</p>
      <p className="text-dark font-bold text-[16px]">{hosp?.name}</p>
      <p className="text-sky text-[11px] mb-3">{hosp?.location} · ★ {hosp?.rating}</p>
      <div className="accent-line mb-3 opacity-40" />
      <p className="text-muted text-[10px] mono tracking-widest mb-1 uppercase">项目</p>
      <p className="text-dark text-[14px] mb-3">{svc?.zh}</p>
      <div className="accent-line mb-3 opacity-40" />
      <div className="flex justify-between items-center mb-1">
        <p className="text-muted text-[11px]">参考价格</p>
        <p className="text-medical-blue font-bold text-[18px]">{hosp?.price}</p>
      </div>
      <p className="text-muted text-[9px] mb-5">* 含中文翻译陪同服务，最终价格依检查结果而定</p>
      <button className="cta-btn w-full py-3.5 rounded-2xl font-bold text-[14px] tracking-widest mb-2.5" onClick={() => setStage('contact')}>
        微信咨询 · 立即预约
      </button>
      <button className="service-btn w-full py-3 rounded-xl text-sky text-[12px] font-medium" onClick={() => setStage('contact')}>
        현장 결제 안내
      </button>
    </motion.div>
  )
}

/* ── Contact ── */
function ContactPanel() {
  const { setStage } = useApp()
  return (
    <motion.div key="contact"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}>
      <button className="flex items-center gap-1 text-sky text-[12px] mb-4 font-medium" onClick={() => setStage('menu')}>← 返回菜单</button>
      <div className="accent-line mb-4 opacity-60" />
      <div className="text-center mb-4">
        <p className="text-dark font-semibold text-[15px] mb-1">微信专属顾问</p>
        <p className="text-muted text-[11px]">扫码添加，即刻咨询</p>
      </div>
      <div className="w-36 h-36 mx-auto mb-4 rounded-2xl border border-blue-100 bg-blue-50/60 flex items-center justify-center">
        <div className="text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0077ee" strokeWidth="1.5">
            <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
          </svg>
          <p className="text-muted text-[9px] mono mt-1">WeChat QR</p>
        </div>
      </div>
      <div className="accent-line mb-4 opacity-40" />
      <p className="text-center text-muted text-[10px] mb-1">或直接致电</p>
      <p className="text-center text-medical-blue font-bold text-[17px] mb-4">+82-10-XXXX-XXXX</p>
      <button className="service-btn w-full py-3 rounded-xl mb-2 text-center">
        <span className="text-[13px] font-medium" style={{ color: '#09b83e' }}>💬 KakaoTalk 상담</span>
      </button>
      <button className="service-btn w-full py-3 rounded-xl text-center">
        <span className="text-[13px] font-medium text-red-500">긴급 연락 · Emergency</span>
      </button>
    </motion.div>
  )
}

/* ══════════════════════════════════════
   MAIN FUI OVERLAY — floating hologram
   ══════════════════════════════════════ */
export default function FUIMenu() {
  const { stage, setStage } = useApp()
  const [showLang, setShowLang] = useState(false)

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Central floating hologram panel ──
          Sits in the lower portion, avatars visible above */}
      <div className="pointer-events-auto px-4 pb-4" style={{ maxHeight: '60vh' }}>

        {/* Main content panel */}
        <motion.div
          className="hologram-panel relative rounded-3xl px-5 pt-5 pb-4 overflow-y-auto float-anim"
          style={{ maxHeight: 'calc(60vh - 80px)' }}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {(stage === 'menu' || stage === 'entering' || stage === 'greeting') && <ServiceGrid />}
            {stage === 'service'  && <ServiceDetail />}
            {stage === 'pricing'  && <PricingPanel />}
            {stage === 'contact'  && <ContactPanel />}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom action bar ── */}
        <motion.div
          className="glass-panel rounded-2xl px-3 py-2.5 mt-2.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09b83e" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ), label: 'WeChat', color: 'text-green-600', action: () => setStage('contact') },
              { icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8a000" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="11" r="1" fill="#e8a000"/><circle cx="12" cy="11" r="1" fill="#e8a000"/><circle cx="15" cy="11" r="1" fill="#e8a000"/></svg>
                ), label: 'Kakao', color: 'text-amber-500', action: () => setStage('contact') },
              { icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc3333" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                ), label: 'SOS', color: 'text-red-500', action: () => {} },
              { icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077ee" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                ), label: 'Lang', color: 'text-medical-blue', action: () => setShowLang(s => !s) },
            ].map(b => (
              <button key={b.label} className="action-btn rounded-xl py-2.5 flex flex-col items-center gap-1" onClick={b.action}>
                {b.icon}
                <span className={`mono text-[9px] tracking-wide ${b.color}`}>{b.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Language selector ── */}
      <AnimatePresence>
        {showLang && (
          <>
            <motion.div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLang(false)} style={{ pointerEvents: 'auto' }} />
            <motion.div
              className="absolute z-50 left-1/2 top-1/2 w-[260px]"
              style={{ x: '-50%', y: '-50%', pointerEvents: 'auto' }}
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <div className="hologram-panel relative rounded-2xl p-5">
                <p className="text-dark font-semibold text-[13px] text-center mb-4 tracking-wider">语言选择 · 언어 선택</p>
                <div className="accent-line mb-4 opacity-60" />
                {[
                  { code: 'zh', label: '中文（默认）', flag: '🇨🇳' },
                  { code: 'ko', label: '한국어', flag: '🇰🇷' },
                  { code: 'en', label: 'English', flag: '🇺🇸' },
                  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                ].map(l => (
                  <button key={l.code}
                    className="service-btn w-full rounded-xl px-4 py-2.5 mb-2 flex items-center gap-3 text-left"
                    onClick={() => setShowLang(false)}>
                    <span className="text-lg">{l.flag}</span>
                    <span className="text-dark text-[13px]">{l.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
