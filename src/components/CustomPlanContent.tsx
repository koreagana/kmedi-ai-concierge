import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { type LocalizedText } from '../data/bigHealthKeywords'
import {
  CUSTOM_PLAN_SECTION,
  CUSTOM_PLAN_COORDINATION_TITLE,
  CUSTOM_PLAN_COORDINATION_CARDS,
  CUSTOM_PLAN_REGISTRATION,
  CUSTOM_PLAN_REFERRAL,
  CUSTOM_PLAN_AESTHETICS_MATCHING,
  CUSTOM_PLAN_CLIENT_TYPES_TITLE,
  CUSTOM_PLAN_CLIENT_CARDS,
  CUSTOM_PLAN_PROCESS_TITLE,
  CUSTOM_PLAN_STEPS,
  CUSTOM_PLAN_DOC_BUTTONS,
} from '../data/customPlanContent'
import type { LangCode } from '../data/translations'
import type { CustomPlanTextSection } from '../data/customPlanContent'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

function TextSection({ section, lang }: { section: CustomPlanTextSection; lang: LangCode }) {
  return (
    <motion.div {...fadeUp} className="bh-card" style={{ margin: '0 20px' }}>
      <p className="bh-card-title">{pick(section.title, lang)}</p>
      {pick(section.body, lang).split('\n\n').map((para, i) => (
        <p key={i} className="bh-card-text" style={{ marginTop: i > 0 ? 10 : 0 }}>{para}</p>
      ))}
    </motion.div>
  )
}

export default function CustomPlanContent() {
  const { lang } = useApp()
  const wechat = CUSTOM_PLAN_DOC_BUTTONS.wechatConsult

  return (
    <div className="bh-section">
      <p className="bh-section-title">{pick(CUSTOM_PLAN_SECTION.title, lang)}</p>
      <p className="bh-section-subcopy">{pick(CUSTOM_PLAN_SECTION.subCopy, lang)}</p>
      {pick(CUSTOM_PLAN_SECTION.desc, lang).split('\n\n').map((para, i) => (
        <p key={i} className="bh-section-desc">{para}</p>
      ))}

      <div className="bh-safety">
        {CUSTOM_PLAN_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      {/* ── Section 1: what we coordinate ── */}
      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_COORDINATION_TITLE, lang)}</p>
      <div className="bh-mini-cards">
        {CUSTOM_PLAN_COORDINATION_CARDS.map((card, i) => (
          <motion.div key={i} {...fadeUp} className="bh-mini-card">
            <p className="bh-mini-card-title">{pick(card.title, lang)}</p>
            <p className="bh-mini-card-desc">{pick(card.desc, lang)}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Section 2: registered agency ── */}
      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_REGISTRATION.title, lang)}</p>
      <TextSection section={CUSTOM_PLAN_REGISTRATION} lang={lang} />

      {/* ── Section 3: serious illness referral ── */}
      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_REFERRAL.title, lang)}</p>
      <TextSection section={CUSTOM_PLAN_REFERRAL} lang={lang} />

      {/* ── Section 4: aesthetics hospital matching ── */}
      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_AESTHETICS_MATCHING.title, lang)}</p>
      <TextSection section={CUSTOM_PLAN_AESTHETICS_MATCHING} lang={lang} />

      {/* ── Section 5: plans by client type ── */}
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

      {/* ── Section 6: service process ── */}
      <p className="bh-subsection-title">{pick(CUSTOM_PLAN_PROCESS_TITLE, lang)}</p>
      <div className="bh-steps">
        {CUSTOM_PLAN_STEPS.map((step, i) => (
          <motion.div key={i} {...fadeUp} className="bh-step">
            <span className="bh-step-number">{i + 1}</span>
            <div>
              <p className="bh-step-title">{pick(step.title, lang)}</p>
              <p className="bh-step-desc">{pick(step.desc, lang)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Closing + CTA ── */}
      <p className="bh-closing-text">{pick(CUSTOM_PLAN_SECTION.closing, lang)}</p>

      <div style={{ margin: '16px 20px 4px' }}>
        <button
          type="button"
          className="bh-doc-btn"
          onClick={() => window.open(wechat.target, '_blank', 'noopener,noreferrer')}
        >
          <span>{pick(wechat.label, lang)}</span>
          <span className="bh-doc-btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}
