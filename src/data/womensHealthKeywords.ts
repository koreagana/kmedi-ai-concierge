import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet } from './bigHealthKeywords'

export interface WomensHealthDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: "여성의학 초진 문진표 / 女性健康初诊问诊表" does not exist yet (prepDocuments.ts
// explicitly lists 여성의학 under "아직 등록된 문서 없음"), so it is intentionally left out.
// The other three candidate documents are the existing generic ones reused across
// categories (functional medicine intake, health checkup prep, blood test prep).
export const WOMENS_HEALTH_DOC_BUTTONS = {
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
} satisfies Record<string, WomensHealthDocButton>

export type WomensHealthDocButtonKey = keyof typeof WOMENS_HEALTH_DOC_BUTTONS

export interface WomensHealthKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  /** Gradient tone to use when `image` is omitted (stem-cell page palette). Defaults to 'pink'. */
  tileGradient?: 'pink' | 'purple' | 'mint'
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  note: LocalizedText
  docKeys: WomensHealthDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能咨询方向',
  en: 'Possible Consultation Areas',
}

export const WOMENS_HEALTH_SECTION = {
  title: {
    zh: '女性健康中心',
    en: "Women's Health Center",
  } as LocalizedText,
  subCopy: {
    zh: '生育力管理 · 卵子冷冻 · 妇科检查 · HPV管理 · 私密健康 · 更年期激素管理',
    en: 'Fertility Management · Egg Freezing · Gynecological & HPV Checkup · Intimate Health · Menopause & Hormone Care',
  } as LocalizedText,
  desc: {
    zh: '韩国女性健康咨询不只是单一检查，而是根据年龄、症状、月经情况、怀孕计划、既往病史和来韩停留时间，整理适合咨询的妇科与女性健康方向。',
    en: "Women's health consultation in Korea is not just a single test. It is a process of organizing consultation directions based on age, symptoms, menstrual history, pregnancy plans, previous medical history, and length of stay in Korea.",
  } as LocalizedText,
}

