
import axiosInstance from '@/requestInstance/axios';
const test = [
  {
    "name": "AIMain",
    "path": "/",
    "permission": true,
    "redirect": { "name": "chat" },
    "children": [
      {
        "path": "chat",
        "name": "chat",
        "permission": true
      }
    ]
  },
  {
    "name": "workbenches",
    "path": "/workbenches",
    "permission": true
  }
]
const getPermissionConfig = async () => {
  try {
    // const response = await axiosInstance.post('/AiModel/api/user_permission', {
    //   permission: true
    // }); // 替换为实际的后台接口地址
    return test;
  } catch (error) {
    console.error('获取权限配置数据失败:', error);
    return [];
  }
};

export default getPermissionConfig;