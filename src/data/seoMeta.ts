import type { LangCode } from './translations'

/** 홈페이지(언어별 진입점 /zh, /en) 전용 title/description.
    다른 페이지(package/quote/category)는 App.tsx의 브랜드 접미사 방식을 그대로 씀. */
export const seoMeta: Record<LangCode, { title: string; description: string }> = {
  zh: {
    title: '韩国医美·整形价格｜韩国医疗旅游咨询 - 汉江春天 K-MediSpring',
    description: '韩国医美、皮肤科、整形手术及抗衰项目专业咨询。提供韩国医院选择、医美价格、整形手术价格、预约及中文医疗旅游服务。',
  },
  en: {
    title: 'Korea Medical Tourism & Cosmetic Surgery Prices | K-MediSpring',
    description: 'Professional Korea medical tourism consultation for dermatology, cosmetic surgery and anti-aging treatments. Hospital selection, treatment prices, booking and English support.',
  },
}
