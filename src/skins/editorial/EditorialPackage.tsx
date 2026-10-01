import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { WECHAT_BIZ_URL } from '../../data/contacts'
import { PACKAGE_TEXT, type Selections, type SelectSlotDef, type SlotKey } from '../../components/PackagePage'
import { edLink } from './edLink'

const EMPTY: Selections = { meal1: '', meal2: '', meal3: '', meal4: '', meal5: '', meal6: '', sight1: '', sight2: '', shop: '' }

/** 3晚4天方案 — ai-kmedi.com PackagePage와 같은 일정·가격 데이터(PACKAGE_TEXT)를 Editorial 요소로:
    제목 → 한눈에 보기 4열 → 날짜별 시간표(table.alt, 선택 항목은 Editorial select) → 가격 박스 → 선택 요약 + 상담. */
export default function EditorialPackage() {
  const { lang, goHome } = useApp()
  const isZh = lang === 'zh'
  const p = PACKAGE_TEXT[lang]
  const [sel, setSel] = useState<Selections>(EMPTY)

  const optionsFor = (s: SelectSlotDef) =>
    s.optionsKind === 'meal' ? p.mealOptions : s.optionsKind === 'shop' ? p.shopOptions : p.spotOptions

  const chosen = p.days
    .map((d) => ({
      num: d.num,
      items: d.slots
        .filter((s): s is SelectSlotDef => s.kind === 'select' && !!sel[s.slotKey])
        .map((s) => ({ key: s.slotKey as SlotKey, label: p.slotSummaryLabels[s.slotKey], value: sel[s.slotKey] })),
    }))
    .filter((d) => d.items.length > 0)

  return (
    <section className="ed-page ed-package">
      <p className="ed-crumb">
        <a {...edLink(`/${lang}`, goHome)}>{isZh ? '首页' : 'Home'}</a>
        <span aria-hidden="true"> / </span>
        <span>{p.heroTitle}</span>
      </p>

      <header className="main">
        <h1>{p.heroTitle}</h1>
        {/* ai-kmedi의 "可根据您的喜好定制" 대신, 이 페이지에서 바로 할 일을 알려주는 안내(사용자 문구) */}
        <p className="ed-page-tag">
          {isZh
            ? '点击下方“可选”部分，即可选择旅行目的地和餐食类型。'
            : 'Tap the "Optional" items below to choose your destinations and meal types.'}
        </p>
      </header>

      <span className="image main ed-main-image"><img src="/editorial/seoul-skyline.jpg" alt={p.heroTitle} /></span>

      <div className="ed-prose"><p>{p.heroSub}</p></div>

      <ul className="ed-stats">
        {[3, 2, 1].map((n, i) => (
          <li key={i}><strong>{n}</strong><span>{p.countLabels[i]}</span></li>
        ))}
      </ul>

      <hr className="major" />
      <h2>{p.glanceTitle}</h2>
      <p>{p.glanceSub}</p>
      <div className="ed-glance">
        {p.glanceDays.map((gd, i) => (
          <div key={i} className="ed-glance-day">
            <h3><span className="ed-daynum">DAY {i + 1}</span>{gd.title}</h3>
            <p className="ed-small">{gd.sub}</p>
            <ul className="ed-list">
              {gd.items.map((it, ii) => (
                <li key={ii}>{it.text}{!it.fixed && <em className="ed-opt">{p.legendSelect}</em>}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="major" />
      <h2>{p.selectCtaText}</h2>
      {p.days.map((day) => (
        <div key={day.num} className="ed-day">
          <h3>
            <span className="ed-daynum">DAY {day.num}</span>{day.title}
            {/* dateLabel은 "DAY 1 · 入境"처럼 DAY 번호를 이미 포함 — 앞부분은 떼고 뒤 설명만 */}
            <span className="ed-small"> · {day.dateLabel.replace(/^DAY\s*\d+\s*[·•]\s*/i, '')}</span>
          </h3>
          <div className="table-wrapper">
            <table className="alt ed-schedule">
              <tbody>
                {day.slots.map((slot, si) => (
                  <tr key={si}>
                    <td className="ed-time">{slot.time}</td>
                    <td>
                      <strong>{slot.label}</strong>
                      {slot.kind === 'fixed' && slot.detail && <span className="ed-small ed-block">{slot.detail}</span>}
                    </td>
                    <td className="ed-choice">
                      {slot.kind === 'fixed' ? (
                        <span className="ed-badge">{p.badgeFixed}</span>
                      ) : (
                        <select
                          value={sel[slot.slotKey]}
                          onChange={(e) => setSel((s) => ({ ...s, [slot.slotKey]: e.target.value }))}
                          aria-label={slot.label}
                        >
                          <option value="">— {p.badgeSelect} —</option>
                          {optionsFor(slot).map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <hr className="major" />
      <h2>{p.priceTitle}</h2>
      <p>{p.priceSub}</p>
      <div className="box ed-price-box">
        <h3>{p.priceMainLabel}</h3>
        <p className="ed-price"><strong>{p.priceAmount}</strong> <span>{p.priceUnit}</span></p>
        <p>{p.priceMainSub}</p>
        <p className="ed-small">{p.priceMainNote}</p>
      </div>
      <div className="table-wrapper">
        <table className="alt ed-table">
          <tbody>
            {p.priceItems.map((it, i) => (
              <tr key={i}>
                <td className="ed-table-name">{it.title}<span className={`ed-badge ed-badge--${it.tagKind}`}>{it.tag}</span></td>
                <td>{it.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ed-small">ⓘ {p.priceFx}</p>

      <hr className="major" />
      <h2>{isZh ? '您选择的行程' : 'Your Selections'}</h2>
      {chosen.length === 0 ? (
        <p className="ed-small">{p.summaryEmpty}</p>
      ) : (
        <ul className="ed-list">
          {chosen.map((d) => (
            <li key={d.num}>
              <strong>DAY {d.num}</strong>　{d.items.map((c) => `${c.label}：${c.value}`).join('　·　')}
            </li>
          ))}
        </ul>
      )}
      <ul className="actions ed-cta">
        <li><a href={WECHAT_BIZ_URL} target="_blank" rel="noopener noreferrer" className="button primary">{p.consultBtn}</a></li>
      </ul>
    </section>
  )
}
