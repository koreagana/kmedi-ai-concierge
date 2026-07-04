import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import './ShopOrderPage.css'

export default function ShopOrderPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [step, setStep] = useState<1 | 2>(1)
  const [copied, setCopied] = useState(false)
  const [shipName, setShipName] = useState('')
  const [shipContact, setShipContact] = useState('')
  const [shipAddr, setShipAddr] = useState('')
  const [shipNote, setShipNote] = useState('')

  const productId = params.get('id') ?? ''
  const qty = Math.max(1, parseInt(params.get('qty') ?? '1', 10) || 1)
  const lang = params.get('lang') ?? 'zh'
  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="shop-page" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#6a8aaa', marginBottom: 16 }}>
          주문할 상품을 찾을 수 없습니다 · 未找到要下单的商品
        </p>
        <button className="submit-btn" onClick={() => navigate(`/shop?lang=${lang}`)}>
          돌아가기 · 返回
        </button>
      </div>
    )
  }

  const unit = product.priceKrw
  const total = unit * qty

  const handleSubmit = () => {
    if (step === 1) {
      if (!shipName.trim() || !shipContact.trim() || !shipAddr.trim()) {
        alert('배송지 정보를 모두 입력해주세요.\n请填写完整收货信息。')
        return
      }
      setStep(2)
      document.getElementById('qrSection')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* "결제 완료 알림" - 주문 내용을 클립보드에 복사해 위챗에 직접 붙여넣게 함.
     서버로 전송하거나 저장하지 않음 (한강애봄 정책상 서버 저장 금지). */
  const copyOrder = () => {
    const text = `📦 한강애봄 주문 알림
━━━━━━━━━━━━━━━━
상품: ${product.nameKo} / ${product.nameZh}
수량: ${qty}개
금액: ₩ ${total.toLocaleString()}
━━━━━━━━━━━━━━━━
받는 분: ${shipName}
연락처: ${shipContact}
주소: ${shipAddr}${shipNote ? '\n요청사항: ' + shipNote : ''}
━━━━━━━━━━━━━━━━
위챗페이 송금 완료했습니다.
汉江春天(k-medi spring)`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="shop-page">
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="nav-title">주문서 · 订单确认</span>
      </div>

      {/* 주문 요약 */}
      <div className="section">
        <div className="order-section-title">주문 내역 <span className="zh">订单详情</span></div>
        <div className="order-item">
          <span className="label">상품명 · 商品名</span>
          <span className="value">{product.nameKo}</span>
        </div>
        <div className="order-item">
          <span className="label">수량 · 数量</span>
          <span className="value">{qty}개</span>
        </div>
        <div className="order-item">
          <span className="label">단가 · 单价</span>
          <span className="value">₩ {unit.toLocaleString()}</span>
        </div>
        <div className="total-row">
          <span className="label">합계 · 合计</span>
          <span className="value">₩ {total.toLocaleString()}</span>
        </div>
      </div>

      {/* 배송지 입력 */}
      <div className="section">
        <div className="order-section-title">배송지 입력 <span className="zh">收货信息</span></div>
        <div className="field">
          <label>받는 분 이름 · 收件人姓名</label>
          <input type="text" placeholder="이름 / 姓名" value={shipName} onChange={(e) => setShipName(e.target.value)} />
        </div>
        <div className="field">
          <label>연락처 · 联系方式 (위챗ID 또는 전화번호)</label>
          <input type="text" placeholder="微信ID 或 手机号" value={shipContact} onChange={(e) => setShipContact(e.target.value)} />
        </div>
        <div className="field">
          <label>배송 주소 · 收货地址</label>
          <textarea placeholder="국가·도시·상세주소 / 国家·城市·详细地址" value={shipAddr} onChange={(e) => setShipAddr(e.target.value)} />
          <div className="field-hint">중국 주소 기재 시 한자로 작성해주세요 · 中国地址请用汉字填写</div>
        </div>
        <div className="field">
          <label>요청사항 <span style={{ color: '#9aabcc', fontWeight: 400 }}>선택 · 可选</span></label>
          <input type="text" placeholder="배송 요청사항 / 备注" value={shipNote} onChange={(e) => setShipNote(e.target.value)} />
        </div>
      </div>

      {/* 결제 방법 */}
      <div className="section">
        <div className="order-section-title">결제 방법 <span className="zh">支付方式</span></div>
        <div className="pay-guide">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-txt">
              아래 "결제하기" 버튼을 누르면 위챗페이 QR이 나타납니다
              <span className="zh">点击下方按钮后，将显示微信支付二维码</span>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-txt">
              위챗으로 정확한 금액을 송금해주세요
              <span className="zh">请通过微信转账准确金额</span>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-txt">
              "결제 완료 알림" 버튼으로 주문 내역을 위챗으로 전송해주세요
              <span className="zh">点击"付款完成通知"按钮，将订单发送至微信</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR 영역 (결제하기 후 표시) */}
      {step === 2 && (
        <div className="section" id="qrSection">
          <div className="order-section-title">위챗페이 결제 <span className="zh">微信支付</span></div>
          <div className="qr-section">
            <div className="qr-box">
              <div className="qr-icon">💚</div>
              <div style={{ fontSize: 12, color: '#9aabcc', textAlign: 'center' }}>
                한강애봄 위챗페이 QR<br />汉江春天 微信支付
              </div>
            </div>
            <div className="qr-amount">₩ {total.toLocaleString()}</div>
            <div className="qr-note">위 금액을 정확히 송금해주세요<br />请准确转账上方金额</div>
          </div>
        </div>
      )}

      <div className="bottom-bar">
        <button className={`submit-btn ${step === 2 ? 'done' : ''}`} onClick={handleSubmit}>
          {step === 1 ? '결제하기 · 立即付款' : '✅ QR 확인 완료 · 已确认二维码'}
        </button>
        {step === 2 && (
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyOrder}>
            {copied ? '✅ 복사 완료! 위챗에 붙여넣기 하세요' : '📋 결제 완료 알림 · 付款完成通知'}
          </button>
        )}
      </div>
    </div>
  )
}
