import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { VitePWA } from 'vite-plugin-pwa'

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
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'serviceWorker.ts',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Learn By Example: PWA',
        short_name: 'LBE',
        description: 'A Vite PWA App for Learning',
        theme_color: '#336699',
        background_color: '#336699',
        icons: [
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-192.png',
            sizes: '72x72 96x96 128x128 256x256',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icon-60.png',
            sizes: '48x48',
          },
        ],
      },
      injectManifest: {
        swSrc: './src/serviceWorker.ts',
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
})
