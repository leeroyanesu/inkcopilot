import { Button } from "@/components/ui/button";
import { PenTool, Globe, TrendingUp, ArrowRight } from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "Article Auto-Generation",
    description: "AI creates high-quality articles from topics, keywords, or prompts. Generate dozens of pieces while maintaining your unique voice and style.",
    highlight: "Generate 50+ articles/month"
  },
  {
    icon: Globe,
    title: "WordPress Publishing Automation", 
    description: "Seamlessly connect to your WordPress site and publish content automatically. Schedule posts, optimize SEO, and maintain consistent publishing.",
    highlight: "One-click publishing"
  },
  {
    icon: TrendingUp,
    title: "News & SEO Insights",
    description: "Stay ahead with trending topics and SEO optimization. Get real-time news integration and keyword insights to boost your content strategy.",
    highlight: "Pro feature",
    isPro: true
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Scale Content</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful automation tools designed for creators who value their time and want to focus on what matters most.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-glow p-6 sm:p-8 rounded-xl relative group hover:shadow-elegant transition-all duration-300"
            >
              {/* Pro badge */}
              {feature.isPro && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-primary text-primary-foreground text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  PRO
                </div>
              )}
              
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Highlight */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0">
                <span className="text-primary font-semibold text-xs sm:text-sm bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full">
                  {feature.highlight}
                </span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow h-8 px-2.5">
                  Learn More
                  <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-16">
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3 sm:mt-4">No credit card required</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;