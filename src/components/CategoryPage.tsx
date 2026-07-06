import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import TtsButton from './TtsButton'
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
  // Full-description expand/collapse — currently scoped to skin-beauty only (see [작업 2]).
  const [descExpanded, setDescExpanded] = useState(false)

  // Same bfcache safeguard as HomeConsultationSection — a fresh reload already
  // resets this, but browser back/forward restores can keep stale state.
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setShowCard(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  useEffect(() => {
    setDescExpanded(false)
  }, [categoryId, concernId])

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
      <div
        className={`cat-hero${cat.heroImage ? ' cat-hero--image' : ''}`}
        style={cat.heroImage ? { backgroundImage: `url(${cat.heroImage})` } : undefined}
      >
        {cat.heroImage && <div className="cat-hero-overlay" />}
        <div className="cat-hero-content">
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <TtsButton text={concernLocal ? concernLocal.desc : catScriptFull} lang={lang} />
          </div>
          {(() => {
            const paragraphs = (concernLocal ? concernLocal.desc : catScriptFull).split('\n\n')
            // Summary-first + expand toggle is currently scoped to skin-beauty only ([작업 2]);
            // every other category keeps showing all paragraphs unconditionally, unchanged.
            const isCollapsible = cat.id === 'skin-beauty' && paragraphs.length > 1
            const leadParagraphs = isCollapsible ? paragraphs.slice(0, 1) : paragraphs
            const restParagraphs = isCollapsible ? paragraphs.slice(1) : []

            const renderPara = (para: string, i: number, isLast: boolean) => (
              <p
                key={i}
                style={{
                  fontSize: 13,
                  color: 'var(--text)',
                  lineHeight: 1.9,
                  marginBottom: isLast ? 0 : 14,
                  whiteSpace: 'pre-line',
                }}
              >
                {para}
              </p>
            )

            return (
              <>
                {leadParagraphs.map((para, i) => renderPara(para, i, !isCollapsible && i === leadParagraphs.length - 1))}

                {isCollapsible && (
                  <>
                    <AnimatePresence initial={false}>
                      {descExpanded && (
                        <motion.div
                          key="rest"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingTop: 14 }}>
                            {restParagraphs.map((para, i) => renderPara(para, i, i === restParagraphs.length - 1))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      className="cat-desc-toggle"
                      onClick={() => setDescExpanded(v => !v)}
                    >
                      {descExpanded ? t.aiScriptCollapse : t.aiScriptExpand} {descExpanded ? '▴' : '▾'}
                    </button>
                  </>
                )}
              </>
            )
          })()}
        </motion.div>
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
          <button className="cat-make-card-btn" onClick={() => setShowCard(true)}>
            {t.makeCard}
            <span className="cat-make-card-btn-arrow">{lang === 'ar' ? '←' : '→'}</span>
          </button>
        </motion.div>
      ) : (
        <ConsultationCard categoryId={cat.id} concernId={concernId ?? undefined} onExit={() => setShowCard(false)} />
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
