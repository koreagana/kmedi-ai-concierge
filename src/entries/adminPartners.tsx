import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPinGate, { isAdminUnlocked } from '../components/AdminPinGate'
import PartnerHub from '../admin/partners/PartnerHub'

function AdminPartnersPage() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked)

  if (!unlocked) {
    return (
      <AdminPinGate
        title="협력의료기관"
        desc="협력의료기관·병원찾기 확인을 위해 비밀번호를 입력해주세요."
        onSuccess={() => setUnlocked(true)}
      />
    )
  }

  return (
    <div>
      <PartnerHub />
      <div style={{ textAlign: 'center', padding: '0 20px 32px', display: 'flex', justifyContent: 'center', gap: 16, background: '#F5F7FA' }}>
        <a
          href="/admin/prep/"
          style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}
        >
          ← 준비문서 관리자로 돌아가기
        </a>
        <a
          href="/admin/doctors/"
          style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}
        >
          → 百名百医 의사 명단
        </a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminPartnersPage />
  </StrictMode>,
)
