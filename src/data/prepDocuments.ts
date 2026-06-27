export type PrepDocType =
  | 'intake'
  | 'exam_before'
  | 'procedure_before'
  | 'procedure_after'
  | 'surgery_before'
  | 'surgery_after'
  | 'photo_guide'

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
  surgery_before: { ko: '수술 전 주의사항', zh: '手术前注意事项' },
  surgery_after: { ko: '수술 후 주의사항', zh: '手术后注意事项' },
  photo_guide: { ko: '사진/자료 준비 안내', zh: '照片/资料准备指南' },
}

export const PREP_DOC_STATUS_LABEL: Record<PrepDocStatus, string> = {
  available: '사용 가능',
  draft: '초안',
  needs_hospital_check: '병원 확인 필요',
}

export const PREP_DOCUMENTS: PrepDocument[] = [
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
    titleKo: 'CT/MRI 검사 전 확인표',
    titleZh: 'CT/MRI检查前确认表',
    type: 'exam_before',
    field: '영상검사',
    link: '/prep/imaging-before',
    status: 'draft',
  },
  {
    titleKo: '피부시술 전 문진표',
    titleZh: '皮肤治疗前问诊表',
    type: 'intake',
    field: '피부과',
    link: '/prep/skin-treatment-intake',
    status: 'draft',
  },
  {
    titleKo: '피부시술 후 주의사항',
    titleZh: '皮肤治疗后注意事项',
    type: 'procedure_after',
    field: '피부과',
    link: '/prep/skin-treatment-after',
    status: 'draft',
  },
  {
    titleKo: '필러/보톡스 전후 주의사항',
    titleZh: '玻尿酸/肉毒素治疗前后注意事项',
    type: 'procedure_before',
    field: '피부과 / 미용시술',
    link: '/prep/filler-botox-guide',
    status: 'draft',
  },
  {
    titleKo: '성형 상담 전 사진 촬영 가이드',
    titleZh: '整形咨询照片拍摄指南',
    type: 'photo_guide',
    field: '성형외과',
    link: '/prep/plastic-photo-guide',
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
    titleKo: '수술 후 공통 주의사항',
    titleZh: '术后通用注意事项',
    type: 'surgery_after',
    field: '성형외과 / 공통',
    link: '/prep/surgery-after',
    status: 'draft',
  },
]
