import { useMemo, useState } from 'react'
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

type QuoteLang = 'zh' | 'ko'

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
  unit: string
  won: string
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
    unit: '万',
    won: '万韩元',
  },
  ko: {
    backHome: '← 홈으로',
    heroTitle: '인기 시술 예상 비용',
    heroSub: '한눈에 보는 인기 시술 가격대',
    selectGuide: '관심 있는 시술을 선택해주세요 (복수 선택 가능)',
    selectLimit: `최대 ${QUOTE_MAX_SELECTION}개까지 선택 가능합니다`,
    selectedCount: n => `${n}개 선택됨`,
    limitReachedMsg: '선택하신 항목이 많습니다. 상담사에게 전체 견적을 문의해주세요.',
    nextBtn: '예상 비용 확인하기',
    nextBtnEmpty: '시술을 먼저 선택해주세요',
    resultTitle: '예상 비용 구간',
    resultSumLabel: '합계 약',
    resultSumVat: '(VAT 10% 포함)',
    badgeText: '패키지 할인 적용 가능',
    itemsTitle: '선택하신 시술',
    changeSelectionBtn: '← 다시 선택하기',
    disclaimerTitle: '꼭 확인해주세요',
    disclaimer1: '위 금액은 외국인 환자 적용 가격대이며, 참고용입니다.',
    disclaimer2: '병원별 매월 프로모션이 다르며, 개인 피부 상태·시술 범위·용량에 따라 실제 비용은 달라질 수 있습니다.',
    disclaimer3: '최종 비용은 상담 후 정식 견적을 기준으로 확정됩니다.',
    consultBtn: '무료 상담 · 정확한 견적 받기',
    unit: '만원',
    won: '만원',
  },
}

function formatPrice(low: number, high: number, unit: string) {
  return low === high ? `${low}${unit}` : `${low}~${high}${unit}`
}

interface Selection { categoryId: string; procedureId: string; optionIndex: number }

export default function QuotePage() {
  const { lang, goHome } = useApp()
  const quoteLang: QuoteLang = lang === 'ko' ? 'ko' : 'zh'
  const c = COPY[quoteLang]

  const [view, setView] = useState<'select' | 'result'>('select')
  const [activeCategory, setActiveCategory] = useState(QUOTE_CATEGORIES[0].id)
  const [selected, setSelected] = useState<Record<string, Selection>>({})
  const [showLimitMsg, setShowLimitMsg] = useState(false)

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
  const nameOf = (proc: { nameKo: string; nameZh: string }) =>
    quoteLang === 'zh' ? { main: proc.nameZh, sub: proc.nameKo } : { main: proc.nameKo, sub: proc.nameZh }

  return (
    <div className="quote-widget">
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
                  {quoteLang === 'zh' ? cat.labelZh : cat.nameKo}
                </button>
              ))}
            </div>

            {/* ── procedure list ── */}
            <div className="quote-proc-list">
              {activeCat.procedures.map(proc => {
                const names = nameOf(proc)
                const isSelected = !!selected[proc.id]
                const notes = [...new Set(proc.options.map(o => o.note).filter(Boolean))] as string[]
                return (
                  <div key={proc.id} className={`quote-proc-card${isSelected ? ' selected' : ''}`}>
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
                            <span className="quote-opt-unit">{opt.unit}</span>
                            <span className="quote-opt-price">{formatPrice(opt.priceLow, opt.priceHigh, c.unit)}</span>
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
                  <span className="quote-sticky-total">{formatPrice(totals.low, totals.high, c.unit)}</span>
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
              <span className="quote-total-badge">{c.badgeText}</span>
              <div className="quote-total-amount">
                <span className="quote-total-label">{c.resultSumLabel}</span>
                <span className="quote-total-value">{formatPrice(totals.low, totals.high, '')}</span>
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
                      <span className="quote-item-unit">{opt.unit}</span>
                    </div>
                    <span className="quote-item-price">{formatPrice(opt.priceLow, opt.priceHigh, c.unit)}</span>
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
