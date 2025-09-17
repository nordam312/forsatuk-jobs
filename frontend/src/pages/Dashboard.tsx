
import { useState } from "react";
import Header from "@/components/Header";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import TopFreelancers from "@/components/dashboard/TopFreelancers";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import RevenueChart from "@/components/dashboard/RevenueChart";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data للعرض
  const stats = {
    totalRevenue: 12450,
    monthlyGrowth: 15.3,
    activeSubscribers: 1247,
    completedProjects: 89,
    commission: 2890,
    topFreelancers: [
      { name: "أحمد محمد", earnings: 1250, projects: 8 },
      { name: "فاطمة السالم", earnings: 980, projects: 6 },
      { name: "محمد العتيبي", earnings: 875, projects: 9 },
    ],
    recentTransactions: [
      { id: 1, type: "اشتراك", amount: 49, user: "شركة النور للتقنية", date: "2024-01-15" },
      { id: 2, type: "عمولة", amount: 125, project: "تطوير موقع إلكتروني", date: "2024-01-14" },
      { id: 3, type: "اشتراك", amount: 19, user: "سارة أحمد", date: "2024-01-13" },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopFreelancers topFreelancers={stats.topFreelancers} />
          <RecentTransactions recentTransactions={stats.recentTransactions} />
        </div>

        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
