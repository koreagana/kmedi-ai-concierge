/* ══════════════════════════════════════════════════════════════════
   인기 시술 태그 → 바텀시트 콘텐츠 (중문, 사이트 게시용)
   홈 화면 "热门轻医美项目费用预估" 카드 아래 인기 시술 태그 클릭 시 노출
   ══════════════════════════════════════════════════════════════════ */

export interface HeroTreatmentInfo {
  /** heroTreatmentChips(zh) 배열의 표기와 정확히 일치 — 매칭 키 */
  chip: string
  /** heroTreatmentChips(en) 배열의 표기와 정확히 일치 — 영문 매칭 키 */
  chipEn: string
  isException?: boolean
  definition: string
  definitionEn: string
  recommend?: string
  recommendEn?: string
  difference?: string
  differenceEn?: string
  /** 超声刀·热玛吉 전용 — 정품/국산 장비 구분 안내 */
  deviceNote?: string
  deviceNoteEn?: string
  recovery?: string
  recoveryEn?: string
  exceptionNote?: string
  exceptionNoteEn?: string
  /** CTA 클릭 시 이동할 견적 페이지 카테고리 (QUOTE_CATEGORIES id) */
  quoteCategoryId?: string
  /** 해당 시술이 견적 데이터에 있을 경우, 시트를 열 때 그 시술로 스크롤 포커스 */
  quoteProcedureId?: string
}

