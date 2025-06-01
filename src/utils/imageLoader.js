
// utils/imageLoader.js
const imageCache = {}

// 初始化图片映射（Vite 项目）
if (import.meta.glob) {
    const imageModules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg}', { eager: true })
    console.log(imageModules, '12313');
    Object.entries(imageModules).forEach(([path, module]) => {
        // 提取文件名（如 "background_pablo.png"）
        const fileName = path.split('/').pop()
        imageCache[fileName] = module.default
    })
}
export const loadImage = (name) => {

    // 优先从缓存获取
    if (imageCache[name]) {
        return imageCache[name]
    }

    // 回退方案：使用动态导入
    try {
        const module = import(`@/assets/${name}`)
        imageCache[name] = module.default
        return module.default
    } catch (error) {
        console.error('图片加载失败:', name)
        return imageCache['default.png'] || '/path/to/default.png'
    }
}