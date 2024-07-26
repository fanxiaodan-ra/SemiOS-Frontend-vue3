import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vitejs.dev/config/


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_CDN_URL ? env.VITE_CDN_URL : "/",
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames(assetInfo) {
            //文件名称
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash].css'
            }
            const fontExts = ['.woff', '.woff2', '.ttf', '.eot']
            if (fontExts.some(ext => assetInfo.name.endsWith(ext))) {
              return 'fonts/[name]-[hash].[ext]'
            }
            //图片名称
            //定义图片后缀
            const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico']
            if (imgExts.some(ext => assetInfo.name.endsWith(ext))) {
              return 'images/[name]-[hash].[ext]'
            }
            //剩余资源文件
            return 'assets/[name].[ext]'
          }
        }
      }
    },
    plugins: [
      vue(),
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          "fs", // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 8080,
      proxy: {
        "/api": {
          target: "https://test-api.protodao.io",
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on('proxyReq', function (proxyReq, req, res) {
              proxyReq.removeHeader('referer')  //移除请求头---最主要是设置这个
              proxyReq.removeHeader('origin') //移除请求头---最主要是设置这个
            });
          },
        },
        "/dex-api": {
          target: "https://test-api.protodao.io",
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on('proxyReq', function (proxyReq, req, res) {
              proxyReq.removeHeader('referer')  //移除请求头---最主要是设置这个
              proxyReq.removeHeader('origin') //移除请求头---最主要是设置这个
            });
          },
        },
      },
    },
  }
});
