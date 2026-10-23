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
      zh: '填写功能医学初诊问卷',
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
  /** kmedispring.com 세부 페이지 맨 위 전용 사진(타일엔 안 씀) — 잘리지 않게 전체를 보여준다. */
  heroImage?: string
  /** heroImage 아래 한 줄 설명 */
  heroCaption?: LocalizedText
  /** Gradient tone to use when `image` is omitted (stem-cell page palette). Defaults to 'pink'. */
  tileGradient?: 'pink' | 'purple' | 'mint'
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  note: LocalizedText
  docKeys: WomensHealthDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可以咨询什么',
  en: 'Possible Consultation Areas',
}

export const WOMENS_HEALTH_SECTION = {
  title: {
    zh: '女性健康中心',
    en: "Women's Health Center",
  } as LocalizedText,
  subCopy: {
    zh: '备孕 · 冻卵 · 妇科检查 · HPV · 私密健康 · 更年期',
    en: 'Fertility Management · Egg Freezing · Gynecological & HPV Checkup · Intimate Health · Menopause & Hormone Care',
  } as LocalizedText,
  desc: {
    zh: '女性健康咨询不只是做一项检查。我们会根据您的年龄、症状、月经情况、有没有怀孕计划、以前的病史，以及能在韩国待几天，帮您理清楚该看哪一科、做哪些检查。',
    en: "Women's health consultation in Korea is not just a single test. It is a process of organizing consultation directions based on age, symptoms, menstrual history, pregnancy plans, previous medical history, and length of stay in Korea.",
  } as LocalizedText,
}

