import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPinGate from '../components/AdminPinGate'
import PartnerRegistry from '../admin/partners/PartnerRegistry'

function AdminPartnersPage() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return (
      <AdminPinGate
        title="한강애봄 협력의료기관 대장"
        desc="내부 협력기관 목록 확인을 위해 비밀번호를 입력해주세요."
        onSuccess={() => setUnlocked(true)}
      />
    )
  }

  return (
    <div>
      <PartnerRegistry />
      <div style={{ textAlign: 'center', padding: '0 20px 32px', display: 'flex', justifyContent: 'center', gap: 16 }}>
        <a
          href="/admin/prep/"
          style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}
        >
          ← 준비문서 관리자로 돌아가기
        </a>
        <a
          href="/admin/병원찾기/"
          style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}
        >
          → 병원찾기 바로가기
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
