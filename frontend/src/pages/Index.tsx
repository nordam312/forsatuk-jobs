
import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Categories,
  FeaturedProjects,
  TopFreelancers,
  Features
} from "@/components/home";

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
