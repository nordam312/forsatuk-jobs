
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Eye, MessageCircle, Search, Filter } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const freelancers = [
    {
      id: 1,
      name: "أحمد محمد",
      title: "مطور تطبيقات الجوال",
      rating: 4.9,
      reviewsCount: 127,
      completedProjects: 89,
      hourlyRate: "150 ريال/ساعة",
      location: "الرياض، السعودية",
      skills: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
      available: true,
      description: "مطور تطبيقات الجوال بخبرة +5 سنوات في تطوير التطبيقات الذكية والحلول المبتكرة",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "برمجة"
    },
    {
      id: 2,
      name: "فاطمة أحمد",
      title: "مصممة UI/UX",
      rating: 4.8,
      reviewsCount: 94,
      completedProjects: 67,
      hourlyRate: "120 ريال/ساعة",
      location: "دبي، الإمارات",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "تجربة المستخدم"],
      available: true,
      description: "مصممة واجهات مستخدم إبداعية مع التركيز على تجربة المستخدم وسهولة الاستخدام",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "تصميم"
    },
    {
      id: 3,
      name: "محمد علي",
      title: "مطور ويب full-stack",
      rating: 4.9,
      reviewsCount: 156,
      completedProjects: 112,
      hourlyRate: "180 ريال/ساعة",
      location: "القاهرة، مصر",
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
      available: false,
      description: "مطور ويب متخصص في بناء التطبيقات الحديثة والمتقدمة باستخدام أحدث التقنيات",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "برمجة"
    },
    {
      id: 4,
      name: "سارة خالد",
      title: "مترجمة ومحررة",
      rating: 4.7,
      reviewsCount: 78,
      completedProjects: 145,
      hourlyRate: "80 ريال/ساعة",
      location: "الكويت، الكويت",
      skills: ["ترجمة", "تحرير", "كتابة إبداعية", "مراجعة", "لغة إنجليزية"],
      available: true,
      description: "مترجمة محترفة متخصصة في الترجمة التقنية والأدبية مع خبرة واسعة",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "ترجمة"
    },
    {
      id: 5,
      name: "خالد العتيبي",
      title: "مسوق رقمي",
      rating: 4.6,
      reviewsCount: 85,
      completedProjects: 73,
      hourlyRate: "100 ريال/ساعة",
      location: "جدة، السعودية",
      skills: ["Google Ads", "Facebook Ads", "SEO", "تحليل البيانات", "إنستغرام"],
      available: true,
      description: "خبير في التسويق الرقمي وإدارة الحملات الإعلانية مع نتائج مثبتة",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "تسويق"
    },
    {
      id: 6,
      name: "مريم حسن",
      title: "كاتبة محتوى",
      rating: 4.8,
      reviewsCount: 92,
      completedProjects: 156,
      hourlyRate: "70 ريال/ساعة",
      location: "تونس، تونس",
      skills: ["كتابة المحتوى", "SEO", "صحافة", "تسويق بالمحتوى", "مدونات"],
      available: true,
      description: "كاتبة محتوى متخصصة في إنشاء محتوى جذاب وفعال لمختلف المنصات",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png",
      category: "كتابة"
    }
  ];

  const categories = ["all", "برمجة", "تصميم", "ترجمة", "تسويق", "كتابة"];

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || freelancer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            تعرف على أفضل المواهب
          </h1>
          <p className="text-xl text-primary-gold/90 mb-8">
            اكتشف آلاف المستقلين المحترفين في مختلف التخصصات
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="ابحث عن المستقلين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التخصصات</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-teal mb-2">
              المستقلون المتاحون ({filteredFreelancers.length})
            </h2>
            <p className="text-muted-foreground">
              تعرف على أفضل المواهب واختر الشريك المناسب لمشروعك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                        <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
                          {freelancer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full border-2 border-white ${freelancer.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary-teal mb-1">{freelancer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{freelancer.title}</p>
                    
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{freelancer.rating}</span>
                      <span className="text-xs text-muted-foreground">({freelancer.reviewsCount} تقييم)</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{freelancer.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                    {freelancer.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {freelancer.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-accent-gold/20 text-primary-teal border-0">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        +{freelancer.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-primary-teal mb-1">{freelancer.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">{freelancer.completedProjects} مشروع مكتمل</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-primary text-white hover:opacity-90 text-xs">
                      <Eye className="w-3 h-3 ml-1" />
                      عرض الملف
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFreelancers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                لم يتم العثور على مستقلين يطابقون البحث
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Freelancers;
