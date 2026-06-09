import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { ContactSection, MedicalNetworkSection, AboutSection, FooterSection } from './HomePage'

const WECHAT_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

/* ── types ─────────────────────────────────────────────── */

type ItemType = 'medical' | 'service' | 'spot' | 'food' | 'shop' | 'rest'
interface DayItem { text: string; type: ItemType }
interface DayData { day: number; title: string; items: DayItem[] }

type SlotKey = 'day1Spot' | 'day2Spot' | 'day3MorningSpot' | 'day3AftShop'
type Selections = Record<SlotKey, string>

/* ── static data ───────────────────────────────────────── */

const INCLUDES = [
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>, text: '医疗咨询与到院协助' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, text: '中文翻译沟通' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 15V7a2 2 0 012-2h8l4 4v6"/></svg>, text: '车辆与基础行程安排' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, text: '首尔核心景点 4处' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, text: '自由购物时间 2次' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: '医院访问 3次' },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8" strokeLinecap="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>, text: '可选韩式体验' },
]

const PRICES = [
  { group: '1 人', price: '6,500', unit: '元 / 人' },
  { group: '2–3 人', price: '6,000', unit: '元 / 人' },
  { group: '4 人', price: '5,000', unit: '元 / 人' },
]

const ADJUSTABLE = [
  { label: '景点', options: '北村韩屋村 · 仁寺洞 · 南山塔 · 清溪川 · 广藏市场 等 17处可选' },
  { label: '购物', options: 'The Hyundai Seoul · 明洞 · 乐天 · 新世界 · COEX 等 18处可选' },
  { label: '体验', options: '韩式料理课程 · K-POP舞蹈 · 唱歌体验' },
  { label: '医疗咨询', options: '根据客户需求调整组合' },
]

/* ── selection options ─────────────────────────────────── */

const SPOT_OPTIONS = [
  '北村韩屋村', '仁寺洞', '南山首尔塔', '汉江公园', '清溪川',
  '广藏市场', '益善洞', '昌德宫', '德寿宫', '东大门设计广场 DDP',
  'COEX 星光图书馆', '圣水洞', '弘大步行街', '林荫道',
  '梨泰院', '西村', '首尔天空观景台',
]

const SHOP_OPTIONS = [
  '现代百货 The Hyundai Seoul', '明洞', '乐天百货总店', '新世界百货总店',
  '现代百货狎鸥亭总店', 'Starfield COEX Mall', '乐天世界购物城', 'IFC Mall',
  '时代广场 Times Square', '现代百货贸易中心店', 'Galeria 名品馆',
  '狎鸥亭罗德奥', '林荫道', '圣水洞买手店街区', '弘大购物街',
  '东大门时尚城', '高速巴士地下商街 GOTO Mall', 'Common Ground',
]

const DEFAULT_SELECTIONS: Selections = {
  day1Spot:        '北村韩屋村',
  day2Spot:        '仁寺洞',
  day3MorningSpot: '景福宫',
  day3AftShop:     '现代百货 The Hyundai Seoul',
}

interface SlotDef {
  key: SlotKey
  label: string
  summaryLabel: string
  options: string[]
  slotType: 'spot' | 'shop'
}

interface SlotGroup { dayLabel: string; slots: SlotDef[] }

const SLOT_GROUPS: SlotGroup[] = [
  {
    dayLabel: 'DAY 1',
    slots: [
      { key: 'day1Spot', label: '景点', summaryLabel: '第1天景点', options: SPOT_OPTIONS, slotType: 'spot' },
    ],
  },
  {
    dayLabel: 'DAY 2',
    slots: [
      { key: 'day2Spot', label: '下午景点', summaryLabel: '第2天下午景点', options: SPOT_OPTIONS, slotType: 'spot' },
    ],
  },
  {
    dayLabel: 'DAY 3',
    slots: [
      { key: 'day3MorningSpot', label: '上午景点',   summaryLabel: '第3天上午景点',   options: SPOT_OPTIONS, slotType: 'spot' },
      { key: 'day3AftShop',     label: '下午购物地点', summaryLabel: '第3天下午购物地点', options: SHOP_OPTIONS, slotType: 'shop' },
    ],
  },
]

