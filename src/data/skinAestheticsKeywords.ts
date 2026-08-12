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
      ko: '피부시술 후 공통 주의사항 보기',
      en: 'View General Skin Treatment Aftercare Guide',
      ar: 'عرض إرشادات العناية العامة بعد علاج البشرة',
    },
    kind: 'route',
    target: '/prep/skin-treatment-after/',
  },
  deviceLiftingAfter: {
    label: {
      zh: '查看仪器提升治疗后注意事项',
      ko: '리프팅 장비 시술 후 주의사항 보기',
      en: 'View Device Lifting Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد شد الأجهزة',
    },
    kind: 'route',
    target: '/prep/device-lifting-after/',
  },
  skinBoosterAfter: {
    label: {
      zh: '查看水光·丽珠兰治疗后注意事项',
      ko: '스킨부스터·리쥬란 후 주의사항 보기',
      en: 'View Skin Booster & Rejuran Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد معززات البشرة وريجوران',
    },
    kind: 'route',
    target: '/prep/skin-booster-after/',
  },
  botoxGuide: {
    label: {
      zh: '查看肉毒素治疗后注意事项',
      ko: '보톡스 후 주의사항 보기',
      en: 'View Botox Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد البوتوكس',
    },
    kind: 'route',
    target: '/prep/botox-guide/',
  },
  fillerGuide: {
    label: {
      zh: '查看玻尿酸填充后注意事项',
      ko: '필러 후 주의사항 보기',
      en: 'View Filler Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد الفيلر',
    },
    kind: 'route',
    target: '/prep/filler-guide/',
  },
  fillerBotoxGuide: {
    label: {
      zh: '查看肉毒素·玻尿酸治疗后注意事项',
      ko: '보톡스·필러 후 주의사항 보기',
      en: 'View Botox & Filler Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد البوتوكس والفيلر',
    },
    kind: 'route',
    target: '/prep/filler-botox-guide/',
  },
  threadLiftingAfter: {
    label: {
      zh: '查看埋线提升后注意事项',
      ko: '실리프팅 후 주의사항 보기',
      en: 'View Thread Lifting Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد شد الخيوط',
    },
    kind: 'route',
    target: '/prep/thread-lifting-after/',
  },
  acneScarAfter: {
    label: {
      zh: '查看痘痘·痘坑治疗后注意事项',
      ko: '여드름·흉터 치료 후 주의사항 보기',
      en: 'View Acne & Scar Treatment Aftercare Guide',
      ar: 'عرض إرشادات العناية بعد علاج حب الشباب والندبات',
    },
    kind: 'route',
    target: '/prep/acne-scar-after/',
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
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      ko: '기업위챗 상담하기',
      en: 'Open WeChat Business Consultation',
      ar: 'فتح استشارة عبر WeChat للأعمال',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, SkinAestheticsDocButton>

export type SkinAestheticsDocButtonKey = keyof typeof SKIN_AESTHETICS_DOC_BUTTONS

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
  directions: BigHealthBullet[]
  /** Optional "trending devices/brands" block, rendered with a distinct (pink) accent to set it apart from the standard treatment-direction list. */
  popularDevices?: BigHealthApprovedProductsBlock
  audienceLabel?: LocalizedText
  audience?: BigHealthBullet[]
  note?: LocalizedText
  /** 'warning' renders the note in the urgent/orange style instead of the neutral info style. */
  noteStyle?: 'info' | 'warning'
  docKeys: SkinAestheticsDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能相关治疗方向',
  ko: '관련 가능 시술 방향',
  en: 'Possible Related Treatment Directions',
  ar: 'اتجاهات العلاج المحتملة ذات الصلة',
}

const AUDIENCE_LABEL: LocalizedText = {
  zh: '适合咨询的人群',
  ko: '이런 경우 상담하기 좋습니다',
  en: 'Who This Consultation May Suit',
  ar: 'لمن تناسب هذه الاستشارة',
}

