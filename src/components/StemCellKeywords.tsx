import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import { STEM_CELL_KEYWORDS } from '../data/stemCellKeywords'
import type { LangCode } from '../data/translations'
import TtsButton from './TtsButton'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

export default function StemCellKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="bh-section">
      <p className="bh-pills-prompt" style={{ paddingTop: 22, paddingBottom: 14 }}>{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--stemcell">
        {STEM_CELL_KEYWORDS.map((kw, i) => {
          const isActive = activeIndex === i
          return (
            <Fragment key={kw.id}>
              <button
                type="button"
                aria-expanded={isActive}
                className={`bh-tile bh-tile--banner${isActive ? ' bh-tile-active' : ''}`}
                onClick={() => setActiveIndex(isActive ? null : i)}
              >
                <span className="bh-tile-label">
                  {pick(kw.title, lang)}
                  <span className="bh-tile-sublabel">{pick(kw.tileSubtitle, lang)}</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="bh-card bh-card--inline">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                        <p className="bh-card-title">{pick(kw.title, lang)}</p>
                        <TtsButton text={[pick(kw.title, lang), pick(kw.body, lang)].join('\n\n')} lang={lang} />
                      </div>

                      {pick(kw.body, lang).split('\n').map((line, li) => (
                        <p key={li} className="bh-card-text">{line}</p>
                      ))}

                      {kw.pills && (
                        <div className="bh-keyword-pills">
                          {kw.pills.map((p, pi) => (
                            <span key={pi} className="bh-keyword-pill">{pick(p, lang)}</span>
                          ))}
                        </div>
                      )}

                      {kw.pillGroups && kw.pillGroups.map((group, gi) => (
                        <div key={gi} className="bh-keyword-pills" style={{ marginTop: gi === 0 ? 14 : 10 }}>
                          {group.map((p, pi) => (
                            <span key={pi} className="bh-keyword-pill bh-keyword-pill--lg">{pick(p, lang)}</span>
                          ))}
                        </div>
                      ))}

                      {kw.footerLine && <p className="bh-card-text" style={{ marginTop: 10 }}>{pick(kw.footerLine, lang)}</p>}

                      {kw.list && (
                        <ul className="bh-list" style={{ marginTop: 12 }}>
                          {kw.list.map((item, li) => <li key={li}>{pick(item, lang)}</li>)}
                        </ul>
                      )}

                      {kw.products && (
                        <ul className="bh-product-list" style={{ marginTop: 12 }}>
                          {kw.products.map((item, pi) => (
                            <li key={pi}>
                              <span className="bh-product-name">{item.name}</span>
                              <span className="bh-product-desc">{pick(item.desc, lang)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {kw.hint && <span className="bh-hint-link">{pick(kw.hint, lang)}</span>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
