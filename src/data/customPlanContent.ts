import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText } from './bigHealthKeywords'

export interface CustomPlanDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

export const CUSTOM_PLAN_DOC_BUTTONS = {
  wechatConsult: {
    label: {
      zh: '打开企业微信咨询',
      ko: '기업위챗 상담하기',
      en: 'Open WeCom Consultation',
      ar: 'فتح استشارة ويكوم',
    },
    kind: 'external',
    target: WECHAT_BIZ_URL,
  },
} satisfies Record<string, CustomPlanDocButton>

export type CustomPlanDocButtonKey = keyof typeof CUSTOM_PLAN_DOC_BUTTONS

export interface CustomPlanCard {
  title: LocalizedText
  desc: LocalizedText
}

export interface CustomPlanClientCard {
  title: LocalizedText
  audience: LocalizedText
  serviceFocus: LocalizedText
}

export interface CustomPlanStep {
  title: LocalizedText
  desc: LocalizedText
}

export interface CustomPlanTextSection {
  title: LocalizedText
  /** \n\n separates paragraphs. */
  body: LocalizedText
}

export const CUSTOM_PLAN_SECTION = {
  title: {
    zh: '定制医疗观光方案',
    ko: '맞춤 의료관광 플랜',
    en: 'Customized Medical Tourism Plan',
    ar: 'خطة سياحة علاجية مخصصة',
  } as LocalizedText,
  subCopy: {
    zh: '韩国医疗 · 医院预约 · 翻译陪同 · 车辆住宿 · 术后恢复 · 生活协助',
    ko: '한국 의료 · 병원 예약 · 통역 동행 · 차량·숙박 · 수술 후 회복 · 생활 지원',
    en: 'Korean Medical Care · Hospital Appointments · Interpretation · Transport & Stay · Recovery Care · Lifestyle Support',
    ar: 'الرعاية الطبية في كوريا · حجز المستشفيات · الترجمة والمرافقة · النقل والإقامة · التعافي بعد العلاج · دعم الحياة اليومية',
  } as LocalizedText,
  desc: {
    zh: '从医院预约到术后恢复，为外国客户设计更安心的韩国医疗行程。\n\n汉江春天是一家完成韩国保健福祉部外国人患者招徕业登记的医疗观光公司。我们不仅帮助客户预约医院，也协助整理诊疗资料、安排翻译陪同、车辆住宿、复诊提醒和回国前确认。',
    ko: '병원 예약부터 수술 후 회복까지, 외국 고객을 위한 더 안심할 수 있는 한국 의료 일정을 설계합니다.\n\n한강애봄은 한국 보건복지부 외국인환자 유치업 등록을 완료한 의료관광 회사입니다. 병원 예약뿐 아니라 진료자료 정리, 통역 동행, 차량·숙박, 재내원 알림, 귀국 전 확인까지 돕습니다.',
    en: 'From hospital appointments to postoperative recovery, we design a more reassuring Korean medical journey for international clients.\n\nK-Medi Spring is a medical tourism company registered for foreign patient attraction under the Korean Ministry of Health and Welfare. We assist not only with hospital appointments but also with medical document organization, interpretation support, transportation, accommodation, follow-up reminders, and pre-departure checks.',
    ar: 'من حجز المستشفى إلى التعافي بعد العملية، نصمم رحلة علاجية في كوريا تمنح العملاء الأجانب شعورًا أكبر بالاطمئنان.\n\nK-Medi هي شركة سياحة علاجية مسجلة لخدمة استقطاب المرضى الأجانب وفق نظام وزارة الصحة والرعاية الاجتماعية في كوريا. لا نساعد فقط في حجز المستشفيات، بل نساعد أيضًا في تنظيم الوثائق الطبية، والمرافقة والترجمة، والنقل، والإقامة، والتذكير بالمراجعات، والتأكد من التعليمات قبل العودة.',
  } as LocalizedText,
  safety: [
    {
      zh: '汉江春天不是医疗机构，不进行诊断、治疗或手术判断。医疗判断始终由韩国正规医疗机构和专业医生负责。',
      ko: '한강애봄은 의료기관이 아니며 진단, 치료 또는 수술 판단을 하지 않습니다. 의료 판단은 항상 한국 정규 의료기관과 전문의가 담당합니다.',
      en: 'K-Medi Spring is not a medical institution and does not make diagnosis, treatment, or surgical decisions. Medical judgment is always the responsibility of a licensed Korean medical institution and qualified physicians.',
      ar: 'ليست K-Medi مؤسسة طبية ولا تتخذ قرارات التشخيص أو العلاج أو الجراحة. يبقى القرار الطبي دائمًا مسؤولية مؤسسة طبية كورية مرخصة وأطباء مختصين.',
    },
    {
      zh: '本页介绍的是汉江春天可以协调和协助的服务范围，具体安排会根据个人情况、医院回复和预约可能性调整。',
      ko: '본 페이지는 한강애봄이 조율하고 도울 수 있는 서비스 범위를 소개하는 것이며, 구체적인 안배는 개인 상황, 병원 회신, 예약 가능성에 따라 조정될 수 있습니다.',
      en: 'This page introduces the scope of services K-Medi Spring can coordinate and assist with. Specific arrangements may be adjusted based on individual circumstances, hospital responses, and appointment availability.',
      ar: 'تعرّف هذه الصفحة بنطاق الخدمات التي يمكن لـ K-Medi تنسيقها والمساعدة فيها. قد تُعدَّل الترتيبات المحددة بناءً على الظروف الفردية، ورد المستشفى، وإمكانية الحجز.',
    },
  ] as LocalizedText[],
  closing: {
    zh: '无论您是需要专业医院转诊，还是希望以合理预算获得优质的皮肤医美与整形咨询，汉江春天都会根据您的具体情况，设计专属的韩国医疗行程。',
    ko: '전문적인 병원 연계가 필요하시든, 합리적인 예산으로 좋은 피부미용·성형 상담을 원하시든, 한강애봄은 고객님의 상황에 맞춰 전용 한국 의료 일정을 설계해 드립니다.',
    en: 'Whether you need specialized hospital referral or want quality skin and plastic surgery consultation within a reasonable budget, K-Medi Spring designs a dedicated Korean medical itinerary tailored to your specific situation.',
    ar: 'سواء كنت بحاجة إلى إحالة متخصصة إلى مستشفى، أو ترغب في استشارة عناية بالبشرة أو جراحة تجميل بميزانية معقولة، تصمم K-Medi برنامجاً علاجياً كورياً مخصصاً يناسب حالتك تحديداً.',
  } as LocalizedText,
}

