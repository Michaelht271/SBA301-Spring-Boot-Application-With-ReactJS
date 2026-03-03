package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.entites.RoomType;
import com.michael.a3nguyenvanan18d04.repository.RoomTypeRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoomTypeServiceImpl implements RoomTypeService {
	private final RoomTypeRepository roomTypeRepository;
	
	public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository) {
		this.roomTypeRepository = roomTypeRepository;
	}
	
	
	@Override
	public List<RoomType> getRoomTypeServices() {
		return roomTypeRepository.findAll();
	}
	@Override
	public RoomType getRoomTypeById(Long id) {
		return roomTypeRepository.getReferenceById(id);
	}
	@Override
	public RoomType createRoomType(RoomType roomType) {
		return roomTypeRepository.save(roomType);
	}
	@Override
	public RoomType updateRoomType(Long id, RoomType roomType) {
		return roomTypeRepository.save(roomType);
	}
	@Override
	public void deleteRoomType(Long id) {
	roomTypeRepository.deleteById(id);
	}
}
