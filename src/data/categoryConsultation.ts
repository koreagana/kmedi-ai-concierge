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

/* ─── concernId-specific consultation cards (HomePage "请选择您最关心的方向") ─── */

export interface ConcernCard {
  zh: CategoryCardLang
  ko: CategoryCardLang
  en: CategoryCardLang
  ar: CategoryCardLang
}

const RC_YOUNGER_LOOK = buildResult({
  zh: '根据您的选择，您适合先从"年轻感改善"方向整理咨询。汉江春天可以先帮您区分是肤质、松弛、容量流失、眼周疲惫，还是整体抗衰管理的问题，再结合您的恢复期、来韩时间和预算方向，整理适合咨询的韩国皮肤医美或抗衰管理方向。',
  ko: '선택하신 내용을 보면, 먼저 "젊은 인상 개선" 방향부터 상담을 시작하시는 것이 적합합니다. 한강애봄은 먼저 피부질, 탄력 저하, 볼륨 손실, 눈가 피로감, 또는 전반적인 항노화 관리 중 어디에 해당하는지 구분해 드리고, 감수 가능한 회복 기간과 방한 일정, 예산 방향을 함께 고려하여 상담하기 적합한 한국 피부의료미용 또는 항노화 관리 방향을 정리해 드립니다.',
  en: 'Based on your selections, starting with a "youthful look improvement" consultation suits you well. Hangangaeborn will first help distinguish whether your concern is mainly skin texture, reduced elasticity, volume loss, tired-looking eyes, or overall anti-aging management, then combine this with your acceptable downtime, visit timing, and budget direction to identify a suitable Korean skin aesthetics or anti-aging management direction for consultation.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء باستشارة "تحسين المظهر الشاب". سيساعدك هانغانغايبورن أولاً في تحديد ما إذا كانت مشكلتك الأساسية هي ملمس البشرة أو تراجع المرونة أو فقدان الحجم أو مظهر العين المتعب أو إدارة شاملة لمكافحة الشيخوخة، ثم دمج ذلك مع فترة التعافي المقبولة وموعد زيارتك واتجاه الميزانية لتحديد اتجاه مناسب للتجميل الجلدي الكوري أو إدارة مكافحة الشيخوخة للاستشارة.',
})

const RC_SLOW_AGING = buildResult({
  zh: '根据您的选择，您适合先从"慢衰老与大健康管理"方向开始。汉江春天可以先帮您整理疲劳、睡眠、代谢、激素、家族病史、既往检查结果和服药情况，再根据来韩时间连接韩国健康检查、功能医学、代谢管理或抗衰老相关咨询方向。',
  ko: '선택하신 내용을 보면, 먼저 "슬로우 에이징과 대건강 관리" 방향부터 시작하시는 것이 적합합니다. 한강애봄은 먼저 피로, 수면, 대사, 호르몬, 가족력, 기존 검진 결과와 복약 현황을 정리해 드리고, 방한 일정에 맞춰 한국 건강검진, 기능의학, 대사 관리 또는 항노화 관련 상담 방향으로 연결해 드립니다.',
  en: 'Based on your selections, starting with "slow aging and comprehensive health management" suits you well. Hangangaeborn will first help organize your fatigue, sleep, metabolism, hormones, family history, existing checkup results, and current medications, then connect you with Korean health checkup, functional medicine, metabolic management, or anti-aging consultation directions based on your visit timing.',
  ar: 'بناءً على اختياراتك، يُنصح بالبدء باستشارة "الشيخوخة البطيئة والصحة الشاملة". سيساعدك هانغانغايبورن أولاً في تنظيم التعب والنوم والتمثيل الغذائي والهرمونات والتاريخ العائلي ونتائج الفحوصات السابقة والأدوية الحالية، ثم ربطك باتجاهات الفحص الصحي الكوري أو الطب الوظيفي أو إدارة التمثيل الغذائي أو استشارة مكافحة الشيخوخة بناءً على موعد زيارتك.',
})

const RC_REGEN_MEDICINE = buildResult({
  zh: '汉江春天不会代替医生判断适应性，也不会保证效果。我们会先帮您整理影像、诊断、治疗记录等既往资料，说明在韩国合法可咨询的范围,再连接到相应机构，由专科医生判断是否需要进一步面诊评估。',
  ko: '한강애봄은 의사를 대신해 적합성을 판단하거나 효과를 보장하지 않습니다. 먼저 영상, 진단, 치료 기록 등 기존 자료를 정리해 드리고, 한국에서 합법적으로 상담 가능한 범위를 안내해 드린 뒤, 해당 의료기관과 연결하여 전문의가 추가적인 면대면 평가가 필요한지 판단하도록 합니다.',
  en: 'Hangangaeborn does not judge suitability on a doctor\'s behalf, nor guarantee outcomes. We will first help organize your existing imaging, diagnosis, and treatment records, explain the legally consultable scope in Korea, then connect you with a relevant institution where a specialist will determine whether further in-person evaluation is needed.',
  ar: 'لا يحدد هانغانغايبورن مدى الملاءمة بدلاً من الطبيب، ولا يضمن النتائج. سنساعدك أولاً في تنظيم سجلاتك التصويرية والتشخيصية والعلاجية الحالية، ونشرح النطاق القانوني القابل للاستشارة في كوريا، ثم نربطك بمؤسسة مناسبة حيث يحدد أخصائي ما إذا كان هناك حاجة لتقييم شخصي إضافي.',
})

const RC_FACE_CONTOUR = buildResult({
  zh: '根据您的选择，汉江春天会先帮您区分是松弛、下颌线、双下巴、容量流失，还是结构性轮廓问题，再结合您能接受的恢复期和来韩时间，建议适合先咨询的皮肤医美、提升类项目，或整形外科方向。最终方案需由医生面诊评估后确定。',
  ko: '선택하신 내용을 보면, 한강애봄은 먼저 처짐, 턱선, 이중턱, 볼륨 손실, 또는 구조적 윤곽 문제 중 어디에 해당하는지 구분해 드리고, 감수 가능한 회복기간과 방한 일정을 함께 고려하여 먼저 상담하기 적합한 피부 의료미용, 리프팅 시술, 또는 성형외과 방향을 안내해 드립니다. 최종 방안은 의사의 면대면 진료 후 결정됩니다.',
  en: 'Based on your selections, Hangangaeborn will first help distinguish whether your concern is mainly sagging, jawline definition, double chin, volume loss, or a structural contour issue, then combine this with your acceptable downtime and visit timing to recommend a suitable skin aesthetics, lifting, or plastic surgery direction to consult first. The final plan will be determined after an in-person evaluation by the physician.',
  ar: 'بناءً على اختياراتك، سيساعدك هانغانغايبورن أولاً في تحديد ما إذا كانت مشكلتك الأساسية هي الترهل أو تحديد خط الفك أو الذقن المزدوجة أو فقدان الحجم أو مشكلة هيكلية في الملامح، ثم دمج ذلك مع فترة التعافي المقبولة وموعد زيارتك للتوصية باتجاه مناسب للتجميل الجلدي أو الرفع أو الجراحة التجميلية للاستشارة أولاً. تُحدد الخطة النهائية بعد تقييم شخصي من الطبيب.',
})

const RC_SURGERY_INTEREST = buildResult({
  zh: '汉江春天会帮您整理关注部位、审美方向、既往经历、恢复期和来韩时间，并连接到相应的医疗机构,但不会代替医生判断是否需要手术，也不保证效果。最终的适应性判断和方案需由专科医生面诊评估后确定。',
  ko: '한강애봄은 관심 부위, 미적 방향, 기존 경험, 회복기간과 방한 일정을 정리해 드리고 해당 의료기관과 연결해 드리지만, 의사를 대신해 수술 필요성을 판단하거나 결과를 보장하지 않습니다. 최종 적합성 판단과 방안은 전문의의 면대면 진료 후 결정됩니다.',
  en: 'Hangangaeborn will help organize your area of concern, aesthetic direction, past experience, downtime, and visit timing, and connect you with a relevant medical institution, but we do not judge surgical necessity on a doctor\'s behalf, nor guarantee results. Final suitability and the treatment plan will be determined after an in-person evaluation by a specialist.',
  ar: 'سيساعدك هانغانغايبورن في تنظيم منطقة اهتمامك واتجاهك الجمالي وخبرتك السابقة وفترة التعافي وموعد زيارتك، وربطك بمؤسسة طبية مناسبة، لكننا لا نحدد ضرورة الجراحة بدلاً من الطبيب، ولا نضمن النتائج. يتم تحديد الملاءمة النهائية والخطة بعد تقييم شخصي من أخصائي.',
})

const RC_FATIGUE_LOOK = buildResult({
  zh: '您的疲惫感可能不只是皮肤问题，也可能与眼周、睡眠、疲劳或代谢有关。汉江春天会先帮您区分是皮肤医美、眼部改善、综合健康检查，还是功能医学方向，并整理照片和既往体检资料、来韩时间，最终判断需由机构和专科医生确认。',
  ko: '느끼시는 피곤한 인상은 단순히 피부 문제만이 아니라 눈가, 수면, 피로, 또는 대사와 관련이 있을 수 있습니다. 한강애봄은 먼저 피부 의료미용, 눈가 개선, 종합 건강검진, 또는 기능의학 방향 중 어디에 해당하는지 구분해 드리고, 사진과 기존 검진 자료, 방한 일정을 정리해 드립니다. 최종 판단은 의료기관과 전문의가 확인합니다.',
  en: 'Your tired look may not be purely a skin issue — it could also relate to the eye area, sleep, fatigue, or metabolism. Hangangaeborn will first help distinguish whether skin aesthetics, eye-area improvement, comprehensive health checkup, or functional medicine is the right direction, and organize your photos, existing checkup documents, and visit timing. The final judgment will be confirmed by the institution and the specialist.',
  ar: 'قد لا يكون مظهرك المتعب مشكلة جلدية فقط، فقد يتعلق أيضاً بمنطقة العين أو النوم أو التعب أو التمثيل الغذائي. سيساعدك هانغانغايبورن أولاً في تحديد ما إذا كان الاتجاه المناسب هو تجميل البشرة أو تحسين منطقة العين أو الفحص الصحي الشامل أو الطب الوظيفي، وتنظيم صورك ومستندات الفحص الحالية وموعد زيارتك. يتم تأكيد الحكم النهائي من قبل المؤسسة والأخصائي.',
})

