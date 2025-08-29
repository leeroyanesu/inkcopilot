import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Check, CreditCard, Globe2, Lock, ShieldCheck, Phone, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface PlanDetails {
  name: 'Starter' | 'Pro' | 'Custom'; // 'Starter', 'Pro', or 'Custom'
  price: string;
  period: string;
  posts?: number;
}

// Available payment methods
const paymentMethods = [
  // {
  //   id: 'card',
  //   name: 'Visa/Mastercard',
  //   icon: CreditCard,
  //   value: 'card',
  //   description: 'Pay securely with your credit or debit card'
  // },
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: Phone,
    value: 'mobile_money',
    description: 'Pay using your mobile wallet (EcoCash, OneMoney, Telecash)'
  },
];

// Billing periods
const billingPeriods = [
  { id: 'monthly', name: 'Monthly', discount: 0 },
  { id: 'annual', name: 'Annually', discount: 10 },
];

// Format credit card number with spaces and mask all but last 4 digits
const formatCreditCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format with spaces after every 4 digits
  let formattedValue = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' ';
    }
    formattedValue += digits[i];
  }
  
  return formattedValue;
};

// Format expiry date as MM/YY
const formatExpiryDate = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Add slash after 2 digits (MM/YY format)
  if (digits.length > 2) {
    return digits.substring(0, 2) + '/' + digits.substring(2, 4);
  }
  return digits;
};

