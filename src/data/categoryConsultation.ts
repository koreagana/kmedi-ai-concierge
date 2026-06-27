import type { CategoryId } from './categories'

export interface CategoryQ { label: string; q: string; opts: string[] }

export interface CategoryCardLang {
  title: string
  copyHeader: string
  questions: CategoryQ[]
  result: string
}

export interface CategoryCard {
  zh: CategoryCardLang
  ko: CategoryCardLang
  en: CategoryCardLang
  ar: CategoryCardLang
}

const SAFETY = {
  zh: '最终的检查、诊疗和治疗方向，需要由韩国医疗机构和专业医生确认。汉江春天并非医疗机构，而是协助您整理咨询需求、对接医院、安排翻译、陪同与行程的咨询顾问服务。',
  ko: '최종 검사, 진료, 치료 방향은 한국 의료기관과 전문의 상담 후 결정됩니다. 한강애봄은 의료기관이 아니라 의료상담 정리, 병원 연결, 통역, 동행, 일정 조율을 돕는 컨시어지 서비스입니다.',
  en: 'The final examination, diagnosis, and treatment direction will be determined by a licensed Korean medical institution and specialist physician after consultation. Hangangaeborn is not a medical institution — it is a concierge service that helps organize your consultation needs, connect you with hospitals, and arrange interpretation, escort, and scheduling support.',
  ar: 'يتم تحديد الفحص والتشخيص والعلاج النهائي من قبل مؤسسة طبية كورية مرخصة وطبيب مختص بعد الاستشارة. هانغانغايبورن ليست مؤسسة طبية، بل خدمة كونسيرج تساعد في تنظيم احتياجات الاستشارة والتواصل مع المستشفيات وترتيب الترجمة والمرافقة والجدولة.',
}

const END = {
  zh: '请点击下方按钮，通过企业微信联系顾问。',
  ko: '아래 버튼을 눌러 컨시어지에게 상담 내용을 보내주세요.',
  en: 'Click the button below to connect with a concierge.',
  ar: 'اضغط على الزر أدناه للتواصل مع الكونسيرج.',
}

function buildResult(body: { zh: string; ko: string; en: string; ar: string }) {
  return {
    zh: `${body.zh}\n\n${SAFETY.zh}\n\n${END.zh}`,
    ko: `${body.ko}\n\n${SAFETY.ko}\n\n${END.ko}`,
    en: `${body.en}\n\n${SAFETY.en}\n\n${END.en}`,
    ar: `${body.ar}\n\n${SAFETY.ar}\n\n${END.ar}`,
  }
}

const R_BIG_HEALTH = buildResult({
  zh: '根据您的选择，您适合先从大健康咨询开始。汉江春天可以先帮您整理目前最关心的问题、既往病史、家族病史、服用药物和来韩停留时间，再根据情况连接韩国健康检查、功能医学、代谢管理、睡眠疲劳管理或抗衰老相关咨询方向。',
  ko: '선택하신 내용을 보면, 먼저 대건강 상담부터 시작하시는 것이 적합합니다. 한강애봄은 먼저 현재 가장 신경 쓰이는 문제, 기존 병력, 가족력, 복용 중인 약, 방한 기간을 정리해 드리고, 이를 바탕으로 한국의 건강검진, 기능의학, 대사 관리, 수면·피로 관리 또는 항노화 관련 상담 방향으로 연결해 드립니다.',
  en: 'Based on your selections, starting with a Comprehensive Health consultation suits you well. Hangangaeborn will first help organize your main concerns, medical history, family history, current medications, and length of stay in Korea, then connect you with relevant Korean directions such as health checkups, functional medicine, metabolic management, sleep/fatigue management, or anti-aging consultation.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء باستشارة الصحة الشاملة. سيساعدك هانغانغايبورن أولاً في تنظيم أهم مشاكلك الحالية وتاريخك المرضي وتاريخك العائلي والأدوية التي تتناولها ومدة إقامتك في كوريا، ثم ربطك بالاتجاهات الكورية المناسبة مثل الفحص الصحي أو الطب الوظيفي أو إدارة التمثيل الغذائي أو إدارة النوم والتعب أو استشارة مكافحة الشيخوخة.',
})

const R_STEM_CELL = buildResult({
  zh: '根据您的选择，您适合先进行再生医学方向的资料整理和合法合规咨询。汉江春天不会判断您是否适合某项治疗，也不会承诺效果。我们可以先帮您整理既往资料、影像检查、手术或治疗经历，并说明韩国可咨询的合规范围，再连接相应医疗机构，由专业医生判断是否需要进一步面诊或检查。',
  ko: '선택하신 내용을 보면, 먼저 재생의학 분야의 자료 정리와 합법·합규 상담부터 시작하시는 것이 적합합니다. 한강애봄은 특정 시술이 적합한지 판단하지 않으며 효과를 보장하지 않습니다. 먼저 기존 자료, 영상 검사, 수술 또는 치료 경험을 정리하고 한국에서 상담 가능한 합법적 범위를 안내한 뒤, 관련 의료기관과 연결하여 전문의가 추가 면진이나 검사가 필요한지 판단하도록 도와드립니다.',
  en: 'Based on your selections, starting with document organization and a legal-compliance consultation in regenerative medicine suits you well. Hangangaeborn does not determine whether a specific treatment suits you, nor guarantee results. We will first help organize your existing records, imaging, and surgical or treatment history, explain the legally consultable scope in Korea, and then connect you with the relevant medical institution, where a specialist physician will determine whether further in-person evaluation or testing is needed.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء بتنظيم المستندات والاستشارة القانونية في مجال الطب التجديدي. لا يحدد هانغانغايبورن مدى ملاءمة علاج معين لك ولا يضمن النتائج. سنساعدك أولاً في تنظيم سجلاتك السابقة وفحوصات التصوير وتاريخك الجراحي أو العلاجي، ونوضح لك النطاق القانوني القابل للاستشارة في كوريا، ثم نربطك بالمؤسسة الطبية المناسبة ليحدد الطبيب المختص ما إذا كان التقييم أو الفحص الإضافي ضرورياً.',
})

const R_SKIN_BEAUTY = buildResult({
  zh: '根据您的选择，您适合先从皮肤医美咨询开始。汉江春天可以先帮您整理皮肤松弛、毛孔、色斑、肤质、眼周或脸部线条等关注点，并结合您能接受的恢复期、来韩时间和预算方向，整理适合咨询的韩国皮肤科方向。',
  ko: '선택하신 내용을 보면, 먼저 피부의료미용 상담부터 시작하시는 것이 적합합니다. 한강애봄은 먼저 탄력, 모공, 색소, 피부질, 눈가 또는 얼굴 라인 등 신경 쓰이는 부분을 정리하고, 감수 가능한 회복기간과 방한 일정, 예산 방향을 함께 고려하여 상담하기 적합한 한국 피부과 방향을 정리해 드립니다.',
  en: 'Based on your selections, starting with a Skin Aesthetics consultation suits you well. Hangangaeborn will first help organize your concerns — such as sagging, pores, pigmentation, texture, the eye area, or facial lines — and combine this with your acceptable downtime, visit timing, and budget direction to identify a suitable Korean dermatology direction for consultation.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء باستشارة التجميل الجلدي. سيساعدك هانغانغايبورن أولاً في تنظيم مخاوفك مثل الترهل أو المسام أو التصبغ أو ملمس البشرة أو منطقة العين أو خطوط الوجه، مع مراعاة فترة التعافي المقبولة وموعد زيارتك واتجاه الميزانية، لتحديد اتجاه قسم الجلدية الكوري المناسب للاستشارة.',
})

const R_PLASTIC_SURGERY = buildResult({
  zh: '根据您的选择，您适合先进行整形医美方向的初步咨询整理。汉江春天可以帮您整理关注部位、审美方向、恢复期、既往经历和来韩时间，并协助连接合适的韩国医疗机构。我们不会代替医生判断是否需要手术，也不会承诺效果。',
  ko: '선택하신 내용을 보면, 먼저 성형의료미용 방향의 초기 상담 정리부터 시작하시는 것이 적합합니다. 한강애봄은 관심 부위, 원하는 스타일 방향, 회복기간, 이전 경험과 방한 일정을 정리해 드리고, 적합한 한국 의료기관과 연결되도록 도와드립니다. 수술 필요 여부를 대신 판단하지 않으며 효과를 보장하지 않습니다.',
  en: "Based on your selections, starting with an initial consultation summary for Plastic Surgery suits you well. Hangangaeborn will help organize your area of interest, desired style, downtime, past experience, and visit timing, and help connect you with a suitable Korean medical institution. We do not determine on a doctor's behalf whether surgery is needed, nor guarantee results.",
  ar: 'بناءً على اختياراتك، يُنصح بالبدء بتنظيم استشارة أولية في مجال الجراحة التجميلية. سيساعدك هانغانغايبورن في تنظيم المنطقة المهمة لك والأسلوب المطلوب وفترة التعافي وخبراتك السابقة وموعد زيارتك، والمساعدة في ربطك بمؤسسة طبية كورية مناسبة. لا نحدد بدلاً من الطبيب ما إذا كانت الجراحة ضرورية، ولا نضمن النتائج.',
})

