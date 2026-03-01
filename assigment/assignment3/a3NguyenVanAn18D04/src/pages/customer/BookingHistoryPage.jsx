import React, { useEffect, useState } from 'react';
import { Typography, message, Divider } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useBookings } from '../../features/bookings/useBookings';
import { useAuth } from '../../core/auth/useAuth';
import BookingTable from '../../features/bookings/components/BookingTable';
import BookingDetailModal from '../../features/bookings/components/BookingDetailModal';
import { ROLES } from '../../core/constants';

const { Title, Text } = Typography;

const BookingHistoryPage = () => {
  const { user } = useAuth();
  const { bookings, loading, fetchCustomerBookings, fetchBookingDetails, cancelBooking } = useBookings();
  const [viewingBooking, setViewingBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const customerID = user?.customerID || user?.customerId || user?.id;
    if (customerID) {
      fetchCustomerBookings(customerID);
    }
  }, [user, fetchCustomerBookings]);

  const handleView = async (record) => {
    try {
      const details = await fetchBookingDetails(record.bookingReservationID);
      // Merge summary info with details from API
      setViewingBooking({ ...record, bookingDetails: Array.isArray(details) ? details : [details] });
      setIsDetailOpen(true);
    } catch (error) {
      message.error('Could not fetch booking details');
      // Fallback to basic info if API fails
      setViewingBooking(record);
      setIsDetailOpen(true);
    }
  };

  const handleCancel = async (id) => {
    try {
      const customerID = user?.customerID || user?.customerId || user?.id;
      await cancelBooking(id, customerID);
      message.success('Booking cancelled successfully');
      if (viewingBooking && (viewingBooking.bookingReservationID === id || viewingBooking.bookingReservationId === id)) {
        setViewingBooking({ ...viewingBooking, bookingStatus: 'Cancelled' });
      }
    } catch (error) {
      message.error(error.message || 'Failed to cancel booking');
    }
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}><BookOutlined /> My Booking History</Title>
          <Text type="secondary">Review your previous and upcoming stays at FUMiniHotel</Text>
        </div>
      </div>

      <Divider />

      <BookingTable 
        bookings={bookings} 
        loading={loading} 
        onDetail={handleView} 
        userRole={ROLES.CUSTOMER} 
      />

      <BookingDetailModal 
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        booking={viewingBooking}
        userRole={ROLES.CUSTOMER}
        onStatusChange={handleCancel}
      />
    </div>
  );
};

export default BookingHistoryPage;
