import { useState } from 'react'
import { motion } from 'framer-motion'
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

        {concernLocal ? (
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} style={{ marginTop: 10 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.01em' }}>
              {catName}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.02em' }}>
              {catTag}
            </p>
          </motion.div>
        ) : (
          <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
            {catTag}
          </motion.p>
        )}
      </div>

      {/* ── Description (concern body, blue left border, no title) ── */}
      {concernLocal && (
        <div className="section-white" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <motion.div
            {...fadeUp}
            style={{
              borderLeft: '3px solid var(--brand)',
              paddingLeft: 16,
            }}
          >
            {concernLocal.desc.split('\n\n').map((para, i, arr) => (
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
      )}

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
          <button
            onClick={() => setShowCard(true)}
            style={{
              width: '100%',
              padding: '15px 0',
              borderRadius: 12,
              background: 'var(--brand, #0077b6)',
              border: 'none',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 18px rgba(0,119,182,0.28)',
            }}
          >
            生成我的变美咨询卡
          </button>
        </motion.div>
      ) : (
        <ConsultationCard />
      )}
    </div>
  )
}
