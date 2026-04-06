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

export const jobService = {
  getAllJobs: async () => {
    const response = await api.get('/jobs');
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
  getRecruiterJobs: async () => {
    const response = await api.get('/jobs/recruiter/myjobs');
    return response.data;
  },
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  }
};

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