import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PharmicellCreamPage.css'

const PRODUCT_IMG = 'https://bypharmicell.com/web/product/big/202406/10038d801fd51d69e6d151fffcd5559b.png'

const RELATED = [
  { name: '판테놀 닥터 토너', price: '₩ 42,000', img: 'https://bypharmicell.com/web/product/big/202406/576798bb886b5399961541aa5947b405.png' },
  { name: '판테놀 닥터 선크림', price: '₩ 32,000', img: 'https://bypharmicell.com/web/product/big/202406/350a770beae3dd4d697397c9fb1b6076.png' },
  { name: '닥터 마스크 5매', price: '₩ 20,000', img: 'https://bypharmicell.com/web/product/big/202406/a85db59a6cb0c161d5c24995e92fba3d.png' },
  { name: '닥터 젤클렌저', price: '₩ 35,000', img: 'https://bypharmicell.com/web/product/big/202406/af735ebbb874dad039245b239be1bfb8.png' },
]

const INGREDIENTS = [
  { icon: '🔬', name: '줄기세포배양액', nameZh: '干细胞培养液', desc: '인체골수줄기세포\n피부성장인자 함유\n人体骨髓干细胞提取' },
  { icon: '💧', name: '판테놀', nameZh: '泛醇 (维生素B5)', desc: '피부 장벽 회복\n깊은 보습 공급\n修复皮肤屏障' },
  { icon: '🌿', name: '피부성장인자', nameZh: '皮肤生长因子 EGF', desc: '피부 재생 촉진\n탄력 개선\n促进皮肤再生' },
  { icon: '✨', name: '멀티케어', nameZh: '多效护理配方', desc: '재생+탄력+보습\n하나로 해결\n三效合一' },
]

const RECOMMEND = [
  { ko: '성형수술·레이저 시술 후 피부 재생이 필요한 분', zh: '整形手术·激光治疗后需要皮肤再生护理' },
  { ko: '피부 탄력이 떨어지고 건조함을 느끼는 분', zh: '感觉皮肤失去弹性，干燥缺水的人' },
  { ko: '민감성 피부로 자극 없는 크림을 찾는 분', zh: '敏感肌肤，寻找无刺激温和霜的人' },
  { ko: '재생·탄력·보습을 한 제품으로 해결하고 싶은 분', zh: '希望用一款产品同时解决再生·弹力·保湿问题' },
]

const USAGE = [
  { ko: '세안 후 스킨케어 마지막 단계에 사용', zh: '洁面后，作为护肤最后一步使用' },
  { ko: '적당량을 덜어 얼굴 전체에 부드럽게 펴 바름', zh: '取适量均匀涂抹于全脸，轻柔按摩至吸收' },
  { ko: '아침·저녁 세안 후 매일 사용 권장', zh: '建议每日早晚洁面后使用' },
  { ko: '시술 직후에는 의사 지시에 따라 사용 시점 확인', zh: '手术后请遵医嘱确认使用时机' },
]

const CAUTION = [
  { ko: '화장품 사용 시 이상이 있으면 즉시 사용 중단', zh: '如出现过敏反应请立即停用' },
  { ko: '어린이 손에 닿지 않는 곳에 보관', zh: '请放在儿童不易触及的地方保管' },
  { ko: '직사광선이 없는 서늘한 곳에 보관', zh: '避光阴凉处保存' },
  { ko: '성형·시술 직후 사용 전 의사와 상담', zh: '手术后使用前请咨询主治医生' },
]

const UNIT_PRICE = 48000

