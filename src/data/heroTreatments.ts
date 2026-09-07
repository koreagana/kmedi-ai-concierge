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
    definition: '以三文鱼DNA核心成分（PN）为基础的皮肤再生注射疗法',
    recommend: '肤色暗沉、面部细纹明显，或需要全面改善肤质再生能力时',
    difference: '与乔雅露相比，丽珠兰更侧重于深层的皮肤再生与高效补水',
    recovery: '无恢复期，术后即可正常生活（少数人可能出现1~2天轻微泛红）',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'rejuran-healer',
  },
  {
    chip: '超声刀',
    definition: '作用于SMAS层的提拉紧致项目',
    recommend: '当脸颊及下颌线出现肉眼可见的松弛下垂时',
    difference: '相比热玛吉，超声刀更侧重于针对性的深层提拉，有效改善松弛问题。',
    deviceNote: '美版超声刀（获美国FDA认证）的维持时间通常比韩版HIFU设备更长，韩版设备的维持效果普遍不足6个月。\n常见韩版HIFU设备名称包括：10SERA、Shurink Universe（舒林克）、Liftera2、Volnewmer等。\n（注：上述设备并非超声刀的仿制品，而是各自取得独立认证的韩国医疗设备。）',
    recovery: '无恢复期，术后即可立即恢复日常生活。',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'ulthera-prime',
  },
  {
    chip: 'ONDA',
    definition: '利用微波技术实现溶脂与提拉的项目',
    recommend: '脸颊及下颌线出现松弛下垂，且伴有局部脂肪堆积时',
    difference: '与超声刀、热玛吉相比，ONDA更侧重于对脂肪层的直接作用与改善',
    recovery: '无恢复期，术后即可正常生活',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'onda',
  },
  {
    chip: 'XERF 泽弗',
    definition: '6.78MHz＋2MHz双频单极射频紧致提升项目',
    recommend: '面部松弛、下颌线模糊、皮肤弹性下降，希望改善较深层松弛并加强整体紧致度时',
    difference: '改善面部松弛和轮廓线条，促进胶原重塑，使皮肤更加紧致、有弹性。采用6.78MHz＋2MHz双频单极射频，可根据皮肤状态选择不同作用深度，从浅层到深层进行加热，相比钛提升更侧重深层紧致和胶原重塑。治疗后可感受到一定紧致感，随着胶原重塑，效果会在之后逐渐显现',
    recovery: '通常无需恢复期，治疗后可正常生活，部分人可能出现短暂泛红或热感',
    quoteCategoryId: 'lifting',
  },
  {
    chip: '水光针',
    definition: '通过向皮肤注入透明质酸（HA）或PN成分，实现深层补水与营养供给的项目',
    recommend: '皮肤干燥缺水，或希望快速提升肌肤水润度与光泽感时',
    difference: '与丽珠兰相比，水光针见效更快，但维持时间相对较短',
    recovery: '无恢复期，术后6~12小时起可温和洁面及淡妆（少数人可能出现半天至1天的轻微泛红或肿胀）',
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
    chip: '瘦脸针',
    isException: true,
    definition: 'V脸针 · 轮廓针 · 溶脂针 的组合施术',
    exceptionNote: '每位院长都有自己独到的配比方案。若下颌脂肪较多，可搭配溶脂针与提拉激光。',
    recommend: '咬肌型、脂肪型、松弛型',
    recovery: '几乎无恢复期。建议术后一周内避免桑拿、汗蒸及剧烈运动。',
    quoteCategoryId: 'filler-botox',
    quoteProcedureId: 'vline-combo',
  },
  {
    chip: '钛提升',
    definition: '755nm＋810nm＋1064nm三波长激光紧致项目',
    recommend: '轻度松弛、下颌线不清晰、面部轮廓松散、肤色暗沉，希望快速看到紧致效果的人群',
    difference: '即时改善面部轮廓、紧致肌肤、提亮肤色，同时改善轻度松弛。治疗后即可感受到轮廓更紧致，属于效果出现较快的轻医美提升项目',
    recovery: '几乎无恢复期，治疗后通常可正常生活',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'titanium-toning',
  },
  {
    chip: '黄金微针',
    definition: '射频微针紧致·毛孔·痘疤改善项目',
    recommend: '毛孔粗大、痘疤、皮肤纹理不平、出油较多、轻度松弛时',
    difference: '改善毛孔、痘疤和肤质，同时促进胶原再生，提升皮肤紧致度。通过微针将射频能量传递至皮肤内部，可根据毛孔、痘疤、紧致等不同需求选择不同针头和模式',
    recovery: '通常1～3天有泛红或轻微肿胀，部分模式可能出现细小结痂',
    quoteCategoryId: 'acne-pore',
    quoteProcedureId: 'potenza',
  },
  {
    chip: '乔雅露',
    definition: 'PDLLA＋透明质酸复合胶原再生注射',
    recommend: '毛孔粗大、细纹、肤质粗糙、弹性下降时',
    difference: '促进胶原蛋白生成，改善毛孔、细纹、肤质和皮肤弹性。相比丽珠兰，更侧重胶原再生和皮肤紧致度改善，效果会逐渐显现',
    recovery: '通常可立即恢复日常生活，注射部位可能有1～2天轻微肿胀或淤青',
    quoteCategoryId: 'skinbooster',
    quoteProcedureId: 'juvelook-skin',
  },
  {
    chip: '索夫波',
    definition: '采用同步超声平行束技术（SUPERB™），主要作用于真皮中层约1.5mm的紧致提升项目',
    recommend: '以改善细纹、肤质和轻中度松弛为主，希望疼痛较少、恢复期较短时',
    difference: '改善细纹和皮肤松弛，促进胶原及弹性纤维重塑，提升皮肤紧致度。作用层次比超声刀更浅，主要针对真皮层紧致与肤质改善；对于需要改善较深层SMAS松弛的人群，通常超声刀更适合',
    recovery: '通常可立即恢复日常生活，少数人可能出现短暂泛红或轻微肿胀',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'sofwave',
  },
  {
    chip: 'InMode FX',
    definition: '真空吸附＋双极射频（RF）的局部脂肪与紧致改善项目',
    recommend: '双下巴、下颌缘脂肪较多、下半脸显得厚重，同时伴有轻度松弛时',
    difference: '减少局部脂肪堆积，同时改善皮肤紧致度，使下颌线和V-Line轮廓更加清晰。与主要针对皮肤松弛的射频或超声提升不同，InMode FX更适合"脂肪型"下半脸，可同时针对局部脂肪和皮肤松弛。下颌缘或双下巴脂肪较明显时，InMode FX常与面部溶脂针、HIFU搭配使用，以进一步改善双下巴、下颌缘脂肪和V-Line轮廓',
    recovery: '通常可正常生活，治疗后可能出现短暂泛红、肿胀或吸附造成的轻微淤青',
    quoteCategoryId: 'lifting',
    quoteProcedureId: 'inmode-fx-forma',
  },
]

export function getHeroTreatmentByChip(chip: string): HeroTreatmentInfo | undefined {
  return HERO_TREATMENTS.find(t => t.chip === chip)
}
