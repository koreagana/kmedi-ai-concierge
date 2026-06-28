import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategoryId } from '../data/products'
import { AppProvider } from '../contexts/AppContext'
import { FooterSection } from './HomePage'
import './ShopMainPage.css'

export default function ShopMainPage() {
  const [activeCat, setActiveCat] = useState<ProductCategoryId | 'all'>('all')

  const visibleProducts = activeCat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCat)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="brand">汉江春天</div>
        <h1>韩国医美恢复护理精选</h1>
        <div className="sub">K-Beauty Recovery Shop</div>
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
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 베스트 배너 */}
      <div className="section-label">
        <span>精选推荐</span>
      </div>

      <div className="best-banner">
        <div className="txt">
          <h2>术后真正需要的，<br />都在这里。</h2>
          <p>术后恢复全程必备 · 韩国直发</p>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="product-grid">
        {visibleProducts.map((p) => (
          <Link className="product-card" to={`/shop/${p.id}`} key={p.id}>
            <div className="product-img">
              <span className="product-soldout">SOLD OUT</span>
              <span className="product-preparing">准备中</span>
              {p.badge === 'best' && <span className="best-badge">BEST</span>}
              {p.badge === 'new' && <span className="new-badge">NEW</span>}
            </div>
            <div className="product-info">
              <div className="product-name-zh">{p.nameZh}</div>
              <div className="product-name-ko">{p.nameKo}</div>
              <div className="product-price">₩ {p.priceKrw.toLocaleString()}</div>
              <div className="product-price-sub">{p.priceCnyLabel}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* 위챗 결제 안내 */}
      <div className="pay-banner">
        <div className="pay-icon">💚</div>
        <div className="pay-txt">
          <div className="t1">微信支付便捷结算</div>
        </div>
      </div>

      {/* 배송 안내 */}
      <div className="ship-info">
        <div className="ship-row">韩国直发</div>
        <div className="ship-row">下单后1-2天内发货</div>
        <div className="ship-row">中国配送预计7-14天送达</div>
        <div className="ship-row">微信咨询：汉江春天</div>
      </div>

      <AppProvider initialLang="zh">
        <FooterSection />
      </AppProvider>
    </div>
  )
}
