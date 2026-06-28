import { useNavigate } from 'react-router-dom'

export default function ShopPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        maxWidth: 480,
        margin: '0 auto',
        background: 'var(--bg-hero, #e8f4ff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 13, color: 'var(--brand, #0077b6)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 10 }}>
        K-Beauty Recovery Shop
      </p>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark, #1f4e79)', marginBottom: 12, lineHeight: 1.4 }}>
        韩国医美恢复护理精选
      </h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted, #6b85a0)', lineHeight: 1.8, marginBottom: 28 }}>
        商品准备中，敬请期待。<br />
        상품 준비 중입니다. 곧 만나보실 수 있어요.
      </p>
      <button
        onClick={() => navigate('/zh')}
        style={{
          background: 'linear-gradient(135deg, #0077b6 0%, #4e97d1 100%)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          padding: '13px 28px',
          borderRadius: 14,
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.02em',
        }}
      >
        返回首页 / 홈으로 돌아가기
      </button>
    </div>
  )
}
