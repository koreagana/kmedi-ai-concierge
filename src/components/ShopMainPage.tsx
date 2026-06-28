import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategoryId } from '../data/products'
import './ShopMainPage.css'

export default function ShopMainPage() {
  const [activeCat, setActiveCat] = useState<ProductCategoryId | 'all'>('all')

  const visibleProducts = activeCat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCat)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="brand">汉江春天 · 한강애봄</div>
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
        <span>베스트 상품</span>
        <span className="zh">精选推荐</span>
      </div>

      <div className="best-banner">
        <div className="txt">
          <h2>术后真正需要的，<br />都在这里。</h2>
          <p>수술 후 필요한 모든 케어<br />한국 직배송 · 韩国直发</p>
        </div>
        <div className="icon">🌿</div>
      </div>

      {/* 상품 그리드 */}
      <div className="product-grid">
        {visibleProducts.map((p) => (
          <Link className="product-card" to={`/shop/${p.id}`} key={p.id}>
            <div className="product-img">
              {p.emoji}
              {p.badge === 'best' && <span className="best-badge">BEST</span>}
              {p.badge === 'new' && <span className="new-badge">NEW</span>}
            </div>
            <div className="product-info">
              <div className="product-name-ko">{p.nameKo}</div>
              <div className="product-name-zh">{p.nameZh}</div>
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
          <div className="t1">위챗페이로 간편 결제</div>
          <div className="t2">微信支付 · 한국 직배송 · 韩国直发</div>
        </div>
      </div>

      {/* 배송 안내 */}
      <div className="ship-info">
        <div className="ship-row"><span className="icon">📦</span> 한국에서 직접 발송 · 韩国直发</div>
        <div className="ship-row"><span className="icon">⏱️</span> 주문 후 2~3일 내 발송 · 2-3天内发货</div>
        <div className="ship-row"><span className="icon">💬</span> 문의: 위챗 汉江春天 · 微信咨询</div>
      </div>

      <div className="shop-footer">
        한강애봄(k-medi spring) · 汉江春天<br />
        韩国首尔 · 서울특별시 성북구<br />
        © 2026 한강애봄. All rights reserved.
      </div>
    </div>
  )
}
