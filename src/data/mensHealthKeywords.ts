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
} satisfies Record<string, MensHealthDocButton>

export type MensHealthDocButtonKey = keyof typeof MENS_HEALTH_DOC_BUTTONS

export interface MensHealthKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  /** kmedispring.com 세부 페이지 맨 위 전용 사진(타일엔 안 씀) — 잘리지 않게 전체를 보여준다. */
  heroImage?: string
  /** heroImage 아래 한 줄 설명 */
  heroCaption?: LocalizedText
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  note: LocalizedText
  /** 'warning' renders the note in the urgent/orange style instead of the neutral info style. */
  noteStyle?: 'info' | 'warning'
  docKeys: MensHealthDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可以咨询什么',
  en: 'Possible Consultation Areas',
}

export const MENS_HEALTH_SECTION = {
  title: {
    zh: '男性健康中心',
    en: "Men's Health Center",
  } as LocalizedText,
  subCopy: {
    zh: '男性激素与精力 · 免疫与抗衰 · 男性功能与私密 · 前列腺与泌尿',
    en: 'Hormones & Vitality · Immunity & Anti-Aging · Sexual Function & Intimate Care · Prostate & Urological Health',
  } as LocalizedText,
  desc: {
    zh: '很多来韩国做体检、皮肤或抗衰项目的男性客户，会顺便了解一下自己的身体。可以按年龄、生活习惯、疲劳程度和想做的检查，选择激素、免疫、男性功能或泌尿方面的咨询。',
    en: "Men's health management is an area many medical tourism clients explore alongside health checkups, skin treatments, or anti-aging programs during their visit to Korea. Depending on age, lifestyle, fatigue level, and testing needs, you can choose a hormone, immunity, sexual function, or urological health consultation direction that fits you.",
  } as LocalizedText,
}

const IMMUNITY_DIRECTIONS_LABEL: LocalizedText = {
  zh: '常见的检查和管理',
  en: 'Common Tests & Management Options',
}

