import type { CategoryId } from '../../data/categories'
import type { LocalizedText } from '../../data/bigHealthKeywords'
import { BIG_HEALTH_KEYWORDS } from '../../data/bigHealthKeywords'
import { SKIN_AESTHETICS_KEYWORDS, SKIN_AESTHETICS_SECTION } from '../../data/skinAestheticsKeywords'
import { PLASTIC_SURGERY_KEYWORDS, PLASTIC_SURGERY_SECTION } from '../../data/plasticSurgeryKeywords'
import { STEM_CELL_KEYWORDS, STEM_CELL_INTRO } from '../../data/stemCellKeywords'
import { WOMENS_HEALTH_KEYWORDS } from '../../data/womensHealthKeywords'
import { MENS_HEALTH_KEYWORDS } from '../../data/mensHealthKeywords'
import type { LangCode } from '../../data/translations'

/* ══════════════════════════════════════════════════════════════════
   kmedispring.com 세부 항목 페이지용 "읽기 문서" 모델.
   카테고리마다 키워드 데이터 형식이 다르다(피부·성형·대건강·줄기세포·여성·남성).
   ai-kmedi.com은 이것들을 카드/타일로 빽빽하게 그리지만, Editorial 스킨은
   HTML5 UP의 Generic/Elements 페이지처럼 제목 → 짧은 문단 → 목록/표/그림/인용으로 읽히게 한다.
   여기서 6가지 형식을 하나의 블록 목록으로 바꿔서 렌더러(EditorialTopic)는 한 벌만 둔다.
   데이터 파일은 건드리지 않으므로 ai-kmedi.com과 항상 같은 내용이 나간다.
   ══════════════════════════════════════════════════════════════════ */

export type Block =
  | { kind: 'paras'; title?: string; paras: string[] }
  | { kind: 'note'; text: string[]; tone: 'info' | 'warning' }
  | { kind: 'list'; title?: string; items: string[]; groups?: { label: string; items: string[] }[] }
  | { kind: 'table'; title?: string; head?: [string, string]; rows: [string, string][]; caution?: string[] }
  | { kind: 'figure'; title: string; image?: string; body: string }
  | { kind: 'steps'; title: string; image: string; alt: string; steps: { title: string; body: string }[]; footnote?: string }
  | { kind: 'compare'; title: string; sub?: string; cols: string[]; rows: { label: string; cells: string[] }[] }
  | { kind: 'case'; title: string; caption?: string; photos: { src: string; alt: string }[]; credit?: string; plan?: { title: string; tag: string; notes: string[]; highlight: string } }
  | { kind: 'split'; caption?: string; image: string; media: { type: 'image' | 'video'; src: string }; footer?: string; credit?: string }
  | { kind: 'tags'; groups: string[][] }

export interface Topic {
  id: string
  title: string
  subtitle?: string
  /** 페이지 대표 사진 (타일 사진) — 없으면 카테고리 대표 사진을 쓴다 */
  image?: string
  /** 대표 영상 — 있으면 타일·페이지 상단에서 사진 대신 재생(피부 肉毒素 玻尿酸 입술 영상) */
  video?: string
  /** 페이지 맨 위에 사진·영상 두 칸을 같은 높이로(줄기세포 Immuncell-LC). 있으면 대표 사진 대신 이걸 쓴다. */
  heroSplit?: { image: string; media: { type: 'image' | 'video'; src: string }; ratios: [number, number]; caption?: string }
  /** 카테고리 페이지 카드용 한두 줄 요약 */
  summary: string
  blocks: Block[]
}

const L = (t: LocalizedText | undefined, lang: LangCode) => (t ? t[lang] ?? '' : '')
const splitParas = (s: string) => s.split(/\n\n+/).map((x) => x.trim()).filter(Boolean)
const splitLines = (s: string) => s.split(/\n+/).map((x) => x.trim()).filter(Boolean)

