
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Star, Eye } from "lucide-react";

const FeaturedProjects = () => {
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
      location: "الرياض، السعودية"
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
      location: "دبي، الإمارات"
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
      location: "القاهرة، مصر"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-teal mb-4">
            المشاريع المميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف أحدث الفرص المتاحة وابدأ رحلتك المهنية مع أفضل المشاريع
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white"
          >
            عرض جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
