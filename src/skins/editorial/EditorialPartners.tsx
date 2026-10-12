import { useApp } from '../../contexts/AppContext'
import { langPath } from '../../skin'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import { JOURNEY_ACTS, JOURNEY_HEADING, JOURNEY_SUBHEADING, JOURNEY_TRUST } from '../../data/customPlanContent'
import partners from '../../data/partnersPublic.generated.json'
import { edLink } from './edLink'

/** 就医协调服务 · 合作医疗机构 (/zh/partners) — kmedispring.com 전용.
    위: 의료 관련 4개 항목 + 비용 안내 박스(2026-10 의료 외 서비스 제외 후 8개→4개로 정리).
    아래: 협약 날인한 협력기관 — 대학병원은 전부, 그 외는 명부에서 show_on_site로 고른 곳만
    (scripts/gen-public-partners.mjs가 걸러서 이름·분류·도시만 넘겨준다). 병원 홈페이지 링크는 걸지 않는다. */

type L = { zh: string; en: string }

const INTRO: { title: L; lead: L[] } = {
  title: { zh: '专注医疗，让韩国就医更顺利', en: 'Focused on Your Care in Korea' },
  lead: [
    { zh: '我们只做与诊疗有关的事。', en: 'We only do what relates to your medical care.' },
  ],
}

/** 의료 외 서비스(차량·숙소)는 하지 않는다(2026-10) — 4칸으로 줄이고 비용 안내는 아래 NOTE 박스로 따로 */
const SERVICES: { icon: string; title: L; body: L }[] = [
  {
    icon: 'fa-hospital',
    title: { zh: '医院和医生', en: 'Hospital & Doctor' },
    body: { zh: '根据您的诊疗目的和预算，推荐合适的医院与医生。', en: 'We recommend the right hospital and doctor based on your goals and budget.' },
  },
  {
    icon: 'fa-calendar-check',
    title: { zh: '约好时间', en: 'The Right Time' },
    body: { zh: '预约、改期、取消，由我们直接与医院协调。', en: 'Bookings, changes and cancellations — coordinated directly with the hospital.' },
  },
  {
    icon: 'fa-language',
    title: { zh: '准确沟通', en: 'Clear Communication' },
    body: { zh: '诊前确认所需材料，就诊时提供中文翻译与陪同。', en: 'We confirm documents before your visit and interpret for you on the day.' },
  },
  {
    icon: 'fa-notes-medical',
    title: { zh: '诊后跟进', en: 'Follow-up After Treatment' },
    body: { zh: '处方、复诊与术后疑问，回国后也可以随时问我们。', en: "Prescriptions, follow-up visits and aftercare questions — ask us anytime, even after you're home." },
  },
]

const NOTE: L = {
  zh: '交通与住宿由客户自行安排，费用自理（含翻译陪同期间的交通费）。',
  en: 'Transport and accommodation are arranged and paid for by clients, including transport during interpreter escort.',
}
const FINE: L = {
  zh: '服务问题由我们直接确认；健康信息与照片仅在您同意后，于必要范围内使用。',
  en: 'We resolve service issues directly; your health information and photos are used only with your consent and only as needed.',
}

type Partner = (typeof partners)[number]

/** 화면 묶음 3개, 보여줄 순서. 1~2곳짜리 묶음이 생기면 목록이 듬성해 보여서(2026-10-12) 명부 분류를 합쳐 보여준다:
    구강악안면외과 → 整形, 복합의원은 아래 GROUP_OF로 개별 지정(없으면 皮肤科). */
const CATEGORY: { key: string; label: L; note?: L }[] = [
  {
    key: '대학병원',
    // 5곳 모두 대학 부속(서울대·성균관대·차의과학대)이지만 상급종합병원(복지부 지정)은 일부라 제목은 大学附属医院으로.
    // 三甲은 중국 제도 — 실제 상급종합병원인 곳에만 "相当于三甲"을 붙인다. 지정 현황이 바뀌면 이 문장도 고칠 것.
    label: { zh: '大学附属医院', en: 'University-Affiliated Hospitals' },
    note: {
      zh: '其中盆唐首尔大学医院、三星首尔医院、盆唐CHA医院为韩国上级综合医院，相当于国内三甲医院。',
      en: "Of these, Seoul National University Bundang Hospital, Samsung Medical Center and CHA Bundang Medical Center are designated tertiary general hospitals — Korea's highest tier.",
    },
  },
  { key: '성형외과', label: { zh: '整形外科 · 口腔颌面外科', en: 'Plastic & Oral-Maxillofacial Surgery' } },
  { key: '피부과·의원', label: { zh: '皮肤科 · 抗衰老', en: 'Dermatology & Anti-Aging' } },
]
const GROUP_OF: Record<string, string> = {
  'PH-040': '성형외과', // LIENJANG整形外科皮肤科
}
const groupOf = (p: Partner) =>
  GROUP_OF[p.id] ?? (p.category === '치과·구강악안면외과' ? '성형외과' : p.category === '복합의원' ? '피부과·의원' : p.category)

const CITY_ORDER = ['首尔', '城南', '大邱', '济州']

