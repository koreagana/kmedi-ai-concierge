import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import {
  BIG_HEALTH_KEYWORDS,
  BIG_HEALTH_DOC_BUTTONS,
  BIG_HEALTH_DOC_SECTION_LABEL,
  BIG_HEALTH_PILLS_PROMPT,
  BIG_HEALTH_SECTION,
  type BigHealthDocButtonKey,
  type LocalizedText,
} from '../data/bigHealthKeywords'
import type { LangCode } from '../data/translations'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

function DocButton({ docKey, lang }: { docKey: BigHealthDocButtonKey; lang: LangCode }) {
  const doc = BIG_HEALTH_DOC_BUTTONS[docKey]
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
  // Prep/intake pages are separate static entry pages (see vite.config.ts), not SPA routes —
  // a plain anchor triggers the real page load.
  return (
    <a className="bh-doc-btn" href={doc.target}>
      <span>{pick(doc.label, lang)}</span>
      <span className="bh-doc-btn-arrow">→</span>
    </a>
  )
}

export default function BigHealthKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = BIG_HEALTH_KEYWORDS[activeIndex]

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(BIG_HEALTH_SECTION.title, lang)}</p>
      <p className="bh-section-desc">{pick(BIG_HEALTH_SECTION.desc, lang)}</p>

      <div className="bh-safety">
        {BIG_HEALTH_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      <p className="bh-pills-prompt">{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-pills" role="tablist">
        {BIG_HEALTH_KEYWORDS.map((kw, i) => (
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
        <p className="bh-card-text">{pick(active.description, lang)}</p>

        {active.note && (
          <div className="bh-note">
            {pick(active.note, lang).split('\n').map((line, i) => (
              <p key={i} className="bh-card-text">{line}</p>
            ))}
          </div>
        )}

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(active.testsLabel, lang)}</p>
          <ul className="bh-list">
            {active.tests.map((item, i) => (
              <li key={i}>{pick(item, lang)}</li>
            ))}
          </ul>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(active.directionLabel, lang)}</p>
          <ul className="bh-list">
            {active.direction.map((item, i) => (
              <li key={i}>{pick(item, lang)}</li>
            ))}
          </ul>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(BIG_HEALTH_DOC_SECTION_LABEL, lang)}</p>
          <div className="bh-doc-buttons">
            {active.docKeys.map(key => (
              <DocButton key={key} docKey={key} lang={lang} />
            ))}
            <DocButton docKey="wechatConsult" lang={lang} />
          </div>
        </div>

        {active.extraDisclaimer && (
          <div className="bh-disclaimer">
            {pick(active.extraDisclaimer, lang).split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
