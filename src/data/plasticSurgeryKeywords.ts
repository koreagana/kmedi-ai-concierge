import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet, BigHealthApprovedProductsBlock } from './bigHealthKeywords'

export interface PlasticSurgeryDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: all /prep/* targets below were verified against the real page files under
// public/prep/ before adding — do not rename without checking the actual folder exists.
// "麻醉前确认问诊表 / 마취 전 확인 문진표" is still status: 'draft' in prepDocuments.ts
// (no real page yet), so it is intentionally left out of every item's docKeys below.
export const PLASTIC_SURGERY_DOC_BUTTONS = {
  photoGuide: {
    label: {
      zh: '查看整形咨询照片拍摄指南',
      en: 'View Consultation Photo Guide',
    },
    kind: 'route',
    target: '/prep/plastic-photo-guide/',
  },
  surgeryBefore: {
    label: {
      zh: '查看整形手术前通用注意事项',
      en: 'View General Pre-Surgery Guide',
    },
    kind: 'route',
    target: '/prep/plastic-surgery-before/',
  },
  medicationAllergyCheck: {
    label: {
      zh: '查看用药与过敏确认表',
      en: 'View Medication & Allergy Checklist',
    },
    kind: 'route',
    target: '/prep/medication-allergy-check/',
  },
  surgeryAfter: {
    label: {
      zh: '查看术后通用注意事项',
      en: 'View General Post-Surgery Guide',
    },
    kind: 'route',
    target: '/prep/surgery-after/',
  },
  anesthesiaAfterCare: {
    label: {
      zh: '查看麻醉后回家注意事项',
      en: 'View Post-Anesthesia Discharge Guide',
    },
    kind: 'route',
    target: '/prep/anesthesia-after-care/',
  },
  sutureRemovalGuide: {
    label: {
      zh: '查看拆线与复诊说明',
      en: 'View Suture Removal & Follow-Up Guide',
    },
    kind: 'route',
    target: '/prep/suture-removal-guide/',
  },
  scarCareGuide: {
    label: {
      zh: '查看疤痕管理说明',
      en: 'View Scar Care Guide',
    },
    kind: 'route',
    target: '/prep/scar-care-guide/',
  },
  doubleEyelidAfter: {
    label: {
      zh: '查看双眼皮术后注意事项',
      en: 'View Double Eyelid Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/double-eyelid-after/',
  },
  epicanthoplastyAfter: {
    label: {
      zh: '查看开眼角术后注意事项',
      en: 'View Epicanthoplasty Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/epicanthoplasty-after/',
  },
  lowerEyelidFatAfter: {
    label: {
      zh: '查看眼袋脂肪重置术后注意事项',
      en: 'View Under-Eye Fat Repositioning Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/lower-eyelid-fat-after/',
  },
  rhinoplastyAfter: {
    label: {
      zh: '查看鼻整形术后注意事项',
      en: 'View Rhinoplasty Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/rhinoplasty-after/',
  },
  facialContouringAfter: {
    label: {
      zh: '查看面部轮廓术后注意事项',
      en: 'View Facial Contouring Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/facial-contouring-after/',
  },
  facelistAfter: {
    label: {
      zh: '查看拉皮提升术后注意事项',
      en: 'View Facelift Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/facelift-after/',
  },
  necklistAfter: {
    label: {
      zh: '查看颈部提升术后注意事项',
      en: 'View Neck Lift Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/necklift-after/',
  },
  liposuctionAfter: {
    label: {
      zh: '查看吸脂术后注意事项',
      en: 'View Liposuction Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/liposuction-after/',
  },
  fatGraftAfter: {
    label: {
      zh: '查看脂肪填充术后注意事项',
      en: 'View Fat Grafting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/fat-graft-after/',
  },
  breastSurgeryAfter: {
    label: {
      zh: '查看胸部整形术后注意事项',
      en: 'View Breast Surgery Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/breast-surgery-after/',
  },
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      en: 'Open WeCom Consultation',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, PlasticSurgeryDocButton>

export type PlasticSurgeryDocButtonKey = keyof typeof PLASTIC_SURGERY_DOC_BUTTONS

export interface PlasticSurgeryKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  /** Only used by facial-contour/two-jaw — a checklist of what to confirm, not a claim of guaranteed safety. */
  safetyChecklistLabel?: LocalizedText
  safetyChecklist?: BigHealthBullet[]
  /** Optional "trending devices/implants" block, rendered with the pink chip-card accent (mirrors SkinAestheticsKeyword). */
  popularDevices?: BigHealthApprovedProductsBlock
  /** Optional supplementary explainer shown after popularDevices — a short title + paragraph. */
  explainerTitle?: LocalizedText
  explainerBody?: LocalizedText
  note: LocalizedText
  docKeys: PlasticSurgeryDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能相关咨询方向',
  en: 'Possible Consultation Areas',
}

