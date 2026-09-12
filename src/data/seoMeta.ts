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

/** 성형수술 가격표(/zh/surgery-price, /en/surgery-price) 전용 title/description.
    검색 유입용 핵심 페이지라 홈과 마찬가지로 브랜드 접미사 없이 그대로 씀. */
export const surgeryMeta: Record<LangCode, { title: string; description: string }> = {
  zh: {
    title: '韩国整形手术价格表｜双眼皮·隆鼻·胸部·吸脂费用 - 汉江春天',
    description: '2026韩国整形手术价格参考，包括双眼皮、隆鼻、胸部整形、吸脂、脂肪填充、面部轮廓等项目。提供韩元及人民币价格、恢复期和项目说明。',
  },
  en: {
    title: 'Korea Plastic Surgery Price List | Eyelid, Nose, Breast & Liposuction - K-MediSpring',
    description: '2026 Korea plastic surgery price guide covering double eyelid, rhinoplasty, breast surgery, liposuction, fat grafting and facial contouring. Prices in KRW and CNY with recovery time and procedure details.',
  },
}
