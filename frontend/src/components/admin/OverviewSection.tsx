import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  freelancer: string;
  status: string;
  budget: number;
}

interface OverviewSectionProps {
  isRTL: boolean;
  statCards: StatCard[];
  recentUsers: User[];
  recentProjects: Project[];
}

const OverviewSection = ({ isRTL, statCards, recentUsers, recentProjects }: OverviewSectionProps) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' };
      case 'pending':
        return { variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-white' };
      case 'suspended':
        return { variant: 'destructive' as const };
      default:
        return { variant: 'outline' as const };
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        {isRTL ? 'نظرة عامة' : 'Dashboard Overview'}
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <Badge variant="secondary" className="text-green-600">
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{isRTL ? 'المستخدمون الجدد' : 'Recent Users'}</CardTitle>
            <Button variant="ghost" size="sm">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge {...getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline">{user.role}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{isRTL ? 'المشاريع الحديثة' : 'Recent Projects'}</CardTitle>
            <Button variant="ghost" size="sm">
              {isRTL ? 'عرض الكل' : 'View All'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge {...getStatusBadge(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="font-semibold text-green-600">
                      ${project.budget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewSection;