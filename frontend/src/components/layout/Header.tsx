
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, User, BarChart3, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoriesDropdown from "./CategoriesDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    switch (user.user_type) {
      case 'admin':
        return '/admin';
      case 'freelancer':
        return '/freelancer/dashboard';
      case 'employer':
        return '/company/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <div className="bg-gradient-primary p-2 rounded-xl">
              <div className="w-8 h-8 text-primary-gold font-bold text-xl flex items-center justify-center">
                ف
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary-teal">{isRTL ? 'فرصتك' : 'Forsatuk'}</h1>
              <p className="text-xs text-muted-foreground">{t('hero.subtitle')}</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
              <Input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                className={`${isRTL ? 'pr-10' : 'pl-10'} bg-muted/30 border-0 focus:bg-white transition-colors`}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            <Link to="/" className="text-primary-teal hover:text-accent-teal transition-colors">
              {t('common.home')}
            </Link>

            {/* Categories Dropdown */}
            <CategoriesDropdown isRTL={isRTL} />

            <Link to="/projects" className="text-muted-foreground hover:text-primary-teal transition-colors">
              {t('nav.jobs')}
            </Link>
            <Link to="/freelancers" className="text-muted-foreground hover:text-primary-teal transition-colors">
              {t('nav.freelancers')}
            </Link>
            <Link to="/companies" className="text-muted-foreground hover:text-primary-teal transition-colors">
              {t('nav.companies')}
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary-teal transition-colors">
              {t('nav.pricing')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {loading ? (
              // Show loading state or nothing while checking auth
              <div className="w-20 h-8"></div>
            ) : isAuthenticated ? (
              <>
                <Link to={getDashboardPath()}>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary-teal">
                    <BarChart3 className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary-teal">
                  <Bell className="w-5 h-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary-teal">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.user_type}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/profile/${user?.id}`}>
                        <User className="w-4 h-4 ml-2" />
                        الملف الشخصي
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardPath()}>
                        <BarChart3 className="w-4 h-4 ml-2" />
                        {t('common.dashboard')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 ml-2" />
                      {t('common.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                    انضم الآن
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="ابحث..."
                  className="pr-10 bg-muted/30 border-0"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-primary-teal py-2" onClick={() => setIsMenuOpen(false)}>
                  الرئيسية
                </Link>
                <CategoriesDropdown isRTL={isRTL} isMobile={true} onItemClick={() => setIsMenuOpen(false)} />
                <Link to="/projects" className="text-muted-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                  المشاريع
                </Link>
                <Link to="/freelancers" className="text-muted-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                  المستقلين
                </Link>
                <Link to="/companies" className="text-muted-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                  الشركات
                </Link>
                <Link to="/pricing" className="text-muted-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                  الأسعار
                </Link>
                {!loading && isAuthenticated && (
                  <Link to={getDashboardPath()} className="text-muted-foreground py-2" onClick={() => setIsMenuOpen(false)}>
                    لوحة التحكم
                  </Link>
                )}
              </nav>
              
              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {loading ? (
                  // Show loading state or nothing while checking auth
                  <div className="h-20"></div>
                ) : isAuthenticated ? (
                  <>
                    <div className="text-sm text-muted-foreground mb-2">
                      {user?.first_name} {user?.last_name} ({user?.user_type})
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      {t('common.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-primary-teal text-primary-teal">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-primary text-white">
                        انضم الآن
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
