
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Users, Briefcase, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="bg-gradient-primary text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              منصة <span className="text-gradient-secondary">فرصتك</span> العربية
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-gold/90 leading-relaxed">
              اكبر منصة عربية تجمع أصحاب المهارات مع أصحاب الفرص
            </p>
            <p className="text-lg mb-12 text-white/80 leading-relaxed">
              مبرمجين، مصممين، مترجمين، مسوقين وأكثر... 
              <br />
              اعرض مهاراتك وابحث عن فرصتك المناسبة
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 animate-scale-in">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="ابحث عن مهارة أو مشروع..."
                    className="pr-12 bg-white/90 border-0 text-primary-teal placeholder:text-muted-foreground h-12 text-lg"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary-gold text-primary-teal hover:bg-accent-gold font-semibold h-12 px-8"
                >
                  <Search className="w-5 h-5 ml-2" />
                  بحث
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary-gold text-primary-teal hover:bg-accent-gold font-semibold h-14 px-8 text-lg"
              >
                ابدأ كمستقل
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-teal font-semibold h-14 px-8 text-lg bg-transparent"
              >
                أنشر مشروعك
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <Users className="w-12 h-12 text-primary-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary-gold mb-2">2,500+</h3>
              <p className="text-white/80">مستقل محترف</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <Briefcase className="w-12 h-12 text-primary-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary-gold mb-2">1,200+</h3>
              <p className="text-white/80">مشروع منجز</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <Star className="w-12 h-12 text-primary-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary-gold mb-2">4.9</h3>
              <p className="text-white/80">تقييم العملاء</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-primary-gold text-4xl font-bold mb-4">💰</div>
              <h3 className="text-3xl font-bold text-primary-gold mb-2">95%</h3>
              <p className="text-white/80">رضا العملاء</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