// ── Section 1: What can we coordinate ──────────────────────────────
export const CUSTOM_PLAN_COORDINATION_TITLE: LocalizedText = {
  zh: '汉江春天可以为您协调什么？',
  ko: '한강애봄은 무엇을 조율할 수 있나요?',
  en: 'What Can K-Medi Spring Coordinate for You?',
  ar: 'ما الذي يمكن أن تنسقه K-Medi لك؟',
}

export const CUSTOM_PLAN_COORDINATION_CARDS: CustomPlanCard[] = [
  {
    title: {
      zh: '医院预约与诊疗方向整理',
      ko: '병원 예약과 진료 방향 정리',
      en: 'Hospital Appointments & Consultation Direction',
      ar: 'حجز المستشفى وتنظيم اتجاه الاستشارة',
    },
    desc: {
      zh: '根据客户的症状、目的、既往检查报告和停留时间，整理适合咨询的医院方向。',
      ko: '고객의 증상, 목적, 기존 검사결과, 체류 기간을 기준으로 상담 가능한 병원 방향을 정리합니다.',
      en: 'We organize suitable hospital consultation directions based on symptoms, goals, previous medical reports, and length of stay.',
      ar: 'نرتب اتجاهات الاستشارة المناسبة في المستشفيات بناءً على الأعراض، والهدف، والتقارير الطبية السابقة، ومدة الإقامة.',
    },
  },
  {
    title: {
      zh: '医疗资料预整理',
      ko: '의료자료 사전 정리',
      en: 'Pre-Organizing Medical Records',
      ar: 'تنظيم الملفات الطبية مسبقًا',
    },
    desc: {
      zh: '客户可提前提供检查报告、影像资料、手术记录或照片，我们会协助整理并转达给医院。',
      ko: '고객은 검사결과, 영상자료, 수술기록, 사진 등을 사전에 제공할 수 있으며, 한강애봄은 이를 정리해 병원에 전달하는 것을 돕습니다.',
      en: 'Clients may provide test results, imaging files, surgery records, or photos in advance. We help organize them and communicate them to the hospital.',
      ar: 'يمكن للعميل إرسال نتائج الفحوصات، أو ملفات التصوير، أو سجلات العمليات، أو الصور مسبقًا، ونساعد في تنظيمها وإيصالها إلى المستشفى.',
    },
  },
  {
    title: {
      zh: '翻译陪同与沟通协助',
      ko: '통역 동행 및 소통 지원',
      en: 'Interpretation & Communication Support',
      ar: 'الترجمة والمرافقة ودعم التواصل',
    },
    desc: {
      zh: '在医院咨询、检查、手术说明、复诊和注意事项确认时，协助客户理解医院说明。',
      ko: '병원 상담, 검사, 수술 설명, 재내원, 주의사항 확인 과정에서 고객이 병원 안내를 이해할 수 있도록 돕습니다.',
      en: 'During consultations, tests, surgical explanations, follow-ups, and instruction reviews, we help clients understand the hospital\'s guidance.',
      ar: 'أثناء الاستشارة، والفحوصات، وشرح العملية، والمراجعات، وتأكيد التعليمات، نساعد العميل على فهم إرشادات المستشفى.',
    },
  },
  {
    title: {
      zh: '车辆与住宿安排',
      ko: '차량과 숙박 안배',
      en: 'Transportation & Accommodation',
      ar: 'النقل والإقامة',
    },
    desc: {
      zh: '根据医院位置、行程时间、恢复需求和同行人数，协助安排车辆和住宿。',
      ko: '병원 위치, 일정 시간, 회복 필요도, 동행 인원에 따라 차량과 숙박 안배를 돕습니다.',
      en: 'We assist with transportation and accommodation based on hospital location, schedule, recovery needs, and number of companions.',
      ar: 'نساعد في ترتيب النقل والإقامة بناءً على موقع المستشفى، والجدول الزمني، واحتياجات التعافي، وعدد المرافقين.',
    },
  },
  {
    title: {
      zh: '术后恢复与复诊提醒',
      ko: '수술 후 회복 및 재내원 알림',
      en: 'Recovery & Follow-Up Reminders',
      ar: 'التعافي والتذكير بالمتابعة',
    },
    desc: {
      zh: '协助确认复诊、拆线、用药说明、异常症状联系医院和回国前检查事项。',
      ko: '재내원, 실밥 제거, 약 복용 안내, 이상 증상 시 병원 연락, 귀국 전 확인사항을 돕습니다.',
      en: 'We help confirm follow-up visits, stitch removal, medication instructions, hospital contact for abnormal symptoms, and pre-departure checks.',
      ar: 'نساعد في تأكيد مواعيد المتابعة، وإزالة الغرز، وتعليمات الأدوية، والتواصل مع المستشفى عند ظهور أعراض غير طبيعية، والفحوصات قبل العودة.',
    },
  },
  {
    title: {
      zh: '韩国停留期间生活协助',
      ko: '한국 체류 기간 생활 지원',
      en: 'Daily Life Support During Your Stay',
      ar: 'دعم الحياة اليومية أثناء الإقامة',
    },
    desc: {
      zh: '根据客户需求，协助整理周边餐厅、轻旅行、购物、药局和日常生活信息。',
      ko: '고객 필요에 따라 주변 식당, 가벼운 여행, 쇼핑, 약국, 일상 생활 정보를 정리해드립니다.',
      en: 'Depending on client needs, we help organize information about nearby restaurants, light travel, shopping, pharmacies, and daily life.',
      ar: 'حسب احتياجات العميل، نساعد في تنظيم معلومات عن المطاعم القريبة، والرحلات الخفيفة، والتسوق، والصيدليات، والحياة اليومية.',
    },
  },
]

