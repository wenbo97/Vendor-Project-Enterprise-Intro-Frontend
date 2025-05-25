import axios from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 替换为实际的 API 基础 URL
    timeout: 10000 // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如添加请求头
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error('请求出错:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        if (error.response) {
            console.error('响应错误，状态码:', error.response.status);
            console.error('响应错误信息:', error.response.data);
        } else if (error.request) {
            console.error('请求已发送，但没有收到响应');
        } else {
            console.error('请求出错:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;    