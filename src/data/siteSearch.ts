import { categories, type CategoryId } from './categories'
import type { LocalizedText } from './bigHealthKeywords'
import { CATEGORY_SUBMENUS } from './categorySubmenus'
import { QUOTE_CATEGORIES } from './quoteProcedures'
import { SURGERY_GROUPS } from './surgeryPrices'
import PARTNERS from './partnersPublic.generated.json'
import type { LangCode } from './translations'

/* ══════════════════════════════════════════════════════════════════
   kmedispring.com 사이드바 검색 — "시술 이름 찾기" 용도.
   중국 고객은 보통 시술 이름(热玛吉·超声刀·双眼皮…)을 알고 들어오므로, 사이트 안의
   카테고리 / 세부 항목 / 견적 시술 / 성형 수가 항목을 이름 위주로 찾아 바로 보내준다.
   데이터는 전부 기존 파일에서 뽑으므로 시술을 추가·삭제하면 검색도 자동으로 따라간다.
   손님 단어와 사이트 단어가 다른 경우만 아래 SYNONYMS에 추가한다.
   ══════════════════════════════════════════════════════════════════ */

export type SearchTarget =
  | { type: 'category'; id: CategoryId; kw?: string }
  | { type: 'package' }
  | { type: 'quote'; cat?: string; proc?: string }
  | { type: 'surgery' }
  | { type: 'partners' }

export interface SearchResult {
  key: string
  title: string
  context: string
  target: SearchTarget
}

interface Entry {
  key: string
  title: LocalizedText
  context: LocalizedText
  target: SearchTarget
  /** 이름·별칭 — 강하게 매칭 */
  names: string[]
  /** 설명문 — 약하게 매칭 */
  text: string[]
}

/** 손님이 쓰는 말 → 사이트에 실제로 있는 말. 검색어에 왼쪽 단어가 들어 있으면 오른쪽 단어로도 찾는다. */
const SYNONYMS: Record<string, string[]> = {
  双眼皮: ['眼部整形', '双眼皮'],
  割双眼皮: ['眼部整形', '双眼皮'],
  眼睛: ['眼部整形', '眼部'],
  眼袋: ['眼袋', '下眼睑'],
  隆鼻: ['鼻部整形', '隆鼻'],
  鼻子: ['鼻部整形', '鼻'],
  拉皮: ['面部提升', '拉皮'],
  脸型: ['面部轮廓'],
  削骨: ['面部轮廓'],
  下巴: ['面部轮廓', '下巴'],
  玻尿酸: ['玻尿酸', '乔雅登', '瑞蓝', '保柔缇'],
  填充: ['玻尿酸', '填充'],
  肉毒: ['肉毒素', '瘦脸针'],
  瘦脸: ['瘦脸针', 'V脸'],
  除皱: ['除皱', '肉毒素'],
  雀斑: ['祛斑', '色斑'],
  黄褐斑: ['祛斑', '色斑'],
  斑: ['色斑', '祛斑'],
  痘印: ['痘疤', '祛痘'],
  痘坑: ['痘疤', '祛痘'],
  痘痘: ['祛痘', '痘'],
  毛孔: ['毛孔'],
  美白: ['美白'],
  抗衰: ['抗衰', '提升'],
  年轻: ['抗衰', '提升'],
  紧致: ['提升', '紧致'],
  体检: ['体检', '健康检查', '大健康'],
  检查: ['检查', '大健康'],
  冻卵: ['冻卵', '生育力'],
  试管: ['生育力'],
  怀孕: ['生育力'],
  增大: ['男性功能'],
  早泄: ['男性功能'],
  勃起: ['男性功能'],
  阳痿: ['男性功能'],
  私密: ['私密'],
  膝盖: ['膝关节'],
  关节: ['膝关节', '关节'],
  吸脂: ['吸脂'],
  减肥: ['吸脂', '代谢'],
  隆胸: ['胸部整形', '隆胸'],
  胸: ['胸部'],
  价格: ['费用'],
  多少钱: ['费用'],
  报价: ['费用'],
  旅游: ['3晚4天', '旅游'],
  行程: ['3晚4天', '定制'],
  lifting: ['提升'],
  botox: ['肉毒素'],
  filler: ['玻尿酸'],
}

const norm = (s: string) => s.toLowerCase().replace(/[\s·・,，、/()（）+\-]/g, '')

const L = (zh: string, en: string): LocalizedText => ({ zh, en })

