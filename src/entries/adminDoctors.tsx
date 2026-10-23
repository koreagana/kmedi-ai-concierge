import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AdminPinGate, { isAdminUnlocked } from '../components/AdminPinGate'
import DoctorRoster from '../admin/doctors/DoctorRoster'

function AdminDoctorsPage() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked)

  if (!unlocked) {
    return (
      <AdminPinGate
        title="百名百医 의사 명단"
        desc="미니프로그램 의사의 실제 소속 확인을 위해 비밀번호를 입력해주세요."
        onSuccess={() => setUnlocked(true)}
      />
    )
  }

  return (
    <div>
      <DoctorRoster />
      <div style={{ textAlign: 'center', padding: '0 20px 32px', display: 'flex', justifyContent: 'center', gap: 16, background: '#F5F7FA' }}>
        <a href="/admin/partners/" style={{ fontSize: 12.5, color: '#7C8B9C', textDecoration: 'none' }}>
          ← 협력의료기관 대장
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
    <AdminDoctorsPage />
  </StrictMode>,
)
