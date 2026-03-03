package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.dtos.rooms.request.UpdateRoomRequest;
import com.michael.a3nguyenvanan18d04.entites.RoomInformation;

import java.util.List;

public interface RoomInformationService {
	List<RoomInformation> getRoomInformationServices();
	
	RoomInformation getRoomInformationById(Long id);
	
	
	RoomInformation createRoomInformation(UpdateRoomRequest updateRoomRequest);
	
	RoomInformation updateRoomInformation(Long id, UpdateRoomRequest updateRoomRequest);
	
	void deleteRoomInformation(Long id);
}
