import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$5",
    period: "/month",
    description: "Perfect for individual creators getting started",
    features: [
      "25 articles per month",
      "5 publishing jobs per day",
      "3 custom posts per day",
      "2 active automation jobs",
      "GPT-4 AI model",
      "Basic WordPress integration",
      "Email support"
    ],
    cta: "Start with Starter",
    popular: false
  },
  {
    name: "Pro",
    price: "$8.99", 
    period: "/month",
    description: "Best value for serious content creators",
    features: [
      "100 articles per month",
      "20 publishing jobs per day",
      "15 custom posts per day",
      "10 active automation jobs", 
      "GPT-4 + Claude AI models",
      "Real-time news integration",
      "Advanced WordPress integration",
      "Priority support + Live chat"
    ],
    cta: "Choose Pro Plan",
    popular: true,
    highlight: "Most Popular"
  }
];

const comparisonFeatures = [
  { feature: "Articles per month", starter: "25", pro: "100" },
  { feature: "Publishing jobs per day", starter: "5", pro: "20" },
  { feature: "Custom posts per day", starter: "3", pro: "15" },
  { feature: "Active automation jobs", starter: "2", pro: "10" },
  { feature: "AI Models", starter: "GPT-4", pro: "GPT-4 + Claude" },
  { feature: "News Integration", starter: "❌", pro: "✅" },
  { feature: "WordPress Integration", starter: "Basic", pro: "Advanced" },
  { feature: "Support", starter: "Email", pro: "Priority + Chat" }
];

const Pricing = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that scales with your content goals. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-glow p-8 rounded-xl relative ${
                plan.popular ? 'ring-2 ring-primary shadow-elegant' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {plan.highlight}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                size="lg" 
                className="w-full text-lg py-3"
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Feature Comparison</h3>
          <div className="card-glow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-6 font-semibold">Feature</th>
                    <th className="text-center p-6 font-semibold">Starter</th>
                    <th className="text-center p-6 font-semibold text-primary">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="p-6 font-medium">{row.feature}</td>
                      <td className="p-6 text-center text-muted-foreground">{row.starter}</td>
                      <td className="p-6 text-center text-primary font-semibold">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-4">Trusted by Content Creators Worldwide</h3>
          <p className="text-muted-foreground mb-8">Join thousands of creators who've automated their content workflow</p>
          
          {/* Placeholder logos */}
          <div className="flex justify-center items-center gap-12 opacity-60">
            {['TechCrunch', 'Medium', 'Substack', 'WordPress', 'Ghost'].map((logo, index) => (
              <div key={index} className="text-muted-foreground font-semibold text-lg">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;