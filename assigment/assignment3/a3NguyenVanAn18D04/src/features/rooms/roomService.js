import apiClient from '../../core/api/apiClient';
import { API_ENDPOINTS } from '../../core/constants';

const roomService = {
  getAll: async () => {
    return await apiClient.get(API_ENDPOINTS.ROOMS.BASE);
  },

  getRoomTypes: async () => {
    return await apiClient.get(API_ENDPOINTS.ROOM_TYPES.BASE);
  },

  getById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.ROOMS.DETAIL(id));
  },

  create: async (roomData) => {
    return await apiClient.post(API_ENDPOINTS.ROOMS.BASE, roomData);
  },

  update: async (id, roomData) => {
    return await apiClient.put(API_ENDPOINTS.ROOMS.DETAIL(id), roomData);
  },

  delete: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.ROOMS.DETAIL(id));
  },
};

export default roomService;