export default function PharmicellCreamPage() {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const changeQty = (delta: number) => {
    setQty((q) => Math.max(1, Math.min(99, q + delta)))
  }

  const goBuy = () => {
    navigate(`/shop/order?id=pharmicell-cream&qty=${qty}`)
  }

  return (
    <div className="pc-page">
      {/* 상단 네비 */}
      <div className="pc-top-nav">
        <button className="pc-back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="pc-nav-title">韩国医美护理精选 · 상품 상세</span>
      </div>

      {/* 상품 이미지 */}
      <div className="pc-hero-img">
        <img src={PRODUCT_IMG} alt="플레이 셀 판테놀 닥터 크림" />
      </div>

      {/* 브랜드 */}
      <div className="pc-brand-badge">
        <span className="pc-brand-tag">PHARMICELL · 파미셀</span>
        <span className="pc-brand-name">Play Cell 라인</span>
      </div>

      {/* 기본 정보 */}
      <div className="pc-product-basic">
        <div className="pc-name-ko">플레이 셀 판테놀 닥터 크림</div>
        <div className="pc-name-zh">干细胞培养液修复霜</div>
        <div className="pc-product-desc">재생 · 탄력 · 보습 멀티케어 / 再生·弹力·保湿多效护理</div>
        <hr className="pc-divider" />
        <div className="pc-price-block">
          <span className="pc-price-krw">₩ {UNIT_PRICE.toLocaleString()}</span>
          <span className="pc-price-cny">¥ 约252元</span>
        </div>
        <div className="pc-price-note">위챗페이 결제 · 微信支付 · 한국 직배송 · 韩国直发</div>
        <div className="pc-qty-label">수량 · 数量</div>
        <div className="pc-qty-wrap">
          <button className="pc-qty-btn" onClick={() => changeQty(-1)}>−</button>
          <div className="pc-qty-num">{qty}</div>
          <button className="pc-qty-btn" onClick={() => changeQty(1)}>+</button>
        </div>
      </div>

      {/* 민감성 테스트 배너 */}
      <div className="pc-test-banner">
        <div className="pc-test-num">0.00</div>
        <div className="pc-test-txt">
          <div className="pc-t1">민감성 피부 자극도 0.00</div>
          <div className="pc-t2">敏感肌刺激度检测 0.00<br />피부과 테스트 완료 · 皮肤科测试通过</div>
        </div>
      </div>

      {/* 핵심 성분 */}
      <div className="pc-ingredient-section">
        <div className="pc-sec-title">핵심 성분</div>
        <div className="pc-sec-title-zh">核心成分</div>
        <div className="pc-ingredient-grid">
          {INGREDIENTS.map((item) => (
            <div key={item.name} className="pc-ingredient-card">
              <div className="pc-ingredient-icon">{item.icon}</div>
              <div className="pc-ingredient-name">{item.name}</div>
              <div className="pc-ingredient-name-zh">{item.nameZh}</div>
              <div className="pc-ingredient-desc">{item.desc.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 이런 분께 추천 */}
      <div className="pc-info-section">
        <div className="pc-sec-title">이런 분께 추천해요</div>
        <div className="pc-sec-title-zh">适合人群</div>
        {RECOMMEND.map((item, i) => (
          <div key={i} className="pc-info-row">
            <div className="pc-info-dot" />
            <div className="pc-info-text">
              {item.ko}
              <span className="pc-zh">{item.zh}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 사용법 */}
      <div className="pc-usage-section">
        <div className="pc-sec-title">사용 방법</div>
        <div className="pc-sec-title-zh">使用方法</div>
        {USAGE.map((item, i) => (
          <div key={i} className="pc-step-row">
            <div className="pc-step-num">{i + 1}</div>
            <div className="pc-step-text">
              {item.ko}
              <span className="pc-zh">{item.zh}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 함께 사면 좋은 상품 */}
      <div className="pc-related-section">
        <div className="pc-sec-title">함께 쓰면 더 좋아요</div>
        <div className="pc-sec-title-zh" style={{ marginBottom: 14 }}>搭配使用效果更佳</div>
        <div className="pc-related-scroll">
          {RELATED.map((item) => (
            <div key={item.name} className="pc-related-card">
              <div className="pc-related-img">
                <img src={item.img} alt={item.name} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div className="pc-related-info">
                <div className="pc-related-name">{item.name}</div>
                <div className="pc-related-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="pc-caution-section">
        <div className="pc-caution-title">⚠️ 주의사항 · 注意事项</div>
        {CAUTION.map((item, i) => (
          <div key={i} className="pc-caution-row">
            {item.ko} / {item.zh}
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="pc-bottom-bar">
        <button className="pc-cart-btn">담기 · 加购</button>
        <button className="pc-buy-btn" onClick={goBuy}>바로 구매 · 立即购买</button>
      </div>
    </div>
  )
}
