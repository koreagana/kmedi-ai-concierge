import type { LangCode } from './data/translations'

/** 현재 언어 경로(/zh, /ko, /en, /ar)에 맞춰 <link rel="canonical"> href를 갱신.
    index.html은 모든 언어 라우트가 공유하는 단일 정적 파일이라 canonical만은
    빌드 타임에 고정할 수 없고 클라이언트에서 언어별로 갱신해야 함. */
export function updateCanonical(lang: LangCode) {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = `https://ai-kmedi.com/${lang}`
}
