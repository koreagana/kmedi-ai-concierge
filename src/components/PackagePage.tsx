import { WECHAT_BIZ_URL, WHATSAPP_URL } from '../data/contacts'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { ContactSection, MedicalNetworkSection, FooterSection } from './HomePage'


const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

/* ── types ─────────────────────────────────────────────── */
type ItemType = 'medical' | 'service' | 'spot' | 'food' | 'shop' | 'rest'
interface DayItem { text: string; type: ItemType }
interface DayData { day: number; title: string; items: DayItem[] }
type SlotKey = 'day1Spot' | 'day2Spot' | 'day3MorningSpot' | 'day3AftShop'
type Selections = Record<SlotKey, string>

/* ── i18n ──────────────────────────────────────────────── */
interface PackageLang {
  backHome: string
  heroTitle: string
  heroTag: string
  heroDesc: string
  heroBtn: string
  heroNote: string
  includesTitle: string
  includesNote: string
  includes: string[]
  priceTitle: string
  priceNote: string
  prices: { group: string; price: string; unit: string }[]
  selectTitle: string
  selectDesc: string
  selectDayLabels: Record<string, string>
  slotLabels: Record<SlotKey, string>
  slotSummaryLabels: Record<SlotKey, string>
  mySummaryTitle: string
  itineraryTitle: string
  itineraryNote: string
  dayTitles: string[]
  adjustTitle: string
  adjustNote: string
  adjustable: { label: string; options: string }[]
  philosophyLabel: string
  philosophyTitle: string
  philosophyDesc: string
  ctaTitle: string
  ctaDesc: string
  ctaBtn: string
  spotOptions: string[]
  shopOptions: string[]
  defaultSelections: Selections
  dayItems: (sel: Selections) => DayData[]
}

const ZH: PackageLang = {
  backHome: '← 返回首页',
  heroTitle: '汉江春天 3晚4天方案',
  heroTag: '医疗咨询 · 翻译陪同 · 行程协助 · 韩国停留安排',
  heroDesc: '从医疗咨询到韩国停留，我们为您整理更安心、更清晰的 3晚4天赴韩行程。',
  heroBtn: '联系顾问咨询',
  heroNote: '医疗费用不包含在本方案内，具体医疗项目需另行咨询确认。',
  includesTitle: '方案包含什么？',
  includesNote: '不含酒店及医疗费用。酒店可根据需要单独协助安排。',
  includes: ['医疗咨询与到院协助', '中文翻译沟通', '车辆与基础行程安排', '首尔核心景点 4处', '自由购物时间 2次', '医院访问 3次', '可选韩式体验'],
  priceTitle: '参考价格（3晚4天基础行程）',
  priceNote: '费用包含车辆、医院陪同、景点安排及基础行程陪同。\n不包含医疗费用、选诊项目、个人购物及机票等。\n最终价格可能根据人数、行程安排、选诊项目及汇率有所调整。',
  prices: [
    { group: '1 人', price: '12,000', unit: '元 / 人' },
    { group: '2 人', price: '10,000 ~ 10,500', unit: '元 / 人' },
    { group: '3 人', price: '9,500', unit: '元 / 人' },
    { group: '4 人', price: '8,800 ~ 9,000', unit: '元 / 人' },
  ],
  selectTitle: '可自由调整景点与购物地点',
  selectDesc: '在下方选择您偏好的景点与购物地点，行程安排将自动更新。',
  selectDayLabels: { DAY1: 'DAY 1', DAY2: 'DAY 2', DAY3: 'DAY 3' },
  slotLabels: { day1Spot: '景点', day2Spot: '下午景点', day3MorningSpot: '上午景点', day3AftShop: '下午购物地点' },
  slotSummaryLabels: { day1Spot: '第1天景点', day2Spot: '第2天下午景点', day3MorningSpot: '第3天上午景点', day3AftShop: '第3天下午购物地点' },
  mySummaryTitle: '我的行程选择',
  itineraryTitle: '3晚4天行程安排',
  itineraryNote: '以下行程已根据您的选择自动更新。',
  dayTitles: ['抵达首尔', '医疗咨询与恢复', '体验与自由购物', '复查与离境'],
  adjustTitle: '可根据客户喜好调整',
  adjustNote: '具体景点、购物地点与体验项目，可根据客户时间、体力、医疗安排与个人喜好调整。',
  adjustable: [
    { label: '景点', options: '北村韩屋村 · 仁寺洞 · 南山塔 · 清溪川 · 广藏市场 等 17处可选' },
    { label: '购物', options: 'The Hyundai Seoul · 明洞 · 乐天 · 新世界 · COEX 等 18处可选' },
    { label: '体验', options: '韩式料理课程 · K-POP舞蹈 · 唱歌体验' },
    { label: '医疗咨询', options: '根据客户需求调整组合' },
  ],
  philosophyLabel: '这不是普通旅游行程',
  philosophyTitle: '汉江春天 3晚4天方案，\n不是简单把医院和景点排在一起。',
  philosophyDesc: '我们会根据您的医疗咨询需求、恢复时间、移动距离与停留节奏，帮您安排更轻松、更安心的韩国行程。',
  ctaTitle: '想了解适合您的 3晚4天方案？',
  ctaDesc: '告诉我们您的来韩时间、关注项目、\n同行人数与预算范围，\n我们会先为您整理适合的行程方向。',
  ctaBtn: '联系顾问咨询',
  spotOptions: ['北村韩屋村', '仁寺洞', '南山首尔塔', '汉江公园', '清溪川', '广藏市场', '益善洞', '昌德宫', '德寿宫', '东大门设计广场 DDP', 'COEX 星光图书馆', '圣水洞', '弘大步行街', '林荫道', '梨泰院', '西村', '首尔天空观景台'],
  shopOptions: ['现代百货 The Hyundai Seoul', '明洞', '乐天百货总店', '新世界百货总店', '现代百货狎鸥亭总店', 'Starfield COEX Mall', '乐天世界购物城', 'IFC Mall', '时代广场 Times Square', '现代百货贸易中心店', 'Galeria 名品馆', '狎鸥亭罗德奥', '林荫道', '圣水洞买手店街区', '弘大购物街', '东大门时尚城', '高速巴士地下商街 GOTO Mall', 'Common Ground'],
  defaultSelections: { day1Spot: '北村韩屋村', day2Spot: '仁寺洞', day3MorningSpot: '景福宫', day3AftShop: '现代百货 The Hyundai Seoul' },
  dayItems: (sel) => [
    { day: 1, title: '抵达首尔', items: [{ text: '入境', type: 'rest' }, { text: '机场接送', type: 'service' }, { text: '入住酒店', type: 'rest' }, { text: '第1次到院：初诊咨询 / 基本检查', type: 'medical' }, { text: sel.day1Spot, type: 'spot' }, { text: '韩式烤肉晚餐', type: 'food' }] },
    { day: 2, title: '医疗咨询与恢复', items: [{ text: '酒店早餐', type: 'food' }, { text: '第2次到院：医疗项目', type: 'medical' }, { text: 'Sudam 韩定食', type: 'food' }, { text: '恢复 / 再生管理', type: 'rest' }, { text: sel.day2Spot, type: 'spot' }, { text: '参鸡汤晚餐', type: 'food' }] },
    { day: 3, title: '体验与自由购物', items: [{ text: '酒店早餐', type: 'food' }, { text: '可选体验', type: 'spot' }, { text: sel.day3MorningSpot, type: 'spot' }, { text: '景点午餐', type: 'food' }, { text: `自由购物：${sel.day3AftShop}`, type: 'shop' }, { text: '晚餐自由选择', type: 'food' }] },
    { day: 4, title: '复查与离境', items: [{ text: '酒店早餐', type: 'food' }, { text: '第3次到院：术后复查', type: 'medical' }, { text: '自由简餐', type: 'food' }, { text: '离境准备', type: 'rest' }, { text: '前往机场', type: 'service' }, { text: '如有需要可安排免税购物', type: 'shop' }] },
  ],
}

