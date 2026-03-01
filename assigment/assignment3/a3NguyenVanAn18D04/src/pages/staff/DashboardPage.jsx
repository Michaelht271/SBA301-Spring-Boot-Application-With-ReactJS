import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';
import { useRooms } from '../../features/rooms/useRooms';
import { useBookings } from '../../features/bookings/useBookings';
import customerService from '../../features/customers/customerService';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { rooms, fetchRooms } = useRooms();
  const { bookings, fetchAllBookings } = useBookings();
  const [customers, setCustomers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRooms();
    fetchAllBookings();
    fetchCustomers();
  }, [fetchRooms, fetchAllBookings]);

  useEffect(() => {
    const revenue = (bookings || []).reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    setTotalRevenue(revenue);
  }, [bookings]);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {}
  };

  const recentBookings = (bookings || []).slice(0, 5);

  const columns = [
    { title: 'Booking ID', dataIndex: 'bookingReservationId', key: 'bookingReservationId' },
    { title: 'Customer', dataIndex: ['customer', 'customerFullName'], key: 'customer' },
    { title: 'Date', key: 'date', render: (_, r) => dayjs(r.bookingDate).format('YYYY-MM-DD HH:mm') },
    { title: 'Status', dataIndex: 'bookingStatus', key: 'status', render: (s) => <Tag color="blue">{s}</Tag> },
    { title: 'Total', dataIndex: 'totalPrice', key: 'total', render: (t) => <Text strong>{t?.toLocaleString()} VND</Text> },
  ];

  return (
    <div>
      <Title level={2}>Dashboard Overview</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Statistic
              title="Total Rooms"
              value={rooms.length}
              prefix={<HomeOutlined />}
              styles={{ content: { color: '#3f51b5' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Statistic
              title="Total Bookings"
              value={bookings.length}
              prefix={<BookOutlined />}
              styles={{ content: { color: '#cf1322' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Statistic
              title="Total Customers"
              value={customers.length}
              prefix={<UserOutlined />}
              styles={{ content: { color: '#3f8600' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              suffix="VND"
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Bookings" variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Table 
              dataSource={recentBookings || []} 
              columns={columns} 
              rowKey="bookingReservationId" 
              pagination={false} 
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Room Status Summary" variant="none" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text>Available:</Text>
              <Text strong style={{ color: 'green' }}>{rooms.filter(r => r.roomStatus === 'Available').length}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text>Inactive:</Text>
              <Text strong style={{ color: 'red' }}>{rooms.filter(r => r.roomStatus === 'Inactive').length}</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