export const SKIN_AESTHETICS_SECTION = {
  title: {
    zh: '皮肤医美',
    ko: '피부미용',
    en: 'Skin Aesthetics',
    ar: 'التجميل الجلدي',
  } as LocalizedText,
  subCopy: {
    zh: '皮肤提升 · 毛孔肤质 · 抗衰外观',
    ko: '피부 리프팅 · 모공·피부결 · 항노화 외관관리',
    en: 'Skin Lifting · Pores & Texture · Anti-Aging Appearance Care',
    ar: 'شد الجلد · المسام وملمس البشرة · العناية بمظهر مكافحة الشيخوخة',
  } as LocalizedText,
  desc: {
    zh: '皮肤提升咨询主要针对面部下垂、下颌线模糊、法令纹加深、面部轮廓松弛、皮肤弹性下降等问题进行综合评估。非手术及微创提升可根据皮肤状态和不同部位，选择超声波、射频等能量类项目，以及注射类项目、线雕提升等多种方式。',
    ko: '피부 리프팅 상담은 얼굴 처짐, 턱선 흐림, 팔자주름 깊어짐, 얼굴 윤곽 처짐, 피부 탄력 저하 등의 고민을 정리하는 과정입니다. 비수술 리프팅은 피부 상태와 부위에 따라 초음파·고주파 등 에너지 기반 시술, 주사 시술, 실리프팅 등 다양한 방법을 적용할 수 있습니다.',
    en: "A skin lifting consultation is a process of organizing concerns such as facial sagging, a blurred jawline, deepening nasolabial folds, loss of facial contour, and reduced skin elasticity. Depending on your skin condition and the treatment area, non-surgical lifting can draw on a range of approaches — energy-based treatments like ultrasound and radiofrequency, injectable treatments, and thread lifting.",
    ar: 'استشارة شد الجلد هي عملية لتنظيم المخاوف المتعلقة بترهل الوجه، وعدم وضوح خط الفك، وتعمّق خطوط الابتسامة، وترهل محيط الوجه، وانخفاض مرونة البشرة. ووفقاً لحالة بشرتك والمنطقة المستهدفة، يمكن أن يعتمد الشد غير الجراحي على طرق متعددة، منها الإجراءات القائمة على الطاقة مثل الموجات فوق الصوتية والترددات الراديوية، والحقن، وشد الخيوط.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国皮肤医美咨询前的信息整理，不代替医生诊断或治疗判断。',
      ko: '본 페이지는 한국 피부미용 상담 전 정보 정리를 위한 참고 안내이며 의사의 진단이나 치료 판단을 대신하지 않습니다.',
      en: "This page is for organizing information before a skin aesthetics consultation in Korea, and does not replace a physician's diagnosis or treatment decision.",
      ar: 'هذه الصفحة مخصصة لتنظيم المعلومات قبل استشارة التجميل الجلدي في كوريا، ولا تحل محل تشخيص الطبيب أو قراره العلاجي.',
    },
    {
      zh: '具体是否适合某项治疗、是否可以联合治疗，以及恢复期安排，需要由正规医疗机构和专业医生判断。',
      ko: '특정 시술 적합 여부, 병합 시술 가능 여부, 회복 기간 계획은 정규 의료기관과 전문의가 판단해야 합니다.',
      en: 'Whether a specific treatment is suitable, whether treatments can be combined, and how recovery should be scheduled must be determined by a licensed medical institution and a qualified physician.',
      ar: 'يجب أن تحدد مؤسسة طبية مرخصة وطبيب مختص مدى ملاءمة علاج معين، وإمكانية الجمع بين العلاجات، وجدولة فترة التعافي.',
    },
  ] as LocalizedText[],
}