const R_WOMENS_CARE = buildResult({
  zh: '根据您的选择，您适合先进行女性健康方向的私密咨询整理。汉江春天可以先帮您整理关注问题、年龄阶段、既往检查结果和来韩安排，再连接韩国女性医疗相关机构。',
  ko: '선택하신 내용을 보면, 먼저 여성건강 분야의 은밀한 상담 정리부터 시작하시는 것이 적합합니다. 한강애봄은 먼저 관심 문제, 연령대, 기존 검진 결과, 방한 일정을 정리해 드리고, 한국의 여성 의료 관련 기관과 연결해 드립니다.',
  en: "Based on your selections, starting with a private Women's Health consultation summary suits you well. Hangangaeborn will first help organize your concerns, life stage, past checkup results, and Korea visit plans, then connect you with relevant Korean women's health institutions.",
  ar: 'بناءً على اختياراتك، يُنصح بالبدء بتنظيم استشارة خاصة في مجال صحة المرأة. سيساعدك هانغانغايبورن أولاً في تنظيم مخاوفك ومرحلتك العمرية ونتائج فحوصاتك السابقة وخطط زيارتك لكوريا، ثم ربطك بالمؤسسات الكورية المتخصصة في صحة المرأة.',
})

const R_MENS_HEALTH = buildResult({
  zh: '根据您的选择，您适合先进行男性健康方向的咨询整理。汉江春天可以协助整理体力、睡眠、脱发、泌尿前列腺、代谢或男性健康检查相关问题，并根据您的来韩时间和隐私需求安排中文沟通。',
  ko: '선택하신 내용을 보면, 먼저 남성건강 분야의 상담 정리부터 시작하시는 것이 적합합니다. 한강애봄은 체력, 수면, 탈모, 비뇨기·전립선, 대사 또는 남성 건강검진 관련 문제를 정리해 드리고, 방한 일정과 사생활 보호 요구에 맞춰 중국어 소통을 안배해 드립니다.',
  en: "Based on your selections, starting with a Men's Health consultation summary suits you well. Hangangaeborn can help organize concerns related to energy, sleep, hair loss, urology/prostate, metabolism, or men's health checkups, and arrange Chinese-language communication based on your visit timing and privacy needs.",
  ar: 'بناءً على اختياراتك، يُنصح بالبدء بتنظيم استشارة في مجال صحة الرجل. يمكن لهانغانغايبورن مساعدتك في تنظيم المخاوف المتعلقة بالطاقة والنوم وتساقط الشعر والمسالك البولية والبروستاتا والتمثيل الغذائي أو فحص صحة الرجل، وترتيب التواصل باللغة الصينية بناءً على موعد زيارتك واحتياجات الخصوصية.',
})

const R_MEDICAL_TOURISM = buildResult({
  zh: '根据您的选择，您适合先进行赴韩医疗旅游行程咨询。汉江春天可以根据人数、停留时间、医疗项目、翻译陪同范围、车辆需求和住宿动线，先整理一个初步行程方向。最终费用会根据人数、项目、车辆、陪同范围、医院预约和汇率等因素调整。',
  ko: '선택하신 내용을 보면, 먼저 방한 의료관광 일정 상담부터 시작하시는 것이 적합합니다. 한강애봄은 인원, 체류 기간, 의료 항목, 통역·동행 범위, 차량 필요 여부와 숙소 동선을 바탕으로 초기 일정 방향을 정리해 드립니다. 최종 비용은 인원, 항목, 차량, 동행 범위, 병원 예약, 환율 등 여러 요인에 따라 조정됩니다.',
  en: 'Based on your selections, starting with a Korea medical travel itinerary consultation suits you well. Hangangaeborn will organize an initial itinerary direction based on the number of travelers, length of stay, medical procedures, scope of interpretation and escort, vehicle needs, and accommodation routing. Final costs will be adjusted based on factors such as number of travelers, procedures, vehicle use, escort scope, hospital bookings, and exchange rates.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء باستشارة برنامج السفر الطبي إلى كوريا. سيقوم هانغانغايبورن بتنظيم اتجاه برنامج أولي بناءً على عدد المسافرين ومدة الإقامة والإجراءات الطبية ونطاق الترجمة والمرافقة واحتياجات السيارة ومسار الإقامة. سيتم تعديل التكلفة النهائية بناءً على عوامل مثل عدد المسافرين والإجراءات واستخدام السيارة ونطاق المرافقة وحجوزات المستشفى وأسعار الصرف.',
})

const R_CUSTOM_PLAN = buildResult({
  zh: '根据您的选择，您适合先进行定制医疗观光方案整理。汉江春天可以根据服务对象、同行人数、停留时间、医疗咨询方向、旅行偏好和预算方向，先整理一版初步方案。具体预约、费用和医疗安排需要根据医疗机构确认结果、车辆和陪同范围进一步调整。',
  ko: '선택하신 내용을 보면, 먼저 맞춤형 의료관광 방안 정리부터 시작하시는 것이 적합합니다. 한강애봄은 대상, 동행 인원, 체류 기간, 의료 상담 방향, 여행 선호와 예산 방향을 바탕으로 초기 방안을 정리해 드립니다. 구체적인 예약, 비용, 의료 안배는 의료기관의 확인 결과와 차량·동행 범위에 따라 추가로 조정됩니다.',
  en: 'Based on your selections, starting with a custom medical travel plan summary suits you well. Hangangaeborn will organize an initial plan based on who it\'s for, number of travelers, length of stay, medical consultation direction, travel preferences, and budget direction. Specific bookings, costs, and medical arrangements will be further adjusted based on confirmation from the medical institution, vehicle use, and escort scope.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء بتنظيم خطة سفر طبي مخصصة. سيقوم هانغانغايبورن بتنظيم خطة أولية بناءً على المستفيد وعدد المسافرين ومدة الإقامة واتجاه الاستشارة الطبية وتفضيلات السفر واتجاه الميزانية. سيتم تعديل الحجوزات والتكاليف والترتيبات الطبية المحددة بناءً على تأكيد المؤسسة الطبية واستخدام السيارة ونطاق المرافقة.',
})

