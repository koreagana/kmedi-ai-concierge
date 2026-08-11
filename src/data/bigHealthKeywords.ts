import { WECHAT_BIZ_URL } from './contacts'

export interface LocalizedText {
  zh: string
  ko: string
  en: string
  ar: string
}

export interface BigHealthDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

export const BIG_HEALTH_DOC_BUTTONS = {
  functionalIntake: {
    label: {
      zh: '填写功能医学问诊表',
      ko: '기능의학 문진표 작성하기',
      en: 'Fill Out the Functional Medicine Intake Form',
      ar: 'تعبئة استمارة الطب الوظيفي',
    },
    kind: 'route',
    target: '/intake/functional/',
  },
  healthCheckupPrep: {
    label: {
      zh: '查看健康检查前准备事项',
      ko: '건강검진 전 준비사항 보기',
      en: 'View Health Checkup Preparation Guide',
      ar: 'عرض إرشادات التحضير للفحص الصحي',
    },
    kind: 'route',
    target: '/prep/health-checkup-before/',
  },
  bloodTestPrep: {
    label: {
      zh: '查看血液检查前注意事项',
      ko: '혈액검사 전 안내 보기',
      en: 'View Blood Test Preparation Guide',
      ar: 'عرض إرشادات التحضير لفحص الدم',
    },
    kind: 'route',
    target: '/prep/blood-test-before/',
  },
  colonoscopyPrep: {
    label: {
      zh: '查看肠镜检查前准备事项',
      ko: '대장내시경 전 준비사항 보기',
      en: 'View Colonoscopy Preparation Guide',
      ar: 'عرض إرشادات التحضير لتنظير القولون',
    },
    kind: 'route',
    target: '/prep/colonoscopy-before/',
  },
  imagingPrep: {
    label: {
      zh: '查看CT/MRI检查前确认表',
      ko: 'CT/MRI 검사 전 확인표 보기',
      en: 'View CT/MRI Pre-Exam Checklist',
      ar: 'عرض قائمة التحقق قبل فحص CT/MRI',
    },
    kind: 'route',
    target: '/prep/imaging-before/',
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
} satisfies Record<string, BigHealthDocButton>

export type BigHealthDocButtonKey = keyof typeof BIG_HEALTH_DOC_BUTTONS

export type BigHealthBullet = LocalizedText

export interface BigHealthApprovedProduct {
  name: LocalizedText
  desc: LocalizedText
}

export interface BigHealthApprovedProductsBlock {
  title: LocalizedText
  items: BigHealthApprovedProduct[]
  /** Caution shown right under the product list (used by regenerative medicine consult). */
  caution: LocalizedText
}

export interface BigHealthKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  description: LocalizedText
  /** Optional secondary note shown right under the description (used by regenerative medicine consult). */
  note?: LocalizedText
  /** Optional "approved products" block shown between the note and the tests list (used by regenerative medicine consult). */
  approvedProducts?: BigHealthApprovedProductsBlock
  testsLabel: LocalizedText
  tests: BigHealthBullet[]
  directionLabel: LocalizedText
  direction: BigHealthBullet[]
  /** Item-specific prep documents. The WeChat consult button is always appended separately. */
  docKeys: BigHealthDocButtonKey[]
  /** Extra disclaimer shown after the doc buttons (currently required for regenerative medicine consult). */
  extraDisclaimer?: LocalizedText
}

const TESTS_LABEL: LocalizedText = {
  zh: '可能相关检查',
  ko: '관련 가능 검사',
  en: 'Possible Related Tests',
  ar: 'الفحوصات المحتملة ذات الصلة',
}

const DIRECTION_LABEL: LocalizedText = {
  zh: '可能咨询方向',
  ko: '상담 가능 방향',
  en: 'Possible Consultation Directions',
  ar: 'اتجاهات الاستشارة المحتملة',
}

export const BIG_HEALTH_DOC_SECTION_LABEL: LocalizedText = {
  zh: '相关准备文档',
  ko: '관련 준비문서',
  en: 'Related Preparation Documents',
  ar: 'المستندات التحضيرية ذات الصلة',
}