function buildIndex(): Entry[] {
  const entries: Entry[] = []

  for (const c of categories) {
    const target: SearchTarget = c.id === 'medical-tourism' ? { type: 'package' } : { type: 'category', id: c.id }
    entries.push({
      key: `cat-${c.id}`,
      title: L(c.zh, c.en),
      context: L('服务分类', 'Category'),
      target,
      names: [c.zh, c.en, c.gridNameZh ?? '', c.gridNameEn ?? '', c.tagZh, c.tagEn],
      text: [c.scriptSummaryZh, c.scriptSummaryEn],
    })
    for (const kw of CATEGORY_SUBMENUS[c.id] ?? []) {
      entries.push({
        key: `kw-${c.id}-${kw.id}`,
        title: kw.title,
        context: L(c.zh, c.en),
        target: { type: 'category', id: c.id, kw: kw.id },
        names: [kw.title.zh, kw.title.en],
        text: kw.description ? [kw.description.zh, kw.description.en] : [],
      })
    }
  }

  entries.push({
    key: 'page-quote',
    title: L('热门轻医美项目费用预估', 'Popular Treatment Price Estimate'),
    context: L('费用', 'Prices'),
    target: { type: 'quote' },
    names: ['费用预估', '费用', 'price', 'estimate', '견적'],
    text: [],
  })
  for (const qc of QUOTE_CATEGORIES) {
    for (const p of qc.procedures) {
      entries.push({
        key: `quote-${p.id}`,
        title: L(p.nameZh, p.nameEn),
        context: L(`费用预估 · ${qc.nameZh}`, `Price Estimate · ${qc.nameEn}`),
        target: { type: 'quote', cat: qc.id, proc: p.id },
        names: [p.nameZh, p.nameEn, p.nameKo, qc.nameZh, qc.nameEn],
        text: [],
      })
    }
  }

  entries.push({
    key: 'page-surgery',
    title: L('整形手术费用参考', 'Surgery Price List'),
    context: L('费用', 'Prices'),
    target: { type: 'surgery' },
    names: ['整形手术费用', '手术费用', '费用', 'surgery price', '성형 수가'],
    text: [],
  })
  for (const g of SURGERY_GROUPS) {
    g.items.forEach((item, i) => {
      entries.push({
        key: `surgery-${g.id}-${i}`,
        title: L(item.zh, item.zh),
        context: L(`整形手术费用 · ${g.zh}`, `Surgery Prices · ${g.zh}`),
        target: { type: 'surgery' },
        names: [item.zh, item.ko, g.zh, g.ko],
        text: [],
      })
    })
  }

  // 全程服务·合作医疗机构 페이지(kmedispring.com 전용) — 페이지 자체 + 협력기관 이름
  entries.push({
    key: 'page-partners',
    title: L('全程服务 · 合作医疗机构', 'Our Services & Partners'),
    context: L('服务与资质', 'Services'),
    target: { type: 'partners' },
    names: ['合作医疗机构', '合作医院', '全程服务', '陪诊', '翻译陪同', 'partner', 'partners', 'hospital', '협력병원'],
    text: [],
  })
  for (const p of PARTNERS) {
    entries.push({
      key: `partner-${p.id}`,
      title: L(p.name.zh ?? '', p.name.en ?? ''),
      context: L('合作医疗机构', 'Partner Institution'),
      target: { type: 'partners' },
      names: [p.name.zh ?? '', p.name.en ?? '', p.name.ko ?? ''],
      text: [],
    })
  }

  return entries
}

let index: Entry[] | null = null

export function searchSite(query: string, lang: LangCode, limit = 8): SearchResult[] {
  const q = norm(query)
  if (!q) return []
  index ??= buildIndex()

  const terms = new Set([q])
  for (const [alias, words] of Object.entries(SYNONYMS)) {
    if (q.includes(norm(alias))) words.forEach((w) => terms.add(norm(w)))
  }

  const scored: { e: Entry; score: number }[] = []
  for (const e of index) {
    const names = e.names.map(norm).filter(Boolean)
    const title = norm(e.title[lang])
    let score = 0
    for (const t of terms) {
      const direct = t === q ? 1 : 0.8 // 동의어로 찾은 건 살짝 낮게
      if (title === t) score = Math.max(score, 100 * direct)
      else if (title.startsWith(t)) score = Math.max(score, 80 * direct)
      else if (names.some((n) => n.includes(t))) score = Math.max(score, 60 * direct)
      else if (t.length >= 2 && e.text.some((x) => norm(x).includes(t))) score = Math.max(score, 15 * direct)
    }
    if (score > 0) scored.push({ e, score })
  }

  // 같은 점수면 카테고리/세부 항목 → 견적 → 성형 수가 순(색인 순서 유지)
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(({ e }) => ({
    key: e.key,
    title: e.title[lang],
    context: e.context[lang],
    target: e.target,
  }))
}
