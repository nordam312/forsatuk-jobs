
import { Link } from "react-router-dom";
import { ShieldX, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldX className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-primary-teal">
                غير مخول للوصول
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة. 
                يرجى التأكد من تسجيل الدخول بحساب مناسب.
              </p>
              
              <div className="space-y-2">
                <Link to="/">
                  <Button className="w-full bg-gradient-primary text-white">
                    العودة للرئيسية
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
