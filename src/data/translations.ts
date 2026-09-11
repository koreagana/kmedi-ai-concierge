export type LangCode = 'zh' | 'en'

interface Translations {
  // brand
  brandName: string
  brandSub: string
  // hero
  heroPrefTitle: string
  heroPrefChips: string[]
  heroRegionChips: string[]
  heroPrefNote: string
  heroTrustTitle: string
  /** \n-separated lines — item count intentionally varies by language (e.g. ko merges two points into one sentence). */
  heroTrustLines: string
  heroHotLabel: string
  heroTreatmentChips: string[]
  heroCtaLabel: string
  quoteBtnTitle: string
  surgeryBtnTitle: string
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
  // home consultation card section
  homeCardSectionTitle: string
  homeCardSectionDesc: string
  homeCardSectionBtn: string
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
  contactWhatsapp: string
  contactForm: string
  contactEmail: string
  contactFormTitle: string
  contactFormName: string
  contactFormMsg: string
  contactFormSend: string
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
  networkCard4ExpandTitle: string
  networkCard4Caption: string
  // about
  aboutTitle: string
  aboutDesc: string
  // footer
  companyIntro: string
  termsLink: string
  // nav
  navConsult: string
  langZh: string
  langEn: string
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
  // floating chat button
  floatingChatTooltip: string
  antennaLeft: string
  antennaRight: string
}

