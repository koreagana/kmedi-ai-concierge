import './PrepHealthCheckupBeforePage.css'

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
      { zh: '尽量保证充足睡眠', ko: '충분한 수면을 취해주세요.' },
      { zh: '避免过度油腻或刺激性饮食', ko: '지나치게 기름지거나 자극적인 음식은 피해주세요.' },
    ],
  },
  {
    titleZh: '2. 禁食说明',
    titleKo: '금식 안내',
    items: [
      { zh: '如包含血液检查、腹部超声、胃镜等项目，通常需要禁食。', ko: '혈액검사, 복부초음파, 위내시경 등이 포함된 경우 금식이 필요할 수 있습니다.' },
      { zh: '禁食时间可能因检查项目不同而不同。', ko: '금식 시간은 검사 항목에 따라 달라질 수 있습니다.' },
      { zh: '请按照医院或顾问的说明进行禁食。', ko: '병원 또는 상담원이 안내한 시간에 따라 금식해주세요.' },
    ],
  },
  {
    titleZh: '3. 饮水说明',
    titleKo: '물 섭취 안내',
    items: [
      { zh: '禁食期间是否可以喝水，请按照医院说明。', ko: '금식 중 물 섭취 가능 여부는 병원 안내를 따라주세요.' },
      { zh: '一般少量清水可能允许，但咖啡、茶、牛奶、果汁等请避免。', ko: '일반적으로 소량의 생수는 가능할 수 있으나, 커피, 차, 우유, 주스 등은 피해주세요.' },
      { zh: '如不确定，请提前询问顾问。', ko: '확실하지 않으면 상담원에게 미리 확인해주세요.' },
    ],
  },
  {
    titleZh: '4. 正在服用的药物',
    titleKo: '복용 중인 약',
    items: [
      { zh: '如正在服用降压药、糖尿病药、抗凝药、阿司匹林、甲状腺药等，请提前告知。', ko: '혈압약, 당뇨약, 항응고제, 아스피린, 갑상선약 등을 복용 중이면 미리 알려주세요.' },
      { zh: '不要自行停药。', ko: '임의로 약을 중단하지 마세요.' },
      { zh: '是否需要停药或调整服药时间，请由医院判断。', ko: '약 중단 또는 복용 시간 조정은 병원의 판단에 따라야 합니다.' },
    ],
  },
  {
    titleZh: '5. 女性顾客注意事项',
    titleKo: '여성 고객 주의사항',
    items: [
      { zh: '如正在月经期间、可能怀孕、正在备孕或哺乳，请提前告知。', ko: '생리 중, 임신 가능성, 임신 준비 중, 수유 중인 경우 미리 알려주세요.' },
      { zh: '部分检查可能需要调整时间或检查方式。', ko: '일부 검사는 일정이나 검사 방식 조정이 필요할 수 있습니다.' },
    ],
  },
  {
    titleZh: '6. 检查当天准备物品',
    titleKo: '검사 당일 준비물',
    items: [
      { zh: '护照', ko: '여권' },
      { zh: '预约信息', ko: '예약 정보' },
      { zh: '近期检查报告，如有', ko: '최근 검사결과지, 있는 경우' },
      { zh: '正在服用的药物名称或药盒照片', ko: '복용 중인 약 이름 또는 약 사진' },
      { zh: '眼镜或助听器等个人必需品，如需要', ko: '안경, 보청기 등 개인 필수품' },
    ],
  },
  {
    titleZh: '7. 检查报告提交说明',
    titleKo: '검사결과지 제출 안내',
    items: [
      { zh: '如最近做过健康检查、血液检查、影像检查，请提前发送给顾问。', ko: '최근 건강검진, 혈액검사, 영상검사를 받은 적이 있다면 상담원에게 미리 보내주세요.' },
      { zh: '检查报告可以帮助医生更好地了解您的身体状态。', ko: '검사결과지는 의사가 현재 건강 상태를 이해하는 데 도움이 됩니다.' },
      { zh: '请不要在公开页面上传检查报告，通过顾问单独发送即可。', ko: '공개 페이지에 검사결과지를 업로드하지 말고, 상담원에게 별도로 보내주세요.' },
    ],
  },
  {
    titleZh: '8. 需要提前告诉顾问的情况',
    titleKo: '상담원에게 미리 알려야 할 사항',
    items: [
      { zh: '药物或食物过敏', ko: '약물 또는 음식 알레르기' },
      { zh: '既往手术经历', ko: '과거 수술 이력' },
      { zh: '慢性疾病', ko: '만성질환' },
      { zh: '目前服用药物', ko: '현재 복용 중인 약' },
      { zh: '最近身体不适', ko: '최근 몸 상태 이상' },
      { zh: '晕针、晕血或对检查非常紧张', ko: '주사나 피를 보면 어지럽거나 검사에 대한 긴장감이 큰 경우' },
    ],
  },
]

export default function PrepHealthCheckupBeforePage() {
  return (
    <div className="prep-page">
      <div className="prep-container">
        <header className="prep-header">
          <p className="prep-title-zh">健康检查前准备事项</p>
          <p className="prep-title-ko">건강검진 전 준비사항</p>
          <p className="prep-desc-zh">
            为了让健康检查和功能医学检查更加顺利，请在来院前确认以下准备事项。
            具体检查项目可能因医院安排而不同，如医院另有说明，请以医院说明为准。
          </p>
          <p className="prep-desc-ko">
            건강검진 및 기능의학 검사가 원활하게 진행될 수 있도록 내원 전 아래 준비사항을 확인해주세요.
            검사 항목과 병원 지시에 따라 준비 내용이 달라질 수 있으며, 병원에서 별도 안내한 내용이 있다면 병원 안내를 우선합니다.
          </p>
        </header>

        <div className="prep-priority-notice">
          <p className="prep-priority-notice-zh">⚠ 各医院具体指示优先适用</p>
          <p className="prep-priority-notice-ko">⚠ 병원별 세부 지시는 본 안내보다 우선 적용됩니다.</p>
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
            以上内容仅为来院前准备参考，具体检查项目、禁食时间、服药调整及注意事项需以医院最终说明为准。
            汉江春天不是医疗机构，不进行诊断或治疗判断。
          </p>
          <p className="prep-notice-ko">
            위 내용은 내원 전 준비를 위한 참고 안내이며, 실제 검사 항목, 금식 시간, 약 복용 조정 및 주의사항은 병원의 최종 안내를 기준으로 합니다.
            한강애봄은 의료기관이 아니며, 진단이나 치료 판단을 하지 않습니다.
          </p>
        </div>

        <div className="prep-actions">
          <a className="prep-btn-primary" href="/intake/functional">
            <span className="btn-text-zh">填写功能医学问诊表</span>
            <span className="btn-text-ko">기능의학 문진표 작성하기</span>
          </a>
          <a
            className="prep-wechat-btn"
            href={WECHAT_BIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="btn-text-zh">打开企业微信咨询</span>
            <span className="btn-text-ko">기업위챗 상담하기</span>
          </a>
        </div>

        <p className="prep-privacy-note">
          本页面内容仅在您的浏览器中处理，不会保存到服务器。 / 이 페이지의 내용은 브라우저 안에서만 처리되며 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  )
}