const RC_KOREA_TRIP_WORRY = buildResult({
  zh: '汉江春天会根据您的医疗目的、同行人数、停留时长,帮您整理初步的行程方向、翻译陪同范围、车辆与住宿动线建议。最终费用会根据同行人数、医疗项目、车辆、陪同范围、医院预约和汇率等因素调整。',
  ko: '한강애봄은 의료 목적, 동행 인원, 체류 기간을 바탕으로 초기 일정 방향, 통역·동행 범위, 차량과 숙소 동선 제안을 정리해 드립니다. 최종 비용은 동행 인원, 의료 항목, 차량, 동행 범위, 병원 예약 및 환율 등의 요인에 따라 조정됩니다.',
  en: 'Based on your medical purpose, number of companions, and stay duration, Hangangaeborn will help organize an initial itinerary direction, interpretation/escort scope, and vehicle/accommodation routing suggestions. The final cost will be adjusted based on factors such as number of travelers, medical procedures, vehicle, escort scope, hospital booking, and exchange rates.',
  ar: 'بناءً على هدفك الطبي وعدد المرافقين ومدة الإقامة، سيساعدك هانغانغايبورن في تنظيم اتجاه برنامج أولي ونطاق الترجمة/المرافقة واقتراحات مسار السيارة والإقامة. تُعدّل التكلفة النهائية بناءً على عوامل مثل عدد المسافرين والإجراءات الطبية والسيارة ونطاق المرافقة وحجز المستشفى وأسعار الصرف.',
})

const RC_HEALTH_CHECKUP = buildResult({
  zh: '汉江春天会整理您的体检目的、既往结果、家族病史、慢性病情况和来韩时间,连接到适合的韩国体检中心、专科咨询或功能医学方向。最终的检查项目、麻醉适应性和诊断判断需由机构和专科医生确认。',
  ko: '한강애봄은 검진 목적, 기존 결과, 가족력, 만성질환 여부와 방한 일정을 정리하여 적합한 한국 건강검진 센터, 전문 상담, 또는 기능의학 방향으로 연결해 드립니다. 최종 검사 항목, 마취 적합성 및 진단 판단은 의료기관과 전문의가 확인합니다.',
  en: 'Hangangaeborn will help organize your checkup purpose, existing results, family medical history, chronic conditions, and visit timing, then connect you with a suitable Korean health checkup center, specialist consultation, or functional medicine direction. The final test items, anesthesia eligibility, and diagnostic judgment will be confirmed by the institution and the specialist.',
  ar: 'سيساعدك هانغانغايبورن في تنظيم هدف فحصك ونتائجك الحالية وتاريخك العائلي وحالاتك المزمنة وموعد زيارتك، ثم ربطك بمركز فحص صحي كوري مناسب أو استشارة تخصصية أو اتجاه طب وظيفي. يتم تأكيد عناصر الفحص النهائية وأهلية التخدير والحكم التشخيصي من قبل المؤسسة والأخصائي.',
})

