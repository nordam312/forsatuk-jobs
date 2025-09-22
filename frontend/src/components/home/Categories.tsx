import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Palette, PenTool, Megaphone, Camera, Languages, Calculator, Music, Briefcase, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/config/api";

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
  description_en?: string;
  description_ar?: string;
  icon?: string;
  color?: string;
  services_count?: number;
  projects_count?: number;
}

const Categories = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      if (response.data.success) {
        setCategories(response.data.data.slice(0, 8)); // Show only first 8 categories
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Use static data as fallback
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (slug?: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'programming-tech': Code,
      'design-creative': Palette,
      'writing-translation': PenTool,
      'digital-marketing': Megaphone,
      'video-animation': Video,
      'business-consulting': Briefcase,
      'music-audio': Music,
      'photography': Camera,
      'education': Languages,
      'accounting': Calculator
    };
    const IconComponent = iconMap[slug || ''] || Briefcase;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const getColorClass = (color?: string) => {
    const colors: { [key: string]: string } = {
      'blue': 'bg-blue-500',
      'purple': 'bg-purple-500',
      'green': 'bg-green-500',
      'orange': 'bg-orange-500',
      'red': 'bg-red-500',
      'teal': 'bg-teal-500',
      'pink': 'bg-pink-500',
      'indigo': 'bg-indigo-500'
    };
    return colors[color || 'blue'] || 'bg-blue-500';
  };

  // Static fallback data
  const staticCategories = [
    {
      icon: Code,
      title: "البرمجة والتطوير",
      description: "تطوير المواقع والتطبيقات",
      count: "1,200+ مشروع",
      color: "bg-blue-500",
      slug: "programming-tech"
    },
    {
      icon: Palette,
      title: "التصميم الجرافيكي",
      description: "تصميم الشعارات والهوية البصرية",
      count: "890+ مشروع",
      color: "bg-purple-500",
      slug: "design-creative"
    },
    {
      icon: PenTool,
      title: "الكتابة والترجمة",
      description: "كتابة المحتوى والترجمة",
      count: "750+ مشروع",
      color: "bg-green-500",
      slug: "writing-translation"
    },
    {
      icon: Megaphone,
      title: "التسويق الرقمي",
      description: "إدارة الحملات الإعلانية",
      count: "650+ مشروع",
      color: "bg-orange-500",
      slug: "digital-marketing"
    },
    {
      icon: Camera,
      title: "التصوير والمونتاج",
      description: "تصوير وتحرير الفيديوهات",
      count: "450+ مشروع",
      color: "bg-red-500",
      slug: "video-animation"
    },
    {
      icon: Languages,
      title: "التدريب والاستشارات",
      description: "التدريب المهني والاستشارات",
      count: "320+ مشروع",
      color: "bg-teal-500",
      slug: "business-consulting"
    },
    {
      icon: Calculator,
      title: "المحاسبة والمالية",
      description: "إدارة الحسابات والتقارير المالية",
      count: "280+ مشروع",
      color: "bg-pink-500",
      slug: "accounting"
    },
    {
      icon: Music,
      title: "الصوت والموسيقى",
      description: "التسجيل الصوتي والإنتاج الموسيقي",
      count: "190+ مشروع",
      color: "bg-indigo-500",
      slug: "music-audio"
    }
  ];

  const displayCategories = categories.length < 0 ? categories : staticCategories;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-teal mb-4">
            استكشف التخصصات
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اعثر على أفضل المواهب في مختلف المجالات لتنفيذ مشاريعك بأعلى جودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category: Category | typeof staticCategories[0], index) => {
            const isDynamic = 'id' in category;
            return (
              <div
                key={isDynamic ? category.id : index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-primary-gold/20"
                onClick={() => navigate(`/category/${isDynamic ? category.slug : category.slug}`)}
              >
                <div className={`${isDynamic ? getColorClass(category.color) : category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {isDynamic ? getCategoryIcon(category.slug) : <category.icon className="w-6 h-6 text-white" />}
                </div>

                <h3 className="text-lg font-bold text-primary-teal mb-2 group-hover:text-accent-teal transition-colors">
                  {isDynamic ? (isRTL ? category.name_ar : category.name_en) : category.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {isDynamic
                    ? (isRTL ? category.description_ar : category.description_en) || 'خدمات متنوعة'
                    : category.description}
                </p>

                <div className="text-xs text-primary-gold font-semibold">
                  {isDynamic
                    ? `${category.services_count || 0}+ ${isRTL ? 'خدمة' : 'services'}`
                    : category.count}
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white"
            onClick={() => navigate('/categories')}
          >
            عرض جميع التخصصات
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Categories;



// const categories = [
//   {
//     icon: Code,
//     title: "البرمجة والتطوير",
//     description: "تطوير المواقع والتطبيقات",
//     count: "1,200+ مشروع",
//     color: "bg-blue-500"
//   },
//   {
//     icon: Palette,
//     title: "التصميم الجرافيكي",
//     description: "تصميم الشعارات والهوية البصرية",
//     count: "890+ مشروع",
//     color: "bg-purple-500"
//   },
//   {
//     icon: PenTool,
//     title: "الكتابة والترجمة",
//     description: "كتابة المحتوى والترجمة",
//     count: "750+ مشروع",
//     color: "bg-green-500"
//   },
//   {
//     icon: Megaphone,
//     title: "التسويق الرقمي",
//     description: "إدارة الحملات الإعلانية",
//     count: "650+ مشروع",
//     color: "bg-orange-500"
//   },
//   {
//     icon: Camera,
//     title: "التصوير والمونتاج",
//     description: "تصوير وتحرير الفيديوهات",
//     count: "450+ مشروع",
//     color: "bg-red-500"
//   },
//   {
//     icon: Languages,
//     title: "التدريس والتعليم",
//     description: "دروس خصوصية ودورات تدريبية",
//     count: "320+ مشروع",
//     color: "bg-teal-500"
//   },
//   {
//     icon: Calculator,
//     title: "الأعمال والمحاسبة",
//     description: "خدمات مالية ومحاسبية",
//     count: "280+ مشروع",
//     color: "bg-indigo-500"
//   },
//   {
//     icon: Music,
//     title: "الموسيقى والصوتيات",
//     description: "تأليف وإنتاج موسيقي",
//     count: "190+ مشروع",
//     color: "bg-pink-500"
//   }
// ];