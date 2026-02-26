package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.entites.RoomInformation;

import java.util.List;

public interface RoomInformationService {
	List<RoomInformation> getRoomInformationServices();
	
	RoomInformation getRoomInformationById(Long id);
	
	RoomInformation createRoomInformation(RoomInformation roomInformation);
	
	RoomInformation updateRoomInformation(Long id, RoomInformation roomInformation);
	
	void deleteRoomInformation(Long id);
}
