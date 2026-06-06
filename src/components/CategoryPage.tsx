import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { getCategoryById } from '../data/categories'
import { getConcernById } from '../data/concerns'
import ConsultationCard from './ConsultationCard'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

type ContactModal = 'wechat-biz' | 'wechat-personal' | 'whatsapp' | 'form' | null

export default function CategoryPage() {
  const { lang, categoryId, concernId, goHome } = useApp()
  const t = translations[lang]
  const cat = getCategoryById(categoryId ?? '')

  const [scriptExpanded, setScriptExpanded] = useState(false)
  const [modal, setModal] = useState<ContactModal>(null)

  // Form state (for contact modal)
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [formSent, setFormSent] = useState(false)

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

  const concernObj = getConcernById(concernId ?? '')
  const concernLocal = concernObj ? concernObj[lang] : null

  return (
    <div>
      {/* ── Hero ── */}
      <div className="cat-hero">
        <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
          ← {t.backHome}
        </motion.button>

        <motion.h1 className="cat-hero-name" {...fadeUp} transition={{ delay: 0.05 }}>
          {concernLocal ? concernLocal.title : catName}
        </motion.h1>

        {!concernLocal && (
          <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
            {catTag}
          </motion.p>
        )}
      </div>

      {/* ── Concern description (only when navigated from concern card) ── */}
      {concernLocal && (
        <div className="section-white" style={{ paddingTop: 24, paddingBottom: 24 }}>
          {concernLocal.desc.split('\n\n').map((para, i, arr) => (
            <motion.p
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
              style={{
                fontSize: 13,
                color: 'var(--text)',
                lineHeight: 1.85,
                marginBottom: i < arr.length - 1 ? 14 : 0,
                whiteSpace: 'pre-line',
              }}
            >
              {para}
            </motion.p>
          ))}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.28 }}
            style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-blue)' }}
          >
            <p style={{ fontSize: 11, color: 'var(--blue-light)', letterSpacing: '0.1em', marginBottom: 6 }}>
              {lang === 'zh' ? '推荐咨询方向' : lang === 'ko' ? '추천 상담 방향' : 'Recommended Areas'}
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand-dark)' }}>
              {concernLocal.recommended}
            </p>
          </motion.div>
        </div>
      )}

      {/* ── Category name divider (only when coming from concern) ── */}
      {concernLocal && (
        <motion.div
          {...fadeUp}
          style={{
            padding: '18px 20px 14px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{
            width: 3,
            height: 30,
            background: 'var(--brand)',
            borderRadius: 2,
            flexShrink: 0,
          }} />
          <div>
            <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{catName}</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{catTag}</p>
          </div>
        </motion.div>
      )}

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
      <ConsultationCard />

      {/* ── Contact buttons ── */}
      <div className="section-dark" style={{ paddingTop: 32, paddingBottom: 40 }}>
        <p className="section-title-light" style={{ marginBottom: 6 }}>{t.contactTitle}</p>
        <div className="section-accent-line-light" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="contact-btn contact-btn-wechat-biz" onClick={() => window.open('https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0', '_blank')}>
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatBiz}</p>
          </button>
          <button className="contact-btn contact-btn-wechat-personal" onClick={() => setModal('wechat-personal')}>
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWechatPersonal}</p>
          </button>
          <button className="contact-btn contact-btn-whatsapp" onClick={() => setModal('whatsapp')}>
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6z"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>{t.contactWhatsapp}</p>
          </button>
          <button className="contact-btn contact-btn-form" onClick={() => setModal('form')}>
            <div className="contact-icon" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
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
