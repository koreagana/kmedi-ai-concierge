import { useApp } from '../../contexts/AppContext'
import { langPath } from '../../skin'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import partners from '../../data/partnersPublic.generated.json'
import { edLink } from './edLink'

/** 全程服务 · 合作医疗机构 (/zh/partners) — kmedispring.com 전용.
    위: 사용자가 쓴 "全程陪伴您的韩国诊疗" 8개 항목(원래 ai-kmedi 메인의 了解全程服务 접힘 패널 내용).
    아래: 협약 날인한 협력기관 — 대학병원은 전부, 그 외는 명부에서 show_on_site로 고른 곳만
    (scripts/gen-public-partners.mjs가 걸러서 이름·분류·도시만 넘겨준다). 병원 홈페이지 링크는 걸지 않는다. */

type L = { zh: string; en: string }

const INTRO: { title: L; lead: L[] } = {
  title: { zh: '全程陪伴您的韩国诊疗', en: 'With You Through Every Step of Your Care in Korea' },
  lead: [
    { zh: '我们不只是介绍医院。', en: "We don't just introduce hospitals." },
    { zh: '从预约前到诊疗后，为您衔接每一个必要环节。', en: 'From before your booking to after your treatment, we connect every step you need.' },
  ],
}

const SERVICES: { icon: string; title: L; body: L }[] = [
  {
    icon: 'fa-hospital',
    title: { zh: '为您寻找合适的医院', en: 'Finding the Right Hospital for You' },
    body: { zh: '了解您的诊疗目的、期望结果和预算，为您推荐合适的医疗机构。', en: 'We learn your goals, the results you hope for and your budget, then recommend suitable medical institutions.' },
  },
  {
    icon: 'fa-calendar-check',
    title: { zh: '从预约到日程协调', en: 'From Booking to Scheduling' },
    body: { zh: '从预约申请、变更·取消，到最终诊疗日程确认，我们与医院直接协调。', en: 'From booking requests, changes and cancellations to confirming your final schedule, we coordinate directly with the hospital.' },
  },
  {
    icon: 'fa-comments',
    title: { zh: '与医院准确沟通', en: 'Clear Communication with the Hospital' },
    body: { zh: '提前确认所需材料和信息，将诊疗前的疑问和患者信息准确传达给医院。', en: 'We confirm the documents and information needed in advance, and pass your questions and details to the hospital accurately.' },
  },
  {
    icon: 'fa-language',
    title: { zh: '翻译与诊疗陪同', en: 'Interpretation & Accompaniment' },
    body: { zh: '从咨询、诊疗到处方和注意事项，必要时提供中文翻译和全程陪同。', en: 'From consultation and treatment to prescriptions and aftercare instructions, we provide interpretation and stay with you when needed.' },
  },
  {
    icon: 'fa-notes-medical',
    title: { zh: '诊疗结束后，服务继续', en: 'Support Continues After Treatment' },
    body: { zh: '协助您与医院沟通处方、术后管理日程，并处理后续疑问和不便事项。', en: 'We help you communicate with the hospital about prescriptions and aftercare schedules, and follow up on any questions or concerns.' },
  },
  {
    icon: 'fa-suitcase-rolling',
    title: { zh: '在韩期间的必要协助', en: 'Help During Your Stay in Korea' },
    body: { zh: '提供住宿、交通、生活基本信息、紧急联系方式等必要协助。', en: 'Accommodation, transport, everyday essentials and emergency contacts — we help with what you need.' },
  },
  {
    icon: 'fa-hands-helping',
    title: { zh: '出现问题时，我们居中协调', en: 'We Step In When Issues Arise' },
    body: { zh: '预约、翻译等服务问题由我们直接确认；医疗相关问题则协助医院与患者准确沟通。', en: 'We handle service issues such as bookings or interpretation directly; for medical matters, we help the hospital and you communicate clearly.' },
  },
  {
    icon: 'fa-user-shield',
    title: { zh: '个人信息也按正规流程管理', en: 'Your Personal Information, Properly Managed' },
    body: { zh: '健康信息、照片、检查结果等，在获得同意后，仅在必要范围内传递和管理。', en: 'Health information, photos and test results are shared and managed only as far as necessary, and only with your consent.' },
  },
]

/** 명부의 분류(한국어) → 화면 제목, 보여줄 순서 */
const CATEGORY: { key: string; label: L }[] = [
  { key: '대학병원', label: { zh: '大学医院 · 上级综合医院', en: 'University & Tertiary Hospitals' } },
  { key: '성형외과', label: { zh: '整形外科', en: 'Plastic Surgery' } },
  { key: '피부과·의원', label: { zh: '皮肤科 · 医美诊所', en: 'Dermatology & Aesthetic Clinics' } },
  { key: '복합의원', label: { zh: '综合诊所', en: 'Multi-specialty Clinics' } },
  { key: '치과·구강악안면외과', label: { zh: '口腔颌面外科', en: 'Oral & Maxillofacial Surgery' } },
]

type Partner = (typeof partners)[number]

export default function EditorialPartners() {
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
        <span>{isZh ? '全程服务 · 合作医疗机构' : 'Our Services & Partners'}</span>
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

      <hr className="major" />
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{isZh ? '微信咨询' : 'Ask on WeChat'}</a></li>
      </ul>
    </section>
  )
}
