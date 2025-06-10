// src/composables/useDevToolsDebugger.js

export function useDevToolsDebugger() {
    if (import.meta.env.MODE !== 'development') {
        setInterval(() => {
            const start = performance.now();
            debugger; // 关键点：触发断点
            const end = performance.now();
            // 如果debugger语句执行时间过长，说明DevTools可能打开
            if (end - start > 100) {
                debugger
            }
        }, 1000);
    }

}