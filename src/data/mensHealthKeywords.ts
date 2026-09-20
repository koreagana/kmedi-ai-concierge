import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet } from './bigHealthKeywords'

export interface MensHealthDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: "남성의학 초진 문진표 / 男性健康初诊问诊表" does not exist yet (prepDocuments.ts
// explicitly lists 남성의학 under "아직 등록된 문서 없음"), so it is intentionally left out.
// The other three candidate documents are the existing generic ones reused across
// categories (functional medicine intake, health checkup prep, blood test prep).
export const MENS_HEALTH_DOC_BUTTONS = {
  functionalIntake: {
    label: {
      zh: '填写功能医学初诊问诊表',
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
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      en: 'Open WeCom Consultation',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, MensHealthDocButton>

export type MensHealthDocButtonKey = keyof typeof MENS_HEALTH_DOC_BUTTONS

export interface MensHealthKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  note: LocalizedText
  /** 'warning' renders the note in the urgent/orange style instead of the neutral info style. */
  noteStyle?: 'info' | 'warning'
  docKeys: MensHealthDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能咨询方向',
  en: 'Possible Consultation Areas',
}

export const MENS_HEALTH_SECTION = {
  title: {
    zh: '男性健康中心',
    en: "Men's Health Center",
  } as LocalizedText,
  subCopy: {
    zh: '男性激素・活力管理 · 免疫力・抗衰老 · 生育力・精子健康 · 前列腺・泌尿健康',
    en: 'Hormones & Vitality · Immunity & Anti-Aging · Fertility & Sperm Health · Prostate & Urological Health',
  } as LocalizedText,
  desc: {
    zh: '男性健康管理是许多来韩医疗客户在健康检查、皮肤或抗衰老项目之外，可以一并了解的方向。可根据年龄、生活习惯、疲劳程度和检查需求，选择适合的激素、免疫、生育力或泌尿健康咨询方向。',
    en: "Men's health management is an area many medical tourism clients explore alongside health checkups, skin treatments, or anti-aging programs during their visit to Korea. Depending on age, lifestyle, fatigue level, and testing needs, you can choose a hormone, immunity, fertility, or urological health consultation direction that fits you.",
  } as LocalizedText,
}

const IMMUNITY_DIRECTIONS_LABEL: LocalizedText = {
  zh: '常见检查与管理方向',
  en: 'Common Tests & Management Options',
}

export const MENS_HEALTH_KEYWORDS: MensHealthKeyword[] = [
  {
    id: 'male-hormone-vitality',
    image: '/category-tiles/man/male-hormone-vitality.png',
    title: {
      zh: '激素·活力',
      en: 'Male Hormones & Vitality Management',
    },
    description: {
      zh: '男性激素和活力管理咨询主要用于整理睾酮水平、疲劳感、性功能下降、精力不足等问题。来韩期间可结合血液检查了解激素状态，并根据结果咨询相应的营养或注射类管理方式。',
      en: 'Male hormone and vitality consultation helps organize concerns such as testosterone levels, fatigue, decreased sexual function, and low energy. During your visit to Korea, hormone status can be checked through blood tests, and nutritional or injection-based management options can be discussed based on the results.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '男性激素・睾酮相关检查', en: 'Male hormone / testosterone testing' },
      { zh: '疲劳与精力下降评估', en: 'Fatigue & low-energy assessment' },
      { zh: '性功能相关咨询', en: 'Sexual function consultation' },
      { zh: '男性荷尔蒙管理注射・营养輸液治疗', en: 'Hormone-support injection / IV nutrient therapy' },
    ],
    note: {
      zh: '激素补充和相关注射治疗并非适合所有人，需要结合血液检查结果、年龄和既往病史，由医生判断是否适合。',
      en: 'Hormone supplementation and related injection treatments are not suitable for everyone. Suitability must be determined by a doctor based on blood test results, age, and medical history.',
    },
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'immunity-anti-aging',
    image: '/category-tiles/man/immunity-anti-aging.png',
    title: {
      zh: '免疫·抗衰',
      en: 'Immunity & Anti-Aging Management',
    },
    description: {
      zh: '韩国的免疫力与抗衰老管理，通常不仅是一般健康咨询，还会结合血液检查、NK细胞活性检查（NK Cell Activity Test）、激素及代谢相关检查，对疲劳、免疫功能、精力下降和年龄相关变化进行综合评估。对于40岁以后容易疲劳、恢复变慢、体力下降，或希望系统了解自身免疫与抗衰老状态的人群，可根据检查结果进一步咨询个性化管理方案。',
      en: 'Immunity and anti-aging management in Korea is typically more than a general health consultation — it combines blood tests, NK Cell Activity Testing, and hormone/metabolic testing to comprehensively assess fatigue, immune function, low energy, and age-related changes. For those over 40 who tire easily, recover slowly, or want to systematically understand their immune and anti-aging status, a personalized management plan can be discussed based on the test results.',
    },
    directionsLabel: IMMUNITY_DIRECTIONS_LABEL,
    directions: [
      { zh: 'NK细胞活性检查', en: 'NK Cell Activity Test' },
      { zh: '慢性疲劳・精力下降评估', en: 'Chronic fatigue & low-energy assessment' },
      { zh: '男性激素・睾酮相关检查', en: 'Male hormone / testosterone testing' },
      { zh: '营养状态及维生素相关检查', en: 'Nutritional status & vitamin testing' },
      { zh: '静脉营养治疗（IV Therapy）', en: 'IV nutrient therapy' },
      { zh: '血液净化疗法', en: 'Blood purification therapy' },
      { zh: '个性化营养品・维生素处方', en: 'Personalized supplement & vitamin prescription' },
    ],
    note: {
      zh: '具体检查项目和管理方案会因医院而异，是否适合、检查频率和治疗强度需要由医生根据健康状态判断。',
      en: 'Specific tests and management plans vary by clinic. Suitability, testing frequency, and treatment intensity must be determined by a doctor based on your health condition.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'male-fertility-sperm-health',
    image: '/category-tiles/man/male-fertility-sperm-health.png',
    title: {
      zh: '男性生育力',
      en: 'Male Fertility & Sperm Health',
    },
    description: {
      zh: '男性生育力和精子健康咨询主要用于整理备孕计划、既往精液检查结果、精索静脉曲张相关病史等问题。男性因素也是备孕和不孕咨询中重要的一部分。',
      en: 'Male fertility and sperm health consultation helps organize pregnancy planning, previous semen analysis results, and varicocele-related history. Male factors are an important part of fertility planning and infertility consultation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '精子健康相关检查', en: 'Semen analysis / sperm health testing' },
      { zh: '男性不孕相关咨询', en: 'Male infertility consultation' },
      { zh: '精索静脉曲张相关咨询', en: 'Varicocele-related consultation' },
      { zh: '备孕前男性健康管理', en: "Pre-pregnancy men's health management" },
    ],
    note: {
      zh: '男性生育力需要与女性因素一起评估。精液检查结果可能受检查条件、禁欲时间和身体状态影响，具体判断需要由泌尿医学或生殖医学专业医生进行。',
      en: 'Male fertility should be evaluated together with female factors. Semen analysis results can be affected by test conditions, abstinence period, and health status. Detailed interpretation must be done by a urology or reproductive medicine specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'prostate-urology-intimate-health',
    image: '/category-tiles/man/prostate-urology-intimate-health.png',
    title: {
      zh: '前列腺·泌尿',
      en: 'Prostate & Urological Intimate Health Management',
    },
    description: {
      zh: '前列腺与泌尿私密健康管理涵盖前列腺检查（如PSA）、排尿相关问题、泌尿生殖系统感染筛查，以及包皮、输精管结扎等私密健康咨询方向。可根据年龄、症状和检查需求，选择适合的检查或咨询方向。',
      en: 'Prostate and urological intimate health management covers prostate checks (such as PSA), urination-related concerns, urogenital infection screening, and intimate health topics such as circumcision or vasectomy consultation. Depending on age, symptoms, and testing needs, you can choose the checkup or consultation direction that fits you.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '前列腺健康检查（PSA等）', en: 'Prostate health checkup (PSA, etc.)' },
      { zh: '排尿相关咨询', en: 'Urination-related consultation' },
      { zh: '泌尿生殖感染筛查', en: 'Urogenital infection screening' },
      { zh: '男性私密健康咨询（包皮・输精管结扎等）', en: "Men's intimate health consultation (circumcision, vasectomy, etc.)" },
    ],
    note: {
      zh: '相关症状可能由多种原因引起，是否需要检查或治疗，需要由泌尿医学专业医生判断。',
      en: 'These concerns can have various causes. Whether testing or treatment is needed must be determined by a urology specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
]
