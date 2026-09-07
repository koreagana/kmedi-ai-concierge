import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet, BigHealthApprovedProductsBlock } from './bigHealthKeywords'

export interface SkinAestheticsDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: all /prep/* targets below were verified against the real page files under
// public/prep/ before adding — do not rename without checking the actual folder exists.
export const SKIN_AESTHETICS_DOC_BUTTONS = {
  skinTreatmentAfter: {
    label: {
      zh: '查看皮肤治疗后通用注意事项',
      en: 'View General Skin Treatment Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/skin-treatment-after/',
  },
  deviceLiftingAfter: {
    label: {
      zh: '查看仪器提升治疗后注意事项',
      en: 'View Device Lifting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/device-lifting-after/',
  },
  skinBoosterAfter: {
    label: {
      zh: '查看水光·丽珠兰治疗后注意事项',
      en: 'View Skin Booster & Rejuran Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/skin-booster-after/',
  },
  botoxGuide: {
    label: {
      zh: '查看肉毒素治疗后注意事项',
      en: 'View Botox Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/botox-guide/',
  },
  fillerGuide: {
    label: {
      zh: '查看玻尿酸填充后注意事项',
      en: 'View Filler Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/filler-guide/',
  },
  fillerBotoxGuide: {
    label: {
      zh: '查看肉毒素·玻尿酸治疗后注意事项',
      en: 'View Botox & Filler Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/filler-botox-guide/',
  },
  threadLiftingAfter: {
    label: {
      zh: '查看埋线提升后注意事项',
      en: 'View Thread Lifting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/thread-lifting-after/',
  },
  acneScarAfter: {
    label: {
      zh: '查看痘痘·痘坑治疗后注意事项',
      en: 'View Acne & Scar Treatment Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/acne-scar-after/',
  },
  scarCareGuide: {
    label: {
      zh: '查看疤痕管理说明',
      en: 'View Scar Care Guide',
    },
    kind: 'route',
    target: '/prep/scar-care-guide/',
  },
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      en: 'Open WeChat Business Consultation',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, SkinAestheticsDocButton>

export type SkinAestheticsDocButtonKey = keyof typeof SKIN_AESTHETICS_DOC_BUTTONS

export interface SkinAestheticsProductGroup {
  label: LocalizedText
  items: LocalizedText[]
}

export interface SkinAestheticsKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  /** May contain \n\n to separate multiple paragraphs. */
  description: LocalizedText
  /** Optional callout shown right under the description (used to clarify "skin stem cell" naming). */
  specialNote?: LocalizedText
  directionsLabel: LocalizedText
  /** Flat list, rendered under directionsLabel. Ignored (may be []) when directionGroups is set instead. */
  directions: BigHealthBullet[]
  /** When set, rendered instead of the flat `directions` list — e.g. "Botulinum Toxin" vs "Filler" sub-groups under one directionsLabel. */
  directionGroups?: SkinAestheticsProductGroup[]
  /** Optional "trending devices/brands" block, rendered with a distinct (pink) accent to set it apart from the standard treatment-direction list. */
  popularDevices?: BigHealthApprovedProductsBlock
  /** Optional label above a grouped product list (e.g. brand names clustered by ingredient family). */
  productGroupsLabel?: LocalizedText
  productGroups?: SkinAestheticsProductGroup[]
  /** Optional Q&A-style explainer block (title + \n\n-separated paragraphs), shown after the product groups. */
  explainerTitle?: LocalizedText
  explainerBody?: LocalizedText
  note?: LocalizedText
  /** 'warning' renders the note in the urgent/orange style instead of the neutral info style. */
  noteStyle?: 'info' | 'warning'
  docKeys: SkinAestheticsDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能相关治疗方向',
  en: 'Possible Related Treatment Directions',
}

