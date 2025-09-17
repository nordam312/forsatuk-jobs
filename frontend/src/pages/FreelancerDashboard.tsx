
import { useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  Clock,
  Star,
  MessageSquare,
  Eye,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const FreelancerDashboard = () => {
  // Mock data for freelancer
  const freelancerStats = {
    totalEarnings: 8750,
    monthlyEarnings: 2450,
    completedProjects: 23,
    activeProjects: 3,
    rating: 4.8,
    totalReviews: 15,
    responseTime: "2 hours",
    profileViews: 127
  };

  const activeProjects = [
    { 
      id: 1, 
      title: "تطوير موقع إلكتروني", 
      client: "شركة النور", 
      deadline: "2024-02-15", 
      progress: 75,
      budget: 2500 
    },
    { 
      id: 2, 
      title: "تصميم تطبيق جوال", 
      client: "محمد أحمد", 
      deadline: "2024-02-20", 
      progress: 45,
      budget: 3200 
    },
    { 
      id: 3, 
      title: "كتابة محتوى تسويقي", 
      client: "شركة الإبداع", 
      deadline: "2024-02-10", 
      progress: 90,
      budget: 800 
    }
  ];

  const recentMessages = [
    { id: 1, client: "شركة النور", message: "متى سيكون التسليم النهائي؟", time: "منذ ساعة" },
    { id: 2, client: "محمد أحمد", message: "أريد تعديل على التصميم", time: "منذ 3 ساعات" },
    { id: 3, client: "شركة الإبداع", message: "ممتاز! أنتظر الباقي", time: "منذ يوم" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-teal">لوحة تحكم المستقل</h1>
            <p className="text-muted-foreground mt-2">
              مرحباً أحمد! تتبع مشاريعك وأرباحك هنا
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 ml-2" />
              عرض الملف الشخصي
            </Button>
            <Button size="sm" className="bg-gradient-primary text-white">
              <MessageSquare className="w-4 h-4 ml-2" />
              الرسائل
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
              <DollarSign className="h-4 w-4 text-primary-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {freelancerStats.totalEarnings.toLocaleString()} ر.س
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{freelancerStats.monthlyEarnings} ر.س هذا الشهر
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
              <Briefcase className="h-4 w-4 text-primary-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {freelancerStats.completedProjects}
              </div>
              <p className="text-xs text-muted-foreground">
                {freelancerStats.activeProjects} مشاريع نشطة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التقييم</CardTitle>
              <Star className="h-4 w-4 text-primary-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {freelancerStats.rating}
              </div>
              <p className="text-xs text-muted-foreground">
                من {freelancerStats.totalReviews} تقييم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">وقت الاستجابة</CardTitle>
              <Clock className="h-4 w-4 text-accent-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {freelancerStats.responseTime}
              </div>
              <p className="text-xs text-muted-foreground">
                متوسط الرد
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-teal" />
                المشاريع النشطة
              </CardTitle>
              <CardDescription>
                مشاريعك الحالية وحالة التقدم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <Badge variant="outline">
                        {project.budget} ر.س
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>العميل: {project.client}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.deadline}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary-teal h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        {project.progress}% مكتمل
                      </span>
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-teal" />
                الرسائل الحديثة
              </CardTitle>
              <CardDescription>
                آخر رسائل العملاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-teal/20 rounded-full flex items-center justify-center">
                      <span className="text-primary-teal font-semibold text-sm">
                        {message.client.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{message.client}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="w-4 h-4 ml-2" />
                عرض جميع الرسائل
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