export const PLASTIC_SURGERY_SECTION = {
  title: {
    zh: '整形医美',
    en: 'Plastic Surgery & Aesthetic Surgery',
  } as LocalizedText,
  subCopy: {
    zh: '眼鼻轮廓 · 面部比例 · 恢复计划',
    en: 'Eyes, Nose, Facial Contour · Facial Balance · Recovery Planning',
  } as LocalizedText,
  desc: {
    zh: '韩国整形咨询不是简单选择一个手术名称，而是根据面部比例、既往手术经历、恢复时间、预算和来韩停留时间，整理适合咨询的方向。',
    en: 'Korean plastic surgery consultation is not simply about choosing a procedure name. It is a process of organizing consultation directions based on facial balance, previous surgery history, recovery time, budget, and length of stay in Korea.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国整形咨询前的信息整理，不代替医生诊断或手术判断。',
      en: "This page is for organizing information before a Korean plastic surgery consultation and does not replace a doctor's diagnosis or surgical judgment.",
    },
    {
      zh: '具体是否适合手术、是否需要检查、麻醉方式、恢复期和术后管理，需要由正规医疗机构和专业医生判断。',
      en: 'Surgical suitability, required tests, anesthesia method, recovery period, and postoperative care must be determined by a licensed medical institution and qualified doctors.',
    },
  ] as LocalizedText[],
}

