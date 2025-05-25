import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router, initRoutes } from './router';
import { directives } from './directive/index.js'; // 导入所有指令
const initApp = async () => {
  await initRoutes();
  const app = createApp(App);
  app.use(router);
  app.use(ElementPlus);
  // 批量注册指令
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive);
  });
  app.mount('#app'); 
  return app;
};

initApp(); 