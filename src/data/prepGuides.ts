export interface PrepGuide {
  titleZh: string
  titleKo: string
  bodyZh: string
  bodyKo: string
}

// NOTE: placeholder content — real guidance text pending from the client.
export const PREP_GUIDES: Record<string, PrepGuide> = {
  'health-checkup-before': {
    titleZh: '健康检查前准备事项',
    titleKo: '건강검진 전 준비사항',
    bodyZh: '[文案待补充] 具体的空腹时间、用药调整、携带资料等注意事项将由顾问确认后补充。',
    bodyKo: '[문구 준비 중] 공복 시간, 복용약 조정, 지참 서류 등 준비사항은 상담원 확인 후 안내드립니다.',
  },
  'blood-test-before': {
    titleZh: '血液检查前注意事项',
    titleKo: '혈액검사 전 안내',
    bodyZh: '[文案待补充] 抽血前的饮食、饮水、用药等注意事项将由顾问确认后补充。',
    bodyKo: '[문구 준비 중] 혈액검사 전 식사, 수분 섭취, 복용약 관련 안내는 상담원 확인 후 제공됩니다.',
  },
  'colonoscopy-before': {
    titleZh: '肠镜检查前准备事项',
    titleKo: '대장내시경 전 준비사항',
    bodyZh: '[文案待补充] 肠道清洁准备、饮食限制、用药调整等注意事项将由顾问确认后补充。',
    bodyKo: '[문구 준비 중] 장 정결 준비, 식이 제한, 복용약 조정 등 준비사항은 상담원 확인 후 안내드립니다.',
  },
  'imaging-before': {
    titleZh: 'CT/MRI检查前确认表',
    titleKo: 'CT/MRI 검사 전 확인표',
    bodyZh: '[文案待补充] 造影剂过敏史、体内金属植入物、幽闭恐惧等确认事项将由顾问确认后补充。',
    bodyKo: '[문구 준비 중] 조영제 알레르기 이력, 체내 금속 삽입물, 폐소공포증 등 확인 사항은 상담원 확인 후 안내드립니다.',
  },
}
