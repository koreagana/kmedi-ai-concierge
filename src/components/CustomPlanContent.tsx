import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
} from '../data/customPlanContent'
import { translations } from '../data/translations'
import type { LangCode } from '../data/translations'
import type { CustomPlanTextSection } from '../data/customPlanContent'
import TtsButton from './TtsButton'
import CustomPlanSystemDiagram from './CustomPlanSystemDiagram'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

function TextSection({ section, lang }: { section: CustomPlanTextSection; lang: LangCode }) {
  return (
    <motion.div {...fadeUp} className="bh-card" style={{ margin: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <p className="bh-card-title">{pick(section.title, lang)}</p>
        <TtsButton text={`${pick(section.title, lang)}\n\n${pick(section.body, lang)}`} lang={lang} />
      </div>
      {pick(section.body, lang).split('\n\n').map((para, i) => (
        <p key={i} className="bh-card-text" style={{ marginTop: i > 0 ? 10 : 0 }}>{para}</p>
      ))}
    </motion.div>
  )
}

export default function CustomPlanContent() {
  const { lang } = useApp()
  const t = translations[lang]
  const [expanded, setExpanded] = useState(false)

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

      {/* ── Safety disclaimer ── */}
      <div className="bh-safety">
        {CUSTOM_PLAN_SECTION.safety.map((line, i) => (
          <p key={i} className="bh-safety-line">{pick(line, lang)}</p>
        ))}
      </div>

      {/* ── [작업 1] SVG system diagram ── */}
      <CustomPlanSystemDiagram lang={lang} />

      {/* ── [작업 2] Client type cards — always visible ── */}
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

      {/* ── [작업 3] "더보기" toggle ── */}
      <div style={{ padding: '16px 20px 4px', display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          style={{
            background: 'transparent',
            border: '1.5px solid var(--border-blue, #CBD5E1)',
            borderRadius: 20,
            padding: '8px 26px',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-muted, #64748B)',
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          {expanded ? t.aiScriptCollapse : t.aiScriptExpand}
          {' '}
          {expanded ? '▴' : '▾'}
        </button>
      </div>

      {/* ── [작업 3] Collapsible detailed content ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="custom-plan-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {/* 6 coordination services with full desc */}
            <p className="bh-subsection-title">{pick(CUSTOM_PLAN_COORDINATION_TITLE, lang)}</p>
            <div className="bh-mini-cards">
              {CUSTOM_PLAN_COORDINATION_CARDS.map((card, i) => (
                <motion.div key={i} {...fadeUp} className="bh-mini-card">
                  <p className="bh-mini-card-title">{pick(card.title, lang)}</p>
                  <p className="bh-mini-card-desc">{pick(card.desc, lang)}</p>
                </motion.div>
              ))}
            </div>

            {/* Registered agency */}
            <p className="bh-subsection-title">{pick(CUSTOM_PLAN_REGISTRATION.title, lang)}</p>
            <TextSection section={CUSTOM_PLAN_REGISTRATION} lang={lang} />

            {/* Serious illness referral */}
            <p className="bh-subsection-title">{pick(CUSTOM_PLAN_REFERRAL.title, lang)}</p>
            <TextSection section={CUSTOM_PLAN_REFERRAL} lang={lang} />

            {/* Aesthetics hospital matching */}
            <p className="bh-subsection-title">{pick(CUSTOM_PLAN_AESTHETICS_MATCHING.title, lang)}</p>
            <TextSection section={CUSTOM_PLAN_AESTHETICS_MATCHING} lang={lang} />

            {/* Service process steps */}
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

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Closing text (always visible) ── */}
      <p className="bh-closing-text">{pick(CUSTOM_PLAN_SECTION.closing, lang)}</p>

      {/* [작업 4] wechat consult button removed — FloatingChatButton covers this */}
    </div>
  )
}
