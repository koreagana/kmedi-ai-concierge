export interface ConcernContext {
  id: string
  zh: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  ko: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  en: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  ar: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
}

export const concernsData: ConcernContext[] = [
  /* ── 1. 想看起来更年轻、更有精神（外貌抗衰） ─────────────── */
  {
    id: 'younger-look',
    zh: {
      title: '想看起来更年轻、更有精神',
      catName: '皮肤医美',
      catTag: '抗衰外观 · 皮肤提升 · 年轻感管理',
      desc: `不是想变成另一个人，而是希望看起来更自然、更有精神、更年轻一点。

很多人说自己"显老了"，但原因并不相同。有的人是皮肤弹性下降，有的人是肤色暗沉、皮肤结粗糙，有的人是脸部轮廓开始下垂，也有人只是面部体积流失，让五官看起来不够饱满。

汉江春天会先帮您梳理：您的显老感主要来自皮肤弹性、肤色、轮廓下垂，还是面部体积流失；您能接受的恢复期有多长；希望自然改善还是更明显的提升；计划在韩国停留几天。

整理清楚后，我们会为您对接皮肤医美、抗衰外观管理或轮廓提升相关的韩国医疗咨询方向。

最终的检查与治疗判断，以正规医疗机构和专业医生面诊为准。`,
      recommended: '抗衰外观管理 · 皮肤提升 · 年轻感咨询',
    },
    ko: {
      title: '좀 더 젊고 생기 있어 보이고 싶다',
      catName: '피부의료미용',
      catTag: '항노화 외모 · 피부 리프팅 · 젊은 인상 관리',
      desc: `다른 사람이 되고 싶은 게 아니라, 더 자연스럽고 생기 있고 조금 더 젊어 보이고 싶은 것입니다.

많은 분들이 "나이 들어 보인다"고 느끼지만, 원인은 사람마다 다릅니다. 피부 탄력이 떨어진 분도 있고, 피부톤이 칙칙해지거나 결이 거칠어진 분도 있으며, 얼굴 윤곽이 처지기 시작한 분도 있고, 단순히 볼륨이 줄어 인상이 덜 또렷해진 분도 있습니다.

한강애봄은 먼저 정리해 드립니다. 노안의 원인이 피부 탄력, 피부톤, 윤곽 처짐, 볼륨 저하 중 어디에 있는지, 감수할 수 있는 회복 기간은 어느 정도인지, 자연스러운 개선을 원하는지 또렷한 변화를 원하는지, 한국 체류 일정은 어떻게 되는지.

정리가 끝나면 피부의료미용, 항노화 외모 관리, 윤곽 리프팅 관련 한국 의료 상담 방향으로 연결해 드립니다.

최종 검사와 진료 판단은 정식 의료기관과 전문의 면진 기준입니다.`,
      recommended: '항노화 외모 관리 · 피부 리프팅 · 젊은 인상 상담',
    },
    en: {
      title: 'I want to look younger and more refreshed',
      catName: 'Skin & Aesthetics',
      catTag: 'Anti-Aging Look · Skin Lifting · Youthful Impression',
      desc: `Not to become someone different — just to look more natural, refreshed, and a little younger.

Many people say they look older than they feel, but the reasons vary. For some it's reduced skin elasticity, for others it's a dull tone or rough texture, some notice sagging facial contours, and others simply have lost volume, making their features look less defined.

We first help you clarify whether the aging look mainly comes from skin elasticity, tone, sagging contours, or volume loss; how much downtime you can accept; whether you prefer subtle improvement or a more visible change; and how many days you plan to stay in Korea.

Once that's clear, we connect you with Korean consultation directions in skin aesthetics, anti-aging appearance management, or facial lifting.

Final testing and treatment decisions remain with a licensed medical institution and physician through an in-person consultation.`,
      recommended: 'Anti-Aging Appearance Management · Skin Lifting · Youthful Look Consultation',
    },
    ar: {
      title: 'أريد أن أبدو أصغر سناً وأكثر حيوية',
      catName: 'الطب التجميلي للبشرة',
      catTag: 'مظهر مكافحة الشيخوخة · رفع البشرة · إدارة المظهر الشاب',
      desc: `ليس الهدف أن تصبح شخصاً مختلفاً، بل أن تبدو أكثر طبيعية وحيوية وأصغر سناً بقليل.

كثير من الناس يشعرون بأنهم يبدون أكبر من أعمارهم، لكن الأسباب تختلف. بعضهم يعاني من تراجع مرونة البشرة، وآخرون يلاحظون شحوب لون البشرة أو خشونة الملمس، وبعضهم يلاحظ ترهل ملامح الوجه، وآخرون يفقدون الحجم فقط، مما يجعل ملامحهم أقل وضوحاً.

نساعدك أولاً على تحديد ما إذا كان مظهر التقدم في السن يأتي بشكل رئيسي من مرونة البشرة أو لون البشرة أو ترهل الملامح أو فقدان الحجم؛ ومقدار فترة التعافي التي يمكنك قبولها؛ وما إذا كنت تفضل تحسيناً خفيفاً أو تغييراً أكثر وضوحاً؛ وعدد الأيام التي تخطط للإقامة في كوريا.

بعد ذلك، نوصلك باستشارات كورية في الطب التجميلي للبشرة أو إدارة مظهر مكافحة الشيخوخة أو رفع الملامح.

يبقى الفحص النهائي وقرار العلاج من اختصاص مؤسسة طبية مرخصة وطبيب متخصص بعد الاستشارة المباشرة.`,
      recommended: 'إدارة مظهر مكافحة الشيخوخة · رفع البشرة · استشارة المظهر الشاب',
    },
  },

  /* ── 2. 想从身体内部延缓衰老速度（体内抗衰） ─────────────── */
  {
    id: 'slow-aging',
    zh: {
      title: '想从身体内部延缓衰老速度',
      catName: '抗衰老管理',
      catTag: '功能医学 · 代谢管理 · 睡眠与激素 · 生活方式',
      desc: `衰老无法完全停止，但每个人衰老加快的原因并不一样。

有的人最先感觉到的是疲劳和睡眠质量下降，有的人出现体重变化、激素波动、代谢变慢或肌肉量减少，这些信号通常和皮肤外观无关，而是身体内部状态的变化。

汉江春天会先帮您梳理：您目前感受到的衰老信号，主要来自睡眠、体力、代谢、激素，还是生活节奏；是否有慢性疲劳、注意力下降或恢复力变差的情况；既往病史和家族病史是什么。

整理清楚后，我们会为您对接韩国的功能医学咨询、抗衰老检查或生活方式管理相关方向，帮助您先理解身体目前的状态，而非直接确定治疗方案。

最终的检查与治疗判断，以正规医疗机构和专业医生面诊为准。`,
      recommended: '功能医学咨询 · 抗衰老检查 · 代谢与生活方式管理',
    },
    ko: {
      title: '몸속 노화 속도를 늦추고 싶다',
      catName: '항노화 관리',
      catTag: '기능의학 · 대사 관리 · 수면과 호르몬 · 생활방식',
      desc: `노화를 완전히 멈출 수는 없지만, 노화가 빨라지는 원인은 사람마다 다릅니다.

어떤 분은 피로감과 수면 질 저하를 먼저 느끼고, 어떤 분은 체중 변화, 호르몬 변동, 대사 저하, 근육량 감소를 경험합니다. 이런 신호는 보통 피부 외관과는 별개로, 몸속 상태의 변화를 보여줍니다.

한강애봄은 먼저 정리해 드립니다. 현재 느끼는 노화 신호가 수면, 체력, 대사, 호르몬, 생활 리듬 중 어디에서 주로 오는지, 만성 피로나 집중력 저하, 회복력 저하가 있는지, 기존 병력과 가족력은 어떠한지.

정리 후에는 치료 방안을 바로 정하기보다, 한국의 기능의학 상담, 항노화 검진, 생활습관 관리 방향으로 연결해 현재 몸 상태를 먼저 이해할 수 있도록 도와드립니다.

최종 검사와 진료 판단은 정식 의료기관과 전문의 면진 기준입니다.`,
      recommended: '기능의학 상담 · 항노화 검진 · 대사·생활습관 관리',
    },
    en: {
      title: 'I want to slow aging from the inside',
      catName: 'Anti-Aging Management',
      catTag: 'Functional Medicine · Metabolism · Sleep & Hormones · Lifestyle',
      desc: `Aging can't be fully stopped, but the reasons it accelerates differ from person to person.

Some people first notice fatigue and declining sleep quality, others experience weight changes, hormonal shifts, slowing metabolism, or loss of muscle mass. These signals are usually unrelated to skin appearance — they reflect changes happening inside the body.

We first help you clarify where your aging signals are mainly coming from — sleep, energy, metabolism, hormones, or lifestyle rhythm; whether you have chronic fatigue, reduced focus, or slower recovery; and what your medical and family history looks like.

Rather than deciding on a treatment right away, we connect you with Korean functional medicine consultation, anti-aging checkups, or lifestyle management directions to help you first understand your body's current state.

Final testing and treatment decisions remain with a licensed medical institution and physician through an in-person consultation.`,
      recommended: 'Functional Medicine Consultation · Anti-Aging Checkup · Metabolic & Lifestyle Management',
    },
    ar: {
      title: 'أريد إبطاء الشيخوخة من الداخل',
      catName: 'إدارة مكافحة الشيخوخة',
      catTag: 'الطب الوظيفي · التمثيل الغذائي · النوم والهرمونات · نمط الحياة',
      desc: `لا يمكن إيقاف الشيخوخة تماماً، لكن أسباب تسارعها تختلف من شخص لآخر.

بعض الناس يلاحظون أولاً التعب وتراجع جودة النوم، وآخرون يعانون من تغيرات الوزن أو تقلبات الهرمونات أو تباطؤ التمثيل الغذائي أو فقدان الكتلة العضلية. هذه العلامات غالباً لا ترتبط بمظهر البشرة، بل تعكس تغيرات تحدث داخل الجسم.

نساعدك أولاً على تحديد مصدر علامات الشيخوخة الرئيسية - النوم أو الطاقة أو التمثيل الغذائي أو الهرمونات أو إيقاع الحياة؛ وما إذا كان لديك تعب مزمن أو تراجع في التركيز أو تعافٍ أبطأ؛ وتاريخك المرضي وتاريخ عائلتك.

بدلاً من تحديد علاج فوراً، نوصلك باستشارة الطب الوظيفي الكورية أو فحوصات مكافحة الشيخوخة أو إدارة نمط الحياة لمساعدتك على فهم حالة جسمك الحالية أولاً.

يبقى الفحص النهائي وقرار العلاج من اختصاص مؤسسة طبية مرخصة وطبيب متخصص بعد الاستشارة المباشرة.`,
      recommended: 'استشارة الطب الوظيفي · فحص مكافحة الشيخوخة · إدارة التمثيل الغذائي ونمط الحياة',
    },
  },

  /* ── 3. 想了解韩国合法合规的再生医学咨询 ───────────────── */
  {
    id: 'regen-medicine',
    zh: {
      title: '想了解韩国合法合规的再生医学咨询',
      catName: '再生医学咨询',
      catTag: '再生医学 · 关节健康 · 恢复管理 · 合法合规',
      desc: `再生医学和干细胞相关咨询，需要非常谨慎地对待。

在韩国，并不是所有干细胞治疗都可以自由进行。是否适合相关治疗，需要根据适应范围、医疗机构判断、法律规定以及患者自身状态来确认。

汉江春天不会用"都可以做"这样的方式进行说明。
我们会先帮您梳理：您关注的是抗衰老、关节问题、术后恢复管理，还是皮肤与组织修复方向。

整理清楚后，再为您说明韩国可进一步咨询的范围，以及哪些内容需要由正规医疗机构和专业医生进一步判断。

最终是否适合相关治疗或项目，必须以韩国正规医疗机构及专业医生的判断为准。`,
      recommended: '再生医学咨询 · 关节健康 · 恢复管理',
    },
    ko: {
      title: '한국의 합법적인 재생의학 상담을 알고 싶다',
      catName: '재생의학 상담',
      catTag: '재생의학 · 관절건강 · 회복관리 · 합법 상담',
      desc: `재생의학 및 줄기세포 관련 상담은 매우 신중하게 접근해야 합니다.

한국에서는 모든 줄기세포 치료를 자유롭게 진행할 수 있는 것이 아닙니다. 적응증의 범위, 의료기관의 판단, 법적 규정, 환자 본인의 상태에 따라 가능 여부를 확인해야 합니다.

한강애봄은 "다 할 수 있다"는 방식으로 설명하지 않습니다.
먼저 항노화, 관절 문제, 술후 회복 관리, 피부·조직 회복 중 어디에 관심이 있으신지 정리해 드립니다.

정리 후 한국에서 추가 상담이 가능한 범위를 안내드리고, 정식 의료기관과 전문의의 추가 판단이 필요한 사항을 명확히 설명드립니다.

최종 치료 적합 여부는 반드시 정식 의료기관의 면진과 전문의 판단에 따릅니다.`,
      recommended: '재생의학 상담 · 관절건강 · 회복관리',
    },
    en: {
      title: 'I want to understand legal regenerative medicine consultation in Korea',
      catName: 'Regenerative Medicine Consultation',
      catTag: 'Regenerative Medicine · Joint Health · Recovery · Legal Consultation',
      desc: `Consultations related to regenerative medicine and stem cells require very careful consideration.

In Korea, not all stem cell treatments can be freely performed. Whether a treatment is appropriate depends on the scope of approved indications, the medical institution's assessment, legal regulations, and the patient's own condition.

We don't present it as "everything is possible."
We first help clarify whether your interest is in anti-aging, joint health, post-procedure recovery management, or skin and tissue repair.

From there, we explain what can be further consulted in Korea, and what must be determined by a licensed medical institution and specialist.

Whether a specific treatment is appropriate must ultimately be determined by a qualified Korean medical institution and physician.`,
      recommended: 'Regenerative Medicine Consultation · Joint Health · Recovery Management',
    },
    ar: {
      title: 'أريد معرفة استشارة الطب التجديدي القانونية في كوريا',
      catName: 'استشارة الطب التجديدي',
      catTag: 'الطب التجديدي · صحة المفاصل · التعافي · استشارة قانونية',
      desc: `الاستشارات المتعلقة بالطب التجديدي والخلايا الجذعية تتطلب حذراً شديداً.

في كوريا، لا يمكن إجراء جميع علاجات الخلايا الجذعية بحرية. ما إذا كان العلاج مناسباً يعتمد على نطاق التشخيصات المعتمدة وتقييم المؤسسة الطبية واللوائح القانونية وحالة المريض نفسه.

نحن لا نقدم الأمر على أنه "كل شيء ممكن".
نساعدك أولاً في توضيح ما إذا كان اهتمامك في مكافحة الشيخوخة أو صحة المفاصل أو إدارة التعافي بعد الإجراءات أو إصلاح البشرة والأنسجة.

من هناك، نشرح ما يمكن استشارته بشكل إضافي في كوريا، وما يجب تحديده من قبل مؤسسة طبية مرخصة ومتخصص.

ما إذا كان العلاج مناسباً يجب تحديده في نهاية المطاف من قبل مؤسسة طبية كورية مؤهلة وطبيب متخصص.`,
      recommended: 'استشارة الطب التجديدي · صحة المفاصل · إدارة التعافي',
    },
  },

  /* ── 4. 想改善脸部线条、下颌线和整体气质 ──────────────── */
  {
    id: 'face-contour',
    zh: {
      title: '想改善脸部线条、下颌线和整体气质',
      catName: '脸部线条改善咨询',
      catTag: '下颌线 · 轮廓 · 提升 · 容量支撑',
      desc: `脸部线条不清晰，并不代表每个人的原因都一样。

有的人是下颌线变得模糊、出现双下巴，有的人是面部开始下垂，也有人是脸颊凹陷、苹果肌流失，或者侧脸线条不够流畅，导致整体气质不够清爽。

汉江春天会先帮您梳理：您想改善的是更清晰的下颌线、更紧致的轮廓、容量支撑，还是更自然年轻的整体气质；恢复期、预算和来韩计划是怎样的。

整理后，我们会协助您对接皮肤提升、轮廓咨询、容量支撑或整形医美相关的韩国医疗咨询方向。

具体是否需要手术或注射类项目，以正规医疗机构和专业医生面诊判断为准。`,
      recommended: '下颌线咨询 · 轮廓改善 · 提升与容量支撑',
    },
    ko: {
      title: '얼굴 라인, 턱선, 전체 분위기를 개선하고 싶다',
      catName: '얼굴 라인 개선 상담',
      catTag: '턱선 · 윤곽 · 리프팅 · 볼륨 지지',
      desc: `얼굴 라인이 또렷하지 않다고 해서 모두 같은 이유는 아닙니다.

어떤 분은 턱선이 흐릿해지고 이중턱이 생기며, 어떤 분은 얼굴이 처지기 시작하고, 볼이 꺼지거나 사과근이 줄어든 분도 있고, 측면 라인이 매끄럽지 않아 전체적으로 덜 또렷해 보이는 분도 있습니다.

한강애봄은 먼저 정리해 드립니다. 원하시는 것이 더 또렷한 턱선, 더 탄탄한 윤곽, 볼륨 지지, 아니면 더 자연스럽고 젊은 전체적인 느낌인지, 회복 기간과 예산, 방한 계획은 어떻게 되는지.

정리 후 피부 리프팅, 윤곽 상담, 볼륨 지지, 성형의료미용 관련 한국 의료 상담 방향으로 연결해 드립니다.

수술이나 시술이 필요한지는 정식 의료기관과 전문의 면진을 통해 판단합니다.`,
      recommended: '턱선 상담 · 윤곽 개선 · 리프팅과 볼륨 지지',
    },
    en: {
      title: 'I want to improve my facial line, jawline, and overall impression',
      catName: 'Facial Contour Improvement',
      catTag: 'Jawline · Contour · Lifting · Volume Support',
      desc: `An undefined facial line doesn't mean everyone has the same cause.

Some people have a blurred jawline or a double chin, others notice the face starting to sag, some experience hollow cheeks or loss of the apple-cheek area, and others find their side profile isn't as smooth as they'd like, making the overall impression less refined.

We first help clarify what you're hoping to improve — a cleaner jawline, a firmer contour, volume support, or a more naturally youthful overall look — along with your downtime tolerance, budget, and travel plan.

From there, we connect you with Korean consultation directions in skin lifting, facial contouring, volume support, or aesthetic procedures.

Whether surgery or an injectable procedure is needed must be determined by a licensed medical institution and physician through an in-person consultation.`,
      recommended: 'Jawline Consultation · Contour Improvement · Lifting & Volume Support',
    },
    ar: {
      title: 'أريد تحسين خط وجهي وفكي ومظهري العام',
      catName: 'تحسين ملامح الوجه',
      catTag: 'خط الفك · الملامح · الرفع · دعم الحجم',
      desc: `عدم وضوح خط الوجه لا يعني أن الجميع لديهم نفس السبب.

بعض الناس لديهم خط فك ضبابي أو ذقن مزدوجة، وآخرون يلاحظون بدء ترهل الوجه، وبعضهم يعاني من تجويف الخدود أو فقدان منطقة خد التفاحة، وآخرون يجدون خطهم الجانبي غير سلس، مما يجعل الانطباع العام أقل وضوحاً.

نساعدك أولاً على توضيح ما تأمل في تحسينه - خط فك أكثر وضوحاً، أو ملامح أكثر تماسكاً، أو دعم الحجم، أو مظهر عام أكثر شباباً بشكل طبيعي - إلى جانب تحملك لفترة التعافي والميزانية وخطة السفر.

من هناك، نوصلك باستشارات كورية في رفع البشرة أو تشكيل الوجه أو دعم الحجم أو إجراءات التجميل.

يجب تحديد ما إذا كانت الجراحة أو الحقن مطلوبة من قبل مؤسسة طبية مرخصة وطبيب متخصص بعد استشارة مباشرة.`,
      recommended: 'استشارة خط الفك · تحسين الملامح · الرفع ودعم الحجم',
    },
  },

  /* ── 5. 我对整形感兴趣，需要专业指导 ──────────────────── */
  {
    id: 'surgery-interest',
    zh: {
      title: '我对整形感兴趣，需要专业指导',
      catName: '整形医美咨询',
      catTag: '眼部 · 鼻部 · 轮廓 · 年轻化整形 · 恢复计划',
      desc: `整形不是简单地照着漂亮照片去做，而是要结合自己的面部基础、想要的风格、恢复时间、预算和安全性一起判断。

一开始不一定要马上决定做眼睛、鼻子还是轮廓。
您也可以先从"想看起来更自然""想让气质更清晰""想减少疲惫感""想让五官更协调"这样的目标开始整理。

汉江春天会先帮您梳理：您想改变的部位、期待的风格、最担心的问题，以及可以接受的恢复期。

整理后，再协助您判断应先从哪个方向开始咨询，哪些项目需要一起评估，哪些内容需要由专业医疗机构进一步确认。

最终是否适合手术以及具体方式，必须以正规医疗机构的面诊和专业判断为准。`,
      recommended: '整形医美咨询 · 眼鼻轮廓 · 年轻化整形',
    },
    ko: {
      title: '성형에 관심 있어, 전문적인 안내가 필요하다',
      catName: '성형의료미용 상담',
      catTag: '눈 · 코 · 윤곽 · 젊어지는 성형 · 회복 계획',
      desc: `성형은 단순히 예쁜 사진을 보고 따라 하는 것이 아닙니다. 자신의 얼굴 베이스, 원하는 스타일, 회복 기간, 예산, 안전성을 함께 고려해야 합니다.

처음부터 눈, 코, 윤곽 중 어떤 것을 할지 바로 결정할 필요는 없습니다.
"더 자연스럽게 보이고 싶다", "분위기를 더 또렷하게 하고 싶다", "피곤해 보이는 인상을 줄이고 싶다", "이목구비의 조화를 높이고 싶다"는 목표부터 정리해도 됩니다.

한강애봄은 먼저 개선하고 싶은 부위, 기대하는 스타일, 가장 걱정되는 문제, 감수할 수 있는 회복 기간을 정리해 드립니다.

정리 후 어느 방향부터 상담을 시작할지, 함께 평가해야 할 항목이 무엇인지, 정식 의료기관의 추가 확인이 필요한 내용은 무엇인지 안내해 드립니다.

최종 수술 적합 여부와 구체적인 방법은 반드시 정식 의료기관의 면진과 전문의 판단에 따릅니다.`,
      recommended: '성형의료미용 상담 · 눈코윤곽 · 젊어지는 성형',
    },
    en: {
      title: 'I am interested in plastic surgery and need professional guidance',
      catName: 'Plastic Surgery Consultation',
      catTag: 'Eyes · Nose · Contour · Youthful Surgery · Recovery Plan',
      desc: `Plastic surgery isn't about simply copying a photo of someone beautiful. It requires considering your own facial foundation, desired style, recovery time, budget, and safety together.

You don't need to immediately decide whether to do eyes, nose, or facial contouring.
You can start from goals like "I want to look more natural," "I want a clearer overall impression," "I want to reduce a tired look," or "I want more harmonious features."

We first help clarify the areas you want to change, the style you're hoping for, your main concerns, and how much downtime you can accept.

From there, we help you determine which direction to consult first, what should be evaluated together, and what requires further confirmation from a medical specialist.

Whether surgery is appropriate and the specific approach must ultimately be determined by a licensed medical institution and physician.`,
      recommended: 'Plastic Surgery Consultation · Eyes/Nose/Contour · Youthful Surgery',
    },
    ar: {
      title: 'أنا مهتم بالجراحة التجميلية وأحتاج إلى توجيه متخصص',
      catName: 'استشارة الجراحة التجميلية',
      catTag: 'العيون · الأنف · الملامح · جراحة مُجدِّدة للشباب · خطة التعافي',
      desc: `الجراحة التجميلية ليست مجرد نسخ صورة لشخص جميل. تتطلب مراعاة أساس وجهك الخاص والأسلوب المطلوب ووقت التعافي والميزانية والسلامة معاً.

لا تحتاج أن تقرر فوراً ما إذا كنت ستجري عيون أو أنف أو تشكيل للوجه.
يمكنك البدء بأهداف مثل "أريد أن أبدو أكثر طبيعية" أو "أريد انطباعاً أكثر وضوحاً" أو "أريد تقليل مظهر التعب" أو "أريد ملامح أكثر انسجاماً".

نساعدك أولاً في توضيح المناطق التي تريد تغييرها والأسلوب الذي تأمله ومخاوفك الرئيسية ومقدار فترة التعافي التي يمكنك قبولها.

من هناك، نساعدك في تحديد الاتجاه الذي تبدأ به الاستشارة وما يجب تقييمه معاً وما يتطلب تأكيداً من متخصص طبي.

ما إذا كانت الجراحة مناسبة والنهج المحدد يجب تحديده في نهاية المطاف من قبل مؤسسة طبية مرخصة وطبيب متخصص.`,
      recommended: 'استشارة الجراحة التجميلية · العيون والأنف والملامح · جراحة التجديد الشبابي',
    },
  },

  /* ── 6. 想改善疲惫感、暗沉和没精神的状态 ────────────────── */
  {
    id: 'fatigue-look',
    zh: {
      title: '想改善疲惫感、暗沉和没精神的状态',
      catName: '疲惫感与状态改善咨询',
      catTag: '眼周 · 黑眼圈 · 肤色暗沉 · 体力状态',
      desc: `看起来疲惫，并不只是因为睡得不够。

眼下凹陷、黑眼圈、肤色暗沉、脸部容量流失、嘴角下垂，甚至长期疲劳和身体状态下降，都可能让一个人看起来没有精神。

汉江春天会先帮您梳理：您的疲惫感主要来自眼周、肤色、脸部凹陷，还是身体状态与生活节奏。

如果您希望恢复期短，我们会优先帮您整理较轻负担的咨询方向。
如果需要，也可以进一步连接皮肤医美、抗衰管理或健康管理相关咨询。

无论选择哪个方向，具体方案都需要医疗机构评估后才能确定。`,
      recommended: '疲惫感改善 · 皮肤医美 · 抗衰管理',
    },
    ko: {
      title: '피곤해 보이는 인상과 생기 없는 상태를 개선하고 싶다',
      catName: '피로감·인상 개선 상담',
      catTag: '눈 주위 · 다크서클 · 칙칙한 피부 · 체력 상태',
      desc: `피곤해 보이는 것이 단순히 잠이 부족해서만은 아닙니다.

눈 아래 꺼짐, 다크서클, 칙칙한 피부톤, 얼굴 볼륨 감소, 입꼬리 처짐, 만성 피로나 신체 컨디션 저하까지 다양한 원인이 얽혀 있을 수 있습니다.

한강애봄은 먼저 피로감이 눈 주위, 피부톤, 얼굴 함몰, 아니면 신체 컨디션이나 생활 리듬에서 주로 비롯되는지 정리해 드립니다.

회복 기간이 짧기를 원하신다면 부담이 적은 상담 방향을 먼저 정리해 드립니다.
필요에 따라 피부의료미용, 항노화 관리, 건강 관리 관련 상담으로도 연결해 드립니다.

어떤 방향을 선택하든 구체적인 방안은 의료기관의 평가를 거쳐 확정됩니다.`,
      recommended: '피로감 개선 · 피부의료미용 · 항노화 관리',
    },
    en: {
      title: 'I want to improve my tired, dull, and low-energy appearance',
      catName: 'Fatigue & Appearance Improvement',
      catTag: 'Eye Area · Dark Circles · Dull Tone · Energy Level',
      desc: `Looking tired isn't only about not getting enough sleep.

Hollowing under the eyes, dark circles, dull skin tone, loss of facial volume, drooping corners of the mouth, chronic fatigue, and declining physical condition can all make a person look worn out.

We first help identify whether the tired look is mainly coming from the eye area, skin tone, facial hollowing, or overall physical condition and lifestyle rhythm.

If you need minimal downtime, we'll prioritize lighter consultation directions.
When needed, we can also connect you with skin aesthetics, anti-aging management, or health management consultations.

Whichever direction you choose, the specific plan is only finalized after evaluation by a medical institution.`,
      recommended: 'Fatigue Improvement · Skin Aesthetics · Anti-Aging',
    },
    ar: {
      title: 'أريد تحسين مظهر التعب والشحوب وانخفاض الحيوية',
      catName: 'تحسين مظهر التعب',
      catTag: 'منطقة العيون · الهالات · شحوب البشرة · مستوى الطاقة',
      desc: `الظهور بمظهر متعب لا يعني فقط عدم الحصول على قسط كافٍ من النوم.

التجويف تحت العيون والهالات الداكنة وشحوب البشرة وفقدان حجم الوجه وترهل زوايا الفم والتعب المزمن وتراجع الحالة الجسدية — كلها يمكن أن تجعل الشخص يبدو مرهقاً.

نساعدك أولاً في تحديد ما إذا كان مظهر التعب يأتي بشكل رئيسي من منطقة العينين أو لون البشرة أو تجويف الوجه أو الحالة الجسدية العامة وإيقاع الحياة.

إذا كنت بحاجة إلى الحد الأدنى من فترة التعافي، سنعطي الأولوية لاتجاهات الاستشارة الأخف.
عند الحاجة، يمكننا أيضاً توصيلك باستشارات الطب التجميلي للبشرة أو إدارة مكافحة الشيخوخة أو إدارة الصحة.

بغض النظر عن الاتجاه الذي تختاره، يتم تحديد الخطة المحددة فقط بعد تقييم من مؤسسة طبية.`,
      recommended: 'تحسين التعب · الطب التجميلي للبشرة · مكافحة الشيخوخة',
    },
  },

  /* ── 7. 担心医院、翻译和韩国行程安排 ──────────────────── */
  {
    id: 'korea-trip-worry',
    zh: {
      title: '担心医院、翻译和韩国行程安排',
      catName: '安心韩国医疗旅行咨询',
      catTag: '预约 · 翻译 · 车辆 · 行程 · 陪同支持',
      desc: `准备来韩国接受医疗咨询时，很多人真正担心的并不只是医院本身，而是整个过程是否顺利。

不知道该选择哪类机构、如何预约、是否能中文沟通、治疗后住在哪里更方便、行程怎么安排，都会让人感到不安。

汉江春天会在医疗咨询前，先帮您梳理来韩目的、停留时间、需要的翻译支持、车辆安排、陪同需求和恢复期间的行动路线。

我们不是简单地推荐一家医院，而是帮助您在来韩国之前，把咨询、预约、移动、翻译和停留安排先理清楚。

医疗判断由医院和专业医生负责，汉江春天负责协助行程、沟通与陪同安排。`,
      recommended: '安心赴韩 · 预约协调 · 翻译陪同',
    },
    ko: {
      title: '병원, 통역, 한국 일정이 걱정된다',
      catName: '안심 한국 의료 여행 상담',
      catTag: '예약 · 통역 · 차량 · 일정 · 동행 지원',
      desc: `한국에서 의료 상담을 준비할 때, 많은 분들이 실제로 걱정하는 것은 병원 자체만이 아닙니다. 전체 과정이 순조로울지가 더 큰 걱정입니다.

어떤 기관을 선택해야 할지, 예약은 어떻게 하는지, 한국어로만 소통해야 하는지, 치료 후 어디에 머무는 게 더 편한지, 일정은 어떻게 짜야 하는지 — 이런 것들이 모두 불안을 줍니다.

한강애봄은 의료 상담 전에 먼저 방한 목적, 체류 기간, 필요한 통역 지원, 차량 안내, 동행 수요, 회복 기간 동선을 정리해 드립니다.

단순히 병원 하나를 추천하는 것이 아니라, 한국에 오기 전에 상담·예약·이동·통역·체류 안내를 먼저 명확히 정리해 드립니다.

의료 판단은 병원과 전문의가 맡고, 한강애봄은 일정·소통·동행 안내를 돕는 역할을 합니다.`,
      recommended: '안심 방한 · 예약 조율 · 통역 동행',
    },
    en: {
      title: 'I am worried about hospitals, interpretation, and my Korea itinerary',
      catName: 'Korea Medical Travel Support',
      catTag: 'Appointment · Interpreter · Transport · Itinerary · Escort',
      desc: `When preparing to come to Korea for medical consultation, many people's real concern isn't just the hospital itself — it's whether the entire process will go smoothly.

Not knowing which type of institution to choose, how to make an appointment, whether Chinese communication is available, where to stay after treatment, and how to plan the schedule all create anxiety.

Before your medical consultation, we help you clarify the purpose of your visit, length of stay, translation support needed, transportation arrangements, escort requirements, and movement during recovery.

We don't simply recommend a hospital — we help you sort out consultation, booking, transport, interpretation, and accommodation before you arrive in Korea.

Medical decisions are made by the hospital and physicians, while Hangangaeborn's role is to help coordinate the itinerary, communication, and escort arrangements.`,
      recommended: 'Safe Korea Visit · Appointment Coordination · Interpreter',
    },
    ar: {
      title: 'قلق بشأن المستشفى والترجمة وجدول رحلتي لكوريا',
      catName: 'دعم السفر الطبي لكوريا',
      catTag: 'المواعيد · الترجمة · المواصلات · البرنامج · المرافقة',
      desc: `عند التحضير للقدوم إلى كوريا للاستشارة الطبية، القلق الحقيقي لكثير من الناس ليس فقط المستشفى نفسه — بل ما إذا كانت العملية بأكملها ستسير بسلاسة.

عدم معرفة نوع المؤسسة التي تختارها، وكيفية تحديد موعد، وما إذا كانت التواصل بالعربية متاحاً، وأين تقيم بعد العلاج، وكيف تخطط للجدول — كل هذه الأمور تسبب القلق.

قبل استشارتك الطبية، نساعدك في توضيح غرض زيارتك ومدة إقامتك ودعم الترجمة المطلوب وترتيبات المواصلات ومتطلبات المرافقة والتنقل خلال فترة التعافي.

نحن لا نوصي ببساطة بمستشفى — نساعدك في تنظيم الاستشارة والحجز والمواصلات والترجمة والإقامة قبل وصولك إلى كوريا.

تتخذ المستشفيات والأطباء القرارات الطبية، بينما يكون دور Hangangaeborn هو المساعدة في تنسيق البرنامج والتواصل وترتيبات المرافقة.`,
      recommended: 'زيارة آمنة لكوريا · تنسيق المواعيد · الترجمة',
    },
  },

  /* ── 8. 韩国体检和中国体检，主要有什么不同？ ───────────── */
  {
    id: 'health-checkup',
    zh: {
      title: '韩国体检和中国体检，主要有什么不同？',
      catName: '韩国健康检查咨询',
      catTag: '精密体检 · 功能医学 · 专科咨询 · 结果说明',
      desc: `韩国和中国都有完善的体检系统，但客户真正感受到的差异，往往不只在检查设备，而在检查前的规划、检查后的说明，以及是否能连接到下一步咨询。

韩国体检会根据医疗机构不同，在检查项目、专科医生咨询、追加诊疗连接和结果说明方式上有所差异。

对于海外客户来说，重要的不只是做检查，而是能不能理解检查结果，以及检查后应该如何继续管理。

汉江春天不会一开始就建议您做越多越好的检查。
我们会根据您的年龄、家族史、当前症状、疲劳感、睡眠、体重变化，以及女性或男性健康相关问题，先帮您整理适合进一步了解的体检方向。

检查后，也可以根据需要协助您理解结果说明、追加咨询可能性，以及韩国停留期间的安排。

具体检查项目与后续诊疗方向，以专业医生面诊判断为准。`,
      recommended: '韩国健康检查 · 功能医学 · 专科咨询',
    },
    ko: {
      title: '한국 체검과 중국 체검, 주요 차이가 궁금하다',
      catName: '한국 건강검진 상담',
      catTag: '정밀검진 · 기능의학 · 전문과 상담 · 결과 설명',
      desc: `한국과 중국 모두 완성도 높은 검진 시스템을 갖추고 있습니다. 하지만 고객이 실제로 체감하는 차이는 검사 장비보다 검진 전 계획, 검진 후 설명, 그리고 다음 단계 상담으로의 연결 여부에서 더 크게 나타납니다.

한국의 건강검진은 의료기관마다 검사 항목, 전문의 상담, 추가 진료 연계, 결과 설명 방식이 다를 수 있습니다.

해외 고객에게 중요한 것은 단순히 검사를 받는 것이 아니라, 검사 결과를 이해할 수 있는지, 그리고 검진 후 어떻게 계속 관리해야 하는지입니다.

한강애봄은 처음부터 많은 검사를 권하지 않습니다.
나이, 가족력, 현재 증상, 피로감, 수면, 체중 변화, 여성 또는 남성 건강 관련 문제를 기반으로 어떤 방향의 검진을 먼저 알아보면 좋을지 정리해 드립니다.

검진 후에도 필요에 따라 결과 설명 이해, 추가 상담 가능성, 한국 체류 기간 안내를 협조해 드릴 수 있습니다.

구체적인 검사 항목과 이후 진료 방향은 전문의 면진 판단을 따릅니다.`,
      recommended: '한국 건강검진 · 기능의학 · 전문과 상담',
    },
    en: {
      title: 'What are the main differences between Korean and Chinese health checkups?',
      catName: 'Korean Health Checkup Consultation',
      catTag: 'Precision Checkup · Functional Medicine · Specialist · Results',
      desc: `Both Korea and China have well-developed checkup systems. But the difference clients actually feel is often not just in the equipment — it's in the planning before the checkup, the explanation after it, and whether it connects to next-step consultation.

Korean checkups vary by institution in terms of test items, specialist consultations, follow-up treatment connections, and how results are explained.

For overseas clients, what matters isn't just having the checkup done — it's whether you can understand the results and how to continue managing your health afterward.

We don't start by recommending as many tests as possible.
We first help you identify which checkup directions are worth exploring based on your age, family history, current symptoms, fatigue, sleep patterns, weight changes, and women's or men's health concerns.

After the checkup, we can also help you understand results, explore follow-up consultation options, and arrange your Korea stay schedule.

The specific tests and follow-up direction are determined by a physician through an in-person consultation.`,
      recommended: 'Korean Health Checkup · Functional Medicine · Specialist',
    },
    ar: {
      title: 'ما الفرق الرئيسي بين الفحص الطبي الكوري وفحص بلدي؟',
      catName: 'استشارة الفحص الطبي الكوري',
      catTag: 'فحص دقيق · الطب الوظيفي · استشارة متخصصة · النتائج',
      desc: `كل من كوريا ودول الخليج لديها أنظمة فحص طبي متطورة. لكن الفرق الذي يشعر به العملاء فعلياً غالباً لا يكمن فقط في المعدات — بل في التخطيط قبل الفحص والشرح بعده وما إذا كان يوصلك إلى استشارة الخطوة التالية.

تختلف الفحوصات الكورية بحسب المؤسسة من حيث بنود الاختبار واستشارات المتخصصين وروابط المتابعة وكيفية شرح النتائج.

بالنسبة للعملاء الدوليين، ما يهم ليس فقط إجراء الفحص — بل ما إذا كنت تستطيع فهم النتائج وكيفية الاستمرار في إدارة صحتك بعد ذلك.

نحن لا نبدأ بالتوصية بأكبر عدد ممكن من الاختبارات.
نساعدك أولاً في تحديد اتجاهات الفحص التي تستحق الاستكشاف بناءً على عمرك وتاريخك العائلي والأعراض الحالية والتعب وأنماط النوم وتغيرات الوزن ومخاوف صحة المرأة أو الرجل.

بعد الفحص، يمكننا أيضاً مساعدتك في فهم النتائج واستكشاف خيارات المتابعة وترتيب جدول إقامتك في كوريا.

تُحدَّد الفحوصات المحددة واتجاه المتابعة من قبل الطبيب المتخصص بعد استشارة مباشرة.`,
      recommended: 'الفحص الطبي الكوري · الطب الوظيفي · استشارة متخصصة',
    },
  },
]

export function getConcernById(id: string): ConcernContext | null {
  return concernsData.find(c => c.id === id) ?? null
}
