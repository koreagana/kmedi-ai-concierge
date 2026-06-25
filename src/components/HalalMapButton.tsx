import './HalalMapButton.css'

interface HalalMapButtonProps {
  onClick?: () => void
  dir?: 'rtl' | 'ltr'
}

export default function HalalMapButton({ onClick, dir = 'rtl' }: HalalMapButtonProps) {
  return (
    <button type="button" className="halal-cta" onClick={onClick} dir={dir}>
      <span className="halal-cta__text">
        <span className="halal-cta__title">
          {dir === 'rtl' ? 'خريطة المطاعم الحلال' : '할랄 식당 지도'}
        </span>
        <span className="halal-cta__subtitle">
          {dir === 'rtl' ? 'اعثر على مطعم حلال قريب منك' : '주변 할랄 식당 찾기'}
        </span>
      </span>
      <span className="halal-cta__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
    </button>
  )
}
