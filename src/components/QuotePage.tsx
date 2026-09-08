import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { QUOTE_CATEGORIES, QUOTE_MAX_SELECTION, type QuoteOption, type TierRange } from '../data/quoteProcedures'
import { WECHAT_BIZ_URL, getWhatsappUrl } from '../data/contacts'
import './QuotePage.css'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

type QuoteLang = 'zh' | 'en'
type TierKey = 'economy' | 'standard' | 'premium'
const TIER_KEYS: TierKey[] = ['economy', 'standard', 'premium']

interface Copy {
  backHome: string
  heroTitle: string
  heroSub: string
  selectGuide: string
  selectLimit: string
  selectedCount: (n: number) => string
  limitReachedMsg: string
  nextBtn: string
  nextBtnEmpty: string
  resultTitle: string
  resultSub: string
  itemsTitle: string
  changeSelectionBtn: string
  disclaimerTitle: string
  disclaimer1: string
  disclaimer2: string
  disclaimer3: string
  consultBtn: string
  tierName: Record<TierKey, string>
  tierRecommended: string
  /** 주 표기 통화 금액 — zh는 위안화(¥), en은 달러($). 원화를 환산·반올림해서 반환 */
  formatRange: (low: number, high: number) => string
  /** 병기용 원화 금액 — 실제 결제 통화라 함께 노출 */
  formatKrw: (low: number, high: number) => string
  /** 기준 환율 고지 문구 */
  fxNote: string
  askConsult: string
  uniformNote: string
  missingNote: (n: number) => string
}

/* ── 환율 ───────────────────────────────────────────────────────────
   견적 데이터는 원화가 원본이고, 화면에는 고객의 통화로 환산해 보여준다.
   서버리스 없이 정적으로 배포하는 구조라 실시간 환율 API 대신 상수로
   관리하며, 화면에도 기준 시점을 명시한다.
   환율이 크게 움직이면 아래 두 값과 FX_ASOF만 갱신하면 됨.
   기준: 2026-09-07 (1 USD = 1,343.77 KRW / 1 CNY = 204.46 KRW) */
const KRW_PER_USD = 1344
const KRW_PER_CNY = 204
const FX_ASOF_ZH = '2026年9月'
const FX_ASOF_EN = 'September 2026'

/** 견적 숫자는 정확한 청구액이 아니라 어림값이라, 자릿수에 맞춰 둥근 수로 끊어준다. */
function roundNice(value: number, smallStep: number, bigStep: number, threshold: number) {
  const step = value < threshold ? smallStep : bigStep
  return Math.max(step, Math.round(value / step) * step)
}
const toUsd = (won: number) => roundNice(won / KRW_PER_USD, 5, 10, 100)
const toCny = (won: number) => roundNice(won / KRW_PER_CNY, 10, 50, 1000)

const money = (symbol: string, low: number, high: number, conv: (v: number) => number) => {
  const l = conv(low)
  const h = conv(high)
  return l === h
    ? `${symbol}${l.toLocaleString('en-US')}`
    : `${symbol}${l.toLocaleString('en-US')}~${h.toLocaleString('en-US')}`
}

