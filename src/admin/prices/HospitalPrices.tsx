import { useMemo, useRef, useState } from 'react'
import { HOSPITAL_PRICES, type HospitalPriceSheet, type PriceRow, type PriceTier } from './priceSheets'
import { toCnyText, toZhName, toZhSpec } from './zhNames'

/**
 * 병원별 수가 (관리자 전용)
 * ------------------------------------------------------------
 * · 검색어가 없으면: 병원별 수가표 카드 (분류별로 묶음)
 * · 검색어가 있으면: 모든 병원에서 그 시술만 뽑아 가격 낮은 순으로 한 표에 비교
 * · 중국어 이름·가격은 누르면 바로 복사 → 위챗에 붙여넣기
 * 데이터는 ./priceSheets.ts, 중국어 표기는 ./zhNames.ts 에서 고친다.
 */

const won = (v: number) => `${v.toLocaleString('ko-KR')}원`
const man = (v: number) => `${+(v / 10000).toFixed(1)}만`
const label = (h: HospitalPriceSheet) => (h.branch ? `${h.name} ${h.branch}` : h.name)
const zhOf = (row: PriceRow) => `${toZhName(row[1])} ${toZhSpec(row[2])}`
const zhPrice = (won: number) => `₩${won.toLocaleString('en-US')}（${toCnyText(won)}）`

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

const TIER_STYLE: Record<PriceTier, { bg: string; fg: string }> = {
  중가: { bg: 'rgba(15,110,86,0.1)', fg: '#0F6E56' },
  고가: { bg: 'rgba(184,147,76,0.16)', fg: '#8A6C33' },
}

function TierBadge({ tier }: { tier: PriceTier }) {
  const s = TIER_STYLE[tier]
  return <span className="hp-badge" style={{ background: s.bg, color: s.fg }}>{tier}</span>
}

