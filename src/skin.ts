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

/** 중국어 주소에 /zh를 붙일지 — kmedispring.com은 중국어가 메인이라 루트(/, /skin-beauty …)를 쓰고
    (사용자 결정 2026-10-01), 영어는 /en/… 그대로. ai-kmedi.com은 기존처럼 /zh/…. */
export const ZH_AT_ROOT = SKIN === 'editorial'

/** 언어별 사이트 내부 주소. rest는 '' | '/quote' | '/skin-beauty/x' | '?page=package' 형태. */
export function langPath(lang: 'zh' | 'en', rest = ''): string {
  const base = lang === 'zh' && ZH_AT_ROOT ? '' : `/${lang}`
  if (!rest) return base || '/'
  if (rest.startsWith('?')) return (base || '/') + rest
  return base + rest
}

/** '/zh…' 형태의 경로(검색엔진용 정규 주소·경로 데이터 등)를 이 사이트의 실제 주소로 — kmedispring.com에선 /zh를 뗀다 */
export const sitePath = (p: string) => (ZH_AT_ROOT ? (p.replace(/^\/zh(?=\/|\?|$)/, '') || '/') : p)

/** 공용 문구(translations 등)에 박힌 "ai-kmedi.com"을 지금 사이트의 도메인으로 바꿔 보여준다. */
export const siteText = (s: string) => s.replace(/ai-kmedi\.com/g, SITE_DOMAIN)
