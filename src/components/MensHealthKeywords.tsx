import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_MORE_LABEL, BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import {
  MENS_HEALTH_KEYWORDS,
  MENS_HEALTH_SECTION,
} from '../data/mensHealthKeywords'
import type { LangCode } from '../data/translations'
import TtsButton from './TtsButton'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

export default function MensHealthKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const cardAnchorRef = useRef<HTMLDivElement>(null)
  const active = MENS_HEALTH_KEYWORDS[activeIndex]

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(MENS_HEALTH_SECTION.title, lang)}</p>
      <p className="bh-section-subcopy">{pick(MENS_HEALTH_SECTION.subCopy, lang)}</p>
      <p className="bh-section-desc">{pick(MENS_HEALTH_SECTION.desc, lang)}</p>

      <div className="bh-safety">
        {MENS_HEALTH_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      <p className="bh-pills-prompt">{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--steel" role="tablist">
        {MENS_HEALTH_KEYWORDS.map((kw, i) => (
          <button
            key={kw.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={`bh-tile ${i === activeIndex ? 'bh-tile-active' : ''}`}
            style={kw.image ? { backgroundImage: `url(${kw.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            onClick={() => {
              setActiveIndex(i)
              cardAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span className="bh-tile-label">{pick(kw.title, lang)}</span>
          </button>
        ))}
      </div>

      <div ref={cardAnchorRef} className="bh-card-anchor">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="bh-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
            <p className="bh-card-title">{pick(active.title, lang)}</p>
            <TtsButton
              text={[
                pick(active.title, lang),
                pick(active.description, lang),
                pick(active.note, lang),
              ].filter(Boolean).join('\n\n')}
              lang={lang}
            />
          </div>
          <p className="bh-card-text">{pick(active.description, lang)}</p>

          <details className="bh-more">
            <summary>{pick(BIG_HEALTH_MORE_LABEL, lang)}</summary>
            <div className="bh-more-body">
              <div className="bh-card-section" style={{ marginTop: 0 }}>
                <p className="bh-card-label">{pick(active.directionsLabel, lang)}</p>
                <ul className="bh-list">
                  {active.directions.map((item, i) => (
                    <li key={i}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>

              <div className={active.noteStyle === 'warning' ? 'bh-disclaimer' : 'bh-note'} style={{ marginTop: 14 }}>
                <p className={active.noteStyle === 'warning' ? undefined : 'bh-card-text'}>{pick(active.note, lang)}</p>
              </div>
            </div>
          </details>
        </motion.div>
      </div>
    </div>
  )
}
