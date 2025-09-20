
import { useState } from "react";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Plus,
  Search,
  Filter,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout";

const CompanyDashboard = () => {
  const companyStats = {
    activeProjects: 8,
    completedProjects: 24,
    totalFreelancers: 15,
    totalSpent: 85000,
    avgProjectCost: 3500,
    successRate: 92
  };

  const myProjects = [
    { 
      id: 1, 
      title: "تطوير منصة التجارة الإلكترونية", 
      status: "active", 
      applicants: 12, 
      budget: 15000,
      deadline: "2024-03-15",
      freelancer: "أحمد محمد"
    },
    { 
      id: 2, 
      title: "تصميم هوية بصرية شاملة", 
      status: "recruiting", 
      applicants: 8, 
      budget: 5000,
      deadline: "2024-02-20"
    },
    { 
      id: 3, 
      title: "تطوير تطبيق إدارة المخزون", 
      status: "completed", 
      applicants: 0, 
      budget: 12000,
      deadline: "2024-01-30",
      freelancer: "فاطمة السالم"
    }
  ];

  const topFreelancers = [
    { name: "أحمد محمد", speciality: "تطوير ويب", projects: 3, rating: 4.9, cost: 25000 },
    { name: "فاطمة السالم", speciality: "تصميم UI/UX", projects: 2, rating: 4.8, cost: 18000 },
    { name: "محمد العتيبي", speciality: "تطوير تطبيقات", projects: 4, rating: 4.7, cost: 32000 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'recruiting':
        return <Badge className="bg-blue-100 text-blue-700">تجنيد</Badge>;  
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">مكتمل</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-teal">لوحة تحكم الشركة</h1>
            <p className="text-muted-foreground mt-2">
              مرحباً بك في شركة التقنية! إدارة مشاريعك وفريقك
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 ml-2" />
              البحث عن مستقلين
            </Button>
            <Button size="sm" className="bg-gradient-primary text-white">
              <Plus className="w-4 h-4 ml-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
              <Briefcase className="h-4 w-4 text-primary-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {companyStats.activeProjects}
              </div>
              <p className="text-xs text-muted-foreground">
                {companyStats.completedProjects} مشروع مكتمل
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإنفاق</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {companyStats.totalSpent.toLocaleString()} ر.س
              </div>
              <p className="text-xs text-green-600">
                متوسط {companyStats.avgProjectCost} ر.س للمشروع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستقلون</CardTitle>
              <Users className="h-4 w-4 text-accent-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {companyStats.totalFreelancers}
              </div>
              <p className="text-xs text-muted-foreground">
                مستقل تعاملنا معهم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل النجاح</CardTitle>
              <Clock className="h-4 w-4 text-primary-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-teal">
                {companyStats.successRate}%
              </div>
              <p className="text-xs text-green-600">
                مشاريع مكتملة بنجاح
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-teal" />
                مشاريعي
              </CardTitle>
              <CardDescription>
                مشاريعك الحالية والمكتملة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>الميزانية: {project.budget.toLocaleString()} ر.س</span>
                        <span>الموعد النهائي: {project.deadline}</span>
                      </div>
                      {project.status === 'recruiting' && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{project.applicants} متقدم</span>
                        </div>
                      )}
                      {project.freelancer && (
                        <div className="flex justify-between">
                          <span>المستقل: {project.freelancer}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 ml-1" />
                        عرض
                      </Button>
                      {project.status === 'recruiting' && (
                        <Button variant="outline" size="sm">
                          <Users className="w-3 h-3 ml-1" />
                          المتقدمين
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء مشروع جديد
              </Button>
            </CardContent>
          </Card>

          {/* Top Freelancers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-teal" />
                أفضل المستقلين
              </CardTitle>
              <CardDescription>
                المستقلون الذين تعاملت معهم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFreelancers.map((freelancer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-teal/20 rounded-full flex items-center justify-center">
                        <span className="text-primary-teal font-semibold">
                          {freelancer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{freelancer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {freelancer.speciality}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm font-semibold">{freelancer.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 text-primary-gold">★</div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {freelancer.projects} مشاريع - {freelancer.cost.toLocaleString()} ر.س
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Search className="w-4 h-4 ml-2" />
                البحث عن مستقلين جدد
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
