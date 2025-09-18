export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  user_type: 'freelancer' | 'employer' | 'admin';
  phone?: string;
  country?: string;
  city?: string;
  bio?: string;
  avatar_url?: string;
  skills?: string[];
  company_name?: string;
  company_website?: string;
  hourly_rate?: number;
  balance: number;
  currency: string;
  rating: number;
  completed_projects_count: number;
  total_reviews: number;
  total_earned: number;
  total_spent: number;
  is_active: boolean;
  is_verified: boolean;
  is_featured: boolean;
  featured_until?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_type: 'freelancer' | 'employer';
  phone?: string;
  country?: string;
  city?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;  // الـ Backend يرسل user مباشرة
  data?: {
    user: User;
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}