export const BIG_HEALTH_PILLS_PROMPT: LocalizedText = {
  zh: '请选择您关心的方向',
  ko: '관심 있는 방향을 선택해 주세요',
  en: 'Please select the topic you are most interested in',
  ar: 'يرجى اختيار الموضوع الذي يهمك',
}

/** Shared "read more" toggle label for the collapsible detail section under each keyword card. */
export const BIG_HEALTH_MORE_LABEL: LocalizedText = {
  zh: '查看详细内容',
  ko: '자세히 보기',
  en: 'View details',
  ar: 'عرض التفاصيل',
}

export const BIG_HEALTH_SECTION = {
  title: {
    zh: '大健康 · 抗衰老管理',
    ko: '항노화·건강관리',
    en: 'Anti-Aging & Health Management',
    ar: 'مكافحة الشيخوخة وإدارة الصحة',
  } as LocalizedText,
  desc: {
    zh: '不是单一项目，而是从疲劳、睡眠、肠道、代谢、激素和再生医学咨询等方向，了解身体状态并整理适合的韩国医疗咨询路径。',
    ko: '단일 시술이 아니라 피로, 수면, 장 건강, 대사, 호르몬, 재생의학 상담 등을 통해 현재 몸 상태를 이해하고 적합한 한국 의료 상담 방향을 정리합니다.',
    en: 'Not a single procedure, but a way to understand your body through fatigue, sleep, gut health, metabolism, hormones, and regenerative medicine consultation — and map out the right path for medical consultation in Korea.',
    ar: 'ليست إجراءً واحداً، بل طريقة لفهم حالة جسمك من خلال التعب والنوم وصحة الأمعاء والتمثيل الغذائي والهرمونات واستشارة الطب التجديدي، وتحديد المسار المناسب للاستشارة الطبية في كوريا.',
  } as LocalizedText,
  safety: [
    {
      zh: '以下内容仅用于韩国医疗咨询前的信息整理，不代替医生诊断。',
      ko: '아래 내용은 한국 의료상담 전 정보 정리를 위한 참고 안내이며 의사의 진단을 대신하지 않습니다.',
      en: 'The following information is for organizing your thoughts before a medical consultation in Korea, and does not replace a physician\'s diagnosis.',
      ar: 'المعلومات التالية مخصصة لتنظيم أفكارك قبل الاستشارة الطبية في كوريا، ولا تحل محل تشخيص الطبيب.',
    },
    {
      zh: '具体检查项目和治疗方向，需要由正规医疗机构和专业医生判断。',
      ko: '구체적인 검사 항목과 치료 방향은 정규 의료기관과 전문의가 판단해야 합니다.',
      en: 'Specific tests and treatment directions must be determined by a licensed medical institution and a qualified physician.',
      ar: 'يجب أن تحدد الفحوصات المحددة واتجاه العلاج مؤسسة طبية مرخصة وطبيب مختص.',
    },
  ] as LocalizedText[],
}