const COPY: Record<QuoteLang, Copy> = {
  zh: {
    backHome: '← 返回首页',
    heroTitle: '热门轻医美项目费用预估',
    heroSub: '一键查看热门项目价格区间',
    selectGuide: '请选择您感兴趣的项目（可多选）',
    selectLimit: `最多可选择 ${QUOTE_MAX_SELECTION} 个项目`,
    selectedCount: n => `已选 ${n} 项`,
    limitReachedMsg: '已选项目较多，建议直接咨询顾问获取整体方案报价。',
    nextBtn: '查看预估费用',
    nextBtnEmpty: '请先选择项目',
    resultTitle: '您的预估费用区间',
    resultSub: '按经济型 / 标准型 / 高端型三档比较，均为VAT别外加收',
    itemsTitle: '已选项目明细',
    changeSelectionBtn: '← 重新选择',
    disclaimerTitle: '重要说明',
    disclaimer1: '以上为外国患者适用价格区间，仅供参考。',
    disclaimer2: '各医院每月促销方案不同，实际费用会根据个人皮肤状态、施术范围与用量而有所差异。',
    disclaimer3: '最终费用以面诊后的正式报价为准。',
    consultBtn: '免费咨询 · 获取精准报价',
    tierName: { economy: '经济型', standard: '标准型', premium: '高端型' },
    tierRecommended: '推荐',
    formatRange: (low, high) => money('¥', low, high, toCny),
    formatKrw: (low, high) => money('₩', low, high, v => v),
    fxNote: `参考汇率 ${FX_ASOF_ZH}`,
    askConsult: '咨询后告知',
    uniformNote: '该项目暂未按档位区分，价格供参考',
    missingNote: n => `${n}项该档位暂无报价`,
  },
  en: {
    backHome: '← Back to Home',
    heroTitle: 'Popular Treatment Price Estimate',
    heroSub: "Price ranges for Korea's most requested treatments, at a glance.",
    selectGuide: 'Select the treatments you have in mind',
    selectLimit: `Up to ${QUOTE_MAX_SELECTION} treatments`,
    selectedCount: n => (n === 1 ? '1 selected' : `${n} selected`),
    limitReachedMsg: 'For a plan this size, a concierge can put the full course together and quote it properly.',
    nextBtn: 'See my estimate',
    nextBtnEmpty: 'Select a treatment first',
    resultTitle: 'Your estimated cost',
    resultSub: 'Compared across Value / Standard / Premium tiers, all before VAT',
    itemsTitle: 'Your selection',
    changeSelectionBtn: '← Edit selection',
    disclaimerTitle: 'Please note',
    disclaimer1: 'These ranges are the rates our partner clinics apply to international patients, shown for reference.',
    disclaimer2: 'Clinics run different promotions each month, and the final cost shifts with your skin condition, the area treated, and the amount used.',
    disclaimer3: 'Your price is confirmed in the formal quote issued after an in-person consultation.',
    consultBtn: 'Get an exact quote · Free consultation',
    tierName: { economy: 'Value', standard: 'Standard', premium: 'Premium' },
    tierRecommended: 'Recommended',
    formatRange: (low, high) => money('$', low, high, toUsd),
    formatKrw: (low, high) => money('₩', low, high, v => v),
    fxNote: `Rate as of ${FX_ASOF_EN}`,
    askConsult: 'Quoted on request',
    uniformNote: 'Not tier-specific — this price applies across the board.',
    missingNote: n => `${n} item(s) not offered at this tier`,
  },
}

/** 옵션의 economy/standard/premium 중 값이 있는 것만 모아 대략적인 표시 범위를 만든다 (선택 화면용) */
function overallRange(opt: QuoteOption): TierRange | null {
  const tiers = TIER_KEYS.map(k => opt[k]).filter((t): t is TierRange => !!t)
  if (tiers.length === 0) return null
  return { low: Math.min(...tiers.map(t => t.low)), high: Math.max(...tiers.map(t => t.high)) }
}

interface Selection { categoryId: string; procedureId: string; optionIndex: number }
interface TierTotal { low: number; high: number; missing: number }
const emptyTotal = (): TierTotal => ({ low: 0, high: 0, missing: 0 })

