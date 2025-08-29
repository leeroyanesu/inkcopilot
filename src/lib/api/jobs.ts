import api from '../api';

export interface JobStats {
  activeJobs: number;
  totalJobs: number;
  newsGenerated: number;
  postsGenerated: number;
  articlesGenerated: number;
}

export interface Job {
  _id: string;
  title: string;
  type: 'news' | 'post' | 'article';
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  config:{
    aiModel:string;
    maxWordCount:number;
    category:string;
    schedule:string;
    targetWebsite:string;
    sources:string[];
  };
  createdAt: Date;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: JobStats;
}

export interface JobsParams {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  search?: string;
}

export const getJobs = async (): Promise<JobsResponse> => {
  const { data } = await api.get<JobsResponse>('/api/jobs');
  return data;
};

export const createJob = async (jobData: any) => {
  const { data } = await api.post<Job>('/api/jobs', jobData);
  return data;
};
