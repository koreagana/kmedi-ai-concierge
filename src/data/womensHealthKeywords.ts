import { WECHAT_BIZ_URL } from './contacts'
import type { LocalizedText, BigHealthBullet } from './bigHealthKeywords'

export interface WomensHealthDocButton {
  label: LocalizedText
  kind: 'route' | 'external'
  target: string
}

// NOTE: "여성의학 초진 문진표 / 女性健康初诊问诊表" does not exist yet (prepDocuments.ts
// explicitly lists 여성의학 under "아직 등록된 문서 없음"), so it is intentionally left out.
// The other three candidate documents are the existing generic ones reused across
// categories (functional medicine intake, health checkup prep, blood test prep).
export const WOMENS_HEALTH_DOC_BUTTONS = {
  functionalIntake: {
    label: {
      zh: '填写功能医学初诊问诊表',
      ko: '기능의학 문진표 작성하기',
      en: 'Fill Out the Functional Medicine Intake Form',
      ar: 'تعبئة استمارة الطب الوظيفي',
    },
    kind: 'route',
    target: '/intake/functional/',
  },
  healthCheckupPrep: {
    label: {
      zh: '查看健康检查前准备事项',
      ko: '건강검진 전 준비사항 보기',
      en: 'View Health Checkup Preparation Guide',
      ar: 'عرض إرشادات التحضير للفحص الصحي',
    },
    kind: 'route',
    target: '/prep/health-checkup-before/',
  },
  bloodTestPrep: {
    label: {
      zh: '查看血液检查前注意事项',
      ko: '혈액검사 전 안내 보기',
      en: 'View Blood Test Preparation Guide',
      ar: 'عرض إرشادات التحضير لفحص الدم',
    },
    kind: 'route',
    target: '/prep/blood-test-before/',
  },
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
} satisfies Record<string, WomensHealthDocButton>

export type WomensHealthDocButtonKey = keyof typeof WOMENS_HEALTH_DOC_BUTTONS

export interface WomensHealthKeyword {
  id: string
  title: LocalizedText
  description: LocalizedText
  directionsLabel: LocalizedText
  directions: BigHealthBullet[]
  note: LocalizedText
  docKeys: WomensHealthDocButtonKey[]
}

const DIRECTIONS_LABEL: LocalizedText = {
  zh: '可能咨询方向',
  ko: '관련 상담 방향',
  en: 'Possible Consultation Areas',
  ar: 'مجالات الاستشارة المحتملة',
}

export const WOMENS_HEALTH_SECTION = {
  title: {
    zh: '女性健康中心',
    ko: '여성건강센터',
    en: "Women's Health Center",
    ar: 'مركز صحة المرأة',
  } as LocalizedText,
  subCopy: {
    zh: '妇科检查 · 备孕与不孕咨询 · 卵子冷冻 · 私密护理 · 更年期管理',
    ko: '산부인과 상담 · 임신준비·난임 상담 · 난자보존 · 여성 프라이빗 케어 · 갱년기 관리',
    en: 'Gynecologic Consultation · Fertility Planning · Egg Freezing · Intimate Care · Menopause Management',
    ar: 'استشارة نسائية · التخطيط للحمل وعلاج تأخر الحمل · تجميد البويضات · العناية الحميمة · إدارة سن اليأس',
  } as LocalizedText,
  desc: {
    zh: '韩国女性健康咨询不只是单一检查，而是根据年龄、症状、月经情况、怀孕计划、既往病史和来韩停留时间，整理适合咨询的妇科与女性健康方向。',
    ko: '한국 여성건강 상담은 단순한 검사가 아니라, 나이, 증상, 생리 상태, 임신 계획, 기존 병력, 한국 체류 기간을 기준으로 산부인과 및 여성 건강 상담 방향을 정리하는 과정입니다.',
    en: "Women's health consultation in Korea is not just a single test. It is a process of organizing consultation directions based on age, symptoms, menstrual history, pregnancy plans, previous medical history, and length of stay in Korea.",
    ar: 'استشارة صحة المرأة في كوريا ليست مجرد فحص واحد، بل هي عملية تنظيم اتجاه الاستشارة بناءً على العمر، والأعراض، والدورة الشهرية، وخطة الحمل، والتاريخ المرضي، ومدة الإقامة في كوريا.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国女性健康咨询前的信息整理，不代替医生诊断或治疗判断。',
      ko: '본 페이지는 한국 여성건강 상담 전 정보 정리를 위한 참고 안내이며 의사의 진단이나 치료 판단을 대신하지 않습니다.',
      en: "This page is for organizing information before a women's health consultation in Korea and does not replace a doctor's diagnosis or treatment decision.",
      ar: 'هذه الصفحة مخصصة لتنظيم المعلومات قبل استشارة صحة المرأة في كوريا، ولا تحل محل تشخيص الطبيب أو قراره العلاجي.',
    },
    {
      zh: '具体是否需要检查、治疗、手术或辅助生殖相关咨询，需要由正规医疗机构和专业医生判断。',
      ko: '검사, 치료, 수술 또는 보조생식 관련 상담 필요 여부는 정규 의료기관과 전문의가 판단해야 합니다.',
      en: 'Whether tests, treatment, surgery, or assisted reproduction consultation is needed must be determined by a licensed medical institution and qualified doctors.',
      ar: 'الحاجة إلى الفحوصات أو العلاج أو الجراحة أو استشارات تقنيات المساعدة على الإنجاب يجب أن يحددها المستشفى والطبيب المختص.',
    },
  ] as LocalizedText[],
}

