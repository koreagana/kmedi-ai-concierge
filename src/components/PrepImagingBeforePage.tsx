import './PrepImagingBeforePage.css'

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
    titleZh: '1. 检查类型确认',
    titleKo: '검사 종류 확인',
    items: [
      { zh: '请提前确认自己预约的是CT、MRI，还是其他影像检查。', ko: '예약된 검사가 CT인지, MRI인지, 또는 다른 영상검사인지 미리 확인해주세요.' },
      { zh: '如不确定检查名称，请将预约信息发送给顾问确认。', ko: '검사명이 확실하지 않다면 예약 정보를 상담원에게 보내 확인해주세요.' },
      { zh: '不同检查的准备事项可能不同。', ko: '검사 종류에 따라 준비사항이 달라질 수 있습니다.' },
    ],
  },
  {
    titleZh: '2. MRI检查前金属物确认',
    titleKo: 'MRI 검사 전 금속물 확인',
    items: [
      { zh: 'MRI检查使用强磁场，体内或身上的金属物可能影响检查安全。', ko: 'MRI 검사는 강한 자기장을 사용하므로 몸 안이나 몸에 있는 금속물이 검사 안전에 영향을 줄 수 있습니다.' },
      { zh: '如有心脏起搏器、人工耳蜗、金属支架、人工关节、金属夹、金属碎片、植入物等，请务必提前告知。', ko: '심박동기, 인공와우, 금속 스텐트, 인공관절, 금속 클립, 금속 파편, 삽입물 등이 있다면 반드시 미리 알려주세요.' },
      { zh: '如曾做过手术，也请提前告知手术部位和手术时间。', ko: '과거 수술을 받은 적이 있다면 수술 부위와 시기도 미리 알려주세요.' },
      { zh: '检查当天请不要佩戴金属饰品。', ko: '검사 당일에는 금속 액세서리를 착용하지 마세요.' },
    ],
  },
  {
    titleZh: '3. CT造影剂确认',
    titleKo: 'CT 조영제 확인',
    items: [
      { zh: '部分CT检查可能需要使用造影剂。', ko: '일부 CT 검사는 조영제를 사용할 수 있습니다.' },
      { zh: '如过去使用造影剂后出现过过敏、皮疹、呼吸困难、恶心、头晕等反应，请提前告知。', ko: '과거 조영제 사용 후 알레르기, 발진, 호흡곤란, 메스꺼움, 어지럼 등의 반응이 있었다면 미리 알려주세요.' },
      { zh: '如有肾脏疾病、肾功能异常、严重过敏史，也请提前告知。', ko: '신장질환, 신장기능 이상, 심한 알레르기 병력이 있다면 미리 알려주세요.' },
      { zh: '是否可以使用造影剂需由医院判断。', ko: '조영제 사용 가능 여부는 병원의 판단에 따라 결정됩니다.' },
    ],
  },
  {
    titleZh: '4. 糖尿病药和肾功能',
    titleKo: '당뇨약과 신장기능',
    items: [
      { zh: '如正在服用糖尿病药，尤其是二甲双胍类药物，请提前告知。', ko: '당뇨약, 특히 메트포르민 계열 약물을 복용 중이라면 미리 알려주세요.' },
      { zh: '如有肾功能异常或正在接受肾脏相关治疗，请提前告知。', ko: '신장기능 이상이 있거나 신장 관련 치료를 받고 있다면 미리 알려주세요.' },
      { zh: '是否需要暂停或调整药物，请由医院判断。', ko: '약 중단 또는 복용 조정 여부는 병원의 판단에 따라야 합니다.' },
      { zh: '不要自行停药或调整服药时间。', ko: '임의로 약을 중단하거나 복용 시간을 조정하지 마세요.' },
    ],
  },
  {
    titleZh: '5. 怀孕可能性确认',
    titleKo: '임신 가능성 확인',
    items: [
      { zh: '如果您可能怀孕、正在备孕或哺乳，请务必提前告知。', ko: '임신 가능성, 임신 준비 중, 수유 중인 경우 반드시 미리 알려주세요.' },
      { zh: '部分检查可能需要调整时间或检查方式。', ko: '일부 검사는 일정이나 검사 방식 조정이 필요할 수 있습니다.' },
      { zh: '不确定是否怀孕时，请提前咨询医院或顾问。', ko: '임신 여부가 확실하지 않다면 병원 또는 상담원에게 미리 확인해주세요.' },
    ],
  },
  {
    titleZh: '6. 幽闭恐惧或检查紧张',
    titleKo: '폐쇄공포증 또는 검사 불안',
    items: [
      { zh: 'MRI检查时需要在较封闭的空间内保持不动。', ko: 'MRI 검사는 비교적 좁은 공간 안에서 움직이지 않고 있어야 합니다.' },
      { zh: '如果您有幽闭恐惧、严重焦虑或很难长时间保持不动，请提前告知。', ko: '폐쇄공포증, 심한 불안, 장시간 가만히 있기 어려운 경우 미리 알려주세요.' },
      { zh: '医院可能会根据情况提供其他安排或说明。', ko: '병원에서 상황에 따라 별도 안내나 조정을 할 수 있습니다.' },
    ],
  },
  {
    titleZh: '7. 检查当天服装和随身物品',
    titleKo: '검사 당일 복장과 소지품',
    items: [
      { zh: '请尽量穿着没有金属装饰的舒适衣服。', ko: '금속 장식이 없는 편한 옷을 입는 것이 좋습니다.' },
      { zh: '检查前可能需要取下项链、耳环、手表、发夹、眼镜、假牙、助听器等。', ko: '검사 전 목걸이, 귀걸이, 시계, 머리핀, 안경, 틀니, 보청기 등을 제거해야 할 수 있습니다.' },
      { zh: '手机、银行卡、交通卡等磁性物品不要带入MRI检查室。', ko: '휴대폰, 은행카드, 교통카드 등 자기장에 영향을 받을 수 있는 물건은 MRI 검사실에 가져가지 마세요.' },
      { zh: '贵重物品请尽量不要携带。', ko: '귀중품은 가능한 가져오지 않는 것이 좋습니다.' },
    ],
  },
  {
    titleZh: '8. 检查当天准备物品',
    titleKo: '검사 당일 준비물',
    items: [
      { zh: '护照', ko: '여권' },
      { zh: '预约信息', ko: '예약 정보' },
      { zh: '近期检查报告，如有', ko: '최근 검사결과지, 있는 경우' },
      { zh: '过去影像资料或影像报告，如有', ko: '과거 영상자료 또는 영상 판독지, 있는 경우' },
      { zh: '正在服用的药物名称或药盒照片', ko: '복용 중인 약 이름 또는 약 사진' },
      { zh: '过敏史或手术史相关资料，如有', ko: '알레르기 또는 수술 이력 관련 자료, 있는 경우' },
    ],
  },
  {
    titleZh: '9. 需要提前告知顾问的情况',
    titleKo: '상담원에게 미리 알려야 할 사항',
    items: [
      { zh: '过去做过手术', ko: '과거 수술 이력' },
      { zh: '体内有金属或植入物', ko: '몸 안의 금속물 또는 삽입물' },
      { zh: '有造影剂过敏史', ko: '조영제 알레르기 병력' },
      { zh: '有严重过敏史', ko: '심한 알레르기 병력' },
      { zh: '有肾脏疾病或肾功能异常', ko: '신장질환 또는 신장기능 이상' },
      { zh: '正在服用糖尿病药、抗凝药、阿司匹林等', ko: '당뇨약, 항응고제, 아스피린 등 복용 여부' },
      { zh: '可能怀孕、正在备孕或哺乳', ko: '임신 가능성, 임신 준비 중, 수유 중' },
      { zh: '有幽闭恐惧或检查时容易紧张', ko: '폐쇄공포증 또는 검사 불안' },
      { zh: '无法长时间平躺或保持不动', ko: '장시간 누워 있거나 움직이지 않는 것이 어려운 경우' },
    ],
  },
]

