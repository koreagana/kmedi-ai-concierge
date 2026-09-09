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
    zh: '前列腺 · 男性激素 · 性功能 · 生育力 · 私密健康',
    en: 'Prostate · Male Hormones · Sexual Function · Fertility · Intimate Health',
  } as LocalizedText,
  desc: {
    zh: '韩国男性健康咨询不是单纯处理某一个症状，而是根据年龄、生活习惯、排尿情况、激素状态、性功能、生育计划和既往检查资料，整理适合咨询的泌尿医学与男性健康方向。',
    en: "Men's health consultation in Korea is not about addressing only one symptom. It is a process of organizing urology and men's health consultation directions based on age, lifestyle, urination status, hormone status, sexual function, fertility plans, and previous medical reports.",
  } as LocalizedText,
}

export const MENS_HEALTH_KEYWORDS: MensHealthKeyword[] = [
  {
    id: 'prostate-health',
    image: '/keyword-tiles/prostate-health.jpg',
    title: {
      zh: '前列腺健康咨询',
      en: 'Prostate Health',
    },
    description: {
      zh: '前列腺健康咨询主要用于整理前列腺肥大、前列腺炎、PSA结果、既往检查资料和前列腺癌筛查相关问题。特别是40岁以后，若有排尿变化或既往检查异常，建议提前整理相关资料后咨询。',
      en: 'Prostate health consultation helps organize concerns related to benign prostate enlargement, prostatitis, PSA results, previous medical reports, and prostate cancer screening. Especially after the age of 40, if urination changes or previous abnormal findings exist, relevant records should be prepared before consultation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: 'PSA结果相关咨询', en: 'PSA result consultation' },
      { zh: '前列腺肥大相关咨询', en: 'Benign prostate enlargement consultation' },
      { zh: '前列腺炎相关咨询', en: 'Prostatitis-related consultation' },
      { zh: '前列腺癌筛查方向咨询', en: 'Prostate cancer screening direction' },
      { zh: '既往检查资料整理', en: 'Review of previous medical reports' },
      { zh: '复查计划咨询', en: 'Follow-up planning' },
    ],
    note: {
      zh: 'PSA数值升高不一定代表前列腺癌，数值正常也不代表完全没有风险。结果解释和是否需要进一步检查，需要由泌尿医学专业医生判断。',
      en: 'An elevated PSA level does not necessarily mean prostate cancer, and a normal PSA level does not mean there is no risk. Interpretation and the need for further evaluation must be determined by a urology specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'urination-problems',
    image: '/keyword-tiles/urination-problems.jpg',
    title: {
      zh: '排尿障碍咨询',
      en: 'Urination Problems',
    },
    description: {
      zh: '排尿问题咨询主要用于整理尿频、夜尿、尿不尽、尿线变弱、排尿等待、尿急、排尿疼痛等问题。排尿变化可能与前列腺、膀胱、感染、代谢状态、生活习惯或正在服用的药物有关。',
      en: 'Urination problem consultation helps organize concerns such as frequent urination, nighttime urination, incomplete emptying, weak urine stream, delayed start of urination, urgency, or pain during urination. Urination changes may be related to the prostate, bladder, infection, metabolic status, lifestyle, or current medications.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '夜尿相关咨询', en: 'Nighttime urination consultation' },
      { zh: '尿频相关咨询', en: 'Frequent urination consultation' },
      { zh: '尿不尽相关咨询', en: 'Incomplete emptying consultation' },
      { zh: '尿线变弱相关咨询', en: 'Weak urine stream consultation' },
      { zh: '尿急或排尿等待相关咨询', en: 'Urgency or delayed urination consultation' },
      { zh: '前列腺和膀胱相关咨询', en: 'Prostate and bladder-related consultation' },
      { zh: '生活习惯和既往用药资料整理', en: 'Lifestyle and medication history organization' },
    ],
    note: {
      zh: '排尿问题可能有多种原因，不能只根据一个症状判断。是否需要检查或治疗，需要医生面诊后决定。',
      en: "Urination problems can have multiple causes and cannot be judged by one symptom alone. Whether tests or treatment are needed must be determined after a doctor's consultation.",
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'male-hormones-sexual-function',
    image: '/keyword-tiles/male-hormones-andropause.jpg',
    title: {
      zh: '男性激素・性功能咨询',
      en: 'Male Hormones & Sexual Function',
    },
    description: {
      zh: '男性激素和性功能咨询主要用于整理疲劳、性欲下降、勃起功能下降、肌肉量减少、腹部脂肪增加、情绪变化、睡眠问题、早泄或射精相关问题，以及既往激素检查结果。男性激素状态与性功能密切相关，需要结合症状、血液检查结果、年龄和基础疾病综合判断。',
      en: 'Male hormone and sexual function consultation helps organize fatigue, decreased libido, erectile dysfunction, reduced muscle mass, increased abdominal fat, mood changes, sleep problems, premature ejaculation or ejaculation-related issues, and previous hormone test results. Male hormone status is closely linked to sexual function and should be assessed together with symptoms, blood test results, age, and underlying conditions.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '男性激素状态咨询', en: 'Male hormone status consultation' },
      { zh: '疲劳和睡眠问题咨询', en: 'Fatigue and sleep problem consultation' },
      { zh: '性欲下降咨询', en: 'Decreased libido consultation' },
      { zh: '勃起功能相关咨询', en: 'Erectile function consultation' },
      { zh: '早泄・射精相关咨询', en: 'Premature ejaculation & ejaculation-related consultation' },
      { zh: '肌肉量和体脂变化咨询', en: 'Muscle mass and body fat change consultation' },
      { zh: '代谢健康和相关用药整理', en: 'Metabolic health and medication review' },
      { zh: '既往血液检查结果整理', en: 'Review of previous blood test results' },
    ],
    note: {
      zh: '男性激素补充和性功能相关治疗并不适合所有人。前列腺疾病、心血管风险、睡眠呼吸暂停、既往病史、用药情况和检查结果都需要由医生综合判断，性功能问题也不能简单理解为只需要用药。',
      en: 'Male hormone supplementation and sexual function treatment are not suitable for everyone. Prostate disease, cardiovascular risk, sleep apnea, medical history, medications, and test results must be reviewed comprehensively by a doctor — sexual function problems should not be understood as medication-only issues.',
    },
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'fertility-sperm-health',
    image: '/keyword-tiles/fertility-sperm-health.jpg',
    title: {
      zh: '男性生育力・精子健康',
      en: 'Fertility & Sperm Health',
    },
    description: {
      zh: '男性生育力和精子健康咨询主要用于整理备孕计划、既往精液检查结果、精索静脉曲张、睾丸相关病史、生活习惯和夫妻双方的不孕资料。男性因素也是备孕和不孕咨询中重要的一部分。',
      en: 'Male fertility and sperm health consultation helps organize pregnancy planning, previous semen analysis results, varicocele, testicular medical history, lifestyle, and infertility-related information from both partners. Male factors are an important part of fertility planning and infertility consultation.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前男性健康咨询', en: "Pre-pregnancy men's health consultation" },
      { zh: '精子健康相关咨询', en: 'Sperm health consultation' },
      { zh: '既往精液检查结果整理', en: 'Review of previous semen analysis results' },
      { zh: '精索静脉曲张相关咨询', en: 'Varicocele-related consultation' },
      { zh: '男性不孕相关咨询', en: 'Male infertility consultation' },
      { zh: '夫妻双方资料整理', en: 'Information organization for both partners' },
      { zh: '生活习惯和营养状态咨询', en: 'Lifestyle and nutrition consultation' },
    ],
    note: {
      zh: '男性生育力需要与女性因素一起评估。精液检查结果可能受检查条件、禁欲时间、身体状态和时间差异影响，具体判断需要由泌尿医学或生殖医学专业医生进行。',
      en: 'Male fertility should be evaluated together with female factors. Semen analysis results can be affected by test conditions, abstinence period, health status, and timing. Detailed interpretation must be done by a urology or reproductive medicine specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'infection-inflammation',
    image: '/keyword-tiles/infection-inflammation.jpg',
    title: {
      zh: '泌尿生殖感染・炎症咨询',
      en: 'Infection & Inflammation',
    },
    description: {
      zh: '感染和炎症咨询主要用于整理排尿疼痛、尿道不适、分泌物、性传播感染担忧、前列腺炎相关不适、睾丸或附睾疼痛等问题。相关症状可能与伴侣健康和既往用药有关。',
      en: 'Infection and inflammation consultation helps organize concerns such as painful urination, urethral discomfort, discharge, concerns about sexually transmitted infections, prostatitis-related discomfort, and testicular or epididymal pain. These symptoms may also be related to partner health and previous medication use.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '尿道不适咨询', en: 'Urethral discomfort consultation' },
      { zh: '排尿疼痛咨询', en: 'Painful urination consultation' },
      { zh: '性传播感染相关咨询', en: 'Sexually transmitted infection consultation' },
      { zh: '前列腺炎相关咨询', en: 'Prostatitis-related consultation' },
      { zh: '睾丸或附睾疼痛咨询', en: 'Testicular or epididymal pain consultation' },
      { zh: '伴侣健康相关问题整理', en: 'Partner health-related information' },
      { zh: '既往用药和检查资料整理', en: 'Previous medication and test report organization' },
    ],
    note: {
      zh: '感染和炎症不建议自行判断或随意服药。若有疼痛、发热、明显分泌物或睾丸疼痛，应及时联系医院。',
      en: 'Infection and inflammation should not be self-diagnosed or self-treated. If pain, fever, obvious discharge, or testicular pain occurs, the hospital should be contacted promptly.',
    },
    noteStyle: 'warning',
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'mens-intimate-care',
    image: '/keyword-tiles/mens-intimate-care.jpg',
    title: {
      zh: '男性私密健康咨询',
      en: "Men's Intimate Care",
    },
    description: {
      zh: '男性私密护理咨询主要用于整理包皮、输精管结扎、阴茎弯曲、男性私密外观或术后恢复相关问题。此类咨询需要兼顾功能、感觉、恢复期、疤痕和个人期待值。',
      en: "Men's intimate care consultation helps organize concerns related to circumcision, vasectomy, penile curvature, intimate appearance, and postoperative recovery. These consultations should consider function, sensation, recovery time, scarring, and personal expectations.",
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '包皮相关咨询', en: 'Circumcision-related consultation' },
      { zh: '输精管结扎相关咨询', en: 'Vasectomy-related consultation' },
      { zh: '阴茎弯曲相关咨询', en: 'Penile curvature consultation' },
      { zh: '男性私密外观咨询', en: "Men's intimate appearance consultation" },
      { zh: '术后恢复管理咨询', en: 'Postoperative recovery management' },
      { zh: '既往手术或不适症状整理', en: 'Previous surgery history or discomfort organization' },
    ],
    note: {
      zh: '男性私密相关治疗不应承诺效果、满意度、性功能改善或完全无疤痕。是否适合相关治疗，需要由泌尿医学专业医生判断。',
      en: "Men's intimate treatments should not promise results, satisfaction, sexual function improvement, or no scarring. Suitability must be determined by a urology specialist.",
    },
    docKeys: ['functionalIntake'],
  },
]