export const HERO_TREATMENTS: HeroTreatmentInfo[] = [
  {
    chip: '丽珠兰',
    chipEn: 'Rejuran',
    definition: '以三文鱼DNA提取成分（PN）为主的皮肤修复注射。按盒子颜色分：黑盒（Healer，经典款，全脸修复）· 白盒（Eye，眼周专用）· 红盒（HB，加了利多卡因，更舒缓）· 蓝盒（S，针对痘坑）',
    definitionEn: 'A skin regeneration injectable built on polynucleotide (PN), a DNA fraction derived from salmon. In China the lines are known by box colour: Black (Healer, classic all-round repair) · White (Eye, for the eye area) · Red (HB, soothing, with lidocaine) · Blue (S, acne scars).',
    recommend: '肤色暗沉、细纹变多，或者想让皮肤整体变得更健康、更有底子',
    recommendEn: 'When skin looks dull, fine lines are becoming visible, or you want to rebuild overall skin quality and resilience.',
    difference: '和乔雅露比，丽珠兰更偏向深层修复和补水',
    differenceEn: 'Compared with Juvelook, Rejuran leans toward deep regeneration and intensive hydration.',
    recovery: '基本不影响生活，做完就能正常上班（少数人会红1~2天）',
    recoveryEn: 'No downtime — you can go about your day right away. A small number of people see mild redness for a day or two.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'rejuran-healer',
  },
  {
    chip: '超声刀',
    chipEn: 'Ulthera',
    definition: '直接作用在筋膜层（SMAS）的提拉紧致项目',
    definitionEn: 'A lifting and tightening treatment that works at the SMAS layer.',
    recommend: '脸颊和下颌线已经明显松了、往下垂',
    recommendEn: 'When sagging along the cheeks and jawline has become visible.',
    difference: '和热玛吉比，超声刀打得更深，主要解决松弛下垂。',
    differenceEn: 'Where Thermage focuses on skin quality, Ultherapy targets deeper, more precise lifting for laxity.',
    deviceNote: '正版美国超声刀（Ulthera，美国FDA认证）的效果一般比韩国本土的HIFU设备维持得更久，韩国设备多数不到6个月。\n常见的韩国HIFU设备有：10SERA、Shurink Universe（舒林克）、Liftera2、Volnewmer等。\n（这些不是超声刀的仿品，而是各自通过认证的韩国医疗设备。）',
    deviceNoteEn: 'Genuine Ultherapy (FDA-cleared) typically holds longer than Korean-made HIFU devices, whose results often fade within six months.\nCommon Korean HIFU devices include 10SERA, Shurink Universe, Liftera2 and Volnewmer.\n(These are not copies of Ultherapy — each is a separately certified Korean medical device.)',
    recovery: '不需要恢复期，做完就能正常生活。',
    recoveryEn: 'No downtime — back to your usual routine straight away.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'ulthera-prime',
  },
  {
    chip: 'ONDA',
    chipEn: 'ONDA',
    definition: '用微波同时溶脂和提拉的项目',
    definitionEn: 'A microwave treatment that targets fat while tightening and lifting.',
    recommend: '脸颊和下颌线有点松，同时局部脂肪也比较多',
    recommendEn: 'When sagging along the cheeks and jawline comes with pockets of stubborn fat.',
    difference: '和超声刀、热玛吉比，ONDA更直接作用在脂肪层',
    differenceEn: 'Unlike Ultherapy or Thermage, ONDA works directly on the fat layer.',
    recovery: '不需要恢复期，做完就能正常生活',
    recoveryEn: 'No downtime — back to your usual routine right away.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'onda',
  },
  {
    chip: 'XERF 泽弗',
    chipEn: 'XERF',
    definition: '6.78MHz＋2MHz双频单极射频的紧致提升项目',
    definitionEn: 'A dual-frequency monopolar RF treatment (6.78MHz + 2MHz) for tightening and lifting.',
    recommend: '脸松了、下颌线不清楚、皮肤没弹性，想改善比较深层的松弛',
    recommendEn: 'When the face is losing firmness, the jawline is blurring, and you want to address deeper laxity.',
    difference: '两种频率可以按皮肤状态选择加热深度，从浅层打到深层，帮助胶原重塑。和钛提升比，更偏向深层紧致。做完会有一点紧致感，之后随着胶原慢慢生成，效果会越来越明显',
    differenceEn: 'Remodels collagen to firm the face and redefine the contour. The dual 6.78MHz + 2MHz monopolar RF lets the practitioner heat anything from superficial to deep layers depending on your skin, so it reaches further into deep tightening than Titanium lifting. You feel some tightening straight after, and the result builds as collagen rebuilds.',
    recovery: '一般不需要恢复期，有些人会短暂发红或发热',
    recoveryEn: 'Usually no downtime. Some people notice brief redness or a warm sensation.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'xerf',
  },
  {
    chip: '水光针',
    chipEn: 'Water Glow Injection',
    definition: '把玻尿酸（HA）或PN打进皮肤，给皮肤深层补水、补营养',
    definitionEn: 'Micro-injections of hyaluronic acid (HA) or PN that deliver deep hydration and nutrients into the skin.',
    recommend: '皮肤干、缺水，想很快看到水润有光泽的效果',
    recommendEn: 'When skin feels dry and depleted, or you want a fast lift in moisture and glow.',
    difference: '和丽珠兰比，水光针见效更快，但维持时间短一些',
    differenceEn: 'Compared with Rejuran, results show sooner but hold for a shorter time.',
    recovery: '不需要恢复期，6~12小时后就可以轻轻洗脸、化淡妆（少数人会红肿半天到一天）',
    recoveryEn: 'No downtime — gentle cleansing and light makeup from 6–12 hours after. A few people see mild redness or swelling for up to a day.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'water-injection',
  },
  {
    chip: '热玛吉',
    chipEn: 'Thermage',
    definition: '用射频（RF）刺激胶原蛋白生成的项目',
    definitionEn: 'A radiofrequency (RF) treatment that stimulates collagen production.',
    recommend: '比起松弛下垂，更在意皮肤质感变差、不够紧致',
    recommendEn: 'When your concern is skin quality and firmness rather than sagging.',
    difference: '和超声刀比，热玛吉更偏向改善肤质',
    differenceEn: 'More focused on skin quality than Ultherapy.',
    deviceNote: '正版热玛吉的效果一般比韩国本土设备维持得更久，韩国设备多数不到6个月。常见的韩国射频设备有：10THERMA、Ultight（欧邦特）等（这些不是热玛吉的仿品，而是各自通过认证的射频设备）',
    deviceNoteEn: 'Genuine Thermage holds longer than Korean-made equivalents, which often fade within six months. Korean RF devices include 10THERMA and Ultight — not copies of Thermage, but separately certified RF devices.',
    recovery: '做完就能正常生活',
    recoveryEn: 'Straight back to daily life.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'thermage-flx',
  },
  {
    chip: '瘦脸针',
    chipEn: 'V-Line Contour',
    isException: true,
    definition: 'V脸针、轮廓针、溶脂针搭配一起打',
    definitionEn: 'A combined treatment: jawline botox, contouring injections and fat-dissolving injections.',
    exceptionNote: '每位院长的搭配比例都不一样。如果下巴脂肪比较多，还可以配合溶脂针和提拉激光。',
    exceptionNoteEn: 'Every doctor works to their own formulation. Where there is more fat under the jaw, fat-dissolving injections and a lifting laser can be added.',
    recommend: '咬肌发达型、脂肪型、松弛型',
    recommendEn: 'Jawlines driven by the masseter muscle, by fat, or by laxity.',
    recovery: '几乎不需要恢复期。一周内尽量不要蒸桑拿、汗蒸和剧烈运动。',
    recoveryEn: 'Virtually no downtime. Avoid saunas, jjimjilbang and intense exercise for the first week.',
    quoteCategoryId: 'filler-botox',
    quoteProcedureId: 'vline-combo',
  },
  {
    chip: '钛提升',
    chipEn: 'Titanium Lifting',
    definition: '755nm＋810nm＋1064nm三种波长的激光紧致项目',
    definitionEn: 'A three-wavelength laser tightening treatment (755nm + 810nm + 1064nm).',
    recommend: '轻微松弛、下颌线不清楚、脸型有点散、肤色暗沉，想很快看到紧致效果',
    recommendEn: 'Mild laxity, a softening jawline, a loosening facial contour or dull tone — when you want to see tightening quickly.',
    difference: '做完马上就能感觉脸更紧、轮廓更清楚，肤色也会亮一点，是见效比较快的轻医美提升项目',
    differenceEn: 'Tightens the contour, firms the skin and brightens tone in a single session while improving mild laxity. You feel the contour tighten right away, which makes it one of the faster-acting lifting options.',
    recovery: '几乎不需要恢复期，做完一般就能正常生活',
    recoveryEn: 'Virtually no downtime — most people carry on as normal.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'titanium-toning',
  },
  {
    chip: '黄金微针',
    chipEn: 'Potenza',
    definition: '射频微针，改善毛孔、痘坑和紧致度',
    definitionEn: 'RF microneedling for tightening, pores and acne scarring.',
    recommend: '毛孔粗、有痘坑、皮肤不平整、容易出油，或者有轻微松弛',
    recommendEn: 'Enlarged pores, acne scars, uneven texture, oily skin or mild laxity.',
    difference: '微针把射频能量带到皮肤里面，改善毛孔、痘坑和肤质，也能促进胶原生成。可以按毛孔、痘坑、紧致等不同需要选择针头和模式',
    differenceEn: 'Improves pores, acne scars and texture while stimulating collagen for firmer skin. Microneedles carry RF energy beneath the surface, and the tip and mode are chosen for your priority — pores, scars or tightening.',
    recovery: '一般会红肿1～3天，有些模式会结很小的痂',
    recoveryEn: 'Redness or mild swelling for one to three days; some modes can leave fine scabbing.',
    quoteCategoryId: 'acne-pore',
    quoteProcedureId: 'potenza',
  },
  {
    chip: '乔雅露',
    chipEn: 'Juvelook',
    definition: 'PDLLA加玻尿酸的胶原再生注射',
    definitionEn: 'A collagen-stimulating injectable that combines PDLLA with hyaluronic acid.',
    recommend: '毛孔粗、有细纹、皮肤粗糙、弹性变差',
    recommendEn: 'Enlarged pores, fine lines, rough texture or loss of elasticity.',
    difference: '帮助皮肤自己生成胶原，改善毛孔、细纹、肤质和弹性。和丽珠兰比，更偏向胶原再生和紧致，效果是慢慢出来的',
    differenceEn: 'Stimulates collagen to improve pores, fine lines, texture and elasticity. Compared with Rejuran it leans further into collagen regeneration and firmness, and the result builds gradually.',
    recovery: '一般做完就能正常生活，打针的地方可能会肿1～2天或有一点淤青',
    recoveryEn: 'Usually straight back to daily life; injection sites may swell or bruise slightly for a day or two.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'juvelook-skin',
  },
  {
    chip: '索夫波',
    chipEn: 'Sofwave',
    definition: '用同步平行超声波（SUPERB™）作用在真皮层约1.5mm深度的紧致提升项目',
    definitionEn: 'A tightening and lifting treatment using synchronous ultrasound parallel beam (SUPERB™) technology, working at around 1.5mm in the mid-dermis.',
    recommend: '主要想改善细纹、肤质和轻中度松弛，希望不太疼、恢复快',
    recommendEn: 'When the priority is fine lines, skin quality and mild to moderate laxity, with less discomfort and little downtime.',
    difference: '改善细纹和松弛，帮助胶原和弹性纤维重塑。打的深度比超声刀浅，主要针对真皮层的紧致和肤质；如果是比较深的筋膜层（SMAS）松弛，通常超声刀更合适',
    differenceEn: 'Softens fine lines and laxity by remodelling collagen and elastin. It works at a shallower level than Ultherapy, focusing on dermal firmness and skin quality; for deeper SMAS laxity, Ultherapy is usually the better fit.',
    recovery: '一般做完就能正常生活，少数人会短暂发红或轻微肿',
    recoveryEn: 'Usually straight back to daily life; some people see brief redness or mild swelling.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'sofwave',
  },
  {
    chip: 'InMode FX',
    chipEn: 'InMode FX',
    definition: '负压吸附加双极射频，针对局部脂肪和紧致',
    definitionEn: 'Vacuum suction paired with bipolar radiofrequency (RF) to reduce localised fat and tighten skin.',
    recommend: '有双下巴、下颌边脂肪多、下半张脸显得厚重，同时有轻微松弛',
    recommendEn: 'A double chin, fat along the jawline, or a heavy-looking lower face with mild laxity.',
    difference: '减少局部脂肪，同时收紧皮肤，让下颌线和V脸轮廓更清楚。和主要针对松弛的射频、超声项目不同，InMode FX更适合"脂肪型"的下半脸。双下巴或下颌边脂肪比较明显时，常常会和溶脂针、HIFU一起搭配',
    differenceEn: 'Reduces pockets of fat while firming the skin, so the jawline and V-line read more clearly. Unlike RF or ultrasound lifting aimed mainly at laxity, InMode FX suits a "fat-type" lower face and treats both at once. Where jawline or submental fat is pronounced, it is often combined with facial fat-dissolving injections or HIFU.',
    recovery: '一般能正常生活，做完可能短暂发红、肿，或者因为吸附出现一点淤青',
    recoveryEn: 'Usually no interruption to daily life; brief redness, swelling or light bruising from the suction can occur.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'inmode-fx-forma',
  },
]

/** 중문·영문 칩 표기 어느 쪽으로도 조회 가능 */
export function getHeroTreatmentByChip(chip: string): HeroTreatmentInfo | undefined {
  return HERO_TREATMENTS.find(t => t.chip === chip || t.chipEn === chip)
}
