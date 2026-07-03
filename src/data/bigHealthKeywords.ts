export interface BigHealthDocButton {
  zh: string
  ko: string
  kind: 'route' | 'external'
  target: string
}

export const BIG_HEALTH_DOC_BUTTONS = {
  functionalIntake: {
    zh: '填写功能医学问诊表',
    ko: '기능의학 문진표 작성하기',
    kind: 'route',
    target: '/intake/functional',
  },
  healthCheckupPrep: {
    zh: '查看健康检查前准备事项',
    ko: '건강검진 전 준비사항 보기',
    kind: 'route',
    target: '/prep/health-checkup-before',
  },
  bloodTestPrep: {
    zh: '查看血液检查前注意事项',
    ko: '혈액검사 전 안내 보기',
    kind: 'route',
    target: '/prep/blood-test-before',
  },
  colonoscopyPrep: {
    zh: '查看肠镜检查前准备事项',
    ko: '대장내시경 전 준비사항 보기',
    kind: 'route',
    target: '/prep/colonoscopy-before',
  },
  imagingPrep: {
    zh: '查看CT/MRI检查前确认表',
    ko: 'CT/MRI 검사 전 확인표 보기',
    kind: 'route',
    target: '/prep/imaging-before',
  },
  wechatConsult: {
    zh: '打开企业微信咨询',
    ko: '기업위챗 상담하기',
    kind: 'external',
    target: 'wechat',
  },
} satisfies Record<string, BigHealthDocButton>

export type BigHealthDocButtonKey = keyof typeof BIG_HEALTH_DOC_BUTTONS

export interface BigHealthBullet {
  zh: string
  ko: string
}

export interface BigHealthKeyword {
  id: string
  zh: string
  ko: string
  descriptionZh: string
  descriptionKo: string
  /** Optional secondary note shown right under the description (used by 再生医学咨询). */
  noteZh?: string
  noteKo?: string
  testsLabelZh: string
  testsLabelKo: string
  tests: BigHealthBullet[]
  directionLabelZh: string
  directionLabelKo: string
  direction: BigHealthBullet[]
  /** Item-specific prep documents. The WeChat consult button is always appended separately. */
  docKeys: BigHealthDocButtonKey[]
  /** Extra disclaimer shown after the doc buttons (currently required for 再生医学咨询). */
  extraDisclaimerZh?: string
  extraDisclaimerKo?: string
}

const TESTS_LABEL_ZH = '可能相关检查'
const TESTS_LABEL_KO = '관련 가능 검사'
const DIRECTION_LABEL_ZH = '可能咨询方向'
const DIRECTION_LABEL_KO = '상담 가능 방향'

export const BIG_HEALTH_SECTION = {
  titleZh: '大健康 · 抗衰老管理',
  titleKo: '항노화·건강관리',
  descZh: '不是单一项目，而是从疲劳、睡眠、肠道、代谢、激素和再生医学咨询等方向，了解身体状态并整理适合的韩国医疗咨询路径。',
  descKo: '단일 시술이 아니라 피로, 수면, 장 건강, 대사, 호르몬, 재생의학 상담 등을 통해 현재 몸 상태를 이해하고 적합한 한국 의료 상담 방향을 정리합니다.',
  safetyZh: [
    '以下内容仅用于韩国医疗咨询前的信息整理，不代替医生诊断。',
    '具体检查项目和治疗方向，需要由正规医疗机构和专业医生判断。',
  ],
  safetyKo: [
    '아래 내용은 한국 의료상담 전 정보 정리를 위한 참고 안내이며 의사의 진단을 대신하지 않습니다.',
    '구체적인 검사 항목과 치료 방향은 정규 의료기관과 전문의가 판단해야 합니다.',
  ],
}

