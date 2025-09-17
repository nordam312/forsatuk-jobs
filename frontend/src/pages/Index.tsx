
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProjects from "@/components/FeaturedProjects";
import TopFreelancers from "@/components/TopFreelancers";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProjects />
      <TopFreelancers />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
