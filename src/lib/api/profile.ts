import api from '../api';

export interface Profile {
  id: string;
  email: string;
  fullNames: string;
  phone?: string;
  company?: string;
  role?: string;
  avatar?: string;
  subscription?: {
    plan: 'Free' | 'Starter' | 'Pro' | 'Custom';
    status: 'active' | 'cancelled' | 'past_due';
    startDate?: Date;
    endDate?: Date;
    price?: number;
    postsLimit?: number;
    tokenLimit?: number;
    features: string[];
  };
  billing?: {
    address?: string;
    cardLast4?: string;
    cardBrand?: string;
    cardExpiry?: string;
  };
}

export interface UpdateProfileData {
  fullNames?: string;
  phone?: string;
  company?: string;
  role?: string;
  avatar?: string;
}

export interface UsageData {
  postsUsed: number;
  tokensUsed: number;
  period: {
    start: Date;
    end: Date;
  };
}

export interface SubscriptionResponse {
  subscription: Profile['subscription'];
  usage: UsageData;
}

export const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get<Profile>('/api/profile');
  return data;
};

export const updateProfile = async (profileData: UpdateProfileData): Promise<Profile> => {
  const { data } = await api.put<Profile>('/api/profile', profileData);
  return data;
};

export const updateBilling = async (billingData: { address: string }): Promise<Profile> => {
  const { data } = await api.put<Profile>('/api/profile/billing', billingData);
  return data;
};

export const getSubscription = async (): Promise<SubscriptionResponse> => {
  const { data } = await api.get<SubscriptionResponse>('/api/profile/subscription');
  return data;
};
