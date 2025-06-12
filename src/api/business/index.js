
import axiosInstance from '@/requestInstance/axios';
export const getBeverageQuery = async (data) => {
  try {
    const response = await axiosInstance.post('/api/beverage/query', data); // 替换为实际的后台接口地址
    return response;
  } catch (error) {
    console.error('获取权限配置数据失败:', error);
    return [];
  }
};
export const getContactQuery = async (id) => {
  try {
    const response = await axiosInstance.get(`api/contact/${id}`); // 替换为实际的后台接口地址
    return response;
  } catch (error) {
    console.error('获取权限配置数据失败:', error);
    return [];
  }
};