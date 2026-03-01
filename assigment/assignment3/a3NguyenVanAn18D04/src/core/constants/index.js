export const API_BASE_URL = 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me', // Base URL already has /v1. So this is /api/v1/auth/me
  },
  ROOMS: {
    BASE: '/rooms',
    DETAIL: (id) => `/rooms/${id}`,
  },
  ROOM_TYPES: {
    BASE: '/room-types',
  },
  CUSTOMERS: {
    BASE: '/customers',
    DETAIL: (id) => `/customers/${id}`,
  },
  BOOKINGS: {
    BASE: '/bookings',
    DETAIL: (id) => `/bookings/${id}`,
    DETAILS: (id) => `/booking-detail/${id}`, // New endpoint to get booking detail items
    BY_CUSTOMER: (customerId) => `/bookings/customer/${customerId}`,
    UPDATE_STATUS: (id) => `/bookings/${id}/status`,
  },
};

export const ROLES = {
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
};

export const ROOM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  INACTIVE: 'INACTIVE'
};

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  CANCELLED: 'CANCELLED',
};
