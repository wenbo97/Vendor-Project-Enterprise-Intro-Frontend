import hljs from 'highlight.js'
// 语言别名映射（兼容后台返回的非标准类型）
const LANG_ALIAS = {
  ts: 'typescript',
  js: 'javascript',
  py: 'python',
  vue: 'vue',
  html: 'xml', // Highlight.js 使用 xml 表示 HTML
  md: 'markdown',
  sh: 'bash',
  json: 'json',
  css: 'css',
  tsx: 'typescript',
  jsx: 'javascript',
};
// 提取更新高亮的逻辑
const updateHighlight = (el, binding) => {
  const codeBlock = el.querySelector('code');
  const preBlock = el.querySelector('pre')
  if (!codeBlock) return;
  
  // 获取语言类型（支持别名映射）
  const rawLang = binding.value || el.dataset.lang || 'plaintext';
  const lang = LANG_ALIAS[rawLang] || rawLang;
  if(preBlock) {
    // preBlock.className = `language-${lang}`
  }
  // 设置语言和内容
  // codeBlock.className = `language-${lang}`;
  
  // 设置黑色背景（可通过 CSS 变量或内联样式）
  const pre = codeBlock.parentElement;
  if (pre) {
    // pre.style.backgroundColor = '#000'; // 纯黑色背景
    // pre.style.padding = '1rem';
    // pre.style.borderRadius = '4px';
    // pre.style.color = '#fff'
    // pre.style.fontSize = '14px'
  }

  // 应用高亮
  if (hljs.getLanguage(lang)) {
    hljs.highlightElement(codeBlock);
  } else {
    console.warn(`Language ${lang} not supported`);
  }
};
// 高亮指令逻辑
export const highlight = {
  mounted(el, binding) {
    updateHighlight(el, binding);
  },
  updated(el, binding) {
    // 仅在值变化时重新高亮
    if (binding.value !== binding.oldValue) {
      updateHighlight(el, binding);
    }
  },
};