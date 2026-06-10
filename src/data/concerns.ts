export interface ConcernContext {
  id: string
  zh: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  ko: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  en: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  ar: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
}

export const concernsData: ConcernContext[] = [
  /* ── 1. 想自然变年轻一点 ────────────────────────────────── */
  {
    id: 'younger-look',
    zh: {
      title: '想变年轻一点',
      catName: '皮肤医美',
      catTag: '抗衰老 · 皮肤提升 · 状态管理',
      desc: `不是为了变成另一个人，而是希望看起来更自然、更有精神、更年轻一点。

很多人说自己"显老了"，其实原因并不一样。
有的人是皮肤松弛，有的人是肤质变粗、暗沉，有的人是面部轮廓下垂，也有人只是长期疲劳，让整个人看起来没有状态。

汉江春天不会一开始就推荐某个项目。
我们会先帮您梳理：显老感主要来自哪里、您能接受的恢复期是多少、希望自然改善还是明显提升、计划在韩国停留几天。

整理清楚后，再为您对接适合的韩国医疗咨询方向。`,
      recommended: '皮肤医美 · 抗衰管理 · 轮廓提升',
    },
    ko: {
      title: '좀 더 젊어 보이고 싶다',
      catName: '피부의료미용',
      catTag: '항노화 · 피부 리프팅 · 컨디션 관리',
      desc: `다른 사람이 되고 싶은 게 아닙니다. 더 자연스럽고 활기차고, 조금 더 젊어 보이고 싶은 것입니다.

많은 분들이 "나이 들어 보인다"고 느끼시는데, 사실 그 원인은 각각 다릅니다.
피부 탄력이 떨어진 분도 있고, 피부 결이 거칠어지거나 칙칙해진 분도 있으며, 얼굴 윤곽이 처진 분도 있고, 단순히 만성 피로로 전체적으로 지쳐 보이는 분도 있습니다.

한강애봄은 처음부터 특정 시술을 추천하지 않습니다.
먼저 정리해 드립니다. 노안의 주요 원인이 무엇인지, 감수할 수 있는 회복 기간은 어느 정도인지, 자연스러운 개선을 원하는지 눈에 띄는 변화를 원하는지, 한국 체류 일정은 어떻게 되는지.

정리가 끝나면 적합한 한국 의료 상담 방향으로 연결해 드립니다.`,
      recommended: '피부의료미용 · 항노화 관리 · 윤곽 리프팅',
    },
    en: {
      title: 'I want to restore a younger look',
      catName: 'Skin & Aesthetics',
      catTag: 'Anti-Aging · Skin Lifting · Condition Management',
      desc: `Not to become someone different — just to look more natural, vibrant, and a little younger.

Many people say they look older than they feel, but the reasons vary greatly.
For some it's loss of skin firmness, for others it's rough texture or dullness, some notice sagging facial contours, and others simply carry years of fatigue that dulls their appearance.

Hangangaeborn doesn't recommend specific treatments right away.
We first help you clarify: where the aging appearance mainly comes from, how much downtime you can accept, whether you prefer subtle improvement or more visible change, and how many days you plan to stay in Korea.

Once that's clear, we connect you with the right Korean medical consultation direction.`,
      recommended: 'Skin & Aesthetics · Anti-Aging · Facial Lifting',
    },
    ar: {
      title: 'أريد استعادة مظهر أصغر سناً',
      catName: 'الطب التجميلي للبشرة',
      catTag: 'مكافحة الشيخوخة · رفع البشرة · إدارة الحالة',
      desc: `ليس الهدف أن تصبح شخصاً مختلفاً — بل أن تبدو أكثر طبيعية وحيوية وأصغر سناً بقليل.

كثير من الناس يشعرون بأنهم يبدون أكبر من أعمارهم، لكن الأسباب تتفاوت كثيراً.
بعضهم يعاني من فقدان مرونة البشرة، وآخرون يلاحظون خشونة الملمس أو الإرهاق، وبعضهم يلاحظ ترهل ملامح الوجه، وأحياناً يكون السبب ببساطة تراكم التعب الذي يؤثر على المظهر.

كيمديسبرينج لا يوصي بعلاجات محددة منذ البداية.
نساعدك أولاً في توضيح: من أين يأتي مظهر التقدم في السن بشكل رئيسي، ومقدار فترة التعافي التي يمكنك قبولها، وما إذا كنت تفضل تحسيناً خفيفاً أو تغييراً أكثر وضوحاً، وعدد الأيام التي تخطط للإقامة في كوريا.

بمجرد توضيح ذلك، نوصلك بالاتجاه الصحيح للاستشارة الطبية الكورية.`,
      recommended: 'الطب التجميلي للبشرة · إدارة مكافحة الشيخوخة · رفع الملامح',
    },
  },

  /* ── 2. 想延缓衰老速度 ──────────────────────────────────── */
  {
    id: 'slow-aging',
    zh: {
      title: '想延缓衰老速度',
      catName: '抗衰老管理',
      catTag: '皮肤 · 功能医学 · 再生医学 · 生活方式管理',
      desc: `衰老无法完全停止，但每个人衰老加快的原因并不一样。

有的人最先感觉到皮肤弹性下降，有的人先出现疲劳、睡眠质量下降，也有人会出现体重变化、激素变化、代谢变慢或肌肉量减少等身体信号。

汉江春天不会一开始就推荐某个项目。
我们会先帮您梳理：您目前感受到的衰老信号，主要来自皮肤问题、体力问题、代谢或激素问题，还是生活节奏问题。

整理清楚后，再根据您的情况，对接适合的韩国皮肤管理、功能医学咨询、抗衰老检查或再生医学相关咨询方向。`,
      recommended: '抗衰老管理 · 功能医学 · 皮肤管理',
    },
    ko: {
      title: '노화 속도를 늦추고 싶다',
      catName: '항노화 관리',
      catTag: '피부 · 기능의학 · 재생의학 · 생활방식 관리',
      desc: `노화를 완전히 막을 수는 없지만, 노화가 빨라지는 원인은 사람마다 다릅니다.

어떤 분은 피부 탄력이 먼저 떨어지고, 어떤 분은 피로감이나 수면의 질이 먼저 저하됩니다. 체중 변화, 호르몬 변화, 대사 저하, 근육량 감소 등 다양한 신체 신호로 나타나기도 합니다.

한강애봄은 처음부터 특정 시술을 추천하지 않습니다.
먼저 어떤 노화 신호가 주로 나타나는지 — 피부 문제인지, 체력 문제인지, 대사·호르몬 문제인지, 아니면 생활 리듬 문제인지 먼저 정리해 드립니다.

정리 후 피부관리, 기능의학 상담, 항노화 검진, 재생의학 관련 상담 방향으로 연결해 드립니다.`,
      recommended: '항노화 관리 · 기능의학 · 피부관리',
    },
    en: {
      title: 'I want to slow down aging',
      catName: 'Anti-Aging Management',
      catTag: 'Skin · Functional Medicine · Regenerative · Lifestyle',
      desc: `Aging can't be fully stopped, but the reasons it accelerates are different for everyone.

Some people first notice declining skin elasticity, others experience fatigue or poor sleep quality first. Some show signs through weight changes, hormonal shifts, slowing metabolism, or loss of muscle mass.

We don't recommend specific treatments from the start.
We first help you identify where your aging signals are mainly coming from — skin, energy, metabolism, hormones, or lifestyle rhythm.

From there, we connect you with Korean skin management, functional medicine consultation, anti-aging checkups, or regenerative medicine directions.`,
      recommended: 'Anti-Aging · Functional Medicine · Skin Management',
    },
    ar: {
      title: 'أريد إبطاء الشيخوخة',
      catName: 'إدارة مكافحة الشيخوخة',
      catTag: 'البشرة · الطب الوظيفي · الطب التجديدي · نمط الحياة',
      desc: `لا يمكن إيقاف الشيخوخة تماماً، لكن أسباب تسارعها تختلف من شخص لآخر.

بعض الناس يلاحظون أولاً تراجع مرونة البشرة، وآخرون يشعرون بالتعب أو تراجع جودة النوم أولاً. البعض يُظهر علامات في تغيرات الوزن أو الهرمونات أو تباطؤ الأيض أو فقدان الكتلة العضلية.

نحن لا نوصي بعلاجات محددة منذ البداية.
نساعدك أولاً في تحديد مصدر إشارات الشيخوخة الرئيسية — هل هي في البشرة أم الطاقة أم الأيض والهرمونات أم إيقاع الحياة.

من هناك، نوصلك بإدارة البشرة الكورية أو استشارة الطب الوظيفي أو فحوصات مكافحة الشيخوخة أو اتجاهات الطب التجديدي.`,
      recommended: 'مكافحة الشيخوخة · الطب الوظيفي · إدارة البشرة',
    },
  },

  /* ── 3. 想了解韩国合法合规的再生医学咨询 ───────────────── */
  {
    id: 'regen-medicine',
    zh: {
      title: '想了解韩国合法合规的再生医学咨询',
      catName: '再生医学咨询',
      catTag: '干细胞 · 关节 · 恢复管理 · 抗衰老咨询',
      desc: `再生医学和干细胞相关咨询，需要非常谨慎地对待。

在韩国，并不是所有干细胞治疗都可以自由进行。是否适合相关治疗，需要根据适应范围、医疗机构判断、法律规定以及患者自身状态来确认。

汉江春天不会用"都可以做"这样的方式进行说明。
我们会先帮您梳理：您关注的是抗衰老、关节问题、术后恢复管理，还是皮肤与组织修复方向。

整理清楚后，再为您说明韩国可进一步咨询的范围，以及哪些内容需要由正规医疗机构和专业医生进一步判断。

最终是否适合相关治疗或项目，必须以韩国正规医疗机构及专业医生的判断为准。`,
      recommended: '再生医学咨询 · 抗衰老 · 关节健康',
    },
    ko: {
      title: '한국의 합법적인 재생의학 상담을 알고 싶다',
      catName: '재생의학 상담',
      catTag: '줄기세포 · 관절 · 회복관리 · 항노화 상담',
      desc: `재생의학 및 줄기세포 관련 상담은 매우 신중하게 접근해야 합니다.

한국에서는 모든 줄기세포 치료를 자유롭게 진행할 수 있는 것이 아닙니다. 적응증의 범위, 의료기관의 판단, 법적 규정, 환자 본인의 상태에 따라 가능 여부를 확인해야 합니다.

한강애봄은 "다 할 수 있다"는 방식으로 설명하지 않습니다.
먼저 항노화, 관절 문제, 술후 회복 관리, 피부·조직 회복 중 어디에 관심이 있으신지 정리해 드립니다.

정리 후 한국에서 추가 상담이 가능한 범위를 안내드리고, 정식 의료기관과 전문의의 추가 판단이 필요한 사항을 명확히 설명드립니다.

최종 치료 적합 여부는 반드시 정식 의료기관의 면진과 전문의 판단에 따릅니다.`,
      recommended: '재생의학 상담 · 항노화 · 관절건강',
    },
    en: {
      title: 'I want to learn about legal regenerative medicine in Korea',
      catName: 'Regenerative Medicine Consultation',
      catTag: 'Stem Cell · Joint · Recovery · Anti-Aging',
      desc: `Consultations related to regenerative medicine and stem cells require very careful consideration.

In Korea, not all stem cell treatments can be freely performed. Whether a treatment is appropriate depends on the scope of approved indications, the medical institution's assessment, legal regulations, and the patient's own condition.

We don't present it as "everything is possible."
We first help clarify whether your interest is in anti-aging, joint health, post-procedure recovery management, or skin and tissue repair.

From there, we explain what can be further consulted in Korea, and what must be determined by a licensed medical institution and specialist.

Whether a specific treatment is appropriate must ultimately be determined by a qualified Korean medical institution and physician.`,
      recommended: 'Regenerative Medicine · Anti-Aging · Joint Health',
    },
    ar: {
      title: 'أريد معرفة الطب التجديدي القانوني في كوريا',
      catName: 'استشارة الطب التجديدي',
      catTag: 'الخلايا الجذعية · المفاصل · التعافي · مكافحة الشيخوخة',
      desc: `الاستشارات المتعلقة بالطب التجديدي والخلايا الجذعية تتطلب حذراً شديداً.

في كوريا، لا يمكن إجراء جميع علاجات الخلايا الجذعية بحرية. ما إذا كان العلاج مناسباً يعتمد على نطاق التشخيصات المعتمدة وتقييم المؤسسة الطبية واللوائح القانونية وحالة المريض نفسه.

نحن لا نقدم الأمر على أنه "كل شيء ممكن".
نساعدك أولاً في توضيح ما إذا كان اهتمامك في مكافحة الشيخوخة أو صحة المفاصل أو إدارة التعافي بعد الإجراءات أو إصلاح البشرة والأنسجة.

من هناك، نشرح ما يمكن استشارته بشكل إضافي في كوريا، وما يجب تحديده من قبل مؤسسة طبية مرخصة ومتخصص.

ما إذا كان العلاج مناسباً يجب تحديده في نهاية المطاف من قبل مؤسسة طبية كورية مؤهلة وطبيب متخصص.`,
      recommended: 'الطب التجديدي · مكافحة الشيخوخة · صحة المفاصل',
    },
  },

  /* ── 4. 想改善脸部线条和整体气质 ──────────────────────── */
  {
    id: 'face-contour',
    zh: {
      title: '想改善脸部线条和整体气质',
      catName: '脸部线条改善咨询',
      catTag: '轮廓 · 提升 · 容量支撑 · 气质改善',
      desc: `脸部线条不清晰，并不代表每个人的问题都一样。

有的人是下颌线变模糊，有的人是面部开始下垂，也有人是脸部凹陷、苹果肌流失，或者侧脸线条不够流畅，导致整体气质不够清爽。

汉江春天会先帮您梳理：您想改善的是"小一点的脸"、更清晰的下颌线、更柔和的气质，还是更自然年轻的整体感觉。

整理后，我们会根据您的恢复期、预算和来韩计划，协助您对接皮肤提升、轮廓咨询、容量支撑或整形医美相关的韩国医疗咨询方向。`,
      recommended: '脸部线条改善 · 皮肤提升 · 轮廓咨询',
    },
    ko: {
      title: '얼굴 라인과 전체 분위기를 개선하고 싶다',
      catName: '얼굴 라인 개선 상담',
      catTag: '윤곽 · 리프팅 · 볼륨 지지 · 분위기 개선',
      desc: `얼굴 라인이 또렷하지 않다고 해서 모두 같은 이유는 아닙니다.

어떤 분은 턱선이 흐릿해지고, 어떤 분은 얼굴이 처지기 시작하며, 볼 부위가 꺼지거나 사과근이 줄어든 분도 있고, 측면 라인이 매끄럽지 않아 전체적으로 덜 깔끔해 보이는 분도 있습니다.

한강애봄은 먼저 정리해 드립니다. 원하시는 것이 "더 작은 얼굴", 더 또렷한 턱선, 더 부드러운 분위기, 아니면 더 자연스럽고 젊은 전체적인 느낌인지요.

정리 후 회복 기간, 예산, 방한 계획을 고려하여 피부 리프팅, 윤곽 상담, 볼륨 지지, 성형의료미용 관련 한국 의료 상담 방향으로 연결해 드립니다.`,
      recommended: '얼굴 라인 개선 · 피부 리프팅 · 윤곽 상담',
    },
    en: {
      title: 'I want to improve my facial contours and overall appearance',
      catName: 'Facial Contour Improvement',
      catTag: 'Contour · Lifting · Volume Support · Appearance',
      desc: `An undefined facial contour doesn't mean everyone has the same problem.

Some people have a blurred jawline, others notice the face starting to sag, some experience facial hollowing or loss of the apple cheek area, and others find their side profile isn't as clean as they'd like.

We first help clarify what you're hoping to improve — a "smaller face," a cleaner jawline, a softer overall impression, or a more naturally youthful appearance.

From there, we consider your downtime tolerance, budget, and travel plan to connect you with Korean consultation directions in skin lifting, facial contouring, volume support, or aesthetic procedures.`,
      recommended: 'Facial Contour · Skin Lifting · Contouring Consultation',
    },
    ar: {
      title: 'أريد تحسين ملامح وجهي ومظهري العام',
      catName: 'تحسين ملامح الوجه',
      catTag: 'الملامح · الرفع · دعم الحجم · المظهر',
      desc: `عدم وضوح ملامح الوجه لا يعني أن الجميع لديهم نفس المشكلة.

بعض الناس لديهم خط فك ضبابي، وآخرون يلاحظون بدء ترهل الوجه، وبعضهم يعاني من تجويف الوجه أو فقدان منطقة خد التفاحة، وآخرون يجدون خطهم الجانبي ليس بالنظافة التي يريدونها.

نساعدك أولاً في توضيح ما تأمل في تحسينه — "وجه أصغر"، أو خط فك أكثر وضوحاً، أو انطباع عام أكثر نعومة، أو مظهر أكثر شباباً بشكل طبيعي.

من هناك، نأخذ في الاعتبار تحملك لفترة التعافي والميزانية وخطة السفر لنوصلك باستشارات كورية في رفع البشرة أو تشكيل الوجه أو دعم الحجم أو إجراءات التجميل.`,
      recommended: 'ملامح الوجه · رفع البشرة · استشارة التشكيل',
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
      recommended: '整形医美咨询 · 眼部 · 鼻部 · 轮廓',
    },
    ko: {
      title: '성형에 관심 있어, 전문적인 안내가 필요해',
      catName: '성형의료미용 상담',
      catTag: '눈 · 코 · 윤곽 · 자연스러운 성형 · 회복 계획',
      desc: `성형은 단순히 예쁜 사진을 보고 따라 하는 것이 아닙니다. 자신의 얼굴 베이스, 원하는 스타일, 회복 기간, 예산, 안전성을 함께 고려해야 합니다.

처음부터 눈, 코, 윤곽 중 어떤 것을 할지 바로 결정할 필요는 없습니다.
"더 자연스럽게 보이고 싶다", "분위기를 더 또렷하게 하고 싶다", "피곤해 보이는 인상을 줄이고 싶다", "이목구비의 조화를 높이고 싶다"는 목표부터 정리해도 됩니다.

한강애봄은 먼저 개선하고 싶은 부위, 기대하는 스타일, 가장 걱정되는 문제, 감수할 수 있는 회복 기간을 정리해 드립니다.

정리 후 어느 방향부터 상담을 시작할지, 함께 평가해야 할 항목이 무엇인지, 정식 의료기관의 추가 확인이 필요한 내용은 무엇인지 안내해 드립니다.

최종 수술 적합 여부와 구체적인 방법은 반드시 정식 의료기관의 면진과 전문의 판단에 따릅니다.`,
      recommended: '성형의료미용 상담 · 눈 · 코 · 윤곽',
    },
    en: {
      title: "I'm interested in plastic surgery and need professional guidance",
      catName: 'Plastic Surgery Consultation',
      catTag: 'Eyes · Nose · Contour · Natural Surgery · Recovery Plan',
      desc: `Plastic surgery isn't about simply copying a photo of someone beautiful. It requires considering your own facial foundation, desired style, recovery time, budget, and safety together.

You don't need to immediately decide whether to do eyes, nose, or facial contouring.
You can start from goals like "I want to look more natural," "I want a clearer overall impression," "I want to reduce a tired look," or "I want more harmonious features."

We first help clarify the areas you want to change, the style you're hoping for, your main concerns, and how much downtime you can accept.

From there, we help you determine which direction to consult first, what should be evaluated together, and what requires further confirmation from a medical specialist.

Whether surgery is appropriate and the specific approach must ultimately be determined by a licensed medical institution and physician.`,
      recommended: 'Plastic Surgery Consultation · Eyes · Nose · Contour',
    },
    ar: {
      title: 'أنا مهتم بالجراحة التجميلية وأحتاج توجيهاً متخصصاً',
      catName: 'استشارة الجراحة التجميلية',
      catTag: 'العيون · الأنف · الملامح · جراحة طبيعية · خطة التعافي',
      desc: `الجراحة التجميلية ليست مجرد نسخ صورة لشخص جميل. تتطلب مراعاة أساس وجهك الخاص والأسلوب المطلوب ووقت التعافي والميزانية والسلامة معاً.

لا تحتاج أن تقرر فوراً ما إذا كنت ستجري عيون أو أنف أو تشكيل للوجه.
يمكنك البدء بأهداف مثل "أريد أن أبدو أكثر طبيعية" أو "أريد انطباعاً أكثر وضوحاً" أو "أريد تقليل مظهر التعب" أو "أريد ملامح أكثر انسجاماً".

نساعدك أولاً في توضيح المناطق التي تريد تغييرها والأسلوب الذي تأمله ومخاوفك الرئيسية ومقدار فترة التعافي التي يمكنك قبولها.

من هناك، نساعدك في تحديد الاتجاه الذي تبدأ به الاستشارة وما يجب تقييمه معاً وما يتطلب تأكيداً من متخصص طبي.

ما إذا كانت الجراحة مناسبة والنهج المحدد يجب تحديده في نهاية المطاف من قبل مؤسسة طبية مرخصة وطبيب متخصص.`,
      recommended: 'استشارة الجراحة التجميلية · العيون · الأنف · الملامح',
    },
  },

  /* ── 6. 想改善疲惫感和没精神的状态 ────────────────────── */
  {
    id: 'fatigue-look',
    zh: {
      title: '想改善疲惫感和没精神的状态',
      catName: '疲惫感与状态改善咨询',
      catTag: '眼周 · 肤色 · 脸部凹陷 · 状态管理',
      desc: `看起来疲惫，并不只是因为睡得不够。

眼下凹陷、黑眼圈、肤色暗沉、脸部容量流失、嘴角下垂，甚至长期疲劳和身体状态下降，都可能让一个人看起来没有精神。

汉江春天会先帮您梳理：您的疲惫感主要来自眼周、肤色、脸部凹陷，还是身体状态与生活节奏。

如果您希望恢复期短，我们会优先帮您整理较轻负担的咨询方向。
如果需要，也可以进一步连接皮肤医美、抗衰管理或健康管理相关咨询。`,
      recommended: '疲惫感改善 · 皮肤医美 · 抗衰管理',
    },
    ko: {
      title: '피곤해 보이는 인상을 개선하고 싶다',
      catName: '피로감·인상 개선 상담',
      catTag: '눈 주위 · 피부톤 · 얼굴 함몰 · 컨디션 관리',
      desc: `피곤해 보이는 것이 단순히 잠이 부족해서만은 아닙니다.

눈 아래 꺼짐, 다크서클, 칙칙한 피부톤, 얼굴 볼륨 감소, 입꼬리 처짐, 만성 피로나 신체 컨디션 저하까지 다양한 원인이 얽혀 있을 수 있습니다.

한강애봄은 먼저 피로감이 눈 주위, 피부톤, 얼굴 함몰, 아니면 신체 컨디션이나 생활 리듬에서 주로 비롯되는지 정리해 드립니다.

회복 기간이 짧기를 원하신다면 부담이 적은 상담 방향을 먼저 정리해 드립니다.
필요에 따라 피부의료미용, 항노화 관리, 건강 관리 관련 상담으로도 연결해 드립니다.`,
      recommended: '피로감 개선 · 피부의료미용 · 항노화 관리',
    },
    en: {
      title: 'I want to improve my tired and dull appearance',
      catName: 'Fatigue & Appearance Improvement',
      catTag: 'Eye Area · Skin Tone · Facial Hollowing · Condition',
      desc: `Looking tired isn't only about not getting enough sleep.

Hollowing under the eyes, dark circles, dull skin tone, loss of facial volume, drooping corners of the mouth, chronic fatigue, and declining physical condition can all make a person look worn out.

We first help identify whether the tired look is mainly coming from the eye area, skin tone, facial hollowing, or overall physical condition and lifestyle rhythm.

If you need minimal downtime, we'll prioritize lighter consultation directions.
When needed, we can also connect you with skin aesthetics, anti-aging management, or health management consultations.`,
      recommended: 'Fatigue Improvement · Skin Aesthetics · Anti-Aging',
    },
    ar: {
      title: 'أريد تحسين مظهر التعب والإرهاق',
      catName: 'تحسين مظهر التعب',
      catTag: 'منطقة العيون · لون البشرة · تجويف الوجه · إدارة الحالة',
      desc: `الظهور بمظهر متعب لا يعني فقط عدم الحصول على قسط كافٍ من النوم.

التجويف تحت العيون والهالات الداكنة وشحوب البشرة وفقدان حجم الوجه وترهل زوايا الفم والتعب المزمن وتراجع الحالة الجسدية — كلها يمكن أن تجعل الشخص يبدو مرهقاً.

نساعدك أولاً في تحديد ما إذا كان مظهر التعب يأتي بشكل رئيسي من منطقة العينين أو لون البشرة أو تجويف الوجه أو الحالة الجسدية العامة وإيقاع الحياة.

إذا كنت بحاجة إلى الحد الأدنى من فترة التعافي، سنعطي الأولوية لاتجاهات الاستشارة الأخف.
عند الحاجة، يمكننا أيضاً توصيلك باستشارات الطب التجميلي للبشرة أو إدارة مكافحة الشيخوخة أو إدارة الصحة.`,
      recommended: 'تحسين التعب · الطب التجميلي للبشرة · مكافحة الشيخوخة',
    },
  },

  /* ── 7. 担心医院、翻译和韩国行程安排 ──────────────────── */
  {
    id: 'korea-trip-worry',
    zh: {
      title: '担心医院、翻译和韩国行程安排',
      catName: '安心韩国医疗旅行咨询',
      catTag: '预约 · 翻译 · 车辆 · 行程 · 停留支持',
      desc: `准备来韩国接受医疗咨询时，很多人真正担心的并不只是医院本身，而是整个过程是否顺利。

不知道该选择哪类机构、如何预约、是否能中文沟通、治疗后住在哪里更方便、行程怎么安排，都会让人感到不安。

汉江春天会在医疗咨询前，先帮您梳理来韩目的、停留时间、需要的翻译支持、车辆安排、陪同需求和恢复期间的行动路线。

我们不是简单地推荐一家医院，而是帮助您在来韩国之前，把咨询、预约、移动、翻译和停留安排先理清楚。`,
      recommended: '安心赴韩 · 预约协调 · 翻译陪同',
    },
    ko: {
      title: '병원, 통역, 한국 일정이 걱정돼',
      catName: '안심 한국 의료 여행 상담',
      catTag: '예약 · 통역 · 차량 · 일정 · 체류 지원',
      desc: `한국에서 의료 상담을 준비할 때, 많은 분들이 실제로 걱정하는 것은 병원 자체만이 아닙니다. 전체 과정이 순조로울지가 더 큰 걱정입니다.

어떤 기관을 선택해야 할지, 예약은 어떻게 하는지, 한국어로만 소통해야 하는지, 치료 후 어디에 머무는 게 더 편한지, 일정은 어떻게 짜야 하는지 — 이런 것들이 모두 불안을 줍니다.

한강애봄은 의료 상담 전에 먼저 방한 목적, 체류 기간, 필요한 통역 지원, 차량 안내, 동행 수요, 회복 기간 동선을 정리해 드립니다.

단순히 병원 하나를 추천하는 것이 아니라, 한국에 오기 전에 상담·예약·이동·통역·체류 안내를 먼저 명확히 정리해 드립니다.`,
      recommended: '안심 방한 · 예약 조율 · 통역 동행',
    },
    en: {
      title: 'Worried about hospital, interpretation, and Korea itinerary',
      catName: 'Korea Medical Travel Support',
      catTag: 'Appointment · Interpreter · Transport · Itinerary · Stay',
      desc: `When preparing to come to Korea for medical consultation, many people's real concern isn't just the hospital itself — it's whether the entire process will go smoothly.

Not knowing which type of institution to choose, how to make an appointment, whether Chinese communication is available, where to stay after treatment, and how to plan the schedule all create anxiety.

Before your medical consultation, we help you clarify the purpose of your visit, length of stay, translation support needed, transportation arrangements, escort requirements, and movement during recovery.

We don't simply recommend a hospital — we help you sort out consultation, booking, transport, interpretation, and accommodation before you arrive in Korea.`,
      recommended: 'Safe Korea Visit · Appointment Coordination · Interpreter',
    },
    ar: {
      title: 'قلق بشأن المستشفى والترجمة وجدول رحلتي لكوريا',
      catName: 'دعم السفر الطبي لكوريا',
      catTag: 'المواعيد · الترجمة · المواصلات · الجدول · دعم الإقامة',
      desc: `عند التحضير للقدوم إلى كوريا للاستشارة الطبية، القلق الحقيقي لكثير من الناس ليس فقط المستشفى نفسه — بل ما إذا كانت العملية بأكملها ستسير بسلاسة.

عدم معرفة نوع المؤسسة التي تختارها، وكيفية تحديد موعد، وما إذا كانت التواصل بالعربية متاحاً، وأين تقيم بعد العلاج، وكيف تخطط للجدول — كل هذه الأمور تسبب القلق.

قبل استشارتك الطبية، نساعدك في توضيح غرض زيارتك ومدة إقامتك ودعم الترجمة المطلوب وترتيبات المواصلات ومتطلبات المرافقة والتنقل خلال فترة التعافي.

نحن لا نوصي ببساطة بمستشفى — نساعدك في تنظيم الاستشارة والحجز والمواصلات والترجمة والإقامة قبل وصولك إلى كوريا.`,
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

检查后，也可以根据需要协助您理解结果说明、追加咨询可能性，以及韩国停留期间的安排。`,
      recommended: '韩国健康检查 · 功能医学 · 专科咨询',
    },
    ko: {
      title: '한국 체검과 중국 체검, 주요 차이점이 있나요?',
      catName: '한국 건강검진 상담',
      catTag: '정밀검진 · 기능의학 · 전문과 상담 · 결과 설명',
      desc: `한국과 중국 모두 완성도 높은 검진 시스템을 갖추고 있습니다. 하지만 고객이 실제로 체감하는 차이는 검사 장비보다 검진 전 계획, 검진 후 설명, 그리고 다음 단계 상담으로의 연결 여부에서 더 크게 나타납니다.

한국의 건강검진은 의료기관마다 검사 항목, 전문의 상담, 추가 진료 연계, 결과 설명 방식이 다를 수 있습니다.

해외 고객에게 중요한 것은 단순히 검사를 받는 것이 아니라, 검사 결과를 이해할 수 있는지, 그리고 검진 후 어떻게 계속 관리해야 하는지입니다.

한강애봄은 처음부터 많은 검사를 권하지 않습니다.
나이, 가족력, 현재 증상, 피로감, 수면, 체중 변화, 여성 또는 남성 건강 관련 문제를 기반으로 어떤 방향의 검진을 먼저 알아보면 좋을지 정리해 드립니다.

검진 후에도 필요에 따라 결과 설명 이해, 추가 상담 가능성, 한국 체류 기간 안내를 협조해 드릴 수 있습니다.`,
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

After the checkup, we can also help you understand results, explore follow-up consultation options, and arrange your Korea stay schedule.`,
      recommended: 'Korean Health Checkup · Functional Medicine · Specialist',
    },
    ar: {
      title: 'ما الفرق بين الفحص الطبي الكوري وفحص بلدي؟',
      catName: 'استشارة الفحص الطبي الكوري',
      catTag: 'فحص دقيق · الطب الوظيفي · استشارة متخصصة · النتائج',
      desc: `كل من كوريا ودول الخليج لديها أنظمة فحص طبي متطورة. لكن الفرق الذي يشعر به العملاء فعلياً غالباً لا يكمن فقط في المعدات — بل في التخطيط قبل الفحص والشرح بعده وما إذا كان يوصلك إلى استشارة الخطوة التالية.

تختلف الفحوصات الكورية بحسب المؤسسة من حيث بنود الاختبار واستشارات المتخصصين وروابط المتابعة وكيفية شرح النتائج.

بالنسبة للعملاء الدوليين، ما يهم ليس فقط إجراء الفحص — بل ما إذا كنت تستطيع فهم النتائج وكيفية الاستمرار في إدارة صحتك بعد ذلك.

نحن لا نبدأ بالتوصية بأكبر عدد ممكن من الاختبارات.
نساعدك أولاً في تحديد اتجاهات الفحص التي تستحق الاستكشاف بناءً على عمرك وتاريخك العائلي والأعراض الحالية والتعب وأنماط النوم وتغيرات الوزن ومخاوف صحة المرأة أو الرجل.

بعد الفحص، يمكننا أيضاً مساعدتك في فهم النتائج واستكشاف خيارات المتابعة وترتيب جدول إقامتك في كوريا.`,
      recommended: 'الفحص الطبي الكوري · الطب الوظيفي · استشارة متخصصة',
    },
  },
]

export function getConcernById(id: string): ConcernContext | null {
  return concernsData.find(c => c.id === id) ?? null
}
