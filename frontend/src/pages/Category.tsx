import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/config/api";

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
  description_en?: string;
  description_ar?: string;
  icon?: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
  category_id: number;
  services_count?: number;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
  freelancer: {
    id: number;
    name: string;
    avatar?: string;
    rating: number;
    location?: string;
  };
  image?: string;
  rating: number;
  reviews_count: number;
}

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [category, setCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
  }, [slug]);

  useEffect(() => {
    fetchServices();
  }, [selectedSubcategory, slug]);

  const fetchCategoryData = async () => {
    try {
      const response = await api.get(`/categories/${slug}`);
      if (response.data.success) {
        setCategory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      // For now, we'll use mock data since services API isn't ready
      // In future: const response = await api.get(`/services?category=${slug}&subcategory=${selectedSubcategory}`);

      // Mock services data
      const mockServices: Service[] = [
        {
          id: 1,
          title: "Professional Logo Design",
          description: "I will create a unique and professional logo for your business",
          price: 50,
          delivery_time: 3,
          freelancer: {
            id: 1,
            name: "Ahmed Ali",
            rating: 4.9,
            location: "Dubai, UAE"
          },
          rating: 4.9,
          reviews_count: 127
        },
        {
          id: 2,
          title: "Full Brand Identity Package",
          description: "Complete brand identity including logo, business cards, and social media kit",
          price: 250,
          delivery_time: 7,
          freelancer: {
            id: 2,
            name: "Sarah Johnson",
            rating: 5.0,
            location: "London, UK"
          },
          rating: 5.0,
          reviews_count: 89
        },
        {
          id: 3,
          title: "Custom Website Design",
          description: "Modern and responsive website design tailored to your needs",
          price: 500,
          delivery_time: 14,
          freelancer: {
            id: 3,
            name: "Mohammed Hassan",
            rating: 4.8,
            location: "Cairo, Egypt"
          },
          rating: 4.8,
          reviews_count: 215
        },
        {
          id: 4,
          title: "Mobile App UI/UX Design",
          description: "Beautiful and user-friendly mobile app design for iOS and Android",
          price: 800,
          delivery_time: 21,
          freelancer: {
            id: 4,
            name: "Lisa Chen",
            rating: 4.7,
            location: "Singapore"
          },
          rating: 4.7,
          reviews_count: 64
        }
      ];

      setServices(mockServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categoryName = isRTL ? category.name_ar : category.name_en;
  const categoryDescription = isRTL ? category.description_ar : category.description_en;

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      {/* Category Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          {categoryDescription && (
            <p className="text-xl opacity-90 max-w-3xl">
              {categoryDescription}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Subcategories Sidebar - Right side in LTR, Left side in RTL */}
          <aside className={`lg:w-1/4 ${isRTL ? 'lg:order-first' : 'lg:order-last'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">
                {isRTL ? "التصنيفات الفرعية" : "Subcategories"}
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg transition-colors flex items-center justify-between group ${
                    selectedSubcategory === null
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{isRTL ? "جميع الخدمات" : "All Services"}</span>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} ${selectedSubcategory === null ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                </button>

                {category.subcategories?.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg transition-colors flex items-center justify-between group ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>
                      {isRTL ? subcategory.name_ar : subcategory.name_en}
                    </span>
                    <div className="flex items-center gap-2">
                      {subcategory.services_count && (
                        <Badge variant="secondary" className="text-xs">
                          {subcategory.services_count}
                        </Badge>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} ${selectedSubcategory === subcategory.id ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Services Grid - Center */}
          <main className="lg:flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedSubcategory
                  ? category.subcategories?.find(s => s.id === selectedSubcategory)?.[isRTL ? 'name_ar' : 'name_en']
                  : isRTL ? "جميع الخدمات" : "All Services"}
              </h2>
              <p className="text-gray-600">
                {services.length} {isRTL ? "خدمة متاحة" : "services available"}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">
                  {isRTL ? "لا توجد خدمات متاحة حالياً" : "No services available at the moment"}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div
                      className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                      onClick={() => navigate(`/service/${service.id}`)}
                    >
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-4xl font-bold text-gray-300">
                            {service.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={service.freelancer.avatar || `https://ui-avatars.com/api/?name=${service.freelancer.name}&background=random`}
                            alt={service.freelancer.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">{service.freelancer.name}</p>
                            {service.freelancer.location && (
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {service.freelancer.location}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="text-gray-500 text-sm">({service.reviews_count})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {service.delivery_time} {isRTL ? "أيام" : "days"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            ${service.price}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4"
                        onClick={() => navigate(`/service/${service.id}`)}
                      >
                        {isRTL ? "عرض التفاصيل" : "View Details"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;