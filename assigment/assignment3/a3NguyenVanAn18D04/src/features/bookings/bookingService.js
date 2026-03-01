import apiClient from '../../core/api/apiClient';
import { API_ENDPOINTS } from '../../core/constants';

const bookingService = {
  getAll: async () => {
    return await apiClient.get(API_ENDPOINTS.BOOKINGS.BASE);
  },

  getById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.BOOKINGS.DETAIL(id));
  },

  getDetails: async (bookingId) => {
    return await apiClient.get(API_ENDPOINTS.BOOKINGS.DETAILS(bookingId));
  },

  getByCustomer: async (customerId) => {
    return await apiClient.get(API_ENDPOINTS.BOOKINGS.BY_CUSTOMER(customerId));
  },

  create: async (bookingData) => {
    return await apiClient.post(API_ENDPOINTS.BOOKINGS.BASE, bookingData);
  },

  update: async (id, bookingData) => {
    return await apiClient.put(API_ENDPOINTS.BOOKINGS.DETAIL(id), bookingData);
  },

  updateStatus: async (id, status) => {
    return await apiClient.put(API_ENDPOINTS.BOOKINGS.UPDATE_STATUS(id), { status });
  },
};

export default bookingService;
