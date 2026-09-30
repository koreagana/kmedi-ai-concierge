import type { CategoryId } from './categories'
import type { LocalizedText } from './bigHealthKeywords'
import { SKIN_AESTHETICS_KEYWORDS } from './skinAestheticsKeywords'
import { PLASTIC_SURGERY_KEYWORDS } from './plasticSurgeryKeywords'
import { BIG_HEALTH_KEYWORDS } from './bigHealthKeywords'
import { STEM_CELL_KEYWORDS } from './stemCellKeywords'
import { WOMENS_HEALTH_KEYWORDS } from './womensHealthKeywords'
import { MENS_HEALTH_KEYWORDS } from './mensHealthKeywords'

/** 카테고리별 세부 항목(카테고리 페이지의 키워드 타일) — kmedispring.com 사이드바 서브메뉴용.
    각 카테고리 키워드 데이터에서 그대로 뽑으므로 타일을 추가·삭제하면 메뉴도 자동으로 따라간다.
    링크는 /<lang>/<categoryId>/<id> — kmedispring.com은 세부 항목 페이지, ai-kmedi.com은 해당 타일 선택
    (src/components/useKeywordFromUrl.ts). */
export interface SubmenuItem {
  id: string
  title: LocalizedText
  /** 사이트 검색(src/data/siteSearch.ts)용 설명문 — 줄기세포만 필드명이 body */
  description?: LocalizedText
}

type KeywordSource = { id: string; title: LocalizedText; description?: LocalizedText; body?: LocalizedText }

const pick = (list: KeywordSource[]): SubmenuItem[] =>
  list.map(({ id, title, description, body }) => ({ id, title, description: description ?? body }))

export const CATEGORY_SUBMENUS: Partial<Record<CategoryId, SubmenuItem[]>> = {
  'skin-beauty': pick(SKIN_AESTHETICS_KEYWORDS),
  'plastic-surgery': pick(PLASTIC_SURGERY_KEYWORDS),
  'big-health': pick(BIG_HEALTH_KEYWORDS),
  'stem-cell': pick(STEM_CELL_KEYWORDS),
  'womens-care': pick(WOMENS_HEALTH_KEYWORDS),
  'mens-health': pick(MENS_HEALTH_KEYWORDS),
}
