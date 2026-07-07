import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { getCategoryById } from '../data/categories'
import { getConcernById } from '../data/concerns'
import ConsultationCard from './ConsultationCard'
import BigHealthKeywords from './BigHealthKeywords'
import StemCellKeywords from './StemCellKeywords'
import SkinAestheticsKeywords from './SkinAestheticsKeywords'
import PlasticSurgeryKeywords from './PlasticSurgeryKeywords'
import WomensHealthKeywords from './WomensHealthKeywords'
import MensHealthKeywords from './MensHealthKeywords'
import CustomPlanContent from './CustomPlanContent'
import ConsultCardVisual from './ConsultCardVisual'
import {
  CategoryGridSection,
  MedicalNetworkSection,
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

  // Same bfcache safeguard as HomeConsultationSection — a fresh reload already
  // resets this, but browser back/forward restores can keep stale state.
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setShowCard(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

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

  const concernObj = getConcernById(concernId ?? '')
  const concernLocal = concernObj ? concernObj[lang] : null

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className={`cat-hero${cat.heroImage ? ' cat-hero--image' : ''}`}
        style={cat.heroImage ? { backgroundImage: `url(${cat.heroImage})` } : undefined}
      >
        {cat.heroImage && <div className="cat-hero-overlay" />}

        {/* Video oval: plastic-surgery only, inside relative hero container */}
        {cat.id === 'plastic-surgery' && cat.heroImage && (
          <div className="ps-video-oval">
            <video autoPlay muted loop playsInline src="/category-hero/gride_woman.mp4" />
          </div>
        )}

        <div className="cat-hero-content">
          <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
            ← {t.backHome}
          </motion.button>

          <motion.h1 className="cat-hero-name" {...fadeUp} transition={{ delay: 0.05 }}>
            {concernLocal ? concernLocal.title : catName}
          </motion.h1>

          {concernLocal ? (
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} style={{ marginTop: 10 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.01em', textShadow: '0 1px 4px rgba(0,0,0,0.55), 0 1px 12px rgba(0,0,0,0.35)' }}>
                {concernLocal.catName ?? catName}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.02em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {concernLocal.catTag ?? catTag}
              </p>
            </motion.div>
          ) : (
            <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
              {catTag}
            </motion.p>
          )}
        </div>
      </div>

      {/* ── Big Health keyword pills (only for the big-health category) ── */}
      {cat.id === 'big-health' && <BigHealthKeywords />}

      {/* ── Stem cell / regenerative medicine keyword pills (only for the stem-cell category) ── */}
      {cat.id === 'stem-cell' && <StemCellKeywords />}

      {/* ── Skin aesthetics keyword pills (only for the skin-beauty category) ── */}
      {cat.id === 'skin-beauty' && <SkinAestheticsKeywords />}

      {/* ── Plastic surgery keyword pills (only for the plastic-surgery category) ── */}
      {cat.id === 'plastic-surgery' && <PlasticSurgeryKeywords />}

      {/* ── Women's health keyword pills (only for the womens-care category) ── */}
      {cat.id === 'womens-care' && <WomensHealthKeywords />}

      {/* ── Men's health keyword pills (only for the mens-health category) ── */}
      {cat.id === 'mens-health' && <MensHealthKeywords />}

      {/* ── Custom medical tourism plan trust content (only for the custom-plan category) ── */}
      {cat.id === 'custom-plan' && <CustomPlanContent />}

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
          <ConsultCardVisual lang={lang} onClick={() => setShowCard(true)} />
        </motion.div>
      ) : (
        <ConsultationCard categoryId={cat.id} concernId={concernId ?? undefined} onExit={() => setShowCard(false)} />
      )}

      {/* ── Common page footer sections ── */}
      <CategoryGridSection />
      <MedicalNetworkSection />
      <FooterSection />
    </div>
  )
}