const ALL_SLOTS: SlotDef[] = SLOT_GROUPS.flatMap(g => g.slots)

/* ── dynamic itinerary ─────────────────────────────────── */

function getDays(sel: Selections): DayData[] {
  return [
    {
      day: 1, title: '抵达首尔',
      items: [
        { text: '入境', type: 'rest' },
        { text: '机场接送', type: 'service' },
        { text: '入住酒店', type: 'rest' },
        { text: '第1次到院：初诊咨询 / 基本检查', type: 'medical' },
        { text: sel.day1Spot, type: 'spot' },
        { text: '韩式烤肉晚餐', type: 'food' },
      ],
    },
    {
      day: 2, title: '医疗咨询与恢复',
      items: [
        { text: '酒店早餐', type: 'food' },
        { text: '第2次到院：医疗项目', type: 'medical' },
        { text: 'Sudam 韩定食', type: 'food' },
        { text: '恢复 / 再生管理', type: 'rest' },
        { text: sel.day2Spot, type: 'spot' },
        { text: '参鸡汤晚餐', type: 'food' },
      ],
    },
    {
      day: 3, title: '体验与自由购物',
      items: [
        { text: '酒店早餐', type: 'food' },
        { text: '可选体验', type: 'spot' },
        { text: sel.day3MorningSpot, type: 'spot' },
        { text: '景点午餐', type: 'food' },
        { text: `自由购物：${sel.day3AftShop}`, type: 'shop' },
        { text: '晚餐自由选择', type: 'food' },
      ],
    },
    {
      day: 4, title: '复查与离境',
      items: [
        { text: '酒店早餐', type: 'food' },
        { text: '第3次到院：术后复查', type: 'medical' },
        { text: '自由简餐', type: 'food' },
        { text: '离境准备', type: 'rest' },
        { text: '前往机场', type: 'service' },
        { text: '如有需要可安排免税购物', type: 'shop' },
      ],
    },
  ]
}

/* ── item dot colors ──────────────────────────────────── */

const itemColor: Record<ItemType, string> = {
  medical: '#0077b6',
  service: '#4a9cc7',
  spot:    '#5a8fa8',
  food:    '#7a9ab5',
  shop:    '#6b8ca5',
  rest:    '#9ab0c0',
}

/* ── select arrow ─────────────────────────────────────── */

function SelectArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <path d="M3 4.5l3 3 3-3" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── component ───────────────────────────────────────── */

