import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { translations } from '../data/translations'
import { getCategoryById } from '../data/categories'
import { getConcernById } from '../data/concerns'
import BigHealthKeywords from './BigHealthKeywords'
import StemCellKeywords from './StemCellKeywords'
import SkinAestheticsKeywords from './SkinAestheticsKeywords'
import PlasticSurgeryKeywords from './PlasticSurgeryKeywords'
import WomensHealthKeywords from './WomensHealthKeywords'
import MensHealthKeywords from './MensHealthKeywords'
import CustomPlanContent from './CustomPlanContent'
import CasePhoto from './CasePhoto'
import {
  CategoryGridSection,
  FooterSection,
} from './HomePage'

/** 피부미용·성형외과 상세페이지 전용 "실제 사례" 섹션. 홈페이지에는 안 넣는다 —
    첫 화면부터 전후사진이 보이면 "병원 광고"처럼 읽혀서, 사용자가 이미 그 카테고리를
    선택해서 들어온 상세페이지 쪽으로만 옮겼다. 출처 캡션은 사용자 요청으로 빼고 사진만. */
function RealCaseSection({ photos }: { photos: { src: string; alt: string }[] }) {
  const { lang } = useApp()
  return (
    <div className="real-case-section">
      <p className="section-title">{lang === 'en' ? 'Real Cases' : '真实案例'}</p>
      <div className="section-accent-line" />
      <div className="real-case-list">
        {photos.map((p) => (
          <CasePhoto key={p.src} src={p.src} alt={p.alt} />
        ))}
      </div>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

export default function CategoryPage() {
  const { lang, categoryId, concernId, goHome } = useApp()
  const t = translations[lang]
  const cat = getCategoryById(categoryId ?? '')

  if (!cat) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <button className="cat-back-btn" onClick={goHome} style={{ margin: '0 auto 20px' }}>
          {t.backHome}
        </button>
      </div>
    )
  }

  const catName = lang === 'en' ? cat.en : cat.zh
  const catTag  = lang === 'en' ? cat.tagEn : cat.tagZh

  const concernObj = getConcernById(concernId ?? '')
  const concernLocal = concernObj ? concernObj[lang] : null

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className={`cat-hero${(cat.heroImage || cat.heroVideo) ? ' cat-hero--image' : ''}`}
        style={(cat.heroImage && !cat.heroVideo) ? { backgroundImage: `url(${cat.heroImage})` } : undefined}
      >
        {(cat.heroImage || cat.heroVideo) && <div className="cat-hero-overlay" />}

        {/* Full-cover background video (replaces background-image when heroVideo is set) */}
        {cat.heroVideo && (
          <video
            autoPlay muted loop playsInline
            src={cat.heroVideo}
            poster={cat.heroImage}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        )}

        <div className="cat-hero-content">
          <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
            {t.backHome}
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
      {cat.id === 'skin-beauty' && (
        <RealCaseSection photos={[
          { src: '/case-photos/skin-before-after-1.png', alt: '피부 시술 전후 사례' },
        ]} />
      )}

      {/* ── Plastic surgery keyword pills (only for the plastic-surgery category) ── */}
      {cat.id === 'plastic-surgery' && <PlasticSurgeryKeywords />}
      {cat.id === 'plastic-surgery' && (
        <RealCaseSection photos={[
          { src: '/case-photos/contour-before-after-1.png', alt: '윤곽 수술 전후 사례 1' },
          { src: '/case-photos/contour-before-after-2.jpeg', alt: '윤곽 수술 전후 사례 2' },
        ]} />
      )}

      {/* ── Women's health keyword pills (only for the womens-care category) ── */}
      {cat.id === 'womens-care' && <WomensHealthKeywords />}

      {/* ── Men's health keyword pills (only for the mens-health category) ── */}
      {cat.id === 'mens-health' && <MensHealthKeywords />}

      {/* ── Custom medical tourism plan trust content (only for the custom-plan category) ── */}
      {cat.id === 'custom-plan' && <CustomPlanContent />}

      {/* ── Common page footer sections ── */}
      <CategoryGridSection />
      <FooterSection />
    </div>
  )
}
