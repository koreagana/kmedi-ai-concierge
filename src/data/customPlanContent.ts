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
    en: 'From hospital appointments to postoperative recovery, we design a more reassuring Korean medical journey for international clients.\n\nK-MediSpring is a medical tourism company registered for foreign patient attraction under the Korean Ministry of Health and Welfare. We assist not only with hospital appointments but also with medical document organization, interpretation support, transportation, accommodation, follow-up reminders, and pre-departure checks.',
  } as LocalizedText,
}

/* ── 환자 여정 타임라인 ──────────────────────────────────────────────
   고객에게 실제로 일어나는 순서를 그대로 세운 표. 예전의 조직도형
   흐름도(고객유형 → 조율허브 → 서비스 6종)는 시작점이 없어 읽기
   어려웠기에, 시간 순서의 9단계를 3막으로 묶는 구조로 교체함.
   예전 흐름도의 서비스 6종은 각 단계 설명 안으로 흡수됨
   (차량·숙박 → 抵达韩国 / 통역 → 专家面诊 / 회복알림 → 恢复跟踪). */

export interface JourneyStep {
  title: LocalizedText
  desc: LocalizedText
}

export interface JourneyAct {
  /** 막 구분 색 — 파랑(방한 전) · 주황(한국 체류) · 초록(귀국 후) */
  tone: 'pre' | 'stay' | 'post'
  label: LocalizedText
  steps: JourneyStep[]
}

export const JOURNEY_HEADING: LocalizedText = {
  zh: '您在韩国的就医流程',
  en: 'Your Care Journey in Korea',
}

export const JOURNEY_SUBHEADING: LocalizedText = {
  zh: '从第一次咨询到回国后的恢复跟踪',
  en: 'From your first consultation to recovery follow-up after you fly home',
}

export const JOURNEY_ACTS: JourneyAct[] = [
  {
    tone: 'pre',
    label: { zh: '来韩前', en: 'Before Korea' },
    steps: [
      {
        title: { zh: '咨询汉江春天', en: 'Talk to K-MediSpring' },
        desc: {
          zh: '说明需求与预算，先一起理清方向',
          en: "Tell us what you're looking for and your budget — we map the direction together.",
        },
      },
      {
        title: { zh: '医院推荐与匹配', en: 'Hospital Matching' },
        desc: {
          zh: '依据您的情况对接合适的医院与医生',
          en: 'We connect you with the hospital and doctor that fit your case.',
        },
      },
    ],
  },
  {
    tone: 'stay',
    label: { zh: '在韩国', en: 'In Korea' },
    steps: [
      {
        title: { zh: '抵达韩国', en: 'Arrival in Korea' },
        desc: {
          zh: '接机、住宿与用车安排',
          en: 'Airport pickup, accommodation and transport, all arranged.',
        },
      },
      {
        title: { zh: '专家面诊', en: 'Specialist Consultation' },
        desc: {
          zh: '翻译陪同，与主诊医生确认方案',
          en: 'With an interpreter beside you, confirm the plan with your doctor.',
        },
      },
      {
        title: { zh: '手术 · 治疗', en: 'Procedure or Surgery' },
        desc: {
          zh: '按面诊确认的方案进行',
          en: 'Carried out exactly as agreed at your consultation.',
        },
      },
      {
        title: { zh: '术后复诊', en: 'Post-op Check-up' },
        desc: {
          zh: '回院确认恢复状态',
          en: "Back to the clinic to confirm how you're healing.",
        },
      },
    ],
  },
  {
    tone: 'post',
    label: { zh: '回国后', en: 'After You Return' },
    steps: [
      {
        title: { zh: '回国', en: 'Flying Home' },
        desc: {
          zh: '送机与离境协助',
          en: 'Departure transfer and send-off support.',
        },
      },
      {
        title: { zh: '恢复跟踪', en: 'Recovery Follow-up' },
        desc: {
          zh: '汉江春天持续跟进恢复过程',
          en: 'We stay with you through the recovery period.',
        },
      },
      {
        title: { zh: '向医院反馈', en: 'Reported Back to Your Doctor' },
        desc: {
          zh: '将恢复情况同步给主诊医生',
          en: 'Your progress goes back to the doctor who treated you.',
        },
      },
    ],
  },
]

/** 타임라인 끝의 신뢰 배지 — 예전 흐름도 하단에 있던 두 줄을 그대로 유지 */
export const JOURNEY_TRUST: LocalizedText[] = [
  { zh: '正规登记外患招徕机构', en: 'Officially registered foreign patient facilitator' },
  { zh: '责任保险体系加入', en: 'Covered by liability insurance' },
]
