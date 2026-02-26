package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.entites.RoomType;

import java.util.List;

public interface RoomTypeService {
	List<RoomType> getRoomTypeServices();
	
	RoomType getRoomTypeById(Long id);
	
	RoomType createRoomType(RoomType roomType);
	
	RoomType updateRoomType(Long id, RoomType roomType);
	
	void deleteRoomType(Long id);
}
