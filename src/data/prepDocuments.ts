export type PrepDocType =
  | 'intake'
  | 'exam_before'
  | 'procedure_before'
  | 'procedure_after'
  | 'procedure_guide'
  | 'surgery_before'
  | 'surgery_after'
  | 'photo_guide'
  | 'common_checklist'
  | 'reservation'
  | 'agreement'

export type PrepDocStatus = 'available' | 'draft' | 'needs_hospital_check'

export interface PrepDocument {
  titleKo: string
  titleZh: string
  type: PrepDocType
  field: string
  link: string
  status: PrepDocStatus
}

export const PREP_DOC_TYPE_LABEL: Record<PrepDocType, { ko: string; zh: string }> = {
  intake: { ko: '문진표', zh: '问诊表' },
  exam_before: { ko: '검사 전 준비사항', zh: '检查前准备事项' },
  procedure_before: { ko: '시술 전 주의사항', zh: '治疗前注意事项' },
  procedure_after: { ko: '시술 후 주의사항', zh: '治疗后注意事项' },
  procedure_guide: { ko: '시술 전후 주의사항', zh: '治疗前后注意事项' },
  surgery_before: { ko: '수술 전 주의사항', zh: '手术前注意事项' },
  surgery_after: { ko: '수술 후 주의사항', zh: '手术后注意事项' },
  photo_guide: { ko: '사진/자료 준비 안내', zh: '照片/资料准备指南' },
  common_checklist: { ko: '공통 체크리스트', zh: '通用检查表' },
  reservation: { ko: '예약확인증 생성', zh: '预约确认书生成' },
  agreement: { ko: '업무협약서', zh: '业务协议书' },
}

export const PREP_DOC_STATUS_LABEL: Record<PrepDocStatus, string> = {
  available: '사용 가능',
  draft: '초안',
  needs_hospital_check: '병원 확인 필요',
}