/** 카드 요약: 첫 문장(。/./!/?)까지, 너무 길면 자른다(영어는 글자당 정보량이 적어 더 길게) */
function summarize(s: string, lang: LangCode) {
  const max = lang === 'en' ? 130 : 64
  const first = s.split(/(?<=[。！？!?])|(?<=\.)\s/)[0]?.trim() ?? s
  const text = first.length >= 12 ? first : s
  return text.length > max ? `${text.slice(0, max)}…` : text
}

/** 단계 제목 앞에 데이터가 이미 붙여둔 ①② 같은 원문자 번호 — 페이지가 번호를 따로 그리므로 뗀다 */
const stripCircledNum = (s: string) => s.replace(/^[①-⑳⓵-⓾]\s*/, '')

const nonEmpty = <T,>(b: T | false | null | undefined | ''): b is T => Boolean(b)

function skinTopics(lang: LangCode): Topic[] {
  return SKIN_AESTHETICS_KEYWORDS.map((k) => {
    const desc = L(k.description, lang)
    const groups = k.directionGroups?.length && L(k.directionGroups[0].label, lang)
      ? k.directionGroups.map((g) => ({ label: L(g.label, lang), items: g.items.map((i) => L(i, lang)) }))
      : undefined
    const blocks: (Block | false | undefined)[] = [
      { kind: 'paras', paras: splitParas(desc) },
      k.specialNote && { kind: 'note', text: splitParas(L(k.specialNote, lang)), tone: 'info' },
      { kind: 'list', title: L(k.directionsLabel, lang), items: groups ? [] : k.directions.map((d) => L(d, lang)), groups },
      k.popularDevices && L(k.popularDevices.title, lang) && {
        kind: 'table', title: L(k.popularDevices.title, lang),
        rows: k.popularDevices.items.map((i) => [L(i.name, lang), L(i.desc, lang)] as [string, string]),
        caution: splitLines(L(k.popularDevices.caution, lang)),
      },
      k.productGroups?.length && L(k.productGroups[0].label, lang) && {
        kind: 'list', title: L(k.productGroupsLabel, lang) || undefined, items: [],
        groups: k.productGroups.map((g) => ({ label: L(g.label, lang), items: g.items.map((i) => L(i, lang)) })),
      },
      k.explainerTitle && k.explainerBody && L(k.explainerTitle, lang) && {
        kind: 'paras', title: L(k.explainerTitle, lang), paras: splitParas(L(k.explainerBody, lang)),
      },
      ...(k.referenceIllustration ?? []).map((r): Block => ({ kind: 'figure', title: L(r.title, lang), image: r.image, body: L(r.body, lang) })),
      k.stepGuide && {
        kind: 'steps', title: L(k.stepGuide.title, lang), image: k.stepGuide.image, alt: L(k.stepGuide.imageAlt, lang),
        steps: k.stepGuide.steps.map((s) => ({ title: stripCircledNum(L(s.title, lang)), body: L(s.body, lang) })),
        footnote: L(k.stepGuide.footnote, lang) || undefined,
      },
      k.comparisonTable && {
        kind: 'compare', title: L(k.comparisonTable.title, lang), sub: L(k.comparisonTable.subCopy, lang) || undefined,
        cols: lang === 'en'
          ? ['Ingredient', 'Suitable For', 'Discomfort', 'Recovery']
          : ['主要成分', '适合改善', '疼痛感', '恢复期'],
        rows: k.comparisonTable.rows.map((r) => ({
          label: `${L(r.type, lang)} · ${L(r.product, lang)}`,
          cells: [
            L(r.ingredient, lang),
            L(r.concerns, lang) + (r.effectNote ? `（${L(r.effectNote, lang)}）` : ''),
            `${'●'.repeat(r.painScore)}${'○'.repeat(3 - r.painScore)} ${L(r.painLabel, lang)}`,
            L(r.recovery, lang),
          ],
        })),
      },
      k.realCase && {
        kind: 'case', title: lang === 'en' ? 'Real Case' : '真实案例',
        photos: k.realCase.photos.map((p) => ({ src: p.src, alt: L(p.alt, lang) })),
        credit: L(k.realCase.credit, lang) || undefined,
        plan: {
          title: L(k.realCase.planTitle, lang), tag: L(k.realCase.planTag, lang),
          notes: k.realCase.planNotes.map((n) => L(n, lang)), highlight: L(k.realCase.planHighlight, lang),
        },
      },
      k.note && { kind: 'note', text: splitParas(L(k.note, lang)), tone: k.noteStyle === 'warning' ? 'warning' : 'info' },
    ]
    return { id: k.id, title: L(k.title, lang), image: k.image, video: k.video, summary: summarize(desc, lang), blocks: blocks.filter(nonEmpty) }
  })
}

