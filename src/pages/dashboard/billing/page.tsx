import * as React from "react"
import { 
  ArrowRight, 
  CalendarDays,
  Check, 
  CreditCard, 
  Download,
  PlusCircle, 
  Star 
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InvoiceViewer } from "@/components/invoice-viewer"

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
    cta: "Choose Custom",
    popular: true,
    highlight: "Most Popular"
  }
]

const comparisonFeatures = [
  { feature: "Posts per month", free: "2 (trial)", starter: "30", pro: "60", custom: "60+" },
  { feature: "Publishing jobs per day", free: "1", starter: "5", pro: "20", custom: "20+" },
  { feature: "Custom posts per day", free: "0", starter: "3", pro: "15", custom: "15+" },
  { feature: "Active automation jobs", free: "0", starter: "2", pro: "10", custom: "10+" },
  { feature: "AI Models", free: "Basic", starter: "GPT-4", pro: "GPT-4 + Claude", custom: "All Models" },
  { feature: "News Integration", free: "❌", starter: "❌", pro: "✅", custom: "✅" },
  { feature: "WordPress Integration", free: "❌", starter: "Basic", pro: "Advanced", custom: "Premium" },
  { feature: "Support", free: "Community", starter: "Email", pro: "Priority + Chat", custom: "Dedicated Support" }
]

