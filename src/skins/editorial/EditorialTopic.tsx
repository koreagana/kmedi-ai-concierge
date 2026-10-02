import { Fragment } from 'react'
import { langPath } from '../../skin'
import { useApp } from '../../contexts/AppContext'
import { getCategoryById } from '../../data/categories'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import { translations } from '../../data/translations'
import { edLink } from './edLink'
import { getTopics, type Block } from './topics'

/** 세부 항목 페이지 (/zh/skin-beauty/skin-lifting) — HTML5 UP Editorial Generic + Elements 스타일.
    제목·사진·짧은 문단 뒤로 목록(ul), 표(table.alt), 그림(image fit), 인용(blockquote),
    박스(box)를 굵은 구분선(hr.major)으로 나눠 읽히게 한다. 맨 아래는 이전/다음 항목. */
export default function EditorialTopic() {
  const { lang, categoryId, topicId, goHome, goToCategory, goToTopic, goToQuote, goToSurgery } = useApp()
  const t = translations[lang]
  const isZh = lang === 'zh'
  const cat = getCategoryById(categoryId ?? '')
  const topics = cat ? getTopics(cat.id, lang) : []
  const index = topics.findIndex((tp) => tp.id === topicId)
  const topic = topics[index]

  if (!cat || !topic) {
    return (
      <section className="ed-page">
        <header className="main"><h1>{isZh ? '没有找到该页面' : 'Page not found'}</h1></header>
        <ul className="actions">
          {cat && <li><a {...edLink(langPath(lang, `/${cat.id}`), () => goToCategory(cat.id))} className="button">{isZh ? cat.zh : cat.en}</a></li>}
          <li><a {...edLink(langPath(lang), goHome)} className="button primary">{t.backHome}</a></li>
        </ul>
      </section>
    )
  }

  const catName = isZh ? cat.zh : cat.en
  const catLink = edLink(langPath(lang, `/${cat.id}`), () => goToCategory(cat.id))
  const prev = topics[index - 1]
  const next = topics[index + 1]
  const mainImage = topic.image ?? cat.heroImage

  return (
    <section className="ed-page ed-topic">
      <p className="ed-crumb">
        <a {...edLink(langPath(lang), goHome)}>{isZh ? '首页' : 'Home'}</a>
        <span aria-hidden="true"> / </span>
        <a {...catLink}>{catName}</a>
        <span aria-hidden="true"> / </span>
        <span>{topic.title}</span>
      </p>

      <header className="main">
        <h1>{topic.title}</h1>
        {topic.subtitle && <p className="ed-page-tag">{topic.subtitle}</p>}
      </header>

      {topic.heroSplit ? (
        <figure className="ed-hero-split">
          <div className="ed-hero-split-row">
            <span style={{ flexGrow: topic.heroSplit.ratios[0], aspectRatio: String(topic.heroSplit.ratios[0]) }}>
              <img src={topic.heroSplit.image} alt={topic.title} draggable={false} />
            </span>
            <span style={{ flexGrow: topic.heroSplit.ratios[1], aspectRatio: String(topic.heroSplit.ratios[1]) }}>
              {topic.heroSplit.media.type === 'video'
                ? <video src={topic.heroSplit.media.src} autoPlay muted loop playsInline />
                : <img src={topic.heroSplit.media.src} alt="" draggable={false} />}
            </span>
          </div>
          {topic.heroSplit.caption && <figcaption>{topic.heroSplit.caption}</figcaption>}
        </figure>
      ) : topic.video ? (
        <span className="image main ed-main-image">
          <video src={topic.video} poster={mainImage} autoPlay muted loop playsInline aria-label={topic.title} />
        </span>
      ) : mainImage && (
        <span className="image main ed-main-image"><img src={mainImage} alt={topic.title} /></span>
      )}

      {topic.blocks.map((b, i) => (
        <Fragment key={i}>
          {i > 0 && hasHeading(b) && <hr className="major" />}
          <BlockView block={b} lang={lang} />
        </Fragment>
      ))}

      <hr className="major" />
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{isZh ? '微信咨询这个项目' : 'Ask about this on WeChat'}</a></li>
        {cat.id === 'skin-beauty' && (
          <li><a {...edLink(langPath(lang, `/quote`), () => goToQuote())} className="button">{t.quoteBtnTitle}</a></li>
        )}
        {cat.id === 'plastic-surgery' && (
          <li><a {...edLink(langPath(lang, `/surgery-price`), goToSurgery)} className="button">{t.surgeryBtnTitle}</a></li>
        )}
      </ul>

      {/* 이전 / 다음 항목 — Editorial 원본 pagination 대신 제목이 보이는 두 칸 링크 */}
      <nav className="ed-prevnext" aria-label={isZh ? '其他项目' : 'More topics'}>
        {prev ? (
          <a {...edLink(langPath(lang, `/${cat.id}/${prev.id}`), () => goToTopic(cat.id, prev.id))} className="ed-prevnext-item">
            <span className="ed-prevnext-dir">← {isZh ? '上一项' : 'Previous'}</span>
            <span className="ed-prevnext-title">{prev.title}</span>
          </a>
        ) : <span />}
        {next ? (
          <a {...edLink(langPath(lang, `/${cat.id}/${next.id}`), () => goToTopic(cat.id, next.id))} className="ed-prevnext-item ed-prevnext-item--next">
            <span className="ed-prevnext-dir">{isZh ? '下一项' : 'Next'} →</span>
            <span className="ed-prevnext-title">{next.title}</span>
          </a>
        ) : <span />}
      </nav>
      <p className="ed-back">
        <a {...catLink}>← {isZh ? `返回${catName}` : `Back to ${catName}`}</a>
      </p>
    </section>
  )
}

