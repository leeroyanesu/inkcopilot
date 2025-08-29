import api from '../api';

export interface UserBilling {
    address?: string;
    cardLast4?: string;
    cardBrand?: string;
    cardExpiry?: string;
}

export interface UserSubscription {
    plan: 'Free' | 'Starter' | 'Pro' | 'Custom';
    status: 'active' | 'cancelled' | 'past_due';
    startDate?: Date;
    endDate?: Date;
    price?: number;
    postsLimit?: number;
    tokenLimit?: number;
    features: string[];
}

export interface User {
    id: string;
    email: string;
    fullNames: string;
    phone?: string;
    company?: string;
    role?: string;
    avatar?: string;
    subscription: UserSubscription;
    billing?: UserBilling;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsageStats {
    postsUsed: number;
    tokensUsed: number;
    period: {
        start: Date;
        end: Date;
    };
}

export interface SubscriptionResponse {
    subscription: UserSubscription;
    usage: UsageStats;
}

export interface UpdateProfileData {
    fullNames?: string;
    phone?: string;
    company?: string;
    role?: string;
    avatar?: string;
}

export interface UpdateBillingData {
    address: string;
}

export const getProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/account/profile',);
    return data;
};

export const updateProfile = async (profileData: UpdateProfileData): Promise<User> => {
    const { data } = await api.put<User>('/api/account/profile', profileData);
    return data;
};

export const updateBilling = async (billingData: UpdateBillingData): Promise<User> => {
    const { data } = await api.put<User>('/api/account/billing', billingData);
    return data;
};

export const getSubscription = async (): Promise<SubscriptionResponse> => {
    const { data } = await api.get<SubscriptionResponse>('/api/account/subscription');
    return data;
};
