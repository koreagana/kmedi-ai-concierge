import { WECHAT_BIZ_URL, WHATSAPP_URL } from '../data/contacts'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { MedicalNetworkSection, FooterSection } from './HomePage'
import './PackagePage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

/* ── types ─────────────────────────────────────────────── */
type SlotKey = 'meal1' | 'meal2' | 'meal3' | 'meal4' | 'meal5' | 'meal6' | 'sight1' | 'sight2' | 'shop'
type Selections = Record<SlotKey, string>
type OptionsKind = 'meal' | 'spot' | 'shop'

interface FixedSlotDef { kind: 'fixed'; time: string; label: string; detail?: string }
interface SelectSlotDef { kind: 'select'; time: string; label: string; slotKey: SlotKey; optionsKind: OptionsKind }
type SlotDef = FixedSlotDef | SelectSlotDef

interface DayDef { num: number; title: string; dateLabel: string; slots: SlotDef[] }
interface GlanceItem { text: string; fixed: boolean }
interface GlanceDay { title: string; sub: string; items: GlanceItem[] }
interface PriceItem { title: string; desc: string; tag: string; tagKind: 'apart' | 'free' }
interface AdjustItem { label: string; options: string }

const ALL_SLOT_KEYS: SlotKey[] = ['meal1', 'meal2', 'sight1', 'meal3', 'meal4', 'shop', 'meal5', 'meal6', 'sight2']

/* ── i18n ──────────────────────────────────────────────── */
interface PackageLang {
  backHome: string
  heroEyebrow: string
  heroTitle: string
  heroSub: string
  heroBtn: string
  heroNote: string
  countLabels: [string, string, string]
  glanceTitle: string
  glanceSub: string
  glanceDays: GlanceDay[]
  legendFixed: string
  legendSelect: string
  selectCtaText: string
  badgeFixed: string
  badgeSelect: string
  days: DayDef[]
  mealOptions: string[]
  spotOptions: string[]
  shopOptions: string[]
  slotSummaryLabels: Record<SlotKey, string>
  priceTitle: string
  priceSub: string
  priceMainLabel: string
  priceMainSub: string
  priceAmount: string
  priceUnit: string
  priceMainNote: string
  priceItems: PriceItem[]
  priceFx: string
  footNote: string
  summaryEmpty: string
  consultBtn: string
  adjustTitle: string
  adjustNote: string
  adjustable: AdjustItem[]
  philosophyLabel: string
  philosophyTitle: string
  philosophyDesc: string
  ctaTitle: string
  ctaDesc: string
  ctaBtn: string
}

const SPOT_ZH = ['北村韩屋村', '仁寺洞', '南山首尔塔', '汉江公园', '清溪川', '广藏市场', '益善洞', '昌德宫', '德寿宫', '东大门设计广场 DDP', 'COEX 星光图书馆', '圣水洞', '弘大步行街', '林荫道', '梨泰院', '西村', '首尔天空观景台']
const SHOP_ZH = ['现代百货 The Hyundai Seoul', '明洞', '乐天百货总店', '新世界百货总店', '现代百货狎鸥亭总店', 'Starfield COEX Mall', '乐天世界购物城', 'IFC Mall', '时代广场 Times Square', '现代百货贸易中心店', 'Galeria 名品馆', '狎鸥亭罗德奥', '林荫道', '圣水洞买手店街区', '弘大购物街', '东大门时尚城', '高速巴士地下商街 GOTO Mall', 'Common Ground']
const SPOT_KO = ['북촌한옥마을', '인사동', '남산서울타워', '한강공원', '청계천', '광장시장', '익선동', '창덕궁', '덕수궁', '동대문디자인플라자 DDP', 'COEX 별마당도서관', '성수동', '홍대 거리', '가로수길', '이태원', '서촌', '서울스카이 전망대']
const SHOP_KO = ['현대백화점 The Hyundai Seoul', '명동', '롯데백화점 본점', '신세계백화점 본점', '현대백화점 압구정 본점', 'Starfield COEX Mall', '롯데월드몰', 'IFC Mall', '타임스퀘어', '현대백화점 무역센터점', 'Galeria 명품관', '압구정 로데오', '가로수길', '성수동 편집샵 거리', '홍대 쇼핑거리', '동대문 패션타운', '고속터미널 지하상가 GOTO Mall', 'Common Ground']
const SPOT_EN = ['Bukchon Hanok Village', 'Insadong', 'Namsan Seoul Tower', 'Hangang Park', 'Cheonggyecheon', 'Gwangjang Market', 'Ikseon-dong', 'Changdeokgung Palace', 'Deoksugung Palace', 'DDP (Dongdaemun Design Plaza)', 'COEX Starfield Library', 'Seongsu-dong', 'Hongdae Street', 'Garosu-gil', 'Itaewon', 'Seochon', 'Seoul Sky Observatory']
const SHOP_EN = ['The Hyundai Seoul', 'Myeongdong', 'Lotte Dept. Main', 'Shinsegae Dept. Main', 'Hyundai Apgujeong Main', 'Starfield COEX Mall', 'Lotte World Mall', 'IFC Mall', 'Times Square', 'Hyundai COEX', 'Galeria Luxury Hall', 'Apgujeong Rodeo', 'Garosu-gil', 'Seongsu Select Shops', 'Hongdae Shopping St.', 'Dongdaemun Fashion Town', 'GOTO Mall', 'Common Ground']
const SPOT_AR = ['قرية بوكتشون هانوك', 'إنسادونغ', 'برج سيول نامسان', 'حديقة هانغانغ', 'تشيونغيتشيون', 'سوق غوانجانغ', 'إيكسيون-دونغ', 'قصر تشانغديوك', 'قصر ديوكسو', 'DDP دونغداي مون', 'مكتبة ستارفيلد COEX', 'سيونغسو-دونغ', 'شارع هونغداي', 'غاروسو-غيل', 'إيتايون', 'سيوتشون', 'مرصد سيول سكاي']
const SHOP_AR = ['The Hyundai Seoul', 'ميونغدونغ', 'لوتي الرئيسي', 'شينسيغي الرئيسي', 'هيونداي أبغوجيونغ', 'Starfield COEX Mall', 'لوتي وورلد مول', 'IFC Mall', 'تايمز سكوير', 'هيونداي COEX', 'غالاريا لوكس', 'أبغوجيونغ رودييو', 'غاروسو-غيل', 'محلات سيونغسو', 'هونغداي للتسوق', 'دونغداي مون للأزياء', 'GOTO Mall', 'Common Ground']