// ── Section 2: Registered agency ────────────────────────────────────
export const CUSTOM_PLAN_REGISTRATION: CustomPlanTextSection = {
  title: {
    zh: '正规登记的外国人患者招徕机构',
    ko: '정식 등록 외국인환자 유치기관',
    en: 'Registered Foreign Patient Attraction Agency',
    ar: 'جهة مسجلة لاستقطاب المرضى الأجانب',
  },
  body: {
    zh: '汉江春天是完成韩国保健福祉部外国人患者招徕业登记的医疗观光公司。\n\n我们按照韩国相关规定，为外国客户提供医疗机构预约、医疗翻译、就医陪同和医疗观光协调服务。\n\n同时，作为登记机构，我们加入相关责任保险体系。若在服务过程中发生沟通或服务相关争议，我们可以协助客户整理资料、沟通医院，并按照相关流程提供协调支持。',
    ko: '한강애봄은 한국 보건복지부 외국인환자 유치업 등록을 완료한 의료관광 회사입니다.\n\n한국 관련 규정에 따라 외국 고객에게 의료기관 예약, 의료통역, 병원 동행, 의료관광 조율 서비스를 제공합니다.\n\n또한 등록기관으로서 관련 책임보험 체계에 가입되어 있으며, 서비스 과정에서 커뮤니케이션 또는 서비스 관련 분쟁이 발생할 경우 자료 정리, 병원 소통, 관련 절차에 따른 조정 지원을 도울 수 있습니다.',
    en: 'K-Medi Spring is a medical tourism company registered for foreign patient attraction under the Korean Ministry of Health and Welfare.\n\nIn accordance with Korean regulations, we provide international clients with medical institution appointment coordination, medical interpretation, hospital accompaniment, and medical tourism coordination services.\n\nAs a registered agency, we are also part of the relevant liability insurance framework. If communication or service-related disputes occur during the process, we can assist with document organization, hospital communication, and coordination support according to the relevant procedures.',
    ar: 'K-Medi هي شركة سياحة علاجية مسجلة لخدمة استقطاب المرضى الأجانب وفق نظام وزارة الصحة والرعاية الاجتماعية في كوريا.\n\nوفقًا للوائح الكورية، نقدم للعملاء الأجانب خدمات تنسيق حجز المؤسسات الطبية، والترجمة الطبية، والمرافقة إلى المستشفى، وتنسيق السياحة العلاجية.\n\nوبصفتنا جهة مسجلة، نحن ضمن إطار تأمين المسؤولية ذي الصلة. إذا حدثت نزاعات متعلقة بالتواصل أو الخدمة أثناء العملية، يمكننا المساعدة في تنظيم الوثائق، والتواصل مع المستشفى، وتقديم دعم تنسيقي وفق الإجراءات المعنية.',
  },
}

