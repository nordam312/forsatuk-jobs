
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TopFreelancersProps {
  topFreelancers: Array<{
    name: string;
    earnings: number;
    projects: number;
  }>;
}

const TopFreelancers = ({ topFreelancers }: TopFreelancersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-teal" />
          أفضل المستقلين
        </CardTitle>
        <CardDescription>
          المستقلون الأكثر نشاطاً هذا الشهر
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
                    {freelancer.projects} مشاريع
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-primary-gold">
                  {freelancer.earnings} ر.س
                </p>
                <p className="text-sm text-muted-foreground">أرباح</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopFreelancers;
