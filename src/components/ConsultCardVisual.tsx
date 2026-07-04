import { CalendarCheck, ShieldCheck } from 'lucide-react'
import { translations, type LangCode } from '../data/translations'

interface CardText {
  title: string
  subtitle: string
  rightHeader: string
  service: { title: string; desc: string }
}

const TEXT: Record<LangCode, CardText> = {
  zh: {
    title: '韩国医疗咨询卡',
    subtitle: '专业 · 安心 · 高效 · 全程陪伴',
    rightHeader: 'MEDICAL CONSULTATION',
    service: { title: '专属服务', desc: '一对一咨询・定制方案\n就医安排・全程协助' },
  },
  ko: {
    title: '한국 의료상담 카드',
    subtitle: '전문성 · 안심 · 신속 · 전 과정 동행',
    rightHeader: 'MEDICAL CONSULTATION',
    service: { title: '전담 서비스', desc: '1:1 상담・맞춤 플랜\n병원 예약・전 과정 동행' },
  },
  en: {
    title: 'Korea Medical Consult Card',
    subtitle: 'Professional · Reassuring · Guided',
    rightHeader: 'MEDICAL CONSULTATION',
    service: { title: 'Dedicated Service', desc: '1:1 Consult · Custom Plan\nHospital Booking · Full Support' },
  },
  ar: {
    title: 'بطاقة الاستشارة الطبية',
    subtitle: 'احترافية · طمأنينة · مرافقة كاملة',
    rightHeader: 'MEDICAL CONSULTATION',
    service: { title: 'خدمة مخصصة', desc: 'استشارة فردية · خطة مخصصة\nترتيب المواعيد · دعم كامل' },
  },
}

function SeoulSkyline() {
  return (
    <svg className="ccv-skyline" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true">
      {/* rolling hills, back layer */}
      <path
        d="M0 110 Q 60 90 120 108 T 240 106 T 360 110 T 480 104 T 600 110 T 720 105 T 800 110"
        fill="none" stroke="currentColor" strokeWidth="1.3"
      />
      {/* Han River bridge, far left */}
      <line x1="10" y1="128" x2="150" y2="128" stroke="currentColor" strokeWidth="1.5" />
      <line x1="35" y1="128" x2="35" y2="88" stroke="currentColor" strokeWidth="1.5" />
      <line x1="120" y1="128" x2="120" y2="88" stroke="currentColor" strokeWidth="1.5" />
      <path d="M35 88 L5 128 M35 88 L65 128 M120 88 L90 128 M120 88 L150 128" fill="none" stroke="currentColor" strokeWidth="1" />

      {/* city blocks */}
      <rect x="170" y="96" width="26" height="42" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="200" y="80" width="20" height="58" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="224" y="104" width="30" height="34" fill="none" stroke="currentColor" strokeWidth="1.3" />

      {/* Namsan Tower */}
      <path d="M420 138 L410 70 L430 70 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="420" cy="63" rx="9" ry="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="420" y1="56" x2="420" y2="44" stroke="currentColor" strokeWidth="1.4" />

      {/* 63 Building style tapered tower */}
      <path d="M470 138 L470 66 Q470 56 486 56 Q502 56 502 66 L502 138 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="470" y1="90" x2="502" y2="90" stroke="currentColor" strokeWidth="1" />
      <line x1="470" y1="112" x2="502" y2="112" stroke="currentColor" strokeWidth="1" />

      {/* more city blocks */}
      <rect x="520" y="100" width="24" height="38" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="548" y="86" width="18" height="52" fill="none" stroke="currentColor" strokeWidth="1.3" />

      {/* hanok / palace roofline */}
      <path d="M600 138 L600 116 L612 100 L624 116 L624 138 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M596 116 Q612 104 628 116" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M636 138 L636 122 L646 110 L656 122 L656 138 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M633 122 Q646 113 659 122" fill="none" stroke="currentColor" strokeWidth="1.2" />

      {/* right-side city blocks */}
      <rect x="680" y="94" width="22" height="44" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="706" y="108" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="742" y="84" width="18" height="54" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <rect x="765" y="102" width="24" height="36" fill="none" stroke="currentColor" strokeWidth="1.3" />

      {/* baseline */}
      <line x1="0" y1="138" x2="800" y2="138" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export default function ConsultCardVisual({ lang, onClick }: { lang: LangCode; onClick: () => void }) {
  const t = TEXT[lang]
  const brand = translations[lang].brandName

  return (
    <button type="button" className="ccv-card" onClick={onClick} aria-label={t.title}>
      <div className="ccv-seam" />

      <div className="ccv-left">
        <div className="ccv-badge"><div className="ccv-cross" /></div>

        <p className="ccv-brandtag">{brand}</p>
        <p className="ccv-title">{t.title}</p>
        <div className="ccv-title-underline" />
        <p className="ccv-subtitle">{t.subtitle}</p>

        <SeoulSkyline />
      </div>

      <div className="ccv-right">
        <div className="ccv-right-header">
          <span>{t.rightHeader}</span>
          <ShieldCheck size={20} strokeWidth={2.25} style={{ flexShrink: 0 }} />
        </div>

        <div className="ccv-right-block-row">
          <span className="ccv-right-icon"><CalendarCheck size={14} strokeWidth={2} /></span>
          <div>
            <p className="ccv-right-block-title">{t.service.title}</p>
            <p className="ccv-right-block-text">{t.service.desc}</p>
          </div>
        </div>
      </div>
    </button>
  )
}
