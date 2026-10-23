import type { LocalizedText } from './bigHealthKeywords'

/** 就医协调服务 페이지(EditorialPartners)의 来韩前·在韩国·回国后 타임라인. 예전 定制医疗旅游方案 페이지에서 옮겨 옴(2026-10-12). */

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
  zh: '来韩国看病，是这样一步步来的',
  en: 'Your Care Journey in Korea',
}

export const JOURNEY_SUBHEADING: LocalizedText = {
  zh: '从第一次咨询，到回国后的恢复跟进',
  en: 'From your first consultation to recovery follow-up after you fly home',
}

export const JOURNEY_ACTS: JourneyAct[] = [
  {
    tone: 'pre',
    label: { zh: '来韩前', en: 'Before Korea' },
    steps: [
      {
        title: { zh: '先跟我们聊聊', en: 'Talk to K-MediSpring' },
        desc: {
          zh: '说说您想看什么、预算多少，我们一起把方向理清楚',
          en: "Tell us what you're looking for and your budget — we map the direction together.",
        },
      },
      {
        title: { zh: '找医院、找医生', en: 'Hospital Matching' },
        desc: {
          zh: '按您的情况，帮您找合适的医院和医生',
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
          zh: '再确认一遍看病时间和医院地址',
          en: 'Confirm your appointment times and hospital locations.',
        },
      },
      {
        title: { zh: '见医生面诊', en: 'Specialist Consultation' },
        desc: {
          zh: '翻译陪着您，跟医生当面确认方案',
          en: 'With an interpreter beside you, confirm the plan with your doctor.',
        },
      },
      {
        title: { zh: '手术 · 治疗', en: 'Procedure or Surgery' },
        desc: {
          zh: '按面诊时确认好的方案来做',
          en: 'Carried out exactly as agreed at your consultation.',
        },
      },
      {
        title: { zh: '术后复诊', en: 'Post-op Check-up' },
        desc: {
          zh: '回医院看看恢复得怎么样',
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
          zh: '走之前确认好术后注意事项和复诊安排',
          en: 'Review your aftercare instructions and follow-up plan.',
        },
      },
      {
        title: { zh: '恢复跟进', en: 'Recovery Follow-up' },
        desc: {
          zh: '回国以后，我们会继续关心您的恢复情况',
          en: 'We stay with you through the recovery period.',
        },
      },
      {
        title: { zh: '告诉医生', en: 'Reported Back to Your Doctor' },
        desc: {
          zh: '把您的恢复情况转告给主治医生',
          en: 'Your progress goes back to the doctor who treated you.',
        },
      },
    ],
  },
]

/** 타임라인 끝의 신뢰 배지 — 예전 흐름도 하단에 있던 두 줄을 그대로 유지 */
export const JOURNEY_TRUST: LocalizedText[] = [
  { zh: '政府正式登记的外国患者服务机构', en: 'Officially registered foreign patient facilitator' },
  { zh: '已投保医疗服务责任险', en: 'Covered by liability insurance' },
]
