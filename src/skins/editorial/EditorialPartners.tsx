import { useApp } from '../../contexts/AppContext'
import { langPath } from '../../skin'
import { WECHAT_BIZ_URL } from '../../data/contacts'
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
    title: { zh: '找对医院', en: 'The Right Hospital' },
    body: { zh: '根据您的诊疗目的和预算，推荐合适的医疗机构。', en: 'We recommend suitable medical institutions based on your goals and budget.' },
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
  zh: '交通与住宿由客户自行安排，费用自理（含翻译陪同期间的交通费）。3晚4天方案已包含接送机。',
  en: 'Transport and accommodation are arranged and paid for by clients, including transport during interpreter escort. Airport transfers are included in the 3N4D Package.',
}
const FINE: L = {
  zh: '服务问题由我们直接确认；健康信息与照片仅在您同意后，于必要范围内使用。',
  en: 'We resolve service issues directly; your health information and photos are used only with your consent and only as needed.',
}

/** 명부의 분류(한국어) → 화면 제목, 보여줄 순서 */
const CATEGORY: { key: string; label: L }[] = [
  { key: '대학병원', label: { zh: '大学医院 · 上级综合医院', en: 'University & Tertiary Hospitals' } },
  { key: '성형외과', label: { zh: '整形外科', en: 'Plastic Surgery' } },
  { key: '피부과·의원', label: { zh: '皮肤科 · 医美诊所', en: 'Dermatology & Aesthetic Clinics' } },
  { key: '복합의원', label: { zh: '综合诊所', en: 'Multi-specialty Clinics' } },
  { key: '치과·구강악안면외과', label: { zh: '口腔颌面外科', en: 'Oral & Maxillofacial Surgery' } },
]

type Partner = (typeof partners)[number]

/** servicesOnly: 사이드바 메뉴의 就医协调服务(/services) — 위의 4개 항목만. 협력기관 목록(/partners)은
    메뉴에 드러내지 않고 了解全程服务 버튼·직접 링크로만 들어오게 한다(사용자 결정 2026-10-02). */
export default function EditorialPartners({ servicesOnly = false }: { servicesOnly?: boolean }) {
  const { lang, goHome } = useApp()
  const isZh = lang === 'zh'
  const groups = CATEGORY
    .map((c) => ({ ...c, items: (partners as Partner[]).filter((p) => p.category === c.key) }))
    .filter((g) => g.items.length > 0)

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

      {!servicesOnly && <>
      <hr className="major" />
      <h2>{isZh ? '合作医疗机构' : 'Partner Medical Institutions'}</h2>
      <p className="ed-page-tag">
        {isZh ? '以下为汉江春天的合作医疗机构，合作网络持续扩大中。' : 'Our partner medical institutions — and our network keeps growing.'}
      </p>

      {groups.map((g) => (
        <div key={g.key} className="ed-partner-group">
          <h3>{g.label[lang]}</h3>
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
        {isZh ? '具体就诊医院将根据您的诊疗目的，与医院确认后为您安排。' : 'Your specific hospital is arranged after confirming your treatment goals with the hospital.'}
      </p>
      </>}

      <hr className="major" />
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{isZh ? '微信咨询' : 'Ask on WeChat'}</a></li>
      </ul>
    </section>
  )
}
