import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pure gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Pre-headline */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
          <Zap className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-primary font-medium tracking-wide uppercase text-sm">
            Grow on Your Own Terms
          </span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Automated Writing for{" "}
          <span className="text-gradient animate-pulse">Busy Creators</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Remove friction from content creation and publishing with AI-powered automation that works while you focus on growing your audience.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
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
        <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2 hover-scale">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center gap-2 hover-scale">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 hover-scale">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span>Start in minutes</span>
            </div>
          </div>
          
          {/* Company logos */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-muted-foreground text-sm mb-6">Trusted by content creators worldwide</p>
            <div className="flex justify-center items-center gap-12 opacity-40">
              {['TechCrunch', 'Medium', 'Substack', 'WordPress', 'Ghost'].map((logo, index) => (
                <div key={index} className="text-muted-foreground font-medium text-lg hover-scale">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;