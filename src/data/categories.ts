export type CategoryId =
  | 'big-health'
  | 'stem-cell'
  | 'skin-beauty'
  | 'plastic-surgery'
  | 'womens-care'
  | 'mens-health'
  | 'medical-tourism'
  | 'custom-plan'

export interface Category {
  id: CategoryId
  zh: string
  ko: string
  en: string
  ar: string
  emoji: string
  /** 카테고리 히어로 영역에 표시할 실사 이미지 경로 (public/ 기준). 없으면 기존 그라디언트만 표시. */
  heroImage?: string
  /** heroImage 대신 배경 전체를 커버하는 영상으로 대체. 설정 시 heroImage는 poster로만 사용. */
  heroVideo?: string
  tagZh: string
  tagKo: string
  tagEn: string
  tagAr: string
  scriptFullZh: string
  scriptFullKo: string
  scriptFullEn: string
  scriptFullAr: string
  scriptSummaryZh: string
  scriptSummaryKo: string
  scriptSummaryEn: string
  scriptSummaryAr: string
}

export const categories: Category[] = [
  {
    id: 'big-health',
    zh: '大健康',
    ko: '항노화·건강관리',
    en: 'Anti-aging & Health Management',
    ar: 'مكافحة الشيخوخة وإدارة الصحة',
    emoji: '🔬',
    heroImage: '/category-hero/big-health.png',
    heroVideo: '/category-hero/dajiankang.mp4',
    tagZh: '功能医学 · 慢性疲劳 · 代谢抗衰',
    tagKo: '기능의학 · 만성피로 · 대사 항노화',
    tagEn: 'Functional Medicine · Chronic Fatigue · Metabolic Anti-Aging',
    tagAr: 'الطب الوظيفي · التعب المزمن · التمثيل الغذائي ومكافحة الشيخوخة',
    scriptFullZh: `您好，欢迎来到汉江春天 AI Concierge Medical Lounge。

大健康并不是单纯的体检。

它是从疲劳、睡眠、代谢、免疫、激素和生活习惯等多个方向，提前了解身体状态的健康管理入口。

如果您经常觉得累、睡眠不好、体重变化明显，或者想了解自己的长期健康风险，可以从这里开始。

在韩国，大健康咨询通常会连接健康检查中心、功能医学诊所、内科、家庭医学科或抗衰老门诊。

不同的方向，对应不同的检查和咨询方式。

我们不会在这里替您下诊断，也不会判断您能不能做某项检查。

我们会先帮您整理目前最关心的问题、既往病史、家族病史和服用药物。

您计划来韩国停留几天？是否需要中文沟通或预约协助？

请先选择您最关心的方向，我们会整理成咨询卡，再由顾问为您连接合适的医疗咨询流程。

最终的检查方向和诊疗判断，需以正规医疗机构和专业医生的判断为准。`,
    scriptFullKo: `안녕하세요, 한강애봄 AI Concierge Medical Lounge에 오신 것을 환영합니다.

항노화·건강관리(大健康)는 단순한 건강검진이 아닙니다.

피로, 수면, 대사, 면역, 호르몬, 생활습관 등 여러 방향에서 몸 상태를 미리 이해하는 건강관리 입구입니다.

평소 피곤하거나 잠을 잘 못 자거나 체중 변화가 크거나 장기적인 건강 위험을 알고 싶다면 여기서 시작할 수 있습니다.

한국에서 항노화·건강관리 상담은 보통 건강검진센터, 기능의학 클리닉, 내과, 가정의학과, 항노화 클리닉으로 연결됩니다.

방향에 따라 검사와 상담 방식이 달라집니다.

여기서는 진단을 내리지 않으며, 특정 검사가 가능한지 단정하지 않습니다.

먼저 현재 가장 신경 쓰이는 부분, 기존 병력, 가족력, 복용 중인 약을 정리해 드립니다.

한국에 며칠 머무르실 예정인가요? 중국어 소통이나 예약 지원이 필요하신가요?

가장 관심 있는 방향을 먼저 선택해 주세요. 상담카드로 정리한 뒤 담당 상담사가 적절한 진료 방향으로 연결해 드립니다.

최종 검사 방향과 진료 판단은 정식 의료기관과 전문의 기준입니다.`,
    scriptFullEn: `Hello, and welcome to the K-Medi Spring AI Concierge Medical Lounge.

Anti-aging & Health Management is not simply a physical checkup.

It's an entry point for understanding your body in advance — through fatigue, sleep, metabolism, immunity, hormones, and lifestyle.

If you often feel tired, sleep poorly, notice significant weight changes, or want to understand your long-term health risks, this is a good place to start.

In Korea, this kind of consultation usually connects to health checkup centers, functional medicine clinics, internal medicine, family medicine, or anti-aging clinics.

Different concerns lead to different tests and consultation approaches.

We do not provide a diagnosis here, and we do not determine whether a specific test is available to you.

We'll first help you organize your main concerns, medical history, family history, and current medications.

How many days do you plan to stay in Korea? Do you need Chinese-language support or appointment assistance?

Please select the direction you're most concerned about. We'll summarize it into a consultation card, then connect you with the right medical direction.

Final testing direction and medical judgment remain with licensed medical institutions and physicians.`,
    scriptFullAr: `مرحباً بكم في صالة الكونسيرج الطبي الذكي لـ K-Medi.

"مكافحة الشيخوخة وإدارة الصحة" ليست مجرد فحص طبي بسيط.

إنها بوابة لفهم حالة جسمك مسبقاً من خلال التعب والنوم والتمثيل الغذائي والمناعة والهرمونات وأسلوب الحياة.

إذا كنت تشعر بالتعب غالباً، أو تعاني من قلة النوم، أو لاحظت تغيراً واضحاً في وزنك، أو ترغب في فهم المخاطر الصحية طويلة المدى، يمكنك البدء من هنا.

في كوريا، تُحوَّل هذه الاستشارات عادة إلى مراكز الفحص الصحي أو عيادات الطب الوظيفي أو الطب الباطني أو طب الأسرة أو عيادات مكافحة الشيخوخة.

تختلف الفحوصات وطريقة الاستشارة حسب الاتجاه المطلوب.

لا نقدم هنا تشخيصاً، ولا نحدد إمكانية إجراء فحص معين.

سنساعدك أولاً على تنظيم أهم اهتماماتك الحالية وتاريخك المرضي وتاريخ العائلة والأدوية التي تتناولها.

كم يوماً تخطط للإقامة في كوريا؟ هل تحتاج إلى دعم باللغة الصينية أو مساعدة في الحجز؟

يرجى اختيار الاتجاه الذي يهمك أكثر. سنلخصه في بطاقة استشارة، ثم نوجهك إلى الاتجاه الطبي المناسب.

القرار النهائي بشأن الفحوصات والتشخيص يبقى من اختصاص المؤسسات الطبية المرخصة والأطباء المتخصصين.`,
    scriptSummaryZh: `大健康管理适合希望系统了解身体状态、改善疲劳、睡眠、代谢与长期健康风险的人群。汉江春天可协助您整理需求，并对接韩国相关医疗咨询与健康管理服务。`,
    scriptSummaryKo: `항노화·건강관리는 몸 상태를 체계적으로 이해하고 피로, 수면, 대사, 장기적인 건강 위험을 개선하고 싶은 분에게 적합합니다. 한강애봄이 필요사항을 정리해 한국의 관련 의료상담과 건강관리 서비스로 연결해 드립니다.`,
    scriptSummaryEn: `Anti-aging & Health Management is suited for those who want to systematically understand their body and improve fatigue, sleep, metabolism, and long-term health risks. K-Medi Spring helps organize your needs and connects you to related medical consultations and health management services in Korea.`,
    scriptSummaryAr: `تناسب "مكافحة الشيخوخة وإدارة الصحة" من يريد فهم حالة جسمه بشكل منهجي وتحسين التعب والنوم والتمثيل الغذائي والمخاطر الصحية طويلة المدى. تساعدكم K-Medi في تنظيم احتياجاتكم وربطكم بالاستشارات الطبية وخدمات إدارة الصحة المناسبة في كوريا.`,
  },
  {
    id: 'stem-cell',
    zh: '再生医学中心',
    ko: '재생의학센터',
    en: 'Regenerative Medicine Center',
    ar: 'مركز الطب التجديدي',
    emoji: '🧬',
    heroImage: '/category-hero/stem-cell.png',
    heroVideo: '/category-hero/zaishengyixue.mp4',
    tagZh: '干细胞疗法 · NAD+抗衰老 · 免疫细胞疗法',
    tagKo: '줄기세포 치료 · NAD+ 항노화 · 면역세포 치료',
    tagEn: 'Stem Cell Therapy · NAD+ Anti-Aging · Immune Cell Therapy',
    tagAr: 'علاج الخلايا الجذعية · مكافحة الشيخوخة NAD+ · علاج الخلايا المناعية',
    scriptFullZh: `您好，这里是干细胞与再生医学相关咨询入口。

干细胞和再生医学是很多人关心的领域，但也容易被误解。

并不是所有干细胞相关项目，在韩国都可以自由进行。

适应症、疾病种类、法律规定和医疗机构的判断，都会影响可咨询的范围。

所以这里不会直接告诉您"可以"或"不可以"。

我们会先帮您整理关注的方向，例如关节恢复、组织修复、抗衰老咨询，还是整体恢复管理。

您也可以告诉我们年龄、主要关注点、既往病史，以及计划来韩国的时间。

之后，我们会区分出韩国目前可以咨询的范围，和需要专业医生进一步判断的部分。

最终是否适合，必须由正规医疗机构和专业医生根据检查与面诊判断。`,
    scriptFullKo: `안녕하세요, 여기는 줄기세포 및 재생의학 관련 상담 입구입니다.

줄기세포와 재생의학은 많은 분들이 관심을 가지지만 오해도 많은 분야입니다.

한국에서 모든 줄기세포 관련 시술이 자유롭게 가능한 것은 아닙니다.

적응증, 질환 종류, 법적 기준, 의료기관의 판단에 따라 상담 가능한 범위가 달라집니다.

그래서 여기서는 "가능하다" 또는 "불가능하다"를 바로 말씀드리지 않습니다.

먼저 관심 있는 방향을 정리해 드립니다. 예를 들어 관절 회복, 조직 회복, 항노화 상담, 전반적인 회복관리 중 어떤 것에 관심이 있으신가요.

연령, 주요 관심사, 기존 병력, 한국 방문 예정 시기도 알려주세요.

이후 한국에서 현재 상담 가능한 범위와, 전문의의 추가 판단이 필요한 부분을 구분해 안내해 드립니다.

최종 적합 여부는 반드시 정식 의료기관과 전문의의 검사 및 면진 판단을 따릅니다.`,
    scriptFullEn: `Hello, this is the consultation entry point for stem cell and regenerative medicine topics.

Stem cells and regenerative medicine attract a lot of interest, but they're also widely misunderstood.

Not all stem-cell-related procedures can be freely performed in Korea.

The available scope of consultation depends on the medical indication, condition type, legal regulations, and the judgment of the medical institution.

So we won't tell you here whether something is "possible" or "not possible."

We'll first help you clarify your area of interest — for example, joint recovery, tissue repair, anti-aging consultation, or overall recovery management.

Please also share your age, main concerns, medical history, and planned visit dates to Korea.

We'll then distinguish between what can currently be consulted on in Korea and what requires further evaluation by a specialist.

Final suitability must be determined by a licensed medical institution and physician through examination and consultation.`,
    scriptFullAr: `مرحباً، هذه بوابة الاستشارة الخاصة بالخلايا الجذعية والطب التجديدي.

تحظى الخلايا الجذعية والطب التجديدي باهتمام كبير، لكنها أيضاً مجال يكثر فيه سوء الفهم.

ليست جميع الإجراءات المتعلقة بالخلايا الجذعية متاحة بحرية في كوريا.

يعتمد نطاق الاستشارة الممكن على الحالة الطبية ونوع المرض واللوائح القانونية وتقييم المؤسسة الطبية.

لذلك لن نخبركم هنا بشكل مباشر إن كان الأمر "ممكناً" أو "غير ممكن".

سنساعدكم أولاً على تحديد مجال اهتمامكم، مثل تعافي المفاصل أو إصلاح الأنسجة أو استشارة مكافحة الشيخوخة أو إدارة التعافي العامة.

يرجى أيضاً إخبارنا بعمركم واهتماماتكم الرئيسية وتاريخكم المرضي ومواعيد زيارتكم المخطط لها لكوريا.

بعد ذلك سنوضح لكم ما يمكن استشارته حالياً في كوريا، وما يحتاج إلى تقييم إضافي من طبيب مختص.

يبقى القرار النهائي بشأن الملاءمة من اختصاص المؤسسات الطبية المرخصة والأطباء المتخصصين بعد الفحص والاستشارة المباشرة.`,
    scriptSummaryZh: `干细胞相关咨询适合关注再生医学、关节恢复、组织修复或抗衰老管理的人群。本页面仅提供咨询整理与对接服务，具体适应症和治疗方案需由韩国正规医疗机构判断。`,
    scriptSummaryKo: `줄기세포 관련 상담은 재생의학, 관절 회복, 조직 회복 또는 항노화 관리에 관심 있는 분께 적합합니다. 본 페이지는 상담 정리와 연결 서비스만 제공하며, 구체적인 적응증과 치료 방법은 한국 정식 의료기관의 판단을 따릅니다.`,
    scriptSummaryEn: `Stem cell consultation suits those interested in regenerative medicine, joint recovery, tissue repair, or anti-aging management. This page only organizes inquiries and connects you onward — specific indications and treatment plans are determined by licensed medical institutions in Korea.`,
    scriptSummaryAr: `تناسب استشارة الخلايا الجذعية من يهتم بالطب التجديدي أو تعافي المفاصل أو إصلاح الأنسجة أو إدارة مكافحة الشيخوخة. تقدم هذه الصفحة فقط تنظيم الاستفسارات والربط بالجهات المختصة، وتُحدَّد دواعي الاستطباب وخطط العلاج النهائية من قبل المؤسسات الطبية المرخصة في كوريا.`,
  },
  {
    id: 'skin-beauty',
    zh: '皮肤医美',
    ko: '피부의료미용',
    en: 'Skin & Aesthetics',
    ar: 'الطب التجميلي للبشرة',
    emoji: '✨',
    heroImage: '/category-hero/skin-beauty.png',
    tagZh: '皮肤提升 · 毛孔色斑 · 抗衰外观',
    tagKo: '피부 리프팅 · 모공색소 · 외모 항노화',
    tagEn: 'Skin Lifting · Pores & Pigmentation · Anti-Aging Appearance',
    tagAr: 'رفع البشرة · المسام والتصبغ · مظهر مكافحة الشيخوخة',
    scriptFullZh: `您好，欢迎进入皮肤医美咨询区。

皮肤医美不是先选一个项目名称，而是先了解皮肤状态。

松弛、下垂、毛孔、色斑、肤质粗糙、泛红、痘疤、恢复时间，都可能是您在意的方向。

同样是"想变年轻"，每个人的原因并不一样。

有的人需要提升和紧致，有的人更需要肤质和色素管理。

您可以先告诉我们，最在意的是皮肤松弛、毛孔、色斑、痘疤，还是整体肤质和年轻感。

如果您计划来韩国，我们也会一起考虑停留时间、恢复期、预算和是否需要翻译陪同。

汉江春天不会在页面上替您判断具体治疗方案。

具体的治疗方式，需要在了解皮肤状态并与医疗团队咨询后再决定。`,
    scriptFullKo: `안녕하세요, 피부의료미용 상담 영역입니다.

피부의료미용은 시술명 하나를 먼저 정하는 것이 아닙니다.

처짐, 탄력, 모공, 색소, 칙칙한 피부결, 홍조, 여드름 자국, 회복기간까지 함께 보는 상담입니다.

같은 "어려 보이고 싶다"는 고민도 사람마다 원인이 다릅니다.

어떤 분은 리프팅이 필요하고, 어떤 분은 피부결이나 색소 관리가 먼저일 수 있습니다.

가장 신경 쓰이는 부분이 피부 탄력, 모공, 색소, 여드름 자국인지, 전체적인 피부결과 젊어 보이는 인상인지 먼저 말씀해 주세요.

한국 방문을 계획하신다면 체류 기간, 회복기간, 예산, 통역 동행 필요 여부도 함께 고려해 드립니다.

한강애봄은 이 페이지에서 구체적인 시술을 정하지 않습니다.

구체적인 시술 방법은 피부 상태 확인과 의료진 상담 후 결정됩니다.`,
    scriptFullEn: `Hello, welcome to the Skin & Aesthetics consultation area.

Skin & Aesthetics isn't about choosing a procedure name first.

It's a consultation that looks at sagging, firmness, pores, pigmentation, dull texture, redness, acne scars, and recovery time together.

Even the same wish to "look younger" can come from different causes for different people.

Some need lifting, while others need texture or pigmentation care first.

Please tell us first whether your main concern is firmness, pores, pigmentation, or acne scars — or your overall skin texture and youthful impression.

If you're planning a visit to Korea, we'll also consider your stay duration, recovery time, budget, and whether you need an interpreter.

K-Medi Spring does not determine a specific procedure on this page.

The specific treatment method is decided after assessing your skin condition and consulting with the medical team.`,
    scriptFullAr: `مرحباً بكم في قسم استشارات الطب التجميلي للبشرة.

لا يبدأ الطب التجميلي للبشرة باختيار اسم إجراء معين.

إنه استشارة تنظر إلى الترهل والمرونة والمسام والتصبغ وخشونة الملمس والاحمرار وآثار حب الشباب ومدة التعافي معاً.

نفس الرغبة في "الظهور بمظهر أصغر سناً" قد يكون لها أسباب مختلفة لدى كل شخص.

قد يحتاج بعض الأشخاص إلى الرفع، بينما يحتاج آخرون أولاً إلى عناية بالملمس أو التصبغ.

يرجى إخبارنا أولاً إن كان أكبر همكم هو المرونة أو المسام أو التصبغ أو آثار حب الشباب، أو الملمس العام والمظهر الأصغر سناً.

إذا كنتم تخططون لزيارة كوريا، سنأخذ بعين الاعتبار مدة الإقامة، ومدة التعافي، والميزانية، والحاجة لمرافق ترجمة.

لا تحدد K-Medi إجراءً معيناً في هذه الصفحة.

يتم تحديد طريقة العلاج المحددة بعد تقييم حالة بشرتكم واستشارة الفريق الطبي.`,
    scriptSummaryZh: `皮肤医美适合关注皮肤松弛、提升、肤质、毛孔、色斑、痘疤与抗衰管理的人群。汉江春天可帮助您整理皮肤需求，并连接韩国皮肤医美咨询服务。`,
    scriptSummaryKo: `피부의료미용은 피부 탄력, 리프팅, 피부결, 모공, 색소, 여드름 자국, 항노화 관리에 관심 있는 분께 적합합니다. 한강애봄이 피부 고민을 정리해 한국 피부의료미용 상담으로 연결해 드립니다.`,
    scriptSummaryEn: `Skin & Aesthetics suits those interested in skin firmness, lifting, texture, pores, pigmentation, acne scars, or anti-aging care. K-Medi Spring organizes your skin concerns and connects you to skin and aesthetic consultations in Korea.`,
    scriptSummaryAr: `يناسب الطب التجميلي للبشرة من يهتم بمرونة البشرة والرفع والملمس والمسام والتصبغ وآثار حب الشباب والعناية بمكافحة الشيخوخة. تنظم K-Medi اهتماماتكم وتربطكم باستشارات الطب التجميلي للبشرة في كوريا.`,
  },
  {
    id: 'plastic-surgery',
    zh: '整形医美',
    ko: '성형의료미용',
    en: 'Plastic Surgery',
    ar: 'الجراحة التجميلية',
    emoji: '🌸',
    heroImage: '/category-hero/plastic-surgery.png',
    tagZh: '眼鼻轮廓 · 面部比例 · 恢复计划',
    tagKo: '눈코윤곽 · 얼굴비율 · 회복계획',
    tagEn: 'Eyes/Nose/Contour · Facial Balance · Recovery Plan',
    tagAr: 'العيون والأنف والملامح · توازن الوجه · خطة التعافي',
    scriptFullZh: `您好，这里是整形医美咨询区。

整形医美不是直接照着一张照片去做。

需要先了解您的面部结构、皮肤厚度、骨骼条件、想要的感觉、恢复期和安全性。

眼部、鼻部、面部轮廓、眼下凹陷、脂肪移植、松弛改善，都可以是关注的方向。

不需要一开始就决定具体的手术名称。

更重要的是先确认，您想要的是自然的变化还是明显的变化，能接受的恢复期有多长。

您也可以告诉我们更重视自然感、恢复期、安全性、医生经验，还是预算控制。

我们会把这些内容整理成咨询卡，方便后续由专业医疗机构进一步评估。

是否能进行手术以及具体方式，必须以医生面诊和正规医疗评估为准。`,
    scriptFullKo: `안녕하세요, 여기는 성형의료미용 상담 영역입니다.

성형의료미용은 사진 한 장을 그대로 따라가는 과정이 아닙니다.

얼굴 구조, 피부 두께, 골격, 원하는 분위기, 회복기간, 안전성을 함께 살펴봐야 합니다.

눈, 코, 윤곽, 눈밑, 지방이식, 처짐 개선 등 관심 부위가 다양할 수 있습니다.

처음부터 수술명을 정하지 않으셔도 됩니다.

먼저 자연스러운 변화를 원하는지, 또렷한 변화를 원하는지, 회복기간을 짧게 원하는지 확인하는 것이 더 중요합니다.

자연스러움, 회복기간, 안전성, 의료진 경험, 예산 중 무엇을 더 중요하게 생각하시는지도 말씀해 주세요.

이 내용을 상담카드로 정리해 전문 의료기관 상담으로 연결해 드립니다.

수술 가능 여부와 구체적인 방법은 반드시 전문의 면진을 통해 결정됩니다.`,
    scriptFullEn: `Hello, welcome to the Plastic Surgery consultation area.

Plastic surgery isn't about copying a single photo directly.

It requires looking at your facial structure, skin thickness, bone structure, the look you want, recovery time, and safety together.

Eyes, nose, facial contour, under-eye area, fat grafting, and sagging improvement can all be areas of interest.

You don't need to decide on a specific procedure name from the start.

What matters more first is confirming whether you want a natural change or a more noticeable one, and how short a recovery period you can accept.

Please also tell us whether you value naturalness, recovery time, safety, the medical team's experience, or budget the most.

We'll organize this into a consultation card and connect you with a specialized medical institution.

Whether surgery is possible and the specific method must be determined through an in-person consultation with a specialist.`,
    scriptFullAr: `مرحباً بكم في قسم استشارات الجراحة التجميلية.

الجراحة التجميلية ليست عملية تقليد صورة واحدة بشكل مباشر.

يجب النظر إلى بنية وجهكم وسماكة بشرتكم وبنية العظام والمظهر المطلوب ومدة التعافي والسلامة معاً.

يمكن أن تشمل اهتماماتكم العيون والأنف وملامح الوجه ومنطقة تحت العين وزرع الدهون وتحسين الترهل.

لا تحتاجون لتحديد اسم إجراء معين من البداية.

الأهم أولاً هو تحديد إن كنتم تريدون تغييراً طبيعياً أو واضحاً، ومدة التعافي التي يمكنكم قبولها.

يرجى أيضاً إخبارنا بما تقدّرونه أكثر: الطبيعية، مدة التعافي، السلامة، خبرة الفريق الطبي، أو الميزانية.

سننظم ذلك في بطاقة استشارة ونربطكم بمؤسسة طبية متخصصة.

يتم تحديد إمكانية إجراء الجراحة والطريقة المحددة فقط من خلال استشارة مباشرة مع طبيب متخصص.`,
    scriptSummaryZh: `整形医美适合希望改善眼部、鼻部、面部轮廓、下垂、眼袋或整体年轻感的人群。汉江春天可协助整理需求，并连接后续专业整形咨询流程。`,
    scriptSummaryKo: `성형의료미용은 눈, 코, 윤곽, 처짐, 눈밑 또는 전체적인 젊어 보이는 인상 개선에 관심 있는 분께 적합합니다. 한강애봄이 필요사항을 정리해 전문 성형 상담으로 연결해 드립니다.`,
    scriptSummaryEn: `Plastic Surgery suits those interested in improving the eyes, nose, facial contour, sagging, under-eye area, or overall youthful impression. K-Medi Spring organizes your needs and connects you to specialized plastic surgery consultations.`,
    scriptSummaryAr: `تناسب الجراحة التجميلية من يهتم بتحسين العيون أو الأنف أو ملامح الوجه أو الترهل أو منطقة تحت العين أو المظهر العام الأصغر سناً. تنظم K-Medi احتياجاتكم وتربطكم باستشارات تجميلية متخصصة.`,
  },
  {
    id: 'womens-care',
    zh: '女性护理中心',
    ko: '여성케어센터',
    en: "Women's Care Center",
    ar: 'مركز رعاية المرأة',
    emoji: '🪷',
    heroImage: '/category-hero/womens-care.png',
    heroVideo: '/category-hero/woman-care.mp4',
    tagZh: '妇科检查 · 激素更年期 · 私密护理',
    tagKo: '부인과검진 · 호르몬갱년기 · 프라이빗 케어',
    tagEn: 'Gynecology Checkup · Hormones/Menopause · Private Care',
    tagAr: 'فحص أمراض النساء · الهرمونات وانقطاع الطمث · رعاية خاصة',
    scriptFullZh: `您好，欢迎进入女性护理中心。

女性健康方面的困扰，常常很难公开说出口。

生理变化、激素、更年期、妇科检查、私密护理、产后恢复，都可能包含在这里。

不同年龄阶段，需要关注的方向也不一样。

20到30岁、产后阶段、40岁以后、更年期前后，每个阶段的困扰都不相同。

您可以先选择自己关注的方向，例如妇科检查、激素与更年期、私密护理，还是产后恢复。

汉江春天会用安静、私密的方式帮助您整理需求。

这里不会提供诊断，也不会替代医生判断。

后续会根据您的需求，对接女性专科医疗机构进行进一步咨询。`,
    scriptFullKo: `안녕하세요, 여성케어센터입니다.

여성 건강 관련 고민은 공개적으로 말하기 어려운 경우가 많습니다.

생리 변화, 호르몬, 갱년기, 부인과 검진, 프라이빗 케어, 산후 회복 등이 포함될 수 있습니다.

생애 단계에 따라 필요한 상담도 달라집니다.

20~30대, 출산 후, 40대 이후, 갱년기 전후의 고민은 서로 다릅니다.

지금 관심 있는 방향을 먼저 선택해 주세요. 예를 들어 부인과 검진, 호르몬과 갱년기, 프라이빗 케어, 산후 회복 중 무엇이 가장 궁금하신가요.

한강애봄은 조용하고 사적인 방식으로 내용을 정리합니다.

여기서는 진단을 제공하지 않으며, 의사의 판단을 대신하지 않습니다.

이후 여성 전문 의료기관 상담으로 연결해 드립니다.`,
    scriptFullEn: `Hello, welcome to the Women's Care Center.

Concerns about women's health are often difficult to discuss openly.

This can include menstrual changes, hormones, menopause, gynecological checkups, private care, and postpartum recovery.

The consultation needed differs by life stage.

Concerns in your 20s–30s, after childbirth, after 40, or around menopause are all different.

Please first select the direction you're most interested in — for example, gynecological checkup, hormones and menopause, private care, or postpartum recovery.

K-Medi Spring organizes this information in a quiet, private way.

We do not provide a diagnosis here and do not replace a physician's judgment.

We'll then connect you with a specialized women's medical institution.`,
    scriptFullAr: `مرحباً بكم في مركز رعاية المرأة.

غالباً ما يكون من الصعب التحدث علناً عن المخاوف المتعلقة بصحة المرأة.

قد يشمل ذلك تغيرات الدورة الشهرية والهرمونات وانقطاع الطمث وفحوصات أمراض النساء والرعاية الخاصة والتعافي بعد الولادة.

تختلف الاستشارة المطلوبة حسب مرحلة الحياة.

تختلف المخاوف في العشرينات والثلاثينات، وبعد الولادة، وبعد الأربعين، وحول انقطاع الطمث.

يرجى أولاً اختيار الاتجاه الذي يهمكم أكثر، مثل فحص أمراض النساء أو الهرمونات وانقطاع الطمث أو الرعاية الخاصة أو التعافي بعد الولادة.

تنظم K-Medi هذه المعلومات بطريقة هادئة وخاصة.

لا نقدم تشخيصاً هنا ولا نحل محل قرار الطبيب.

بعد ذلك سنربطكم بمؤسسة طبية متخصصة في صحة المرأة.`,
    scriptSummaryZh: `女性护理中心适合关注妇科检查、女性健康、私密护理、产后恢复、更年期管理等需求的人群。汉江春天提供私密、清晰的咨询整理与韩国医疗对接服务。`,
    scriptSummaryKo: `여성케어센터는 부인과 검진, 여성 건강, 프라이빗 케어, 산후 회복, 갱년기 관리에 관심 있는 분께 적합합니다. 한강애봄이 사적이고 명확한 방식으로 상담을 정리해 한국 의료기관과 연결해 드립니다.`,
    scriptSummaryEn: `The Women's Care Center suits those interested in gynecological checkups, women's health, private care, postpartum recovery, or menopause management. K-Medi Spring organizes your consultation privately and clearly, then connects you to Korean medical institutions.`,
    scriptSummaryAr: `يناسب مركز رعاية المرأة من يهتم بفحوصات أمراض النساء أو صحة المرأة أو الرعاية الخاصة أو التعافي بعد الولادة أو إدارة انقطاع الطمث. تنظم K-Medi استشارتكم بطريقة خاصة وواضحة وتربطكم بالمؤسسات الطبية الكورية.`,
  },
  {
    id: 'mens-health',
    zh: '男性健康中心',
    ko: '남성건강센터',
    en: "Men's Health Center",
    ar: 'مركز صحة الرجل',
    emoji: '💪',
    heroImage: '/category-hero/mens-health.png',
    heroVideo: '/category-hero/mens-health.mp4',
    tagZh: '精力体力 · 脱发 · 前列腺代谢',
    tagKo: '체력활력 · 탈모 · 전립선대사',
    tagEn: 'Energy/Vitality · Hair Loss · Prostate/Metabolism',
    tagAr: 'الطاقة والحيوية · تساقط الشعر · البروستاتا والتمثيل الغذائي',
    scriptFullZh: `您好，这里是男性健康中心咨询区。

男性健康不只是某一个单独的症状。

体力、活力、睡眠、代谢、脱发、前列腺、泌尿健康、男性功能，都可能互相关联。

很多男性客户对这些问题不太愿意直接开口。

所以我们会先通过简单的分类，帮您整理出真正想咨询的方向。

例如疲劳和体力下降、脱发、排尿问题、前列腺健康，还是体重和代谢变化。

汉江春天会帮助您用咨询卡的方式，把不方便直接说出口的内容整理清楚。

之后，我们会根据需要连接体检、泌尿科、脱发或功能医学相关的咨询方向。

诊断和治疗，仍需以医疗机构和专业医生的判断为准。`,
    scriptFullKo: `안녕하세요, 남성건강센터 상담 영역입니다.

남성 건강은 한 가지 증상만 보는 영역이 아닙니다.

체력, 활력, 수면, 대사, 탈모, 전립선, 비뇨 건강, 남성기능까지 함께 고려할 수 있습니다.

많은 남성 고객은 불편한 증상을 직접 말하기 어려워합니다.

그래서 먼저 피로, 체력 저하, 탈모, 배뇨 문제, 전립선 건강, 체중과 대사 변화 중 어떤 것이 가장 궁금하신지 분류해 드립니다.

한강애봄은 말하기 어려운 내용을 상담카드 형태로 정리할 수 있도록 도와드립니다.

이후 건강검진, 비뇨기, 탈모, 기능의학 상담 방향으로 연결해 드립니다.

진단과 치료는 반드시 의료기관과 전문의의 판단을 따릅니다.`,
    scriptFullEn: `Hello, welcome to the Men's Health Center consultation area.

Men's health isn't about looking at a single symptom.

It can involve energy, vitality, sleep, metabolism, hair loss, the prostate, urinary health, and male sexual function together.

Many male clients find it hard to talk about uncomfortable symptoms directly.

So we'll first help sort out which matters most to you — fatigue and low energy, hair loss, urinary issues, prostate health, or weight and metabolic changes.

K-Medi Spring helps organize difficult-to-discuss topics into a consultation card.

We'll then connect you with checkup, urology, hair loss, or functional medicine consultation directions.

Diagnosis and treatment must follow the judgment of a medical institution and physician.`,
    scriptFullAr: `مرحباً بكم في قسم استشارات مركز صحة الرجل.

صحة الرجل ليست مجالاً ينظر فيه إلى عرض واحد فقط.

يمكن أن تشمل الطاقة والحيوية والنوم والتمثيل الغذائي وتساقط الشعر والبروستاتا وصحة المسالك البولية والوظيفة الجنسية معاً.

يجد كثير من العملاء الرجال صعوبة في التحدث مباشرة عن أعراض مزعجة.

لذلك سنساعدكم أولاً على تصنيف ما يهمكم أكثر: التعب وانخفاض الطاقة، تساقط الشعر، مشاكل التبول، صحة البروستاتا، أو تغيرات الوزن والتمثيل الغذائي.

تساعد K-Medi في تنظيم المواضيع الحساسة في بطاقة استشارة.

بعد ذلك سنربطكم بالفحص الصحي أو طب المسالك البولية أو تساقط الشعر أو الطب الوظيفي.

يجب أن يتبع التشخيص والعلاج قرار المؤسسة الطبية والطبيب المتخصص.`,
    scriptSummaryZh: `男性健康中心适合关注体力、睡眠、代谢、脱发、泌尿健康、前列腺与男性抗衰管理的人群。汉江春天可协助进行咨询整理与韩国医疗服务对接。`,
    scriptSummaryKo: `남성건강센터는 체력, 수면, 대사, 탈모, 비뇨 건강, 전립선, 남성기능 관리에 관심 있는 분께 적합합니다. 한강애봄이 상담을 정리해 한국 의료 서비스와 연결해 드립니다.`,
    scriptSummaryEn: `The Men's Health Center suits those interested in energy, sleep, metabolism, hair loss, urinary health, prostate, and male function management. K-Medi Spring organizes your consultation and connects you to Korean medical services.`,
    scriptSummaryAr: `يناسب مركز صحة الرجل من يهتم بالطاقة والنوم والتمثيل الغذائي وتساقط الشعر وصحة المسالك البولية والبروستاتا وإدارة الوظيفة الجنسية. تنظم K-Medi استشارتكم وتربطكم بالخدمات الطبية الكورية.`,
  },
  {
    id: 'medical-tourism',
    zh: '汉江春天 医疗旅游精品',
    ko: '한강애봄 의료관광 프리미엄',
    en: 'Premium Medical Tourism',
    ar: 'السياحة الطبية المميزة',
    emoji: '✈️',
    heroImage: '/category-hero/medical-tourism.png',
    tagZh: '预约翻译 · 车辆陪同 · 3晚4天行程',
    tagKo: '예약통역 · 차량동행 · 3박4일 일정',
    tagEn: 'Booking/Interpretation · Vehicle Escort · 3N4D Itinerary',
    tagAr: 'الحجز والترجمة · مرافقة بالسيارة · برنامج 3 ليالٍ 4 أيام',
    scriptFullZh: `您好，欢迎了解汉江春天医疗旅游精品服务。

来韩国进行医疗咨询，并不只是预约一家医院就结束了。

预约、翻译、车辆接送、到院陪同、住宿安排、恢复期动线，都需要提前准备好。

对很多海外客户来说，比起医院本身，整个流程更让人不安。

汉江春天会先帮您整理目的、行程、人数、关注方向，以及是否需要翻译陪同。

之后，我们会协助安排预约、翻译、车辆、到院陪同与住宿沟通。

医疗判断由医院和专业医生负责，汉江春天负责把整个医疗旅行过程安排得安心、清楚。

3晚4天为参考行程，具体安排会根据咨询内容调整。`,
    scriptFullKo: `안녕하세요, 한강애봄 의료관광 프리미엄 서비스를 소개합니다.

한국에서 의료 상담을 받는 것은 병원 하나를 예약하는 것으로 끝나지 않습니다.

예약, 통역, 차량 이동, 병원 동행, 숙소 안내, 회복기간 동선까지 함께 준비해야 합니다.

해외 고객에게는 병원 자체보다 전체 과정이 더 불안하게 느껴질 수 있습니다.

먼저 방문 목적, 일정, 동행 인원, 관심 분야, 통역 필요 여부를 정리해 드립니다.

이후 예약, 통역, 차량, 병원 동행, 숙소 안내를 도와드립니다.

의료 판단은 병원과 전문의가 맡고, 한강애봄은 의료여행 과정을 안전하고 명확하게 정리하는 역할을 합니다.

3박 4일은 참고 일정이며, 실제 일정은 상담 내용에 따라 조정될 수 있습니다.`,
    scriptFullEn: `Hello, welcome to K-Medi Spring's Premium Medical Tourism service.

Receiving medical consultation in Korea doesn't end with booking a single hospital.

Appointments, interpretation, transportation, hospital escort, accommodation guidance, and recovery-period logistics all need to be prepared together.

For overseas clients, the entire process can feel more uncertain than the hospital visit itself.

We'll first organize your purpose of visit, schedule, number of companions, areas of interest, and interpretation needs.

We'll then help with appointments, interpretation, vehicles, hospital escort, and accommodation guidance.

Medical decisions are made by the hospital and physicians, while K-Medi Spring's role is to organize the medical travel process safely and clearly.

The 3-night, 4-day plan is a reference itinerary; the actual schedule may be adjusted based on your consultation.`,
    scriptFullAr: `مرحباً بكم في خدمة السياحة الطبية المميزة من K-Medi.

الحصول على استشارة طبية في كوريا لا ينتهي بحجز مستشفى واحد فقط.

يجب التحضير معاً للمواعيد والترجمة والتنقل ومرافقة الزيارات الطبية وترتيبات الإقامة ومسار فترة التعافي.

بالنسبة للعملاء من الخارج، قد تكون العملية الكاملة أكثر إثارة للقلق من المستشفى نفسه.

سنساعدكم أولاً على تنظيم هدف الزيارة والجدول الزمني وعدد المرافقين ومجالات الاهتمام والحاجة إلى الترجمة.

بعد ذلك سنساعدكم في المواعيد والترجمة والمركبات ومرافقة الزيارات الطبية وترتيبات الإقامة.

تتخذ المستشفيات والأطباء القرارات الطبية، بينما يكون دور K-Medi هو تنظيم رحلة العلاج بأمان وبوضوح.

برنامج 3 ليالٍ و4 أيام هو برنامج مرجعي، وقد يتم تعديل الجدول الفعلي بناءً على محتوى الاستشارة.`,
    scriptSummaryZh: `医疗旅游精品服务适合计划来韩国进行医疗咨询、皮肤医美、整形、健康管理或抗衰服务的人群。汉江春天可协助预约、翻译、行程、车辆与到院沟通。`,
    scriptSummaryKo: `의료관광 프리미엄 서비스는 한국에서 의료 상담, 피부의료미용, 성형, 건강관리, 항노화 서비스를 계획하는 분께 적합합니다. 한강애봄이 예약, 통역, 일정, 차량, 병원 동행을 도와드립니다.`,
    scriptSummaryEn: `The Premium Medical Tourism service suits those planning medical consultation, skin aesthetics, plastic surgery, health management, or anti-aging services in Korea. K-Medi Spring helps with appointments, interpretation, itinerary, transportation, and hospital escort.`,
    scriptSummaryAr: `تناسب خدمة السياحة الطبية المميزة من يخطط لاستشارة طبية أو طب تجميلي للبشرة أو جراحة تجميلية أو إدارة صحية أو خدمات مكافحة الشيخوخة في كوريا. تساعد K-Medi في المواعيد والترجمة والبرنامج والمركبات ومرافقة الزيارات الطبية.`,
  },
  {
    id: 'custom-plan',
    zh: '定制医疗观光方案',
    ko: '맞춤형 의료관광 플랜',
    en: 'Custom Medical Travel Plan',
    ar: 'خطة سياحة طبية مخصصة',
    emoji: '🗺️',
    heroImage: '/category-hero/custom-plan.png',
    heroVideo: '/category-hero/custom-plan.mp4',
    tagZh: '多项目组合 · 预算行程 · 全程协调',
    tagKo: '복합상담 · 예산일정 · 전체조율',
    tagEn: 'Multi-Service Plan · Budget/Itinerary · Full Coordination',
    tagAr: 'خطة متعددة الخدمات · الميزانية والبرنامج · تنسيق كامل',
    scriptFullZh: `您好，这里是定制医疗观光方案入口。

如果您还不确定该选哪个项目，可以从这里开始。

有的客户想同时安排健康检查和皮肤管理。

有的客户想为父母安排体检，同时安排自己的皮肤咨询。

也有的客户想把整形咨询和恢复期的旅行安排放在一起考虑。

汉江春天会先帮您整理目的、年龄、同行人数、停留天数和预算方向。

之后，我们会把多个方向组合起来，设计韩国医疗观光的咨询路径。

最终的医疗判断和治疗可行性，仍以医疗机构和专业医生的判断为准。`,
    scriptFullKo: `안녕하세요, 맞춤형 의료관광 플랜 입구입니다.

어떤 항목을 선택해야 할지 아직 결정하지 못하셨다면 여기서 시작하셔도 됩니다.

건강검진과 피부관리를 함께 받고 싶은 고객도 있습니다.

부모님 검진과 본인의 피부관리를 함께 계획하는 고객도 있습니다.

성형 상담과 회복기간 여행 일정을 함께 고려해야 하는 경우도 있습니다.

먼저 목적, 나이, 동행자, 체류 기간, 예산 방향, 회복기간을 정리해 드립니다.

이후 여러 분야를 조합해 한국 의료관광 상담 방향을 설계합니다.

최종 의료 판단과 시술 가능 여부는 의료기관과 전문의 기준입니다.`,
    scriptFullEn: `Hello, welcome to the Custom Medical Travel Plan.

If you're not yet sure which category to choose, you can start here.

Some clients want a health checkup and skin care combined.

Some plan a checkup for their parents alongside their own skin care.

Others need to consider plastic surgery consultation together with a recovery-period travel schedule.

We'll first organize your purpose, age, companions, length of stay, budget direction, and recovery period.

We'll then combine multiple areas to design your Korean medical tourism consultation direction.

Final medical decisions and treatment feasibility remain with medical institutions and physicians.`,
    scriptFullAr: `مرحباً بكم في خطة السياحة الطبية المخصصة.

إذا لم تكونوا متأكدين بعد من الفئة التي يجب اختيارها، يمكنكم البدء من هنا.

بعض العملاء يريدون فحصاً صحياً والعناية بالبشرة معاً.

بعضهم يخطط لفحص للوالدين إلى جانب العناية ببشرته الخاصة.

وبعضهم يحتاج للنظر في استشارة جراحية تجميلية مع برنامج سفر لفترة التعافي.

سنساعدكم أولاً على تنظيم الهدف والعمر والمرافقين ومدة الإقامة واتجاه الميزانية وفترة التعافي.

بعد ذلك سنجمع بين عدة مجالات لتصميم اتجاه استشارة السياحة الطبية الكورية الخاصة بكم.

يبقى القرار الطبي النهائي وإمكانية إجراء العلاج من اختصاص المؤسسات الطبية والأطباء المتخصصين.`,
    scriptSummaryZh: `如果您还不确定选择哪个项目，可以先提交定制需求。汉江春天会根据您的目的、时间、预算与停留计划，为您整理韩国医疗观光咨询方向。`,
    scriptSummaryKo: `어떤 항목을 선택할지 아직 모르신다면 맞춤형 플랜으로 먼저 시작하셔도 됩니다. 한강애봄이 목적, 일정, 예산, 체류 계획을 바탕으로 한국 의료관광 상담 방향을 정리해 드립니다.`,
    scriptSummaryEn: `If you're not sure which category to choose, you can start with a custom plan. K-Medi Spring organizes your Korean medical tourism consultation direction based on your purpose, schedule, budget, and stay plan.`,
    scriptSummaryAr: `إذا لم تكونوا متأكدين من الفئة المناسبة، يمكنكم البدء بخطة مخصصة. تنظم K-Medi اتجاه استشارة السياحة الطبية الكورية بناءً على هدفكم وجدولكم وميزانيتكم وخطة إقامتكم.`,
  },
]

export const getCategoryById = (id: string) =>
  categories.find(c => c.id === id) ?? null
