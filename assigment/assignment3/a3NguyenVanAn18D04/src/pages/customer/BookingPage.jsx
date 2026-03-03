import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, DatePicker, Button, message, Divider, Space, Steps, Statistic, Empty, Alert, Descriptions } from 'antd';
import { ShoppingCartOutlined, CalendarOutlined, SolutionOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useRooms } from '../../features/rooms/useRooms';
import { useBookings } from '../../features/bookings/useBookings';
import { useAuth } from '../../core/auth/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { MAP_FORM_TO_BOOKING } from '../../features/bookings/booking.type';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { rooms, fetchRooms } = useRooms();
  const { createBooking, loading: bookingLoading } = useBookings();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (location.state?.roomID && rooms.length > 0) {
      const room = rooms.find(r => (r.roomID || r.roomId) === location.state.roomID);
      if (room && (room.roomStatus?.toUpperCase() === 'AVAILABLE')) {
        setSelectedRooms([{ ...room, dates: null }]);
      }
    }
  }, [location.state, rooms]);

  useEffect(() => {
    const total = selectedRooms.reduce((sum, r) => {
      if (r.dates && r.dates[0] && r.dates[1]) {
        const days = r.dates[1].diff(r.dates[0], 'day') || 1;
        return sum + (r.roomPricePerDay || r.roomPrice || 0) * days;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  }, [selectedRooms]);

  const handleRoomSelect = (roomID) => {
    const room = rooms.find(r => (r.roomID || r.roomId) === roomID);
    if (selectedRooms.find(r => (r.roomID || r.roomId) === roomID)) {
      setSelectedRooms(selectedRooms.filter(r => (r.roomID || r.roomId) !== roomID));
    } else {
      setSelectedRooms([...selectedRooms, { ...room, dates: null }]);
    }
  };

  const handleRoomDateChange = (roomID, date, type) => {
    setSelectedRooms(selectedRooms.map(r => {
      if ((r.roomID || r.roomId) === roomID) {
        const newDates = [...(r.dates || [null, null])];
        if (type === 'start') {
          newDates[0] = date;
          // If start date is after end date, clear end date
          if (newDates[1] && date && date.isAfter(newDates[1])) {
            newDates[1] = null;
          }
        } else {
          newDates[1] = date;
        }
        return { ...r, dates: newDates };
      }
      return r;
    }));
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedRooms.length === 0) {
      message.warning('Please select at least one room');
      return;
    }
    if (currentStep === 1) {
      const incomplete = selectedRooms.find(r => !r.dates || !r.dates[0] || !r.dates[1]);
      if (incomplete) {
        message.warning(`Please select both check-in and check-out dates for Room ${incomplete.roomNumber}`);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirm = async () => {
    try {
      const customerID = user?.customerId || user?.customerID || user?.id;
      if (!customerID) {
          message.error('User information incomplete (ID missing). Please contact administrator or check backend /auth/me');
          return;
      }

      const payload = MAP_FORM_TO_BOOKING({
        customerID: customerID,
        selectedRooms: selectedRooms,
        bookingStatus: 'PENDING',
        totalPrice: totalPrice,
      });

      await createBooking(payload, customerID);
      message.success('Booking request submitted successfully!');
      navigate('/customer/booking-history');
    } catch (error) {
      message.error(error.message || 'Failed to create booking. Please try again.');
    }
  };

  const steps = [
    { title: 'Select Rooms', icon: <ShoppingCartOutlined /> },
    { title: 'Set Dates', icon: <CalendarOutlined /> },
    { title: 'Review & Confirm', icon: <SolutionOutlined /> },
  ];

  const availableRooms = rooms.filter(r => r.roomStatus?.toUpperCase() === 'AVAILABLE');

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Book Your Stay</Title>
      </div>
      
      <div style={{ marginBottom: '48px' }}>
        <Steps current={currentStep} items={steps} />
      </div>

      <div style={{ minHeight: '400px' }}>
        {currentStep === 0 && (
          <div>
            <Title level={4}>Choose from available rooms</Title>
            <Row gutter={[16, 16]}>
              {availableRooms.length > 0 ? (
                availableRooms.map(room => {
                  const roomID = room.roomID || room.roomId;
                  const roomNumber = room.roomNumber;
                  const roomPricePerDay = room.roomPricePerDay || room.roomPrice;
                  const isSelected = selectedRooms.find(r => (r.roomID || r.roomId) === roomID);

                  return (
                    <Col xs={24} md={12} lg={8} key={roomID}>
                      <Card 
                        hoverable 
                        onClick={() => handleRoomSelect(roomID)}
                        style={{ 
                          border: isSelected ? '2px solid #1890ff' : '1px solid #f0f0f0',
                          position: 'relative',
                          borderRadius: '12px',
                          background: isSelected ? '#e6f7ff' : '#fff'
                        }}
                      >
                        {isSelected && (
                          <CheckCircleOutlined style={{ position: 'absolute', top: '10px', right: '10px', color: '#1890ff', fontSize: '20px' }} />
                        )}
                        <Card.Meta 
                          title={`Room ${roomNumber}`} 
                          description={
                            <>
                              <Text type="secondary">{room.roomType?.roomTypeName}</Text>
                              <div style={{ marginTop: '8px' }}>
                                <Text strong style={{ color: '#1890ff' }}>{roomPricePerDay?.toLocaleString()} VND / Night</Text>
                              </div>
                            </>
                          } 
                        />
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <Col span={24}><Empty description="No rooms available at the moment" /></Col>
              )}
            </Row>
          </div>
        )}

        {currentStep === 1 && (
          <div style={{ padding: '12px 0' }}>
            <Title level={4}>Set dates for each room</Title>
            <Row gutter={[16, 16]}>
              {selectedRooms.map(room => {
                const roomID = room.roomID || room.roomId;
                const startDate = room.dates?.[0];
                const endDate = room.dates?.[1];
                const days = (startDate && endDate) ? endDate.diff(startDate, 'day') : 0;
                
                return (
                  <Col span={24} key={roomID}>
                    <Card 
                      size="small" 
                      title={<Text strong>Room {room.roomNumber} - {room.roomType?.roomTypeName}</Text>}
                      extra={<Text type="secondary">{room.roomPricePerDay?.toLocaleString()} VND / night</Text>}
                    >
                      <Row gutter={24} align="middle">
                        <Col xs={24} md={8}>
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <Text type="secondary">Check-in:</Text>
                            <DatePicker 
                              size="large" 
                              style={{ width: '100%', borderRadius: '8px' }} 
                              disabledDate={(current) => current && current < dayjs().startOf('day')}
                              onChange={(date) => handleRoomDateChange(roomID, date, 'start')}
                              value={startDate}
                              placeholder="Check-in Date"
                            />
                          </Space>
                        </Col>
                        <Col xs={24} md={8}>
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <Text type="secondary">Check-out:</Text>
                            <DatePicker 
                              size="large" 
                              style={{ width: '100%', borderRadius: '8px' }} 
                              disabledDate={(current) => {
                                const minEndDate = startDate || dayjs();
                                return current && current <= minEndDate.startOf('day');
                              }}
                              onChange={(date) => handleRoomDateChange(roomID, date, 'end')}
                              value={endDate}
                              placeholder="Check-out Date"
                            />
                          </Space>
                        </Col>
                        <Col xs={24} md={8}>
                          {days > 0 ? (
                            <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
                              <Text type="success" strong>Duration: {days} {days === 1 ? 'night' : 'nights'}</Text>
                              <div style={{ marginTop: '4px' }}>
                                <Text>Subtotal: <Text strong>{(days * (room.roomPricePerDay || room.roomPrice)).toLocaleString()} VND</Text></Text>
                              </div>
                            </div>
                          ) : (
                            <Alert message="Please select check-in and check-out dates" type="warning" showIcon style={{ padding: '8px 12px' }} />
                          )}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <Title level={4}>Review your booking</Title>
            <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
              <Descriptions title="Customer & Pricing" bordered column={1}>
                <Descriptions.Item label="Guest Name">{user?.customerFullName || user?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Total Amount" labelStyle={{ fontWeight: 'bold' }}>
                  <Statistic 
                    value={totalPrice} 
                    suffix="VND" 
                    styles={{ content: { color: '#1890ff', fontWeight: 'bold' } }} 
                  />
                </Descriptions.Item>
              </Descriptions>
              
              <Divider orientation="left">Room Details</Divider>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedRooms.map(r => (
                  <Card key={r.roomID || r.roomId} size="small" type="inner" title={`Room ${r.roomNumber}`}>
                    <Row justify="space-between">
                      <Col>
                        <Text type="secondary">Dates:</Text> <Text strong>{r.dates?.[0].format('DD/MM/YYYY')} - {r.dates?.[1].format('DD/MM/YYYY')}</Text>
                        <br/>
                        <Text type="secondary">Type:</Text> <Text>{r.roomType?.roomTypeName}</Text>
                      </Col>
                      <Col style={{ textAlign: 'right' }}>
                        <Text strong style={{ fontSize: '1.1rem' }}>
                          {((r.dates?.[1].diff(r.dates?.[0], 'day') || 1) * (r.roomPricePerDay || r.roomPrice)).toLocaleString()} VND
                        </Text>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {r.dates?.[1].diff(r.dates?.[0], 'day') || 1} nights x {(r.roomPricePerDay || r.roomPrice).toLocaleString()}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <Alert 
                  message="Important Information"
                  description="By clicking confirm, you agree to our booking terms and conditions. Payment will be handled at the hotel."
                  type="warning"
                  showIcon
                />
              </div>
            </Card>
          </div>
        )}
      </div>

      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handlePrev} disabled={currentStep === 0} size="large">Previous</Button>
        {currentStep < 2 ? (
          <Button type="primary" onClick={handleNext} size="large" disabled={currentStep === 0 && selectedRooms.length === 0}>Next</Button>
        ) : (
          <Button type="primary" size="large" icon={<CheckCircleOutlined />} onClick={handleConfirm} loading={bookingLoading}>Confirm Reservation</Button>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
