import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'
const WHATSAPP_URL = 'https://wa.me/821077671903'

/* ─── i18n data ────────────────────────────────────────────── */

interface Q { label: string; q: string; opts: string[] }

const QUESTIONS_ZH: Q[] = [
  { label: '最想改善', q: '您最想改善的第一感觉是什么？', opts: ['看起来没精神', '脸看起来松了', '皮肤变粗糙了', '脸型不够清晰', '拍照不上镜', '想自然变年轻一点'] },
  { label: '最在意部位', q: '您最在意的部位是哪里？', opts: ['下颌线/双下巴', '法令纹/嘴角下垂', '眼周/眼袋/黑眼圈', '毛孔/痘印/痘疤', '色斑/暗沉/肤色不均', '脸部凹陷/苹果肌流失', '整体轮廓/侧脸线条'] },
  { label: '期望效果', q: '您希望效果是什么感觉？', opts: ['自然一点，不想被看出来', '明显变年轻，但不要夸张', '拍照更好看', '脸更紧致、更小一点', '皮肤更干净、更亮', '疲惫感少一点'] },
  { label: '可接受恢复期', q: '您能接受的恢复期是？', opts: ['几乎不想有恢复期', '1-3天可以接受', '4-7天可以接受', '可以接受较长恢复期，但想效果更明显', '还不确定，想先咨询'] },
  { label: '最担心', q: '您最担心什么？', opts: ['怕不自然', '怕疼', '怕恢复期影响工作', '怕价格太高', '怕选错项目', '怕沟通不清楚', '怕去了韩国不知道怎么安排'] },
  { label: '计划来韩', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '还没确定', '先了解方案'] },
  { label: '希望先做', q: '您希望我们先帮您做什么？', opts: ['先判断我适合哪个方向', '先整理大致预算', '先告诉我恢复期和行程安排', '先推荐适合的韩国咨询方向', '先帮我安排顾问沟通'] },
]

const QUESTIONS_KO: Q[] = [
  { label: '가장 개선하고 싶은 것', q: '가장 먼저 개선하고 싶은 것은?', opts: ['지쳐 보인다', '얼굴이 처져 보인다', '피부가 거칠어졌다', '얼굴 라인이 흐릿하다', '사진이 잘 안 나온다', '자연스럽게 젊어지고 싶다'] },
  { label: '가장 신경 쓰이는 부위', q: '가장 신경 쓰이는 부위는?', opts: ['턱선/이중턱', '팔자주름/입꼬리 처짐', '눈 주위/눈 밑/다크서클', '모공/트러블 자국', '색소/칙칙함/피부톤 불균형', '얼굴 함몰/볼 볼륨 감소', '전체 윤곽/옆 라인'] },
  { label: '원하는 효과', q: '어떤 효과를 원하시나요?', opts: ['자연스럽게, 티 안 나게', '확실히 젊어 보이게, 과하지 않게', '사진이 더 잘 나오게', '얼굴이 더 탄탄하고 작아 보이게', '피부가 더 깨끗하고 환하게', '피곤해 보이는 인상 개선'] },
  { label: '감수할 수 있는 회복 기간', q: '감수할 수 있는 회복 기간은?', opts: ['거의 없으면 좋겠다', '1-3일은 괜찮다', '4-7일은 괜찮다', '긴 회복기도 괜찮다, 효과가 크다면', '아직 모르겠다, 먼저 상담하고 싶다'] },
  { label: '가장 걱정되는 것', q: '가장 걱정되는 것은?', opts: ['부자연스러울까 봐', '아플까 봐', '회복 기간이 일정에 영향을 줄까 봐', '가격이 너무 비쌀까 봐', '잘못된 항목을 선택할까 봐', '소통이 잘 안 될까 봐', '한국에서 일정을 어떻게 해야 할지 몰라서'] },
  { label: '방한 계획', q: '언제 한국에 방문할 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '아직 미정', '먼저 방향 파악 후 결정'] },
  { label: '먼저 원하는 도움', q: '어떤 도움을 먼저 원하시나요?', opts: ['내게 맞는 방향 파악', '대략적인 예산 정리', '회복 기간 및 일정 안내', '적합한 한국 상담 방향 추천', '컨시어지 연결'] },
]

const QUESTIONS_EN: Q[] = [
  { label: 'Main concern', q: 'What is the first thing you most want to improve?', opts: ['I look tired', 'My face looks saggy', 'My skin has gotten rough', 'My facial contours are unclear', "I don't photograph well", 'I want to look naturally younger'] },
  { label: 'Target area', q: 'Which area concerns you most?', opts: ['Jawline / double chin', 'Nasolabial folds / drooping corners', 'Eye area / under-eye bags / dark circles', 'Pores / acne marks / scars', 'Pigmentation / dullness / uneven tone', 'Facial hollowing / volume loss', 'Overall contour / side profile'] },
  { label: 'Desired result', q: 'What kind of result are you hoping for?', opts: ['Subtle — no one can tell', 'Noticeably younger, but not overdone', 'Look better in photos', 'Firmer and smaller-looking face', 'Cleaner and brighter skin', 'Less tired-looking'] },
  { label: 'Downtime tolerance', q: 'How much downtime can you accept?', opts: ['Minimal — almost none', '1–3 days is fine', '4–7 days is fine', 'Longer is OK if results are stronger', "Not sure yet — I'd like to consult first"] },
  { label: 'Biggest worry', q: 'What are you most worried about?', opts: ['Looking unnatural', 'Pain', 'Downtime affecting my schedule', 'Cost being too high', 'Choosing the wrong treatment', 'Communication barriers', "Not knowing how to plan my Korea trip"] },
  { label: 'Visit timing', q: 'When are you thinking of visiting Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Not decided yet', 'Just exploring options for now'] },
  { label: 'First step', q: 'What would you like us to help with first?', opts: ['Find the right direction for me', 'Give me a rough budget estimate', 'Explain downtime & itinerary', 'Recommend Korean consultation options', 'Connect me with a concierge'] },
]

