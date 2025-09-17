
import { Calendar, Eye, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RecentTransactionsProps {
  recentTransactions: Array<{
    id: number;
    type: string;
    amount: number;
    user?: string;
    project?: string;
    date: string;
  }>;
}

const RecentTransactions = ({ recentTransactions }: RecentTransactionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-teal" />
          المعاملات الحديثة
        </CardTitle>
        <CardDescription>
          آخر المعاملات المالية على المنصة
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'اشتراك' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {transaction.type === 'اشتراك' ? (
                    <Users className="w-4 h-4" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {transaction.user || transaction.project}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <Badge variant={transaction.type === 'اشتراك' ? 'default' : 'secondary'}>
                  {transaction.type}
                </Badge>
                <p className="font-semibold text-primary-gold mt-1">
                  +{transaction.amount} ر.س
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Eye className="w-4 h-4 ml-2" />
          عرض جميع المعاملات
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
