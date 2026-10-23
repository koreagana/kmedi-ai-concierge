import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet, BigHealthApprovedProductsBlock } from './bigHealthKeywords'

export interface PlasticSurgeryDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: all /prep/* targets below were verified against the real page files under
// public/prep/ before adding — do not rename without checking the actual folder exists.
export const PLASTIC_SURGERY_DOC_BUTTONS = {
  photoGuide: {
    label: {
      zh: '整形咨询要怎么拍照',
      en: 'View Consultation Photo Guide',
    },
    kind: 'route',
    target: '/prep/plastic-photo-guide/',
  },
  surgeryBefore: {
    label: {
      zh: '整形手术前的通用注意事项',
      en: 'View General Pre-Surgery Guide',
    },
    kind: 'route',
    target: '/prep/plastic-surgery-before/',
  },
  medicationAllergyCheck: {
    label: {
      zh: '用药和过敏情况确认表',
      en: 'View Medication & Allergy Checklist',
    },
    kind: 'route',
    target: '/prep/medication-allergy-check/',
  },
  surgeryAfter: {
    label: {
      zh: '术后通用注意事项',
      en: 'View General Post-Surgery Guide',
    },
    kind: 'route',
    target: '/prep/surgery-after/',
  },
  anesthesiaAfterCare: {
    label: {
      zh: '全麻后回家注意事项',
      en: 'View Post-Anesthesia Discharge Guide',
    },
    kind: 'route',
    target: '/prep/anesthesia-after-care/',
  },
  sutureRemovalGuide: {
    label: {
      zh: '拆线和复诊说明',
      en: 'View Suture Removal & Follow-Up Guide',
    },
    kind: 'route',
    target: '/prep/suture-removal-guide/',
  },
  scarCareGuide: {
    label: {
      zh: '疤痕护理说明',
      en: 'View Scar Care Guide',
    },
    kind: 'route',
    target: '/prep/scar-care-guide/',
  },
  doubleEyelidAfter: {
    label: {
      zh: '双眼皮术后注意事项',
      en: 'View Double Eyelid Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/double-eyelid-after/',
  },
  epicanthoplastyAfter: {
    label: {
      zh: '开眼角术后注意事项',
      en: 'View Epicanthoplasty Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/epicanthoplasty-after/',
  },
  lowerEyelidFatAfter: {
    label: {
      zh: '眼袋脂肪重置术后注意事项',
      en: 'View Under-Eye Fat Repositioning Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/lower-eyelid-fat-after/',
  },
  rhinoplastyAfter: {
    label: {
      zh: '鼻整形术后注意事项',
      en: 'View Rhinoplasty Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/rhinoplasty-after/',
  },
  facialContouringAfter: {
    label: {
      zh: '面部轮廓术后注意事项',
      en: 'View Facial Contouring Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/facial-contouring-after/',
  },
  facelistAfter: {
    label: {
      zh: '拉皮提升术后注意事项',
      en: 'View Facelift Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/facelift-after/',
  },
  necklistAfter: {
    label: {
      zh: '颈部提升术后注意事项',
      en: 'View Neck Lift Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/necklift-after/',
  },
  liposuctionAfter: {
    label: {
      zh: '吸脂术后注意事项',
      en: 'View Liposuction Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/liposuction-after/',
  },
  fatGraftAfter: {
    label: {
      zh: '脂肪填充术后注意事项',
      en: 'View Fat Grafting Aftercare Guide',
    },
    kind: 'route',
    target: '/prep/fat-graft-after/',
  },
  breastSurgeryAfter: {
    label: {
      zh: '胸部整形术后注意事项',
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
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted.
      Also used as the <video> poster frame when `video` is set. */
  image?: string
  /** Optional looping video for the selector tile (public/ path) — plays muted/autoplay in place of the static image. */
  video?: string
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
  /** "真实案例" block — an actual before/after patient photo (not an illustration), tied to the
      one tile it genuinely matches, instead of showing on every tile in the category. */
  realCase?: {
    photos: { src: string; alt: LocalizedText }[]
    credit?: LocalizedText
  }
  note: LocalizedText
  docKeys: PlasticSurgeryDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可以咨询什么',
  en: 'Possible Consultation Areas',
}