const QUESTIONS_AR: Q[] = [
  { label: 'أهم ما تريد تحسينه', q: 'ما أول شيء تريد تحسينه في مظهرك؟', opts: ['أبدو متعباً', 'وجهي يبدو مترهلاً', 'بشرتي أصبحت خشنة', 'ملامح وجهي غير واضحة', 'لا أبدو جيداً في الصور', 'أريد أن أبدو أصغر سناً بشكل طبيعي'] },
  { label: 'المنطقة المستهدفة', q: 'أي منطقة تقلقك أكثر؟', opts: ['خط الفك / الذقن المزدوجة', 'تجاعيد الوجه / ترهل زوايا الفم', 'منطقة العين / الانتفاخ / الهالات', 'المسام / آثار حب الشباب', 'التصبغات / الإرهاق / عدم انتظام لون البشرة', 'تجويف الوجه / فقدان الحجم', 'الملامح العامة / الخط الجانبي'] },
  { label: 'النتيجة المطلوبة', q: 'ما نوع النتيجة التي تأملها؟', opts: ['تغيير خفي — لا يلاحظه أحد', 'أبدو أصغر بوضوح لكن بشكل طبيعي', 'أبدو أفضل في الصور', 'وجه أكثر إحكاماً وأصغر مظهراً', 'بشرة أنظف وأكثر إشراقاً', 'مظهر أقل إرهاقاً'] },
  { label: 'تحمل فترة التعافي', q: 'كم من الوقت يمكنك تخصيصه للتعافي؟', opts: ['الحد الأدنى — لا أريد أي فترة تعافي تقريباً', '1-3 أيام مقبول', '4-7 أيام مقبول', 'فترة أطول مقبولة إذا كانت النتائج أفضل', 'لست متأكداً بعد — أريد الاستشارة أولاً'] },
  { label: 'أكبر قلق', q: 'ما الذي يقلقك أكثر؟', opts: ['الظهور بمظهر غير طبيعي', 'الألم', 'تأثير فترة التعافي على جدولي', 'ارتفاع التكلفة', 'اختيار العلاج الخاطئ', 'حاجز اللغة', 'عدم معرفة كيفية التخطيط لرحلة كوريا'] },
  { label: 'موعد الزيارة', q: 'متى تفكر في زيارة كوريا؟', opts: ['خلال شهر', 'خلال 3 أشهر', 'خلال 6 أشهر', 'لم أقرر بعد', 'أستكشف الخيارات الآن فقط'] },
  { label: 'أول خطوة', q: 'بماذا تريدنا أن نساعدك أولاً؟', opts: ['تحديد الاتجاه المناسب لي', 'تقديم تقدير تقريبي للميزانية', 'شرح فترة التعافي والجدول الزمني', 'التوصية بخيارات استشارة كورية', 'التواصل مع كونسيرج'] },
]

