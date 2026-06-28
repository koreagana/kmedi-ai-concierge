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

export type PrepCategoryId =
  | 'admin_contract'
  | 'checkup_functional'
  | 'imaging_endoscopy'
  | 'skin_laser'
  | 'plastic_before'
  | 'plastic_after'
  | 'womens_health'
  | 'mens_health'
  | 'ortho_pain'

export interface PrepCategory {
  id: PrepCategoryId
  titleKo: string
  titleZh: string
  navLabel: string
}

// 대분류 순서 = 관리자페이지에 표시되는 순서 + 상단 빠른 이동 버튼 순서
export const PREP_CATEGORIES: PrepCategory[] = [
  { id: 'admin_contract', titleKo: '사무·계약·예약', titleZh: '事务·合同·预约', navLabel: '사무·계약·예약' },
  { id: 'checkup_functional', titleKo: '건강검진·기능의학', titleZh: '健康检查·功能医学', navLabel: '건강검진·기능의학' },
  { id: 'imaging_endoscopy', titleKo: '영상검사·내시경', titleZh: '影像检查·内镜检查', navLabel: '영상검사·내시경' },
  { id: 'skin_laser', titleKo: '피부·레이저·미용시술', titleZh: '皮肤·激光·美容治疗', navLabel: '피부·미용' },
  { id: 'plastic_before', titleKo: '성형외과 상담·수술 전 준비', titleZh: '整形外科咨询·术前准备', navLabel: '성형 전 준비' },
  { id: 'plastic_after', titleKo: '성형수술 후 주의사항', titleZh: '整形术后注意事项', navLabel: '성형 후 주의사항' },
  { id: 'womens_health', titleKo: '여성의학', titleZh: '女性健康', navLabel: '여성' },
  { id: 'mens_health', titleKo: '남성의학', titleZh: '男性健康', navLabel: '남성' },
  { id: 'ortho_pain', titleKo: '정형외과·통증·재생상담', titleZh: '骨科·疼痛·再生咨询', navLabel: '정형·통증·재생' },
]

export interface PrepDocument {
  titleKo: string
  titleZh: string
  type: PrepDocType
  category: PrepCategoryId
  field: string
  link: string
  status: PrepDocStatus
  description?: string
  /** 환자에게 보내는 문서가 아니라 코디네이터/직원이 내부적으로만 쓰는 도구 */
  internal?: boolean
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
  // ── 1. 사무·계약·예약 ──────────────────────────────────────────
  {
    titleKo: '외국인환자 유치 업무협약서',
    titleZh: 'Agreement for Foreign Patient Attraction Services',
    type: 'agreement',
    category: 'admin_contract',
    field: '병원 협약 / 공통',
    link: '/contract.html',
    status: 'available',
  },
  {
    titleKo: '예약확인증 생성기',
    titleZh: '预约确认书生成器',
    type: 'reservation',
    category: 'admin_contract',
    field: '예약 관리 / 공통',
    link: '/reservation/confirm',
    status: 'available',
  },
  {
    titleKo: '환자 사전 파악 체크리스트',
    titleZh: '患者预先了解检查表',
    type: 'common_checklist',
    category: 'admin_contract',
    field: '코디네이터 내부용',
    link: '/prep/coordinator-checklist',
    status: 'available',
    description: '상담 전 파악 → 병원 브리핑 메모 자동 생성',
    internal: true,
  },
  {
    titleKo: '수술 전 사전 정보 확인',
    titleZh: '手术前信息确认',
    type: 'intake',
    category: 'admin_contract',
    field: '환자 전송용 · 성형외과 공통',
    link: '/prep/presurgery-form',
    status: 'available',
    description: '환자가 작성 후 위챗으로 복사 전송',
  },

