package com.michael.a3nguyenvanan18d04.dtos.rooms.request;

import com.michael.a3nguyenvanan18d04.enums.RoomStatus;
import lombok.Data;


@Data
public class UpdateRoomRequest {
	
	private Long roomId;
	// private String roomName;
	private String roomNumber;
	private String roomDescription;
	private Double roomPrice;
	private RoomStatus roomStatus;
	private Long roomTypeId;
	

}