// ── Section 3: Serious illness referral ─────────────────────────────
export const CUSTOM_PLAN_REFERRAL: CustomPlanTextSection = {
  title: {
    zh: '重症与疾病客户的医院转诊协调',
    ko: '중증·질병 고객 병원 진료 연계 조율',
    en: 'Hospital Coordination for Serious Illness and Disease Cases',
    ar: 'تنسيق المستشفيات للحالات المرضية والمتقدمة',
  },
  body: {
    zh: '对于癌症、心脑血管疾病、骨科疾病、复杂手术、疑难疾病或需要大学医院级别诊疗的客户，建议先提供既往检查报告、影像资料、病理报告、手术记录或用药资料。\n\n汉江春天可根据资料内容，协助整理病情摘要，并向合作医院或大学医院相关科室进行咨询预约。\n\n我们合作网络中包括多家综合医院及韩国主要大学医院级别的医疗资源，可根据疾病方向、医生专长、预约可能性和客户停留计划进行协调。',
    ko: '암, 심뇌혈관질환, 정형외과 질환, 복잡한 수술, 난치성 질환, 대학병원급 진료가 필요한 고객은 기존 검사결과, 영상자료, 병리결과, 수술기록, 복용약 자료를 먼저 제공하는 것이 좋습니다.\n\n한강애봄은 자료 내용을 바탕으로 병력 요약을 정리하고, 협력병원 또는 대학병원 관련 진료과 상담 예약을 조율할 수 있습니다.\n\n협력 네트워크에는 여러 종합병원 및 한국 주요 대학병원급 의료자원이 포함되어 있으며, 질환 방향, 의사 전문분야, 예약 가능성, 고객 체류 일정에 따라 조율합니다.',
    en: 'For clients with cancer, cardiovascular or cerebrovascular disease, orthopedic disease, complex surgery needs, difficult-to-diagnose conditions, or cases requiring university-hospital-level care, previous test results, imaging files, pathology reports, surgery records, or medication information should be provided first.\n\nK-Medi Spring can help summarize the medical history based on the provided documents and coordinate consultation appointments with partner hospitals or relevant departments at university-hospital-level medical institutions.\n\nOur cooperation network includes several general hospitals and major university-hospital-level medical resources in Korea. Coordination can be arranged based on disease type, doctor specialty, appointment availability, and the client\'s travel plan.',
    ar: 'بالنسبة للعملاء الذين لديهم سرطان، أو أمراض القلب والدماغ والأوعية، أو أمراض العظام، أو يحتاجون إلى عمليات معقدة، أو لديهم حالات صعبة التشخيص، أو يحتاجون إلى رعاية بمستوى مستشفى جامعي، يُفضل تقديم نتائج الفحوصات السابقة، وملفات التصوير، وتقارير علم الأمراض، وسجلات العمليات، ومعلومات الأدوية أولًا.\n\nيمكن لـ K-Medi المساعدة في تلخيص التاريخ المرضي بناءً على الوثائق المقدمة، وتنسيق مواعيد الاستشارة مع المستشفيات المتعاونة أو الأقسام المناسبة في مؤسسات طبية بمستوى المستشفيات الجامعية.\n\nتشمل شبكتنا التعاونية عدة مستشفيات عامة وموارد طبية بمستوى المستشفيات الجامعية الرئيسية في كوريا. ويمكن التنسيق بناءً على نوع المرض، وتخصص الطبيب، وإمكانية الحجز، وخطة إقامة العميل.',
  },
}

