export interface ConcernContext {
  id: string
  zh: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
  en: { title: string; desc: string; recommended: string; catName?: string; catTag?: string }
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
    en: {
      title: 'I am worried about hospitals, interpretation, and my Korea itinerary',
      catName: 'Korea Medical Travel Support',
      catTag: 'Appointment · Interpreter · Transport · Itinerary · Escort',
      desc: `When preparing to come to Korea for medical consultation, many people's real concern isn't just the hospital itself — it's whether the entire process will go smoothly.

Not knowing which type of institution to choose, how to make an appointment, whether Chinese communication is available, where to stay after treatment, and how to plan the schedule all create anxiety.

Before your medical consultation, we help you clarify the purpose of your visit, length of stay, translation support needed, transportation arrangements, escort requirements, and movement during recovery.

We don't simply recommend a hospital — we help you sort out consultation, booking, transport, interpretation, and accommodation before you arrive in Korea.

Medical decisions are made by the hospital and physicians, while K-Medi Spring's role is to help coordinate the itinerary, communication, and escort arrangements.`,
      recommended: 'Safe Korea Visit · Appointment Coordination · Interpreter',
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
  },
]

export function getConcernById(id: string): ConcernContext | null {
  return concernsData.find(c => c.id === id) ?? null
}
