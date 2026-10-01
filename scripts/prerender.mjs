/**
 * 빌드 후 /zh, /en을 실제로 렌더링해서 정적 HTML로 저장한다.
 * App.tsx가 클라이언트에서 채우는 title/meta/canonical/H1을 그대로 캡처하므로,
 * seoMeta 등 SEO 문구를 여기서 다시 정의하지 않는다 — 실제 렌더링 결과가 곧 정답.
 * 새 의존성 없이 기존 devDependency(vite, playwright)만 사용.
 *
 * 이 스크립트는 절대 빌드를 실패시키지 않는다(항상 exit 0). Netlify처럼
 * Chromium 실행 파일이 미리 설치돼 있지 않은 CI 환경에서는 최초 1회
 * `playwright install chromium`을 자동 시도하고, 그마저 실패하면(네트워크
 * 제한 등) prerender만 건너뛴다 — 그래도 vite build 결과물(App.tsx의
 * 클라이언트 사이드 meta 갱신)로 정상 배포되므로 사이트 자체는 영향 없다.
 */
import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories } from '../src/data/categories.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const port = 4174

// medical-tourism은 CategoryPage가 없고 항상 패키지 페이지로 리다이렉트되는
// 항목이라 고유 경로가 없다(main.tsx/AppContext와 일관).
const categoryIds = categories.filter((c) => c.id !== 'medical-tourism').map((c) => c.id)
const categoryRoutes = categoryIds.flatMap((id) => [`/zh/${id}`, `/en/${id}`])

// kmedispring.com(VITE_SKIN=editorial) 빌드는 세부 항목마다 고유 페이지(/zh/skin-beauty/skin-lifting)가
// 있어서 그것도 미리 렌더링한다. 키워드 데이터 파일은 확장자 없는 import가 섞여 있어 Node로 직접
// 불러올 수 없으므로, 각 파일의 키워드 id(4칸 들여쓴 `id: '...'`)만 정규식으로 뽑는다.
const isEditorial = process.env.VITE_SKIN === 'editorial'
const KEYWORD_FILES = {
  'skin-beauty': 'skinAestheticsKeywords.ts',
  'plastic-surgery': 'plasticSurgeryKeywords.ts',
  'big-health': 'bigHealthKeywords.ts',
  'stem-cell': 'stemCellKeywords.ts',
  'womens-care': 'womensHealthKeywords.ts',
  'mens-health': 'mensHealthKeywords.ts',
}
const topicRoutes = !isEditorial ? [] : Object.entries(KEYWORD_FILES).flatMap(([catId, file]) => {
  const src = readFileSync(resolve(root, 'src/data', file), 'utf-8')
  const ids = [...src.matchAll(/^ {4}id: '([^']+)'/gm)].map((m) => m[1])
  return ids.flatMap((id) => [`/zh/${catId}/${id}`, `/en/${catId}/${id}`])
})

/** 아래 경로 목록은 "/zh/…" 이름으로 관리하고, 실제 주소로 바꿀 때만 이걸 쓴다 —
    kmedispring.com은 중국어가 루트(사용자 결정)라 /zh를 뗀다(src/skin.ts의 sitePath와 같은 규칙). */
const sitePathOf = (r) => (isEditorial ? (r.replace(/^\/zh(?=\/|$)/, '') || '/') : r)
const partnersRoutes = isEditorial ? ['/zh/partners', '/en/partners'] : [] // kmedispring.com 전용 페이지
const routes = ['/zh', '/en', '/zh/surgery-price', '/en/surgery-price', '/zh/quote', '/en/quote', ...categoryRoutes, ...topicRoutes, ...partnersRoutes]

// 홈(/zh, /en)은 처음부터 page==='home'으로 렌더링되지만, surgery-price·카테고리
// 페이지는 마운트 시 page==='home'으로 시작했다가 pathname을 보고 전환된다
// (AnimatePresence mode="wait"로 홈→해당 페이지 전환 애니메이션까지 거침).
// 그래서 범용 "h1" 셀렉터로만 기다리면 홈의 h1(.hero-seo-headline)이 이미
// 존재한다는 이유로 전환이 끝나기 전에 캡처해버려 홈 내용이 찍힐 수 있다.
// 페이지마다 고유한 셀렉터로 "그 페이지가 진짜 마운트됐는지"를 확인한다.
function waitSelectorFor(route) {
  if (route.endsWith('/surgery-price')) return '.sg-title'
  if (route.endsWith('/quote')) return '.quote-hero-title'
  if (isEditorial) {
    if (partnersRoutes.includes(route)) return '.ed-partners header.main h1'
    if (topicRoutes.includes(route)) return '.ed-topic header.main h1'
    if (categoryIds.some((id) => route.endsWith(`/${id}`))) return '.ed-page header.main h1'
    return '#banner h1'
  }
  if (categoryIds.some((id) => route.endsWith(`/${id}`))) return '.cat-hero-name'
  return '.hero-seo-headline'
}

// Netlify 등 CI 빌드 컨테이너가 root로 실행되는 경우 --no-sandbox 없이는
// chromium이 아예 뜨지 않는 경우가 흔해서 기본으로 넣어둔다(빌드 타임 전용, 사이트 런타임과 무관).
const LAUNCH_OPTS = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }

