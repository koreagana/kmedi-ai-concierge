import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import {
  BIG_HEALTH_DOC_BUTTONS,
  BIG_HEALTH_DOC_SECTION_LABEL,
  BIG_HEALTH_PILLS_PROMPT,
  type BigHealthDocButtonKey,
  type LocalizedText,
} from '../data/bigHealthKeywords'
import { STEM_CELL_KEYWORDS, STEM_CELL_SECTION } from '../data/stemCellKeywords'
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
  return (
    <a className="bh-doc-btn" href={doc.target}>
      <span>{pick(doc.label, lang)}</span>
      <span className="bh-doc-btn-arrow">→</span>
    </a>
  )
}

export default function StemCellKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = STEM_CELL_KEYWORDS[activeIndex]

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(STEM_CELL_SECTION.title, lang)}</p>
      <p className="bh-section-subcopy">{pick(STEM_CELL_SECTION.subCopy, lang)}</p>
      <p className="bh-section-desc">{pick(STEM_CELL_SECTION.desc, lang)}</p>

      <div className="bh-safety">
        {STEM_CELL_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      <p className="bh-pills-prompt">{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-pills" role="tablist">
        {STEM_CELL_KEYWORDS.map((kw, i) => (
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

        {active.note && (
          <div className="bh-note">
            <p className="bh-card-text">{pick(active.note, lang)}</p>
          </div>
        )}

        {active.approvedProducts && (
          <div className="bh-card-section">
            <p className="bh-card-label">{pick(active.approvedProducts.title, lang)}</p>
            <ul className="bh-product-list">
              {active.approvedProducts.items.map((item, i) => (
                <li key={i}>
                  <span className="bh-product-name">{pick(item.name, lang)}</span>
                  <span className="bh-product-desc">{pick(item.desc, lang)}</span>
                </li>
              ))}
            </ul>
            <div className="bh-note">
              <p className="bh-card-text">{pick(active.approvedProducts.caution, lang)}</p>
            </div>
          </div>
        )}

        {active.listLabel && active.list && (
          <div className="bh-card-section">
            <p className="bh-card-label">{pick(active.listLabel, lang)}</p>
            <ul className="bh-list">
              {active.list.map((item, i) => (
                <li key={i}>{pick(item, lang)}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bh-card-section">
          <p className="bh-card-label">{pick(BIG_HEALTH_DOC_SECTION_LABEL, lang)}</p>
          <div className="bh-doc-buttons">
            {active.docKeys.map(key => (
              <DocButton key={key} docKey={key} lang={lang} />
            ))}
            <DocButton docKey="wechatConsult" lang={lang} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
