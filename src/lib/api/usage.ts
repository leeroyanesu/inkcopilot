import api from '../api';

export interface UsageStats {
  usedPosts: number;
  totalPosts: number;
  usagePercentage: number;
  remainingPosts: number;
  usageHistory: {
    date: string;
    count: number;
  }[];
}

export const UsageAPI = {
  getUsageStats: async (): Promise<UsageStats> => {
    const { data } = await api.get('/api/usage');
    return data;
  },
};
