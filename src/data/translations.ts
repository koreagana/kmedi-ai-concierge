export type LangCode = 'zh' | 'ko' | 'en' | 'ar'

interface Translations {
  // brand
  brandName: string
  brandSub: string
  // hero
  heroTagline: string
  heroDesc: string
  heroCta1: string
  heroCta2: string
  // concierge section
  conciergeTitle: string
  concierge1Name: string
  concierge1Title: string
  concierge1Specialty: string
  concierge1Btn: string
  concierge2Name: string
  concierge2Title: string
  concierge2Specialty: string
  concierge2Btn: string
  // concern section
  concernTitle: string
  concern1: string; concern1Sub: string
  concern2: string; concern2Sub: string
  concern3: string; concern3Sub: string
  concern4: string; concern4Sub: string
  concern5: string; concern5Sub: string
  concern6: string; concern6Sub: string
  concern7: string; concern7Sub: string
  concern8: string; concern8Sub: string
  // category section
  categoryTitle: string
  // consultation card
  cardTitle: string
  cardQ1: string
  cardQ2: string
  cardQ3: string
  cardQ4: string
  cardQ5: string
  cardSubmit: string
  cardGenerated: string
  cardContactBtn: string
  // contact section
  contactTitle: string
  contactWechatBiz: string
  contactWechatPersonal: string
  contactWhatsapp: string
  contactForm: string
  contactEmail: string
  contactFormTitle: string
  contactFormName: string
  contactFormMsg: string
  contactFormSend: string
  contactQRHint: string
  contactClose: string
  // network section
  networkTitle: string
  networkSub: string
  networkDesc: string
  networkCard1Title: string
  networkCard1Desc: string
  networkCard1Reg: string
  networkCard2Title: string
  networkCard2Desc: string
  networkCard2Reg: string
  networkCard3Title: string
  networkCard3Desc: string
  networkCard3Status: string
  networkCard4Title: string
  networkCard4Desc: string
  // about
  aboutTitle: string
  aboutDesc: string
  // footer
  disclaimer: string
  // nav
  navConsult: string
  langZh: string
  langKo: string
  langEn: string
  langAr: string
  // category page
  backHome: string
  aiScript: string
  aiScriptExpand: string
  aiScriptCollapse: string
  makeCard: string
  // category info blocks
  blockSuitableFor: string
  blockCommonQuestions: string
  blockBeforeVisit: string
  blockAfterConsult: string
}

