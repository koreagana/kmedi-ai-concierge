import { useEffect, useRef } from 'react'
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

/* 흐르는 빛과 점 반짝임의 타이밍 — CSS의 .jy-pulse 값과 반드시 같아야 함 */
const BEAM_CYCLE_S = 4
const BEAM_HEIGHT = 110
const BEAM_START = 120

export default function CustomPlanContent() {
  const { lang } = useApp()
  const lineRef = useRef<HTMLDivElement>(null)

  /* 빛줄기가 각 점을 지나는 순간에 맞춰 점이 반짝이도록 지연시간을 계산한다.
     카드 높이가 언어·화면폭에 따라 달라지므로 값을 고정하지 않고 실제 위치를 재서 맞춘다. */
  useEffect(() => {
    const root = lineRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sync = () => {
      const track = root.querySelector<HTMLElement>('.jy-track')
      if (!track) return
      const trackTop = track.getBoundingClientRect().top
      const travel = track.offsetHeight + BEAM_START
      root.querySelectorAll<HTMLElement>('.jy-dot').forEach((dot) => {
        const r = dot.getBoundingClientRect()
        const centerY = r.top + r.height / 2 - trackTop
        // 빛 중심이 이 점에 닿는 시각 (jy-run 키프레임 기준)
        const t = (BEAM_CYCLE_S * (centerY + BEAM_START - BEAM_HEIGHT / 2)) / travel
        dot.style.animationDelay = `${((t % BEAM_CYCLE_S) + BEAM_CYCLE_S) % BEAM_CYCLE_S}s`
      })
    }

    sync()
    // 웹폰트가 늦게 올라오면 높이가 바뀌므로 한 번 더 맞춘다
    document.fonts?.ready?.then(sync).catch(() => {})
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [lang])

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

        <div className="jy-line" ref={lineRef}>
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
