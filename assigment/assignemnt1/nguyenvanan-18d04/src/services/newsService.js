import apiClient from './apiClient';

const API_ENDPOINT = '/api/news';

const newsService = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINT);
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
  create: async (newsData) => {
    const response = await apiClient.post(API_ENDPOINT, newsData);
    return response.data;
  },
  update: async (id, newsData) => {
    const response = await apiClient.put(`${API_ENDPOINT}/${id}`, newsData);
    return response.data;
  },
  remove: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
};

export default newsService;