import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { categories, type CategoryId } from '../data/categories'
import type { ConsultCard } from '../contexts/AppContext'

/* ─────────────────────────────── helpers ─────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const { lang } = useApp()
  const t = translations[lang]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      {/* 영상 배경 — autoplay muted loop (모바일 포함) */}
      <video
        className="hero-video"
        src="/studio.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/studio-hero.png"
      />

      {/* 콘텐츠는 하단 오버레이 위에 배치 */}
      <div className="hero-content">
        {/* ONLINE 상태 */}
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="hero-status-dot" />
          <span className="hero-status-text">ONLINE · 24H</span>
        </motion.div>

        {/* 로고 링 */}
        <motion.div
          className="hero-logo-ring"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
        >
          <svg width="42" height="42" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
            <path d="M6 26 Q22 14 38 26" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M14 26 L14 20" stroke="rgba(180,220,255,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M30 26 L30 20" stroke="rgba(180,220,255,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M6 30 Q22 36 38 30" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
            <path d="M6 33 Q22 38 38 33" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* 브랜드 */}
        <motion.h1
          className="hero-brand"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {t.brandName}
        </motion.h1>

        <motion.p
          className="hero-tagline-en"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t.brandSub}
        </motion.p>

        <motion.p
          className="hero-tagline-zh"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          {t.heroTagline}
        </motion.p>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          {t.heroDesc}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          style={{ width: '100%', maxWidth: 300 }}
        >
          <button className="btn-primary" onClick={() => scrollTo('categories')}>
            {t.heroCta1}
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('concierge')}>
            {t.heroCta2}
          </button>
        </motion.div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, animation: 'bounceDown 2s ease-in-out infinite' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
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

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="concierge" className="section-light">
      <motion.div {...fadeUp}>
        <p className="section-title">{t.conciergeTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Female concierge */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="concierge-card"
          onClick={scrollToContact}
        >
          <div className="concierge-avatar concierge-avatar-f">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c05080" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <div>
            <p className="concierge-name">{t.concierge1Name}</p>
            <p className="concierge-title-text">{t.concierge1Title}</p>
          </div>
          <p className="concierge-specialty">{t.concierge1Specialty}</p>
          <button className="concierge-btn" onClick={e => { e.stopPropagation(); scrollToContact() }}>
            {t.concierge1Btn}
          </button>
        </motion.div>

        {/* Male concierge */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="concierge-card"
          onClick={scrollToContact}
        >
          <div className="concierge-avatar concierge-avatar-m">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2a6ab0" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <div>
            <p className="concierge-name">{t.concierge2Name}</p>
            <p className="concierge-title-text">{t.concierge2Title}</p>
          </div>
          <p className="concierge-specialty">{t.concierge2Specialty}</p>
          <button className="concierge-btn" onClick={e => { e.stopPropagation(); scrollToContact() }}>
            {t.concierge2Btn}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   3. CONCERN SELECTION
   ═══════════════════════════════════════════════════════════════════ */
function ConcernSection() {
  const { lang, goToCategory } = useApp()
  const t = translations[lang]

  const concerns: { icon: JSX.Element; title: string; sub: string; target: CategoryId }[] = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M12 3C9 5 5 9 5 13a7 7 0 0014 0c0-4-4-8-7-10z"/><path d="M12 13v4"/></svg>, title: t.concern1, sub: t.concern1Sub, target: 'skin-beauty' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0112 0v1"/></svg>, title: t.concern2, sub: t.concern2Sub, target: 'plastic-surgery' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title: t.concern3, sub: t.concern3Sub, target: 'big-health' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M12 13v8M9 18h6"/></svg>, title: t.concern4, sub: t.concern4Sub, target: 'womens-care' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M18 8h2a2 2 0 010 4h-2"/><path d="M4 8h14v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/><path d="M8 8V5a2 2 0 014 0v3"/></svg>, title: t.concern5, sub: t.concern5Sub, target: 'mens-health' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0112 18.34a19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 5.18 2 2 0 014.11 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6z"/></svg>, title: t.concern6, sub: t.concern6Sub, target: 'medical-tourism' },
  ]

  return (
    <section id="concern" className="section-white">
      <motion.div {...fadeUp}>
        <p className="section-title">{t.concernTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {concerns.map((c, i) => (
          <motion.div
            key={c.title}
            {...fadeUp}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="concern-card"
            onClick={() => goToCategory(c.target)}
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
function CategoryGridSection() {
  const { lang, goToCategory } = useApp()
  const t = translations[lang]

  const getTag = (c: typeof categories[0]) => {
    if (lang === 'ko') return c.tagKo
    if (lang === 'en') return c.tagEn
    return c.tagZh
  }

  const getName = (c: typeof categories[0]) => {
    if (lang === 'ko') return c.ko
    if (lang === 'en') return c.en
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
            onClick={() => goToCategory(cat.id)}
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
   5. CONSULTATION CARD
   ═══════════════════════════════════════════════════════════════════ */
const CARD_Q1_ZH = ['皮肤', '整形', '抗衰', '健康', '女性', '男性', '医疗旅行']
const CARD_Q1_KO = ['피부', '성형', '항노화', '건강', '여성', '남성', '의료관광']
const CARD_Q1_EN = ['Skin', 'Surgery', 'Anti-Aging', 'Health', "Women's", "Men's", 'Medical Tourism']

const CARD_Q2_ZH = ['1个月内', '3个月内', '半年内', '还没确定']
const CARD_Q2_KO = ['1개월 내', '3개월 내', '6개월 내', '미정']
const CARD_Q2_EN = ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Not sure yet']

const CARD_Q3_ZH = ['1-3天', '4-7天', '7天以上', '不确定']
const CARD_Q3_KO = ['1-3일', '4-7일', '7일 이상', '미정']
const CARD_Q3_EN = ['1-3 days', '4-7 days', '7+ days', 'Not sure']

const CARD_Q4_ZH = ['价格', '安全', '恢复期', '医生经验', '语言沟通', '行程安排']
const CARD_Q4_KO = ['가격', '안전', '회복기간', '의사 경험', '언어소통', '일정 조율']
const CARD_Q4_EN = ['Price', 'Safety', 'Recovery', 'Doctor experience', 'Language', 'Scheduling']

const CARD_Q5_ZH = ['企业微信', '个人微信', 'WhatsApp', '留言']
const CARD_Q5_KO = ['기업 위챗', '개인 위챗', 'WhatsApp', '문의 남기기']
const CARD_Q5_EN = ['Enterprise WeChat', 'Personal WeChat', 'WhatsApp', 'Leave a message']

function ConsultationCardSection() {
  const { lang, setConsultCard } = useApp()
  const t = translations[lang]

  const q1opts = lang === 'ko' ? CARD_Q1_KO : lang === 'en' ? CARD_Q1_EN : CARD_Q1_ZH
  const q2opts = lang === 'ko' ? CARD_Q2_KO : lang === 'en' ? CARD_Q2_EN : CARD_Q2_ZH
  const q3opts = lang === 'ko' ? CARD_Q3_KO : lang === 'en' ? CARD_Q3_EN : CARD_Q3_ZH
  const q4opts = lang === 'ko' ? CARD_Q4_KO : lang === 'en' ? CARD_Q4_EN : CARD_Q4_ZH
  const q5opts = lang === 'ko' ? CARD_Q5_KO : lang === 'en' ? CARD_Q5_EN : CARD_Q5_ZH

  const [interests, setInterests] = useState<string[]>([])
  const [timing, setTiming] = useState('')
  const [duration, setDuration] = useState('')
  const [worries, setWorries] = useState<string[]>([])
  const [contactMethod, setContactMethod] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleMulti = (arr: string[], val: string, setter: (a: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const handleSubmit = () => {
    const card: ConsultCard = { interests, timing, duration, worries, contactMethod }
    setConsultCard(card)
    setSubmitted(true)
  }

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const canSubmit = interests.length > 0 && timing && duration && contactMethod

  return (
    <section id="card" className="section-dark2">
      <motion.div {...fadeUp}>
        <p className="section-title-light">{t.cardTitle}</p>
        <div className="section-accent-line-light" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card-form"
          >
            {/* Q1 */}
            <p className="card-question">{t.cardQ1}</p>
            <div className="card-options">
              {q1opts.map(opt => (
                <button
                  key={opt}
                  className={`card-chip ${interests.includes(opt) ? 'selected' : ''}`}
                  onClick={() => toggleMulti(interests, opt, setInterests)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Q2 */}
            <p className="card-question">{t.cardQ2}</p>
            <div className="card-options">
              {q2opts.map(opt => (
                <button
                  key={opt}
                  className={`card-chip ${timing === opt ? 'selected' : ''}`}
                  onClick={() => setTiming(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Q3 */}
            <p className="card-question">{t.cardQ3}</p>
            <div className="card-options">
              {q3opts.map(opt => (
                <button
                  key={opt}
                  className={`card-chip ${duration === opt ? 'selected' : ''}`}
                  onClick={() => setDuration(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Q4 */}
            <p className="card-question">{t.cardQ4}</p>
            <div className="card-options">
              {q4opts.map(opt => (
                <button
                  key={opt}
                  className={`card-chip ${worries.includes(opt) ? 'selected' : ''}`}
                  onClick={() => toggleMulti(worries, opt, setWorries)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Q5 */}
            <p className="card-question">{t.cardQ5}</p>
            <div className="card-options">
              {q5opts.map(opt => (
                <button
                  key={opt}
                  className={`card-chip ${contactMethod === opt ? 'selected' : ''}`}
                  onClick={() => setContactMethod(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              className="btn-card-submit"
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{ opacity: canSubmit ? 1 : 0.4, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
            >
              {t.cardSubmit}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Generated card */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 40 }}>✅</span>
              <p style={{ color: '#e8c76a', fontWeight: 700, fontSize: 16, marginTop: 8 }}>{t.cardGenerated}</p>
            </div>

            <div className="card-result">
              {interests.length > 0 && (
                <div className="card-result-row">
                  <span className="card-result-label">{t.cardQ1}</span>
                  <span className="card-result-value">{interests.join('  ·  ')}</span>
                </div>
              )}
              {timing && (
                <div className="card-result-row">
                  <span className="card-result-label">{t.cardQ2}</span>
                  <span className="card-result-value">{timing}</span>
                </div>
              )}
              {duration && (
                <div className="card-result-row">
                  <span className="card-result-label">{t.cardQ3}</span>
                  <span className="card-result-value">{duration}</span>
                </div>
              )}
              {worries.length > 0 && (
                <div className="card-result-row">
                  <span className="card-result-label">{t.cardQ4}</span>
                  <span className="card-result-value">{worries.join('  ·  ')}</span>
                </div>
              )}
              {contactMethod && (
                <div className="card-result-row">
                  <span className="card-result-label">{t.cardQ5}</span>
                  <span className="card-result-value">{contactMethod}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn-card-submit" onClick={scrollToContact}>
                {t.cardContactBtn}
              </button>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12, padding: '12px', color: 'rgba(255,255,255,0.6)',
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {lang === 'zh' ? '重新填写' : lang === 'ko' ? '다시 작성' : 'Edit Card'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   6. CONTACT SECTION
   ═══════════════════════════════════════════════════════════════════ */
type ContactModal = 'wechat-biz' | 'wechat-personal' | 'whatsapp' | 'form' | null

function ContactSection() {
  const { lang } = useApp()
  const t = translations[lang]
  const [modal, setModal] = useState<ContactModal>(null)
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [formSent, setFormSent] = useState(false)

  const handleFormSend = () => {
    if (formName.trim() && formMsg.trim()) setFormSent(true)
  }

  return (
    <section id="contact" className="section-white">
      <motion.div {...fadeUp}>
        <p className="section-title">{t.contactTitle}</p>
        <div className="section-accent-line" />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button {...fadeUp} transition={{ delay: 0.05 }} className="contact-btn contact-btn-wechat-biz" onClick={() => window.open('https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0', '_blank')}>
          <div className="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="11" r="1" fill="white"/><circle cx="13" cy="11" r="1" fill="white"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatBiz}</p>
            <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{lang === 'zh' ? '企业账号咨询' : lang === 'ko' ? '기업 계정 상담' : 'Enterprise account'}</p>
          </div>
        </motion.button>

        <motion.button {...fadeUp} transition={{ delay: 0.1 }} className="contact-btn contact-btn-wechat-personal" onClick={() => setModal('wechat-personal')}>
          <div className="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatPersonal}</p>
            <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{lang === 'zh' ? '顾问直接沟通' : lang === 'ko' ? '컨시어지 직접 소통' : 'Direct concierge chat'}</p>
          </div>
        </motion.button>

        <motion.button {...fadeUp} transition={{ delay: 0.15 }} className="contact-btn contact-btn-whatsapp" onClick={() => setModal('whatsapp')}>
          <div className="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 12 19.79 19.79 0 011.12 3.4 2 2 0 013.11 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6z"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWhatsapp}</p>
            <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{lang === 'zh' ? '国际用户推荐' : lang === 'ko' ? '국제 사용자 추천' : 'Recommended for international users'}</p>
          </div>
        </motion.button>

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

      <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 20, letterSpacing: '0.04em' }}>{t.contactEmail}</p>

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

              {/* QR modals */}
              {(modal === 'wechat-biz' || modal === 'wechat-personal' || modal === 'whatsapp') && (
                <>
                  <p className="modal-title">
                    {modal === 'wechat-biz' ? t.contactWechatBiz :
                     modal === 'wechat-personal' ? t.contactWechatPersonal :
                     t.contactWhatsapp}
                  </p>

                  <div className="qr-placeholder">
                    <span style={{ fontSize: 36 }}>
                      {modal === 'whatsapp' ? '📱' : '💬'}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5, padding: '0 8px' }}>
                      {t.contactQRHint}
                    </span>
                  </div>

                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.7 }}>
                    {lang === 'zh' ? '扫描上方二维码，添加咨询。\n我们会在工作时间内尽快回复您。' :
                     lang === 'ko' ? '위의 QR 코드를 스캔하여 상담을 추가하세요.\n업무 시간 내에 최대한 빠르게 답변 드리겠습니다.' :
                     'Scan the QR code above to start consultation.\nWe will respond within business hours.'}
                  </p>

                  <button
                    className="btn-primary"
                    style={{ marginTop: 20 }}
                    onClick={() => setModal(null)}
                  >
                    {t.contactClose}
                  </button>
                </>
              )}

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
                      <span style={{ fontSize: 48 }}>✅</span>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 12 }}>
                        {lang === 'zh' ? '留言已提交' : lang === 'ko' ? '문의가 접수되었습니다' : 'Message submitted'}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.7 }}>
                        {lang === 'zh' ? '我们会尽快与您联系。感谢您的咨询。' :
                         lang === 'ko' ? '빠른 시일 내에 연락 드리겠습니다. 감사합니다.' :
                         'We will contact you shortly. Thank you.'}
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
function MedicalNetworkSection() {
  const { lang } = useApp()
  const t = translations[lang]

  const tierIcons = [
    <svg key="t1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5"><rect x="2" y="11" width="20" height="11" rx="2"/><path d="M6 11V7a6 6 0 0112 0v4"/><line x1="12" y1="11" x2="12" y2="16"/></svg>,
    <svg key="t2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
    <svg key="t3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    <svg key="t4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  ]
  const tiers = [
    { label: t.networkTier1 },
    { label: t.networkTier2 },
    { label: t.networkTier3 },
    { label: t.networkTier4 },
  ]

  return (
    <section id="network" className="section-white">
      <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: 'var(--blue-light)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
          {t.networkTitle}
        </p>
        <p className="section-title">{t.networkSub}</p>
        <div className="section-accent-line" />
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>
          {t.networkDesc}
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.label}
            {...fadeUp}
            transition={{ delay: i * 0.08 }}
            className="network-logo-slot"
          >
            {tierIcons[i]}
            <span className="network-logo-label">{tier.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp}
        style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 20, lineHeight: 1.8 }}
      >
        {t.networkDisclaimer}
      </motion.p>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   8. ABOUT
   ═══════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const { lang } = useApp()
  const t = translations[lang]

  return (
    <section id="about" className="section-light2">
      <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
        <p className="section-title">{t.aboutTitle}</p>
        <div className="section-accent-line" />
        <p className="about-desc">{t.aboutDesc}</p>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   9. FOOTER / DISCLAIMER
   ═══════════════════════════════════════════════════════════════════ */
function FooterSection() {
  const { lang } = useApp()
  const t = translations[lang]

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
          {lang === 'zh' ? '⚠ 温馨提示' : lang === 'ko' ? '⚠ 안내' : '⚠ Notice'}
        </p>
        <p className="disclaimer-text">{t.disclaimer}</p>
      </motion.div>

      {/* Email */}
      <p className="contact-email">{t.contactEmail}</p>

      {/* Copyright */}
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 28 }}>
        © 2025 Hangangaebom · kmedispring.com
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
      <ConcernSection />
      <CategoryGridSection />
      <ConsultationCardSection />
      <ContactSection />
      <MedicalNetworkSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}