export const BIG_HEALTH_KEYWORDS: BigHealthKeyword[] = [
  {
    id: 'chronic-fatigue',
    image: '/keyword-tiles/chronic-fatigue.jpg',
    title: {
      zh: '慢性疲劳',
      ko: '만성피로',
      en: 'Chronic Fatigue',
      ar: 'التعب المزمن',
    },
    description: {
      zh: '长期疲劳、精力下降、恢复慢、注意力下降、睡醒后仍然疲惫等问题，可能与睡眠、营养状态、贫血、甲状腺、血糖、肝肾功能、慢性炎症或压力状态等多种因素有关。',
      ko: '장기간 피로, 에너지 저하, 회복 지연, 집중력 저하, 자고 일어나도 피곤한 상태 등은 수면, 영양 상태, 빈혈, 갑상선, 혈당, 간·신장 기능, 만성 염증 또는 스트레스 상태 등 여러 요인과 관련될 수 있습니다.',
      en: 'Long-term fatigue, low energy, slow recovery, poor concentration, or waking up tired can be related to sleep, nutritional status, anemia, thyroid function, blood sugar, liver and kidney function, chronic inflammation, or stress.',
      ar: 'قد يرتبط التعب طويل الأمد وانخفاض الطاقة وبطء التعافي وضعف التركيز أو الشعور بالتعب عند الاستيقاظ بعوامل مثل النوم والحالة الغذائية وفقر الدم ووظائف الغدة الدرقية ونسبة السكر في الدم ووظائف الكبد والكلى والالتهاب المزمن أو التوتر.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사', en: 'Basic blood test', ar: 'فحص دم أساسي' },
      { zh: '贫血相关检查', ko: '빈혈 관련 검사', en: 'Anemia-related test', ar: 'فحص متعلق بفقر الدم' },
      { zh: '铁蛋白与铁代谢检查', ko: '페리틴 및 철 대사 검사', en: 'Ferritin and iron metabolism test', ar: 'فحص الفيريتين وأيض الحديد' },
      { zh: '维生素D检查', ko: '비타민D 검사', en: 'Vitamin D test', ar: 'فحص فيتامين د' },
      { zh: '维生素B群相关评估', ko: '비타민B군 관련 평가', en: 'Vitamin B group evaluation', ar: 'تقييم فيتامينات مجموعة B' },
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사', en: 'Thyroid function test', ar: 'فحص وظائف الغدة الدرقية' },
      { zh: '空腹血糖与糖化血红蛋白', ko: '공복혈당 및 당화혈색소', en: 'Fasting glucose and HbA1c', ar: 'سكر الدم الصائم والهيموغلوبين السكري' },
      { zh: '肝功能与肾功能检查', ko: '간기능 및 신장기능 검사', en: 'Liver and kidney function test', ar: 'فحص وظائف الكبد والكلى' },
      { zh: '炎症指标检查', ko: '염증 수치 검사', en: 'Inflammation marker test', ar: 'فحص مؤشرات الالتهاب' },
      { zh: '营养状态评估', ko: '영양 상태 평가', en: 'Nutritional status evaluation', ar: 'تقييم الحالة الغذائية' },
      { zh: '必要时进行功能医学相关评估', ko: '필요한 경우 기능의학 관련 평가', en: 'Functional medicine evaluation, if needed', ar: 'تقييم الطب الوظيفي عند الحاجة' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '疲劳原因整理', ko: '피로 원인 정리', en: 'Organizing the causes of fatigue', ar: 'تنظيم أسباب التعب' },
      { zh: '睡眠与生活节奏评估', ko: '수면 및 생활 리듬 평가', en: 'Sleep and daily rhythm evaluation', ar: 'تقييم النوم والإيقاع اليومي' },
      { zh: '营养状态与缺乏因素确认', ko: '영양 상태 및 결핍 요인 확인', en: 'Confirming nutritional status and deficiencies', ar: 'تأكيد الحالة الغذائية وأوجه النقص' },
      { zh: '抗氧化与营养补充咨询', ko: '항산화 및 영양 보충 상담', en: 'Antioxidant and nutritional supplement consultation', ar: 'استشارة مضادات الأكسدة والمكملات الغذائية' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담', en: 'Functional medicine testing consultation', ar: 'استشارة فحوصات الطب الوظيفي' },
      { zh: '生活方式管理咨询', ko: '생활습관 관리 상담', en: 'Lifestyle management consultation', ar: 'استشارة إدارة نمط الحياة' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'sleep-issue',
    image: '/keyword-tiles/sleep-issue.jpg',
    title: {
      zh: '睡眠问题',
      ko: '수면 문제',
      en: 'Sleep Issues',
      ar: 'مشاكل النوم',
    },
    description: {
      zh: '入睡困难、浅眠、多梦、早醒、睡醒后仍疲劳、白天困倦等情况，可能与压力、自律神经、激素变化、血糖波动、生活节奏、咖啡因摄入或身体代谢状态有关。',
      ko: '잠들기 어려움, 얕은 수면, 꿈이 많음, 이른 기상, 자고 일어나도 피곤함, 낮 동안 졸림 등은 스트레스, 자율신경, 호르몬 변화, 혈당 변동, 생활 리듬, 카페인 섭취 또는 신체 대사 상태와 관련될 수 있습니다.',
      en: 'Difficulty falling asleep, light sleep, frequent dreaming, early waking, waking up tired, or daytime drowsiness can be related to stress, the autonomic nervous system, hormonal changes, blood sugar fluctuations, daily rhythm, caffeine intake, or metabolic status.',
      ar: 'قد ترتبط صعوبة النوم أو النوم الخفيف أو كثرة الأحلام أو الاستيقاظ المبكر أو الشعور بالتعب بعد النوم أو النعاس أثناء النهار بعوامل مثل التوتر والجهاز العصبي اللاإرادي والتغيرات الهرمونية وتقلبات سكر الدم والإيقاع اليومي واستهلاك الكافيين أو الحالة الأيضية للجسم.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사', en: 'Basic blood test', ar: 'فحص دم أساسي' },
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사', en: 'Thyroid function test', ar: 'فحص وظائف الغدة الدرقية' },
      { zh: '血糖与胰岛素相关检查', ko: '혈당 및 인슐린 관련 검사', en: 'Blood sugar and insulin-related test', ar: 'فحص متعلق بسكر الدم والأنسولين' },
      { zh: '维生素D检查', ko: '비타민D 검사', en: 'Vitamin D test', ar: 'فحص فيتامين د' },
      { zh: '铁蛋白与贫血相关检查', ko: '페리틴 및 빈혈 관련 검사', en: 'Ferritin and anemia-related test', ar: 'فحص الفيريتين وفقر الدم' },
      { zh: '激素相关检查', ko: '호르몬 관련 검사', en: 'Hormone-related test', ar: 'فحص متعلق بالهرمونات' },
      { zh: '压力状态相关评估', ko: '스트레스 상태 관련 평가', en: 'Stress status evaluation', ar: 'تقييم حالة التوتر' },
      { zh: '自律神经相关评估，如医院可提供', ko: '병원에서 가능한 경우 자율신경 관련 평가', en: 'Autonomic nervous system evaluation, where available', ar: 'تقييم الجهاز العصبي اللاإرادي إن أمكن' },
      { zh: '睡眠习惯与生活方式问诊', ko: '수면 습관 및 생활습관 문진', en: 'Sleep habits and lifestyle intake interview', ar: 'مقابلة حول عادات النوم ونمط الحياة' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '睡眠模式整理', ko: '수면 패턴 정리', en: 'Organizing sleep patterns', ar: 'تنظيم أنماط النوم' },
      { zh: '压力与自律神经状态咨询', ko: '스트레스 및 자율신경 상태 상담', en: 'Stress and autonomic nervous system consultation', ar: 'استشارة التوتر والجهاز العصبي اللاإرادي' },
      { zh: '咖啡因、饮酒、作息习惯评估', ko: '카페인, 음주, 생활 리듬 평가', en: 'Caffeine, alcohol, and routine habit evaluation', ar: 'تقييم الكافيين والكحول وعادات الروتين' },
      { zh: '营养缺乏因素确认', ko: '영양 결핍 요인 확인', en: 'Confirming nutritional deficiencies', ar: 'تأكيد أوجه النقص الغذائي' },
      { zh: '激素与代谢状态咨询', ko: '호르몬 및 대사 상태 상담', en: 'Hormone and metabolic status consultation', ar: 'استشارة الهرمونات والحالة الأيضية' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담', en: 'Functional medicine testing consultation', ar: 'استشارة فحوصات الطب الوظيفي' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'gut-health',
    image: '/keyword-tiles/gut-health.jpg',
    title: {
      zh: '肠道健康',
      ko: '장 건강',
      en: 'Gut Health',
      ar: 'صحة الأمعاء',
    },
    description: {
      zh: '腹胀、消化不良、便秘、腹泻、胃肠不适、饭后疲劳、排便习惯变化等问题，可能需要结合饮食习惯、肠道状态、炎症反应、营养吸收和必要的内镜检查一起评估。',
      ko: '복부 팽만감, 소화불량, 변비, 설사, 위장 불편감, 식후 피로, 배변 습관 변화 등은 식습관, 장 상태, 염증 반응, 영양 흡수, 필요한 경우 내시경 검사 등을 함께 고려할 수 있습니다.',
      en: 'Bloating, indigestion, constipation, diarrhea, stomach discomfort, post-meal fatigue, or changes in bowel habits may need to be evaluated together with dietary habits, gut condition, inflammatory response, nutrient absorption, and, if necessary, an endoscopic examination.',
      ar: 'قد يحتاج الانتفاخ وعسر الهضم والإمساك والإسهال وعدم الراحة في المعدة والتعب بعد الأكل أو تغيّر عادات التبرز إلى تقييم يشمل العادات الغذائية وحالة الأمعاء والاستجابة الالتهابية وامتصاص العناصر الغذائية، وعند الحاجة، تنظير الجهاز الهضمي.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사', en: 'Basic blood test', ar: 'فحص دم أساسي' },
      { zh: '炎症指标检查', ko: '염증 수치 검사', en: 'Inflammation marker test', ar: 'فحص مؤشرات الالتهاب' },
      { zh: '肝功能与胰腺相关指标', ko: '간기능 및 췌장 관련 지표', en: 'Liver function and pancreas-related markers', ar: 'مؤشرات وظائف الكبد والبنكرياس' },
      { zh: '营养状态评估', ko: '영양 상태 평가', en: 'Nutritional status evaluation', ar: 'تقييم الحالة الغذائية' },
      { zh: '贫血与铁蛋白检查', ko: '빈혈 및 페리틴 검사', en: 'Anemia and ferritin test', ar: 'فحص فقر الدم والفيريتين' },
      { zh: '维生素D与维生素B群相关评估', ko: '비타민D 및 비타민B군 관련 평가', en: 'Vitamin D and vitamin B group evaluation', ar: 'تقييم فيتامين د وفيتامينات مجموعة B' },
      { zh: '大便相关检查，如医院可提供', ko: '병원에서 가능한 경우 대변 관련 검사', en: 'Stool test, where available', ar: 'فحص البراز إن أمكن' },
      { zh: '幽门螺杆菌相关检查，如有需要', ko: '필요한 경우 헬리코박터 관련 검사', en: 'H. pylori test, if needed', ar: 'فحص جرثومة المعدة عند الحاجة' },
      { zh: '胃镜或肠镜相关咨询', ko: '위내시경 또는 대장내시경 관련 상담', en: 'Gastroscopy or colonoscopy consultation', ar: 'استشارة تنظير المعدة أو القولون' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '消化不良与腹胀原因整理', ko: '소화불량 및 복부 팽만 원인 정리', en: 'Organizing the causes of indigestion and bloating', ar: 'تنظيم أسباب عسر الهضم والانتفاخ' },
      { zh: '便秘或腹泻状态评估', ko: '변비 또는 설사 상태 평가', en: 'Evaluating constipation or diarrhea status', ar: 'تقييم حالة الإمساك أو الإسهال' },
      { zh: '饮食习惯与肠道反应整理', ko: '식습관과 장 반응 정리', en: 'Reviewing dietary habits and gut response', ar: 'مراجعة العادات الغذائية واستجابة الأمعاء' },
      { zh: '内镜检查准备咨询', ko: '내시경 검사 준비 상담', en: 'Endoscopy preparation consultation', ar: 'استشارة التحضير للتنظير' },
      { zh: '功能医学肠道健康评估咨询', ko: '기능의학 장 건강 평가 상담', en: 'Functional medicine gut health evaluation consultation', ar: 'استشارة تقييم صحة الأمعاء بالطب الوظيفي' },
      { zh: '营养吸收与生活方式管理咨询', ko: '영양 흡수 및 생활습관 관리 상담', en: 'Nutrient absorption and lifestyle management consultation', ar: 'استشارة امتصاص العناصر الغذائية وإدارة نمط الحياة' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'colonoscopyPrep'],
  },
  {
    id: 'metabolic-management',
    image: '/keyword-tiles/metabolic-management.jpg',
    title: {
      zh: '代谢管理',
      ko: '대사 관리',
      en: 'Metabolic Management',
      ar: 'إدارة التمثيل الغذائي',
    },
    description: {
      zh: '血糖、血脂、脂肪肝、体重变化、腹部脂肪、胰岛素抵抗、糖尿病前期等问题，适合通过血液检查、生活方式评估和必要的医学咨询来了解身体代谢状态。',
      ko: '혈당, 혈중지질, 지방간, 체중 변화, 복부지방, 인슐린 저항성, 당뇨전단계 등은 혈액검사, 생활습관 평가, 필요한 의학 상담을 통해 신체 대사 상태를 확인하는 데 도움이 됩니다.',
      en: 'Blood sugar, cholesterol, fatty liver, weight changes, abdominal fat, insulin resistance, or prediabetes can be better understood through blood tests, lifestyle evaluation, and medical consultation as needed.',
      ar: 'يمكن فهم مستوى سكر الدم والكوليسترول والكبد الدهني وتغيرات الوزن ودهون البطن ومقاومة الأنسولين أو مرحلة ما قبل السكري بشكل أفضل من خلال فحوصات الدم وتقييم نمط الحياة والاستشارة الطبية عند الحاجة.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '空腹血糖', ko: '공복혈당', en: 'Fasting glucose', ar: 'سكر الدم الصائم' },
      { zh: '糖化血红蛋白', ko: '당화혈색소', en: 'HbA1c', ar: 'الهيموغلوبين السكري' },
      { zh: '胰岛素相关检查', ko: '인슐린 관련 검사', en: 'Insulin-related test', ar: 'فحص متعلق بالأنسولين' },
      { zh: '总胆固醇', ko: '총콜레스테롤', en: 'Total cholesterol', ar: 'الكوليسترول الكلي' },
      { zh: 'LDL胆固醇', ko: 'LDL 콜레스테롤', en: 'LDL cholesterol', ar: 'كوليسترول LDL' },
      { zh: 'HDL胆固醇', ko: 'HDL 콜레스테롤', en: 'HDL cholesterol', ar: 'كوليسترول HDL' },
      { zh: '甘油三酯', ko: '중성지방', en: 'Triglycerides', ar: 'الدهون الثلاثية' },
      { zh: '肝功能检查', ko: '간기능 검사', en: 'Liver function test', ar: 'فحص وظائف الكبد' },
      { zh: '脂肪肝相关评估', ko: '지방간 관련 평가', en: 'Fatty liver evaluation', ar: 'تقييم الكبد الدهني' },
      { zh: '肾功能检查', ko: '신장기능 검사', en: 'Kidney function test', ar: 'فحص وظائف الكلى' },
      { zh: '尿酸检查', ko: '요산 검사', en: 'Uric acid test', ar: 'فحص حمض اليوريك' },
      { zh: '体成分检查，如医院可提供', ko: '병원에서 가능한 경우 체성분 검사', en: 'Body composition test, where available', ar: 'فحص تكوين الجسم إن أمكن' },
      { zh: '血压与心血管风险评估', ko: '혈압 및 심혈관 위험 평가', en: 'Blood pressure and cardiovascular risk evaluation', ar: 'تقييم ضغط الدم ومخاطر القلب والأوعية الدموية' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '血糖与血脂状态整理', ko: '혈당 및 혈중지질 상태 정리', en: 'Organizing blood sugar and lipid status', ar: 'تنظيم حالة سكر الدم والدهون' },
      { zh: '脂肪肝与肝功能咨询', ko: '지방간 및 간기능 상담', en: 'Fatty liver and liver function consultation', ar: 'استشارة الكبد الدهني ووظائف الكبد' },
      { zh: '体重变化原因评估', ko: '체중 변화 원인 평가', en: 'Evaluating causes of weight change', ar: 'تقييم أسباب تغير الوزن' },
      { zh: '胰岛素抵抗相关咨询', ko: '인슐린 저항성 관련 상담', en: 'Insulin resistance consultation', ar: 'استشارة مقاومة الأنسولين' },
      { zh: '饮食、运动与生活方式管理', ko: '식사, 운동, 생활습관 관리', en: 'Diet, exercise, and lifestyle management', ar: 'إدارة النظام الغذائي والرياضة ونمط الحياة' },
      { zh: '功能医学与抗衰老管理咨询', ko: '기능의학 및 항노화 관리 상담', en: 'Functional medicine and anti-aging management consultation', ar: 'استشارة الطب الوظيفي وإدارة مكافحة الشيخوخة' },
    ],
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'hormone-balance',
    image: '/keyword-tiles/hormone-balance.jpg',
    title: {
      zh: '激素平衡',
      ko: '호르몬 균형',
      en: 'Hormone Balance',
      ar: 'توازن الهرمونات',
    },
    description: {
      zh: '疲劳、睡眠问题、体重变化、情绪波动、月经变化、更年期症状、脱发、皮肤状态变化等，可能与甲状腺、女性激素、男性激素、压力激素或代谢状态有关。',
      ko: '피로, 수면 문제, 체중 변화, 감정 기복, 생리 변화, 갱년기 증상, 탈모, 피부 상태 변화 등은 갑상선, 여성호르몬, 남성호르몬, 스트레스 호르몬 또는 대사 상태와 관련될 수 있습니다.',
      en: 'Fatigue, sleep issues, weight changes, mood swings, menstrual changes, menopausal symptoms, hair loss, or changes in skin condition may be related to the thyroid, female hormones, male hormones, stress hormones, or metabolic status.',
      ar: 'قد يرتبط التعب ومشاكل النوم وتغيرات الوزن وتقلبات المزاج والتغيرات في الدورة الشهرية وأعراض سن اليأس وتساقط الشعر أو تغيرات حالة البشرة بالغدة الدرقية أو الهرمونات الأنثوية أو الهرمونات الذكرية أو هرمونات التوتر أو الحالة الأيضية.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사', en: 'Thyroid function test', ar: 'فحص وظائف الغدة الدرقية' },
      { zh: '女性激素相关检查', ko: '여성호르몬 관련 검사', en: 'Female hormone-related test', ar: 'فحص متعلق بالهرمونات الأنثوية' },
      { zh: '男性激素相关检查', ko: '남성호르몬 관련 검사', en: 'Male hormone-related test', ar: 'فحص متعلق بالهرمونات الذكرية' },
      { zh: '更年期相关评估', ko: '갱년기 관련 평가', en: 'Menopause-related evaluation', ar: 'تقييم متعلق بسن اليأس' },
      { zh: '维生素D检查', ko: '비타민D 검사', en: 'Vitamin D test', ar: 'فحص فيتامين د' },
      { zh: '血糖与胰岛素相关检查', ko: '혈당 및 인슐린 관련 검사', en: 'Blood sugar and insulin-related test', ar: 'فحص متعلق بسكر الدم والأنسولين' },
      { zh: '肝肾功能检查', ko: '간·신장 기능검사', en: 'Liver and kidney function test', ar: 'فحص وظائف الكبد والكلى' },
      { zh: '贫血与铁蛋白检查', ko: '빈혈 및 페리틴 검사', en: 'Anemia and ferritin test', ar: 'فحص فقر الدم والفيريتين' },
      { zh: '压力状态相关评估', ko: '스트레스 상태 관련 평가', en: 'Stress status evaluation', ar: 'تقييم حالة التوتر' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '甲状腺状态咨询', ko: '갑상선 상태 상담', en: 'Thyroid status consultation', ar: 'استشارة حالة الغدة الدرقية' },
      { zh: '更年期管理咨询', ko: '갱년기 관리 상담', en: 'Menopause management consultation', ar: 'استشارة إدارة سن اليأس' },
      { zh: '女性健康咨询', ko: '여성 건강 상담', en: "Women's health consultation", ar: 'استشارة صحة المرأة' },
      { zh: '男性健康咨询', ko: '남성 건강 상담', en: "Men's health consultation", ar: 'استشارة صحة الرجل' },
      { zh: '睡眠、情绪和体重变化综合评估', ko: '수면, 감정, 체중 변화 종합 평가', en: 'Comprehensive evaluation of sleep, mood, and weight changes', ar: 'تقييم شامل للنوم والمزاج وتغيرات الوزن' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담', en: 'Functional medicine testing consultation', ar: 'استشارة فحوصات الطب الوظيفي' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
]
