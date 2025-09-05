import api from "../api"

export interface BillingPlan {
  plan: string
  price: string
  interval: string
  nextBilling: string
  status: string
  postsLimit?: number
  features?: string[]
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

export interface UpdateCardData {
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
}

export interface ChangePlanData {
  planName: 'Starter' | 'Pro' | 'Custom'
  postsLimit?: number
}

export interface BillingResponse {
  currentPlan: BillingPlan
  paymentMethod: PaymentMethod
  transactions: Transaction[]
}

export interface UsageStats {
  postsUsed: number
  tokensUsed: number
  period: {
    start: string
    end: string
  }
}

// API functions
export const getCurrentPlan = () => 
  api.get<BillingPlan>('/api/billing/plan')

export const getPaymentMethod = () => 
  api.get<PaymentMethod>('/api/billing/payment-method')

export const getTransactions = () => 
  api.get<Transaction[]>('/api/billing/transactions')

export const updatePaymentMethod = (data: UpdateCardData) => 
  api.post('/api/billing/payment-method', data)

export const changePlan = async (data: ChangePlanData) => {
  try {
    const response = await api.post('/api/billing/change-plan', data)
    return response.data
  } catch (error: any) {
    if (error.response?.data) {
      const { error: errorType, message, nextBillingDate } = error.response.data
      throw {
        error: errorType,
        message,
        nextBillingDate: nextBillingDate ? new Date(nextBillingDate) : undefined
      }
    }
    throw error
  }
}

export const getBillingDetails = async () => {
  const [plan, paymentMethod, transactions] = await Promise.all([
    getCurrentPlan(),
    getPaymentMethod(),
    getTransactions()
  ])

  return {
    currentPlan: plan.data,
    paymentMethod: paymentMethod.data,
    transactions: transactions.data
  }
}

export const getSubscriptionWithUsage = () => 
  api.get<{ subscription: BillingPlan; usage: UsageStats }>('/api/profile/subscription')
