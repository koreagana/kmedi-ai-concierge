/**
 * /zh?page=surgery, /en?page=surgery 구 URL을 새 고유 경로(/zh/surgery-price,
 * /en/surgery-price)로 서버 단 301 리다이렉트한다.
 *
 * netlify.toml의 query 조건부 [[redirects]](force=true 포함)로는 안 됐다 —
 * /zh, /en에 정적 파일(zh.html, en.html)이 실제로 있어서, Netlify가 그 정적
 * 파일 매치를 쿼리스트링과 무관하게 우선시했다(배포 후 /zh?page=surgery와
 * /zh?아무값이 zh.html과 동일한 ETag로 응답하는 걸로 확인). Edge Function은
 * 정적 파일 서빙보다 먼저 실행되므로 여기서 확실하게 가로챈다.
 *
 * page=surgery가 아니면 아무 응답도 반환하지 않고 그대로 통과시켜(pass-through)
 * /zh, /en의 기존 동작(다른 쿼리 파라미터 포함)에 전혀 영향을 주지 않는다.
 */
export default async (req: Request) => {
  const url = new URL(req.url)
  if (url.searchParams.get('page') !== 'surgery') return

  const lang = url.pathname === '/en' ? 'en' : 'zh'
  return new Response(null, {
    status: 301,
    headers: { Location: `${url.origin}/${lang}/surgery-price` },
  })
}
