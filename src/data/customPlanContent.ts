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

export interface CustomPlanClientCard {
  title: LocalizedText
  audience: LocalizedText
  serviceFocus: LocalizedText
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
}

// ── Section 1: What can we coordinate ──────────────────────────────
// ── Plans by client type ─────────────────────────────────
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