// ── Section 4: Personalized hospital selection for aesthetics ──────
export const CUSTOM_PLAN_AESTHETICS_MATCHING: CustomPlanTextSection = {
  title: {
    zh: '皮肤医美与整形客户的个性化医院选择',
    ko: '피부미용·성형 고객 맞춤 병원 선택',
    en: 'Personalized Hospital Selection for Skin Aesthetics and Plastic Surgery',
    ar: 'اختيار مستشفى مخصص للعناية الجلدية التجميلية وجراحة التجميل',
  },
  body: {
    zh: '韩国的皮肤医美和整形医院，每家擅长项目、医生风格、价格区间、服务环境和术后管理方式都不同。\n\n汉江春天不会只推荐一种医院，而是根据客户的预算、项目需求、恢复时间、语言需求和服务期待，整理更适合的医院方向。\n\n如果客户希望控制预算，我们可以协助寻找价格更合理、项目性价比较高的普通医院或专科医院。\n\n如果客户重视隐私、环境、医生沟通时间、术后管理和整体服务体验，我们也可以协助匹配更适合VVIP客户的高端医疗机构。',
    ko: '한국의 피부미용·성형 병원은 병원마다 잘하는 항목, 의사 스타일, 가격대, 서비스 환경, 수술 후 관리 방식이 다릅니다.\n\n한강애봄은 하나의 병원만 추천하지 않고, 고객의 예산, 원하는 항목, 회복 기간, 언어 필요, 서비스 기대 수준에 따라 더 적합한 병원 방향을 정리합니다.\n\n예산을 중요하게 생각하는 고객에게는 가격이 합리적이고 가성비가 좋은 일반 병원 또는 전문 병원을 제안할 수 있습니다.\n\n프라이버시, 환경, 의사 상담 시간, 수술 후 관리, 전체 서비스 경험을 중요하게 생각하는 고객에게는 VVIP 고객에게 적합한 고급 의료기관을 매칭할 수 있습니다.',
    en: 'Skin aesthetics and plastic surgery hospitals in Korea differ in their strengths, doctor style, price range, service environment, and postoperative care system.\n\nK-Medi Spring does not recommend only one type of hospital. We organize more suitable hospital directions based on the client\'s budget, desired procedures, recovery time, language needs, and service expectations.\n\nFor clients who want to manage their budget, we can help find general hospitals or specialty clinics with more reasonable pricing and good value.\n\nFor clients who prioritize privacy, environment, doctor communication time, postoperative management, and overall service experience, we can also help match them with higher-end medical institutions suitable for VVIP clients.',
    ar: 'تختلف مستشفيات الجلدية التجميلية وجراحة التجميل في كوريا من حيث المجالات التي تتميز بها، وأسلوب الطبيب، ونطاق الأسعار، وبيئة الخدمة، وطريقة المتابعة بعد العملية.\n\nلا توصي K-Medi بنوع واحد فقط من المستشفيات، بل تنظم اتجاهات المستشفيات الأنسب بناءً على ميزانية العميل، والإجراءات المطلوبة، ووقت التعافي، واحتياجات اللغة، وتوقعات الخدمة.\n\nإذا كان العميل يرغب في التحكم في الميزانية، يمكننا المساعدة في العثور على مستشفيات عامة أو عيادات متخصصة ذات أسعار أكثر معقولية وقيمة مناسبة.\n\nأما إذا كان العميل يهتم بالخصوصية، والبيئة، ووقت التواصل مع الطبيب، والرعاية بعد العملية، وتجربة الخدمة الكاملة، فيمكننا أيضًا المساعدة في مطابقة مؤسسات طبية راقية مناسبة لعملاء VVIP.',
  },
}

