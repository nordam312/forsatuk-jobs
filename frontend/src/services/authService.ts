import api from '../config/api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth.types';

class AuthService {
  // تسجيل الدخول
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // إضافة platform للتمييز بين Web و Mobile
    const response = await api.post<AuthResponse>('/auth/login', {
      ...credentials,
      platform: 'web'  // للويب نستخدم HttpOnly cookies
    });

    // للويب: الـ token يُحفظ في HttpOnly cookie تلقائياً من الـ Backend
    // لا نحتاج حفظه في localStorage

    return response.data;
  }

  // التسجيل
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      ...data,
      platform: 'web'  // للويب نستخدم HttpOnly cookies
    });

    // للويب: الـ token يُحفظ في HttpOnly cookie تلقائياً من الـ Backend
    // لا نحتاج حفظه في localStorage

    return response.data;
  }

  // تسجيل الخروج
  async logout(): Promise<void> {
    // سيقوم الـ Backend بحذف الـ HttpOnly cookies
    await api.post('/auth/logout');
  }

  // الحصول على المستخدم الحالي
  async getProfile(): Promise<User> {
    const response = await api.get<{ success: boolean; user: User }>('/auth/me');
    return response.data.user;
  }

  // تحديث الملف الشخصي
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<{ success: boolean; user: User }>('/profile', data);
    return response.data.user;
  }

  // التحقق من حالة المصادقة
  async checkAuth(): Promise<boolean> {
    try {
      const response = await api.get('/auth/check');
      return response.data.authenticated;
    } catch {
      return false;
    }
  }

  // تجديد الـ Token
  async refreshToken(): Promise<boolean> {
    try {
      // للويب: الـ refresh يتم عبر HttpOnly cookies
      const response = await api.post('/auth/refresh', {
        platform: 'web'
      });

      return response.data.success;
    } catch {
      return false;
    }
  }

  // التحقق من وجود token
  // مع HttpOnly cookies، نحتاج للتحقق من الـ Backend
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await api.get('/auth/check');
      return response.data.authenticated;
    } catch {
      return false;
    }
  }
}

export default new AuthService();