export default function PackagePage() {
  const { goHome } = useApp()
  const [selections, setSelections] = useState<Selections>(DEFAULT_SELECTIONS)

  const days = getDays(selections)
  const updateSlot = (key: SlotKey, value: string) =>
    setSelections(s => ({ ...s, [key]: value }))

  return (
    <div>

      {/* ══ Hero ══════════════════════════════════════════════ */}
      <div className="cat-hero" style={{ paddingBottom: 36 }}>
        <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
          ← 返回首页
        </motion.button>

        <motion.h1 className="cat-hero-name" {...fadeUp} transition={{ delay: 0.05 }}>
          汉江春天 3晚4天方案
        </motion.h1>

        <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
          医疗咨询 · 翻译陪同 · 行程协助 · 韩国停留安排
        </motion.p>

        <motion.p
          {...fadeUp} transition={{ delay: 0.15 }}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginTop: 14, marginBottom: 22 }}
        >
          从医疗咨询到韩国停留，我们为您整理更安心、更清晰的 3晚4天赴韩行程。
        </motion.p>

        <motion.button
          {...fadeUp} transition={{ delay: 0.2 }}
          onClick={() => window.open(WECHAT_URL, '_blank')}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 12,
            background: 'white',
            border: 'none',
            color: 'var(--brand-dark, #003d6b)',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '0.02em',
            marginBottom: 14,
          }}
        >
          联系顾问咨询
        </motion.button>

        <motion.p
          {...fadeUp} transition={{ delay: 0.22 }}
          style={{ fontSize: 10, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, textAlign: 'center' }}
        >
          医疗费用不包含在本方案内，具体医疗项目需另行咨询确认。
        </motion.p>
      </div>

      {/* ══ 方案包含什么 ═══════════════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">方案包含什么？</p>
          <div className="section-accent-line" />
        </motion.div>

        <motion.div {...fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 18 }}>
          {INCLUDES.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          {...fadeUp}
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            background: 'rgba(0,119,182,0.05)',
            border: '1px solid rgba(0,119,182,0.14)',
            borderRadius: 8,
            padding: '9px 12px',
          }}
        >
          不含酒店及医疗费用。酒店可根据需要单独协助安排。
        </motion.p>
      </section>

      {/* ══ 价格 ═══════════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">基础行程价格</p>
          <div className="section-accent-line" />
        </motion.div>

        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {PRICES.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white',
                border: '1px solid rgba(0,119,182,0.14)',
                borderLeft: '3px solid var(--brand)',
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{p.group}</span>
              <span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-dark, #003d6b)', letterSpacing: '-0.02em' }}>
                  {p.price}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>{p.unit}</span>
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp} style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          费用包含车辆、医院陪同、景点安排及基础行程陪同。<br />
          不包含酒店、医疗费用及个人消费。
        </motion.p>
      </section>

      {/* ══ 景点 / 购物地点 选择 ══════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 36 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">可自由调整景点与购物地点</p>
          <div className="section-accent-line" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 22 }}>
            在下方选择您偏好的景点与购物地点，行程安排将自动更新。
          </p>
        </motion.div>

        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SLOT_GROUPS.map(group => (
            <div key={group.dayLabel}>

              {/* day divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: 'white',
                  background: 'var(--brand)',
                  borderRadius: 20,
                  padding: '3px 10px',
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                }}>
                  {group.dayLabel}
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(0,119,182,0.12)' }} />
              </div>

              {/* slot cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.slots.map(slot => (
                  <div
                    key={slot.key}
                    style={{
                      background: 'white',
                      border: '1px solid rgba(0,119,182,0.15)',
                      borderLeft: `3px solid ${slot.slotType === 'shop' ? '#6b8ca5' : 'var(--brand)'}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                    }}
                  >
                    <p style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: slot.slotType === 'shop' ? '#6b8ca5' : 'var(--brand)',
                      marginBottom: 8,
                      letterSpacing: '0.06em',
                    }}>
                      {slot.label}
                    </p>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={selections[slot.key]}
                        onChange={e => updateSlot(slot.key, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 36px 10px 12px',
                          borderRadius: 8,
                          border: '1px solid rgba(0,119,182,0.2)',
                          background: 'rgba(0,119,182,0.03)',
                          color: 'var(--text)',
                          fontSize: 13,
                          fontWeight: 500,
                          fontFamily: 'inherit',
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                        }}
                      >
                        {slot.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div style={{
                        position: 'absolute',
                        right: 11,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}>
                        <SelectArrow />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </motion.div>

        {/* ── 我的行程选择 summary ── */}
        <motion.div
          {...fadeUp}
          style={{
            marginTop: 24,
            background: 'rgba(0,119,182,0.04)',
            border: '1px solid rgba(0,119,182,0.15)',
            borderRadius: 12,
            padding: '16px',
          }}
        >
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand)',
            letterSpacing: '0.08em',
            marginBottom: 14,
          }}>
            我的行程选择
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {ALL_SLOTS.map(slot => (
              <div
                key={slot.key}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}
              >
                <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
                  {slot.summaryLabel}
                </span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--brand-dark, #003d6b)',
                  background: 'white',
                  border: '1px solid rgba(0,119,182,0.18)',
                  borderRadius: 20,
                  padding: '3px 11px',
                  whiteSpace: 'nowrap' as const,
                  maxWidth: '54%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {selections[slot.key]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ 3晚4天行程 ═════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">3晚4天行程安排</p>
          <div className="section-accent-line" />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
            以下行程已根据您的选择自动更新。
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {days.map((day, di) => (
            <motion.div key={day.day} {...fadeUp} transition={{ delay: di * 0.08 }}>

              {/* day header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: 'white',
                  background: 'var(--brand)',
                  borderRadius: 20,
                  padding: '4px 11px',
                  letterSpacing: '0.1em',
                }}>
                  DAY {day.day}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-dark, #003d6b)' }}>
                  {day.title}
                </span>
              </div>

              {/* activity list */}
              <div style={{ position: 'relative', paddingLeft: 20 }}>
                <div style={{
                  position: 'absolute',
                  left: 6,
                  top: 6,
                  bottom: 6,
                  width: 1,
                  background: 'rgba(0,119,182,0.15)',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {day.items.map((item, ii) => {
                    const isMedical = item.type === 'medical'

                    if (isMedical) {
                      return (
                        <div
                          key={ii}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: 6,
                          }}
                        >
                          {/* dot — on the timeline line, outside the box */}
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: itemColor.medical,
                            flexShrink: 0,
                            marginTop: 13,
                            marginLeft: -18,
                            marginRight: 12,
                            position: 'relative',
                            zIndex: 1,
                          }} />
                          {/* highlight box, visually separated from dot */}
                          <div style={{
                            flex: 1,
                            background: 'rgba(0,119,182,0.06)',
                            borderLeft: '2px solid var(--brand)',
                            borderRadius: '0 8px 8px 0',
                            padding: '10px 12px',
                          }}>
                            <p style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: 'var(--brand-dark, #003d6b)',
                              lineHeight: 1.5,
                              margin: 0,
                            }}>
                              {item.text}
                            </p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={ii}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          padding: '7px 0',
                        }}
                      >
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: itemColor[item.type],
                          flexShrink: 0,
                          marginTop: 5,
                          position: 'relative',
                          zIndex: 1,
                          marginLeft: -20,
                        }} />
                        <p style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: 'var(--text)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}>
                          {item.text}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 可调整项目 ════════════════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">可根据客户喜好调整</p>
          <div className="section-accent-line" />
        </motion.div>

        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {ADJUSTABLE.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--brand)',
                background: 'rgba(0,119,182,0.08)',
                border: '1px solid rgba(0,119,182,0.18)',
                borderRadius: 6,
                padding: '3px 9px',
                whiteSpace: 'nowrap' as const,
                flexShrink: 0,
              }}>
                {item.label}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>
                {item.options}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp} style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          具体景点、购物地点与体验项目，可根据客户时间、体力、医疗安排与个人喜好调整。
        </motion.p>
      </section>

      {/* ══ 核心理念 ══════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 11,
            color: 'var(--blue-light)',
            letterSpacing: '0.18em',
            marginBottom: 12,
          }}>
            这不是普通旅游行程
          </p>
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--brand-dark, #003d6b)',
            lineHeight: 1.7,
            marginBottom: 16,
          }}>
            汉江春天 3晚4天方案，<br />不是简单把医院和景点排在一起。
          </p>
          <div style={{ width: 32, height: 2, background: 'var(--brand)', borderRadius: 1, margin: '0 auto 16px' }} />
          <p style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.9,
            maxWidth: 320,
            margin: '0 auto',
          }}>
            我们会根据您的医疗咨询需求、恢复时间、移动距离与停留节奏，帮您安排更轻松、更安心的韩国行程。
          </p>
        </motion.div>
      </section>

      {/* ══ 底部 CTA ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--brand)', padding: '36px 20px 40px' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            marginBottom: 10,
            lineHeight: 1.4,
          }}>
            想了解适合您的 3晚4天方案？
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.8,
            marginBottom: 24,
          }}>
            告诉我们您的来韩时间、关注项目、<br />同行人数与预算范围，<br />我们会先为您整理适合的行程方向。
          </p>
          <button
            onClick={() => window.open(WECHAT_URL, '_blank')}
            style={{
              width: '100%',
              padding: '15px 0',
              borderRadius: 12,
              background: 'white',
              border: 'none',
              color: 'var(--brand-dark, #003d6b)',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            联系顾问咨询
          </button>
        </motion.div>
      </section>

      {/* ══ Common footer sections ════════════════════════════ */}
      <ContactSection />
      <MedicalNetworkSection />
      <AboutSection />
      <FooterSection />

    </div>
  )
}
