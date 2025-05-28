
import axiosInstance from '@/requestInstance/axios';
const test = [
  {
    "name": "root",
    "path": "/",
    "permission": true,
    "redirect": { "name": "main" },
    "children": [
      {
        "path": "",
        "name": "main",
        "permission": true
      },
      {
        "path": "detail",
        "name": "detail",
        "permission": true,
      },
      {
        "path": "categories",
        "name": "categories",
        "permission": true,
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