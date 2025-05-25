// src/utils/codeParser.js
export const parseCodeBlock = (markdownCode) => {
  if (!markdownCode) return { lang: null, code: '' };
  
  // 匹配 ```language\ncode\n``` 格式
  const regex = /^```(\w+)\n([\s\S]*?)```$/;
  const match = markdownCode.trim().match(regex);
  console.log(match , 'match')
  if (match) {
    return {
      lang: match[1].toLowerCase(), // 提取语言类型
      code: match[2] // 提取代码内容
    };
  }
  
  // 无语言前缀时，返回原始内容和默认语言
  return {
    lang: 'plaintext',
    code: markdownCode
  };
};