import apiClient from '../../core/api/apiClient';
import { API_ENDPOINTS } from '../../core/constants';

const customerService = {
  getAll: async () => {
    return await apiClient.get(API_ENDPOINTS.CUSTOMERS.BASE);
  },

  getById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.CUSTOMERS.DETAIL(id));
  },

  create: async (customerData) => {
    return await apiClient.post(API_ENDPOINTS.CUSTOMERS.BASE, customerData);
  },

  update: async (id, customerData) => {
    return await apiClient.put(API_ENDPOINTS.CUSTOMERS.DETAIL(id), customerData);
  },

  delete: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.CUSTOMERS.DETAIL(id));
  },
};

export default customerService;
