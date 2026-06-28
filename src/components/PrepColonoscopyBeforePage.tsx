import './PrepColonoscopyBeforePage.css'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

interface BilingualLine {
  zh: string
  ko: string
}

function bi(line: BilingualLine): string {
  return `${line.zh} / ${line.ko}`
}

interface PrepSection {
  title: BilingualLine
  items: BilingualLine[]
}

const SECTIONS: PrepSection[] = [
  {
    title: { zh: '1. 检查前几天的饮食调整', ko: '검사 며칠 전 식단 조절' },
    items: [
      { zh: '请按照医院说明，从检查前几天开始低纤维饮食或饮食调整。', ko: '병원 안내에 따라 검사 며칠 전부터 저섬유식 또는 식단 조절을 시작해주세요.' },
      { zh: '避免带籽水果、杂粮、坚果、芝麻、海藻类、蘑菇类、纤维较多的蔬菜。', ko: '씨 있는 과일, 잡곡, 견과류, 깨, 해조류, 버섯류, 섬유질이 많은 채소는 피해주세요.' },
      { zh: '检查前一天通常需要改为清淡或流质饮食。', ko: '검사 전날에는 보통 자극적이지 않은 음식이나 유동식으로 바꿔야 합니다.' },
    ],
  },
  {
    title: { zh: '2. 肠道清洁剂（泻药）服用方法', ko: '장정결제(설사약) 복용 방법' },
    items: [
      { zh: '肠道清洁剂的种类和服用时间请按照医院说明进行。', ko: '장정결제의 종류와 복용 시간은 병원 안내에 따라주세요.' },
      { zh: '请按照指示的时间和分量饮用，不要随意减少或增加。', ko: '안내된 시간과 양에 맞춰 복용해주시고, 임의로 줄이거나 늘리지 마세요.' },
      { zh: '服用后可能会多次排便，请提前安排好时间和如厕环境。', ko: '복용 후 배변이 여러 차례 있을 수 있으니 시간과 화장실 환경을 미리 준비해주세요.' },
    ],
  },
  {
    title: { zh: '3. 检查前禁食和饮水', ko: '검사 전 금식 및 물 섭취' },
    items: [
      { zh: '检查前通常需要禁食，具体时间请按照医院说明。', ko: '검사 전에는 보통 금식이 필요하며, 정확한 시간은 병원 안내를 따라주세요.' },
      { zh: '肠道清洁过程中可以少量饮用清水，但请避免有颜色或含渣的饮料。', ko: '장정결 과정 중에는 소량의 생수는 가능할 수 있으나, 색이 있거나 건더기가 있는 음료는 피해주세요.' },
      { zh: '是否可以喝水及饮水量请遵循医院的具体安排。', ko: '물 섭취 가능 여부와 양은 병원의 구체적인 안내를 따라주세요.' },
    ],
  },
  {
    title: { zh: '4. 正在服用的药物', ko: '복용 중인 약' },
    items: [
      { zh: '如正在服用抗凝药、阿司匹林、糖尿病药、铁剂等，请提前告知。', ko: '항응고제, 아스피린, 당뇨약, 철분제 등을 복용 중이라면 미리 알려주세요.' },
      { zh: '不要自行停药或调整服药时间。', ko: '임의로 약을 중단하거나 복용 시간을 조정하지 마세요.' },
      { zh: '是否需要停药或调整服药时间，请由医院判断。', ko: '약 중단 또는 복용 시간 조정 여부는 병원의 판단에 따라야 합니다.' },
    ],
  },
  {
    title: { zh: '5. 镇静（睡眠）内镜确认', ko: '진정(수면) 내시경 확인' },
    items: [
      { zh: '如果选择镇静（睡眠）内镜，检查当天可能无法自行驾车或操作交通工具。', ko: '진정(수면) 내시경을 선택하신 경우, 검사 당일 직접 운전이나 교통수단 이용이 어려울 수 있습니다.' },
      { zh: '建议安排可以陪同或接送的人员。', ko: '동행하거나 데리러 올 수 있는 분을 미리 준비해두시는 것이 좋습니다.' },
      { zh: '镇静方式和注意事项请以医院说明为准。', ko: '진정 방식과 주의사항은 병원 안내를 기준으로 합니다.' },
    ],
  },
  {
    title: { zh: '6. 女性顾客注意事项', ko: '여성 고객 주의사항' },
    items: [
      { zh: '如正在月经期间、可能怀孕、正在备孕或哺乳，请提前告知。', ko: '생리 중, 임신 가능성, 임신 준비 중, 수유 중인 경우 미리 알려주세요.' },
      { zh: '部分情况可能需要调整检查时间或方式。', ko: '상황에 따라 검사 일정이나 방식 조정이 필요할 수 있습니다.' },
    ],
  },
  {
    title: { zh: '7. 检查当天准备物品', ko: '검사 당일 준비물' },
    items: [
      { zh: '护照', ko: '여권' },
      { zh: '预约信息', ko: '예약 정보' },
      { zh: '正在服用的药物名称或药盒照片', ko: '복용 중인 약 이름 또는 약 사진' },
      { zh: '舒适、容易穿脱的衣物', ko: '입고 벗기 편한 옷' },
      { zh: '如选择镇静内镜，请准备陪同人员的联系方式', ko: '진정 내시경을 선택한 경우 동행자 연락처 준비' },
    ],
  },
  {
    title: { zh: '8. 需要提前告知顾问的情况', ko: '상담원에게 미리 알려야 할 사항' },
    items: [
      { zh: '过去做过肠道或腹部手术', ko: '과거 장 또는 복부 수술 이력' },
      { zh: '有肠道疾病（如炎症性肠病、肠梗阻史等）', ko: '장 질환(염증성 장질환, 장폐색 이력 등)' },
      { zh: '正在服用抗凝药、阿司匹林、糖尿病药等', ko: '항응고제, 아스피린, 당뇨약 등 복용 여부' },
      { zh: '可能怀孕、正在备孕或哺乳', ko: '임신 가능성, 임신 준비 중, 수유 중' },
      { zh: '对镁、麻醉药或镇静剂有过敏或不良反应史', ko: '마그네슘, 마취제, 진정제에 대한 알레르기나 이상반응 이력' },
      { zh: '心脏疾病或严重慢性疾病', ko: '심장질환 또는 심한 만성질환' },
    ],
  },
]

