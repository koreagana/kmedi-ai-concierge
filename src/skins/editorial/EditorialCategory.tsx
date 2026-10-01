import { useApp } from '../../contexts/AppContext'
import { langPath } from '../../skin'
import { getCategoryById } from '../../data/categories'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import { translations } from '../../data/translations'
import { edLink } from './edLink'
import { getCategoryExtras, getTopics } from './topics'
import EditorialCustomPlan from './EditorialCustomPlan'

/** 대카테고리 페이지 — HTML5 UP Editorial "Generic" 페이지 구성:
    큰 제목 → 대표 사진 → 짧은 소개 문단 → 굵은 구분선 → 세부 항목 카드 → 상담·견적 버튼.
    소개 문단은 categories.ts의 scriptFull(원래 TTS 대본이라 한두 문장씩 짧게 쓰여 있음)을 그대로 쓴다. */
export default function EditorialCategory() {
  const { lang, categoryId, goHome, goToTopic, goToQuote, goToSurgery } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'
  const cat = getCategoryById(categoryId ?? '')

  if (!cat) {
    return (
      <section className="ed-page">
        <p><a {...edLink(langPath(lang), goHome)}>{t.backHome}</a></p>
      </section>
    )
  }

  const name = isZh ? cat.zh : cat.en
  const tag = isZh ? cat.tagZh : cat.tagEn
  const intro = (isZh ? cat.scriptFullZh : cat.scriptFullEn).split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  const topics = getTopics(cat.id, lang)
  const extras = getCategoryExtras(cat.id, lang)

  return (
    <section className="ed-page">
      <p className="ed-crumb">
        <a {...edLink(langPath(lang), goHome)}>{isZh ? '首页' : 'Home'}</a>
        <span aria-hidden="true"> / </span>
        <span>{name}</span>
      </p>

      <header className="main">
        <h1>{name}</h1>
        <p className="ed-page-tag">{tag}</p>
      </header>

      {cat.heroImage && (
        <span className="image main ed-main-image"><img src={cat.heroImage} alt={name} /></span>
      )}

      {extras.pullquote && (
        <blockquote className="ed-pullquote">
          {extras.pullquote.map((line, i) => <span key={i}>{line}</span>)}
        </blockquote>
      )}

      <div className="ed-prose">
        {intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {cat.id === 'custom-plan' && <EditorialCustomPlan />}

      {topics.length > 0 && (
        <>
          <hr className="major" />
          <h2>{isZh ? '细分项目' : 'Topics'}</h2>
          <div className="posts ed-topic-posts">
            {topics.map((tp) => {
              const link = edLink(langPath(lang, `/${cat.id}/${tp.id}`), () => goToTopic(cat.id, tp.id))
              return (
                <article key={tp.id}>
                  {tp.image && (
                    <a {...link} className="image"><img src={tp.image} alt={tp.title} loading="lazy" /></a>
                  )}
                  <h3>{tp.title}</h3>
                  <p>{tp.summary}</p>
                  <ul className="actions">
                    <li><a {...link} className="button">{isZh ? '阅读全文' : 'Read More'}</a></li>
                  </ul>
                </article>
              )
            })}
          </div>
        </>
      )}

      <hr className="major" />
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{isZh ? '微信咨询' : 'Ask on WeChat'}</a></li>
        {cat.id === 'skin-beauty' && (
          <li><a {...edLink(langPath(lang, `/quote`), () => goToQuote())} className="button">{t.quoteBtnTitle}</a></li>
        )}
        {cat.id === 'plastic-surgery' && (
          <li><a {...edLink(langPath(lang, `/surgery-price`), goToSurgery)} className="button">{t.surgeryBtnTitle}</a></li>
        )}
      </ul>

      {extras.safety && (
        <div className="ed-fineprint">
          {extras.safety.map((s, i) => <p key={i}>{s}</p>)}
        </div>
      )}
    </section>
  )
}
