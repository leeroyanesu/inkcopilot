import api from '../api';

export interface TrendingTopic {
    topic: string;
    category: string;
    trend: string;
}

export interface TopContent {
    title: string;
    views: string;
    engagement: string;
    publishDate: string;
}

export interface AnalyticsResponse {
    trendingTopics: TrendingTopic[];
    topContent: TopContent[];
}

export const getAnalytics = async (days: number = 30): Promise<AnalyticsResponse> => {
    const { data } = await api.get<AnalyticsResponse>('/analytics', {
        params: { days }
    });
    return data;
};
