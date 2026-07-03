import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import {
  SKIN_AESTHETICS_KEYWORDS,
  SKIN_AESTHETICS_SECTION,
  SKIN_AESTHETICS_PIGMENT_NOTE,
  SKIN_AESTHETICS_DOC_BUTTONS,
  type SkinAestheticsDocButtonKey,
} from '../data/skinAestheticsKeywords'
import type { LangCode } from '../data/translations'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

const DOC_SECTION_LABEL: LocalizedText = {
  zh: '相关准备文档',
  ko: '관련 준비문서',
  en: 'Related Preparation Documents',
  ar: 'المستندات التحضيرية ذات الصلة',
}

function DocButton({ docKey, lang }: { docKey: SkinAestheticsDocButtonKey; lang: LangCode }) {
  const doc = SKIN_AESTHETICS_DOC_BUTTONS[docKey]
  if (doc.kind === 'external') {
    return (
      <button
        type="button"
        className="bh-doc-btn"
        onClick={() => window.open(doc.target, '_blank', 'noopener,noreferrer')}
      >
        <span>{pick(doc.label, lang)}</span>
        <span className="bh-doc-btn-arrow">→</span>
      </button>
    )
  }
  return (
    <a className="bh-doc-btn" href={doc.target}>
      <span>{pick(doc.label, lang)}</span>
      <span className="bh-doc-btn-arrow">→</span>
    </a>
  )
}

export default function SkinAestheticsKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = SKIN_AESTHETICS_KEYWORDS[activeIndex]

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(SKIN_AESTHETICS_SECTION.title, lang)}</p>
      <p className="bh-section-subcopy">{pick(SKIN_AESTHETICS_SECTION.subCopy, lang)}</p>
      <p className="bh-section-desc">{pick(SKIN_AESTHETICS_SECTION.desc, lang)}</p>

      <div className="bh-safety">
        {SKIN_AESTHETICS_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      <p className="bh-pills-prompt">{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-pills" role="tablist">
        {SKIN_AESTHETICS_KEYWORDS.map((kw, i) => (
          <button
            key={kw.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={`bh-pill ${i === activeIndex ? 'bh-pill-active' : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            {pick(kw.title, lang)}
          </button>
        ))}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="bh-card"
      >
        <p className="bh-card-title">{pick(active.title, lang)}</p>
        {pick(active.description, lang).split('\n\n').map((para, i) => (
          <p key={i} className="bh-card-text" style={{ marginTop: i > 0 ? 10 : 0 }}>{para}</p>
        ))}

        {active.specialNote && (
          <div className="bh-note">
            <p className="bh-card-text">{pick(active.specialNote, lang)}</p>
          </div>
        )}

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(active.directionsLabel, lang)}</p>
          <ul className="bh-list">
            {active.directions.map((item, i) => (
              <li key={i}>{pick(item, lang)}</li>
            ))}
          </ul>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(active.audienceLabel, lang)}</p>
          <ul className="bh-list">
            {active.audience.map((item, i) => (
              <li key={i}>{pick(item, lang)}</li>
            ))}
          </ul>
        </div>

        <div className={active.noteStyle === 'warning' ? 'bh-disclaimer' : 'bh-note'} style={{ marginTop: 14 }}>
          <p className={active.noteStyle === 'warning' ? undefined : 'bh-card-text'}>{pick(active.note, lang)}</p>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(DOC_SECTION_LABEL, lang)}</p>
          <div className="bh-doc-buttons">
            {active.docKeys.map(key => (
              <DocButton key={key} docKey={key} lang={lang} />
            ))}
            <DocButton docKey="wechatConsult" lang={lang} />
          </div>
        </div>
      </motion.div>

      <div className="bh-note" style={{ margin: '14px 20px 0' }}>
        <p className="bh-card-text">{pick(SKIN_AESTHETICS_PIGMENT_NOTE, lang)}</p>
      </div>
    </div>
  )
}
