import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react(), legacy({
    targets: ['defaults', 'IE 11'],
    additionalLegacyPolyfills: ['whatwg-fetch']
  })]
})
