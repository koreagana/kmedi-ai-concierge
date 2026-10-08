import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPinGate, { isAdminUnlocked } from '../components/AdminPinGate'
import HospitalPrices from '../admin/prices/HospitalPrices'

function AdminPricesPage() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked)

  if (!unlocked) {
    return (
      <AdminPinGate
        title="한강애봄 병원별 수가"
        desc="협력병원 수가 확인을 위해 비밀번호를 입력해주세요."
        onSuccess={() => setUnlocked(true)}
      />
    )
  }

  return (
    <div style={{ background: '#F7F5F0' }}>
      <HospitalPrices />
      <div style={{ textAlign: 'center', padding: '0 20px 32px', display: 'flex', justifyContent: 'center', gap: 16 }}>
        <a href="/admin/prep/" style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}>
          ← 준비문서 관리자로 돌아가기
        </a>
        <a href="/admin/병원찾기/" style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}>
          → 병원찾기 바로가기
        </a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminPricesPage />
  </StrictMode>,
)
