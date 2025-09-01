import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Health check
  getHealth: () => api.get('/health'),
  
  // Profile endpoints
  getProfile: () => api.get('/profile'),
  createProfile: (data) => api.post('/profile', data),
  updateProfile: (data) => api.put('/profile', data),
  
  // Projects endpoints
  getProjects: (params = {}) => api.get('/projects', { params }),
  getProject: (id) => api.get(`/projects/${id}`),
  
  // Search endpoint
  searchProjects: (query, params = {}) => api.get('/search', { 
    params: { q: query, ...params } 
  }),
  
  // Skills endpoints
  getSkills: (params = {}) => api.get('/skills', { params }),
  getSkillCategories: () => api.get('/skills/categories'),
};

export default api;


