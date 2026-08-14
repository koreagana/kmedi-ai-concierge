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
  ko: '관련 가능 시술 방향',
  en: 'Possible Related Treatment Directions',
  ar: 'اتجاهات العلاج المحتملة ذات الصلة',
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
      zh: '皮肤提升咨询主要针对面部松弛、下颌线不清晰、法令纹加深、脸部轮廓下垂、皮肤弹性下降等问题。',
      ko: '피부 리프팅 상담은 얼굴 처짐, 턱선 흐림, 팔자주름 깊어짐, 얼굴 윤곽 처짐, 피부 탄력 저하 등의 고민을 정리하는 과정입니다.',
      en: 'Skin lifting consultation mainly addresses concerns such as facial sagging, an unclear jawline, deepening nasolabial folds, drooping facial contours, and reduced skin elasticity.',
      ar: 'تتناول استشارة شد الجلد بشكل أساسي مخاوف مثل ترهل الوجه وعدم وضوح خط الفك وتعمق خطوط الأنف والفم وترهل ملامح الوجه وانخفاض مرونة البشرة.',
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
      zh: '毛孔 · 肤质',
      ko: '모공 · 피부결',
      en: 'Pores & Skin Texture',
      ar: 'المسام وملمس البشرة',
    },
    description: {
      zh: '毛孔粗大、肤质粗糙、细纹、弹力下降、痘坑痘疤等问题，会根据皮肤厚度、皮脂分泌情况、疤痕类型及深度、色素问题等，选择不同的治疗方向。',
      ko: '넓어진 모공, 거친 피부결, 잔주름, 탄력 저하, 여드름 흉터 등은 피부 두께, 피지 분비, 흉터 유형과 깊이, 색소 여부에 따라 치료 방향이 달라질 수 있습니다.',
      en: 'Concerns such as enlarged pores, rough skin texture, fine lines, reduced elasticity, and acne scars call for different treatment directions depending on skin thickness, sebum production, scar type and depth, and pigmentation.',
      ar: 'تُعالَج مخاوف مثل توسع المسام، وخشونة ملمس البشرة، والخطوط الدقيقة، وانخفاض المرونة، وندبات حب الشباب بطرق علاج مختلفة تبعاً لسماكة البشرة، وإفراز الزهم، ونوع الندبة وعمقها، ووجود التصبغات.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '射频微针', ko: 'RF 마이크로니들', en: 'RF Microneedling', ar: 'الإبر الدقيقة بالترددات الراديوية (RF)' },
      { zh: '点阵激光', ko: '프락셔널 레이저', en: 'Fractional Laser', ar: 'الليزر الجزئي (Fractional Laser)' },
      { zh: '皮秒点阵', ko: '피코 프락셔널', en: 'Picosecond Fractional', ar: 'الليزر الجزئي بالبيكوثانية' },
      { zh: 'CO₂ · Er:YAG 激光焕肤', ko: 'CO₂·Er:YAG 리서페이싱', en: 'CO₂ · Er:YAG Laser Resurfacing', ar: 'تجديد سطح البشرة بليزر CO₂ · Er:YAG' },
      { zh: '水光／Skin Booster', ko: '스킨부스터', en: 'Water-Glow Injections / Skin Booster', ar: 'حقن الترطيب المضيئة / Skin Booster' },
      { zh: '胶原再生治疗', ko: '콜라겐 재생 시술', en: 'Collagen Regeneration Treatment', ar: 'علاج تجديد الكولاجين' },
      { zh: '舒缓 · 修复管理', ko: '진정·재생 관리', en: 'Soothing & Recovery Care', ar: 'العناية بالتهدئة والتعافي' },
    ],
    popularDevices: {
      title: { zh: '相关激光及能量设备', ko: '관련 레이저·에너지 기반 기기', en: 'Related Laser & Energy-Based Devices', ar: 'أجهزة الليزر والطاقة ذات الصلة' },
      items: [
        { name: { zh: 'POTENZA 黄金射频微针', ko: '포텐자 POTENZA', en: 'POTENZA RF Microneedling', ar: 'POTENZA RF Microneedling' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'SYLFIRM X 黄金微针', ko: '실펌X SYLFIRM X', en: 'SYLFIRM X RF Microneedling', ar: 'SYLFIRM X RF Microneedling' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Secret RF 射频微针', ko: '시크릿RF Secret RF', en: 'Secret RF Microneedling', ar: 'Secret RF Microneedling' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Genius RF 射频微针', ko: '지니어스 Genius', en: 'Genius RF Microneedling', ar: 'Genius RF Microneedling' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Morpheus8 射频微针', ko: '모피어스8 Morpheus8', en: 'Morpheus8 RF Microneedling', ar: 'Morpheus8 RF Microneedling' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Fraxel 飞梭点阵激光', ko: '프락셀 Fraxel', en: 'Fraxel Fractional Laser', ar: 'Fraxel Fractional Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'MOSAIC 点阵激光', ko: '모자이크 MOSAIC', en: 'MOSAIC Fractional Laser', ar: 'MOSAIC Fractional Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Clear + Brilliant 嫩肤激光', ko: '클리어앤브릴리언트 Clear + Brilliant', en: 'Clear + Brilliant Laser', ar: 'Clear + Brilliant Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'PicoSure Pro 皮秒激光', ko: '피코슈어 프로 PicoSure Pro', en: 'PicoSure Pro', ar: 'PicoSure Pro' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'PicoWay 超皮秒激光', ko: '피코웨이 PicoWay', en: 'PicoWay', ar: 'PicoWay' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'HALO 混合点阵激光', ko: '할로 HALO', en: 'HALO Hybrid Fractional Laser', ar: 'HALO Hybrid Fractional Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'LASEMD ULTRA 铥激光', ko: '라셈드 울트라 LASEMD ULTRA', en: 'LASEMD ULTRA', ar: 'LASEMD ULTRA' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'eCO2 二氧化碳点阵激光', ko: 'eCO2', en: 'eCO2 Fractional CO2 Laser', ar: 'eCO2 Fractional CO2 Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'UltraPulse 超脉冲二氧化碳激光', ko: '울트라펄스 UltraPulse', en: 'UltraPulse CO2 Laser', ar: 'UltraPulse CO2 Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
        { name: { zh: 'Fotona Er:YAG 铒激光', ko: '포토나 Er:YAG', en: 'Fotona Er:YAG Laser', ar: 'Fotona Er:YAG Laser' }, desc: { zh: '', ko: '', en: '', ar: '' } },
      ],
      caution: {
        zh: '毛孔及肤质治疗通常不会只依赖单一设备，而是根据皮肤状态和改善目标，选择适合的设备及治疗方式，必要时进行联合治疗。',
        ko: '모공과 피부결 치료는 특정 장비 하나만으로 결정하기보다 피부 상태와 개선 목표에 따라 적합한 장비와 시술을 선택하거나 병행합니다.',
        en: "Pore and skin-texture treatment usually isn't limited to a single device — the appropriate device and treatment method are chosen, or combined when needed, based on skin condition and treatment goals.",
        ar: 'عادةً لا يعتمد علاج المسام وملمس البشرة على جهاز واحد فقط، بل يتم اختيار الجهاز وطريقة العلاج المناسبة أو الجمع بينها عند الحاجة، بناءً على حالة البشرة وأهداف التحسين.',
      },
    },
    docKeys: ['skinTreatmentAfter', 'skinBoosterAfter'],
  },
  {
    id: 'skin-boosters-rejuran',
    image: '/keyword-tiles/skin-boosters-rejuran.jpg',
    title: {
      zh: '皮肤助推剂 · 皮肤再生',
      ko: '스킨부스터 · 피부재생',
      en: 'Skin Boosters & Rejuran',
      ar: 'معززات البشرة وريجوران',
    },
    description: {
      zh: '皮肤助推剂是一种以改善皮肤内部水分、肤质、弹性、细纹、光泽以及整体皮肤状态为目标的注射式治疗项目。根据产品不同，其成分和作用机制也有所差异，主要成分包括透明质酸、PN/PDRN、氨基酸、肽、胶原再生成分等。需根据个人皮肤状况及期望改善的方向，选择适合自己的产品。',
      ko: '스킨부스터는 피부 속 수분, 피부결, 탄력, 잔주름, 광채와 전반적인 피부 컨디션 개선을 목적으로 하는 주사 시술입니다. 제품에 따라 히알루론산, PN/PDRN, 아미노산, 펩타이드, 콜라겐 재생 성분 등 구성과 작용 방식이 다르며, 피부 상태와 원하는 개선 방향에 따라 적합한 제품을 선택합니다.',
      en: 'Water-glow injections, Rejuran, and skin booster treatments are commonly included in consultations for skin dryness, fine lines, skin texture, radiance, skin recovery capacity, and anti-aging appearance care. The specific ingredients, injection method, and recovery response can vary by hospital and product.',
      ar: 'غالباً ما تُدرج حقن الترطيب المضيئة وريجوران ومعززات البشرة ضمن استشارات جفاف البشرة والخطوط الدقيقة وملمس البشرة والإشراقة وقدرة البشرة على التعافي والعناية بمظهر مكافحة الشيخوخة. قد تختلف المكونات المحددة وطريقة الحقن واستجابة التعافي حسب المستشفى والمنتج.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: 'PN/PDRN系列皮肤再生', ko: 'PN/PDRN 계열 피부재생', en: 'Water-glow injections', ar: 'حقن الترطيب المضيئة' },
      { zh: '透明质酸补水·光泽助推剂', ko: '히알루론산 수분·광채 부스터', en: 'Rejuran', ar: 'ريجوران' },
      { zh: '胶原再生型皮肤助推剂', ko: '콜라겐 재생형 스킨부스터', en: 'Skin boosters', ar: 'معززات البشرة' },
      { zh: '氨基酸·肽类生物复活疗法', ko: '아미노산·펩타이드 바이오리바이탈라이제이션', en: 'PN/PDRN-based skin care', ar: 'العناية بالبشرة القائمة على PN/PDRN' },
      { zh: '个性化定制水光针', ko: '맞춤형 물광주사', en: 'Hyaluronic acid-based hydrating injections', ar: 'حقن الترطيب القائمة على حمض الهيالورونيك' },
      { zh: 'PRP/PRF自体血液基皮肤再生', ko: 'PRP/PRF 자가혈 기반 피부재생', en: 'Collagen regeneration skin care', ar: 'العناية بالبشرة لتجديد الكولاجين' },
      { zh: '与激光·射频治疗联用的修复·恢复管理', ko: '레이저·RF 시술과 병행하는 재생·회복 관리', en: 'Autologous blood-based skin regeneration care', ar: 'العناية بتجديد البشرة القائمة على الدم الذاتي' },
    ],
    productGroupsLabel: {
      zh: '代表性皮肤助推剂 · 皮肤再生产品',
      ko: '대표 스킨부스터 · 피부재생 제품',
      en: '',
      ar: '',
    },
    productGroups: [
      {
        label: { zh: 'PN · PDRN系列', ko: 'PN · PDRN 계열', en: '', ar: '' },
        items: [
          { zh: 'REJURAN 丽珠兰（韩国）', ko: 'REJURAN 리쥬란 (한국)', en: '', ar: '' },
          { zh: 'PLINEST 普丽斯特（意大利）', ko: 'PLINEST 플리네스트 (이탈리아)', en: '', ar: '' },
          { zh: 'Placentex 胎盘素 · PDRN（意大利）', ko: 'Placentex 플라센텍스 · PDRN (이탈리아)', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '胶原再生系列', ko: '콜라겐 재생 계열', en: '', ar: '' },
        items: [
          { zh: 'JUVELOOK 珠维露 · PDLLA + HA（韩国）', ko: 'JUVELOOK 쥬베룩 · PDLLA + HA (한국)', en: '', ar: '' },
          { zh: 'JUVELOOK Volume / LENISNA 珠维露容积 · 蕾妮丝娜（韩国）', ko: 'JUVELOOK Volume / LENISNA 쥬베룩 볼륨 · 레니스나 (한국)', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '透明质酸 · 补水助推剂系列', ko: '히알루론산 · 수분 부스터 계열', en: '', ar: '' },
        items: [
          { zh: 'Restylane Skinboosters 瑞蓝皮肤助推剂（瑞典）', ko: 'Restylane Skinboosters 레스틸렌 스킨부스터 (스웨덴)', en: '', ar: '' },
          { zh: 'TEOSYAL Redensity 1 缇奥希 红密度1（瑞士）', ko: 'TEOSYAL Redensity 1 테오시알 레덴시티 1 (스위스)', en: '', ar: '' },
          { zh: 'SKINVIVE by JUVÉDERM 乔雅登·肤活（美国）', ko: 'SKINVIVE by JUVÉDERM 스킨바이브 (미국)', en: '', ar: '' },
          { zh: 'PROFHILO 菲洛（瑞士IBSA）', ko: 'PROFHILO 프로파일로 (스위스 IBSA)', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '复合 · 生物复活疗法系列', ko: '복합 · 바이오리바이탈라이제이션 계열', en: '', ar: '' },
        items: [
          { zh: 'NCTF 135 HA（法国）', ko: 'NCTF 135 HA (프랑스)', en: '', ar: '' },
          { zh: 'JALUPRO / JALUPRO HMW / Super Hydro（瑞士）', ko: 'JALUPRO / JALUPRO HMW / Super Hydro (스위스)', en: '', ar: '' },
          { zh: 'SUNEKOS 索妮蔻（意大利）', ko: 'SUNEKOS 수네코스 (이탈리아)', en: '', ar: '' },
        ],
      },
    ],
    explainerTitle: {
      zh: '什么叫水光针？',
      ko: '물광주사란?',
      en: '',
      ar: '',
    },
    explainerBody: {
      zh: '在韩国常说的"水光针"，并非指某一特定产品名称，而往往泛指以提升皮肤水分和光泽度为目标的注射类项目。\n\n其基础成分多为透明质酸，同时可根据需要搭配PN/PDRN、氨基酸、维生素等多种成分。不同医院和医生所使用的产品、成分配比、注射深度及方式都可能存在差异。因此，即便都叫"水光针"，实际治疗内容也可能因机构不同而有所区别。\n\n皮肤助推剂因各产品的成分与特性迥异，务必在确认自身皮肤状态、改善目标、治疗部位等信息后，再选择合适的产品和治疗方案，这一点十分重要。',
      ko: "한국에서 흔히 말하는 '물광주사'는 하나의 특정 제품명을 의미하기보다 피부 수분과 광채 개선을 목적으로 하는 주사 시술을 넓게 부르는 경우가 많습니다.\n\n히알루론산을 기본으로 PN/PDRN, 아미노산, 비타민 등 다양한 성분을 조합할 수 있으며, 병원과 의료진마다 사용하는 제품, 성분의 조합과 비율, 주입 깊이와 방식이 달라질 수 있습니다. 따라서 같은 '물광주사'라는 이름이라도 실제 시술 내용은 병원별로 다를 수 있습니다.\n\n스킨부스터는 제품의 성분과 특성이 서로 다르므로 피부 상태, 개선 목표, 시술 부위 등을 확인한 후 적합한 제품과 시술 방법을 선택하는 것이 중요합니다.",
      en: '',
      ar: '',
    },
    docKeys: ['skinBoosterAfter', 'skinTreatmentAfter'],
  },
  {
    id: 'botox-fillers',
    image: '/keyword-tiles/botox-fillers.jpg',
    title: {
      zh: '肉毒杆菌毒素 · 玻尿酸填充剂',
      ko: '보툴리눔 톡신 · 필러',
      en: 'Botulinum Toxin & Fillers',
      ar: 'توكسين البوتولينوم والفيلر',
    },
    description: {
      zh: '肉毒杆菌毒素与玻尿酸填充剂，是可用于改善表情纹、面部轮廓、容积流失、凹陷、唇部及下颌线条等多种部位的代表性注射类项目。根据治疗部位及期望的变化，选择适合的产品与注射方式，是取得理想效果的关键。',
      ko: '보툴리눔 톡신과 필러는 표정주름, 얼굴 윤곽, 볼륨 감소, 꺼짐, 입술 및 턱 라인 등 다양한 부위에 적용할 수 있는 대표적인 주사 시술입니다. 시술 부위와 원하는 변화에 따라 적합한 제품과 주입 방법을 선택합니다.',
      en: "Botulinum toxin and hyaluronic acid fillers are two of the most common injectable treatments, used across a wide range of areas — dynamic wrinkles, facial contour, volume loss, hollowing, lips, and the jawline. The right product and injection method are chosen based on the treatment area and the change you're hoping for.",
      ar: 'يُعدّ توكسين البوتولينوم والفيلر من أكثر العلاجات الحقنية شيوعاً، ويمكن استخدامهما في مناطق متعددة مثل التجاعيد التعبيرية وملامح الوجه وفقدان الحجم والتجويف والشفاه وخط الفك. يتم اختيار المنتج المناسب وطريقة الحقن بناءً على منطقة العلاج والنتيجة المرغوبة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [],
    directionGroups: [
      {
        label: { zh: '肉毒杆菌毒素', ko: '보툴리눔 톡신', en: 'Botulinum Toxin', ar: 'توكسين البوتولينوم' },
        items: [
          { zh: '额头 · 眉间 · 眼周等表情纹', ko: '이마 · 미간 · 눈가 등 표정주름', en: "Forehead · glabella · crow's feet (expression wrinkles)", ar: 'الجبهة · بين الحاجبين · محيط العينين (تجاعيد تعبيرية)' },
          { zh: '方下颌 · 下颌线条', ko: '사각턱 · 턱라인', en: 'Masseter (jaw) · jawline', ar: 'الفك (تصغير عضلة المضغ) · خط الفك' },
          { zh: '斜方肌', ko: '승모근', en: 'Trapezius', ar: 'العضلة شبه المنحرفة (الترابيزيوس)' },
          { zh: '小腿', ko: '종아리', en: 'Calf', ar: 'الساق' },
          { zh: '皮肤肉毒素（微滴肉毒）', ko: '스킨보톡스', en: 'Skin Botox (micro-Botox)', ar: 'بوتوكس البشرة (سكين بوتوكس)' },
          { zh: '多汗症肉毒素', ko: '다한증 보톡스', en: 'Hyperhidrosis (excessive sweating) Botox', ar: 'بوتوكس فرط التعرق' },
        ],
      },
      {
        label: { zh: '玻尿酸填充剂', ko: '필러', en: 'Fillers', ar: 'الفيلر' },
        items: [
          { zh: '额头 · 太阳穴容积填充', ko: '이마 · 관자 볼륨', en: 'Forehead · temple volume', ar: 'حجم الجبهة · الصدغ' },
          { zh: '眼底 · 苹果肌', ko: '눈밑 · 앞볼', en: 'Under-eye · midface (apple cheek)', ar: 'تحت العين · الخد الأمامي' },
          { zh: '法令纹', ko: '팔자주름', en: 'Nasolabial folds', ar: 'خطوط الابتسامة' },
          { zh: '唇部', ko: '입술', en: 'Lips', ar: 'الشفاه' },
          { zh: '下巴尖 · 下颌线条', ko: '턱끝 · 턱라인', en: 'Chin tip · jawline', ar: 'طرف الذقن · خط الفك' },
          { zh: '鼻部 · 面部轮廓', ko: '코 · 얼굴 윤곽', en: 'Nose · facial contour', ar: 'الأنف · ملامح الوجه' },
          { zh: '各部位容积补充及不对称改善', ko: '부위별 볼륨 및 비대칭 개선', en: 'Volume restoration & asymmetry correction by area', ar: 'استعادة الحجم وتصحيح عدم التماثل حسب المنطقة' },
        ],
      },
    ],
    productGroups: [
      {
        label: { zh: '代表性肉毒杆菌毒素品牌', ko: '대표 보툴리눔 톡신 브랜드', en: 'Leading Botulinum Toxin Brands', ar: 'أبرز العلامات التجارية لتوكسين البوتولينوم' },
        items: [
          { zh: 'BOTOX® — 艾尔建美学 / 艾伯维（美国）【保妥适】', ko: 'BOTOX® — Allergan Aesthetics / AbbVie (미국)', en: 'BOTOX® — Allergan Aesthetics / AbbVie (USA)', ar: 'BOTOX® — Allergan Aesthetics / AbbVie (الولايات المتحدة)' },
          { zh: 'XEOMIN® — 麦氏（德国）【吉适】', ko: 'XEOMIN® — Merz (독일)', en: 'XEOMIN® — Merz (Germany)', ar: 'XEOMIN® — Merz (ألمانيا)' },
          { zh: 'NABOTA® — 大熊制药（韩国）【娜柏塔】', ko: 'NABOTA® — Daewoong Pharmaceutical (한국)', en: 'NABOTA® — Daewoong Pharmaceutical (Korea)', ar: 'NABOTA® — Daewoong Pharmaceutical (كوريا)' },
          { zh: 'BOTULAX® / LETYBO® — 秀杰（韩国）【铂妥乐 / 乐提葆】', ko: 'BOTULAX® / LETYBO® — Hugel (한국)', en: 'BOTULAX® / LETYBO® — Hugel (Korea)', ar: 'BOTULAX® / LETYBO® — Hugel (كوريا)' },
          { zh: 'CORETOX® — 美得妥（韩国）【科妥】', ko: 'CORETOX® — Medytox (한국)', en: 'CORETOX® — Medytox (Korea)', ar: 'CORETOX® — Medytox (كوريا)' },
        ],
      },
      {
        label: { zh: '代表性玻尿酸填充剂品牌', ko: '대표 히알루론산 필러 브랜드', en: 'Leading Hyaluronic Acid Filler Brands', ar: 'أبرز العلامات التجارية لفيلر حمض الهيالورونيك' },
        items: [
          { zh: 'JUVÉDERM® — 艾尔建美学 / 艾伯维（美国）【乔雅登】', ko: 'JUVÉDERM® — Allergan Aesthetics / AbbVie (미국)', en: 'JUVÉDERM® — Allergan Aesthetics / AbbVie (USA)', ar: 'JUVÉDERM® — Allergan Aesthetics / AbbVie (الولايات المتحدة)' },
          { zh: 'Restylane® — 高德美（瑞士）【瑞蓝】', ko: 'Restylane® — Galderma (스위스)', en: 'Restylane® — Galderma (Switzerland)', ar: 'Restylane® — Galderma (سويسرا)' },
          { zh: 'YVOIRE® — LG化学（韩国）【伊婉】', ko: 'YVOIRE® — LG Chem (한국)', en: 'YVOIRE® — LG Chem (Korea)', ar: 'YVOIRE® — LG Chem (كوريا)' },
          { zh: 'NEURAMIS® — 美得妥（韩国）【纽拉美斯】', ko: 'NEURAMIS® — Medytox (한국)', en: 'NEURAMIS® — Medytox (Korea)', ar: 'NEURAMIS® — Medytox (كوريا)' },
          { zh: 'REVOLAX® — 秀杰（韩国）【瑞芙拉】', ko: 'REVOLAX® — Hugel (한국)', en: 'REVOLAX® — Hugel (Korea)', ar: 'REVOLAX® — Hugel (كوريا)' },
        ],
      },
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
      ko: '흑자 · 여드름 · 흉터 · 홍조',
      en: 'Dark Spot & Scar Removal',
      ar: 'إزالة البقع الداكنة والندبات',
    },
    description: {
      zh: '痘痘、痘印、痘坑、皮脂分泌过多、反复炎症等问题，通常需要根据炎症状态、皮肤屏障、既往治疗经历和可接受的恢复期来整理咨询方向。',
      ko: '흑자와 잡티, 반복되는 여드름, 붉은 여드름 자국, 패인 흉터는 각각 원인이 다릅니다. 색소의 깊이, 피지 분비, 염증과 혈관 반응, 흉터의 형태와 깊이를 확인한 후 피부 상태에 맞는 치료 방법을 선택합니다.',
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
    directionGroups: [
      {
        label: { zh: '', ko: '흑자 · 잡티 · 색소', en: '', ar: '' },
        items: [
          { zh: '', ko: '흑자·검버섯 집중 제거', en: '', ar: '' },
          { zh: '', ko: '피코 레이저 색소치료', en: '', ar: '' },
          { zh: '', ko: '색소 토닝', en: '', ar: '' },
          { zh: '', ko: '표피·진피 색소에 따른 맞춤 레이저', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '여드름 · 피지 · 염증', en: '', ar: '' },
        items: [
          { zh: '', ko: '피지선 타깃 여드름 레이저', en: '', ar: '' },
          { zh: '', ko: '염증성 여드름 에너지 치료', en: '', ar: '' },
          { zh: '', ko: '여드름 압출 및 피부관리', en: '', ar: '' },
          { zh: '', ko: 'RF 기반 여드름 치료', en: '', ar: '' },
          { zh: '', ko: '필요에 따른 약물치료 병행', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '홍조 · 여드름 붉은 자국', en: '', ar: '' },
        items: [
          { zh: '', ko: '혈관 레이저', en: '', ar: '' },
          { zh: '', ko: '여드름 후 홍반(PIE) 치료', en: '', ar: '' },
          { zh: '', ko: '반복되는 붉은 자국 개선', en: '', ar: '' },
          { zh: '', ko: '피부 혈관 및 홍조 관리', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '패인 여드름 흉터', en: '', ar: '' },
        items: [
          { zh: '', ko: '자가진피재생', en: '', ar: '' },
          { zh: '', ko: '서브시전', en: '', ar: '' },
          { zh: '', ko: 'RF 마이크로니들', en: '', ar: '' },
          { zh: '', ko: '프락셔널 CO₂ 레이저', en: '', ar: '' },
          { zh: '', ko: '비박피 프락셔널 레이저', en: '', ar: '' },
          { zh: '', ko: '피코 프락셔널', en: '', ar: '' },
          { zh: '', ko: '콜라겐 재생 치료', en: '', ar: '' },
        ],
      },
    ],
    productGroupsLabel: {
      zh: '',
      ko: '관련 레이저 · 에너지 및 재생 기기',
      en: '',
      ar: '',
    },
    productGroups: [
      {
        label: { zh: '', ko: '흑자 · 색소', en: '', ar: '' },
        items: [
          { zh: '', ko: 'REEPOT 리팟', en: '', ar: '' },
          { zh: '', ko: 'PicoSure Pro', en: '', ar: '' },
          { zh: '', ko: 'PicoWay', en: '', ar: '' },
          { zh: '', ko: 'Hollywood Spectra', en: '', ar: '' },
          { zh: '', ko: 'RevLite SI', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '여드름 · 피지선', en: '', ar: '' },
        items: [
          { zh: '', ko: 'Accure Acne Laser', en: '', ar: '' },
          { zh: '', ko: 'AviClear', en: '', ar: '' },
          { zh: '', ko: 'NEOBEAM 1450', en: '', ar: '' },
          { zh: '', ko: 'Hollywood Spectra', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '홍조 · 붉은 여드름 자국', en: '', ar: '' },
        items: [
          { zh: '', ko: 'Vbeam', en: '', ar: '' },
          { zh: '', ko: 'excel V+', en: '', ar: '' },
          { zh: '', ko: '혈관 레이저 PDL 계열', en: '', ar: '' },
        ],
      },
      {
        label: { zh: '', ko: '패인 흉터 · 피부 재생', en: '', ar: '' },
        items: [
          { zh: '', ko: 'JUVGEN 쥬브젠 자가진피재생', en: '', ar: '' },
          { zh: '', ko: 'POTENZA', en: '', ar: '' },
          { zh: '', ko: 'Secret RF', en: '', ar: '' },
          { zh: '', ko: 'eCO2 3D', en: '', ar: '' },
          { zh: '', ko: 'MOSAIC 3D', en: '', ar: '' },
          { zh: '', ko: 'PicoSure Pro', en: '', ar: '' },
        ],
      },
    ],
    note: {
      zh: '痘痘和痘坑通常需要多次治疗和长期管理，短期访韩客户应先确认治疗目标和可停留时间。',
      ko: '여드름 치료는 현재 올라온 염증을 줄이는 것뿐 아니라 피지 조절, 붉은 자국, 색소침착, 패인 흉터까지 피부 상태에 따라 단계적으로 접근할 수 있습니다.',
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
    note: {
      zh: '身体皮肤管理中，色素、疤痕、妊娠纹等项目通常需要多次治疗，短期访韩时不宜承诺一次改善。',
      ko: '바디 피부관리 중 색소, 흉터, 튼살 등은 보통 반복 치료가 필요하므로, 단기 방한 시 한 번의 개선을 약속해서는 안 됩니다.',
      en: 'For body skin care, items such as pigmentation, scars, and stretch marks usually require repeated treatment, so a single-session improvement should not be promised during a short visit to Korea.',
      ar: 'بالنسبة للعناية بجلد الجسم، تتطلب عناصر مثل التصبغ والندبات وعلامات التمدد عادةً علاجاً متكرراً، لذا لا ينبغي الوعد بتحسن في جلسة واحدة خلال زيارة قصيرة لكوريا.',
    },
    docKeys: ['skinTreatmentAfter', 'scarCareGuide'],
  },
]
