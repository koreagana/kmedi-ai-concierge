import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet } from './bigHealthKeywords'

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
      ko: '성형 상담 사진 촬영 가이드 보기',
      en: 'View Consultation Photo Guide',
      ar: 'عرض دليل تصوير الاستشارة',
    },
    kind: 'route',
    target: '/prep/plastic-photo-guide/',
  },
  surgeryBefore: {
    label: {
      zh: '查看整形手术前通用注意事项',
      ko: '성형수술 전 공통 주의사항 보기',
      en: 'View General Pre-Surgery Guide',
      ar: 'عرض الإرشادات العامة قبل الجراحة',
    },
    kind: 'route',
    target: '/prep/plastic-surgery-before/',
  },
  medicationAllergyCheck: {
    label: {
      zh: '查看用药与过敏确认表',
      ko: '복용약·알레르기 확인표 보기',
      en: 'View Medication & Allergy Checklist',
      ar: 'عرض قائمة الأدوية والحساسية',
    },
    kind: 'route',
    target: '/prep/medication-allergy-check/',
  },
  surgeryAfter: {
    label: {
      zh: '查看术后通用注意事项',
      ko: '수술 후 공통 주의사항 보기',
      en: 'View General Post-Surgery Guide',
      ar: 'عرض الإرشادات العامة بعد الجراحة',
    },
    kind: 'route',
    target: '/prep/surgery-after/',
  },
  anesthesiaAfterCare: {
    label: {
      zh: '查看麻醉后回家注意事项',
      ko: '마취 후 귀가 주의사항 보기',
      en: 'View Post-Anesthesia Discharge Guide',
      ar: 'عرض إرشادات المغادرة بعد التخدير',
    },
    kind: 'route',
    target: '/prep/anesthesia-after-care/',
  },
  sutureRemovalGuide: {
    label: {
      zh: '查看拆线与复诊说明',
      ko: '실밥 제거·재내원 안내 보기',
      en: 'View Suture Removal & Follow-Up Guide',
      ar: 'عرض دليل إزالة الغرز والمتابعة',
    },
    kind: 'route',
    target: '/prep/suture-removal-guide/',
  },
  scarCareGuide: {
    label: {
      zh: '查看疤痕管理说明',
      ko: '흉터관리 안내 보기',
      en: 'View Scar Care Guide',
      ar: 'عرض دليل العناية بالندبات',
    },
    kind: 'route',
    target: '/prep/scar-care-guide/',
  },
  doubleEyelidAfter: {
    label: {
      zh: '查看双眼皮术后注意事项',
      ko: '쌍꺼풀 수술 후 주의사항 보기',
      en: 'View Double Eyelid Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد جراحة الجفن المزدوج',
    },
    kind: 'route',
    target: '/prep/double-eyelid-after/',
  },
  epicanthoplastyAfter: {
    label: {
      zh: '查看开眼角术后注意事项',
      ko: '트임수술 후 주의사항 보기',
      en: 'View Epicanthoplasty Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد جراحة توسيع زاوية العين',
    },
    kind: 'route',
    target: '/prep/epicanthoplasty-after/',
  },
  lowerEyelidFatAfter: {
    label: {
      zh: '查看眼袋脂肪重置术后注意事项',
      ko: '눈밑지방재배치 후 주의사항 보기',
      en: 'View Under-Eye Fat Repositioning Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد إعادة توزيع دهون تحت العين',
    },
    kind: 'route',
    target: '/prep/lower-eyelid-fat-after/',
  },
  rhinoplastyAfter: {
    label: {
      zh: '查看鼻整形术后注意事项',
      ko: '코성형 후 주의사항 보기',
      en: 'View Rhinoplasty Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد تجميل الأنف',
    },
    kind: 'route',
    target: '/prep/rhinoplasty-after/',
  },
  facialContouringAfter: {
    label: {
      zh: '查看面部轮廓术后注意事项',
      ko: '안면윤곽 후 주의사항 보기',
      en: 'View Facial Contouring Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد تحديد الوجه',
    },
    kind: 'route',
    target: '/prep/facial-contouring-after/',
  },
  facelistAfter: {
    label: {
      zh: '查看拉皮提升术后注意事项',
      ko: '거상수술 후 주의사항 보기',
      en: 'View Facelift Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد شد الوجه',
    },
    kind: 'route',
    target: '/prep/facelift-after/',
  },
  necklistAfter: {
    label: {
      zh: '查看颈部提升术后注意事项',
      ko: '목거상 후 주의사항 보기',
      en: 'View Neck Lift Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد شد الرقبة',
    },
    kind: 'route',
    target: '/prep/necklift-after/',
  },
  liposuctionAfter: {
    label: {
      zh: '查看吸脂术后注意事项',
      ko: '지방흡입 후 주의사항 보기',
      en: 'View Liposuction Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد شفط الدهون',
    },
    kind: 'route',
    target: '/prep/liposuction-after/',
  },
  fatGraftAfter: {
    label: {
      zh: '查看脂肪填充术后注意事项',
      ko: '지방이식 후 주의사항 보기',
      en: 'View Fat Grafting Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد حقن الدهون',
    },
    kind: 'route',
    target: '/prep/fat-graft-after/',
  },
  breastSurgeryAfter: {
    label: {
      zh: '查看胸部整形术后注意事项',
      ko: '가슴성형 후 주의사항 보기',
      en: 'View Breast Surgery Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد تجميل الثدي',
    },
    kind: 'route',
    target: '/prep/breast-surgery-after/',
  },
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      ko: '기업위챗 상담하기',
      en: 'Open WeCom Consultation',
      ar: 'فتح استشارة ويكوم',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, PlasticSurgeryDocButton>

