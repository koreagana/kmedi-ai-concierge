import { WECHAT_BIZ_URL, WHATSAPP_URL } from '../data/contacts'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { CATEGORY_CARDS, CONCERN_CARDS } from '../data/categoryConsultation'
import type { CategoryId } from '../data/categories'
import TtsButton from './TtsButton'


/* ─── i18n data (category-context card) ───────────────────────── */

interface Q { label: string; q: string; opts: string[] }

const QUESTIONS_ZH: Q[] = [
  { label: '最关心的方向', q: '您这次最关心的方向是什么？', opts: ['看起来更年轻、更有精神', '从身体内部延缓衰老速度', '了解再生医学或关节恢复', '改善脸部线条和下颌线', '整形医美专业咨询', '改善疲惫感、暗沉和没精神', '韩国体检或功能医学', '医院、翻译和韩国行程安排'] },
  { label: '具体困扰', q: '您目前最想先解决的具体问题是？', opts: ['皮肤松弛或下垂', '睡眠、疲劳、代谢变慢', '关节、恢复或再生医学咨询', '下颌线、双下巴或脸型不清晰', '眼部、鼻部或轮廓整形', '眼周、黑眼圈、肤色暗沉', '想系统了解身体状态', '不知道如何预约和安排行程'] },
  { label: '希望先获得的结果', q: '您希望通过这次咨询先获得什么？', opts: ['先判断适合哪个方向', '了解可咨询的韩国医疗项目范围', '知道需要准备哪些检查或资料', '了解恢复期和停留时间', '获得初步行程和预约方向', '和中文顾问一对一沟通'] },
  { label: '恢复期或停留时间', q: '您能接受的恢复期或韩国停留时间是？', opts: ['几乎不想有恢复期', '1-3天可以接受', '4-7天可以接受', '可以接受更长恢复期', '计划停留3晚4天左右', '还不确定，想先咨询'] },
  { label: '最担心的问题', q: '您现在最担心什么？', opts: ['怕选错项目', '怕不自然或恢复期太长', '怕医疗信息看不懂', '怕沟通不清楚', '怕费用超出预期', '怕韩国行程安排不好', '担心是否合法合规'] },
  { label: '计划来韩国时间', q: '您计划什么时候来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '还没确定', '先线上了解'] },
  { label: '希望先获得的帮助', q: '您希望汉江春天先帮您做什么？', opts: ['先整理适合我的咨询方向', '先整理需要准备的问题和资料', '先说明韩国咨询流程', '先说明大致停留和恢复安排', '先连接中文顾问沟通', '先了解预约是否可行'] },
]

const QUESTIONS_KO: Q[] = [
  { label: '가장 관심 있는 방향', q: '이번에 가장 관심 있는 방향은 무엇인가요?', opts: ['좀 더 젊고 생기 있어 보이고 싶다', '몸속에서부터 노화 속도를 늦추고 싶다', '재생의학 또는 관절 회복을 알고 싶다', '얼굴 라인과 턱선을 개선하고 싶다', '성형의료미용 전문 상담', '피곤하고 칙칙하고 생기 없는 인상 개선', '한국 건강검진 또는 기능의학', '병원, 통역, 한국 일정 관리'] },
  { label: '구체적인 고민', q: '지금 가장 먼저 해결하고 싶은 구체적인 문제는?', opts: ['피부 탄력 저하 또는 처짐', '수면, 피로, 대사 저하', '관절, 회복 또는 재생의학 상담', '턱선, 이중턱 또는 흐릿한 얼굴형', '눈, 코 또는 윤곽 성형', '눈가, 다크서클, 칙칙한 피부톤', '몸 상태를 체계적으로 알고 싶다', '예약과 일정을 어떻게 잡을지 모르겠다'] },
  { label: '먼저 얻고 싶은 결과', q: '이번 상담을 통해 먼저 얻고 싶은 것은?', opts: ['먼저 적합한 방향을 판단하고 싶다', '상담 가능한 한국 의료 항목 범위 확인', '준비해야 할 검사나 자료 확인', '회복 기간과 체류 기간 안내', '초기 일정과 예약 방향 안내', '중국어 가능 컨시어지와 1:1 소통'] },
  { label: '회복 기간 또는 체류 기간', q: '감수할 수 있는 회복 기간 또는 한국 체류 기간은?', opts: ['회복 기간이 거의 없으면 좋겠다', '1~3일 정도는 괜찮다', '4~7일 정도는 괜찮다', '더 긴 회복 기간도 괜찮다', '3박 4일 정도 체류 예정', '아직 모르겠다, 먼저 상담하고 싶다'] },
  { label: '가장 걱정되는 것', q: '지금 가장 걱정되는 것은?', opts: ['항목을 잘못 고를까 봐', '부자연스럽거나 회복 기간이 길까 봐', '의료 정보를 이해하기 어려울까 봐', '소통이 잘 안 될까 봐', '비용이 예상보다 클까 봐', '한국 일정이 잘 안 짜일까 봐', '합법·합규 여부가 걱정된다'] },
  { label: '방한 계획', q: '언제쯤 한국에 올 계획인가요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '아직 미정', '먼저 온라인으로 알아보기'] },
  { label: '먼저 원하는 도움', q: '한강애봄이 먼저 무엇을 도와드리면 좋을까요?', opts: ['나에게 맞는 상담 방향 정리', '준비할 질문과 자료 정리', '한국 상담 절차 안내', '대략적인 체류·회복 일정 안내', '중국어 가능 컨시어지 연결', '예약 가능 여부 확인'] },
]

const QUESTIONS_EN: Q[] = [
  { label: 'Main direction', q: 'What direction are you most interested in this time?', opts: ['Look younger and more refreshed', 'Slow aging from the inside', 'Learn about regenerative medicine or joint recovery', 'Improve facial line and jawline', 'Professional plastic surgery consultation', 'Improve a tired, dull, low-energy look', 'Korean health checkup or functional medicine', 'Hospital, interpretation, and Korea itinerary'] },
  { label: 'Specific concern', q: 'What specific issue do you want to address first?', opts: ['Skin sagging or laxity', 'Sleep, fatigue, slowing metabolism', 'Joint, recovery, or regenerative medicine consultation', 'Jawline, double chin, or unclear face shape', 'Eyes, nose, or contour surgery', 'Eye area, dark circles, dull skin tone', 'Want a systematic understanding of my body', 'Not sure how to book or plan the itinerary'] },
  { label: 'What I want to clarify first', q: 'What would you like to get out of this consultation first?', opts: ['Find the right direction for me first', 'Understand the scope of Korean services I can consult', 'Know what tests or documents to prepare', 'Understand downtime and stay duration', 'Get an initial itinerary and booking direction', 'Speak one-on-one with a Chinese-speaking concierge'] },
  { label: 'Downtime or stay duration', q: 'How much downtime or Korea stay duration can you accept?', opts: ['Almost no downtime preferred', '1–3 days is fine', '4–7 days is fine', 'Longer downtime is fine', 'Planning to stay around 3 nights, 4 days', 'Not sure yet — want to consult first'] },
  { label: 'Biggest worry', q: 'What are you most worried about right now?', opts: ['Choosing the wrong service', 'Looking unnatural or downtime too long', 'Not understanding medical information', 'Communication issues', 'Costs exceeding expectations', 'Korea itinerary not well arranged', 'Concerned about legal compliance'] },
  { label: 'Korea visit timing', q: 'When are you planning to visit Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided yet', 'Just exploring online for now'] },
  { label: 'Preferred first support', q: 'What would you like K-Medi Spring to help you with first?', opts: ['Sort out the right consultation direction for me', 'Organize the questions and materials to prepare', 'Explain the Korean consultation process', 'Explain rough stay and recovery planning', 'Connect me with a Chinese-speaking concierge', 'Check whether booking is feasible'] },
]

const QUESTIONS_AR: Q[] = [
  { label: 'الاتجاه الرئيسي', q: 'ما الاتجاه الذي يهمك أكثر هذه المرة؟', opts: ['أبدو أصغر سناً وأكثر حيوية', 'إبطاء الشيخوخة من الداخل', 'معرفة الطب التجديدي أو تعافي المفاصل', 'تحسين خط الوجه والفك', 'استشارة جراحة تجميلية متخصصة', 'تحسين مظهر التعب والشحوب وانخفاض الحيوية', 'فحص صحي كوري أو طب وظيفي', 'المستشفى والترجمة وجدول رحلتي لكوريا'] },
  { label: 'القلق المحدد', q: 'ما المشكلة المحددة التي تريد معالجتها أولاً؟', opts: ['ترهل أو تراخي البشرة', 'النوم والتعب وتباطؤ التمثيل الغذائي', 'استشارة المفاصل أو التعافي أو الطب التجديدي', 'خط الفك أو الذقن المزدوجة أو شكل الوجه غير الواضح', 'جراحة العيون أو الأنف أو الملامح', 'منطقة العين والهالات وشحوب البشرة', 'أريد فهماً منهجياً لحالة جسمي', 'لا أعرف كيف أحجز أو أخطط للبرنامج'] },
  { label: 'ما أريد توضيحه أولاً', q: 'ما الذي تريد الحصول عليه من هذه الاستشارة أولاً؟', opts: ['تحديد الاتجاه المناسب لي أولاً', 'فهم نطاق الخدمات الكورية التي يمكن استشارتها', 'معرفة الفحوصات أو المستندات المطلوبة', 'فهم فترة التعافي ومدة الإقامة', 'الحصول على برنامج وحجز أولي', 'التحدث مباشرة مع كونسيرج يتحدث الصينية'] },
  { label: 'فترة التعافي أو مدة الإقامة', q: 'كم فترة تعافي أو إقامة في كوريا يمكنك قبولها؟', opts: ['أفضّل عدم وجود فترة تعافي تقريباً', '1-3 أيام مقبول', '4-7 أيام مقبول', 'فترة تعافي أطول مقبولة', 'أخطط للإقامة حوالي 3 ليالٍ و4 أيام', 'لست متأكداً بعد، أريد الاستشارة أولاً'] },
  { label: 'أكبر قلق', q: 'ما الذي يقلقك أكثر الآن؟', opts: ['اختيار الخدمة الخاطئة', 'الظهور بمظهر غير طبيعي أو فترة تعافي طويلة', 'عدم فهم المعلومات الطبية', 'مشاكل التواصل', 'تجاوز التكلفة المتوقعة', 'عدم تنظيم جدول رحلتي لكوريا بشكل جيد', 'القلق بشأن الامتثال القانوني'] },
  { label: 'موعد زيارة كوريا', q: 'متى تخطط لزيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'في وقت ما من هذا العام', 'لم أقرر بعد', 'أستكشف عبر الإنترنت فقط الآن'] },
  { label: 'الدعم المفضل أولاً', q: 'ماذا تريد من K-Medi أن يساعدك به أولاً؟', opts: ['تحديد اتجاه الاستشارة المناسب لي', 'تنظيم الأسئلة والمستندات التي يجب تحضيرها', 'شرح إجراءات الاستشارة الكورية', 'شرح خطة الإقامة والتعافي التقريبية', 'ربطي بكونسيرج يتحدث الصينية', 'التحقق من إمكانية الحجز'] },
]

type ConsultationType =
  | 'YOUNGER_LOOK' | 'SLOW_AGING' | 'REGEN_MEDICINE' | 'FACE_CONTOUR'
  | 'SURGERY' | 'FATIGUE_LOOK' | 'CHECKUP' | 'TRAVEL_SUPPORT' | 'GENERAL'

const END_ZH = '请点击下方按钮，通过企业微信联系顾问。'
const END_KO = '아래 버튼을 눌러 컨시어지에게 상담 내용을 보내주세요.'
const END_EN = 'Click the button below to connect with a concierge.'
const END_AR = 'اضغط على الزر أدناه للتواصل مع الكونسيرج.'

const RESPONSES: Record<string, Record<ConsultationType, string>> = {
  zh: {
    YOUNGER_LOOK: `您好，已为您整理初步咨询方向。\n\n您比较关注外观上的抗衰，例如皮肤弹性、肤色或轮廓下垂带来的显老感。建议先从皮肤医美、抗衰外观管理或轮廓提升方向了解，而不是直接选定某个项目。\n\n${END_ZH}`,
    SLOW_AGING: `您好，已为您整理初步咨询方向。\n\n您更关注身体内部的衰老速度，例如睡眠、疲劳、代谢或激素变化。建议先从功能医学咨询、抗衰老检查或生活方式管理方向了解身体目前的状态。\n\n${END_ZH}`,
    REGEN_MEDICINE: `您好，已为您整理初步咨询方向。\n\n您关注的是再生医学或关节恢复相关咨询。请注意，并非所有干细胞相关项目都可以在韩国自由进行，具体可咨询范围需由正规医疗机构和专业医生根据法规与您的状态判断。\n\n${END_ZH}`,
    FACE_CONTOUR: `您好，已为您整理初步咨询方向。\n\n您比较关注脸部线条、下颌线或轮廓的清晰度。建议先从皮肤提升、轮廓咨询或容量支撑方向了解，是否需要手术或注射类项目需经医生面诊判断。\n\n${END_ZH}`,
    SURGERY: `您好，已为您整理初步咨询方向。\n\n您对整形医美咨询感兴趣，例如眼部、鼻部或轮廓方向。建议先整理想改善的部位、期待的风格和可接受的恢复期，具体手术适合度需由专业医生面诊确认。\n\n${END_ZH}`,
    FATIGUE_LOOK: `您好，已为您整理初步咨询方向。\n\n您比较在意疲惫感、肤色暗沉或没精神的状态，原因可能来自眼周、肤色，也可能与身体状态和生活节奏有关。我们会先帮您整理较轻负担的咨询方向。\n\n${END_ZH}`,
    CHECKUP: `您好，已为您整理初步咨询方向。\n\n您关注的是韩国体检或功能医学方向。我们不会一开始建议越多越好的检查，而是根据您的年龄、家族史和当前症状，先整理合适的检查方向。\n\n${END_ZH}`,
    TRAVEL_SUPPORT: `您好，已为您整理初步咨询方向。\n\n您比较关注医院预约、翻译、车辆或韩国行程安排等执行层面的问题。汉江春天会先帮您梳理来韩目的、停留时间和需要的陪同支持，再协助安排具体流程。\n\n${END_ZH}`,
    GENERAL: `您好，已为您整理初步咨询方向。\n\n您目前的关注点比较多样，我们会先帮您梳理优先顺序，再根据实际情况连接合适的韩国医疗咨询方向。\n\n${END_ZH}`,
  },
  ko: {
    YOUNGER_LOOK: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n외형적인 항노화에 관심이 있으신 것으로 보입니다. 피부 탄력, 피부톤, 윤곽 처짐에서 오는 노안일 수 있어, 피부의료미용, 항노화 외모 관리, 윤곽 리프팅 방향부터 알아보시길 권장합니다.\n\n${END_KO}`,
    SLOW_AGING: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n몸속 노화 속도에 더 관심이 있으신 것으로 보입니다. 수면, 피로, 대사, 호르몬 변화일 수 있어, 기능의학 상담, 항노화 검진, 생활습관 관리 방향부터 몸 상태를 이해해 보시길 권장합니다.\n\n${END_KO}`,
    REGEN_MEDICINE: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n재생의학 또는 관절 회복 관련 상담에 관심이 있으신 것으로 보입니다. 모든 줄기세포 관련 시술이 한국에서 자유롭게 가능한 것은 아니며, 구체적인 상담 가능 범위는 정식 의료기관과 전문의가 법규와 상태를 확인한 뒤 판단합니다.\n\n${END_KO}`,
    FACE_CONTOUR: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n얼굴 라인, 턱선, 윤곽의 또렷함에 관심이 있으신 것으로 보입니다. 피부 리프팅, 윤곽 상담, 볼륨 지지 방향부터 알아보시고, 수술이나 시술 필요 여부는 의료진 면진을 통해 확인하시길 권장합니다.\n\n${END_KO}`,
    SURGERY: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n성형의료미용 전문 상담에 관심이 있으신 것으로 보입니다. 개선하고 싶은 부위, 기대하는 스타일, 감수할 수 있는 회복 기간을 먼저 정리하시고, 수술 적합 여부는 전문의 면진을 통해 확인하시길 권장합니다.\n\n${END_KO}`,
    FATIGUE_LOOK: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n피곤하고 칙칙하고 생기 없는 인상에 관심이 있으신 것으로 보입니다. 눈가, 피부톤, 또는 신체 컨디션과 관련이 있을 수 있어, 부담이 적은 상담 방향부터 정리해 드리겠습니다.\n\n${END_KO}`,
    CHECKUP: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n한국 건강검진 또는 기능의학 방향에 관심이 있으신 것으로 보입니다. 검사를 무조건 많이 받기보다, 나이와 가족력, 현재 증상을 바탕으로 적합한 검진 방향을 먼저 정리해 드리겠습니다.\n\n${END_KO}`,
    TRAVEL_SUPPORT: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n병원 예약, 통역, 차량 또는 한국 일정 관리에 대한 걱정이 있으신 것으로 보입니다. 방한 목적과 체류 기간, 필요한 동행 지원을 먼저 정리한 뒤 구체적인 절차를 안내해 드리겠습니다.\n\n${END_KO}`,
    GENERAL: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n현재 관심사가 여러 가지로 섞여 있으신 것으로 보입니다. 먼저 우선순위를 정리한 뒤, 실제 상황에 맞는 한국 의료 상담 방향으로 연결해 드리겠습니다.\n\n${END_KO}`,
  },
  en: {
    YOUNGER_LOOK: `Hello, here's your initial consultation direction.\n\nYou're focused on the outward signs of aging — such as skin elasticity, tone, or sagging contours. We recommend starting with skin aesthetics, anti-aging appearance management, or facial lifting consultation.\n\n${END_EN}`,
    SLOW_AGING: `Hello, here's your initial consultation direction.\n\nYou're more focused on aging from the inside — sleep, fatigue, metabolism, or hormonal changes. We recommend starting with functional medicine consultation, anti-aging checkups, or lifestyle management to first understand your body's current state.\n\n${END_EN}`,
    REGEN_MEDICINE: `Hello, here's your initial consultation direction.\n\nYou're interested in regenerative medicine or joint recovery. Not all stem-cell-related procedures can be freely performed in Korea — the specific consultable scope must be determined by a licensed medical institution and physician based on regulations and your condition.\n\n${END_EN}`,
    FACE_CONTOUR: `Hello, here's your initial consultation direction.\n\nYou're focused on the clarity of your facial line, jawline, or contour. We recommend starting with skin lifting, contour consultation, or volume support, with whether surgery or an injectable is needed confirmed through a physician's evaluation.\n\n${END_EN}`,
    SURGERY: `Hello, here's your initial consultation direction.\n\nYou're interested in professional plastic surgery consultation. Start by clarifying the areas you want to change, your desired style, and the downtime you can accept — surgical suitability is confirmed through an in-person physician evaluation.\n\n${END_EN}`,
    FATIGUE_LOOK: `Hello, here's your initial consultation direction.\n\nYou're concerned about looking tired, dull, or low-energy, which may relate to the eye area, skin tone, or overall physical condition. We'll prioritize lighter consultation directions for you.\n\n${END_EN}`,
    CHECKUP: `Hello, here's your initial consultation direction.\n\nYou're interested in a Korean health checkup or functional medicine. Rather than recommending as many tests as possible, we'll first identify the right checkup direction based on your age, family history, and current symptoms.\n\n${END_EN}`,
    TRAVEL_SUPPORT: `Hello, here's your initial consultation direction.\n\nYou're concerned about hospital appointments, interpretation, transportation, or your Korea itinerary. We'll first clarify your purpose of visit, length of stay, and escort needs, then help arrange the specific process.\n\n${END_EN}`,
    GENERAL: `Hello, here's your initial consultation direction.\n\nYour current interests cover a few different areas. We'll help you sort out priorities first, then connect you with the right Korean medical consultation direction.\n\n${END_EN}`,
  },
  ar: {
    YOUNGER_LOOK: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت تركز على العلامات الخارجية للشيخوخة، مثل مرونة البشرة أو لونها أو ترهل الملامح. نوصي بالبدء باستشارة الطب التجميلي للبشرة أو إدارة مظهر مكافحة الشيخوخة أو رفع الملامح.\n\n${END_AR}`,
    SLOW_AGING: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت تركز أكثر على الشيخوخة من الداخل - النوم أو التعب أو التمثيل الغذائي أو التغيرات الهرمونية. نوصي بالبدء باستشارة الطب الوظيفي أو فحوصات مكافحة الشيخوخة أو إدارة نمط الحياة لفهم حالة جسمك الحالية.\n\n${END_AR}`,
    REGEN_MEDICINE: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت مهتم بالطب التجديدي أو تعافي المفاصل. ليست جميع الإجراءات المتعلقة بالخلايا الجذعية متاحة بحرية في كوريا، ويجب تحديد النطاق المحدد القابل للاستشارة من قبل مؤسسة طبية مرخصة وطبيب متخصص بناءً على اللوائح وحالتك.\n\n${END_AR}`,
    FACE_CONTOUR: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت تركز على وضوح خط وجهك أو فكك أو ملامحك. نوصي بالبدء برفع البشرة أو استشارة تشكيل الملامح أو دعم الحجم، مع تأكيد الحاجة للجراحة أو الحقن من خلال تقييم الطبيب.\n\n${END_AR}`,
    SURGERY: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت مهتم باستشارة جراحة تجميلية متخصصة. ابدأ بتوضيح المناطق التي تريد تغييرها والأسلوب المطلوب وفترة التعافي المقبولة - ويتم تأكيد ملاءمة الجراحة من خلال تقييم مباشر مع الطبيب.\n\n${END_AR}`,
    FATIGUE_LOOK: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت قلق من الظهور بمظهر متعب أو شاحب أو منخفض الحيوية، وقد يرتبط ذلك بمنطقة العين أو لون البشرة أو الحالة الجسدية العامة. سنعطي الأولوية لاتجاهات استشارة أخف بالنسبة لك.\n\n${END_AR}`,
    CHECKUP: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت مهتم بفحص صحي كوري أو طب وظيفي. بدلاً من التوصية بأكبر عدد ممكن من الفحوصات، سنحدد أولاً اتجاه الفحص المناسب بناءً على عمرك وتاريخك العائلي وأعراضك الحالية.\n\n${END_AR}`,
    TRAVEL_SUPPORT: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت قلق بشأن مواعيد المستشفى أو الترجمة أو المواصلات أو جدول رحلتك لكوريا. سنوضح أولاً غرض زيارتك ومدة إقامتك واحتياجات المرافقة، ثم نساعد في تنظيم الإجراءات المحددة.\n\n${END_AR}`,
    GENERAL: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nتتنوع اهتماماتك الحالية في عدة مجالات. سنساعدك أولاً على ترتيب الأولويات، ثم نربطك بالاتجاه المناسب للاستشارة الطبية الكورية.\n\n${END_AR}`,
  },
}

/* ─── i18n data (home / pre-category card) ────────────────────── */

const QUESTIONS_HOME_ZH: Q[] = [
  { label: '来韩目的', q: '您这次最想通过韩国医疗咨询解决什么？', opts: ['想做皮肤医美或抗衰管理', '想了解健康检查或功能医学', '想咨询再生医学或关节恢复', '想了解整形医美方向', '想安排家人一起体检', '想把医疗和旅行一起安排', '还不确定，想先整理需求'] },
  { label: '既往经验', q: '您之前有过韩国医疗或医美体验吗？', opts: ['做过，整体满意', '做过，但价格偏高', '做过，但沟通不够清楚', '做过，但想换更可靠的医院', '没有做过，第一次了解', '在中国做过，想比较韩国方案', '帮家人或朋友了解'] },
  { label: '选择医院时最看重', q: '选择韩国医院或项目时，您最看重什么？', opts: ['医生和医院是否可靠', '价格是否透明合理', '效果是否自然', '恢复期是否适合我的行程', '是否有中文沟通', '是否有人陪同和翻译', '是否能解释检查结果或方案'] },
  { label: '目前最担心', q: '您现在最担心哪一点？', opts: ['怕选错医院', '怕项目不适合我', '怕价格超出预期', '怕语言沟通不清楚', '怕恢复期影响行程', '怕医疗信息看不懂', '怕到了韩国不知道怎么安排'] },
  { label: '同行情况', q: '这次是您自己来，还是和家人朋友一起来？', opts: ['自己来', '和朋友一起来', '和家人一起来', '带父母做检查', '夫妻或情侣一起', '还没确定', '先线上咨询'] },
  { label: '来韩计划', q: '您大概什么时候考虑来韩国？', opts: ['1个月内', '3个月内', '半年内', '今年内', '还没确定', '先了解后决定'] },
  { label: '希望先获得', q: '您希望汉江春天先帮您整理什么？', opts: ['适合我的韩国医疗方向', '可咨询的医院或科室方向', '大致恢复期和停留安排', '参考预算方向', '预约和翻译流程', '健康检查或结果说明方向', '先和中文顾问沟通'] },
]

const QUESTIONS_HOME_KO: Q[] = [
  { label: '방문 목적', q: '이번 한국 의료 상담을 통해 가장 알고 싶은 것은?', opts: ['피부미용 또는 항노화 관리', '건강검진 또는 기능의학', '재생의학 또는 관절 회복 상담', '성형의료미용 방향', '가족 건강검진 함께 안배', '의료와 여행 일정 함께 안배', '아직 모르겠고 먼저 정리하고 싶다'] },
  { label: '기존 경험', q: '이전에 한국 의료 또는 미용 시술 경험이 있나요?', opts: ['해봤고 대체로 만족했다', '해봤지만 가격이 높았다', '해봤지만 소통이 부족했다', '해봤지만 더 신뢰할 수 있는 병원을 찾고 싶다', '처음 알아본다', '중국에서 해봤고 한국과 비교하고 싶다', '가족이나 친구 대신 알아보고 있다'] },
  { label: '병원 선택 기준', q: '한국 병원이나 항목을 선택할 때 가장 중요한 것은?', opts: ['의사와 병원이 신뢰할 만한지', '가격이 투명하고 합리적인지', '결과가 자연스러운지', '회복 기간이 일정에 맞는지', '중국어 소통이 가능한지', '통역과 동행이 가능한지', '검사 결과나 상담 내용을 이해할 수 있는지'] },
  { label: '현재 걱정', q: '지금 가장 걱정되는 것은?', opts: ['병원을 잘못 고를까 봐', '항목이 나에게 맞지 않을까 봐', '비용이 예상보다 커질까 봐', '언어 소통이 안 될까 봐', '회복 기간이 일정에 영향을 줄까 봐', '의료 정보를 이해하기 어려울까 봐', '한국에 가서 어떻게 움직일지 몰라서'] },
  { label: '동행 상황', q: '이번에는 혼자 오나요, 가족이나 친구와 함께 오나요?', opts: ['혼자', '친구와 함께', '가족과 함께', '부모님 검진 동행', '부부 또는 커플', '아직 미정', '먼저 온라인 상담'] },
  { label: '방한 계획', q: '언제쯤 한국 방문을 생각하고 있나요?', opts: ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '아직 미정', '먼저 알아보고 결정'] },
  { label: '먼저 원하는 도움', q: '한강애봄이 먼저 무엇을 정리해드리면 좋을까요?', opts: ['나에게 맞는 한국 의료 방향', '상담 가능한 병원 또는 진료과 방향', '대략적인 회복 기간과 체류 일정', '참고 예산 방향', '예약과 통역 절차', '건강검진 또는 결과 설명 방향', '먼저 중국어 가능 컨시어지와 상담'] },
]

const QUESTIONS_HOME_EN: Q[] = [
  { label: 'Purpose', q: 'What would you most like to address through this Korea medical consultation?', opts: ['Skin aesthetics or anti-aging care', 'Health checkup or functional medicine', 'Regenerative medicine or joint recovery', 'Plastic surgery options', 'A family health checkup together', 'Combining medical care with travel', 'Not sure yet — want to organize my needs first'] },
  { label: 'Past experience', q: 'Have you had medical or aesthetic treatment in Korea before?', opts: ['Yes, and I was generally satisfied', 'Yes, but the price was high', "Yes, but communication wasn't clear enough", 'Yes, but I want a more reliable hospital', 'No, this is my first time looking into it', 'Yes, in my home country — want to compare with Korea', 'Looking into it on behalf of family or a friend'] },
  { label: 'Hospital priorities', q: 'When choosing a hospital or treatment in Korea, what matters most to you?', opts: ['Whether the doctor and hospital are reliable', 'Whether pricing is transparent and reasonable', 'Whether results look natural', 'Whether downtime fits my schedule', 'Whether Chinese-language support is available', 'Whether an escort/interpreter is available', 'Whether results or plans are clearly explained'] },
  { label: 'Current worry', q: 'What concerns you most right now?', opts: ['Choosing the wrong hospital', 'The treatment not suiting me', 'Costs exceeding expectations', 'Communication issues', 'Downtime affecting my schedule', 'Not understanding medical information', 'Not knowing how to arrange things once in Korea'] },
  { label: 'Travel companions', q: 'Are you coming alone, or with family or friends?', opts: ['Coming alone', 'With a friend', 'With family', 'Accompanying parents for a checkup', 'With a spouse or partner', 'Not decided yet', 'Starting with an online consultation first'] },
  { label: 'Visit timing', q: 'Roughly when are you considering visiting Korea?', opts: ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Sometime this year', 'Not decided yet', 'Want to learn more before deciding'] },
  { label: 'First priority', q: 'What would you like K-Medi Spring to help organize first?', opts: ['The right Korean medical direction for me', 'Which hospitals or departments to consult', 'Rough downtime and stay planning', 'A reference budget direction', 'Appointment and interpretation process', 'Health checkup or results explanation', 'Speaking with a Chinese-speaking concierge first'] },
]

const QUESTIONS_HOME_AR: Q[] = [
  { label: 'الغرض من الزيارة', q: 'ما الذي تريد معالجته أكثر من خلال هذه الاستشارة الطبية في كوريا؟', opts: ['طب تجميلي للبشرة أو عناية بمكافحة الشيخوخة', 'فحص صحي أو طب وظيفي', 'طب تجديدي أو تعافي المفاصل', 'خيارات الجراحة التجميلية', 'فحص صحي عائلي مشترك', 'الجمع بين الرعاية الطبية والسفر', 'لست متأكداً بعد — أريد تنظيم احتياجاتي أولاً'] },
  { label: 'الخبرة السابقة', q: 'هل سبق أن خضعت لعلاج طبي أو تجميلي في كوريا؟', opts: ['نعم، وكنت راضياً بشكل عام', 'نعم، ولكن السعر كان مرتفعاً', 'نعم، ولكن التواصل لم يكن واضحاً بما يكفي', 'نعم، ولكن أريد مستشفى أكثر موثوقية', 'لا، هذه أول مرة أستكشف الأمر', 'نعم، في بلدي — أريد المقارنة مع كوريا', 'أستكشف الأمر بالنيابة عن أحد أفراد العائلة أو صديق'] },
  { label: 'أولويات اختيار المستشفى', q: 'عند اختيار مستشفى أو علاج في كوريا، ما الأهم بالنسبة لك؟', opts: ['موثوقية الطبيب والمستشفى', 'شفافية السعر ومعقوليته', 'مدى طبيعية النتائج', 'مدى توافق فترة التعافي مع جدولي', 'توفر الدعم باللغة الصينية', 'توفر مرافق أو مترجم', 'وضوح شرح النتائج أو الخطة'] },
  { label: 'القلق الحالي', q: 'ما الذي يقلقك أكثر الآن؟', opts: ['اختيار المستشفى الخاطئ', 'عدم ملاءمة العلاج لي', 'تجاوز التكلفة المتوقعة', 'مشاكل التواصل', 'تأثير فترة التعافي على جدولي', 'عدم فهم المعلومات الطبية', 'عدم معرفة كيفية الترتيب بعد الوصول إلى كوريا'] },
  { label: 'المرافقون', q: 'هل ستأتي بمفردك أم مع العائلة أو الأصدقاء؟', opts: ['بمفردي', 'مع صديق', 'مع العائلة', 'مرافقة الوالدين لإجراء فحص', 'مع الزوج/الزوجة أو الشريك', 'لم أقرر بعد', 'سأبدأ باستشارة عبر الإنترنت أولاً'] },
  { label: 'موعد الزيارة', q: 'متى تفكر تقريباً في زيارة كوريا؟', opts: ['خلال شهر واحد', 'خلال 3 أشهر', 'خلال 6 أشهر', 'في وقت ما من هذا العام', 'لم أقرر بعد', 'أريد معرفة المزيد قبل اتخاذ القرار'] },
  { label: 'الأولوية الأولى', q: 'ماذا تريد من K-Medi أن ينظمه لك أولاً؟', opts: ['الاتجاه الطبي الكوري المناسب لي', 'المستشفيات أو الأقسام التي يمكن استشارتها', 'فترة التعافي التقريبية وخطة الإقامة', 'اتجاه ميزانية مرجعي', 'إجراءات الحجز والترجمة', 'الفحص الصحي أو شرح النتائج', 'التحدث مع كونسيرج يتحدث الصينية أولاً'] },
]

type HomeType =
  | 'BEAUTY_EXPERIENCED' | 'BEAUTY_FIRST_TIME' | 'HEALTH_CHECKUP' | 'REGEN_OR_JOINT'
  | 'SURGERY_INTEREST' | 'FAMILY_TRAVEL' | 'TRUST_HOSPITAL' | 'TRAVEL_SUPPORT' | 'GENERAL_HOME'

const RESPONSES_HOME: Record<string, Record<HomeType, string>> = {
  zh: {
    BEAUTY_EXPERIENCED: `您好，已为您整理初步咨询方向。\n\n您此前在韩国或其他地区有过美容相关经验，这次更希望找到沟通清楚、值得信赖的医院，并获得更自然的效果。\n\n我们会先帮您梳理：\n1. 您此前体验中最在意的问题\n2. 这次希望优先确认的医院条件\n3. 大致恢复期与停留安排\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    BEAUTY_FIRST_TIME: `您好，已为您整理初步咨询方向。\n\n您是第一次了解韩国皮肤医美或抗衰管理，建议先从了解自己的皮肤状态开始，而不是直接选择某个项目名称。\n\n我们会先帮您梳理：\n1. 您最在意的皮肤或外观问题\n2. 大致恢复期接受范围\n3. 来韩停留安排\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    HEALTH_CHECKUP: `您好，已为您整理初步咨询方向。\n\n您比较关注健康检查、功能医学或长期健康状态管理，例如疲劳、睡眠、代谢或检查结果说明。\n\n我们会先帮您梳理：\n1. 您目前最关心的身体信号\n2. 既往病史与家族病史\n3. 大致停留与检查安排\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    REGEN_OR_JOINT: `您好，已为您整理初步咨询方向。\n\n您比较关注再生医学或关节恢复方向。这类项目在韩国受到法律和医疗机构判断的影响较大，并非所有项目都可以自由进行。\n\n我们会先帮您梳理：\n1. 您关注的具体方向（如关节、恢复管理、抗衰咨询）\n2. 既往病史与年龄\n3. 来韩时间安排\n4. 可咨询范围与需专业医生判断的部分\n\n请点击下方按钮，通过企业微信联系顾问。`,
    SURGERY_INTEREST: `您好，已为您整理初步咨询方向。\n\n您比较关注整形医美方向。这类咨询需要先了解面部结构、想要的风格和可接受的恢复期，而不是直接确定手术方式。\n\n我们会先帮您梳理：\n1. 您关注的部位与风格方向\n2. 可接受的恢复期\n3. 来韩停留安排\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    FAMILY_TRAVEL: `您好，已为您整理初步咨询方向。\n\n您计划与家人或父母一同来韩国，可能需要同时安排不同的咨询方向，例如检查、皮肤管理或休息行程。\n\n我们会先帮您梳理：\n1. 每位同行者的关注方向\n2. 大致停留天数与行程安排\n3. 是否需要分别安排咨询时间\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    TRUST_HOSPITAL: `您好，已为您整理初步咨询方向。\n\n您此前的体验中，价格、沟通或医院可靠性方面让您有些顾虑。这次更希望找到透明、可信、沟通清楚的咨询方式。\n\n我们会先帮您梳理：\n1. 您希望优先确认的医院条件\n2. 之前体验中不满意的部分\n3. 沟通与翻译需求\n4. 参考预算方向\n\n请点击下方按钮，通过企业微信联系顾问。`,
    TRAVEL_SUPPORT: `您好，已为您整理初步咨询方向。\n\n您比较关注来韩的行程安排、预约、翻译或到院陪同等执行层面的问题。\n\n我们会先帮您梳理：\n1. 来韩目的与关注分类\n2. 预约、翻译与车辆需求\n3. 大致停留天数\n4. 后续协调方式\n\n请点击下方按钮，通过企业微信联系顾问。`,
    GENERAL_HOME: `您好，已为您整理初步咨询方向。\n\n您目前的需求还比较多样，我们会先帮您理清优先顺序，再连接合适的咨询方向。\n\n我们会先帮您梳理：\n1. 目前最想优先解决的问题\n2. 大致停留与行程安排\n3. 参考预算方向\n4. 适合的咨询分类\n\n请点击下方按钮，通过企业微信联系顾问。`,
  },
  ko: {
    BEAUTY_EXPERIENCED: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n이전에 한국이나 다른 곳에서 미용 관련 경험이 있으시고, 이번에는 소통이 명확하고 신뢰할 수 있는 병원에서 더 자연스러운 결과를 원하시는 것으로 보입니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 이전 경험에서 가장 신경 쓰였던 부분\n2. 이번에 우선 확인하고 싶은 병원 조건\n3. 대략적인 회복 기간과 체류 일정\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    BEAUTY_FIRST_TIME: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n한국 피부의료미용이나 항노화 관리를 처음 알아보고 계시는 것 같습니다. 특정 시술명을 정하기보다 먼저 피부 상태를 이해하는 것이 좋습니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 가장 신경 쓰이는 피부 또는 외모 고민\n2. 감수할 수 있는 회복 기간\n3. 한국 체류 일정\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    HEALTH_CHECKUP: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n건강검진, 기능의학 또는 장기적인 건강 상태 관리에 관심이 있으신 것으로 보입니다. 예를 들어 피로, 수면, 대사, 검사 결과 설명 등입니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 현재 가장 신경 쓰이는 몸의 신호\n2. 기존 병력과 가족력\n3. 대략적인 체류 및 검사 일정\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    REGEN_OR_JOINT: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n재생의학 또는 관절 회복 방향에 관심이 있으신 것으로 보입니다. 이 분야는 한국의 법적 기준과 의료기관의 판단에 따라 상담 가능한 범위가 달라집니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 관심 있는 구체적인 방향(관절, 회복관리, 항노화 상담 등)\n2. 기존 병력과 연령\n3. 한국 방문 예정 시기\n4. 상담 가능한 범위와 전문의 판단이 필요한 부분\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    SURGERY_INTEREST: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n성형의료미용 방향에 관심이 있으신 것으로 보입니다. 수술 방식을 바로 정하기보다 얼굴 구조, 원하는 스타일, 감수할 수 있는 회복 기간을 먼저 정리하는 것이 좋습니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 관심 있는 부위와 원하는 스타일 방향\n2. 감수할 수 있는 회복 기간\n3. 한국 체류 일정\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    FAMILY_TRAVEL: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n가족이나 부모님과 함께 한국에 오실 계획이신 것으로 보입니다. 검진, 피부 관리, 휴식 일정 등 동행자별로 다른 방향을 함께 정리해야 할 수 있습니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 동행자별 관심 방향\n2. 대략적인 체류 일수와 일정\n3. 상담 시간을 따로 안배해야 하는지\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    TRUST_HOSPITAL: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n이전 경험에서 가격, 소통 또는 병원의 신뢰도와 관련해 우려가 있으셨던 것으로 보입니다. 이번에는 투명하고 신뢰할 수 있으며 소통이 명확한 상담을 원하시는 것으로 정리됩니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 우선 확인하고 싶은 병원 조건\n2. 이전 경험에서 불만족스러웠던 부분\n3. 소통 및 통역 필요 여부\n4. 참고 예산 방향\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    TRAVEL_SUPPORT: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n한국 방문 일정, 예약, 통역 또는 병원 동행과 같은 실행 단계에 대한 걱정이 있으신 것으로 보입니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 방한 목적과 관심 분야\n2. 예약, 통역, 차량 필요 여부\n3. 대략적인 체류 일수\n4. 이후 조율 방식\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
    GENERAL_HOME: `안녕하세요, 초기 상담 방향을 정리해 드렸습니다.\n\n현재 여러 가지 고민이 섞여 있으신 것으로 보입니다. 먼저 우선순위를 정리한 뒤 적합한 상담 방향으로 연결해 드리겠습니다.\n\n먼저 다음을 정리해 드리겠습니다:\n1. 지금 가장 먼저 해결하고 싶은 문제\n2. 대략적인 체류 및 일정\n3. 참고 예산 방향\n4. 적합한 상담 분류\n\n아래 버튼을 눌러 컨시어지에게 연락하세요.`,
  },
  en: {
    BEAUTY_EXPERIENCED: `Hello, here's your initial consultation direction.\n\nYou've had aesthetic treatment experience before — in Korea or elsewhere — and this time you're looking for clearer communication and a more reliable hospital with natural-looking results.\n\nWe'll help clarify:\n1. What concerned you most in your previous experience\n2. The hospital conditions you'd like to confirm this time\n3. Approximate downtime and stay planning\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    BEAUTY_FIRST_TIME: `Hello, here's your initial consultation direction.\n\nIt looks like this is your first time exploring skin aesthetics or anti-aging care in Korea. It helps to first understand your skin condition rather than choosing a specific procedure right away.\n\nWe'll help clarify:\n1. Your main skin or appearance concerns\n2. Acceptable downtime\n3. Your Korea stay planning\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    HEALTH_CHECKUP: `Hello, here's your initial consultation direction.\n\nYou're focused on health checkups, functional medicine, or long-term health management — such as fatigue, sleep, metabolism, or understanding test results.\n\nWe'll help clarify:\n1. The body signals you're most concerned about now\n2. Your medical and family history\n3. Approximate stay and checkup planning\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    REGEN_OR_JOINT: `Hello, here's your initial consultation direction.\n\nYou're interested in regenerative medicine or joint recovery. This area is significantly shaped by legal regulations and the judgment of the medical institution, so not all procedures are freely available.\n\nWe'll help clarify:\n1. Your specific area of interest (joints, recovery management, anti-aging consultation, etc.)\n2. Your medical history and age\n3. Your planned visit timing\n4. What's currently consultable in Korea versus what needs a specialist's judgment\n\nClick below to connect with a concierge.`,
    SURGERY_INTEREST: `Hello, here's your initial consultation direction.\n\nYou're interested in plastic surgery. Rather than deciding on a procedure right away, it helps to first clarify your facial structure, desired style, and acceptable downtime.\n\nWe'll help clarify:\n1. The areas and style direction you're interested in\n2. Acceptable downtime\n3. Your Korea stay planning\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    FAMILY_TRAVEL: `Hello, here's your initial consultation direction.\n\nIt looks like you're planning to come to Korea with family or parents. You may need to organize different directions for each companion — such as checkups, skin care, or rest time.\n\nWe'll help clarify:\n1. Each companion's area of interest\n2. Approximate length of stay and schedule\n3. Whether separate consultation times are needed\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    TRUST_HOSPITAL: `Hello, here's your initial consultation direction.\n\nIt seems your previous experience left some concerns about pricing, communication, or hospital reliability. This time, you're looking for a transparent, trustworthy, and clearly communicated consultation.\n\nWe'll help clarify:\n1. The hospital conditions you'd like to confirm first\n2. What felt unsatisfactory in your previous experience\n3. Your communication and interpretation needs\n4. A reference budget direction\n\nClick below to connect with a concierge.`,
    TRAVEL_SUPPORT: `Hello, here's your initial consultation direction.\n\nYou're concerned about the logistics of visiting Korea — appointments, interpretation, transportation, or hospital escort.\n\nWe'll help clarify:\n1. Your purpose of visit and areas of interest\n2. Appointment, interpretation, and vehicle needs\n3. Approximate length of stay\n4. How we'll coordinate going forward\n\nClick below to connect with a concierge.`,
    GENERAL_HOME: `Hello, here's your initial consultation direction.\n\nYour current needs still cover a few different areas. We'll help you sort out the priorities first, then connect you with the right consultation direction.\n\nWe'll help clarify:\n1. What you'd like to address first\n2. Approximate stay and schedule\n3. A reference budget direction\n4. The most suitable consultation category\n\nClick below to connect with a concierge.`,
  },
  ar: {
    BEAUTY_EXPERIENCED: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nلديك خبرة سابقة في العلاجات التجميلية، في كوريا أو في مكان آخر، وهذه المرة تبحث عن تواصل أوضح ومستشفى أكثر موثوقية بنتائج طبيعية.\n\nسنساعدك في توضيح:\n1. ما الذي أثار قلقك أكثر في تجربتك السابقة\n2. شروط المستشفى التي تريد التأكد منها هذه المرة\n3. فترة التعافي التقريبية وخطة الإقامة\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    BEAUTY_FIRST_TIME: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nيبدو أن هذه أول مرة تستكشف الطب التجميلي للبشرة أو عناية مكافحة الشيخوخة في كوريا. من الأفضل أولاً فهم حالة بشرتك بدلاً من اختيار إجراء معين مباشرة.\n\nسنساعدك في توضيح:\n1. أهم مخاوفك المتعلقة بالبشرة أو المظهر\n2. فترة التعافي المقبولة\n3. خطة إقامتك في كوريا\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    HEALTH_CHECKUP: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت تركز على الفحص الصحي أو الطب الوظيفي أو إدارة الصحة طويلة المدى، مثل التعب أو النوم أو التمثيل الغذائي أو فهم نتائج الفحوصات.\n\nسنساعدك في توضيح:\n1. أهم العلامات الصحية التي تقلقك الآن\n2. تاريخك المرضي وتاريخ عائلتك\n3. خطة الإقامة والفحص التقريبية\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    REGEN_OR_JOINT: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت مهتم بالطب التجديدي أو تعافي المفاصل. يتأثر هذا المجال بشكل كبير باللوائح القانونية وتقييم المؤسسة الطبية، وليست جميع الإجراءات متاحة بحرية.\n\nسنساعدك في توضيح:\n1. اهتمامك المحدد (المفاصل، إدارة التعافي، استشارة مكافحة الشيخوخة، إلخ)\n2. تاريخك المرضي وعمرك\n3. توقيت زيارتك المخطط لها\n4. ما يمكن استشارته حالياً في كوريا وما يحتاج إلى تقييم طبيب مختص\n\nانقر أدناه للتواصل مع كونسيرج.`,
    SURGERY_INTEREST: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت مهتم بالجراحة التجميلية. بدلاً من تحديد إجراء معين مباشرة، من الأفضل أولاً توضيح بنية وجهك والمظهر المطلوب وفترة التعافي المقبولة.\n\nسنساعدك في توضيح:\n1. المناطق والمظهر الذي تهتم به\n2. فترة التعافي المقبولة\n3. خطة إقامتك في كوريا\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    FAMILY_TRAVEL: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nيبدو أنك تخطط للقدوم إلى كوريا مع العائلة أو الوالدين. قد تحتاج إلى تنظيم اتجاهات مختلفة لكل مرافق، مثل الفحص أو العناية بالبشرة أو وقت الراحة.\n\nسنساعدك في توضيح:\n1. مجال اهتمام كل مرافق\n2. مدة الإقامة التقريبية والجدول الزمني\n3. إن كنت تحتاج مواعيد استشارة منفصلة\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    TRUST_HOSPITAL: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nيبدو أن تجربتك السابقة تركت بعض المخاوف بشأن السعر أو التواصل أو موثوقية المستشفى. هذه المرة تبحث عن استشارة شفافة وموثوقة وواضحة التواصل.\n\nسنساعدك في توضيح:\n1. شروط المستشفى التي تريد التأكد منها أولاً\n2. ما لم يكن مرضياً في تجربتك السابقة\n3. حاجتك للتواصل والترجمة\n4. اتجاه ميزانية مرجعي\n\nانقر أدناه للتواصل مع كونسيرج.`,
    TRAVEL_SUPPORT: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nأنت قلق بشأن تفاصيل تنظيم زيارة كوريا، مثل المواعيد أو الترجمة أو التنقل أو مرافقة الزيارات الطبية.\n\nسنساعدك في توضيح:\n1. هدف زيارتك ومجالات اهتمامك\n2. حاجتك للمواعيد والترجمة والمركبات\n3. مدة الإقامة التقريبية\n4. كيفية التنسيق فيما بعد\n\nانقر أدناه للتواصل مع كونسيرج.`,
    GENERAL_HOME: `مرحباً، هذا هو اتجاه استشارتك الأولي.\n\nتتنوع احتياجاتك الحالية حتى الآن. سنساعدك أولاً على ترتيب الأولويات، ثم نوجهك إلى اتجاه الاستشارة المناسب.\n\nسنساعدك في توضيح:\n1. ما تريد معالجته أولاً\n2. مدة الإقامة والجدول التقريبي\n3. اتجاه ميزانية مرجعي\n4. فئة الاستشارة المناسبة\n\nانقر أدناه للتواصل مع كونسيرج.`,
  },
}

/* ─── UI labels ───────────────────────────────────────────────── */

const UI: Record<string, {
  title: string; cardGenerated: string; copyBtn: string; copied: string;
  contactBtn: string; restart: string; back: string; step: string; exit: string
}> = {
  zh: { title: '生成我的韩国医疗咨询卡', cardGenerated: '韩国医疗咨询卡已生成', copyBtn: '复制咨询内容', copied: '已复制', contactBtn: '打开企业微信咨询', restart: '重新填写', back: '← 上一步', step: 'Q', exit: '← 返回' },
  ko: { title: '나의 한국 의료 상담카드 만들기', cardGenerated: '한국 의료 상담카드가 생성되었습니다', copyBtn: '상담 내용 복사', copied: '복사됨', contactBtn: '지금 컨시어지에게 연락', restart: '다시 작성', back: '← 이전', step: 'Q', exit: '← 뒤로' },
  en: { title: 'Build My Korea Medical Consultation Profile', cardGenerated: 'Your Korea Medical Consultation Profile Is Ready', copyBtn: 'Copy Consultation Summary', copied: 'Copied!', contactBtn: 'Connect with a Concierge', restart: 'Start Over', back: '← Back', step: 'Q', exit: '← Back' },
  ar: { title: 'أنشئ ملف استشارتي الطبية في كوريا', cardGenerated: 'ملف استشارتك الطبية في كوريا جاهز', copyBtn: 'نسخ ملخص الاستشارة', copied: 'تم النسخ', contactBtn: 'تواصل مع كونسيرج', restart: 'ابدأ من جديد', back: 'السابق ←', step: 'س', exit: 'رجوع ←' },
}

const UI_HOME: Record<string, { title: string; cardGenerated: string }> = {
  zh: { title: '生成我的韩国医疗咨询卡', cardGenerated: '韩国医疗咨询卡已生成' },
  ko: { title: '나의 한국 의료 상담카드 만들기', cardGenerated: '한국 의료 상담카드가 생성되었습니다' },
  en: { title: 'Build My Korea Medical Consultation Profile', cardGenerated: 'Your Korea Medical Consultation Profile Is Ready' },
  ar: { title: 'أنشئ ملف استشارتي الطبية في كوريا', cardGenerated: 'ملف استشارتك الطبية في كوريا جاهز' },
}

const COPY_HEADER_HOME: Record<string, string> = {
  zh: '【韩国医疗咨询卡】',
  ko: '【한국 의료 상담카드】',
  en: '[Korea Medical Consultation Card]',
  ar: '[بطاقة الاستشارة الطبية الكورية]',
}

/* ─── structured intake-card copy format ───────────────────────── */

const STRUCTURED_HEADER: Record<string, string> = {
  zh: '【韩国医疗咨询卡】',
  ko: '【한국 의료상담 카드】',
  en: '【Korea Medical Consultation Card】',
  ar: '[بطاقة الاستشارة الطبية الكورية]',
}

const STRUCTURED_TYPE_LABEL: Record<string, string> = { zh: '咨询类型', ko: '상담 유형', en: 'Consultation Type', ar: 'نوع الاستشارة' }
const STRUCTURED_LANG_LABEL: Record<string, string> = { zh: '语言', ko: '언어', en: 'Language', ar: 'اللغة' }
const STRUCTURED_LANG_NAME: Record<string, string> = { zh: '中文', ko: '한국어', en: 'English', ar: 'العربية' }

const STRUCTURED_SECTION_TITLES: Record<string, string[]> = {
  zh: ['主要咨询方向', '具体问题或关注部位', '既往经验 / 检查资料', '恢复期或韩国停留时间', '最担心的问题', '计划来韩国时间', '希望汉江春天先协助的内容'],
  ko: ['주요 상담 방향', '구체적인 고민 또는 관심 부위', '기존 경험 / 검사자료', '회복기간 또는 한국 체류기간', '가장 걱정되는 점', '방한 예정 시기', '한강애봄에 먼저 원하는 도움'],
  en: ['Main consultation direction', 'Specific concern or area of interest', 'Previous experience / medical records', 'Downtime or Korea stay duration', 'Biggest concern', 'Planned visit timing', 'Support requested from K-Medi Spring'],
  ar: ['اتجاه الاستشارة الرئيسي', 'القلق المحدد أو منطقة الاهتمام', 'الخبرة السابقة / السجلات الطبية', 'فترة التعافي أو مدة الإقامة في كوريا', 'أكبر قلق', 'موعد الزيارة المخطط له', 'الدعم المطلوب من هانغانغايبورن'],
}

const STRUCTURED_DIRECTION_HEADER: Record<string, string> = {
  zh: '【初步整理结果】', ko: '【초기 상담 방향】', en: '【Initial Consultation Direction】', ar: '[الاتجاه الاستشاري الأولي]',
}

const STRUCTURED_MATERIALS_HEADER: Record<string, string> = {
  zh: '【建议提前准备的资料】', ko: '【상담 전 준비하면 좋은 자료】', en: '【Recommended materials to prepare】', ar: '[المستندات الموصى بتحضيرها]',
}

/* generic fallback checklist — used only when no categoryId/concernId resolves */
const STRUCTURED_MATERIALS_GENERIC: Record<string, string[]> = {
  zh: ['护照姓名 / 出生年月日', '希望来韩时间', '既往病史或正在服用的药物', '最近检查结果或影像资料，如有', '想咨询的部位照片，如属于皮肤或整形咨询', '过敏史或特殊注意事项'],
  ko: ['여권상 성명 / 생년월일', '희망 방한 시기', '기존 병력 또는 복용 중인 약', '최근 검사결과지 또는 영상자료가 있다면 첨부', '피부/성형 상담의 경우 상담 부위 사진', '알레르기 또는 특이사항'],
  en: ['Passport name / date of birth', 'Planned visit timing to Korea', 'Medical history or current medications', 'Recent test results or imaging records, if available', 'Photos of the area of concern for skin or plastic surgery consultation', 'Allergy history or special notes'],
  ar: ['اسم جواز السفر / تاريخ الميلاد', 'موعد الزيارة المخطط له لكوريا', 'التاريخ الطبي أو الأدوية الحالية', 'نتائج الفحوصات الأخيرة أو السجلات التصويرية، إن وجدت', 'صور المنطقة المعنية لاستشارة البشرة أو التجميل الجراحي', 'تاريخ الحساسية أو الملاحظات الخاصة'],
}

type MaterialsGroup = 'health' | 'regen' | 'skin' | 'surgery' | 'travel'

/* maps each categoryId / concernId to the checklist group whose required documents actually apply */
const MATERIALS_GROUP_BY_ID: Record<string, MaterialsGroup> = {
  'big-health': 'health', 'womens-care': 'health', 'mens-health': 'health',
  'slow-aging': 'health', 'health-checkup': 'health',
  'stem-cell': 'regen', 'regen-medicine': 'regen',
  'skin-beauty': 'skin', 'younger-look': 'skin', 'fatigue-look': 'skin',
  'plastic-surgery': 'surgery', 'face-contour': 'surgery', 'surgery-interest': 'surgery',
  'medical-tourism': 'travel', 'custom-plan': 'travel', 'korea-trip-worry': 'travel',
}

const STRUCTURED_MATERIALS_BY_GROUP: Record<MaterialsGroup, Record<string, string[]>> = {
  health: {
    zh: ['护照姓名 / 出生年月日', '希望来韩时间', '最近体检结果或异常项目', '既往病史、家族病史', '正在服用的药物或保健品', '过敏史或特殊注意事项'],
    ko: ['여권상 성명 / 생년월일', '희망 방한 시기', '최근 검진 결과 또는 이상 소견', '기존 병력, 가족력', '복용 중인 약물 또는 건강보조식품', '알레르기 또는 특이사항'],
    en: ['Passport name / date of birth', 'Planned visit timing to Korea', 'Recent checkup results or abnormal findings', 'Medical history, family history', 'Current medications or supplements', 'Allergy history or special notes'],
    ar: ['اسم جواز السفر / تاريخ الميلاد', 'موعد الزيارة المخطط له لكوريا', 'نتائج الفحص الأخيرة أو النتائج غير الطبيعية', 'التاريخ الطبي والتاريخ العائلي', 'الأدوية الحالية أو المكملات الغذائية', 'تاريخ الحساسية أو الملاحظات الخاصة'],
  },
  regen: {
    zh: ['护照姓名 / 出生年月日', '希望来韩时间', '既往病史或正在服用的药物', '相关部位的影像资料，如X光、MRI、CT、超声等', '诊断书、检查结果或医生意见书', '既往治疗或手术记录', '过敏史或特殊注意事项'],
    ko: ['여권상 성명 / 생년월일', '희망 방한 시기', '기존 병력 또는 복용 중인 약', '관련 부위의 영상 자료(X-ray, MRI, CT, 초음파 등)', '진단서, 검사 결과지 또는 의사 소견서', '기존 치료 또는 수술 기록', '알레르기 또는 특이사항'],
    en: ['Passport name / date of birth', 'Planned visit timing to Korea', 'Medical history or current medications', 'Imaging records of the relevant area (X-ray, MRI, CT, ultrasound, etc.)', "Diagnosis report, test results, or physician's opinion letter", 'Previous treatment or surgery records', 'Allergy history or special notes'],
    ar: ['اسم جواز السفر / تاريخ الميلاد', 'موعد الزيارة المخطط له لكوريا', 'التاريخ الطبي أو الأدوية الحالية', 'السجلات التصويرية للمنطقة المعنية (أشعة سينية، رنين مغناطيسي، تصوير مقطعي، موجات فوق صوتية، إلخ)', 'تقرير التشخيص أو نتائج الفحص أو رأي الطبيب', 'سجلات العلاج أو الجراحة السابقة', 'تاريخ الحساسية أو الملاحظات الخاصة'],
  },
  skin: {
    zh: ['护照姓名 / 出生年月日', '希望来韩时间', '正面/侧面/45度照片', '既往医美项目记录', '皮肤过敏史', '可接受的恢复期'],
    ko: ['여권상 성명 / 생년월일', '희망 방한 시기', '정면/측면/45도 사진', '기존 의료미용 시술 기록', '피부 알레르기 이력', '감수 가능한 회복 기간'],
    en: ['Passport name / date of birth', 'Planned visit timing to Korea', 'Front/side/45-degree photos', 'Past aesthetic treatment records', 'Skin allergy history', 'Acceptable downtime'],
    ar: ['اسم جواز السفر / تاريخ الميلاد', 'موعد الزيارة المخطط له لكوريا', 'صور أمامية/جانبية/بزاوية 45 درجة', 'سجلات العلاجات التجميلية السابقة', 'تاريخ حساسية البشرة', 'فترة التعافي المقبولة'],
  },
  surgery: {
    zh: ['护照姓名 / 出生年月日', '希望来韩时间', '正面/侧面/45度照片', '想改善的部位', '既往手术或医美经历', '可接受的恢复期', '过敏史或特殊注意事项'],
    ko: ['여권상 성명 / 생년월일', '희망 방한 시기', '정면/측면/45도 사진', '개선하고 싶은 부위', '기존 수술 또는 의료미용 경험', '감수 가능한 회복 기간', '알레르기 또는 특이사항'],
    en: ['Passport name / date of birth', 'Planned visit timing to Korea', 'Front/side/45-degree photos', 'Area you want to improve', 'Past surgery or aesthetic treatment experience', 'Acceptable downtime', 'Allergy history or special notes'],
    ar: ['اسم جواز السفر / تاريخ الميلاد', 'موعد الزيارة المخطط له لكوريا', 'صور أمامية/جانبية/بزاوية 45 درجة', 'المنطقة التي تريد تحسينها', 'خبرة الجراحة أو العلاج التجميلي السابقة', 'فترة التعافي المقبولة', 'تاريخ الحساسية أو الملاحظات الخاصة'],
  },
  travel: {
    zh: ['护照姓名 / 出生年月日', '同行人数', '希望来韩时间', '停留天数', '希望咨询的医疗方向', '是否需要翻译、车辆、陪同', '酒店或住宿区域，如已确定'],
    ko: ['여권상 성명 / 생년월일', '동행 인원', '희망 방한 시기', '체류 일수', '상담받고 싶은 의료 방향', '통역, 차량, 동행 필요 여부', '호텔 또는 숙소 지역(확정된 경우)'],
    en: ['Passport name / date of birth', 'Number of companions', 'Planned visit timing to Korea', 'Length of stay', "Medical direction you'd like to consult", 'Whether interpretation, vehicle, or escort support is needed', 'Hotel or accommodation area, if already decided'],
    ar: ['اسم جواز السفر / تاريخ الميلاد', 'عدد المرافقين', 'موعد الزيارة المخطط له لكوريا', 'مدة الإقامة', 'الاتجاه الطبي الذي تريد استشارته', 'هل تحتاج إلى ترجمة أو سيارة أو مرافقة', 'منطقة الفندق أو الإقامة، إن تم تحديدها'],
  },
}

function resolveMaterials(lang: string, materialsId?: string): string[] {
  const group = materialsId ? MATERIALS_GROUP_BY_ID[materialsId] : undefined
  const table = group ? STRUCTURED_MATERIALS_BY_GROUP[group] : STRUCTURED_MATERIALS_GENERIC
  return table[lang] ?? table.zh
}

const STRUCTURED_NOTICE_HEADER: Record<string, string> = {
  zh: '【说明】', ko: '【안내】', en: '【Notice】', ar: '[إشعار]',
}

const STRUCTURED_NOTICE: Record<string, string> = {
  zh: '汉江春天不是医疗机构。我们会先协助整理咨询需求、预约方向、翻译、陪同和韩国行程。最终检查、诊疗和治疗方案需要由韩国正规医疗机构和专业医生判断。',
  ko: '한강애봄은 의료기관이 아닙니다. 상담 내용 정리, 예약 방향, 통역, 동행, 한국 일정 조율을 돕는 컨시어지입니다. 최종 검사, 진료, 치료 방향은 한국의 정식 의료기관과 전문의 상담 후 결정됩니다.',
  en: 'K-Medi Spring is not a medical institution. We help organize consultation needs, booking direction, interpretation, escort support, and Korea itinerary coordination. Final examinations, diagnosis, and treatment plans must be determined by licensed Korean medical institutions and specialist physicians.',
  ar: 'هانغانغايبورن ليست مؤسسة طبية. نساعد في تنظيم احتياجات الاستشارة واتجاه الحجز والترجمة والمرافقة وتنسيق برنامج زيارتك إلى كوريا. يجب تحديد الفحوصات والتشخيص وخطط العلاج النهائية من قبل مؤسسات طبية كورية مرخصة وأطباء متخصصين.',
}

const GREETING_PREFIX: Record<string, string> = { zh: '您好', ko: '안녕하세요', en: 'Hello', ar: 'مرحباً' }

function extractCoreDirection(resultText: string, lang: string): string {
  const paragraphs = resultText.split('\n\n').map(p => p.trim()).filter(Boolean)
  if (paragraphs.length === 0) return ''
  const greeting = GREETING_PREFIX[lang] ?? GREETING_PREFIX.zh
  if (paragraphs[0].startsWith(greeting) && paragraphs.length > 1) return paragraphs[1]
  return paragraphs[0]
}

function stripBrackets(text: string): string {
  return text.replace(/^[【[]+/, '').replace(/[】\]]+$/, '').trim()
}

function buildStructuredCopyText({
  lang, consultationType, questions, answers, result, materialsId,
}: {
  lang: string
  consultationType: string
  questions: Q[]
  answers: string[]
  result: string
  materialsId?: string
}): string {
  const sectionTitles = STRUCTURED_SECTION_TITLES[lang] ?? STRUCTURED_SECTION_TITLES.zh
  const materials = resolveMaterials(lang, materialsId)

  const sections = questions
    .map((q, i) => (answers[i] ? `${i + 1}. ${sectionTitles[i] ?? q.label}\n${q.label}: ${answers[i]}` : null))
    .filter((s): s is string => Boolean(s))

  const lines: string[] = [
    STRUCTURED_HEADER[lang] ?? STRUCTURED_HEADER.zh,
    `${STRUCTURED_TYPE_LABEL[lang] ?? STRUCTURED_TYPE_LABEL.zh}: ${consultationType}`,
    `${STRUCTURED_LANG_LABEL[lang] ?? STRUCTURED_LANG_LABEL.zh}: ${STRUCTURED_LANG_NAME[lang] ?? STRUCTURED_LANG_NAME.zh}`,
    '',
  ]
  sections.forEach((s, i) => {
    lines.push(s)
    if (i < sections.length - 1) lines.push('')
  })
  lines.push('')
  lines.push(STRUCTURED_DIRECTION_HEADER[lang] ?? STRUCTURED_DIRECTION_HEADER.zh)
  lines.push(extractCoreDirection(result, lang))
  lines.push('')
  lines.push(STRUCTURED_MATERIALS_HEADER[lang] ?? STRUCTURED_MATERIALS_HEADER.zh)
  materials.forEach(m => lines.push(`- ${m}`))
  lines.push('')
  lines.push(STRUCTURED_NOTICE_HEADER[lang] ?? STRUCTURED_NOTICE_HEADER.zh)
  lines.push(STRUCTURED_NOTICE[lang] ?? STRUCTURED_NOTICE.zh)

  return lines.join('\n')
}

/* ─── classify (category-context card) ─────────────────────────── */

function classify(answers: string[], questions: Q[]): ConsultationType {
  const idx = (i: number) => questions[i].opts.indexOf(answers[i])
  const q1 = idx(0), q2 = idx(1), q5 = idx(4), q7 = idx(6)

  if (q5 === 6) return 'REGEN_MEDICINE'
  if (q2 === 7 || q7 === 5) return 'TRAVEL_SUPPORT'
  if (q2 === 6) return 'CHECKUP'

  const byDirection: ConsultationType[] = [
    'YOUNGER_LOOK', 'SLOW_AGING', 'REGEN_MEDICINE', 'FACE_CONTOUR',
    'SURGERY', 'FATIGUE_LOOK', 'CHECKUP', 'TRAVEL_SUPPORT',
  ]
  if (q1 >= 0 && q1 < byDirection.length) return byDirection[q1]
  return 'GENERAL'
}

/* ─── classify (home-context card) ──────────────────────────────── */

function classifyHome(answers: string[], questions: Q[]): HomeType {
  const idx = (i: number) => questions[i].opts.indexOf(answers[i])
  const q1 = idx(0), q2 = idx(1), q4 = idx(3), q5 = idx(4), q7 = idx(6)

  // Q1 명확한 선택 우선 처리
  if (q1 === 2) return 'REGEN_OR_JOINT'
  if (q1 === 3) return 'SURGERY_INTEREST'
  if (q1 === 1) return 'HEALTH_CHECKUP'
  if (q2 === 1 || q2 === 2 || q2 === 3) return 'TRUST_HOSPITAL'
  if (q1 === 0) return q2 === 0 || q2 === 5 ? 'BEAUTY_EXPERIENCED' : 'BEAUTY_FIRST_TIME'
  if (q5 === 2 || q5 === 3 || q5 === 4) return 'FAMILY_TRAVEL'
  if (q1 === 4) return 'FAMILY_TRAVEL'
  if (q1 === 5) return 'TRAVEL_SUPPORT'
  if (q4 === 6 || q7 === 4) return 'TRAVEL_SUPPORT'

  // Q1 === 6 ("아직 모르겠다") — Q2·Q5·Q7 조합으로 방향 추론
  if (q7 === 5) return 'HEALTH_CHECKUP'           // Q7: 건강검진 방향 원함
  if (q7 === 1) return 'TRUST_HOSPITAL'            // Q7: 믿을 수 있는 병원/과 방향 원함
  if (q7 === 2) return 'TRAVEL_SUPPORT'            // Q7: 체류·회복 일정 안내 원함
  if (q5 === 0 && q2 === 4) return 'BEAUTY_FIRST_TIME' // 혼자, 처음 방문
  if (q2 === 6) return 'FAMILY_TRAVEL'             // Q2: 가족·친구 대신 알아보는 중
  if (q2 === 0 || q2 === 5) return 'BEAUTY_EXPERIENCED' // Q2: 경험 있거나 타국과 비교
  if (q2 === 4) return 'BEAUTY_FIRST_TIME'         // Q2: 처음
  if (q5 === 1 || q5 === 5) return 'BEAUTY_FIRST_TIME' // 친구 동행 or 아직 미정

  return 'GENERAL_HOME'                            // 극히 드문 케이스
}

/* ─── 심화 질문 (follow-up) — 홈 모드 특정 타입에만 적용 ─────────── */

interface FollowUpData {
  q: Record<string, string>
  opts: Record<string, string[]>
  suffix: Record<number, Record<string, string>>
}

const FOLLOW_UP: Partial<Record<HomeType, FollowUpData>> = {
  SURGERY_INTEREST: {
    q: {
      zh: '您对哪方面的整形最感兴趣？',
      ko: '어떤 분야의 성형에 관심이 있으신가요?',
      en: 'Which area of plastic surgery interests you most?',
      ar: 'ما هو مجال الجراحة التجميلية الذي يهمك أكثر؟',
    },
    opts: {
      zh: ['眼部整形', '鼻部整形', '面部轮廓·颧骨', '身体整形', '先了解整体方向'],
      ko: ['눈 성형', '코 성형', '얼굴 윤곽·광대', '바디 성형', '먼저 전체 방향 파악'],
      en: ['Eyes', 'Nose', 'Face contour', 'Body', 'Explore overall options first'],
      ar: ['العيون', 'الأنف', 'ملامح الوجه', 'الجسم', 'استكشاف الخيارات أولاً'],
    },
    suffix: {
      0: { zh: '（眼部整形方向已标注，我们会为您匹配相关专科。）', ko: '（눈 성형 방향으로 전문병원을 안내해 드리겠습니다.）', en: '(Eye surgery noted — we\'ll match you with relevant specialists.)', ar: '(تم تسجيل اهتمامك بجراحة العيون.)' },
      1: { zh: '（鼻部整形方向已标注，我们会整理韩国鼻整形专科方向。）', ko: '（코 성형 방향으로 한국 전문 상담을 정리해 드리겠습니다.）', en: '(Rhinoplasty noted — we\'ll arrange Korean rhinoplasty consultation.)', ar: '(تم تسجيل اهتمامك بتجميل الأنف.)' },
      2: { zh: '（面部轮廓是韩国的强项，相关方向已记录。）', ko: '（얼굴 윤곽·광대는 한국의 강점 분야입니다. 방향을 기록했습니다.）', en: '(Face contouring is a Korean specialty — direction noted.)', ar: '(ملامح الوجه من تخصصات كوريا — تم التسجيل.)' },
      3: { zh: '（身体整形方向已记录，我们会为您整理适合的选项。）', ko: '（바디 성형 방향을 기록했습니다. 적합한 옵션을 안내드리겠습니다.）', en: '(Body procedures noted — we\'ll organize suitable options.)', ar: '(تم تسجيل اهتمامك بعمليات الجسم.)' },
      4: { zh: '（我们会先帮您全面了解整形方向，再逐步锁定最适合的项目。）', ko: '（먼저 전체 성형 방향을 안내한 후 단계적으로 좁혀드리겠습니다.）', en: '(We\'ll start with an overview and narrow down to what suits you best.)', ar: '(سنبدأ بنظرة عامة ثم نحدد ما يناسبك.)' },
    },
  },
  REGEN_OR_JOINT: {
    q: {
      zh: '您最关注哪方面的再生医学咨询？',
      ko: '재생의학 중 어떤 분야에 가장 관심이 있으신가요?',
      en: 'Which area of regenerative medicine interests you most?',
      ar: 'ما هو مجال الطب التجديدي الذي يهمك أكثر؟',
    },
    opts: {
      zh: ['关节疼痛·再生修复', '干细胞抗衰老', '术后恢复加速', '干细胞整体健康', '先了解整体方向'],
      ko: ['관절 통증·재생 회복', '줄기세포 항노화', '수술 후 회복 촉진', '줄기세포 전반 건강', '먼저 전체 방향 파악'],
      en: ['Joint pain & regeneration', 'Stem cell anti-aging', 'Post-surgery recovery', 'Overall stem cell health', 'Explore overall options first'],
      ar: ['آلام المفاصل والتجديد', 'الخلايا الجذعية لمكافحة الشيخوخة', 'تسريع التعافي', 'صحة الخلايا الجذعية الشاملة', 'استكشاف الخيارات أولاً'],
    },
    suffix: {
      0: { zh: '（关节再生方向已标注，我们会为您匹配专业方向。）', ko: '（관절 재생 방향을 기록했습니다. 전문 상담 방향을 안내해 드리겠습니다.）', en: '(Joint regeneration noted — we\'ll match you with specialists.)', ar: '(تم تسجيل تجديد المفاصل.)' },
      1: { zh: '（干细胞抗衰老方向已记录，我们会为您整理专业咨询方向。）', ko: '（줄기세포 항노화 방향을 기록했습니다. 전문 방향을 안내해 드리겠습니다.）', en: '(Stem cell anti-aging noted — we\'ll organize the consultation direction.)', ar: '(تم تسجيل الخلايا الجذعية لمكافحة الشيخوخة.)' },
      2: { zh: '（术后恢复加速方向已记录。）', ko: '（수술 후 회복 촉진 방향을 기록했습니다.）', en: '(Post-surgery recovery acceleration noted.)', ar: '(تم تسجيل تسريع التعافي بعد الجراحة.)' },
      3: { zh: '（干细胞整体健康方向已记录。）', ko: '（줄기세포 전반 건강 방향을 기록했습니다.）', en: '(Overall stem cell health noted.)', ar: '(تم تسجيل صحة الخلايا الجذعية الشاملة.)' },
      4: { zh: '（没关系，我们会先帮您全面了解再生医学方向。）', ko: '（괜찮습니다. 먼저 재생의학 전반을 안내한 후 좁혀드리겠습니다.）', en: '(No problem — we\'ll start with a full overview of regenerative medicine.)', ar: '(لا بأس — سنبدأ بنظرة عامة.)' },
    },
  },
  HEALTH_CHECKUP: {
    q: {
      zh: '您最想了解哪类体检？',
      ko: '어떤 종류의 건강검진에 관심이 있으신가요?',
      en: 'What type of health checkup are you most interested in?',
      ar: 'ما نوع الفحص الصحي الذي يهمك أكثر؟',
    },
    opts: {
      zh: ['基本体检套餐', '精密综合体检', '功能医学检测', '癌症早期筛查', '先了解整体方向'],
      ko: ['기본 건강검진 패키지', '정밀 종합 건강검진', '기능의학 검사', '암 조기 검진', '먼저 전체 방향 파악'],
      en: ['Basic health checkup', 'Comprehensive checkup', 'Functional medicine', 'Cancer screening', 'Explore overall options first'],
      ar: ['فحص صحي أساسي', 'فحص شامل', 'الطب الوظيفي', 'فحص مبكر للسرطان', 'استكشاف الخيارات أولاً'],
    },
    suffix: {
      0: { zh: '（基础体检套餐方向已记录。）', ko: '（기본 건강검진 패키지 방향을 기록했습니다.）', en: '(Basic checkup package direction noted.)', ar: '(تم تسجيل الفحص الأساسي.)' },
      1: { zh: '（精密综合体检方向已记录，我们会为您整理适合的方案。）', ko: '（정밀 종합 건강검진 방향을 기록했습니다. 적합한 방안을 정리해 드리겠습니다.）', en: '(Comprehensive checkup noted — we\'ll organize suitable plans.)', ar: '(تم تسجيل الفحص الشامل.)' },
      2: { zh: '（功能医学方向已记录，这是韩国近年来快速发展的领域。）', ko: '（기능의학 방향을 기록했습니다. 한국에서 빠르게 성장하는 분야입니다.）', en: '(Functional medicine noted — a rapidly growing field in Korea.)', ar: '(تم تسجيل الطب الوظيفي — مجال سريع النمو في كوريا.)' },
      3: { zh: '（癌症早筛方向已记录，韩国在这方面有丰富经验和先进技术。）', ko: '（암 조기 검진 방향을 기록했습니다. 한국은 이 분야에서 풍부한 경험을 갖고 있습니다.）', en: '(Cancer screening noted — Korea has extensive experience in this field.)', ar: '(تم تسجيل الفحص المبكر للسرطان — كوريا لديها خبرة واسعة.)' },
      4: { zh: '（没关系，我们会先为您介绍各类体检选项及区别。）', ko: '（괜찮습니다. 먼저 각종 건강검진 옵션과 차이를 안내해 드리겠습니다.）', en: '(No problem — we\'ll introduce the different checkup options and their differences.)', ar: '(لا بأس — سنقدم لك خيارات الفحص المختلفة.)' },
    },
  },
  BEAUTY_FIRST_TIME: {
    q: {
      zh: '您最想先改善或了解的是？',
      ko: '가장 먼저 개선하거나 알고 싶은 것은 무엇인가요?',
      en: 'What would you most like to improve or learn about first?',
      ar: 'ما الذي تريد تحسينه أو معرفته أولاً؟',
    },
    opts: {
      zh: ['脸部肌肤护理', '身体轮廓管理', '抗衰老综合方案', '先了解整体选项'],
      ko: ['얼굴 피부 관리', '바디 윤곽 관리', '항노화 종합 방안', '먼저 전체 옵션 파악'],
      en: ['Facial skincare', 'Body contouring', 'Anti-aging overall', 'Explore all options first'],
      ar: ['العناية بالبشرة', 'نحت الجسم', 'مكافحة الشيخوخة', 'استكشاف الخيارات أولاً'],
    },
    suffix: {
      0: { zh: '（脸部肌肤护理方向已记录，我们会为您匹配合适的项目方向。）', ko: '（얼굴 피부 관리 방향을 기록했습니다. 적합한 항목 방향을 안내해 드리겠습니다.）', en: '(Facial skincare direction noted — we\'ll match you with suitable options.)', ar: '(تم تسجيل العناية بالبشرة.)' },
      1: { zh: '（바디 윤곽 관리 방향이 기록되었습니다.）', ko: '（바디 윤곽 관리 방향을 기록했습니다.）', en: '(Body contouring direction noted.)', ar: '(تم تسجيل نحت الجسم.)' },
      2: { zh: '（抗衰老综合方向已记录。）', ko: '（항노화 종합 방안 방향을 기록했습니다.）', en: '(Anti-aging overall direction noted.)', ar: '(تم تسجيل مكافحة الشيخوخة الشاملة.)' },
      3: { zh: '（没关系，我们会先帮您全面了解各类选项。）', ko: '（괜찮습니다. 먼저 전체 옵션을 안내해 드리겠습니다.）', en: '(No problem — we\'ll give you a full overview of all options.)', ar: '(لا بأس — سنقدم لك نظرة شاملة على الخيارات.)' },
    },
  },
  BEAUTY_EXPERIENCED: {
    q: {
      zh: '这次最想重点关注哪个方向？',
      ko: '이번에 가장 중점적으로 관심 있는 방향은 무엇인가요?',
      en: 'What would you like to focus on this time?',
      ar: 'ما الذي تريد التركيز عليه هذه المرة؟',
    },
    opts: {
      zh: ['升级护肤·院线护理', '局部改善·精细化调整', '抗衰老综合方案', '比较不同方案后再决定'],
      ko: ['업그레이드 피부관리·원내 케어', '부분 개선·정밀 조정', '항노화 종합 방안', '여러 방안 비교 후 결정'],
      en: ['Upgrade skincare / clinical care', 'Targeted improvement', 'Anti-aging overall', 'Compare options before deciding'],
      ar: ['ترقية العناية بالبشرة', 'تحسين موضعي', 'مكافحة الشيخوخة', 'المقارنة قبل القرار'],
    },
    suffix: {
      0: { zh: '（升级护肤和院线护理方向已记录。）', ko: '（업그레이드 피부관리·원내 케어 방향을 기록했습니다.）', en: '(Upgraded skincare/clinical care direction noted.)', ar: '(تم تسجيل ترقية العناية بالبشرة.)' },
      1: { zh: '（局部改善方向已记录，我们会为您整理精细化的建议。）', ko: '（부분 개선·정밀 조정 방향을 기록했습니다.）', en: '(Targeted improvement direction noted.)', ar: '(تم تسجيل التحسين الموضعي.)' },
      2: { zh: '（抗衰老综合方向已记录。）', ko: '（항노화 종합 방안 방향을 기록했습니다.）', en: '(Anti-aging overall direction noted.)', ar: '(تم تسجيل مكافحة الشيخوخة الشاملة.)' },
      3: { zh: '（我们会为您整理多个方案的对比，方便您做决定。）', ko: '（여러 방안을 비교해서 정리해 드리겠습니다.）', en: '(We\'ll organize a comparison of options to help you decide.)', ar: '(سنقدم مقارنة بين الخيارات.)' },
    },
  },
}

/* ─── styles ───────────────────────────────────────────────── */
const brand = 'var(--brand, #0077b6)'
const brandDark = 'var(--brand-dark, #003d6b)'
const textColor = 'var(--text, #1a2940)'
const mutedColor = '#7a9ab5'

const S = {
  wrap: { background: 'linear-gradient(180deg, #f0f6ff 0%, #ffffff 100%)', padding: '28px 20px 40px', borderTop: '3px solid var(--brand, #0077b6)' } as React.CSSProperties,
  titleRow: { display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 20 },
  title: { fontSize: 15, fontWeight: 700, color: brandDark, letterSpacing: '0.01em' } as React.CSSProperties,
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
interface ConsultationCardProps {
  mode?: 'home' | 'category'
  categoryId?: CategoryId
  concernId?: string
  /** Called to leave this flow and return to whatever entry screen opened it. */
  onExit?: () => void
}

export default function ConsultationCard({ mode = 'category', categoryId, concernId, onExit }: ConsultationCardProps) {
  const { lang } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [followUpAnswer, setFollowUpAnswer] = useState<string>('')

  const isHome = mode === 'home'

  const concernCard = !isHome && concernId ? CONCERN_CARDS[concernId] : undefined
  const categoryCard = !isHome && categoryId ? CATEGORY_CARDS[categoryId] : undefined
  const resolvedCard = concernCard ?? categoryCard
  const categoryLangData = resolvedCard ? (resolvedCard[lang] ?? resolvedCard.zh) : undefined

  const questions = categoryLangData
    ? categoryLangData.questions
    : isHome
      ? (lang === 'ko' ? QUESTIONS_HOME_KO : lang === 'en' ? QUESTIONS_HOME_EN : lang === 'ar' ? QUESTIONS_HOME_AR : QUESTIONS_HOME_ZH)
      : (lang === 'ko' ? QUESTIONS_KO : lang === 'en' ? QUESTIONS_EN : lang === 'ar' ? QUESTIONS_AR : QUESTIONS_ZH)

  const ui = { ...(UI[lang] ?? UI['zh']), ...(isHome ? (UI_HOME[lang] ?? UI_HOME['zh']) : {}), ...(categoryLangData ? { title: categoryLangData.title } : {}) }
  const isAr = lang === 'ar'
  const contactUrl = isAr ? WHATSAPP_URL : WECHAT_BIZ_URL

  const select = (opt: string) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
    setTimeout(() => {
      if (step < 6) {
        setStep(step + 1)
      } else {
        // 홈 모드: 분류 결과에 따라 심화 질문 표시 여부 결정
        if (isHome) {
          const type = classifyHome(next, questions)
          if (FOLLOW_UP[type]) {
            setShowFollowUp(true)
          } else {
            setSubmitted(true)
          }
        } else {
          setSubmitted(true)
        }
      }
    }, 140)
  }

  const selectFollowUp = (opt: string) => {
    setFollowUpAnswer(opt)
    setTimeout(() => {
      setShowFollowUp(false)
      setSubmitted(true)
    }, 140)
  }

  const restart = () => {
    setStep(0)
    setAnswers(Array(7).fill(''))
    setSubmitted(false)
    setCopied(false)
    setShowFollowUp(false)
    setFollowUpAnswer('')
  }

  // When this flow was opened from an entry card (e.g. the homepage ticket card),
  // "restart" means going all the way back to that entry screen, not just
  // resetting the question steps while staying open.
  const handleRestart = () => {
    if (onExit) onExit()
    else restart()
  }

  const homeType = isHome ? classifyHome(answers, questions) : undefined
  const followUpData = homeType ? FOLLOW_UP[homeType] : undefined
  const followUpSuffix = (() => {
    if (!followUpAnswer || !followUpData) return ''
    const idx = (followUpData.opts[lang] ?? followUpData.opts['zh'] ?? []).indexOf(followUpAnswer)
    if (idx < 0) return ''
    return '\n' + ((followUpData.suffix[idx]?.[lang]) ?? (followUpData.suffix[idx]?.['zh']) ?? '')
  })()

  const resultText = submitted
    ? categoryLangData
      ? categoryLangData.result
      : isHome
        ? ((RESPONSES_HOME[lang] ?? RESPONSES_HOME['zh'])[homeType ?? 'GENERAL_HOME'] ?? '') + followUpSuffix
        : (RESPONSES[lang] ?? RESPONSES['zh'])[classify(answers, questions)]
    : ''

  const consultationType = categoryLangData
    ? stripBrackets(categoryLangData.copyHeader || categoryLangData.title)
    : stripBrackets(isHome ? (COPY_HEADER_HOME[lang] ?? COPY_HEADER_HOME['zh']) : ui.title)

  const materialsId = concernCard ? concernId : categoryCard ? categoryId : undefined

  const copyText = buildStructuredCopyText({
    lang,
    consultationType,
    questions,
    answers,
    result: resultText,
    materialsId,
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  // 진행바: 7문항 기준 고정 (follow-up은 보너스 스텝, bar 안 줄어듦)
  const progress = submitted ? 1 : showFollowUp ? 1 : step / 7

  return (
    <div style={S.wrap}>
      {onExit && (
        <button type="button" style={{ ...S.backBtn, marginBottom: 14 }} onClick={onExit}>
          {ui.exit}
        </button>
      )}

      <div style={S.titleRow}>
        <p style={S.title}>{ui.title}</p>
        <button className="cc-reset-btn" onClick={handleRestart}>{ui.restart}</button>
      </div>

      <div style={S.progressTrack}>
        <motion.div
          style={{ height: '100%', background: brand, borderRadius: 2 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showFollowUp && followUpData ? (
          /* ── 심화 질문 단계 ── */
          <motion.div
            key="follow-up"
            initial={{ opacity: 0, x: isAr ? -18 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? 18 : -18 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p style={S.stepLabel}>{ui.step}8 / 8</p>
            <p style={S.questionText}>{followUpData.q[lang] ?? followUpData.q['zh']}</p>
            <div style={S.chipsWrap}>
              {(followUpData.opts[lang] ?? followUpData.opts['zh'] ?? []).map(opt => (
                <button key={opt} style={S.chip(followUpAnswer === opt)} onClick={() => selectFollowUp(opt)}>
                  {opt}
                </button>
              ))}
            </div>
            <button style={S.backBtn} onClick={() => { setShowFollowUp(false); setStep(6) }}>
              {ui.back}
            </button>
          </motion.div>
        ) : !submitted ? (
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <TtsButton text={resultText} lang={lang} />
              </div>
              <p style={S.resultText}>{resultText}</p>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
