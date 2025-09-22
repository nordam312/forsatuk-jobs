import axios from 'axios';

// API Base URL - استخدم relative path ليعمل مع Vite proxy
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // للـ cookie
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // مع HttpOnly cookies، الـ token يُرسل تلقائياً مع كل request
    // لا نحتاج لإضافته يدوياً في الـ headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // محاولة تجديد الـ token عبر HttpOnly cookies
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          platform: 'web'
        }, {
          withCredentials: true
        });

        if (response.data.success) {
          // الـ token الجديد محفوظ في HttpOnly cookie
          // إعادة المحاولة
          return api(originalRequest);
        }
      } catch (refreshError) {
        // إذا فشل التجديد، لا نفعل شيء هنا
        // AuthContext سيتعامل مع الموضوع
        console.log('Token refresh failed');
      }
    }

    return Promise.reject(error);
  }
);

export default api;