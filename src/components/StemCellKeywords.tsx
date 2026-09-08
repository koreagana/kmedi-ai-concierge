import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import { STEM_CELL_KEYWORDS } from '../data/stemCellKeywords'
import type { LangCode } from '../data/translations'
import { WECHAT_BIZ_URL, getWhatsappUrl } from '../data/contacts'
import TtsButton from './TtsButton'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

const CTA_COPY: Record<'zh' | 'en', { title: string; sub: string; btn: string }> = {
  zh: { title: '想知道哪一种适合你？', sub: '把你的情况告诉我们。', btn: '咨询韩国医疗机构' },
  en: { title: 'Not sure which one fits you?', sub: 'Tell us about your situation.', btn: 'Talk to a Korean medical concierge' },
}

export default function StemCellKeywords() {
  const { lang } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const cardAnchorRef = useRef<HTMLDivElement>(null)
  const active = STEM_CELL_KEYWORDS[activeIndex]
  const cta = CTA_COPY[lang === 'en' ? 'en' : 'zh']

  const handleConsult = () => {
    window.open(lang === 'zh' ? WECHAT_BIZ_URL : getWhatsappUrl(lang), '_blank')
  }

  return (
    <div className="bh-section">
      <p className="bh-pills-prompt" style={{ paddingTop: 22 }}>{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--violet" role="tablist">
        {STEM_CELL_KEYWORDS.map((kw, i) => (
          <button
            key={kw.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={pick(kw.title, lang)}
            className={`bh-tile bh-tile--photo-label ${i === activeIndex ? 'bh-tile-active' : ''}`}
            style={kw.image ? { backgroundImage: `url(${kw.image})`, backgroundSize: 'cover', backgroundPosition: 'left center' } : undefined}
            onClick={() => {
              setActiveIndex(i)
              cardAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          />
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
            <TtsButton text={[pick(active.title, lang), pick(active.body, lang)].join('\n\n')} lang={lang} />
          </div>

          {pick(active.body, lang).split('\n').map((line, i) => (
            <p key={i} className="bh-card-text">{line}</p>
          ))}

          {active.pills && (
            <div className="bh-keyword-pills">
              {active.pills.map((p, i) => (
                <span key={i} className="bh-keyword-pill">{pick(p, lang)}</span>
              ))}
            </div>
          )}

          {active.pillGroups && active.pillGroups.map((group, gi) => (
            <div key={gi} className="bh-keyword-pills" style={{ marginTop: gi === 0 ? 14 : 10 }}>
              {group.map((p, i) => (
                <span key={i} className="bh-keyword-pill bh-keyword-pill--lg">{pick(p, lang)}</span>
              ))}
            </div>
          ))}

          {active.footerLine && <p className="bh-card-text" style={{ marginTop: 10 }}>{pick(active.footerLine, lang)}</p>}

          {active.list && (
            <ul className="bh-list" style={{ marginTop: 12 }}>
              {active.list.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}
            </ul>
          )}

          {active.products && (
            <ul className="bh-product-list" style={{ marginTop: 12 }}>
              {active.products.map((item, i) => (
                <li key={i}>
                  <span className="bh-product-name">{item.name}</span>
                  <span className="bh-product-desc">{pick(item.desc, lang)}</span>
                </li>
              ))}
            </ul>
          )}

          {active.hint && <span className="bh-hint-link">{pick(active.hint, lang)}</span>}
        </motion.div>
      </div>

      <div className="bh-cta">
        <p className="bh-cta-title">{cta.title}</p>
        <p className="bh-cta-sub">{cta.sub}</p>
        <button className="bh-cta-btn" onClick={handleConsult}>{cta.btn}</button>
      </div>
    </div>
  )
}
