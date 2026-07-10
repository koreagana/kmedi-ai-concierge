import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
      },
    },
  },
})