const ZH: PackageLang = {
  backHome: '← 返回首页',
  heroEyebrow: '✦ 可根据您的喜好定制',
  heroTitle: '汉江春天 3晚4天方案',
  heroSub: '医疗咨询、旅游、购物的时间已固定安排，具体地点与餐饮种类可自由选择。',
  heroBtn: '联系顾问咨询',
  heroNote: '医疗费用不包含在本方案内，具体医疗项目需另行咨询确认。',
  countLabels: ['医院问诊（固定）', '旅游地点（可选）', '购物地点（可选）'],
  glanceTitle: '行程一览',
  glanceSub: '确认整体行程后，可查看每日详细时间与可选项目',
  glanceDays: [
    { title: '抵达首尔', sub: '从仁川机场出发', items: [{ text: '仁川机场接机', fixed: true }, { text: '入住酒店', fixed: true }, { text: '欢迎晚餐', fixed: false }] },
    { title: '医院问诊①', sub: '一家医院 · 一次问诊', items: [{ text: '医院问诊①', fixed: true }, { text: '午餐', fixed: false }, { text: '旅游地点①', fixed: false }, { text: '晚餐', fixed: false }] },
    { title: '医院复诊②', sub: '一家医院 · 自由购物', items: [{ text: '医院复诊②', fixed: true }, { text: '午餐', fixed: false }, { text: '购物', fixed: false }, { text: '晚餐', fixed: false }] },
    { title: '医院复查③', sub: '返程准备', items: [{ text: '医院复查③', fixed: true }, { text: '午餐', fixed: false }, { text: '旅游地点②', fixed: false }, { text: '返程', fixed: true }] },
  ],
  legendFixed: '固定行程', legendSelect: '可选',
  selectCtaText: '请选择旅游地点和购物地点',
  badgeFixed: '固定', badgeSelect: '可选',
  days: [
    { num: 1, title: '抵达首尔', dateLabel: 'DAY 1 · 入境', slots: [
      { kind: 'fixed', time: '14:00', label: '仁川机场接机', detail: '专属接送，直达酒店' },
      { kind: 'fixed', time: '16:00', label: '酒店入住 · 休息' },
      { kind: 'select', time: '19:00', label: '欢迎晚餐', slotKey: 'meal1', optionsKind: 'meal' },
    ] },
    { num: 2, title: '医院问诊①', dateLabel: 'DAY 2 · 医疗咨询', slots: [
      { kind: 'fixed', time: '09:30', label: '医院问诊①', detail: '专业翻译全程陪同就诊' },
      { kind: 'select', time: '12:30', label: '午餐', slotKey: 'meal2', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '旅游地点①', slotKey: 'sight1', optionsKind: 'spot' },
      { kind: 'select', time: '19:00', label: '晚餐', slotKey: 'meal3', optionsKind: 'meal' },
    ] },
    { num: 3, title: '医院复诊②', dateLabel: 'DAY 3 · 恢复与购物', slots: [
      { kind: 'fixed', time: '09:30', label: '医院复诊②' },
      { kind: 'select', time: '12:30', label: '午餐', slotKey: 'meal4', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '购物', slotKey: 'shop', optionsKind: 'shop' },
      { kind: 'select', time: '19:00', label: '晚餐', slotKey: 'meal5', optionsKind: 'meal' },
    ] },
    { num: 4, title: '医院复查③ & 返程', dateLabel: 'DAY 4 · 复查与离境', slots: [
      { kind: 'fixed', time: '09:30', label: '医院复查③' },
      { kind: 'select', time: '12:30', label: '午餐', slotKey: 'meal6', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '旅游地点②', slotKey: 'sight2', optionsKind: 'spot' },
      { kind: 'fixed', time: '18:30', label: '返程 · 前往机场' },
    ] },
  ],
  mealOptions: ['韩定食', '烤肉', '参鸡汤', '汤锅定食'],
  spotOptions: SPOT_ZH,
  shopOptions: SHOP_ZH,
  slotSummaryLabels: { meal1: '欢迎晚餐', meal2: '第2天午餐', meal3: '第2天晚餐', meal4: '第3天午餐', meal5: '第3天晚餐', meal6: '第4天午餐', sight1: '旅游地点①', sight2: '旅游地点②', shop: '购物地点' },
  priceTitle: '费用说明',
  priceSub: '价格依汇率浮动，无隐藏消费',
  priceMainLabel: '套餐服务费',
  priceMainSub: '专属车辆（机场接送 + 全程用车）· 6次用餐 · 翻译顾问全程陪同',
  priceAmount: '¥9,600',
  priceUnit: '/ 1~2人',
  priceMainNote: '3人以上加车辆升级，费用另行报价，敬请咨询顾问',
  priceItems: [
    { title: '医疗项目费用', desc: '由您选择的具体医疗项目将单独核算，套餐费用不含医疗费', tag: '另行报价', tagKind: 'apart' },
    { title: '住宿', desc: '不含在套餐内，由您自行预订。如需要，可为您免费推荐合作酒店并协助预订（不收取任何手续费）', tag: '免费协助', tagKind: 'free' },
  ],
  priceFx: '价格按实时汇率换算，如汇率波动较大，最终金额将与您重新确认',
  footNote: '以上为标准行程模板，具体医疗项目及时间将由专属顾问与您确认后调整。',
  summaryEmpty: '尚未选择行程项目',
  consultBtn: '联系顾问咨询',
  adjustTitle: '可根据客户喜好调整',
  adjustNote: '具体旅游地点、购物地点与餐饮种类，可根据客户时间、体力、医疗安排与个人喜好调整。',
  adjustable: [
    { label: '旅游地点', options: '北村韩屋村 · 仁寺洞 · 南山塔 · 清溪川 · 广藏市场 等 17处可选' },
    { label: '购物地点', options: 'The Hyundai Seoul · 明洞 · 乐天 · 新世界 · COEX 等 18处可选' },
    { label: '餐饮', options: '韩定食 · 烤肉 · 参鸡汤 · 汤锅定食 4种可选，每餐可不同' },
    { label: '医疗项目', options: '根据客户需求与医院安排调整组合' },
  ],
  philosophyLabel: '这不是普通旅游行程',
  philosophyTitle: '汉江春天 3晚4天方案，\n不是简单把医院和景点排在一起。',
  philosophyDesc: '我们会根据您的医疗咨询需求、恢复时间、移动距离与停留节奏，帮您安排更轻松、更安心的韩国行程。',
  ctaTitle: '想了解适合您的 3晚4天方案？',
  ctaDesc: '告诉我们您的来韩时间、关注项目、\n同行人数与预算范围，\n我们会先为您整理适合的行程方向。',
  ctaBtn: '联系顾问咨询',
}