function plasticTopics(lang: LangCode): Topic[] {
  return PLASTIC_SURGERY_KEYWORDS.map((k) => {
    const desc = L(k.description, lang)
    const blocks: (Block | false | undefined | '')[] = [
      { kind: 'paras', paras: splitParas(desc) },
      { kind: 'list', title: L(k.directionsLabel, lang), items: k.directions.map((d) => L(d, lang)) },
      k.safetyChecklistLabel && k.safetyChecklist && {
        kind: 'list', title: L(k.safetyChecklistLabel, lang), items: k.safetyChecklist.map((d) => L(d, lang)),
      },
      k.popularDevices && L(k.popularDevices.title, lang) && {
        kind: 'table', title: L(k.popularDevices.title, lang),
        rows: k.popularDevices.items.map((i) => [L(i.name, lang), L(i.desc, lang)] as [string, string]),
        caution: splitLines(L(k.popularDevices.caution, lang)),
      },
      k.explainerTitle && k.explainerBody && L(k.explainerTitle, lang) && {
        kind: 'paras', title: L(k.explainerTitle, lang), paras: splitParas(L(k.explainerBody, lang)),
      },
      ...(k.referenceIllustration ?? []).map((r): Block => ({ kind: 'figure', title: L(r.title, lang), image: r.image, body: L(r.body, lang) })),
      k.realCase && {
        kind: 'case', title: lang === 'en' ? 'Real Case' : '真实案例',
        photos: k.realCase.photos.map((p) => ({ src: p.src, alt: L(p.alt, lang) })),
        credit: L(k.realCase.credit, lang) || undefined,
      },
      L(k.note, lang) && { kind: 'note', text: splitParas(L(k.note, lang)), tone: 'info' },
    ]
    return { id: k.id, title: L(k.title, lang), image: k.image, summary: summarize(desc, lang), blocks: blocks.filter(nonEmpty) }
  })
}

function bigHealthTopics(lang: LangCode): Topic[] {
  return BIG_HEALTH_KEYWORDS.map((k) => {
    const desc = L(k.description, lang)
    const blocks: (Block | false | undefined)[] = [
      { kind: 'paras', paras: splitParas(desc) },
      k.note && { kind: 'note', text: splitLines(L(k.note, lang)), tone: 'info' },
      k.approvedProducts && {
        kind: 'table', title: L(k.approvedProducts.title, lang),
        rows: k.approvedProducts.items.map((i) => [L(i.name, lang), L(i.desc, lang)] as [string, string]),
        caution: splitLines(L(k.approvedProducts.caution, lang)),
      },
      { kind: 'list', title: L(k.testsLabel, lang), items: k.tests.map((d) => L(d, lang)) },
      { kind: 'list', title: L(k.directionLabel, lang), items: k.direction.map((d) => L(d, lang)) },
      k.extraDisclaimer && { kind: 'note', text: splitLines(L(k.extraDisclaimer, lang)), tone: 'warning' },
    ]
    return {
      id: k.id, title: L(k.title, lang), subtitle: L(k.tileSubtitle, lang) || undefined,
      image: k.image, summary: summarize(desc, lang), blocks: blocks.filter(nonEmpty),
    }
  })
}