const KO: PackageLang = {
  backHome: '← 홈으로',
  heroTitle: '3박 4일 한국 의료·웰니스 컨시어지 패키지',
  heroTag: '의료상담 · 통역 동행 · 일정 협조 · 한국 체류 안내',
  heroDesc: '1인 기준 USD 1,300부터. 의료상담부터 한국 체류까지, 더 안심하고 방한하실 수 있도록 정리해 드립니다.',
  heroBtn: '컨시어지에게 연락',
  heroNote: '의료비는 본 패키지에 포함되지 않으며, 구체적인 의료 항목은 별도 확인이 필요합니다.',
  includesTitle: '패키지에 포함된 것은?',
  includesNote: '호텔 및 의료비 미포함. 호텔은 필요 시 별도 안내 가능.',
  includes: ['의료상담 및 병원 동행', '한국어·중국어 통역 소통', '차량 및 기본 일정 안내', '서울 핵심 관광지 4곳', '자유 쇼핑 시간 2회', '병원 방문 3회', '선택 한국 체험'],
  priceTitle: '3박 4일 기본 일정 참고 가격',
  priceNote: '비용에는 차량, 병원 동행, 관광지 안내, 기본 일정 동행이 포함됩니다.\n병원비, 선택 진료비, 개인 쇼핑비, 항공권은 별도입니다.\n최종 금액은 인원수, 일정, 선택 진료 항목, 환율에 따라 달라질 수 있습니다.',
  prices: [
    { group: '1인', price: 'USD 1,800', unit: '/ 인' },
    { group: '2인', price: 'USD 1,500 ~ 1,550', unit: '/ 인' },
    { group: '3인', price: 'USD 1,400', unit: '/ 인' },
    { group: '4인', price: 'USD 1,300 ~ 1,350', unit: '/ 인' },
  ],
  selectTitle: '관광지 및 쇼핑 장소 자유 선택',
  selectDesc: '아래에서 선호하는 관광지와 쇼핑 장소를 선택하면 일정이 자동으로 업데이트됩니다.',
  selectDayLabels: { DAY1: 'DAY 1', DAY2: 'DAY 2', DAY3: 'DAY 3' },
  slotLabels: { day1Spot: '관광지', day2Spot: '오후 관광지', day3MorningSpot: '오전 관광지', day3AftShop: '오후 쇼핑 장소' },
  slotSummaryLabels: { day1Spot: '1일차 관광지', day2Spot: '2일차 오후 관광지', day3MorningSpot: '3일차 오전 관광지', day3AftShop: '3일차 오후 쇼핑' },
  mySummaryTitle: '나의 일정 선택',
  itineraryTitle: '3박4일 일정',
  itineraryNote: '아래 일정은 선택에 따라 자동 업데이트됩니다.',
  dayTitles: ['서울 도착', '의료상담 및 회복', '체험 및 자유 쇼핑', '재진 및 출국'],
  adjustTitle: '고객 취향에 따라 조정 가능',
  adjustNote: '구체적인 관광지, 쇼핑 장소, 체험은 고객의 시간, 체력, 의료 일정, 개인 취향에 맞게 조정 가능합니다.',
  adjustable: [
    { label: '관광지', options: '북촌한옥마을 · 인사동 · 남산타워 · 청계천 · 광장시장 등 17곳' },
    { label: '쇼핑', options: 'The Hyundai Seoul · 명동 · 롯데 · 신세계 · COEX 등 18곳' },
    { label: '체험', options: '한식 요리 클래스 · K-POP 댄스 · 노래 체험' },
    { label: '의료상담', options: '고객 니즈에 맞게 조합 조정' },
  ],
  philosophyLabel: '이건 일반 관광 일정이 아닙니다',
  philosophyTitle: '한강애봄 3박4일 패키지는\n단순히 병원과 관광지를 나열한 것이 아닙니다.',
  philosophyDesc: '고객의 의료상담 니즈, 회복 시간, 이동 거리, 체류 리듬에 맞게 더 편안하고 안심할 수 있는 한국 일정을 안내해 드립니다.',
  ctaTitle: '나에게 맞는 3박4일 패키지를 알고 싶으신가요?',
  ctaDesc: '방한 시기, 관심 항목,\n동행 인원과 예산 범위를 알려주시면,\n적합한 일정 방향을 먼저 정리해 드리겠습니다.',
  ctaBtn: '컨시어지에게 연락',
  spotOptions: ['북촌한옥마을', '인사동', '남산서울타워', '한강공원', '청계천', '광장시장', '익선동', '창덕궁', '덕수궁', '동대문디자인플라자 DDP', 'COEX 별마당도서관', '성수동', '홍대 거리', '가로수길', '이태원', '서촌', '서울스카이 전망대'],
  shopOptions: ['현대백화점 The Hyundai Seoul', '명동', '롯데백화점 본점', '신세계백화점 본점', '현대백화점 압구정 본점', 'Starfield COEX Mall', '롯데월드몰', 'IFC Mall', '타임스퀘어', '현대백화점 무역센터점', 'Galeria 명품관', '압구정 로데오', '가로수길', '성수동 편집샵 거리', '홍대 쇼핑거리', '동대문 패션타운', '고속터미널 지하상가 GOTO Mall', 'Common Ground'],
  defaultSelections: { day1Spot: '북촌한옥마을', day2Spot: '인사동', day3MorningSpot: '경복궁', day3AftShop: '현대백화점 The Hyundai Seoul' },
  dayItems: (sel) => [
    { day: 1, title: '서울 도착', items: [{ text: '입국', type: 'rest' }, { text: '공항 픽업', type: 'service' }, { text: '호텔 체크인', type: 'rest' }, { text: '1차 병원: 초진 상담 / 기본 검사', type: 'medical' }, { text: sel.day1Spot, type: 'spot' }, { text: '한국 바비큐 저녁', type: 'food' }] },
    { day: 2, title: '의료상담 및 회복', items: [{ text: '호텔 조식', type: 'food' }, { text: '2차 병원: 의료 항목', type: 'medical' }, { text: 'Sudam 한정식', type: 'food' }, { text: '회복 / 재생 관리', type: 'rest' }, { text: sel.day2Spot, type: 'spot' }, { text: '삼계탕 저녁', type: 'food' }] },
    { day: 3, title: '체험 및 자유 쇼핑', items: [{ text: '호텔 조식', type: 'food' }, { text: '선택 체험', type: 'spot' }, { text: sel.day3MorningSpot, type: 'spot' }, { text: '관광지 점심', type: 'food' }, { text: `자유 쇼핑: ${sel.day3AftShop}`, type: 'shop' }, { text: '저녁 자유 선택', type: 'food' }] },
    { day: 4, title: '재진 및 출국', items: [{ text: '호텔 조식', type: 'food' }, { text: '3차 병원: 사후 점검', type: 'medical' }, { text: '간단한 자유 식사', type: 'food' }, { text: '출국 준비', type: 'rest' }, { text: '공항 이동', type: 'service' }, { text: '필요 시 면세 쇼핑 안내', type: 'shop' }] },
  ],
}

