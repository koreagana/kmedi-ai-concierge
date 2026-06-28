import './PrepBloodTestBeforePage.css'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

interface PrepItem {
  zh: string
  ko: string
}

interface PrepSection {
  titleZh: string
  titleKo: string
  items: PrepItem[]
}

const SECTIONS: PrepSection[] = [
  {
    titleZh: '1. 检查前一天',
    titleKo: '검사 전날',
    items: [
      { zh: '避免饮酒', ko: '음주는 피해주세요.' },
      { zh: '避免过度运动', ko: '과격한 운동은 피해주세요.' },
      { zh: '避免熬夜', ko: '늦게까지 깨어 있지 않도록 해주세요.' },
      { zh: '尽量保持平时的饮食和生活节奏', ko: '가능한 평소와 비슷한 식사와 생활 리듬을 유지해주세요.' },
      { zh: '避免突然大量摄入油腻食物或甜食', ko: '기름진 음식이나 단 음식을 갑자기 많이 섭취하지 않는 것이 좋습니다.' },
    ],
  },
  {
    titleZh: '2. 禁食说明',
    titleKo: '금식 안내',
    items: [
      { zh: '部分血液检查需要空腹进行。', ko: '일부 혈액검사는 공복 상태에서 진행해야 할 수 있습니다.' },
      { zh: '常见项目如血糖、胰岛素、血脂、部分功能医学检查等，可能需要禁食。', ko: '혈당, 인슐린, 지질검사, 일부 기능의학 검사 등은 금식이 필요할 수 있습니다.' },
      { zh: '禁食时间请按照医院或顾问的说明。', ko: '금식 시간은 병원 또는 상담원이 안내한 기준을 따라주세요.' },
      { zh: '如不确定是否需要禁食，请提前询问顾问。', ko: '금식 여부가 확실하지 않다면 미리 상담원에게 확인해주세요.' },
    ],
  },
  {
    titleZh: '3. 饮水说明',
    titleKo: '물 섭취 안내',
    items: [
      { zh: '禁食期间是否可以喝水，请按照医院说明。', ko: '금식 중 물 섭취 가능 여부는 병원 안내를 따라주세요.' },
      { zh: '一般情况下，少量清水可能允许。', ko: '일반적으로 소량의 생수는 가능할 수 있습니다.' },
      { zh: '咖啡、茶、牛奶、果汁、含糖饮料请避免。', ko: '커피, 차, 우유, 주스, 당이 들어간 음료는 피해주세요.' },
      { zh: '不要喝酒精饮料。', ko: '술은 마시지 마세요.' },
    ],
  },
  {
    titleZh: '4. 正在服用的药物',
    titleKo: '복용 중인 약',
    items: [
      { zh: '如正在服用降压药、糖尿病药、抗凝药、阿司匹林、甲状腺药、激素类药物等，请提前告知。', ko: '혈압약, 당뇨약, 항응고제, 아스피린, 갑상선약, 호르몬제 등을 복용 중이면 미리 알려주세요.' },
      { zh: '不要自行停药。', ko: '임의로 약을 중단하지 마세요.' },
      { zh: '是否需要停药、延后服药或调整服药时间，请由医院判断。', ko: '약 중단, 복용 연기, 복용 시간 조정은 병원의 판단에 따라야 합니다.' },
      { zh: '请尽量准备药名或药盒照片。', ko: '가능하면 약 이름 또는 약 사진을 준비해주세요.' },
    ],
  },
  {
    titleZh: '5. 保健品和维生素',
    titleKo: '건강기능식품과 비타민',
    items: [
      { zh: '如正在服用维生素、铁剂、Omega-3、草本保健品、减肥产品等，请提前告知。', ko: '비타민, 철분제, 오메가3, 한약/허브 제품, 다이어트 제품 등을 복용 중이면 미리 알려주세요.' },
      { zh: '某些保健品可能影响检查结果或出血风险。', ko: '일부 건강기능식품은 검사 결과나 출혈 위험에 영향을 줄 수 있습니다.' },
      { zh: '是否需要暂停，请由医院判断。', ko: '중단 여부는 병원의 판단에 따라야 합니다.' },
    ],
  },
  {
    titleZh: '6. 女性顾客注意事项',
    titleKo: '여성 고객 주의사항',
    items: [
      { zh: '如正在月经期间、可能怀孕、正在备孕或哺乳，请提前告知。', ko: '생리 중, 임신 가능성, 임신 준비 중, 수유 중인 경우 미리 알려주세요.' },
      { zh: '部分激素检查可能需要根据月经周期安排。', ko: '일부 호르몬 검사는 생리주기에 따라 일정 조정이 필요할 수 있습니다.' },
      { zh: '如正在服用避孕药或激素类药物，也请提前告知。', ko: '피임약 또는 호르몬제를 복용 중인 경우에도 미리 알려주세요.' },
    ],
  },
  {
    titleZh: '7. 容易晕针或晕血的人',
    titleKo: '채혈 시 어지럼이 있는 경우',
    items: [
      { zh: '如果您有晕针、晕血、低血糖或采血时容易头晕的情况，请提前告诉顾问和医院。', ko: '주사나 피를 보면 어지럽거나, 저혈당이 있거나, 채혈 시 어지럼이 잘 생기는 경우 미리 상담원과 병원에 알려주세요.' },
      { zh: '采血前后不要突然站起来。', ko: '채혈 전후 갑자기 일어나지 마세요.' },
      { zh: '如感到头晕、恶心、出汗或不舒服，请立即告诉医护人员。', ko: '어지럼, 메스꺼움, 식은땀, 불편감이 있으면 즉시 의료진에게 알려주세요.' },
    ],
  },
  {
    titleZh: '8. 检查当天准备物品',
    titleKo: '검사 당일 준비물',
    items: [
      { zh: '护照', ko: '여권' },
      { zh: '预约信息', ko: '예약 정보' },
      { zh: '近期检查报告，如有', ko: '최근 검사결과지, 있는 경우' },
      { zh: '正在服用的药物名称或药盒照片', ko: '복용 중인 약 이름 또는 약 사진' },
      { zh: '如有慢性疾病，请准备相关资料', ko: '만성질환이 있다면 관련 자료' },
    ],
  },
  {
    titleZh: '9. 检查报告提交说明',
    titleKo: '검사결과지 제출 안내',
    items: [
      { zh: '如最近做过健康检查、血液检查、影像检查，请提前发送给顾问。', ko: '최근 건강검진, 혈액검사, 영상검사를 받은 적이 있다면 상담원에게 미리 보내주세요.' },
      { zh: '近期报告可以帮助医生比较身体状态变化。', ko: '최근 검사결과지는 의사가 몸 상태 변화를 비교하는 데 도움이 됩니다.' },
      { zh: '请不要在公开页面上传检查报告，通过顾问单独发送即可。', ko: '공개 페이지에 검사결과지를 업로드하지 말고, 상담원에게 별도로 보내주세요.' },
    ],
  },
]