export type PlasticSurgeryDocButtonKey = keyof typeof PLASTIC_SURGERY_DOC_BUTTONS

export interface PlasticSurgeryKeyword {
  id: string
  title: LocalizedText
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  /** Only used by facial-contour/two-jaw — a checklist of what to confirm, not a claim of guaranteed safety. */
  safetyChecklistLabel?: LocalizedText
  safetyChecklist?: BigHealthBullet[]
  note: LocalizedText
  docKeys: PlasticSurgeryDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能相关咨询方向',
  ko: '관련 상담 방향',
  en: 'Possible Consultation Areas',
  ar: 'مجالات الاستشارة المحتملة',
}

export const PLASTIC_SURGERY_SECTION = {
  title: {
    zh: '整形医美',
    ko: '성형미용',
    en: 'Plastic Surgery & Aesthetic Surgery',
    ar: 'جراحة التجميل',
  } as LocalizedText,
  subCopy: {
    zh: '眼鼻轮廓 · 面部比例 · 恢复计划',
    ko: '눈·코·윤곽 · 얼굴 비율 · 회복 계획',
    en: 'Eyes, Nose, Facial Contour · Facial Balance · Recovery Planning',
    ar: 'العيون والأنف وتناسق الوجه · خطة التعافي',
  } as LocalizedText,
  desc: {
    zh: '韩国整形咨询不是简单选择一个手术名称，而是根据面部比例、既往手术经历、恢复时间、预算和来韩停留时间，整理适合咨询的方向。',
    ko: '한국 성형상담은 단순히 수술명을 고르는 것이 아니라, 얼굴 비율, 기존 수술 이력, 회복 기간, 예산, 한국 체류 기간을 기준으로 상담 가능한 방향을 정리하는 과정입니다.',
    en: 'Korean plastic surgery consultation is not simply about choosing a procedure name. It is a process of organizing consultation directions based on facial balance, previous surgery history, recovery time, budget, and length of stay in Korea.',
    ar: 'استشارة جراحة التجميل في كوريا لا تعني مجرد اختيار اسم العملية، بل هي عملية تنظيم اتجاه الاستشارة بناءً على تناسق الوجه، وتاريخ العمليات السابقة، وفترة التعافي، والميزانية، ومدة الإقامة في كوريا.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国整形咨询前的信息整理，不代替医生诊断或手术判断。',
      ko: '본 페이지는 한국 성형상담 전 정보 정리를 위한 참고 안내이며 의사의 진단이나 수술 판단을 대신하지 않습니다.',
      en: "This page is for organizing information before a Korean plastic surgery consultation and does not replace a doctor's diagnosis or surgical judgment.",
      ar: 'هذه الصفحة مخصصة لتنظيم المعلومات قبل استشارة جراحة التجميل في كوريا، ولا تحل محل تشخيص الطبيب أو قراره الجراحي.',
    },
    {
      zh: '具体是否适合手术、是否需要检查、麻醉方式、恢复期和术后管理，需要由正规医疗机构和专业医生判断。',
      ko: '수술 적합 여부, 검사 필요 여부, 마취 방식, 회복 기간, 수술 후 관리는 정규 의료기관과 전문의가 판단해야 합니다.',
      en: 'Surgical suitability, required tests, anesthesia method, recovery period, and postoperative care must be determined by a licensed medical institution and qualified doctors.',
      ar: 'مدى مناسبة العملية، والفحوصات المطلوبة، وطريقة التخدير، وفترة التعافي، والرعاية بعد العملية يجب أن يحددها المستشفى والطبيب المختص.',
    },
  ] as LocalizedText[],
}

