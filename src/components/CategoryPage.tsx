import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { getCategoryById } from '../data/categories'
import { getConcernById } from '../data/concerns'
import ConsultationCard from './ConsultationCard'
import BigHealthKeywords from './BigHealthKeywords'
import {
  CategoryGridSection,
  ContactSection,
  MedicalNetworkSection,
  AboutSection,
  FooterSection,
} from './HomePage'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

export default function CategoryPage() {
  const { lang, categoryId, concernId, goHome } = useApp()
  const t = translations[lang]
  const cat = getCategoryById(categoryId ?? '')
  const [showCard, setShowCard] = useState(false)

  if (!cat) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <button className="cat-back-btn" onClick={goHome} style={{ color: 'var(--text-muted)', margin: '0 auto 20px' }}>
          ← {t.backHome}
        </button>
      </div>
    )
  }

  const catName = lang === 'ko' ? cat.ko : lang === 'en' ? cat.en : lang === 'ar' ? cat.ar : cat.zh
  const catTag  = lang === 'ko' ? cat.tagKo : lang === 'en' ? cat.tagEn : lang === 'ar' ? cat.tagAr : cat.tagZh
  const catScriptFull = lang === 'ko' ? cat.scriptFullKo : lang === 'en' ? cat.scriptFullEn : lang === 'ar' ? cat.scriptFullAr : cat.scriptFullZh

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

        {concernLocal ? (
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} style={{ marginTop: 10 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.01em' }}>
              {concernLocal.catName ?? catName}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.02em' }}>
              {concernLocal.catTag ?? catTag}
            </p>
          </motion.div>
        ) : (
          <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
            {catTag}
          </motion.p>
        )}
      </div>

      {/* ── Description (concern body, or category scriptFull, blue left border, no title) ── */}
      <div className="section-white" style={{ paddingTop: 28, paddingBottom: 28 }}>
        <motion.div
          {...fadeUp}
          style={{
            borderLeft: '3px solid var(--brand)',
            paddingLeft: 16,
          }}
        >
          {(concernLocal ? concernLocal.desc : catScriptFull).split('\n\n').map((para, i, arr) => (
            <p
              key={i}
              style={{
                fontSize: 13,
                color: 'var(--text)',
                lineHeight: 1.9,
                marginBottom: i < arr.length - 1 ? 14 : 0,
                whiteSpace: 'pre-line',
              }}
            >
              {para}
            </p>
          ))}
        </motion.div>
      </div>

      {/* ── Big Health keyword pills (only for the big-health category) ── */}
      {cat.id === 'big-health' && <BigHealthKeywords />}

      {/* ── CTA button / ConsultationCard ── */}
      {!showCard ? (
        <motion.div
          {...fadeUp}
          style={{
            padding: '28px 20px 32px',
            background: 'var(--bg-surface, #f0f6ff)',
            borderTop: '1px solid var(--border-blue)',
          }}
        >
          <button className="cat-make-card-btn" onClick={() => setShowCard(true)}>
            {t.makeCard}
            <span className="cat-make-card-btn-arrow">{lang === 'ar' ? '←' : '→'}</span>
          </button>
        </motion.div>
      ) : (
        <ConsultationCard categoryId={cat.id} concernId={concernId ?? undefined} />
      )}

      {/* ── Common page footer sections ── */}
      <CategoryGridSection />
      <ContactSection />
      <MedicalNetworkSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}
