export interface CategoryBlocks {
  suitableFor:     { zh: string[]; ko: string[]; en: string[] }
  commonQuestions: { zh: string[]; ko: string[]; en: string[] }
  beforeVisit:     { zh: string[]; ko: string[]; en: string[] }
  afterConsult:    { zh: string[]; ko: string[]; en: string[] }
}

export const categoryBlocksMap: Record<string, CategoryBlocks> = {
  'big-health': {
    suitableFor: {
      zh: ['长期疲劳或睡眠质量差', '体重管理困难、代谢变慢', '想系统了解自己的身体状态', '关注代谢、免疫或激素问题'],
      ko: ['만성 피로 또는 수면 불량', '체중 관리·대사 저하 고민', '신체 상태를 체계적으로 파악하고 싶은 분', '대사·면역·호르몬에 관심 있는 분'],
      en: ['Chronic fatigue or poor sleep quality', 'Struggling with weight or slow metabolism', 'Want a comprehensive health assessment', 'Questions about metabolism, immunity, or hormones'],
    },
    commonQuestions: {
      zh: ['精密健康检查套餐', '功能医学评估', '营养与代谢分析', '抗衰老状态管理'],
      ko: ['정밀건강검진 패키지', '기능의학 평가', '영양·대사 분석', '항노화 상태 관리'],
      en: ['Comprehensive health screening packages', 'Functional medicine evaluation', 'Nutrition & metabolic analysis', 'Anti-aging health management'],
    },
    beforeVisit: {
      zh: ['整理近期症状和主要关注点', '了解目前服用的药物或保健品', '确认计划停留天数', '是否需要中文翻译支持'],
      ko: ['최근 증상·관심사항 정리', '현재 복용 중인 약물·영양제 파악', '체류 일정 확인', '중국어 통역 필요 여부 확인'],
      en: ['List your current symptoms and concerns', 'Note any medications or supplements', 'Confirm your planned stay duration', 'Consider whether interpretation is needed'],
    },
    afterConsult: {
      zh: ['适合自己的检查项目组合', '来韩行程和时间安排', '大致预算参考范围', '后续健康管理方向'],
      ko: ['나에게 맞는 검진 항목 조합', '방한 일정 및 시간 배분', '예산 참고 범위', '사후 건강 관리 방향'],
      en: ['Which checkup packages suit you', 'Recommended itinerary & schedule', 'Budget reference range', 'Follow-up health management options'],
    },
  },

  'stem-cell': {
    suitableFor: {
      zh: ['关注抗衰老与再生管理', '有关节疼痛或运动功能下降', '免疫力或恢复能力减退', '希望了解再生医学方向'],
      ko: ['항노화 재생 관리에 관심 있는 분', '관절 통증 또는 운동 기능 저하', '면역력·회복력 저하', '재생의학 방향을 알고 싶은 분'],
      en: ['Interested in anti-aging regenerative care', 'Joint pain or decreased mobility', 'Declining immunity or recovery ability', 'Want to learn about regenerative medicine'],
    },
    commonQuestions: {
      zh: ['再生医学咨询范围', '关节健康管理方向', '抗衰老综合评估', '皮肤与组织修复'],
      ko: ['재생의학 상담 범위', '관절 건강 관리 방향', '항노화 종합 평가', '피부·조직 재생'],
      en: ['Scope of regenerative medicine consultation', 'Joint health management options', 'Comprehensive anti-aging evaluation', 'Skin and tissue regeneration'],
    },
    beforeVisit: {
      zh: ['整理目前主要健康问题', '了解现有病史和手术史', '明确来韩目的（抗衰/关节/恢复）', '切勿自行判断是否适合干细胞治疗'],
      ko: ['현재 주요 건강 문제 정리', '기존 병력·수술 이력 파악', '방한 목적 명확히 하기 (항노화/관절/회복)', '자의적으로 적합 여부 판단하지 않기'],
      en: ['List your main health concerns', 'Document medical history and surgeries', 'Clarify your purpose (anti-aging/joint/recovery)', 'Do not self-assess suitability for stem cell therapy'],
    },
    afterConsult: {
      zh: ['韩国再生医学咨询范围', '可以咨询的方向和流程', '初步评估需要哪些信息', '具体治疗是否适合须医疗机构判断'],
      ko: ['한국 재생의학 상담 범위', '상담 가능한 방향과 절차', '초기 평가에 필요한 정보', '구체적 치료 적합 여부는 의료기관 판단'],
      en: ['Scope of regenerative medicine in Korea', 'Which directions are consultable', 'What information is needed for initial evaluation', 'Treatment suitability requires medical assessment'],
    },
  },

  'skin-beauty': {
    suitableFor: {
      zh: ['皮肤松弛或法令纹明显', '毛孔粗大或肤质不均', '色斑、痘疤困扰', '想整体改善肤质与年轻感'],
      ko: ['피부 처짐이나 팔자주름', '모공 확대 또는 불균일한 피부결', '색소 침착·여드름 흉터', '전반적인 피부결·젊음감 개선'],
      en: ['Skin laxity or visible nasolabial folds', 'Enlarged pores or uneven skin texture', 'Dark spots or acne scars', 'Overall skin quality and youthful improvement'],
    },
    commonQuestions: {
      zh: ['超声提升（HIFU）', '激光焕肤与色斑改善', '水光针 / PDRN修复', '肉毒素紧致与皱纹管理'],
      ko: ['울쎄라·HIFU 리프팅', '레이저 토닝·색소 개선', '수광 주사 / PDRN 재생', '보톡스 탄력·주름 관리'],
      en: ['Ulthera / HIFU lifting', 'Laser toning & pigmentation', 'Skin booster / PDRN regeneration', 'Botox tightening & wrinkle management'],
    },
    beforeVisit: {
      zh: ['整理皮肤主要问题和改善目标', '了解恢复期（是否有重要日程）', '确认停留天数和预算范围', '准备近期正面素颜照'],
      ko: ['피부 주요 문제·개선 목표 정리', '회복기 일정 확인 (중요한 일정 있는지)', '체류 기간 및 예산 확인', '최근 맨 얼굴 정면 사진 준비'],
      en: ['List your main skin concerns and goals', 'Check recovery schedule (any important events?)', 'Confirm stay duration and budget', 'Prepare recent bare-face front photos'],
    },
    afterConsult: {
      zh: ['适合自己的皮肤管理方向', '不同项目的恢复期和注意事项', '韩国皮肤科预约方式与流程', '大致费用参考'],
      ko: ['나에게 맞는 피부 관리 방향', '시술별 회복 기간 및 주의사항', '한국 피부과 예약 방법·절차', '대략적인 비용 참고'],
      en: ['Which skin treatments suit you', 'Recovery periods and precautions per treatment', 'How to book Korean dermatology clinics', 'Approximate cost reference'],
    },
  },

  'plastic-surgery': {
    suitableFor: {
      zh: ['对眼部或鼻部整形有考虑', '想改善面部轮廓和下颌线', '有下垂或眼袋困扰', '希望在韩国进行整形咨询'],
      ko: ['눈·코 성형을 고려 중인 분', '얼굴 윤곽·턱선 개선을 원하는 분', '처짐이나 눈 밑 지방이 고민인 분', '한국에서 성형 상담을 원하는 분'],
      en: ['Considering eye or nose surgery', 'Want to improve facial contour or jawline', 'Concerned about sagging or under-eye bags', 'Looking for plastic surgery consultation in Korea'],
    },
    commonQuestions: {
      zh: ['双眼皮 / 开眼角', '鼻整形（硅胶/软骨）', '面部轮廓手术', '眼袋去除 / 脂肪移植'],
      ko: ['쌍꺼풀 / 앞·뒤트임', '코 성형 (실리콘/연골)', '얼굴 윤곽 수술', '눈 밑 지방 / 지방 이식'],
      en: ['Double eyelid / Epicanthoplasty', 'Rhinoplasty (silicone / cartilage)', 'Facial contouring surgery', 'Under-eye fat removal / Fat grafting'],
    },
    beforeVisit: {
      zh: ['整理想改善的部位和目标', '了解恢复期要求（术后通常1-2周以上）', '确认停留时间是否足够', '与家人或朋友商量后再做决定'],
      ko: ['개선하고 싶은 부위와 목표 정리', '회복기 파악 (수술 후 보통 1~2주 이상)', '충분한 체류 기간 확인', '중요한 결정은 가족·친구와 상의 권장'],
      en: ['List areas you want to improve', 'Understand recovery (typically 1-2+ weeks post-op)', 'Confirm sufficient stay duration', 'Discuss major decisions with family or friends'],
    },
    afterConsult: {
      zh: ['各整形项目的大致恢复期', '韩国整形咨询流程和注意事项', '不同医生或机构的风格差异', '预算和时间安排参考'],
      ko: ['각 성형 항목의 대략적인 회복 기간', '한국 성형 상담 절차·주의사항', '의사·기관별 스타일 차이', '예산·일정 참고'],
      en: ['Approximate recovery per procedure', 'Consultation process & precautions in Korea', 'Style differences between surgeons', 'Budget and timeline reference'],
    },
  },

  'womens-care': {
    suitableFor: {
      zh: ['有妇科问题或定期检查需求', '关注私密护理或产后恢复', '有更年期症状困扰', '希望在韩国进行女性健康咨询'],
      ko: ['부인과 관련 문제나 정기 검진이 필요한 분', '프라이빗 케어나 산후 회복 관심', '갱년기 증상이 있는 분', '한국에서 여성 건강 상담을 원하는 분'],
      en: ['Gynecological concerns or regular checkup needs', 'Interest in intimate care or postpartum recovery', 'Experiencing menopausal symptoms', 'Seeking women\'s health consultation in Korea'],
    },
    commonQuestions: {
      zh: ['妇科精密检查', '私密护理与激光', '产后恢复管理', '更年期激素咨询'],
      ko: ['부인과 정밀 검진', '프라이빗 케어·레이저', '산후 회복 관리', '갱년기 호르몬 상담'],
      en: ['Gynecological precision checkup', 'Intimate care & laser treatments', 'Postpartum recovery management', 'Menopausal hormone consultation'],
    },
    beforeVisit: {
      zh: ['整理目前主要症状和关注点', '了解月经周期和激素相关历史', '确认停留时间和预约需求', '可选择更私密的咨询方式'],
      ko: ['현재 주요 증상·관심사항 정리', '생리 주기·호르몬 관련 이력 파악', '체류 기간·예약 필요 여부 확인', '더 프라이빗한 상담 방식 선택 가능'],
      en: ['List your main symptoms and concerns', 'Note menstrual cycle and hormone history', 'Confirm stay duration and appointment needs', 'More discreet consultation options available'],
    },
    afterConsult: {
      zh: ['适合自己的女性健康管理方向', '韩国妇科咨询的流程和注意事项', '相关费用和时间参考', '后续管理与随访建议'],
      ko: ['나에게 맞는 여성 건강 관리 방향', '한국 부인과 상담 절차·주의사항', '관련 비용·기간 참고', '사후 관리·추적 관찰 안내'],
      en: ['Women\'s health management direction for you', 'Process & precautions for gynecology in Korea', 'Cost and timeline reference', 'Follow-up care and monitoring recommendations'],
    },
  },

  'mens-health': {
    suitableFor: {
      zh: ['长期疲劳或体力下降', '脱发或头皮健康困扰', '泌尿系统或前列腺问题', '希望改善整体男性健康状态'],
      ko: ['만성 피로 또는 체력 저하', '탈모나 두피 건강이 고민인 분', '비뇨기·전립선 관련 문제', '전반적인 남성 건강 상태 개선'],
      en: ['Chronic fatigue or declining physical strength', 'Hair loss or scalp health concerns', 'Urological or prostate-related issues', 'Want to improve overall men\'s health'],
    },
    commonQuestions: {
      zh: ['男性健康精密检查', '脱发与头皮管理', '泌尿科咨询', '前列腺健康评估'],
      ko: ['남성 건강 정밀 검진', '탈모·두피 관리', '비뇨기과 상담', '전립선 건강 평가'],
      en: ['Men\'s health precision checkup', 'Hair loss & scalp management', 'Urology consultation', 'Prostate health assessment'],
    },
    beforeVisit: {
      zh: ['整理目前最担心的问题', '了解近期体检结果（如有）', '记录脱发状态或症状历史', '确认停留时间和预算'],
      ko: ['현재 가장 걱정되는 문제 정리', '최근 건강검진 결과 파악 (있을 경우)', '탈모 상태·증상 이력 기록', '체류 기간 및 예산 확인'],
      en: ['List your main health concerns', 'Note recent checkup results (if any)', 'Document hair loss or symptom history', 'Confirm stay duration and budget'],
    },
    afterConsult: {
      zh: ['男性健康管理的优先方向', '韩国泌尿科咨询流程', '脱发治疗的选项和时间安排', '后续管理建议'],
      ko: ['남성 건강 관리의 우선 방향', '한국 비뇨기과·남성의학 상담 절차', '탈모 치료 옵션 및 일정', '사후 관리 안내'],
      en: ['Priority direction for men\'s health', 'Process for urology consultations in Korea', 'Hair loss treatment options & scheduling', 'Follow-up care recommendations'],
    },
  },

  'medical-tourism': {
    suitableFor: {
      zh: ['计划来韩国进行医疗咨询或治疗', '需要中文翻译和陪同服务', '希望整合医疗与旅行行程', '不熟悉韩国医疗体系的海外客户'],
      ko: ['한국에서 의료 상담·치료를 계획 중인 분', '중국어 통역·동행 서비스가 필요한 분', '의료와 여행 일정을 통합하고 싶은 분', '한국 의료 시스템에 익숙하지 않은 해외 고객'],
      en: ['Planning medical consultation or treatment in Korea', 'Need Chinese interpretation and escort services', 'Want to combine medical care with travel', 'International clients new to Korean healthcare'],
    },
    commonQuestions: {
      zh: ['医疗预约与协调', '中文翻译陪同', '交通与接送服务', '行程规划与住宿建议'],
      ko: ['의료 예약 및 조율', '중국어 통역 동행', '교통·픽업 서비스', '일정 계획·숙소 안내'],
      en: ['Medical appointment coordination', 'Chinese language interpretation & escort', 'Transportation and pickup services', 'Itinerary planning & accommodation guidance'],
    },
    beforeVisit: {
      zh: ['明确来韩主要医疗目的', '确认同行人数和停留天数', '了解大致预算范围', '提前提交咨询需求，方便安排行程'],
      ko: ['방한 주요 의료 목적 명확히 하기', '동행 인원 및 체류 일수 확인', '대략적인 예산 범위 파악', '상담 요청 미리 제출 (일정 조율을 위해)'],
      en: ['Clarify your main medical purpose', 'Confirm number of companions and stay duration', 'Understand your approximate budget', 'Submit consultation request in advance for planning'],
    },
    afterConsult: {
      zh: ['可以安排哪些服务项目', '大致行程框架', '费用参考和服务范围', '如何启动后续流程'],
      ko: ['어떤 서비스 항목을 조율할 수 있는지', '대략적인 일정 구성', '비용 참고·서비스 범위', '이후 진행 절차'],
      en: ['Which services can be arranged', 'Approximate itinerary framework', 'Cost reference and service scope', 'How to initiate the next steps'],
    },
  },

  'custom-plan': {
    suitableFor: {
      zh: ['还不确定选择哪个医疗项目', '有多个需求想一起整合', '希望根据自己情况定制方案', '时间或预算有限，需要优化安排'],
      ko: ['아직 어떤 의료 항목을 선택할지 모르는 분', '여러 니즈를 함께 통합하고 싶은 분', '개인 상황에 맞게 맞춤 플랜을 원하는 분', '시간·예산 제약이 있어 최적 배분이 필요한 분'],
      en: ['Not sure which medical service to choose yet', 'Have multiple needs to integrate', 'Want a plan customized to your situation', 'Time or budget constraints need optimized planning'],
    },
    commonQuestions: {
      zh: ['需求梳理与方向建议', '多项目整合方案', '时间与预算优化', '首次来韩咨询流程说明'],
      ko: ['니즈 정리 및 방향 제안', '복수 항목 통합 플랜', '시간·예산 최적화', '첫 방한 의료 상담 절차 안내'],
      en: ['Needs clarification & direction recommendations', 'Multi-service integration plan', 'Time and budget optimization', 'First-time Korea medical consultation process'],
    },
    beforeVisit: {
      zh: ['填写基本咨询卡（目的、时间、预算、同行人数）', '整理目前最关心的1-3个问题', '说明是否有特殊要求', '尽量提前联系，方便安排'],
      ko: ['기본 상담 카드 작성 (목적·시간·예산·동행 인원)', '현재 가장 신경 쓰이는 1~3가지 정리', '특별 요구사항 안내 (언어·프라이버시·시간 제약)', '최대한 미리 연락하기 (일정 조율을 위해)'],
      en: ['Fill out the basic consultation card', 'List the 1-3 issues you care about most', 'Note any special requirements (language, privacy, time)', 'Contact us as early as possible for better scheduling'],
    },
    afterConsult: {
      zh: ['适合自己的医疗方向和优先级', '大致行程和时间分配', '整体预算参考', '如何开始下一步咨询'],
      ko: ['나에게 맞는 의료 방향 및 우선순위', '대략적인 일정·시간 배분', '전체 예산 참고', '다음 단계 상담 시작 방법'],
      en: ['Medical directions and priorities for you', 'Approximate itinerary and time allocation', 'Overall budget reference', 'How to start the next consultation step'],
    },
  },
}
