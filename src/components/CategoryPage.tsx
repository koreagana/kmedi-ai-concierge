import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { getCategoryById } from '../data/categories'
import type { ConsultCard } from '../contexts/AppContext'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

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

type ContactModal = 'wechat-biz' | 'wechat-personal' | 'whatsapp' | 'form' | null

export default function CategoryPage() {
  const { lang, categoryId, goHome, setConsultCard } = useApp()
  const t = translations[lang]
  const cat = getCategoryById(categoryId ?? '')

  const [scriptExpanded, setScriptExpanded] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [cardSubmitted, setCardSubmitted] = useState(false)
  const [modal, setModal] = useState<ContactModal>(null)

  // Card form state
  const [interests, setInterests] = useState<string[]>([])
  const [timing, setTiming] = useState('')
  const [duration, setDuration] = useState('')
  const [worries, setWorries] = useState<string[]>([])
  const [contactMethod, setContactMethod] = useState('')

  // Form state
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [formSent, setFormSent] = useState(false)

  const q1opts = lang === 'ko' ? CARD_Q1_KO : lang === 'en' ? CARD_Q1_EN : CARD_Q1_ZH
  const q2opts = lang === 'ko' ? CARD_Q2_KO : lang === 'en' ? CARD_Q2_EN : CARD_Q2_ZH
  const q3opts = lang === 'ko' ? CARD_Q3_KO : lang === 'en' ? CARD_Q3_EN : CARD_Q3_ZH
  const q4opts = lang === 'ko' ? CARD_Q4_KO : lang === 'en' ? CARD_Q4_EN : CARD_Q4_ZH
  const q5opts = lang === 'ko' ? CARD_Q5_KO : lang === 'en' ? CARD_Q5_EN : CARD_Q5_ZH

  const toggleMulti = (arr: string[], val: string, setter: (a: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const handleCardSubmit = () => {
    const card: ConsultCard = { interests, timing, duration, worries, contactMethod }
    setConsultCard(card)
    setCardSubmitted(true)
  }

  const canSubmit = interests.length > 0 && timing && duration && contactMethod

  if (!cat) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <button className="cat-back-btn" onClick={goHome} style={{ color: 'var(--text-muted)', margin: '0 auto 20px' }}>
          ← {t.backHome}
        </button>
      </div>
    )
  }

  const catName = lang === 'ko' ? cat.ko : lang === 'en' ? cat.en : cat.zh
  const catTag  = lang === 'ko' ? cat.tagKo : lang === 'en' ? cat.tagEn : cat.tagZh

  return (
    <div>
      {/* ── Hero ── */}
      <div className="cat-hero">
        <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
          ← {t.backHome}
        </motion.button>

        <motion.span className="cat-hero-emoji" {...fadeUp} transition={{ delay: 0.05 }}>
          {cat.emoji}
        </motion.span>
        <motion.h1 className="cat-hero-name" {...fadeUp} transition={{ delay: 0.1 }}>
          {catName}
        </motion.h1>
        <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.15 }}>
          {catTag}
        </motion.p>
      </div>

      {/* ── Summary card ── */}
      <div className="section-white" style={{ paddingTop: 28, paddingBottom: 28 }}>
        <motion.p
          style={{ fontSize: 11, color: 'var(--blue-light)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}
          {...fadeUp}
        >
          {lang === 'zh' ? '顾问简介' : lang === 'ko' ? '컨시어지 소개' : 'Summary'}
        </motion.p>
        <motion.div className="cat-summary-card" {...fadeUp} transition={{ delay: 0.1 }}>
          {cat.scriptSummary}
        </motion.div>
      </div>

      {/* ── AI Script full ── */}
      <div className="section-light" style={{ paddingTop: 28, paddingBottom: 28 }}>
        <motion.p
          style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}
          {...fadeUp}
        >
          {t.aiScript}
        </motion.p>

        <motion.div {...fadeUp} transition={{ delay: 0.08 }}>
          <div
            className="script-full-box"
            style={{ maxHeight: scriptExpanded ? 'none' : 160, overflow: scriptExpanded ? 'visible' : 'hidden', position: 'relative' }}
          >
            {cat.scriptFull}
            {!scriptExpanded && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 48,
                background: 'linear-gradient(transparent, var(--surface))',
                pointerEvents: 'none',
              }} />
            )}
          </div>
          <button className="expand-btn" onClick={() => setScriptExpanded(e => !e)}>
            {scriptExpanded ? t.aiScriptCollapse : t.aiScriptExpand}
          </button>
        </motion.div>
      </div>

      {/* ── Consultation card ── */}
      <div className="section-dark2" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <AnimatePresence mode="wait">
          {!showCardForm ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center' }}
            >
              <span style={{ fontSize: 44, display: 'block', marginBottom: 16 }}>📋</span>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 8 }}>{t.makeCard}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 24 }}>
                {lang === 'zh' ? '整理您的需求，方便顾问为您精准匹配' :
                 lang === 'ko' ? '니즈를 정리하여 컨시어지가 정확하게 매칭할 수 있도록 도와드립니다' :
                 'Organize your needs so our concierge can match you precisely'}
              </p>
              <button className="btn-primary" onClick={() => setShowCardForm(true)} style={{ width: '100%' }}>
                {lang === 'zh' ? '开始填写' : lang === 'ko' ? '작성 시작' : 'Start'}
              </button>
            </motion.div>
          ) : !cardSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-form"
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 20 }}>{t.makeCard}</p>

              <p className="card-question">{t.cardQ1}</p>
              <div className="card-options">
                {q1opts.map(opt => (
                  <button
                    key={opt}
                    className={`card-chip ${interests.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleMulti(interests, opt, setInterests)}
                  >{opt}</button>
                ))}
              </div>

              <p className="card-question">{t.cardQ2}</p>
              <div className="card-options">
                {q2opts.map(opt => (
                  <button
                    key={opt}
                    className={`card-chip ${timing === opt ? 'selected' : ''}`}
                    onClick={() => setTiming(opt)}
                  >{opt}</button>
                ))}
              </div>

              <p className="card-question">{t.cardQ3}</p>
              <div className="card-options">
                {q3opts.map(opt => (
                  <button
                    key={opt}
                    className={`card-chip ${duration === opt ? 'selected' : ''}`}
                    onClick={() => setDuration(opt)}
                  >{opt}</button>
                ))}
              </div>

              <p className="card-question">{t.cardQ4}</p>
              <div className="card-options">
                {q4opts.map(opt => (
                  <button
                    key={opt}
                    className={`card-chip ${worries.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleMulti(worries, opt, setWorries)}
                  >{opt}</button>
                ))}
              </div>

              <p className="card-question">{t.cardQ5}</p>
              <div className="card-options">
                {q5opts.map(opt => (
                  <button
                    key={opt}
                    className={`card-chip ${contactMethod === opt ? 'selected' : ''}`}
                    onClick={() => setContactMethod(opt)}
                  >{opt}</button>
                ))}
              </div>

              <button
                className="btn-card-submit"
                onClick={handleCardSubmit}
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
            >
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 40 }}>✅</span>
                <p style={{ color: '#e8c76a', fontWeight: 700, fontSize: 16, marginTop: 8 }}>{t.cardGenerated}</p>
              </div>

              <div className="card-result" style={{ marginBottom: 20 }}>
                {interests.length > 0 && (
                  <div className="card-result-row">
                    <span className="card-result-label">{t.cardQ1}</span>
                    <span className="card-result-value">{interests.join(' · ')}</span>
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
                    <span className="card-result-value">{worries.join(' · ')}</span>
                  </div>
                )}
                {contactMethod && (
                  <div className="card-result-row">
                    <span className="card-result-label">{t.cardQ5}</span>
                    <span className="card-result-value">{contactMethod}</span>
                  </div>
                )}
              </div>

              <button className="btn-card-submit" onClick={() => setModal('wechat-biz')}>
                {t.cardContactBtn}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Contact buttons ── */}
      <div className="section-dark" style={{ paddingTop: 32, paddingBottom: 40 }}>
        <p className="section-title-light" style={{ marginBottom: 6 }}>{t.contactTitle}</p>
        <div className="section-accent-line-light" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="contact-btn contact-btn-wechat-biz" onClick={() => setModal('wechat-biz')}>
            <div className="contact-icon">💼</div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatBiz}</p>
          </button>
          <button className="contact-btn contact-btn-wechat-personal" onClick={() => setModal('wechat-personal')}>
            <div className="contact-icon">💬</div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatPersonal}</p>
          </button>
          <button className="contact-btn contact-btn-whatsapp" onClick={() => setModal('whatsapp')}>
            <div className="contact-icon">📱</div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWhatsapp}</p>
          </button>
          <button className="contact-btn contact-btn-form" onClick={() => setModal('form')}>
            <div className="contact-icon" style={{ background: 'rgba(255,255,255,0.12)' }}>📝</div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactForm}</p>
          </button>
        </div>

        <p className="contact-email">{t.contactEmail}</p>
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

              {(modal === 'wechat-biz' || modal === 'wechat-personal' || modal === 'whatsapp') && (
                <>
                  <p className="modal-title">
                    {modal === 'wechat-biz' ? t.contactWechatBiz :
                     modal === 'wechat-personal' ? t.contactWechatPersonal :
                     t.contactWhatsapp}
                  </p>
                  <div className="qr-placeholder">
                    <span style={{ fontSize: 36 }}>{modal === 'whatsapp' ? '📱' : '💬'}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5, padding: '0 8px' }}>
                      {t.contactQRHint}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.7 }}>
                    {lang === 'zh' ? '扫描上方二维码，添加咨询。我们会在工作时间内尽快回复您。' :
                     lang === 'ko' ? 'QR 코드를 스캔하여 상담을 추가하세요. 업무 시간 내에 답변 드립니다.' :
                     'Scan QR to start consultation. We\'ll respond during business hours.'}
                  </p>
                  <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setModal(null)}>
                    {t.contactClose}
                  </button>
                </>
              )}

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
                        onClick={() => { if (formName.trim() && formMsg.trim()) setFormSent(true) }}
                        disabled={!formName.trim() || !formMsg.trim()}
                        style={{ opacity: formName.trim() && formMsg.trim() ? 1 : 0.4, cursor: formName.trim() && formMsg.trim() ? 'pointer' : 'not-allowed' }}
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
    </div>
  )
}