const COPY_LABELS: Record<string, string[]> = {
  zh: ['我最想改善的第一感觉', '我最在意的部位', '我希望的效果', '我能接受的恢复期', '我最担心的问题', '计划来韩国时间', '希望先获得的帮助'],
  ko: ['가장 개선하고 싶은 것', '가장 신경 쓰이는 부위', '원하는 효과', '감수할 수 있는 회복 기간', '가장 걱정되는 것', '방한 계획', '먼저 원하는 도움'],
  en: ['Main concern', 'Target area', 'Desired result', 'Downtime tolerance', 'Biggest worry', 'Visit timing', 'First step'],
  ar: ['أهم ما أريد تحسينه', 'المنطقة المستهدفة', 'النتيجة المطلوبة', 'تحمل فترة التعافي', 'أكبر قلق', 'موعد الزيارة', 'أول خطوة'],
}

const RESPONSES: Record<string, Record<string, string>> = {
  zh: {
    A: `您好，已为您生成初步咨询方向。\n\n您比较关注自然变美、皮肤状态改善和费用控制。\n建议先从肤质管理、轻抗衰、皮肤亮泽度改善方向进行咨询。\n\n我们可以先帮您梳理：\n1. 适合您的皮肤管理方向\n2. 大致恢复期\n3. 来韩停留时间安排\n4. 合理预算范围\n\n请点击下方按钮，通过企业微信联系顾问。`,
    B: `您好，您的变美咨询卡已生成。\n\n您主要关注脸部轮廓、下颌线、法令纹和整体年轻感。\n建议先进行轮廓提升与抗衰方向的初步咨询。\n\n请通过企业微信发送您的咨询卡，顾问会帮您进一步梳理方向。`,
    C: `您好，已根据您的选择整理初步方向。\n\n您比较在意眼周疲惫感、黑眼圈、眼袋或整体没精神的问题。\n如果恢复期有限，建议先从非手术类改善、皮肤状态管理和眼周咨询方向开始了解。\n\n请点击下方按钮，通过企业微信联系顾问。`,
    D: `您好，您的变美咨询卡已生成。\n\n根据您的选择，我们会先帮您梳理您最在意的外貌变化、可接受的恢复期、来韩时间与预算，以及适合进一步咨询的韩国医疗方向。\n\n请点击下方按钮，通过企业微信联系顾问。`,
  },
  ko: {
    A: `안녕하세요, 초기 상담 방향이 정리되었습니다.\n\n자연스러운 피부 개선과 비용 효율을 중시하시는 분께는 피부 관리, 가벼운 항노화, 피부 밝기 개선 방향을 먼저 추천드립니다.\n\n다음을 먼저 정리해 드리겠습니다:\n1. 적합한 피부 관리 방향\n2. 대략적인 회복 기간\n3. 한국 체류 일정\n4. 합리적인 예산 범위\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    B: `안녕하세요, 상담 카드가 생성되었습니다.\n\n얼굴 윤곽, 턱선, 팔자주름, 전반적인 젊어 보이는 인상에 관심 있으신 분께는 윤곽 리프팅 및 항노화 방향의 초기 상담을 추천드립니다.\n\n컨시어지에게 연락하여 방향을 구체화해 드리겠습니다.`,
    C: `안녕하세요, 선택에 따라 초기 방향이 정리되었습니다.\n\n눈 주위 피로감, 다크서클, 눈 밑 개선에 관심 있으시고 회복 기간이 제한적이라면 비수술 개선, 피부 관리, 눈 주위 상담 방향부터 알아보시길 권장합니다.\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    D: `안녕하세요, 상담 카드가 생성되었습니다.\n\n선택 내용을 바탕으로 가장 원하시는 변화, 감수할 수 있는 회복 기간, 방한 시기와 예산, 적합한 한국 의료 상담 방향을 정리해 드리겠습니다.\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
  },
  en: {
    A: `Hello, your consultation profile has been generated.\n\nYou value natural improvement, skin condition, and cost efficiency. We recommend starting with skin management, light anti-aging, and brightening consultations.\n\nWe'll help you clarify:\n1. The right skin care direction for you\n2. Approximate downtime\n3. Korea stay planning\n4. Reasonable budget range\n\nClick below to connect with a concierge.`,
    B: `Hello, your consultation profile is ready.\n\nYou're focused on facial contour, jawline, nasolabial folds, and overall youthfulness. We recommend starting with a facial lifting and anti-aging consultation.\n\nContact a concierge to refine your direction.`,
    C: `Hello, your profile has been organized.\n\nYou're concerned about tired-looking eyes, dark circles, and under-eye issues. With limited downtime, we suggest starting with non-surgical improvement and eye area consultation.\n\nClick below to connect with a concierge.`,
    D: `Hello, your consultation profile is ready.\n\nBased on your answers, we'll help clarify your main aesthetic goals, acceptable downtime, Korea visit timing, budget, and the best Korean medical consultation direction for you.\n\nClick below to connect with a concierge.`,
  },
  ar: {
    A: `مرحباً، تم إنشاء ملف استشارتك الأولي.\n\nأنت تهتم بالتحسين الطبيعي وحالة البشرة وفعالية التكلفة. نوصي بالبدء باستشارات العناية بالبشرة ومكافحة الشيخوخة الخفيفة وتحسين الإشراق.\n\nسنساعدك في توضيح:\n1. اتجاه العناية بالبشرة المناسب لك\n2. فترة التعافي التقريبية\n3. تخطيط الإقامة في كوريا\n4. نطاق الميزانية المعقول\n\nانقر أدناه للتواصل مع كونسيرج.`,
    B: `مرحباً، ملف استشارتك جاهز.\n\nأنت تركز على ملامح الوجه وخط الفك والتجاعيد والشباب العام. نوصي بالبدء باستشارة رفع الوجه ومكافحة الشيخوخة.\n\nتواصل مع كونسيرج لتحديد اتجاهك.`,
    C: `مرحباً، تم تنظيم ملفك.\n\nأنت قلق من مظهر العيون المتعبة والهالات والانتفاخ. مع محدودية وقت التعافي، نقترح البدء بالتحسين غير الجراحي واستشارة منطقة العين.\n\nانقر أدناه للتواصل مع كونسيرج.`,
    D: `مرحباً، ملف استشارتك جاهز.\n\nبناءً على إجاباتك، سنساعدك في توضيح أهدافك الجمالية الرئيسية وفترة التعافي المقبولة وتوقيت زيارة كوريا والميزانية وأفضل اتجاه استشارة طبية كورية لك.\n\nانقر أدناه للتواصل مع كونسيرج.`,
  },
}

