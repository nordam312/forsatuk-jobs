
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    phone: ""
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من البيانات
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.userType) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        user_type: formData.userType as 'freelancer' | 'employer' | 'client',
        phone: formData.phone || undefined,
        platform: 'web'
      };
      await register(registerData);

      toast.success("تم إنشاء الحساب بنجاح!");

      // التوجيه حسب نوع المستخدم
      if (formData.userType === 'freelancer') {
        navigate('/freelancer/dashboard');
      } else if (formData.userType === 'employer') {
        navigate('/company/dashboard');
      } else if (formData.userType === 'client') {
        navigate('/dashboard'); // العملاء يذهبون للوحة تحكم عامة
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data);

      // معالجة أخطاء الـ validation من Backend
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0]; // جلب مفتاح المشكلة
        const firstError = errors[firstErrorKey][0]; // جلب نتيجة المشكلة عن طريق المفتاح
        console.log(errors)
        console.log(firstErrorKey)
        console.log(firstError)
        // ترجمة رسائل الخطأ الشائعة
        if (firstError.includes('already been taken')) {
          toast.error('البريد الإلكتروني مستخدم بالفعل');
        } else if (firstError.includes('required')) {
          toast.error('يرجى ملء جميع الحقول المطلوبة');
        } else if (firstError.includes('confirmed')) {
          toast.error('كلمتا المرور غير متطابقتين');
        } else if (firstError.includes('at least 8')) {
          toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        } else {
          toast.error(firstError);
        }
      }else {
        toast.error(error.message || "حدث خطأ أثناء إنشاء الحساب");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-teal mb-2">
                انضم إلى فرصتك
              </h1>
              <p className="text-muted-foreground">
                أنشئ حسابك الآن وابدأ رحلتك المهنية مع أكبر منصة عربية للمواهب
              </p>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-primary-teal">
                  إنشاء حساب جديد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-primary-teal">
                        الاسم الأول
                      </Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="الاسم الأول"
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-primary-teal">
                        الاسم الأخير
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="الاسم الأخير"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-teal">
                      البريد الإلكتروني
                    </Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="أدخل بريدك الإلكتروني"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary-teal">
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="رقم الهاتف"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType" className="text-primary-teal">
                      نوع الحساب
                    </Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                      <SelectTrigger>
                        <Briefcase className="w-4 h-4 ml-2" />
                        <SelectValue placeholder="اختر نوع الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freelancer">مستقل (أقدم خدماتي)</SelectItem>
                        <SelectItem value="employer">شركة/مؤسسة (أوظف مستقلين)</SelectItem>
                        <SelectItem value="client">عميل (أبحث عن خدمات)</SelectItem>
                      </SelectContent>
                    </Select>
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
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-primary-teal">
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="أعد كتابة كلمة المرور"
                        className="pr-10 pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary-teal"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded border-muted-foreground mt-1" required />
                    <p className="text-sm text-muted-foreground">
                      أوافق على{" "}
                      <Link to="/terms" className="text-primary-teal hover:text-accent-teal">
                        الشروط والأحكام
                      </Link>{" "}
                      و{" "}
                      <Link to="/privacy" className="text-primary-teal hover:text-accent-teal">
                        سياسة الخصوصية
                      </Link>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white hover:opacity-90 h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                    {!isLoading && <ArrowRight className="w-4 h-4 mr-2" />}
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
                    التسجيل بـ Google
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <img src="/lovable-uploads/19cb74b3-0ef2-4765-b8cd-6cf62a9314b6.png" alt="Facebook" className="w-5 h-5 ml-2" />
                    التسجيل بـ Facebook
                  </Button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    لديك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-primary-teal hover:text-accent-teal font-semibold">
                      سجل دخولك
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

export default Register;