const EN: PackageLang = {
  backHome: '← Back to Home',
  heroTitle: '3 Nights 4 Days Korea Medical & Wellness Concierge Package',
  heroTag: 'Medical Consultation · Interpreter Escort · Itinerary Support · Korea Stay',
  heroDesc: 'From USD 1,300 per person. From medical consultation to your stay in Korea — we plan a clearer, more comfortable 3-night 4-day journey for you.',
  heroBtn: 'Contact a Concierge',
  heroNote: 'Medical costs are not included in this package and must be confirmed separately.',
  includesTitle: "What's Included?",
  includesNote: 'Hotel and medical costs not included. Hotel can be arranged separately on request.',
  includes: ['Medical consultation & hospital escort', 'Interpreter communication', 'Vehicle & basic itinerary arrangement', '4 key Seoul attractions', '2 free shopping sessions', '3 hospital visits', 'Optional Korean experience'],
  priceTitle: 'Estimated Price for 3 Nights 4 Days',
  priceNote: 'Includes vehicle service, hospital escort, attraction visits, and basic itinerary support.\nMedical fees, optional treatments, personal shopping, and airfare are not included.\nFinal price may vary depending on group size, itinerary, selected treatments, and exchange rates.',
  prices: [
    { group: '1 person', price: 'USD 1,800', unit: '/ person' },
    { group: '2 people', price: 'USD 1,500 ~ 1,550', unit: '/ person' },
    { group: '3 people', price: 'USD 1,400', unit: '/ person' },
    { group: '4 people', price: 'USD 1,300 ~ 1,350', unit: '/ person' },
  ],
  selectTitle: 'Customize Your Attractions & Shopping',
  selectDesc: 'Select your preferred attractions and shopping spots below — the itinerary updates automatically.',
  selectDayLabels: { DAY1: 'DAY 1', DAY2: 'DAY 2', DAY3: 'DAY 3' },
  slotLabels: { day1Spot: 'Attraction', day2Spot: 'Afternoon Attraction', day3MorningSpot: 'Morning Attraction', day3AftShop: 'Afternoon Shopping' },
  slotSummaryLabels: { day1Spot: 'Day 1 Attraction', day2Spot: 'Day 2 Afternoon Attraction', day3MorningSpot: 'Day 3 Morning Attraction', day3AftShop: 'Day 3 Afternoon Shopping' },
  mySummaryTitle: 'My Itinerary Choices',
  itineraryTitle: '3 Nights / 4 Days Itinerary',
  itineraryNote: 'The itinerary below updates automatically based on your selections.',
  dayTitles: ['Arrival in Seoul', 'Medical Consultation & Recovery', 'Experience & Free Shopping', 'Follow-up & Departure'],
  adjustTitle: 'Customizable to Your Preferences',
  adjustNote: 'Specific attractions, shopping spots, and experiences can be adjusted based on your schedule, energy, medical plan, and personal preferences.',
  adjustable: [
    { label: 'Attractions', options: 'Bukchon Hanok Village · Insadong · Namsan Tower · Cheonggyecheon · Gwangjang Market — 17 options' },
    { label: 'Shopping', options: 'The Hyundai Seoul · Myeongdong · Lotte · Shinsegae · COEX — 18 options' },
    { label: 'Experiences', options: 'Korean Cooking Class · K-POP Dance · Singing Experience' },
    { label: 'Medical', options: 'Combination adjusted to client needs' },
  ],
  philosophyLabel: 'This is not an ordinary tour',
  philosophyTitle: 'The K-MediSpring 3N4D Package\nis not just hospitals and attractions stitched together.',
  philosophyDesc: 'We plan a lighter, more reassuring Korea itinerary tailored to your medical consultation needs, recovery time, travel distance, and stay rhythm.',
  ctaTitle: 'Want to know the right 3N4D plan for you?',
  ctaDesc: 'Tell us your Korea visit timing, areas of interest,\ngroup size and budget range,\nand we will organize the best direction for you first.',
  ctaBtn: 'Contact a Concierge',
  spotOptions: ['Bukchon Hanok Village', 'Insadong', 'Namsan Seoul Tower', 'Hangang Park', 'Cheonggyecheon', 'Gwangjang Market', 'Ikseon-dong', 'Changdeokgung Palace', 'Deoksugung Palace', 'DDP (Dongdaemun Design Plaza)', 'COEX Starfield Library', 'Seongsu-dong', 'Hongdae Street', 'Garosu-gil', 'Itaewon', 'Seochon', 'Seoul Sky Observatory'],
  shopOptions: ['The Hyundai Seoul', 'Myeongdong', 'Lotte Dept. Main', 'Shinsegae Dept. Main', 'Hyundai Apgujeong Main', 'Starfield COEX Mall', 'Lotte World Mall', 'IFC Mall', 'Times Square', 'Hyundai COEX', 'Galeria Luxury Hall', 'Apgujeong Rodeo', 'Garosu-gil', 'Seongsu Select Shops', 'Hongdae Shopping St.', 'Dongdaemun Fashion Town', 'GOTO Mall', 'Common Ground'],
  defaultSelections: { day1Spot: 'Bukchon Hanok Village', day2Spot: 'Insadong', day3MorningSpot: 'Gyeongbokgung Palace', day3AftShop: 'The Hyundai Seoul' },
  dayItems: (sel) => [
    { day: 1, title: 'Arrival in Seoul', items: [{ text: 'Entry / Immigration', type: 'rest' }, { text: 'Airport pickup', type: 'service' }, { text: 'Hotel check-in', type: 'rest' }, { text: 'Visit 1: Initial consultation / Basic check', type: 'medical' }, { text: sel.day1Spot, type: 'spot' }, { text: 'Korean BBQ dinner', type: 'food' }] },
    { day: 2, title: 'Medical Consultation & Recovery', items: [{ text: 'Hotel breakfast', type: 'food' }, { text: 'Visit 2: Medical treatment', type: 'medical' }, { text: 'Sudam Korean set meal', type: 'food' }, { text: 'Recovery / regenerative care', type: 'rest' }, { text: sel.day2Spot, type: 'spot' }, { text: 'Samgyetang dinner', type: 'food' }] },
    { day: 3, title: 'Experience & Free Shopping', items: [{ text: 'Hotel breakfast', type: 'food' }, { text: 'Optional experience', type: 'spot' }, { text: sel.day3MorningSpot, type: 'spot' }, { text: 'Lunch near attraction', type: 'food' }, { text: `Free shopping: ${sel.day3AftShop}`, type: 'shop' }, { text: 'Dinner — free choice', type: 'food' }] },
    { day: 4, title: 'Follow-up & Departure', items: [{ text: 'Hotel breakfast', type: 'food' }, { text: 'Visit 3: Post-procedure check', type: 'medical' }, { text: 'Light free meal', type: 'food' }, { text: 'Departure preparation', type: 'rest' }, { text: 'Transfer to airport', type: 'service' }, { text: 'Duty-free shopping if needed', type: 'shop' }] },
  ],
}

