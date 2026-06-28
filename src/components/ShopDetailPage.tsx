import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import './ShopDetailPage.css'

export default function ShopDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const product = productId ? getProductById(productId) : undefined

  if (!product) {
    return (
      <div className="shop-page" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#6a8aaa', marginBottom: 16 }}>
          상품을 찾을 수 없습니다 · 未找到该商品
        </p>
        <button className="buy-btn" style={{ width: '100%' }} onClick={() => navigate('/shop')}>
          돌아가기 · 返回
        </button>
      </div>
    )
  }

  const changeQty = (delta: number) => {
    setQty((q) => Math.max(1, Math.min(99, q + delta)))
  }

  const goBuy = () => {
    navigate(`/shop/order?id=${product.id}&qty=${qty}`)
  }

  return (
    <div className="shop-page">
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="nav-title">상품 상세 · 商品详情</span>
      </div>

      <div className="product-hero">{product.emoji}</div>

      <div className="product-basic">
        <div className="product-category">
          {product.categoryLabel.zh} · {product.categoryLabel.ko}
        </div>
        <div className="product-name-ko">{product.nameKo}</div>
        <div className="product-name-zh">{product.nameZh}</div>
        <div className="price-row">
          <span className="price-krw">₩ {product.priceKrw.toLocaleString()}</span>
          <span className="price-cny">{product.priceCnyLabel}</span>
        </div>
        <div className="price-note">위챗페이 결제 · 微信支付 · 한국 직배송</div>
        <div className="qty-row">
          <button className="qty-btn" onClick={() => changeQty(-1)}>−</button>
          <div className="qty-num">{qty}</div>
          <button className="qty-btn" onClick={() => changeQty(1)}>+</button>
        </div>
      </div>

      <div className="info-section">
        <h3>이런 분께 추천 <span className="zh">适合人群</span></h3>
        {product.recommendFor.map((item, i) => (
          <div className="info-row" key={i}>
            <div className="info-dot" />
            <div className="info-text">
              {item.ko}
              <span className="zh-sub">{item.zh}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="info-section">
        <h3>사용 방법 <span className="zh">使用方法</span></h3>
        {product.usage.map((item, i) => (
          <div className="info-row" key={i}>
            <div className="info-dot" />
            <div className="info-text">
              {item.ko}
              <span className="zh-sub">{item.zh}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="info-section">
        <h3>주의사항 <span className="zh">注意事项</span></h3>
        {product.caution.map((item, i) => (
          <div className="info-row" key={i}>
            <div className="info-dot" />
            <div className="info-text">
              {item.ko}
              <span className="zh-sub">{item.zh}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-bar">
        <button className="cart-btn">담기 · 加购</button>
        <button className="buy-btn" onClick={goBuy}>바로 구매 · 立即购买</button>
      </div>
    </div>
  )
}
