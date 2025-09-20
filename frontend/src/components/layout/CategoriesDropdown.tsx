import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Grid, Code, Palette, Edit, TrendingUp, Video, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import api from '@/config/api';

interface Subcategory {
  id: number;
  name_ar: string;
  name_en: string;
  slug: string;
  services_count?: number;
  projects_count?: number;
}

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  slug: string;
  icon?: string;
  color?: string;
  subcategories: Subcategory[];
  subcategories_count?: number;
  services_count?: number;
  projects_count?: number;
}

interface CategoriesDropdownProps {
  isRTL?: boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const CategoriesDropdown = ({ isRTL = true, isMobile = false, onItemClick }: CategoriesDropdownProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      case 'edit':
        return <Edit className="w-5 h-5" />;
      case 'trending-up':
        return <TrendingUp className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <Grid className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100 hover:bg-blue-200', text: 'text-blue-600', hover: 'hover:bg-blue-50', groupHover: 'group-hover:text-blue-600' };
      case 'purple':
        return { bg: 'bg-purple-100 hover:bg-purple-200', text: 'text-purple-600', hover: 'hover:bg-purple-50', groupHover: 'group-hover:text-purple-600' };
      case 'green':
        return { bg: 'bg-green-100 hover:bg-green-200', text: 'text-green-600', hover: 'hover:bg-green-50', groupHover: 'group-hover:text-green-600' };
      case 'orange':
        return { bg: 'bg-orange-100 hover:bg-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50', groupHover: 'group-hover:text-orange-600' };
      case 'red':
        return { bg: 'bg-red-100 hover:bg-red-200', text: 'text-red-600', hover: 'hover:bg-red-50', groupHover: 'group-hover:text-red-600' };
      default:
        return { bg: 'bg-gray-100 hover:bg-gray-200', text: 'text-gray-600', hover: 'hover:bg-gray-50', groupHover: 'group-hover:text-gray-700' };
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) {
      onItemClick();
    }
  };

  // Mobile version - simple list
  if (isMobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-right py-2 text-muted-foreground hover:text-primary-teal transition-colors flex items-center justify-between"
        >
          <span>التصنيفات</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="pr-4 space-y-1">
            {loading ? (
              <div className="text-sm text-gray-500">جاري التحميل...</div>
            ) : (
              categories.map(category => (
                <div key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="block py-1 text-sm text-gray-700 hover:text-primary-teal"
                    onClick={handleItemClick}
                  >
                    {category.name_ar}
                  </Link>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="pr-4 space-y-1">
                      {category.subcategories.slice(0, 4).map(sub => (
                        <Link
                          key={sub.id}
                          to={`/category/${category.slug}?subcategory=${sub.id}`}
                          className="block py-1 text-xs text-gray-500 hover:text-primary-teal"
                          onClick={handleItemClick}
                        >
                          • {sub.name_ar}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop version - dropdown with subcategories
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary-teal transition-colors">
          <Grid className="w-4 h-4" />
          <span>التصنيفات</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[720px] p-0" align="start">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-teal mx-auto mb-2"></div>
            <p>جاري تحميل التصنيفات...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-0">
              {/* Categories Column */}
              <div className="border-l border-gray-100">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">التصنيفات الرئيسية</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {categories.map(category => {
                    const colors = getColorClasses(category.color);
                    return (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className={`flex items-center gap-3 p-3 transition-colors group ${colors.hover}`}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onClick={handleItemClick}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${colors.bg} ${colors.text}`}>
                          {getIconComponent(category.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-gray-900 ${colors.groupHover}`}>
                            {category.name_ar}
                          </h3>
                          {category.services_count !== undefined && (
                            <p className="text-xs text-gray-500">
                              {category.services_count} خدمة
                              {category.projects_count ? ` • ${category.projects_count} مشروع` : ''}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Subcategories Column - Dynamic */}
              <div className="col-span-2 bg-gray-50">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {hoveredCategory
                      ? categories.find(c => c.id === hoveredCategory)?.name_ar + ' - التصنيفات الفرعية'
                      : 'مرر الماوس على تصنيف لعرض التفاصيل'}
                  </h3>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-3">
                  {hoveredCategory ? (
                    <div className="grid grid-cols-2 gap-2">
                      {categories
                        .find(c => c.id === hoveredCategory)
                        ?.subcategories.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.slug}?subcategory=${sub.id}`}
                            className="p-3 bg-white rounded-lg hover:bg-white hover:shadow-md transition-all group"
                            onClick={handleItemClick}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-800 group-hover:text-primary-teal transition-colors">
                                  {sub.name_ar}
                                </h4>
                                {(sub.services_count !== undefined || sub.projects_count !== undefined) && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {sub.services_count ? `${sub.services_count} خدمة` : ''}
                                    {sub.services_count && sub.projects_count ? ' • ' : ''}
                                    {sub.projects_count ? `${sub.projects_count} مشروع` : ''}
                                  </p>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-teal" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Grid className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">اختر تصنيفاً لعرض الأقسام الفرعية</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <Link
                to="/categories"
                className="flex items-center justify-center gap-2 text-sm text-primary-teal hover:text-accent-teal transition-colors"
                onClick={handleItemClick}
              >
                <span>عرض جميع التصنيفات</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;