export const PLASTIC_SURGERY_SECTION = {
  title: {
    zh: '整形医美',
    en: 'Plastic Surgery & Aesthetic Surgery',
  } as LocalizedText,
  subCopy: {
    zh: '眼鼻 · 脸型轮廓 · 恢复期',
    en: 'Eyes, Nose, Facial Contour · Facial Balance · Recovery Planning',
  } as LocalizedText,
  desc: {
    zh: '在韩国做整形，不是挑一个手术名字就行。要看您的脸部比例、以前做没做过手术、能接受多长的恢复期、预算，以及能在韩国待多久，再一起理清楚该咨询什么。',
    en: 'Korean plastic surgery consultation is not simply about choosing a procedure name. It is a process of organizing consultation directions based on facial balance, previous surgery history, recovery time, budget, and length of stay in Korea.',
  } as LocalizedText,
  safety: [
    {
      zh: '这一页只是帮您在咨询前把情况理清楚，不能代替医生的诊断。',
      en: "This page is for organizing information before a Korean plastic surgery consultation and does not replace a doctor's diagnosis or surgical judgment.",
    },
    {
      zh: '适不适合做手术、需不需要检查、用什么麻醉、恢复期多长、术后怎么护理，都要由正规医院和医生来判断。',
      en: 'Surgical suitability, required tests, anesthesia method, recovery period, and postoperative care must be determined by a licensed medical institution and qualified doctors.',
    },
  ] as LocalizedText[],
}