  // ── 2. 건강검진·기능의학 ───────────────────────────────────────
  {
    titleKo: '기능의학 초진 문진표',
    titleZh: '功能医学初诊问诊表',
    type: 'intake',
    category: 'checkup_functional',
    field: '기능의학 / 건강검진',
    link: '/intake/functional',
    status: 'available',
  },
  {
    titleKo: '건강검진 전 준비사항',
    titleZh: '健康检查前准备事项',
    type: 'exam_before',
    category: 'checkup_functional',
    field: '건강검진',
    link: '/prep/health-checkup-before',
    status: 'available',
  },
  {
    titleKo: '혈액검사 전 안내',
    titleZh: '血液检查前注意事项',
    type: 'exam_before',
    category: 'checkup_functional',
    field: '건강검진',
    link: '/prep/blood-test-before',
    status: 'available',
  },

  // ── 3. 영상검사·내시경 ─────────────────────────────────────────
  {
    titleKo: 'CT/MRI 검사 전 확인표',
    titleZh: 'CT/MRI检查前确认表',
    type: 'exam_before',
    category: 'imaging_endoscopy',
    field: '영상검사',
    link: '/prep/imaging-before',
    status: 'available',
  },
  {
    titleKo: '대장내시경 검사 전 준비사항',
    titleZh: '肠镜检查前准备事项',
    type: 'exam_before',
    category: 'imaging_endoscopy',
    field: '건강검진 / 내시경',
    link: '/prep/colonoscopy-before',
    status: 'available',
  },

  // ── 4. 피부·레이저·미용시술 ────────────────────────────────────
  {
    titleKo: '피부시술 전 문진표',
    titleZh: '皮肤治疗前问诊表',
    type: 'intake',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/skin-treatment-intake',
    status: 'draft',
  },
  {
    titleKo: '피부시술 후 주의사항',
    titleZh: '皮肤治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과',
    link: '/prep/skin-treatment-after',
    status: 'available',
  },
  {
    titleKo: '필러/보톡스 전후 주의사항',
    titleZh: '玻尿酸/肉毒素治疗前后注意事项',
    type: 'procedure_guide',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/filler-botox-guide',
    status: 'available',
  },
  {
    titleKo: '레이저 시술 후 주의사항',
    titleZh: '激光治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 레이저',
    link: '/prep/laser-treatment-guide',
    status: 'available',
  },
  {
    titleKo: '스킨부스터·리쥬란 후 주의사항',
    titleZh: '水光·丽珠兰治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/skin-booster-after',
    status: 'available',
  },
  {
    titleKo: '보톡스 후 주의사항',
    titleZh: '肉毒素治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 성형외과 / 미용시술',
    link: '/prep/botox-guide',
    status: 'available',
  },
  {
    titleKo: '필러 후 주의사항',
    titleZh: '玻尿酸填充后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 성형외과 / 미용시술',
    link: '/prep/filler-guide',
    status: 'available',
  },
  {
    titleKo: '실리프팅 전 문진표',
    titleZh: '埋线提升前问诊表',
    type: 'intake',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/thread-lifting-intake',
    status: 'draft',
  },
  {
    titleKo: '실리프팅 후 주의사항',
    titleZh: '埋线提升后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/thread-lifting-after',
    status: 'available',
  },
  {
    titleKo: '색소·토닝·피코레이저 후 주의사항',
    titleZh: '色素·皮秒激光治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 레이저',
    link: '/prep/pigment-toning-after',
    status: 'available',
  },
  {
    titleKo: '여드름·흉터 치료 후 주의사항',
    titleZh: '痘痘·痘坑治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과',
    link: '/prep/acne-scar-after',
    status: 'available',
  },
  {
    titleKo: '리프팅 장비 시술 후 주의사항',
    titleZh: '仪器提升治疗后注意事项',
    type: 'procedure_after',
    category: 'skin_laser',
    field: '피부과 / 미용시술',
    link: '/prep/device-lifting-after',
    status: 'available',
  },

