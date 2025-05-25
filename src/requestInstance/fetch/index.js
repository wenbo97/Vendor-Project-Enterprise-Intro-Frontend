// 封装带有拦截器的 Fetch 请求
const createFetchInstance = (baseUrl) => {
  // 请求拦截器
  const requestInterceptor = (url, options = {}) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //       options.headers = {
    //           ...options.headers,
    //           Authorization: `Bearer ${token}`
    //       };
    //   }
      return [url.startsWith('http') ? url : `${baseUrl}${url}`, options];
  };

  // 响应拦截器
  const responseInterceptor = async (response) => {
    console.log(response);
      if (!response.ok) {
          console.error('响应错误，状态码:', response.status);
          try {
              const errorData = await response.json();
              console.error('响应错误信息:', errorData);
          } catch (parseError) {
              console.error('解析响应错误信息出错:', parseError);
          }
          throw new Error(`请求失败，状态码: ${response.status}`);
      }
      return response;
  };

  const customFetch = async (url, options = {}) => {
      const [newUrl, newOptions] = requestInterceptor(url, options);
      const response = await fetch(newUrl, newOptions);
      return responseInterceptor(response);
  };

  return customFetch;
};

// 创建 Fetch 实例
const fetchInstance = createFetchInstance(import.meta.env.VITE_API_BASE_URL); // 替换为实际的 API 基础 URL

export default fetchInstance;    