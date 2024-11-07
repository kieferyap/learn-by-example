import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* Vue Router options go here */
    }),
    AutoImport({
      imports: ['vue-router', VueRouterAutoImports],
      dts: true // TypeScript Declarations
    }),
    vue()
  ],
})
