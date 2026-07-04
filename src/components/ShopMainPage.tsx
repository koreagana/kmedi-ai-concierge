import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategoryId } from '../data/products'
import { AppProvider } from '../contexts/AppContext'
import type { LangCode } from '../data/translations'
import NavBar from './NavBar'
import { FooterSection } from './HomePage'
import './ShopMainPage.css'

const VALID_LANGS: LangCode[] = ['zh', 'ko', 'en', 'ar']

interface ShopText {
  heroTitle: string
  heroSub: string
  sectionLabel: string
  bannerTitle: string
  bannerSub: string
  preparing: string
  payText: string
  shipLines: string[]
}

const TEXT: Record<LangCode, ShopText> = {
  zh: {
    heroTitle: '韩国医美恢复护理精选',
    heroSub: 'K-Beauty Recovery Shop',
    sectionLabel: '精选推荐',
    bannerTitle: '术后真正需要的，\n都在这里。',
    bannerSub: '术后恢复全程必备 · 韩国直发',
    preparing: '准备中',
    payText: '微信支付便捷结算',
    shipLines: ['韩国直发', '下单后1-2天内发货', '中国配送预计7-14天送达', '微信咨询：汉江春天'],
  },
  ko: {
    heroTitle: '한국 뷰티 회복케어 셀렉션',
    heroSub: 'K-Beauty Recovery Shop',
    sectionLabel: '추천 상품',
    bannerTitle: '수술 후 꼭 필요한 것들,\n여기 다 있습니다.',
    bannerSub: '수술 후 회복 필수템 · 한국 직배송',
    preparing: '준비 중',
    payText: '위챗페이로 간편 결제',
    shipLines: ['한국 직배송', '주문 후 1~2일 내 발송', '해외 배송 약 7~14일 소요', '위챗 문의: 汉江春天'],
  },
  en: {
    heroTitle: 'K-Beauty Recovery Care Selection',
    heroSub: 'K-Beauty Recovery Shop',
    sectionLabel: 'Featured Picks',
    bannerTitle: 'Everything you need\nafter your procedure.',
    bannerSub: 'Post-op recovery essentials · Shipped from Korea',
    preparing: 'Coming Soon',
    payText: 'Easy checkout via WeChat Pay',
    shipLines: ['Shipped directly from Korea', 'Ships within 1-2 days of order', 'International delivery ~7-14 days', 'WeChat inquiries: 汉江春天'],
  },
  ar: {
    heroTitle: 'مختارات العناية والتعافي الكورية',
    heroSub: 'K-Beauty Recovery Shop',
    sectionLabel: 'مختارات مميزة',
    bannerTitle: 'كل ما تحتاجه بعد العملية،\nتجده هنا.',
    bannerSub: 'أساسيات التعافي بعد العملية · شحن من كوريا',
    preparing: 'قريباً',
    payText: 'دفع سهل عبر WeChat Pay',
    shipLines: ['شحن مباشر من كوريا', 'يُشحن خلال 1-2 يوم من الطلب', 'التوصيل الدولي حوالي 7-14 يوم', 'للاستفسار عبر WeChat: 汉江春天'],
  },
}

export default function ShopMainPage() {
  const [searchParams] = useSearchParams()
  const langParam = searchParams.get('lang') as LangCode | null
  const lang: LangCode = langParam && VALID_LANGS.includes(langParam) ? langParam : 'zh'
  const t = TEXT[lang]
  const productLang: 'ko' | 'zh' = lang === 'ko' ? 'ko' : 'zh'

  const [activeCat, setActiveCat] = useState<ProductCategoryId | 'all'>('all')

  const visibleProducts = activeCat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCat)

  return (
    <AppProvider initialLang={lang}>
      <div className="shop-page">
        <NavBar />

        <div className="shop-header">
          <h1>{t.heroTitle}</h1>
          <div className="sub">{t.heroSub}</div>
        </div>

        {/* 카테고리 탭 */}
        <div className="cat-wrap">
          <div className="cat-inner">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-btn ${activeCat === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                {lang === 'ko' ? cat.labelKo : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 베스트 배너 */}
        <div className="section-label">
          <span>{t.sectionLabel}</span>
        </div>

        <div className="best-banner">
          <div className="txt">
            <h2>{t.bannerTitle.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
            <p>{t.bannerSub}</p>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="product-grid">
          {visibleProducts.map((p) => (
            <Link className="product-card" to={`/shop/${p.id}?lang=${lang}`} key={p.id}>
              <div className="product-img">
                <span className="product-soldout">SOLD OUT</span>
                <span className="product-preparing">{t.preparing}</span>
                {p.badge === 'best' && <span className="best-badge">BEST</span>}
                {p.badge === 'new' && <span className="new-badge">NEW</span>}
              </div>
              <div className="product-info">
                <div className="product-name-zh">{productLang === 'ko' ? p.nameKo : p.nameZh}</div>
                {productLang === 'zh' && <div className="product-name-ko">{p.nameKo}</div>}
                <div className="product-price">₩ {p.priceKrw.toLocaleString()}</div>
                <div className="product-price-sub">{p.priceCnyLabel}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 위챗 결제 안내 */}
        <div className="pay-banner">
          <div className="pay-txt">
            <div className="t1">{t.payText}</div>
          </div>
        </div>

        {/* 배송 안내 */}
        <div className="ship-info">
          {t.shipLines.map((line, i) => <div className="ship-row" key={i}>{line}</div>)}
        </div>

        <FooterSection />
      </div>
    </AppProvider>
  )
}
