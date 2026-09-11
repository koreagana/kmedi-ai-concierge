import { useApp } from '../contexts/AppContext'
import { type LocalizedText } from '../data/bigHealthKeywords'
import {
  CUSTOM_PLAN_SECTION,
  JOURNEY_HEADING,
  JOURNEY_SUBHEADING,
  JOURNEY_ACTS,
  JOURNEY_TRUST,
} from '../data/customPlanContent'
import type { LangCode } from '../data/translations'
import TtsButton from './TtsButton'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

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

      {/* ── 환자 여정 타임라인 ──
          빛줄기가 선을 따라 위에서 아래로 흐르며 시선을 이끈다.
          단계 수가 많지 않아 전체가 한 번에 보이므로 내부 스크롤은 두지 않음. */}
      <div className="jy">
        <p className="jy-title">{pick(JOURNEY_HEADING, lang)}</p>
        <p className="jy-sub">{pick(JOURNEY_SUBHEADING, lang)}</p>

        <div className="jy-line">
          <div className="jy-track"><span className="jy-pulse" /></div>

          {JOURNEY_ACTS.map((act) => (
            <div className={`jy-act jy-act--${act.tone}`} key={act.tone}>
              <span className="jy-label">{pick(act.label, lang)}</span>
              {act.steps.map((step, i) => (
                <div className="jy-step" key={i}>
                  <span className="jy-dot" />
                  <div className="jy-card">
                    <b>{pick(step.title, lang)}</b>
                    <span>{pick(step.desc, lang)}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="jy-trust">
          {JOURNEY_TRUST.map((line, i) => (
            <p key={i}>✓ {pick(line, lang)}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