export const PREP_DOCUMENTS: PrepDocument[] = [
  {
    titleKo: '외국인환자 유치 업무협약서',
    titleZh: 'Agreement for Foreign Patient Attraction Services',
    type: 'agreement',
    field: '병원 협약 / 공통',
    link: '/contract.html',
    status: 'available',
  },
  {
    titleKo: '예약확인증 생성기',
    titleZh: '预约确认书生成器',
    type: 'reservation',
    field: '예약 관리 / 공통',
    link: '/reservation/confirm',
    status: 'available',
  },
  {
    titleKo: '기능의학 초진 문진표',
    titleZh: '功能医学初诊问诊表',
    type: 'intake',
    field: '기능의학 / 건강검진',
    link: '/intake/functional',
    status: 'available',
  },
  {
    titleKo: '건강검진 전 준비사항',
    titleZh: '健康检查前准备事项',
    type: 'exam_before',
    field: '건강검진',
    link: '/prep/health-checkup-before',
    status: 'available',
  },
  {
    titleKo: '혈액검사 전 안내',
    titleZh: '血液检查前注意事项',
    type: 'exam_before',
    field: '건강검진',
    link: '/prep/blood-test-before',
    status: 'available',
  },
  {
    titleKo: '대장내시경 검사 전 준비사항',
    titleZh: '肠镜检查前准备事项',
    type: 'exam_before',
    field: '건강검진 / 내시경',
    link: '/prep/colonoscopy-before',
    status: 'available',
  },
  {
    titleKo: 'CT/MRI 검사 전 확인표',
    titleZh: 'CT/MRI检查前确认表',
    type: 'exam_before',
    field: '영상검사',
    link: '/prep/imaging-before',
    status: 'available',
  },
  // ── 피부과 / 성형외과 우선 문서 (초안 단계, 실제 페이지는 다음 작업에서 생성) ──
  {
    titleKo: '성형외과 상담 전 문진표',
    titleZh: '整形外科面诊前问诊表',
    type: 'intake',
    field: '성형외과',
    link: '/prep/plastic-surgery-intake',
    status: 'draft',
  },
  {
    titleKo: '성형수술 전 공통 주의사항',
    titleZh: '整形手术前通用注意事项',
    type: 'surgery_before',
    field: '성형외과',
    link: '/prep/plastic-surgery-before',
    status: 'draft',
  },
  {
    titleKo: '마취 전 확인 문진표',
    titleZh: '麻醉前确认问卷',
    type: 'intake',
    field: '성형외과 / 마취',
    link: '/prep/anesthesia-check',
    status: 'draft',
  },
  {
    titleKo: '복용약·알레르기 확인표',
    titleZh: '用药与过敏确认表',
    type: 'common_checklist',
    field: '성형외과 / 피부과 / 공통',
    link: '/prep/medication-allergy-check',
    status: 'draft',
  },
  {
    titleKo: '성형 상담 사진 촬영 가이드',
    titleZh: '整形面诊拍照指南',
    type: 'photo_guide',
    field: '성형외과',
    link: '/prep/plastic-photo-guide',
    status: 'draft',
  },
  {
    titleKo: '피부시술 전 문진표',
    titleZh: '皮肤治疗前问诊表',
    type: 'intake',
    field: '피부과 / 미용시술',
    link: '/prep/skin-treatment-intake',
    status: 'draft',
  },
  {
    titleKo: '레이저 시술 전후 주의사항',
    titleZh: '激光治疗前后注意事项',
    type: 'procedure_guide',
    field: '피부과 / 레이저',
    link: '/prep/laser-treatment-guide',
    status: 'draft',
  },
  {
    titleKo: '보톡스 전후 주의사항',
    titleZh: '肉毒素前后注意事项',
    type: 'procedure_guide',
    field: '피부과 / 성형외과 / 미용시술',
    link: '/prep/botox-guide',
    status: 'draft',
  },
  {
    titleKo: '필러 전후 주의사항',
    titleZh: '玻尿酸填充前后注意事项',
    type: 'procedure_guide',
    field: '피부과 / 성형외과 / 미용시술',
    link: '/prep/filler-guide',
    status: 'draft',
  },
  {
    titleKo: '쌍꺼풀 수술 후 주의사항',
    titleZh: '双眼皮手术后注意事项',
    type: 'surgery_after',
    field: '성형외과 / 눈성형',
    link: '/prep/double-eyelid-after',
    status: 'draft',
  },
  {
    titleKo: '코성형 후 주의사항',
    titleZh: '鼻整形术后注意事项',
    type: 'surgery_after',
    field: '성형외과 / 코성형',
    link: '/prep/rhinoplasty-after',
    status: 'draft',
  },
  {
    titleKo: '수술 후 공통 주의사항',
    titleZh: '手术后通用注意事项',
    type: 'surgery_after',
    field: '성형외과 / 공통',
    link: '/prep/surgery-after',
    status: 'draft',
  },
  // 피부시술 후 일반 주의사항(스킨케어 시술 공통) — 위 레이저/보톡스/필러 전후 가이드와
  // 별도로, 시술 종류를 특정하지 않는 일반 안내가 필요할 때를 위해 유지.
  {
    titleKo: '피부시술 후 주의사항',
    titleZh: '皮肤治疗后注意事项',
    type: 'procedure_after',
    field: '피부과',
    link: '/prep/skin-treatment-after',
    status: 'draft',
  },
]

/* ────────────────────────────────────────────────────────────────
   향후 환자용 페이지(실제 /prep/* 문서) 작성 시 표시 원칙 — 참고용
   (관리자 목록 자체에는 적용하지 않음. 관리자 목록은 경로 표시 가능)

   1. 고객 화면에는 URL 주소를 그대로 크게 노출하지 않는다.
      환자에게는 문서 제목·버튼 문구 중심으로 보여준다.
   2. 환자용 본문은 "중국어 문장 / 한국어 문장" 한 줄 병기를 기본으로 한다.
      예: 请以医院说明为准。 / 병원 안내를 기준으로 해주세요.
   3. 한 문장 안에 중국어와 한국어를 섞지 않는다.
      나쁜 예: 医院 안내优先
      좋은 예: 医院说明优先 / 병원 안내 우선
   4. 버튼은 중국어 메인 + 한국어 보조문구(두 줄)로 표시해도 된다.
   ──────────────────────────────────────────────────────────────── */
