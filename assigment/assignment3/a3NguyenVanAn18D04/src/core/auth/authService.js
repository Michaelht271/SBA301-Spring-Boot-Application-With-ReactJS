import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../constants';

const authService = {
  login: async (credentials) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (userData) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  getMe: async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH.ME);
  },
};

export default authService;