const AR: PackageLang = {
  backHome: '← العودة للرئيسية',
  heroTitle: '3 ليالٍ و4 أيام باقة كونسيرج طبية وعافية في كوريا',
  heroTag: 'استشارة طبية · مرافق مترجم · دعم الجدول · الإقامة في كوريا',
  heroDesc: 'ابتداءً من USD 1,300 للشخص الواحد. من الاستشارة الطبية إلى إقامتك في كوريا — نخطط لرحلة أكثر وضوحاً وراحة.',
  heroBtn: 'تواصل مع كونسيرج',
  heroNote: 'التكاليف الطبية غير مشمولة في هذه الباقة ويجب تأكيدها بشكل منفصل.',
  includesTitle: 'ماذا تشمل الباقة؟',
  includesNote: 'لا تشمل تكاليف الفندق والرعاية الطبية. يمكن ترتيب الفندق بشكل منفصل عند الطلب.',
  includes: ['استشارة طبية ومرافقة للمستشفى', 'تواصل مع مترجم', 'سيارة وترتيب جدول أساسي', '4 معالم رئيسية في سيول', 'جلستا تسوق حر', '3 زيارات للمستشفى', 'تجربة كورية اختيارية'],
  priceTitle: 'السعر التقديري لبرنامج 3 ليالٍ و4 أيام',
  priceNote: 'يشمل السعر خدمة السيارة، والمرافقة إلى المستشفى، وزيارات المعالم السياحية، والدعم الأساسي للبرنامج.\nلا يشمل السعر الرسوم الطبية، والعلاجات الاختيارية، والتسوق الشخصي، وتذاكر الطيران.\nقد يختلف السعر النهائي حسب عدد الأشخاص، والبرنامج، والعلاجات المختارة، وسعر الصرف.',
  prices: [
    { group: '1 شخص', price: 'USD 1,800', unit: '/ شخص' },
    { group: '2 أشخاص', price: 'USD 1,500 ~ 1,550', unit: '/ شخص' },
    { group: '3 أشخاص', price: 'USD 1,400', unit: '/ شخص' },
    { group: '4 أشخاص', price: 'USD 1,300 ~ 1,350', unit: '/ شخص' },
  ],
  selectTitle: 'خصص المعالم والتسوق',
  selectDesc: 'اختر المعالم ومواقع التسوق المفضلة أدناه — سيتحدث الجدول تلقائياً.',
  selectDayLabels: { DAY1: 'اليوم 1', DAY2: 'اليوم 2', DAY3: 'اليوم 3' },
  slotLabels: { day1Spot: 'معلم', day2Spot: 'معلم بعد الظهر', day3MorningSpot: 'معلم الصباح', day3AftShop: 'تسوق بعد الظهر' },
  slotSummaryLabels: { day1Spot: 'معلم اليوم 1', day2Spot: 'معلم اليوم 2 بعد الظهر', day3MorningSpot: 'معلم اليوم 3 صباحاً', day3AftShop: 'تسوق اليوم 3 بعد الظهر' },
  mySummaryTitle: 'اختياراتي للجدول',
  itineraryTitle: 'جدول 3 ليالٍ / 4 أيام',
  itineraryNote: 'يتحدث الجدول أدناه تلقائياً بناءً على اختياراتك.',
  dayTitles: ['الوصول إلى سيول', 'استشارة طبية وتعافٍ', 'تجربة وتسوق حر', 'متابعة ومغادرة'],
  adjustTitle: 'قابل للتخصيص حسب تفضيلاتك',
  adjustNote: 'يمكن تعديل المعالم ومواقع التسوق والتجارب بناءً على جدولك وطاقتك وخطتك الطبية وتفضيلاتك الشخصية.',
  adjustable: [
    { label: 'معالم', options: 'قرية بوكتشون · إنسادونغ · برج نامسان · حديقة هانغانغ · سوق غوانجانغ — 17 خياراً' },
    { label: 'تسوق', options: 'The Hyundai Seoul · ميونغدونغ · لوتي · شينسيغي · COEX — 18 خياراً' },
    { label: 'تجارب', options: 'درس طبخ كوري · رقص K-POP · تجربة غناء' },
    { label: 'طبي', options: 'تعديل التركيبة حسب احتياجات العميل' },
  ],
  philosophyLabel: 'هذه ليست جولة سياحية عادية',
  philosophyTitle: 'باقة كيمديسبرينج 3 ليالٍ/4 أيام\nليست مجرد مستشفيات ومعالم مجمّعة.',
  philosophyDesc: 'نخطط لرحلة كوريا أخف وأكثر طمأنينة مصممة خصيصاً لاحتياجات استشارتك الطبية ووقت التعافي والمسافات والإيقاع.',
  ctaTitle: 'هل تريد معرفة الباقة المناسبة لك؟',
  ctaDesc: 'أخبرنا بموعد زيارتك لكوريا ومجالات اهتمامك\nوعدد المرافقين ونطاق الميزانية،\nوسنرتب لك أفضل اتجاه أولاً.',
  ctaBtn: 'تواصل مع كونسيرج',
  spotOptions: ['قرية بوكتشون هانوك', 'إنسادونغ', 'برج سيول نامسان', 'حديقة هانغانغ', 'تشيونغيتشيون', 'سوق غوانجانغ', 'إيكسيون-دونغ', 'قصر تشانغديوك', 'قصر ديوكسو', 'DDP دونغداي مون', 'مكتبة ستارفيلد COEX', 'سيونغسو-دونغ', 'شارع هونغداي', 'غاروسو-غيل', 'إيتايون', 'سيوتشون', 'مرصد سيول سكاي'],
  shopOptions: ['The Hyundai Seoul', 'ميونغدونغ', 'لوتي الرئيسي', 'شينسيغي الرئيسي', 'هيونداي أبغوجيونغ', 'Starfield COEX Mall', 'لوتي وورلد مول', 'IFC Mall', 'تايمز سكوير', 'هيونداي COEX', 'غالاريا لوكس', 'أبغوجيونغ رودييو', 'غاروسو-غيل', 'محلات سيونغسو', 'هونغداي للتسوق', 'دونغداي مون للأزياء', 'GOTO Mall', 'Common Ground'],
  defaultSelections: { day1Spot: 'قرية بوكتشون هانوك', day2Spot: 'إنسادونغ', day3MorningSpot: 'قصر غيونغبوك', day3AftShop: 'The Hyundai Seoul' },
  dayItems: (sel) => [
    { day: 1, title: 'الوصول إلى سيول', items: [{ text: 'الدخول / الهجرة', type: 'rest' }, { text: 'استقبال المطار', type: 'service' }, { text: 'تسجيل الوصول في الفندق', type: 'rest' }, { text: 'زيارة 1: استشارة أولية / فحص أساسي', type: 'medical' }, { text: sel.day1Spot, type: 'spot' }, { text: 'عشاء شواء كوري', type: 'food' }] },
    { day: 2, title: 'استشارة طبية وتعافٍ', items: [{ text: 'إفطار الفندق', type: 'food' }, { text: 'زيارة 2: العلاج الطبي', type: 'medical' }, { text: 'وجبة سودام الكورية', type: 'food' }, { text: 'تعافٍ / رعاية تجديدية', type: 'rest' }, { text: sel.day2Spot, type: 'spot' }, { text: 'عشاء سامغيتانغ', type: 'food' }] },
    { day: 3, title: 'تجربة وتسوق حر', items: [{ text: 'إفطار الفندق', type: 'food' }, { text: 'تجربة اختيارية', type: 'spot' }, { text: sel.day3MorningSpot, type: 'spot' }, { text: 'غداء قرب المعلم', type: 'food' }, { text: `تسوق حر: ${sel.day3AftShop}`, type: 'shop' }, { text: 'عشاء — اختيار حر', type: 'food' }] },
    { day: 4, title: 'متابعة ومغادرة', items: [{ text: 'إفطار الفندق', type: 'food' }, { text: 'زيارة 3: فحص ما بعد الإجراء', type: 'medical' }, { text: 'وجبة خفيفة حرة', type: 'food' }, { text: 'الاستعداد للمغادرة', type: 'rest' }, { text: 'التوجه للمطار', type: 'service' }, { text: 'تسوق معفي من الضريبة إذا لزم', type: 'shop' }] },
  ],
}

