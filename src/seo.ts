import type { LangCode } from './data/translations'

/** 현재 페이지의 zh/en 경로에 맞춰 <link rel="canonical">, og:url, hreflang 3종을 갱신.
    index.html은 모든 언어·페이지 라우트가 공유하는 단일 정적 파일이라 이 값들은
    빌드 타임에 고정할 수 없고 클라이언트에서 매번 갱신해야 함.
    zhPath/enPath는 "/zh", "/zh/surgery-price"처럼 현재 페이지의 언어별 실제 경로 —
    페이지마다 서로 다른 canonical/hreflang 쌍을 가질 수 있게 페이지 쪽에서 넘겨준다. */
export function updatePageSeo({ lang, zhPath, enPath }: { lang: LangCode; zhPath: string; enPath: string }) {
  const path = lang === 'zh' ? zhPath : enPath
  const url = `https://ai-kmedi.com${path}`

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = url
  const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
  if (ogUrl) ogUrl.content = url

  const hreflangZh = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="zh-CN"]')
  if (hreflangZh) hreflangZh.href = `https://ai-kmedi.com${zhPath}`
  const hreflangEn = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en"]')
  if (hreflangEn) hreflangEn.href = `https://ai-kmedi.com${enPath}`
  const hreflangDefault = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]')
  if (hreflangDefault) hreflangDefault.href = `https://ai-kmedi.com${zhPath}`
}