export const PLASTIC_SURGERY_KEYWORDS: PlasticSurgeryKeyword[] = [
  {
    id: 'eye-surgery',
    image: '/keyword-tiles/eye-surgery.jpg',
    title: {
      zh: '眼部整形',
      en: 'Eye Surgery',
    },
    description: {
      zh: '眼部整形咨询主要针对双眼皮、眼部矫正、开眼角、眼袋脂肪重置、上眼睑下垂和眼部修复手术等需求。眼部手术对细节要求高，既往手术经历、眼部肌肉力量、皮肤厚度和疤痕状态都需要在咨询前整理。',
      en: 'Eye surgery consultation may include double eyelid surgery, ptosis correction, epicanthoplasty or lateral canthoplasty, under-eye fat repositioning, upper eyelid drooping, and revision eye surgery. Because small changes around the eyes can affect the overall impression, previous surgery history, eyelid muscle strength, skin thickness, and scar condition should be organized before consultation.',
    },
    directionsLabel: {
      zh: '可能相关咨询方向',
      en: 'Possible Consultation Areas',
    },
    directions: [
      { zh: '双眼皮手术', en: 'Double eyelid surgery' },
      { zh: '眼部矫正', en: 'Ptosis or eyelid correction' },
      { zh: '开眼角', en: 'Epicanthoplasty or lateral canthoplasty' },
      { zh: '眼袋脂肪重置', en: 'Under-eye fat repositioning' },
      { zh: '上眼睑手术', en: 'Upper eyelid surgery' },
      { zh: '下眼睑手术', en: 'Lower eyelid surgery' },
      { zh: '眼部修复手术', en: 'Revision eye surgery' },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['photoGuide', 'doubleEyelidAfter', 'epicanthoplastyAfter', 'lowerEyelidFatAfter'],
  },
  {
    id: 'nose-surgery',
    image: '/keyword-tiles/nose-surgery.jpg',
    title: {
      zh: '鼻部整形',
      en: 'Nose Surgery',
    },
    description: {
      zh: '鼻部整形咨询主要针对鼻梁、鼻尖、鼻翼、鹰钩鼻、歪鼻、鼻修复和既往假体相关问题。鼻部整形可能同时涉及外观和呼吸功能，因此既往手术经历、假体使用情况、炎症经历和呼吸不适都需要提前告知。',
      en: 'Nose surgery consultation may include the nasal bridge, nasal tip, nostril width, hump nose, deviated nose, revision rhinoplasty, and concerns related to previous implants. Nose surgery may involve both appearance and breathing function, so previous surgery history, implant history, inflammation history, and breathing discomfort should be shared in advance.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '鼻梁改善', en: 'Nasal bridge improvement' },
      { zh: '鼻尖整形', en: 'Nasal tip surgery' },
      { zh: '鼻翼缩小', en: 'Nostril reduction' },
      { zh: '鹰钩鼻咨询', en: 'Hump nose consultation' },
      { zh: '歪鼻咨询', en: 'Deviated nose consultation' },
      { zh: '鼻修复手术咨询', en: 'Revision rhinoplasty consultation' },
      { zh: '功能性鼻部问题确认', en: 'Functional nasal issue assessment' },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['photoGuide', 'rhinoplastyAfter'],
  },
  {
    id: 'facelift-lifting',
    image: '/keyword-tiles/facelift-lifting.jpg',
    title: {
      zh: '面部提升',
      en: 'Facelift & Lifting',
    },
    description: {
      zh: '面部提升咨询主要针对面部松弛、下颌线模糊、法令纹加深、中下面部下垂、颈部松弛等问题。这里主要指手术类提升咨询，与皮肤医美中的非手术提升项目不同。',
      en: 'Facelift consultation may include facial sagging, blurred jawline, deeper nasolabial folds, mid-to-lower face sagging, and neck laxity. This section focuses on surgical lifting consultation and is different from non-surgical device-based lifting in skin aesthetics.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '小切口提升咨询', en: 'Mini facelift consultation' },
      { zh: '面部拉皮咨询', en: 'Facelift consultation' },
      { zh: '颈部提升咨询', en: 'Neck lift consultation' },
      { zh: '中下面部提升咨询', en: 'Mid-to-lower face lifting consultation' },
      { zh: '术后恢复计划', en: 'Postoperative recovery planning' },
      { zh: '疤痕管理咨询', en: 'Scar care consultation' },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['facelistAfter', 'necklistAfter', 'scarCareGuide'],
  },
  {
    id: 'facial-contour-two-jaw',
    image: '/keyword-tiles/facial-contour-two-jaw.jpg',
    title: {
      zh: '面部轮廓·双颚',
      en: 'Facial Contour & Two-Jaw Surgery',
    },
    description: {
      zh: '面部轮廓和双颚咨询主要针对颧骨、下颌角、下巴、面部不对称、长脸、宽脸、咬合或颌面比例相关问题。此类手术属于高复杂度手术，必须重点确认麻醉、安全系统、术前检查、住院或恢复管理安排。',
      en: 'Facial contouring and two-jaw surgery consultation may include cheekbone reduction, jaw angle surgery, chin surgery, facial asymmetry, long face, wide face, bite issues, and jaw-facial proportion concerns. These are highly complex surgeries, so anesthesia, safety systems, preoperative tests, hospitalization, and recovery management must be carefully reviewed.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '颧骨手术咨询', en: 'Cheekbone surgery consultation' },
      { zh: '下颌角手术咨询', en: 'Jaw angle surgery consultation' },
      { zh: '下巴手术咨询', en: 'Chin surgery consultation' },
      { zh: '面部不对称咨询', en: 'Facial asymmetry consultation' },
      { zh: '轮廓修复咨询', en: 'Facial contour revision consultation' },
      { zh: '双颚手术咨询', en: 'Two-jaw surgery consultation' },
      { zh: '咬合与颌面比例相关咨询', en: 'Bite and jaw-facial proportion consultation' },
    ],
    safetyChecklistLabel: {
      zh: '安全系统确认重点',
      en: 'Safety System Points to Check',
    },
    safetyChecklist: [
      { zh: '是否有麻醉科专业医生参与', en: 'Whether an anesthesiology specialist is involved' },
      { zh: '是否进行术前血液检查、影像检查和全身状态评估', en: 'Whether blood tests, imaging tests, and general health evaluation are performed before surgery' },
      { zh: '是否具备手术中监测系统', en: 'Whether intraoperative monitoring systems are available' },
      { zh: '是否有术后恢复室和观察流程', en: 'Whether there is a recovery room and postoperative observation process' },
      { zh: '是否有出血、呼吸不适等异常情况的应对流程', en: 'Whether there is a response process for bleeding, breathing discomfort, or other abnormal situations' },
      { zh: '是否需要住院或保护人陪同', en: 'Whether hospitalization or a guardian is required' },
      { zh: '回国前是否需要复诊确认', en: 'Whether a follow-up check before returning home is needed' },
    ],
    note: {
      zh: '',
      en: '',
    },
    // TODO: once the admin prep-documents page publishes "麻醉前确认问诊表 / 마취 전 확인 문진표"
    // (currently status: 'draft' at /prep/anesthesia-check in prepDocuments.ts), add its key here.
    docKeys: ['facialContouringAfter', 'surgeryBefore', 'anesthesiaAfterCare'],
  },
  {
    id: 'fat-grafting-liposuction',
    image: '/keyword-tiles/fat-grafting-liposuction.jpg',
    title: {
      zh: '脂肪移植·吸脂',
      en: 'Fat Grafting & Liposuction',
    },
    description: {
      zh: '脂肪移植和吸脂咨询主要针对面部凹陷、额头或太阳穴容量不足、法令纹周围凹陷，以及腹部、手臂、大腿等身体部位的脂肪管理需求。脂肪移植和吸脂的恢复方式不同，需要分别咨询。',
      en: 'Fat grafting and liposuction consultation may include facial volume loss, forehead or temple volume deficiency, nasolabial area volume concerns, and fat management for the abdomen, arms, or thighs. Fat grafting and liposuction have different recovery processes and should be discussed separately.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '面部脂肪填充', en: 'Facial fat grafting' },
      { zh: '额头和太阳穴填充', en: 'Forehead and temple fat grafting' },
      { zh: '法令纹周围容量咨询', en: 'Volume consultation around nasolabial folds' },
      { zh: '腹部吸脂', en: 'Abdominal liposuction' },
      { zh: '手臂吸脂', en: 'Arm liposuction' },
      { zh: '大腿吸脂', en: 'Thigh liposuction' },
      { zh: '身体线条管理咨询', en: 'Body contour consultation' },
    ],
    note: {
      zh: '脂肪移植的生着率存在个人差异，吸脂后也需要压迫服、肿胀、淤青和皮肤紧绷感管理。是否适合、可以做哪些部位，需要医生判断。',
      en: 'Fat graft survival varies by individual, and liposuction may require compression garments, swelling care, bruise management, and skin tightness care. Suitability and possible treatment areas must be determined by doctors.',
    },
    docKeys: ['liposuctionAfter', 'fatGraftAfter'],
  },
  {
    id: 'breast-surgery',
    image: '/keyword-tiles/breast-surgery.jpg',
    title: {
      zh: '胸部整形',
      en: 'Breast Surgery',
    },
    description: {
      zh: '胸部整形咨询主要包括假体隆胸、自体脂肪隆胸、胸部下垂、胸部不对称、假体更换和隆胸修复等方向。胸部整形需要考虑体型、皮肤状态、恢复时间和长期管理。',
      en: 'Breast surgery consultation may include breast augmentation with implants, autologous fat transfer, breast sagging, breast asymmetry, implant replacement, and revision breast surgery. Breast surgery should consider body shape, skin condition, recovery time, and long-term management.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '假体隆胸咨询', en: 'Implant breast augmentation consultation' },
      { zh: '自体脂肪隆胸咨询', en: 'Fat transfer breast augmentation consultation' },
      { zh: '胸部下垂咨询', en: 'Breast sagging consultation' },
      { zh: '胸部不对称咨询', en: 'Breast asymmetry consultation' },
      { zh: '假体更换咨询', en: 'Implant replacement consultation' },
      { zh: '隆胸修复咨询', en: 'Revision breast surgery consultation' },
      { zh: '乳头缩小咨询', en: 'Nipple reduction consultation' },
    ],
    popularDevices: {
      title: {
        zh: '代表性假体 3 种',
        en: 'Top 3 Breast Implant Types',
      },
      items: [
        {
          name: { zh: 'Motiva Ergonomix（魔滴）', en: 'Motiva Ergonomix' },
          desc: {
            zh: '触感和动态效果比较自然。如果更强调上胸饱满度，可能需要考虑其他类型。',
            en: 'Natural feel and movement. If you want a fuller, more prominent upper pole, another type may suit you better.',
          },
        },
        {
          name: { zh: 'MENTOR BOOST', en: 'Mentor BOOST' },
          desc: {
            zh: '支撑力较强，上胸轮廓和饱满感更明显。如果更偏好非常柔软的触感，可能会觉得相对偏挺。',
            en: 'Strong shape retention with a fuller upper pole. If you prefer a very soft feel, it may seem somewhat firm.',
          },
        },
        {
          name: { zh: 'MENTOR MemoryGel Xtra', en: 'Mentor MemoryGel Xtra' },
          desc: {
            zh: '在饱满度和形态维持之间比较均衡。更适合希望胸型更饱满、轮廓更明显的人群。',
            en: 'A good balance of volume and shape retention. Better suited to those who want more defined volume rather than a very soft, natural flow.',
          },
        },
      ],
      caution: {
        zh: '假体选择需根据体型、皮肤厚度及期望的胸型和轮廓而定，具体是否适合需通过医生咨询确定。',
        en: 'Implant choice depends on body type, skin thickness, and the volume and shape you want — the right option should be confirmed through a doctor consultation.',
      },
    },
    explainerTitle: {
      zh: '乳头缩小咨询',
      en: 'Nipple Reduction Consultation',
    },
    explainerBody: {
      zh: '针对乳头过大、过长或突出明显的情况，调整乳头的大小和形态，使其与整体胸型更加协调。',
      en: 'For nipples that are enlarged, elongated, or noticeably protruding, this procedure adjusts nipple size and shape for a look that is more in proportion with the overall breast line.',
    },
    note: {
      zh: '胸部整形需要确认假体种类、切口位置、麻醉方式、恢复期、内衣或胸带使用、按摩或长期追踪管理是否需要。具体方案需由医生判断。',
      en: 'Breast surgery requires confirmation of implant type, incision site, anesthesia method, recovery period, compression bra or breast band use, massage, and long-term follow-up needs. The specific plan must be determined by the doctor.',
    },
    docKeys: ['breastSurgeryAfter', 'surgeryBefore'],
  },
]
