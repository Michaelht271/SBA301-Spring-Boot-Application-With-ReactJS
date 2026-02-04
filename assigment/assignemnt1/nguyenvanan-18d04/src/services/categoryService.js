import apiClient from './apiClient';

const API_ENDPOINT = '/api/categories';

const categoryService = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINT);
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
  create: async (categoryData) => {
    const response = await apiClient.post(API_ENDPOINT, categoryData);
    return response.data;
  },
  update: async (id, categoryData) => {
    const response = await apiClient.put(`${API_ENDPOINT}/${id}`, categoryData);
    return response.data;
  },
  remove: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
};

export default categoryService;