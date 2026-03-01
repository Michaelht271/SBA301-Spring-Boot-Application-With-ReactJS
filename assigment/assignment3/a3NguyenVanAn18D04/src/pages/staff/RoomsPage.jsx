import React, { useEffect, useState } from 'react';
import {Button, Typography, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRooms } from '../../features/rooms/useRooms';
import RoomTable from '../../features/rooms/components/RoomTable';
import RoomFilter from '../../features/rooms/components/RoomFilter';
import RoomFormModal from '../../features/rooms/components/RoomFormModal';

const { Title } = Typography;

const RoomsPage = () => {
  const { rooms, roomTypes, loading, fetchRooms, fetchRoomTypes, createRoom, updateRoom, deleteRoom } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, [fetchRooms, fetchRoomTypes]);

  const handleAdd = () => {
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRoom(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      message.success('Room deleted successfully (Status set to Inactive)');
    } catch (error) {
      message.error(error.message || 'Failed to delete room');
    }
  };

  const onFinish = async (values) => {
    try {
      if (editingRoom) {
        // accept several possible id field names coming from backend: roomId, roomID or id
        const roomIdToUpdate = editingRoom?.roomId ?? editingRoom?.roomID ?? editingRoom?.id;
        await updateRoom(roomIdToUpdate, values);
        message.success('Room updated successfully');
      } else {
        await createRoom(values);
        message.success('Room created successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.message || 'Action failed');
    }
  };

  const filteredRooms = statusFilter === 'All' 
    ? rooms 
    : rooms.filter(room => room.roomStatus === statusFilter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Rooms Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large" 
          onClick={handleAdd}
          style={{ borderRadius: '8px' }}
        >
          Add New Room
        </Button>
      </div>

      <RoomFilter 
        onSearch={() => {}} 
        onStatusChange={setStatusFilter} 
        initialStatus={statusFilter} 
      />

      <RoomTable 
        rooms={filteredRooms} 
        loading={loading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <RoomFormModal 
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onFinish={onFinish}
        editingRoom={editingRoom}
        loading={loading}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default RoomsPage;
