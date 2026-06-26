import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.CI ? '/Potato-Ship/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
