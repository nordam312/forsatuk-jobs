import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-6">
              <div className="bg-primary-gold p-2 rounded-xl">
                <div className="w-8 h-8 text-primary-teal font-bold text-xl flex items-center justify-center">
                  ف
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">فرصتك</h3>
                <p className="text-sm text-white/80">ربط المواهب بالفرص</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              أكبر منصة عربية تجمع أصحاب المهارات مع أصحاب الفرص. نساعدك في العثور على المشاريع المناسبة أو المستقلين المحترفين.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Button size="sm" variant="ghost" className="text-white hover:text-primary-gold hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-primary-gold hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-primary-gold hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-primary-gold hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">تصفح المشاريع</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">تصفح المستقلين</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">للشركات</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">من نحن</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">الخدمات</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">البرمجة والتطوير</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">التصميم الجرافيكي</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">الكتابة والترجمة</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">التسويق الرقمي</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">الاستشارات</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary-gold transition-colors">التدريب</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-primary-gold" />
                <span className="text-white/80">info@forstak-platform.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-primary-gold" />
                <span className="text-white/80">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-primary-gold" />
                <span className="text-white/80">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">اشترك في النشرة الإخبارية</h5>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-primary-gold text-primary-teal hover:bg-accent-gold">
                  اشترك
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              © 2024 فرصتك. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <a href="#" className="text-white/80 hover:text-primary-gold transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-white/80 hover:text-primary-gold transition-colors">شروط الاستخدام</a>
              <a href="#" className="text-white/80 hover:text-primary-gold transition-colors">سياسة الاسترداد</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