const KO: PackageLang = {
  backHome: '← 홈으로',
  heroEyebrow: '✦ 고객님의 취향에 맞게 구성 가능',
  heroTitle: '한강애봄 3박4일 패키지',
  heroSub: '의료상담·관광·쇼핑 일정은 고정되어 있으며, 구체적인 장소와 식사 메뉴는 자유롭게 선택하실 수 있습니다.',
  heroBtn: '컨시어지에게 연락',
  heroNote: '의료비는 본 패키지에 포함되지 않으며, 구체적인 의료 항목은 별도 확인이 필요합니다.',
  countLabels: ['병원 방문 (고정)', '관광지 (선택)', '쇼핑 장소 (선택)'],
  glanceTitle: '일정 한눈에 보기',
  glanceSub: '전체 일정을 확인한 후, 매일 세부 시간과 선택 항목을 확인하실 수 있습니다',
  glanceDays: [
    { title: '서울 도착', sub: '인천공항 출발', items: [{ text: '인천공항 픽업', fixed: true }, { text: '호텔 체크인', fixed: true }, { text: '환영 만찬', fixed: false }] },
    { title: '병원 상담①', sub: '병원 1곳 · 상담 1회', items: [{ text: '병원 상담①', fixed: true }, { text: '점심', fixed: false }, { text: '관광지①', fixed: false }, { text: '저녁', fixed: false }] },
    { title: '병원 재진②', sub: '병원 1곳 · 자유 쇼핑', items: [{ text: '병원 재진②', fixed: true }, { text: '점심', fixed: false }, { text: '쇼핑', fixed: false }, { text: '저녁', fixed: false }] },
    { title: '병원 재진③', sub: '출국 준비', items: [{ text: '병원 재진③', fixed: true }, { text: '점심', fixed: false }, { text: '관광지②', fixed: false }, { text: '출국', fixed: true }] },
  ],
  legendFixed: '고정 일정', legendSelect: '선택 가능',
  selectCtaText: '관광지와 쇼핑 장소를 선택해 주세요',
  badgeFixed: '고정', badgeSelect: '선택',
  days: [
    { num: 1, title: '서울 도착', dateLabel: 'DAY 1 · 입국', slots: [
      { kind: 'fixed', time: '14:00', label: '인천공항 픽업', detail: '전용 차량으로 호텔까지 안내' },
      { kind: 'fixed', time: '16:00', label: '호텔 체크인 · 휴식' },
      { kind: 'select', time: '19:00', label: '환영 만찬', slotKey: 'meal1', optionsKind: 'meal' },
    ] },
    { num: 2, title: '병원 상담①', dateLabel: 'DAY 2 · 의료상담', slots: [
      { kind: 'fixed', time: '09:30', label: '병원 상담①', detail: '전문 통역 동행' },
      { kind: 'select', time: '12:30', label: '점심', slotKey: 'meal2', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '관광지①', slotKey: 'sight1', optionsKind: 'spot' },
      { kind: 'select', time: '19:00', label: '저녁', slotKey: 'meal3', optionsKind: 'meal' },
    ] },
    { num: 3, title: '병원 재진②', dateLabel: 'DAY 3 · 회복 및 쇼핑', slots: [
      { kind: 'fixed', time: '09:30', label: '병원 재진②' },
      { kind: 'select', time: '12:30', label: '점심', slotKey: 'meal4', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '쇼핑', slotKey: 'shop', optionsKind: 'shop' },
      { kind: 'select', time: '19:00', label: '저녁', slotKey: 'meal5', optionsKind: 'meal' },
    ] },
    { num: 4, title: '병원 재진③ & 출국', dateLabel: 'DAY 4 · 재진 및 출국', slots: [
      { kind: 'fixed', time: '09:30', label: '병원 재진③' },
      { kind: 'select', time: '12:30', label: '점심', slotKey: 'meal6', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: '관광지②', slotKey: 'sight2', optionsKind: 'spot' },
      { kind: 'fixed', time: '18:30', label: '출국 · 공항 이동' },
    ] },
  ],
  mealOptions: ['한정식', '숯불구이', '삼계탕', '전골정식'],
  spotOptions: SPOT_KO,
  shopOptions: SHOP_KO,
  slotSummaryLabels: { meal1: '환영 만찬', meal2: '2일차 점심', meal3: '2일차 저녁', meal4: '3일차 점심', meal5: '3일차 저녁', meal6: '4일차 점심', sight1: '관광지①', sight2: '관광지②', shop: '쇼핑 장소' },
  priceTitle: '비용 안내',
  priceSub: '가격은 환율에 따라 변동되며, 숨겨진 비용은 없습니다.',
  priceMainLabel: '패키지 서비스 비용',
  priceMainSub: '전용 차량(공항 픽업 + 전 일정 이용) · 식사 6회 · 통역 코디네이터 전 일정 동행',
  priceAmount: 'USD 1,350',
  priceUnit: '/ 1~2인 기준',
  priceMainNote: '3인 이상은 차량 등급이 상향되며 비용은 별도 안내해 드립니다. 컨시어지에게 문의해 주세요.',
  priceItems: [
    { title: '의료 항목 비용', desc: '고객님이 선택하시는 구체적인 의료 항목은 별도로 산정되며, 패키지 비용에는 의료비가 포함되지 않습니다.', tag: '별도 안내', tagKind: 'apart' },
    { title: '숙박', desc: '패키지에 포함되지 않으며 직접 예약하시면 됩니다. 필요하실 경우 제휴 호텔을 무료로 추천 및 예약 지원해 드립니다(수수료 없음).', tag: '무료 지원', tagKind: 'free' },
  ],
  priceFx: '가격은 실시간 환율로 환산되며, 환율 변동이 클 경우 최종 금액은 다시 확인해 드립니다.',
  footNote: '위 일정은 표준 템플릿이며, 구체적인 의료 항목과 시간은 전담 컨시어지와 상담 후 조정됩니다.',
  summaryEmpty: '아직 선택한 일정 항목이 없습니다',
  consultBtn: '컨시어지에게 문의',
  adjustTitle: '고객 취향에 따라 조정 가능',
  adjustNote: '구체적인 관광지, 쇼핑 장소, 식사 메뉴는 고객의 일정, 체력, 의료 일정 및 개인 취향에 맞게 조정 가능합니다.',
  adjustable: [
    { label: '관광지', options: '북촌한옥마을 · 인사동 · 남산타워 · 청계천 · 광장시장 등 17곳' },
    { label: '쇼핑', options: 'The Hyundai Seoul · 명동 · 롯데 · 신세계 · COEX 등 18곳' },
    { label: '식사', options: '한정식 · 숯불구이 · 삼계탕 · 전골정식 4종 중 매 끼니 선택 가능' },
    { label: '의료 상담', options: '고객 니즈와 병원 일정에 맞게 조합 조정' },
  ],
  philosophyLabel: '이건 일반 관광 일정이 아닙니다',
  philosophyTitle: '한강애봄 3박4일 패키지는\n단순히 병원과 관광지를 나열한 것이 아닙니다.',
  philosophyDesc: '고객의 의료상담 니즈, 회복 시간, 이동 거리, 체류 리듬에 맞게 더 편안하고 안심할 수 있는 한국 일정을 안내해 드립니다.',
  ctaTitle: '나에게 맞는 3박4일 패키지를 알고 싶으신가요?',
  ctaDesc: '방한 시기, 관심 항목,\n동행 인원과 예산 범위를 알려주시면,\n적합한 일정 방향을 먼저 정리해 드리겠습니다.',
  ctaBtn: '컨시어지에게 연락',
}