export const translations: Record<LangCode, Translations> = {
  zh: {
    brandName: '汉江春天',
    brandSub: 'AI Concierge Medical Lounge',
    heroTagline: '您的韩国医疗咨询入口',
    heroDesc: '为您梳理需求，对接适合的韩国医疗咨询服务',
    heroCta1: '选择咨询项目',
    heroCta2: '联系医疗顾问',
    conciergeTitle: '请选择您的 AI 医疗顾问',
    concierge1Name: '李静',
    concierge1Title: 'Beauty & Women Care Concierge',
    concierge1Specialty: '皮肤医美 · 整形医美 · 女性护理 · 抗衰管理',
    concierge1Btn: '和李静咨询',
    concierge2Name: '金贤宇',
    concierge2Title: 'Health & Medical Concierge',
    concierge2Specialty: '大健康 · 男性健康 · 再生医学 · 医疗旅游',
    concierge2Btn: '和金贤宇咨询',
    concernTitle: '请选择您最关心的方向',
    concern1: '想变年轻一点', concern1Sub: '抗衰老 · 皮肤提升 · 状态管理',
    concern2: '想延缓衰老速度', concern2Sub: '皮肤 · 功能医学 · 再生医学 · 生活方式管理',
    concern3: '想了解再生医学咨询', concern3Sub: '干细胞 · 关节 · 恢复管理 · 合法合规',
    concern4: '想改善脸部线条和整体气质', concern4Sub: '轮廓 · 提升 · 容量支撑 · 气质改善',
    concern5: '我对整形感兴趣', concern5Sub: '眼部 · 鼻部 · 轮廓 · 年轻化整形',
    concern6: '想改善疲惫感和没精神', concern6Sub: '眼周 · 肤色 · 脸部凹陷 · 状态管理',
    concern7: '担心医院和韩国行程安排', concern7Sub: '预约 · 翻译 · 车辆 · 行程 · 停留支持',
    concern8: '韩国体检和中国体检有什么不同？', concern8Sub: '精密体检 · 功能医学 · 专科咨询 · 结果说明',
    categoryTitle: '请选择您想了解的韩国医疗服务',
    cardTitle: '填写我的咨询需求',
    cardQ1: '您最希望了解哪个方向？',
    cardQ2: '您大概什么时候来韩国？',
    cardQ3: '计划停留几天？',
    cardQ4: '您最担心哪方面？',
    cardQ5: '希望通过哪种方式联系？',
    cardSubmit: '提交需求，联系顾问',
    cardGenerated: '您的需求已整理完成',
    cardContactBtn: '立即联系顾问',
    contactTitle: '选择联系方式',
    contactWechatBiz: '企业微信',
    contactWechatPersonal: '企业微信',
    contactWhatsapp: 'WhatsApp',
    contactForm: '在线留言',
    contactEmail: 'Email：egana@kmedispring.com',
    contactFormTitle: '在线留言',
    contactFormName: '您的姓名或联系方式',
    contactFormMsg: '请简单说明您的需求…',
    contactFormSend: '提交',
    contactQRHint: '扫描二维码添加顾问',
    contactClose: '关闭',
    networkTitle: '汉江春天之安心赴韩服务',
    networkSub: '从医疗咨询到韩国停留，我们为您提供更安心的赴韩安排。',
    networkDesc: '汉江春天具备外籍患者引进机构登记资质及韩国综合旅行业登记资质，可为海外客户提供医疗咨询整理、预约协调、翻译沟通、行程安排与赴韩接待相关协助服务。',
    networkCard1Title: '外籍患者引进机构资质',
    networkCard1Desc: '依法登记的韩国外籍患者引进机构',
    networkCard1Reg: '登记号：A-2023-01-02-4752',
    networkCard2Title: '韩国综合旅行服务',
    networkCard2Desc: '具备韩国综合旅行业登记资质，可协助赴韩停留、车辆、行程与旅行安排',
    networkCard2Reg: '登记号：城北区 第26004-2024-007号',
    networkCard3Title: '汉江春天 3晚4天方案',
    networkCard3Desc: '医疗咨询 · 翻译陪同 · 行程协助 · 韩国停留安排',
    networkCard3Status: '即将开放',
    networkCard4Title: '韩国全国医疗资源网络',
    networkCard4Desc: '根据客户需求，对接韩国不同地区、不同级别及不同专科方向的医疗资源',
    aboutTitle: '关于汉江春天',
    aboutDesc: '汉江春天（kmedispring.com）是面向海外客户的韩国医疗咨询与协调服务平台。\n我们不是医院，也不是医生。\n我们是您在韩国医疗体系与个人需求之间的 AI 辅助联络桥梁——整理需求、说明流程、协调预约，并在整个旅程中提供中文支持。',
    disclaimer: '温馨提示：本网站不提供医疗诊断、治疗建议或紧急医疗服务。所有医疗判断、检查结果解释与治疗方案，均以韩国正规医疗机构及专业医生面诊为准。汉江春天提供的是医疗咨询整理、预约协调、翻译沟通与医疗旅游相关协助服务。',
    navConsult: '立即咨询',
    langZh: '中文',
    langKo: '한국어',
    langEn: 'English',
    langAr: 'العربية',
    backHome: '← 返回首页',
    aiScript: 'AI 顾问说明',
    aiScriptExpand: '展开全文',
    aiScriptCollapse: '收起',
    makeCard: '生成我的咨询卡',
    blockSuitableFor: '适合这样的人',
    blockCommonQuestions: '常见咨询点',
    blockBeforeVisit: '来韩前建议准备',
    blockAfterConsult: '咨询后您会更清楚',
  },
  ko: {
    brandName: '한강애봄',
    brandSub: 'AI 컨시어지 메디컬 라운지',
    heroTagline: '한국 의료 상담의 입구',
    heroDesc: '니즈를 정리하고 적합한 한국 의료 상담 서비스를 연결해 드립니다',
    heroCta1: '항목 선택하기',
    heroCta2: '상담 추가하기',
    conciergeTitle: 'AI 의료 컨시어지를 선택하세요',
    concierge1Name: '이정',
    concierge1Title: 'Beauty & Women Care Concierge',
    concierge1Specialty: '피부미용 · 성형미용 · 여성케어 · 항노화',
    concierge1Btn: '이정과 상담',
    concierge2Name: '김현우',
    concierge2Title: 'Health & Medical Concierge',
    concierge2Specialty: '대건강 · 남성건강 · 재생의학 · 의료관광',
    concierge2Btn: '김현우와 상담',
    concernTitle: '이번에 가장 해결하고 싶은 것은?',
    concern1: '좀 더 젊어지고 싶다', concern1Sub: '항노화 · 피부 리프팅 · 컨디션 관리',
    concern2: '노화 속도를 늦추고 싶다', concern2Sub: '피부 · 기능의학 · 재생의학 · 생활방식',
    concern3: '재생의학 상담을 알고 싶다', concern3Sub: '줄기세포 · 관절 · 회복관리 · 합법 상담',
    concern4: '얼굴 라인과 분위기를 개선하고 싶다', concern4Sub: '윤곽 · 리프팅 · 볼륨 · 분위기 개선',
    concern5: '성형에 관심 있어, 전문 안내가 필요해', concern5Sub: '눈 · 코 · 윤곽 · 자연스러운 성형',
    concern6: '피곤해 보이는 인상을 개선하고 싶다', concern6Sub: '눈 주위 · 피부톤 · 얼굴 함몰 · 컨디션',
    concern7: '병원, 통역, 한국 일정이 걱정돼', concern7Sub: '예약 · 통역 · 차량 · 일정 · 체류 지원',
    concern8: '한국·중국 체검 차이가 궁금해', concern8Sub: '정밀검진 · 기능의학 · 전문과 상담 · 결과 설명',
    categoryTitle: '의료 항목을 선택하세요',
    cardTitle: '나의 상담 카드 만들기',
    cardQ1: '가장 관심 있는 항목은?',
    cardQ2: '한국 방문 시기는?',
    cardQ3: '체류 기간은?',
    cardQ4: '가장 걱정되는 것은?',
    cardQ5: '상담 방법은?',
    cardSubmit: '상담 카드 저장 및 컨시어지 연결',
    cardGenerated: '상담 카드가 생성되었습니다',
    cardContactBtn: '지금 컨시어지에게 연락',
    contactTitle: '상담 방법을 선택하세요',
    contactWechatBiz: '기업 위챗 상담',
    contactWechatPersonal: '개인 위챗 상담',
    contactWhatsapp: 'WhatsApp 상담',
    contactForm: '문의 남기기',
    contactEmail: 'Email：egana@kmedispring.com',
    contactFormTitle: '문의 남기기',
    contactFormName: '성함 또는 연락처',
    contactFormMsg: '상담 내용을 간단히 입력해 주세요…',
    contactFormSend: '문의 제출',
    contactQRHint: 'QR 코드를 스캔하여 상담 추가',
    contactClose: '닫기',
    networkTitle: '한강애봄 안심 방한 서비스',
    networkSub: '의료상담부터 한국 체류까지, 더 안심하고 방한하실 수 있도록 안내드립니다.',
    networkDesc: '한강애봄은 외국인환자유치기관 등록 자격 및 한국 종합여행업 등록 자격을 갖추고, 해외 고객에게 의료상담 정리, 예약 조율, 통역, 일정 안내 및 방한 접수 관련 협조 서비스를 제공합니다.',
    networkCard1Title: '외국인환자유치기관 자격',
    networkCard1Desc: '합법적으로 등록된 한국 외국인환자유치기관',
    networkCard1Reg: '등록번호：A-2023-01-02-4752',
    networkCard2Title: '한국 종합여행 서비스',
    networkCard2Desc: '한국 종합여행업 등록 자격 보유, 방한 숙박·차량·일정·여행 안내 협조 가능',
    networkCard2Reg: '등록번호：성북구 제26004-2024-007호',
    networkCard3Title: '한강애봄 3박4일 패키지',
    networkCard3Desc: '의료상담 · 통역 동행 · 일정 협조 · 한국 체류 안내',
    networkCard3Status: '오픈 예정',
    networkCard4Title: '전국 의료 리소스 네트워크',
    networkCard4Desc: '고객 니즈에 맞게 한국 각 지역·레벨·전문과 방향의 의료 리소스를 연결',
    aboutTitle: '한강애봄 소개',
    aboutDesc: '한강애봄(kmedispring.com)은 해외 고객을 위한 한국 의료 상담 및 조율 서비스 플랫폼입니다.\n저희는 병원도 의사도 아닙니다.\n한국 의료 시스템과 개인 니즈 사이의 AI 지원 연락 브릿지 — 니즈 정리, 절차 안내, 예약 조율, 전체 여정의 중국어 지원을 제공합니다.',
    disclaimer: '안내: 본 웹사이트는 의료 진단, 치료 조언 또는 응급 의료 서비스를 제공하지 않습니다. 모든 의료 판단, 검사 결과 해석 및 치료 방안은 한국 정규 의료기관 및 전문 의사의 직접 진찰을 기준으로 합니다.',
    navConsult: '지금 상담',
    langZh: '中文',
    langKo: '한국어',
    langEn: 'English',
    langAr: 'العربية',
    backHome: '← 홈으로',
    aiScript: 'AI 컨시어지 안내',
    aiScriptExpand: '전문 보기',
    aiScriptCollapse: '접기',
    makeCard: '나의 상담 카드 만들기',
    blockSuitableFor: '이런 분께 추천',
    blockCommonQuestions: '주요 상담 항목',
    blockBeforeVisit: '방한 전 준비사항',
    blockAfterConsult: '상담 후 더 명확해지는 것',
  },
  en: {
    brandName: 'K-MediSpring',
    brandSub: 'AI Concierge Medical Lounge',
    heroTagline: 'Your Personal Gateway to Korean Healthcare',
    heroDesc: 'From anti-aging and aesthetic medicine to comprehensive health management — K-MediSpring curates your needs and connects you with the right Korean medical specialists.',
    heroCta1: 'Explore Our Services',
    heroCta2: 'Speak with a Concierge',
    conciergeTitle: 'Meet Your AI Medical Concierge',
    concierge1Name: 'Lee Jing',
    concierge1Title: "Beauty & Women's Care Concierge",
    concierge1Specialty: 'Aesthetic Medicine · Plastic Surgery · Women\'s Health · Anti-Aging',
    concierge1Btn: 'Connect with Lee Jing',
    concierge2Name: 'Kim Hyunwoo',
    concierge2Title: 'Health & Medical Concierge',
    concierge2Specialty: "Preventive Health · Men's Wellness · Regenerative Medicine · Medical Travel",
    concierge2Btn: 'Connect with Kim Hyunwoo',
    concernTitle: 'What Brings You Here Today?',
    concern1: 'I want to restore a younger look', concern1Sub: 'Anti-Aging · Skin Lifting · Wellness',
    concern2: 'I want to slow down aging', concern2Sub: 'Skin · Functional Med · Regenerative · Lifestyle',
    concern3: 'I want to learn about regenerative medicine', concern3Sub: 'Stem Cell · Joint · Recovery · Legal Consultation',
    concern4: 'I want to improve facial contours & appearance', concern4Sub: 'Contour · Lifting · Volume · Appearance',
    concern5: "I'm interested in plastic surgery", concern5Sub: 'Eyes · Nose · Contour · Natural Surgery',
    concern6: 'I want to improve a tired appearance', concern6Sub: 'Eye Area · Skin Tone · Hollowing · Condition',
    concern7: 'Worried about hospital & Korea itinerary', concern7Sub: 'Appointment · Interpreter · Transport · Stay',
    concern8: 'Korean vs. Chinese health checkup differences?', concern8Sub: 'Precision Checkup · Functional Med · Specialist',
    categoryTitle: 'Browse Medical Services',
    cardTitle: 'Build My Consultation Profile',
    cardQ1: 'Which area are you most interested in?',
    cardQ2: 'When are you thinking of visiting Korea?',
    cardQ3: 'How long do you plan to stay?',
    cardQ4: 'What matters most to you?',
    cardQ5: 'How would you prefer to connect?',
    cardSubmit: 'Submit & Reach a Concierge',
    cardGenerated: 'Your Consultation Profile Is Ready',
    cardContactBtn: 'Reach a Concierge Now',
    contactTitle: 'How Would You Like to Reach Us?',
    contactWechatBiz: 'Enterprise WeChat',
    contactWechatPersonal: 'Personal WeChat',
    contactWhatsapp: 'WhatsApp',
    contactForm: 'Send a Message',
    contactEmail: 'Email: egana@kmedispring.com',
    contactFormTitle: 'Send Us a Message',
    contactFormName: 'Your name or preferred contact',
    contactFormMsg: 'Tell us briefly what you\'re looking for…',
    contactFormSend: 'Send Message',
    contactQRHint: 'Scan to connect via WeChat',
    contactClose: 'Close',
    networkTitle: 'Korea Visit Services',
    networkSub: 'From medical consultation to your stay in Korea — we make it easier.',
    networkDesc: 'We hold registered status as a Licensed Foreign Patient Facilitator and a General Travel Agency in Korea, providing consultation coordination, appointment assistance, interpretation, itinerary planning, and arrival support.',
    networkCard1Title: 'Foreign Patient Facilitator',
    networkCard1Desc: 'Officially registered Korean foreign patient facilitation institution',
    networkCard1Reg: 'Reg. No.: A-2023-01-02-4752',
    networkCard2Title: 'General Travel Services',
    networkCard2Desc: 'Licensed General Travel Agency — accommodation, transport, itinerary & travel arrangements',
    networkCard2Reg: 'Reg. No.: Seongbuk-gu No. 26004-2024-007',
    networkCard3Title: '3 Nights / 4 Days Package',
    networkCard3Desc: 'Medical consultation · Interpreter escort · Itinerary support · Korea stay arrangements',
    networkCard3Status: 'Coming Soon',
    networkCard4Title: 'Nationwide Medical Network',
    networkCard4Desc: 'We connect clients with Korean medical resources across regions, levels, and specialties based on individual needs',
    aboutTitle: 'About K-MediSpring',
    aboutDesc: 'K-MediSpring (kmedispring.com) is a concierge medical coordination service designed for international clients seeking quality healthcare in Korea.\nWe are not a hospital. We are not a doctor.\nWe are your dedicated liaison — helping you navigate the Korean medical system with clarity, translating your needs into the right connections, and supporting you at every step of your journey.',
    disclaimer: 'Disclaimer: K-MediSpring does not provide medical diagnosis, treatment recommendations, or emergency care. All clinical decisions, test interpretations, and treatment plans are made exclusively by licensed Korean healthcare professionals during in-person consultation. K-MediSpring provides medical coordination, appointment facilitation, interpretation, and travel support services only.',
    navConsult: 'Get Started',
    langZh: '中文',
    langKo: '한국어',
    langEn: 'English',
    langAr: 'العربية',
    backHome: '← Back to Home',
    aiScript: 'About This Service',
    aiScriptExpand: 'Read More',
    aiScriptCollapse: 'Show Less',
    makeCard: 'Build My Consultation Profile',
    blockSuitableFor: 'Who This Is For',
    blockCommonQuestions: 'Common Consultation Topics',
    blockBeforeVisit: 'Prepare Before Your Visit',
    blockAfterConsult: 'What You\'ll Know After',
  },
  ar: {
    brandName: 'كيمديسبرينج',
    brandSub: 'صالة طبية AI كونسيرج',
    heroTagline: 'بوابتك الشخصية للرعاية الصحية الكورية',
    heroDesc: 'نرتب احتياجاتك ونوصلك بخدمات الاستشارة الطبية الكورية المناسبة',
    heroCta1: 'استعرض الخدمات',
    heroCta2: 'تواصل مع كونسيرج',
    conciergeTitle: 'اختر كونسيرجك الطبي AI',
    concierge1Name: 'لي جينغ',
    concierge1Title: 'كونسيرج التجميل والعناية بالمرأة',
    concierge1Specialty: 'الطب التجميلي · الجراحة التجميلية · صحة المرأة · مكافحة الشيخوخة',
    concierge1Btn: 'تواصل مع لي جينغ',
    concierge2Name: 'كيم هيونوو',
    concierge2Title: 'كونسيرج الصحة والطب',
    concierge2Specialty: 'الصحة الوقائية · صحة الرجل · الطب التجديدي · السياحة الطبية',
    concierge2Btn: 'تواصل مع كيم هيونوو',
    concernTitle: 'ما الذي تبحث عنه اليوم؟',
    concern1: 'أريد استعادة مظهر أكثر شباباً', concern1Sub: 'مكافحة الشيخوخة · رفع الجلد · العناية',
    concern2: 'أريد إبطاء الشيخوخة', concern2Sub: 'البشرة · الطب الوظيفي · التجديدي · نمط الحياة',
    concern3: 'أريد معرفة الطب التجديدي', concern3Sub: 'الخلايا الجذعية · المفاصل · التعافي · استشارة قانونية',
    concern4: 'أريد تحسين ملامح الوجه ومظهري', concern4Sub: 'الملامح · الرفع · الحجم · تحسين المظهر',
    concern5: 'أنا مهتم بالجراحة التجميلية', concern5Sub: 'العيون · الأنف · الملامح · جراحة طبيعية',
    concern6: 'أريد تحسين مظهر التعب', concern6Sub: 'منطقة العيون · لون البشرة · التجويف · الحالة',
    concern7: 'قلق بشأن المستشفى وجدول كوريا', concern7Sub: 'المواعيد · الترجمة · المواصلات · الإقامة',
    concern8: 'الفرق بين الفحص الطبي الكوري والصيني؟', concern8Sub: 'فحص دقيق · طب وظيفي · استشارة متخصصة',
    categoryTitle: 'تصفح الخدمات الطبية',
    cardTitle: 'أنشئ ملف استشارتي',
    cardQ1: 'ما المجال الذي يهمك أكثر؟',
    cardQ2: 'متى تفكر في زيارة كوريا؟',
    cardQ3: 'كم تخطط للإقامة؟',
    cardQ4: 'ما الأهم بالنسبة لك؟',
    cardQ5: 'كيف تفضل التواصل؟',
    cardSubmit: 'إرسال والتواصل مع كونسيرج',
    cardGenerated: 'ملف استشارتك جاهز',
    cardContactBtn: 'تواصل مع كونسيرج الآن',
    contactTitle: 'كيف تريد التواصل معنا؟',
    contactWechatBiz: 'ويتشات المؤسسي',
    contactWechatPersonal: 'ويتشات الشخصي',
    contactWhatsapp: 'واتساب',
    contactForm: 'إرسال رسالة',
    contactEmail: 'البريد الإلكتروني: egana@kmedispring.com',
    contactFormTitle: 'أرسل لنا رسالة',
    contactFormName: 'اسمك أو جهة اتصالك المفضلة',
    contactFormMsg: 'أخبرنا بإيجاز عما تبحث عنه…',
    contactFormSend: 'إرسال الرسالة',
    contactQRHint: 'امسح للتواصل عبر ويتشات',
    contactClose: 'إغلاق',
    networkTitle: 'خدمات زيارة كوريا',
    networkSub: 'من الاستشارة الطبية إلى إقامتك في كوريا — نجعل الأمر أسهل.',
    networkDesc: 'نحمل صفة مسجلة كجهة معتمدة لتيسير المرضى الأجانب ووكالة سفر عامة في كوريا، نقدم تنسيق الاستشارات، المساعدة في المواعيد، الترجمة، تخطيط الجداول، ودعم الوصول.',
    networkCard1Title: 'جهة تيسير المرضى الأجانب',
    networkCard1Desc: 'مؤسسة كورية مسجلة رسمياً لتيسير المرضى الأجانب',
    networkCard1Reg: 'رقم التسجيل: A-2023-01-02-4752',
    networkCard2Title: 'خدمات السفر العامة',
    networkCard2Desc: 'وكالة سفر عامة مرخصة — إقامة، مواصلات، جداول وترتيبات السفر',
    networkCard2Reg: 'Reg. No.: Seongbuk-gu No. 26004-2024-007',
    networkCard3Title: 'باقة 3 ليالٍ / 4 أيام',
    networkCard3Desc: 'استشارة طبية · مرافق مترجم · دعم الجدول الزمني · ترتيبات الإقامة في كوريا',
    networkCard3Status: 'قريباً',
    networkCard4Title: 'شبكة طبية وطنية',
    networkCard4Desc: 'نربطك بالموارد الطبية الكورية عبر المناطق والمستويات والتخصصات وفق احتياجاتك',
    aboutTitle: 'عن كيمديسبرينج',
    aboutDesc: 'كيمديسبرينج (kmedispring.com) خدمة تنسيق طبي وكونسيرج مصممة للعملاء الدوليين.\nلسنا مستشفى. لسنا أطباء.\nنحن وسيطك المخصص — نساعدك على التنقل في المنظومة الطبية الكورية بوضوح، ونترجم احتياجاتك إلى الوصلات الصحيحة، وندعمك في كل خطوة من رحلتك.',
    disclaimer: 'تنبيه: لا تقدم كيمديسبرينج التشخيص الطبي أو توصيات العلاج أو الرعاية الطارئة. جميع القرارات السريرية وتفسيرات نتائج الفحوصات وخطط العلاج تُتخذ حصرياً من قِبل متخصصي الرعاية الصحية الكوريين المرخصين خلال الاستشارة الشخصية.',
    navConsult: 'ابدأ الآن',
    langZh: '中文',
    langKo: '한국어',
    langEn: 'English',
    langAr: 'العربية',
    backHome: '← العودة للرئيسية',
    aiScript: 'عن هذه الخدمة',
    aiScriptExpand: 'اقرأ المزيد',
    aiScriptCollapse: 'عرض أقل',
    makeCard: 'أنشئ ملف استشارتي',
    blockSuitableFor: 'لمن هذا؟',
    blockCommonQuestions: 'موضوعات الاستشارة الشائعة',
    blockBeforeVisit: 'الاستعداد قبل زيارتك',
    blockAfterConsult: 'ما ستعرفه بعد ذلك',
  },
}
