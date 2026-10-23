export type CategoryId =
  | 'big-health'
  | 'stem-cell'
  | 'skin-beauty'
  | 'plastic-surgery'
  | 'womens-care'
  | 'mens-health'

export interface Category {
  id: CategoryId
  zh: string
  en: string
  /** 홈 화면 카테고리 그리드 카드용 짧은 이름 — 없으면 zh/en을 그대로 씀.
      상세페이지 히어로 제목(zh/en)은 더 길어도 되는 카테고리에 사용. */
  gridNameZh?: string
  gridNameEn?: string
  emoji: string
  /** 카테고리 히어로 영역에 표시할 실사 이미지 경로 (public/ 기준). 없으면 기존 그라디언트만 표시. */
  heroImage?: string
  /** heroImage 대신 배경 전체를 커버하는 영상으로 대체. 설정 시 heroImage는 poster로만 사용. */
  heroVideo?: string
  /** kmedispring.com 메인 카드용 작은 영상(없으면 카드는 heroImage 사진). */
  cardVideo?: string
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
    // 원본 skin-beauty.mp4(9MB, '전→후')를 '후' 장면(5.5초)부터 시작하게 이어 붙여 압축한 웹용 —
    // web 1280px 0.6MB / card 640px 0.14MB. 포스터는 그 첫 프레임. 원본은 보관용으로 그대로 둔다.
    heroImage: '/category-hero/skin-beauty-after.jpg',
    heroVideo: '/category-hero/skin-beauty-web.mp4',
    cardVideo: '/category-hero/skin-beauty-card.mp4',
    tagZh: '提升紧致 · 毛孔色斑 · 抗衰',
    tagEn: 'Skin Lifting · Pores & Pigmentation · Anti-Aging Appearance',
    scriptFullZh: `同样是"想变年轻"，每个人的原因并不一样。有的人是皮肤松了、轮廓下垂，有的人是毛孔、色斑、痘印让肤色显得暗沉。所以我们不会一上来就推荐某个项目。

先告诉我们您最在意的是哪里：松弛下垂、毛孔、色斑、痘印、泛红，还是整体肤质。再说说您打算在韩国待几天、能接受多长的恢复期、大概的预算，以及需不需要翻译陪同。

我们会把这些整理好，再帮您安排合适的皮肤科咨询。具体做什么、怎么做，要由医生看过您的皮肤状态后决定。`,
    scriptFullEn: `Hello, welcome to the Skin & Aesthetics consultation area.

Skin & Aesthetics isn't about choosing a procedure name first.

It's a consultation that looks at sagging, firmness, pores, pigmentation, dull texture, redness, acne scars, and recovery time together.

Even the same wish to "look younger" can come from different causes for different people.

Some need lifting, while others need texture or pigmentation care first.

Please tell us first whether your main concern is firmness, pores, pigmentation, or acne scars — or your overall skin texture and youthful impression.

If you're planning a visit to Korea, we'll also consider your stay duration, recovery time, budget, and whether you need an interpreter.

K-Medi Spring does not determine a specific procedure on this page.

The specific treatment method is decided after assessing your skin condition and consulting with the medical team.`,
    scriptSummaryZh: `皮肤松了、毛孔粗、有斑有痘印，或者就是想看起来年轻一点？先告诉我们您最在意哪里，我们帮您理清楚该咨询什么。`,
    scriptSummaryEn: `Skin & Aesthetics suits those interested in skin firmness, lifting, texture, pores, pigmentation, acne scars, or anti-aging care. K-Medi Spring organizes your skin concerns and connects you to skin and aesthetic consultations in Korea.`,
  },
  {
    id: 'plastic-surgery',
    zh: '整形医美',
    en: 'Plastic Surgery',
    emoji: '🌸',
    heroImage: '/category-hero/plastic-surgery.jpg',
    heroVideo: '/category-hero/plastic-surgery.mp4',
    tagZh: '眼鼻 · 脸型轮廓 · 恢复期',
    tagEn: 'Eyes/Nose/Contour · Facial Balance · Recovery Plan',
    scriptFullZh: `整形不是拿着一张照片照着做。同样的鼻子、同样的眼睛，放在不同的脸上，效果完全不一样。医生要先看您的脸型、骨骼、皮肤厚度，再结合您想要的感觉来判断。

所以您不用一开始就想好手术名称。先跟我们说说：想改善眼睛、鼻子、脸型，还是眼袋、下垂？想要自然一点的变化，还是明显一点？能接受多长的恢复期？最看重自然感、安全、医生经验，还是预算？

我们会把这些整理清楚，交给合作医院的医生评估。能不能做、用什么方法，都以医生面诊为准。`,
    scriptFullEn: `Hello, welcome to the Plastic Surgery consultation area.

Plastic surgery isn't about copying a single photo directly.

It requires looking at your facial structure, skin thickness, bone structure, the look you want, recovery time, and safety together.

Eyes, nose, facial contour, under-eye area, fat grafting, and sagging improvement can all be areas of interest.

You don't need to decide on a specific procedure name from the start.

What matters more first is confirming whether you want a natural change or a more noticeable one, and how short a recovery period you can accept.

Please also tell us whether you value naturalness, recovery time, safety, the medical team's experience, or budget the most.

We'll organize this into a consultation card and connect you with a specialized medical institution.

Whether surgery is possible and the specific method must be determined through an in-person consultation with a specialist.`,
    scriptSummaryZh: `想改眼睛、鼻子、脸型，或者改善眼袋和下垂？不用先想好手术名称，先说说您想要什么样的感觉、能接受多长的恢复期。`,
    scriptSummaryEn: `Plastic Surgery suits those interested in improving the eyes, nose, facial contour, sagging, under-eye area, or overall youthful impression. K-Medi Spring organizes your needs and connects you to specialized plastic surgery consultations.`,
  },
  {
    id: 'big-health',
    zh: '大健康',
    en: 'Anti-aging & Health Management',
    emoji: '🔬',
    heroImage: '/category-hero/dajiankang.jpg',
    heroVideo: '/category-hero/dajiankang.mp4',
    tagZh: '功能医学 · 慢性疲劳 · 代谢',
    tagEn: 'Functional Medicine · Chronic Fatigue · Metabolic Anti-Aging',
    scriptFullZh: `大健康不只是做一次体检。总觉得累、睡不好、体重变化大、代谢出问题，或者想知道自己将来容易得什么病，这些都可以从这里开始了解。

在韩国，这类咨询通常会安排到体检中心、功能医学诊所、内科或家庭医学科。方向不同，需要做的检查也不同。

您可以先告诉我们最困扰的问题、以前得过什么病、家里有没有相关病史、现在在吃什么药，以及打算在韩国待几天。我们帮您理清楚该去哪里、做哪些检查，并安排预约和中文沟通。诊断和检查项目，最终以医院和医生的判断为准。`,
    scriptFullEn: `Hello, and welcome to K-MediSpring.

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
    scriptSummaryZh: `总觉得累、睡不好、体重和代谢出了问题，或者想好好做一次全面检查？我们先帮您把情况理清楚，再安排韩国的检查和健康管理。`,
    scriptSummaryEn: `Anti-aging & Health Management is suited for those who want to systematically understand their body and improve fatigue, sleep, metabolism, and long-term health risks. K-Medi Spring helps organize your needs and connects you to related medical consultations and health management services in Korea.`,
  },
  {
    id: 'stem-cell',
    zh: '韩国干细胞与再生医学',
    en: 'Korean Stem Cell & Regenerative Medicine',
    gridNameZh: '干细胞治疗',
    gridNameEn: 'Stem Cell Therapy',
    emoji: '🧬',
    heroImage: '/category-hero/stemcell.jpg',
    tagZh: '皮肤年轻化 · 关节修复 · 细胞治疗',
    tagEn: 'From skin rejuvenation to joint repair and cell therapy',
    scriptFullZh: `干细胞和再生医学，很多人关心，也很容易被误解。在韩国，并不是所有干细胞相关项目都可以随便做——能不能做，要看具体病症、法律规定和医疗机构的判断。

所以这里不会直接告诉您"能做"或"不能做"。您可以先告诉我们关注的方向（关节、组织修复、抗衰老，还是整体恢复），再说说年龄、以前的病史和打算来韩国的时间。

我们会帮您分清楚：哪些是韩国目前可以正规咨询的，哪些需要医生进一步检查后才能判断。适不适合，最终要由正规医疗机构和医生面诊决定。`,
    scriptFullEn: `Hello, this is the consultation entry point for stem cell and regenerative medicine topics.

Stem cells and regenerative medicine attract a lot of interest, but they're also widely misunderstood.

Not all stem-cell-related procedures can be freely performed in Korea.

The available scope of consultation depends on the medical indication, condition type, legal regulations, and the judgment of the medical institution.

So we won't tell you here whether something is "possible" or "not possible."

We'll first help you clarify your area of interest — for example, joint recovery, tissue repair, anti-aging consultation, or overall recovery management.

Please also share your age, main concerns, medical history, and planned visit dates to Korea.

We'll then distinguish between what can currently be consulted on in Korea and what requires further evaluation by a specialist.

Final suitability must be determined by a licensed medical institution and physician through examination and consultation.`,
    scriptSummaryZh: `关心再生医学、关节恢复或抗衰？在韩国，什么能做、什么不能做，法律有明确规定。我们先帮您弄清楚能咨询的范围，适不适合由正规医疗机构判断。`,
    scriptSummaryEn: `Stem cell consultation suits those interested in regenerative medicine, joint recovery, tissue repair, or anti-aging management. This page only organizes inquiries and connects you onward — specific indications and treatment plans are determined by licensed medical institutions in Korea.`,
  },
  {
    id: 'womens-care',
    zh: '女性护理中心',
    en: "Women's Care Center",
    emoji: '🪷',
    heroImage: '/category-hero/woman-care.jpg',
    heroVideo: '/category-hero/woman-care.mp4',
    tagZh: '妇科检查 · 更年期 · 私密护理',
    tagEn: 'Gynecology Checkup · Hormones/Menopause · Private Care',
    scriptFullZh: `女性健康的很多困扰，都不太好意思跟别人说。月经和激素变化、更年期、妇科检查、私密护理、产后恢复，都可以放心在这里咨询。

不同年龄关心的事情也不一样：二三十岁、刚生完孩子、四十岁以后、更年期前后，各有各的烦恼。您可以先告诉我们最想了解的方向。

我们会注意保护您的隐私，帮您把需求整理好，再安排女性专科医院进一步咨询。这里不做诊断，具体以医生的判断为准。`,
    scriptFullEn: `Hello, welcome to the Women's Care Center.

Concerns about women's health are often difficult to discuss openly.

This can include menstrual changes, hormones, menopause, gynecological checkups, private care, and postpartum recovery.

The consultation needed differs by life stage.

Concerns in your 20s–30s, after childbirth, after 40, or around menopause are all different.

Please first select the direction you're most interested in — for example, gynecological checkup, hormones and menopause, private care, or postpartum recovery.

K-Medi Spring organizes this information in a quiet, private way.

We do not provide a diagnosis here and do not replace a physician's judgment.

We'll then connect you with a specialized women's medical institution.`,
    scriptSummaryZh: `妇科检查、私密护理、产后恢复、更年期调理……这些不太好开口的事，可以放心跟我们说，我们会注意保护您的隐私，帮您安排合适的咨询。`,
    scriptSummaryEn: `The Women's Care Center suits those interested in gynecological checkups, women's health, private care, postpartum recovery, or menopause management. K-Medi Spring organizes your consultation privately and clearly, then connects you to Korean medical institutions.`,
  },
  {
    id: 'mens-health',
    zh: '男性健康中心',
    en: "Men's Health Center",
    emoji: '💪',
    heroImage: '/category-hero/mens-health.jpg',
    heroVideo: '/category-hero/mens-health.mp4',
    tagZh: '精力 · 男性功能 · 前列腺 · 脱发',
    tagEn: 'Vitality · Immunity · Sexual Function · Prostate',
    scriptFullZh: `男性的健康问题，往往不是一个单独的症状。精力、睡眠、代谢、脱发、前列腺、排尿、男性功能，常常是互相有关系的。

很多男性客户不太愿意直接开口，这很正常。您可以先告诉我们大概的方向：是容易累、体力下降，还是掉头发、排尿不顺、前列腺的问题，或者体重和代谢的变化。

我们帮您把不方便说的部分整理清楚，再根据需要安排体检、泌尿科、脱发或功能医学方面的咨询。诊断和治疗以医生的判断为准。`,
    scriptFullEn: `Hello, welcome to the Men's Health Center consultation area.

Men's health isn't about looking at a single symptom.

It can involve energy, vitality, sleep, metabolism, hair loss, the prostate, urinary health, and male sexual function together.

Many male clients find it hard to talk about uncomfortable symptoms directly.

So we'll first help sort out which matters most to you — fatigue and low energy, hair loss, urinary issues, prostate health, or weight and metabolic changes.

K-Medi Spring helps organize difficult-to-discuss topics into a consultation card.

We'll then connect you with checkup, urology, hair loss, or functional medicine consultation directions.

Diagnosis and treatment must follow the judgment of a medical institution and physician.`,
    scriptSummaryZh: `精力不如从前、睡眠差、代谢出问题、掉头发，或者前列腺和男性功能方面有顾虑，都可以先跟我们聊聊，我们帮您安排对应的咨询。`,
    scriptSummaryEn: `The Men's Health Center suits those interested in energy, sleep, metabolism, hair loss, urinary health, prostate, and male function management. K-Medi Spring organizes your consultation and connects you to Korean medical services.`,
  },
]

export const getCategoryById = (id: string) =>
  categories.find(c => c.id === id) ?? null
