import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://inkcopilot-backend.vercel.app', // adjust this to match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  // Skip auth header for authentication endpoints
  const authEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password'];
  const isAuthEndpoint = authEndpoints.some(endpoint => config.url?.endsWith(endpoint));
  
  if (!isAuthEndpoint) {
    const authCookie = Cookies.get('inkcopilot_auth');
    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie);
        if (authData?.token) {
          config.headers.Authorization = `Bearer ${authData.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth cookie:', error);
      }
    }
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear the auth cookie
      Cookies.remove('inkcopilot_auth', { path: '/' });
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullNames: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
  register: async (userData: RegisterData) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
  forgotPassword: async (email: string) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },
  resetPassword: async ({ email, code, password }: { email: string, code: string, password: string }) => {
    const { data } = await api.post('/auth/reset-password', { email, code, password });
    return data;
  },
};

export default api;
