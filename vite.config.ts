/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss()],
  envPrefix: ['VITE_', 'PUBLIC_'],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  optimizeDeps: {
    include: ['@idle-multiverse/data-access'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /packages\/data-access/],
    },
  },
})
