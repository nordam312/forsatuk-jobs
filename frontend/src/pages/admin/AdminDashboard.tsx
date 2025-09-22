import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OverviewSection from "@/components/admin/OverviewSection";
import UsersSection from "@/components/admin/UsersSection";
import CategoriesSection from "@/components/admin/CategoriesSection";
import {
  Users,
  Briefcase,
  FolderOpen,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  DollarSign,
  FileText,
  Shield,
  ChevronRight,
  BarChart3,
  UserCheck,
  UserX,
  Activity
} from "lucide-react";
import api from "@/config/api";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  freelancer: string;
  status: string;
  budget: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalServices: 0,
    totalRevenue: 0,
    activeFreelancers: 0,
    activeEmployers: 0,
    pendingProjects: 0,
    completedProjects: 0
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats - for now using dummy data
      setStats({
        totalUsers: 1543,
        totalProjects: 892,
        totalServices: 2341,
        totalRevenue: 125670,
        activeFreelancers: 687,
        activeEmployers: 245,
        pendingProjects: 47,
        completedProjects: 731
      });

      // Fetch recent users - dummy data
      setRecentUsers([
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'Freelancer', status: 'Active', joinDate: '2024-01-15' },
        { id: 2, name: 'فاطمة السعيد', email: 'fatima@example.com', role: 'Employer', status: 'Active', joinDate: '2024-01-14' },
        { id: 3, name: 'محمد الحارثي', email: 'mohammed@example.com', role: 'Freelancer', status: 'Pending', joinDate: '2024-01-13' },
        { id: 4, name: 'سارة أحمد', email: 'sara@example.com', role: 'Freelancer', status: 'Active', joinDate: '2024-01-12' },
        { id: 5, name: 'عبدالله الشمري', email: 'abdullah@example.com', role: 'Employer', status: 'Suspended', joinDate: '2024-01-11' }
      ]);

      // Fetch recent projects - dummy data
      setRecentProjects([
        { id: 1, title: 'تطوير موقع إلكتروني', client: 'شركة النور', freelancer: 'أحمد محمد', status: 'Active', budget: 2500 },
        { id: 2, title: 'تصميم شعار', client: 'مؤسسة الأمل', freelancer: 'سارة أحمد', status: 'Pending', budget: 500 },
        { id: 3, title: 'كتابة محتوى', client: 'شركة الرياض', freelancer: 'محمد علي', status: 'Completed', budget: 1200 },
        { id: 4, title: 'تطبيق موبايل', client: 'متجر السلام', freelancer: 'عمر خالد', status: 'Active', budget: 5000 },
        { id: 5, title: 'استشارة تسويقية', client: 'شركة المستقبل', freelancer: 'نور الدين', status: 'Active', budget: 800 }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statCards: StatCard[] = [
    {
      title: isRTL ? 'إجمالي المستخدمين' : 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: isRTL ? 'المشاريع النشطة' : 'Active Projects',
      value: stats.totalProjects.toLocaleString(),
      change: '+23%',
      icon: Briefcase,
      color: 'text-green-500'
    },
    {
      title: isRTL ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+18%',
      icon: DollarSign,
      color: 'text-purple-500'
    },
    {
      title: isRTL ? 'معدل النمو' : 'Growth Rate',
      value: '15.3%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: isRTL ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'users', label: isRTL ? 'المستخدمون' : 'Users', icon: Users },
    { id: 'categories', label: isRTL ? 'التصنيفات' : 'Categories', icon: FolderOpen },
    { id: 'projects', label: isRTL ? 'المشاريع' : 'Projects', icon: Briefcase },
    { id: 'services', label: isRTL ? 'الخدمات' : 'Services', icon: FileText },
    { id: 'reports', label: isRTL ? 'التقارير' : 'Reports', icon: Activity },
    { id: 'security', label: isRTL ? 'الأمان' : 'Security', icon: Shield },
    { id: 'settings', label: isRTL ? 'الإعدادات' : 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`flex min-h-screen bg-gray-50`}>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-full ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white shadow-lg overflow-hidden z-50 ${isRTL ? 'border-l' : 'border-r'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-teal">
            {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              } ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium flex-1">{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium flex-1">{isRTL ? 'تسجيل خروج' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? (isRTL ? 'mr-64' : 'ml-64') : ''}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
                <Input
                  type="text"
                  placeholder={isRTL ? "البحث..." : "Search..."}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} w-80`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeSection === 'overview' && (
            <OverviewSection
              isRTL={isRTL}
              statCards={statCards}
              recentUsers={recentUsers}
              recentProjects={recentProjects}
            />
          )}

          {activeSection === 'users' && (
            <UsersSection isRTL={isRTL} users={recentUsers} />
          )}

          {activeSection === 'categories' && (
            <CategoriesSection isRTL={isRTL} />
          )}

          {/* Other sections can be added here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;