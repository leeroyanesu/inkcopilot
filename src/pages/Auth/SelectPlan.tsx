import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star } from "lucide-react";

const plans = [
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
    cta: "Choose Pro",
    popular: true,
    highlight: "Most Popular"
  }
];

const SelectPlan = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    navigate('/checkout', {
      state: { 
        plan: {
          name: plan.name,
          price: plan.price,
          period: plan.period
        },
        fromLogin: true
      }
    });
  };

  return (
    <div className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a plan that fits your needs to start creating amazing content
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-glow p-6 rounded-xl relative ${
                plan.popular ? 'ring-2 ring-primary shadow-elegant' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "default" : "outline"} 
                size="lg" 
                className="w-full"
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Custom Plan */}
          <div className="card-glow p-6 rounded-xl relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Custom</h3>
              <p className="text-sm text-muted-foreground mb-4">Tailored for enterprise content creators</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gradient">Custom</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Custom number of posts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Unlimited publishing jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Unlimited custom posts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">All AI models included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Premium integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Dedicated account manager</span>
              </li>
            </ul>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/contact-sales')}
            >
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