export default function PrepImagingBeforePage() {
  return (
    <div className="prep-page">
      <div className="prep-container">
        <header className="prep-header">
          <p className="prep-title-zh">CT/MRI检查前确认表</p>
          <p className="prep-title-ko">CT/MRI 검사 전 확인표</p>
          <p className="prep-desc-zh">
            为了安全、顺利地进行CT或MRI检查，请在来院前确认以下事项。
            不同检查项目、是否使用造影剂、以及个人身体情况不同，准备方式可能会有所不同。如医院另有说明，请以医院说明为准。
          </p>
          <p className="prep-desc-ko">
            CT 또는 MRI 검사를 안전하고 원활하게 진행하기 위해 내원 전 아래 사항을 확인해주세요.
            검사 종류, 조영제 사용 여부, 개인 건강 상태에 따라 준비 방법이 달라질 수 있습니다. 병원에서 별도 안내한 내용이 있다면 병원 안내를 우선해주세요.
          </p>
        </header>

        <div className="prep-priority-notice">
          <p className="prep-priority-notice-title-zh">医院说明优先</p>
          <p className="prep-priority-notice-title-ko">병원 안내 우선</p>
          <p className="prep-priority-notice-zh">
            不同医院、不同检查项目的准备方式可能不同。
            如医院或顾问已单独说明，请优先按照该说明准备。
          </p>
          <p className="prep-priority-notice-ko">
            병원과 검사 항목에 따라 준비 방법이 달라질 수 있습니다.
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
            以上内容仅为CT/MRI检查前准备参考，具体检查方式、造影剂使用、禁食时间、服药调整及注意事项需以医院最终说明为准。
            汉江春天不是医疗机构，不进行诊断或治疗判断。
          </p>
          <p className="prep-notice-ko">
            위 내용은 CT/MRI 검사 전 준비를 위한 참고 안내이며, 실제 검사 방식, 조영제 사용 여부, 금식 시간, 약 복용 조정 및 주의사항은 병원의 최종 안내를 기준으로 합니다.
            한강애봄은 의료기관이 아니며, 진단이나 치료 판단을 하지 않습니다.
          </p>
        </div>

        <div className="prep-actions">
          <a className="prep-btn-secondary" href="/prep/health-checkup-before">
            <span className="btn-text-zh">查看健康检查前准备事项</span>
            <span className="btn-text-ko">건강검진 전 준비사항 보기</span>
          </a>
          <a className="prep-btn-secondary" href="/prep/blood-test-before">
            <span className="btn-text-zh">查看血液检查前注意事项</span>
            <span className="btn-text-ko">혈액검사 전 안내 보기</span>
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
