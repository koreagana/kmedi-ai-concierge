import { WECHAT_BIZ_URL } from './contacts'

export interface LocalizedText {
  zh: string
  en: string
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
      en: 'Fill Out the Functional Medicine Intake Form',
    },
    kind: 'route',
    target: '/intake/functional/',
  },
  healthCheckupPrep: {
    label: {
      zh: '查看健康检查前准备事项',
      en: 'View Health Checkup Preparation Guide',
    },
    kind: 'route',
    target: '/prep/health-checkup-before/',
  },
  bloodTestPrep: {
    label: {
      zh: '查看血液检查前注意事项',
      en: 'View Blood Test Preparation Guide',
    },
    kind: 'route',
    target: '/prep/blood-test-before/',
  },
  colonoscopyPrep: {
    label: {
      zh: '查看肠镜检查前准备事项',
      en: 'View Colonoscopy Preparation Guide',
    },
    kind: 'route',
    target: '/prep/colonoscopy-before/',
  },
  imagingPrep: {
    label: {
      zh: '查看CT/MRI检查前确认表',
      en: 'View CT/MRI Pre-Exam Checklist',
    },
    kind: 'route',
    target: '/prep/imaging-before/',
  },
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      en: 'Open WeChat Business Consultation',
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
  /** Gradient tone to use when `image` is omitted (stem-cell page palette). Defaults to 'pink'. */
  tileGradient?: 'pink' | 'purple' | 'mint'
  /** Renders the tile as a full-width banner (stem-cell page style) instead of the square photo tile. */
  tileBanner?: boolean
  /** Short line shown under the title when `tileBanner` is set. */
  tileSubtitle?: LocalizedText
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
  en: 'Possible Related Tests',
}

const DIRECTION_LABEL: LocalizedText = {
  zh: '可能咨询方向',
  en: 'Possible Consultation Directions',
}

export const BIG_HEALTH_DOC_SECTION_LABEL: LocalizedText = {
  zh: '相关准备文档',
  en: 'Related Preparation Documents',
}

export const BIG_HEALTH_PILLS_PROMPT: LocalizedText = {
  zh: '请选择您关心的方向',
  en: 'Please select the topic you are most interested in',
}

export const BIG_HEALTH_SECTION = {
  title: {
    zh: '大健康 · 抗衰老管理',
    en: 'Anti-Aging & Health Management',
  } as LocalizedText,
  desc: {
    zh: '不是单一项目，而是从疲劳、睡眠、肠道、代谢、激素和再生医学咨询等方向，了解身体状态并整理适合的韩国医疗咨询路径。',
    en: 'Not a single procedure, but a way to understand your body through fatigue, sleep, gut health, metabolism, hormones, and regenerative medicine consultation — and map out the right path for medical consultation in Korea.',
  } as LocalizedText,
}

