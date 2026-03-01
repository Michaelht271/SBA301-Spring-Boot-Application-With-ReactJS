import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useBookings } from '../../features/bookings/useBookings';
import { useRooms } from '../../features/rooms/useRooms';
import customerService from '../../features/customers/customerService';
import BookingTable from '../../features/bookings/components/BookingTable';
import BookingDetailModal from '../../features/bookings/components/BookingDetailModal';
import BookingFormModal from '../../features/bookings/components/BookingFormModal';
import { ROLES } from '../../core/constants';

const { Title } = Typography;

const BookingsPage = () => {
  const { bookings, loading, fetchAllBookings, fetchBookingDetails, createBooking, updateBooking, updateBookingStatus } = useBookings();
  const { rooms, fetchRooms } = useRooms();
  const [customers, setCustomers] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    fetchAllBookings();
    fetchRooms();
    fetchCustomers();
  }, [fetchAllBookings, fetchRooms]);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch customers', error);
      setCustomers([]);
    }
  };

  const handleAdd = () => {
    setEditingBooking(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingBooking(record);
    setIsFormOpen(true);
  };

  const handleFormFinish = async (values) => {
    try {
      if (editingBooking) {
        await updateBooking(editingBooking.bookingReservationID, values);
        message.success('Booking updated successfully');
      } else {
        await createBooking(values);
        message.success('Booking created successfully');
      }
      setIsFormOpen(false);
    } catch (error) {
      message.error(error.message || 'Failed to save booking');
    }
  };

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

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      message.success(`Booking ${status} successfully`);
      if (viewingBooking && viewingBooking.bookingReservationID === id) {
        setViewingBooking({...viewingBooking, bookingStatus: status});
      }
    } catch (error) {
      message.error('Failed to update status', error    );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Booking Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large" 
          onClick={handleAdd}
          style={{ borderRadius: '8px' }}
        >
          Add New Booking
        </Button>
      </div>

      <BookingTable 
        bookings={bookings} 
        loading={loading} 
        onDetail={handleView}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange} 
        userRole={ROLES.STAFF} 
      />

      <BookingDetailModal 
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        booking={viewingBooking}
        userRole={ROLES.STAFF}
        onStatusChange={handleStatusChange}
      />

      <BookingFormModal 
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        onFinish={handleFormFinish}
        editingBooking={editingBooking}
        loading={loading}
        rooms={rooms}
        customers={customers}
      />
    </div>
  );
};

export default BookingsPage;
