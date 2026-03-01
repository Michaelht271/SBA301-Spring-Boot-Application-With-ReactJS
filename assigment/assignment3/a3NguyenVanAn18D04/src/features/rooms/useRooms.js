import { useState, useCallback } from 'react';
import roomService from './roomService';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomService.getAll();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoomTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomService.getRoomTypes();
      setRoomTypes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch room types');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoom = async (roomData) => {
    setLoading(true);
    try {
      await roomService.create(roomData);
      await fetchRooms();
    } catch (err) {
      setError(err.message || 'Failed to create room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (id, roomData) => {
    setLoading(true);
    try {
      await roomService.update(id, roomData);
      await fetchRooms();
    } catch (err) {
      setError(err.message || 'Failed to update room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    setLoading(true);
    try {
      await roomService.delete(id);
      await fetchRooms();
    } catch (err) {
      setError(err.message || 'Failed to delete room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    rooms,
    roomTypes,
    loading,
    error,
    fetchRooms,
    fetchRoomTypes,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};