export default function PrepBloodTestBeforePage() {
  return (
    <div className="prep-page">
      <div className="prep-container">
        <header className="prep-header">
          <p className="prep-title-zh">血液检查前注意事项</p>
          <p className="prep-title-ko">혈액검사 전 안내</p>
          <p className="prep-desc-zh">
            为了让血液检查结果更加准确，请在来院前确认以下注意事项。
            不同检查项目可能需要不同的准备方式，如医院另有说明，请以医院说明为准。
          </p>
          <p className="prep-desc-ko">
            혈액검사 결과를 보다 정확하게 확인할 수 있도록 내원 전 아래 주의사항을 확인해주세요.
            검사 항목에 따라 준비 방법이 달라질 수 있으며, 병원에서 별도 안내한 내용이 있다면 병원 안내를 우선합니다.
          </p>
        </header>

        <div className="prep-priority-notice">
          <p className="prep-priority-notice-title-zh">医院说明优先</p>
          <p className="prep-priority-notice-title-ko">병원 안내 우선</p>
          <p className="prep-priority-notice-zh">
            不同血液检查项目的禁食时间、服药方式和注意事项可能不同。
            如医院或顾问已单独说明，请优先按照该说明准备。
          </p>
          <p className="prep-priority-notice-ko">
            혈액검사 항목에 따라 금식 시간, 약 복용 방식, 주의사항이 달라질 수 있습니다.
            병원 또는 상담원이 별도로 안내한 내용이 있다면 그 안내를 우선해주세요.
          </p>
        </div>

        {SECTIONS.map((section) => (
          <div className="prep-section" key={section.titleZh}>
            <p className="prep-section-title-zh">{section.titleZh}</p>
            <p className="prep-section-title-ko">{section.titleKo}</p>
            {section.items.map((item) => (
              <div className="prep-item" key={item.zh}>
                <span className="prep-item-dot">·</span>
                <div className="prep-item-text">
                  <p className="prep-item-zh">{item.zh}</p>
                  <p className="prep-item-ko">{item.ko}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="prep-notice">
          <p className="prep-notice-zh">
            以上内容仅为血液检查前准备参考，具体禁食时间、服药调整及注意事项需以医院最终说明为准。
            汉江春天不是医疗机构，不进行诊断或治疗判断。
          </p>
          <p className="prep-notice-ko">
            위 내용은 혈액검사 전 준비를 위한 참고 안내이며, 실제 금식 시간, 약 복용 조정 및 주의사항은 병원의 최종 안내를 기준으로 합니다.
            한강애봄은 의료기관이 아니며, 진단이나 치료 판단을 하지 않습니다.
          </p>
        </div>

        <div className="prep-actions">
          <a className="prep-btn-primary" href="/intake/functional">
            填写功能医学问诊表 / 기능의학 문진표 작성하기
          </a>
          <a className="prep-btn-secondary" href="/prep/health-checkup-before">
            查看健康检查前准备事项 / 건강검진 전 준비사항 보기
          </a>
          <a
            className="prep-wechat-btn"
            href={WECHAT_BIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            打开企业微信咨询
          </a>
        </div>

        <p className="prep-privacy-note">
          本页面内容仅在您的浏览器中处理，不会保存到服务器。 / 이 페이지의 내용은 브라우저 안에서만 처리되며 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  )
}
