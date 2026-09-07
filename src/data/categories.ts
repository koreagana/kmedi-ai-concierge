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
  en: string
  emoji: string
  /** 카테고리 히어로 영역에 표시할 실사 이미지 경로 (public/ 기준). 없으면 기존 그라디언트만 표시. */
  heroImage?: string
  /** heroImage 대신 배경 전체를 커버하는 영상으로 대체. 설정 시 heroImage는 poster로만 사용. */
  heroVideo?: string
  tagZh: string
  tagEn: string
  scriptFullZh: string
  scriptFullEn: string
  scriptSummaryZh: string
  scriptSummaryEn: string
}

export const categories: Category[] = [
  {
    id: 'skin-beauty',
    zh: '皮肤医美',
    en: 'Skin & Aesthetics',
    emoji: '✨',
    heroImage: '/category-hero/skin-beauty.jpg',
    heroVideo: '/category-hero/skin-beauty.mp4',
    tagZh: '皮肤提升 · 毛孔色斑 · 抗衰外观',
    tagEn: 'Skin Lifting · Pores & Pigmentation · Anti-Aging Appearance',
    scriptFullZh: `您好，欢迎进入皮肤医美咨询区。

皮肤医美不是先选一个项目名称，而是先了解皮肤状态。

松弛、下垂、毛孔、色斑、肤质粗糙、泛红、痘疤、恢复时间，都可能是您在意的方向。

同样是"想变年轻"，每个人的原因并不一样。

有的人需要提升和紧致，有的人更需要肤质和色素管理。

您可以先告诉我们，最在意的是皮肤松弛、毛孔、色斑、痘疤，还是整体肤质和年轻感。

如果您计划来韩国，我们也会一起考虑停留时间、恢复期、预算和是否需要翻译陪同。

汉江春天不会在页面上替您判断具体治疗方案。

具体的治疗方式，需要在了解皮肤状态并与医疗团队咨询后再决定。`,
    scriptFullEn: `Hello, welcome to the Skin & Aesthetics consultation area.

Skin & Aesthetics isn't about choosing a procedure name first.

It's a consultation that looks at sagging, firmness, pores, pigmentation, dull texture, redness, acne scars, and recovery time together.

Even the same wish to "look younger" can come from different causes for different people.

Some need lifting, while others need texture or pigmentation care first.

Please tell us first whether your main concern is firmness, pores, pigmentation, or acne scars — or your overall skin texture and youthful impression.

If you're planning a visit to Korea, we'll also consider your stay duration, recovery time, budget, and whether you need an interpreter.

K-Medi Spring does not determine a specific procedure on this page.

The specific treatment method is decided after assessing your skin condition and consulting with the medical team.`,
    scriptSummaryZh: `皮肤医美适合关注皮肤松弛、提升、肤质、毛孔、色斑、痘疤与抗衰管理的人群。汉江春天可帮助您整理皮肤需求，并连接韩国皮肤医美咨询服务。`,
    scriptSummaryEn: `Skin & Aesthetics suits those interested in skin firmness, lifting, texture, pores, pigmentation, acne scars, or anti-aging care. K-Medi Spring organizes your skin concerns and connects you to skin and aesthetic consultations in Korea.`,
  },
  {
    id: 'plastic-surgery',
    zh: '整形医美',
    en: 'Plastic Surgery',
    emoji: '🌸',
    heroImage: '/category-hero/plastic-surgery.jpg',
    heroVideo: '/category-hero/plastic-surgery.mp4',
    tagZh: '眼鼻轮廓 · 面部比例 · 恢复计划',
    tagEn: 'Eyes/Nose/Contour · Facial Balance · Recovery Plan',
    scriptFullZh: `您好，这里是整形医美咨询区。

整形医美不是直接照着一张照片去做。

需要先了解您的面部结构、皮肤厚度、骨骼条件、想要的感觉、恢复期和安全性。

眼部、鼻部、面部轮廓、眼下凹陷、脂肪移植、松弛改善，都可以是关注的方向。

不需要一开始就决定具体的手术名称。

更重要的是先确认，您想要的是自然的变化还是明显的变化，能接受的恢复期有多长。

您也可以告诉我们更重视自然感、恢复期、安全性、医生经验，还是预算控制。

我们会把这些内容整理成咨询卡，方便后续由专业医疗机构进一步评估。

是否能进行手术以及具体方式，必须以医生面诊和正规医疗评估为准。`,
    scriptFullEn: `Hello, welcome to the Plastic Surgery consultation area.

Plastic surgery isn't about copying a single photo directly.

It requires looking at your facial structure, skin thickness, bone structure, the look you want, recovery time, and safety together.

Eyes, nose, facial contour, under-eye area, fat grafting, and sagging improvement can all be areas of interest.

You don't need to decide on a specific procedure name from the start.

What matters more first is confirming whether you want a natural change or a more noticeable one, and how short a recovery period you can accept.

Please also tell us whether you value naturalness, recovery time, safety, the medical team's experience, or budget the most.

We'll organize this into a consultation card and connect you with a specialized medical institution.

Whether surgery is possible and the specific method must be determined through an in-person consultation with a specialist.`,
    scriptSummaryZh: `整形医美适合希望改善眼部、鼻部、面部轮廓、下垂、眼袋或整体年轻感的人群。汉江春天可协助整理需求，并连接后续专业整形咨询流程。`,
    scriptSummaryEn: `Plastic Surgery suits those interested in improving the eyes, nose, facial contour, sagging, under-eye area, or overall youthful impression. K-Medi Spring organizes your needs and connects you to specialized plastic surgery consultations.`,
  },
  {
    id: 'big-health',
    zh: '大健康',
    en: 'Anti-aging & Health Management',
    emoji: '🔬',
    heroImage: '/category-hero/dajiankang.jpg',
    heroVideo: '/category-hero/dajiankang.mp4',
    tagZh: '功能医学 · 慢性疲劳 · 代谢抗衰',
    tagEn: 'Functional Medicine · Chronic Fatigue · Metabolic Anti-Aging',
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
    scriptSummaryZh: `大健康管理适合希望系统了解身体状态、改善疲劳、睡眠、代谢与长期健康风险的人群。汉江春天可协助您整理需求，并对接韩国相关医疗咨询与健康管理服务。`,
    scriptSummaryEn: `Anti-aging & Health Management is suited for those who want to systematically understand their body and improve fatigue, sleep, metabolism, and long-term health risks. K-Medi Spring helps organize your needs and connects you to related medical consultations and health management services in Korea.`,
  },
  {
    id: 'stem-cell',
    zh: '再生医学中心',
    en: 'Regenerative Medicine Center',
    emoji: '🧬',
    heroImage: '/category-hero/zaishengyiliao.jpg',
    heroVideo: '/category-hero/zaishengyiliao.mp4',
    tagZh: '干细胞疗法 · NAD+抗衰老 · 免疫细胞疗法',
    tagEn: 'Stem Cell Therapy · NAD+ Anti-Aging · Immune Cell Therapy',
    scriptFullZh: `您好，这里是干细胞与再生医学相关咨询入口。

干细胞和再生医学是很多人关心的领域，但也容易被误解。

并不是所有干细胞相关项目，在韩国都可以自由进行。

适应症、疾病种类、法律规定和医疗机构的判断，都会影响可咨询的范围。

所以这里不会直接告诉您"可以"或"不可以"。

我们会先帮您整理关注的方向，例如关节恢复、组织修复、抗衰老咨询，还是整体恢复管理。

您也可以告诉我们年龄、主要关注点、既往病史，以及计划来韩国的时间。

之后，我们会区分出韩国目前可以咨询的范围，和需要专业医生进一步判断的部分。

最终是否适合，必须由正规医疗机构和专业医生根据检查与面诊判断。`,
    scriptFullEn: `Hello, this is the consultation entry point for stem cell and regenerative medicine topics.

Stem cells and regenerative medicine attract a lot of interest, but they're also widely misunderstood.

Not all stem-cell-related procedures can be freely performed in Korea.

The available scope of consultation depends on the medical indication, condition type, legal regulations, and the judgment of the medical institution.

So we won't tell you here whether something is "possible" or "not possible."

We'll first help you clarify your area of interest — for example, joint recovery, tissue repair, anti-aging consultation, or overall recovery management.

Please also share your age, main concerns, medical history, and planned visit dates to Korea.

We'll then distinguish between what can currently be consulted on in Korea and what requires further evaluation by a specialist.

Final suitability must be determined by a licensed medical institution and physician through examination and consultation.`,
    scriptSummaryZh: `干细胞相关咨询适合关注再生医学、关节恢复、组织修复或抗衰老管理的人群。本页面仅提供咨询整理与对接服务，具体适应症和治疗方案需由韩国正规医疗机构判断。`,
    scriptSummaryEn: `Stem cell consultation suits those interested in regenerative medicine, joint recovery, tissue repair, or anti-aging management. This page only organizes inquiries and connects you onward — specific indications and treatment plans are determined by licensed medical institutions in Korea.`,
  },
  {
    id: 'womens-care',
    zh: '女性护理中心',
    en: "Women's Care Center",
    emoji: '🪷',
    heroImage: '/category-hero/woman-care.jpg',
    heroVideo: '/category-hero/woman-care.mp4',
    tagZh: '妇科检查 · 激素更年期 · 私密护理',
    tagEn: 'Gynecology Checkup · Hormones/Menopause · Private Care',
    scriptFullZh: `您好，欢迎进入女性护理中心。

女性健康方面的困扰，常常很难公开说出口。

生理变化、激素、更年期、妇科检查、私密护理、产后恢复，都可能包含在这里。

不同年龄阶段，需要关注的方向也不一样。

20到30岁、产后阶段、40岁以后、更年期前后，每个阶段的困扰都不相同。

您可以先选择自己关注的方向，例如妇科检查、激素与更年期、私密护理，还是产后恢复。

汉江春天会用安静、私密的方式帮助您整理需求。

这里不会提供诊断，也不会替代医生判断。

后续会根据您的需求，对接女性专科医疗机构进行进一步咨询。`,
    scriptFullEn: `Hello, welcome to the Women's Care Center.

Concerns about women's health are often difficult to discuss openly.

This can include menstrual changes, hormones, menopause, gynecological checkups, private care, and postpartum recovery.

The consultation needed differs by life stage.

Concerns in your 20s–30s, after childbirth, after 40, or around menopause are all different.

Please first select the direction you're most interested in — for example, gynecological checkup, hormones and menopause, private care, or postpartum recovery.

K-Medi Spring organizes this information in a quiet, private way.

We do not provide a diagnosis here and do not replace a physician's judgment.

We'll then connect you with a specialized women's medical institution.`,
    scriptSummaryZh: `女性护理中心适合关注妇科检查、女性健康、私密护理、产后恢复、更年期管理等需求的人群。汉江春天提供私密、清晰的咨询整理与韩国医疗对接服务。`,
    scriptSummaryEn: `The Women's Care Center suits those interested in gynecological checkups, women's health, private care, postpartum recovery, or menopause management. K-Medi Spring organizes your consultation privately and clearly, then connects you to Korean medical institutions.`,
  },
  {
    id: 'mens-health',
    zh: '男性健康中心',
    en: "Men's Health Center",
    emoji: '💪',
    heroImage: '/category-hero/mens-health.jpg',
    heroVideo: '/category-hero/mens-health.mp4',
    tagZh: '精力体力 · 脱发 · 前列腺代谢',
    tagEn: 'Energy/Vitality · Hair Loss · Prostate/Metabolism',
    scriptFullZh: `您好，这里是男性健康中心咨询区。

男性健康不只是某一个单独的症状。

体力、活力、睡眠、代谢、脱发、前列腺、泌尿健康、男性功能，都可能互相关联。

很多男性客户对这些问题不太愿意直接开口。

所以我们会先通过简单的分类，帮您整理出真正想咨询的方向。

例如疲劳和体力下降、脱发、排尿问题、前列腺健康，还是体重和代谢变化。

汉江春天会帮助您用咨询卡的方式，把不方便直接说出口的内容整理清楚。

之后，我们会根据需要连接体检、泌尿科、脱发或功能医学相关的咨询方向。

诊断和治疗，仍需以医疗机构和专业医生的判断为准。`,
    scriptFullEn: `Hello, welcome to the Men's Health Center consultation area.

Men's health isn't about looking at a single symptom.

It can involve energy, vitality, sleep, metabolism, hair loss, the prostate, urinary health, and male sexual function together.

Many male clients find it hard to talk about uncomfortable symptoms directly.

So we'll first help sort out which matters most to you — fatigue and low energy, hair loss, urinary issues, prostate health, or weight and metabolic changes.

K-Medi Spring helps organize difficult-to-discuss topics into a consultation card.

We'll then connect you with checkup, urology, hair loss, or functional medicine consultation directions.

Diagnosis and treatment must follow the judgment of a medical institution and physician.`,
    scriptSummaryZh: `男性健康中心适合关注体力、睡眠、代谢、脱发、泌尿健康、前列腺与男性抗衰管理的人群。汉江春天可协助进行咨询整理与韩国医疗服务对接。`,
    scriptSummaryEn: `The Men's Health Center suits those interested in energy, sleep, metabolism, hair loss, urinary health, prostate, and male function management. K-Medi Spring organizes your consultation and connects you to Korean medical services.`,
  },
  {
    id: 'medical-tourism',
    zh: '汉江春天 医疗旅游精品',
    en: 'Premium Medical Tourism',
    emoji: '✈️',
    heroImage: '/category-hero/medical-tourism.png',
    tagZh: '预约翻译 · 车辆陪同 · 3晚4天行程',
    tagEn: 'Booking/Interpretation · Vehicle Escort · 3N4D Itinerary',
    scriptFullZh: `您好，欢迎了解汉江春天医疗旅游精品服务。

来韩国进行医疗咨询，并不只是预约一家医院就结束了。

预约、翻译、车辆接送、到院陪同、住宿安排、恢复期动线，都需要提前准备好。

对很多海外客户来说，比起医院本身，整个流程更让人不安。

汉江春天会先帮您整理目的、行程、人数、关注方向，以及是否需要翻译陪同。

之后，我们会协助安排预约、翻译、车辆、到院陪同与住宿沟通。

医疗判断由医院和专业医生负责，汉江春天负责把整个医疗旅行过程安排得安心、清楚。

3晚4天为参考行程，具体安排会根据咨询内容调整。`,
    scriptFullEn: `Hello, welcome to K-Medi Spring's Premium Medical Tourism service.

Receiving medical consultation in Korea doesn't end with booking a single hospital.

Appointments, interpretation, transportation, hospital escort, accommodation guidance, and recovery-period logistics all need to be prepared together.

For overseas clients, the entire process can feel more uncertain than the hospital visit itself.

We'll first organize your purpose of visit, schedule, number of companions, areas of interest, and interpretation needs.

We'll then help with appointments, interpretation, vehicles, hospital escort, and accommodation guidance.

Medical decisions are made by the hospital and physicians, while K-Medi Spring's role is to organize the medical travel process safely and clearly.

The 3-night, 4-day plan is a reference itinerary; the actual schedule may be adjusted based on your consultation.`,
    scriptSummaryZh: `医疗旅游精品服务适合计划来韩国进行医疗咨询、皮肤医美、整形、健康管理或抗衰服务的人群。汉江春天可协助预约、翻译、行程、车辆与到院沟通。`,
    scriptSummaryEn: `The Premium Medical Tourism service suits those planning medical consultation, skin aesthetics, plastic surgery, health management, or anti-aging services in Korea. K-Medi Spring helps with appointments, interpretation, itinerary, transportation, and hospital escort.`,
  },
  {
    id: 'custom-plan',
    zh: '定制医疗观光方案',
    en: 'Custom Medical Travel Plan',
    emoji: '🗺️',
    heroImage: '/category-hero/custom-plan.jpg',
    heroVideo: '/category-hero/custom-plan.mp4',
    tagZh: '多项目组合 · 预算行程 · 全程协调',
    tagEn: 'Multi-Service Plan · Budget/Itinerary · Full Coordination',
    scriptFullZh: `您好，这里是定制医疗观光方案入口。

如果您还不确定该选哪个项目，可以从这里开始。

有的客户想同时安排健康检查和皮肤管理。

有的客户想为父母安排体检，同时安排自己的皮肤咨询。

也有的客户想把整形咨询和恢复期的旅行安排放在一起考虑。

汉江春天会先帮您整理目的、年龄、同行人数、停留天数和预算方向。

之后，我们会把多个方向组合起来，设计韩国医疗观光的咨询路径。

最终的医疗判断和治疗可行性，仍以医疗机构和专业医生的判断为准。`,
    scriptFullEn: `Hello, welcome to the Custom Medical Travel Plan.

If you're not yet sure which category to choose, you can start here.

Some clients want a health checkup and skin care combined.

Some plan a checkup for their parents alongside their own skin care.

Others need to consider plastic surgery consultation together with a recovery-period travel schedule.

We'll first organize your purpose, age, companions, length of stay, budget direction, and recovery period.

We'll then combine multiple areas to design your Korean medical tourism consultation direction.

Final medical decisions and treatment feasibility remain with medical institutions and physicians.`,
    scriptSummaryZh: `如果您还不确定选择哪个项目，可以先提交定制需求。汉江春天会根据您的目的、时间、预算与停留计划，为您整理韩国医疗观光咨询方向。`,
    scriptSummaryEn: `If you're not sure which category to choose, you can start with a custom plan. K-Medi Spring organizes your Korean medical tourism consultation direction based on your purpose, schedule, budget, and stay plan.`,
  },
]

export const getCategoryById = (id: string) =>
  categories.find(c => c.id === id) ?? null
