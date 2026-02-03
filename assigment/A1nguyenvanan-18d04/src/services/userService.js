import apiClient from './apiClient';

const API_ENDPOINT = '/users';

const userService = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINT);
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
  create: async (userData) => {
    const response = await apiClient.post(API_ENDPOINT, userData);
    return response.data;
  },
  update: async (id, userData) => {
    const response = await apiClient.put(`${API_ENDPOINT}/${id}`, userData);
    return response.data;
  },
  remove: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
  // Add other user-specific methods if needed
};

export default userService;