const UI: Record<string, {
  title: string; cardGenerated: string; copyBtn: string; copied: string;
  contactBtn: string; restart: string; back: string; step: string
}> = {
  zh: { title: '生成我的变美咨询卡', cardGenerated: '变美咨询卡已生成', copyBtn: '复制咨询内容', copied: '已复制', contactBtn: '打开企业微信咨询', restart: '重新填写', back: '← 上一步', step: 'Q' },
  ko: { title: '나의 상담 카드 만들기', cardGenerated: '상담 카드가 생성되었습니다', copyBtn: '상담 내용 복사', copied: '복사됨', contactBtn: '지금 컨시어지에게 연락', restart: '다시 작성', back: '← 이전', step: 'Q' },
  en: { title: 'Build My Consultation Profile', cardGenerated: 'Your Consultation Profile Is Ready', copyBtn: 'Copy Consultation Summary', copied: 'Copied!', contactBtn: 'Connect with a Concierge', restart: 'Start Over', back: '← Back', step: 'Q' },
  ar: { title: 'أنشئ ملف استشارتي', cardGenerated: 'ملف استشارتك جاهز', copyBtn: 'نسخ ملخص الاستشارة', copied: 'تم النسخ', contactBtn: 'تواصل مع كونسيرج', restart: 'ابدأ من جديد', back: 'السابق ←', step: 'س' },
}

/* ─── classify ─────────────────────────────────────────────── */

