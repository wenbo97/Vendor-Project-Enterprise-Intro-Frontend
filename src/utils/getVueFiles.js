const getVueFiles = () => {
  const modules = import.meta.glob('../**/*.vue', { eager: true });
  const vueFiles = [];
  for (const path in modules) {
      let name;
      if (path.endsWith('index.vue')) {
          const parts = path.split('/');
          // 取倒数第二个部分作为文件夹名称
          name = parts[parts.length - 2];
      } else {
          name = path.split('/').pop().replace('.vue', '');
      }
      const component = modules[path].default;
      vueFiles.push({ name, path, component });
  }
  return vueFiles;
};

export default getVueFiles;    