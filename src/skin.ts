/** 같은 코드로 두 도메인을 서비스하기 위한 빌드 타임 스킨 선택.
    - default   : ai-kmedi.com (지금 디자인)
    - editorial : kmedispring.com (옛 사이트의 HTML5 UP Editorial 디자인)
    빌드할 때 VITE_SKIN=editorial 을 주면 editorial 스킨으로 빌드된다. 상수라서
    default 빌드에서는 editorial 코드·CSS가 번들에서 통째로 빠진다. */
export type Skin = 'default' | 'editorial'

export const SKIN: Skin = import.meta.env.VITE_SKIN === 'editorial' ? 'editorial' : 'default'

/** 검색엔진 대표 주소 — vite.config.ts에서 스킨별 기본값을 정한다(환경변수 VITE_CANONICAL_ORIGIN으로 덮어쓰기 가능). */
export const CANONICAL_ORIGIN: string = import.meta.env.VITE_CANONICAL_ORIGIN ?? 'https://ai-kmedi.com'

/** 이 사이트 자신의 도메인 — 화면 문구 속 "汉江春天（ai-kmedi.com）" 같은 자기소개에 쓴다. */
export const SITE_DOMAIN = SKIN === 'editorial' ? 'kmedispring.com' : 'ai-kmedi.com'

/** 공용 문구(translations 등)에 박힌 "ai-kmedi.com"을 지금 사이트의 도메인으로 바꿔 보여준다. */
export const siteText = (s: string) => s.replace(/ai-kmedi\.com/g, SITE_DOMAIN)
