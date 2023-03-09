import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/_global.scss";',
      },
    },
  },

  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
  },
})