const updateCardSchema = z.object({
  cardName: z.string().min(2, "Card name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
})

type UpdateCardFormData = z.infer<typeof updateCardSchema>

export interface BillingPlan {
  name: string
  price: string
  interval: string
  nextBilling: string
  status: string
}

export interface PaymentMethod {
  type: string
  last4: string
  expiry: string
}

export interface Transaction {
  id: string
  date: string
  amount: string
  status: string
  description: string
}

export interface BillingData {
  currentPlan: BillingPlan
  paymentMethod: PaymentMethod
  transactions: Transaction[]
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBillingDetails, updatePaymentMethod, changePlan, getSubscriptionWithUsage } from '@/lib/api/billing'
import type { UpdateCardData, ChangePlanData } from '@/lib/api/billing'
import { useToast } from '@/hooks/use-toast'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getDaysUntilNextBilling(nextBillingDate: string) {
  const today = new Date()
  const next = new Date(nextBillingDate)
  const diffTime = Math.abs(next.getTime() - today.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

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

export default function BillingPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [changePlanOpen, setChangePlanOpen] = React.useState(false)
  const [updateCardOpen, setUpdateCardOpen] = React.useState(false)
  const [customPosts, setCustomPosts] = React.useState([90]) // Start at 90 posts (60 + 30)
  
  // Fetch billing data
  const { data: billingData, isLoading: isLoadingBilling } = useQuery({
    queryKey: ['billing'],
    queryFn: getBillingDetails
  })

  // Fetch subscription with usage data
  const { data: subscriptionData } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscriptionWithUsage
  })

  // Update payment method mutation
  const updatePaymentMutation = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] })
      toast({
        title: 'Success',
        description: 'Payment method updated successfully',
      })
      setUpdateCardOpen(false)
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update payment method',
        variant: 'destructive'
      })
    }
  })


  // Change plan mutation
  const changePlanMutation = useMutation({
    mutationFn: changePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] })
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
      toast({
        title: 'Success',
        description: 'Plan updated successfully',
      })
      setChangePlanOpen(false)
    },
    onError: (error: any) => {
      if (error.error === 'Plan change restricted') {
        const nextBillingDate = error.nextBillingDate ? 
          formatDate(error.nextBillingDate) : 
          'the end of your billing cycle';
        
        toast({
          title: 'Plan Change Restricted',
          description: `You cannot change your plan until ${nextBillingDate}. Please wait until your current billing cycle ends.`,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Failed to change plan',
          variant: 'destructive'
        })
      }
    }
  })
  
  const form = useForm<UpdateCardFormData>({
    resolver: zodResolver(updateCardSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    }
  })

  async function onSubmitCard(data: UpdateCardFormData) {
    await updatePaymentMutation.mutateAsync(data)
    form.reset()
  }

  const handlePlanChange = async (planName: 'Starter' | 'Pro' | 'Custom') => {
    const data: ChangePlanData = {
      planName,
      ...(planName === 'Custom' && { postsLimit: customPosts[0] })
    }
    await changePlanMutation.mutateAsync(data)
  }

  if (isLoadingBilling) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading billing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Billing & Payments</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and view payment history
        </p>
      </div>

      <div className="grid gap-6">
        {/* Current Plan & Next Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  {billingData?.currentPlan?.nextBilling ? 
                    `Your subscription renews ${formatDate(billingData.currentPlan.nextBilling)}` :
                    'No active subscription'
                  }
                </CardDescription>
              </div>
              <Badge 
                variant="outline" 
                className="bg-primary/5 text-primary border-primary/20"
              >
                {billingData?.currentPlan?.plan || 'Free'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xl font-semibold">
                    ${billingData.currentPlan.price}/{billingData.currentPlan.interval}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Next billing in {getDaysUntilNextBilling(billingData.currentPlan.nextBilling)} days
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setChangePlanOpen(true)}
                  disabled={true}
                  title={getDaysUntilNextBilling(billingData.currentPlan.nextBilling) < 31 ? 
                    "Plan changes are only allowed at the end of your billing cycle" : 
                    "Change your plan"}
                >
                  Change Plan
                </Button>
              </div>

              <div className="flex items-start space-x-4 rounded-lg border p-4">
                <CreditCard className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Payment Method</p>
                  {billingData?.paymentMethod?.type === 'None' ? (
                    <p className="text-sm text-muted-foreground">
                      No payment method added
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {billingData?.paymentMethod?.type} ending in {billingData?.paymentMethod?.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {billingData?.paymentMethod?.expiry}
                      </p>
                    </>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setUpdateCardOpen(true)}
                  disabled={updatePaymentMutation.isPending}
                >
                  {updatePaymentMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
            <CardDescription>
              View all your past payments and invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingData?.transactions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  billingData?.transactions?.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.description}
                        <br />
                        <span className="text-sm text-muted-foreground">
                          {transaction.id}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={transaction.status === 'paid' ? 
                            "bg-green-50 text-green-700 border-green-200" :
                            "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <InvoiceViewer transaction={transaction} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Change Plan Dialog */}
      <Dialog open={changePlanOpen} onOpenChange={setChangePlanOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl text-center">Choose Your Plan</DialogTitle>
            <DialogDescription className="text-center">
              Plan changes are only allowed at the end of your billing cycle.
              Next billing date: {formatDate(billingData.currentPlan.nextBilling)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6 overflow-y-auto flex-grow pr-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        {plan.highlight}
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
                    onClick={() => handlePlanChange(plan.name as 'Starter' | 'Pro')}
                    disabled={
                      plan.name === billingData?.currentPlan?.plan ||
                      changePlanMutation.isPending
                    }
                  >
                    {plan.name === billingData?.currentPlan?.plan ? "Current Plan" : 
                      changePlanMutation.isPending ? "Updating..." : plan.cta}
                    {plan.name !== billingData?.currentPlan?.plan && !changePlanMutation.isPending && 
                      <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              ))}

              {/* Custom Plan */}
              <div className="card-glow p-6 rounded-xl relative">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Custom</h3>
                  <p className="text-sm text-muted-foreground mb-4">Tailored for enterprise content creators</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gradient">
                      ${calculateCustomPrice(customPosts[0]).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </div>

                {/* Posts Slider */}
                <div className="mb-6">
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

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{customPosts[0]} posts per month</span>
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
                  onClick={() => handlePlanChange('Custom')}
                  disabled={changePlanMutation.isPending}
                >
                  {changePlanMutation.isPending ? "Updating..." : "Choose Custom Plan"}
                  {!changePlanMutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-center mb-6">Feature Comparison</h3>
              <div className="rounded-xl overflow-hidden border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold text-sm">Feature</th>
                        <th className="text-center p-4 font-semibold text-sm">Starter</th>
                        <th className="text-center p-4 font-semibold text-sm text-primary">Pro</th>
                        <th className="text-center p-4 font-semibold text-sm text-primary">Custom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((row, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="p-4 font-medium text-sm">{row.feature}</td>
                          <td className="p-4 text-center text-sm text-muted-foreground">{row.starter}</td>
                          <td className="p-4 text-center text-sm text-primary font-semibold">{row.pro}</td>
                          <td className="p-4 text-center text-sm text-primary font-semibold">{row.custom}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <DialogDescription className="text-center mt-6 flex-shrink-0">
              These changes will take effect once the billing cycle date has been reached. 
              In the meantime, please check your usage and purchase additional credits as needed.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Card Dialog */}
      <Dialog open={updateCardOpen} onOpenChange={setUpdateCardOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Enter your new card details below
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCard)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="4242 4242 4242 4242" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Update Card</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