// ── Section 5: Plans by client type ─────────────────────────────────
export const CUSTOM_PLAN_CLIENT_TYPES_TITLE: LocalizedText = {
  zh: '根据客户类型设计不同方案',
  ko: '고객 유형에 따라 다른 플랜을 설계합니다',
  en: 'Plans Designed by Client Type',
  ar: 'خطط مصممة حسب نوع العميل',
}

export const CUSTOM_PLAN_CLIENT_CARDS: CustomPlanClientCard[] = [
  {
    title: {
      zh: '疾病·重症客户',
      ko: '질병·중증 고객',
      en: 'Disease & Serious Illness Clients',
      ar: 'عملاء الأمراض والحالات المتقدمة',
    },
    audience: {
      zh: '适合对象：已有诊断、检查报告、影像资料，需要韩国医院进一步咨询或手术评估的客户。',
      ko: '대상: 진단명, 검사결과, 영상자료가 있고 한국 병원에서 추가 상담 또는 수술 평가가 필요한 고객.',
      en: 'Suitable for: Clients with a diagnosis, test reports, or imaging files who need further consultation or surgical evaluation at a Korean hospital.',
      ar: 'مناسب لـ: العملاء الذين لديهم تشخيص أو تقارير فحوصات أو ملفات تصوير ويحتاجون إلى استشارة إضافية أو تقييم جراحي في مستشفى كوري.',
    },
    serviceFocus: {
      zh: '服务重点：资料整理、科室匹配、医生预约、翻译陪同、住院或复诊安排。',
      ko: '서비스 중점: 자료 정리, 진료과 매칭, 의사 예약, 통역 동행, 입원 또는 재내원 안배.',
      en: 'Service focus: Document organization, department matching, doctor appointment coordination, interpretation support, hospitalization or follow-up arrangement.',
      ar: 'محور الخدمة: تنظيم الوثائق، مطابقة القسم المناسب، تنسيق موعد الطبيب، دعم الترجمة، وترتيب الإقامة في المستشفى أو المتابعة.',
    },
  },
  {
    title: {
      zh: '健康检查·功能医学客户',
      ko: '건강검진·기능의학 고객',
      en: 'Health Checkup & Functional Medicine Clients',
      ar: 'عملاء الفحص الصحي والطب الوظيفي',
    },
    audience: {
      zh: '适合对象：希望在韩国进行精密健康检查、功能医学咨询、慢性疲劳、代谢、激素或抗衰老管理的客户。',
      ko: '대상: 한국에서 정밀 건강검진, 기능의학 상담, 만성피로, 대사, 호르몬, 항노화 관리를 원하는 고객.',
      en: 'Suitable for: Clients who want precision health screening, functional medicine consultation, chronic fatigue, metabolic, hormone, or anti-aging health management in Korea.',
      ar: 'مناسب لـ: العملاء الذين يرغبون في إجراء فحوصات صحية دقيقة، أو استشارة طب وظيفي، أو إدارة التعب المزمن، أو التمثيل الغذائي، أو الهرمونات، أو مكافحة الشيخوخة في كوريا.',
    },
    serviceFocus: {
      zh: '服务重点：检查方向整理、预约、检查前准备、报告翻译和后续咨询连接。',
      ko: '서비스 중점: 검사 방향 정리, 예약, 검사 전 준비, 결과 번역, 후속 상담 연결.',
      en: 'Service focus: Test direction organization, appointments, pre-test preparation, report translation, and follow-up consultation connection.',
      ar: 'محور الخدمة: تنظيم اتجاه الفحوصات، والحجز، والتحضير قبل الفحص، وترجمة التقارير، وربط المتابعة الطبية.',
    },
  },
  {
    title: {
      zh: '皮肤医美·整形客户',
      ko: '피부미용·성형 고객',
      en: 'Skin Aesthetics & Plastic Surgery Clients',
      ar: 'عملاء العناية الجلدية التجميلية وجراحة التجميل',
    },
    audience: {
      zh: '适合对象：希望在韩国进行皮肤管理、注射类项目、提升、整形咨询或手术的客户。',
      ko: '대상: 한국에서 피부관리, 주사 시술, 리프팅, 성형 상담 또는 수술을 원하는 고객.',
      en: 'Suitable for: Clients who want skin treatments, injectable treatments, lifting, plastic surgery consultation, or surgery in Korea.',
      ar: 'مناسب لـ: العملاء الذين يرغبون في العناية بالبشرة، أو الحقن التجميلية، أو الشد، أو استشارة جراحة التجميل أو العملية في كوريا.',
    },
    serviceFocus: {
      zh: '服务重点：医院匹配、价格区间比较、医生风格确认、术前资料整理、术后恢复提醒。',
      ko: '서비스 중점: 병원 매칭, 가격대 비교, 의사 스타일 확인, 수술 전 자료 정리, 수술 후 회복 알림.',
      en: 'Service focus: Hospital matching, price range comparison, doctor style confirmation, preoperative document organization, and recovery reminders.',
      ar: 'محور الخدمة: مطابقة المستشفى، ومقارنة نطاق الأسعار، والتأكد من أسلوب الطبيب، وتنظيم الوثائق قبل العملية، والتذكير بالتعافي.',
    },
  },
  {
    title: {
      zh: 'VIP·VVIP客户',
      ko: 'VIP·VVIP 고객',
      en: 'VIP & VVIP Clients',
      ar: 'عملاء VIP وVVIP',
    },
    audience: {
      zh: '适合对象：重视隐私、环境、车辆、住宿、专属陪同和整体体验的客户。',
      ko: '대상: 프라이버시, 환경, 차량, 숙박, 전담 동행, 전체 경험을 중요하게 생각하는 고객.',
      en: 'Suitable for: Clients who value privacy, environment, transportation, accommodation, dedicated accompaniment, and overall service experience.',
      ar: 'مناسب لـ: العملاء الذين يهتمون بالخصوصية، والبيئة، والنقل، والإقامة، والمرافقة الخاصة، وتجربة الخدمة الكاملة.',
    },
    serviceFocus: {
      zh: '服务重点：独立行程设计、高端医院匹配、专车安排、酒店协助、翻译陪同和恢复期生活支持。',
      ko: '서비스 중점: 독립 일정 설계, 고급 병원 매칭, 전용 차량 안배, 호텔 협조, 통역 동행, 회복 기간 생활 지원.',
      en: 'Service focus: Private itinerary design, premium hospital matching, private vehicle arrangement, hotel support, interpretation accompaniment, and recovery-period lifestyle support.',
      ar: 'محور الخدمة: تصميم جدول مستقل، ومطابقة مستشفى راقٍ، وترتيب سيارة خاصة، ودعم الفندق، والمرافقة والترجمة، ودعم الحياة اليومية أثناء فترة التعافي.',
    },
  },
]

