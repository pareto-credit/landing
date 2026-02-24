import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'PUBLIC_'],
  optimizeDeps: {
    include: ['@idle-multiverse/data-access'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /packages\/data-access/],
    },
  },
})