export const MENS_HEALTH_KEYWORDS: MensHealthKeyword[] = [
  {
    id: 'male-hormone-vitality',
    image: '/category-tiles/man/male-hormone-vitality.jpg',
    title: {
      zh: '激素 · 精力',
      en: 'Male Hormones & Vitality Management',
    },
    description: {
      zh: '睾酮偏低、总觉得累、性功能下降、精力不够……来韩国期间可以抽血看看激素水平，再根据结果咨询营养补充或注射类的管理方法。',
      en: 'Male hormone and vitality consultation helps organize concerns such as testosterone levels, fatigue, decreased sexual function, and low energy. During your visit to Korea, hormone status can be checked through blood tests, and nutritional or injection-based management options can be discussed based on the results.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '男性激素（睾酮）检查', en: 'Male hormone / testosterone testing' },
      { zh: '疲劳和精力下降评估', en: 'Fatigue & low-energy assessment' },
      { zh: '性功能咨询', en: 'Sexual function consultation' },
      { zh: '男性激素注射、营养输液', en: 'Hormone-support injection / IV nutrient therapy' },
    ],
    note: {
      zh: '补充激素、打针治疗并不是每个人都适合，要结合抽血结果、年龄和以前的病史，由医生判断。',
      en: 'Hormone supplementation and related injection treatments are not suitable for everyone. Suitability must be determined by a doctor based on blood test results, age, and medical history.',
    },
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'immunity-anti-aging',
    image: '/category-tiles/man/immunity-anti-aging.jpg',
    title: {
      zh: '免疫 · 抗衰',
      en: 'Immunity & Anti-Aging Management',
    },
    description: {
      zh: '在韩国做免疫和抗衰管理，一般不只是聊聊，而是会结合抽血、NK细胞活性检查、激素和代谢检查，综合看疲劳、免疫力、精力和年龄带来的变化。如果您四十岁以后容易累、恢复变慢、体力下降，或者想系统地了解一下自己的身体，可以根据检查结果再咨询适合自己的管理方案。',
      en: 'Immunity and anti-aging management in Korea is typically more than a general health consultation — it combines blood tests, NK Cell Activity Testing, and hormone/metabolic testing to comprehensively assess fatigue, immune function, low energy, and age-related changes. For those over 40 who tire easily, recover slowly, or want to systematically understand their immune and anti-aging status, a personalized management plan can be discussed based on the test results.',
    },
    directionsLabel: IMMUNITY_DIRECTIONS_LABEL,
    directions: [
      { zh: 'NK细胞活性检查', en: 'NK Cell Activity Test' },
      { zh: '慢性疲劳、精力下降评估', en: 'Chronic fatigue & low-energy assessment' },
      { zh: '男性激素（睾酮）检查', en: 'Male hormone / testosterone testing' },
      { zh: '营养和维生素检查', en: 'Nutritional status & vitamin testing' },
      { zh: '静脉营养输液（IV Therapy）', en: 'IV nutrient therapy' },
      { zh: '血液净化疗法', en: 'Blood purification therapy' },
      { zh: '量身定制的营养品、维生素处方', en: 'Personalized supplement & vitamin prescription' },
    ],
    note: {
      zh: '每家医院的检查项目和方案不一样。适不适合、多久查一次、治疗做到什么程度，由医生根据身体状况判断。',
      en: 'Specific tests and management plans vary by clinic. Suitability, testing frequency, and treatment intensity must be determined by a doctor based on your health condition.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    // 2026-10-02 男性生育力 칸을 정력 쪽(확대·조루·발기부전)으로 바꿈 — 실제 문의가 들어온 의료관광 포인트.
    // 의료광고 규정상 효과 단정·과장 표현·병원 고유 상품명은 쓰지 않는다. 생식력은 한 줄로만 남김.
    id: 'male-function-intimate',
    // 음경 가로 단면 3D 해부도 — 증대 이식층(금색) 위치 설명, 중국어 설명선 이름 포함(1996×788)
    heroImage: '/category-tiles/man/male-function-intimate-hero.jpg',
    heroCaption: {
      zh: '阴茎横截面示意图 · 金色部分是增粗手术的植入层，在皮下组织和海绵体外层之间',
      en: 'Cross-section illustration of the penis · The gold layer shows where girth-enhancement material is placed, between the subcutaneous tissue and the outer layer of the erectile chambers',
    },
    image: '/category-tiles/man/male-fertility-sperm-health.jpg',
    title: {
      zh: '男性功能 · 私密',
      en: "Men's Sexual Function & Intimate Care",
    },
    description: {
      zh: '勃起变差、早泄、想增大增粗……这些男人在意又不好意思开口的事，都可以在这里咨询。韩国的泌尿外科在这方面有手术和非手术多种方案，您可以先把情况和期望告诉我们，再由专科医生面诊确认适合的方法。',
      en: 'Sexual function and intimate care consultation covers concerns many men care about but find hard to bring up — weaker erections, premature ejaculation, and the size or girth of the intimate area. Korean urology clinics offer both surgical and non-surgical options in this field; you can organize your symptoms and goals first, then a specialist will confirm the right approach in person.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '男性私密整形咨询（增大、增粗等）', en: 'Male intimate surgery consultation (enlargement, girth, etc.)' },
      { zh: '早泄咨询（手术和非手术方案）', en: 'Premature ejaculation consultation (surgical & non-surgical options)' },
      { zh: '勃起功能障碍（ED）检查和治疗咨询', en: 'Erectile dysfunction (ED) testing & treatment consultation' },
      { zh: '男性生育力、精液检查', en: 'Male fertility & semen analysis' },
    ],
    note: {
      zh: '手术方式、效果和恢复期因人而异，适不适合要由泌尿外科医生面诊判断。咨询内容全程保密。',
      en: 'Methods, results, and recovery vary from person to person; a urology specialist decides suitability in person. All consultations are confidential.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'prostate-urology-intimate-health',
    image: '/category-tiles/man/prostate-urology-intimate-health.jpg',
    title: {
      zh: '前列腺 · 泌尿',
      en: 'Prostate & Urological Intimate Health Management',
    },
    description: {
      zh: '前列腺检查（比如PSA）、排尿问题、泌尿生殖系统感染筛查，以及包皮、结扎这些私密健康问题，都可以咨询。按年龄、症状和想做的检查，帮您选合适的方向。',
      en: 'Prostate and urological intimate health management covers prostate checks (such as PSA), urination-related concerns, urogenital infection screening, and intimate health topics such as circumcision or vasectomy consultation. Depending on age, symptoms, and testing needs, you can choose the checkup or consultation direction that fits you.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '前列腺健康检查（PSA等）', en: 'Prostate health checkup (PSA, etc.)' },
      { zh: '排尿问题咨询', en: 'Urination-related consultation' },
      { zh: '泌尿生殖系统感染筛查', en: 'Urogenital infection screening' },
      { zh: '男性私密健康咨询（包皮、结扎等）', en: "Men's intimate health consultation (circumcision, vasectomy, etc.)" },
    ],
    note: {
      zh: '这些症状的原因有很多，需不需要检查或治疗，要由泌尿外科医生判断。',
      en: 'These concerns can have various causes. Whether testing or treatment is needed must be determined by a urology specialist.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
]
