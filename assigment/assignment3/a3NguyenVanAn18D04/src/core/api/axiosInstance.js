import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Don't add token for login/register requests
    const isPublicAuth = config.url.includes(API_ENDPOINTS.AUTH.LOGIN) || config.url.includes(API_ENDPOINTS.AUTH.REGISTER);
    
    if (!isPublicAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error in console for debugging (helpful for 403)
    console.error(`API Error [${error.response?.status}]:`, error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
