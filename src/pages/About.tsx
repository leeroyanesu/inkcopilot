import { Button } from "@/components/ui/button";
import { Bot, Workflow, TrendingUp, Zap, ArrowRight } from "lucide-react";

const deepDives = [
  {
    icon: Bot,
    title: "AI Content Generation",
    description: "Advanced language models create articles that match your style and voice. Our AI understands context, maintains consistency, and produces content that engages your audience while saving hours of writing time.",
    visualCue: "Smart algorithms analyze your previous content to maintain brand voice"
  },
  {
    icon: Workflow,
    title: "WordPress Publishing Automation",
    description: "Seamlessly integrate with your WordPress site for automated publishing workflows. Schedule content, optimize meta descriptions, handle featured images, and maintain SEO best practices without manual intervention.",
    visualCue: "One-click setup connects directly to your WordPress admin"
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance Insights",
    description: "Built-in SEO optimization ensures your content ranks well. Get keyword suggestions, readability scores, and performance analytics to continuously improve your content strategy and organic reach.",
    visualCue: "Real-time optimization suggestions as content is generated"
  },
  {
    icon: Zap,
    title: "News Integration & Trending Topics",
    description: "Stay ahead of the curve with real-time news integration. Our system monitors trending topics in your niche and suggests timely content opportunities to maximize engagement and relevance.",
    visualCue: "Live feeds from 10,000+ news sources worldwide"
  }
];

const About = () => {
  return (
    <div className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mission header */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Removing Friction from{" "}
            <span className="text-gradient">Content Creation</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe content creators should spend their time on strategy, creativity, and audience building—not 
            on repetitive writing tasks. Our platform automates the production pipeline so you can focus on what truly matters.
          </p>
        </div>

        {/* Feature deep dives */}
        <div className="space-y-12 sm:space-y-20 mb-12 sm:mb-20">
          {deepDives.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 sm:gap-12 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{feature.title}</h3>
                </div>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4">
                  <p className="text-primary font-medium text-xs sm:text-sm">
                    💡 {feature.visualCue}
                  </p>
                </div>
              </div>
              
              {/* Visual placeholder */}
              <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md w-full">
                <div className="card-glow aspect-square rounded-xl p-6 sm:p-8 flex items-center justify-center">
                  <feature.icon className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-primary/30" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values statement */}
        <div className="text-center bg-gradient-card rounded-xl sm:rounded-2xl p-6 sm:p-12 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Built for Writers Who Value Growth</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Every feature is designed around three core principles: <strong className="text-foreground">speed</strong> in execution, 
            <strong className="text-foreground"> automation</strong> of repetitive tasks, and <strong className="text-foreground">quality</strong> that 
            maintains your unique voice. We're not just a tool—we're your content creation partner.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">10x</div>
              <p className="text-sm sm:text-base text-muted-foreground">Faster content production</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">50+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Custom posts per day</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">24/7</div>
              <p className="text-sm sm:text-base text-muted-foreground">Automated publishing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">99%</div>
              <p className="text-sm sm:text-base text-muted-foreground">Quality maintained</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Content Workflow?</h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of creators who've automated their content production and scaled their reach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">No credit card required • Setup in 5 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default About;