export const WOMENS_HEALTH_KEYWORDS: WomensHealthKeyword[] = [
  {
    id: 'basic-gynecologic',
    title: {
      zh: '妇科基础咨询',
      ko: '산부인과 기본상담',
      en: 'Basic Gynecologic Consultation',
      ar: 'استشارة نسائية أساسية',
    },
    description: {
      zh: '妇科基础咨询主要用于整理分泌物变化、异味、瘙痒、下腹部不适、月经变化、性交后不适或反复炎症等女性健康问题。具体需要哪些检查，需要由妇科医生根据症状和既往病史判断。',
      ko: '산부인과 기본상담은 분비물 변화, 냄새, 가려움, 하복부 불편감, 생리 변화, 관계 후 불편감, 반복되는 염증 등 여성 건강 고민을 정리하는 과정입니다. 구체적으로 어떤 검사가 필요한지는 산부인과 의사가 증상과 기존 병력에 따라 판단해야 합니다.',
      en: "Basic gynecologic consultation helps organize concerns such as changes in discharge, odor, itching, lower abdominal discomfort, menstrual changes, discomfort after intercourse, or recurrent inflammation. The specific tests needed must be determined by a gynecologist based on symptoms and medical history.",
      ar: 'تهدف الاستشارة النسائية الأساسية إلى تنظيم الشكاوى مثل تغير الإفرازات، أو الرائحة، أو الحكة، أو ألم أسفل البطن، أو تغيرات الدورة الشهرية، أو الانزعاج بعد العلاقة، أو الالتهابات المتكررة. نوع الفحوصات المطلوبة يجب أن يحدده طبيب النساء بناءً على الأعراض والتاريخ المرضي.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '分泌物或异味相关咨询', ko: '분비물 또는 냄새 관련 상담', en: 'Discharge or odor-related consultation', ar: 'استشارة تغير الإفرازات أو الرائحة' },
      { zh: '瘙痒或不适相关咨询', ko: '가려움 또는 불편감 관련 상담', en: 'Itching or discomfort consultation', ar: 'استشارة الحكة أو الانزعاج' },
      { zh: '月经周期变化咨询', ko: '생리주기 변화 상담', en: 'Menstrual cycle change consultation', ar: 'استشارة تغيرات الدورة الشهرية' },
      { zh: '下腹部或骨盆不适咨询', ko: '하복부 또는 골반 불편감 상담', en: 'Lower abdominal or pelvic discomfort consultation', ar: 'استشارة ألم أسفل البطن أو الحوض' },
      { zh: '反复炎症相关咨询', ko: '반복되는 염증 관련 상담', en: 'Recurrent inflammation consultation', ar: 'استشارة الالتهابات المتكررة' },
      { zh: '既往检查结果整理', ko: '기존 검사결과 정리', en: 'Review of previous test results', ar: 'تنظيم نتائج الفحوصات السابقة' },
    ],
    note: {
      zh: '这些症状可能由多种原因引起，不能仅凭描述判断。是否需要检查或治疗，需要医生面诊后决定。',
      ko: '이러한 증상은 여러 원인으로 발생할 수 있으므로 설명만으로 판단할 수 없습니다. 검사 또는 치료 필요 여부는 의사 면담 후 결정해야 합니다.',
      en: "These symptoms can have various causes and cannot be judged by description alone. Whether tests or treatment are needed must be determined after a doctor's consultation.",
      ar: 'قد تنتج هذه الأعراض عن أسباب متعددة ولا يمكن الحكم عليها من الوصف فقط. الحاجة إلى الفحص أو العلاج يجب أن يحددها الطبيب بعد الاستشارة.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'cervix-hpv',
    title: {
      zh: '宫颈·HPV咨询',
      ko: '자궁경부·HPV 상담',
      en: 'Cervix & HPV Consultation',
      ar: 'استشارة عنق الرحم وفيروس HPV',
    },
    description: {
      zh: '宫颈和HPV相关咨询主要用于整理宫颈癌筛查、HPV检查、既往异常结果、疫苗接种情况和复查计划。若过去检查结果异常，建议提前准备报告。',
      ko: '자궁경부·HPV 상담은 자궁경부암 검진, HPV 검사, 기존 이상 결과, 백신 접종 여부, 재검 계획 등을 정리하는 과정입니다. 과거 검사결과가 이상으로 나온 적이 있다면 결과지를 미리 준비하는 것이 좋습니다.',
      en: 'Cervix and HPV consultation helps organize cervical cancer screening, HPV testing, previous abnormal results, vaccination history, and follow-up plans. If there were abnormal results in the past, previous reports should be prepared.',
      ar: 'تساعد استشارة عنق الرحم وHPV في تنظيم معلومات فحص سرطان عنق الرحم، وفحص فيروس HPV، والنتائج غير الطبيعية السابقة، وتاريخ التطعيم، وخطة المتابعة. إذا كانت هناك نتائج غير طبيعية سابقة، فمن الأفضل تحضير التقارير.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '宫颈癌筛查相关咨询', ko: '자궁경부암 검진 관련 상담', en: 'Cervical cancer screening consultation', ar: 'استشارة فحص سرطان عنق الرحم' },
      { zh: 'HPV相关咨询', ko: 'HPV 관련 상담', en: 'HPV-related consultation', ar: 'استشارة متعلقة بفيروس HPV' },
      { zh: '既往异常检查结果整理', ko: '기존 이상 검사결과 정리', en: 'Review of previous abnormal results', ar: 'مراجعة النتائج غير الطبيعية السابقة' },
      { zh: 'HPV疫苗相关咨询', ko: 'HPV 백신 관련 상담', en: 'HPV vaccine consultation', ar: 'استشارة لقاح HPV' },
      { zh: '复查周期和医院咨询方向整理', ko: '재검 주기와 병원 상담 방향 정리', en: 'Follow-up schedule and hospital consultation direction', ar: 'تنظيم خطة المتابعة واتجاه الاستشارة' },
    ],
    note: {
      zh: 'HPV感染或宫颈检查异常并不等于一定患有癌症。具体判断、复查和治疗方向需要由妇科医生确认。',
      ko: 'HPV 감염이나 자궁경부 검사 이상이 곧 암을 의미하는 것은 아닙니다. 구체적인 판단, 재검, 치료 방향은 산부인과 의사가 확인해야 합니다.',
      en: 'HPV infection or an abnormal cervical test does not necessarily mean cancer. Diagnosis, follow-up, and treatment direction must be confirmed by a gynecologist.',
      ar: 'وجود فيروس HPV أو نتيجة غير طبيعية في فحص عنق الرحم لا يعني بالضرورة وجود سرطان. التشخيص والمتابعة وخطة العلاج يجب أن يحددها طبيب النساء.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'ovary-uterus',
    title: {
      zh: '卵巢·子宫咨询',
      ko: '난소·자궁 상담',
      en: 'Ovary & Uterus Consultation',
      ar: 'استشارة المبيض والرحم',
    },
    description: {
      zh: '卵巢和子宫相关咨询主要用于整理子宫肌瘤、子宫腺肌症、卵巢囊肿、月经量变化、严重痛经、下腹部不适或异常出血等问题。既往检查报告对医生判断非常有帮助。',
      ko: '난소·자궁 상담은 자궁근종, 자궁선근증, 난소낭종, 생리량 변화, 심한 생리통, 하복부 불편감, 부정출혈 등의 고민을 정리하는 과정입니다. 기존 검사결과지는 의사가 판단하는 데 도움이 됩니다.',
      en: 'Ovary and uterus consultation helps organize concerns such as uterine fibroids, adenomyosis, ovarian cysts, changes in menstrual volume, severe menstrual pain, lower abdominal discomfort, or abnormal bleeding. Previous reports are helpful for the doctor\'s evaluation.',
      ar: 'تساعد استشارة المبيض والرحم في تنظيم الشكاوى مثل الأورام الليفية الرحمية، والعضال الغدي، وأكياس المبيض، وتغير كمية الدورة، وآلام الدورة الشديدة، وألم أسفل البطن، أو النزيف غير الطبيعي. التقارير السابقة تساعد الطبيب في التقييم.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '子宫肌瘤相关咨询', ko: '자궁근종 관련 상담', en: 'Uterine fibroid consultation', ar: 'استشارة الأورام الليفية الرحمية' },
      { zh: '卵巢囊肿相关咨询', ko: '난소낭종 관련 상담', en: 'Ovarian cyst consultation', ar: 'استشارة أكياس المبيض' },
      { zh: '月经量变化咨询', ko: '생리량 변화 상담', en: 'Menstrual volume change consultation', ar: 'استشارة تغير كمية الدورة' },
      { zh: '严重痛经咨询', ko: '심한 생리통 상담', en: 'Severe menstrual pain consultation', ar: 'استشارة آلام الدورة الشديدة' },
      { zh: '异常出血咨询', ko: '부정출혈 상담', en: 'Abnormal bleeding consultation', ar: 'استشارة النزيف غير الطبيعي' },
      { zh: '既往影像或检查资料整理', ko: '기존 영상자료 또는 검사자료 정리', en: 'Review of previous imaging or test reports', ar: 'مراجعة صور أو تقارير الفحوصات السابقة' },
    ],
    note: {
      zh: '是否需要观察、药物治疗、手术或进一步检查，需要由妇科医生根据检查结果判断。',
      ko: '관찰, 약물치료, 수술, 추가 검사 필요 여부는 산부인과 의사가 검사결과를 바탕으로 판단해야 합니다.',
      en: 'Whether observation, medication, surgery, or further tests are needed must be determined by a gynecologist based on test results.',
      ar: 'الحاجة إلى المراقبة، أو الدواء، أو الجراحة، أو فحوصات إضافية يجب أن يحددها طبيب النساء بناءً على نتائج الفحوصات.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'fertility-infertility',
    title: {
      zh: '备孕·不孕咨询',
      ko: '임신준비·난임 상담',
      en: 'Fertility Planning & Infertility',
      ar: 'التخطيط للحمل وتأخر الحمل',
    },
    description: {
      zh: '备孕和不孕咨询主要用于整理怀孕计划、备孕时间、月经周期、既往怀孕或流产经历、既往检查结果和夫妻双方的相关资料。是否需要进一步检查或辅助生殖咨询，需要由医院判断。',
      ko: '임신준비·난임 상담은 임신 계획, 임신 시도 기간, 생리주기, 기존 임신 또는 유산 경험, 기존 검사결과, 부부 양측 관련 자료를 정리하는 과정입니다. 추가 검사 또는 보조생식 상담 필요 여부는 병원이 판단해야 합니다.',
      en: 'Fertility planning and infertility consultation helps organize pregnancy plans, duration of trying to conceive, menstrual cycle, previous pregnancy or miscarriage history, previous test results, and information from both partners. Whether further testing or assisted reproduction consultation is needed must be determined by the hospital.',
      ar: 'تساعد استشارة التخطيط للحمل وتأخر الحمل في تنظيم خطة الحمل، ومدة محاولة الحمل، والدورة الشهرية، وتاريخ الحمل أو الإجهاض السابق، ونتائج الفحوصات السابقة، ومعلومات الزوجين. الحاجة إلى فحوصات إضافية أو استشارة تقنيات المساعدة على الإنجاب يجب أن يحددها المستشفى.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '备孕前身体状态整理', ko: '임신 준비 전 몸 상태 정리', en: 'Pre-pregnancy health organization', ar: 'تنظيم الحالة الصحية قبل الحمل' },
      { zh: '月经和排卵情况整理', ko: '생리와 배란 상태 정리', en: 'Menstrual and ovulation history', ar: 'تنظيم الدورة الشهرية والإباضة' },
      { zh: '不孕相关检查咨询', ko: '난임 관련 검사 상담', en: 'Infertility-related test consultation', ar: 'استشارة فحوصات تأخر الحمل' },
      { zh: '夫妻双方资料整理', ko: '부부 양측 자료 정리', en: 'Information organization for both partners', ar: 'تنظيم معلومات الزوجين' },
      { zh: '人工授精或试管婴儿相关咨询', ko: '인공수정 또는 시험관 관련 상담', en: 'IUI or IVF-related consultation', ar: 'استشارة التلقيح الصناعي أو أطفال الأنابيب' },
      { zh: '反复流产相关咨询', ko: '반복 유산 관련 상담', en: 'Recurrent miscarriage consultation', ar: 'استشارة الإجهاض المتكرر' },
      { zh: '既往检查结果整理', ko: '기존 검사결과 정리', en: 'Review of previous test results', ar: 'مراجعة نتائج الفحوصات السابقة' },
    ],
    note: {
      zh: '不孕咨询需要结合年龄、卵巢功能、月经周期、既往病史和伴侣因素综合判断。具体治疗方向和成功可能性需要由生殖医学专业医生判断。',
      ko: '난임 상담은 나이, 난소 기능, 생리주기, 기존 병력, 배우자 요인을 함께 고려해야 합니다. 구체적인 치료 방향과 성공 가능성은 생식의학 전문의가 판단해야 합니다.',
      en: 'Infertility consultation requires comprehensive evaluation of age, ovarian function, menstrual cycle, medical history, and partner factors. Treatment direction and success possibility must be determined by a reproductive medicine specialist.',
      ar: 'تحتاج استشارة تأخر الحمل إلى تقييم العمر، ووظيفة المبيض، والدورة الشهرية، والتاريخ المرضي، وعوامل الزوج. اتجاه العلاج واحتمال النجاح يجب أن يحدده طبيب مختص في طب الإنجاب.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
  {
    id: 'egg-freezing',
    title: {
      zh: '卵子冷冻',
      ko: '난자보존',
      en: 'Egg Freezing',
      ar: 'تجميد البويضات',
    },
    description: {
      zh: '卵子冷冻咨询适合目前没有立即怀孕计划，但希望了解未来生育选择的客户。咨询时通常需要结合年龄、卵巢功能、身体状态、可来韩时间和未来使用计划进行整理。',
      ko: '난자보존 상담은 당장 임신 계획은 없지만 향후 임신 가능성을 고려하고 싶은 고객에게 적합한 상담입니다. 상담 시 나이, 난소 기능, 몸 상태, 한국 방문 가능 시기, 향후 사용 계획 등을 함께 정리해야 합니다.',
      en: 'Egg freezing consultation is suitable for clients who do not plan to become pregnant immediately but want to understand future fertility options. Consultation should consider age, ovarian function, health condition, possible travel time to Korea, and future use plans.',
      ar: 'استشارة تجميد البويضات مناسبة لمن لا يخططن للحمل فورًا ولكن يرغبن في فهم خيارات الإنجاب المستقبلية. يجب أن تشمل الاستشارة العمر، ووظيفة المبيض، والحالة الصحية، وإمكانية السفر إلى كوريا، وخطة الاستخدام المستقبلية.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '卵巢功能相关咨询', ko: '난소 기능 관련 상담', en: 'Ovarian function consultation', ar: 'استشارة وظيفة المبيض' },
      { zh: '卵子冷冻流程咨询', ko: '난자보존 절차 상담', en: 'Egg freezing process consultation', ar: 'استشارة خطوات تجميد البويضات' },
      { zh: '来韩时间和停留时间整理', ko: '한국 방문 시기와 체류 기간 정리', en: 'Travel and length-of-stay planning', ar: 'تنظيم وقت السفر ومدة الإقامة' },
      { zh: '未来使用计划咨询', ko: '향후 사용 계획 상담', en: 'Future use planning', ar: 'استشارة خطة الاستخدام المستقبلية' },
      { zh: '与试管婴儿相关的后续咨询', ko: '시험관 시술과 관련된 후속 상담', en: 'Follow-up consultation related to IVF', ar: 'استشارة لاحقة مرتبطة بأطفال الأنابيب' },
      { zh: '费用和保存周期相关问题整理', ko: '비용과 보관 기간 관련 질문 정리', en: 'Cost and storage period questions', ar: 'تنظيم الأسئلة حول التكلفة ومدة التخزين' },
    ],
    note: {
      zh: '卵子冷冻不等于保证未来一定怀孕。成功可能性与年龄、卵子数量、卵子质量、健康状态和未来使用方式有关，需要由生殖医学专业医生说明。',
      ko: '난자보존은 향후 임신을 보장하는 절차가 아닙니다. 성공 가능성은 나이, 난자 수, 난자 질, 건강 상태, 향후 사용 방식에 따라 달라질 수 있으며, 생식의학 전문의의 설명이 필요합니다.',
      en: 'Egg freezing does not guarantee future pregnancy. Success possibility depends on age, number and quality of eggs, health condition, and future use method, and must be explained by a reproductive medicine specialist.',
      ar: 'تجميد البويضات لا يضمن الحمل في المستقبل. احتمال النجاح يعتمد على العمر، وعدد وجودة البويضات، والحالة الصحية، وطريقة الاستخدام المستقبلية، ويجب أن يشرحه طبيب مختص في طب الإنجاب.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep'],
  },
  {
    id: 'intimate-care',
    title: {
      zh: '私密护理',
      ko: '여성 프라이빗 케어',
      en: 'Intimate Care',
      ar: 'العناية الحميمة',
    },
    description: {
      zh: '私密护理咨询主要用于整理产后变化、私密部位松弛感、干涩、不适、轻度漏尿、外阴颜色或形态相关困扰等问题。相关项目需要根据症状、分娩经历、炎症状态、皮肤状态和医生判断决定是否适合。',
      ko: '여성 프라이빗 케어 상담은 출산 후 변화, 프라이빗 부위의 느슨함, 건조감, 불편감, 경미한 요실금, 외음부 색 또는 형태 관련 고민을 정리하는 과정입니다. 관련 항목은 증상, 출산 이력, 염증 상태, 피부 상태, 의료진 판단에 따라 적합 여부를 확인해야 합니다.',
      en: "Intimate care consultation helps organize concerns such as postpartum changes, looseness, dryness, discomfort, mild urinary leakage, and concerns about color or shape of the intimate area. Suitability depends on symptoms, childbirth history, inflammation status, skin condition, and doctor's judgment.",
      ar: 'تساعد استشارة العناية الحميمة في تنظيم الشكاوى المتعلقة بالتغيرات بعد الولادة، أو الشعور بالارتخاء، أو الجفاف، أو الانزعاج، أو تسرب البول الخفيف، أو القلق بشأن اللون أو الشكل في المنطقة الحميمة. مدى المناسبة يعتمد على الأعراض، وتاريخ الولادة، وحالة الالتهاب، وحالة الجلد، وتقييم الطبيب.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '私密紧致咨询', ko: '질타이트닝 상담', en: 'Intimate tightening consultation', ar: 'استشارة شد المنطقة الحميمة' },
      { zh: '外阴美白咨询', ko: '외음부 미백 상담', en: 'External intimate area brightening consultation', ar: 'استشارة تفتيح المنطقة الخارجية' },
      { zh: '小阴唇形态咨询', ko: '소음순 형태 상담', en: 'Labia shape consultation', ar: 'استشارة شكل الشفرين' },
      { zh: '产后私密恢复咨询', ko: '출산 후 프라이빗 회복 상담', en: 'Postpartum intimate recovery consultation', ar: 'استشارة التعافي بعد الولادة' },
      { zh: '干涩与不适咨询', ko: '건조감과 불편감 상담', en: 'Dryness and discomfort consultation', ar: 'استشارة الجفاف والانزعاج' },
      { zh: '轻度漏尿相关咨询', ko: '경미한 요실금 관련 상담', en: 'Mild urinary leakage consultation', ar: 'استشارة تسرب البول الخفيف' },
      { zh: '女性私密激光或能量设备相关咨询', ko: '여성 프라이빗 레이저 또는 에너지 장비 관련 상담', en: "Women's intimate laser or energy-device consultation", ar: 'استشارة الليزر أو أجهزة الطاقة للمنطقة الحميمة' },
    ],
    note: {
      zh: '私密护理项目不应承诺性功能改善、美白效果或产前状态恢复。是否适合相关治疗，需要由妇科医生根据症状和检查结果判断。',
      ko: '여성 프라이빗 케어는 성기능 개선, 미백 효과, 출산 전 상태 회복을 약속해서는 안 됩니다. 관련 치료 적합 여부는 산부인과 의사가 증상과 검사결과를 바탕으로 판단해야 합니다.',
      en: 'Intimate care should not promise sexual function improvement, whitening results, or return to pre-childbirth condition. Suitability must be determined by a gynecologist based on symptoms and test results.',
      ar: 'لا ينبغي أن تعد العناية الحميمة بتحسين الوظيفة الجنسية، أو نتائج التفتيح، أو العودة إلى حالة ما قبل الولادة. مدى مناسبة العلاج يجب أن يحدده طبيب النساء بناءً على الأعراض ونتائج الفحوصات.',
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'menopause-hormones',
    title: {
      zh: '更年期·激素管理',
      ko: '갱년기·호르몬 관리',
      en: 'Menopause & Hormone Management',
      ar: 'سن اليأس وإدارة الهرمونات',
    },
    description: {
      zh: '更年期和激素管理咨询主要用于整理潮热、睡眠问题、情绪变化、体重变化、月经变化、阴道干涩、疲劳感和骨健康相关问题。是否需要检查、药物或生活方式管理，需要由医生判断。',
      ko: '갱년기·호르몬 관리 상담은 안면홍조, 수면 문제, 감정 변화, 체중 변화, 생리 변화, 질건조, 피로감, 뼈 건강 관련 고민을 정리하는 과정입니다. 검사, 약물, 생활습관 관리 필요 여부는 의사가 판단해야 합니다.',
      en: 'Menopause and hormone management consultation helps organize concerns such as hot flashes, sleep problems, mood changes, weight changes, menstrual changes, vaginal dryness, fatigue, and bone health. Whether tests, medication, or lifestyle management is needed must be determined by a doctor.',
      ar: 'تساعد استشارة سن اليأس وإدارة الهرمونات في تنظيم الشكاوى مثل الهبات الساخنة، ومشكلات النوم، وتغير المزاج، وتغير الوزن، وتغير الدورة الشهرية، وجفاف المهبل، والتعب، وصحة العظام. الحاجة إلى الفحوصات أو الأدوية أو إدارة نمط الحياة يجب أن يحددها الطبيب.',
    },
    directionsLabel: DIRECTIONS_LABEL,
    directions: [
      { zh: '更年期状态咨询', ko: '갱년기 상태 상담', en: 'Menopause status consultation', ar: 'استشارة حالة سن اليأس' },
      { zh: '女性激素相关咨询', ko: '여성호르몬 관련 상담', en: 'Female hormone-related consultation', ar: 'استشارة الهرمونات الأنثوية' },
      { zh: '甲状腺和代谢状态咨询', ko: '갑상선 및 대사 상태 상담', en: 'Thyroid and metabolic status consultation', ar: 'استشارة الغدة الدرقية والتمثيل الغذائي' },
      { zh: '睡眠和情绪变化咨询', ko: '수면과 감정 변화 상담', en: 'Sleep and mood change consultation', ar: 'استشارة النوم وتغيرات المزاج' },
      { zh: '阴道干涩或不适咨询', ko: '질건조 또는 불편감 상담', en: 'Vaginal dryness or discomfort consultation', ar: 'استشارة جفاف المهبل أو الانزعاج' },
      { zh: '骨健康和营养状态咨询', ko: '뼈 건강 및 영양 상태 상담', en: 'Bone health and nutrition consultation', ar: 'استشارة صحة العظام والتغذية' },
      { zh: '抗衰老健康管理咨询', ko: '항노화 건강관리 상담', en: 'Anti-aging health management consultation', ar: 'استشارة إدارة الصحة ومكافحة الشيخوخة' },
    ],
    note: {
      zh: '激素相关治疗或补充并不适合所有人，需要结合年龄、病史、家族史、检查结果和医生判断。',
      ko: '호르몬 관련 치료나 보충은 모든 사람에게 적합한 것은 아니며, 나이, 병력, 가족력, 검사결과, 의사의 판단을 함께 고려해야 합니다.',
      en: "Hormone-related treatment or supplementation is not suitable for everyone. Age, medical history, family history, test results, and doctor's judgment must be considered.",
      ar: 'العلاج أو المكملات المتعلقة بالهرمونات ليست مناسبة للجميع. يجب مراعاة العمر، والتاريخ المرضي، والتاريخ العائلي، ونتائج الفحوصات، وتقييم الطبيب.',
    },
    docKeys: ['functionalIntake', 'healthCheckupPrep', 'bloodTestPrep'],
  },
]