function classify(answers: string[], lang: string): 'A' | 'B' | 'C' | 'D' {
  const [q1, q2, q3, , q5] = answers
  const zh = lang === 'zh'
  const ko = lang === 'ko'
  const en = lang === 'en'
  const ar = lang === 'ar'

  const isA = zh
    ? (q1 === '皮肤变粗糙了' || q2 === '毛孔/痘印/痘疤' || q2 === '色斑/暗沉/肤色不均') && q3 === '自然一点，不想被看出来' && q5 === '怕价格太高'
    : ko
    ? (q1 === '피부가 거칠어졌다' || q2 === '모공/트러블 자국' || q2 === '색소/칙칙함/피부톤 불균형') && q3 === '자연스럽게, 티 안 나게'
    : en
    ? (q1 === 'My skin has gotten rough' || q2 === 'Pores / acne marks / scars') && q3 === 'Subtle — no one can tell'
    : ar
    ? (q1 === 'بشرتي أصبحت خشنة' || q2 === 'المسام / آثار حب الشباب') && q3 === 'تغيير خفي — لا يلاحظه أحد'
    : false

  const isB = zh
    ? (q1 === '脸看起来松了' || q1 === '想自然变年轻一点' || q2 === '下颌线/双下巴') && (q3 === '明显变年轻，但不要夸张' || q3 === '脸更紧致、更小一点')
    : ko
    ? (q1 === '얼굴이 처져 보인다' || q2 === '턱선/이중턱') && (q3 === '확실히 젊어 보이게, 과하지 않게' || q3 === '얼굴이 더 탄탄하고 작아 보이게')
    : en
    ? (q1 === 'My face looks saggy' || q2 === 'Jawline / double chin') && (q3 === 'Noticeably younger, but not overdone' || q3 === 'Firmer and smaller-looking face')
    : ar
    ? (q1 === 'وجهي يبدو مترهلاً' || q2 === 'خط الفك / الذقن المزدوجة') && (q3 === 'أبدو أصغر بوضوح لكن بشكل طبيعي' || q3 === 'وجه أكثر إحكاماً وأصغر مظهراً')
    : false

  const isC = zh
    ? (q1 === '看起来没精神' || q2 === '眼周/眼袋/黑眼圈') && q3 === '疲惫感少一点'
    : ko
    ? (q1 === '지쳐 보인다' || q2 === '눈 주위/눈 밑/다크서클') && q3 === '피곤해 보이는 인상 개선'
    : en
    ? (q1 === 'I look tired' || q2 === 'Eye area / under-eye bags / dark circles') && q3 === 'Less tired-looking'
    : ar
    ? (q1 === 'أبدو متعباً' || q2 === 'منطقة العين / الانتفاخ / الهالات') && q3 === 'مظهر أقل إرهاقاً'
    : false

  if (isA) return 'A'
  if (isB) return 'B'
  if (isC) return 'C'
  return 'D'
}

/* ─── styles ───────────────────────────────────────────────── */
const brand = 'var(--brand, #0077b6)'
const brandDark = 'var(--brand-dark, #003d6b)'
const textColor = 'var(--text, #1a2940)'
const mutedColor = '#7a9ab5'

