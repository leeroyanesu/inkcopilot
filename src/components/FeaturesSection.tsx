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
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Scale Content</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful automation tools designed for creators who value their time and want to focus on what matters most.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-glow p-8 rounded-xl relative group hover:shadow-elegant transition-all duration-300"
            >
              {/* Pro badge */}
              {feature.isPro && (
                <div className="absolute top-4 right-4 bg-gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  PRO
                </div>
              )}
              
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Highlight */}
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold text-sm bg-primary/10 px-3 py-1 rounded-full">
                  {feature.highlight}
                </span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="text-lg px-8 py-3">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-muted-foreground mt-4">No credit card required</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;