export const SKIN_AESTHETICS_KEYWORDS: SkinAestheticsKeyword[] = [
  {
    id: 'skin-lifting',
    image: '/keyword-tiles/skin-lifting.jpg',
    title: {
      zh: '皮肤提升',
      ko: '피부 리프팅',
      en: 'Skin Lifting',
      ar: 'شد الجلد',
    },
    description: {
      zh: '皮肤提升咨询主要针对面部松弛、下颌线不清晰、法令纹加深、脸部轮廓下垂、皮肤弹性下降等问题。短期访韩客户通常更适合咨询恢复期较短的非手术类提升项目。',
      ko: '피부 리프팅 상담은 얼굴 처짐, 턱선 흐림, 팔자주름 깊어짐, 얼굴 윤곽 처짐, 피부 탄력 저하 등의 고민을 정리하는 과정입니다. 단기 방한 고객은 회복 기간이 비교적 짧은 비수술 리프팅 시술군을 상담하는 것이 현실적입니다.',
      en: 'Skin lifting consultation mainly addresses concerns such as facial sagging, an unclear jawline, deepening nasolabial folds, drooping facial contours, and reduced skin elasticity. For customers visiting Korea for a short stay, non-surgical lifting procedures with shorter recovery times are generally more realistic to consult on.',
      ar: 'تتناول استشارة شد الجلد بشكل أساسي مخاوف مثل ترهل الوجه وعدم وضوح خط الفك وتعمق خطوط الأنف والفم وترهل ملامح الوجه وانخفاض مرونة البشرة. بالنسبة للعملاء الذين يزورون كوريا لفترة قصيرة، تُعد إجراءات الشد غير الجراحية ذات فترة التعافي الأقصر أكثر واقعية للاستشارة بشأنها.',
    },
    directionsLabel: {
      zh: '各提升术式适用部位',
      ko: '리프팅 시술별 주요 적용 부위',
      en: 'Target Areas by Lifting Procedure',
      ar: 'المناطق المستهدفة حسب نوع إجراء الشد',
    },
    directions: [
      { zh: '超声提拉 — 下颌线、下面部松弛、面部轮廓', ko: '초음파 리프팅 — 턱선 · 턱밑 · 하안면 처짐 · 얼굴 윤곽', en: 'Ultrasound lifting — jawline · under-chin · lower-face sagging · facial contour', ar: 'الشد بالموجات فوق الصوتية — خط الفك · أسفل الذقن · ترهل الوجه السفلي · محيط الوجه' },
      { zh: '射频紧肤 — 面颊松弛、皮肤弹性、细纹', ko: '고주파 리프팅 — 볼 처짐 · 하안면 탄력 · 턱선 · 잔주름', en: 'Radiofrequency (RF) lifting — cheek sagging · lower-face elasticity · jawline · fine lines', ar: 'الشد بالترددات الراديوية (RF) — ترهل الخدين · مرونة الوجه السفلي · خط الفك · الخطوط الدقيقة' },
      { zh: 'RF射频紧致 — 皮肤弹性、肤质、毛孔', ko: '마이크로니들 RF — 피부 탄력 · 피부결 · 모공 · 잔주름', en: 'Microneedle RF — skin elasticity · skin texture · pores · fine lines', ar: 'الإبر الدقيقة بالترددات الراديوية (Microneedle RF) — مرونة البشرة · ملمس البشرة · المسام · الخطوط الدقيقة' },
      { zh: '水光针 / 注射类 — 细纹、皮肤弹性、肌肤状态', ko: '스킨부스터·콜라겐 자극 주사 — 잔주름 · 피부결 · 수분 · 피부 탄력', en: 'Skin boosters & collagen-stimulating injections — fine lines · skin texture · hydration · skin elasticity', ar: 'معززات البشرة وحقن تحفيز الكولاجين — الخطوط الدقيقة · ملمس البشرة · الترطيب · مرونة البشرة' },
      { zh: '线雕提升 — 面颊松弛、下颌线、面部轮廓', ko: '실리프팅 — 볼 처짐 · 중안면 처짐 · 턱선 · 얼굴 윤곽', en: 'Thread lifting — cheek sagging · midface sagging · jawline · facial contour', ar: 'شد الخيوط — ترهل الخدين · ترهل منتصف الوجه · خط الفك · محيط الوجه' },
    ],
    popularDevices: {
      title: {
        zh: '近期热门提升项目',
        ko: '최근 인기 리프팅 시술',
        en: 'Trending Lifting Treatments',
        ar: 'إجراءات الشد الرائجة حالياً',
      },
      items: [
        {
          name: { zh: 'Ultherapy PRIME 超声刀', ko: '울쎄라 PRIME', en: 'Ulthera PRIME', ar: 'Ulthera PRIME' },
          desc: { zh: '下颌线 · 下半脸 · 下巴下方提升', ko: '턱선 · 하안면 · 턱밑 리프팅', en: 'Jawline · lower face · under-chin lifting', ar: 'خط الفك · أسفل الوجه · شد أسفل الذقن' },
        },
        {
          name: { zh: 'Thermage FLX 热玛吉', ko: '써마지 FLX', en: 'Thermage FLX', ar: 'Thermage FLX' },
          desc: { zh: '紧致 · 弹性 · 细纹 · 面部轮廓', ko: '피부 타이트닝 · 탄력 · 잔주름 · 얼굴 윤곽', en: 'Skin tightening · elasticity · fine lines · facial contour', ar: 'شد الجلد · المرونة · الخطوط الدقيقة · محيط الوجه' },
        },
        {
          name: { zh: 'Titanium Lifting 钛提升', ko: '티타늄 리프팅', en: 'Titanium Lifting', ar: 'Titanium Lifting' },
          desc: { zh: '提拉 · 紧致 · 提亮 · 轮廓改善', ko: '리프팅 · 타이트닝 · 피부톤 개선 · 윤곽 개선', en: 'Lifting · tightening · skin tone improvement · contour refinement', ar: 'الشد · التوتير · تحسين لون البشرة · تحسين المحيط' },
        },
        {
          name: { zh: 'XERF', ko: 'XERF', en: 'XERF', ar: 'XERF' },
          desc: { zh: '双频单极射频 · 紧致 · 弹性 · 下颌线', ko: '이중주파수 모노폴라 RF · 타이트닝 · 탄력 · 턱선', en: 'Dual-frequency monopolar RF · tightening · elasticity · jawline', ar: 'ترددات راديوية أحادية القطب مزدوجة التردد · التوتير · المرونة · خط الفك' },
        },
        {
          name: { zh: 'Oligio X', ko: '올리지오 X', en: 'Oligio X', ar: 'Oligio X' },
          desc: { zh: '单极射频 · 弹性 · 皱纹 · 毛孔 · 肤质', ko: '모노폴라 RF · 탄력 · 주름 · 모공 · 피부결', en: 'Monopolar RF · elasticity · wrinkles · pores · skin texture', ar: 'ترددات راديوية أحادية القطب · المرونة · التجاعيد · المسام · ملمس البشرة' },
        },
        {
          name: { zh: 'Density / Volnewmer', ko: '덴서티 / 볼뉴머', en: 'Density / Volnewmer', ar: 'Density / Volnewmer' },
          desc: { zh: '射频紧致 · 弹性 · 轮廓管理', ko: '고주파 타이트닝 · 피부 탄력 · 얼굴 윤곽', en: 'RF tightening · skin elasticity · facial contour', ar: 'شد بالترددات الراديوية · مرونة البشرة · تحسين محيط الوجه' },
        },
      ],
      caution: {
        zh: '具体配备的设备型号因医院而异，实际可选设备需现场咨询确认。',
        ko: '병원마다 보유 장비가 다르므로, 실제 상담 가능한 기종은 병원 확인이 필요합니다.',
        en: 'Available devices vary by clinic — please confirm which specific equipment is offered during your consultation.',
        ar: 'تختلف الأجهزة المتوفرة حسب المستشفى — يُرجى تأكيد الجهاز المحدد المتاح أثناء الاستشارة.',
      },
    },
    docKeys: ['skinTreatmentAfter', 'deviceLiftingAfter'],
  },
  {
    id: 'pores-texture',
    image: '/keyword-tiles/pores-texture.jpg',
    title: {
      zh: '毛孔·肤质',
      ko: '모공·피부결',
      en: 'Pores & Skin Texture',
      ar: 'المسام وملمس البشرة',
    },
    description: {
      zh: '毛孔粗大、皮肤粗糙、细纹、肤质不均、妆感不服帖等问题，通常需要结合皮肤厚度、油脂分泌、炎症状态和恢复期来选择咨询方向。',
      ko: '모공, 거친 피부결, 잔주름, 고르지 않은 피부결, 화장이 잘 받지 않는 문제 등은 피부 두께, 피지 분비, 염증 상태, 회복 기간을 함께 고려해 상담 방향을 정리해야 합니다.',
      en: 'Concerns such as enlarged pores, rough skin texture, fine lines, uneven skin texture, and makeup not applying smoothly usually need to be considered together with skin thickness, sebum production, inflammation status, and recovery time when organizing a consultation direction.',
      ar: 'عادةً ما تحتاج مخاوف مثل توسع المسام وخشونة ملمس البشرة والخطوط الدقيقة وعدم انتظام ملمس البشرة وعدم التصاق المكياج جيداً إلى مراعاة سماكة البشرة وإفراز الزهم وحالة الالتهاب وفترة التعافي عند تنظيم اتجاه الاستشارة.',
    },
    specialNote: {
      zh: '色斑、黄褐斑、色素沉着等问题通常需要多次治疗和长期防晒管理。短期访韩客户不建议作为主要项目安排，可根据医生判断作为辅助咨询项目。',
      ko: '기미, 잡티, 색소침착 등은 보통 반복 치료와 장기적인 자외선 관리가 필요합니다. 단기 방한 고객에게는 주요 일정으로 권하지 않으며, 의사 판단에 따라 보조 상담 항목으로만 검토할 수 있습니다.',
      en: 'Concerns such as melasma, dark spots, and pigmentation usually require repeated treatment and long-term sun protection management. These are not recommended as a primary treatment plan for customers visiting Korea for a short stay, and may only be considered as a supplementary consultation item based on the physician\'s judgment.',
      ar: 'عادةً ما تتطلب مخاوف مثل الكلف والبقع الداكنة والتصبغ علاجاً متكرراً وإدارة طويلة الأمد للحماية من الشمس. لا يُنصح بها كخطة علاج أساسية للعملاء الذين يزورون كوريا لفترة قصيرة، ويمكن اعتبارها فقط كعنصر استشارة تكميلي بناءً على تقدير الطبيب.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '射频微针类治疗', ko: 'RF 니들 계열', en: 'RF microneedling treatments', ar: 'علاجات الإبر الدقيقة بالترددات الراديوية (RF)' },
      { zh: '毛孔与肤质改善类治疗', ko: '모공·피부결 개선 시술', en: 'Treatments for improving pores and skin texture', ar: 'علاجات لتحسين المسام وملمس البشرة' },
      { zh: 'Skin Booster', ko: '스킨부스터', en: 'Skin boosters', ar: 'معززات البشرة' },
      { zh: '丽珠兰', ko: '리쥬란', en: 'Rejuran', ar: 'ريجوران' },
      { zh: '水光针', ko: '물광주사', en: 'Water-glow injections (skin hydration boosters)', ar: 'حقن الترطيب المضيئة للبشرة' },
      { zh: '胶原再生类皮肤管理', ko: '콜라겐 재생 계열 피부관리', en: 'Collagen regeneration skin care', ar: 'العناية بالبشرة لتجديد الكولاجين' },
      { zh: '再生修复管理', ko: '재생·회복 관리', en: 'Regenerative recovery management', ar: 'إدارة التجديد والتعافي' },
    ],
    audienceLabel: AUDIENCE_LABEL,
    audience: [
      { zh: '毛孔明显', ko: '모공이 눈에 띄는 경우', en: 'Visible pores', ar: 'مسام ظاهرة' },
      { zh: '皮肤摸起来粗糙', ko: '피부결이 거칠게 느껴지는 경우', en: 'Skin feels rough to the touch', ar: 'بشرة خشنة الملمس' },
      { zh: '细纹增加', ko: '잔주름이 늘어난 경우', en: 'Increased fine lines', ar: 'زيادة الخطوط الدقيقة' },
      { zh: '皮肤没有光泽', ko: '피부 광이 부족한 경우', en: 'Lack of skin radiance', ar: 'نقص إشراقة البشرة' },
      { zh: '想改善肤质但不想恢复期太长', ko: '회복 기간이 너무 길지 않은 피부결 개선을 원할 경우', en: 'Wanting to improve skin texture without a long recovery period', ar: 'الرغبة في تحسين ملمس البشرة دون فترة تعافٍ طويلة' },
    ],
    note: {
      zh: '毛孔和肤质改善通常不是一次完成的项目，具体治疗次数和组合需要由医生根据皮肤状态判断。',
      ko: '모공과 피부결 개선은 보통 한 번에 완성되는 시술이 아니며, 구체적인 횟수와 조합은 의료진이 피부 상태에 따라 판단해야 합니다.',
      en: 'Improving pores and skin texture is usually not completed in a single session — the specific number of sessions and combination of treatments must be determined by a physician based on skin condition.',
      ar: 'عادةً لا يكتمل تحسين المسام وملمس البشرة في جلسة واحدة — يجب أن يحدد الطبيب عدد الجلسات المحدد ومجموعة العلاجات بناءً على حالة البشرة.',
    },
    docKeys: ['skinTreatmentAfter', 'skinBoosterAfter'],
  },
  {
    id: 'skin-boosters-rejuran',
    image: '/keyword-tiles/skin-boosters-rejuran.jpg',
    title: {
      zh: '水光·丽珠兰',
      ko: '스킨부스터·리쥬란',
      en: 'Skin Boosters & Rejuran',
      ar: 'معززات البشرة وريجوران',
    },
    description: {
      zh: '水光、丽珠兰和Skin Booster类项目，通常用于咨询皮肤干燥、细纹、肤质、光泽、皮肤恢复力和抗衰外观管理等问题。具体成分、注射方式和恢复反应因医院和产品不同而不同。',
      ko: '물광주사, 리쥬란, 스킨부스터 계열은 피부 건조, 잔주름, 피부결, 광채, 피부 회복력, 항노화 외관관리 상담에 자주 포함되는 시술군입니다. 구체적인 성분, 주입 방식, 회복 반응은 병원과 제품에 따라 다를 수 있습니다.',
      en: 'Water-glow injections, Rejuran, and skin booster treatments are commonly included in consultations for skin dryness, fine lines, skin texture, radiance, skin recovery capacity, and anti-aging appearance care. The specific ingredients, injection method, and recovery response can vary by hospital and product.',
      ar: 'غالباً ما تُدرج حقن الترطيب المضيئة وريجوران ومعززات البشرة ضمن استشارات جفاف البشرة والخطوط الدقيقة وملمس البشرة والإشراقة وقدرة البشرة على التعافي والعناية بمظهر مكافحة الشيخوخة. قد تختلف المكونات المحددة وطريقة الحقن واستجابة التعافي حسب المستشفى والمنتج.',
    },
    specialNote: {
      zh: '客户常说的"皮肤干细胞"类项目，实际可能属于自体血液成分或再生管理类皮肤项目，需由医院确认具体名称、成分和适应范围。',
      ko: "고객이 흔히 말하는 '피부 줄기세포'류 항목은 실제로는 자가혈 성분 또는 재생관리 계열 피부 시술일 수 있으며, 정확한 명칭, 성분, 적용 범위는 병원 확인이 필요합니다.",
      en: 'Treatments customers often refer to as "skin stem cells" may actually be autologous blood-based or regenerative skin care treatments. The exact name, ingredients, and scope of application should be confirmed with the hospital.',
      ar: 'قد تكون العلاجات التي يشير إليها العملاء غالباً باسم "الخلايا الجذعية للبشرة" في الواقع علاجات قائمة على الدم الذاتي أو علاجات تجديد للبشرة. يجب تأكيد الاسم الدقيق والمكونات ونطاق التطبيق مع المستشفى.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '水光针', ko: '물광주사', en: 'Water-glow injections', ar: 'حقن الترطيب المضيئة' },
      { zh: '丽珠兰', ko: '리쥬란', en: 'Rejuran', ar: 'ريجوران' },
      { zh: 'Skin Booster', ko: '스킨부스터', en: 'Skin boosters', ar: 'معززات البشرة' },
      { zh: 'PN/PDRN类皮肤管理', ko: 'PN/PDRN 계열 피부관리', en: 'PN/PDRN-based skin care', ar: 'العناية بالبشرة القائمة على PN/PDRN' },
      { zh: '玻尿酸类保湿注射', ko: '히알루론산 기반 보습주사', en: 'Hyaluronic acid-based hydrating injections', ar: 'حقن الترطيب القائمة على حمض الهيالورونيك' },
      { zh: '胶原再生类皮肤管理', ko: '콜라겐 재생 계열 피부관리', en: 'Collagen regeneration skin care', ar: 'العناية بالبشرة لتجديد الكولاجين' },
      { zh: '自体血液基础皮肤再生管理', ko: '자가혈 기반 피부 재생관리', en: 'Autologous blood-based skin regeneration care', ar: 'العناية بتجديد البشرة القائمة على الدم الذاتي' },
    ],
    audienceLabel: AUDIENCE_LABEL,
    audience: [
      { zh: '皮肤干燥', ko: '피부가 건조한 경우', en: 'Dry skin', ar: 'بشرة جافة' },
      { zh: '细纹增加', ko: '잔주름이 늘어난 경우', en: 'Increased fine lines', ar: 'زيادة الخطوط الدقيقة' },
      { zh: '皮肤没有光泽', ko: '피부 광채가 부족한 경우', en: 'Lack of skin radiance', ar: 'نقص إشراقة البشرة' },
      { zh: '想改善肤质和恢复力', ko: '피부결과 회복력을 개선하고 싶은 경우', en: 'Wanting to improve skin texture and recovery capacity', ar: 'الرغبة في تحسين ملمس البشرة وقدرتها على التعافي' },
      { zh: '想做轻恢复期抗衰外观管理', ko: '회복 부담이 비교적 적은 항노화 외관관리를 원하는 경우', en: 'Wanting anti-aging appearance care with a lighter recovery burden', ar: 'الرغبة في عناية بمظهر مكافحة الشيخوخة بعبء تعافٍ أخف' },
    ],
    note: {
      zh: '水光、丽珠兰和Skin Booster类项目可能出现针眼、红肿、淤青、凸起感等短期反应，具体恢复时间因个人和产品不同而不同。',
      ko: '물광주사, 리쥬란, 스킨부스터 계열은 바늘자국, 붉음, 멍, 엠보싱처럼 볼록한 느낌 등의 일시적 반응이 있을 수 있으며, 회복 시간은 개인과 제품에 따라 달라질 수 있습니다.',
      en: 'Water-glow injections, Rejuran, and skin booster treatments may cause temporary reactions such as needle marks, redness, bruising, or a raised (embossed) feeling. Recovery time can vary by individual and by product.',
      ar: 'قد تسبب حقن الترطيب المضيئة وريجوران ومعززات البشرة ردود فعل مؤقتة مثل آثار الإبر أو الاحمرار أو الكدمات أو الشعور بنتوءات. قد يختلف وقت التعافي حسب الفرد والمنتج.',
    },
    docKeys: ['skinBoosterAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'botox-fillers',
    image: '/keyword-tiles/botox-fillers.jpg',
    title: {
      zh: '肉毒素·玻尿酸',
      ko: '보톡스·필러',
      en: 'Botox & Fillers',
      ar: 'البوتوكس والفيلر',
    },
    description: {
      zh: '肉毒素和玻尿酸填充咨询主要用于整理动态皱纹、咬肌、肩颈线条、面部凹陷、唇部、下巴、法令纹等需求。两者作用不同，是否适合联合治疗需要医生判断。',
      ko: '보톡스와 필러 상담은 표정주름, 사각턱, 승모근·목선, 얼굴 꺼짐, 입술, 턱끝, 팔자주름 등의 고민을 정리하는 데 사용됩니다. 두 시술은 작용 방식이 다르며, 병합 가능 여부는 의료진 판단이 필요합니다.',
      en: 'Botox and hyaluronic acid filler consultations are used to organize needs such as dynamic wrinkles, masseter muscle reduction, shoulder/neck line, facial hollowing, lips, chin, and nasolabial folds. The two work differently, and whether they can be combined must be determined by a physician.',
      ar: 'تُستخدم استشارات البوتوكس وفيلر حمض الهيالورونيك لتنظيم احتياجات مثل التجاعيد الديناميكية وتقليل عضلة المضغ وخط الكتف والرقبة وتجويف الوجه والشفاه والذقن وخطوط الأنف والفم. يعمل الاثنان بطريقتين مختلفتين، ويجب أن يحدد الطبيب إمكانية الجمع بينهما.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '皱纹肉毒素', ko: '주름 보톡스', en: 'Wrinkle Botox', ar: 'بوتوكس التجاعيد' },
      { zh: '咬肌肉毒素', ko: '사각턱 보톡스', en: 'Masseter (jaw) Botox', ar: 'بوتوكس عضلة المضغ (الفك)' },
      { zh: '肩颈线条肉毒素', ko: '승모근·목선 보톡스', en: 'Trapezius/neckline Botox', ar: 'بوتوكس العضلة شبه المنحرفة وخط الرقبة' },
      { zh: '小腿肉毒素', ko: '종아리 보톡스', en: 'Calf Botox', ar: 'بوتوكس الساق' },
      { zh: 'Skin Botox', ko: '스킨보톡스', en: 'Skin Botox (micro-Botox)', ar: 'بوتوكس البشرة (البوتوكس الدقيق)' },
      { zh: '玻尿酸填充', ko: '히알루론산 필러', en: 'Hyaluronic acid filler', ar: 'فيلر حمض الهيالورونيك' },
      { zh: '唇部填充', ko: '입술필러', en: 'Lip filler', ar: 'فيلر الشفاه' },
      { zh: '下巴填充', ko: '턱끝필러', en: 'Chin filler', ar: 'فيلر الذقن' },
      { zh: '法令纹填充', ko: '팔자필러', en: 'Nasolabial fold filler', ar: 'فيلر خطوط الأنف والفم' },
      { zh: '额头或太阳穴填充', ko: '이마 또는 관자 필러', en: 'Forehead or temple filler', ar: 'فيلر الجبهة أو الصدغ' },
    ],
    audienceLabel: AUDIENCE_LABEL,
    audience: [
      { zh: '表情纹明显', ko: '표정주름이 눈에 띄는 경우', en: 'Noticeable expression wrinkles', ar: 'تجاعيد تعبيرية ظاهرة' },
      { zh: '咬肌发达', ko: '사각턱이 고민인 경우', en: 'A prominent/square jawline from masseter muscle', ar: 'فك مربع بارز بسبب عضلة المضغ' },
      { zh: '面部局部凹陷', ko: '얼굴 일부 꺼짐이 있는 경우', en: 'Localized facial hollowing', ar: 'تجويف موضعي في الوجه' },
      { zh: '想改善唇部或下巴轮廓', ko: '입술 또는 턱끝 윤곽 개선을 상담하고 싶은 경우', en: 'Wanting to consult on improving lip or chin contour', ar: 'الرغبة في استشارة تحسين ملامح الشفاه أو الذقن' },
      { zh: '想做恢复期较短的外观管理', ko: '회복 기간이 비교적 짧은 외관관리를 원하는 경우', en: 'Wanting appearance care with a relatively short recovery period', ar: 'الرغبة في عناية بالمظهر بفترة تعافٍ أقصر نسبياً' },
    ],
    note: {
      zh: '玻尿酸填充后如果出现异常疼痛、皮肤变白或发紫、视力异常等情况，需要立即联系医院。',
      ko: '필러 후 비정상적인 통증, 피부가 하얗게 변하거나 보라색으로 변하는 경우, 시야 이상 등이 있으면 즉시 병원에 연락해야 합니다.',
      en: 'If you experience unusual pain, skin turning white or purple, or vision abnormalities after filler treatment, contact the hospital immediately.',
      ar: 'إذا شعرت بألم غير معتاد أو تحول لون الجلد إلى الأبيض أو الأرجواني أو حدثت اضطرابات في الرؤية بعد علاج الفيلر، تواصل مع المستشفى فوراً.',
    },
    noteStyle: 'warning',
    docKeys: ['botoxGuide', 'fillerGuide', 'fillerBotoxGuide'],
  },
  {
    id: 'acne-scars',
    image: '/keyword-tiles/acne-scars.jpg',
    title: {
      zh: '黑斑·疤痕祛除',
      ko: '흑자제거 및 흉터제거',
      en: 'Dark Spot & Scar Removal',
      ar: 'إزالة البقع الداكنة والندبات',
    },
    description: {
      zh: '痘痘、痘印、痘坑、皮脂分泌过多、反复炎症等问题，通常需要根据炎症状态、皮肤屏障、既往治疗经历和可接受的恢复期来整理咨询方向。',
      ko: '여드름, 여드름 자국, 패인 흉터, 과도한 피지, 반복되는 염증 등은 염증 상태, 피부장벽, 기존 치료 경험, 감당 가능한 회복 기간을 기준으로 상담 방향을 정리해야 합니다.',
      en: 'Concerns such as acne, acne marks, pitted scars, excess sebum, and recurring inflammation usually need a consultation direction organized based on inflammation status, skin barrier condition, prior treatment history, and an acceptable recovery period.',
      ar: 'عادةً ما تحتاج مخاوف مثل حب الشباب وآثاره والندبات الغائرة وإفراز الزهم الزائد والالتهاب المتكرر إلى تنظيم اتجاه الاستشارة بناءً على حالة الالتهاب وحاجز البشرة وتاريخ العلاج السابق وفترة التعافي المقبولة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '痘痘炎症管理', ko: '여드름 염증관리', en: 'Acne inflammation management', ar: 'إدارة التهاب حب الشباب' },
      { zh: '皮脂管理', ko: '피지관리', en: 'Sebum management', ar: 'إدارة الزهم' },
      { zh: '痘坑改善类治疗', ko: '패인 흉터 개선 시술', en: 'Treatments for improving pitted scars', ar: 'علاجات لتحسين الندبات الغائرة' },
      { zh: '射频微针类治疗', ko: 'RF 니들 계열', en: 'RF microneedling treatments', ar: 'علاجات الإبر الدقيقة بالترددات الراديوية' },
      { zh: '皮肤再生管理', ko: '피부 재생관리', en: 'Skin regeneration care', ar: 'العناية بتجديد البشرة' },
      { zh: '胶原再生类治疗', ko: '콜라겐 재생 계열', en: 'Collagen regeneration treatments', ar: 'علاجات تجديد الكولاجين' },
      { zh: '必要时结合药物治疗咨询', ko: '필요한 경우 약물치료 상담 병행', en: 'Combined with medication consultation when necessary', ar: 'بالاشتراك مع استشارة دوائية عند الضرورة' },
    ],
    audienceLabel: AUDIENCE_LABEL,
    audience: [
      { zh: '反复长痘', ko: '여드름이 반복되는 경우', en: 'Recurring acne', ar: 'حب شباب متكرر' },
      { zh: '痘印或痘坑明显', ko: '여드름 자국이나 패인 흉터가 눈에 띄는 경우', en: 'Noticeable acne marks or pitted scars', ar: 'آثار حب شباب أو ندبات غائرة ظاهرة' },
      { zh: '皮脂分泌旺盛', ko: '피지 분비가 많은 경우', en: 'Excess sebum production', ar: 'إفراز زائد للزهم' },
      { zh: '过去做过多次治疗但效果不稳定', ko: '과거 여러 치료를 받았지만 효과가 일정하지 않았던 경우', en: 'Having tried multiple treatments before with inconsistent results', ar: 'تجربة علاجات متعددة سابقاً بنتائج غير ثابتة' },
      { zh: '能接受需要多次管理的过程', ko: '여러 차례 관리가 필요할 수 있음을 이해하는 경우', en: 'Understanding that multiple sessions of management may be needed', ar: 'تفهم أن الأمر قد يتطلب عدة جلسات إدارة' },
    ],
    note: {
      zh: '痘痘和痘坑通常需要多次治疗和长期管理，短期访韩客户应先确认治疗目标和可停留时间。',
      ko: '여드름과 패인 흉터는 보통 반복 치료와 장기 관리가 필요하므로, 단기 방한 고객은 치료 목표와 체류 가능 기간을 먼저 확인해야 합니다.',
      en: 'Acne and pitted scars usually require repeated treatment and long-term management, so customers visiting Korea for a short stay should first confirm their treatment goals and available length of stay.',
      ar: 'عادةً ما يتطلب حب الشباب والندبات الغائرة علاجاً متكرراً وإدارة طويلة الأمد، لذا يجب على العملاء الذين يزورون كوريا لفترة قصيرة تأكيد أهداف العلاج ومدة الإقامة المتاحة أولاً.',
    },
    docKeys: ['acneScarAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'body-skin-care',
    image: '/keyword-tiles/body-skin-care.jpg',
    title: {
      zh: '身体皮肤管理',
      ko: '바디 피부관리',
      en: 'Body Skin Care',
      ar: 'العناية بجلد الجسم',
    },
    description: {
      zh: '身体皮肤管理咨询主要包括身体部位的痘痘、疤痕、妊娠纹、肤色不均、腋下色沉、手臂或腹部皮肤松弛等问题。部分项目需要多次治疗和长期管理。',
      ko: '바디 피부관리 상담은 몸 부위의 여드름, 흉터, 튼살, 피부톤 불균형, 겨드랑이 색소, 팔뚝 또는 복부 피부 처짐 등의 고민을 정리하는 과정입니다. 일부 항목은 여러 차례 치료와 장기 관리가 필요할 수 있습니다.',
      en: 'Body skin care consultation mainly covers concerns such as body acne, scars, stretch marks, uneven skin tone, underarm pigmentation, and skin laxity in the arms or abdomen. Some of these may require repeated treatment and long-term management.',
      ar: 'تشمل استشارة العناية بجلد الجسم بشكل أساسي مخاوف مثل حب الشباب الجسدي والندبات وعلامات التمدد وعدم انتظام لون البشرة وتصبغ الإبط وترهل جلد الذراعين أو البطن. قد يتطلب بعضها علاجاً متكرراً وإدارة طويلة الأمد.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '身体痘痘管理', ko: '바디 여드름 관리', en: 'Body acne management', ar: 'إدارة حب الشباب الجسدي' },
      { zh: '身体疤痕管理', ko: '바디 흉터 관리', en: 'Body scar management', ar: 'إدارة ندبات الجسم' },
      { zh: '妊娠纹相关治疗咨询', ko: '튼살 관련 치료 상담', en: 'Consultation on stretch mark related treatments', ar: 'استشارة علاجات علامات التمدد' },
      { zh: '身体紧致类治疗', ko: '바디 탄력관리', en: 'Body firming treatments', ar: 'علاجات شد الجسم' },
      { zh: '腋下或身体色沉辅助咨询', ko: '겨드랑이 또는 바디 색소 보조 상담', en: 'Auxiliary consultation for underarm or body pigmentation', ar: 'استشارة مساعدة لتصبغ الإبط أو الجسم' },
      { zh: '术后疤痕管理', ko: '수술 후 흉터관리', en: 'Post-surgical scar management', ar: 'إدارة الندبات بعد الجراحة' },
      { zh: '皮肤屏障和再生管理', ko: '피부장벽 및 재생관리', en: 'Skin barrier and regeneration care', ar: 'العناية بحاجز البشرة وتجديدها' },
    ],
    audienceLabel: AUDIENCE_LABEL,
    audience: [
      { zh: '背部或胸部反复长痘', ko: '등드름이나 가슴 여드름이 반복되는 경우', en: 'Recurring acne on the back or chest', ar: 'حب شباب متكرر على الظهر أو الصدر' },
      { zh: '手术疤痕或外伤疤痕明显', ko: '수술 흉터 또는 외상 흉터가 고민인 경우', en: 'Noticeable surgical or traumatic scars', ar: 'ندبات جراحية أو رضحية ظاهرة' },
      { zh: '有妊娠纹困扰', ko: '튼살이 고민인 경우', en: 'Concerned about stretch marks', ar: 'القلق بشأن علامات التمدد' },
      { zh: '手臂、腹部等身体部位皮肤松弛', ko: '팔뚝, 복부 등 바디 탄력이 고민인 경우', en: 'Skin laxity in areas such as the arms or abdomen', ar: 'ترهل الجلد في مناطق مثل الذراعين أو البطن' },
      { zh: '想了解短期访韩行程内可行的管理范围', ko: '단기 일정 안에서 가능한 관리 범위를 알고 싶은 경우', en: 'Wanting to know what level of care is realistic within a short visit to Korea', ar: 'الرغبة في معرفة مستوى العناية الواقعي الممكن ضمن زيارة قصيرة لكوريا' },
    ],
    note: {
      zh: '身体皮肤管理中，色素、疤痕、妊娠纹等项目通常需要多次治疗，短期访韩时不宜承诺一次改善。',
      ko: '바디 피부관리 중 색소, 흉터, 튼살 등은 보통 반복 치료가 필요하므로, 단기 방한 시 한 번의 개선을 약속해서는 안 됩니다.',
      en: 'For body skin care, items such as pigmentation, scars, and stretch marks usually require repeated treatment, so a single-session improvement should not be promised during a short visit to Korea.',
      ar: 'بالنسبة للعناية بجلد الجسم، تتطلب عناصر مثل التصبغ والندبات وعلامات التمدد عادةً علاجاً متكرراً، لذا لا ينبغي الوعد بتحسن في جلسة واحدة خلال زيارة قصيرة لكوريا.',
    },
    docKeys: ['skinTreatmentAfter', 'scarCareGuide'],
  },
]
