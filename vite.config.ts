import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 검색엔진 대표 주소(canonical·og:url·hreflang·JSON-LD). index.html의 %VITE_CANONICAL_ORIGIN%와
// src/skin.ts가 같은 값을 쓴다. 사용자 결정(2026-10-12): 홍보·SEO는 kmedispring.com 하나로 —
// ai-kmedi.com은 사이트는 그대로 두되 canonical을 kmedispring.com의 같은 페이지로 걸어 검색 점수를 한곳에 모은다.
// 그래서 두 빌드 모두 기본값이 https://kmedispring.com (환경변수 VITE_CANONICAL_ORIGIN으로 덮어쓰기 가능).
// 대표 주소의 중국어 메인은 루트(/) — index.html의 %VITE_ZH_HOME%
process.env.VITE_ZH_HOME ??= '/'
process.env.VITE_CANONICAL_ORIGIN ??= 'https://kmedispring.com'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        intakeFunctional: resolve(__dirname, 'intake/functional/index.html'),
        prepHealthCheckupBefore: resolve(__dirname, 'prep/health-checkup-before/index.html'),
        prepBloodTestBefore: resolve(__dirname, 'prep/blood-test-before/index.html'),
        prepImagingBefore: resolve(__dirname, 'prep/imaging-before/index.html'),
        prepColonoscopyBefore: resolve(__dirname, 'prep/colonoscopy-before/index.html'),
        adminPrep: resolve(__dirname, 'admin/prep/index.html'),
        adminPartners: resolve(__dirname, 'admin/partners/index.html'),
        adminHospitalSearch: resolve(__dirname, 'admin/병원찾기/index.html'),
        adminPrices: resolve(__dirname, 'admin/prices/index.html'),
      },
    },
  },
})
