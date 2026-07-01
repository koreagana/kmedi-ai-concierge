/* ────────────────────────────────────────────────────────────────
   K-Beauty Recovery Shop 상품 데이터
   - 새 상품을 추가할 때는 이 파일의 PRODUCTS 배열에만 항목을 추가하면
     /shop, /shop/:productId, /shop/order 세 페이지에 전부 반영됩니다.
   - 가격은 KRW 기준, priceCnyLabel은 참고용 위안화 표기(고정 문자열).
   ──────────────────────────────────────────────────────────────── */

export interface BilingualText {
  ko: string
  zh: string
}

export type ProductCategoryId = 'recovery' | 'skincare' | 'kit' | 'travel'

export type ProductBadge = 'best' | 'new' | null

export interface ProductCategory {
  id: ProductCategoryId | 'all'
  label: string
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'all', label: '全部' },
  { id: 'recovery', label: '术后恢复' },
  { id: 'skincare', label: '院线护肤' },
  { id: 'kit', label: '恢复套装' },
]

export interface Product {
  id: string
  category: ProductCategoryId
  categoryLabel: BilingualText
  badge: ProductBadge
  emoji: string
  nameKo: string
  nameZh: string
  priceKrw: number
  priceCnyLabel: string
  recommendFor: BilingualText[]
  usage: BilingualText[]
  caution: BilingualText[]
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    category: 'recovery',
    categoryLabel: { ko: '수술 후 케어', zh: '术后恢复' },
    badge: 'best',
    emoji: '❄️',
    nameKo: '수술 후 냉찜질팩',
    nameZh: '术后冷敷贴 · 10片入',
    priceKrw: 12000,
    priceCnyLabel: '¥ 约63元',
    recommendFor: [
      { ko: '성형수술·레이저 시술 후 붓기 관리가 필요한 분', zh: '整形手术·激光治疗后需要消肿护理的人' },
      { ko: '귀국 후 집에서 편하게 회복 관리하고 싶은 분', zh: '回国后希望在家轻松护理恢复的人' },
      { ko: '의사에게 냉찜질을 권고받은 분', zh: '医生建议进行冷敷护理的人' },
    ],
    usage: [
      { ko: '냉동실에서 꺼낸 후 수건에 싸서 사용', zh: '从冰箱取出后用毛巾包裹再使用' },
      { ko: '1회 15~20분씩, 하루 3~4회 적용', zh: '每次15-20分钟，每天3-4次' },
      { ko: '피부에 직접 닿지 않도록 주의', zh: '注意不要让冰敷贴直接接触皮肤' },
    ],
    caution: [
      { ko: '개봉 후 즉시 사용, 재사용 불가', zh: '开封后立即使用，不可重复使用' },
      { ko: '상처 부위 직접 접촉 금지', zh: '禁止直接接触伤口部位' },
      { ko: '피부 이상 시 즉시 중단하고 상담원에게 연락', zh: '皮肤出现异常时立即停用并联系顾问' },
    ],
  },
  {
    id: '2',
    category: 'recovery',
    categoryLabel: { ko: '수술 후 케어', zh: '术后恢复' },
    badge: 'best',
    emoji: '✨',
    nameKo: '흉터 관리 실리콘 젤',
    nameZh: '疤痕修复硅凝胶',
    priceKrw: 28000,
    priceCnyLabel: '¥ 约147元',
    recommendFor: [
      { ko: '수술·시술 후 흉터가 걱정되는 분', zh: '手术·治疗后担心留疤的人' },
      { ko: '흉터 체질(켈로이드)이 있는 분', zh: '有疤痕体质（瘢痕疙瘩）的人' },
      { ko: '흉터 자국을 옅게 관리하고 싶은 분', zh: '希望淡化疤痕痕迹的人' },
    ],
    usage: [
      { ko: '깨끗하고 건조한 피부에 얇게 펴 발라 흡수시키기', zh: '在干净干燥的皮肤上薄涂并待其吸收' },
      { ko: '하루 1~2회, 흉터 부위에만 사용', zh: '每天1-2次，仅用于疤痕部位' },
      { ko: '흉터가 완전히 옅어질 때까지 장기간 사용 권장', zh: '建议长期使用直至疤痕明显淡化' },
    ],
    caution: [
      { ko: '상처가 완전히 아물기 전에는 사용하지 말 것', zh: '伤口完全愈合前请勿使用' },
      { ko: '눈·입 주변 점막 부위는 피해주세요', zh: '请避开眼部·口周黏膜部位' },
      { ko: '자극이 느껴지면 사용을 멈추고 상담원에게 연락', zh: '出现刺激感请停用并联系顾问' },
    ],
  },
  {
    id: '3',
    category: 'skincare',
    categoryLabel: { ko: '병원 화장품', zh: '院线护肤' },
    badge: 'new',
    emoji: '💧',
    nameKo: '재생 진정 앰플',
    nameZh: '修复镇定安瓶精华',
    priceKrw: 35000,
    priceCnyLabel: '¥ 约184元',
    recommendFor: [
      { ko: '시술 후 피부 진정과 재생이 필요한 분', zh: '治疗后需要镇定与修复肌肤的人' },
      { ko: '붉은기나 자극감이 남아있는 분', zh: '皮肤仍有泛红或刺激感的人' },
      { ko: '예민해진 피부를 빠르게 안정시키고 싶은 분', zh: '希望快速稳定敏感肌肤的人' },
    ],
    usage: [
      { ko: '세안 후 토너 다음 단계에서 적당량 도포', zh: '洁面后于爽肤水之后涂抹适量' },
      { ko: '아침·저녁 1일 2회 사용', zh: '早晚各使用一次' },
      { ko: '자외선 차단제와 함께 사용 권장', zh: '建议与防晒霜搭配使用' },
    ],
    caution: [
      { ko: '상처가 있는 부위는 의료진과 먼저 상담', zh: '有伤口的部位请先咨询医生' },
      { ko: '알레르기 반응 시 즉시 사용 중단', zh: '出现过敏反应请立即停用' },
    ],
  },
  {
    id: '4',
    category: 'kit',
    categoryLabel: { ko: '회복 키트', zh: '恢复套装' },
    badge: 'best',
    emoji: '🎁',
    nameKo: '쌍꺼풀 수술 후 키트',
    nameZh: '双眼皮术后护理套装',
    priceKrw: 45000,
    priceCnyLabel: '¥ 约236元',
    recommendFor: [
      { ko: '쌍꺼풀 수술을 받은 분', zh: '接受双眼皮手术的人' },
      { ko: '눈 주변 붓기·멍 관리가 필요한 분', zh: '需要护理眼周肿胀·淤青的人' },
      { ko: '회복 기간 동안 준비물을 한번에 갖추고 싶은 분', zh: '希望一次备齐恢复期用品的人' },
    ],
    usage: [
      { ko: '키트 구성품 안내서에 따라 단계별로 사용', zh: '请按套装说明书分阶段使用' },
      { ko: '병원에서 안내한 일정(냉찜질→온찜질 등)에 맞춰 사용', zh: '请按医院安排的时间表（冷敷→热敷等）使用' },
    ],
    caution: [
      { ko: '눈에 직접 닿지 않도록 주의', zh: '请注意不要直接接触眼睛' },
      { ko: '실밥 제거 전에는 병원 안내를 우선하세요', zh: '拆线前请以医院说明为准' },
    ],
  },
  {
    id: '5',
    category: 'recovery',
    categoryLabel: { ko: '수술 후 케어', zh: '术后恢复' },
    badge: null,
    emoji: '🌞',
    nameKo: '레이저 후 자외선 차단제',
    nameZh: '激光后专用防晒霜 SPF50+',
    priceKrw: 22000,
    priceCnyLabel: '¥ 约116元',
    recommendFor: [
      { ko: '레이저·필링 시술 후 피부가 민감해진 분', zh: '激光·焕肤治疗后皮肤变敏感的人' },
      { ko: '외출이 많아 자외선 차단이 중요한 분', zh: '外出频繁需要严格防晒的人' },
    ],
    usage: [
      { ko: '외출 전 충분히 도포', zh: '外出前充分涂抹' },
      { ko: '2~3시간마다 덧바르기', zh: '每2-3小时补涂一次' },
    ],
    caution: [
      { ko: '시술 직후 자극감이 있다면 사용 전 의료진에게 확인', zh: '治疗后如有刺激感，使用前请先咨询医生' },
      { ko: '눈에 들어가지 않도록 주의', zh: '请注意不要接触眼睛' },
    ],
  },
  {
    id: 'pharmicell-cream',
    category: 'skincare',
    categoryLabel: { ko: '병원 화장품', zh: '院线护肤' },
    badge: 'new',
    emoji: '🔬',
    nameKo: '플레이 셀 판테놀 닥터 크림',
    nameZh: '干细胞培养液修复霜',
    priceKrw: 48000,
    priceCnyLabel: '¥ 约252元',
    recommendFor: [
      { ko: '성형수술·레이저 시술 후 피부 재생이 필요한 분', zh: '整形手术·激光治疗后需要皮肤再生护理的人' },
      { ko: '피부 탄력이 떨어지고 건조함을 느끼는 분', zh: '感觉皮肤失去弹性，干燥缺水的人' },
      { ko: '민감성 피부로 자극 없는 크림을 찾는 분', zh: '敏感肌肤，寻找无刺激温和霜的人' },
      { ko: '재생·탄력·보습을 한 제품으로 해결하고 싶은 분', zh: '希望用一款产品同时解决再生·弹力·保湿问题的人' },
    ],
    usage: [
      { ko: '세안 후 스킨케어 마지막 단계에 사용', zh: '洁面后，作为护肤最后一步使用' },
      { ko: '적당량을 덜어 얼굴 전체에 부드럽게 펴 바름', zh: '取适量均匀涂抹于全脸，轻柔按摩至吸收' },
      { ko: '아침·저녁 세안 후 매일 사용 권장', zh: '建议每日早晚洁面后使用' },
      { ko: '시술 직후에는 의사 지시에 따라 사용 시점 확인', zh: '手术后请遵医嘱确认使用时机' },
    ],
    caution: [
      { ko: '화장품 사용 시 이상이 있으면 즉시 사용 중단', zh: '如出现过敏反应请立即停用' },
      { ko: '어린이 손에 닿지 않는 곳에 보관', zh: '请放在儿童不易触及的地方保管' },
      { ko: '직사광선이 없는 서늘한 곳에 보관', zh: '避光阴凉处保存' },
      { ko: '성형·시술 직후 사용 전 의사와 상담', zh: '手术后使用前请咨询主治医生' },
    ],
  },
  {
    id: '6',
    category: 'skincare',
    categoryLabel: { ko: '병원 화장품', zh: '院线护肤' },
    badge: null,
    emoji: '🧴',
    nameKo: '피부 장벽 회복 크림',
    nameZh: '皮肤屏障修复霜',
    priceKrw: 32000,
    priceCnyLabel: '¥ 约168元',
    recommendFor: [
      { ko: '시술 후 피부가 건조하고 예민해진 분', zh: '治疗后皮肤干燥敏感的人' },
      { ko: '충분한 보습 관리가 필요한 분', zh: '需要充分保湿护理的人' },
    ],
    usage: [
      { ko: '세안 후 적당량을 골고루 펴 바르기', zh: '洁面后取适量均匀涂抹' },
      { ko: '아침·저녁 사용', zh: '早晚使用' },
    ],
    caution: [
      { ko: '자극이 느껴지면 사용을 중단하세요', zh: '出现刺激感请停止使用' },
      { ko: '상처가 있는 부위는 의료진과 먼저 상담', zh: '有伤口的部位请先咨询医生' },
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