export const BIG_HEALTH_KEYWORDS: BigHealthKeyword[] = [
  {
    id: 'chronic-fatigue',
    image: '/keyword-tiles/chronic-fatigue.jpg',
    title: {
      zh: '慢性疲劳',
      en: 'Chronic Fatigue',
    },
    description: {
      zh: '长期疲劳、精力下降、恢复慢、注意力下降、睡醒后仍然疲惫等问题，可能与睡眠、营养状态、贫血、甲状腺、血糖、肝肾功能、慢性炎症或压力状态等多种因素有关。',
      en: 'Long-term fatigue, low energy, slow recovery, poor concentration, or waking up tired can be related to sleep, nutritional status, anemia, thyroid function, blood sugar, liver and kidney function, chronic inflammation, or stress.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', en: 'Basic blood test' },
      { zh: '贫血相关检查', en: 'Anemia-related test' },
      { zh: '铁蛋白与铁代谢检查', en: 'Ferritin and iron metabolism test' },
      { zh: '维生素D检查', en: 'Vitamin D test' },
      { zh: '维生素B群相关评估', en: 'Vitamin B group evaluation' },
      { zh: '甲状腺功能检查', en: 'Thyroid function test' },
      { zh: '空腹血糖与糖化血红蛋白', en: 'Fasting glucose and HbA1c' },
      { zh: '肝功能与肾功能检查', en: 'Liver and kidney function test' },
      { zh: '炎症指标检查', en: 'Inflammation marker test' },
      { zh: '营养状态评估', en: 'Nutritional status evaluation' },
      { zh: '必要时进行功能医学相关评估', en: 'Functional medicine evaluation, if needed' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '疲劳原因整理', en: 'Organizing the causes of fatigue' },
      { zh: '睡眠与生活节奏评估', en: 'Sleep and daily rhythm evaluation' },
      { zh: '营养状态与缺乏因素确认', en: 'Confirming nutritional status and deficiencies' },
      { zh: '抗氧化与营养补充咨询', en: 'Antioxidant and nutritional supplement consultation' },
      { zh: '功能医学检查咨询', en: 'Functional medicine testing consultation' },
      { zh: '生活方式管理咨询', en: 'Lifestyle management consultation' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'sleep-issue',
    image: '/keyword-tiles/sleep-issue.jpg',
    title: {
      zh: '睡眠问题',
      en: 'Sleep Issues',
    },
    description: {
      zh: '入睡困难、浅眠、多梦、早醒、睡醒后仍疲劳、白天困倦等情况，可能与压力、自律神经、激素变化、血糖波动、生活节奏、咖啡因摄入或身体代谢状态有关。',
      en: 'Difficulty falling asleep, light sleep, frequent dreaming, early waking, waking up tired, or daytime drowsiness can be related to stress, the autonomic nervous system, hormonal changes, blood sugar fluctuations, daily rhythm, caffeine intake, or metabolic status.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', en: 'Basic blood test' },
      { zh: '甲状腺功能检查', en: 'Thyroid function test' },
      { zh: '血糖与胰岛素相关检查', en: 'Blood sugar and insulin-related test' },
      { zh: '维生素D检查', en: 'Vitamin D test' },
      { zh: '铁蛋白与贫血相关检查', en: 'Ferritin and anemia-related test' },
      { zh: '激素相关检查', en: 'Hormone-related test' },
      { zh: '压力状态相关评估', en: 'Stress status evaluation' },
      { zh: '自律神经相关评估，如医院可提供', en: 'Autonomic nervous system evaluation, where available' },
      { zh: '睡眠习惯与生活方式问诊', en: 'Sleep habits and lifestyle intake interview' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '睡眠模式整理', en: 'Organizing sleep patterns' },
      { zh: '压力与自律神经状态咨询', en: 'Stress and autonomic nervous system consultation' },
      { zh: '咖啡因、饮酒、作息习惯评估', en: 'Caffeine, alcohol, and routine habit evaluation' },
      { zh: '营养缺乏因素确认', en: 'Confirming nutritional deficiencies' },
      { zh: '激素与代谢状态咨询', en: 'Hormone and metabolic status consultation' },
      { zh: '功能医学检查咨询', en: 'Functional medicine testing consultation' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'gut-health',
    image: '/keyword-tiles/gut-health.jpg',
    title: {
      zh: '肠道健康',
      en: 'Gut Health',
    },
    description: {
      zh: '腹胀、消化不良、便秘、腹泻、胃肠不适、饭后疲劳、排便习惯变化等问题，可能需要结合饮食习惯、肠道状态、炎症反应、营养吸收和必要的内镜检查一起评估。',
      en: 'Bloating, indigestion, constipation, diarrhea, stomach discomfort, post-meal fatigue, or changes in bowel habits may need to be evaluated together with dietary habits, gut condition, inflammatory response, nutrient absorption, and, if necessary, an endoscopic examination.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '基础血液检查', en: 'Basic blood test' },
      { zh: '炎症指标检查', en: 'Inflammation marker test' },
      { zh: '肝功能与胰腺相关指标', en: 'Liver function and pancreas-related markers' },
      { zh: '营养状态评估', en: 'Nutritional status evaluation' },
      { zh: '贫血与铁蛋白检查', en: 'Anemia and ferritin test' },
      { zh: '维生素D与维生素B群相关评估', en: 'Vitamin D and vitamin B group evaluation' },
      { zh: '大便相关检查，如医院可提供', en: 'Stool test, where available' },
      { zh: '幽门螺杆菌相关检查，如有需要', en: 'H. pylori test, if needed' },
      { zh: '胃镜或肠镜相关咨询', en: 'Gastroscopy or colonoscopy consultation' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '消化不良与腹胀原因整理', en: 'Organizing the causes of indigestion and bloating' },
      { zh: '便秘或腹泻状态评估', en: 'Evaluating constipation or diarrhea status' },
      { zh: '饮食习惯与肠道反应整理', en: 'Reviewing dietary habits and gut response' },
      { zh: '内镜检查准备咨询', en: 'Endoscopy preparation consultation' },
      { zh: '功能医学肠道健康评估咨询', en: 'Functional medicine gut health evaluation consultation' },
      { zh: '营养吸收与生活方式管理咨询', en: 'Nutrient absorption and lifestyle management consultation' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'colonoscopyPrep'],
  },
  {
    id: 'metabolic-management',
    image: '/keyword-tiles/metabolic-management.jpg',
    title: {
      zh: '代谢管理',
      en: 'Metabolic Management',
    },
    description: {
      zh: '血糖、血脂、脂肪肝、体重变化、腹部脂肪、胰岛素抵抗、糖尿病前期等问题，适合通过血液检查、生活方式评估和必要的医学咨询来了解身体代谢状态。',
      en: 'Blood sugar, cholesterol, fatty liver, weight changes, abdominal fat, insulin resistance, or prediabetes can be better understood through blood tests, lifestyle evaluation, and medical consultation as needed.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '空腹血糖', en: 'Fasting glucose' },
      { zh: '糖化血红蛋白', en: 'HbA1c' },
      { zh: '胰岛素相关检查', en: 'Insulin-related test' },
      { zh: '总胆固醇', en: 'Total cholesterol' },
      { zh: 'LDL胆固醇', en: 'LDL cholesterol' },
      { zh: 'HDL胆固醇', en: 'HDL cholesterol' },
      { zh: '甘油三酯', en: 'Triglycerides' },
      { zh: '肝功能检查', en: 'Liver function test' },
      { zh: '脂肪肝相关评估', en: 'Fatty liver evaluation' },
      { zh: '肾功能检查', en: 'Kidney function test' },
      { zh: '尿酸检查', en: 'Uric acid test' },
      { zh: '体成分检查，如医院可提供', en: 'Body composition test, where available' },
      { zh: '血压与心血管风险评估', en: 'Blood pressure and cardiovascular risk evaluation' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '血糖与血脂状态整理', en: 'Organizing blood sugar and lipid status' },
      { zh: '脂肪肝与肝功能咨询', en: 'Fatty liver and liver function consultation' },
      { zh: '体重变化原因评估', en: 'Evaluating causes of weight change' },
      { zh: '胰岛素抵抗相关咨询', en: 'Insulin resistance consultation' },
      { zh: '饮食、运动与生活方式管理', en: 'Diet, exercise, and lifestyle management' },
      { zh: '功能医学与抗衰老管理咨询', en: 'Functional medicine and anti-aging management consultation' },
    ],
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'hormone-balance',
    tileGradient: 'mint',
    tileBanner: true,
    tileSubtitle: {
      zh: '甲状腺 · 女性激素 · 男性激素 · 压力激素',
      en: 'Thyroid · Female Hormones · Male Hormones · Stress Hormones',
    },
    title: {
      zh: '激素平衡',
      en: 'Hormone Balance',
    },
    description: {
      zh: '疲劳、睡眠问题、体重变化、情绪波动、月经变化、更年期症状、脱发、皮肤状态变化等，可能与甲状腺、女性激素、男性激素、压力激素或代谢状态有关。',
      en: 'Fatigue, sleep issues, weight changes, mood swings, menstrual changes, menopausal symptoms, hair loss, or changes in skin condition may be related to the thyroid, female hormones, male hormones, stress hormones, or metabolic status.',
    },
    testsLabel: TESTS_LABEL,
    tests: [
      { zh: '甲状腺功能检查', en: 'Thyroid function test' },
      { zh: '女性激素相关检查', en: 'Female hormone-related test' },
      { zh: '男性激素相关检查', en: 'Male hormone-related test' },
      { zh: '更年期相关评估', en: 'Menopause-related evaluation' },
      { zh: '维生素D检查', en: 'Vitamin D test' },
      { zh: '血糖与胰岛素相关检查', en: 'Blood sugar and insulin-related test' },
      { zh: '肝肾功能检查', en: 'Liver and kidney function test' },
      { zh: '贫血与铁蛋白检查', en: 'Anemia and ferritin test' },
      { zh: '压力状态相关评估', en: 'Stress status evaluation' },
    ],
    directionLabel: DIRECTION_LABEL,
    direction: [
      { zh: '甲状腺状态咨询', en: 'Thyroid status consultation' },
      { zh: '更年期管理咨询', en: 'Menopause management consultation' },
      { zh: '女性健康咨询', en: "Women's health consultation" },
      { zh: '男性健康咨询', en: "Men's health consultation" },
      { zh: '睡眠、情绪和体重变化综合评估', en: 'Comprehensive evaluation of sleep, mood, and weight changes' },
      { zh: '功能医学检查咨询', en: 'Functional medicine testing consultation' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
]