export default function HospitalPrices() {
  const [query, setQuery] = useState('')
  const [tier, setTier] = useState<'전체' | PriceTier>('전체')
  const [hospitalId, setHospitalId] = useState<string>('all')
  const [copied, setCopied] = useState<string | null>(null)
  const toastTimer = useRef<number>()

  const copy = (text: string) => {
    void copyText(text)
    setCopied(text)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setCopied(null), 1600)
  }

  /** 시술명 셀 (한국어 + 누르면 복사되는 중국어) */
  const nameCell = (row: PriceRow) => (
    <td>
      {row[1]}
      <button type="button" className="hp-zh" onClick={() => copy(zhOf(row))}>{zhOf(row)}</button>
    </td>
  )
  /** 가격 셀 — 누르면 '₩290,000（约¥1,420）' 복사 */
  const priceCell = (v: number) => (
    <td className="r">
      <button type="button" className="hp-price" onClick={() => copy(zhPrice(v))}>
        <b>{man(v)}</b><span className="hp-won">{won(v)}</span>
      </button>
    </td>
  )

  const sheets = useMemo(
    () => HOSPITAL_PRICES.filter(h => (tier === '전체' || h.tier === tier) && (hospitalId === 'all' || h.id === hospitalId)),
    [tier, hospitalId],
  )

  const q = query.trim().toLowerCase().replace(/\s+/g, '')
  const matches = useMemo(() => {
    if (!q) return []
    return sheets
      .flatMap(h => h.items.map(row => ({ h, row })))
      .filter(({ row }) => `${row[0]}${row[1]}${row[2]}${row[4] ?? ''}${zhOf(row)}`.toLowerCase().replace(/\s+/g, '').includes(q))
      .sort((a, b) => a.row[1].localeCompare(b.row[1], 'ko') || a.row[2].localeCompare(b.row[2], 'ko') || a.row[3] - b.row[3])
  }, [q, sheets])

  return (
    <div className="hp-root">
      <style>{CSS}</style>
      <header className="hp-head">
        <p className="hp-eyebrow">HANGANG AEBOM · INTERNAL</p>
        <h1 className="hp-title">병원별 수가</h1>
        <p className="hp-desc">
          중가 = 원셀(참고용) · 리베리 · 클림 &nbsp;/&nbsp; 고가 = 리앤장 · 셀온 · 살롱드닥터 · 바노바기
          <br />별도 표기 없으면 VAT 별도 · 고객용 견적은 이 표를 보고 분기마다 맞춥니다.
          <br /><b className="hp-hint">파란 중국어 이름과 가격은 누르면 바로 복사됩니다 → 위챗에 붙여넣기</b>
        </p>
      </header>

      <div className="hp-controls">
        <label className="hp-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="시술명 검색 (한국어·중국어) — 예: 리쥬란, 热玛吉, 黑盒"
          />
          {query && <button className="hp-clear" onClick={() => setQuery('')}>지우기</button>}
        </label>
        <div className="hp-chips">
          {(['전체', '중가', '고가'] as const).map(t => (
            <button key={t} className={`hp-chip${tier === t ? ' on' : ''}`} onClick={() => setTier(t)}>{t}</button>
          ))}
          <span className="hp-sep" />
          <button className={`hp-chip${hospitalId === 'all' ? ' on' : ''}`} onClick={() => setHospitalId('all')}>모든 병원</button>
          {HOSPITAL_PRICES.map(h => (
            <button key={h.id} className={`hp-chip${hospitalId === h.id ? ' on' : ''}`} onClick={() => setHospitalId(h.id)}>
              {label(h)}
            </button>
          ))}
        </div>
      </div>

      {q ? (
        <section className="hp-card">
          <p className="hp-card-title">'{query.trim()}' 병원별 비교 <span className="hp-muted">{matches.length}건</span></p>
          {matches.length === 0 ? (
            <p className="hp-empty">해당 시술이 없습니다. 다른 이름으로 검색해 보세요 (예: 울쎄라 → 울쎄라피).</p>
          ) : (
            <table className="hp-table">
              <thead><tr><th>시술</th><th>사양</th><th>병원</th><th className="r">가격</th><th>비고</th></tr></thead>
              <tbody>
                {matches.map(({ h, row }, i) => (
                  <tr key={h.id + i}>
                    {nameCell(row)}
                    <td className="hp-muted">{row[2]}</td>
                    <td><TierBadge tier={h.tier} /> {label(h)}{h.referenceOnly && <span className="hp-ref">참고용</span>}</td>
                    {priceCell(row[3])}
                    <td className="hp-muted">{row[4] ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ) : (
        sheets.map(h => {
          const groups = h.items.reduce<Record<string, typeof h.items>>((acc, row) => {
            (acc[row[0]] ??= []).push(row)
            return acc
          }, {})
          return (
            <section className="hp-card" key={h.id}>
              <div className="hp-card-head">
                <p className="hp-card-title"><TierBadge tier={h.tier} /> {label(h)}{h.referenceOnly && <span className="hp-ref">참고용 · 송객 불가</span>}</p>
                {h.referenceOnly && <p className="hp-ref-note">{h.referenceOnly}</p>}
                <p className="hp-meta">기준 {h.asOf} · {h.vat}</p>
                {h.note && <p className="hp-meta">{h.note}</p>}
                <p className="hp-src">원본: {h.source}</p>
              </div>
              {Object.entries(groups).map(([cat, rows]) => (
                <div key={cat} className="hp-group">
                  <p className="hp-group-title">{cat}</p>
                  <table className="hp-table">
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i}>
                          {nameCell(row)}
                          <td className="hp-muted">{row[2]}</td>
                          {priceCell(row[3])}
                          <td className="hp-muted">{row[4] ?? ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </section>
          )
        })
      )}
      {copied && <div className="hp-toast">복사됨 · 已复制<span>{copied}</span></div>}
    </div>
  )
}

const CSS = `
.hp-root { max-width: 920px; margin: 0 auto; padding: 32px 16px 24px; font-family: 'Noto Sans KR', system-ui, sans-serif; color: #1E2A36; background: #F7F5F0; min-height: 100vh; box-sizing: border-box; }
.hp-head { margin-bottom: 18px; }
.hp-eyebrow { font: 500 11px 'IBM Plex Mono', monospace; letter-spacing: .12em; color: #8A6C33; margin: 0 0 6px; }
.hp-title { font: 700 26px 'Noto Serif KR', serif; margin: 0 0 8px; }
.hp-desc { font-size: 13px; line-height: 1.7; color: #5B6878; margin: 0; }
.hp-controls { position: sticky; top: 0; z-index: 2; background: #F7F5F0; padding: 10px 0 12px; }
.hp-search { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #E2DDD2; border-radius: 12px; padding: 10px 12px; color: #7C8B9C; }
.hp-search input { flex: 1; border: 0; outline: 0; font-size: 15px; color: #1E2A36; background: transparent; min-width: 0; }
.hp-clear { border: 0; background: none; color: #7C8B9C; font-size: 12px; cursor: pointer; }
.hp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; align-items: center; }
.hp-chip { border: 1px solid #E2DDD2; background: #fff; color: #3A4756; border-radius: 999px; padding: 5px 11px; font-size: 12.5px; cursor: pointer; }
.hp-chip.on { background: #1C3F66; border-color: #1C3F66; color: #fff; }
.hp-sep { width: 1px; height: 18px; background: #E2DDD2; margin: 0 4px; }
.hp-card { background: #fff; border: 1px solid #E8E3D8; border-radius: 16px; padding: 18px 18px 8px; margin-bottom: 14px; }
.hp-card-head { margin-bottom: 8px; }
.hp-card-title { font-size: 17px; font-weight: 700; margin: 0 0 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.hp-meta { font-size: 12.5px; color: #5B6878; margin: 0 0 2px; }
.hp-src { font-size: 11px; color: #9AA5B1; margin: 4px 0 0; word-break: break-all; }
.hp-badge { font-size: 11px; font-weight: 700; border-radius: 6px; padding: 2px 7px; white-space: nowrap; }
.hp-group { margin-top: 12px; }
.hp-group-title { font-size: 12px; font-weight: 700; color: #8A6C33; margin: 0 0 4px; }
.hp-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.hp-table th { text-align: left; font-size: 11.5px; color: #7C8B9C; font-weight: 600; padding: 6px 6px; border-bottom: 1px solid #E8E3D8; }
.hp-table td { padding: 7px 6px; border-bottom: 1px solid #F1EDE5; vertical-align: top; }
.hp-table .r { text-align: right; white-space: nowrap; }
.hp-won { display: block; font-size: 10.5px; color: #9AA5B1; font-weight: 400; }
.hp-muted { color: #7C8B9C; font-size: 12.5px; }
.hp-zh { display: block; margin-top: 3px; padding: 3px 7px; border: 0; border-radius: 6px; background: rgba(28,63,102,0.07); color: #1C5FA0; font: 500 13px 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif; text-align: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.hp-zh:active, .hp-price:active { background: rgba(28,63,102,0.18); }
.hp-price { border: 0; background: none; padding: 2px 4px; border-radius: 6px; text-align: right; cursor: pointer; font: inherit; color: inherit; }
.hp-hint { color: #1C5FA0; font-weight: 600; }
.hp-toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); background: #1E2A36; color: #fff; font-size: 13px; padding: 10px 16px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); z-index: 10; max-width: calc(100vw - 32px); text-align: center; }
.hp-toast span { display: block; margin-top: 3px; font-size: 12px; opacity: 0.8; word-break: break-all; }
.hp-ref { font-size: 11px; font-weight: 700; color: #B23A2E; background: rgba(178,58,46,0.09); border-radius: 6px; padding: 2px 7px; margin-left: 6px; white-space: nowrap; }
.hp-ref-note { font-size: 12.5px; color: #B23A2E; background: rgba(178,58,46,0.06); border-radius: 8px; padding: 8px 10px; margin: 6px 0 4px; line-height: 1.6; }
.hp-empty { font-size: 13px; color: #7C8B9C; padding: 8px 0 12px; }
@media (max-width: 560px) {
  .hp-table td:last-child, .hp-table th:last-child { display: none; }
  .hp-table { font-size: 12.5px; }
}
`
