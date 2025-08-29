import api from '../api';

export interface DashboardStats {
  totalPosts: number;
  activeJobs: number;
  averageTime: string;
  averageSeoScore: number;
  seoPerformance: {
    keywordOptimization: number;
    contentQuality: number;
    readability: number;
  };
  recentJobs: Array<{
    _id: string;
    title: string;
    status: 'queued' | 'running' | 'completed' | 'failed';
    type: 'news' | 'post' | 'article';
    createdAt: Date;
    config: {
      aiModel: string;
      maxWordCount: number;
      category: string;
      schedule: string;
      targetWebsite: string;
      sources: string[];
    };
    progress: number;
  }>;
  postsOverview: {
    dates: string[];
    posts: number[];
  };
  subscription:{
    plan: string;
    status: string;
  }
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get<DashboardStats>('/api/dashboard/stats');
  return data;
};