export const SKIN_AESTHETICS_SECTION = {
  title: {
    zh: '皮肤医美',
    en: 'Skin Aesthetics',
  } as LocalizedText,
  subCopy: {
    zh: '皮肤提升 · 毛孔肤质 · 抗衰外观',
    en: 'Skin Lifting · Pores & Texture · Anti-Aging Appearance Care',
  } as LocalizedText,
  desc: {
    zh: '皮肤提升咨询主要针对面部下垂、下颌线模糊、法令纹加深、面部轮廓松弛、皮肤弹性下降等问题进行综合评估。非手术及微创提升可根据皮肤状态和不同部位，选择超声波、射频等能量类项目，以及注射类项目、线雕提升等多种方式。',
    en: "A skin lifting consultation is a process of organizing concerns such as facial sagging, a blurred jawline, deepening nasolabial folds, loss of facial contour, and reduced skin elasticity. Depending on your skin condition and the treatment area, non-surgical lifting can draw on a range of approaches — energy-based treatments like ultrasound and radiofrequency, injectable treatments, and thread lifting.",
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国皮肤医美咨询前的信息整理，不代替医生诊断或治疗判断。',
      en: "This page is for organizing information before a skin aesthetics consultation in Korea, and does not replace a physician's diagnosis or treatment decision.",
    },
    {
      zh: '具体是否适合某项治疗、是否可以联合治疗，以及恢复期安排，需要由正规医疗机构和专业医生判断。',
      en: 'Whether a specific treatment is suitable, whether treatments can be combined, and how recovery should be scheduled must be determined by a licensed medical institution and a qualified physician.',
    },
  ] as LocalizedText[],
}

export const SKIN_AESTHETICS_PILLS_PROMPT: LocalizedText = {
  zh: '请选择您关心的方向 — 可查看相关治疗方向及激光设备介绍。',
  en: 'Please select the topic you are most interested in — you can view related treatments and laser device details.',
}

