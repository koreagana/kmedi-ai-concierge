// 배포가 끝날 때마다 Netlify가 자동으로 부르는 함수(이름이 deploy-succeeded라서) — kmedispring.com의
// 사이트맵 주소 전체를 IndexNow(빙·네이버·얀덱스 등)에 "바뀌었어요"라고 알린다(2026-10-12).
// 빙 웹마스터 새 화면엔 URL 직접 제출 메뉴가 없어서 이걸로 대신한다.
// ai-kmedi.com 사이트도 같은 코드로 배포되지만, 검색 점수는 kmedispring.com으로 모으기로 했으므로 그쪽에선 아무것도 안 한다.

const HOST = 'kmedispring.com'
const KEY = '661cdb2ea64f6b1dc500b773b644aef5' // public/<KEY>.txt 와 같은 값

export const handler = async () => {
  const siteUrl = process.env.URL || ''
  if (!siteUrl.includes(HOST)) return { statusCode: 200, body: `skip: ${siteUrl}` }

  try {
    const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
    const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    if (!urlList.length) return { statusCode: 200, body: 'no urls in sitemap' }

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    })
    console.log(`[indexnow] ${urlList.length} urls → ${res.status}`)
    return { statusCode: 200, body: `indexnow ${res.status}` }
  } catch (err) {
    // 알림 실패는 배포와 무관 — 로그만 남긴다
    console.log('[indexnow] failed:', err instanceof Error ? err.message : err)
    return { statusCode: 200, body: 'indexnow failed' }
  }
}