export const CATEGORY_CARDS: Partial<Record<CategoryId, CategoryCard>> = {
  'big-health': {
    zh: {
      title: '生成我的大健康咨询卡',
      copyHeader: '【大健康咨询卡】',
      questions: [
        { label: '身体问题', q: '您目前最想了解的身体问题是什么？', opts: ['经常疲劳', '睡眠质量不好', '体重血糖血脂变化', '代谢变慢', '功能医学', '精密体检', '长期健康风险'] },
        { label: '身体信号', q: '您最近最明显的身体信号是？', opts: ['容易累', '睡不深或早醒', '体重增加或下降', '胃肠状态不好', '免疫力下降', '肌肉量减少', '无明显症状只想系统检查'] },
        { label: '相关情况', q: '您是否有以下情况？', opts: ['家族病史', '慢性病或长期服药', '检查异常', '长期压力', '饮食作息不规律', '更年期或激素变化', '不确定'] },
        { label: '咨询类型', q: '您希望重点了解哪一类咨询？', opts: ['健康检查', '功能医学', '抗衰老评估', '营养生活方式管理', '睡眠压力管理', '代谢体重管理', '检查结果说明'] },
        { label: '停留时间', q: '您计划在韩国停留多久？', opts: ['1天以内', '2-3天', '3晚4天', '5天以上', '未确定', '先线上咨询'] },
        { label: '担心问题', q: '您最担心什么？', opts: ['不知道做哪些检查', '结果看不懂', '怕检查太多没重点', '费用超预期', '时间不够', '语言沟通', '想先知道是否适合'] },
        { label: '希望整理', q: '您希望汉江春天先帮您整理什么？', opts: ['适合的检查方向', '功能医学方向', '来韩体检时间安排', '需准备资料', '结果说明流程', '中文顾问沟通', '预约可行性'] },
      ],
      result: R_BIG_HEALTH.zh,
    },
    ko: {
      title: '나의 대건강 상담카드 만들기',
      copyHeader: '【대건강 상담카드】',
      questions: [
        { label: '건강 고민', q: '지금 가장 알고 싶은 신체 문제는 무엇인가요?', opts: ['자주 피곤함', '수면 질 저하', '체중·혈당·혈중지질 변화', '대사 저하', '기능의학', '정밀 건강검진', '장기적 건강 위험'] },
        { label: '몸의 신호', q: '최근 가장 뚜렷하게 느껴지는 몸의 신호는?', opts: ['쉽게 피곤함', '깊이 못 자거나 일찍 깸', '체중 증가 또는 감소', '소화기 상태 저하', '면역력 저하', '근육량 감소', '특별한 증상 없이 검진만 원함'] },
        { label: '관련 상황', q: '다음 중 해당되는 상황이 있나요?', opts: ['가족력', '만성질환 또는 장기 복약', '검사 이상', '장기적 스트레스', '불규칙한 식사·생활습관', '갱년기 또는 호르몬 변화', '잘 모르겠음'] },
        { label: '상담 유형', q: '어떤 상담을 중점적으로 알고 싶나요?', opts: ['건강검진', '기능의학', '항노화 평가', '영양·생활습관 관리', '수면·스트레스 관리', '대사·체중 관리', '검진 결과 설명'] },
        { label: '체류 기간', q: '한국에 얼마나 머무를 계획인가요?', opts: ['1일 이내', '2-3일', '3박 4일', '5일 이상', '미정', '먼저 온라인 상담'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['어떤 검사를 해야 할지 모름', '결과를 이해하기 어려움', '검사가 너무 많아 핵심을 놓칠까 봐', '비용이 예상보다 클까 봐', '시간이 부족할까 봐', '언어 소통', '나에게 맞는지 먼저 알고 싶음'] },
        { label: '먼저 원하는 정리', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['적합한 검사 방향', '기능의학 방향', '방한 검진 일정', '준비할 자료', '결과 설명 절차', '중국어 상담사 소통', '예약 가능 여부'] },
      ],
      result: R_BIG_HEALTH.ko,
    },
    en: {
      title: 'Build My Comprehensive Health Consultation Profile',
      copyHeader: '[Comprehensive Health Consultation Card]',
      questions: [
        { label: 'Health concern', q: 'What body issue would you most like to understand right now?', opts: ['Frequent fatigue', 'Poor sleep quality', 'Changes in weight, blood sugar, or lipids', 'Slowing metabolism', 'Functional medicine', 'Comprehensive checkup', 'Long-term health risks'] },
        { label: 'Recent signal', q: "What's the most noticeable signal from your body recently?", opts: ['Getting tired easily', 'Light sleep or early waking', 'Weight gain or loss', 'Poor digestive condition', 'Lowered immunity', 'Muscle mass loss', 'No clear symptoms, just want a systematic checkup'] },
        { label: 'Relevant history', q: 'Do any of the following apply to you?', opts: ['Family medical history', 'Chronic illness or long-term medication', 'Abnormal test results', 'Chronic stress', 'Irregular diet or routine', 'Menopause or hormonal changes', 'Not sure'] },
        { label: 'Consultation focus', q: 'Which type of consultation would you like to focus on?', opts: ['Health checkup', 'Functional medicine', 'Anti-aging assessment', 'Nutrition & lifestyle management', 'Sleep & stress management', 'Metabolism & weight management', 'Test results explanation'] },
        { label: 'Stay duration', q: 'How long do you plan to stay in Korea?', opts: ['Within 1 day', '2-3 days', '3 nights 4 days', '5+ days', 'Not decided', 'Online consultation first'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Not knowing which tests to take', 'Not understanding the results', 'Too many tests without focus', 'Costs exceeding expectations', 'Not enough time', 'Language communication', 'Wanting to know suitability first'] },
        { label: 'First priority', q: 'What would you like Hangangaeborn to help organize first?', opts: ['Suitable test direction', 'Functional medicine direction', 'Korea checkup scheduling', 'Documents to prepare', 'Results explanation process', 'Chinese-speaking concierge contact', 'Booking feasibility'] },
      ],
      result: R_BIG_HEALTH.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الصحة الشاملة',
      copyHeader: '[بطاقة استشارة الصحة الشاملة]',
      questions: [
        { label: 'القلق الصحي', q: 'ما المشكلة الجسدية التي تريد فهمها أكثر الآن؟', opts: ['التعب المتكرر', 'ضعف جودة النوم', 'تغيرات الوزن أو السكر أو الدهون', 'تباطؤ التمثيل الغذائي', 'الطب الوظيفي', 'فحص شامل دقيق', 'مخاطر صحية طويلة الأمد'] },
        { label: 'الإشارة الأخيرة', q: 'ما أبرز إشارة من جسمك لاحظتها مؤخراً؟', opts: ['التعب بسهولة', 'نوم خفيف أو استيقاظ مبكر', 'زيادة أو نقص الوزن', 'ضعف حالة الجهاز الهضمي', 'ضعف المناعة', 'فقدان كتلة العضلات', 'لا أعراض واضحة، أريد فحصاً شاملاً فقط'] },
        { label: 'الحالة المرتبطة', q: 'هل ينطبق عليك أي من التالي؟', opts: ['تاريخ عائلي للمرض', 'مرض مزمن أو دواء طويل الأمد', 'نتائج فحص غير طبيعية', 'ضغط نفسي مزمن', 'نظام غذائي أو حياة غير منتظمة', 'سن الأمل أو تغيرات هرمونية', 'غير متأكد'] },
        { label: 'تركيز الاستشارة', q: 'أي نوع من الاستشارة تريد التركيز عليه؟', opts: ['فحص صحي', 'طب وظيفي', 'تقييم مكافحة الشيخوخة', 'إدارة التغذية ونمط الحياة', 'إدارة النوم والتوتر', 'إدارة التمثيل الغذائي والوزن', 'شرح نتائج الفحص'] },
        { label: 'مدة الإقامة', q: 'كم ستبقى في كوريا؟', opts: ['يوم واحد أو أقل', '2-3 أيام', '3 ليالٍ و4 أيام', '5 أيام أو أكثر', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['عدم معرفة الفحوصات المطلوبة', 'عدم فهم النتائج', 'كثرة الفحوصات دون تركيز', 'تجاوز التكلفة المتوقعة', 'عدم كفاية الوقت', 'التواصل اللغوي', 'معرفة الملاءمة أولاً'] },
        { label: 'الأولوية الأولى', q: 'ما الذي تريد من هانغانغايبورن تنظيمه أولاً؟', opts: ['اتجاه الفحوصات المناسب', 'اتجاه الطب الوظيفي', 'جدولة الفحص في كوريا', 'المستندات المطلوبة', 'شرح إجراءات النتائج', 'التواصل مع مستشار يتحدث الصينية', 'إمكانية الحجز'] },
      ],
      result: R_BIG_HEALTH.ar,
    },
  },

  'stem-cell': {
    zh: {
      title: '生成我的再生医学咨询卡',
      copyHeader: '【再生医学咨询卡】',
      questions: [
        { label: '关注类型', q: '您这次最关注的再生医学方向是？', opts: ['关节', '术后恢复', '抗衰老', '皮肤组织', '免疫', '干细胞合法范围', '不确定'] },
        { label: '在意问题', q: '您目前最在意的问题是？', opts: ['关节不适', '恢复慢', '术后恢复管理', '恢复力下降', '皮肤修复', '合法合规', '咨询必要性'] },
        { label: '现有资料', q: '您目前是否有相关资料？', opts: ['影像', '诊断记录', '手术经历', '慢性炎症', '无资料', '资料在中国', '不确定'] },
        { label: '咨询目的', q: '您这次咨询最希望达到的目的是？', opts: ['了解范围', '确认医生判断边界', '准备资料', '面诊检查需求', '恢复管理方向', '合法边界', '顾问沟通'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['合法性', '适合性', '夸大宣传', '检查项目', '费用', '停留时间', '语言'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '未定', '先线上'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['整理问题资料', '说明合法范围', '判断方向', '整理准备事项', '连接顾问', '预约可行性', '了解流程'] },
      ],
      result: R_STEM_CELL.zh,
    },
    ko: {
      title: '나의 재생의학 상담카드 만들기',
      copyHeader: '【재생의학 상담카드】',
      questions: [
        { label: '관심 분야', q: '이번에 가장 관심 있는 재생의학 분야는?', opts: ['관절', '수술 후 회복', '항노화', '피부·조직', '면역', '줄기세포 합법 범위', '잘 모르겠음'] },
        { label: '신경 쓰이는 문제', q: '지금 가장 신경 쓰이는 문제는?', opts: ['관절 불편감', '회복이 느림', '수술 후 회복 관리', '회복력 저하', '피부 회복', '합법·합규 여부', '상담이 필요한지 여부'] },
        { label: '보유 자료', q: '현재 관련 자료가 있나요?', opts: ['영상 자료', '진단 기록', '수술 경험', '만성 염증', '자료 없음', '자료가 중국에 있음', '잘 모르겠음'] },
        { label: '상담 목적', q: '이번 상담을 통해 가장 얻고 싶은 것은?', opts: ['가능한 범위 이해', '의사 판단 기준 확인', '자료 준비', '면진·검사 필요 여부', '회복 관리 방향', '합법적 한계 확인', '상담사와 소통'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['합법성', '적합성', '과장 광고', '검사 항목', '비용', '체류 기간', '언어'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '미정', '먼저 온라인으로'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['문제·자료 정리', '합법 범위 안내', '방향 판단', '준비 사항 정리', '상담사 연결', '예약 가능 여부', '절차 안내'] },
      ],
      result: R_STEM_CELL.ko,
    },
    en: {
      title: 'Build My Regenerative Medicine Consultation Profile',
      copyHeader: '[Regenerative Medicine Consultation Card]',
      questions: [
        { label: 'Area of interest', q: 'Which regenerative medicine area interests you most this time?', opts: ['Joints', 'Post-surgery recovery', 'Anti-aging', 'Skin & tissue', 'Immunity', 'Legal scope of stem cell treatment', 'Not sure'] },
        { label: 'Main concern', q: 'What concerns you most right now?', opts: ['Joint discomfort', 'Slow recovery', 'Post-surgery recovery management', 'Reduced resilience', 'Skin repair', 'Legal compliance', 'Whether consultation is necessary'] },
        { label: 'Existing records', q: 'Do you currently have related documents?', opts: ['Imaging', 'Diagnostic records', 'Surgical history', 'Chronic inflammation', 'No documents', 'Documents are in my home country', 'Not sure'] },
        { label: 'Consultation goal', q: 'What do you most want to get from this consultation?', opts: ['Understand the scope', "Confirm physician's judgment boundary", 'Prepare documents', 'In-person evaluation needs', 'Recovery management direction', 'Legal boundaries', 'Talk with a concierge'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Legality', 'Suitability', 'Exaggerated claims', 'Test items', 'Cost', 'Length of stay', 'Language'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Organize concerns and documents', 'Explain the legal scope', 'Help judge the direction', 'Organize preparation items', 'Connect with a concierge', 'Check booking feasibility', 'Explain the process'] },
      ],
      result: R_STEM_CELL.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الطب التجديدي',
      copyHeader: '[بطاقة استشارة الطب التجديدي]',
      questions: [
        { label: 'مجال الاهتمام', q: 'أي مجال في الطب التجديدي يهمك أكثر هذه المرة؟', opts: ['المفاصل', 'التعافي بعد الجراحة', 'مكافحة الشيخوخة', 'الجلد والنسيج', 'المناعة', 'النطاق القانوني للخلايا الجذعية', 'غير متأكد'] },
        { label: 'القلق الرئيسي', q: 'ما الذي يقلقك أكثر الآن؟', opts: ['عدم راحة المفاصل', 'التعافي البطيء', 'إدارة التعافي بعد الجراحة', 'ضعف القدرة على التعافي', 'إصلاح الجلد', 'الامتثال القانوني', 'ضرورة الاستشارة'] },
        { label: 'السجلات الحالية', q: 'هل لديك مستندات متعلقة بذلك حالياً؟', opts: ['صور تصوير', 'سجلات تشخيص', 'تاريخ جراحي', 'التهاب مزمن', 'لا توجد مستندات', 'المستندات موجودة في بلدي', 'غير متأكد'] },
        { label: 'هدف الاستشارة', q: 'ما الذي تريد تحقيقه من هذه الاستشارة؟', opts: ['فهم النطاق المتاح', 'تأكيد حدود تقييم الطبيب', 'تحضير المستندات', 'الحاجة لتقييم حضوري', 'اتجاه إدارة التعافي', 'الحدود القانونية', 'التواصل مع مستشار'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الشرعية', 'الملاءمة', 'الدعاية المضللة', 'بنود الفحص', 'التكلفة', 'مدة الإقامة', 'اللغة'] },
        { label: 'موعد الزيارة', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'عبر الإنترنت أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['تنظيم المشاكل والمستندات', 'توضيح النطاق القانوني', 'المساعدة في تحديد الاتجاه', 'تنظيم متطلبات التحضير', 'التواصل مع مستشار', 'التحقق من إمكانية الحجز', 'شرح الإجراءات'] },
      ],
      result: R_STEM_CELL.ar,
    },
  },

  'skin-beauty': {
    zh: {
      title: '生成我的皮肤医美咨询卡',
      copyHeader: '【皮肤医美咨询卡】',
      questions: [
        { label: '想改善问题', q: '您目前最想改善的皮肤问题是？', opts: ['松弛', '毛孔', '色斑暗沉', '痘印痘疤', '粗糙', '下垂', '自然抗衰'] },
        { label: '在意部位', q: '您比较在意的部位是？', opts: ['全脸', '眼周', '下颌线', '法令纹', '苹果肌脸颊', '颈部', '不确定'] },
        { label: '想达到感觉', q: '您希望达到的感觉是？', opts: ['自然', '更亮更干净', '更紧致', '毛孔肤质改善', '拍照好看', '恢复期短', '长期抗衰管理'] },
        { label: '可接受恢复期', q: '您可以接受的恢复期是？', opts: ['几乎不要', '1-3天', '4-7天', '可接受更长', '不能影响行程', '不确定'] },
        { label: '过往经历', q: '您过往的相关经历是？', opts: ['满意', '价格偏高', '恢复期不满意', '想换医院', '只在中国做过', '第一次', '帮家人朋友了解'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['不自然', '疼痛', '恢复期', '费用', '选错项目', '沟通', '效果不一致'] },
        { label: '希望先了解', q: '您希望先了解什么？', opts: ['适合方向', '恢复期', '参考预算方向', '行程安排', '中文顾问', '咨询流程', '预约可行性'] },
      ],
      result: R_SKIN_BEAUTY.zh,
    },
    ko: {
      title: '나의 피부의료미용 상담카드 만들기',
      copyHeader: '【피부의료미용 상담카드】',
      questions: [
        { label: '개선하고 싶은 문제', q: '지금 가장 개선하고 싶은 피부 문제는?', opts: ['탄력 저하', '모공', '색소·칙칙함', '여드름 흔적', '거칠음', '처짐', '자연스러운 항노화'] },
        { label: '신경 쓰이는 부위', q: '가장 신경 쓰이는 부위는?', opts: ['얼굴 전체', '눈가', '턱선', '팔자주름', '볼·애플존', '목', '잘 모르겠음'] },
        { label: '원하는 느낌', q: '원하는 느낌은?', opts: ['자연스러움', '더 밝고 깨끗함', '더 탄력 있음', '모공·피부질 개선', '사진이 잘 나옴', '회복기간이 짧음', '장기적 항노화 관리'] },
        { label: '감수 가능한 회복기간', q: '감수할 수 있는 회복기간은?', opts: ['거의 원하지 않음', '1-3일', '4-7일', '더 긴 기간도 가능', '일정에 영향 주면 안 됨', '잘 모르겠음'] },
        { label: '이전 경험', q: '이전 관련 경험은?', opts: ['만족했음', '가격이 높았음', '회복기간이 불만족스러움', '병원을 바꾸고 싶음', '중국에서만 해봄', '처음임', '가족·친구 대신 알아봄'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['부자연스러움', '통증', '회복기간', '비용', '항목을 잘못 고를까 봐', '소통', '결과가 다를까 봐'] },
        { label: '먼저 알고 싶은 것', q: '먼저 알고 싶은 것은?', opts: ['적합한 방향', '회복기간', '참고 예산 방향', '일정 안배', '중국어 상담사', '상담 절차', '예약 가능 여부'] },
      ],
      result: R_SKIN_BEAUTY.ko,
    },
    en: {
      title: 'Build My Skin Aesthetics Consultation Profile',
      copyHeader: '[Skin Aesthetics Consultation Card]',
      questions: [
        { label: 'Concern to improve', q: 'What skin concern would you most like to improve?', opts: ['Sagging', 'Pores', 'Pigmentation or dullness', 'Acne scars', 'Roughness', 'Drooping', 'Natural anti-aging'] },
        { label: 'Area of concern', q: 'Which area concerns you most?', opts: ['Whole face', 'Eye area', 'Jawline', 'Nasolabial folds', 'Cheeks', 'Neck', 'Not sure'] },
        { label: 'Desired feeling', q: 'What feeling are you hoping to achieve?', opts: ['Natural', 'Brighter and cleaner', 'Firmer', 'Improved pores and texture', 'Photo-ready', 'Short downtime', 'Long-term anti-aging management'] },
        { label: 'Acceptable downtime', q: 'How much downtime can you accept?', opts: ['Almost none', '1-3 days', '4-7 days', 'Longer is fine', 'Must not affect itinerary', 'Not sure'] },
        { label: 'Past experience', q: "What's your past experience with this?", opts: ['Satisfied', 'Price was high', 'Unsatisfied with downtime', 'Want to change hospitals', 'Only done in my home country', 'First time', 'Looking into it for family/friend'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Looking unnatural', 'Pain', 'Downtime', 'Cost', 'Choosing the wrong treatment', 'Communication', 'Inconsistent results'] },
        { label: 'First priority', q: 'What would you like to know first?', opts: ['Suitable direction', 'Downtime', 'Reference budget direction', 'Itinerary planning', 'Chinese-speaking concierge', 'Consultation process', 'Booking feasibility'] },
      ],
      result: R_SKIN_BEAUTY.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة التجميل الجلدي',
      copyHeader: '[بطاقة استشارة التجميل الجلدي]',
      questions: [
        { label: 'القلق المراد تحسينه', q: 'ما مشكلة البشرة التي تريد تحسينها أكثر؟', opts: ['الترهل', 'المسام', 'التصبغ أو الشحوب', 'آثار حب الشباب', 'الخشونة', 'التهدل', 'مكافحة الشيخوخة الطبيعية'] },
        { label: 'المنطقة الأكثر قلقاً', q: 'أي منطقة تقلقك أكثر؟', opts: ['الوجه كاملاً', 'منطقة العين', 'خط الفك', 'خطوط الأنف والفم', 'الخدود', 'الرقبة', 'غير متأكد'] },
        { label: 'الشعور المطلوب', q: 'ما الشعور الذي تريد تحقيقه؟', opts: ['طبيعي', 'أكثر إشراقاً ونظافة', 'أكثر تماسكاً', 'تحسين المسام والملمس', 'مناسب للتصوير', 'فترة تعافي قصيرة', 'إدارة طويلة الأمد لمكافحة الشيخوخة'] },
        { label: 'فترة التعافي المقبولة', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['لا أريد أي فترة تقريباً', '1-3 أيام', '4-7 أيام', 'فترة أطول مقبولة', 'لا يجب أن تؤثر على برنامجي', 'غير متأكد'] },
        { label: 'الخبرة السابقة', q: 'ما خبرتك السابقة في هذا؟', opts: ['راضٍ', 'كان السعر مرتفعاً', 'غير راضٍ عن فترة التعافي', 'أريد تغيير المستشفى', 'جربته فقط في بلدي', 'أول مرة', 'أستكشف الأمر لعائلتي أو صديق'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الظهور بشكل غير طبيعي', 'الألم', 'فترة التعافي', 'التكلفة', 'اختيار العلاج الخاطئ', 'التواصل', 'عدم تطابق النتائج'] },
        { label: 'الأولوية الأولى', q: 'ما الذي تريد معرفته أولاً؟', opts: ['الاتجاه المناسب', 'فترة التعافي', 'اتجاه الميزانية المرجعية', 'تنظيم الجدول', 'مستشار يتحدث الصينية', 'إجراءات الاستشارة', 'إمكانية الحجز'] },
      ],
      result: R_SKIN_BEAUTY.ar,
    },
  },

  'plastic-surgery': {
    zh: {
      title: '生成我的整形医美咨询卡',
      copyHeader: '【整形医美咨询卡】',
      questions: [
        { label: '关注部位', q: '您最关注的部位是？', opts: ['眼部', '鼻部', '面部轮廓', '下巴下颌线', '眼袋泪沟', '脂肪移植', '面部年轻化'] },
        { label: '想改善感觉', q: '您想改善达到的感觉是？', opts: ['自然', '精致', '年轻', '气质', '五官协调', '脸型清晰', '不确定'] },
        { label: '手术接受度', q: '您对手术的接受度是？', opts: ['可考虑手术', '优先非手术', '想比较', '只想咨询', '担心恢复期', '担心不自然', '未决定'] },
        { label: '可接受恢复期', q: '您能接受的恢复期是？', opts: ['3天内', '1周', '2周', '1个月也可', '尽量不影响工作', '不确定'] },
        { label: '相关经历', q: '您过往的相关经历是？', opts: ['做过整形', '做过皮肤医美', '想修复调整', '没做过', '在中国咨询过', '已有照片资料', '未准备资料'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['不自然', '医生审美不合', '恢复期长', '手术风险', '费用超预期', '语言沟通', '不知先咨询哪个部位'] },
        { label: '希望先整理', q: '您希望汉江春天先帮您整理什么？', opts: ['适合部位', '需准备照片资料', '恢复期与来韩时间', '手术非手术方向', '中文顾问', '预约流程', '咨询前注意事项'] },
      ],
      result: R_PLASTIC_SURGERY.zh,
    },
    ko: {
      title: '나의 성형의료미용 상담카드 만들기',
      copyHeader: '【성형의료미용 상담카드】',
      questions: [
        { label: '관심 부위', q: '가장 관심 있는 부위는?', opts: ['눈', '코', '얼굴 윤곽', '턱·턱선', '눈밑·다크서클', '지방 이식', '안면 리프팅'] },
        { label: '원하는 느낌', q: '원하는 느낌은?', opts: ['자연스러움', '정교함', '젊음', '분위기', '조화로운 얼굴', '또렷한 얼굴형', '잘 모르겠음'] },
        { label: '수술 수용도', q: '수술에 대한 수용도는?', opts: ['수술 고려 가능', '비수술 우선', '비교해보고 싶음', '상담만 원함', '회복기간이 걱정됨', '부자연스러움이 걱정됨', '미결정'] },
        { label: '감수 가능한 회복기간', q: '감수할 수 있는 회복기간은?', opts: ['3일 이내', '1주', '2주', '1개월도 가능', '업무에 영향 안 가게', '잘 모르겠음'] },
        { label: '이전 경험', q: '이전 관련 경험은?', opts: ['성형 경험 있음', '피부의료미용 경험 있음', '수정·재조정 원함', '경험 없음', '중국에서 상담받음', '사진 자료 있음', '자료 준비 안 됨'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['부자연스러움', '의사 미적 감각이 안 맞을까 봐', '긴 회복기간', '수술 위험', '비용 초과', '언어 소통', '어떤 부위부터 상담할지 모름'] },
        { label: '먼저 원하는 정리', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['적합한 부위', '준비할 사진 자료', '회복기간과 방한 일정', '수술·비수술 방향', '중국어 상담사', '예약 절차', '상담 전 주의사항'] },
      ],
      result: R_PLASTIC_SURGERY.ko,
    },
    en: {
      title: 'Build My Plastic Surgery Consultation Profile',
      copyHeader: '[Plastic Surgery Consultation Card]',
      questions: [
        { label: 'Area of interest', q: 'Which area interests you most?', opts: ['Eyes', 'Nose', 'Facial contour', 'Chin & jawline', 'Under-eye area', 'Fat grafting', 'Facial rejuvenation'] },
        { label: 'Desired feeling', q: 'What feeling are you hoping for?', opts: ['Natural', 'Refined', 'Younger', 'Elegant', 'Balanced features', 'Defined face shape', 'Not sure'] },
        { label: 'Surgery openness', q: 'How open are you to surgery?', opts: ['Open to surgery', 'Prefer non-surgical first', 'Want to compare options', 'Just want consultation', 'Worried about downtime', 'Worried about looking unnatural', 'Undecided'] },
        { label: 'Acceptable downtime', q: 'How much downtime can you accept?', opts: ['Within 3 days', '1 week', '2 weeks', 'Even 1 month is fine', 'Should not affect work', 'Not sure'] },
        { label: 'Past experience', q: "What's your past experience with this?", opts: ['Have had plastic surgery', 'Have had skin aesthetics', 'Want a revision', 'No experience', 'Consulted in my home country', 'Have photos ready', 'No documents prepared'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Looking unnatural', "Doctor's aesthetic not matching mine", 'Long downtime', 'Surgical risk', 'Costs exceeding expectations', 'Language communication', 'Not knowing which area to consult first'] },
        { label: 'First priority', q: 'What would you like Hangangaeborn to help organize first?', opts: ['Suitable area', 'Photos to prepare', 'Downtime and Korea visit timing', 'Surgical vs. non-surgical direction', 'Chinese-speaking concierge', 'Booking process', 'Things to know before consultation'] },
      ],
      result: R_PLASTIC_SURGERY.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الجراحة التجميلية',
      copyHeader: '[بطاقة استشارة الجراحة التجميلية]',
      questions: [
        { label: 'منطقة الاهتمام', q: 'أي منطقة تهمك أكثر؟', opts: ['العيون', 'الأنف', 'ملامح الوجه', 'الذقن وخط الفك', 'منطقة تحت العين', 'زرع الدهون', 'تجديد شباب الوجه'] },
        { label: 'الشعور المطلوب', q: 'ما الشعور الذي تريد تحقيقه؟', opts: ['طبيعي', 'أنيق', 'أصغر سناً', 'أنيق ورفيع', 'ملامح متناسقة', 'شكل وجه واضح', 'غير متأكد'] },
        { label: 'الانفتاح على الجراحة', q: 'ما مدى انفتاحك على الجراحة؟', opts: ['منفتح على الجراحة', 'أفضل غير الجراحي أولاً', 'أريد مقارنة الخيارات', 'أريد الاستشارة فقط', 'قلق من فترة التعافي', 'قلق من المظهر غير الطبيعي', 'غير محدد'] },
        { label: 'فترة التعافي المقبولة', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['ضمن 3 أيام', 'أسبوع واحد', 'أسبوعان', 'شهر واحد مقبول أيضاً', 'يجب ألا تؤثر على العمل', 'غير متأكد'] },
        { label: 'الخبرة السابقة', q: 'ما خبرتك السابقة في هذا؟', opts: ['خضعت لجراحة تجميلية', 'خضعت لتجميل جلدي', 'أريد تصحيحاً', 'لا خبرة سابقة', 'استشرت في بلدي', 'لدي صور جاهزة', 'لا مستندات جاهزة'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الظهور بشكل غير طبيعي', 'عدم توافق رؤية الطبيب الجمالية', 'فترة تعافي طويلة', 'مخاطر الجراحة', 'تجاوز التكلفة المتوقعة', 'التواصل اللغوي', 'عدم معرفة المنطقة التي يجب استشارتها أولاً'] },
        { label: 'الأولوية الأولى', q: 'ما الذي تريد من هانغانغايبورن تنظيمه أولاً؟', opts: ['المنطقة المناسبة', 'الصور المطلوب تحضيرها', 'فترة التعافي وموعد الزيارة', 'الاتجاه الجراحي أو غير الجراحي', 'مستشار يتحدث الصينية', 'إجراءات الحجز', 'ملاحظات قبل الاستشارة'] },
      ],
      result: R_PLASTIC_SURGERY.ar,
    },
  },

  'womens-care': {
    zh: {
      title: '生成我的女性健康咨询卡',
      copyHeader: '【女性健康咨询卡】',
      questions: [
        { label: '关注问题', q: '您目前最关注的问题是？', opts: ['妇科检查', '激素更年期', '私密护理', '生理周期变化', '产后恢复', '女性精密体检', '不方便公开想私下咨询'] },
        { label: '当前状态', q: '您目前的身体状态是？', opts: ['月经变化', '睡眠情绪变化', '疲劳状态下降', '私密不适', '产后恢复', '更年期症状', '无明显症状只想检查'] },
        { label: '年龄阶段', q: '您目前处于哪个阶段？', opts: ['20-30代', '30-40代', '40-50代', '更年期前后', '产后恢复期', '备孕生育计划中', '不想说明'] },
        { label: '最近检查', q: '您最近的检查情况是？', opts: ['一年内做过', '超一年没做', '从未系统检查', '在中国做过想比较', '有异常结果', '不确定需做什么', '想先了解流程'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['隐私', '语言沟通', '检查项目不知怎选', '结果看不懂', '费用', '停留时间', '不知是否需要面诊'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '未定', '先线上咨询'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['整理方向', '了解需做检查', '了解流程', '私密咨询', '结果说明', '预约可行性', '中文顾问沟通'] },
      ],
      result: R_WOMENS_CARE.zh,
    },
    ko: {
      title: '나의 여성건강 상담카드 만들기',
      copyHeader: '【여성건강 상담카드】',
      questions: [
        { label: '관심 문제', q: '지금 가장 관심 있는 문제는?', opts: ['부인과 검진', '호르몬·갱년기', '은밀한 부위 관리', '생리주기 변화', '산후 회복', '여성 정밀검진', '공개하기 어려워 비공개 상담 원함'] },
        { label: '현재 상태', q: '현재 몸 상태는?', opts: ['생리 변화', '수면·기분 변화', '피로 상태 저하', '은밀한 부위 불편함', '산후 회복', '갱년기 증상', '특별한 증상 없이 검진만 원함'] },
        { label: '인생 단계', q: '지금 어떤 단계에 있나요?', opts: ['20-30대', '30-40대', '40-50대', '갱년기 전후', '산후 회복기', '임신·출산 계획 중', '말하고 싶지 않음'] },
        { label: '최근 검진 이력', q: '최근 검진 이력은?', opts: ['1년 이내 받음', '1년 넘게 안 받음', '체계적 검사 받은 적 없음', '중국에서 받았고 비교하고 싶음', '이상 결과 있음', '무엇을 해야 할지 모름', '먼저 절차를 알고 싶음'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['사생활 보호', '언어 소통', '검사 항목을 어떻게 골라야 할지 모름', '결과를 이해하기 어려움', '비용', '체류 기간', '면진이 필요한지 모름'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '미정', '먼저 온라인 상담'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['방향 정리', '필요한 검사 안내', '절차 안내', '은밀한 상담', '결과 설명', '예약 가능 여부', '중국어 상담사 소통'] },
      ],
      result: R_WOMENS_CARE.ko,
    },
    en: {
      title: "Build My Women's Health Consultation Profile",
      copyHeader: "[Women's Health Consultation Card]",
      questions: [
        { label: 'Main concern', q: 'What concerns you most right now?', opts: ['Gynecological exam', 'Hormones & menopause', 'Intimate care', 'Menstrual cycle changes', 'Postpartum recovery', "Women's comprehensive checkup", 'Prefer a private, confidential consultation'] },
        { label: 'Current condition', q: 'What is your current physical condition?', opts: ['Menstrual changes', 'Sleep or mood changes', 'Fatigue and lower energy', 'Intimate discomfort', 'Postpartum recovery', 'Menopausal symptoms', 'No clear symptoms, just want a checkup'] },
        { label: 'Life stage', q: 'What stage are you currently at?', opts: ['20s-30s', '30s-40s', '40s-50s', 'Around menopause', 'Postpartum recovery', 'Planning pregnancy', 'Prefer not to say'] },
        { label: 'Recent checkup history', q: "What's your recent checkup history?", opts: ['Within the past year', 'More than a year ago', 'Never had a systematic checkup', 'Had one in my home country, want to compare', 'Had abnormal results', "Not sure what's needed", 'Want to understand the process first'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Privacy', 'Language communication', 'Not knowing which tests to choose', 'Not understanding the results', 'Cost', 'Length of stay', 'Not knowing if an in-person visit is needed'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online consultation first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Organize the direction', 'Explain needed tests', 'Explain the process', 'Private consultation', 'Results explanation', 'Check booking feasibility', 'Chinese-speaking concierge contact'] },
      ],
      result: R_WOMENS_CARE.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة صحة المرأة',
      copyHeader: '[بطاقة استشارة صحة المرأة]',
      questions: [
        { label: 'القلق الرئيسي', q: 'ما الذي يهمك أكثر الآن؟', opts: ['الفحص النسائي', 'الهرمونات وسن الأمل', 'العناية الحميمة', 'تغيرات الدورة الشهرية', 'التعافي بعد الولادة', 'فحص شامل للمرأة', 'أفضل استشارة خاصة وسرية'] },
        { label: 'الحالة الحالية', q: 'ما حالتك الجسدية الحالية؟', opts: ['تغيرات الدورة الشهرية', 'تغيرات النوم أو المزاج', 'التعب وانخفاض الطاقة', 'عدم راحة في المنطقة الحميمة', 'التعافي بعد الولادة', 'أعراض سن الأمل', 'لا أعراض واضحة، أريد فحصاً فقط'] },
        { label: 'المرحلة الحياتية', q: 'في أي مرحلة أنت الآن؟', opts: ['العشرينات-الثلاثينات', 'الثلاثينات-الأربعينات', 'الأربعينات-الخمسينات', 'حول سن الأمل', 'فترة التعافي بعد الولادة', 'التخطيط للحمل', 'أفضل عدم القول'] },
        { label: 'سجل الفحص الأخير', q: 'ما سجل فحصك الأخير؟', opts: ['خلال السنة الماضية', 'منذ أكثر من سنة', 'لم أخضع لفحص شامل من قبل', 'خضعت لفحص في بلدي وأريد المقارنة', 'نتائج غير طبيعية سابقة', 'غير متأكدة ما هو المطلوب', 'أريد فهم الإجراءات أولاً'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الخصوصية', 'التواصل اللغوي', 'عدم معرفة كيفية اختيار الفحوصات', 'عدم فهم النتائج', 'التكلفة', 'مدة الإقامة', 'عدم معرفة الحاجة لزيارة حضورية'] },
        { label: 'موعد الزيارة', q: 'متى تخططين لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريدينه من هانغانغايبورن أولاً؟', opts: ['تنظيم الاتجاه', 'توضيح الفحوصات المطلوبة', 'شرح الإجراءات', 'استشارة خاصة', 'شرح النتائج', 'التحقق من إمكانية الحجز', 'التواصل مع مستشار يتحدث الصينية'] },
      ],
      result: R_WOMENS_CARE.ar,
    },
  },

  'mens-health': {
    zh: {
      title: '生成我的男性健康咨询卡',
      copyHeader: '【男性健康咨询卡】',
      questions: [
        { label: '关注问题', q: '您目前最关注的健康问题是？', opts: ['体力精力下降', '睡眠疲劳', '脱发', '前列腺泌尿健康', '男性功能', '代谢体重管理', '男性健康检查'] },
        { label: '明显困扰', q: '您最近最明显的困扰是？', opts: ['容易疲劳', '睡眠质量下降', '脱发加重', '排尿不适', '体重腹围增加', '精力下降', '无症状只想检查'] },
        { label: '最近检查', q: '您最近的检查情况是？', opts: ['一年内做过', '很久没做', '从未系统检查', '有异常结果', '在中国做过想比较', '有用药治疗经历', '还没资料'] },
        { label: '重点方向', q: '您希望重点了解哪一类咨询？', opts: ['男性健康检查', '脱发咨询', '泌尿前列腺咨询', '功能医学代谢管理', '体力恢复抗衰管理', '结果说明', '预约来韩流程'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['不好意思开口', '隐私', '语言沟通', '不知看哪个科', '检查项目太多', '费用', '韩国行程安排'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '未定', '先线上咨询'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['整理方向', '准备资料', '说明检查流程', '结果说明方向', '预约可行性', '中文顾问沟通', '来韩日程安排'] },
      ],
      result: R_MENS_HEALTH.zh,
    },
    ko: {
      title: '나의 남성건강 상담카드 만들기',
      copyHeader: '【남성건강 상담카드】',
      questions: [
        { label: '관심 문제', q: '지금 가장 관심 있는 건강 문제는?', opts: ['체력·기력 저하', '수면·피로', '탈모', '전립선·비뇨기 건강', '남성기능', '대사·체중 관리', '남성 건강검진'] },
        { label: '뚜렷한 불편함', q: '최근 가장 뚜렷한 불편함은?', opts: ['쉽게 피곤함', '수면 질 저하', '탈모 심화', '배뇨 불편', '체중·복부둘레 증가', '기력 저하', '증상 없이 검진만 원함'] },
        { label: '최근 검진 이력', q: '최근 검진 이력은?', opts: ['1년 이내 받음', '오래전에 받음', '체계적 검사 받은 적 없음', '이상 결과 있음', '중국에서 받았고 비교하고 싶음', '약물 치료 경험 있음', '아직 자료 없음'] },
        { label: '중점 방향', q: '어떤 상담을 중점적으로 알고 싶나요?', opts: ['남성 건강검진', '탈모 상담', '비뇨기·전립선 상담', '기능의학 대사 관리', '체력 회복·항노화 관리', '결과 설명', '방한 예약 절차'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['말하기가 부끄러움', '사생활 보호', '언어 소통', '어떤 진료과를 가야 할지 모름', '검사 항목이 너무 많음', '비용', '한국 일정 관리'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '미정', '먼저 온라인 상담'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['방향 정리', '자료 준비', '검사 절차 안내', '결과 설명 방향', '예약 가능 여부', '중국어 상담사 소통', '방한 일정 관리'] },
      ],
      result: R_MENS_HEALTH.ko,
    },
    en: {
      title: "Build My Men's Health Consultation Profile",
      copyHeader: "[Men's Health Consultation Card]",
      questions: [
        { label: 'Main concern', q: 'What health issue concerns you most right now?', opts: ['Declining stamina/energy', 'Sleep and fatigue', 'Hair loss', 'Prostate and urinary health', 'Male sexual function', 'Metabolism and weight management', "Men's health checkup"] },
        { label: 'Noticeable issue', q: "What's the most noticeable issue recently?", opts: ['Getting tired easily', 'Declining sleep quality', 'Worsening hair loss', 'Urinary discomfort', 'Increased weight or waist size', 'Lower energy', 'No symptoms, just want a checkup'] },
        { label: 'Recent checkup history', q: "What's your recent checkup history?", opts: ['Within the past year', 'A long time ago', 'Never had a systematic checkup', 'Had abnormal results', 'Had one in my home country, want to compare', 'Have a history of medication', 'No documents yet'] },
        { label: 'Consultation focus', q: 'Which type of consultation would you like to focus on?', opts: ["Men's health checkup", 'Hair loss consultation', 'Urology and prostate consultation', 'Functional medicine metabolic management', 'Energy recovery and anti-aging management', 'Results explanation', 'Korea visit booking process'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Embarrassed to bring it up', 'Privacy', 'Language communication', 'Not knowing which department to see', 'Too many test items', 'Cost', 'Korea itinerary planning'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online consultation first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Organize the direction', 'Prepare documents', 'Explain the test process', 'Results explanation direction', 'Check booking feasibility', 'Chinese-speaking concierge contact', 'Korea schedule planning'] },
      ],
      result: R_MENS_HEALTH.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة صحة الرجل',
      copyHeader: '[بطاقة استشارة صحة الرجل]',
      questions: [
        { label: 'القلق الرئيسي', q: 'ما المشكلة الصحية التي تهمك أكثر الآن؟', opts: ['انخفاض الطاقة والحيوية', 'النوم والتعب', 'تساقط الشعر', 'صحة البروستاتا والمسالك البولية', 'الوظيفة الجنسية الذكورية', 'إدارة التمثيل الغذائي والوزن', 'فحص صحة الرجل'] },
        { label: 'المشكلة الواضحة', q: 'ما أبرز مشكلة لاحظتها مؤخراً؟', opts: ['التعب بسهولة', 'تراجع جودة النوم', 'تفاقم تساقط الشعر', 'عدم راحة في التبول', 'زيادة الوزن أو محيط الخصر', 'انخفاض الطاقة', 'لا أعراض، أريد فحصاً فقط'] },
        { label: 'سجل الفحص الأخير', q: 'ما سجل فحصك الأخير؟', opts: ['خلال السنة الماضية', 'منذ زمن طويل', 'لم أخضع لفحص شامل من قبل', 'نتائج غير طبيعية سابقة', 'خضعت لفحص في بلدي وأريد المقارنة', 'لدي تاريخ علاج دوائي', 'لا مستندات حتى الآن'] },
        { label: 'تركيز الاستشارة', q: 'أي نوع من الاستشارة تريد التركيز عليه؟', opts: ['فحص صحة الرجل', 'استشارة تساقط الشعر', 'استشارة المسالك البولية والبروستاتا', 'إدارة التمثيل الغذائي بالطب الوظيفي', 'إدارة التعافي ومكافحة الشيخوخة', 'شرح النتائج', 'إجراءات حجز الزيارة لكوريا'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الحرج من الحديث عن ذلك', 'الخصوصية', 'التواصل اللغوي', 'عدم معرفة القسم المناسب', 'كثرة بنود الفحص', 'التكلفة', 'تنظيم برنامج الزيارة لكوريا'] },
        { label: 'موعد الزيارة', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['تنظيم الاتجاه', 'تحضير المستندات', 'شرح إجراءات الفحص', 'اتجاه شرح النتائج', 'التحقق من إمكانية الحجز', 'التواصل مع مستشار يتحدث الصينية', 'تنظيم جدول الزيارة لكوريا'] },
      ],
      result: R_MENS_HEALTH.ar,
    },
  },

  'medical-tourism': {
    zh: {
      title: '生成我的赴韩医疗旅游咨询卡',
      copyHeader: '【赴韩医疗旅游咨询卡】',
      questions: [
        { label: '主要目的', q: '您此次赴韩的主要目的是？', opts: ['健康检查', '皮肤医美', '整形医美', '抗衰再生', '陪同家人就医', '兼顾旅游观光', '还未确定'] },
        { label: '同行人数', q: '您预计的同行人数是？', opts: ['本人一人', '夫妻两人', '与家人同行', '与朋友同行', '带父母同行', '带子女同行', '尚未确定'] },
        { label: '停留时长', q: '您计划的停留时长是？', opts: ['1-2天', '3-4天', '5-7天', '一周以上', '具体未定', '看行程再定'] },
        { label: '需要支持', q: '您最需要哪方面的支持？', opts: ['机场接送', '酒店住宿安排', '医院预约', '中文翻译陪同', '观光行程搭配', '全程陪同', '只需基础协助'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['语言沟通', '行程衔接', '医院选择', '费用', '安全保障', '突发情况应对', '没有特别担心'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '未定', '先线上咨询'] },
        { label: '希望先获得', q: '您希望先获得什么信息？', opts: ['整体行程方案', '预计费用方向', '医院方向建议', '陪同服务说明', '签证入境信息', '中文顾问对接', '先简单了解流程'] },
      ],
      result: R_MEDICAL_TOURISM.zh,
    },
    ko: {
      title: '나의 방한 의료관광 상담카드 만들기',
      copyHeader: '【방한 의료관광 상담카드】',
      questions: [
        { label: '주요 목적', q: '이번 방한의 주요 목적은?', opts: ['건강검진', '피부 미용', '성형 미용', '항노화·재생', '가족 동행 진료', '관광도 함께', '아직 미정'] },
        { label: '동행 인원', q: '예상 동행 인원은?', opts: ['본인 혼자', '부부 두 명', '가족과 함께', '친구와 함께', '부모님 동행', '자녀 동행', '아직 미정'] },
        { label: '체류 기간', q: '계획 중인 체류 기간은?', opts: ['1-2일', '3-4일', '5-7일', '일주일 이상', '구체적으로 미정', '일정 보고 결정'] },
        { label: '필요한 지원', q: '가장 필요한 지원은?', opts: ['공항 픽업', '호텔·숙소 예약', '병원 예약', '중국어 통역 동행', '관광 일정 연계', '전 일정 동행', '기본적인 도움만'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['언어 소통', '일정 연결', '병원 선택', '비용', '안전 보장', '돌발 상황 대처', '특별히 걱정 없음'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '미정', '먼저 온라인 상담'] },
        { label: '먼저 알고 싶은 것', q: '먼저 어떤 정보를 받고 싶나요?', opts: ['전체 일정 방안', '예상 비용 방향', '병원 방향 추천', '동행 서비스 안내', '비자·입국 정보', '중국어 상담사 연결', '먼저 절차만 간단히'] },
      ],
      result: R_MEDICAL_TOURISM.ko,
    },
    en: {
      title: 'Build My Korea Medical Travel Consultation Profile',
      copyHeader: '[Korea Medical Travel Consultation Card]',
      questions: [
        { label: 'Main purpose', q: 'What is the main purpose of your Korea visit?', opts: ['Health checkup', 'Skin & beauty care', 'Plastic surgery & aesthetics', 'Anti-aging & regenerative care', 'Accompanying family for treatment', 'Combining with sightseeing', 'Not decided yet'] },
        { label: 'Travel companions', q: 'How many people are expected to travel with you?', opts: ['Myself alone', 'With my spouse', 'With family', 'With friends', 'With parents', 'With children', 'Not decided yet'] },
        { label: 'Length of stay', q: 'How long are you planning to stay?', opts: ['1-2 days', '3-4 days', '5-7 days', 'Over a week', 'Not specifically decided', 'Will decide based on itinerary'] },
        { label: 'Support needed', q: 'What support do you need most?', opts: ['Airport pickup', 'Hotel/accommodation arrangement', 'Hospital booking', 'Chinese-speaking interpreter escort', 'Sightseeing itinerary coordination', 'Full-trip escort', 'Just basic assistance'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Language communication', 'Itinerary coordination', 'Hospital selection', 'Cost', 'Safety assurance', 'Handling unexpected situations', 'No particular worry'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online consultation first'] },
        { label: 'Preferred first info', q: 'What information would you like first?', opts: ['Overall itinerary plan', 'Estimated budget direction', 'Hospital direction recommendation', 'Escort service explanation', 'Visa/entry information', 'Chinese-speaking concierge contact', 'Just a brief process overview'] },
      ],
      result: R_MEDICAL_TOURISM.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة السفر الطبي إلى كوريا',
      copyHeader: '[بطاقة استشارة السفر الطبي إلى كوريا]',
      questions: [
        { label: 'الغرض الرئيسي', q: 'ما الغرض الرئيسي من زيارتك لكوريا؟', opts: ['فحص صحي', 'عناية بالبشرة والتجميل', 'جراحة تجميلية', 'مكافحة الشيخوخة والطب التجديدي', 'مرافقة عائلة للعلاج', 'الجمع مع السياحة', 'غير محدد بعد'] },
        { label: 'المرافقون', q: 'كم عدد الأشخاص المتوقع سفرهم معك؟', opts: ['بمفردي', 'مع زوجي/زوجتي', 'مع العائلة', 'مع الأصدقاء', 'مع الوالدين', 'مع الأطفال', 'غير محدد بعد'] },
        { label: 'مدة الإقامة', q: 'ما مدة الإقامة المخطط لها؟', opts: ['1-2 يوم', '3-4 أيام', '5-7 أيام', 'أكثر من أسبوع', 'غير محدد بدقة', 'سيتحدد حسب البرنامج'] },
        { label: 'الدعم المطلوب', q: 'ما أكثر دعم تحتاجه؟', opts: ['استقبال من المطار', 'ترتيب الفندق والإقامة', 'حجز المستشفى', 'مرافقة مترجم يتحدث الصينية', 'تنسيق برنامج سياحي', 'مرافقة كاملة طوال الرحلة', 'مساعدة أساسية فقط'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['التواصل اللغوي', 'تنسيق البرنامج', 'اختيار المستشفى', 'التكلفة', 'ضمان الأمان', 'التعامل مع الحالات الطارئة', 'لا قلق خاص'] },
        { label: 'موعد الزيارة', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'المعلومات الأولى المطلوبة', q: 'ما المعلومات التي تريدها أولاً؟', opts: ['خطة البرنامج الكاملة', 'اتجاه الميزانية المتوقعة', 'توصية باتجاه المستشفى', 'شرح خدمة المرافقة', 'معلومات التأشيرة والدخول', 'التواصل مع مستشار يتحدث الصينية', 'نظرة عامة سريعة على الإجراءات'] },
      ],
      result: R_MEDICAL_TOURISM.ar,
    },
  },

  'custom-plan': {
    zh: {
      title: '生成我的定制医疗观光咨询卡',
      copyHeader: '【定制医疗观光咨询卡】',
      questions: [
        { label: '定制方案类型', q: '您希望定制的方案类型是？', opts: ['健康检查+观光', '医美+休闲', '抗衰再生+疗养', '多项目组合', '家庭多人定制', '企业高端定制', '还未确定'] },
        { label: '服务对象', q: '此次方案主要服务对象是？', opts: ['本人', '夫妻', '父母长辈', '全家多代同行', '朋友团体', '企业团体', '尚未确定'] },
        { label: '最关注', q: '您对定制方案最关注的是？', opts: ['项目组合合理性', '行程安排顺畅度', '陪同服务质量', '费用透明度', '医院资源匹配', '隐私保护', '整体体验感'] },
        { label: '停留时长', q: '您计划的停留时长是？', opts: ['3-4天', '5-7天', '一周以上', '两周左右', '具体未定', '看方案再定'] },
        { label: '希望组合内容', q: '您希望方案中包含哪些内容？', opts: ['专属医疗顾问', '高端住宿', '专车接送', '中文全程陪同', '观光餐饮搭配', '健康跟踪服务', '先看方案再决定'] },
        { label: '担心点', q: '您最担心的问题是？', opts: ['方案是否真正个性化', '费用是否合理', '行程是否顺畅', '医院是否匹配需求', '沟通是否顺畅', '隐私是否有保障', '没有特别担心'] },
        { label: '希望先帮做', q: '您希望汉江春天先帮您做什么？', opts: ['了解需求并制定初步方案', '整理预算方向', '推荐适合的项目组合', '说明定制流程', '安排专属顾问对接', '提供同类案例参考', '先简单线上沟通'] },
      ],
      result: R_CUSTOM_PLAN.zh,
    },
    ko: {
      title: '나의 맞춤형 의료관광 상담카드 만들기',
      copyHeader: '【맞춤형 의료관광 상담카드】',
      questions: [
        { label: '맞춤 방안 유형', q: '원하시는 맞춤 방안 유형은?', opts: ['건강검진+관광', '미용+휴양', '항노화·재생+요양', '다중 항목 조합', '가족 다인 맞춤', '기업 고급 맞춤', '아직 미정'] },
        { label: '서비스 대상', q: '이번 방안의 주요 서비스 대상은?', opts: ['본인', '부부', '부모님·어르신', '가족 다세대 동행', '친구 그룹', '기업 단체', '아직 미정'] },
        { label: '가장 중요한 점', q: '맞춤 방안에서 가장 중요하게 생각하는 것은?', opts: ['항목 조합의 합리성', '일정의 원활함', '동행 서비스 품질', '비용 투명성', '병원 자원 매칭', '사생활 보호', '전반적인 경험'] },
        { label: '체류 기간', q: '계획 중인 체류 기간은?', opts: ['3-4일', '5-7일', '일주일 이상', '약 2주', '구체적으로 미정', '방안 보고 결정'] },
        { label: '원하는 구성', q: '방안에 포함되었으면 하는 것은?', opts: ['전담 의료 컨설턴트', '고급 숙소', '전용 차량 픽업', '중국어 전 일정 동행', '관광·식사 연계', '건강 추적 서비스', '먼저 방안 보고 결정'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['방안이 진짜 개인화되었는지', '비용이 합리적인지', '일정이 원활한지', '병원이 필요에 맞는지', '소통이 원활한지', '사생활이 보장되는지', '특별히 걱정 없음'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['요구사항 파악 후 초안 방안 제시', '예산 방향 정리', '적합한 항목 조합 추천', '맞춤 절차 안내', '전담 컨설턴트 연결', '유사 사례 참고 제공', '먼저 간단한 온라인 소통'] },
      ],
      result: R_CUSTOM_PLAN.ko,
    },
    en: {
      title: 'Build My Custom Medical Travel Consultation Profile',
      copyHeader: '[Custom Medical Travel Consultation Card]',
      questions: [
        { label: 'Custom plan type', q: 'What type of custom plan are you looking for?', opts: ['Checkup + sightseeing', 'Aesthetic care + leisure', 'Anti-aging/regenerative + recuperation', 'Multiple combined items', 'Family multi-person plan', 'Premium corporate plan', 'Not decided yet'] },
        { label: 'Service recipients', q: 'Who is this plan mainly for?', opts: ['Myself', 'My spouse and I', 'Parents/elders', 'Multi-generational family trip', 'Group of friends', 'Corporate group', 'Not decided yet'] },
        { label: 'Top priority', q: 'What matters most to you in a custom plan?', opts: ['Sensible combination of items', 'Smooth itinerary coordination', 'Quality of escort service', 'Cost transparency', 'Matching with the right hospital', 'Privacy protection', 'Overall experience'] },
        { label: 'Length of stay', q: 'How long are you planning to stay?', opts: ['3-4 days', '5-7 days', 'Over a week', 'About 2 weeks', 'Not specifically decided', 'Will decide based on the plan'] },
        { label: 'Preferred inclusions', q: "What would you like included in the plan?", opts: ['Dedicated medical consultant', 'Premium accommodation', 'Private car pickup', 'Full-trip Chinese-speaking escort', 'Sightseeing & dining coordination', 'Health follow-up tracking', 'Decide after seeing the plan'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Whether the plan is truly personalized', 'Whether the cost is reasonable', 'Whether the itinerary runs smoothly', 'Whether the hospital matches my needs', 'Whether communication will be smooth', 'Whether privacy is protected', 'No particular worry'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Understand needs and draft an initial plan', 'Organize budget direction', 'Recommend a suitable combination of items', 'Explain the customization process', 'Connect with a dedicated consultant', 'Provide similar case references', 'Start with a brief online chat'] },
      ],
      result: R_CUSTOM_PLAN.en,
    },
    ar: {
      title: 'إنشاء ملف خطة السفر الطبي المخصصة',
      copyHeader: '[بطاقة خطة السفر الطبي المخصصة]',
      questions: [
        { label: 'نوع الخطة المخصصة', q: 'ما نوع الخطة المخصصة التي تبحث عنها؟', opts: ['فحص + سياحة', 'عناية تجميلية + استجمام', 'مكافحة الشيخوخة/التجديد + نقاهة', 'مجموعة بنود متعددة', 'خطة عائلية متعددة الأفراد', 'خطة شركات راقية', 'غير محدد بعد'] },
        { label: 'المستفيدون من الخدمة', q: 'لمن هذه الخطة بشكل أساسي؟', opts: ['لي وحدي', 'لي وزوجي/زوجتي', 'للوالدين/كبار السن', 'رحلة عائلية متعددة الأجيال', 'مجموعة أصدقاء', 'مجموعة شركات', 'غير محدد بعد'] },
        { label: 'الأولوية القصوى', q: 'ما الأهم بالنسبة لك في خطة مخصصة؟', opts: ['تركيبة منطقية للبنود', 'تنسيق سلس للبرنامج', 'جودة خدمة المرافقة', 'شفافية التكلفة', 'مطابقة المستشفى المناسب', 'حماية الخصوصية', 'التجربة الشاملة'] },
        { label: 'مدة الإقامة', q: 'ما مدة الإقامة المخطط لها؟', opts: ['3-4 أيام', '5-7 أيام', 'أكثر من أسبوع', 'حوالي أسبوعين', 'غير محدد بدقة', 'سيتحدد حسب الخطة'] },
        { label: 'العناصر المفضلة', q: 'ماذا تريد أن تتضمنه الخطة؟', opts: ['مستشار طبي مخصص', 'إقامة فاخرة', 'استقبال بسيارة خاصة', 'مرافقة كاملة بمترجم يتحدث الصينية', 'تنسيق سياحة وطعام', 'خدمة تتبع صحي', 'القرار بعد رؤية الخطة'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['هل الخطة شخصية بالفعل', 'هل التكلفة معقولة', 'هل البرنامج سلس', 'هل المستشفى يطابق حاجتي', 'هل التواصل سيكون سلساً', 'هل الخصوصية محمية', 'لا قلق خاص'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['فهم الحاجات وصياغة خطة أولية', 'تنظيم اتجاه الميزانية', 'التوصية بتركيبة مناسبة من البنود', 'شرح إجراءات التخصيص', 'التواصل مع مستشار مخصص', 'تقديم أمثلة حالات مشابهة', 'بدء بمحادثة قصيرة عبر الإنترنت'] },
      ],
      result: R_CUSTOM_PLAN.ar,
    },
  },
}
