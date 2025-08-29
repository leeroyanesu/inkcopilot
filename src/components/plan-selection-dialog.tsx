import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Star } from "lucide-react"

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
]

interface PlanSelectionDialogProps {
  open: boolean
}

export function PlanSelectionDialog({ open }: PlanSelectionDialogProps) {
  const navigate = useNavigate()

  // Prevent closing the dialog by clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') e.preventDefault()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

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
    })
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Plan</DialogTitle>
          <DialogDescription className="text-center">
            Select a plan to get started with InkCopilot
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-6 mt-6">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
