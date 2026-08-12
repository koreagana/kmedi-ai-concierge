import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_MORE_LABEL, BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import {
  SKIN_AESTHETICS_KEYWORDS,
  SKIN_AESTHETICS_SECTION,
} from '../data/skinAestheticsKeywords'
import type { LangCode } from '../data/translations'
import TtsButton from './TtsButton'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

export default function SkinAestheticsKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const cardAnchorRef = useRef<HTMLDivElement>(null)
  const active = SKIN_AESTHETICS_KEYWORDS[activeIndex]

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(SKIN_AESTHETICS_SECTION.title, lang)}</p>
      <p className="bh-section-subcopy">{pick(SKIN_AESTHETICS_SECTION.subCopy, lang)}</p>
      <p className="bh-section-desc">{pick(SKIN_AESTHETICS_SECTION.desc, lang)}</p>

      <p className="bh-pills-prompt">{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--pink" role="tablist">
        {SKIN_AESTHETICS_KEYWORDS.map((kw, i) => (
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
                active.specialNote ? pick(active.specialNote, lang) : '',
                active.note ? pick(active.note, lang) : '',
              ].filter(Boolean).join('\n\n')}
              lang={lang}
            />
          </div>
          {pick(active.description, lang).split('\n\n').map((para, i) => (
            <p key={i} className="bh-card-text" style={{ marginTop: i > 0 ? 10 : 0 }}>{para}</p>
          ))}

          <details className="bh-more">
            <summary>{pick(BIG_HEALTH_MORE_LABEL, lang)}</summary>
            <div className="bh-more-body">
              {active.specialNote && (
                <div className="bh-note" style={{ marginTop: 0 }}>
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

              {active.popularDevices && (
                <div className="bh-card-section">
                  <p className="bh-card-label bh-card-label--pink">{pick(active.popularDevices.title, lang)}</p>
                  <ul className="bh-product-list bh-product-list--pink">
                    {active.popularDevices.items.map((item, i) => (
                      <li key={i}>
                        <span className="bh-product-name">{pick(item.name, lang)}</span>
                        <span className="bh-product-desc">{pick(item.desc, lang)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bh-note">
                    <p className="bh-card-text">{pick(active.popularDevices.caution, lang)}</p>
                  </div>
                </div>
              )}

              {active.audienceLabel && active.audience && active.audience.length > 0 && (
                <div className="bh-card-section">
                  <p className="bh-card-label">{pick(active.audienceLabel, lang)}</p>
                  <ul className="bh-list">
                    {active.audience.map((item, i) => (
                      <li key={i}>{pick(item, lang)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {active.note && (
                <div className={active.noteStyle === 'warning' ? 'bh-disclaimer' : 'bh-note'} style={{ marginTop: 14 }}>
                  <p className={active.noteStyle === 'warning' ? undefined : 'bh-card-text'}>{pick(active.note, lang)}</p>
                </div>
              )}
            </div>
          </details>
        </motion.div>
      </div>
    </div>
  )
}