const S = {
  wrap: { background: 'linear-gradient(180deg, #f0f6ff 0%, #ffffff 100%)', padding: '28px 20px 40px', borderTop: '3px solid var(--brand, #0077b6)' } as React.CSSProperties,
  title: { fontSize: 15, fontWeight: 700, color: brandDark, marginBottom: 20, letterSpacing: '0.01em' } as React.CSSProperties,
  progressTrack: { height: 3, background: 'rgba(0,119,182,0.12)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' } as React.CSSProperties,
  stepLabel: { fontSize: 11, color: mutedColor, letterSpacing: '0.1em', marginBottom: 10 } as React.CSSProperties,
  questionText: { fontSize: 15, fontWeight: 700, color: brandDark, lineHeight: 1.5, marginBottom: 18 } as React.CSSProperties,
  chipsWrap: { display: 'flex', flexWrap: 'wrap' as const, gap: 9, marginBottom: 22 },
  chip: (selected: boolean): React.CSSProperties => ({
    padding: '9px 15px', borderRadius: 20,
    border: `1px solid ${selected ? brand : 'rgba(0,119,182,0.22)'}`,
    background: selected ? brand : 'white', color: selected ? 'white' : textColor,
    fontSize: 13, cursor: 'pointer', transition: 'all 0.16s ease',
    fontFamily: 'inherit', lineHeight: 1.4,
    boxShadow: selected ? '0 2px 10px rgba(0,119,182,0.28)' : '0 1px 4px rgba(0,0,0,0.06)',
  }),
  backBtn: { background: 'none', border: 'none', color: mutedColor, fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' } as React.CSSProperties,
  resultBox: { background: 'white', border: '1px solid rgba(0,119,182,0.14)', borderLeft: `3px solid ${brand}`, borderRadius: 12, padding: '18px 16px', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' } as React.CSSProperties,
  resultText: { fontSize: 13, color: textColor, lineHeight: 1.9, whiteSpace: 'pre-line' as const },
  tagsWrap: { display: 'flex', flexWrap: 'wrap' as const, gap: 7, marginBottom: 22 },
  tag: { fontSize: 11, color: brand, background: 'rgba(0,119,182,0.07)', border: '1px solid rgba(0,119,182,0.16)', borderRadius: 12, padding: '5px 11px', lineHeight: 1.3 } as React.CSSProperties,
  btnPrimary: { width: '100%', padding: '14px 0', borderRadius: 12, background: brand, border: 'none', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10, letterSpacing: '0.02em', boxShadow: '0 4px 18px rgba(0,119,182,0.28)' } as React.CSSProperties,
  btnOutline: (copied: boolean): React.CSSProperties => ({
    width: '100%', padding: '13px 0', borderRadius: 12,
    background: copied ? 'rgba(0,160,90,0.07)' : 'white',
    border: `1px solid ${copied ? 'rgba(0,160,90,0.35)' : 'rgba(0,119,182,0.28)'}`,
    color: copied ? '#009060' : brand, fontSize: 13, cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  }),
}

/* ─── component ────────────────────────────────────────────── */
export default function ConsultationCard() {
  const { lang } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const questions = lang === 'ko' ? QUESTIONS_KO : lang === 'en' ? QUESTIONS_EN : lang === 'ar' ? QUESTIONS_AR : QUESTIONS_ZH
  const ui = UI[lang] ?? UI['zh']
  const isAr = lang === 'ar'
  const contactUrl = isAr ? WHATSAPP_URL : WECHAT_BIZ_URL

  const select = (opt: string) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
    setTimeout(() => {
      if (step < 6) setStep(step + 1)
      else setSubmitted(true)
    }, 140)
  }

  const restart = () => { setStep(0); setAnswers(Array(7).fill('')); setSubmitted(false); setCopied(false) }

  const type = submitted ? classify(answers, lang) : 'D'
  const labels = COPY_LABELS[lang] ?? COPY_LABELS['zh']

  const copyText = [
    isAr ? 'مرحباً، أريد الاستفسار عن خدمات الجمال الطبي الكورية.' : lang === 'ko' ? '안녕하세요, 한국 의료미용 관련 상담을 원합니다.' : lang === 'en' ? 'Hello, I would like to inquire about Korean aesthetic medical services.' : '您好，我想咨询韩国变美/医美相关服务。',
    '',
    ...labels.map((label, i) => `${label}: ${answers[i]}`),
    '',
    isAr ? 'أرجو مساعدتي في تحديد اتجاه الاستشارة الطبية الكورية المناسب.' : lang === 'ko' ? '적합한 한국 의료 상담 방향을 정리해 주세요.' : lang === 'en' ? 'Please help me find the right Korean medical consultation direction.' : '请帮我梳理适合的韩国医疗咨询方向。',
  ].join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const progress = submitted ? 1 : step / 7

  return (
    <div style={S.wrap}>
      <p style={S.title}>{ui.title}</p>

      <div style={S.progressTrack}>
        <motion.div
          style={{ height: '100%', background: brand, borderRadius: 2 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: isAr ? -18 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? 18 : -18 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p style={S.stepLabel}>{ui.step}{step + 1} / 7</p>
            <p style={S.questionText}>{questions[step].q}</p>
            <div style={S.chipsWrap}>
              {questions[step].opts.map(opt => (
                <button key={opt} style={S.chip(answers[step] === opt)} onClick={() => select(opt)}>
                  {opt}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button style={S.backBtn} onClick={() => setStep(step - 1)}>
                {ui.back}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p style={{ fontSize: 11, color: mutedColor, letterSpacing: '0.1em', marginBottom: 14 }}>
              {ui.cardGenerated}
            </p>

            <div style={S.resultBox}>
              <p style={S.resultText}>{(RESPONSES[lang] ?? RESPONSES['zh'])[type]}</p>
            </div>

            <div style={S.tagsWrap}>
              {questions.map((q, i) =>
                answers[i] ? (
                  <span key={i} style={S.tag}>{q.label}: {answers[i]}</span>
                ) : null
              )}
            </div>

            <button style={S.btnOutline(copied)} onClick={handleCopy}>
              {copied ? ui.copied : ui.copyBtn}
            </button>

            <div style={{ height: 10 }} />

            <button style={S.btnPrimary} onClick={() => window.open(contactUrl, '_blank')}>
              {ui.contactBtn}
            </button>

            <button
              style={{ ...S.backBtn, display: 'block', margin: '14px auto 0', textAlign: 'center' as const }}
              onClick={restart}
            >
              {ui.restart}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
