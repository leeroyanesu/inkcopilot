import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-glow/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Pre-headline */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium tracking-wide uppercase text-sm">
            Grow on Your Own Terms
          </span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Automated Writing for{" "}
          <span className="text-gradient">Busy Creators</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Remove friction from content creation and publishing with AI-powered automation that works while you focus on growing your audience.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={scrollToFeatures}
            className="text-lg px-8 py-3 h-14"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={scrollToFeatures}
            className="text-lg px-8 py-3 h-14"
          >
            View Features
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>No setup required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span>Start in minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;