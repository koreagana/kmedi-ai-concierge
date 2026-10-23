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
      zh: '皮肤治疗后通用注意事项',
      en: 'View General Skin Treatment Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/skin-treatment-after/',
  },
  deviceLiftingAfter: {
    label: {
      zh: '仪器提升后注意事项',
      en: 'View Device Lifting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/device-lifting-after/',
  },
  skinBoosterAfter: {
    label: {
      zh: '水光、丽珠兰后注意事项',
      en: 'View Skin Booster & Rejuran Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/skin-booster-after/',
  },
  botoxGuide: {
    label: {
      zh: '肉毒素后注意事项',
      en: 'View Botox Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/botox-guide/',
  },
  fillerGuide: {
    label: {
      zh: '玻尿酸填充后注意事项',
      en: 'View Filler Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/filler-guide/',
  },
  fillerBotoxGuide: {
    label: {
      zh: '肉毒素、玻尿酸后注意事项',
      en: 'View Botox & Filler Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/filler-botox-guide/',
  },
  threadLiftingAfter: {
    label: {
      zh: '线雕提升后注意事项',
      en: 'View Thread Lifting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/thread-lifting-after/',
  },
  acneScarAfter: {
    label: {
      zh: '痘痘、痘坑治疗后注意事项',
      en: 'View Acne & Scar Treatment Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/acne-scar-after/',
  },
  scarCareGuide: {
    label: {
      zh: '疤痕护理说明',
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
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted.
      Also used as the <video> poster frame when `video` is set. */
  image?: string
  /** Optional looping video for the selector tile (public/ path) — plays muted/autoplay in place of the static image. */
  video?: string
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
  /** "效果参考" block — one or more method/technique diagrams (not real patient photos) shown in
      place of a real before/after case for tiles without partner-hospital case photos. Each item's
      `image` is added once that illustration is ready; the title/body can go live before that. */
  referenceIllustration?: {
    title: LocalizedText
    body: LocalizedText
    image?: string
    /** 영어 페이지용 그림(글자가 영어인 버전). 없으면 image를 그대로 쓴다. */
    imageEn?: string
  }[]
  /** Step-by-step how-to/aftercare guide: one wide image with N visual panels side by side, paired
      with N numbered captions rendered below in a matching grid (2x2 on mobile so text doesn't
      shrink too small). No text is overlaid on the image itself — captions live in HTML below it. */
  stepGuide?: {
    title: LocalizedText
    image: string
    imageAlt: LocalizedText
    steps: { title: LocalizedText; body: LocalizedText }[]
    footnote?: LocalizedText
  }
  /** Coded comparison table (not an image) — one card per row, stacked for mobile readability. */
  comparisonTable?: {
    title: LocalizedText
    subCopy?: LocalizedText
    rows: {
      type: LocalizedText
      product: LocalizedText
      accent: 'teal' | 'blue' | 'purple' | 'coral'
      ingredient: LocalizedText
      concerns: LocalizedText
      painScore: 1 | 2 | 3
      painLabel: LocalizedText
      recovery: LocalizedText
      /** Optional extra row — used when a product's effect timeline needs its own callout
          (e.g. collagen stimulators that build up gradually, unlike an instant filler). */
      effectNote?: LocalizedText
    }[]
  }
  /** "真实案例" block — an actual before/after patient photo (not an illustration), tied to the
      one tile it genuinely matches, instead of showing on every tile in the category. */
  realCase?: {
    photos: { src: string; alt: LocalizedText }[]
    credit?: LocalizedText
    planTitle: LocalizedText
    planTag: LocalizedText
    planNotes: LocalizedText[]
    planHighlight: LocalizedText
  }
  note?: LocalizedText
  /** 'warning' renders the note in the urgent/orange style instead of the neutral info style. */
  noteStyle?: 'info' | 'warning'
  docKeys: SkinAestheticsDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可以考虑的治疗',
  en: 'Possible Related Treatment Directions',
}

export const SKIN_AESTHETICS_SECTION = {
  title: {
    zh: '皮肤医美',
    en: 'Skin Aesthetics',
  } as LocalizedText,
  subCopy: {
    zh: '提升紧致 · 毛孔肤质 · 抗衰',
    en: 'Skin Lifting · Pores & Texture · Anti-Aging Appearance Care',
  } as LocalizedText,
  desc: {
    zh: '脸往下垂、下颌线不清楚、法令纹变深、轮廓松了、皮肤没弹性，我们会综合来看。不开刀或小创口的提升，可以按皮肤状态和部位，选择超声、射频这类仪器，或者打针、线雕等方式。',
    en: "A skin lifting consultation is a process of organizing concerns such as facial sagging, a blurred jawline, deepening nasolabial folds, loss of facial contour, and reduced skin elasticity. Depending on your skin condition and the treatment area, non-surgical lifting can draw on a range of approaches — energy-based treatments like ultrasound and radiofrequency, injectable treatments, and thread lifting.",
  } as LocalizedText,
  safety: [
    {
      zh: '这一页只是帮您在咨询前把情况理清楚，不能代替医生的诊断。',
      en: "This page is for organizing information before a skin aesthetics consultation in Korea, and does not replace a physician's diagnosis or treatment decision.",
    },
    {
      zh: '适不适合做、能不能几项一起做、恢复期怎么安排，都要由正规医院和医生来判断。',
      en: 'Whether a specific treatment is suitable, whether treatments can be combined, and how recovery should be scheduled must be determined by a licensed medical institution and a qualified physician.',
    },
  ] as LocalizedText[],
}

export const SKIN_AESTHETICS_PILLS_PROMPT: LocalizedText = {
  zh: '选一个您关心的方向，可以看到相关的治疗和仪器介绍。',
  en: 'Please select the topic you are most interested in — you can view related treatments and laser device details.',
}

export const SKIN_AESTHETICS_KEYWORDS: SkinAestheticsKeyword[] = [
  {
    id: 'skin-lifting',
    image: '/category-tiles/Petit/skin-lifting.jpg',
    title: {
      zh: '皮肤提升',
      en: 'Skin Lifting',
    },
    description: {
      zh: '脸松了、下颌线不清楚、法令纹变深、轮廓下垂、皮肤没弹性，都可以咨询。',
      en: 'Skin lifting consultation mainly addresses concerns such as facial sagging, an unclear jawline, deepening nasolabial folds, drooping facial contours, and reduced skin elasticity.',
    },
    directionsLabel: {
      zh: '不同提升方式适合哪里',
      en: 'Target Areas by Lifting Procedure',
    },
    directions: [
      { zh: '超声提拉 — 下颌线、下面部松弛、面部轮廓', en: 'Ultrasound lifting — jawline · under-chin · lower-face sagging · facial contour' },
      { zh: '射频紧致 — 脸颊松弛、皮肤弹性、细纹', en: 'Radiofrequency (RF) lifting — cheek sagging · lower-face elasticity · jawline · fine lines' },
      { zh: 'RF射频紧致 — 皮肤弹性、肤质、毛孔', en: 'Microneedle RF — skin elasticity · skin texture · pores · fine lines' },
      { zh: '水光针 / 注射类 — 细纹、弹性、皮肤状态', en: 'Skin boosters & collagen-stimulating injections — fine lines · skin texture · hydration · skin elasticity' },
      { zh: '线雕 — 脸颊松弛、下颌线、轮廓', en: 'Thread lifting — cheek sagging · midface sagging · jawline · facial contour' },
    ],
    popularDevices: {
      title: {
        zh: '最近大家常做的提升项目',
        en: 'Trending Lifting Treatments',
      },
      items: [
        {
          name: { zh: 'Ultherapy PRIME 超声刀', en: 'Ulthera PRIME' },
          desc: { zh: '下颌线 · 下半脸 · 下巴下方', en: 'Jawline · lower face · under-chin lifting' },
        },
        {
          name: { zh: 'Thermage FLX 热玛吉', en: 'Thermage FLX' },
          desc: { zh: '紧致 · 弹性 · 细纹 · 面部轮廓', en: 'Skin tightening · elasticity · fine lines · facial contour' },
        },
        {
          name: { zh: 'Titanium Lifting 钛提升', en: 'Titanium Lifting' },
          desc: { zh: '提拉 · 紧致 · 提亮 · 轮廓', en: 'Lifting · tightening · skin tone improvement · contour refinement' },
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
          desc: { zh: '射频紧致 · 弹性 · 轮廓', en: 'RF tightening · skin elasticity · facial contour' },
        },
      ],
      caution: {
        zh: '每家医院的仪器型号不一样，有哪些可以选，到医院咨询时再确认。',
        en: 'Available devices vary by clinic — please confirm which specific equipment is offered during your consultation.',
      },
    },
    referenceIllustration: [
      {
        title: { zh: '提升仪器参考', en: 'Skin Lifting Device Reference' },
        body: {
          zh: '提升仪器很多，每种作用的皮肤层次和适合的部位都不一样，用哪种由医生看过皮肤状态后决定。',
          en: 'Various energy-based devices are available for skin lifting, each targeting a different skin layer or area. The right choice should be evaluated and decided by a doctor based on skin condition.',
        },
        image: '/effect-illustration/skin-lifting.webp',
      },
    ],
    docKeys: ['skinTreatmentAfter', 'deviceLiftingAfter'],
  },
  {
    id: 'pores-texture',
    image: '/category-tiles/Petit/pores-texture.jpg',
    title: {
      zh: '毛孔 · 肤质',
      en: 'Pores & Skin Texture',
    },
    description: {
      zh: '毛孔粗、皮肤粗糙、细纹、没弹性、痘坑痘印……要先看皮肤厚薄、出油多少、疤痕的类型和深浅、有没有色素问题，再决定怎么治。',
      en: 'Concerns such as enlarged pores, rough skin texture, fine lines, reduced elasticity, and acne scars call for different treatment directions depending on skin thickness, sebum production, scar type and depth, and pigmentation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '射频微针', en: 'RF Microneedling' },
      { zh: '点阵激光', en: 'Fractional Laser' },
      { zh: '皮秒点阵', en: 'Picosecond Fractional' },
      { zh: 'CO₂ · Er:YAG 激光焕肤', en: 'CO₂ · Er:YAG Laser Resurfacing' },
      { zh: '水光针', en: 'Water-Glow Injections / Skin Booster' },
      { zh: '胶原再生治疗', en: 'Collagen Regeneration Treatment' },
      { zh: '舒缓修复', en: 'Soothing & Recovery Care' },
    ],
    popularDevices: {
      title: { zh: '激光和能量仪器', en: 'Related Laser & Energy-Based Devices' },
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
        zh: '毛孔和肤质一般不会只靠一种仪器，而是按皮肤状态和想改善的地方选择合适的仪器和方法，需要时几种一起做。',
        en: "Pore and skin-texture treatment usually isn't limited to a single device — the appropriate device and treatment method are chosen, or combined when needed, based on skin condition and treatment goals.",
      },
    },
    referenceIllustration: [
      {
        title: { zh: '毛孔 · 肤质仪器参考', en: 'Pores & Texture Device Reference' },
        body: {
          zh: '治毛孔和肤质的激光、能量仪器很多，作用深度和效果方向都不一样，用哪种由医生看过肤质和问题后决定。',
          en: 'A range of lasers and energy-based devices can address pore and texture concerns, each working at a different depth and improvement focus. The choice should be evaluated by a doctor based on skin type and concern.',
        },
        image: '/effect-illustration/pores-texture.webp',
      },
    ],
    docKeys: ['skinTreatmentAfter', 'skinBoosterAfter'],
  },
  {
    id: 'skin-boosters-rejuran',
    image: '/category-tiles/Petit/skin-boosters-rejuran.jpg',
    title: {
      zh: '水光针 · 皮肤再生',
      en: 'Skin Boosters & Rejuran',
    },
    description: {
      zh: '水光针（Skin Booster）是一类打进皮肤里的项目，用来改善皮肤缺水、肤质、弹性、细纹、光泽和整体状态。不同产品的成分和原理不一样，常见的有玻尿酸、PN/PDRN、氨基酸、肽、促胶原再生成分等。要按自己的皮肤状况和想改善的方向来选。',
      en: 'Water-glow injections, Rejuran, and skin booster treatments are commonly included in consultations for skin dryness, fine lines, skin texture, radiance, skin recovery capacity, and anti-aging appearance care. The specific ingredients, injection method, and recovery response can vary by hospital and product.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: 'PN/PDRN类皮肤修复', en: 'Water-glow injections' },
      { zh: '玻尿酸补水亮肤型水光', en: 'Rejuran' },
      { zh: '促胶原再生型水光', en: 'Skin boosters' },
      { zh: '氨基酸、肽类修复', en: 'PN/PDRN-based skin care' },
      { zh: '按皮肤状态调配的水光', en: 'Hyaluronic acid-based hydrating injections' },
      { zh: 'PRP/PRF自体血皮肤再生', en: 'Collagen regeneration skin care' },
      { zh: '配合激光、射频治疗的修复护理', en: 'Autologous blood-based skin regeneration care' },
    ],
    productGroupsLabel: {
      zh: '常见的水光和皮肤修复产品',
      en: '',
    },
    productGroups: [
      {
        label: { zh: 'REJURAN 丽珠兰系列（韩国）', en: 'REJURAN Series (Korea)' },
        items: [
          { zh: '黑盒 REJURAN Healer — 经典款，全脸紧致、改善细纹、补水', en: 'Black Box · REJURAN Healer — classic full-face formula for firming, wrinkle improvement, and hydration' },
          { zh: '红盒 REJURAN HB — 加了玻尿酸和利多卡因，没那么疼，适合干皮和刚开始有初老迹象的人', en: 'Red Box · REJURAN HB — 2-in-1 upgrade with added hyaluronic acid + lidocaine, less discomfort, suited to dry or early-aging skin' },
          { zh: '蓝盒 REJURAN S — 高浓度，专门针对痘印、痘坑这些凹陷', en: 'Blue Box · REJURAN S — higher-concentration intensive formula for acne marks and pitted scars' },
          { zh: '白盒 REJURAN I — 眼周专用，改善黑眼圈、眼袋、泪沟', en: 'White Box · REJURAN I — eye-area specific, for dark circles, under-eye bags, and tear troughs' },
        ],
      },
      {
        label: { zh: '其他常见产品', en: 'Other Representative Products' },
        items: [
          { zh: 'JUVELOOK 乔雅露 · PDLLA + HA（韩国）', en: 'JUVELOOK — PDLLA + HA (Korea)' },
          { zh: 'Re2O（韩国）', en: 'Re2O (Korea)' },
          { zh: '塑妍萃® SCULPTRA · PLLA促胶原型（看下面的对比表）', en: 'Sculptra® — PLLA collagen regeneration type (see comparison table below)' },
        ],
      },
    ],
    explainerTitle: {
      zh: '"水光针"到底是什么？',
      en: '',
    },
    explainerBody: {
      zh: '在韩国，大家说的"水光针"不是某一个产品，而是泛指让皮肤更水润、更有光泽的注射项目。\\n\\n基础成分大多是玻尿酸，也会按需要加入PN/PDRN、氨基酸、维生素等。每家医院、每位医生用的产品、配比、打的深度和方法都可能不一样，所以同样叫"水光针"，实际做的内容可能差很多。\\n\\n每种产品的成分和特点差别很大，一定要先弄清楚自己的皮肤状态、想改善什么、打哪个部位，再选合适的产品和方案。',
      en: '',
    },
    referenceIllustration: [
      {
        title: { zh: '常见的水光和皮肤修复产品', en: 'Representative Skin Booster & Regeneration Products' },
        body: {
          zh: '水光和皮肤修复类的注射产品很多，成分和原理各不相同，选哪款由医生根据皮肤状态和想改善的方向确认。',
          en: 'There are many types of skin booster and skin regeneration injectables, each with different ingredients and mechanisms. The specific product should be confirmed with a doctor based on skin condition and treatment goals.',
        },
        image: '/effect-illustration/skin-boosters-rejuran.webp',
      },
    ],
    comparisonTable: {
      title: { zh: '常见水光针对比', en: 'Common Skin Booster Type Comparison' },
      subCopy: {
        zh: '成分不同、效果不同，个人感受也不一样，具体选哪种要医生面诊后确认。',
        en: 'Different ingredients, different effects — individual experience varies, and the specific choice should be confirmed through an in-person doctor consultation.',
      },
      rows: [
        {
          type: { zh: '修复型', en: 'Regeneration Type' },
          product: { zh: '丽珠兰 REJURAN', en: 'Rejuran' },
          accent: 'teal',
          ingredient: { zh: 'PN（多聚核苷酸）', en: 'PN (Polynucleotide)' },
          concerns: { zh: '皮肤底层干、屏障受损、细纹、没弹性', en: 'Internal dryness, weakened barrier, fine lines, reduced elasticity' },
          painScore: 3,
          painLabel: { zh: '较高', en: 'Higher' },
          recovery: { zh: '2~3天', en: '2–3 days' },
        },
        {
          type: { zh: '胶原型', en: 'Collagen Type' },
          product: { zh: '乔雅露 JUVELOOK', en: 'Juvelook' },
          accent: 'blue',
          ingredient: { zh: 'PDLLA + 透明质酸', en: 'PDLLA + Hyaluronic Acid' },
          concerns: { zh: '毛孔粗、痘坑凹陷、皮肤粗糙、想要自然饱满', en: 'Enlarged pores, acne scars, rough texture, natural fullness' },
          painScore: 2,
          painLabel: { zh: '中等', en: 'Moderate' },
          recovery: { zh: '几乎没有（轻微）', en: 'Minimal to none' },
        },
        {
          type: { zh: '促胶原再生型', en: 'Collagen Regeneration Type' },
          product: { zh: '塑妍萃® SCULPTRA', en: 'Sculptra' },
          accent: 'purple',
          ingredient: { zh: 'PLLA（聚左旋乳酸）', en: 'PLLA (Poly-L-Lactic Acid)' },
          concerns: { zh: '面部容量流失、轮廓松弛、胶原减少', en: 'Facial volume loss, contour laxity, collagen loss' },
          painScore: 2,
          painLabel: { zh: '中等', en: 'Moderate' },
          recovery: { zh: '1～3天', en: '1–3 days' },
          effectNote: { zh: '胶原是慢慢长出来的，效果一般几周到几个月内逐渐出现', en: 'Collagen builds up gradually — results typically develop over weeks to months' },
        },
        {
          type: { zh: '补水型', en: 'Hydration Type' },
          product: { zh: '水光针', en: 'Water-Glow Injection' },
          accent: 'coral',
          ingredient: { zh: '玻尿酸＋复合维生素和矿物质', en: 'HA + vitamin & mineral complex' },
          concerns: { zh: '改善干燥暗沉，马上水润有光泽', en: 'Dryness, dullness, instant hydration & glow' },
          painScore: 1,
          painLabel: { zh: '较低', en: 'Lower' },
          recovery: { zh: '约1天', en: 'About 1 day' },
        },
      ],
    },
    docKeys: ['skinBoosterAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'botox-fillers',
    image: '/category-tiles/Petit/botox-fillers.jpg',
    video: '/category-tiles/Petit/botox-fillers.mp4',
    title: {
      zh: '肉毒素 · 玻尿酸',
      en: 'Botulinum Toxin & Fillers',
    },
    description: {
      zh: '肉毒素和玻尿酸是最常见的注射项目，可以改善表情纹、脸型轮廓、凹陷和容量流失，也可以做嘴唇和下颌线。按想改善的部位和想要的变化，选对产品和打法，效果才会好。',
      en: "Botulinum toxin and hyaluronic acid fillers are two of the most common injectable treatments, used across a wide range of areas — dynamic wrinkles, facial contour, volume loss, hollowing, lips, and the jawline. The right product and injection method are chosen based on the treatment area and the change you're hoping for.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [],
    directionGroups: [
      {
        label: { zh: '肉毒杆菌毒素', en: 'Botulinum Toxin' },
        items: [
          { zh: '额头、眉间、眼周的表情纹', en: "Forehead · glabella · crow's feet (expression wrinkles)" },
          { zh: '方下颌、下颌线', en: 'Masseter (jaw) · jawline' },
          { zh: '斜方肌', en: 'Trapezius' },
          { zh: '小腿', en: 'Calf' },
          { zh: '皮肤肉毒（微滴肉毒）', en: 'Skin Botox (micro-Botox)' },
          { zh: '多汗症肉毒', en: 'Hyperhidrosis (excessive sweating) Botox' },
        ],
      },
      {
        label: { zh: '玻尿酸填充剂', en: 'Fillers' },
        items: [
          { zh: '额头、太阳穴填充', en: 'Forehead · temple volume' },
          { zh: '眼下、苹果肌', en: 'Under-eye · midface (apple cheek)' },
          { zh: '法令纹', en: 'Nasolabial folds' },
          { zh: '唇部', en: 'Lips' },
          { zh: '下巴尖、下颌线', en: 'Chin tip · jawline' },
          { zh: '鼻子、脸部轮廓', en: 'Nose · facial contour' },
          { zh: '各部位补容量、改善不对称', en: 'Volume restoration & asymmetry correction by area' },
        ],
      },
    ],
    productGroups: [
      {
        label: { zh: '常见的肉毒素品牌', en: 'Leading Botulinum Toxin Brands' },
        items: [
          { zh: 'BOTOX® — 艾尔建美学 / 艾伯维（美国）【保妥适】', en: 'BOTOX® — Allergan Aesthetics / AbbVie (USA)' },
          { zh: 'XEOMIN® — 麦氏（德国）【吉适】', en: 'XEOMIN® — Merz (Germany)' },
          { zh: 'NABOTA® — 大熊制药（韩国）【娜柏塔】', en: 'NABOTA® — Daewoong Pharmaceutical (Korea)' },
          { zh: 'BOTULAX® / LETYBO® — 秀杰（韩国）【铂妥乐 / 乐提葆】', en: 'BOTULAX® / LETYBO® — Hugel (Korea)' },
          { zh: 'CORETOX® — 美得妥（韩国）【科妥】', en: 'CORETOX® — Medytox (Korea)' },
        ],
      },
      {
        label: { zh: '常见的玻尿酸品牌', en: 'Leading Hyaluronic Acid Filler Brands' },
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
      zh: '瘦脸针是什么？',
      en: '',
    },
    explainerBody: {
      zh: '把肉毒素打进比较发达的咬肌，让肌肉慢慢放松变小，下颌线就会变得更流畅自然。打的位置、剂量和医生的手法都会影响效果。\\n\\n在韩国，"轮廓针""雕刻针"也很常见，主要用来减少脸颊、双下巴这些地方的局部脂肪，让脸型更清楚立体。每家医院用的成分、配比和打法不一样，很多医院都有自己的配方。',
      en: '',
    },
    referenceIllustration: [
      {
        title: { zh: '肉毒素、玻尿酸常打的部位', en: 'Common Botox & Filler Injection Areas' },
        body: {
          zh: '肉毒素和玻尿酸可以打在不同部位，怎么改善、用什么产品，由医生看过您的脸部状况和想要的效果后决定。',
          en: 'Botulinum toxin and hyaluronic acid fillers can be applied to different facial areas. The treatment focus and product choice should be evaluated and decided by a doctor based on individual facial condition and desired outcome.',
        },
        image: '/effect-illustration/botox-fillers.webp',
      },
    ],
    docKeys: ['botoxGuide', 'fillerGuide', 'fillerBotoxGuide'],
  },
  {
    id: 'acne-scars',
    image: '/category-tiles/Petit/acne-scars.jpg',
    title: {
      zh: '色斑 · 痘印 · 泛红',
      en: 'Dark Spots · Acne · Scars · Redness',
    },
    description: {
      zh: '色斑、色沉、反复长痘、红色痘印、凹陷的痘坑，原因都不一样。要先看清楚色素有多深、出油多少、有没有发炎和血管问题、疤痕是什么形状和深度，再按皮肤状态选合适的治疗。',
      en: "Dark spots and pigmentation, recurring acne, red acne marks, and pitted scars each have different underlying causes. The pigment's depth, sebum production, inflammation and vascular response, and the scar's shape and depth are checked first, and a targeted treatment plan is chosen based on skin condition.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '控制痘痘炎症', en: 'Acne inflammation management' },
      { zh: '控油', en: 'Sebum management' },
      { zh: '改善痘坑', en: 'Treatments for improving pitted scars' },
      { zh: '射频微针', en: 'RF microneedling treatments' },
      { zh: '皮肤修复', en: 'Skin regeneration care' },
      { zh: '促胶原再生', en: 'Collagen regeneration treatments' },
      { zh: '需要时配合药物治疗', en: 'Combined with medication consultation when necessary' },
    ],
    directionGroups: [
      {
        label: { zh: '色斑 · 色沉 · 色素问题', en: 'Dark Spots · Pigmentation · Pigmented Lesions' },
        items: [
          { zh: '集中去除色斑、老年斑', en: 'Focused removal of dark spots & age spots' },
          { zh: '皮秒激光祛斑', en: 'Picosecond laser pigment treatment' },
          { zh: '淡斑提亮（激光Toning）', en: 'Pigment brightening (toning)' },
          { zh: '按表皮、真皮色素类型定制激光方案', en: 'Laser selection tailored to epidermal vs. dermal pigment type' },
        ],
      },
      {
        label: { zh: '痘痘 · 出油 · 炎症', en: 'Acne · Sebum · Inflammation' },
        items: [
          { zh: '针对皮脂腺的祛痘激光', en: 'Sebaceous-gland-targeted acne laser' },
          { zh: '针对炎症痘的能量治疗', en: 'Energy-based treatment for inflammatory acne' },
          { zh: '清痘和皮肤护理', en: 'Acne extraction & skin care' },
          { zh: '射频祛痘', en: 'RF-based acne treatment' },
          { zh: '需要时配合药物治疗', en: 'Combined with medication when necessary' },
        ],
      },
      {
        label: { zh: '泛红 · 红色痘印', en: 'Redness · Red Acne Marks' },
        items: [
          { zh: '血管激光', en: 'Vascular laser' },
          { zh: '痘痘留下的红印（PIE）治疗', en: 'Post-acne erythema (PIE) treatment' },
          { zh: '改善反复出现的红印', en: 'Improvement of recurring red marks' },
          { zh: '皮肤血管和泛红管理', en: 'Skin vascular & redness management' },
        ],
      },
      {
        label: { zh: '凹陷性痘坑', en: 'Pitted Acne Scars' },
        items: [
          { zh: '自体真皮再生', en: 'Autologous dermal regeneration' },
          { zh: '疤痕粘连松解（Subcision）', en: 'Subcision' },
          { zh: '射频微针', en: 'RF microneedling' },
          { zh: '点阵CO₂激光', en: 'Fractional CO2 laser' },
          { zh: '非剥脱点阵激光', en: 'Non-ablative fractional laser' },
          { zh: '皮秒点阵', en: 'Picosecond fractional' },
          { zh: '胶原再生治疗', en: 'Collagen regeneration treatment' },
        ],
      },
    ],
    productGroupsLabel: {
      zh: '激光、能量和再生仪器',
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
        label: { zh: '痘痘 · 皮脂腺', en: 'Acne · Sebaceous Glands' },
        items: [
          { zh: 'Accure Acne Laser', en: 'Accure Acne Laser' },
          { zh: 'AviClear', en: 'AviClear' },
          { zh: 'NEOBEAM 1450', en: 'NEOBEAM 1450' },
          { zh: 'Hollywood Spectra', en: 'Hollywood Spectra' },
        ],
      },
      {
        label: { zh: '泛红 · 红色痘印', en: 'Redness · Red Acne Marks' },
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
    referenceIllustration: [
      {
        title: { zh: 'REEPOT 祛斑原理', en: 'REEPOT Pigment Treatment — Reference Illustration' },
        body: {
          zh: '特定波长的激光作用在表皮到真皮层的色素颗粒上，把它打碎，再慢慢代谢出去，色斑和色沉就会变淡。用什么波长和参数，由医生根据色素深浅决定。',
          en: "Laser energy at a specific wavelength targets pigment particles from the epidermis down to the dermis, breaking them apart so they can be gradually cleared through the body's natural metabolism, improving dark spots and pigmentation. The wavelength and treatment parameters should be evaluated and decided by a doctor based on the pigment's depth.",
        },
        image: '/effect-illustration/acne-scars-repot-mechanism.webp',
      },
    ],
    stepGuide: {
      title: { zh: '治疗后的水胶体敷料护理', en: 'Hydrocolloid Dressing Care After Treatment' },
      image: '/effect-illustration/acne-scars-dressing-care.webp',
      imageAlt: { zh: '水胶体敷料护理四步', en: 'Four steps of hydrocolloid dressing care' },
      steps: [
        {
          title: { zh: '① 贴好敷料', en: '① Keep the dressing in place' },
          body: {
            zh: '治疗后，用水胶体敷料盖住治疗的地方。',
            en: 'Cover the treated area with a hydrocolloid dressing after treatment.',
          },
        },
        {
          title: { zh: '② 不要自行揭除', en: '② Do not remove it unnecessarily' },
          body: {
            zh: '大约3周内尽量一直贴着，不要自己撕。边缘翘起来了，也不要把原来的那张揭掉。',
            en: 'Keep the area covered for approximately 3 weeks. If the edges begin to lift, do not peel off the original dressing.',
          },
        },
        {
          title: { zh: '③ 翘起来就直接再贴一张', en: '③ Cover with a larger dressing' },
          body: {
            zh: '在原来那张上面，再贴一张更大的水胶体敷料，把原来的完全盖住、固定好。',
            en: 'Apply a larger hydrocolloid dressing directly over the existing one to keep the treated area fully covered and protected.',
          },
        },
        {
          title: { zh: '④ 揭掉以后的皮肤', en: '④ After removing the dressing' },
          body: {
            zh: '大约3周后按医生的指示揭掉。新长出来的皮肤可能暂时是淡粉色，之后会慢慢接近周围的肤色。',
            en: 'After approximately 3 weeks, remove the dressing as instructed by your doctor. The newly healed skin may initially appear slightly pink and will gradually blend with the surrounding skin tone.',
          },
        },
      ],
      footnote: {
        zh: '※ 具体贴多久、怎么换，请按医生的指示。',
        en: "※ Follow your doctor's instructions regarding dressing duration and replacement.",
      },
    },
    note: {
      zh: '想了解每种仪器的具体效果，可以点橙色的咨询按钮问我们。',
      en: 'For details on the efficacy of each laser device, please click the orange consultation button to ask.',
    },
    docKeys: ['acneScarAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'body-skin-care',
    image: '/category-tiles/Petit/body-skin-care.jpg',
    title: {
      zh: '身体紧致塑形',
      en: 'Body Firming & Contouring',
    },
    description: {
      zh: '肚子、手臂、大腿、腰侧这些地方的局部脂肪、皮肤松弛和橘皮纹，可以用不同的仪器做不开刀的身体塑形。',
      en: 'Addresses localized fat, skin laxity, and cellulite in areas such as the abdomen, arms, thighs, and flanks through non-surgical body contouring with a range of energy-based devices.',
    },
    directionsLabel: {
      zh: '常见的治疗方向',
      en: 'Common Treatment Directions',
    },
    directions: [],
    directionGroups: [
      {
        label: { zh: '局部脂肪 · 身体线条', en: 'Localized Fat · Body Line' },
        items: [
          { zh: '肚子 · 腰侧', en: 'Abdomen · flanks' },
          { zh: '手臂', en: 'Arms' },
          { zh: '大腿 · 臀部周围', en: 'Thighs · around the buttocks' },
        ],
      },
      {
        label: { zh: '皮肤松弛 · 紧致', en: 'Skin Laxity · Firming & Lifting' },
        items: [
          { zh: '改善皮肤松弛', en: 'Improve skin laxity' },
          { zh: '让身体线条更紧致', en: 'Enhance body contour firmness' },
          { zh: '改善脂肪堆积造成的不平整', en: 'Smooth uneven contours after fat reduction' },
        ],
      },
      {
        label: { zh: '橘皮纹', en: 'Cellulite' },
        items: [
          { zh: '改善大腿、臀部的橘皮纹', en: 'Improve the appearance of cellulite on the thighs, buttocks, and other areas' },
          { zh: '减脂和紧致一起做', en: 'Combined with fat management and skin-firming treatment' },
        ],
      },
    ],
    popularDevices: {
      title: { zh: '常用仪器', en: 'Commonly Used Devices' },
      items: [
        {
          name: { zh: 'ONDA PRO', en: 'ONDA PRO' },
          desc: { zh: '局部脂肪 · 橘皮纹 · 皮肤紧致', en: 'Localized fat · cellulite · skin firming' },
        },
        {
          name: { zh: 'INMODE BodyFX', en: 'INMODE BodyFX' },
          desc: { zh: '减脂 · 射频紧致 · 改善橘皮', en: 'Fat management · RF firming · cellulite improvement' },
        },
        {
          name: { zh: 'SHURINK UNIVERSE BODY', en: 'SHURINK UNIVERSE BODY' },
          desc: { zh: '深层紧致 · 改善松弛 · 身体线条', en: 'Deep firming · laxity improvement · body-line shaping' },
        },
      ],
      caution: {
        zh: '每家医院的仪器型号不一样，有哪些可以选，到医院咨询时再确认。',
        en: 'Available devices vary by clinic — please confirm which specific equipment is offered during your consultation.',
      },
    },
    referenceIllustration: [
      {
        title: { zh: '身体塑形常用仪器', en: 'Commonly Used Body Firming Devices' },
        body: {
          zh: '身体塑形的仪器很多，作用深度和效果方向都不一样，具体方案由医生看过身材和皮肤状态后决定。',
          en: 'Various body firming devices are available, each working at a different depth and focus. The specific plan should be evaluated and decided by a doctor based on body condition and skin state.',
        },
        image: '/effect-illustration/body-skin-care.webp',
      },
    ],
    docKeys: ['skinTreatmentAfter', 'scarCareGuide'],
  },
]
