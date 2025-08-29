import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="pt-14 sm:pt-16">
      <div className="space-y-12 sm:space-y-24">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;