/* ── item dot colors ──────────────────────────────────────── */
const itemColor: Record<ItemType, string> = {
  medical: '#0077b6', service: '#4a9cc7', spot: '#5a8fa8',
  food: '#7a9ab5', shop: '#6b8ca5', rest: '#9ab0c0',
}

function SelectArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <path d="M3 4.5l3 3 3-3" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── component ─────────────────────────────────────────────── */
export default function PackagePage() {
  const { lang, goHome } = useApp()
  const p = lang === 'ko' ? KO : lang === 'en' ? EN : lang === 'ar' ? AR : ZH
  const isAr = lang === 'ar'
  const contactUrl = isAr ? WHATSAPP_URL : WECHAT_BIZ_URL

  const [selections, setSelections] = useState<Selections>(p.defaultSelections)
  const days = p.dayItems(selections)
  const updateSlot = (key: SlotKey, value: string) => setSelections(s => ({ ...s, [key]: value }))

  const SLOT_GROUPS = [
    { dayKey: 'DAY1', slots: [{ key: 'day1Spot' as SlotKey, slotType: 'spot' as const }] },
    { dayKey: 'DAY2', slots: [{ key: 'day2Spot' as SlotKey, slotType: 'spot' as const }] },
    { dayKey: 'DAY3', slots: [{ key: 'day3MorningSpot' as SlotKey, slotType: 'spot' as const }, { key: 'day3AftShop' as SlotKey, slotType: 'shop' as const }] },
  ]
  const ALL_SLOT_KEYS: SlotKey[] = ['day1Spot', 'day2Spot', 'day3MorningSpot', 'day3AftShop']

  const getOptions = (slotType: 'spot' | 'shop') => slotType === 'shop' ? p.shopOptions : p.spotOptions

  return (
    <div>
      {/* ══ Hero ══════════════════════════════════════════════ */}
      <div className="cat-hero" style={{ paddingBottom: 36 }}>
        <motion.button className="cat-back-btn" onClick={goHome} {...fadeUp}>
          {p.backHome}
        </motion.button>
        <motion.h1 className="cat-hero-name" {...fadeUp} transition={{ delay: 0.05 }}>
          {p.heroTitle}
        </motion.h1>
        <motion.p className="cat-hero-tag" {...fadeUp} transition={{ delay: 0.1 }}>
          {p.heroTag}
        </motion.p>
        <motion.p {...fadeUp} transition={{ delay: 0.15 }} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginTop: 14, marginBottom: 22 }}>
          {p.heroDesc}
        </motion.p>
        <motion.button {...fadeUp} transition={{ delay: 0.2 }} onClick={() => window.open(contactUrl, '_blank')}
          style={{ width: '100%', padding: '14px 0', borderRadius: 12, background: 'white', border: 'none', color: 'var(--brand-dark, #003d6b)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em', marginBottom: 14 }}>
          {p.heroBtn}
        </motion.button>
        <motion.p {...fadeUp} transition={{ delay: 0.22 }} style={{ fontSize: 10, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, textAlign: 'center' }}>
          {p.heroNote}
        </motion.p>
      </div>

      {/* ══ Includes ══════════════════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">{p.includesTitle}</p>
          <div className="section-accent-line" />
        </motion.div>
        <motion.div {...fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 18 }}>
          {p.includes.map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 2, color: 'var(--brand)' }}>✓</span>
              <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </motion.div>
        <motion.p {...fadeUp} style={{ fontSize: 11, color: 'var(--text-muted)', background: 'rgba(0,119,182,0.05)', border: '1px solid rgba(0,119,182,0.14)', borderRadius: 8, padding: '9px 12px' }}>
          {p.includesNote}
        </motion.p>
      </section>

      {/* ══ Price ═════════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">{p.priceTitle}</p>
          <div className="section-accent-line" />
        </motion.div>
        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {p.prices.map((pr, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', border: '1px solid rgba(0,119,182,0.14)', borderLeft: '3px solid var(--brand)', borderRadius: 10, padding: '14px 16px' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{pr.group}</span>
              <span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-dark, #003d6b)', letterSpacing: '-0.02em' }}>{pr.price}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>{pr.unit}</span>
              </span>
            </div>
          ))}
        </motion.div>
        <motion.p {...fadeUp} style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {p.priceNote}
        </motion.p>
      </section>

      {/* ══ Slot selector ═════════════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 36 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">{p.selectTitle}</p>
          <div className="section-accent-line" />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 22 }}>{p.selectDesc}</p>
        </motion.div>
        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SLOT_GROUPS.map(group => (
            <div key={group.dayKey}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'white', background: 'var(--brand)', borderRadius: 20, padding: '3px 10px', letterSpacing: '0.1em', flexShrink: 0 }}>
                  {p.selectDayLabels[group.dayKey]}
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(0,119,182,0.12)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.slots.map(slot => (
                  <div key={slot.key} style={{ background: 'white', border: '1px solid rgba(0,119,182,0.15)', borderLeft: `3px solid ${slot.slotType === 'shop' ? '#6b8ca5' : 'var(--brand)'}`, borderRadius: 10, padding: '12px 14px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: slot.slotType === 'shop' ? '#6b8ca5' : 'var(--brand)', marginBottom: 8, letterSpacing: '0.06em' }}>
                      {p.slotLabels[slot.key]}
                    </p>
                    <div style={{ position: 'relative' }}>
                      <select value={selections[slot.key]} onChange={e => updateSlot(slot.key, e.target.value)}
                        style={{ width: '100%', padding: '10px 36px 10px 12px', borderRadius: 8, border: '1px solid rgba(0,119,182,0.2)', background: 'rgba(0,119,182,0.03)', color: 'var(--text)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', outline: 'none', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                        {getOptions(slot.slotType).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <div style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <SelectArrow />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div {...fadeUp} style={{ marginTop: 24, background: 'rgba(0,119,182,0.04)', border: '1px solid rgba(0,119,182,0.15)', borderRadius: 12, padding: '16px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand)', letterSpacing: '0.08em', marginBottom: 14 }}>{p.mySummaryTitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {ALL_SLOT_KEYS.map(key => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{p.slotSummaryLabels[key]}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-dark, #003d6b)', background: 'white', border: '1px solid rgba(0,119,182,0.18)', borderRadius: 20, padding: '3px 11px', whiteSpace: 'nowrap' as const, maxWidth: '54%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selections[key]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ Itinerary ═════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">{p.itineraryTitle}</p>
          <div className="section-accent-line" />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>{p.itineraryNote}</p>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {days.map((day, di) => (
            <motion.div key={day.day} {...fadeUp} transition={{ delay: di * 0.08 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'white', background: 'var(--brand)', borderRadius: 20, padding: '4px 11px', letterSpacing: '0.1em' }}>
                  DAY {day.day}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-dark, #003d6b)' }}>{day.title}</span>
              </div>
              <div style={{ position: 'relative', paddingLeft: isAr ? 0 : 20, paddingRight: isAr ? 20 : 0 }}>
                <div style={{ position: 'absolute', [isAr ? 'right' : 'left']: 6, top: 6, bottom: 6, width: 1, background: 'rgba(0,119,182,0.15)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {day.items.map((item, ii) => {
                    const isMedical = item.type === 'medical'
                    if (isMedical) {
                      return (
                        <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: itemColor.medical, flexShrink: 0, marginTop: 13, [isAr ? 'marginRight' : 'marginLeft']: -18, [isAr ? 'marginLeft' : 'marginRight']: 12, position: 'relative', zIndex: 1 }} />
                          <div style={{ flex: 1, background: 'rgba(0,119,182,0.06)', borderLeft: isAr ? 'none' : '2px solid var(--brand)', borderRight: isAr ? '2px solid var(--brand)' : 'none', borderRadius: isAr ? '8px 0 0 8px' : '0 8px 8px 0', padding: '10px 12px' }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-dark, #003d6b)', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                          </div>
                        </div>
                      )
                    }
                    return (
                      <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: itemColor[item.type], flexShrink: 0, marginTop: 5, position: 'relative', zIndex: 1, [isAr ? 'marginRight' : 'marginLeft']: -20 }} />
                        <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ Adjustable ════════════════════════════════════════ */}
      <section className="section-white" style={{ paddingBottom: 32 }}>
        <motion.div {...fadeUp}>
          <p className="section-title">{p.adjustTitle}</p>
          <div className="section-accent-line" />
        </motion.div>
        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {p.adjustable.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand)', background: 'rgba(0,119,182,0.08)', border: '1px solid rgba(0,119,182,0.18)', borderRadius: 6, padding: '3px 9px', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>{item.label}</span>
              <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{item.options}</span>
            </div>
          ))}
        </motion.div>
        <motion.p {...fadeUp} style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 }}>{p.adjustNote}</motion.p>
      </section>

      {/* ══ Philosophy ════════════════════════════════════════ */}
      <section className="section-light" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'var(--blue-light)', letterSpacing: '0.18em', marginBottom: 12 }}>{p.philosophyLabel}</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-dark, #003d6b)', lineHeight: 1.7, marginBottom: 16, whiteSpace: 'pre-line' }}>{p.philosophyTitle}</p>
          <div style={{ width: 32, height: 2, background: 'var(--brand)', borderRadius: 1, margin: '0 auto 16px' }} />
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: 320, margin: '0 auto' }}>{p.philosophyDesc}</p>
        </motion.div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--brand)', padding: '36px 20px 40px' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 10, lineHeight: 1.4 }}>{p.ctaTitle}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, marginBottom: 24, whiteSpace: 'pre-line' }}>{p.ctaDesc}</p>
          <button onClick={() => window.open(contactUrl, '_blank')}
            style={{ width: '100%', padding: '15px 0', borderRadius: 12, background: 'white', border: 'none', color: 'var(--brand-dark, #003d6b)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            {p.ctaBtn}
          </button>
        </motion.div>
      </section>

      <ContactSection />
      <MedicalNetworkSection />
      <FooterSection />
    </div>
  )
}