export const BIG_HEALTH_KEYWORDS: BigHealthKeyword[] = [
  {
    id: 'chronic-fatigue',
    zh: '慢性疲劳',
    ko: '만성피로',
    descriptionZh: '长期疲劳、精力下降、恢复慢、注意力下降、睡醒后仍然疲惫等问题，可能与睡眠、营养状态、贫血、甲状腺、血糖、肝肾功能、慢性炎症或压力状态等多种因素有关。',
    descriptionKo: '장기간 피로, 에너지 저하, 회복 지연, 집중력 저하, 자고 일어나도 피곤한 상태 등은 수면, 영양 상태, 빈혈, 갑상선, 혈당, 간·신장 기능, 만성 염증 또는 스트레스 상태 등 여러 요인과 관련될 수 있습니다.',
    testsLabelZh: TESTS_LABEL_ZH,
    testsLabelKo: TESTS_LABEL_KO,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사' },
      { zh: '贫血相关检查', ko: '빈혈 관련 검사' },
      { zh: '铁蛋白与铁代谢检查', ko: '페리틴 및 철 대사 검사' },
      { zh: '维生素D检查', ko: '비타민D 검사' },
      { zh: '维生素B群相关评估', ko: '비타민B군 관련 평가' },
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사' },
      { zh: '空腹血糖与糖化血红蛋白', ko: '공복혈당 및 당화혈색소' },
      { zh: '肝功能与肾功能检查', ko: '간기능 및 신장기능 검사' },
      { zh: '炎症指标检查', ko: '염증 수치 검사' },
      { zh: '营养状态评估', ko: '영양 상태 평가' },
      { zh: '必要时进行功能医学相关评估', ko: '필요한 경우 기능의학 관련 평가' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '疲劳原因整理', ko: '피로 원인 정리' },
      { zh: '睡眠与生活节奏评估', ko: '수면 및 생활 리듬 평가' },
      { zh: '营养状态与缺乏因素确认', ko: '영양 상태 및 결핍 요인 확인' },
      { zh: '抗氧化与营养补充咨询', ko: '항산화 및 영양 보충 상담' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담' },
      { zh: '生活方式管理咨询', ko: '생활습관 관리 상담' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'sleep-issue',
    zh: '睡眠问题',
    ko: '수면 문제',
    descriptionZh: '入睡困难、浅眠、多梦、早醒、睡醒后仍疲劳、白天困倦等情况，可能与压力、自律神经、激素变化、血糖波动、生活节奏、咖啡因摄入或身体代谢状态有关。',
    descriptionKo: '잠들기 어려움, 얕은 수면, 꿈이 많음, 이른 기상, 자고 일어나도 피곤함, 낮 동안 졸림 등은 스트레스, 자율신경, 호르몬 변화, 혈당 변동, 생활 리듬, 카페인 섭취 또는 신체 대사 상태와 관련될 수 있습니다.',
    testsLabelZh: TESTS_LABEL_ZH,
    testsLabelKo: TESTS_LABEL_KO,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사' },
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사' },
      { zh: '血糖与胰岛素相关检查', ko: '혈당 및 인슐린 관련 검사' },
      { zh: '维生素D检查', ko: '비타민D 검사' },
      { zh: '铁蛋白与贫血相关检查', ko: '페리틴 및 빈혈 관련 검사' },
      { zh: '激素相关检查', ko: '호르몬 관련 검사' },
      { zh: '压力状态相关评估', ko: '스트레스 상태 관련 평가' },
      { zh: '自律神经相关评估，如医院可提供', ko: '병원에서 가능한 경우 자율신경 관련 평가' },
      { zh: '睡眠习惯与生活方式问诊', ko: '수면 습관 및 생활습관 문진' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '睡眠模式整理', ko: '수면 패턴 정리' },
      { zh: '压力与自律神经状态咨询', ko: '스트레스 및 자율신경 상태 상담' },
      { zh: '咖啡因、饮酒、作息习惯评估', ko: '카페인, 음주, 생활 리듬 평가' },
      { zh: '营养缺乏因素确认', ko: '영양 결핍 요인 확인' },
      { zh: '激素与代谢状态咨询', ko: '호르몬 및 대사 상태 상담' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'gut-health',
    zh: '肠道健康',
    ko: '장 건강',
    descriptionZh: '腹胀、消化不良、便秘、腹泻、胃肠不适、饭后疲劳、排便习惯变化等问题，可能需要结合饮食习惯、肠道状态、炎症反应、营养吸收和必要的内镜检查一起评估。',
    descriptionKo: '복부 팽만감, 소화불량, 변비, 설사, 위장 불편감, 식후 피로, 배변 습관 변화 등은 식습관, 장 상태, 염증 반응, 영양 흡수, 필요한 경우 내시경 검사 등을 함께 고려할 수 있습니다.',
    testsLabelZh: TESTS_LABEL_ZH,
    testsLabelKo: TESTS_LABEL_KO,
    tests: [
      { zh: '基础血液检查', ko: '기본 혈액검사' },
      { zh: '炎症指标检查', ko: '염증 수치 검사' },
      { zh: '肝功能与胰腺相关指标', ko: '간기능 및 췌장 관련 지표' },
      { zh: '营养状态评估', ko: '영양 상태 평가' },
      { zh: '贫血与铁蛋白检查', ko: '빈혈 및 페리틴 검사' },
      { zh: '维生素D与维生素B群相关评估', ko: '비타민D 및 비타민B군 관련 평가' },
      { zh: '大便相关检查，如医院可提供', ko: '병원에서 가능한 경우 대변 관련 검사' },
      { zh: '幽门螺杆菌相关检查，如有需要', ko: '필요한 경우 헬리코박터 관련 검사' },
      { zh: '胃镜或肠镜相关咨询', ko: '위내시경 또는 대장내시경 관련 상담' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '消化不良与腹胀原因整理', ko: '소화불량 및 복부 팽만 원인 정리' },
      { zh: '便秘或腹泻状态评估', ko: '변비 또는 설사 상태 평가' },
      { zh: '饮食习惯与肠道反应整理', ko: '식습관과 장 반응 정리' },
      { zh: '内镜检查准备咨询', ko: '내시경 검사 준비 상담' },
      { zh: '功能医学肠道健康评估咨询', ko: '기능의학 장 건강 평가 상담' },
      { zh: '营养吸收与生活方式管理咨询', ko: '영양 흡수 및 생활습관 관리 상담' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'colonoscopyPrep'],
  },
  {
    id: 'metabolic-management',
    zh: '代谢管理',
    ko: '대사 관리',
    descriptionZh: '血糖、血脂、脂肪肝、体重变化、腹部脂肪、胰岛素抵抗、糖尿病前期等问题，适合通过血液检查、生活方式评估和必要的医学咨询来了解身体代谢状态。',
    descriptionKo: '혈당, 혈중지질, 지방간, 체중 변화, 복부지방, 인슐린 저항성, 당뇨전단계 등은 혈액검사, 생활습관 평가, 필요한 의학 상담을 통해 신체 대사 상태를 확인하는 데 도움이 됩니다.',
    testsLabelZh: TESTS_LABEL_ZH,
    testsLabelKo: TESTS_LABEL_KO,
    tests: [
      { zh: '空腹血糖', ko: '공복혈당' },
      { zh: '糖化血红蛋白', ko: '당화혈색소' },
      { zh: '胰岛素相关检查', ko: '인슐린 관련 검사' },
      { zh: '总胆固醇', ko: '총콜레스테롤' },
      { zh: 'LDL胆固醇', ko: 'LDL 콜레스테롤' },
      { zh: 'HDL胆固醇', ko: 'HDL 콜레스테롤' },
      { zh: '甘油三酯', ko: '중성지방' },
      { zh: '肝功能检查', ko: '간기능 검사' },
      { zh: '脂肪肝相关评估', ko: '지방간 관련 평가' },
      { zh: '肾功能检查', ko: '신장기능 검사' },
      { zh: '尿酸检查', ko: '요산 검사' },
      { zh: '体成分检查，如医院可提供', ko: '병원에서 가능한 경우 체성분 검사' },
      { zh: '血压与心血管风险评估', ko: '혈압 및 심혈관 위험 평가' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '血糖与血脂状态整理', ko: '혈당 및 혈중지질 상태 정리' },
      { zh: '脂肪肝与肝功能咨询', ko: '지방간 및 간기능 상담' },
      { zh: '体重变化原因评估', ko: '체중 변화 원인 평가' },
      { zh: '胰岛素抵抗相关咨询', ko: '인슐린 저항성 관련 상담' },
      { zh: '饮食、运动与生活方式管理', ko: '식사, 운동, 생활습관 관리' },
      { zh: '功能医学与抗衰老管理咨询', ko: '기능의학 및 항노화 관리 상담' },
    ],
    docKeys: ['functionalIntake', 'bloodTestPrep'],
  },
  {
    id: 'hormone-balance',
    zh: '激素平衡',
    ko: '호르몬 균형',
    descriptionZh: '疲劳、睡眠问题、体重变化、情绪波动、月经变化、更年期症状、脱发、皮肤状态变化等，可能与甲状腺、女性激素、男性激素、压力激素或代谢状态有关。',
    descriptionKo: '피로, 수면 문제, 체중 변화, 감정 기복, 생리 변화, 갱년기 증상, 탈모, 피부 상태 변화 등은 갑상선, 여성호르몬, 남성호르몬, 스트레스 호르몬 또는 대사 상태와 관련될 수 있습니다.',
    testsLabelZh: TESTS_LABEL_ZH,
    testsLabelKo: TESTS_LABEL_KO,
    tests: [
      { zh: '甲状腺功能检查', ko: '갑상선 기능검사' },
      { zh: '女性激素相关检查', ko: '여성호르몬 관련 검사' },
      { zh: '男性激素相关检查', ko: '남성호르몬 관련 검사' },
      { zh: '更年期相关评估', ko: '갱년기 관련 평가' },
      { zh: '维生素D检查', ko: '비타민D 검사' },
      { zh: '血糖与胰岛素相关检查', ko: '혈당 및 인슐린 관련 검사' },
      { zh: '肝肾功能检查', ko: '간·신장 기능검사' },
      { zh: '贫血与铁蛋白检查', ko: '빈혈 및 페리틴 검사' },
      { zh: '压力状态相关评估', ko: '스트레스 상태 관련 평가' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '甲状腺状态咨询', ko: '갑상선 상태 상담' },
      { zh: '更年期管理咨询', ko: '갱년기 관리 상담' },
      { zh: '女性健康咨询', ko: '여성 건강 상담' },
      { zh: '男性健康咨询', ko: '남성 건강 상담' },
      { zh: '睡眠、情绪和体重变化综合评估', ko: '수면, 감정, 체중 변화 종합 평가' },
      { zh: '功能医学检查咨询', ko: '기능의학 검사 상담' },
    ],
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'regenerative-medicine-consult',
    zh: '再生医学咨询',
    ko: '재생의학 상담',
    descriptionZh: '韩国再生医学咨询主要是根据客户的身体状态、既往检查资料、疼痛或抗衰老需求，整理可以向正规医疗机构咨询的方向。',
    descriptionKo: '한국 재생의학 상담은 고객의 몸 상태, 기존 검사자료, 통증 또는 항노화 관련 요구를 바탕으로 정규 의료기관에 문의할 수 있는 방향을 정리하는 과정입니다.',
    noteZh: '这里不直接判断是否适合某种治疗，也不保证治疗效果。\n具体是否适合，需要由正规医疗机构和专业医生判断。',
    noteKo: '이 페이지에서는 특정 치료 적합 여부를 직접 판단하지 않으며 치료 효과를 보장하지 않습니다.\n구체적인 적합 여부는 정규 의료기관과 전문의가 판단해야 합니다.',
    testsLabelZh: '可能相关资料',
    testsLabelKo: '관련 가능 자료',
    tests: [
      { zh: '近期血液检查报告', ko: '최근 혈액검사 결과지' },
      { zh: '影像资料，如X光、MRI、CT、超声等', ko: 'X-ray, MRI, CT, 초음파 등 영상자료' },
      { zh: '既往诊断书或医生意见书', ko: '기존 진단서 또는 의사 소견서' },
      { zh: '既往治疗或手术记录', ko: '기존 치료 또는 수술 기록' },
      { zh: '正在服用的药物清单', ko: '현재 복용 중인 약 목록' },
      { zh: '过敏史和慢性疾病信息', ko: '알레르기 및 만성질환 정보' },
      { zh: '疼痛部位、持续时间和症状变化记录', ko: '통증 부위, 지속 기간, 증상 변화 기록' },
    ],
    directionLabelZh: DIRECTION_LABEL_ZH,
    directionLabelKo: DIRECTION_LABEL_KO,
    direction: [
      { zh: '关节和疼痛相关再生医学咨询', ko: '관절 및 통증 관련 재생의학 상담' },
      { zh: '抗衰老相关再生医学咨询', ko: '항노화 관련 재생의학 상담' },
      { zh: '自体血液基础再生管理咨询', ko: '자가혈 기반 재생관리 상담' },
      { zh: '细胞治疗相关合法咨询范围整理', ko: '세포치료 관련 합법 상담 범위 정리' },
      { zh: '既往检查资料整理与医院转达', ko: '기존 검사자료 정리 및 병원 전달' },
      { zh: '韩国正规医疗机构咨询路径整理', ko: '한국 정규 의료기관 상담 경로 정리' },
    ],
    docKeys: ['functionalIntake', 'imagingPrep'],
    extraDisclaimerZh: '再生医学、细胞治疗、关节或抗衰老相关项目，需根据韩国法律法规、医疗机构资质和医生判断进行咨询。\n汉江春天不进行诊断、治疗判断或效果保证。',
    extraDisclaimerKo: '재생의학, 세포치료, 관절 또는 항노화 관련 항목은 한국의 법규, 의료기관 자격, 의사의 판단에 따라 상담되어야 합니다.\n한강애봄은 진단, 치료 판단 또는 효과 보장을 하지 않습니다.',
  },
]
