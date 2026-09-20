import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import type { LocalizedText } from '../data/bigHealthKeywords'
import {
  SKIN_AESTHETICS_KEYWORDS,
  SKIN_AESTHETICS_PILLS_PROMPT,
  SKIN_AESTHETICS_SECTION,
} from '../data/skinAestheticsKeywords'
import type { LangCode } from '../data/translations'
import CasePhoto from './CasePhoto'
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

      <p className="bh-pills-prompt">{pick(SKIN_AESTHETICS_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--pink" role="tablist">
        {SKIN_AESTHETICS_KEYWORDS.map((kw, i) => (
          <button
            key={kw.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={`bh-tile ${i === activeIndex ? 'bh-tile-active' : ''}`}
            style={(kw.image && !kw.video) ? { backgroundImage: `url(${kw.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            onClick={() => {
              setActiveIndex(i)
              cardAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {kw.video && (
              <video
                autoPlay muted loop playsInline
                src={kw.video}
                poster={kw.image}
                className="bh-tile-video"
              />
            )}
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

          <div className="bh-more-body">
            {active.specialNote && (
              <div className="bh-note" style={{ marginTop: 0 }}>
                <p className="bh-card-text">{pick(active.specialNote, lang)}</p>
              </div>
            )}

            <div className="bh-card-section">
              <p className="bh-card-label">{pick(active.directionsLabel, lang)}</p>
              {active.directionGroups && active.directionGroups.length > 0 && pick(active.directionGroups[0].label, lang) ? (
                active.directionGroups.map((group, gi) => (
                  <div key={gi} style={{ marginTop: gi > 0 ? 10 : 4 }}>
                    <p className="bh-card-subtitle">{pick(group.label, lang)}</p>
                    <ul className="bh-list">
                      {group.items.map((item, i) => (
                        <li key={i}>{pick(item, lang)}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="bh-list">
                  {active.directions.map((item, i) => (
                    <li key={i}>{pick(item, lang)}</li>
                  ))}
                </ul>
              )}
            </div>

            {active.popularDevices && pick(active.popularDevices.title, lang) && (
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

            {active.productGroups && active.productGroups.length > 0 && pick(active.productGroups[0].label, lang) && (
              <div className="bh-card-section">
                {active.productGroupsLabel && pick(active.productGroupsLabel, lang) && (
                  <p className="bh-card-label bh-card-label--pink">{pick(active.productGroupsLabel, lang)}</p>
                )}
                {active.productGroups.map((group, gi) => (
                  <div key={gi} style={{ marginTop: gi > 0 ? 12 : (active.productGroupsLabel ? 6 : 0) }}>
                    <p className="bh-card-subtitle bh-card-subtitle--pink">{pick(group.label, lang)}</p>
                    <ul className="bh-list bh-list--pink">
                      {group.items.map((item, i) => (
                        <li key={i}>{pick(item, lang)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {active.explainerTitle && active.explainerBody && pick(active.explainerTitle, lang) && (
              <div className="bh-card-section">
                <p className="bh-card-label">{pick(active.explainerTitle, lang)}</p>
                {pick(active.explainerBody, lang).split('\n\n').map((para, i) => (
                  <p key={i} className="bh-card-text" style={{ marginTop: i > 0 ? 10 : 0 }}>{para}</p>
                ))}
              </div>
            )}

            {active.referenceIllustration && active.referenceIllustration.map((ref, i) => (
              <div className="bh-card-section" key={i}>
                <p className="bh-card-label">{pick(ref.title, lang)}</p>
                {ref.image && (
                  <img
                    src={ref.image}
                    alt={pick(ref.title, lang)}
                    className="ref-illustration-img"
                  />
                )}
                <p className="bh-card-text" style={{ marginTop: ref.image ? 10 : 4 }}>
                  {pick(ref.body, lang)}
                </p>
              </div>
            ))}

            {active.comparisonTable && (
              <div className="bh-card-section">
                <p className="bh-card-label">{pick(active.comparisonTable.title, lang)}</p>
                {active.comparisonTable.subCopy && (
                  <p className="bh-card-text" style={{ marginTop: 4, marginBottom: 12 }}>
                    {pick(active.comparisonTable.subCopy, lang)}
                  </p>
                )}
                <div className="compare-table">
                  {active.comparisonTable.rows.map((row, i) => (
                    <div className={`compare-row compare-row--${row.accent}`} key={i}>
                      <div className="compare-row-head">
                        <span className="compare-row-type">{pick(row.type, lang)}</span>
                        <span className="compare-row-product">{pick(row.product, lang)}</span>
                      </div>
                      <dl className="compare-row-grid">
                        <dt>{lang === 'en' ? 'Ingredient' : '主要成分'}</dt>
                        <dd>{pick(row.ingredient, lang)}</dd>
                        <dt>{lang === 'en' ? 'Suitable For' : '适合改善'}</dt>
                        <dd>{pick(row.concerns, lang)}</dd>
                        <dt>{lang === 'en' ? 'Discomfort' : '疼痛感'}</dt>
                        <dd>
                          <span className="compare-pain-dots" aria-hidden="true">
                            {[1, 2, 3].map((n) => (
                              <span key={n} className={n <= row.painScore ? 'compare-pain-dot compare-pain-dot--on' : 'compare-pain-dot'} />
                            ))}
                          </span>
                          {pick(row.painLabel, lang)}
                        </dd>
                        <dt>{lang === 'en' ? 'Recovery' : '恢复期'}</dt>
                        <dd>{pick(row.recovery, lang)}</dd>
                        {row.effectNote && (
                          <>
                            <dt>{lang === 'en' ? 'Effect Timeline' : '效果特点'}</dt>
                            <dd>{pick(row.effectNote, lang)}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active.realCase && (
              <div className="bh-card-section">
                <p className="bh-card-label">{lang === 'en' ? 'Real Case' : '真实案例'}</p>
                <div className="real-case-list" style={{ marginTop: 10 }}>
                  {active.realCase.photos.map((p) => (
                    <CasePhoto key={p.src} src={p.src} alt={pick(p.alt, lang)} />
                  ))}
                </div>
                {active.realCase.credit && (
                  <p className="real-case-credit">{pick(active.realCase.credit, lang)}</p>
                )}
                <div className="info-box" style={{ marginTop: 14 }}>
                  <p className="info-box-title">{pick(active.realCase.planTitle, lang)}</p>
                  <p className="info-tag-row">{pick(active.realCase.planTag, lang)}</p>
                  {active.realCase.planNotes.map((n, i) => (
                    <p key={i} className="info-note">{pick(n, lang)}</p>
                  ))}
                  <p className="info-note" style={{ fontWeight: 700, color: 'var(--brand-dark)' }}>
                    {pick(active.realCase.planHighlight, lang)}
                  </p>
                </div>
              </div>
            )}

            {active.note && (
              <div className={active.noteStyle === 'warning' ? 'bh-disclaimer' : 'bh-note'} style={{ marginTop: 14 }}>
                <p className={active.noteStyle === 'warning' ? undefined : 'bh-card-text'}>{pick(active.note, lang)}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
