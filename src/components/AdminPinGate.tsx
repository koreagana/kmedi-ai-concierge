import { useState } from 'react'
import './AdminPinGate.css'

// Lightweight access gate to keep internal admin lists off casual visitors.
// Not a real security boundary — no patient data or pricing ever lives here.
const ADMIN_PIN = '0707'

export default function AdminPinGate({
  title = '한강애봄 관리자페이지',
  desc = '내부 문서 목록 확인을 위해 비밀번호를 입력해주세요.',
  onSuccess,
}: {
  title?: string
  desc?: string
  onSuccess: () => void
}) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="admin-pin-page">
      <div className="admin-pin-card">
        <p className="admin-pin-title">{title}</p>
        <p className="admin-pin-desc">{desc}</p>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          autoFocus
          className="admin-pin-input"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, '').slice(0, 4))
            setError(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
        />
        {error && <p className="admin-pin-error">비밀번호가 올바르지 않습니다.</p>}
        <button type="button" className="admin-pin-btn" onClick={handleSubmit}>
          확인
        </button>
      </div>
    </div>
  )
}
