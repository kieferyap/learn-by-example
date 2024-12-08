// vite.config.ts
import { defineConfig } from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/vite/dist/node/index.js";
import vue from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/unplugin-vue-router/dist/vite.js";
import AutoImport from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/unplugin-auto-import/dist/vite.js";
import { VueRouterAutoImports } from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/unplugin-vue-router/dist/index.js";
import { VitePWA } from "file:///home/keep/code/learn-by-example/web-development/front-end/vue-3/18-pwa/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      /* Vue Router options go here */
    }),
    AutoImport({
      imports: ["vue-router", VueRouterAutoImports],
      dts: true
      // TypeScript Declarations
    }),
    vue(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "serviceWorker.ts",
      registerType: "autoUpdate",
      manifest: {
        name: "Learn By Example: PWA",
        short_name: "LBE",
        description: "A Vite PWA App for Learning",
        theme_color: "#336699",
        background_color: "#336699",
        icons: [
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icons/icon-128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/icon-48.png",
            sizes: "48x48"
          }
        ],
        screenshots: [
          {
            src: "/sources/01-desktop.png",
            sizes: "655x376",
            type: "image/png",
            form_factor: "wide",
            label: "Application"
          },
          {
            src: "/sources/02-mobile.png",
            sizes: "416x438",
            type: "image/png",
            form_factor: "narrow",
            label: "Application"
          }
        ]
      },
      injectManifest: {
        swSrc: "./src/serviceWorker.ts"
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rZWVwL2NvZGUvbGVhcm4tYnktZXhhbXBsZS93ZWItZGV2ZWxvcG1lbnQvZnJvbnQtZW5kL3Z1ZS0zLzE4LXB3YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva2VlcC9jb2RlL2xlYXJuLWJ5LWV4YW1wbGUvd2ViLWRldmVsb3BtZW50L2Zyb250LWVuZC92dWUtMy8xOC1wd2Evdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUva2VlcC9jb2RlL2xlYXJuLWJ5LWV4YW1wbGUvd2ViLWRldmVsb3BtZW50L2Zyb250LWVuZC92dWUtMy8xOC1wd2Evdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBWdWVSb3V0ZXJBdXRvSW1wb3J0cyB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXInXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZVJvdXRlcih7XG4gICAgICAvKiBWdWUgUm91dGVyIG9wdGlvbnMgZ28gaGVyZSAqL1xuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogWyd2dWUtcm91dGVyJywgVnVlUm91dGVyQXV0b0ltcG9ydHNdLFxuICAgICAgZHRzOiB0cnVlIC8vIFR5cGVTY3JpcHQgRGVjbGFyYXRpb25zXG4gICAgfSksXG4gICAgdnVlKCksXG4gICAgVml0ZVBXQSh7XG4gICAgICBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxuICAgICAgc3JjRGlyOiAnc3JjJyxcbiAgICAgIGZpbGVuYW1lOiAnc2VydmljZVdvcmtlci50cycsXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdMZWFybiBCeSBFeGFtcGxlOiBQV0EnLFxuICAgICAgICBzaG9ydF9uYW1lOiAnTEJFJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBIFZpdGUgUFdBIEFwcCBmb3IgTGVhcm5pbmcnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMzMzY2OTknLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzMzNjY5OScsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2ljb25zL2ljb24tNTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvaWNvbnMvaWNvbi0xMjgucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTI4eDEyOCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvaWNvbnMvaWNvbi00OC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvc291cmNlcy8wMS1kZXNrdG9wLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzY1NXgzNzYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBmb3JtX2ZhY3RvcjogJ3dpZGUnLFxuICAgICAgICAgICAgbGFiZWw6ICdBcHBsaWNhdGlvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9zb3VyY2VzLzAyLW1vYmlsZS5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc0MTZ4NDM4JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgZm9ybV9mYWN0b3I6ICduYXJyb3cnLFxuICAgICAgICAgICAgbGFiZWw6ICdBcHBsaWNhdGlvbidcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBpbmplY3RNYW5pZmVzdDoge1xuICAgICAgICBzd1NyYzogJy4vc3JjL3NlcnZpY2VXb3JrZXIudHMnLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgc2tpcFdhaXRpbmc6IHRydWUsXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WSxTQUFTLG9CQUFvQjtBQUNwYSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUE7QUFBQSxJQUVWLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxjQUFjLG9CQUFvQjtBQUFBLE1BQzVDLEtBQUs7QUFBQTtBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQWE7QUFBQSxVQUNYO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixhQUFhO0FBQUEsWUFDYixPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLGFBQWE7QUFBQSxZQUNiLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLFFBQ2QsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
