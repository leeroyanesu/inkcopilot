import api from '../api';

export interface PostMetadata {
    keywords?: string[];
    description?: string;
    category?: string;
    tags?: string[];
}

export interface WordPressInfo {
    postId?: number;
    url?: string;
    status?: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    type: 'news' | 'post' | 'article';
    status: 'draft' | 'published' | 'scheduled';
    wordCount?: number;
    seoScore?: number;
    readabilityScore?: number;
    publishedAt?: Date;
    scheduledFor?: Date;
    metadata?: PostMetadata;
    wordpress?: WordPressInfo;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostsResponse {
    posts: Post[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    counts: {
        articles: number;
        news: number;
        posts: number;
    };
}

export interface PostFilters {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
}

export const getPosts = async (filters: PostFilters = {}): Promise<PostsResponse> => {
    const { data } = await api.get<PostsResponse>('/api/posts', { params: filters });
    return data;
};

export const getPost = async (id: string): Promise<Post> => {
    const { data } = await api.get<Post>(`/api/posts/${id}`);
    return data;
};

export const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
    const { data } = await api.post<Post>('/api/posts', postData);
    return data;
};

export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post> => {
    const { data } = await api.put<Post>(`/api/posts/${id}`, postData);
    return data;
};

export const deletePost = async (id: string): Promise<void> => {
    await api.delete(`/api/posts/${id}`);
};
