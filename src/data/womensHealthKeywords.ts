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
    zh: '妇科检查 · 备孕与不孕咨询 · 卵子冷冻 · 私密护理 · 更年期管理',
    en: 'Gynecologic Consultation · Fertility Planning · Egg Freezing · Intimate Care · Menopause Management',
  } as LocalizedText,
  desc: {
    zh: '韩国女性健康咨询不只是单一检查，而是根据年龄、症状、月经情况、怀孕计划、既往病史和来韩停留时间，整理适合咨询的妇科与女性健康方向。',
    en: "Women's health consultation in Korea is not just a single test. It is a process of organizing consultation directions based on age, symptoms, menstrual history, pregnancy plans, previous medical history, and length of stay in Korea.",
  } as LocalizedText,
}

export const WOMENS_HEALTH_KEYWORDS: WomensHealthKeyword[] = [
  {
    id: 'basic-gynecologic',
    image: '/keyword-tiles/basic-gynecologic.jpg',
    title: {
      zh: '妇科基础检查与咨询',
      en: 'Basic Gynecologic Consultation',
    },
    description: {
      zh: '妇科基础咨询主要用于整理分泌物变化、异味、瘙痒、下腹部不适、月经变化、性交后不适或反复炎症等女性健康问题。具体需要哪些检查，需要由妇科医生根据症状和既往病史判断。',
      en: "Basic gynecologic consultation helps organize concerns such as changes in discharge, odor, itching, lower abdominal discomfort, menstrual changes, discomfort after intercourse, or recurrent inflammation. The specific tests needed must be determined by a gynecologist based on symptoms and medical history.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '分泌物或异味相关咨询', en: 'Discharge or odor-related consultation' },
      { zh: '瘙痒或不适相关咨询', en: 'Itching or discomfort consultation' },
      { zh: '月经周期变化咨询', en: 'Menstrual cycle change consultation' },
      { zh: '下腹部或骨盆不适咨询', en: 'Lower abdominal or pelvic discomfort consultation' },
      { zh: '反复炎症相关咨询', en: 'Recurrent inflammation consultation' },
      { zh: '既往检查结果整理', en: 'Review of previous test results' },
    ],
    note: {
      zh: '这些症状可能由多种原因引起，不能仅凭描述判断。是否需要检查或治疗，需要医生面诊后决定。',
      en: "These symptoms can have various causes and cannot be judged by description alone. Whether tests or treatment are needed must be determined after a doctor's consultation.",
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'cervix-hpv',
    image: '/keyword-tiles/cervix-hpv.jpg',
    title: {
      zh: '宫颈健康・HPV咨询',
      en: 'Cervix & HPV Consultation',
    },
    description: {
      zh: '宫颈和HPV相关咨询主要用于整理宫颈癌筛查、HPV检查、既往异常结果、疫苗接种情况和复查计划。若过去检查结果异常，建议提前准备报告。',
      en: 'Cervix and HPV consultation helps organize cervical cancer screening, HPV testing, previous abnormal results, vaccination history, and follow-up plans. If there were abnormal results in the past, previous reports should be prepared.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '宫颈癌筛查相关咨询', en: 'Cervical cancer screening consultation' },
      { zh: 'HPV相关咨询', en: 'HPV-related consultation' },
      { zh: '既往异常检查结果整理', en: 'Review of previous abnormal results' },
      { zh: 'HPV疫苗相关咨询', en: 'HPV vaccine consultation' },
      { zh: '复查周期和医院咨询方向整理', en: 'Follow-up schedule and hospital consultation direction' },
    ],
    note: {
      zh: 'HPV感染或宫颈检查异常并不等于一定患有癌症。具体判断、复查和治疗方向需要由妇科医生确认。',
      en: 'HPV infection or an abnormal cervical test does not necessarily mean cancer. Diagnosis, follow-up, and treatment direction must be confirmed by a gynecologist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'ovary-uterus',
    image: '/keyword-tiles/ovary-uterus.jpg',
    title: {
      zh: '卵巢・子宫健康咨询',
      en: 'Ovary & Uterus Consultation',
    },
    description: {
      zh: '卵巢和子宫相关咨询主要用于整理子宫肌瘤、子宫腺肌症、卵巢囊肿、月经量变化、严重痛经、下腹部不适或异常出血等问题。既往检查报告对医生判断非常有帮助。',
      en: 'Ovary and uterus consultation helps organize concerns such as uterine fibroids, adenomyosis, ovarian cysts, changes in menstrual volume, severe menstrual pain, lower abdominal discomfort, or abnormal bleeding. Previous reports are helpful for the doctor\'s evaluation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '子宫肌瘤相关咨询', en: 'Uterine fibroid consultation' },
      { zh: '卵巢囊肿相关咨询', en: 'Ovarian cyst consultation' },
      { zh: '月经量变化咨询', en: 'Menstrual volume change consultation' },
      { zh: '严重痛经咨询', en: 'Severe menstrual pain consultation' },
      { zh: '异常出血咨询', en: 'Abnormal bleeding consultation' },
      { zh: '既往影像或检查资料整理', en: 'Review of previous imaging or test reports' },
    ],
    note: {
      zh: '是否需要观察、药物治疗、手术或进一步检查，需要由妇科医生根据检查结果判断。',
      en: 'Whether observation, medication, surgery, or further tests are needed must be determined by a gynecologist based on test results.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'fertility-infertility',
    image: '/keyword-tiles/fertility-infertility.jpg',
    title: {
      zh: '生育力・不孕不育咨询',
      en: 'Fertility Planning & Infertility',
    },
    description: {
      zh: '备孕和不孕咨询主要用于整理怀孕计划、备孕时间、月经周期、既往怀孕或流产经历、既往检查结果和夫妻双方的相关资料。是否需要进一步检查或辅助生殖咨询，需要由医院判断。',
      en: 'Fertility planning and infertility consultation helps organize pregnancy plans, duration of trying to conceive, menstrual cycle, previous pregnancy or miscarriage history, previous test results, and information from both partners. Whether further testing or assisted reproduction consultation is needed must be determined by the hospital.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前身体状态整理', en: 'Pre-pregnancy health organization' },
      { zh: '月经和排卵情况整理', en: 'Menstrual and ovulation history' },
      { zh: '不孕相关检查咨询', en: 'Infertility-related test consultation' },
      { zh: '夫妻双方资料整理', en: 'Information organization for both partners' },
      { zh: '人工授精或试管婴儿相关咨询', en: 'IUI or IVF-related consultation' },
      { zh: '反复流产相关咨询', en: 'Recurrent miscarriage consultation' },
      { zh: '既往检查结果整理', en: 'Review of previous test results' },
    ],
    note: {
      zh: '不孕咨询需要结合年龄、卵巢功能、月经周期、既往病史和伴侣因素综合判断。具体治疗方向和成功可能性需要由生殖医学专业医生判断。',
      en: 'Infertility consultation requires comprehensive evaluation of age, ovarian function, menstrual cycle, medical history, and partner factors. Treatment direction and success possibility must be determined by a reproductive medicine specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'egg-freezing',
    image: '/keyword-tiles/egg-freezing.jpg',
    title: {
      zh: '卵子冷冻咨询',
      en: 'Egg Freezing',
    },
    description: {
      zh: '卵子冷冻咨询适合目前没有立即怀孕计划，但希望了解未来生育选择的客户。咨询时通常需要结合年龄、卵巢功能、身体状态、可来韩时间和未来使用计划进行整理。',
      en: 'Egg freezing consultation is suitable for clients who do not plan to become pregnant immediately but want to understand future fertility options. Consultation should consider age, ovarian function, health condition, possible travel time to Korea, and future use plans.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '卵巢功能相关咨询', en: 'Ovarian function consultation' },
      { zh: '卵子冷冻流程咨询', en: 'Egg freezing process consultation' },
      { zh: '来韩时间和停留时间整理', en: 'Travel and length-of-stay planning' },
      { zh: '未来使用计划咨询', en: 'Future use planning' },
      { zh: '与试管婴儿相关的后续咨询', en: 'Follow-up consultation related to IVF' },
      { zh: '费用和保存周期相关问题整理', en: 'Cost and storage period questions' },
    ],
    note: {
      zh: '卵子冷冻不等于保证未来一定怀孕。成功可能性与年龄、卵子数量、卵子质量、健康状态和未来使用方式有关，需要由生殖医学专业医生说明。',
      en: 'Egg freezing does not guarantee future pregnancy. Success possibility depends on age, number and quality of eggs, health condition, and future use method, and must be explained by a reproductive medicine specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'intimate-care',
    image: '/keyword-tiles/intimate-care.jpg',
    title: {
      zh: '女性私密健康咨询',
      en: 'Intimate Care',
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
    id: 'menopause-hormones',
    image: '/keyword-tiles/menopause-hormones.jpg',
    title: {
      zh: '更年期・激素管理',
      en: 'Menopause & Hormone Management',
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
