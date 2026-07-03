import { useNavigate, useParams } from 'react-router-dom'
import { PREP_GUIDES } from '../data/prepGuides'
import './FunctionalIntakePage.css'

export default function PrepGuidePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const guide = slug ? PREP_GUIDES[slug] : undefined

  if (!guide) {
    return (
      <div className="intake-page">
        <div className="intake-container">
          <header className="intake-header">
            <p className="intake-title-zh">页面未找到</p>
            <p className="intake-title-ko">페이지를 찾을 수 없습니다</p>
          </header>
          <button type="button" className="intake-wechat-btn" onClick={() => navigate('/zh')}>
            返回首页 / 홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="intake-page">
      <div className="intake-container">
        <header className="intake-header">
          <p className="intake-title-zh">{guide.titleZh}</p>
          <p className="intake-title-ko">{guide.titleKo}</p>
        </header>

        <div className="intake-card">
          <p className="intake-q-zh" style={{ marginBottom: 8 }}>{guide.bodyZh}</p>
          <p className="intake-q-ko" style={{ marginBottom: 0, fontSize: 13 }}>{guide.bodyKo}</p>
        </div>

        <div className="intake-notice">
          <p className="intake-notice-zh">最终的检查、诊疗和治疗方向，需以正规医疗机构和专业医生的判断为准。</p>
          <p className="intake-notice-ko">최종 검사, 진료, 치료 방향은 정규 의료기관과 전문의의 판단에 따라 결정됩니다.</p>
        </div>

        <button type="button" className="intake-wechat-btn" onClick={() => navigate(-1)}>
          返回上一页 / 이전 화면으로 돌아가기
        </button>
      </div>
    </div>
  )
}
