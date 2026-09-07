import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText } from './bigHealthKeywords'

export interface CustomPlanDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

export const CUSTOM_PLAN_DOC_BUTTONS = {
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      en: 'Open WeCom Consultation',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, CustomPlanDocButton>

export type CustomPlanDocButtonKey = keyof typeof CUSTOM_PLAN_DOC_BUTTONS

export interface CustomPlanCard {
  title: LocalizedText
  desc: LocalizedText
}

export interface CustomPlanClientCard {
  title: LocalizedText
  audience: LocalizedText
  serviceFocus: LocalizedText
}

export interface CustomPlanStep {
  title: LocalizedText
  desc: LocalizedText
}

export interface CustomPlanTextSection {
  title: LocalizedText
  /** \n\n separates paragraphs. */
  body: LocalizedText
}

export const CUSTOM_PLAN_SECTION = {
  title: {
    zh: '定制医疗观光方案',
    en: 'Customized Medical Tourism Plan',
  } as LocalizedText,
  subCopy: {
    zh: '韩国医疗 · 医院预约 · 翻译陪同 · 车辆住宿 · 术后恢复 · 生活协助',
    en: 'Korean Medical Care · Hospital Appointments · Interpretation · Transport & Stay · Recovery Care · Lifestyle Support',
  } as LocalizedText,
  desc: {
    zh: '从医院预约到术后恢复，为外国客户设计更安心的韩国医疗行程。\n\n汉江春天是一家完成韩国保健福祉部外国人患者招徕业登记的医疗观光公司。我们不仅帮助客户预约医院，也协助整理诊疗资料、安排翻译陪同、车辆住宿、复诊提醒和回国前确认。',
    en: 'From hospital appointments to postoperative recovery, we design a more reassuring Korean medical journey for international clients.\n\nK-Medi Spring is a medical tourism company registered for foreign patient attraction under the Korean Ministry of Health and Welfare. We assist not only with hospital appointments but also with medical document organization, interpretation support, transportation, accommodation, follow-up reminders, and pre-departure checks.',
  } as LocalizedText,
  safety: [
    {
      zh: '汉江春天不是医疗机构，不进行诊断、治疗或手术判断。医疗判断始终由韩国正规医疗机构和专业医生负责。',
      en: 'K-Medi Spring is not a medical institution and does not make diagnosis, treatment, or surgical decisions. Medical judgment is always the responsibility of a licensed Korean medical institution and qualified physicians.',
    },
    {
      zh: '本页介绍的是汉江春天可以协调和协助的服务范围，具体安排会根据个人情况、医院回复和预约可能性调整。',
      en: 'This page introduces the scope of services K-Medi Spring can coordinate and assist with. Specific arrangements may be adjusted based on individual circumstances, hospital responses, and appointment availability.',
    },
  ] as LocalizedText[],
  closing: {
    zh: '无论您是需要专业医院转诊，还是希望以合理预算获得优质的皮肤医美与整形咨询，汉江春天都会根据您的具体情况，设计专属的韩国医疗行程。',
    en: 'Whether you need specialized hospital referral or want quality skin and plastic surgery consultation within a reasonable budget, K-Medi Spring designs a dedicated Korean medical itinerary tailored to your specific situation.',
  } as LocalizedText,
}

// ── Section 1: What can we coordinate ──────────────────────────────
export const CUSTOM_PLAN_COORDINATION_TITLE: LocalizedText = {
  zh: '汉江春天可以为您协调什么？',
  en: 'What Can K-Medi Spring Coordinate for You?',
}

export const CUSTOM_PLAN_COORDINATION_CARDS: CustomPlanCard[] = [
  {
    title: {
      zh: '医院预约与诊疗方向整理',
      en: 'Hospital Appointments & Consultation Direction',
    },
    desc: {
      zh: '根据客户的症状、目的、既往检查报告和停留时间，整理适合咨询的医院方向。',
      en: 'We organize suitable hospital consultation directions based on symptoms, goals, previous medical reports, and length of stay.',
    },
  },
  {
    title: {
      zh: '医疗资料预整理',
      en: 'Pre-Organizing Medical Records',
    },
    desc: {
      zh: '客户可提前提供检查报告、影像资料、手术记录或照片，我们会协助整理并转达给医院。',
      en: 'Clients may provide test results, imaging files, surgery records, or photos in advance. We help organize them and communicate them to the hospital.',
    },
  },
  {
    title: {
      zh: '翻译陪同与沟通协助',
      en: 'Interpretation & Communication Support',
    },
    desc: {
      zh: '在医院咨询、检查、手术说明、复诊和注意事项确认时，协助客户理解医院说明。',
      en: 'During consultations, tests, surgical explanations, follow-ups, and instruction reviews, we help clients understand the hospital\'s guidance.',
    },
  },
  {
    title: {
      zh: '车辆与住宿安排',
      en: 'Transportation & Accommodation',
    },
    desc: {
      zh: '根据医院位置、行程时间、恢复需求和同行人数，协助安排车辆和住宿。',
      en: 'We assist with transportation and accommodation based on hospital location, schedule, recovery needs, and number of companions.',
    },
  },
  {
    title: {
      zh: '术后恢复与复诊提醒',
      en: 'Recovery & Follow-Up Reminders',
    },
    desc: {
      zh: '协助确认复诊、拆线、用药说明、异常症状联系医院和回国前检查事项。',
      en: 'We help confirm follow-up visits, stitch removal, medication instructions, hospital contact for abnormal symptoms, and pre-departure checks.',
    },
  },
  {
    title: {
      zh: '韩国停留期间生活协助',
      en: 'Daily Life Support During Your Stay',
    },
    desc: {
      zh: '根据客户需求，协助整理周边餐厅、轻旅行、购物、药局和日常生活信息。',
      en: 'Depending on client needs, we help organize information about nearby restaurants, light travel, shopping, pharmacies, and daily life.',
    },
  },
]

// ── Section 2: Registered agency ────────────────────────────────────
export const CUSTOM_PLAN_REGISTRATION: CustomPlanTextSection = {
  title: {
    zh: '正规登记的外国人患者招徕机构',
    en: 'Registered Foreign Patient Attraction Agency',
  },
  body: {
    zh: '汉江春天是完成韩国保健福祉部外国人患者招徕业登记的医疗观光公司。\n\n我们按照韩国相关规定，为外国客户提供医疗机构预约、医疗翻译、就医陪同和医疗观光协调服务。\n\n同时，作为登记机构，我们加入相关责任保险体系。若在服务过程中发生沟通或服务相关争议，我们可以协助客户整理资料、沟通医院，并按照相关流程提供协调支持。',
    en: 'K-Medi Spring is a medical tourism company registered for foreign patient attraction under the Korean Ministry of Health and Welfare.\n\nIn accordance with Korean regulations, we provide international clients with medical institution appointment coordination, medical interpretation, hospital accompaniment, and medical tourism coordination services.\n\nAs a registered agency, we are also part of the relevant liability insurance framework. If communication or service-related disputes occur during the process, we can assist with document organization, hospital communication, and coordination support according to the relevant procedures.',
  },
}

// ── Section 3: Serious illness referral ─────────────────────────────
export const CUSTOM_PLAN_REFERRAL: CustomPlanTextSection = {
  title: {
    zh: '重症与疾病客户的医院转诊协调',
    en: 'Hospital Coordination for Serious Illness and Disease Cases',
  },
  body: {
    zh: '对于癌症、心脑血管疾病、骨科疾病、复杂手术、疑难疾病或需要大学医院级别诊疗的客户，建议先提供既往检查报告、影像资料、病理报告、手术记录或用药资料。\n\n汉江春天可根据资料内容，协助整理病情摘要，并向合作医院或大学医院相关科室进行咨询预约。\n\n我们合作网络中包括多家综合医院及韩国主要大学医院级别的医疗资源，可根据疾病方向、医生专长、预约可能性和客户停留计划进行协调。',
    en: 'For clients with cancer, cardiovascular or cerebrovascular disease, orthopedic disease, complex surgery needs, difficult-to-diagnose conditions, or cases requiring university-hospital-level care, previous test results, imaging files, pathology reports, surgery records, or medication information should be provided first.\n\nK-Medi Spring can help summarize the medical history based on the provided documents and coordinate consultation appointments with partner hospitals or relevant departments at university-hospital-level medical institutions.\n\nOur cooperation network includes several general hospitals and major university-hospital-level medical resources in Korea. Coordination can be arranged based on disease type, doctor specialty, appointment availability, and the client\'s travel plan.',
  },
}

// ── Section 4: Personalized hospital selection for aesthetics ──────
export const CUSTOM_PLAN_AESTHETICS_MATCHING: CustomPlanTextSection = {
  title: {
    zh: '皮肤医美与整形客户的个性化医院选择',
    en: 'Personalized Hospital Selection for Skin Aesthetics and Plastic Surgery',
  },
  body: {
    zh: '韩国的皮肤医美和整形医院，每家擅长项目、医生风格、价格区间、服务环境和术后管理方式都不同。\n\n汉江春天不会只推荐一种医院，而是根据客户的预算、项目需求、恢复时间、语言需求和服务期待，整理更适合的医院方向。\n\n如果客户希望控制预算，我们可以协助寻找价格更合理、项目性价比较高的普通医院或专科医院。\n\n如果客户重视隐私、环境、医生沟通时间、术后管理和整体服务体验，我们也可以协助匹配更适合VVIP客户的高端医疗机构。',
    en: 'Skin aesthetics and plastic surgery hospitals in Korea differ in their strengths, doctor style, price range, service environment, and postoperative care system.\n\nK-Medi Spring does not recommend only one type of hospital. We organize more suitable hospital directions based on the client\'s budget, desired procedures, recovery time, language needs, and service expectations.\n\nFor clients who want to manage their budget, we can help find general hospitals or specialty clinics with more reasonable pricing and good value.\n\nFor clients who prioritize privacy, environment, doctor communication time, postoperative management, and overall service experience, we can also help match them with higher-end medical institutions suitable for VVIP clients.',
  },
}

// ── Section 5: Plans by client type ─────────────────────────────────
export const CUSTOM_PLAN_CLIENT_TYPES_TITLE: LocalizedText = {
  zh: '根据客户类型设计不同方案',
  en: 'Plans Designed by Client Type',
}

export const CUSTOM_PLAN_CLIENT_CARDS: CustomPlanClientCard[] = [
  {
    title: {
      zh: '疾病·重症客户',
      en: 'Disease & Serious Illness Clients',
    },
    audience: {
      zh: '适合对象：已有诊断、检查报告、影像资料，需要韩国医院进一步咨询或手术评估的客户。',
      en: 'Suitable for: Clients with a diagnosis, test reports, or imaging files who need further consultation or surgical evaluation at a Korean hospital.',
    },
    serviceFocus: {
      zh: '服务重点：资料整理、科室匹配、医生预约、翻译陪同、住院或复诊安排。',
      en: 'Service focus: Document organization, department matching, doctor appointment coordination, interpretation support, hospitalization or follow-up arrangement.',
    },
  },
  {
    title: {
      zh: '健康检查·功能医学客户',
      en: 'Health Checkup & Functional Medicine Clients',
    },
    audience: {
      zh: '适合对象：希望在韩国进行精密健康检查、功能医学咨询、慢性疲劳、代谢、激素或抗衰老管理的客户。',
      en: 'Suitable for: Clients who want precision health screening, functional medicine consultation, chronic fatigue, metabolic, hormone, or anti-aging health management in Korea.',
    },
    serviceFocus: {
      zh: '服务重点：检查方向整理、预约、检查前准备、报告翻译和后续咨询连接。',
      en: 'Service focus: Test direction organization, appointments, pre-test preparation, report translation, and follow-up consultation connection.',
    },
  },
  {
    title: {
      zh: '皮肤医美·整形客户',
      en: 'Skin Aesthetics & Plastic Surgery Clients',
    },
    audience: {
      zh: '适合对象：希望在韩国进行皮肤管理、注射类项目、提升、整形咨询或手术的客户。',
      en: 'Suitable for: Clients who want skin treatments, injectable treatments, lifting, plastic surgery consultation, or surgery in Korea.',
    },
    serviceFocus: {
      zh: '服务重点：医院匹配、价格区间比较、医生风格确认、术前资料整理、术后恢复提醒。',
      en: 'Service focus: Hospital matching, price range comparison, doctor style confirmation, preoperative document organization, and recovery reminders.',
    },
  },
  {
    title: {
      zh: 'VIP·VVIP客户',
      en: 'VIP & VVIP Clients',
    },
    audience: {
      zh: '适合对象：重视隐私、环境、车辆、住宿、专属陪同和整体体验的客户。',
      en: 'Suitable for: Clients who value privacy, environment, transportation, accommodation, dedicated accompaniment, and overall service experience.',
    },
    serviceFocus: {
      zh: '服务重点：独立行程设计、高端医院匹配、专车安排、酒店协助、翻译陪同和恢复期生活支持。',
      en: 'Service focus: Private itinerary design, premium hospital matching, private vehicle arrangement, hotel support, interpretation accompaniment, and recovery-period lifestyle support.',
    },
  },
]

// ── Section 6: Service process ──────────────────────────────────────
export const CUSTOM_PLAN_PROCESS_TITLE: LocalizedText = {
  zh: '服务流程',
  en: 'Service Process',
}

// ── Diagram labels (short labels for SVG system diagram only) ─────────
export const CPD: Record<string, LocalizedText> = {
  c1:  { zh: '疾病·重症',                           en: 'Serious Illness' },
  c2:  { zh: '健康检查',                               en: 'Health Check' },
  c3:  { zh: '皮肤·整形',                           en: 'Aesthetics' },
  hub: { zh: '调协中心',                              en: 'Coordination Hub' },
  s1:  { zh: '病院预约',                              en: 'Hospital' },
  s2:  { zh: '资料整理',                              en: 'Records' },
  s3:  { zh: '翻译陪同',                              en: 'Interpreter' },
  s4:  { zh: '车辆住宿',                             en: 'Transport' },
  s5:  { zh: '恢复提醒',                              en: 'Recovery' },
  s6:  { zh: '生活协助',                              en: 'Daily Life' },
  b1:  { zh: '正规登记外患招徕机构', en: 'Registered Patient Agency' },
  b2:  { zh: '责任保险体系加入',              en: 'Liability Insurance' },
}

export const CUSTOM_PLAN_STEPS: CustomPlanStep[] = [
  {
    title: {
      zh: '告诉我们您的来韩目的',
      en: 'Tell Us Your Purpose for Visiting Korea',
    },
    desc: {
      zh: '健康检查、疾病治疗、皮肤医美、整形手术、女性健康、男性健康或恢复管理。',
      en: 'Health checkup, disease treatment, skin aesthetics, plastic surgery, women\'s health, men\'s health, or recovery care.',
    },
  },
  {
    title: {
      zh: '提供基础资料',
      en: 'Provide Basic Information',
    },
    desc: {
      zh: '包括年龄、停留时间、同行人数、既往检查报告、影像资料、照片或希望咨询的项目。',
      en: 'Age, length of stay, number of companions, previous reports, imaging files, photos, or desired consultation items.',
    },
  },
  {
    title: {
      zh: '整理医院方向',
      en: 'Organize Hospital Direction',
    },
    desc: {
      zh: '汉江春天根据客户资料，整理适合咨询的医院、科室或医生方向。',
      en: 'K-Medi Spring organizes suitable hospital, department, or doctor consultation directions based on the client\'s information.',
    },
  },
  {
    title: {
      zh: '确认行程与费用范围',
      en: 'Confirm Itinerary and Cost Range',
    },
    desc: {
      zh: '确认医院预约、车辆、住宿、翻译陪同、复诊安排和整体费用范围。',
      en: 'We confirm hospital appointments, transportation, accommodation, interpretation support, follow-up arrangements, and overall cost range.',
    },
  },
  {
    title: {
      zh: '到韩国后按日程进行',
      en: 'Proceed According to the Schedule in Korea',
    },
    desc: {
      zh: '根据预约时间完成咨询、检查、治疗或手术，并协助理解医院说明。',
      en: 'Consultations, tests, treatment, or surgery proceed according to appointment times, and we help clients understand hospital instructions.',
    },
  },
  {
    title: {
      zh: '回国前确认',
      en: 'Pre-Departure Check',
    },
    desc: {
      zh: '确认复诊、拆线、用药、异常症状联系医院和回国后注意事项。',
      en: 'We confirm follow-up visits, stitch removal, medication, hospital contact for abnormal symptoms, and post-return precautions.',
    },
  },
]
