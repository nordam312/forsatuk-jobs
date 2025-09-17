
import { DollarSign, TrendingUp, Users, Briefcase, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalRevenue: number;
    monthlyGrowth: number;
    activeSubscribers: number;
    completedProjects: number;
    commission: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
          <DollarSign className="h-4 w-4 text-primary-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-teal">
            {stats.totalRevenue.toLocaleString()} ر.س
          </div>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{stats.monthlyGrowth}% من الشهر الماضي
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المشتركون النشطون</CardTitle>
          <Users className="h-4 w-4 text-primary-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-teal">
            {stats.activeSubscribers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +12% من الشهر الماضي
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
          <Briefcase className="h-4 w-4 text-accent-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-teal">
            {stats.completedProjects}
          </div>
          <p className="text-xs text-muted-foreground">
            هذا الشهر
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">عمولة المشاريع</CardTitle>
          <BarChart3 className="h-4 w-4 text-primary-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-teal">
            {stats.commission.toLocaleString()} ر.س
          </div>
          <p className="text-xs text-green-600">
            +8% من الشهر الماضي
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
