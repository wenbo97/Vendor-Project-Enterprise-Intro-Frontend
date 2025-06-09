import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob'; 
// 读取 highlight.js 语言模块路径（Node.js 环境）
const highlightLangDir = path.resolve(
  __dirname,
  'node_modules/highlight.js/lib/languages'
);
const languageFiles = fs
  .readdirSync(highlightLangDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => `highlight.js/lib/languages/${file}`);
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-sitemap.json',
      apply: 'build',
      closeBundle() {
         // 获取所有 .vue 文件
        const vueFiles = glob.sync('src/**/*.vue');
        console.log(vueFiles,'vueFiles')
        const routes = vueFiles.reduce((acc, file) => {
          if(file.includes('src/views/root')){
            const path = file
              .replace('src/views/root', '')
              .replace('/index.vue', '')
              .toLowerCase();
            const lastPath = path ? path : '/';
            acc.push(lastPath);
          }
          return acc;
        }, []);
        const outPath = path.resolve(__dirname, 'dist/sitemap-routes.json')
        fs.writeFileSync(outPath, JSON.stringify(routes, null, 2))
      }
    }
  ],
  optimizeDeps: {
    include: [
      'highlight.js',
      // 预构建所有语言模块（避免动态导入时的警告）
      ...languageFiles
    ]
  },
  esbuild: {
    // 强制将 CommonJS 模块转换为 ES 模块
    include: [/node_modules\/highlight\.js\/lib\/languages/],
    loader: 'js', // 将 .js 文件视为 ES 模块
  },
  server: {
    proxy: {
      // 配置以 /api 开头的请求代理
      '/AiModel': {
        target: 'http://0.0.0.0:9999', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/AiModel/, ''), // 重写请求路径，去除 /api 前缀
      },
      // 配置以 /api 开头的请求代理
      '/api': {
        target: 'https://api.snusfactorycn.com/api', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径，去除 /api 前缀
        configure: (proxy, options) => {
          // 自定义代理请求处理
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 修改 Origin 头为目标服务器的域名
            proxyReq.setHeader('Origin', 'https://api.snusfactorycn.com');
          });
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles.scss" as *;`
      },
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@views': '/src/views',
      '@utils': '/src/utils',
      '@hljs': path.resolve(__dirname, 'node_modules/highlight.js')
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 使用 assetsInclude 排除图片文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.png') || assetInfo.name.endsWith('.webp')) {
            return 'images/[name][extname]'; // 不添加 hash，但保持文件名不变
          }
          return 'assets/[name]-[hash][extname]'; // 其他资源添加 hash
        }
      }
    }
  }
})