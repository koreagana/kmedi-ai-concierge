import type { LangCode } from './data/translations'
import { CANONICAL_ORIGIN, sitePath } from './skin'

/** 현재 페이지의 zh/en 경로에 맞춰 <link rel="canonical">, og:url, hreflang 3종을 갱신.
    index.html은 모든 언어·페이지 라우트가 공유하는 단일 정적 파일이라 이 값들은
    빌드 타임에 고정할 수 없고 클라이언트에서 매번 갱신해야 함.
    zhPath/enPath는 "/zh", "/zh/surgery-price"처럼 현재 페이지의 언어별 실제 경로 —
    페이지마다 서로 다른 canonical/hreflang 쌍을 가질 수 있게 페이지 쪽에서 넘겨준다. */
export function updatePageSeo({ lang, zhPath: zhRaw, enPath }: { lang: LangCode; zhPath: string; enPath: string }) {
  const zhPath = sitePath(zhRaw) // kmedispring.com은 중국어가 루트(/zh 없음)
  const path = lang === 'zh' ? zhPath : enPath
  const url = `${CANONICAL_ORIGIN}${path}`

  // 페이지 언어 — index.html은 lang="zh" 하나뿐이라 영어 페이지도 중국어로 표시되던 것을 바로잡는다
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  const ogLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')
  if (ogLocale) ogLocale.content = lang === 'zh' ? 'zh_CN' : 'en_US'

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = url
  const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
  if (ogUrl) ogUrl.content = url

  const hreflangZh = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="zh-CN"]')
  if (hreflangZh) hreflangZh.href = `${CANONICAL_ORIGIN}${zhPath}`
  const hreflangEn = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en"]')
  if (hreflangEn) hreflangEn.href = `${CANONICAL_ORIGIN}${enPath}`
  const hreflangDefault = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]')
  if (hreflangDefault) hreflangDefault.href = `${CANONICAL_ORIGIN}${zhPath}`
}

/** 경로(首页 › 皮肤医美 › 皮肤提升)를 검색엔진용 BreadcrumbList 구조화 데이터로 넣는다.
    검색 결과에 주소 대신 경로가 보이게 해준다. 빈 배열이면(홈) 지운다. prerender가 결과를 정적 HTML에 담는다. */
export function updateBreadcrumbLd(items: { name: string; path: string }[]) {
  const id = 'ld-breadcrumb'
  document.getElementById(id)?.remove()
  if (items.length < 2) return
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id = id
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${CANONICAL_ORIGIN}${sitePath(it.path)}`,
    })),
  })
  document.head.appendChild(el)
}
