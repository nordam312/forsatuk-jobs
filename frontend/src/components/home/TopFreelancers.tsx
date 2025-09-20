
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Eye, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TopFreelancers = () => {
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
      skills: ["Flutter", "React Native", "iOS", "Android"],
      available: true,
      description: "مطور تطبيقات الجوال بخبرة +5 سنوات في تطوير التطبيقات الذكية",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png"
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
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      available: true,
      description: "مصممة واجهات مستخدم إبداعية مع التركيز على تجربة المستخدم",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png"
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
      skills: ["React", "Node.js", "Python", "AWS"],
      available: false,
      description: "مطور ويب متخصص في بناء التطبيقات الحديثة والمتقدمة",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png"
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
      skills: ["ترجمة", "تحرير", "كتابة إبداعية", "مراجعة"],
      available: true,
      description: "مترجمة محترفة متخصصة في الترجمة التقنية والأدبية",
      avatar: "/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-teal mb-4">
            أفضل المستقلين
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تعرف على أفضل المواهب المتاحة وابدأ التعاون معهم في مشاريعك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {freelancers.map((freelancer) => (
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

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white"
          >
            عرض جميع المستقلين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopFreelancers;
