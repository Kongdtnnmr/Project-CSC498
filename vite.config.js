// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/',
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://yoshihiko.app.n8n.cloud',
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api/, ''),
      },
    },
  },
})