const EN: PackageLang = {
  backHome: '← Back to Home',
  heroEyebrow: '✦ Customizable to your preference',
  heroTitle: 'K-MediSpring 3 Nights 4 Days Package',
  heroSub: 'Medical consultation, sightseeing and shopping times are fixed — you can freely choose the specific locations and meals.',
  heroBtn: 'Contact a Concierge',
  heroNote: 'Medical costs are not included in this package and must be confirmed separately.',
  countLabels: ['Hospital Visits (Fixed)', 'Attractions (Optional)', 'Shopping Spot (Optional)'],
  glanceTitle: 'Itinerary at a Glance',
  glanceSub: 'Once the overall plan is confirmed, you can check the detailed time and optional items for each day',
  glanceDays: [
    { title: 'Arrival in Seoul', sub: 'Depart from Incheon Airport', items: [{ text: 'Airport pickup', fixed: true }, { text: 'Hotel check-in', fixed: true }, { text: 'Welcome dinner', fixed: false }] },
    { title: 'Hospital Consultation①', sub: '1 hospital · 1 consultation', items: [{ text: 'Hospital Consultation①', fixed: true }, { text: 'Lunch', fixed: false }, { text: 'Attraction①', fixed: false }, { text: 'Dinner', fixed: false }] },
    { title: 'Hospital Follow-up②', sub: '1 hospital · free shopping', items: [{ text: 'Hospital Follow-up②', fixed: true }, { text: 'Lunch', fixed: false }, { text: 'Shopping', fixed: false }, { text: 'Dinner', fixed: false }] },
    { title: 'Hospital Follow-up③', sub: 'Departure preparation', items: [{ text: 'Hospital Follow-up③', fixed: true }, { text: 'Lunch', fixed: false }, { text: 'Attraction②', fixed: false }, { text: 'Departure', fixed: true }] },
  ],
  legendFixed: 'Fixed', legendSelect: 'Optional',
  selectCtaText: 'Please choose your attractions and shopping spot',
  badgeFixed: 'Fixed', badgeSelect: 'Optional',
  days: [
    { num: 1, title: 'Arrival in Seoul', dateLabel: 'DAY 1 · ARRIVAL', slots: [
      { kind: 'fixed', time: '14:00', label: 'Incheon Airport Pickup', detail: 'Private transfer directly to the hotel' },
      { kind: 'fixed', time: '16:00', label: 'Hotel Check-in · Rest' },
      { kind: 'select', time: '19:00', label: 'Welcome Dinner', slotKey: 'meal1', optionsKind: 'meal' },
    ] },
    { num: 2, title: 'Hospital Consultation①', dateLabel: 'DAY 2 · CONSULTATION', slots: [
      { kind: 'fixed', time: '09:30', label: 'Hospital Consultation①', detail: 'Accompanied by a professional interpreter' },
      { kind: 'select', time: '12:30', label: 'Lunch', slotKey: 'meal2', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'Attraction①', slotKey: 'sight1', optionsKind: 'spot' },
      { kind: 'select', time: '19:00', label: 'Dinner', slotKey: 'meal3', optionsKind: 'meal' },
    ] },
    { num: 3, title: 'Hospital Follow-up②', dateLabel: 'DAY 3 · RECOVERY & SHOPPING', slots: [
      { kind: 'fixed', time: '09:30', label: 'Hospital Follow-up②' },
      { kind: 'select', time: '12:30', label: 'Lunch', slotKey: 'meal4', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'Shopping', slotKey: 'shop', optionsKind: 'shop' },
      { kind: 'select', time: '19:00', label: 'Dinner', slotKey: 'meal5', optionsKind: 'meal' },
    ] },
    { num: 4, title: 'Hospital Follow-up③ & Departure', dateLabel: 'DAY 4 · FOLLOW-UP & DEPARTURE', slots: [
      { kind: 'fixed', time: '09:30', label: 'Hospital Follow-up③' },
      { kind: 'select', time: '12:30', label: 'Lunch', slotKey: 'meal6', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'Attraction②', slotKey: 'sight2', optionsKind: 'spot' },
      { kind: 'fixed', time: '18:30', label: 'Departure · Transfer to Airport' },
    ] },
  ],
  mealOptions: ['Korean Set Meal', 'Korean BBQ', 'Samgyetang (Ginseng Chicken Soup)', 'Hot Pot Set Meal'],
  spotOptions: SPOT_EN,
  shopOptions: SHOP_EN,
  slotSummaryLabels: { meal1: 'Welcome Dinner', meal2: 'Day 2 Lunch', meal3: 'Day 2 Dinner', meal4: 'Day 3 Lunch', meal5: 'Day 3 Dinner', meal6: 'Day 4 Lunch', sight1: 'Attraction①', sight2: 'Attraction②', shop: 'Shopping Spot' },
  priceTitle: 'Pricing',
  priceSub: 'Prices vary with the exchange rate — no hidden fees.',
  priceMainLabel: 'Package Service Fee',
  priceMainSub: 'Private vehicle (airport transfer + full itinerary) · 6 meals · Interpreter/coordinator escort throughout',
  priceAmount: 'USD 1,350',
  priceUnit: '/ for 1–2 people',
  priceMainNote: 'For 3+ people the vehicle is upgraded and pricing is quoted separately — please contact a concierge.',
  priceItems: [
    { title: 'Medical Treatment Fees', desc: 'The specific medical treatments you choose are calculated separately; medical costs are not included in the package fee.', tag: 'Quoted separately', tagKind: 'apart' },
    { title: 'Accommodation', desc: 'Not included in the package — you may book it yourself. If needed, we can recommend and help book a partner hotel free of charge (no service fee).', tag: 'Free assistance', tagKind: 'free' },
  ],
  priceFx: 'Prices are converted at the current exchange rate. If the rate fluctuates significantly, the final amount will be reconfirmed with you.',
  footNote: 'The above is a standard itinerary template. Specific medical treatments and timing will be confirmed and adjusted with your dedicated concierge.',
  summaryEmpty: 'No itinerary items selected yet',
  consultBtn: 'Contact a Concierge',
  adjustTitle: 'Customizable to Your Preferences',
  adjustNote: 'Specific attractions, shopping spots, and meals can be adjusted based on your schedule, energy, medical plan, and personal preferences.',
  adjustable: [
    { label: 'Attractions', options: 'Bukchon Hanok Village · Insadong · Namsan Tower · Cheonggyecheon · Gwangjang Market — 17 options' },
    { label: 'Shopping', options: 'The Hyundai Seoul · Myeongdong · Lotte · Shinsegae · COEX — 18 options' },
    { label: 'Meals', options: 'Korean Set Meal · Korean BBQ · Samgyetang · Hot Pot Set Meal — choose per meal' },
    { label: 'Medical', options: 'Combination adjusted to client needs and hospital schedule' },
  ],
  philosophyLabel: 'This is not an ordinary tour',
  philosophyTitle: 'The K-MediSpring 3N4D Package\nis not just hospitals and attractions stitched together.',
  philosophyDesc: 'We plan a lighter, more reassuring Korea itinerary tailored to your medical consultation needs, recovery time, travel distance, and stay rhythm.',
  ctaTitle: 'Want to know the right 3N4D plan for you?',
  ctaDesc: 'Tell us your Korea visit timing, areas of interest,\ngroup size and budget range,\nand we will organize the best direction for you first.',
  ctaBtn: 'Contact a Concierge',
}

