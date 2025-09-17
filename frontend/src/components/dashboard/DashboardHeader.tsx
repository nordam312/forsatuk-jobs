
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

const DashboardHeader = ({ selectedPeriod, setSelectedPeriod }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-teal">لوحة تحكم الأرباح</h1>
        <p className="text-muted-foreground mt-2">
          تتبع إيراداتك وأداء منصتك في مكان واحد
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 ml-2" />
          تصدير التقرير
        </Button>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
          <option value="quarter">هذا الربع</option>
          <option value="year">هذا العام</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardHeader;