function hasHeading(b: Block) {
  if (b.kind === 'split') return Boolean(b.caption)
  return 'title' in b && Boolean(b.title)
}

function Paras({ text }: { text: string[] }) {
  return <>{text.map((p, i) => <p key={i}>{p}</p>)}</>
}

function BlockView({ block: b, lang }: { block: Block; lang: 'zh' | 'en' }) {
  switch (b.kind) {
    case 'paras':
      return (
        <div className="ed-prose">
          {b.title && <h2>{b.title}</h2>}
          <Paras text={b.paras} />
        </div>
      )

    case 'note':
      return b.tone === 'warning'
        ? <div className="box ed-box-warning"><Paras text={b.text} /></div>
        : <blockquote><Paras text={b.text} /></blockquote>

    case 'list':
      return (
        <div>
          {b.title && <h2>{b.title}</h2>}
          {b.items.length > 0 && <ul className="ed-list">{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>}
          {b.groups?.map((g, gi) => (
            <div key={gi} className="ed-list-group">
              <h3>{g.label}</h3>
              <ul className="ed-list">{g.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      )

    case 'table':
      return (
        <div>
          {b.title && <h2>{b.title}</h2>}
          <div className="table-wrapper">
            <table className="alt ed-table">
              <tbody>
                {b.rows.map(([name, desc], i) => (
                  <tr key={i}>
                    <td className="ed-table-name">{name}</td>
                    {desc ? <td>{desc}</td> : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caution && b.caution.length > 0 && <p className="ed-small">{b.caution.join(' ')}</p>}
        </div>
      )

    case 'grid':
      return (
        <div>
          {b.title && <h2>{b.title}</h2>}
          <div className="table-wrapper">
            <table className="alt ed-table ed-grid-table">
              <thead>
                <tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {b.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j} className={j === 0 ? 'ed-table-name' : undefined}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caution && <p className="ed-small">{b.caution}</p>}
        </div>
      )

    case 'figure':
      return (
        <div>
          <h2>{b.title}</h2>
          {b.image && <span className="image fit ed-figure"><img src={b.image} alt={b.title} loading="lazy" /></span>}
          <p>{b.body}</p>
        </div>
      )

    case 'steps':
      return (
        <div>
          <h2>{b.title}</h2>
          <span className="image fit ed-figure"><img src={b.image} alt={b.alt} loading="lazy" /></span>
          <ol className="ed-steps">
            {b.steps.map((s, i) => (
              <li key={i}><span className="ed-step-num">{i + 1}</span><strong>{s.title}</strong><span className="ed-step-body">{s.body}</span></li>
            ))}
          </ol>
          {b.footnote && <p className="ed-small">{b.footnote}</p>}
        </div>
      )

    case 'compare':
      return (
        <div>
          <h2>{b.title}</h2>
          {b.sub && <p>{b.sub}</p>}
          <div className="table-wrapper">
            <table className="ed-compare">
              <thead>
                <tr><th>{lang === 'en' ? 'Type' : '类型'}</th>{b.cols.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    <td className="ed-table-name">{r.label}</td>
                    {r.cells.map((c, ci) => <td key={ci} data-label={b.cols[ci]}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'case':
      return (
        <div>
          <h2>{b.title}</h2>
          {b.caption && <p>{b.caption}</p>}
          <div className={`ed-case-grid ed-case-grid--${Math.min(b.photos.length, 3)}`}>
            {b.photos.map((p) => (
              <span key={p.src} className="image fit ed-case-photo" onContextMenu={(e) => e.preventDefault()}>
                <img src={p.src} alt={p.alt} draggable={false} loading="lazy" />
              </span>
            ))}
          </div>
          {b.credit && <p className="ed-small">{b.credit}</p>}
          {b.plan && (
            <div className="box">
              <h3>{b.plan.title}</h3>
              <p className="ed-page-tag">{b.plan.tag}</p>
              <Paras text={b.plan.notes} />
              <p><strong>{b.plan.highlight}</strong></p>
            </div>
          )}
        </div>
      )

    case 'split':
      return (
        <div>
          {b.caption && <h2>{b.caption}</h2>}
          <div className="ed-case-grid ed-case-grid--2">
            <span className="image fit ed-split-media"><img src={b.image} alt={b.caption ?? ''} draggable={false} loading="lazy" /></span>
            <span className="image fit ed-split-media">
              {b.media.type === 'video'
                ? <video src={b.media.src} autoPlay muted loop playsInline />
                : <img src={b.media.src} alt="" draggable={false} loading="lazy" />}
            </span>
          </div>
          {b.footer && <p>{b.footer}</p>}
          {b.credit && <p className="ed-small">{b.credit}</p>}
        </div>
      )

    case 'tags':
      return (
        <div>
          {b.groups.map((g, gi) => (
            <ul key={gi} className="ed-tags">{g.map((x, i) => <li key={i}>{x}</li>)}</ul>
          ))}
        </div>
      )
  }
}
