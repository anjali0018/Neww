import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear local storage and redirect to login
          if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.error('Session expired. Please login again.');
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(error.response.data?.error || 'An error occurred');
      }
    } else if (error.request) {
      toast.error('Cannot connect to server. Please check your internet connection.');
    } else {
      toast.error('An error occurred');
    }
    return Promise.reject(error);
  }
);

// Auth services
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

// Job services
export const jobService = {
  getAllJobs: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/jobs${params ? `?${params}` : ''}`);
    return response.data;
  },
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
  getRecruiterJobs: async () => {
    const response = await api.get('/jobs/recruiter/myjobs');
    return response.data;
  }
};

// Application services
export const applicationService = {
  applyForJob: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },
  getMyApplications: async () => {
    const response = await api.get('/applications/my-applications');
    return response.data;
  },
  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status`, { status });
    return response.data;
  }
};

// Stats services
export const statsService = {
  getRecruiterStats: async () => {
    const response = await api.get('/stats/recruiter');
    return response.data;
  },
  getApplicantStats: async () => {
    const response = await api.get('/stats/applicant');
    return response.data;
  }
};

export default api;