export const WOMENS_HEALTH_KEYWORDS: WomensHealthKeyword[] = [
  {
    id: 'fertility-egg-freezing',
    image: '/category-tiles/women/fertility-egg-freezing.jpg',
    title: {
      zh: '备孕 · 冻卵',
      en: 'Fertility Management & Egg Freezing',
    },
    description: {
      zh: '想尽快怀孕、想先了解自己的生育能力，还是暂时不打算要孩子、想先把卵子冻起来？先告诉我们您的情况。咨询时一般还需要了解年龄、月经周期、卵巢功能、以前有没有怀孕或流产、以前的检查结果，以及您能在韩国停留多久。',
      en: 'Fertility management consultation covers pregnancy planning, infertility-related testing, and fertility preservation options such as egg freezing. Please let us know whether you are currently trying to conceive, want to understand your fertility, or are not planning pregnancy yet but want to preserve your fertility for the future. Consultation typically considers age, menstrual cycle, ovarian function, previous pregnancy or miscarriage history, previous test results, and your length of stay in Korea.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前看看身体状况', en: 'Pre-pregnancy health organization' },
      { zh: '梳理月经和排卵情况', en: 'Menstrual and ovulation history' },
      { zh: '不孕检查咨询', en: 'Infertility-related test consultation' },
      { zh: '人工授精、试管婴儿咨询', en: 'IUI or IVF-related consultation' },
      { zh: '反复流产咨询', en: 'Recurrent miscarriage consultation' },
      { zh: '卵巢功能咨询', en: 'Ovarian function consultation' },
      { zh: '冻卵流程咨询', en: 'Egg freezing process consultation' },
      { zh: '以后怎么用、费用多少、能保存多久', en: 'Future use plan, cost & storage period consultation' },
      { zh: '安排来韩国的时间和停留天数', en: 'Travel and length-of-stay planning' },
    ],
    note: {
      zh: '冻卵不等于以后一定能怀孕。具体怎么做，要由生殖医学医生根据年龄、卵巢功能和身体状况来判断。',
      en: 'Egg freezing does not guarantee future pregnancy — the specific plan is assessed by a reproductive medicine specialist based on age, ovarian function, and overall health.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'gynecology-hpv-checkup',
    image: '/category-tiles/women/gynecology-hpv-checkup.jpg',
    title: {
      zh: '妇科 · HPV',
      en: 'Gynecological & HPV Checkup',
    },
    description: {
      zh: '白带变化、有异味、瘙痒、小腹不舒服、月经变化、炎症反复发作，或者子宫肌瘤、子宫腺肌症、卵巢囊肿，以及宫颈癌筛查、HPV检测、以前检查结果异常、打疫苗……这些都可以在这里咨询。需要做哪些检查，由妇科医生根据症状和病史决定。',
      en: 'Gynecological and HPV consultation covers basic concerns such as changes in discharge, odor, itching, lower abdominal discomfort, menstrual changes, and recurrent inflammation; uterus- and ovary-related concerns such as fibroids, adenomyosis, and ovarian cysts; and cervical health management including cervical cancer screening, HPV testing, previous abnormal results, and vaccination. The specific tests needed must be determined by a gynecologist based on symptoms and medical history.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '白带、异味咨询', en: 'Discharge or odor-related consultation' },
      { zh: '月经周期或经量变化咨询', en: 'Menstrual cycle or volume change consultation' },
      { zh: '子宫肌瘤、子宫腺肌症咨询', en: 'Uterine fibroid & adenomyosis consultation' },
      { zh: '卵巢囊肿咨询', en: 'Ovarian cyst consultation' },
      { zh: '痛经严重或不规则出血咨询', en: 'Severe menstrual pain or abnormal bleeding consultation' },
      { zh: '宫颈癌筛查咨询', en: 'Cervical cancer screening consultation' },
      { zh: 'HPV检测和疫苗咨询', en: 'HPV testing & vaccine consultation' },
      { zh: '整理以前的异常检查结果', en: 'Review of previous abnormal results' },
      { zh: '复查间隔和该去哪家医院', en: 'Follow-up schedule and hospital consultation direction' },
    ],
    note: {
      zh: '这些症状的原因有很多，光靠描述没法判断。感染了HPV或者宫颈检查结果异常，也不代表一定是癌。需要观察、检查、吃药还是手术，要由妇科医生面诊、看检查结果后决定。',
      en: 'These symptoms can have various causes and cannot be judged by description alone. HPV infection or an abnormal cervical test does not necessarily mean cancer either. Whether observation, testing, medication, or surgery is needed must be determined by a gynecologist after consultation and based on test results.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'womens-intimate-health',
    // 여성 골반 옆 단면 3D 해부도 — 질 벽 근육층·골반저근(빛나는 부분) 지지 구조 설명, 비노출 일러스트
    heroImage: '/category-tiles/women/womens-intimate-health-hero.jpg',
    heroCaption: {
      zh: '女性盆腔侧面示意图 · 阴道壁肌层和盆底肌，是私密紧致和产后恢复主要关注的部位',
      en: 'Side-view illustration of the female pelvis · The vaginal wall muscles and pelvic floor are the focus of intimate tightening and postpartum recovery',
    },
    image: '/category-tiles/women/womens-intimate-health.jpg',
    title: {
      zh: '女性私密',
      en: "Women's Intimate Health Management",
    },
    description: {
      zh: '产后身体的变化、私密部位松弛、干涩不适、轻微漏尿、外阴颜色或形状方面的困扰，都可以在这里咨询。适不适合做相关项目，要看症状、生产经历、有没有炎症、皮肤状况，并由医生判断。',
      en: "Intimate care consultation helps organize concerns such as postpartum changes, looseness, dryness, discomfort, mild urinary leakage, and concerns about color or shape of the intimate area. Suitability depends on symptoms, childbirth history, inflammation status, skin condition, and doctor's judgment.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '私密紧致咨询', en: 'Intimate tightening consultation' },
      { zh: '外阴美白咨询', en: 'External intimate area brightening consultation' },
      { zh: '小阴唇形态咨询', en: 'Labia shape consultation' },
      { zh: '产后私密恢复咨询', en: 'Postpartum intimate recovery consultation' },
      { zh: '干涩与不适咨询', en: 'Dryness and discomfort consultation' },
      { zh: '轻微漏尿咨询', en: 'Mild urinary leakage consultation' },
      { zh: '私密激光、能量设备咨询', en: "Women's intimate laser or energy-device consultation" },
    ],
    note: {
      zh: '私密护理项目不能保证改善性功能、美白效果，也不能保证恢复到生孩子以前的状态。适不适合做，要由妇科医生根据症状和检查结果判断。',
      en: 'Intimate care should not promise sexual function improvement, whitening results, or return to pre-childbirth condition. Suitability must be determined by a gynecologist based on symptoms and test results.',
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'menopause-hormone-care',
    image: '/category-tiles/women/menopause-hormone-care.jpg',
    title: {
      zh: '更年期 · 激素',
      en: 'Menopause & Hormone Balance Management',
    },
    description: {
      zh: '潮热、睡不好、情绪波动、体重变化、月经变化、阴道干涩、容易累、骨质变差……这些和更年期、激素有关的问题都可以咨询。需不需要检查、吃药，还是调整生活方式，由医生来判断。',
      en: 'Menopause and hormone management consultation helps organize concerns such as hot flashes, sleep problems, mood changes, weight changes, menstrual changes, vaginal dryness, fatigue, and bone health. Whether tests, medication, or lifestyle management is needed must be determined by a doctor.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '更年期状态咨询', en: 'Menopause status consultation' },
      { zh: '女性激素咨询', en: 'Female hormone-related consultation' },
      { zh: '甲状腺和代谢状态咨询', en: 'Thyroid and metabolic status consultation' },
      { zh: '睡眠和情绪变化咨询', en: 'Sleep and mood change consultation' },
      { zh: '阴道干涩或不适咨询', en: 'Vaginal dryness or discomfort consultation' },
      { zh: '骨健康和营养状态咨询', en: 'Bone health and nutrition consultation' },
      { zh: '抗衰老健康管理咨询', en: 'Anti-aging health management consultation' },
    ],
    note: {
      zh: '激素治疗或补充激素，并不是每个人都适合。要结合年龄、病史、家族史、检查结果，由医生来判断。',
      en: "Hormone-related treatment or supplementation is not suitable for everyone. Age, medical history, family history, test results, and doctor's judgment must be considered.",
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
]