export const CONCERN_CARDS: Partial<Record<string, ConcernCard>> = {
  'younger-look': {
    zh: {
      title: '生成我的年轻感咨询卡',
      copyHeader: '【年轻感咨询卡】',
      questions: [
        { label: '显老部位', q: '您觉得自己最显老的地方是哪里？', opts: ['眼周细纹或眼袋', '法令纹明显', '脸部松弛下垂', '皮肤暗沉没有光泽', '毛孔粗大、肤质粗糙', '脸部凹陷或疲惫感', '整体看起来没精神'] },
        { label: '改善方向', q: '您希望改善后的感觉更接近哪一种？', opts: ['自然年轻一点', '看起来更有精神', '皮肤更干净透亮', '脸部更紧致', '拍照更上镜', '不想被别人看出做过', '想做长期抗衰管理'] },
        { label: '既往项目', q: '您以前做过哪些项目？', opts: ['没做过，第一次了解', '水光/皮肤管理', '激光/色斑/毛孔项目', '提升类项目', '填充/容量支撑类项目', '肉毒/表情纹相关项目', '做过但效果不满意'] },
        { label: '恢复期', q: '您能接受的恢复期是？', opts: ['几乎没有恢复期', '1-3天', '4-7天', '1周以上也可以', '来韩国期间不能影响行程', '不确定，想先了解'] },
        { label: '担心点', q: '您最担心什么？', opts: ['不自然', '脸变僵', '疼痛', '恢复期太明显', '费用超出预期', '医生审美不适合', '不知道该做皮肤还是提升'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '还没确定', '先线上了解'] },
        { label: '希望整理', q: '您希望汉江春天先帮您整理什么？', opts: ['适合先咨询的皮肤/提升方向', '需要准备的照片', '恢复期和停留时间', '参考预算方向', '韩国皮肤科咨询流程', '中文顾问沟通', '预约可行性'] },
      ],
      result: RC_YOUNGER_LOOK.zh,
    },
    ko: {
      title: '나의 젊은 인상 상담카드 만들기',
      copyHeader: '【젊은 인상 상담카드】',
      questions: [
        { label: '노안 부위', q: '본인이 가장 나이 들어 보인다고 느끼는 부분은?', opts: ['눈가 잔주름 또는 눈밑 지방', '팔자주름이 뚜렷함', '얼굴 처짐', '피부 칙칙함·광채 부족', '모공이 크고 피부결이 거침', '얼굴 꺼짐 또는 피곤한 인상', '전체적으로 생기가 없어 보임'] },
        { label: '원하는 느낌', q: '개선 후 원하는 느낌에 가장 가까운 것은?', opts: ['자연스럽게 조금 젊게', '더 생기 있어 보이게', '피부가 더 깨끗하고 환하게', '얼굴이 더 탄력 있게', '사진이 더 잘 나오게', '시술한 걸 들키지 않게', '장기적인 항노화 관리를 원함'] },
        { label: '기존 시술', q: '이전에 받아본 시술이 있나요?', opts: ['없음, 처음 알아봄', '수광주사/피부관리', '레이저·색소·모공 관련 시술', '리프팅 계열 시술', '필러/볼륨 지지 시술', '보톡스/표정주름 관련 시술', '받았지만 결과에 불만족'] },
        { label: '회복기간', q: '감수할 수 있는 회복기간은?', opts: ['회복기간이 거의 없으면 좋음', '1-3일', '4-7일', '1주 이상도 가능', '한국 체류 일정에 영향 주면 안 됨', '잘 모르겠음, 먼저 상담하고 싶음'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['부자연스러움', '얼굴이 굳어 보임', '통증', '회복기간이 너무 눈에 띔', '비용이 예상보다 클까 봐', '의사 미적 감각이 안 맞을까 봐', '피부과와 리프팅 중 뭘 골라야 할지 모름'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '아직 미정', '먼저 온라인으로'] },
        { label: '원하는 정리', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['먼저 상담할 피부/리프팅 방향', '준비할 사진 자료', '회복기간과 체류 일정', '참고 예산 방향', '한국 피부과 상담 절차', '중국어 상담사 소통', '예약 가능 여부'] },
      ],
      result: RC_YOUNGER_LOOK.ko,
    },
    en: {
      title: 'Build My Youthful Look Consultation Profile',
      copyHeader: '[Youthful Look Consultation Card]',
      questions: [
        { label: 'Aging area', q: 'Where do you feel you look oldest?', opts: ['Fine lines or bags around the eyes', 'Noticeable nasolabial folds', 'Facial sagging', 'Dull, lackluster skin', 'Large pores and rough texture', 'Facial hollowing or a tired look', 'Overall lack of vitality'] },
        { label: 'Desired feeling', q: 'Which feeling is closest to what you want after improvement?', opts: ['A bit younger, naturally', 'Look more refreshed', 'Cleaner and brighter skin', 'Firmer face', 'More photogenic', 'Not wanting it to be obvious I had something done', 'Want long-term anti-aging management'] },
        { label: 'Past treatments', q: 'What treatments have you had before?', opts: ['None, first time exploring this', 'Skin boosters/skin care', 'Laser/pigmentation/pore treatments', 'Lifting treatments', 'Filler/volume support', 'Botox/expression-line treatments', 'Had treatment but unsatisfied with results'] },
        { label: 'Downtime', q: 'How much downtime can you accept?', opts: ['Almost no downtime', '1-3 days', '4-7 days', 'A week or more is fine', 'Must not affect my Korea itinerary', 'Not sure, want to consult first'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Looking unnatural', 'Face looking stiff', 'Pain', 'Downtime being too visible', 'Cost exceeding expectations', "Doctor's aesthetic not matching mine", 'Not knowing whether to choose dermatology or lifting'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online consultation first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help organize first?', opts: ['Suitable skin/lifting direction to consult first', 'Photos to prepare', 'Downtime and stay schedule', 'Reference budget direction', 'Korean dermatology consultation process', 'Chinese-speaking concierge contact', 'Booking feasibility'] },
      ],
      result: RC_YOUNGER_LOOK.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة المظهر الشاب',
      copyHeader: '[بطاقة استشارة المظهر الشاب]',
      questions: [
        { label: 'منطقة الشيخوخة', q: 'أين تشعر أنك تبدو أكبر سناً؟', opts: ['خطوط دقيقة أو انتفاخ حول العين', 'خطوط أنف وفم واضحة', 'ترهل الوجه', 'بشرة شاحبة وباهتة', 'مسام كبيرة وملمس خشن', 'تجويف الوجه أو مظهر متعب', 'نقص عام في الحيوية'] },
        { label: 'الشعور المطلوب', q: 'أي شعور هو الأقرب لما تريده بعد التحسين؟', opts: ['أصغر سناً بشكل طبيعي', 'مظهر أكثر حيوية', 'بشرة أنظف وأكثر إشراقاً', 'وجه أكثر تماسكاً', 'أكثر ملاءمة للتصوير', 'لا أريد أن يلاحظ أحد أنني خضعت لإجراء', 'أريد إدارة طويلة الأمد لمكافحة الشيخوخة'] },
        { label: 'العلاجات السابقة', q: 'ما العلاجات التي خضعت لها سابقاً؟', opts: ['لا شيء، أستكشف الأمر لأول مرة', 'حقن تنشيط البشرة/العناية بالبشرة', 'علاجات الليزر/التصبغ/المسام', 'علاجات الرفع', 'الفيلر/دعم الحجم', 'البوتوكس/خطوط التعبير', 'خضعت لعلاج ولم أكن راضياً عن النتيجة'] },
        { label: 'فترة التعافي', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['لا أريد أي فترة تعافي تقريباً', '1-3 أيام', '4-7 أيام', 'أسبوع أو أكثر مقبول', 'لا يجب أن تؤثر على برنامج زيارتي لكوريا', 'غير متأكد، أريد الاستشارة أولاً'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الظهور بشكل غير طبيعي', 'تصلب ملامح الوجه', 'الألم', 'وضوح فترة التعافي بشكل ملحوظ', 'تجاوز التكلفة المتوقعة', 'عدم توافق رؤية الطبيب الجمالية', 'عدم معرفة الاختيار بين الجلدية أو الرفع'] },
        { label: 'موعد الزيارة', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن تنظيمه أولاً؟', opts: ['الاتجاه المناسب للبشرة/الرفع للاستشارة أولاً', 'الصور المطلوب تحضيرها', 'فترة التعافي وجدول الإقامة', 'اتجاه الميزانية المرجعية', 'إجراءات استشارة الجلدية الكورية', 'التواصل مع مستشار يتحدث الصينية', 'إمكانية الحجز'] },
      ],
      result: RC_YOUNGER_LOOK.ar,
    },
  },

  'slow-aging': {
    zh: {
      title: '生成我的慢衰老健康咨询卡',
      copyHeader: '【慢衰老健康咨询卡】',
      questions: [
        { label: '关注状态', q: '您最想了解哪一类身体状态？', opts: ['经常疲劳', '睡眠质量不好', '体重或体脂变化明显', '血糖、血脂、血压问题', '激素或更年期变化', '免疫力下降', '想系统了解身体年龄和长期风险'] },
        { label: '近期变化', q: '最近半年最明显的变化是什么？', opts: ['更容易累', '睡不深或早醒', '体重增加', '肌肉量减少', '记忆力或专注力下降', '情绪或压力变大', '检查结果出现异常'] },
        { label: '相关情况', q: '您是否有以下情况？', opts: ['有家族病史', '有慢性病', '长期服药', '长期熬夜或压力大', '饮食不规律', '最近体检异常', '不确定，需要先整理'] },
        { label: '咨询类型', q: '您想重点了解哪一类咨询？', opts: ['韩国精密体检', '功能医学检查', '代谢和体重管理', '睡眠和压力管理', '营养和生活方式管理', '激素/更年期相关咨询', '检查结果说明'] },
        { label: '停留时间', q: '您计划在韩国停留多久？', opts: ['1天以内', '2-3天', '3晚4天左右', '5天以上', '还没确定', '先线上咨询'] },
        { label: '担心点', q: '您最担心什么？', opts: ['不知道该做哪些检查', '检查项目太多但没重点', '结果看不懂', '费用超出预期', '时间安排不够', '语言沟通困难', '不知道韩国和中国体检有什么不同'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['整理适合的检查方向', '整理既往病史和资料', '说明韩国体检/功能医学流程', '规划来韩体检时间', '结果说明流程', '中文顾问沟通', '预约可行性确认'] },
      ],
      result: RC_SLOW_AGING.zh,
    },
    ko: {
      title: '나의 슬로우 에이징 건강 상담카드 만들기',
      copyHeader: '【슬로우 에이징 건강 상담카드】',
      questions: [
        { label: '관심 상태', q: '어떤 신체 상태를 가장 알고 싶나요?', opts: ['자주 피곤함', '수면 질 저하', '체중·체지방 변화가 뚜렷함', '혈당·혈중지질·혈압 문제', '호르몬 또는 갱년기 변화', '면역력 저하', '신체 나이와 장기적 위험을 체계적으로 알고 싶음'] },
        { label: '최근 변화', q: '최근 6개월간 가장 뚜렷한 변화는?', opts: ['더 쉽게 피곤해짐', '깊이 못 자거나 일찍 깸', '체중 증가', '근육량 감소', '기억력·집중력 저하', '감정·스트레스 증가', '검진 결과에서 이상 발견'] },
        { label: '관련 상황', q: '다음 중 해당되는 상황이 있나요?', opts: ['가족력 있음', '만성질환 있음', '장기 복약 중', '장기적 야간 활동 또는 스트레스', '불규칙한 식사', '최근 검진 이상', '잘 모르겠음, 먼저 정리가 필요함'] },
        { label: '상담 유형', q: '어떤 상담을 중점적으로 알고 싶나요?', opts: ['한국 정밀 건강검진', '기능의학 검사', '대사·체중 관리', '수면·스트레스 관리', '영양·생활습관 관리', '호르몬·갱년기 관련 상담', '검진 결과 설명'] },
        { label: '체류 기간', q: '한국에 얼마나 머무를 계획인가요?', opts: ['1일 이내', '2-3일', '3박 4일 정도', '5일 이상', '아직 미정', '먼저 온라인 상담'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['어떤 검사를 해야 할지 모름', '검사가 너무 많아 핵심을 놓칠까 봐', '결과를 이해하기 어려움', '비용이 예상보다 클까 봐', '시간이 부족할까 봐', '언어 소통', '한국과 중국 검진이 어떻게 다른지 모름'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['적합한 검사 방향 정리', '기존 병력과 자료 정리', '한국 검진·기능의학 절차 안내', '방한 검진 일정 계획', '결과 설명 절차', '중국어 상담사 소통', '예약 가능 여부 확인'] },
      ],
      result: RC_SLOW_AGING.ko,
    },
    en: {
      title: 'Build My Slow Aging Health Consultation Profile',
      copyHeader: '[Slow Aging Health Consultation Card]',
      questions: [
        { label: 'Focus area', q: 'Which body condition would you most like to understand?', opts: ['Frequent fatigue', 'Poor sleep quality', 'Noticeable weight/body fat changes', 'Blood sugar, lipid, or blood pressure issues', 'Hormonal or menopausal changes', 'Lowered immunity', 'Want a systematic understanding of body age and long-term risk'] },
        { label: 'Recent change', q: "What's the most noticeable change in the past 6 months?", opts: ['Getting tired more easily', 'Light sleep or early waking', 'Weight gain', 'Muscle mass loss', 'Declining memory or focus', 'Increased emotional stress', 'Abnormal checkup results'] },
        { label: 'Relevant history', q: 'Do any of the following apply to you?', opts: ['Family medical history', 'Chronic illness', 'Long-term medication', 'Chronic late nights or stress', 'Irregular diet', 'Recent abnormal checkup', 'Not sure, need to sort this out first'] },
        { label: 'Consultation focus', q: 'Which type of consultation would you like to focus on?', opts: ['Comprehensive Korean checkup', 'Functional medicine testing', 'Metabolism/weight management', 'Sleep/stress management', 'Nutrition/lifestyle management', 'Hormone/menopause consultation', 'Results explanation'] },
        { label: 'Stay duration', q: 'How long do you plan to stay in Korea?', opts: ['Within 1 day', '2-3 days', 'About 3 nights 4 days', '5+ days', 'Not decided', 'Online consultation first'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Not knowing which tests to take', 'Too many tests without focus', 'Not understanding the results', 'Costs exceeding expectations', 'Not enough time', 'Language communication', 'Not knowing how Korean and home-country checkups differ'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Organize a suitable test direction', 'Organize medical history and documents', 'Explain the Korean checkup/functional medicine process', 'Plan the Korea checkup schedule', 'Results explanation process', 'Chinese-speaking concierge contact', 'Check booking feasibility'] },
      ],
      result: RC_SLOW_AGING.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الشيخوخة البطيئة والصحة الشاملة',
      copyHeader: '[بطاقة استشارة الشيخوخة البطيئة والصحة الشاملة]',
      questions: [
        { label: 'مجال التركيز', q: 'ما الحالة الجسدية التي تريد فهمها أكثر؟', opts: ['التعب المتكرر', 'ضعف جودة النوم', 'تغيرات واضحة في الوزن/نسبة الدهون', 'مشاكل السكر أو الدهون أو ضغط الدم', 'تغيرات هرمونية أو سن الأمل', 'ضعف المناعة', 'أريد فهماً منهجياً لعمر الجسم والمخاطر طويلة الأمد'] },
        { label: 'التغير الأخير', q: 'ما أبرز تغير لاحظته في آخر 6 أشهر؟', opts: ['التعب بسهولة أكبر', 'نوم خفيف أو استيقاظ مبكر', 'زيادة الوزن', 'فقدان كتلة العضلات', 'تراجع الذاكرة أو التركيز', 'زيادة التوتر العاطفي', 'نتائج فحص غير طبيعية'] },
        { label: 'التاريخ المرتبط', q: 'هل ينطبق عليك أي من التالي؟', opts: ['تاريخ عائلي للمرض', 'مرض مزمن', 'دواء طويل الأمد', 'سهر أو ضغط نفسي مزمن', 'نظام غذائي غير منتظم', 'نتيجة فحص غير طبيعية مؤخراً', 'غير متأكد، أحتاج للتنظيم أولاً'] },
        { label: 'تركيز الاستشارة', q: 'أي نوع من الاستشارة تريد التركيز عليه؟', opts: ['فحص شامل كوري دقيق', 'فحوصات الطب الوظيفي', 'إدارة التمثيل الغذائي والوزن', 'إدارة النوم والتوتر', 'إدارة التغذية ونمط الحياة', 'استشارة الهرمونات/سن الأمل', 'شرح نتائج الفحص'] },
        { label: 'مدة الإقامة', q: 'كم ستبقى في كوريا؟', opts: ['يوم واحد أو أقل', '2-3 أيام', 'حوالي 3 ليالٍ و4 أيام', '5 أيام أو أكثر', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['عدم معرفة الفحوصات المطلوبة', 'كثرة الفحوصات دون تركيز', 'عدم فهم النتائج', 'تجاوز التكلفة المتوقعة', 'عدم كفاية الوقت', 'التواصل اللغوي', 'عدم معرفة الفرق بين الفحص الكوري وفحص بلدي'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['تنظيم اتجاه الفحص المناسب', 'تنظيم التاريخ الطبي والمستندات', 'شرح إجراءات الفحص الكوري/الطب الوظيفي', 'تخطيط جدول الفحص في كوريا', 'إجراءات شرح النتائج', 'التواصل مع مستشار يتحدث الصينية', 'التحقق من إمكانية الحجز'] },
      ],
      result: RC_SLOW_AGING.ar,
    },
  },

  'regen-medicine': {
    zh: {
      title: '生成我的再生医学咨询卡',
      copyHeader: '【再生医学咨询卡】',
      questions: [
        { label: '关注原因', q: '您关注再生医学咨询的原因是？', opts: ['关节疼痛', '运动后恢复变慢', '术后恢复管理', '组织/皮肤修复需求', '想做抗衰老咨询', '想了解韩国干细胞相关的合法范围', '只是想先了解大致范围'] },
        { label: '关注部位', q: '您最关注的部位是？', opts: ['膝关节', '肩部', '髋关节', '脊椎/颈部', '皮肤/组织修复', '免疫/炎症相关', '还不确定'] },
        { label: '现有资料', q: '您目前有哪些相关资料？', opts: ['影像资料', '诊断记录', '手术记录', '治疗记录', '本国体检结果', '没有相关资料', '不确定需要准备什么'] },
        { label: '咨询目的', q: '您最想先了解什么？', opts: ['哪些范围在韩国是合法可咨询的', '是否需要本人到场检查', '需要准备哪些资料', '适合的医疗机构', '恢复管理方向', '大概的停留时间', '想先了解风险和局限'] },
        { label: '担心点', q: '您最担心什么？', opts: ['合法性问题', '夸大宣传', '适应性是否合适我', '费用偏高', '需要做哪些检查', '停留时间是否够', '沟通是否清楚'] },
        { label: '来韩时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '还没确定', '先线上了解'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['整理医疗资料', '说明韩国合法可咨询范围', '判断适合的专科方向', '整理来韩前的准备事项', '预约可行性', '中文顾问沟通', '说明咨询流程'] },
      ],
      result: RC_REGEN_MEDICINE.zh,
    },
    ko: {
      title: '나의 재생의학 상담카드 만들기',
      copyHeader: '【재생의학 상담카드】',
      questions: [
        { label: '관심 이유', q: '재생의학 상담에 관심을 갖게 된 이유는?', opts: ['관절 통증', '운동 후 회복이 느려짐', '수술 후 회복 관리', '조직/피부 회복 필요', '항노화 상담을 받고 싶음', '한국의 줄기세포 관련 합법 범위를 알고 싶음', '대략적인 범위만 먼저 알고 싶음'] },
        { label: '관심 부위', q: '가장 관심 있는 부위는?', opts: ['무릎 관절', '어깨', '고관절', '척추/목', '피부/조직 회복', '면역/염증 관련', '아직 확실하지 않음'] },
        { label: '보유 자료', q: '현재 보유하고 있는 관련 자료는?', opts: ['영상 자료', '진단 기록', '수술 기록', '치료 기록', '본국 검진 결과', '관련 자료 없음', '무엇을 준비해야 할지 모름'] },
        { label: '상담 목적', q: '가장 먼저 알고 싶은 것은?', opts: ['한국에서 합법적으로 상담 가능한 범위', '본인이 직접 검진받아야 하는지 여부', '준비해야 할 자료', '적합한 의료기관', '회복 관리 방향', '대략적인 체류 기간', '먼저 위험과 한계를 알고 싶음'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['합법성 문제', '과장된 홍보', '나에게 적합한지 여부', '비용이 높을까 봐', '어떤 검사가 필요한지', '체류 기간이 충분한지', '소통이 명확할지'] },
        { label: '방한 시기', q: '언제쯥 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '아직 미정', '먼저 온라인으로'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['의료 자료 정리', '한국 내 합법 상담 가능 범위 설명', '적합한 전문 분야 판단', '방한 전 준비사항 정리', '예약 가능 여부', '중국어 상담사 소통', '상담 절차 설명'] },
      ],
      result: RC_REGEN_MEDICINE.ko,
    },
    en: {
      title: 'Build My Regenerative Medicine Consultation Profile',
      copyHeader: '[Regenerative Medicine Consultation Card]',
      questions: [
        { label: 'Reason for interest', q: 'Why are you interested in a regenerative medicine consultation?', opts: ['Joint pain', 'Slower recovery after exercise', 'Post-surgery recovery management', 'Tissue/skin repair needs', 'Want an anti-aging consultation', 'Want to know the legal scope of stem cells in Korea', 'Just want a general overview first'] },
        { label: 'Area of concern', q: 'Which area concerns you most?', opts: ['Knee joint', 'Shoulder', 'Hip joint', 'Spine/neck', 'Skin/tissue recovery', 'Immune/inflammation related', 'Not sure yet'] },
        { label: 'Existing documents', q: 'What related documents do you currently have?', opts: ['Imaging records', 'Diagnosis records', 'Surgery records', 'Treatment records', 'Home-country checkup results', 'No documents', 'Not sure what to prepare'] },
        { label: 'Consultation purpose', q: 'What would you like to know first?', opts: ['What scope is legally consultable in Korea', 'Whether I need to be examined in person', 'What documents to prepare', 'A suitable medical institution', 'Recovery management direction', 'A rough stay duration', 'Want to understand risks and limits first'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Legality concerns', 'Exaggerated marketing claims', 'Whether it suits my case', 'High cost', 'What tests are needed', 'Whether stay duration is enough', 'Whether communication will be clear'] },
        { label: 'Visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided', 'Online consultation first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Organize medical documents', 'Explain the legally consultable scope in Korea', 'Help judge a suitable specialty direction', 'Organize pre-visit preparations', 'Check booking feasibility', 'Chinese-speaking concierge contact', 'Explain the consultation process'] },
      ],
      result: RC_REGEN_MEDICINE.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الطب التجديدي',
      copyHeader: '[بطاقة استشارة الطب التجديدي]',
      questions: [
        { label: 'سبب الاهتمام', q: 'لماذا أنت مهتم باستشارة الطب التجديدي؟', opts: ['ألم المفاصل', 'تباطؤ التعافي بعد التمرين', 'إدارة التعافي بعد الجراحة', 'احتياج لإصلاح النسيج/البشرة', 'أريد استشارة لمكافحة الشيخوخة', 'أريد معرفة النطاق القانوني للخلايا الجذعية في كوريا', 'أريد فقط لمحة عامة أولاً'] },
        { label: 'منطقة الاهتمام', q: 'أي منطقة تهمك أكثر؟', opts: ['مفصل الركبة', 'الكتف', 'مفصل الفخذ', 'العمود الفقري/الرقبة', 'تعافي البشرة/النسيج', 'متعلق بالمناعة/الالتهاب', 'غير متأكد بعد'] },
        { label: 'المستندات الموجودة', q: 'ما المستندات ذات الصلة الموجودة لديك حالياً؟', opts: ['سجلات تصويرية', 'سجلات تشخيص', 'سجلات جراحية', 'سجلات علاج', 'نتائج فحص من بلدي', 'لا توجد مستندات', 'غير متأكد ماذا يجب تحضيره'] },
        { label: 'هدف الاستشارة', q: 'ما الذي تريد معرفته أولاً؟', opts: ['ما النطاق القانوني للاستشارة في كوريا', 'هل أحتاج للفحص الشخصي', 'ما المستندات المطلوب تحضيرها', 'مؤسسة طبية مناسبة', 'اتجاه إدارة التعافي', 'مدة إقامة تقريبية', 'أريد فهم المخاطر والحدود أولاً'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['مخاوف قانونية', 'دعاية مبالغ فيها', 'ملاءمة الحالة لي', 'تكلفة مرتفعة', 'ما الفحوصات المطلوبة', 'هل مدة الإقامة كافية', 'هل سيكون التواصل واضحاً'] },
        { label: 'موعد الزيارة', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'خلال هذا العام', 'غير محدد', 'استشارة عبر الإنترنت أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['تنظيم المستندات الطبية', 'شرح النطاق القانوني القابل للاستشارة في كوريا', 'مساعدة في تحديد التخصص المناسب', 'تنظيم تحضيرات ما قبل الزيارة', 'التحقق من إمكانية الحجز', 'التواصل مع مستشار يتحدث الصينية', 'شرح إجراءات الاستشارة'] },
      ],
      result: RC_REGEN_MEDICINE.ar,
    },
  },

  'face-contour': {
    zh: {
      title: '生成我的脸部线条咨询卡',
      copyHeader: '【脸部线条咨询卡】',
      questions: [
        { label: '线条问题', q: '您最想改善的脸部线条问题是？', opts: ['下颌线不清晰', '双下巴', '脸部松弛', '法令纹', '缺乏立体轮廓感', '看起来疲惫/凹陷', '缺少清爽的气质感'] },
        { label: '改善方式', q: '您更倾向哪种改善方式？', opts: ['倾向非手术方式', '皮肤提升类项目', '容量/填充相关', '脂肪/双下巴相关', '想比较手术与非手术', '可以考虑手术', '还不确定'] },
        { label: '在意部位', q: '您最在意的部位是？', opts: ['下颌线', '下巴', '法令纹', '脸颊', '颈部', '嘴角下垂', '整体脸部轮廓'] },
        { label: '恢复期', q: '您能接受的恢复期是？', opts: ['几乎没有恢复期', '1-3天', '4-7天', '1-2周', '更久也可以', '不确定'] },
        { label: '既往经历', q: '您以前有相关经历吗？', opts: ['没有', '做过提升类项目', '做过填充类项目', '做过轮廓/下巴相关项目', '做过但不满意', '在本国咨询过', '已经准备好照片'] },
        { label: '担心点', q: '您最担心什么？', opts: ['不自然', '脸变宽或浮肿', '医生审美不适合', '恢复期影响行程', '费用超出预期', '不知道该看皮肤科还是整形外科', '结果和预期不符'] },
        { label: '希望先获得', q: '您希望先获得什么？', opts: ['判断该看皮肤科还是整形外科', '需要准备的照片', '了解恢复期', '参考预算方向', '韩国咨询流程', '中文顾问沟通', '预约可行性确认'] },
      ],
      result: RC_FACE_CONTOUR.zh,
    },
    ko: {
      title: '나의 페이스라인 상담카드 만들기',
      copyHeader: '【페이스라인 상담카드】',
      questions: [
        { label: '라인 고민', q: '가장 개선하고 싶은 페이스라인 고민은?', opts: ['턱선이 명확하지 않음', '이중턱', '얼굴 처짐', '팔자주름', '입체적인 윤곽감 부족', '피곤하거나 꺼져 보임', '깨끗한 인상이 부족함'] },
        { label: '개선 방식', q: '어떤 개선 방식을 선호하나요?', opts: ['비수술 방식 선호', '리프팅 계열 시술', '볼륨/필러 관련', '지방/이중턱 관련', '수술과 비수술을 비교하고 싶음', '수술도 고려 가능', '아직 잘 모름'] },
        { label: '신경 쓰는 부위', q: '가장 신경 쓰는 부위는?', opts: ['턱선', '턱', '팔자주름', '볼', '목', '입꼬리 처짐', '전체적인 얼굴 윤곽'] },
        { label: '회복기간', q: '감수할 수 있는 회복기간은?', opts: ['회복기간이 거의 없으면 좋음', '1-3일', '4-7일', '1-2주', '더 길어도 가능', '잘 모르겠음'] },
        { label: '기존 경험', q: '이전에 관련 경험이 있나요?', opts: ['없음', '리프팅 시술 받음', '필러 시술 받음', '윤곽/턱 관련 시술 받음', '받았지만 불만족', '본국에서 상담받은 적 있음', '사진을 준비해 두었음'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['부자연스러움', '얼굴이 넓어지거나 부어 보임', '의사 미적 감각이 안 맞을까 봐', '회복기간이 일정에 영향', '비용이 예상보다 클까 봐', '피부과와 성형외과 중 뭘 골라야 할지 모름', '결과가 기대와 다를까 봐'] },
        { label: '원하는 우선 정보', q: '먼저 무엇을 알고 싶나요?', opts: ['피부과·성형외과 중 방향 판단', '준비할 사진', '회복기간 안내', '참고 예산 방향', '한국 상담 절차', '중국어 상담사 소통', '예약 가능 여부 확인'] },
      ],
      result: RC_FACE_CONTOUR.ko,
    },
    en: {
      title: 'Build My Face Contour Consultation Profile',
      copyHeader: '[Face Contour Consultation Card]',
      questions: [
        { label: 'Contour concern', q: 'Which face contour concern would you most like to improve?', opts: ['Unclear jawline', 'Double chin', 'Facial sagging', 'Nasolabial folds', 'Lack of defined contour', 'Tired or hollow look', 'Lacking a refreshed look'] },
        { label: 'Preferred approach', q: 'Which approach do you prefer?', opts: ['Prefer non-surgical', 'Skin lifting treatments', 'Volume/filler related', 'Fat/double-chin related', 'Want to compare surgical vs non-surgical', 'Open to surgery', 'Not sure yet'] },
        { label: 'Area of focus', q: 'Which area concerns you most?', opts: ['Jawline', 'Chin', 'Nasolabial folds', 'Cheeks', 'Neck', 'Drooping mouth corners', 'Overall face contour'] },
        { label: 'Downtime', q: 'How much downtime can you accept?', opts: ['Almost no downtime', '1-3 days', '4-7 days', '1-2 weeks', 'Longer is fine', 'Not sure'] },
        { label: 'Past experience', q: 'Do you have related past experience?', opts: ['None', 'Had lifting treatments', 'Had filler treatments', 'Had contour/chin-related treatments', 'Had treatment but unsatisfied', 'Consulted in home country before', 'Already have photos ready'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Looking unnatural', 'Face widening or swelling', "Doctor's aesthetic not matching mine", 'Downtime affecting my itinerary', 'Cost exceeding expectations', 'Not knowing dermatology vs plastic surgery', 'Results not matching expectations'] },
        { label: 'Preferred first step', q: 'What would you like to know first?', opts: ['Whether to consult dermatology or plastic surgery', 'Photos to prepare', 'Downtime information', 'Reference budget direction', 'Korean consultation process', 'Chinese-speaking concierge contact', 'Check booking feasibility'] },
      ],
      result: RC_FACE_CONTOUR.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة ملامح الوجه',
      copyHeader: '[بطاقة استشارة ملامح الوجه]',
      questions: [
        { label: 'مشكلة الملامح', q: 'ما مشكلة ملامح الوجه التي تريد تحسينها أكثر؟', opts: ['خط الفك غير واضح', 'الذقن المزدوجة', 'ترهل الوجه', 'خطوط الأنف والفم', 'نقص في تحديد الملامح', 'مظهر متعب أو غائر', 'نقص مظهر منتعش'] },
        { label: 'الطريقة المفضلة', q: 'أي طريقة تفضلها؟', opts: ['أفضل غير الجراحية', 'علاجات رفع البشرة', 'متعلق بالحجم/الفيلر', 'متعلق بالدهون/الذقن المزدوجة', 'أريد مقارنة الجراحي بغير الجراحي', 'منفتح على الجراحة', 'غير متأكد بعد'] },
        { label: 'منطقة التركيز', q: 'أي منطقة تهمك أكثر؟', opts: ['خط الفك', 'الذقن', 'خطوط الأنف والفم', 'الخدود', 'الرقبة', 'ترهل زوايا الفم', 'ملامح الوجه بشكل عام'] },
        { label: 'فترة التعافي', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['لا أريد أي فترة تعافي تقريباً', '1-3 أيام', '4-7 أيام', '1-2 أسبوع', 'أطول مقبول أيضاً', 'غير متأكد'] },
        { label: 'الخبرة السابقة', q: 'هل لديك خبرة سابقة ذات صلة؟', opts: ['لا', 'خضعت لعلاجات رفع', 'خضعت لعلاجات فيلر', 'خضعت لعلاجات ملامح/ذقن', 'خضعت لعلاج ولم أكن راضياً', 'استشرت في بلدي سابقاً', 'لدي صور جاهزة بالفعل'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الظهور بشكل غير طبيعي', 'اتساع الوجه أو التورم', 'عدم توافق رؤية الطبيب الجمالية', 'تأثير فترة التعافي على برنامجي', 'تجاوز التكلفة المتوقعة', 'عدم معرفة الفرق بين الجلدية والتجميل الجراحي', 'عدم تطابق النتائج مع التوقعات'] },
        { label: 'الخطوة الأولى المفضلة', q: 'ما الذي تريد معرفته أولاً؟', opts: ['استشارة الجلدية أم التجميل الجراحي', 'الصور المطلوب تحضيرها', 'معلومات عن فترة التعافي', 'اتجاه الميزانية المرجعية', 'إجراءات الاستشارة الكورية', 'التواصل مع مستشار يتحدث الصينية', 'التحقق من إمكانية الحجز'] },
      ],
      result: RC_FACE_CONTOUR.ar,
    },
  },

  'surgery-interest': {
    zh: {
      title: '生成我的整形医美咨询卡',
      copyHeader: '【整形医美咨询卡】',
      questions: [
        { label: '关注部位', q: '您最关注哪个部位？', opts: ['眼部', '鼻部', '脸部轮廓', '下巴/下颌线', '眼下/泪沟', '脂肪移植', '面部年轻化'] },
        { label: '手术想法', q: '您目前对手术的想法是？', opts: ['已经决定要做', '想先确认是否适合', '想比较手术与非手术', '更倾向非手术', '担心恢复期', '担心风险', '还没决定'] },
        { label: '改善感觉', q: '您希望改善后的感觉是？', opts: ['更自然', '更精致', '更年轻', '更优雅', '五官更协调', '脸型更清晰', '不想变化太大'] },
        { label: '恢复期', q: '您能接受的恢复期是？', opts: ['3天以内', '约1周', '约2周', '1个月也可以', '不能影响工作', '看具体项目', '不确定'] },
        { label: '既往经历', q: '您以前有相关经历吗？', opts: ['没有整形经历', '做过皮肤美容项目', '做过眼/鼻/轮廓项目', '想做修复项目', '在本国咨询过', '已经准备好照片/资料', '没有准备资料'] },
        { label: '担心点', q: '您最担心什么？', opts: ['不自然', '医生审美不适合', '手术风险', '恢复期太长', '费用', '语言沟通', '不知道先咨询哪个部位'] },
        { label: '希望整理', q: '您希望汉江春天先帮您整理什么？', opts: ['适合先咨询的部位', '需要准备的照片/资料', '手术与非手术方向', '恢复期和来韩时间', '参考预算方向', '中文顾问沟通', '预约流程'] },
      ],
      result: RC_SURGERY_INTEREST.zh,
    },
    ko: {
      title: '나의 성형 상담카드 만들기',
      copyHeader: '【성형 상담카드】',
      questions: [
        { label: '관심 부위', q: '가장 관심 있는 부위는?', opts: ['눈', '코', '얼굴 윤곽', '턱/턱선', '눈밑/눈물고랑', '지방이식', '안면 리쥬베네이션'] },
        { label: '수술 생각', q: '현재 수술에 대한 생각은?', opts: ['이미 하기로 결정함', '먼저 적합한지 확인하고 싶음', '수술과 비수술을 비교하고 싶음', '비수술을 더 선호함', '회복기간이 걱정됨', '위험이 걱정됨', '아직 결정하지 못함'] },
        { label: '원하는 느낌', q: '개선 후 원하는 느낌은?', opts: ['더 자연스럽게', '더 세련되게', '더 젊게', '더 우아하게', '얼굴이 더 조화롭게', '얼굴형이 더 선명하게', '너무 큰 변화는 원하지 않음'] },
        { label: '회복기간', q: '감수할 수 있는 회복기간은?', opts: ['3일 이내', '약 1주', '약 2주', '1개월도 가능', '업무에 영향 주면 안 됨', '시술/수술 종류에 따라 다름', '잘 모르겠음'] },
        { label: '기존 경험', q: '이전에 관련 경험이 있나요?', opts: ['성형 경험 없음', '피부 미용 시술 받음', '눈/코/윤곽 시술 받음', '재수술을 원함', '본국에서 상담받은 적 있음', '사진/자료 준비됨', '자료 준비 안 됨'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['부자연스러움', '의사 미적 감각이 안 맞을까 봐', '수술 위험', '회복기간이 너무 길까 봐', '비용', '언어 소통', '어느 부위부터 상담해야 할지 모름'] },
        { label: '원하는 정리', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['먼저 상담할 부위', '준비할 사진/자료', '수술/비수술 방향', '회복기간과 방한 시기', '참고 예산 방향', '중국어 상담사 소통', '예약 절차'] },
      ],
      result: RC_SURGERY_INTEREST.ko,
    },
    en: {
      title: 'Build My Plastic Surgery Consultation Profile',
      copyHeader: '[Plastic Surgery Consultation Card]',
      questions: [
        { label: 'Area of interest', q: 'Which area interests you most?', opts: ['Eyes', 'Nose', 'Facial contour', 'Chin/jawline', 'Under-eye/tear trough', 'Fat grafting', 'Facial rejuvenation'] },
        { label: 'Surgical intent', q: 'What is your current thinking about surgery?', opts: ['Already decided to proceed', 'Want to check suitability first', 'Want to compare surgical vs non-surgical', 'Prefer non-surgical', 'Worried about downtime', 'Worried about risk', 'Not decided yet'] },
        { label: 'Desired feeling', q: 'What feeling do you want after improvement?', opts: ['More natural', 'More refined', 'Younger', 'More elegant', 'More balanced features', 'A clearer face shape', "Don't want a drastic change"] },
        { label: 'Downtime', q: 'How much downtime can you accept?', opts: ['Within 3 days', 'About 1 week', 'About 2 weeks', 'Even 1 month is fine', 'Must not affect work', 'Depends on the procedure', 'Not sure'] },
        { label: 'Past experience', q: 'Do you have related past experience?', opts: ['No plastic surgery experience', 'Had skin aesthetics treatments', 'Had eye/nose/contour procedures', 'Want a revision procedure', 'Consulted in home country before', 'Photos/documents already ready', 'No documents prepared'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Looking unnatural', "Doctor's aesthetic not matching mine", 'Surgical risk', 'Downtime too long', 'Cost', 'Language communication', 'Not knowing which area to consult first'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help organize first?', opts: ['Suitable area to consult first', 'Photos/documents to prepare', 'Surgical vs non-surgical direction', 'Downtime and visit timing', 'Reference budget direction', 'Chinese-speaking concierge contact', 'Booking process'] },
      ],
      result: RC_SURGERY_INTEREST.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة التجميل الجراحي',
      copyHeader: '[بطاقة استشارة التجميل الجراحي]',
      questions: [
        { label: 'منطقة الاهتمام', q: 'أي منطقة تهمك أكثر؟', opts: ['العيون', 'الأنف', 'ملامح الوجه', 'الذقن/خط الفك', 'تحت العين/قناة الدمع', 'نقل الدهون', 'تجديد الوجه'] },
        { label: 'النية الجراحية', q: 'ما رأيك الحالي في الجراحة؟', opts: ['قررت بالفعل المضي قدماً', 'أريد التحقق من الملاءمة أولاً', 'أريد مقارنة الجراحي بغير الجراحي', 'أفضل غير الجراحي', 'قلق بشأن فترة التعافي', 'قلق بشأن الخطر', 'لم أقرر بعد'] },
        { label: 'الشعور المطلوب', q: 'ما الشعور الذي تريده بعد التحسين؟', opts: ['أكثر طبيعية', 'أكثر دقة', 'أصغر سناً', 'أكثر أناقة', 'ملامح متوازنة أكثر', 'شكل وجه أوضح', 'لا أريد تغييراً كبيراً'] },
        { label: 'فترة التعافي', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['ضمن 3 أيام', 'حوالي أسبوع', 'حوالي أسبوعين', 'شهر واحد مقبول أيضاً', 'لا يجب أن تؤثر على العمل', 'يعتمد على الإجراء', 'غير متأكد'] },
        { label: 'الخبرة السابقة', q: 'هل لديك خبرة سابقة ذات صلة؟', opts: ['لا خبرة في التجميل الجراحي', 'خضعت لعلاجات تجميل جلدي', 'خضعت لإجراءات عيون/أنف/ملامح', 'أريد إجراء تصحيحي', 'استشرت في بلدي سابقاً', 'الصور/المستندات جاهزة بالفعل', 'لا توجد مستندات جاهزة'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['الظهور بشكل غير طبيعي', 'عدم توافق رؤية الطبيب الجمالية', 'الخطر الجراحي', 'فترة تعافي طويلة جداً', 'التكلفة', 'التواصل اللغوي', 'عدم معرفة المنطقة التي يجب استشارتها أولاً'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن تنظيمه أولاً؟', opts: ['المنطقة المناسبة للاستشارة أولاً', 'الصور/المستندات المطلوب تحضيرها', 'الاتجاه الجراحي أو غير الجراحي', 'فترة التعافي وموعد الزيارة', 'اتجاه الميزانية المرجعية', 'التواصل مع مستشار يتحدث الصينية', 'إجراءات الحجز'] },
      ],
      result: RC_SURGERY_INTEREST.ar,
    },
  },

  'fatigue-look': {
    zh: {
      title: '生成我的疲惫感改善咨询卡',
      copyHeader: '【疲惫感改善咨询卡】',
      questions: [
        { label: '表现', q: '您的疲惫感主要表现在哪里？', opts: ['黑眼圈', '眼袋/泪沟', '皮肤暗沉', '脸部凹陷', '皮肤粗糙', '经常看起来很累', '身体也容易疲劳'] },
        { label: '持续时间', q: '这种状态持续多久了？', opts: ['1个月', '3个月以上', '半年以上', '1年以上', '一直都是这样', '不确定'] },
        { label: '原因方向', q: '您觉得可能的原因是？', opts: ['皮肤状态问题', '眼部相关问题', '睡眠不足', '压力', '体力下降', '体重/代谢变化', '不确定，需要先了解方向'] },
        { label: '咨询方向', q: '您想优先咨询哪个方向？', opts: ['皮肤医美', '眼部改善', '健康体检', '功能医学', '抗衰管理', '营养/生活方式管理', '不知道从哪里开始'] },
        { label: '恢复期', q: '您能接受的恢复期是？', opts: ['几乎没有恢复期', '1-3天', '4-7天', '更久也可以', '不能影响韩国行程', '不确定'] },
        { label: '担心点', q: '您最担心什么？', opts: ['只改善皮肤但没解决根本问题', '不知道该看皮肤科还是做体检', '费用', '恢复期明显', '看不懂医疗信息', '沟通不清楚', '选错了服务方向'] },
        { label: '希望帮助', q: '您希望汉江春天先帮您做什么？', opts: ['先判断皮肤还是健康方向', '整理眼部/皮肤/疲劳相关问题', '整理需要准备的照片/检查资料', '说明恢复期和停留安排', '中文顾问沟通', '预约可行性', '整理初步咨询方向'] },
      ],
      result: RC_FATIGUE_LOOK.zh,
    },
    ko: {
      title: '나의 피곤한 인상 개선 상담카드 만들기',
      copyHeader: '【피곤한 인상 개선 상담카드】',
      questions: [
        { label: '나타나는 증상', q: '피곤한 인상이 주로 어디에 나타나나요?', opts: ['다크서클', '눈밑 지방/눈물고랑', '피부 칙칙함', '얼굴 꺼짐', '피부 거칠음', '자주 피곤해 보임', '몸도 쉽게 피곤해짐'] },
        { label: '지속 기간', q: '이런 상태가 얼마나 지속되었나요?', opts: ['1개월', '3개월 이상', '6개월 이상', '1년 이상', '항상 이런 상태였음', '잘 모르겠음'] },
        { label: '원인 방향', q: '가능한 원인이라고 생각되는 것은?', opts: ['피부 상태 문제', '눈가 관련 문제', '수면 부족', '스트레스', '체력 저하', '체중/대사 변화', '잘 모르겠음, 먼저 방향이 필요함'] },
        { label: '상담 방향', q: '어떤 방향을 우선 상담받고 싶나요?', opts: ['피부 의료미용', '눈가 개선', '건강검진', '기능의학', '항노화 관리', '영양/생활습관 관리', '어디서부터 시작할지 모름'] },
        { label: '회복기간', q: '감수할 수 있는 회복기간은?', opts: ['회복기간이 거의 없으면 좋음', '1-3일', '4-7일', '더 길어도 가능', '한국 일정에 영향 주면 안 됨', '잘 모르겠음'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['피부만 개선하고 근본 문제는 못 해결할까 봐', '피부과인지 검진인지 모름', '비용', '회복기간이 눈에 띔', '의료 정보를 이해하기 어려움', '소통이 명확하지 않음', '잘못된 서비스 방향을 선택할까 봐'] },
        { label: '원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['피부 방향인지 건강 방향인지 먼저 판단', '눈가/피부/피로 관련 문제 정리', '준비할 사진/검진 자료 정리', '회복기간과 체류 일정 안내', '중국어 상담사 소통', '예약 가능 여부', '초기 상담 방향 정리'] },
      ],
      result: RC_FATIGUE_LOOK.ko,
    },
    en: {
      title: 'Build My Tired Look Improvement Consultation Profile',
      copyHeader: '[Tired Look Improvement Consultation Card]',
      questions: [
        { label: 'Where it shows', q: 'Where does your tired look mainly show?', opts: ['Dark circles', 'Under-eye bags/tear trough', 'Dull skin tone', 'Facial hollowing', 'Rough skin', 'Often look tired', 'Body also tires easily'] },
        { label: 'Duration', q: 'How long has this been going on?', opts: ['1 month', '3+ months', '6+ months', '1+ year', 'Always been like this', 'Not sure'] },
        { label: 'Likely cause', q: 'What do you think the possible cause is?', opts: ['Skin condition issue', 'Eye-area related issue', 'Lack of sleep', 'Stress', 'Declining stamina', 'Weight/metabolism change', 'Not sure, need direction first'] },
        { label: 'Consultation direction', q: 'Which direction would you like to consult first?', opts: ['Skin aesthetics', 'Eye-area improvement', 'Health checkup', 'Functional medicine', 'Anti-aging management', 'Nutrition/lifestyle management', "Don't know where to start"] },
        { label: 'Downtime', q: 'How much downtime can you accept?', opts: ['Almost no downtime', '1-3 days', '4-7 days', 'Longer is fine', 'Must not affect my Korea itinerary', 'Not sure'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Only fixing skin without solving the underlying issue', 'Not knowing whether to choose dermatology or a checkup', 'Cost', 'Visible downtime', "Can't understand medical information", "Communication isn't clear", 'Choosing the wrong service direction'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help with first?', opts: ['Judge skin vs. health direction first', 'Organize eye-area/skin/fatigue issues', 'Organize photos/checkup documents to prepare', 'Explain downtime and stay arrangements', 'Chinese-speaking concierge contact', 'Check booking feasibility', 'Organize an initial consultation direction'] },
      ],
      result: RC_FATIGUE_LOOK.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة تحسين المظهر المتعب',
      copyHeader: '[بطاقة استشارة تحسين المظهر المتعب]',
      questions: [
        { label: 'مكان الظهور', q: 'أين يظهر مظهرك المتعب بشكل أساسي؟', opts: ['هالات سوداء', 'انتفاخ تحت العين/قناة الدمع', 'بشرة شاحبة', 'تجويف الوجه', 'بشرة خشنة', 'أبدو متعباً غالباً', 'الجسم أيضاً يتعب بسهولة'] },
        { label: 'المدة', q: 'منذ متى يستمر هذا الوضع؟', opts: ['شهر واحد', '3 أشهر أو أكثر', '6 أشهر أو أكثر', 'سنة أو أكثر', 'دائماً كان هكذا', 'غير متأكد'] },
        { label: 'السبب المحتمل', q: 'ما السبب المحتمل في رأيك؟', opts: ['مشكلة في حالة البشرة', 'مشكلة متعلقة بمنطقة العين', 'قلة النوم', 'التوتر', 'تراجع اللياقة', 'تغير الوزن/التمثيل الغذائي', 'غير متأكد، أحتاج لتوجيه أولاً'] },
        { label: 'اتجاه الاستشارة', q: 'أي اتجاه تريد استشارته أولاً؟', opts: ['تجميل البشرة', 'تحسين منطقة العين', 'الفحص الصحي', 'الطب الوظيفي', 'إدارة مكافحة الشيخوخة', 'إدارة التغذية ونمط الحياة', 'لا أعرف من أين أبدأ'] },
        { label: 'فترة التعافي', q: 'كم فترة تعافي يمكنك قبولها؟', opts: ['لا أريد أي فترة تعافي تقريباً', '1-3 أيام', '4-7 أيام', 'أطول مقبول أيضاً', 'لا يجب أن تؤثر على برنامج زيارتي لكوريا', 'غير متأكد'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['إصلاح البشرة فقط دون حل المشكلة الجذرية', 'عدم معرفة الاختيار بين الجلدية أو الفحص', 'التكلفة', 'وضوح فترة التعافي', 'عدم فهم المعلومات الطبية', 'عدم وضوح التواصل', 'اختيار اتجاه الخدمة الخاطئ'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن مساعدتك به أولاً؟', opts: ['تحديد اتجاه البشرة أم الصحة أولاً', 'تنظيم مشاكل منطقة العين/البشرة/التعب', 'تنظيم الصور/مستندات الفحص المطلوب تحضيرها', 'شرح فترة التعافي وترتيبات الإقامة', 'التواصل مع مستشار يتحدث الصينية', 'التحقق من إمكانية الحجز', 'تنظيم اتجاه استشارة أولي'] },
      ],
      result: RC_FATIGUE_LOOK.ar,
    },
  },

  'korea-trip-worry': {
    zh: {
      title: '生成我的赴韩医疗行程咨询卡',
      copyHeader: '【赴韩医疗行程咨询卡】',
      questions: [
        { label: '担心部分', q: '您最担心行程中的哪一部分？', opts: ['不知道选哪家医院', '不知道怎么预约', '担心语言问题', '担心交通安排', '担心住宿位置', '担心听不懂检查/术后说明', '担心行程太赶'] },
        { label: '主要目的', q: '您此次赴韩的主要目的是？', opts: ['皮肤医美', '整形咨询', '健康体检', '功能医学/抗衰管理', '女性/男性健康', '陪同家人治疗', '还没决定'] },
        { label: '同行人数', q: '同行人数是？', opts: ['1人', '2人', '3人', '4人', '5人以上', '还没确定'] },
        { label: '停留时长', q: '您计划停留多久？', opts: ['1-2天', '3晚4天', '5-7天', '1周以上', '取决于医疗项目', '还没确定'] },
        { label: '需要支持', q: '您最需要哪些支持？', opts: ['医院预约', '中文翻译', '院内陪同', '车辆接送', '住宿位置建议', '结果说明', '全程协调'] },
        { label: '担心费用', q: '您最担心哪部分费用？', opts: ['医疗项目费用', '翻译/陪同费用', '车辆费用', '住宿费用', '行程变动费用', '总预算超出预期', '不确定'] },
        { label: '希望先获得', q: '您希望先获得什么？', opts: ['初步行程方向', '医院咨询方向', '翻译/陪同范围', '车辆与住宿动线', '参考预算方向', '预约可行性', '中文顾问联系方式'] },
      ],
      result: RC_KOREA_TRIP_WORRY.zh,
    },
    ko: {
      title: '나의 방한 의료 일정 상담카드 만들기',
      copyHeader: '【방한 의료 일정 상담카드】',
      questions: [
        { label: '걱정되는 부분', q: '일정 중 가장 걱정되는 부분은?', opts: ['어느 병원을 골라야 할지 모름', '예약 방법을 모름', '언어 문제가 걱정됨', '교통 안배가 걱정됨', '숙소 위치가 걱정됨', '검사/수술 후 설명을 못 알아들을까 걱정됨', '일정이 너무 빡빡할까 걱정됨'] },
        { label: '주요 목적', q: '이번 방한의 주요 목적은?', opts: ['피부 의료미용', '성형 상담', '건강검진', '기능의학/항노화 관리', '여성/남성 건강', '가족 치료 동행', '아직 결정 못함'] },
        { label: '동행 인원', q: '동행 인원은?', opts: ['1명', '2명', '3명', '4명', '5명 이상', '아직 미정'] },
        { label: '체류 기간', q: '체류 기간 계획은?', opts: ['1-2일', '3박 4일', '5-7일', '1주 이상', '의료 항목에 따라 다름', '아직 미정'] },
        { label: '필요한 지원', q: '가장 필요한 지원은?', opts: ['병원 예약', '중국어 통역', '병원 내 동행', '차량 픽업', '숙소 위치 추천', '결과 설명', '전체 일정 조율'] },
        { label: '걱정되는 비용', q: '가장 걱정되는 비용 부분은?', opts: ['의료 항목 비용', '통역/동행 비용', '차량 비용', '숙소 비용', '일정 변경 비용', '총 예산이 예상보다 클까 봐', '잘 모르겠음'] },
        { label: '원하는 우선 정보', q: '먼저 무엇을 받고 싶나요?', opts: ['초기 일정 방향', '병원 상담 방향', '통역/동행 범위', '차량과 숙소 동선', '참고 예산 방향', '예약 가능 여부', '중국어 상담사 연락처'] },
      ],
      result: RC_KOREA_TRIP_WORRY.ko,
    },
    en: {
      title: 'Build My Korea Medical Trip Consultation Profile',
      copyHeader: '[Korea Medical Trip Consultation Card]',
      questions: [
        { label: 'Biggest worry', q: 'Which part of the trip worries you most?', opts: ['Not knowing which hospital to choose', 'Not knowing how to book', 'Worried about language', 'Worried about transportation', 'Worried about accommodation location', 'Worried about not understanding exam/post-op explanations', 'Worried the itinerary will be too rushed'] },
        { label: 'Main purpose', q: 'What is the main purpose of this Korea trip?', opts: ['Skin aesthetics', 'Plastic surgery consultation', 'Health checkup', 'Functional medicine/anti-aging management', "Women's/men's health", 'Accompanying family for treatment', 'Not decided yet'] },
        { label: 'Number of companions', q: 'How many people are traveling together?', opts: ['1 person', '2 people', '3 people', '4 people', '5+ people', 'Not decided'] },
        { label: 'Stay duration', q: 'How long do you plan to stay?', opts: ['1-2 days', '3 nights 4 days', '5-7 days', '1+ week', 'Depends on the medical procedure', 'Not decided'] },
        { label: 'Support needed', q: 'What support do you need most?', opts: ['Hospital booking', 'Chinese interpretation', 'In-hospital escort', 'Vehicle pickup', 'Accommodation location advice', 'Results explanation', 'Full-process coordination'] },
        { label: 'Cost worry', q: 'Which cost worries you most?', opts: ['Medical procedure cost', 'Interpretation/escort cost', 'Vehicle cost', 'Accommodation cost', 'Itinerary-change cost', 'Total budget exceeding expectations', 'Not sure'] },
        { label: 'Preferred first step', q: 'What would you like to receive first?', opts: ['Initial itinerary direction', 'Hospital consultation direction', 'Interpretation/escort scope', 'Vehicle and accommodation routing', 'Reference budget direction', 'Booking feasibility', 'Chinese-speaking concierge contact'] },
      ],
      result: RC_KOREA_TRIP_WORRY.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة رحلة العلاج في كوريا',
      copyHeader: '[بطاقة استشارة رحلة العلاج في كوريا]',
      questions: [
        { label: 'أكبر قلق', q: 'أي جزء من الرحلة يقلقك أكثر؟', opts: ['عدم معرفة المستشفى المناسب', 'عدم معرفة كيفية الحجز', 'القلق بشأن اللغة', 'القلق بشأن النقل', 'القلق بشأن موقع الإقامة', 'القلق من عدم فهم شروحات الفحص/ما بعد الجراحة', 'القلق من أن يكون البرنامج مزدحماً جداً'] },
        { label: 'الهدف الرئيسي', q: 'ما الهدف الرئيسي من رحلة كوريا هذه؟', opts: ['تجميل البشرة', 'استشارة التجميل الجراحي', 'الفحص الصحي', 'الطب الوظيفي/إدارة مكافحة الشيخوخة', 'صحة المرأة/الرجل', 'مرافقة أحد أفراد العائلة للعلاج', 'لم يتقرر بعد'] },
        { label: 'عدد المرافقين', q: 'كم عدد المسافرين معاً؟', opts: ['شخص واحد', 'شخصان', '3 أشخاص', '4 أشخاص', '5 أشخاص أو أكثر', 'غير محدد'] },
        { label: 'مدة الإقامة', q: 'كم تخطط للإقامة؟', opts: ['1-2 يوم', '3 ليالٍ و4 أيام', '5-7 أيام', 'أسبوع أو أكثر', 'يعتمد على الإجراء الطبي', 'غير محدد'] },
        { label: 'الدعم المطلوب', q: 'ما الدعم الذي تحتاجه أكثر؟', opts: ['حجز المستشفى', 'الترجمة الصينية', 'المرافقة داخل المستشفى', 'استقبال بالسيارة', 'نصيحة بموقع الإقامة', 'شرح النتائج', 'تنسيق العملية الكاملة'] },
        { label: 'قلق التكلفة', q: 'أي تكلفة تقلقك أكثر؟', opts: ['تكلفة الإجراء الطبي', 'تكلفة الترجمة/المرافقة', 'تكلفة السيارة', 'تكلفة الإقامة', 'تكلفة تغيير البرنامج', 'تجاوز الميزانية الإجمالية المتوقعة', 'غير متأكد'] },
        { label: 'الخطوة الأولى المفضلة', q: 'ما الذي تريد الحصول عليه أولاً؟', opts: ['اتجاه البرنامج الأولي', 'اتجاه استشارة المستشفى', 'نطاق الترجمة/المرافقة', 'مسار السيارة والإقامة', 'اتجاه الميزانية المرجعية', 'إمكانية الحجز', 'التواصل مع مستشار يتحدث الصينية'] },
      ],
      result: RC_KOREA_TRIP_WORRY.ar,
    },
  },

  'health-checkup': {
    zh: {
      title: '生成我的韩国体检咨询卡',
      copyHeader: '【韩国体检咨询卡】',
      questions: [
        { label: '了解原因', q: '您想了解韩国体检的原因是？', opts: ['想做更系统的体检', '看不懂本国体检结果', '有家族病史', '长期疲劳/不适', '想比较韩国和本国体检的不同', '想为父母安排体检', '想结合旅行一起安排'] },
        { label: '关注检查', q: '您最关注哪类检查？', opts: ['基础体检', '综合体检', '癌症筛查', '心血管风险', '内镜检查', '功能医学检测', '结果说明'] },
        { label: '当前状况', q: '您目前的身体状况是？', opts: ['没有特别症状，只是预防', '疲劳/睡眠不好', '体重/血糖/血脂异常', '消化不适', '血压/心血管风险', '过去有异常结果', '不确定，需要先整理'] },
        { label: '相关情况', q: '您是否有以下情况？', opts: ['有家族病史', '有慢性病', '长期服药', '过去一年没做过体检', '两年以上没做过系统体检', '在本国查过想来韩国复查', '想为父母安排体检'] },
        { label: '停留时长', q: '您计划停留多久？', opts: ['当天为主', '1-2天', '2-3天', '3晚4天', '需要预留结果说明的时间', '还没确定'] },
        { label: '担心点', q: '您最担心什么？', opts: ['不知道该选哪种套餐', '检查项目太多没有重点', '担心内镜/麻醉相关问题', '结果看不懂', '费用', '时间不够', '语言沟通'] },
        { label: '希望整理', q: '您希望汉江春天先帮您整理什么？', opts: ['适合的体检方向', '韩国与本国体检的差异说明', '需要准备的资料', '来韩体检日程', '结果说明流程', '参考预算方向', '中文顾问沟通'] },
      ],
      result: RC_HEALTH_CHECKUP.zh,
    },
    ko: {
      title: '나의 한국 건강검진 상담카드 만들기',
      copyHeader: '【한국 건강검진 상담카드】',
      questions: [
        { label: '관심 이유', q: '한국 건강검진에 관심을 갖게 된 이유는?', opts: ['더 체계적인 검진을 원함', '본국 검진 결과를 이해하기 어려움', '가족력이 있음', '장기적인 피로/불편감', '한국과 본국 검진의 차이를 비교하고 싶음', '부모님 검진을 준비하고 싶음', '여행과 함께 일정을 짜고 싶음'] },
        { label: '관심 검사', q: '가장 관심 있는 검사 종류는?', opts: ['기본 건강검진', '종합 건강검진', '암 검진', '심혈관 위험 검사', '내시경 검사', '기능의학 검사', '결과 설명'] },
        { label: '현재 상태', q: '현재 본인의 건강 상태는?', opts: ['특별한 증상 없음, 예방 목적', '피로/수면 불량', '체중·혈당·혈중지질 이상', '소화 불편', '혈압/심혈관 위험', '과거 이상 결과 있음', '잘 모르겠음, 먼저 정리가 필요함'] },
        { label: '관련 상황', q: '다음 중 해당되는 상황이 있나요?', opts: ['가족력 있음', '만성질환 있음', '장기 복약 중', '작년에 검진을 받지 않음', '2년 이상 체계적인 검진을 받지 않음', '본국에서 검진 후 한국에서 재검 원함', '부모님 검진을 준비하고 싶음'] },
        { label: '체류 기간', q: '체류 기간 계획은?', opts: ['당일 위주', '1-2일', '2-3일', '3박 4일', '결과 설명을 위한 시간이 필요함', '아직 미정'] },
        { label: '걱정되는 점', q: '가장 걱정되는 점은?', opts: ['어떤 패키지를 선택해야 할지 모름', '검사가 너무 많아 핵심이 없음', '내시경/마취 관련 걱정', '결과를 이해하기 어려움', '비용', '시간이 부족함', '언어 소통'] },
        { label: '원하는 정리', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['적합한 검진 방향', '한국과 본국 검진 차이 설명', '준비할 자료', '방한 검진 일정', '결과 설명 절차', '참고 예산 방향', '중국어 상담사 소통'] },
      ],
      result: RC_HEALTH_CHECKUP.ko,
    },
    en: {
      title: 'Build My Korea Health Checkup Consultation Profile',
      copyHeader: '[Korea Health Checkup Consultation Card]',
      questions: [
        { label: 'Reason for interest', q: 'Why are you interested in a Korean health checkup?', opts: ['Want a more systematic checkup', "Can't understand my home-country checkup results", 'Have a family medical history', 'Chronic fatigue/discomfort', 'Want to compare Korean and home-country checkups', 'Want to arrange a checkup for my parents', 'Want to combine it with travel'] },
        { label: 'Test focus', q: 'Which type of test interests you most?', opts: ['Basic health checkup', 'Comprehensive checkup', 'Cancer screening', 'Cardiovascular risk', 'Endoscopy', 'Functional medicine testing', 'Results explanation'] },
        { label: 'Current condition', q: "What's your current health condition?", opts: ['No particular symptoms, just prevention', 'Fatigue/poor sleep', 'Abnormal weight/blood sugar/lipids', 'Digestive discomfort', 'Blood pressure/cardiovascular risk', 'Had abnormal results in the past', 'Not sure, need to sort this out first'] },
        { label: 'Relevant history', q: 'Do any of the following apply to you?', opts: ['Family medical history', 'Chronic illness', 'Long-term medication', "Haven't had a checkup in the past year", "Haven't had a systematic checkup in 2+ years", 'Checked in home country, want a re-check in Korea', 'Want to arrange a checkup for my parents'] },
        { label: 'Stay duration', q: 'How long do you plan to stay?', opts: ['Mainly same-day', '1-2 days', '2-3 days', '3 nights 4 days', 'Need time reserved for results explanation', 'Not decided'] },
        { label: 'Biggest worry', q: 'What worries you most?', opts: ['Not knowing which package to choose', 'Too many tests without focus', 'Worried about endoscopy/anesthesia', "Can't understand the results", 'Cost', 'Not enough time', 'Language communication'] },
        { label: 'Preferred help', q: 'What would you like Hangangaeborn to help organize first?', opts: ['A suitable checkup direction', 'Explanation of differences between Korean and home-country checkups', 'Documents to prepare', 'A visit checkup schedule', 'Results explanation process', 'Reference budget direction', 'Chinese-speaking concierge contact'] },
      ],
      result: RC_HEALTH_CHECKUP.en,
    },
    ar: {
      title: 'إنشاء ملف استشارة الفحص الصحي الكوري',
      copyHeader: '[بطاقة استشارة الفحص الصحي الكوري]',
      questions: [
        { label: 'سبب الاهتمام', q: 'لماذا أنت مهتم بالفحص الصحي الكوري؟', opts: ['أريد فحصاً أكثر منهجية', 'لا أستطيع فهم نتائج فحصي في بلدي', 'لدي تاريخ عائلي للمرض', 'تعب مزمن/عدم راحة', 'أريد مقارنة الفحص الكوري بفحص بلدي', 'أريد ترتيب فحص لوالديّ', 'أريد دمجه مع السفر'] },
        { label: 'تركيز الفحص', q: 'أي نوع فحص يهمك أكثر؟', opts: ['فحص صحي أساسي', 'فحص شامل', 'فحص السرطان', 'خطر القلب والأوعية الدموية', 'تنظير', 'فحوصات الطب الوظيفي', 'شرح النتائج'] },
        { label: 'الحالة الحالية', q: 'ما حالتك الصحية الحالية؟', opts: ['لا أعراض خاصة، فقط للوقاية', 'تعب/نوم ضعيف', 'وزن/سكر/دهون غير طبيعية', 'عدم راحة هضمية', 'ضغط الدم/خطر القلب والأوعية الدموية', 'نتائج غير طبيعية في الماضي', 'غير متأكد، أحتاج للتنظيم أولاً'] },
        { label: 'التاريخ المرتبط', q: 'هل ينطبق عليك أي من التالي؟', opts: ['تاريخ عائلي للمرض', 'مرض مزمن', 'دواء طويل الأمد', 'لم أخضع لفحص في العام الماضي', 'لم أخضع لفحص منهجي منذ أكثر من عامين', 'فحصت في بلدي وأريد إعادة الفحص في كوريا', 'أريد ترتيب فحص لوالديّ'] },
        { label: 'مدة الإقامة', q: 'كم تخطط للإقامة؟', opts: ['نفس اليوم بشكل أساسي', '1-2 يوم', '2-3 أيام', '3 ليالٍ و4 أيام', 'أحتاج وقتاً مخصصاً لشرح النتائج', 'غير محدد'] },
        { label: 'أكبر قلق', q: 'ما أكثر ما يقلقك؟', opts: ['عدم معرفة الباقة المناسبة', 'كثرة الفحوصات دون تركيز', 'القلق بشأن التنظير/التخدير', 'عدم فهم النتائج', 'التكلفة', 'عدم كفاية الوقت', 'التواصل اللغوي'] },
        { label: 'المساعدة المطلوبة', q: 'ما الذي تريد من هانغانغايبورن تنظيمه أولاً؟', opts: ['اتجاه فحص مناسب', 'شرح الفروق بين الفحص الكوري وفحص بلدي', 'المستندات المطلوب تحضيرها', 'جدول فحص الزيارة', 'إجراءات شرح النتائج', 'اتجاه الميزانية المرجعية', 'التواصل مع مستشار يتحدث الصينية'] },
      ],
      result: RC_HEALTH_CHECKUP.ar,
    },
  },
}