const AR: PackageLang = {
  backHome: '← العودة للرئيسية',
  heroEyebrow: '✦ قابل للتخصيص حسب رغبتك',
  heroTitle: 'باقة كيميديسبرينغ 3 ليالٍ و4 أيام',
  heroSub: 'مواعيد الاستشارة الطبية والجولات السياحية والتسوق ثابتة، ويمكنك اختيار الأماكن والوجبات المحددة بحرية.',
  heroBtn: 'تواصل مع كونسيرج',
  heroNote: 'التكاليف الطبية غير مشمولة في هذه الباقة ويجب تأكيدها بشكل منفصل.',
  countLabels: ['زيارات المستشفى (ثابتة)', 'معالم سياحية (اختياري)', 'موقع تسوق (اختياري)'],
  glanceTitle: 'نظرة عامة على البرنامج',
  glanceSub: 'بعد تأكيد الخطة الكاملة، يمكنك مراجعة الوقت التفصيلي والخيارات لكل يوم',
  glanceDays: [
    { title: 'الوصول إلى سيول', sub: 'المغادرة من مطار إنتشون', items: [{ text: 'استقبال المطار', fixed: true }, { text: 'تسجيل الوصول', fixed: true }, { text: 'عشاء ترحيبي', fixed: false }] },
    { title: 'استشارة طبية ①', sub: 'مستشفى واحد · استشارة واحدة', items: [{ text: 'استشارة طبية ①', fixed: true }, { text: 'غداء', fixed: false }, { text: 'معلم سياحي ①', fixed: false }, { text: 'عشاء', fixed: false }] },
    { title: 'متابعة طبية ②', sub: 'مستشفى واحد · تسوق حر', items: [{ text: 'متابعة طبية ②', fixed: true }, { text: 'غداء', fixed: false }, { text: 'تسوق', fixed: false }, { text: 'عشاء', fixed: false }] },
    { title: 'متابعة طبية ③', sub: 'الاستعداد للمغادرة', items: [{ text: 'متابعة طبية ③', fixed: true }, { text: 'غداء', fixed: false }, { text: 'معلم سياحي ②', fixed: false }, { text: 'مغادرة', fixed: true }] },
  ],
  legendFixed: 'ثابت', legendSelect: 'اختياري',
  selectCtaText: 'يرجى اختيار المعالم السياحية وموقع التسوق',
  badgeFixed: 'ثابت', badgeSelect: 'اختياري',
  days: [
    { num: 1, title: 'الوصول إلى سيول', dateLabel: 'اليوم 1 · الوصول', slots: [
      { kind: 'fixed', time: '14:00', label: 'استقبال من مطار إنتشون', detail: 'نقل خاص مباشرة إلى الفندق' },
      { kind: 'fixed', time: '16:00', label: 'تسجيل الوصول بالفندق · راحة' },
      { kind: 'select', time: '19:00', label: 'عشاء ترحيبي', slotKey: 'meal1', optionsKind: 'meal' },
    ] },
    { num: 2, title: 'استشارة طبية ①', dateLabel: 'اليوم 2 · الاستشارة', slots: [
      { kind: 'fixed', time: '09:30', label: 'استشارة طبية ①', detail: 'برفقة مترجم محترف' },
      { kind: 'select', time: '12:30', label: 'غداء', slotKey: 'meal2', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'معلم سياحي ①', slotKey: 'sight1', optionsKind: 'spot' },
      { kind: 'select', time: '19:00', label: 'عشاء', slotKey: 'meal3', optionsKind: 'meal' },
    ] },
    { num: 3, title: 'متابعة طبية ②', dateLabel: 'اليوم 3 · التعافي والتسوق', slots: [
      { kind: 'fixed', time: '09:30', label: 'متابعة طبية ②' },
      { kind: 'select', time: '12:30', label: 'غداء', slotKey: 'meal4', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'تسوق', slotKey: 'shop', optionsKind: 'shop' },
      { kind: 'select', time: '19:00', label: 'عشاء', slotKey: 'meal5', optionsKind: 'meal' },
    ] },
    { num: 4, title: 'متابعة طبية ③ والمغادرة', dateLabel: 'اليوم 4 · المتابعة والمغادرة', slots: [
      { kind: 'fixed', time: '09:30', label: 'متابعة طبية ③' },
      { kind: 'select', time: '12:30', label: 'غداء', slotKey: 'meal6', optionsKind: 'meal' },
      { kind: 'select', time: '14:00', label: 'معلم سياحي ②', slotKey: 'sight2', optionsKind: 'spot' },
      { kind: 'fixed', time: '18:30', label: 'المغادرة · التوجه للمطار' },
    ] },
  ],
  mealOptions: ['وجبة كورية تقليدية', 'شواء كوري', 'سامغيتانغ (حساء دجاج بالجينسنغ)', 'وجبة حساء حار'],
  spotOptions: SPOT_AR,
  shopOptions: SHOP_AR,
  slotSummaryLabels: { meal1: 'عشاء ترحيبي', meal2: 'غداء اليوم 2', meal3: 'عشاء اليوم 2', meal4: 'غداء اليوم 3', meal5: 'عشاء اليوم 3', meal6: 'غداء اليوم 4', sight1: 'معلم سياحي ①', sight2: 'معلم سياحي ②', shop: 'موقع التسوق' },
  priceTitle: 'تفاصيل السعر',
  priceSub: 'يتغير السعر حسب سعر الصرف، ولا توجد رسوم خفية.',
  priceMainLabel: 'رسوم خدمة الباقة',
  priceMainSub: 'سيارة خاصة (استقبال المطار + الاستخدام طوال الرحلة) · 6 وجبات · مرافقة مترجم/منسق طوال الرحلة',
  priceAmount: 'USD 1,350',
  priceUnit: '/ لـ 1-2 شخص',
  priceMainNote: 'لـ 3 أشخاص أو أكثر يتم ترقية السيارة ويُقدَّم السعر بشكل منفصل — يرجى التواصل مع كونسيرج.',
  priceItems: [
    { title: 'تكاليف العلاجات الطبية', desc: 'يتم احتساب العلاجات الطبية المحددة التي تختارها بشكل منفصل، ولا تشمل رسوم الباقة التكاليف الطبية.', tag: 'يُقدَّم بشكل منفصل', tagKind: 'apart' },
    { title: 'الإقامة', desc: 'غير مشمولة في الباقة، ويمكنك الحجز بنفسك. عند الحاجة، يمكننا التوصية بفندق شريك ومساعدتك في الحجز مجاناً (بدون رسوم خدمة).', tag: 'مساعدة مجانية', tagKind: 'free' },
  ],
  priceFx: 'يتم تحويل الأسعار حسب سعر الصرف الحالي. في حال حدوث تقلبات كبيرة، سيتم تأكيد المبلغ النهائي معك مجدداً.',
  footNote: 'ما ورد أعلاه هو نموذج قياسي للبرنامج. سيتم تأكيد العلاجات الطبية المحددة والتوقيت مع كونسيرج مخصص لك.',
  summaryEmpty: 'لم يتم اختيار أي عناصر من البرنامج بعد',
  consultBtn: 'تواصل مع كونسيرج',
  adjustTitle: 'قابل للتخصيص حسب تفضيلاتك',
  adjustNote: 'يمكن تعديل المعالم السياحية ومواقع التسوق والوجبات بناءً على جدولك وطاقتك وخطتك الطبية وتفضيلاتك الشخصية.',
  adjustable: [
    { label: 'معالم', options: 'قرية بوكتشون · إنسادونغ · برج نامسان · حديقة هانغانغ · سوق غوانجانغ — 17 خياراً' },
    { label: 'تسوق', options: 'The Hyundai Seoul · ميونغدونغ · لوتي · شينسيغي · COEX — 18 خياراً' },
    { label: 'وجبات', options: 'وجبة كورية تقليدية · شواء كوري · سامغيتانغ · حساء حار — اختيار لكل وجبة' },
    { label: 'طبي', options: 'تعديل التركيبة حسب احتياجات العميل وجدول المستشفى' },
  ],
  philosophyLabel: 'هذه ليست جولة سياحية عادية',
  philosophyTitle: 'باقة كيمديسبرينج 3 ليالٍ/4 أيام\nليست مجرد مستشفيات ومعالم مجمّعة.',
  philosophyDesc: 'نخطط لرحلة كوريا أخف وأكثر طمأنينة مصممة خصيصاً لاحتياجات استشارتك الطبية ووقت التعافي والمسافات والإيقاع.',
  ctaTitle: 'هل تريد معرفة الباقة المناسبة لك؟',
  ctaDesc: 'أخبرنا بموعد زيارتك لكوريا ومجالات اهتمامك\nوعدد المرافقين ونطاق الميزانية،\nوسنرتب لك أفضل اتجاه أولاً.',
  ctaBtn: 'تواصل مع كونسيرج',
}