function stemCellTopics(lang: LangCode): Topic[] {
  return STEM_CELL_KEYWORDS.map((k) => {
    const body = L(k.body, lang)
    const tagGroups = [
      ...(k.pills ? [k.pills.map((p) => L(p, lang))] : []),
      ...(k.pillGroups ?? []).map((g) => g.map((p) => L(p, lang))),
    ]
    const heroSplit = k.image && k.secondaryMedia && k.heroSplitRatios
      ? {
          image: k.image, media: k.secondaryMedia, ratios: k.heroSplitRatios,
          caption: [L(k.imageCaption, lang), L(k.footerLine, lang)].filter(Boolean).join(' · ') || undefined,
        }
      : undefined
    const blocks: (Block | false | undefined)[] = [
      { kind: 'paras', paras: splitLines(body) },
      !heroSplit && k.image && k.secondaryMedia && {
        kind: 'split', caption: L(k.imageCaption, lang) || undefined, image: k.image, media: k.secondaryMedia,
        footer: L(k.footerLine, lang) || undefined, credit: k.credit,
      },
      k.image && !k.secondaryMedia && {
        kind: 'case', title: L(k.imageCaption, lang) || (lang === 'en' ? 'Real Case' : '真实案例'),
        photos: [{ src: k.image, alt: L(k.imageCaption, lang) || L(k.title, lang) }], credit: k.credit,
      },
      tagGroups.length > 0 && { kind: 'tags', groups: tagGroups },
      k.footerLine && !(k.image && k.secondaryMedia) && { kind: 'paras', paras: [L(k.footerLine, lang)] },
      k.list && { kind: 'list', items: k.list.map((i) => L(i, lang)) },
      k.products && { kind: 'table', rows: k.products.map((p) => [p.name, L(p.desc, lang)] as [string, string]) },
      k.hint && { kind: 'note', text: [L(k.hint, lang)], tone: 'info' },
    ]
    return {
      id: k.id, title: L(k.title, lang), subtitle: L(k.tileSubtitle, lang) || undefined, heroSplit,
      summary: L(k.tileSubtitle, lang) || summarize(body, lang), blocks: blocks.filter(nonEmpty),
    }
  })
}

type SimpleKeyword = {
  id: string; title: LocalizedText; image?: string; description: LocalizedText
  directionsLabel: LocalizedText; directions: LocalizedText[]; note: LocalizedText; noteStyle?: 'info' | 'warning'
}
function simpleTopics(list: SimpleKeyword[], lang: LangCode): Topic[] {
  return list.map((k) => {
    const desc = L(k.description, lang)
    const blocks: (Block | false | '')[] = [
      { kind: 'paras', paras: splitParas(desc) },
      { kind: 'list', title: L(k.directionsLabel, lang), items: k.directions.map((d) => L(d, lang)) },
      L(k.note, lang) && { kind: 'note', text: splitParas(L(k.note, lang)), tone: k.noteStyle === 'warning' ? 'warning' : 'info' },
    ]
    return { id: k.id, title: L(k.title, lang), image: k.image, summary: summarize(desc, lang), blocks: blocks.filter(nonEmpty) }
  })
}

export function getTopics(categoryId: CategoryId, lang: LangCode): Topic[] {
  switch (categoryId) {
    case 'skin-beauty': return skinTopics(lang)
    case 'plastic-surgery': return plasticTopics(lang)
    case 'big-health': return bigHealthTopics(lang)
    case 'stem-cell': return stemCellTopics(lang)
    case 'womens-care': return simpleTopics(WOMENS_HEALTH_KEYWORDS, lang)
    case 'mens-health': return simpleTopics(MENS_HEALTH_KEYWORDS, lang)
    default: return []
  }
}

/** 카테고리 페이지 상단의 강조 문장(줄기세포) / 하단 안내문(피부·성형) */
export function getCategoryExtras(categoryId: CategoryId, lang: LangCode): { pullquote?: string[]; safety?: string[] } {
  switch (categoryId) {
    case 'stem-cell': return { pullquote: [L(STEM_CELL_INTRO.line1, lang), L(STEM_CELL_INTRO.line2, lang)] }
    case 'skin-beauty': return { safety: SKIN_AESTHETICS_SECTION.safety.map((s) => L(s, lang)) }
    case 'plastic-surgery': return { safety: PLASTIC_SURGERY_SECTION.safety.map((s) => L(s, lang)) }
    default: return {}
  }
}
