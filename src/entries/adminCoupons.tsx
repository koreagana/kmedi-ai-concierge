import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPinGate, { isAdminUnlocked } from '../components/AdminPinGate'
import CouponAdmin from '../admin/coupons/CouponAdmin'

function AdminCouponsPage() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked)

  if (!unlocked) {
    return (
      <AdminPinGate
        title="打卡 쿠폰 확인"
        desc="미니프로그램 출석 보상 쿠폰 확인을 위해 비밀번호를 입력해주세요."
        onSuccess={() => setUnlocked(true)}
      />
    )
  }

  return (
    <div>
      <CouponAdmin />
      <div style={{ textAlign: 'center', padding: '0 20px 32px', display: 'flex', justifyContent: 'center', gap: 16 }}>
        <a href="/admin/doctors/" style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}>
          ← 百名百医 의사 명단
        </a>
        <a href="/admin/prep/" style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}>
          → 준비문서 관리자
        </a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminCouponsPage />
  </StrictMode>,
)