/* ── component ─────────────────────────────────────────────── */
export default function PackagePage() {
  const { lang, goHome } = useApp()
  const p = lang === 'ko' ? KO : lang === 'en' ? EN : lang === 'ar' ? AR : ZH
  const isAr = lang === 'ar'
  const contactUrl = isAr ? WHATSAPP_URL : WECHAT_BIZ_URL

  const [selections, setSelections] = useState<Selections>({ meal1: '', meal2: '', meal3: '', meal4: '', meal5: '', meal6: '', sight1: '', sight2: '', shop: '' })
  const [openSlot, setOpenSlot] = useState<SlotKey | null>(null)

  const toggleSlot = (key: SlotKey) => setOpenSlot(cur => (cur === key ? null : key))
  const pick = (key: SlotKey, value: string) => {
    setSelections(s => ({ ...s, [key]: value }))
    setOpenSlot(null)
  }
  const getOptions = (kind: OptionsKind) => (kind === 'meal' ? p.mealOptions : kind === 'shop' ? p.shopOptions : p.spotOptions)

  /* typewriter — plays once when the CTA line scrolls into view */
  const ctaTextRef = useRef<HTMLSpanElement>(null)
  const ctaWrapRef = useRef<HTMLParagraphElement>(null)
  const [ctaTyped, setCtaTyped] = useState('')
  const [ctaDone, setCtaDone] = useState(false)
  const playedRef = useRef(false)

  useEffect(() => {
    const el = ctaWrapRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setCtaTyped(p.selectCtaText)
      setCtaDone(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true
          let i = 0
          const full = p.selectCtaText
          const interval = setInterval(() => {
            i++
            setCtaTyped(full.slice(0, i))
            if (i >= full.length) {
              clearInterval(interval)
              setTimeout(() => setCtaDone(true), 1200)
            }
          }, 70)
          observer.disconnect()
        }
      })
    }, { threshold: 0.6 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [p.selectCtaText])

  const chips = ALL_SLOT_KEYS.filter(k => selections[k]).map(k => ({ key: k, label: p.slotSummaryLabels[k], value: selections[k] }))

  const renderSlot = (slot: SlotDef, dayIdx: number, slotIdx: number) => {
    if (slot.kind === 'fixed') {
      return (
        <div className="pkg-slot" key={`${dayIdx}-${slotIdx}`}>
          <div className="pkg-slot-time">{slot.time}</div>
          <div className="pkg-slot-body">
            <div className="pkg-slot-top">
              <span className="pkg-slot-label">{slot.label}</span>
              <span className="pkg-badge fixed">{p.badgeFixed}</span>
            </div>
            {slot.detail && <div className="pkg-slot-detail">{slot.detail}</div>}
          </div>
        </div>
      )
    }
    const isOpen = openSlot === slot.slotKey
    const chosen = selections[slot.slotKey]
    return (
      <div className="pkg-slot" key={`${dayIdx}-${slotIdx}`}>
        <div className="pkg-slot-time">{slot.time}</div>
        <div className="pkg-slot-body">
          <div className="pkg-slot-top">
            <span className="pkg-slot-label">{slot.label}</span>
            <button type="button" className={`pkg-choose-btn${isOpen ? ' open' : ''}`} onClick={() => toggleSlot(slot.slotKey)}>
              <span>{chosen || p.badgeSelect}</span>
              <span className="pw-arrow">▾</span>
            </button>
          </div>
          <div className={`pkg-options${isOpen ? ' open' : ''}`}>
            {getOptions(slot.optionsKind).map(opt => (
              <button type="button" key={opt} className={`pkg-option${chosen === opt ? ' picked' : ''}`} onClick={() => pick(slot.slotKey, opt)}>
                <span className="pw-check">✓</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="pkg-widget" dir={isAr ? 'rtl' : 'ltr'}>
        {/* ══ Hero ══════════════════════════════════════════════ */}
        <div className="pkg-hero">
          <motion.button className="pkg-back-btn" onClick={goHome} {...fadeUp}>{p.backHome}</motion.button>
          <motion.span className="pkg-eyebrow" {...fadeUp} transition={{ delay: 0.05 }}>{p.heroEyebrow}</motion.span>
          <motion.h1 className="pkg-hero-title" {...fadeUp} transition={{ delay: 0.1 }}>{p.heroTitle}</motion.h1>
          <motion.p className="pkg-hero-sub" {...fadeUp} transition={{ delay: 0.15 }}>{p.heroSub}</motion.p>
          <motion.button className="pkg-hero-btn" {...fadeUp} transition={{ delay: 0.2 }} onClick={() => window.open(contactUrl, '_blank')}>{p.heroBtn}</motion.button>
          <motion.p className="pkg-hero-note" {...fadeUp} transition={{ delay: 0.22 }}>{p.heroNote}</motion.p>
        </div>

        {/* ══ Counts strip ══════════════════════════════════════ */}
        <motion.div className="pkg-counts" {...fadeUp} transition={{ delay: 0.1 }}>
          <div className="pw-c"><div className="pw-num">3</div><div className="pw-lbl">{p.countLabels[0]}</div></div>
          <div className="pw-c selectable"><div className="pw-num">2</div><div className="pw-lbl">{p.countLabels[1]}</div></div>
          <div className="pw-c selectable"><div className="pw-num">1</div><div className="pw-lbl">{p.countLabels[2]}</div></div>
        </motion.div>

        {/* ══ Glance table ══════════════════════════════════════ */}
        <div className="pkg-section pkg-glance-wrap">
          <motion.div className="pkg-section-head" {...fadeUp}>
            <h2>{p.glanceTitle}</h2>
            <p>{p.glanceSub}</p>
          </motion.div>
          <motion.div className="pkg-glance-grid" {...fadeUp}>
            {p.glanceDays.map((gd, i) => (
              <div className="pkg-glance-col" key={i}>
                <div className="pkg-glance-day">
                  <span className="pw-dnum">{i + 1}</span>
                  <span className="pw-dtitle">{gd.title}</span>
                </div>
                <div className="pkg-glance-sub">{gd.sub}</div>
                <ul className="pkg-glance-list">
                  {gd.items.map((it, ii) => (
                    <li key={ii} className={it.fixed ? '' : 'op'}>
                      {it.text}
                      {!it.fixed && <em>{p.legendSelect}</em>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
          <div className="pkg-legend">
            <span><i className="pkg-dot fixed" />{p.legendFixed}</span>
            <span><i className="pkg-dot select" />{p.legendSelect}</span>
          </div>
        </div>

        {/* ══ Timeline ══════════════════════════════════════════ */}
        <div className="pkg-section pkg-timeline-wrap">
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <p className="pkg-select-cta" ref={ctaWrapRef}>
              <span ref={ctaTextRef}>{ctaTyped}</span>
              <span className={`pkg-cta-cursor${ctaDone ? ' done' : ''}`}>|</span>
            </p>
          </div>

          {p.days.map((day, di) => (
            <div className="pkg-day" key={day.num}>
              <div className="pkg-day-marker">{day.num}</div>
              <div className="pkg-day-card">
                <div className="pkg-day-title">{day.title}</div>
                <div className="pkg-day-date">{day.dateLabel}</div>
                {day.slots.map((slot, si) => renderSlot(slot, di, si))}
              </div>
            </div>
          ))}
        </div>

        {/* ══ Price ═════════════════════════════════════════════ */}
        <div className="pkg-section pkg-price-wrap">
          <motion.div className="pkg-section-head" {...fadeUp}>
            <h2>{p.priceTitle}</h2>
            <p>{p.priceSub}</p>
          </motion.div>

          <motion.div className="pkg-price-main" {...fadeUp}>
            <div className="pkg-price-row">
              <div>
                <div className="pkg-price-label">{p.priceMainLabel}</div>
                <div className="pkg-price-sub">{p.priceMainSub}</div>
              </div>
              <div className="pkg-price-amount">
                <span className="pw-cny">{p.priceAmount}</span>
                <span className="pw-unit">{p.priceUnit}</span>
              </div>
            </div>
            <div className="pkg-price-note">{p.priceMainNote}</div>
          </motion.div>

          <motion.div className="pkg-price-list" {...fadeUp}>
            {p.priceItems.map((it, i) => (
              <div className="pkg-price-item" key={i}>
                <div>
                  <div className="pkg-item-title">{it.title}</div>
                  <div className="pkg-item-desc">{it.desc}</div>
                </div>
                <span className={`pw-tag ${it.tagKind === 'apart' ? 'pkg-tag-apart' : 'pkg-tag-free'}`}>{it.tag}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="pkg-price-fx" {...fadeUp}>
            <span>ⓘ</span>
            <span>{p.priceFx}</span>
          </motion.div>
        </div>

        <p className="pkg-footnote">{p.footNote}</p>

        {/* ══ Sticky summary bar ════════════════════════════════ */}
        <div className="pkg-summary-bar">
          <div className="pkg-summary-inner">
            <div className="pkg-summary-chips">
              {chips.length === 0 ? (
                <span className="pkg-chip empty">{p.summaryEmpty}</span>
              ) : (
                chips.map(c => <span className="pkg-chip" key={c.key}>{c.label}：{c.value}</span>)
              )}
            </div>
            <button className="pkg-consult-btn" onClick={() => window.open(contactUrl, '_blank')}>{p.consultBtn}</button>
          </div>
        </div>
      </div>

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

      <MedicalNetworkSection />
      <FooterSection />
    </div>
  )
}
