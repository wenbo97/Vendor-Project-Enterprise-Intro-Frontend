import { createRouter, createWebHistory } from 'vue-router';
import getVueFiles from '../utils/getVueFiles';
import getPermissionConfig from '../api/permission';

const generateRoutes = async () => {
    const vueFiles = getVueFiles();
    const routes = []; 
    const permissionConfig = await getPermissionConfig()

    const processRoutes = (configItems, parentPath = '') => {
        const result = [];
        configItems.forEach((item) => {
            const vueFile = vueFiles.find((file) => file.name === item.name);
            if (vueFile && item.permission) {
                const route = {
                    path: parentPath + item.path,
                    name: item.name,
                    component: vueFile.component,
                };
                if (item.children && item.children.length > 0) {
                    route.children = processRoutes(item.children, parentPath + item.path);
                }
                if (item.redirect) {
                    route.redirect = item.redirect;
                }
                result.push(route);
            }
        });
        return result;
    };

    routes.push(...processRoutes(permissionConfig));
    return routes;
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[]
});

const initRoutes = async () => {
    const routes = await generateRoutes();
    routes.forEach((route) => {
        router.addRoute(route);
    });
};

export { router, initRoutes };