// Format mobile phone number with spaces (7X XXX XXXX)
const formatMobileNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to exactly 9 digits
  const limitedDigits = digits.substring(0, 9);
  
  // Format based on number of digits
  if (limitedDigits.length <= 3) {
    return limitedDigits;
  } else if (limitedDigits.length <= 6) {
    return limitedDigits.substring(0, 3) + ' ' + limitedDigits.substring(3);
  } else {
    return limitedDigits.substring(0, 3) + ' ' + limitedDigits.substring(3, 6) + ' ' + limitedDigits.substring(6, 9);
  }
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = location.state?.plan as PlanDetails;

  const [formData, setFormData] = useState({
    // Customer Details
    firstName: '',
    lastName: '',
    email: '',

    // Billing Options
    billingPeriod: 'monthly',
    paymentMethod: 'mobile_money',

    // Payment Details for Card
    creditCardNumber: '',
    creditCardExpiryDate: '',
    creditCardSecurityNumber: '',

    // Mobile Money specific
    customerPhoneNumber: '',
  });
  
  // Payment status tracking
  const [paymentReferenceNumber, setPaymentReferenceNumber] = useState<string | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentTimeout, setPaymentTimeout] = useState<number | null>(null);
  
  // Display states for masked input fields
  const [displayCardNumber, setDisplayCardNumber] = useState('');
  const [displayExpiryDate, setDisplayExpiryDate] = useState('');
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');


  // Get price directly from plan object, matches backend pricing
  const getPlanPrice = () => {
    const planName = plan.name.includes('Starter') ? 'Starter' :
      plan.name.includes('Pro') ? 'Pro' :
        plan.name.includes('Custom') ? 'Custom' : 'Starter';

    if (planName === 'Starter') return 5;
    if (planName === 'Pro') return 8.99;
    if (planName === 'Custom' && plan.posts) {
      // Calculate custom price based on posts (same as backend logic)
      const basePosts = 60;
      const basePrice = 8.99;

      if (plan.posts <= basePosts) {
        return basePrice;
      } else {
        const extraPosts = plan.posts - basePosts;
        const extraBatches = Math.ceil(extraPosts / 30);
        const pricePerPost = 0.15;
        const discountedRate = pricePerPost * 0.9;
        const extraCost = extraBatches * 30 * discountedRate;
        return parseFloat((basePrice + extraCost).toFixed(2));
      }
    }
    return parseFloat(plan.price.replace('$', ''));
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">No Plan Selected</h2>
              <p className="text-muted-foreground">Please select a plan from our pricing page.</p>
              <Button onClick={() => navigate('/pricing')} className="mt-4">
                View Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // React Query mutation for handling payment submission
  const paymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await api.post('/api/billing/payment/direct', paymentData);
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful payment initiation
      if (data.success) {
        // Store reference number for status checking
        setPaymentReferenceNumber(data.referenceNumber);
        
        toast({
          title: "Payment Initiated",
          description: "Your payment has been initiated. We are checking the status...",
          variant: "default"
        });
        
        // Start payment status checking
        setIsCheckingPayment(true);
        
        // Start a timeout to automatically cancel if verification takes too long
        const startTime = Date.now();
        setPaymentTimeout(startTime);
      }
    },
    onError: (error: any) => {
      // Handle payment errors
      console.error('Payment initiation error:', error);

      toast({
        title: "Error",
        description: error.response?.data?.error || error.message || "Payment failed. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  // Query to check payment status
  const paymentStatusQuery = useQuery({
    queryKey: ['paymentStatus', paymentReferenceNumber],
    queryFn: async () => {
      if (!paymentReferenceNumber) return null;
      const response = await api.get(`/api/billing/payment/status/${paymentReferenceNumber}`);
      return response.data;
    },
    enabled: !!paymentReferenceNumber && isCheckingPayment,
    refetchInterval: (data: any) => {
      // If payment is verified (paid), stop polling
      if (data?.paid) {
        setIsCheckingPayment(false);
        setPaymentVerified(true);
        return false;
      }
      // Continue polling every 3 seconds until payment is verified
      return 3000;
    }
  });
  
  // Use effect to handle payment status changes
  useEffect(() => {
    const data = paymentStatusQuery.data;
    if (data?.paid) {
      // Payment is successful
      toast({
        title: "Payment Successful",
        description: "Your payment has been verified. Redirecting to dashboard...",
        variant: "default"
      });
      
      // Set payment as verified
      setPaymentVerified(true);
      
      // Clear the timeout since payment is verified
      setPaymentTimeout(null);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [paymentStatusQuery.data, toast, navigate, paymentTimeout]);
  
  // Handle errors
  useEffect(() => {
    if (paymentStatusQuery.isError) {
      setIsCheckingPayment(false);
      
      // Clear the timeout on error
      setPaymentTimeout(null);
      
      toast({
        title: "Payment Verification Failed",
        description: "We couldn't verify your payment. Please contact support.",
        variant: "destructive"
      });
    }
  }, [paymentStatusQuery.isError, toast, paymentTimeout]);
  
  // Payment verification timeout effect
  useEffect(() => {
    // Debug log
    console.log('Timeout Effect', { isCheckingPayment, paymentReferenceNumber, paymentTimeout });
    
    // Only run this effect if we're checking payment and have both a reference number and timeout
    if (isCheckingPayment && paymentReferenceNumber && paymentTimeout) {
      const checkTimeoutInterval = setInterval(() => {
        // If 15 seconds have passed since the timeout was set
        if (Date.now() - paymentTimeout >= 15000) {
          clearInterval(checkTimeoutInterval);
          
          // Only proceed if we're still checking payment (to avoid race conditions)
          if (isCheckingPayment) {
            setIsCheckingPayment(false);
            
            // Call the backend to cancel the payment and clean up records
            console.log('Cancelling payment with reference:', paymentReferenceNumber);
            api.delete(`/api/billing/payment/cancel/${paymentReferenceNumber}`)
              .then(() => {
                toast({
                  title: "Payment Verification Timeout",
                  description: "Payment verification timed out. The payment has been cancelled. Please try again.",
                  variant: "destructive"
                });
              })
              .catch((error) => {
                console.error('Failed to cancel payment:', error);
                toast({
                  title: "Payment Verification Failed",
                  description: "Payment verification timed out and we couldn't cancel the pending transaction. Please contact support.",
                  variant: "destructive"
                });
              });
          }
        }
      }, 1000); // Check every second
      
      return () => clearInterval(checkTimeoutInterval);
    }
  }, [isCheckingPayment, paymentReferenceNumber, paymentTimeout, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert plan details to backend format
    const planName = plan.name.includes('Starter') ? 'Starter' :
      plan.name.includes('Pro') ? 'Pro' :
        plan.name.includes('Custom') ? 'Custom' : 'Starter';

    // Prepare customer name
    const customerName = `${formData.firstName} ${formData.lastName}`.trim();

    // Prepare payment data
    const paymentData = {
      ...formData,
      planName,
      customerName,
      ...(planName === 'Custom' ? { postsLimit: plan.posts } : {})
    };
    delete paymentData.firstName;
    delete paymentData.lastName;
    delete paymentData.billingPeriod;
    // Execute the mutation with the payment data

    if(paymentData.paymentMethod === 'mobile_money'){
      delete paymentData.creditCardNumber;
      delete paymentData.creditCardExpiryDate;
      delete paymentData.creditCardSecurityNumber;
    }

    paymentMutation.mutate(paymentData);
  };


  return (
    <div className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/pricing')}
          className="mb-6 sm:mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pricing
        </Button>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Complete Purchase</h1>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  className="grid gap-3 sm:gap-4"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 rounded-lg border p-3 sm:p-4 cursor-pointer hover:border-primary">
                      <RadioGroupItem value={method.value} id={method.id} />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <method.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-medium text-sm sm:text-base">{method.name}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{method.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* {formData.paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in-0">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      maxLength={19} // 16 digits + 3 spaces
                      value={displayCardNumber}
                      onChange={(e) => {
                        const formatted = formatCreditCardNumber(e.target.value);
                        setDisplayCardNumber(formatted);
                        // Store only digits in actual formData for submission
                        setFormData({ 
                          ...formData, 
                          creditCardNumber: formatted.replace(/\s/g, '') 
                        });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        required
                        placeholder="MM/YY"
                        inputMode="numeric"
                        maxLength={5} // MM/YY format (5 chars)
                        value={displayExpiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setDisplayExpiryDate(formatted);
                          // Store formatted value in formData
                          setFormData({ 
                            ...formData, 
                            creditCardExpiryDate: formatted 
                          });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        required
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        className="w-full"
                        value={formData.creditCardSecurityNumber}
                        onChange={(e) => setFormData({ ...formData, creditCardSecurityNumber: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )} */}

              {formData.paymentMethod === 'mobile_money' && (
                <div className="space-y-4 animate-in fade-in-0">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                    <div className="flex">
                      <div className="bg-muted px-2 sm:px-3 py-2 border border-r-0 rounded-l-md text-muted-foreground text-sm sm:text-base">
                        +263
                      </div>
                      <Input
                        id="mobileNumber"
                        required
                        type="tel"
                        inputMode="numeric"
                        className="rounded-l-none"
                        placeholder="7XX XXX XXX"
                        maxLength={11} // 9 digits + 2 spaces (7XX XXX XXX)
                        value={displayPhoneNumber}
                        onChange={(e) => {
                          const formatted = formatMobileNumber(e.target.value);
                          setDisplayPhoneNumber(formatted);
                          // Store only digits in actual formData for submission
                          const digits = formatted.replace(/\s/g, '');
                          // Ensure exactly 9 digits for valid phone number
                          const isValid = digits.length === 9;
                          setFormData({ 
                            ...formData, 
                            customerPhoneNumber: isValid ? digits : ''
                          });
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      You will receive a prompt on your phone to complete the payment
                    </p>
                    {formData.customerPhoneNumber === '' && displayPhoneNumber !== '' && (
                      <p className="text-xs text-red-500 mt-1">
                        Please enter exactly 9 digits for a valid mobile number
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Status */}
              {paymentMutation.isPending && (
                <div className="py-4 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-sm font-medium">Processing payment...</p>
                    <p className="text-xs text-muted-foreground">Please wait while we process your payment</p>
                  </div>
                </div>
              )}
              
              {/* Payment Verification Status */}
              {isCheckingPayment && paymentReferenceNumber && (
                <div className="py-4 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-sm font-medium">Verifying payment...</p>
                    <p className="text-xs text-muted-foreground">
                      {formData.paymentMethod === 'mobile_money' 
                        ? "Please confirm the payment on your mobile device" 
                        : "Please wait while we verify your payment"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Reference: {paymentReferenceNumber}</p>
                  </div>
                </div>
              )}
              
              {/* Payment Verified */}
              {paymentVerified && (
                <div className="py-4 text-center bg-green-50 rounded-lg">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Check className="h-6 w-6 text-green-500" />
                    <p className="text-sm font-medium text-green-700">Payment Successful!</p>
                    <p className="text-xs text-green-600">
                      Your subscription has been activated. Redirecting to dashboard...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Messages */}
              {paymentMutation.isError && (
                <div className="p-4 bg-destructive/10 rounded-lg text-destructive text-center">
                  <p className="text-sm font-medium">
                    {(paymentMutation.error as any)?.response?.data?.error ||
                      (paymentMutation.error as Error)?.message ||
                      "Payment failed. Please try again."}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={paymentMutation.isPending || isCheckingPayment || paymentVerified}
              >
                {paymentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isCheckingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : paymentVerified ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Payment Verified
                  </>
                ) : (
                  'Complete Purchase'
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:order-2">
            <Card className="lg:sticky lg:top-24">
              <CardHeader className="py-4 sm:py-6">
                <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{plan.name} Plan</h3>
                    {plan.posts && (
                      <p className="text-sm text-muted-foreground">{plan.posts} posts per month</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${getPlanPrice()}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium">Features included:</p>
                  <ul className="space-y-1">
                    {plan.name.includes('Starter') && (
                      <>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Basic AI Writing
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Up to 30 posts per month
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Blog & Social Content
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Email Support
                        </li>
                      </>
                    )}

                    {plan.name.includes('Pro') && (
                      <>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Advanced AI Writing
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Up to 60 posts per month
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Blog, Social & News Content
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> SEO Optimization
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Priority Support
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> WordPress Integration
                        </li>
                      </>
                    )}

                    {plan.name.includes('Custom') && (
                      <>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Enterprise AI Writing
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Custom post volume
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> All Content Types
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Advanced SEO Optimization
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Dedicated Support
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Custom Integrations
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" /> Custom AI Training
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4" /> SSL Security
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4" /> Instant access
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4" /> Cancel anytime
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4" /> 14-day money-back guarantee
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>${getPlanPrice()}/month</span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    Billed monthly. Includes all applicable taxes.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <p className="text-muted-foreground">
                    A detailed invoice will be sent to {formData.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
