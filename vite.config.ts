import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 검색엔진 대표 주소(canonical·og:url·hreflang·JSON-LD). index.html의 %VITE_CANONICAL_ORIGIN%와
// src/skin.ts가 같은 값을 쓴다. 사용자 결정(2026-09-30): 대표 주소는 kmedispring.com.
//  - editorial 빌드(kmedispring.com): 기본 https://kmedispring.com
//  - default 빌드(ai-kmedi.com): 기본 https://ai-kmedi.com — kmedispring.com이 새 사이트로 연결된 뒤
//    ai-kmedi.com 네피 사이트에 VITE_CANONICAL_ORIGIN=https://kmedispring.com 환경변수만 넣으면 전환된다.
process.env.VITE_CANONICAL_ORIGIN ??=
  process.env.VITE_SKIN === 'editorial' ? 'https://kmedispring.com' : 'https://ai-kmedi.com'

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
      },
    },
  },
})
