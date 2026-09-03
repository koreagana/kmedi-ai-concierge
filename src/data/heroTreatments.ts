/* ══════════════════════════════════════════════════════════════════
   인기 시술 태그 → 바텀시트 콘텐츠 (중문, 사이트 게시용)
   홈 화면 "热门轻医美项目费用预估" 카드 아래 인기 시술 태그 클릭 시 노출
   ══════════════════════════════════════════════════════════════════ */

export interface HeroTreatmentInfo {
  /** heroTreatmentChips(zh) 배열의 표기와 정확히 일치 — 매칭 키 */
  chip: string
  isException?: boolean
  definition: string
  recommend?: string
  difference?: string
  /** 超声刀·热玛吉 전용 — 정품/국산 장비 구분 안내 */
  deviceNote?: string
  recovery?: string
  exceptionNote?: string
  /** CTA 클릭 시 이동할 견적 페이지 카테고리 (QUOTE_CATEGORIES id) */
  quoteCategoryId?: string
  /** 해당 시술이 견적 데이터에 있을 경우, 시트를 열 때 그 시술로 스크롤 포커스 */
  quoteProcedureId?: string
}

export const HERO_TREATMENTS: HeroTreatmentInfo[] = [
  {
    chip: '丽珠兰',
    definition: '基于三文鱼DNA成分(PN)的皮肤再生注射',
    recommend: '肤色暗沉、有细纹或需要皮肤再生时',
    difference: '比乔雅露更专注于再生和补水',
    recovery: '立即恢复日常（可能有1~2天泛红）',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'rejuran-healer',
  },
  {
    chip: '超声刀',
    definition: '作用于SMAS层的提升紧致项目',
    recommend: '肉眼可见脸颊、下颌线松弛下垂时',
    difference: '比热玛吉更专注于松弛提拉',
    deviceNote: '正品（美国FDA认证）维持时间比韩版设备更长——韩版设备通常不足6个月。韩版HIFU设备名称：10SERA、Shurink Universe（舒林克）、Liftera2、Volnewmer等（说明：这些设备并非超声刀的仿制品，而是各自获得独立认证的韩国设备）',
    recovery: '立即恢复日常',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'ulthera-prime',
  },
  {
    chip: 'ONDA',
    definition: '基于微波技术的溶脂+提升项目',
    recommend: '脸颊、下颌线松弛且同时需要溶脂时',
    difference: '与超声刀、热玛吉不同，同时作用于脂肪层',
    recovery: '立即恢复日常',
    quoteCategoryId: 'lifting',
  },
  {
    chip: '水光针',
    definition: '向皮肤注入透明质酸(HA)或PN成分的项目',
    recommend: '皮肤干燥或希望立即获得光泽感、补水效果时',
    difference: '比丽珠兰效果更即时，但维持时间相对较短',
    recovery: '立即恢复日常（可能有半天~1天肿胀）',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'water-injection',
  },
  {
    chip: '热玛吉',
    definition: '通过射频(RF)刺激胶原蛋白生成的项目',
    recommend: '比起松弛下垂，更在意肤质、紧致度下降时',
    difference: '比超声刀更专注于肤质改善',
    deviceNote: '正品维持时间比韩版设备更长——韩版设备通常不足6个月。韩版RF设备名称：10THERMA、Ultight（欧邦特）等（说明：并非热玛吉的仿制品，而是获得独立认证的射频设备）',
    recovery: '立即恢复日常',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'thermage-flx',
  },
  {
    chip: '瘦脸',
    isException: true,
    definition: '由下颌角肉毒素、轮廓针、溶脂针等组合进行',
    exceptionNote: '所用药剂和用量因医院、院长而异，将通过咨询为您个性化设计。',
  },
  {
    chip: '钛提升',
    definition: '射频+脱毛两用设备，皮肤弹性改善项目',
    recommend: '希望同时改善提升紧致与毛孔、肤质时',
    difference: '强度比超声刀、热玛吉弱，但几乎没有恢复期',
    recovery: '立即恢复日常',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'titanium-toning',
  },
  {
    chip: '黄金微针',
    definition: '超声波+射频+微针复合项目',
    recommend: '毛孔、疤痕、痘印是主要困扰时',
    difference: '比丽珠兰、乔雅露更专注于皮肤表层再生（毛孔、疤痕）',
    recovery: '1~2天泛红、轻微结痂',
    quoteCategoryId: 'acne-pore',
    quoteProcedureId: 'potenza',
  },
  {
    chip: '乔雅露',
    definition: '胶原蛋白诱导注射（PDLLA成分）',
    recommend: '希望获得饱满度和自然弹性改善时',
    difference: '比丽珠兰更专注于饱满度和胶原蛋白生成，效果逐渐显现',
    recovery: '立即恢复日常（可能有1~2天肿胀）',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'juvelook-skin',
  },
  {
    chip: '索夫波',
    definition: '通过线性超声波广泛刺激中层真皮（1.5mm）的提升项目',
    recommend: '以改善细纹、肤质为主，希望减少疼痛和恢复期负担时',
    difference: '作用层比超声刀、热玛吉更浅，对需要达到SMAS层的深度松弛可能效果不足',
    recovery: '立即恢复日常',
    quoteCategoryId: 'lifting',
  },
]

export function getHeroTreatmentByChip(chip: string): HeroTreatmentInfo | undefined {
  return HERO_TREATMENTS.find(t => t.chip === chip)
}
