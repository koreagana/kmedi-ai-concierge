/** 같은 코드로 두 도메인을 서비스하기 위한 빌드 타임 스킨 선택.
    - default   : ai-kmedi.com (지금 디자인)
    - editorial : kmedispring.com (옛 사이트의 HTML5 UP Editorial 디자인)
    빌드할 때 VITE_SKIN=editorial 을 주면 editorial 스킨으로 빌드된다. 상수라서
    default 빌드에서는 editorial 코드·CSS가 번들에서 통째로 빠진다. */
export type Skin = 'default' | 'editorial'

export const SKIN: Skin = import.meta.env.VITE_SKIN === 'editorial' ? 'editorial' : 'default'