export const PLASTIC_SURGERY_KEYWORDS: PlasticSurgeryKeyword[] = [
  {
    id: 'eye-surgery',
    image: '/category-tiles/surgery/eye-surgery.jpg',
    video: '/category-tiles/surgery/eye-surgery.mp4',
    title: {
      zh: '眼部整形',
      en: 'Eye Surgery',
    },
    description: {
      zh: '双眼皮、提肌矫正、开眼角、眼袋脂肪重置、上睑下垂、眼部修复，都可以在这里咨询。眼睛的手术特别讲究细节，以前做过什么手术、眼睛的肌力、皮肤厚薄、有没有疤痕，最好咨询前先告诉我们。',
      en: 'Eye surgery consultation may include double eyelid surgery, ptosis correction, epicanthoplasty or lateral canthoplasty, under-eye fat repositioning, upper eyelid drooping, and revision eye surgery. Because small changes around the eyes can affect the overall impression, previous surgery history, eyelid muscle strength, skin thickness, and scar condition should be organized before consultation.',
    },
    directionsLabel: {
      zh: '可以咨询什么',
      en: 'Possible Consultation Areas',
    },
    directions: [
      { zh: '双眼皮手术', en: 'Double eyelid surgery' },
      { zh: '提肌矫正（眼睛无神、睁不大）', en: 'Ptosis or eyelid correction' },
      { zh: '开眼角', en: 'Epicanthoplasty or lateral canthoplasty' },
      { zh: '眼袋脂肪重置', en: 'Under-eye fat repositioning' },
      { zh: '上眼睑手术', en: 'Upper eyelid surgery' },
      { zh: '下眼睑手术', en: 'Lower eyelid surgery' },
      { zh: '眼部修复手术', en: 'Revision eye surgery' },
    ],
    referenceIllustration: [
      {
        title: { zh: '眼部手术有哪些', en: 'Types of Eye Surgery' },
        body: {
          zh: '眼部手术种类很多，每种针对的地方和改善的效果都不一样。适合哪一种，要由医生看过您的眼睛后决定。',
          en: 'There are many types of eye surgery, each targeting a different area and improvement goal. The suitable approach should be determined by a doctor through an in-person evaluation of eye condition.',
        },
        image: '/effect-illustration/eye-surgery.webp',
      },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['photoGuide', 'doubleEyelidAfter', 'epicanthoplastyAfter', 'lowerEyelidFatAfter'],
  },
  {
    id: 'nose-surgery',
    image: '/category-tiles/surgery/nose-surgery.jpg',
    title: {
      zh: '鼻部整形',
      en: 'Nose Surgery',
    },
    description: {
      zh: '鼻梁、鼻头、鼻翼、驼峰鼻、歪鼻、鼻修复，以及以前放过假体的问题，都可以咨询。鼻子既关系到外观，也关系到呼吸，所以以前做过什么手术、用过什么假体、有没有发过炎、呼吸是否顺畅，都要提前说清楚。',
      en: 'Nose surgery consultation may include the nasal bridge, nasal tip, nostril width, hump nose, deviated nose, revision rhinoplasty, and concerns related to previous implants. Nose surgery may involve both appearance and breathing function, so previous surgery history, implant history, inflammation history, and breathing discomfort should be shared in advance.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '鼻梁', en: 'Nasal bridge improvement' },
      { zh: '鼻头整形', en: 'Nasal tip surgery' },
      { zh: '鼻翼缩小', en: 'Nostril reduction' },
      { zh: '驼峰鼻咨询', en: 'Hump nose consultation' },
      { zh: '歪鼻咨询', en: 'Deviated nose consultation' },
      { zh: '鼻修复咨询', en: 'Revision rhinoplasty consultation' },
      { zh: '呼吸等功能性问题确认', en: 'Functional nasal issue assessment' },
    ],
    referenceIllustration: [
      {
        title: { zh: '鼻部手术有哪些', en: 'Types of Nose Surgery' },
        body: {
          zh: '鼻部手术种类很多，每种针对的地方和改善的效果都不一样。适合哪一种，要由医生看过您的鼻子后决定。',
          en: 'There are many types of nose surgery, each targeting a different area and improvement goal. The suitable approach should be determined by a doctor through an in-person evaluation of nasal condition.',
        },
        image: '/effect-illustration/nose-surgery.webp',
      },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['photoGuide', 'rhinoplastyAfter'],
  },
  {
    id: 'facelift-lifting',
    image: '/category-tiles/surgery/facelift-lifting.jpg',
    title: {
      zh: '面部提升',
      en: 'Facelift & Lifting',
    },
    description: {
      zh: '脸松了、下颌线不清楚、法令纹变深、中下脸下垂、脖子松弛，都可以咨询。这里说的是手术提升，和皮肤医美里不开刀的提升项目不一样。',
      en: 'Facelift consultation may include facial sagging, blurred jawline, deeper nasolabial folds, mid-to-lower face sagging, and neck laxity. This section focuses on surgical lifting consultation and is different from non-surgical device-based lifting in skin aesthetics.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '小切口提升', en: 'Mini facelift consultation' },
      { zh: '面部拉皮', en: 'Facelift consultation' },
      { zh: '颈部提升', en: 'Neck lift consultation' },
      { zh: '中下面部提升', en: 'Mid-to-lower face lifting consultation' },
      { zh: '术后恢复安排', en: 'Postoperative recovery planning' },
      { zh: '疤痕护理咨询', en: 'Scar care consultation' },
    ],
    referenceIllustration: [
      {
        title: { zh: '面部提升手术有哪些', en: 'Types of Facelift Surgery' },
        body: {
          zh: '面部提升手术种类很多，每种提升的位置和范围都不一样。适合哪一种，要由医生看过您脸部松弛的情况后决定。',
          en: 'There are many types of facelift surgery, each targeting a different area and lifting range. The suitable approach should be determined by a doctor through an in-person evaluation of facial sagging.',
        },
        image: '/effect-illustration/facelift-lifting.webp',
      },
    ],
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['facelistAfter', 'necklistAfter', 'scarCareGuide'],
  },
  {
    id: 'facial-contour-two-jaw',
    image: '/category-tiles/surgery/facial-contour-two-jaw.jpg',
    title: {
      zh: '面部轮廓 · 双颌',
      en: 'Facial Contour & Two-Jaw Surgery',
    },
    description: {
      zh: '颧骨、下颌角、下巴、脸不对称、脸长、脸宽、咬合不正或上下颌比例的问题，都可以咨询。这类手术难度高，一定要先问清楚麻醉、安全保障、术前检查、要不要住院，以及恢复期怎么安排。',
      en: 'Facial contouring and two-jaw surgery consultation may include cheekbone reduction, jaw angle surgery, chin surgery, facial asymmetry, long face, wide face, bite issues, and jaw-facial proportion concerns. These are highly complex surgeries, so anesthesia, safety systems, preoperative tests, hospitalization, and recovery management must be carefully reviewed.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '颧骨手术咨询', en: 'Cheekbone surgery consultation' },
      { zh: '下颌角手术咨询', en: 'Jaw angle surgery consultation' },
      { zh: '下巴手术咨询', en: 'Chin surgery consultation' },
      { zh: '面部不对称咨询', en: 'Facial asymmetry consultation' },
      { zh: '轮廓修复咨询', en: 'Facial contour revision consultation' },
      { zh: '双颌（正颌）手术咨询', en: 'Two-jaw surgery consultation' },
      { zh: '咬合和上下颌比例咨询', en: 'Bite and jaw-facial proportion consultation' },
    ],
    safetyChecklistLabel: {
      zh: '手术安全，要问清楚这几点',
      en: 'Safety System Points to Check',
    },
    safetyChecklist: [
      { zh: '有没有麻醉科专科医生参与', en: 'Whether an anesthesiology specialist is involved' },
      { zh: '术前有没有做抽血、影像检查和全身状况评估', en: 'Whether blood tests, imaging tests, and general health evaluation are performed before surgery' },
      { zh: '手术中有没有监护设备', en: 'Whether intraoperative monitoring systems are available' },
      { zh: '术后有没有恢复室和观察流程', en: 'Whether there is a recovery room and postoperative observation process' },
      { zh: '出血、呼吸不畅等意外情况有没有应对流程', en: 'Whether there is a response process for bleeding, breathing discomfort, or other abnormal situations' },
      { zh: '要不要住院、需不需要家属陪同', en: 'Whether hospitalization or a guardian is required' },
      { zh: '回国前要不要复诊', en: 'Whether a follow-up check before returning home is needed' },
    ],
    realCase: {
      photos: [
        { src: '/case-photos/contour-before-after-1.jpg', alt: { zh: '轮廓手术前后对比1', en: 'Facial contour surgery before/after 1' } },
        { src: '/case-photos/contour-before-after-2.jpg', alt: { zh: '轮廓手术前后对比2', en: 'Facial contour surgery before/after 2' } },
        { src: '/case-photos/contour-before-after-3.jpg', alt: { zh: '轮廓手术前后对比3', en: 'Facial contour surgery before/after 3' } },
      ],
      credit: {
        zh: '图片提供：双·轮·突口腔颌面外科（YangYoonDol Oral & Maxillofacial Surgery）',
        en: 'Photos provided by: YangYoonDol Oral & Maxillofacial Surgery',
      },
    },
    note: {
      zh: '',
      en: '',
    },
    docKeys: ['facialContouringAfter', 'surgeryBefore', 'anesthesiaAfterCare'],
  },
  {
    id: 'fat-grafting-liposuction',
    image: '/category-tiles/surgery/fat-grafting-liposuction.jpg',
    title: {
      zh: '吸脂 · 腹部整形',
      en: 'Liposuction & Abdominoplasty',
    },
    description: {
      zh: '吸脂主要针对肚子、手臂、大腿等局部脂肪；腹部整形则是针对肚皮松弛、妊娠纹和腹直肌分离，把多余的皮肤切掉、把腹部肌肉收紧，让腰腹线条更好看。抽出来的脂肪处理后，还可以填到臀部等地方。',
      en: 'Liposuction consultation mainly addresses localized fat in areas such as the abdomen, arms, and thighs, while abdominoplasty (tummy tuck) targets abdominal skin laxity, stretch marks, and muscle separation by removing excess skin and tightening the abdominal muscles. Fat removed through liposuction can also be processed and used for autologous fat grafting to areas such as the buttocks.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '腹部整形（腹壁成形）咨询', en: 'Abdominoplasty (tummy tuck) consultation' },
      { zh: '腹部吸脂', en: 'Abdominal liposuction' },
      { zh: '手臂吸脂', en: 'Arm liposuction' },
      { zh: '大腿吸脂', en: 'Thigh liposuction' },
      { zh: '臀部脂肪填充咨询', en: 'Buttock fat grafting consultation' },
      { zh: '身材线条管理咨询', en: 'Body contour consultation' },
    ],
    referenceIllustration: [
      {
        title: {
          zh: '腹部整形是怎么做的',
          en: 'Abdominoplasty (Tummy Tuck) Technique',
        },
        body: {
          zh: '腹部整形会切掉松弛的皮肤和长妊娠纹的部分，同时收紧腹部肌肉。有些方法用皮内缝合，不需要另外拆线。切口在哪里、怎么缝，要由医生看过腹部皮肤后决定。',
          en: 'Abdominoplasty removes loose, stretch-marked skin and tightens the abdominal muscles to improve the abdominal contour. Some techniques use a subcuticular (buried) suture that does not require stitch removal; the exact incision placement and suturing method should be determined by the doctor based on the condition of the abdominal skin.',
        },
        image: '/effect-illustration/fat-grafting-liposuction1.webp',
      },
      {
        title: {
          zh: '手臂吸脂',
          en: 'Arm Liposuction',
        },
        body: {
          zh: '手臂吸脂主要针对上臂内侧的脂肪，把多余的脂肪抽掉，让手臂线条更好看。术后一般要穿压力袖套帮助消肿定型。能抽多少、效果怎么样，要看个人的皮肤弹性和脂肪分布。',
          en: 'Arm liposuction targets fat buildup on the inner upper arm to refine its shape by removing excess fat. A compression sleeve is typically worn afterward to help reduce swelling and support the new contour; the treatment area and outcome vary by individual skin elasticity and fat distribution.',
        },
        image: '/effect-illustration/fat-grafting-liposuction2.webp',
      },
      {
        title: {
          zh: '大腿吸脂 · 臀部脂肪填充',
          en: 'Thigh Liposuction & Buttock Fat Grafting',
        },
        body: {
          zh: '大腿内外侧吸脂常和臀部填充一起做——把抽出来的自体脂肪处理后填到臀部，大腿变细的同时臀部更饱满。脂肪存活率因人而异，具体方案由医生评估决定。',
          en: "Inner and outer thigh liposuction is often combined with buttock fat grafting — fat removed from the thighs is processed and re-injected into the buttocks, refining the thigh line while adding buttock volume. Fat graft survival varies by individual, and the specific plan should be determined by the doctor's evaluation.",
        },
        image: '/effect-illustration/fat-grafting-liposuction3.webp',
      },
    ],
    note: {
      zh: '填进去的脂肪能存活多少因人而异。吸脂后还要穿塑身衣，也会有肿胀、淤青和皮肤发紧，需要好好护理。适不适合做、能做哪些部位，由医生判断。',
      en: 'Fat graft survival varies by individual, and liposuction may require compression garments, swelling care, bruise management, and skin tightness care. Suitability and possible treatment areas must be determined by doctors.',
    },
    docKeys: ['liposuctionAfter', 'fatGraftAfter'],
  },
  {
    id: 'breast-surgery',
    image: '/category-tiles/surgery/breast-surgery.jpg',
    title: {
      zh: '胸部整形',
      en: 'Breast Surgery',
    },
    description: {
      zh: '假体隆胸、自体脂肪隆胸、胸部下垂、两边不对称、更换假体、隆胸修复，都可以咨询。胸部整形要综合考虑身材、皮肤状况、恢复时间和以后的长期护理。',
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
        zh: '常用的三种假体',
        en: 'Top 3 Breast Implant Types',
      },
      items: [
        {
          name: { zh: 'Motiva Ergonomix（魔滴）', en: 'Motiva Ergonomix' },
          desc: {
            zh: '手感和动态比较自然。如果更想要上胸饱满，可能要考虑别的类型。',
            en: 'Natural feel and movement. If you want a fuller, more prominent upper pole, another type may suit you better.',
          },
        },
        {
          name: { zh: 'MENTOR BOOST', en: 'Mentor BOOST' },
          desc: {
            zh: '支撑力比较强，上胸的轮廓和饱满感更明显。如果特别喜欢软一点的手感，可能会觉得偏挺。',
            en: 'Strong shape retention with a fuller upper pole. If you prefer a very soft feel, it may seem somewhat firm.',
          },
        },
        {
          name: { zh: 'MENTOR MemoryGel Xtra', en: 'Mentor MemoryGel Xtra' },
          desc: {
            zh: '饱满度和形状维持比较平衡，适合想要胸型更饱满、轮廓更明显的人。',
            en: 'A good balance of volume and shape retention. Better suited to those who want more defined volume rather than a very soft, natural flow.',
          },
        },
      ],
      caution: {
        zh: '选哪种假体，要看身材、皮肤厚薄和您想要的胸型，具体由医生咨询后确定。',
        en: 'Implant choice depends on body type, skin thickness, and the volume and shape you want — the right option should be confirmed through a doctor consultation.',
      },
    },
    explainerTitle: {
      zh: '乳头缩小咨询',
      en: 'Nipple Reduction Consultation',
    },
    explainerBody: {
      zh: '乳头太大、太长或者太突出的时候，可以调整大小和形状，让它和整个胸型更协调。',
      en: 'For nipples that are enlarged, elongated, or noticeably protruding, this procedure adjusts nipple size and shape for a look that is more in proportion with the overall breast line.',
    },
    referenceIllustration: [
      {
        title: {
          zh: '隆胸常见的切口位置',
          en: 'Common Incision Approaches for Breast Implant Surgery',
        },
        body: {
          zh: '假体可以从乳房下皱襞、腋下或乳晕周围放进去。不同切口的疤痕位置、手术方式和恢复情况都不一样，选哪种要看胸部条件、假体类型和医生的评估。',
          en: 'Breast implants can be placed through an incision in the inframammary fold, the armpit, or around the areola. Each approach differs in scar location, surgical technique, and recovery, and the specific method should be decided based on breast condition, implant type, and the doctor\'s evaluation.',
        },
        image: '/effect-illustration/breast-surgery.webp',
      },
    ],
    note: {
      zh: '胸部整形要问清楚：用什么假体、切口在哪、怎么麻醉、恢复期多长、要不要穿塑形内衣或戴胸带、需不需要按摩和长期复查。具体方案由医生判断。',
      en: 'Breast surgery requires confirmation of implant type, incision site, anesthesia method, recovery period, compression bra or breast band use, massage, and long-term follow-up needs. The specific plan must be determined by the doctor.',
    },
    docKeys: ['breastSurgeryAfter', 'surgeryBefore'],
  },
  {
    id: 'hair-transplant',
    image: '/category-tiles/surgery/hair-transplant.jpg',
    title: {
      zh: '毛发移植',
      en: 'Hair Transplant',
    },
    description: {
      zh: '植发可以选切开式或非切开式，也可以做发际线调整、额头缩小、种眉毛、补鬓角。用哪种方式，要看脱发范围、后脑勺毛囊够不够、需要多少毛囊，以及恢复时间。',
      en: 'Hair transplant consultation may include strip (FUT) transplant, non-incision (FUE) transplant, hairline design, forehead reduction, eyebrow transplant, and temple/sideburn filling. The method depends on the extent of hair loss, donor follicle reserve at the back of the head, the number of grafts needed, and recovery time.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '切开式植发（FUT）', en: 'Strip hair transplant (FUT)' },
      { zh: '非切开植发（FUE）', en: 'Non-incision hair transplant (FUE)' },
      { zh: '不剃发 · 长发植发', en: 'No-shave / long-hair transplant' },
      { zh: '发际线调整', en: 'Hairline design' },
      { zh: '额头缩小术', en: 'Forehead reduction' },
      { zh: '眉毛移植', en: 'Eyebrow transplant' },
      { zh: '鬓角 · 侧面加密', en: 'Temple / sideburn filling' },
    ],
    // 영어판 그림이 오면 imageEn: '/effect-illustration/hair-transplant-en.webp' 추가(그 전엔 영어 페이지도 중국어 그림)
    referenceIllustration: [
      {
        title: { zh: '植发有哪些方式', en: 'Types of Hair Transplant' },
        image: '/effect-illustration/hair-transplant.webp',
        body: {
          zh: '植发方式很多，疤痕、要不要剃头、恢复期都不一样。适合哪一种，要由医生看过您的脱发范围和毛囊情况后决定。',
          en: 'There are several hair transplant methods, differing in scarring, whether shaving is needed, and recovery. The suitable approach should be determined by a doctor through an in-person evaluation of hair loss and follicle condition.',
        },
      },
    ],
    note: {
      zh: '需要多少毛囊、用什么方式、要不要剃头，都要医生面诊后才能确定。',
      en: 'The number of grafts, method, and whether shaving is needed are determined by the doctor after an in-person consultation.',
    },
    docKeys: ['surgeryBefore', 'surgeryAfter'],
  },
]
