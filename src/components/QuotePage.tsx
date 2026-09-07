import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { QUOTE_CATEGORIES, QUOTE_MAX_SELECTION, type QuoteOption } from '../data/quoteProcedures'
import { WECHAT_BIZ_URL, getWhatsappUrl } from '../data/contacts'
import './QuotePage.css'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

type QuoteLang = 'zh' | 'en'

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
  resultSumLabel: string
  resultSumVat: string
  badgeText: string
  itemsTitle: string
  changeSelectionBtn: string
  disclaimerTitle: string
  disclaimer1: string
  disclaimer2: string
  disclaimer3: string
  consultBtn: string
  /** 데이터의 만원 단위 값을 화면 표기로 변환 — zh는 「46~91.3万」, en은 실제 원화 금액(₩460,000–913,000) */
  formatRange: (low: number, high: number) => string
  /** 결과 카드 합계 — 숫자 부분만 반환하고 단위는 won에서 따로 붙임 */
  formatTotal: (low: number, high: number) => string
  won: string
  askConsult: string
}

/** 만원 단위 → 원화 실금액 표기. 46 → ₩460,000 */
function toWon(manwon: number) {
  return Math.round(manwon * 10000).toLocaleString('en-US')
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
    resultSumLabel: '合计 约',
    resultSumVat: '（含10%增值税）',
    badgeText: '可能适用套餐优惠',
    itemsTitle: '已选项目明细',
    changeSelectionBtn: '← 重新选择',
    disclaimerTitle: '重要说明',
    disclaimer1: '以上为外国患者适用价格区间，仅供参考。',
    disclaimer2: '各医院每月促销方案不同，实际费用会根据个人皮肤状态、施术范围与用量而有所差异。',
    disclaimer3: '最终费用以面诊后的正式报价为准。',
    consultBtn: '免费咨询 · 获取精准报价',
    formatRange: (low, high) => (low === high ? `${low}万` : `${low}~${high}万`),
    formatTotal: (low, high) => (low === high ? `${low}` : `${low}~${high}`),
    won: '万韩元',
    askConsult: '咨询后告知',
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
    resultSumLabel: 'Estimated total',
    resultSumVat: '(10% VAT included)',
    badgeText: 'Package pricing may apply',
    itemsTitle: 'Your selection',
    changeSelectionBtn: '← Edit selection',
    disclaimerTitle: 'Please note',
    disclaimer1: 'These ranges are the rates our partner clinics apply to international patients, shown for reference.',
    disclaimer2: 'Clinics run different promotions each month, and the final cost shifts with your skin condition, the area treated, and the amount used.',
    disclaimer3: 'Your price is confirmed in the formal quote issued after an in-person consultation.',
    consultBtn: 'Get an exact quote · Free consultation',
    formatRange: (low, high) => (low === high ? `₩${toWon(low)}` : `₩${toWon(low)}–${toWon(high)}`),
    formatTotal: (low, high) => (low === high ? `₩${toWon(low)}` : `₩${toWon(low)}–${toWon(high)}`),
    won: '',
    askConsult: 'Quoted on request',
  },
}

/** grade B(단일 병원 출처) 항목은 개별 금액을 숨기고 상담 유도 문구로 대체 — 합산 총액에는 그대로 반영 */
function optionPriceLabel(opt: QuoteOption, c: Copy) {
  return opt.grade === 'B' ? c.askConsult : c.formatRange(opt.priceLow, opt.priceHigh)
}

interface Selection { categoryId: string; procedureId: string; optionIndex: number }

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

  const totals = useMemo(() => {
    let low = 0
    let high = 0
    for (const sel of selectedList) {
      const cat = QUOTE_CATEGORIES.find(cc => cc.id === sel.categoryId)
      const proc = cat?.procedures.find(p => p.id === sel.procedureId)
      const opt = proc?.options[sel.optionIndex]
      if (opt) {
        low += opt.priceLow
        high += opt.priceHigh
      }
    }
    return { low: Math.round(low * 10) / 10, high: Math.round(high * 10) / 10 }
  }, [selected])

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
                        return (
                          <button
                            key={opt.unit + i}
                            className={`quote-opt-chip${chosen ? ' chosen' : ''}`}
                            onClick={() => toggleOption(activeCat.id, proc.id, i)}
                          >
                            <span className="quote-opt-unit">{unitOf(opt)}</span>
                            <span className="quote-opt-price">{optionPriceLabel(opt, c)}</span>
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
                {selectedCount > 0 && (
                  <span className="quote-sticky-total">{c.formatRange(totals.low, totals.high)}</span>
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

            <div className="quote-total-card">
              {totals.low > 0 && (totals.high - totals.low) / totals.low > 0.5 && (
                <span className="quote-total-badge">{c.badgeText}</span>
              )}
              <div className="quote-total-amount">
                <span className="quote-total-label">{c.resultSumLabel}</span>
                <span className="quote-total-value">{c.formatTotal(totals.low, totals.high)}</span>
                <span className="quote-total-unit">{c.won}</span>
              </div>
              <span className="quote-total-vat">{c.resultSumVat}</span>
            </div>

            <p className="quote-items-title">{c.itemsTitle}</p>
            <div className="quote-item-list">
              {selectedList.map(sel => {
                const cat = QUOTE_CATEGORIES.find(cc => cc.id === sel.categoryId)
                const proc = cat?.procedures.find(p => p.id === sel.procedureId)
                const opt = proc?.options[sel.optionIndex]
                if (!proc || !opt) return null
                const names = nameOf(proc)
                return (
                  <div className="quote-item-row" key={sel.procedureId}>
                    <div className="quote-item-name">
                      <span>{names.main}</span>
                      <span className="quote-item-unit">{unitOf(opt)}</span>
                    </div>
                    <span className="quote-item-price">{optionPriceLabel(opt, c)}</span>
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