/** servicesOnly: 사이드바 메뉴의 就医协调服务(/services) — 위의 4개 항목만. 협력기관 목록(/partners)은
    메뉴에 드러내지 않고 了解全程服务 버튼·직접 링크로만 들어오게 한다(사용자 결정 2026-10-02). */
export default function EditorialPartners({ servicesOnly = false }: { servicesOnly?: boolean }) {
  const { lang, goHome } = useApp()
  const isZh = lang === 'zh'
  const all = partners as Partner[]
  const groups = CATEGORY
    .map((c) => ({ ...c, items: all.filter((p) => groupOf(p) === c.key) }))
    .filter((g) => g.items.length > 0)
  // 도시 표기: 명부 도시 중 실제로 있는 곳만, 정해둔 순서대로
  const cities = CITY_ORDER.flatMap((zh) => {
    const c = all.find((p) => p.city.zh === zh)?.city
    return c ? [isZh ? c.zh : c.en] : []
  })

  return (
    <section className="ed-page ed-partners">
      <p className="ed-crumb">
        <a {...edLink(langPath(lang), goHome)}>{isZh ? '首页' : 'Home'}</a>
        <span aria-hidden="true"> / </span>
        <span>{servicesOnly ? (isZh ? '就医协调服务' : 'Medical Coordination') : (isZh ? '就医协调服务 · 合作医疗机构' : 'Medical Coordination & Partners')}</span>
      </p>

      <header className="main">
        <h1>{INTRO.title[lang]}</h1>
      </header>
      <div className="ed-prose ed-partners-lead">
        {INTRO.lead.map((l, i) => <p key={i}>{l[lang]}</p>)}
      </div>

      <div className="ed-svc-grid">
        {SERVICES.map((s) => (
          <article key={s.icon}>
            <span className={`ed-svc-icon icon solid ${s.icon}`} aria-hidden="true" />
            <div>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="ed-svc-note">{NOTE[lang]}</p>
      <p className="ed-svc-fine">{FINE[lang]}</p>

      {/* 就医流程 — 예전 定制医疗旅游方案 페이지 본문(2026-10-12 이 페이지로 합침) */}
      <hr className="major" />
      <h2>{JOURNEY_HEADING[lang]}</h2>
      <p className="ed-page-tag">{JOURNEY_SUBHEADING[lang]}</p>
      <div className="ed-journey">
        {JOURNEY_ACTS.map((act, ai) => {
          const start = JOURNEY_ACTS.slice(0, ai).reduce((sum, a) => sum + a.steps.length, 0)
          return (
            <div key={act.tone} className={`ed-journey-act ed-journey-act--${act.tone}`}>
              <h3>{act.label[lang]}</h3>
              <ol className="ed-steps">
                {act.steps.map((s, si) => (
                  <li key={si}>
                    <span className="ed-step-num">{start + si + 1}</span>
                    <strong>{s.title[lang]}</strong>
                    <span className="ed-step-body">{s.desc[lang]}</span>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>
      <ul className="ed-checks">
        {JOURNEY_TRUST.map((line, i) => <li key={i}>{line[lang]}</li>)}
      </ul>

      {!servicesOnly && <>
      <hr className="major" />
      <h2>{isZh ? '合作医疗机构' : 'Partner Medical Institutions'}</h2>
      <p className="ed-partner-count">
        <strong>{all.length}</strong>
        <span>{isZh ? '家合作医疗机构' : 'partner institutions'}</span>
        <em>{cities.join(' · ')}</em>
      </p>

      {groups.map((g) => (
        <div key={g.key} className="ed-partner-group">
          <h3>{g.label[lang]}</h3>
          {g.note && <p className="ed-partner-note">{g.note[lang]}</p>}
          <ul className="ed-partner-grid">
            {g.items.map((p) => (
              <li key={p.id} className="ed-partner-card">
                {p.logo ? (
                  <img src={p.logo} alt={isZh ? p.name.zh : p.name.en} loading="lazy" />
                ) : (
                  <>
                    <strong>{isZh ? p.name.zh : p.name.en}</strong>
                    <span className="ed-partner-sub">{isZh ? p.name.en : p.name.ko}</span>
                  </>
                )}
                {(p.place?.[lang] || (isZh ? p.city.zh : p.city.en)) && (
                  <span className="ed-partner-city">
                    <span className="icon solid fa-map-marker-alt" aria-hidden="true" /> {p.place?.[lang] ?? (isZh ? p.city.zh : p.city.en)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="ed-small">
        {isZh
          ? '名单以外的医院，也可根据您的需求协助咨询与预约。具体就诊医院将根据您的诊疗目的，与医院确认后为您安排。'
          : 'We can also help with consultations and bookings at hospitals not listed here. Your specific hospital is arranged after confirming your treatment goals with the hospital.'}
      </p>
      </>}

      <hr className="major" />
      <p className="ed-cta-lead">{isZh ? '还不确定选择哪个项目？告诉我们您的需求，我们帮您一起理清方向。' : "Not sure which treatment to choose? Tell us what you need and we'll help you sort it out."}</p>
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{isZh ? '微信咨询' : 'Ask on WeChat'}</a></li>
      </ul>
    </section>
  )
}
