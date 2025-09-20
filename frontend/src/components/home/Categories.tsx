
import { Button } from "@/components/ui/button";
import { Code, Palette, PenTool, Megaphone, Camera, Languages, Calculator, Music } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: Code,
      title: "البرمجة والتطوير",
      description: "تطوير المواقع والتطبيقات",
      count: "1,200+ مشروع",
      color: "bg-blue-500"
    },
    {
      icon: Palette,
      title: "التصميم الجرافيكي",
      description: "تصميم الشعارات والهوية البصرية",
      count: "890+ مشروع",
      color: "bg-purple-500"
    },
    {
      icon: PenTool,
      title: "الكتابة والترجمة",
      description: "كتابة المحتوى والترجمة",
      count: "750+ مشروع",
      color: "bg-green-500"
    },
    {
      icon: Megaphone,
      title: "التسويق الرقمي",
      description: "إدارة الحملات الإعلانية",
      count: "650+ مشروع",
      color: "bg-orange-500"
    },
    {
      icon: Camera,
      title: "التصوير والمونتاج",
      description: "تصوير وتحرير الفيديوهات",
      count: "450+ مشروع",
      color: "bg-red-500"
    },
    {
      icon: Languages,
      title: "التدريس والتعليم",
      description: "دروس خصوصية ودورات تدريبية",
      count: "320+ مشروع",
      color: "bg-teal-500"
    },
    {
      icon: Calculator,
      title: "الأعمال والمحاسبة",
      description: "خدمات مالية ومحاسبية",
      count: "280+ مشروع",
      color: "bg-indigo-500"
    },
    {
      icon: Music,
      title: "الموسيقى والصوتيات",
      description: "تأليف وإنتاج موسيقي",
      count: "190+ مشروع",
      color: "bg-pink-500"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-teal mb-4">
            تصفح حسب التخصص
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف الخدمات المتنوعة المتاحة في جميع المجالات والتخصصات
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-primary-gold/20"
            >
              <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-primary-teal mb-2 group-hover:text-accent-teal transition-colors">
                {category.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {category.description}
              </p>
              
              <div className="text-xs text-primary-gold font-semibold">
                {category.count}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white"
          >
            عرض جميع التخصصات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
