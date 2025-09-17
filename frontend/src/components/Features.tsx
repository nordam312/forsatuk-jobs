
import { Shield, Users, Star, Zap, Globe, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "أمان مضمون",
      description: "نضمن أمان تعاملاتك المالية مع نظام دفع آمن ومحمي"
    },
    {
      icon: Users,
      title: "مجتمع احترافي",
      description: "انضم لأكبر مجتمع عربي من المحترفين والمواهب المتميزة"
    },
    {
      icon: Star,
      title: "تقييمات موثوقة",
      description: "نظام تقييم شفاف يساعدك في اختيار أفضل المستقلين"
    },
    {
      icon: Zap,
      title: "سرعة في التنفيذ",
      description: "ابحث واعثر على المستقل المناسب في دقائق معدودة"
    },
    {
      icon: Globe,
      title: "تغطية شاملة",
      description: "خدماتنا متاحة في جميع أنحاء العالم العربي"
    },
    {
      icon: Headphones,
      title: "دعم فني متواصل",
      description: "فريق دعم متخصص متاح 24/7 لمساعدتك"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-teal to-accent-teal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            لماذا تختار منصة المواهب؟
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            نوفر لك بيئة عمل مثالية تجمع بين الجودة والأمان والثقة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="bg-primary-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