async function loadChromiumLauncher() {
  const { chromium } = await import('playwright')
  try {
    const browser = await chromium.launch(LAUNCH_OPTS)
    return { chromium, browser }
  } catch (err) {
    console.warn('[prerender] chromium 실행 파일이 없어 설치를 시도합니다:', err instanceof Error ? err.message : err)
    try {
      execFileSync(process.execPath, [resolve(root, 'node_modules/playwright/cli.js'), 'install', 'chromium'], {
        cwd: root,
        stdio: 'inherit',
      })
    } catch (installErr) {
      throw new Error(`chromium 자동 설치 실패: ${installErr instanceof Error ? installErr.message : installErr}`)
    }
    const browser = await chromium.launch(LAUNCH_OPTS)
    return { chromium, browser }
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url)
      return
    } catch {
      await new Promise((r) => setTimeout(r, 300))
    }
  }
  throw new Error(`preview server did not respond within ${timeoutMs}ms`)
}

/** kmedispring.com 빌드 전용: public/의 ai-kmedi.com용 sitemap.xml·robots.txt 대신 이 도메인의
    전체 페이지(세부 항목 포함)를 담은 것으로 덮어쓴다. 브라우저 없이 되는 작업이라 prerender 실패와 무관. */
function writeEditorialSitemap() {
  const origin = process.env.VITE_CANONICAL_ORIGIN || 'https://kmedispring.com'
  const zhRoutes = routes.filter((r) => r === '/zh' || r.startsWith('/zh/'))
  const lastmod = new Date().toISOString().slice(0, 10) // 배포할 때마다 내용이 갱신되므로 빌드 날짜
  // 우선순위: 홈 > 대카테고리·견적·제휴 > 세부 항목
  const priority = (zh) => (zh === '/zh' ? '1.0' : zh.split('/').length > 3 ? '0.6' : '0.8')
  const entry = (zhRoute) => {
    const zh = sitePathOf(zhRoute) // 중국어 메인은 루트(/zh 없음)
    const en = zhRoute.replace(/^\/zh/, '/en')
    const alt = `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${origin}${zh}" />
    <xhtml:link rel="alternate" hreflang="en" href="${origin}${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${zh}" />`
    return [zh, en].map((loc) => `  <url>\n    <loc>${origin}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority(zhRoute)}</priority>\n${alt}\n  </url>`).join('\n')
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${zhRoutes.map(entry).join('\n')}
</urlset>
`
  writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf-8')
  writeFileSync(resolve(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 'utf-8')
  console.log(`[prerender] wrote dist/sitemap.xml (${zhRoutes.length * 2} urls) + robots.txt for ${origin}`)
}

async function main() {
  if (isEditorial) writeEditorialSitemap()
  const viteBin = resolve(root, 'node_modules/vite/bin/vite.js')
  const server = spawn(process.execPath, [viteBin, 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let serverLog = ''
  server.stdout.on('data', (d) => { serverLog += d.toString() })
  server.stderr.on('data', (d) => { serverLog += d.toString() })

  try {
    await waitForServer(`http://localhost:${port}/en`)

    const { browser } = await loadChromiumLauncher()
    try {
      let rootHtml = null
      for (const route of routes) {
        const url = sitePathOf(route) // 실제 주소(kmedispring.com은 /zh 없음)
        const page = await browser.newPage()
        await page.goto(`http://localhost:${port}${url}`, { waitUntil: 'networkidle' })
        await page.locator(waitSelectorFor(route)).first().waitFor({ state: 'attached', timeout: 10000 })

        const html = `<!doctype html>\n${await page.content()}`
        await page.close()
        // 루트(kmedispring.com 중국어 메인)는 dist/index.html — 다른 페이지를 다 찍은 뒤에 덮어쓴다
        // (그 전에 바꾸면 미리보기 서버가 나머지 페이지에 이 HTML을 내준다)
        if (url === '/') { rootHtml = html; continue }
        // "<route>/index.html"이 아니라 "<route>.html"로 저장 — Netlify가 디렉터리
        // index를 서빙할 때 자동으로 붙이는 301(/zh → /zh/) 없이, canonical과
        // 정확히 같은 URL(무슬래시)로 바로 200을 받게 하기 위함.
        const outFile = resolve(distDir, `${url.replace(/^\//, '')}.html`)
        mkdirSync(dirname(outFile), { recursive: true })
        writeFileSync(outFile, html, 'utf-8')
        console.log(`[prerender] wrote dist${url}.html`)
      }
      if (rootHtml) {
        writeFileSync(resolve(distDir, 'index.html'), rootHtml, 'utf-8')
        console.log('[prerender] wrote dist/index.html (중국어 메인)')
      }
    } finally {
      await browser.close()
    }
  } catch (err) {
    // prerender는 부가 기능일 뿐 — 실패해도 빌드는 성공시켜 배포가 막히지 않게 한다.
    // (vite build 결과물만으로도 App.tsx의 클라이언트 사이드 meta 갱신이 정상 동작함)
    console.warn('[prerender] 건너뜀 — 정적 SEO 스냅샷 생성 실패, 클라이언트 사이드 meta로 폴백합니다.')
    console.warn('[prerender] 원인:', err instanceof Error ? err.message : err)
    if (serverLog) console.warn('[prerender] vite preview log:\n' + serverLog)
  } finally {
    server.kill()
  }
}

main()