export default function QuotePage() {
  const { lang, goHome, quoteCategoryHint, quoteProcedureHint } = useApp()
  const quoteLang: QuoteLang = lang === 'en' ? 'en' : 'zh'
  const c = COPY[quoteLang]
  const initialCategory = QUOTE_CATEGORIES.find(cat => cat.id === quoteCategoryHint)?.id ?? QUOTE_CATEGORIES[0].id

  const [view, setView] = useState<'select' | 'result'>('select')
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [selected, setSelected] = useState<Record<string, Selection>>({})
  const [showLimitMsg, setShowLimitMsg] = useState(false)
  const [highlightedProcedure, setHighlightedProcedure] = useState(quoteProcedureHint)

  // 태그 시트 등에서 특정 시술로 딥링크된 경우, 카드로 스크롤 + 잠시 하이라이트
  useEffect(() => {
    if (!quoteProcedureHint) return
    const timer = setTimeout(() => {
      document.querySelector(`[data-procedure-id="${quoteProcedureHint}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 350)
    const clearHighlight = setTimeout(() => setHighlightedProcedure(null), 2400)
    return () => { clearTimeout(timer); clearTimeout(clearHighlight) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedList = Object.values(selected)
  const selectedCount = selectedList.length

  const resolveOption = (sel: Selection) => {
    const cat = QUOTE_CATEGORIES.find(cc => cc.id === sel.categoryId)
    const proc = cat?.procedures.find(p => p.id === sel.procedureId)
    return proc?.options[sel.optionIndex] ?? null
  }

  const totals = useMemo(() => {
    const t: Record<TierKey, TierTotal> = { economy: emptyTotal(), standard: emptyTotal(), premium: emptyTotal() }
    for (const sel of selectedList) {
      const opt = resolveOption(sel)
      if (!opt) continue
      for (const key of TIER_KEYS) {
        const tier = opt[key]
        if (tier) { t[key].low += tier.low; t[key].high += tier.high }
        else { t[key].missing += 1 }
      }
    }
    return t
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  /** 상단 sticky bar용 — 3단 값 중 존재하는 것들을 모두 아울러 대략적인 범위만 보여줌 */
  const stickyRange = useMemo(() => {
    const known = TIER_KEYS.map(k => totals[k]).filter(t => t.low > 0 || t.high > 0)
    if (known.length === 0) return null
    return { low: Math.min(...known.map(t => t.low)), high: Math.max(...known.map(t => t.high)) }
  }, [totals])

  const toggleOption = (categoryId: string, procedureId: string, optionIndex: number) => {
    setSelected(prev => {
      const cur = prev[procedureId]
      if (cur && cur.optionIndex === optionIndex) {
        const next = { ...prev }
        delete next[procedureId]
        setShowLimitMsg(false)
        return next
      }
      if (!cur && Object.keys(prev).length >= QUOTE_MAX_SELECTION) {
        setShowLimitMsg(true)
        return prev
      }
      setShowLimitMsg(false)
      return { ...prev, [procedureId]: { categoryId, procedureId, optionIndex } }
    })
  }

  const handleConsult = () => {
    window.open(lang === 'zh' ? WECHAT_BIZ_URL : getWhatsappUrl(lang), '_blank')
  }

  const activeCat = QUOTE_CATEGORIES.find(cat => cat.id === activeCategory) ?? QUOTE_CATEGORIES[0]
  /* 시술명은 「해당 언어 이름 + 한국어 원어명」으로 보여줌 — 고객이 병원에서 실제로 마주치는 이름이 한국어라서 */
  const nameOf = (proc: { nameKo: string; nameZh: string; nameEn: string }) =>
    quoteLang === 'zh' ? { main: proc.nameZh, sub: proc.nameKo } : { main: proc.nameEn, sub: proc.nameKo }
  const unitOf = (opt: QuoteOption) => (quoteLang === 'zh' ? opt.unit : opt.unitEn)
  const noteOf = (opt: QuoteOption) => (quoteLang === 'zh' ? opt.note : opt.noteEn)

  const tierCell = (tier: TierRange | null) => (tier ? c.formatRange(tier.low, tier.high) : c.askConsult)
  const tierKrw = (tier: TierRange | null) => (tier ? c.formatKrw(tier.low, tier.high) : null)

  return (
    <div className="quote-widget" data-lang={quoteLang}>
      {/* ══ Hero ══ */}
      <div className="quote-hero">
        <div className="quote-hero-topbar">
          <motion.button className="quote-back-btn" onClick={goHome} {...fadeUp}>{c.backHome}</motion.button>
        </div>
        <motion.h1 className="quote-hero-title" {...fadeUp} transition={{ delay: 0.05 }}>{c.heroTitle}</motion.h1>
        <motion.p className="quote-hero-sub" {...fadeUp} transition={{ delay: 0.1 }}>{c.heroSub}</motion.p>
      </div>

      <AnimatePresence mode="wait">
        {view === 'select' ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── guide ── */}
            <div className="quote-guide">
              <p className="quote-guide-text">{c.selectGuide}</p>
              <span className="quote-guide-limit">{c.selectLimit}</span>
            </div>

            {/* ── category tabs ── */}
            <div className="quote-tabs">
              {QUOTE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`quote-tab${cat.id === activeCategory ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {quoteLang === 'zh' ? cat.labelZh : cat.labelEn}
                </button>
              ))}
            </div>

            {/* ── procedure list ── */}
            <div className="quote-proc-list">
              {activeCat.procedures.map(proc => {
                const names = nameOf(proc)
                const isSelected = !!selected[proc.id]
                const notes = [...new Set(proc.options.map(noteOf).filter(Boolean))] as string[]
                return (
                  <div
                    key={proc.id}
                    data-procedure-id={proc.id}
                    className={`quote-proc-card${isSelected ? ' selected' : ''}${highlightedProcedure === proc.id ? ' highlight' : ''}`}
                  >
                    <div className="quote-proc-name">
                      <span className="quote-proc-main">{names.main}</span>
                      <span className="quote-proc-sub">{names.sub}</span>
                    </div>
                    <div className="quote-opt-row">
                      {proc.options.map((opt: QuoteOption, i: number) => {
                        const chosen = selected[proc.id]?.optionIndex === i
                        const range = overallRange(opt)
                        return (
                          <button
                            key={opt.unit + i}
                            className={`quote-opt-chip${chosen ? ' chosen' : ''}`}
                            onClick={() => toggleOption(activeCat.id, proc.id, i)}
                          >
                            <span className="quote-opt-unit">{unitOf(opt)}</span>
                            <span className="quote-opt-price">
                              {range ? c.formatRange(range.low, range.high) : c.askConsult}
                            </span>
                            {range && (
                              <span className="quote-opt-krw">{c.formatKrw(range.low, range.high)}</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                    {notes.length > 0 && (
                      <p className="quote-proc-note">{notes.join(' · ')}</p>
                    )}
                  </div>
                )
              })}
            </div>

            <AnimatePresence>
              {showLimitMsg && (
                <motion.p
                  className="quote-limit-msg"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  {c.limitReachedMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="quote-select-spacer" />

            {/* ── sticky bottom bar ── */}
            <div className="quote-sticky-bar">
              <div className="quote-sticky-info">
                <span className="quote-sticky-count">{c.selectedCount(selectedCount)}</span>
                {selectedCount > 0 && stickyRange && (
                  <span className="quote-sticky-total">{c.formatRange(stickyRange.low, stickyRange.high)}</span>
                )}
              </div>
              <button
                className="quote-next-btn"
                disabled={selectedCount === 0}
                onClick={() => setView('result')}
              >
                {selectedCount === 0 ? c.nextBtnEmpty : c.nextBtn}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="quote-result"
          >
            <button className="quote-change-btn" onClick={() => setView('select')}>{c.changeSelectionBtn}</button>

            <p className="quote-result-title">{c.resultTitle}</p>
            <p className="quote-result-sub">{c.resultSub}</p>

            {/* ── 3단 합계 비교 ── */}
            <div className="quote-tier-totals">
              {TIER_KEYS.map(key => {
                const t = totals[key]
                const hasAmount = t.low > 0 || t.high > 0
                return (
                  <div key={key} className={`quote-tier-total-card${key === 'standard' ? ' recommended' : ''}`}>
                    {key === 'standard' && <span className="quote-tier-badge">{c.tierRecommended}</span>}
                    <span className="quote-tier-total-name">{c.tierName[key]}</span>
                    <span className="quote-tier-total-amount">
                      {hasAmount ? c.formatRange(t.low, t.high) : c.askConsult}
                    </span>
                    {hasAmount && <span className="quote-tier-total-krw">{c.formatKrw(t.low, t.high)}</span>}
                    {t.missing > 0 && <span className="quote-tier-total-missing">{c.missingNote(t.missing)}</span>}
                  </div>
                )
              })}
            </div>
            <span className="quote-total-fx">{c.fxNote}</span>

            <p className="quote-items-title">{c.itemsTitle}</p>
            <div className="quote-item-list">
              {selectedList.map(sel => {
                const cat = QUOTE_CATEGORIES.find(cc => cc.id === sel.categoryId)
                const proc = cat?.procedures.find(p => p.id === sel.procedureId)
                const opt = proc?.options[sel.optionIndex]
                if (!proc || !opt) return null
                const names = nameOf(proc)
                return (
                  <div className="quote-item-card" key={sel.procedureId}>
                    <div className="quote-item-name">
                      <span>{names.main}</span>
                      <span className="quote-item-unit">{unitOf(opt)}</span>
                    </div>
                    <div className="quote-item-tiers">
                      {TIER_KEYS.map(key => (
                        <div key={key} className="quote-item-tier">
                          <span className="quote-item-tier-label">{c.tierName[key]}</span>
                          <span className="quote-item-tier-price">{tierCell(opt[key])}</span>
                          {tierKrw(opt[key]) && <span className="quote-item-tier-krw">{tierKrw(opt[key])}</span>}
                        </div>
                      ))}
                    </div>
                    {opt.uniform && <p className="quote-item-uniform-note">{c.uniformNote}</p>}
                  </div>
                )
              })}
            </div>

            <div className="quote-disclaimer">
              <p className="quote-disclaimer-title">{c.disclaimerTitle}</p>
              <ul>
                <li>{c.disclaimer1}</li>
                <li>{c.disclaimer2}</li>
                <li>{c.disclaimer3}</li>
              </ul>
            </div>

            <button className="quote-consult-btn" onClick={handleConsult}>{c.consultBtn}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
