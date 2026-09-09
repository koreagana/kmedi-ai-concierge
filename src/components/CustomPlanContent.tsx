import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { type LocalizedText } from '../data/bigHealthKeywords'
import {
  CUSTOM_PLAN_SECTION,
  CUSTOM_PLAN_CLIENT_TYPES_TITLE,
  CUSTOM_PLAN_CLIENT_CARDS,
} from '../data/customPlanContent'
import type { LangCode } from '../data/translations'
import TtsButton from './TtsButton'
import CustomPlanSystemDiagram from './CustomPlanSystemDiagram'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

export default function CustomPlanContent() {
  const { lang } = useApp()

  return (
    <div className="bh-section">

      {/* ── Intro ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, padding: '26px 20px 8px' }}>
        <p className="bh-section-title" style={{ padding: 0 }}>{pick(CUSTOM_PLAN_SECTION.title, lang)}</p>
        <TtsButton
          text={`${pick(CUSTOM_PLAN_SECTION.title, lang)}\n\n${pick(CUSTOM_PLAN_SECTION.subCopy, lang)}\n\n${pick(CUSTOM_PLAN_SECTION.desc, lang)}`}
          lang={lang}
        />
      </div>
      <p className="bh-section-subcopy">{pick(CUSTOM_PLAN_SECTION.subCopy, lang)}</p>
      {pick(CUSTOM_PLAN_SECTION.desc, lang).split('\n\n').map((para, i) => (
        <p key={i} className="bh-section-desc">{para}</p>
      ))}

      <CustomPlanSystemDiagram lang={lang} />

      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_CLIENT_TYPES_TITLE, lang)}</p>
      <div className="bh-mini-cards">
        {CUSTOM_PLAN_CLIENT_CARDS.map((card, i) => (
          <motion.div key={i} {...fadeUp} className="bh-mini-card">
            <p className="bh-mini-card-title">{pick(card.title, lang)}</p>
            <p className="bh-client-card-audience">{pick(card.audience, lang)}</p>
            <p className="bh-client-card-focus">{pick(card.serviceFocus, lang)}</p>
          </motion.div>
        ))}
      </div>

      {/* wechat consult button removed — FloatingChatButton covers this */}
    </div>
  )
}
