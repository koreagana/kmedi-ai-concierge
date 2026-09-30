import { useRef, useState, type MouseEvent } from 'react'
import { useApp } from '../../contexts/AppContext'
import { translations } from '../../data/translations'
import { categories, type Category } from '../../data/categories'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import { getHeroTreatmentByChip, type HeroTreatmentInfo } from '../../data/heroTreatments'
import HeroTreatmentSheet from '../../components/HeroTreatmentSheet'
import { NetworkCityMap } from '../../components/HomePage'

/** kmedispring.com 메인 — 옛 index.html의 뼈대(#banner → header.major 섹션들 → .posts/.features)에
    ai-kmedi.com 메인의 내용(히어로 영상·견적 버튼, 카테고리 8개, AI 상담사, 서비스 네트워크)을 담는다.
    문구는 전부 translations/categories에서 가져와서 ai-kmedi.com과 항상 같은 내용을 보여준다. */

// medical-tourism(3晚4天方案)은 categories에 heroImage가 없다 — 옛 사이트 tour 사진 중 글자 없는
// 도심 스카이라인 칸만 잘라 쓴다(나머지 칸은 AI 생성 간판 글자가 깨져 있어서 제외).
const PACKAGE_IMAGE = '/editorial/seoul-skyline.jpg'

export default function EditorialHome() {
  const { lang, goToCategory, goToPackage, goToQuote, goToSurgery } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'

  const videoRef = useRef<HTMLVideoElement>(null)
  const [soundOn, setSoundOn] = useState(false)
  const [activeSheet, setActiveSheet] = useState<HeroTreatmentInfo | null>(null)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = soundOn
    if (!soundOn) { v.currentTime = 0; v.volume = 1; v.play().catch(() => {}) }
    setSoundOn(!soundOn)
  }

  const go = (fn: () => void) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    fn()
  }

  const catHref = (c: Category) => (c.id === 'medical-tourism' ? `/${lang}?page=package` : `/${lang}/${c.id}`)
  const catGo = (c: Category) => (c.id === 'medical-tourism' ? goToPackage : () => goToCategory(c.id))

  const networkCards = [
    { icon: 'fa-shield-alt', title: t.networkCard1Title, desc: t.networkCard1Desc, note: t.networkCard1Reg,
      action: { label: t.networkCard1ExpandBadge, open: serviceOpen, onClick: () => setServiceOpen((v) => !v) } },
    { icon: 'fa-globe-asia', title: t.networkCard2Title, desc: t.networkCard2Desc, note: t.networkCard2Reg },
    { icon: 'fa-calendar-alt', title: t.networkCard3Title, desc: t.networkCard3Desc,
      action: { label: isZh ? '查看详情' : 'View Details', onClick: goToPackage } },
    { icon: 'fa-project-diagram', title: t.networkCard4Title, desc: t.networkCard4Desc,
      action: { label: isZh ? '医疗网络' : 'Medical Network', open: mapOpen, onClick: () => setMapOpen((v) => !v) } },
  ]

  return (
    <>
      {/* Banner — 왼쪽 브랜드 소개 + 견적 버튼, 오른쪽 AI 컨시어지 스튜디오 영상 */}
      <section id="banner" className="alt">
        <div className="content">
          <header>
            <h1>{t.brandName}</h1>
            <h2 className="ed-banner-sub">{t.heroSeoHeadline}</h2>
          </header>
          <p className="brand-desc">
            {t.aboutDesc.split('\n').map((line, i) => <span key={i} className="ed-desc-line">{line}</span>)}
          </p>
          <ul className="actions">
            <li>
              <a href={`/${lang}/quote`} className="button primary" onClick={go(() => goToQuote())}>{t.quoteBtnTitle}</a>
            </li>
            <li>
              <a href={`/${lang}/surgery-price`} className="button" onClick={go(goToSurgery)}>{t.surgeryBtnTitle}</a>
            </li>
          </ul>
        </div>
        <span className="image object hero-media ed-hero-media">
          <video
            ref={videoRef}
            src={isZh ? '/studio.mp4' : '/studio_eng.mp4'}
            poster="/studio-hero.png"
            autoPlay
            muted
            loop
            playsInline
          />
          <button
            type="button"
            className="ed-sound-btn"
            onClick={toggleSound}
            aria-label={soundOn ? (isZh ? '点击静音' : 'Mute') : (isZh ? '点击开启声音' : 'Enable sound')}
          >
            <span className={`icon solid ${soundOn ? 'fa-volume-up' : 'fa-volume-mute'}`} />
          </button>
        </span>
      </section>

      {/* 专业领域 — 카테고리 8개 (옛 사이트 .posts 2열 그리드 + 카테고리 대표 사진) */}
      <section>
        <header className="major">
          <h2>{t.categoryTitle}</h2>
        </header>

        <div className="ed-hot">
          <span className="ed-hot-label">{t.heroHotLabel}</span>
          {t.heroTreatmentChips.map((chip) => {
            const info = getHeroTreatmentByChip(chip)
            return info
              ? <button key={chip} type="button" className="ed-chip" onClick={() => setActiveSheet(info)}>{chip}</button>
              : <span key={chip} className="ed-chip ed-chip--static">{chip}</span>
          })}
        </div>
        <HeroTreatmentSheet info={activeSheet} onClose={() => setActiveSheet(null)} />

        <div className="posts">
          {categories.map((c) => (
            <article key={c.id}>
              <a href={catHref(c)} className="image" onClick={go(catGo(c))}>
                <img src={c.heroImage ?? PACKAGE_IMAGE} alt={isZh ? c.zh : c.en} loading="lazy" />
              </a>
              <h3>{isZh ? c.zh : c.en}</h3>
              <p className="ed-post-tag">{isZh ? c.tagZh : c.tagEn}</p>
              <p>{isZh ? c.scriptSummaryZh : c.scriptSummaryEn}</p>
              <ul className="actions">
                <li><a href={catHref(c)} className="button" onClick={go(catGo(c))}>{isZh ? '了解更多' : 'Learn More'}</a></li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* AI 상담사 — 옛 .features(마름모 아이콘) 자리에 상담사 사진 */}
      <section>
        <header className="major">
          <h2>{t.conciergeTitle}</h2>
        </header>
        <div className="features ed-wide ed-concierge">
          {[
            { name: t.concierge1Name, title: t.concierge1Title, spec: t.concierge1Specialty, btn: t.concierge1Btn, img: '/concierge_image/lijing_800.png' },
            { name: t.concierge2Name, title: t.concierge2Title, spec: t.concierge2Specialty, btn: t.concierge2Btn, img: '/concierge_image/kimhyunwoo_800.png' },
          ].map((p) => (
            <article key={p.name}>
              <span className="ed-avatar"><img src={p.img} alt={p.name} loading="lazy" /></span>
              <div className="content">
                <h3>{p.name}</h3>
                <p className="ed-concierge-title">{p.title}</p>
                <p>{p.spec}</p>
                <ul className="actions">
                  <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary small">{p.btn}</a></li>
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="ed-note">
          {t.conciergePrivacyNotice}{' '}
          <a href={isZh ? '/zh/privacy' : '/en/privacy'}>{t.conciergePrivacyLink}</a>
        </p>
      </section>

      {/* 서비스 네트워크 — 옛 品牌理念 .features 마름모 아이콘 그대로 */}
      <section>
        <header className="major">
          <h2>{isZh ? '服务与资质' : 'Services & Credentials'}</h2>
        </header>
        <div className="features ed-wide">
          {networkCards.map((c) => (
            <article key={c.title}>
              <span className={`icon solid ${c.icon}`} />
              <div className="content">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                {c.note && <p className="ed-reg-note">{c.note}</p>}
                {c.action && (
                  <ul className="actions">
                    <li>
                      <button type="button" className="button small" onClick={c.action.onClick} aria-expanded={c.action.open}>
                        {c.action.label}{c.action.open === undefined ? ' ›' : c.action.open ? ' ▴' : ' ▾'}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {serviceOpen && (
          <div className="ed-panel">
            <h3>{t.networkCard1ExpandTitle}</h3>
            {t.networkCard1ExpandIntro.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            <ul className="ed-service-list">
              {t.networkCard1Items.map((item) => (
                <li key={item.title}><strong>{item.title}</strong><span>{item.desc}</span></li>
              ))}
            </ul>
          </div>
        )}
        {mapOpen && (
          <div className="ed-panel ed-map-panel">
            <h3>{t.networkCard4ExpandTitle}</h3>
            <NetworkCityMap lang={lang} />
            <p className="ed-note">{t.networkCard4Caption}</p>
          </div>
        )}
      </section>
    </>
  )
}
