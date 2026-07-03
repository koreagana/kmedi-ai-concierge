import { useState } from 'react'
import {
  PREP_DOCUMENTS,
  PREP_CATEGORIES,
  PREP_DOC_TYPE_LABEL,
  PREP_DOC_STATUS_LABEL,
  type PrepDocument,
  type PrepCategoryId,
} from '../data/prepDocuments'
import './AdminPrepPage.css'

function PrepDocCard({ doc }: { doc: PrepDocument }) {
  const [copied, setCopied] = useState(false)
  const isAvailable = doc.status === 'available'
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${doc.link}` : doc.link

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="admin-prep-card">
      <div className="admin-prep-card-top">
        <div className="admin-prep-titles">
          <p className="admin-prep-card-title-ko">{doc.titleKo}</p>
          <p className="admin-prep-card-title-zh">{doc.titleZh}</p>
        </div>
        <div className="admin-prep-badges">
          {doc.internal && <span className="admin-prep-badge admin-prep-badge-internal">🔒 내부용</span>}
          <span className={`admin-prep-badge admin-prep-badge-${doc.status}`}>
            {PREP_DOC_STATUS_LABEL[doc.status]}
          </span>
        </div>
      </div>

      {doc.description && <p className="admin-prep-card-desc">{doc.description}</p>}

      <div className="admin-prep-meta">
        <span>
          <span className="admin-prep-meta-label">유형 </span>
          <span className="admin-prep-meta-value">{PREP_DOC_TYPE_LABEL[doc.type].ko}</span>
        </span>
        <span>
          <span className="admin-prep-meta-label">분야 </span>
          <span className="admin-prep-meta-value">{doc.field}</span>
        </span>
        <span>
          <span className="admin-prep-meta-label">링크 </span>
          <span className="admin-prep-meta-value">{doc.link}</span>
        </span>
      </div>

      <div className="admin-prep-actions">
        {isAvailable ? (
          <a
            className="admin-prep-btn admin-prep-btn-primary"
            href={doc.link}
            target="_blank"
            rel="noreferrer"
          >
            환자용 링크 열기
          </a>
        ) : (
          <button type="button" className="admin-prep-btn admin-prep-btn-primary" disabled>
            준비 중인 문서입니다
          </button>
        )}
        <button type="button" className="admin-prep-btn" onClick={handleCopy}>
          링크 복사
        </button>
        {copied && <span className="admin-prep-copy-msg">복사되었습니다</span>}
      </div>
    </div>
  )
}

function docsByCategory(categoryId: PrepCategoryId): PrepDocument[] {
  return PREP_DOCUMENTS.filter((doc) => doc.category === categoryId)
}

function categorySectionId(categoryId: PrepCategoryId): string {
  return `prep-category-${categoryId}`
}

function CategorySection({ categoryId }: { categoryId: PrepCategoryId }) {
  const category = PREP_CATEGORIES.find((c) => c.id === categoryId)!
  const docs = docsByCategory(categoryId)

  return (
    <section className="admin-prep-category" id={categorySectionId(categoryId)}>
      <div className="admin-prep-category-header">
        <h2 className="admin-prep-category-title">
          {category.titleKo} <span className="admin-prep-category-title-zh">/ {category.titleZh}</span>
        </h2>
        <span className="admin-prep-category-count">
          {docs.length > 0 ? `${docs.length}개 문서` : '준비 예정'}
        </span>
      </div>

      {docs.length > 0 ? (
        <div className="admin-prep-list">
          {docs.map((doc) => (
            <PrepDocCard key={doc.link} doc={doc} />
          ))}
        </div>
      ) : (
        <p className="admin-prep-empty">아직 등록된 문서가 없습니다. 준비 중인 분야입니다.</p>
      )}
    </section>
  )
}

function CategoryNav() {
  const handleJump = (categoryId: PrepCategoryId | 'all') => {
    const targetId = categoryId === 'all' ? 'prep-category-all' : categorySectionId(categoryId)
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="admin-prep-nav">
      <button type="button" className="admin-prep-nav-btn" onClick={() => handleJump('all')}>
        전체
      </button>
      {PREP_CATEGORIES.map((category) => (
        <button
          type="button"
          key={category.id}
          className="admin-prep-nav-btn"
          onClick={() => handleJump(category.id)}
        >
          {category.navLabel}
        </button>
      ))}
    </nav>
  )
}

function PrepDocList() {
  return (
    <div className="admin-prep-page">
      <div className="admin-prep-container">
        <header className="admin-prep-header" id="prep-category-all">
          <p className="admin-prep-title-ko">한강애봄 환자 준비문서 관리자</p>
          <p className="admin-prep-title-zh">汉江春天患者准备资料管理</p>
          <p className="admin-prep-desc">
            환자에게 전달할 문진표, 검사 전 준비사항, 시술/수술 전후 주의사항 링크를 관리하기 위한 내부용 목록입니다.
            <br />
            이 페이지에는 환자 개인정보를 저장하지 않습니다.
          </p>
        </header>

        <CategoryNav />

        {PREP_CATEGORIES.map((category) => (
          <CategorySection key={category.id} categoryId={category.id} />
        ))}
      </div>
    </div>
  )
}

// Lightweight access gate to keep this internal list off casual visitors.
// Not a real security boundary — no patient data or pricing ever lives here.
const ADMIN_PIN = '0707'

function AdminPinGate({ onSuccess }: { onSuccess: () => void }) {
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
        <p className="admin-pin-title">한강애봄 관리자페이지</p>
        <p className="admin-pin-desc">내부 문서 목록 확인을 위해 비밀번호를 입력해주세요.</p>
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

export default function AdminPrepPage() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <AdminPinGate onSuccess={() => setUnlocked(true)} />
  }

  return <PrepDocList />
}
