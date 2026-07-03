import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  BIG_HEALTH_KEYWORDS,
  BIG_HEALTH_DOC_BUTTONS,
  BIG_HEALTH_SECTION,
  type BigHealthDocButtonKey,
} from '../data/bigHealthKeywords'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

const bi = (zh: string, ko: string) => `${zh} / ${ko}`

function DocButton({ docKey, onClick }: { docKey: BigHealthDocButtonKey; onClick: (key: BigHealthDocButtonKey) => void }) {
  const doc = BIG_HEALTH_DOC_BUTTONS[docKey]
  return (
    <button type="button" className="bh-doc-btn" onClick={() => onClick(docKey)}>
      <span>{bi(doc.zh, doc.ko)}</span>
      <span className="bh-doc-btn-arrow">→</span>
    </button>
  )
}

export default function BigHealthKeywords() {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const active = BIG_HEALTH_KEYWORDS[activeIndex]

  const handleDocClick = (key: BigHealthDocButtonKey) => {
    const doc = BIG_HEALTH_DOC_BUTTONS[key]
    if (doc.kind === 'external') {
      window.open(WECHAT_BIZ_URL, '_blank', 'noopener,noreferrer')
    } else {
      navigate(doc.target)
    }
  }

  return (
    <div className="bh-section">
      <p className="bh-section-title">{bi(BIG_HEALTH_SECTION.titleZh, BIG_HEALTH_SECTION.titleKo)}</p>
      <p className="bh-section-desc">{bi(BIG_HEALTH_SECTION.descZh, BIG_HEALTH_SECTION.descKo)}</p>

      <div className="bh-safety">
        {BIG_HEALTH_SECTION.safetyZh.map((line, i) => (
          <p key={i} className="bh-safety-line">{bi(line, BIG_HEALTH_SECTION.safetyKo[i])}</p>
        ))}
      </div>

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
            {bi(kw.zh, kw.ko)}
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
        <p className="bh-card-title">{bi(active.zh, active.ko)}</p>
        <p className="bh-card-text">{bi(active.descriptionZh, active.descriptionKo)}</p>

        {active.noteZh && active.noteKo && (
          <div className="bh-note">
            {active.noteZh.split('\n').map((line, i) => (
              <p key={i} className="bh-card-text">{bi(line, active.noteKo!.split('\n')[i])}</p>
            ))}
          </div>
        )}

        <div className="bh-card-section">
          <p className="bh-card-label">{bi(active.testsLabelZh, active.testsLabelKo)}</p>
          <ul className="bh-list">
            {active.tests.map((item, i) => (
              <li key={i}>{bi(item.zh, item.ko)}</li>
            ))}
          </ul>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{bi(active.directionLabelZh, active.directionLabelKo)}</p>
          <ul className="bh-list">
            {active.direction.map((item, i) => (
              <li key={i}>{bi(item.zh, item.ko)}</li>
            ))}
          </ul>
        </div>

        <div className="bh-card-section">
          <p className="bh-card-label">{bi('相关准备文档', '관련 준비문서')}</p>
          <div className="bh-doc-buttons">
            {active.docKeys.map(key => (
              <DocButton key={key} docKey={key} onClick={handleDocClick} />
            ))}
            <DocButton docKey="wechatConsult" onClick={handleDocClick} />
          </div>
        </div>

        {active.extraDisclaimerZh && active.extraDisclaimerKo && (
          <div className="bh-disclaimer">
            {active.extraDisclaimerZh.split('\n').map((line, i) => (
              <p key={i}>{bi(line, active.extraDisclaimerKo!.split('\n')[i])}</p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
