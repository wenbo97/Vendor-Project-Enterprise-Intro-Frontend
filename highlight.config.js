// src/directives/highlight.config.js
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 使用 Vite 别名简化路径（@hljs 指向 node_modules/highlight.js）
const languageFiles = import.meta.glob(
  '/@hljs/lib/languages/*.js', // Vite 别名解析后的路径
  {
    eager: true, // 立即加载模块
    query: '?default', // 获取默认导出（兼容 CommonJS → ES 模块转换）
  }
);

// 注册所有语言
Object.entries(languageFiles).forEach(([path, langModule]) => {
  const langName = path.split('/').pop()?.replace('.js', '');
  if (langName) hljs.registerLanguage(langName, langModule);
});

export const LANG_ALIAS = {
  ts: 'typescript',
  js: 'javascript',
  py: 'python',
  vue: 'vue',
};

export default hljs;