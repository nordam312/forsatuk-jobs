
import { useState } from "react";
import { Check, Crown, Zap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "مجاني",
      price: 0,
      description: "للمبتدئين والتجربة",
      icon: Star,
      features: [
        "إنشاء حساب مجاني",
        "تصفح المشاريع",
        "التقديم على 3 مشاريع شهرياً",
        "ملف شخصي أساسي",
        "دعم المجتمع"
      ],
      limitations: [
        "عمولة 10% على المشاريع",
        "لا يمكن نشر مشاريع",
        "محدودية في التواصل"
      ],
      buttonText: "ابدأ مجاناً",
      popular: false
    },
    {
      name: "المستقل المحترف",
      price: isAnnual ? 199 : 19,
      originalPrice: isAnnual ? 240 : 25,
      description: "للمستقلين الجادين",
      icon: Crown,
      features: [
        "تقديم غير محدود على المشاريع",
        "ملف شخصي متقدم مع معرض أعمال",
        "ظهور أولوية في نتائج البحث",
        "إحصائيات مفصلة للأداء",
        "دعم فني مخصص",
        "شارات الثقة والتحقق"
      ],
      limitations: [
        "عمولة 5% على المشاريع"
      ],
      buttonText: "اشترك الآن",
      popular: true
    },
    {
      name: "الشركات",
      price: isAnnual ? 499 : 49,
      originalPrice: isAnnual ? 600 : 60,
      description: "للشركات وأصحاب الأعمال",
      icon: Users,
      features: [
        "نشر مشاريع غير محدود",
        "إدارة فريق متعدد المستخدمين",
        "فلترة متقدمة للمستقلين",
        "تقارير مفصلة",
        "مدير حساب مخصص",
        "أولوية في الدعم الفني",
        "أدوات إدارة المشاريع"
      ],
      limitations: [
        "عمولة 3% على المشاريع"
      ],
      buttonText: "ابدأ التجربة",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-teal mb-4">
            خطط التسعير
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            اختر الخطة المناسبة لك وابدأ رحلتك في عالم العمل الحر
          </p>
          
          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`font-medium ${!isAnnual ? 'text-primary-teal' : 'text-muted-foreground'}`}>
              شهري
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 rounded-full p-1 transition-colors ${
                isAnnual ? 'bg-primary-teal' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-primary-teal' : 'text-muted-foreground'}`}>
              سنوي
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-primary-gold/20 text-primary-gold">
                وفر 20%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-primary-teal shadow-lg scale-105' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-teal text-white"
                >
                  الأكثر شعبية
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary-teal/10 w-fit">
                  <plan.icon className="w-8 h-8 text-primary-teal" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary-teal">
                      {plan.price} ر.س
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? 'سنة' : 'شهر'}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {plan.originalPrice} ر.س
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">المميزات:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations && (
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-600">الشروط:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary-teal hover:bg-primary-teal/90' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-teal">
            الأسئلة الشائعة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">كيف يتم حساب العمولة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  العمولة تُخصم تلقائياً من قيمة المشروع عند إتمام الدفع وتختلف حسب نوع الاشتراك.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل يمكن تغيير الخطة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نعم، يمكنك ترقية أو تقليل خطتك في أي وقت من لوحة التحكم الخاصة بك.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ما هي وسائل الدفع المتاحة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نقبل جميع بطاقات الائتمان الرئيسية ومحافظ الدفع الإلكترونية المحلية.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل هناك ضمان استرداد؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نعم، نوفر ضمان استرداد خلال 14 يوم من تاريخ الاشتراك بدون أي شروط.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
