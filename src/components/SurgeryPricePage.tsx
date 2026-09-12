import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { SURGERY_GROUPS, SURGERY_SOURCE, type SurgeryItem } from '../data/surgeryPrices'
import { WECHAT_BIZ_URL, getWhatsappUrl } from '../data/contacts'
import './SurgeryPricePage.css'

/* 성형 수가는 「만원 · VAT 포함 · 원셀 단독」 기준이라 인기시술 견적과 섞지 않는다.
   비교 대상이 없으므로 합산기가 아니라 읽는 가격표로 구성했다.
   환율은 인기시술 견적과 동일 기준(2026-09-07)을 쓴다. */
const KRW_PER_CNY = 204
const MANWON = 10000

// 카테고리별 SEO용 H2 — "韩国 + 항목 + 价格" 패턴 통일. 앞 5개는 목표 키워드에 맞춘 지정 문구,
// 나머지는 같은 패턴으로 작성.
const GROUP_HEADING: Record<string, { zh: string; en: string }> = {
  eye: { zh: '韩国双眼皮手术价格', en: 'Korea Double Eyelid Surgery Price' },
  nose: { zh: '韩国隆鼻手术价格', en: 'Korea Rhinoplasty Price' },
  breast: { zh: '韩国胸部整形价格', en: 'Korea Breast Surgery Price' },
  lipo: { zh: '韩国吸脂与脂肪填充价格', en: 'Korea Liposuction & Fat Grafting Price' },
  contour: { zh: '韩国面部轮廓手术价格', en: 'Korea Facial Contouring Surgery Price' },
  lift: { zh: '韩国面部提升价格', en: 'Korea Facelift & Thread Lift Price' },
  inject: { zh: '韩国肉毒·填充注射价格', en: 'Korea Botox & Filler Injection Price' },
  booster: { zh: '韩国皮肤管理与疤痕修复价格', en: 'Korea Skin Booster & Scar Treatment Price' },
  hair: { zh: '韩国植发价格', en: 'Korea Hair Transplant Price' },
  etc: { zh: '韩国其他项目与抗衰价格', en: 'Korea Other Treatments & Anti-aging Price' },
}

const COPY = {
  zh: {
    back: '← 返回首页',
    title: '韩国整形手术价格表',
    sub: `${SURGERY_SOURCE.hospitalZh} · ${SURGERY_SOURCE.asOfZh}`,
    basis: SURGERY_SOURCE.basisZh,
    fx: '参考汇率 2026年9月',
    recovery: '恢复期',
    addOn: '追加项',
    from: '起',
    consult: '免费咨询 · 获取精准报价',
    notes: [
      '以上为外国患者适用价格，已含10%增值税。',
      '手术费用会根据个人条件、难度与麻醉方式而有所差异。',
      '最终费用以面诊后的正式报价为准。',
      '实际费用会根据医院、医生、手术难度及个人情况有所不同，以上价格仅供参考。',
    ],
  },
  en: {
    back: '← Back to Home',
    title: 'Korea Plastic Surgery Price List',
    sub: `Onecell Plastic Surgery · 2026 latest reference pricing`,
    basis: '10% VAT included · rates for international patients',
    fx: 'Rate as of September 2026',
    recovery: 'Downtime',
    addOn: 'Add-on',
    from: 'from',
    consult: 'Get an exact quote · Free consultation',
    notes: [
      'These are the rates applied to international patients, with 10% VAT included.',
      'Surgical fees shift with your anatomy, the complexity of the case, and the type of anaesthesia.',
      'Your price is confirmed in the formal quote issued after an in-person consultation.',
      'Actual costs vary by hospital, surgeon, case complexity and individual condition — the prices above are for reference only.',
    ],
  },
}

/** 만원 단위 값을 화면 표기로 — 위안화를 크게, 원화를 병기 */
function roundCny(v: number) {
  const step = v < 1000 ? 10 : 50
  return Math.max(step, Math.round(v / step) * step)
}
function priceLabels(krw: SurgeryItem['krw']) {
  const [lo, hi] = Array.isArray(krw) ? krw : [krw, krw]
  const won = (v: number) => `₩${Math.round(v * MANWON).toLocaleString('en-US')}`
  const cny = (v: number) => `¥${roundCny((v * MANWON) / KRW_PER_CNY).toLocaleString('en-US')}`
  return lo === hi
    ? { main: cny(lo), sub: won(lo) }
    : { main: `${cny(lo)}~${cny(hi)}`, sub: `${won(lo)}~${won(hi)}` }
}

export default function SurgeryPricePage() {
  const { lang, goHome } = useApp()
  const isEn = lang === 'en'
  const c = isEn ? COPY.en : COPY.zh
  const [active, setActive] = useState(SURGERY_GROUPS[0].id)

  return (
    <div className="sg-widget">
      <div className="sg-hero">
        <button className="sg-back" onClick={goHome}>{c.back}</button>
        <h1 className="sg-title">{c.title}</h1>
        <p className="sg-sub">{c.sub}</p>
        <span className="sg-basis">{c.basis}</span>
      </div>

      <div className="sg-tabs">
        {SURGERY_GROUPS.map(g => (
          <button
            key={g.id}
            className={`sg-tab${g.id === active ? ' active' : ''}`}
            onClick={() => setActive(g.id)}
          >
            {isEn ? g.ko : g.zh}
          </button>
        ))}
      </div>

      {/* 카테고리별로 항상 DOM에 렌더링하고 탭은 hidden 속성만 토글한다.
          (예전엔 활성 그룹만 마운트해서 검색엔진이 첫 탭 내용만 보게 됨 —
          모든 그룹의 H2·가격 텍스트가 실제로 크롤링되도록 이렇게 바꿨다.) */}
      {SURGERY_GROUPS.map(g => {
        const heading = GROUP_HEADING[g.id]
        return (
          <section key={g.id} className="sg-list" hidden={g.id !== active}>
            <h2 className="sg-group-heading">{isEn ? heading.en : heading.zh}</h2>
            {g.items.map((item, i) => {
              const p = priceLabels(item.krw)
              const note = isEn ? item.noteKo : item.noteZh
              const rec = isEn ? item.recoveryKo : item.recoveryZh
              return (
                <div className="sg-row" key={i}>
                  <div className="sg-name">
                    {/* 중국어를 크게, 한국어를 그 옆에 병기 — 병원에서 실제로 쓰는 이름이 한국어라서 */}
                    <b>{isEn ? item.ko : item.zh}</b>
                    {!isEn && <span className="sg-name-ko">{item.ko}</span>}
                    {note && <span className="sg-note">{note}</span>}
                  </div>
                  <div className="sg-price">
                    <b>{item.addOn ? '+' : ''}{p.main}{item.from ? c.from : ''}</b>
                    <span className="sg-krw">{p.sub}</span>
                    {rec && <span className="sg-rec">{c.recovery} {rec}</span>}
                  </div>
                </div>
              )
            })}
          </section>
        )
      })}

      <div className="sg-foot">
        <ul>
          {c.notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
        <span className="sg-fx">{c.fx}</span>
        <button
          className="sg-consult"
          onClick={() => window.open(lang === 'zh' ? WECHAT_BIZ_URL : getWhatsappUrl(lang), '_blank')}
        >
          {c.consult}
        </button>
      </div>
    </div>
  )
}
