import { useState } from 'react'
import {
  PREP_DOCUMENTS,
  PREP_DOC_TYPE_LABEL,
  PREP_DOC_STATUS_LABEL,
  type PrepDocument,
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
        <span className={`admin-prep-badge admin-prep-badge-${doc.status}`}>
          {PREP_DOC_STATUS_LABEL[doc.status]}
        </span>
      </div>

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

export default function AdminPrepPage() {
  return (
    <div className="admin-prep-page">
      <div className="admin-prep-container">
        <header className="admin-prep-header">
          <p className="admin-prep-title-ko">한강애봄 환자 준비문서 관리자</p>
          <p className="admin-prep-title-zh">汉江春天患者准备资料管理</p>
          <p className="admin-prep-desc">
            환자에게 전달할 문진표, 검사 전 준비사항, 시술/수술 전후 주의사항 링크를 관리하기 위한 내부용 목록입니다.
            <br />
            이 페이지에는 환자 개인정보를 저장하지 않습니다.
          </p>
        </header>

        <div className="admin-prep-list">
          {PREP_DOCUMENTS.map((doc) => (
            <PrepDocCard key={doc.link} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  )
}
