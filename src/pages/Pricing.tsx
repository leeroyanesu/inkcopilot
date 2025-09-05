import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Try before you subscribe",
    features: [
      "2 posts trial limit",
      "1 publishing job per day",
      "No custom posts",
      "No automation jobs",
      "Basic AI model",
      "No integrations",
      "Community support"
    ],
    cta: "Current Plan",
    popular: false,
    disabled: true
  },
  {
    name: "Starter",
    price: "$5",
    period: "/month",
    description: "Perfect for individual creators getting started",
    features: [
      "30 posts per month",
      "5 publishing jobs per day",
      "3 custom posts per day",
      "2 active automation jobs",
      "GPT-4 AI model",
      "Basic WordPress integration",
      "Email support"
    ],
    cta: "Choose Plan",
    popular: false
  },
  {
    name: "Pro",
    price: "$8.99", 
    period: "/month",
    description: "Best value for serious content creators",
    features: [
      "60 posts per month",
      "20 publishing jobs per day",
      "15 custom posts per day",
      "10 active automation jobs", 
      "GPT-4 + Claude AI models",
      "Real-time news integration",
      "Advanced WordPress integration",
      "Priority support + Live chat"
    ],
    cta: "Choose Plan",
    popular: true,
    highlight: "Most Popular"
  }
];

const comparisonFeatures = [
  { feature: "Monthly Price", free: "$0", starter: "$5", pro: "$8.99", custom: "Custom" },
  { feature: "Posts per month", free: "2 (trial)", starter: "30", pro: "60", custom: "60+" },
  { feature: "Publishing jobs per day", free: "1", starter: "5", pro: "20", custom: "20+" },
  { feature: "Custom posts per day", free: "0", starter: "3", pro: "15", custom: "15+" },
  { feature: "Active automation jobs", free: "0", starter: "2", pro: "10", custom: "10+" },
  { feature: "AI Models", free: "Basic", starter: "GPT-4", pro: "GPT-4 + Claude", custom: "All Models" },
  { feature: "News Integration", free: "❌", starter: "❌", pro: "✅", custom: "✅" },
  { feature: "WordPress Integration", free: "❌", starter: "Basic", pro: "Advanced", custom: "Premium" },
  { feature: "Support", free: "Community", starter: "Email", pro: "Priority + Chat", custom: "Dedicated Support" }
];

const Pricing = () => {
  const navigate = useNavigate();
  const [customPosts, setCustomPosts] = useState([90]); // Start at 90 posts (60 + 30)
  
  // Calculate custom plan price
  const calculateCustomPrice = (posts: number) => {
    const basePosts = 60; // Pro plan posts
    const basePrice = 8.99; // Pro plan price
    
    if (posts <= basePosts) return basePrice;
    
    const extraPosts = posts - basePosts;
    const extraBatches = Math.ceil(extraPosts / 30);
    const pricePerPost = 0.15; // Base price per post
    const discountedRate = pricePerPost * 0.9; // 10% discount
    const extraCost = extraBatches * 30 * discountedRate;
    
    return basePrice + extraCost;
  };

  return (
    <div className="min-h-screen py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that scales with your content goals. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-glow p-6 sm:p-8 rounded-xl relative ${
                plan.popular ? 'ring-2 ring-primary shadow-elegant' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {plan.highlight}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{plan.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                size="lg" 
                className="w-full text-base sm:text-lg h-10 sm:h-12"
                disabled={plan.disabled}
                onClick={() => navigate('/checkout', {
                  state: { 
                    plan: {
                      name: plan.name,
                      price: plan.price,
                      period: plan.period
                    }
                  }
                })}
              >
                {plan.cta}
                {!plan.disabled && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          ))}
          
          {/* Custom Plan */}
          <div className="card-glow p-6 sm:p-8 rounded-xl relative">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Custom</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">Tailored for enterprise content creators</p>
              <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-gradient">
                  ${calculateCustomPrice(customPosts[0]).toFixed(2)}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground">/month</span>
              </div>
            </div>

            {/* Posts Slider */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium">Posts per month</label>
                <span className="text-primary font-semibold">{customPosts[0]} posts</span>
              </div>
              <Slider
                value={customPosts}
                onValueChange={setCustomPosts}
                max={300}
                min={60}
                step={30}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>60</span>
                <span>300+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                10% discount on every additional 30 posts beyond Pro plan
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{customPosts[0]} posts per month</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Unlimited publishing jobs</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Unlimited custom posts</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Unlimited automation jobs</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">All AI models included</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Premium integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Dedicated account manager</span>
              </li>
            </ul>

            {/* CTA */}
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full text-lg py-3"
              onClick={() => navigate('/checkout', {
                state: { 
                  plan: {
                    name: 'Custom',
                    price: `$${calculateCustomPrice(customPosts[0]).toFixed(2)}`,
                    period: '/month',
                    posts: customPosts[0]
                  }
                }
              })}
            >
              Get Custom Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Feature Comparison</h3>
          <div className="card-glow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 sm:p-6 font-semibold text-sm sm:text-base">Feature</th>
                    <th className="text-center p-4 sm:p-6 font-semibold text-sm sm:text-base">Free</th>
                    <th className="text-center p-4 sm:p-6 font-semibold text-sm sm:text-base">Starter</th>
                    <th className="text-center p-4 sm:p-6 font-semibold text-sm sm:text-base text-primary">Pro</th>
                    <th className="text-center p-4 sm:p-6 font-semibold text-sm sm:text-base text-primary">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="p-4 sm:p-6 font-medium text-sm sm:text-base">{row.feature}</td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-muted-foreground">{row.free}</td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-muted-foreground">{row.starter}</td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-primary font-semibold">{row.pro}</td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-primary font-semibold">{row.custom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-12 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Trusted by Content Creators Worldwide</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Join thousands of creators who've automated their content workflow</p>
          
          {/* Placeholder logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-60">
            {['TechCrunch', 'Medium', 'Substack', 'WordPress', 'Ghost'].map((logo, index) => (
              <div key={index} className="text-muted-foreground font-semibold text-base sm:text-lg">
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