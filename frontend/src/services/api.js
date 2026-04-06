import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://smart-recruit-backend-cvr2.onrender.com/api';

console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error Data:', error.response?.data);
    console.log('API Error Status:', error.response?.status);
    console.log('API Error URL:', `${error.config?.baseURL}${error.config?.url}`);

    if (error.response) {
      toast.error(error.response.data?.error || 'Request failed');
    } else if (error.request) {
      toast.error('Cannot connect to server');
    } else {
      toast.error('An error occurred');
    }

    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default api;