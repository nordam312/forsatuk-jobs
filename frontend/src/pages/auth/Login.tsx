
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      toast.success("تم تسجيل الدخول بنجاح!");

      // Navigate to appropriate dashboard based on user role
      // This will be handled by the auth context
      navigate('/dashboard');
    } catch (error) {
      toast.error("خطأ في تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-teal mb-2">
                أهلاً بك مرة أخرى
              </h1>
              <p className="text-muted-foreground">
                سجل دخولك للوصول إلى حسابك واستكمال رحلتك المهنية
              </p>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-primary-teal">
                  تسجيل الدخول
                </CardTitle>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="mb-2"><strong>حسابات تجريبية:</strong></p>
                  <p>الإدارة: admin@forsatk.com</p>
                  <p>المستقل: freelancer@example.com</p>
                  <p>الشركة: company@example.com</p>
                  <p className="text-xs mt-2">كلمة المرور: أي شيء</p>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-teal">
                      البريد الإلكتروني
                    </Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="أدخل بريدك الإلكتروني"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-primary-teal">
                      كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        className="pr-10 pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary-teal"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" className="rounded border-muted-foreground" />
                      <span className="text-muted-foreground">تذكرني</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary-teal hover:text-accent-teal">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary text-white hover:opacity-90 h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </form>

                <div className="my-6">
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-4 text-sm text-muted-foreground">أو</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full" type="button">
                    <img src="/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png" alt="Google" className="w-5 h-5 ml-2" />
                    تسجيل الدخول بـ Google
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <img src="/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png" alt="Facebook" className="w-5 h-5 ml-2" />
                    تسجيل الدخول بـ Facebook
                  </Button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link to="/register" className="text-primary-teal hover:text-accent-teal font-semibold">
                      سجل الآن
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
