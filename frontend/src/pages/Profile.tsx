import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  MapPin, Globe, Calendar, Shield, Star, Eye, Heart, Share2, MessageCircle,
  Clock, CheckCircle, XCircle, TrendingUp, Award, Briefcase, DollarSign,
  Edit, Settings, Camera, Mail, Phone, Facebook, Twitter, Linkedin, Github
} from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const { isRTL } = useLanguage();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('services');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock user data - في الواقع ستأتي من API
  const profileData = {
    id: 1,
    first_name: 'أحمد',
    last_name: 'محمد',
    username: 'ahmed_mohammed',
    avatar: '/placeholder.svg',
    cover: '/placeholder.svg',
    title: 'مطور Full Stack محترف',
    bio: 'مطور ويب محترف بخبرة تزيد عن 5 سنوات في تطوير تطبيقات الويب الحديثة باستخدام React, Node.js, Laravel. أقدم حلول برمجية متكاملة وعالية الجودة.',
    location: 'الرياض، السعودية',
    memberSince: '2020',
    lastSeen: 'منذ 5 دقائق',
    responseTime: 'ساعة واحدة',
    languages: ['العربية', 'الإنجليزية'],
    skills: ['React', 'Node.js', 'Laravel', 'TypeScript', 'MySQL', 'MongoDB', 'AWS'],
    rating: 4.9,
    totalReviews: 234,
    completedProjects: 156,
    onTimeDelivery: 98,
    orderCompletionRate: 99,
    repeatClients: 45,
    level: 'بائع مميز',
    verified: true,
    online: true,
    startingPrice: 50,
    socialLinks: {
      website: 'https://example.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  };

  const services = [
    {
      id: 1,
      title: 'تطوير موقع ويب متجاوب بـ React',
      description: 'سأقوم بتطوير موقع ويب احترافي ومتجاوب باستخدام React و Tailwind CSS',
      price: 150,
      deliveryTime: 7,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 45,
      orders: 67
    },
    {
      id: 2,
      title: 'تطوير API باستخدام Node.js',
      description: 'تطوير RESTful API احترافي باستخدام Node.js و Express',
      price: 200,
      deliveryTime: 5,
      image: '/placeholder.svg',
      rating: 5.0,
      reviews: 32,
      orders: 48
    },
    {
      id: 3,
      title: 'تطوير متجر إلكتروني كامل',
      description: 'تطوير متجر إلكتروني متكامل مع لوحة تحكم ونظام دفع',
      price: 500,
      deliveryTime: 14,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 28,
      orders: 35
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'متجر إلكتروني لبيع الملابس',
      category: 'تجارة إلكترونية',
      image: '/placeholder.svg',
      link: '#'
    },
    {
      id: 2,
      title: 'منصة تعليمية تفاعلية',
      category: 'تعليم',
      image: '/placeholder.svg',
      link: '#'
    },
    {
      id: 3,
      title: 'تطبيق إدارة المهام',
      category: 'إنتاجية',
      image: '/placeholder.svg',
      link: '#'
    },
    {
      id: 4,
      title: 'موقع شركة استشارات',
      category: 'أعمال',
      image: '/placeholder.svg',
      link: '#'
    }
  ];

  const reviews = [
    {
      id: 1,
      client: 'محمد السعيد',
      avatar: '/placeholder.svg',
      rating: 5,
      date: 'منذ أسبوع',
      comment: 'عمل ممتاز وتسليم في الوقت المحدد. أنصح بالتعامل معه بشدة.',
      project: 'تطوير موقع ويب'
    },
    {
      id: 2,
      client: 'فاطمة أحمد',
      avatar: '/placeholder.svg',
      rating: 5,
      date: 'منذ أسبوعين',
      comment: 'محترف جداً وملتزم بالمواعيد. النتيجة فاقت التوقعات.',
      project: 'تطوير API'
    },
    {
      id: 3,
      client: 'خالد العمري',
      avatar: '/placeholder.svg',
      rating: 4,
      date: 'منذ شهر',
      comment: 'عمل جيد وتواصل ممتاز. سأتعامل معه مرة أخرى.',
      project: 'متجر إلكتروني'
    }
  ];

  const isOwnProfile = currentUser?.id === parseInt(userId || '0');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover & Header Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-60 bg-gradient-primary relative">
          {isOwnProfile && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white hover:bg-white/30"
            >
              <Camera className="w-4 h-4 mr-2" />
              تغيير الغلاف
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-20">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-3xl">
                      {profileData.first_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {profileData.online && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  {isOwnProfile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-0 left-0 bg-white/80 backdrop-blur p-1 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">
                          {profileData.first_name} {profileData.last_name}
                        </h1>
                        {profileData.verified && (
                          <Shield className="w-5 h-5 text-blue-500" />
                        )}
                        {profileData.level && (
                          <Badge className="bg-gradient-primary text-white">
                            {profileData.level}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">@{profileData.username}</p>
                      <h2 className="text-xl text-primary-teal mb-3">{profileData.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profileData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          عضو منذ {profileData.memberSince}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {profileData.online ? 'متصل الآن' : profileData.lastSeen}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {isOwnProfile ? (
                        <>
                          <Link to="/settings/profile">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              تعديل الملف
                            </Button>
                          </Link>
                          <Link to="/settings">
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Button className="bg-gradient-primary text-white">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            راسلني
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsFollowing(!isFollowing)}
                          >
                            {isFollowing ? 'متابع' : 'متابعة'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFavorite(!isFavorite)}
                          >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary-teal">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    {profileData.rating}
                  </div>
                  <p className="text-sm text-gray-600">التقييم</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-teal">
                    {profileData.completedProjects}
                  </div>
                  <p className="text-sm text-gray-600">مشروع مكتمل</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-teal">
                    {profileData.onTimeDelivery}%
                  </div>
                  <p className="text-sm text-gray-600">تسليم في الوقت</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-teal">
                    {profileData.repeatClients}%
                  </div>
                  <p className="text-sm text-gray-600">عملاء متكررون</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-teal">
                    {profileData.responseTime}
                  </div>
                  <p className="text-sm text-gray-600">وقت الاستجابة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* About */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">نبذة عني</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {profileData.bio}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">المهارات</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">اللغات</h4>
                  <div className="space-y-1">
                    {profileData.languages.map((lang) => (
                      <div key={lang} className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-gray-400" />
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {profileData.socialLinks && (
                  <div>
                    <h4 className="font-semibold mb-2">روابط التواصل</h4>
                    <div className="flex gap-2">
                      {profileData.socialLinks.website && (
                        <Button variant="ghost" size="sm">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                      {profileData.socialLinks.github && (
                        <Button variant="ghost" size="sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {profileData.socialLinks.linkedin && (
                        <Button variant="ghost" size="sm">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {profileData.socialLinks.twitter && (
                        <Button variant="ghost" size="sm">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">الإنجازات</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="font-semibold">بائع مميز</p>
                      <p className="text-sm text-gray-600">أفضل 10% من البائعين</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-semibold">صاعد بسرعة</p>
                      <p className="text-sm text-gray-600">نمو 50% في الشهر الماضي</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-semibold">موثوق</p>
                      <p className="text-sm text-gray-600">هوية وأعمال موثقة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services">الخدمات</TabsTrigger>
                <TabsTrigger value="portfolio">الأعمال</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100 relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2 line-clamp-2">{service.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{service.rating}</span>
                            <span className="text-gray-400">({service.reviews})</span>
                          </div>
                          <div className="text-gray-600">
                            {service.orders} طلب
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {service.deliveryTime} أيام
                          </div>
                          <div className="text-lg font-bold text-primary-teal">
                            ${service.price}
                          </div>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-primary text-white">
                          اطلب الآن
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100 relative group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            عرض المشروع
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                        <h4 className="font-bold">{item.title}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                {/* Reviews Summary */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary-teal">{profileData.rating}</div>
                        <div className="flex items-center gap-1 my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(profileData.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{profileData.totalReviews} تقييم</p>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2 mb-2">
                            <span className="text-sm w-2">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400" />
                            <Progress
                              value={rating === 5 ? 85 : rating === 4 ? 10 : 5}
                              className="flex-1 h-2"
                            />
                            <span className="text-sm text-gray-600 w-10">
                              {rating === 5 ? '85%' : rating === 4 ? '10%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.client[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold">{review.client}</p>
                                <p className="text-sm text-gray-600">{review.project}</p>
                              </div>
                              <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;