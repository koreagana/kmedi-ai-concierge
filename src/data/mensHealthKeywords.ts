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
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      ko: '기업위챗 상담하기',
      en: 'Open WeCom Consultation',
      ar: 'فتح استشارة ويكوم',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, MensHealthDocButton>

export type MensHealthDocButtonKey = keyof typeof MENS_HEALTH_DOC_BUTTONS

export interface MensHealthKeyword {
  id: string
  title: LocalizedText
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
  ko: '관련 상담 방향',
  en: 'Possible Consultation Areas',
  ar: 'مجالات الاستشارة المحتملة',
}

export const MENS_HEALTH_SECTION = {
  title: {
    zh: '男性健康中心',
    ko: '남성건강센터',
    en: "Men's Health Center",
    ar: 'مركز صحة الرجل',
  } as LocalizedText,
  subCopy: {
    zh: '前列腺 · 男性激素 · 性功能 · 生育力 · 私密健康',
    ko: '전립선 · 남성호르몬 · 성기능 · 생식건강 · 프라이빗 건강',
    en: 'Prostate · Male Hormones · Sexual Function · Fertility · Intimate Health',
    ar: 'البروستاتا · الهرمونات الذكورية · الوظيفة الجنسية · الخصوبة · الصحة الحميمة',
  } as LocalizedText,
  desc: {
    zh: '韩国男性健康咨询不是单纯处理某一个症状，而是根据年龄、生活习惯、排尿情况、激素状态、性功能、生育计划和既往检查资料，整理适合咨询的泌尿医学与男性健康方向。',
    ko: '한국 남성건강 상담은 단순히 하나의 증상만 보는 것이 아니라, 나이, 생활습관, 배뇨 상태, 호르몬 상태, 성기능, 임신 계획, 기존 검사자료를 기준으로 비뇨의학과 및 남성건강 상담 방향을 정리하는 과정입니다.',
    en: "Men's health consultation in Korea is not about addressing only one symptom. It is a process of organizing urology and men's health consultation directions based on age, lifestyle, urination status, hormone status, sexual function, fertility plans, and previous medical reports.",
    ar: 'استشارة صحة الرجل في كوريا لا تعني التعامل مع عرض واحد فقط، بل هي عملية تنظيم اتجاه الاستشارة في طب المسالك البولية وصحة الرجل بناءً على العمر، ونمط الحياة، وحالة التبول، والهرمونات، والوظيفة الجنسية، وخطة الإنجاب، والتقارير الطبية السابقة.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国男性健康咨询前的信息整理，不代替医生诊断或治疗判断。',
      ko: '본 페이지는 한국 남성건강 상담 전 정보 정리를 위한 참고 안내이며 의사의 진단이나 치료 판단을 대신하지 않습니다.',
      en: "This page is for organizing information before a men's health consultation in Korea and does not replace a doctor's diagnosis or treatment decision.",
      ar: 'هذه الصفحة مخصصة لتنظيم المعلومات قبل استشارة صحة الرجل في كوريا، ولا تحل محل تشخيص الطبيب أو قراره العلاجي.',
    },
    {
      zh: '具体是否需要检查、药物治疗、手术或进一步评估，需要由正规医疗机构和泌尿医学专业医生判断。',
      ko: '검사, 약물치료, 수술 또는 추가 평가 필요 여부는 정규 의료기관과 비뇨의학과 전문의가 판단해야 합니다.',
      en: 'Whether tests, medication, surgery, or further evaluation is needed must be determined by a licensed medical institution and qualified urology specialists.',
      ar: 'الحاجة إلى الفحوصات أو الأدوية أو الجراحة أو التقييم الإضافي يجب أن يحددها مستشفى مرخص وطبيب مختص في المسالك البولية.',
    },
  ] as LocalizedText[],
}

