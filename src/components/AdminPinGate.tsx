import { useState } from 'react'
import './AdminPinGate.css'

// Lightweight access gate to keep internal admin lists off casual visitors.
// Not a real security boundary — no patient data lives here (협력병원 수가는 내부 참고용).
// PIN은 서버(netlify/functions/admin-pin.mjs, 환경변수 ADMIN_PIN)에서 확인한다.
// 이 저장소는 공개라서 PIN을 코드에 두지 않는다. 5번 틀리면 15분 잠금.
async function checkPin(pin: string): Promise<{ ok: boolean; message?: string }> {
  try {
    const r = await fetch('/.netlify/functions/admin-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    const d = (await r.json().catch(() => ({}))) as { ok?: boolean; message?: string }
    return { ok: r.ok && !!d.ok, message: d.message }
  } catch {
    return { ok: false, message: '서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.' }
  }
}

/* 한 번 입력하면 이 기기에서 12시간 동안 모든 관리자 페이지(준비문서·협력기관·병원찾기·수가)가
   다시 묻지 않는다. 저장이 막힌 브라우저(시크릿 모드 등)에서는 매번 묻는 기존 동작으로 돌아간다. */
const UNLOCK_KEY = 'hgab-admin-unlocked-until'
const UNLOCK_MS = 12 * 60 * 60 * 1000

export function isAdminUnlocked(): boolean {
  try {
    return Number(localStorage.getItem(UNLOCK_KEY)) > Date.now()
  } catch {
    return false
  }
}

function rememberUnlock() {
  try {
    localStorage.setItem(UNLOCK_KEY, String(Date.now() + UNLOCK_MS))
  } catch {
    /* 저장 불가 — 다음 페이지에서 다시 입력 */
  }
}

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
  const [error, setError] = useState<string | false>(false)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async () => {
    if (busy) return
    setBusy(true)
    const r = await checkPin(pin)
    setBusy(false)
    if (r.ok) {
      setError(false)
      rememberUnlock()
      onSuccess()
    } else {
      setError(r.message || '비밀번호가 올바르지 않습니다.')
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
        {error && <p className="admin-pin-error">{error}</p>}
        <button type="button" className="admin-pin-btn" onClick={handleSubmit} disabled={busy}>
          {busy ? '확인 중…' : '확인'}
        </button>
      </div>
    </div>
  )
}
