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
    definition: '以三文鱼DNA核心成分（PN）为基础的皮肤再生注射疗法',
    definitionEn: 'A skin regeneration injectable built on polynucleotide (PN), a DNA fraction derived from salmon.',
    recommend: '肤色暗沉、面部细纹明显，或需要全面改善肤质再生能力时',
    recommendEn: 'When skin looks dull, fine lines are becoming visible, or you want to rebuild overall skin quality and resilience.',
    difference: '与乔雅露相比，丽珠兰更侧重于深层的皮肤再生与高效补水',
    differenceEn: 'Compared with Juvelook, Rejuran leans toward deep regeneration and intensive hydration.',
    recovery: '无恢复期，术后即可正常生活（少数人可能出现1~2天轻微泛红）',
    recoveryEn: 'No downtime — you can go about your day right away. A small number of people see mild redness for a day or two.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'rejuran-healer',
  },
  {
    chip: '超声刀',
    chipEn: 'Ulthera',
    definition: '作用于SMAS层的提拉紧致项目',
    definitionEn: 'A lifting and tightening treatment that works at the SMAS layer.',
    recommend: '当脸颊及下颌线出现肉眼可见的松弛下垂时',
    recommendEn: 'When sagging along the cheeks and jawline has become visible.',
    difference: '相比热玛吉，超声刀更侧重于针对性的深层提拉，有效改善松弛问题。',
    differenceEn: 'Where Thermage focuses on skin quality, Ultherapy targets deeper, more precise lifting for laxity.',
    deviceNote: '美版超声刀（获美国FDA认证）的维持时间通常比韩版HIFU设备更长，韩版设备的维持效果普遍不足6个月。\n常见韩版HIFU设备名称包括：10SERA、Shurink Universe（舒林克）、Liftera2、Volnewmer等。\n（注：上述设备并非超声刀的仿制品，而是各自取得独立认证的韩国医疗设备。）',
    deviceNoteEn: 'Genuine Ultherapy (FDA-cleared) typically holds longer than Korean-made HIFU devices, whose results often fade within six months.\nCommon Korean HIFU devices include 10SERA, Shurink Universe, Liftera2 and Volnewmer.\n(These are not copies of Ultherapy — each is a separately certified Korean medical device.)',
    recovery: '无恢复期，术后即可立即恢复日常生活。',
    recoveryEn: 'No downtime — back to your usual routine straight away.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'ulthera-prime',
  },
  {
    chip: 'ONDA',
    chipEn: 'ONDA',
    definition: '利用微波技术实现溶脂与提拉的项目',
    definitionEn: 'A microwave treatment that targets fat while tightening and lifting.',
    recommend: '脸颊及下颌线出现松弛下垂，且伴有局部脂肪堆积时',
    recommendEn: 'When sagging along the cheeks and jawline comes with pockets of stubborn fat.',
    difference: '与超声刀、热玛吉相比，ONDA更侧重于对脂肪层的直接作用与改善',
    differenceEn: 'Unlike Ultherapy or Thermage, ONDA works directly on the fat layer.',
    recovery: '无恢复期，术后即可正常生活',
    recoveryEn: 'No downtime — back to your usual routine right away.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'onda',
  },
  {
    chip: 'XERF 泽弗',
    chipEn: 'XERF',
    definition: '6.78MHz＋2MHz双频单极射频紧致提升项目',
    definitionEn: 'A dual-frequency monopolar RF treatment (6.78MHz + 2MHz) for tightening and lifting.',
    recommend: '面部松弛、下颌线模糊、皮肤弹性下降，希望改善较深层松弛并加强整体紧致度时',
    recommendEn: 'When the face is losing firmness, the jawline is blurring, and you want to address deeper laxity.',
    difference: '改善面部松弛和轮廓线条，促进胶原重塑，使皮肤更加紧致、有弹性。采用6.78MHz＋2MHz双频单极射频，可根据皮肤状态选择不同作用深度，从浅层到深层进行加热，相比钛提升更侧重深层紧致和胶原重塑。治疗后可感受到一定紧致感，随着胶原重塑，效果会在之后逐渐显现',
    differenceEn: 'Remodels collagen to firm the face and redefine the contour. The dual 6.78MHz + 2MHz monopolar RF lets the practitioner heat anything from superficial to deep layers depending on your skin, so it reaches further into deep tightening than Titanium lifting. You feel some tightening straight after, and the result builds as collagen rebuilds.',
    recovery: '通常无需恢复期，治疗后可正常生活，部分人可能出现短暂泛红或热感',
    recoveryEn: 'Usually no downtime. Some people notice brief redness or a warm sensation.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'xerf',
  },
  {
    chip: '水光针',
    chipEn: 'Water Glow Injection',
    definition: '通过向皮肤注入透明质酸（HA）或PN成分，实现深层补水与营养供给的项目',
    definitionEn: 'Micro-injections of hyaluronic acid (HA) or PN that deliver deep hydration and nutrients into the skin.',
    recommend: '皮肤干燥缺水，或希望快速提升肌肤水润度与光泽感时',
    recommendEn: 'When skin feels dry and depleted, or you want a fast lift in moisture and glow.',
    difference: '与丽珠兰相比，水光针见效更快，但维持时间相对较短',
    differenceEn: 'Compared with Rejuran, results show sooner but hold for a shorter time.',
    recovery: '无恢复期，术后6~12小时起可温和洁面及淡妆（少数人可能出现半天至1天的轻微泛红或肿胀）',
    recoveryEn: 'No downtime — gentle cleansing and light makeup from 6–12 hours after. A few people see mild redness or swelling for up to a day.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'water-injection',
  },
  {
    chip: '热玛吉',
    chipEn: 'Thermage',
    definition: '通过射频(RF)刺激胶原蛋白生成的项目',
    definitionEn: 'A radiofrequency (RF) treatment that stimulates collagen production.',
    recommend: '比起松弛下垂，更在意肤质、紧致度下降时',
    recommendEn: 'When your concern is skin quality and firmness rather than sagging.',
    difference: '比超声刀更专注于肤质改善',
    differenceEn: 'More focused on skin quality than Ultherapy.',
    deviceNote: '正品维持时间比韩版设备更长——韩版设备通常不足6个月。韩版RF设备名称：10THERMA、Ultight（欧邦特）等（说明：并非热玛吉的仿制品，而是获得独立认证的射频设备）',
    deviceNoteEn: 'Genuine Thermage holds longer than Korean-made equivalents, which often fade within six months. Korean RF devices include 10THERMA and Ultight — not copies of Thermage, but separately certified RF devices.',
    recovery: '立即恢复日常',
    recoveryEn: 'Straight back to daily life.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'thermage-flx',
  },
  {
    chip: '瘦脸针',
    chipEn: 'V-Line Contour',
    isException: true,
    definition: 'V脸针 · 轮廓针 · 溶脂针 的组合施术',
    definitionEn: 'A combined treatment: jawline botox, contouring injections and fat-dissolving injections.',
    exceptionNote: '每位院长都有自己独到的配比方案。若下颌脂肪较多，可搭配溶脂针与提拉激光。',
    exceptionNoteEn: 'Every doctor works to their own formulation. Where there is more fat under the jaw, fat-dissolving injections and a lifting laser can be added.',
    recommend: '咬肌型、脂肪型、松弛型',
    recommendEn: 'Jawlines driven by the masseter muscle, by fat, or by laxity.',
    recovery: '几乎无恢复期。建议术后一周内避免桑拿、汗蒸及剧烈运动。',
    recoveryEn: 'Virtually no downtime. Avoid saunas, jjimjilbang and intense exercise for the first week.',
    quoteCategoryId: 'filler-botox',
    quoteProcedureId: 'vline-combo',
  },
  {
    chip: '钛提升',
    chipEn: 'Titanium Lifting',
    definition: '755nm＋810nm＋1064nm三波长激光紧致项目',
    definitionEn: 'A three-wavelength laser tightening treatment (755nm + 810nm + 1064nm).',
    recommend: '轻度松弛、下颌线不清晰、面部轮廓松散、肤色暗沉，希望快速看到紧致效果的人群',
    recommendEn: 'Mild laxity, a softening jawline, a loosening facial contour or dull tone — when you want to see tightening quickly.',
    difference: '即时改善面部轮廓、紧致肌肤、提亮肤色，同时改善轻度松弛。治疗后即可感受到轮廓更紧致，属于效果出现较快的轻医美提升项目',
    differenceEn: 'Tightens the contour, firms the skin and brightens tone in a single session while improving mild laxity. You feel the contour tighten right away, which makes it one of the faster-acting lifting options.',
    recovery: '几乎无恢复期，治疗后通常可正常生活',
    recoveryEn: 'Virtually no downtime — most people carry on as normal.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'titanium-toning',
  },
  {
    chip: '黄金微针',
    chipEn: 'Potenza',
    definition: '射频微针紧致·毛孔·痘疤改善项目',
    definitionEn: 'RF microneedling for tightening, pores and acne scarring.',
    recommend: '毛孔粗大、痘疤、皮肤纹理不平、出油较多、轻度松弛时',
    recommendEn: 'Enlarged pores, acne scars, uneven texture, oily skin or mild laxity.',
    difference: '改善毛孔、痘疤和肤质，同时促进胶原再生，提升皮肤紧致度。通过微针将射频能量传递至皮肤内部，可根据毛孔、痘疤、紧致等不同需求选择不同针头和模式',
    differenceEn: 'Improves pores, acne scars and texture while stimulating collagen for firmer skin. Microneedles carry RF energy beneath the surface, and the tip and mode are chosen for your priority — pores, scars or tightening.',
    recovery: '通常1～3天有泛红或轻微肿胀，部分模式可能出现细小结痂',
    recoveryEn: 'Redness or mild swelling for one to three days; some modes can leave fine scabbing.',
    quoteCategoryId: 'acne-pore',
    quoteProcedureId: 'potenza',
  },
  {
    chip: '乔雅露',
    chipEn: 'Juvelook',
    definition: 'PDLLA＋透明质酸复合胶原再生注射',
    definitionEn: 'A collagen-stimulating injectable that combines PDLLA with hyaluronic acid.',
    recommend: '毛孔粗大、细纹、肤质粗糙、弹性下降时',
    recommendEn: 'Enlarged pores, fine lines, rough texture or loss of elasticity.',
    difference: '促进胶原蛋白生成，改善毛孔、细纹、肤质和皮肤弹性。相比丽珠兰，更侧重胶原再生和皮肤紧致度改善，效果会逐渐显现',
    differenceEn: 'Stimulates collagen to improve pores, fine lines, texture and elasticity. Compared with Rejuran it leans further into collagen regeneration and firmness, and the result builds gradually.',
    recovery: '通常可立即恢复日常生活，注射部位可能有1～2天轻微肿胀或淤青',
    recoveryEn: 'Usually straight back to daily life; injection sites may swell or bruise slightly for a day or two.',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'juvelook-skin',
  },
  {
    chip: '索夫波',
    chipEn: 'Sofwave',
    definition: '采用同步超声平行束技术（SUPERB™），主要作用于真皮中层约1.5mm的紧致提升项目',
    definitionEn: 'A tightening and lifting treatment using synchronous ultrasound parallel beam (SUPERB™) technology, working at around 1.5mm in the mid-dermis.',
    recommend: '以改善细纹、肤质和轻中度松弛为主，希望疼痛较少、恢复期较短时',
    recommendEn: 'When the priority is fine lines, skin quality and mild to moderate laxity, with less discomfort and little downtime.',
    difference: '改善细纹和皮肤松弛，促进胶原及弹性纤维重塑，提升皮肤紧致度。作用层次比超声刀更浅，主要针对真皮层紧致与肤质改善；对于需要改善较深层SMAS松弛的人群，通常超声刀更适合',
    differenceEn: 'Softens fine lines and laxity by remodelling collagen and elastin. It works at a shallower level than Ultherapy, focusing on dermal firmness and skin quality; for deeper SMAS laxity, Ultherapy is usually the better fit.',
    recovery: '通常可立即恢复日常生活，少数人可能出现短暂泛红或轻微肿胀',
    recoveryEn: 'Usually straight back to daily life; some people see brief redness or mild swelling.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'sofwave',
  },
  {
    chip: 'InMode FX',
    chipEn: 'InMode FX',
    definition: '真空吸附＋双极射频（RF）的局部脂肪与紧致改善项目',
    definitionEn: 'Vacuum suction paired with bipolar radiofrequency (RF) to reduce localised fat and tighten skin.',
    recommend: '双下巴、下颌缘脂肪较多、下半脸显得厚重，同时伴有轻度松弛时',
    recommendEn: 'A double chin, fat along the jawline, or a heavy-looking lower face with mild laxity.',
    difference: '减少局部脂肪堆积，同时改善皮肤紧致度，使下颌线和V-Line轮廓更加清晰。与主要针对皮肤松弛的射频或超声提升不同，InMode FX更适合"脂肪型"下半脸，可同时针对局部脂肪和皮肤松弛。下颌缘或双下巴脂肪较明显时，InMode FX常与面部溶脂针、HIFU搭配使用，以进一步改善双下巴、下颌缘脂肪和V-Line轮廓',
    differenceEn: 'Reduces pockets of fat while firming the skin, so the jawline and V-line read more clearly. Unlike RF or ultrasound lifting aimed mainly at laxity, InMode FX suits a "fat-type" lower face and treats both at once. Where jawline or submental fat is pronounced, it is often combined with facial fat-dissolving injections or HIFU.',
    recovery: '通常可正常生活，治疗后可能出现短暂泛红、肿胀或吸附造成的轻微淤青',
    recoveryEn: 'Usually no interruption to daily life; brief redness, swelling or light bruising from the suction can occur.',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'inmode-fx-forma',
  },
]

/** 중문·영문 칩 표기 어느 쪽으로도 조회 가능 */
export function getHeroTreatmentByChip(chip: string): HeroTreatmentInfo | undefined {
  return HERO_TREATMENTS.find(t => t.chip === chip || t.chipEn === chip)
}
