import { useState, useCallback } from 'react';
import bookingService from "./bookingService.js";


export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getAll();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch all bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomerBookings = useCallback(async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getByCustomer(customerId);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch customer bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookingDetails = async (bookingId) => {
    setLoading(true);
    try {
      const data = await bookingService.getDetails(bookingId);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch booking details');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData, customerId) => {
    setLoading(true);
    try {
      const data = await bookingService.create(bookingData);
      if (customerId) {
        await fetchCustomerBookings(customerId);
      } else {
        await fetchAllBookings();
      }
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id, bookingData, customerId) => {
    setLoading(true);
    try {
      await bookingService.update(id, bookingData);
      if (customerId) {
        await fetchCustomerBookings(customerId);
      } else {
        await fetchAllBookings();
      }
    } catch (err) {
      setError(err.message || 'Failed to update booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status, customerId) => {
    setLoading(true);
    try {
      await bookingService.updateStatus(id, status);
      if (customerId) {
        await fetchCustomerBookings(customerId);
      } else {
        await fetchAllBookings();
      }
    } catch (err) {
      setError(err.message || 'Failed to update booking status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id, customerId) => {
    setLoading(true);
    try {
      await bookingService.updateStatus(id, 'Cancelled');
      if (customerId) {
        await fetchCustomerBookings(customerId);
      } else {
        await fetchAllBookings();
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    fetchAllBookings,
    fetchCustomerBookings,
    fetchBookingDetails,
    createBooking,
    updateBooking,
    updateBookingStatus,
    cancelBooking,
  };
};