export const SKIN_AESTHETICS_KEYWORDS: SkinAestheticsKeyword[] = [
  {
    id: 'skin-lifting',
    image: '/keyword-tiles/skin-lifting.jpg',
    title: {
      zh: '皮肤提升',
      en: 'Skin Lifting',
    },
    description: {
      zh: '皮肤提升咨询主要针对面部松弛、下颌线不清晰、法令纹加深、脸部轮廓下垂、皮肤弹性下降等问题。',
      en: 'Skin lifting consultation mainly addresses concerns such as facial sagging, an unclear jawline, deepening nasolabial folds, drooping facial contours, and reduced skin elasticity.',
    },
    directionsLabel: {
      zh: '各提升术式适用部位',
      en: 'Target Areas by Lifting Procedure',
    },
    directions: [
      { zh: '超声提拉 — 下颌线、下面部松弛、面部轮廓', en: 'Ultrasound lifting — jawline · under-chin · lower-face sagging · facial contour' },
      { zh: '射频紧肤 — 面颊松弛、皮肤弹性、细纹', en: 'Radiofrequency (RF) lifting — cheek sagging · lower-face elasticity · jawline · fine lines' },
      { zh: 'RF射频紧致 — 皮肤弹性、肤质、毛孔', en: 'Microneedle RF — skin elasticity · skin texture · pores · fine lines' },
      { zh: '水光针 / 注射类 — 细纹、皮肤弹性、肌肤状态', en: 'Skin boosters & collagen-stimulating injections — fine lines · skin texture · hydration · skin elasticity' },
      { zh: '线雕提升 — 面颊松弛、下颌线、面部轮廓', en: 'Thread lifting — cheek sagging · midface sagging · jawline · facial contour' },
    ],
    popularDevices: {
      title: {
        zh: '近期热门提升项目',
        en: 'Trending Lifting Treatments',
      },
      items: [
        {
          name: { zh: 'Ultherapy PRIME 超声刀', en: 'Ulthera PRIME' },
          desc: { zh: '下颌线 · 下半脸 · 下巴下方提升', en: 'Jawline · lower face · under-chin lifting' },
        },
        {
          name: { zh: 'Thermage FLX 热玛吉', en: 'Thermage FLX' },
          desc: { zh: '紧致 · 弹性 · 细纹 · 面部轮廓', en: 'Skin tightening · elasticity · fine lines · facial contour' },
        },
        {
          name: { zh: 'Titanium Lifting 钛提升', en: 'Titanium Lifting' },
          desc: { zh: '提拉 · 紧致 · 提亮 · 轮廓改善', en: 'Lifting · tightening · skin tone improvement · contour refinement' },
        },
        {
          name: { zh: 'XERF', en: 'XERF' },
          desc: { zh: '双频单极射频 · 紧致 · 弹性 · 下颌线', en: 'Dual-frequency monopolar RF · tightening · elasticity · jawline' },
        },
        {
          name: { zh: 'Oligio X', en: 'Oligio X' },
          desc: { zh: '单极射频 · 弹性 · 皱纹 · 毛孔 · 肤质', en: 'Monopolar RF · elasticity · wrinkles · pores · skin texture' },
        },
        {
          name: { zh: 'Density / Volnewmer', en: 'Density / Volnewmer' },
          desc: { zh: '射频紧致 · 弹性 · 轮廓管理', en: 'RF tightening · skin elasticity · facial contour' },
        },
      ],
      caution: {
        zh: '具体配备的设备型号因医院而异，实际可选设备需现场咨询确认。',
        en: 'Available devices vary by clinic — please confirm which specific equipment is offered during your consultation.',
      },
    },
    docKeys: ['skinTreatmentAfter', 'deviceLiftingAfter'],
  },
  {
    id: 'pores-texture',
    image: '/keyword-tiles/pores-texture.jpg',
    title: {
      zh: '毛孔 · 肤质',
      en: 'Pores & Skin Texture',
    },
    description: {
      zh: '毛孔粗大、肤质粗糙、细纹、弹力下降、痘坑痘疤等问题，会根据皮肤厚度、皮脂分泌情况、疤痕类型及深度、色素问题等，选择不同的治疗方向。',
      en: 'Concerns such as enlarged pores, rough skin texture, fine lines, reduced elasticity, and acne scars call for different treatment directions depending on skin thickness, sebum production, scar type and depth, and pigmentation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '射频微针', en: 'RF Microneedling' },
      { zh: '点阵激光', en: 'Fractional Laser' },
      { zh: '皮秒点阵', en: 'Picosecond Fractional' },
      { zh: 'CO₂ · Er:YAG 激光焕肤', en: 'CO₂ · Er:YAG Laser Resurfacing' },
      { zh: '水光／Skin Booster', en: 'Water-Glow Injections / Skin Booster' },
      { zh: '胶原再生治疗', en: 'Collagen Regeneration Treatment' },
      { zh: '舒缓 · 修复管理', en: 'Soothing & Recovery Care' },
    ],
    popularDevices: {
      title: { zh: '相关激光及能量设备', en: 'Related Laser & Energy-Based Devices' },
      items: [
        { name: { zh: 'POTENZA 黄金射频微针', en: 'POTENZA RF Microneedling' }, desc: { zh: '', en: '' } },
        { name: { zh: 'SYLFIRM X 黄金微针', en: 'SYLFIRM X RF Microneedling' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Secret RF 射频微针', en: 'Secret RF Microneedling' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Genius RF 射频微针', en: 'Genius RF Microneedling' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Morpheus8 射频微针', en: 'Morpheus8 RF Microneedling' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Fraxel 飞梭点阵激光', en: 'Fraxel Fractional Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'MOSAIC 点阵激光', en: 'MOSAIC Fractional Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Clear + Brilliant 嫩肤激光', en: 'Clear + Brilliant Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'PicoSure Pro 皮秒激光', en: 'PicoSure Pro' }, desc: { zh: '', en: '' } },
        { name: { zh: 'PicoWay 超皮秒激光', en: 'PicoWay' }, desc: { zh: '', en: '' } },
        { name: { zh: 'HALO 混合点阵激光', en: 'HALO Hybrid Fractional Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'LASEMD ULTRA 铥激光', en: 'LASEMD ULTRA' }, desc: { zh: '', en: '' } },
        { name: { zh: 'eCO2 二氧化碳点阵激光', en: 'eCO2 Fractional CO2 Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'UltraPulse 超脉冲二氧化碳激光', en: 'UltraPulse CO2 Laser' }, desc: { zh: '', en: '' } },
        { name: { zh: 'Fotona Er:YAG 铒激光', en: 'Fotona Er:YAG Laser' }, desc: { zh: '', en: '' } },
      ],
      caution: {
        zh: '毛孔及肤质治疗通常不会只依赖单一设备，而是根据皮肤状态和改善目标，选择适合的设备及治疗方式，必要时进行联合治疗。',
        en: "Pore and skin-texture treatment usually isn't limited to a single device — the appropriate device and treatment method are chosen, or combined when needed, based on skin condition and treatment goals.",
      },
    },
    docKeys: ['skinTreatmentAfter', 'skinBoosterAfter'],
  },
  {
    id: 'skin-boosters-rejuran',
    image: '/keyword-tiles/skin-boosters-rejuran.jpg',
    title: {
      zh: '皮肤助推剂 · 皮肤再生',
      en: 'Skin Boosters & Rejuran',
    },
    description: {
      zh: '皮肤助推剂是一种以改善皮肤内部水分、肤质、弹性、细纹、光泽以及整体皮肤状态为目标的注射式治疗项目。根据产品不同，其成分和作用机制也有所差异，主要成分包括透明质酸、PN/PDRN、氨基酸、肽、胶原再生成分等。需根据个人皮肤状况及期望改善的方向，选择适合自己的产品。',
      en: 'Water-glow injections, Rejuran, and skin booster treatments are commonly included in consultations for skin dryness, fine lines, skin texture, radiance, skin recovery capacity, and anti-aging appearance care. The specific ingredients, injection method, and recovery response can vary by hospital and product.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: 'PN/PDRN系列皮肤再生', en: 'Water-glow injections' },
      { zh: '透明质酸补水·光泽助推剂', en: 'Rejuran' },
      { zh: '胶原再生型皮肤助推剂', en: 'Skin boosters' },
      { zh: '氨基酸·肽类生物复活疗法', en: 'PN/PDRN-based skin care' },
      { zh: '个性化定制水光针', en: 'Hyaluronic acid-based hydrating injections' },
      { zh: 'PRP/PRF自体血液基皮肤再生', en: 'Collagen regeneration skin care' },
      { zh: '与激光·射频治疗联用的修复·恢复管理', en: 'Autologous blood-based skin regeneration care' },
    ],
    productGroupsLabel: {
      zh: '代表性皮肤助推剂 · 皮肤再生产品',
      en: '',
    },
    productGroups: [
      {
        label: { zh: 'PN · PDRN系列', en: '' },
        items: [
          { zh: 'REJURAN 丽珠兰（韩国）', en: '' },
          { zh: 'PLINEST 普丽斯特（意大利）', en: '' },
          { zh: 'Placentex 胎盘素 · PDRN（意大利）', en: '' },
        ],
      },
      {
        label: { zh: '胶原再生系列', en: '' },
        items: [
          { zh: 'JUVELOOK 珠维露 · PDLLA + HA（韩国）', en: '' },
          { zh: 'JUVELOOK Volume / LENISNA 珠维露容积 · 蕾妮丝娜（韩国）', en: '' },
        ],
      },
      {
        label: { zh: '透明质酸 · 补水助推剂系列', en: '' },
        items: [
          { zh: 'Restylane Skinboosters 瑞蓝皮肤助推剂（瑞典）', en: '' },
          { zh: 'TEOSYAL Redensity 1 缇奥希 红密度1（瑞士）', en: '' },
          { zh: 'SKINVIVE by JUVÉDERM 乔雅登·肤活（美国）', en: '' },
          { zh: 'PROFHILO 菲洛（瑞士IBSA）', en: '' },
        ],
      },
      {
        label: { zh: '复合 · 生物复活疗法系列', en: '' },
        items: [
          { zh: 'NCTF 135 HA（法国）', en: '' },
          { zh: 'JALUPRO / JALUPRO HMW / Super Hydro（瑞士）', en: '' },
          { zh: 'SUNEKOS 索妮蔻（意大利）', en: '' },
        ],
      },
    ],
    explainerTitle: {
      zh: '什么叫水光针？',
      en: '',
    },
    explainerBody: {
      zh: '在韩国常说的"水光针"，并非指某一特定产品名称，而往往泛指以提升皮肤水分和光泽度为目标的注射类项目。\n\n其基础成分多为透明质酸，同时可根据需要搭配PN/PDRN、氨基酸、维生素等多种成分。不同医院和医生所使用的产品、成分配比、注射深度及方式都可能存在差异。因此，即便都叫"水光针"，实际治疗内容也可能因机构不同而有所区别。\n\n皮肤助推剂因各产品的成分与特性迥异，务必在确认自身皮肤状态、改善目标、治疗部位等信息后，再选择合适的产品和治疗方案，这一点十分重要。',
      en: '',
    },
    docKeys: ['skinBoosterAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'botox-fillers',
    image: '/keyword-tiles/botox-fillers.jpg',
    title: {
      zh: '肉毒杆菌毒素 · 玻尿酸填充剂',
      en: 'Botulinum Toxin & Fillers',
    },
    description: {
      zh: '肉毒杆菌毒素与玻尿酸填充剂，是可用于改善表情纹、面部轮廓、容积流失、凹陷、唇部及下颌线条等多种部位的代表性注射类项目。根据治疗部位及期望的变化，选择适合的产品与注射方式，是取得理想效果的关键。',
      en: "Botulinum toxin and hyaluronic acid fillers are two of the most common injectable treatments, used across a wide range of areas — dynamic wrinkles, facial contour, volume loss, hollowing, lips, and the jawline. The right product and injection method are chosen based on the treatment area and the change you're hoping for.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [],
    directionGroups: [
      {
        label: { zh: '肉毒杆菌毒素', en: 'Botulinum Toxin' },
        items: [
          { zh: '额头 · 眉间 · 眼周等表情纹', en: "Forehead · glabella · crow's feet (expression wrinkles)" },
          { zh: '方下颌 · 下颌线条', en: 'Masseter (jaw) · jawline' },
          { zh: '斜方肌', en: 'Trapezius' },
          { zh: '小腿', en: 'Calf' },
          { zh: '皮肤肉毒素（微滴肉毒）', en: 'Skin Botox (micro-Botox)' },
          { zh: '多汗症肉毒素', en: 'Hyperhidrosis (excessive sweating) Botox' },
        ],
      },
      {
        label: { zh: '玻尿酸填充剂', en: 'Fillers' },
        items: [
          { zh: '额头 · 太阳穴容积填充', en: 'Forehead · temple volume' },
          { zh: '眼底 · 苹果肌', en: 'Under-eye · midface (apple cheek)' },
          { zh: '法令纹', en: 'Nasolabial folds' },
          { zh: '唇部', en: 'Lips' },
          { zh: '下巴尖 · 下颌线条', en: 'Chin tip · jawline' },
          { zh: '鼻部 · 面部轮廓', en: 'Nose · facial contour' },
          { zh: '各部位容积补充及不对称改善', en: 'Volume restoration & asymmetry correction by area' },
        ],
      },
    ],
    productGroups: [
      {
        label: { zh: '代表性肉毒杆菌毒素品牌', en: 'Leading Botulinum Toxin Brands' },
        items: [
          { zh: 'BOTOX® — 艾尔建美学 / 艾伯维（美国）【保妥适】', en: 'BOTOX® — Allergan Aesthetics / AbbVie (USA)' },
          { zh: 'XEOMIN® — 麦氏（德国）【吉适】', en: 'XEOMIN® — Merz (Germany)' },
          { zh: 'NABOTA® — 大熊制药（韩国）【娜柏塔】', en: 'NABOTA® — Daewoong Pharmaceutical (Korea)' },
          { zh: 'BOTULAX® / LETYBO® — 秀杰（韩国）【铂妥乐 / 乐提葆】', en: 'BOTULAX® / LETYBO® — Hugel (Korea)' },
          { zh: 'CORETOX® — 美得妥（韩国）【科妥】', en: 'CORETOX® — Medytox (Korea)' },
        ],
      },
      {
        label: { zh: '代表性玻尿酸填充剂品牌', en: 'Leading Hyaluronic Acid Filler Brands' },
        items: [
          { zh: 'JUVÉDERM® — 艾尔建美学 / 艾伯维（美国）【乔雅登】', en: 'JUVÉDERM® — Allergan Aesthetics / AbbVie (USA)' },
          { zh: 'Restylane® — 高德美（瑞士）【瑞蓝】', en: 'Restylane® — Galderma (Switzerland)' },
          { zh: 'YVOIRE® — LG化学（韩国）【伊婉】', en: 'YVOIRE® — LG Chem (Korea)' },
          { zh: 'NEURAMIS® — 美得妥（韩国）【纽拉美斯】', en: 'NEURAMIS® — Medytox (Korea)' },
          { zh: 'REVOLAX® — 秀杰（韩国）【瑞芙拉】', en: 'REVOLAX® — Hugel (Korea)' },
        ],
      },
    ],
    explainerTitle: {
      zh: '什么是瘦脸针？',
      en: '',
    },
    explainerBody: {
      zh: '通过向发达的咬肌注射肉毒素，使肌肉逐渐放松、缩小，从而改善下颌轮廓，让脸部线条更加流畅自然。注射位置、剂量和医生的技术都会影响最终效果。\n\n在韩国，"轮廓针""雕刻针"也是常见说法，主要用于改善脸颊、双下巴等部位的局部脂肪，塑造更清晰立体的面部轮廓。不同医院使用的成分、配比和注射手法可能有所不同，每家医院往往都有各自的独家配方与操作方式。',
      en: '',
    },
    docKeys: ['botoxGuide', 'fillerGuide', 'fillerBotoxGuide'],
  },
  {
    id: 'acne-scars',
    image: '/keyword-tiles/acne-scars.jpg',
    title: {
      zh: '色斑 · 痤疮 · 疤痕 · 潮红',
      en: 'Dark Spots · Acne · Scars · Redness',
    },
    description: {
      zh: '色斑与色素沉着、反复发作的痤疮、红色痘印、凹陷性疤痕，各自的成因各不相同。需先确认色素的深度、皮脂分泌情况、炎症与血管反应、疤痕的形态与深度，再根据皮肤状态选择针对性的治疗方案。',
      en: "Dark spots and pigmentation, recurring acne, red acne marks, and pitted scars each have different underlying causes. The pigment's depth, sebum production, inflammation and vascular response, and the scar's shape and depth are checked first, and a targeted treatment plan is chosen based on skin condition.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '痘痘炎症管理', en: 'Acne inflammation management' },
      { zh: '皮脂管理', en: 'Sebum management' },
      { zh: '痘坑改善类治疗', en: 'Treatments for improving pitted scars' },
      { zh: '射频微针类治疗', en: 'RF microneedling treatments' },
      { zh: '皮肤再生管理', en: 'Skin regeneration care' },
      { zh: '胶原再生类治疗', en: 'Collagen regeneration treatments' },
      { zh: '必要时结合药物治疗咨询', en: 'Combined with medication consultation when necessary' },
    ],
    directionGroups: [
      {
        label: { zh: '色斑 · 色素沉着 · 色素性病变', en: 'Dark Spots · Pigmentation · Pigmented Lesions' },
        items: [
          { zh: '色斑·老年斑集中祛除', en: 'Focused removal of dark spots & age spots' },
          { zh: '皮秒激光色素治疗', en: 'Picosecond laser pigment treatment' },
          { zh: '色素美白提亮（Toning）', en: 'Pigment brightening (toning)' },
          { zh: '根据表皮·真皮色素类型定制激光方案', en: 'Laser selection tailored to epidermal vs. dermal pigment type' },
        ],
      },
      {
        label: { zh: '痤疮 · 皮脂 · 炎症', en: 'Acne · Sebum · Inflammation' },
        items: [
          { zh: '靶向皮脂腺的痤疮激光', en: 'Sebaceous-gland-targeted acne laser' },
          { zh: '炎症性痤疮能量治疗', en: 'Energy-based treatment for inflammatory acne' },
          { zh: '痤疮针清及皮肤管理', en: 'Acne extraction & skin care' },
          { zh: '射频基痤疮治疗', en: 'RF-based acne treatment' },
          { zh: '根据需要联合药物治疗', en: 'Combined with medication when necessary' },
        ],
      },
      {
        label: { zh: '潮红 · 红色痘印', en: 'Redness · Red Acne Marks' },
        items: [
          { zh: '血管激光', en: 'Vascular laser' },
          { zh: '痤疮后红斑（PIE）治疗', en: 'Post-acne erythema (PIE) treatment' },
          { zh: '反复性红色印记改善', en: 'Improvement of recurring red marks' },
          { zh: '皮肤血管及潮红管理', en: 'Skin vascular & redness management' },
        ],
      },
      {
        label: { zh: '凹陷性痤疮疤痕', en: 'Pitted Acne Scars' },
        items: [
          { zh: '自体真皮再生', en: 'Autologous dermal regeneration' },
          { zh: '瘢痕粘连松解术（Subcision）', en: 'Subcision' },
          { zh: '射频微针', en: 'RF microneedling' },
          { zh: '点阵CO₂激光', en: 'Fractional CO2 laser' },
          { zh: '非剥脱点阵激光', en: 'Non-ablative fractional laser' },
          { zh: '皮秒点阵', en: 'Picosecond fractional' },
          { zh: '胶原再生治疗', en: 'Collagen regeneration treatment' },
        ],
      },
    ],
    productGroupsLabel: {
      zh: '相关激光 · 能量及再生设备',
      en: 'Related Laser, Energy & Regenerative Devices',
    },
    productGroups: [
      {
        label: { zh: '色斑 · 色素', en: 'Dark Spots · Pigmentation' },
        items: [
          { zh: 'REEPOT', en: 'REEPOT' },
          { zh: 'PicoSure Pro', en: 'PicoSure Pro' },
          { zh: 'PicoWay', en: 'PicoWay' },
          { zh: 'Hollywood Spectra', en: 'Hollywood Spectra' },
          { zh: 'RevLite SI', en: 'RevLite SI' },
        ],
      },
      {
        label: { zh: '痤疮 · 皮脂腺', en: 'Acne · Sebaceous Glands' },
        items: [
          { zh: 'Accure Acne Laser', en: 'Accure Acne Laser' },
          { zh: 'AviClear', en: 'AviClear' },
          { zh: 'NEOBEAM 1450', en: 'NEOBEAM 1450' },
          { zh: 'Hollywood Spectra', en: 'Hollywood Spectra' },
        ],
      },
      {
        label: { zh: '潮红 · 红色痘印', en: 'Redness · Red Acne Marks' },
        items: [
          { zh: 'Vbeam', en: 'Vbeam' },
          { zh: 'excel V+', en: 'excel V+' },
          { zh: '血管激光 PDL系列', en: 'PDL vascular lasers' },
        ],
      },
      {
        label: { zh: '凹陷性疤痕 · 皮肤再生', en: 'Pitted Scars · Skin Regeneration' },
        items: [
          { zh: 'JUVGEN 自体真皮再生', en: 'JUVGEN (autologous dermal regeneration)' },
          { zh: 'POTENZA', en: 'POTENZA' },
          { zh: 'Secret RF', en: 'Secret RF' },
          { zh: 'eCO2 3D', en: 'eCO2 3D' },
          { zh: 'MOSAIC 3D', en: 'MOSAIC 3D' },
          { zh: 'PicoSure Pro', en: 'PicoSure Pro' },
        ],
      },
    ],
    note: {
      zh: '关于各激光设备的功效详情，请点击橙色咨询按钮进行咨询。',
      en: 'For details on the efficacy of each laser device, please click the orange consultation button to ask.',
    },
    docKeys: ['acneScarAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'body-skin-care',
    image: '/keyword-tiles/body-skin-care.jpg',
    title: {
      zh: '身体皮肤管理',
      en: 'Body Skin Care',
    },
    description: {
      zh: '针对腹部·手臂·大腿的松弛与橘皮组织、腋下·手肘·膝盖等部位的色素沉着、腹部与大腿的妊娠纹等身体各部位的皮肤问题进行管理。',
      en: 'Body care addresses concerns by area — elasticity and cellulite in the abdomen, arms, and thighs; pigmentation on the underarms, elbows, and knees; and stretch marks on the abdomen and thighs.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [],
    directionGroups: [
      {
        label: { zh: '身体紧致 · 橘皮组织', en: 'Body Firming · Cellulite' },
        items: [
          { zh: '射频紧致治疗', en: 'RF firming treatment' },
          { zh: '微波身体紧致提拉', en: 'Microwave body lifting' },
          { zh: '皮肤紧致提拉', en: 'Skin tightening' },
          { zh: '橘皮组织改善', en: 'Cellulite improvement' },
        ],
      },
      {
        label: { zh: '身体色素沉着', en: 'Body Pigmentation' },
        items: [
          { zh: '腋下 · 手肘 · 膝盖', en: 'Underarms · elbows · knees' },
          { zh: '臀部 · 比基尼线', en: 'Buttocks · bikini line' },
        ],
      },
      {
        label: { zh: '妊娠纹', en: 'Stretch Marks' },
        items: [
          { zh: '腹部 · 大腿 · 臀部', en: 'Abdomen · thighs · buttocks' },
          { zh: '点阵激光', en: 'Fractional laser' },
          { zh: '射频微针', en: 'RF microneedling' },
        ],
      },
    ],
    popularDevices: {
      title: { zh: '近期热门身体紧致项目', en: 'Trending Body Lifting Treatments' },
      items: [
        {
          name: { zh: 'ONDA PRO', en: 'ONDA PRO' },
          desc: { zh: '微波 · 身体紧致 · 橘皮组织 · 体线改善', en: 'Microwave · body tightening · cellulite · body-line improvement' },
        },
        {
          name: { zh: 'PTING BODY', en: 'PTING BODY' },
          desc: { zh: '超高频微波 · 弹力 · 体线 · 腹部·手臂·大腿管理', en: 'Ultra-high-frequency microwave · elasticity · body line · abdomen, arms & thighs care' },
        },
        {
          name: { zh: 'INMODE BodyFX', en: 'INMODE BodyFX' },
          desc: { zh: 'RF+真空吸引 · 皮肤紧致 · 橘皮组织 · 体线改善', en: 'RF + vacuum · skin tightening · cellulite · body-line improvement' },
        },
        {
          name: { zh: 'SHURINK UNIVERSE BODY', en: 'SHURINK UNIVERSE BODY' },
          desc: { zh: 'HIFU聚焦超声 · 腹部·大腿紧致 · 皮肤紧致', en: 'HIFU · abdomen & thigh firming · skin tightening' },
        },
      ],
      caution: {
        zh: '具体配备的设备型号因医院而异，实际可选设备需现场咨询确认。',
        en: 'Available devices vary by clinic — please confirm which specific equipment is offered during your consultation.',
      },
    },
    docKeys: ['skinTreatmentAfter', 'scarCareGuide'],
  },
]
