import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { categories, type CategoryId } from '../data/categories'
import { WECHAT_BIZ_URL, WHATSAPP_URL, EMAIL_GENERAL, EMAIL_AR } from '../data/contacts'
import HalalMapButton from './HalalMapButton'
import ConsultationCard from './ConsultationCard'
import ConsultCardVisual from './ConsultCardVisual'
import TtsButton from './TtsButton'

/* ─────────────────────────────── helpers ─────────────────────────── */

const videoSrcMap: Record<string, string> = {
  zh: '/studio.mp4',
  en: '/studio_eng.mp4',
  ko: '/studio_kr.mp4',
  ar: '/studio_arb.mp4',
}

function WechatIdBox({ id, lang }: { id: string; lang: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
        {lang === 'zh' ? '微信号' : lang === 'ko' ? '위챗 ID' : 'WeChat ID'}
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: 'var(--bg-surface)', border: '1px solid var(--border-blue)',
        borderRadius: 12, padding: '12px 18px', marginBottom: 12,
      }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-dark)', letterSpacing: '0.06em' }}>{id}</span>
        <button
          onClick={copy}
          style={{ background: copied ? 'var(--brand)' : 'var(--bg-light)', border: '1px solid var(--border-blue)', borderRadius: 8, padding: '4px 12px', fontSize: 11, color: copied ? 'white' : 'var(--brand)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
        >
          {copied ? (lang === 'zh' ? '已复制' : lang === 'ko' ? '복사됨' : 'Copied!') : (lang === 'zh' ? '复制' : lang === 'ko' ? '복사' : 'Copy')}
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        {lang === 'zh' ? '打开微信 → 添加朋友 → 搜索以上微信号\n添加后请备注「韩国医疗咨询」' : lang === 'ko' ? '위챗 앱 → 친구 추가 → 위 ID 검색\n추가 후 「한국의료상담」으로 메모' : 'Open WeChat → Add Friends → Search the ID above'}
      </p>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const { lang } = useApp()
  const t = translations[lang]
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [soundOn, setSoundOn] = useState(false)
  const soundOnRef = useRef(false)
  const playCountRef = useRef(0)
  const [videoFading, setVideoFading] = useState(false)
  const activeSrcRef = useRef(videoSrcMap[lang] ?? '/studio.mp4')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // 언어 변경 시 영상 페이드 전환 (imperative DOM 조작)
  useEffect(() => {
    const newSrc = videoSrcMap[lang] ?? '/studio.mp4'
    if (newSrc === activeSrcRef.current) return
    activeSrcRef.current = newSrc

    setVideoFading(true)
    const timer = setTimeout(() => {
      const v = videoRef.current
      if (v) {
        v.pause()
        v.src = newSrc
        v.load()
        v.muted = true
        soundOnRef.current = false
        setSoundOn(false)
        playCountRef.current = 0
        v.play().catch(() => {})
      }
      setVideoFading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [lang])

  // 영상 종료 시: 소리 ON이면 최대 3회, 이후 무음 루프
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const handleEnded = () => {
      if (soundOnRef.current) {
        playCountRef.current += 1
        if (playCountRef.current < 3) {
          v.currentTime = 0
          v.play().catch(() => {})
        } else {
          v.muted = true
          soundOnRef.current = false
          setSoundOn(false)
          playCountRef.current = 0
          v.currentTime = 0
          v.play().catch(() => {})
        }
      } else {
        v.currentTime = 0
        v.play().catch(() => {})
      }
    }
    v.addEventListener('ended', handleEnded)
    return () => v.removeEventListener('ended', handleEnded)
  }, [])

  // 히어로 벗어나면 일시정지, 돌아오면 재개
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
          v.muted = true
          soundOnRef.current = false
          setSoundOn(false)
          playCountRef.current = 0
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    if (soundOnRef.current) {
      v.muted = true
      soundOnRef.current = false
      setSoundOn(false)
      playCountRef.current = 0
    } else {
      playCountRef.current = 0
      v.muted = false
      v.volume = 1
      v.currentTime = 0
      v.play().catch(() => {})
      soundOnRef.current = true
      setSoundOn(true)
    }
  }

  return (
    <section ref={sectionRef} id="hero" className="hero-section">
      <video
        ref={videoRef}
        className="hero-video"
        src={activeSrcRef.current}
        autoPlay
        muted
        playsInline
        poster="/studio-hero.png"
        style={{ transition: 'opacity 0.3s ease', opacity: videoFading ? 0 : 1 }}
      />

      {/* 우측 스피커 토글 버튼 — 위쪽에 배치, 홀로그램 링 */}
      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        onClick={toggleSound}
        title={soundOn
          ? (lang === 'zh' ? '点击静音' : lang === 'ko' ? '소리 끄기' : 'Mute')
          : (lang === 'zh' ? '点击开启声音' : lang === 'ko' ? '소리 켜기' : 'Enable sound')}
        style={{
          position: 'absolute',
          right: 18,
          top: '26%',
          zIndex: 10,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'rgba(0,119,182,0.82)',
          border: soundOn
            ? '2px solid rgba(100,200,255,0.9)'
            : '2px solid rgba(78,151,209,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(14px)',
          boxShadow: soundOn
            ? '0 0 20px rgba(0,150,255,0.6), 0 0 40px rgba(0,150,255,0.25)'
            : '0 0 16px rgba(0,119,182,0.5), 0 0 32px rgba(0,119,182,0.2)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* 무음일 때만 펄스 링 표시 */}
        {!soundOn && (
          <>
            <span className="sound-btn-ring" />
            <span className="sound-btn-ring-2" />
          </>
        )}

        {soundOn ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 010 7.07"/>
            <path d="M19.07 4.93a10 10 0 010 14.14"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        )}
      </motion.button>

      {/* 하단 CTA 버튼 */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ width: '100%', maxWidth: 320, textAlign: 'center', marginBottom: 14 }}
        >
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.02em',
            textShadow: '0 1px 8px rgba(0,0,0,0.55)',
            lineHeight: 1.5,
            marginBottom: 4,
          }}>
            {t.heroTagline}
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.82)',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            lineHeight: 1.6,
          }}>
            {t.heroDesc}
          </p>
        </motion.div>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ width: '100%', maxWidth: 320 }}
        >
          <button className="btn-primary" onClick={() => scrollTo('categories')}>
            {t.heroCta1}
          </button>
          {/* 쇼핑몰 진입 버튼 - WeChat Pay 결제 + 중국 배송 전용이라 zh/ko만 노출 */}
          {(lang === 'zh' || lang === 'ko') && (
            <button className="btn-shop" onClick={() => navigate(`/shop?lang=${lang}`)}>
              <span className="btn-shop-title">{t.shopBtnTitle}</span>
              <span className="btn-shop-sub">{t.shopBtnSub}</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   2. CONCIERGE SELECTION
   ═══════════════════════════════════════════════════════════════════ */
function ConciergeSection() {
  const { lang } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'

  const [showWxModal, setShowWxModal] = useState(false)
  const [liPlaying, setLiPlaying] = useState(false)
  const [kimPlaying, setKimPlaying] = useState(false)
  const liVideoRef = useRef<HTMLVideoElement>(null)
  const kimVideoRef = useRef<HTMLVideoElement>(null)

  // 중국어 페이지에서만: 아바타를 클릭하면 정지 사진 대신 짧은 인사 영상이
  // (같은 원형 안에서) 재생됨. 재생 중에 한 번 더 클릭하면 정지(음소거 대신
  // 영상 자체를 멈춤)하고 사진으로 돌아감 — 토글 방식. 카드 전체 클릭
  // (위챗 연결)과 겹치지 않도록 stopPropagation 처리. 영상이 끝까지 재생되면
  // 자동으로 사진으로 돌아감.
  const playAvatarVideo = (
    e: React.MouseEvent,
    videoRef: React.RefObject<HTMLVideoElement>,
    setPlaying: (v: boolean) => void
  ) => {
    if (!isZh || !videoRef.current) return
    e.stopPropagation()
    if (!videoRef.current.paused) {
      videoRef.current.pause()
      setPlaying(false)
      return
    }
    videoRef.current.currentTime = 0
    videoRef.current.play()
    setPlaying(true)
  }

  return (
    <section id="concierge" className="section-light">
      <motion.div {...fadeUp}>
        <p className="section-title">{t.conciergeTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* 李静 — 기업위챗 직접 연결 */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="concierge-card"
          onClick={() => window.open(WECHAT_BIZ_URL, '_blank')}
        >
          <div
            className="concierge-avatar concierge-avatar-f"
            onClick={e => playAvatarVideo(e, liVideoRef, setLiPlaying)}
            style={isZh ? { cursor: 'pointer' } : undefined}
          >
            <img
              src="/concierge_image/lijing_800.png"
              alt="李静"
              className="concierge-avatar-img"
              style={{ display: liPlaying ? 'none' : 'block' }}
            />
            {isZh && (
              <video
                ref={liVideoRef}
                src="/concierge_lijing.mp4"
                className="concierge-avatar-img"
                style={{ display: liPlaying ? 'block' : 'none' }}
                playsInline
                onEnded={() => setLiPlaying(false)}
              />
            )}
            {isZh && !liPlaying && <span className="concierge-play-badge">▶</span>}
          </div>
          <div>
            <p className="concierge-name">{t.concierge1Name}</p>
            <p className="concierge-title-text">{t.concierge1Title}</p>
          </div>
          <p className="concierge-specialty">{t.concierge1Specialty}</p>
          <button className="concierge-btn" onClick={e => { e.stopPropagation(); window.open(WECHAT_BIZ_URL, '_blank') }}>
            {t.concierge1Btn}
          </button>
        </motion.div>

        {/* 金贤宇 — 개인위챗 QR 모달 */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="concierge-card"
          onClick={() => window.open(WECHAT_BIZ_URL, '_blank')}
        >
          <div
            className="concierge-avatar concierge-avatar-m"
            onClick={e => playAvatarVideo(e, kimVideoRef, setKimPlaying)}
            style={isZh ? { cursor: 'pointer' } : undefined}
          >
            <img
              src="/concierge_image/kimhyunwoo_800.png"
              alt="金贤宇"
              className="concierge-avatar-img"
              style={{ display: kimPlaying ? 'none' : 'block' }}
            />
            {isZh && (
              <video
                ref={kimVideoRef}
                src="/concierge_jinxianyou.mp4"
                className="concierge-avatar-img"
                style={{ display: kimPlaying ? 'block' : 'none' }}
                playsInline
                onEnded={() => setKimPlaying(false)}
              />
            )}
            {isZh && !kimPlaying && <span className="concierge-play-badge">▶</span>}
          </div>
          <div>
            <p className="concierge-name">{t.concierge2Name}</p>
            <p className="concierge-title-text">{t.concierge2Title}</p>
          </div>
          <p className="concierge-specialty">{t.concierge2Specialty}</p>
          <button className="concierge-btn" onClick={e => { e.stopPropagation(); window.open(WECHAT_BIZ_URL, '_blank') }}>
            {t.concierge2Btn}
          </button>
        </motion.div>
      </div>

      {/* 개인위챗 QR 모달 */}
      <AnimatePresence>
        {showWxModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWxModal(false)}
          >
            <motion.div
              className="modal-sheet"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-handle" />
              <p className="modal-title">{t.concierge2Name} · {lang === 'zh' ? '个人微信' : lang === 'ko' ? '개인위챗' : 'Personal WeChat'}</p>
              {/* QR 이미지 준비되면 → <img src="/wechat-personal-qr.png" style={{width:160,height:160,borderRadius:12}} /> 로 교체 */}
              <WechatIdBox id="e-gana" lang={lang} />
              <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setShowWxModal(false)}>
                {lang === 'zh' ? '关闭' : lang === 'ko' ? '닫기' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   2.5 HOME CONSULTATION CARD ENTRY
   ═══════════════════════════════════════════════════════════════════ */
export function HomeConsultationSection() {
  const { lang } = useApp()
  const [open, setOpen] = useState(false)

  // A real page reload already resets this (useState default), but bfcache-restored
  // pages (browser back/forward) keep the old in-memory state — force it back to
  // the entry card in that case too, so the section always starts fresh.
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setOpen(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return (
    <section id="home-consultation" className="section-light">
      {!open ? (
        <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} style={{ padding: '0 4px' }}>
          <ConsultCardVisual lang={lang} onClick={() => setOpen(true)} />
        </motion.div>
      ) : (
        <ConsultationCard mode="home" onExit={() => setOpen(false)} />
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   3. CONCERN SELECTION
   ═══════════════════════════════════════════════════════════════════ */
export function ConcernSection() {
  const { lang, goToCategory } = useApp()
  const t = translations[lang]

  const concerns: { id: string; icon: JSX.Element; title: string; sub: string; target: CategoryId }[] = [
    { id: 'younger-look',    target: 'skin-beauty',      title: t.concern1, sub: t.concern1Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M12 3C9 5 5 9 5 13a7 7 0 0014 0c0-4-4-8-7-10z"/><path d="M12 13v4"/></svg> },
    { id: 'slow-aging',      target: 'skin-beauty',      title: t.concern2, sub: t.concern2Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { id: 'regen-medicine',  target: 'stem-cell',        title: t.concern3, sub: t.concern3Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { id: 'face-contour',    target: 'skin-beauty',      title: t.concern4, sub: t.concern4Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0112 0v1"/></svg> },
    { id: 'surgery-interest',target: 'plastic-surgery',  title: t.concern5, sub: t.concern5Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
    { id: 'fatigue-look',    target: 'skin-beauty',      title: t.concern6, sub: t.concern6Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { id: 'korea-trip-worry',target: 'medical-tourism',  title: t.concern7, sub: t.concern7Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
    { id: 'health-checkup',  target: 'big-health',       title: t.concern8, sub: t.concern8Sub, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg> },
  ]

  return (
    <section id="concern" className="section-white">
      <motion.div {...fadeUp} className="concern-title-card">
        <span className="concern-title-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5l-2 5-5 2 2-5z" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="concern-title-card-text">{t.concernTitle}</p>
          <div className="section-accent-line" style={{ margin: '8px 0 0' }} />
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {concerns.map((c, i) => (
          <motion.div
            key={c.title}
            {...fadeUp}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="concern-card"
            onClick={() => goToCategory(c.target, c.id)}
          >
            <span className="concern-icon">{c.icon}</span>
            <div>
              <p className="concern-title">{c.title}</p>
              <p className="concern-sub">{c.sub}</p>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 }}>›</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   4. CATEGORY GRID
   ═══════════════════════════════════════════════════════════════════ */
export function CategoryGridSection() {
  const { lang, goToCategory, goToPackage } = useApp()
  const t = translations[lang]

  const getTag = (c: typeof categories[0]) => {
    if (lang === 'ko') return c.tagKo
    if (lang === 'en') return c.tagEn
    if (lang === 'ar') return c.tagAr
    return c.tagZh
  }

  const getName = (c: typeof categories[0]) => {
    if (lang === 'ko') return c.ko
    if (lang === 'en') return c.en
    if (lang === 'ar') return c.ar
    return c.zh
  }

  return (
    <section id="categories" className="section-light2">
      <motion.div {...fadeUp}>
        <p className="section-title">{t.categoryTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            {...fadeUp}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="category-card"
            onClick={() => (cat.id === 'medical-tourism' ? goToPackage() : goToCategory(cat.id))}
          >
            <span className="category-arrow">›</span>
            <p className="category-name">{getName(cat)}</p>
            <p className="category-tag">{getTag(cat)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   6. CONTACT SECTION
   ═══════════════════════════════════════════════════════════════════ */
type ContactModal = 'form' | null

export function ContactSection() {
  const { lang } = useApp()
  const t = translations[lang]
  const [modal, setModal] = useState<ContactModal>(null)
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [formSent, setFormSent] = useState(false)
  const isAr = lang === 'ar'

  /* "在线留言/문의 남기기" 제출 - 서버나 DB가 없으므로 자체 백엔드로 보내지 않고,
     이미 푸터에 공개된 실제 이메일로 제목/본문을 채운 mailto: 링크를 열어
     방문자의 메일 앱에서 직접 "보내기"를 누르게 함. (서버 저장 없음) */
  const handleFormSend = () => {
    if (!formName.trim() || !formMsg.trim()) return
    const to = isAr ? EMAIL_AR : EMAIL_GENERAL
    const subject = lang === 'zh' ? '韩国医疗咨询 - 在线留言'
      : lang === 'ko' ? '한국 의료 상담 - 문의 남기기'
      : lang === 'ar' ? 'استشارة طبية كورية - رسالة'
      : 'Korea Medical Consultation - Message'
    const body = `${formName}\n\n${formMsg}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormSent(true)
  }

  return (
    <section id="contact" className="section-white" style={{ paddingBottom: 16 }}>
      <motion.div {...fadeUp}>
        <p className="section-title">{t.contactTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isAr ? (
          /* ── Arabic: WhatsApp + Halal Map button ── */
          <>
            <motion.button {...fadeUp} transition={{ delay: 0.05 }} className="contact-btn contact-btn-whatsapp" onClick={() => window.open(WHATSAPP_URL, '_blank')}>
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 12 19.79 19.79 0 011.12 3.4 2 2 0 013.11 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6z"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700 }}>واتساب</p>
                <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Dr. Alaa Eldin Elastel</p>
              </div>
            </motion.button>
            <motion.div {...fadeUp} transition={{ delay: 0.12 }}>
              <HalalMapButton
                dir="rtl"
                onClick={() => document.getElementById('halal-map-section')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </motion.div>
          </>
        ) : (
          /* ── Non-Arabic: WeChat buttons ── */
          <>
            <motion.button {...fadeUp} transition={{ delay: 0.05 }} className="contact-btn contact-btn-wechat-biz" onClick={() => window.open(WECHAT_BIZ_URL, '_blank')}>
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="11" r="1" fill="white"/><circle cx="13" cy="11" r="1" fill="white"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatBiz}</p>
                <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{lang === 'zh' ? '企业账号咨询' : lang === 'ko' ? '기업 계정 상담' : 'Enterprise account'}</p>
              </div>
            </motion.button>

            <motion.button {...fadeUp} transition={{ delay: 0.15 }} className="contact-btn contact-btn-whatsapp" onClick={() => window.open(WHATSAPP_URL, '_blank')}>
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 12 19.79 19.79 0 011.12 3.4 2 2 0 013.11 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6z"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWhatsapp}</p>
                <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{lang === 'zh' ? '国际用户推荐' : lang === 'ko' ? '국제 사용자 추천' : 'Recommended for international users'}</p>
              </div>
            </motion.button>
          </>
        )}

        <motion.button {...fadeUp} transition={{ delay: 0.2 }} className="contact-btn contact-btn-form" onClick={() => setModal('form')}>
          <div className="contact-icon" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactForm}</p>
            <p style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{lang === 'zh' ? '留下联系方式，顾问会主动联系您' : lang === 'ko' ? '연락처를 남기면 먼저 연락드립니다' : 'Leave your info and we\'ll reach out'}</p>
          </div>
        </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setModal(null); setFormSent(false) }}
          >
            <motion.div
              className="modal-sheet"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-handle" />

              {/* Form modal */}
              {modal === 'form' && (
                <>
                  <p className="modal-title">{t.contactFormTitle}</p>
                  {!formSent ? (
                    <>
                      <input
                        className="form-input"
                        placeholder={t.contactFormName}
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                      />
                      <textarea
                        className="form-input form-textarea"
                        placeholder={t.contactFormMsg}
                        value={formMsg}
                        onChange={e => setFormMsg(e.target.value)}
                      />
                      <button
                        className="btn-card-submit"
                        onClick={handleFormSend}
                        disabled={!formName.trim() || !formMsg.trim()}
                        style={{
                          opacity: formName.trim() && formMsg.trim() ? 1 : 0.4,
                          cursor: formName.trim() && formMsg.trim() ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {t.contactFormSend}
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <span style={{ fontSize: 48 }}>📧</span>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 12 }}>
                        {lang === 'zh' ? '邮件应用已打开' : lang === 'ko' ? '메일 앱이 열렸습니다' : lang === 'ar' ? 'تم فتح تطبيق البريد' : 'Your email app has opened'}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.7 }}>
                        {lang === 'zh' ? '请在邮件应用中点击"发送"以完成提交。我们会尽快与您联系。' :
                         lang === 'ko' ? '메일 앱에서 "보내기"를 눌러야 실제로 전송됩니다. 받는 즉시 빠르게 연락 드리겠습니다.' :
                         lang === 'ar' ? 'يرجى الضغط على "إرسال" في تطبيق البريد لإكمال الإرسال. سنتواصل معك في أقرب وقت.' :
                         'Tap "Send" in your email app to complete it. We will contact you shortly after receiving it.'}
                      </p>
                      <button
                        className="btn-primary"
                        style={{ marginTop: 20, width: '100%' }}
                        onClick={() => { setModal(null); setFormSent(false); setFormName(''); setFormMsg('') }}
                      >
                        {t.contactClose}
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   7. MEDICAL NETWORK
   ═══════════════════════════════════════════════════════════════════ */
export function MedicalNetworkSection() {
  const { lang, goToPackage } = useApp()
  const t = translations[lang]

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'badge-pulse-style'
    style.textContent = `
      @keyframes badge-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(0, 119, 182, 0.9); background: rgba(0,119,182,0.18); border-color: rgba(0,119,182,0.7); }
        60%  { box-shadow: 0 0 0 10px rgba(0, 119, 182, 0); background: rgba(0,119,182,0.05); border-color: rgba(0,119,182,0.22); }
        100% { box-shadow: 0 0 0 0  rgba(0, 119, 182, 0); background: rgba(0,119,182,0.07); border-color: rgba(0,119,182,0.22); }
      }
      .badge-pulse { animation: badge-pulse 2s ease-out infinite; }
    `
    if (!document.getElementById('badge-pulse-style')) {
      document.head.appendChild(style)
    }
    return () => {
      const existing = document.getElementById('badge-pulse-style')
      if (existing) existing.remove()
    }
  }, [])

  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: t.networkCard1Title,
      desc: t.networkCard1Desc,
      badge: t.networkCard1Reg,
      badgeType: 'reg' as const,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      title: t.networkCard2Title,
      desc: t.networkCard2Desc,
      badge: t.networkCard2Reg,
      badgeType: 'reg' as const,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      title: t.networkCard3Title,
      desc: t.networkCard3Desc,
      badge: null,
      badgeType: 'link' as const,
      onClick: goToPackage,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="5" cy="19" r="2"/>
          <circle cx="19" cy="19" r="2"/>
          <path d="M12 7v4M8.5 17.5l3.5-2.5 3.5 2.5"/>
        </svg>
      ),
      title: t.networkCard4Title,
      desc: t.networkCard4Desc,
      badge: null,
      badgeType: 'none' as const,
    },
  ]

  return (
    <section id="network" className="section-white" style={{ paddingTop: 24 }}>
      <motion.div {...fadeUp} style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: 'var(--blue-light)', letterSpacing: '0.18em', marginBottom: 6 }}>
          {t.networkTitle}
        </p>
        <p className="section-title" style={{ textAlign: 'left' }}>{t.networkSub}</p>
        <div style={{ width: 32, height: 2, background: 'var(--brand)', borderRadius: 1, margin: '10px 0 14px' }} />
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {t.networkDesc}
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            {...fadeUp}
            transition={{ delay: i * 0.07 }}
            onClick={'onClick' in card ? card.onClick : undefined}
            style={{
              background: 'white',
              border: '1px solid rgba(0,119,182,0.14)',
              borderTop: '2px solid var(--brand)',
              borderRadius: 12,
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              cursor: 'onClick' in card ? 'pointer' : 'default',
            }}
          >
            <div style={{ flexShrink: 0 }}>{card.icon}</div>
            <p style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--brand-dark, #003d6b)',
              lineHeight: 1.4,
            }}>
              {card.title}
            </p>
            <p style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              flex: 1,
            }}>
              {card.desc}
            </p>
            {card.badge && card.badgeType === 'reg' && (
              <span style={{
                fontSize: 9,
                color: '#0077b6',
                background: 'rgba(0,119,182,0.06)',
                border: '1px solid rgba(0,119,182,0.18)',
                borderRadius: 6,
                padding: '3px 7px',
                letterSpacing: '0.03em',
                lineHeight: 1.4,
                display: 'inline-block',
                wordBreak: 'break-all' as const,
              }}>
                {card.badge}
              </span>
            )}
            {card.badgeType === 'link' && (
              <span className="badge-pulse" style={{
                fontSize: 10,
                color: 'var(--brand)',
                background: 'rgba(0,119,182,0.07)',
                border: '1px solid rgba(0,119,182,0.22)',
                borderRadius: 6,
                padding: '3px 9px',
                letterSpacing: '0.04em',
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}>
                {lang === 'ko' ? '자세히 보기 ›' : lang === 'en' ? 'View Details ›' : lang === 'ar' ? 'عرض التفاصيل ›' : '查看详情 ›'}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   8. ABOUT
   ═══════════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const { lang } = useApp()
  const t = translations[lang]

  return (
    <section id="about" className="section-light2">
      <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
        <p className="section-title">{t.aboutTitle}</p>
        <div className="section-accent-line" />
        <p className="about-desc">{t.aboutDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <TtsButton text={`${t.aboutTitle}\n\n${t.aboutDesc}`} lang={lang} />
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   9. FOOTER / DISCLAIMER
   ═══════════════════════════════════════════════════════════════════ */
export function FooterSection() {
  const { lang } = useApp()
  const t = translations[lang]
  const [showMiniProgram, setShowMiniProgram] = useState(false)

  return (
    <section className="section-dark" style={{ paddingBottom: 52 }}>
      <div className="divider-light" style={{ marginBottom: 32 }} />

      {/* Brand mark */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#e8c76a', letterSpacing: '0.06em', marginBottom: 4 }}>
          {t.brandName}
        </p>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          kmedispring.com
        </p>
      </div>

      {/* Disclaimer */}
      <motion.div
        {...fadeUp}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '18px 16px',
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 10, color: 'rgba(196,154,60,0.7)', marginBottom: 8, letterSpacing: '0.08em' }}>
          {lang === 'zh' ? '⚠ 温馨提示' : lang === 'ko' ? '⚠ 안내' : lang === 'ar' ? '⚠ تنبيه' : '⚠ Notice'}
        </p>
        <p className="disclaimer-text">{t.disclaimer}</p>
      </motion.div>

      {/* Email */}
      <p className="contact-email">{t.contactEmail}</p>

      {/* SNS icons — 小红书(RedNote) / YouTube / WhatsApp / TikTok / 微信小程序 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 20 }}>
        <a
          href="https://www.rednote.com/user/profile/5c62c866000000001201b355"
          target="_blank"
          rel="noopener noreferrer"
          title="小红书"
          style={{
            width: 34, height: 34, borderRadius: 9, background: '#FE2C55',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 9, fontWeight: 800, letterSpacing: '-0.02em',
            textDecoration: 'none', lineHeight: 1,
          }}
        >
          小红书
        </a>
        <a
          href="https://www.youtube.com/@k-medispring"
          target="_blank"
          rel="noopener noreferrer"
          title="YouTube"
          style={{
            width: 34, height: 34, borderRadius: '50%', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white',
          }}
        >
          <img src="/icons/youtube.jpg" alt="YouTube" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp · Dr. Alaa Eldin Elastel"
          style={{
            width: 34, height: 34, borderRadius: '50%', background: '#25D366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 12 19.79 19.79 0 011.12 3.4 2 2 0 013.11 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6z" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@gngwg7"
          target="_blank"
          rel="noopener noreferrer"
          title="TikTok"
          style={{
            width: 34, height: 34, borderRadius: '50%', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white',
          }}
        >
          <img src="/icons/tiktok.png" alt="TikTok" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </a>
        <button
          type="button"
          onClick={() => setShowMiniProgram(true)}
          title={lang === 'zh' ? '微信小程序' : lang === 'ko' ? '위챗 샤오청쉬' : 'WeChat Mini Program'}
          style={{
            width: 34, height: 34, borderRadius: '50%', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white', border: 'none', padding: 0, cursor: 'pointer',
          }}
        >
          <img src="/icons/xiaochengxu.jpg" alt={lang === 'zh' ? '微信小程序' : 'WeChat Mini Program'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>

      <AnimatePresence>
        {showMiniProgram && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMiniProgram(false)}
          >
            <motion.div
              className="modal-sheet"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-handle" />
              <p className="modal-title">
                {lang === 'zh' ? '汉江春天 · 微信小程序' : lang === 'ko' ? '한강애봄 · 위챗 샤오청쉬' : lang === 'ar' ? 'هانغانغ آيبوم · برنامج ويتشات المصغر' : 'K-MediSpring · WeChat Mini Program'}
              </p>
              <img
                src="/icons/xiaochengxu.jpg"
                alt="WeChat Mini Program QR"
                style={{ width: 220, height: 220, borderRadius: 16, display: 'block', margin: '0 auto 16px', border: '1px solid var(--border-blue)' }}
              />
              <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.7 }}>
                {lang === 'zh' ? '长按或扫描上方二维码，在微信中打开「汉江春天」小程序。' :
                 lang === 'ko' ? '위 QR 코드를 길게 누르거나 스캔하면 위챗에서 「汉江春天」샤오청쉬가 열립니다.' :
                 lang === 'ar' ? 'اضغط مطولاً أو امسح رمز QR أعلاه لفتح برنامج "汉江春天" المصغر في WeChat.' :
                 'Press and hold or scan the QR code above to open the "汉江春天" mini program in WeChat.'}
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => setShowMiniProgram(false)}
              >
                {t.contactClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copyright */}
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 28 }}>
        © 2025 {lang === 'en' ? 'K-MediSpring' : lang === 'ar' ? 'كيمديسبرينج' : lang === 'ko' ? '한강애봄' : '汉江春天'} · kmedispring.com
      </p>

      {/* Internal-only admin link, intentionally inconspicuous */}
      <p style={{ textAlign: 'center', marginTop: 10 }}>
        <a
          href="/admin/prep"
          style={{ fontSize: 8, color: 'rgba(255,255,255,0.12)', textDecoration: 'none' }}
        >
          관리자페이지
        </a>
      </p>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT HOME PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ConciergeSection />
      <HomeConsultationSection />
      <ConcernSection />
      <CategoryGridSection />
      <ContactSection />
      <MedicalNetworkSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}