  // ── 5. 성형외과 상담·수술 전 준비 ───────────────────────────────
  {
    titleKo: '성형외과 상담 전 문진표',
    titleZh: '整形外科咨询前问诊表',
    type: 'intake',
    category: 'plastic_before',
    field: '성형외과',
    link: '/prep/plastic-surgery-intake',
    status: 'draft',
  },
  {
    titleKo: '성형수술 전 공통 주의사항',
    titleZh: '整形手术前通用注意事项',
    type: 'surgery_before',
    category: 'plastic_before',
    field: '성형외과',
    link: '/prep/plastic-surgery-before',
    status: 'available',
  },
  {
    titleKo: '마취 전 확인 문진표',
    titleZh: '麻醉前确认问诊表',
    type: 'intake',
    category: 'plastic_before',
    field: '성형외과 / 마취',
    link: '/prep/anesthesia-check',
    status: 'draft',
  },
  {
    titleKo: '복용약·알레르기 확인표',
    titleZh: '用药与过敏确认表',
    type: 'common_checklist',
    category: 'plastic_before',
    field: '성형외과 / 피부과 / 공통',
    link: '/prep/medication-allergy-check',
    status: 'available',
  },
  {
    titleKo: '성형 상담 사진 촬영 가이드',
    titleZh: '整形咨询照片拍摄指南',
    type: 'photo_guide',
    category: 'plastic_before',
    field: '성형외과',
    link: '/prep/plastic-photo-guide',
    status: 'available',
  },

  // ── 6. 성형수술 후 주의사항 ─────────────────────────────────────
  {
    titleKo: '수술 후 공통 주의사항',
    titleZh: '术后通用注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 공통',
    link: '/prep/surgery-after',
    status: 'available',
  },
  {
    titleKo: '마취 후 귀가 주의사항',
    titleZh: '麻醉后回家注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 마취',
    link: '/prep/anesthesia-after-care',
    status: 'available',
  },
  {
    titleKo: '쌍꺼풀 수술 후 주의사항',
    titleZh: '双眼皮术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 눈성형',
    link: '/prep/double-eyelid-after',
    status: 'available',
  },
  {
    titleKo: '눈밑지방재배치 후 주의사항',
    titleZh: '眼袋脂肪重置术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 눈성형',
    link: '/prep/lower-eyelid-fat-after',
    status: 'available',
  },
  {
    titleKo: '트임수술 후 주의사항',
    titleZh: '开眼角术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 눈성형',
    link: '/prep/epicanthoplasty-after',
    status: 'available',
  },
  {
    titleKo: '코성형 후 주의사항',
    titleZh: '鼻整形术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 코성형',
    link: '/prep/rhinoplasty-after',
    status: 'available',
  },
  {
    titleKo: '안면윤곽 후 주의사항',
    titleZh: '面部轮廓术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 윤곽',
    link: '/prep/facial-contouring-after',
    status: 'available',
  },
  {
    titleKo: '거상수술 후 주의사항',
    titleZh: '拉皮提升术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과',
    link: '/prep/facelift-after',
    status: 'available',
  },
  {
    titleKo: '목거상 후 주의사항',
    titleZh: '颈部提升术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과',
    link: '/prep/necklift-after',
    status: 'available',
  },
  {
    titleKo: '지방흡입 후 주의사항',
    titleZh: '吸脂术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 체형',
    link: '/prep/liposuction-after',
    status: 'available',
  },
  {
    titleKo: '지방이식 후 주의사항',
    titleZh: '脂肪填充术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 체형',
    link: '/prep/fat-graft-after',
    status: 'available',
  },
  {
    titleKo: '가슴성형 후 주의사항',
    titleZh: '胸部整形术后注意事项',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과',
    link: '/prep/breast-surgery-after',
    status: 'available',
  },
  {
    titleKo: '흉터관리 안내',
    titleZh: '疤痕管理说明',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 공통',
    link: '/prep/scar-care-guide',
    status: 'available',
  },
  {
    titleKo: '실밥 제거·재내원 안내',
    titleZh: '拆线与复诊说明',
    type: 'surgery_after',
    category: 'plastic_after',
    field: '성형외과 / 공통',
    link: '/prep/suture-removal-guide',
    status: 'available',
  },

  // ── 7. 여성의학 / 8. 남성의학 / 9. 정형외과·통증·재생상담 ──────
  // 아직 등록된 문서 없음 — 관리자페이지에는 "준비 예정" 섹션으로 표시됨
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
