
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Users, Briefcase, Star, Globe } from "lucide-react";

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: "شركة التقنية الذكية",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "تقنية المعلومات",
      location: "الرياض، السعودية",
      employees: "50-100",
      description: "شركة رائدة في مجال تطوير الحلول التقنية المبتكرة والذكية للأعمال",
      activeProjects: 8,
      completedProjects: 45,
      rating: 4.8,
      established: "2018",
      website: "www.smarttech.sa",
      specialties: ["تطوير التطبيقات", "الذكاء الاصطناعي", "الحلول السحابية"]
    },
    {
      id: 2,
      name: "مؤسسة الإبداع",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "تصميم وإعلان",
      location: "دبي، الإمارات",
      employees: "20-50",
      description: "مؤسسة متخصصة في التصميم الإبداعي والهوية البصرية للعلامات التجارية",
      activeProjects: 12,
      completedProjects: 78,
      rating: 4.9,
      established: "2016",
      website: "www.creativity.ae",
      specialties: ["الهوية البصرية", "التصميم الجرافيكي", "تصميم المواقع"]
    },
    {
      id: 3,
      name: "معهد التكنولوجيا",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "تعليم وتدريب",
      location: "القاهرة، مصر",
      employees: "100-200",
      description: "معهد تعليمي متخصص في تقديم برامج التدريب التقني والمهني المتقدمة",
      activeProjects: 15,
      completedProjects: 120,
      rating: 4.7,
      established: "2015",
      website: "www.techinstitute.eg",
      specialties: ["التدريب التقني", "الشهادات المهنية", "التعلم الإلكتروني"]
    },
    {
      id: 4,
      name: "متجر العالمي",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "تجارة إلكترونية",
      location: "الكويت، الكويت",
      employees: "30-50",
      description: "منصة تجارة إلكترونية رائدة تقدم منتجات متنوعة عالية الجودة",
      activeProjects: 6,
      completedProjects: 32,
      rating: 4.6,
      established: "2019",
      website: "www.globalstore.kw",
      specialties: ["التجارة الإلكترونية", "التسويق الرقمي", "خدمة العملاء"]
    },
    {
      id: 5,
      name: "مكتب الاستشارات القانونية",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "خدمات قانونية",
      location: "بيروت، لبنان",
      employees: "10-20",
      description: "مكتب قانوني متخصص في تقديم الاستشارات القانونية والخدمات المهنية",
      activeProjects: 4,
      completedProjects: 65,
      rating: 4.5,
      established: "2012",
      website: "www.legalconsult.lb",
      specialties: ["الاستشارات القانونية", "القانون التجاري", "حل النزاعات"]
    },
    {
      id: 6,
      name: "شركة التوصيل السريع",
      logo: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      industry: "خدمات لوجستية",
      location: "عمان، الأردن",
      employees: "200+",
      description: "شركة رائدة في خدمات التوصيل والشحن السريع في المنطقة",
      activeProjects: 3,
      completedProjects: 25,
      rating: 4.8,
      established: "2020",
      website: "www.fastdelivery.jo",
      specialties: ["خدمات التوصيل", "اللوجستيات", "التتبع الذكي"]
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            اكتشف أفضل الشركات
          </h1>
          <p className="text-xl text-primary-gold/90 mb-8">
            تعرف على الشركات الرائدة التي تبحث عن أفضل المواهب
          </p>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-teal mb-2">
              الشركات المسجلة ({companies.length})
            </h2>
            <p className="text-muted-foreground">
              اكتشف فرص العمل المتاحة مع أفضل الشركات في المنطقة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <Card key={company.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-8 h-8 text-primary-gold" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-primary-teal mb-1 group-hover:text-accent-teal transition-colors">
                        {company.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{company.industry}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-accent-gold/20 text-primary-teal border-0">
                        {specialty}
                      </Badge>
                    ))}
                    {company.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        +{company.specialties.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-gold" />
                      <span className="text-muted-foreground">{company.employees} موظف</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary-gold" />
                      <span className="text-muted-foreground">{company.activeProjects} مشروع نشط</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{company.rating}</span>
                      <span className="text-muted-foreground">تقييم</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <span>تأسست {company.established}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-primary text-white hover:opacity-90">
                      عرض الملف
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white">
                      المشاريع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Companies;