export default function PrepColonoscopyBeforePage() {
  return (
    <div className="prep-page">
      <div className="prep-container">
        <header className="prep-header">
          <p className="prep-title-bi">{bi({ zh: '肠镜检查前准备事项', ko: '대장내시경 검사 전 준비사항' })}</p>
          <p className="prep-desc-bi">
            {bi({
              zh: '为了让肠镜检查顺利进行，并确保检查结果的准确性，请在检查前确认以下事项。',
              ko: '대장내시경 검사가 원활하게 진행되고 정확한 결과를 얻을 수 있도록 검사 전 아래 사항을 확인해주세요.',
            })}
          </p>
          <p className="prep-desc-bi">
            {bi({
              zh: '肠道清洁剂的种类、服用时间和饮食调整可能因医院而不同，如医院另有说明，请以医院说明为准。',
              ko: '장정결제 종류, 복용 시간, 식단 조절 방법은 병원에 따라 다를 수 있으며, 병원에서 별도 안내한 내용이 있다면 병원 안내를 우선해주세요.',
            })}
          </p>
        </header>

        <div className="prep-priority-notice">
          <p className="prep-priority-notice-title-bi">{bi({ zh: '医院说明优先', ko: '병원 안내 우선' })}</p>
          <p className="prep-priority-notice-bi">
            {bi({
              zh: '不同医院使用的肠道清洁剂和准备方式可能不同。如医院或顾问已单独说明，请优先按照该说明准备。',
              ko: '병원에서 사용하는 장정결제와 준비 방법이 다를 수 있습니다. 병원 또는 상담원이 별도로 안내한 내용이 있다면 그 안내를 우선해주세요.',
            })}
          </p>
        </div>

        {SECTIONS.map((section) => (
          <div className="prep-section" key={section.title.zh}>
            <p className="prep-section-title-bi">{bi(section.title)}</p>
            {section.items.map((item) => (
              <div className="prep-item" key={item.zh}>
                <span className="prep-item-dot">·</span>
                <p className="prep-item-bi">{bi(item)}</p>
              </div>
            ))}
          </div>
        ))}

        <div className="prep-notice">
          <p className="prep-notice-bi">
            {bi({
              zh: '以上内容仅为肠镜检查前准备参考，具体饮食调整、肠道清洁剂服用方法、禁食时间及注意事项需以医院最终说明为准。',
              ko: '위 내용은 대장내시경 검사 전 준비를 위한 참고 안내이며, 실제 식단 조절, 장정결제 복용 방법, 금식 시간 및 주의사항은 병원의 최종 안내를 기준으로 합니다.',
            })}
          </p>
          <p className="prep-notice-bi">
            {bi({ zh: '汉江春天不是医疗机构，不进行诊断或治疗判断。', ko: '한강애봄은 의료기관이 아니며, 진단이나 치료 판단을 하지 않습니다.' })}
          </p>
        </div>

        <div className="prep-actions">
          <a className="prep-btn-secondary" href="/prep/health-checkup-before">
            <span className="btn-text-zh">查看健康检查前准备事项</span>
            <span className="btn-text-ko">건강검진 전 준비사항 보기</span>
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