export const MENS_HEALTH_KEYWORDS: MensHealthKeyword[] = [
  {
    id: 'prostate-health',
    title: {
      zh: '前列腺健康',
      ko: '전립선 건강',
      en: 'Prostate Health',
      ar: 'صحة البروستاتا',
    },
    description: {
      zh: '前列腺健康咨询主要用于整理前列腺肥大、前列腺炎、PSA结果、既往检查资料和前列腺癌筛查相关问题。特别是40岁以后，若有排尿变化或既往检查异常，建议提前整理相关资料后咨询。',
      ko: '전립선 건강 상담은 전립선비대증, 전립선염, PSA 결과, 기존 검사자료, 전립선암 검진 관련 고민을 정리하는 과정입니다. 특히 40대 이후 배뇨 변화가 있거나 기존 검사에서 이상 소견이 있었다면 관련 자료를 미리 정리해 상담하는 것이 좋습니다.',
      en: 'Prostate health consultation helps organize concerns related to benign prostate enlargement, prostatitis, PSA results, previous medical reports, and prostate cancer screening. Especially after the age of 40, if urination changes or previous abnormal findings exist, relevant records should be prepared before consultation.',
      ar: 'تساعد استشارة صحة البروستاتا في تنظيم الشكاوى المتعلقة بتضخم البروستاتا الحميد، والتهاب البروستاتا، ونتائج PSA، والتقارير الطبية السابقة، وفحص سرطان البروستاتا. وخاصة بعد سن الأربعين، إذا كانت هناك تغيرات في التبول أو نتائج غير طبيعية سابقة، فمن الأفضل تحضير التقارير قبل الاستشارة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: 'PSA结果相关咨询', ko: 'PSA 결과 관련 상담', en: 'PSA result consultation', ar: 'استشارة نتائج PSA' },
      { zh: '前列腺肥大相关咨询', ko: '전립선비대증 관련 상담', en: 'Benign prostate enlargement consultation', ar: 'استشارة تضخم البروستاتا الحميد' },
      { zh: '前列腺炎相关咨询', ko: '전립선염 관련 상담', en: 'Prostatitis-related consultation', ar: 'استشارة التهاب البروستاتا' },
      { zh: '前列腺癌筛查方向咨询', ko: '전립선암 검진 방향 상담', en: 'Prostate cancer screening direction', ar: 'اتجاه فحص سرطان البروستاتا' },
      { zh: '既往检查资料整理', ko: '기존 검사자료 정리', en: 'Review of previous medical reports', ar: 'مراجعة التقارير الطبية السابقة' },
      { zh: '复查计划咨询', ko: '재검 계획 상담', en: 'Follow-up planning', ar: 'خطة المتابعة' },
    ],
    note: {
      zh: 'PSA数值升高不一定代表前列腺癌，数值正常也不代表完全没有风险。结果解释和是否需要进一步检查，需要由泌尿医学专业医生判断。',
      ko: 'PSA 수치가 높다고 반드시 전립선암을 의미하는 것은 아니며, 수치가 정상이라고 모든 위험이 없다는 뜻도 아닙니다. 결과 해석과 추가검사 필요 여부는 비뇨의학과 전문의가 판단해야 합니다.',
      en: 'An elevated PSA level does not necessarily mean prostate cancer, and a normal PSA level does not mean there is no risk. Interpretation and the need for further evaluation must be determined by a urology specialist.',
      ar: 'ارتفاع PSA لا يعني بالضرورة وجود سرطان البروستاتا، كما أن النتيجة الطبيعية لا تعني عدم وجود أي خطر. تفسير النتائج والحاجة إلى تقييم إضافي يجب أن يحدده طبيب مختص في المسالك البولية.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'urination-problems',
    title: {
      zh: '排尿问题',
      ko: '배뇨 문제',
      en: 'Urination Problems',
      ar: 'مشكلات التبول',
    },
    description: {
      zh: '排尿问题咨询主要用于整理尿频、夜尿、尿不尽、尿线变弱、排尿等待、尿急、排尿疼痛等问题。排尿变化可能与前列腺、膀胱、感染、代谢状态、生活习惯或正在服用的药物有关。',
      ko: '배뇨 문제 상담은 빈뇨, 야간뇨, 잔뇨감, 약한 소변줄기, 소변 시작이 어려움, 급박뇨, 배뇨통 등의 고민을 정리하는 과정입니다. 배뇨 변화는 전립선, 방광, 감염, 대사 상태, 생활습관, 복용약과 관련될 수 있습니다.',
      en: 'Urination problem consultation helps organize concerns such as frequent urination, nighttime urination, incomplete emptying, weak urine stream, delayed start of urination, urgency, or pain during urination. Urination changes may be related to the prostate, bladder, infection, metabolic status, lifestyle, or current medications.',
      ar: 'تساعد استشارة مشكلات التبول في تنظيم الشكاوى مثل كثرة التبول، والتبول الليلي، والشعور بعدم تفريغ المثانة، وضعف تدفق البول، وصعوبة بدء التبول، والإلحاح، أو الألم أثناء التبول. قد تكون تغيرات التبول مرتبطة بالبروستاتا أو المثانة أو العدوى أو الحالة الأيضية أو نمط الحياة أو الأدوية الحالية.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '夜尿相关咨询', ko: '야간뇨 관련 상담', en: 'Nighttime urination consultation', ar: 'استشارة التبول الليلي' },
      { zh: '尿频相关咨询', ko: '빈뇨 관련 상담', en: 'Frequent urination consultation', ar: 'استشارة كثرة التبول' },
      { zh: '尿不尽相关咨询', ko: '잔뇨감 관련 상담', en: 'Incomplete emptying consultation', ar: 'استشارة عدم تفريغ المثانة' },
      { zh: '尿线变弱相关咨询', ko: '소변줄기 약화 관련 상담', en: 'Weak urine stream consultation', ar: 'استشارة ضعف تدفق البول' },
      { zh: '尿急或排尿等待相关咨询', ko: '급박뇨 또는 배뇨 시작 지연 관련 상담', en: 'Urgency or delayed urination consultation', ar: 'استشارة الإلحاح أو تأخر بدء التبول' },
      { zh: '前列腺和膀胱相关咨询', ko: '전립선 및 방광 관련 상담', en: 'Prostate and bladder-related consultation', ar: 'استشارة متعلقة بالبروستاتا والمثانة' },
      { zh: '生活习惯和既往用药资料整理', ko: '생활습관과 기존 복용약 자료 정리', en: 'Lifestyle and medication history organization', ar: 'تنظيم نمط الحياة وتاريخ الأدوية' },
    ],
    note: {
      zh: '排尿问题可能有多种原因，不能只根据一个症状判断。是否需要检查或治疗，需要医生面诊后决定。',
      ko: '배뇨 문제는 여러 원인으로 발생할 수 있으므로 하나의 증상만으로 판단할 수 없습니다. 검사 또는 치료 필요 여부는 의사 면담 후 결정해야 합니다.',
      en: "Urination problems can have multiple causes and cannot be judged by one symptom alone. Whether tests or treatment are needed must be determined after a doctor's consultation.",
      ar: 'قد تكون مشكلات التبول ناتجة عن أسباب متعددة، ولا يمكن الحكم عليها من عرض واحد فقط. الحاجة إلى الفحص أو العلاج يجب أن يحددها الطبيب بعد الاستشارة.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'male-hormones-andropause',
    title: {
      zh: '男性激素·更年期',
      ko: '남성호르몬·갱년기',
      en: 'Male Hormones & Andropause',
      ar: 'الهرمونات الذكورية وسن اليأس الذكوري',
    },
    description: {
      zh: '男性激素和更年期咨询主要用于整理疲劳、性欲下降、肌肉量减少、腹部脂肪增加、情绪变化、睡眠问题和既往激素检查结果。男性激素状态需要结合症状、血液检查结果、年龄和基础疾病综合判断。',
      ko: '남성호르몬·갱년기 상담은 피로감, 성욕 저하, 근육량 감소, 복부지방 증가, 감정 변화, 수면 문제, 기존 호르몬 검사결과를 정리하는 과정입니다. 남성호르몬 상태는 증상, 혈액검사 결과, 나이, 기저질환을 함께 고려해야 합니다.',
      en: 'Male hormone and andropause consultation helps organize fatigue, decreased libido, reduced muscle mass, increased abdominal fat, mood changes, sleep problems, and previous hormone test results. Male hormone status should be assessed together with symptoms, blood test results, age, and underlying conditions.',
      ar: 'تساعد استشارة الهرمونات الذكورية وسن اليأس الذكوري في تنظيم الشكاوى مثل التعب، وانخفاض الرغبة الجنسية، وانخفاض الكتلة العضلية، وزيادة دهون البطن، وتغير المزاج، ومشكلات النوم، ونتائج فحوصات الهرمونات السابقة. يجب تقييم حالة الهرمونات مع الأعراض، ونتائج فحوصات الدم، والعمر، والأمراض المزمنة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '男性激素状态咨询', ko: '남성호르몬 상태 상담', en: 'Male hormone status consultation', ar: 'استشارة حالة الهرمونات الذكورية' },
      { zh: '疲劳和睡眠问题咨询', ko: '피로와 수면 문제 상담', en: 'Fatigue and sleep problem consultation', ar: 'استشارة التعب ومشكلات النوم' },
      { zh: '性欲下降咨询', ko: '성욕 저하 상담', en: 'Decreased libido consultation', ar: 'استشارة انخفاض الرغبة الجنسية' },
      { zh: '肌肉量和体脂变化咨询', ko: '근육량과 체지방 변화 상담', en: 'Muscle mass and body fat change consultation', ar: 'استشارة تغير الكتلة العضلية ودهون الجسم' },
      { zh: '代谢健康相关咨询', ko: '대사 건강 관련 상담', en: 'Metabolic health consultation', ar: 'استشارة الصحة الأيضية' },
      { zh: '既往血液检查结果整理', ko: '기존 혈액검사 결과 정리', en: 'Review of previous blood test results', ar: 'مراجعة نتائج فحوصات الدم السابقة' },
      { zh: '生活方式管理咨询', ko: '생활습관 관리 상담', en: 'Lifestyle management consultation', ar: 'استشارة إدارة نمط الحياة' },
    ],
    note: {
      zh: '男性激素补充并不适合所有人。前列腺疾病、心血管风险、睡眠呼吸暂停、既往病史和检查结果都需要由医生综合判断。',
      ko: '남성호르몬 보충은 모든 사람에게 적합하지 않습니다. 전립선 질환, 심혈관 위험, 수면무호흡, 기존 병력, 검사결과를 의사가 종합적으로 판단해야 합니다.',
      en: 'Male hormone supplementation is not suitable for everyone. Prostate disease, cardiovascular risk, sleep apnea, medical history, and test results must be reviewed comprehensively by a doctor.',
      ar: 'تعويض الهرمونات الذكورية ليس مناسبًا للجميع. يجب أن يقيّم الطبيب أمراض البروستاتا، ومخاطر القلب والأوعية، وانقطاع النفس أثناء النوم، والتاريخ المرضي، ونتائج الفحوصات بشكل شامل.',
    },
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'sexual-function',
    title: {
      zh: '性功能咨询',
      ko: '성기능 상담',
      en: 'Sexual Function Consultation',
      ar: 'استشارة الوظيفة الجنسية',
    },
    description: {
      zh: '性功能咨询主要用于整理勃起功能下降、性欲下降、早泄、射精相关问题、关系中的不适感和相关用药问题。性功能问题可能与血管健康、激素、心理状态、睡眠、压力、代谢疾病和服用药物有关。',
      ko: '성기능 상담은 발기기능 저하, 성욕 저하, 조루, 사정 관련 문제, 관계 중 불편감, 관련 약물 복용 문제를 정리하는 과정입니다. 성기능 문제는 혈관 건강, 호르몬, 심리 상태, 수면, 스트레스, 대사질환, 복용약과 관련될 수 있습니다.',
      en: 'Sexual function consultation helps organize concerns such as decreased erectile function, decreased libido, premature ejaculation, ejaculation-related issues, discomfort during intercourse, and medication-related concerns. Sexual function can be related to vascular health, hormones, psychological status, sleep, stress, metabolic disease, and medications.',
      ar: 'تساعد استشارة الوظيفة الجنسية في تنظيم الشكاوى مثل ضعف الانتصاب، وانخفاض الرغبة الجنسية، وسرعة القذف، ومشكلات القذف، والانزعاج أثناء العلاقة، والمشكلات المتعلقة بالأدوية. وقد ترتبط الوظيفة الجنسية بصحة الأوعية الدموية، والهرمونات، والحالة النفسية، والنوم، والضغط، والأمراض الأيضية، والأدوية.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '勃起功能相关咨询', ko: '발기기능 관련 상담', en: 'Erectile function consultation', ar: 'استشارة ضعف الانتصاب' },
      { zh: '性欲下降咨询', ko: '성욕 저하 상담', en: 'Decreased libido consultation', ar: 'استشارة انخفاض الرغبة الجنسية' },
      { zh: '早泄相关咨询', ko: '조루 관련 상담', en: 'Premature ejaculation consultation', ar: 'استشارة سرعة القذف' },
      { zh: '射精问题咨询', ko: '사정 문제 상담', en: 'Ejaculation-related consultation', ar: 'استشارة مشكلات القذف' },
      { zh: '相关用药咨询', ko: '관련 약물 상담', en: 'Medication-related consultation', ar: 'استشارة متعلقة بالأدوية' },
      { zh: '血管和代谢健康相关咨询', ko: '혈관 및 대사 건강 관련 상담', en: 'Vascular and metabolic health consultation', ar: 'استشارة صحة الأوعية والتمثيل الغذائي' },
      { zh: '心理压力和睡眠状态整理', ko: '심리적 스트레스와 수면 상태 정리', en: 'Stress and sleep status organization', ar: 'تنظيم حالة الضغط النفسي والنوم' },
    ],
    note: {
      zh: '性功能问题不能简单理解为只需要用药。需要根据身体状态、基础疾病、用药情况和医生判断确认适合的咨询方向。',
      ko: '성기능 문제는 단순히 약만으로 판단할 수 없습니다. 몸 상태, 기저질환, 복용약, 의료진 판단을 바탕으로 적합한 상담 방향을 확인해야 합니다.',
      en: 'Sexual function problems should not be understood as medication-only issues. The appropriate consultation direction must be determined based on health status, underlying disease, current medications, and medical judgment.',
      ar: 'مشكلات الوظيفة الجنسية لا تعني بالضرورة أن الحل هو الدواء فقط. يجب تحديد اتجاه الاستشارة المناسب بناءً على الحالة الصحية، والأمراض المزمنة، والأدوية الحالية، وتقييم الطبيب.',
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'fertility-sperm-health',
    title: {
      zh: '生育力·精子健康',
      ko: '생식능력·정자 건강',
      en: 'Fertility & Sperm Health',
      ar: 'الخصوبة وصحة الحيوانات المنوية',
    },
    description: {
      zh: '男性生育力和精子健康咨询主要用于整理备孕计划、既往精液检查结果、精索静脉曲张、睾丸相关病史、生活习惯和夫妻双方的不孕资料。男性因素也是备孕和不孕咨询中重要的一部分。',
      ko: '생식능력·정자 건강 상담은 임신 준비, 기존 정액검사 결과, 정계정맥류, 고환 관련 병력, 생활습관, 부부 양측 난임 자료를 정리하는 과정입니다. 남성 요인도 임신 준비와 난임 상담에서 중요한 부분입니다.',
      en: 'Male fertility and sperm health consultation helps organize pregnancy planning, previous semen analysis results, varicocele, testicular medical history, lifestyle, and infertility-related information from both partners. Male factors are an important part of fertility planning and infertility consultation.',
      ar: 'تساعد استشارة الخصوبة وصحة الحيوانات المنوية في تنظيم خطة الحمل، ونتائج تحليل السائل المنوي السابقة، ودوالي الخصية، وتاريخ أمراض الخصية، ونمط الحياة، ومعلومات الزوجين المتعلقة بتأخر الحمل. العوامل الذكورية جزء مهم من التخطيط للحمل واستشارة تأخر الحمل.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前男性健康咨询', ko: '임신 준비 전 남성 건강 상담', en: "Pre-pregnancy men's health consultation", ar: 'استشارة صحة الرجل قبل الحمل' },
      { zh: '精子健康相关咨询', ko: '정자 건강 관련 상담', en: 'Sperm health consultation', ar: 'استشارة صحة الحيوانات المنوية' },
      { zh: '既往精液检查结果整理', ko: '기존 정액검사 결과 정리', en: 'Review of previous semen analysis results', ar: 'مراجعة نتائج تحليل السائل المنوي السابقة' },
      { zh: '精索静脉曲张相关咨询', ko: '정계정맥류 관련 상담', en: 'Varicocele-related consultation', ar: 'استشارة دوالي الخصية' },
      { zh: '男性不孕相关咨询', ko: '남성 난임 관련 상담', en: 'Male infertility consultation', ar: 'استشارة تأخر الحمل بسبب عوامل ذكورية' },
      { zh: '夫妻双方资料整理', ko: '부부 양측 자료 정리', en: 'Information organization for both partners', ar: 'تنظيم معلومات الزوجين' },
      { zh: '生活习惯和营养状态咨询', ko: '생활습관과 영양 상태 상담', en: 'Lifestyle and nutrition consultation', ar: 'استشارة نمط الحياة والتغذية' },
    ],
    note: {
      zh: '男性生育力需要与女性因素一起评估。精液检查结果可能受检查条件、禁欲时间、身体状态和时间差异影响，具体判断需要由泌尿医学或生殖医学专业医生进行。',
      ko: '남성 생식능력은 여성 요인과 함께 평가해야 합니다. 정액검사 결과는 검사 조건, 금욕 기간, 몸 상태, 시기 차이에 따라 달라질 수 있으며, 구체적인 판단은 비뇨의학과 또는 생식의학 전문의가 해야 합니다.',
      en: 'Male fertility should be evaluated together with female factors. Semen analysis results can be affected by test conditions, abstinence period, health status, and timing. Detailed interpretation must be done by a urology or reproductive medicine specialist.',
      ar: 'يجب تقييم خصوبة الرجل مع عوامل المرأة أيضًا. قد تتأثر نتائج تحليل السائل المنوي بشروط الفحص، وفترة الامتناع، والحالة الصحية، وتوقيت الفحص. التفسير التفصيلي يجب أن يقوم به طبيب مختص في المسالك البولية أو طب الإنجاب.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'infection-inflammation',
    title: {
      zh: '感染·炎症咨询',
      ko: '감염·염증 상담',
      en: 'Infection & Inflammation',
      ar: 'العدوى والالتهاب',
    },
    description: {
      zh: '感染和炎症咨询主要用于整理排尿疼痛、尿道不适、分泌物、性传播感染担忧、前列腺炎相关不适、睾丸或附睾疼痛等问题。相关症状可能与伴侣健康和既往用药有关。',
      ko: '감염·염증 상담은 배뇨통, 요도 불편감, 분비물, 성매개감염 우려, 전립선염 관련 불편감, 고환 또는 부고환 통증 등의 고민을 정리하는 과정입니다. 관련 증상은 파트너 건강과 기존 복용약 이력과도 관련될 수 있습니다.',
      en: 'Infection and inflammation consultation helps organize concerns such as painful urination, urethral discomfort, discharge, concerns about sexually transmitted infections, prostatitis-related discomfort, and testicular or epididymal pain. These symptoms may also be related to partner health and previous medication use.',
      ar: 'تساعد استشارة العدوى والالتهاب في تنظيم الشكاوى مثل الألم أثناء التبول، أو الانزعاج في الإحليل، أو الإفرازات، أو القلق من العدوى المنقولة جنسيًا، أو أعراض التهاب البروستاتا، أو ألم الخصية أو البربخ. قد تكون هذه الأعراض مرتبطة أيضًا بصحة الشريك أو بالأدوية السابقة.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '尿道不适咨询', ko: '요도 불편감 상담', en: 'Urethral discomfort consultation', ar: 'استشارة الانزعاج في الإحليل' },
      { zh: '排尿疼痛咨询', ko: '배뇨통 상담', en: 'Painful urination consultation', ar: 'استشارة الألم أثناء التبول' },
      { zh: '性传播感染相关咨询', ko: '성매개감염 관련 상담', en: 'Sexually transmitted infection consultation', ar: 'استشارة العدوى المنقولة جنسيًا' },
      { zh: '前列腺炎相关咨询', ko: '전립선염 관련 상담', en: 'Prostatitis-related consultation', ar: 'استشارة التهاب البروستاتا' },
      { zh: '睾丸或附睾疼痛咨询', ko: '고환 또는 부고환 통증 상담', en: 'Testicular or epididymal pain consultation', ar: 'استشارة ألم الخصية أو البربخ' },
      { zh: '伴侣健康相关问题整理', ko: '파트너 건강 관련 문제 정리', en: 'Partner health-related information', ar: 'تنظيم معلومات متعلقة بصحة الشريك' },
      { zh: '既往用药和检查资料整理', ko: '기존 복용약과 검사자료 정리', en: 'Previous medication and test report organization', ar: 'تنظيم الأدوية السابقة وتقارير الفحوصات' },
    ],
    note: {
      zh: '感染和炎症不建议自行判断或随意服药。若有疼痛、发热、明显分泌物或睾丸疼痛，应及时联系医院。',
      ko: '감염과 염증은 자가 판단이나 임의 복약을 권하지 않습니다. 통증, 발열, 뚜렷한 분비물, 고환 통증이 있으면 병원에 즉시 연락해야 합니다.',
      en: 'Infection and inflammation should not be self-diagnosed or self-treated. If pain, fever, obvious discharge, or testicular pain occurs, the hospital should be contacted promptly.',
      ar: 'لا يُنصح بالتشخيص الذاتي أو تناول الأدوية عشوائيًا عند وجود عدوى أو التهاب. إذا كان هناك ألم، أو حمى، أو إفرازات واضحة، أو ألم في الخصية، فيجب التواصل مع المستشفى فورًا.',
    },
    noteStyle: 'warning',
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'mens-intimate-care',
    title: {
      zh: '男性私密护理',
      ko: '남성 프라이빗 케어',
      en: "Men's Intimate Care",
      ar: 'العناية الحميمة للرجل',
    },
    description: {
      zh: '男性私密护理咨询主要用于整理包皮、输精管结扎、阴茎弯曲、男性私密外观或术后恢复相关问题。此类咨询需要兼顾功能、感觉、恢复期、疤痕和个人期待值。',
      ko: '남성 프라이빗 케어 상담은 포경, 정관수술, 음경만곡, 남성 프라이빗 외관, 수술 후 회복 관련 고민을 정리하는 과정입니다. 이러한 상담은 기능, 감각, 회복 기간, 흉터, 개인 기대치를 함께 고려해야 합니다.',
      en: "Men's intimate care consultation helps organize concerns related to circumcision, vasectomy, penile curvature, intimate appearance, and postoperative recovery. These consultations should consider function, sensation, recovery time, scarring, and personal expectations.",
      ar: 'تساعد استشارة العناية الحميمة للرجل في تنظيم الشكاوى المتعلقة بالختان، أو قطع القناة المنوية، أو انحناء القضيب، أو المظهر الحميم، أو التعافي بعد العملية. يجب أن تراعي هذه الاستشارة الوظيفة، والإحساس، وفترة التعافي، والندبات، والتوقعات الشخصية.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '包皮相关咨询', ko: '포경 관련 상담', en: 'Circumcision-related consultation', ar: 'استشارة الختان' },
      { zh: '输精管结扎相关咨询', ko: '정관수술 관련 상담', en: 'Vasectomy-related consultation', ar: 'استشارة قطع القناة المنوية' },
      { zh: '阴茎弯曲相关咨询', ko: '음경만곡 관련 상담', en: 'Penile curvature consultation', ar: 'استشارة انحناء القضيب' },
      { zh: '男性私密外观咨询', ko: '남성 프라이빗 외관 상담', en: "Men's intimate appearance consultation", ar: 'استشارة المظهر الحميم للرجل' },
      { zh: '术后恢复管理咨询', ko: '수술 후 회복관리 상담', en: 'Postoperative recovery management', ar: 'إدارة التعافي بعد العملية' },
      { zh: '既往手术或不适症状整理', ko: '기존 수술 이력 또는 불편 증상 정리', en: 'Previous surgery history or discomfort organization', ar: 'تنظيم تاريخ العمليات السابقة أو الأعراض المزعجة' },
    ],
    note: {
      zh: '男性私密相关治疗不应承诺效果、满意度、性功能改善或完全无疤痕。是否适合相关治疗，需要由泌尿医学专业医生判断。',
      ko: '남성 프라이빗 관련 치료는 효과, 만족도, 성기능 개선, 흉터 없음 등을 약속해서는 안 됩니다. 관련 치료 적합 여부는 비뇨의학과 전문의가 판단해야 합니다.',
      en: "Men's intimate treatments should not promise results, satisfaction, sexual function improvement, or no scarring. Suitability must be determined by a urology specialist.",
      ar: 'لا ينبغي أن تعد علاجات المنطقة الحميمة للرجل بنتائج مضمونة، أو رضا مضمون، أو تحسين الوظيفة الجنسية، أو عدم وجود ندبات. مدى مناسبة العلاج يجب أن يحدده طبيب مختص في المسالك البولية.',
    },
    docKeys: ['functionalIntake'],
  },
]