export const WOMENS_HEALTH_KEYWORDS: WomensHealthKeyword[] = [
  {
    id: 'fertility-egg-freezing',
    image: '/category-tiles/women/fertility-egg-freezing.png',
    title: {
      zh: '生育力·冻卵',
      en: 'Fertility Management & Egg Freezing',
    },
    description: {
      zh: '生育力管理咨询涵盖备孕计划、不孕相关检查，以及卵子冷冻等生育力保存方式。您可以先告诉我们，目前是计划尽快怀孕、想了解自己的生育能力，还是暂时没有怀孕计划但希望提前保存生育力。咨询时通常需要结合年龄、月经周期、卵巢功能、既往怀孕或流产经历、既往检查结果，以及可来韩停留时间进行整理。',
      en: 'Fertility management consultation covers pregnancy planning, infertility-related testing, and fertility preservation options such as egg freezing. Please let us know whether you are currently trying to conceive, want to understand your fertility, or are not planning pregnancy yet but want to preserve your fertility for the future. Consultation typically considers age, menstrual cycle, ovarian function, previous pregnancy or miscarriage history, previous test results, and your length of stay in Korea.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前身体状态整理', en: 'Pre-pregnancy health organization' },
      { zh: '月经和排卵情况整理', en: 'Menstrual and ovulation history' },
      { zh: '不孕相关检查咨询', en: 'Infertility-related test consultation' },
      { zh: '人工授精或试管婴儿相关咨询', en: 'IUI or IVF-related consultation' },
      { zh: '反复流产相关咨询', en: 'Recurrent miscarriage consultation' },
      { zh: '卵巢功能相关咨询', en: 'Ovarian function consultation' },
      { zh: '卵子冷冻流程咨询', en: 'Egg freezing process consultation' },
      { zh: '未来使用计划、费用及保存周期咨询', en: 'Future use plan, cost & storage period consultation' },
      { zh: '来韩时间和停留时间整理', en: 'Travel and length-of-stay planning' },
    ],
    note: {
      zh: '卵子冷冻并不代表一定能够成功怀孕，具体方案需根据年龄、卵巢功能及身体状况由生殖医学专业医生评估。',
      en: 'Egg freezing does not guarantee future pregnancy — the specific plan is assessed by a reproductive medicine specialist based on age, ovarian function, and overall health.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'gynecology-hpv-checkup',
    image: '/category-tiles/women/gynecology-hpv-checkup.png',
    title: {
      zh: '妇科·HPV',
      en: 'Gynecological & HPV Checkup',
    },
    description: {
      zh: '妇科检查与HPV管理咨询涵盖分泌物变化、异味、瘙痒、下腹部不适、月经变化、反复炎症等基础妇科问题，子宫肌瘤、子宫腺肌症、卵巢囊肿等子宫卵巢相关问题，以及宫颈癌筛查、HPV检查、既往异常结果与疫苗接种等宫颈健康管理方向。具体需要哪些检查，需要由妇科医生根据症状和既往病史判断。',
      en: 'Gynecological and HPV consultation covers basic concerns such as changes in discharge, odor, itching, lower abdominal discomfort, menstrual changes, and recurrent inflammation; uterus- and ovary-related concerns such as fibroids, adenomyosis, and ovarian cysts; and cervical health management including cervical cancer screening, HPV testing, previous abnormal results, and vaccination. The specific tests needed must be determined by a gynecologist based on symptoms and medical history.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '分泌物或异味相关咨询', en: 'Discharge or odor-related consultation' },
      { zh: '月经周期或经量变化咨询', en: 'Menstrual cycle or volume change consultation' },
      { zh: '子宫肌瘤・子宫腺肌症咨询', en: 'Uterine fibroid & adenomyosis consultation' },
      { zh: '卵巢囊肿相关咨询', en: 'Ovarian cyst consultation' },
      { zh: '严重痛经或异常出血咨询', en: 'Severe menstrual pain or abnormal bleeding consultation' },
      { zh: '宫颈癌筛查相关咨询', en: 'Cervical cancer screening consultation' },
      { zh: 'HPV检测及疫苗相关咨询', en: 'HPV testing & vaccine consultation' },
      { zh: '既往异常检查结果整理', en: 'Review of previous abnormal results' },
      { zh: '复查周期和医院咨询方向整理', en: 'Follow-up schedule and hospital consultation direction' },
    ],
    note: {
      zh: '这些症状可能由多种原因引起，不能仅凭描述判断。HPV感染或宫颈检查异常也并不等于一定患有癌症。是否需要观察、检查、药物治疗或手术，需要由妇科医生面诊后根据检查结果判断。',
      en: 'These symptoms can have various causes and cannot be judged by description alone. HPV infection or an abnormal cervical test does not necessarily mean cancer either. Whether observation, testing, medication, or surgery is needed must be determined by a gynecologist after consultation and based on test results.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'womens-intimate-health',
    image: '/category-tiles/women/womens-intimate-health.png',
    title: {
      zh: '女性私密',
      en: "Women's Intimate Health Management",
    },
    description: {
      zh: '私密护理咨询主要用于整理产后变化、私密部位松弛感、干涩、不适、轻度漏尿、外阴颜色或形态相关困扰等问题。相关项目需要根据症状、分娩经历、炎症状态、皮肤状态和医生判断决定是否适合。',
      en: "Intimate care consultation helps organize concerns such as postpartum changes, looseness, dryness, discomfort, mild urinary leakage, and concerns about color or shape of the intimate area. Suitability depends on symptoms, childbirth history, inflammation status, skin condition, and doctor's judgment.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '私密紧致咨询', en: 'Intimate tightening consultation' },
      { zh: '外阴美白咨询', en: 'External intimate area brightening consultation' },
      { zh: '小阴唇形态咨询', en: 'Labia shape consultation' },
      { zh: '产后私密恢复咨询', en: 'Postpartum intimate recovery consultation' },
      { zh: '干涩与不适咨询', en: 'Dryness and discomfort consultation' },
      { zh: '轻度漏尿相关咨询', en: 'Mild urinary leakage consultation' },
      { zh: '女性私密激光或能量设备相关咨询', en: "Women's intimate laser or energy-device consultation" },
    ],
    note: {
      zh: '私密护理项目不应承诺性功能改善、美白效果或产前状态恢复。是否适合相关治疗，需要由妇科医生根据症状和检查结果判断。',
      en: 'Intimate care should not promise sexual function improvement, whitening results, or return to pre-childbirth condition. Suitability must be determined by a gynecologist based on symptoms and test results.',
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'menopause-hormone-care',
    image: '/category-tiles/women/menopause-hormone-care.png',
    title: {
      zh: '更年期·激素',
      en: 'Menopause & Hormone Balance Management',
    },
    description: {
      zh: '更年期和激素管理咨询主要用于整理潮热、睡眠问题、情绪变化、体重变化、月经变化、阴道干涩、疲劳感和骨健康相关问题。是否需要检查、药物或生活方式管理，需要由医生判断。',
      en: 'Menopause and hormone management consultation helps organize concerns such as hot flashes, sleep problems, mood changes, weight changes, menstrual changes, vaginal dryness, fatigue, and bone health. Whether tests, medication, or lifestyle management is needed must be determined by a doctor.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '更年期状态咨询', en: 'Menopause status consultation' },
      { zh: '女性激素相关咨询', en: 'Female hormone-related consultation' },
      { zh: '甲状腺和代谢状态咨询', en: 'Thyroid and metabolic status consultation' },
      { zh: '睡眠和情绪变化咨询', en: 'Sleep and mood change consultation' },
      { zh: '阴道干涩或不适咨询', en: 'Vaginal dryness or discomfort consultation' },
      { zh: '骨健康和营养状态咨询', en: 'Bone health and nutrition consultation' },
      { zh: '抗衰老健康管理咨询', en: 'Anti-aging health management consultation' },
    ],
    note: {
      zh: '激素相关治疗或补充并不适合所有人，需要结合年龄、病史、家族史、检查结果和医生判断。',
      en: "Hormone-related treatment or supplementation is not suitable for everyone. Age, medical history, family history, test results, and doctor's judgment must be considered.",
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
]