// ── Section 6: Service process ──────────────────────────────────────
export const CUSTOM_PLAN_PROCESS_TITLE: LocalizedText = {
  zh: '服务流程',
  ko: '서비스 진행 절차',
  en: 'Service Process',
  ar: 'خطوات الخدمة',
}

export const CUSTOM_PLAN_STEPS: CustomPlanStep[] = [
  {
    title: {
      zh: '告诉我们您的来韩目的',
      ko: '방문 목적을 알려주세요',
      en: 'Tell Us Your Purpose for Visiting Korea',
      ar: 'أخبرنا بهدف زيارتك إلى كوريا',
    },
    desc: {
      zh: '健康检查、疾病治疗、皮肤医美、整形手术、女性健康、男性健康或恢复管理。',
      ko: '건강검진, 질병 치료, 피부미용, 성형수술, 여성건강, 남성건강, 회복관리 등.',
      en: 'Health checkup, disease treatment, skin aesthetics, plastic surgery, women\'s health, men\'s health, or recovery care.',
      ar: 'فحص صحي، علاج مرض، عناية جلدية تجميلية، جراحة تجميل، صحة المرأة، صحة الرجل، أو رعاية التعافي.',
    },
  },
  {
    title: {
      zh: '提供基础资料',
      ko: '기초자료를 제공해주세요',
      en: 'Provide Basic Information',
      ar: 'قدّم المعلومات الأساسية',
    },
    desc: {
      zh: '包括年龄、停留时间、同行人数、既往检查报告、影像资料、照片或希望咨询的项目。',
      ko: '나이, 체류 기간, 동행 인원, 기존 검사결과, 영상자료, 사진 또는 상담 희망 항목 등.',
      en: 'Age, length of stay, number of companions, previous reports, imaging files, photos, or desired consultation items.',
      ar: 'العمر، ومدة الإقامة، وعدد المرافقين، والتقارير السابقة، وملفات التصوير، والصور، أو العناصر التي ترغب في استشارتها.',
    },
  },
  {
    title: {
      zh: '整理医院方向',
      ko: '병원 방향을 정리합니다',
      en: 'Organize Hospital Direction',
      ar: 'تنظيم اتجاه المستشفى',
    },
    desc: {
      zh: '汉江春天根据客户资料，整理适合咨询的医院、科室或医生方向。',
      ko: '한강애봄은 고객 자료를 기준으로 상담 가능한 병원, 진료과, 의사 방향을 정리합니다.',
      en: 'K-Medi Spring organizes suitable hospital, department, or doctor consultation directions based on the client\'s information.',
      ar: 'تنظم K-Medi اتجاهات المستشفى أو القسم أو الطبيب المناسب بناءً على معلومات العميل.',
    },
  },
  {
    title: {
      zh: '确认行程与费用范围',
      ko: '일정과 비용 범위를 확인합니다',
      en: 'Confirm Itinerary and Cost Range',
      ar: 'تأكيد الجدول ونطاق التكلفة',
    },
    desc: {
      zh: '确认医院预约、车辆、住宿、翻译陪同、复诊安排和整体费用范围。',
      ko: '병원 예약, 차량, 숙박, 통역 동행, 재내원 안배, 전체 비용 범위를 확인합니다.',
      en: 'We confirm hospital appointments, transportation, accommodation, interpretation support, follow-up arrangements, and overall cost range.',
      ar: 'نؤكد حجز المستشفى، والنقل، والإقامة، ودعم الترجمة، وترتيبات المتابعة، ونطاق التكلفة العام.',
    },
  },
  {
    title: {
      zh: '到韩国后按日程进行',
      ko: '한국 도착 후 일정에 따라 진행합니다',
      en: 'Proceed According to the Schedule in Korea',
      ar: 'المتابعة حسب الجدول في كوريا',
    },
    desc: {
      zh: '根据预约时间完成咨询、检查、治疗或手术，并协助理解医院说明。',
      ko: '예약 시간에 맞춰 상담, 검사, 치료 또는 수술을 진행하고 병원 안내 이해를 돕습니다.',
      en: 'Consultations, tests, treatment, or surgery proceed according to appointment times, and we help clients understand hospital instructions.',
      ar: 'تتم الاستشارات أو الفحوصات أو العلاج أو العملية حسب مواعيد الحجز، ونساعد العميل على فهم تعليمات المستشفى.',
    },
  },
  {
    title: {
      zh: '回国前确认',
      ko: '귀국 전 확인합니다',
      en: 'Pre-Departure Check',
      ar: 'التأكد قبل العودة',
    },
    desc: {
      zh: '确认复诊、拆线、用药、异常症状联系医院和回国后注意事项。',
      ko: '재내원, 실밥 제거, 약 복용, 이상 증상 시 병원 연락, 귀국 후 주의사항을 확인합니다.',
      en: 'We confirm follow-up visits, stitch removal, medication, hospital contact for abnormal symptoms, and post-return precautions.',
      ar: 'نؤكد مواعيد المتابعة، وإزالة الغرز، والأدوية، والتواصل مع المستشفى عند ظهور أعراض غير طبيعية، والتعليمات بعد العودة.',
    },
  },
]
