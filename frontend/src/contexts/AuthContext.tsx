import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/authService';
import { User, LoginCredentials, RegisterData } from '../types/auth.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // تحميل المستخدم عند بدء التطبيق
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // محاولة الحصول على بيانات المستخدم من الـ backend
      // الـ HttpOnly cookie سيُرسل تلقائياً مع الطلب
      const userData = await authService.getProfile();
      setUser(userData);
      // يمكن حفظ البيانات في sessionStorage لاستخدامات أخرى
      sessionStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      // إذا فشل، المستخدم غير مسجل الدخول
      console.log('User not authenticated');
      sessionStorage.removeItem('user_data');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      // الـ Backend يرسل user مباشرة، ليس داخل data
      const userData = response.user || response.data?.user;
      setUser(userData);
      // نحفظ البيانات في sessionStorage
      if (userData) {
        sessionStorage.setItem('user_data', JSON.stringify(userData));
      }
    } else {
      throw new Error(response.message);
    }
  };

  const register = async (data: RegisterData) => {
    const response = await authService.register(data);
    if (response.success) {
      // الـ Backend يرسل user مباشرة، ليس داخل data
      const userData = response.user || response.data?.user;
      setUser(userData);
      // نحفظ البيانات في sessionStorage
      if (userData) {
        sessionStorage.setItem('user_data', JSON.stringify(userData));
      }
    } else {
      throw new Error(response.message);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    sessionStorage.removeItem('user_data');
  };

  const updateProfile = async (data: Partial<User>) => {
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  };

  const refreshUser = async () => {
    const userData = await authService.getProfile();
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};