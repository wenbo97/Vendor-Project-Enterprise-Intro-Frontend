
import fetchInstance from '@/requestInstance/fetch';
export const AIqa = async (userMessage) => {
  try {
    const response = await fetchInstance('/AiModel/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessage })
    }); // 替换为实际的后台接口地址
    console.log(response,'api');
    return response;
  } catch (error) {
    console.error('获取权限配置数据失败:', error);
    return {
      status : 'request error'
    };
  }
};
