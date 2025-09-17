
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, DollarSign, Star, Eye, Search, Filter } from "lucide-react";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      id: 1,
      title: "تطوير موقع إلكتروني لشركة ناشئة",
      description: "نحتاج لتطوير موقع إلكتروني احترافي باستخدام React و Node.js مع تصميم حديث ومتجاوب",
      budget: "5,000 - 8,000 ريال",
      deadline: "30 يوم",
      skills: ["React", "Node.js", "تصميم UI/UX", "قواعد البيانات"],
      proposals: 12,
      rating: 4.8,
      company: "شركة التقنية الذكية",
      location: "الرياض، السعودية",
      category: "برمجة"
    },
    {
      id: 2,
      title: "تصميم هوية بصرية كاملة",
      description: "مطلوب مصمم محترف لإنشاء هوية بصرية شاملة تتضمن الشعار، الألوان، والخطوط لمشروع جديد",
      budget: "2,000 - 3,500 ريال",
      deadline: "15 يوم",
      skills: ["Adobe Illustrator", "Photoshop", "هوية بصرية", "تصميم إبداعي"],
      proposals: 8,
      rating: 4.9,
      company: "مؤسسة الإبداع",
      location: "دبي، الإمارات",
      category: "تصميم"
    },
    {
      id: 3,
      title: "ترجمة وثائق تقنية من الإنجليزية للعربية",
      description: "ترجمة مجموعة من الوثائق التقنية المتخصصة في مجال البرمجة والذكاء الاصطناعي",
      budget: "1,500 - 2,500 ريال",
      deadline: "20 يوم",
      skills: ["ترجمة تقنية", "اللغة الإنجليزية", "مراجعة نصوص"],
      proposals: 15,
      rating: 4.7,
      company: "معهد التكنولوجيا",
      location: "القاهرة، مصر",
      category: "ترجمة"
    },
    {
      id: 4,
      title: "إدارة حملة تسويقية على وسائل التواصل",
      description: "نحتاج لمسوق محترف لإدارة حملات إعلانية على فيسبوك وإنستغرام لشركة تجارة إلكترونية",
      budget: "3,000 - 4,500 ريال",
      deadline: "45 يوم",
      skills: ["Facebook Ads", "Instagram", "تسويق رقمي", "تحليل البيانات"],
      proposals: 6,
      rating: 4.6,
      company: "متجر العالمي",
      location: "الكويت، الكويت",
      category: "تسويق"
    },
    {
      id: 5,
      title: "كتابة محتوى لموقع شركة قانونية",
      description: "مطلوب كاتب محترف لإنشاء محتوى قانوني وتثقيفي لموقع شركة محاماة",
      budget: "2,500 - 3,000 ريال",
      deadline: "25 يوم",
      skills: ["كتابة المحتوى", "القانون", "SEO", "البحث"],
      proposals: 11,
      rating: 4.5,
      company: "مكتب الاستشارات القانونية",
      location: "بيروت، لبنان",
      category: "كتابة"
    },
    {
      id: 6,
      title: "تطوير تطبيق جوال للتوصيل",
      description: "تطوير تطبيق جوال لخدمة التوصيل مع خرائط تفاعلية ونظام دفع متكامل",
      budget: "8,000 - 12,000 ريال",
      deadline: "60 يوم",
      skills: ["Flutter", "Firebase", "خرائط Google", "نظم الدفع"],
      proposals: 4,
      rating: 4.8,
      company: "شركة التوصيل السريع",
      location: "عمان، الأردن",
      category: "برمجة"
    }
  ];

  const categories = ["all", "برمجة", "تصميم", "ترجمة", "تسويق", "كتابة"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            اكتشف فرصتك المثالية
          </h1>
          <p className="text-xl text-primary-gold/90 mb-8">
            تصفح آلاف المشاريع المتاحة واختر ما يناسب مهاراتك
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
                  placeholder="ابحث في المشاريع..."
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

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-teal mb-2">
              المشاريع المتاحة ({filteredProjects.length})
            </h2>
            <p className="text-muted-foreground">
              اختر المشروع المناسب لمهاراتك وابدأ رحلتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-primary-teal leading-tight mb-2 group-hover:text-accent-teal transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium">{project.company}</span>
                    <span>{project.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-accent-gold/20 text-primary-teal border-0">
                        {skill}
                      </Badge>
                    ))}
                    {project.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        +{project.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-primary-gold" />
                      <span className="text-primary-teal font-semibold">{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{project.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{project.proposals} عرض</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-muted-foreground">{project.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary text-white hover:opacity-90 group-hover:scale-105 transition-transform">
                    تقديم عرض
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                لم يتم العثور على مشاريع تطابق البحث
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
