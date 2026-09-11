import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { SURGERY_GROUPS, SURGERY_SOURCE, type SurgeryItem } from '../data/surgeryPrices'
import { WECHAT_BIZ_URL, getWhatsappUrl } from '../data/contacts'
import './SurgeryPricePage.css'

/* 성형 수가는 「만원 · VAT 포함 · 원셀 단독」 기준이라 인기시술 견적과 섞지 않는다.
   비교 대상이 없으므로 합산기가 아니라 읽는 가격표로 구성했다.
   환율은 인기시술 견적과 동일 기준(2026-09-07)을 쓴다. */
const KRW_PER_CNY = 204
const MANWON = 10000

const COPY = {
  zh: {
    back: '← 返回首页',
    title: '韩国整形手术价格',
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
    ],
  },
  en: {
    back: '← Back to Home',
    title: 'Surgery Price List',
    sub: `Onecell Plastic Surgery · as of May 2026`,
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
  const group = SURGERY_GROUPS.find(g => g.id === active) ?? SURGERY_GROUPS[0]

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

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="sg-list"
        >
          {group.items.map((item, i) => {
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
        </motion.div>
      </AnimatePresence>

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