export const translations: Record<LangCode, Translations> = {
  zh: {
    brandName: '汉江春天',
    brandSub: 'AI Concierge Medical Lounge',
    heroPrefTitle: '请您在推荐医院前告知我们',
    heroPrefChips: ['价格优先', '私密环境', '高端服务', '从洁面到收尾全程护理'],
    heroRegionChips: ['江南', '明洞', '弘大', '圣水', '济州', '釜山'],
    heroPrefNote: '请告诉我们您的需求和希望就诊的地区，汉江春天将为您推荐更适合的医院。',
    heroTrustTitle: '放心咨询',
    heroTrustLines: '合法注册的国际医疗旅游服务机构\n合作医院实行韩外统一价格标准\n不额外收取服务费或咨询费',
    heroHotLabel: '人气项目',
    heroTreatmentChips: ['丽珠兰', '超声刀', 'ONDA', '水光针', '热玛吉', '瘦脸针', '钛提升', '黄金微针', '乔雅露', '索夫波', 'InMode FX', 'XERF 泽弗'],
    heroCtaLabel: '韩国医疗项目',
    quoteBtnTitle: '热门轻医美项目费用预估',
    surgeryBtnTitle: '韩国整形手术价格表',
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
    concern1: '想看起来更年轻、更有精神', concern1Sub: '抗衰外观 · 皮肤提升 · 年轻感管理',
    concern2: '想从身体内部延缓衰老速度', concern2Sub: '功能医学 · 代谢管理 · 睡眠与激素 · 生活方式',
    concern3: '想了解韩国合法合规的再生医学咨询', concern3Sub: '再生医学 · 关节健康 · 恢复管理 · 合法合规',
    concern4: '想改善脸部线条、下颌线和整体气质', concern4Sub: '下颌线 · 轮廓 · 提升 · 容量支撑',
    concern5: '我对整形感兴趣，需要专业指导', concern5Sub: '眼部 · 鼻部 · 轮廓 · 年轻化整形 · 恢复计划',
    concern6: '想改善疲惫感、暗沉和没精神的状态', concern6Sub: '眼周 · 黑眼圈 · 肤色暗沉 · 体力状态',
    concern7: '担心医院、翻译和韩国行程安排', concern7Sub: '预约 · 翻译 · 车辆 · 行程 · 陪同支持',
    concern8: '韩国体检和中国体检，主要有什么不同？', concern8Sub: '精密体检 · 功能医学 · 专科咨询 · 结果说明',
    categoryTitle: '请选择您想了解的韩国医疗服务',
    homeCardSectionTitle: '先生成一张您的韩国医疗咨询卡',
    homeCardSectionDesc: '还不确定该选哪个项目？先回答几个简单问题，我们会帮您整理初步咨询方向。',
    homeCardSectionBtn: '生成我的韩国医疗咨询卡',
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
    contactWhatsapp: 'WhatsApp',
    contactForm: '在线留言',
    contactEmail: 'Email：care@k-medispring.cn',
    contactFormTitle: '在线留言',
    contactFormName: '您的姓名或联系方式',
    contactFormMsg: '请简单说明您的需求…',
    contactFormSend: '提交',
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
    networkCard4ExpandTitle: '韩国主要城市医疗资源分布',
    networkCard4Caption: '覆盖首尔・釜山・大邱・济州，医疗资源持续扩展中',
    aboutTitle: '关于汉江春天',
    aboutDesc: '汉江春天（ai-kmedi.com）是面向海外客户的韩国医疗咨询与协调服务平台。\n我们不是医院，也不是医生。\n我们是您在韩国医疗体系与个人需求之间的 AI 辅助联络桥梁——整理需求、说明流程、协调预约，并在整个旅程中提供中文支持。',
    companyIntro: '汉江春天是韩国外国患者医疗观光服务专业提供商。',
    termsLink: '使用条款',
    navConsult: '立即咨询',
    langZh: '中文',
    langEn: 'English',
    backHome: '← 返回首页',
    aiScript: 'AI 顾问说明',
    aiScriptExpand: '展开全文',
    aiScriptCollapse: '收起',
    makeCard: '生成我的韩国医疗咨询卡',
    blockSuitableFor: '适合这样的人',
    blockCommonQuestions: '常见咨询点',
    blockBeforeVisit: '来韩前建议准备',
    blockAfterConsult: '咨询后您会更清楚',
    floatingChatTooltip: '点击企业微信咨询',
    antennaLeft: '点击',
    antennaRight: '秒回',
  },
  en: {
    brandName: 'K-MediSpring',
    brandSub: 'AI Concierge Medical Lounge',
    heroPrefTitle: 'Tell Us Before We Recommend a Hospital',
    heroPrefChips: ['Price-Focused', 'Private Setting', 'Premium Service', 'Full Care from Cleansing to Finish'],
    heroRegionChips: ['Gangnam', 'Myeongdong', 'Hongdae', 'Seongsu', 'Jeju', 'Busan'],
    heroPrefNote: 'Tell us your preferences and preferred area, and K-MediSpring will recommend the hospital that best fits you.',
    heroTrustTitle: 'Consult with Confidence',
    heroTrustLines: 'A legally registered international medical tourism service provider\nPartner hospitals apply the same price standard to Korean and international patients\nNo additional service or consultation fees',
    heroHotLabel: 'Trending Now',
    heroTreatmentChips: ['Rejuran', 'Ulthera', 'ONDA', 'Water Glow Injection', 'Thermage', 'V-Line Contour', 'Titanium Lifting', 'Potenza', 'Juvelook', 'Sofwave', 'InMode FX', 'XERF'],
    heroCtaLabel: 'Korean Medical Services',
    quoteBtnTitle: 'Popular Treatment Price Estimate',
    surgeryBtnTitle: 'Surgery Price List',
    conciergeTitle: 'Meet Your AI Medical Concierge',
    concierge1Name: 'Lee Jing',
    concierge1Title: "Beauty & Women's Care Concierge",
    concierge1Specialty: 'Aesthetic Medicine · Plastic Surgery · Women\'s Health · Anti-Aging',
    concierge1Btn: 'Connect with Lee Jing',
    concierge2Name: 'Kim Hyunwoo',
    concierge2Title: 'Health & Medical Concierge',
    concierge2Specialty: "Anti-aging & Health Management · Men's Wellness · Regenerative Medicine · Medical Travel",
    concierge2Btn: 'Connect with Kim Hyunwoo',
    concernTitle: 'What Brings You Here Today?',
    concern1: 'I want to look younger and more refreshed', concern1Sub: 'Anti-Aging Look · Skin Lifting · Youthful Impression',
    concern2: 'I want to slow aging from the inside', concern2Sub: 'Functional Medicine · Metabolism · Sleep & Hormones · Lifestyle',
    concern3: 'I want to understand legal regenerative medicine consultation in Korea', concern3Sub: 'Regenerative Medicine · Joint Health · Recovery · Legal Consultation',
    concern4: 'I want to improve my facial line, jawline, and overall impression', concern4Sub: 'Jawline · Contour · Lifting · Volume Support',
    concern5: 'I am interested in plastic surgery and need professional guidance', concern5Sub: 'Eyes · Nose · Contour · Youthful Surgery · Recovery Plan',
    concern6: 'I want to improve my tired, dull, and low-energy appearance', concern6Sub: 'Eye Area · Dark Circles · Dull Tone · Energy Level',
    concern7: 'I am worried about hospitals, interpretation, and my Korea itinerary', concern7Sub: 'Appointment · Interpreter · Transport · Itinerary · Escort',
    concern8: 'What are the main differences between Korean and Chinese health checkups?', concern8Sub: 'Precision Checkup · Functional Medicine · Specialist · Results',
    categoryTitle: 'Browse Medical Services',
    homeCardSectionTitle: 'Start with Your Korea Medical Consultation Profile',
    homeCardSectionDesc: "Not sure which service to choose? Answer a few simple questions and we'll help clarify your initial consultation direction.",
    homeCardSectionBtn: 'Build My Profile',
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
    contactWhatsapp: 'WhatsApp',
    contactForm: 'Send a Message',
    contactEmail: 'Email: care@k-medispring.cn',
    contactFormTitle: 'Send Us a Message',
    contactFormName: 'Your name or preferred contact',
    contactFormMsg: 'Tell us briefly what you\'re looking for…',
    contactFormSend: 'Send Message',
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
    networkCard4ExpandTitle: "Medical Resources Across Korea's Major Cities",
    networkCard4Caption: 'Covering Seoul, Busan, Daegu, and Jeju — our network keeps growing',
    aboutTitle: 'About K-MediSpring',
    aboutDesc: 'K-MediSpring (ai-kmedi.com) is a concierge medical coordination service designed for international clients seeking quality healthcare in Korea.\nWe are not a hospital. We are not a doctor.\nWe are your dedicated liaison — helping you navigate the Korean medical system with clarity, translating your needs into the right connections, and supporting you at every step of your journey.',
    companyIntro: 'K-MediSpring is a professional medical tourism concierge company for international patients in Korea.',
    termsLink: 'Terms of Use',
    navConsult: 'Talk to us',
    langZh: '中文',
    langEn: 'English',
    backHome: '← Back to Home',
    aiScript: 'About This Service',
    aiScriptExpand: 'Read More',
    aiScriptCollapse: 'Show Less',
    makeCard: 'Create My Korea Medical Consultation Card',
    blockSuitableFor: 'Who This Is For',
    blockCommonQuestions: 'Common Consultation Topics',
    blockBeforeVisit: 'Prepare Before Your Visit',
    blockAfterConsult: 'What You\'ll Know After',
    floatingChatTooltip: 'Chat with us on WeChat',
    antennaLeft: 'Tap',
    antennaRight: 'Reply',
  },
}
