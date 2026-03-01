import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Empty, Spin, message, Pagination } from 'antd';
import { useRooms } from '../../features/rooms/useRooms';
import { useNavigate } from 'react-router-dom';


import RoomCard from '../../features/rooms/components/RoomCard';
import RoomFilter from '../../features/rooms/components/RoomFilter';
import {useAuth} from "../../core/auth/useAuth.js";

const { Title, Text } = Typography;

const HomePage = () => {
  const { rooms, loading, fetchRooms } = useRooms();
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    let result = rooms;

    if (searchTerm) {
      result = result.filter(room => 
        (room.roomNumber && room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.roomTypeName && room.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.roomType?.roomTypeName && room.roomType.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(room => {
          const status = room.roomStatus?.toUpperCase();
          const filter = statusFilter.toUpperCase();
          return status === filter;
      });
    }

    setFilteredRooms(result);
    setCurrentPage(1);
  }, [rooms, searchTerm, statusFilter]);

  const handleBookNow = (room) => {
    if (!isAuthenticated) {
      message.info('Please login to book a room');
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'CUSTOMER') {
      message.error('Only customers can book rooms');
      return;
    }

    const roomID = room.roomID || room.roomId;
    navigate('/customer/booking', { state: { roomID: roomID } });
  };

  const paginatedRooms = filteredRooms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Title level={2}>Find Your Perfect Room</Title>
        <Text type="secondary">Explore our variety of rooms and book your stay today</Text>
      </div>

      <RoomFilter 
        onSearch={setSearchTerm} 
        onStatusChange={setStatusFilter} 
        initialStatus={statusFilter} 
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : paginatedRooms.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {paginatedRooms.map(room => (
              <Col xs={24} sm={12} lg={8} xl={6} key={room.roomID || room.roomId}>
                <RoomCard room={room} onBook={handleBookNow} />
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Pagination
              current={currentPage}
              total={filteredRooms.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
              showSizeChanger={false}
              style={{ borderRadius: '8px' }}
            />
          </div>
        </>
      ) : (
        <Empty description="No rooms found matching your criteria" />
      )}
    </div>
  );
};

export default HomePage;
