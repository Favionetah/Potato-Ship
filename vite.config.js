import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Potato-Ship/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
