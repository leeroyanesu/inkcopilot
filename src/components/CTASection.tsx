import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Start generating content in 5 minutes",
  "No credit card required for trial",
  "Cancel anytime, no questions asked",
  "24/7 customer support included"
];

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="card-glow rounded-3xl p-12 md:p-16 text-center bg-gradient-hero relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-gradient">Scale Your Content?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of content creators who've automated their workflow and multiplied their output without sacrificing quality.
            </p>
            
            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No setup fees • No long-term contracts • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;