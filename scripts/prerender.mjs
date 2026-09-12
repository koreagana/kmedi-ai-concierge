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
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const port = 4174
const routes = ['/zh', '/en']

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

async function main() {
  const viteBin = resolve(root, 'node_modules/vite/bin/vite.js')
  const server = spawn(process.execPath, [viteBin, 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let serverLog = ''
  server.stdout.on('data', (d) => { serverLog += d.toString() })
  server.stderr.on('data', (d) => { serverLog += d.toString() })

  try {
    await waitForServer(`http://localhost:${port}/zh`)

    const { browser } = await loadChromiumLauncher()
    try {
      for (const route of routes) {
        const page = await browser.newPage()
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle' })
        await page.locator('h1').first().waitFor({ state: 'attached', timeout: 10000 })

        const html = `<!doctype html>\n${await page.content()}`
        const outDir = resolve(distDir, route.replace(/^\//, ''))
        mkdirSync(outDir, { recursive: true })
        writeFileSync(resolve(outDir, 'index.html'), html, 'utf-8')
        console.log(`[prerender] wrote dist${route}/index.html`)

        await page.close()
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
