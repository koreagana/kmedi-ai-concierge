import { useApp } from '../../contexts/AppContext'
import {
  CUSTOM_PLAN_SECTION,
  JOURNEY_ACTS,
  JOURNEY_HEADING,
  JOURNEY_SUBHEADING,
  JOURNEY_TRUST,
} from '../../data/customPlanContent'
import { translations } from '../../data/translations'

/** 定制医疗旅游方案 카테고리 본문 — ai-kmedi.com의 CustomPlanContent(빛줄기 타임라인)와 같은 내용을
    Editorial 요소로: 소개 문단 → 3막(来韩前·在韩国·回国后) 번호 목록 → 확인 사항 박스. */
export default function EditorialCustomPlan() {
  const { lang } = useApp()
  const t = translations[lang]
  let n = 0

  return (
    <>
      <hr className="major" />
      <h2>{CUSTOM_PLAN_SECTION.subCopy[lang]}</h2>
      <div className="ed-prose">
        {CUSTOM_PLAN_SECTION.desc[lang].split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <hr className="major" />
      <h2>{JOURNEY_HEADING[lang]}</h2>
      <p className="ed-page-tag">{JOURNEY_SUBHEADING[lang]}</p>
      <div className="ed-journey">
        {JOURNEY_ACTS.map((act) => (
          <div key={act.tone} className={`ed-journey-act ed-journey-act--${act.tone}`}>
            <h3>{act.label[lang]}</h3>
            <ol className="ed-steps">
              {act.steps.map((s) => {
                n += 1
                return (
                  <li key={n}>
                    <span className="ed-step-num">{n}</span>
                    <strong>{s.title[lang]}</strong>
                    <span className="ed-step-body">{s.desc[lang]}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
      <ul className="ed-checks">
        {JOURNEY_TRUST.map((line, i) => <li key={i}>{line[lang]}</li>)}
      </ul>

      <hr className="major" />
      <div className="box">
        <h3>{t.heroPrefTitle}</h3>
        <ul className="ed-tags">{t.heroPrefChips.map((c) => <li key={c}>{c}</li>)}</ul>
        <ul className="ed-tags ed-tags--muted">{t.heroRegionChips.map((c) => <li key={c}>{c}</li>)}</ul>
        <p>{t.heroPrefNote}</p>
        <h3>{t.heroTrustTitle}</h3>
        <ul className="ed-checks">
          {t.heroTrustLines.split('\n').map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </div>
    </>
  )
}
