
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RevenueChart = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>الإيرادات الشهرية</CardTitle>
        <CardDescription>
          تطور الإيرادات خلال الأشهر الماضية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              سيتم إضافة الرسم البياني للإيرادات هنا
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