export const PLASTIC_SURGERY_KEYWORDS: PlasticSurgeryKeyword[] = [
  {
    id: 'eye-surgery',
    title: {
      zh: '眼部整形',
      ko: '눈성형',
      en: 'Eye Surgery',
      ar: 'تجميل العيون',
    },
    description: {
      zh: '眼部整形咨询主要针对双眼皮、眼部矫正、开眼角、眼袋脂肪重置、上眼睑下垂和眼部修复手术等需求。眼部手术对细节要求高，既往手术经历、眼部肌肉力量、皮肤厚度和疤痕状态都需要在咨询前整理。',
      ko: '눈성형 상담은 쌍꺼풀, 눈매교정, 트임수술, 눈밑지방재배치, 윗눈꺼풀 처짐, 눈 재수술 등의 고민을 정리하는 과정입니다. 눈성형은 작은 차이에도 인상이 크게 달라질 수 있어 기존 수술 이력, 눈뜨는 힘, 피부 두께, 흉터 상태를 상담 전에 정리하는 것이 중요합니다.',
      en: 'Eye surgery consultation may include double eyelid surgery, ptosis correction, epicanthoplasty or lateral canthoplasty, under-eye fat repositioning, upper eyelid drooping, and revision eye surgery. Because small changes around the eyes can affect the overall impression, previous surgery history, eyelid muscle strength, skin thickness, and scar condition should be organized before consultation.',
      ar: 'تشمل استشارة تجميل العيون عادةً عملية الجفن المزدوج، وتصحيح الجفن، وتوسيع زاوية العين، وإعادة توزيع دهون تحت العين، وترهل الجفن العلوي، وجراحات التصحيح السابقة. ونظرًا لأن التغييرات الصغيرة حول العين قد تؤثر على ملامح الوجه بالكامل، من المهم تنظيم تاريخ العمليات السابقة، وقوة عضلات الجفن، وسماكة الجلد، وحالة الندبات قبل الاستشارة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '双眼皮手术', ko: '쌍꺼풀 수술', en: 'Double eyelid surgery', ar: 'عملية الجفن المزدوج' },
      { zh: '眼部矫正', ko: '눈매교정', en: 'Ptosis or eyelid correction', ar: 'تصحيح الجفن' },
      { zh: '开眼角', ko: '트임수술', en: 'Epicanthoplasty or lateral canthoplasty', ar: 'توسيع زاوية العين' },
      { zh: '眼袋脂肪重置', ko: '눈밑지방재배치', en: 'Under-eye fat repositioning', ar: 'إعادة توزيع دهون تحت العين' },
      { zh: '上眼睑下垂咨询', ko: '윗눈꺼풀 처짐 상담', en: 'Upper eyelid drooping consultation', ar: 'استشارة ترهل الجفن العلوي' },
      { zh: '眼部修复手术咨询', ko: '눈 재수술 상담', en: 'Revision eye surgery consultation', ar: 'استشارة جراحة تصحيح العيون' },
    ],
    note: {
      zh: '眼部手术即使是小范围手术，也可能影响整体印象。是否适合手术、是否需要矫正功能问题，需要医生面诊后判断。',
      ko: '눈성형은 비교적 작은 범위의 수술이라도 전체 인상에 영향을 줄 수 있습니다. 수술 적합 여부와 기능적 교정 필요 여부는 의사 면담 후 판단해야 합니다.',
      en: "Even small eye procedures can affect facial impression. Surgical suitability and the need for functional correction must be determined after a doctor's consultation.",
      ar: 'حتى العمليات الصغيرة حول العين قد تؤثر على الانطباع العام للوجه. مدى مناسبة الجراحة والحاجة إلى تصحيح وظيفي يجب أن يحدده الطبيب بعد الفحص.',
    },
    docKeys: ['photoGuide', 'doubleEyelidAfter', 'epicanthoplastyAfter', 'lowerEyelidFatAfter'],
  },
  {
    id: 'nose-surgery',
    title: {
      zh: '鼻部整形',
      ko: '코성형',
      en: 'Nose Surgery',
      ar: 'تجميل الأنف',
    },
    description: {
      zh: '鼻部整形咨询主要针对鼻梁、鼻尖、鼻翼、鹰钩鼻、歪鼻、鼻修复和既往假体相关问题。鼻部整形可能同时涉及外观和呼吸功能，因此既往手术经历、假体使用情况、炎症经历和呼吸不适都需要提前告知。',
      ko: '코성형 상담은 콧대, 코끝, 콧볼, 매부리코, 휜코, 코 재수술, 기존 보형물 관련 문제 등을 정리하는 과정입니다. 코성형은 외형뿐 아니라 호흡 기능과도 관련될 수 있으므로 기존 수술 이력, 보형물 여부, 염증 경험, 호흡 불편 여부를 미리 알려야 합니다.',
      en: 'Nose surgery consultation may include the nasal bridge, nasal tip, nostril width, hump nose, deviated nose, revision rhinoplasty, and concerns related to previous implants. Nose surgery may involve both appearance and breathing function, so previous surgery history, implant history, inflammation history, and breathing discomfort should be shared in advance.',
      ar: 'قد تشمل استشارة تجميل الأنف جسر الأنف، وطرف الأنف، وتصغير فتحات الأنف، والأنف المحدب، وانحراف الأنف، وجراحة تصحيح الأنف، والمشكلات المتعلقة بالزرعات السابقة. وقد يرتبط تجميل الأنف بالمظهر والتنفس معًا، لذلك يجب إبلاغ المستشفى بتاريخ العمليات السابقة، ووجود زرعات، وتجارب الالتهاب، وأي صعوبة في التنفس.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '鼻梁改善', ko: '콧대 개선', en: 'Nasal bridge improvement', ar: 'تحسين جسر الأنف' },
      { zh: '鼻尖整形', ko: '코끝성형', en: 'Nasal tip surgery', ar: 'تجميل طرف الأنف' },
      { zh: '鼻翼缩小', ko: '콧볼축소', en: 'Nostril reduction', ar: 'تصغير فتحات الأنف' },
      { zh: '鹰钩鼻咨询', ko: '매부리코 상담', en: 'Hump nose consultation', ar: 'استشارة الأنف المحدب' },
      { zh: '歪鼻咨询', ko: '휜코 상담', en: 'Deviated nose consultation', ar: 'استشارة انحراف الأنف' },
      { zh: '鼻修复手术咨询', ko: '코 재수술 상담', en: 'Revision rhinoplasty consultation', ar: 'استشارة تصحيح الأنف' },
      { zh: '功能性鼻部问题确认', ko: '기능적 코 문제 확인', en: 'Functional nasal issue assessment', ar: 'تقييم المشكلات الوظيفية في الأنف' },
    ],
    note: {
      zh: '鼻部整形的手术方式、材料选择和恢复期会因个人鼻部结构和既往手术情况而不同。是否适合手术以及是否需要功能性评估，需要医院判断。',
      ko: '코성형의 수술 방법, 재료 선택, 회복 기간은 개인 코 구조와 기존 수술 이력에 따라 달라질 수 있습니다. 수술 적합 여부와 기능적 평가 필요 여부는 병원 판단이 필요합니다.',
      en: 'Surgical method, material choice, and recovery period vary depending on nasal structure and previous surgery history. Suitability and the need for functional assessment must be determined by the hospital.',
      ar: 'طريقة الجراحة، واختيار المواد، وفترة التعافي تختلف حسب بنية الأنف وتاريخ العمليات السابقة. مدى مناسبة العملية والحاجة إلى تقييم وظيفي يجب أن يحدده المستشفى.',
    },
    docKeys: ['photoGuide', 'rhinoplastyAfter'],
  },
  {
    id: 'facelift-lifting',
    title: {
      zh: '面部提升',
      ko: '거상·리프팅',
      en: 'Facelift & Lifting',
      ar: 'شد الوجه',
    },
    description: {
      zh: '面部提升咨询主要针对面部松弛、下颌线模糊、法令纹加深、中下面部下垂、颈部松弛等问题。这里主要指手术类提升咨询，与皮肤医美中的非手术提升项目不同。',
      ko: '거상·리프팅 상담은 얼굴 처짐, 턱선 흐림, 팔자주름 깊어짐, 중·하안면 처짐, 목 처짐 등의 고민을 정리하는 과정입니다. 여기서는 피부미용의 비수술 장비 리프팅과 구분되는 수술적 리프팅 상담을 중심으로 합니다.',
      en: 'Facelift consultation may include facial sagging, blurred jawline, deeper nasolabial folds, mid-to-lower face sagging, and neck laxity. This section focuses on surgical lifting consultation and is different from non-surgical device-based lifting in skin aesthetics.',
      ar: 'تشمل استشارة شد الوجه ترهل الوجه، وضعف خط الفك، وازدياد عمق خطوط الابتسامة، وترهل منتصف وأسفل الوجه، وترهل الرقبة. يركز هذا القسم على الاستشارة الخاصة بالشد الجراحي، وهو مختلف عن أجهزة الشد غير الجراحية في قسم الجلدية التجميلية.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '小切口提升咨询', ko: '미니거상 상담', en: 'Mini facelift consultation', ar: 'استشارة شد الوجه المصغر' },
      { zh: '面部拉皮咨询', ko: '안면거상 상담', en: 'Facelift consultation', ar: 'استشارة شد الوجه' },
      { zh: '颈部提升咨询', ko: '목거상 상담', en: 'Neck lift consultation', ar: 'استشارة شد الرقبة' },
      { zh: '中下面部提升咨询', ko: '중·하안면 리프팅 상담', en: 'Mid-to-lower face lifting consultation', ar: 'استشارة شد منتصف وأسفل الوجه' },
      { zh: '术后恢复计划', ko: '수술 후 회복 계획', en: 'Postoperative recovery planning', ar: 'خطة التعافي بعد العملية' },
      { zh: '疤痕管理咨询', ko: '흉터관리 상담', en: 'Scar care consultation', ar: 'استشارة العناية بالندبات' },
    ],
    note: {
      zh: '面部提升手术需要根据松弛程度、皮肤状态、切口范围、麻醉方式和恢复时间来判断。是否需要手术、适合哪种提升方式，需要医生面诊后决定。',
      ko: '거상수술은 처짐 정도, 피부 상태, 절개 범위, 마취 방식, 회복 기간을 기준으로 판단해야 합니다. 수술 필요 여부와 적합한 리프팅 방식은 의사 면담 후 결정해야 합니다.',
      en: 'Facelift surgery must be considered based on the degree of sagging, skin condition, incision range, anesthesia method, and recovery time. Whether surgery is needed and which lifting method is suitable must be determined after a doctor\'s consultation.',
      ar: 'يجب تقييم جراحة شد الوجه بناءً على درجة الترهل، وحالة الجلد، ونطاق الشق، وطريقة التخدير، وفترة التعافي. الحاجة إلى الجراحة والطريقة المناسبة يجب أن يحددها الطبيب بعد الفحص.',
    },
    docKeys: ['facelistAfter', 'necklistAfter', 'scarCareGuide'],
  },
  {
    id: 'facial-contour-two-jaw',
    title: {
      zh: '面部轮廓·双颚',
      ko: '안면윤곽·양악',
      en: 'Facial Contour & Two-Jaw Surgery',
      ar: 'تحديد الوجه وجراحة الفكين',
    },
    description: {
      zh: '面部轮廓和双颚咨询主要针对颧骨、下颌角、下巴、面部不对称、长脸、宽脸、咬合或颌面比例相关问题。此类手术属于高复杂度手术，必须重点确认麻醉、安全系统、术前检查、住院或恢复管理安排。',
      ko: '안면윤곽과 양악 상담은 광대, 사각턱, 턱끝, 얼굴 비대칭, 긴 얼굴, 넓은 얼굴, 교합 또는 악안면 비율 관련 고민을 정리하는 과정입니다. 이 수술군은 고난도 수술에 해당하므로 마취, 안전시스템, 수술 전 검사, 입원 또는 회복관리 계획을 반드시 중요하게 확인해야 합니다.',
      en: 'Facial contouring and two-jaw surgery consultation may include cheekbone reduction, jaw angle surgery, chin surgery, facial asymmetry, long face, wide face, bite issues, and jaw-facial proportion concerns. These are highly complex surgeries, so anesthesia, safety systems, preoperative tests, hospitalization, and recovery management must be carefully reviewed.',
      ar: 'تشمل استشارة تحديد الوجه وجراحة الفكين عظام الوجنتين، وزاوية الفك، والذقن، وعدم تناسق الوجه، والوجه الطويل أو العريض، ومشكلات الإطباق أو تناسب عظام الوجه والفك. وتُعد هذه العمليات عالية التعقيد، لذلك يجب التحقق بعناية من التخدير، ونظام السلامة، والفحوصات قبل العملية، والحاجة إلى الإقامة أو خطة التعافي.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '颧骨手术咨询', ko: '광대수술 상담', en: 'Cheekbone surgery consultation', ar: 'استشارة جراحة عظام الوجنتين' },
      { zh: '下颌角手术咨询', ko: '사각턱수술 상담', en: 'Jaw angle surgery consultation', ar: 'استشارة جراحة زاوية الفك' },
      { zh: '下巴手术咨询', ko: '턱끝수술 상담', en: 'Chin surgery consultation', ar: 'استشارة جراحة الذقن' },
      { zh: '面部不对称咨询', ko: '얼굴 비대칭 상담', en: 'Facial asymmetry consultation', ar: 'استشارة عدم تناسق الوجه' },
      { zh: '轮廓修复咨询', ko: '윤곽 재수술 상담', en: 'Facial contour revision consultation', ar: 'استشارة تصحيح تحديد الوجه' },
      { zh: '双颚手术咨询', ko: '양악수술 상담', en: 'Two-jaw surgery consultation', ar: 'استشارة جراحة الفكين' },
      { zh: '咬合与颌面比例相关咨询', ko: '교합 및 악안면 비율 관련 상담', en: 'Bite and jaw-facial proportion consultation', ar: 'استشارة الإطباق وتناسب عظام الوجه والفك' },
    ],
    safetyChecklistLabel: {
      zh: '安全系统确认重点',
      ko: '안전시스템 확인 포인트',
      en: 'Safety System Points to Check',
      ar: 'نقاط نظام السلامة الواجب التحقق منها',
    },
    safetyChecklist: [
      { zh: '是否有麻醉科专业医生参与', ko: '마취통증의학과 전문의 참여 여부', en: 'Whether an anesthesiology specialist is involved', ar: 'مشاركة طبيب متخصص في التخدير' },
      { zh: '是否进行术前血液检查、影像检查和全身状态评估', ko: '수술 전 혈액검사, 영상검사, 전신 상태 평가 여부', en: 'Whether blood tests, imaging tests, and general health evaluation are performed before surgery', ar: 'إجراء فحوصات الدم والتصوير وتقييم الحالة العامة قبل العملية' },
      { zh: '是否具备手术中监测系统', ko: '수술 중 모니터링 시스템 여부', en: 'Whether intraoperative monitoring systems are available', ar: 'وجود نظام مراقبة أثناء العملية' },
      { zh: '是否有术后恢复室和观察流程', ko: '수술 후 회복실 및 관찰 프로세스 여부', en: 'Whether there is a recovery room and postoperative observation process', ar: 'وجود غرفة إفاقة وعملية متابعة بعد العملية' },
      { zh: '是否有出血、呼吸不适等异常情况的应对流程', ko: '출혈, 호흡 불편 등 이상 상황 대응 프로세스 여부', en: 'Whether there is a response process for bleeding, breathing discomfort, or other abnormal situations', ar: 'وجود خطة للتعامل مع النزيف أو صعوبة التنفس أو أي أعراض غير طبيعية' },
      { zh: '是否需要住院或保护人陪同', ko: '입원 또는 보호자 동행 필요 여부', en: 'Whether hospitalization or a guardian is required', ar: 'الحاجة إلى الإقامة في المستشفى أو وجود مرافق' },
      { zh: '回国前是否需要复诊确认', ko: '귀국 전 재내원 확인 필요 여부', en: 'Whether a follow-up check before returning home is needed', ar: 'الحاجة إلى مراجعة قبل العودة إلى البلد' },
    ],
    note: {
      zh: '面部轮廓和双颚手术不是简单的外观改善项目。是否适合手术、是否需要牙科或颌面评估、麻醉方式和恢复计划，都需要正规医疗机构和专业医生判断。',
      ko: '안면윤곽과 양악수술은 단순한 외모 개선 시술이 아닙니다. 수술 적합 여부, 치과 또는 악안면 평가 필요 여부, 마취 방식, 회복 계획은 정규 의료기관과 전문의가 판단해야 합니다.',
      en: 'Facial contouring and two-jaw surgery are not simple appearance-enhancing procedures. Suitability, the need for dental or maxillofacial evaluation, anesthesia method, and recovery planning must be determined by licensed medical institutions and qualified doctors.',
      ar: 'تحديد الوجه وجراحة الفكين ليستا إجراءات بسيطة لتحسين المظهر فقط. مدى مناسبة العملية، والحاجة إلى تقييم الأسنان أو عظام الفك، وطريقة التخدير، وخطة التعافي يجب أن يحددها مستشفى مرخص وأطباء مختصون.',
    },
    // TODO: once the admin prep-documents page publishes "麻醉前确认问诊表 / 마취 전 확인 문진표"
    // (currently status: 'draft' at /prep/anesthesia-check in prepDocuments.ts), add its key here.
    docKeys: ['facialContouringAfter', 'surgeryBefore', 'anesthesiaAfterCare'],
  },
  {
    id: 'fat-grafting-liposuction',
    title: {
      zh: '脂肪移植·吸脂',
      ko: '지방이식·지방흡입',
      en: 'Fat Grafting & Liposuction',
      ar: 'حقن الدهون وشفط الدهون',
    },
    description: {
      zh: '脂肪移植和吸脂咨询主要针对面部凹陷、额头或太阳穴容量不足、法令纹周围凹陷，以及腹部、手臂、大腿等身体部位的脂肪管理需求。脂肪移植和吸脂的恢复方式不同，需要分别咨询。',
      ko: '지방이식과 지방흡입 상담은 얼굴 꺼짐, 이마나 관자 부위 볼륨 부족, 팔자 주변 꺼짐, 복부·팔뚝·허벅지 등 바디 지방관리 고민을 정리하는 과정입니다. 지방이식과 지방흡입은 회복 방식이 다르므로 각각 구분해 상담해야 합니다.',
      en: 'Fat grafting and liposuction consultation may include facial volume loss, forehead or temple volume deficiency, nasolabial area volume concerns, and fat management for the abdomen, arms, or thighs. Fat grafting and liposuction have different recovery processes and should be discussed separately.',
      ar: 'تشمل استشارة حقن الدهون وشفط الدهون نقص حجم الوجه، ونقص الحجم في الجبهة أو الصدغين، والمنطقة حول خطوط الابتسامة، وإدارة الدهون في البطن أو الذراعين أو الفخذين. تختلف عملية التعافي بين حقن الدهون وشفط الدهون، لذلك يجب مناقشتهما بشكل منفصل.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '面部脂肪填充', ko: '얼굴 지방이식', en: 'Facial fat grafting', ar: 'حقن الدهون في الوجه' },
      { zh: '额头和太阳穴填充', ko: '이마·관자 지방이식', en: 'Forehead and temple fat grafting', ar: 'حقن الدهون في الجبهة والصدغين' },
      { zh: '法令纹周围容量咨询', ko: '팔자 주변 볼륨 상담', en: 'Volume consultation around nasolabial folds', ar: 'استشارة الحجم حول خطوط الابتسامة' },
      { zh: '腹部吸脂', ko: '복부 지방흡입', en: 'Abdominal liposuction', ar: 'شفط دهون البطن' },
      { zh: '手臂吸脂', ko: '팔 지방흡입', en: 'Arm liposuction', ar: 'شفط دهون الذراعين' },
      { zh: '大腿吸脂', ko: '허벅지 지방흡입', en: 'Thigh liposuction', ar: 'شفط دهون الفخذين' },
      { zh: '身体线条管理咨询', ko: '바디라인 관리 상담', en: 'Body contour consultation', ar: 'استشارة تنسيق الجسم' },
    ],
    note: {
      zh: '脂肪移植的生着率存在个人差异，吸脂后也需要压迫服、肿胀、淤青和皮肤紧绷感管理。是否适合、可以做哪些部位，需要医生判断。',
      ko: '지방이식은 생착률에 개인차가 있고, 지방흡입 후에는 압박복, 붓기, 멍, 피부 당김감 관리가 필요할 수 있습니다. 적합 여부와 가능 부위는 의료진 판단이 필요합니다.',
      en: 'Fat graft survival varies by individual, and liposuction may require compression garments, swelling care, bruise management, and skin tightness care. Suitability and possible treatment areas must be determined by doctors.',
      ar: 'معدل بقاء الدهون يختلف من شخص لآخر، وبعد شفط الدهون قد تكون هناك حاجة إلى ملابس ضاغطة وإدارة التورم والكدمات وشد الجلد. مدى المناسبة والمناطق الممكنة يجب أن يحددها الطبيب.',
    },
    docKeys: ['liposuctionAfter', 'fatGraftAfter'],
  },
  {
    id: 'breast-surgery',
    title: {
      zh: '胸部整形',
      ko: '가슴성형',
      en: 'Breast Surgery',
      ar: 'تجميل الثدي',
    },
    description: {
      zh: '胸部整形咨询主要包括假体隆胸、自体脂肪隆胸、胸部下垂、胸部不对称、假体更换和隆胸修复等方向。胸部整形需要考虑体型、皮肤状态、恢复时间和长期管理。',
      ko: '가슴성형 상담은 보형물 가슴성형, 자가 지방이식 가슴성형, 가슴 처짐, 가슴 비대칭, 보형물 교체, 가슴 재수술 등의 방향을 포함합니다. 가슴성형은 체형, 피부 상태, 회복 기간, 장기 관리까지 함께 고려해야 합니다.',
      en: 'Breast surgery consultation may include breast augmentation with implants, autologous fat transfer, breast sagging, breast asymmetry, implant replacement, and revision breast surgery. Breast surgery should consider body shape, skin condition, recovery time, and long-term management.',
      ar: 'تشمل استشارة تجميل الثدي تكبير الثدي بالزرعات، أو بحقن الدهون الذاتية، وترهل الثدي، وعدم التناسق، وتغيير الزرعات، وجراحة التصحيح. ويجب النظر إلى شكل الجسم، وحالة الجلد، وفترة التعافي، والمتابعة طويلة المدى.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '假体隆胸咨询', ko: '보형물 가슴성형 상담', en: 'Implant breast augmentation consultation', ar: 'استشارة تكبير الثدي بالزرعات' },
      { zh: '自体脂肪隆胸咨询', ko: '자가 지방이식 가슴성형 상담', en: 'Fat transfer breast augmentation consultation', ar: 'استشارة تكبير الثدي بحقن الدهون الذاتية' },
      { zh: '胸部下垂咨询', ko: '가슴 처짐 상담', en: 'Breast sagging consultation', ar: 'استشارة ترهل الثدي' },
      { zh: '胸部不对称咨询', ko: '가슴 비대칭 상담', en: 'Breast asymmetry consultation', ar: 'استشارة عدم تناسق الثدي' },
      { zh: '假体更换咨询', ko: '보형물 교체 상담', en: 'Implant replacement consultation', ar: 'استشارة تغيير الزرعات' },
      { zh: '隆胸修复咨询', ko: '가슴 재수술 상담', en: 'Revision breast surgery consultation', ar: 'استشارة تصحيح جراحة الثدي' },
    ],
    note: {
      zh: '胸部整形需要确认假体种类、切口位置、麻醉方式、恢复期、内衣或胸带使用、按摩或长期追踪管理是否需要。具体方案需由医生判断。',
      ko: '가슴성형은 보형물 종류, 절개 위치, 마취 방식, 회복 기간, 보정브라 또는 흉대 사용, 마사지나 장기 추적 관리 필요 여부를 확인해야 합니다. 구체적인 수술 계획은 의사가 판단해야 합니다.',
      en: 'Breast surgery requires confirmation of implant type, incision site, anesthesia method, recovery period, compression bra or breast band use, massage, and long-term follow-up needs. The specific plan must be determined by the doctor.',
      ar: 'تجميل الثدي يتطلب التأكد من نوع الزرعة، ومكان الشق، وطريقة التخدير، وفترة التعافي، واستخدام حمالة أو رباط ضاغط، والحاجة إلى التدليك أو المتابعة طويلة المدى. الخطة المحددة يجب أن يقررها الطبيب.',
    },
    docKeys: ['breastSurgeryAfter', 'surgeryBefore'],
  },
  {
    id: 'recovery-care',
    title: {
      zh: '术后恢复管理',
      ko: '수술 후 회복관리',
      en: 'Recovery Care',
      ar: 'رعاية التعافي بعد العملية',
    },
    description: {
      zh: '术后恢复管理是韩国医疗旅游中非常重要的一部分。客户需要了解复诊、拆线、药物服用、冰敷或热敷、饮食、洗脸或洗澡时间、异常症状和回国前确认事项。',
      ko: '수술 후 회복관리는 한국 의료관광에서 매우 중요한 부분입니다. 고객은 재내원, 실밥 제거, 약 복용, 냉찜질 또는 온찜질, 식사, 세안 또는 샤워 가능 시점, 이상 증상, 귀국 전 확인사항을 이해해야 합니다.',
      en: 'Postoperative recovery care is an important part of Korean medical tourism. Patients need to understand follow-up visits, stitch removal, medication, cold or warm compresses, diet, washing or shower timing, warning symptoms, and pre-departure checks.',
      ar: 'تُعد رعاية التعافي بعد العملية جزءًا مهمًا من السياحة الطبية في كوريا. يحتاج المريض إلى فهم مواعيد المتابعة، وإزالة الغرز، وتناول الأدوية، والكمادات الباردة أو الدافئة، والنظام الغذائي، ووقت غسل الوجه أو الاستحمام، والأعراض غير الطبيعية، والفحص قبل العودة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '术后注意事项整理', ko: '수술 후 주의사항 정리', en: 'Postoperative instruction organization', ar: 'تنظيم تعليمات ما بعد العملية' },
      { zh: '复诊和拆线安排', ko: '재내원 및 실밥 제거 일정', en: 'Follow-up and stitch removal schedule', ar: 'مواعيد المتابعة وإزالة الغرز' },
      { zh: '药物服用说明整理', ko: '약 복용 안내 정리', en: 'Medication instruction translation', ar: 'ترجمة تعليمات الأدوية' },
      { zh: '冰敷和肿胀管理', ko: '냉찜질 및 붓기 관리', en: 'Swelling and cold compress management', ar: 'إدارة التورم والكمادات الباردة' },
      { zh: '异常症状联系医院', ko: '이상 증상 발생 시 병원 연결', en: 'Contacting the hospital for abnormal symptoms', ar: 'التواصل مع المستشفى عند ظهور أعراض غير طبيعية' },
      { zh: '回国前检查安排', ko: '귀국 전 체크 일정', en: 'Pre-departure check planning', ar: 'ترتيب الفحص قبل العودة' },
      { zh: '术后生活管理', ko: '수술 후 생활관리', en: 'Postoperative lifestyle guidance', ar: 'إرشادات الحياة بعد العملية' },
    ],
    note: {
      zh: '汉江春天不进行医疗判断。我们可以帮助客户理解医院说明、整理翻译内容、提醒复诊和异常症状联系医院，但具体处理方式必须以医院判断为准。',
      ko: '한강애봄은 의료 판단을 하지 않습니다. 병원 안내를 고객 언어로 정리하고, 번역 내용을 전달하며, 재내원과 이상 증상 시 병원 연락을 돕지만, 구체적인 처치는 반드시 병원 판단을 기준으로 해야 합니다.',
      en: 'Hangangaeborn does not make medical judgments. We help clients understand hospital instructions, organize translations, remind them about follow-up visits, and connect them to the hospital if abnormal symptoms occur. Specific medical decisions must follow the hospital\'s judgment.',
      ar: 'لا تقوم Hangangaeborn باتخاذ قرارات طبية. يمكننا مساعدة العميل على فهم تعليمات المستشفى، وتنظيم الترجمة، والتذكير بمواعيد المتابعة، وربط العميل بالمستشفى عند ظهور أعراض غير طبيعية، لكن القرار الطبي النهائي يجب أن يكون وفقًا لتقدير المستشفى.',
    },
    docKeys: ['surgeryAfter', 'sutureRemovalGuide', 'anesthesiaAfterCare', 'medicationAllergyCheck'],
  },
]
